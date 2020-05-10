'use strict';

/*eslint-env mocha*/

const { strictEqual: equal } = require('assert');
const md = require('@gerhobbelt/markdown-it');
const title = require('../');

const render = (engine, src) => {
  const env = {};
  engine.render(src, env);
  return env;
};

const engine = md({ typographer: true, html: true })
  .use(title);

describe('markdown-it-title', function () {
  it('extracts entire H1 title, including inline code formatted parts', function () {
    equal(
      render(engine, '## H2\n\n# Hello, *`world`!(c)*').title,
      'Hello, world!©'
    );
  });

  it("finds first H1, even when it's not the first header", function () {
    equal(
      render(engine, '## H2\n\n# Instance reuse').title,
      'Instance reuse'
    );
  });

  it('picks first header when options.level = 0', function () {
    equal(
      render(md().use(title, { level:0 }), '## H2\n\n# H1').title,
      'H2'
    );
  });

  it('picks first H2 header when options.level = 2', function () {
    equal(
      render(md().use(title, { level:2 }), '# H1\n\n## H2').title,
      'H2'
    );
  });

  it('extracts entire title, including inline HTML parts', function () {
    equal(
      render(engine, '## H2\n\n# Hello, <span><span> /woild/ </span></span> *!!*').title,
      'Hello,  /woild/  !!'
    );
  });

  it('extracts inline HTML as-is, when options.html is not set for markdown-it', function () {
    equal(
      render(md().use(title), '## H2\n\n# Hello, <span><span> /woild/ </span></span> *!!*').title,
      'Hello, <span><span> /woild/ </span></span> !!'
    );
  });

});

