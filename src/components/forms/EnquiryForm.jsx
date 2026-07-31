import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, CheckCircle2, PhoneCall } from "lucide-react";
import { Button } from "../common/Button";
import { openWhatsAppEnquiry } from "../../lib/whatsapp";
import destinationsData from "../../data/destinations.json";

export function EnquiryForm({ prefilledDestination = "", prefilledPackage = "" }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      destination: prefilledDestination,
      packageTitle: prefilledPackage,
      travelers: "2"
    }
  });

  const onSubmit = (data) => {
    openWhatsAppEnquiry(data);
    setSubmitted(true);
    reset();
  };

  return (
    <div className="bg-[var(--bg-surface)] p-8 md:p-10 rounded-3xl border border-[var(--border-color)] shadow-xl relative">
      {submitted ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 bg-[#3C9A6E]/20 text-[#3C9A6E] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
            Enquiry Opening on WhatsApp!
          </h3>
          <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
            If WhatsApp didn't open automatically, please click below to send your pre-filled details to our concierge.
          </p>
          <Button variant="primary" onClick={() => setSubmitted(false)}>
            Submit Another Enquiry
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="border-b border-[var(--border-color)] pb-4 mb-6">
            <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
              Plan Your Dream Trip
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Fill in your preferences to send details directly to our WhatsApp concierge.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2">
                Your Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[#E85D3D] text-[var(--text-primary)]"
              />
              {errors.name && (
                <span className="text-xs text-red-500 mt-1 block">{errors.name.message}</span>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                {...register("phone", { required: "Phone is required" })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[#E85D3D] text-[var(--text-primary)]"
              />
              {errors.phone && (
                <span className="text-xs text-red-500 mt-1 block">{errors.phone.message}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Destination Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2">
                Destination
              </label>
              <select
                {...register("destination")}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[#E85D3D] text-[var(--text-primary)] cursor-pointer"
              >
                <option value="">Select Destination</option>
                {destinationsData.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
                <option value="Other / Customized">Other / Customized</option>
              </select>
            </div>

            {/* No. of Travelers */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2">
                No. of Travelers
              </label>
              <select
                {...register("travelers")}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[#E85D3D] text-[var(--text-primary)] cursor-pointer"
              >
                <option value="1">1 Person (Solo)</option>
                <option value="2">2 Persons (Couple / Honeymoon)</option>
                <option value="3-5">3 - 5 Persons (Family)</option>
                <option value="6+">6+ Persons (Group)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Approximate Travel Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2">
                Approximate Travel Month / Date
              </label>
              <input
                type="text"
                placeholder="e.g. Next Month / October"
                {...register("travelDate")}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[#E85D3D] text-[var(--text-primary)]"
              />
            </div>

            {/* Package (hidden or text) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2">
                Package Interest
              </label>
              <input
                type="text"
                placeholder="Package name (optional)"
                {...register("packageTitle")}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[#E85D3D] text-[var(--text-primary)]"
              />
            </div>
          </div>

          {/* Special Requests / Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2">
              Special Requests / Message
            </label>
            <textarea
              rows={3}
              placeholder="e.g. We prefer 4-star hotels with balcony view and private cab..."
              {...register("message")}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[#E85D3D] text-[var(--text-primary)] resize-none"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full rounded-xl"
            disabled={isSubmitting}
            icon={PhoneCall}
          >
            Send Enquiry on WhatsApp
          </Button>

          <p className="text-[11px] text-center text-[var(--text-secondary)]">
            🔒 Your contact details are safe. We will only use them to send your requested quote.
          </p>
        </form>
      )}
    </div>
  );
}
