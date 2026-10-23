import {z} from "zod"

export const userRegistrationSchema = z.object({
    FirtName: z
        .string({message: "O nome é obrigatório"})
        .min(3,"O nome deve conter mais de 3 caracteres.")
        .trim()
        .toLowerCase(),

    Email: z
        .email("Formato de Email invalido")
        .min(3,"O email deve conter mais de 3 caracteres.")
        .trim()
        .toLowerCase(),

    Password: z
        .string({message: "A senha é obrigatório"})
        .min(3,"A senha deve conter mais de 3 caracteres.")
        .max(20,"A senha deve conter menos de 20 caracteres")
        .trim()
        .toLowerCase(),
})

export type UserRegisterType = z.infer<typeof userRegistrationSchema>