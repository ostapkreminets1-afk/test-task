import { useMatrixBottomLogic } from "../hooks/use-matrix-bottom-logic.hook";

export function MatrixBottomContent() {
  const { percentileLevel, renderedPercentiles } = useMatrixBottomLogic();

  return (
    <tfoot>
      <tr>
        <td className="mt-cell mt-cell--p60-label">P{percentileLevel}</td>
        {renderedPercentiles.map((item) => (
          <td key={item.id} className="mt-cell mt-cell--p60">
            {item.displayValue}
          </td>
        ))}
        <td className="mt-cell mt-cell--p60-empty" />
        <td className="mt-cell mt-cell--p60-empty" style={{ border: "none", background: "transparent" }} />
      </tr>
    </tfoot>
  );
}

