import BaseModal from "@/shared/components/comon/base-modal";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import CreateOS from "./create-form";

const OrdemServico = () => {
  return (
    <div className="grid gap-5">
      <div className="flex justify-end">
        <BaseModal
          size="xl"
          title="Cadastrar nova Ordem de Serviço"
          description="Preencha as informações abaixo para criar uma nova Ordem de Serviço"
          trigger={
            <Button>
              <Plus /> Criar OS
            </Button>
          }
        >
          <CreateOS/>
        </BaseModal>
      </div>
    </div>
  );
};

export default OrdemServico;
