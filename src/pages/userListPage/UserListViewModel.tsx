// src/viewModels/UserViewModel.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserFormData } from '@types/User';
import { userService } from '@services/userService';

export const UserListViewModel = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Nouveaux états pour la modal de suppression
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  
  // Chargement initial des données
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await userService.getUsers();
      setUsers(data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load users');
      setIsLoading(false);
    }
  };

  const handleAddUser = async (userData: UserFormData) => {
    try {
      const newUser = await userService.createUser(userData);
      setUsers([...users, newUser]);
      setIsModalOpen(false); // Ferme la modal après création
    } catch (err) {
      setError('Failed to create user');
      console.error('Failed to add user:', err);
    }
  };

  const handleEdit = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  // Nouvelle méthode pour ouvrir la modal de suppression
  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  // Nouvelle méthode pour confirmer la suppression
  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await userService.deleteUser(userToDelete);
        setUsers(users.filter(user => user.id !== userToDelete));
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
      } catch (err) {
        setError('Failed to delete user');
        console.error('Failed to delete user:', err);
      }
    }
  };

  return {
    // États
    users,
    isLoading,
    error,
    isModalOpen,
    // Actions
    setIsModalOpen,
    handleAddUser,
    handleEdit,
    handleDeleteClick,
    handleConfirmDelete,
    setIsDeleteModalOpen,
    isDeleteModalOpen
  };
};
