import {z} from "zod"

export const userRegistrationSchema = z.object({
    firtName: z.string,
    email: z.string(),
    password: z.string,
})

export type UserRegister = z.infer<typeof userRegistrationSchema>