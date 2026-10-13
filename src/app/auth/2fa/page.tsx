import { AuthShell, TwoFactorCard } from "@/components/auth/AuthCards";

export default function Page() {
  return (
    <AuthShell variant="branded">
      <TwoFactorCard base="/auth" />
    </AuthShell>
  );
}
