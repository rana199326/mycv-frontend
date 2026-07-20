// src/viewModels/SkillListViewModel.ts
import { useEffect, useState } from "react";
import { useApi } from "@hooks/useApi";
import { skillService } from "../../services/skillService";
import { SkillLevelName } from "src/types/Skill";

type UISkill = { id: number; name: string; level: SkillLevelName };

export const SkillListViewModel = () => {
  const api = useApi();

  // data
  const [skill, setSkill] = useState<UISkill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // (optional) legacy modal states kept for compatibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [formStars, setFormStars] = useState<1 | 2 | 3 | 4>(1);
  const [skillToDelete, setSkillToDelete] = useState<number | null>(null);

  // normalize server data to UI type
 const normalize = (data: Array<{ id: number; name: string; level: string }>): UISkill[] =>
  data.map((d) => ({
    id: d.id,
    name: d.name,
    level: d.level as SkillLevelName,
    
  }));

  // load list
  const loadSkills = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await skillService.getSkill(api);
      setSkill(normalize(data));
    } catch (e) {
      console.error("Failed to load skills:", e);
      setError("Failed to load skills");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  // ---- CREATE (optimistic) ----
  const handleAddSkill = async (skillData: { id: number; name: string; level: SkillLevelName }) => {
  setSkill((prev) => [...prev, skillData]);
  try {
    await skillService.createSkill({ id: 0, name: skillData.name.trim(), level: skillData.level }, api);
    await loadSkills();
  } catch (e) {
    setSkill((prev) => prev.filter((s) => s.id !== skillData.id));
    setError("Failed to create skill");
  }
};

  // ---- UPDATE (by object, optimistic) ----
  const handleUpdateSkill = async (id: number, s: { id: number; name: string; level: SkillLevelName }) => {
  const snapshot = [...skill];
  setSkill((prev) => prev.map((it) => (it.id === id ? { ...it, ...s } : it)));
  try {
    await skillService.updateSkill(id, { id: 0, name: s.name.trim(), level: s.level }, api);
  } catch (e) {
    setSkill(snapshot);
    setError("Failed to save skill");
  }
};

  // ---- DELETE (optimistic) ----
  const deleteSkillNow = async (id: number) => {
    const snapshot = [...skill];
    setSkill((prev) => prev.filter((s) => s.id !== id));
    try {
      await skillService.deleteSkill(id, api);
    } catch (e) {
      console.error("Failed to delete skill:", e);
      setError("Failed to delete skill");
      setSkill(snapshot);
    }
  };

  // (optional) legacy modal helpers
  const openEdit = (s: { id: number; name: string; level: string }) => {
    setEditingId(s.id);
    setFormName(s.name);
    // map string level "1" | "2" | "3" | "4" to numeric stars
    const num = (Number(s.level) || 1) as 1 | 2 | 3 | 4;
    setFormStars(num);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setSkillToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (skillToDelete == null) return;
    await deleteSkillNow(skillToDelete);
    setIsDeleteModalOpen(false);
    setSkillToDelete(null);
  };

  return {
    // data
    skill,
    isLoading,
    error,

    // actions
    handleAddSkill,
    handleUpdateSkill,
    deleteSkillNow,

    // optional modal states & helpers
    isModalOpen,
    setIsModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    editingId,
    formName,
    setFormName,
    formStars,
    setFormStars,
    openEdit,
    handleDeleteClick,
    handleConfirmDelete,
  };
};
