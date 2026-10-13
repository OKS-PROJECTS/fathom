import { UserPlus } from "lucide-react";
import { StarterArt, StarterPage } from "./StarterPage";

export function MembersStarterPage() {
  return (
    <StarterPage title="Members Starter" crumbs={["My Account", "Members & Roles", "Members Starter"]} headline="Welcoming and Registering New Members"
      lines={["A simple process to welcome new members and bring them into the team,", "so they get off to a smooth, quick start."]}
      action="Add New Member" href="/account/members/import-members" art={<StarterArt><UserPlus size={72} strokeWidth={1.5} /></StarterArt>} />
  );
}
