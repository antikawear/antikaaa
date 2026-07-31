import WaitlistCard from "@/components/ui/WaitlistCard";

export default function Home() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_#fffdfb_0%,_#f4efe9_30%,_#ece0d8_62%,_#e4d8cf_100%)] px-4 py-10 text-[#181818]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(159,25,23,0.05),transparent_28%,rgba(76,52,40,0.04),transparent_72%,rgba(159,25,23,0.03))]" />
      <div className="absolute left-[-8%] top-[-8%] h-72 w-72 rounded-full bg-[#b4332c]/10 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-4%] h-80 w-80 rounded-full bg-[#8a5e4d]/10 blur-3xl" />
      <div className="relative z-10">
        <WaitlistCard />
      </div>
    </main>
  );
}