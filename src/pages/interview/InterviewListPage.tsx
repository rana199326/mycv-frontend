import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import PageLayout from "@components/layout/PageLayout";
import { ConfirmModal } from "@components/common/ConfirmModal";
import { Trash2 } from "lucide-react";
import { InterviewFormData } from "../../types/interview";
import interviewBg from "../../assets/images/bg-interview.png";

const InterviewListPage = () => {
  const [interviews, setInterviews] = useState<InterviewFormData[]>([]);
  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const navigate = useNavigate();

  // Delete with confirmation
  const handleDelete = (id: number) => {
    setConfirmState({
      open: true,
      message: "Supprimer cet entretien ?",
      onConfirm: () => {
        setInterviews((prev) => prev.filter((itw) => itw.id !== id));
      },
    });
  };

  return (
    <PageLayout backgroundImage={interviewBg}>
      <h1 className="text-xl font-bold">Mes entretiens</h1>
      <>
        {/* Header */}
        <div className="bg-[#376cad] text-white p-4 rounded-t m-3 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Entretiens</h2>
          <button
            onClick={() => navigate("/edit-interview")}
            className="bg-[#f5dab4] hover:bg-[#d9c9a1] p-2 rounded-full"
            aria-label="Ajouter un entretien"
            title="Ajouter"
          >
            <AiOutlinePlus size={22} />
          </button>
        </div>

        {/* Separator */}
        <div className="border-b border-gray-300" />

        {/* Content */}
        <div className="p-4">
          {interviews.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              No interviews added yet.
            </p>
          ) : (
            <div className="space-y-2">
              {interviews.map((itw) => (
                <div
                  key={itw.id}
                  className="bg-white rounded-lg shadow p-3 mb-2 flex items-center justify-between"
                >
                  {/* Left: info */}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {itw.position || "Untitled"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {itw.status || "No status"}
                    </p>
                    {itw.date_interview && (
                      <p className="text-xs text-gray-500">
                        {new Date(itw.date_interview).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {/* Right: actions  */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDelete(itw.id)}
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

        {/* Confirm modal  */}
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
};

export default InterviewListPage;
