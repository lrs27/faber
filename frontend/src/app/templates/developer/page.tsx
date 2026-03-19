import DeveloperTemplate from "@/components/templates/DeveloperTemplate";
import Link from "next/link";

export const metadata = {
  title: "Developer Template — Faber",
  description: "Terminal-inspired, dark mode portfolio template for developers, engineers, and UI/UX professionals.",
};

export default function DeveloperPreviewPage() {
  return (
    <div>
      {/* Preview Banner */}
      <div className="sticky top-0 z-50 bg-[#161b22] text-[#c9d1d9] px-4 py-3 flex items-center justify-between border-b border-[#30363d]">
        <div className="flex items-center gap-4">
          <Link href="/templates" className="text-[#8b949e] hover:text-[#58a6ff] transition-colors">
            ← Back to Templates
          </Link>
          <span className="text-[#30363d]">|</span>
          <span className="font-semibold text-white">Developer Template Preview</span>
        </div>
        <Link
          href="/signup"
          className="px-5 py-1.5 bg-[#238636] text-white text-sm font-semibold rounded-full hover:bg-[#2ea043] transition-colors"
        >
          Use This Template
        </Link>
      </div>

      {/* Template Preview */}
      <DeveloperTemplate />
    </div>
  );
}
