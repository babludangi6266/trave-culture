import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, PhoneCall, Compass, Send } from "lucide-react";
import { Button } from "../common/Button";
import { openWhatsAppEnquiry } from "../../lib/whatsapp";
import destinationsData from "../../data/destinations.json";

export function EnquiryModal({ isOpen, onClose, prefilledDestination = "", prefilledPackage = "" }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      destination: prefilledDestination,
      packageTitle: prefilledPackage,
      travelers: "2",
      travelDate: "",
      message: "",
    },
  });

  // Sync prefilled data when modal opens
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setValue("destination", prefilledDestination || "");
      setValue("packageTitle", prefilledPackage || "");
    }
  }, [isOpen, prefilledDestination, prefilledPackage, setValue]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const onSubmit = (data) => {
    openWhatsAppEnquiry(data);
    setSubmitted(true);
    setTimeout(() => {
      reset();
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-xl bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[var(--border-color)] z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-[#E85D3D] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#3C9A6E]/20 text-[#3C9A6E] rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold">
                  Enquiry Submitted!
                </h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                  Your enquiry is opening on WhatsApp. Our travel designer will connect with you immediately.
                </p>
                <div className="pt-4 flex flex-col gap-3">
                  <Button variant="primary" onClick={onClose}>
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border-color)]">
                  <div className="w-10 h-10 rounded-full bg-[#E85D3D] text-white flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold">
                      {prefilledPackage ? `Enquire: ${prefilledPackage}` : "Plan Your Travel Package"}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Fill out your trip preferences and send directly to our WhatsApp concierge.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[#E85D3D] text-[var(--text-primary)]"
                      />
                      {errors.name && (
                        <span className="text-xs text-red-500 mt-1 block">{errors.name.message}</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...register("phone", { required: "Phone number is required" })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[#E85D3D] text-[var(--text-primary)]"
                      />
                      {errors.phone && (
                        <span className="text-xs text-red-500 mt-1 block">{errors.phone.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Destination & Package */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1.5">
                        Destination
                      </label>
                      <select
                        {...register("destination")}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[#E85D3D] text-[var(--text-primary)] cursor-pointer"
                      >
                        <option value="">Select Destination</option>
                        {destinationsData.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name}
                          </option>
                        ))}
                        <option value="Custom Destination">Custom Destination</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1.5">
                        Package Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kashmir Honeymoon"
                        {...register("packageTitle")}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[#E85D3D] text-[var(--text-primary)]"
                      />
                    </div>
                  </div>

                  {/* Date & Travelers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1.5">
                        Travel Month / Date
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Next Month / Oct 15"
                        {...register("travelDate")}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[#E85D3D] text-[var(--text-primary)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1.5">
                        No. of Travelers
                      </label>
                      <select
                        {...register("travelers")}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[#E85D3D] text-[var(--text-primary)] cursor-pointer"
                      >
                        <option value="1">1 Person (Solo)</option>
                        <option value="2">2 Persons (Couple / Honeymoon)</option>
                        <option value="3-5">3 - 5 Persons (Family)</option>
                        <option value="6+">6+ Persons (Group)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1.5">
                      Special Requests / Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need 4-star lake view hotel with private vehicle..."
                      {...register("message")}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[#E85D3D] text-[var(--text-primary)] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full rounded-xl mt-2"
                    disabled={isSubmitting}
                    icon={Send}
                  >
                    Send Details to WhatsApp
                  </Button>

                  <p className="text-[11px] text-center text-[var(--text-secondary)] mt-2">
                    🔒 Direct connection to WhatsApp (+91 62660 07182). Zero spam.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
