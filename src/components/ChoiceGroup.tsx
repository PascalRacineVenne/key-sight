import type { ReactNode } from "react";
import { cx } from "@linaria/core";
import { styles } from "./ChoiceGroup.styles";

interface ChoiceOption<T extends string> {
  value: T;
  content: ReactNode;
  ariaLabel?: string;
}

interface ChoiceGroupProps<T extends string> {
  name: string;
  legend: string;
  value: T;
  options: ChoiceOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  optionClassName?: string;
}

// A set of selectable cards backed by native radio inputs, so arrow keys,
// focus and screen readers behave like a regular radio group.
const ChoiceGroup = <T extends string>({
  name,
  legend,
  value,
  options,
  onChange,
  className,
  optionClassName,
}: ChoiceGroupProps<T>) => (
  <fieldset className={styles.fieldset}>
    <legend className={styles.legend}>{legend}</legend>
    <div className={cx(styles.options, className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className={cx(
            styles.option,
            optionClassName,
            option.value === value && styles.selected,
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
            aria-label={option.ariaLabel}
            className={styles.input}
          />
          {option.content}
        </label>
      ))}
    </div>
  </fieldset>
);

export default ChoiceGroup;
