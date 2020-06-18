'use strict';

/**
 * $js Helper
 * 
 * Syntax:
 *  <%- $js(path [ isExternal]) %>
 *  path - can be string or array for internal .js file, but string only for external
 * 
 * e.g. <%- $js('https://example/index.js', true) %>
 * e.g. <%- $js(['layout', '/index.js']) %>
 * e.g. <%- $js('layout') %>
 */

const DATE = Date.now();
const START = '/';
const FOLDER = 'asset/js/';
const END = '.js';
const ERROR = '<!-- Error:Helper/$js -->';

/**
 * Generate a HTML <script> tag for a path
 * 
 * @param {string} path 
 * @param {boolean} isExternal 
 */
const makeHtmlTag = (path, isExternal) => {
  if (typeof path === 'string') {
    if (isExternal) {
      return '<script async src="' + path + '"></script>';
    }
    if (!path.startsWith(START)) {
      if (!path.startsWith(FOLDER)) {
        path = FOLDER + path;
      }
      path = START + path;
    }
    if (!path.endsWith(END)) {
      path = path + END;
    }
    return '<script async src="' + path + '?t=' + DATE + '"></script>';
  }
  return ERROR;
};

module.exports = function (path, isExternal = false) {
  if (isExternal) {
    return makeHtmlTag(path, true);
  }
  if (typeof path === 'object' && path.length) {
    let result = '';
    path.forEach(p => {
      result += makeHtmlTag(p, false);
    });
    return result;
  } else {
    return makeHtmlTag(path, false);
  }
};