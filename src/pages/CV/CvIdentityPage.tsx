// src/pages/cv/CvIdentityPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ⟵ NEW
import PageLayout from "@components/layout/PageLayout";
import cvBg from "../../assets/images/bg-cv.png";

type Identity = {
  first_name?: string;
  last_name?: string;
  birth_date?: string;
  email?: string;
  phone_number?: string;
  street?: string;
  city?: string;
};

// Helper to save draft safely in localStorage  ⟵ NEW
function saveDraft(key: string, value: unknown) {
  try {
    const draft = JSON.parse(localStorage.getItem("cvDraft") || "{}");
    const next = { ...draft, [key]: value };
    localStorage.setItem("cvDraft", JSON.stringify(next));
  } catch {
    localStorage.setItem("cvDraft", JSON.stringify({ [key]: value }));
  }
}

export default function CvIdentityPage() {
  const navigate = useNavigate(); // ⟵ NEW

  const [loading, setLoading] = useState(true);
  const [identity, setIdentity] = useState<Identity>({});
  const [error, setError] = useState<string | null>(null);

  // NEW: track which fields user wants 
  const [checked, setChecked] = useState<Record<keyof Identity, boolean>>(
    {} as any
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/identity", {
      headers: { Authorization: `Bearer ${token ?? ""}` },
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then((data: Identity) => {
        setIdentity(data);
        // initialize all checkboxes to true for name, false for others
        const init: Record<keyof Identity, boolean> = {
          first_name: true,
          last_name: true,
          birth_date: false,
          email: false,
          phone_number: false,
          street: false,
          city: false,
        };
        setChecked(init);
      })
      .catch(() => setError("Erreur lors du chargement de l'identité."))
      .finally(() => setLoading(false));
  }, []);

  const rows: Array<{ k: keyof Identity; label: string; v?: string }> = [
    { k: "last_name", label: "Nom", v: identity.last_name },
    { k: "first_name", label: "Prénom", v: identity.first_name },
    { k: "birth_date", label: "Né le", v: identity.birth_date?.slice(0, 10) },
    { k: "email", label: "Email", v: identity.email },
    { k: "phone_number", label: "Tel", v: identity.phone_number },
    { k: "street", label: "Rue", v: identity.street },
    { k: "city", label: "Ville", v: identity.city },
  ];

  // ⟵ NEW: handle next (save temporary + go to Education)
  const handleNext = () => {
    // keep only selected fields
    const selectedIdentity: Partial<Identity> = {};
    rows.forEach(({ k, v }) => {
      if (checked[k] && v) (selectedIdentity as any)[k] = v;
    });

    // store step order (optional) + identity block
    saveDraft("steps", [
      "identity",
      "education",
      "experience",
      "skills",
      "languages",
      "review",
    ]);
    saveDraft("identity", {
      data: identity,
      selected: checked,
      effective: selectedIdentity,
    });

    // go to next step
    navigate("/cv-education");
  };

  return (
    <PageLayout backgroundImage={cvBg}>
      <>
        <div className="bg-[#376cad] text-white p-3 rounded-t m-3 text-center">
          <h1 className="text-xl font-bold">CV n°1</h1>
        </div>

        <div className="px-4">
          <h2 className="text-lg font-semibold mb-2">Identité</h2>
          <div className="border-t border-gray-200 mt-2 mb-4" />

          {loading && <p className="text-gray-500">Chargement…</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && (
            <>
              <div className="space-y-2">
                {rows.map((r) => (
                  <div
                    key={String(r.k)}
                    className="grid grid-cols-[110px_1fr_auto] items-center gap-2"
                  >
                    <div className="text-sm font-semibold">{r.label} :</div>
                    <div className="text-sm text-gray-800 truncate">
                      {r.v || "—"}
                    </div>

                    {/* ⟵ make checkbox controlled */}
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[#376cad]"
                      checked={checked[r.k] ?? false}
                      onChange={(e) =>
                        setChecked((prev) => ({
                          ...prev,
                          [r.k]: e.target.checked,
                        }))
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                {/* Suivant */}
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-[#f5dab4] text-gray-800 font-medium shadow hover:bg-[#e7cda7] transition disabled:opacity-60"
                  aria-label="Continuer vers la section Éducation"
                >
                  Suivant
                </button>
              </div>

              <p className="mt-3 text-center text-xs text-gray-500">
                Les choix sont enregistrés temporairement lors de la navigation.
                L'enregistrement final se fera à la dernière étape.
              </p>
            </>
          )}
        </div>
      </>
    </PageLayout>
  );
}
