"use client"
import React, { useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import DashboardComponent from '@/components/dashboard' // Yeh aapke components folder wale form ko import karega

const DashboardPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push('/login')
    }
  }, [session, router])

  // Agar user login nahi hai toh kuch show nahi karega aur login page par bhej dega
  if (!session) {
    return null
  }

  // Agar login hai toh components/dashboard.js wala form show ho jayega
  return <DashboardComponent />
}

export default DashboardPage