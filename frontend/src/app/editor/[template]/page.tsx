import { notFound } from "next/navigation";
import { Suspense } from "react";
import EditorShell from "@/components/editor/EditorShell";
import type { TemplateStyle } from "@/types/editor";

const validTemplates: TemplateStyle[] = ["minimal", "startup", "creative", "academic", "developer", "retro"];

export default async function EditorPage({
  params,
}: {
  params: Promise<{ template: string }>;
}) {
  const { template } = await params;
  if (!validTemplates.includes(template as TemplateStyle)) {
    notFound();
  }
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-cream">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
          <p className="mt-4 text-brown/60">Loading editor...</p>
        </div>
      </div>
    }>
      <EditorShell templateStyle={template as TemplateStyle} />
    </Suspense>
  );
}

export function generateStaticParams() {
  return [
    { template: "minimal" },
    { template: "startup" },
    { template: "creative" },
    { template: "academic" },
    { template: "developer" },
    { template: "retro" },
  ];
}
