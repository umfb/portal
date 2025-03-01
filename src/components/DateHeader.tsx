export default function DateHeader({ date }: { date: string }) {
  return (
    <div className="w-full flex items-center mt-3">
      <div className="flex-1 border-[#800] border-b"></div>
      <span className="text-center border-[#800] border-1 px-2 py-1 text-sm rounded-sm text-[#2e2e33]">
        {date}
      </span>
      <div className="flex-1 border-[#800] border-b"></div>
    </div>
  );
}
