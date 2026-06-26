// types/api.ts — ApiSuccess<T> and ApiError discriminated union shapes

export interface ApiSuccess<T> {
  readonly status: "success";
  readonly data: T;
}

export interface ApiError {
  readonly status: "error";
  readonly error: string;
  readonly code: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export function successResponse<T>(data: T): ApiSuccess<T> {
  return { status: "success", data };
}

export function errorResponse(error: string, code: string): ApiError {
  return { status: "error", error, code };
}
