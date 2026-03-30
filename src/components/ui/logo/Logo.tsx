export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xl font-bold text-white">
        Ivan<span className="text-[#39ff88]">J</span>.dev
      </span>
    </div>
  )
}
