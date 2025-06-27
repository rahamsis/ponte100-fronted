/** @type {import('next').NextConfig} */

const nextConfig = {
  api: {
    bodyParser: {
      sizeLimit: '500mb', // o lo que necesites (10mb, 50mb, etc.)
    },
  },
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
