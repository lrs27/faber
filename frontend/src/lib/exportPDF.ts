export function downloadPdf(templateName: string) {
  const canvas = document.getElementById("editor-canvas");
  if (!canvas) return;

  const clone = canvas.cloneNode(true) as HTMLElement;

  // Strip editor-only UI elements (mirrors exportHtml.ts)
  clone.querySelectorAll("[data-drag-handle]").forEach((el) => el.remove());
  clone.querySelectorAll(".pointer-events-none").forEach((el) => el.remove());
  clone.querySelectorAll("button").forEach((el) => el.remove());
  clone.querySelectorAll("[contenteditable]").forEach((el) => {
    el.removeAttribute("contenteditable");
  });
  clone.querySelectorAll("[data-rbd-draggable-context-id]").forEach((el) => {
    el.removeAttribute("data-rbd-draggable-context-id");
  });
  clone.querySelectorAll("[aria-describedby]").forEach((el) => {
    el.removeAttribute("aria-describedby");
  });
  clone.querySelectorAll(".cursor-pointer").forEach((el) => {
    el.classList.remove("cursor-pointer");
  });
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
    @page { size: A4; margin: 0; }
    @media print {
      html, body { width: 210mm; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
${clone.innerHTML}
<script>
  // Wait for fonts and Tailwind to load before printing
  window.addEventListener('load', function () {
    setTimeout(function () {
      window.print();
      window.close();
    }, 800);
  });
<\/script>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url, "_blank");
  if (printWindow) {
    printWindow.addEventListener("afterprint", () => {
      URL.revokeObjectURL(url);
    });
  } else {
    // Fallback if popup was blocked
    URL.revokeObjectURL(url);
  }
}
