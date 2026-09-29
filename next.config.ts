import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      { source: "/training/courses", destination: "/payroll-training/courses", permanent: true },
      {
        source: "/blog/payroll-remediation-program-guide",
        destination: "/blog/payroll-remediation",
        permanent: true,
      },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
