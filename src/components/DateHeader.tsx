export default function DateHeader({ date }: { date: string }) {
  return (
    <div className="w-full flex items-center mt-3">
      <div className="flex-1 border-[#7b3434] border-b"></div>
      <span className="text-center border-[#7b3434] border px-2 py-1 text-sm rounded-sm">
        {date}
      </span>
      <div className="flex-1 border-[#7b3434] border-b"></div>
    </div>
  );
}
