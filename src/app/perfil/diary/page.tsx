"use client";

import { useState } from "react";
import { Entry } from "@/app/components/diary/entry";
import { NewEntry } from "@/app/components/diary/new-entry";

// Datos de ejemplo - reemplazar con datos reales de la base de datos
const sampleEntries = [
  {
    id: "1",
    title: "Mi primer día",
    content: "Hoy fue un día increíble...",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    title: "Reflexiones de la tarde",
    content: "Mientras miraba por la ventana...",
    createdAt: new Date("2024-01-02"),
  },
];

export default function Page() {
  const [entries] = useState(sampleEntries);

  const handleNewEntry = () => {
    // Implementar lógica para nueva entrada
    console.log("Nueva entrada");
  };

  const handleEntryClick = (id: string) => {
    // Implementar lógica para ver/editar entrada
    console.log("Click en entrada:", id);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] opacity-30 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] opacity-30 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Mi Diario Personal
            </h1>

            <div className="grid gap-6">
              <NewEntry onClick={handleNewEntry} />

              {entries.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  No hay entradas en tu diario aún. ¡Comienza a escribir!
                </p>
              ) : (
                entries.map((entry) => (
                  <Entry
                    key={entry.id}
                    title={entry.title}
                    content={entry.content}
                    createdAt={entry.createdAt}
                    onClick={() => handleEntryClick(entry.id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
