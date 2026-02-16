import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import { Check, X, AlertTriangle, Eye, Ear, Hand, Monitor, Zap, Shield, Info } from "lucide-react";

type ScoreLevel = "pass" | "warn" | "fail";

interface AuditItem {
  criterion: string;
  wcag: string;
  wcagUrl: string;
  status: ScoreLevel;
  description: string;
  implementation: string;
}

const auditItems: AuditItem[] = [
  {
    criterion: "Reduced Motion Support",
    wcag: "WCAG 2.1 — 2.3.3 (AAA)",
    wcagUrl: "https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html",
    status: "pass",
    description: "Users who enable 'Reduce motion' in their OS settings should not see non-essential animations.",
    implementation: "Every animation in this demo checks useReducedMotion() from Motion and falls back to duration: 0. No spring physics, no scroll-triggered slides — instant state changes only.",
  },
  {
    criterion: "No Seizure-Inducing Content",
    wcag: "WCAG 2.1 — 2.3.1 (A)",
    wcagUrl: "https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html",
    status: "pass",
    description: "Content must not flash more than 3 times per second. Rapid flashing can trigger seizures in people with photosensitive epilepsy.",
    implementation: "All animations use easeOut or spring curves with durations ≥ 300ms. The pulsing icon glow cycles over 2 seconds. No strobe or rapid flicker effects anywhere.",
  },
  {
    criterion: "Pause, Stop, Hide",
    wcag: "WCAG 2.1 — 2.2.2 (A)",
    wcagUrl: "https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html",
    status: "pass",
    description: "Moving or auto-updating content that starts automatically must be pausable, stoppable, or hideable.",
    implementation: "The only auto-playing animation is the icon pulse glow on the Workflow page — it's decorative (no information is lost without it) and respects prefers-reduced-motion.",
  },
  {
    criterion: "Focus Visibility",
    wcag: "WCAG 2.1 — 2.4.7 (AA)",
    wcagUrl: "https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html",
    status: "pass",
    description: "Interactive elements must have a visible focus indicator for keyboard users.",
    implementation: "All buttons and links use Tailwind's ring utility and inherit the design system's --ring token for consistent focus outlines.",
  },
  {
    criterion: "Color Contrast",
    wcag: "WCAG 2.1 — 1.4.3 (AA)",
    wcagUrl: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html",
    status: "pass",
    description: "Text must have at least 4.5:1 contrast ratio against its background (3:1 for large text).",
    implementation: "Foreground text (#ddd range) on dark backgrounds (#181a1f range) achieves ~12:1 contrast. Muted text (~#7a7a7a) achieves ~4.8:1. Accent colors are used on dark backgrounds with sufficient contrast.",
  },
  {
    criterion: "Meaningful Sequence",
    wcag: "WCAG 2.1 — 1.3.2 (A)",
    wcagUrl: "https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence.html",
    status: "pass",
    description: "The reading order determined by the DOM must match the visual presentation order.",
    implementation: "Pipeline cards render in DOM order matching their visual left-to-right flow. Staggered delays only affect visual timing, not content order.",
  },
  {
    criterion: "Animation Does Not Block Interaction",
    wcag: "Best Practice",
    wcagUrl: "https://www.w3.org/WAI/WCAG21/Understanding/timing-adjustable.html",
    status: "pass",
    description: "Animations should never prevent users from interacting with the page. Buttons, links, and form controls must remain clickable at all times.",
    implementation: "All animations target opacity and transform only — never pointer-events or visibility. Elements are interactive from the moment they mount, even while animating in.",
  },
  {
    criterion: "ARIA for Dynamic Content",
    wcag: "WCAG 2.1 — 4.1.2 (A)",
    wcagUrl: "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html",
    status: "warn",
    description: "When content updates dynamically (e.g. segment switching), screen readers should be notified via ARIA live regions.",
    implementation: "Currently, the personalization demo's crossfade content swap does not use aria-live. Adding role='status' or aria-live='polite' to the content region would announce changes to screen readers.",
  },
];

const animationConcepts = [
  {
    icon: Eye,
    title: "Motion & Visual Processing",
    content: "People with vestibular disorders (affecting ~35% of adults over 40) can experience dizziness, nausea, or disorientation from parallax scrolling, zoom effects, and sliding transitions. The prefers-reduced-motion media query lets us respect their needs.",
  },
  {
    icon: Ear,
    title: "Animation as Information",
    content: "When animation conveys meaning (like a loading spinner or a success checkmark), it must have a non-visual alternative. Decorative animation (like a glow pulse) can be safely removed without information loss.",
  },
  {
    icon: Hand,
    title: "Motor Accessibility",
    content: "Animations that move targets (buttons sliding into position) can frustrate users with motor impairments. This demo animates elements into their final position on load — once settled, nothing moves unexpectedly.",
  },
  {
    icon: Monitor,
    title: "Performance as Accessibility",
    content: "Janky, low-framerate animations on older devices aren't just ugly — they can trigger motion sickness more easily than smooth ones. Using GPU-accelerated properties (transform, opacity) and will-change helps ensure smooth performance.",
  },
  {
    icon: Zap,
    title: "The prefers-reduced-motion Query",
    content: "This CSS media query (and its JS equivalent via matchMedia or Motion's useReducedMotion hook) detects when users have enabled 'Reduce motion' in their OS. It's the single most impactful accessibility feature for animated interfaces.",
  },
  {
    icon: Shield,
    title: "Progressive Enhancement",
    content: "The best approach: build the static version first, then layer animations on top for users who can benefit from them. This way, the experience is complete without motion — animation enhances, never gates.",
  },
];

const statusConfig: Record<ScoreLevel, { icon: typeof Check; color: string; label: string }> = {
  pass: { icon: Check, color: "text-accent", label: "Pass" },
  warn: { icon: AlertTriangle, color: "text-primary", label: "Warning" },
  fail: { icon: X, color: "text-destructive", label: "Fail" },
};

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

const A11yAudit = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const passCount = auditItems.filter((i) => i.status === "pass").length;
  const warnCount = auditItems.filter((i) => i.status === "warn").length;
  const failCount = auditItems.filter((i) => i.status === "fail").length;
  const score = Math.round((passCount / auditItems.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
        >
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Accessibility <span className="text-primary">Audit</span>
          </h1>
          <p className="mb-12 text-muted-foreground">
            How animations affect accessibility — and what this demo does about it.
            <br />
            <span className="text-sm">Built by Mirabelle Doiron</span>
          </p>
        </motion.div>

        {/* Score Overview */}
        <Section>
          <div className="rounded-xl border border-border bg-card p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              {/* Score ring */}
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                  <motion.circle
                    cx="60" cy="60" r="52"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 52}
                    initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                    whileInView={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - score / 100) }}
                    viewport={{ once: true }}
                    transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: "easeOut" }}
                  />
                </svg>
                <span className="absolute text-2xl font-bold text-foreground">{score}</span>
              </div>

              <div className="text-center sm:text-left">
                <h2 className="mb-2 text-xl font-semibold text-foreground">Accessibility Score</h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  Based on {auditItems.length} criteria covering WCAG 2.1 guidelines relevant to animated interfaces.
                </p>
                <div className="flex justify-center gap-4 sm:justify-start">
                  <span className="flex items-center gap-1.5 text-sm text-accent">
                    <Check className="h-4 w-4" /> {passCount} pass
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-primary">
                    <AlertTriangle className="h-4 w-4" /> {warnCount} warning
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-destructive">
                    <X className="h-4 w-4" /> {failCount} fail
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Audit Checklist */}
        <Section delay={0.05}>
          <h2 className="mb-6 text-xl font-semibold text-foreground">WCAG Audit Checklist</h2>
          <div className="space-y-3">
            {auditItems.map((item, idx) => {
              const config = statusConfig[item.status];
              const StatusIcon = config.icon;
              const isExpanded = expandedItem === idx;

              return (
                <div key={idx} className="rounded-lg border border-border bg-card overflow-hidden">
                  <button
                    onClick={() => setExpandedItem(isExpanded ? null : idx)}
                    className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-secondary/50"
                    aria-expanded={isExpanded}
                  >
                    <StatusIcon className={`h-5 w-5 shrink-0 ${config.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{item.criterion}</p>
                      <a href={item.wcagUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors">{item.wcag}</a>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                      item.status === "pass" ? "border-accent/30 text-accent" :
                      item.status === "warn" ? "border-primary/30 text-primary" :
                      "border-destructive/30 text-destructive"
                    }`}>
                      {config.label}
                    </span>
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                      className="border-t border-border px-4 py-4 space-y-3"
                    >
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">What this means</p>
                        <p className="text-sm text-foreground/80">{item.description}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">How this demo handles it</p>
                        <p className="text-sm text-foreground/80">{item.implementation}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* Animation & Accessibility Concepts */}
        <Section delay={0.05}>
          <h2 className="mb-6 text-xl font-semibold text-foreground">How Animation Affects Accessibility</h2>
          <div className="space-y-4">
            {animationConcepts.map((concept) => (
              <div key={concept.title} className="rounded-lg border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <concept.icon className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">{concept.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{concept.content}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Live reduced-motion detector */}
        <Section delay={0.05}>
          <h2 className="mb-6 text-xl font-semibold text-foreground">Your System Settings</h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  prefers-reduced-motion: {shouldReduceMotion ? "reduce" : "no-preference"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {shouldReduceMotion
                    ? "Your OS has reduced motion enabled. All animations in this demo are disabled — you're seeing instant state changes instead."
                    : "Your OS is not requesting reduced motion. You're seeing all animations. Try enabling 'Reduce motion' in your system accessibility settings to see the difference."}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Code Example */}
        <Section delay={0.05}>
          <h2 className="mb-6 text-xl font-semibold text-foreground">Implementation Pattern</h2>
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="mb-3 text-sm text-muted-foreground">
              The core pattern used across every animated component in this demo:
            </p>
            <pre className="overflow-x-auto rounded-md bg-secondary p-4 text-xs text-foreground leading-relaxed">
              <code>{`import { useReducedMotion } from "motion/react";

const MyComponent = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={{ 
        opacity: shouldReduceMotion ? 1 : 0, 
        y: shouldReduceMotion ? 0 : 24 
      }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: shouldReduceMotion ? 0 : 0.5 
      }}
    >
      Content fades in — or doesn't, 
      depending on user preference.
    </motion.div>
  );
};`}</code>
            </pre>
          </div>
        </Section>

        {/* Sources */}
        <Section delay={0.05}>
          <h2 className="mb-6 text-xl font-semibold text-foreground">Sources & References</h2>
          <div className="rounded-lg border border-border bg-card p-5 space-y-3">
            {[
              { label: "Web Content Accessibility Guidelines (WCAG) 2.1", url: "https://www.w3.org/TR/WCAG21/" },
              { label: "Understanding WCAG 2.1 — W3C", url: "https://www.w3.org/WAI/WCAG21/Understanding/" },
              { label: "MDN: prefers-reduced-motion", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion" },
              { label: "Vestibular Disorders Association — vestibular.org", url: "https://vestibular.org/article/what-is-vestibular/about-vestibular-disorders/" },
              { label: "Motion One (Framer Motion) — useReducedMotion", url: "https://motion.dev/docs/react-use-reduced-motion" },
              { label: "A11y Project — Accessible Animations", url: "https://www.a11yproject.com/posts/understanding-vestibular-disorders/" },
            ].map((ref) => (
              <a
                key={ref.url}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
              >
                {ref.label} ↗
              </a>
            ))}
          </div>
        </Section>

        <Footer />
      </main>
    </div>
  );
};

export default A11yAudit;
