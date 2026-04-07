import CreativeTemplate from "@/components/templates/CreativeTemplate";
import Link from "next/link";

export const metadata = {
  title: "Creative Template — Faber",
  description:
    "Bold, colorful, playful portfolio template for designers, creators, and expressive developers.",
};

export default function CreativePreviewPage() {
  return (
    <div>
      {/* Preview Banner */}
      <div className="sticky top-0 z-50 bg-pink-600 text-cream px-4 py-3 flex items-center justify-between border-b border-pink-700 shadow-md">
        <div className="flex items-center gap-4">
          <Link
            href="/templates"
            className="text-cream/70 hover:text-white transition-colors"
          >
            ← Back to Templates
          </Link>
          <span className="text-pink-300">|</span>
          <span className="font-semibold text-white">
            Creative Template Preview
          </span>
        </div>

        <Link
          href="/signup"
          className="px-5 py-1.5 bg-white text-pink-600 text-sm font-semibold rounded-full hover:bg-white/90 transition-colors"
        >
          Use This Template
        </Link>
      </div>

      {/* Template Preview */}
      <CreativeTemplate />
    </div>
  );
}
