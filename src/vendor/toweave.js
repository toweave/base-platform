/* =======================================
 * @Author: Toweave (lizi)
 * @Blog: http://www.toweave.com/
 * @Date: 2018/8/16 17:06
 * @Description: XXX
 * @license
 */
;(function () {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined
  /** Used as the semantic version number. */
  var VERSION = '0.1.9'
  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global === 'object' && global && global.Object === Object && global;
  /** Detect free variable `self`. */
  var freeSelf = typeof self === 'object' && self && self.Object === Object && self;
  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();
  /** Detect free variable `exports`. */
  var freeExports = typeof exports === 'object' && exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module === 'object' && module && !module.nodeType && module;

  var getCookie = function (cookieName) {
    if (document.cookie.length > 0) {
      var start = document.cookie.indexOf(cookieName + '=');
      if (start !== -1) {
        start = start + cookieName.length + 1;
        var end = document.cookie.indexOf(';', start);
        if (end === -1) end = document.cookie.length;
        return JSON.parse(decodeURIComponent(document.cookie.substring(start, end)));
      }
    }
  };
  var setCookie = function (cookieName, value, expireDays, path = '/', domain = location.hostname) {
    console.log(37, cookieName, value, expireDays, path, domain)
    var expire = new Date();
    expire.setDate(expire.getDate() + expireDays);
    document.cookie = cookieName + '=' + encodeURIComponent(JSON.stringify(value)) +
      ((expireDays !== null && expireDays !== '' && expireDays !== undefined) ? '; expires=' + expire.toGMTString() : '')  +
      '; path=' + path + '; domain=' + domain;
  };
  var deleteCookie = function (name) {
    var exp = new Date();
    var cookieName = getCookie(name);
    exp.setTime(exp.getTime() - 1);
    if (cookieName !== null && cookieName !== '' && cookieName !== undefined) {
      document.cookie = name + '=' + cookieName + ';expires=' + exp.toGMTString();
    }
    // alert('你清空了cookie信息。');
  };
  var setLocalStorage = function (name, value) {
    localStorage.setItem(name, JSON.stringify(value));
  };
  var getLocalStorage = function (name) {
    return JSON.parse(localStorage.getItem(name));
  };
  var deleteLocalStorage = function (name) {
    localStorage.removeItem(name);
  };
  // Export lodash.
  var toweave = {
    VERSION: VERSION,
    getCookie,
    setCookie,
    deleteCookie
  }

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    // Expose Toweave on the global object to prevent errors when Toweave is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    // Use `_.noConflict` to remove Toweave from the global object.
    root.toweave = toweave

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function () {
      return toweave
    })
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else if (freeModule) {
    // Export for Node.js.
    (freeModule.exports = toweave).toweave = toweave
    // Export for CommonJS support.
    freeExports.toweave = toweave
  }
  else {
    // Export to the global object.
    root.toweave = toweave
  }
}.call(this))
