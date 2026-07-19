import LoginHero from "@/components/auth/LoginHero";
import LoginForm from "@/components/auth/LoginForm";

export default function SigninPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F3]">
      <div className="mx-auto flex min-h-screen max-w-[1700px]">
        <LoginHero />
        <LoginForm />
      </div>
    </main>
  );
}