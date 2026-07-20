import { useState } from "react";
import {
  LanguageListViewModel,
  UiLangLevel,
} from "../languageListPage/LanguageListViewModel";
import { LanguageCard } from "../../components/language/LanguageCardPage"; // same API as SkillCard
import { LanguageEditRow } from "../../components/language/LanguageEditRow"; // same API as SkillEditRow
import PageLayout from "@components/layout/PageLayout";
import { AiOutlinePlus } from "react-icons/ai";
import { ConfirmModal } from "@components/common/ConfirmModal"; // common confirmation modal
export const LanguageListPage = () => {
  const {
    languages,
    isLoading,
    error,
    handleAddLanguage,
    handleUpdateLanguage,
    deleteLanguageNow,
  } = LanguageListViewModel();

  const [editingLanguage, setEditingLanguage] = useState<{
    id: number;
    name: string;
    level: UiLangLevel;
  } | null>(null);
  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    message: string;
    onConfirm: () => void;
  } | null>(null);
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <PageLayout>
      <>
        <div className="w-full">
          <div className="bg-[#376cad] text-white p-3 rounded-t m-3 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Langues</h2>

            {/* Add button: opens inline row for a NEW language */}
            <div className="ml-4 self-center">
              <button
                onClick={() =>
                  setEditingLanguage({ id: -1, name: "", level: "1" })
                }
                className="bg-[#f5dab4] hover:bg-[#d9c9a1] p-2 rounded-full"
              >
                <AiOutlinePlus size={22} />
              </button>
            </div>
          </div>

          <div className="border-b border-gray-200 mb-6" />

          {/* Mobile cards */}
          <div className="md:hidden grid gap-4">
            {languages.map((l, index) => (
              <div key={l.id} className="relative">
                <LanguageCard
                  language={l}
                  index={index}
                  onEdit={(id) =>
                    setEditingLanguage({ id, name: l.name, level: l.level })
                  }
                  onDelete={(id) =>
                    setConfirmState({
                      open: true,
                      message: "Voulez-vous vraiment supprimer cette langue ?",
                      onConfirm: () => deleteLanguageNow(id),
                    })
                  }
                  onLevelChange={(id, newLevel) =>
                    handleUpdateLanguage(id, { ...l, level: newLevel })
                  }
                />
              </div>
            ))}
          </div>

          {/* Desktop list + actions */}
          <div className="hidden md:block space-y-3">
            {languages.map((l, index) => (
              <div key={l.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <LanguageCard
                    language={l}
                    index={index}
                    onEdit={(id) =>
                      setEditingLanguage({ id, name: l.name, level: l.level })
                    }
                    onDelete={(id) =>
                      setConfirmState({
                        open: true,
                        message:
                          "Voulez-vous vraiment supprimer cette langue ?",
                        onConfirm: () => deleteLanguageNow(id),
                      })
                    }
                    onLevelChange={(id, level) =>
                      handleUpdateLanguage(id, { ...l, level })
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Inline editor row for Add & Edit */}
          {editingLanguage && (
            <LanguageEditRow
              language={editingLanguage}
              onChange={(u) => setEditingLanguage(u)}
              onSave={(u) => {
                if (u.id < 0) {
                  // create then close
                  handleAddLanguage({
                    id: u.id,
                    name: u.name,
                    level: u.level,
                    created_At: new Date(),
                    profile_id: 1,
                  });
                } else {
                  handleUpdateLanguage(u.id, u);
                }
                setEditingLanguage(null);
              }}
              onCancel={() => setEditingLanguage(null)}
            />
          )}
        </div>
      </>
      {confirmState?.open && (
        <ConfirmModal
          message={confirmState.message}
          onConfirm={() => {
            confirmState.onConfirm();
            setConfirmState(null);
          }}
          onCancel={() => setConfirmState(null)}
        />
      )}
    </PageLayout>
  );
};
