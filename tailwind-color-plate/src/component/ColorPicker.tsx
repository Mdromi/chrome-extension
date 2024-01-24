// ColorPicker.tsx

import React, { useState, useEffect } from "react";
import classNames from "../utils/classNames";
import ColorPickerInput from "./ColorPickerInput";
import ColorPickerDropdown from "./ColorPickerDropdown";

const ColorPicker: React.FC = () => {
  const [currentColor, setCurrentColor] = useState<string>("");
  const [iconColor, setIconColor] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setIconWhite = () => {
    setIconColor("text-white");
  };

  const setIconBlack = () => {
    setIconColor("text-black");
  };

  useEffect(() => {
    setCurrentColor("red-800");
    setIconColor("text-white");
  }, []);

  const selectColor = (className: string) => {
    // Use a regular expression to match color and variant
    const match = className.match(/bg-(\w+)-(\d+)/);

    if (match) {
      const color = match[1]; // Extract color
      const variant = parseInt(match[2], 10); // Extract variant and convert to integer

      setCurrentColor(`${color}-${variant}`);

      if (variant < 500) {
        setIconBlack();
      } else {
        setIconWhite();
      }
    }
  };

  return (
    <div className="mx-auto bg-[#f8f8f8]  p-5">
      <div className="popup-container   bg-[#f5f5f5] rounded-lg shadow-md ">
        <div className="header flex items-center justify-between rounded-lg text-center border-b-2 border-[#eee] p-4">
          <div className="flex items-center justify-between text-center ">
            <img
              src="../assets/icons.png"
              alt="Logo"
              className="logo w-10 h-10 mr-2"
            />
            <h2 className="title text-xl">Your Title</h2>
          </div>
        </div>
        <div className="flex items-center justify-center p-6">
          <div>
            <div>
              <label
                htmlFor="color-picker"
                className="block mb-1 font-semibold"
              >
                Select a color
              </label>
              <ColorPickerInput
                currentColor={currentColor}
                setCurrentColor={setCurrentColor}
                iconColor={iconColor}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
              {isOpen && (
                <ColorPickerDropdown
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  classNames={classNames}
                  selectColor={selectColor}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
