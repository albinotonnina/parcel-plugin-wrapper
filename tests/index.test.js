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
        expect.stringContaining('/* parcel-plugin-wrapper - 0.2.0 */'),
        expect.stringContaining('// The End')
      ]

      const fileContent = (await readFile(bundle.name)).toString()
      //   Check asset content
      expect({
        bundleHead: fileContent,
        bundleFoot: fileContent
      }).toEqual({
        bundleHead: expect.stringContaining(
          '/* parcel-plugin-wrapper - 0.2.0 */'
        ),
        bundleFoot: expect.stringContaining('The End')
      })
    },
    25000
  )

  it(
    'should work with multiple entry points',
    async () => {
      // Init bundler
      const bundler = new Bundler(
        [path.join(__dirname, './file.js'), path.join(__dirname, './file2.js')],
        {
          outDir: path.join(__dirname, 'dist'),
          production: true,
          watch: false,
          cache: false,
          hmr: false,
          logLevel: 0
        }
      )
      // Register plugin
      wrapperPlugin(bundler)

      // Bundle everything
      await bundler.bundle()

      //   Check asset content
      const filename = path.join(__dirname, './dist/file.js')
      const fileContent = (await readFile(filename)).toString()
      const fileLines = fileContent.split('\n')
      const firstLine = fileLines[0]
      const lastLine = fileLines[fileLines.length - 1]

      expect(firstLine).toMatch('/* parcel-plugin-wrapper - 0.2.0 */')
      expect(lastLine).toMatch('The End')
    },
    25000
  )
})
