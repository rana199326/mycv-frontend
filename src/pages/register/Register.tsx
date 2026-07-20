import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterFormData } from "src/types/Register";
import axios from "axios";
import  { isAxiosError  } from "axios";
import bg from "@assets/images/Design-bg.png";



const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const navigate = useNavigate();

  // Form input states
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error messages for each field
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Loading and success states
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ✅ If registration is successful, redirect to login page after 2 seconds
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/EmailVerification'); // Redirect to email verification page
      }, 2000);
    }
  }, [isSuccess]);

  // ✅ Validate email format
  const validateEmail = (email: string) => {
    return email.includes('@') && email.includes('.') && email.length > 5;
  };

  // ✅ Validate password (at least 8 characters, 1 number, 1 letter)
  const validatePassword = (password: string) => {
    return password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);
  };

  // ✅ Submit registration form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("L'adresse e-mail est invalide.");
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre."
      );
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas.");
      valid = false;
    }

    if (!valid) return;

    setIsLoading(true);

    try {
      const response = await axios.post<RegisterFormData>(
  `${API_URL}/auth/register`,
        {
          first_name: firstname,
          last_name: lastname,
          email,
          password,
        }
      );

      if (response.status === 200 || response.status === 201) {
        setIsSuccess(true);
      }
    } catch (error: any) {
      if (isAxiosError(error) && error.response) {
        const message =
          error.response.data?.message || "Erreur lors de l'inscription.";
        if (message.includes("email")) {
          setEmailError(message);
        } else {
          alert(message);
        }
      } else {
        console.error("Erreur inattendue :", error);
        alert("Une erreur réseau est survenue.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div
      className="w-full min-h-screen bg-center bg-cover"
      style={ window.innerWidth >= 768 ? { backgroundImage: `url(${bg})` } : undefined }
    >
<div className="pt-32 pb-8 flex flex-col items-center px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
        <h1 className="font-bold text-2xl mb-4 text-center">Inscription</h1>

      <form
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        {/* First Name */}
        <div className="mb-4">
          <label
            htmlFor="firstname"
            className="block text-sm font-medium text-gray-700"
            data-cy="register-firstname-label"
          >
            Prenom
          </label>
          <input
            type="text"
            id="firstname"
            className="mt-1 p-2 w-full border rounded-md"
            role="register-firstname-input"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label
            htmlFor="lastname"
            data-cy="register-lastname-label"
            className="block text-sm font-medium text-gray-700"
          >
            Nom
          </label>
          <input
            type="text"
            id="lastname"
            role="register-lastname-input"
            className="mt-1 p-2 w-full border rounded-md"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            data-cy="register-email-label"
            className="block text-sm font-medium text-gray-700"
          >
            E-mail
          </label>
          <input
            type="email"
            role="register-email-input"
            id="email"
            className="mt-1 p-2 w-full border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            data-cy="register-password-label"
            className="block text-sm font-medium text-gray-700"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            role="register-password-input"
            className="mt-1 p-2 w-full border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            data-cy="register-confirm-password-label"
            className="block text-sm font-medium text-gray-700"
          >
            Confirmez le mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            role="register-confirm-password-input"
            className="mt-1 p-2 w-full border rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && (
            <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            data-cy="register-submit-button"
            className="w-full bg-[#f5eedc] hover:text-gray-700 text-black font-bold py-2 px-4 rounded"
          >
            {isLoading ? "Loading..." : " S’inscrire"}
          </button>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="mt-4 text-green-500">
            Registration successful! You will be redirected to login.
          </div>
        )}
      </form>
    </div>
            </div>     

    </div>
  );
}
