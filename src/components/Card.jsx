// src/components/ui/card.jsx
import React from "react";
import clsx from "clsx";

export const Card = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }) => {
  return <div className={clsx("p-4", className)}>{children}</div>;
};
