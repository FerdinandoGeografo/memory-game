import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion/variants";
import type { Option } from "@/types/option";
import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";

const OPTION_GAP_BY_COUNT: Record<number, string> = {
  2: "gap-2.75 sm:gap-7.5",
  4: "gap-2.5 sm:gap-5.5",
};

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
    <motion.div variants={fadeUp()}>
      <fieldset>
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
      </fieldset>
    </motion.div>
  );
}
