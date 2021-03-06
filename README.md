# markdown-it-title [![npm version](http://img.shields.io/npm/v/markdown-it-title.svg?style=flat-square)](https://www.npmjs.org/package/markdown-it-title)

> Extract title during [markdown-it] parsing.

[markdown-it]: https://github.com/markdown-it/markdown-it

Usage
-----

```js
const md = require('markdown-it')({ typographer: true })

// Default parameters (find `<h1>`).
md.use(require('markdown-it-title'))

// Find whatever heading comes first.
// md.use(require('markdown-it-title'), { level: 0 })

// Find `<h2>`.
// md.use(require('markdown-it-title'), { level: 2 })

const env = {}
md.render('# Hello, *`world`!(c)*', env)
env.title === 'Hello, world!©'
```
