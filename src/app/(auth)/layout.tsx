"use client"

import { Logo } from "@/components/logo";
import { LanguageProvider } from "@/contexts/language-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import Link from "next/link";
import Image from "next/image";


export default function LoginPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-between items-center gap-2">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <Logo />
            </Link>
            <LanguageSwitcher />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              {children}
            </div>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <Image
            src="/kamaia-banner.png"
            alt="Kamaia Banner"
            fill
            className="object-cover dark:brightness-[0.5] dark:grayscale"
            priority
          />
        </div>
      </div>
    </LanguageProvider>
  )
}
