const path = require('path');
const webpack = require('webpack');
const memfs = require('memfs');
const { createFsFromVolume, Volume } = memfs; 
const joinPath = require('memory-fs/lib/join');

function ensureWebpackMemoryFs(fs) {
  // Return it back, when it has Webpack 'join' method
  if (fs.join) {
    return fs
  }

  // Create FS proxy, adding `join` method to memfs, but not modifying original object
  const nextFs = Object.create(fs)
  nextFs.join = joinPath

  return nextFs
}

module.exports = function testCompiler(fixture, useParams = {}) {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: {
          loader: path.resolve(__dirname, '../index.js'),
          ...useParams
        }
      }]
    }
  });

  // create in-memory fs for testing
  let webpackFs = createFsFromVolume(new Volume());
  webpackFs = ensureWebpackMemoryFs(webpackFs);
  compiler.outputFileSystem = webpackFs;
  compiler.resolvers.context.fileSystem = webpackFs;

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      if (stats.hasErrors()) {
        return reject(new Error(stats.toJson().errors));
      }

      return resolve(stats);
    });
  });
};