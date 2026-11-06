import type { NextConfig } from "next";

// Antes había un `module.exports` con la config de imágenes y además un
// `export default` vacío: Next usaba el vacío y la config se ignoraba.
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
