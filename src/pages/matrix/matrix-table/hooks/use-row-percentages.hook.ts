import { useMemo } from "react";
import type { Cell } from "../../common/types/cell";

interface RowPercentage {
  id: number;
  percent: number; 
  heatPercent: number;  
}

export function useRowPercentages(row: Cell[]): RowPercentage[] {
  return useMemo(() => {
    if (row.length === 0) return [];

    const sum = row.reduce((acc, cell) => acc + cell.amount, 0);
    const max = Math.max(...row.map((c) => c.amount));

    return row.map((cell) => ({
      id: cell.id,
      percent: sum > 0 ? Math.round((cell.amount / sum) * 100) : 0,
      heatPercent: max > 0 ? (cell.amount / max) * 100 : 0,
    }));
  }, [row]);
}
