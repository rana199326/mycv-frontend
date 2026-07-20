import { Experience } from "src/types/Experience";

type ExperienceCardProps = {
  experience: Experience;
  index: number;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export const ExperienceCard = ({
  experience,
  index,
  onView,
  onEdit,
  onDelete,
}: ExperienceCardProps) => {
  const isCreating = experience.id === 0;
  // ...
  return (
    <div className="bg-white rounded-lg shadow p-1 mb-2 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            {!isCreating && (
              <>
                <h3 className="text-sm font-medium text-gray-800">
                  {`Expérience n°${index + 1}`}
                </h3>
                <p className="text-sm text-gray-500">{experience.name}</p>
              </>
            )}
            {/* isCreating && <p className="text-sm text-gray-500">Nouvelle expérience</p> */}
          </div>
        </div>

        {/* Status Badge */}

        {/* Actions */}
        <div className="flex itemns-center space-x-3">
          {onDelete && (
            <button
              onClick={() => onDelete(experience.id)}
              className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 transition-colors"
              aria-label="Delete experience"
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

          {/* Affichage conditionnel du bouton View */}
          {onView && (
            <button
              onClick={() => onView(experience.id)}
              className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="View experience"
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
          {/* Affichage conditionnel du bouton Edit */}
          {onEdit && (
            <button
              onClick={() => onEdit(experience.id)}
              className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Edit experience"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
