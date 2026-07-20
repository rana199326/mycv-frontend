// RadioInput.tsx
interface RadioInputProps {
  name: string;
  options: {
    label: string;
    value: string;
    description?: string;
  }[];
  selected: string;
  onChange: (value: string) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({
  name,
  options,
  selected,
  onChange
}) => {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.value} className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          <div className="ml-3">
            <label className="text-sm font-medium text-gray-900">
              {option.label}
            </label>
            {option.description && (
              <p className="text-sm text-gray-500">{option.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RadioInput