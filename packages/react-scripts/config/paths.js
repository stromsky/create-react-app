// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end
'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const resolveAliases = () => {
  let map = Object.assign(require(resolveApp(appPaths.appPackageJson)).alias || {}, appPaths.alias || {});
  Object.getOwnPropertyNames(map).forEach(key => map[key] = path.resolve(appDirectory, resolveApp(map[key])));
  console.log('alias: ' + JSON.stringify(map));
  return map;
};

const envPublicUrl = process.env.PUBLIC_URL;

const targetAppOverridePath = resolveApp(process.env.TARGET_APP + '.paths.json');
const targetAppOverrides = fs.existsSync(targetAppOverridePath) ? require(targetAppOverridePath) : {};

const appPaths = Object.assign({
  dotenv: '.env',
  appBuild:'build',
  appPublic: 'public',
  appHtml:'public/index.html',
  appIndexJs: 'src/index.js',
  appPackageJson: 'package.json',
  appSrc: 'src',
  yarnLockFile: 'yarn.lock',
  testsSetup: 'src/setupTests.js',
  appNodeModules: 'node_modules',
}, targetAppOverrides);

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp(appPaths.dotenv),
  appBuild: resolveApp(appPaths.appBuild),
  appPublic: resolveApp(appPaths.appPublic),
  appHtml: resolveApp(appPaths.appHtml),
  appIndexJs: resolveApp(appPaths.appIndexJs),
  appPackageJson: resolveApp(appPaths.appPackageJson),
  appSrc: resolveApp(appPaths.appSrc),
  yarnLockFile: resolveApp(appPaths.yarnLockFile),
  testsSetup: resolveApp(appPaths.testsSetup),
  appNodeModules: resolveApp(appPaths.appNodeModules),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  alias: resolveAliases()
};

// @remove-on-eject-begin
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);

// config before eject: we're in ./node_modules/react-scripts/config/
module.exports = {
  appPath: resolveApp('.'),
  dotenv: resolveApp(appPaths.dotenv),
  appBuild: resolveApp(appPaths.appBuild),
  appPublic: resolveApp(appPaths.appPublic),
  appHtml: resolveApp(appPaths.appHtml),
  appIndexJs: resolveApp(appPaths.appIndexJs),
  appPackageJson: resolveApp(appPaths.appPackageJson),
  appSrc: resolveApp(appPaths.appSrc),
  yarnLockFile: resolveApp(appPaths.yarnLockFile),
  testsSetup: resolveApp(appPaths.testsSetup),
  appNodeModules: resolveApp(appPaths.appNodeModules),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  // These properties only exist before ejecting:
  ownPath: resolveOwn('.'),
  ownNodeModules: resolveOwn('node_modules'), // This is empty on npm 3
  alias: resolveAliases()
};

const ownPackageJson = require('../package.json');
const reactScriptsPath = resolveApp(`node_modules/${ownPackageJson.name}`);
const reactScriptsLinked =
  fs.existsSync(reactScriptsPath) &&
  fs.lstatSync(reactScriptsPath).isSymbolicLink();

// config before publish: we're in ./packages/react-scripts/config/
if (
  !reactScriptsLinked &&
  __dirname.indexOf(path.join('packages', 'react-scripts', 'config')) !== -1
) {
  module.exports = {
    dotenv: resolveOwn('template/.env'),
    appPath: resolveApp('.'),
    appBuild: resolveOwn('../../build'),
    appPublic: resolveOwn('template/public'),
    appHtml: resolveOwn('template/public/index.html'),
    appIndexJs: resolveOwn('template/src/index.js'),
    appPackageJson: resolveOwn('package.json'),
    appSrc: resolveOwn('template/src'),
    yarnLockFile: resolveOwn('template/yarn.lock'),
    testsSetup: resolveOwn('template/src/setupTests.js'),
    appNodeModules: resolveOwn('node_modules'),
    publicUrl: getPublicUrl(resolveOwn('package.json')),
    servedPath: getServedPath(resolveOwn('package.json')),
    // These properties only exist before ejecting:
    ownPath: resolveOwn('.'),
    ownNodeModules: resolveOwn('node_modules'),
  };
}
// @remove-on-eject-end
