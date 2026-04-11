import type { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonProps = {
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const SecondaryButton = ({
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const isDisabled = props.disabled;

  return (
    <button
      {...props}
      className={`
        relative inline-flex items-center justify-center 
        overflow-hidden rounded-lg px-6 py-3 font-medium 
        transition-all duration-300 ease-in-out 
        cursor-pointer 
        bg-transparent text-white 
        border-2 border-[rgba(57,255,136,0.3)]
        ${isDisabled 
          ? "opacity-50 cursor-not-allowed" 
          : "hover:scale-[0.98] hover:border-[#39ff88] hover:bg-[rgba(57,255,136,0.1)] hover:translate-y-[-2px]"
        }
        ${className}
      `}
    >
      <span className="font-bold relative z-10">
        {children}
      </span>
    </button>
  )
}
