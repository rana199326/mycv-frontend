import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import PageLayout from "@components/layout/PageLayout";
import { IdentityFormData } from "../../types/Identity";
import { fetchIdentityForEdit } from "../../data/identityData"; // ✅ External fetch function

export default function EditIdentity() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🟡 State to store identity form values
  const [formData, setFormData] = useState<IdentityFormData>({
    id: 0,
    first_name: "",
    last_name: "",
    birth_date: "",
    email: "",
    phone_number: "",
    street: "",
    zip_code: "",
    city: "",
    about_me: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  // 🔄 Load existing identity data into form on mount
  useEffect(() => {
    if (!token) return;// 🛑 Ensure token is available

    fetchIdentityForEdit(token).then((data) => {// ✅ Fetch identity data
      if (data) setFormData(data);
      setIsLoading(false);
    });
  }, [token]);// 🟢 Fetch identity data when component mounts

  // 📝 Update a single field in the form
  const handleChange = (field: keyof IdentityFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // 💾 Save form data to backend
  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:3000/identity", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/identity"); // ✅ return to identity page after saving
      } else {
        console.error("Error saving identity");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  if (isLoading) {
    return <p className="text-center mt-6">Chargement...</p>;
  }

  return (
   <PageLayout>
    <>
    {/* 🔷 Header */}
      <div className="bg-[#376cad] text-white p-3 rounded-t m-3 text-center">
        <h1 className="text-xl font-bold">Mon profil</h1>
      </div>

      {/* 🔶 Identity fields */}
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-2">Identité</h2>

        <div className="flex items-center gap-2 mb-2">
          <label className="w-20 font-semibold">Nom :</label>
          <input
            type="text"
            className="flex-1 border rounded p-1 text-sm"
            value={formData.last_name}
            onChange={(e) => handleChange("last_name", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <label className="w-20 font-semibold">Prénom :</label>
          <input
            type="text"
            className="flex-1 border rounded p-1 text-sm"
            value={formData.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <label className="w-20 font-semibold">Neé le :</label>
          <input
            type="date"
            className="flex-1 border rounded p-1 text-sm"
            value={formData.birth_date}
            onChange={(e) => handleChange("birth_date", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <label className="w-20 font-semibold">Email :</label>
          <input
            type="email"
            className="flex-1 border rounded p-1 text-sm"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <label className="w-20 font-semibold">Tel :</label>
          <input
            type="tel"
            className="flex-1 border rounded p-1 text-sm"
            value={formData.phone_number}
            onChange={(e) => handleChange("phone_number", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <label className="w-20 font-semibold">Adresse :</label>
          <input
            type="text"
            className="flex-1 border rounded p-1 text-sm"
            value={formData.street}
            onChange={(e) => handleChange("street", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <label className="w-20 font-semibold">Code postal :</label>
          <input
            type="text"
            className="flex-1 border rounded p-1 text-sm"
            value={formData.zip_code}
            onChange={(e) => handleChange("zip_code", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <label className="w-20 font-semibold">Ville :</label>
          <input
            type="text"
            className="flex-1 border rounded p-1 text-sm"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>
      </div>

      {/* 🔸 About Me field */}
      <div className="border-b-2 p-4 mt-4">
        <h2 className="text-2xl font-semibold mb-2">À propos de moi</h2>
        <textarea
          className="w-full border rounded p-2 h-30"
          placeholder="Votre profil en quelques mots..."
          value={formData.about_me}
          onChange={(e) => handleChange("about_me", e.target.value)}
        />
      </div>

      {/* Save button */}
      <div className="flex justify-center p-3">
        <button
          onClick={handleSave}
          className="text-white bg-[#376cad] hover:bg-[#1c4679] p-3 rounded-full shadow"
        >
          <FaSave className="text-xl" />
        </button>
      </div>
    </>
    </PageLayout>
  );
}
// This component allows users to edit their identity information.
