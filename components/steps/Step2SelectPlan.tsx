"use client";

import { useState } from "react";

export type PlanId = "arcade" | "advanced" | "pro";

const PLANS: { id: PlanId; name: string; monthlyPrice: number; icon: string }[] = [
  { id: "arcade", name: "Arcade", monthlyPrice: 9, icon: "/assets/images/icon-arcade.svg" },
  { id: "advanced", name: "Advanced", monthlyPrice: 12, icon: "/assets/images/icon-advanced.svg" },
  { id: "pro", name: "Pro", monthlyPrice: 15, icon: "/assets/images/icon-pro.svg" },
];

interface Step2SelectPlanProps {
  onNext: (data: { plan: PlanId; billingPeriod: "monthly" | "yearly" }) => void;
  onBack: () => void;
  initialPlan?: PlanId | null;
  initialBillingPeriod?: "monthly" | "yearly";
}

export function Step2SelectPlan({
  onNext,
  onBack,
  initialPlan = null,
  initialBillingPeriod = "monthly",
}: Step2SelectPlanProps) {
  const [plan, setPlan] = useState<PlanId | null>(initialPlan ?? null);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(initialBillingPeriod);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!plan) {
      setError("Please select a plan");
      return;
    }
    setError(null);
    onNext({ plan, billingPeriod });
  }

  function formatPrice(monthlyPrice: number) {
    if (billingPeriod === "monthly") {
      return `$${monthlyPrice}/mo`;
    }
    const yearly = monthlyPrice * 10;
    return `$${yearly}/yr`;
  }

  return (
    <div className="step-content">
      <h1 className="step-title">Select your plan</h1>
      <p className="step-description">
        You have the option of monthly or yearly billing.
      </p>
      <form onSubmit={handleSubmit} className="step-form" noValidate>
        <div className="plan-grid" role="group" aria-labelledby="plan-label">
          <span id="plan-label" className="sr-only">
            Choose a plan
          </span>
          {PLANS.map((p) => (
            <label
              key={p.id}
              className={`plan-card ${plan === p.id ? "plan-card--selected" : ""}`}
            >
              <input
                type="radio"
                name="plan"
                value={p.id}
                checked={plan === p.id}
                onChange={() => setPlan(p.id)}
                className="plan-card__input"
              />
              <img
                src={p.icon}
                alt=""
                width={40}
                height={40}
                className="plan-card__icon"
              />
              <span className="plan-card__name">{p.name}</span>
              <span className="plan-card__price">{formatPrice(p.monthlyPrice)}</span>
              {billingPeriod === "yearly" && (
                <span className="plan-card__badge">2 months free</span>
              )}
            </label>
          ))}
        </div>
        {error && (
          <p className="field__error" role="alert">
            {error}
          </p>
        )}
        <div className="toggle-wrap">
          <span className={billingPeriod === "monthly" ? "toggle-label toggle-label--active" : "toggle-label"}>
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={billingPeriod === "yearly"}
            aria-label="Billing period: monthly or yearly"
            className="toggle"
            onClick={() => setBillingPeriod((prev) => (prev === "monthly" ? "yearly" : "monthly"))}
          >
            <span className="toggle__knob" />
          </button>
          <span className={billingPeriod === "yearly" ? "toggle-label toggle-label--active" : "toggle-label"}>
            Yearly
          </span>
        </div>
        <div className="step-actions step-actions--between">
          <button type="button" onClick={onBack} className="btn btn--ghost">
            Go Back
          </button>
          <button type="submit" className="btn btn--primary">
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
}
