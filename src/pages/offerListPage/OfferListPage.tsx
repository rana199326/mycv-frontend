import { OfferListViewModel } from "./OfferListViewModel";
import { Header } from "@components/layout/Header";
import { OfferCard } from "../../components/offer/OfferCardPage";
import Button from "@components/ui/globals/Button";

export const OfferListPage = () => {
  const {
    offer,
    isLoading,
    error,
    isModalOpen,
    isDeleteModalOpen,
    setIsModalOpen,
    handleAddOffer,
    handleView,
    handleEdit,
    handleDeleteClick,
    handleConfirmDelete,
    setIsDeleteModalOpen,
  } = OfferListViewModel();

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
    <div className="w-full min-h-screen px-2.5 py-10 flex flex-col items-start justify-start">
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <Header title="Offres" description="" />
          <div className="ml-4 self-center">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="beige"
              icon={true}
              size="lg"
              borderRadius="full"
            />
          </div>
        </div>
        {/* Trait séparateur descendu de 2mm */}
        <div className="border-b border-gray-200 mb-6" />
        <div>
          {/* Mobile: Cards View */}
          <div className="md:hidden grid gap-4">
            {offer.map((offer, index) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                index={index+1}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          {/* Desktop: Table View */}
          <div className="hidden md:block">
            {offer.map((offer, index) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                index={index+1}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/*       Modals
      <AddOfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddOffer}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      /> */}
    </div>
  );
};
