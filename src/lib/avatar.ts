/** Deterministic person avatar. The template's only external runtime dependency. */
export const avatarUrl = (seed: string | number) =>
  `https://i.pravatar.cc/120?u=${encodeURIComponent(`fathom-${seed}`)}`;
