import { useState } from "react";
import { AlertCircle, X } from "lucide-react";

interface InfoBannerProps {
  storageKey: string;
  title: string;
  description: string;
}

export function InfoBanner({ storageKey, title, description }: InfoBannerProps) {
  const [dismissed, setDismissed] = useState(() =>
    localStorage.getItem(`infobanner-${storageKey}`) === "true",
  );

  const handleDismiss = () => {
    localStorage.setItem(`infobanner-${storageKey}`, "true");
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="mb-4 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
      <div className="flex-1 text-sm text-blue-900">
        <strong>{title}:</strong> {description}
      </div>
      <button onClick={handleDismiss} className="text-blue-400 hover:text-blue-600">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
