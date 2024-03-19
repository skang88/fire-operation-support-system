import type { Metadata } from "next";
import Link from "next/link"

export const metadata: Metadata = {
  title: "About router",
  description: "Designed by Seokgyun Kang",
};


export default function Layout({ children }
  : Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
      <h1> Map Box Sub routers </h1>
      <ul>
        <li>
          <Link href="/mapbox/mapbox1"> Map box 1 - stations on the map </Link>
        </li>
        <li>
          <Link href="/mapbox/mapbox2"> Map box 2 - onGeolocate </Link>
        </li>
        <li>
          <Link href="/mapbox/mapbox3"> Map box 3 </Link>
        </li>
      </ul>
      {children}
    </>
  )

}