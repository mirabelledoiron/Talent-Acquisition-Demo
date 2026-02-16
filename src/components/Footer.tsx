import { motion, useReducedMotion } from "motion/react";

const Footer = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.footer
      className="pt-12 pb-12 text-center text-xs text-muted-foreground"
      initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
    >
      <div className="space-y-1.5">
        <div>
          Built by{" "}
          <motion.a
            href="https://www.mirabelledoiron.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block text-foreground transition-colors hover:text-primary"
            whileHover={shouldReduceMotion ? {} : { y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Mirabelle Doiron
          </motion.a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span className="text-muted-foreground">Design system:</span>
          <motion.a
            href="https://www.atelierdesignsystem.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-foreground/90 underline underline-offset-2 transition-colors hover:text-primary"
            whileHover={shouldReduceMotion ? {} : { y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Atelier
          </motion.a>
          <span aria-hidden className="text-muted-foreground/60">•</span>
          <motion.a
            href="https://storybook.atelierdesignsystem.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-foreground/90 underline underline-offset-2 transition-colors hover:text-primary"
            whileHover={shouldReduceMotion ? {} : { y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Storybook
          </motion.a>
        </div>

        <div className="pt-1">
          Original mock built to demonstrate employer-side (B2B) product experience — no proprietary code, designs, or assets.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
