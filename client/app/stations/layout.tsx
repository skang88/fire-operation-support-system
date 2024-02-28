import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Stations router",
    description: "Designed by Seokgyun Kang",
  };
  

export default function Layout({ children }
    : Readonly<{
        children: React.ReactNode;
      }>){
    return (
        <>
            <h1> Stations </h1>
            {children}
        </>
    )

}