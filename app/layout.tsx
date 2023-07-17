import AuthContext from "@/context/AuthContext";
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";

const inter = Noto_Sans_KR({ weight: "500", subsets: ["latin"] });

export const metadata = {
  title: "OTS-식단관리 SNS",
  description: "함께 식단 관리를 할 수 있는 SNS",
  openGraph: {
    title: "OTS-식단관리 SNS",
    description: "함께 식단 관리를 할 수 있는 SNS",
    url: "https://ots-amber.vercel.app/",
    siteName: "OTS",
    image: {
      url: "../public/assets/og-image.png",
      width: 800,
      height: 600,
    },
  },
};
type props = {
  children: React.ReactNode;
};
export default async function RootLayout({ children }: props) {
  return (
    <html lang="kr">
      <body className={inter.className}>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
