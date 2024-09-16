import '@/styles/globals.css'

export const metadata = {
  title: 'Linked List Visualization',
  description: 'Interactive visualization of a linked list data structure',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
