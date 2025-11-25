type SelectProps = {
  list: number[];
  value: number;
  onChange: (v: number) => void;
};

export function Select({ list, value, onChange }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="
        border border-gray-300 rounded-md bg-white
        text-sm p-2 pr-6
        shadow-sm cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {list.map((q) => (
        <option key={q} value={q} className="text-gray-700 text-sm bg-white">
          {q} units
        </option>
      ))}
    </select>
  );
}
