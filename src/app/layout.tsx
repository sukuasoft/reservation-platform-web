import type { Metadata } from "next";
import "@/styles/main.css";
import { AppProvider } from "@/contexts/appContext";
import { Toaster } from "react-hot-toast";


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
        <Toaster />
        <AppProvider apiUrl={process.env.API_URL ?? ""}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
