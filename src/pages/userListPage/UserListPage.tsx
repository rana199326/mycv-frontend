// src/pages/UserListPage.tsx
import { UserListViewModel } from './UserListViewModel';
import { Header } from '@components/layout/Header';
import { AddUserModal } from '@components/users/AddUserModal';
import { DeleteConfirmationModal } from '@components/feedBack/DeleteConfirmationModal';
import { UserTable } from '@components/users/UserTable';
import { UserCard } from '@components/users/UserCardPage';

export const UserListPage = () => {
  const {
    users,
    isLoading,
    error,
    isModalOpen,
    isDeleteModalOpen,
    setIsModalOpen,
    handleAddUser,
    handleEdit,
    handleDeleteClick,
    handleConfirmDelete,
    setIsDeleteModalOpen
  } = UserListViewModel();


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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
      <div className="sm:flex sm:items-center sm:justify-between">
        <Header 
          title="Users List"
          description="Manage your team members and their account permissions here."
        />
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add User
          </button>
        </div>
      </div>
      <div>
        {/* Mobile: Cards View */}
        <div className="md:hidden grid gap-4">
          {users.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>

        {/* Desktop: Table View */}
        <div className="hidden md:block">
          <UserTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      {/* Modals */}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>

      
  
  );
};
