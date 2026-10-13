import { AuthShell, CheckEmailCard } from "@/components/auth/AuthCards";

export default function Page() {
  return (
    <AuthShell variant="branded">
      <CheckEmailCard base="/auth" />
    </AuthShell>
  );
}
