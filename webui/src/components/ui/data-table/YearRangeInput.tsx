import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface YearRangeInputProps {
  yearFrom: string;
  setYearFrom: (value: string) => void;
  yearTo: string;
  setYearTo: (value: string) => void;
}

export function YearRangeInput({ yearFrom, setYearFrom, yearTo, setYearTo }: YearRangeInputProps) {
  return (
    <div>
      <Label className="mb-1.5 block text-sm text-gray-700">Year Range</Label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder="From"
          value={yearFrom}
          onChange={(e) => setYearFrom(e.target.value)}
          className="h-10"
        />
        <span className="text-gray-500">-</span>
        <Input
          type="number"
          placeholder="To"
          value={yearTo}
          onChange={(e) => setYearTo(e.target.value)}
          className="h-10"
        />
      </div>
    </div>
  );
}
