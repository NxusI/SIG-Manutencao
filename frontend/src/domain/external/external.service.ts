import { CEP } from "./entities/cep.entity";
import { ExternalRepository } from "./external.repository";

export class ExternalService {
  private readonly repository: ExternalRepository;
  constructor() {
    this.repository = new ExternalRepository();
  }

  async getCep(cep: string): Promise<CEP> {
    return this.repository.getCep(cep);
  }
}
