import { useSoftDeleteUser } from "@/hooks/soft-delete-user.hook";
import { useUserStore } from "@/stores/user-store";
import CustomModal from "@/ui/modal/custom-modal";
import toast from "react-hot-toast";

export default function DeleteUser() {
  const { userId } = useUserStore();
  const { mutateAsync } = useSoftDeleteUser();
  const { deleteOpen, closeDelete } = useUserStore();

  const deleteUser = async () => {
    if (!userId) {
      return;
    }

    await toast.promise(mutateAsync(userId), {
      loading: "Eliminando...",
      success: "Usuario eliminado",
      error: (err) => `Error: ${err.message}`,
    });

    closeDelete();
  };

  return (
    <div>
      <CustomModal
        aceptText="Eliminar"
        open={deleteOpen}
        description="¿Estas seguro de eliminar este usuario? Esta accion no se podrá revertir."
        onAcept={() => deleteUser()}
        onCancel={() => closeDelete()}
      />
    </div>
  );
}
