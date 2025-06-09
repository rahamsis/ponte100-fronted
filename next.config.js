/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack: (config, { isServer }) => {
    // Configura Webpack para manejar archivos .mjs
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    // Excluir canvas de Webpack para evitar errores al compilar
    if (!isServer) {
      config.externals = [...(config.externals || []), "canvas"];
    }

    return config;
  },
}

module.exports = nextConfig
