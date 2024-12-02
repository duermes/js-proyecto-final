"use client";

import Link from "next/link";
import { useAuth } from "../lib/authContext";

export default function Navbar() {
  const { logout } = useAuth();
  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
        >
          Mi App
        </Link>
        <div className="space-x-4">
          <>
            <Link
              href="/perfil"
              className="hover:text-purple-400 transition-colors duration-200"
            >
              Perfil
            </Link>
            <Link
              href="/library"
              className="hover:text-purple-400 transition-colors duration-200"
            >
              Librería
            </Link>
            <button
              onClick={logout}
              className="hover:text-purple-400 transition-colors duration-200"
            >
              Cerrar Sesión
            </button>
          </>
        </div>
      </div>
    </nav>
  );
}
