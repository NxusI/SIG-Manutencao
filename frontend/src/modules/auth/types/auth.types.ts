import { LoginParams } from "@/domain/auth/params/login.params";

export interface DecodedToken {
  id: number;
  nome: string;
  tipo: string;
  iat: number;
  exp: number;
}

export interface AuthContextProps {
  userId: number | null;
  userName: string | null;
  userType: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
  isFirstAccess: boolean;
  login: (params: LoginParams) => Promise<void>;
  logout: () => void;
}
