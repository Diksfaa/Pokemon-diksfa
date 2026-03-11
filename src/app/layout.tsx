import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/components/common/app-sidebar";
import StoreProvider from "../providers/StoreProvider";
import QueryProvider from "../providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokemon-Diksfa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <QueryProvider>
            <SidebarProvider className="font-mono">
              <AppSidebar />

              <main className="w-full ">
                <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background px-4">
                  <SidebarTrigger />
                  <div className="p-2">
                    <h1 className="text-xl">Dashboard Pokemon</h1>
                  </div>
                </header>
                <section className="p-6">{children}</section>
              </main>
            </SidebarProvider>
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
