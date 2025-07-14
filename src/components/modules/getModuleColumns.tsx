import { Module } from "@/types/modules/module.type";
import EditButton from "../shared/buttons/EditButton";
import DeleteButton from "../shared/buttons/DeleteButton";
import StatusBadge from "../badges/Badge";
import DateTimeColumn from "../Columns/DateTimeColumn";
import TitleSubtitle from "../Columns/TitleSubtitle";
import CopyText from "../Columns/CopyText";
import ConfigButton from "../shared/buttons/ConfigureButton";
import ShowButton from "../shared/buttons/ShowButton copy";

export const getModuleColumns = ({
  onEdit,
  onDelete,
  onConfig,
  onShow,
}: {
  onEdit: (module: Module) => void;
  onDelete: (module: Module) => void;
  onConfig?: (module: Module) => void;
  onShow: (module: Module) => void;
}) => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }: { row: { original: Module } }) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        #{row.original.id}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Nombre del Módulo",
    cell: ({ row }: { row: { original: Module } }) => (
      <TitleSubtitle title={row.original.name} subtitle="Módulo IoT" />
    ),
  },
  {
    accessorKey: "webSocketRoom",
    header: "Código WS",
    cell: ({ row }: { row: { original: Module } }) => (
      <CopyText text={row.original.webSocketRoom} />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de Creación",
    cell: ({ row }: { row: { original: Module } }) => (
      <DateTimeColumn date={row.original.createdAt} />
    ),
  },
  {
    accessorKey: "isActive",
    header: "Estado",
    cell: ({ row }: { row: { original: Module } }) => (
      <StatusBadge active={row.original.isActive} />
    ),
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }: { row: { original: Module } }) => (
      <div className="flex gap-2">
        {onConfig && (
          <ConfigButton
            onClick={() => onConfig(row.original)}
            title="Configurar módulo"
          />
        )}
        <EditButton
          onClick={() => onEdit(row.original)}
          title="Editar módulo"
        />
        <DeleteButton
          onClick={() => onDelete(row.original)}
          title="Eliminar módulo"
        />

        <ShowButton onClick={() => onShow(row.original)} title="Ver Módulo" />
      </div>
    ),
  },
];
