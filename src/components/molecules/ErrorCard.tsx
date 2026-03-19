import { AlertCircle } from "lucide-react";

export function ErrorCard({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="error-card">
      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
      <p>{message}</p>
    </div>
  );
}
