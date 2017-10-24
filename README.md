Webpack Strip Block
===================

Webpack loader to strip blocks of code marked by special comment tags. Useful for removing code that you don't want in your production webpack bundle (e.g. verbose console warnings, etc).

### Example:

In your client js source files:

```javascript
/* debug:start */
console.log('debug');
/* debug:end */

var makeFoo = function(bar, baz) {
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

```html
<div>
    <!-- develblock:start -->
    <div class="debug">

    </div>
    <!-- develblock:end -->
</div>
```

In your webpack config, specify the loader:

```javascript
var blocks = ['develblock'];

if (process.env.NODE_ENV === 'development') {
    blocks.push('debug');
}

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /(node_modules|bower_components|\.spec\.js)/,
                use: [{
                    loader: 'webpack-strip-blocks',
                    options: {
                        blocks: blocks,
                        start: '/*',
                        end: '*/'
                    }
                }]
            }, {
                test: /\.html$/,
                enforce: 'pre',
                use: [{
                    loader: 'webpack-strip-blocks',
                    options: {
                        blocks: blocks,
                        start: '<!--',
                        end: '-->'
                    }
                }]
            }
        ]
    }
};
```

## Laravel Mix sample

```
let mix = require( 'laravel-mix' );

/*
 |--------------------------------------------------------------------------
 | Webpack Strip Blocks
 |--------------------------------------------------------------------------
 |
 | Here you can define your custom strip tags. For example, you may use:
 | [ 'develblock', 'debug' ]
 | in order to strip "debug:start" and "debug:end" as well
 |
 */

const blocks = mix.inProduction() ? [ 'develblock' ] : null;

mix.webpackConfig( {
  module  : {
    rules : [
      {
        test    : /\.js$/,
        enforce : 'pre',
        exclude : /(node_modules|bower_components|\.spec\.js)/,
        use     : [
          {
            loader  : 'webpack-strip-blocks',
            options : {
              blocks : blocks,
              start  : '/*',
              end    : '*/'
            }
          }
        ]
      }
    ]
  }
} );

```
