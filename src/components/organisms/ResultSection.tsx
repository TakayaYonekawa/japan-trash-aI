import { CalendarDays } from "lucide-react";

interface ResultSectionProps {
  result: {
    category: string;
    nextDate: string;
    reasoning?: string;
  } | null;
  loading: boolean;
}

export function ResultSection({ result, loading }: ResultSectionProps) {
  if (!result || loading) return null;

  return (
    <div className="result-section">
      <div className="result-content">
        <div className="space-y-2">
          <h3 className="category-label">分別区分</h3>
          <div className="category-value">{result.category}</div>
        </div>
        
        <div className="divider"></div>
        
        <div className="space-y-3">
          <h3 className="category-label flex items-center justify-center gap-2">
            <CalendarDays className="w-4 h-4" />
            次回の収集日
          </h3>
          <div className="date-value">{result.nextDate}</div>
        </div>

        {result.reasoning && (
          <div className="reasoning-box">
            <p>{result.reasoning}</p>
          </div>
        )}
      </div>
    </div>
  );
}
