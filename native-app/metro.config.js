const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Create empty shim path
const emptyShim = path.resolve(__dirname, 'shims/empty.js');

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  tty: emptyShim,
  fs: emptyShim,
  net: emptyShim,
  dns: emptyShim,
  child_process: emptyShim,
  stream: emptyShim,
  os: emptyShim,
  path: emptyShim,
  zlib: emptyShim,
  http: emptyShim,
  https: emptyShim,
  crypto: emptyShim,
};

module.exports = config;
