export default function ThinkingBubble() {
  return (
    <div
      role="status"
      aria-label="Thinking"
      className="flex w-fit animate-rise gap-1.5 rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-4 py-3"
    >
      {[0, 1, 2].map((i) => (
        <i
          key={i}
          className="size-2 animate-pulse-dot rounded-full bg-neutral-400"
          style={{ animationDelay: `${i * 180}ms` }}
        />
      ))}
    </div>
  );
}
