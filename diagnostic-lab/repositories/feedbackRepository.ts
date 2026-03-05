import feedbackData from "@/data/feedback.json";

export function getFeedbackCategories(): string[] {
  return [...(feedbackData.categories as string[])];
}
