"use client"

import Image from "next/image"

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <Image
        src="/images/logo.png"
        alt="Core Analytics Logo"
        width={size}
        height={size}
        className="w-full h-full object-contain"
        priority
        quality={100}
      />
    </div>
  )
}
