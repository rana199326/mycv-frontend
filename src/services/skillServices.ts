import { Skill, SkillLevel, RawSkillLevel } from "../types/Skill";
import {
  transformSkills,
  untransformSkills,
} from "../utils/skillUtils";

export const skillService = {
  // GET /skill
  getSkill: async (
    access_token: any,
    api: {
      get: (arg0: string, arg1: { headers: { Authorization: string } }) => any;
    }
  ): Promise<SkillLevel[]> => {
    const response = await api.get("/skill", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const transformedSkills = transformSkills(response.data);
    return transformedSkills;
  },

  // GET /skill/:id
  getSkillById: async (
    id: number,
    access_token: any,
    api: {
      get: (arg0: string, arg1: { headers: { Authorization: string } }) => any;
    }
  ): Promise<Skill> => {
    const response = await api.get(`/skill/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const transformedSkills = transformSkills(response.data)[0];
    return { ...response.data, transformedSkills };
  },

  // POST /skill
  createSkill: async (
    skill: SkillLevel,
    access_token: any,
    api: {
      post: (
        arg0: string,
        arg1: {
          name: string;
          level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "NATIVE";
        },
        arg2: { headers: { Authorization: string } }
      ) => any;
    }
  ): Promise<Skill> => {
    const [rawSkill] = untransformSkills([skill]);

    // On construit le body uniquement avec name et level
    const body = {
      name: rawSkill.name,
      level: rawSkill.level,
    };
    const response = await api.post("/skill", body, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const transformedSkills = transformSkills([response.data])[0];
    return { ...response.data, transformedSkills };
  },

  // PUT /skill/:id
  updateSkill: async (
    id: number,
    skill: SkillLevel,
    access_token: any,
    api: {
      put: (
        arg0: string,
        arg1: RawSkillLevel,
        arg2: { headers: { Authorization: string } }
      ) => any;
    }
  ): Promise<Skill> => {
    const rawBody = untransformSkills([skill]);
    // On construit le body uniquement avec name et level
    const body = {
      name: rawBody[0].name,
      level: rawBody[0].level,
    } as RawSkillLevel;

    const response = await api.put(`/skill/${id}`, body, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const transformedSkills = transformSkills([response.data])[0];
    return { ...response.data, transformedSkills };
  },

  // DELETE /skill/:id
  deleteSkill: async (
    id: number,
    access_token: any,
    api: {
      delete: (
        arg0: string,
        arg1: { headers: { Authorization: string } }
      ) => any;
    }
  ): Promise<void> => {
    await api.delete(`/skill/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
};