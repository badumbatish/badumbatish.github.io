
import './globals.css'
import type { Metadata } from 'next'

import rounded_pfp from '/public/pfp5.jpeg';
import Name from "@/components/Name";
import Header from "@/components/Header";
import UpToTopButton from "@/components/UpToTopButton";
import localFont from 'next/font/local'
import { Analytics } from "@vercel/analytics/react"
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

    <html lang="en" className={"px-4 py-4"}>


    <body className={`${inter.className} flex flex-col min-h-screen`}>
    <Header>
        <Name></Name>
    </Header>
    <div className={"flex-1"}>{children}</div>
    <UpToTopButton></UpToTopButton>

    <footer className="footer self-center justify-center gap-2 pt-4 items-center italic ">
        <p>I&#39;m looking for new grad compiler work, please email at jjasmine@berkeley.edu</p>
        <p>Built by Jasmine with NextJS, TailwindCSS, and a tonnn of loveee :)</p>
    </footer>

    </body>
    </html>
  )
}
