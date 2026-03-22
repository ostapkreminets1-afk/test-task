export type CellId = number;
export type CellValue = number;

export interface Cell {
  id: CellId;
  amount: CellValue;
}

export type MatrixRow = Cell[];
export type MatrixData = MatrixRow[];
