import { AuthShell, ResetRequestCard } from "@/components/auth/AuthCards";

export default function Page() {
  return (
    <AuthShell variant="classic">
      <ResetRequestCard base="/auth/classic" />
    </AuthShell>
  );
}
