import AcademicTemplate from "@/components/templates/AcademicTemplate";
import Link from "next/link";

export const metadata = {
  title: "Academic Template — Faber",
  description: "Professional, research-focused portfolio template for college students and academics.",
};

export default function AcademicPreviewPage() {
  return (
    <div>
      {/* Preview Banner */}
      <div className="sticky top-0 z-50 bg-dark-green text-cream px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/templates" className="text-cream/70 hover:text-cream transition-colors">
            ← Back to Templates
          </Link>
          <span className="text-cream/50">|</span>
          <span className="font-semibold">Academic Template Preview</span>
        </div>
        <Link
          href="/signup"
          className="px-5 py-1.5 bg-gold text-dark-green text-sm font-semibold rounded-full hover:bg-gold/90 transition-colors"
        >
          Use This Template
        </Link>
      </div>

      {/* Template Preview */}
      <AcademicTemplate />
    </div>
  );
}
