"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Step1PersonalInfo } from "@/components/steps/Step1PersonalInfo";
import { Step2SelectPlan, type PlanId } from "@/components/steps/Step2SelectPlan";
import { Step3Addons, type AddonId } from "@/components/steps/Step3Addons";
import { Step4Summary } from "@/components/steps/Step4Summary";
import { Step5ThankYou } from "@/components/steps/Step5ThankYou";

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    plan?: PlanId;
    billingPeriod?: "monthly" | "yearly";
    addons?: AddonId[];
  }>({});

  function handleStep1Next(data: { name: string; email: string; phone: string }) {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  }

  function handleStep2Next(data: { plan: PlanId; billingPeriod: "monthly" | "yearly" }) {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(3);
  }

  function handleStep2Back() {
    setStep(1);
  }

  function handleStep3Next(data: { addons: AddonId[] }) {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(4);
  }

  function handleStep3Back() {
    setStep(2);
  }

  function handleStep4Back() {
    setStep(3);
  }

  function handleChangePlan() {
    setStep(2);
  }

  function handleConfirm() {
    setStep(5);
  }

  const canShowSummary =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.plan &&
    formData.billingPeriod &&
    Array.isArray(formData.addons);

  return (
    <main className="page">
      <div className="card">
        <Sidebar
          currentStep={step === 5 ? 4 : step}
          onStepSelect={(s) => setStep(s)}
        />
        <div className="card__content">
          {step === 1 && (
            <Step1PersonalInfo
              onNext={handleStep1Next}
              initialName={formData.name}
              initialEmail={formData.email}
              initialPhone={formData.phone}
            />
          )}
          {step === 2 && (
            <Step2SelectPlan
              onNext={handleStep2Next}
              onBack={handleStep2Back}
              initialPlan={formData.plan}
              initialBillingPeriod={formData.billingPeriod}
            />
          )}
          {step === 3 && (
            <Step3Addons
              onNext={handleStep3Next}
              onBack={handleStep3Back}
              initialAddons={formData.addons}
              billingPeriod={formData.billingPeriod ?? "monthly"}
            />
          )}
          {step === 4 && canShowSummary && (
            <Step4Summary
              formData={{
                name: formData.name!,
                email: formData.email!,
                phone: formData.phone!,
                plan: formData.plan!,
                billingPeriod: formData.billingPeriod!,
                addons: formData.addons!,
              }}
              onConfirm={handleConfirm}
              onBack={handleStep4Back}
              onChangePlan={handleChangePlan}
            />
          )}
          {step === 5 && <Step5ThankYou />}
        </div>
      </div>
    </main>
  );
}
