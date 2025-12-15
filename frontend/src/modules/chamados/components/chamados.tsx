import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { LayoutGrid, Plus, Table } from "lucide-react";
import { useState } from "react";

const Chamados = () => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-3">
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setViewMode("table")}
            className={`hover:scale-105 ${
              viewMode === "table" ? "bg-primary text-white" : ""
            }`}
          >
            <Table />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setViewMode("grid")}
            className={`hover:scale-105 ${
              viewMode === "grid" ? "bg-primary text-white" : ""
            }`}
          >
            <LayoutGrid />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row justify-end gap-2">
          <Input
            placeholder="Pesquisar Chamado..."
            className="lg:max-w-[350px]"
          />
          <Button>
            <Plus /> Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chamados;
