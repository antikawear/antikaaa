import Logo from "./Logo";
import Waitlist from "../ui/Waitlist";

export default function Hero() {
  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-3xl">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="mt-10 text-center">
          <h1
            className="
            text-5xl
            font-bold
            tracking-[0.35em]
            text-white
            md:text-7xl
            "
          >
            COMING SOON
          </h1>

          <p
            className="
            mx-auto
            mt-6
            max-w-xl
            text-lg
            leading-8
            text-zinc-400
            "
          >
            Timeless pieces crafted for those who move differently.
          </p>

          <Waitlist />
        </div>
      </div>
    </section>
  );
}
