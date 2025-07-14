import { useUpdatePasswordUser } from "@/hooks/users/update-password-user.hook";
import { useUserStore } from "@/stores/user-store";
import { UpdatePasswordDTO } from "@/types/users/user.type";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";

export default function UpdateUserPassword() {
    const { userId, updatePassword, closeUpdatePassword } = useUserStore();
    const [password, setPassword] = useState<string>("");
    const { mutate } = useUpdatePasswordUser();
    if (!userId) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const body: UpdatePasswordDTO = {
            id: userId,
            password,
        };

        mutate(body, {
            onSuccess: () => {
                closeUpdatePassword();
                setPassword("");
                toast.success("Contraseña actualizada correctamente");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    };

    return (
        <Transition show={updatePassword} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                onClose={() => closeUpdatePassword()}
            >
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
                                Actualizar contraseña
                            </Dialog.Title>
                            <Dialog.Description className="mt-2 text-sm text-gray-600">
                                Se recomienda de 12 a 20 caracteres con letras, números y
                                símbolos.
                            </Dialog.Description>

                            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                <input
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    value={password}
                                    placeholder="Nueva contraseña"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />

                                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:ring focus:ring-orange-500"
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => closeUpdatePassword()}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring focus:ring-orange-500"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
