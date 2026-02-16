import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

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
            <span className="block text-sm mt-2">
              No proprietary code, designs, or assets.
            </span>
          </p>
        </motion.div>

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

        <div className="mt-10">
          <Link
            to="/case-study"
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Read the case study →
          </Link>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Index;
