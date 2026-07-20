import { LevelCategory } from "src/types/Level";

type LanguageEditRowProps = {
  language: { id: number; name: string; level: LevelCategory };
  onChange: (language: {
    id: number;
    name: string;
    level: LevelCategory;
  }) => void;
  onSave: (language: {
    id: number;
    name: string;
    level: LevelCategory;
  }) => void;
  onCancel: () => void;
};

export const LanguageEditRow = ({
  language,
  onChange,
  onSave,
  onCancel,
}: LanguageEditRowProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-3 mb-2 flex flex-col md:flex-row md:items-center md:justify-between">
      <input
        type="text"
        value={language.name}
        onChange={(e) => onChange({ ...language, name: e.target.value })}
        placeholder="Compétence"
        className="border p-1 rounded w-full md:w-1/3"
      />

      <div className="flex space-x-1 mt-2 md:mt-0">
        {[1, 2, 3, 4].map((star) => (
          <button
            key={star}
            onClick={() =>
              onChange({ ...language, level: star.toString() as LevelCategory })
            }
            className="focus:outline-none"
          >
            <svg
              className={`w-5 h-5 ${
                star <= Number(language.level)
                  ? "text-[#fdd46c]"
                  : "text-gray-300"
              }`}
              fill={star <= Number(language.level) ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          </button>
        ))}
      </div>

      <div className="flex space-x-2 mt-2 md:mt-0">
        <button
          onClick={() => onSave(language)}
          className="bg-[#376cad] text-white px-2 py-1 rounded"
        >
          Enregistrer
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-black px-2 py-1 rounded"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};
