import type { Cell } from "../../common/types/cell";
import { MatrixRow } from "./matrix-row";

export function MatrixMiddleContent({ matrix }: { matrix: Cell[][] }) {
  return (
    <tbody>
      {matrix.map((row, rowIndex) => (
        <MatrixRow key={rowIndex} row={row} rowIndex={rowIndex} />
      ))}
    </tbody>
  );
}