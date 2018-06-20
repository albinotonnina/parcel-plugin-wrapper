const Bundler = require('parcel-bundler')
const wrapperPlugin = require('../index')
const path = require('path')
const assertBundle = require('parcel-assert-bundle-tree')
const fs = require('fs')

const readFile = location =>
  new Promise((resolve, reject) =>
    fs.readFile(location, (err, data) => (err ? reject(err) : resolve(data)))
  )

describe('Asset', () => {
  it(
    'should wrap the js asset with comments',
    async () => {
      // Init bundler
      const bundler = new Bundler(path.join(__dirname, './file.js'), {
        outDir: path.join(__dirname, 'dist'),
        production: true,
        watch: false,
        cache: false,
        hmr: false,
        logLevel: 0
      })
      // Register plugin
      wrapperPlugin(bundler)

      // Bundle everything
      const bundle = await bundler.bundle()
      assertBundle(bundle, {
        type: 'js',
        name: 'file.js',
        childBundler: [
          {
            type: 'map'
          }
        ]
      })

      const expected = [
        expect.stringContaining('/* parcel-plugin-wrapper - 0.1.0 */'),
        expect.stringContaining('// The End')
      ]

      const fileContent = (await readFile(bundle.name)).toString()
      //   Check asset content
      expect({
        bundleHead: fileContent,
        bundleFoot: fileContent
      }).toEqual({
        bundleHead: expect.stringContaining(
          '/* parcel-plugin-wrapper - 0.1.0 */'
        ),
        bundleFoot: expect.stringContaining('The End')
      })
    },
    25000
  )
})
