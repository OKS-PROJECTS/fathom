import { AuthShell, TwoFactorCard } from "@/components/auth/AuthCards";

export default function Page() {
  return (
    <AuthShell variant="classic">
      <TwoFactorCard base="/auth/classic" />
    </AuthShell>
  );
}
