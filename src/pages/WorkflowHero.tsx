import { motion, useReducedMotion } from "motion/react";
import { Database, Bot, Megaphone, TrendingUp } from "lucide-react";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const headline = "Turn Employer Signals Into Qualified Applicants".split(" ");

const steps = [
  { icon: Database, label: "Employer Signals", desc: "Intent + context" },
  { icon: Bot, label: "Matching Model", desc: "Ranking + relevance" },
  { icon: Megaphone, label: "Sponsored Jobs", desc: "Budget optimization" },
  { icon: TrendingUp, label: "Qualified Applies", desc: "Measured impact" },
];

const WorkflowHero = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const dur = shouldReduceMotion ? 0 : undefined;

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-14">
        <h1 className="mb-6 text-center text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
          {headline.map((word, i) => (
            <motion.span
              key={i}
              className="mr-[0.3em] inline-block last:mr-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur ?? 0.5, delay: shouldReduceMotion ? 0 : i * 0.1, ease: "easeOut" }}
            >
              <span className={i >= headline.length - 2 ? "text-primary" : ""}>{word}</span>
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mb-10 max-w-lg text-center text-lg text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur ?? 0.6, delay: shouldReduceMotion ? 0 : 0.8 }}
        >
          A motion-focused mock of employer-side workflows: from intent signals to better matching and measurable applicant quality.
        </motion.p>

        <motion.button
          className="group relative overflow-hidden rounded-lg px-8 py-3 text-sm font-medium text-primary-foreground bg-primary"
          onClick={() => navigate("/case-study")}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: dur ?? 0.4, delay: shouldReduceMotion ? 0 : 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">Read Context</span>
        </motion.button>
      </section>

      {/* Pipeline */}
      <section className="mx-auto max-w-5xl px-6 pb-32">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.label} className="relative flex items-center">
              <motion.div
                className="flex-1 rounded-xl border border-border bg-card p-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: dur ?? 0.5,
                  delay: shouldReduceMotion ? 0 : i * 0.15,
                  ease: "easeOut",
                }}
              >
                <div className="mb-4 inline-flex rounded-lg bg-secondary p-3">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">{step.label}</h3>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </motion.div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <motion.div
                  className="hidden h-px w-4 bg-border lg:block"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: dur ?? 0.4,
                    delay: shouldReduceMotion ? 0 : i * 0.15 + 0.3,
                    ease: "easeOut",
                  }}
                  style={{ transformOrigin: "left" }}
                />
              )}
            </div>
          ))}
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-6">
        <Footer />
      </div>
    </div>
  );
};

export default WorkflowHero;
