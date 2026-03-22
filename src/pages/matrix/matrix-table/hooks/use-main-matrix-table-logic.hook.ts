import { useMatrixState } from "../../common/context/matrix-context";

export function useMainMatrixTableLogic() {
  const { matrix } = useMatrixState();
  
  if (!matrix || matrix.length === 0) {
    return { isVisible: false } as const;
  }
  
  const columnsCount = matrix[0].length;
  const totalColumns = 1 + columnsCount + 1 + 1;

  return {
    isVisible: true,
    matrix,
    columnsCount,
    totalColumns,
  } as const;
}
