import { OptionFormatted } from "@/shared/types/components.types";

export interface FilterProps {
  onFilter: (
    nome: string,
    login: string,
    email: string,
    tipo: OptionFormatted | null,
  ) => void;
}
