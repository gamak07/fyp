import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-white px-4">
      {children}
    </div>
  )
}
