import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastAlert } from "./comon/alert";
import { useAuth } from "@/modules/auth/providers/auth-context";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [alertConfig, setAlertConfig] = useState<{
    icon: "success" | "error" | "warning";
    title: string;
    className?: string;
  } | null>(null);

  const router = useRouter();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!login || !password) {
      setAlertConfig({
        icon: "warning",
        title: "Preencha todos os campos",
      });
      return;
    }

    await authLogin({ login, senha: password })
      .then(() => router.push("/home"))
      .catch((err) => {
        setAlertConfig({
          icon: "warning",
          title:
            err.response?.data?.message || "Inconsistência ao realizar login",
        });
      });
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6")}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login na sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Entre com login e senha para prosseguir
          </p>
        </div>

        <div className="grid gap-1">
          <FieldLabel htmlFor="login">Login</FieldLabel>
          <Input
            id="login"
            name="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-1">
          <FieldLabel htmlFor="password">Senha</FieldLabel>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Field>
          <Button type="submit">Login</Button>
        </Field>
      </FieldGroup>

      {alertConfig && <ToastAlert {...alertConfig} />}
    </form>
  );
}
