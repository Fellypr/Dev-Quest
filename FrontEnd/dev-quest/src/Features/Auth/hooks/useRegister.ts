"use client";
import { usePostApiVversionAuthRegister } from "@/api/generated/hooks/auth-v1/auth-v1";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegistrationSchema, type UserRegisterType } from "../schemas/cadastrarUsuario.schema";
import { useRouter } from 'next/navigation';

export const useRegister = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter()
  
  const {mutateAsync: registerMutation, isPending} = usePostApiVversionAuthRegister({
    mutation: {
      onSuccess: (data) => {
        console.log("Usuário registrado:", data);
        router.push("/Login");
      },
      onError: (error) => {
        setErrorMessage("Erro ao registrar usuário.");
        console.log("erro:",error);
        setError("Email",  { message: "Credenciais inválidas" });
        setError("Password", { message: "Credenciais inválidas" });
      },
    }
  })



  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
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
  }
};