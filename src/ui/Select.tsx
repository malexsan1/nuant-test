export type SelectOption = {
  label: string;
  value: string;
};

export interface SelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ value, options, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      className="select w-full max-w-xs"
    >
      {options.map((opt) => {
        return (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        );
      })}
    </select>
  );
};
