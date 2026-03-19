import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";
import { MapPin, Trash2, Search, Loader2 } from "lucide-react";

interface SearchFormProps {
  address: string;
  setAddress: (val: string) => void;
  trashType: string;
  setTrashType: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  disabled: boolean;
}

export function SearchForm({ 
  address, 
  setAddress, 
  trashType, 
  setTrashType, 
  onSubmit, 
  loading, 
  disabled 
}: SearchFormProps) {
  return (
    <form onSubmit={onSubmit} className="search-form">
      <div className="space-y-4">
        <FormField
          label="お住まいの地域 (例: 東京都新宿区大久保1丁目)"
          icon={<MapPin className="w-4 h-4 text-indigo-400" />}
          type="text"
          required
          maxLength={30}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="東京都新宿区"
        />
        <FormField
          label="捨てたいもの (例: フライパン、段ボール)"
          icon={<Trash2 className="w-4 h-4 text-fuchsia-400" />}
          type="text"
          required
          maxLength={10}
          value={trashType}
          onChange={(e) => setTrashType(e.target.value)}
          placeholder="フライパン"
        />
      </div>
      <Button
        type="submit"
        disabled={disabled}
        icon={loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5 icon" />}
      >
        {loading ? "" : "検索する"}
      </Button>
    </form>
  );
}
