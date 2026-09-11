// pages/LoginPage.tsx
import { LoginForm } from '../components/forms/LoginForm';

export function LoginPage() {
  return (
    
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {/* Branding & Headers */}
        <img src="/logo.svg" alt="Logo" className="h-10 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-center mb-6">Welcome Back</h2>

        {/* Your Form Component */}
       
        <LoginForm />

        {/* Page-level links */}
        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-sm text-blue-600">Forgot password?</a>
        </div>
      </div>
    </div>
  );
}