import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastAlert } from "./comon/alert";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertConfig, setAlertConfig] = useState<{
    icon: "success" | "error" | "warning";
    title: string;
    className?: string;
  } | null>(null);

  const router = useRouter();

  const handleSubmit = () => {
    if (!login || !password) {
      setAlertConfig({
        icon: "warning",
        title: "Preencha todos os campos",
      });
      return;
    }

    router.push("/home");
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login na sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Entre com login e senha para prosseguir
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Login</FieldLabel>
          <Input
            type="email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>
        <Field>
          <Button type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </Field>
      </FieldGroup>

      {alertConfig && <ToastAlert {...alertConfig} />}
    </form>
  );
}
