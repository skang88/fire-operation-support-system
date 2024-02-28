import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About router",
    description: "Designed by Seokgyun Kang",
  };
  

export default function Layout({ children }
    : Readonly<{
        children: React.ReactNode;
      }>){
    return (
        <>
            <h1> Abouts </h1>
            {children}
        </>
    )

}