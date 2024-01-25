// ColorPickerInput.tsx

import React from "react";
import Logo from "./Logo";

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
        <Logo iconColor={iconColor} />
      </div>
    </div>
  );
};

export default ColorPickerInput;
