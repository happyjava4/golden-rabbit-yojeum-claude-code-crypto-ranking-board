import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '🇰🇷 워케이션 코리아 | 일하기 좋은 한국의 도시를 찾아보세요',
  description: '제주, 부산, 강릉 등 한국 주요 도시의 생활비, 인터넷 속도, 카페 인프라를 한눈에 비교하고 워케이션 경험을 공유하세요',
  keywords: ['워케이션', '디지털노마드', '원격근무', '제주', '강릉', '부산', '워케이션코리아'],
  authors: [{ name: '워케이션 코리아' }],
  openGraph: {
    title: '🇰🇷 워케이션 코리아',
    description: '일하기 좋은 한국의 도시를 찾아보세요',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  )
}
