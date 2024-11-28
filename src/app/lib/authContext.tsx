"use client";
import React, { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { hasCookie } from "cookies-next";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
  singUp: (
    name: string,
    lastname: string,
    email: string,
    password: string,
    token: string,
    role: string
  ) => Promise<{ data: User; status: number } | undefined>;
  loading: boolean;
  requestReset: (email: string, token: string) => Promise<void>;
  resetPassword: (password: string, token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(async (res) => {
      if (res.status == 200) {
        setLoading(false);
        await fetch(`${process.env.NEXT_PUBLIC_API}/users/profile`, {
          method: "GET",
          credentials: "include",
        }).then(async (res) => {
          if (res.status == 200) {
            const data = await res.json();
            setUser(data);
          }
          setLoading(false);
          router.push("/perfil");
        });
      }
    });
  };

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API}/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).then(async (res) => {
      if (res.status == 200) {
        router.push("/");
        setUser(null);
        setLoading(false);
      }
    });
  };

  const singUp = async (
    name: string,
    lastname: string,
    email: string,
    password: string,
    token: string
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/auth/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: name.split(" "),
            last_name: lastname.split(" "),
            email: email,
            password: password,
            token: token,
          }),
        }
      );

      if (response.status === 200) {
        setLoading(false);
      }
      return {
        data: await response.json(),
        status: response.status,
      };
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const requestReset = async (email: string, token: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API}/auth/resetPassword/request`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        token: token,
      }),
    }).then(async (res) => {
      if (res.status == 200) {
        setLoading(false);
      }
    });
  };

  const resetPassword = async (password: string, token: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API}/auth/resetPassword/submit`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    }).then(async (res) => {
      if (res.status == 200) {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (!hasCookie("token")) return;
    if (!user) {
      const fetchUserData = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API}/users/profile`, {
          method: "GET",
          credentials: "include",
        })
          .then(async (res) => {
            if (res.status == 200) {
              const data = await res.json();
              setUser(data);
            }
          })
          .finally(() => setLoading(false));
      };
      fetchUserData();
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        singUp,
        loading,
        requestReset,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
