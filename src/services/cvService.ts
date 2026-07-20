import { Cv } from "../types/cv";
import { useApi } from "../hooks/useApi"; // نفس الـ hook اللي بتستعمليه مع باقي الـ services

// --- Base URL for CV endpoints ---
const BASE_URL = "/cvs";

export const cvService = {
  // Get all CVs for the logged-in profile
  async getAll(api: ReturnType<typeof useApi>): Promise<Cv[]> {
    const res = await api.get<Cv[]>(BASE_URL);
    return res.data;
  },

  // Get one CV by id
  async getById(api: ReturnType<typeof useApi>, id: number): Promise<Cv> {
    const res = await api.get<Cv>(`${BASE_URL}/${id}`);
    return res.data;
  },

  // Create a new CV
  async create(api: ReturnType<typeof useApi>, payload: Partial<Cv>): Promise<Cv> {
    const res = await api.post<Cv>(BASE_URL, payload);
    return res.data;
  },

  // Update an existing CV
  async update(api: ReturnType<typeof useApi>, id: number, payload: Partial<Cv>): Promise<Cv> {
    const res = await api.put<Cv>(`${BASE_URL}/${id}`, payload);
    return res.data;
  },

  // Delete CV
  async remove(api: ReturnType<typeof useApi>, id: number): Promise<void> {
    await api.delete(`${BASE_URL}/${id}`);
  },
};
