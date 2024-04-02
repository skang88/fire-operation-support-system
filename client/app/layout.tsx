import type { Metadata } from "next";
import Link from "next/link"

// These styles apply to every route in the application
import './globals.css'

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
        <h1 className="mt-5 ml-5 text-3xl font-bold"> Fire Operation Support System</h1>
        <nav className="flex items-center justify-between flex-wrap p-6">
          <ul className="flex border-b">
            <li className="-mb-px mr-1"> 
              <Link className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="/"> Home </Link>
            </li>
            <li className="mr-1"> 
              <Link className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="/dispatches"> Dispatches </Link>
            </li>
            <li className="mr-1"> 
              <Link className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="/stations"> Stations </Link>
            </li>
            <li className="mr-1">  
              <Link className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="/vehicles"> Vehicles </Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
