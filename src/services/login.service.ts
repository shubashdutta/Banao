import { apiRequest } from "@/lib/axiosSetup";

export interface LoginCredentials {
  email: string;
  password: string;
}

export const LoginService = {
  Login: async (credentials: LoginCredentials) => {
    return apiRequest.post("/login", credentials);
  },
};
