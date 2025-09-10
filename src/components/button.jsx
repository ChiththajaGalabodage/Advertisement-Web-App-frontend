// src/components/ui/button.jsx
import React from "react";
import clsx from "clsx";

export const Button = ({
  children,
  className,
  variant = "default",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium transition shadow-sm focus:outline-none";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    black: "bg-black text-white hover:bg-gray-800",
    yellow: "bg-yellow-400 text-black hover:bg-yellow-500",
    green: "bg-green-600 text-white hover:bg-green-700",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
