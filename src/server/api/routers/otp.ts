import { z } from "zod";
import twilio from "twilio";
import { env } from "~/env.mjs";
import { TRPCError } from "@trpc/server";
import {
    createTRPCRouter,
    protectedProcedure
} from "~/server/api/trpc";

import { OTP, verifyOtpSchema } from "~/types";

const accountSid = env.TWILIO_ACCOUNT_SID;
const authToken = env.TWILIO_AUTH_TOKEN;
const twilioPhone = env.TWILIO_MY_NO;
const client = twilio(accountSid, authToken);


const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const otps: Record<string, OTP> = {};


const sendOTP = (phoneNumber: string, otp: string) => {
    return client.messages.create({
        body: `Your OTP is: ${otp}`,
        to: `${phoneNumber}`,
        from: `${twilioPhone}`
    })
        .then((message) => {
            return { success: true };
        })
        .catch((error) => {
            console.error("Twilio Error:", error.message);
            return { success: false, error: error.message };
        });
};

export const OtpRouter = createTRPCRouter({
    sendOtp: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }
        const aadhar = await ctx.db.aadhar.findFirst({
            where: {
                aadharNumber: input,
            }
        });
        if (!aadhar) {
            throw new TRPCError({ message: "Aadhar not found", code: "NOT_FOUND" });
        }
        const phoneNumber = aadhar.phoneNumber;
        const otp = generateOTP();

        otps[phoneNumber] = {
            otp,
            expires: Date.now() + 600000 // OTP expires in 10 minutes
        };

        const res = await sendOTP(phoneNumber, otp);
        if (!res.success) {
            throw new TRPCError({ message: "Failed to send OTP", code: "INTERNAL_SERVER_ERROR" });
        }

        return {
            res
        };
    }),
    verifyOtp: protectedProcedure.input(verifyOtpSchema).mutation(async ({ ctx, input }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }
        const { Aadharnumber, otp } = input;
        const aadhar = await ctx.db.aadhar.findFirst({
            where: {
                aadharNumber: Aadharnumber,
            }
        });

        if (!aadhar) {
            throw new TRPCError({ message: "Aadhar not found", code: "NOT_FOUND" });
        }

        const phone = aadhar.phoneNumber;

        if (phone in otps) {
            const savedOTP = otps[phone];

            if (savedOTP) {
                if (Date.now() > savedOTP.expires) {
                    throw new TRPCError({ message: "OTP has expired", code: "BAD_REQUEST" });
                }

                if (otp === savedOTP.otp) {
                    await ctx.db.user.update({
                        where: {
                            id: ctx.session.user.id,
                        },
                        data: {
                            aadharNumber: Aadharnumber,
                            aadharVerified: true,
                        }
                    });

                    delete otps[phone];

                    return { success: true };
                }
            }
        }

        throw new TRPCError({ message: "Invalid OTP or phone number", code: "BAD_REQUEST" });
    })
});
