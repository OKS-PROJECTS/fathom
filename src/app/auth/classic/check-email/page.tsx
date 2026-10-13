import { AuthShell, CheckEmailCard } from "@/components/auth/AuthCards";

export default function Page() {
  return (
    <AuthShell variant="classic">
      <CheckEmailCard base="/auth/classic" />
    </AuthShell>
  );
}
