import axios from "axios";
import { IExternalRepository } from "./contracts/external-repository.interface";
import { CEP } from "./entities/cep.entity";

export class ExternalRepository implements IExternalRepository {
  async getCep(cep: string): Promise<CEP> {
    const res = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);
    return res.data;
  }
}
