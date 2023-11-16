import { UserRouter } from "./routers/user";
import { createTRPCRouter } from "~/server/api/trpc";
import { OtpRouter } from "./routers/otp";
import { bankRouter, fixedDepositRouter, lockerRouter, mutualFundRouter, ppfRouter, propertyRouter, shareRouter, willRouter } from "./routers/will";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  otp: OtpRouter,
  user: UserRouter,
  bankAccount: bankRouter,
  FixedDeposit: fixedDepositRouter,
  MutualFund: mutualFundRouter,
  Lockers: lockerRouter,
  PPF: ppfRouter,
  Shares: shareRouter,
  Property: propertyRouter,
  will: willRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
