import type { BlogType } from "@/types";

import blogsData from "@/data/blogs.json";
import articleData from "@/data/article.json";

export function getBlogCategories(): string[] {
  return [...(blogsData.categories as string[])];
}

export function getAllBlogPosts(): BlogType[] {
  return JSON.parse(JSON.stringify(blogsData.posts)) as BlogType[];
}

export function getArticle() {
  return JSON.parse(JSON.stringify(articleData));
}
