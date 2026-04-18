const COLOR_CLASSES = {
  blue: "text-blue-600",
  green: "text-green-600",
  yellow: "text-yellow-600",
  gray: "text-gray-500",
  red: "text-red-600",
} as const;

interface StatCardProps {
  title: string;
  totalCount: number;
  filteredCount?: number;
  accent?: boolean;
  color?: keyof typeof COLOR_CLASSES;
}

const StatCard = ({ title, totalCount, filteredCount, accent = false, color }: StatCardProps) => {
  const displayCount = filteredCount ?? totalCount;
  const isFiltered = filteredCount !== undefined && filteredCount !== totalCount;
  const valueClass = color ? COLOR_CLASSES[color] : accent ? "text-blue-600" : "text-gray-900";
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-1 text-sm text-gray-600">{title}</div>
      <div className="flex items-baseline gap-2">
        <div className={`text-2xl font-semibold ${valueClass}`}>
          {displayCount.toLocaleString()}
        </div>
        {isFiltered && (
          <div className="text-xs text-gray-500">of {totalCount.toLocaleString()}</div>
        )}
      </div>
    </div>
  );
};
export default StatCard;
