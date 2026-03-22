import { type CSSProperties } from "react";
import { useMatrixDispatch, useMatrixHover } from "../../common/context/matrix-context";
import { useNearestCells } from "./use-nearest-cells.hook";
import { useRowPercentages } from "./use-row-percentages.hook";
import { computeRowSum } from "../../../../shared/utils/computer-row-sum";
import type { Cell } from "../../common/types/cell";

export function useMatrixRowLogic(row: Cell[], rowIndex: number) {
  const { incrementCell, removeRow } = useMatrixDispatch();
  const { hoveredCellId, hoveredSumRowIndex, setHoveredCellId, setHoveredSumRowIndex } = useMatrixHover();
  
  const nearestIds = useNearestCells(hoveredCellId);
  const percentages = useRowPercentages(row);
  
  const isPercentMode = hoveredSumRowIndex === rowIndex;
  const rowSum = computeRowSum(row);

  const cells = row.map((cell, colIndex) => {
    const isNearest = !isPercentMode && nearestIds.has(cell.id);
    const pct = percentages[colIndex];

    const cellClass = [
      "mt-cell",
      "mt-cell--data",
      isNearest ? "mt-cell--nearest" : "",
      isPercentMode ? "mt-cell--heatmap" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const heatStyle = isPercentMode
      ? ({ "--heat": `${(pct.heatPercent / 100) * 0.35}` } as CSSProperties)
      : undefined;

    return {
      id: cell.id,
      cellClass,
      heatStyle,
      displayValue: isPercentMode ? `${pct.percent}%` : cell.amount,
      onClick: () => incrementCell(cell.id),
      onMouseEnter: () => setHoveredCellId(cell.id),
      onMouseLeave: () => setHoveredCellId(null),
    };
  });

  return {
    cells,
    rowSum,
    handleRemoveRow: () => removeRow(rowIndex),
    handleMouseEnterSum: () => setHoveredSumRowIndex(rowIndex),
    handleMouseLeaveSum: () => setHoveredSumRowIndex(null),
  };
}
