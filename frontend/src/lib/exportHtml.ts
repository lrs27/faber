export function downloadHtml(templateName: string) {
  const canvas = document.getElementById("editor-canvas");
  if (!canvas) return;

  const clone = canvas.cloneNode(true) as HTMLElement;

  // Strip editor-only UI elements
  clone.querySelectorAll("[data-drag-handle]").forEach((el) => el.remove());
  // Remove hover borders (pointer-events-none border overlays)
  clone.querySelectorAll(".pointer-events-none").forEach((el) => el.remove());
  // Remove add/remove buttons
  clone.querySelectorAll("button").forEach((el) => el.remove());
  // Remove contentEditable attributes
  clone.querySelectorAll("[contenteditable]").forEach((el) => {
    el.removeAttribute("contenteditable");
  });
  // Remove dnd-kit attributes
  clone.querySelectorAll("[data-rbd-draggable-context-id]").forEach((el) => {
    el.removeAttribute("data-rbd-draggable-context-id");
  });
  clone.querySelectorAll("[aria-describedby]").forEach((el) => {
    el.removeAttribute("aria-describedby");
  });
  // Remove cursor-pointer classes from text elements
  clone.querySelectorAll(".cursor-pointer").forEach((el) => {
    el.classList.remove("cursor-pointer");
  });
  // Remove group class (used for hover effects)
  clone.querySelectorAll(".group").forEach((el) => {
    el.classList.remove("group");
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${templateName} Portfolio</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            cream: '#FDF5EC',
            gold: '#C8963E',
            brown: '#8B5E3C',
            'dark-green': '#1B4D3E',
            beige: '#E8DDD3',
            orange: '#FF6B35',
            yellow: '#F7C948',
            blue: '#4169E1',
            'light-blue': '#A8D5E5',
            pink: '#FFB5C2',
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            display: ['Playfair Display', 'serif'],
          },
        },
      },
    }
  <\/script>
  <style>
    body { font-family: 'Inter', sans-serif; background: #FDF5EC; color: #1B4D3E; margin: 0; }
  </style>
</head>
<body>
${clone.innerHTML}
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${templateName}-portfolio.html`;
  a.click();
  URL.revokeObjectURL(url);
}
