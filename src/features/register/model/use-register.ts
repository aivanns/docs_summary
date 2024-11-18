import { useRouter } from "next/navigation";
import { RegisterFormData } from "@/features/register/types";
import { AUTH } from "@/shared/router/routes";
import { registerApi } from "../api";
import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/enums/query-keys";

export const useRegister = () => {
  const router = useRouter();

  const { mutateAsync: register } = useMutation({
    mutationKey: [QUERY_KEYS.REGISTER],
    mutationFn: (credentials: RegisterFormData) =>
      registerApi.register(credentials),
    onSuccess: () => {
      router.push(AUTH);
    },
  });

  return {
    register,
  };
};
