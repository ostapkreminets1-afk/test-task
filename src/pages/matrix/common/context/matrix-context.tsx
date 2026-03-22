import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { MatrixData } from "../types/cell";
import { initialState, type MatrixState } from "./matrix-reducer";
import { useMatrixProviderLogic } from "../hook/use-matrix-provider-logic.hook";


export interface MatrixDispatchValue {
  setMatrix: (matrix: MatrixData, nearestCount: number) => void;
  incrementCell: (cellId: number) => void;
  removeRow: (rowIndex: number) => void;
  addRow: () => void;
}

export interface MatrixHoverValue {
  hoveredCellId: number | null;
  hoveredSumRowIndex: number | null;
  setHoveredCellId: (id: number | null) => void;
  setHoveredSumRowIndex: (index: number | null) => void;
}

const MatrixStateContext = createContext<MatrixState>(initialState);
const MatrixDispatchContext = createContext<MatrixDispatchValue | null>(null);
const MatrixHoverContext = createContext<MatrixHoverValue | null>(null);

export const useMatrixState = (): MatrixState => {
  return useContext(MatrixStateContext);
};

export const useMatrixDispatch = (): MatrixDispatchValue => {
  const context = useContext(MatrixDispatchContext);
  if (!context) {
    throw new Error("useMatrixDispatch must be used within MatrixProvider");
  }
  return context;
};

export const useMatrixHover = (): MatrixHoverValue => {
  const context = useContext(MatrixHoverContext);
  if (!context) {
    throw new Error("useMatrixHover must be used within MatrixProvider");
  }
  return context;
};


export const MatrixProvider = ({ children }: { children: ReactNode }) => {
  const { state, dispatchValue, hoverValue } = useMatrixProviderLogic();

  return (
    <MatrixDispatchContext.Provider value={dispatchValue}>
      <MatrixHoverContext.Provider value={hoverValue}>
        <MatrixStateContext.Provider value={state}>
          {children}
        </MatrixStateContext.Provider>
      </MatrixHoverContext.Provider>
    </MatrixDispatchContext.Provider>
  );
};
