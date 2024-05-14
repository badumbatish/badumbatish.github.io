
import './globals.css'
import type { Metadata } from 'next'

import rounded_pfp from '/public/pfp2-rounded.ico';
import Name from "@/components/Name";
import Header from "@/components/Header";
import Image from "next/image";
import UpToTopButton from "@/components/UpToTopButton";
import localFont from 'next/font/local'
const inter = localFont({src : './Inter-VariableFont_slnt,wght.ttf'})

export const metadata: Metadata = {
    title: 'jjasmine',
    description: 'Built with NextJS, TailwindCSS, and a tonnn of loveee :)',
    icons: [{ rel: 'icon', url: rounded_pfp.src  }],

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">


      <body className={`${inter.className} flex flex-col min-h-screen`}>
      <Header>
        <Name></Name>
      </Header>
      <div className={"flex-1"}>{children}</div>
        <UpToTopButton></UpToTopButton>

      <footer className="footer self-center justify-center gap-2 pt-4 items-center italic ">
          <p>Built by Jasmine with NextJS, TailwindCSS, and a tonnn of loveee :)</p>
      </footer>
      </body>
    </html>
  )
}
