import { AuthRepository } from "./auth.repository";
import { LoginResponse } from "./entities/login.entity";
import { IAlterarSenhaParams } from "./params/alterar-senha.params";
import { LoginParams } from "./params/login.params";

export class AuthService {
  private readonly repository: AuthRepository;

  constructor() {
    this.repository = new AuthRepository();
  }

  async login(params: LoginParams): Promise<LoginResponse> {
    return await this.repository.login(params);
  }

  async alterarSenha(
    params: IAlterarSenhaParams
  ): Promise<{ message: string }> {
    return await this.repository.alterarSenha(params);
  }
}
