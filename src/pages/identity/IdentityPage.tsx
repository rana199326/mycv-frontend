import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@components/layout/PageLayout";

import { FaRegEdit } from "react-icons/fa";
import { IdentityFormData } from "../../types/Identity";
import { fetchIdentity } from "../../data/identityData"; // ✅ Import the fetch function

export default function IdentityPage() {
  const navigate = useNavigate();
  const [identityData, setIdentityData] = useState<IdentityFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Fetch identity data on component mount using external data module
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetchIdentity(token).then((data) => {
      setIdentityData(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    // Show loading state while fetching data
    return <p className="text-center mt-6">Chargement...</p>;
  }

  /*
  if (!identityData || !identityData.first_name) {// Check if data is empty or first_name is not provided
   return <p className="text-center mt-6 text-red-500">Aucune donnée trouvée.</p>;
  }
  */

  return (
    <PageLayout>
      <>      
      {/* Header */}
      <div className="bg-[#376cad] text-white p-3 rounded-t m-3 text-center">
        <h1 className="text-xl font-bold">Mon profil</h1>
      </div>

      {/* Identity Section */}
      <div className="border-b-2 p-4 flex justify-between items-center relative">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Identité</h2>
          <p className="mb-2">
            <strong>Nom : </strong> {identityData?.last_name || ""}
          </p>
          <p className="mb-2">
            <strong>Prénom : </strong> {identityData?.first_name || ""}
          </p>
          <p className="mb-2">
            <strong>Neé le : </strong> {identityData?.birth_date || ""}
          </p>
          <p className="mb-2">
            <strong>Email : </strong> {identityData?.email || ""}
          </p>
          <p className="mb-2">
            <strong>Tel : </strong> {identityData?.phone_number || ""}
          </p>
          <p className="mb-2">
            <strong>Adresse : </strong> {identityData?.street || ""}
          </p>
          <p className="mb-2">
            <strong>Code postal : </strong> {identityData?.zip_code || ""}
          </p>
          <p className="mb-2">
            <strong>Ville : </strong> {identityData?.city || ""}
          </p>
        </div>
      </div>

      {/* 🔸 About Me Section */}
      <div className="border-b-2 p-4 mt-4">
        <h2 className="text-2xl font-semibold mb-2">À propos de moi</h2>
        <p className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">
          {identityData?.about_me || "Aucune description fournie."}
        </p>
      </div>
      {/* ✏️ Edit Button */}
      <div className="flex justify-center p-3 ">
        <button
          onClick={() => navigate("/edit-identity")}
          className="text-white bg-[#376cad] hover:bg-[#1c4679] p-3 rounded-full shadow"
        >
          <FaRegEdit className="text-4xl" />
        </button>
      </div>
    </>
    </PageLayout>
  );
}
