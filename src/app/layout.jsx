import "./globals.css";

export const metadata = {
  title: "Home",
  description: "Mach33 Media — Scale Your Profits, Not Just Revenue.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
