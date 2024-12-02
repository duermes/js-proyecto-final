"use client";
import React, { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { hasCookie } from "cookies-next";
import { User } from "./types";

export interface AuthContextType {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  singUp: (
    name: string,
    lastname: string,
    email: string,
    password: string
  ) => Promise<{ data: { message: string }; status: number } | undefined>;
  loading: boolean;
  requestReset: (
    email: string
  ) => Promise<{ data: { message: string }; status: number } | undefined>;
  resetPassword: (password: string, token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    userId: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
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
    })
      .then(async (res) => {
        if (res.status == 200) {
          setLoading(false);
          await fetch(`${process.env.NEXT_PUBLIC_API}/auth/profile`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }).then(async (res) => {
            if (res.status == 200) {
              const data = await res.json();
              console.log(data);
              setUser(data);
              setLoading(false);
              router.push("/perfil");
            } else {
              console.log(res);
              console.error("Error al obtener el perfil del usuario");
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
        return error;
      })
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        console.log(res);
        if (res.status == 200) {
          router.push("/");
          setUser({
            userId: "",
            email: "",
            firstName: "",
            lastName: "",
            role: "",
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  };

  const singUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/auth/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
      return {
        data: data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error durante el registro:", error);
    } finally {
      setLoading(false);
    }
  };

  const requestReset = async (email: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/auth/reset-password/request`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      return {
        status: response.status,
        data: data,
      };
    } catch (error) {
      console.error("Error requesting password reset:", error);
      throw error;
    } finally {
      setLoading(false);
    }
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
        await fetch(`${process.env.NEXT_PUBLIC_API}/auth/profile`, {
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
