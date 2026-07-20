import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import PageLayout from "@components/layout/PageLayout";


type School = { id: number; name: string };

export default function EditEducation() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [schools, setSchools] = useState<School[]>([]);
  const [form, setForm] = useState({
    name: "",
    status: "",
    level: "",               // String
    graduation_date: "",     // "YYYY-MM-DD"
    schoolId: "",            // select value
  });
  const [saving, setSaving] = useState(false);

  // load schools + education(if edit)
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/school", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json()).then(setSchools).catch(() => alert("Erreur chargement écoles"));

    if (id) {
      fetch(`http://localhost:3000/education/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((data) =>
          setForm({
            name: data.name ?? "",
            status: data.status ?? "",
            level: data.level ?? "",
            graduation_date: data.graduation_date ? String(data.graduation_date).slice(0, 10) : "",
            schoolId: data.school_id ? String(data.school_id) : "",
          })
        )
        .catch(() => alert("Erreur chargement formation"));
    }
  }, [id]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) return alert("Intitulé requis.");
    if (!form.schoolId || form.schoolId === "add-new") return alert("Choisir une école.");
    if (!form.graduation_date) return alert("Date d'obtention requise.");

    const token = localStorage.getItem("token");
    const payload = {
      name: form.name.trim(),
      status: form.status.trim(),
      level: form.level.trim(),                 // String
      graduation_date: form.graduation_date,    // String
      school_id: Number(form.schoolId),         // Number
      profile_id: 1,                          
    };

    try {
      setSaving(true);
      const res = await fetch(`http://localhost:3000/education${id ? `/${id}` : ""}`, {
        method: id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token ?? ""}` },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      if (!res.ok) return alert(`Erreur ${res.status}\n${text || ""}`);

      navigate("/education-list");
    } catch {
      alert("Erreur lors de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  return (
   <PageLayout>
    <>
    {/* Header */}
         <div className="bg-[#376cad] text-white p-3 rounded-t m-3 text-center">
        <h1 className="text-xl font-bold">Formation</h1>
      </div>

      {/* School */}
      <div className="flex items-center gap-2 mb-2 p-4">
        <label className="w-24 font-semibold">École :</label>
        <select
          name="schoolId"
          value={form.schoolId}
          onChange={(e) => {
            if (e.target.value === "add-new") return navigate("/edit-school");
            onChange(e);
          }}
          className="flex-1 border rounded p-1 text-sm"
        >
          <option value="">-- Choisir une école --</option>
          {schools.map((s) => (
            <option key={s.id} value={s.id.toString()}>{s.name}</option>
          ))}
          <option value="add-new">➕ Ajouter une école…</option>
        </select>
      </div>

      {/* Intitulé */}
      <div className="flex items-center gap-2 mb-2 p-4">
        <label className="w-24 font-semibold">Intitulé :</label>
        <input name="name" type="text" className="flex-1 border rounded p-1 text-sm"
          placeholder="Licence en Informatique" value={form.name} onChange={onChange}/>
      </div>

      {/* Statut */}
      <div className="flex items-center gap-2 mb-2 p-4">
        <label className="w-24 font-semibold">Statut :</label>
        <input name="status" type="text" className="flex-1 border rounded p-1 text-sm"
          placeholder="Diplômé / En cours" value={form.status} onChange={onChange}/>
      </div>

      {/* Niveau (string) */}
      <div className="flex items-center gap-2 mb-2 p-4">
        <label className="w-24 font-semibold">Niveau :</label>
        <input name="level" type="text" className="flex-1 border rounded p-1 text-sm"
          placeholder="Licence, Master, Bac+2…" value={form.level} onChange={onChange}/>
      </div>

      {/* Date obtention */}
      <div className="flex items-center gap-2 mb-2 p-4">
        <label className="w-24 font-semibold">Date obtention :</label>
        <input name="graduation_date" type="date" className="flex-1 border rounded p-1 text-sm"
          value={form.graduation_date} onChange={onChange}/>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="text-white bg-[#376cad] hover:bg-[#1c4679] p-3 rounded-full shadow"
        >
          <FaSave className="text-xl" />
        </button>
      </div>
    </>
    </PageLayout>
  );
}
