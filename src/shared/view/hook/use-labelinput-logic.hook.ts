import { useMemo } from "react";
import type { LabelInputProps } from "../components/label-input";


export function useLabelInputLogic(props: LabelInputProps) {
  const wrapperClass = `label-input-wrapper ${props.className || ""}`;
  const labelClass = !props.isLabelExists || !props.label ? "hidden" : "";
  const containerClass = `input-container ${props.children ? "has-children" : ""}`;
  const inputClass = `${props.error ? "input-error" : "input-normal"} ${props.InputClassName || ""}`;

  return {
    wrapperClass,
    labelClass,
    containerClass,
    inputClass,
  };
}
