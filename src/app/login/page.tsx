import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { authOptions } from '@/lib/authOptions'
import { LoginForm } from '@/modules/login/components/LoginForm'

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/editor') // ✅ Redirige directamente en el servidor
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-96">
        <CardHeader>
          <h2 className="text-xl font-semibold text-center">Login</h2>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
