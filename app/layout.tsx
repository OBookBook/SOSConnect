import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SOSレポート",
  description:
    "あなたの勇気が誰かを救う目撃した暴力や虐待の通報に躊躇していませんか？あなたの安全を守りながら、その人を助けることができます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ja">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SignedIn>
            <div className="flex justify-end p-2">
              <UserButton></UserButton>
            </div>
            <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200 my-4">
              管理者ページ
            </h2>
            {/* <ReportList /> */}
          </SignedIn>
          <SignedOut>{children}</SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
