import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion/variants";
import { OPTION_GAP_BY_COUNT } from "@/constants/option-group";
import type { Option } from "@/types/option";
import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";

interface OptionGroupProps<T extends string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly Option<T>[];
}

export default function OptionGroup<T extends string>({
  label,
  value,
  onChange,
  options,
}: OptionGroupProps<T>) {
  const gapCls = OPTION_GAP_BY_COUNT[options.length];

  return (
    <motion.fieldset variants={fadeUp()}>
      <legend className="mb-2.75 text-sm text-blue-600 sm:mb-4 sm:text-xl">
        {label}
      </legend>

      <ToggleGroup
        value={[value]}
        onValueChange={(next: string[]) => {
          const option = options.find((o) => o.value === next[0]);
          if (option) onChange(option.value);
        }}
        className={gapCls}
      >
        {options.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </motion.fieldset>
  );
}
