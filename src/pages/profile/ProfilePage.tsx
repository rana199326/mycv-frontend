// src/pages/profile/ProfilePage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@components/layout/PageLayout";
import { SlArrowRightCircle } from "react-icons/sl";
import { ProfileFormData } from "../../types/Profile";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!res.ok) return navigate("/login");
        const data = await res.json();
        setProfile(data);
      } catch (e: any) {
        setError(e.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  if (loading) return <p className="text-center mt-4">Chargement…</p>;
  if (error)   return <p className="text-center text-red-600 mt-4">{error}</p>;

  return (
    <PageLayout>
      <>
        {/* Header */}
        <div className="bg-[#376cad] text-white p-4 text-center">
          <h1 className="text-xl font-bold">Mon profil</h1>
        </div>

        {/* Identité */}
        <div className="border-b-2 p-4 pt-8 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold mb-2">Identité</h2>
            <p className="mb-2"><strong>Nom : </strong>{profile?.identity?.last_name}</p>
            <p className="mb-2"><strong>Prénom : </strong>{profile?.identity?.first_name}</p>
            <p className="mb-2"><strong>Email : </strong>{profile?.email}</p>
          </div>
          <button onClick={() => navigate("/identity")} className="text-4xl">
            <SlArrowRightCircle />
          </button>
        </div>

        {/* À propos de moi */}
        <div className="border-b-2 p-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">À propos de moi</h2>
          <p className="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">
            {profile?.identity?.about_me || "Aucune description fournie."}
          </p>
        </div>

        {/* Progress */}
        <div className="mt-4 bg-gray-400 h-3 rounded">
          <div className="bg-[#F5EEDC] h-3 rounded w-[60%]" />
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 mt-4">
          <button onClick={() => navigate("/educations")} className="bg-[#F5EEDC] p-2 rounded">Formations</button>
          <button onClick={() => navigate("/experiences")} className="bg-[#F5EEDC] p-2 rounded">Expériences professionnelles</button>
          <button onClick={() => navigate("/skills")} className="bg-[#F5EEDC] p-2 rounded">Compétences</button>
          <button onClick={() => navigate("/languages")} className="bg-[#F5EEDC] p-2 rounded">Langues</button>
        </div>
      </>
    </PageLayout>
  );
}
