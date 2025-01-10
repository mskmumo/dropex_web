This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Get Stripe Publishable Key:
Go to https://dashboard.stripe.com/
Sign in/Create account
Go to Developers → API keys
Copy "Publishable key" that starts with pk_test_
Get Google Maps API Key:
Go to https://console.cloud.google.com/
Create/Select a project
Enable Maps JavaScript API
Go to Credentials
Create API key or copy existing one


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CenterDashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Logistics Center Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Assign Tasks</Button>
          <Button variant="outline">Generate Report</Button>
        </div>
      </div>
      <Tabs defaultValue="incoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="incoming">Incoming Shipments</TabsTrigger>
          <TabsTrigger value="outgoing">Outgoing Shipments</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="staff">Staff Management</TabsTrigger>
        </TabsList>
        <TabsContent value="incoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Incoming Shipments</CardTitle>
              <CardDescription>Manage and process incoming parcels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input type="text" placeholder="Search by tracking number" />
                  <Button>Search</Button>
                </div>
                {/* Add a table or list of incoming shipments here */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="outgoing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Outgoing Shipments</CardTitle>
              <CardDescription>Manage and track outgoing parcels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input type="text" placeholder="Search by tracking number" />
                  <Button>Search</Button>
                </div>
                {/* Add a table or list of outgoing shipments here */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Track and manage center inventory</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add inventory management components here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Management</CardTitle>
              <CardDescription>Manage center staff and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add staff management components here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}



//login/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from '@/utils/sendEmail'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    if (!user.emailVerified) {
      return NextResponse.json({ message: 'Please verify your email before logging in' }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    )

    // Send login notification email
    await sendEmail(
      user.email,
      'New Login Detected',
      `A new login was detected on your account. If this wasn't you, please contact support immediately.`
    )

    const response = NextResponse.json({
      message: 'Logged in successfully',
      redirectUrl: user.role === 'ADMIN' ? '/admin' : '/dashboard',
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 })
  }
}

// ... (previous imports remain the same)

const registerSchema = z.object({
  // ... (other fields remain the same)
  role: z.enum(["USER", "ADMIN", "CENTER_USER"]),
  // ... (other fields remain the same)
})

export function AuthForm() {
  // ... (previous code remains the same)

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true)
    setServerError(null)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            country: values.country,
            country_code: values.countryCode,
            phone: values.phone,
            role: values.role,
            agreement: values.agreement,
          },
        },
      })

      if (error) throw error

      // Insert user data into the users table
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: data.user?.id,
          email: values.email,
          name: values.name,
          country: values.country,
          country_code: values.countryCode,
          phone: values.phone,
          role: values.role,
        })

      if (insertError) throw insertError

      setShowVerificationDialog(true)
    } catch (error) {
      console.error('Registration error:', error)
      setServerError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // ... (rest of the component remains the same)
}

