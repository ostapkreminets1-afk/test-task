import { useReducer, useState, useCallback, useMemo } from "react";
import { matrixReducer, initialState } from "../context/matrix-reducer";
import type { MatrixDispatchValue, MatrixHoverValue } from "../context/matrix-context";

export function useMatrixProviderLogic() {
  const [state, dispatch] = useReducer(matrixReducer, initialState);
  const [hoveredCellId, setHoveredCellId] = useState<number | null>(null);
  const [hoveredSumRowIndex, setHoveredSumRowIndex] = useState<number | null>(null);

  const getNextId = useCallback((): number => {
    if (!state.matrix) return 0;
    let maxId = 0;
    for (const row of state.matrix) {
      for (const cell of row) {
        if (cell.id > maxId) maxId = cell.id;
      }
    }
    return maxId + 1;
  }, [state.matrix]);

  const dispatchValue = useMemo<MatrixDispatchValue>(
    () => ({
      setMatrix: (matrix, nearestCount) =>
        dispatch({ type: "SET_MATRIX", payload: { matrix, nearestCount } }),
      incrementCell: (cellId) =>
        dispatch({ type: "INCREMENT_CELL", payload: { cellId } }),
      removeRow: (rowIndex) =>
        dispatch({ type: "REMOVE_ROW", payload: { rowIndex } }),
      addRow: () => {
        if (!state.matrix || state.matrix.length === 0) return;
        const columnsCount = state.matrix[0].length;
        dispatch({
          type: "ADD_ROW",
          payload: { columnsCount, nextId: getNextId() },
        });
      },
    }),
    [state.matrix, getNextId]
  );

  const hoverValue = useMemo<MatrixHoverValue>(
    () => ({
      hoveredCellId,
      hoveredSumRowIndex,
      setHoveredCellId,
      setHoveredSumRowIndex,
    }),
    [hoveredCellId, hoveredSumRowIndex]
  );

  return {
    state,
    dispatchValue,
    hoverValue,
  };
}
