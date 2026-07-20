import { Employer, EmployerSize, RawEmployerSize } from "../types/Employer";
import {
  transformEmployers,
  untransformEmployers,
} from "../utils/employerUtils";

export const employerService = {
  // GET /employer
  getEmployer: async (
    access_token: any,
    api: {
      get: (arg0: string, arg1: { headers: { Authorization: string } }) => any;
    }
  ): Promise<EmployerSize[]> => {
    const response = await api.get("/employer", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const transformedEmployers = transformEmployers(response.data);
    return transformedEmployers;
  },

  // GET /employer/:id
  getEmployerById: async (
    id: number,
    access_token: any,
    api: {
      get: (arg0: string, arg1: { headers: { Authorization: string } }) => any;
    }
  ): Promise<EmployerSize> => {
    const response = await api.get(`/employer/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const transformedEmployers = transformEmployers([response.data])[0];
    return transformedEmployers;
  },

  // POST /employer
  createEmployer: async (
    employer: EmployerSize,
    access_token: any,
    api: {
      post: (
        arg0: string,
        arg1: {
          name: string;
          size: "MICRO" | "SMALL" | "MID" | "LARGE";
        },
        arg2: { headers: { Authorization: string } }
      ) => any;
    }
  ): Promise<Employer> => {
    const [rawEmployer] = untransformEmployers([employer]);


    const { profile_id, created_At, updated_At, ...body } = rawEmployer; // Exclut profile_id
    const response = await api.post("/employer", body, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const transformedEmployers = transformEmployers([response.data])[0];
    return { ...response.data, transformedEmployers };
  },

  // PUT /employer/:id
  updateEmployer: async (
    id: number,
    employer: EmployerSize,
    access_token: any,
    api: {
      put: (
        arg0: string,
        arg1: RawEmployerSize,
        arg2: { headers: { Authorization: string } }
      ) => any;
    }
  ): Promise<Employer> => {
    const rawBody = untransformEmployers([employer]);

    const { profile_id, ...body } = rawBody[0]; // Exclut profile_id
    const response = await api.put(`/employer/${id}`, body, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const transformedEmployers = transformEmployers([response.data])[0];
    return { ...response.data, transformedEmployers };
  },

  // DELETE /employer/:id
  deleteEmployer: async (
    id: number,
    access_token: any,
    api: {
      delete: (
        arg0: string,
        arg1: { headers: { Authorization: string } }
      ) => any;
    }
  ): Promise<void> => {
    await api.delete(`/employer/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
};
