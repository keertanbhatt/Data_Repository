interface OfficialBoardLogoProps {
  className?: string
}

export function OfficialBoardLogo({ className = 'h-14 w-14 md:h-16 md:w-16 object-contain' }: OfficialBoardLogoProps) {
  return (
    <img
      src="/images/bocw-logo.png"
      alt="ગુજરાત મકાન અને અન્ય બાંધકામ શ્રમયોગી કલ્યાણ બોર્ડ — Gujarat BOCW Welfare Board"
      className={`shrink-0 ${className}`}
      width={64}
      height={64}
    />
  )
}
