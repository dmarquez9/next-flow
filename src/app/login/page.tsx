import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { LoginForm } from '@/modules/login/components/LoginForm'

export default function LoginPage() {
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
