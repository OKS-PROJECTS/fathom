import { AuthShell, SignInCard } from "@/components/auth/AuthCards";

export default function Page() {
  return (
    <AuthShell variant="classic">
      <SignInCard base="/auth/classic" />
    </AuthShell>
  );
}
