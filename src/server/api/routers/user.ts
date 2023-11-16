import { TRPCError } from "@trpc/server";
import {
    createTRPCRouter,
    protectedProcedure
} from "~/server/api/trpc";


export const UserRouter = createTRPCRouter({
    verifyCheck: protectedProcedure.query(async ({ ctx }) => {
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
    willCheck: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }
        const will = ctx.db.will.findMany({
            where: {
                userId: ctx.session.user.id
            }
        })
        if (!will) {
            throw new TRPCError({ message: "something went wrong", code: "INTERNAL_SERVER_ERROR" });
        }
        return will
    })
});