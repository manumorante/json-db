import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen p-24">
          <div className="mb-12">
            <a className="text-xl" href="/">
              <span className="font-extralight text-indigo-600">JSON</span>
              <span className="font-extrabold text-gray-800">DB</span>
            </a>
          </div>

          {children}
        </main>
      </body>
    </html>
  )
}
