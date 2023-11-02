import { Inter } from 'next/font/google'
import './globals.css'
import ImagesContextProvider from './contexts/ImagesContext'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Image Gallery',
  description: 'Created by Amdadul Islam ',
}

export default function RootLayout({ children }) {
  

  return (
    <html lang="en" className='bg-[#F7F7F9] '>
      <body className={inter.className}>
        <ImagesContextProvider>
        {children}
        </ImagesContextProvider>
        </body>
    </html>
  )
}
