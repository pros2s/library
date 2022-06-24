(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],2:[function(require,module,exports){
var arrayLikeToArray = require("./arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayLikeToArray.js":1}],3:[function(require,module,exports){
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],4:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],5:[function(require,module,exports){
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],6:[function(require,module,exports){
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],7:[function(require,module,exports){
var arrayWithoutHoles = require("./arrayWithoutHoles.js");

var iterableToArray = require("./iterableToArray.js");

var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");

var nonIterableSpread = require("./nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayWithoutHoles.js":2,"./iterableToArray.js":5,"./nonIterableSpread.js":6,"./unsupportedIterableToArray.js":8}],8:[function(require,module,exports){
var arrayLikeToArray = require("./arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayLikeToArray.js":1}],9:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":11}],10:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  /**
   * Applies the :focus-visible polyfill at the given scope.
   * A scope in this case is either the top-level Document or a Shadow Root.
   *
   * @param {(Document|ShadowRoot)} scope
   * @see https://github.com/WICG/focus-visible
   */
  function applyFocusVisiblePolyfill(scope) {
    var hadKeyboardEvent = true;
    var hadFocusVisibleRecently = false;
    var hadFocusVisibleRecentlyTimeout = null;

    var inputTypesAllowlist = {
      text: true,
      search: true,
      url: true,
      tel: true,
      email: true,
      password: true,
      number: true,
      date: true,
      month: true,
      week: true,
      time: true,
      datetime: true,
      'datetime-local': true
    };

    /**
     * Helper function for legacy browsers and iframes which sometimes focus
     * elements like document, body, and non-interactive SVG.
     * @param {Element} el
     */
    function isValidFocusTarget(el) {
      if (
        el &&
        el !== document &&
        el.nodeName !== 'HTML' &&
        el.nodeName !== 'BODY' &&
        'classList' in el &&
        'contains' in el.classList
      ) {
        return true;
      }
      return false;
    }

    /**
     * Computes whether the given element should automatically trigger the
     * `focus-visible` class being added, i.e. whether it should always match
     * `:focus-visible` when focused.
     * @param {Element} el
     * @return {boolean}
     */
    function focusTriggersKeyboardModality(el) {
      var type = el.type;
      var tagName = el.tagName;

      if (tagName === 'INPUT' && inputTypesAllowlist[type] && !el.readOnly) {
        return true;
      }

      if (tagName === 'TEXTAREA' && !el.readOnly) {
        return true;
      }

      if (el.isContentEditable) {
        return true;
      }

      return false;
    }

    /**
     * Add the `focus-visible` class to the given element if it was not added by
     * the author.
     * @param {Element} el
     */
    function addFocusVisibleClass(el) {
      if (el.classList.contains('focus-visible')) {
        return;
      }
      el.classList.add('focus-visible');
      el.setAttribute('data-focus-visible-added', '');
    }

    /**
     * Remove the `focus-visible` class from the given element if it was not
     * originally added by the author.
     * @param {Element} el
     */
    function removeFocusVisibleClass(el) {
      if (!el.hasAttribute('data-focus-visible-added')) {
        return;
      }
      el.classList.remove('focus-visible');
      el.removeAttribute('data-focus-visible-added');
    }

    /**
     * If the most recent user interaction was via the keyboard;
     * and the key press did not include a meta, alt/option, or control key;
     * then the modality is keyboard. Otherwise, the modality is not keyboard.
     * Apply `focus-visible` to any current active element and keep track
     * of our keyboard modality state with `hadKeyboardEvent`.
     * @param {KeyboardEvent} e
     */
    function onKeyDown(e) {
      if (e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }

      if (isValidFocusTarget(scope.activeElement)) {
        addFocusVisibleClass(scope.activeElement);
      }

      hadKeyboardEvent = true;
    }

    /**
     * If at any point a user clicks with a pointing device, ensure that we change
     * the modality away from keyboard.
     * This avoids the situation where a user presses a key on an already focused
     * element, and then clicks on a different element, focusing it with a
     * pointing device, while we still think we're in keyboard modality.
     * @param {Event} e
     */
    function onPointerDown(e) {
      hadKeyboardEvent = false;
    }

    /**
     * On `focus`, add the `focus-visible` class to the target if:
     * - the target received focus as a result of keyboard navigation, or
     * - the event target is an element that will likely require interaction
     *   via the keyboard (e.g. a text box)
     * @param {Event} e
     */
    function onFocus(e) {
      // Prevent IE from focusing the document or HTML element.
      if (!isValidFocusTarget(e.target)) {
        return;
      }

      if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
        addFocusVisibleClass(e.target);
      }
    }

    /**
     * On `blur`, remove the `focus-visible` class from the target.
     * @param {Event} e
     */
    function onBlur(e) {
      if (!isValidFocusTarget(e.target)) {
        return;
      }

      if (
        e.target.classList.contains('focus-visible') ||
        e.target.hasAttribute('data-focus-visible-added')
      ) {
        // To detect a tab/window switch, we look for a blur event followed
        // rapidly by a visibility change.
        // If we don't see a visibility change within 100ms, it's probably a
        // regular focus change.
        hadFocusVisibleRecently = true;
        window.clearTimeout(hadFocusVisibleRecentlyTimeout);
        hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
          hadFocusVisibleRecently = false;
        }, 100);
        removeFocusVisibleClass(e.target);
      }
    }

    /**
     * If the user changes tabs, keep track of whether or not the previously
     * focused element had .focus-visible.
     * @param {Event} e
     */
    function onVisibilityChange(e) {
      if (document.visibilityState === 'hidden') {
        // If the tab becomes active again, the browser will handle calling focus
        // on the element (Safari actually calls it twice).
        // If this tab change caused a blur on an element with focus-visible,
        // re-apply the class when the user switches back to the tab.
        if (hadFocusVisibleRecently) {
          hadKeyboardEvent = true;
        }
        addInitialPointerMoveListeners();
      }
    }

    /**
     * Add a group of listeners to detect usage of any pointing devices.
     * These listeners will be added when the polyfill first loads, and anytime
     * the window is blurred, so that they are active when the window regains
     * focus.
     */
    function addInitialPointerMoveListeners() {
      document.addEventListener('mousemove', onInitialPointerMove);
      document.addEventListener('mousedown', onInitialPointerMove);
      document.addEventListener('mouseup', onInitialPointerMove);
      document.addEventListener('pointermove', onInitialPointerMove);
      document.addEventListener('pointerdown', onInitialPointerMove);
      document.addEventListener('pointerup', onInitialPointerMove);
      document.addEventListener('touchmove', onInitialPointerMove);
      document.addEventListener('touchstart', onInitialPointerMove);
      document.addEventListener('touchend', onInitialPointerMove);
    }

    function removeInitialPointerMoveListeners() {
      document.removeEventListener('mousemove', onInitialPointerMove);
      document.removeEventListener('mousedown', onInitialPointerMove);
      document.removeEventListener('mouseup', onInitialPointerMove);
      document.removeEventListener('pointermove', onInitialPointerMove);
      document.removeEventListener('pointerdown', onInitialPointerMove);
      document.removeEventListener('pointerup', onInitialPointerMove);
      document.removeEventListener('touchmove', onInitialPointerMove);
      document.removeEventListener('touchstart', onInitialPointerMove);
      document.removeEventListener('touchend', onInitialPointerMove);
    }

    /**
     * When the polfyill first loads, assume the user is in keyboard modality.
     * If any event is received from a pointing device (e.g. mouse, pointer,
     * touch), turn off keyboard modality.
     * This accounts for situations where focus enters the page from the URL bar.
     * @param {Event} e
     */
    function onInitialPointerMove(e) {
      // Work around a Safari quirk that fires a mousemove on <html> whenever the
      // window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
      if (e.target.nodeName && e.target.nodeName.toLowerCase() === 'html') {
        return;
      }

      hadKeyboardEvent = false;
      removeInitialPointerMoveListeners();
    }

    // For some kinds of state, we are interested in changes at the global scope
    // only. For example, global pointer input, global key presses and global
    // visibility change should affect the state at every scope:
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('mousedown', onPointerDown, true);
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('touchstart', onPointerDown, true);
    document.addEventListener('visibilitychange', onVisibilityChange, true);

    addInitialPointerMoveListeners();

    // For focus and blur, we specifically care about state changes in the local
    // scope. This is because focus / blur events that originate from within a
    // shadow root are not re-dispatched from the host element if it was already
    // the active element in its own scope:
    scope.addEventListener('focus', onFocus, true);
    scope.addEventListener('blur', onBlur, true);

    // We detect that a node is a ShadowRoot by ensuring that it is a
    // DocumentFragment and also has a host property. This check covers native
    // implementation and polyfill implementation transparently. If we only cared
    // about the native implementation, we could just check if the scope was
    // an instance of a ShadowRoot.
    if (scope.nodeType === Node.DOCUMENT_FRAGMENT_NODE && scope.host) {
      // Since a ShadowRoot is a special kind of DocumentFragment, it does not
      // have a root element to add a class to. So, we add this attribute to the
      // host element instead:
      scope.host.setAttribute('data-js-focus-visible', '');
    } else if (scope.nodeType === Node.DOCUMENT_NODE) {
      document.documentElement.classList.add('js-focus-visible');
      document.documentElement.setAttribute('data-js-focus-visible', '');
    }
  }

  // It is important to wrap all references to global window and document in
  // these checks to support server-side rendering use cases
  // @see https://github.com/WICG/focus-visible/issues/199
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Make the polyfill helper globally available. This can be used as a signal
    // to interested libraries that wish to coordinate with the polyfill for e.g.,
    // applying the polyfill to a shadow root:
    window.applyFocusVisiblePolyfill = applyFocusVisiblePolyfill;

    // Notify interested libraries of the polyfill's presence, in case the
    // polyfill was loaded lazily:
    var event;

    try {
      event = new CustomEvent('focus-visible-polyfill-ready');
    } catch (error) {
      // IE11 does not support using CustomEvent as a constructor directly:
      event = document.createEvent('CustomEvent');
      event.initCustomEvent('focus-visible-polyfill-ready', false, false, {});
    }

    window.dispatchEvent(event);
  }

  if (typeof document !== 'undefined') {
    // Apply the polyfill to the global document, so that no JavaScript
    // coordination is required to use the polyfill in the top-level document:
    applyFocusVisiblePolyfill(document);
  }

})));

},{}],11:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

},{}],12:[function(require,module,exports){
!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n="undefined"!=typeof globalThis?globalThis:n||self).LazyLoad=t()}(this,(function(){"use strict";function n(){return n=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i])}return n},n.apply(this,arguments)}var t="undefined"!=typeof window,e=t&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),i=t&&"IntersectionObserver"in window,o=t&&"classList"in document.createElement("p"),a=t&&window.devicePixelRatio>1,r={elements_selector:".lazy",container:e||t?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",data_bg_hidpi:"bg-hidpi",data_bg_multi:"bg-multi",data_bg_multi_hidpi:"bg-multi-hidpi",data_poster:"poster",class_applied:"applied",class_loading:"loading",class_loaded:"loaded",class_error:"error",class_entered:"entered",class_exited:"exited",unobserve_completed:!0,unobserve_entered:!1,cancel_on_exit:!0,callback_enter:null,callback_exit:null,callback_applied:null,callback_loading:null,callback_loaded:null,callback_error:null,callback_finish:null,callback_cancel:null,use_native:!1},c=function(t){return n({},r,t)},u=function(n,t){var e,i="LazyLoad::Initialized",o=new n(t);try{e=new CustomEvent(i,{detail:{instance:o}})}catch(n){(e=document.createEvent("CustomEvent")).initCustomEvent(i,!1,!1,{instance:o})}window.dispatchEvent(e)},l="src",s="srcset",f="sizes",d="poster",_="llOriginalAttrs",g="data",v="loading",b="loaded",p="applied",h="error",m="native",E="data-",I="ll-status",y=function(n,t){return n.getAttribute(E+t)},A=function(n){return y(n,I)},k=function(n,t){return function(n,t,e){var i="data-ll-status";null!==e?n.setAttribute(i,e):n.removeAttribute(i)}(n,0,t)},L=function(n){return k(n,null)},w=function(n){return null===A(n)},O=function(n){return A(n)===m},x=[v,b,p,h],C=function(n,t,e,i){n&&(void 0===i?void 0===e?n(t):n(t,e):n(t,e,i))},N=function(n,t){o?n.classList.add(t):n.className+=(n.className?" ":"")+t},M=function(n,t){o?n.classList.remove(t):n.className=n.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},z=function(n){return n.llTempImage},T=function(n,t){if(t){var e=t._observer;e&&e.unobserve(n)}},R=function(n,t){n&&(n.loadingCount+=t)},G=function(n,t){n&&(n.toLoadCount=t)},D=function(n){for(var t,e=[],i=0;t=n.children[i];i+=1)"SOURCE"===t.tagName&&e.push(t);return e},V=function(n,t){var e=n.parentNode;e&&"PICTURE"===e.tagName&&D(e).forEach(t)},F=function(n,t){D(n).forEach(t)},j=[l],B=[l,d],J=[l,s,f],P=[g],S=function(n){return!!n[_]},U=function(n){return n[_]},$=function(n){return delete n[_]},q=function(n,t){if(!S(n)){var e={};t.forEach((function(t){e[t]=n.getAttribute(t)})),n[_]=e}},H=function(n,t){if(S(n)){var e=U(n);t.forEach((function(t){!function(n,t,e){e?n.setAttribute(t,e):n.removeAttribute(t)}(n,t,e[t])}))}},K=function(n,t,e){N(n,t.class_loading),k(n,v),e&&(R(e,1),C(t.callback_loading,n,e))},Q=function(n,t,e){e&&n.setAttribute(t,e)},W=function(n,t){Q(n,f,y(n,t.data_sizes)),Q(n,s,y(n,t.data_srcset)),Q(n,l,y(n,t.data_src))},X={IMG:function(n,t){V(n,(function(n){q(n,J),W(n,t)})),q(n,J),W(n,t)},IFRAME:function(n,t){q(n,j),Q(n,l,y(n,t.data_src))},VIDEO:function(n,t){F(n,(function(n){q(n,j),Q(n,l,y(n,t.data_src))})),q(n,B),Q(n,d,y(n,t.data_poster)),Q(n,l,y(n,t.data_src)),n.load()},OBJECT:function(n,t){q(n,P),Q(n,g,y(n,t.data_src))}},Y=["IMG","IFRAME","VIDEO","OBJECT"],Z=function(n,t){!t||function(n){return n.loadingCount>0}(t)||function(n){return n.toLoadCount>0}(t)||C(n.callback_finish,t)},nn=function(n,t,e){n.addEventListener(t,e),n.llEvLisnrs[t]=e},tn=function(n,t,e){n.removeEventListener(t,e)},en=function(n){return!!n.llEvLisnrs},on=function(n){if(en(n)){var t=n.llEvLisnrs;for(var e in t){var i=t[e];tn(n,e,i)}delete n.llEvLisnrs}},an=function(n,t,e){!function(n){delete n.llTempImage}(n),R(e,-1),function(n){n&&(n.toLoadCount-=1)}(e),M(n,t.class_loading),t.unobserve_completed&&T(n,e)},rn=function(n,t,e){var i=z(n)||n;en(i)||function(n,t,e){en(n)||(n.llEvLisnrs={});var i="VIDEO"===n.tagName?"loadeddata":"load";nn(n,i,t),nn(n,"error",e)}(i,(function(o){!function(n,t,e,i){var o=O(t);an(t,e,i),N(t,e.class_loaded),k(t,b),C(e.callback_loaded,t,i),o||Z(e,i)}(0,n,t,e),on(i)}),(function(o){!function(n,t,e,i){var o=O(t);an(t,e,i),N(t,e.class_error),k(t,h),C(e.callback_error,t,i),o||Z(e,i)}(0,n,t,e),on(i)}))},cn=function(n,t,e){!function(n){n.llTempImage=document.createElement("IMG")}(n),rn(n,t,e),function(n){S(n)||(n[_]={backgroundImage:n.style.backgroundImage})}(n),function(n,t,e){var i=y(n,t.data_bg),o=y(n,t.data_bg_hidpi),r=a&&o?o:i;r&&(n.style.backgroundImage='url("'.concat(r,'")'),z(n).setAttribute(l,r),K(n,t,e))}(n,t,e),function(n,t,e){var i=y(n,t.data_bg_multi),o=y(n,t.data_bg_multi_hidpi),r=a&&o?o:i;r&&(n.style.backgroundImage=r,function(n,t,e){N(n,t.class_applied),k(n,p),e&&(t.unobserve_completed&&T(n,t),C(t.callback_applied,n,e))}(n,t,e))}(n,t,e)},un=function(n,t,e){!function(n){return Y.indexOf(n.tagName)>-1}(n)?cn(n,t,e):function(n,t,e){rn(n,t,e),function(n,t,e){var i=X[n.tagName];i&&(i(n,t),K(n,t,e))}(n,t,e)}(n,t,e)},ln=function(n){n.removeAttribute(l),n.removeAttribute(s),n.removeAttribute(f)},sn=function(n){V(n,(function(n){H(n,J)})),H(n,J)},fn={IMG:sn,IFRAME:function(n){H(n,j)},VIDEO:function(n){F(n,(function(n){H(n,j)})),H(n,B),n.load()},OBJECT:function(n){H(n,P)}},dn=function(n,t){(function(n){var t=fn[n.tagName];t?t(n):function(n){if(S(n)){var t=U(n);n.style.backgroundImage=t.backgroundImage}}(n)})(n),function(n,t){w(n)||O(n)||(M(n,t.class_entered),M(n,t.class_exited),M(n,t.class_applied),M(n,t.class_loading),M(n,t.class_loaded),M(n,t.class_error))}(n,t),L(n),$(n)},_n=["IMG","IFRAME","VIDEO"],gn=function(n){return n.use_native&&"loading"in HTMLImageElement.prototype},vn=function(n,t,e){n.forEach((function(n){return function(n){return n.isIntersecting||n.intersectionRatio>0}(n)?function(n,t,e,i){var o=function(n){return x.indexOf(A(n))>=0}(n);k(n,"entered"),N(n,e.class_entered),M(n,e.class_exited),function(n,t,e){t.unobserve_entered&&T(n,e)}(n,e,i),C(e.callback_enter,n,t,i),o||un(n,e,i)}(n.target,n,t,e):function(n,t,e,i){w(n)||(N(n,e.class_exited),function(n,t,e,i){e.cancel_on_exit&&function(n){return A(n)===v}(n)&&"IMG"===n.tagName&&(on(n),function(n){V(n,(function(n){ln(n)})),ln(n)}(n),sn(n),M(n,e.class_loading),R(i,-1),L(n),C(e.callback_cancel,n,t,i))}(n,t,e,i),C(e.callback_exit,n,t,i))}(n.target,n,t,e)}))},bn=function(n){return Array.prototype.slice.call(n)},pn=function(n){return n.container.querySelectorAll(n.elements_selector)},hn=function(n){return function(n){return A(n)===h}(n)},mn=function(n,t){return function(n){return bn(n).filter(w)}(n||pn(t))},En=function(n,e){var o=c(n);this._settings=o,this.loadingCount=0,function(n,t){i&&!gn(n)&&(t._observer=new IntersectionObserver((function(e){vn(e,n,t)}),function(n){return{root:n.container===document?null:n.container,rootMargin:n.thresholds||n.threshold+"px"}}(n)))}(o,this),function(n,e){t&&window.addEventListener("online",(function(){!function(n,t){var e;(e=pn(n),bn(e).filter(hn)).forEach((function(t){M(t,n.class_error),L(t)})),t.update()}(n,e)}))}(o,this),this.update(e)};return En.prototype={update:function(n){var t,o,a=this._settings,r=mn(n,a);G(this,r.length),!e&&i?gn(a)?function(n,t,e){n.forEach((function(n){-1!==_n.indexOf(n.tagName)&&function(n,t,e){n.setAttribute("loading","lazy"),rn(n,t,e),function(n,t){var e=X[n.tagName];e&&e(n,t)}(n,t),k(n,m)}(n,t,e)})),G(e,0)}(r,a,this):(o=r,function(n){n.disconnect()}(t=this._observer),function(n,t){t.forEach((function(t){n.observe(t)}))}(t,o)):this.loadAll(r)},destroy:function(){this._observer&&this._observer.disconnect(),pn(this._settings).forEach((function(n){$(n)})),delete this._observer,delete this._settings,delete this.loadingCount,delete this.toLoadCount},loadAll:function(n){var t=this,e=this._settings;mn(n,e).forEach((function(n){T(n,t),un(n,e,t)}))},restoreAll:function(){var n=this._settings;pn(n).forEach((function(t){dn(t,n)}))}},En.load=function(n,t){var e=c(t);un(n,e)},En.resetStatus=function(n){L(n)},t&&function(n,t){if(t)if(t.length)for(var e,i=0;e=t[i];i+=1)u(n,e);else u(n,t)}(En,window.lazyLoadOptions),En}));

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fadeOutAnimationInner = exports.fadeInAnimationInner = void 0;

var fadeInAnimationInner = function fadeInAnimationInner(obj, item, _ref) {
  var duration = _ref.duration,
      display = _ref.display,
      fin = _ref.fin;
  item.style.display = display || 'block';

  var _fadeIn = function _fadeIn(complection) {
    item.style.opacity = complection;
  };

  var ani = obj.animateOverTime(duration, _fadeIn, fin);
  requestAnimationFrame(ani);
};

exports.fadeInAnimationInner = fadeInAnimationInner;

var fadeOutAnimationInner = function fadeOutAnimationInner(obj, item, _ref2) {
  var duration = _ref2.duration,
      fin = _ref2.fin;

  var _fadeOut = function _fadeOut(complection) {
    item.style.opacity = 1 - complection;
    if (complection === 1) item.style.display = 'none';
  };

  var ani = obj.animateOverTime(duration, _fadeOut, fin);
  requestAnimationFrame(ani);
  item.classList.remove('opacity', 'display');
};

exports.fadeOutAnimationInner = fadeOutAnimationInner;

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default() {
  var elem = document.createElement('canvas');

  if (elem.getContext && elem.getContext('2d')) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  return false;
};

exports.default = _default;

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
};

exports.default = _default;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default() {
  var div = document.createElement('div');
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  document.body.append(div);
  var scrWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrWidth;
};

exports.default = _default;

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(slidesField, offset, dots, slideIndex) {
  slidesField.style.transform = "translateX(-".concat(offset, "px)");
  dots.forEach(function (dot) {
    return dot.classList.remove('active');
  });
  dots[slideIndex].classList.add('active');
};

exports.default = _default;

},{}],18:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _core = _interopRequireDefault(require("../core"));

_core.default.prototype.accordion = function (activeTrigger, activeContent) {
  var _this = this;

  var _loop = function _loop(i) {
    (0, _core.default)(_this[i]).click(function () {
      (0, _core.default)(_this[i]).toggleClass(activeTrigger);
      (0, _core.default)(_this[i].nextElementSibling).toggleClass(activeContent);

      if (_this[i].classList.contains(activeTrigger)) {
        _this[i].nextElementSibling.style.maxHeight = _this[i].nextElementSibling.scrollHeight + 20 + 'px';
      } else {
        _this[i].nextElementSibling.style.maxHeight = 0;
      }
    });
  };

  for (var i = 0; i < this.length; i++) {
    _loop(i);
  }
};

},{"../core":23,"@babel/runtime/helpers/interopRequireDefault":4}],19:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slideInteractive = _interopRequireDefault(require("../../helpers/slideInteractive"));

var _core = _interopRequireDefault(require("../core"));

_core.default.prototype.carousel = function () {
  var _this = this;

  var _loop = function _loop(i) {
    var width = window.getComputedStyle(_this[i].querySelector('.carousel-inner')).width;

    var slides = _this[i].querySelectorAll('.carousel-item');

    var slidesField = _this[i].querySelector('.carousel-slides');

    var dots = _this[i].querySelectorAll('.carousel-indicators li');

    slidesField.style.width = 100 * slides.length + '%';
    slides.forEach(function (slide) {
      return slide.style.width = width;
    });
    var offset = 0;
    var slideIndex = 0; // next arrow(right)

    (0, _core.default)(_this[i].querySelector('[data-slide="next"]')).click(function (e) {
      e.preventDefault();
      offset === +width.replace(/\D/g, '') * (slides.length - 1) ? offset = 0 : offset += +width.replace(/\D/g, '');
      slideIndex === slides.length - 1 ? slideIndex = 0 : slideIndex++;
      (0, _slideInteractive.default)(slidesField, offset, dots, slideIndex);
    }); // prev arrow(left)

    (0, _core.default)(_this[i].querySelector('[data-slide="prev"]')).click(function (e) {
      e.preventDefault();
      offset === 0 ? offset = +width.replace(/\D/g, '') * (slides.length - 1) : offset -= +width.replace(/\D/g, '');
      slideIndex === 0 ? slideIndex = slides.length - 1 : slideIndex--;
      (0, _slideInteractive.default)(slidesField, offset, dots, slideIndex);
    }); // slide dots at the bottom

    (0, _core.default)('#example ol li').click(function (e) {
      var slideWay = +(0, _core.default)(e.target).attribute('data-slide-to');
      slideIndex = slideWay;
      offset = +width.replace(/\D/g, '') * slideWay;
      (0, _slideInteractive.default)(slidesField, offset, dots, slideIndex);
    });
  };

  for (var i = 0; i < this.length; i++) {
    _loop(i);
  }
};

(0, _core.default)('#example').carousel();

},{"../../helpers/slideInteractive":17,"../core":23,"@babel/runtime/helpers/interopRequireDefault":4}],20:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _core = _interopRequireDefault(require("../core"));

_core.default.prototype.dropdownMenu = function () {
  var _this = this;

  var _loop = function _loop(i) {
    var idItem = (0, _core.default)(_this[i]).attribute('id');
    (0, _core.default)(_this[i]).click(function () {
      return (0, _core.default)("[data-toggle-id=".concat(idItem, "]")).fadeToggle(200);
    });
  };

  for (var i = 0; i < this.length; i++) {
    _loop(i);
  }
};

(0, _core.default)('.toggle-dropdown-menu').dropdownMenu();

},{"../core":23,"@babel/runtime/helpers/interopRequireDefault":4}],21:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _core = _interopRequireDefault(require("../core"));

var _scrollWidth = _interopRequireDefault(require("../../helpers/scrollWidth"));

var ANIMATIONTIME = 500;

_core.default.prototype.modal = function (created) {
  var _this = this;

  var _loop = function _loop(i) {
    var target = (0, _core.default)(_this[i]).attribute('data-target');
    (0, _core.default)(_this[i]).click(function (e) {
      e.preventDefault();
      (0, _core.default)(target).fadeIn(ANIMATIONTIME);
      document.body.style.overflow = 'hidden';
    });
    document.querySelectorAll("".concat(target, " [data-close]")).forEach(function (btn) {
      (0, _core.default)(btn).click(function () {
        (0, _core.default)(target).fadeOut(ANIMATIONTIME);
        setTimeout(function () {
          if (created) {
            document.body.style = '';
            document.querySelector(target).remove();
          }
        }, ANIMATIONTIME);
      });
    });
    (0, _core.default)(target).click(function (e) {
      if (e.target.classList.contains('modal')) {
        (0, _core.default)(target).fadeOut(ANIMATIONTIME);
        setTimeout(function () {
          if (created) {
            document.body.style = '';
            document.querySelector(target).remove();
          }
        }, ANIMATIONTIME);
      }
    });
  };

  for (var i = 0; i < this.length; i++) {
    _loop(i);
  }
};

(0, _core.default)('[data-toggle="modal"]').modal(true);

_core.default.prototype.createModal = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      inner = _ref.inner,
      btns = _ref.btns;

  // eslint-disable-next-line
  var count = btns.count,
      settings = btns.settings; // btns params

  for (var i = 0; i < this.length; i++) {
    var _modalElement$querySe;

    var modalElement = document.createElement('div');
    (0, _core.default)(modalElement).addClass('modal');
    (0, _core.default)(modalElement).addAttribute('id', (0, _core.default)(this[i]).attribute('data-target').slice(1));
    (0, _core.default)(modalElement).html("\n    <div class=\"modal-dialog\">\n      <div class=\"modal-content\">\n        <button class=\"close\" data-close>\n          <span>&times;</span>\n        </button>\n        <div class=\"modal-header\">\n          <h3 class=\"modal-title\">".concat(inner.title, "</h3>\n        </div>\n        <div class=\"modal-body p20\">").concat(inner.body, "</div>\n        <div class=\"modal-footer\">\n\n        </div>\n      </div>\n    </div>"));
    var buttons = [];

    for (var j = 0; j < count; j++) {
      var _$;

      var button = document.createElement('button');

      (_$ = (0, _core.default)(button)).addClass.apply(_$, ['btn'].concat((0, _toConsumableArray2.default)(settings[j].classes)));

      (0, _core.default)(button).html(settings[j].content);

      if (settings[j].callback && typeof settings[j].callback === 'function') {
        (0, _core.default)(button).click(settings[j].callback);
      }

      if (settings[j].close) (0, _core.default)(button).addAttribute('data-close', 'true');
      buttons.push(button);
    }

    (_modalElement$querySe = modalElement.querySelector('.modal-footer')).append.apply(_modalElement$querySe, buttons);

    document.body.appendChild(modalElement);
    (0, _core.default)(this[i]).modal(true);
    (0, _core.default)(this[i].getAttribute('data-target')).fadeIn(ANIMATIONTIME);
    document.body.style.overflow = 'hidden';
    if (document.body.offsetHeight > window.innerHeight) document.body.style.marginRight = "".concat((0, _scrollWidth.default)(), "px");
  }
};

},{"../../helpers/scrollWidth":16,"../core":23,"@babel/runtime/helpers/interopRequireDefault":4,"@babel/runtime/helpers/toConsumableArray":7}],22:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _core = _interopRequireDefault(require("../core"));

_core.default.prototype.tabs = function () {
  var _this = this;

  var _loop = function _loop(i) {
    (0, _core.default)(_this[i]).click(function () {
      (0, _core.default)(_this[i]).addClass('tabs__trigger--active').siblings().removeClass('tabs__trigger--active').closest('.tabs').findAll('.tabs__inner').addAttribute('style', '').nodeNumber((0, _core.default)(_this[i]).nodeIndex() + 1).fadeIn(700);
    });
  };

  for (var i = 0; i < this.length; i++) {
    _loop(i);
  }
};

(0, _core.default)('[data-tabpanel] .tabs__trigger').tabs();

},{"../core":23,"@babel/runtime/helpers/interopRequireDefault":4}],23:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("focus-visible");

var _lazyImages = _interopRequireDefault(require("./modules/lazyImages"));

var _documentReady = _interopRequireDefault(require("../helpers/documentReady"));

(0, _documentReady.default)(function () {
  (0, _lazyImages.default)();
});

var $ = function $(selector) {
  return new $.prototype.Init(selector);
};

$.prototype.Init = function (selector) {
  if (!selector) return this; // {}

  if (selector.tagName) {
    this[0] = selector;
    this.length = 1;
    return this;
  }

  Object.assign(this, document.querySelectorAll(selector));
  this.length = document.querySelectorAll(selector).length;
  return this;
};

$.prototype.Init.prototype = $.prototype;
window.$ = $;
var _default = $;
exports.default = _default;

},{"../helpers/documentReady":15,"./modules/lazyImages":31,"@babel/runtime/helpers/interopRequireDefault":4,"focus-visible":10}],24:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = _interopRequireDefault(require("./core"));

require("./modules/display");

require("./modules/classes");

require("./modules/handlers");

require("./modules/attributes");

require("./modules/actions");

require("./modules/animations");

require("./components/modals");

require("./components/dropdownMenu");

require("./components/tabs");

require("./components/accordion");

require("./components/carousel");

require("./services/requests");

var _default = _core.default;
exports.default = _default;

},{"./components/accordion":18,"./components/carousel":19,"./components/dropdownMenu":20,"./components/modals":21,"./components/tabs":22,"./core":23,"./modules/actions":25,"./modules/animations":26,"./modules/attributes":27,"./modules/classes":28,"./modules/display":29,"./modules/handlers":30,"./services/requests":32,"@babel/runtime/helpers/interopRequireDefault":4}],25:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _core = _interopRequireDefault(require("../core"));

_core.default.prototype.html = function (content) {
  for (var i = 0; i < this.length; i++) {
    if (content) this[i].innerHTML = content;else return this[i].innerHTML;
  }

  return this;
};

_core.default.prototype.nodeNumber = function (number) {
  if (!this[number - 1]) throw new TypeError("Element ".concat(number, " does not exist"));
  var tempNode = this[number - 1];

  for (var i in Object.keys(this)) {
    delete this[i];
  }

  this[0] = tempNode;
  this.length = 1;
  return this;
};

_core.default.prototype.nodeIndex = function () {
  var _this = this;

  var parent = this[0].parentNode;
  var allChildren = (0, _toConsumableArray2.default)(parent.children);

  var findThis = function findThis(item) {
    return item === _this[0];
  };

  return allChildren.findIndex(findThis);
};

_core.default.prototype.findAll = function (selector) {
  var elementsCounter = 0;
  var counter = 0;
  var copyThis = Object.assign({}, this);

  for (var i = 0; i < copyThis.length; i++) {
    var arrayOfElements = copyThis[i].querySelectorAll(selector);
    if (arrayOfElements.length === 0) continue;

    for (var j = 0; j < arrayOfElements.length; j++) {
      this[counter] = arrayOfElements[j];
      counter++;
    }

    elementsCounter += arrayOfElements.length;
  }

  this.length = elementsCounter;
  var objLength = Object.keys(this).length;

  for (; elementsCounter < objLength; elementsCounter++) {
    delete this[elementsCounter];
  }

  return this;
};

_core.default.prototype.closest = function (selector) {
  var counter = 0;

  for (var i = 0; i < this.length; i++) {
    var currentThis = this[i];
    this[i] = this[i].closest(selector);
    if (!this[i]) this[i] = currentThis;
    counter++;
  }

  var objLength = Object.keys(this).length;

  for (; counter < objLength; counter++) {
    delete this[counter];
  }

  return this;
};

_core.default.prototype.siblings = function () {
  var counterChildren = 0;
  var counterSiblings = 0;
  var copyThis = Object.assign({}, this);

  for (var i = 0; i < copyThis.length; i++) {
    var thisParentChildren = copyThis[i].parentNode.children;

    for (var j = 0; j < thisParentChildren.length; j++) {
      if (copyThis[i] === thisParentChildren[j]) continue;
      this[counterChildren] = thisParentChildren[j];
      counterChildren++;
    }

    counterSiblings += thisParentChildren.length - 1;
  }

  this.length = counterSiblings;
  var objLength = Object.keys(this).length;

  for (; counterSiblings < objLength; counterSiblings++) {
    delete this[counterSiblings];
  }

  return this;
};

},{"../core":23,"@babel/runtime/helpers/interopRequireDefault":4,"@babel/runtime/helpers/toConsumableArray":7}],26:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _core = _interopRequireDefault(require("../core"));

var _AnimationInners = require("../../helpers/AnimationInners");

_core.default.prototype.animateOverTime = function (duration, callback, fin) {
  var timeStart;

  function _animateOverTime(time) {
    if (!timeStart) timeStart = time;
    var timeElapsed = time - timeStart;
    var complection = Math.min(timeElapsed / duration, 1); // for style.opacity(max value = 1)

    callback(complection);
    if (timeElapsed < duration) requestAnimationFrame(_animateOverTime);else {
      if (typeof fin === 'function') fin();
    }
  }

  for (var i = 0; i < this.length; i++) {
    if (i === 0) continue;
  }

  return _animateOverTime;
};

_core.default.prototype.fadeIn = function (duration, display, fin) {
  for (var i = 0; i < this.length; i++) {
    (0, _AnimationInners.fadeInAnimationInner)(this, this[i], {
      duration: duration,
      display: display,
      fin: fin
    });
  }

  return this;
};

_core.default.prototype.fadeOut = function (duration, fin) {
  for (var i = 0; i < this.length; i++) {
    (0, _AnimationInners.fadeOutAnimationInner)(this, this[i], {
      duration: duration,
      fin: fin
    });
  }

  return this;
};

_core.default.prototype.fadeToggle = function (duration, display, fin) {
  for (var i = 0; i < this.length; i++) {
    if (window.getComputedStyle(this[i]).display === 'none') {
      (0, _AnimationInners.fadeInAnimationInner)(this, this[i], {
        duration: duration,
        display: display,
        fin: fin
      });
    } else {
      (0, _AnimationInners.fadeOutAnimationInner)(this, this[i], {
        duration: duration,
        fin: fin
      });
    }
  }

  return this;
};

},{"../../helpers/AnimationInners":13,"../core":23,"@babel/runtime/helpers/interopRequireDefault":4}],27:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _core = _interopRequireDefault(require("../core"));

_core.default.prototype.addAttribute = function (attributeName) {
  var attributeValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (!attributeName) return this;

  for (var i = 0; i < this.length; i++) {
    this[i].setAttribute(attributeName, attributeValue);
  }

  return this;
};

_core.default.prototype.removeAttribute = function (attributeName) {
  if (!attributeName) return this;

  for (var i = 0; i < this.length; i++) {
    this[i].removeAttribute(attributeName);
  }

  return this;
};

_core.default.prototype.toggleAttribute = function (attributeName) {
  if (!attributeName) return this;

  for (var i = 0; i < this.length; i++) {
    this[i].toggleAttribute(attributeName);
  }

  return this;
};

_core.default.prototype.attribute = function (attributeName) {
  if (!attributeName) return this;

  for (var i = 0; i < this.length; i++) {
    if (!this[i].getAttribute(attributeName)) return this;
    return this[i].getAttribute(attributeName);
  }
};

},{"../core":23,"@babel/runtime/helpers/interopRequireDefault":4}],28:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _core = _interopRequireDefault(require("../core"));

_core.default.prototype.addClass = function () {
  for (var i = 0; i < this.length; i++) {
    var _this$i$classList;

    if (this[i].classList) (_this$i$classList = this[i].classList).add.apply(_this$i$classList, arguments);
  }

  return this;
};

_core.default.prototype.removeClass = function () {
  for (var i = 0; i < this.length; i++) {
    var _this$i$classList2;

    if (this[i].classList) (_this$i$classList2 = this[i].classList).remove.apply(_this$i$classList2, arguments);
  }

  return this;
};

_core.default.prototype.toggleClass = function (className) {
  for (var i = 0; i < this.length; i++) {
    if (this[i].classList) this[i].classList.toggle(className);
  }

  return this;
};

},{"../core":23,"@babel/runtime/helpers/interopRequireDefault":4}],29:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _core = _interopRequireDefault(require("../core"));

_core.default.prototype.show = function () {
  for (var i = 0; i < this.length; i++) {
    if (!this[i].style) continue;
    this[i].style.display = '';
  }

  return this;
};

_core.default.prototype.hide = function () {
  for (var i = 0; i < this.length; i++) {
    if (!this[i].style) continue;
    this[i].style.display = 'none';
  }

  return this;
};

_core.default.prototype.toggleDisplay = function () {
  for (var i = 0; i < this.length; i++) {
    if (!this[i].style) continue;
    this[i].style.display === 'none' ? this[i].style.display = '' : this[i].style.display = 'none';
  }

  return this;
};

},{"../core":23,"@babel/runtime/helpers/interopRequireDefault":4}],30:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _core = _interopRequireDefault(require("../core"));

_core.default.prototype.on = function (eventName, callback) {
  if (!eventName || !callback) return this;

  for (var i = 0; i < this.length; i++) {
    this[i].addEventListener(eventName, callback);
  }

  return this;
};

_core.default.prototype.off = function (eventName, callback) {
  if (!eventName || !callback) return this;

  for (var i = 0; i < this.length; i++) {
    this[i].removeEventListener(eventName, callback);
  }

  return this;
};

_core.default.prototype.click = function (handler) {
  for (var i = 0; i < this.length; i++) {
    handler ? this[i].addEventListener('click', handler) : this[i].click();
  }

  return this;
};

},{"../core":23,"@babel/runtime/helpers/interopRequireDefault":4}],31:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vanillaLazyload = _interopRequireDefault(require("vanilla-lazyload"));

var _canUseWebp = _interopRequireDefault(require("../../helpers/canUseWebp"));

var _default = function _default() {
  if ((0, _canUseWebp.default)() === false) {
    var lazyBgItems = document.querySelectorAll('.lazy[data-bg-fallback]');
    lazyBgItems.forEach(function (item) {
      var srcBgFallback = item.getAttribute('data-bg-fallback');
      item.setAttribute('data-bg', srcBgFallback);
    });
  } // eslint-disable-next-line no-unused-vars


  var lazyLoadInstance = new _vanillaLazyload.default({
    elements_selector: '.lazy'
  });
};

exports.default = _default;

},{"../../helpers/canUseWebp":14,"@babel/runtime/helpers/interopRequireDefault":4,"vanilla-lazyload":12}],32:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _core = _interopRequireDefault(require("../core"));

_core.default.prototype.get = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(url) {
    var dataTypeAnswer,
        res,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dataTypeAnswer = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'json';
            _context.next = 3;
            return fetch(url);

          case 3:
            res = _context.sent;

            if (res.ok) {
              _context.next = 6;
              break;
            }

            throw new Error("Could not fetch ".concat(url, ", status: ").concat(res.status));

          case 6:
            _context.t0 = dataTypeAnswer;
            _context.next = _context.t0 === 'json' ? 9 : _context.t0 === 'text' ? 12 : _context.t0 === 'blob' ? 15 : 18;
            break;

          case 9:
            _context.next = 11;
            return res.json();

          case 11:
            return _context.abrupt("return", _context.sent);

          case 12:
            _context.next = 14;
            return res.text();

          case 14:
            return _context.abrupt("return", _context.sent);

          case 15:
            _context.next = 17;
            return res.blob();

          case 17:
            return _context.abrupt("return", _context.sent);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

_core.default.prototype.post = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(url, data) {
    var dataTypeAnswer,
        res,
        _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dataTypeAnswer = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 'json';
            _context2.next = 3;
            return fetch(url, {
              method: 'POST',
              body: data
            });

          case 3:
            res = _context2.sent;
            _context2.t0 = dataTypeAnswer;
            _context2.next = _context2.t0 === 'json' ? 7 : _context2.t0 === 'text' ? 10 : _context2.t0 === 'blob' ? 13 : 16;
            break;

          case 7:
            _context2.next = 9;
            return res.json();

          case 9:
            return _context2.abrupt("return", _context2.sent);

          case 10:
            _context2.next = 12;
            return res.text();

          case 12:
            return _context2.abrupt("return", _context2.sent);

          case 13:
            _context2.next = 15;
            return res.blob();

          case 15:
            return _context2.abrupt("return", _context2.sent);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

},{"../core":23,"@babel/runtime/helpers/asyncToGenerator":3,"@babel/runtime/helpers/interopRequireDefault":4,"@babel/runtime/regenerator":9}],33:[function(require,module,exports){
"use strict";

require("./lib/lib");

$('#modalTrigger').click(function () {
  return $('#modalTrigger').createModal({
    inner: {
      title: 'First Modal',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam labore impedit nobis voluptatem ea veritatis numquam at molestiae ex rem dolor quam perspiciatis quidem assumenda, vero provident quasi quis voluptatum magni. Harum a'
    },
    btns: {
      count: 3,
      settings: [{
        classes: ['btn-danger', 'mr-10'],
        content: 'close',
        close: true
      }, {
        classes: ['btn-success', 'mr-10'],
        content: 'save',
        callback: function callback() {
          return alert('Saved');
        }
      }, {
        classes: ['btn-warning'],
        content: 'warning',
        callback: function callback() {
          alert('warning');
          console.log('warning');
        }
      }]
    }
  });
});
$('#modalTrigger2').click(function () {
  return $('#modalTrigger2').createModal({
    inner: {
      title: 'Second Modal',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam labore impedit nobis voluptatem ea veritatis numquam at molestiae ex rem dolor quam perspiciatis quidem assumenda, vero provident quasi quis voluptatum magni. Harum rem ipsum dolor sit amet consectetur adipisicing elit. Ipsam labore impedit nobis voluptatem ea veritatis numquam at molestiae ex rem dolor quam perspiciatis quidem assumenda, vero provident quasi quis voluptatum magni. Harum aa'
    },
    btns: {
      count: 2,
      settings: [{
        classes: ['btn-danger', 'mr-10'],
        content: 'close',
        close: true
      }, {
        classes: ['btn-dark', 'mr-10'],
        content: 'dark-mode',
        callback: function callback() {
          $('.btn-dark').on('click', function () {
            $('.modal-content').addClass('modal-dark');
            $('.modal-header').addClass('color-white');
            $('.modal-body').addClass('color-white');
            $('.modal-content .close').addClass('color-white');
          });
        }
      }]
    }
  });
});
$('.accordion__trigger').accordion('accordion__trigger--active', 'accordion__content--active');
$().get('https://reqres.in/api/products/3').then(function (res) {
  return console.log(res);
});

},{"./lib/lib":24}]},{},[33])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheUxpa2VUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRob3V0SG9sZXMuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2ZvY3VzLXZpc2libGUvZGlzdC9mb2N1cy12aXNpYmxlLmpzIiwibm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIm5vZGVfbW9kdWxlcy92YW5pbGxhLWxhenlsb2FkL2Rpc3QvbGF6eWxvYWQubWluLmpzIiwic3JjL2pzL2hlbHBlcnMvQW5pbWF0aW9uSW5uZXJzLmpzIiwic3JjL2pzL2hlbHBlcnMvY2FuVXNlV2VicC5qcyIsInNyYy9qcy9oZWxwZXJzL2RvY3VtZW50UmVhZHkuanMiLCJzcmMvanMvaGVscGVycy9zY3JvbGxXaWR0aC5qcyIsInNyYy9qcy9oZWxwZXJzL3NsaWRlSW50ZXJhY3RpdmUuanMiLCJzcmMvanMvbGliL2NvbXBvbmVudHMvYWNjb3JkaW9uLmpzIiwic3JjL2pzL2xpYi9jb21wb25lbnRzL2Nhcm91c2VsLmpzIiwic3JjL2pzL2xpYi9jb21wb25lbnRzL2Ryb3Bkb3duTWVudS5qcyIsInNyYy9qcy9saWIvY29tcG9uZW50cy9tb2RhbHMuanMiLCJzcmMvanMvbGliL2NvbXBvbmVudHMvdGFicy5qcyIsInNyYy9qcy9saWIvY29yZS5qcyIsInNyYy9qcy9saWIvbGliLmpzIiwic3JjL2pzL2xpYi9tb2R1bGVzL2FjdGlvbnMuanMiLCJzcmMvanMvbGliL21vZHVsZXMvYW5pbWF0aW9ucy5qcyIsInNyYy9qcy9saWIvbW9kdWxlcy9hdHRyaWJ1dGVzLmpzIiwic3JjL2pzL2xpYi9tb2R1bGVzL2NsYXNzZXMuanMiLCJzcmMvanMvbGliL21vZHVsZXMvZGlzcGxheS5qcyIsInNyYy9qcy9saWIvbW9kdWxlcy9oYW5kbGVycy5qcyIsInNyYy9qcy9saWIvbW9kdWxlcy9sYXp5SW1hZ2VzLmpzIiwic3JjL2pzL2xpYi9zZXJ2aWNlcy9yZXF1ZXN0cy5qcyIsInNyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QU8sRUFBRSxPQUZYO0FBR0UsUUFBQSxLQUFLLEVBQUU7QUFIVCxPQURRLEVBTVI7QUFDRSxRQUFBLE9BQU8sRUFBRSxDQUFDLFVBQUQsRUFBYSxPQUFiLENBRFg7QUFFRSxRQUFBLE9BQU8sRUFBRSxXQUZYO0FBR0UsUUFBQSxRQUFRLEVBQUUsb0JBQU07QUFDZCxVQUFBLENBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZSxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFlBQU07QUFDL0IsWUFBQSxDQUFDLENBQUMsZ0JBQUQsQ0FBRCxDQUFvQixRQUFwQixDQUE2QixZQUE3QjtBQUNBLFlBQUEsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQixRQUFuQixDQUE0QixhQUE1QjtBQUNBLFlBQUEsQ0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQixRQUFqQixDQUEwQixhQUExQjtBQUNBLFlBQUEsQ0FBQyxDQUFDLHVCQUFELENBQUQsQ0FBMkIsUUFBM0IsQ0FBb0MsYUFBcEM7QUFDRCxXQUxEO0FBTUQ7QUFWSCxPQU5RO0FBRk47QUFMUixHQUQ4QixDQUFOO0FBQUEsQ0FBMUI7QUErQkEsQ0FBQyxDQUFDLHFCQUFELENBQUQsQ0FBeUIsU0FBekIsQ0FBbUMsNEJBQW5DLEVBQWlFLDRCQUFqRTtBQUVBLENBQUMsR0FBRyxHQUFKLENBQVEsa0NBQVIsRUFDRyxJQURILENBQ1EsVUFBQSxHQUFHO0FBQUEsU0FBSSxPQUFPLENBQUMsR0FBUixDQUFZLEdBQVosQ0FBSjtBQUFBLENBRFgiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5TGlrZVRvQXJyYXksIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJ2YXIgYXJyYXlMaWtlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIik7XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRob3V0SG9sZXMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXN5bmNUb0dlbmVyYXRvciwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlcltTeW1ib2wuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXMuanNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXkuanNcIik7XG5cbnZhciB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCIpO1xuXG52YXIgbm9uSXRlcmFibGVTcHJlYWQgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVNwcmVhZC5qc1wiKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwidmFyIGFycmF5TGlrZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCIpO1xuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHRoZSA6Zm9jdXMtdmlzaWJsZSBwb2x5ZmlsbCBhdCB0aGUgZ2l2ZW4gc2NvcGUuXG4gICAqIEEgc2NvcGUgaW4gdGhpcyBjYXNlIGlzIGVpdGhlciB0aGUgdG9wLWxldmVsIERvY3VtZW50IG9yIGEgU2hhZG93IFJvb3QuXG4gICAqXG4gICAqIEBwYXJhbSB7KERvY3VtZW50fFNoYWRvd1Jvb3QpfSBzY29wZVxuICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9XSUNHL2ZvY3VzLXZpc2libGVcbiAgICovXG4gIGZ1bmN0aW9uIGFwcGx5Rm9jdXNWaXNpYmxlUG9seWZpbGwoc2NvcGUpIHtcbiAgICB2YXIgaGFkS2V5Ym9hcmRFdmVudCA9IHRydWU7XG4gICAgdmFyIGhhZEZvY3VzVmlzaWJsZVJlY2VudGx5ID0gZmFsc2U7XG4gICAgdmFyIGhhZEZvY3VzVmlzaWJsZVJlY2VudGx5VGltZW91dCA9IG51bGw7XG5cbiAgICB2YXIgaW5wdXRUeXBlc0FsbG93bGlzdCA9IHtcbiAgICAgIHRleHQ6IHRydWUsXG4gICAgICBzZWFyY2g6IHRydWUsXG4gICAgICB1cmw6IHRydWUsXG4gICAgICB0ZWw6IHRydWUsXG4gICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgIHBhc3N3b3JkOiB0cnVlLFxuICAgICAgbnVtYmVyOiB0cnVlLFxuICAgICAgZGF0ZTogdHJ1ZSxcbiAgICAgIG1vbnRoOiB0cnVlLFxuICAgICAgd2VlazogdHJ1ZSxcbiAgICAgIHRpbWU6IHRydWUsXG4gICAgICBkYXRldGltZTogdHJ1ZSxcbiAgICAgICdkYXRldGltZS1sb2NhbCc6IHRydWVcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSGVscGVyIGZ1bmN0aW9uIGZvciBsZWdhY3kgYnJvd3NlcnMgYW5kIGlmcmFtZXMgd2hpY2ggc29tZXRpbWVzIGZvY3VzXG4gICAgICogZWxlbWVudHMgbGlrZSBkb2N1bWVudCwgYm9keSwgYW5kIG5vbi1pbnRlcmFjdGl2ZSBTVkcuXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzVmFsaWRGb2N1c1RhcmdldChlbCkge1xuICAgICAgaWYgKFxuICAgICAgICBlbCAmJlxuICAgICAgICBlbCAhPT0gZG9jdW1lbnQgJiZcbiAgICAgICAgZWwubm9kZU5hbWUgIT09ICdIVE1MJyAmJlxuICAgICAgICBlbC5ub2RlTmFtZSAhPT0gJ0JPRFknICYmXG4gICAgICAgICdjbGFzc0xpc3QnIGluIGVsICYmXG4gICAgICAgICdjb250YWlucycgaW4gZWwuY2xhc3NMaXN0XG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcHV0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gZWxlbWVudCBzaG91bGQgYXV0b21hdGljYWxseSB0cmlnZ2VyIHRoZVxuICAgICAqIGBmb2N1cy12aXNpYmxlYCBjbGFzcyBiZWluZyBhZGRlZCwgaS5lLiB3aGV0aGVyIGl0IHNob3VsZCBhbHdheXMgbWF0Y2hcbiAgICAgKiBgOmZvY3VzLXZpc2libGVgIHdoZW4gZm9jdXNlZC5cbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmb2N1c1RyaWdnZXJzS2V5Ym9hcmRNb2RhbGl0eShlbCkge1xuICAgICAgdmFyIHR5cGUgPSBlbC50eXBlO1xuICAgICAgdmFyIHRhZ05hbWUgPSBlbC50YWdOYW1lO1xuXG4gICAgICBpZiAodGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBpbnB1dFR5cGVzQWxsb3dsaXN0W3R5cGVdICYmICFlbC5yZWFkT25seSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRhZ05hbWUgPT09ICdURVhUQVJFQScgJiYgIWVsLnJlYWRPbmx5KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWwuaXNDb250ZW50RWRpdGFibGUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIGBmb2N1cy12aXNpYmxlYCBjbGFzcyB0byB0aGUgZ2l2ZW4gZWxlbWVudCBpZiBpdCB3YXMgbm90IGFkZGVkIGJ5XG4gICAgICogdGhlIGF1dGhvci5cbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWRkRm9jdXNWaXNpYmxlQ2xhc3MoZWwpIHtcbiAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZvY3VzLXZpc2libGUnKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKCdmb2N1cy12aXNpYmxlJyk7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZm9jdXMtdmlzaWJsZS1hZGRlZCcsICcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdGhlIGBmb2N1cy12aXNpYmxlYCBjbGFzcyBmcm9tIHRoZSBnaXZlbiBlbGVtZW50IGlmIGl0IHdhcyBub3RcbiAgICAgKiBvcmlnaW5hbGx5IGFkZGVkIGJ5IHRoZSBhdXRob3IuXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlbW92ZUZvY3VzVmlzaWJsZUNsYXNzKGVsKSB7XG4gICAgICBpZiAoIWVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1mb2N1cy12aXNpYmxlLWFkZGVkJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnZm9jdXMtdmlzaWJsZScpO1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWZvY3VzLXZpc2libGUtYWRkZWQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgbW9zdCByZWNlbnQgdXNlciBpbnRlcmFjdGlvbiB3YXMgdmlhIHRoZSBrZXlib2FyZDtcbiAgICAgKiBhbmQgdGhlIGtleSBwcmVzcyBkaWQgbm90IGluY2x1ZGUgYSBtZXRhLCBhbHQvb3B0aW9uLCBvciBjb250cm9sIGtleTtcbiAgICAgKiB0aGVuIHRoZSBtb2RhbGl0eSBpcyBrZXlib2FyZC4gT3RoZXJ3aXNlLCB0aGUgbW9kYWxpdHkgaXMgbm90IGtleWJvYXJkLlxuICAgICAqIEFwcGx5IGBmb2N1cy12aXNpYmxlYCB0byBhbnkgY3VycmVudCBhY3RpdmUgZWxlbWVudCBhbmQga2VlcCB0cmFja1xuICAgICAqIG9mIG91ciBrZXlib2FyZCBtb2RhbGl0eSBzdGF0ZSB3aXRoIGBoYWRLZXlib2FyZEV2ZW50YC5cbiAgICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBvbktleURvd24oZSkge1xuICAgICAgaWYgKGUubWV0YUtleSB8fCBlLmFsdEtleSB8fCBlLmN0cmxLZXkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNWYWxpZEZvY3VzVGFyZ2V0KHNjb3BlLmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgIGFkZEZvY3VzVmlzaWJsZUNsYXNzKHNjb3BlLmFjdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICBoYWRLZXlib2FyZEV2ZW50ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiBhdCBhbnkgcG9pbnQgYSB1c2VyIGNsaWNrcyB3aXRoIGEgcG9pbnRpbmcgZGV2aWNlLCBlbnN1cmUgdGhhdCB3ZSBjaGFuZ2VcbiAgICAgKiB0aGUgbW9kYWxpdHkgYXdheSBmcm9tIGtleWJvYXJkLlxuICAgICAqIFRoaXMgYXZvaWRzIHRoZSBzaXR1YXRpb24gd2hlcmUgYSB1c2VyIHByZXNzZXMgYSBrZXkgb24gYW4gYWxyZWFkeSBmb2N1c2VkXG4gICAgICogZWxlbWVudCwgYW5kIHRoZW4gY2xpY2tzIG9uIGEgZGlmZmVyZW50IGVsZW1lbnQsIGZvY3VzaW5nIGl0IHdpdGggYVxuICAgICAqIHBvaW50aW5nIGRldmljZSwgd2hpbGUgd2Ugc3RpbGwgdGhpbmsgd2UncmUgaW4ga2V5Ym9hcmQgbW9kYWxpdHkuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG9uUG9pbnRlckRvd24oZSkge1xuICAgICAgaGFkS2V5Ym9hcmRFdmVudCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uIGBmb2N1c2AsIGFkZCB0aGUgYGZvY3VzLXZpc2libGVgIGNsYXNzIHRvIHRoZSB0YXJnZXQgaWY6XG4gICAgICogLSB0aGUgdGFyZ2V0IHJlY2VpdmVkIGZvY3VzIGFzIGEgcmVzdWx0IG9mIGtleWJvYXJkIG5hdmlnYXRpb24sIG9yXG4gICAgICogLSB0aGUgZXZlbnQgdGFyZ2V0IGlzIGFuIGVsZW1lbnQgdGhhdCB3aWxsIGxpa2VseSByZXF1aXJlIGludGVyYWN0aW9uXG4gICAgICogICB2aWEgdGhlIGtleWJvYXJkIChlLmcuIGEgdGV4dCBib3gpXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG9uRm9jdXMoZSkge1xuICAgICAgLy8gUHJldmVudCBJRSBmcm9tIGZvY3VzaW5nIHRoZSBkb2N1bWVudCBvciBIVE1MIGVsZW1lbnQuXG4gICAgICBpZiAoIWlzVmFsaWRGb2N1c1RhcmdldChlLnRhcmdldCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGFkS2V5Ym9hcmRFdmVudCB8fCBmb2N1c1RyaWdnZXJzS2V5Ym9hcmRNb2RhbGl0eShlLnRhcmdldCkpIHtcbiAgICAgICAgYWRkRm9jdXNWaXNpYmxlQ2xhc3MoZS50YXJnZXQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uIGBibHVyYCwgcmVtb3ZlIHRoZSBgZm9jdXMtdmlzaWJsZWAgY2xhc3MgZnJvbSB0aGUgdGFyZ2V0LlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBvbkJsdXIoZSkge1xuICAgICAgaWYgKCFpc1ZhbGlkRm9jdXNUYXJnZXQoZS50YXJnZXQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZvY3VzLXZpc2libGUnKSB8fFxuICAgICAgICBlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZm9jdXMtdmlzaWJsZS1hZGRlZCcpXG4gICAgICApIHtcbiAgICAgICAgLy8gVG8gZGV0ZWN0IGEgdGFiL3dpbmRvdyBzd2l0Y2gsIHdlIGxvb2sgZm9yIGEgYmx1ciBldmVudCBmb2xsb3dlZFxuICAgICAgICAvLyByYXBpZGx5IGJ5IGEgdmlzaWJpbGl0eSBjaGFuZ2UuXG4gICAgICAgIC8vIElmIHdlIGRvbid0IHNlZSBhIHZpc2liaWxpdHkgY2hhbmdlIHdpdGhpbiAxMDBtcywgaXQncyBwcm9iYWJseSBhXG4gICAgICAgIC8vIHJlZ3VsYXIgZm9jdXMgY2hhbmdlLlxuICAgICAgICBoYWRGb2N1c1Zpc2libGVSZWNlbnRseSA9IHRydWU7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoaGFkRm9jdXNWaXNpYmxlUmVjZW50bHlUaW1lb3V0KTtcbiAgICAgICAgaGFkRm9jdXNWaXNpYmxlUmVjZW50bHlUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaGFkRm9jdXNWaXNpYmxlUmVjZW50bHkgPSBmYWxzZTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgcmVtb3ZlRm9jdXNWaXNpYmxlQ2xhc3MoZS50YXJnZXQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIHRoZSB1c2VyIGNoYW5nZXMgdGFicywga2VlcCB0cmFjayBvZiB3aGV0aGVyIG9yIG5vdCB0aGUgcHJldmlvdXNseVxuICAgICAqIGZvY3VzZWQgZWxlbWVudCBoYWQgLmZvY3VzLXZpc2libGUuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG9uVmlzaWJpbGl0eUNoYW5nZShlKSB7XG4gICAgICBpZiAoZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSAnaGlkZGVuJykge1xuICAgICAgICAvLyBJZiB0aGUgdGFiIGJlY29tZXMgYWN0aXZlIGFnYWluLCB0aGUgYnJvd3NlciB3aWxsIGhhbmRsZSBjYWxsaW5nIGZvY3VzXG4gICAgICAgIC8vIG9uIHRoZSBlbGVtZW50IChTYWZhcmkgYWN0dWFsbHkgY2FsbHMgaXQgdHdpY2UpLlxuICAgICAgICAvLyBJZiB0aGlzIHRhYiBjaGFuZ2UgY2F1c2VkIGEgYmx1ciBvbiBhbiBlbGVtZW50IHdpdGggZm9jdXMtdmlzaWJsZSxcbiAgICAgICAgLy8gcmUtYXBwbHkgdGhlIGNsYXNzIHdoZW4gdGhlIHVzZXIgc3dpdGNoZXMgYmFjayB0byB0aGUgdGFiLlxuICAgICAgICBpZiAoaGFkRm9jdXNWaXNpYmxlUmVjZW50bHkpIHtcbiAgICAgICAgICBoYWRLZXlib2FyZEV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBhZGRJbml0aWFsUG9pbnRlck1vdmVMaXN0ZW5lcnMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBncm91cCBvZiBsaXN0ZW5lcnMgdG8gZGV0ZWN0IHVzYWdlIG9mIGFueSBwb2ludGluZyBkZXZpY2VzLlxuICAgICAqIFRoZXNlIGxpc3RlbmVycyB3aWxsIGJlIGFkZGVkIHdoZW4gdGhlIHBvbHlmaWxsIGZpcnN0IGxvYWRzLCBhbmQgYW55dGltZVxuICAgICAqIHRoZSB3aW5kb3cgaXMgYmx1cnJlZCwgc28gdGhhdCB0aGV5IGFyZSBhY3RpdmUgd2hlbiB0aGUgd2luZG93IHJlZ2FpbnNcbiAgICAgKiBmb2N1cy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhZGRJbml0aWFsUG9pbnRlck1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbkluaXRpYWxQb2ludGVyTW92ZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbkluaXRpYWxQb2ludGVyTW92ZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Jbml0aWFsUG9pbnRlck1vdmUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbkluaXRpYWxQb2ludGVyTW92ZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIG9uSW5pdGlhbFBvaW50ZXJNb3ZlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uSW5pdGlhbFBvaW50ZXJNb3ZlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uSW5pdGlhbFBvaW50ZXJNb3ZlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvbkluaXRpYWxQb2ludGVyTW92ZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG9uSW5pdGlhbFBvaW50ZXJNb3ZlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVJbml0aWFsUG9pbnRlck1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbkluaXRpYWxQb2ludGVyTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbkluaXRpYWxQb2ludGVyTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Jbml0aWFsUG9pbnRlck1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbkluaXRpYWxQb2ludGVyTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIG9uSW5pdGlhbFBvaW50ZXJNb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uSW5pdGlhbFBvaW50ZXJNb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uSW5pdGlhbFBvaW50ZXJNb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvbkluaXRpYWxQb2ludGVyTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG9uSW5pdGlhbFBvaW50ZXJNb3ZlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRoZSBwb2xmeWlsbCBmaXJzdCBsb2FkcywgYXNzdW1lIHRoZSB1c2VyIGlzIGluIGtleWJvYXJkIG1vZGFsaXR5LlxuICAgICAqIElmIGFueSBldmVudCBpcyByZWNlaXZlZCBmcm9tIGEgcG9pbnRpbmcgZGV2aWNlIChlLmcuIG1vdXNlLCBwb2ludGVyLFxuICAgICAqIHRvdWNoKSwgdHVybiBvZmYga2V5Ym9hcmQgbW9kYWxpdHkuXG4gICAgICogVGhpcyBhY2NvdW50cyBmb3Igc2l0dWF0aW9ucyB3aGVyZSBmb2N1cyBlbnRlcnMgdGhlIHBhZ2UgZnJvbSB0aGUgVVJMIGJhci5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICovXG4gICAgZnVuY3Rpb24gb25Jbml0aWFsUG9pbnRlck1vdmUoZSkge1xuICAgICAgLy8gV29yayBhcm91bmQgYSBTYWZhcmkgcXVpcmsgdGhhdCBmaXJlcyBhIG1vdXNlbW92ZSBvbiA8aHRtbD4gd2hlbmV2ZXIgdGhlXG4gICAgICAvLyB3aW5kb3cgYmx1cnMsIGV2ZW4gaWYgeW91J3JlIHRhYmJpbmcgb3V0IG9mIHRoZSBwYWdlLiDCr1xcXyjjg4QpXy/Cr1xuICAgICAgaWYgKGUudGFyZ2V0Lm5vZGVOYW1lICYmIGUudGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdodG1sJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGhhZEtleWJvYXJkRXZlbnQgPSBmYWxzZTtcbiAgICAgIHJlbW92ZUluaXRpYWxQb2ludGVyTW92ZUxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8vIEZvciBzb21lIGtpbmRzIG9mIHN0YXRlLCB3ZSBhcmUgaW50ZXJlc3RlZCBpbiBjaGFuZ2VzIGF0IHRoZSBnbG9iYWwgc2NvcGVcbiAgICAvLyBvbmx5LiBGb3IgZXhhbXBsZSwgZ2xvYmFsIHBvaW50ZXIgaW5wdXQsIGdsb2JhbCBrZXkgcHJlc3NlcyBhbmQgZ2xvYmFsXG4gICAgLy8gdmlzaWJpbGl0eSBjaGFuZ2Ugc2hvdWxkIGFmZmVjdCB0aGUgc3RhdGUgYXQgZXZlcnkgc2NvcGU6XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93biwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Qb2ludGVyRG93biwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBvblBvaW50ZXJEb3duLCB0cnVlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Qb2ludGVyRG93biwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIG9uVmlzaWJpbGl0eUNoYW5nZSwgdHJ1ZSk7XG5cbiAgICBhZGRJbml0aWFsUG9pbnRlck1vdmVMaXN0ZW5lcnMoKTtcblxuICAgIC8vIEZvciBmb2N1cyBhbmQgYmx1ciwgd2Ugc3BlY2lmaWNhbGx5IGNhcmUgYWJvdXQgc3RhdGUgY2hhbmdlcyBpbiB0aGUgbG9jYWxcbiAgICAvLyBzY29wZS4gVGhpcyBpcyBiZWNhdXNlIGZvY3VzIC8gYmx1ciBldmVudHMgdGhhdCBvcmlnaW5hdGUgZnJvbSB3aXRoaW4gYVxuICAgIC8vIHNoYWRvdyByb290IGFyZSBub3QgcmUtZGlzcGF0Y2hlZCBmcm9tIHRoZSBob3N0IGVsZW1lbnQgaWYgaXQgd2FzIGFscmVhZHlcbiAgICAvLyB0aGUgYWN0aXZlIGVsZW1lbnQgaW4gaXRzIG93biBzY29wZTpcbiAgICBzY29wZS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIG9uRm9jdXMsIHRydWUpO1xuICAgIHNjb3BlLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBvbkJsdXIsIHRydWUpO1xuXG4gICAgLy8gV2UgZGV0ZWN0IHRoYXQgYSBub2RlIGlzIGEgU2hhZG93Um9vdCBieSBlbnN1cmluZyB0aGF0IGl0IGlzIGFcbiAgICAvLyBEb2N1bWVudEZyYWdtZW50IGFuZCBhbHNvIGhhcyBhIGhvc3QgcHJvcGVydHkuIFRoaXMgY2hlY2sgY292ZXJzIG5hdGl2ZVxuICAgIC8vIGltcGxlbWVudGF0aW9uIGFuZCBwb2x5ZmlsbCBpbXBsZW1lbnRhdGlvbiB0cmFuc3BhcmVudGx5LiBJZiB3ZSBvbmx5IGNhcmVkXG4gICAgLy8gYWJvdXQgdGhlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiwgd2UgY291bGQganVzdCBjaGVjayBpZiB0aGUgc2NvcGUgd2FzXG4gICAgLy8gYW4gaW5zdGFuY2Ugb2YgYSBTaGFkb3dSb290LlxuICAgIGlmIChzY29wZS5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFICYmIHNjb3BlLmhvc3QpIHtcbiAgICAgIC8vIFNpbmNlIGEgU2hhZG93Um9vdCBpcyBhIHNwZWNpYWwga2luZCBvZiBEb2N1bWVudEZyYWdtZW50LCBpdCBkb2VzIG5vdFxuICAgICAgLy8gaGF2ZSBhIHJvb3QgZWxlbWVudCB0byBhZGQgYSBjbGFzcyB0by4gU28sIHdlIGFkZCB0aGlzIGF0dHJpYnV0ZSB0byB0aGVcbiAgICAgIC8vIGhvc3QgZWxlbWVudCBpbnN0ZWFkOlxuICAgICAgc2NvcGUuaG9zdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtanMtZm9jdXMtdmlzaWJsZScsICcnKTtcbiAgICB9IGVsc2UgaWYgKHNjb3BlLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX05PREUpIHtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdqcy1mb2N1cy12aXNpYmxlJyk7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWpzLWZvY3VzLXZpc2libGUnLCAnJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gSXQgaXMgaW1wb3J0YW50IHRvIHdyYXAgYWxsIHJlZmVyZW5jZXMgdG8gZ2xvYmFsIHdpbmRvdyBhbmQgZG9jdW1lbnQgaW5cbiAgLy8gdGhlc2UgY2hlY2tzIHRvIHN1cHBvcnQgc2VydmVyLXNpZGUgcmVuZGVyaW5nIHVzZSBjYXNlc1xuICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9XSUNHL2ZvY3VzLXZpc2libGUvaXNzdWVzLzE5OVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIE1ha2UgdGhlIHBvbHlmaWxsIGhlbHBlciBnbG9iYWxseSBhdmFpbGFibGUuIFRoaXMgY2FuIGJlIHVzZWQgYXMgYSBzaWduYWxcbiAgICAvLyB0byBpbnRlcmVzdGVkIGxpYnJhcmllcyB0aGF0IHdpc2ggdG8gY29vcmRpbmF0ZSB3aXRoIHRoZSBwb2x5ZmlsbCBmb3IgZS5nLixcbiAgICAvLyBhcHBseWluZyB0aGUgcG9seWZpbGwgdG8gYSBzaGFkb3cgcm9vdDpcbiAgICB3aW5kb3cuYXBwbHlGb2N1c1Zpc2libGVQb2x5ZmlsbCA9IGFwcGx5Rm9jdXNWaXNpYmxlUG9seWZpbGw7XG5cbiAgICAvLyBOb3RpZnkgaW50ZXJlc3RlZCBsaWJyYXJpZXMgb2YgdGhlIHBvbHlmaWxsJ3MgcHJlc2VuY2UsIGluIGNhc2UgdGhlXG4gICAgLy8gcG9seWZpbGwgd2FzIGxvYWRlZCBsYXppbHk6XG4gICAgdmFyIGV2ZW50O1xuXG4gICAgdHJ5IHtcbiAgICAgIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdmb2N1cy12aXNpYmxlLXBvbHlmaWxsLXJlYWR5Jyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIElFMTEgZG9lcyBub3Qgc3VwcG9ydCB1c2luZyBDdXN0b21FdmVudCBhcyBhIGNvbnN0cnVjdG9yIGRpcmVjdGx5OlxuICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgIGV2ZW50LmluaXRDdXN0b21FdmVudCgnZm9jdXMtdmlzaWJsZS1wb2x5ZmlsbC1yZWFkeScsIGZhbHNlLCBmYWxzZSwge30pO1xuICAgIH1cblxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gQXBwbHkgdGhlIHBvbHlmaWxsIHRvIHRoZSBnbG9iYWwgZG9jdW1lbnQsIHNvIHRoYXQgbm8gSmF2YVNjcmlwdFxuICAgIC8vIGNvb3JkaW5hdGlvbiBpcyByZXF1aXJlZCB0byB1c2UgdGhlIHBvbHlmaWxsIGluIHRoZSB0b3AtbGV2ZWwgZG9jdW1lbnQ6XG4gICAgYXBwbHlGb2N1c1Zpc2libGVQb2x5ZmlsbChkb2N1bWVudCk7XG4gIH1cblxufSkpKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgZGVmaW5lKEdwLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgaW4gbW9kZXJuIGVuZ2luZXNcbiAgLy8gd2UgY2FuIGV4cGxpY2l0bHkgYWNjZXNzIGdsb2JhbFRoaXMuIEluIG9sZGVyIGVuZ2luZXMgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn1cbiIsIiFmdW5jdGlvbihuLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOihuPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6bnx8c2VsZikuTGF6eUxvYWQ9dCgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oKXtyZXR1cm4gbj1PYmplY3QuYXNzaWdufHxmdW5jdGlvbihuKXtmb3IodmFyIHQ9MTt0PGFyZ3VtZW50cy5sZW5ndGg7dCsrKXt2YXIgZT1hcmd1bWVudHNbdF07Zm9yKHZhciBpIGluIGUpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsaSkmJihuW2ldPWVbaV0pfXJldHVybiBufSxuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX12YXIgdD1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93LGU9dCYmIShcIm9uc2Nyb2xsXCJpbiB3aW5kb3cpfHxcInVuZGVmaW5lZFwiIT10eXBlb2YgbmF2aWdhdG9yJiYvKGdsZXxpbmd8cm8pYm90fGNyYXdsfHNwaWRlci9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksaT10JiZcIkludGVyc2VjdGlvbk9ic2VydmVyXCJpbiB3aW5kb3csbz10JiZcImNsYXNzTGlzdFwiaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIiksYT10JiZ3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbz4xLHI9e2VsZW1lbnRzX3NlbGVjdG9yOlwiLmxhenlcIixjb250YWluZXI6ZXx8dD9kb2N1bWVudDpudWxsLHRocmVzaG9sZDozMDAsdGhyZXNob2xkczpudWxsLGRhdGFfc3JjOlwic3JjXCIsZGF0YV9zcmNzZXQ6XCJzcmNzZXRcIixkYXRhX3NpemVzOlwic2l6ZXNcIixkYXRhX2JnOlwiYmdcIixkYXRhX2JnX2hpZHBpOlwiYmctaGlkcGlcIixkYXRhX2JnX211bHRpOlwiYmctbXVsdGlcIixkYXRhX2JnX211bHRpX2hpZHBpOlwiYmctbXVsdGktaGlkcGlcIixkYXRhX3Bvc3RlcjpcInBvc3RlclwiLGNsYXNzX2FwcGxpZWQ6XCJhcHBsaWVkXCIsY2xhc3NfbG9hZGluZzpcImxvYWRpbmdcIixjbGFzc19sb2FkZWQ6XCJsb2FkZWRcIixjbGFzc19lcnJvcjpcImVycm9yXCIsY2xhc3NfZW50ZXJlZDpcImVudGVyZWRcIixjbGFzc19leGl0ZWQ6XCJleGl0ZWRcIix1bm9ic2VydmVfY29tcGxldGVkOiEwLHVub2JzZXJ2ZV9lbnRlcmVkOiExLGNhbmNlbF9vbl9leGl0OiEwLGNhbGxiYWNrX2VudGVyOm51bGwsY2FsbGJhY2tfZXhpdDpudWxsLGNhbGxiYWNrX2FwcGxpZWQ6bnVsbCxjYWxsYmFja19sb2FkaW5nOm51bGwsY2FsbGJhY2tfbG9hZGVkOm51bGwsY2FsbGJhY2tfZXJyb3I6bnVsbCxjYWxsYmFja19maW5pc2g6bnVsbCxjYWxsYmFja19jYW5jZWw6bnVsbCx1c2VfbmF0aXZlOiExfSxjPWZ1bmN0aW9uKHQpe3JldHVybiBuKHt9LHIsdCl9LHU9ZnVuY3Rpb24obix0KXt2YXIgZSxpPVwiTGF6eUxvYWQ6OkluaXRpYWxpemVkXCIsbz1uZXcgbih0KTt0cnl7ZT1uZXcgQ3VzdG9tRXZlbnQoaSx7ZGV0YWlsOntpbnN0YW5jZTpvfX0pfWNhdGNoKG4peyhlPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIikpLmluaXRDdXN0b21FdmVudChpLCExLCExLHtpbnN0YW5jZTpvfSl9d2luZG93LmRpc3BhdGNoRXZlbnQoZSl9LGw9XCJzcmNcIixzPVwic3Jjc2V0XCIsZj1cInNpemVzXCIsZD1cInBvc3RlclwiLF89XCJsbE9yaWdpbmFsQXR0cnNcIixnPVwiZGF0YVwiLHY9XCJsb2FkaW5nXCIsYj1cImxvYWRlZFwiLHA9XCJhcHBsaWVkXCIsaD1cImVycm9yXCIsbT1cIm5hdGl2ZVwiLEU9XCJkYXRhLVwiLEk9XCJsbC1zdGF0dXNcIix5PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4uZ2V0QXR0cmlidXRlKEUrdCl9LEE9ZnVuY3Rpb24obil7cmV0dXJuIHkobixJKX0saz1mdW5jdGlvbihuLHQpe3JldHVybiBmdW5jdGlvbihuLHQsZSl7dmFyIGk9XCJkYXRhLWxsLXN0YXR1c1wiO251bGwhPT1lP24uc2V0QXR0cmlidXRlKGksZSk6bi5yZW1vdmVBdHRyaWJ1dGUoaSl9KG4sMCx0KX0sTD1mdW5jdGlvbihuKXtyZXR1cm4gayhuLG51bGwpfSx3PWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT09QShuKX0sTz1mdW5jdGlvbihuKXtyZXR1cm4gQShuKT09PW19LHg9W3YsYixwLGhdLEM9ZnVuY3Rpb24obix0LGUsaSl7biYmKHZvaWQgMD09PWk/dm9pZCAwPT09ZT9uKHQpOm4odCxlKTpuKHQsZSxpKSl9LE49ZnVuY3Rpb24obix0KXtvP24uY2xhc3NMaXN0LmFkZCh0KTpuLmNsYXNzTmFtZSs9KG4uY2xhc3NOYW1lP1wiIFwiOlwiXCIpK3R9LE09ZnVuY3Rpb24obix0KXtvP24uY2xhc3NMaXN0LnJlbW92ZSh0KTpuLmNsYXNzTmFtZT1uLmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoXnxcXFxccyspXCIrdCtcIihcXFxccyt8JClcIiksXCIgXCIpLnJlcGxhY2UoL15cXHMrLyxcIlwiKS5yZXBsYWNlKC9cXHMrJC8sXCJcIil9LHo9ZnVuY3Rpb24obil7cmV0dXJuIG4ubGxUZW1wSW1hZ2V9LFQ9ZnVuY3Rpb24obix0KXtpZih0KXt2YXIgZT10Ll9vYnNlcnZlcjtlJiZlLnVub2JzZXJ2ZShuKX19LFI9ZnVuY3Rpb24obix0KXtuJiYobi5sb2FkaW5nQ291bnQrPXQpfSxHPWZ1bmN0aW9uKG4sdCl7biYmKG4udG9Mb2FkQ291bnQ9dCl9LEQ9ZnVuY3Rpb24obil7Zm9yKHZhciB0LGU9W10saT0wO3Q9bi5jaGlsZHJlbltpXTtpKz0xKVwiU09VUkNFXCI9PT10LnRhZ05hbWUmJmUucHVzaCh0KTtyZXR1cm4gZX0sVj1mdW5jdGlvbihuLHQpe3ZhciBlPW4ucGFyZW50Tm9kZTtlJiZcIlBJQ1RVUkVcIj09PWUudGFnTmFtZSYmRChlKS5mb3JFYWNoKHQpfSxGPWZ1bmN0aW9uKG4sdCl7RChuKS5mb3JFYWNoKHQpfSxqPVtsXSxCPVtsLGRdLEo9W2wscyxmXSxQPVtnXSxTPWZ1bmN0aW9uKG4pe3JldHVybiEhbltfXX0sVT1mdW5jdGlvbihuKXtyZXR1cm4gbltfXX0sJD1mdW5jdGlvbihuKXtyZXR1cm4gZGVsZXRlIG5bX119LHE9ZnVuY3Rpb24obix0KXtpZighUyhuKSl7dmFyIGU9e307dC5mb3JFYWNoKChmdW5jdGlvbih0KXtlW3RdPW4uZ2V0QXR0cmlidXRlKHQpfSkpLG5bX109ZX19LEg9ZnVuY3Rpb24obix0KXtpZihTKG4pKXt2YXIgZT1VKG4pO3QuZm9yRWFjaCgoZnVuY3Rpb24odCl7IWZ1bmN0aW9uKG4sdCxlKXtlP24uc2V0QXR0cmlidXRlKHQsZSk6bi5yZW1vdmVBdHRyaWJ1dGUodCl9KG4sdCxlW3RdKX0pKX19LEs9ZnVuY3Rpb24obix0LGUpe04obix0LmNsYXNzX2xvYWRpbmcpLGsobix2KSxlJiYoUihlLDEpLEModC5jYWxsYmFja19sb2FkaW5nLG4sZSkpfSxRPWZ1bmN0aW9uKG4sdCxlKXtlJiZuLnNldEF0dHJpYnV0ZSh0LGUpfSxXPWZ1bmN0aW9uKG4sdCl7UShuLGYseShuLHQuZGF0YV9zaXplcykpLFEobixzLHkobix0LmRhdGFfc3Jjc2V0KSksUShuLGwseShuLHQuZGF0YV9zcmMpKX0sWD17SU1HOmZ1bmN0aW9uKG4sdCl7VihuLChmdW5jdGlvbihuKXtxKG4sSiksVyhuLHQpfSkpLHEobixKKSxXKG4sdCl9LElGUkFNRTpmdW5jdGlvbihuLHQpe3EobixqKSxRKG4sbCx5KG4sdC5kYXRhX3NyYykpfSxWSURFTzpmdW5jdGlvbihuLHQpe0YobiwoZnVuY3Rpb24obil7cShuLGopLFEobixsLHkobix0LmRhdGFfc3JjKSl9KSkscShuLEIpLFEobixkLHkobix0LmRhdGFfcG9zdGVyKSksUShuLGwseShuLHQuZGF0YV9zcmMpKSxuLmxvYWQoKX0sT0JKRUNUOmZ1bmN0aW9uKG4sdCl7cShuLFApLFEobixnLHkobix0LmRhdGFfc3JjKSl9fSxZPVtcIklNR1wiLFwiSUZSQU1FXCIsXCJWSURFT1wiLFwiT0JKRUNUXCJdLFo9ZnVuY3Rpb24obix0KXshdHx8ZnVuY3Rpb24obil7cmV0dXJuIG4ubG9hZGluZ0NvdW50PjB9KHQpfHxmdW5jdGlvbihuKXtyZXR1cm4gbi50b0xvYWRDb3VudD4wfSh0KXx8QyhuLmNhbGxiYWNrX2ZpbmlzaCx0KX0sbm49ZnVuY3Rpb24obix0LGUpe24uYWRkRXZlbnRMaXN0ZW5lcih0LGUpLG4ubGxFdkxpc25yc1t0XT1lfSx0bj1mdW5jdGlvbihuLHQsZSl7bi5yZW1vdmVFdmVudExpc3RlbmVyKHQsZSl9LGVuPWZ1bmN0aW9uKG4pe3JldHVybiEhbi5sbEV2TGlzbnJzfSxvbj1mdW5jdGlvbihuKXtpZihlbihuKSl7dmFyIHQ9bi5sbEV2TGlzbnJzO2Zvcih2YXIgZSBpbiB0KXt2YXIgaT10W2VdO3RuKG4sZSxpKX1kZWxldGUgbi5sbEV2TGlzbnJzfX0sYW49ZnVuY3Rpb24obix0LGUpeyFmdW5jdGlvbihuKXtkZWxldGUgbi5sbFRlbXBJbWFnZX0obiksUihlLC0xKSxmdW5jdGlvbihuKXtuJiYobi50b0xvYWRDb3VudC09MSl9KGUpLE0obix0LmNsYXNzX2xvYWRpbmcpLHQudW5vYnNlcnZlX2NvbXBsZXRlZCYmVChuLGUpfSxybj1mdW5jdGlvbihuLHQsZSl7dmFyIGk9eihuKXx8bjtlbihpKXx8ZnVuY3Rpb24obix0LGUpe2VuKG4pfHwobi5sbEV2TGlzbnJzPXt9KTt2YXIgaT1cIlZJREVPXCI9PT1uLnRhZ05hbWU/XCJsb2FkZWRkYXRhXCI6XCJsb2FkXCI7bm4obixpLHQpLG5uKG4sXCJlcnJvclwiLGUpfShpLChmdW5jdGlvbihvKXshZnVuY3Rpb24obix0LGUsaSl7dmFyIG89Tyh0KTthbih0LGUsaSksTih0LGUuY2xhc3NfbG9hZGVkKSxrKHQsYiksQyhlLmNhbGxiYWNrX2xvYWRlZCx0LGkpLG98fFooZSxpKX0oMCxuLHQsZSksb24oaSl9KSwoZnVuY3Rpb24obyl7IWZ1bmN0aW9uKG4sdCxlLGkpe3ZhciBvPU8odCk7YW4odCxlLGkpLE4odCxlLmNsYXNzX2Vycm9yKSxrKHQsaCksQyhlLmNhbGxiYWNrX2Vycm9yLHQsaSksb3x8WihlLGkpfSgwLG4sdCxlKSxvbihpKX0pKX0sY249ZnVuY3Rpb24obix0LGUpeyFmdW5jdGlvbihuKXtuLmxsVGVtcEltYWdlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIil9KG4pLHJuKG4sdCxlKSxmdW5jdGlvbihuKXtTKG4pfHwobltfXT17YmFja2dyb3VuZEltYWdlOm4uc3R5bGUuYmFja2dyb3VuZEltYWdlfSl9KG4pLGZ1bmN0aW9uKG4sdCxlKXt2YXIgaT15KG4sdC5kYXRhX2JnKSxvPXkobix0LmRhdGFfYmdfaGlkcGkpLHI9YSYmbz9vOmk7ciYmKG4uc3R5bGUuYmFja2dyb3VuZEltYWdlPSd1cmwoXCInLmNvbmNhdChyLCdcIiknKSx6KG4pLnNldEF0dHJpYnV0ZShsLHIpLEsobix0LGUpKX0obix0LGUpLGZ1bmN0aW9uKG4sdCxlKXt2YXIgaT15KG4sdC5kYXRhX2JnX211bHRpKSxvPXkobix0LmRhdGFfYmdfbXVsdGlfaGlkcGkpLHI9YSYmbz9vOmk7ciYmKG4uc3R5bGUuYmFja2dyb3VuZEltYWdlPXIsZnVuY3Rpb24obix0LGUpe04obix0LmNsYXNzX2FwcGxpZWQpLGsobixwKSxlJiYodC51bm9ic2VydmVfY29tcGxldGVkJiZUKG4sdCksQyh0LmNhbGxiYWNrX2FwcGxpZWQsbixlKSl9KG4sdCxlKSl9KG4sdCxlKX0sdW49ZnVuY3Rpb24obix0LGUpeyFmdW5jdGlvbihuKXtyZXR1cm4gWS5pbmRleE9mKG4udGFnTmFtZSk+LTF9KG4pP2NuKG4sdCxlKTpmdW5jdGlvbihuLHQsZSl7cm4obix0LGUpLGZ1bmN0aW9uKG4sdCxlKXt2YXIgaT1YW24udGFnTmFtZV07aSYmKGkobix0KSxLKG4sdCxlKSl9KG4sdCxlKX0obix0LGUpfSxsbj1mdW5jdGlvbihuKXtuLnJlbW92ZUF0dHJpYnV0ZShsKSxuLnJlbW92ZUF0dHJpYnV0ZShzKSxuLnJlbW92ZUF0dHJpYnV0ZShmKX0sc249ZnVuY3Rpb24obil7VihuLChmdW5jdGlvbihuKXtIKG4sSil9KSksSChuLEopfSxmbj17SU1HOnNuLElGUkFNRTpmdW5jdGlvbihuKXtIKG4sail9LFZJREVPOmZ1bmN0aW9uKG4pe0YobiwoZnVuY3Rpb24obil7SChuLGopfSkpLEgobixCKSxuLmxvYWQoKX0sT0JKRUNUOmZ1bmN0aW9uKG4pe0gobixQKX19LGRuPWZ1bmN0aW9uKG4sdCl7KGZ1bmN0aW9uKG4pe3ZhciB0PWZuW24udGFnTmFtZV07dD90KG4pOmZ1bmN0aW9uKG4pe2lmKFMobikpe3ZhciB0PVUobik7bi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2U9dC5iYWNrZ3JvdW5kSW1hZ2V9fShuKX0pKG4pLGZ1bmN0aW9uKG4sdCl7dyhuKXx8TyhuKXx8KE0obix0LmNsYXNzX2VudGVyZWQpLE0obix0LmNsYXNzX2V4aXRlZCksTShuLHQuY2xhc3NfYXBwbGllZCksTShuLHQuY2xhc3NfbG9hZGluZyksTShuLHQuY2xhc3NfbG9hZGVkKSxNKG4sdC5jbGFzc19lcnJvcikpfShuLHQpLEwobiksJChuKX0sX249W1wiSU1HXCIsXCJJRlJBTUVcIixcIlZJREVPXCJdLGduPWZ1bmN0aW9uKG4pe3JldHVybiBuLnVzZV9uYXRpdmUmJlwibG9hZGluZ1wiaW4gSFRNTEltYWdlRWxlbWVudC5wcm90b3R5cGV9LHZuPWZ1bmN0aW9uKG4sdCxlKXtuLmZvckVhY2goKGZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbi5pc0ludGVyc2VjdGluZ3x8bi5pbnRlcnNlY3Rpb25SYXRpbz4wfShuKT9mdW5jdGlvbihuLHQsZSxpKXt2YXIgbz1mdW5jdGlvbihuKXtyZXR1cm4geC5pbmRleE9mKEEobikpPj0wfShuKTtrKG4sXCJlbnRlcmVkXCIpLE4obixlLmNsYXNzX2VudGVyZWQpLE0obixlLmNsYXNzX2V4aXRlZCksZnVuY3Rpb24obix0LGUpe3QudW5vYnNlcnZlX2VudGVyZWQmJlQobixlKX0obixlLGkpLEMoZS5jYWxsYmFja19lbnRlcixuLHQsaSksb3x8dW4obixlLGkpfShuLnRhcmdldCxuLHQsZSk6ZnVuY3Rpb24obix0LGUsaSl7dyhuKXx8KE4obixlLmNsYXNzX2V4aXRlZCksZnVuY3Rpb24obix0LGUsaSl7ZS5jYW5jZWxfb25fZXhpdCYmZnVuY3Rpb24obil7cmV0dXJuIEEobik9PT12fShuKSYmXCJJTUdcIj09PW4udGFnTmFtZSYmKG9uKG4pLGZ1bmN0aW9uKG4pe1YobiwoZnVuY3Rpb24obil7bG4obil9KSksbG4obil9KG4pLHNuKG4pLE0obixlLmNsYXNzX2xvYWRpbmcpLFIoaSwtMSksTChuKSxDKGUuY2FsbGJhY2tfY2FuY2VsLG4sdCxpKSl9KG4sdCxlLGkpLEMoZS5jYWxsYmFja19leGl0LG4sdCxpKSl9KG4udGFyZ2V0LG4sdCxlKX0pKX0sYm49ZnVuY3Rpb24obil7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG4pfSxwbj1mdW5jdGlvbihuKXtyZXR1cm4gbi5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChuLmVsZW1lbnRzX3NlbGVjdG9yKX0saG49ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBBKG4pPT09aH0obil9LG1uPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBibihuKS5maWx0ZXIodyl9KG58fHBuKHQpKX0sRW49ZnVuY3Rpb24obixlKXt2YXIgbz1jKG4pO3RoaXMuX3NldHRpbmdzPW8sdGhpcy5sb2FkaW5nQ291bnQ9MCxmdW5jdGlvbihuLHQpe2kmJiFnbihuKSYmKHQuX29ic2VydmVyPW5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZnVuY3Rpb24oZSl7dm4oZSxuLHQpfSksZnVuY3Rpb24obil7cmV0dXJue3Jvb3Q6bi5jb250YWluZXI9PT1kb2N1bWVudD9udWxsOm4uY29udGFpbmVyLHJvb3RNYXJnaW46bi50aHJlc2hvbGRzfHxuLnRocmVzaG9sZCtcInB4XCJ9fShuKSkpfShvLHRoaXMpLGZ1bmN0aW9uKG4sZSl7dCYmd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvbmxpbmVcIiwoZnVuY3Rpb24oKXshZnVuY3Rpb24obix0KXt2YXIgZTsoZT1wbihuKSxibihlKS5maWx0ZXIoaG4pKS5mb3JFYWNoKChmdW5jdGlvbih0KXtNKHQsbi5jbGFzc19lcnJvciksTCh0KX0pKSx0LnVwZGF0ZSgpfShuLGUpfSkpfShvLHRoaXMpLHRoaXMudXBkYXRlKGUpfTtyZXR1cm4gRW4ucHJvdG90eXBlPXt1cGRhdGU6ZnVuY3Rpb24obil7dmFyIHQsbyxhPXRoaXMuX3NldHRpbmdzLHI9bW4obixhKTtHKHRoaXMsci5sZW5ndGgpLCFlJiZpP2duKGEpP2Z1bmN0aW9uKG4sdCxlKXtuLmZvckVhY2goKGZ1bmN0aW9uKG4pey0xIT09X24uaW5kZXhPZihuLnRhZ05hbWUpJiZmdW5jdGlvbihuLHQsZSl7bi5zZXRBdHRyaWJ1dGUoXCJsb2FkaW5nXCIsXCJsYXp5XCIpLHJuKG4sdCxlKSxmdW5jdGlvbihuLHQpe3ZhciBlPVhbbi50YWdOYW1lXTtlJiZlKG4sdCl9KG4sdCksayhuLG0pfShuLHQsZSl9KSksRyhlLDApfShyLGEsdGhpcyk6KG89cixmdW5jdGlvbihuKXtuLmRpc2Nvbm5lY3QoKX0odD10aGlzLl9vYnNlcnZlciksZnVuY3Rpb24obix0KXt0LmZvckVhY2goKGZ1bmN0aW9uKHQpe24ub2JzZXJ2ZSh0KX0pKX0odCxvKSk6dGhpcy5sb2FkQWxsKHIpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5fb2JzZXJ2ZXImJnRoaXMuX29ic2VydmVyLmRpc2Nvbm5lY3QoKSxwbih0aGlzLl9zZXR0aW5ncykuZm9yRWFjaCgoZnVuY3Rpb24obil7JChuKX0pKSxkZWxldGUgdGhpcy5fb2JzZXJ2ZXIsZGVsZXRlIHRoaXMuX3NldHRpbmdzLGRlbGV0ZSB0aGlzLmxvYWRpbmdDb3VudCxkZWxldGUgdGhpcy50b0xvYWRDb3VudH0sbG9hZEFsbDpmdW5jdGlvbihuKXt2YXIgdD10aGlzLGU9dGhpcy5fc2V0dGluZ3M7bW4obixlKS5mb3JFYWNoKChmdW5jdGlvbihuKXtUKG4sdCksdW4obixlLHQpfSkpfSxyZXN0b3JlQWxsOmZ1bmN0aW9uKCl7dmFyIG49dGhpcy5fc2V0dGluZ3M7cG4obikuZm9yRWFjaCgoZnVuY3Rpb24odCl7ZG4odCxuKX0pKX19LEVuLmxvYWQ9ZnVuY3Rpb24obix0KXt2YXIgZT1jKHQpO3VuKG4sZSl9LEVuLnJlc2V0U3RhdHVzPWZ1bmN0aW9uKG4pe0wobil9LHQmJmZ1bmN0aW9uKG4sdCl7aWYodClpZih0Lmxlbmd0aClmb3IodmFyIGUsaT0wO2U9dFtpXTtpKz0xKXUobixlKTtlbHNlIHUobix0KX0oRW4sd2luZG93LmxhenlMb2FkT3B0aW9ucyksRW59KSk7XG4iLCJleHBvcnQgY29uc3QgZmFkZUluQW5pbWF0aW9uSW5uZXIgPSBmdW5jdGlvbihvYmosIGl0ZW0sIHtkdXJhdGlvbiwgZGlzcGxheSwgZmlufSkge1xyXG4gIGl0ZW0uc3R5bGUuZGlzcGxheSA9IGRpc3BsYXkgfHwgJ2Jsb2NrJztcclxuXHJcbiAgY29uc3QgX2ZhZGVJbiA9IChjb21wbGVjdGlvbikgPT4ge1xyXG4gICAgaXRlbS5zdHlsZS5vcGFjaXR5ID0gY29tcGxlY3Rpb247XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYW5pID0gb2JqLmFuaW1hdGVPdmVyVGltZShkdXJhdGlvbiwgX2ZhZGVJbiwgZmluKTtcclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pKTtcclxufTtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgZmFkZU91dEFuaW1hdGlvbklubmVyID0gZnVuY3Rpb24ob2JqLCBpdGVtLCB7ZHVyYXRpb24sIGZpbn0pIHtcclxuICBjb25zdCBfZmFkZU91dCA9IChjb21wbGVjdGlvbikgPT4ge1xyXG4gICAgaXRlbS5zdHlsZS5vcGFjaXR5ID0gMSAtIGNvbXBsZWN0aW9uO1xyXG5cclxuICAgIGlmIChjb21wbGVjdGlvbiA9PT0gMSkgaXRlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGFuaSA9IG9iai5hbmltYXRlT3ZlclRpbWUoZHVyYXRpb24sIF9mYWRlT3V0LCBmaW4pO1xyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmkpO1xyXG5cclxuICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ29wYWNpdHknLCAnZGlzcGxheScpO1xyXG59O1xyXG4iLCJleHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgaWYgKGVsZW0uZ2V0Q29udGV4dCAmJiBlbGVtLmdldENvbnRleHQoJzJkJykpIHtcbiAgICByZXR1cm4gZWxlbS50b0RhdGFVUkwoJ2ltYWdlL3dlYnAnKS5pbmRleE9mKCdkYXRhOmltYWdlL3dlYnAnKSA9PT0gMDtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG4iLCJleHBvcnQgZGVmYXVsdCAoZm4pID0+IHtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmbik7XG4gIH0gZWxzZSB7XG4gICAgZm4oKTtcbiAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgZGl2LnN0eWxlLndpZHRoID0gJzUwcHgnO1xyXG4gIGRpdi5zdHlsZS5oZWlnaHQgPSAnNTBweCc7XHJcbiAgZGl2LnN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xyXG5cclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZChkaXYpO1xyXG4gIGNvbnN0IHNjcldpZHRoID0gZGl2Lm9mZnNldFdpZHRoIC0gZGl2LmNsaWVudFdpZHRoO1xyXG4gIGRpdi5yZW1vdmUoKTtcclxuXHJcbiAgcmV0dXJuIHNjcldpZHRoO1xyXG59O1xyXG4iLCJleHBvcnQgZGVmYXVsdCAoc2xpZGVzRmllbGQsIG9mZnNldCwgZG90cywgc2xpZGVJbmRleCkgPT4ge1xyXG4gIHNsaWRlc0ZpZWxkLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke29mZnNldH1weClgO1xyXG4gIGRvdHMuZm9yRWFjaCgoZG90KSA9PiBkb3QuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gIGRvdHNbc2xpZGVJbmRleF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbn07XHJcbiIsImltcG9ydCAkIGZyb20gJy4uL2NvcmUnO1xyXG5cclxuXHJcbiQucHJvdG90eXBlLmFjY29yZGlvbiA9IGZ1bmN0aW9uKGFjdGl2ZVRyaWdnZXIsIGFjdGl2ZUNvbnRlbnQpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuICAgICQodGhpc1tpXSkuY2xpY2soKCkgPT4ge1xyXG4gICAgICAkKHRoaXNbaV0pLnRvZ2dsZUNsYXNzKGFjdGl2ZVRyaWdnZXIpO1xyXG4gICAgICAkKHRoaXNbaV0ubmV4dEVsZW1lbnRTaWJsaW5nKS50b2dnbGVDbGFzcyhhY3RpdmVDb250ZW50KTtcclxuXHJcbiAgICAgIGlmICh0aGlzW2ldLmNsYXNzTGlzdC5jb250YWlucyhhY3RpdmVUcmlnZ2VyKSkge1xyXG4gICAgICAgIHRoaXNbaV0ubmV4dEVsZW1lbnRTaWJsaW5nLnN0eWxlLm1heEhlaWdodCA9IHRoaXNbaV0ubmV4dEVsZW1lbnRTaWJsaW5nLnNjcm9sbEhlaWdodCArIDIwICsgJ3B4JztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzW2ldLm5leHRFbGVtZW50U2libGluZy5zdHlsZS5tYXhIZWlnaHQgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbiIsImltcG9ydCBzbGlkZUludGVyYWN0aXZlIGZyb20gJy4uLy4uL2hlbHBlcnMvc2xpZGVJbnRlcmFjdGl2ZSc7XHJcbmltcG9ydCAkIGZyb20gJy4uL2NvcmUnO1xyXG5cclxuXHJcbiQucHJvdG90eXBlLmNhcm91c2VsID0gZnVuY3Rpb24oKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCB3aWR0aCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXNbaV0ucXVlcnlTZWxlY3RvcignLmNhcm91c2VsLWlubmVyJykpLndpZHRoO1xyXG4gICAgY29uc3Qgc2xpZGVzID0gdGhpc1tpXS5xdWVyeVNlbGVjdG9yQWxsKCcuY2Fyb3VzZWwtaXRlbScpO1xyXG4gICAgY29uc3Qgc2xpZGVzRmllbGQgPSB0aGlzW2ldLnF1ZXJ5U2VsZWN0b3IoJy5jYXJvdXNlbC1zbGlkZXMnKTtcclxuICAgIGNvbnN0IGRvdHMgPSB0aGlzW2ldLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJvdXNlbC1pbmRpY2F0b3JzIGxpJyk7XHJcblxyXG4gICAgc2xpZGVzRmllbGQuc3R5bGUud2lkdGggPSAxMDAgKiBzbGlkZXMubGVuZ3RoICsgJyUnO1xyXG5cclxuICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSkgPT4gc2xpZGUuc3R5bGUud2lkdGggPSB3aWR0aCk7XHJcblxyXG4gICAgbGV0IG9mZnNldCA9IDA7XHJcbiAgICBsZXQgc2xpZGVJbmRleCA9IDA7XHJcblxyXG4gICAgLy8gbmV4dCBhcnJvdyhyaWdodClcclxuICAgICQodGhpc1tpXS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZT1cIm5leHRcIl0nKSkuY2xpY2soKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgb2Zmc2V0ID09PSArd2lkdGgucmVwbGFjZSgvXFxEL2csICcnKSAqIChzbGlkZXMubGVuZ3RoIC0gMSkgP1xyXG4gICAgICAgIG9mZnNldCA9IDAgOlxyXG4gICAgICAgIG9mZnNldCArPSArd2lkdGgucmVwbGFjZSgvXFxEL2csICcnKTtcclxuXHJcbiAgICAgIHNsaWRlSW5kZXggPT09IHNsaWRlcy5sZW5ndGggLSAxID9cclxuICAgICAgICBzbGlkZUluZGV4ID0gMCA6XHJcbiAgICAgICAgc2xpZGVJbmRleCsrO1xyXG5cclxuICAgICAgc2xpZGVJbnRlcmFjdGl2ZShzbGlkZXNGaWVsZCwgb2Zmc2V0LCBkb3RzLCBzbGlkZUluZGV4KTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvLyBwcmV2IGFycm93KGxlZnQpXHJcbiAgICAkKHRoaXNbaV0ucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGU9XCJwcmV2XCJdJykpLmNsaWNrKChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIG9mZnNldCA9PT0gMCA/XHJcbiAgICAgICAgb2Zmc2V0ID0gK3dpZHRoLnJlcGxhY2UoL1xcRC9nLCAnJykgKiAoc2xpZGVzLmxlbmd0aCAtIDEpIDpcclxuICAgICAgICBvZmZzZXQgLT0gK3dpZHRoLnJlcGxhY2UoL1xcRC9nLCAnJyk7XHJcblxyXG4gICAgICBzbGlkZUluZGV4ID09PSAwID9cclxuICAgICAgICBzbGlkZUluZGV4ID0gc2xpZGVzLmxlbmd0aCAtIDEgOlxyXG4gICAgICAgIHNsaWRlSW5kZXgtLTtcclxuXHJcbiAgICAgIHNsaWRlSW50ZXJhY3RpdmUoc2xpZGVzRmllbGQsIG9mZnNldCwgZG90cywgc2xpZGVJbmRleCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy8gc2xpZGUgZG90cyBhdCB0aGUgYm90dG9tXHJcbiAgICAkKCcjZXhhbXBsZSBvbCBsaScpLmNsaWNrKChlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNsaWRlV2F5ID0gKyQoZS50YXJnZXQpLmF0dHJpYnV0ZSgnZGF0YS1zbGlkZS10bycpO1xyXG5cclxuICAgICAgc2xpZGVJbmRleCA9IHNsaWRlV2F5O1xyXG4gICAgICBvZmZzZXQgPSArd2lkdGgucmVwbGFjZSgvXFxEL2csICcnKSAqIHNsaWRlV2F5O1xyXG5cclxuICAgICAgc2xpZGVJbnRlcmFjdGl2ZShzbGlkZXNGaWVsZCwgb2Zmc2V0LCBkb3RzLCBzbGlkZUluZGV4KTtcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbiQoJyNleGFtcGxlJykuY2Fyb3VzZWwoKTtcclxuIiwiaW1wb3J0ICQgZnJvbSAnLi4vY29yZSc7XHJcblxyXG5cclxuJC5wcm90b3R5cGUuZHJvcGRvd25NZW51ID0gZnVuY3Rpb24oKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBpZEl0ZW0gPSAkKHRoaXNbaV0pLmF0dHJpYnV0ZSgnaWQnKTtcclxuXHJcbiAgICAkKHRoaXNbaV0pLmNsaWNrKCgpID0+ICQoYFtkYXRhLXRvZ2dsZS1pZD0ke2lkSXRlbX1dYCkuZmFkZVRvZ2dsZSgyMDApKTtcclxuICB9XHJcbn07XHJcblxyXG4kKCcudG9nZ2xlLWRyb3Bkb3duLW1lbnUnKS5kcm9wZG93bk1lbnUoKTtcclxuIiwiaW1wb3J0ICQgZnJvbSAnLi4vY29yZSc7XHJcbmltcG9ydCBzY3JvbGxXaWR0aCBmcm9tICcuLi8uLi9oZWxwZXJzL3Njcm9sbFdpZHRoJztcclxuXHJcbmNvbnN0IEFOSU1BVElPTlRJTUUgPSA1MDA7XHJcblxyXG4kLnByb3RvdHlwZS5tb2RhbCA9IGZ1bmN0aW9uKGNyZWF0ZWQpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IHRhcmdldCA9ICQodGhpc1tpXSkuYXR0cmlidXRlKCdkYXRhLXRhcmdldCcpO1xyXG5cclxuICAgICQodGhpc1tpXSkuY2xpY2soKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAkKHRhcmdldCkuZmFkZUluKEFOSU1BVElPTlRJTUUpO1xyXG4gICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAke3RhcmdldH0gW2RhdGEtY2xvc2VdYCkuZm9yRWFjaCgoYnRuKSA9PiB7XHJcbiAgICAgICQoYnRuKS5jbGljaygoKSA9PiB7XHJcbiAgICAgICAgJCh0YXJnZXQpLmZhZGVPdXQoQU5JTUFUSU9OVElNRSk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKGNyZWF0ZWQpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZSA9ICcnO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgQU5JTUFUSU9OVElNRSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCh0YXJnZXQpLmNsaWNrKChlKSA9PiB7XHJcbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsJykpIHtcclxuICAgICAgICAkKHRhcmdldCkuZmFkZU91dChBTklNQVRJT05USU1FKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBpZiAoY3JlYXRlZCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlID0gJyc7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KS5yZW1vdmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCBBTklNQVRJT05USU1FKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuJCgnW2RhdGEtdG9nZ2xlPVwibW9kYWxcIl0nKS5tb2RhbCh0cnVlKTtcclxuXHJcblxyXG4kLnByb3RvdHlwZS5jcmVhdGVNb2RhbCA9IGZ1bmN0aW9uKHtpbm5lciwgYnRuc30gPSB7fSkge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gIGNvbnN0IHtjb3VudCwgc2V0dGluZ3N9ID0gYnRuczsvLyBidG5zIHBhcmFtc1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGxldCBtb2RhbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICQobW9kYWxFbGVtZW50KS5hZGRDbGFzcygnbW9kYWwnKTtcclxuICAgICQobW9kYWxFbGVtZW50KS5hZGRBdHRyaWJ1dGUoJ2lkJywgJCh0aGlzW2ldKS5hdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0Jykuc2xpY2UoMSkpO1xyXG4gICAgJChtb2RhbEVsZW1lbnQpLmh0bWwoYFxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZ1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJjbG9zZVwiIGRhdGEtY2xvc2U+XHJcbiAgICAgICAgICA8c3Bhbj4mdGltZXM7PC9zcGFuPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgICAgICAgIDxoMyBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+JHtpbm5lci50aXRsZX08L2gzPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5IHAyMFwiPiR7aW5uZXIuYm9keX08L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XHJcblxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PmApO1xyXG5cclxuICAgIGNvbnN0IGJ1dHRvbnMgPSBbXTtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY291bnQ7IGorKykge1xyXG4gICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgJChidXR0b24pLmFkZENsYXNzKCdidG4nLCAuLi5zZXR0aW5nc1tqXS5jbGFzc2VzKTtcclxuICAgICAgJChidXR0b24pLmh0bWwoc2V0dGluZ3Nbal0uY29udGVudCk7XHJcblxyXG4gICAgICBpZiAoc2V0dGluZ3Nbal0uY2FsbGJhY2sgJiYgdHlwZW9mIHNldHRpbmdzW2pdLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgJChidXR0b24pLmNsaWNrKHNldHRpbmdzW2pdLmNhbGxiYWNrKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNldHRpbmdzW2pdLmNsb3NlKSAkKGJ1dHRvbikuYWRkQXR0cmlidXRlKCdkYXRhLWNsb3NlJywgJ3RydWUnKTtcclxuXHJcbiAgICAgIGJ1dHRvbnMucHVzaChidXR0b24pO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZGFsRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtZm9vdGVyJykuYXBwZW5kKC4uLmJ1dHRvbnMpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbEVsZW1lbnQpO1xyXG4gICAgJCh0aGlzW2ldKS5tb2RhbCh0cnVlKTtcclxuICAgICQodGhpc1tpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykpLmZhZGVJbihBTklNQVRJT05USU1FKTtcclxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICAgIGlmIChkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkgZG9jdW1lbnQuYm9keS5zdHlsZS5tYXJnaW5SaWdodCA9IGAke3Njcm9sbFdpZHRoKCl9cHhgO1xyXG4gIH1cclxufTtcclxuIiwiaW1wb3J0ICQgZnJvbSAnLi4vY29yZSc7XHJcblxyXG5cclxuJC5wcm90b3R5cGUudGFicyA9IGZ1bmN0aW9uKCkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgJCh0aGlzW2ldKS5jbGljaygoKSA9PiB7XHJcbiAgICAgICQodGhpc1tpXSlcclxuICAgICAgICAuYWRkQ2xhc3MoJ3RhYnNfX3RyaWdnZXItLWFjdGl2ZScpXHJcbiAgICAgICAgLnNpYmxpbmdzKClcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYnNfX3RyaWdnZXItLWFjdGl2ZScpXHJcbiAgICAgICAgLmNsb3Nlc3QoJy50YWJzJylcclxuICAgICAgICAuZmluZEFsbCgnLnRhYnNfX2lubmVyJylcclxuICAgICAgICAuYWRkQXR0cmlidXRlKCdzdHlsZScsICcnKVxyXG4gICAgICAgIC5ub2RlTnVtYmVyKCQodGhpc1tpXSkubm9kZUluZGV4KCkgKyAxKVxyXG4gICAgICAgIC5mYWRlSW4oNzAwKTtcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbiQoJ1tkYXRhLXRhYnBhbmVsXSAudGFic19fdHJpZ2dlcicpLnRhYnMoKTtcclxuIiwiaW1wb3J0ICdmb2N1cy12aXNpYmxlJztcclxuaW1wb3J0IGxhenlJbWFnZXMgZnJvbSAnLi9tb2R1bGVzL2xhenlJbWFnZXMnO1xyXG5pbXBvcnQgZG9jdW1lbnRSZWFkeSBmcm9tICcuLi9oZWxwZXJzL2RvY3VtZW50UmVhZHknO1xyXG5cclxuZG9jdW1lbnRSZWFkeSgoKSA9PiB7XHJcbiAgbGF6eUltYWdlcygpO1xyXG59KTtcclxuXHJcblxyXG5jb25zdCAkID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcclxuICByZXR1cm4gbmV3ICQucHJvdG90eXBlLkluaXQoc2VsZWN0b3IpO1xyXG59O1xyXG5cclxuJC5wcm90b3R5cGUuSW5pdCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFzZWxlY3RvcikgcmV0dXJuIHRoaXM7Ly8ge31cclxuXHJcbiAgaWYgKHNlbGVjdG9yLnRhZ05hbWUpIHtcclxuICAgIHRoaXNbMF0gPSBzZWxlY3RvcjtcclxuICAgIHRoaXMubGVuZ3RoID0gMTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgT2JqZWN0LmFzc2lnbih0aGlzLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XHJcbiAgdGhpcy5sZW5ndGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5sZW5ndGg7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4kLnByb3RvdHlwZS5Jbml0LnByb3RvdHlwZSA9ICQucHJvdG90eXBlO1xyXG53aW5kb3cuJCA9ICQ7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgJDtcclxuIiwiaW1wb3J0ICQgZnJvbSAnLi9jb3JlJztcclxuaW1wb3J0ICcuL21vZHVsZXMvZGlzcGxheSc7XHJcbmltcG9ydCAnLi9tb2R1bGVzL2NsYXNzZXMnO1xyXG5pbXBvcnQgJy4vbW9kdWxlcy9oYW5kbGVycyc7XHJcbmltcG9ydCAnLi9tb2R1bGVzL2F0dHJpYnV0ZXMnO1xyXG5pbXBvcnQgJy4vbW9kdWxlcy9hY3Rpb25zJztcclxuaW1wb3J0ICcuL21vZHVsZXMvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCAnLi9jb21wb25lbnRzL21vZGFscyc7XHJcbmltcG9ydCAnLi9jb21wb25lbnRzL2Ryb3Bkb3duTWVudSc7XHJcbmltcG9ydCAnLi9jb21wb25lbnRzL3RhYnMnO1xyXG5pbXBvcnQgJy4vY29tcG9uZW50cy9hY2NvcmRpb24nO1xyXG5pbXBvcnQgJy4vY29tcG9uZW50cy9jYXJvdXNlbCc7XHJcbmltcG9ydCAnLi9zZXJ2aWNlcy9yZXF1ZXN0cyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAkO1xyXG4iLCJpbXBvcnQgJCBmcm9tICcuLi9jb3JlJztcclxuXHJcblxyXG4kLnByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24oY29udGVudCkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGNvbnRlbnQpIHRoaXNbaV0uaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgIGVsc2UgcmV0dXJuIHRoaXNbaV0uaW5uZXJIVE1MO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4kLnByb3RvdHlwZS5ub2RlTnVtYmVyID0gZnVuY3Rpb24obnVtYmVyKSB7XHJcbiAgaWYgKCF0aGlzW251bWJlciAtIDFdKSB0aHJvdyBuZXcgVHlwZUVycm9yKGBFbGVtZW50ICR7bnVtYmVyfSBkb2VzIG5vdCBleGlzdGApO1xyXG5cclxuICBjb25zdCB0ZW1wTm9kZSA9IHRoaXNbbnVtYmVyIC0gMV07XHJcbiAgZm9yIChsZXQgaSBpbiBPYmplY3Qua2V5cyh0aGlzKSkgZGVsZXRlIHRoaXNbaV07XHJcblxyXG4gIHRoaXNbMF0gPSB0ZW1wTm9kZTtcclxuICB0aGlzLmxlbmd0aCA9IDE7XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuJC5wcm90b3R5cGUubm9kZUluZGV4ID0gZnVuY3Rpb24oKSB7XHJcbiAgY29uc3QgcGFyZW50ID0gdGhpc1swXS5wYXJlbnROb2RlO1xyXG4gIGNvbnN0IGFsbENoaWxkcmVuID0gWy4uLnBhcmVudC5jaGlsZHJlbl07XHJcblxyXG4gIGNvbnN0IGZpbmRUaGlzID0gKGl0ZW0pID0+IGl0ZW0gPT09IHRoaXNbMF07XHJcblxyXG4gIHJldHVybiBhbGxDaGlsZHJlbi5maW5kSW5kZXgoZmluZFRoaXMpO1xyXG59O1xyXG5cclxuJC5wcm90b3R5cGUuZmluZEFsbCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XHJcbiAgbGV0IGVsZW1lbnRzQ291bnRlciA9IDA7XHJcbiAgbGV0IGNvdW50ZXIgPSAwO1xyXG5cclxuICBjb25zdCBjb3B5VGhpcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMpO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvcHlUaGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBhcnJheU9mRWxlbWVudHMgPSBjb3B5VGhpc1tpXS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgIGlmIChhcnJheU9mRWxlbWVudHMubGVuZ3RoID09PSAwKSBjb250aW51ZTtcclxuXHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFycmF5T2ZFbGVtZW50cy5sZW5ndGg7IGorKykge1xyXG4gICAgICB0aGlzW2NvdW50ZXJdID0gYXJyYXlPZkVsZW1lbnRzW2pdO1xyXG4gICAgICBjb3VudGVyKys7XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudHNDb3VudGVyICs9IGFycmF5T2ZFbGVtZW50cy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICB0aGlzLmxlbmd0aCA9IGVsZW1lbnRzQ291bnRlcjtcclxuXHJcbiAgY29uc3Qgb2JqTGVuZ3RoID0gT2JqZWN0LmtleXModGhpcykubGVuZ3RoO1xyXG4gIGZvciAoOyBlbGVtZW50c0NvdW50ZXIgPCBvYmpMZW5ndGg7IGVsZW1lbnRzQ291bnRlcisrKSBkZWxldGUgdGhpc1tlbGVtZW50c0NvdW50ZXJdO1xyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbiQucHJvdG90eXBlLmNsb3Nlc3QgPSBmdW5jdGlvbihzZWxlY3Rvcikge1xyXG4gIGxldCBjb3VudGVyID0gMDtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBjdXJyZW50VGhpcyA9IHRoaXNbaV07XHJcbiAgICB0aGlzW2ldID0gdGhpc1tpXS5jbG9zZXN0KHNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAoIXRoaXNbaV0pIHRoaXNbaV0gPSBjdXJyZW50VGhpcztcclxuICAgIGNvdW50ZXIrKztcclxuICB9XHJcblxyXG4gIGNvbnN0IG9iakxlbmd0aCA9IE9iamVjdC5rZXlzKHRoaXMpLmxlbmd0aDtcclxuICBmb3IgKDsgY291bnRlciA8IG9iakxlbmd0aDsgY291bnRlcisrKSBkZWxldGUgdGhpc1tjb3VudGVyXTtcclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4kLnByb3RvdHlwZS5zaWJsaW5ncyA9IGZ1bmN0aW9uKCkge1xyXG4gIGxldCBjb3VudGVyQ2hpbGRyZW4gPSAwO1xyXG4gIGxldCBjb3VudGVyU2libGluZ3MgPSAwO1xyXG5cclxuICBjb25zdCBjb3B5VGhpcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMpO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvcHlUaGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCB0aGlzUGFyZW50Q2hpbGRyZW4gPSBjb3B5VGhpc1tpXS5wYXJlbnROb2RlLmNoaWxkcmVuO1xyXG5cclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpc1BhcmVudENoaWxkcmVuLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGlmIChjb3B5VGhpc1tpXSA9PT0gdGhpc1BhcmVudENoaWxkcmVuW2pdKSBjb250aW51ZTtcclxuXHJcbiAgICAgIHRoaXNbY291bnRlckNoaWxkcmVuXSA9IHRoaXNQYXJlbnRDaGlsZHJlbltqXTtcclxuICAgICAgY291bnRlckNoaWxkcmVuKys7XHJcbiAgICB9XHJcblxyXG4gICAgY291bnRlclNpYmxpbmdzICs9IHRoaXNQYXJlbnRDaGlsZHJlbi5sZW5ndGggLSAxO1xyXG4gIH1cclxuXHJcbiAgdGhpcy5sZW5ndGggPSBjb3VudGVyU2libGluZ3M7XHJcblxyXG4gIGNvbnN0IG9iakxlbmd0aCA9IE9iamVjdC5rZXlzKHRoaXMpLmxlbmd0aDtcclxuICBmb3IgKDsgY291bnRlclNpYmxpbmdzIDwgb2JqTGVuZ3RoOyBjb3VudGVyU2libGluZ3MrKykgZGVsZXRlIHRoaXNbY291bnRlclNpYmxpbmdzXTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuIiwiaW1wb3J0ICQgZnJvbSAnLi4vY29yZSc7XHJcbmltcG9ydCB7ZmFkZUluQW5pbWF0aW9uSW5uZXIsIGZhZGVPdXRBbmltYXRpb25Jbm5lcn0gZnJvbSAnLi4vLi4vaGVscGVycy9BbmltYXRpb25Jbm5lcnMnO1xyXG5cclxuXHJcbiQucHJvdG90eXBlLmFuaW1hdGVPdmVyVGltZSA9IGZ1bmN0aW9uKGR1cmF0aW9uLCBjYWxsYmFjaywgZmluKSB7XHJcbiAgbGV0IHRpbWVTdGFydDtcclxuXHJcbiAgZnVuY3Rpb24gX2FuaW1hdGVPdmVyVGltZSh0aW1lKSB7XHJcbiAgICBpZiAoIXRpbWVTdGFydCkgdGltZVN0YXJ0ID0gdGltZTtcclxuXHJcbiAgICBsZXQgdGltZUVsYXBzZWQgPSB0aW1lIC0gdGltZVN0YXJ0O1xyXG4gICAgbGV0IGNvbXBsZWN0aW9uID0gTWF0aC5taW4odGltZUVsYXBzZWQgLyBkdXJhdGlvbiwgMSk7Ly8gZm9yIHN0eWxlLm9wYWNpdHkobWF4IHZhbHVlID0gMSlcclxuXHJcbiAgICBjYWxsYmFjayhjb21wbGVjdGlvbik7XHJcblxyXG4gICAgaWYgKHRpbWVFbGFwc2VkIDwgZHVyYXRpb24pIHJlcXVlc3RBbmltYXRpb25GcmFtZShfYW5pbWF0ZU92ZXJUaW1lKTtcclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAodHlwZW9mIGZpbiA9PT0gJ2Z1bmN0aW9uJykgZmluKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChpID09PSAwKSBjb250aW51ZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBfYW5pbWF0ZU92ZXJUaW1lO1xyXG59O1xyXG5cclxuJC5wcm90b3R5cGUuZmFkZUluID0gZnVuY3Rpb24oZHVyYXRpb24sIGRpc3BsYXksIGZpbikge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgZmFkZUluQW5pbWF0aW9uSW5uZXIodGhpcywgdGhpc1tpXSxcclxuICAgICAge1xyXG4gICAgICAgIGR1cmF0aW9uLFxyXG4gICAgICAgIGRpc3BsYXksXHJcbiAgICAgICAgZmluXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4kLnByb3RvdHlwZS5mYWRlT3V0ID0gZnVuY3Rpb24oZHVyYXRpb24sIGZpbikge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgZmFkZU91dEFuaW1hdGlvbklubmVyKHRoaXMsIHRoaXNbaV0sXHJcbiAgICAgIHtcclxuICAgICAgICBkdXJhdGlvbixcclxuICAgICAgICBmaW5cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbiQucHJvdG90eXBlLmZhZGVUb2dnbGUgPSBmdW5jdGlvbihkdXJhdGlvbiwgZGlzcGxheSwgZmluKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpc1tpXSkuZGlzcGxheSA9PT0gJ25vbmUnKSB7XHJcbiAgICAgIGZhZGVJbkFuaW1hdGlvbklubmVyKHRoaXMsIHRoaXNbaV0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZHVyYXRpb24sXHJcbiAgICAgICAgICBkaXNwbGF5LFxyXG4gICAgICAgICAgZmluXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmYWRlT3V0QW5pbWF0aW9uSW5uZXIodGhpcywgdGhpc1tpXSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBkdXJhdGlvbixcclxuICAgICAgICAgIGZpblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbiIsImltcG9ydCAkIGZyb20gJy4uL2NvcmUnO1xyXG5cclxuXHJcbiQucHJvdG90eXBlLmFkZEF0dHJpYnV0ZSA9IGZ1bmN0aW9uKGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlID0gJycpIHtcclxuICBpZiAoIWF0dHJpYnV0ZU5hbWUpIHJldHVybiB0aGlzO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuICAgIHRoaXNbaV0uc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuJC5wcm90b3R5cGUucmVtb3ZlQXR0cmlidXRlID0gZnVuY3Rpb24oYXR0cmlidXRlTmFtZSkge1xyXG4gIGlmICghYXR0cmlidXRlTmFtZSkgcmV0dXJuIHRoaXM7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgdGhpc1tpXS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbiQucHJvdG90eXBlLnRvZ2dsZUF0dHJpYnV0ZSA9IGZ1bmN0aW9uKGF0dHJpYnV0ZU5hbWUpIHtcclxuICBpZiAoIWF0dHJpYnV0ZU5hbWUpIHJldHVybiB0aGlzO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuICAgIHRoaXNbaV0udG9nZ2xlQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4kLnByb3RvdHlwZS5hdHRyaWJ1dGUgPSBmdW5jdGlvbihhdHRyaWJ1dGVOYW1lKSB7XHJcbiAgaWYgKCFhdHRyaWJ1dGVOYW1lKSByZXR1cm4gdGhpcztcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoIXRoaXNbaV0uZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpKSByZXR1cm4gdGhpcztcclxuXHJcbiAgICByZXR1cm4gdGhpc1tpXS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcbiAgfVxyXG59O1xyXG4iLCJpbXBvcnQgJCBmcm9tICcuLi9jb3JlJztcclxuXHJcblxyXG4kLnByb3RvdHlwZS5hZGRDbGFzcyA9IGZ1bmN0aW9uKC4uLmNsYXNzTmFtZXMpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmICh0aGlzW2ldLmNsYXNzTGlzdCkgdGhpc1tpXS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzTmFtZXMpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4kLnByb3RvdHlwZS5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKC4uLmNsYXNzTmFtZXMpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmICh0aGlzW2ldLmNsYXNzTGlzdCkgdGhpc1tpXS5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzTmFtZXMpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4kLnByb3RvdHlwZS50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKHRoaXNbaV0uY2xhc3NMaXN0KSB0aGlzW2ldLmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG4iLCJpbXBvcnQgJCBmcm9tICcuLi9jb3JlJztcclxuXHJcblxyXG4kLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoIXRoaXNbaV0uc3R5bGUpIGNvbnRpbnVlO1xyXG5cclxuICAgIHRoaXNbaV0uc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4kLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoIXRoaXNbaV0uc3R5bGUpIGNvbnRpbnVlO1xyXG5cclxuICAgIHRoaXNbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuJC5wcm90b3R5cGUudG9nZ2xlRGlzcGxheSA9IGZ1bmN0aW9uKCkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKCF0aGlzW2ldLnN0eWxlKSBjb250aW51ZTtcclxuXHJcbiAgICB0aGlzW2ldLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJyA/IHRoaXNbaV0uc3R5bGUuZGlzcGxheSA9ICcnIDogdGhpc1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbiIsImltcG9ydCAkIGZyb20gJy4uL2NvcmUnO1xyXG5cclxuXHJcbiQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xyXG4gIGlmICghZXZlbnROYW1lIHx8ICFjYWxsYmFjaykgcmV0dXJuIHRoaXM7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgdGhpc1tpXS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4kLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgaWYgKCFldmVudE5hbWUgfHwgIWNhbGxiYWNrKSByZXR1cm4gdGhpcztcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB0aGlzW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjayk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbiQucHJvdG90eXBlLmNsaWNrID0gZnVuY3Rpb24oaGFuZGxlcikge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgaGFuZGxlciA/XHJcbiAgICAgIHRoaXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyKSA6XHJcbiAgICAgIHRoaXNbaV0uY2xpY2soKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG4iLCJpbXBvcnQgTGF6eUxvYWQgZnJvbSAndmFuaWxsYS1sYXp5bG9hZCc7XG5pbXBvcnQgY2FuVXNlV2VicCBmcm9tICcuLi8uLi9oZWxwZXJzL2NhblVzZVdlYnAnO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIGlmIChjYW5Vc2VXZWJwKCkgPT09IGZhbHNlKSB7XG4gICAgY29uc3QgbGF6eUJnSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGF6eVtkYXRhLWJnLWZhbGxiYWNrXScpO1xuXG4gICAgbGF6eUJnSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3Qgc3JjQmdGYWxsYmFjayA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWJnLWZhbGxiYWNrJyk7XG4gICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1iZycsIHNyY0JnRmFsbGJhY2spO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIGNvbnN0IGxhenlMb2FkSW5zdGFuY2UgPSBuZXcgTGF6eUxvYWQoe1xuICAgIGVsZW1lbnRzX3NlbGVjdG9yOiAnLmxhenknXG4gIH0pO1xufTtcbiIsImltcG9ydCAkIGZyb20gJy4uL2NvcmUnO1xyXG5cclxuXHJcbiQucHJvdG90eXBlLmdldCA9IGFzeW5jIGZ1bmN0aW9uKHVybCwgZGF0YVR5cGVBbnN3ZXIgPSAnanNvbicpIHtcclxuICBsZXQgcmVzID0gYXdhaXQgZmV0Y2godXJsKTtcclxuXHJcbiAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZldGNoICR7dXJsfSwgc3RhdHVzOiAke3Jlcy5zdGF0dXN9YCk7XHJcblxyXG4gIHN3aXRjaCAoZGF0YVR5cGVBbnN3ZXIpIHtcclxuICAgIGNhc2UgJ2pzb24nOiByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcclxuICAgIGNhc2UgJ3RleHQnOiByZXR1cm4gYXdhaXQgcmVzLnRleHQoKTtcclxuICAgIGNhc2UgJ2Jsb2InOiByZXR1cm4gYXdhaXQgcmVzLmJsb2IoKTtcclxuICB9XHJcbn07XHJcblxyXG5cclxuJC5wcm90b3R5cGUucG9zdCA9IGFzeW5jIGZ1bmN0aW9uKHVybCwgZGF0YSwgZGF0YVR5cGVBbnN3ZXIgPSAnanNvbicpIHtcclxuICBsZXQgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcbiAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIGJvZHk6IGRhdGFcclxuICB9KTtcclxuXHJcbiAgc3dpdGNoIChkYXRhVHlwZUFuc3dlcikge1xyXG4gICAgY2FzZSAnanNvbic6IHJldHVybiBhd2FpdCByZXMuanNvbigpO1xyXG4gICAgY2FzZSAndGV4dCc6IHJldHVybiBhd2FpdCByZXMudGV4dCgpO1xyXG4gICAgY2FzZSAnYmxvYic6IHJldHVybiBhd2FpdCByZXMuYmxvYigpO1xyXG4gIH1cclxufTtcclxuIiwiaW1wb3J0ICcuL2xpYi9saWInO1xuXG5cbiQoJyNtb2RhbFRyaWdnZXInKS5jbGljaygoKSA9PiAkKCcjbW9kYWxUcmlnZ2VyJykuY3JlYXRlTW9kYWwoXG4gIHtcbiAgICBpbm5lcjoge1xuICAgICAgdGl0bGU6ICdGaXJzdCBNb2RhbCcsXG4gICAgICBib2R5OiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXBzYW0gbGFib3JlIGltcGVkaXQgbm9iaXMgdm9sdXB0YXRlbSBlYSB2ZXJpdGF0aXMgbnVtcXVhbSBhdCBtb2xlc3RpYWUgZXggcmVtIGRvbG9yIHF1YW0gcGVyc3BpY2lhdGlzIHF1aWRlbSBhc3N1bWVuZGEsIHZlcm8gcHJvdmlkZW50IHF1YXNpIHF1aXMgdm9sdXB0YXR1bSBtYWduaS4gSGFydW0gYSdcbiAgICB9LFxuICAgIGJ0bnM6IHtcbiAgICAgIGNvdW50OiAzLFxuICAgICAgc2V0dGluZ3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzZXM6IFsnYnRuLWRhbmdlcicsICdtci0xMCddLFxuICAgICAgICAgIGNvbnRlbnQ6ICdjbG9zZScsXG4gICAgICAgICAgY2xvc2U6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzZXM6IFsnYnRuLXN1Y2Nlc3MnLCAnbXItMTAnXSxcbiAgICAgICAgICBjb250ZW50OiAnc2F2ZScsXG4gICAgICAgICAgY2FsbGJhY2s6ICgpID0+IGFsZXJ0KCdTYXZlZCcpXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjbGFzc2VzOiBbJ2J0bi13YXJuaW5nJ10sXG4gICAgICAgICAgY29udGVudDogJ3dhcm5pbmcnLFxuICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICBhbGVydCgnd2FybmluZycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3dhcm5pbmcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbikpO1xuXG5cbiQoJyNtb2RhbFRyaWdnZXIyJykuY2xpY2soKCkgPT4gJCgnI21vZGFsVHJpZ2dlcjInKS5jcmVhdGVNb2RhbChcbiAge1xuICAgIGlubmVyOiB7XG4gICAgICB0aXRsZTogJ1NlY29uZCBNb2RhbCcsXG4gICAgICBib2R5OiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSXBzYW0gbGFib3JlIGltcGVkaXQgbm9iaXMgdm9sdXB0YXRlbSBlYSB2ZXJpdGF0aXMgbnVtcXVhbSBhdCBtb2xlc3RpYWUgZXggcmVtIGRvbG9yIHF1YW0gcGVyc3BpY2lhdGlzIHF1aWRlbSBhc3N1bWVuZGEsIHZlcm8gcHJvdmlkZW50IHF1YXNpIHF1aXMgdm9sdXB0YXR1bSBtYWduaS4gSGFydW0gcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIElwc2FtIGxhYm9yZSBpbXBlZGl0IG5vYmlzIHZvbHVwdGF0ZW0gZWEgdmVyaXRhdGlzIG51bXF1YW0gYXQgbW9sZXN0aWFlIGV4IHJlbSBkb2xvciBxdWFtIHBlcnNwaWNpYXRpcyBxdWlkZW0gYXNzdW1lbmRhLCB2ZXJvIHByb3ZpZGVudCBxdWFzaSBxdWlzIHZvbHVwdGF0dW0gbWFnbmkuIEhhcnVtIGFhJ1xuICAgIH0sXG4gICAgYnRuczoge1xuICAgICAgY291bnQ6IDIsXG4gICAgICBzZXR0aW5nczogW1xuICAgICAgICB7XG4gICAgICAgICAgY2xhc3NlczogWydidG4tZGFuZ2VyJywgJ21yLTEwJ10sXG4gICAgICAgICAgY29udGVudDogJ2Nsb3NlJyxcbiAgICAgICAgICBjbG9zZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgY2xhc3NlczogWydidG4tZGFyaycsICdtci0xMCddLFxuICAgICAgICAgIGNvbnRlbnQ6ICdkYXJrLW1vZGUnLFxuICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAkKCcuYnRuLWRhcmsnKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICQoJy5tb2RhbC1jb250ZW50JykuYWRkQ2xhc3MoJ21vZGFsLWRhcmsnKTtcbiAgICAgICAgICAgICAgJCgnLm1vZGFsLWhlYWRlcicpLmFkZENsYXNzKCdjb2xvci13aGl0ZScpO1xuICAgICAgICAgICAgICAkKCcubW9kYWwtYm9keScpLmFkZENsYXNzKCdjb2xvci13aGl0ZScpO1xuICAgICAgICAgICAgICAkKCcubW9kYWwtY29udGVudCAuY2xvc2UnKS5hZGRDbGFzcygnY29sb3Itd2hpdGUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxuKSk7XG5cbiQoJy5hY2NvcmRpb25fX3RyaWdnZXInKS5hY2NvcmRpb24oJ2FjY29yZGlvbl9fdHJpZ2dlci0tYWN0aXZlJywgJ2FjY29yZGlvbl9fY29udGVudC0tYWN0aXZlJyk7XG5cbiQoKS5nZXQoJ2h0dHBzOi8vcmVxcmVzLmluL2FwaS9wcm9kdWN0cy8zJylcbiAgLnRoZW4ocmVzID0+IGNvbnNvbGUubG9nKHJlcykpO1xuIl0sInByZUV4aXN0aW5nQ29tbWVudCI6Ii8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlpY205M2MyVnlMWEJoWTJzdlgzQnlaV3gxWkdVdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlFHSmhZbVZzTDNKMWJuUnBiV1V2YUdWc2NHVnljeTloY25KaGVVeHBhMlZVYjBGeWNtRjVMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMEJpWVdKbGJDOXlkVzUwYVcxbEwyaGxiSEJsY25NdllYSnlZWGxYYVhSb2IzVjBTRzlzWlhNdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlFHSmhZbVZzTDNKMWJuUnBiV1V2YUdWc2NHVnljeTloYzNsdVkxUnZSMlZ1WlhKaGRHOXlMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMEJpWVdKbGJDOXlkVzUwYVcxbEwyaGxiSEJsY25NdmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMEJpWVdKbGJDOXlkVzUwYVcxbEwyaGxiSEJsY25NdmFYUmxjbUZpYkdWVWIwRnljbUY1TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDBCaVlXSmxiQzl5ZFc1MGFXMWxMMmhsYkhCbGNuTXZibTl1U1hSbGNtRmliR1ZUY0hKbFlXUXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZRR0poWW1Wc0wzSjFiblJwYldVdmFHVnNjR1Z5Y3k5MGIwTnZibk4xYldGaWJHVkJjbkpoZVM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5QVltRmlaV3d2Y25WdWRHbHRaUzlvWld4d1pYSnpMM1Z1YzNWd2NHOXlkR1ZrU1hSbGNtRmliR1ZVYjBGeWNtRjVMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMEJpWVdKbGJDOXlkVzUwYVcxbEwzSmxaMlZ1WlhKaGRHOXlMMmx1WkdWNExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyWnZZM1Z6TFhacGMybGliR1V2WkdsemRDOW1iMk4xY3kxMmFYTnBZbXhsTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDNKbFoyVnVaWEpoZEc5eUxYSjFiblJwYldVdmNuVnVkR2x0WlM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5MllXNXBiR3hoTFd4aGVubHNiMkZrTDJScGMzUXZiR0Y2ZVd4dllXUXViV2x1TG1weklpd2ljM0pqTDJwekwyaGxiSEJsY25NdlFXNXBiV0YwYVc5dVNXNXVaWEp6TG1weklpd2ljM0pqTDJwekwyaGxiSEJsY25NdlkyRnVWWE5sVjJWaWNDNXFjeUlzSW5OeVl5OXFjeTlvWld4d1pYSnpMMlJ2WTNWdFpXNTBVbVZoWkhrdWFuTWlMQ0p6Y21NdmFuTXZhR1ZzY0dWeWN5OXpZM0p2Ykd4WGFXUjBhQzVxY3lJc0luTnlZeTlxY3k5b1pXeHdaWEp6TDNOc2FXUmxTVzUwWlhKaFkzUnBkbVV1YW5NaUxDSnpjbU12YW5NdmJHbGlMMk52YlhCdmJtVnVkSE12WVdOamIzSmthVzl1TG1weklpd2ljM0pqTDJwekwyeHBZaTlqYjIxd2IyNWxiblJ6TDJOaGNtOTFjMlZzTG1weklpd2ljM0pqTDJwekwyeHBZaTlqYjIxd2IyNWxiblJ6TDJSeWIzQmtiM2R1VFdWdWRTNXFjeUlzSW5OeVl5OXFjeTlzYVdJdlkyOXRjRzl1Wlc1MGN5OXRiMlJoYkhNdWFuTWlMQ0p6Y21NdmFuTXZiR2xpTDJOdmJYQnZibVZ1ZEhNdmRHRmljeTVxY3lJc0luTnlZeTlxY3k5c2FXSXZZMjl5WlM1cWN5SXNJbk55WXk5cWN5OXNhV0l2YkdsaUxtcHpJaXdpYzNKakwycHpMMnhwWWk5dGIyUjFiR1Z6TDJGamRHbHZibk11YW5NaUxDSnpjbU12YW5NdmJHbGlMMjF2WkhWc1pYTXZZVzVwYldGMGFXOXVjeTVxY3lJc0luTnlZeTlxY3k5c2FXSXZiVzlrZFd4bGN5OWhkSFJ5YVdKMWRHVnpMbXB6SWl3aWMzSmpMMnB6TDJ4cFlpOXRiMlIxYkdWekwyTnNZWE56WlhNdWFuTWlMQ0p6Y21NdmFuTXZiR2xpTDIxdlpIVnNaWE12WkdsemNHeGhlUzVxY3lJc0luTnlZeTlxY3k5c2FXSXZiVzlrZFd4bGN5OW9ZVzVrYkdWeWN5NXFjeUlzSW5OeVl5OXFjeTlzYVdJdmJXOWtkV3hsY3k5c1lYcDVTVzFoWjJWekxtcHpJaXdpYzNKakwycHpMMnhwWWk5elpYSjJhV05sY3k5eVpYRjFaWE4wY3k1cWN5SXNJbk55WXk5cWN5OXRZV2x1TG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVRkJPMEZEUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOV1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOT1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU53UTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEVGtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5LUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMHBCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTFwQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5ZUVR0QlFVTkJPenRCUTBSQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTNoVVFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMngyUWtFN1FVRkRRVHM3T3pzN096czdPMEZEUkU4c1NVRkJUU3h2UWtGQmIwSXNSMEZCUnl4VFFVRjJRaXh2UWtGQmRVSXNRMEZCVXl4SFFVRlVMRVZCUVdNc1NVRkJaQ3hSUVVFNFF6dEJRVUZCTEUxQlFYcENMRkZCUVhsQ0xGRkJRWHBDTEZGQlFYbENPMEZCUVVFc1RVRkJaaXhQUVVGbExGRkJRV1lzVDBGQlpUdEJRVUZCTEUxQlFVNHNSMEZCVFN4UlFVRk9MRWRCUVUwN1FVRkRhRVlzUlVGQlFTeEpRVUZKTEVOQlFVTXNTMEZCVEN4RFFVRlhMRTlCUVZnc1IwRkJjVUlzVDBGQlR5eEpRVUZKTEU5QlFXaERPenRCUVVWQkxFMUJRVTBzVDBGQlR5eEhRVUZITEZOQlFWWXNUMEZCVlN4RFFVRkRMRmRCUVVRc1JVRkJhVUk3UVVGREwwSXNTVUZCUVN4SlFVRkpMRU5CUVVNc1MwRkJUQ3hEUVVGWExFOUJRVmdzUjBGQmNVSXNWMEZCY2tJN1FVRkRSQ3hIUVVaRU96dEJRVWxCTEUxQlFVMHNSMEZCUnl4SFFVRkhMRWRCUVVjc1EwRkJReXhsUVVGS0xFTkJRVzlDTEZGQlFYQkNMRVZCUVRoQ0xFOUJRVGxDTEVWQlFYVkRMRWRCUVhaRExFTkJRVm83UVVGRFFTeEZRVUZCTEhGQ1FVRnhRaXhEUVVGRExFZEJRVVFzUTBGQmNrSTdRVUZEUkN4RFFWUk5PenM3TzBGQldVRXNTVUZCVFN4eFFrRkJjVUlzUjBGQlJ5eFRRVUY0UWl4eFFrRkJkMElzUTBGQlV5eEhRVUZVTEVWQlFXTXNTVUZCWkN4VFFVRnhRenRCUVVGQkxFMUJRV2hDTEZGQlFXZENMRk5CUVdoQ0xGRkJRV2RDTzBGQlFVRXNUVUZCVGl4SFFVRk5MRk5CUVU0c1IwRkJUVHM3UVVGRGVFVXNUVUZCVFN4UlFVRlJMRWRCUVVjc1UwRkJXQ3hSUVVGWExFTkJRVU1zVjBGQlJDeEZRVUZwUWp0QlFVTm9ReXhKUVVGQkxFbEJRVWtzUTBGQlF5eExRVUZNTEVOQlFWY3NUMEZCV0N4SFFVRnhRaXhKUVVGSkxGZEJRWHBDTzBGQlJVRXNVVUZCU1N4WFFVRlhMRXRCUVVzc1EwRkJjRUlzUlVGQmRVSXNTVUZCU1N4RFFVRkRMRXRCUVV3c1EwRkJWeXhQUVVGWUxFZEJRWEZDTEUxQlFYSkNPMEZCUTNoQ0xFZEJTa1E3TzBGQlRVRXNUVUZCVFN4SFFVRkhMRWRCUVVjc1IwRkJSeXhEUVVGRExHVkJRVW9zUTBGQmIwSXNVVUZCY0VJc1JVRkJPRUlzVVVGQk9VSXNSVUZCZDBNc1IwRkJlRU1zUTBGQldqdEJRVU5CTEVWQlFVRXNjVUpCUVhGQ0xFTkJRVU1zUjBGQlJDeERRVUZ5UWp0QlFVVkJMRVZCUVVFc1NVRkJTU3hEUVVGRExGTkJRVXdzUTBGQlpTeE5RVUZtTEVOQlFYTkNMRk5CUVhSQ0xFVkJRV2xETEZOQlFXcERPMEZCUTBRc1EwRllUVHM3T3pzN096czdPenM3TzJWRFdsRXNiMEpCUVUwN1FVRkRia0lzVFVGQlRTeEpRVUZKTEVkQlFVY3NVVUZCVVN4RFFVRkRMR0ZCUVZRc1EwRkJkVUlzVVVGQmRrSXNRMEZCWWpzN1FVRkRRU3hOUVVGSkxFbEJRVWtzUTBGQlF5eFZRVUZNTEVsQlFXMUNMRWxCUVVrc1EwRkJReXhWUVVGTUxFTkJRV2RDTEVsQlFXaENMRU5CUVhaQ0xFVkJRVGhETzBGQlF6VkRMRmRCUVU4c1NVRkJTU3hEUVVGRExGTkJRVXdzUTBGQlpTeFpRVUZtTEVWQlFUWkNMRTlCUVRkQ0xFTkJRWEZETEdsQ1FVRnlReXhOUVVFMFJDeERRVUZ1UlR0QlFVTkVPenRCUVVWRUxGTkJRVThzUzBGQlVEdEJRVU5FTEVNN096czdPenM3T3pzN096dGxRMUJqTEd0Q1FVRkRMRVZCUVVRc1JVRkJVVHRCUVVOeVFpeE5RVUZKTEZGQlFWRXNRMEZCUXl4VlFVRlVMRXRCUVhkQ0xGTkJRVFZDTEVWQlFYVkRPMEZCUTNKRExFbEJRVUVzVVVGQlVTeERRVUZETEdkQ1FVRlVMRU5CUVRCQ0xHdENRVUV4UWl4RlFVRTRReXhGUVVFNVF6dEJRVU5FTEVkQlJrUXNUVUZGVHp0QlFVTk1MRWxCUVVFc1JVRkJSVHRCUVVOSU8wRkJRMFlzUXpzN096czdPenM3T3pzN08yVkRUbU1zYjBKQlFVMDdRVUZEYmtJc1RVRkJTU3hIUVVGSExFZEJRVWNzVVVGQlVTeERRVUZETEdGQlFWUXNRMEZCZFVJc1MwRkJka0lzUTBGQlZqdEJRVU5CTEVWQlFVRXNSMEZCUnl4RFFVRkRMRXRCUVVvc1EwRkJWU3hMUVVGV0xFZEJRV3RDTEUxQlFXeENPMEZCUTBFc1JVRkJRU3hIUVVGSExFTkJRVU1zUzBGQlNpeERRVUZWTEUxQlFWWXNSMEZCYlVJc1RVRkJia0k3UVVGRFFTeEZRVUZCTEVkQlFVY3NRMEZCUXl4TFFVRktMRU5CUVZVc1UwRkJWaXhIUVVGelFpeFJRVUYwUWp0QlFVVkJMRVZCUVVFc1VVRkJVU3hEUVVGRExFbEJRVlFzUTBGQll5eE5RVUZrTEVOQlFYRkNMRWRCUVhKQ08wRkJRMEVzVFVGQlRTeFJRVUZSTEVkQlFVY3NSMEZCUnl4RFFVRkRMRmRCUVVvc1IwRkJhMElzUjBGQlJ5eERRVUZETEZkQlFYWkRPMEZCUTBFc1JVRkJRU3hIUVVGSExFTkJRVU1zVFVGQlNqdEJRVVZCTEZOQlFVOHNVVUZCVUR0QlFVTkVMRU03T3pzN096czdPenM3T3p0bFExaGpMR3RDUVVGRExGZEJRVVFzUlVGQll5eE5RVUZrTEVWQlFYTkNMRWxCUVhSQ0xFVkJRVFJDTEZWQlFUVkNMRVZCUVRKRE8wRkJRM2hFTEVWQlFVRXNWMEZCVnl4RFFVRkRMRXRCUVZvc1EwRkJhMElzVTBGQmJFSXNlVUpCUVRaRExFMUJRVGRETzBGQlEwRXNSVUZCUVN4SlFVRkpMRU5CUVVNc1QwRkJUQ3hEUVVGaExGVkJRVU1zUjBGQlJEdEJRVUZCTEZkQlFWTXNSMEZCUnl4RFFVRkRMRk5CUVVvc1EwRkJZeXhOUVVGa0xFTkJRWEZDTEZGQlFYSkNMRU5CUVZRN1FVRkJRU3hIUVVGaU8wRkJRMEVzUlVGQlFTeEpRVUZKTEVOQlFVTXNWVUZCUkN4RFFVRktMRU5CUVdsQ0xGTkJRV3BDTEVOQlFUSkNMRWRCUVROQ0xFTkJRU3RDTEZGQlFTOUNPMEZCUTBRc1F6czdPenM3T3pzN08wRkRTa1E3TzBGQlIwRXNZMEZCUlN4VFFVRkdMRU5CUVZrc1UwRkJXaXhIUVVGM1FpeFZRVUZUTEdGQlFWUXNSVUZCZDBJc1lVRkJlRUlzUlVGQmRVTTdRVUZCUVRzN1FVRkJRU3cyUWtGRGNFUXNRMEZFYjBRN1FVRkZNMFFzZFVKQlFVVXNTMEZCU1N4RFFVRkRMRU5CUVVRc1EwRkJUaXhGUVVGWExFdEJRVmdzUTBGQmFVSXNXVUZCVFR0QlFVTnlRaXg1UWtGQlJTeExRVUZKTEVOQlFVTXNRMEZCUkN4RFFVRk9MRVZCUVZjc1YwRkJXQ3hEUVVGMVFpeGhRVUYyUWp0QlFVTkJMSGxDUVVGRkxFdEJRVWtzUTBGQlF5eERRVUZFTEVOQlFVb3NRMEZCVVN4clFrRkJWaXhGUVVFNFFpeFhRVUU1UWl4RFFVRXdReXhoUVVFeFF6czdRVUZGUVN4VlFVRkpMRXRCUVVrc1EwRkJReXhEUVVGRUxFTkJRVW9zUTBGQlVTeFRRVUZTTEVOQlFXdENMRkZCUVd4Q0xFTkJRVEpDTEdGQlFUTkNMRU5CUVVvc1JVRkJLME03UVVGRE4wTXNVVUZCUVN4TFFVRkpMRU5CUVVNc1EwRkJSQ3hEUVVGS0xFTkJRVkVzYTBKQlFWSXNRMEZCTWtJc1MwRkJNMElzUTBGQmFVTXNVMEZCYWtNc1IwRkJOa01zUzBGQlNTeERRVUZETEVOQlFVUXNRMEZCU2l4RFFVRlJMR3RDUVVGU0xFTkJRVEpDTEZsQlFUTkNMRWRCUVRCRExFVkJRVEZETEVkQlFTdERMRWxCUVRWR08wRkJRMFFzVDBGR1JDeE5RVVZQTzBGQlEwd3NVVUZCUVN4TFFVRkpMRU5CUVVNc1EwRkJSQ3hEUVVGS0xFTkJRVkVzYTBKQlFWSXNRMEZCTWtJc1MwRkJNMElzUTBGQmFVTXNVMEZCYWtNc1IwRkJOa01zUTBGQk4wTTdRVUZEUkR0QlFVTkdMRXRCVkVRN1FVRkdNa1E3TzBGQlF6ZEVMRTlCUVVzc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQllpeEZRVUZuUWl4RFFVRkRMRWRCUVVjc1MwRkJTeXhOUVVGNlFpeEZRVUZwUXl4RFFVRkRMRVZCUVd4RExFVkJRWE5ETzBGQlFVRXNWVUZCTjBJc1EwRkJOa0k3UVVGWGNrTTdRVUZEUml4RFFXSkVPenM3T3pzN08wRkRTRUU3TzBGQlEwRTdPMEZCUjBFc1kwRkJSU3hUUVVGR0xFTkJRVmtzVVVGQldpeEhRVUYxUWl4WlFVRlhPMEZCUVVFN08wRkJRVUVzTmtKQlEzWkNMRU5CUkhWQ08wRkJSVGxDTEZGQlFVMHNTMEZCU3l4SFFVRkhMRTFCUVUwc1EwRkJReXhuUWtGQlVDeERRVUYzUWl4TFFVRkpMRU5CUVVNc1EwRkJSQ3hEUVVGS0xFTkJRVkVzWVVGQlVpeERRVUZ6UWl4cFFrRkJkRUlzUTBGQmVFSXNSVUZCYTBVc1MwRkJhRVk3TzBGQlEwRXNVVUZCVFN4TlFVRk5MRWRCUVVjc1MwRkJTU3hEUVVGRExFTkJRVVFzUTBGQlNpeERRVUZSTEdkQ1FVRlNMRU5CUVhsQ0xHZENRVUY2UWl4RFFVRm1PenRCUVVOQkxGRkJRVTBzVjBGQlZ5eEhRVUZITEV0QlFVa3NRMEZCUXl4RFFVRkVMRU5CUVVvc1EwRkJVU3hoUVVGU0xFTkJRWE5DTEd0Q1FVRjBRaXhEUVVGd1FqczdRVUZEUVN4UlFVRk5MRWxCUVVrc1IwRkJSeXhMUVVGSkxFTkJRVU1zUTBGQlJDeERRVUZLTEVOQlFWRXNaMEpCUVZJc1EwRkJlVUlzZVVKQlFYcENMRU5CUVdJN08wRkJSVUVzU1VGQlFTeFhRVUZYTEVOQlFVTXNTMEZCV2l4RFFVRnJRaXhMUVVGc1FpeEhRVUV3UWl4TlFVRk5MRTFCUVUwc1EwRkJReXhOUVVGaUxFZEJRWE5DTEVkQlFXaEVPMEZCUlVFc1NVRkJRU3hOUVVGTkxFTkJRVU1zVDBGQlVDeERRVUZsTEZWQlFVTXNTMEZCUkR0QlFVRkJMR0ZCUVZjc1MwRkJTeXhEUVVGRExFdEJRVTRzUTBGQldTeExRVUZhTEVkQlFXOUNMRXRCUVM5Q08wRkJRVUVzUzBGQlpqdEJRVVZCTEZGQlFVa3NUVUZCVFN4SFFVRkhMRU5CUVdJN1FVRkRRU3hSUVVGSkxGVkJRVlVzUjBGQlJ5eERRVUZxUWl4RFFWbzRRaXhEUVdNNVFqczdRVUZEUVN4MVFrRkJSU3hMUVVGSkxFTkJRVU1zUTBGQlJDeERRVUZLTEVOQlFWRXNZVUZCVWl4RFFVRnpRaXh4UWtGQmRFSXNRMEZCUml4RlFVRm5SQ3hMUVVGb1JDeERRVUZ6UkN4VlFVRkRMRU5CUVVRc1JVRkJUenRCUVVNelJDeE5RVUZCTEVOQlFVTXNRMEZCUXl4alFVRkdPMEZCUlVFc1RVRkJRU3hOUVVGTkxFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVGl4RFFVRmpMRXRCUVdRc1JVRkJjVUlzUlVGQmNrSXNRMEZCUkN4SlFVRTJRaXhOUVVGTkxFTkJRVU1zVFVGQlVDeEhRVUZuUWl4RFFVRTNReXhEUVVGWUxFZEJRMFVzVFVGQlRTeEhRVUZITEVOQlJGZ3NSMEZGUlN4TlFVRk5MRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlRpeERRVUZqTEV0QlFXUXNSVUZCY1VJc1JVRkJja0lzUTBGR1lqdEJRVWxCTEUxQlFVRXNWVUZCVlN4TFFVRkxMRTFCUVUwc1EwRkJReXhOUVVGUUxFZEJRV2RDTEVOQlFTOUNMRWRCUTBVc1ZVRkJWU3hIUVVGSExFTkJSR1lzUjBGRlJTeFZRVUZWTEVWQlJsbzdRVUZKUVN4eFEwRkJhVUlzVjBGQmFrSXNSVUZCT0VJc1RVRkJPVUlzUlVGQmMwTXNTVUZCZEVNc1JVRkJORU1zVlVGQk5VTTdRVUZEUkN4TFFWcEVMRVZCWmpoQ0xFTkJPRUk1UWpzN1FVRkRRU3gxUWtGQlJTeExRVUZKTEVOQlFVTXNRMEZCUkN4RFFVRktMRU5CUVZFc1lVRkJVaXhEUVVGelFpeHhRa0ZCZEVJc1EwRkJSaXhGUVVGblJDeExRVUZvUkN4RFFVRnpSQ3hWUVVGRExFTkJRVVFzUlVGQlR6dEJRVU16UkN4TlFVRkJMRU5CUVVNc1EwRkJReXhqUVVGR08wRkJSVUVzVFVGQlFTeE5RVUZOTEV0QlFVc3NRMEZCV0N4SFFVTkZMRTFCUVUwc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZPTEVOQlFXTXNTMEZCWkN4RlFVRnhRaXhGUVVGeVFpeERRVUZFTEVsQlFUWkNMRTFCUVUwc1EwRkJReXhOUVVGUUxFZEJRV2RDTEVOQlFUZERMRU5CUkZnc1IwRkZSU3hOUVVGTkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVGl4RFFVRmpMRXRCUVdRc1JVRkJjVUlzUlVGQmNrSXNRMEZHWWp0QlFVbEJMRTFCUVVFc1ZVRkJWU3hMUVVGTExFTkJRV1lzUjBGRFJTeFZRVUZWTEVkQlFVY3NUVUZCVFN4RFFVRkRMRTFCUVZBc1IwRkJaMElzUTBGRUwwSXNSMEZGUlN4VlFVRlZMRVZCUmxvN1FVRkpRU3h4UTBGQmFVSXNWMEZCYWtJc1JVRkJPRUlzVFVGQk9VSXNSVUZCYzBNc1NVRkJkRU1zUlVGQk5FTXNWVUZCTlVNN1FVRkRSQ3hMUVZwRUxFVkJMMEk0UWl4RFFUaERPVUk3TzBGQlEwRXNkVUpCUVVVc1owSkJRVVlzUlVGQmIwSXNTMEZCY0VJc1EwRkJNRUlzVlVGQlF5eERRVUZFTEVWQlFVODdRVUZETDBJc1ZVRkJUU3hSUVVGUkxFZEJRVWNzUTBGQlF5eHRRa0ZCUlN4RFFVRkRMRU5CUVVNc1RVRkJTaXhGUVVGWkxGTkJRVm9zUTBGQmMwSXNaVUZCZEVJc1EwRkJiRUk3UVVGRlFTeE5RVUZCTEZWQlFWVXNSMEZCUnl4UlFVRmlPMEZCUTBFc1RVRkJRU3hOUVVGTkxFZEJRVWNzUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVGl4RFFVRmpMRXRCUVdRc1JVRkJjVUlzUlVGQmNrSXNRMEZCUkN4SFFVRTBRaXhSUVVGeVF6dEJRVVZCTEhGRFFVRnBRaXhYUVVGcVFpeEZRVUU0UWl4TlFVRTVRaXhGUVVGelF5eEpRVUYwUXl4RlFVRTBReXhWUVVFMVF6dEJRVU5FTEV0QlVFUTdRVUV2UXpoQ096dEJRVU5vUXl4UFFVRkxMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRV0lzUlVGQlowSXNRMEZCUXl4SFFVRkhMRXRCUVVzc1RVRkJla0lzUlVGQmFVTXNRMEZCUXl4RlFVRnNReXhGUVVGelF6dEJRVUZCTEZWQlFUZENMRU5CUVRaQ08wRkJjMFJ5UXp0QlFVTkdMRU5CZUVSRU96dEJRVEJFUVN4dFFrRkJSU3hWUVVGR0xFVkJRV01zVVVGQlpEczdPenM3T3p0QlF6bEVRVHM3UVVGSFFTeGpRVUZGTEZOQlFVWXNRMEZCV1N4WlFVRmFMRWRCUVRKQ0xGbEJRVmM3UVVGQlFUczdRVUZCUVN3MlFrRkRNMElzUTBGRU1rSTdRVUZGYkVNc1VVRkJUU3hOUVVGTkxFZEJRVWNzYlVKQlFVVXNTMEZCU1N4RFFVRkRMRU5CUVVRc1EwRkJUaXhGUVVGWExGTkJRVmdzUTBGQmNVSXNTVUZCY2tJc1EwRkJaanRCUVVWQkxIVkNRVUZGTEV0QlFVa3NRMEZCUXl4RFFVRkVMRU5CUVU0c1JVRkJWeXhMUVVGWUxFTkJRV2xDTzBGQlFVRXNZVUZCVFN3MlEwRkJjVUlzVFVGQmNrSXNVVUZCWjBNc1ZVRkJhRU1zUTBGQk1rTXNSMEZCTTBNc1EwRkJUanRCUVVGQkxFdEJRV3BDTzBGQlNtdERPenRCUVVOd1F5eFBRVUZMTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVdJc1JVRkJaMElzUTBGQlF5eEhRVUZITEV0QlFVc3NUVUZCZWtJc1JVRkJhVU1zUTBGQlF5eEZRVUZzUXl4RlFVRnpRenRCUVVGQkxGVkJRVGRDTEVOQlFUWkNPMEZCU1hKRE8wRkJRMFlzUTBGT1JEczdRVUZSUVN4dFFrRkJSU3gxUWtGQlJpeEZRVUV5UWl4WlFVRXpRanM3T3pzN096czdPMEZEV0VFN08wRkJRMEU3TzBGQlJVRXNTVUZCVFN4aFFVRmhMRWRCUVVjc1IwRkJkRUk3TzBGQlJVRXNZMEZCUlN4VFFVRkdMRU5CUVZrc1MwRkJXaXhIUVVGdlFpeFZRVUZUTEU5QlFWUXNSVUZCYTBJN1FVRkJRVHM3UVVGQlFTdzJRa0ZETTBJc1EwRkVNa0k3UVVGRmJFTXNVVUZCVFN4TlFVRk5MRWRCUVVjc2JVSkJRVVVzUzBGQlNTeERRVUZETEVOQlFVUXNRMEZCVGl4RlFVRlhMRk5CUVZnc1EwRkJjVUlzWVVGQmNrSXNRMEZCWmp0QlFVVkJMSFZDUVVGRkxFdEJRVWtzUTBGQlF5eERRVUZFTEVOQlFVNHNSVUZCVnl4TFFVRllMRU5CUVdsQ0xGVkJRVU1zUTBGQlJDeEZRVUZQTzBGQlEzUkNMRTFCUVVFc1EwRkJReXhEUVVGRExHTkJRVVk3UVVGRFFTeDVRa0ZCUlN4TlFVRkdMRVZCUVZVc1RVRkJWaXhEUVVGcFFpeGhRVUZxUWp0QlFVTkJMRTFCUVVFc1VVRkJVU3hEUVVGRExFbEJRVlFzUTBGQll5eExRVUZrTEVOQlFXOUNMRkZCUVhCQ0xFZEJRU3RDTEZGQlFTOUNPMEZCUTBRc1MwRktSRHRCUVUxQkxFbEJRVUVzVVVGQlVTeERRVUZETEdkQ1FVRlVMRmRCUVRaQ0xFMUJRVGRDTEc5Q1FVRnZSQ3hQUVVGd1JDeERRVUUwUkN4VlFVRkRMRWRCUVVRc1JVRkJVenRCUVVOdVJTeDVRa0ZCUlN4SFFVRkdMRVZCUVU4c1MwRkJVQ3hEUVVGaExGbEJRVTA3UVVGRGFrSXNNa0pCUVVVc1RVRkJSaXhGUVVGVkxFOUJRVllzUTBGQmEwSXNZVUZCYkVJN1FVRkZRU3hSUVVGQkxGVkJRVlVzUTBGQlF5eFpRVUZOTzBGQlEyWXNZMEZCU1N4UFFVRktMRVZCUVdFN1FVRkRXQ3haUVVGQkxGRkJRVkVzUTBGQlF5eEpRVUZVTEVOQlFXTXNTMEZCWkN4SFFVRnpRaXhGUVVGMFFqdEJRVU5CTEZsQlFVRXNVVUZCVVN4RFFVRkRMR0ZCUVZRc1EwRkJkVUlzVFVGQmRrSXNSVUZCSzBJc1RVRkJMMEk3UVVGRFJEdEJRVU5HTEZOQlRGTXNSVUZMVUN4aFFVeFBMRU5CUVZZN1FVRk5SQ3hQUVZSRU8wRkJWVVFzUzBGWVJEdEJRV0ZCTEhWQ1FVRkZMRTFCUVVZc1JVRkJWU3hMUVVGV0xFTkJRV2RDTEZWQlFVTXNRMEZCUkN4RlFVRlBPMEZCUTNKQ0xGVkJRVWtzUTBGQlF5eERRVUZETEUxQlFVWXNRMEZCVXl4VFFVRlVMRU5CUVcxQ0xGRkJRVzVDTEVOQlFUUkNMRTlCUVRWQ0xFTkJRVW9zUlVGQk1FTTdRVUZEZUVNc01rSkJRVVVzVFVGQlJpeEZRVUZWTEU5QlFWWXNRMEZCYTBJc1lVRkJiRUk3UVVGRlFTeFJRVUZCTEZWQlFWVXNRMEZCUXl4WlFVRk5PMEZCUTJZc1kwRkJTU3hQUVVGS0xFVkJRV0U3UVVGRFdDeFpRVUZCTEZGQlFWRXNRMEZCUXl4SlFVRlVMRU5CUVdNc1MwRkJaQ3hIUVVGelFpeEZRVUYwUWp0QlFVTkJMRmxCUVVFc1VVRkJVU3hEUVVGRExHRkJRVlFzUTBGQmRVSXNUVUZCZGtJc1JVRkJLMElzVFVGQkwwSTdRVUZEUkR0QlFVTkdMRk5CVEZNc1JVRkxVQ3hoUVV4UExFTkJRVlk3UVVGTlJEdEJRVU5HTEV0QldFUTdRVUYyUW10RE96dEJRVU53UXl4UFFVRkxMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRV0lzUlVGQlowSXNRMEZCUXl4SFFVRkhMRXRCUVVzc1RVRkJla0lzUlVGQmFVTXNRMEZCUXl4RlFVRnNReXhGUVVGelF6dEJRVUZCTEZWQlFUZENMRU5CUVRaQ08wRkJhME55UXp0QlFVTkdMRU5CY0VORU96dEJRWE5EUVN4dFFrRkJSU3gxUWtGQlJpeEZRVUV5UWl4TFFVRXpRaXhEUVVGcFF5eEpRVUZxUXpzN1FVRkhRU3hqUVVGRkxGTkJRVVlzUTBGQldTeFhRVUZhTEVkQlFUQkNMRmxCUVRaQ08wRkJRVUVzYVVaQlFVb3NSVUZCU1R0QlFVRkJMRTFCUVc1Q0xFdEJRVzFDTEZGQlFXNUNMRXRCUVcxQ08wRkJRVUVzVFVGQldpeEpRVUZaTEZGQlFWb3NTVUZCV1RzN1FVRkRja1E3UVVGRFFTeE5RVUZQTEV0QlFWQXNSMEZCTUVJc1NVRkJNVUlzUTBGQlR5eExRVUZRTzBGQlFVRXNUVUZCWXl4UlFVRmtMRWRCUVRCQ0xFbEJRVEZDTEVOQlFXTXNVVUZCWkN4RFFVWnhSQ3hEUVVWMFFqczdRVUZGTDBJc1QwRkJTeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZpTEVWQlFXZENMRU5CUVVNc1IwRkJSeXhMUVVGTExFMUJRWHBDTEVWQlFXbERMRU5CUVVNc1JVRkJiRU1zUlVGQmMwTTdRVUZCUVRzN1FVRkRjRU1zVVVGQlNTeFpRVUZaTEVkQlFVY3NVVUZCVVN4RFFVRkRMR0ZCUVZRc1EwRkJkVUlzUzBGQmRrSXNRMEZCYmtJN1FVRkRRU3gxUWtGQlJTeFpRVUZHTEVWQlFXZENMRkZCUVdoQ0xFTkJRWGxDTEU5QlFYcENPMEZCUTBFc2RVSkJRVVVzV1VGQlJpeEZRVUZuUWl4WlFVRm9RaXhEUVVFMlFpeEpRVUUzUWl4RlFVRnRReXh0UWtGQlJTeExRVUZMTEVOQlFVd3NRMEZCUml4RlFVRlhMRk5CUVZnc1EwRkJjVUlzWVVGQmNrSXNSVUZCYjBNc1MwRkJjRU1zUTBGQk1FTXNRMEZCTVVNc1EwRkJia003UVVGRFFTeDFRa0ZCUlN4WlFVRkdMRVZCUVdkQ0xFbEJRV2hDTERoUVFVOW5ReXhMUVVGTExFTkJRVU1zUzBGUWRFTXNNRVZCVTJ0RExFdEJRVXNzUTBGQlF5eEpRVlI0UXp0QlFXZENRU3hSUVVGTkxFOUJRVThzUjBGQlJ5eEZRVUZvUWpzN1FVRkRRU3hUUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFXSXNSVUZCWjBJc1EwRkJReXhIUVVGSExFdEJRWEJDTEVWQlFUSkNMRU5CUVVNc1JVRkJOVUlzUlVGQlowTTdRVUZCUVRzN1FVRkRPVUlzVlVGQlRTeE5RVUZOTEVkQlFVY3NVVUZCVVN4RFFVRkRMR0ZCUVZRc1EwRkJkVUlzVVVGQmRrSXNRMEZCWmpzN1FVRkRRU3dyUWtGQlJTeE5RVUZHTEVkQlFWVXNVVUZCVml4WlFVRnRRaXhMUVVGdVFpd3dRMEZCTmtJc1VVRkJVU3hEUVVGRExFTkJRVVFzUTBGQlVpeERRVUZaTEU5QlFYcERPenRCUVVOQkxIbENRVUZGTEUxQlFVWXNSVUZCVlN4SlFVRldMRU5CUVdVc1VVRkJVU3hEUVVGRExFTkJRVVFzUTBGQlVpeERRVUZaTEU5QlFUTkNPenRCUVVWQkxGVkJRVWtzVVVGQlVTeERRVUZETEVOQlFVUXNRMEZCVWl4RFFVRlpMRkZCUVZvc1NVRkJkMElzVDBGQlR5eFJRVUZSTEVOQlFVTXNRMEZCUkN4RFFVRlNMRU5CUVZrc1VVRkJia0lzUzBGQlowTXNWVUZCTlVRc1JVRkJkMFU3UVVGRGRFVXNNa0pCUVVVc1RVRkJSaXhGUVVGVkxFdEJRVllzUTBGQlowSXNVVUZCVVN4RFFVRkRMRU5CUVVRc1EwRkJVaXhEUVVGWkxGRkJRVFZDTzBGQlEwUTdPMEZCUlVRc1ZVRkJTU3hSUVVGUkxFTkJRVU1zUTBGQlJDeERRVUZTTEVOQlFWa3NTMEZCYUVJc1JVRkJkVUlzYlVKQlFVVXNUVUZCUml4RlFVRlZMRmxCUVZZc1EwRkJkVUlzV1VGQmRrSXNSVUZCY1VNc1RVRkJja003UVVGRmRrSXNUVUZCUVN4UFFVRlBMRU5CUVVNc1NVRkJVaXhEUVVGaExFMUJRV0k3UVVGRFJEczdRVUZGUkN3MlFrRkJRU3haUVVGWkxFTkJRVU1zWVVGQllpeERRVUV5UWl4bFFVRXpRaXhIUVVFMFF5eE5RVUUxUXl3NFFrRkJjMFFzVDBGQmRFUTdPMEZCUTBFc1NVRkJRU3hSUVVGUkxFTkJRVU1zU1VGQlZDeERRVUZqTEZkQlFXUXNRMEZCTUVJc1dVRkJNVUk3UVVGRFFTeDFRa0ZCUlN4TFFVRkxMRU5CUVV3c1EwRkJSaXhGUVVGWExFdEJRVmdzUTBGQmFVSXNTVUZCYWtJN1FVRkRRU3gxUWtGQlJTeExRVUZMTEVOQlFVd3NSVUZCVVN4WlFVRlNMRU5CUVhGQ0xHRkJRWEpDTEVOQlFVWXNSVUZCZFVNc1RVRkJka01zUTBGQk9FTXNZVUZCT1VNN1FVRkRRU3hKUVVGQkxGRkJRVkVzUTBGQlF5eEpRVUZVTEVOQlFXTXNTMEZCWkN4RFFVRnZRaXhSUVVGd1FpeEhRVUVyUWl4UlFVRXZRanRCUVVOQkxGRkJRVWtzVVVGQlVTeERRVUZETEVsQlFWUXNRMEZCWXl4WlFVRmtMRWRCUVRaQ0xFMUJRVTBzUTBGQlF5eFhRVUY0UXl4RlFVRnhSQ3hSUVVGUkxFTkJRVU1zU1VGQlZDeERRVUZqTEV0QlFXUXNRMEZCYjBJc1YwRkJjRUlzWVVGQmNVTXNNa0pCUVhKRE8wRkJRM1JFTzBGQlEwWXNRMEU1UTBRN096czdPenM3UVVNNVEwRTdPMEZCUjBFc1kwRkJSU3hUUVVGR0xFTkJRVmtzU1VGQldpeEhRVUZ0UWl4WlFVRlhPMEZCUVVFN08wRkJRVUVzTmtKQlEyNUNMRU5CUkcxQ08wRkJSVEZDTEhWQ1FVRkZMRXRCUVVrc1EwRkJReXhEUVVGRUxFTkJRVTRzUlVGQlZ5eExRVUZZTEVOQlFXbENMRmxCUVUwN1FVRkRja0lzZVVKQlFVVXNTMEZCU1N4RFFVRkRMRU5CUVVRc1EwRkJUaXhGUVVOSExGRkJSRWdzUTBGRFdTeDFRa0ZFV2l4RlFVVkhMRkZCUmtnc1IwRkhSeXhYUVVoSUxFTkJSMlVzZFVKQlNHWXNSVUZKUnl4UFFVcElMRU5CU1Zjc1QwRktXQ3hGUVV0SExFOUJURWdzUTBGTFZ5eGpRVXhZTEVWQlRVY3NXVUZPU0N4RFFVMW5RaXhQUVU1b1FpeEZRVTE1UWl4RlFVNTZRaXhGUVU5SExGVkJVRWdzUTBGUFl5eHRRa0ZCUlN4TFFVRkpMRU5CUVVNc1EwRkJSQ3hEUVVGT0xFVkJRVmNzVTBGQldDeExRVUY1UWl4RFFWQjJReXhGUVZGSExFMUJVa2dzUTBGUlZTeEhRVkpXTzBGQlUwUXNTMEZXUkR0QlFVWXdRanM3UVVGRE5VSXNUMEZCU3l4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGaUxFVkJRV2RDTEVOQlFVTXNSMEZCUnl4TFFVRkxMRTFCUVhwQ0xFVkJRV2xETEVOQlFVTXNSVUZCYkVNc1JVRkJjME03UVVGQlFTeFZRVUUzUWl4RFFVRTJRanRCUVZseVF6dEJRVU5HTEVOQlpFUTdPMEZCWjBKQkxHMUNRVUZGTEdkRFFVRkdMRVZCUVc5RExFbEJRWEJET3pzN096czdPenM3T3pzN1FVTnVRa0U3TzBGQlEwRTdPMEZCUTBFN08wRkJSVUVzTkVKQlFXTXNXVUZCVFR0QlFVTnNRanRCUVVORUxFTkJSa1E3TzBGQlMwRXNTVUZCVFN4RFFVRkRMRWRCUVVjc1UwRkJTaXhEUVVGSkxFTkJRVk1zVVVGQlZDeEZRVUZ0UWp0QlFVTXpRaXhUUVVGUExFbEJRVWtzUTBGQlF5eERRVUZETEZOQlFVWXNRMEZCV1N4SlFVRm9RaXhEUVVGeFFpeFJRVUZ5UWl4RFFVRlFPMEZCUTBRc1EwRkdSRHM3UVVGSlFTeERRVUZETEVOQlFVTXNVMEZCUml4RFFVRlpMRWxCUVZvc1IwRkJiVUlzVlVGQlV5eFJRVUZVTEVWQlFXMUNPMEZCUTNCRExFMUJRVWtzUTBGQlF5eFJRVUZNTEVWQlFXVXNUMEZCVHl4SlFVRlFMRU5CUkhGQ0xFTkJRMVE3TzBGQlJUTkNMRTFCUVVrc1VVRkJVU3hEUVVGRExFOUJRV0lzUlVGQmMwSTdRVUZEY0VJc1UwRkJTeXhEUVVGTUxFbEJRVlVzVVVGQlZqdEJRVU5CTEZOQlFVc3NUVUZCVEN4SFFVRmpMRU5CUVdRN1FVRkRRU3hYUVVGUExFbEJRVkE3UVVGRFJEczdRVUZGUkN4RlFVRkJMRTFCUVUwc1EwRkJReXhOUVVGUUxFTkJRV01zU1VGQlpDeEZRVUZ2UWl4UlFVRlJMRU5CUVVNc1owSkJRVlFzUTBGQk1FSXNVVUZCTVVJc1EwRkJjRUk3UVVGRFFTeFBRVUZMTEUxQlFVd3NSMEZCWXl4UlFVRlJMRU5CUVVNc1owSkJRVlFzUTBGQk1FSXNVVUZCTVVJc1JVRkJiME1zVFVGQmJFUTdRVUZEUVN4VFFVRlBMRWxCUVZBN1FVRkRSQ3hEUVZwRU96dEJRV05CTEVOQlFVTXNRMEZCUXl4VFFVRkdMRU5CUVZrc1NVRkJXaXhEUVVGcFFpeFRRVUZxUWl4SFFVRTJRaXhEUVVGRExFTkJRVU1zVTBGQkwwSTdRVUZEUVN4TlFVRk5MRU5CUVVNc1EwRkJVQ3hIUVVGWExFTkJRVmc3WlVGSFpTeERPenM3T3pzN096czdPenM3TzBGREwwSm1PenRCUVVOQk96dEJRVU5CT3p0QlFVTkJPenRCUVVOQk96dEJRVU5CT3p0QlFVTkJPenRCUVVOQk96dEJRVU5CT3p0QlFVTkJPenRCUVVOQk96dEJRVU5CT3p0QlFVTkJPenRsUVVWbExHRTdPenM3T3pzN096czdRVU5rWmpzN1FVRkhRU3hqUVVGRkxGTkJRVVlzUTBGQldTeEpRVUZhTEVkQlFXMUNMRlZCUVZNc1QwRkJWQ3hGUVVGclFqdEJRVU51UXl4UFFVRkxMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRV0lzUlVGQlowSXNRMEZCUXl4SFFVRkhMRXRCUVVzc1RVRkJla0lzUlVGQmFVTXNRMEZCUXl4RlFVRnNReXhGUVVGelF6dEJRVU53UXl4UlFVRkpMRTlCUVVvc1JVRkJZU3hMUVVGTExFTkJRVXdzUlVGQlVTeFRRVUZTTEVkQlFXOUNMRTlCUVhCQ0xFTkJRV0lzUzBGRFN5eFBRVUZQTEV0QlFVc3NRMEZCVEN4RlFVRlJMRk5CUVdZN1FVRkRUanM3UVVGRlJDeFRRVUZQTEVsQlFWQTdRVUZEUkN4RFFWQkVPenRCUVZOQkxHTkJRVVVzVTBGQlJpeERRVUZaTEZWQlFWb3NSMEZCZVVJc1ZVRkJVeXhOUVVGVUxFVkJRV2xDTzBGQlEzaERMRTFCUVVrc1EwRkJReXhMUVVGTExFMUJRVTBzUjBGQlJ5eERRVUZrTEVOQlFVd3NSVUZCZFVJc1RVRkJUU3hKUVVGSkxGTkJRVW9zYlVKQlFYbENMRTFCUVhwQ0xIRkNRVUZPTzBGQlJYWkNMRTFCUVUwc1VVRkJVU3hIUVVGSExFdEJRVXNzVFVGQlRTeEhRVUZITEVOQlFXUXNRMEZCYWtJN08wRkJRMEVzVDBGQlN5eEpRVUZKTEVOQlFWUXNTVUZCWXl4TlFVRk5MRU5CUVVNc1NVRkJVQ3hEUVVGWkxFbEJRVm9zUTBGQlpEdEJRVUZwUXl4WFFVRlBMRXRCUVVzc1EwRkJUQ3hEUVVGUU8wRkJRV3BET3p0QlFVVkJMRTlCUVVzc1EwRkJUQ3hKUVVGVkxGRkJRVlk3UVVGRFFTeFBRVUZMTEUxQlFVd3NSMEZCWXl4RFFVRmtPMEZCUlVFc1UwRkJUeXhKUVVGUU8wRkJRMFFzUTBGV1JEczdRVUZaUVN4alFVRkZMRk5CUVVZc1EwRkJXU3hUUVVGYUxFZEJRWGRDTEZsQlFWYzdRVUZCUVRzN1FVRkRha01zVFVGQlRTeE5RVUZOTEVkQlFVY3NTMEZCU3l4RFFVRk1MRVZCUVZFc1ZVRkJka0k3UVVGRFFTeE5RVUZOTEZkQlFWY3NiME5CUVU4c1RVRkJUU3hEUVVGRExGRkJRV1FzUTBGQmFrSTdPMEZCUlVFc1RVRkJUU3hSUVVGUkxFZEJRVWNzVTBGQldDeFJRVUZYTEVOQlFVTXNTVUZCUkR0QlFVRkJMRmRCUVZVc1NVRkJTU3hMUVVGTExFdEJRVWtzUTBGQlF5eERRVUZFTEVOQlFYWkNPMEZCUVVFc1IwRkJha0k3TzBGQlJVRXNVMEZCVHl4WFFVRlhMRU5CUVVNc1UwRkJXaXhEUVVGelFpeFJRVUYwUWl4RFFVRlFPMEZCUTBRc1EwRlFSRHM3UVVGVFFTeGpRVUZGTEZOQlFVWXNRMEZCV1N4UFFVRmFMRWRCUVhOQ0xGVkJRVk1zVVVGQlZDeEZRVUZ0UWp0QlFVTjJReXhOUVVGSkxHVkJRV1VzUjBGQlJ5eERRVUYwUWp0QlFVTkJMRTFCUVVrc1QwRkJUeXhIUVVGSExFTkJRV1E3UVVGRlFTeE5RVUZOTEZGQlFWRXNSMEZCUnl4TlFVRk5MRU5CUVVNc1RVRkJVQ3hEUVVGakxFVkJRV1FzUlVGQmEwSXNTVUZCYkVJc1EwRkJha0k3TzBGQlJVRXNUMEZCU3l4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGaUxFVkJRV2RDTEVOQlFVTXNSMEZCUnl4UlFVRlJMRU5CUVVNc1RVRkJOMElzUlVGQmNVTXNRMEZCUXl4RlFVRjBReXhGUVVFd1F6dEJRVU40UXl4UlFVRk5MR1ZCUVdVc1IwRkJSeXhSUVVGUkxFTkJRVU1zUTBGQlJDeERRVUZTTEVOQlFWa3NaMEpCUVZvc1EwRkJOa0lzVVVGQk4wSXNRMEZCZUVJN1FVRkRRU3hSUVVGSkxHVkJRV1VzUTBGQlF5eE5RVUZvUWl4TFFVRXlRaXhEUVVFdlFpeEZRVUZyUXpzN1FVRkZiRU1zVTBGQlN5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRmlMRVZCUVdkQ0xFTkJRVU1zUjBGQlJ5eGxRVUZsTEVOQlFVTXNUVUZCY0VNc1JVRkJORU1zUTBGQlF5eEZRVUUzUXl4RlFVRnBSRHRCUVVNdlF5eFhRVUZMTEU5QlFVd3NTVUZCWjBJc1pVRkJaU3hEUVVGRExFTkJRVVFzUTBGQkwwSTdRVUZEUVN4TlFVRkJMRTlCUVU4N1FVRkRVanM3UVVGRlJDeEpRVUZCTEdWQlFXVXNTVUZCU1N4bFFVRmxMRU5CUVVNc1RVRkJia003UVVGRFJEczdRVUZGUkN4UFFVRkxMRTFCUVV3c1IwRkJZeXhsUVVGa08wRkJSVUVzVFVGQlRTeFRRVUZUTEVkQlFVY3NUVUZCVFN4RFFVRkRMRWxCUVZBc1EwRkJXU3hKUVVGYUxFVkJRV3RDTEUxQlFYQkRPenRCUVVOQkxGTkJRVThzWlVGQlpTeEhRVUZITEZOQlFYcENMRVZCUVc5RExHVkJRV1VzUlVGQmJrUTdRVUZCZFVRc1YwRkJUeXhMUVVGTExHVkJRVXdzUTBGQlVEdEJRVUYyUkRzN1FVRkZRU3hUUVVGUExFbEJRVkE3UVVGRFJDeERRWGhDUkRzN1FVRXdRa0VzWTBGQlJTeFRRVUZHTEVOQlFWa3NUMEZCV2l4SFFVRnpRaXhWUVVGVExGRkJRVlFzUlVGQmJVSTdRVUZEZGtNc1RVRkJTU3hQUVVGUExFZEJRVWNzUTBGQlpEczdRVUZGUVN4UFFVRkxMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRV0lzUlVGQlowSXNRMEZCUXl4SFFVRkhMRXRCUVVzc1RVRkJla0lzUlVGQmFVTXNRMEZCUXl4RlFVRnNReXhGUVVGelF6dEJRVU53UXl4UlFVRk5MRmRCUVZjc1IwRkJSeXhMUVVGTExFTkJRVXdzUTBGQmNFSTdRVUZEUVN4VFFVRkxMRU5CUVV3c1NVRkJWU3hMUVVGTExFTkJRVXdzUlVGQlVTeFBRVUZTTEVOQlFXZENMRkZCUVdoQ0xFTkJRVlk3UVVGRlFTeFJRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRk1MRU5CUVV3c1JVRkJZeXhMUVVGTExFTkJRVXdzU1VGQlZTeFhRVUZXTzBGQlEyUXNTVUZCUVN4UFFVRlBPMEZCUTFJN08wRkJSVVFzVFVGQlRTeFRRVUZUTEVkQlFVY3NUVUZCVFN4RFFVRkRMRWxCUVZBc1EwRkJXU3hKUVVGYUxFVkJRV3RDTEUxQlFYQkRPenRCUVVOQkxGTkJRVThzVDBGQlR5eEhRVUZITEZOQlFXcENMRVZCUVRSQ0xFOUJRVThzUlVGQmJrTTdRVUZCZFVNc1YwRkJUeXhMUVVGTExFOUJRVXdzUTBGQlVEdEJRVUYyUXpzN1FVRkZRU3hUUVVGUExFbEJRVkE3UVVGRFJDeERRV1pFT3p0QlFXbENRU3hqUVVGRkxGTkJRVVlzUTBGQldTeFJRVUZhTEVkQlFYVkNMRmxCUVZjN1FVRkRhRU1zVFVGQlNTeGxRVUZsTEVkQlFVY3NRMEZCZEVJN1FVRkRRU3hOUVVGSkxHVkJRV1VzUjBGQlJ5eERRVUYwUWp0QlFVVkJMRTFCUVUwc1VVRkJVU3hIUVVGSExFMUJRVTBzUTBGQlF5eE5RVUZRTEVOQlFXTXNSVUZCWkN4RlFVRnJRaXhKUVVGc1FpeERRVUZxUWpzN1FVRkZRU3hQUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFXSXNSVUZCWjBJc1EwRkJReXhIUVVGSExGRkJRVkVzUTBGQlF5eE5RVUUzUWl4RlFVRnhReXhEUVVGRExFVkJRWFJETEVWQlFUQkRPMEZCUTNoRExGRkJRVTBzYTBKQlFXdENMRWRCUVVjc1VVRkJVU3hEUVVGRExFTkJRVVFzUTBGQlVpeERRVUZaTEZWQlFWb3NRMEZCZFVJc1VVRkJiRVE3TzBGQlJVRXNVMEZCU3l4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGaUxFVkJRV2RDTEVOQlFVTXNSMEZCUnl4clFrRkJhMElzUTBGQlF5eE5RVUYyUXl4RlFVRXJReXhEUVVGRExFVkJRV2hFTEVWQlFXOUVPMEZCUTJ4RUxGVkJRVWtzVVVGQlVTeERRVUZETEVOQlFVUXNRMEZCVWl4TFFVRm5RaXhyUWtGQmEwSXNRMEZCUXl4RFFVRkVMRU5CUVhSRExFVkJRVEpETzBGQlJUTkRMRmRCUVVzc1pVRkJUQ3hKUVVGM1FpeHJRa0ZCYTBJc1EwRkJReXhEUVVGRUxFTkJRVEZETzBGQlEwRXNUVUZCUVN4bFFVRmxPMEZCUTJoQ096dEJRVVZFTEVsQlFVRXNaVUZCWlN4SlFVRkpMR3RDUVVGclFpeERRVUZETEUxQlFXNUNMRWRCUVRSQ0xFTkJRUzlETzBGQlEwUTdPMEZCUlVRc1QwRkJTeXhOUVVGTUxFZEJRV01zWlVGQlpEdEJRVVZCTEUxQlFVMHNVMEZCVXl4SFFVRkhMRTFCUVUwc1EwRkJReXhKUVVGUUxFTkJRVmtzU1VGQldpeEZRVUZyUWl4TlFVRndRenM3UVVGRFFTeFRRVUZQTEdWQlFXVXNSMEZCUnl4VFFVRjZRaXhGUVVGdlF5eGxRVUZsTEVWQlFXNUVPMEZCUVhWRUxGZEJRVThzUzBGQlN5eGxRVUZNTEVOQlFWQTdRVUZCZGtRN08wRkJRMEVzVTBGQlR5eEpRVUZRTzBGQlEwUXNRMEY0UWtRN096czdPenM3UVVNMVJVRTdPMEZCUTBFN08wRkJSMEVzWTBGQlJTeFRRVUZHTEVOQlFWa3NaVUZCV2l4SFFVRTRRaXhWUVVGVExGRkJRVlFzUlVGQmJVSXNVVUZCYmtJc1JVRkJOa0lzUjBGQk4wSXNSVUZCYTBNN1FVRkRPVVFzVFVGQlNTeFRRVUZLT3p0QlFVVkJMRmRCUVZNc1owSkJRVlFzUTBGQk1FSXNTVUZCTVVJc1JVRkJaME03UVVGRE9VSXNVVUZCU1N4RFFVRkRMRk5CUVV3c1JVRkJaMElzVTBGQlV5eEhRVUZITEVsQlFWbzdRVUZGYUVJc1VVRkJTU3hYUVVGWExFZEJRVWNzU1VGQlNTeEhRVUZITEZOQlFYcENPMEZCUTBFc1VVRkJTU3hYUVVGWExFZEJRVWNzU1VGQlNTeERRVUZETEVkQlFVd3NRMEZCVXl4WFFVRlhMRWRCUVVjc1VVRkJka0lzUlVGQmFVTXNRMEZCYWtNc1EwRkJiRUlzUTBGS09FSXNRMEZKZDBJN08wRkJSWFJFTEVsQlFVRXNVVUZCVVN4RFFVRkRMRmRCUVVRc1EwRkJVanRCUVVWQkxGRkJRVWtzVjBGQlZ5eEhRVUZITEZGQlFXeENMRVZCUVRSQ0xIRkNRVUZ4UWl4RFFVRkRMR2RDUVVGRUxFTkJRWEpDTEVOQlFUVkNMRXRCUTBzN1FVRkRTQ3hWUVVGSkxFOUJRVThzUjBGQlVDeExRVUZsTEZWQlFXNUNMRVZCUVN0Q0xFZEJRVWM3UVVGRGJrTTdRVUZEUmpzN1FVRkZSQ3hQUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFXSXNSVUZCWjBJc1EwRkJReXhIUVVGSExFdEJRVXNzVFVGQmVrSXNSVUZCYVVNc1EwRkJReXhGUVVGc1F5eEZRVUZ6UXp0QlFVTndReXhSUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZXTEVWQlFXRTdRVUZEWkRzN1FVRkZSQ3hUUVVGUExHZENRVUZRTzBGQlEwUXNRMEYwUWtRN08wRkJkMEpCTEdOQlFVVXNVMEZCUml4RFFVRlpMRTFCUVZvc1IwRkJjVUlzVlVGQlV5eFJRVUZVTEVWQlFXMUNMRTlCUVc1Q0xFVkJRVFJDTEVkQlFUVkNMRVZCUVdsRE8wRkJRM0JFTEU5QlFVc3NTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJZaXhGUVVGblFpeERRVUZETEVkQlFVY3NTMEZCU3l4TlFVRjZRaXhGUVVGcFF5eERRVUZETEVWQlFXeERMRVZCUVhORE8wRkJRM0JETEN0RFFVRnhRaXhKUVVGeVFpeEZRVUV5UWl4TFFVRkxMRU5CUVV3c1EwRkJNMElzUlVGRFJUdEJRVU5GTEUxQlFVRXNVVUZCVVN4RlFVRlNMRkZCUkVZN1FVRkZSU3hOUVVGQkxFOUJRVThzUlVGQlVDeFBRVVpHTzBGQlIwVXNUVUZCUVN4SFFVRkhMRVZCUVVnN1FVRklSaXhMUVVSR08wRkJUVVE3TzBGQlJVUXNVMEZCVHl4SlFVRlFPMEZCUTBRc1EwRllSRHM3UVVGaFFTeGpRVUZGTEZOQlFVWXNRMEZCV1N4UFFVRmFMRWRCUVhOQ0xGVkJRVk1zVVVGQlZDeEZRVUZ0UWl4SFFVRnVRaXhGUVVGM1FqdEJRVU0xUXl4UFFVRkxMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRV0lzUlVGQlowSXNRMEZCUXl4SFFVRkhMRXRCUVVzc1RVRkJla0lzUlVGQmFVTXNRMEZCUXl4RlFVRnNReXhGUVVGelF6dEJRVU53UXl4blJFRkJjMElzU1VGQmRFSXNSVUZCTkVJc1MwRkJTeXhEUVVGTUxFTkJRVFZDTEVWQlEwVTdRVUZEUlN4TlFVRkJMRkZCUVZFc1JVRkJVaXhSUVVSR08wRkJSVVVzVFVGQlFTeEhRVUZITEVWQlFVZzdRVUZHUml4TFFVUkdPMEZCUzBRN08wRkJSVVFzVTBGQlR5eEpRVUZRTzBGQlEwUXNRMEZXUkRzN1FVRlpRU3hqUVVGRkxGTkJRVVlzUTBGQldTeFZRVUZhTEVkQlFYbENMRlZCUVZNc1VVRkJWQ3hGUVVGdFFpeFBRVUZ1UWl4RlFVRTBRaXhIUVVFMVFpeEZRVUZwUXp0QlFVTjRSQ3hQUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFXSXNSVUZCWjBJc1EwRkJReXhIUVVGSExFdEJRVXNzVFVGQmVrSXNSVUZCYVVNc1EwRkJReXhGUVVGc1F5eEZRVUZ6UXp0QlFVTndReXhSUVVGSkxFMUJRVTBzUTBGQlF5eG5Ra0ZCVUN4RFFVRjNRaXhMUVVGTExFTkJRVXdzUTBGQmVFSXNSVUZCYVVNc1QwRkJha01zUzBGQk5rTXNUVUZCYWtRc1JVRkJlVVE3UVVGRGRrUXNhVVJCUVhGQ0xFbEJRWEpDTEVWQlFUSkNMRXRCUVVzc1EwRkJUQ3hEUVVFelFpeEZRVU5GTzBGQlEwVXNVVUZCUVN4UlFVRlJMRVZCUVZJc1VVRkVSanRCUVVWRkxGRkJRVUVzVDBGQlR5eEZRVUZRTEU5QlJrWTdRVUZIUlN4UlFVRkJMRWRCUVVjc1JVRkJTRHRCUVVoR0xFOUJSRVk3UVVGTlJDeExRVkJFTEUxQlQwODdRVUZEVEN4clJFRkJjMElzU1VGQmRFSXNSVUZCTkVJc1MwRkJTeXhEUVVGTUxFTkJRVFZDTEVWQlEwVTdRVUZEUlN4UlFVRkJMRkZCUVZFc1JVRkJVaXhSUVVSR08wRkJSVVVzVVVGQlFTeEhRVUZITEVWQlFVZzdRVUZHUml4UFFVUkdPMEZCUzBRN1FVRkRSanM3UVVGRlJDeFRRVUZQTEVsQlFWQTdRVUZEUkN4RFFXNUNSRHM3T3pzN096dEJRM0pFUVRzN1FVRkhRU3hqUVVGRkxGTkJRVVlzUTBGQldTeFpRVUZhTEVkQlFUSkNMRlZCUVZNc1lVRkJWQ3hGUVVFMlF6dEJRVUZCTEUxQlFYSkNMR05CUVhGQ0xIVkZRVUZLTEVWQlFVazdRVUZEZEVVc1RVRkJTU3hEUVVGRExHRkJRVXdzUlVGQmIwSXNUMEZCVHl4SlFVRlFPenRCUVVWd1FpeFBRVUZMTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVdJc1JVRkJaMElzUTBGQlF5eEhRVUZITEV0QlFVc3NUVUZCZWtJc1JVRkJhVU1zUTBGQlF5eEZRVUZzUXl4RlFVRnpRenRCUVVOd1F5eFRRVUZMTEVOQlFVd3NSVUZCVVN4WlFVRlNMRU5CUVhGQ0xHRkJRWEpDTEVWQlFXOURMR05CUVhCRE8wRkJRMFE3TzBGQlJVUXNVMEZCVHl4SlFVRlFPMEZCUTBRc1EwRlNSRHM3UVVGVlFTeGpRVUZGTEZOQlFVWXNRMEZCV1N4bFFVRmFMRWRCUVRoQ0xGVkJRVk1zWVVGQlZDeEZRVUYzUWp0QlFVTndSQ3hOUVVGSkxFTkJRVU1zWVVGQlRDeEZRVUZ2UWl4UFFVRlBMRWxCUVZBN08wRkJSWEJDTEU5QlFVc3NTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJZaXhGUVVGblFpeERRVUZETEVkQlFVY3NTMEZCU3l4TlFVRjZRaXhGUVVGcFF5eERRVUZETEVWQlFXeERMRVZCUVhORE8wRkJRM0JETEZOQlFVc3NRMEZCVEN4RlFVRlJMR1ZCUVZJc1EwRkJkMElzWVVGQmVFSTdRVUZEUkRzN1FVRkZSQ3hUUVVGUExFbEJRVkE3UVVGRFJDeERRVkpFT3p0QlFWVkJMR05CUVVVc1UwRkJSaXhEUVVGWkxHVkJRVm9zUjBGQk9FSXNWVUZCVXl4aFFVRlVMRVZCUVhkQ08wRkJRM0JFTEUxQlFVa3NRMEZCUXl4aFFVRk1MRVZCUVc5Q0xFOUJRVThzU1VGQlVEczdRVUZGY0VJc1QwRkJTeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZpTEVWQlFXZENMRU5CUVVNc1IwRkJSeXhMUVVGTExFMUJRWHBDTEVWQlFXbERMRU5CUVVNc1JVRkJiRU1zUlVGQmMwTTdRVUZEY0VNc1UwRkJTeXhEUVVGTUxFVkJRVkVzWlVGQlVpeERRVUYzUWl4aFFVRjRRanRCUVVORU96dEJRVVZFTEZOQlFVOHNTVUZCVUR0QlFVTkVMRU5CVWtRN08wRkJWVUVzWTBGQlJTeFRRVUZHTEVOQlFWa3NVMEZCV2l4SFFVRjNRaXhWUVVGVExHRkJRVlFzUlVGQmQwSTdRVUZET1VNc1RVRkJTU3hEUVVGRExHRkJRVXdzUlVGQmIwSXNUMEZCVHl4SlFVRlFPenRCUVVWd1FpeFBRVUZMTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVdJc1JVRkJaMElzUTBGQlF5eEhRVUZITEV0QlFVc3NUVUZCZWtJc1JVRkJhVU1zUTBGQlF5eEZRVUZzUXl4RlFVRnpRenRCUVVOd1F5eFJRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRk1MRVZCUVZFc1dVRkJVaXhEUVVGeFFpeGhRVUZ5UWl4RFFVRk1MRVZCUVRCRExFOUJRVThzU1VGQlVEdEJRVVV4UXl4WFFVRlBMRXRCUVVzc1EwRkJUQ3hGUVVGUkxGbEJRVklzUTBGQmNVSXNZVUZCY2tJc1EwRkJVRHRCUVVORU8wRkJRMFlzUTBGU1JEczdPenM3T3p0QlEycERRVHM3UVVGSFFTeGpRVUZGTEZOQlFVWXNRMEZCV1N4UlFVRmFMRWRCUVhWQ0xGbEJRWGRDTzBGQlF6ZERMRTlCUVVzc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQllpeEZRVUZuUWl4RFFVRkRMRWRCUVVjc1MwRkJTeXhOUVVGNlFpeEZRVUZwUXl4RFFVRkRMRVZCUVd4RExFVkJRWE5ETzBGQlFVRTdPMEZCUTNCRExGRkJRVWtzUzBGQlN5eERRVUZNTEVWQlFWRXNVMEZCV2l4RlFVRjFRaXd3UWtGQlN5eERRVUZNTEVWQlFWRXNVMEZCVWl4RlFVRnJRaXhIUVVGc1FqdEJRVU40UWpzN1FVRkZSQ3hUUVVGUExFbEJRVkE3UVVGRFJDeERRVTVFT3p0QlFWRkJMR05CUVVVc1UwRkJSaXhEUVVGWkxGZEJRVm9zUjBGQk1FSXNXVUZCZDBJN1FVRkRhRVFzVDBGQlN5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRmlMRVZCUVdkQ0xFTkJRVU1zUjBGQlJ5eExRVUZMTEUxQlFYcENMRVZCUVdsRExFTkJRVU1zUlVGQmJFTXNSVUZCYzBNN1FVRkJRVHM3UVVGRGNFTXNVVUZCU1N4TFFVRkxMRU5CUVV3c1JVRkJVU3hUUVVGYUxFVkJRWFZDTERKQ1FVRkxMRU5CUVV3c1JVRkJVU3hUUVVGU0xFVkJRV3RDTEUxQlFXeENPMEZCUTNoQ096dEJRVVZFTEZOQlFVOHNTVUZCVUR0QlFVTkVMRU5CVGtRN08wRkJVVUVzWTBGQlJTeFRRVUZHTEVOQlFWa3NWMEZCV2l4SFFVRXdRaXhWUVVGVExGTkJRVlFzUlVGQmIwSTdRVUZETlVNc1QwRkJTeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZpTEVWQlFXZENMRU5CUVVNc1IwRkJSeXhMUVVGTExFMUJRWHBDTEVWQlFXbERMRU5CUVVNc1JVRkJiRU1zUlVGQmMwTTdRVUZEY0VNc1VVRkJTU3hMUVVGTExFTkJRVXdzUlVGQlVTeFRRVUZhTEVWQlFYVkNMRXRCUVVzc1EwRkJUQ3hGUVVGUkxGTkJRVklzUTBGQmEwSXNUVUZCYkVJc1EwRkJlVUlzVTBGQmVrSTdRVUZEZUVJN08wRkJSVVFzVTBGQlR5eEpRVUZRTzBGQlEwUXNRMEZPUkRzN096czdPenRCUTI1Q1FUczdRVUZIUVN4alFVRkZMRk5CUVVZc1EwRkJXU3hKUVVGYUxFZEJRVzFDTEZsQlFWYzdRVUZETlVJc1QwRkJTeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZpTEVWQlFXZENMRU5CUVVNc1IwRkJSeXhMUVVGTExFMUJRWHBDTEVWQlFXbERMRU5CUVVNc1JVRkJiRU1zUlVGQmMwTTdRVUZEY0VNc1VVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlRDeEZRVUZSTEV0QlFXSXNSVUZCYjBJN1FVRkZjRUlzVTBGQlN5eERRVUZNTEVWQlFWRXNTMEZCVWl4RFFVRmpMRTlCUVdRc1IwRkJkMElzUlVGQmVFSTdRVUZEUkRzN1FVRkZSQ3hUUVVGUExFbEJRVkE3UVVGRFJDeERRVkpFT3p0QlFWVkJMR05CUVVVc1UwRkJSaXhEUVVGWkxFbEJRVm9zUjBGQmJVSXNXVUZCVnp0QlFVTTFRaXhQUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFXSXNSVUZCWjBJc1EwRkJReXhIUVVGSExFdEJRVXNzVFVGQmVrSXNSVUZCYVVNc1EwRkJReXhGUVVGc1F5eEZRVUZ6UXp0QlFVTndReXhSUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZNTEVWQlFWRXNTMEZCWWl4RlFVRnZRanRCUVVWd1FpeFRRVUZMTEVOQlFVd3NSVUZCVVN4TFFVRlNMRU5CUVdNc1QwRkJaQ3hIUVVGM1FpeE5RVUY0UWp0QlFVTkVPenRCUVVWRUxGTkJRVThzU1VGQlVEdEJRVU5FTEVOQlVrUTdPMEZCVlVFc1kwRkJSU3hUUVVGR0xFTkJRVmtzWVVGQldpeEhRVUUwUWl4WlFVRlhPMEZCUTNKRExFOUJRVXNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCWWl4RlFVRm5RaXhEUVVGRExFZEJRVWNzUzBGQlN5eE5RVUY2UWl4RlFVRnBReXhEUVVGRExFVkJRV3hETEVWQlFYTkRPMEZCUTNCRExGRkJRVWtzUTBGQlF5eExRVUZMTEVOQlFVd3NSVUZCVVN4TFFVRmlMRVZCUVc5Q08wRkJSWEJDTEZOQlFVc3NRMEZCVEN4RlFVRlJMRXRCUVZJc1EwRkJZeXhQUVVGa0xFdEJRVEJDTEUxQlFURkNMRWRCUVcxRExFdEJRVXNzUTBGQlRDeEZRVUZSTEV0QlFWSXNRMEZCWXl4UFFVRmtMRWRCUVhkQ0xFVkJRVE5FTEVkQlFXZEZMRXRCUVVzc1EwRkJUQ3hGUVVGUkxFdEJRVklzUTBGQll5eFBRVUZrTEVkQlFYZENMRTFCUVhoR08wRkJRMFE3TzBGQlJVUXNVMEZCVHl4SlFVRlFPMEZCUTBRc1EwRlNSRHM3T3pzN096dEJRM1pDUVRzN1FVRkhRU3hqUVVGRkxGTkJRVVlzUTBGQldTeEZRVUZhTEVkQlFXbENMRlZCUVZNc1UwRkJWQ3hGUVVGdlFpeFJRVUZ3UWl4RlFVRTRRanRCUVVNM1F5eE5RVUZKTEVOQlFVTXNVMEZCUkN4SlFVRmpMRU5CUVVNc1VVRkJia0lzUlVGQk5rSXNUMEZCVHl4SlFVRlFPenRCUVVVM1FpeFBRVUZMTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVdJc1JVRkJaMElzUTBGQlF5eEhRVUZITEV0QlFVc3NUVUZCZWtJc1JVRkJhVU1zUTBGQlF5eEZRVUZzUXl4RlFVRnpRenRCUVVOd1F5eFRRVUZMTEVOQlFVd3NSVUZCVVN4blFrRkJVaXhEUVVGNVFpeFRRVUY2UWl4RlFVRnZReXhSUVVGd1F6dEJRVU5FT3p0QlFVVkVMRk5CUVU4c1NVRkJVRHRCUVVORUxFTkJVa1E3TzBGQlZVRXNZMEZCUlN4VFFVRkdMRU5CUVZrc1IwRkJXaXhIUVVGclFpeFZRVUZUTEZOQlFWUXNSVUZCYjBJc1VVRkJjRUlzUlVGQk9FSTdRVUZET1VNc1RVRkJTU3hEUVVGRExGTkJRVVFzU1VGQll5eERRVUZETEZGQlFXNUNMRVZCUVRaQ0xFOUJRVThzU1VGQlVEczdRVUZGTjBJc1QwRkJTeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZpTEVWQlFXZENMRU5CUVVNc1IwRkJSeXhMUVVGTExFMUJRWHBDTEVWQlFXbERMRU5CUVVNc1JVRkJiRU1zUlVGQmMwTTdRVUZEY0VNc1UwRkJTeXhEUVVGTUxFVkJRVkVzYlVKQlFWSXNRMEZCTkVJc1UwRkJOVUlzUlVGQmRVTXNVVUZCZGtNN1FVRkRSRHM3UVVGRlJDeFRRVUZQTEVsQlFWQTdRVUZEUkN4RFFWSkVPenRCUVZWQkxHTkJRVVVzVTBGQlJpeERRVUZaTEV0QlFWb3NSMEZCYjBJc1ZVRkJVeXhQUVVGVUxFVkJRV3RDTzBGQlEzQkRMRTlCUVVzc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQllpeEZRVUZuUWl4RFFVRkRMRWRCUVVjc1MwRkJTeXhOUVVGNlFpeEZRVUZwUXl4RFFVRkRMRVZCUVd4RExFVkJRWE5ETzBGQlEzQkRMRWxCUVVFc1QwRkJUeXhIUVVOTUxFdEJRVXNzUTBGQlRDeEZRVUZSTEdkQ1FVRlNMRU5CUVhsQ0xFOUJRWHBDTEVWQlFXdERMRTlCUVd4RExFTkJSRXNzUjBGRlRDeExRVUZMTEVOQlFVd3NSVUZCVVN4TFFVRlNMRVZCUmtZN1FVRkhSRHM3UVVGRlJDeFRRVUZQTEVsQlFWQTdRVUZEUkN4RFFWSkVPenM3T3pzN096czdPenM3UVVOMlFrRTdPMEZCUTBFN08yVkJSV1VzYjBKQlFVMDdRVUZEYmtJc1RVRkJTU3dyUWtGQmFVSXNTMEZCY2tJc1JVRkJORUk3UVVGRE1VSXNVVUZCVFN4WFFVRlhMRWRCUVVjc1VVRkJVU3hEUVVGRExHZENRVUZVTEVOQlFUQkNMSGxDUVVFeFFpeERRVUZ3UWp0QlFVVkJMRWxCUVVFc1YwRkJWeXhEUVVGRExFOUJRVm9zUTBGQmIwSXNWVUZCUXl4SlFVRkVMRVZCUVZVN1FVRkROVUlzVlVGQlRTeGhRVUZoTEVkQlFVY3NTVUZCU1N4RFFVRkRMRmxCUVV3c1EwRkJhMElzYTBKQlFXeENMRU5CUVhSQ08wRkJRMEVzVFVGQlFTeEpRVUZKTEVOQlFVTXNXVUZCVEN4RFFVRnJRaXhUUVVGc1FpeEZRVUUyUWl4aFFVRTNRanRCUVVORUxFdEJTRVE3UVVGSlJDeEhRVkpyUWl4RFFWVnVRanM3TzBGQlEwRXNUVUZCVFN4blFrRkJaMElzUjBGQlJ5eEpRVUZKTEhkQ1FVRktMRU5CUVdFN1FVRkRjRU1zU1VGQlFTeHBRa0ZCYVVJc1JVRkJSVHRCUVVScFFpeEhRVUZpTEVOQlFYcENPMEZCUjBRc1F6czdPenM3T3pzN096czdPenRCUTJwQ1JEczdRVUZIUVN4alFVRkZMRk5CUVVZc1EwRkJXU3hIUVVGYU8wRkJRVUVzY1VaQlFXdENMR2xDUVVGbExFZEJRV1k3UVVGQlFUdEJRVUZCTzBGQlFVRTdRVUZCUVR0QlFVRkJPMEZCUVVFN1FVRkJRVHRCUVVGdlFpeFpRVUZCTEdOQlFYQkNMREpFUVVGeFF5eE5RVUZ5UXp0QlFVRkJPMEZCUVVFc2JVSkJRMEVzUzBGQlN5eERRVUZETEVkQlFVUXNRMEZFVERzN1FVRkJRVHRCUVVOYUxGbEJRVUVzUjBGRVdUczdRVUZCUVN4blFrRkhXQ3hIUVVGSExFTkJRVU1zUlVGSVR6dEJRVUZCTzBGQlFVRTdRVUZCUVRzN1FVRkJRU3hyUWtGSFJ5eEpRVUZKTEV0QlFVb3NNa0pCUVRaQ0xFZEJRVGRDTEhWQ1FVRTJReXhIUVVGSExFTkJRVU1zVFVGQmFrUXNSVUZJU0RzN1FVRkJRVHRCUVVGQkxEQkNRVXRTTEdOQlRGRTdRVUZCUVN3MFEwRk5WQ3hOUVU1VExIVkNRVTlVTEUxQlVGTXNkMEpCVVZRc1RVRlNVenRCUVVGQk96dEJRVUZCTzBGQlFVRTdRVUZCUVN4dFFrRk5XU3hIUVVGSExFTkJRVU1zU1VGQlNpeEZRVTVhT3p0QlFVRkJPMEZCUVVFN08wRkJRVUU3UVVGQlFUdEJRVUZCTEcxQ1FVOVpMRWRCUVVjc1EwRkJReXhKUVVGS0xFVkJVRm83TzBGQlFVRTdRVUZCUVRzN1FVRkJRVHRCUVVGQk8wRkJRVUVzYlVKQlVWa3NSMEZCUnl4RFFVRkRMRWxCUVVvc1JVRlNXanM3UVVGQlFUdEJRVUZCT3p0QlFVRkJPMEZCUVVFN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUZCTEVkQlFXeENPenRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUZCT3p0QlFXRkJMR05CUVVVc1UwRkJSaXhEUVVGWkxFbEJRVm83UVVGQlFTeHpSa0ZCYlVJc2EwSkJRV1VzUjBGQlppeEZRVUZ2UWl4SlFVRndRanRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUZCTzBGQlFVRTdRVUZCUVR0QlFVRkJPMEZCUVRCQ0xGbEJRVUVzWTBGQk1VSXNPRVJCUVRKRExFMUJRVE5ETzBGQlFVRTdRVUZCUVN4dFFrRkRSQ3hMUVVGTExFTkJRVU1zUjBGQlJDeEZRVUZOTzBGQlEzcENMR05CUVVFc1RVRkJUU3hGUVVGRkxFMUJSR2xDTzBGQlJYcENMR05CUVVFc1NVRkJTU3hGUVVGRk8wRkJSbTFDTEdGQlFVNHNRMEZFU2pzN1FVRkJRVHRCUVVOaUxGbEJRVUVzUjBGRVlUdEJRVUZCTERKQ1FVMVVMR05CVGxNN1FVRkJRU3c0UTBGUFZpeE5RVkJWTEhkQ1FWRldMRTFCVWxVc2VVSkJVMVlzVFVGVVZUdEJRVUZCT3p0QlFVRkJPMEZCUVVFN1FVRkJRU3h0UWtGUFZ5eEhRVUZITEVOQlFVTXNTVUZCU2l4RlFWQllPenRCUVVGQk8wRkJRVUU3TzBGQlFVRTdRVUZCUVR0QlFVRkJMRzFDUVZGWExFZEJRVWNzUTBGQlF5eEpRVUZLTEVWQlVsZzdPMEZCUVVFN1FVRkJRVHM3UVVGQlFUdEJRVUZCTzBGQlFVRXNiVUpCVTFjc1IwRkJSeXhEUVVGRExFbEJRVW9zUlVGVVdEczdRVUZCUVR0QlFVRkJPenRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUZCTzBGQlFVRTdRVUZCUVR0QlFVRkJMRWRCUVc1Q096dEJRVUZCTzBGQlFVRTdRVUZCUVR0QlFVRkJPenM3T3p0QlEyaENRVHM3UVVGSFFTeERRVUZETEVOQlFVTXNaVUZCUkN4RFFVRkVMRU5CUVcxQ0xFdEJRVzVDTEVOQlFYbENPMEZCUVVFc1UwRkJUU3hEUVVGRExFTkJRVU1zWlVGQlJDeERRVUZFTEVOQlFXMUNMRmRCUVc1Q0xFTkJRemRDTzBGQlEwVXNTVUZCUVN4TFFVRkxMRVZCUVVVN1FVRkRUQ3hOUVVGQkxFdEJRVXNzUlVGQlJTeGhRVVJHTzBGQlJVd3NUVUZCUVN4SlFVRkpMRVZCUVVVN1FVRkdSQ3hMUVVSVU8wRkJTMFVzU1VGQlFTeEpRVUZKTEVWQlFVVTdRVUZEU2l4TlFVRkJMRXRCUVVzc1JVRkJSU3hEUVVSSU8wRkJSVW9zVFVGQlFTeFJRVUZSTEVWQlFVVXNRMEZEVWp0QlFVTkZMRkZCUVVFc1QwRkJUeXhGUVVGRkxFTkJRVU1zV1VGQlJDeEZRVUZsTEU5QlFXWXNRMEZFV0R0QlFVVkZMRkZCUVVFc1QwRkJUeXhGUVVGRkxFOUJSbGc3UVVGSFJTeFJRVUZCTEV0QlFVc3NSVUZCUlR0QlFVaFVMRTlCUkZFc1JVRk5VanRCUVVORkxGRkJRVUVzVDBGQlR5eEZRVUZGTEVOQlFVTXNZVUZCUkN4RlFVRm5RaXhQUVVGb1FpeERRVVJZTzBGQlJVVXNVVUZCUVN4UFFVRlBMRVZCUVVVc1RVRkdXRHRCUVVkRkxGRkJRVUVzVVVGQlVTeEZRVUZGTzBGQlFVRXNhVUpCUVUwc1MwRkJTeXhEUVVGRExFOUJRVVFzUTBGQldEdEJRVUZCTzBGQlNGb3NUMEZPVVN4RlFWZFNPMEZCUTBVc1VVRkJRU3hQUVVGUExFVkJRVVVzUTBGQlF5eGhRVUZFTEVOQlJGZzdRVUZGUlN4UlFVRkJMRTlCUVU4c1JVRkJSU3hUUVVaWU8wRkJSMFVzVVVGQlFTeFJRVUZSTEVWQlFVVXNiMEpCUVUwN1FVRkRaQ3hWUVVGQkxFdEJRVXNzUTBGQlF5eFRRVUZFTEVOQlFVdzdRVUZEUVN4VlFVRkJMRTlCUVU4c1EwRkJReXhIUVVGU0xFTkJRVmtzVTBGQldqdEJRVU5FTzBGQlRrZ3NUMEZZVVR0QlFVWk9PMEZCVEZJc1IwRkVOa0lzUTBGQlRqdEJRVUZCTEVOQlFYcENPMEZCYVVOQkxFTkJRVU1zUTBGQlF5eG5Ra0ZCUkN4RFFVRkVMRU5CUVc5Q0xFdEJRWEJDTEVOQlFUQkNPMEZCUVVFc1UwRkJUU3hEUVVGRExFTkJRVU1zWjBKQlFVUXNRMEZCUkN4RFFVRnZRaXhYUVVGd1FpeERRVU01UWp0QlFVTkZMRWxCUVVFc1MwRkJTeXhGUVVGRk8wRkJRMHdzVFVGQlFTeExRVUZMTEVWQlFVVXNZMEZFUmp0QlFVVk1MRTFCUVVFc1NVRkJTU3hGUVVGRk8wRkJSa1FzUzBGRVZEdEJRVXRGTEVsQlFVRXNTVUZCU1N4RlFVRkZPMEZCUTBvc1RVRkJRU3hMUVVGTExFVkJRVVVzUTBGRVNEdEJRVVZLTEUxQlFVRXNVVUZCVVN4RlFVRkZMRU5CUTFJN1FVRkRSU3hSUVVGQkxFOUJRVThzUlVGQlJTeERRVUZETEZsQlFVUXNSVUZCWlN4UFFVRm1MRU5CUkZnN1FVRkZSU3hSUVVGQkxFOUJRVThzUlVGQlJTeFBRVVpZTzBGQlIwVXNVVUZCUVN4TFFVRkxMRVZCUVVVN1FVRklWQ3hQUVVSUkxFVkJUVkk3UVVGRFJTeFJRVUZCTEU5QlFVOHNSVUZCUlN4RFFVRkRMRlZCUVVRc1JVRkJZU3hQUVVGaUxFTkJSRmc3UVVGRlJTeFJRVUZCTEU5QlFVOHNSVUZCUlN4WFFVWllPMEZCUjBVc1VVRkJRU3hSUVVGUkxFVkJRVVVzYjBKQlFVMDdRVUZEWkN4VlFVRkJMRU5CUVVNc1EwRkJReXhYUVVGRUxFTkJRVVFzUTBGQlpTeEZRVUZtTEVOQlFXdENMRTlCUVd4Q0xFVkJRVEpDTEZsQlFVMDdRVUZETDBJc1dVRkJRU3hEUVVGRExFTkJRVU1zWjBKQlFVUXNRMEZCUkN4RFFVRnZRaXhSUVVGd1FpeERRVUUyUWl4WlFVRTNRanRCUVVOQkxGbEJRVUVzUTBGQlF5eERRVUZETEdWQlFVUXNRMEZCUkN4RFFVRnRRaXhSUVVGdVFpeERRVUUwUWl4aFFVRTFRanRCUVVOQkxGbEJRVUVzUTBGQlF5eERRVUZETEdGQlFVUXNRMEZCUkN4RFFVRnBRaXhSUVVGcVFpeERRVUV3UWl4aFFVRXhRanRCUVVOQkxGbEJRVUVzUTBGQlF5eERRVUZETEhWQ1FVRkVMRU5CUVVRc1EwRkJNa0lzVVVGQk0wSXNRMEZCYjBNc1lVRkJjRU03UVVGRFJDeFhRVXhFTzBGQlRVUTdRVUZXU0N4UFFVNVJPMEZCUms0N1FVRk1VaXhIUVVRNFFpeERRVUZPTzBGQlFVRXNRMEZCTVVJN1FVRXJRa0VzUTBGQlF5eERRVUZETEhGQ1FVRkVMRU5CUVVRc1EwRkJlVUlzVTBGQmVrSXNRMEZCYlVNc05FSkJRVzVETEVWQlFXbEZMRFJDUVVGcVJUdEJRVVZCTEVOQlFVTXNSMEZCUnl4SFFVRktMRU5CUVZFc2EwTkJRVklzUlVGRFJ5eEpRVVJJTEVOQlExRXNWVUZCUVN4SFFVRkhPMEZCUVVFc1UwRkJTU3hQUVVGUExFTkJRVU1zUjBGQlVpeERRVUZaTEVkQlFWb3NRMEZCU2p0QlFVRkJMRU5CUkZnaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWhtZFc1amRHbHZiaWdwZTJaMWJtTjBhVzl1SUhJb1pTeHVMSFFwZTJaMWJtTjBhVzl1SUc4b2FTeG1LWHRwWmlnaGJsdHBYU2w3YVdZb0lXVmJhVjBwZTNaaGNpQmpQVndpWm5WdVkzUnBiMjVjSWowOWRIbHdaVzltSUhKbGNYVnBjbVVtSm5KbGNYVnBjbVU3YVdZb0lXWW1KbU1wY21WMGRYSnVJR01vYVN3aE1DazdhV1lvZFNseVpYUjFjbTRnZFNocExDRXdLVHQyWVhJZ1lUMXVaWGNnUlhKeWIzSW9YQ0pEWVc1dWIzUWdabWx1WkNCdGIyUjFiR1VnSjF3aUsya3JYQ0luWENJcE8zUm9jbTkzSUdFdVkyOWtaVDFjSWsxUFJGVk1SVjlPVDFSZlJrOVZUa1JjSWl4aGZYWmhjaUJ3UFc1YmFWMDllMlY0Y0c5eWRITTZlMzE5TzJWYmFWMWJNRjB1WTJGc2JDaHdMbVY0Y0c5eWRITXNablZ1WTNScGIyNG9jaWw3ZG1GeUlHNDlaVnRwWFZzeFhWdHlYVHR5WlhSMWNtNGdieWh1Zkh4eUtYMHNjQ3h3TG1WNGNHOXlkSE1zY2l4bExHNHNkQ2w5Y21WMGRYSnVJRzViYVYwdVpYaHdiM0owYzMxbWIzSW9kbUZ5SUhVOVhDSm1kVzVqZEdsdmJsd2lQVDEwZVhCbGIyWWdjbVZ4ZFdseVpTWW1jbVZ4ZFdseVpTeHBQVEE3YVR4MExteGxibWQwYUR0cEt5c3BieWgwVzJsZEtUdHlaWFIxY200Z2IzMXlaWFIxY200Z2NuMHBLQ2tpTENKbWRXNWpkR2x2YmlCZllYSnlZWGxNYVd0bFZHOUJjbkpoZVNoaGNuSXNJR3hsYmlrZ2UxeHVJQ0JwWmlBb2JHVnVJRDA5SUc1MWJHd2dmSHdnYkdWdUlENGdZWEp5TG14bGJtZDBhQ2tnYkdWdUlEMGdZWEp5TG14bGJtZDBhRHRjYmx4dUlDQm1iM0lnS0haaGNpQnBJRDBnTUN3Z1lYSnlNaUE5SUc1bGR5QkJjbkpoZVNoc1pXNHBPeUJwSUR3Z2JHVnVPeUJwS3lzcElIdGNiaUFnSUNCaGNuSXlXMmxkSUQwZ1lYSnlXMmxkTzF4dUlDQjlYRzVjYmlBZ2NtVjBkWEp1SUdGeWNqSTdYRzU5WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1gyRnljbUY1VEdsclpWUnZRWEp5WVhrc0lHMXZaSFZzWlM1bGVIQnZjblJ6TGw5ZlpYTk5iMlIxYkdVZ1BTQjBjblZsTENCdGIyUjFiR1V1Wlhod2IzSjBjMXRjSW1SbFptRjFiSFJjSWwwZ1BTQnRiMlIxYkdVdVpYaHdiM0owY3pzaUxDSjJZWElnWVhKeVlYbE1hV3RsVkc5QmNuSmhlU0E5SUhKbGNYVnBjbVVvWENJdUwyRnljbUY1VEdsclpWUnZRWEp5WVhrdWFuTmNJaWs3WEc1Y2JtWjFibU4wYVc5dUlGOWhjbkpoZVZkcGRHaHZkWFJJYjJ4bGN5aGhjbklwSUh0Y2JpQWdhV1lnS0VGeWNtRjVMbWx6UVhKeVlYa29ZWEp5S1NrZ2NtVjBkWEp1SUdGeWNtRjVUR2xyWlZSdlFYSnlZWGtvWVhKeUtUdGNibjFjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCZllYSnlZWGxYYVhSb2IzVjBTRzlzWlhNc0lHMXZaSFZzWlM1bGVIQnZjblJ6TGw5ZlpYTk5iMlIxYkdVZ1BTQjBjblZsTENCdGIyUjFiR1V1Wlhod2IzSjBjMXRjSW1SbFptRjFiSFJjSWwwZ1BTQnRiMlIxYkdVdVpYaHdiM0owY3pzaUxDSm1kVzVqZEdsdmJpQmhjM2x1WTBkbGJtVnlZWFJ2Y2xOMFpYQW9aMlZ1TENCeVpYTnZiSFpsTENCeVpXcGxZM1FzSUY5dVpYaDBMQ0JmZEdoeWIzY3NJR3RsZVN3Z1lYSm5LU0I3WEc0Z0lIUnllU0I3WEc0Z0lDQWdkbUZ5SUdsdVptOGdQU0JuWlc1YmEyVjVYU2hoY21jcE8xeHVJQ0FnSUhaaGNpQjJZV3gxWlNBOUlHbHVabTh1ZG1Gc2RXVTdYRzRnSUgwZ1kyRjBZMmdnS0dWeWNtOXlLU0I3WEc0Z0lDQWdjbVZxWldOMEtHVnljbTl5S1R0Y2JpQWdJQ0J5WlhSMWNtNDdYRzRnSUgxY2JseHVJQ0JwWmlBb2FXNW1ieTVrYjI1bEtTQjdYRzRnSUNBZ2NtVnpiMngyWlNoMllXeDFaU2s3WEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnVUhKdmJXbHpaUzV5WlhOdmJIWmxLSFpoYkhWbEtTNTBhR1Z1S0Y5dVpYaDBMQ0JmZEdoeWIzY3BPMXh1SUNCOVhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5aGMzbHVZMVJ2UjJWdVpYSmhkRzl5S0dadUtTQjdYRzRnSUhKbGRIVnliaUJtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnZG1GeUlITmxiR1lnUFNCMGFHbHpMRnh1SUNBZ0lDQWdJQ0JoY21keklEMGdZWEpuZFcxbGJuUnpPMXh1SUNBZ0lISmxkSFZ5YmlCdVpYY2dVSEp2YldselpTaG1kVzVqZEdsdmJpQW9jbVZ6YjJ4MlpTd2djbVZxWldOMEtTQjdYRzRnSUNBZ0lDQjJZWElnWjJWdUlEMGdabTR1WVhCd2JIa29jMlZzWml3Z1lYSm5jeWs3WEc1Y2JpQWdJQ0FnSUdaMWJtTjBhVzl1SUY5dVpYaDBLSFpoYkhWbEtTQjdYRzRnSUNBZ0lDQWdJR0Z6ZVc1alIyVnVaWEpoZEc5eVUzUmxjQ2huWlc0c0lISmxjMjlzZG1Vc0lISmxhbVZqZEN3Z1gyNWxlSFFzSUY5MGFISnZkeXdnWENKdVpYaDBYQ0lzSUhaaGJIVmxLVHRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnWm5WdVkzUnBiMjRnWDNSb2NtOTNLR1Z5Y2lrZ2UxeHVJQ0FnSUNBZ0lDQmhjM2x1WTBkbGJtVnlZWFJ2Y2xOMFpYQW9aMlZ1TENCeVpYTnZiSFpsTENCeVpXcGxZM1FzSUY5dVpYaDBMQ0JmZEdoeWIzY3NJRndpZEdoeWIzZGNJaXdnWlhKeUtUdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdYMjVsZUhRb2RXNWtaV1pwYm1Wa0tUdGNiaUFnSUNCOUtUdGNiaUFnZlR0Y2JuMWNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JmWVhONWJtTlViMGRsYm1WeVlYUnZjaXdnYlc5a2RXeGxMbVY0Y0c5eWRITXVYMTlsYzAxdlpIVnNaU0E5SUhSeWRXVXNJRzF2WkhWc1pTNWxlSEJ2Y25Selcxd2laR1ZtWVhWc2RGd2lYU0E5SUcxdlpIVnNaUzVsZUhCdmNuUnpPeUlzSW1aMWJtTjBhVzl1SUY5cGJuUmxjbTl3VW1WeGRXbHlaVVJsWm1GMWJIUW9iMkpxS1NCN1hHNGdJSEpsZEhWeWJpQnZZbW9nSmlZZ2IySnFMbDlmWlhOTmIyUjFiR1VnUHlCdlltb2dPaUI3WEc0Z0lDQWdYQ0prWldaaGRXeDBYQ0k2SUc5aWFseHVJQ0I5TzF4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRc0lHMXZaSFZzWlM1bGVIQnZjblJ6TGw5ZlpYTk5iMlIxYkdVZ1BTQjBjblZsTENCdGIyUjFiR1V1Wlhod2IzSjBjMXRjSW1SbFptRjFiSFJjSWwwZ1BTQnRiMlIxYkdVdVpYaHdiM0owY3pzaUxDSm1kVzVqZEdsdmJpQmZhWFJsY21GaWJHVlViMEZ5Y21GNUtHbDBaWElwSUh0Y2JpQWdhV1lnS0hSNWNHVnZaaUJUZVcxaWIyd2dJVDA5SUZ3aWRXNWtaV1pwYm1Wa1hDSWdKaVlnYVhSbGNsdFRlVzFpYjJ3dWFYUmxjbUYwYjNKZElDRTlJRzUxYkd3Z2ZId2dhWFJsY2x0Y0lrQkFhWFJsY21GMGIzSmNJbDBnSVQwZ2JuVnNiQ2tnY21WMGRYSnVJRUZ5Y21GNUxtWnliMjBvYVhSbGNpazdYRzU5WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1gybDBaWEpoWW14bFZHOUJjbkpoZVN3Z2JXOWtkV3hsTG1WNGNHOXlkSE11WDE5bGMwMXZaSFZzWlNBOUlIUnlkV1VzSUcxdlpIVnNaUzVsZUhCdmNuUnpXMXdpWkdWbVlYVnNkRndpWFNBOUlHMXZaSFZzWlM1bGVIQnZjblJ6T3lJc0ltWjFibU4wYVc5dUlGOXViMjVKZEdWeVlXSnNaVk53Y21WaFpDZ3BJSHRjYmlBZ2RHaHliM2NnYm1WM0lGUjVjR1ZGY25KdmNpaGNJa2x1ZG1Gc2FXUWdZWFIwWlcxd2RDQjBieUJ6Y0hKbFlXUWdibTl1TFdsMFpYSmhZbXhsSUdsdWMzUmhibU5sTGx4Y2JrbHVJRzl5WkdWeUlIUnZJR0psSUdsMFpYSmhZbXhsTENCdWIyNHRZWEp5WVhrZ2IySnFaV04wY3lCdGRYTjBJR2hoZG1VZ1lTQmJVM2x0WW05c0xtbDBaWEpoZEc5eVhTZ3BJRzFsZEdodlpDNWNJaWs3WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdYMjV2YmtsMFpYSmhZbXhsVTNCeVpXRmtMQ0J0YjJSMWJHVXVaWGh3YjNKMGN5NWZYMlZ6VFc5a2RXeGxJRDBnZEhKMVpTd2diVzlrZFd4bExtVjRjRzl5ZEhOYlhDSmtaV1poZFd4MFhDSmRJRDBnYlc5a2RXeGxMbVY0Y0c5eWRITTdJaXdpZG1GeUlHRnljbUY1VjJsMGFHOTFkRWh2YkdWeklEMGdjbVZ4ZFdseVpTaGNJaTR2WVhKeVlYbFhhWFJvYjNWMFNHOXNaWE11YW5OY0lpazdYRzVjYm5aaGNpQnBkR1Z5WVdKc1pWUnZRWEp5WVhrZ1BTQnlaWEYxYVhKbEtGd2lMaTlwZEdWeVlXSnNaVlJ2UVhKeVlYa3Vhbk5jSWlrN1hHNWNiblpoY2lCMWJuTjFjSEJ2Y25SbFpFbDBaWEpoWW14bFZHOUJjbkpoZVNBOUlISmxjWFZwY21Vb1hDSXVMM1Z1YzNWd2NHOXlkR1ZrU1hSbGNtRmliR1ZVYjBGeWNtRjVMbXB6WENJcE8xeHVYRzUyWVhJZ2JtOXVTWFJsY21GaWJHVlRjSEpsWVdRZ1BTQnlaWEYxYVhKbEtGd2lMaTl1YjI1SmRHVnlZV0pzWlZOd2NtVmhaQzVxYzF3aUtUdGNibHh1Wm5WdVkzUnBiMjRnWDNSdlEyOXVjM1Z0WVdKc1pVRnljbUY1S0dGeWNpa2dlMXh1SUNCeVpYUjFjbTRnWVhKeVlYbFhhWFJvYjNWMFNHOXNaWE1vWVhKeUtTQjhmQ0JwZEdWeVlXSnNaVlJ2UVhKeVlYa29ZWEp5S1NCOGZDQjFibk4xY0hCdmNuUmxaRWwwWlhKaFlteGxWRzlCY25KaGVTaGhjbklwSUh4OElHNXZia2wwWlhKaFlteGxVM0J5WldGa0tDazdYRzU5WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1gzUnZRMjl1YzNWdFlXSnNaVUZ5Y21GNUxDQnRiMlIxYkdVdVpYaHdiM0owY3k1ZlgyVnpUVzlrZFd4bElEMGdkSEoxWlN3Z2JXOWtkV3hsTG1WNGNHOXlkSE5iWENKa1pXWmhkV3gwWENKZElEMGdiVzlrZFd4bExtVjRjRzl5ZEhNN0lpd2lkbUZ5SUdGeWNtRjVUR2xyWlZSdlFYSnlZWGtnUFNCeVpYRjFhWEpsS0Z3aUxpOWhjbkpoZVV4cGEyVlViMEZ5Y21GNUxtcHpYQ0lwTzF4dVhHNW1kVzVqZEdsdmJpQmZkVzV6ZFhCd2IzSjBaV1JKZEdWeVlXSnNaVlJ2UVhKeVlYa29ieXdnYldsdVRHVnVLU0I3WEc0Z0lHbG1JQ2doYnlrZ2NtVjBkWEp1TzF4dUlDQnBaaUFvZEhsd1pXOW1JRzhnUFQwOUlGd2ljM1J5YVc1blhDSXBJSEpsZEhWeWJpQmhjbkpoZVV4cGEyVlViMEZ5Y21GNUtHOHNJRzFwYmt4bGJpazdYRzRnSUhaaGNpQnVJRDBnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzUwYjFOMGNtbHVaeTVqWVd4c0tHOHBMbk5zYVdObEtEZ3NJQzB4S1R0Y2JpQWdhV1lnS0c0Z1BUMDlJRndpVDJKcVpXTjBYQ0lnSmlZZ2J5NWpiMjV6ZEhKMVkzUnZjaWtnYmlBOUlHOHVZMjl1YzNSeWRXTjBiM0l1Ym1GdFpUdGNiaUFnYVdZZ0tHNGdQVDA5SUZ3aVRXRndYQ0lnZkh3Z2JpQTlQVDBnWENKVFpYUmNJaWtnY21WMGRYSnVJRUZ5Y21GNUxtWnliMjBvYnlrN1hHNGdJR2xtSUNodUlEMDlQU0JjSWtGeVozVnRaVzUwYzF3aUlIeDhJQzllS0Q4NlZXbDhTU2x1ZENnL09qaDhNVFo4TXpJcEtEODZRMnhoYlhCbFpDay9RWEp5WVhra0x5NTBaWE4wS0c0cEtTQnlaWFIxY200Z1lYSnlZWGxNYVd0bFZHOUJjbkpoZVNodkxDQnRhVzVNWlc0cE8xeHVmVnh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUY5MWJuTjFjSEJ2Y25SbFpFbDBaWEpoWW14bFZHOUJjbkpoZVN3Z2JXOWtkV3hsTG1WNGNHOXlkSE11WDE5bGMwMXZaSFZzWlNBOUlIUnlkV1VzSUcxdlpIVnNaUzVsZUhCdmNuUnpXMXdpWkdWbVlYVnNkRndpWFNBOUlHMXZaSFZzWlM1bGVIQnZjblJ6T3lJc0ltMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2NtVnhkV2x5WlNoY0luSmxaMlZ1WlhKaGRHOXlMWEoxYm5ScGJXVmNJaWs3WEc0aUxDSW9ablZ1WTNScGIyNGdLR2RzYjJKaGJDd2dabUZqZEc5eWVTa2dlMXh1SUNCMGVYQmxiMllnWlhod2IzSjBjeUE5UFQwZ0oyOWlhbVZqZENjZ0ppWWdkSGx3Wlc5bUlHMXZaSFZzWlNBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NnUHlCbVlXTjBiM0o1S0NrZ09seHVJQ0IwZVhCbGIyWWdaR1ZtYVc1bElEMDlQU0FuWm5WdVkzUnBiMjRuSUNZbUlHUmxabWx1WlM1aGJXUWdQeUJrWldacGJtVW9abUZqZEc5eWVTa2dPbHh1SUNBb1ptRmpkRzl5ZVNncEtUdGNibjBvZEdocGN5d2dLR1oxYm1OMGFXOXVJQ2dwSUhzZ0ozVnpaU0J6ZEhKcFkzUW5PMXh1WEc0Z0lDOHFLbHh1SUNBZ0tpQkJjSEJzYVdWeklIUm9aU0E2Wm05amRYTXRkbWx6YVdKc1pTQndiMng1Wm1sc2JDQmhkQ0IwYUdVZ1oybDJaVzRnYzJOdmNHVXVYRzRnSUNBcUlFRWdjMk52Y0dVZ2FXNGdkR2hwY3lCallYTmxJR2x6SUdWcGRHaGxjaUIwYUdVZ2RHOXdMV3hsZG1Wc0lFUnZZM1Z0Wlc1MElHOXlJR0VnVTJoaFpHOTNJRkp2YjNRdVhHNGdJQ0FxWEc0Z0lDQXFJRUJ3WVhKaGJTQjdLRVJ2WTNWdFpXNTBmRk5vWVdSdmQxSnZiM1FwZlNCelkyOXdaVnh1SUNBZ0tpQkFjMlZsSUdoMGRIQnpPaTh2WjJsMGFIVmlMbU52YlM5WFNVTkhMMlp2WTNWekxYWnBjMmxpYkdWY2JpQWdJQ292WEc0Z0lHWjFibU4wYVc5dUlHRndjR3g1Um05amRYTldhWE5wWW14bFVHOXNlV1pwYkd3b2MyTnZjR1VwSUh0Y2JpQWdJQ0IyWVhJZ2FHRmtTMlY1WW05aGNtUkZkbVZ1ZENBOUlIUnlkV1U3WEc0Z0lDQWdkbUZ5SUdoaFpFWnZZM1Z6Vm1semFXSnNaVkpsWTJWdWRHeDVJRDBnWm1Gc2MyVTdYRzRnSUNBZ2RtRnlJR2hoWkVadlkzVnpWbWx6YVdKc1pWSmxZMlZ1ZEd4NVZHbHRaVzkxZENBOUlHNTFiR3c3WEc1Y2JpQWdJQ0IyWVhJZ2FXNXdkWFJVZVhCbGMwRnNiRzkzYkdsemRDQTlJSHRjYmlBZ0lDQWdJSFJsZUhRNklIUnlkV1VzWEc0Z0lDQWdJQ0J6WldGeVkyZzZJSFJ5ZFdVc1hHNGdJQ0FnSUNCMWNtdzZJSFJ5ZFdVc1hHNGdJQ0FnSUNCMFpXdzZJSFJ5ZFdVc1hHNGdJQ0FnSUNCbGJXRnBiRG9nZEhKMVpTeGNiaUFnSUNBZ0lIQmhjM04zYjNKa09pQjBjblZsTEZ4dUlDQWdJQ0FnYm5WdFltVnlPaUIwY25WbExGeHVJQ0FnSUNBZ1pHRjBaVG9nZEhKMVpTeGNiaUFnSUNBZ0lHMXZiblJvT2lCMGNuVmxMRnh1SUNBZ0lDQWdkMlZsYXpvZ2RISjFaU3hjYmlBZ0lDQWdJSFJwYldVNklIUnlkV1VzWEc0Z0lDQWdJQ0JrWVhSbGRHbHRaVG9nZEhKMVpTeGNiaUFnSUNBZ0lDZGtZWFJsZEdsdFpTMXNiMk5oYkNjNklIUnlkV1ZjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nU0dWc2NHVnlJR1oxYm1OMGFXOXVJR1p2Y2lCc1pXZGhZM2tnWW5KdmQzTmxjbk1nWVc1a0lHbG1jbUZ0WlhNZ2QyaHBZMmdnYzI5dFpYUnBiV1Z6SUdadlkzVnpYRzRnSUNBZ0lDb2daV3hsYldWdWRITWdiR2xyWlNCa2IyTjFiV1Z1ZEN3Z1ltOWtlU3dnWVc1a0lHNXZiaTFwYm5SbGNtRmpkR2wyWlNCVFZrY3VYRzRnSUNBZ0lDb2dRSEJoY21GdElIdEZiR1Z0Wlc1MGZTQmxiRnh1SUNBZ0lDQXFMMXh1SUNBZ0lHWjFibU4wYVc5dUlHbHpWbUZzYVdSR2IyTjFjMVJoY21kbGRDaGxiQ2tnZTF4dUlDQWdJQ0FnYVdZZ0tGeHVJQ0FnSUNBZ0lDQmxiQ0FtSmx4dUlDQWdJQ0FnSUNCbGJDQWhQVDBnWkc5amRXMWxiblFnSmlaY2JpQWdJQ0FnSUNBZ1pXd3VibTlrWlU1aGJXVWdJVDA5SUNkSVZFMU1KeUFtSmx4dUlDQWdJQ0FnSUNCbGJDNXViMlJsVG1GdFpTQWhQVDBnSjBKUFJGa25JQ1ltWEc0Z0lDQWdJQ0FnSUNkamJHRnpjMHhwYzNRbklHbHVJR1ZzSUNZbVhHNGdJQ0FnSUNBZ0lDZGpiMjUwWVdsdWN5Y2dhVzRnWld3dVkyeGhjM05NYVhOMFhHNGdJQ0FnSUNBcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIUnlkV1U3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0J5WlhSMWNtNGdabUZzYzJVN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1EyOXRjSFYwWlhNZ2QyaGxkR2hsY2lCMGFHVWdaMmwyWlc0Z1pXeGxiV1Z1ZENCemFHOTFiR1FnWVhWMGIyMWhkR2xqWVd4c2VTQjBjbWxuWjJWeUlIUm9aVnh1SUNBZ0lDQXFJR0JtYjJOMWN5MTJhWE5wWW14bFlDQmpiR0Z6Y3lCaVpXbHVaeUJoWkdSbFpDd2dhUzVsTGlCM2FHVjBhR1Z5SUdsMElITm9iM1ZzWkNCaGJIZGhlWE1nYldGMFkyaGNiaUFnSUNBZ0tpQmdPbVp2WTNWekxYWnBjMmxpYkdWZ0lIZG9aVzRnWm05amRYTmxaQzVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMFZzWlcxbGJuUjlJR1ZzWEc0Z0lDQWdJQ29nUUhKbGRIVnliaUI3WW05dmJHVmhibjFjYmlBZ0lDQWdLaTljYmlBZ0lDQm1kVzVqZEdsdmJpQm1iMk4xYzFSeWFXZG5aWEp6UzJWNVltOWhjbVJOYjJSaGJHbDBlU2hsYkNrZ2UxeHVJQ0FnSUNBZ2RtRnlJSFI1Y0dVZ1BTQmxiQzUwZVhCbE8xeHVJQ0FnSUNBZ2RtRnlJSFJoWjA1aGJXVWdQU0JsYkM1MFlXZE9ZVzFsTzF4dVhHNGdJQ0FnSUNCcFppQW9kR0ZuVG1GdFpTQTlQVDBnSjBsT1VGVlVKeUFtSmlCcGJuQjFkRlI1Y0dWelFXeHNiM2RzYVhOMFczUjVjR1ZkSUNZbUlDRmxiQzV5WldGa1QyNXNlU2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnZEhKMVpUdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdhV1lnS0hSaFowNWhiV1VnUFQwOUlDZFVSVmhVUVZKRlFTY2dKaVlnSVdWc0xuSmxZV1JQYm14NUtTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjBjblZsTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCcFppQW9aV3d1YVhORGIyNTBaVzUwUldScGRHRmliR1VwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSeWRXVTdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCQlpHUWdkR2hsSUdCbWIyTjFjeTEyYVhOcFlteGxZQ0JqYkdGemN5QjBieUIwYUdVZ1oybDJaVzRnWld4bGJXVnVkQ0JwWmlCcGRDQjNZWE1nYm05MElHRmtaR1ZrSUdKNVhHNGdJQ0FnSUNvZ2RHaGxJR0YxZEdodmNpNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UwVnNaVzFsYm5SOUlHVnNYRzRnSUNBZ0lDb3ZYRzRnSUNBZ1puVnVZM1JwYjI0Z1lXUmtSbTlqZFhOV2FYTnBZbXhsUTJ4aGMzTW9aV3dwSUh0Y2JpQWdJQ0FnSUdsbUlDaGxiQzVqYkdGemMweHBjM1F1WTI5dWRHRnBibk1vSjJadlkzVnpMWFpwYzJsaWJHVW5LU2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0JsYkM1amJHRnpjMHhwYzNRdVlXUmtLQ2RtYjJOMWN5MTJhWE5wWW14bEp5azdYRzRnSUNBZ0lDQmxiQzV6WlhSQmRIUnlhV0oxZEdVb0oyUmhkR0V0Wm05amRYTXRkbWx6YVdKc1pTMWhaR1JsWkNjc0lDY25LVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJTWlcxdmRtVWdkR2hsSUdCbWIyTjFjeTEyYVhOcFlteGxZQ0JqYkdGemN5Qm1jbTl0SUhSb1pTQm5hWFpsYmlCbGJHVnRaVzUwSUdsbUlHbDBJSGRoY3lCdWIzUmNiaUFnSUNBZ0tpQnZjbWxuYVc1aGJHeDVJR0ZrWkdWa0lHSjVJSFJvWlNCaGRYUm9iM0l1WEc0Z0lDQWdJQ29nUUhCaGNtRnRJSHRGYkdWdFpXNTBmU0JsYkZ4dUlDQWdJQ0FxTDF4dUlDQWdJR1oxYm1OMGFXOXVJSEpsYlc5MlpVWnZZM1Z6Vm1semFXSnNaVU5zWVhOektHVnNLU0I3WEc0Z0lDQWdJQ0JwWmlBb0lXVnNMbWhoYzBGMGRISnBZblYwWlNnblpHRjBZUzFtYjJOMWN5MTJhWE5wWW14bExXRmtaR1ZrSnlrcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ1pXd3VZMnhoYzNOTWFYTjBMbkpsYlc5MlpTZ25abTlqZFhNdGRtbHphV0pzWlNjcE8xeHVJQ0FnSUNBZ1pXd3VjbVZ0YjNabFFYUjBjbWxpZFhSbEtDZGtZWFJoTFdadlkzVnpMWFpwYzJsaWJHVXRZV1JrWldRbktUdGNiaUFnSUNCOVhHNWNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQkpaaUIwYUdVZ2JXOXpkQ0J5WldObGJuUWdkWE5sY2lCcGJuUmxjbUZqZEdsdmJpQjNZWE1nZG1saElIUm9aU0JyWlhsaWIyRnlaRHRjYmlBZ0lDQWdLaUJoYm1RZ2RHaGxJR3RsZVNCd2NtVnpjeUJrYVdRZ2JtOTBJR2x1WTJ4MVpHVWdZU0J0WlhSaExDQmhiSFF2YjNCMGFXOXVMQ0J2Y2lCamIyNTBjbTlzSUd0bGVUdGNiaUFnSUNBZ0tpQjBhR1Z1SUhSb1pTQnRiMlJoYkdsMGVTQnBjeUJyWlhsaWIyRnlaQzRnVDNSb1pYSjNhWE5sTENCMGFHVWdiVzlrWVd4cGRIa2dhWE1nYm05MElHdGxlV0p2WVhKa0xseHVJQ0FnSUNBcUlFRndjR3g1SUdCbWIyTjFjeTEyYVhOcFlteGxZQ0IwYnlCaGJua2dZM1Z5Y21WdWRDQmhZM1JwZG1VZ1pXeGxiV1Z1ZENCaGJtUWdhMlZsY0NCMGNtRmphMXh1SUNBZ0lDQXFJRzltSUc5MWNpQnJaWGxpYjJGeVpDQnRiMlJoYkdsMGVTQnpkR0YwWlNCM2FYUm9JR0JvWVdSTFpYbGliMkZ5WkVWMlpXNTBZQzVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMHRsZVdKdllYSmtSWFpsYm5SOUlHVmNiaUFnSUNBZ0tpOWNiaUFnSUNCbWRXNWpkR2x2YmlCdmJrdGxlVVJ2ZDI0b1pTa2dlMXh1SUNBZ0lDQWdhV1lnS0dVdWJXVjBZVXRsZVNCOGZDQmxMbUZzZEV0bGVTQjhmQ0JsTG1OMGNteExaWGtwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1TzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCcFppQW9hWE5XWVd4cFpFWnZZM1Z6VkdGeVoyVjBLSE5qYjNCbExtRmpkR2wyWlVWc1pXMWxiblFwS1NCN1hHNGdJQ0FnSUNBZ0lHRmtaRVp2WTNWelZtbHphV0pzWlVOc1lYTnpLSE5qYjNCbExtRmpkR2wyWlVWc1pXMWxiblFwTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCb1lXUkxaWGxpYjJGeVpFVjJaVzUwSUQwZ2RISjFaVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJKWmlCaGRDQmhibmtnY0c5cGJuUWdZU0IxYzJWeUlHTnNhV05yY3lCM2FYUm9JR0VnY0c5cGJuUnBibWNnWkdWMmFXTmxMQ0JsYm5OMWNtVWdkR2hoZENCM1pTQmphR0Z1WjJWY2JpQWdJQ0FnS2lCMGFHVWdiVzlrWVd4cGRIa2dZWGRoZVNCbWNtOXRJR3RsZVdKdllYSmtMbHh1SUNBZ0lDQXFJRlJvYVhNZ1lYWnZhV1J6SUhSb1pTQnphWFIxWVhScGIyNGdkMmhsY21VZ1lTQjFjMlZ5SUhCeVpYTnpaWE1nWVNCclpYa2diMjRnWVc0Z1lXeHlaV0ZrZVNCbWIyTjFjMlZrWEc0Z0lDQWdJQ29nWld4bGJXVnVkQ3dnWVc1a0lIUm9aVzRnWTJ4cFkydHpJRzl1SUdFZ1pHbG1abVZ5Wlc1MElHVnNaVzFsYm5Rc0lHWnZZM1Z6YVc1bklHbDBJSGRwZEdnZ1lWeHVJQ0FnSUNBcUlIQnZhVzUwYVc1bklHUmxkbWxqWlN3Z2QyaHBiR1VnZDJVZ2MzUnBiR3dnZEdocGJtc2dkMlVuY21VZ2FXNGdhMlY1WW05aGNtUWdiVzlrWVd4cGRIa3VYRzRnSUNBZ0lDb2dRSEJoY21GdElIdEZkbVZ1ZEgwZ1pWeHVJQ0FnSUNBcUwxeHVJQ0FnSUdaMWJtTjBhVzl1SUc5dVVHOXBiblJsY2tSdmQyNG9aU2tnZTF4dUlDQWdJQ0FnYUdGa1MyVjVZbTloY21SRmRtVnVkQ0E5SUdaaGJITmxPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRTl1SUdCbWIyTjFjMkFzSUdGa1pDQjBhR1VnWUdadlkzVnpMWFpwYzJsaWJHVmdJR05zWVhOeklIUnZJSFJvWlNCMFlYSm5aWFFnYVdZNlhHNGdJQ0FnSUNvZ0xTQjBhR1VnZEdGeVoyVjBJSEpsWTJWcGRtVmtJR1p2WTNWeklHRnpJR0VnY21WemRXeDBJRzltSUd0bGVXSnZZWEprSUc1aGRtbG5ZWFJwYjI0c0lHOXlYRzRnSUNBZ0lDb2dMU0IwYUdVZ1pYWmxiblFnZEdGeVoyVjBJR2x6SUdGdUlHVnNaVzFsYm5RZ2RHaGhkQ0IzYVd4c0lHeHBhMlZzZVNCeVpYRjFhWEpsSUdsdWRHVnlZV04wYVc5dVhHNGdJQ0FnSUNvZ0lDQjJhV0VnZEdobElHdGxlV0p2WVhKa0lDaGxMbWN1SUdFZ2RHVjRkQ0JpYjNncFhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUh0RmRtVnVkSDBnWlZ4dUlDQWdJQ0FxTDF4dUlDQWdJR1oxYm1OMGFXOXVJRzl1Um05amRYTW9aU2tnZTF4dUlDQWdJQ0FnTHk4Z1VISmxkbVZ1ZENCSlJTQm1jbTl0SUdadlkzVnphVzVuSUhSb1pTQmtiMk4xYldWdWRDQnZjaUJJVkUxTUlHVnNaVzFsYm5RdVhHNGdJQ0FnSUNCcFppQW9JV2x6Vm1Gc2FXUkdiMk4xYzFSaGNtZGxkQ2hsTG5SaGNtZGxkQ2twSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1TzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCcFppQW9hR0ZrUzJWNVltOWhjbVJGZG1WdWRDQjhmQ0JtYjJOMWMxUnlhV2RuWlhKelMyVjVZbTloY21STmIyUmhiR2wwZVNobExuUmhjbWRsZENrcElIdGNiaUFnSUNBZ0lDQWdZV1JrUm05amRYTldhWE5wWW14bFEyeGhjM01vWlM1MFlYSm5aWFFwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUU5dUlHQmliSFZ5WUN3Z2NtVnRiM1psSUhSb1pTQmdabTlqZFhNdGRtbHphV0pzWldBZ1kyeGhjM01nWm5KdmJTQjBhR1VnZEdGeVoyVjBMbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdSWFpsYm5SOUlHVmNiaUFnSUNBZ0tpOWNiaUFnSUNCbWRXNWpkR2x2YmlCdmJrSnNkWElvWlNrZ2UxeHVJQ0FnSUNBZ2FXWWdLQ0ZwYzFaaGJHbGtSbTlqZFhOVVlYSm5aWFFvWlM1MFlYSm5aWFFwS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2FXWWdLRnh1SUNBZ0lDQWdJQ0JsTG5SaGNtZGxkQzVqYkdGemMweHBjM1F1WTI5dWRHRnBibk1vSjJadlkzVnpMWFpwYzJsaWJHVW5LU0I4ZkZ4dUlDQWdJQ0FnSUNCbExuUmhjbWRsZEM1b1lYTkJkSFJ5YVdKMWRHVW9KMlJoZEdFdFptOWpkWE10ZG1semFXSnNaUzFoWkdSbFpDY3BYRzRnSUNBZ0lDQXBJSHRjYmlBZ0lDQWdJQ0FnTHk4Z1ZHOGdaR1YwWldOMElHRWdkR0ZpTDNkcGJtUnZkeUJ6ZDJsMFkyZ3NJSGRsSUd4dmIyc2dabTl5SUdFZ1lteDFjaUJsZG1WdWRDQm1iMnhzYjNkbFpGeHVJQ0FnSUNBZ0lDQXZMeUJ5WVhCcFpHeDVJR0o1SUdFZ2RtbHphV0pwYkdsMGVTQmphR0Z1WjJVdVhHNGdJQ0FnSUNBZ0lDOHZJRWxtSUhkbElHUnZiaWQwSUhObFpTQmhJSFpwYzJsaWFXeHBkSGtnWTJoaGJtZGxJSGRwZEdocGJpQXhNREJ0Y3l3Z2FYUW5jeUJ3Y205aVlXSnNlU0JoWEc0Z0lDQWdJQ0FnSUM4dklISmxaM1ZzWVhJZ1ptOWpkWE1nWTJoaGJtZGxMbHh1SUNBZ0lDQWdJQ0JvWVdSR2IyTjFjMVpwYzJsaWJHVlNaV05sYm5Sc2VTQTlJSFJ5ZFdVN1hHNGdJQ0FnSUNBZ0lIZHBibVJ2ZHk1amJHVmhjbFJwYldWdmRYUW9hR0ZrUm05amRYTldhWE5wWW14bFVtVmpaVzUwYkhsVWFXMWxiM1YwS1R0Y2JpQWdJQ0FnSUNBZ2FHRmtSbTlqZFhOV2FYTnBZbXhsVW1WalpXNTBiSGxVYVcxbGIzVjBJRDBnZDJsdVpHOTNMbk5sZEZScGJXVnZkWFFvWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdhR0ZrUm05amRYTldhWE5wWW14bFVtVmpaVzUwYkhrZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0FnSUNBZ2ZTd2dNVEF3S1R0Y2JpQWdJQ0FnSUNBZ2NtVnRiM1psUm05amRYTldhWE5wWW14bFEyeGhjM01vWlM1MFlYSm5aWFFwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVsbUlIUm9aU0IxYzJWeUlHTm9ZVzVuWlhNZ2RHRmljeXdnYTJWbGNDQjBjbUZqYXlCdlppQjNhR1YwYUdWeUlHOXlJRzV2ZENCMGFHVWdjSEpsZG1sdmRYTnNlVnh1SUNBZ0lDQXFJR1p2WTNWelpXUWdaV3hsYldWdWRDQm9ZV1FnTG1adlkzVnpMWFpwYzJsaWJHVXVYRzRnSUNBZ0lDb2dRSEJoY21GdElIdEZkbVZ1ZEgwZ1pWeHVJQ0FnSUNBcUwxeHVJQ0FnSUdaMWJtTjBhVzl1SUc5dVZtbHphV0pwYkdsMGVVTm9ZVzVuWlNobEtTQjdYRzRnSUNBZ0lDQnBaaUFvWkc5amRXMWxiblF1ZG1semFXSnBiR2wwZVZOMFlYUmxJRDA5UFNBbmFHbGtaR1Z1SnlrZ2UxeHVJQ0FnSUNBZ0lDQXZMeUJKWmlCMGFHVWdkR0ZpSUdKbFkyOXRaWE1nWVdOMGFYWmxJR0ZuWVdsdUxDQjBhR1VnWW5KdmQzTmxjaUIzYVd4c0lHaGhibVJzWlNCallXeHNhVzVuSUdadlkzVnpYRzRnSUNBZ0lDQWdJQzh2SUc5dUlIUm9aU0JsYkdWdFpXNTBJQ2hUWVdaaGNta2dZV04wZFdGc2JIa2dZMkZzYkhNZ2FYUWdkSGRwWTJVcExseHVJQ0FnSUNBZ0lDQXZMeUJKWmlCMGFHbHpJSFJoWWlCamFHRnVaMlVnWTJGMWMyVmtJR0VnWW14MWNpQnZiaUJoYmlCbGJHVnRaVzUwSUhkcGRHZ2dabTlqZFhNdGRtbHphV0pzWlN4Y2JpQWdJQ0FnSUNBZ0x5OGdjbVV0WVhCd2JIa2dkR2hsSUdOc1lYTnpJSGRvWlc0Z2RHaGxJSFZ6WlhJZ2MzZHBkR05vWlhNZ1ltRmpheUIwYnlCMGFHVWdkR0ZpTGx4dUlDQWdJQ0FnSUNCcFppQW9hR0ZrUm05amRYTldhWE5wWW14bFVtVmpaVzUwYkhrcElIdGNiaUFnSUNBZ0lDQWdJQ0JvWVdSTFpYbGliMkZ5WkVWMlpXNTBJRDBnZEhKMVpUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0JoWkdSSmJtbDBhV0ZzVUc5cGJuUmxjazF2ZG1WTWFYTjBaVzVsY25Nb0tUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNWNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQkJaR1FnWVNCbmNtOTFjQ0J2WmlCc2FYTjBaVzVsY25NZ2RHOGdaR1YwWldOMElIVnpZV2RsSUc5bUlHRnVlU0J3YjJsdWRHbHVaeUJrWlhacFkyVnpMbHh1SUNBZ0lDQXFJRlJvWlhObElHeHBjM1JsYm1WeWN5QjNhV3hzSUdKbElHRmtaR1ZrSUhkb1pXNGdkR2hsSUhCdmJIbG1hV3hzSUdacGNuTjBJR3h2WVdSekxDQmhibVFnWVc1NWRHbHRaVnh1SUNBZ0lDQXFJSFJvWlNCM2FXNWtiM2NnYVhNZ1lteDFjbkpsWkN3Z2MyOGdkR2hoZENCMGFHVjVJR0Z5WlNCaFkzUnBkbVVnZDJobGJpQjBhR1VnZDJsdVpHOTNJSEpsWjJGcGJuTmNiaUFnSUNBZ0tpQm1iMk4xY3k1Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0JtZFc1amRHbHZiaUJoWkdSSmJtbDBhV0ZzVUc5cGJuUmxjazF2ZG1WTWFYTjBaVzVsY25Nb0tTQjdYRzRnSUNBZ0lDQmtiMk4xYldWdWRDNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZHRiM1Z6WlcxdmRtVW5MQ0J2YmtsdWFYUnBZV3hRYjJsdWRHVnlUVzkyWlNrN1hHNGdJQ0FnSUNCa2IyTjFiV1Z1ZEM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkdGIzVnpaV1J2ZDI0bkxDQnZia2x1YVhScFlXeFFiMmx1ZEdWeVRXOTJaU2s3WEc0Z0lDQWdJQ0JrYjJOMWJXVnVkQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2R0YjNWelpYVndKeXdnYjI1SmJtbDBhV0ZzVUc5cGJuUmxjazF2ZG1VcE8xeHVJQ0FnSUNBZ1pHOWpkVzFsYm5RdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnbmNHOXBiblJsY20xdmRtVW5MQ0J2YmtsdWFYUnBZV3hRYjJsdWRHVnlUVzkyWlNrN1hHNGdJQ0FnSUNCa2IyTjFiV1Z1ZEM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0Nkd2IybHVkR1Z5Wkc5M2JpY3NJRzl1U1c1cGRHbGhiRkJ2YVc1MFpYSk5iM1psS1R0Y2JpQWdJQ0FnSUdSdlkzVnRaVzUwTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjNCdmFXNTBaWEoxY0Njc0lHOXVTVzVwZEdsaGJGQnZhVzUwWlhKTmIzWmxLVHRjYmlBZ0lDQWdJR1J2WTNWdFpXNTBMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KM1J2ZFdOb2JXOTJaU2NzSUc5dVNXNXBkR2xoYkZCdmFXNTBaWEpOYjNabEtUdGNiaUFnSUNBZ0lHUnZZM1Z0Wlc1MExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0ozUnZkV05vYzNSaGNuUW5MQ0J2YmtsdWFYUnBZV3hRYjJsdWRHVnlUVzkyWlNrN1hHNGdJQ0FnSUNCa2IyTjFiV1Z1ZEM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkMGIzVmphR1Z1WkNjc0lHOXVTVzVwZEdsaGJGQnZhVzUwWlhKTmIzWmxLVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQm1kVzVqZEdsdmJpQnlaVzF2ZG1WSmJtbDBhV0ZzVUc5cGJuUmxjazF2ZG1WTWFYTjBaVzVsY25Nb0tTQjdYRzRnSUNBZ0lDQmtiMk4xYldWdWRDNXlaVzF2ZG1WRmRtVnVkRXhwYzNSbGJtVnlLQ2R0YjNWelpXMXZkbVVuTENCdmJrbHVhWFJwWVd4UWIybHVkR1Z5VFc5MlpTazdYRzRnSUNBZ0lDQmtiMk4xYldWdWRDNXlaVzF2ZG1WRmRtVnVkRXhwYzNSbGJtVnlLQ2R0YjNWelpXUnZkMjRuTENCdmJrbHVhWFJwWVd4UWIybHVkR1Z5VFc5MlpTazdYRzRnSUNBZ0lDQmtiMk4xYldWdWRDNXlaVzF2ZG1WRmRtVnVkRXhwYzNSbGJtVnlLQ2R0YjNWelpYVndKeXdnYjI1SmJtbDBhV0ZzVUc5cGJuUmxjazF2ZG1VcE8xeHVJQ0FnSUNBZ1pHOWpkVzFsYm5RdWNtVnRiM1psUlhabGJuUk1hWE4wWlc1bGNpZ25jRzlwYm5SbGNtMXZkbVVuTENCdmJrbHVhWFJwWVd4UWIybHVkR1Z5VFc5MlpTazdYRzRnSUNBZ0lDQmtiMk4xYldWdWRDNXlaVzF2ZG1WRmRtVnVkRXhwYzNSbGJtVnlLQ2R3YjJsdWRHVnlaRzkzYmljc0lHOXVTVzVwZEdsaGJGQnZhVzUwWlhKTmIzWmxLVHRjYmlBZ0lDQWdJR1J2WTNWdFpXNTBMbkpsYlc5MlpVVjJaVzUwVEdsemRHVnVaWElvSjNCdmFXNTBaWEoxY0Njc0lHOXVTVzVwZEdsaGJGQnZhVzUwWlhKTmIzWmxLVHRjYmlBZ0lDQWdJR1J2WTNWdFpXNTBMbkpsYlc5MlpVVjJaVzUwVEdsemRHVnVaWElvSjNSdmRXTm9iVzkyWlNjc0lHOXVTVzVwZEdsaGJGQnZhVzUwWlhKTmIzWmxLVHRjYmlBZ0lDQWdJR1J2WTNWdFpXNTBMbkpsYlc5MlpVVjJaVzUwVEdsemRHVnVaWElvSjNSdmRXTm9jM1JoY25RbkxDQnZia2x1YVhScFlXeFFiMmx1ZEdWeVRXOTJaU2s3WEc0Z0lDQWdJQ0JrYjJOMWJXVnVkQzV5WlcxdmRtVkZkbVZ1ZEV4cGMzUmxibVZ5S0NkMGIzVmphR1Z1WkNjc0lHOXVTVzVwZEdsaGJGQnZhVzUwWlhKTmIzWmxLVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJYYUdWdUlIUm9aU0J3YjJ4bWVXbHNiQ0JtYVhKemRDQnNiMkZrY3l3Z1lYTnpkVzFsSUhSb1pTQjFjMlZ5SUdseklHbHVJR3RsZVdKdllYSmtJRzF2WkdGc2FYUjVMbHh1SUNBZ0lDQXFJRWxtSUdGdWVTQmxkbVZ1ZENCcGN5QnlaV05sYVhabFpDQm1jbTl0SUdFZ2NHOXBiblJwYm1jZ1pHVjJhV05sSUNobExtY3VJRzF2ZFhObExDQndiMmx1ZEdWeUxGeHVJQ0FnSUNBcUlIUnZkV05vS1N3Z2RIVnliaUJ2Wm1ZZ2EyVjVZbTloY21RZ2JXOWtZV3hwZEhrdVhHNGdJQ0FnSUNvZ1ZHaHBjeUJoWTJOdmRXNTBjeUJtYjNJZ2MybDBkV0YwYVc5dWN5QjNhR1Z5WlNCbWIyTjFjeUJsYm5SbGNuTWdkR2hsSUhCaFoyVWdabkp2YlNCMGFHVWdWVkpNSUdKaGNpNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UwVjJaVzUwZlNCbFhHNGdJQ0FnSUNvdlhHNGdJQ0FnWm5WdVkzUnBiMjRnYjI1SmJtbDBhV0ZzVUc5cGJuUmxjazF2ZG1Vb1pTa2dlMXh1SUNBZ0lDQWdMeThnVjI5eWF5QmhjbTkxYm1RZ1lTQlRZV1poY21rZ2NYVnBjbXNnZEdoaGRDQm1hWEpsY3lCaElHMXZkWE5sYlc5MlpTQnZiaUE4YUhSdGJENGdkMmhsYm1WMlpYSWdkR2hsWEc0Z0lDQWdJQ0F2THlCM2FXNWtiM2NnWW14MWNuTXNJR1YyWlc0Z2FXWWdlVzkxSjNKbElIUmhZbUpwYm1jZ2IzVjBJRzltSUhSb1pTQndZV2RsTGlEQ3IxeGNYeWpqZzRRcFh5L0NyMXh1SUNBZ0lDQWdhV1lnS0dVdWRHRnlaMlYwTG01dlpHVk9ZVzFsSUNZbUlHVXVkR0Z5WjJWMExtNXZaR1ZPWVcxbExuUnZURzkzWlhKRFlYTmxLQ2tnUFQwOUlDZG9kRzFzSnlrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lHaGhaRXRsZVdKdllYSmtSWFpsYm5RZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0FnSUhKbGJXOTJaVWx1YVhScFlXeFFiMmx1ZEdWeVRXOTJaVXhwYzNSbGJtVnljeWdwTzF4dUlDQWdJSDFjYmx4dUlDQWdJQzh2SUVadmNpQnpiMjFsSUd0cGJtUnpJRzltSUhOMFlYUmxMQ0IzWlNCaGNtVWdhVzUwWlhKbGMzUmxaQ0JwYmlCamFHRnVaMlZ6SUdGMElIUm9aU0JuYkc5aVlXd2djMk52Y0dWY2JpQWdJQ0F2THlCdmJteDVMaUJHYjNJZ1pYaGhiWEJzWlN3Z1oyeHZZbUZzSUhCdmFXNTBaWElnYVc1d2RYUXNJR2RzYjJKaGJDQnJaWGtnY0hKbGMzTmxjeUJoYm1RZ1oyeHZZbUZzWEc0Z0lDQWdMeThnZG1semFXSnBiR2wwZVNCamFHRnVaMlVnYzJodmRXeGtJR0ZtWm1WamRDQjBhR1VnYzNSaGRHVWdZWFFnWlhabGNua2djMk52Y0dVNlhHNGdJQ0FnWkc5amRXMWxiblF1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduYTJWNVpHOTNiaWNzSUc5dVMyVjVSRzkzYml3Z2RISjFaU2s3WEc0Z0lDQWdaRzlqZFcxbGJuUXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25iVzkxYzJWa2IzZHVKeXdnYjI1UWIybHVkR1Z5Ukc5M2Jpd2dkSEoxWlNrN1hHNGdJQ0FnWkc5amRXMWxiblF1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduY0c5cGJuUmxjbVJ2ZDI0bkxDQnZibEJ2YVc1MFpYSkViM2R1TENCMGNuVmxLVHRjYmlBZ0lDQmtiMk4xYldWdWRDNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZDBiM1ZqYUhOMFlYSjBKeXdnYjI1UWIybHVkR1Z5Ukc5M2Jpd2dkSEoxWlNrN1hHNGdJQ0FnWkc5amRXMWxiblF1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduZG1semFXSnBiR2wwZVdOb1lXNW5aU2NzSUc5dVZtbHphV0pwYkdsMGVVTm9ZVzVuWlN3Z2RISjFaU2s3WEc1Y2JpQWdJQ0JoWkdSSmJtbDBhV0ZzVUc5cGJuUmxjazF2ZG1WTWFYTjBaVzVsY25Nb0tUdGNibHh1SUNBZ0lDOHZJRVp2Y2lCbWIyTjFjeUJoYm1RZ1lteDFjaXdnZDJVZ2MzQmxZMmxtYVdOaGJHeDVJR05oY21VZ1lXSnZkWFFnYzNSaGRHVWdZMmhoYm1kbGN5QnBiaUIwYUdVZ2JHOWpZV3hjYmlBZ0lDQXZMeUJ6WTI5d1pTNGdWR2hwY3lCcGN5QmlaV05oZFhObElHWnZZM1Z6SUM4Z1lteDFjaUJsZG1WdWRITWdkR2hoZENCdmNtbG5hVzVoZEdVZ1puSnZiU0IzYVhSb2FXNGdZVnh1SUNBZ0lDOHZJSE5vWVdSdmR5QnliMjkwSUdGeVpTQnViM1FnY21VdFpHbHpjR0YwWTJobFpDQm1jbTl0SUhSb1pTQm9iM04wSUdWc1pXMWxiblFnYVdZZ2FYUWdkMkZ6SUdGc2NtVmhaSGxjYmlBZ0lDQXZMeUIwYUdVZ1lXTjBhWFpsSUdWc1pXMWxiblFnYVc0Z2FYUnpJRzkzYmlCelkyOXdaVHBjYmlBZ0lDQnpZMjl3WlM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkbWIyTjFjeWNzSUc5dVJtOWpkWE1zSUhSeWRXVXBPMXh1SUNBZ0lITmpiM0JsTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjJKc2RYSW5MQ0J2YmtKc2RYSXNJSFJ5ZFdVcE8xeHVYRzRnSUNBZ0x5OGdWMlVnWkdWMFpXTjBJSFJvWVhRZ1lTQnViMlJsSUdseklHRWdVMmhoWkc5M1VtOXZkQ0JpZVNCbGJuTjFjbWx1WnlCMGFHRjBJR2wwSUdseklHRmNiaUFnSUNBdkx5QkViMk4xYldWdWRFWnlZV2R0Wlc1MElHRnVaQ0JoYkhOdklHaGhjeUJoSUdodmMzUWdjSEp2Y0dWeWRIa3VJRlJvYVhNZ1kyaGxZMnNnWTI5MlpYSnpJRzVoZEdsMlpWeHVJQ0FnSUM4dklHbHRjR3hsYldWdWRHRjBhVzl1SUdGdVpDQndiMng1Wm1sc2JDQnBiWEJzWlcxbGJuUmhkR2x2YmlCMGNtRnVjM0JoY21WdWRHeDVMaUJKWmlCM1pTQnZibXg1SUdOaGNtVmtYRzRnSUNBZ0x5OGdZV0p2ZFhRZ2RHaGxJRzVoZEdsMlpTQnBiWEJzWlcxbGJuUmhkR2x2Yml3Z2QyVWdZMjkxYkdRZ2FuVnpkQ0JqYUdWamF5QnBaaUIwYUdVZ2MyTnZjR1VnZDJGelhHNGdJQ0FnTHk4Z1lXNGdhVzV6ZEdGdVkyVWdiMllnWVNCVGFHRmtiM2RTYjI5MExseHVJQ0FnSUdsbUlDaHpZMjl3WlM1dWIyUmxWSGx3WlNBOVBUMGdUbTlrWlM1RVQwTlZUVVZPVkY5R1VrRkhUVVZPVkY5T1QwUkZJQ1ltSUhOamIzQmxMbWh2YzNRcElIdGNiaUFnSUNBZ0lDOHZJRk5wYm1ObElHRWdVMmhoWkc5M1VtOXZkQ0JwY3lCaElITndaV05wWVd3Z2EybHVaQ0J2WmlCRWIyTjFiV1Z1ZEVaeVlXZHRaVzUwTENCcGRDQmtiMlZ6SUc1dmRGeHVJQ0FnSUNBZ0x5OGdhR0YyWlNCaElISnZiM1FnWld4bGJXVnVkQ0IwYnlCaFpHUWdZU0JqYkdGemN5QjBieTRnVTI4c0lIZGxJR0ZrWkNCMGFHbHpJR0YwZEhKcFluVjBaU0IwYnlCMGFHVmNiaUFnSUNBZ0lDOHZJR2h2YzNRZ1pXeGxiV1Z1ZENCcGJuTjBaV0ZrT2x4dUlDQWdJQ0FnYzJOdmNHVXVhRzl6ZEM1elpYUkJkSFJ5YVdKMWRHVW9KMlJoZEdFdGFuTXRabTlqZFhNdGRtbHphV0pzWlNjc0lDY25LVHRjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLSE5qYjNCbExtNXZaR1ZVZVhCbElEMDlQU0JPYjJSbExrUlBRMVZOUlU1VVgwNVBSRVVwSUh0Y2JpQWdJQ0FnSUdSdlkzVnRaVzUwTG1SdlkzVnRaVzUwUld4bGJXVnVkQzVqYkdGemMweHBjM1F1WVdSa0tDZHFjeTFtYjJOMWN5MTJhWE5wWW14bEp5azdYRzRnSUNBZ0lDQmtiMk4xYldWdWRDNWtiMk4xYldWdWRFVnNaVzFsYm5RdWMyVjBRWFIwY21saWRYUmxLQ2RrWVhSaExXcHpMV1p2WTNWekxYWnBjMmxpYkdVbkxDQW5KeWs3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnTHk4Z1NYUWdhWE1nYVcxd2IzSjBZVzUwSUhSdklIZHlZWEFnWVd4c0lISmxabVZ5Wlc1alpYTWdkRzhnWjJ4dlltRnNJSGRwYm1SdmR5QmhibVFnWkc5amRXMWxiblFnYVc1Y2JpQWdMeThnZEdobGMyVWdZMmhsWTJ0eklIUnZJSE4xY0hCdmNuUWdjMlZ5ZG1WeUxYTnBaR1VnY21WdVpHVnlhVzVuSUhWelpTQmpZWE5sYzF4dUlDQXZMeUJBYzJWbElHaDBkSEJ6T2k4dloybDBhSFZpTG1OdmJTOVhTVU5ITDJadlkzVnpMWFpwYzJsaWJHVXZhWE56ZFdWekx6RTVPVnh1SUNCcFppQW9kSGx3Wlc5bUlIZHBibVJ2ZHlBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NnSmlZZ2RIbHdaVzltSUdSdlkzVnRaVzUwSUNFOVBTQW5kVzVrWldacGJtVmtKeWtnZTF4dUlDQWdJQzh2SUUxaGEyVWdkR2hsSUhCdmJIbG1hV3hzSUdobGJIQmxjaUJuYkc5aVlXeHNlU0JoZG1GcGJHRmliR1V1SUZSb2FYTWdZMkZ1SUdKbElIVnpaV1FnWVhNZ1lTQnphV2R1WVd4Y2JpQWdJQ0F2THlCMGJ5QnBiblJsY21WemRHVmtJR3hwWW5KaGNtbGxjeUIwYUdGMElIZHBjMmdnZEc4Z1kyOXZjbVJwYm1GMFpTQjNhWFJvSUhSb1pTQndiMng1Wm1sc2JDQm1iM0lnWlM1bkxpeGNiaUFnSUNBdkx5QmhjSEJzZVdsdVp5QjBhR1VnY0c5c2VXWnBiR3dnZEc4Z1lTQnphR0ZrYjNjZ2NtOXZkRHBjYmlBZ0lDQjNhVzVrYjNjdVlYQndiSGxHYjJOMWMxWnBjMmxpYkdWUWIyeDVabWxzYkNBOUlHRndjR3g1Um05amRYTldhWE5wWW14bFVHOXNlV1pwYkd3N1hHNWNiaUFnSUNBdkx5Qk9iM1JwWm5rZ2FXNTBaWEpsYzNSbFpDQnNhV0p5WVhKcFpYTWdiMllnZEdobElIQnZiSGxtYVd4c0ozTWdjSEpsYzJWdVkyVXNJR2x1SUdOaGMyVWdkR2hsWEc0Z0lDQWdMeThnY0c5c2VXWnBiR3dnZDJGeklHeHZZV1JsWkNCc1lYcHBiSGs2WEc0Z0lDQWdkbUZ5SUdWMlpXNTBPMXh1WEc0Z0lDQWdkSEo1SUh0Y2JpQWdJQ0FnSUdWMlpXNTBJRDBnYm1WM0lFTjFjM1J2YlVWMlpXNTBLQ2RtYjJOMWN5MTJhWE5wWW14bExYQnZiSGxtYVd4c0xYSmxZV1I1SnlrN1hHNGdJQ0FnZlNCallYUmphQ0FvWlhKeWIzSXBJSHRjYmlBZ0lDQWdJQzh2SUVsRk1URWdaRzlsY3lCdWIzUWdjM1Z3Y0c5eWRDQjFjMmx1WnlCRGRYTjBiMjFGZG1WdWRDQmhjeUJoSUdOdmJuTjBjblZqZEc5eUlHUnBjbVZqZEd4NU9seHVJQ0FnSUNBZ1pYWmxiblFnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGZG1WdWRDZ25RM1Z6ZEc5dFJYWmxiblFuS1R0Y2JpQWdJQ0FnSUdWMlpXNTBMbWx1YVhSRGRYTjBiMjFGZG1WdWRDZ25abTlqZFhNdGRtbHphV0pzWlMxd2IyeDVabWxzYkMxeVpXRmtlU2NzSUdaaGJITmxMQ0JtWVd4elpTd2dlMzBwTzF4dUlDQWdJSDFjYmx4dUlDQWdJSGRwYm1SdmR5NWthWE53WVhSamFFVjJaVzUwS0dWMlpXNTBLVHRjYmlBZ2ZWeHVYRzRnSUdsbUlDaDBlWEJsYjJZZ1pHOWpkVzFsYm5RZ0lUMDlJQ2QxYm1SbFptbHVaV1FuS1NCN1hHNGdJQ0FnTHk4Z1FYQndiSGtnZEdobElIQnZiSGxtYVd4c0lIUnZJSFJvWlNCbmJHOWlZV3dnWkc5amRXMWxiblFzSUhOdklIUm9ZWFFnYm04Z1NtRjJZVk5qY21sd2RGeHVJQ0FnSUM4dklHTnZiM0prYVc1aGRHbHZiaUJwY3lCeVpYRjFhWEpsWkNCMGJ5QjFjMlVnZEdobElIQnZiSGxtYVd4c0lHbHVJSFJvWlNCMGIzQXRiR1YyWld3Z1pHOWpkVzFsYm5RNlhHNGdJQ0FnWVhCd2JIbEdiMk4xYzFacGMybGliR1ZRYjJ4NVptbHNiQ2hrYjJOMWJXVnVkQ2s3WEc0Z0lIMWNibHh1ZlNrcEtUdGNiaUlzSWk4cUtseHVJQ29nUTI5d2VYSnBaMmgwSUNoaktTQXlNREUwTFhCeVpYTmxiblFzSUVaaFkyVmliMjlyTENCSmJtTXVYRzRnS2x4dUlDb2dWR2hwY3lCemIzVnlZMlVnWTI5a1pTQnBjeUJzYVdObGJuTmxaQ0IxYm1SbGNpQjBhR1VnVFVsVUlHeHBZMlZ1YzJVZ1ptOTFibVFnYVc0Z2RHaGxYRzRnS2lCTVNVTkZUbE5GSUdacGJHVWdhVzRnZEdobElISnZiM1FnWkdseVpXTjBiM0o1SUc5bUlIUm9hWE1nYzI5MWNtTmxJSFJ5WldVdVhHNGdLaTljYmx4dWRtRnlJSEoxYm5ScGJXVWdQU0FvWm5WdVkzUnBiMjRnS0dWNGNHOXlkSE1wSUh0Y2JpQWdYQ0oxYzJVZ2MzUnlhV04wWENJN1hHNWNiaUFnZG1GeUlFOXdJRDBnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaVHRjYmlBZ2RtRnlJR2hoYzA5M2JpQTlJRTl3TG1oaGMwOTNibEJ5YjNCbGNuUjVPMXh1SUNCMllYSWdkVzVrWldacGJtVmtPeUF2THlCTmIzSmxJR052YlhCeVpYTnphV0pzWlNCMGFHRnVJSFp2YVdRZ01DNWNiaUFnZG1GeUlDUlRlVzFpYjJ3Z1BTQjBlWEJsYjJZZ1UzbHRZbTlzSUQwOVBTQmNJbVoxYm1OMGFXOXVYQ0lnUHlCVGVXMWliMndnT2lCN2ZUdGNiaUFnZG1GeUlHbDBaWEpoZEc5eVUzbHRZbTlzSUQwZ0pGTjViV0p2YkM1cGRHVnlZWFJ2Y2lCOGZDQmNJa0JBYVhSbGNtRjBiM0pjSWp0Y2JpQWdkbUZ5SUdGemVXNWpTWFJsY21GMGIzSlRlVzFpYjJ3Z1BTQWtVM2x0WW05c0xtRnplVzVqU1hSbGNtRjBiM0lnZkh3Z1hDSkFRR0Z6ZVc1alNYUmxjbUYwYjNKY0lqdGNiaUFnZG1GeUlIUnZVM1J5YVc1blZHRm5VM2x0WW05c0lEMGdKRk41YldKdmJDNTBiMU4wY21sdVoxUmhaeUI4ZkNCY0lrQkFkRzlUZEhKcGJtZFVZV2RjSWp0Y2JseHVJQ0JtZFc1amRHbHZiaUJrWldacGJtVW9iMkpxTENCclpYa3NJSFpoYkhWbEtTQjdYRzRnSUNBZ1QySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLRzlpYWl3Z2EyVjVMQ0I3WEc0Z0lDQWdJQ0IyWVd4MVpUb2dkbUZzZFdVc1hHNGdJQ0FnSUNCbGJuVnRaWEpoWW14bE9pQjBjblZsTEZ4dUlDQWdJQ0FnWTI5dVptbG5kWEpoWW14bE9pQjBjblZsTEZ4dUlDQWdJQ0FnZDNKcGRHRmliR1U2SUhSeWRXVmNiaUFnSUNCOUtUdGNiaUFnSUNCeVpYUjFjbTRnYjJKcVcydGxlVjA3WEc0Z0lIMWNiaUFnZEhKNUlIdGNiaUFnSUNBdkx5QkpSU0E0SUdoaGN5QmhJR0p5YjJ0bGJpQlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtnZEdoaGRDQnZibXg1SUhkdmNtdHpJRzl1SUVSUFRTQnZZbXBsWTNSekxseHVJQ0FnSUdSbFptbHVaU2g3ZlN3Z1hDSmNJaWs3WEc0Z0lIMGdZMkYwWTJnZ0tHVnljaWtnZTF4dUlDQWdJR1JsWm1sdVpTQTlJR1oxYm1OMGFXOXVLRzlpYWl3Z2EyVjVMQ0IyWVd4MVpTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHOWlhbHRyWlhsZElEMGdkbUZzZFdVN1hHNGdJQ0FnZlR0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlIZHlZWEFvYVc1dVpYSkdiaXdnYjNWMFpYSkdiaXdnYzJWc1ppd2dkSEo1VEc5amMweHBjM1FwSUh0Y2JpQWdJQ0F2THlCSlppQnZkWFJsY2tadUlIQnliM1pwWkdWa0lHRnVaQ0J2ZFhSbGNrWnVMbkJ5YjNSdmRIbHdaU0JwY3lCaElFZGxibVZ5WVhSdmNpd2dkR2hsYmlCdmRYUmxja1p1TG5CeWIzUnZkSGx3WlNCcGJuTjBZVzVqWlc5bUlFZGxibVZ5WVhSdmNpNWNiaUFnSUNCMllYSWdjSEp2ZEc5SFpXNWxjbUYwYjNJZ1BTQnZkWFJsY2tadUlDWW1JRzkxZEdWeVJtNHVjSEp2ZEc5MGVYQmxJR2x1YzNSaGJtTmxiMllnUjJWdVpYSmhkRzl5SUQ4Z2IzVjBaWEpHYmlBNklFZGxibVZ5WVhSdmNqdGNiaUFnSUNCMllYSWdaMlZ1WlhKaGRHOXlJRDBnVDJKcVpXTjBMbU55WldGMFpTaHdjbTkwYjBkbGJtVnlZWFJ2Y2k1d2NtOTBiM1I1Y0dVcE8xeHVJQ0FnSUhaaGNpQmpiMjUwWlhoMElEMGdibVYzSUVOdmJuUmxlSFFvZEhKNVRHOWpjMHhwYzNRZ2ZId2dXMTBwTzF4dVhHNGdJQ0FnTHk4Z1ZHaGxJQzVmYVc1MmIydGxJRzFsZEdodlpDQjFibWxtYVdWeklIUm9aU0JwYlhCc1pXMWxiblJoZEdsdmJuTWdiMllnZEdobElDNXVaWGgwTEZ4dUlDQWdJQzh2SUM1MGFISnZkeXdnWVc1a0lDNXlaWFIxY200Z2JXVjBhRzlrY3k1Y2JpQWdJQ0JuWlc1bGNtRjBiM0l1WDJsdWRtOXJaU0E5SUcxaGEyVkpiblp2YTJWTlpYUm9iMlFvYVc1dVpYSkdiaXdnYzJWc1ppd2dZMjl1ZEdWNGRDazdYRzVjYmlBZ0lDQnlaWFIxY200Z1oyVnVaWEpoZEc5eU8xeHVJQ0I5WEc0Z0lHVjRjRzl5ZEhNdWQzSmhjQ0E5SUhkeVlYQTdYRzVjYmlBZ0x5OGdWSEo1TDJOaGRHTm9JR2hsYkhCbGNpQjBieUJ0YVc1cGJXbDZaU0JrWlc5d2RHbHRhWHBoZEdsdmJuTXVJRkpsZEhWeWJuTWdZU0JqYjIxd2JHVjBhVzl1WEc0Z0lDOHZJSEpsWTI5eVpDQnNhV3RsSUdOdmJuUmxlSFF1ZEhKNVJXNTBjbWxsYzF0cFhTNWpiMjF3YkdWMGFXOXVMaUJVYUdseklHbHVkR1Z5Wm1GalpTQmpiM1ZzWkZ4dUlDQXZMeUJvWVhabElHSmxaVzRnS0dGdVpDQjNZWE1nY0hKbGRtbHZkWE5zZVNrZ1pHVnphV2R1WldRZ2RHOGdkR0ZyWlNCaElHTnNiM04xY21VZ2RHOGdZbVZjYmlBZ0x5OGdhVzUyYjJ0bFpDQjNhWFJvYjNWMElHRnlaM1Z0Wlc1MGN5d2dZblYwSUdsdUlHRnNiQ0IwYUdVZ1kyRnpaWE1nZDJVZ1kyRnlaU0JoWW05MWRDQjNaVnh1SUNBdkx5QmhiSEpsWVdSNUlHaGhkbVVnWVc0Z1pYaHBjM1JwYm1jZ2JXVjBhRzlrSUhkbElIZGhiblFnZEc4Z1kyRnNiQ3dnYzI4Z2RHaGxjbVVuY3lCdWJ5QnVaV1ZrWEc0Z0lDOHZJSFJ2SUdOeVpXRjBaU0JoSUc1bGR5Qm1kVzVqZEdsdmJpQnZZbXBsWTNRdUlGZGxJR05oYmlCbGRtVnVJR2RsZENCaGQyRjVJSGRwZEdnZ1lYTnpkVzFwYm1kY2JpQWdMeThnZEdobElHMWxkR2h2WkNCMFlXdGxjeUJsZUdGamRHeDVJRzl1WlNCaGNtZDFiV1Z1ZEN3Z2MybHVZMlVnZEdoaGRDQm9ZWEJ3Wlc1eklIUnZJR0psSUhSeWRXVmNiaUFnTHk4Z2FXNGdaWFpsY25rZ1kyRnpaU3dnYzI4Z2QyVWdaRzl1SjNRZ2FHRjJaU0IwYnlCMGIzVmphQ0IwYUdVZ1lYSm5kVzFsYm5SeklHOWlhbVZqZEM0Z1ZHaGxYRzRnSUM4dklHOXViSGtnWVdSa2FYUnBiMjVoYkNCaGJHeHZZMkYwYVc5dUlISmxjWFZwY21Wa0lHbHpJSFJvWlNCamIyMXdiR1YwYVc5dUlISmxZMjl5WkN3Z2QyaHBZMmhjYmlBZ0x5OGdhR0Z6SUdFZ2MzUmhZbXhsSUhOb1lYQmxJR0Z1WkNCemJ5Qm9iM0JsWm5Wc2JIa2djMmh2ZFd4a0lHSmxJR05vWldGd0lIUnZJR0ZzYkc5allYUmxMbHh1SUNCbWRXNWpkR2x2YmlCMGNubERZWFJqYUNobWJpd2diMkpxTENCaGNtY3BJSHRjYmlBZ0lDQjBjbmtnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSHNnZEhsd1pUb2dYQ0p1YjNKdFlXeGNJaXdnWVhKbk9pQm1iaTVqWVd4c0tHOWlhaXdnWVhKbktTQjlPMXh1SUNBZ0lIMGdZMkYwWTJnZ0tHVnljaWtnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSHNnZEhsd1pUb2dYQ0owYUhKdmQxd2lMQ0JoY21jNklHVnljaUI5TzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUhaaGNpQkhaVzVUZEdGMFpWTjFjM0JsYm1SbFpGTjBZWEowSUQwZ1hDSnpkWE53Wlc1a1pXUlRkR0Z5ZEZ3aU8xeHVJQ0IyWVhJZ1IyVnVVM1JoZEdWVGRYTndaVzVrWldSWmFXVnNaQ0E5SUZ3aWMzVnpjR1Z1WkdWa1dXbGxiR1JjSWp0Y2JpQWdkbUZ5SUVkbGJsTjBZWFJsUlhobFkzVjBhVzVuSUQwZ1hDSmxlR1ZqZFhScGJtZGNJanRjYmlBZ2RtRnlJRWRsYmxOMFlYUmxRMjl0Y0d4bGRHVmtJRDBnWENKamIyMXdiR1YwWldSY0lqdGNibHh1SUNBdkx5QlNaWFIxY201cGJtY2dkR2hwY3lCdlltcGxZM1FnWm5KdmJTQjBhR1VnYVc1dVpYSkdiaUJvWVhNZ2RHaGxJSE5oYldVZ1pXWm1aV04wSUdGelhHNGdJQzh2SUdKeVpXRnJhVzVuSUc5MWRDQnZaaUIwYUdVZ1pHbHpjR0YwWTJnZ2MzZHBkR05vSUhOMFlYUmxiV1Z1ZEM1Y2JpQWdkbUZ5SUVOdmJuUnBiblZsVTJWdWRHbHVaV3dnUFNCN2ZUdGNibHh1SUNBdkx5QkVkVzF0ZVNCamIyNXpkSEoxWTNSdmNpQm1kVzVqZEdsdmJuTWdkR2hoZENCM1pTQjFjMlVnWVhNZ2RHaGxJQzVqYjI1emRISjFZM1J2Y2lCaGJtUmNiaUFnTHk4Z0xtTnZibk4wY25WamRHOXlMbkJ5YjNSdmRIbHdaU0J3Y205d1pYSjBhV1Z6SUdadmNpQm1kVzVqZEdsdmJuTWdkR2hoZENCeVpYUjFjbTRnUjJWdVpYSmhkRzl5WEc0Z0lDOHZJRzlpYW1WamRITXVJRVp2Y2lCbWRXeHNJSE53WldNZ1kyOXRjR3hwWVc1alpTd2dlVzkxSUcxaGVTQjNhWE5vSUhSdklHTnZibVpwWjNWeVpTQjViM1Z5WEc0Z0lDOHZJRzFwYm1sbWFXVnlJRzV2ZENCMGJ5QnRZVzVuYkdVZ2RHaGxJRzVoYldWeklHOW1JSFJvWlhObElIUjNieUJtZFc1amRHbHZibk11WEc0Z0lHWjFibU4wYVc5dUlFZGxibVZ5WVhSdmNpZ3BJSHQ5WEc0Z0lHWjFibU4wYVc5dUlFZGxibVZ5WVhSdmNrWjFibU4wYVc5dUtDa2dlMzFjYmlBZ1puVnVZM1JwYjI0Z1IyVnVaWEpoZEc5eVJuVnVZM1JwYjI1UWNtOTBiM1I1Y0dVb0tTQjdmVnh1WEc0Z0lDOHZJRlJvYVhNZ2FYTWdZU0J3YjJ4NVptbHNiQ0JtYjNJZ0pVbDBaWEpoZEc5eVVISnZkRzkwZVhCbEpTQm1iM0lnWlc1MmFYSnZibTFsYm5SeklIUm9ZWFJjYmlBZ0x5OGdaRzl1SjNRZ2JtRjBhWFpsYkhrZ2MzVndjRzl5ZENCcGRDNWNiaUFnZG1GeUlFbDBaWEpoZEc5eVVISnZkRzkwZVhCbElEMGdlMzA3WEc0Z0lHUmxabWx1WlNoSmRHVnlZWFJ2Y2xCeWIzUnZkSGx3WlN3Z2FYUmxjbUYwYjNKVGVXMWliMndzSUdaMWJtTjBhVzl1SUNncElIdGNiaUFnSUNCeVpYUjFjbTRnZEdocGN6dGNiaUFnZlNrN1hHNWNiaUFnZG1GeUlHZGxkRkJ5YjNSdklEMGdUMkpxWldOMExtZGxkRkJ5YjNSdmRIbHdaVTltTzF4dUlDQjJZWElnVG1GMGFYWmxTWFJsY21GMGIzSlFjbTkwYjNSNWNHVWdQU0JuWlhSUWNtOTBieUFtSmlCblpYUlFjbTkwYnloblpYUlFjbTkwYnloMllXeDFaWE1vVzEwcEtTazdYRzRnSUdsbUlDaE9ZWFJwZG1WSmRHVnlZWFJ2Y2xCeWIzUnZkSGx3WlNBbUpseHVJQ0FnSUNBZ1RtRjBhWFpsU1hSbGNtRjBiM0pRY205MGIzUjVjR1VnSVQwOUlFOXdJQ1ltWEc0Z0lDQWdJQ0JvWVhOUGQyNHVZMkZzYkNoT1lYUnBkbVZKZEdWeVlYUnZjbEJ5YjNSdmRIbHdaU3dnYVhSbGNtRjBiM0pUZVcxaWIyd3BLU0I3WEc0Z0lDQWdMeThnVkdocGN5QmxiblpwY205dWJXVnVkQ0JvWVhNZ1lTQnVZWFJwZG1VZ0pVbDBaWEpoZEc5eVVISnZkRzkwZVhCbEpUc2dkWE5sSUdsMElHbHVjM1JsWVdSY2JpQWdJQ0F2THlCdlppQjBhR1VnY0c5c2VXWnBiR3d1WEc0Z0lDQWdTWFJsY21GMGIzSlFjbTkwYjNSNWNHVWdQU0JPWVhScGRtVkpkR1Z5WVhSdmNsQnliM1J2ZEhsd1pUdGNiaUFnZlZ4dVhHNGdJSFpoY2lCSGNDQTlJRWRsYm1WeVlYUnZja1oxYm1OMGFXOXVVSEp2ZEc5MGVYQmxMbkJ5YjNSdmRIbHdaU0E5WEc0Z0lDQWdSMlZ1WlhKaGRHOXlMbkJ5YjNSdmRIbHdaU0E5SUU5aWFtVmpkQzVqY21WaGRHVW9TWFJsY21GMGIzSlFjbTkwYjNSNWNHVXBPMXh1SUNCSFpXNWxjbUYwYjNKR2RXNWpkR2x2Ymk1d2NtOTBiM1I1Y0dVZ1BTQkhaVzVsY21GMGIzSkdkVzVqZEdsdmJsQnliM1J2ZEhsd1pUdGNiaUFnWkdWbWFXNWxLRWR3TENCY0ltTnZibk4wY25WamRHOXlYQ0lzSUVkbGJtVnlZWFJ2Y2taMWJtTjBhVzl1VUhKdmRHOTBlWEJsS1R0Y2JpQWdaR1ZtYVc1bEtFZGxibVZ5WVhSdmNrWjFibU4wYVc5dVVISnZkRzkwZVhCbExDQmNJbU52Ym5OMGNuVmpkRzl5WENJc0lFZGxibVZ5WVhSdmNrWjFibU4wYVc5dUtUdGNiaUFnUjJWdVpYSmhkRzl5Um5WdVkzUnBiMjR1WkdsemNHeGhlVTVoYldVZ1BTQmtaV1pwYm1Vb1hHNGdJQ0FnUjJWdVpYSmhkRzl5Um5WdVkzUnBiMjVRY205MGIzUjVjR1VzWEc0Z0lDQWdkRzlUZEhKcGJtZFVZV2RUZVcxaWIyd3NYRzRnSUNBZ1hDSkhaVzVsY21GMGIzSkdkVzVqZEdsdmJsd2lYRzRnSUNrN1hHNWNiaUFnTHk4Z1NHVnNjR1Z5SUdadmNpQmtaV1pwYm1sdVp5QjBhR1VnTG01bGVIUXNJQzUwYUhKdmR5d2dZVzVrSUM1eVpYUjFjbTRnYldWMGFHOWtjeUJ2WmlCMGFHVmNiaUFnTHk4Z1NYUmxjbUYwYjNJZ2FXNTBaWEptWVdObElHbHVJSFJsY20xeklHOW1JR0VnYzJsdVoyeGxJQzVmYVc1MmIydGxJRzFsZEdodlpDNWNiaUFnWm5WdVkzUnBiMjRnWkdWbWFXNWxTWFJsY21GMGIzSk5aWFJvYjJSektIQnliM1J2ZEhsd1pTa2dlMXh1SUNBZ0lGdGNJbTVsZUhSY0lpd2dYQ0owYUhKdmQxd2lMQ0JjSW5KbGRIVnlibHdpWFM1bWIzSkZZV05vS0daMWJtTjBhVzl1S0cxbGRHaHZaQ2tnZTF4dUlDQWdJQ0FnWkdWbWFXNWxLSEJ5YjNSdmRIbHdaU3dnYldWMGFHOWtMQ0JtZFc1amRHbHZiaWhoY21jcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE11WDJsdWRtOXJaU2h0WlhSb2IyUXNJR0Z5WnlrN1hHNGdJQ0FnSUNCOUtUdGNiaUFnSUNCOUtUdGNiaUFnZlZ4dVhHNGdJR1Y0Y0c5eWRITXVhWE5IWlc1bGNtRjBiM0pHZFc1amRHbHZiaUE5SUdaMWJtTjBhVzl1S0dkbGJrWjFiaWtnZTF4dUlDQWdJSFpoY2lCamRHOXlJRDBnZEhsd1pXOW1JR2RsYmtaMWJpQTlQVDBnWENKbWRXNWpkR2x2Ymx3aUlDWW1JR2RsYmtaMWJpNWpiMjV6ZEhKMVkzUnZjanRjYmlBZ0lDQnlaWFIxY200Z1kzUnZjbHh1SUNBZ0lDQWdQeUJqZEc5eUlEMDlQU0JIWlc1bGNtRjBiM0pHZFc1amRHbHZiaUI4ZkZ4dUlDQWdJQ0FnSUNBdkx5QkdiM0lnZEdobElHNWhkR2wyWlNCSFpXNWxjbUYwYjNKR2RXNWpkR2x2YmlCamIyNXpkSEoxWTNSdmNpd2dkR2hsSUdKbGMzUWdkMlVnWTJGdVhHNGdJQ0FnSUNBZ0lDOHZJR1J2SUdseklIUnZJR05vWldOcklHbDBjeUF1Ym1GdFpTQndjbTl3WlhKMGVTNWNiaUFnSUNBZ0lDQWdLR04wYjNJdVpHbHpjR3hoZVU1aGJXVWdmSHdnWTNSdmNpNXVZVzFsS1NBOVBUMGdYQ0pIWlc1bGNtRjBiM0pHZFc1amRHbHZibHdpWEc0Z0lDQWdJQ0E2SUdaaGJITmxPMXh1SUNCOU8xeHVYRzRnSUdWNGNHOXlkSE11YldGeWF5QTlJR1oxYm1OMGFXOXVLR2RsYmtaMWJpa2dlMXh1SUNBZ0lHbG1JQ2hQWW1wbFkzUXVjMlYwVUhKdmRHOTBlWEJsVDJZcElIdGNiaUFnSUNBZ0lFOWlhbVZqZEM1elpYUlFjbTkwYjNSNWNHVlBaaWhuWlc1R2RXNHNJRWRsYm1WeVlYUnZja1oxYm1OMGFXOXVVSEp2ZEc5MGVYQmxLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ1oyVnVSblZ1TGw5ZmNISnZkRzlmWHlBOUlFZGxibVZ5WVhSdmNrWjFibU4wYVc5dVVISnZkRzkwZVhCbE8xeHVJQ0FnSUNBZ1pHVm1hVzVsS0dkbGJrWjFiaXdnZEc5VGRISnBibWRVWVdkVGVXMWliMndzSUZ3aVIyVnVaWEpoZEc5eVJuVnVZM1JwYjI1Y0lpazdYRzRnSUNBZ2ZWeHVJQ0FnSUdkbGJrWjFiaTV3Y205MGIzUjVjR1VnUFNCUFltcGxZM1F1WTNKbFlYUmxLRWR3S1R0Y2JpQWdJQ0J5WlhSMWNtNGdaMlZ1Um5WdU8xeHVJQ0I5TzF4dVhHNGdJQzh2SUZkcGRHaHBiaUIwYUdVZ1ltOWtlU0J2WmlCaGJua2dZWE41Ym1NZ1puVnVZM1JwYjI0c0lHQmhkMkZwZENCNFlDQnBjeUIwY21GdWMyWnZjbTFsWkNCMGIxeHVJQ0F2THlCZ2VXbGxiR1FnY21WblpXNWxjbUYwYjNKU2RXNTBhVzFsTG1GM2NtRndLSGdwWUN3Z2MyOGdkR2hoZENCMGFHVWdjblZ1ZEdsdFpTQmpZVzRnZEdWemRGeHVJQ0F2THlCZ2FHRnpUM2R1TG1OaGJHd29kbUZzZFdVc0lGd2lYMTloZDJGcGRGd2lLV0FnZEc4Z1pHVjBaWEp0YVc1bElHbG1JSFJvWlNCNWFXVnNaR1ZrSUhaaGJIVmxJR2x6WEc0Z0lDOHZJRzFsWVc1MElIUnZJR0psSUdGM1lXbDBaV1F1WEc0Z0lHVjRjRzl5ZEhNdVlYZHlZWEFnUFNCbWRXNWpkR2x2YmloaGNtY3BJSHRjYmlBZ0lDQnlaWFIxY200Z2V5QmZYMkYzWVdsME9pQmhjbWNnZlR0Y2JpQWdmVHRjYmx4dUlDQm1kVzVqZEdsdmJpQkJjM2x1WTBsMFpYSmhkRzl5S0dkbGJtVnlZWFJ2Y2l3Z1VISnZiV2x6WlVsdGNHd3BJSHRjYmlBZ0lDQm1kVzVqZEdsdmJpQnBiblp2YTJVb2JXVjBhRzlrTENCaGNtY3NJSEpsYzI5c2RtVXNJSEpsYW1WamRDa2dlMXh1SUNBZ0lDQWdkbUZ5SUhKbFkyOXlaQ0E5SUhSeWVVTmhkR05vS0dkbGJtVnlZWFJ2Y2x0dFpYUm9iMlJkTENCblpXNWxjbUYwYjNJc0lHRnlaeWs3WEc0Z0lDQWdJQ0JwWmlBb2NtVmpiM0prTG5SNWNHVWdQVDA5SUZ3aWRHaHliM2RjSWlrZ2UxeHVJQ0FnSUNBZ0lDQnlaV3BsWTNRb2NtVmpiM0prTG1GeVp5azdYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnY21WemRXeDBJRDBnY21WamIzSmtMbUZ5Wnp0Y2JpQWdJQ0FnSUNBZ2RtRnlJSFpoYkhWbElEMGdjbVZ6ZFd4MExuWmhiSFZsTzF4dUlDQWdJQ0FnSUNCcFppQW9kbUZzZFdVZ0ppWmNiaUFnSUNBZ0lDQWdJQ0FnSUhSNWNHVnZaaUIyWVd4MVpTQTlQVDBnWENKdlltcGxZM1JjSWlBbUpseHVJQ0FnSUNBZ0lDQWdJQ0FnYUdGelQzZHVMbU5oYkd3b2RtRnNkV1VzSUZ3aVgxOWhkMkZwZEZ3aUtTa2dlMXh1SUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJRY205dGFYTmxTVzF3YkM1eVpYTnZiSFpsS0haaGJIVmxMbDlmWVhkaGFYUXBMblJvWlc0b1puVnVZM1JwYjI0b2RtRnNkV1VwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2x1ZG05clpTaGNJbTVsZUhSY0lpd2dkbUZzZFdVc0lISmxjMjlzZG1Vc0lISmxhbVZqZENrN1hHNGdJQ0FnSUNBZ0lDQWdmU3dnWm5WdVkzUnBiMjRvWlhKeUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCcGJuWnZhMlVvWENKMGFISnZkMXdpTENCbGNuSXNJSEpsYzI5c2RtVXNJSEpsYW1WamRDazdYRzRnSUNBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdVSEp2YldselpVbHRjR3d1Y21WemIyeDJaU2gyWVd4MVpTa3VkR2hsYmlobWRXNWpkR2x2YmloMWJuZHlZWEJ3WldRcElIdGNiaUFnSUNBZ0lDQWdJQ0F2THlCWGFHVnVJR0VnZVdsbGJHUmxaQ0JRY205dGFYTmxJR2x6SUhKbGMyOXNkbVZrTENCcGRITWdabWx1WVd3Z2RtRnNkV1VnWW1WamIyMWxjMXh1SUNBZ0lDQWdJQ0FnSUM4dklIUm9aU0F1ZG1Gc2RXVWdiMllnZEdobElGQnliMjFwYzJVOGUzWmhiSFZsTEdSdmJtVjlQaUJ5WlhOMWJIUWdabTl5SUhSb1pWeHVJQ0FnSUNBZ0lDQWdJQzh2SUdOMWNuSmxiblFnYVhSbGNtRjBhVzl1TGx4dUlDQWdJQ0FnSUNBZ0lISmxjM1ZzZEM1MllXeDFaU0E5SUhWdWQzSmhjSEJsWkR0Y2JpQWdJQ0FnSUNBZ0lDQnlaWE52YkhabEtISmxjM1ZzZENrN1hHNGdJQ0FnSUNBZ0lIMHNJR1oxYm1OMGFXOXVLR1Z5Y205eUtTQjdYRzRnSUNBZ0lDQWdJQ0FnTHk4Z1NXWWdZU0J5WldwbFkzUmxaQ0JRY205dGFYTmxJSGRoY3lCNWFXVnNaR1ZrTENCMGFISnZkeUIwYUdVZ2NtVnFaV04wYVc5dUlHSmhZMnRjYmlBZ0lDQWdJQ0FnSUNBdkx5QnBiblJ2SUhSb1pTQmhjM2x1WXlCblpXNWxjbUYwYjNJZ1puVnVZM1JwYjI0Z2MyOGdhWFFnWTJGdUlHSmxJR2hoYm1Sc1pXUWdkR2hsY21VdVhHNGdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHbHVkbTlyWlNoY0luUm9jbTkzWENJc0lHVnljbTl5TENCeVpYTnZiSFpsTENCeVpXcGxZM1FwTzF4dUlDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNWNiaUFnSUNCMllYSWdjSEpsZG1sdmRYTlFjbTl0YVhObE8xeHVYRzRnSUNBZ1puVnVZM1JwYjI0Z1pXNXhkV1YxWlNodFpYUm9iMlFzSUdGeVp5a2dlMXh1SUNBZ0lDQWdablZ1WTNScGIyNGdZMkZzYkVsdWRtOXJaVmRwZEdoTlpYUm9iMlJCYm1SQmNtY29LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ1WlhjZ1VISnZiV2x6WlVsdGNHd29ablZ1WTNScGIyNG9jbVZ6YjJ4MlpTd2djbVZxWldOMEtTQjdYRzRnSUNBZ0lDQWdJQ0FnYVc1MmIydGxLRzFsZEdodlpDd2dZWEpuTENCeVpYTnZiSFpsTENCeVpXcGxZM1FwTzF4dUlDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdjbVYwZFhKdUlIQnlaWFpwYjNWelVISnZiV2x6WlNBOVhHNGdJQ0FnSUNBZ0lDOHZJRWxtSUdWdWNYVmxkV1VnYUdGeklHSmxaVzRnWTJGc2JHVmtJR0psWm05eVpTd2dkR2hsYmlCM1pTQjNZVzUwSUhSdklIZGhhWFFnZFc1MGFXeGNiaUFnSUNBZ0lDQWdMeThnWVd4c0lIQnlaWFpwYjNWeklGQnliMjFwYzJWeklHaGhkbVVnWW1WbGJpQnlaWE52YkhabFpDQmlaV1p2Y21VZ1kyRnNiR2x1WnlCcGJuWnZhMlVzWEc0Z0lDQWdJQ0FnSUM4dklITnZJSFJvWVhRZ2NtVnpkV3gwY3lCaGNtVWdZV3gzWVhseklHUmxiR2wyWlhKbFpDQnBiaUIwYUdVZ1kyOXljbVZqZENCdmNtUmxjaTRnU1daY2JpQWdJQ0FnSUNBZ0x5OGdaVzV4ZFdWMVpTQm9ZWE1nYm05MElHSmxaVzRnWTJGc2JHVmtJR0psWm05eVpTd2dkR2hsYmlCcGRDQnBjeUJwYlhCdmNuUmhiblFnZEc5Y2JpQWdJQ0FnSUNBZ0x5OGdZMkZzYkNCcGJuWnZhMlVnYVcxdFpXUnBZWFJsYkhrc0lIZHBkR2h2ZFhRZ2QyRnBkR2x1WnlCdmJpQmhJR05oYkd4aVlXTnJJSFJ2SUdacGNtVXNYRzRnSUNBZ0lDQWdJQzh2SUhOdklIUm9ZWFFnZEdobElHRnplVzVqSUdkbGJtVnlZWFJ2Y2lCbWRXNWpkR2x2YmlCb1lYTWdkR2hsSUc5d2NHOXlkSFZ1YVhSNUlIUnZJR1J2WEc0Z0lDQWdJQ0FnSUM4dklHRnVlU0J1WldObGMzTmhjbmtnYzJWMGRYQWdhVzRnWVNCd2NtVmthV04wWVdKc1pTQjNZWGt1SUZSb2FYTWdjSEpsWkdsamRHRmlhV3hwZEhsY2JpQWdJQ0FnSUNBZ0x5OGdhWE1nZDJoNUlIUm9aU0JRY205dGFYTmxJR052Ym5OMGNuVmpkRzl5SUhONWJtTm9jbTl1YjNWemJIa2dhVzUyYjJ0bGN5QnBkSE5jYmlBZ0lDQWdJQ0FnTHk4Z1pYaGxZM1YwYjNJZ1kyRnNiR0poWTJzc0lHRnVaQ0IzYUhrZ1lYTjVibU1nWm5WdVkzUnBiMjV6SUhONWJtTm9jbTl1YjNWemJIbGNiaUFnSUNBZ0lDQWdMeThnWlhobFkzVjBaU0JqYjJSbElHSmxabTl5WlNCMGFHVWdabWx5YzNRZ1lYZGhhWFF1SUZOcGJtTmxJSGRsSUdsdGNHeGxiV1Z1ZENCemFXMXdiR1ZjYmlBZ0lDQWdJQ0FnTHk4Z1lYTjVibU1nWm5WdVkzUnBiMjV6SUdsdUlIUmxjbTF6SUc5bUlHRnplVzVqSUdkbGJtVnlZWFJ2Y25Nc0lHbDBJR2x6SUdWemNHVmphV0ZzYkhsY2JpQWdJQ0FnSUNBZ0x5OGdhVzF3YjNKMFlXNTBJSFJ2SUdkbGRDQjBhR2x6SUhKcFoyaDBMQ0JsZG1WdUlIUm9iM1ZuYUNCcGRDQnlaWEYxYVhKbGN5QmpZWEpsTGx4dUlDQWdJQ0FnSUNCd2NtVjJhVzkxYzFCeWIyMXBjMlVnUHlCd2NtVjJhVzkxYzFCeWIyMXBjMlV1ZEdobGJpaGNiaUFnSUNBZ0lDQWdJQ0JqWVd4c1NXNTJiMnRsVjJsMGFFMWxkR2h2WkVGdVpFRnlaeXhjYmlBZ0lDQWdJQ0FnSUNBdkx5QkJkbTlwWkNCd2NtOXdZV2RoZEdsdVp5Qm1ZV2xzZFhKbGN5QjBieUJRY205dGFYTmxjeUJ5WlhSMWNtNWxaQ0JpZVNCc1lYUmxjbHh1SUNBZ0lDQWdJQ0FnSUM4dklHbHVkbTlqWVhScGIyNXpJRzltSUhSb1pTQnBkR1Z5WVhSdmNpNWNiaUFnSUNBZ0lDQWdJQ0JqWVd4c1NXNTJiMnRsVjJsMGFFMWxkR2h2WkVGdVpFRnlaMXh1SUNBZ0lDQWdJQ0FwSURvZ1kyRnNiRWx1ZG05clpWZHBkR2hOWlhSb2IyUkJibVJCY21jb0tUdGNiaUFnSUNCOVhHNWNiaUFnSUNBdkx5QkVaV1pwYm1VZ2RHaGxJSFZ1YVdacFpXUWdhR1ZzY0dWeUlHMWxkR2h2WkNCMGFHRjBJR2x6SUhWelpXUWdkRzhnYVcxd2JHVnRaVzUwSUM1dVpYaDBMRnh1SUNBZ0lDOHZJQzUwYUhKdmR5d2dZVzVrSUM1eVpYUjFjbTRnS0hObFpTQmtaV1pwYm1WSmRHVnlZWFJ2Y2sxbGRHaHZaSE1wTGx4dUlDQWdJSFJvYVhNdVgybHVkbTlyWlNBOUlHVnVjWFZsZFdVN1hHNGdJSDFjYmx4dUlDQmtaV1pwYm1WSmRHVnlZWFJ2Y2sxbGRHaHZaSE1vUVhONWJtTkpkR1Z5WVhSdmNpNXdjbTkwYjNSNWNHVXBPMXh1SUNCa1pXWnBibVVvUVhONWJtTkpkR1Z5WVhSdmNpNXdjbTkwYjNSNWNHVXNJR0Z6ZVc1alNYUmxjbUYwYjNKVGVXMWliMndzSUdaMWJtTjBhVzl1SUNncElIdGNiaUFnSUNCeVpYUjFjbTRnZEdocGN6dGNiaUFnZlNrN1hHNGdJR1Y0Y0c5eWRITXVRWE41Ym1OSmRHVnlZWFJ2Y2lBOUlFRnplVzVqU1hSbGNtRjBiM0k3WEc1Y2JpQWdMeThnVG05MFpTQjBhR0YwSUhOcGJYQnNaU0JoYzNsdVl5Qm1kVzVqZEdsdmJuTWdZWEpsSUdsdGNHeGxiV1Z1ZEdWa0lHOXVJSFJ2Y0NCdlpseHVJQ0F2THlCQmMzbHVZMGwwWlhKaGRHOXlJRzlpYW1WamRITTdJSFJvWlhrZ2FuVnpkQ0J5WlhSMWNtNGdZU0JRY205dGFYTmxJR1p2Y2lCMGFHVWdkbUZzZFdVZ2IyWmNiaUFnTHk4Z2RHaGxJR1pwYm1Gc0lISmxjM1ZzZENCd2NtOWtkV05sWkNCaWVTQjBhR1VnYVhSbGNtRjBiM0l1WEc0Z0lHVjRjRzl5ZEhNdVlYTjVibU1nUFNCbWRXNWpkR2x2YmlocGJtNWxja1p1TENCdmRYUmxja1p1TENCelpXeG1MQ0IwY25sTWIyTnpUR2x6ZEN3Z1VISnZiV2x6WlVsdGNHd3BJSHRjYmlBZ0lDQnBaaUFvVUhKdmJXbHpaVWx0Y0d3Z1BUMDlJSFp2YVdRZ01Da2dVSEp2YldselpVbHRjR3dnUFNCUWNtOXRhWE5sTzF4dVhHNGdJQ0FnZG1GeUlHbDBaWElnUFNCdVpYY2dRWE41Ym1OSmRHVnlZWFJ2Y2loY2JpQWdJQ0FnSUhkeVlYQW9hVzV1WlhKR2Jpd2diM1YwWlhKR2Jpd2djMlZzWml3Z2RISjVURzlqYzB4cGMzUXBMRnh1SUNBZ0lDQWdVSEp2YldselpVbHRjR3hjYmlBZ0lDQXBPMXh1WEc0Z0lDQWdjbVYwZFhKdUlHVjRjRzl5ZEhNdWFYTkhaVzVsY21GMGIzSkdkVzVqZEdsdmJpaHZkWFJsY2tadUtWeHVJQ0FnSUNBZ1B5QnBkR1Z5SUM4dklFbG1JRzkxZEdWeVJtNGdhWE1nWVNCblpXNWxjbUYwYjNJc0lISmxkSFZ5YmlCMGFHVWdablZzYkNCcGRHVnlZWFJ2Y2k1Y2JpQWdJQ0FnSURvZ2FYUmxjaTV1WlhoMEtDa3VkR2hsYmlobWRXNWpkR2x2YmloeVpYTjFiSFFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2NtVnpkV3gwTG1SdmJtVWdQeUJ5WlhOMWJIUXVkbUZzZFdVZ09pQnBkR1Z5TG01bGVIUW9LVHRjYmlBZ0lDQWdJQ0FnZlNrN1hHNGdJSDA3WEc1Y2JpQWdablZ1WTNScGIyNGdiV0ZyWlVsdWRtOXJaVTFsZEdodlpDaHBibTVsY2tadUxDQnpaV3htTENCamIyNTBaWGgwS1NCN1hHNGdJQ0FnZG1GeUlITjBZWFJsSUQwZ1IyVnVVM1JoZEdWVGRYTndaVzVrWldSVGRHRnlkRHRjYmx4dUlDQWdJSEpsZEhWeWJpQm1kVzVqZEdsdmJpQnBiblp2YTJVb2JXVjBhRzlrTENCaGNtY3BJSHRjYmlBZ0lDQWdJR2xtSUNoemRHRjBaU0E5UFQwZ1IyVnVVM1JoZEdWRmVHVmpkWFJwYm1jcElIdGNiaUFnSUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtGd2lSMlZ1WlhKaGRHOXlJR2x6SUdGc2NtVmhaSGtnY25WdWJtbHVaMXdpS1R0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2FXWWdLSE4wWVhSbElEMDlQU0JIWlc1VGRHRjBaVU52YlhCc1pYUmxaQ2tnZTF4dUlDQWdJQ0FnSUNCcFppQW9iV1YwYUc5a0lEMDlQU0JjSW5Sb2NtOTNYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQjBhSEp2ZHlCaGNtYzdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBdkx5QkNaU0JtYjNKbmFYWnBibWNzSUhCbGNpQXlOUzR6TGpNdU15NHpJRzltSUhSb1pTQnpjR1ZqT2x4dUlDQWdJQ0FnSUNBdkx5Qm9kSFJ3Y3pvdkwzQmxiM0JzWlM1dGIzcHBiR3hoTG05eVp5OSthbTl5Wlc1a2IzSm1aaTlsY3pZdFpISmhablF1YUhSdGJDTnpaV010WjJWdVpYSmhkRzl5Y21WemRXMWxYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQmtiMjVsVW1WemRXeDBLQ2s3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUdOdmJuUmxlSFF1YldWMGFHOWtJRDBnYldWMGFHOWtPMXh1SUNBZ0lDQWdZMjl1ZEdWNGRDNWhjbWNnUFNCaGNtYzdYRzVjYmlBZ0lDQWdJSGRvYVd4bElDaDBjblZsS1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUJrWld4bFoyRjBaU0E5SUdOdmJuUmxlSFF1WkdWc1pXZGhkR1U3WEc0Z0lDQWdJQ0FnSUdsbUlDaGtaV3hsWjJGMFpTa2dlMXh1SUNBZ0lDQWdJQ0FnSUhaaGNpQmtaV3hsWjJGMFpWSmxjM1ZzZENBOUlHMWhlV0psU1c1MmIydGxSR1ZzWldkaGRHVW9aR1ZzWldkaGRHVXNJR052Ym5SbGVIUXBPMXh1SUNBZ0lDQWdJQ0FnSUdsbUlDaGtaV3hsWjJGMFpWSmxjM1ZzZENrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tHUmxiR1ZuWVhSbFVtVnpkV3gwSUQwOVBTQkRiMjUwYVc1MVpWTmxiblJwYm1Wc0tTQmpiMjUwYVc1MVpUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJrWld4bFoyRjBaVkpsYzNWc2REdGNiaUFnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQnBaaUFvWTI5dWRHVjRkQzV0WlhSb2IyUWdQVDA5SUZ3aWJtVjRkRndpS1NCN1hHNGdJQ0FnSUNBZ0lDQWdMeThnVTJWMGRHbHVaeUJqYjI1MFpYaDBMbDl6Wlc1MElHWnZjaUJzWldkaFkza2djM1Z3Y0c5eWRDQnZaaUJDWVdKbGJDZHpYRzRnSUNBZ0lDQWdJQ0FnTHk4Z1puVnVZM1JwYjI0dWMyVnVkQ0JwYlhCc1pXMWxiblJoZEdsdmJpNWNiaUFnSUNBZ0lDQWdJQ0JqYjI1MFpYaDBMbk5sYm5RZ1BTQmpiMjUwWlhoMExsOXpaVzUwSUQwZ1kyOXVkR1Y0ZEM1aGNtYzdYRzVjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNoamIyNTBaWGgwTG0xbGRHaHZaQ0E5UFQwZ1hDSjBhSEp2ZDF3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tITjBZWFJsSUQwOVBTQkhaVzVUZEdGMFpWTjFjM0JsYm1SbFpGTjBZWEowS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6ZEdGMFpTQTlJRWRsYmxOMFlYUmxRMjl0Y0d4bGRHVmtPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHliM2NnWTI5dWRHVjRkQzVoY21jN1hHNGdJQ0FnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ1kyOXVkR1Y0ZEM1a2FYTndZWFJqYUVWNFkyVndkR2x2YmloamIyNTBaWGgwTG1GeVp5azdYRzVjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNoamIyNTBaWGgwTG0xbGRHaHZaQ0E5UFQwZ1hDSnlaWFIxY201Y0lpa2dlMXh1SUNBZ0lDQWdJQ0FnSUdOdmJuUmxlSFF1WVdKeWRYQjBLRndpY21WMGRYSnVYQ0lzSUdOdmJuUmxlSFF1WVhKbktUdGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUhOMFlYUmxJRDBnUjJWdVUzUmhkR1ZGZUdWamRYUnBibWM3WEc1Y2JpQWdJQ0FnSUNBZ2RtRnlJSEpsWTI5eVpDQTlJSFJ5ZVVOaGRHTm9LR2x1Ym1WeVJtNHNJSE5sYkdZc0lHTnZiblJsZUhRcE8xeHVJQ0FnSUNBZ0lDQnBaaUFvY21WamIzSmtMblI1Y0dVZ1BUMDlJRndpYm05eWJXRnNYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQXZMeUJKWmlCaGJpQmxlR05sY0hScGIyNGdhWE1nZEdoeWIzZHVJR1p5YjIwZ2FXNXVaWEpHYml3Z2QyVWdiR1ZoZG1VZ2MzUmhkR1VnUFQwOVhHNGdJQ0FnSUNBZ0lDQWdMeThnUjJWdVUzUmhkR1ZGZUdWamRYUnBibWNnWVc1a0lHeHZiM0FnWW1GamF5Qm1iM0lnWVc1dmRHaGxjaUJwYm5adlkyRjBhVzl1TGx4dUlDQWdJQ0FnSUNBZ0lITjBZWFJsSUQwZ1kyOXVkR1Y0ZEM1a2IyNWxYRzRnSUNBZ0lDQWdJQ0FnSUNBL0lFZGxibE4wWVhSbFEyOXRjR3hsZEdWa1hHNGdJQ0FnSUNBZ0lDQWdJQ0E2SUVkbGJsTjBZWFJsVTNWemNHVnVaR1ZrV1dsbGJHUTdYRzVjYmlBZ0lDQWdJQ0FnSUNCcFppQW9jbVZqYjNKa0xtRnlaeUE5UFQwZ1EyOXVkR2x1ZFdWVFpXNTBhVzVsYkNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWTI5dWRHbHVkV1U3WEc0Z0lDQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhiSFZsT2lCeVpXTnZjbVF1WVhKbkxGeHVJQ0FnSUNBZ0lDQWdJQ0FnWkc5dVpUb2dZMjl1ZEdWNGRDNWtiMjVsWEc0Z0lDQWdJQ0FnSUNBZ2ZUdGNibHh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0hKbFkyOXlaQzUwZVhCbElEMDlQU0JjSW5Sb2NtOTNYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQnpkR0YwWlNBOUlFZGxibE4wWVhSbFEyOXRjR3hsZEdWa08xeHVJQ0FnSUNBZ0lDQWdJQzh2SUVScGMzQmhkR05vSUhSb1pTQmxlR05sY0hScGIyNGdZbmtnYkc5dmNHbHVaeUJpWVdOcklHRnliM1Z1WkNCMGJ5QjBhR1ZjYmlBZ0lDQWdJQ0FnSUNBdkx5QmpiMjUwWlhoMExtUnBjM0JoZEdOb1JYaGpaWEIwYVc5dUtHTnZiblJsZUhRdVlYSm5LU0JqWVd4c0lHRmliM1psTGx4dUlDQWdJQ0FnSUNBZ0lHTnZiblJsZUhRdWJXVjBhRzlrSUQwZ1hDSjBhSEp2ZDF3aU8xeHVJQ0FnSUNBZ0lDQWdJR052Ym5SbGVIUXVZWEpuSUQwZ2NtVmpiM0prTG1GeVp6dGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmVnh1SUNBZ0lIMDdYRzRnSUgxY2JseHVJQ0F2THlCRFlXeHNJR1JsYkdWbllYUmxMbWwwWlhKaGRHOXlXMk52Ym5SbGVIUXViV1YwYUc5a1hTaGpiMjUwWlhoMExtRnlaeWtnWVc1a0lHaGhibVJzWlNCMGFHVmNiaUFnTHk4Z2NtVnpkV3gwTENCbGFYUm9aWElnWW5rZ2NtVjBkWEp1YVc1bklHRWdleUIyWVd4MVpTd2daRzl1WlNCOUlISmxjM1ZzZENCbWNtOXRJSFJvWlZ4dUlDQXZMeUJrWld4bFoyRjBaU0JwZEdWeVlYUnZjaXdnYjNJZ1lua2diVzlrYVdaNWFXNW5JR052Ym5SbGVIUXViV1YwYUc5a0lHRnVaQ0JqYjI1MFpYaDBMbUZ5Wnl4Y2JpQWdMeThnYzJWMGRHbHVaeUJqYjI1MFpYaDBMbVJsYkdWbllYUmxJSFJ2SUc1MWJHd3NJR0Z1WkNCeVpYUjFjbTVwYm1jZ2RHaGxJRU52Ym5ScGJuVmxVMlZ1ZEdsdVpXd3VYRzRnSUdaMWJtTjBhVzl1SUcxaGVXSmxTVzUyYjJ0bFJHVnNaV2RoZEdVb1pHVnNaV2RoZEdVc0lHTnZiblJsZUhRcElIdGNiaUFnSUNCMllYSWdiV1YwYUc5a0lEMGdaR1ZzWldkaGRHVXVhWFJsY21GMGIzSmJZMjl1ZEdWNGRDNXRaWFJvYjJSZE8xeHVJQ0FnSUdsbUlDaHRaWFJvYjJRZ1BUMDlJSFZ1WkdWbWFXNWxaQ2tnZTF4dUlDQWdJQ0FnTHk4Z1FTQXVkR2h5YjNjZ2IzSWdMbkpsZEhWeWJpQjNhR1Z1SUhSb1pTQmtaV3hsWjJGMFpTQnBkR1Z5WVhSdmNpQm9ZWE1nYm04Z0xuUm9jbTkzWEc0Z0lDQWdJQ0F2THlCdFpYUm9iMlFnWVd4M1lYbHpJSFJsY20xcGJtRjBaWE1nZEdobElIbHBaV3hrS2lCc2IyOXdMbHh1SUNBZ0lDQWdZMjl1ZEdWNGRDNWtaV3hsWjJGMFpTQTlJRzUxYkd3N1hHNWNiaUFnSUNBZ0lHbG1JQ2hqYjI1MFpYaDBMbTFsZEdodlpDQTlQVDBnWENKMGFISnZkMXdpS1NCN1hHNGdJQ0FnSUNBZ0lDOHZJRTV2ZEdVNklGdGNJbkpsZEhWeWJsd2lYU0J0ZFhOMElHSmxJSFZ6WldRZ1ptOXlJRVZUTXlCd1lYSnphVzVuSUdOdmJYQmhkR2xpYVd4cGRIa3VYRzRnSUNBZ0lDQWdJR2xtSUNoa1pXeGxaMkYwWlM1cGRHVnlZWFJ2Y2x0Y0luSmxkSFZ5Ymx3aVhTa2dlMXh1SUNBZ0lDQWdJQ0FnSUM4dklFbG1JSFJvWlNCa1pXeGxaMkYwWlNCcGRHVnlZWFJ2Y2lCb1lYTWdZU0J5WlhSMWNtNGdiV1YwYUc5a0xDQm5hWFpsSUdsMElHRmNiaUFnSUNBZ0lDQWdJQ0F2THlCamFHRnVZMlVnZEc4Z1kyeGxZVzRnZFhBdVhHNGdJQ0FnSUNBZ0lDQWdZMjl1ZEdWNGRDNXRaWFJvYjJRZ1BTQmNJbkpsZEhWeWJsd2lPMXh1SUNBZ0lDQWdJQ0FnSUdOdmJuUmxlSFF1WVhKbklEMGdkVzVrWldacGJtVmtPMXh1SUNBZ0lDQWdJQ0FnSUcxaGVXSmxTVzUyYjJ0bFJHVnNaV2RoZEdVb1pHVnNaV2RoZEdVc0lHTnZiblJsZUhRcE8xeHVYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tHTnZiblJsZUhRdWJXVjBhRzlrSUQwOVBTQmNJblJvY205M1hDSXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJRWxtSUcxaGVXSmxTVzUyYjJ0bFJHVnNaV2RoZEdVb1kyOXVkR1Y0ZENrZ1kyaGhibWRsWkNCamIyNTBaWGgwTG0xbGRHaHZaQ0JtY205dFhHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlCY0luSmxkSFZ5Ymx3aUlIUnZJRndpZEdoeWIzZGNJaXdnYkdWMElIUm9ZWFFnYjNabGNuSnBaR1VnZEdobElGUjVjR1ZGY25KdmNpQmlaV3h2ZHk1Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQkRiMjUwYVc1MVpWTmxiblJwYm1Wc08xeHVJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lHTnZiblJsZUhRdWJXVjBhRzlrSUQwZ1hDSjBhSEp2ZDF3aU8xeHVJQ0FnSUNBZ0lDQmpiMjUwWlhoMExtRnlaeUE5SUc1bGR5QlVlWEJsUlhKeWIzSW9YRzRnSUNBZ0lDQWdJQ0FnWENKVWFHVWdhWFJsY21GMGIzSWdaRzlsY3lCdWIzUWdjSEp2ZG1sa1pTQmhJQ2QwYUhKdmR5Y2diV1YwYUc5a1hDSXBPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0J5WlhSMWNtNGdRMjl1ZEdsdWRXVlRaVzUwYVc1bGJEdGNiaUFnSUNCOVhHNWNiaUFnSUNCMllYSWdjbVZqYjNKa0lEMGdkSEo1UTJGMFkyZ29iV1YwYUc5a0xDQmtaV3hsWjJGMFpTNXBkR1Z5WVhSdmNpd2dZMjl1ZEdWNGRDNWhjbWNwTzF4dVhHNGdJQ0FnYVdZZ0tISmxZMjl5WkM1MGVYQmxJRDA5UFNCY0luUm9jbTkzWENJcElIdGNiaUFnSUNBZ0lHTnZiblJsZUhRdWJXVjBhRzlrSUQwZ1hDSjBhSEp2ZDF3aU8xeHVJQ0FnSUNBZ1kyOXVkR1Y0ZEM1aGNtY2dQU0J5WldOdmNtUXVZWEpuTzF4dUlDQWdJQ0FnWTI5dWRHVjRkQzVrWld4bFoyRjBaU0E5SUc1MWJHdzdYRzRnSUNBZ0lDQnlaWFIxY200Z1EyOXVkR2x1ZFdWVFpXNTBhVzVsYkR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0IyWVhJZ2FXNW1ieUE5SUhKbFkyOXlaQzVoY21jN1hHNWNiaUFnSUNCcFppQW9JU0JwYm1adktTQjdYRzRnSUNBZ0lDQmpiMjUwWlhoMExtMWxkR2h2WkNBOUlGd2lkR2h5YjNkY0lqdGNiaUFnSUNBZ0lHTnZiblJsZUhRdVlYSm5JRDBnYm1WM0lGUjVjR1ZGY25KdmNpaGNJbWwwWlhKaGRHOXlJSEpsYzNWc2RDQnBjeUJ1YjNRZ1lXNGdiMkpxWldOMFhDSXBPMXh1SUNBZ0lDQWdZMjl1ZEdWNGRDNWtaV3hsWjJGMFpTQTlJRzUxYkd3N1hHNGdJQ0FnSUNCeVpYUjFjbTRnUTI5dWRHbHVkV1ZUWlc1MGFXNWxiRHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvYVc1bWJ5NWtiMjVsS1NCN1hHNGdJQ0FnSUNBdkx5QkJjM05wWjI0Z2RHaGxJSEpsYzNWc2RDQnZaaUIwYUdVZ1ptbHVhWE5vWldRZ1pHVnNaV2RoZEdVZ2RHOGdkR2hsSUhSbGJYQnZjbUZ5ZVZ4dUlDQWdJQ0FnTHk4Z2RtRnlhV0ZpYkdVZ2MzQmxZMmxtYVdWa0lHSjVJR1JsYkdWbllYUmxMbkpsYzNWc2RFNWhiV1VnS0hObFpTQmtaV3hsWjJGMFpWbHBaV3hrS1M1Y2JpQWdJQ0FnSUdOdmJuUmxlSFJiWkdWc1pXZGhkR1V1Y21WemRXeDBUbUZ0WlYwZ1BTQnBibVp2TG5aaGJIVmxPMXh1WEc0Z0lDQWdJQ0F2THlCU1pYTjFiV1VnWlhobFkzVjBhVzl1SUdGMElIUm9aU0JrWlhOcGNtVmtJR3h2WTJGMGFXOXVJQ2h6WldVZ1pHVnNaV2RoZEdWWmFXVnNaQ2t1WEc0Z0lDQWdJQ0JqYjI1MFpYaDBMbTVsZUhRZ1BTQmtaV3hsWjJGMFpTNXVaWGgwVEc5ak8xeHVYRzRnSUNBZ0lDQXZMeUJKWmlCamIyNTBaWGgwTG0xbGRHaHZaQ0IzWVhNZ1hDSjBhSEp2ZDF3aUlHSjFkQ0IwYUdVZ1pHVnNaV2RoZEdVZ2FHRnVaR3hsWkNCMGFHVmNiaUFnSUNBZ0lDOHZJR1Y0WTJWd2RHbHZiaXdnYkdWMElIUm9aU0J2ZFhSbGNpQm5aVzVsY21GMGIzSWdjSEp2WTJWbFpDQnViM0p0WVd4c2VTNGdTV1pjYmlBZ0lDQWdJQzh2SUdOdmJuUmxlSFF1YldWMGFHOWtJSGRoY3lCY0ltNWxlSFJjSWl3Z1ptOXlaMlYwSUdOdmJuUmxlSFF1WVhKbklITnBibU5sSUdsMElHaGhjeUJpWldWdVhHNGdJQ0FnSUNBdkx5QmNJbU52Ym5OMWJXVmtYQ0lnWW5rZ2RHaGxJR1JsYkdWbllYUmxJR2wwWlhKaGRHOXlMaUJKWmlCamIyNTBaWGgwTG0xbGRHaHZaQ0IzWVhOY2JpQWdJQ0FnSUM4dklGd2ljbVYwZFhKdVhDSXNJR0ZzYkc5M0lIUm9aU0J2Y21sbmFXNWhiQ0F1Y21WMGRYSnVJR05oYkd3Z2RHOGdZMjl1ZEdsdWRXVWdhVzRnZEdobFhHNGdJQ0FnSUNBdkx5QnZkWFJsY2lCblpXNWxjbUYwYjNJdVhHNGdJQ0FnSUNCcFppQW9ZMjl1ZEdWNGRDNXRaWFJvYjJRZ0lUMDlJRndpY21WMGRYSnVYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVkR1Y0ZEM1dFpYUm9iMlFnUFNCY0ltNWxlSFJjSWp0Y2JpQWdJQ0FnSUNBZ1kyOXVkR1Y0ZEM1aGNtY2dQU0IxYm1SbFptbHVaV1E3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdMeThnVW1VdGVXbGxiR1FnZEdobElISmxjM1ZzZENCeVpYUjFjbTVsWkNCaWVTQjBhR1VnWkdWc1pXZGhkR1VnYldWMGFHOWtMbHh1SUNBZ0lDQWdjbVYwZFhKdUlHbHVabTg3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnVkdobElHUmxiR1ZuWVhSbElHbDBaWEpoZEc5eUlHbHpJR1pwYm1semFHVmtMQ0J6YnlCbWIzSm5aWFFnYVhRZ1lXNWtJR052Ym5ScGJuVmxJSGRwZEdoY2JpQWdJQ0F2THlCMGFHVWdiM1YwWlhJZ1oyVnVaWEpoZEc5eUxseHVJQ0FnSUdOdmJuUmxlSFF1WkdWc1pXZGhkR1VnUFNCdWRXeHNPMXh1SUNBZ0lISmxkSFZ5YmlCRGIyNTBhVzUxWlZObGJuUnBibVZzTzF4dUlDQjlYRzVjYmlBZ0x5OGdSR1ZtYVc1bElFZGxibVZ5WVhSdmNpNXdjbTkwYjNSNWNHVXVlMjVsZUhRc2RHaHliM2NzY21WMGRYSnVmU0JwYmlCMFpYSnRjeUJ2WmlCMGFHVmNiaUFnTHk4Z2RXNXBabWxsWkNBdVgybHVkbTlyWlNCb1pXeHdaWElnYldWMGFHOWtMbHh1SUNCa1pXWnBibVZKZEdWeVlYUnZjazFsZEdodlpITW9SM0FwTzF4dVhHNGdJR1JsWm1sdVpTaEhjQ3dnZEc5VGRISnBibWRVWVdkVGVXMWliMndzSUZ3aVIyVnVaWEpoZEc5eVhDSXBPMXh1WEc0Z0lDOHZJRUVnUjJWdVpYSmhkRzl5SUhOb2IzVnNaQ0JoYkhkaGVYTWdjbVYwZFhKdUlHbDBjMlZzWmlCaGN5QjBhR1VnYVhSbGNtRjBiM0lnYjJKcVpXTjBJSGRvWlc0Z2RHaGxYRzRnSUM4dklFQkFhWFJsY21GMGIzSWdablZ1WTNScGIyNGdhWE1nWTJGc2JHVmtJRzl1SUdsMExpQlRiMjFsSUdKeWIzZHpaWEp6SnlCcGJYQnNaVzFsYm5SaGRHbHZibk1nYjJZZ2RHaGxYRzRnSUM4dklHbDBaWEpoZEc5eUlIQnliM1J2ZEhsd1pTQmphR0ZwYmlCcGJtTnZjbkpsWTNSc2VTQnBiWEJzWlcxbGJuUWdkR2hwY3l3Z1kyRjFjMmx1WnlCMGFHVWdSMlZ1WlhKaGRHOXlYRzRnSUM4dklHOWlhbVZqZENCMGJ5QnViM1FnWW1VZ2NtVjBkWEp1WldRZ1puSnZiU0IwYUdseklHTmhiR3d1SUZSb2FYTWdaVzV6ZFhKbGN5QjBhR0YwSUdSdlpYTnVKM1FnYUdGd2NHVnVMbHh1SUNBdkx5QlRaV1VnYUhSMGNITTZMeTluYVhSb2RXSXVZMjl0TDJaaFkyVmliMjlyTDNKbFoyVnVaWEpoZEc5eUwybHpjM1ZsY3k4eU56UWdabTl5SUcxdmNtVWdaR1YwWVdsc2N5NWNiaUFnWkdWbWFXNWxLRWR3TENCcGRHVnlZWFJ2Y2xONWJXSnZiQ3dnWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFJvYVhNN1hHNGdJSDBwTzF4dVhHNGdJR1JsWm1sdVpTaEhjQ3dnWENKMGIxTjBjbWx1WjF3aUxDQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQnlaWFIxY200Z1hDSmJiMkpxWldOMElFZGxibVZ5WVhSdmNsMWNJanRjYmlBZ2ZTazdYRzVjYmlBZ1puVnVZM1JwYjI0Z2NIVnphRlJ5ZVVWdWRISjVLR3h2WTNNcElIdGNiaUFnSUNCMllYSWdaVzUwY25rZ1BTQjdJSFJ5ZVV4dll6b2diRzlqYzFzd1hTQjlPMXh1WEc0Z0lDQWdhV1lnS0RFZ2FXNGdiRzlqY3lrZ2UxeHVJQ0FnSUNBZ1pXNTBjbmt1WTJGMFkyaE1iMk1nUFNCc2IyTnpXekZkTzF4dUlDQWdJSDFjYmx4dUlDQWdJR2xtSUNneUlHbHVJR3h2WTNNcElIdGNiaUFnSUNBZ0lHVnVkSEo1TG1acGJtRnNiSGxNYjJNZ1BTQnNiMk56V3pKZE8xeHVJQ0FnSUNBZ1pXNTBjbmt1WVdaMFpYSk1iMk1nUFNCc2IyTnpXek5kTzF4dUlDQWdJSDFjYmx4dUlDQWdJSFJvYVhNdWRISjVSVzUwY21sbGN5NXdkWE5vS0dWdWRISjVLVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhKbGMyVjBWSEo1Ulc1MGNua29aVzUwY25rcElIdGNiaUFnSUNCMllYSWdjbVZqYjNKa0lEMGdaVzUwY25rdVkyOXRjR3hsZEdsdmJpQjhmQ0I3ZlR0Y2JpQWdJQ0J5WldOdmNtUXVkSGx3WlNBOUlGd2libTl5YldGc1hDSTdYRzRnSUNBZ1pHVnNaWFJsSUhKbFkyOXlaQzVoY21jN1hHNGdJQ0FnWlc1MGNua3VZMjl0Y0d4bGRHbHZiaUE5SUhKbFkyOXlaRHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUVOdmJuUmxlSFFvZEhKNVRHOWpjMHhwYzNRcElIdGNiaUFnSUNBdkx5QlVhR1VnY205dmRDQmxiblJ5ZVNCdlltcGxZM1FnS0dWbVptVmpkR2wyWld4NUlHRWdkSEo1SUhOMFlYUmxiV1Z1ZENCM2FYUm9iM1YwSUdFZ1kyRjBZMmhjYmlBZ0lDQXZMeUJ2Y2lCaElHWnBibUZzYkhrZ1lteHZZMnNwSUdkcGRtVnpJSFZ6SUdFZ2NHeGhZMlVnZEc4Z2MzUnZjbVVnZG1Gc2RXVnpJSFJvY205M2JpQm1jbTl0WEc0Z0lDQWdMeThnYkc5allYUnBiMjV6SUhkb1pYSmxJSFJvWlhKbElHbHpJRzV2SUdWdVkyeHZjMmx1WnlCMGNua2djM1JoZEdWdFpXNTBMbHh1SUNBZ0lIUm9hWE11ZEhKNVJXNTBjbWxsY3lBOUlGdDdJSFJ5ZVV4dll6b2dYQ0p5YjI5MFhDSWdmVjA3WEc0Z0lDQWdkSEo1VEc5amMweHBjM1F1Wm05eVJXRmphQ2h3ZFhOb1ZISjVSVzUwY25rc0lIUm9hWE1wTzF4dUlDQWdJSFJvYVhNdWNtVnpaWFFvZEhKMVpTazdYRzRnSUgxY2JseHVJQ0JsZUhCdmNuUnpMbXRsZVhNZ1BTQm1kVzVqZEdsdmJpaHZZbXBsWTNRcElIdGNiaUFnSUNCMllYSWdhMlY1Y3lBOUlGdGRPMXh1SUNBZ0lHWnZjaUFvZG1GeUlHdGxlU0JwYmlCdlltcGxZM1FwSUh0Y2JpQWdJQ0FnSUd0bGVYTXVjSFZ6YUNoclpYa3BPMXh1SUNBZ0lIMWNiaUFnSUNCclpYbHpMbkpsZG1WeWMyVW9LVHRjYmx4dUlDQWdJQzh2SUZKaGRHaGxjaUIwYUdGdUlISmxkSFZ5Ym1sdVp5QmhiaUJ2WW1wbFkzUWdkMmwwYUNCaElHNWxlSFFnYldWMGFHOWtMQ0IzWlNCclpXVndYRzRnSUNBZ0x5OGdkR2hwYm1keklITnBiWEJzWlNCaGJtUWdjbVYwZFhKdUlIUm9aU0J1WlhoMElHWjFibU4wYVc5dUlHbDBjMlZzWmk1Y2JpQWdJQ0J5WlhSMWNtNGdablZ1WTNScGIyNGdibVY0ZENncElIdGNiaUFnSUNBZ0lIZG9hV3hsSUNoclpYbHpMbXhsYm1kMGFDa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ2EyVjVJRDBnYTJWNWN5NXdiM0FvS1R0Y2JpQWdJQ0FnSUNBZ2FXWWdLR3RsZVNCcGJpQnZZbXBsWTNRcElIdGNiaUFnSUNBZ0lDQWdJQ0J1WlhoMExuWmhiSFZsSUQwZ2EyVjVPMXh1SUNBZ0lDQWdJQ0FnSUc1bGVIUXVaRzl1WlNBOUlHWmhiSE5sTzF4dUlDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCdVpYaDBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUM4dklGUnZJR0YyYjJsa0lHTnlaV0YwYVc1bklHRnVJR0ZrWkdsMGFXOXVZV3dnYjJKcVpXTjBMQ0IzWlNCcWRYTjBJR2hoYm1jZ2RHaGxJQzUyWVd4MVpWeHVJQ0FnSUNBZ0x5OGdZVzVrSUM1a2IyNWxJSEJ5YjNCbGNuUnBaWE1nYjJabUlIUm9aU0J1WlhoMElHWjFibU4wYVc5dUlHOWlhbVZqZENCcGRITmxiR1l1SUZSb2FYTmNiaUFnSUNBZ0lDOHZJR0ZzYzI4Z1pXNXpkWEpsY3lCMGFHRjBJSFJvWlNCdGFXNXBabWxsY2lCM2FXeHNJRzV2ZENCaGJtOXVlVzFwZW1VZ2RHaGxJR1oxYm1OMGFXOXVMbHh1SUNBZ0lDQWdibVY0ZEM1a2IyNWxJRDBnZEhKMVpUdGNiaUFnSUNBZ0lISmxkSFZ5YmlCdVpYaDBPMXh1SUNBZ0lIMDdYRzRnSUgwN1hHNWNiaUFnWm5WdVkzUnBiMjRnZG1Gc2RXVnpLR2wwWlhKaFlteGxLU0I3WEc0Z0lDQWdhV1lnS0dsMFpYSmhZbXhsS1NCN1hHNGdJQ0FnSUNCMllYSWdhWFJsY21GMGIzSk5aWFJvYjJRZ1BTQnBkR1Z5WVdKc1pWdHBkR1Z5WVhSdmNsTjViV0p2YkYwN1hHNGdJQ0FnSUNCcFppQW9hWFJsY21GMGIzSk5aWFJvYjJRcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHbDBaWEpoZEc5eVRXVjBhRzlrTG1OaGJHd29hWFJsY21GaWJHVXBPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0JwWmlBb2RIbHdaVzltSUdsMFpYSmhZbXhsTG01bGVIUWdQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdhWFJsY21GaWJHVTdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJR2xtSUNnaGFYTk9ZVTRvYVhSbGNtRmliR1V1YkdWdVozUm9LU2tnZTF4dUlDQWdJQ0FnSUNCMllYSWdhU0E5SUMweExDQnVaWGgwSUQwZ1puVnVZM1JwYjI0Z2JtVjRkQ2dwSUh0Y2JpQWdJQ0FnSUNBZ0lDQjNhR2xzWlNBb0t5dHBJRHdnYVhSbGNtRmliR1V1YkdWdVozUm9LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvYUdGelQzZHVMbU5oYkd3b2FYUmxjbUZpYkdVc0lHa3BLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJRzVsZUhRdWRtRnNkV1VnUFNCcGRHVnlZV0pzWlZ0cFhUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ2JtVjRkQzVrYjI1bElEMGdabUZzYzJVN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJ1WlhoME8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUc1bGVIUXVkbUZzZFdVZ1BTQjFibVJsWm1sdVpXUTdYRzRnSUNBZ0lDQWdJQ0FnYm1WNGRDNWtiMjVsSUQwZ2RISjFaVHRjYmx4dUlDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCdVpYaDBPMXh1SUNBZ0lDQWdJQ0I5TzF4dVhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCdVpYaDBMbTVsZUhRZ1BTQnVaWGgwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dUlDQWdJQzh2SUZKbGRIVnliaUJoYmlCcGRHVnlZWFJ2Y2lCM2FYUm9JRzV2SUhaaGJIVmxjeTVjYmlBZ0lDQnlaWFIxY200Z2V5QnVaWGgwT2lCa2IyNWxVbVZ6ZFd4MElIMDdYRzRnSUgxY2JpQWdaWGh3YjNKMGN5NTJZV3gxWlhNZ1BTQjJZV3gxWlhNN1hHNWNiaUFnWm5WdVkzUnBiMjRnWkc5dVpWSmxjM1ZzZENncElIdGNiaUFnSUNCeVpYUjFjbTRnZXlCMllXeDFaVG9nZFc1a1pXWnBibVZrTENCa2IyNWxPaUIwY25WbElIMDdYRzRnSUgxY2JseHVJQ0JEYjI1MFpYaDBMbkJ5YjNSdmRIbHdaU0E5SUh0Y2JpQWdJQ0JqYjI1emRISjFZM1J2Y2pvZ1EyOXVkR1Y0ZEN4Y2JseHVJQ0FnSUhKbGMyVjBPaUJtZFc1amRHbHZiaWh6YTJsd1ZHVnRjRkpsYzJWMEtTQjdYRzRnSUNBZ0lDQjBhR2x6TG5CeVpYWWdQU0F3TzF4dUlDQWdJQ0FnZEdocGN5NXVaWGgwSUQwZ01EdGNiaUFnSUNBZ0lDOHZJRkpsYzJWMGRHbHVaeUJqYjI1MFpYaDBMbDl6Wlc1MElHWnZjaUJzWldkaFkza2djM1Z3Y0c5eWRDQnZaaUJDWVdKbGJDZHpYRzRnSUNBZ0lDQXZMeUJtZFc1amRHbHZiaTV6Wlc1MElHbHRjR3hsYldWdWRHRjBhVzl1TGx4dUlDQWdJQ0FnZEdocGN5NXpaVzUwSUQwZ2RHaHBjeTVmYzJWdWRDQTlJSFZ1WkdWbWFXNWxaRHRjYmlBZ0lDQWdJSFJvYVhNdVpHOXVaU0E5SUdaaGJITmxPMXh1SUNBZ0lDQWdkR2hwY3k1a1pXeGxaMkYwWlNBOUlHNTFiR3c3WEc1Y2JpQWdJQ0FnSUhSb2FYTXViV1YwYUc5a0lEMGdYQ0p1WlhoMFhDSTdYRzRnSUNBZ0lDQjBhR2x6TG1GeVp5QTlJSFZ1WkdWbWFXNWxaRHRjYmx4dUlDQWdJQ0FnZEdocGN5NTBjbmxGYm5SeWFXVnpMbVp2Y2tWaFkyZ29jbVZ6WlhSVWNubEZiblJ5ZVNrN1hHNWNiaUFnSUNBZ0lHbG1JQ2doYzJ0cGNGUmxiWEJTWlhObGRDa2dlMXh1SUNBZ0lDQWdJQ0JtYjNJZ0tIWmhjaUJ1WVcxbElHbHVJSFJvYVhNcElIdGNiaUFnSUNBZ0lDQWdJQ0F2THlCT2IzUWdjM1Z5WlNCaFltOTFkQ0IwYUdVZ2IzQjBhVzFoYkNCdmNtUmxjaUJ2WmlCMGFHVnpaU0JqYjI1a2FYUnBiMjV6T2x4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2h1WVcxbExtTm9ZWEpCZENnd0tTQTlQVDBnWENKMFhDSWdKaVpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdhR0Z6VDNkdUxtTmhiR3dvZEdocGN5d2dibUZ0WlNrZ0ppWmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lXbHpUbUZPS0N0dVlXMWxMbk5zYVdObEtERXBLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwYzF0dVlXMWxYU0E5SUhWdVpHVm1hVzVsWkR0Y2JpQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdjM1J2Y0RvZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQjBhR2x6TG1SdmJtVWdQU0IwY25WbE8xeHVYRzRnSUNBZ0lDQjJZWElnY205dmRFVnVkSEo1SUQwZ2RHaHBjeTUwY25sRmJuUnlhV1Z6V3pCZE8xeHVJQ0FnSUNBZ2RtRnlJSEp2YjNSU1pXTnZjbVFnUFNCeWIyOTBSVzUwY25rdVkyOXRjR3hsZEdsdmJqdGNiaUFnSUNBZ0lHbG1JQ2h5YjI5MFVtVmpiM0prTG5SNWNHVWdQVDA5SUZ3aWRHaHliM2RjSWlrZ2UxeHVJQ0FnSUNBZ0lDQjBhSEp2ZHlCeWIyOTBVbVZqYjNKa0xtRnlaenRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdWNuWmhiRHRjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdaR2x6Y0dGMFkyaEZlR05sY0hScGIyNDZJR1oxYm1OMGFXOXVLR1Y0WTJWd2RHbHZiaWtnZTF4dUlDQWdJQ0FnYVdZZ0tIUm9hWE11Wkc5dVpTa2dlMXh1SUNBZ0lDQWdJQ0IwYUhKdmR5QmxlR05sY0hScGIyNDdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJSFpoY2lCamIyNTBaWGgwSUQwZ2RHaHBjenRjYmlBZ0lDQWdJR1oxYm1OMGFXOXVJR2hoYm1Sc1pTaHNiMk1zSUdOaGRXZG9kQ2tnZTF4dUlDQWdJQ0FnSUNCeVpXTnZjbVF1ZEhsd1pTQTlJRndpZEdoeWIzZGNJanRjYmlBZ0lDQWdJQ0FnY21WamIzSmtMbUZ5WnlBOUlHVjRZMlZ3ZEdsdmJqdGNiaUFnSUNBZ0lDQWdZMjl1ZEdWNGRDNXVaWGgwSUQwZ2JHOWpPMXh1WEc0Z0lDQWdJQ0FnSUdsbUlDaGpZWFZuYUhRcElIdGNiaUFnSUNBZ0lDQWdJQ0F2THlCSlppQjBhR1VnWkdsemNHRjBZMmhsWkNCbGVHTmxjSFJwYjI0Z2QyRnpJR05oZFdkb2RDQmllU0JoSUdOaGRHTm9JR0pzYjJOckxGeHVJQ0FnSUNBZ0lDQWdJQzh2SUhSb1pXNGdiR1YwSUhSb1lYUWdZMkYwWTJnZ1lteHZZMnNnYUdGdVpHeGxJSFJvWlNCbGVHTmxjSFJwYjI0Z2JtOXliV0ZzYkhrdVhHNGdJQ0FnSUNBZ0lDQWdZMjl1ZEdWNGRDNXRaWFJvYjJRZ1BTQmNJbTVsZUhSY0lqdGNiaUFnSUNBZ0lDQWdJQ0JqYjI1MFpYaDBMbUZ5WnlBOUlIVnVaR1ZtYVc1bFpEdGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUFoSVNCallYVm5hSFE3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUdadmNpQW9kbUZ5SUdrZ1BTQjBhR2x6TG5SeWVVVnVkSEpwWlhNdWJHVnVaM1JvSUMwZ01Uc2dhU0ErUFNBd095QXRMV2twSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJR1Z1ZEhKNUlEMGdkR2hwY3k1MGNubEZiblJ5YVdWelcybGRPMXh1SUNBZ0lDQWdJQ0IyWVhJZ2NtVmpiM0prSUQwZ1pXNTBjbmt1WTI5dGNHeGxkR2x2Ymp0Y2JseHVJQ0FnSUNBZ0lDQnBaaUFvWlc1MGNua3VkSEo1VEc5aklEMDlQU0JjSW5KdmIzUmNJaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDOHZJRVY0WTJWd2RHbHZiaUIwYUhKdmQyNGdiM1YwYzJsa1pTQnZaaUJoYm5rZ2RISjVJR0pzYjJOcklIUm9ZWFFnWTI5MWJHUWdhR0Z1Wkd4bFhHNGdJQ0FnSUNBZ0lDQWdMeThnYVhRc0lITnZJSE5sZENCMGFHVWdZMjl0Y0d4bGRHbHZiaUIyWVd4MVpTQnZaaUIwYUdVZ1pXNTBhWEpsSUdaMWJtTjBhVzl1SUhSdlhHNGdJQ0FnSUNBZ0lDQWdMeThnZEdoeWIzY2dkR2hsSUdWNFkyVndkR2x2Ymk1Y2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2FHRnVaR3hsS0Z3aVpXNWtYQ0lwTzF4dUlDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdhV1lnS0dWdWRISjVMblJ5ZVV4dll5QThQU0IwYUdsekxuQnlaWFlwSUh0Y2JpQWdJQ0FnSUNBZ0lDQjJZWElnYUdGelEyRjBZMmdnUFNCb1lYTlBkMjR1WTJGc2JDaGxiblJ5ZVN3Z1hDSmpZWFJqYUV4dlkxd2lLVHRjYmlBZ0lDQWdJQ0FnSUNCMllYSWdhR0Z6Um1sdVlXeHNlU0E5SUdoaGMwOTNiaTVqWVd4c0tHVnVkSEo1TENCY0ltWnBibUZzYkhsTWIyTmNJaWs3WEc1Y2JpQWdJQ0FnSUNBZ0lDQnBaaUFvYUdGelEyRjBZMmdnSmlZZ2FHRnpSbWx1WVd4c2VTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSFJvYVhNdWNISmxkaUE4SUdWdWRISjVMbU5oZEdOb1RHOWpLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQm9ZVzVrYkdVb1pXNTBjbmt1WTJGMFkyaE1iMk1zSUhSeWRXVXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaDBhR2x6TG5CeVpYWWdQQ0JsYm5SeWVTNW1hVzVoYkd4NVRHOWpLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQm9ZVzVrYkdVb1pXNTBjbmt1Wm1sdVlXeHNlVXh2WXlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2FXWWdLR2hoYzBOaGRHTm9LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NXdjbVYySUR3Z1pXNTBjbmt1WTJGMFkyaE1iMk1wSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR2hoYm1Sc1pTaGxiblJ5ZVM1allYUmphRXh2WXl3Z2RISjFaU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tHaGhjMFpwYm1Gc2JIa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxuQnlaWFlnUENCbGJuUnllUzVtYVc1aGJHeDVURzlqS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJvWVc1a2JHVW9aVzUwY25rdVptbHVZV3hzZVV4dll5azdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0Z3aWRISjVJSE4wWVhSbGJXVnVkQ0IzYVhSb2IzVjBJR05oZEdOb0lHOXlJR1pwYm1Gc2JIbGNJaWs3WEc0Z0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZTeGNibHh1SUNBZ0lHRmljblZ3ZERvZ1puVnVZM1JwYjI0b2RIbHdaU3dnWVhKbktTQjdYRzRnSUNBZ0lDQm1iM0lnS0haaGNpQnBJRDBnZEdocGN5NTBjbmxGYm5SeWFXVnpMbXhsYm1kMGFDQXRJREU3SUdrZ1BqMGdNRHNnTFMxcEtTQjdYRzRnSUNBZ0lDQWdJSFpoY2lCbGJuUnllU0E5SUhSb2FYTXVkSEo1Ulc1MGNtbGxjMXRwWFR0Y2JpQWdJQ0FnSUNBZ2FXWWdLR1Z1ZEhKNUxuUnllVXh2WXlBOFBTQjBhR2x6TG5CeVpYWWdKaVpjYmlBZ0lDQWdJQ0FnSUNBZ0lHaGhjMDkzYmk1allXeHNLR1Z1ZEhKNUxDQmNJbVpwYm1Gc2JIbE1iMk5jSWlrZ0ppWmNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVjSEpsZGlBOElHVnVkSEo1TG1acGJtRnNiSGxNYjJNcElIdGNiaUFnSUNBZ0lDQWdJQ0IyWVhJZ1ptbHVZV3hzZVVWdWRISjVJRDBnWlc1MGNuazdYRzRnSUNBZ0lDQWdJQ0FnWW5KbFlXczdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnYVdZZ0tHWnBibUZzYkhsRmJuUnllU0FtSmx4dUlDQWdJQ0FnSUNBZ0lDaDBlWEJsSUQwOVBTQmNJbUp5WldGclhDSWdmSHhjYmlBZ0lDQWdJQ0FnSUNBZ2RIbHdaU0E5UFQwZ1hDSmpiMjUwYVc1MVpWd2lLU0FtSmx4dUlDQWdJQ0FnSUNBZ0lHWnBibUZzYkhsRmJuUnllUzUwY25sTWIyTWdQRDBnWVhKbklDWW1YRzRnSUNBZ0lDQWdJQ0FnWVhKbklEdzlJR1pwYm1Gc2JIbEZiblJ5ZVM1bWFXNWhiR3g1VEc5aktTQjdYRzRnSUNBZ0lDQWdJQzh2SUVsbmJtOXlaU0IwYUdVZ1ptbHVZV3hzZVNCbGJuUnllU0JwWmlCamIyNTBjbTlzSUdseklHNXZkQ0JxZFcxd2FXNW5JSFJ2SUdGY2JpQWdJQ0FnSUNBZ0x5OGdiRzlqWVhScGIyNGdiM1YwYzJsa1pTQjBhR1VnZEhKNUwyTmhkR05vSUdKc2IyTnJMbHh1SUNBZ0lDQWdJQ0JtYVc1aGJHeDVSVzUwY25rZ1BTQnVkV3hzTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCMllYSWdjbVZqYjNKa0lEMGdabWx1WVd4c2VVVnVkSEo1SUQ4Z1ptbHVZV3hzZVVWdWRISjVMbU52YlhCc1pYUnBiMjRnT2lCN2ZUdGNiaUFnSUNBZ0lISmxZMjl5WkM1MGVYQmxJRDBnZEhsd1pUdGNiaUFnSUNBZ0lISmxZMjl5WkM1aGNtY2dQU0JoY21jN1hHNWNiaUFnSUNBZ0lHbG1JQ2htYVc1aGJHeDVSVzUwY25rcElIdGNiaUFnSUNBZ0lDQWdkR2hwY3k1dFpYUm9iMlFnUFNCY0ltNWxlSFJjSWp0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV1WlhoMElEMGdabWx1WVd4c2VVVnVkSEo1TG1acGJtRnNiSGxNYjJNN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCRGIyNTBhVzUxWlZObGJuUnBibVZzTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCeVpYUjFjbTRnZEdocGN5NWpiMjF3YkdWMFpTaHlaV052Y21RcE8xeHVJQ0FnSUgwc1hHNWNiaUFnSUNCamIyMXdiR1YwWlRvZ1puVnVZM1JwYjI0b2NtVmpiM0prTENCaFpuUmxja3h2WXlrZ2UxeHVJQ0FnSUNBZ2FXWWdLSEpsWTI5eVpDNTBlWEJsSUQwOVBTQmNJblJvY205M1hDSXBJSHRjYmlBZ0lDQWdJQ0FnZEdoeWIzY2djbVZqYjNKa0xtRnlaenRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnYVdZZ0tISmxZMjl5WkM1MGVYQmxJRDA5UFNCY0ltSnlaV0ZyWENJZ2ZIeGNiaUFnSUNBZ0lDQWdJQ0J5WldOdmNtUXVkSGx3WlNBOVBUMGdYQ0pqYjI1MGFXNTFaVndpS1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Ym1WNGRDQTlJSEpsWTI5eVpDNWhjbWM3WEc0Z0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0hKbFkyOXlaQzUwZVhCbElEMDlQU0JjSW5KbGRIVnlibHdpS1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Y25aaGJDQTlJSFJvYVhNdVlYSm5JRDBnY21WamIzSmtMbUZ5Wnp0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV0WlhSb2IyUWdQU0JjSW5KbGRIVnlibHdpTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbTVsZUhRZ1BTQmNJbVZ1WkZ3aU8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaHlaV052Y21RdWRIbHdaU0E5UFQwZ1hDSnViM0p0WVd4Y0lpQW1KaUJoWm5SbGNreHZZeWtnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbTVsZUhRZ1BTQmhablJsY2t4dll6dGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdjbVYwZFhKdUlFTnZiblJwYm5WbFUyVnVkR2x1Wld3N1hHNGdJQ0FnZlN4Y2JseHVJQ0FnSUdacGJtbHphRG9nWm5WdVkzUnBiMjRvWm1sdVlXeHNlVXh2WXlrZ2UxeHVJQ0FnSUNBZ1ptOXlJQ2gyWVhJZ2FTQTlJSFJvYVhNdWRISjVSVzUwY21sbGN5NXNaVzVuZEdnZ0xTQXhPeUJwSUQ0OUlEQTdJQzB0YVNrZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnWlc1MGNua2dQU0IwYUdsekxuUnllVVZ1ZEhKcFpYTmJhVjA3WEc0Z0lDQWdJQ0FnSUdsbUlDaGxiblJ5ZVM1bWFXNWhiR3g1VEc5aklEMDlQU0JtYVc1aGJHeDVURzlqS1NCN1hHNGdJQ0FnSUNBZ0lDQWdkR2hwY3k1amIyMXdiR1YwWlNobGJuUnllUzVqYjIxd2JHVjBhVzl1TENCbGJuUnllUzVoWm5SbGNreHZZeWs3WEc0Z0lDQWdJQ0FnSUNBZ2NtVnpaWFJVY25sRmJuUnllU2hsYm5SeWVTazdYRzRnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRU52Ym5ScGJuVmxVMlZ1ZEdsdVpXdzdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdYQ0pqWVhSamFGd2lPaUJtZFc1amRHbHZiaWgwY25sTWIyTXBJSHRjYmlBZ0lDQWdJR1p2Y2lBb2RtRnlJR2tnUFNCMGFHbHpMblJ5ZVVWdWRISnBaWE11YkdWdVozUm9JQzBnTVRzZ2FTQStQU0F3T3lBdExXa3BJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlHVnVkSEo1SUQwZ2RHaHBjeTUwY25sRmJuUnlhV1Z6VzJsZE8xeHVJQ0FnSUNBZ0lDQnBaaUFvWlc1MGNua3VkSEo1VEc5aklEMDlQU0IwY25sTWIyTXBJSHRjYmlBZ0lDQWdJQ0FnSUNCMllYSWdjbVZqYjNKa0lEMGdaVzUwY25rdVkyOXRjR3hsZEdsdmJqdGNiaUFnSUNBZ0lDQWdJQ0JwWmlBb2NtVmpiM0prTG5SNWNHVWdQVDA5SUZ3aWRHaHliM2RjSWlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlIUm9jbTkzYmlBOUlISmxZMjl5WkM1aGNtYzdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYTmxkRlJ5ZVVWdWRISjVLR1Z1ZEhKNUtUdGNiaUFnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2NtOTNianRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBdkx5QlVhR1VnWTI5dWRHVjRkQzVqWVhSamFDQnRaWFJvYjJRZ2JYVnpkQ0J2Ym14NUlHSmxJR05oYkd4bFpDQjNhWFJvSUdFZ2JHOWpZWFJwYjI1Y2JpQWdJQ0FnSUM4dklHRnlaM1Z0Wlc1MElIUm9ZWFFnWTI5eWNtVnpjRzl1WkhNZ2RHOGdZU0JyYm05M2JpQmpZWFJqYUNCaWJHOWpheTVjYmlBZ0lDQWdJSFJvY205M0lHNWxkeUJGY25KdmNpaGNJbWxzYkdWbllXd2dZMkYwWTJnZ1lYUjBaVzF3ZEZ3aUtUdGNiaUFnSUNCOUxGeHVYRzRnSUNBZ1pHVnNaV2RoZEdWWmFXVnNaRG9nWm5WdVkzUnBiMjRvYVhSbGNtRmliR1VzSUhKbGMzVnNkRTVoYldVc0lHNWxlSFJNYjJNcElIdGNiaUFnSUNBZ0lIUm9hWE11WkdWc1pXZGhkR1VnUFNCN1hHNGdJQ0FnSUNBZ0lHbDBaWEpoZEc5eU9pQjJZV3gxWlhNb2FYUmxjbUZpYkdVcExGeHVJQ0FnSUNBZ0lDQnlaWE4xYkhST1lXMWxPaUJ5WlhOMWJIUk9ZVzFsTEZ4dUlDQWdJQ0FnSUNCdVpYaDBURzlqT2lCdVpYaDBURzlqWEc0Z0lDQWdJQ0I5TzF4dVhHNGdJQ0FnSUNCcFppQW9kR2hwY3k1dFpYUm9iMlFnUFQwOUlGd2libVY0ZEZ3aUtTQjdYRzRnSUNBZ0lDQWdJQzh2SUVSbGJHbGlaWEpoZEdWc2VTQm1iM0puWlhRZ2RHaGxJR3hoYzNRZ2MyVnVkQ0IyWVd4MVpTQnpieUIwYUdGMElIZGxJR1J2YmlkMFhHNGdJQ0FnSUNBZ0lDOHZJR0ZqWTJsa1pXNTBZV3hzZVNCd1lYTnpJR2wwSUc5dUlIUnZJSFJvWlNCa1pXeGxaMkYwWlM1Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVoY21jZ1BTQjFibVJsWm1sdVpXUTdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJSEpsZEhWeWJpQkRiMjUwYVc1MVpWTmxiblJwYm1Wc08xeHVJQ0FnSUgxY2JpQWdmVHRjYmx4dUlDQXZMeUJTWldkaGNtUnNaWE56SUc5bUlIZG9aWFJvWlhJZ2RHaHBjeUJ6WTNKcGNIUWdhWE1nWlhobFkzVjBhVzVuSUdGeklHRWdRMjl0Ylc5dVNsTWdiVzlrZFd4bFhHNGdJQzh2SUc5eUlHNXZkQ3dnY21WMGRYSnVJSFJvWlNCeWRXNTBhVzFsSUc5aWFtVmpkQ0J6YnlCMGFHRjBJSGRsSUdOaGJpQmtaV05zWVhKbElIUm9aU0IyWVhKcFlXSnNaVnh1SUNBdkx5QnlaV2RsYm1WeVlYUnZjbEoxYm5ScGJXVWdhVzRnZEdobElHOTFkR1Z5SUhOamIzQmxMQ0IzYUdsamFDQmhiR3h2ZDNNZ2RHaHBjeUJ0YjJSMWJHVWdkRzhnWW1WY2JpQWdMeThnYVc1cVpXTjBaV1FnWldGemFXeDVJR0o1SUdCaWFXNHZjbVZuWlc1bGNtRjBiM0lnTFMxcGJtTnNkV1JsTFhKMWJuUnBiV1VnYzJOeWFYQjBMbXB6WUM1Y2JpQWdjbVYwZFhKdUlHVjRjRzl5ZEhNN1hHNWNibjBvWEc0Z0lDOHZJRWxtSUhSb2FYTWdjMk55YVhCMElHbHpJR1Y0WldOMWRHbHVaeUJoY3lCaElFTnZiVzF2YmtwVElHMXZaSFZzWlN3Z2RYTmxJRzF2WkhWc1pTNWxlSEJ2Y25SelhHNGdJQzh2SUdGeklIUm9aU0J5WldkbGJtVnlZWFJ2Y2xKMWJuUnBiV1VnYm1GdFpYTndZV05sTGlCUGRHaGxjbmRwYzJVZ1kzSmxZWFJsSUdFZ2JtVjNJR1Z0Y0hSNVhHNGdJQzh2SUc5aWFtVmpkQzRnUldsMGFHVnlJSGRoZVN3Z2RHaGxJSEpsYzNWc2RHbHVaeUJ2WW1wbFkzUWdkMmxzYkNCaVpTQjFjMlZrSUhSdklHbHVhWFJwWVd4cGVtVmNiaUFnTHk4Z2RHaGxJSEpsWjJWdVpYSmhkRzl5VW5WdWRHbHRaU0IyWVhKcFlXSnNaU0JoZENCMGFHVWdkRzl3SUc5bUlIUm9hWE1nWm1sc1pTNWNiaUFnZEhsd1pXOW1JRzF2WkhWc1pTQTlQVDBnWENKdlltcGxZM1JjSWlBL0lHMXZaSFZzWlM1bGVIQnZjblJ6SURvZ2UzMWNiaWtwTzF4dVhHNTBjbmtnZTF4dUlDQnlaV2RsYm1WeVlYUnZjbEoxYm5ScGJXVWdQU0J5ZFc1MGFXMWxPMXh1ZlNCallYUmphQ0FvWVdOamFXUmxiblJoYkZOMGNtbGpkRTF2WkdVcElIdGNiaUFnTHk4Z1ZHaHBjeUJ0YjJSMWJHVWdjMmh2ZFd4a0lHNXZkQ0JpWlNCeWRXNXVhVzVuSUdsdUlITjBjbWxqZENCdGIyUmxMQ0J6YnlCMGFHVWdZV0p2ZG1WY2JpQWdMeThnWVhOemFXZHViV1Z1ZENCemFHOTFiR1FnWVd4M1lYbHpJSGR2Y21zZ2RXNXNaWE56SUhOdmJXVjBhR2x1WnlCcGN5QnRhWE5qYjI1bWFXZDFjbVZrTGlCS2RYTjBYRzRnSUM4dklHbHVJR05oYzJVZ2NuVnVkR2x0WlM1cWN5QmhZMk5wWkdWdWRHRnNiSGtnY25WdWN5QnBiaUJ6ZEhKcFkzUWdiVzlrWlN3Z2FXNGdiVzlrWlhKdUlHVnVaMmx1WlhOY2JpQWdMeThnZDJVZ1kyRnVJR1Y0Y0d4cFkybDBiSGtnWVdOalpYTnpJR2RzYjJKaGJGUm9hWE11SUVsdUlHOXNaR1Z5SUdWdVoybHVaWE1nZDJVZ1kyRnVJR1Z6WTJGd1pWeHVJQ0F2THlCemRISnBZM1FnYlc5a1pTQjFjMmx1WnlCaElHZHNiMkpoYkNCR2RXNWpkR2x2YmlCallXeHNMaUJVYUdseklHTnZkV3hrSUdOdmJtTmxhWFpoWW14NUlHWmhhV3hjYmlBZ0x5OGdhV1lnWVNCRGIyNTBaVzUwSUZObFkzVnlhWFI1SUZCdmJHbGplU0JtYjNKaWFXUnpJSFZ6YVc1bklFWjFibU4wYVc5dUxDQmlkWFFnYVc0Z2RHaGhkQ0JqWVhObFhHNGdJQzh2SUhSb1pTQndjbTl3WlhJZ2MyOXNkWFJwYjI0Z2FYTWdkRzhnWm1sNElIUm9aU0JoWTJOcFpHVnVkR0ZzSUhOMGNtbGpkQ0J0YjJSbElIQnliMkpzWlcwdUlFbG1YRzRnSUM4dklIbHZkU2QyWlNCdGFYTmpiMjVtYVdkMWNtVmtJSGx2ZFhJZ1luVnVaR3hsY2lCMGJ5Qm1iM0pqWlNCemRISnBZM1FnYlc5a1pTQmhibVFnWVhCd2JHbGxaQ0JoWEc0Z0lDOHZJRU5UVUNCMGJ5Qm1iM0ppYVdRZ1JuVnVZM1JwYjI0c0lHRnVaQ0I1YjNVbmNtVWdibTkwSUhkcGJHeHBibWNnZEc4Z1ptbDRJR1ZwZEdobGNpQnZaaUIwYUc5elpWeHVJQ0F2THlCd2NtOWliR1Z0Y3l3Z2NHeGxZWE5sSUdSbGRHRnBiQ0I1YjNWeUlIVnVhWEYxWlNCd2NtVmthV05oYldWdWRDQnBiaUJoSUVkcGRFaDFZaUJwYzNOMVpTNWNiaUFnYVdZZ0tIUjVjR1Z2WmlCbmJHOWlZV3hVYUdseklEMDlQU0JjSW05aWFtVmpkRndpS1NCN1hHNGdJQ0FnWjJ4dlltRnNWR2hwY3k1eVpXZGxibVZ5WVhSdmNsSjFiblJwYldVZ1BTQnlkVzUwYVcxbE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lFWjFibU4wYVc5dUtGd2ljbHdpTENCY0luSmxaMlZ1WlhKaGRHOXlVblZ1ZEdsdFpTQTlJSEpjSWlrb2NuVnVkR2x0WlNrN1hHNGdJSDFjYm4xY2JpSXNJaUZtZFc1amRHbHZiaWh1TEhRcGUxd2liMkpxWldOMFhDSTlQWFI1Y0dWdlppQmxlSEJ2Y25SekppWmNJblZ1WkdWbWFXNWxaRndpSVQxMGVYQmxiMllnYlc5a2RXeGxQMjF2WkhWc1pTNWxlSEJ2Y25SelBYUW9LVHBjSW1aMWJtTjBhVzl1WENJOVBYUjVjR1Z2WmlCa1pXWnBibVVtSm1SbFptbHVaUzVoYldRL1pHVm1hVzVsS0hRcE9paHVQVndpZFc1a1pXWnBibVZrWENJaFBYUjVjR1Z2WmlCbmJHOWlZV3hVYUdselAyZHNiMkpoYkZSb2FYTTZibng4YzJWc1ppa3VUR0Y2ZVV4dllXUTlkQ2dwZlNoMGFHbHpMQ2htZFc1amRHbHZiaWdwZTF3aWRYTmxJSE4wY21samRGd2lPMloxYm1OMGFXOXVJRzRvS1h0eVpYUjFjbTRnYmoxUFltcGxZM1F1WVhOemFXZHVmSHhtZFc1amRHbHZiaWh1S1h0bWIzSW9kbUZ5SUhROU1UdDBQR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZzdkQ3NyS1h0MllYSWdaVDFoY21kMWJXVnVkSE5iZEYwN1ptOXlLSFpoY2lCcElHbHVJR1VwVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzVvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzS0dVc2FTa21KaWh1VzJsZFBXVmJhVjBwZlhKbGRIVnliaUJ1ZlN4dUxtRndjR3g1S0hSb2FYTXNZWEpuZFcxbGJuUnpLWDEyWVhJZ2REMWNJblZ1WkdWbWFXNWxaRndpSVQxMGVYQmxiMllnZDJsdVpHOTNMR1U5ZENZbUlTaGNJbTl1YzJOeWIyeHNYQ0pwYmlCM2FXNWtiM2NwZkh4Y0luVnVaR1ZtYVc1bFpGd2lJVDEwZVhCbGIyWWdibUYyYVdkaGRHOXlKaVl2S0dkc1pYeHBibWQ4Y204cFltOTBmR055WVhkc2ZITndhV1JsY2k5cExuUmxjM1FvYm1GMmFXZGhkRzl5TG5WelpYSkJaMlZ1ZENrc2FUMTBKaVpjSWtsdWRHVnljMlZqZEdsdmJrOWljMlZ5ZG1WeVhDSnBiaUIzYVc1a2IzY3NiejEwSmlaY0ltTnNZWE56VEdsemRGd2lhVzRnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDaGNJbkJjSWlrc1lUMTBKaVozYVc1a2IzY3VaR1YyYVdObFVHbDRaV3hTWVhScGJ6NHhMSEk5ZTJWc1pXMWxiblJ6WDNObGJHVmpkRzl5T2x3aUxteGhlbmxjSWl4amIyNTBZV2x1WlhJNlpYeDhkRDlrYjJOMWJXVnVkRHB1ZFd4c0xIUm9jbVZ6YUc5c1pEb3pNREFzZEdoeVpYTm9iMnhrY3pwdWRXeHNMR1JoZEdGZmMzSmpPbHdpYzNKalhDSXNaR0YwWVY5emNtTnpaWFE2WENKemNtTnpaWFJjSWl4a1lYUmhYM05wZW1Wek9sd2ljMmw2WlhOY0lpeGtZWFJoWDJKbk9sd2lZbWRjSWl4a1lYUmhYMkpuWDJocFpIQnBPbHdpWW1jdGFHbGtjR2xjSWl4a1lYUmhYMkpuWDIxMWJIUnBPbHdpWW1jdGJYVnNkR2xjSWl4a1lYUmhYMkpuWDIxMWJIUnBYMmhwWkhCcE9sd2lZbWN0YlhWc2RHa3RhR2xrY0dsY0lpeGtZWFJoWDNCdmMzUmxjanBjSW5CdmMzUmxjbHdpTEdOc1lYTnpYMkZ3Y0d4cFpXUTZYQ0poY0hCc2FXVmtYQ0lzWTJ4aGMzTmZiRzloWkdsdVp6cGNJbXh2WVdScGJtZGNJaXhqYkdGemMxOXNiMkZrWldRNlhDSnNiMkZrWldSY0lpeGpiR0Z6YzE5bGNuSnZjanBjSW1WeWNtOXlYQ0lzWTJ4aGMzTmZaVzUwWlhKbFpEcGNJbVZ1ZEdWeVpXUmNJaXhqYkdGemMxOWxlR2wwWldRNlhDSmxlR2wwWldSY0lpeDFibTlpYzJWeWRtVmZZMjl0Y0d4bGRHVmtPaUV3TEhWdWIySnpaWEoyWlY5bGJuUmxjbVZrT2lFeExHTmhibU5sYkY5dmJsOWxlR2wwT2lFd0xHTmhiR3hpWVdOclgyVnVkR1Z5T201MWJHd3NZMkZzYkdKaFkydGZaWGhwZERwdWRXeHNMR05oYkd4aVlXTnJYMkZ3Y0d4cFpXUTZiblZzYkN4allXeHNZbUZqYTE5c2IyRmthVzVuT201MWJHd3NZMkZzYkdKaFkydGZiRzloWkdWa09tNTFiR3dzWTJGc2JHSmhZMnRmWlhKeWIzSTZiblZzYkN4allXeHNZbUZqYTE5bWFXNXBjMmc2Ym5Wc2JDeGpZV3hzWW1GamExOWpZVzVqWld3NmJuVnNiQ3gxYzJWZmJtRjBhWFpsT2lFeGZTeGpQV1oxYm1OMGFXOXVLSFFwZTNKbGRIVnliaUJ1S0h0OUxISXNkQ2w5TEhVOVpuVnVZM1JwYjI0b2JpeDBLWHQyWVhJZ1pTeHBQVndpVEdGNmVVeHZZV1E2T2tsdWFYUnBZV3hwZW1Wa1hDSXNiejF1WlhjZ2JpaDBLVHQwY25sN1pUMXVaWGNnUTNWemRHOXRSWFpsYm5Rb2FTeDdaR1YwWVdsc09udHBibk4wWVc1alpUcHZmWDBwZldOaGRHTm9LRzRwZXlobFBXUnZZM1Z0Wlc1MExtTnlaV0YwWlVWMlpXNTBLRndpUTNWemRHOXRSWFpsYm5SY0lpa3BMbWx1YVhSRGRYTjBiMjFGZG1WdWRDaHBMQ0V4TENFeExIdHBibk4wWVc1alpUcHZmU2w5ZDJsdVpHOTNMbVJwYzNCaGRHTm9SWFpsYm5Rb1pTbDlMR3c5WENKemNtTmNJaXh6UFZ3aWMzSmpjMlYwWENJc1pqMWNJbk5wZW1WelhDSXNaRDFjSW5CdmMzUmxjbHdpTEY4OVhDSnNiRTl5YVdkcGJtRnNRWFIwY25OY0lpeG5QVndpWkdGMFlWd2lMSFk5WENKc2IyRmthVzVuWENJc1lqMWNJbXh2WVdSbFpGd2lMSEE5WENKaGNIQnNhV1ZrWENJc2FEMWNJbVZ5Y205eVhDSXNiVDFjSW01aGRHbDJaVndpTEVVOVhDSmtZWFJoTFZ3aUxFazlYQ0pzYkMxemRHRjBkWE5jSWl4NVBXWjFibU4wYVc5dUtHNHNkQ2w3Y21WMGRYSnVJRzR1WjJWMFFYUjBjbWxpZFhSbEtFVXJkQ2w5TEVFOVpuVnVZM1JwYjI0b2JpbDdjbVYwZFhKdUlIa29iaXhKS1gwc2F6MW1kVzVqZEdsdmJpaHVMSFFwZTNKbGRIVnliaUJtZFc1amRHbHZiaWh1TEhRc1pTbDdkbUZ5SUdrOVhDSmtZWFJoTFd4c0xYTjBZWFIxYzF3aU8yNTFiR3doUFQxbFAyNHVjMlYwUVhSMGNtbGlkWFJsS0drc1pTazZiaTV5WlcxdmRtVkJkSFJ5YVdKMWRHVW9hU2w5S0c0c01DeDBLWDBzVEQxbWRXNWpkR2x2YmlodUtYdHlaWFIxY200Z2F5aHVMRzUxYkd3cGZTeDNQV1oxYm1OMGFXOXVLRzRwZTNKbGRIVnliaUJ1ZFd4c1BUMDlRU2h1S1gwc1R6MW1kVzVqZEdsdmJpaHVLWHR5WlhSMWNtNGdRU2h1S1QwOVBXMTlMSGc5VzNZc1lpeHdMR2hkTEVNOVpuVnVZM1JwYjI0b2JpeDBMR1VzYVNsN2JpWW1LSFp2YVdRZ01EMDlQV2svZG05cFpDQXdQVDA5WlQ5dUtIUXBPbTRvZEN4bEtUcHVLSFFzWlN4cEtTbDlMRTQ5Wm5WdVkzUnBiMjRvYml4MEtYdHZQMjR1WTJ4aGMzTk1hWE4wTG1Ga1pDaDBLVHB1TG1Oc1lYTnpUbUZ0WlNzOUtHNHVZMnhoYzNOT1lXMWxQMXdpSUZ3aU9sd2lYQ0lwSzNSOUxFMDlablZ1WTNScGIyNG9iaXgwS1h0dlAyNHVZMnhoYzNOTWFYTjBMbkpsYlc5MlpTaDBLVHB1TG1Oc1lYTnpUbUZ0WlQxdUxtTnNZWE56VG1GdFpTNXlaWEJzWVdObEtHNWxkeUJTWldkRmVIQW9YQ0lvWG54Y1hGeGNjeXNwWENJcmRDdGNJaWhjWEZ4Y2N5dDhKQ2xjSWlrc1hDSWdYQ0lwTG5KbGNHeGhZMlVvTDE1Y1hITXJMeXhjSWx3aUtTNXlaWEJzWVdObEtDOWNYSE1ySkM4c1hDSmNJaWw5TEhvOVpuVnVZM1JwYjI0b2JpbDdjbVYwZFhKdUlHNHViR3hVWlcxd1NXMWhaMlY5TEZROVpuVnVZM1JwYjI0b2JpeDBLWHRwWmloMEtYdDJZWElnWlQxMExsOXZZbk5sY25abGNqdGxKaVpsTG5WdWIySnpaWEoyWlNodUtYMTlMRkk5Wm5WdVkzUnBiMjRvYml4MEtYdHVKaVlvYmk1c2IyRmthVzVuUTI5MWJuUXJQWFFwZlN4SFBXWjFibU4wYVc5dUtHNHNkQ2w3YmlZbUtHNHVkRzlNYjJGa1EyOTFiblE5ZENsOUxFUTlablZ1WTNScGIyNG9iaWw3Wm05eUtIWmhjaUIwTEdVOVcxMHNhVDB3TzNROWJpNWphR2xzWkhKbGJsdHBYVHRwS3oweEtWd2lVMDlWVWtORlhDSTlQVDEwTG5SaFowNWhiV1VtSm1VdWNIVnphQ2gwS1R0eVpYUjFjbTRnWlgwc1ZqMW1kVzVqZEdsdmJpaHVMSFFwZTNaaGNpQmxQVzR1Y0dGeVpXNTBUbTlrWlR0bEppWmNJbEJKUTFSVlVrVmNJajA5UFdVdWRHRm5UbUZ0WlNZbVJDaGxLUzVtYjNKRllXTm9LSFFwZlN4R1BXWjFibU4wYVc5dUtHNHNkQ2w3UkNodUtTNW1iM0pGWVdOb0tIUXBmU3hxUFZ0c1hTeENQVnRzTEdSZExFbzlXMndzY3l4bVhTeFFQVnRuWFN4VFBXWjFibU4wYVc5dUtHNHBlM0psZEhWeWJpRWhibHRmWFgwc1ZUMW1kVzVqZEdsdmJpaHVLWHR5WlhSMWNtNGdibHRmWFgwc0pEMW1kVzVqZEdsdmJpaHVLWHR5WlhSMWNtNGdaR1ZzWlhSbElHNWJYMTE5TEhFOVpuVnVZM1JwYjI0b2JpeDBLWHRwWmlnaFV5aHVLU2w3ZG1GeUlHVTllMzA3ZEM1bWIzSkZZV05vS0NobWRXNWpkR2x2YmloMEtYdGxXM1JkUFc0dVoyVjBRWFIwY21saWRYUmxLSFFwZlNrcExHNWJYMTA5WlgxOUxFZzlablZ1WTNScGIyNG9iaXgwS1h0cFppaFRLRzRwS1h0MllYSWdaVDFWS0c0cE8zUXVabTl5UldGamFDZ29ablZ1WTNScGIyNG9kQ2w3SVdaMWJtTjBhVzl1S0c0c2RDeGxLWHRsUDI0dWMyVjBRWFIwY21saWRYUmxLSFFzWlNrNmJpNXlaVzF2ZG1WQmRIUnlhV0oxZEdVb2RDbDlLRzRzZEN4bFczUmRLWDBwS1gxOUxFczlablZ1WTNScGIyNG9iaXgwTEdVcGUwNG9iaXgwTG1Oc1lYTnpYMnh2WVdScGJtY3BMR3NvYml4MktTeGxKaVlvVWlobExERXBMRU1vZEM1allXeHNZbUZqYTE5c2IyRmthVzVuTEc0c1pTa3BmU3hSUFdaMWJtTjBhVzl1S0c0c2RDeGxLWHRsSmladUxuTmxkRUYwZEhKcFluVjBaU2gwTEdVcGZTeFhQV1oxYm1OMGFXOXVLRzRzZENsN1VTaHVMR1lzZVNodUxIUXVaR0YwWVY5emFYcGxjeWtwTEZFb2JpeHpMSGtvYml4MExtUmhkR0ZmYzNKamMyVjBLU2tzVVNodUxHd3NlU2h1TEhRdVpHRjBZVjl6Y21NcEtYMHNXRDE3U1UxSE9tWjFibU4wYVc5dUtHNHNkQ2w3VmlodUxDaG1kVzVqZEdsdmJpaHVLWHR4S0c0c1Npa3NWeWh1TEhRcGZTa3BMSEVvYml4S0tTeFhLRzRzZENsOUxFbEdVa0ZOUlRwbWRXNWpkR2x2YmlodUxIUXBlM0VvYml4cUtTeFJLRzRzYkN4NUtHNHNkQzVrWVhSaFgzTnlZeWtwZlN4V1NVUkZUenBtZFc1amRHbHZiaWh1TEhRcGUwWW9iaXdvWm5WdVkzUnBiMjRvYmlsN2NTaHVMR29wTEZFb2JpeHNMSGtvYml4MExtUmhkR0ZmYzNKaktTbDlLU2tzY1NodUxFSXBMRkVvYml4a0xIa29iaXgwTG1SaGRHRmZjRzl6ZEdWeUtTa3NVU2h1TEd3c2VTaHVMSFF1WkdGMFlWOXpjbU1wS1N4dUxteHZZV1FvS1gwc1QwSktSVU5VT21aMWJtTjBhVzl1S0c0c2RDbDdjU2h1TEZBcExGRW9iaXhuTEhrb2JpeDBMbVJoZEdGZmMzSmpLU2w5ZlN4WlBWdGNJa2xOUjF3aUxGd2lTVVpTUVUxRlhDSXNYQ0pXU1VSRlQxd2lMRndpVDBKS1JVTlVYQ0pkTEZvOVpuVnVZM1JwYjI0b2JpeDBLWHNoZEh4OFpuVnVZM1JwYjI0b2JpbDdjbVYwZFhKdUlHNHViRzloWkdsdVowTnZkVzUwUGpCOUtIUXBmSHhtZFc1amRHbHZiaWh1S1h0eVpYUjFjbTRnYmk1MGIweHZZV1JEYjNWdWRENHdmU2gwS1h4OFF5aHVMbU5oYkd4aVlXTnJYMlpwYm1semFDeDBLWDBzYm00OVpuVnVZM1JwYjI0b2JpeDBMR1VwZTI0dVlXUmtSWFpsYm5STWFYTjBaVzVsY2loMExHVXBMRzR1Ykd4RmRreHBjMjV5YzF0MFhUMWxmU3gwYmoxbWRXNWpkR2x2YmlodUxIUXNaU2w3Ymk1eVpXMXZkbVZGZG1WdWRFeHBjM1JsYm1WeUtIUXNaU2w5TEdWdVBXWjFibU4wYVc5dUtHNHBlM0psZEhWeWJpRWhiaTVzYkVWMlRHbHpibkp6ZlN4dmJqMW1kVzVqZEdsdmJpaHVLWHRwWmlobGJpaHVLU2w3ZG1GeUlIUTliaTVzYkVWMlRHbHpibkp6TzJadmNpaDJZWElnWlNCcGJpQjBLWHQyWVhJZ2FUMTBXMlZkTzNSdUtHNHNaU3hwS1gxa1pXeGxkR1VnYmk1c2JFVjJUR2x6Ym5KemZYMHNZVzQ5Wm5WdVkzUnBiMjRvYml4MExHVXBleUZtZFc1amRHbHZiaWh1S1h0a1pXeGxkR1VnYmk1c2JGUmxiWEJKYldGblpYMG9iaWtzVWlobExDMHhLU3htZFc1amRHbHZiaWh1S1h0dUppWW9iaTUwYjB4dllXUkRiM1Z1ZEMwOU1TbDlLR1VwTEUwb2JpeDBMbU5zWVhOelgyeHZZV1JwYm1jcExIUXVkVzV2WW5ObGNuWmxYMk52YlhCc1pYUmxaQ1ltVkNodUxHVXBmU3h5YmoxbWRXNWpkR2x2YmlodUxIUXNaU2w3ZG1GeUlHazllaWh1S1h4OGJqdGxiaWhwS1h4OFpuVnVZM1JwYjI0b2JpeDBMR1VwZTJWdUtHNHBmSHdvYmk1c2JFVjJUR2x6Ym5KelBYdDlLVHQyWVhJZ2FUMWNJbFpKUkVWUFhDSTlQVDF1TG5SaFowNWhiV1UvWENKc2IyRmtaV1JrWVhSaFhDSTZYQ0pzYjJGa1hDSTdibTRvYml4cExIUXBMRzV1S0c0c1hDSmxjbkp2Y2x3aUxHVXBmU2hwTENobWRXNWpkR2x2YmlodktYc2hablZ1WTNScGIyNG9iaXgwTEdVc2FTbDdkbUZ5SUc4OVR5aDBLVHRoYmloMExHVXNhU2tzVGloMExHVXVZMnhoYzNOZmJHOWhaR1ZrS1N4cktIUXNZaWtzUXlobExtTmhiR3hpWVdOclgyeHZZV1JsWkN4MExHa3BMRzk4ZkZvb1pTeHBLWDBvTUN4dUxIUXNaU2tzYjI0b2FTbDlLU3dvWm5WdVkzUnBiMjRvYnlsN0lXWjFibU4wYVc5dUtHNHNkQ3hsTEdrcGUzWmhjaUJ2UFU4b2RDazdZVzRvZEN4bExHa3BMRTRvZEN4bExtTnNZWE56WDJWeWNtOXlLU3hyS0hRc2FDa3NReWhsTG1OaGJHeGlZV05yWDJWeWNtOXlMSFFzYVNrc2IzeDhXaWhsTEdrcGZTZ3dMRzRzZEN4bEtTeHZiaWhwS1gwcEtYMHNZMjQ5Wm5WdVkzUnBiMjRvYml4MExHVXBleUZtZFc1amRHbHZiaWh1S1h0dUxteHNWR1Z0Y0VsdFlXZGxQV1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5Rb1hDSkpUVWRjSWlsOUtHNHBMSEp1S0c0c2RDeGxLU3htZFc1amRHbHZiaWh1S1h0VEtHNHBmSHdvYmx0ZlhUMTdZbUZqYTJkeWIzVnVaRWx0WVdkbE9tNHVjM1I1YkdVdVltRmphMmR5YjNWdVpFbHRZV2RsZlNsOUtHNHBMR1oxYm1OMGFXOXVLRzRzZEN4bEtYdDJZWElnYVQxNUtHNHNkQzVrWVhSaFgySm5LU3h2UFhrb2JpeDBMbVJoZEdGZlltZGZhR2xrY0drcExISTlZU1ltYno5dk9tazdjaVltS0c0dWMzUjViR1V1WW1GamEyZHliM1Z1WkVsdFlXZGxQU2QxY213b1hDSW5MbU52Ym1OaGRDaHlMQ2RjSWlrbktTeDZLRzRwTG5ObGRFRjBkSEpwWW5WMFpTaHNMSElwTEVzb2JpeDBMR1VwS1gwb2JpeDBMR1VwTEdaMWJtTjBhVzl1S0c0c2RDeGxLWHQyWVhJZ2FUMTVLRzRzZEM1a1lYUmhYMkpuWDIxMWJIUnBLU3h2UFhrb2JpeDBMbVJoZEdGZlltZGZiWFZzZEdsZmFHbGtjR2twTEhJOVlTWW1iejl2T21rN2NpWW1LRzR1YzNSNWJHVXVZbUZqYTJkeWIzVnVaRWx0WVdkbFBYSXNablZ1WTNScGIyNG9iaXgwTEdVcGUwNG9iaXgwTG1Oc1lYTnpYMkZ3Y0d4cFpXUXBMR3NvYml4d0tTeGxKaVlvZEM1MWJtOWljMlZ5ZG1WZlkyOXRjR3hsZEdWa0ppWlVLRzRzZENrc1F5aDBMbU5oYkd4aVlXTnJYMkZ3Y0d4cFpXUXNiaXhsS1NsOUtHNHNkQ3hsS1NsOUtHNHNkQ3hsS1gwc2RXNDlablZ1WTNScGIyNG9iaXgwTEdVcGV5Rm1kVzVqZEdsdmJpaHVLWHR5WlhSMWNtNGdXUzVwYm1SbGVFOW1LRzR1ZEdGblRtRnRaU2srTFRGOUtHNHBQMk51S0c0c2RDeGxLVHBtZFc1amRHbHZiaWh1TEhRc1pTbDdjbTRvYml4MExHVXBMR1oxYm1OMGFXOXVLRzRzZEN4bEtYdDJZWElnYVQxWVcyNHVkR0ZuVG1GdFpWMDdhU1ltS0drb2JpeDBLU3hMS0c0c2RDeGxLU2w5S0c0c2RDeGxLWDBvYml4MExHVXBmU3hzYmoxbWRXNWpkR2x2YmlodUtYdHVMbkpsYlc5MlpVRjBkSEpwWW5WMFpTaHNLU3h1TG5KbGJXOTJaVUYwZEhKcFluVjBaU2h6S1N4dUxuSmxiVzkyWlVGMGRISnBZblYwWlNobUtYMHNjMjQ5Wm5WdVkzUnBiMjRvYmlsN1ZpaHVMQ2htZFc1amRHbHZiaWh1S1h0SUtHNHNTaWw5S1Nrc1NDaHVMRW9wZlN4bWJqMTdTVTFIT25OdUxFbEdVa0ZOUlRwbWRXNWpkR2x2YmlodUtYdElLRzRzYWlsOUxGWkpSRVZQT21aMWJtTjBhVzl1S0c0cGUwWW9iaXdvWm5WdVkzUnBiMjRvYmlsN1NDaHVMR29wZlNrcExFZ29iaXhDS1N4dUxteHZZV1FvS1gwc1QwSktSVU5VT21aMWJtTjBhVzl1S0c0cGUwZ29iaXhRS1gxOUxHUnVQV1oxYm1OMGFXOXVLRzRzZENsN0tHWjFibU4wYVc5dUtHNHBlM1poY2lCMFBXWnVXMjR1ZEdGblRtRnRaVjA3ZEQ5MEtHNHBPbVoxYm1OMGFXOXVLRzRwZTJsbUtGTW9iaWtwZTNaaGNpQjBQVlVvYmlrN2JpNXpkSGxzWlM1aVlXTnJaM0p2ZFc1a1NXMWhaMlU5ZEM1aVlXTnJaM0p2ZFc1a1NXMWhaMlY5ZlNodUtYMHBLRzRwTEdaMWJtTjBhVzl1S0c0c2RDbDdkeWh1S1h4OFR5aHVLWHg4S0Uwb2JpeDBMbU5zWVhOelgyVnVkR1Z5WldRcExFMG9iaXgwTG1Oc1lYTnpYMlY0YVhSbFpDa3NUU2h1TEhRdVkyeGhjM05mWVhCd2JHbGxaQ2tzVFNodUxIUXVZMnhoYzNOZmJHOWhaR2x1Wnlrc1RTaHVMSFF1WTJ4aGMzTmZiRzloWkdWa0tTeE5LRzRzZEM1amJHRnpjMTlsY25KdmNpa3BmU2h1TEhRcExFd29iaWtzSkNodUtYMHNYMjQ5VzF3aVNVMUhYQ0lzWENKSlJsSkJUVVZjSWl4Y0lsWkpSRVZQWENKZExHZHVQV1oxYm1OMGFXOXVLRzRwZTNKbGRIVnliaUJ1TG5WelpWOXVZWFJwZG1VbUpsd2liRzloWkdsdVoxd2lhVzRnU0ZSTlRFbHRZV2RsUld4bGJXVnVkQzV3Y205MGIzUjVjR1Y5TEhadVBXWjFibU4wYVc5dUtHNHNkQ3hsS1h0dUxtWnZja1ZoWTJnb0tHWjFibU4wYVc5dUtHNHBlM0psZEhWeWJpQm1kVzVqZEdsdmJpaHVLWHR5WlhSMWNtNGdiaTVwYzBsdWRHVnljMlZqZEdsdVozeDhiaTVwYm5SbGNuTmxZM1JwYjI1U1lYUnBiejR3ZlNodUtUOW1kVzVqZEdsdmJpaHVMSFFzWlN4cEtYdDJZWElnYnoxbWRXNWpkR2x2YmlodUtYdHlaWFIxY200Z2VDNXBibVJsZUU5bUtFRW9iaWtwUGowd2ZTaHVLVHRyS0c0c1hDSmxiblJsY21Wa1hDSXBMRTRvYml4bExtTnNZWE56WDJWdWRHVnlaV1FwTEUwb2JpeGxMbU5zWVhOelgyVjRhWFJsWkNrc1puVnVZM1JwYjI0b2JpeDBMR1VwZTNRdWRXNXZZbk5sY25abFgyVnVkR1Z5WldRbUpsUW9iaXhsS1gwb2JpeGxMR2twTEVNb1pTNWpZV3hzWW1GamExOWxiblJsY2l4dUxIUXNhU2tzYjN4OGRXNG9iaXhsTEdrcGZTaHVMblJoY21kbGRDeHVMSFFzWlNrNlpuVnVZM1JwYjI0b2JpeDBMR1VzYVNsN2R5aHVLWHg4S0U0b2JpeGxMbU5zWVhOelgyVjRhWFJsWkNrc1puVnVZM1JwYjI0b2JpeDBMR1VzYVNsN1pTNWpZVzVqWld4ZmIyNWZaWGhwZENZbVpuVnVZM1JwYjI0b2JpbDdjbVYwZFhKdUlFRW9iaWs5UFQxMmZTaHVLU1ltWENKSlRVZGNJajA5UFc0dWRHRm5UbUZ0WlNZbUtHOXVLRzRwTEdaMWJtTjBhVzl1S0c0cGUxWW9iaXdvWm5WdVkzUnBiMjRvYmlsN2JHNG9iaWw5S1Nrc2JHNG9iaWw5S0c0cExITnVLRzRwTEUwb2JpeGxMbU5zWVhOelgyeHZZV1JwYm1jcExGSW9hU3d0TVNrc1RDaHVLU3hES0dVdVkyRnNiR0poWTJ0ZlkyRnVZMlZzTEc0c2RDeHBLU2w5S0c0c2RDeGxMR2twTEVNb1pTNWpZV3hzWW1GamExOWxlR2wwTEc0c2RDeHBLU2w5S0c0dWRHRnlaMlYwTEc0c2RDeGxLWDBwS1gwc1ltNDlablZ1WTNScGIyNG9iaWw3Y21WMGRYSnVJRUZ5Y21GNUxuQnliM1J2ZEhsd1pTNXpiR2xqWlM1allXeHNLRzRwZlN4d2JqMW1kVzVqZEdsdmJpaHVLWHR5WlhSMWNtNGdiaTVqYjI1MFlXbHVaWEl1Y1hWbGNubFRaV3hsWTNSdmNrRnNiQ2h1TG1Wc1pXMWxiblJ6WDNObGJHVmpkRzl5S1gwc2FHNDlablZ1WTNScGIyNG9iaWw3Y21WMGRYSnVJR1oxYm1OMGFXOXVLRzRwZTNKbGRIVnliaUJCS0c0cFBUMDlhSDBvYmlsOUxHMXVQV1oxYm1OMGFXOXVLRzRzZENsN2NtVjBkWEp1SUdaMWJtTjBhVzl1S0c0cGUzSmxkSFZ5YmlCaWJpaHVLUzVtYVd4MFpYSW9keWw5S0c1OGZIQnVLSFFwS1gwc1JXNDlablZ1WTNScGIyNG9iaXhsS1h0MllYSWdiejFqS0c0cE8zUm9hWE11WDNObGRIUnBibWR6UFc4c2RHaHBjeTVzYjJGa2FXNW5RMjkxYm5ROU1DeG1kVzVqZEdsdmJpaHVMSFFwZTJrbUppRm5iaWh1S1NZbUtIUXVYMjlpYzJWeWRtVnlQVzVsZHlCSmJuUmxjbk5sWTNScGIyNVBZbk5sY25abGNpZ29ablZ1WTNScGIyNG9aU2w3ZG00b1pTeHVMSFFwZlNrc1puVnVZM1JwYjI0b2JpbDdjbVYwZFhKdWUzSnZiM1E2Ymk1amIyNTBZV2x1WlhJOVBUMWtiMk4xYldWdWREOXVkV3hzT200dVkyOXVkR0ZwYm1WeUxISnZiM1JOWVhKbmFXNDZiaTUwYUhKbGMyaHZiR1J6Zkh4dUxuUm9jbVZ6YUc5c1pDdGNJbkI0WENKOWZTaHVLU2twZlNodkxIUm9hWE1wTEdaMWJtTjBhVzl1S0c0c1pTbDdkQ1ltZDJsdVpHOTNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9YQ0p2Ym14cGJtVmNJaXdvWm5WdVkzUnBiMjRvS1hzaFpuVnVZM1JwYjI0b2JpeDBLWHQyWVhJZ1pUc29aVDF3YmlodUtTeGliaWhsS1M1bWFXeDBaWElvYUc0cEtTNW1iM0pGWVdOb0tDaG1kVzVqZEdsdmJpaDBLWHROS0hRc2JpNWpiR0Z6YzE5bGNuSnZjaWtzVENoMEtYMHBLU3gwTG5Wd1pHRjBaU2dwZlNodUxHVXBmU2twZlNodkxIUm9hWE1wTEhSb2FYTXVkWEJrWVhSbEtHVXBmVHR5WlhSMWNtNGdSVzR1Y0hKdmRHOTBlWEJsUFh0MWNHUmhkR1U2Wm5WdVkzUnBiMjRvYmlsN2RtRnlJSFFzYnl4aFBYUm9hWE11WDNObGRIUnBibWR6TEhJOWJXNG9iaXhoS1R0SEtIUm9hWE1zY2k1c1pXNW5kR2dwTENGbEppWnBQMmR1S0dFcFAyWjFibU4wYVc5dUtHNHNkQ3hsS1h0dUxtWnZja1ZoWTJnb0tHWjFibU4wYVc5dUtHNHBleTB4SVQwOVgyNHVhVzVrWlhoUFppaHVMblJoWjA1aGJXVXBKaVptZFc1amRHbHZiaWh1TEhRc1pTbDdiaTV6WlhSQmRIUnlhV0oxZEdVb1hDSnNiMkZrYVc1blhDSXNYQ0pzWVhwNVhDSXBMSEp1S0c0c2RDeGxLU3htZFc1amRHbHZiaWh1TEhRcGUzWmhjaUJsUFZoYmJpNTBZV2RPWVcxbFhUdGxKaVpsS0c0c2RDbDlLRzRzZENrc2F5aHVMRzBwZlNodUxIUXNaU2w5S1Nrc1J5aGxMREFwZlNoeUxHRXNkR2hwY3lrNktHODljaXhtZFc1amRHbHZiaWh1S1h0dUxtUnBjMk52Ym01bFkzUW9LWDBvZEQxMGFHbHpMbDl2WW5ObGNuWmxjaWtzWm5WdVkzUnBiMjRvYml4MEtYdDBMbVp2Y2tWaFkyZ29LR1oxYm1OMGFXOXVLSFFwZTI0dWIySnpaWEoyWlNoMEtYMHBLWDBvZEN4dktTazZkR2hwY3k1c2IyRmtRV3hzS0hJcGZTeGtaWE4wY205NU9tWjFibU4wYVc5dUtDbDdkR2hwY3k1ZmIySnpaWEoyWlhJbUpuUm9hWE11WDI5aWMyVnlkbVZ5TG1ScGMyTnZibTVsWTNRb0tTeHdiaWgwYUdsekxsOXpaWFIwYVc1bmN5a3VabTl5UldGamFDZ29ablZ1WTNScGIyNG9iaWw3SkNodUtYMHBLU3hrWld4bGRHVWdkR2hwY3k1ZmIySnpaWEoyWlhJc1pHVnNaWFJsSUhSb2FYTXVYM05sZEhScGJtZHpMR1JsYkdWMFpTQjBhR2x6TG14dllXUnBibWREYjNWdWRDeGtaV3hsZEdVZ2RHaHBjeTUwYjB4dllXUkRiM1Z1ZEgwc2JHOWhaRUZzYkRwbWRXNWpkR2x2YmlodUtYdDJZWElnZEQxMGFHbHpMR1U5ZEdocGN5NWZjMlYwZEdsdVozTTdiVzRvYml4bEtTNW1iM0pGWVdOb0tDaG1kVzVqZEdsdmJpaHVLWHRVS0c0c2RDa3NkVzRvYml4bExIUXBmU2twZlN4eVpYTjBiM0psUVd4c09tWjFibU4wYVc5dUtDbDdkbUZ5SUc0OWRHaHBjeTVmYzJWMGRHbHVaM003Y0c0b2Jpa3VabTl5UldGamFDZ29ablZ1WTNScGIyNG9kQ2w3Wkc0b2RDeHVLWDBwS1gxOUxFVnVMbXh2WVdROVpuVnVZM1JwYjI0b2JpeDBLWHQyWVhJZ1pUMWpLSFFwTzNWdUtHNHNaU2w5TEVWdUxuSmxjMlYwVTNSaGRIVnpQV1oxYm1OMGFXOXVLRzRwZTB3b2JpbDlMSFFtSm1aMWJtTjBhVzl1S0c0c2RDbDdhV1lvZENscFppaDBMbXhsYm1kMGFDbG1iM0lvZG1GeUlHVXNhVDB3TzJVOWRGdHBYVHRwS3oweEtYVW9iaXhsS1R0bGJITmxJSFVvYml4MEtYMG9SVzRzZDJsdVpHOTNMbXhoZW5sTWIyRmtUM0IwYVc5dWN5a3NSVzU5S1NrN1hHNGlMQ0psZUhCdmNuUWdZMjl1YzNRZ1ptRmtaVWx1UVc1cGJXRjBhVzl1U1c1dVpYSWdQU0JtZFc1amRHbHZiaWh2WW1vc0lHbDBaVzBzSUh0a2RYSmhkR2x2Yml3Z1pHbHpjR3hoZVN3Z1ptbHVmU2tnZTF4eVhHNGdJR2wwWlcwdWMzUjViR1V1WkdsemNHeGhlU0E5SUdScGMzQnNZWGtnZkh3Z0oySnNiMk5ySnp0Y2NseHVYSEpjYmlBZ1kyOXVjM1FnWDJaaFpHVkpiaUE5SUNoamIyMXdiR1ZqZEdsdmJpa2dQVDRnZTF4eVhHNGdJQ0FnYVhSbGJTNXpkSGxzWlM1dmNHRmphWFI1SUQwZ1kyOXRjR3hsWTNScGIyNDdYSEpjYmlBZ2ZUdGNjbHh1WEhKY2JpQWdZMjl1YzNRZ1lXNXBJRDBnYjJKcUxtRnVhVzFoZEdWUGRtVnlWR2x0WlNoa2RYSmhkR2x2Yml3Z1gyWmhaR1ZKYml3Z1ptbHVLVHRjY2x4dUlDQnlaWEYxWlhOMFFXNXBiV0YwYVc5dVJuSmhiV1VvWVc1cEtUdGNjbHh1ZlR0Y2NseHVYSEpjYmx4eVhHNWxlSEJ2Y25RZ1kyOXVjM1FnWm1Ga1pVOTFkRUZ1YVcxaGRHbHZia2x1Ym1WeUlEMGdablZ1WTNScGIyNG9iMkpxTENCcGRHVnRMQ0I3WkhWeVlYUnBiMjRzSUdacGJuMHBJSHRjY2x4dUlDQmpiMjV6ZENCZlptRmtaVTkxZENBOUlDaGpiMjF3YkdWamRHbHZiaWtnUFQ0Z2UxeHlYRzRnSUNBZ2FYUmxiUzV6ZEhsc1pTNXZjR0ZqYVhSNUlEMGdNU0F0SUdOdmJYQnNaV04wYVc5dU8xeHlYRzVjY2x4dUlDQWdJR2xtSUNoamIyMXdiR1ZqZEdsdmJpQTlQVDBnTVNrZ2FYUmxiUzV6ZEhsc1pTNWthWE53YkdGNUlEMGdKMjV2Ym1Vbk8xeHlYRzRnSUgwN1hISmNibHh5WEc0Z0lHTnZibk4wSUdGdWFTQTlJRzlpYWk1aGJtbHRZWFJsVDNabGNsUnBiV1VvWkhWeVlYUnBiMjRzSUY5bVlXUmxUM1YwTENCbWFXNHBPMXh5WEc0Z0lISmxjWFZsYzNSQmJtbHRZWFJwYjI1R2NtRnRaU2hoYm1rcE8xeHlYRzVjY2x4dUlDQnBkR1Z0TG1Oc1lYTnpUR2x6ZEM1eVpXMXZkbVVvSjI5d1lXTnBkSGtuTENBblpHbHpjR3hoZVNjcE8xeHlYRzU5TzF4eVhHNGlMQ0psZUhCdmNuUWdaR1ZtWVhWc2RDQW9LU0E5UGlCN1hHNGdJR052Ym5OMElHVnNaVzBnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLQ2RqWVc1MllYTW5LVHRjYmlBZ2FXWWdLR1ZzWlcwdVoyVjBRMjl1ZEdWNGRDQW1KaUJsYkdWdExtZGxkRU52Ym5SbGVIUW9KekprSnlrcElIdGNiaUFnSUNCeVpYUjFjbTRnWld4bGJTNTBiMFJoZEdGVlVrd29KMmx0WVdkbEwzZGxZbkFuS1M1cGJtUmxlRTltS0Nka1lYUmhPbWx0WVdkbEwzZGxZbkFuS1NBOVBUMGdNRHRjYmlBZ2ZWeHVYRzRnSUhKbGRIVnliaUJtWVd4elpUdGNibjA3WEc0aUxDSmxlSEJ2Y25RZ1pHVm1ZWFZzZENBb1ptNHBJRDArSUh0Y2JpQWdhV1lnS0dSdlkzVnRaVzUwTG5KbFlXUjVVM1JoZEdVZ1BUMDlJQ2RzYjJGa2FXNW5KeWtnZTF4dUlDQWdJR1J2WTNWdFpXNTBMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMFJQVFVOdmJuUmxiblJNYjJGa1pXUW5MQ0JtYmlrN1hHNGdJSDBnWld4elpTQjdYRzRnSUNBZ1ptNG9LVHRjYmlBZ2ZWeHVmVHRjYmlJc0ltVjRjRzl5ZENCa1pXWmhkV3gwSUNncElEMCtJSHRjY2x4dUlDQnNaWFFnWkdsMklEMGdaRzlqZFcxbGJuUXVZM0psWVhSbFJXeGxiV1Z1ZENnblpHbDJKeWs3WEhKY2JpQWdaR2wyTG5OMGVXeGxMbmRwWkhSb0lEMGdKelV3Y0hnbk8xeHlYRzRnSUdScGRpNXpkSGxzWlM1b1pXbG5hSFFnUFNBbk5UQndlQ2M3WEhKY2JpQWdaR2wyTG5OMGVXeGxMbTkyWlhKbWJHOTNXU0E5SUNkelkzSnZiR3duTzF4eVhHNWNjbHh1SUNCa2IyTjFiV1Z1ZEM1aWIyUjVMbUZ3Y0dWdVpDaGthWFlwTzF4eVhHNGdJR052Ym5OMElITmpjbGRwWkhSb0lEMGdaR2wyTG05bVpuTmxkRmRwWkhSb0lDMGdaR2wyTG1Oc2FXVnVkRmRwWkhSb08xeHlYRzRnSUdScGRpNXlaVzF2ZG1Vb0tUdGNjbHh1WEhKY2JpQWdjbVYwZFhKdUlITmpjbGRwWkhSb08xeHlYRzU5TzF4eVhHNGlMQ0psZUhCdmNuUWdaR1ZtWVhWc2RDQW9jMnhwWkdWelJtbGxiR1FzSUc5bVpuTmxkQ3dnWkc5MGN5d2djMnhwWkdWSmJtUmxlQ2tnUFQ0Z2UxeHlYRzRnSUhOc2FXUmxjMFpwWld4a0xuTjBlV3hsTG5SeVlXNXpabTl5YlNBOUlHQjBjbUZ1YzJ4aGRHVllLQzBrZTI5bVpuTmxkSDF3ZUNsZ08xeHlYRzRnSUdSdmRITXVabTl5UldGamFDZ29aRzkwS1NBOVBpQmtiM1F1WTJ4aGMzTk1hWE4wTG5KbGJXOTJaU2duWVdOMGFYWmxKeWtwTzF4eVhHNGdJR1J2ZEhOYmMyeHBaR1ZKYm1SbGVGMHVZMnhoYzNOTWFYTjBMbUZrWkNnbllXTjBhWFpsSnlrN1hISmNibjA3WEhKY2JpSXNJbWx0Y0c5eWRDQWtJR1p5YjIwZ0p5NHVMMk52Y21Vbk8xeHlYRzVjY2x4dVhISmNiaVF1Y0hKdmRHOTBlWEJsTG1GalkyOXlaR2x2YmlBOUlHWjFibU4wYVc5dUtHRmpkR2wyWlZSeWFXZG5aWElzSUdGamRHbDJaVU52Ym5SbGJuUXBJSHRjY2x4dUlDQm1iM0lnS0d4bGRDQnBJRDBnTURzZ2FTQThJSFJvYVhNdWJHVnVaM1JvT3lCcEt5c3BJSHRjY2x4dUlDQWdJQ1FvZEdocGMxdHBYU2t1WTJ4cFkyc29LQ2tnUFQ0Z2UxeHlYRzRnSUNBZ0lDQWtLSFJvYVhOYmFWMHBMblJ2WjJkc1pVTnNZWE56S0dGamRHbDJaVlJ5YVdkblpYSXBPMXh5WEc0Z0lDQWdJQ0FrS0hSb2FYTmJhVjB1Ym1WNGRFVnNaVzFsYm5SVGFXSnNhVzVuS1M1MGIyZG5iR1ZEYkdGemN5aGhZM1JwZG1WRGIyNTBaVzUwS1R0Y2NseHVYSEpjYmlBZ0lDQWdJR2xtSUNoMGFHbHpXMmxkTG1Oc1lYTnpUR2x6ZEM1amIyNTBZV2x1Y3loaFkzUnBkbVZVY21sbloyVnlLU2tnZTF4eVhHNGdJQ0FnSUNBZ0lIUm9hWE5iYVYwdWJtVjRkRVZzWlcxbGJuUlRhV0pzYVc1bkxuTjBlV3hsTG0xaGVFaGxhV2RvZENBOUlIUm9hWE5iYVYwdWJtVjRkRVZzWlcxbGJuUlRhV0pzYVc1bkxuTmpjbTlzYkVobGFXZG9kQ0FySURJd0lDc2dKM0I0Snp0Y2NseHVJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6VzJsZExtNWxlSFJGYkdWdFpXNTBVMmxpYkdsdVp5NXpkSGxzWlM1dFlYaElaV2xuYUhRZ1BTQXdPMXh5WEc0Z0lDQWdJQ0I5WEhKY2JpQWdJQ0I5S1R0Y2NseHVJQ0I5WEhKY2JuMDdYSEpjYmlJc0ltbHRjRzl5ZENCemJHbGtaVWx1ZEdWeVlXTjBhWFpsSUdaeWIyMGdKeTR1THk0dUwyaGxiSEJsY25NdmMyeHBaR1ZKYm5SbGNtRmpkR2wyWlNjN1hISmNibWx0Y0c5eWRDQWtJR1p5YjIwZ0p5NHVMMk52Y21Vbk8xeHlYRzVjY2x4dVhISmNiaVF1Y0hKdmRHOTBlWEJsTG1OaGNtOTFjMlZzSUQwZ1puVnVZM1JwYjI0b0tTQjdYSEpjYmlBZ1ptOXlJQ2hzWlhRZ2FTQTlJREE3SUdrZ1BDQjBhR2x6TG14bGJtZDBhRHNnYVNzcktTQjdYSEpjYmlBZ0lDQmpiMjV6ZENCM2FXUjBhQ0E5SUhkcGJtUnZkeTVuWlhSRGIyMXdkWFJsWkZOMGVXeGxLSFJvYVhOYmFWMHVjWFZsY25sVFpXeGxZM1J2Y2lnbkxtTmhjbTkxYzJWc0xXbHVibVZ5SnlrcExuZHBaSFJvTzF4eVhHNGdJQ0FnWTI5dWMzUWdjMnhwWkdWeklEMGdkR2hwYzF0cFhTNXhkV1Z5ZVZObGJHVmpkRzl5UVd4c0tDY3VZMkZ5YjNWelpXd3RhWFJsYlNjcE8xeHlYRzRnSUNBZ1kyOXVjM1FnYzJ4cFpHVnpSbWxsYkdRZ1BTQjBhR2x6VzJsZExuRjFaWEo1VTJWc1pXTjBiM0lvSnk1allYSnZkWE5sYkMxemJHbGtaWE1uS1R0Y2NseHVJQ0FnSUdOdmJuTjBJR1J2ZEhNZ1BTQjBhR2x6VzJsZExuRjFaWEo1VTJWc1pXTjBiM0pCYkd3b0p5NWpZWEp2ZFhObGJDMXBibVJwWTJGMGIzSnpJR3hwSnlrN1hISmNibHh5WEc0Z0lDQWdjMnhwWkdWelJtbGxiR1F1YzNSNWJHVXVkMmxrZEdnZ1BTQXhNREFnS2lCemJHbGtaWE11YkdWdVozUm9JQ3NnSnlVbk8xeHlYRzVjY2x4dUlDQWdJSE5zYVdSbGN5NW1iM0pGWVdOb0tDaHpiR2xrWlNrZ1BUNGdjMnhwWkdVdWMzUjViR1V1ZDJsa2RHZ2dQU0IzYVdSMGFDazdYSEpjYmx4eVhHNGdJQ0FnYkdWMElHOW1abk5sZENBOUlEQTdYSEpjYmlBZ0lDQnNaWFFnYzJ4cFpHVkpibVJsZUNBOUlEQTdYSEpjYmx4eVhHNGdJQ0FnTHk4Z2JtVjRkQ0JoY25KdmR5aHlhV2RvZENsY2NseHVJQ0FnSUNRb2RHaHBjMXRwWFM1eGRXVnllVk5sYkdWamRHOXlLQ2RiWkdGMFlTMXpiR2xrWlQxY0ltNWxlSFJjSWwwbktTa3VZMnhwWTJzb0tHVXBJRDArSUh0Y2NseHVJQ0FnSUNBZ1pTNXdjbVYyWlc1MFJHVm1ZWFZzZENncE8xeHlYRzVjY2x4dUlDQWdJQ0FnYjJabWMyVjBJRDA5UFNBcmQybGtkR2d1Y21Wd2JHRmpaU2d2WEZ4RUwyY3NJQ2NuS1NBcUlDaHpiR2xrWlhNdWJHVnVaM1JvSUMwZ01Ta2dQMXh5WEc0Z0lDQWdJQ0FnSUc5bVpuTmxkQ0E5SURBZ09seHlYRzRnSUNBZ0lDQWdJRzltWm5ObGRDQXJQU0FyZDJsa2RHZ3VjbVZ3YkdGalpTZ3ZYRnhFTDJjc0lDY25LVHRjY2x4dVhISmNiaUFnSUNBZ0lITnNhV1JsU1c1a1pYZ2dQVDA5SUhOc2FXUmxjeTVzWlc1bmRHZ2dMU0F4SUQ5Y2NseHVJQ0FnSUNBZ0lDQnpiR2xrWlVsdVpHVjRJRDBnTUNBNlhISmNiaUFnSUNBZ0lDQWdjMnhwWkdWSmJtUmxlQ3NyTzF4eVhHNWNjbHh1SUNBZ0lDQWdjMnhwWkdWSmJuUmxjbUZqZEdsMlpTaHpiR2xrWlhOR2FXVnNaQ3dnYjJabWMyVjBMQ0JrYjNSekxDQnpiR2xrWlVsdVpHVjRLVHRjY2x4dUlDQWdJSDBwTzF4eVhHNWNjbHh1WEhKY2JpQWdJQ0F2THlCd2NtVjJJR0Z5Y205M0tHeGxablFwWEhKY2JpQWdJQ0FrS0hSb2FYTmJhVjB1Y1hWbGNubFRaV3hsWTNSdmNpZ25XMlJoZEdFdGMyeHBaR1U5WENKd2NtVjJYQ0pkSnlrcExtTnNhV05yS0NobEtTQTlQaUI3WEhKY2JpQWdJQ0FnSUdVdWNISmxkbVZ1ZEVSbFptRjFiSFFvS1R0Y2NseHVYSEpjYmlBZ0lDQWdJRzltWm5ObGRDQTlQVDBnTUNBL1hISmNiaUFnSUNBZ0lDQWdiMlptYzJWMElEMGdLM2RwWkhSb0xuSmxjR3hoWTJVb0wxeGNSQzluTENBbkp5a2dLaUFvYzJ4cFpHVnpMbXhsYm1kMGFDQXRJREVwSURwY2NseHVJQ0FnSUNBZ0lDQnZabVp6WlhRZ0xUMGdLM2RwWkhSb0xuSmxjR3hoWTJVb0wxeGNSQzluTENBbkp5azdYSEpjYmx4eVhHNGdJQ0FnSUNCemJHbGtaVWx1WkdWNElEMDlQU0F3SUQ5Y2NseHVJQ0FnSUNBZ0lDQnpiR2xrWlVsdVpHVjRJRDBnYzJ4cFpHVnpMbXhsYm1kMGFDQXRJREVnT2x4eVhHNGdJQ0FnSUNBZ0lITnNhV1JsU1c1a1pYZ3RMVHRjY2x4dVhISmNiaUFnSUNBZ0lITnNhV1JsU1c1MFpYSmhZM1JwZG1Vb2MyeHBaR1Z6Um1sbGJHUXNJRzltWm5ObGRDd2daRzkwY3l3Z2MyeHBaR1ZKYm1SbGVDazdYSEpjYmlBZ0lDQjlLVHRjY2x4dVhISmNibHh5WEc0Z0lDQWdMeThnYzJ4cFpHVWdaRzkwY3lCaGRDQjBhR1VnWW05MGRHOXRYSEpjYmlBZ0lDQWtLQ2NqWlhoaGJYQnNaU0J2YkNCc2FTY3BMbU5zYVdOcktDaGxLU0E5UGlCN1hISmNiaUFnSUNBZ0lHTnZibk4wSUhOc2FXUmxWMkY1SUQwZ0t5UW9aUzUwWVhKblpYUXBMbUYwZEhKcFluVjBaU2duWkdGMFlTMXpiR2xrWlMxMGJ5Y3BPMXh5WEc1Y2NseHVJQ0FnSUNBZ2MyeHBaR1ZKYm1SbGVDQTlJSE5zYVdSbFYyRjVPMXh5WEc0Z0lDQWdJQ0J2Wm1aelpYUWdQU0FyZDJsa2RHZ3VjbVZ3YkdGalpTZ3ZYRnhFTDJjc0lDY25LU0FxSUhOc2FXUmxWMkY1TzF4eVhHNWNjbHh1SUNBZ0lDQWdjMnhwWkdWSmJuUmxjbUZqZEdsMlpTaHpiR2xrWlhOR2FXVnNaQ3dnYjJabWMyVjBMQ0JrYjNSekxDQnpiR2xrWlVsdVpHVjRLVHRjY2x4dUlDQWdJSDBwTzF4eVhHNGdJSDFjY2x4dWZUdGNjbHh1WEhKY2JpUW9KeU5sZUdGdGNHeGxKeWt1WTJGeWIzVnpaV3dvS1R0Y2NseHVJaXdpYVcxd2IzSjBJQ1FnWm5KdmJTQW5MaTR2WTI5eVpTYzdYSEpjYmx4eVhHNWNjbHh1SkM1d2NtOTBiM1I1Y0dVdVpISnZjR1J2ZDI1TlpXNTFJRDBnWm5WdVkzUnBiMjRvS1NCN1hISmNiaUFnWm05eUlDaHNaWFFnYVNBOUlEQTdJR2tnUENCMGFHbHpMbXhsYm1kMGFEc2dhU3NyS1NCN1hISmNiaUFnSUNCamIyNXpkQ0JwWkVsMFpXMGdQU0FrS0hSb2FYTmJhVjBwTG1GMGRISnBZblYwWlNnbmFXUW5LVHRjY2x4dVhISmNiaUFnSUNBa0tIUm9hWE5iYVYwcExtTnNhV05yS0NncElEMCtJQ1FvWUZ0a1lYUmhMWFJ2WjJkc1pTMXBaRDBrZTJsa1NYUmxiWDFkWUNrdVptRmtaVlJ2WjJkc1pTZ3lNREFwS1R0Y2NseHVJQ0I5WEhKY2JuMDdYSEpjYmx4eVhHNGtLQ2N1ZEc5bloyeGxMV1J5YjNCa2IzZHVMVzFsYm5VbktTNWtjbTl3Wkc5M2JrMWxiblVvS1R0Y2NseHVJaXdpYVcxd2IzSjBJQ1FnWm5KdmJTQW5MaTR2WTI5eVpTYzdYSEpjYm1sdGNHOXlkQ0J6WTNKdmJHeFhhV1IwYUNCbWNtOXRJQ2N1TGk4dUxpOW9aV3h3WlhKekwzTmpjbTlzYkZkcFpIUm9KenRjY2x4dVhISmNibU52Ym5OMElFRk9TVTFCVkVsUFRsUkpUVVVnUFNBMU1EQTdYSEpjYmx4eVhHNGtMbkJ5YjNSdmRIbHdaUzV0YjJSaGJDQTlJR1oxYm1OMGFXOXVLR055WldGMFpXUXBJSHRjY2x4dUlDQm1iM0lnS0d4bGRDQnBJRDBnTURzZ2FTQThJSFJvYVhNdWJHVnVaM1JvT3lCcEt5c3BJSHRjY2x4dUlDQWdJR052Ym5OMElIUmhjbWRsZENBOUlDUW9kR2hwYzF0cFhTa3VZWFIwY21saWRYUmxLQ2RrWVhSaExYUmhjbWRsZENjcE8xeHlYRzVjY2x4dUlDQWdJQ1FvZEdocGMxdHBYU2t1WTJ4cFkyc29LR1VwSUQwK0lIdGNjbHh1SUNBZ0lDQWdaUzV3Y21WMlpXNTBSR1ZtWVhWc2RDZ3BPMXh5WEc0Z0lDQWdJQ0FrS0hSaGNtZGxkQ2t1Wm1Ga1pVbHVLRUZPU1UxQlZFbFBUbFJKVFVVcE8xeHlYRzRnSUNBZ0lDQmtiMk4xYldWdWRDNWliMlI1TG5OMGVXeGxMbTkyWlhKbWJHOTNJRDBnSjJocFpHUmxiaWM3WEhKY2JpQWdJQ0I5S1R0Y2NseHVYSEpjYmlBZ0lDQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5UVd4c0tHQWtlM1JoY21kbGRIMGdXMlJoZEdFdFkyeHZjMlZkWUNrdVptOXlSV0ZqYUNnb1luUnVLU0E5UGlCN1hISmNiaUFnSUNBZ0lDUW9ZblJ1S1M1amJHbGpheWdvS1NBOVBpQjdYSEpjYmlBZ0lDQWdJQ0FnSkNoMFlYSm5aWFFwTG1aaFpHVlBkWFFvUVU1SlRVRlVTVTlPVkVsTlJTazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lITmxkRlJwYldWdmRYUW9LQ2tnUFQ0Z2UxeHlYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tHTnlaV0YwWldRcElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ1pHOWpkVzFsYm5RdVltOWtlUzV6ZEhsc1pTQTlJQ2NuTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtIUmhjbWRsZENrdWNtVnRiM1psS0NrN1hISmNiaUFnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ2ZTd2dRVTVKVFVGVVNVOU9WRWxOUlNrN1hISmNiaUFnSUNBZ0lIMHBPMXh5WEc0Z0lDQWdmU2s3WEhKY2JseHlYRzRnSUNBZ0pDaDBZWEpuWlhRcExtTnNhV05yS0NobEtTQTlQaUI3WEhKY2JpQWdJQ0FnSUdsbUlDaGxMblJoY21kbGRDNWpiR0Z6YzB4cGMzUXVZMjl1ZEdGcGJuTW9KMjF2WkdGc0p5a3BJSHRjY2x4dUlDQWdJQ0FnSUNBa0tIUmhjbWRsZENrdVptRmtaVTkxZENoQlRrbE5RVlJKVDA1VVNVMUZLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdjMlYwVkdsdFpXOTFkQ2dvS1NBOVBpQjdYSEpjYmlBZ0lDQWdJQ0FnSUNCcFppQW9ZM0psWVhSbFpDa2dlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQmtiMk4xYldWdWRDNWliMlI1TG5OMGVXeGxJRDBnSnljN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9kR0Z5WjJWMEtTNXlaVzF2ZG1Vb0tUdGNjbHh1SUNBZ0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQjlMQ0JCVGtsTlFWUkpUMDVVU1UxRktUdGNjbHh1SUNBZ0lDQWdmVnh5WEc0Z0lDQWdmU2s3WEhKY2JpQWdmVnh5WEc1OU8xeHlYRzVjY2x4dUpDZ25XMlJoZEdFdGRHOW5aMnhsUFZ3aWJXOWtZV3hjSWwwbktTNXRiMlJoYkNoMGNuVmxLVHRjY2x4dVhISmNibHh5WEc0a0xuQnliM1J2ZEhsd1pTNWpjbVZoZEdWTmIyUmhiQ0E5SUdaMWJtTjBhVzl1S0h0cGJtNWxjaXdnWW5SdWMzMGdQU0I3ZlNrZ2UxeHlYRzRnSUM4dklHVnpiR2x1ZEMxa2FYTmhZbXhsTFc1bGVIUXRiR2x1WlZ4eVhHNGdJR052Ym5OMElIdGpiM1Z1ZEN3Z2MyVjBkR2x1WjNOOUlEMGdZblJ1Y3pzdkx5QmlkRzV6SUhCaGNtRnRjMXh5WEc1Y2NseHVJQ0JtYjNJZ0tHeGxkQ0JwSUQwZ01Ec2dhU0E4SUhSb2FYTXViR1Z1WjNSb095QnBLeXNwSUh0Y2NseHVJQ0FnSUd4bGRDQnRiMlJoYkVWc1pXMWxiblFnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLQ2RrYVhZbktUdGNjbHh1SUNBZ0lDUW9iVzlrWVd4RmJHVnRaVzUwS1M1aFpHUkRiR0Z6Y3lnbmJXOWtZV3duS1R0Y2NseHVJQ0FnSUNRb2JXOWtZV3hGYkdWdFpXNTBLUzVoWkdSQmRIUnlhV0oxZEdVb0oybGtKeXdnSkNoMGFHbHpXMmxkS1M1aGRIUnlhV0oxZEdVb0oyUmhkR0V0ZEdGeVoyVjBKeWt1YzJ4cFkyVW9NU2twTzF4eVhHNGdJQ0FnSkNodGIyUmhiRVZzWlcxbGJuUXBMbWgwYld3b1lGeHlYRzRnSUNBZ1BHUnBkaUJqYkdGemN6MWNJbTF2WkdGc0xXUnBZV3h2WjF3aVBseHlYRzRnSUNBZ0lDQThaR2wySUdOc1lYTnpQVndpYlc5a1lXd3RZMjl1ZEdWdWRGd2lQbHh5WEc0Z0lDQWdJQ0FnSUR4aWRYUjBiMjRnWTJ4aGMzTTlYQ0pqYkc5elpWd2lJR1JoZEdFdFkyeHZjMlUrWEhKY2JpQWdJQ0FnSUNBZ0lDQThjM0JoYmo0bWRHbHRaWE03UEM5emNHRnVQbHh5WEc0Z0lDQWdJQ0FnSUR3dlluVjBkRzl1UGx4eVhHNGdJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0p0YjJSaGJDMW9aV0ZrWlhKY0lqNWNjbHh1SUNBZ0lDQWdJQ0FnSUR4b015QmpiR0Z6Y3oxY0ltMXZaR0ZzTFhScGRHeGxYQ0krSkh0cGJtNWxjaTUwYVhSc1pYMDhMMmd6UGx4eVhHNGdJQ0FnSUNBZ0lEd3ZaR2wyUGx4eVhHNGdJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0p0YjJSaGJDMWliMlI1SUhBeU1Gd2lQaVI3YVc1dVpYSXVZbTlrZVgwOEwyUnBkajVjY2x4dUlDQWdJQ0FnSUNBOFpHbDJJR05zWVhOelBWd2liVzlrWVd3dFptOXZkR1Z5WENJK1hISmNibHh5WEc0Z0lDQWdJQ0FnSUR3dlpHbDJQbHh5WEc0Z0lDQWdJQ0E4TDJScGRqNWNjbHh1SUNBZ0lEd3ZaR2wyUG1BcE8xeHlYRzVjY2x4dUlDQWdJR052Ym5OMElHSjFkSFJ2Ym5NZ1BTQmJYVHRjY2x4dUlDQWdJR1p2Y2lBb2JHVjBJR29nUFNBd095QnFJRHdnWTI5MWJuUTdJR29yS3lrZ2UxeHlYRzRnSUNBZ0lDQmpiMjV6ZENCaWRYUjBiMjRnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLQ2RpZFhSMGIyNG5LVHRjY2x4dUlDQWdJQ0FnSkNoaWRYUjBiMjRwTG1Ga1pFTnNZWE56S0NkaWRHNG5MQ0F1TGk1elpYUjBhVzVuYzF0cVhTNWpiR0Z6YzJWektUdGNjbHh1SUNBZ0lDQWdKQ2hpZFhSMGIyNHBMbWgwYld3b2MyVjBkR2x1WjNOYmFsMHVZMjl1ZEdWdWRDazdYSEpjYmx4eVhHNGdJQ0FnSUNCcFppQW9jMlYwZEdsdVozTmJhbDB1WTJGc2JHSmhZMnNnSmlZZ2RIbHdaVzltSUhObGRIUnBibWR6VzJwZExtTmhiR3hpWVdOcklEMDlQU0FuWm5WdVkzUnBiMjRuS1NCN1hISmNiaUFnSUNBZ0lDQWdKQ2hpZFhSMGIyNHBMbU5zYVdOcktITmxkSFJwYm1kelcycGRMbU5oYkd4aVlXTnJLVHRjY2x4dUlDQWdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lDQWdhV1lnS0hObGRIUnBibWR6VzJwZExtTnNiM05sS1NBa0tHSjFkSFJ2YmlrdVlXUmtRWFIwY21saWRYUmxLQ2RrWVhSaExXTnNiM05sSnl3Z0ozUnlkV1VuS1R0Y2NseHVYSEpjYmlBZ0lDQWdJR0oxZEhSdmJuTXVjSFZ6YUNoaWRYUjBiMjRwTzF4eVhHNGdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lHMXZaR0ZzUld4bGJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY3ViVzlrWVd3dFptOXZkR1Z5SnlrdVlYQndaVzVrS0M0dUxtSjFkSFJ2Ym5NcE8xeHlYRzRnSUNBZ1pHOWpkVzFsYm5RdVltOWtlUzVoY0hCbGJtUkRhR2xzWkNodGIyUmhiRVZzWlcxbGJuUXBPMXh5WEc0Z0lDQWdKQ2gwYUdselcybGRLUzV0YjJSaGJDaDBjblZsS1R0Y2NseHVJQ0FnSUNRb2RHaHBjMXRwWFM1blpYUkJkSFJ5YVdKMWRHVW9KMlJoZEdFdGRHRnlaMlYwSnlrcExtWmhaR1ZKYmloQlRrbE5RVlJKVDA1VVNVMUZLVHRjY2x4dUlDQWdJR1J2WTNWdFpXNTBMbUp2WkhrdWMzUjViR1V1YjNabGNtWnNiM2NnUFNBbmFHbGtaR1Z1Snp0Y2NseHVJQ0FnSUdsbUlDaGtiMk4xYldWdWRDNWliMlI1TG05bVpuTmxkRWhsYVdkb2RDQStJSGRwYm1SdmR5NXBibTVsY2tobGFXZG9kQ2tnWkc5amRXMWxiblF1WW05a2VTNXpkSGxzWlM1dFlYSm5hVzVTYVdkb2RDQTlJR0FrZTNOamNtOXNiRmRwWkhSb0tDbDljSGhnTzF4eVhHNGdJSDFjY2x4dWZUdGNjbHh1SWl3aWFXMXdiM0owSUNRZ1puSnZiU0FuTGk0dlkyOXlaU2M3WEhKY2JseHlYRzVjY2x4dUpDNXdjbTkwYjNSNWNHVXVkR0ZpY3lBOUlHWjFibU4wYVc5dUtDa2dlMXh5WEc0Z0lHWnZjaUFvYkdWMElHa2dQU0F3T3lCcElEd2dkR2hwY3k1c1pXNW5kR2c3SUdrckt5a2dlMXh5WEc0Z0lDQWdKQ2gwYUdselcybGRLUzVqYkdsamF5Z29LU0E5UGlCN1hISmNiaUFnSUNBZ0lDUW9kR2hwYzF0cFhTbGNjbHh1SUNBZ0lDQWdJQ0F1WVdSa1EyeGhjM01vSjNSaFluTmZYM1J5YVdkblpYSXRMV0ZqZEdsMlpTY3BYSEpjYmlBZ0lDQWdJQ0FnTG5OcFlteHBibWR6S0NsY2NseHVJQ0FnSUNBZ0lDQXVjbVZ0YjNabFEyeGhjM01vSjNSaFluTmZYM1J5YVdkblpYSXRMV0ZqZEdsMlpTY3BYSEpjYmlBZ0lDQWdJQ0FnTG1Oc2IzTmxjM1FvSnk1MFlXSnpKeWxjY2x4dUlDQWdJQ0FnSUNBdVptbHVaRUZzYkNnbkxuUmhZbk5mWDJsdWJtVnlKeWxjY2x4dUlDQWdJQ0FnSUNBdVlXUmtRWFIwY21saWRYUmxLQ2R6ZEhsc1pTY3NJQ2NuS1Z4eVhHNGdJQ0FnSUNBZ0lDNXViMlJsVG5WdFltVnlLQ1FvZEdocGMxdHBYU2t1Ym05a1pVbHVaR1Y0S0NrZ0t5QXhLVnh5WEc0Z0lDQWdJQ0FnSUM1bVlXUmxTVzRvTnpBd0tUdGNjbHh1SUNBZ0lIMHBPMXh5WEc0Z0lIMWNjbHh1ZlR0Y2NseHVYSEpjYmlRb0oxdGtZWFJoTFhSaFluQmhibVZzWFNBdWRHRmljMTlmZEhKcFoyZGxjaWNwTG5SaFluTW9LVHRjY2x4dUlpd2lhVzF3YjNKMElDZG1iMk4xY3kxMmFYTnBZbXhsSnp0Y2NseHVhVzF3YjNKMElHeGhlbmxKYldGblpYTWdabkp2YlNBbkxpOXRiMlIxYkdWekwyeGhlbmxKYldGblpYTW5PMXh5WEc1cGJYQnZjblFnWkc5amRXMWxiblJTWldGa2VTQm1jbTl0SUNjdUxpOW9aV3h3WlhKekwyUnZZM1Z0Wlc1MFVtVmhaSGtuTzF4eVhHNWNjbHh1Wkc5amRXMWxiblJTWldGa2VTZ29LU0E5UGlCN1hISmNiaUFnYkdGNmVVbHRZV2RsY3lncE8xeHlYRzU5S1R0Y2NseHVYSEpjYmx4eVhHNWpiMjV6ZENBa0lEMGdablZ1WTNScGIyNG9jMlZzWldOMGIzSXBJSHRjY2x4dUlDQnlaWFIxY200Z2JtVjNJQ1F1Y0hKdmRHOTBlWEJsTGtsdWFYUW9jMlZzWldOMGIzSXBPMXh5WEc1OU8xeHlYRzVjY2x4dUpDNXdjbTkwYjNSNWNHVXVTVzVwZENBOUlHWjFibU4wYVc5dUtITmxiR1ZqZEc5eUtTQjdYSEpjYmlBZ2FXWWdLQ0Z6Wld4bFkzUnZjaWtnY21WMGRYSnVJSFJvYVhNN0x5OGdlMzFjY2x4dVhISmNiaUFnYVdZZ0tITmxiR1ZqZEc5eUxuUmhaMDVoYldVcElIdGNjbHh1SUNBZ0lIUm9hWE5iTUYwZ1BTQnpaV3hsWTNSdmNqdGNjbHh1SUNBZ0lIUm9hWE11YkdWdVozUm9JRDBnTVR0Y2NseHVJQ0FnSUhKbGRIVnliaUIwYUdsek8xeHlYRzRnSUgxY2NseHVYSEpjYmlBZ1QySnFaV04wTG1GemMybG5iaWgwYUdsekxDQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5UVd4c0tITmxiR1ZqZEc5eUtTazdYSEpjYmlBZ2RHaHBjeTVzWlc1bmRHZ2dQU0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eVFXeHNLSE5sYkdWamRHOXlLUzVzWlc1bmRHZzdYSEpjYmlBZ2NtVjBkWEp1SUhSb2FYTTdYSEpjYm4wN1hISmNibHh5WEc0a0xuQnliM1J2ZEhsd1pTNUpibWwwTG5CeWIzUnZkSGx3WlNBOUlDUXVjSEp2ZEc5MGVYQmxPMXh5WEc1M2FXNWtiM2N1SkNBOUlDUTdYSEpjYmx4eVhHNWNjbHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdKRHRjY2x4dUlpd2lhVzF3YjNKMElDUWdabkp2YlNBbkxpOWpiM0psSnp0Y2NseHVhVzF3YjNKMElDY3VMMjF2WkhWc1pYTXZaR2x6Y0d4aGVTYzdYSEpjYm1sdGNHOXlkQ0FuTGk5dGIyUjFiR1Z6TDJOc1lYTnpaWE1uTzF4eVhHNXBiWEJ2Y25RZ0p5NHZiVzlrZFd4bGN5OW9ZVzVrYkdWeWN5YzdYSEpjYm1sdGNHOXlkQ0FuTGk5dGIyUjFiR1Z6TDJGMGRISnBZblYwWlhNbk8xeHlYRzVwYlhCdmNuUWdKeTR2Ylc5a2RXeGxjeTloWTNScGIyNXpKenRjY2x4dWFXMXdiM0owSUNjdUwyMXZaSFZzWlhNdllXNXBiV0YwYVc5dWN5YzdYSEpjYm1sdGNHOXlkQ0FuTGk5amIyMXdiMjVsYm5SekwyMXZaR0ZzY3ljN1hISmNibWx0Y0c5eWRDQW5MaTlqYjIxd2IyNWxiblJ6TDJSeWIzQmtiM2R1VFdWdWRTYzdYSEpjYm1sdGNHOXlkQ0FuTGk5amIyMXdiMjVsYm5SekwzUmhZbk1uTzF4eVhHNXBiWEJ2Y25RZ0p5NHZZMjl0Y0c5dVpXNTBjeTloWTJOdmNtUnBiMjRuTzF4eVhHNXBiWEJ2Y25RZ0p5NHZZMjl0Y0c5dVpXNTBjeTlqWVhKdmRYTmxiQ2M3WEhKY2JtbHRjRzl5ZENBbkxpOXpaWEoyYVdObGN5OXlaWEYxWlhOMGN5YzdYSEpjYmx4eVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENBa08xeHlYRzRpTENKcGJYQnZjblFnSkNCbWNtOXRJQ2N1TGk5amIzSmxKenRjY2x4dVhISmNibHh5WEc0a0xuQnliM1J2ZEhsd1pTNW9kRzFzSUQwZ1puVnVZM1JwYjI0b1kyOXVkR1Z1ZENrZ2UxeHlYRzRnSUdadmNpQW9iR1YwSUdrZ1BTQXdPeUJwSUR3Z2RHaHBjeTVzWlc1bmRHZzdJR2tyS3lrZ2UxeHlYRzRnSUNBZ2FXWWdLR052Ym5SbGJuUXBJSFJvYVhOYmFWMHVhVzV1WlhKSVZFMU1JRDBnWTI5dWRHVnVkRHRjY2x4dUlDQWdJR1ZzYzJVZ2NtVjBkWEp1SUhSb2FYTmJhVjB1YVc1dVpYSklWRTFNTzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnY21WMGRYSnVJSFJvYVhNN1hISmNibjA3WEhKY2JseHlYRzRrTG5CeWIzUnZkSGx3WlM1dWIyUmxUblZ0WW1WeUlEMGdablZ1WTNScGIyNG9iblZ0WW1WeUtTQjdYSEpjYmlBZ2FXWWdLQ0YwYUdselcyNTFiV0psY2lBdElERmRLU0IwYUhKdmR5QnVaWGNnVkhsd1pVVnljbTl5S0dCRmJHVnRaVzUwSUNSN2JuVnRZbVZ5ZlNCa2IyVnpJRzV2ZENCbGVHbHpkR0FwTzF4eVhHNWNjbHh1SUNCamIyNXpkQ0IwWlcxd1RtOWtaU0E5SUhSb2FYTmJiblZ0WW1WeUlDMGdNVjA3WEhKY2JpQWdabTl5SUNoc1pYUWdhU0JwYmlCUFltcGxZM1F1YTJWNWN5aDBhR2x6S1NrZ1pHVnNaWFJsSUhSb2FYTmJhVjA3WEhKY2JseHlYRzRnSUhSb2FYTmJNRjBnUFNCMFpXMXdUbTlrWlR0Y2NseHVJQ0IwYUdsekxteGxibWQwYUNBOUlERTdYSEpjYmx4eVhHNGdJSEpsZEhWeWJpQjBhR2x6TzF4eVhHNTlPMXh5WEc1Y2NseHVKQzV3Y205MGIzUjVjR1V1Ym05a1pVbHVaR1Y0SUQwZ1puVnVZM1JwYjI0b0tTQjdYSEpjYmlBZ1kyOXVjM1FnY0dGeVpXNTBJRDBnZEdocGMxc3dYUzV3WVhKbGJuUk9iMlJsTzF4eVhHNGdJR052Ym5OMElHRnNiRU5vYVd4a2NtVnVJRDBnV3k0dUxuQmhjbVZ1ZEM1amFHbHNaSEpsYmwwN1hISmNibHh5WEc0Z0lHTnZibk4wSUdacGJtUlVhR2x6SUQwZ0tHbDBaVzBwSUQwK0lHbDBaVzBnUFQwOUlIUm9hWE5iTUYwN1hISmNibHh5WEc0Z0lISmxkSFZ5YmlCaGJHeERhR2xzWkhKbGJpNW1hVzVrU1c1a1pYZ29abWx1WkZSb2FYTXBPMXh5WEc1OU8xeHlYRzVjY2x4dUpDNXdjbTkwYjNSNWNHVXVabWx1WkVGc2JDQTlJR1oxYm1OMGFXOXVLSE5sYkdWamRHOXlLU0I3WEhKY2JpQWdiR1YwSUdWc1pXMWxiblJ6UTI5MWJuUmxjaUE5SURBN1hISmNiaUFnYkdWMElHTnZkVzUwWlhJZ1BTQXdPMXh5WEc1Y2NseHVJQ0JqYjI1emRDQmpiM0I1VkdocGN5QTlJRTlpYW1WamRDNWhjM05wWjI0b2UzMHNJSFJvYVhNcE8xeHlYRzVjY2x4dUlDQm1iM0lnS0d4bGRDQnBJRDBnTURzZ2FTQThJR052Y0hsVWFHbHpMbXhsYm1kMGFEc2dhU3NyS1NCN1hISmNiaUFnSUNCamIyNXpkQ0JoY25KaGVVOW1SV3hsYldWdWRITWdQU0JqYjNCNVZHaHBjMXRwWFM1eGRXVnllVk5sYkdWamRHOXlRV3hzS0hObGJHVmpkRzl5S1R0Y2NseHVJQ0FnSUdsbUlDaGhjbkpoZVU5bVJXeGxiV1Z1ZEhNdWJHVnVaM1JvSUQwOVBTQXdLU0JqYjI1MGFXNTFaVHRjY2x4dVhISmNiaUFnSUNCbWIzSWdLR3hsZENCcUlEMGdNRHNnYWlBOElHRnljbUY1VDJaRmJHVnRaVzUwY3k1c1pXNW5kR2c3SUdvckt5a2dlMXh5WEc0Z0lDQWdJQ0IwYUdselcyTnZkVzUwWlhKZElEMGdZWEp5WVhsUFprVnNaVzFsYm5SelcycGRPMXh5WEc0Z0lDQWdJQ0JqYjNWdWRHVnlLeXM3WEhKY2JpQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ1pXeGxiV1Z1ZEhORGIzVnVkR1Z5SUNzOUlHRnljbUY1VDJaRmJHVnRaVzUwY3k1c1pXNW5kR2c3WEhKY2JpQWdmVnh5WEc1Y2NseHVJQ0IwYUdsekxteGxibWQwYUNBOUlHVnNaVzFsYm5SelEyOTFiblJsY2p0Y2NseHVYSEpjYmlBZ1kyOXVjM1FnYjJKcVRHVnVaM1JvSUQwZ1QySnFaV04wTG10bGVYTW9kR2hwY3lrdWJHVnVaM1JvTzF4eVhHNGdJR1p2Y2lBb095QmxiR1Z0Wlc1MGMwTnZkVzUwWlhJZ1BDQnZZbXBNWlc1bmRHZzdJR1ZzWlcxbGJuUnpRMjkxYm5SbGNpc3JLU0JrWld4bGRHVWdkR2hwYzF0bGJHVnRaVzUwYzBOdmRXNTBaWEpkTzF4eVhHNWNjbHh1SUNCeVpYUjFjbTRnZEdocGN6dGNjbHh1ZlR0Y2NseHVYSEpjYmlRdWNISnZkRzkwZVhCbExtTnNiM05sYzNRZ1BTQm1kVzVqZEdsdmJpaHpaV3hsWTNSdmNpa2dlMXh5WEc0Z0lHeGxkQ0JqYjNWdWRHVnlJRDBnTUR0Y2NseHVYSEpjYmlBZ1ptOXlJQ2hzWlhRZ2FTQTlJREE3SUdrZ1BDQjBhR2x6TG14bGJtZDBhRHNnYVNzcktTQjdYSEpjYmlBZ0lDQmpiMjV6ZENCamRYSnlaVzUwVkdocGN5QTlJSFJvYVhOYmFWMDdYSEpjYmlBZ0lDQjBhR2x6VzJsZElEMGdkR2hwYzF0cFhTNWpiRzl6WlhOMEtITmxiR1ZqZEc5eUtUdGNjbHh1WEhKY2JpQWdJQ0JwWmlBb0lYUm9hWE5iYVYwcElIUm9hWE5iYVYwZ1BTQmpkWEp5Wlc1MFZHaHBjenRjY2x4dUlDQWdJR052ZFc1MFpYSXJLenRjY2x4dUlDQjlYSEpjYmx4eVhHNGdJR052Ym5OMElHOWlha3hsYm1kMGFDQTlJRTlpYW1WamRDNXJaWGx6S0hSb2FYTXBMbXhsYm1kMGFEdGNjbHh1SUNCbWIzSWdLRHNnWTI5MWJuUmxjaUE4SUc5aWFreGxibWQwYURzZ1kyOTFiblJsY2lzcktTQmtaV3hsZEdVZ2RHaHBjMXRqYjNWdWRHVnlYVHRjY2x4dVhISmNiaUFnY21WMGRYSnVJSFJvYVhNN1hISmNibjA3WEhKY2JseHlYRzRrTG5CeWIzUnZkSGx3WlM1emFXSnNhVzVuY3lBOUlHWjFibU4wYVc5dUtDa2dlMXh5WEc0Z0lHeGxkQ0JqYjNWdWRHVnlRMmhwYkdSeVpXNGdQU0F3TzF4eVhHNGdJR3hsZENCamIzVnVkR1Z5VTJsaWJHbHVaM01nUFNBd08xeHlYRzVjY2x4dUlDQmpiMjV6ZENCamIzQjVWR2hwY3lBOUlFOWlhbVZqZEM1aGMzTnBaMjRvZTMwc0lIUm9hWE1wTzF4eVhHNWNjbHh1SUNCbWIzSWdLR3hsZENCcElEMGdNRHNnYVNBOElHTnZjSGxVYUdsekxteGxibWQwYURzZ2FTc3JLU0I3WEhKY2JpQWdJQ0JqYjI1emRDQjBhR2x6VUdGeVpXNTBRMmhwYkdSeVpXNGdQU0JqYjNCNVZHaHBjMXRwWFM1d1lYSmxiblJPYjJSbExtTm9hV3hrY21WdU8xeHlYRzVjY2x4dUlDQWdJR1p2Y2lBb2JHVjBJR29nUFNBd095QnFJRHdnZEdocGMxQmhjbVZ1ZEVOb2FXeGtjbVZ1TG14bGJtZDBhRHNnYWlzcktTQjdYSEpjYmlBZ0lDQWdJR2xtSUNoamIzQjVWR2hwYzF0cFhTQTlQVDBnZEdocGMxQmhjbVZ1ZEVOb2FXeGtjbVZ1VzJwZEtTQmpiMjUwYVc1MVpUdGNjbHh1WEhKY2JpQWdJQ0FnSUhSb2FYTmJZMjkxYm5SbGNrTm9hV3hrY21WdVhTQTlJSFJvYVhOUVlYSmxiblJEYUdsc1pISmxibHRxWFR0Y2NseHVJQ0FnSUNBZ1kyOTFiblJsY2tOb2FXeGtjbVZ1S3lzN1hISmNiaUFnSUNCOVhISmNibHh5WEc0Z0lDQWdZMjkxYm5SbGNsTnBZbXhwYm1keklDczlJSFJvYVhOUVlYSmxiblJEYUdsc1pISmxiaTVzWlc1bmRHZ2dMU0F4TzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnZEdocGN5NXNaVzVuZEdnZ1BTQmpiM1Z1ZEdWeVUybGliR2x1WjNNN1hISmNibHh5WEc0Z0lHTnZibk4wSUc5aWFreGxibWQwYUNBOUlFOWlhbVZqZEM1clpYbHpLSFJvYVhNcExteGxibWQwYUR0Y2NseHVJQ0JtYjNJZ0tEc2dZMjkxYm5SbGNsTnBZbXhwYm1keklEd2diMkpxVEdWdVozUm9PeUJqYjNWdWRHVnlVMmxpYkdsdVozTXJLeWtnWkdWc1pYUmxJSFJvYVhOYlkyOTFiblJsY2xOcFlteHBibWR6WFR0Y2NseHVJQ0J5WlhSMWNtNGdkR2hwY3p0Y2NseHVmVHRjY2x4dUlpd2lhVzF3YjNKMElDUWdabkp2YlNBbkxpNHZZMjl5WlNjN1hISmNibWx0Y0c5eWRDQjdabUZrWlVsdVFXNXBiV0YwYVc5dVNXNXVaWElzSUdaaFpHVlBkWFJCYm1sdFlYUnBiMjVKYm01bGNuMGdabkp2YlNBbkxpNHZMaTR2YUdWc2NHVnljeTlCYm1sdFlYUnBiMjVKYm01bGNuTW5PMXh5WEc1Y2NseHVYSEpjYmlRdWNISnZkRzkwZVhCbExtRnVhVzFoZEdWUGRtVnlWR2x0WlNBOUlHWjFibU4wYVc5dUtHUjFjbUYwYVc5dUxDQmpZV3hzWW1GamF5d2dabWx1S1NCN1hISmNiaUFnYkdWMElIUnBiV1ZUZEdGeWREdGNjbHh1WEhKY2JpQWdablZ1WTNScGIyNGdYMkZ1YVcxaGRHVlBkbVZ5VkdsdFpTaDBhVzFsS1NCN1hISmNiaUFnSUNCcFppQW9JWFJwYldWVGRHRnlkQ2tnZEdsdFpWTjBZWEowSUQwZ2RHbHRaVHRjY2x4dVhISmNiaUFnSUNCc1pYUWdkR2x0WlVWc1lYQnpaV1FnUFNCMGFXMWxJQzBnZEdsdFpWTjBZWEowTzF4eVhHNGdJQ0FnYkdWMElHTnZiWEJzWldOMGFXOXVJRDBnVFdGMGFDNXRhVzRvZEdsdFpVVnNZWEJ6WldRZ0x5QmtkWEpoZEdsdmJpd2dNU2s3THk4Z1ptOXlJSE4wZVd4bExtOXdZV05wZEhrb2JXRjRJSFpoYkhWbElEMGdNU2xjY2x4dVhISmNiaUFnSUNCallXeHNZbUZqYXloamIyMXdiR1ZqZEdsdmJpazdYSEpjYmx4eVhHNGdJQ0FnYVdZZ0tIUnBiV1ZGYkdGd2MyVmtJRHdnWkhWeVlYUnBiMjRwSUhKbGNYVmxjM1JCYm1sdFlYUnBiMjVHY21GdFpTaGZZVzVwYldGMFpVOTJaWEpVYVcxbEtUdGNjbHh1SUNBZ0lHVnNjMlVnZTF4eVhHNGdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlHWnBiaUE5UFQwZ0oyWjFibU4wYVc5dUp5a2dabWx1S0NrN1hISmNiaUFnSUNCOVhISmNiaUFnZlZ4eVhHNWNjbHh1SUNCbWIzSWdLR3hsZENCcElEMGdNRHNnYVNBOElIUm9hWE11YkdWdVozUm9PeUJwS3lzcElIdGNjbHh1SUNBZ0lHbG1JQ2hwSUQwOVBTQXdLU0JqYjI1MGFXNTFaVHRjY2x4dUlDQjlYSEpjYmx4eVhHNGdJSEpsZEhWeWJpQmZZVzVwYldGMFpVOTJaWEpVYVcxbE8xeHlYRzU5TzF4eVhHNWNjbHh1SkM1d2NtOTBiM1I1Y0dVdVptRmtaVWx1SUQwZ1puVnVZM1JwYjI0b1pIVnlZWFJwYjI0c0lHUnBjM0JzWVhrc0lHWnBiaWtnZTF4eVhHNGdJR1p2Y2lBb2JHVjBJR2tnUFNBd095QnBJRHdnZEdocGN5NXNaVzVuZEdnN0lHa3JLeWtnZTF4eVhHNGdJQ0FnWm1Ga1pVbHVRVzVwYldGMGFXOXVTVzV1WlhJb2RHaHBjeXdnZEdocGMxdHBYU3hjY2x4dUlDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lHUjFjbUYwYVc5dUxGeHlYRzRnSUNBZ0lDQWdJR1JwYzNCc1lYa3NYSEpjYmlBZ0lDQWdJQ0FnWm1sdVhISmNiaUFnSUNBZ0lIMHBPMXh5WEc0Z0lIMWNjbHh1WEhKY2JpQWdjbVYwZFhKdUlIUm9hWE03WEhKY2JuMDdYSEpjYmx4eVhHNGtMbkJ5YjNSdmRIbHdaUzVtWVdSbFQzVjBJRDBnWm5WdVkzUnBiMjRvWkhWeVlYUnBiMjRzSUdacGJpa2dlMXh5WEc0Z0lHWnZjaUFvYkdWMElHa2dQU0F3T3lCcElEd2dkR2hwY3k1c1pXNW5kR2c3SUdrckt5a2dlMXh5WEc0Z0lDQWdabUZrWlU5MWRFRnVhVzFoZEdsdmJrbHVibVZ5S0hSb2FYTXNJSFJvYVhOYmFWMHNYSEpjYmlBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNCa2RYSmhkR2x2Yml4Y2NseHVJQ0FnSUNBZ0lDQm1hVzVjY2x4dUlDQWdJQ0FnZlNrN1hISmNiaUFnZlZ4eVhHNWNjbHh1SUNCeVpYUjFjbTRnZEdocGN6dGNjbHh1ZlR0Y2NseHVYSEpjYmlRdWNISnZkRzkwZVhCbExtWmhaR1ZVYjJkbmJHVWdQU0JtZFc1amRHbHZiaWhrZFhKaGRHbHZiaXdnWkdsemNHeGhlU3dnWm1sdUtTQjdYSEpjYmlBZ1ptOXlJQ2hzWlhRZ2FTQTlJREE3SUdrZ1BDQjBhR2x6TG14bGJtZDBhRHNnYVNzcktTQjdYSEpjYmlBZ0lDQnBaaUFvZDJsdVpHOTNMbWRsZEVOdmJYQjFkR1ZrVTNSNWJHVW9kR2hwYzF0cFhTa3VaR2x6Y0d4aGVTQTlQVDBnSjI1dmJtVW5LU0I3WEhKY2JpQWdJQ0FnSUdaaFpHVkpia0Z1YVcxaGRHbHZia2x1Ym1WeUtIUm9hWE1zSUhSb2FYTmJhVjBzWEhKY2JpQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnWkhWeVlYUnBiMjRzWEhKY2JpQWdJQ0FnSUNBZ0lDQmthWE53YkdGNUxGeHlYRzRnSUNBZ0lDQWdJQ0FnWm1sdVhISmNiaUFnSUNBZ0lDQWdmU2s3WEhKY2JpQWdJQ0I5SUdWc2MyVWdlMXh5WEc0Z0lDQWdJQ0JtWVdSbFQzVjBRVzVwYldGMGFXOXVTVzV1WlhJb2RHaHBjeXdnZEdocGMxdHBYU3hjY2x4dUlDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0JrZFhKaGRHbHZiaXhjY2x4dUlDQWdJQ0FnSUNBZ0lHWnBibHh5WEc0Z0lDQWdJQ0FnSUgwcE8xeHlYRzRnSUNBZ2ZWeHlYRzRnSUgxY2NseHVYSEpjYmlBZ2NtVjBkWEp1SUhSb2FYTTdYSEpjYm4wN1hISmNiaUlzSW1sdGNHOXlkQ0FrSUdaeWIyMGdKeTR1TDJOdmNtVW5PMXh5WEc1Y2NseHVYSEpjYmlRdWNISnZkRzkwZVhCbExtRmtaRUYwZEhKcFluVjBaU0E5SUdaMWJtTjBhVzl1S0dGMGRISnBZblYwWlU1aGJXVXNJR0YwZEhKcFluVjBaVlpoYkhWbElEMGdKeWNwSUh0Y2NseHVJQ0JwWmlBb0lXRjBkSEpwWW5WMFpVNWhiV1VwSUhKbGRIVnliaUIwYUdsek8xeHlYRzVjY2x4dUlDQm1iM0lnS0d4bGRDQnBJRDBnTURzZ2FTQThJSFJvYVhNdWJHVnVaM1JvT3lCcEt5c3BJSHRjY2x4dUlDQWdJSFJvYVhOYmFWMHVjMlYwUVhSMGNtbGlkWFJsS0dGMGRISnBZblYwWlU1aGJXVXNJR0YwZEhKcFluVjBaVlpoYkhWbEtUdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lISmxkSFZ5YmlCMGFHbHpPMXh5WEc1OU8xeHlYRzVjY2x4dUpDNXdjbTkwYjNSNWNHVXVjbVZ0YjNabFFYUjBjbWxpZFhSbElEMGdablZ1WTNScGIyNG9ZWFIwY21saWRYUmxUbUZ0WlNrZ2UxeHlYRzRnSUdsbUlDZ2hZWFIwY21saWRYUmxUbUZ0WlNrZ2NtVjBkWEp1SUhSb2FYTTdYSEpjYmx4eVhHNGdJR1p2Y2lBb2JHVjBJR2tnUFNBd095QnBJRHdnZEdocGN5NXNaVzVuZEdnN0lHa3JLeWtnZTF4eVhHNGdJQ0FnZEdocGMxdHBYUzV5WlcxdmRtVkJkSFJ5YVdKMWRHVW9ZWFIwY21saWRYUmxUbUZ0WlNrN1hISmNiaUFnZlZ4eVhHNWNjbHh1SUNCeVpYUjFjbTRnZEdocGN6dGNjbHh1ZlR0Y2NseHVYSEpjYmlRdWNISnZkRzkwZVhCbExuUnZaMmRzWlVGMGRISnBZblYwWlNBOUlHWjFibU4wYVc5dUtHRjBkSEpwWW5WMFpVNWhiV1VwSUh0Y2NseHVJQ0JwWmlBb0lXRjBkSEpwWW5WMFpVNWhiV1VwSUhKbGRIVnliaUIwYUdsek8xeHlYRzVjY2x4dUlDQm1iM0lnS0d4bGRDQnBJRDBnTURzZ2FTQThJSFJvYVhNdWJHVnVaM1JvT3lCcEt5c3BJSHRjY2x4dUlDQWdJSFJvYVhOYmFWMHVkRzluWjJ4bFFYUjBjbWxpZFhSbEtHRjBkSEpwWW5WMFpVNWhiV1VwTzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnY21WMGRYSnVJSFJvYVhNN1hISmNibjA3WEhKY2JseHlYRzRrTG5CeWIzUnZkSGx3WlM1aGRIUnlhV0oxZEdVZ1BTQm1kVzVqZEdsdmJpaGhkSFJ5YVdKMWRHVk9ZVzFsS1NCN1hISmNiaUFnYVdZZ0tDRmhkSFJ5YVdKMWRHVk9ZVzFsS1NCeVpYUjFjbTRnZEdocGN6dGNjbHh1WEhKY2JpQWdabTl5SUNoc1pYUWdhU0E5SURBN0lHa2dQQ0IwYUdsekxteGxibWQwYURzZ2FTc3JLU0I3WEhKY2JpQWdJQ0JwWmlBb0lYUm9hWE5iYVYwdVoyVjBRWFIwY21saWRYUmxLR0YwZEhKcFluVjBaVTVoYldVcEtTQnlaWFIxY200Z2RHaHBjenRjY2x4dVhISmNiaUFnSUNCeVpYUjFjbTRnZEdocGMxdHBYUzVuWlhSQmRIUnlhV0oxZEdVb1lYUjBjbWxpZFhSbFRtRnRaU2s3WEhKY2JpQWdmVnh5WEc1OU8xeHlYRzRpTENKcGJYQnZjblFnSkNCbWNtOXRJQ2N1TGk5amIzSmxKenRjY2x4dVhISmNibHh5WEc0a0xuQnliM1J2ZEhsd1pTNWhaR1JEYkdGemN5QTlJR1oxYm1OMGFXOXVLQzR1TG1Oc1lYTnpUbUZ0WlhNcElIdGNjbHh1SUNCbWIzSWdLR3hsZENCcElEMGdNRHNnYVNBOElIUm9hWE11YkdWdVozUm9PeUJwS3lzcElIdGNjbHh1SUNBZ0lHbG1JQ2gwYUdselcybGRMbU5zWVhOelRHbHpkQ2tnZEdocGMxdHBYUzVqYkdGemMweHBjM1F1WVdSa0tDNHVMbU5zWVhOelRtRnRaWE1wTzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnY21WMGRYSnVJSFJvYVhNN1hISmNibjA3WEhKY2JseHlYRzRrTG5CeWIzUnZkSGx3WlM1eVpXMXZkbVZEYkdGemN5QTlJR1oxYm1OMGFXOXVLQzR1TG1Oc1lYTnpUbUZ0WlhNcElIdGNjbHh1SUNCbWIzSWdLR3hsZENCcElEMGdNRHNnYVNBOElIUm9hWE11YkdWdVozUm9PeUJwS3lzcElIdGNjbHh1SUNBZ0lHbG1JQ2gwYUdselcybGRMbU5zWVhOelRHbHpkQ2tnZEdocGMxdHBYUzVqYkdGemMweHBjM1F1Y21WdGIzWmxLQzR1TG1Oc1lYTnpUbUZ0WlhNcE8xeHlYRzRnSUgxY2NseHVYSEpjYmlBZ2NtVjBkWEp1SUhSb2FYTTdYSEpjYm4wN1hISmNibHh5WEc0a0xuQnliM1J2ZEhsd1pTNTBiMmRuYkdWRGJHRnpjeUE5SUdaMWJtTjBhVzl1S0dOc1lYTnpUbUZ0WlNrZ2UxeHlYRzRnSUdadmNpQW9iR1YwSUdrZ1BTQXdPeUJwSUR3Z2RHaHBjeTVzWlc1bmRHZzdJR2tyS3lrZ2UxeHlYRzRnSUNBZ2FXWWdLSFJvYVhOYmFWMHVZMnhoYzNOTWFYTjBLU0IwYUdselcybGRMbU5zWVhOelRHbHpkQzUwYjJkbmJHVW9ZMnhoYzNOT1lXMWxLVHRjY2x4dUlDQjlYSEpjYmx4eVhHNGdJSEpsZEhWeWJpQjBhR2x6TzF4eVhHNTlPMXh5WEc0aUxDSnBiWEJ2Y25RZ0pDQm1jbTl0SUNjdUxpOWpiM0psSnp0Y2NseHVYSEpjYmx4eVhHNGtMbkJ5YjNSdmRIbHdaUzV6YUc5M0lEMGdablZ1WTNScGIyNG9LU0I3WEhKY2JpQWdabTl5SUNoc1pYUWdhU0E5SURBN0lHa2dQQ0IwYUdsekxteGxibWQwYURzZ2FTc3JLU0I3WEhKY2JpQWdJQ0JwWmlBb0lYUm9hWE5iYVYwdWMzUjViR1VwSUdOdmJuUnBiblZsTzF4eVhHNWNjbHh1SUNBZ0lIUm9hWE5iYVYwdWMzUjViR1V1WkdsemNHeGhlU0E5SUNjbk8xeHlYRzRnSUgxY2NseHVYSEpjYmlBZ2NtVjBkWEp1SUhSb2FYTTdYSEpjYm4wN1hISmNibHh5WEc0a0xuQnliM1J2ZEhsd1pTNW9hV1JsSUQwZ1puVnVZM1JwYjI0b0tTQjdYSEpjYmlBZ1ptOXlJQ2hzWlhRZ2FTQTlJREE3SUdrZ1BDQjBhR2x6TG14bGJtZDBhRHNnYVNzcktTQjdYSEpjYmlBZ0lDQnBaaUFvSVhSb2FYTmJhVjB1YzNSNWJHVXBJR052Ym5ScGJuVmxPMXh5WEc1Y2NseHVJQ0FnSUhSb2FYTmJhVjB1YzNSNWJHVXVaR2x6Y0d4aGVTQTlJQ2R1YjI1bEp6dGNjbHh1SUNCOVhISmNibHh5WEc0Z0lISmxkSFZ5YmlCMGFHbHpPMXh5WEc1OU8xeHlYRzVjY2x4dUpDNXdjbTkwYjNSNWNHVXVkRzluWjJ4bFJHbHpjR3hoZVNBOUlHWjFibU4wYVc5dUtDa2dlMXh5WEc0Z0lHWnZjaUFvYkdWMElHa2dQU0F3T3lCcElEd2dkR2hwY3k1c1pXNW5kR2c3SUdrckt5a2dlMXh5WEc0Z0lDQWdhV1lnS0NGMGFHbHpXMmxkTG5OMGVXeGxLU0JqYjI1MGFXNTFaVHRjY2x4dVhISmNiaUFnSUNCMGFHbHpXMmxkTG5OMGVXeGxMbVJwYzNCc1lYa2dQVDA5SUNkdWIyNWxKeUEvSUhSb2FYTmJhVjB1YzNSNWJHVXVaR2x6Y0d4aGVTQTlJQ2NuSURvZ2RHaHBjMXRwWFM1emRIbHNaUzVrYVhOd2JHRjVJRDBnSjI1dmJtVW5PMXh5WEc0Z0lIMWNjbHh1WEhKY2JpQWdjbVYwZFhKdUlIUm9hWE03WEhKY2JuMDdYSEpjYmlJc0ltbHRjRzl5ZENBa0lHWnliMjBnSnk0dUwyTnZjbVVuTzF4eVhHNWNjbHh1WEhKY2JpUXVjSEp2ZEc5MGVYQmxMbTl1SUQwZ1puVnVZM1JwYjI0b1pYWmxiblJPWVcxbExDQmpZV3hzWW1GamF5a2dlMXh5WEc0Z0lHbG1JQ2doWlhabGJuUk9ZVzFsSUh4OElDRmpZV3hzWW1GamF5a2djbVYwZFhKdUlIUm9hWE03WEhKY2JseHlYRzRnSUdadmNpQW9iR1YwSUdrZ1BTQXdPeUJwSUR3Z2RHaHBjeTVzWlc1bmRHZzdJR2tyS3lrZ2UxeHlYRzRnSUNBZ2RHaHBjMXRwWFM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0dWMlpXNTBUbUZ0WlN3Z1kyRnNiR0poWTJzcE8xeHlYRzRnSUgxY2NseHVYSEpjYmlBZ2NtVjBkWEp1SUhSb2FYTTdYSEpjYm4wN1hISmNibHh5WEc0a0xuQnliM1J2ZEhsd1pTNXZabVlnUFNCbWRXNWpkR2x2YmlobGRtVnVkRTVoYldVc0lHTmhiR3hpWVdOcktTQjdYSEpjYmlBZ2FXWWdLQ0ZsZG1WdWRFNWhiV1VnZkh3Z0lXTmhiR3hpWVdOcktTQnlaWFIxY200Z2RHaHBjenRjY2x4dVhISmNiaUFnWm05eUlDaHNaWFFnYVNBOUlEQTdJR2tnUENCMGFHbHpMbXhsYm1kMGFEc2dhU3NyS1NCN1hISmNiaUFnSUNCMGFHbHpXMmxkTG5KbGJXOTJaVVYyWlc1MFRHbHpkR1Z1WlhJb1pYWmxiblJPWVcxbExDQmpZV3hzWW1GamF5azdYSEpjYmlBZ2ZWeHlYRzVjY2x4dUlDQnlaWFIxY200Z2RHaHBjenRjY2x4dWZUdGNjbHh1WEhKY2JpUXVjSEp2ZEc5MGVYQmxMbU5zYVdOcklEMGdablZ1WTNScGIyNG9hR0Z1Wkd4bGNpa2dlMXh5WEc0Z0lHWnZjaUFvYkdWMElHa2dQU0F3T3lCcElEd2dkR2hwY3k1c1pXNW5kR2c3SUdrckt5a2dlMXh5WEc0Z0lDQWdhR0Z1Wkd4bGNpQS9YSEpjYmlBZ0lDQWdJSFJvYVhOYmFWMHVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25ZMnhwWTJzbkxDQm9ZVzVrYkdWeUtTQTZYSEpjYmlBZ0lDQWdJSFJvYVhOYmFWMHVZMnhwWTJzb0tUdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lISmxkSFZ5YmlCMGFHbHpPMXh5WEc1OU8xeHlYRzRpTENKcGJYQnZjblFnVEdGNmVVeHZZV1FnWm5KdmJTQW5kbUZ1YVd4c1lTMXNZWHA1Ykc5aFpDYzdYRzVwYlhCdmNuUWdZMkZ1VlhObFYyVmljQ0JtY205dElDY3VMaTh1TGk5b1pXeHdaWEp6TDJOaGJsVnpaVmRsWW5Bbk8xeHVYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQW9LU0E5UGlCN1hHNGdJR2xtSUNoallXNVZjMlZYWldKd0tDa2dQVDA5SUdaaGJITmxLU0I3WEc0Z0lDQWdZMjl1YzNRZ2JHRjZlVUpuU1hSbGJYTWdQU0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eVFXeHNLQ2N1YkdGNmVWdGtZWFJoTFdKbkxXWmhiR3hpWVdOclhTY3BPMXh1WEc0Z0lDQWdiR0Y2ZVVKblNYUmxiWE11Wm05eVJXRmphQ2dvYVhSbGJTa2dQVDRnZTF4dUlDQWdJQ0FnWTI5dWMzUWdjM0pqUW1kR1lXeHNZbUZqYXlBOUlHbDBaVzB1WjJWMFFYUjBjbWxpZFhSbEtDZGtZWFJoTFdKbkxXWmhiR3hpWVdOckp5azdYRzRnSUNBZ0lDQnBkR1Z0TG5ObGRFRjBkSEpwWW5WMFpTZ25aR0YwWVMxaVp5Y3NJSE55WTBKblJtRnNiR0poWTJzcE8xeHVJQ0FnSUgwcE8xeHVJQ0I5WEc1Y2JpQWdMeThnWlhOc2FXNTBMV1JwYzJGaWJHVXRibVY0ZEMxc2FXNWxJRzV2TFhWdWRYTmxaQzEyWVhKelhHNGdJR052Ym5OMElHeGhlbmxNYjJGa1NXNXpkR0Z1WTJVZ1BTQnVaWGNnVEdGNmVVeHZZV1FvZTF4dUlDQWdJR1ZzWlcxbGJuUnpYM05sYkdWamRHOXlPaUFuTG14aGVua25YRzRnSUgwcE8xeHVmVHRjYmlJc0ltbHRjRzl5ZENBa0lHWnliMjBnSnk0dUwyTnZjbVVuTzF4eVhHNWNjbHh1WEhKY2JpUXVjSEp2ZEc5MGVYQmxMbWRsZENBOUlHRnplVzVqSUdaMWJtTjBhVzl1S0hWeWJDd2daR0YwWVZSNWNHVkJibk4zWlhJZ1BTQW5hbk52YmljcElIdGNjbHh1SUNCc1pYUWdjbVZ6SUQwZ1lYZGhhWFFnWm1WMFkyZ29kWEpzS1R0Y2NseHVYSEpjYmlBZ2FXWWdLQ0Z5WlhNdWIyc3BJSFJvY205M0lHNWxkeUJGY25KdmNpaGdRMjkxYkdRZ2JtOTBJR1psZEdOb0lDUjdkWEpzZlN3Z2MzUmhkSFZ6T2lBa2UzSmxjeTV6ZEdGMGRYTjlZQ2s3WEhKY2JseHlYRzRnSUhOM2FYUmphQ0FvWkdGMFlWUjVjR1ZCYm5OM1pYSXBJSHRjY2x4dUlDQWdJR05oYzJVZ0oycHpiMjRuT2lCeVpYUjFjbTRnWVhkaGFYUWdjbVZ6TG1wemIyNG9LVHRjY2x4dUlDQWdJR05oYzJVZ0ozUmxlSFFuT2lCeVpYUjFjbTRnWVhkaGFYUWdjbVZ6TG5SbGVIUW9LVHRjY2x4dUlDQWdJR05oYzJVZ0oySnNiMkluT2lCeVpYUjFjbTRnWVhkaGFYUWdjbVZ6TG1Kc2IySW9LVHRjY2x4dUlDQjlYSEpjYm4wN1hISmNibHh5WEc1Y2NseHVKQzV3Y205MGIzUjVjR1V1Y0c5emRDQTlJR0Z6ZVc1aklHWjFibU4wYVc5dUtIVnliQ3dnWkdGMFlTd2daR0YwWVZSNWNHVkJibk4zWlhJZ1BTQW5hbk52YmljcElIdGNjbHh1SUNCc1pYUWdjbVZ6SUQwZ1lYZGhhWFFnWm1WMFkyZ29kWEpzTENCN1hISmNiaUFnSUNCdFpYUm9iMlE2SUNkUVQxTlVKeXhjY2x4dUlDQWdJR0p2WkhrNklHUmhkR0ZjY2x4dUlDQjlLVHRjY2x4dVhISmNiaUFnYzNkcGRHTm9JQ2hrWVhSaFZIbHdaVUZ1YzNkbGNpa2dlMXh5WEc0Z0lDQWdZMkZ6WlNBbmFuTnZiaWM2SUhKbGRIVnliaUJoZDJGcGRDQnlaWE11YW5OdmJpZ3BPMXh5WEc0Z0lDQWdZMkZ6WlNBbmRHVjRkQ2M2SUhKbGRIVnliaUJoZDJGcGRDQnlaWE11ZEdWNGRDZ3BPMXh5WEc0Z0lDQWdZMkZ6WlNBbllteHZZaWM2SUhKbGRIVnliaUJoZDJGcGRDQnlaWE11WW14dllpZ3BPMXh5WEc0Z0lIMWNjbHh1ZlR0Y2NseHVJaXdpYVcxd2IzSjBJQ2N1TDJ4cFlpOXNhV0luTzF4dVhHNWNiaVFvSnlOdGIyUmhiRlJ5YVdkblpYSW5LUzVqYkdsamF5Z29LU0E5UGlBa0tDY2piVzlrWVd4VWNtbG5aMlZ5SnlrdVkzSmxZWFJsVFc5a1lXd29YRzRnSUh0Y2JpQWdJQ0JwYm01bGNqb2dlMXh1SUNBZ0lDQWdkR2wwYkdVNklDZEdhWEp6ZENCTmIyUmhiQ2NzWEc0Z0lDQWdJQ0JpYjJSNU9pQW5URzl5WlcwZ2FYQnpkVzBnWkc5c2IzSWdjMmwwSUdGdFpYUWdZMjl1YzJWamRHVjBkWElnWVdScGNHbHphV05wYm1jZ1pXeHBkQzRnU1hCellXMGdiR0ZpYjNKbElHbHRjR1ZrYVhRZ2JtOWlhWE1nZG05c2RYQjBZWFJsYlNCbFlTQjJaWEpwZEdGMGFYTWdiblZ0Y1hWaGJTQmhkQ0J0YjJ4bGMzUnBZV1VnWlhnZ2NtVnRJR1J2Ykc5eUlIRjFZVzBnY0dWeWMzQnBZMmxoZEdseklIRjFhV1JsYlNCaGMzTjFiV1Z1WkdFc0lIWmxjbThnY0hKdmRtbGtaVzUwSUhGMVlYTnBJSEYxYVhNZ2RtOXNkWEIwWVhSMWJTQnRZV2R1YVM0Z1NHRnlkVzBnWVNkY2JpQWdJQ0I5TEZ4dUlDQWdJR0owYm5NNklIdGNiaUFnSUNBZ0lHTnZkVzUwT2lBekxGeHVJQ0FnSUNBZ2MyVjBkR2x1WjNNNklGdGNiaUFnSUNBZ0lDQWdlMXh1SUNBZ0lDQWdJQ0FnSUdOc1lYTnpaWE02SUZzblluUnVMV1JoYm1kbGNpY3NJQ2R0Y2kweE1DZGRMRnh1SUNBZ0lDQWdJQ0FnSUdOdmJuUmxiblE2SUNkamJHOXpaU2NzWEc0Z0lDQWdJQ0FnSUNBZ1kyeHZjMlU2SUhSeWRXVmNiaUFnSUNBZ0lDQWdmU3hjYmlBZ0lDQWdJQ0FnZTF4dUlDQWdJQ0FnSUNBZ0lHTnNZWE56WlhNNklGc25ZblJ1TFhOMVkyTmxjM01uTENBbmJYSXRNVEFuWFN4Y2JpQWdJQ0FnSUNBZ0lDQmpiMjUwWlc1ME9pQW5jMkYyWlNjc1hHNGdJQ0FnSUNBZ0lDQWdZMkZzYkdKaFkyczZJQ2dwSUQwK0lHRnNaWEowS0NkVFlYWmxaQ2NwWEc0Z0lDQWdJQ0FnSUgwc1hHNGdJQ0FnSUNBZ0lIdGNiaUFnSUNBZ0lDQWdJQ0JqYkdGemMyVnpPaUJiSjJKMGJpMTNZWEp1YVc1bkoxMHNYRzRnSUNBZ0lDQWdJQ0FnWTI5dWRHVnVkRG9nSjNkaGNtNXBibWNuTEZ4dUlDQWdJQ0FnSUNBZ0lHTmhiR3hpWVdOck9pQW9LU0E5UGlCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JoYkdWeWRDZ25kMkZ5Ym1sdVp5Y3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyOXVjMjlzWlM1c2IyY29KM2RoY201cGJtY25LVHRjYmlBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lGMWNiaUFnSUNCOVhHNGdJSDFjYmlrcE8xeHVYRzVjYmlRb0p5TnRiMlJoYkZSeWFXZG5aWEl5SnlrdVkyeHBZMnNvS0NrZ1BUNGdKQ2duSTIxdlpHRnNWSEpwWjJkbGNqSW5LUzVqY21WaGRHVk5iMlJoYkNoY2JpQWdlMXh1SUNBZ0lHbHVibVZ5T2lCN1hHNGdJQ0FnSUNCMGFYUnNaVG9nSjFObFkyOXVaQ0JOYjJSaGJDY3NYRzRnSUNBZ0lDQmliMlI1T2lBblRHOXlaVzBnYVhCemRXMGdaRzlzYjNJZ2MybDBJR0Z0WlhRZ1kyOXVjMlZqZEdWMGRYSWdZV1JwY0dsemFXTnBibWNnWld4cGRDNGdTWEJ6WVcwZ2JHRmliM0psSUdsdGNHVmthWFFnYm05aWFYTWdkbTlzZFhCMFlYUmxiU0JsWVNCMlpYSnBkR0YwYVhNZ2JuVnRjWFZoYlNCaGRDQnRiMnhsYzNScFlXVWdaWGdnY21WdElHUnZiRzl5SUhGMVlXMGdjR1Z5YzNCcFkybGhkR2x6SUhGMWFXUmxiU0JoYzNOMWJXVnVaR0VzSUhabGNtOGdjSEp2ZG1sa1pXNTBJSEYxWVhOcElIRjFhWE1nZG05c2RYQjBZWFIxYlNCdFlXZHVhUzRnU0dGeWRXMGdjbVZ0SUdsd2MzVnRJR1J2Ykc5eUlITnBkQ0JoYldWMElHTnZibk5sWTNSbGRIVnlJR0ZrYVhCcGMybGphVzVuSUdWc2FYUXVJRWx3YzJGdElHeGhZbTl5WlNCcGJYQmxaR2wwSUc1dlltbHpJSFp2YkhWd2RHRjBaVzBnWldFZ2RtVnlhWFJoZEdseklHNTFiWEYxWVcwZ1lYUWdiVzlzWlhOMGFXRmxJR1Y0SUhKbGJTQmtiMnh2Y2lCeGRXRnRJSEJsY25Od2FXTnBZWFJwY3lCeGRXbGtaVzBnWVhOemRXMWxibVJoTENCMlpYSnZJSEJ5YjNacFpHVnVkQ0J4ZFdGemFTQnhkV2x6SUhadmJIVndkR0YwZFcwZ2JXRm5ibWt1SUVoaGNuVnRJR0ZoSjF4dUlDQWdJSDBzWEc0Z0lDQWdZblJ1Y3pvZ2UxeHVJQ0FnSUNBZ1kyOTFiblE2SURJc1hHNGdJQ0FnSUNCelpYUjBhVzVuY3pvZ1cxeHVJQ0FnSUNBZ0lDQjdYRzRnSUNBZ0lDQWdJQ0FnWTJ4aGMzTmxjem9nV3lkaWRHNHRaR0Z1WjJWeUp5d2dKMjF5TFRFd0oxMHNYRzRnSUNBZ0lDQWdJQ0FnWTI5dWRHVnVkRG9nSjJOc2IzTmxKeXhjYmlBZ0lDQWdJQ0FnSUNCamJHOXpaVG9nZEhKMVpWeHVJQ0FnSUNBZ0lDQjlMRnh1SUNBZ0lDQWdJQ0I3WEc0Z0lDQWdJQ0FnSUNBZ1kyeGhjM05sY3pvZ1d5ZGlkRzR0WkdGeWF5Y3NJQ2R0Y2kweE1DZGRMRnh1SUNBZ0lDQWdJQ0FnSUdOdmJuUmxiblE2SUNka1lYSnJMVzF2WkdVbkxGeHVJQ0FnSUNBZ0lDQWdJR05oYkd4aVlXTnJPaUFvS1NBOVBpQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBa0tDY3VZblJ1TFdSaGNtc25LUzV2YmlnblkyeHBZMnNuTENBb0tTQTlQaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ1FvSnk1dGIyUmhiQzFqYjI1MFpXNTBKeWt1WVdSa1EyeGhjM01vSjIxdlpHRnNMV1JoY21zbktUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0pDZ25MbTF2WkdGc0xXaGxZV1JsY2ljcExtRmtaRU5zWVhOektDZGpiMnh2Y2kxM2FHbDBaU2NwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FrS0NjdWJXOWtZV3d0WW05a2VTY3BMbUZrWkVOc1lYTnpLQ2RqYjJ4dmNpMTNhR2wwWlNjcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBa0tDY3ViVzlrWVd3dFkyOXVkR1Z1ZENBdVkyeHZjMlVuS1M1aFpHUkRiR0Z6Y3lnblkyOXNiM0l0ZDJocGRHVW5LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ1hWeHVJQ0FnSUgxY2JpQWdmVnh1S1NrN1hHNWNiaVFvSnk1aFkyTnZjbVJwYjI1ZlgzUnlhV2RuWlhJbktTNWhZMk52Y21ScGIyNG9KMkZqWTI5eVpHbHZibDlmZEhKcFoyZGxjaTB0WVdOMGFYWmxKeXdnSjJGalkyOXlaR2x2Ymw5ZlkyOXVkR1Z1ZEMwdFlXTjBhWFpsSnlrN1hHNWNiaVFvS1M1blpYUW9KMmgwZEhCek9pOHZjbVZ4Y21WekxtbHVMMkZ3YVM5d2NtOWtkV04wY3k4ekp5bGNiaUFnTG5Sb1pXNG9jbVZ6SUQwK0lHTnZibk52YkdVdWJHOW5LSEpsY3lrcE8xeHVJbDE5In0=
