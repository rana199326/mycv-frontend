import { useEffect, useState } from "react";
import { useApi } from "@hooks/useApi";
import { languageService } from "../../services/languageService";
import { Language, LanguageLevelName } from "../../types/Language";

// UI level in this page uses 1..4 (as string) to match other pages
export type UiLangLevel = "1" | "2" | "3" | "4";
export type UILanguage = { id: number; name: string; level: UiLangLevel };

// Convert backend text enum -> UI "1" | "2" | "3" | "4"
const langLevelTextToUi = (level: LanguageLevelName): UiLangLevel => {
  switch (level) {
    case "BEGINNER": return "1";
    case "INTERMEDIATE": return "2";
    case "ADVANCED": return "3";
    case "EXPERT": return "4";
    default: return "1";
  }
};

// Convert UI "1" | "2" | "3" | "4" -> backend text enum
const uiToLangLevelText = (ui: UiLangLevel): LanguageLevelName => {
  const n = Number(ui);
  switch (n) {
    case 1: return "BEGINNER";
    case 2: return "INTERMEDIATE";
    case 3: return "ADVANCED";
    case 4: return "EXPERT";
    default: return "BEGINNER";
  }
};

export const LanguageListViewModel = () => {
  const api = useApi();

  const [languages, setLanguages] = useState<UILanguage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Used by optional modals if you have them elsewhere
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [langToDelete, setLangToDelete] = useState<number | null>(null);

  // Load from API and normalize to UI type
  const loadLanguages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data: Language[] = await languageService.getAll(api);
      setLanguages(
        data.map((l) => ({
          id: l.id,
          name: l.name,
          level: langLevelTextToUi(l.level),
        }))
      );
    } catch (e) {
      console.error("Failed to load languages:", e);
      setError("Failed to load languages");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadLanguages(); }, []);

  // ---- CREATE (inline optimistic) ----
  const handleAddLanguage = async (newItem: {
    id: number; // temp id from UI, e.g. negative
    name: string;
    level: UiLangLevel;
    created_At?: Date;   // ignored by API
    profile_id?: number; // ignored by API
  }) => {
    // Optimistic append so the new item appears immediately (under existing list)
    setLanguages((prev) => [...prev, { id: newItem.id, name: newItem.name, level: newItem.level }]);

    try {
      await languageService.create(
        { name: newItem.name.trim(), level: uiToLangLevelText(newItem.level) },
        api
      );
      await loadLanguages(); // re-sync to get real id/order
    } catch (e) {
      console.error("Create language failed:", e);
      setError("Failed to create language");
      // rollback optimistic append
      setLanguages((prev) => prev.filter((l) => l.id !== newItem.id));
    }
  };

  // ---- UPDATE (inline by object) ----
  const handleUpdateLanguage = async (
    id: number,
    updated: { id: number; name: string; level: UiLangLevel }
  ) => {
    // Optimistic in-place update
    setLanguages((prev) => prev.map((l) => (l.id === id ? { ...l, ...updated } : l)));

    try {
      await languageService.update(
        id,
        { name: updated.name.trim(), level: uiToLangLevelText(updated.level) },
        api
      );
      // Keep optimistic state; call loadLanguages() if you need server normalization.
    } catch (e) {
      console.error("Update language failed:", e);
      setError("Failed to save language");
      await loadLanguages(); // rollback to server truth
    }
  };

  // ---- DELETE ----
  const deleteLanguageNow = async (id: number) => {
    const snapshot = languages;
    setLanguages((prev) => prev.filter((l) => l.id !== id)); // optimistic remove
    try {
      await languageService.remove(id, api);
    } catch (e) {
      console.error("Delete language failed:", e);
      setError("Failed to delete language");
      setLanguages(snapshot); // rollback
    }
  };

  const handleDeleteClick = (id: number) => {
    setLangToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (langToDelete == null) return;
    await deleteLanguageNow(langToDelete);
    setIsDeleteModalOpen(false);
    setLangToDelete(null);
  };

  return {
    // data
    languages, isLoading, error,

    // actions
    handleAddLanguage,
    handleUpdateLanguage,
    deleteLanguageNow,
    loadLanguages,

    // optional modal delete flow
    isDeleteModalOpen, setIsDeleteModalOpen,
    handleDeleteClick, handleConfirmDelete,
  };
};
