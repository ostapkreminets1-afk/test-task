import type { MatrixData } from "../types/cell";
import { createMatrix } from "../factory/matrix-factory";

export function generateMatrix(rows: number, columns: number): MatrixData {
  return createMatrix(rows, columns);
}
