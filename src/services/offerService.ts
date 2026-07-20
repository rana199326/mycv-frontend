import { Offer } from '../types/Offer';
import {offerData} from '@data/offerData'
// Simuler une API


export const offerService = {
  getOffer: async (): Promise<Offer[]> => {
    // Simuler un appel API
    return new Promise((resolve) => {
      setTimeout(() => resolve(offerData), 500);
    });
  },

  getOfferById: async (id: number): Promise<Offer | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const offer = offerData.find(u => u.id === id);
        resolve(offer);
      }, 500);
    });
  },

  createOffer: async (offer: Omit<Offer, "id" | "created_At">): Promise<Offer> => {
    const newoffer: Offer = {
      id: Math.max(...offerData.map(u => u.id)) + 1,
      ...offer,
      created_At: new Date()
    };
    offerData.push(newoffer);
    return new Promise(resolve => setTimeout(() => resolve(newoffer), 500));
  },

  updateOffer: async (id: number, offer: Offer): Promise<Offer> => {
    const index = offerData.findIndex(u => u.id === id);
    if (index === -1) throw new Error('offer not found');

    const updatedoffer = { ...offerData[index], ...offer };
    offerData[index] = updatedoffer;
    return new Promise(resolve => setTimeout(() => resolve(updatedoffer), 500));
  },

  deleteOffer: async (id: number): Promise<void> => {
    const index = offerData.findIndex(u => u.id === id);
    if (index !== -1) {
      offerData.splice(index, 1);
    }
    return new Promise(resolve => setTimeout(resolve, 500));
  }
};