import React from "react";

interface CheckboxInputProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (newChecked: boolean, e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  description,
  checked,
  onChange,
}) => {
  return (
     <div className="flex items-center mb-0">
        <button
          onClick={(e) => onChange(!checked, e)} // Toggle checkbox state
          className={`w-4 h-4 border-2 rounded flex justify-center items-center ${
            checked ? "bg-black border-white" : "bg-transparent border-gray-400"
          }`}
           style={{ transform: 'translateY(8px)' }}
        >
          {/* SVG pour la coche */}
          {checked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="white"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M16.293 5.293a1 1 0 011.414 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 11.586l7.293-7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <div className="ml-3 flex flex-col justify-center">
          <label className="text-sm font-medium text-white leading-none mt-0">{label}</label>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
    </div>

  );
};

export default CheckboxInput;
