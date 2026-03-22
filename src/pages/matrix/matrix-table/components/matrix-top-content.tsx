import { useMatrixTopLogic } from "../hooks/use-matrix-top-logic.hook";
import "../css/main-matrix-content.css";

interface MatrixHeaderProps {
  columnsCount: number;
}

export function MatrixTopContent({ columnsCount }: MatrixHeaderProps) {
  const { headers } = useMatrixTopLogic(columnsCount);

  return (
    <thead>
      <tr>
        <th className="mt-cell mt-cell--header mt-cell--header-label" />
        {headers.map((header) => (
          <th key={header.id} className="mt-cell mt-cell--header">
            {header.displayValue}
          </th>
        ))}
        <th className="mt-cell mt-cell--header mt-cell--sum-header">SUM</th>
        <th className="mt-cell mt-cell--header mt-cell--header-label" />
      </tr>
    </thead>
  );
}

