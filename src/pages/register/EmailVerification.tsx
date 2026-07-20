import React from "react";  
import { useNavigate } from "react-router-dom";

export default function EmailVerification() {
      const navigate = useNavigate(); 
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Email Confirmation</h1>
            <p className="text-gray-600 mb-4">
              Veuillez consulter votre boîte mail  <br/>
                  pour confirmer l’inscription.
            </p>
            <button
              onClick={() => navigate("/EmailConfirmation")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
            OK
            </button>
          </div>
        </div>
      );
}