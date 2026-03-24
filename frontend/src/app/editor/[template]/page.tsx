import { notFound } from "next/navigation";
import EditorShell from "@/components/editor/EditorShell";
import type { TemplateStyle } from "@/types/editor";

const validTemplates: TemplateStyle[] = ["minimal", "startup", "creative"];

export default async function EditorPage({
  params,
}: {
  params: Promise<{ template: string }>;
}) {
  const { template } = await params;
  if (!validTemplates.includes(template as TemplateStyle)) {
    notFound();
  }
  return <EditorShell templateStyle={template as TemplateStyle} />;
}

export function generateStaticParams() {
  return [{ template: "minimal" }, { template: "startup" }, { template: "creative" }];
}
