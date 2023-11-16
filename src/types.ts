import { z } from "zod";
export type OTP = z.infer<typeof otpSchema>;

const otpSchema = z.object({
    otp: z.string(),
    expires: z.number(),
});


export const verifyOtpSchema = z.object({
    Aadharnumber: z.string(),
    otp: z.string()
})

export const bankAccountSchema = z.object({
    bankName: z.string(),
    branch: z.string(),
    type: z.string(),
    nominee: z.string(),
})

export const fixedDepositSchema = z.object(
    {
        companyName: z.string(),
        amount: z.string(),
        maturitydate: z.string(),
        nominee: z.string(),
    }
)

export const mutualFundSchema = z.object({
    folioNo: z.string(),
    name: z.string(),
    applicant: z.string(),
    nominee: z.string(),
})
export const lockerSchema = z.object({
    bankname: z.string(),
    branch: z.string(),
    accno: z.string(),
    rent: z.string(),
    nominee: z.string(),
})
export const ppfSchema = z.object({
    bankname: z.string(),
    accno: z.string(),
    maturityDate: z.string(),
    nominee: z.string(),
})
export const shareSchema = z.object({
    company: z.string(),
    quantity: z.string(),
    dematAc: z.string(),
    nominee: z.string(),
})
export const propertySchema = z.object({
    address: z.string(),
    area: z.string(),
    pincode: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string()
})
export const Ids = z.object({
    BankId: z.string(),
    FixedDepositId: z.string(),
    MutualFundId: z.string(),
    LockerId: z.string(),
    PPFId: z.string(),
    SharesId: z.string(),
})
export const input = z.object({
    propertySchema,
    Ids,
});


