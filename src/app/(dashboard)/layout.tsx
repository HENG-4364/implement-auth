import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css"
import AppLayout from "@/components/Layout/Layout";
import { ApolloWraper } from "@/lib/apollo";
import { Toaster } from "sonner";
import AppInitializer from "@/store/AppInitializer";
import { verifySession } from "@/lib/jwt/jwt";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Implement Auth",
  description: "Generated by create next app",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { me } = await verifySession()
  return (
    <html lang="en">
      <ApolloWraper>
        <Toaster richColors />
        <body className={inter.className}>
          <AppInitializer me={me}>
            <AppLayout>{children}</AppLayout>
          </AppInitializer>
        </body>
      </ApolloWraper>
    </html>
  );
}
