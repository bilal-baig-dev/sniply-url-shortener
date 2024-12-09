import nextMDX from "@next/mdx";
/** @type {import('next').NextConfig} */
import remarkGfm from "remark-gfm";

const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
  },
});

export default withMDX(nextConfig);
