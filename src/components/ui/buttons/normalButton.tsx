import type { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonProps = {
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const AnimatedButton = ({
  children,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`
        relative inline-flex items-center justify-center 
        overflow-hidden rounded-lg bg-cyan-600 px-6 py-3 
        font-medium text-white transition-all duration-300ms 
        ease-in-out hover:scale-98 cursor-pointer 
        ${className}
      `}
    >
      <span className="font-bold relative z-10">
        {children}
      </span>

      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
        <span className="absolute -left-[150%] top-0 h-full w-[60%] rotate-12 bg-white/30 blur-md animate-[shine_2.5s_linear_infinite]" />
      </span>
    </button>
  )
}
