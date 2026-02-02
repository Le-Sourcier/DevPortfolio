import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto" />
        <p className="text-sm text-gray-400 mt-3">Chargement...</p>
      </div>
    </div>
  );
}
