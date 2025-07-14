import { useState, useMemo } from "react";
import { useUserStore } from "@/stores/user-store";
import { usePaginateModules } from "@/hooks/modules/paginate-modules.hook";
import { GenericTable } from "@/components/shared/GenericTable";
import Loading from "../users/LoadingUsers";
import ErrorFetching from "../users/ErrorFetchingUsers";
import { Module } from "@/types/modules/module.type";
import { getModuleColumns } from "@/components/modules/getModuleColumns";
import Button from "@/components/shared/buttons/Button";
import { Save } from "lucide-react";
import CreateModuleForm from "@/components/modules/CreateModuleForm";
import FloatingModal from "@/components/modal/FloatingModal";
import toast from "react-hot-toast";
import { useCreateModule } from "@/hooks/modules/save-module.hook";
import {
  SaveModuleTemplate,
  UpdateModuleTemplate,
} from "@/types/modules/saveModule.type";
import EditModuleForm from "@/components/modules/EditModuleForm";
import { useEditModule } from "@/hooks/modules/edit-module.hook";
import { useDeleteModule } from "@/hooks/modules/delete-module.hook";
import { useNavigate } from "react-router-dom";

export default function ModulesTable() {

  const navigator = useNavigate()
  const { page, setPage } = useUserStore();
  const { data, isError, error, isFetching } = usePaginateModules();

  // ✅ Crear módulo
  const { mutateAsync: createModule } = useCreateModule();

  // ✅ Actualizar módulo
  const { mutateAsync: updateModule } = useEditModule();

  const { mutateAsync: deleteModule } = useDeleteModule();

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [formData, setFormData] = useState<UpdateModuleTemplate>({
    id: 0,
    isActive: false,
    name: "",
    webSocketRoom: "",
  });

  // ✅ Enviar creación
  const handleCreate = async (newModule: SaveModuleTemplate) => {
    try {
      await createModule(newModule);
      toast.success("Módulo creado exitosamente");
      setShowCreate(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // ✅ Enviar actualización
  const handleUpdate = async (module: UpdateModuleTemplate) => {
    setLoadingUpdate(true);
    try {
      if (module.webSocketRoom.split("").length === 0) throw new Error("Vacío");
      await updateModule(module);
      toast.success("Módulo actualizado exitosamente");
      setShowUpdate(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingUpdate(false);
    }
  };

  // ✅ Preparar formulario de edición
  const handleShowEdit = async (
    module: UpdateModuleTemplate
  ): Promise<void> => {
    setFormData(module);
    setLoadingUpdate(false);
    setShowUpdate(true);
  };

  // (Opcional) eliminar módulo
  const handleShowDelete = (module: Module) => {
    setShowDelete(true);
    setFormData(module);
  };

  const handleDelete = async () => {
    try {
      await deleteModule(formData.id);
      toast.success("Módulo eliminado exitosamente");
      setShowDelete(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const goToModuleConfig = ({id}: Module) =>{
    navigator(`configuration/${id}`)
  }

  const goToModulePage = ({webSocketRoom}: Module)=> {
    navigator(`/module/${webSocketRoom}`)
  }
  // 🧠 Columnas de la tabla
  const columns = useMemo(
    () =>
      getModuleColumns({ onEdit: handleShowEdit, onDelete: handleShowDelete , onConfig: goToModuleConfig, onShow:goToModulePage}),
    []
  );

  // 🌀 Estados de carga/errores
  if (isFetching) return <Loading />;
  if (isError) return <ErrorFetching error={error.message} />;

  return (
    <div className="min-h-screen w-full relative">
      <div className="w-full p-6 flex flex-row gap-4 items-center">
        <Button
          variant="success"
          rightIcon={Save}
          onClick={() => setShowCreate(true)}
        >
          Crear Módulo
        </Button>
      </div>

      {/* Modal de creación */}
      {showCreate && (
        <FloatingModal
          title="Nuevo Módulo"
          onClose={() => setShowCreate(false)}
        >
          <CreateModuleForm
            onSubmit={handleCreate}
            onCancel={() => setShowCreate(false)}
          />
        </FloatingModal>
      )}

      {showDelete && (
        <FloatingModal
          title="Nuevo Módulo"
          onClose={() => setShowDelete(false)}
        >
          <div>
            <p className="mb-3">¿Estás seguro de realizar esta acción?</p>
            <div className="flex space-x-2">
              <Button variant="danger" onClick={() => handleDelete()}>
                Eliminar
              </Button>
              <Button variant="ghost" onClick={() => setShowDelete(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </FloatingModal>
      )}

      {/* Modal de edición */}
      {showUpdate && (
        <FloatingModal
          title="Editar Módulo"
          onClose={() => setShowUpdate(false)}
        >
          <EditModuleForm
            loading={loadingUpdate}
            formData={formData}
            onSubmit={handleUpdate}
            onCancel={() => setShowUpdate(false)}
          />
        </FloatingModal>
      )}

      {/* Tabla principal */}
      <GenericTable
        data={data?.response.data || []}
        columns={columns}
        page={page}
        totalPages={data?.pagination.totalPages || 1}
        hasNextPage={data?.pagination.hasNextPage || false}
        hasPreviousPage={data?.pagination.hasPreviousPage || false}
        onPageChange={setPage}
        title="Gestión de Módulos"
        description="Administra los módulos IoT"
        emptyMessage="No se encontraron módulos en el sistema"
      />
    </div>
  );
}
