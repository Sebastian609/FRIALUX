// src/ui/dropdowns/custom-dropdown.tsx
import { Edit, Trash2, Key } from 'lucide-react';

interface CustomDropDownProps {
  userId: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onChangePassword: (id: number) => void;
}

function CustomDropDown({ userId, onEdit, onDelete, onChangePassword }: CustomDropDownProps) {
  const actions = [
    { label: "Editar", icon: Edit, action: () => onEdit(userId), color: "text-blue-600 hover:text-blue-800" },
    { label: "Eliminar", icon: Trash2, action: () => onDelete(userId), color: "text-red-600 hover:text-red-800" },
    { label: "Cambiar contraseña", icon: Key, action: () => onChangePassword(userId), color: "text-green-600 hover:text-green-800" },
  ];

  return (
    <div className="flex items-center space-x-2">
      {actions.map((action) => {
        const IconComponent = action.icon;
        return (
          <button
            key={action.label}
            onClick={action.action}
            className={`p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 ${action.color}`}
            title={action.label}
          >
            <IconComponent className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}

export default CustomDropDown;