import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import PageLayout from "@components/layout/PageLayout";
import { ConfirmModal } from "@components/common/ConfirmModal";
import { ExperienceListViewModel } from "./ExperienceListViewModel";
import { ExperienceCard } from "../../components/experience/ExperienceCardPage";

export const ExperienceListPage = () => {
  const navigate = useNavigate();

  const {
    experience,
    isLoading,
    error,
    setIsModalOpen,
    handleView,
    handleDeleteClick,
  } = ExperienceListViewModel();

  // Confirm modal state
  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <PageLayout>
      <>
        {/* Header */}
        <div className="bg-[#376cad] text-white p-4 rounded-t m-3 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Expériences Professionnelles</h2>

          <button
            onClick={() => {
              navigate("/experience/new");
              setIsModalOpen(true);
            }}
            className="bg-[#f5dab4] hover:bg-[#d9c9a1] p-2 rounded-full"
            aria-label="Ajouter une expérience"
            title="Ajouter"
          >
            <AiOutlinePlus size={22} />
          </button>
        </div>

        <div className="border-b border-gray-200 mb-6" />

        <div className="w-full">
          {/* Mobile: Cards */}
          <div className="md:hidden grid gap-4">
            {experience.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                index={index}
                onView={() => handleView(exp.id, index)}
                onDelete={(id) =>
                  setConfirmState({
                    open: true,
                    message: "Supprimer cette expérience ?",
                    onConfirm: () => handleDeleteClick(id),
                  })
                }
              />
            ))}
          </div>

          {/* Desktop*/}
          <div className="hidden md:block space-y-2">
            {experience.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                index={index}
                onView={() => handleView(exp.id, index)}
                onDelete={(id) =>
                  setConfirmState({
                    open: true,
                    message: "Supprimer cette expérience ?",
                    onConfirm: () => handleDeleteClick(id),
                  })
                }
              />
            ))}
          </div>
        </div>

        {/* Confirm modal*/}
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
