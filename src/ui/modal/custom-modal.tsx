import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface CustomModalProps {
  aceptText: string;
  cancelText?: string;
  onAcept?: () => any;
  onCancel?: () => any;
  open: boolean;
  title?: string;
  description?: string;
}

export default function CustomModal({
  aceptText,
  cancelText = 'Cancelar',
  onAcept,
  onCancel,
  open,
  title = 'Confirmación',
  description = '¿Estás seguro que deseas continuar?',
}: CustomModalProps) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCancel ?? (() => {})}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/35" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl">
              <Dialog.Title className="text-lg font-medium text-gray-900">
                {title}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-gray-600">
                {description}
              </Dialog.Description>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={onAcept}
                  className="px-4 py-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600"
                >
                  {aceptText}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
