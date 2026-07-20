import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import PageLayout from "@components/layout/PageLayout";
import { ConfirmModal } from "@components/common/ConfirmModal";
import { EmployerListViewModel } from "./EmployerListViewModel";
import { EmployerCard } from "../../components/employer/EmployerCardPage";

export const EmployerListPage = () => {
  const navigate = useNavigate();
  const [selectedEmployerId, setSelectedEmployerId] = useState<number | null>(null);

  // Get experienceId from location state if available
  const location = useLocation();
  const experienceId =
    (location.state as { experienceId?: number } | undefined)?.experienceId ?? null;

  const {
    employer,
    isLoading,
    error,
    setIsModalOpen,
    handleDeleteClick,
    handleEditEmployer,
    handleSelectEmployer,
  } = EmployerListViewModel();

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
          <h2 className="text-xl font-semibold">Employeurs</h2>

          <button
            onClick={() => {
              navigate("new", { state: { experienceId } });
              setIsModalOpen(true);
            }}
            className="bg-[#f5dab4] hover:bg-[#d9c9a1] p-2 rounded-full"
            aria-label="Ajouter un employeur"
            title="Ajouter"
          >
            <AiOutlinePlus size={22} />
          </button>
        </div>

        <div className="border-b border-gray-200 mb-6" />

        {/*  */}
        <div className="w-full">
          {/* Mobile: Cards */}
          <div className="md:hidden grid gap-4">
            {employer.map((emp, index) => (
              <EmployerCard
                key={emp.id}
                employer={emp}
                index={index + 1}
                onEdit={() => handleEditEmployer(experienceId ?? 0, emp.id!)}
                onDelete={(id) =>
                  setConfirmState({
                    open: true,
                    message: "Supprimer cet employeur ?",
                    onConfirm: () => handleDeleteClick(id),
                  })
                }
                onSelect={() => handleSelectEmployer(experienceId ?? 0, emp.id!)}
                selected={selectedEmployerId === emp.id}
              />
            ))}
          </div>

          {/* Desktop*/}
          <div className="hidden md:block space-y-2">
            {employer.map((emp, index) => (
              <EmployerCard
                key={emp.id}
                employer={emp}
                index={index + 1}
                onEdit={() => handleEditEmployer(experienceId ?? 0, emp.id!)}
                onDelete={(id) =>
                  setConfirmState({
                    open: true,
                    message: "Supprimer cet employeur ?",
                    onConfirm: () => handleDeleteClick(id),
                  })
                }
                onSelect={() => handleSelectEmployer(experienceId ?? 0, emp.id!)}
                selected={selectedEmployerId === emp.id}
              />
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
};
