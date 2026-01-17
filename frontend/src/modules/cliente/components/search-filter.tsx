import { Input } from "@/shared/components/ui/input";
import { FilterProps } from "../types/clientes.types";
import { Button } from "@/shared/components/ui/button";
import { Search, X } from "lucide-react";
import { useState } from "react";

const FilterCliente = ({ onFilter }: FilterProps) => {
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleFilter = () => {
    onFilter(nome, telefone, email);
  };

  const handleClear = () => {
    setNome("");
    setTelefone("");
    setEmail("");
    onFilter("", "", "");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Pesquisar por nome"
      />
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Pesquisar por e-mail"
      />
      <Input
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        placeholder="Pesquisar por telefone"
      />
      <Button size={"icon"} onClick={handleFilter}>
        <Search />
      </Button>
      <Button size={"icon"} className="bg-gray-500 hover:bg-gray-400" onClick={handleClear}>
        <X />
      </Button>
    </div>
  );
};

export default FilterCliente;
