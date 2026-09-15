import {z} from "zod"

export const userRegistrationSchema = z.object({
    firtName: z
        .string({message: "O nome é obrigatório"})
        .min(3,"O nome deve conter mais de 3 caracteres.")
        .trim()
        .toLowerCase(),

    email: z
        .email("Formato de Email invalido")
        .min(3,"O email deve conter mais de 3 caracteres.")
        .trim()
        .toLowerCase(),

    password: z
        .string({message: "A senha é obrigatório"})
        .min(3,"O nome deve conter mais de 3 caracteres.")
        .trim()
        .toLowerCase(),
})

export type UserRegister = z.infer<typeof userRegistrationSchema>