"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  fallbackUrl?: string;
  className?: string;
  label?: string;
}

export function BackButton({ fallbackUrl = "/", className = "", label = "Retour" }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // Check if there is history to go back to. If it's a direct visit, history.length is usually 1 or 2 depending on browser
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleBack}
      className={`text-white/70 hover:text-white hover:bg-white/10 h-11 px-4 touch-manipulation ${className}`}
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      {label}
    </Button>
  );
}
