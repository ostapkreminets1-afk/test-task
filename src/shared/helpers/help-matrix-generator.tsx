import type { MatrixData } from "../../pages/matrix/common/types/cell";
import { createMatrix } from "../../pages/matrix/common/factory/matrix-factory";

export function generateMatrix(rows: number, columns: number): MatrixData {
  return createMatrix(rows, columns);
}