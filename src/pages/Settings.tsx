import { useAuth } from "@/stores/auth-context";
import Button from "@/components/shared/buttons/Button";

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function Settings() {
  const { logout, token } = useAuth();
  const jwtContent = token ? parseJwt(token) : null;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Configuración</h2>
        {token && jwtContent && (
          <div className="mb-6 text-left break-all">
            <h3 className="font-semibold mb-2">Contenido del JWT:</h3>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(jwtContent, null, 2)}</pre>
          </div>
        )}
        <Button className="w-full" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
} 