"use client";

import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface DiaryEntryProps {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  onUpdate: (id: string, title: string, content: string) => Promise<number>;
  getEntries: () => Promise<void>;
  onDelete: (entryId: string) => Promise<number>;
}

export function Entry({
  id,
  title: initialTitle,
  content: initialContent,
  createdAt,
  onUpdate,
  getEntries,
  onDelete,
}: DiaryEntryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCancelEdit = () => {
    setTitle(initialTitle);
    setContent(initialContent);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        if (!isEditing) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isEditing]);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await onUpdate(id, title, content);
      if (res === 200) {
        setIsEditing(false);
        getEntries();
        setError("");
      } else {
        setError("Error al actualizar la entrada");
      }
    } catch (e) {
      console.log(e);
      setError("Error al actualizar la entrada");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await onDelete(id);
      if (res === 200) {
        getEntries();
        setIsOpen(false);
      } else {
        setError("Error al eliminar la entrada");
      }
    } catch (e) {
      console.log(e);
      setError("Error al eliminar la entrada");
    } finally {
      setLoading(false);
    }
  };

  const previewContent =
    initialContent.slice(0, 20) + (initialContent.length > 20 ? "..." : "");

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="w-full p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500 transition-all duration-200 cursor-pointer group"
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-200">
            {initialTitle}
          </h3>
          <span className="text-sm text-gray-400">
            {format(new Date(createdAt), "yyyy-MM-dd", { locale: es })}
          </span>
        </div>
        <p className="text-gray-300">{previewContent}</p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-gray-900 text-white border border-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-300 ease-in-out"
            style={{
              opacity: isOpen ? 1 : 0,
              scale: isOpen ? 1 : 0.95,
            }}
          >
            <div className="p-6 flex-shrink-0">
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-2xl font-bold bg-transparent border-b border-gray-700 focus:border-purple-500 focus:outline-none pb-2 mb-2"
                />
              ) : (
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {title}
                </h2>
              )}
              <div className="text-sm text-gray-400">
                {format(
                  new Date(createdAt),
                  "d 'de' MMMM 'de' yyyy 'a las' HH:mm",
                  { locale: es }
                )}
              </div>
            </div>

            <div className="p-6 pt-0 flex-grow overflow-y-auto overflow-x-hidden">
              {isEditing ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-full min-h-[200px] bg-gray-800/50 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              ) : (
                <div className="whitespace-pre-wrap break-words">{content}</div>
              )}
            </div>

            {error && <div className="px-6 text-red-500 text-sm">{error}</div>}

            <div className="p-6 pt-4 flex-shrink-0 border-t border-gray-800 flex justify-start gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-700 text-gray-300 rounded-md hover:bg-gray-800 hover:text-white transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    {loading ? "Guardando..." : "Guardar cambios"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 transition-colors duration-200"
                  >
                    Cerrar
                  </button>

                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 border border-gray-700 text-gray-300 rounded-md hover:bg-gray-800 hover:text-white transition-colors duration-200"
                  >
                    Editar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
