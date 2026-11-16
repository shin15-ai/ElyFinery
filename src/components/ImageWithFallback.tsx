import React, { useState } from 'react';
import { RibbonBowIcon } from './Ornaments';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F4D9D7] via-[#ECC8C5] to-[#E3B7B4] text-[#6E353B] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <RibbonBowIcon className="w-9 h-6 text-[#9A656B] mb-2 opacity-80" />
        <span className="font-display text-sm italic">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}
