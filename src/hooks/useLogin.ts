import { LoginCredentials, LoginService } from "@/services/login.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      LoginService.Login(credentials),
    onSuccess: (data: any) => {
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
