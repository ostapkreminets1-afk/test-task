import type { Cell } from "../../pages/matrix/common/types/cell";

export interface MatrixRowProps {
  row: Cell[];
  rowIndex: number;
}

export function computeRowSum(row: Cell[]): number {
  return row.reduce((acc, cell) => acc + cell.amount, 0);
}
