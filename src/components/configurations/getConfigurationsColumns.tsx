
import EditButton from "../shared/buttons/EditButton";
import DeleteButton from "../shared/buttons/DeleteButton";
import StatusBadge from "../badges/Badge";
import DateTimeColumn from "../Columns/DateTimeColumn";
import TitleSubtitle from "../Columns/TitleSubtitle";

import ConfigButton from "../shared/buttons/ConfigureButton";
import { Configuration } from "@/types/configuration/configuration.type";
import NumberColumn from "../Columns/NumberColumn";

export const getConfigurationColumns = ({
  onEdit,
  onDelete,
  onConfig,
}: {
  onEdit: (configuration: Configuration) => void;
  onDelete: (configuration: Configuration) => void;
  onConfig?: (configuration: Configuration) => void;
}) => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }: { row: { original: Configuration } }) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        #{row.original.id}
      </span>
    ),
  },

  {
    accessorKey: "readingType",
    header: "Tipo Lectura",
    cell: ({ row }: { row: { original: Configuration } }) => (
      <TitleSubtitle title={row.original.readingType.name} subtitle={row.original.readingType.simbol} />
    ),
  },
  {
    accessorKey: "maximum",
    header: "Maximo",
    cell: ({ row }: { row: { original: Configuration } }) => (
      <NumberColumn value={row.original.maxValue }/>
    ),
  },
  {
   accessorKey: "minimum",
    header: "Minimo",
    cell: ({ row }: { row: { original: Configuration } }) => (
      <NumberColumn value={row.original.minValue }/>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de Creación",
    cell: ({ row }: { row: { original: Configuration } }) => (
      <DateTimeColumn date={row.original.createdAt} />
    ),
  },
  {
    accessorKey: "isActive",
    header: "Estado",
    cell: ({ row }: { row: { original: Configuration } }) => (
      <StatusBadge active={row.original.isActive} />
    ),
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }: { row: { original: Configuration } }) => (
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
      </div>
    ),
  },
];
