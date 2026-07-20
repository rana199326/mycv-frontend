import React from "react";  
import { useNavigate } from "react-router-dom";

export default function EmailConfirmation() {
      const navigate = useNavigate(); 
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Email Confirmation</h1>
            <p className="text-gray-600 mb-4">
              Votre adresse e-mail a bien été confirmée. Vous pouvez désormais vous connecter à votre compte.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Se connecter
            </button>
          </div>
        </div>
      );
}