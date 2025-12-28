import { Input } from '@/components/ui/input'
import React from 'react'
import { FiSearch } from 'react-icons/fi'

export default function Toolbar() {
  return (
    <div className="mb-6 relative">
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
        <Input 
          type="text" 
          placeholder="Search by name, matric number, or project title..." 
          className="w-full pl-12 pr-4 py-6 border-gray-300 focus:ring-blue-500 text-base rounded-lg"
        />
      </div>
  )
}
