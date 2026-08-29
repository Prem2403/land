import { motion } from 'framer-motion';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 36, showText = true, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.div
        initial={{ rotate: -8, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative grid place-items-center rounded-xl"
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(135deg, #0B5D3B, #146C43)',
          boxShadow: '0 4px 14px rgba(11,93,59,0.30)',
        }}
      >
        <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Land parcel */}
          <path
            d="M4 14.5L8.5 9.5L12.5 12L20 5.5"
            stroke="#E8F5EE"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <path
            d="M4 14.5V19.5H20V5.5"
            stroke="#E8F5EE"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          {/* AI circuit nodes */}
          <circle cx="8.5" cy="9.5" r="1.4" fill="#2E9B68" />
          <circle cx="12.5" cy="12" r="1.4" fill="#2E9B68" />
          <circle cx="20" cy="5.5" r="1.4" fill="#2E9B68" />
          {/* Map pin */}
          <path
            d="M14.5 14.2C14.5 15.4 12.8 17.6 12 18.5C11.2 17.6 9.5 15.4 9.5 14.2C9.5 12.9 10.6 11.9 12 11.9C13.4 11.9 14.5 12.9 14.5 14.2Z"
            fill="#FFFFFF"
            stroke="#087F5B"
            strokeWidth="1"
          />
          <circle cx="12" cy="14.2" r="1.1" fill="#087F5B" />
        </svg>
      </motion.div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-heading text-[15px] font-700 tracking-tight text-ink">
            LANDVISION
          </span>
          <span className="font-heading text-[15px] font-700 tracking-tight text-brand-dark">
            AI
          </span>
        </div>
      )}
    </div>
  );
}
