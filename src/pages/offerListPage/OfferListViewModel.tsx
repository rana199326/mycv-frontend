import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Offer } from "../../types/Offer";
import { offerService } from "../../services/offerService";

export const OfferListViewModel = () => {
  const navigate = useNavigate();
  const [offer, setOffer] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Nouveaux états pour la modal de suppression
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState<number | null>(
    null
  );

  // Chargement initial des données
  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await offerService.getOffer();
      setOffer(data);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to load offers");
      setIsLoading(false);
    }
  };

  const handleAddOffer = async (offerData: Offer) => {
    try {
      const newOffer = await offerService.createOffer(
        offerData
      );
      setOffer([...offer, newOffer]);
      setIsModalOpen(false); // Ferme la modal après création
    } catch (err) {
      setError("Failed to create offer");
      console.error("Failed to add offer:", err);
    }
  };

  const handleView = (offerId: number) => {
    navigate(`/offer/${offerId}`);
  };

  const handleEdit = (offerId: number) => {
    navigate(`/offer/${offerId}/edit`);
  };

  // Nouvelle méthode pour ouvrir la modal de suppression
  const handleDeleteClick = (offerId: number) => {
    setOfferToDelete(offerId);
    setIsDeleteModalOpen(true);
  };

  // Nouvelle méthode pour confirmer la suppression
  const handleConfirmDelete = async () => {
    if (offerToDelete) {
      try {
        await offerService.deleteOffer(offerToDelete);
        setOffer(
          offer.filter((exp) => exp.id !== offerToDelete)
        );
        setIsDeleteModalOpen(false);
        setOfferToDelete(null);
      } catch (err) {
        setError("Failed to delete offer");
        console.error("Failed to delete offer:", err);
      }
    }
  };

  return {
    // États
    offer,
    isLoading,
    error,
    isModalOpen,
    // Actions
    setIsModalOpen,
    handleAddOffer,
    handleView,
    handleEdit,
    handleDeleteClick,
    handleConfirmDelete,
    setIsDeleteModalOpen,
    isDeleteModalOpen,
  };
};
