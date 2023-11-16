import { TRPCError } from "@trpc/server";
import { User } from '@prisma/client';
import {
    createTRPCRouter,
    protectedProcedure
} from "~/server/api/trpc";
import { bankAccountSchema, fixedDepositSchema, input, lockerSchema, mutualFundSchema, ppfSchema, shareSchema } from "~/types";
import { z } from "zod";

export const bankRouter = createTRPCRouter({
    Create: protectedProcedure.input(bankAccountSchema).mutation(async ({ ctx, input }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }

        const bankAccount = await ctx.db.bankAccount.create({
            data: input
        })
        if (!bankAccount) {
            throw new TRPCError({ message: "Somethin went wrong", code: "INTERNAL_SERVER_ERROR" })
        }
        return bankAccount.id
    })
});
export const fixedDepositRouter = createTRPCRouter({
    Create: protectedProcedure.input(fixedDepositSchema).mutation(async ({ ctx, input }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }

        const fixedDeposit = await ctx.db.fixedDeposit.create({
            data: input
        })
        if (!fixedDeposit) {
            throw new TRPCError({ message: "Somethin went wrong", code: "INTERNAL_SERVER_ERROR" })
        }
        return fixedDeposit.id
    })
});
export const mutualFundRouter = createTRPCRouter({
    Create: protectedProcedure.input(mutualFundSchema).mutation(async ({ ctx, input }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }
        const mutualFund = await ctx.db.mutualFunds.create({
            data: input
        })
        if (!mutualFund) {
            throw new TRPCError({ message: "Somethin went wrong", code: "INTERNAL_SERVER_ERROR" })
        }
        return mutualFund.id
    })
});
export const lockerRouter = createTRPCRouter({
    Create: protectedProcedure.input(lockerSchema).mutation(async ({ ctx, input }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }

        const lockers = await ctx.db.lockers.create({
            data: input
        })
        if (!lockers) {
            throw new TRPCError({ message: "Somethin went wrong", code: "INTERNAL_SERVER_ERROR" })
        }
        return lockers.id
    })
});
export const ppfRouter = createTRPCRouter({
    Create: protectedProcedure.input(ppfSchema).mutation(async ({ ctx, input }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }

        const ppf = await ctx.db.pPF.create({
            data: input
        })
        if (!ppf) {
            throw new TRPCError({ message: "Somethin went wrong", code: "INTERNAL_SERVER_ERROR" })
        }
        return ppf.id
    })
});
export const shareRouter = createTRPCRouter({
    Create: protectedProcedure.input(shareSchema).mutation(async ({ ctx, input }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }

        const shares = await ctx.db.shares.create({
            data: input
        })
        if (!shares) {
            throw new TRPCError({ message: "Somethin went wrong", code: "INTERNAL_SERVER_ERROR" })
        }
        return shares.id
    })
});
export const propertyRouter = createTRPCRouter({
    Create: protectedProcedure.input(input).mutation(async ({ ctx, input }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }

        const { propertySchema, Ids } = input;

        // Create Property
        const property = await ctx.db.property.create({
            data: propertySchema,
        });
        if (!property) {
            throw new TRPCError({ message: "Something went wrong", code: "INTERNAL_SERVER_ERROR" });
        }

        type DatabaseNames = "bankAccount" | "fixedDeposit" | "mutualFunds" | "lockers" | "pPF" | "shares";

        const connectEntity = async (database: DatabaseNames, entity: string, entityId: string, errorMessage: string) => {
            const result = await (ctx.db as Record<DatabaseNames, any>)[database].findFirst({
                where: { id: entityId },
            });

            if (!result) {
                throw new TRPCError({ message: errorMessage, code: "INTERNAL_SERVER_ERROR" });
            }

            return result;
        };

        const bank = await connectEntity("bankAccount", 'bank', Ids.BankId, "Something went wrong with the bank");
        const fixedDeposit = await connectEntity("fixedDeposit", 'fixed deposit', Ids.FixedDepositId, "Something went wrong with the fixed deposit");
        const mutualFund = await connectEntity("mutualFunds", 'mutual fund', Ids.MutualFundId, "Something went wrong with the mutual fund");
        const lockers = await connectEntity("lockers", 'locker', Ids.LockerId, "Something went wrong with the locker");
        const ppf = await connectEntity("pPF", 'PPF', Ids.PPFId, "Something went wrong with the PPF");
        const shares = await connectEntity("shares", 'shares', Ids.SharesId, "Something went wrong with the shares");


        // Create Will
        const Will = await ctx.db.will.create({
            data: {
                bank: { connect: bank },
                fd: { connect: fixedDeposit },
                mf: { connect: mutualFund },
                lockers: { connect: lockers },
                ppf: { connect: ppf },
                shares: { connect: shares },
                property: { connect: property },
            },
        });
        if (!Will) {
            throw new TRPCError({ message: "Something went wrong creating Will", code: "INTERNAL_SERVER_ERROR" });
        }

        // Update User with Will
        const user: User = await ctx.db.user.update({
            where: { id: ctx.session.user.id },
            data: { will: { connect: [Will] } },
        });
        if (!user) {
            throw new TRPCError({ message: "Something went wrong", code: "INTERNAL_SERVER_ERROR" });
        }

    }),

});
export const willRouter = createTRPCRouter({
    bankAccount: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }
        const bank = ctx.db.bankAccount.findFirst({
            where: {
                willId: input,
            }
        })

        if (!bank) {
            throw new TRPCError({ message: "Something went wrong", code: "INTERNAL_SERVER_ERROR" });
        }
        return bank;
    }),
    fixedDeposit: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }
        const fixedDeposit = ctx.db.fixedDeposit.findFirst({
            where: {
                willId: input,
            }
        })

        if (!fixedDeposit) {
            throw new TRPCError({ message: "Something went wrong", code: "INTERNAL_SERVER_ERROR" });
        }
        return fixedDeposit;
    }),
    mutualFund: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }
        const mutualFund = ctx.db.mutualFunds.findFirst({
            where: {
                willId: input,
            }
        })

        if (!mutualFund) {
            throw new TRPCError({ message: "Something went wrong", code: "INTERNAL_SERVER_ERROR" });
        }
        return mutualFund;
    }),
    lockers: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }
        const locker = ctx.db.lockers.findFirst({
            where: {
                willId: input,
            }
        })

        if (!locker) {
            throw new TRPCError({ message: "Something went wrong", code: "INTERNAL_SERVER_ERROR" });
        }
        return locker;
    }),
    ppf: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }
        const ppf = ctx.db.pPF.findFirst({
            where: {
                willId: input,
            }
        })

        if (!ppf) {
            throw new TRPCError({ message: "Something went wrong", code: "INTERNAL_SERVER_ERROR" });
        }
        return ppf;
    }),
    shares: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }
        const shares = ctx.db.shares.findFirst({
            where: {
                willId: input,
            }
        })

        if (!shares) {
            throw new TRPCError({ message: "Something went wrong", code: "INTERNAL_SERVER_ERROR" });
        }
        return shares;
    }),
    property: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
        if (!ctx.session.user || !ctx.session.user.email) {
            throw new TRPCError({ message: "Unauthorized Access", code: "FORBIDDEN" });
        }
        const property = ctx.db.property.findFirst({
            where: {
                willId: input,
            }
        })

        if (!property) {
            throw new TRPCError({ message: "Something went wrong", code: "INTERNAL_SERVER_ERROR" });
        }
        return property;
    }),
})
