import { useState } from "react";
import { Pencil, Star, Trash2 } from "lucide-react";
import {
  SkillPayload,
  SkillLevelName,
  starsToLevel,
  levelToStars,   
} from "src/types/Skill";

type Props = {
  skill: SkillPayload;
  index: number;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onLevelChange?: (id: number, level: SkillLevelName) => void;
};

export const SkillCard = ({
  skill,
  index,
  onView,
  onEdit,
  onDelete,
  onLevelChange,
}: Props) => {
  const [level, setLevel] = useState<SkillLevelName>(skill.level);
  const idNum = Number(skill.id);

  const handleStarClick = (id: number, newStars: number) => {
    const newLevel = starsToLevel(newStars); // 1..4 -> 'BEGINNER'...
    setLevel(newLevel);
    onLevelChange?.(id, newLevel);
  };

  return (
    <div className="bg-white rounded-lg shadow p-3 mb-2">
      <div className="flex items-center justify-between gap-3">
        {/* left */}
        <div className="min-w-0 pr-2">
          <h3 className="text-sm font-medium text-gray-800 truncate">
            {skill.name || "—"}
          </h3>

          <div className="mt-1 inline-flex items-center gap-1 leading-none">
            {[1, 2, 3, 4].map((star) => {
              const filled = star <= levelToStars(level); 
              return (
                <button
                  key={star}
                  onClick={() => handleStarClick(idNum, star)}
                  className="focus:outline-none"
                  aria-label={`Set level ${star}`}
                >
                  <Star
                    className={`w-5 h-5 ${
                      filled ? "text-[#d7b96d]" : "text-gray-300"
                    }`}
                    fill={filled ? "currentColor" : "none"}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* right actions */}
        <div className="flex items-center gap-2 shrink-0">
          

          {onEdit && (
            <button
              onClick={() => onEdit(idNum)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
              aria-label="Edit skill"
              title="Modifier"
            >
              <Pencil className="w-5 h-5 text-gray-600 hover:text-blue-600" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(idNum)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 transition-colors"
              aria-label="Delete skill"
              title="Supprimer"
            >
              <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-600" />

            </button>
          )}

          {onView && (
            <button
              onClick={() => onView(idNum)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="View skill"
              title="Voir"
            >
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
