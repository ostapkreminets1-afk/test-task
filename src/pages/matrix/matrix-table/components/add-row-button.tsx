import { useMatrixBottomLogic } from "../hooks/use-matrix-bottom-logic.hook";

export function AddRowButton() {
  const { handleAddRow } = useMatrixBottomLogic();
  return (
    <button className="matrix-add-row-btn" onClick={handleAddRow}>
      + Додати рядок
    </button>
  );
}

