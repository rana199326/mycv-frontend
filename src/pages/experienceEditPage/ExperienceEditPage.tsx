import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import PageLayout from "@components/layout/PageLayout";
import { experienceService } from "@services/experienceService";
import { Experience } from "../../types/Experience";
import { EmployerSize } from "src/types/Employer";
import { ExperienceCard } from "../../components/experience/ExperienceCardPage";
import Button from "@components/ui/globals/Button";
import { EmployerCard } from "../../components/employer/EmployerCardPage";
import { employerService } from "@services/employerService";
import { useAuthStore } from "src/store/authStore";
import { useApi } from "@hooks/useApi";
import { EmployerListViewModel } from "@pages/employerListPage/EmployerListViewModel";

type EmployerOption = { id: number; name: string };

export const ExperienceEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const employerId = location.state?.employerId as number | undefined;

  const [isLoading, setIsLoading] = useState(true);
  const { handleChangeEmployer } = EmployerListViewModel();
  const isEditMode = Boolean(id);

  const access_token = useAuthStore((state) => state.getAccessToken());
  const api = useApi();

  const [formData, setFormData] = useState<Experience>({
    id: 0,
    name: "",
    employer_id: employerId ?? 0,
    start_date: new Date(),
    end_date: new Date(),
    created_At: new Date(),
    updated_At: null,
    userResponsibilitys: [],
  });

  // Employers list for the dropdown
  const [employers, setEmployers] = useState<EmployerOption[]>([]);
  // Selected employer details for the card
  const [employer, setEmployer] = useState<EmployerSize>();

  const loadEmployer = async (eid: number) => {
    try {
      const employerData = await employerService.getEmployerById(eid, access_token, api);
      setEmployer(employerData);
    } catch (error) {
      console.error("Error loading employer:", error);
    }
  };

  //
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/employer", {
      headers: { Authorization: `Bearer ${token ?? ""}` },
    })
      .then((r) => r.json())
      .then((rows: Array<{ id: number; name: string }>) => {
        setEmployers(rows ?? []);
      })
      .catch(() => {
        console.error("Erreur chargement employeurs");
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (!id) {
      setIsLoading(false);
      return;
    }
    loadExperience();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (employerId) {
      loadEmployer(employerId);
      setFormData((prev) => ({ ...prev, employer_id: employerId }));
    }
  }, [employerId]);

  const loadExperience = async () => {
    if (!id) return;
    try {
      const experience = await experienceService.getExperienceById(parseInt(id), access_token, api);
      if (experience) {
        setFormData({
          id: experience.id,
          name: experience.name,
          employer_id: employerId ?? experience.employer_id,
          start_date: new Date(experience.start_date),
          end_date: new Date(experience.end_date),
          created_At: new Date(experience.created_At),
          updated_At: experience.updated_At ? new Date(experience.updated_At) : null,
          userResponsibilitys: experience.userResponsibilitys,
        });
        if (experience.employer_id) loadEmployer(experience.employer_id);
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.employer_id) {
        alert("Choisir un employeur.");
        return;
      }
      if (!id || Number(id) === 0) {
        await experienceService.createExperience(formData, access_token, api);
      } else {
        await experienceService.updateExperience(parseInt(id), formData, access_token, api);
      }
      navigate("/experience");
    } catch (error) {
      console.error("Error saving experience:", error);
    }
  };

  if (isLoading && isEditMode) {
    return <div className="p-6 text-gray-600">Loading...</div>;
  }

  return (
    <PageLayout>
      <>
        {/* Header  */}
        <div className="bg-[#376cad] text-white p-3 rounded-t m-3 text-center">
          <h1 className="text-xl font-bold">Expérience Professionnelle</h1>
        </div>

        {/* */}
        <div className="px-4">
          <div className="md:hidden grid gap-4">
            <ExperienceCard key={id} experience={formData} index={id ? Number(id) - 1 : 0} />
          </div>
          <div className="hidden md:block">
            <ExperienceCard key={id} experience={formData} index={id ? Number(id) - 1 : 0} />
          </div>
        </div>

        {/* Employer */}
        <div className="space-y-2 pt-2 text-sm text-gray-700 px-4">
          <div>
            <div className="md:hidden grid gap-4">
              {formData.employer_id ? (
                <EmployerCard
                  key={formData.employer_id}
                  employer={employer!}
                  index={1}
                  onEdit={() => handleChangeEmployer(formData.id, employer?.id!)}
                  showNameLabel={true}
                  showCountryLabel={true}
                />
              ) : null}
            </div>

            <div className="hidden md:block">
              {formData.employer_id ? (
                <EmployerCard
                  key={formData.employer_id}
                  employer={employer!}
                  index={1}
                  onEdit={() => handleChangeEmployer(formData.id, employer?.id!)}
                  showNameLabel={true}
                  showCountryLabel={true}
                />
              ) : null}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2 pt-2 text-sm text-gray-700 w-full max-w-2xl">
            {/* Employeur */}
            <div className="flex items-center gap-2 mb-2 p-4">
              <label className="w-40 font-semibold" htmlFor="employer_id">
                Employeur :
              </label>
              <select
                id="employer_id"
                value={formData.employer_id ? String(formData.employer_id) : ""}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "add-new") return navigate("/employer/new", { state: { from: location.pathname } });
                  setFormData((prev) => ({ ...prev, employer_id: Number(v) || 0 }));
                  // 
                  const chosen = employers.find((x) => String(x.id) === v);
                  if (chosen) {
                    loadEmployer(chosen.id);
                  }
                }}
                className="flex-1 border rounded p-1 text-sm"
              >
                <option value="">-- Choisir un employeur --</option>
                {employers.map((emp) => (
                  <option key={emp.id} value={emp.id.toString()}>
                    {emp.name}
                  </option>
                ))}
                <option value="add-new">➕ Ajouter un employeur…</option>
              </select>
            </div>

            {/* Date début */}
            <div className="flex items-center gap-2 mb-2 p-4">
              <label className="w-40 font-semibold" htmlFor="start_date">
                Période de début :
              </label>
              <input
                type="date"
                id="start_date"
                value={formData.start_date.toISOString().split("T")[0]}
                onChange={(e) => setFormData((prev) => ({ ...prev, start_date: new Date(e.target.value) }))}
                className="flex-1 border rounded p-1 text-sm"
              />
            </div>

            {/* Date fin */}
            <div className="flex items-center gap-2 mb-2 p-4">
              <label className="w-40 font-semibold" htmlFor="end_date">
                Période de fin :
              </label>
              <input
                type="date"
                id="end_date"
                value={formData.end_date.toISOString().split("T")[0]}
                onChange={(e) => setFormData((prev) => ({ ...prev, end_date: new Date(e.target.value) }))}
                className="flex-1 border rounded p-1 text-sm"
              />
            </div>

            {/* Responsabilités */}
            <div className="flex items-center gap-2 mb-2 p-4">
              <label className="w-40 font-semibold">Responsabilités :</label>
              <div className="flex-1">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData((prev) => ({
                      ...prev,
                      userResponsibilitys: [
                        ...prev.userResponsibilitys,
                        {
                          id: 0,
                          descriptive_line: "",
                          created_at: new Date(),
                          updated_at: new Date(),
                          experience_id: prev.id,
                        },
                      ],
                    }));
                  }}
                  variant="beige"
                  icon={true}
                  size="sm"
                  borderRadius="full"
                />
                <ul className="list-disc space-y-2 mt-2 text-xs">
                  {formData.userResponsibilitys.map((item, idx) => (
                    <li key={idx} className="ml-4 text-xs">
                      <input
                        type="text"
                        value={item.descriptive_line}
                        onChange={(e) => {
                          const updated = [...formData.userResponsibilitys];
                          updated[idx].descriptive_line = e.target.value;
                          setFormData((prev) => ({ ...prev, userResponsibilitys: updated }));
                        }}
                        className="w-full border rounded px-3 py-1 text-xs"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* */}
            <div className="flex justify-center pt-2 pb-6">
              <button
                type="submit"
                className="text-white bg-[#376cad] hover:bg-[#1c4679] p-3 rounded-full shadow"
                aria-label="Enregistrer"
                title="Enregistrer"
              >
                <FaSave className="text-xl" />
              </button>
            </div>
          </form>
        </div>
      </>
    </PageLayout>
  );
};
