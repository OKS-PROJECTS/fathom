import { AuthShell, ResetRequestCard } from "@/components/auth/AuthCards";

export default function Page() {
  return (
    <AuthShell variant="branded">
      <ResetRequestCard base="/auth" />
    </AuthShell>
  );
}
