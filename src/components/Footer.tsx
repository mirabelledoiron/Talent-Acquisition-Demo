import { motion, useReducedMotion } from "motion/react";

const Footer = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.footer
      className="border-t border-border pt-8 pb-12 text-center text-xs text-muted-foreground"
      initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
    >
      <div>
        Built by{" "}
        <motion.a
          href="https://www.mirabelledoiron.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block text-foreground underline underline-offset-2 transition-colors hover:text-primary"
          whileHover={shouldReduceMotion ? {} : { y: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Mirabelle Doiron
        </motion.a>
      </div>
      <div className="mt-2">
        Original mock built to demonstrate employer-side (B2B) product experience — no proprietary code, designs, or assets.
      </div>
    </motion.footer>
  );
};

export default Footer;
