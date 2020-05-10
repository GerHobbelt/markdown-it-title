var markdownItTitle = function plugin(md, options) {
  const level = ('level' in (options || {})) ? options.level : 1;
  const originalHeadingOpen = md.renderer.rules.heading_open;

  md.renderer.rules.heading_open = function (...args) {
    const [ tokens, idx, , env, self ] = args;

    if (!env.title && (level < 1 || tokens[idx].tag === `h${level}`)) {
      env.title = tokens[idx + 1].children
        .filter(t => t.type === 'text' || t.type === 'code_inline')
        // do NOT select 'html_inline' as that node type will only carry the HTML open & close tags, *without* the innerText!
        .reduce((acc, t) => acc + t.content, '');
    }

    // Execute original rule.
    if (originalHeadingOpen) {
      return originalHeadingOpen.apply(this, args);
    }
    return self.renderToken(...args);
  };
};

export default markdownItTitle;
