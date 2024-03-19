import type { Metadata } from "next";
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dispatch router",
  description: "Designed by Seokgyun Kang",
};

export default function Layout({ children }
  : Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap">
        <ul className="flex border-b mb-5 ml-5">
        <li className="mr-1">
            <Link className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
                href="/dispatches/"> Active dispatches </Link>
          </li>
          <li className="mr-1">
            <Link className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
                href="/dispatches/listdispatches"> Manage dispatches </Link>
          </li>
          <li className="mr-1">
            <Link className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
            href="/dispatches/createdispatches"> Create dispatches </Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  )

}