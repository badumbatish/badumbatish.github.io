
import './globals.css'
import type { Metadata } from 'next'

import rounded_pfp from '/public/pfp6.png';
import Name from "@/components/Name";
import Header from "@/components/Header";
import UpAndDownButton from "@/components/UpToTopButton";
import localFont from 'next/font/local'
const inter = localFont({src : './Inter-VariableFont_slnt,wght.ttf'})

export const metadata: Metadata = {
    title: 'jjasmine',
    description: 'Built with love by Jasmine. Support me on https://ko-fi.com/badumbatish :)',
    icons: [{ rel: 'icon', url: rounded_pfp.src  }],

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en" className={"px-0 sm:px-4 py-4"}>


    <body className={`${inter.className} flex flex-col min-h-screen`}>
    <Header>
        <Name></Name>
    </Header>
    <div className={"flex-1"}>{children}</div>
    <UpAndDownButton></UpAndDownButton>

    <footer className="footer self-center justify-center gap-2 pt-4 items-center italic ">
        {/*<p>I&#39;m looking for new grad compiler work, please email at jjasmine@berkeley.edu</p>*/}
        <p>Built with love by Jasmine. Support me on <a href="https://ko-fi.com/badumbatish" className="underline" target="_blank" rel="noopener noreferrer">ko-fi.com/badumbatish</a> :)</p>
    </footer>

    </body>
    </html>
  )
}
