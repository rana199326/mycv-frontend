import { User, UserFormData } from '../types/User';
import {userData} from '@data/userData'
// Simuler une API


export const userService = {
  getUsers: async (): Promise<User[]> => {
    // Simuler un appel API
    return new Promise((resolve) => {
      setTimeout(() => resolve(userData), 500);
    });
  },

  getUserById: async (id: number): Promise<User | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = userData.find(u => u.id === id);
        resolve(user);
      }, 500);
    });
  },

  createUser: async (user: UserFormData): Promise<User> => {
    const newUser: User = {
      id: Math.max(...userData.map(u => u.id)) + 1,
      ...user,
      status: 'Active',
      lastLogin: new Date().toISOString()
    };
    userData.push(newUser);
    return new Promise(resolve => setTimeout(() => resolve(newUser), 500));
  },

  updateUser: async (id: number, user: UserFormData): Promise<User> => {
    const index = userData.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');

    const updatedUser = { ...userData[index], ...user };
    userData[index] = updatedUser;
    return new Promise(resolve => setTimeout(() => resolve(updatedUser), 500));
  },

  deleteUser: async (id: number): Promise<void> => {
    const index = userData.findIndex(u => u.id === id);
    if (index !== -1) {
      userData.splice(index, 1);
    }
    return new Promise(resolve => setTimeout(resolve, 500));
  }
};
