import { CEP } from "../entities/cep.entity";

export interface IExternalRepository {
  getCep(cep: string): Promise<CEP>;
}
