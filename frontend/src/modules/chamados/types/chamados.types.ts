import { Chamado } from "@/domain/chamado/entities/chamado.entity";

export type Column = {
  id: number;
  title: string;
  color: string;
  cards: Chamado[];
};
