const nextConfig = {
  distDir: '.next',
  publicRuntimeConfig: {
    env: process.env.NODE_ENV || 'dev'
  }
}

module.exports = nextConfig
