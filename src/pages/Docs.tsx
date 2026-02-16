import { motion, useReducedMotion } from "motion/react";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import { Database, Bot, Megaphone, TrendingUp, Code2, Layers, Zap, Eye } from "lucide-react";

const techStack = [
  { name: "React 18", desc: "Component architecture with hooks and functional patterns" },
  { name: "TypeScript", desc: "Full type safety across the entire codebase" },
  { name: "Motion (Framer Motion)", desc: "Declarative animations — spring physics, layout animations, AnimatePresence" },
  { name: "Tailwind CSS", desc: "Utility-first styling with a custom dark design system" },
  { name: "Vite", desc: "Fast dev server and optimized production builds" },
  { name: "React Router", desc: "Client-side routing with NavLink active states" },
];

const motionPatterns = [
  {
    icon: Eye,
    title: "Scroll-Triggered Animations",
    desc: "Pipeline cards use whileInView with staggered delays and viewport margin detection to animate as the user scrolls.",
    code: `whileInView={{ opacity: 1, y: 0 }}\nviewport={{ once: true, margin: "-80px" }}`,
  },
  {
    icon: Layers,
    title: "AnimatePresence Crossfade",
    desc: "Segment switching uses AnimatePresence with mode='wait' for clean exit → enter transitions with no layout jump.",
    code: `<AnimatePresence mode="wait">\n  <motion.div key={active} exit={{ opacity: 0 }} />\n</AnimatePresence>`,
  },
  {
    icon: Zap,
    title: "Layout Animations",
    desc: "The active segment pill glow uses layoutId for a shared-layout spring animation between pill positions.",
    code: `<motion.div layoutId="pill-glow"\n  transition={{ type: "spring", stiffness: 400 }} />`,
  },
  {
    icon: Code2,
    title: "Reduced Motion Support",
    desc: "Every animation checks useReducedMotion() and falls back to instant transitions, respecting OS accessibility preferences.",
    code: `const shouldReduceMotion = useReducedMotion();\ntransition={{ duration: shouldReduceMotion ? 0 : 0.5 }}`,
  },
];

const pages = [
  {
    title: "AI Workflow Hero",
    route: "/workflow-hero",
    features: [
      "Staggered word-by-word headline fade-up on load",
      "Four pipeline cards with scroll-triggered slide-in and stagger delay",
      "Animated connector lines (scaleX from 0→1)",
      "Pulsing icon glow using infinite keyframe animation",
      "CTA button with hover scale and press feedback",
    ],
    icons: [Database, Bot, Megaphone, TrendingUp],
  },
  {
    title: "Live Personalization Demo",
    route: "/personalization-demo",
    features: [
      "Three-segment pill selector with shared layoutId glow ring",
      "Content crossfade with AnimatePresence (mode='wait')",
      "Offer card slides in from the right with staggered delay",
      "Background tint shifts per segment",
      "Animated metric counters (CTR and Revenue Lift)",
    ],
    icons: [],
  },
];

const Section = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : delay, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};

const Docs = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            How This Was <span className="text-primary">Built</span>
          </h1>
          <p className="mb-12 text-muted-foreground">
            Technical documentation — architecture, patterns, and decisions.
            <br />
            <span className="text-sm">Built by <a href="https://www.mirabelledoiron.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary transition-colors">Mirabelle Doiron</a></span>
          </p>
        </motion.div>

        {/* Context */}
        <Section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">Context</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              This project is an <strong className="text-foreground">original mock</strong> designed to demonstrate employer-side (B2B)
              product experience in the talent acquisition domain.
            </p>
            <p>
              It contains <strong className="text-foreground">no proprietary code, designs, or assets</strong>. All UI and motion patterns are
              implemented from scratch as a portfolio piece.
            </p>
          </div>
        </Section>

        {/* Tech Stack */}
        <Section>
          <h2 className="mb-6 text-xl font-semibold text-foreground">Tech Stack</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {techStack.map((t) => (
              <div
                key={t.name}
                className="rounded-lg border border-border bg-card p-4"
              >
                <p className="mb-1 text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Motion Patterns */}
        <Section delay={0.05}>
          <h2 className="mb-6 text-xl font-semibold text-foreground">Motion Patterns Used</h2>
          <div className="space-y-6">
            {motionPatterns.map((p) => (
              <div key={p.title} className="rounded-lg border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <p.icon className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                </div>
                <p className="mb-3 text-sm text-muted-foreground">{p.desc}</p>
                <pre className="overflow-x-auto rounded-md bg-secondary p-3 text-xs text-foreground">
                  <code>{p.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </Section>

        {/* Page Breakdown */}
        <Section delay={0.05}>
          <h2 className="mb-6 text-xl font-semibold text-foreground">Page Breakdown</h2>
          <div className="space-y-6">
            {pages.map((page) => (
              <div key={page.title} className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-1 text-sm font-semibold text-foreground">{page.title}</h3>
                <p className="mb-3 text-xs text-muted-foreground font-mono">{page.route}</p>
                <ul className="space-y-1.5">
                  {page.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Architecture */}
        <Section delay={0.05}>
          <h2 className="mb-6 text-xl font-semibold text-foreground">Architecture Notes</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Component structure:</strong> Each page is self-contained with 2–3 focused components. Shared UI lives in a design-system layer (shadcn/ui primitives + custom tokens).
            </p>
            <p>
              <strong className="text-foreground">Design system:</strong> All colors are HSL CSS custom properties defined in <code className="rounded bg-secondary px-1.5 py-0.5 text-xs text-foreground">index.css</code> and consumed via Tailwind semantic tokens — no hardcoded colors in components.
            </p>
            <p>
              <strong className="text-foreground">Animation philosophy:</strong> Motion clarifies the story, never decorates. Scroll animations guide attention through the workflow. Segment transitions communicate state change. Every animation has a <code className="rounded bg-secondary px-1.5 py-0.5 text-xs text-foreground">prefers-reduced-motion</code> fallback.
            </p>
            <p>
              <strong className="text-foreground">No backend:</strong> Entirely client-side. Static data, no API calls. Focused purely on interaction design and motion craft.
            </p>
          </div>
        </Section>

        <Footer />
      </main>
    </div>
  );
};

export default Docs;
