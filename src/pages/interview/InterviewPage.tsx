// src/pages/InterviewPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import {
  InterviewFormData,
  InterviewStatus,
  InterviewMode,
} from "../../types/interview"; // <-- adjust path if needed
import PageLayout from "@components/layout/PageLayout";
import interviewBg from "../../assets/images/bg-interview.png";

// ---- Labels for enums (nice text) ----
const STATUS_LABELS: Record<InterviewStatus, string> = {
  PENDING: "En attente",
  ACCEPTED: "Accepté",
  REJECTED: "Refusé",
  NO_RESPONSE: "Sans réponse",
};

const MODE_LABELS: Record<InterviewMode, string> = {
  IN_PERSON: "Présentiel",
  ONLINE: "En ligne",
  TELEPHONE: "Téléphonique",
};

// ---- Process options (UI only, controls dynamic section) ----
type ProcessOption =
  | "Entretien planifié"
  | "Transmettre un questionnaire QCM post-entretien"
  | "Clôture de la candidature";

// ---- Helpers (dates) ----
// Convert ISO -> "YYYY-MM-DD" for <input type="date">
const isoToYMD = (iso?: string | null) => (iso ? String(iso).slice(0, 10) : "");
// Convert "YYYY-MM-DD" + "HH:mm" -> ISO "YYYY-MM-DDTHH:mm:00.000Z"
const toISO = (d: string | null | undefined, t?: string) =>
  d ? `${d}T${t || "00:00"}:00.000Z` : null;
// Convert "HH:mm" -> "HH:mm:00" for Prisma @db.Time
const toTimeOnly = (t?: string) => (t ? `${t}:00` : null);

export default function InterviewPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // if present => edit mode

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---- Base form strictly typed by InterviewFormData (BEGINNER-FRIENDLY) ----
  const [form, setForm] = useState<InterviewFormData>({
    id: 0,
    position: "",
    company: "",
    status: "PENDING",
    date_interview: null, // will be synced from dateYMD on save
    is_closed: false as unknown as boolean, // keep compatibility with your type
    location_of_interview: "",
    interview_mode: "IN_PERSON",
  });

  const [candidatures, setCandidatures] = useState<
    { id: number; title: string }[]
  >([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/candidature/my", {
      headers: { Authorization: `Bearer ${token ?? ""}` },
    })
      .then((r) => r.json())
      .then((data) => setCandidatures(data))
      .catch(() => alert("Erreur lors du chargement des candidatures"));
  }, []);

  // ---- Local UI-only fields (not in InterviewFormData) ----
  const [dateYMD, setDateYMD] = useState<string>(""); // "YYYY-MM-DD"
  const [timeHHmm, setTimeHHmm] = useState<string>(""); // "HH:mm"

  const [process, setProcess] = useState<ProcessOption>("Entretien planifié");

  // QCM section (UI-only). We only send quiz_email + quiz_sent if needed.
  const [quizEmail, setQuizEmail] = useState<string>("");
  const [sendMethod, setSendMethod] = useState<"now" | "email">("email");
  const [sendDate, setSendDate] = useState<string>(""); // "YYYY-MM-DD"
  const [sendTime, setSendTime] = useState<string>(""); // "HH:mm"

  // Closure section (UI-only)
  const [closureReason, setClosureReason] = useState<
    "ACCEPTED_OTHER_OFFER" | "PROJECT_CHANGE" | "AVAILABILITY" | "OTHER" | ""
  >("");
  const [closureText, setClosureText] = useState<string>("");

  // Small setter for InterviewFormData
  const setF = <K extends keyof InterviewFormData>(
    k: K,
    v: InterviewFormData[K]
  ) => setForm((p) => ({ ...p, [k]: v }));

  // ---- Load interview if editing ----
  useEffect(() => {
    if (!id) return; // create mode
    const token = localStorage.getItem("token");

    setLoading(true);
    fetch(`http://localhost:3000/interview/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text || `HTTP ${res.status}`);
        return text ? JSON.parse(text) : {};
      })
      .then((data) => {
        const filled: InterviewFormData = {
          id: data.id,
          position: data.position ?? "",
          company: data.company ?? "",
          status: (data.status ?? "PENDING") as InterviewStatus,
          date_interview: data.date_interview ?? null, // ISO string
          is_closed: !!data.is_closed as unknown as boolean,
          location_of_interview: data.location_of_interview ?? "",
          interview_mode: (data.interview_mode ?? "IN_PERSON") as InterviewMode,
        };
        setForm(filled);
        setDateYMD(isoToYMD(filled.date_interview));
        setTimeHHmm(data.hour ? String(data.hour).slice(11, 16) : ""); // if backend returns time
      })
      .catch((err) => {
        console.error("Failed to load interview:", err);
        alert("Erreur lors du chargement de l'entretien.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ---- Save (POST for create, PATCH for update) ----
  const handleSave = async () => {
    // Minimal validation (beginner-friendly)
    if (!form.position || !form.position.trim())
      return alert("Intitulé du poste requis.");

    const token = localStorage.getItem("token");

    // Build payload that backend expects (Prisma/DTO keys).
    // We keep InterviewFormData fields as the source of truth.
    const payload: any = {
      position: form.position?.trim() ?? null,
      company: form.company?.trim() ?? null,
      status: form.status ?? null, // enum from InterviewFormData
      is_closed: Boolean(form.is_closed), // convert to boolean
      location_of_interview: form.location_of_interview?.trim() ?? null,
      date_interview: toISO(dateYMD, timeHHmm), // ISO date-time
      hour: toTimeOnly(timeHHmm), // "HH:mm:00" for @db.Time
      interview_mode: form.interview_mode ?? null, // enum from InterviewFormData

      // These two exist in your Prisma but NOT in InterviewFormData.
      // We'll send them only when process = QCM.
      quiz_email:
        process === "Transmettre un questionnaire QCM post-entretien"
          ? quizEmail || null
          : null,
      quiz_sent:
        process === "Transmettre un questionnaire QCM post-entretien"
          ? sendMethod === "now"
            ? new Date().toISOString()
            : toISO(sendDate, sendTime)
          : null,

      // Prisma requires candidature_id. Replace with a real id from your app.
      candidature_id: 1,
    };

    try {
      setSaving(true);
      const res = await fetch(
        `http://localhost:3000/interview${id ? `/${id}` : ""}`,
        {
          method: id ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token ?? ""}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const text = await res.text();
      if (!res.ok) {
        alert(`Erreur ${res.status}\n${text || ""}`);
        return;
      }

      alert(id ? "Entretien modifié !" : "Entretien enregistré !");
      navigate("/interview-list"); // change to your list route if different
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageLayout backgroundImage={interviewBg}>
      <h1 className="text-xl font-bold">Mes entretiens</h1>{" "}
      <>
        {" "}
        {/* Header */}
        <div className="bg-[#376cad] text-white p-3 rounded-t m-3 text-center">
          <h1 className="text-xl font-bold">
            {id ? "Modifier l’entretien" : "Créer un entretien"}
          </h1>
        </div>
        <div className="p-4 space-y-4 bg-white rounded-b shadow">
          {loading ? (
            <p className="text-gray-500 text-center">Chargement…</p>
          ) : (
            <>
              {/* ---- Position ---- */}
              <div>
                <label className="block text-sm font-semibold">
                  Intitulé du poste
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2 mt-1"
                  value={form.position ?? ""}
                  onChange={(e) => setF("position", e.target.value)}
                />
              </div>

              {/* ---- Company ---- */}
              <div>
                <label className="block text-sm font-semibold">
                  Entreprise
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2 mt-1"
                  value={form.company ?? ""}
                  onChange={(e) => setF("company", e.target.value)}
                />
              </div>

              {/* ---- Status (options) ---- */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  État de la décision
                </label>
                <div className="flex flex-col space-y-1">
                  {(Object.keys(STATUS_LABELS) as InterviewStatus[]).map(
                    (key) => (
                      <label key={key} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="status"
                          value={key}
                          checked={form.status === key}
                          onChange={() => setF("status", key)}
                        />
                        <span>{STATUS_LABELS[key]}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* ---- Process selector (options) ---- */}
              <div>
                <label className="block text-sm font-semibold">
                  État du Processus
                </label>
                <select
                  className="w-full border rounded p-2 mt-1"
                  value={process}
                  onChange={(e) => setProcess(e.target.value as ProcessOption)}
                >
                  <option>Entretien planifié</option>
                  <option>
                    Transmettre un questionnaire QCM post-entretien
                  </option>
                  <option>Clôture de la candidature</option>
                </select>
              </div>

              {/* ---- A) Entretien planifié ---- */}
              {process === "Entretien planifié" && (
                <div className="border p-4 rounded bg-gray-50">
                  <h3 className="font-medium mb-3">Lieu de l’entretien</h3>

                  <label className="block text-sm">Lieu</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2 mb-3"
                    value={form.location_of_interview ?? ""}
                    onChange={(e) =>
                      setF("location_of_interview", e.target.value)
                    }
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm">Date</label>
                      <input
                        type="date"
                        className="w-full border rounded p-2"
                        value={dateYMD}
                        onChange={(e) => setDateYMD(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm">Heure</label>
                      <input
                        type="time"
                        className="w-full border rounded p-2"
                        value={timeHHmm}
                        onChange={(e) => setTimeHHmm(e.target.value)}
                      />
                    </div>
                  </div>

                  <label className="block text-sm mt-3">
                    Mode de l’entretien
                  </label>
                  <div className="flex flex-col space-y-1 mt-1">
                    {(Object.keys(MODE_LABELS) as InterviewMode[]).map(
                      (key) => (
                        <label key={key} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="interview_mode"
                            value={key}
                            checked={form.interview_mode === key}
                            onChange={() => setF("interview_mode", key)}
                          />
                          <span>{MODE_LABELS[key]}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* ---- B) QCM post-entretien ---- */}
              {process ===
                "Transmettre un questionnaire QCM post-entretien" && (
                <div className="border p-4 rounded bg-gray-50">
                  <h3 className="font-medium mb-3">
                    Questionnaire post-entretien
                  </h3>

                  <label className="block text-sm">Email du responsable</label>
                  <input
                    type="email"
                    className="w-full border rounded p-2"
                    value={quizEmail}
                    onChange={(e) => setQuizEmail(e.target.value)}
                  />

                  <label className="block text-sm font-semibold mt-3">
                    Méthode d’envoi
                  </label>
                  <div className="flex items-center gap-4 mt-1">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="sendMethod"
                        checked={sendMethod === "now"}
                        onChange={() => setSendMethod("now")}
                      />
                      <span>Immédiatement après l’entretien</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="sendMethod"
                        checked={sendMethod === "email"}
                        onChange={() => setSendMethod("email")}
                      />
                      <span>Par email à une date/heure spécifiques</span>
                    </label>
                  </div>

                  {sendMethod === "email" && (
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div>
                        <label className="block text-sm">Date d’envoi</label>
                        <input
                          type="date"
                          className="w-full border rounded p-2"
                          value={sendDate}
                          onChange={(e) => setSendDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm">Heure</label>
                        <input
                          type="time"
                          className="w-full border rounded p-2"
                          value={sendTime}
                          onChange={(e) => setSendTime(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ---- C) Clôture de la candidature ---- */}
              {process === "Clôture de la candidature" && (
                <div className="border p-4 rounded bg-gray-50">
                  <h3 className="font-medium mb-3">Motif de la clôture</h3>

                  <div className="flex flex-col space-y-1">
                    {[
                      {
                        val: "ACCEPTED_OTHER_OFFER",
                        label: "J’ai accepté une autre offre",
                      },
                      {
                        val: "PROJECT_CHANGE",
                        label: "Changement de projet professionnel",
                      },
                      {
                        val: "AVAILABILITY",
                        label: "Problèmes de disponibilité",
                      },
                      { val: "OTHER", label: "Autre (champ de texte libre)" },
                    ].map(({ val, label }) => (
                      <label key={val} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="closure"
                          checked={closureReason === (val as any)}
                          onChange={() => setClosureReason(val as any)}
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>

                  {closureReason === "OTHER" && (
                    <textarea
                      className="w-full border rounded p-2 mt-2"
                      rows={3}
                      placeholder="Précisez le motif…"
                      value={closureText}
                      onChange={(e) => setClosureText(e.target.value)}
                    />
                  )}

                  <div className="flex items-center gap-2 mt-3">
                    <input
                      id="is_closed"
                      type="checkbox"
                      checked={Boolean(form.is_closed)}
                      onChange={(e) =>
                        setF(
                          "is_closed",
                          e.target.checked as unknown as boolean
                        )
                      }
                    />
                    <label htmlFor="is_closed" className="text-sm">
                      Clôturer l’entretien
                    </label>
                  </div>
                </div>
              )}

              {/* ---- Save ---- */}
              <div className="flex justify-center">
                <button
                  onClick={handleSave}
                  className="text-white bg-[#376cad] hover:bg-[#1c4679] p-3 rounded-full shadow"
                >
                  <FaSave className="text-xl" />
                </button>
              </div>
            </>
          )}
        </div>
      </>
    </PageLayout>
  );
}
