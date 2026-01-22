"use client"

import { Logo } from "@/components/logo";
import { Card } from "@/components/ui/card";
import { LanguageProvider } from "@/contexts/language-context";


export default function LoginPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <LanguageProvider>
    <div className="grid min-h-svh lg:grid-cols-1">
      <div className="flex flex-col gap-4 p-6 md:p-10 "> 
        
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-lg p-10">
            <div className="flex justify-center gap-2">
              <a href="/" className="flex items-center gap-2 font-medium">
                <Logo />
              </a>
            </div>

            {children}
          </Card>
        </div>
        {/* <div className="bg-muted relative hidden lg:block">
          <Image
            src="/kamaia-banner.png"
            alt="Kamaia Banner"
            fill
            className="object-cover dark:brightness-[0.5] dark:grayscale"
            priority
          />
        </div> */}
      </div>
      </div>

    </LanguageProvider>
  )
}
