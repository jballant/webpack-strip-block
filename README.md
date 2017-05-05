Webpack Strip Block
===================

Webpack loader to strip blocks of code marked by special comment tags. Useful for removing code that you don't want in your production webpack bundle (e.g. verbose console warnings, etc).

### Example:

In your client js source files:

```javascript

var makeFoo(bar, baz) {
    // The following code will be stripped with our webpack loader
    /* develblock:start */
    if (bar instanceof Bar !== true) {
        throw new Error('makeFoo: bar param is required and must be instance of Bar');
    }
    /* develblock:end */

    // This code would remain
    return new Foo(bar, baz);
}

```

In your webpack config, specify the loader:

```javascript
module.exports = {
  rules: [
    {
      test: /\.js$/,
      enforce: 'pre',
      exclude: /(node_modules|bower_components|\.spec\.js)/,
      use: [
        {
          loader: 'webpack-strip-block'
        }
      ]
    }
  ]
};
```

If you want to use custom comment tags to mark the start and end of the block to strip from your code, you can add options for "start" and "end" like this:

```javascript
module.exports = {
  rules: [
    {
      test: /\.js$/,
      enforce: 'pre',
      exclude: /(node_modules|bower_components|\.spec\.js)/,
      use: [
        {
          loader: 'webpack-strip-block',
          options: {
            start: 'DEV-START',
            end: 'DEV-END'
          }
        }
      ]
    }
  ]
};
```
