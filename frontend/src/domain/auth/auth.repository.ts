import { apiClient } from "@/infraestructure/api/api-client";
import { IAuthRepository } from "./contracts/login-repository.interface";
import { LoginResponse } from "./entities/login.entity";
import { LoginParams } from "./params/login.params";
import { IAlterarSenhaParams } from "./params/alterar-senha.params";

export class AuthRepository implements IAuthRepository {
  async login(params: LoginParams): Promise<LoginResponse> {
    const res = await apiClient.post(`auth/login`, params);
    return res.data;
  }

  async alterarSenha(
    params: IAlterarSenhaParams
  ): Promise<{ message: string }> {
    const res = await apiClient.patch(`auth/alterar-senha`, params);
    return res.data;
  }
}
