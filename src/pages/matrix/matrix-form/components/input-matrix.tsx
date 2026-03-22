import { LabelInputWrapper } from "../../../../shared/view/components/label-input";
import type { MatrixFormOutput } from "../model/matrix-form.schema";
import { useInputMatrixLogic } from "../hook/use-input-matrix-logic";
import "../css/input-matrix.css";
import "../../../../shared/view/css/button.css";

interface InputMatrixProps {
  onSubmit?: (data: MatrixFormOutput) => void;
}

export function InputMatrix({ onSubmit }: InputMatrixProps) {
  const { onSubmitForm, fields } = useInputMatrixLogic(onSubmit);

  return (
    <form className="input-matrix" onSubmit={onSubmitForm} noValidate>
      {fields.map((field) => (
        <LabelInputWrapper
          key={field.name}
          ref={field.ref}
          name={field.name}
          id={field.name}
          label={field.label}
          placeholder={field.placeholder}
          type="number"
          min={field.min}
          max={field.max}
          error={field.error}
          onChange={field.onChange}
          onBlur={field.onBlur}
          isDescriptionExists={field.isDescriptionExists}
          description={field.description}
        />
      ))}

      <button className="buttonv1" type="submit">
        Згенерувати
      </button>
    </form>
  );
}