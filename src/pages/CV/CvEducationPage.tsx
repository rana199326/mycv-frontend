// src/pages/cv/CvEducationPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@components/layout/PageLayout";
import cvBg from "../../assets/images/bg-cv.png";

type Education = {
  id: number;
  name?: string;        // diplôme / formation
  level?: string;       // Bac+2, Licence...
  school?: string;      // établissement
  city?: string;
  start_date?: string;
  end_date?: string;
};

function saveDraft(key: string, value: unknown) {
  try {
    const draft = JSON.parse(localStorage.getItem("cvDraft") || "{}");
    localStorage.setItem("cvDraft", JSON.stringify({ ...draft, [key]: value }));
  } catch {
    localStorage.setItem("cvDraft", JSON.stringify({ [key]: value }));
  }
}

export default function CvEducationPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Education[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/educations", {
      headers: { Authorization: `Bearer ${token ?? ""}` },
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then((data: Education[]) => {
        setItems(data || []);
        // 
        const init: Record<number, boolean> = {};
        (data || []).forEach((e) => (init[e.id] = true));
        setChecked(init);
      })
      .catch(() => setError("Erreur lors du chargement des formations."))
      .finally(() => setLoading(false));
  }, []);

  const formatDates = (s?: string, e?: string) =>
    [s?.slice(0, 10), e?.slice(0, 10)].filter(Boolean).join(" → ");

  const handleNext = () => {
    const selected = items.filter((e) => checked[e.id]);
    saveDraft("education", { selectedIds: selected.map((e) => e.id), items: selected });
    navigate("/cv-xperience"); 
  };

  return (
    <PageLayout backgroundImage={cvBg}>
      <>
        <div className="bg-[#376cad] text-white p-3 rounded-t m-3 text-center">
          <h1 className="text-xl font-bold">CV n°1</h1>
        </div>

        <div className="px-4">
          <h2 className="text-lg font-semibold mb-2">Éducation</h2>
          <div className="border-t border-gray-200 mt-2 mb-4" />

          {loading && <p className="text-gray-500">Chargement…</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && (
            <>
              {items.length === 0 ? (
                <p className="text-sm text-gray-600">Aucune formation trouvée.</p>
              ) : (
                <div className="space-y-3">
                  {items.map((ed) => (
                    <div
                      key={ed.id}
                      className="grid grid-cols-[1fr_auto] gap-2 p-3 rounded-xl border border-gray-200"
                    >
                      <div className="text-sm">
                        <div className="font-semibold">
                          {ed.name || "—"} {ed.level ? `• ${ed.level}` : ""}
                        </div>
                        <div className="text-gray-700">
                          {ed.school || "—"} {ed.city ? `• ${ed.city}` : ""}
                        </div>
                        <div className="text-gray-500">
                          {formatDates(ed.start_date, ed.end_date) || "—"}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          className="h-4 w-4 mt-1 accent-[#376cad]"
                          checked={!!checked[ed.id]}
                          onChange={(e) =>
                            setChecked((prev) => ({ ...prev, [ed.id]: e.target.checked }))
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-center mt-8">
                <button
                  onClick={handleNext}
                  disabled={items.length === 0}
                  className="px-5 py-2 rounded-xl bg-[#f5dab4] text-gray-800 font-medium shadow hover:bg-[#e7cda7] transition disabled:opacity-60"
                  aria-label="Continuer vers la section Expérience"
                >
                  Suivant
                </button>
              </div>

              <p className="mt-3 text-center text-xs text-gray-500">
                Les choix sont enregistrés temporairement lors de la navigation.
                L&apos;enregistrement final se fera à la dernière étape.
              </p>
            </>
          )}
        </div>
      </>
    </PageLayout>
  );
}
