export interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  billingPeriod: "monthly" | "yearly";
  addons: string[];
  total: number;
  createdAt: string;
}
