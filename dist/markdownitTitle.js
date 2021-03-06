/*! markdown-it-title 3.0.0-5 https://github.com//GerHobbelt/markdown-it-title @license Unlicense */

function plugin(md, options) {
  const level = 'level' in (options || {}) ? options.level : 1;
  const originalHeadingOpen = md.renderer.rules.heading_open;

  md.renderer.rules.heading_open = function heading_open(tokens, idx, opts, env, self) {
    if (!env.title && (level < 1 || tokens[idx].tag === `h${level}`)) {
      env.title = tokens[idx + 1].children.filter(t => t.type === 'text' || t.type === 'code_inline') // do NOT select 'html_inline' as that node type will only carry the HTML open & close tags, *without* the innerText!
      .reduce((acc, t) => acc + t.content, '');
    } // Execute original rule.


    if (originalHeadingOpen) {
      return originalHeadingOpen.call(this, tokens, idx, opts, env, self);
    }

    return self.renderToken(tokens, idx, opts, env, self);
  };
}

export default plugin;
//# sourceMappingURL=markdownItTitle.modern.js.map
