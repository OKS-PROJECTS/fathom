import type { LucideIcon } from "lucide-react";
import { LayoutGrid, CircleUser, Settings, Users, ShoppingCart, Shield, Blocks } from "lucide-react";

export type NavNode = {
  key: string;
  label: string;
  to?: string;
  icon?: LucideIcon;
  children?: NavNode[];
  /** Children from this index on collapse behind a "Show N more" row. */
  moreAfter?: number;
};

const leaf = (key: string, label: string, to: string): NavNode => ({ key, label, to });

const authSet = (prefix: string, base: string): NavNode[] => [
  leaf(`${prefix}-signin`, "Sign In", `${base}/signin`),
  leaf(`${prefix}-signup`, "Sign Up", `${base}/signup`),
  leaf(`${prefix}-2fa`, "2FA", `${base}/2fa`),
  leaf(`${prefix}-check`, "Check Email", `${base}/check-email`),
  {
    key: `${prefix}-reset`,
    label: "Reset Password",
    children: [
      leaf(`${prefix}-r-enter`, "Enter Email", `${base}/reset-password`),
      leaf(`${prefix}-r-check`, "Check Email", `${base}/reset-password/check-email`),
      leaf(`${prefix}-r-done`, "Password Changed", `${base}/reset-password/changed`),
    ],
  },
];

export const NAV: NavNode[] = [
  { key: "dashboards", label: "Dashboards", to: "/", icon: LayoutGrid },
  {
    key: "public-profile",
    label: "Public Profile",
    icon: CircleUser,
    moreAfter: 6,
    children: [
      {
        key: "profiles",
        label: "Profiles",
        moreAfter: 6,
        children: [
          leaf("p-default", "Default", "/public-profile/profiles/default"),
          leaf("p-creator", "Creator", "/public-profile/profiles/creator"),
          leaf("p-company", "Company", "/public-profile/profiles/company"),
          leaf("p-collector", "Collector", "/public-profile/profiles/collector"),
          leaf("p-writer", "Writer", "/public-profile/profiles/writer"),
          leaf("p-agency", "Agency", "/public-profile/profiles/agency"),
          leaf("p-gamer", "Gamer", "/public-profile/profiles/gamer"),
          leaf("p-feeds", "Feeds", "/public-profile/profiles/feeds"),
          leaf("p-plain", "Plain", "/public-profile/profiles/plain"),
          leaf("p-modal", "Modal", "/public-profile/profiles/modal"),
        ],
      },
      {
        key: "projects",
        label: "Projects",
        children: [
          leaf("pr-3", "3 Columns", "/public-profile/projects/3-columns"),
          leaf("pr-2", "2 Columns", "/public-profile/projects/2-columns"),
        ],
      },
      leaf("works", "Works", "/public-profile/works"),
      leaf("teams", "Teams", "/public-profile/teams"),
      leaf("network", "Network", "/public-profile/network"),
      leaf("activity", "Activity", "/public-profile/activity"),
      leaf("camp-card", "Campaigns - Card", "/public-profile/campaigns/card"),
      leaf("camp-list", "Campaigns - List", "/public-profile/campaigns/list"),
      leaf("empty", "Empty", "/public-profile/empty"),
    ],
  },
  {
    key: "account",
    label: "My Account",
    icon: Settings,
    moreAfter: 7,
    children: [
      {
        key: "account-home",
        label: "Account",
        children: [
          leaf("a-start", "Get Started", "/account/home/get-started"),
          leaf("a-profile", "User Profile", "/account/home/user-profile"),
          leaf("a-company", "Company Profile", "/account/home/company-profile"),
          leaf("a-set-sidebar", "Settings - With Sidebar", "/account/home/settings-sidebar"),
          leaf("a-set-ent", "Settings - Enterprise", "/account/home/settings-enterprise"),
          leaf("a-set-plain", "Settings - Plain", "/account/home/settings-plain"),
          leaf("a-set-modal", "Settings - Modal", "/account/home/settings-modal"),
        ],
      },
      {
        key: "billing",
        label: "Billing",
        children: [
          leaf("b-basic", "Billing - Basic", "/account/billing/basic"),
          leaf("b-ent", "Billing - Enterprise", "/account/billing/enterprise"),
          leaf("b-plans", "Plans", "/account/billing/plans"),
          leaf("b-history", "Billing History", "/account/billing/history"),
        ],
      },
      {
        key: "security",
        label: "Security",
        children: [
          leaf("s-start", "Get Started", "/account/security/get-started"),
          leaf("s-overview", "Security Overview", "/account/security/overview"),
          leaf("s-ips", "Allowed IP Addresses", "/account/security/allowed-ip-addresses"),
          leaf("s-privacy", "Privacy Settings", "/account/security/privacy-settings"),
          leaf("s-devices", "Device Management", "/account/security/device-management"),
          leaf("s-backup", "Backup & Recovery", "/account/security/backup-and-recovery"),
          leaf("s-sessions", "Current Sessions", "/account/security/current-sessions"),
          leaf("s-log", "Security Log", "/account/security/security-log"),
        ],
      },
      {
        key: "members",
        label: "Members & Roles",
        children: [
          leaf("m-starter", "Teams Starter", "/account/members/team-starter"),
          leaf("m-teams", "Teams", "/account/members/teams"),
          leaf("m-info", "Team Info", "/account/members/team-info"),
          leaf("m-mstarter", "Members Starter", "/account/members/members-starter"),
          leaf("m-members", "Team Members", "/account/members/team-members"),
          leaf("m-import", "Import Members", "/account/members/import-members"),
          leaf("m-roles", "Roles", "/account/members/roles"),
          leaf("m-toggle", "Permissions - Toggler", "/account/members/permissions-toggle"),
          leaf("m-check", "Permissions - Check", "/account/members/permissions-check"),
        ],
      },
      leaf("integrations", "Integrations", "/account/integrations"),
      leaf("notifications", "Notifications", "/account/notifications"),
      leaf("api-keys", "API Keys", "/account/api-keys"),
      leaf("appearance", "Appearance", "/account/appearance"),
      leaf("invite", "Invite a Friend", "/account/invite-a-friend"),
      leaf("acc-activity", "Activity", "/account/activity"),
    ],
  },
  {
    key: "network",
    label: "Network",
    icon: Users,
    children: [
      leaf("n-start", "Get Started", "/network/get-started"),
      {
        key: "user-cards",
        label: "User Cards",
        children: [
          leaf("uc-mini", "Mini Cards", "/network/user-cards/mini-cards"),
          leaf("uc-team", "Team Crew", "/network/user-cards/team-crew"),
          leaf("uc-author", "Author", "/network/user-cards/author"),
          leaf("uc-collector", "Collector", "/network/user-cards/collector"),
          leaf("uc-social", "Social", "/network/user-cards/social"),
        ],
      },
      {
        key: "user-table",
        label: "User Table",
        children: [
          leaf("ut-crew", "Team Crew", "/network/user-table/team-crew"),
          leaf("ut-roster", "App Roster", "/network/user-table/app-roster"),
          leaf("ut-authors", "Market Authors", "/network/user-table/market-authors"),
          leaf("ut-saas", "SaaS Users", "/network/user-table/saas-users"),
          leaf("ut-clients", "Store Clients", "/network/user-table/store-clients"),
          leaf("ut-visitors", "Visitors", "/network/user-table/visitors"),
        ],
      },
    ],
  },
  {
    key: "store",
    label: "Store - Client",
    icon: ShoppingCart,
    children: [
      leaf("st-home", "Home", "/store-client/home"),
      leaf("st-grid", "Search Results - Grid", "/store-client/search-results-grid"),
      leaf("st-list", "Search Results - List", "/store-client/search-results-list"),
      leaf("st-product", "Product Details", "/store-client/product-details"),
      leaf("st-wishlist", "Wishlist", "/store-client/wishlist"),
      {
        key: "checkout",
        label: "Checkout",
        children: [
          leaf("co-summary", "Order Summary", "/store-client/checkout/order-summary"),
          leaf("co-shipping", "Shipping Info", "/store-client/checkout/shipping-info"),
          leaf("co-payment", "Payment Method", "/store-client/checkout/payment-method"),
          leaf("co-placed", "Order Placed", "/store-client/checkout/order-placed"),
        ],
      },
      leaf("st-orders", "My Orders", "/store-client/my-orders"),
      leaf("st-receipt", "Order Receipt", "/store-client/order-receipt"),
    ],
  },
  {
    key: "auth",
    label: "Authentication",
    icon: Shield,
    children: [
      { key: "auth-classic", label: "Classic", children: authSet("cl", "/auth/classic") },
      { key: "auth-branded", label: "Branded", children: authSet("br", "/auth") },
      leaf("au-welcome", "Welcome Message", "/auth/welcome-message"),
      leaf("au-deactivated", "Account Deactivated", "/auth/account-deactivated"),
      leaf("au-404", "Error 404", "/error/404"),
      leaf("au-500", "Error 500", "/error/500"),
    ],
  },
  { key: "components", label: "Components", to: "/components", icon: Blocks },
];

const collect = (nodes: NavNode[]): string[] =>
  nodes.flatMap((n) => (n.children ? collect(n.children) : n.to ? [n.to] : []));

export const NAV_ROUTES = Array.from(new Set(collect(NAV)));

export const SPACES = ["Product", "Marketing", "Engineering"];
export const FAVORITES = ["Release plan", "Q4 roadmap", "Brand assets", "Hiring plan"];

const flat = (nodes: NavNode[], trail: NavNode[] = []): { node: NavNode; trail: NavNode[] }[] =>
  nodes.flatMap((n) =>
    n.children ? flat(n.children, [...trail, n]) : [{ node: n, trail }],
  );

/** Breadcrumb trail (group labels + leaf) for a pathname. */
export function crumbsFor(pathname: string): string[] {
  const hit = flat(NAV).find((x) => x.node.to === pathname);
  if (!hit) return [];
  return [...hit.trail.map((t) => t.label), hit.node.label];
}

/** Every page as a searchable entry, grouped by its top-level section. */
export function searchEntries(): { to: string; label: string; group: string }[] {
  return NAV.flatMap((top) =>
    flat(top.children ?? (top.to ? [top] : [])).map(({ node, trail }) => ({
      to: node.to as string,
      label: node.label,
      group: [top.label, ...trail.map((t) => t.label)].join(" / "),
    })),
  );
}
