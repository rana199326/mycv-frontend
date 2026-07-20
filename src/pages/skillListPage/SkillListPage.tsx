import { SkillListViewModel } from "./SkillListViewModel";
import { SkillCard } from "../../components/skill/SkillCardPage";
import { useState } from "react";
import { SkillEditRow } from "../../components/skill/SkillEditRow";
import { SkillLevelName } from "../../types/Skill";
import { AiOutlinePlus } from "react-icons/ai";
import PageLayout from "@components/layout/PageLayout";
import { ConfirmModal } from "@components/common/ConfirmModal";

export const SkillListPage = () => {
  const {
    // data & status
    skill,
    isLoading,
    error,

    // create/update/delete handlers
    handleAddSkill, // now creates optimistically
    handleUpdateSkill, // updates based on passed skill object
    deleteSkillNow, // immediate delete with API + refresh
  } = SkillListViewModel();

  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // Local edit row state (used for both add & edit inline)
  const [editingSkill, setEditingSkill] = useState<{
    id: number;
    name: string;
    level: SkillLevelName;
  } | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <PageLayout>
      <>
        <div className="w-full">
          <div className="bg-[#376cad] text-white p-3 rounded-t m-3 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Compétences</h2>

            {/* Add button: opens inline row for a new skill */}
            <div className="ml-4 self-center">
              <button
                onClick={() => {
                  // Open an empty edit row for NEW item
                  setEditingSkill({
                    id: -1,
                    name: "",
                    level: "1" as SkillLevelName,
                  });
                }}
                className="bg-[#f5dab4] hover:bg-[#d9c9a1] p-2 rounded-full"
              >
                <AiOutlinePlus size={22} />
              </button>
            </div>
          </div>

          {/* separator */}
          <div className="border-b border-gray-200 mb-6" />

          {/* Mobile cards */}
          <div className="md:hidden grid gap-4">
            {skill.map((s, index) => (
              <div key={s.id} className="relative">
                <SkillCard
                  skill={s}
                  index={index}
                  onEdit={(id) =>
                    setEditingSkill({ id, name: s.name, level: s.level })
                  }
                  onDelete={(id) =>
                    setConfirmState({
                      open: true,
                      message:
                        "Voulez-vous vraiment supprimer cette compétence ?",
                      onConfirm: () => deleteSkillNow(id),
                    })
                  }
                  onLevelChange={(id, level) =>
                    handleUpdateSkill(id, { ...s, level })
                  }
                />
              </div>
            ))}
          </div>

          {/* Desktop list + actions */}
          <div className="hidden md:block space-y-3">
            {skill.map((s, index) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <SkillCard
                    skill={s}
                    index={index}
                    onEdit={(id) =>
                      setEditingSkill({ id, name: s.name, level: s.level })
                    }
                    onDelete={(id) =>
                      setConfirmState({
                        open: true,
                        message:
                          "Voulez-vous vraiment supprimer cette compétence ?",
                        onConfirm: () => deleteSkillNow(id),
                      })
                    }
                    onLevelChange={(id, level) =>
                      handleUpdateSkill(id, { ...s, level })
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Edit/Delete compact actions */}
          {editingSkill && (
            <SkillEditRow
              skill={editingSkill}
              onChange={(u) => setEditingSkill(u)}
              onSave={(u) => {
                if (u.id < 0) {
                  // create then close
                  handleAddSkill({
                    id: u.id,
                    name: u.name,
                    level: u.level,
                  });
                } else {
                  handleUpdateSkill(u.id, u);
                }
                setEditingSkill(null);
              }}
              onCancel={() => setEditingSkill(null)}
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
