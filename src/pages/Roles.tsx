import { Check } from "@mui/icons-material";
import { useState } from "react";

export default function Roles() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-3 items-start p-3 text-[#2E2B2B]">
      <div className="bg-[#2E2B2B] rounded-md shadow-md p-10 flex flex-col gap-3 items-start">
        <button
          className={`text-white bg-green-500 py-1 px-2 hover:bg-green-400 ${
            isClicked && "bg-red-500 hover:bg-red-400"
          }`}
          onClick={() => setIsClicked(!isClicked)}
        >
          <span className="text-sm">{isClicked ? "Cancel" : "Add role"}</span>
        </button>
        {isClicked && (
          <div className="flex gap-1">
            <input
              className="py-2 px-3 border outline-none"
              placeholder="Add Role..."
              type="text"
            />
            <button className="border px-2 text-white bg-green-500 active:bg-green-400">
              <Check />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
