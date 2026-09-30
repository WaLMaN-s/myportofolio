import Cursor from "./Cursor";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-10 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-sm text-foreground">
          walman@portfolio:<span className="rainbow-ink">~$</span>{" "}
          <Cursor />
        </p>
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} Walman Ss — powered by Linux
        </p>
      </div>
    </footer>
  );
}
