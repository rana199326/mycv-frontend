import { User } from '../../types/User';
import { UserTableHeader } from './UserTableHeader';
import { UserTableRow } from './UserTableRow';

interface UserTableProps {
  users: User[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <UserTableHeader />
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map((user) => (
                <UserTableRow 
                  key={user.id} 
                  user={user}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
