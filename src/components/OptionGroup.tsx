import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";

interface Option<T extends string> {
  value: T;
  label: string;
}

interface OptionGroupProps<T extends string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly Option<T>[];
}

const GAP_BY_COUNT: Record<number, string> = {
  2: "gap-7.5",
  4: "gap-5.5",
};
const DEFAULT_GAP = "gap-4";

export default function OptionGroup<T extends string>({
  label,
  value,
  onChange,
  options,
}: OptionGroupProps<T>) {
  const gapCls = GAP_BY_COUNT[options.length] ?? DEFAULT_GAP;

  return (
    <fieldset>
      <legend className="mb-2.75 text-sm leading-4.75 text-blue-600 sm:mb-4 sm:text-xl sm:leading-6.25">
        {label}
      </legend>

      <ToggleGroup
        value={[value]}
        onValueChange={(next: string[]) => {
          // Required single choice: ignore deselection and unknown values
          const option = options.find((o) => o.value === next[0]);
          if (option) onChange(option.value);
        }}
        className={`gap-2.5 ${gapCls}`}
      >
        {options.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </fieldset>
  );
}
