// ColorPickerDropdown.tsx

import React from "react";

interface ColorPickerDropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  classNames: string[][];
  selectColor: (className: string) => void;
}

const ColorPickerDropdown: React.FC<ColorPickerDropdownProps> = ({
  isOpen,
  setIsOpen,
  classNames,
  selectColor,
}) => {
  return (
    <div
      onClick={() => setIsOpen(false)}
      data-x-show="isOpen"
      data-x-transition:enter="transition ease-out duration-100 transform"
      data-x-transition:enter-start="opacity-0 scale-95"
      data-x-transition:enter-end="opacity-100 scale-100"
      data-x-transition:leave="transition ease-in duration-75 transform"
      data-x-transition:leave-start="opacity-100 scale-100"
      data-x-transition:leave-end="opacity-0 scale-95"
      className="border border-gray-300 origin-top-right  mt-2 rounded-md shadow-lg"
    >
      <div className="rounded-md bg-white shadow-xs p-2 overflow-auto">
        <div className="flex gap-1">
          {classNames.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-1">
              {column.map((className, rowIndex) => (
                <div
                  key={`${columnIndex}-${rowIndex}`}
                  onClick={() => selectColor(className)}
                  className={`cursor-pointer w-6 h-6 rounded-full ${className}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPickerDropdown;
