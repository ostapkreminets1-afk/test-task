import { lazy, Suspense } from "react";
import { MatrixTopContent } from "./matrix-top-content";
import { MatrixBottomContent } from "./matrix-bottom-content";
import { AddRowButton } from "./add-row-button";
import { useMainMatrixTableLogic } from "../hooks/use-main-matrix-table-logic.hook";
import "../css/main-matrix-content.css";

const LazyMatrixMiddleContent = lazy(() => import("./matrix-middle-content").then(m => ({ default: m.MatrixMiddleContent })));

export function MainMatrixTable() {
  const logic = useMainMatrixTableLogic();
  
  if (!logic.isVisible) return null;

  return (
    <div className="matrix-table-wrapper">
      <div className="matrix-table-scroll">
        <table className="matrix-table">
          <MatrixTopContent columnsCount={logic.columnsCount} />
          <Suspense fallback={<tbody><tr><td colSpan={logic.totalColumns} style={{ textAlign: "center", padding: "20px" }}>Завантаження матриці...</td></tr></tbody>}>
            <LazyMatrixMiddleContent matrix={logic.matrix} />
          </Suspense>
          <MatrixBottomContent />
        </table>
      </div>
      <AddRowButton />
    </div>
  );
}