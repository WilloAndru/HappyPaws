import React, { useState } from "react";
import ReactSelect, { SingleValue } from "react-select";

export type OptionType = {
  value: number;
  label: string;
};

type SelectProps = {
  options: OptionType[];
  value?: OptionType;
  onChange?: (option: OptionType) => void;
};

export function Select({ options, value, onChange }: SelectProps) {
  const [selected, setSelected] = useState<OptionType | undefined>(value);

  const handleChange = (option: SingleValue<OptionType>) => {
    if (option) {
      setSelected(option);
      onChange?.(option);
    }
  };

  return (
    <ReactSelect
      value={selected}
      onChange={handleChange}
      options={options}
      isSearchable={false} // No permite buscar opciones escribiendo
      className="w-30"
      //Hacemos la fuente mas pequeña
      styles={{
        control: (base) => ({ ...base, fontSize: "0.9rem" }),
        singleValue: (base) => ({ ...base, fontSize: "0.9rem" }),
        option: (base) => ({ ...base, fontSize: "0.9rem" }),
      }}
    />
  );
}
