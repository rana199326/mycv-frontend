import axios from "axios";

export const authService = {
  async login(email: string, password: string): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", { email, password });
      return response.data; // { access_token, refresh_token }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
};