import Image from 'next/image'
import React from 'react'

export default function Breadcrum() {
  return (
    <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          
          <div className="relative w-16 h-16">
            <Image fill src='/logo.png' alt='logo' className='absolute' />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-blue-900 mb-2">
          Supervisor Portal
        </h1>
        <p className="text-gray-600">
          Sign in to manage your students' projects
        </p>
      </div>
  )
}
