import { ClienteRepository } from "./cliente.repository";
import { Cliente } from "./entities/cliente.entity";
import { ICreateClienteParams } from "./params/create-cliente.params";

export class ClienteService {
  private readonly repository: ClienteRepository;

  constructor() {
    this.repository = new ClienteRepository();
  }

  async getAll(): Promise<Cliente[]> {
    return await this.repository.getAll();
  }

  async create(data: ICreateClienteParams): Promise<Cliente> {
    const { telefone, email, nome } = data;
    const clean = telefone.replace(/\D/g, "");

    return await this.repository.create({
      telefone: clean,
      email,
      nome,
    });
  }

  async update(
    id: number,
    data: Partial<ICreateClienteParams>
  ): Promise<Cliente> {
    const { telefone, email, nome } = data;
    const clean = telefone?.replace(/\D/g, "");

    return await this.repository.update(id, {
      ...(clean && { telefone: clean }),
      ...(email && { email }),
      ...(nome && { nome }),
    });
  }

  async delete(id: number): Promise<void> {
    return await this.repository.delete(id);
  }
}
