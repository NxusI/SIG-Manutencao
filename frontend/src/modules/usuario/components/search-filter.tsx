import { TipoUsuario } from "@/domain/usuario/entities/usuario.entity";
import CustomSelect from "@/shared/components/comon/select";
import { Input } from "@/shared/components/ui/input";
import { OptionFormatted } from "@/shared/types/components.types";
import { useState } from "react";
import { FilterProps } from "../types/usuario.types";
import { Button } from "@/shared/components/ui/button";
import { Search, X } from "lucide-react";

const FilterUsuario = ({ onFilter }: FilterProps) => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [tipo, setTipo] = useState<OptionFormatted | null>(null);

  const handleFilter = () => {
    onFilter(nome, email, login, tipo);
  };

  const handleClear = () => {
    setNome("");
    setEmail("");
    setLogin("");
    setTipo(null);
    onFilter("", "", "", null);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Input
        placeholder="Pesquisar por Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <Input
        placeholder="Pesquisar por E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Pesquisar por Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <CustomSelect
        label="Pesquisar por Tipo Usuário"
        onChange={setTipo}
        options={Object.keys(TipoUsuario).map((t) => ({ value: t, label: t }))}
        value={tipo}
        className="w-full"
      />
      <Button size={"icon"} onClick={handleFilter}>
        <Search />
      </Button>
      <Button
        size={"icon"}
        className="bg-gray-500 hover:bg-gray-400"
        onClick={handleClear}
      >
        <X />
      </Button>
    </div>
  );
};

export default FilterUsuario;
