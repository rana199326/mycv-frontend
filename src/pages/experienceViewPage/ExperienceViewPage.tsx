import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Header } from "@components/layout/Header";
import { experienceService } from "@services/experienceService";
import { Experience } from "../../types/Experience";
import { ExperienceCard } from "../../components/experience/ExperienceCardPage";
import { ExperienceListViewModel } from "../experienceListPage/ExperienceListViewModel";
import { EmployerSize } from "src/types/Employer";
import { employerService } from "@services/employerService";
import { EmployerCard } from "../../components/employer/EmployerCardPage";
import { EmployerListViewModel } from "@pages/employerListPage/EmployerListViewModel";
import { useAuthStore } from "src/store/authStore";
import { useApi } from "@hooks/useApi";

export const ExperienceViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const { handleEdit } = ExperienceListViewModel();
  const { handleEditEmployer } = EmployerListViewModel();

  const access_token = useAuthStore((state) => state.getAccessToken());
  const api = useApi();

  const location = useLocation();
  const index = location.state?.index;

  const [formData, setFormData] = useState<Experience>({
    id: 0,
    name: "",
    employer_id: 0,
    start_date: new Date(),
    end_date: new Date(),
    created_At: new Date(),
    updated_At: null,
    userResponsibilitys: [],
  });

  const [employer, setEmployer] = useState<EmployerSize>();

  const loadEmployer = async (employerId: number) => {
    // Remplace employerService par le service réel de ton projet
    try {
      const employerData = await employerService.getEmployerById(
        employerId,
        access_token,
        api
      );
      setEmployer(employerData);
    } catch (error) {
      console.error("Error loading employer:", error);
    }
  };

  useEffect(() => {
    loadExperience();
  }, [id]);

  const loadExperience = async () => {
    if (!id) return;
    try {
      const experience = await experienceService.getExperienceById(
        parseInt(id),
        access_token,
        api
      );
      if (experience) {
        setFormData({
          id: experience.id,
          name: experience.name,
          employer_id: experience.employer_id,
          start_date: new Date(experience.start_date),
          end_date: new Date(experience.end_date),
          created_At: new Date(experience.created_At),
          updated_At: experience.updated_At
            ? new Date(experience.updated_At)
            : null,
          userResponsibilitys: experience.userResponsibilitys || [],
        });
        console.log("Experience loaded:", experience);
        loadEmployer(experience.employer_id);
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await experienceService.updateExperience(
        parseInt(id),
        formData,
        access_token,
        api
      );
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen px-2.5 py-10 flex flex-col items-start justify-start">
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <Header title="Expériences Professionnelles" description="" />
        </div>
        {/* Trait séparateur descendu de 2mm */}
        <div className="border-b border-gray-200 mb-6" />
        <div>
          {/* Mobile: Cards View */}
          <div className="md:hidden grid gap-4">
            <ExperienceCard
              key={id}
              experience={formData}
              index={index ?? 1}
              onEdit={() => handleEdit(formData.id, formData.employer_id)}
            />
          </div>

          {/* Desktop: Table View */}
          <div className="hidden md:block">
            <ExperienceCard
              key={id}
              experience={formData}
              index={index ?? 1}
              onEdit={() => handleEdit(formData.id, formData.employer_id)}
            />
          </div>
        </div>
        <div className="space-y-2 pt-5 text-sm text-gray-700">
          {/* Mobile: Cards View */}
          <div className="md:hidden grid gap-4">
            <EmployerCard
              key={formData.employer_id}
              employer={employer!}
              index={formData.employer_id}
              showNameLabel={true}
              showCountryLabel={true}
            />
          </div>

          {/* Desktop: Table View */}
          <div className="hidden md:block">
            <EmployerCard
              key={formData.employer_id}
              employer={employer!}
              index={formData.employer_id}
              showNameLabel={true}
              showCountryLabel={true}
            />
          </div>
          <p>
            <strong>Intitulé :</strong> {formData.name}
          </p>
          <p>
            <strong>Période de début :</strong>{" "}
            {new Date(formData.start_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Période de fin :</strong>{" "}
            {new Date(formData.end_date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-semibold text-sm">Responsabilités :</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {formData.userResponsibilitys.map((responsibility, index) => (
            <li key={index}>{responsibility.descriptive_line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
