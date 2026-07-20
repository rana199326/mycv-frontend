// src/services/languageService.ts
import { AxiosInstance } from "axios";
import { LanguageLevelName } from "../types/Language";

const starsToLangLevel = (stars: number): LanguageLevelName => {
  switch (stars) {
    case 1: return "BEGINNER";
    case 2: return "INTERMEDIATE";
    case 3: return "ADVANCED";
    case 4: return "EXPERT";
    default: return "BEGINNER";
  }
};

export const languageService = {
  async getAll(api: AxiosInstance) {
    const res = await api.get("/language");
    return res.data;
  },

  async create(
    dto: { name: string; level: number | LanguageLevelName },
    api: AxiosInstance
  ) {
    const body = {
      name: dto.name.trim(),
      level: typeof dto.level === "number" ? starsToLangLevel(dto.level) : dto.level,
    };
    const res = await api.post("/language", body, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  },

  async update(
    id: number,
    dto: { name?: string; level?: number | LanguageLevelName },
    api: AxiosInstance
  ) {
    const body: any = {};
    if (dto.name) body.name = dto.name.trim();
    if (typeof dto.level !== "undefined") {
      body.level = typeof dto.level === "number" ? starsToLangLevel(dto.level) : dto.level;
    }
    const res = await api.put(`/language/${id}`, body, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  },

  async remove(id: number, api: AxiosInstance) {
    const res = await api.delete(`/language/${id}`);
    return res.data;
  },
};
