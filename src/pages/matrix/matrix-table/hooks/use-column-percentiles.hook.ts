import { useMemo } from "react";
import { useMatrixState } from "../../common/context/matrix-context";
import { calculatePercentile } from "../../../../shared/utils/percentile";

export function useColumnPercentiles(percentile: number = 60): number[] {
  const { matrix } = useMatrixState();

  return useMemo(() => {
    if (!matrix || matrix.length === 0) return [];

    const columnsCount = matrix[0].length;

    return Array.from({ length: columnsCount }, (_, colIndex) => {
      const values = matrix.map((row) => row[colIndex].amount);
      return calculatePercentile(values, percentile);
    });
  }, [matrix, percentile]);
}
