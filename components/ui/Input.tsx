export default function Input() {
  return (
    <input
      type="email"
      placeholder="Enter your email"
      className="
      w-full
      rounded-2xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      px-6
      py-5
      text-white
      placeholder:text-zinc-500
      outline-none
      transition-all
      duration-300
      focus:border-[#A31515]
      "
    />
  );
}