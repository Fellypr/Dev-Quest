export class ApiError<T = unknown> extends Error {
  status: number;
  statusText: string;
  data: T | null;
  headers: Headers;

  constructor(
    status: number,
    statusText: string,
    data: T | null,
    headers: Headers,
    message?: string
  ) {
    let defaultMessage = `Erro HTTP: ${status} ${statusText}`;

    if (data && typeof data === 'object') {
      const dataObj = data as Record<string, unknown>;
      if (typeof dataObj.mensagem === 'string') {
        defaultMessage = dataObj.mensagem;
      } else if (typeof dataObj.message === 'string') {
        defaultMessage = dataObj.message;
      }
    }

    super(message || defaultMessage);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.headers = headers;
  }
}

export async function customFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5263';
  const fullUrl = `${baseUrl}${url}`;

  const headers = new Headers(options?.headers);
  if (!headers.has('Content-Type') && options?.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json') || contentType.includes('+json');

  let responseData: unknown = null;
  if (response.status !== 204 && response.status !== 205) {
    try {
      responseData = isJson ? await response.json() : await response.text();
    } catch {
      responseData = null;
    }
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      response.statusText,
      responseData,
      response.headers
    );
  }

  return {
    data: responseData,
    status: response.status,
    headers: response.headers,
  } as T;
}

export default customFetch;