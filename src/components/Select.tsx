"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { SingleValue } from "react-select";

export type OptionType = {
  value: number;
  label: string;
};

const ReactSelect = dynamic(() => import("react-select"), {
  ssr: false,
}) as unknown as typeof import("react-select").default;

type SelectProps = {
  options: OptionType[];
  value?: OptionType;
  onChange?: (option: OptionType) => void;
};

export function Select({ options, value, onChange }: SelectProps) {
  const [selected, setSelected] = useState<OptionType | undefined>(value);

  const handleChange = (option: SingleValue<OptionType>) => {
    if (!option) return;
    setSelected(option);
    onChange?.(option);
  };

  return (
    <ReactSelect<OptionType, false>
      value={selected}
      onChange={handleChange}
      options={options}
      isMulti={false}
      isSearchable={false}
      className="w-auto"
      styles={{
        control: (base) => ({ ...base, fontSize: "0.9rem" }),
        singleValue: (base) => ({ ...base, fontSize: "0.9rem" }),
        option: (base) => ({ ...base, fontSize: "0.9rem" }),
      }}
    />
  );
}
