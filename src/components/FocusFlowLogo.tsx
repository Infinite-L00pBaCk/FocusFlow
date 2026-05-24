interface FocusFlowLogoProps {
  size?: number;
}

export function FocusFlowLogo({ size = 36 }: FocusFlowLogoProps) {
  return (
    <span className="focusflow-logo-wrap" style={{ width: size, height: size }} aria-hidden="true">
      <svg
        className="focusflow-logo"
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="focusflowCore" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(21 17) rotate(52) scale(25)">
            <stop stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="0.34" stopColor="#ffb156" stopOpacity="0.94" />
            <stop offset="0.68" stopColor="#f97316" />
            <stop offset="1" stopColor="#ef4444" />
          </radialGradient>
          <linearGradient id="focusflowOrbit" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff7ed" />
            <stop offset="0.38" stopColor="#ff9a3d" />
            <stop offset="0.72" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="focusflowGlass" x1="13" y1="8" x2="36" y2="41" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="0.26" />
            <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.18" />
          </linearGradient>
          <filter id="focusflowGlow" x="-18" y="-18" width="84" height="84" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 1 0 1 0 0 0.45 0 0 1 0 0.18 0 0 0 0.75 0" />
            <feBlend in2="SourceGraphic" mode="screen" />
          </filter>
        </defs>

        <circle cx="24" cy="24" r="21" fill="rgba(255,255,255,0.03)" stroke="url(#focusflowGlass)" strokeWidth="1.4" />
        <circle className="focusflow-logo-orbit" cx="24" cy="24" r="17.5" stroke="url(#focusflowOrbit)" strokeWidth="2.8" strokeLinecap="round" strokeDasharray="63 47" />
        <path d="M13.5 27.5C16.5 18.5 26 14.5 34.5 19.5" stroke="url(#focusflowOrbit)" strokeWidth="2" strokeLinecap="round" opacity="0.72" />
        <path d="M15.5 30.5C20.5 33.5 29.5 32.5 34.5 25.5" stroke="#7dd3fc" strokeWidth="1.4" strokeLinecap="round" opacity="0.42" />
        <circle cx="24" cy="24" r="6.8" fill="url(#focusflowCore)" filter="url(#focusflowGlow)" />
        <circle cx="21.7" cy="21.2" r="2.1" fill="#ffffff" opacity="0.82" />
        <path d="M24 4.5V9" stroke="#ff9a3d" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}
