/* eslint-env mocha, es6 */

import assert from 'assert';
import md from '@gerhobbelt/markdown-it';

import plugin from '../index.js';


const render = (engine, src) => {
  const env = {};
  engine.render(src, env);
  return env;
};

const engine = md({ typographer: true, html: true })
  .use(plugin);

describe('markdown-it-title', function () {
  it('extracts entire H1 title, including inline code formatted parts', function () {
    assert.strictEqual(
      render(engine, '## H2\n\n# Hello, *`world`!(c)*').title,
      'Hello, world!©'
    );
  });

  it("finds first H1, even when it's not the first header", function () {
    assert.strictEqual(
      render(engine, '## H2\n\n# Instance reuse').title,
      'Instance reuse'
    );
  });

  it('picks first header when options.level = 0', function () {
    assert.strictEqual(
      render(md().use(plugin, { level:0 }), '## H2\n\n# H1').title,
      'H2'
    );
  });

  it('picks first H2 header when options.level = 2', function () {
    assert.strictEqual(
      render(md().use(plugin, { level:2 }), '# H1\n\n## H2').title,
      'H2'
    );
  });

  it('extracts entire title, including inline HTML parts', function () {
    assert.strictEqual(
      render(engine, '## H2\n\n# Hello, <span><span> /woild/ </span></span> *!!*').title,
      'Hello,  /woild/  !!'
    );
  });

  it('extracts inline HTML as-is, when options.html is not set for markdown-it', function () {
    assert.strictEqual(
      render(md().use(plugin), '## H2\n\n# Hello, <span><span> /woild/ </span></span> *!!*').title,
      'Hello, <span><span> /woild/ </span></span> !!'
    );
  });

});

