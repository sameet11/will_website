import { TRPCError } from "@trpc/server";
import {
    createTRPCRouter,
    protectedProcedure
} from "~/server/api/trpc";

import stripeModule from 'stripe';

const stripe = stripeModule(process.env.STRIPE_SECRET_KEY);
export const UserRouter = createTRPCRouter({
    makePayment: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }
        const user = await ctx.db.user.findFirst({
            where: {
                id: ctx.session.user.id,
            },
        })
        if (!user) {
            throw new TRPCError({ message: "something went wrong", code: "INTERNAL_SERVER_ERROR" });
        }
        return user.aadharVerified;
    }),
});