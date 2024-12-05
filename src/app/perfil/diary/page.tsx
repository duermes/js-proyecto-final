"use client";

import { useCallback, useEffect, useState } from "react";
import { Entry } from "@/app/components/diary/entry";
import { NewEntryModal } from "@/app/components/diary/new-entry-modal";
import { NewEntryButton } from "@/app/components/diary/new-entry-button";

interface DiaryEntryType {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export default function Page() {
  const [entries, setEntries] = useState<DiaryEntryType[]>([]);
  const [isNewEntryModalOpen, setIsNewEntryModalOpen] = useState(false);

  const newEntry = useCallback(async (title: string, content: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/diary/create-entry`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      }
    );
    return res.status;
  }, []);

  const getEntries = useCallback(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/diary/get-entries`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await res.json();
    console.log(data);
    setEntries(data);
  }, []);

  const updateEntry = useCallback(
    async (entryId: string, title: string, content: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/diary/update-entry`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            entryId,
            title,
            content,
          }),
        }
      );
      return res.status;
    },
    []
  );

  const deleteEntry = useCallback(async (entryId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/diary/delete-entry`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entryId,
        }),
      }
    );
    return res.status;
  }, []);

  useEffect(() => {
    getEntries();
  }, [getEntries]);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-start w-full max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Escribir en mi diario
          </h1>

          <div className="w-full grid gap-4">
            <NewEntryButton onClick={() => setIsNewEntryModalOpen(true)} />

            {!entries || entries.length === 0 ? (
              <p className="text-gray-400 py-4">
                No hay entradas en tu diario aún. ¡Comienza a escribir!
              </p>
            ) : (
              entries.map((entry) => (
                <Entry
                  key={entry.id}
                  {...entry}
                  onUpdate={updateEntry}
                  getEntries={getEntries}
                  onDelete={deleteEntry}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <NewEntryModal
        isOpen={isNewEntryModalOpen}
        onOpenChange={setIsNewEntryModalOpen}
        onSave={newEntry}
        onUpdate={getEntries}
      />
    </div>
  );
}
