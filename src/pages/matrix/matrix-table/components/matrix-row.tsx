import { memo } from "react";
import type { Cell } from "../../common/types/cell";
import { useMatrixRowLogic } from "../hooks/use-matrix-row-logic.hook";

interface MatrixRowProps {
  row: Cell[];
  rowIndex: number;
}

export const MatrixRow = memo(function MatrixRow({ row, rowIndex }: MatrixRowProps) {
  const {
    cells,
    rowSum,
    handleRemoveRow,
    handleMouseEnterSum,
    handleMouseLeaveSum,
  } = useMatrixRowLogic(row, rowIndex);

  return (
    <tr>
      <td className="mt-cell mt-cell--row-label">M = {rowIndex + 1}</td>
      {cells.map((cell) => (
        <td
          key={cell.id}
          className={cell.cellClass}
          style={cell.heatStyle}
          onClick={cell.onClick}
          onMouseEnter={cell.onMouseEnter}
          onMouseLeave={cell.onMouseLeave}
        >
          <span>{cell.displayValue}</span>
        </td>
      ))}

      <td
        className="mt-cell mt-cell--sum"
        onMouseEnter={handleMouseEnterSum}
        onMouseLeave={handleMouseLeaveSum}
      >
        {rowSum}
      </td>

      <td className="mt-cell mt-cell--remove" onClick={handleRemoveRow}>
        ✕
      </td>
    </tr>
  );
});

