// src/viewModels/ExperienceViewModel.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Experience } from "../../types/Experience";
import { experienceService } from "@services/experienceService";
import { useAuthStore } from "src/store/authStore";
import { useApi } from "@hooks/useApi";

export const ExperienceListViewModel = () => {
  const navigate = useNavigate();
  const access_token = useAuthStore((state) => state.getAccessToken());
  const api = useApi();

  // State
  const [experience, setExperience] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);          // <-- for Save button state
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState<number | null>(null);

  // Load on mount / token change
  useEffect(() => {
    if (!access_token) return;
    loadExperiences();
  }, [access_token]);

  const loadExperiences = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await experienceService.getExperience(access_token, api);
      setExperience(Array.isArray(data) ? data : []);
    } catch (err: any) {
      const status = err?.response?.status;
      setError(status === 401 ? "Failed to load experiences: unauthorized" : "Failed to load experiences");
      console.error("Load experiences failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Unified save (create or update)
  const saveExperience = async (experienceData: Experience) => {
    if (!access_token) {
      setError("You are not authenticated");
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      if (experienceData.id) {
        // update
        const updated = await experienceService.updateExperience(
          experienceData.id,
          experienceData,
          access_token,
          api
        );
        setExperience((prev) =>
          prev.map((exp) => (exp.id === updated.id ? updated : exp))
        );
      } else {
        // create
        const created = await experienceService.createExperience(
          experienceData,
          access_token,
          api
        );
        setExperience((prev) => [...prev, created]);
      }
      setIsModalOpen(false); // close modal after success
    } catch (err) {
      setError("Failed to save experience");
      console.error("Failed to save experience:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Keep if you still want a dedicated add()
  const handleAddExperience = async (experienceData: Experience) => {
    return saveExperience(experienceData);
  };

  const handleView = (experienceId: number, index: number) => {
    navigate(`/experience/${experienceId}`, { state: { index } });
  };

  const handleEdit = (experienceId: number, employerId: number) => {
    navigate(`/experience/${experienceId}/edit`, { state: { employerId } });
  };

  // Open delete modal (no deletion here!)
  const handleDeleteClick = (experienceId: number) => {
    setExperienceToDelete(experienceId);
    setIsDeleteModalOpen(true);
  };

  // Confirm deletion
  const handleConfirmDelete = async () => {
    if (!experienceToDelete || !access_token) return;
    try {
      await experienceService.deleteExperience(
        experienceToDelete,
        access_token,
        api
      );
      setExperience((prev) => prev.filter((exp) => exp.id !== experienceToDelete));
    } catch (err) {
      setError("Failed to delete experience");
      console.error("Failed to delete experience:", err);
    } finally {
      setExperienceToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  return {
    // State
    experience,
    isLoading,
    isSaving,              // <-- bind to Save button disabled/spinner
    error,
    isModalOpen,
    isDeleteModalOpen,

    // Actions
    setIsModalOpen,
    setIsDeleteModalOpen,
    loadExperiences,

    saveExperience,        // <-- use this for both create & update
    handleAddExperience,   // (optional) backward compat
    handleView,
    handleEdit,
    handleDeleteClick,
    handleConfirmDelete,
  };
};
