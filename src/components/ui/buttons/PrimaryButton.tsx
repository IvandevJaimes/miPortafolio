import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton = ({
  children,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`
        relative inline-flex items-center justify-center 
        overflow-hidden rounded-lg px-6 py-3 font-medium 
        transition-all duration-300 ease-in-out 
        hover:scale-[0.98] cursor-pointer 
        bg-gradient-to-r from-[#39ff88] to-[#00ff9c] text-[#020617]
        hover:shadow-[0_8px_30px_rgba(57,255,136,0.3)] hover:translate-y-[-2px]
        ${className}
      `}
    >
      <span className="font-bold relative z-10 ">{children}</span>

      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
        <span className="absolute -left-[150%] top-0 h-full w-[60%] rotate-12 bg-white/50 blur-md animate-[shine_2.5s_linear_infinite]" />
      </span>
    </button>
  );
};
