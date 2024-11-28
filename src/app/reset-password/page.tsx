"use client";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import Turnstile from "react-turnstile";

import { useRouter } from "next/navigation";
import { useAuth } from "../lib/authContext";

export default function Home() {
  const router = useRouter();
  const { requestReset } = useAuth();
  const [token, setToken] = useState();
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

    // Validación de campos
    let formValid = true;
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
      formValid = false;
    }
    setErrors(newErrors);

    if (formValid) {
      setLoading(true);
      requestReset(formData.email, token);
      setLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar />
      <section className="w-full pt-28 flex flex-col items-center ">
        <div className="bg-radial-gradient-2 bg-gray-800 rounded-lg p-8 mx-8 max-w-md">
          <h1 className="text-white text-3xl font-semibold mb-4 text-center">
            Restablecer contraseña
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col items-center justify-center"
          >
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-white text-white rounded-2xl p-2 bg-opacity-20 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="  Correo electrónico"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <Turnstile
              sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
              size="normal"
              autoResetOnExpire={true}
              fixedSize={true}
              onVerify={(token) => setToken(token)}
            />
            <button
              type="submit"
              className="w-3/4 bg-green-500 text-white text-lg py-2 rounded-2xl transition duration-300 hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Solicitar Correo"}
            </button>
          </form>
          <div className="pt-4 text-center">
            <button
              onClick={() => {
                router.push("/login");
              }}
              className="text-blue-400"
            >
              Inicia Session
            </button>
          </div>
          <hr className="my-4 border-gray-700" />
          <div className="text-gray-400 text-lg text-center">
            <p>
              ¿No tienes una cuenta? <br />{" "}
              <button
                onClick={() => {
                  router.push("/register");
                }}
                className="text-blue-400"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
