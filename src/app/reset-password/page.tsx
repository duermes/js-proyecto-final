"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../lib/authContext";

export default function ResetPasswordPage() {
  const { requestReset, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!email.trim()) {
      setMessage("El correo electrónico es obligatorio.");
      return;
    }
    try {
      const res = await requestReset(email);
      if (!res) {
        setMessage("Error al solicitar el restablecimiento de contraseña");
        return;
      }
      setMessage(res.data.message);
    } catch (error) {
      console.log(error);
      setMessage("Error al solicitar el restablecimiento de contraseña");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] opacity-30 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] opacity-30 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 w-full max-w-md">
            <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Restablecer Contraseña
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 text-white placeholder-gray-400"
                  required
                />
                {message && <p className="text-gray-300 text-sm">{message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar Correo"}
              </button>
            </form>

            <div className="mt-6 space-y-4">
              <Link
                href="/login"
                className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                ¿Ya tienes cuenta? Inicia sesión
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
                  src="/arrow.svg"
                  alt="Volver al inicio"
                  width={15}
                  height={15}
                  className="inline-block mr-2 mb-1"
                />
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
