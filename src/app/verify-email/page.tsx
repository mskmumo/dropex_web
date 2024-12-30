'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      verifyEmail(token)
    }
  }, [token])

  async function verifyEmail(token: string) {
    try {
      const response = await fetch(`/api/auth/verify-email?token=${token}`)
      if (response.ok) {
        setVerificationStatus('success')
      } else {
        setVerificationStatus('error')
      }
    } catch (error) {
      console.error('Error verifying email:', error)
      setVerificationStatus('error')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary to-primary-foreground">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Email Verification</h2>
        </div>
        {verificationStatus === 'loading' && <p>Verifying your email...</p>}
        {verificationStatus === 'success' && (
          <>
            <p className="text-green-600">Your email has been successfully verified!</p>
            <Button onClick={() => router.push('/login')} className="w-full">
              Proceed to Login
            </Button>
          </>
        )}
        {verificationStatus === 'error' && (
          <>
            <p className="text-red-600">There was an error verifying your email. Please try again or contact support.</p>
            <Button onClick={() => router.push('/register')} className="w-full">
              Back to Registration
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

