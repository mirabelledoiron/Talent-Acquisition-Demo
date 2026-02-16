import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import TopNav from "@/components/TopNav";

const Index = () => {
  const shouldReduceMotion = useReducedMotion();
  const dur = shouldReduceMotion ? 0 : undefined;

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-24">
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur ?? 0.5, ease: "easeOut" }}
          className="mb-14"
        >
          <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Talent Acquisition <span className="text-primary">Motion Demos</span>
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            An original, custom mock built to demonstrate employer-side (B2B) product experience — motion engineering,
            interaction patterns, and accessibility.
            <span className="block mt-2 text-sm">
              Built using the <a
                href="https://www.atelierdesignsystem.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-primary transition-colors"
              >
                Atelier Design System
              </a>{" "}
              to follow the same workflow this demo is designed for.
            </span>
            <span className="block text-sm mt-2">
              No proprietary code, designs, or assets.
            </span>
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <a
            href="https://www.atelierdesignsystem.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-primary transition-colors"
          >
            Atelier Design System
          </a>
          <span aria-hidden className="text-muted-foreground/60">•</span>
          <a
            href="https://storybook.atelierdesignsystem.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-primary transition-colors"
          >
            Storybook
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur ?? 0.5, delay: shouldReduceMotion ? 0 : 0.05, ease: "easeOut" }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h2 className="mb-2 text-base font-semibold text-foreground">Workflow Hero</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Scroll-triggered pipeline reveal and a hero sequence framed around employer signals → qualified applicants.
            </p>
            <Link
              to="/workflow-hero"
              className="inline-flex items-center rounded-lg bg-secondary px-4 py-2 text-sm text-foreground hover:bg-secondary/80 transition-colors"
            >
              Open demo
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur ?? 0.5, delay: shouldReduceMotion ? 0 : 0.1, ease: "easeOut" }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h2 className="mb-2 text-base font-semibold text-foreground">Personalization</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Segment-based crossfade transitions for employer experiences and performance metrics.
            </p>
            <Link
              to="/personalization-demo"
              className="inline-flex items-center rounded-lg bg-secondary px-4 py-2 text-sm text-foreground hover:bg-secondary/80 transition-colors"
            >
              Open demo
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
