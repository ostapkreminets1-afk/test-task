import type { MatrixData, Cell } from "../types/cell";
import { createRow } from "../factory/matrix-factory";

export interface MatrixState {
  matrix: MatrixData | null;
  nearestCount: number;
}

export const initialState: MatrixState = {
  matrix: null,
  nearestCount: 0,
};

export type MatrixAction =
  | { type: "SET_MATRIX"; payload: { matrix: MatrixData; nearestCount: number } }
  | { type: "INCREMENT_CELL"; payload: { cellId: number } }
  | { type: "REMOVE_ROW"; payload: { rowIndex: number } }
  | { type: "ADD_ROW"; payload: { columnsCount: number; nextId: number } };


type ActionHandler<T extends MatrixAction> = (state: MatrixState, payload: T["payload"]) => MatrixState;

const actionStrategies: { [K in MatrixAction["type"]]: ActionHandler<Extract<MatrixAction, { type: K }>> } = {
  SET_MATRIX: (state, payload) => ({
    ...state,
    matrix: payload.matrix,
    nearestCount: payload.nearestCount,
  }),

  INCREMENT_CELL: (state, payload) => {
    if (!state.matrix) return state;
    return {
      ...state,
      matrix: state.matrix.map((row) =>
        row.map((cell) =>
          cell.id === payload.cellId
            ? { ...cell, amount: cell.amount + 1 }
            : cell
        )
      ),
    };
  },

  REMOVE_ROW: (state, payload) => {
    if (!state.matrix) return state;
    return {
      ...state,
      matrix: state.matrix.filter((_, i) => i !== payload.rowIndex),
    };
  },

  ADD_ROW: (state, payload) => {
    if (!state.matrix) return state;
    
    const newRow = createRow(payload.columnsCount, payload.nextId);
    
    return {
      ...state,
      matrix: [...state.matrix, newRow],
    };
  },
};

export function matrixReducer(state: MatrixState, action: MatrixAction): MatrixState {
  const strategy = actionStrategies[action.type] as (state: MatrixState, payload: MatrixAction["payload"]) => MatrixState;
  
  if (strategy) {
    return strategy(state, action.payload);
  }
  
  return state;
}


