import { AuthShell, PasswordChangedCard } from "@/components/auth/AuthCards";

export default function Page() {
  return (
    <AuthShell variant="branded">
      <PasswordChangedCard base="/auth" />
    </AuthShell>
  );
}
