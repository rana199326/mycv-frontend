// src/services/skillService.ts
import { AxiosInstance } from 'axios';
import { SkillPayload } from '../types/Skill';

export const skillService = {
  async getSkill(api: AxiosInstance) {
    const res = await api.get('/skill');
    return res.data; // [{ id, name, level }, ...]
  },

  async createSkill(dto: SkillPayload, api: AxiosInstance) {
    const res = await api.post('/skill', dto, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
  },

  async updateSkill(id: number, dto: Partial<SkillPayload>, api: AxiosInstance) {
    const res = await api.put(`/skill/${id}`, dto, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
  },

  async deleteSkill(id: number, api: AxiosInstance) {
    const res = await api.delete(`/skill/${id}`);
    return res.data;
  },
};
