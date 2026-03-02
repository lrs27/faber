"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import CheckeredBorder from "@/components/CheckeredBorder";
import Marquee from "@/components/Marquee";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.displayName || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          displayName: formData.displayName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      // Store token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to connect to server. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // TODO: Implement Google OAuth flow
    // This would typically redirect to Google OAuth or use a library like next-auth
    alert("Google OAuth integration coming soon!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      {/* ===== SIGNUP SECTION ===== */}
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
              Create your account to start building your portfolio and stand out to employers.
            </p>
          </div>

          {/* Right side — signup form */}
          <div className="flex-1 w-full max-w-md">
            <div className="bg-white rounded-2xl border-2 border-dark-green/10 p-8 shadow-[6px_6px_0_rgba(0,0,0,0.08)]">
              <h2
                className="text-2xl font-bold text-dark-green mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Create your account
              </h2>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-dark-green mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-dark-green/10 bg-cream/50 text-dark-green placeholder:text-brown/40 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-green mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password (min 8 characters)"
                    className="w-full px-4 py-3 rounded-xl border-2 border-dark-green/10 bg-cream/50 text-dark-green placeholder:text-brown/40 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-green mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 rounded-xl border-2 border-dark-green/10 bg-cream/50 text-dark-green placeholder:text-brown/40 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-dark-green text-cream font-semibold rounded-full border-2 border-dark-green hover:bg-brown hover:border-brown transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-dark-green/10" />
                <span className="text-xs text-brown/40 font-semibold">OR</span>
                <div className="flex-1 h-px bg-dark-green/10" />
              </div>

              <button
                onClick={handleGoogleSignup}
                className="mt-6 w-full px-6 py-3 bg-white text-dark-green font-semibold rounded-full border-2 border-dark-green/20 hover:border-gold transition-colors"
              >
                Continue with Google
              </button>

              <p className="mt-6 text-center text-sm text-brown/50">
                Already have an account?{" "}
                <Link href="/login" className="text-gold font-semibold hover:text-brown transition-colors">
                  Sign In
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
