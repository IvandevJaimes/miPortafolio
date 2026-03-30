import type { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonProps = {
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const OutlineButton = ({
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
        bg-transparent text-white border border-white/30
        hover:bg-white/10 hover:border-white/50
        ${className}
      `}
    >
      <span className="font-bold relative z-10">
        {children}
      </span>
    </button>
  )
}
