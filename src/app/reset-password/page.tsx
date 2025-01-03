import { ResetPasswordForm } from '../../components/reset-password-form'

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-navy-600 to-navy-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-navy-900">Reset Password</h2>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  )
}

