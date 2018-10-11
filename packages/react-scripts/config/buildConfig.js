const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const packageJson = resolveApp('package.json');
const json = fs.existsSync(packageJson) ? require(packageJson) : {};

module.exports = json && json.build || {};