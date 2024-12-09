import { BlogPostProps, BlogPostsResponse, CategoyProps } from "@/interfaces";
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";

const legalContentDir = path.join(process.cwd(), "src/data/legal");

export function getFiles() {
  return getFilesRecursive(legalContentDir);
}

function getFilesRecursive(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursive(filePath));
    } else {
      results.push(filePath);
    }
  });

  return results;
}

export function getFileBySlug({ fileName, slug }: { fileName?: string; slug?: string }) {
  const files = getFilesRecursive(legalContentDir);

  const filePath = slug ? files.find((file) => file.includes(`${slug}.mdx`)) : fileName ? files.find((file) => file.includes(fileName)) : undefined;

  if (!filePath) {
    return notFound();
  }

  const source = fs.readFileSync(filePath, "utf8");

  return source;
}

export function getAllBlogPostsWithCategories(): BlogPostsResponse {
  const fileNames = getFiles();
  let categories: string[] = [];
  const allPostsData = fileNames.map((filePath) => {
    const fileContents = getFileBySlug({ fileName: filePath });

    const matterResult = matter(fileContents);

    const slug = path.basename(filePath)?.split(".")[0];
    return {
      ...matterResult.data,
      fileName: path.basename(filePath),
      slug,
    } as BlogPostProps;
  });

  return {
    posts: allPostsData
      .filter((el) => !Boolean(el.draft))
      .sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        } else {
          return -1;
        }
      }),
    categories: categories?.map((el) => {
      return {
        name: el,
        isSelected: false,
      };
    }),
  };
}

function getCategoryMatchScore(postCategories: string[], targetCategories: string[]): number {
  return postCategories.filter((category) => targetCategories.includes(category)).length;
}
export function getTopPostsByCategoryMatch(targetCategories: string[], slug: string) {
  const { posts, categories }: BlogPostsResponse = getAllBlogPostsWithCategories();
  const categoryNames = categories.map((category) => category.name);
  const filteredPosts = posts.filter((post) => post.slug === slug);

  const postsWithScores = filteredPosts.map((post) => ({
    ...post,
    matchScore: getCategoryMatchScore(categoryNames, targetCategories),
  }));
  const topPosts = postsWithScores.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);

  return topPosts;
}

export function getLegalPageDataBySlug({ slug }: { fileName?: string; slug?: string }) {
  const files = getFilesRecursive(legalContentDir);

  const filePath = files.find((file) => file.includes(`${slug}.mdx`));

  if (!filePath) {
    notFound();
  }

  const source = fs.readFileSync(filePath, "utf8");

  return source;
}
