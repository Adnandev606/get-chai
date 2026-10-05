"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar' 

export default function ClientNavbar() {
  const pathname = usePathname()
  

  if (pathname.startsWith('/dashboard')) {
    return null
  }

  return <Navbar />
}