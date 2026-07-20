import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import PageLayout from "@components/layout/PageLayout";
import { ConfirmModal } from "@components/common/ConfirmModal";
import { educationFormData } from "../../types/education";
import { Pencil, Trash2 } from "lucide-react";

type EducationApiItem = educationFormData & {
  school_id?: number;
  school?: { id: number; name: string } | null;
};

export default function EducationListPage() {
  const navigate = useNavigate();
  const [educations, setEducations] = useState<EducationApiItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    message: string;
    onConfirm: () => void;
  } | null>(null);
  
// Fetch educations from backend on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    fetch("http://localhost:3000/education", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => setEducations(data))
      .catch((err) => {
        console.error("Failed to load educations:", err);
        alert("Erreur lors du chargement des formations.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (id: number) => navigate(`/edit-education/${id}`);

// Delete with confirmation
  const handleDelete = (id: number) => {
    setConfirmState({
      open: true,
      message: "Supprimer cette formation ?",
      onConfirm: async () => {
        const token = localStorage.getItem("token");
        try {
          const res = await fetch(`http://localhost:3000/education/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error(await res.text());
          setEducations((prev) => prev.filter((e) => e.id !== id));
        } catch (e) {
          console.error(e);
          alert("Erreur lors de la suppression.");
        }
      },
    });
  };

  const formatDate = (val?: string | null) => (val ? String(val).slice(0, 10) : "");

  return (
    <PageLayout>
      <>
        {/* Header */}
        <div className="bg-[#376cad] text-white p-4 rounded-t m-3 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Formations</h2>
          <button
            onClick={() => navigate("/edit-education")}
            className="bg-[#f5dab4] hover:bg-[#d9c9a1] p-2 rounded-full"
            aria-label="Ajouter une formation"
            title="Ajouter"
          >
            <AiOutlinePlus size={22} />
          </button>
        </div>

        <div className="border-b border-gray-300" />

        <div className="p-4">
          {loading ? (
            <p className="text-gray-500 text-center mt-10">Chargement…</p>
          ) : educations.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              No education added yet.
            </p>
          ) : (
            <div className="space-y-2">
              {educations.map((e) => (
                <div
                  key={e.id}
                  className="bg-white rounded-lg shadow p-3 mb-2 flex items-center justify-between"
                >
                  {/* Left: info */}
                  <div>
                    <p className="font-semibold text-gray-800">{e.name || "—"}</p>
                    <p className="text-sm text-gray-600">
                      {e.status || "—"}
                      {e.level ? ` • ${e.level}` : ""}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(e.graduation_date)}
                      {e.school?.name ? ` • ${e.school.name}` : ""}
                    </p>
                  </div>

                  {/* Right: actions   */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleEdit(e.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
                      aria-label="Modifier"
                      title="Modifier"
                    >
                      <Pencil className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                    </button>

                    <button
                      onClick={() => handleDelete(e.id)}
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
