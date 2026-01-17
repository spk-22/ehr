import "./globals.css"

export const metadata = {
  title: "MediCare - Healthcare Management System",
  description: "Hospital Management Dashboard",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
