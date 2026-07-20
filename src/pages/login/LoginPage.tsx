import { useState, useEffect } from "react";
import bg from "@assets/images/Design-bg.png";
import { useParams, useNavigate } from "react-router-dom";
import { ProfileFormData } from "../../types/Profile";
import Button from "@components/ui/globals/Button";
import CheckboxInput from "@components/ui/form/CheckBox";
import { authService } from "@services/authService";
import { useAuthStore } from "../../store/authStore";



export const LoginPage = () => {
  const navigate = useNavigate();

  const [formLoginData, setFormLoginData] = useState<ProfileFormData>({
    id: 0,
    email: "",
    password: "",
  });

  const [profilSettings, setProfilSettings] = useState({
    saved: false,
  });

  const [isAlert, setIsAlert] = useState<string>("");

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formLoginData.password) {
    setIsAlert("Le mot de passe ne peut pas être vide.");
    return;
  }

  try {
    const tokens = await authService.login(
      formLoginData.email,
      formLoginData.password
    );

    // **Save token in localStorage**
    if (tokens?.access_token) {
      localStorage.setItem("token", tokens.access_token);
    }
    const { access_token, refresh_token } = tokens;
useAuthStore.getState().setTokens(access_token, refresh_token);

    const firstLogin = localStorage.getItem("first_login");
    if (firstLogin === "true") {
      localStorage.removeItem("first_login");
      navigate("/welcome");
    } else {
      navigate("/home");
    }
  } catch (error: any) {
    setIsAlert("Échec de la connexion. Vérifiez vos identifiants.");
    console.error("Login error:", error);
  }
};


  return (
         <div
      className="w-full min-h-screen bg-center bg-cover"
      style={ window.innerWidth >= 768 ? { backgroundImage: `url(${bg})` } : undefined }
    >
    <div className="pt-32 pb-8 flex flex-col items-center px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h1 className="font-bold text-2xl mb-4">
            J'ai déjà un espace, je me connecte
          </h1>

          {isAlert && (
            <div className="p-4 mb-4 text-sm text-red-500 rounded-xl bg-red-50 font-normal" role="alert">
              <span className="font-semibold mr-2">Attention</span>
              {isAlert}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formLoginData.email}
                onChange={(e) => setFormLoginData({ ...formLoginData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                value={formLoginData.password}
                onChange={(e) => setFormLoginData({ ...formLoginData, password: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
              />
              <div className="mt-4">
                <CheckboxInput
                  label="passwordSaved"
                  description="Mémoriser le mot de passe"
                  checked={profilSettings.saved}
                  onChange={(checked: boolean) =>
                    setProfilSettings((prev) => ({ ...prev, saved: checked }))
                  }
                />
              </div>
            </div>

            {/* Login button */}
            <div className="flex flex-col items-center mt-8 space-y-2">
              <Button text="Se connecter" variant="beige" onClick={handleLogin} />
              <a href="#" className="text-sm font-medium text-gray-700 hover:underline">
                Mot de passe oublié
              </a>
            </div>
          </form>
        </div>

        {/* Register redirect */}
        <div className="w-full max-w-md flex flex-col items-center mt-6 space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Je n'ai pas de compte, je m'inscris
          </p>
          <Button text="S'inscrire" variant="beige" onClick={() => navigate('/register')} />
        </div>
      </div>
    </div>
  );
};