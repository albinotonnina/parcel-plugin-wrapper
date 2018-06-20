const path = require('path')
const logger = require('parcel-bundler/src/Logger')

module.exports = function(bundler) {
  const processAsset = (bundle, publicURL) => {
    let output = path.join(publicURL, path.basename(bundle.name))
    let input = bundle.entryAsset
      ? bundle.entryAsset.basename
      : bundle.assets.values().next().value.basename

    console.log('input', input)
    console.log('output', output)

    bundle.childBundles.forEach(function(bundle) {
      processAsset(bundle, publicURL)
    })
  }

  bundler.on('bundled', bundle => {
    const publicURL = bundle.entryAsset.options.publicURL

    logger.status('start')
    processAsset(bundle, publicURL)
  })
}
