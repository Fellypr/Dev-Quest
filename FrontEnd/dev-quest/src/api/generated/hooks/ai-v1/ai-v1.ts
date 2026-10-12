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
  AiCompletionRequestV1Dto
} from '../../interfaces';

import { customFetch } from '../../../custom-fetch';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export type postApiVversionAiCompletionResponse200 = {
  data: void
  status: 200
}

export type postApiVversionAiCompletionResponseSuccess = (postApiVversionAiCompletionResponse200) & {
  headers: Headers;
};
;

export type postApiVversionAiCompletionResponse = (postApiVversionAiCompletionResponseSuccess)

export const getPostApiVversionAiCompletionUrl = (version: string,) => {




  return `/api/v${version}/ai/completion`
}

export const postApiVversionAiCompletion = async (version: string,
    aiCompletionRequestV1Dto?: AiCompletionRequestV1Dto, options?: Parameters<typeof customFetch>[1]): Promise<postApiVversionAiCompletionResponse> => {

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
return customFetch<postApiVversionAiCompletionResponse>(getPostApiVversionAiCompletionUrl(version),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getHeaders(options?.headers) },
    body: JSON.stringify(aiCompletionRequestV1Dto)
  }
);}





export const getPostApiVversionAiCompletionMutationKey = () => ['postApiVversionAiCompletion'] as const;

export const getPostApiVversionAiCompletionMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiVversionAiCompletion>>, TError,PostApiVversionAiCompletionMutationVariables, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiVversionAiCompletion>>, TError,PostApiVversionAiCompletionMutationVariables, TContext> => {

const mutationKey = getPostApiVversionAiCompletionMutationKey();
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiVversionAiCompletion>>, PostApiVversionAiCompletionMutationVariables> = (props) => {
          const {version,data} = props ?? {};

          return  postApiVversionAiCompletion(version,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type PostApiVversionAiCompletionMutationResult = NonNullable<Awaited<ReturnType<typeof postApiVversionAiCompletion>>>
    export type PostApiVversionAiCompletionMutationBody = AiCompletionRequestV1Dto | undefined
    export type PostApiVversionAiCompletionMutationError = unknown
    export type PostApiVversionAiCompletionMutationVariables = {version: string;data?: AiCompletionRequestV1Dto}

    export const usePostApiVversionAiCompletion = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiVversionAiCompletion>>, TError,PostApiVversionAiCompletionMutationVariables, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiVversionAiCompletion>>,
        TError,
        PostApiVversionAiCompletionMutationVariables,
        TContext
      > => {
      return useMutation(getPostApiVversionAiCompletionMutationOptions(options), queryClient);
    }
