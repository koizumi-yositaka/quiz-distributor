import axiosInstance from "../axiosInstance";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    idToken: string;
    expiresIn: number;
}

export const mwlogin = async (data: LoginRequest) => {
  const response = await axiosInstance.post<LoginResponse>("/mwLogin", data);
  return response.data;
};