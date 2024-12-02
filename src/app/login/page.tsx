"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../lib/authContext";

export default function Home() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);
    } catch (error) {
      console.log(error);
      setMessage("Error al iniciar sesión");
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
            Iniciar Sesión
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 text-white placeholder-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <input
                type="password"
                placeholder="Contraseña"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
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
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="mt-6 space-y-2">
            <Link
              href="/reset-password"
              className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <Link
              href="/register"
              className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              ¿No tienes cuenta? Regístrate
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
