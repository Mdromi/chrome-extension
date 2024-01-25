// ColorPicker.tsx

import React, { useState, useEffect } from "react";
import classNames from "../utils/classNames";
import ColorPickerInput from "./ColorPickerInput";
import ColorPickerDropdown from "./ColorPickerDropdown";
import Logo from "./Logo";

const ColorPicker: React.FC = () => {
  const [currentColor, setCurrentColor] = useState<string>("");
  const [currentHeaderColor, setCurrentHeaderColor] = useState<string>("");
  const [iconColor, setIconColor] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setIconWhite = () => {
    setIconColor("text-white");
  };

  const setIconBlack = () => {
    setIconColor("text-black");
  };

  const getRandomNumber = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const getRandomClass = () => {
    const rowIndex = getRandomNumber(classNames.length);
    const row = classNames[rowIndex];

    const colIndex = getRandomNumber(row.length);
    const randomClass = row[colIndex];

    return randomClass;
  };

  useEffect(() => {
    const randomClass = getRandomClass();
    selectColor(randomClass);
  }, []);

  const selectColor = (className: string) => {
    const match = className.match(/bg-(\w+)-(\d+)/);

    if (match) {
      const color = match[1];
      const variant = parseInt(match[2], 10);

      setCurrentColor(`${color}-${variant}`);
      setCurrentHeaderColor(`bg-${color}-${Math.min(900, variant + 100)}`);

      variant < 500 ? setIconBlack() : setIconWhite();
    }
  };

  return (
    <div className="mx-auto bg-[#f8f8f8]  p-5 rounded-xl">
      <div className="popup-container rounded-xl shadow-xl p-4 ">
        <div
          className={`header flex my-auto items-center justify-between rounded-lg text-center border-b-2 border-[#eee] p-4 ${iconColor} ${currentHeaderColor} rounded-t-lg rounded-none`}
        >
          <div className="flex gap-1 items-center justify-between text-center ">
            <div
              className={`cursor-pointer rounded-full  my-auto h-12 w-12 flex bg-${currentColor}`}
            >
              <Logo iconColor={iconColor} />
            </div>

            <h2 className="title text-lg font-mono">Tailwind Color Plate</h2>
          </div>
        </div>
        <div
          className={`flex items-center justify-center p-6 rounded-xl bg-${currentColor} rounded-tl-none rounded-tr-none rounded-bl-lg`}
        >
          <div className=" bg-slate-50 p-4 rounded-md">
            <label htmlFor="color-picker" className="block mb-1 font-semibold">
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
  );
};

export default ColorPicker;
