import { Redis } from "@upstash/redis";
import type { Submission } from "@/types/submission";

const redis = Redis.fromEnv();

export async function saveSubmission(submission: Omit<Submission, "id" | "createdAt">): Promise<string> {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const record: Submission = {
    ...submission,
    id,
    createdAt,
  };
  await redis.rpush("submissions", JSON.stringify(record));
  return id;
}

export async function getSubmissions(): Promise<Submission[]> {
  const raw = await redis.lrange("submissions", 0, -1);
  return (raw ?? []).map((item) =>
    typeof item === "string" ? (JSON.parse(item) as Submission) : (item as Submission)
  );
}
