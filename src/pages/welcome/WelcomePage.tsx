
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
 const navigate = useNavigate();

 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 text-center max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Bienvenue sur MyCV 👋
        </h1>
        <p className="text-gray-600 mb-6">
          Première connexion ? Complétez votre profil afin de créer votre CV et
          postuler aux offres facilement.
        </p>
        <button
          onClick={() => navigate("/profile")}
          className="bg-[#f5eedc] hover:text-gray-700 text-black font-bold py-2 px-6 rounded-lg transition"
        >
          Commencer
        </button>
         <p className="mt-4 text-sm text-gray-500">
          Vous pourrez explorer les offres plus tard.
        </p>
    </div>
    </div>
  );
};


   