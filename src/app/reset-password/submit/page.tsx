"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/app/lib/authContext";
import Image from "next/image";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const { resetPassword, loading } = useAuth();

  const resetToken = decodeURIComponent(searchParams.get("resetToken") || "");
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formValid = true;
    const newErrors = {
      password: "",
    };

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es obligatoria.";
      formValid = false;
    }
    if (formData.password.trim() != formData.password2.trim()) {
      newErrors.password = "La contraseña no coinciden.";
      formValid = false;
    }
    setErrors(newErrors);

    if (formValid) {
      const res = await resetPassword(formData.password, resetToken);
      if (!res) {
        setErrors({ password: "Error de conexión." });
      }
      if (res === undefined) {
        return setErrors({ password: "Error de conexión." });
      }
      console.log(res);
      setErrors({ password: res.data.message });
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
            Cambiar contraseña
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 text-white placeholder-gray-400"
                placeholder="Nueva Contraseña"
                required
              />
            </div>
            <div className="space-y-2">
              <input
                type="password"
                id="password2"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 text-white placeholder-gray-400"
                placeholder="Confirmar Contraseña"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Cambiar"}
            </button>
          </form>

          <div className="mt-6 space-y-2">
            <Link
              href="/login"
              className="block w-full text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              Inicia Sesión
            </Link>
            <hr className="my-4 border-gray-700" />
            <p className="text-gray-400 text-sm">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/register"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Regístrate aquí
              </Link>
            </p>
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
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
