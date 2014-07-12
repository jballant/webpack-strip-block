Webpack Strip Block
===================

Webpack loader to strip blocks of code marked by special comment tags

###Example:

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

In your webpack config:

```javascript
{
    module: {
        loaders: [
            { test: /\.js$/, loader: "webpack-strip-block" }
        ]
    }
};
```