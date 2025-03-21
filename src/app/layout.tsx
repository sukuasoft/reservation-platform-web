import type { Metadata } from "next";
import '@/styles/main.css';
import { AppProvider } from "@/contexts/appContext";

export const metadata: Metadata = {
  title: "Plataforma de reservas",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>
      <AppProvider>
      {children}
      </AppProvider>
      </body>
    </html>
  );
}
