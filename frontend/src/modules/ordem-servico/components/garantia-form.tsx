import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useState } from "react";
import { useGarantia } from "../hooks/use-ordem-servico";
import { Loader2 } from "lucide-react";
import { ToastAlert } from "@/shared/components/comon/alert";

const GarantiaForm = ({ id, refetch }: { id: number, refetch: () => void }) => {
  const [garantia, setGarantia] = useState<string>("");
  const [alert, setAlert] = useState<{
    id: number;
    icon: "success" | "error";
    title: string;
  } | null>(null);

  const { loading, garantia: send } = useGarantia();

  const handleSubmit = async () => {
    await send({ id, garantia })
      .then(() => {
        setAlert({
          id: Date.now(),
          icon: "success",
          title:
            "Garantia enviada com sucesso! Um e-mail de aviso acaba de ser enviado ao cliente!",
        });
        refetch();
      })
      .catch(() => {
        setAlert({
          id: Date.now(),
          icon: "error",
          title: "Houve uma inconsistencia ao tentar registrar garantia",
        });
      });
  };
  return (
    <div className="grid gap-5">
      <div className="grid gap-2">
        <Label>Garantia</Label>
        <Input
          value={garantia}
          onChange={(e) => setGarantia(e.target.value)}
          placeholder="Informe o prazo de garantia (dias)"
        />
      </div>
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : "Enviar"}
      </Button>

      {alert && <ToastAlert key={alert.id} {...alert} />}
    </div>
  );
};

export default GarantiaForm;
