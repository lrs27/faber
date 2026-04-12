"use client";

import dynamic from 'next/dynamic';

// Dynamically import GoogleAuthButton to handle missing provider gracefully
const GoogleAuthButtonInner = dynamic(
  () => import('./GoogleAuthButton'),
  {
    ssr: false,
    loading: () => null,
  }
);

interface GoogleAuthWrapperProps {
  mode: "login" | "signup";
  onError?: (error: string) => void;
}

export default function GoogleAuthWrapper(props: GoogleAuthWrapperProps) {
  const isGoogleConfigured = !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // Don't render anything if Google OAuth is not configured
  if (!isGoogleConfigured) {
    return null;
  }

  return <GoogleAuthButtonInner {...props} />;
}
