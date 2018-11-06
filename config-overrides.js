/* OLD
const { compose } = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const rewirePolyfills = require('react-app-rewire-polyfills');

module.exports = compose (
  rewirePolyfills,
  rewireEslint
);
*/
const { override, useEslintRc } = require('customize-cra');

module.exports = override(useEslintRc());
