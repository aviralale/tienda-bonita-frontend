import React, { useState, useRef, useEffect } from "react";

interface SimpleDropdownProps {
  options: string[];
  defaultOption?: string;
  onChange?: (selected: string) => void;
  buttonClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
}

export const NavDropdown: React.FC<SimpleDropdownProps> = ({
  options,
  defaultOption,
  onChange,
  buttonClassName = "",
  menuClassName = "",
  itemClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(defaultOption || options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        style={{
          padding: "8px 16px",
        }}
        className={`flex items-center justify-between w-full bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none ${buttonClassName}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <svg
          style={{
            marginLeft: "8px",
            marginRight: "-4px",
          }}
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            marginTop: "8px",
          }}
          className={`absolute left-0 w-full origin-top-right bg-white rounded-3xl ring-1 ring-black ring-opacity-5 focus:outline-none z-10 ${menuClassName}`}
        >
          <div style={{ padding: "4px 0" }}>
            {options.map((option) => (
              <div
                key={option}
                style={{
                  padding: "8px 16px",
                }}
                className={`block text-sm text-gray-700 cursor-pointer hover:bg-gray-100 ${
                  selected === option ? "bg-gray-50 font-medium" : ""
                } ${itemClassName}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
