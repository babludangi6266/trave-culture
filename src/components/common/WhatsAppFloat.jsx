import React from "react";
import { MessageCircle } from "lucide-react";
import { useEnquiry } from "../../context/EnquiryContext";

export function WhatsAppFloat() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <button
      onClick={() => openEnquiryModal()}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-current stroke-none" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
      </div>
      <span className="font-semibold text-sm hidden sm:inline-block pr-1">
        Quick Enquiry
      </span>
    </button>
  );
}
