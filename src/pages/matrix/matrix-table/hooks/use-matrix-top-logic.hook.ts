export function useMatrixTopLogic(columnsCount: number) {
  const headers = Array.from({ length: columnsCount }, (_, i) => ({
    id: i,
    displayValue: `N = ${i + 1}`,
  }));

  return { headers };
}
