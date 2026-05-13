import { motion } from "framer-motion";

export function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto max-w-6xl px-6 mt-4">
        <div className="flex items-center justify-between rounded-full border hairline bg-background/60 backdrop-blur-xl px-4 py-2.5">
          <a href="#top" className="flex items-center gap-2">
            <span className="size-6 rounded-md bg-gradient-to-br from-jade to-teal-deep grid place-items-center">
              <span className="size-2 rounded-sm bg-background" />
            </span>
            <span className="text-sm font-semibold tracking-tight">nori</span>
            <span className="text-[10px] font-mono text-muted-foreground ml-1">v0.1</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#performance" className="hover:text-foreground transition-colors">Performance</a>
            <a href="#experience" className="hover:text-foreground transition-colors">Experience</a>
            <a href="#download" className="hover:text-foreground transition-colors">Download</a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
            >
              GitHub
            </a>
            <a
              href="#download"
              className="text-sm font-medium px-3.5 py-1.5 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
