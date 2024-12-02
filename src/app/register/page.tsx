"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../lib/authContext";

export default function Home() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { singUp, loading } = useAuth();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await singUp(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password
      );
      setMessage(res.data.message);
    } catch (error) {
      console.log(error);
      setMessage("Error al crear usuario");
    } finally {
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] opacity-30 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] opacity-30 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Crear Cuenta
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={userData.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 text-white placeholder-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Apellido"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 text-white placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 text-white placeholder-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <input
                type="password"
                placeholder="Contraseña"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 text-white placeholder-gray-400"
                required
              />
            </div>
            <div className="text-sm text-gray-300">{message}</div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            >
              {loading ? "Cargando..." : "Crear cuenta"}
            </button>
          </form>

          <div className="mt-6">
            <Link
              href="/login"
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
            <Link
              href="/"
              className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              <Image
                src="arrow.svg"
                alt="Volver al inicio"
                width={15}
                height={15}
                className="inline-block mr-2 mb-1 "
              />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
