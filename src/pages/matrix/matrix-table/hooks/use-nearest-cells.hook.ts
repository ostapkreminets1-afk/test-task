import { useMemo } from "react";
import { useMatrixState } from "../../common/context/matrix-context";

interface NearestCell {
  id: number;
  diff: number;
}


export function useNearestCells(
  hoveredCellId: number | null
): Set<number> {
  const { matrix, nearestCount } = useMatrixState();

  return useMemo(() => {
    if (!matrix || hoveredCellId === null || nearestCount === 0) {
      return new Set<number>();
    }

    // Знайти поточне значення hovered клітинки
    let hoveredAmount = 0;
    for (const row of matrix) {
      for (const cell of row) {
        if (cell.id === hoveredCellId) {
          hoveredAmount = cell.amount;
          break;
        }
      }
    }


    const candidates: NearestCell[] = [];
    for (const row of matrix) {
      for (const cell of row) {
        if (cell.id !== hoveredCellId) {
          candidates.push({ id: cell.id, diff: Math.abs(cell.amount - hoveredAmount) });
        }
      }
    }

    candidates.sort((a, b) => a.diff - b.diff);

    const nearest = new Set<number>();
    for (let i = 0; i < Math.min(nearestCount, candidates.length); i++) {
      nearest.add(candidates[i].id);
    }
    return nearest;
  }, [matrix, hoveredCellId, nearestCount]);
}
