import { useEffect, useState, useCallback } from "react";
import { EmployerSize } from "../../types/Employer";
import { employerService } from "../../services/employerService";
import { useAuthStore } from "src/store/authStore";
import { useApi } from "@hooks/useApi";
import { useNavigate } from "react-router-dom";

export const EmployerListViewModel = () => {
  const [employer, setEmployer] = useState<EmployerSize[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employerToDelete, setEmployerToDelete] = useState<number | null>(null);

  const access_token = useAuthStore((state) => state.getAccessToken());
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployers();
  }, []);

  const loadEmployers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await employerService.getEmployer(access_token, api);
      setEmployer(data);
    } catch (err) {
      console.error("Failed to load employers:", err);
      setError("Failed to load employers");
    } finally {
      setIsLoading(false);
    }
  };

  const loadEmployerById = useCallback(async (id: number) => {
    try {
      const employerData = await employerService.getEmployerById(
        id,
        access_token,
        api
      );

      return employerData;
    } catch (err) {
      console.error("Failed to load employer by ID:", err);
      setError("Failed to load employer");
      return null;
    }
  }, []);

  const handleAddEmployer = async (employerData: EmployerSize) => {
    try {
      await employerService.createEmployer(employerData, access_token, api);
      await loadEmployers();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to add employer:", err);
      setError("Failed to add employer");
    }
  };

  
  const handleChangeEmployer = (experienceId: number, employerId: number) => {
    navigate(`/employer`, { state: { experienceId, employerId } });
  };

  const handleSelectEmployer = (experienceId: number, employerId: number) => {
    navigate(`/experience/${experienceId}/edit`, { state: { employerId}});}

  const handleEditEmployer = (experienceId: number, employerId: number) => {
    if (experienceId) {
      navigate(`/employer/${employerId}/edit`, { state: { experienceId } });
    } else {
      navigate("/employer/new", { state: { experienceId } });
    }
  };

  const handleUpdateEmployer = async (id: number, employer: EmployerSize) => {
    try {
      await employerService.updateEmployer(id, employer, access_token, api);
      await loadEmployers();
    } catch (err) {
      console.error("Failed to update employer:", err);
      setError("Failed to update employer");
    }
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await employerService.deleteEmployer(id, access_token, api);
      await loadEmployers();
    } catch (err) {
      console.error("Failed to delete employer:", err);
      setError("Failed to delete employer");
    }
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (employerToDelete !== null) {
      try {
        await employerService.deleteEmployer(
          employerToDelete,
          access_token,
          api
        );
        await loadEmployers();
        setIsDeleteModalOpen(false);
        setEmployerToDelete(null);
      } catch (err) {
        console.error("Failed to delete employer:", err);
        setError("Failed to delete employer");
      }
    }
  };

  return {
    // États
    employer,
    isLoading,
    error,
    isModalOpen,
    isDeleteModalOpen,

    // Actions
    setIsModalOpen,
    loadEmployers,
    loadEmployerById,
    handleAddEmployer,
    handleUpdateEmployer,
    handleDeleteClick,
    handleEditEmployer,
    handleSelectEmployer,
    handleChangeEmployer,
    handleConfirmDelete,
    setIsDeleteModalOpen,
  };
};
