import React from "react";

export function Container({ children, className = "", ...props }) {
  return (
    <div className={`container-custom ${className}`} {...props}>
      {children}
    </div>
  );
}
