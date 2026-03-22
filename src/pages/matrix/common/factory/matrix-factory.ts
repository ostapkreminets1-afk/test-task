import type { Cell, MatrixData } from "../types/cell";

function generateRandomAmount(): number {
  return Math.floor(Math.random() * 900) + 100;
}

export function createCell(id: number): Cell {
  return {
    id,
    amount: generateRandomAmount(),
  };
}

export function createRow(columnsCount: number, startId: number): Cell[] {
  let currentId = startId;
  return Array.from({ length: columnsCount }, () => createCell(currentId++));
}

export function createMatrix(rowsCount: number, columnsCount: number): MatrixData {
  let currentId = 1;
  return Array.from({ length: rowsCount }, () => {
    const row = createRow(columnsCount, currentId);
    currentId += columnsCount;
    return row;
  });
}
