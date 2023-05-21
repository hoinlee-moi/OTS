import "./globals.css";
import { Inter, Noto_Sans_KR } from "next/font/google";

const inter = Noto_Sans_KR({ weight: "500", subsets: ["latin"] });

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }
type props = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: props) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
