import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@components/layout/PageLayout";
import cvBg from "../../assets/images/bg-cv.png";

export default function CvCreatePage() {
  const navigate = useNavigate();
  const [template, setTemplate] = useState<"modern" | "classic">("modern");

  const handleContinue = () => {
    // UI only
    navigate("/cv-identity");
  };

  return (
    <PageLayout backgroundImage={cvBg}>
      <>
        {/* Header */}
        <div className="bg-[#376cad] text-white p-3 rounded-t m-3 text-center">
          <h1 className="text-xl font-bold">Créez votre CV</h1>
        </div>

        {/* Separator */}
        <div className="border-b border-gray-300" />

        {/* Content */}
        <div className="p-4 space-y-6">
          <p className="text-gray-700">
            Choisissez le modèle approprié et mettez à jour vos données pour
            créer votre CV professionnel.
          </p>

          <div className="bg-white rounded-xl border shadow-sm p-4 space-y-3">
            <p className="font-medium">Choisissez le modèle :</p>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="tpl"
                checked={template === "modern"}
                onChange={() => setTemplate("modern")}
              />
              <span>Modern template (modern design)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="tpl"
                checked={template === "classic"}
                onChange={() => setTemplate("classic")}
              />
              <span>Modèle classique (design officiel)</span>
            </label>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleContinue}
              className="px-6 py-2 rounded-xl bg-[#376cad] text-white font-semibold shadow hover:bg-[#205290] transition"
            >
              Continuer
            </button>
          </div>
        </div>
      </>
    </PageLayout>
  );
}
