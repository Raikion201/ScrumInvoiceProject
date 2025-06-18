import type { Metadata } from 'next'
import '../src/global.css'

export const metadata: Metadata = {
  title: 'Invoice Management System',
  description: 'A comprehensive invoice management system with blog functionality',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
