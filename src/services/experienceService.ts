import { Experience } from "../types/Experience";

export const experienceService = {
  getExperience: async (
    access_token: any,
    api: {
      get: (arg0: string, arg1: { headers: { Authorization: string } }) => any;
    }
  ): Promise<Experience[]> => {
    const response = await api.get("/experience", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  },

  getExperienceById: async (
    id: number,
    access_token: any,
    api: {
      get: (arg0: string, arg1: { headers: { Authorization: string } }) => any;
    }
  ): Promise<Experience | undefined> => {
    const response = await api.get(`/experience/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  },

  createExperience: async (
    experience: Experience,
    access_token: any,
    api: {
      post: (
        arg0: string,
        arg1: Omit<Experience, "id" | "created_At">,
        arg2: { headers: { Authorization: string } }
      ) => any;
    }
  ): Promise<Experience> => {
     const {id, created_At, updated_At, ...experienceRaw} = experience;
    console.log("Creating experience:", experience);
    const experienceData = await api.post("/experience", experienceRaw, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return experienceData.data;
  },

  updateExperience: async (
    id: number,
    experience: Experience,
    access_token: any,
    api: {
      put: (
        arg0: string,
        arg1: Experience,
        arg2: { headers: { Authorization: string } }
      ) => any;
    }
  ): Promise<Experience> => {
    console.log("Updating experience with ID:", id);
    console.log("Experience data:", experience);
    const experienceData = await api.put(`/experience/${id}`, experience, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return experienceData.data;
  },

  deleteExperience: async (
    id: number,
    access_token: any,
    api: {
      delete: (
        arg0: string,
        arg1: { headers: { Authorization: string } }
      ) => any;
    }
  ): Promise<void> => {
    await api.delete(`/experience/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
};
