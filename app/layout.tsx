import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ReportList from "@/components/features/admin/ReportList";
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
  title: "Create Next App",
  description: "Generated by create next app",
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
            <ReportList />
          </SignedIn>
          <SignedOut>
            {/* <Link href={"/sign-in"}>ログイン</Link> */}
            {children}
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
