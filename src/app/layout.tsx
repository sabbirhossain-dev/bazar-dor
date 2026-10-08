// import type { Metadata } from "next";
// import "./globals.css";
// import { Hind_Siliguri } from "next/font/google";
// import Navbar from "./components/Navbar";

// const hindSiliguri = Hind_Siliguri({
//   variable: "--font-hind-siliguri",
//   subsets: ["bengali"],
//   weight: ["300", "400", "500", "600", "700"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "Bazar Dor",
//   description: "Bazar Dor web app",
// };

// export default function RootLayout({ children }: LayoutProps<"/">) {
//   return (
//     <html lang="en" className={`${hindSiliguri.variable}  h-full antialiased`}>
//       <body className="min-h-full flex flex-col">
//         <Navbar />
//         <main className="max-w-7xl mx-auto w-full">{children}</main>
//       </body>
//     </html>
//   );
// }

///////////////////////////////////
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Hind_Siliguri } from "next/font/google";
import Navbar from "./components/Navbar";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bazar Dor",
  description: "Bazar Dor web app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-bangla">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl">{children}</main>
      </body>
    </html>
  );
}
