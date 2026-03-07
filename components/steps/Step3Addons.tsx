"use client";

import { useState } from "react";

export type AddonId = "online" | "storage" | "profile";

const ADDONS: {
  id: AddonId;
  name: string;
  description: string;
  monthlyPrice: number;
}[] = [
  { id: "online", name: "Online service", description: "Access to multiplayer games", monthlyPrice: 1 },
  { id: "storage", name: "Larger storage", description: "Extra 1TB of cloud save", monthlyPrice: 2 },
  { id: "profile", name: "Customizable Profile", description: "Custom theme on your profile", monthlyPrice: 2 },
];

interface Step3AddonsProps {
  onNext: (data: { addons: AddonId[] }) => void;
  onBack: () => void;
  initialAddons?: AddonId[];
  billingPeriod: "monthly" | "yearly";
}

export function Step3Addons({
  onNext,
  onBack,
  initialAddons = [],
  billingPeriod,
}: Step3AddonsProps) {
  const [selected, setSelected] = useState<Set<AddonId>>(new Set(initialAddons));

  function toggle(id: AddonId) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onNext({ addons: Array.from(selected) });
  }

  function formatPrice(monthlyPrice: number) {
    if (billingPeriod === "monthly") {
      return `+$${monthlyPrice}/mo`;
    }
    const yearly = monthlyPrice * 10;
    return `+$${yearly}/yr`;
  }

  return (
    <div className="step-content">
      <h1 className="step-title">Pick add-ons</h1>
      <p className="step-description">
        Add-ons help enhance your gaming experience.
      </p>
      <form onSubmit={handleSubmit} className="step-form" noValidate>
        <div className="addon-list" role="group" aria-labelledby="addon-label">
          <span id="addon-label" className="sr-only">
            Select add-ons
          </span>
          {ADDONS.map((addon) => (
            <label
              key={addon.id}
              className={`addon-card ${selected.has(addon.id) ? "addon-card--selected" : ""}`}
            >
              <input
                type="checkbox"
                name="addons"
                value={addon.id}
                checked={selected.has(addon.id)}
                onChange={() => toggle(addon.id)}
                className="addon-card__input"
              />
              <span className="addon-card__check" aria-hidden="true">
                {selected.has(addon.id) && (
                  <img src="/assets/images/icon-checkmark.svg" alt="" width={12} height={9} />
                )}
              </span>
              <div className="addon-card__body">
                <span className="addon-card__name">{addon.name}</span>
                <span className="addon-card__desc">{addon.description}</span>
              </div>
              <span className="addon-card__price">{formatPrice(addon.monthlyPrice)}</span>
            </label>
          ))}
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
