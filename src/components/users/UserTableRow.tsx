import { User } from '../../types/User';

interface UserTableRowProps {
  user: User;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const UserTableRow = ({ user, onEdit, onDelete }: UserTableRowProps) => {
  const getStatusBadgeColor = (status: User['status']) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const getRoleBadgeColor = (role: User['role']) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-800';
      case 'Editor': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
        <div className="flex items-center">
          <div>
            <div className="font-medium text-gray-900">{user.name}</div>
            <div className="text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {user.title}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {user.department}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm">
        <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${getStatusBadgeColor(user.status)}`}>
          {user.status}
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm">
        <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${getRoleBadgeColor(user.role)}`}>
          {user.role}
        </span>
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <button
          onClick={() => onEdit(user.id)}
          className="text-indigo-600 hover:text-indigo-900 mr-4"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
