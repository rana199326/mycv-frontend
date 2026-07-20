import { useEffect, useState } from "react";
import { cvService } from "../../services/cvService";
import { Cv } from "../../types/cv";
import { useApi } from "@hooks/useApi";

// --- UI type for CV list (simplified) ---
type UICv = {
  id: number;
  title: string;
  updated_at?: string;
};

export const CvListViewModel = () => {
  const api = useApi();

  const [cvs, setCvs] = useState<UICv[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all CVs
  const fetchCvs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await cvService.getAll(api);

      // Map data to UI format
      const mapped: UICv[] = data.map((cv) => ({
        id: cv.id,
        title: cv.title || `CV n°${cv.id}`,
        updated_at: cv.updated_at,
      }));

      setCvs(mapped);
    } catch (err) {
      setError("Failed to load CVs");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete CV
  const deleteCv = async (id: number) => {
    try {
      await cvService.remove(api, id);
      setCvs((prev) => prev.filter((cv) => cv.id !== id));
    } catch {
      setError("Failed to delete CV");
    }
  };

  // Run once on mount
  useEffect(() => {
    fetchCvs();
  }, []);

  return {
    cvs,
    isLoading,
    error,
    fetchCvs,
    deleteCv,
  };
};
