import { AuthShell, PasswordChangedCard } from "@/components/auth/AuthCards";

export default function Page() {
  return (
    <AuthShell variant="classic">
      <PasswordChangedCard base="/auth/classic" />
    </AuthShell>
  );
}
