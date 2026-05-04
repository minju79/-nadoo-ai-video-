import './globals.css'
import { Inter, Playfair_Display, Dancing_Script } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const dancing = Dancing_Script({ 
  subsets: ['latin'],
  variable: '--font-handwriting',
  display: 'swap',
})

export const metadata = {
  title: '나도 AI 비디오 - 혁신적인 영상 솔루션',
  description: 'AI로 만드는 고퀄리티 비즈니스 영상, NADOO AI VIDEO',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable} ${dancing.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
