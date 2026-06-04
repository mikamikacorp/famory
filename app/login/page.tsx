"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Logo from "../components/Logo";

function RedirectToDashboard() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);
  return (
    <p className="text-stone-500 text-sm">ダッシュボードへ移動中...</p>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-amber-100 px-6 py-4">
        <Logo />
      </header>
      <div className="flex-1 flex items-center justify-center p-6">
        <Authenticator>
          <RedirectToDashboard />
        </Authenticator>
      </div>
    </div>
  );
}
