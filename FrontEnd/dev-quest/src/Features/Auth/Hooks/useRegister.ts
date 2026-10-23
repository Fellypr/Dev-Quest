"use client";
import { usePostApiVversionAuthRegister } from "@/api/generated/hooks/auth-v1/auth-v1";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegistrationSchema, type UserRegisterType } from "../Schemas/RegisterUser.schema";
import { useRouter } from 'next/navigation';

export const useRegister = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter()
  
  const handleSuccessClose = () => {
    setIsSuccess(false);
    router.push("/Welcome");
  };

  const {mutateAsync: registerMutation, isPending} = usePostApiVversionAuthRegister({
    mutation: {
      onSuccess: (data) => {
        if (!data?.status || (data.status >= 200 && data.status < 300)) {
          setIsSuccess(true);
        } else {
          router.push("/Welcome");
        }
      },
      onError: (error: Error) => {
        setErrorMessage(error.message || "Erro ao registrar usuário.");
        console.log("erro:",error.message);
        setError("Email",  { message: "Credenciais inválidas" });
        setError("Password", { message: "Credenciais inválidas" });
      },
    }
  });

  const handleErrorClose = () => {
    setErrorMessage(null);
  };



  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserRegisterType>({
    resolver: zodResolver(userRegistrationSchema),
  });

  const onSubmit = async (dados: UserRegisterType) => {
    setErrorMessage(null);
    try {
      await registerMutation({
        version: "1",
        data: {
          userName: dados.FirtName,
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
    handleErrorClose,
    isSuccess,
    handleSuccessClose,
  }
};