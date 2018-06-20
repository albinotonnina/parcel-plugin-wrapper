const path = require('path')
const CWD = process.cwd()
const PACKAGE = require(path.join(CWD, 'package.json'))

const yourAssetProcess = ({name, bundler}) => {
  // name = app.ere76r5e76r5e76r.js
  if (name.split('.').pop() === 'js' && bundler.options.production) {
    return {
      header: `/* ${PACKAGE.name} - ${PACKAGE.version} */`,
      footer: `// The End.`
    }
  }
}

module.exports = yourAssetProcess
