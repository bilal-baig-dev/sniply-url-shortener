import BackButton from "@/components/common/BackButton";
import MDXContent from "@/components/blog/mdx/MDXContent";
import Section from "@/components/common/Section";
import { appConfig } from "@/config/appConfig";
import { BlogPostsResponse } from "@/interfaces";
import { getAllBlogPostsWithCategories, getLegalPageDataBySlug } from "@/lib/mdx/mdxUtils";
import matter from "gray-matter";
import { Metadata } from "next";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const { frontMatter } = await getPageDataBySlug(slug);

  return {
    title: `${frontMatter.title} | ${appConfig.appName}`,
    description: frontMatter.description,
  };
}

async function getPageDataBySlug(slug: string) {
  const post = getLegalPageDataBySlug({ slug });
  const { content, data } = matter(post);
  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
  return { source: mdxSource, frontMatter: data };
}
export async function generateStaticParams() {
  const { posts: allPostsData }: BlogPostsResponse = getAllBlogPostsWithCategories();

  return allPostsData.map((post) => ({
    slug: post.slug,
  }));
}

async function TermsOfServices({ params: { slug } }: { params: { slug: string } }) {
  const { source } = await getPageDataBySlug(slug);
  return (
    <Section className="mt-8 items-justify max-w-4xl flex-col gap-4 mdx-wrapper">
      <div className="flex items-center">
        <BackButton text="Back" url="/" />
      </div>
      <MDXContent source={source} />
    </Section>
  );
}

export default TermsOfServices;
