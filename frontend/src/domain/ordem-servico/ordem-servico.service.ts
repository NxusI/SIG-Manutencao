import {
  IGetPaginatedParams,
  PaginatedResponse,
} from "@/shared/types/paginated-request.types";
import { OrdemServico } from "./entities/ordem-servico.entity";
import { OrdemServicoRepository } from "./ordem-servico.repository";
import { ICreareOSParams } from "./params/create-os.params";

export class OrdemServicoService {
  private readonly repository: OrdemServicoRepository;

  constructor() {
    this.repository = new OrdemServicoRepository();
  }

  async getAll(
    params: IGetPaginatedParams,
  ): Promise<PaginatedResponse<OrdemServico>> {
    return await this.repository.getAll(params);
  }

  async getById(id: number): Promise<OrdemServico> {
    return await this.repository.getById(id);
  }

  async responder(
    id: number,
    resposta: "APROVADO" | "REPROVADO",
  ): Promise<OrdemServico> {
    return await this.repository.responder(id, resposta);
  }

  async finalizar(id: number): Promise<void> {
    return await this.repository.finalizar(id);
  }

  async update(
    id: number,
    data: Partial<ICreareOSParams>,
  ): Promise<OrdemServico> {
    return await this.repository.update(id, data);
  }

  async create(data: ICreareOSParams): Promise<OrdemServico> {
    return await this.repository.create(data);
  }

  async pagamento(id: number): Promise<void> {
    return await this.repository.pagamento(id);
  }
  
  async garantia(id: number, garantia: string): Promise<void> {
    return await this.repository.garantia(id, garantia);
  }
}
