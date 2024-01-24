// ColorPickerInput.tsx

import React from "react";

interface ColorPickerInputProps {
  currentColor: string;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
  iconColor: string; // Make sure to replace this type with the actual type of iconColor
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ColorPickerInput: React.FC<ColorPickerInputProps> = ({
  currentColor,
  setCurrentColor,
  iconColor,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className="flex flex-row relative">
      <input
        id="color-picker"
        className="border border-gray-400 p-2 rounded-lg"
        value={currentColor}
        onChange={(e) => setCurrentColor(e.target.value)}
      />
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer rounded-full ml-3 my-auto h-10 w-10 flex bg-${currentColor}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 mx-auto my-auto ${iconColor}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      </div>
    </div>
  );
};

export default ColorPickerInput;
