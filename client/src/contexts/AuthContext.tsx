import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { graphqlRequest } from "../lib/graphql";

export type AuthUserRole = "USER" | "ADMIN";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: AuthUserRole;
  createdAt: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (input: { email: string; password: string }) => Promise<void>;
  register: (input: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        name
        email
        role
        createdAt
      }
    }
  }
`;

const REGISTER_MUTATION = `
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        name
        email
        role
        createdAt
      }
    }
  }
`;

const ME_QUERY = `
  query Me {
    me {
      id
      name
      email
      role
      createdAt
    }
  }
`;

const LOGOUT_MUTATION = `
  mutation Logout {
    logout
  }
`;

const STORAGE_KEY = "tourism_auth_token";
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(localStorage.getItem(STORAGE_KEY)));

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    let active = true;

    async function loadCurrentUser() {
      try {
        const data = await graphqlRequest<{ me: AuthUser | null }>({
          query: ME_QUERY,
          token
        });

        if (!active) return;
        setUser(data.me);
      } catch {
        if (!active) return;
        localStorage.removeItem(STORAGE_KEY);
        setToken(null);
        setUser(null);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadCurrentUser();

    return () => {
      active = false;
    };
  }, [token]);

  async function login(input: { email: string; password: string }) {
    const data = await graphqlRequest<{ login: { token: string; user: AuthUser } }, { input: typeof input }>({
      query: LOGIN_MUTATION,
      variables: { input }
    });

    localStorage.setItem(STORAGE_KEY, data.login.token);
    setToken(data.login.token);
    setUser(data.login.user);
  }

  async function register(input: { name: string; email: string; password: string }) {
    const data = await graphqlRequest<{ register: { token: string; user: AuthUser } }, { input: typeof input }>({
      query: REGISTER_MUTATION,
      variables: { input }
    });

    localStorage.setItem(STORAGE_KEY, data.register.token);
    setToken(data.register.token);
    setUser(data.register.user);
  }

  async function logout() {
    if (token) {
      try {
        await graphqlRequest<{ logout: boolean }>({
          query: LOGOUT_MUTATION,
          token
        });
      } catch {
      }
    }

    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user && token),
      isAdmin: user?.role === "ADMIN",
      login,
      register,
      logout
    }),
    [loading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth phải được dùng trong AuthProvider.");
  }

  return context;
}
