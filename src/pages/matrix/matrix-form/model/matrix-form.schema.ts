import { z } from "zod";

export const LIMITS = {
  MIN_DIMENSION: 1,
  MAX_DIMENSION: 100,
  MIN_NEAREST: 0,
} as const;


const numberField = (name: string, min: number, max?: number) =>
  z.preprocess(

    (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
    z
      .number({
        message: `${name} є обов'язковим і має бути числом`,
      })
      .int(`${name} має бути цілим числом`)
      .min(min, `${name} не може бути менше ${min}`)
      .max(
        max ?? Number.MAX_SAFE_INTEGER,
        max ? `${name} не може перевищувати ${max}` : undefined
      )
  );

export const matrixFormSchema = z
  .object({
    rows: numberField("M (рядки)", LIMITS.MIN_DIMENSION, LIMITS.MAX_DIMENSION),
    columns: numberField("N (стовпці)", LIMITS.MIN_DIMENSION, LIMITS.MAX_DIMENSION),
    nearest: numberField("X (найближчі)", LIMITS.MIN_NEAREST),
  })
  .refine(
    (data) => {
      if (data.rows === undefined || data.columns === undefined || data.nearest === undefined) {
        return true;
      }
      return data.nearest <= data.rows * data.columns;
    },
    {
      message: "X не може перевищувати загальну кількість клітинок (M × N)",
      path: ["nearest"],
    }
  );


export type MatrixFormInput = z.input<typeof matrixFormSchema>;


export type MatrixFormOutput = z.output<typeof matrixFormSchema>;

export const MATRIX_FORM_DEFAULTS: MatrixFormInput = {
  rows: "",
  columns: "",
  nearest: "",
};
