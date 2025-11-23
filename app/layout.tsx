import "@/app/globals.css";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "EdgeScore | Precision Sports Predictions",
  description:
    "EdgeScore delivers accurate, data-driven predictions for the biggest sports leagues using ensemble forecasting and contextual insights."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
