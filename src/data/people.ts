const FIRST = ["Amara","Bruno","Celine","Dmitri","Elif","Farid","Greta","Hana","Idris","Joon","Katya","Leo","Mira","Nils","Odile","Pablo","Quinn","Rhea","Soren","Tamsin","Uma","Viktor","Wren","Xavi","Yara","Zane"];
const LAST = ["Alder","Brandt","Castell","Dunmore","Eriksen","Fontaine","Garrow","Holloway","Ishikawa","Jaeger","Kovac","Lindqvist","Marlowe","Navarro","Okafor","Prescott","Quarry","Rinaldi","Sandoval","Thorne"];
const COMPANIES = ["Northwind Labs","Helix Works","Orbit Foundry","Pinecrest","Lattice Co","Meridian Group","Quartz Studio","Vantage Pay"];
const ROLES = ["Engineer","Designer","Viewer","Manager","Analyst","Support"];
const STATUSES = ["In Office","Remote","On Leave"] as const;
const COUNTRIES = ["Hungary","Poland","Czech Republic","Portugal","Norway","Chile","Kenya","Japan"];
const CITIES = ["Lisbon, Portugal","Austin, Texas","Oslo, Norway","Leeds, England","Osaka, Japan","Denver, Colorado","Porto, Portugal","Ghent, Belgium"];

export type Person = {
  id: number; name: string; email: string; handle: string; company: string; role: string;
  status: (typeof STATUSES)[number]; country: string; city: string; activity: string;
  purchases: number; avgPrice: number; spent: number; items: number; sales: number; listed: number; wallet: string;
};

export const PEOPLE: Person[] = Array.from({ length: 40 }, (_, i) => {
  const first = FIRST[i % FIRST.length];
  const last = LAST[(i * 7 + 3) % LAST.length];
  const purchases = 12 + ((i * 37) % 180);
  const avg = 18 + ((i * 53) % 260);
  const days = ["Today", "Yesterday", "2 days ago", "Last week"][i % 4];
  return {
    id: i + 1,
    name: `${first} ${last}`,
    email: `${first}.${last}`.toLowerCase() + "@example.com",
    handle: `${first.toLowerCase()}_${last.toLowerCase().slice(0, 4)}`,
    company: COMPANIES[i % COMPANIES.length],
    role: ROLES[(i * 5) % ROLES.length],
    status: STATUSES[(i * 2) % 3],
    country: COUNTRIES[(i * 3) % COUNTRIES.length],
    city: CITIES[i % CITIES.length],
    activity: `${days}, ${String(8 + (i % 10)).padStart(2, "0")}:${String((i * 17) % 60).padStart(2, "0")}`,
    purchases, avgPrice: avg, spent: purchases * avg,
    items: 40 + ((i * 211) % 3000), sales: 4 + ((i * 97) % 2400), listed: 2 + ((i * 13) % 90),
    wallet: `0x${(4000 + i * 137).toString(16)}..${(65535 - i * 911).toString(16)}`,
  };
});

export const person = (i: number) => PEOPLE[i % PEOPLE.length];
