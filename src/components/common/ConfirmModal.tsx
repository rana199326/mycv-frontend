
type ConfirmModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-96 max-w-[90vw] rounded-2xl shadow-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">
          {message}
        </h2>

        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white shadow"
          >
            Oui
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 shadow"
          >
            Non
          </button>
        </div>
      </div>
    </div>
  );
};
