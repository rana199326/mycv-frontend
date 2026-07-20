export const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      {/* Header avec nom et statut */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* User Info */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.title}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`
            flex items-center px-2.5 py-1 rounded-full text-xs font-medium
            ${
              user.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }
          `}
        >
          <span
            className={`
              inline-block w-2 h-2 rounded-full mr-1
              ${user.status === "Active" ? "bg-green-400" : "bg-gray-400"}
            `}
          />
          {user.status}
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Department:</span> {user.department}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Role:</span> {user.role}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4 mt-4">
        <button
          onClick={() => onEdit(user.id)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Edit user"
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
        <button
          onClick={() => onDelete(user.id)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 transition-colors"
          aria-label="Delete user"
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
      </div>
    </div>
  );
};
