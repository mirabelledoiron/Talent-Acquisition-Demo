import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

type SegmentKey = "new" | "returning" | "highValue";

interface SegmentData {
  label: string;
  headline: string;
  description: string;
  offer: string;
  ctr: number;
  revenueLift: number;
  tint: string;
  glowClass: string;
}

const segments: Record<SegmentKey, SegmentData> = {
  new: {
    label: "New Employer",
    headline: "Launch your first campaign — fast",
    description: "New employer accounts see setup guidance and lightweight defaults to get to value quickly.",
    offer: "Credit toward your first sponsored job",
    ctr: 2,
    revenueLift: 12,
    tint: "hsl(155 35% 45% / 0.05)",
    glowClass: "glow-sage",
  },
  returning: {
    label: "Returning Employer",
    headline: "Welcome back — optimize what’s working",
    description: "Returning employers see recommendations based on job performance, budget, and applicant quality signals.",
    offer: "Suggested budget shift to top-performing jobs",
    ctr: 4,
    revenueLift: 21,
    tint: "hsl(30 75% 55% / 0.05)",
    glowClass: "glow-amber",
  },
  highValue: {
    label: "Enterprise TA",
    headline: "Control, scale, and reporting",
    description: "Enterprise teams get deeper controls, faster iteration loops, and reporting built for stakeholders.",
    offer: "Role-based controls + exportable reporting",
    ctr: 6,
    revenueLift: 28,
    tint: "hsl(18 60% 48% / 0.05)",
    glowClass: "glow-copper",
  },
};

const segmentKeys: SegmentKey[] = ["new", "returning", "highValue"];

const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      key={value}
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="inline-block"
    >
      {value}{suffix}
    </motion.span>
  );
};

const PersonalizationDemo = () => {
  const [active, setActive] = useState<SegmentKey>("new");
  const shouldReduceMotion = useReducedMotion();
  const data = segments[active];

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <motion.div
        className="min-h-screen pt-14"
        animate={{ backgroundColor: data.tint }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
      >
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h1 className="mb-2 text-center text-4xl font-bold tracking-tight sm:text-5xl">
            Live <span className="text-primary">Personalization</span>
          </h1>
          <p className="mb-12 text-center text-muted-foreground">
            Select an employer segment to see how the experience adapts in real time.
          </p>

          {/* Segment pills */}
          <div className="mb-16 flex flex-wrap justify-center gap-3">
            {segmentKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`relative rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  active === key
                    ? "border-primary text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === key && (
                  <motion.div
                    layoutId="pill-glow"
                    className={`absolute inset-0 rounded-full border border-primary ${segments[key].glowClass}`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{segments[key].label}</span>
              </button>
            ))}
          </div>

          {/* Content area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Hero text */}
              <div className="text-center">
                <h2 className="mb-2 text-2xl font-semibold text-foreground sm:text-3xl">
                  {data.headline}
                </h2>
                <p className="text-muted-foreground">{data.description}</p>
              </div>

              {/* Offer card */}
              <motion.div
                className="mx-auto max-w-sm rounded-xl border border-border bg-card p-6"
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.15 }}
              >
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Suggested Next Step
                </p>
                <p className="text-lg font-semibold text-foreground">{data.offer}</p>
              </motion.div>

              {/* Metrics */}
              <div className="flex justify-center gap-12">
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Apply Start Rate</p>
                  <p className="text-3xl font-bold text-foreground">
                    <AnimatedNumber value={data.ctr} suffix="%" />
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Qualified Applies Lift</p>
                  <p className="text-3xl font-bold text-foreground">
                    +<AnimatedNumber value={data.revenueLift} suffix="%" />
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      <div className="mx-auto max-w-3xl px-6">
        <Footer />
      </div>
    </div>
  );
};

export default PersonalizationDemo;
