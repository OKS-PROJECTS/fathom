import { AuthShell, SignInCard } from "@/components/auth/AuthCards";

export default function Page() {
  return (
    <AuthShell variant="branded">
      <SignInCard base="/auth" />
    </AuthShell>
  );
}
