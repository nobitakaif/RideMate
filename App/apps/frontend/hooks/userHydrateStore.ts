
"use client"

import { useEffect, useState } from 'react'
import { usePhoneNumberStore } from '@/components/zustandProvider'

export const useHydratedPhoneNumber = () => {
  const [isHydrated, setIsHydrated] = useState(false)
  const phoneNumber = usePhoneNumberStore((state) => state.phoneNumber)

  useEffect(() => {
    // Mark as hydrated after the store has reloaded from localStorage
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return null
  }

  return phoneNumber
}   