import * as feedbackRepository from "@/repositories/feedbackRepository";

export function getFeedbackCategories(): string[] {
  return feedbackRepository.getFeedbackCategories();
}
