const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const nodeModules = ['tty', 'fs', 'net', 'dns', 'child_process', 'stream', 'os', 'path', 'zlib', 'http', 'https', 'crypto', 'util'];

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (nodeModules.includes(moduleName)) {
    return { type: 'empty' };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
