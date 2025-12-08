import Cookies from "js-cookie";

interface TokenOptions {
  expires?: number | Date;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

class TokenStorage {
  private static TOKEN_KEY = "auth_token";

  static setToken(token: string, options: TokenOptions = {}) {
    Cookies.set(TokenStorage.TOKEN_KEY, token, {
      expires: options.expires,
      secure: options.secure ?? true,
      sameSite: options.sameSite || "Strict",
      path: "/",
    });
  }

  static getToken(): string | undefined {
    return Cookies.get(TokenStorage.TOKEN_KEY);
  }

  static removeToken() {
    Cookies.remove(TokenStorage.TOKEN_KEY, { path: "/" });
  }
}

export default TokenStorage;