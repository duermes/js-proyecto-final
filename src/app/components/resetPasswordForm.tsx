"use client";
import React, { useState, Suspense } from "react";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import { useAuth } from "@/lib/authContext";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetToken = decodeURIComponent(searchParams.get("resetToken") || "");
  const { resetPassword } = useAuth();
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
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
      setLoading(true);
      await resetPassword(formData.password, resetToken);
      setLoading(false);
    }
  };

  return (
    <section className="w-full pt-28 flex flex-col items-center ">
      <div className="bg-radial-gradient-2 bg-gray-800 rounded-lg p-8 mx-8 max-w-md">
        <h1 className="text-white text-3xl font-semibold mb-4 text-center">
          Cambiar contraseña
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col items-center justify-center"
        >
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full bg-white text-white rounded-2xl p-2 bg-opacity-20 ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="  Nueva Contraseña"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              className={`w-full bg-white text-white rounded-2xl p-2 bg-opacity-20 ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="  Confirmar Contraseña"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-3/4 bg-green-500 text-white text-lg py-2 rounded-2xl transition duration-300 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Cambiar"}
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
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
      <Footer />
    </main>
  );
}
