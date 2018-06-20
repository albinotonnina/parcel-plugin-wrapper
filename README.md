# parcel-plugin-wrapper

## Q:What is this thing solving?

Tiny Parcel plugin that wraps output files with custom text or code.

This plugins imitates pretty much what [wrapper-webpack-plugin](https://github.com/levp/wrapper-webpack-plugin) does.

## Install

```
yarn add parcel-plugin-wrapper --dev
```

## Usage

Create a `.assetWrapper.js` file in the root folder of your project.

#### Example 1, add some data coming from package.json:

```javascript
const path = require('path')

const CWD = process.cwd()
const PACKAGE = require(path.join(CWD, 'package.json'))

const yourAssetProcess = async ({name, bundler}) => {
  // name = app.ere76r5e76r5e76r.js
  if (name.split('.').pop() === 'js' && bundler.options.production) {
    return {
      header: `/* ${PACKAGE.name} - ${PACKAGE.version} */`,
      footer: `// The End.`
    }
  }
}

module.exports = yourAssetProcess
```

#### Will output:

```javascript
/* your-project - 3.4.56 */
parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire.etc.etc.etc...
[...bla]
[...bla]
[...bla]
// The End
```

#### Example 2, Wraps bundle files with '.js' extension in a self invoking function and enables strict mode:

```javascript
const path = require('path')

const yourAssetProcess = ({name, bundler}) => {
  if (name.split('.').pop() === 'js' && bundler.options.production) {
    return {
      header: '(function () { "use strict";\n',
      footer: '\n})();'
    }
  }
}

module.exports = yourAssetProcess
```

## Maintainers

[@albinotonnina](https://github.com/albinotonnina)

## Contribute

PRs accepted.

## License

MIT © 2018 Albino Tonnina
