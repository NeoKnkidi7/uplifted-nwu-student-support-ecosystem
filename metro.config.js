const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add base path for assets
config.transformer = {
  ...config.transformer,
  publicPath: '/uplifted-nwu-student-support-ecosystem/',
};

module.exports = config;
