import Image from "next/image";
export default function PortfolioCard() {
  return (
    <div className="relative">
      {/* AI Score sticker */}
      <div className="absolute -top-4 -right-4 z-10 bg-gold rounded-full px-4 py-2 border-2 border-gold/80 shadow-md rotate-6">
        <span className="text-sm font-bold text-dark-green">
          AI Score: 92
        </span>
      </div>

      {/* Drag & drop sticker */}
      <div className="absolute -bottom-3 -left-4 z-10 bg-brown rounded-full px-4 py-1.5 border-2 border-pink/80 shadow-md -rotate-6">
        <span className="text-xs font-bold text-dark-green">
          drag &amp; drop
        </span>
      </div>

      {/* Card with blue border — tilted */}
      <div
        className="relative rounded-2xl border-[6px] border-blue p-3 bg-white shadow-[8px_8px_0_rgba(0,0,0,0.2)]"
        style={{ transform: "rotate(-3deg)" }}
      >
        {/* Inner card content */}
        <div className="rounded-xl overflow-hidden bg-white w-[280px] md:w-[320px]">
          {/* Banner gradient */}
          <div className="h-40 bg-gradient-to-br from-pink/60 to-orange/40 flex items-center justify-center">
            <span className="text-4xl font-bold text-white/80 tracking-widest">
              <img
                src="/portfoliosamplephoto.jpg"
                alt="Portfolio Placeholder"
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
            </span>
          </div>

          {/* Info */}
          <div className="px-4 py-3">
            <h3 className="text-lg font-bold text-dark-green">Myles Miller</h3>
            <p className="text-sm text-brown/70">Full Stack Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
