import React from "react";
import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
  titleClassName = "",
  light = false
}) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className={`flex flex-col max-w-3xl mb-12 md:mb-16 ${alignmentClasses[align]} ${className}`}
    >
      {eyebrow && (
        <span className={`eyebrow mb-3 tracking-widest ${light ? "text-[#F2B84B]" : "text-[#E85D3D]"}`}>
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className={`font-serif tracking-tight ${light ? "text-white" : "text-[var(--text-primary)]"} ${titleClassName}`}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${light ? "text-white/80" : "text-[var(--text-secondary)]"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
