import { OrdemServico } from "../entities/ordem-servico.entity";
import { ICreareOSParams } from "../params/create-os.params";

export interface IOrdemServicoRepository {
  create(data: ICreareOSParams): Promise<OrdemServico>;
  getAll(): Promise<OrdemServico[]>;
  getById(id: number): Promise<OrdemServico>;
  update(id: number, data: Partial<ICreareOSParams>): Promise<OrdemServico>;
  finalizar(id: number): Promise<void>;
  responder(
    id: number,
    resposta: "APROVADO" | "REPROVADO",
  ): Promise<OrdemServico>;
}
