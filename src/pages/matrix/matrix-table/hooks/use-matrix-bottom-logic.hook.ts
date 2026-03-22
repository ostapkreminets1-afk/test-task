import { useColumnPercentiles } from "./use-column-percentiles.hook";
import { useMatrixDispatch } from "../../common/context/matrix-context";

const PERCENTILE_LEVEL = 60;

export function useMatrixBottomLogic() {
  const percentiles = useColumnPercentiles(PERCENTILE_LEVEL);
  const { addRow } = useMatrixDispatch();

  const renderedPercentiles = percentiles.map((value, i) => ({
    id: i,
    displayValue: value.toFixed(1),
  }));

  return {
    percentileLevel: PERCENTILE_LEVEL,
    renderedPercentiles,
    handleAddRow: addRow,
  };
}
