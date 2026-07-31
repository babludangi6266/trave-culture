import React from "react";
import { Link } from "react-router-dom";

export function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  icon: Icon,
  iconPosition = "right",
  disabled = false,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 transform active:scale-95 cursor-pointer focus:outline-none";
  
  const variants = {
    primary: "bg-[#E85D3D] hover:bg-[#B8452E] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-[#0F3D3E] hover:bg-[#082728] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
    accent: "bg-[#F2B84B] hover:bg-[#d99f32] text-[#1A1A1A] font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5",
    outline: "border-2 border-[#E85D3D] text-[#E85D3D] hover:bg-[#E85D3D] hover:text-white dark:border-[#E85D3D] dark:text-[#E85D3D]",
    ghost: "bg-transparent text-[var(--text-primary)] hover:bg-[#E8E2DA]/30 dark:hover:bg-[#2A3333]/50",
    white: "bg-white text-[#1A1A1A] hover:bg-[#FBF7F2] shadow-md hover:shadow-xl hover:-translate-y-0.5"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5 font-semibold"
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="w-5 h-5 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon className="w-5 h-5 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
}
