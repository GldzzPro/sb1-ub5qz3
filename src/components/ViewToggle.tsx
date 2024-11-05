import { LayoutGrid, Table as TableIcon } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface ViewToggleProps {
  view: 'grid' | 'table';
  onViewChange: (view: 'grid' | 'table') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <ToggleGroup type="single" value={view} onValueChange={(v) => v && onViewChange(v as 'grid' | 'table')}>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="table" aria-label="Table view">
        <TableIcon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}