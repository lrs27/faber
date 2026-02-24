import Navbar from "@/components/Navbar";
import CheckeredBorder from "@/components/CheckeredBorder";
import Marquee from "@/components/Marquee";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      {/* ===== LOGIN SECTION ===== */}
      <section className="flex-1 flex items-center justify-center px-8 md:px-16 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-5xl w-full">
          {/* Left side — branding */}
          <div className="flex-1 text-center lg:text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/FaberLogo.png"
              alt="Faber"
              width={300}
              height={120}
              className="select-none mx-auto lg:mx-0"
            />
            <p
              className="mt-4 text-xl md:text-2xl font-bold text-dark-green tracking-tight italic"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Build Bold, Get Hired.
            </p>
            <p className="mt-4 text-brown/60 max-w-sm mx-auto lg:mx-0">
              Sign in to access your dashboard, manage your portfolio, and browse templates.
            </p>
          </div>

          {/* Right side — login form */}
          <div className="flex-1 w-full max-w-md">
            <div className="bg-white rounded-2xl border-2 border-dark-green/10 p-8 shadow-[6px_6px_0_rgba(0,0,0,0.08)]">
              <h2
                className="text-2xl font-bold text-dark-green mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Welcome back
              </h2>

              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-dark-green mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@university.edu"
                    className="w-full px-4 py-3 rounded-xl border-2 border-dark-green/10 bg-cream/50 text-dark-green placeholder:text-brown/40 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-green mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Your password"
                    className="w-full px-4 py-3 rounded-xl border-2 border-dark-green/10 bg-cream/50 text-dark-green placeholder:text-brown/40 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-dark-green text-cream font-semibold rounded-full border-2 border-dark-green hover:bg-brown hover:border-brown transition-colors"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-dark-green/10" />
                <span className="text-xs text-brown/40 font-semibold">OR</span>
                <div className="flex-1 h-px bg-dark-green/10" />
              </div>

              <button className="mt-6 w-full px-6 py-3 bg-white text-dark-green font-semibold rounded-full border-2 border-dark-green/20 hover:border-gold transition-colors">
                Continue with Google
              </button>

              <p className="mt-6 text-center text-sm text-brown/50">
                Don&apos;t have an account?{" "}
                <Link href="/login" className="text-gold font-semibold hover:text-brown transition-colors">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Marquee text="Build Bold, Get Hired." />
      <CheckeredBorder />

      {/* ===== FOOTER ===== */}
      <footer className="px-8 md:px-16 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brown/50">
          <p>Faber — maker, craftsman.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-dark-green transition-colors">Home</Link>
            <Link href="/templates" className="hover:text-dark-green transition-colors">Templates</Link>
            <Link href="/dashboard" className="hover:text-dark-green transition-colors">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
