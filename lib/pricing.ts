export const PLAN_MONTHLY_PRICES: Record<string, number> = {
  arcade: 9,
  advanced: 12,
  pro: 15,
};

export const PLAN_NAMES: Record<string, string> = {
  arcade: "Arcade",
  advanced: "Advanced",
  pro: "Pro",
};

export const ADDON_MONTHLY_PRICES: Record<string, number> = {
  online: 1,
  storage: 2,
  profile: 2,
};

export const ADDON_NAMES: Record<string, string> = {
  online: "Online service",
  storage: "Larger storage",
  profile: "Customizable Profile",
};

export function computeTotal(
  plan: string,
  billingPeriod: "monthly" | "yearly",
  addons: string[]
): number {
  const planPrice = (PLAN_MONTHLY_PRICES[plan] ?? 0) * (billingPeriod === "yearly" ? 10 : 1);
  const addonPrice = addons.reduce(
    (sum, id) => sum + (ADDON_MONTHLY_PRICES[id] ?? 0) * (billingPeriod === "yearly" ? 10 : 1),
    0
  );
  return planPrice + addonPrice;
}
