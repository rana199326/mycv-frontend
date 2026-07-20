import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEye, FiEdit2, FiCopy } from "react-icons/fi";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CvListViewModel } from "../CV/CvListViewModel";
import PageLayout from "@components/layout/PageLayout";
import { ConfirmModal } from "@components/common/ConfirmModal";
import cvBg from "../../assets/images/bg-cv.png"; 


export default function CvListPage() {
  const navigate = useNavigate();
  const { cvs, isLoading, error, deleteCv } = CvListViewModel();

  // state 
  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const handleDelete = (id: number) => {
    setConfirmState({
      open: true,
      message: "Supprimer ce CV ?",
      onConfirm: () => deleteCv(id),
    });
  };

  return (
<PageLayout backgroundImage={cvBg}>
      <>
        {/* Header */}
        <div className="bg-[#376cad] text-white p-4 rounded-t m-3 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Liste des CVs</h2>
          <button
            onClick={() => navigate("/cv-new")}
            className="bg-[#f5dab4] hover:bg-[#d9c9a1] p-2 rounded-full"
            aria-label="Ajouter un CV"
            title="Ajouter"
          >
            <AiOutlinePlus size={22} />
          </button>
        </div>

        {/* Separator */}
        <div className="border-b border-gray-300" />

        {/* Content */}
        <div className="p-4">
          {isLoading && (
            <p className="text-gray-500 text-center mt-10">Chargement...</p>
          )}
          {error && (
            <p className="text-red-500 text-center mt-10">{error}</p>
          )}
          {!isLoading && cvs.length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              Aucun CV pour le moment.
            </p>
          )}

          <div className="space-y-2">
            {cvs.map((cv) => (
              <div
                key={cv.id}
                className="bg-white rounded-lg shadow p-3 mb-2 flex items-center justify-between"
              >
                {/* Left: info */}
                <div>
                  <p className="font-semibold text-gray-800">{cv.title}</p>
                  {cv.updated_at && (
                    <p className="text-xs text-gray-500 mt-1">
                      Maj: {new Date(cv.updated_at).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Right: actions */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate(`/cvs/${cv.id}/preview`)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    title="Aperçu"
                  >
                    <FiEye className="w-5 h-5 text-gray-600" />
                  </button>

                  <button
                    onClick={() => navigate(`/cvs/${cv.id}/edit`)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
                    title="Modifier"
                  >
                    <FiEdit2 className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                  </button>

                  <button
                    onClick={() => alert("À implémenter plus tard")}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    title="Dupliquer"
                  >
                    <FiCopy className="w-5 h-5 text-gray-600" />
                  </button>

                  <button
                    onClick={() => handleDelete(cv.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
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
