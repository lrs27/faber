"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/templates", label: "Templates" },
    { href: "/login", label: "Login" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/portfolio", label: "Portfolio" },
  ];

  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-cream border-b-2 border-dark-green/10">
      {/* Logo / Home link */}
      <Link href="/" className="flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/FaberLogo.png" alt="Faber" className="h-8 select-none" />
      </Link>

      {/* Centered nav links */}
      <div className="flex items-center gap-10">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-semibold tracking-wide uppercase transition-colors ${
              pathname === link.href
                ? "text-gold border-b-2 border-gold pb-0.5"
                : "text-dark-green hover:text-brown"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Spacer to balance the logo on the left */}
      <div className="w-[80px]" />
    </nav>
  );
}
