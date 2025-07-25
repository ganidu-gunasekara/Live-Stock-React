// app/layout.tsx
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper"; // client wrapper

export const metadata = {
  title: "Live Stocks",
  description: "Live stock market viewer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
