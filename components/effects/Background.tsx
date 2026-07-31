export default function Background() {
  return (
    <>
      <div className="absolute inset-0 bg-[#050505]" />

      <div
        className="
        absolute
        left-1/2
        top-[35%]
        h-175
        w-175
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-[#7A1010]/20
        blur-[170px]"
      />

      <div
        className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_center,transparent,black_90%)]
        "
      />
    </>
  );
}