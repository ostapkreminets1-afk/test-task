import type { ReactNode, ChangeEvent, Ref } from "react";
import { useLabelInputLogic } from "../hook/use-labelinput-logic.hook";
import "../css/label-input.css";

export interface LabelInputProps {
  id?: string;
  label?: string;
  description?: string;
  value?: string;
  error?: string;
  type?: string;
  placeholder?: string;
  children?: ReactNode;
  className?: string;
  isLabelExists?: boolean;
  isDescriptionExists?: boolean;
  InputClassName?: string;
  name?: string;
  min?: string | number;
  max?: string | number;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  ref?: Ref<HTMLInputElement>;
}

export const LabelInputWrapper = (props: LabelInputProps) => {
  const logic = useLabelInputLogic({
    ...props,
    placeholder: props.placeholder ?? "Введіть значення...",
    type: props.type ?? "text",
    isLabelExists: props.isLabelExists ?? true,
  });

  return (
    <div className={logic.wrapperClass}>
      <label
        htmlFor={props.id}
        className={logic.labelClass}
      >
        {props.label}
      </label>

      <div className={logic.containerClass}>
        <input
          id={props.id}
          name={props.name}
          ref={props.ref}
          value={props.value}
          min={props.min}
          max={props.max}
          placeholder={props.placeholder ?? "Введіть значення..."}
          onChange={props.onChange}
          onBlur={props.onBlur}
          type={props.type ?? "text"}
          autoComplete="off"
          spellCheck={false}
          className={logic.inputClass}
        />

        {props.children && <div className="icon">{props.children}</div>}
        {props.isDescriptionExists && (
          <span className="description-text">{props.description}</span>
        )}
      </div>

      {props.error && <p className="error-text">{props.error}</p>}
    </div>
  );
};