/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude native Node.js modules from Webpack processing
      config.externals = config.externals || [];
      config.externals.push(({ request }, callback) => {
        if (/\.node$/.test(request)) {
          return callback(null, `commonjs ${request}`);
        }
        callback();
      });
    }

    // Add a rule to handle `.node` files using `node-loader`
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader",
    });

    return config;
  },
};

export default nextConfig;
