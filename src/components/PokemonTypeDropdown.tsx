import { capitalize } from "lodash";

import { Select, SelectOption } from "../ui/Select";
import { usePokemonTypes } from "../hooks";

interface PokemonTypeDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const PokemonTypeDropdown: React.FC<PokemonTypeDropdownProps> = ({
  onChange,
  value,
}) => {
  const { data: options = [] } = usePokemonTypes<SelectOption[]>({
    queryKey: ["list-types-options"],
    select: (data) =>
      [{ label: "None", value: "" }].concat(
        data.map((item) => ({ label: capitalize(item.name), value: item.name }))
      ),
  });

  return <Select value={value} options={options} onChange={onChange} />;
};
