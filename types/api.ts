export type ApiResponse<T = unknown> = {
    data: T;
    status: number;
    statusText: string;
};
  
export type ApiError = {
    message: string;
    status?: number;
    data?: unknown;
    code?: string;
};
  
export type LoginResponse = {
    accessToken: string;
    userId: string;
    username: string;
};
  
export type RegisterResponse = {
    id: string;
    email: string;
    password: string;
    username: string;
};
  
export type validateTokenResponse = {
    userId: string;
    message: string;
};