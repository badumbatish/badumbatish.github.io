import './globals.css'
import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import Favicon from '/public/favico.ico';
import Name from "@/components/Name";
import Header from "@/components/Header";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'jjasmine',
  description: 'Built with NextJS, TailwindCSS, and a tonnn of loveee :)',
  icons: [{ rel: 'icon', url: Favicon.src }],

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">


      <body className={inter.className}>
      <Header>
        <Name></Name>
      </Header>
      {children}</body>
    </html>
  )
}
