# parcel-plugin-wrapper

## Q:What is this thing solving?

Tiny Parcel plugin that wraps output files with custom text or code.

## Install

```
yarn add parcel-plugin-wrapper --dev
```

## Usage

Create a `.assetWrapper.js` file in the root folder of your project.

example:

```javascript
const yourAssetProcess = async ({name, bundler}) => {
  //name = app.ere76r5e76r5e76r.js
  //bundler.options.production = true/false

  if (name.split('.').pop() === 'js' && bundler.options.production) {
    return {
      header: `/* ${PACKAGE.name} - ${PACKAGE.version} */`,
      footer: `// The End.`
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
