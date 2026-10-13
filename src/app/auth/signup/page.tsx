import { AuthShell, SignUpCard } from "@/components/auth/AuthCards";

export default function Page() {
  return (
    <AuthShell variant="branded">
      <SignUpCard base="/auth" />
    </AuthShell>
  );
}
