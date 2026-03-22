import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  matrixFormSchema,
  MATRIX_FORM_DEFAULTS,
  type MatrixFormInput,
} from "../model/matrix-form.schema";

export function useMatrixFormValidation() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<MatrixFormInput>({
    resolver: zodResolver(matrixFormSchema),
    defaultValues: MATRIX_FORM_DEFAULTS,
    mode: "onChange",
  });

  const rows = watch("rows");
  const columns = watch("columns");

  const maxNearest = (() => {
    const r = Number(rows);
    const c = Number(columns);
    return r > 0 && c > 0 ? r * c : null;
  })();

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    maxNearest,
  } as const;
}
