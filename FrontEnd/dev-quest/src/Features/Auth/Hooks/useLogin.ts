"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {usePostApiVversionAuthLogin } from "@/api/generated/hooks/auth-v1/auth-v1";
import { userLoginSchema, type userLoginType } from "../Schemas/UserLogin.schema";
import { useRouter } from 'next/navigation'

export const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSuccessClose = () => {
    setIsSuccess(false);
    router.push("/Dashboard");
  };

  const handleErrorClose = () => {
    setErrorMessage(null);
  };

  const {mutateAsync: loginMutation, isPending} = usePostApiVversionAuthLogin({
    mutation: {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          setIsSuccess(true);
        } else {
          router.push("/Dashboard");
        }
      },
      onError: (error: Error) => {
        setErrorMessage(error?.message || "Email ou senha inválidos.");
        console.log("erro:",error?.message);
        setError("Email", { message: "Credenciais inválidas" });
        setError("Password", { message: "Credenciais inválidas" });
      },
    }
  });



  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
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
    } catch {}
  };


  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isPending,
    errorMessage,
    setErrorMessage,
    handleErrorClose,
    remember,
    setRemember,
    showPassword,
    setShowPassword,
    isSuccess,
    setIsSuccess,
    handleSuccessClose,
  };
};
