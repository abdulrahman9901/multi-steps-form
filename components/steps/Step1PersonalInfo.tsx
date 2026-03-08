"use client";

import { useState } from "react";

interface Step1PersonalInfoProps {
  onNext: (data: { name: string; email: string; phone: string }) => void;
}

export function Step1PersonalInfo({ onNext }: Step1PersonalInfoProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "This field is required";
    if (!email.trim()) next.email = "This field is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Valid email is required";
    if (!phone.trim()) next.phone = "This field is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onNext({ name: name.trim(), email: email.trim(), phone: phone.trim() });
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="step-content">
      <h1 className="step-title">Personal info</h1>
      <p className="step-description">
        Please provide your name, email address, and phone number.
      </p>
      <form onSubmit={handleSubmit} className="step-form" noValidate aria-describedby={hasErrors ? "form-errors" : undefined}>
        {hasErrors && (
          <div id="form-errors" role="alert" aria-live="polite" className="sr-only">
            {Object.keys(errors).length} error{Object.keys(errors).length > 1 ? "s" : ""} found. Please fix the fields above.
          </div>
        )}
        <div className="field">
          <div className="field__header">
            <label htmlFor="name">Name</label>
            {errors.name && (
              <span id="name-error" className="field__error" role="alert">
                {errors.name}
              </span>
            )}
          </div>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Stephen King"
            className={errors.name ? "input input--error" : "input"}
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </div>
        <div className="field">
          <div className="field__header">
            <label htmlFor="email">Email Address</label>
            {errors.email && (
              <span id="email-error" className="field__error" role="alert">
                {errors.email}
              </span>
            )}
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. stephenking@lorem.com"
            className={errors.email ? "input input--error" : "input"}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </div>
        <div className="field">
          <div className="field__header">
            <label htmlFor="phone">Phone Number</label>
            {errors.phone && (
              <span id="phone-error" className="field__error" role="alert">
                {errors.phone}
              </span>
            )}
          </div>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +1 234 567 890"
            className={errors.phone ? "input input--error" : "input"}
            aria-invalid={errors.phone ? "true" : undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </div>
        <div className="step-actions">
          <button type="submit" className="btn btn--primary">
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
}
