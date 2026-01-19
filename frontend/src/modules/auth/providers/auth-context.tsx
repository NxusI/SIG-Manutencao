"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import { LoginParams } from "@/domain/auth/params/login.params";
import { LoginResponse } from "@/domain/auth/entities/login.entity";
import TokenStorage from "@/infraestructure/cookies/cookie-storage";
import { AuthService } from "@/domain/auth/auth.service";
import { AuthContextProps, DecodedToken } from "../types/auth.types";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [idEmpresa, setIdEmpresa] = useState<number | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [isFirstAccess, setIsFirstAccess] = useState<boolean>(false);
  const router = useRouter();

  const login = useCallback(async (params: LoginParams) => {
    const service = new AuthService();
    const response: LoginResponse = await service.login(params);

    const { token } = response;
    if (!token) throw new Error("Token ausente na resposta de login");

    const decoded = jwtDecode<DecodedToken>(token);

    const anoAtual = new Date().getFullYear();
    const senhaPadrao = `rob${anoAtual}`;
    setIsFirstAccess(params.senha === senhaPadrao);

    const expAsDate = new Date(decoded.exp * 1000);
    TokenStorage.setToken(token, { expires: expAsDate });

    setUserId(decoded.idUsuario);
    setUserName(decoded.nome);
    setUserType(decoded.tipo);
    setExpiresAt(decoded.exp);
    setEmail(decoded.email);
    setIdEmpresa(decoded.idEmpresa);
  }, []);

  const logout = useCallback(() => {
    TokenStorage.removeToken();
    setUserId(null);
    setUserName(null);
    setUserType(null);
    setExpiresAt(null);
    setEmail(null);
    setIdEmpresa(null);
    setIsFirstAccess(false);

    router.push("/login");
  }, []);

  useEffect(() => {
    const token = TokenStorage.getToken();
    if (!token) return;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const agora = Date.now() / 1000;
      if (decoded.exp < agora) {
        logout();
        return;
      }

      setUserId(decoded.idUsuario);
      setEmail(decoded.email);
      setIdEmpresa(decoded.idEmpresa);
      setUserName(decoded.nome);
      setUserType(decoded.tipo);
      setExpiresAt(decoded.exp);
    } catch (err) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAuthenticated = !!userId;

  return (
    <AuthContext.Provider
      value={{
        userId,
        userName,
        userType,
        expiresAt,
        isAuthenticated,
        isFirstAccess,
        login,
        logout,
        email,
        idEmpresa,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}
