// 🔹 src/data/identityData.ts
import { IdentityFormData } from "../types/Identity";

export async function fetchIdentity(token: string): Promise<IdentityFormData | null> {
  try {
    const response = await fetch("http://localhost:3000/identity", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Erreur de chargement des données");
      return null;// If the response is not OK, return null
    }

    const data = await response.json();//
    return data;
  } catch (error) {// Handle network errors
    console.error("Erreur réseau :", error);
    return null;
  }
}


// 🔄 Fetch identity data for editing
export async function fetchIdentityForEdit(token: string): Promise<IdentityFormData | null> {
  try {
    const response = await fetch("http://localhost:3000/identity", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch identity data for edit");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error during identity fetch:", error);
    return null;
  }
}

