import CreateConfiguration from "@/components/configurations/create-configuration";
import { getConfigurationColumns } from "@/components/configurations/getConfigurationsColumns";
import UpdateConfiguration from "@/components/configurations/update-configuration";
import FloatingModal from "@/components/modal/FloatingModal";
import Button from "@/components/shared/buttons/Button";
import { GenericTable } from "@/components/shared/GenericTable";
import { useDeleteConfiguration } from "@/hooks/configurations/delete-configuration.hook";
import { usePaginateConfigurations } from "@/hooks/configurations/paginate-configurations.hook";
import { useCreateConfiguration } from "@/hooks/configurations/save.configuration.hook";
import { useUpdateConfiguration } from "@/hooks/configurations/update-configuration.hook";

import { useConfigurationStore } from "@/stores/configuration-store";
import {
  SaveConfigurationTemplate,
  UpdateConfigurationTemplate,
} from "@/types/configuration/configuration.type";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ConfigurationPage() {
  const { id: rawId } = useParams();
  const id = Number(rawId); // 🔁 Forzar a número
  const navigator = useNavigate();
  const { page, setPage } = useConfigurationStore();
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { mutateAsync: createConfiguration } = useCreateConfiguration();
  const { mutateAsync: deleteConfiguration } = useDeleteConfiguration();
  const { mutateAsync: updateConfiguration } = useUpdateConfiguration();
  const { data } = usePaginateConfigurations(id);
  const [formData, setFormData] = useState<UpdateConfigurationTemplate>({
    id: 0,
    maxValue: 0,
    minValue: 0,
    moduleId: 0,
    readingTypeId: 0,
    isActive: false,
  });

  const goToModules = () => {
    navigator("/modules");
  };

  const save = async (newConfiguration: SaveConfigurationTemplate) => {
    try {
      await createConfiguration(newConfiguration);
      toast.success("Configuracion creado exitosamente");
      setShowCreate(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const update = async (newConfiguration: UpdateConfigurationTemplate) => {
    try {
      await updateConfiguration(newConfiguration);
      toast.success("Configuracion creado exitosamente");
      setShowCreate(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onHandleShowEdit = (configuration: UpdateConfigurationTemplate) => {
    setShowUpdate(true);
    setFormData({
      ...formData,
      ...configuration
    })
  };

  const handleShowDelete = (configuration: UpdateConfigurationTemplate) => {
    setShowDelete(true);
    setFormData({
      ...formData,
      ...configuration
    })
  };

  const handleDelete = async () => {
     try {
      await deleteConfiguration(formData.id);
      toast.success("Configuracion eliminada exitosamente");
      setShowDelete(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const columns = useMemo(
    () =>
      getConfigurationColumns({
        onEdit: onHandleShowEdit,
        onDelete: handleShowDelete,
      }),
    []
  );

  const moduleId = id ? Number(id) : undefined;

  return (
    <>
      <div>
        <Button leftIcon={ArrowLeftIcon} onClick={goToModules} variant="link">
          Regresar
        </Button>

        <Button
          leftIcon={PlusIcon}
          onClick={() => setShowCreate(true)}
          variant="success"
        >
          Crear Configuración
        </Button>

        {showCreate && moduleId !== undefined && (
          <FloatingModal onClose={() => setShowCreate(false)}>
            <CreateConfiguration onSubmit={save} moduleId={moduleId} />
          </FloatingModal>
        )}
      </div>

      {showUpdate && ( 
        <FloatingModal onClose={() => setShowUpdate(false)}>
            <UpdateConfiguration configuration={formData}  onSubmit={update}  />
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

      <GenericTable
        data={data?.response.data || []}
        columns={columns}
        page={page}
        totalPages={data?.pagination.totalPages || 1}
        hasNextPage={data?.pagination.hasNextPage || false}
        hasPreviousPage={data?.pagination.hasPreviousPage || false}
        onPageChange={setPage}
        title="Gestión de Configuraciones"
        description="Administra configuraciones de los módulos IoT"
        emptyMessage="No se encontraron configuraciones para este módulo"
      />
    </>
  );
}
