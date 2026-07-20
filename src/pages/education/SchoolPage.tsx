import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Pencil, Trash2 } from "lucide-react";
import PageLayout from "@components/layout/PageLayout";
import { ConfirmModal } from "@components/common/ConfirmModal";

interface School {
  name: string;
  id: number;
  city: string;
  country: string;
}

export default function SchoolPage() {
  const navigate = useNavigate();
  const [schools, setSchools] = useState<School[]>([]);
  
  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // Fetch schools from backend on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/school", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setSchools(data))
      .catch((err) => console.error("Failed to load schools:", err));
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/edit-school/${id}`);
  };

  // Delete with confirmation modal
  const handleDelete = (id: number) => {
    setConfirmState({
      open: true,
      message: "Supprimer cette école ?",
      onConfirm: async () => {
        const token = localStorage.getItem("token");
        try {
          const res = await fetch(`http://localhost:3000/school/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error("Failed to delete");
          setSchools((prev) => prev.filter((s) => s.id !== id));
        } catch (error) {
          console.error("Delete error:", error);
          alert("Erreur lors de la suppression.");
        }
      },
    });
  };

  return (
    <PageLayout>
      <>
        {/* Header */}
        <div className="bg-[#376cad] text-white p-4 rounded-t m-3 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Écoles</h2>
          <button
            onClick={() => navigate("/edit-school")}
            className="bg-[#f5dab4] hover:bg-[#d9c9a1] p-2 rounded-full"
            aria-label="Ajouter une école"
            title="Ajouter"
          >
            <AiOutlinePlus size={22} />
          </button>
        </div>

        <div className="border-b border-gray-300" />

        <div className="p-4">
          {schools.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              No school added yet.
            </p>
          ) : (
            <div className="space-y-2">
              {schools.map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-lg shadow p-3 mb-2 flex items-center justify-between"
                >
                  {/* Left: info */}
                  <div>
                    <p className="font-semibold text-gray-800">{s.name}</p>
                    <p className="text-sm text-gray-600">{s.city}</p>
                  </div>

                  {/* Right: actions */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleEdit(s.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
                      aria-label="Modifier"
                      title="Modifier"
                    >
                      <Pencil className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                    </button>

                    <button
                      onClick={() => handleDelete(s.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 transition-colors"
                      aria-label="Supprimer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Confirm modal */}
        {confirmState?.open && (
          <ConfirmModal
            message={confirmState.message}
            onConfirm={() => {
              confirmState.onConfirm();
              setConfirmState(null);
            }}
            onCancel={() => setConfirmState(null)}
          />
        )}
      </>
    </PageLayout>
  );
}
