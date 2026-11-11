export default function ErrorBubble({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="max-w-[88%] animate-rise rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-4 py-3">
      <p className="mb-2.5">
        I couldn’t put your Kyoto weekend together just now. Please try again in a moment.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-full border border-neutral-900 px-4 py-2 text-sm font-semibold hover:bg-neutral-100"
      >
        Try again
      </button>
    </div>
  );
}
