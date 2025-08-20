import AuthCard from "@/components/auth/AuthCard";
import AuthLinks from "@/components/auth/AuthLinks";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center">
      <AuthCard title="Welcome Back" subtitle="Sign in to your account">
        <LoginForm />
        <AuthLinks showSignUp={true} />
      </AuthCard>
    </div>
  );
}
