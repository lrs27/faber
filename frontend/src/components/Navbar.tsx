"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]); // Re-check on route change

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    router.push("/");
  };

  const links = [
    { href: "/templates", label: "Templates" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/portfolio", label: "Portfolio" },
  ];

  return (
    <>
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
          
          {/* Login/Logout button */}
          {isLoggedIn ? (
            <button
              onClick={() => setShowLogoutModal(true)}
              className="text-sm font-semibold tracking-wide uppercase transition-colors text-dark-green hover:text-brown"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className={`text-sm font-semibold tracking-wide uppercase transition-colors ${
                pathname === "/login"
                  ? "text-gold border-b-2 border-gold pb-0.5"
                  : "text-dark-green hover:text-brown"
              }`}
            >
              Login
            </Link>
          )}
        </div>

        {/* Spacer to balance the logo on the left */}
        <div className="w-[80px]" />
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-dark-green/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl border-2 border-dark-green/20 shadow-[12px_12px_0_rgba(0,0,0,0.1)] p-8 max-w-md mx-4 animate-fadeIn">
            <h3 className="text-xl font-bold text-dark-green mb-3">Confirm Logout</h3>
            <p className="text-brown/80 mb-6">Are you sure you want to log out?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-2 bg-transparent text-dark-green text-sm font-semibold rounded-full border-2 border-dark-green/20 hover:border-gold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-dark-green text-cream text-sm font-semibold rounded-full hover:bg-brown transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
