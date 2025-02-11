export default function BouncingComponent({ text }: { text: string }) {
  return (
    <div
      className="bg-green-400 text-white p-4"
      style={{
        animation: "bounce 2s forwards",
        animationIterationCount: 2,
      }}
    >
      {text}
    </div>
  );
}
