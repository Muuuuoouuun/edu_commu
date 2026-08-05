import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Next 16부터 `eslint` 키는 지원되지 않아 제거했다 (빌드 경고 + 타입 오류 원인).
  // 린트는 `npm run lint`로 별도 실행한다.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
