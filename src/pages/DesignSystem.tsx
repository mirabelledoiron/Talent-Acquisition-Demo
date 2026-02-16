import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import { Palette, Component, Layers, Rocket } from "lucide-react";

/* ── Section data ──────────────────────────────────── */

interface SystemLayer {
  icon: typeof Palette;
  title: string;
  subtitle: string;
  visual: React.ReactNode;
  code: string;
  file: string;
}

const TokenSwatch = ({ label, value, hsl }: { label: string; value: string; hsl: string }) => (
  <div className="flex items-center gap-3">
    <div className="h-8 w-8 rounded-md border border-border" style={{ background: `hsl(${hsl})` }} />
    <div>
      <p className="text-xs font-semibold text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground font-mono">{value}</p>
    </div>
  </div>
);

const layers: SystemLayer[] = [
  {
    icon: Palette,
    title: "Tokens",
    subtitle: "The foundation — colors, spacing, and type scales defined as CSS custom properties.",
    visual: (
      <div className="space-y-3">
        <TokenSwatch label="Background" value="--background" hsl="220 15% 8%" />
        <TokenSwatch label="Primary (Amber)" value="--primary" hsl="30 75% 55%" />
        <TokenSwatch label="Accent (Sage)" value="--accent" hsl="155 35% 45%" />
        <TokenSwatch label="Copper" value="--warm-copper" hsl="18 60% 48%" />
        <TokenSwatch label="Muted" value="--muted-foreground" hsl="220 8% 52%" />
      </div>
    ),
    code: `/* src/index.css */
:root {
  --background: 220 15% 8%;
  --foreground: 40 10% 88%;
  --card: 220 14% 11%;
  --primary: 30 75% 55%;
  --primary-foreground: 220 15% 8%;
  --secondary: 220 12% 16%;
  --muted: 220 10% 15%;
  --muted-foreground: 220 8% 52%;
  --accent: 155 35% 45%;
  --border: 220 12% 19%;
  --ring: 30 75% 55%;
  --warm-amber: 30 75% 55%;
  --warm-copper: 18 60% 48%;
  --warm-sage: 155 35% 45%;
}`,
    file: "src/index.css",
  },
  {
    icon: Component,
    file: "src/components/ui/button.tsx",
    title: "Components",
    subtitle: "Reusable primitives styled with semantic tokens — never raw color values.",
    visual: (
      <div className="space-y-3">
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90">
          Primary Button
        </button>
        <button className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80">
          Secondary Button
        </button>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm font-semibold text-foreground">Card Component</p>
          <p className="text-xs text-muted-foreground mt-1">Uses --card and --border tokens</p>
        </div>
      </div>
    ),
    code: `/* src/components/ui/button.tsx */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 
   rounded-md text-sm font-medium 
   ring-offset-background transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground 
           hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground 
           hover:bg-secondary/80",
        outline:
          "border border-input bg-background 
           hover:bg-accent",
        ghost:
          "hover:bg-accent 
           hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);`,
  },
  {
    icon: Layers,
    file: "src/pages/DesignSystem.tsx",
    title: "Motion Patterns",
    subtitle: "Scroll-triggered reveals, crossfades, and spring physics — all respecting reduced motion.",
    visual: (
      <div className="space-y-3">
        <div className="rounded-lg border border-border bg-secondary/50 p-3">
          <p className="text-xs font-mono text-primary">whileInView</p>
          <p className="text-xs text-muted-foreground mt-1">Fade + slide as user scrolls into view</p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/50 p-3">
          <p className="text-xs font-mono text-primary">AnimatePresence</p>
          <p className="text-xs text-muted-foreground mt-1">Clean exit → enter with mode="wait"</p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/50 p-3">
          <p className="text-xs font-mono text-primary">useReducedMotion</p>
          <p className="text-xs text-muted-foreground mt-1">Instant transitions for vestibular safety</p>
        </div>
      </div>
    ),
    code: `/* src/pages/DesignSystem.tsx — RevealSection */
const { scrollYProgress } = useScroll({
  target: ref,
  offset: index === 0
    ? ["start 0.6", "center 0.3"]
    : ["start end", "center center"],
});

const codeX = useTransform(
  scrollYProgress, [0, 1],
  shouldReduceMotion
    ? ["0%", "0%"]
    : [index === 0 ? "100%" : "80%", "0%"]
);

<motion.div style={{ x: codeX }}>
  <pre className="rounded-xl border border-border 
    bg-secondary p-5 text-sm font-mono">
    <code>{layer.code}</code>
  </pre>
</motion.div>`,
  },
  {
    icon: Rocket,
    file: "src/pages/WorkflowHero.tsx",
    title: "The Product",
    subtitle: "Tokens + components + motion patterns compose into polished, accessible interfaces.",
    visual: (
      <div className="space-y-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-3 w-3 rounded-full bg-accent" />
            <p className="text-xs font-semibold text-foreground">Pipeline Active</p>
          </div>
          <div className="space-y-2">
            {["Collect", "Enrich", "Score", "Activate"].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">{step}</span>
                <div className="ml-auto h-1 flex-1 max-w-[60px] rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: "100%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    code: `/* src/pages/WorkflowHero.tsx — Pipeline */
{steps.map((step, i) => (
  <motion.div
    key={step.label}
    className="rounded-xl border border-border 
      bg-card p-6"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{
      duration: dur ?? 0.5,
      delay: shouldReduceMotion ? 0 : i * 0.15,
      ease: "easeOut",
    }}
  >
    <div className="mb-4 inline-flex rounded-lg 
      bg-secondary p-3">
      <step.icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-sm font-semibold">
      {step.label}
    </h3>
    <p className="text-xs text-muted-foreground">
      {step.desc}
    </p>
  </motion.div>
))}`,
  },
];

/* ── Scroll-linked code reveal ──────────────────────── */

const RevealSection = ({
  layer,
  index,
}: {
  layer: SystemLayer;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: index === 0 ? ["start 0.6", "center 0.3"] : ["start end", "center center"],
  });

  // Code panel slides from right (100%) to position (0%)
  const codeX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : [index === 0 ? "100%" : "80%", "0%"]);
  const codeOpacity = useTransform(scrollYProgress, [0, 0.6, 1], shouldReduceMotion ? [1, 1, 1] : [0, 0.3, 1]);

  const Icon = layer.icon;

  return (
    <div ref={ref} className="relative grid gap-8 py-20 md:grid-cols-2 md:gap-12">
      {/* Left: visual */}
      <motion.div
        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.05 }}
      >
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Layer {index + 1}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{layer.title}</h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{layer.subtitle}</p>
        <div className="rounded-xl border border-border bg-card p-5">
          {layer.visual}
        </div>
      </motion.div>

      {/* Right: code — slides in from right on scroll */}
      <motion.div
        style={{ x: codeX }}
        className="relative"
      >
        <div className="sticky top-28">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-1">
              <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-primary/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-accent/60" />
            </div>
            <span className="text-xs text-muted-foreground font-mono ml-2">{layer.file}</span>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-border bg-secondary p-5 text-sm leading-relaxed text-[hsl(40_10%_88%)] font-mono">
            <code>{layer.code}</code>
          </pre>
        </div>
      </motion.div>
    </div>
  );
};

/* ── Page ─────────────────────────────────────────── */

const DesignSystem = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      <TopNav />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-14 left-0 right-0 z-40 h-0.5 origin-left bg-primary"
        style={{ scaleX }}
      />

      <main className="mx-auto max-w-4xl px-6 pb-24 pt-24">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Design System <span className="text-primary">in Motion</span>
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Scroll to reveal the code behind each layer — from raw tokens to the finished product.
            The code panel slides in as you scroll.
          </p>
        </motion.div>

        {/* Layer sections */}
        <div className="divide-y divide-border">
          {layers.map((layer, i) => (
            <RevealSection key={layer.title} layer={layer} index={i} />
          ))}
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default DesignSystem;
