/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.imgur.com", "res.cloudinary.com", "th.bing.com"], // Cho phép hình ảnh từ domain này
  },
  reactStrictMode: false,
};

export default nextConfig;
