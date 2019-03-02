'use strict';

const buildConfig = require('./buildConfig');
let paths = require('./defaultPaths');

const targetApp = process.env.TARGET_APP || 'default'

let customPaths = (buildConfig && buildConfig.paths && buildConfig.paths[targetApp]);

if (customPaths) {
  const resolvedCustomPaths = {};
  const customProps = Object.getOwnPropertyNames(customPaths);
  for (let i = 0; i < customProps.length; i++) {
    const propName = customProps[i];
    switch(propName) {
      case 'dotenv':
      case 'appPath':
      case 'appBuild':
      case 'appPublic':
      case 'appHtml':
      case 'appPackageJson':
      case 'appSrc':
      case 'appTsConfig':
      case 'yarnLockFile':
      case 'proxySetup':
      case 'appNodeModules':
        resolvedCustomPaths[propName] = paths.resolveApp(customPaths[propName]);
        break;
      case 'appIndexJs':
      case 'testsSetup':
        resolvedCustomPaths[propName] = paths.resolveModule(paths.resolveApp, customPaths[propName]);
        break;
      case 'publicUrl':
        resolvedCustomPaths[propName] = paths.getPublicUrl(paths.resolveApp(customPaths[propName]));
        break;
      case 'servedPath':
        resolvedCustomPaths[propName] = paths.getServedPath(paths.resolveApp(customPaths[propName]));
        break;
    }
  }
  customPaths = resolvedCustomPaths;
}

paths = Object.assign(paths, customPaths);

if (buildConfig && buildConfig.babel && buildConfig.babel.include) {
  const include = buildConfig.babel.include;
  if (include.length) {
    paths.babelInclude = include.map(i => paths.resolveApp(i))
  }
}

module.exports = paths;