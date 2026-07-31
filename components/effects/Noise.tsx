export default function Noise() {
  return (
    <div
      className="
      absolute
      inset-0
      opacity-[0.035]
      pointer-events-none
      mix-blend-soft-light"
      style={{
        backgroundImage: "url('/textures/noise.png')",
        backgroundRepeat: "repeat",
      }}
    />
  );
}