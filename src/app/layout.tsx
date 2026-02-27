import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";
import { QueryClientContextProvider } from "@/contexts/query-client-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Kamaia",
  description: "ERP Jurídico completo, multinível, multitenant e escalável para gestão de escritórios de advocacia.",
  keywords: ["Gestão", "escritórios de advocacia", "Recurso", "Recursos Empresariais", "Gestão Empresarial", "ERP", "ERP Inteligente", "Gestão de advocacia", "Kamaia"],
  applicationName: "Kamaia",
  authors: [{ name: "NextGen", url: "https://kamaia.ao" }],
  icons: {
    icon: '/kamia_simbolo_preto.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientContextProvider>
          <NextTopLoader
            color="#6366f1"
            height={3}
            showSpinner={false}
            speed={200}
            shadow="0 0 10px #6366f1,0 0 5px #6366f1"
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NuqsAdapter>{children}</NuqsAdapter>
            <Toaster />
          </ThemeProvider>
        </QueryClientContextProvider>
      </body>
    </html>
  );
}
