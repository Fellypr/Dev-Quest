"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {usePostApiVversionAuthLogin } from "@/api/generated/hooks/auth-v1/auth-v1";
import { userLoginSchema, type userLoginType } from "../schemas/userLogin.schema";
import { useRouter } from 'next/navigation'

export const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  const {mutateAsync: loginMutation, isPending} = usePostApiVversionAuthLogin({
    mutation: {
      onSuccess: (data) => {
        console.log("Usuário logado:", data);
        router.push("/Dashboard");
      },
      onError: (error) => {
        setErrorMessage("Email ou senha inválidos.");
        console.log("erro:",error);
        setError("Email", { message: "Credenciais inválidas" });
      },
    }
  })



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
      await loginMutation({
        version: "1",
        data: {
          email: dados.Email,
          password: dados.Password,
        }
      });
    } catch {
      //aqui
    }
  };


  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isPending,
    errorMessage,
    remember,
    setRemember,
    showPassword,
    setShowPassword,
  };
};
