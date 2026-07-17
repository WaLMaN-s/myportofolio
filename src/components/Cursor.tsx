export default function Cursor({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`cursor-blink inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-accent ${className}`}
    />
  );
}
