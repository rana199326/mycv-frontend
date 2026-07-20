import { Offer } from "src/types/Offer";

type OfferCardProps = {
  offer: Offer;
  index: number;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  showNameLabel?: boolean;
  showCountryLabel?: boolean;
};

export const OfferCard = ({
  offer,
  index,
  onView,
  onEdit,
  onDelete,
  showNameLabel = false,
  showCountryLabel = false,
}: OfferCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-1 space-y-2">
      {/* Header avec nom et statut */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Offer*/}
          <div>
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                {index === 0 ? "" : offer?.website ? `Offre : ${offer.website}`: "Chargement..."}
              </h3>
              {offer?.created_At && (
                <p className="text-sm text-gray-500">
                  {new Date(offer.created_At).toLocaleDateString("fr-FR")}
                </p>
              )}
              <p className="text-sm text-gray-500">
                {showCountryLabel && (
                  <span className="font-semibold">Lieu : </span>
                )}
                {index === 0 ? "" : offer?.position ?? "Chargement..."}
              </p>
            </div>
          </div>
        </div>

        {/* Status Badge */}

        {/* Actions */}
        <div className="flex itemns-center space-x-1 ml-auto">
          {onDelete && (
            <button
              onClick={() => onDelete(offer.id)}
              className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 transition-colors"
              aria-label="Delete offer"
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
          {onEdit && (
            <button
              onClick={() => onEdit(offer?.id ?? 0)}
              className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Edit offer"
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
          {/* Affichage conditionnel du bouton Edit */}
          {onView && (
            <button
              onClick={() => onView(offer.id)}
              className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="View offer"
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
