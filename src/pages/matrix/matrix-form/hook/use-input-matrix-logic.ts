import { useMatrixValidation } from "./use-matrix-validation-hook";
import { useMatrixFormSubmit } from "./use-matrix-form-submit-hook";
import { FIELDS } from "../const/fields";
import type { MatrixFormOutput } from "../model/matrix-form.schema";

export function useInputMatrixLogic(onSubmit?: (data: MatrixFormOutput) => void) {
  const { register, handleSubmit, errors, maxNearest } = useMatrixValidation();
  const { submitHandler } = useMatrixFormSubmit({ onSubmit });

  const fields = FIELDS.map((field) => {
    const { ref, name, onChange, onBlur } = register(field.name);

    const min = field.name === "nearest" ? 0 : 1;
    const max = field.name === "nearest" ? (maxNearest !== null ? maxNearest : undefined) : 100;
    
    const isDescriptionExists = field.name === "nearest" && maxNearest !== null;
    const description = maxNearest !== null ? `макс: ${maxNearest}` : undefined;
    const error = errors[field.name]?.message;

    return {
      ...field,
      ref,
      name,
      onChange,
      onBlur,
      min,
      max,
      error,
      isDescriptionExists,
      description,
    };
  });

  return {
    onSubmitForm: handleSubmit(submitHandler),
    fields,
  };
}
