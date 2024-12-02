"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../lib/authContext";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Perfil actualizado exitosamente");
      } else {
        setMessage(data.message || "Error al actualizar el perfil");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUserData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }, [user]);

  return (
    <div>
      <main className="flex-grow">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] opacity-30 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] opacity-30 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 w-full max-w-md">
            <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Tu Perfil
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={user.firstName}
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
                    value={user.lastName}
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
                  value={user.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
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
                {loading ? "Actualizando..." : "Actualizar Perfil"}
              </button>
            </form>

            <div className="mt-6">
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
      </main>
    </div>
  );
}
