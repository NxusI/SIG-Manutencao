import { LoginResponse } from "../entities/login.entity";
import { IAlterarSenhaParams } from "../params/alterar-senha.params";
import { LoginParams } from "../params/login.params";

export interface IAuthRepository {
  login(params: LoginParams): Promise<LoginResponse>;
  alterarSenha(params: IAlterarSenhaParams): Promise<{
    message: string;
  }>;
}
