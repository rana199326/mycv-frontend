import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { EmployerSize } from "../../types/Employer";
import { EmployerListViewModel } from "../employerListPage/EmployerListViewModel";
import CheckboxInput from "@components/ui/form/CheckBox";
import { SizeCategory } from "src/types/Size";
import { FaSave } from "react-icons/fa";
import PageLayout from "@components/layout/PageLayout";

export const EmployerEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
    // Récupère l'ID de l'expérience depuis la navigation
  const location = useLocation();
  const experienceId =
    (location.state as { experienceId?: number } | undefined)?.experienceId ??
    null;

  const [isLoading, setIsLoading] = useState(false);
  const { loadEmployerById, handleUpdateEmployer, handleAddEmployer } =
    EmployerListViewModel();
  const isEditMode = Boolean(id);

  const [employerData, setEmployerData] = useState<EmployerSize>({
    id: 0,
    name: "",
    business_activity: "",
    city: "",
    zip_code: "",
    country: "",
    size: "1",
    created_At: new Date(),
  });

  useEffect(() => {
    const fetchEmployer = async () => {
      setIsLoading(true);
      if (!id) return;
      try {
        const employerData = await loadEmployerById(parseInt(id));
        if (employerData) {
          setEmployerData(employerData);
        }
      } catch (error) {
        console.error("Error fetching employer:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployer();
  }, [id, loadEmployerById]);

  if (isLoading && isEditMode) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await handleUpdateEmployer(parseInt(id!), employerData);
      } else {
      const { id, ...employerDataWithoutId } = employerData;
      await handleAddEmployer(employerDataWithoutId);
      }
      navigate("/employer", {state: { experienceId: experienceId }});
    } catch (error) {
      console.error("Error saving employer:", error);
    }
  };

  return (
    <PageLayout>
        <>
        {/* Page header */}
          <div className="bg-[#376cad] text-white p-3 rounded-t m-3 text-center">
            <h1 className="text-xl font-bold">Employeurs</h1>
          </div>
        {/* Trait séparateur descendu de 2mm  */}
        <div className="border-b border-gray-400 mb-2" />
      
          <div>
            <label className="block font-semibold mb-1" htmlFor="name">
              Nom :
            </label>
            <input
              type="text"
              id="name"
              value={employerData.name}
              onChange={(e) =>
                setEmployerData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border border-gray-300 rounded px-3 py-1 w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="start_date">
              Activité :
            </label>
            <input
              type="text"
              id="business_activity"
              value={employerData.business_activity}
              onChange={(e) =>
                setEmployerData((prev) => ({
                  ...prev,
                  business_activity: e.target.value,
                }))
              }
              className="border border-gray-300 rounded px-3 py-1 w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="city">
              Ville :
            </label>
            <input
              type="text"
              id="city"
              value={employerData.city}
              onChange={(e) =>
                setEmployerData((prev) => ({ ...prev, city: e.target.value }))
              }
              className="border border-gray-300 rounded px-3 py-1 w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="zip_code">
              Code postal :
            </label>
            <input
              type="text"
              id="zip_code"
              value={employerData.zip_code}
              onChange={(e) =>
                setEmployerData((prev) => ({
                  ...prev,
                  zip_code: e.target.value,
                }))
              }
              className="border border-gray-300 rounded px-3 py-1 w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="country">
              Pays :
            </label>
            <input
              type="text"
              id="country"
              value={employerData.country}
              onChange={(e) =>
                setEmployerData((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))
              }
              className="border border-gray-300 rounded px-3 py-1 w-full"
            />
          </div>

          <section>
            <div>
              <h3 className="text-sm font-medium">Taille de l’entreprise :</h3>
              <div className="mt-0 space-y-0">
                {[
                  { label: "Micro", value: "1" },
                  { label: "Petite", value: "2" },
                  { label: "Intermédiaire", value: "3" },
                  { label: "Grande", value: "4" },
                ].map((option) => (
                  <CheckboxInput
                    key={option.value}
                    label={option.label}
                    description={option.label}
                    checked={employerData.size === option.value}
                    onChange={(
                      newChecked: boolean,
                      e?: React.MouseEvent<HTMLButtonElement>
                    ) => {
                      e?.preventDefault();
                      if (newChecked) {
                        setEmployerData((prev) => ({
                          ...prev,
                          size: option.value as SizeCategory,
                        }));
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
      {/* Save button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="text-white bg-[#376cad] hover:bg-[#1c4679] p-3 rounded-full shadow"
        >
          <FaSave className="text-xl" />
        </button>
      </div>
    </>
    </PageLayout>
  );
};
