import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar, MapPin } from "lucide-react";

export function ItineraryAccordion({ itinerary }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleDay = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {itinerary.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-[var(--border-color)] rounded-2xl overflow-hidden bg-[var(--bg-surface)] transition-shadow hover:shadow-sm"
          >
            {/* Header Button */}
            <button
              onClick={() => toggleDay(idx)}
              className="w-full p-5 flex items-center justify-between text-left font-semibold cursor-pointer focus:outline-none select-none"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                  isOpen ? "bg-[#E85D3D] text-white" : "bg-[var(--bg)] text-[var(--text-primary)] border border-[var(--border-color)]"
                }`}>
                  Day {item.day}
                </div>
                <h4 className="font-serif text-lg text-[var(--text-primary)]">
                  {item.title}
                </h4>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-[#E85D3D]" : ""
                }`}
              />
            </button>

            {/* Expandable Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 border-t border-[var(--border-color)]/40 text-[var(--text-secondary)] text-sm md:text-base leading-relaxed pl-19">
                    <p>{item.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
