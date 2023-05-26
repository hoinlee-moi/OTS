import AuthContext from "@/context/AuthContext";
import "./globals.css";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const inter = Noto_Sans_KR({ weight: "500", subsets: ["latin"] });

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }
type props = {
  children: React.ReactNode;
};
export default async function RootLayout({ children }: props) {
  // let session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <html lang="en">
      <body className="{inter.className}">
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
