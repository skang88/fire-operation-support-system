import type { Metadata } from "next";
import Link from "next/link"

export const metadata: Metadata = {
  title: "Fire Operation Support App",
  description: "Designed by Seokgyun Kang",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <h1> Fire Operation Support System</h1>
        <nav>
          <ul>
            <li> 
              <Link href="/"> Home </Link>
            </li>
            <li> 
              <Link href="/stations"> Stations </Link>
            </li>
            <li> 
              <Link href="/dispatches"> Dispatches </Link>
            </li>
            <li> 
              <Link href="/vehicles"> Vehicles </Link>
            </li>
            <li> 
              <Link href="/mapbox"> Map Box </Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
