import { LoginParams } from "@/domain/auth/params/login.params";

export interface DecodedToken {
  idUsuario: number;
  nome: string;
  tipo: string;
  email: string;
  idEmpresa: number;
  iat: number;
  exp: number;
}

export interface AuthContextProps {
  userId: number | null;
  userName: string | null;
  userType: string | null;
  expiresAt: number | null;
  email: string | null;
  idEmpresa: number | null;
  isAuthenticated: boolean;
  isFirstAccess: boolean;
  login: (params: LoginParams) => Promise<void>;
  logout: () => void;
}
