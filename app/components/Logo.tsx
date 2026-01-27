const Logo = ({ size = 48 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Beautiful gradient for the T */}
        <linearGradient id="tGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb6376" />
          <stop offset="50%" stopColor="#fcb1a6" />
          <stop offset="100%" stopColor="#ffdccc" />
        </linearGradient>
        
        {/* Shadow gradient */}
        <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5d2a42" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#5d2a42" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="24" cy="24" r="22" fill="#5d2a42" />
      
      {/* Inner glow circle */}
      <circle cx="24" cy="24" r="20" fill="url(#shadowGradient)" />
      
      {/* Beautiful letter T with rounded corners */}
      <g transform="translate(24, 24)">
        {/* Horizontal bar of T */}
        <rect
          x="-10"
          y="-8"
          width="20"
          height="6"
          rx="3"
          fill="url(#tGradient)"
        />
        
        {/* Vertical bar of T */}
        <rect
          x="-3"
          y="-8"
          width="6"
          height="16"
          rx="3"
          fill="url(#tGradient)"
        />
        
        {/* Highlight/glow effect */}
        <rect
          x="-10"
          y="-8"
          width="20"
          height="3"
          rx="1.5"
          fill="#fff9ec"
          opacity="0.4"
        />
        <rect
          x="-3"
          y="-8"
          width="6"
          height="4"
          rx="1.5"
          fill="#fff9ec"
          opacity="0.4"
        />
      </g>
    </svg>
  );
};

export default Logo;
