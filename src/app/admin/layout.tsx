import type { Metadata } from "next";
import "../../app/globals.css";

export const metadata: Metadata = {
  title: "NEXER Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-neutral-50 text-neutral-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
