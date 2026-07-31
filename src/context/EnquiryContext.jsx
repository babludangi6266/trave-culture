import React, { createContext, useContext, useState } from "react";
import { EnquiryModal } from "../components/forms/EnquiryModal";

const EnquiryContext = createContext();

export function EnquiryProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    destination: "",
    packageTitle: "",
  });

  const openEnquiryModal = ({ destination = "", packageTitle = "" } = {}) => {
    setModalState({
      isOpen: true,
      destination,
      packageTitle,
    });
  };

  const closeEnquiryModal = () => {
    setModalState({
      isOpen: false,
      destination: "",
      packageTitle: "",
    });
  };

  return (
    <EnquiryContext.Provider value={{ openEnquiryModal, closeEnquiryModal }}>
      {children}
      <EnquiryModal
        isOpen={modalState.isOpen}
        onClose={closeEnquiryModal}
        prefilledDestination={modalState.destination}
        prefilledPackage={modalState.packageTitle}
      />
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return context;
}
