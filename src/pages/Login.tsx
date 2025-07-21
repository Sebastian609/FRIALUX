import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginUser } from "@/services/user/login.service";
import { LoginUserDTO } from "@/types/users/user.type";
import { useState } from "react";
import Button from "@/components/shared/buttons/Button";
import { useAuth } from "@/stores/auth-context";

const LoginSchema = z.object({
  username: z.string().trim().min(1, "El usuario es obligatorio"),
  password: z.string().trim().min(1, "La contraseña es obligatoria"),
});
type LoginType = z.infer<typeof LoginSchema>;

export default function Login() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: LoginType) => {
    setError("");
    // Bypass para admin/admin
    if (data.username === "admin" && data.password === "admin") {
      login("admin-token-bypass");
      window.location.href = "/";
      return;
    }
    try {
      const user = await loginUser(data as LoginUserDTO);
      login(user.token); // Guarda el token en el AuthProvider
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              {...register("username")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Usuario"
              autoComplete="username"
            />
            {errors.username && <p className="text-red-600 text-xs mt-1">{errors.username.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contraseña"
              autoComplete="current-password"
            />
            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
          </div>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full" loading={isSubmitting}>
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
} 