"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postApiVversionAuthLogin } from "@/api/generated/hooks/auth-v1/auth-v1";
import { userLoginSchema, type userLoginType } from "../schemas/userLogin.schema";
import { useRouter } from 'next/navigation'

export const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<userLoginType>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = async (dados: userLoginType) => {
    setErrorMessage(null);
    try {
      const response = await postApiVversionAuthLogin("1", {
        email: dados.Email,
        password: dados.Password,
      });

      if (response.status === 200) {
        console.log("Usuário logado:", response);
        router.push("/Dashboard");
      }
    } catch (err: unknown) {
      setErrorMessage("Email ou senha inválidos.");
      console.log("erro:",err);
      setError("Email", { message: "Credenciais inválidas" });
    }
  };


  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    errorMessage,
    remember,
    setRemember,
    showPassword,
    setShowPassword,
  };
};
