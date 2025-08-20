import Button from './button';

type ConfirmDeleteModalProps = {
  onCancel: () => void;
  onDelete: () => void;
  selectedCount?: number;
};

export default function ConfirmDeleteModal(props: ConfirmDeleteModalProps) {
  const selectedCount = props.selectedCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {props.selectedCount && props.selectedCount > 1
              ? 'Confirm Delete Products'
              : 'Confirm Delete Product'}
          </h2>

          <button
            type="button"
            onClick={props.onCancel}
            className="text-gray-400 hover:text-gray-700 transition-transform active:scale-95"
          >
            x
          </button>
        </div>

        <hr className="border-t border-gray-200" />

        <div className="p-6 text-lg font-medium text-gray-500">
          {props.selectedCount && props.selectedCount > 1
            ? `Are you sure you want to delete these ${selectedCount} products?`
            : ' Are you sure you want to delete this product?'}
        </div>

        <div className="flex w-full items-center justify-between p-4 g-2">
          <Button
            label="Cancel"
            onClick={props.onCancel}
            className="bg-white text-gray-600 border border-gray-200 px-4 py-2 rounded-lg"
          />
          <Button
            label="Delete"
            onClick={props.onDelete}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm bg-red-400 hover:bg-red-300 text-white font-medium w-2xs"
          />
        </div>
      </div>
    </div>
  );
}
