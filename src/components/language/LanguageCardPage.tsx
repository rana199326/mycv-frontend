import { useState } from "react";
import { Star, Pencil } from "lucide-react";   
import { LevelCategory } from "../../types/Level";
import { UILanguage } from "@pages/languageListPage/LanguageListViewModel";

type LanguageCardProps = {
  language: UILanguage;
  index: number;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onLevelChange?: (id: number, level: LevelCategory) => void;
};

export const LanguageCard = ({
  language,
  index,
  onView,
  onEdit,
  onDelete,
  onLevelChange,
}: LanguageCardProps) => {
  const [level, setLevel] = useState<LevelCategory>(
    (language.level as LevelCategory) ?? "1"
  );

  const handleStarClick = (id: number, newLevel: number) => {
    const converted = String(newLevel) as LevelCategory;
    setLevel(converted);
    onLevelChange?.(id, converted);
  };

  const idNum = Number(language.id);

  return (
    <div className="bg-white rounded-lg shadow p-3 mb-2">
      {/* Top row */}
      <div className="flex items-center justify-between gap-3">
        {/* Left: name + stars */}
        <div className="min-w-0 pr-2">
          <h3 className="text-sm font-medium text-gray-800 truncate">
            {language.name || "—"}
          </h3>

          <div className="mt-1 inline-flex items-center gap-1 leading-none">
            {[1, 2, 3, 4].map((star) => {
              const filled = star <= Number(level);
              return (
                <button
                  key={star}
                  onClick={() => handleStarClick(idNum, star)}
                  className="focus:outline-none"
                  aria-label={`Set level ${star}`}
                >
                  <Star
                    className={`w-5 h-5 ${filled ? "text-[#d7b96d] " : "text-gray-300"}`}
                    fill={filled ? "currentColor" : "none"}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 shrink-0">
          {onDelete && (
            <button
              onClick={() => onDelete(idNum)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 transition-colors"
              aria-label="Delete language"
              title="Delete"
            >
              <svg
                className="w-5 h-5 text-gray-600 hover:text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}

          {onEdit && (
            <button
              onClick={() => onEdit(idNum)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Edit language"
              title="Edit"
            >
              <Pencil className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {onView && (
            <button
              onClick={() => onView(idNum)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="View language"
              title="View"
            >
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
