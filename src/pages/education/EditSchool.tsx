import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import PageLayout from "@components/layout/PageLayout";


export default function EditSchool() {
  const navigate = useNavigate();
  const { id } = useParams(); // get school ID from URL (if exists)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    country: "",
  });

  // Fetch school data if editing
  useEffect(() => {
    if (id) {
      const token = localStorage.getItem("token");

      fetch(`http://localhost:3000/school/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            name: data.name,
            city: data.city,
            country: data.country,
          });
        })
        .catch((err) => console.error("Error loading school:", err));
    }
  }, [id]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save (POST for new, PATCH for update)
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/school${id ? `/${id}` : ""}`, {
        method: id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save");

      navigate("/school");
    } catch (error) {
      console.error("Error saving school:", error);
      alert("Erreur lors de l'enregistrement.");
    }
  };

  return (
   <PageLayout>
    <>
    {/* Page header */}
      <div className="bg-[#376cad] text-white p-3 rounded-t m-3 text-center">
        <h1 className="text-xl font-bold">École</h1>
      </div>

      {/* School form */}
      <div className="flex items-center gap-2 mb-2 p-4">
        <label className="w-20 font-semibold">Nom :</label>
        <input
          name="name"
          type="text"
          className="flex-1 border rounded p-1 text-sm"
          placeholder="École Polytechnique"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-2 mb-2 p-4">
        <label className="w-20 font-semibold">Ville :</label>
        <input
          name="city"
          type="text"
          className="flex-1 border rounded p-1 text-sm"
          placeholder="Palaiseau"
          value={formData.city}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-2 mb-2 p-4">
        <label className="w-20 font-semibold">Pays :</label>
        <input
          name="country"
          type="text"
          className="flex-1 border rounded p-1 text-sm"
          placeholder="France"
          value={formData.country}
          onChange={handleChange}
        />
      </div>

      {/* Save button */}
      <div className="flex justify-center">
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
