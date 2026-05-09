import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-8xl font-bold text-primary mb-4">404</div>
          <h1 className="text-gray-900 mb-2">Página No Encontrada</h1>
          <p className="text-gray-600">
            La página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Regresar
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Ir al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}
