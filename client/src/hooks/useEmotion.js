// Naive emotion detector: stub for demo, replace with a real model as needed
export default function useEmotion(text) {
  const lower = text.toLowerCase();
  if (lower.includes("happy") || lower.includes("great") || lower.includes("awesome")) return "happy";
  if (lower.includes("sad") || lower.includes("tired") || lower.includes("bad")) return "sad";
  if (lower.includes("angry") || lower.includes("mad")) return "angry";
  if (lower.includes("excited")) return "excited";
  if (lower.includes("nervous")) return "nervous";
  return "neutral";
}