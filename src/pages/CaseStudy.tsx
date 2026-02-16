import { motion, useReducedMotion } from "motion/react";
import { Code2, Palette, Accessibility, Layers, ArrowUpRight } from "lucide-react";
import TopNav from "@/components/TopNav";

const stats = [
  { value: "5+", label: "Motion Patterns" },
  { value: "100%", label: "Type Safety" },
  { value: "4", label: "Optimized Demos" },
];

const stack = [
  { name: "React 18", detail: "Component architecture" },
  { name: "TypeScript", detail: "End-to-end type safety" },
  { name: "Framer Motion", detail: "Scroll, spring & presence APIs" },
  { name: "Tailwind CSS", detail: "HSL semantic token system" },
  { name: "Vite", detail: "Fast builds & HMR" },
  { name: "shadcn/ui", detail: "Accessible primitives" },
];

const narrative = [
  {
    icon: Layers,
    title: "Problem",
    body: "Most frontend portfolios show generic UI. They rarely demonstrate motion engineering and interaction clarity within real product constraints — especially in B2B employer workflows where outcomes and accessibility matter.",
  },
  {
    icon: Palette,
    title: "Approach",
    body: "A custom, original mock in the talent acquisition domain. An editorial dark-theme design system built on amber, copper, and sage HSL tokens — no raw color values anywhere. Motion patterns are isolated and composable: scroll-linked transforms, spring physics, layout animations, and presence transitions. All respect prefers-reduced-motion.",
  },
  {
    icon: Code2,
    title: "Outcome",
    body: "A deployable set of interactive demos that tell a story about craft. Employer-side workflow motion, segment-based personalization, a live design system, and an accessibility audit — all performant and accessible out of the box.",
  },
  {
    icon: Accessibility,
    title: "What This Demonstrates",
    bullets: [
      "Advanced Framer Motion APIs beyond basic animate props",
      "Design-system thinking with HSL token architecture",
      "Accessibility-first motion with useReducedMotion",
      "Component composition and TypeScript throughout",
      "Employer-side (B2B) domain framing in a clean mock",
    ],
  },
];

const CaseStudy = () => {
  const shouldReduceMotion = useReducedMotion();
  const dur = shouldReduceMotion ? 0 : undefined;

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <motion.span
          className="mb-4 inline-block rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur ?? 0.5 }}
        >
          Portfolio Case Study
        </motion.span>

        <motion.h1
          className="mb-4 max-w-2xl text-center text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur ?? 0.6, delay: shouldReduceMotion ? 0 : 0.1 }}
        >
          Talent Acquisition <span className="text-primary">Motion Demos</span>
        </motion.h1>

        <motion.p
          className="mb-10 max-w-lg text-center text-lg text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur ?? 0.5, delay: shouldReduceMotion ? 0 : 0.3 }}
        >
          An original employer-side (B2B) mock showcasing motion engineering, design systems, and accessibility.
        </motion.p>

        <motion.a
          href="https://www.mirabelledoiron.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: dur ?? 0.4, delay: shouldReduceMotion ? 0 : 0.5 }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          View Portfolio
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        {/* Stats Row */}
        <motion.div
          className="mb-20 grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: dur ?? 0.5 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: dur ?? 0.4, delay: shouldReduceMotion ? 0 : i * 0.1 }}
            >
              <div className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stack Grid */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: dur ?? 0.5 }}
        >
          <h2 className="mb-6 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Core Stack
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {stack.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="rounded-xl border border-border bg-card p-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: dur ?? 0.4, delay: shouldReduceMotion ? 0 : i * 0.06 }}
              >
                <div className="text-sm font-semibold text-foreground">{tech.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{tech.detail}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Narrative Sections */}
        <div className="mb-20 space-y-8">
          {narrative.map((section, i) => (
            <motion.div
              key={section.title}
              className="rounded-xl border border-border bg-card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: dur ?? 0.5, delay: shouldReduceMotion ? 0 : i * 0.08 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-secondary p-2.5">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
              </div>

              {"body" in section && (
                <p className="text-sm leading-relaxed text-muted-foreground">{section.body}</p>
              )}

              {"bullets" in section && (
                <ul className="space-y-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
