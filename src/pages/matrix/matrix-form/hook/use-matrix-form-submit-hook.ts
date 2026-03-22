import { useMatrixDispatch } from "../../common/context/matrix-context";
import { generateMatrix } from "../../common/handlers/matrix-generator";
import type { MatrixFormOutput } from "../model/matrix-form.schema";

interface UseMatrixFormSubmitProps {
  onSubmit?: (data: MatrixFormOutput) => void;
}

export function useMatrixFormSubmit({ onSubmit }: UseMatrixFormSubmitProps) {
  const { setMatrix } = useMatrixDispatch();

  const submitHandler = (data: MatrixFormOutput) => {
    const matrix = generateMatrix(data.rows, data.columns);
    setMatrix(matrix, data.nearest);
    onSubmit?.(data);
  };

  return { submitHandler };
}
