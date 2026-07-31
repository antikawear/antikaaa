export default function Background() {
  return (
    <>
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Main glow */}

      <div
        className="
        absolute
        left-1/2
        top-[28%]
        h-300
        w-300
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-[#8B1111]/25
        blur-[260px]
        "
      />

      {/* Left */}

      <div
        className="
        absolute
        -left-75
        top-1/2
        h-175
        w-175
        rounded-full
        bg-[#7A1010]/10
        blur-[220px]
        "
      />

      {/* Right */}

      <div
        className="
        absolute
        -right-75
        top-1/3
        h-175
        w-175
        rounded-full
        bg-[#7A1010]/10
        blur-[220px]
        "
      />

      {/* Vignette */}

      <div
        className="
        absolute
        inset-0
        bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,.92)_100%)]
        "
      />
    </>
  );
}