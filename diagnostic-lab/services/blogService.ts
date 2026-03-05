import type { BlogType } from "@/types";
import * as blogRepository from "@/repositories/blogRepository";

export function getBlogCategories(): string[] {
  return blogRepository.getBlogCategories();
}

export function getBlogPosts(): BlogType[] {
  return blogRepository.getAllBlogPosts();
}

export function getArticle() {
  return blogRepository.getArticle();
}
