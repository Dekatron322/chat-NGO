import React from "react"

interface DropdownProps {
  label: string
  options: string[]
  value: string
  onSelect: (option: string) => void
  disabled?: boolean
  isOpen: boolean
  toggleDropdown: () => void
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onSelect,
  disabled = false,
  isOpen,
  toggleDropdown,
}) => {
  return (
    <div className="">
      <label className={`text-sm ${disabled ? "text-gray-500" : "text-[#25396F]"}`}>{label}</label>
      <div
        className={`relative h-[46px] w-full cursor-pointer rounded-lg border border-[#FFFFFF1A] px-3 max-sm:mb-2 ${
          disabled
            ? "cursor-not-allowed bg-transparent opacity-45 " // Disabled styles
            : " border border-gray-200 bg-transparent focus-within:border-[#1B5EED4D] focus-within:bg-[#FBFAFC] hover:border-[#1B5EED4D]"
        }`}
        onClick={() => {
          if (!disabled) toggleDropdown()
        }}
      >
        <div className="flex h-[46px] items-center justify-between">
          <span className={`text-sm ${disabled ? "text-gray-500" : "text-[#25396F]"}`}>
            {value || `Select ${label}`}
          </span>
          <svg
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""} ${
              disabled ? "text-gray-500" : "text-[#25396F]"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-6-6a1 1 0 011.414-1.414L10 9.586l5.293-5.293A1 1 0 0117.707 5.293l-6 6A1 1 0 0110 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {isOpen && !disabled && (
          <div className="border-grey-100 absolute left-0 top-[50px] z-10 w-full rounded-lg border bg-[#ffffff] shadow-lg">
            {options.map((option) => (
              <div
                key={option}
                className={`cursor-pointer px-3 py-2 text-sm text-[#25396F] hover:bg-[#1B5EED4D] ${
                  value === option ? "bg-[#1B5EED4D]" : ""
                }`}
                onClick={() => {
                  onSelect(option)
                  toggleDropdown() // Close the dropdown after selection
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropdown
