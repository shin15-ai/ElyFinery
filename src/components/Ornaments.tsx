import React from 'react';

export function RibbonBowIcon({ className = 'w-6 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M17.5 11.2C14.8 7.5 8.2 3.8 5.2 6.2C2.8 8.1 5.4 13.4 10.6 13.4C13.5 13.4 16 12.2 17.5 11.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 11.2C21.2 7.5 27.8 3.8 30.8 6.2C33.2 8.1 30.6 13.4 25.4 13.4C22.5 13.4 20 12.2 18.5 11.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="11.2" r="2.2" fill="currentColor" />
      <path
        d="M16.8 13L11.5 21.2M19.2 13L24.5 21.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BowDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 w-full max-w-md mx-auto ${className}`}>
      <span className="h-px flex-1 bg-[#B68488]/60" />
      <RibbonBowIcon className="w-7 h-5 text-[#9A656B] shrink-0" />
      <span className="h-px flex-1 bg-[#B68488]/60" />
    </div>
  );
}

export function SparkleStar({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2L14.1 9.9L22 12L14.1 14.1L12 22L9.9 14.1L2 12L9.9 9.9L12 2Z" />
    </svg>
  );
}

export function BotanicalRoseIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g stroke="#B88388" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
        {/* Main curved stem */}
        <path d="M150 325C142 260 132 195 152 115" />
        <path d="M140 235C110 212 95 182 88 158" />
        <path d="M144 175C168 155 184 135 192 108" />

        {/* Upper blooming rose */}
        <path d="M154 78C144 64 156 46 172 54C185 60 183 80 168 85C153 90 138 78 140 62C143 44 166 36 184 46C201 56 202 82 186 96C168 110 140 105 130 86C120 67 128 40 150 31" />
        <path d="M152 104C135 108 122 95 124 78" />
        <path d="M188 94C198 84 205 68 197 52" />

        {/* Middle smaller rose */}
        <path d="M84 134C78 124 88 112 99 118C108 123 105 137 94 140C82 143 72 133 74 121C77 107 95 102 108 111C120 119 118 139 104 149C90 158 70 151 65 136" />

        {/* Lower right rose */}
        <path d="M184 195C176 184 188 170 200 177C210 182 208 198 196 202C184 206 172 194 175 180C178 164 198 158 212 169" />

        {/* Delicate leaves */}
        <path d="M137 220C115 224 102 238 98 252C116 250 130 238 137 220Z" />
        <path d="M145 262C168 256 184 265 192 278C172 282 156 274 145 262Z" />
        <path d="M120 182C102 178 88 184 78 194C96 198 110 194 120 182Z" />
        <path d="M162 145C178 138 192 141 204 149C188 156 174 155 162 145Z" />
      </g>
    </svg>
  );
}
