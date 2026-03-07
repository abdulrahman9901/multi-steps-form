"use client";

import { useState } from "react";
import {
  PLAN_NAMES,
  ADDON_NAMES,
  ADDON_MONTHLY_PRICES,
  computeTotal,
} from "@/lib/pricing";
import type { PlanId } from "@/components/steps/Step2SelectPlan";
import type { AddonId } from "@/components/steps/Step3Addons";

interface Step4SummaryProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    plan: PlanId;
    billingPeriod: "monthly" | "yearly";
    addons: AddonId[];
  };
  onConfirm: () => void;
  onBack: () => void;
  onChangePlan: () => void;
}

export function Step4Summary({
  formData,
  onConfirm,
  onBack,
  onChangePlan,
}: Step4SummaryProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { plan, billingPeriod, addons } = formData;
  const isYearly = billingPeriod === "yearly";
  const periodLabel = isYearly ? "yr" : "mo";
  const total = computeTotal(plan, billingPeriod, addons);

  const planPrice = (isYearly ? 10 : 1) * (plan === "arcade" ? 9 : plan === "advanced" ? 12 : 15);

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          plan: formData.plan,
          billingPeriod: formData.billingPeriod,
          addons: formData.addons,
          total,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to submit");
        return;
      }
      onConfirm();
    } catch {
      setError("Failed to submit");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="step-content">
      <h1 className="step-title">Finishing up</h1>
      <p className="step-description">
        Double-check everything looks OK before confirming.
      </p>
      <form onSubmit={handleConfirm} className="step-form" noValidate>
        <div className="summary-box">
          <div className="summary-row summary-row--plan">
            <div>
              <span className="summary-plan-name">
                {PLAN_NAMES[plan]} ({isYearly ? "Yearly" : "Monthly"})
              </span>
              <button
                type="button"
                className="summary-change"
                onClick={onChangePlan}
              >
                Change
              </button>
            </div>
            <span className="summary-plan-price">
              ${planPrice}/{periodLabel}
            </span>
          </div>
          {addons.length > 0 && (
            <>
              <hr className="summary-divider" />
              {addons.map((id) => (
                <div key={id} className="summary-row">
                  <span className="summary-addon-name">{ADDON_NAMES[id]}</span>
                  <span className="summary-addon-price">
                    +${(ADDON_MONTHLY_PRICES[id] ?? 0) * (isYearly ? 10 : 1)}/{periodLabel}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="summary-total-wrap">
          <span className="summary-total-label">
            Total (per {isYearly ? "year" : "month"})
          </span>
          <span className="summary-total-value">
            ${total}/{periodLabel}
          </span>
        </div>
        {error && (
          <p className="field__error" role="alert">
            {error}
          </p>
        )}
        <div className="step-actions step-actions--between">
          <button type="button" onClick={onBack} className="btn btn--ghost">
            Go Back
          </button>
          <button
            type="submit"
            className="btn btn--primary"
            disabled={loading}
          >
            {loading ? "Submitting…" : "Confirm"}
          </button>
        </div>
      </form>
    </div>
  );
}
