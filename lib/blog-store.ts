"use client";

import { BLOG_POSTS, BlogPost } from "@/lib/masta-data";

const STORAGE_KEY = "nyala_custom_blog_posts";
const DELETED_KEY = "nyala_deleted_blog_slugs";

/**
 * Get all blog posts, combining default posts with custom/scraped posts
 * and filtering out deleted posts.
 */
export function getAllBlogPosts(): BlogPost[] {
  if (typeof window === "undefined") {
    return BLOG_POSTS;
  }

  try {
    const deletedSlugs: string[] = JSON.parse(localStorage.getItem(DELETED_KEY) || "[]");
    const customPosts: BlogPost[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    // Filter default posts by deletedSlugs and replace with custom posts if overridden
    const customSlugMap = new Map(customPosts.map(p => [p.slug, p]));
    
    const activeDefaultPosts = BLOG_POSTS
      .filter(p => !deletedSlugs.includes(p.slug) && !customSlugMap.has(p.slug));

    const activeCustomPosts = customPosts
      .filter(p => !deletedSlugs.includes(p.slug));

    return [...activeCustomPosts, ...activeDefaultPosts];
  } catch (err) {
    console.error("Error reading blog posts from storage:", err);
    return BLOG_POSTS;
  }
}

/**
 * Get a single blog post by slug.
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const allPosts = getAllBlogPosts();
  return allPosts.find(p => p.slug === slug);
}

/**
 * Save or update a blog post.
 */
export function saveBlogPost(post: BlogPost): void {
  if (typeof window === "undefined") return;

  try {
    const customPosts: BlogPost[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const deletedSlugs: string[] = JSON.parse(localStorage.getItem(DELETED_KEY) || "[]");

    // Remove from deleted list if re-saving
    const updatedDeleted = deletedSlugs.filter(s => s !== post.slug);
    localStorage.setItem(DELETED_KEY, JSON.stringify(updatedDeleted));

    // Update or insert in custom posts
    const existingIndex = customPosts.findIndex(p => p.slug === post.slug);
    if (existingIndex >= 0) {
      customPosts[existingIndex] = post;
    } else {
      customPosts.unshift(post);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(customPosts));
  } catch (err) {
    console.error("Error saving blog post:", err);
  }
}

/**
 * Delete a blog post by slug.
 */
export function deleteBlogPost(slug: string): void {
  if (typeof window === "undefined") return;

  try {
    // 1. Remove from custom posts
    const customPosts: BlogPost[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const filteredCustom = customPosts.filter(p => p.slug !== slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCustom));

    // 2. Add to deleted slugs list (in case it's a default post)
    const deletedSlugs: string[] = JSON.parse(localStorage.getItem(DELETED_KEY) || "[]");
    if (!deletedSlugs.includes(slug)) {
      deletedSlugs.push(slug);
      localStorage.setItem(DELETED_KEY, JSON.stringify(deletedSlugs));
    }
  } catch (err) {
    console.error("Error deleting blog post:", err);
  }
}

/**
 * Import a list of scraped posts from UMKT.
 */
export function importScrapedPosts(scrapedPosts: BlogPost[]): number {
  if (typeof window === "undefined") return 0;

  try {
    let importedCount = 0;
    const customPosts: BlogPost[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const existingSlugSet = new Set(getAllBlogPosts().map(p => p.slug));

    for (const post of scrapedPosts) {
      if (!existingSlugSet.has(post.slug)) {
        customPosts.unshift(post);
        existingSlugSet.add(post.slug);
        importedCount++;
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(customPosts));
    return importedCount;
  } catch (err) {
    console.error("Error importing scraped posts:", err);
    return 0;
  }
}

/**
 * Reset all blog posts to initial defaults.
 */
export function resetBlogPostsToDefault(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(DELETED_KEY);
}
