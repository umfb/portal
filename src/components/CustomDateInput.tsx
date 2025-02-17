import React from "react";

interface CustomDateInputProps {
  value?: string;
  onClick: () => void;
}

const CustomDateInput = React.forwardRef<HTMLDivElement, CustomDateInputProps>(
  ({ onClick }, ref) => (
    <div
      onClick={onClick}
      ref={ref}
      className="flex items-center gap-2 cursor-pointer px-3 py-2 border rounded bg-white text-black"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h18"></path>
        <path d="M7 12h10"></path>
        <path d="M10 18h4"></path>
      </svg>
      <span>{"Filter"}</span>
    </div>
  )
);

export default CustomDateInput;
