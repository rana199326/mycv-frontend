import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MycvLogo from "../../assets/images/Logo.png";

type ProfileResponse = {
  email?: string;
  identity?: { first_name?: string; last_name?: string; about_me?: string };
};

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const authPages = ["/login", "/register"];
  const isAuthPage = authPages.includes(location.pathname);

  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Refs for click outside detection
  const profileRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  const displayName = (() => {
    const first = profile?.identity?.first_name?.trim() ?? "";
    const last = profile?.identity?.last_name?.trim() ?? "";
    const full = `${first} ${last}`.trim();
    return full || "Utilisateur";
  })();

  const initials =
    displayName
      .split(" ")
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "??";

  // Close dropdowns on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (toggleBtnRef.current?.contains(t)) return; 
      if (profileRef.current && !profileRef.current.contains(t)) {
        setIsProfileDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(t)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    if (isAuthPage) return;
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!res.ok) {
          navigate("/login"); return;
        }
        setProfile(await res.json());
      } catch {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [isAuthPage, navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const closeMenuAndGo = (to: string) => {
    setIsMobileMenuOpen(false);
    navigate(to);
  };

  if (isAuthPage) {
    return (
      <header className="absolute top-0 left-0 w-full flex justify-center pt-3 z-50">
        <img src={MycvLogo} alt="MyCV Logo" className="w-24 h-auto" />
      </header>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full z-20 h-17 bg-gradient-to-r from-[#27548a] via-[#376cad] to-[#87CEFA] border-b border-gray-200">
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center">
            <img src={MycvLogo} alt="MyCV Logo" className="w-16 h-auto" />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-8">
            <div className="flex space-x-6">
              <Link to="/offre" className="font-medium text-gray-100/80 hover:text-white">Offres</Link>
              <Link to="/cvs" className="font-medium text-gray-100/80 hover:text-white">CVs</Link>
              <Link to="/interview" className="font-medium text-gray-100/80 hover:text-white">Entretiens</Link>
            </div>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(v => !v)}
                className="h-8 w-8 rounded-full bg-white/90 text-gray-700 flex items-center justify-center"
              >
                <span className="text-sm font-semibold">{loading ? "…" : initials}</span>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{loading ? "Loading..." : displayName}</p>
                      <p className="text-sm text-gray-500">{loading ? "…" : profile?.email ?? "—"}</p>
                    </div>
                    <Link to="/identity" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Identity</Link>
                    <Link to="/educations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Formations</Link>
                    <Link to="/experiences" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Expériences</Link>
                    <Link to="/skills" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Compétences</Link>
                    <Link to="/languages" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Langues</Link>
                    <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Se déconnecter</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            ref={toggleBtnRef}
            className="md:hidden p-2 rounded-md text-white/80 hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu  */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white" ref={mobileMenuRef}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button onClick={() => closeMenuAndGo("/offre")} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-gray-50">Offres</button>
            <button onClick={() => closeMenuAndGo("/interview")} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50">Entretiens</button>
          </div>

          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="px-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">{loading ? "…" : initials}</span>
              </div>
              <div>
                <div className="text-base font-medium text-gray-800">{loading ? "Loading..." : displayName}</div>
                <div className="text-sm font-medium text-gray-500">{loading ? "…" : profile?.email ?? "—"}</div>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <button onClick={() => closeMenuAndGo("/profile")} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50">Your Profile</button>
              <button onClick={() => closeMenuAndGo("/cvs")} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50">CVs</button>
              <button onClick={() => { setIsMobileMenuOpen(false); handleSignOut(); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50">Se déconnecter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
