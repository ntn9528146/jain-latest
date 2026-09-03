import React from 'react';

export default function Button({ children, type = "button", variant = "primary", className = "", ...props }) {
  const baseStyle = "w-full py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 focus:ring-indigo-500",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-400",
    outline: "border border-slate-300 hover:bg-slate-50 text-slate-700 focus:ring-indigo-500"
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
