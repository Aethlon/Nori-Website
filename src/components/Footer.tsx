export function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="size-5 rounded-md bg-gradient-to-br from-jade to-teal-deep grid place-items-center">
            <span className="size-1.5 rounded-sm bg-background" />
          </span>
          <span className="font-medium text-foreground/80">nori</span>
          <span className="font-mono text-[11px] ml-2">v0.1.0</span>
        </div>
        <nav className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
          <a href="#" className="hover:text-foreground transition-colors">X / Twitter</a>
          <a href="#" className="hover:text-foreground transition-colors">License</a>
        </nav>
        <div className="font-mono text-[11px]">© 2026 Nori Systems</div>
      </div>
    </footer>
  );
}
