/*! markdown-it-title 3.0.0-2 https://github.com//GerHobbelt/markdown-it-title @license MIT */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownitTitle = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

'use strict';


module.exports = function plugin(md, options) {
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

},{}]},{},[1])(1)
});
