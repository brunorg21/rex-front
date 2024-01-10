"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  return (
    <div className="h-screen flex justify-center items-center relative">
      <div className="w-96 flex flex-col items-center gap-5">
        <div className="absolute top-8 left-8">
          <Button
            className="flex gap-2"
            onClick={() => router.push("/")}
            title="Voltar para Home"
            size="default"
            variant="outline"
          >
            <ArrowLeft /> Voltar
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
