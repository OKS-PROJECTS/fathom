import { AuthShell, SignUpCard } from "@/components/auth/AuthCards";

export default function Page() {
  return (
    <AuthShell variant="classic">
      <SignUpCard base="/auth/classic" />
    </AuthShell>
  );
}
