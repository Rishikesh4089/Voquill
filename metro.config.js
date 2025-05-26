const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Enable package exports support (experimental)
config.resolver.unstable_enablePackageExports = false;

config.resolver.extraNodeModules = {
  stream: require.resolve('readable-stream'),
  buffer: require.resolve('buffer/'),
  events: require.resolve('events/'),                // ✅ add this line
  ws: path.resolve(__dirname, 'emptyModule.js'),     // ✅ ws stub
};

module.exports = config;
