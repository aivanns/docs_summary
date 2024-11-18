import "@/shared/styles/globals.css";
import { Inter } from "next/font/google";
import "@/shared/styles/antd-overrides.css";
import { Providers } from "@/shared/utils/providers/providers";
import { Header } from "@/widgets/header/ui/header";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className={`${inter.className} antialiased bg-[#0A0A0B]`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
