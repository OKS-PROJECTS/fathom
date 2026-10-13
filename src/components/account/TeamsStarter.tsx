import { Users } from "lucide-react";
import { StarterArt, StarterPage } from "./StarterPage";

export function TeamsStarterPage() {
  return (
    <StarterPage title="Teams Starter" crumbs={["My Account", "Members & Roles", "Teams Starter"]} headline="Quick Start for New Teams"
      lines={["Form and run teams with simple tools for communication,", "organising tasks and tracking progress, all in one place."]}
      action="Create New Team" href="/public-profile/teams" art={<StarterArt><Users size={72} strokeWidth={1.5} /></StarterArt>} />
  );
}
