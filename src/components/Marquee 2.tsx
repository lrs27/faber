export default function Marquee({ text = "Build Bold, Get Hired." }: { text?: string }) {
  const items = Array(10).fill(text);

  return (
    <div className="overflow-hidden bg-gold py-3">
      <div className="marquee-track flex whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="mx-6 text-sm font-bold uppercase tracking-widest text-cream"
          >
            {item} &nbsp;&#10038;&nbsp;
          </span>
        ))}
        {items.map((item, i) => (
          <span
            key={`dup-${i}`}
            className="mx-6 text-sm font-bold uppercase tracking-widest text-cream"
          >
            {item} &nbsp;&#10038;&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
