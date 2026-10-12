/**
 * "use client";
 */
import {
  useMutation
} from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryClient,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query';

import type {
  UserV1Dto
} from '../../interfaces';

import { customFetch } from '../../../custom-fetch';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export type postApiVversionAuthRegisterResponse200 = {
  data: void
  status: 200
}

export type postApiVversionAuthRegisterResponseSuccess = (postApiVversionAuthRegisterResponse200) & {
  headers: Headers;
};
;

export type postApiVversionAuthRegisterResponse = (postApiVversionAuthRegisterResponseSuccess)

export const getPostApiVversionAuthRegisterUrl = (version: string,) => {




  return `/api/v${version}/auth/register`
}

export const postApiVversionAuthRegister = async (version: string,
    userV1Dto?: UserV1Dto, options?: Parameters<typeof customFetch>[1]): Promise<postApiVversionAuthRegisterResponse> => {

    const getHeaders = (h?: NonNullable<RequestInit['headers']>): Record<string, string | readonly string[]> => {
    if (!h) return {};
    if (h instanceof Headers) return Object.fromEntries(h.entries());
    if (Symbol.iterator in h) {
      return Object.fromEntries(
        Array.from(h as Iterable<Iterable<string>>, (entry) => Array.from(entry) as [string, string]),
      );
    }
    const headers: Record<string, string | readonly string[]> = {};
    for (const [name, value] of Object.entries<string | readonly string[] | undefined>(h)) {
      if (value !== undefined) headers[name] = value;
    }
    return headers;
  };
return customFetch<postApiVversionAuthRegisterResponse>(getPostApiVversionAuthRegisterUrl(version),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getHeaders(options?.headers) },
    body: JSON.stringify(userV1Dto)
  }
);}





export const getPostApiVversionAuthRegisterMutationKey = () => ['postApiVversionAuthRegister'] as const;

export const getPostApiVversionAuthRegisterMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiVversionAuthRegister>>, TError,PostApiVversionAuthRegisterMutationVariables, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiVversionAuthRegister>>, TError,PostApiVversionAuthRegisterMutationVariables, TContext> => {

const mutationKey = getPostApiVversionAuthRegisterMutationKey();
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiVversionAuthRegister>>, PostApiVversionAuthRegisterMutationVariables> = (props) => {
          const {version,data} = props ?? {};

          return  postApiVversionAuthRegister(version,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiVversionAuthRegisterMutationResult = NonNullable<Awaited<ReturnType<typeof postApiVversionAuthRegister>>>
    export type PostApiVversionAuthRegisterMutationBody = UserV1Dto | undefined
    export type PostApiVversionAuthRegisterMutationError = unknown
    export type PostApiVversionAuthRegisterMutationVariables = {version: string;data?: UserV1Dto}

    export const usePostApiVversionAuthRegister = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiVversionAuthRegister>>, TError,PostApiVversionAuthRegisterMutationVariables, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiVversionAuthRegister>>,
        TError,
        PostApiVversionAuthRegisterMutationVariables,
        TContext
      > => {
      return useMutation(getPostApiVversionAuthRegisterMutationOptions(options), queryClient);
    }
    export type postApiVversionAuthLoginResponse200 = {
  data: void
  status: 200
}

export type postApiVversionAuthLoginResponseSuccess = (postApiVversionAuthLoginResponse200) & {
  headers: Headers;
};
;

export type postApiVversionAuthLoginResponse = (postApiVversionAuthLoginResponseSuccess)

export const getPostApiVversionAuthLoginUrl = (version: string,) => {




  return `/api/v${version}/auth/login`
}

export const postApiVversionAuthLogin = async (version: string,
    userV1Dto?: UserV1Dto, options?: Parameters<typeof customFetch>[1]): Promise<postApiVversionAuthLoginResponse> => {

    const getHeaders = (h?: NonNullable<RequestInit['headers']>): Record<string, string | readonly string[]> => {
    if (!h) return {};
    if (h instanceof Headers) return Object.fromEntries(h.entries());
    if (Symbol.iterator in h) {
      return Object.fromEntries(
        Array.from(h as Iterable<Iterable<string>>, (entry) => Array.from(entry) as [string, string]),
      );
    }
    const headers: Record<string, string | readonly string[]> = {};
    for (const [name, value] of Object.entries<string | readonly string[] | undefined>(h)) {
      if (value !== undefined) headers[name] = value;
    }
    return headers;
  };
return customFetch<postApiVversionAuthLoginResponse>(getPostApiVversionAuthLoginUrl(version),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getHeaders(options?.headers) },
    body: JSON.stringify(userV1Dto)
  }
);}





export const getPostApiVversionAuthLoginMutationKey = () => ['postApiVversionAuthLogin'] as const;

export const getPostApiVversionAuthLoginMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiVversionAuthLogin>>, TError,PostApiVversionAuthLoginMutationVariables, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiVversionAuthLogin>>, TError,PostApiVversionAuthLoginMutationVariables, TContext> => {

const mutationKey = getPostApiVversionAuthLoginMutationKey();
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiVversionAuthLogin>>, PostApiVversionAuthLoginMutationVariables> = (props) => {
          const {version,data} = props ?? {};

          return  postApiVversionAuthLogin(version,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiVversionAuthLoginMutationResult = NonNullable<Awaited<ReturnType<typeof postApiVversionAuthLogin>>>
    export type PostApiVversionAuthLoginMutationBody = UserV1Dto | undefined
    export type PostApiVversionAuthLoginMutationError = unknown
    export type PostApiVversionAuthLoginMutationVariables = {version: string;data?: UserV1Dto}

    export const usePostApiVversionAuthLogin = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiVversionAuthLogin>>, TError,PostApiVversionAuthLoginMutationVariables, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiVversionAuthLogin>>,
        TError,
        PostApiVversionAuthLoginMutationVariables,
        TContext
      > => {
      return useMutation(getPostApiVversionAuthLoginMutationOptions(options), queryClient);
    }
