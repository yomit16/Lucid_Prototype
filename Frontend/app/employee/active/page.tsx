"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ActiveRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Replace so back button doesn't keep this redirect entry
    router.replace("/employee/training-plan");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-6 bg-white rounded-lg shadow border">
        <h1 className="text-lg font-semibold mb-2">Redirecting to Active Modules…</h1>
        <p className="text-sm text-gray-600">
          If you are not redirected automatically, <a href="/employee/training-plan" className="text-blue-600 underline">click here</a>.
        </p>
      </div>
    </div>
  );
}
