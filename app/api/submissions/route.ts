import { NextResponse } from "next/server";
import { saveSubmission, getSubmissions } from "@/lib/storage";

export async function GET() {
  try {
    const submissions = await getSubmissions();
    return NextResponse.json({ count: submissions.length, submissions });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load submissions" },
      { status: 500 }
    );
  }
}

function isValidEmail(email: unknown): boolean {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, plan, billingPeriod, addons, total } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json({ error: "Phone is required" }, { status: 400 });
    }
    if (!plan || !["arcade", "advanced", "pro"].includes(plan)) {
      return NextResponse.json({ error: "Valid plan is required" }, { status: 400 });
    }
    if (!billingPeriod || !["monthly", "yearly"].includes(billingPeriod)) {
      return NextResponse.json({ error: "Valid billing period is required" }, { status: 400 });
    }
    if (!Array.isArray(addons)) {
      return NextResponse.json({ error: "Addons must be an array" }, { status: 400 });
    }
    if (typeof total !== "number" || total < 0) {
      return NextResponse.json({ error: "Valid total is required" }, { status: 400 });
    }

    const id = await saveSubmission({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      plan,
      billingPeriod,
      addons,
      total,
    });
    return NextResponse.json({ id });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }
}
