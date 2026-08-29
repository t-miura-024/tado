(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) s(a);
  new MutationObserver((a) => {
    for (const l of a)
      if (l.type === "childList")
        for (const f of l.addedNodes) f.tagName === "LINK" && f.rel === "modulepreload" && s(f);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(a) {
    const l = {};
    return (
      a.integrity && (l.integrity = a.integrity),
      a.referrerPolicy && (l.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : a.crossOrigin === "anonymous"
          ? (l.credentials = "omit")
          : (l.credentials = "same-origin"),
      l
    );
  }
  function s(a) {
    if (a.ep) return;
    a.ep = !0;
    const l = n(a);
    fetch(a.href, l);
  }
})();
function Bm(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var xu = { exports: {} },
  Lo = {},
  yu = { exports: {} },
  ht = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $h;
function lv() {
  if ($h) return ht;
  $h = 1;
  var r = Symbol.for("react.element"),
    e = Symbol.for("react.portal"),
    n = Symbol.for("react.fragment"),
    s = Symbol.for("react.strict_mode"),
    a = Symbol.for("react.profiler"),
    l = Symbol.for("react.provider"),
    f = Symbol.for("react.context"),
    u = Symbol.for("react.forward_ref"),
    h = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    g = Symbol.for("react.lazy"),
    v = Symbol.iterator;
  function y(L) {
    return L === null || typeof L != "object"
      ? null
      : ((L = (v && L[v]) || L["@@iterator"]), typeof L == "function" ? L : null);
  }
  var S = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    T = Object.assign,
    E = {};
  function x(L, W, q) {
    ((this.props = L), (this.context = W), (this.refs = E), (this.updater = q || S));
  }
  ((x.prototype.isReactComponent = {}),
    (x.prototype.setState = function (L, W) {
      if (typeof L != "object" && typeof L != "function" && L != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, L, W, "setState");
    }),
    (x.prototype.forceUpdate = function (L) {
      this.updater.enqueueForceUpdate(this, L, "forceUpdate");
    }));
  function _() {}
  _.prototype = x.prototype;
  function D(L, W, q) {
    ((this.props = L), (this.context = W), (this.refs = E), (this.updater = q || S));
  }
  var R = (D.prototype = new _());
  ((R.constructor = D), T(R, x.prototype), (R.isPureReactComponent = !0));
  var N = Array.isArray,
    z = Object.prototype.hasOwnProperty,
    I = { current: null },
    F = { key: !0, ref: !0, __self: !0, __source: !0 };
  function X(L, W, q) {
    var ce,
      me = {},
      Te = null,
      Me = null;
    if (W != null)
      for (ce in (W.ref !== void 0 && (Me = W.ref), W.key !== void 0 && (Te = "" + W.key), W))
        z.call(W, ce) && !F.hasOwnProperty(ce) && (me[ce] = W[ce]);
    var Pe = arguments.length - 2;
    if (Pe === 1) me.children = q;
    else if (1 < Pe) {
      for (var Ue = Array(Pe), Z = 0; Z < Pe; Z++) Ue[Z] = arguments[Z + 2];
      me.children = Ue;
    }
    if (L && L.defaultProps)
      for (ce in ((Pe = L.defaultProps), Pe)) me[ce] === void 0 && (me[ce] = Pe[ce]);
    return { $$typeof: r, type: L, key: Te, ref: Me, props: me, _owner: I.current };
  }
  function A(L, W) {
    return { $$typeof: r, type: L.type, key: W, ref: L.ref, props: L.props, _owner: L._owner };
  }
  function b(L) {
    return typeof L == "object" && L !== null && L.$$typeof === r;
  }
  function le(L) {
    var W = { "=": "=0", ":": "=2" };
    return (
      "$" +
      L.replace(/[=:]/g, function (q) {
        return W[q];
      })
    );
  }
  var ne = /\/+/g;
  function pe(L, W) {
    return typeof L == "object" && L !== null && L.key != null ? le("" + L.key) : W.toString(36);
  }
  function H(L, W, q, ce, me) {
    var Te = typeof L;
    (Te === "undefined" || Te === "boolean") && (L = null);
    var Me = !1;
    if (L === null) Me = !0;
    else
      switch (Te) {
        case "string":
        case "number":
          Me = !0;
          break;
        case "object":
          switch (L.$$typeof) {
            case r:
            case e:
              Me = !0;
          }
      }
    if (Me)
      return (
        (Me = L),
        (me = me(Me)),
        (L = ce === "" ? "." + pe(Me, 0) : ce),
        N(me)
          ? ((q = ""),
            L != null && (q = L.replace(ne, "$&/") + "/"),
            H(me, W, q, "", function (Z) {
              return Z;
            }))
          : me != null &&
            (b(me) &&
              (me = A(
                me,
                q +
                  (!me.key || (Me && Me.key === me.key)
                    ? ""
                    : ("" + me.key).replace(ne, "$&/") + "/") +
                  L,
              )),
            W.push(me)),
        1
      );
    if (((Me = 0), (ce = ce === "" ? "." : ce + ":"), N(L)))
      for (var Pe = 0; Pe < L.length; Pe++) {
        Te = L[Pe];
        var Ue = ce + pe(Te, Pe);
        Me += H(Te, W, q, Ue, me);
      }
    else if (((Ue = y(L)), typeof Ue == "function"))
      for (L = Ue.call(L), Pe = 0; !(Te = L.next()).done;)
        ((Te = Te.value), (Ue = ce + pe(Te, Pe++)), (Me += H(Te, W, q, Ue, me)));
    else if (Te === "object")
      throw (
        (W = String(L)),
        Error(
          "Objects are not valid as a React child (found: " +
            (W === "[object Object]" ? "object with keys {" + Object.keys(L).join(", ") + "}" : W) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    return Me;
  }
  function J(L, W, q) {
    if (L == null) return L;
    var ce = [],
      me = 0;
    return (
      H(L, ce, "", "", function (Te) {
        return W.call(q, Te, me++);
      }),
      ce
    );
  }
  function ie(L) {
    if (L._status === -1) {
      var W = L._result;
      ((W = W()),
        W.then(
          function (q) {
            (L._status === 0 || L._status === -1) && ((L._status = 1), (L._result = q));
          },
          function (q) {
            (L._status === 0 || L._status === -1) && ((L._status = 2), (L._result = q));
          },
        ),
        L._status === -1 && ((L._status = 0), (L._result = W)));
    }
    if (L._status === 1) return L._result.default;
    throw L._result;
  }
  var ue = { current: null },
    V = { transition: null },
    K = { ReactCurrentDispatcher: ue, ReactCurrentBatchConfig: V, ReactCurrentOwner: I };
  function j() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (ht.Children = {
      map: J,
      forEach: function (L, W, q) {
        J(
          L,
          function () {
            W.apply(this, arguments);
          },
          q,
        );
      },
      count: function (L) {
        var W = 0;
        return (
          J(L, function () {
            W++;
          }),
          W
        );
      },
      toArray: function (L) {
        return (
          J(L, function (W) {
            return W;
          }) || []
        );
      },
      only: function (L) {
        if (!b(L))
          throw Error("React.Children.only expected to receive a single React element child.");
        return L;
      },
    }),
    (ht.Component = x),
    (ht.Fragment = n),
    (ht.Profiler = a),
    (ht.PureComponent = D),
    (ht.StrictMode = s),
    (ht.Suspense = h),
    (ht.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = K),
    (ht.act = j),
    (ht.cloneElement = function (L, W, q) {
      if (L == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            L +
            ".",
        );
      var ce = T({}, L.props),
        me = L.key,
        Te = L.ref,
        Me = L._owner;
      if (W != null) {
        if (
          (W.ref !== void 0 && ((Te = W.ref), (Me = I.current)),
          W.key !== void 0 && (me = "" + W.key),
          L.type && L.type.defaultProps)
        )
          var Pe = L.type.defaultProps;
        for (Ue in W)
          z.call(W, Ue) &&
            !F.hasOwnProperty(Ue) &&
            (ce[Ue] = W[Ue] === void 0 && Pe !== void 0 ? Pe[Ue] : W[Ue]);
      }
      var Ue = arguments.length - 2;
      if (Ue === 1) ce.children = q;
      else if (1 < Ue) {
        Pe = Array(Ue);
        for (var Z = 0; Z < Ue; Z++) Pe[Z] = arguments[Z + 2];
        ce.children = Pe;
      }
      return { $$typeof: r, type: L.type, key: me, ref: Te, props: ce, _owner: Me };
    }),
    (ht.createContext = function (L) {
      return (
        (L = {
          $$typeof: f,
          _currentValue: L,
          _currentValue2: L,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (L.Provider = { $$typeof: l, _context: L }),
        (L.Consumer = L)
      );
    }),
    (ht.createElement = X),
    (ht.createFactory = function (L) {
      var W = X.bind(null, L);
      return ((W.type = L), W);
    }),
    (ht.createRef = function () {
      return { current: null };
    }),
    (ht.forwardRef = function (L) {
      return { $$typeof: u, render: L };
    }),
    (ht.isValidElement = b),
    (ht.lazy = function (L) {
      return { $$typeof: g, _payload: { _status: -1, _result: L }, _init: ie };
    }),
    (ht.memo = function (L, W) {
      return { $$typeof: m, type: L, compare: W === void 0 ? null : W };
    }),
    (ht.startTransition = function (L) {
      var W = V.transition;
      V.transition = {};
      try {
        L();
      } finally {
        V.transition = W;
      }
    }),
    (ht.unstable_act = j),
    (ht.useCallback = function (L, W) {
      return ue.current.useCallback(L, W);
    }),
    (ht.useContext = function (L) {
      return ue.current.useContext(L);
    }),
    (ht.useDebugValue = function () {}),
    (ht.useDeferredValue = function (L) {
      return ue.current.useDeferredValue(L);
    }),
    (ht.useEffect = function (L, W) {
      return ue.current.useEffect(L, W);
    }),
    (ht.useId = function () {
      return ue.current.useId();
    }),
    (ht.useImperativeHandle = function (L, W, q) {
      return ue.current.useImperativeHandle(L, W, q);
    }),
    (ht.useInsertionEffect = function (L, W) {
      return ue.current.useInsertionEffect(L, W);
    }),
    (ht.useLayoutEffect = function (L, W) {
      return ue.current.useLayoutEffect(L, W);
    }),
    (ht.useMemo = function (L, W) {
      return ue.current.useMemo(L, W);
    }),
    (ht.useReducer = function (L, W, q) {
      return ue.current.useReducer(L, W, q);
    }),
    (ht.useRef = function (L) {
      return ue.current.useRef(L);
    }),
    (ht.useState = function (L) {
      return ue.current.useState(L);
    }),
    (ht.useSyncExternalStore = function (L, W, q) {
      return ue.current.useSyncExternalStore(L, W, q);
    }),
    (ht.useTransition = function () {
      return ue.current.useTransition();
    }),
    (ht.version = "18.3.1"),
    ht
  );
}
var Kh;
function mf() {
  return (Kh || ((Kh = 1), (yu.exports = lv())), yu.exports);
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Zh;
function cv() {
  if (Zh) return Lo;
  Zh = 1;
  var r = mf(),
    e = Symbol.for("react.element"),
    n = Symbol.for("react.fragment"),
    s = Object.prototype.hasOwnProperty,
    a = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function f(u, h, m) {
    var g,
      v = {},
      y = null,
      S = null;
    (m !== void 0 && (y = "" + m),
      h.key !== void 0 && (y = "" + h.key),
      h.ref !== void 0 && (S = h.ref));
    for (g in h) s.call(h, g) && !l.hasOwnProperty(g) && (v[g] = h[g]);
    if (u && u.defaultProps) for (g in ((h = u.defaultProps), h)) v[g] === void 0 && (v[g] = h[g]);
    return { $$typeof: e, type: u, key: y, ref: S, props: v, _owner: a.current };
  }
  return ((Lo.Fragment = n), (Lo.jsx = f), (Lo.jsxs = f), Lo);
}
var Qh;
function uv() {
  return (Qh || ((Qh = 1), (xu.exports = cv())), xu.exports);
}
var de = uv(),
  _t = mf();
const fv = Bm(_t);
var el = {},
  Su = { exports: {} },
  Nn = {},
  Mu = { exports: {} },
  Eu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Jh;
function dv() {
  return (
    Jh ||
      ((Jh = 1),
      (function (r) {
        function e(V, K) {
          var j = V.length;
          V.push(K);
          e: for (; 0 < j;) {
            var L = (j - 1) >>> 1,
              W = V[L];
            if (0 < a(W, K)) ((V[L] = K), (V[j] = W), (j = L));
            else break e;
          }
        }
        function n(V) {
          return V.length === 0 ? null : V[0];
        }
        function s(V) {
          if (V.length === 0) return null;
          var K = V[0],
            j = V.pop();
          if (j !== K) {
            V[0] = j;
            e: for (var L = 0, W = V.length, q = W >>> 1; L < q;) {
              var ce = 2 * (L + 1) - 1,
                me = V[ce],
                Te = ce + 1,
                Me = V[Te];
              if (0 > a(me, j))
                Te < W && 0 > a(Me, me)
                  ? ((V[L] = Me), (V[Te] = j), (L = Te))
                  : ((V[L] = me), (V[ce] = j), (L = ce));
              else if (Te < W && 0 > a(Me, j)) ((V[L] = Me), (V[Te] = j), (L = Te));
              else break e;
            }
          }
          return K;
        }
        function a(V, K) {
          var j = V.sortIndex - K.sortIndex;
          return j !== 0 ? j : V.id - K.id;
        }
        if (typeof performance == "object" && typeof performance.now == "function") {
          var l = performance;
          r.unstable_now = function () {
            return l.now();
          };
        } else {
          var f = Date,
            u = f.now();
          r.unstable_now = function () {
            return f.now() - u;
          };
        }
        var h = [],
          m = [],
          g = 1,
          v = null,
          y = 3,
          S = !1,
          T = !1,
          E = !1,
          x = typeof setTimeout == "function" ? setTimeout : null,
          _ = typeof clearTimeout == "function" ? clearTimeout : null,
          D = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function R(V) {
          for (var K = n(m); K !== null;) {
            if (K.callback === null) s(m);
            else if (K.startTime <= V) (s(m), (K.sortIndex = K.expirationTime), e(h, K));
            else break;
            K = n(m);
          }
        }
        function N(V) {
          if (((E = !1), R(V), !T))
            if (n(h) !== null) ((T = !0), ie(z));
            else {
              var K = n(m);
              K !== null && ue(N, K.startTime - V);
            }
        }
        function z(V, K) {
          ((T = !1), E && ((E = !1), _(X), (X = -1)), (S = !0));
          var j = y;
          try {
            for (R(K), v = n(h); v !== null && (!(v.expirationTime > K) || (V && !le()));) {
              var L = v.callback;
              if (typeof L == "function") {
                ((v.callback = null), (y = v.priorityLevel));
                var W = L(v.expirationTime <= K);
                ((K = r.unstable_now()),
                  typeof W == "function" ? (v.callback = W) : v === n(h) && s(h),
                  R(K));
              } else s(h);
              v = n(h);
            }
            if (v !== null) var q = !0;
            else {
              var ce = n(m);
              (ce !== null && ue(N, ce.startTime - K), (q = !1));
            }
            return q;
          } finally {
            ((v = null), (y = j), (S = !1));
          }
        }
        var I = !1,
          F = null,
          X = -1,
          A = 5,
          b = -1;
        function le() {
          return !(r.unstable_now() - b < A);
        }
        function ne() {
          if (F !== null) {
            var V = r.unstable_now();
            b = V;
            var K = !0;
            try {
              K = F(!0, V);
            } finally {
              K ? pe() : ((I = !1), (F = null));
            }
          } else I = !1;
        }
        var pe;
        if (typeof D == "function")
          pe = function () {
            D(ne);
          };
        else if (typeof MessageChannel < "u") {
          var H = new MessageChannel(),
            J = H.port2;
          ((H.port1.onmessage = ne),
            (pe = function () {
              J.postMessage(null);
            }));
        } else
          pe = function () {
            x(ne, 0);
          };
        function ie(V) {
          ((F = V), I || ((I = !0), pe()));
        }
        function ue(V, K) {
          X = x(function () {
            V(r.unstable_now());
          }, K);
        }
        ((r.unstable_IdlePriority = 5),
          (r.unstable_ImmediatePriority = 1),
          (r.unstable_LowPriority = 4),
          (r.unstable_NormalPriority = 3),
          (r.unstable_Profiling = null),
          (r.unstable_UserBlockingPriority = 2),
          (r.unstable_cancelCallback = function (V) {
            V.callback = null;
          }),
          (r.unstable_continueExecution = function () {
            T || S || ((T = !0), ie(z));
          }),
          (r.unstable_forceFrameRate = function (V) {
            0 > V || 125 < V
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (A = 0 < V ? Math.floor(1e3 / V) : 5);
          }),
          (r.unstable_getCurrentPriorityLevel = function () {
            return y;
          }),
          (r.unstable_getFirstCallbackNode = function () {
            return n(h);
          }),
          (r.unstable_next = function (V) {
            switch (y) {
              case 1:
              case 2:
              case 3:
                var K = 3;
                break;
              default:
                K = y;
            }
            var j = y;
            y = K;
            try {
              return V();
            } finally {
              y = j;
            }
          }),
          (r.unstable_pauseExecution = function () {}),
          (r.unstable_requestPaint = function () {}),
          (r.unstable_runWithPriority = function (V, K) {
            switch (V) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                V = 3;
            }
            var j = y;
            y = V;
            try {
              return K();
            } finally {
              y = j;
            }
          }),
          (r.unstable_scheduleCallback = function (V, K, j) {
            var L = r.unstable_now();
            switch (
              (typeof j == "object" && j !== null
                ? ((j = j.delay), (j = typeof j == "number" && 0 < j ? L + j : L))
                : (j = L),
              V)
            ) {
              case 1:
                var W = -1;
                break;
              case 2:
                W = 250;
                break;
              case 5:
                W = 1073741823;
                break;
              case 4:
                W = 1e4;
                break;
              default:
                W = 5e3;
            }
            return (
              (W = j + W),
              (V = {
                id: g++,
                callback: K,
                priorityLevel: V,
                startTime: j,
                expirationTime: W,
                sortIndex: -1,
              }),
              j > L
                ? ((V.sortIndex = j),
                  e(m, V),
                  n(h) === null && V === n(m) && (E ? (_(X), (X = -1)) : (E = !0), ue(N, j - L)))
                : ((V.sortIndex = W), e(h, V), T || S || ((T = !0), ie(z))),
              V
            );
          }),
          (r.unstable_shouldYield = le),
          (r.unstable_wrapCallback = function (V) {
            var K = y;
            return function () {
              var j = y;
              y = K;
              try {
                return V.apply(this, arguments);
              } finally {
                y = j;
              }
            };
          }));
      })(Eu)),
    Eu
  );
}
var ep;
function hv() {
  return (ep || ((ep = 1), (Mu.exports = dv())), Mu.exports);
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var tp;
function pv() {
  if (tp) return Nn;
  tp = 1;
  var r = mf(),
    e = hv();
  function n(t) {
    for (
      var i = "https://reactjs.org/docs/error-decoder.html?invariant=" + t, o = 1;
      o < arguments.length;
      o++
    )
      i += "&args[]=" + encodeURIComponent(arguments[o]);
    return (
      "Minified React error #" +
      t +
      "; visit " +
      i +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var s = new Set(),
    a = {};
  function l(t, i) {
    (f(t, i), f(t + "Capture", i));
  }
  function f(t, i) {
    for (a[t] = i, t = 0; t < i.length; t++) s.add(i[t]);
  }
  var u = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    h = Object.prototype.hasOwnProperty,
    m =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    g = {},
    v = {};
  function y(t) {
    return h.call(v, t) ? !0 : h.call(g, t) ? !1 : m.test(t) ? (v[t] = !0) : ((g[t] = !0), !1);
  }
  function S(t, i, o, c) {
    if (o !== null && o.type === 0) return !1;
    switch (typeof i) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return c
          ? !1
          : o !== null
            ? !o.acceptsBooleans
            : ((t = t.toLowerCase().slice(0, 5)), t !== "data-" && t !== "aria-");
      default:
        return !1;
    }
  }
  function T(t, i, o, c) {
    if (i === null || typeof i > "u" || S(t, i, o, c)) return !0;
    if (c) return !1;
    if (o !== null)
      switch (o.type) {
        case 3:
          return !i;
        case 4:
          return i === !1;
        case 5:
          return isNaN(i);
        case 6:
          return isNaN(i) || 1 > i;
      }
    return !1;
  }
  function E(t, i, o, c, d, p, M) {
    ((this.acceptsBooleans = i === 2 || i === 3 || i === 4),
      (this.attributeName = c),
      (this.attributeNamespace = d),
      (this.mustUseProperty = o),
      (this.propertyName = t),
      (this.type = i),
      (this.sanitizeURL = p),
      (this.removeEmptyString = M));
  }
  var x = {};
  ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (t) {
      x[t] = new E(t, 0, !1, t, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (t) {
      var i = t[0];
      x[i] = new E(i, 1, !1, t[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (t) {
      x[t] = new E(t, 2, !1, t.toLowerCase(), null, !1, !1);
    }),
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(
      function (t) {
        x[t] = new E(t, 2, !1, t, null, !1, !1);
      },
    ),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (t) {
        x[t] = new E(t, 3, !1, t.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (t) {
      x[t] = new E(t, 3, !0, t, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (t) {
      x[t] = new E(t, 4, !1, t, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (t) {
      x[t] = new E(t, 6, !1, t, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (t) {
      x[t] = new E(t, 5, !1, t.toLowerCase(), null, !1, !1);
    }));
  var _ = /[\-:]([a-z])/g;
  function D(t) {
    return t[1].toUpperCase();
  }
  ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (t) {
      var i = t.replace(_, D);
      x[i] = new E(i, 1, !1, t, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (t) {
        var i = t.replace(_, D);
        x[i] = new E(i, 1, !1, t, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (t) {
      var i = t.replace(_, D);
      x[i] = new E(i, 1, !1, t, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (t) {
      x[t] = new E(t, 1, !1, t.toLowerCase(), null, !1, !1);
    }),
    (x.xlinkHref = new E("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1)),
    ["src", "href", "action", "formAction"].forEach(function (t) {
      x[t] = new E(t, 1, !1, t.toLowerCase(), null, !0, !0);
    }));
  function R(t, i, o, c) {
    var d = x.hasOwnProperty(i) ? x[i] : null;
    (d !== null
      ? d.type !== 0
      : c || !(2 < i.length) || (i[0] !== "o" && i[0] !== "O") || (i[1] !== "n" && i[1] !== "N")) &&
      (T(i, o, d, c) && (o = null),
      c || d === null
        ? y(i) && (o === null ? t.removeAttribute(i) : t.setAttribute(i, "" + o))
        : d.mustUseProperty
          ? (t[d.propertyName] = o === null ? (d.type === 3 ? !1 : "") : o)
          : ((i = d.attributeName),
            (c = d.attributeNamespace),
            o === null
              ? t.removeAttribute(i)
              : ((d = d.type),
                (o = d === 3 || (d === 4 && o === !0) ? "" : "" + o),
                c ? t.setAttributeNS(c, i, o) : t.setAttribute(i, o))));
  }
  var N = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    z = Symbol.for("react.element"),
    I = Symbol.for("react.portal"),
    F = Symbol.for("react.fragment"),
    X = Symbol.for("react.strict_mode"),
    A = Symbol.for("react.profiler"),
    b = Symbol.for("react.provider"),
    le = Symbol.for("react.context"),
    ne = Symbol.for("react.forward_ref"),
    pe = Symbol.for("react.suspense"),
    H = Symbol.for("react.suspense_list"),
    J = Symbol.for("react.memo"),
    ie = Symbol.for("react.lazy"),
    ue = Symbol.for("react.offscreen"),
    V = Symbol.iterator;
  function K(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (V && t[V]) || t["@@iterator"]), typeof t == "function" ? t : null);
  }
  var j = Object.assign,
    L;
  function W(t) {
    if (L === void 0)
      try {
        throw Error();
      } catch (o) {
        var i = o.stack.trim().match(/\n( *(at )?)/);
        L = (i && i[1]) || "";
      }
    return (
      `
` +
      L +
      t
    );
  }
  var q = !1;
  function ce(t, i) {
    if (!t || q) return "";
    q = !0;
    var o = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (i)
        if (
          ((i = function () {
            throw Error();
          }),
          Object.defineProperty(i.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == "object" && Reflect.construct)
        ) {
          try {
            Reflect.construct(i, []);
          } catch (re) {
            var c = re;
          }
          Reflect.construct(t, [], i);
        } else {
          try {
            i.call();
          } catch (re) {
            c = re;
          }
          t.call(i.prototype);
        }
      else {
        try {
          throw Error();
        } catch (re) {
          c = re;
        }
        t();
      }
    } catch (re) {
      if (re && c && typeof re.stack == "string") {
        for (
          var d = re.stack.split(`
`),
            p = c.stack.split(`
`),
            M = d.length - 1,
            U = p.length - 1;
          1 <= M && 0 <= U && d[M] !== p[U];
        )
          U--;
        for (; 1 <= M && 0 <= U; M--, U--)
          if (d[M] !== p[U]) {
            if (M !== 1 || U !== 1)
              do
                if ((M--, U--, 0 > U || d[M] !== p[U])) {
                  var O =
                    `
` + d[M].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      O.includes("<anonymous>") &&
                      (O = O.replace("<anonymous>", t.displayName)),
                    O
                  );
                }
              while (1 <= M && 0 <= U);
            break;
          }
      }
    } finally {
      ((q = !1), (Error.prepareStackTrace = o));
    }
    return (t = t ? t.displayName || t.name : "") ? W(t) : "";
  }
  function me(t) {
    switch (t.tag) {
      case 5:
        return W(t.type);
      case 16:
        return W("Lazy");
      case 13:
        return W("Suspense");
      case 19:
        return W("SuspenseList");
      case 0:
      case 2:
      case 15:
        return ((t = ce(t.type, !1)), t);
      case 11:
        return ((t = ce(t.type.render, !1)), t);
      case 1:
        return ((t = ce(t.type, !0)), t);
      default:
        return "";
    }
  }
  function Te(t) {
    if (t == null) return null;
    if (typeof t == "function") return t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case F:
        return "Fragment";
      case I:
        return "Portal";
      case A:
        return "Profiler";
      case X:
        return "StrictMode";
      case pe:
        return "Suspense";
      case H:
        return "SuspenseList";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case le:
          return (t.displayName || "Context") + ".Consumer";
        case b:
          return (t._context.displayName || "Context") + ".Provider";
        case ne:
          var i = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = i.displayName || i.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case J:
          return ((i = t.displayName || null), i !== null ? i : Te(t.type) || "Memo");
        case ie:
          ((i = t._payload), (t = t._init));
          try {
            return Te(t(i));
          } catch {}
      }
    return null;
  }
  function Me(t) {
    var i = t.type;
    switch (t.tag) {
      case 24:
        return "Cache";
      case 9:
        return (i.displayName || "Context") + ".Consumer";
      case 10:
        return (i._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (t = i.render),
          (t = t.displayName || t.name || ""),
          i.displayName || (t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return i;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Te(i);
      case 8:
        return i === X ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof i == "function") return i.displayName || i.name || null;
        if (typeof i == "string") return i;
    }
    return null;
  }
  function Pe(t) {
    switch (typeof t) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Ue(t) {
    var i = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
  }
  function Z(t) {
    var i = Ue(t) ? "checked" : "value",
      o = Object.getOwnPropertyDescriptor(t.constructor.prototype, i),
      c = "" + t[i];
    if (
      !t.hasOwnProperty(i) &&
      typeof o < "u" &&
      typeof o.get == "function" &&
      typeof o.set == "function"
    ) {
      var d = o.get,
        p = o.set;
      return (
        Object.defineProperty(t, i, {
          configurable: !0,
          get: function () {
            return d.call(this);
          },
          set: function (M) {
            ((c = "" + M), p.call(this, M));
          },
        }),
        Object.defineProperty(t, i, { enumerable: o.enumerable }),
        {
          getValue: function () {
            return c;
          },
          setValue: function (M) {
            c = "" + M;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[i]);
          },
        }
      );
    }
  }
  function fe(t) {
    t._valueTracker || (t._valueTracker = Z(t));
  }
  function B(t) {
    if (!t) return !1;
    var i = t._valueTracker;
    if (!i) return !0;
    var o = i.getValue(),
      c = "";
    return (
      t && (c = Ue(t) ? (t.checked ? "true" : "false") : t.value),
      (t = c),
      t !== o ? (i.setValue(t), !0) : !1
    );
  }
  function ze(t) {
    if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function he(t, i) {
    var o = i.checked;
    return j({}, i, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: o ?? t._wrapperState.initialChecked,
    });
  }
  function qe(t, i) {
    var o = i.defaultValue == null ? "" : i.defaultValue,
      c = i.checked != null ? i.checked : i.defaultChecked;
    ((o = Pe(i.value != null ? i.value : o)),
      (t._wrapperState = {
        initialChecked: c,
        initialValue: o,
        controlled:
          i.type === "checkbox" || i.type === "radio" ? i.checked != null : i.value != null,
      }));
  }
  function Fe(t, i) {
    ((i = i.checked), i != null && R(t, "checked", i, !1));
  }
  function Ct(t, i) {
    Fe(t, i);
    var o = Pe(i.value),
      c = i.type;
    if (o != null)
      c === "number"
        ? ((o === 0 && t.value === "") || t.value != o) && (t.value = "" + o)
        : t.value !== "" + o && (t.value = "" + o);
    else if (c === "submit" || c === "reset") {
      t.removeAttribute("value");
      return;
    }
    (i.hasOwnProperty("value")
      ? P(t, i.type, o)
      : i.hasOwnProperty("defaultValue") && P(t, i.type, Pe(i.defaultValue)),
      i.checked == null && i.defaultChecked != null && (t.defaultChecked = !!i.defaultChecked));
  }
  function st(t, i, o) {
    if (i.hasOwnProperty("value") || i.hasOwnProperty("defaultValue")) {
      var c = i.type;
      if (!((c !== "submit" && c !== "reset") || (i.value !== void 0 && i.value !== null))) return;
      ((i = "" + t._wrapperState.initialValue),
        o || i === t.value || (t.value = i),
        (t.defaultValue = i));
    }
    ((o = t.name),
      o !== "" && (t.name = ""),
      (t.defaultChecked = !!t._wrapperState.initialChecked),
      o !== "" && (t.name = o));
  }
  function P(t, i, o) {
    (i !== "number" || ze(t.ownerDocument) !== t) &&
      (o == null
        ? (t.defaultValue = "" + t._wrapperState.initialValue)
        : t.defaultValue !== "" + o && (t.defaultValue = "" + o));
  }
  var w = Array.isArray;
  function te(t, i, o, c) {
    if (((t = t.options), i)) {
      i = {};
      for (var d = 0; d < o.length; d++) i["$" + o[d]] = !0;
      for (o = 0; o < t.length; o++)
        ((d = i.hasOwnProperty("$" + t[o].value)),
          t[o].selected !== d && (t[o].selected = d),
          d && c && (t[o].defaultSelected = !0));
    } else {
      for (o = "" + Pe(o), i = null, d = 0; d < t.length; d++) {
        if (t[d].value === o) {
          ((t[d].selected = !0), c && (t[d].defaultSelected = !0));
          return;
        }
        i !== null || t[d].disabled || (i = t[d]);
      }
      i !== null && (i.selected = !0);
    }
  }
  function Se(t, i) {
    if (i.dangerouslySetInnerHTML != null) throw Error(n(91));
    return j({}, i, {
      value: void 0,
      defaultValue: void 0,
      children: "" + t._wrapperState.initialValue,
    });
  }
  function xe(t, i) {
    var o = i.value;
    if (o == null) {
      if (((o = i.children), (i = i.defaultValue), o != null)) {
        if (i != null) throw Error(n(92));
        if (w(o)) {
          if (1 < o.length) throw Error(n(93));
          o = o[0];
        }
        i = o;
      }
      (i == null && (i = ""), (o = i));
    }
    t._wrapperState = { initialValue: Pe(o) };
  }
  function Ee(t, i) {
    var o = Pe(i.value),
      c = Pe(i.defaultValue);
    (o != null &&
      ((o = "" + o),
      o !== t.value && (t.value = o),
      i.defaultValue == null && t.defaultValue !== o && (t.defaultValue = o)),
      c != null && (t.defaultValue = "" + c));
  }
  function We(t) {
    var i = t.textContent;
    i === t._wrapperState.initialValue && i !== "" && i !== null && (t.value = i);
  }
  function Le(t) {
    switch (t) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function ke(t, i) {
    return t == null || t === "http://www.w3.org/1999/xhtml"
      ? Le(i)
      : t === "http://www.w3.org/2000/svg" && i === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : t;
  }
  var Ye,
    ot = (function (t) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (i, o, c, d) {
            MSApp.execUnsafeLocalFunction(function () {
              return t(i, o, c, d);
            });
          }
        : t;
    })(function (t, i) {
      if (t.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in t) t.innerHTML = i;
      else {
        for (
          Ye = Ye || document.createElement("div"),
            Ye.innerHTML = "<svg>" + i.valueOf().toString() + "</svg>",
            i = Ye.firstChild;
          t.firstChild;
        )
          t.removeChild(t.firstChild);
        for (; i.firstChild;) t.appendChild(i.firstChild);
      }
    });
  function ve(t, i) {
    if (i) {
      var o = t.firstChild;
      if (o && o === t.lastChild && o.nodeType === 3) {
        o.nodeValue = i;
        return;
      }
    }
    t.textContent = i;
  }
  var mt = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    dt = ["Webkit", "ms", "Moz", "O"];
  Object.keys(mt).forEach(function (t) {
    dt.forEach(function (i) {
      ((i = i + t.charAt(0).toUpperCase() + t.substring(1)), (mt[i] = mt[t]));
    });
  });
  function tt(t, i, o) {
    return i == null || typeof i == "boolean" || i === ""
      ? ""
      : o || typeof i != "number" || i === 0 || (mt.hasOwnProperty(t) && mt[t])
        ? ("" + i).trim()
        : i + "px";
  }
  function je(t, i) {
    t = t.style;
    for (var o in i)
      if (i.hasOwnProperty(o)) {
        var c = o.indexOf("--") === 0,
          d = tt(o, i[o], c);
        (o === "float" && (o = "cssFloat"), c ? t.setProperty(o, d) : (t[o] = d));
      }
  }
  var He = j(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    },
  );
  function it(t, i) {
    if (i) {
      if (He[t] && (i.children != null || i.dangerouslySetInnerHTML != null))
        throw Error(n(137, t));
      if (i.dangerouslySetInnerHTML != null) {
        if (i.children != null) throw Error(n(60));
        if (
          typeof i.dangerouslySetInnerHTML != "object" ||
          !("__html" in i.dangerouslySetInnerHTML)
        )
          throw Error(n(61));
      }
      if (i.style != null && typeof i.style != "object") throw Error(n(62));
    }
  }
  function vt(t, i) {
    if (t.indexOf("-") === -1) return typeof i.is == "string";
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var bt = null;
  function at(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var Ae = null,
    k = null,
    Re = null;
  function be(t) {
    if ((t = go(t))) {
      if (typeof Ae != "function") throw Error(n(280));
      var i = t.stateNode;
      i && ((i = ma(i)), Ae(t.stateNode, t.type, i));
    }
  }
  function Je(t) {
    k ? (Re ? Re.push(t) : (Re = [t])) : (k = t);
  }
  function $e() {
    if (k) {
      var t = k,
        i = Re;
      if (((Re = k = null), be(t), i)) for (t = 0; t < i.length; t++) be(i[t]);
    }
  }
  function Et(t, i) {
    return t(i);
  }
  function Tt() {}
  var Bt = !1;
  function en(t, i, o) {
    if (Bt) return t(i, o);
    Bt = !0;
    try {
      return Et(t, i, o);
    } finally {
      ((Bt = !1), (k !== null || Re !== null) && (Tt(), $e()));
    }
  }
  function yt(t, i) {
    var o = t.stateNode;
    if (o === null) return null;
    var c = ma(o);
    if (c === null) return null;
    o = c[i];
    e: switch (i) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((c = !c.disabled) ||
          ((t = t.type),
          (c = !(t === "button" || t === "input" || t === "select" || t === "textarea"))),
          (t = !c));
        break e;
      default:
        t = !1;
    }
    if (t) return null;
    if (o && typeof o != "function") throw Error(n(231, i, typeof o));
    return o;
  }
  var qt = !1;
  if (u)
    try {
      var un = {};
      (Object.defineProperty(un, "passive", {
        get: function () {
          qt = !0;
        },
      }),
        window.addEventListener("test", un, un),
        window.removeEventListener("test", un, un));
    } catch {
      qt = !1;
    }
  function Yo(t, i, o, c, d, p, M, U, O) {
    var re = Array.prototype.slice.call(arguments, 3);
    try {
      i.apply(o, re);
    } catch (_e) {
      this.onError(_e);
    }
  }
  var Er = !1,
    Si = null,
    Tr = !1,
    Vi = null,
    $o = {
      onError: function (t) {
        ((Er = !0), (Si = t));
      },
    };
  function Ko(t, i, o, c, d, p, M, U, O) {
    ((Er = !1), (Si = null), Yo.apply($o, arguments));
  }
  function Hl(t, i, o, c, d, p, M, U, O) {
    if ((Ko.apply(this, arguments), Er)) {
      if (Er) {
        var re = Si;
        ((Er = !1), (Si = null));
      } else throw Error(n(198));
      Tr || ((Tr = !0), (Vi = re));
    }
  }
  function Mi(t) {
    var i = t,
      o = t;
    if (t.alternate) for (; i.return;) i = i.return;
    else {
      t = i;
      do ((i = t), (i.flags & 4098) !== 0 && (o = i.return), (t = i.return));
      while (t);
    }
    return i.tag === 3 ? o : null;
  }
  function Zo(t) {
    if (t.tag === 13) {
      var i = t.memoizedState;
      if ((i === null && ((t = t.alternate), t !== null && (i = t.memoizedState)), i !== null))
        return i.dehydrated;
    }
    return null;
  }
  function C(t) {
    if (Mi(t) !== t) throw Error(n(188));
  }
  function $(t) {
    var i = t.alternate;
    if (!i) {
      if (((i = Mi(t)), i === null)) throw Error(n(188));
      return i !== t ? null : t;
    }
    for (var o = t, c = i; ;) {
      var d = o.return;
      if (d === null) break;
      var p = d.alternate;
      if (p === null) {
        if (((c = d.return), c !== null)) {
          o = c;
          continue;
        }
        break;
      }
      if (d.child === p.child) {
        for (p = d.child; p;) {
          if (p === o) return (C(d), t);
          if (p === c) return (C(d), i);
          p = p.sibling;
        }
        throw Error(n(188));
      }
      if (o.return !== c.return) ((o = d), (c = p));
      else {
        for (var M = !1, U = d.child; U;) {
          if (U === o) {
            ((M = !0), (o = d), (c = p));
            break;
          }
          if (U === c) {
            ((M = !0), (c = d), (o = p));
            break;
          }
          U = U.sibling;
        }
        if (!M) {
          for (U = p.child; U;) {
            if (U === o) {
              ((M = !0), (o = p), (c = d));
              break;
            }
            if (U === c) {
              ((M = !0), (c = p), (o = d));
              break;
            }
            U = U.sibling;
          }
          if (!M) throw Error(n(189));
        }
      }
      if (o.alternate !== c) throw Error(n(190));
    }
    if (o.tag !== 3) throw Error(n(188));
    return o.stateNode.current === o ? t : i;
  }
  function oe(t) {
    return ((t = $(t)), t !== null ? ae(t) : null);
  }
  function ae(t) {
    if (t.tag === 5 || t.tag === 6) return t;
    for (t = t.child; t !== null;) {
      var i = ae(t);
      if (i !== null) return i;
      t = t.sibling;
    }
    return null;
  }
  var se = e.unstable_scheduleCallback,
    De = e.unstable_cancelCallback,
    Xe = e.unstable_shouldYield,
    Qe = e.unstable_requestPaint,
    Ie = e.unstable_now,
    lt = e.unstable_getCurrentPriorityLevel,
    nt = e.unstable_ImmediatePriority,
    rt = e.unstable_UserBlockingPriority,
    Pt = e.unstable_NormalPriority,
    _n = e.unstable_LowPriority,
    Vt = e.unstable_IdlePriority,
    An = null,
    gt = null;
  function ut(t) {
    if (gt && typeof gt.onCommitFiberRoot == "function")
      try {
        gt.onCommitFiberRoot(An, t, void 0, (t.current.flags & 128) === 128);
      } catch {}
  }
  var vn = Math.clz32 ? Math.clz32 : Qo,
    Ft = Math.log,
    Ei = Math.LN2;
  function Qo(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((Ft(t) / Ei) | 0)) | 0);
  }
  var mi = 64,
    Wi = 4194304;
  function Ht(t) {
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return t & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return t;
    }
  }
  function Vn(t, i) {
    var o = t.pendingLanes;
    if (o === 0) return 0;
    var c = 0,
      d = t.suspendedLanes,
      p = t.pingedLanes,
      M = o & 268435455;
    if (M !== 0) {
      var U = M & ~d;
      U !== 0 ? (c = Ht(U)) : ((p &= M), p !== 0 && (c = Ht(p)));
    } else ((M = o & ~d), M !== 0 ? (c = Ht(M)) : p !== 0 && (c = Ht(p)));
    if (c === 0) return 0;
    if (
      i !== 0 &&
      i !== c &&
      (i & d) === 0 &&
      ((d = c & -c), (p = i & -i), d >= p || (d === 16 && (p & 4194240) !== 0))
    )
      return i;
    if (((c & 4) !== 0 && (c |= o & 16), (i = t.entangledLanes), i !== 0))
      for (t = t.entanglements, i &= c; 0 < i;)
        ((o = 31 - vn(i)), (d = 1 << o), (c |= t[o]), (i &= ~d));
    return c;
  }
  function Zs(t, i) {
    switch (t) {
      case 1:
      case 2:
      case 4:
        return i + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return i + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Rn(t, i) {
    for (
      var o = t.suspendedLanes, c = t.pingedLanes, d = t.expirationTimes, p = t.pendingLanes;
      0 < p;
    ) {
      var M = 31 - vn(p),
        U = 1 << M,
        O = d[M];
      (O === -1
        ? ((U & o) === 0 || (U & c) !== 0) && (d[M] = Zs(U, i))
        : O <= i && (t.expiredLanes |= U),
        (p &= ~U));
    }
  }
  function wr(t) {
    return ((t = t.pendingLanes & -1073741825), t !== 0 ? t : t & 1073741824 ? 1073741824 : 0);
  }
  function Jo() {
    var t = mi;
    return ((mi <<= 1), (mi & 4194240) === 0 && (mi = 64), t);
  }
  function Zr(t) {
    for (var i = [], o = 0; 31 > o; o++) i.push(t);
    return i;
  }
  function Qs(t, i, o) {
    ((t.pendingLanes |= i),
      i !== 536870912 && ((t.suspendedLanes = 0), (t.pingedLanes = 0)),
      (t = t.eventTimes),
      (i = 31 - vn(i)),
      (t[i] = o));
  }
  function bg(t, i) {
    var o = t.pendingLanes & ~i;
    ((t.pendingLanes = i),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.expiredLanes &= i),
      (t.mutableReadLanes &= i),
      (t.entangledLanes &= i),
      (i = t.entanglements));
    var c = t.eventTimes;
    for (t = t.expirationTimes; 0 < o;) {
      var d = 31 - vn(o),
        p = 1 << d;
      ((i[d] = 0), (c[d] = -1), (t[d] = -1), (o &= ~p));
    }
  }
  function Gl(t, i) {
    var o = (t.entangledLanes |= i);
    for (t = t.entanglements; o;) {
      var c = 31 - vn(o),
        d = 1 << c;
      ((d & i) | (t[c] & i) && (t[c] |= i), (o &= ~d));
    }
  }
  var wt = 0;
  function Rf(t) {
    return ((t &= -t), 1 < t ? (4 < t ? ((t & 268435455) !== 0 ? 16 : 536870912) : 4) : 1);
  }
  var Cf,
    Vl,
    bf,
    Pf,
    Lf,
    Wl = !1,
    ea = [],
    Xi = null,
    ji = null,
    qi = null,
    Js = new Map(),
    eo = new Map(),
    Yi = [],
    Pg =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " ",
      );
  function Df(t, i) {
    switch (t) {
      case "focusin":
      case "focusout":
        Xi = null;
        break;
      case "dragenter":
      case "dragleave":
        ji = null;
        break;
      case "mouseover":
      case "mouseout":
        qi = null;
        break;
      case "pointerover":
      case "pointerout":
        Js.delete(i.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        eo.delete(i.pointerId);
    }
  }
  function to(t, i, o, c, d, p) {
    return t === null || t.nativeEvent !== p
      ? ((t = {
          blockedOn: i,
          domEventName: o,
          eventSystemFlags: c,
          nativeEvent: p,
          targetContainers: [d],
        }),
        i !== null && ((i = go(i)), i !== null && Vl(i)),
        t)
      : ((t.eventSystemFlags |= c),
        (i = t.targetContainers),
        d !== null && i.indexOf(d) === -1 && i.push(d),
        t);
  }
  function Lg(t, i, o, c, d) {
    switch (i) {
      case "focusin":
        return ((Xi = to(Xi, t, i, o, c, d)), !0);
      case "dragenter":
        return ((ji = to(ji, t, i, o, c, d)), !0);
      case "mouseover":
        return ((qi = to(qi, t, i, o, c, d)), !0);
      case "pointerover":
        var p = d.pointerId;
        return (Js.set(p, to(Js.get(p) || null, t, i, o, c, d)), !0);
      case "gotpointercapture":
        return ((p = d.pointerId), eo.set(p, to(eo.get(p) || null, t, i, o, c, d)), !0);
    }
    return !1;
  }
  function Nf(t) {
    var i = Ar(t.target);
    if (i !== null) {
      var o = Mi(i);
      if (o !== null) {
        if (((i = o.tag), i === 13)) {
          if (((i = Zo(o)), i !== null)) {
            ((t.blockedOn = i),
              Lf(t.priority, function () {
                bf(o);
              }));
            return;
          }
        } else if (i === 3 && o.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = o.tag === 3 ? o.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function ta(t) {
    if (t.blockedOn !== null) return !1;
    for (var i = t.targetContainers; 0 < i.length;) {
      var o = jl(t.domEventName, t.eventSystemFlags, i[0], t.nativeEvent);
      if (o === null) {
        o = t.nativeEvent;
        var c = new o.constructor(o.type, o);
        ((bt = c), o.target.dispatchEvent(c), (bt = null));
      } else return ((i = go(o)), i !== null && Vl(i), (t.blockedOn = o), !1);
      i.shift();
    }
    return !0;
  }
  function Uf(t, i, o) {
    ta(t) && o.delete(i);
  }
  function Dg() {
    ((Wl = !1),
      Xi !== null && ta(Xi) && (Xi = null),
      ji !== null && ta(ji) && (ji = null),
      qi !== null && ta(qi) && (qi = null),
      Js.forEach(Uf),
      eo.forEach(Uf));
  }
  function no(t, i) {
    t.blockedOn === i &&
      ((t.blockedOn = null),
      Wl || ((Wl = !0), e.unstable_scheduleCallback(e.unstable_NormalPriority, Dg)));
  }
  function io(t) {
    function i(d) {
      return no(d, t);
    }
    if (0 < ea.length) {
      no(ea[0], t);
      for (var o = 1; o < ea.length; o++) {
        var c = ea[o];
        c.blockedOn === t && (c.blockedOn = null);
      }
    }
    for (
      Xi !== null && no(Xi, t),
        ji !== null && no(ji, t),
        qi !== null && no(qi, t),
        Js.forEach(i),
        eo.forEach(i),
        o = 0;
      o < Yi.length;
      o++
    )
      ((c = Yi[o]), c.blockedOn === t && (c.blockedOn = null));
    for (; 0 < Yi.length && ((o = Yi[0]), o.blockedOn === null);)
      (Nf(o), o.blockedOn === null && Yi.shift());
  }
  var Qr = N.ReactCurrentBatchConfig,
    na = !0;
  function Ng(t, i, o, c) {
    var d = wt,
      p = Qr.transition;
    Qr.transition = null;
    try {
      ((wt = 1), Xl(t, i, o, c));
    } finally {
      ((wt = d), (Qr.transition = p));
    }
  }
  function Ug(t, i, o, c) {
    var d = wt,
      p = Qr.transition;
    Qr.transition = null;
    try {
      ((wt = 4), Xl(t, i, o, c));
    } finally {
      ((wt = d), (Qr.transition = p));
    }
  }
  function Xl(t, i, o, c) {
    if (na) {
      var d = jl(t, i, o, c);
      if (d === null) (cc(t, i, c, ia, o), Df(t, c));
      else if (Lg(d, t, i, o, c)) c.stopPropagation();
      else if ((Df(t, c), i & 4 && -1 < Pg.indexOf(t))) {
        for (; d !== null;) {
          var p = go(d);
          if (
            (p !== null && Cf(p), (p = jl(t, i, o, c)), p === null && cc(t, i, c, ia, o), p === d)
          )
            break;
          d = p;
        }
        d !== null && c.stopPropagation();
      } else cc(t, i, c, null, o);
    }
  }
  var ia = null;
  function jl(t, i, o, c) {
    if (((ia = null), (t = at(c)), (t = Ar(t)), t !== null))
      if (((i = Mi(t)), i === null)) t = null;
      else if (((o = i.tag), o === 13)) {
        if (((t = Zo(i)), t !== null)) return t;
        t = null;
      } else if (o === 3) {
        if (i.stateNode.current.memoizedState.isDehydrated)
          return i.tag === 3 ? i.stateNode.containerInfo : null;
        t = null;
      } else i !== t && (t = null);
    return ((ia = t), null);
  }
  function If(t) {
    switch (t) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (lt()) {
          case nt:
            return 1;
          case rt:
            return 4;
          case Pt:
          case _n:
            return 16;
          case Vt:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var $i = null,
    ql = null,
    ra = null;
  function Ff() {
    if (ra) return ra;
    var t,
      i = ql,
      o = i.length,
      c,
      d = "value" in $i ? $i.value : $i.textContent,
      p = d.length;
    for (t = 0; t < o && i[t] === d[t]; t++);
    var M = o - t;
    for (c = 1; c <= M && i[o - c] === d[p - c]; c++);
    return (ra = d.slice(t, 1 < c ? 1 - c : void 0));
  }
  function sa(t) {
    var i = t.keyCode;
    return (
      "charCode" in t ? ((t = t.charCode), t === 0 && i === 13 && (t = 13)) : (t = i),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function oa() {
    return !0;
  }
  function Of() {
    return !1;
  }
  function In(t) {
    function i(o, c, d, p, M) {
      ((this._reactName = o),
        (this._targetInst = d),
        (this.type = c),
        (this.nativeEvent = p),
        (this.target = M),
        (this.currentTarget = null));
      for (var U in t) t.hasOwnProperty(U) && ((o = t[U]), (this[U] = o ? o(p) : p[U]));
      return (
        (this.isDefaultPrevented = (
          p.defaultPrevented != null ? p.defaultPrevented : p.returnValue === !1
        )
          ? oa
          : Of),
        (this.isPropagationStopped = Of),
        this
      );
    }
    return (
      j(i.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var o = this.nativeEvent;
          o &&
            (o.preventDefault
              ? o.preventDefault()
              : typeof o.returnValue != "unknown" && (o.returnValue = !1),
            (this.isDefaultPrevented = oa));
        },
        stopPropagation: function () {
          var o = this.nativeEvent;
          o &&
            (o.stopPropagation
              ? o.stopPropagation()
              : typeof o.cancelBubble != "unknown" && (o.cancelBubble = !0),
            (this.isPropagationStopped = oa));
        },
        persist: function () {},
        isPersistent: oa,
      }),
      i
    );
  }
  var Jr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Yl = In(Jr),
    ro = j({}, Jr, { view: 0, detail: 0 }),
    Ig = In(ro),
    $l,
    Kl,
    so,
    aa = j({}, ro, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Ql,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== so &&
              (so && t.type === "mousemove"
                ? (($l = t.screenX - so.screenX), (Kl = t.screenY - so.screenY))
                : (Kl = $l = 0),
              (so = t)),
            $l);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : Kl;
      },
    }),
    kf = In(aa),
    Fg = j({}, aa, { dataTransfer: 0 }),
    Og = In(Fg),
    kg = j({}, ro, { relatedTarget: 0 }),
    Zl = In(kg),
    zg = j({}, Jr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Bg = In(zg),
    Hg = j({}, Jr, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    Gg = In(Hg),
    Vg = j({}, Jr, { data: 0 }),
    zf = In(Vg),
    Wg = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Xg = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    jg = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function qg(t) {
    var i = this.nativeEvent;
    return i.getModifierState ? i.getModifierState(t) : (t = jg[t]) ? !!i[t] : !1;
  }
  function Ql() {
    return qg;
  }
  var Yg = j({}, ro, {
      key: function (t) {
        if (t.key) {
          var i = Wg[t.key] || t.key;
          if (i !== "Unidentified") return i;
        }
        return t.type === "keypress"
          ? ((t = sa(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
            ? Xg[t.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Ql,
      charCode: function (t) {
        return t.type === "keypress" ? sa(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? sa(t)
          : t.type === "keydown" || t.type === "keyup"
            ? t.keyCode
            : 0;
      },
    }),
    $g = In(Yg),
    Kg = j({}, aa, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Bf = In(Kg),
    Zg = j({}, ro, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ql,
    }),
    Qg = In(Zg),
    Jg = j({}, Jr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    e_ = In(Jg),
    t_ = j({}, aa, {
      deltaX: function (t) {
        return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
            ? -t.wheelDeltaY
            : "wheelDelta" in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    n_ = In(t_),
    i_ = [9, 13, 27, 32],
    Jl = u && "CompositionEvent" in window,
    oo = null;
  u && "documentMode" in document && (oo = document.documentMode);
  var r_ = u && "TextEvent" in window && !oo,
    Hf = u && (!Jl || (oo && 8 < oo && 11 >= oo)),
    Gf = " ",
    Vf = !1;
  function Wf(t, i) {
    switch (t) {
      case "keyup":
        return i_.indexOf(i.keyCode) !== -1;
      case "keydown":
        return i.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Xf(t) {
    return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
  }
  var es = !1;
  function s_(t, i) {
    switch (t) {
      case "compositionend":
        return Xf(i);
      case "keypress":
        return i.which !== 32 ? null : ((Vf = !0), Gf);
      case "textInput":
        return ((t = i.data), t === Gf && Vf ? null : t);
      default:
        return null;
    }
  }
  function o_(t, i) {
    if (es)
      return t === "compositionend" || (!Jl && Wf(t, i))
        ? ((t = Ff()), (ra = ql = $i = null), (es = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(i.ctrlKey || i.altKey || i.metaKey) || (i.ctrlKey && i.altKey)) {
          if (i.char && 1 < i.char.length) return i.char;
          if (i.which) return String.fromCharCode(i.which);
        }
        return null;
      case "compositionend":
        return Hf && i.locale !== "ko" ? null : i.data;
      default:
        return null;
    }
  }
  var a_ = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function jf(t) {
    var i = t && t.nodeName && t.nodeName.toLowerCase();
    return i === "input" ? !!a_[t.type] : i === "textarea";
  }
  function qf(t, i, o, c) {
    (Je(c),
      (i = da(i, "onChange")),
      0 < i.length &&
        ((o = new Yl("onChange", "change", null, o, c)), t.push({ event: o, listeners: i })));
  }
  var ao = null,
    lo = null;
  function l_(t) {
    fd(t, 0);
  }
  function la(t) {
    var i = ss(t);
    if (B(i)) return t;
  }
  function c_(t, i) {
    if (t === "change") return i;
  }
  var Yf = !1;
  if (u) {
    var ec;
    if (u) {
      var tc = "oninput" in document;
      if (!tc) {
        var $f = document.createElement("div");
        ($f.setAttribute("oninput", "return;"), (tc = typeof $f.oninput == "function"));
      }
      ec = tc;
    } else ec = !1;
    Yf = ec && (!document.documentMode || 9 < document.documentMode);
  }
  function Kf() {
    ao && (ao.detachEvent("onpropertychange", Zf), (lo = ao = null));
  }
  function Zf(t) {
    if (t.propertyName === "value" && la(lo)) {
      var i = [];
      (qf(i, lo, t, at(t)), en(l_, i));
    }
  }
  function u_(t, i, o) {
    t === "focusin"
      ? (Kf(), (ao = i), (lo = o), ao.attachEvent("onpropertychange", Zf))
      : t === "focusout" && Kf();
  }
  function f_(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown") return la(lo);
  }
  function d_(t, i) {
    if (t === "click") return la(i);
  }
  function h_(t, i) {
    if (t === "input" || t === "change") return la(i);
  }
  function p_(t, i) {
    return (t === i && (t !== 0 || 1 / t === 1 / i)) || (t !== t && i !== i);
  }
  var ni = typeof Object.is == "function" ? Object.is : p_;
  function co(t, i) {
    if (ni(t, i)) return !0;
    if (typeof t != "object" || t === null || typeof i != "object" || i === null) return !1;
    var o = Object.keys(t),
      c = Object.keys(i);
    if (o.length !== c.length) return !1;
    for (c = 0; c < o.length; c++) {
      var d = o[c];
      if (!h.call(i, d) || !ni(t[d], i[d])) return !1;
    }
    return !0;
  }
  function Qf(t) {
    for (; t && t.firstChild;) t = t.firstChild;
    return t;
  }
  function Jf(t, i) {
    var o = Qf(t);
    t = 0;
    for (var c; o;) {
      if (o.nodeType === 3) {
        if (((c = t + o.textContent.length), t <= i && c >= i)) return { node: o, offset: i - t };
        t = c;
      }
      e: {
        for (; o;) {
          if (o.nextSibling) {
            o = o.nextSibling;
            break e;
          }
          o = o.parentNode;
        }
        o = void 0;
      }
      o = Qf(o);
    }
  }
  function ed(t, i) {
    return t && i
      ? t === i
        ? !0
        : t && t.nodeType === 3
          ? !1
          : i && i.nodeType === 3
            ? ed(t, i.parentNode)
            : "contains" in t
              ? t.contains(i)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(i) & 16)
                : !1
      : !1;
  }
  function td() {
    for (var t = window, i = ze(); i instanceof t.HTMLIFrameElement;) {
      try {
        var o = typeof i.contentWindow.location.href == "string";
      } catch {
        o = !1;
      }
      if (o) t = i.contentWindow;
      else break;
      i = ze(t.document);
    }
    return i;
  }
  function nc(t) {
    var i = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      i &&
      ((i === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        i === "textarea" ||
        t.contentEditable === "true")
    );
  }
  function m_(t) {
    var i = td(),
      o = t.focusedElem,
      c = t.selectionRange;
    if (i !== o && o && o.ownerDocument && ed(o.ownerDocument.documentElement, o)) {
      if (c !== null && nc(o)) {
        if (((i = c.start), (t = c.end), t === void 0 && (t = i), "selectionStart" in o))
          ((o.selectionStart = i), (o.selectionEnd = Math.min(t, o.value.length)));
        else if (
          ((t = ((i = o.ownerDocument || document) && i.defaultView) || window), t.getSelection)
        ) {
          t = t.getSelection();
          var d = o.textContent.length,
            p = Math.min(c.start, d);
          ((c = c.end === void 0 ? p : Math.min(c.end, d)),
            !t.extend && p > c && ((d = c), (c = p), (p = d)),
            (d = Jf(o, p)));
          var M = Jf(o, c);
          d &&
            M &&
            (t.rangeCount !== 1 ||
              t.anchorNode !== d.node ||
              t.anchorOffset !== d.offset ||
              t.focusNode !== M.node ||
              t.focusOffset !== M.offset) &&
            ((i = i.createRange()),
            i.setStart(d.node, d.offset),
            t.removeAllRanges(),
            p > c
              ? (t.addRange(i), t.extend(M.node, M.offset))
              : (i.setEnd(M.node, M.offset), t.addRange(i)));
        }
      }
      for (i = [], t = o; (t = t.parentNode);)
        t.nodeType === 1 && i.push({ element: t, left: t.scrollLeft, top: t.scrollTop });
      for (typeof o.focus == "function" && o.focus(), o = 0; o < i.length; o++)
        ((t = i[o]), (t.element.scrollLeft = t.left), (t.element.scrollTop = t.top));
    }
  }
  var g_ = u && "documentMode" in document && 11 >= document.documentMode,
    ts = null,
    ic = null,
    uo = null,
    rc = !1;
  function nd(t, i, o) {
    var c = o.window === o ? o.document : o.nodeType === 9 ? o : o.ownerDocument;
    rc ||
      ts == null ||
      ts !== ze(c) ||
      ((c = ts),
      "selectionStart" in c && nc(c)
        ? (c = { start: c.selectionStart, end: c.selectionEnd })
        : ((c = ((c.ownerDocument && c.ownerDocument.defaultView) || window).getSelection()),
          (c = {
            anchorNode: c.anchorNode,
            anchorOffset: c.anchorOffset,
            focusNode: c.focusNode,
            focusOffset: c.focusOffset,
          })),
      (uo && co(uo, c)) ||
        ((uo = c),
        (c = da(ic, "onSelect")),
        0 < c.length &&
          ((i = new Yl("onSelect", "select", null, i, o)),
          t.push({ event: i, listeners: c }),
          (i.target = ts))));
  }
  function ca(t, i) {
    var o = {};
    return (
      (o[t.toLowerCase()] = i.toLowerCase()),
      (o["Webkit" + t] = "webkit" + i),
      (o["Moz" + t] = "moz" + i),
      o
    );
  }
  var ns = {
      animationend: ca("Animation", "AnimationEnd"),
      animationiteration: ca("Animation", "AnimationIteration"),
      animationstart: ca("Animation", "AnimationStart"),
      transitionend: ca("Transition", "TransitionEnd"),
    },
    sc = {},
    id = {};
  u &&
    ((id = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete ns.animationend.animation,
      delete ns.animationiteration.animation,
      delete ns.animationstart.animation),
    "TransitionEvent" in window || delete ns.transitionend.transition);
  function ua(t) {
    if (sc[t]) return sc[t];
    if (!ns[t]) return t;
    var i = ns[t],
      o;
    for (o in i) if (i.hasOwnProperty(o) && o in id) return (sc[t] = i[o]);
    return t;
  }
  var rd = ua("animationend"),
    sd = ua("animationiteration"),
    od = ua("animationstart"),
    ad = ua("transitionend"),
    ld = new Map(),
    cd =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  function Ki(t, i) {
    (ld.set(t, i), l(i, [t]));
  }
  for (var oc = 0; oc < cd.length; oc++) {
    var ac = cd[oc],
      __ = ac.toLowerCase(),
      v_ = ac[0].toUpperCase() + ac.slice(1);
    Ki(__, "on" + v_);
  }
  (Ki(rd, "onAnimationEnd"),
    Ki(sd, "onAnimationIteration"),
    Ki(od, "onAnimationStart"),
    Ki("dblclick", "onDoubleClick"),
    Ki("focusin", "onFocus"),
    Ki("focusout", "onBlur"),
    Ki(ad, "onTransitionEnd"),
    f("onMouseEnter", ["mouseout", "mouseover"]),
    f("onMouseLeave", ["mouseout", "mouseover"]),
    f("onPointerEnter", ["pointerout", "pointerover"]),
    f("onPointerLeave", ["pointerout", "pointerover"]),
    l("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
    l(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    l("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    l("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
    l(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    l(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var fo =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    x_ = new Set("cancel close invalid load scroll toggle".split(" ").concat(fo));
  function ud(t, i, o) {
    var c = t.type || "unknown-event";
    ((t.currentTarget = o), Hl(c, i, void 0, t), (t.currentTarget = null));
  }
  function fd(t, i) {
    i = (i & 4) !== 0;
    for (var o = 0; o < t.length; o++) {
      var c = t[o],
        d = c.event;
      c = c.listeners;
      e: {
        var p = void 0;
        if (i)
          for (var M = c.length - 1; 0 <= M; M--) {
            var U = c[M],
              O = U.instance,
              re = U.currentTarget;
            if (((U = U.listener), O !== p && d.isPropagationStopped())) break e;
            (ud(d, U, re), (p = O));
          }
        else
          for (M = 0; M < c.length; M++) {
            if (
              ((U = c[M]),
              (O = U.instance),
              (re = U.currentTarget),
              (U = U.listener),
              O !== p && d.isPropagationStopped())
            )
              break e;
            (ud(d, U, re), (p = O));
          }
      }
    }
    if (Tr) throw ((t = Vi), (Tr = !1), (Vi = null), t);
  }
  function Dt(t, i) {
    var o = i[mc];
    o === void 0 && (o = i[mc] = new Set());
    var c = t + "__bubble";
    o.has(c) || (dd(i, t, 2, !1), o.add(c));
  }
  function lc(t, i, o) {
    var c = 0;
    (i && (c |= 4), dd(o, t, c, i));
  }
  var fa = "_reactListening" + Math.random().toString(36).slice(2);
  function ho(t) {
    if (!t[fa]) {
      ((t[fa] = !0),
        s.forEach(function (o) {
          o !== "selectionchange" && (x_.has(o) || lc(o, !1, t), lc(o, !0, t));
        }));
      var i = t.nodeType === 9 ? t : t.ownerDocument;
      i === null || i[fa] || ((i[fa] = !0), lc("selectionchange", !1, i));
    }
  }
  function dd(t, i, o, c) {
    switch (If(i)) {
      case 1:
        var d = Ng;
        break;
      case 4:
        d = Ug;
        break;
      default:
        d = Xl;
    }
    ((o = d.bind(null, i, o, t)),
      (d = void 0),
      !qt || (i !== "touchstart" && i !== "touchmove" && i !== "wheel") || (d = !0),
      c
        ? d !== void 0
          ? t.addEventListener(i, o, { capture: !0, passive: d })
          : t.addEventListener(i, o, !0)
        : d !== void 0
          ? t.addEventListener(i, o, { passive: d })
          : t.addEventListener(i, o, !1));
  }
  function cc(t, i, o, c, d) {
    var p = c;
    if ((i & 1) === 0 && (i & 2) === 0 && c !== null)
      e: for (;;) {
        if (c === null) return;
        var M = c.tag;
        if (M === 3 || M === 4) {
          var U = c.stateNode.containerInfo;
          if (U === d || (U.nodeType === 8 && U.parentNode === d)) break;
          if (M === 4)
            for (M = c.return; M !== null;) {
              var O = M.tag;
              if (
                (O === 3 || O === 4) &&
                ((O = M.stateNode.containerInfo),
                O === d || (O.nodeType === 8 && O.parentNode === d))
              )
                return;
              M = M.return;
            }
          for (; U !== null;) {
            if (((M = Ar(U)), M === null)) return;
            if (((O = M.tag), O === 5 || O === 6)) {
              c = p = M;
              continue e;
            }
            U = U.parentNode;
          }
        }
        c = c.return;
      }
    en(function () {
      var re = p,
        _e = at(o),
        ye = [];
      e: {
        var ge = ld.get(t);
        if (ge !== void 0) {
          var Ne = Yl,
            Be = t;
          switch (t) {
            case "keypress":
              if (sa(o) === 0) break e;
            case "keydown":
            case "keyup":
              Ne = $g;
              break;
            case "focusin":
              ((Be = "focus"), (Ne = Zl));
              break;
            case "focusout":
              ((Be = "blur"), (Ne = Zl));
              break;
            case "beforeblur":
            case "afterblur":
              Ne = Zl;
              break;
            case "click":
              if (o.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              Ne = kf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Ne = Og;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Ne = Qg;
              break;
            case rd:
            case sd:
            case od:
              Ne = Bg;
              break;
            case ad:
              Ne = e_;
              break;
            case "scroll":
              Ne = Ig;
              break;
            case "wheel":
              Ne = n_;
              break;
            case "copy":
            case "cut":
            case "paste":
              Ne = Gg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Ne = Bf;
          }
          var Ge = (i & 4) !== 0,
            Wt = !Ge && t === "scroll",
            Y = Ge ? (ge !== null ? ge + "Capture" : null) : ge;
          Ge = [];
          for (var G = re, Q; G !== null;) {
            Q = G;
            var we = Q.stateNode;
            if (
              (Q.tag === 5 &&
                we !== null &&
                ((Q = we), Y !== null && ((we = yt(G, Y)), we != null && Ge.push(po(G, we, Q)))),
              Wt)
            )
              break;
            G = G.return;
          }
          0 < Ge.length &&
            ((ge = new Ne(ge, Be, null, o, _e)), ye.push({ event: ge, listeners: Ge }));
        }
      }
      if ((i & 7) === 0) {
        e: {
          if (
            ((ge = t === "mouseover" || t === "pointerover"),
            (Ne = t === "mouseout" || t === "pointerout"),
            ge && o !== bt && (Be = o.relatedTarget || o.fromElement) && (Ar(Be) || Be[Ti]))
          )
            break e;
          if (
            (Ne || ge) &&
            ((ge =
              _e.window === _e
                ? _e
                : (ge = _e.ownerDocument)
                  ? ge.defaultView || ge.parentWindow
                  : window),
            Ne
              ? ((Be = o.relatedTarget || o.toElement),
                (Ne = re),
                (Be = Be ? Ar(Be) : null),
                Be !== null &&
                  ((Wt = Mi(Be)), Be !== Wt || (Be.tag !== 5 && Be.tag !== 6)) &&
                  (Be = null))
              : ((Ne = null), (Be = re)),
            Ne !== Be)
          ) {
            if (
              ((Ge = kf),
              (we = "onMouseLeave"),
              (Y = "onMouseEnter"),
              (G = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((Ge = Bf), (we = "onPointerLeave"), (Y = "onPointerEnter"), (G = "pointer")),
              (Wt = Ne == null ? ge : ss(Ne)),
              (Q = Be == null ? ge : ss(Be)),
              (ge = new Ge(we, G + "leave", Ne, o, _e)),
              (ge.target = Wt),
              (ge.relatedTarget = Q),
              (we = null),
              Ar(_e) === re &&
                ((Ge = new Ge(Y, G + "enter", Be, o, _e)),
                (Ge.target = Q),
                (Ge.relatedTarget = Wt),
                (we = Ge)),
              (Wt = we),
              Ne && Be)
            )
              t: {
                for (Ge = Ne, Y = Be, G = 0, Q = Ge; Q; Q = is(Q)) G++;
                for (Q = 0, we = Y; we; we = is(we)) Q++;
                for (; 0 < G - Q;) ((Ge = is(Ge)), G--);
                for (; 0 < Q - G;) ((Y = is(Y)), Q--);
                for (; G--;) {
                  if (Ge === Y || (Y !== null && Ge === Y.alternate)) break t;
                  ((Ge = is(Ge)), (Y = is(Y)));
                }
                Ge = null;
              }
            else Ge = null;
            (Ne !== null && hd(ye, ge, Ne, Ge, !1),
              Be !== null && Wt !== null && hd(ye, Wt, Be, Ge, !0));
          }
        }
        e: {
          if (
            ((ge = re ? ss(re) : window),
            (Ne = ge.nodeName && ge.nodeName.toLowerCase()),
            Ne === "select" || (Ne === "input" && ge.type === "file"))
          )
            var Ve = c_;
          else if (jf(ge))
            if (Yf) Ve = h_;
            else {
              Ve = f_;
              var Ke = u_;
            }
          else
            (Ne = ge.nodeName) &&
              Ne.toLowerCase() === "input" &&
              (ge.type === "checkbox" || ge.type === "radio") &&
              (Ve = d_);
          if (Ve && (Ve = Ve(t, re))) {
            qf(ye, Ve, o, _e);
            break e;
          }
          (Ke && Ke(t, ge, re),
            t === "focusout" &&
              (Ke = ge._wrapperState) &&
              Ke.controlled &&
              ge.type === "number" &&
              P(ge, "number", ge.value));
        }
        switch (((Ke = re ? ss(re) : window), t)) {
          case "focusin":
            (jf(Ke) || Ke.contentEditable === "true") && ((ts = Ke), (ic = re), (uo = null));
            break;
          case "focusout":
            uo = ic = ts = null;
            break;
          case "mousedown":
            rc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((rc = !1), nd(ye, o, _e));
            break;
          case "selectionchange":
            if (g_) break;
          case "keydown":
          case "keyup":
            nd(ye, o, _e);
        }
        var Ze;
        if (Jl)
          e: {
            switch (t) {
              case "compositionstart":
                var et = "onCompositionStart";
                break e;
              case "compositionend":
                et = "onCompositionEnd";
                break e;
              case "compositionupdate":
                et = "onCompositionUpdate";
                break e;
            }
            et = void 0;
          }
        else
          es
            ? Wf(t, o) && (et = "onCompositionEnd")
            : t === "keydown" && o.keyCode === 229 && (et = "onCompositionStart");
        (et &&
          (Hf &&
            o.locale !== "ko" &&
            (es || et !== "onCompositionStart"
              ? et === "onCompositionEnd" && es && (Ze = Ff())
              : (($i = _e), (ql = "value" in $i ? $i.value : $i.textContent), (es = !0))),
          (Ke = da(re, et)),
          0 < Ke.length &&
            ((et = new zf(et, t, null, o, _e)),
            ye.push({ event: et, listeners: Ke }),
            Ze ? (et.data = Ze) : ((Ze = Xf(o)), Ze !== null && (et.data = Ze)))),
          (Ze = r_ ? s_(t, o) : o_(t, o)) &&
            ((re = da(re, "onBeforeInput")),
            0 < re.length &&
              ((_e = new zf("onBeforeInput", "beforeinput", null, o, _e)),
              ye.push({ event: _e, listeners: re }),
              (_e.data = Ze))));
      }
      fd(ye, i);
    });
  }
  function po(t, i, o) {
    return { instance: t, listener: i, currentTarget: o };
  }
  function da(t, i) {
    for (var o = i + "Capture", c = []; t !== null;) {
      var d = t,
        p = d.stateNode;
      (d.tag === 5 &&
        p !== null &&
        ((d = p),
        (p = yt(t, o)),
        p != null && c.unshift(po(t, p, d)),
        (p = yt(t, i)),
        p != null && c.push(po(t, p, d))),
        (t = t.return));
    }
    return c;
  }
  function is(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5);
    return t || null;
  }
  function hd(t, i, o, c, d) {
    for (var p = i._reactName, M = []; o !== null && o !== c;) {
      var U = o,
        O = U.alternate,
        re = U.stateNode;
      if (O !== null && O === c) break;
      (U.tag === 5 &&
        re !== null &&
        ((U = re),
        d
          ? ((O = yt(o, p)), O != null && M.unshift(po(o, O, U)))
          : d || ((O = yt(o, p)), O != null && M.push(po(o, O, U)))),
        (o = o.return));
    }
    M.length !== 0 && t.push({ event: i, listeners: M });
  }
  var y_ = /\r\n?/g,
    S_ = /\u0000|\uFFFD/g;
  function pd(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        y_,
        `
`,
      )
      .replace(S_, "");
  }
  function ha(t, i, o) {
    if (((i = pd(i)), pd(t) !== i && o)) throw Error(n(425));
  }
  function pa() {}
  var uc = null,
    fc = null;
  function dc(t, i) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof i.children == "string" ||
      typeof i.children == "number" ||
      (typeof i.dangerouslySetInnerHTML == "object" &&
        i.dangerouslySetInnerHTML !== null &&
        i.dangerouslySetInnerHTML.__html != null)
    );
  }
  var hc = typeof setTimeout == "function" ? setTimeout : void 0,
    M_ = typeof clearTimeout == "function" ? clearTimeout : void 0,
    md = typeof Promise == "function" ? Promise : void 0,
    E_ =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof md < "u"
          ? function (t) {
              return md.resolve(null).then(t).catch(T_);
            }
          : hc;
  function T_(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function pc(t, i) {
    var o = i,
      c = 0;
    do {
      var d = o.nextSibling;
      if ((t.removeChild(o), d && d.nodeType === 8))
        if (((o = d.data), o === "/$")) {
          if (c === 0) {
            (t.removeChild(d), io(i));
            return;
          }
          c--;
        } else (o !== "$" && o !== "$?" && o !== "$!") || c++;
      o = d;
    } while (o);
    io(i);
  }
  function Zi(t) {
    for (; t != null; t = t.nextSibling) {
      var i = t.nodeType;
      if (i === 1 || i === 3) break;
      if (i === 8) {
        if (((i = t.data), i === "$" || i === "$!" || i === "$?")) break;
        if (i === "/$") return null;
      }
    }
    return t;
  }
  function gd(t) {
    t = t.previousSibling;
    for (var i = 0; t;) {
      if (t.nodeType === 8) {
        var o = t.data;
        if (o === "$" || o === "$!" || o === "$?") {
          if (i === 0) return t;
          i--;
        } else o === "/$" && i++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  var rs = Math.random().toString(36).slice(2),
    gi = "__reactFiber$" + rs,
    mo = "__reactProps$" + rs,
    Ti = "__reactContainer$" + rs,
    mc = "__reactEvents$" + rs,
    w_ = "__reactListeners$" + rs,
    A_ = "__reactHandles$" + rs;
  function Ar(t) {
    var i = t[gi];
    if (i) return i;
    for (var o = t.parentNode; o;) {
      if ((i = o[Ti] || o[gi])) {
        if (((o = i.alternate), i.child !== null || (o !== null && o.child !== null)))
          for (t = gd(t); t !== null;) {
            if ((o = t[gi])) return o;
            t = gd(t);
          }
        return i;
      }
      ((t = o), (o = t.parentNode));
    }
    return null;
  }
  function go(t) {
    return (
      (t = t[gi] || t[Ti]),
      !t || (t.tag !== 5 && t.tag !== 6 && t.tag !== 13 && t.tag !== 3) ? null : t
    );
  }
  function ss(t) {
    if (t.tag === 5 || t.tag === 6) return t.stateNode;
    throw Error(n(33));
  }
  function ma(t) {
    return t[mo] || null;
  }
  var gc = [],
    os = -1;
  function Qi(t) {
    return { current: t };
  }
  function Nt(t) {
    0 > os || ((t.current = gc[os]), (gc[os] = null), os--);
  }
  function Lt(t, i) {
    (os++, (gc[os] = t.current), (t.current = i));
  }
  var Ji = {},
    fn = Qi(Ji),
    Cn = Qi(!1),
    Rr = Ji;
  function as(t, i) {
    var o = t.type.contextTypes;
    if (!o) return Ji;
    var c = t.stateNode;
    if (c && c.__reactInternalMemoizedUnmaskedChildContext === i)
      return c.__reactInternalMemoizedMaskedChildContext;
    var d = {},
      p;
    for (p in o) d[p] = i[p];
    return (
      c &&
        ((t = t.stateNode),
        (t.__reactInternalMemoizedUnmaskedChildContext = i),
        (t.__reactInternalMemoizedMaskedChildContext = d)),
      d
    );
  }
  function bn(t) {
    return ((t = t.childContextTypes), t != null);
  }
  function ga() {
    (Nt(Cn), Nt(fn));
  }
  function _d(t, i, o) {
    if (fn.current !== Ji) throw Error(n(168));
    (Lt(fn, i), Lt(Cn, o));
  }
  function vd(t, i, o) {
    var c = t.stateNode;
    if (((i = i.childContextTypes), typeof c.getChildContext != "function")) return o;
    c = c.getChildContext();
    for (var d in c) if (!(d in i)) throw Error(n(108, Me(t) || "Unknown", d));
    return j({}, o, c);
  }
  function _a(t) {
    return (
      (t = ((t = t.stateNode) && t.__reactInternalMemoizedMergedChildContext) || Ji),
      (Rr = fn.current),
      Lt(fn, t),
      Lt(Cn, Cn.current),
      !0
    );
  }
  function xd(t, i, o) {
    var c = t.stateNode;
    if (!c) throw Error(n(169));
    (o
      ? ((t = vd(t, i, Rr)),
        (c.__reactInternalMemoizedMergedChildContext = t),
        Nt(Cn),
        Nt(fn),
        Lt(fn, t))
      : Nt(Cn),
      Lt(Cn, o));
  }
  var wi = null,
    va = !1,
    _c = !1;
  function yd(t) {
    wi === null ? (wi = [t]) : wi.push(t);
  }
  function R_(t) {
    ((va = !0), yd(t));
  }
  function er() {
    if (!_c && wi !== null) {
      _c = !0;
      var t = 0,
        i = wt;
      try {
        var o = wi;
        for (wt = 1; t < o.length; t++) {
          var c = o[t];
          do c = c(!0);
          while (c !== null);
        }
        ((wi = null), (va = !1));
      } catch (d) {
        throw (wi !== null && (wi = wi.slice(t + 1)), se(nt, er), d);
      } finally {
        ((wt = i), (_c = !1));
      }
    }
    return null;
  }
  var ls = [],
    cs = 0,
    xa = null,
    ya = 0,
    Wn = [],
    Xn = 0,
    Cr = null,
    Ai = 1,
    Ri = "";
  function br(t, i) {
    ((ls[cs++] = ya), (ls[cs++] = xa), (xa = t), (ya = i));
  }
  function Sd(t, i, o) {
    ((Wn[Xn++] = Ai), (Wn[Xn++] = Ri), (Wn[Xn++] = Cr), (Cr = t));
    var c = Ai;
    t = Ri;
    var d = 32 - vn(c) - 1;
    ((c &= ~(1 << d)), (o += 1));
    var p = 32 - vn(i) + d;
    if (30 < p) {
      var M = d - (d % 5);
      ((p = (c & ((1 << M) - 1)).toString(32)),
        (c >>= M),
        (d -= M),
        (Ai = (1 << (32 - vn(i) + d)) | (o << d) | c),
        (Ri = p + t));
    } else ((Ai = (1 << p) | (o << d) | c), (Ri = t));
  }
  function vc(t) {
    t.return !== null && (br(t, 1), Sd(t, 1, 0));
  }
  function xc(t) {
    for (; t === xa;) ((xa = ls[--cs]), (ls[cs] = null), (ya = ls[--cs]), (ls[cs] = null));
    for (; t === Cr;)
      ((Cr = Wn[--Xn]),
        (Wn[Xn] = null),
        (Ri = Wn[--Xn]),
        (Wn[Xn] = null),
        (Ai = Wn[--Xn]),
        (Wn[Xn] = null));
  }
  var Fn = null,
    On = null,
    Ot = !1,
    ii = null;
  function Md(t, i) {
    var o = $n(5, null, null, 0);
    ((o.elementType = "DELETED"),
      (o.stateNode = i),
      (o.return = t),
      (i = t.deletions),
      i === null ? ((t.deletions = [o]), (t.flags |= 16)) : i.push(o));
  }
  function Ed(t, i) {
    switch (t.tag) {
      case 5:
        var o = t.type;
        return (
          (i = i.nodeType !== 1 || o.toLowerCase() !== i.nodeName.toLowerCase() ? null : i),
          i !== null ? ((t.stateNode = i), (Fn = t), (On = Zi(i.firstChild)), !0) : !1
        );
      case 6:
        return (
          (i = t.pendingProps === "" || i.nodeType !== 3 ? null : i),
          i !== null ? ((t.stateNode = i), (Fn = t), (On = null), !0) : !1
        );
      case 13:
        return (
          (i = i.nodeType !== 8 ? null : i),
          i !== null
            ? ((o = Cr !== null ? { id: Ai, overflow: Ri } : null),
              (t.memoizedState = { dehydrated: i, treeContext: o, retryLane: 1073741824 }),
              (o = $n(18, null, null, 0)),
              (o.stateNode = i),
              (o.return = t),
              (t.child = o),
              (Fn = t),
              (On = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function yc(t) {
    return (t.mode & 1) !== 0 && (t.flags & 128) === 0;
  }
  function Sc(t) {
    if (Ot) {
      var i = On;
      if (i) {
        var o = i;
        if (!Ed(t, i)) {
          if (yc(t)) throw Error(n(418));
          i = Zi(o.nextSibling);
          var c = Fn;
          i && Ed(t, i) ? Md(c, o) : ((t.flags = (t.flags & -4097) | 2), (Ot = !1), (Fn = t));
        }
      } else {
        if (yc(t)) throw Error(n(418));
        ((t.flags = (t.flags & -4097) | 2), (Ot = !1), (Fn = t));
      }
    }
  }
  function Td(t) {
    for (t = t.return; t !== null && t.tag !== 5 && t.tag !== 3 && t.tag !== 13;) t = t.return;
    Fn = t;
  }
  function Sa(t) {
    if (t !== Fn) return !1;
    if (!Ot) return (Td(t), (Ot = !0), !1);
    var i;
    if (
      ((i = t.tag !== 3) &&
        !(i = t.tag !== 5) &&
        ((i = t.type), (i = i !== "head" && i !== "body" && !dc(t.type, t.memoizedProps))),
      i && (i = On))
    ) {
      if (yc(t)) throw (wd(), Error(n(418)));
      for (; i;) (Md(t, i), (i = Zi(i.nextSibling)));
    }
    if ((Td(t), t.tag === 13)) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(n(317));
      e: {
        for (t = t.nextSibling, i = 0; t;) {
          if (t.nodeType === 8) {
            var o = t.data;
            if (o === "/$") {
              if (i === 0) {
                On = Zi(t.nextSibling);
                break e;
              }
              i--;
            } else (o !== "$" && o !== "$!" && o !== "$?") || i++;
          }
          t = t.nextSibling;
        }
        On = null;
      }
    } else On = Fn ? Zi(t.stateNode.nextSibling) : null;
    return !0;
  }
  function wd() {
    for (var t = On; t;) t = Zi(t.nextSibling);
  }
  function us() {
    ((On = Fn = null), (Ot = !1));
  }
  function Mc(t) {
    ii === null ? (ii = [t]) : ii.push(t);
  }
  var C_ = N.ReactCurrentBatchConfig;
  function _o(t, i, o) {
    if (((t = o.ref), t !== null && typeof t != "function" && typeof t != "object")) {
      if (o._owner) {
        if (((o = o._owner), o)) {
          if (o.tag !== 1) throw Error(n(309));
          var c = o.stateNode;
        }
        if (!c) throw Error(n(147, t));
        var d = c,
          p = "" + t;
        return i !== null && i.ref !== null && typeof i.ref == "function" && i.ref._stringRef === p
          ? i.ref
          : ((i = function (M) {
              var U = d.refs;
              M === null ? delete U[p] : (U[p] = M);
            }),
            (i._stringRef = p),
            i);
      }
      if (typeof t != "string") throw Error(n(284));
      if (!o._owner) throw Error(n(290, t));
    }
    return t;
  }
  function Ma(t, i) {
    throw (
      (t = Object.prototype.toString.call(i)),
      Error(
        n(31, t === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : t),
      )
    );
  }
  function Ad(t) {
    var i = t._init;
    return i(t._payload);
  }
  function Rd(t) {
    function i(Y, G) {
      if (t) {
        var Q = Y.deletions;
        Q === null ? ((Y.deletions = [G]), (Y.flags |= 16)) : Q.push(G);
      }
    }
    function o(Y, G) {
      if (!t) return null;
      for (; G !== null;) (i(Y, G), (G = G.sibling));
      return null;
    }
    function c(Y, G) {
      for (Y = new Map(); G !== null;)
        (G.key !== null ? Y.set(G.key, G) : Y.set(G.index, G), (G = G.sibling));
      return Y;
    }
    function d(Y, G) {
      return ((Y = lr(Y, G)), (Y.index = 0), (Y.sibling = null), Y);
    }
    function p(Y, G, Q) {
      return (
        (Y.index = Q),
        t
          ? ((Q = Y.alternate),
            Q !== null ? ((Q = Q.index), Q < G ? ((Y.flags |= 2), G) : Q) : ((Y.flags |= 2), G))
          : ((Y.flags |= 1048576), G)
      );
    }
    function M(Y) {
      return (t && Y.alternate === null && (Y.flags |= 2), Y);
    }
    function U(Y, G, Q, we) {
      return G === null || G.tag !== 6
        ? ((G = hu(Q, Y.mode, we)), (G.return = Y), G)
        : ((G = d(G, Q)), (G.return = Y), G);
    }
    function O(Y, G, Q, we) {
      var Ve = Q.type;
      return Ve === F
        ? _e(Y, G, Q.props.children, we, Q.key)
        : G !== null &&
            (G.elementType === Ve ||
              (typeof Ve == "object" && Ve !== null && Ve.$$typeof === ie && Ad(Ve) === G.type))
          ? ((we = d(G, Q.props)), (we.ref = _o(Y, G, Q)), (we.return = Y), we)
          : ((we = ja(Q.type, Q.key, Q.props, null, Y.mode, we)),
            (we.ref = _o(Y, G, Q)),
            (we.return = Y),
            we);
    }
    function re(Y, G, Q, we) {
      return G === null ||
        G.tag !== 4 ||
        G.stateNode.containerInfo !== Q.containerInfo ||
        G.stateNode.implementation !== Q.implementation
        ? ((G = pu(Q, Y.mode, we)), (G.return = Y), G)
        : ((G = d(G, Q.children || [])), (G.return = Y), G);
    }
    function _e(Y, G, Q, we, Ve) {
      return G === null || G.tag !== 7
        ? ((G = Or(Q, Y.mode, we, Ve)), (G.return = Y), G)
        : ((G = d(G, Q)), (G.return = Y), G);
    }
    function ye(Y, G, Q) {
      if ((typeof G == "string" && G !== "") || typeof G == "number")
        return ((G = hu("" + G, Y.mode, Q)), (G.return = Y), G);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case z:
            return (
              (Q = ja(G.type, G.key, G.props, null, Y.mode, Q)),
              (Q.ref = _o(Y, null, G)),
              (Q.return = Y),
              Q
            );
          case I:
            return ((G = pu(G, Y.mode, Q)), (G.return = Y), G);
          case ie:
            var we = G._init;
            return ye(Y, we(G._payload), Q);
        }
        if (w(G) || K(G)) return ((G = Or(G, Y.mode, Q, null)), (G.return = Y), G);
        Ma(Y, G);
      }
      return null;
    }
    function ge(Y, G, Q, we) {
      var Ve = G !== null ? G.key : null;
      if ((typeof Q == "string" && Q !== "") || typeof Q == "number")
        return Ve !== null ? null : U(Y, G, "" + Q, we);
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case z:
            return Q.key === Ve ? O(Y, G, Q, we) : null;
          case I:
            return Q.key === Ve ? re(Y, G, Q, we) : null;
          case ie:
            return ((Ve = Q._init), ge(Y, G, Ve(Q._payload), we));
        }
        if (w(Q) || K(Q)) return Ve !== null ? null : _e(Y, G, Q, we, null);
        Ma(Y, Q);
      }
      return null;
    }
    function Ne(Y, G, Q, we, Ve) {
      if ((typeof we == "string" && we !== "") || typeof we == "number")
        return ((Y = Y.get(Q) || null), U(G, Y, "" + we, Ve));
      if (typeof we == "object" && we !== null) {
        switch (we.$$typeof) {
          case z:
            return ((Y = Y.get(we.key === null ? Q : we.key) || null), O(G, Y, we, Ve));
          case I:
            return ((Y = Y.get(we.key === null ? Q : we.key) || null), re(G, Y, we, Ve));
          case ie:
            var Ke = we._init;
            return Ne(Y, G, Q, Ke(we._payload), Ve);
        }
        if (w(we) || K(we)) return ((Y = Y.get(Q) || null), _e(G, Y, we, Ve, null));
        Ma(G, we);
      }
      return null;
    }
    function Be(Y, G, Q, we) {
      for (
        var Ve = null, Ke = null, Ze = G, et = (G = 0), rn = null;
        Ze !== null && et < Q.length;
        et++
      ) {
        Ze.index > et ? ((rn = Ze), (Ze = null)) : (rn = Ze.sibling);
        var St = ge(Y, Ze, Q[et], we);
        if (St === null) {
          Ze === null && (Ze = rn);
          break;
        }
        (t && Ze && St.alternate === null && i(Y, Ze),
          (G = p(St, G, et)),
          Ke === null ? (Ve = St) : (Ke.sibling = St),
          (Ke = St),
          (Ze = rn));
      }
      if (et === Q.length) return (o(Y, Ze), Ot && br(Y, et), Ve);
      if (Ze === null) {
        for (; et < Q.length; et++)
          ((Ze = ye(Y, Q[et], we)),
            Ze !== null &&
              ((G = p(Ze, G, et)), Ke === null ? (Ve = Ze) : (Ke.sibling = Ze), (Ke = Ze)));
        return (Ot && br(Y, et), Ve);
      }
      for (Ze = c(Y, Ze); et < Q.length; et++)
        ((rn = Ne(Ze, Y, et, Q[et], we)),
          rn !== null &&
            (t && rn.alternate !== null && Ze.delete(rn.key === null ? et : rn.key),
            (G = p(rn, G, et)),
            Ke === null ? (Ve = rn) : (Ke.sibling = rn),
            (Ke = rn)));
      return (
        t &&
          Ze.forEach(function (cr) {
            return i(Y, cr);
          }),
        Ot && br(Y, et),
        Ve
      );
    }
    function Ge(Y, G, Q, we) {
      var Ve = K(Q);
      if (typeof Ve != "function") throw Error(n(150));
      if (((Q = Ve.call(Q)), Q == null)) throw Error(n(151));
      for (
        var Ke = (Ve = null), Ze = G, et = (G = 0), rn = null, St = Q.next();
        Ze !== null && !St.done;
        et++, St = Q.next()
      ) {
        Ze.index > et ? ((rn = Ze), (Ze = null)) : (rn = Ze.sibling);
        var cr = ge(Y, Ze, St.value, we);
        if (cr === null) {
          Ze === null && (Ze = rn);
          break;
        }
        (t && Ze && cr.alternate === null && i(Y, Ze),
          (G = p(cr, G, et)),
          Ke === null ? (Ve = cr) : (Ke.sibling = cr),
          (Ke = cr),
          (Ze = rn));
      }
      if (St.done) return (o(Y, Ze), Ot && br(Y, et), Ve);
      if (Ze === null) {
        for (; !St.done; et++, St = Q.next())
          ((St = ye(Y, St.value, we)),
            St !== null &&
              ((G = p(St, G, et)), Ke === null ? (Ve = St) : (Ke.sibling = St), (Ke = St)));
        return (Ot && br(Y, et), Ve);
      }
      for (Ze = c(Y, Ze); !St.done; et++, St = Q.next())
        ((St = Ne(Ze, Y, et, St.value, we)),
          St !== null &&
            (t && St.alternate !== null && Ze.delete(St.key === null ? et : St.key),
            (G = p(St, G, et)),
            Ke === null ? (Ve = St) : (Ke.sibling = St),
            (Ke = St)));
      return (
        t &&
          Ze.forEach(function (av) {
            return i(Y, av);
          }),
        Ot && br(Y, et),
        Ve
      );
    }
    function Wt(Y, G, Q, we) {
      if (
        (typeof Q == "object" &&
          Q !== null &&
          Q.type === F &&
          Q.key === null &&
          (Q = Q.props.children),
        typeof Q == "object" && Q !== null)
      ) {
        switch (Q.$$typeof) {
          case z:
            e: {
              for (var Ve = Q.key, Ke = G; Ke !== null;) {
                if (Ke.key === Ve) {
                  if (((Ve = Q.type), Ve === F)) {
                    if (Ke.tag === 7) {
                      (o(Y, Ke.sibling), (G = d(Ke, Q.props.children)), (G.return = Y), (Y = G));
                      break e;
                    }
                  } else if (
                    Ke.elementType === Ve ||
                    (typeof Ve == "object" &&
                      Ve !== null &&
                      Ve.$$typeof === ie &&
                      Ad(Ve) === Ke.type)
                  ) {
                    (o(Y, Ke.sibling),
                      (G = d(Ke, Q.props)),
                      (G.ref = _o(Y, Ke, Q)),
                      (G.return = Y),
                      (Y = G));
                    break e;
                  }
                  o(Y, Ke);
                  break;
                } else i(Y, Ke);
                Ke = Ke.sibling;
              }
              Q.type === F
                ? ((G = Or(Q.props.children, Y.mode, we, Q.key)), (G.return = Y), (Y = G))
                : ((we = ja(Q.type, Q.key, Q.props, null, Y.mode, we)),
                  (we.ref = _o(Y, G, Q)),
                  (we.return = Y),
                  (Y = we));
            }
            return M(Y);
          case I:
            e: {
              for (Ke = Q.key; G !== null;) {
                if (G.key === Ke)
                  if (
                    G.tag === 4 &&
                    G.stateNode.containerInfo === Q.containerInfo &&
                    G.stateNode.implementation === Q.implementation
                  ) {
                    (o(Y, G.sibling), (G = d(G, Q.children || [])), (G.return = Y), (Y = G));
                    break e;
                  } else {
                    o(Y, G);
                    break;
                  }
                else i(Y, G);
                G = G.sibling;
              }
              ((G = pu(Q, Y.mode, we)), (G.return = Y), (Y = G));
            }
            return M(Y);
          case ie:
            return ((Ke = Q._init), Wt(Y, G, Ke(Q._payload), we));
        }
        if (w(Q)) return Be(Y, G, Q, we);
        if (K(Q)) return Ge(Y, G, Q, we);
        Ma(Y, Q);
      }
      return (typeof Q == "string" && Q !== "") || typeof Q == "number"
        ? ((Q = "" + Q),
          G !== null && G.tag === 6
            ? (o(Y, G.sibling), (G = d(G, Q)), (G.return = Y), (Y = G))
            : (o(Y, G), (G = hu(Q, Y.mode, we)), (G.return = Y), (Y = G)),
          M(Y))
        : o(Y, G);
    }
    return Wt;
  }
  var fs = Rd(!0),
    Cd = Rd(!1),
    Ea = Qi(null),
    Ta = null,
    ds = null,
    Ec = null;
  function Tc() {
    Ec = ds = Ta = null;
  }
  function wc(t) {
    var i = Ea.current;
    (Nt(Ea), (t._currentValue = i));
  }
  function Ac(t, i, o) {
    for (; t !== null;) {
      var c = t.alternate;
      if (
        ((t.childLanes & i) !== i
          ? ((t.childLanes |= i), c !== null && (c.childLanes |= i))
          : c !== null && (c.childLanes & i) !== i && (c.childLanes |= i),
        t === o)
      )
        break;
      t = t.return;
    }
  }
  function hs(t, i) {
    ((Ta = t),
      (Ec = ds = null),
      (t = t.dependencies),
      t !== null &&
        t.firstContext !== null &&
        ((t.lanes & i) !== 0 && (Pn = !0), (t.firstContext = null)));
  }
  function jn(t) {
    var i = t._currentValue;
    if (Ec !== t)
      if (((t = { context: t, memoizedValue: i, next: null }), ds === null)) {
        if (Ta === null) throw Error(n(308));
        ((ds = t), (Ta.dependencies = { lanes: 0, firstContext: t }));
      } else ds = ds.next = t;
    return i;
  }
  var Pr = null;
  function Rc(t) {
    Pr === null ? (Pr = [t]) : Pr.push(t);
  }
  function bd(t, i, o, c) {
    var d = i.interleaved;
    return (
      d === null ? ((o.next = o), Rc(i)) : ((o.next = d.next), (d.next = o)),
      (i.interleaved = o),
      Ci(t, c)
    );
  }
  function Ci(t, i) {
    t.lanes |= i;
    var o = t.alternate;
    for (o !== null && (o.lanes |= i), o = t, t = t.return; t !== null;)
      ((t.childLanes |= i),
        (o = t.alternate),
        o !== null && (o.childLanes |= i),
        (o = t),
        (t = t.return));
    return o.tag === 3 ? o.stateNode : null;
  }
  var tr = !1;
  function Cc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function Pd(t, i) {
    ((t = t.updateQueue),
      i.updateQueue === t &&
        (i.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          effects: t.effects,
        }));
  }
  function bi(t, i) {
    return { eventTime: t, lane: i, tag: 0, payload: null, callback: null, next: null };
  }
  function nr(t, i, o) {
    var c = t.updateQueue;
    if (c === null) return null;
    if (((c = c.shared), (xt & 2) !== 0)) {
      var d = c.pending;
      return (
        d === null ? (i.next = i) : ((i.next = d.next), (d.next = i)), (c.pending = i), Ci(t, o)
      );
    }
    return (
      (d = c.interleaved),
      d === null ? ((i.next = i), Rc(c)) : ((i.next = d.next), (d.next = i)),
      (c.interleaved = i),
      Ci(t, o)
    );
  }
  function wa(t, i, o) {
    if (((i = i.updateQueue), i !== null && ((i = i.shared), (o & 4194240) !== 0))) {
      var c = i.lanes;
      ((c &= t.pendingLanes), (o |= c), (i.lanes = o), Gl(t, o));
    }
  }
  function Ld(t, i) {
    var o = t.updateQueue,
      c = t.alternate;
    if (c !== null && ((c = c.updateQueue), o === c)) {
      var d = null,
        p = null;
      if (((o = o.firstBaseUpdate), o !== null)) {
        do {
          var M = {
            eventTime: o.eventTime,
            lane: o.lane,
            tag: o.tag,
            payload: o.payload,
            callback: o.callback,
            next: null,
          };
          (p === null ? (d = p = M) : (p = p.next = M), (o = o.next));
        } while (o !== null);
        p === null ? (d = p = i) : (p = p.next = i);
      } else d = p = i;
      ((o = {
        baseState: c.baseState,
        firstBaseUpdate: d,
        lastBaseUpdate: p,
        shared: c.shared,
        effects: c.effects,
      }),
        (t.updateQueue = o));
      return;
    }
    ((t = o.lastBaseUpdate),
      t === null ? (o.firstBaseUpdate = i) : (t.next = i),
      (o.lastBaseUpdate = i));
  }
  function Aa(t, i, o, c) {
    var d = t.updateQueue;
    tr = !1;
    var p = d.firstBaseUpdate,
      M = d.lastBaseUpdate,
      U = d.shared.pending;
    if (U !== null) {
      d.shared.pending = null;
      var O = U,
        re = O.next;
      ((O.next = null), M === null ? (p = re) : (M.next = re), (M = O));
      var _e = t.alternate;
      _e !== null &&
        ((_e = _e.updateQueue),
        (U = _e.lastBaseUpdate),
        U !== M &&
          (U === null ? (_e.firstBaseUpdate = re) : (U.next = re), (_e.lastBaseUpdate = O)));
    }
    if (p !== null) {
      var ye = d.baseState;
      ((M = 0), (_e = re = O = null), (U = p));
      do {
        var ge = U.lane,
          Ne = U.eventTime;
        if ((c & ge) === ge) {
          _e !== null &&
            (_e = _e.next =
              {
                eventTime: Ne,
                lane: 0,
                tag: U.tag,
                payload: U.payload,
                callback: U.callback,
                next: null,
              });
          e: {
            var Be = t,
              Ge = U;
            switch (((ge = i), (Ne = o), Ge.tag)) {
              case 1:
                if (((Be = Ge.payload), typeof Be == "function")) {
                  ye = Be.call(Ne, ye, ge);
                  break e;
                }
                ye = Be;
                break e;
              case 3:
                Be.flags = (Be.flags & -65537) | 128;
              case 0:
                if (
                  ((Be = Ge.payload),
                  (ge = typeof Be == "function" ? Be.call(Ne, ye, ge) : Be),
                  ge == null)
                )
                  break e;
                ye = j({}, ye, ge);
                break e;
              case 2:
                tr = !0;
            }
          }
          U.callback !== null &&
            U.lane !== 0 &&
            ((t.flags |= 64), (ge = d.effects), ge === null ? (d.effects = [U]) : ge.push(U));
        } else
          ((Ne = {
            eventTime: Ne,
            lane: ge,
            tag: U.tag,
            payload: U.payload,
            callback: U.callback,
            next: null,
          }),
            _e === null ? ((re = _e = Ne), (O = ye)) : (_e = _e.next = Ne),
            (M |= ge));
        if (((U = U.next), U === null)) {
          if (((U = d.shared.pending), U === null)) break;
          ((ge = U),
            (U = ge.next),
            (ge.next = null),
            (d.lastBaseUpdate = ge),
            (d.shared.pending = null));
        }
      } while (!0);
      if (
        (_e === null && (O = ye),
        (d.baseState = O),
        (d.firstBaseUpdate = re),
        (d.lastBaseUpdate = _e),
        (i = d.shared.interleaved),
        i !== null)
      ) {
        d = i;
        do ((M |= d.lane), (d = d.next));
        while (d !== i);
      } else p === null && (d.shared.lanes = 0);
      ((Nr |= M), (t.lanes = M), (t.memoizedState = ye));
    }
  }
  function Dd(t, i, o) {
    if (((t = i.effects), (i.effects = null), t !== null))
      for (i = 0; i < t.length; i++) {
        var c = t[i],
          d = c.callback;
        if (d !== null) {
          if (((c.callback = null), (c = o), typeof d != "function")) throw Error(n(191, d));
          d.call(c);
        }
      }
  }
  var vo = {},
    _i = Qi(vo),
    xo = Qi(vo),
    yo = Qi(vo);
  function Lr(t) {
    if (t === vo) throw Error(n(174));
    return t;
  }
  function bc(t, i) {
    switch ((Lt(yo, i), Lt(xo, t), Lt(_i, vo), (t = i.nodeType), t)) {
      case 9:
      case 11:
        i = (i = i.documentElement) ? i.namespaceURI : ke(null, "");
        break;
      default:
        ((t = t === 8 ? i.parentNode : i),
          (i = t.namespaceURI || null),
          (t = t.tagName),
          (i = ke(i, t)));
    }
    (Nt(_i), Lt(_i, i));
  }
  function ps() {
    (Nt(_i), Nt(xo), Nt(yo));
  }
  function Nd(t) {
    Lr(yo.current);
    var i = Lr(_i.current),
      o = ke(i, t.type);
    i !== o && (Lt(xo, t), Lt(_i, o));
  }
  function Pc(t) {
    xo.current === t && (Nt(_i), Nt(xo));
  }
  var kt = Qi(0);
  function Ra(t) {
    for (var i = t; i !== null;) {
      if (i.tag === 13) {
        var o = i.memoizedState;
        if (o !== null && ((o = o.dehydrated), o === null || o.data === "$?" || o.data === "$!"))
          return i;
      } else if (i.tag === 19 && i.memoizedProps.revealOrder !== void 0) {
        if ((i.flags & 128) !== 0) return i;
      } else if (i.child !== null) {
        ((i.child.return = i), (i = i.child));
        continue;
      }
      if (i === t) break;
      for (; i.sibling === null;) {
        if (i.return === null || i.return === t) return null;
        i = i.return;
      }
      ((i.sibling.return = i.return), (i = i.sibling));
    }
    return null;
  }
  var Lc = [];
  function Dc() {
    for (var t = 0; t < Lc.length; t++) Lc[t]._workInProgressVersionPrimary = null;
    Lc.length = 0;
  }
  var Ca = N.ReactCurrentDispatcher,
    Nc = N.ReactCurrentBatchConfig,
    Dr = 0,
    zt = null,
    Yt = null,
    tn = null,
    ba = !1,
    So = !1,
    Mo = 0,
    b_ = 0;
  function dn() {
    throw Error(n(321));
  }
  function Uc(t, i) {
    if (i === null) return !1;
    for (var o = 0; o < i.length && o < t.length; o++) if (!ni(t[o], i[o])) return !1;
    return !0;
  }
  function Ic(t, i, o, c, d, p) {
    if (
      ((Dr = p),
      (zt = i),
      (i.memoizedState = null),
      (i.updateQueue = null),
      (i.lanes = 0),
      (Ca.current = t === null || t.memoizedState === null ? N_ : U_),
      (t = o(c, d)),
      So)
    ) {
      p = 0;
      do {
        if (((So = !1), (Mo = 0), 25 <= p)) throw Error(n(301));
        ((p += 1), (tn = Yt = null), (i.updateQueue = null), (Ca.current = I_), (t = o(c, d)));
      } while (So);
    }
    if (
      ((Ca.current = Da),
      (i = Yt !== null && Yt.next !== null),
      (Dr = 0),
      (tn = Yt = zt = null),
      (ba = !1),
      i)
    )
      throw Error(n(300));
    return t;
  }
  function Fc() {
    var t = Mo !== 0;
    return ((Mo = 0), t);
  }
  function vi() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (tn === null ? (zt.memoizedState = tn = t) : (tn = tn.next = t), tn);
  }
  function qn() {
    if (Yt === null) {
      var t = zt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Yt.next;
    var i = tn === null ? zt.memoizedState : tn.next;
    if (i !== null) ((tn = i), (Yt = t));
    else {
      if (t === null) throw Error(n(310));
      ((Yt = t),
        (t = {
          memoizedState: Yt.memoizedState,
          baseState: Yt.baseState,
          baseQueue: Yt.baseQueue,
          queue: Yt.queue,
          next: null,
        }),
        tn === null ? (zt.memoizedState = tn = t) : (tn = tn.next = t));
    }
    return tn;
  }
  function Eo(t, i) {
    return typeof i == "function" ? i(t) : i;
  }
  function Oc(t) {
    var i = qn(),
      o = i.queue;
    if (o === null) throw Error(n(311));
    o.lastRenderedReducer = t;
    var c = Yt,
      d = c.baseQueue,
      p = o.pending;
    if (p !== null) {
      if (d !== null) {
        var M = d.next;
        ((d.next = p.next), (p.next = M));
      }
      ((c.baseQueue = d = p), (o.pending = null));
    }
    if (d !== null) {
      ((p = d.next), (c = c.baseState));
      var U = (M = null),
        O = null,
        re = p;
      do {
        var _e = re.lane;
        if ((Dr & _e) === _e)
          (O !== null &&
            (O = O.next =
              {
                lane: 0,
                action: re.action,
                hasEagerState: re.hasEagerState,
                eagerState: re.eagerState,
                next: null,
              }),
            (c = re.hasEagerState ? re.eagerState : t(c, re.action)));
        else {
          var ye = {
            lane: _e,
            action: re.action,
            hasEagerState: re.hasEagerState,
            eagerState: re.eagerState,
            next: null,
          };
          (O === null ? ((U = O = ye), (M = c)) : (O = O.next = ye), (zt.lanes |= _e), (Nr |= _e));
        }
        re = re.next;
      } while (re !== null && re !== p);
      (O === null ? (M = c) : (O.next = U),
        ni(c, i.memoizedState) || (Pn = !0),
        (i.memoizedState = c),
        (i.baseState = M),
        (i.baseQueue = O),
        (o.lastRenderedState = c));
    }
    if (((t = o.interleaved), t !== null)) {
      d = t;
      do ((p = d.lane), (zt.lanes |= p), (Nr |= p), (d = d.next));
      while (d !== t);
    } else d === null && (o.lanes = 0);
    return [i.memoizedState, o.dispatch];
  }
  function kc(t) {
    var i = qn(),
      o = i.queue;
    if (o === null) throw Error(n(311));
    o.lastRenderedReducer = t;
    var c = o.dispatch,
      d = o.pending,
      p = i.memoizedState;
    if (d !== null) {
      o.pending = null;
      var M = (d = d.next);
      do ((p = t(p, M.action)), (M = M.next));
      while (M !== d);
      (ni(p, i.memoizedState) || (Pn = !0),
        (i.memoizedState = p),
        i.baseQueue === null && (i.baseState = p),
        (o.lastRenderedState = p));
    }
    return [p, c];
  }
  function Ud() {}
  function Id(t, i) {
    var o = zt,
      c = qn(),
      d = i(),
      p = !ni(c.memoizedState, d);
    if (
      (p && ((c.memoizedState = d), (Pn = !0)),
      (c = c.queue),
      zc(kd.bind(null, o, c, t), [t]),
      c.getSnapshot !== i || p || (tn !== null && tn.memoizedState.tag & 1))
    ) {
      if (((o.flags |= 2048), To(9, Od.bind(null, o, c, d, i), void 0, null), nn === null))
        throw Error(n(349));
      (Dr & 30) !== 0 || Fd(o, i, d);
    }
    return d;
  }
  function Fd(t, i, o) {
    ((t.flags |= 16384),
      (t = { getSnapshot: i, value: o }),
      (i = zt.updateQueue),
      i === null
        ? ((i = { lastEffect: null, stores: null }), (zt.updateQueue = i), (i.stores = [t]))
        : ((o = i.stores), o === null ? (i.stores = [t]) : o.push(t)));
  }
  function Od(t, i, o, c) {
    ((i.value = o), (i.getSnapshot = c), zd(i) && Bd(t));
  }
  function kd(t, i, o) {
    return o(function () {
      zd(i) && Bd(t);
    });
  }
  function zd(t) {
    var i = t.getSnapshot;
    t = t.value;
    try {
      var o = i();
      return !ni(t, o);
    } catch {
      return !0;
    }
  }
  function Bd(t) {
    var i = Ci(t, 1);
    i !== null && ai(i, t, 1, -1);
  }
  function Hd(t) {
    var i = vi();
    return (
      typeof t == "function" && (t = t()),
      (i.memoizedState = i.baseState = t),
      (t = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Eo,
        lastRenderedState: t,
      }),
      (i.queue = t),
      (t = t.dispatch = D_.bind(null, zt, t)),
      [i.memoizedState, t]
    );
  }
  function To(t, i, o, c) {
    return (
      (t = { tag: t, create: i, destroy: o, deps: c, next: null }),
      (i = zt.updateQueue),
      i === null
        ? ((i = { lastEffect: null, stores: null }),
          (zt.updateQueue = i),
          (i.lastEffect = t.next = t))
        : ((o = i.lastEffect),
          o === null
            ? (i.lastEffect = t.next = t)
            : ((c = o.next), (o.next = t), (t.next = c), (i.lastEffect = t))),
      t
    );
  }
  function Gd() {
    return qn().memoizedState;
  }
  function Pa(t, i, o, c) {
    var d = vi();
    ((zt.flags |= t), (d.memoizedState = To(1 | i, o, void 0, c === void 0 ? null : c)));
  }
  function La(t, i, o, c) {
    var d = qn();
    c = c === void 0 ? null : c;
    var p = void 0;
    if (Yt !== null) {
      var M = Yt.memoizedState;
      if (((p = M.destroy), c !== null && Uc(c, M.deps))) {
        d.memoizedState = To(i, o, p, c);
        return;
      }
    }
    ((zt.flags |= t), (d.memoizedState = To(1 | i, o, p, c)));
  }
  function Vd(t, i) {
    return Pa(8390656, 8, t, i);
  }
  function zc(t, i) {
    return La(2048, 8, t, i);
  }
  function Wd(t, i) {
    return La(4, 2, t, i);
  }
  function Xd(t, i) {
    return La(4, 4, t, i);
  }
  function jd(t, i) {
    if (typeof i == "function")
      return (
        (t = t()),
        i(t),
        function () {
          i(null);
        }
      );
    if (i != null)
      return (
        (t = t()),
        (i.current = t),
        function () {
          i.current = null;
        }
      );
  }
  function qd(t, i, o) {
    return ((o = o != null ? o.concat([t]) : null), La(4, 4, jd.bind(null, i, t), o));
  }
  function Bc() {}
  function Yd(t, i) {
    var o = qn();
    i = i === void 0 ? null : i;
    var c = o.memoizedState;
    return c !== null && i !== null && Uc(i, c[1]) ? c[0] : ((o.memoizedState = [t, i]), t);
  }
  function $d(t, i) {
    var o = qn();
    i = i === void 0 ? null : i;
    var c = o.memoizedState;
    return c !== null && i !== null && Uc(i, c[1])
      ? c[0]
      : ((t = t()), (o.memoizedState = [t, i]), t);
  }
  function Kd(t, i, o) {
    return (Dr & 21) === 0
      ? (t.baseState && ((t.baseState = !1), (Pn = !0)), (t.memoizedState = o))
      : (ni(o, i) || ((o = Jo()), (zt.lanes |= o), (Nr |= o), (t.baseState = !0)), i);
  }
  function P_(t, i) {
    var o = wt;
    ((wt = o !== 0 && 4 > o ? o : 4), t(!0));
    var c = Nc.transition;
    Nc.transition = {};
    try {
      (t(!1), i());
    } finally {
      ((wt = o), (Nc.transition = c));
    }
  }
  function Zd() {
    return qn().memoizedState;
  }
  function L_(t, i, o) {
    var c = or(t);
    if (((o = { lane: c, action: o, hasEagerState: !1, eagerState: null, next: null }), Qd(t)))
      Jd(i, o);
    else if (((o = bd(t, i, o, c)), o !== null)) {
      var d = yn();
      (ai(o, t, c, d), eh(o, i, c));
    }
  }
  function D_(t, i, o) {
    var c = or(t),
      d = { lane: c, action: o, hasEagerState: !1, eagerState: null, next: null };
    if (Qd(t)) Jd(i, d);
    else {
      var p = t.alternate;
      if (
        t.lanes === 0 &&
        (p === null || p.lanes === 0) &&
        ((p = i.lastRenderedReducer), p !== null)
      )
        try {
          var M = i.lastRenderedState,
            U = p(M, o);
          if (((d.hasEagerState = !0), (d.eagerState = U), ni(U, M))) {
            var O = i.interleaved;
            (O === null ? ((d.next = d), Rc(i)) : ((d.next = O.next), (O.next = d)),
              (i.interleaved = d));
            return;
          }
        } catch {
        } finally {
        }
      ((o = bd(t, i, d, c)), o !== null && ((d = yn()), ai(o, t, c, d), eh(o, i, c)));
    }
  }
  function Qd(t) {
    var i = t.alternate;
    return t === zt || (i !== null && i === zt);
  }
  function Jd(t, i) {
    So = ba = !0;
    var o = t.pending;
    (o === null ? (i.next = i) : ((i.next = o.next), (o.next = i)), (t.pending = i));
  }
  function eh(t, i, o) {
    if ((o & 4194240) !== 0) {
      var c = i.lanes;
      ((c &= t.pendingLanes), (o |= c), (i.lanes = o), Gl(t, o));
    }
  }
  var Da = {
      readContext: jn,
      useCallback: dn,
      useContext: dn,
      useEffect: dn,
      useImperativeHandle: dn,
      useInsertionEffect: dn,
      useLayoutEffect: dn,
      useMemo: dn,
      useReducer: dn,
      useRef: dn,
      useState: dn,
      useDebugValue: dn,
      useDeferredValue: dn,
      useTransition: dn,
      useMutableSource: dn,
      useSyncExternalStore: dn,
      useId: dn,
      unstable_isNewReconciler: !1,
    },
    N_ = {
      readContext: jn,
      useCallback: function (t, i) {
        return ((vi().memoizedState = [t, i === void 0 ? null : i]), t);
      },
      useContext: jn,
      useEffect: Vd,
      useImperativeHandle: function (t, i, o) {
        return ((o = o != null ? o.concat([t]) : null), Pa(4194308, 4, jd.bind(null, i, t), o));
      },
      useLayoutEffect: function (t, i) {
        return Pa(4194308, 4, t, i);
      },
      useInsertionEffect: function (t, i) {
        return Pa(4, 2, t, i);
      },
      useMemo: function (t, i) {
        var o = vi();
        return ((i = i === void 0 ? null : i), (t = t()), (o.memoizedState = [t, i]), t);
      },
      useReducer: function (t, i, o) {
        var c = vi();
        return (
          (i = o !== void 0 ? o(i) : i),
          (c.memoizedState = c.baseState = i),
          (t = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: i,
          }),
          (c.queue = t),
          (t = t.dispatch = L_.bind(null, zt, t)),
          [c.memoizedState, t]
        );
      },
      useRef: function (t) {
        var i = vi();
        return ((t = { current: t }), (i.memoizedState = t));
      },
      useState: Hd,
      useDebugValue: Bc,
      useDeferredValue: function (t) {
        return (vi().memoizedState = t);
      },
      useTransition: function () {
        var t = Hd(!1),
          i = t[0];
        return ((t = P_.bind(null, t[1])), (vi().memoizedState = t), [i, t]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (t, i, o) {
        var c = zt,
          d = vi();
        if (Ot) {
          if (o === void 0) throw Error(n(407));
          o = o();
        } else {
          if (((o = i()), nn === null)) throw Error(n(349));
          (Dr & 30) !== 0 || Fd(c, i, o);
        }
        d.memoizedState = o;
        var p = { value: o, getSnapshot: i };
        return (
          (d.queue = p),
          Vd(kd.bind(null, c, p, t), [t]),
          (c.flags |= 2048),
          To(9, Od.bind(null, c, p, o, i), void 0, null),
          o
        );
      },
      useId: function () {
        var t = vi(),
          i = nn.identifierPrefix;
        if (Ot) {
          var o = Ri,
            c = Ai;
          ((o = (c & ~(1 << (32 - vn(c) - 1))).toString(32) + o),
            (i = ":" + i + "R" + o),
            (o = Mo++),
            0 < o && (i += "H" + o.toString(32)),
            (i += ":"));
        } else ((o = b_++), (i = ":" + i + "r" + o.toString(32) + ":"));
        return (t.memoizedState = i);
      },
      unstable_isNewReconciler: !1,
    },
    U_ = {
      readContext: jn,
      useCallback: Yd,
      useContext: jn,
      useEffect: zc,
      useImperativeHandle: qd,
      useInsertionEffect: Wd,
      useLayoutEffect: Xd,
      useMemo: $d,
      useReducer: Oc,
      useRef: Gd,
      useState: function () {
        return Oc(Eo);
      },
      useDebugValue: Bc,
      useDeferredValue: function (t) {
        var i = qn();
        return Kd(i, Yt.memoizedState, t);
      },
      useTransition: function () {
        var t = Oc(Eo)[0],
          i = qn().memoizedState;
        return [t, i];
      },
      useMutableSource: Ud,
      useSyncExternalStore: Id,
      useId: Zd,
      unstable_isNewReconciler: !1,
    },
    I_ = {
      readContext: jn,
      useCallback: Yd,
      useContext: jn,
      useEffect: zc,
      useImperativeHandle: qd,
      useInsertionEffect: Wd,
      useLayoutEffect: Xd,
      useMemo: $d,
      useReducer: kc,
      useRef: Gd,
      useState: function () {
        return kc(Eo);
      },
      useDebugValue: Bc,
      useDeferredValue: function (t) {
        var i = qn();
        return Yt === null ? (i.memoizedState = t) : Kd(i, Yt.memoizedState, t);
      },
      useTransition: function () {
        var t = kc(Eo)[0],
          i = qn().memoizedState;
        return [t, i];
      },
      useMutableSource: Ud,
      useSyncExternalStore: Id,
      useId: Zd,
      unstable_isNewReconciler: !1,
    };
  function ri(t, i) {
    if (t && t.defaultProps) {
      ((i = j({}, i)), (t = t.defaultProps));
      for (var o in t) i[o] === void 0 && (i[o] = t[o]);
      return i;
    }
    return i;
  }
  function Hc(t, i, o, c) {
    ((i = t.memoizedState),
      (o = o(c, i)),
      (o = o == null ? i : j({}, i, o)),
      (t.memoizedState = o),
      t.lanes === 0 && (t.updateQueue.baseState = o));
  }
  var Na = {
    isMounted: function (t) {
      return (t = t._reactInternals) ? Mi(t) === t : !1;
    },
    enqueueSetState: function (t, i, o) {
      t = t._reactInternals;
      var c = yn(),
        d = or(t),
        p = bi(c, d);
      ((p.payload = i),
        o != null && (p.callback = o),
        (i = nr(t, p, d)),
        i !== null && (ai(i, t, d, c), wa(i, t, d)));
    },
    enqueueReplaceState: function (t, i, o) {
      t = t._reactInternals;
      var c = yn(),
        d = or(t),
        p = bi(c, d);
      ((p.tag = 1),
        (p.payload = i),
        o != null && (p.callback = o),
        (i = nr(t, p, d)),
        i !== null && (ai(i, t, d, c), wa(i, t, d)));
    },
    enqueueForceUpdate: function (t, i) {
      t = t._reactInternals;
      var o = yn(),
        c = or(t),
        d = bi(o, c);
      ((d.tag = 2),
        i != null && (d.callback = i),
        (i = nr(t, d, c)),
        i !== null && (ai(i, t, c, o), wa(i, t, c)));
    },
  };
  function th(t, i, o, c, d, p, M) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(c, p, M)
        : i.prototype && i.prototype.isPureReactComponent
          ? !co(o, c) || !co(d, p)
          : !0
    );
  }
  function nh(t, i, o) {
    var c = !1,
      d = Ji,
      p = i.contextType;
    return (
      typeof p == "object" && p !== null
        ? (p = jn(p))
        : ((d = bn(i) ? Rr : fn.current),
          (c = i.contextTypes),
          (p = (c = c != null) ? as(t, d) : Ji)),
      (i = new i(o, p)),
      (t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null),
      (i.updater = Na),
      (t.stateNode = i),
      (i._reactInternals = t),
      c &&
        ((t = t.stateNode),
        (t.__reactInternalMemoizedUnmaskedChildContext = d),
        (t.__reactInternalMemoizedMaskedChildContext = p)),
      i
    );
  }
  function ih(t, i, o, c) {
    ((t = i.state),
      typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(o, c),
      typeof i.UNSAFE_componentWillReceiveProps == "function" &&
        i.UNSAFE_componentWillReceiveProps(o, c),
      i.state !== t && Na.enqueueReplaceState(i, i.state, null));
  }
  function Gc(t, i, o, c) {
    var d = t.stateNode;
    ((d.props = o), (d.state = t.memoizedState), (d.refs = {}), Cc(t));
    var p = i.contextType;
    (typeof p == "object" && p !== null
      ? (d.context = jn(p))
      : ((p = bn(i) ? Rr : fn.current), (d.context = as(t, p))),
      (d.state = t.memoizedState),
      (p = i.getDerivedStateFromProps),
      typeof p == "function" && (Hc(t, i, p, o), (d.state = t.memoizedState)),
      typeof i.getDerivedStateFromProps == "function" ||
        typeof d.getSnapshotBeforeUpdate == "function" ||
        (typeof d.UNSAFE_componentWillMount != "function" &&
          typeof d.componentWillMount != "function") ||
        ((i = d.state),
        typeof d.componentWillMount == "function" && d.componentWillMount(),
        typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(),
        i !== d.state && Na.enqueueReplaceState(d, d.state, null),
        Aa(t, o, d, c),
        (d.state = t.memoizedState)),
      typeof d.componentDidMount == "function" && (t.flags |= 4194308));
  }
  function ms(t, i) {
    try {
      var o = "",
        c = i;
      do ((o += me(c)), (c = c.return));
      while (c);
      var d = o;
    } catch (p) {
      d =
        `
Error generating stack: ` +
        p.message +
        `
` +
        p.stack;
    }
    return { value: t, source: i, stack: d, digest: null };
  }
  function Vc(t, i, o) {
    return { value: t, source: null, stack: o ?? null, digest: i ?? null };
  }
  function Wc(t, i) {
    try {
      console.error(i.value);
    } catch (o) {
      setTimeout(function () {
        throw o;
      });
    }
  }
  var F_ = typeof WeakMap == "function" ? WeakMap : Map;
  function rh(t, i, o) {
    ((o = bi(-1, o)), (o.tag = 3), (o.payload = { element: null }));
    var c = i.value;
    return (
      (o.callback = function () {
        (Ba || ((Ba = !0), (su = c)), Wc(t, i));
      }),
      o
    );
  }
  function sh(t, i, o) {
    ((o = bi(-1, o)), (o.tag = 3));
    var c = t.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var d = i.value;
      ((o.payload = function () {
        return c(d);
      }),
        (o.callback = function () {
          Wc(t, i);
        }));
    }
    var p = t.stateNode;
    return (
      p !== null &&
        typeof p.componentDidCatch == "function" &&
        (o.callback = function () {
          (Wc(t, i),
            typeof c != "function" && (rr === null ? (rr = new Set([this])) : rr.add(this)));
          var M = i.stack;
          this.componentDidCatch(i.value, { componentStack: M !== null ? M : "" });
        }),
      o
    );
  }
  function oh(t, i, o) {
    var c = t.pingCache;
    if (c === null) {
      c = t.pingCache = new F_();
      var d = new Set();
      c.set(i, d);
    } else ((d = c.get(i)), d === void 0 && ((d = new Set()), c.set(i, d)));
    d.has(o) || (d.add(o), (t = K_.bind(null, t, i, o)), i.then(t, t));
  }
  function ah(t) {
    do {
      var i;
      if (
        ((i = t.tag === 13) &&
          ((i = t.memoizedState), (i = i !== null ? i.dehydrated !== null : !0)),
        i)
      )
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function lh(t, i, o, c, d) {
    return (t.mode & 1) === 0
      ? (t === i
          ? (t.flags |= 65536)
          : ((t.flags |= 128),
            (o.flags |= 131072),
            (o.flags &= -52805),
            o.tag === 1 &&
              (o.alternate === null ? (o.tag = 17) : ((i = bi(-1, 1)), (i.tag = 2), nr(o, i, 1))),
            (o.lanes |= 1)),
        t)
      : ((t.flags |= 65536), (t.lanes = d), t);
  }
  var O_ = N.ReactCurrentOwner,
    Pn = !1;
  function xn(t, i, o, c) {
    i.child = t === null ? Cd(i, null, o, c) : fs(i, t.child, o, c);
  }
  function ch(t, i, o, c, d) {
    o = o.render;
    var p = i.ref;
    return (
      hs(i, d),
      (c = Ic(t, i, o, c, p, d)),
      (o = Fc()),
      t !== null && !Pn
        ? ((i.updateQueue = t.updateQueue), (i.flags &= -2053), (t.lanes &= ~d), Pi(t, i, d))
        : (Ot && o && vc(i), (i.flags |= 1), xn(t, i, c, d), i.child)
    );
  }
  function uh(t, i, o, c, d) {
    if (t === null) {
      var p = o.type;
      return typeof p == "function" &&
        !du(p) &&
        p.defaultProps === void 0 &&
        o.compare === null &&
        o.defaultProps === void 0
        ? ((i.tag = 15), (i.type = p), fh(t, i, p, c, d))
        : ((t = ja(o.type, null, c, i, i.mode, d)), (t.ref = i.ref), (t.return = i), (i.child = t));
    }
    if (((p = t.child), (t.lanes & d) === 0)) {
      var M = p.memoizedProps;
      if (((o = o.compare), (o = o !== null ? o : co), o(M, c) && t.ref === i.ref))
        return Pi(t, i, d);
    }
    return ((i.flags |= 1), (t = lr(p, c)), (t.ref = i.ref), (t.return = i), (i.child = t));
  }
  function fh(t, i, o, c, d) {
    if (t !== null) {
      var p = t.memoizedProps;
      if (co(p, c) && t.ref === i.ref)
        if (((Pn = !1), (i.pendingProps = c = p), (t.lanes & d) !== 0))
          (t.flags & 131072) !== 0 && (Pn = !0);
        else return ((i.lanes = t.lanes), Pi(t, i, d));
    }
    return Xc(t, i, o, c, d);
  }
  function dh(t, i, o) {
    var c = i.pendingProps,
      d = c.children,
      p = t !== null ? t.memoizedState : null;
    if (c.mode === "hidden")
      if ((i.mode & 1) === 0)
        ((i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
          Lt(_s, kn),
          (kn |= o));
      else {
        if ((o & 1073741824) === 0)
          return (
            (t = p !== null ? p.baseLanes | o : o),
            (i.lanes = i.childLanes = 1073741824),
            (i.memoizedState = { baseLanes: t, cachePool: null, transitions: null }),
            (i.updateQueue = null),
            Lt(_s, kn),
            (kn |= t),
            null
          );
        ((i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
          (c = p !== null ? p.baseLanes : o),
          Lt(_s, kn),
          (kn |= c));
      }
    else
      (p !== null ? ((c = p.baseLanes | o), (i.memoizedState = null)) : (c = o),
        Lt(_s, kn),
        (kn |= c));
    return (xn(t, i, d, o), i.child);
  }
  function hh(t, i) {
    var o = i.ref;
    ((t === null && o !== null) || (t !== null && t.ref !== o)) &&
      ((i.flags |= 512), (i.flags |= 2097152));
  }
  function Xc(t, i, o, c, d) {
    var p = bn(o) ? Rr : fn.current;
    return (
      (p = as(i, p)),
      hs(i, d),
      (o = Ic(t, i, o, c, p, d)),
      (c = Fc()),
      t !== null && !Pn
        ? ((i.updateQueue = t.updateQueue), (i.flags &= -2053), (t.lanes &= ~d), Pi(t, i, d))
        : (Ot && c && vc(i), (i.flags |= 1), xn(t, i, o, d), i.child)
    );
  }
  function ph(t, i, o, c, d) {
    if (bn(o)) {
      var p = !0;
      _a(i);
    } else p = !1;
    if ((hs(i, d), i.stateNode === null)) (Ia(t, i), nh(i, o, c), Gc(i, o, c, d), (c = !0));
    else if (t === null) {
      var M = i.stateNode,
        U = i.memoizedProps;
      M.props = U;
      var O = M.context,
        re = o.contextType;
      typeof re == "object" && re !== null
        ? (re = jn(re))
        : ((re = bn(o) ? Rr : fn.current), (re = as(i, re)));
      var _e = o.getDerivedStateFromProps,
        ye = typeof _e == "function" || typeof M.getSnapshotBeforeUpdate == "function";
      (ye ||
        (typeof M.UNSAFE_componentWillReceiveProps != "function" &&
          typeof M.componentWillReceiveProps != "function") ||
        ((U !== c || O !== re) && ih(i, M, c, re)),
        (tr = !1));
      var ge = i.memoizedState;
      ((M.state = ge),
        Aa(i, c, M, d),
        (O = i.memoizedState),
        U !== c || ge !== O || Cn.current || tr
          ? (typeof _e == "function" && (Hc(i, o, _e, c), (O = i.memoizedState)),
            (U = tr || th(i, o, U, c, ge, O, re))
              ? (ye ||
                  (typeof M.UNSAFE_componentWillMount != "function" &&
                    typeof M.componentWillMount != "function") ||
                  (typeof M.componentWillMount == "function" && M.componentWillMount(),
                  typeof M.UNSAFE_componentWillMount == "function" &&
                    M.UNSAFE_componentWillMount()),
                typeof M.componentDidMount == "function" && (i.flags |= 4194308))
              : (typeof M.componentDidMount == "function" && (i.flags |= 4194308),
                (i.memoizedProps = c),
                (i.memoizedState = O)),
            (M.props = c),
            (M.state = O),
            (M.context = re),
            (c = U))
          : (typeof M.componentDidMount == "function" && (i.flags |= 4194308), (c = !1)));
    } else {
      ((M = i.stateNode),
        Pd(t, i),
        (U = i.memoizedProps),
        (re = i.type === i.elementType ? U : ri(i.type, U)),
        (M.props = re),
        (ye = i.pendingProps),
        (ge = M.context),
        (O = o.contextType),
        typeof O == "object" && O !== null
          ? (O = jn(O))
          : ((O = bn(o) ? Rr : fn.current), (O = as(i, O))));
      var Ne = o.getDerivedStateFromProps;
      ((_e = typeof Ne == "function" || typeof M.getSnapshotBeforeUpdate == "function") ||
        (typeof M.UNSAFE_componentWillReceiveProps != "function" &&
          typeof M.componentWillReceiveProps != "function") ||
        ((U !== ye || ge !== O) && ih(i, M, c, O)),
        (tr = !1),
        (ge = i.memoizedState),
        (M.state = ge),
        Aa(i, c, M, d));
      var Be = i.memoizedState;
      U !== ye || ge !== Be || Cn.current || tr
        ? (typeof Ne == "function" && (Hc(i, o, Ne, c), (Be = i.memoizedState)),
          (re = tr || th(i, o, re, c, ge, Be, O) || !1)
            ? (_e ||
                (typeof M.UNSAFE_componentWillUpdate != "function" &&
                  typeof M.componentWillUpdate != "function") ||
                (typeof M.componentWillUpdate == "function" && M.componentWillUpdate(c, Be, O),
                typeof M.UNSAFE_componentWillUpdate == "function" &&
                  M.UNSAFE_componentWillUpdate(c, Be, O)),
              typeof M.componentDidUpdate == "function" && (i.flags |= 4),
              typeof M.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024))
            : (typeof M.componentDidUpdate != "function" ||
                (U === t.memoizedProps && ge === t.memoizedState) ||
                (i.flags |= 4),
              typeof M.getSnapshotBeforeUpdate != "function" ||
                (U === t.memoizedProps && ge === t.memoizedState) ||
                (i.flags |= 1024),
              (i.memoizedProps = c),
              (i.memoizedState = Be)),
          (M.props = c),
          (M.state = Be),
          (M.context = O),
          (c = re))
        : (typeof M.componentDidUpdate != "function" ||
            (U === t.memoizedProps && ge === t.memoizedState) ||
            (i.flags |= 4),
          typeof M.getSnapshotBeforeUpdate != "function" ||
            (U === t.memoizedProps && ge === t.memoizedState) ||
            (i.flags |= 1024),
          (c = !1));
    }
    return jc(t, i, o, c, p, d);
  }
  function jc(t, i, o, c, d, p) {
    hh(t, i);
    var M = (i.flags & 128) !== 0;
    if (!c && !M) return (d && xd(i, o, !1), Pi(t, i, p));
    ((c = i.stateNode), (O_.current = i));
    var U = M && typeof o.getDerivedStateFromError != "function" ? null : c.render();
    return (
      (i.flags |= 1),
      t !== null && M
        ? ((i.child = fs(i, t.child, null, p)), (i.child = fs(i, null, U, p)))
        : xn(t, i, U, p),
      (i.memoizedState = c.state),
      d && xd(i, o, !0),
      i.child
    );
  }
  function mh(t) {
    var i = t.stateNode;
    (i.pendingContext
      ? _d(t, i.pendingContext, i.pendingContext !== i.context)
      : i.context && _d(t, i.context, !1),
      bc(t, i.containerInfo));
  }
  function gh(t, i, o, c, d) {
    return (us(), Mc(d), (i.flags |= 256), xn(t, i, o, c), i.child);
  }
  var qc = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Yc(t) {
    return { baseLanes: t, cachePool: null, transitions: null };
  }
  function _h(t, i, o) {
    var c = i.pendingProps,
      d = kt.current,
      p = !1,
      M = (i.flags & 128) !== 0,
      U;
    if (
      ((U = M) || (U = t !== null && t.memoizedState === null ? !1 : (d & 2) !== 0),
      U ? ((p = !0), (i.flags &= -129)) : (t === null || t.memoizedState !== null) && (d |= 1),
      Lt(kt, d & 1),
      t === null)
    )
      return (
        Sc(i),
        (t = i.memoizedState),
        t !== null && ((t = t.dehydrated), t !== null)
          ? ((i.mode & 1) === 0
              ? (i.lanes = 1)
              : t.data === "$!"
                ? (i.lanes = 8)
                : (i.lanes = 1073741824),
            null)
          : ((M = c.children),
            (t = c.fallback),
            p
              ? ((c = i.mode),
                (p = i.child),
                (M = { mode: "hidden", children: M }),
                (c & 1) === 0 && p !== null
                  ? ((p.childLanes = 0), (p.pendingProps = M))
                  : (p = qa(M, c, 0, null)),
                (t = Or(t, c, o, null)),
                (p.return = i),
                (t.return = i),
                (p.sibling = t),
                (i.child = p),
                (i.child.memoizedState = Yc(o)),
                (i.memoizedState = qc),
                t)
              : $c(i, M))
      );
    if (((d = t.memoizedState), d !== null && ((U = d.dehydrated), U !== null)))
      return k_(t, i, M, c, U, d, o);
    if (p) {
      ((p = c.fallback), (M = i.mode), (d = t.child), (U = d.sibling));
      var O = { mode: "hidden", children: c.children };
      return (
        (M & 1) === 0 && i.child !== d
          ? ((c = i.child), (c.childLanes = 0), (c.pendingProps = O), (i.deletions = null))
          : ((c = lr(d, O)), (c.subtreeFlags = d.subtreeFlags & 14680064)),
        U !== null ? (p = lr(U, p)) : ((p = Or(p, M, o, null)), (p.flags |= 2)),
        (p.return = i),
        (c.return = i),
        (c.sibling = p),
        (i.child = c),
        (c = p),
        (p = i.child),
        (M = t.child.memoizedState),
        (M =
          M === null
            ? Yc(o)
            : { baseLanes: M.baseLanes | o, cachePool: null, transitions: M.transitions }),
        (p.memoizedState = M),
        (p.childLanes = t.childLanes & ~o),
        (i.memoizedState = qc),
        c
      );
    }
    return (
      (p = t.child),
      (t = p.sibling),
      (c = lr(p, { mode: "visible", children: c.children })),
      (i.mode & 1) === 0 && (c.lanes = o),
      (c.return = i),
      (c.sibling = null),
      t !== null &&
        ((o = i.deletions), o === null ? ((i.deletions = [t]), (i.flags |= 16)) : o.push(t)),
      (i.child = c),
      (i.memoizedState = null),
      c
    );
  }
  function $c(t, i) {
    return (
      (i = qa({ mode: "visible", children: i }, t.mode, 0, null)), (i.return = t), (t.child = i)
    );
  }
  function Ua(t, i, o, c) {
    return (
      c !== null && Mc(c),
      fs(i, t.child, null, o),
      (t = $c(i, i.pendingProps.children)),
      (t.flags |= 2),
      (i.memoizedState = null),
      t
    );
  }
  function k_(t, i, o, c, d, p, M) {
    if (o)
      return i.flags & 256
        ? ((i.flags &= -257), (c = Vc(Error(n(422)))), Ua(t, i, M, c))
        : i.memoizedState !== null
          ? ((i.child = t.child), (i.flags |= 128), null)
          : ((p = c.fallback),
            (d = i.mode),
            (c = qa({ mode: "visible", children: c.children }, d, 0, null)),
            (p = Or(p, d, M, null)),
            (p.flags |= 2),
            (c.return = i),
            (p.return = i),
            (c.sibling = p),
            (i.child = c),
            (i.mode & 1) !== 0 && fs(i, t.child, null, M),
            (i.child.memoizedState = Yc(M)),
            (i.memoizedState = qc),
            p);
    if ((i.mode & 1) === 0) return Ua(t, i, M, null);
    if (d.data === "$!") {
      if (((c = d.nextSibling && d.nextSibling.dataset), c)) var U = c.dgst;
      return ((c = U), (p = Error(n(419))), (c = Vc(p, c, void 0)), Ua(t, i, M, c));
    }
    if (((U = (M & t.childLanes) !== 0), Pn || U)) {
      if (((c = nn), c !== null)) {
        switch (M & -M) {
          case 4:
            d = 2;
            break;
          case 16:
            d = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            d = 32;
            break;
          case 536870912:
            d = 268435456;
            break;
          default:
            d = 0;
        }
        ((d = (d & (c.suspendedLanes | M)) !== 0 ? 0 : d),
          d !== 0 && d !== p.retryLane && ((p.retryLane = d), Ci(t, d), ai(c, t, d, -1)));
      }
      return (fu(), (c = Vc(Error(n(421)))), Ua(t, i, M, c));
    }
    return d.data === "$?"
      ? ((i.flags |= 128), (i.child = t.child), (i = Z_.bind(null, t)), (d._reactRetry = i), null)
      : ((t = p.treeContext),
        (On = Zi(d.nextSibling)),
        (Fn = i),
        (Ot = !0),
        (ii = null),
        t !== null &&
          ((Wn[Xn++] = Ai),
          (Wn[Xn++] = Ri),
          (Wn[Xn++] = Cr),
          (Ai = t.id),
          (Ri = t.overflow),
          (Cr = i)),
        (i = $c(i, c.children)),
        (i.flags |= 4096),
        i);
  }
  function vh(t, i, o) {
    t.lanes |= i;
    var c = t.alternate;
    (c !== null && (c.lanes |= i), Ac(t.return, i, o));
  }
  function Kc(t, i, o, c, d) {
    var p = t.memoizedState;
    p === null
      ? (t.memoizedState = {
          isBackwards: i,
          rendering: null,
          renderingStartTime: 0,
          last: c,
          tail: o,
          tailMode: d,
        })
      : ((p.isBackwards = i),
        (p.rendering = null),
        (p.renderingStartTime = 0),
        (p.last = c),
        (p.tail = o),
        (p.tailMode = d));
  }
  function xh(t, i, o) {
    var c = i.pendingProps,
      d = c.revealOrder,
      p = c.tail;
    if ((xn(t, i, c.children, o), (c = kt.current), (c & 2) !== 0))
      ((c = (c & 1) | 2), (i.flags |= 128));
    else {
      if (t !== null && (t.flags & 128) !== 0)
        e: for (t = i.child; t !== null;) {
          if (t.tag === 13) t.memoizedState !== null && vh(t, o, i);
          else if (t.tag === 19) vh(t, o, i);
          else if (t.child !== null) {
            ((t.child.return = t), (t = t.child));
            continue;
          }
          if (t === i) break e;
          for (; t.sibling === null;) {
            if (t.return === null || t.return === i) break e;
            t = t.return;
          }
          ((t.sibling.return = t.return), (t = t.sibling));
        }
      c &= 1;
    }
    if ((Lt(kt, c), (i.mode & 1) === 0)) i.memoizedState = null;
    else
      switch (d) {
        case "forwards":
          for (o = i.child, d = null; o !== null;)
            ((t = o.alternate), t !== null && Ra(t) === null && (d = o), (o = o.sibling));
          ((o = d),
            o === null ? ((d = i.child), (i.child = null)) : ((d = o.sibling), (o.sibling = null)),
            Kc(i, !1, d, o, p));
          break;
        case "backwards":
          for (o = null, d = i.child, i.child = null; d !== null;) {
            if (((t = d.alternate), t !== null && Ra(t) === null)) {
              i.child = d;
              break;
            }
            ((t = d.sibling), (d.sibling = o), (o = d), (d = t));
          }
          Kc(i, !0, o, null, p);
          break;
        case "together":
          Kc(i, !1, null, null, void 0);
          break;
        default:
          i.memoizedState = null;
      }
    return i.child;
  }
  function Ia(t, i) {
    (i.mode & 1) === 0 &&
      t !== null &&
      ((t.alternate = null), (i.alternate = null), (i.flags |= 2));
  }
  function Pi(t, i, o) {
    if (
      (t !== null && (i.dependencies = t.dependencies), (Nr |= i.lanes), (o & i.childLanes) === 0)
    )
      return null;
    if (t !== null && i.child !== t.child) throw Error(n(153));
    if (i.child !== null) {
      for (t = i.child, o = lr(t, t.pendingProps), i.child = o, o.return = i; t.sibling !== null;)
        ((t = t.sibling), (o = o.sibling = lr(t, t.pendingProps)), (o.return = i));
      o.sibling = null;
    }
    return i.child;
  }
  function z_(t, i, o) {
    switch (i.tag) {
      case 3:
        (mh(i), us());
        break;
      case 5:
        Nd(i);
        break;
      case 1:
        bn(i.type) && _a(i);
        break;
      case 4:
        bc(i, i.stateNode.containerInfo);
        break;
      case 10:
        var c = i.type._context,
          d = i.memoizedProps.value;
        (Lt(Ea, c._currentValue), (c._currentValue = d));
        break;
      case 13:
        if (((c = i.memoizedState), c !== null))
          return c.dehydrated !== null
            ? (Lt(kt, kt.current & 1), (i.flags |= 128), null)
            : (o & i.child.childLanes) !== 0
              ? _h(t, i, o)
              : (Lt(kt, kt.current & 1), (t = Pi(t, i, o)), t !== null ? t.sibling : null);
        Lt(kt, kt.current & 1);
        break;
      case 19:
        if (((c = (o & i.childLanes) !== 0), (t.flags & 128) !== 0)) {
          if (c) return xh(t, i, o);
          i.flags |= 128;
        }
        if (
          ((d = i.memoizedState),
          d !== null && ((d.rendering = null), (d.tail = null), (d.lastEffect = null)),
          Lt(kt, kt.current),
          c)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((i.lanes = 0), dh(t, i, o));
    }
    return Pi(t, i, o);
  }
  var yh, Zc, Sh, Mh;
  ((yh = function (t, i) {
    for (var o = i.child; o !== null;) {
      if (o.tag === 5 || o.tag === 6) t.appendChild(o.stateNode);
      else if (o.tag !== 4 && o.child !== null) {
        ((o.child.return = o), (o = o.child));
        continue;
      }
      if (o === i) break;
      for (; o.sibling === null;) {
        if (o.return === null || o.return === i) return;
        o = o.return;
      }
      ((o.sibling.return = o.return), (o = o.sibling));
    }
  }),
    (Zc = function () {}),
    (Sh = function (t, i, o, c) {
      var d = t.memoizedProps;
      if (d !== c) {
        ((t = i.stateNode), Lr(_i.current));
        var p = null;
        switch (o) {
          case "input":
            ((d = he(t, d)), (c = he(t, c)), (p = []));
            break;
          case "select":
            ((d = j({}, d, { value: void 0 })), (c = j({}, c, { value: void 0 })), (p = []));
            break;
          case "textarea":
            ((d = Se(t, d)), (c = Se(t, c)), (p = []));
            break;
          default:
            typeof d.onClick != "function" && typeof c.onClick == "function" && (t.onclick = pa);
        }
        it(o, c);
        var M;
        o = null;
        for (re in d)
          if (!c.hasOwnProperty(re) && d.hasOwnProperty(re) && d[re] != null)
            if (re === "style") {
              var U = d[re];
              for (M in U) U.hasOwnProperty(M) && (o || (o = {}), (o[M] = ""));
            } else
              re !== "dangerouslySetInnerHTML" &&
                re !== "children" &&
                re !== "suppressContentEditableWarning" &&
                re !== "suppressHydrationWarning" &&
                re !== "autoFocus" &&
                (a.hasOwnProperty(re) ? p || (p = []) : (p = p || []).push(re, null));
        for (re in c) {
          var O = c[re];
          if (
            ((U = d != null ? d[re] : void 0),
            c.hasOwnProperty(re) && O !== U && (O != null || U != null))
          )
            if (re === "style")
              if (U) {
                for (M in U)
                  !U.hasOwnProperty(M) ||
                    (O && O.hasOwnProperty(M)) ||
                    (o || (o = {}), (o[M] = ""));
                for (M in O) O.hasOwnProperty(M) && U[M] !== O[M] && (o || (o = {}), (o[M] = O[M]));
              } else (o || (p || (p = []), p.push(re, o)), (o = O));
            else
              re === "dangerouslySetInnerHTML"
                ? ((O = O ? O.__html : void 0),
                  (U = U ? U.__html : void 0),
                  O != null && U !== O && (p = p || []).push(re, O))
                : re === "children"
                  ? (typeof O != "string" && typeof O != "number") || (p = p || []).push(re, "" + O)
                  : re !== "suppressContentEditableWarning" &&
                    re !== "suppressHydrationWarning" &&
                    (a.hasOwnProperty(re)
                      ? (O != null && re === "onScroll" && Dt("scroll", t),
                        p || U === O || (p = []))
                      : (p = p || []).push(re, O));
        }
        o && (p = p || []).push("style", o);
        var re = p;
        (i.updateQueue = re) && (i.flags |= 4);
      }
    }),
    (Mh = function (t, i, o, c) {
      o !== c && (i.flags |= 4);
    }));
  function wo(t, i) {
    if (!Ot)
      switch (t.tailMode) {
        case "hidden":
          i = t.tail;
          for (var o = null; i !== null;) (i.alternate !== null && (o = i), (i = i.sibling));
          o === null ? (t.tail = null) : (o.sibling = null);
          break;
        case "collapsed":
          o = t.tail;
          for (var c = null; o !== null;) (o.alternate !== null && (c = o), (o = o.sibling));
          c === null
            ? i || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (c.sibling = null);
      }
  }
  function hn(t) {
    var i = t.alternate !== null && t.alternate.child === t.child,
      o = 0,
      c = 0;
    if (i)
      for (var d = t.child; d !== null;)
        ((o |= d.lanes | d.childLanes),
          (c |= d.subtreeFlags & 14680064),
          (c |= d.flags & 14680064),
          (d.return = t),
          (d = d.sibling));
    else
      for (d = t.child; d !== null;)
        ((o |= d.lanes | d.childLanes),
          (c |= d.subtreeFlags),
          (c |= d.flags),
          (d.return = t),
          (d = d.sibling));
    return ((t.subtreeFlags |= c), (t.childLanes = o), i);
  }
  function B_(t, i, o) {
    var c = i.pendingProps;
    switch ((xc(i), i.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (hn(i), null);
      case 1:
        return (bn(i.type) && ga(), hn(i), null);
      case 3:
        return (
          (c = i.stateNode),
          ps(),
          Nt(Cn),
          Nt(fn),
          Dc(),
          c.pendingContext && ((c.context = c.pendingContext), (c.pendingContext = null)),
          (t === null || t.child === null) &&
            (Sa(i)
              ? (i.flags |= 4)
              : t === null ||
                (t.memoizedState.isDehydrated && (i.flags & 256) === 0) ||
                ((i.flags |= 1024), ii !== null && (lu(ii), (ii = null)))),
          Zc(t, i),
          hn(i),
          null
        );
      case 5:
        Pc(i);
        var d = Lr(yo.current);
        if (((o = i.type), t !== null && i.stateNode != null))
          (Sh(t, i, o, c, d), t.ref !== i.ref && ((i.flags |= 512), (i.flags |= 2097152)));
        else {
          if (!c) {
            if (i.stateNode === null) throw Error(n(166));
            return (hn(i), null);
          }
          if (((t = Lr(_i.current)), Sa(i))) {
            ((c = i.stateNode), (o = i.type));
            var p = i.memoizedProps;
            switch (((c[gi] = i), (c[mo] = p), (t = (i.mode & 1) !== 0), o)) {
              case "dialog":
                (Dt("cancel", c), Dt("close", c));
                break;
              case "iframe":
              case "object":
              case "embed":
                Dt("load", c);
                break;
              case "video":
              case "audio":
                for (d = 0; d < fo.length; d++) Dt(fo[d], c);
                break;
              case "source":
                Dt("error", c);
                break;
              case "img":
              case "image":
              case "link":
                (Dt("error", c), Dt("load", c));
                break;
              case "details":
                Dt("toggle", c);
                break;
              case "input":
                (qe(c, p), Dt("invalid", c));
                break;
              case "select":
                ((c._wrapperState = { wasMultiple: !!p.multiple }), Dt("invalid", c));
                break;
              case "textarea":
                (xe(c, p), Dt("invalid", c));
            }
            (it(o, p), (d = null));
            for (var M in p)
              if (p.hasOwnProperty(M)) {
                var U = p[M];
                M === "children"
                  ? typeof U == "string"
                    ? c.textContent !== U &&
                      (p.suppressHydrationWarning !== !0 && ha(c.textContent, U, t),
                      (d = ["children", U]))
                    : typeof U == "number" &&
                      c.textContent !== "" + U &&
                      (p.suppressHydrationWarning !== !0 && ha(c.textContent, U, t),
                      (d = ["children", "" + U]))
                  : a.hasOwnProperty(M) && U != null && M === "onScroll" && Dt("scroll", c);
              }
            switch (o) {
              case "input":
                (fe(c), st(c, p, !0));
                break;
              case "textarea":
                (fe(c), We(c));
                break;
              case "select":
              case "option":
                break;
              default:
                typeof p.onClick == "function" && (c.onclick = pa);
            }
            ((c = d), (i.updateQueue = c), c !== null && (i.flags |= 4));
          } else {
            ((M = d.nodeType === 9 ? d : d.ownerDocument),
              t === "http://www.w3.org/1999/xhtml" && (t = Le(o)),
              t === "http://www.w3.org/1999/xhtml"
                ? o === "script"
                  ? ((t = M.createElement("div")),
                    (t.innerHTML = "<script><\/script>"),
                    (t = t.removeChild(t.firstChild)))
                  : typeof c.is == "string"
                    ? (t = M.createElement(o, { is: c.is }))
                    : ((t = M.createElement(o)),
                      o === "select" &&
                        ((M = t), c.multiple ? (M.multiple = !0) : c.size && (M.size = c.size)))
                : (t = M.createElementNS(t, o)),
              (t[gi] = i),
              (t[mo] = c),
              yh(t, i, !1, !1),
              (i.stateNode = t));
            e: {
              switch (((M = vt(o, c)), o)) {
                case "dialog":
                  (Dt("cancel", t), Dt("close", t), (d = c));
                  break;
                case "iframe":
                case "object":
                case "embed":
                  (Dt("load", t), (d = c));
                  break;
                case "video":
                case "audio":
                  for (d = 0; d < fo.length; d++) Dt(fo[d], t);
                  d = c;
                  break;
                case "source":
                  (Dt("error", t), (d = c));
                  break;
                case "img":
                case "image":
                case "link":
                  (Dt("error", t), Dt("load", t), (d = c));
                  break;
                case "details":
                  (Dt("toggle", t), (d = c));
                  break;
                case "input":
                  (qe(t, c), (d = he(t, c)), Dt("invalid", t));
                  break;
                case "option":
                  d = c;
                  break;
                case "select":
                  ((t._wrapperState = { wasMultiple: !!c.multiple }),
                    (d = j({}, c, { value: void 0 })),
                    Dt("invalid", t));
                  break;
                case "textarea":
                  (xe(t, c), (d = Se(t, c)), Dt("invalid", t));
                  break;
                default:
                  d = c;
              }
              (it(o, d), (U = d));
              for (p in U)
                if (U.hasOwnProperty(p)) {
                  var O = U[p];
                  p === "style"
                    ? je(t, O)
                    : p === "dangerouslySetInnerHTML"
                      ? ((O = O ? O.__html : void 0), O != null && ot(t, O))
                      : p === "children"
                        ? typeof O == "string"
                          ? (o !== "textarea" || O !== "") && ve(t, O)
                          : typeof O == "number" && ve(t, "" + O)
                        : p !== "suppressContentEditableWarning" &&
                          p !== "suppressHydrationWarning" &&
                          p !== "autoFocus" &&
                          (a.hasOwnProperty(p)
                            ? O != null && p === "onScroll" && Dt("scroll", t)
                            : O != null && R(t, p, O, M));
                }
              switch (o) {
                case "input":
                  (fe(t), st(t, c, !1));
                  break;
                case "textarea":
                  (fe(t), We(t));
                  break;
                case "option":
                  c.value != null && t.setAttribute("value", "" + Pe(c.value));
                  break;
                case "select":
                  ((t.multiple = !!c.multiple),
                    (p = c.value),
                    p != null
                      ? te(t, !!c.multiple, p, !1)
                      : c.defaultValue != null && te(t, !!c.multiple, c.defaultValue, !0));
                  break;
                default:
                  typeof d.onClick == "function" && (t.onclick = pa);
              }
              switch (o) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  c = !!c.autoFocus;
                  break e;
                case "img":
                  c = !0;
                  break e;
                default:
                  c = !1;
              }
            }
            c && (i.flags |= 4);
          }
          i.ref !== null && ((i.flags |= 512), (i.flags |= 2097152));
        }
        return (hn(i), null);
      case 6:
        if (t && i.stateNode != null) Mh(t, i, t.memoizedProps, c);
        else {
          if (typeof c != "string" && i.stateNode === null) throw Error(n(166));
          if (((o = Lr(yo.current)), Lr(_i.current), Sa(i))) {
            if (
              ((c = i.stateNode),
              (o = i.memoizedProps),
              (c[gi] = i),
              (p = c.nodeValue !== o) && ((t = Fn), t !== null))
            )
              switch (t.tag) {
                case 3:
                  ha(c.nodeValue, o, (t.mode & 1) !== 0);
                  break;
                case 5:
                  t.memoizedProps.suppressHydrationWarning !== !0 &&
                    ha(c.nodeValue, o, (t.mode & 1) !== 0);
              }
            p && (i.flags |= 4);
          } else
            ((c = (o.nodeType === 9 ? o : o.ownerDocument).createTextNode(c)),
              (c[gi] = i),
              (i.stateNode = c));
        }
        return (hn(i), null);
      case 13:
        if (
          (Nt(kt),
          (c = i.memoizedState),
          t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (Ot && On !== null && (i.mode & 1) !== 0 && (i.flags & 128) === 0)
            (wd(), us(), (i.flags |= 98560), (p = !1));
          else if (((p = Sa(i)), c !== null && c.dehydrated !== null)) {
            if (t === null) {
              if (!p) throw Error(n(318));
              if (((p = i.memoizedState), (p = p !== null ? p.dehydrated : null), !p))
                throw Error(n(317));
              p[gi] = i;
            } else (us(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
            (hn(i), (p = !1));
          } else (ii !== null && (lu(ii), (ii = null)), (p = !0));
          if (!p) return i.flags & 65536 ? i : null;
        }
        return (i.flags & 128) !== 0
          ? ((i.lanes = o), i)
          : ((c = c !== null),
            c !== (t !== null && t.memoizedState !== null) &&
              c &&
              ((i.child.flags |= 8192),
              (i.mode & 1) !== 0 &&
                (t === null || (kt.current & 1) !== 0 ? $t === 0 && ($t = 3) : fu())),
            i.updateQueue !== null && (i.flags |= 4),
            hn(i),
            null);
      case 4:
        return (ps(), Zc(t, i), t === null && ho(i.stateNode.containerInfo), hn(i), null);
      case 10:
        return (wc(i.type._context), hn(i), null);
      case 17:
        return (bn(i.type) && ga(), hn(i), null);
      case 19:
        if ((Nt(kt), (p = i.memoizedState), p === null)) return (hn(i), null);
        if (((c = (i.flags & 128) !== 0), (M = p.rendering), M === null))
          if (c) wo(p, !1);
          else {
            if ($t !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = i.child; t !== null;) {
                if (((M = Ra(t)), M !== null)) {
                  for (
                    i.flags |= 128,
                      wo(p, !1),
                      c = M.updateQueue,
                      c !== null && ((i.updateQueue = c), (i.flags |= 4)),
                      i.subtreeFlags = 0,
                      c = o,
                      o = i.child;
                    o !== null;
                  )
                    ((p = o),
                      (t = c),
                      (p.flags &= 14680066),
                      (M = p.alternate),
                      M === null
                        ? ((p.childLanes = 0),
                          (p.lanes = t),
                          (p.child = null),
                          (p.subtreeFlags = 0),
                          (p.memoizedProps = null),
                          (p.memoizedState = null),
                          (p.updateQueue = null),
                          (p.dependencies = null),
                          (p.stateNode = null))
                        : ((p.childLanes = M.childLanes),
                          (p.lanes = M.lanes),
                          (p.child = M.child),
                          (p.subtreeFlags = 0),
                          (p.deletions = null),
                          (p.memoizedProps = M.memoizedProps),
                          (p.memoizedState = M.memoizedState),
                          (p.updateQueue = M.updateQueue),
                          (p.type = M.type),
                          (t = M.dependencies),
                          (p.dependencies =
                            t === null ? null : { lanes: t.lanes, firstContext: t.firstContext })),
                      (o = o.sibling));
                  return (Lt(kt, (kt.current & 1) | 2), i.child);
                }
                t = t.sibling;
              }
            p.tail !== null &&
              Ie() > vs &&
              ((i.flags |= 128), (c = !0), wo(p, !1), (i.lanes = 4194304));
          }
        else {
          if (!c)
            if (((t = Ra(M)), t !== null)) {
              if (
                ((i.flags |= 128),
                (c = !0),
                (o = t.updateQueue),
                o !== null && ((i.updateQueue = o), (i.flags |= 4)),
                wo(p, !0),
                p.tail === null && p.tailMode === "hidden" && !M.alternate && !Ot)
              )
                return (hn(i), null);
            } else
              2 * Ie() - p.renderingStartTime > vs &&
                o !== 1073741824 &&
                ((i.flags |= 128), (c = !0), wo(p, !1), (i.lanes = 4194304));
          p.isBackwards
            ? ((M.sibling = i.child), (i.child = M))
            : ((o = p.last), o !== null ? (o.sibling = M) : (i.child = M), (p.last = M));
        }
        return p.tail !== null
          ? ((i = p.tail),
            (p.rendering = i),
            (p.tail = i.sibling),
            (p.renderingStartTime = Ie()),
            (i.sibling = null),
            (o = kt.current),
            Lt(kt, c ? (o & 1) | 2 : o & 1),
            i)
          : (hn(i), null);
      case 22:
      case 23:
        return (
          uu(),
          (c = i.memoizedState !== null),
          t !== null && (t.memoizedState !== null) !== c && (i.flags |= 8192),
          c && (i.mode & 1) !== 0
            ? (kn & 1073741824) !== 0 && (hn(i), i.subtreeFlags & 6 && (i.flags |= 8192))
            : hn(i),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(n(156, i.tag));
  }
  function H_(t, i) {
    switch ((xc(i), i.tag)) {
      case 1:
        return (
          bn(i.type) && ga(), (t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null
        );
      case 3:
        return (
          ps(),
          Nt(Cn),
          Nt(fn),
          Dc(),
          (t = i.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((i.flags = (t & -65537) | 128), i) : null
        );
      case 5:
        return (Pc(i), null);
      case 13:
        if ((Nt(kt), (t = i.memoizedState), t !== null && t.dehydrated !== null)) {
          if (i.alternate === null) throw Error(n(340));
          us();
        }
        return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
      case 19:
        return (Nt(kt), null);
      case 4:
        return (ps(), null);
      case 10:
        return (wc(i.type._context), null);
      case 22:
      case 23:
        return (uu(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Fa = !1,
    pn = !1,
    G_ = typeof WeakSet == "function" ? WeakSet : Set,
    Oe = null;
  function gs(t, i) {
    var o = t.ref;
    if (o !== null)
      if (typeof o == "function")
        try {
          o(null);
        } catch (c) {
          Gt(t, i, c);
        }
      else o.current = null;
  }
  function Qc(t, i, o) {
    try {
      o();
    } catch (c) {
      Gt(t, i, c);
    }
  }
  var Eh = !1;
  function V_(t, i) {
    if (((uc = na), (t = td()), nc(t))) {
      if ("selectionStart" in t) var o = { start: t.selectionStart, end: t.selectionEnd };
      else
        e: {
          o = ((o = t.ownerDocument) && o.defaultView) || window;
          var c = o.getSelection && o.getSelection();
          if (c && c.rangeCount !== 0) {
            o = c.anchorNode;
            var d = c.anchorOffset,
              p = c.focusNode;
            c = c.focusOffset;
            try {
              (o.nodeType, p.nodeType);
            } catch {
              o = null;
              break e;
            }
            var M = 0,
              U = -1,
              O = -1,
              re = 0,
              _e = 0,
              ye = t,
              ge = null;
            t: for (;;) {
              for (
                var Ne;
                ye !== o || (d !== 0 && ye.nodeType !== 3) || (U = M + d),
                  ye !== p || (c !== 0 && ye.nodeType !== 3) || (O = M + c),
                  ye.nodeType === 3 && (M += ye.nodeValue.length),
                  (Ne = ye.firstChild) !== null;
              )
                ((ge = ye), (ye = Ne));
              for (;;) {
                if (ye === t) break t;
                if (
                  (ge === o && ++re === d && (U = M),
                  ge === p && ++_e === c && (O = M),
                  (Ne = ye.nextSibling) !== null)
                )
                  break;
                ((ye = ge), (ge = ye.parentNode));
              }
              ye = Ne;
            }
            o = U === -1 || O === -1 ? null : { start: U, end: O };
          } else o = null;
        }
      o = o || { start: 0, end: 0 };
    } else o = null;
    for (fc = { focusedElem: t, selectionRange: o }, na = !1, Oe = i; Oe !== null;)
      if (((i = Oe), (t = i.child), (i.subtreeFlags & 1028) !== 0 && t !== null))
        ((t.return = i), (Oe = t));
      else
        for (; Oe !== null;) {
          i = Oe;
          try {
            var Be = i.alternate;
            if ((i.flags & 1024) !== 0)
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (Be !== null) {
                    var Ge = Be.memoizedProps,
                      Wt = Be.memoizedState,
                      Y = i.stateNode,
                      G = Y.getSnapshotBeforeUpdate(
                        i.elementType === i.type ? Ge : ri(i.type, Ge),
                        Wt,
                      );
                    Y.__reactInternalSnapshotBeforeUpdate = G;
                  }
                  break;
                case 3:
                  var Q = i.stateNode.containerInfo;
                  Q.nodeType === 1
                    ? (Q.textContent = "")
                    : Q.nodeType === 9 && Q.documentElement && Q.removeChild(Q.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(n(163));
              }
          } catch (we) {
            Gt(i, i.return, we);
          }
          if (((t = i.sibling), t !== null)) {
            ((t.return = i.return), (Oe = t));
            break;
          }
          Oe = i.return;
        }
    return ((Be = Eh), (Eh = !1), Be);
  }
  function Ao(t, i, o) {
    var c = i.updateQueue;
    if (((c = c !== null ? c.lastEffect : null), c !== null)) {
      var d = (c = c.next);
      do {
        if ((d.tag & t) === t) {
          var p = d.destroy;
          ((d.destroy = void 0), p !== void 0 && Qc(i, o, p));
        }
        d = d.next;
      } while (d !== c);
    }
  }
  function Oa(t, i) {
    if (((i = i.updateQueue), (i = i !== null ? i.lastEffect : null), i !== null)) {
      var o = (i = i.next);
      do {
        if ((o.tag & t) === t) {
          var c = o.create;
          o.destroy = c();
        }
        o = o.next;
      } while (o !== i);
    }
  }
  function Jc(t) {
    var i = t.ref;
    if (i !== null) {
      var o = t.stateNode;
      switch (t.tag) {
        case 5:
          t = o;
          break;
        default:
          t = o;
      }
      typeof i == "function" ? i(t) : (i.current = t);
    }
  }
  function Th(t) {
    var i = t.alternate;
    (i !== null && ((t.alternate = null), Th(i)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 &&
        ((i = t.stateNode),
        i !== null && (delete i[gi], delete i[mo], delete i[mc], delete i[w_], delete i[A_])),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  function wh(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 4;
  }
  function Ah(t) {
    e: for (;;) {
      for (; t.sibling === null;) {
        if (t.return === null || wh(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if (t.flags & 2 || t.child === null || t.tag === 4) continue e;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function eu(t, i, o) {
    var c = t.tag;
    if (c === 5 || c === 6)
      ((t = t.stateNode),
        i
          ? o.nodeType === 8
            ? o.parentNode.insertBefore(t, i)
            : o.insertBefore(t, i)
          : (o.nodeType === 8
              ? ((i = o.parentNode), i.insertBefore(t, o))
              : ((i = o), i.appendChild(t)),
            (o = o._reactRootContainer),
            o != null || i.onclick !== null || (i.onclick = pa)));
    else if (c !== 4 && ((t = t.child), t !== null))
      for (eu(t, i, o), t = t.sibling; t !== null;) (eu(t, i, o), (t = t.sibling));
  }
  function tu(t, i, o) {
    var c = t.tag;
    if (c === 5 || c === 6) ((t = t.stateNode), i ? o.insertBefore(t, i) : o.appendChild(t));
    else if (c !== 4 && ((t = t.child), t !== null))
      for (tu(t, i, o), t = t.sibling; t !== null;) (tu(t, i, o), (t = t.sibling));
  }
  var on = null,
    si = !1;
  function ir(t, i, o) {
    for (o = o.child; o !== null;) (Rh(t, i, o), (o = o.sibling));
  }
  function Rh(t, i, o) {
    if (gt && typeof gt.onCommitFiberUnmount == "function")
      try {
        gt.onCommitFiberUnmount(An, o);
      } catch {}
    switch (o.tag) {
      case 5:
        pn || gs(o, i);
      case 6:
        var c = on,
          d = si;
        ((on = null),
          ir(t, i, o),
          (on = c),
          (si = d),
          on !== null &&
            (si
              ? ((t = on),
                (o = o.stateNode),
                t.nodeType === 8 ? t.parentNode.removeChild(o) : t.removeChild(o))
              : on.removeChild(o.stateNode)));
        break;
      case 18:
        on !== null &&
          (si
            ? ((t = on),
              (o = o.stateNode),
              t.nodeType === 8 ? pc(t.parentNode, o) : t.nodeType === 1 && pc(t, o),
              io(t))
            : pc(on, o.stateNode));
        break;
      case 4:
        ((c = on),
          (d = si),
          (on = o.stateNode.containerInfo),
          (si = !0),
          ir(t, i, o),
          (on = c),
          (si = d));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!pn && ((c = o.updateQueue), c !== null && ((c = c.lastEffect), c !== null))) {
          d = c = c.next;
          do {
            var p = d,
              M = p.destroy;
            ((p = p.tag),
              M !== void 0 && ((p & 2) !== 0 || (p & 4) !== 0) && Qc(o, i, M),
              (d = d.next));
          } while (d !== c);
        }
        ir(t, i, o);
        break;
      case 1:
        if (!pn && (gs(o, i), (c = o.stateNode), typeof c.componentWillUnmount == "function"))
          try {
            ((c.props = o.memoizedProps), (c.state = o.memoizedState), c.componentWillUnmount());
          } catch (U) {
            Gt(o, i, U);
          }
        ir(t, i, o);
        break;
      case 21:
        ir(t, i, o);
        break;
      case 22:
        o.mode & 1
          ? ((pn = (c = pn) || o.memoizedState !== null), ir(t, i, o), (pn = c))
          : ir(t, i, o);
        break;
      default:
        ir(t, i, o);
    }
  }
  function Ch(t) {
    var i = t.updateQueue;
    if (i !== null) {
      t.updateQueue = null;
      var o = t.stateNode;
      (o === null && (o = t.stateNode = new G_()),
        i.forEach(function (c) {
          var d = Q_.bind(null, t, c);
          o.has(c) || (o.add(c), c.then(d, d));
        }));
    }
  }
  function oi(t, i) {
    var o = i.deletions;
    if (o !== null)
      for (var c = 0; c < o.length; c++) {
        var d = o[c];
        try {
          var p = t,
            M = i,
            U = M;
          e: for (; U !== null;) {
            switch (U.tag) {
              case 5:
                ((on = U.stateNode), (si = !1));
                break e;
              case 3:
                ((on = U.stateNode.containerInfo), (si = !0));
                break e;
              case 4:
                ((on = U.stateNode.containerInfo), (si = !0));
                break e;
            }
            U = U.return;
          }
          if (on === null) throw Error(n(160));
          (Rh(p, M, d), (on = null), (si = !1));
          var O = d.alternate;
          (O !== null && (O.return = null), (d.return = null));
        } catch (re) {
          Gt(d, i, re);
        }
      }
    if (i.subtreeFlags & 12854) for (i = i.child; i !== null;) (bh(i, t), (i = i.sibling));
  }
  function bh(t, i) {
    var o = t.alternate,
      c = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((oi(i, t), xi(t), c & 4)) {
          try {
            (Ao(3, t, t.return), Oa(3, t));
          } catch (Ge) {
            Gt(t, t.return, Ge);
          }
          try {
            Ao(5, t, t.return);
          } catch (Ge) {
            Gt(t, t.return, Ge);
          }
        }
        break;
      case 1:
        (oi(i, t), xi(t), c & 512 && o !== null && gs(o, o.return));
        break;
      case 5:
        if ((oi(i, t), xi(t), c & 512 && o !== null && gs(o, o.return), t.flags & 32)) {
          var d = t.stateNode;
          try {
            ve(d, "");
          } catch (Ge) {
            Gt(t, t.return, Ge);
          }
        }
        if (c & 4 && ((d = t.stateNode), d != null)) {
          var p = t.memoizedProps,
            M = o !== null ? o.memoizedProps : p,
            U = t.type,
            O = t.updateQueue;
          if (((t.updateQueue = null), O !== null))
            try {
              (U === "input" && p.type === "radio" && p.name != null && Fe(d, p), vt(U, M));
              var re = vt(U, p);
              for (M = 0; M < O.length; M += 2) {
                var _e = O[M],
                  ye = O[M + 1];
                _e === "style"
                  ? je(d, ye)
                  : _e === "dangerouslySetInnerHTML"
                    ? ot(d, ye)
                    : _e === "children"
                      ? ve(d, ye)
                      : R(d, _e, ye, re);
              }
              switch (U) {
                case "input":
                  Ct(d, p);
                  break;
                case "textarea":
                  Ee(d, p);
                  break;
                case "select":
                  var ge = d._wrapperState.wasMultiple;
                  d._wrapperState.wasMultiple = !!p.multiple;
                  var Ne = p.value;
                  Ne != null
                    ? te(d, !!p.multiple, Ne, !1)
                    : ge !== !!p.multiple &&
                      (p.defaultValue != null
                        ? te(d, !!p.multiple, p.defaultValue, !0)
                        : te(d, !!p.multiple, p.multiple ? [] : "", !1));
              }
              d[mo] = p;
            } catch (Ge) {
              Gt(t, t.return, Ge);
            }
        }
        break;
      case 6:
        if ((oi(i, t), xi(t), c & 4)) {
          if (t.stateNode === null) throw Error(n(162));
          ((d = t.stateNode), (p = t.memoizedProps));
          try {
            d.nodeValue = p;
          } catch (Ge) {
            Gt(t, t.return, Ge);
          }
        }
        break;
      case 3:
        if ((oi(i, t), xi(t), c & 4 && o !== null && o.memoizedState.isDehydrated))
          try {
            io(i.containerInfo);
          } catch (Ge) {
            Gt(t, t.return, Ge);
          }
        break;
      case 4:
        (oi(i, t), xi(t));
        break;
      case 13:
        (oi(i, t),
          xi(t),
          (d = t.child),
          d.flags & 8192 &&
            ((p = d.memoizedState !== null),
            (d.stateNode.isHidden = p),
            !p || (d.alternate !== null && d.alternate.memoizedState !== null) || (ru = Ie())),
          c & 4 && Ch(t));
        break;
      case 22:
        if (
          ((_e = o !== null && o.memoizedState !== null),
          t.mode & 1 ? ((pn = (re = pn) || _e), oi(i, t), (pn = re)) : oi(i, t),
          xi(t),
          c & 8192)
        ) {
          if (
            ((re = t.memoizedState !== null),
            (t.stateNode.isHidden = re) && !_e && (t.mode & 1) !== 0)
          )
            for (Oe = t, _e = t.child; _e !== null;) {
              for (ye = Oe = _e; Oe !== null;) {
                switch (((ge = Oe), (Ne = ge.child), ge.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Ao(4, ge, ge.return);
                    break;
                  case 1:
                    gs(ge, ge.return);
                    var Be = ge.stateNode;
                    if (typeof Be.componentWillUnmount == "function") {
                      ((c = ge), (o = ge.return));
                      try {
                        ((i = c),
                          (Be.props = i.memoizedProps),
                          (Be.state = i.memoizedState),
                          Be.componentWillUnmount());
                      } catch (Ge) {
                        Gt(c, o, Ge);
                      }
                    }
                    break;
                  case 5:
                    gs(ge, ge.return);
                    break;
                  case 22:
                    if (ge.memoizedState !== null) {
                      Dh(ye);
                      continue;
                    }
                }
                Ne !== null ? ((Ne.return = ge), (Oe = Ne)) : Dh(ye);
              }
              _e = _e.sibling;
            }
          e: for (_e = null, ye = t; ;) {
            if (ye.tag === 5) {
              if (_e === null) {
                _e = ye;
                try {
                  ((d = ye.stateNode),
                    re
                      ? ((p = d.style),
                        typeof p.setProperty == "function"
                          ? p.setProperty("display", "none", "important")
                          : (p.display = "none"))
                      : ((U = ye.stateNode),
                        (O = ye.memoizedProps.style),
                        (M = O != null && O.hasOwnProperty("display") ? O.display : null),
                        (U.style.display = tt("display", M))));
                } catch (Ge) {
                  Gt(t, t.return, Ge);
                }
              }
            } else if (ye.tag === 6) {
              if (_e === null)
                try {
                  ye.stateNode.nodeValue = re ? "" : ye.memoizedProps;
                } catch (Ge) {
                  Gt(t, t.return, Ge);
                }
            } else if (
              ((ye.tag !== 22 && ye.tag !== 23) || ye.memoizedState === null || ye === t) &&
              ye.child !== null
            ) {
              ((ye.child.return = ye), (ye = ye.child));
              continue;
            }
            if (ye === t) break e;
            for (; ye.sibling === null;) {
              if (ye.return === null || ye.return === t) break e;
              (_e === ye && (_e = null), (ye = ye.return));
            }
            (_e === ye && (_e = null), (ye.sibling.return = ye.return), (ye = ye.sibling));
          }
        }
        break;
      case 19:
        (oi(i, t), xi(t), c & 4 && Ch(t));
        break;
      case 21:
        break;
      default:
        (oi(i, t), xi(t));
    }
  }
  function xi(t) {
    var i = t.flags;
    if (i & 2) {
      try {
        e: {
          for (var o = t.return; o !== null;) {
            if (wh(o)) {
              var c = o;
              break e;
            }
            o = o.return;
          }
          throw Error(n(160));
        }
        switch (c.tag) {
          case 5:
            var d = c.stateNode;
            c.flags & 32 && (ve(d, ""), (c.flags &= -33));
            var p = Ah(t);
            tu(t, p, d);
            break;
          case 3:
          case 4:
            var M = c.stateNode.containerInfo,
              U = Ah(t);
            eu(t, U, M);
            break;
          default:
            throw Error(n(161));
        }
      } catch (O) {
        Gt(t, t.return, O);
      }
      t.flags &= -3;
    }
    i & 4096 && (t.flags &= -4097);
  }
  function W_(t, i, o) {
    ((Oe = t), Ph(t));
  }
  function Ph(t, i, o) {
    for (var c = (t.mode & 1) !== 0; Oe !== null;) {
      var d = Oe,
        p = d.child;
      if (d.tag === 22 && c) {
        var M = d.memoizedState !== null || Fa;
        if (!M) {
          var U = d.alternate,
            O = (U !== null && U.memoizedState !== null) || pn;
          U = Fa;
          var re = pn;
          if (((Fa = M), (pn = O) && !re))
            for (Oe = d; Oe !== null;)
              ((M = Oe),
                (O = M.child),
                M.tag === 22 && M.memoizedState !== null
                  ? Nh(d)
                  : O !== null
                    ? ((O.return = M), (Oe = O))
                    : Nh(d));
          for (; p !== null;) ((Oe = p), Ph(p), (p = p.sibling));
          ((Oe = d), (Fa = U), (pn = re));
        }
        Lh(t);
      } else (d.subtreeFlags & 8772) !== 0 && p !== null ? ((p.return = d), (Oe = p)) : Lh(t);
    }
  }
  function Lh(t) {
    for (; Oe !== null;) {
      var i = Oe;
      if ((i.flags & 8772) !== 0) {
        var o = i.alternate;
        try {
          if ((i.flags & 8772) !== 0)
            switch (i.tag) {
              case 0:
              case 11:
              case 15:
                pn || Oa(5, i);
                break;
              case 1:
                var c = i.stateNode;
                if (i.flags & 4 && !pn)
                  if (o === null) c.componentDidMount();
                  else {
                    var d =
                      i.elementType === i.type ? o.memoizedProps : ri(i.type, o.memoizedProps);
                    c.componentDidUpdate(d, o.memoizedState, c.__reactInternalSnapshotBeforeUpdate);
                  }
                var p = i.updateQueue;
                p !== null && Dd(i, p, c);
                break;
              case 3:
                var M = i.updateQueue;
                if (M !== null) {
                  if (((o = null), i.child !== null))
                    switch (i.child.tag) {
                      case 5:
                        o = i.child.stateNode;
                        break;
                      case 1:
                        o = i.child.stateNode;
                    }
                  Dd(i, M, o);
                }
                break;
              case 5:
                var U = i.stateNode;
                if (o === null && i.flags & 4) {
                  o = U;
                  var O = i.memoizedProps;
                  switch (i.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      O.autoFocus && o.focus();
                      break;
                    case "img":
                      O.src && (o.src = O.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (i.memoizedState === null) {
                  var re = i.alternate;
                  if (re !== null) {
                    var _e = re.memoizedState;
                    if (_e !== null) {
                      var ye = _e.dehydrated;
                      ye !== null && io(ye);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(n(163));
            }
          pn || (i.flags & 512 && Jc(i));
        } catch (ge) {
          Gt(i, i.return, ge);
        }
      }
      if (i === t) {
        Oe = null;
        break;
      }
      if (((o = i.sibling), o !== null)) {
        ((o.return = i.return), (Oe = o));
        break;
      }
      Oe = i.return;
    }
  }
  function Dh(t) {
    for (; Oe !== null;) {
      var i = Oe;
      if (i === t) {
        Oe = null;
        break;
      }
      var o = i.sibling;
      if (o !== null) {
        ((o.return = i.return), (Oe = o));
        break;
      }
      Oe = i.return;
    }
  }
  function Nh(t) {
    for (; Oe !== null;) {
      var i = Oe;
      try {
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            var o = i.return;
            try {
              Oa(4, i);
            } catch (O) {
              Gt(i, o, O);
            }
            break;
          case 1:
            var c = i.stateNode;
            if (typeof c.componentDidMount == "function") {
              var d = i.return;
              try {
                c.componentDidMount();
              } catch (O) {
                Gt(i, d, O);
              }
            }
            var p = i.return;
            try {
              Jc(i);
            } catch (O) {
              Gt(i, p, O);
            }
            break;
          case 5:
            var M = i.return;
            try {
              Jc(i);
            } catch (O) {
              Gt(i, M, O);
            }
        }
      } catch (O) {
        Gt(i, i.return, O);
      }
      if (i === t) {
        Oe = null;
        break;
      }
      var U = i.sibling;
      if (U !== null) {
        ((U.return = i.return), (Oe = U));
        break;
      }
      Oe = i.return;
    }
  }
  var X_ = Math.ceil,
    ka = N.ReactCurrentDispatcher,
    nu = N.ReactCurrentOwner,
    Yn = N.ReactCurrentBatchConfig,
    xt = 0,
    nn = null,
    Xt = null,
    an = 0,
    kn = 0,
    _s = Qi(0),
    $t = 0,
    Ro = null,
    Nr = 0,
    za = 0,
    iu = 0,
    Co = null,
    Ln = null,
    ru = 0,
    vs = 1 / 0,
    Li = null,
    Ba = !1,
    su = null,
    rr = null,
    Ha = !1,
    sr = null,
    Ga = 0,
    bo = 0,
    ou = null,
    Va = -1,
    Wa = 0;
  function yn() {
    return (xt & 6) !== 0 ? Ie() : Va !== -1 ? Va : (Va = Ie());
  }
  function or(t) {
    return (t.mode & 1) === 0
      ? 1
      : (xt & 2) !== 0 && an !== 0
        ? an & -an
        : C_.transition !== null
          ? (Wa === 0 && (Wa = Jo()), Wa)
          : ((t = wt), t !== 0 || ((t = window.event), (t = t === void 0 ? 16 : If(t.type))), t);
  }
  function ai(t, i, o, c) {
    if (50 < bo) throw ((bo = 0), (ou = null), Error(n(185)));
    (Qs(t, o, c),
      ((xt & 2) === 0 || t !== nn) &&
        (t === nn && ((xt & 2) === 0 && (za |= o), $t === 4 && ar(t, an)),
        Dn(t, c),
        o === 1 && xt === 0 && (i.mode & 1) === 0 && ((vs = Ie() + 500), va && er())));
  }
  function Dn(t, i) {
    var o = t.callbackNode;
    Rn(t, i);
    var c = Vn(t, t === nn ? an : 0);
    if (c === 0) (o !== null && De(o), (t.callbackNode = null), (t.callbackPriority = 0));
    else if (((i = c & -c), t.callbackPriority !== i)) {
      if ((o != null && De(o), i === 1))
        (t.tag === 0 ? R_(Ih.bind(null, t)) : yd(Ih.bind(null, t)),
          E_(function () {
            (xt & 6) === 0 && er();
          }),
          (o = null));
      else {
        switch (Rf(c)) {
          case 1:
            o = nt;
            break;
          case 4:
            o = rt;
            break;
          case 16:
            o = Pt;
            break;
          case 536870912:
            o = Vt;
            break;
          default:
            o = Pt;
        }
        o = Vh(o, Uh.bind(null, t));
      }
      ((t.callbackPriority = i), (t.callbackNode = o));
    }
  }
  function Uh(t, i) {
    if (((Va = -1), (Wa = 0), (xt & 6) !== 0)) throw Error(n(327));
    var o = t.callbackNode;
    if (xs() && t.callbackNode !== o) return null;
    var c = Vn(t, t === nn ? an : 0);
    if (c === 0) return null;
    if ((c & 30) !== 0 || (c & t.expiredLanes) !== 0 || i) i = Xa(t, c);
    else {
      i = c;
      var d = xt;
      xt |= 2;
      var p = Oh();
      (nn !== t || an !== i) && ((Li = null), (vs = Ie() + 500), Ir(t, i));
      do
        try {
          Y_();
          break;
        } catch (U) {
          Fh(t, U);
        }
      while (!0);
      (Tc(), (ka.current = p), (xt = d), Xt !== null ? (i = 0) : ((nn = null), (an = 0), (i = $t)));
    }
    if (i !== 0) {
      if ((i === 2 && ((d = wr(t)), d !== 0 && ((c = d), (i = au(t, d)))), i === 1))
        throw ((o = Ro), Ir(t, 0), ar(t, c), Dn(t, Ie()), o);
      if (i === 6) ar(t, c);
      else {
        if (
          ((d = t.current.alternate),
          (c & 30) === 0 &&
            !j_(d) &&
            ((i = Xa(t, c)),
            i === 2 && ((p = wr(t)), p !== 0 && ((c = p), (i = au(t, p)))),
            i === 1))
        )
          throw ((o = Ro), Ir(t, 0), ar(t, c), Dn(t, Ie()), o);
        switch (((t.finishedWork = d), (t.finishedLanes = c), i)) {
          case 0:
          case 1:
            throw Error(n(345));
          case 2:
            Fr(t, Ln, Li);
            break;
          case 3:
            if ((ar(t, c), (c & 130023424) === c && ((i = ru + 500 - Ie()), 10 < i))) {
              if (Vn(t, 0) !== 0) break;
              if (((d = t.suspendedLanes), (d & c) !== c)) {
                (yn(), (t.pingedLanes |= t.suspendedLanes & d));
                break;
              }
              t.timeoutHandle = hc(Fr.bind(null, t, Ln, Li), i);
              break;
            }
            Fr(t, Ln, Li);
            break;
          case 4:
            if ((ar(t, c), (c & 4194240) === c)) break;
            for (i = t.eventTimes, d = -1; 0 < c;) {
              var M = 31 - vn(c);
              ((p = 1 << M), (M = i[M]), M > d && (d = M), (c &= ~p));
            }
            if (
              ((c = d),
              (c = Ie() - c),
              (c =
                (120 > c
                  ? 120
                  : 480 > c
                    ? 480
                    : 1080 > c
                      ? 1080
                      : 1920 > c
                        ? 1920
                        : 3e3 > c
                          ? 3e3
                          : 4320 > c
                            ? 4320
                            : 1960 * X_(c / 1960)) - c),
              10 < c)
            ) {
              t.timeoutHandle = hc(Fr.bind(null, t, Ln, Li), c);
              break;
            }
            Fr(t, Ln, Li);
            break;
          case 5:
            Fr(t, Ln, Li);
            break;
          default:
            throw Error(n(329));
        }
      }
    }
    return (Dn(t, Ie()), t.callbackNode === o ? Uh.bind(null, t) : null);
  }
  function au(t, i) {
    var o = Co;
    return (
      t.current.memoizedState.isDehydrated && (Ir(t, i).flags |= 256),
      (t = Xa(t, i)),
      t !== 2 && ((i = Ln), (Ln = o), i !== null && lu(i)),
      t
    );
  }
  function lu(t) {
    Ln === null ? (Ln = t) : Ln.push.apply(Ln, t);
  }
  function j_(t) {
    for (var i = t; ;) {
      if (i.flags & 16384) {
        var o = i.updateQueue;
        if (o !== null && ((o = o.stores), o !== null))
          for (var c = 0; c < o.length; c++) {
            var d = o[c],
              p = d.getSnapshot;
            d = d.value;
            try {
              if (!ni(p(), d)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((o = i.child), i.subtreeFlags & 16384 && o !== null)) ((o.return = i), (i = o));
      else {
        if (i === t) break;
        for (; i.sibling === null;) {
          if (i.return === null || i.return === t) return !0;
          i = i.return;
        }
        ((i.sibling.return = i.return), (i = i.sibling));
      }
    }
    return !0;
  }
  function ar(t, i) {
    for (
      i &= ~iu, i &= ~za, t.suspendedLanes |= i, t.pingedLanes &= ~i, t = t.expirationTimes;
      0 < i;
    ) {
      var o = 31 - vn(i),
        c = 1 << o;
      ((t[o] = -1), (i &= ~c));
    }
  }
  function Ih(t) {
    if ((xt & 6) !== 0) throw Error(n(327));
    xs();
    var i = Vn(t, 0);
    if ((i & 1) === 0) return (Dn(t, Ie()), null);
    var o = Xa(t, i);
    if (t.tag !== 0 && o === 2) {
      var c = wr(t);
      c !== 0 && ((i = c), (o = au(t, c)));
    }
    if (o === 1) throw ((o = Ro), Ir(t, 0), ar(t, i), Dn(t, Ie()), o);
    if (o === 6) throw Error(n(345));
    return (
      (t.finishedWork = t.current.alternate),
      (t.finishedLanes = i),
      Fr(t, Ln, Li),
      Dn(t, Ie()),
      null
    );
  }
  function cu(t, i) {
    var o = xt;
    xt |= 1;
    try {
      return t(i);
    } finally {
      ((xt = o), xt === 0 && ((vs = Ie() + 500), va && er()));
    }
  }
  function Ur(t) {
    sr !== null && sr.tag === 0 && (xt & 6) === 0 && xs();
    var i = xt;
    xt |= 1;
    var o = Yn.transition,
      c = wt;
    try {
      if (((Yn.transition = null), (wt = 1), t)) return t();
    } finally {
      ((wt = c), (Yn.transition = o), (xt = i), (xt & 6) === 0 && er());
    }
  }
  function uu() {
    ((kn = _s.current), Nt(_s));
  }
  function Ir(t, i) {
    ((t.finishedWork = null), (t.finishedLanes = 0));
    var o = t.timeoutHandle;
    if ((o !== -1 && ((t.timeoutHandle = -1), M_(o)), Xt !== null))
      for (o = Xt.return; o !== null;) {
        var c = o;
        switch ((xc(c), c.tag)) {
          case 1:
            ((c = c.type.childContextTypes), c != null && ga());
            break;
          case 3:
            (ps(), Nt(Cn), Nt(fn), Dc());
            break;
          case 5:
            Pc(c);
            break;
          case 4:
            ps();
            break;
          case 13:
            Nt(kt);
            break;
          case 19:
            Nt(kt);
            break;
          case 10:
            wc(c.type._context);
            break;
          case 22:
          case 23:
            uu();
        }
        o = o.return;
      }
    if (
      ((nn = t),
      (Xt = t = lr(t.current, null)),
      (an = kn = i),
      ($t = 0),
      (Ro = null),
      (iu = za = Nr = 0),
      (Ln = Co = null),
      Pr !== null)
    ) {
      for (i = 0; i < Pr.length; i++)
        if (((o = Pr[i]), (c = o.interleaved), c !== null)) {
          o.interleaved = null;
          var d = c.next,
            p = o.pending;
          if (p !== null) {
            var M = p.next;
            ((p.next = d), (c.next = M));
          }
          o.pending = c;
        }
      Pr = null;
    }
    return t;
  }
  function Fh(t, i) {
    do {
      var o = Xt;
      try {
        if ((Tc(), (Ca.current = Da), ba)) {
          for (var c = zt.memoizedState; c !== null;) {
            var d = c.queue;
            (d !== null && (d.pending = null), (c = c.next));
          }
          ba = !1;
        }
        if (
          ((Dr = 0),
          (tn = Yt = zt = null),
          (So = !1),
          (Mo = 0),
          (nu.current = null),
          o === null || o.return === null)
        ) {
          (($t = 1), (Ro = i), (Xt = null));
          break;
        }
        e: {
          var p = t,
            M = o.return,
            U = o,
            O = i;
          if (
            ((i = an),
            (U.flags |= 32768),
            O !== null && typeof O == "object" && typeof O.then == "function")
          ) {
            var re = O,
              _e = U,
              ye = _e.tag;
            if ((_e.mode & 1) === 0 && (ye === 0 || ye === 11 || ye === 15)) {
              var ge = _e.alternate;
              ge
                ? ((_e.updateQueue = ge.updateQueue),
                  (_e.memoizedState = ge.memoizedState),
                  (_e.lanes = ge.lanes))
                : ((_e.updateQueue = null), (_e.memoizedState = null));
            }
            var Ne = ah(M);
            if (Ne !== null) {
              ((Ne.flags &= -257),
                lh(Ne, M, U, p, i),
                Ne.mode & 1 && oh(p, re, i),
                (i = Ne),
                (O = re));
              var Be = i.updateQueue;
              if (Be === null) {
                var Ge = new Set();
                (Ge.add(O), (i.updateQueue = Ge));
              } else Be.add(O);
              break e;
            } else {
              if ((i & 1) === 0) {
                (oh(p, re, i), fu());
                break e;
              }
              O = Error(n(426));
            }
          } else if (Ot && U.mode & 1) {
            var Wt = ah(M);
            if (Wt !== null) {
              ((Wt.flags & 65536) === 0 && (Wt.flags |= 256), lh(Wt, M, U, p, i), Mc(ms(O, U)));
              break e;
            }
          }
          ((p = O = ms(O, U)),
            $t !== 4 && ($t = 2),
            Co === null ? (Co = [p]) : Co.push(p),
            (p = M));
          do {
            switch (p.tag) {
              case 3:
                ((p.flags |= 65536), (i &= -i), (p.lanes |= i));
                var Y = rh(p, O, i);
                Ld(p, Y);
                break e;
              case 1:
                U = O;
                var G = p.type,
                  Q = p.stateNode;
                if (
                  (p.flags & 128) === 0 &&
                  (typeof G.getDerivedStateFromError == "function" ||
                    (Q !== null &&
                      typeof Q.componentDidCatch == "function" &&
                      (rr === null || !rr.has(Q))))
                ) {
                  ((p.flags |= 65536), (i &= -i), (p.lanes |= i));
                  var we = sh(p, U, i);
                  Ld(p, we);
                  break e;
                }
            }
            p = p.return;
          } while (p !== null);
        }
        zh(o);
      } catch (Ve) {
        ((i = Ve), Xt === o && o !== null && (Xt = o = o.return));
        continue;
      }
      break;
    } while (!0);
  }
  function Oh() {
    var t = ka.current;
    return ((ka.current = Da), t === null ? Da : t);
  }
  function fu() {
    (($t === 0 || $t === 3 || $t === 2) && ($t = 4),
      nn === null || ((Nr & 268435455) === 0 && (za & 268435455) === 0) || ar(nn, an));
  }
  function Xa(t, i) {
    var o = xt;
    xt |= 2;
    var c = Oh();
    (nn !== t || an !== i) && ((Li = null), Ir(t, i));
    do
      try {
        q_();
        break;
      } catch (d) {
        Fh(t, d);
      }
    while (!0);
    if ((Tc(), (xt = o), (ka.current = c), Xt !== null)) throw Error(n(261));
    return ((nn = null), (an = 0), $t);
  }
  function q_() {
    for (; Xt !== null;) kh(Xt);
  }
  function Y_() {
    for (; Xt !== null && !Xe();) kh(Xt);
  }
  function kh(t) {
    var i = Gh(t.alternate, t, kn);
    ((t.memoizedProps = t.pendingProps), i === null ? zh(t) : (Xt = i), (nu.current = null));
  }
  function zh(t) {
    var i = t;
    do {
      var o = i.alternate;
      if (((t = i.return), (i.flags & 32768) === 0)) {
        if (((o = B_(o, i, kn)), o !== null)) {
          Xt = o;
          return;
        }
      } else {
        if (((o = H_(o, i)), o !== null)) {
          ((o.flags &= 32767), (Xt = o));
          return;
        }
        if (t !== null) ((t.flags |= 32768), (t.subtreeFlags = 0), (t.deletions = null));
        else {
          (($t = 6), (Xt = null));
          return;
        }
      }
      if (((i = i.sibling), i !== null)) {
        Xt = i;
        return;
      }
      Xt = i = t;
    } while (i !== null);
    $t === 0 && ($t = 5);
  }
  function Fr(t, i, o) {
    var c = wt,
      d = Yn.transition;
    try {
      ((Yn.transition = null), (wt = 1), $_(t, i, o, c));
    } finally {
      ((Yn.transition = d), (wt = c));
    }
    return null;
  }
  function $_(t, i, o, c) {
    do xs();
    while (sr !== null);
    if ((xt & 6) !== 0) throw Error(n(327));
    o = t.finishedWork;
    var d = t.finishedLanes;
    if (o === null) return null;
    if (((t.finishedWork = null), (t.finishedLanes = 0), o === t.current)) throw Error(n(177));
    ((t.callbackNode = null), (t.callbackPriority = 0));
    var p = o.lanes | o.childLanes;
    if (
      (bg(t, p),
      t === nn && ((Xt = nn = null), (an = 0)),
      ((o.subtreeFlags & 2064) === 0 && (o.flags & 2064) === 0) ||
        Ha ||
        ((Ha = !0),
        Vh(Pt, function () {
          return (xs(), null);
        })),
      (p = (o.flags & 15990) !== 0),
      (o.subtreeFlags & 15990) !== 0 || p)
    ) {
      ((p = Yn.transition), (Yn.transition = null));
      var M = wt;
      wt = 1;
      var U = xt;
      ((xt |= 4),
        (nu.current = null),
        V_(t, o),
        bh(o, t),
        m_(fc),
        (na = !!uc),
        (fc = uc = null),
        (t.current = o),
        W_(o),
        Qe(),
        (xt = U),
        (wt = M),
        (Yn.transition = p));
    } else t.current = o;
    if (
      (Ha && ((Ha = !1), (sr = t), (Ga = d)),
      (p = t.pendingLanes),
      p === 0 && (rr = null),
      ut(o.stateNode),
      Dn(t, Ie()),
      i !== null)
    )
      for (c = t.onRecoverableError, o = 0; o < i.length; o++)
        ((d = i[o]), c(d.value, { componentStack: d.stack, digest: d.digest }));
    if (Ba) throw ((Ba = !1), (t = su), (su = null), t);
    return (
      (Ga & 1) !== 0 && t.tag !== 0 && xs(),
      (p = t.pendingLanes),
      (p & 1) !== 0 ? (t === ou ? bo++ : ((bo = 0), (ou = t))) : (bo = 0),
      er(),
      null
    );
  }
  function xs() {
    if (sr !== null) {
      var t = Rf(Ga),
        i = Yn.transition,
        o = wt;
      try {
        if (((Yn.transition = null), (wt = 16 > t ? 16 : t), sr === null)) var c = !1;
        else {
          if (((t = sr), (sr = null), (Ga = 0), (xt & 6) !== 0)) throw Error(n(331));
          var d = xt;
          for (xt |= 4, Oe = t.current; Oe !== null;) {
            var p = Oe,
              M = p.child;
            if ((Oe.flags & 16) !== 0) {
              var U = p.deletions;
              if (U !== null) {
                for (var O = 0; O < U.length; O++) {
                  var re = U[O];
                  for (Oe = re; Oe !== null;) {
                    var _e = Oe;
                    switch (_e.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ao(8, _e, p);
                    }
                    var ye = _e.child;
                    if (ye !== null) ((ye.return = _e), (Oe = ye));
                    else
                      for (; Oe !== null;) {
                        _e = Oe;
                        var ge = _e.sibling,
                          Ne = _e.return;
                        if ((Th(_e), _e === re)) {
                          Oe = null;
                          break;
                        }
                        if (ge !== null) {
                          ((ge.return = Ne), (Oe = ge));
                          break;
                        }
                        Oe = Ne;
                      }
                  }
                }
                var Be = p.alternate;
                if (Be !== null) {
                  var Ge = Be.child;
                  if (Ge !== null) {
                    Be.child = null;
                    do {
                      var Wt = Ge.sibling;
                      ((Ge.sibling = null), (Ge = Wt));
                    } while (Ge !== null);
                  }
                }
                Oe = p;
              }
            }
            if ((p.subtreeFlags & 2064) !== 0 && M !== null) ((M.return = p), (Oe = M));
            else
              e: for (; Oe !== null;) {
                if (((p = Oe), (p.flags & 2048) !== 0))
                  switch (p.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ao(9, p, p.return);
                  }
                var Y = p.sibling;
                if (Y !== null) {
                  ((Y.return = p.return), (Oe = Y));
                  break e;
                }
                Oe = p.return;
              }
          }
          var G = t.current;
          for (Oe = G; Oe !== null;) {
            M = Oe;
            var Q = M.child;
            if ((M.subtreeFlags & 2064) !== 0 && Q !== null) ((Q.return = M), (Oe = Q));
            else
              e: for (M = G; Oe !== null;) {
                if (((U = Oe), (U.flags & 2048) !== 0))
                  try {
                    switch (U.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Oa(9, U);
                    }
                  } catch (Ve) {
                    Gt(U, U.return, Ve);
                  }
                if (U === M) {
                  Oe = null;
                  break e;
                }
                var we = U.sibling;
                if (we !== null) {
                  ((we.return = U.return), (Oe = we));
                  break e;
                }
                Oe = U.return;
              }
          }
          if (((xt = d), er(), gt && typeof gt.onPostCommitFiberRoot == "function"))
            try {
              gt.onPostCommitFiberRoot(An, t);
            } catch {}
          c = !0;
        }
        return c;
      } finally {
        ((wt = o), (Yn.transition = i));
      }
    }
    return !1;
  }
  function Bh(t, i, o) {
    ((i = ms(o, i)),
      (i = rh(t, i, 1)),
      (t = nr(t, i, 1)),
      (i = yn()),
      t !== null && (Qs(t, 1, i), Dn(t, i)));
  }
  function Gt(t, i, o) {
    if (t.tag === 3) Bh(t, t, o);
    else
      for (; i !== null;) {
        if (i.tag === 3) {
          Bh(i, t, o);
          break;
        } else if (i.tag === 1) {
          var c = i.stateNode;
          if (
            typeof i.type.getDerivedStateFromError == "function" ||
            (typeof c.componentDidCatch == "function" && (rr === null || !rr.has(c)))
          ) {
            ((t = ms(o, t)),
              (t = sh(i, t, 1)),
              (i = nr(i, t, 1)),
              (t = yn()),
              i !== null && (Qs(i, 1, t), Dn(i, t)));
            break;
          }
        }
        i = i.return;
      }
  }
  function K_(t, i, o) {
    var c = t.pingCache;
    (c !== null && c.delete(i),
      (i = yn()),
      (t.pingedLanes |= t.suspendedLanes & o),
      nn === t &&
        (an & o) === o &&
        ($t === 4 || ($t === 3 && (an & 130023424) === an && 500 > Ie() - ru)
          ? Ir(t, 0)
          : (iu |= o)),
      Dn(t, i));
  }
  function Hh(t, i) {
    i === 0 &&
      ((t.mode & 1) === 0
        ? (i = 1)
        : ((i = Wi), (Wi <<= 1), (Wi & 130023424) === 0 && (Wi = 4194304)));
    var o = yn();
    ((t = Ci(t, i)), t !== null && (Qs(t, i, o), Dn(t, o)));
  }
  function Z_(t) {
    var i = t.memoizedState,
      o = 0;
    (i !== null && (o = i.retryLane), Hh(t, o));
  }
  function Q_(t, i) {
    var o = 0;
    switch (t.tag) {
      case 13:
        var c = t.stateNode,
          d = t.memoizedState;
        d !== null && (o = d.retryLane);
        break;
      case 19:
        c = t.stateNode;
        break;
      default:
        throw Error(n(314));
    }
    (c !== null && c.delete(i), Hh(t, o));
  }
  var Gh;
  Gh = function (t, i, o) {
    if (t !== null)
      if (t.memoizedProps !== i.pendingProps || Cn.current) Pn = !0;
      else {
        if ((t.lanes & o) === 0 && (i.flags & 128) === 0) return ((Pn = !1), z_(t, i, o));
        Pn = (t.flags & 131072) !== 0;
      }
    else ((Pn = !1), Ot && (i.flags & 1048576) !== 0 && Sd(i, ya, i.index));
    switch (((i.lanes = 0), i.tag)) {
      case 2:
        var c = i.type;
        (Ia(t, i), (t = i.pendingProps));
        var d = as(i, fn.current);
        (hs(i, o), (d = Ic(null, i, c, t, d, o)));
        var p = Fc();
        return (
          (i.flags |= 1),
          typeof d == "object" &&
          d !== null &&
          typeof d.render == "function" &&
          d.$$typeof === void 0
            ? ((i.tag = 1),
              (i.memoizedState = null),
              (i.updateQueue = null),
              bn(c) ? ((p = !0), _a(i)) : (p = !1),
              (i.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
              Cc(i),
              (d.updater = Na),
              (i.stateNode = d),
              (d._reactInternals = i),
              Gc(i, c, t, o),
              (i = jc(null, i, c, !0, p, o)))
            : ((i.tag = 0), Ot && p && vc(i), xn(null, i, d, o), (i = i.child)),
          i
        );
      case 16:
        c = i.elementType;
        e: {
          switch (
            (Ia(t, i),
            (t = i.pendingProps),
            (d = c._init),
            (c = d(c._payload)),
            (i.type = c),
            (d = i.tag = ev(c)),
            (t = ri(c, t)),
            d)
          ) {
            case 0:
              i = Xc(null, i, c, t, o);
              break e;
            case 1:
              i = ph(null, i, c, t, o);
              break e;
            case 11:
              i = ch(null, i, c, t, o);
              break e;
            case 14:
              i = uh(null, i, c, ri(c.type, t), o);
              break e;
          }
          throw Error(n(306, c, ""));
        }
        return i;
      case 0:
        return (
          (c = i.type),
          (d = i.pendingProps),
          (d = i.elementType === c ? d : ri(c, d)),
          Xc(t, i, c, d, o)
        );
      case 1:
        return (
          (c = i.type),
          (d = i.pendingProps),
          (d = i.elementType === c ? d : ri(c, d)),
          ph(t, i, c, d, o)
        );
      case 3:
        e: {
          if ((mh(i), t === null)) throw Error(n(387));
          ((c = i.pendingProps),
            (p = i.memoizedState),
            (d = p.element),
            Pd(t, i),
            Aa(i, c, null, o));
          var M = i.memoizedState;
          if (((c = M.element), p.isDehydrated))
            if (
              ((p = {
                element: c,
                isDehydrated: !1,
                cache: M.cache,
                pendingSuspenseBoundaries: M.pendingSuspenseBoundaries,
                transitions: M.transitions,
              }),
              (i.updateQueue.baseState = p),
              (i.memoizedState = p),
              i.flags & 256)
            ) {
              ((d = ms(Error(n(423)), i)), (i = gh(t, i, c, o, d)));
              break e;
            } else if (c !== d) {
              ((d = ms(Error(n(424)), i)), (i = gh(t, i, c, o, d)));
              break e;
            } else
              for (
                On = Zi(i.stateNode.containerInfo.firstChild),
                  Fn = i,
                  Ot = !0,
                  ii = null,
                  o = Cd(i, null, c, o),
                  i.child = o;
                o;
              )
                ((o.flags = (o.flags & -3) | 4096), (o = o.sibling));
          else {
            if ((us(), c === d)) {
              i = Pi(t, i, o);
              break e;
            }
            xn(t, i, c, o);
          }
          i = i.child;
        }
        return i;
      case 5:
        return (
          Nd(i),
          t === null && Sc(i),
          (c = i.type),
          (d = i.pendingProps),
          (p = t !== null ? t.memoizedProps : null),
          (M = d.children),
          dc(c, d) ? (M = null) : p !== null && dc(c, p) && (i.flags |= 32),
          hh(t, i),
          xn(t, i, M, o),
          i.child
        );
      case 6:
        return (t === null && Sc(i), null);
      case 13:
        return _h(t, i, o);
      case 4:
        return (
          bc(i, i.stateNode.containerInfo),
          (c = i.pendingProps),
          t === null ? (i.child = fs(i, null, c, o)) : xn(t, i, c, o),
          i.child
        );
      case 11:
        return (
          (c = i.type),
          (d = i.pendingProps),
          (d = i.elementType === c ? d : ri(c, d)),
          ch(t, i, c, d, o)
        );
      case 7:
        return (xn(t, i, i.pendingProps, o), i.child);
      case 8:
        return (xn(t, i, i.pendingProps.children, o), i.child);
      case 12:
        return (xn(t, i, i.pendingProps.children, o), i.child);
      case 10:
        e: {
          if (
            ((c = i.type._context),
            (d = i.pendingProps),
            (p = i.memoizedProps),
            (M = d.value),
            Lt(Ea, c._currentValue),
            (c._currentValue = M),
            p !== null)
          )
            if (ni(p.value, M)) {
              if (p.children === d.children && !Cn.current) {
                i = Pi(t, i, o);
                break e;
              }
            } else
              for (p = i.child, p !== null && (p.return = i); p !== null;) {
                var U = p.dependencies;
                if (U !== null) {
                  M = p.child;
                  for (var O = U.firstContext; O !== null;) {
                    if (O.context === c) {
                      if (p.tag === 1) {
                        ((O = bi(-1, o & -o)), (O.tag = 2));
                        var re = p.updateQueue;
                        if (re !== null) {
                          re = re.shared;
                          var _e = re.pending;
                          (_e === null ? (O.next = O) : ((O.next = _e.next), (_e.next = O)),
                            (re.pending = O));
                        }
                      }
                      ((p.lanes |= o),
                        (O = p.alternate),
                        O !== null && (O.lanes |= o),
                        Ac(p.return, o, i),
                        (U.lanes |= o));
                      break;
                    }
                    O = O.next;
                  }
                } else if (p.tag === 10) M = p.type === i.type ? null : p.child;
                else if (p.tag === 18) {
                  if (((M = p.return), M === null)) throw Error(n(341));
                  ((M.lanes |= o),
                    (U = M.alternate),
                    U !== null && (U.lanes |= o),
                    Ac(M, o, i),
                    (M = p.sibling));
                } else M = p.child;
                if (M !== null) M.return = p;
                else
                  for (M = p; M !== null;) {
                    if (M === i) {
                      M = null;
                      break;
                    }
                    if (((p = M.sibling), p !== null)) {
                      ((p.return = M.return), (M = p));
                      break;
                    }
                    M = M.return;
                  }
                p = M;
              }
          (xn(t, i, d.children, o), (i = i.child));
        }
        return i;
      case 9:
        return (
          (d = i.type),
          (c = i.pendingProps.children),
          hs(i, o),
          (d = jn(d)),
          (c = c(d)),
          (i.flags |= 1),
          xn(t, i, c, o),
          i.child
        );
      case 14:
        return ((c = i.type), (d = ri(c, i.pendingProps)), (d = ri(c.type, d)), uh(t, i, c, d, o));
      case 15:
        return fh(t, i, i.type, i.pendingProps, o);
      case 17:
        return (
          (c = i.type),
          (d = i.pendingProps),
          (d = i.elementType === c ? d : ri(c, d)),
          Ia(t, i),
          (i.tag = 1),
          bn(c) ? ((t = !0), _a(i)) : (t = !1),
          hs(i, o),
          nh(i, c, d),
          Gc(i, c, d, o),
          jc(null, i, c, !0, t, o)
        );
      case 19:
        return xh(t, i, o);
      case 22:
        return dh(t, i, o);
    }
    throw Error(n(156, i.tag));
  };
  function Vh(t, i) {
    return se(t, i);
  }
  function J_(t, i, o, c) {
    ((this.tag = t),
      (this.key = o),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = i),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = c),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function $n(t, i, o, c) {
    return new J_(t, i, o, c);
  }
  function du(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function ev(t) {
    if (typeof t == "function") return du(t) ? 1 : 0;
    if (t != null) {
      if (((t = t.$$typeof), t === ne)) return 11;
      if (t === J) return 14;
    }
    return 2;
  }
  function lr(t, i) {
    var o = t.alternate;
    return (
      o === null
        ? ((o = $n(t.tag, i, t.key, t.mode)),
          (o.elementType = t.elementType),
          (o.type = t.type),
          (o.stateNode = t.stateNode),
          (o.alternate = t),
          (t.alternate = o))
        : ((o.pendingProps = i),
          (o.type = t.type),
          (o.flags = 0),
          (o.subtreeFlags = 0),
          (o.deletions = null)),
      (o.flags = t.flags & 14680064),
      (o.childLanes = t.childLanes),
      (o.lanes = t.lanes),
      (o.child = t.child),
      (o.memoizedProps = t.memoizedProps),
      (o.memoizedState = t.memoizedState),
      (o.updateQueue = t.updateQueue),
      (i = t.dependencies),
      (o.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }),
      (o.sibling = t.sibling),
      (o.index = t.index),
      (o.ref = t.ref),
      o
    );
  }
  function ja(t, i, o, c, d, p) {
    var M = 2;
    if (((c = t), typeof t == "function")) du(t) && (M = 1);
    else if (typeof t == "string") M = 5;
    else
      e: switch (t) {
        case F:
          return Or(o.children, d, p, i);
        case X:
          ((M = 8), (d |= 8));
          break;
        case A:
          return ((t = $n(12, o, i, d | 2)), (t.elementType = A), (t.lanes = p), t);
        case pe:
          return ((t = $n(13, o, i, d)), (t.elementType = pe), (t.lanes = p), t);
        case H:
          return ((t = $n(19, o, i, d)), (t.elementType = H), (t.lanes = p), t);
        case ue:
          return qa(o, d, p, i);
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case b:
                M = 10;
                break e;
              case le:
                M = 9;
                break e;
              case ne:
                M = 11;
                break e;
              case J:
                M = 14;
                break e;
              case ie:
                ((M = 16), (c = null));
                break e;
            }
          throw Error(n(130, t == null ? t : typeof t, ""));
      }
    return ((i = $n(M, o, i, d)), (i.elementType = t), (i.type = c), (i.lanes = p), i);
  }
  function Or(t, i, o, c) {
    return ((t = $n(7, t, c, i)), (t.lanes = o), t);
  }
  function qa(t, i, o, c) {
    return (
      (t = $n(22, t, c, i)),
      (t.elementType = ue),
      (t.lanes = o),
      (t.stateNode = { isHidden: !1 }),
      t
    );
  }
  function hu(t, i, o) {
    return ((t = $n(6, t, null, i)), (t.lanes = o), t);
  }
  function pu(t, i, o) {
    return (
      (i = $n(4, t.children !== null ? t.children : [], t.key, i)),
      (i.lanes = o),
      (i.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      i
    );
  }
  function tv(t, i, o, c, d) {
    ((this.tag = i),
      (this.containerInfo = t),
      (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = Zr(0)),
      (this.expirationTimes = Zr(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Zr(0)),
      (this.identifierPrefix = c),
      (this.onRecoverableError = d),
      (this.mutableSourceEagerHydrationData = null));
  }
  function mu(t, i, o, c, d, p, M, U, O) {
    return (
      (t = new tv(t, i, o, U, O)),
      i === 1 ? ((i = 1), p === !0 && (i |= 8)) : (i = 0),
      (p = $n(3, null, null, i)),
      (t.current = p),
      (p.stateNode = t),
      (p.memoizedState = {
        element: c,
        isDehydrated: o,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      Cc(p),
      t
    );
  }
  function nv(t, i, o) {
    var c = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: I,
      key: c == null ? null : "" + c,
      children: t,
      containerInfo: i,
      implementation: o,
    };
  }
  function Wh(t) {
    if (!t) return Ji;
    t = t._reactInternals;
    e: {
      if (Mi(t) !== t || t.tag !== 1) throw Error(n(170));
      var i = t;
      do {
        switch (i.tag) {
          case 3:
            i = i.stateNode.context;
            break e;
          case 1:
            if (bn(i.type)) {
              i = i.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        i = i.return;
      } while (i !== null);
      throw Error(n(171));
    }
    if (t.tag === 1) {
      var o = t.type;
      if (bn(o)) return vd(t, o, i);
    }
    return i;
  }
  function Xh(t, i, o, c, d, p, M, U, O) {
    return (
      (t = mu(o, c, !0, t, d, p, M, U, O)),
      (t.context = Wh(null)),
      (o = t.current),
      (c = yn()),
      (d = or(o)),
      (p = bi(c, d)),
      (p.callback = i ?? null),
      nr(o, p, d),
      (t.current.lanes = d),
      Qs(t, d, c),
      Dn(t, c),
      t
    );
  }
  function Ya(t, i, o, c) {
    var d = i.current,
      p = yn(),
      M = or(d);
    return (
      (o = Wh(o)),
      i.context === null ? (i.context = o) : (i.pendingContext = o),
      (i = bi(p, M)),
      (i.payload = { element: t }),
      (c = c === void 0 ? null : c),
      c !== null && (i.callback = c),
      (t = nr(d, i, M)),
      t !== null && (ai(t, d, M, p), wa(t, d, M)),
      M
    );
  }
  function $a(t) {
    if (((t = t.current), !t.child)) return null;
    switch (t.child.tag) {
      case 5:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function jh(t, i) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var o = t.retryLane;
      t.retryLane = o !== 0 && o < i ? o : i;
    }
  }
  function gu(t, i) {
    (jh(t, i), (t = t.alternate) && jh(t, i));
  }
  function iv() {
    return null;
  }
  var qh =
    typeof reportError == "function"
      ? reportError
      : function (t) {
          console.error(t);
        };
  function _u(t) {
    this._internalRoot = t;
  }
  ((Ka.prototype.render = _u.prototype.render =
    function (t) {
      var i = this._internalRoot;
      if (i === null) throw Error(n(409));
      Ya(t, i, null, null);
    }),
    (Ka.prototype.unmount = _u.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var i = t.containerInfo;
          (Ur(function () {
            Ya(null, t, null, null);
          }),
            (i[Ti] = null));
        }
      }));
  function Ka(t) {
    this._internalRoot = t;
  }
  Ka.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var i = Pf();
      t = { blockedOn: null, target: t, priority: i };
      for (var o = 0; o < Yi.length && i !== 0 && i < Yi[o].priority; o++);
      (Yi.splice(o, 0, t), o === 0 && Nf(t));
    }
  };
  function vu(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function Za(t) {
    return !(
      !t ||
      (t.nodeType !== 1 &&
        t.nodeType !== 9 &&
        t.nodeType !== 11 &&
        (t.nodeType !== 8 || t.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function Yh() {}
  function rv(t, i, o, c, d) {
    if (d) {
      if (typeof c == "function") {
        var p = c;
        c = function () {
          var re = $a(M);
          p.call(re);
        };
      }
      var M = Xh(i, c, t, 0, null, !1, !1, "", Yh);
      return (
        (t._reactRootContainer = M),
        (t[Ti] = M.current),
        ho(t.nodeType === 8 ? t.parentNode : t),
        Ur(),
        M
      );
    }
    for (; (d = t.lastChild);) t.removeChild(d);
    if (typeof c == "function") {
      var U = c;
      c = function () {
        var re = $a(O);
        U.call(re);
      };
    }
    var O = mu(t, 0, !1, null, null, !1, !1, "", Yh);
    return (
      (t._reactRootContainer = O),
      (t[Ti] = O.current),
      ho(t.nodeType === 8 ? t.parentNode : t),
      Ur(function () {
        Ya(i, O, o, c);
      }),
      O
    );
  }
  function Qa(t, i, o, c, d) {
    var p = o._reactRootContainer;
    if (p) {
      var M = p;
      if (typeof d == "function") {
        var U = d;
        d = function () {
          var O = $a(M);
          U.call(O);
        };
      }
      Ya(i, M, t, d);
    } else M = rv(o, i, t, d, c);
    return $a(M);
  }
  ((Cf = function (t) {
    switch (t.tag) {
      case 3:
        var i = t.stateNode;
        if (i.current.memoizedState.isDehydrated) {
          var o = Ht(i.pendingLanes);
          o !== 0 && (Gl(i, o | 1), Dn(i, Ie()), (xt & 6) === 0 && ((vs = Ie() + 500), er()));
        }
        break;
      case 13:
        (Ur(function () {
          var c = Ci(t, 1);
          if (c !== null) {
            var d = yn();
            ai(c, t, 1, d);
          }
        }),
          gu(t, 1));
    }
  }),
    (Vl = function (t) {
      if (t.tag === 13) {
        var i = Ci(t, 134217728);
        if (i !== null) {
          var o = yn();
          ai(i, t, 134217728, o);
        }
        gu(t, 134217728);
      }
    }),
    (bf = function (t) {
      if (t.tag === 13) {
        var i = or(t),
          o = Ci(t, i);
        if (o !== null) {
          var c = yn();
          ai(o, t, i, c);
        }
        gu(t, i);
      }
    }),
    (Pf = function () {
      return wt;
    }),
    (Lf = function (t, i) {
      var o = wt;
      try {
        return ((wt = t), i());
      } finally {
        wt = o;
      }
    }),
    (Ae = function (t, i, o) {
      switch (i) {
        case "input":
          if ((Ct(t, o), (i = o.name), o.type === "radio" && i != null)) {
            for (o = t; o.parentNode;) o = o.parentNode;
            for (
              o = o.querySelectorAll("input[name=" + JSON.stringify("" + i) + '][type="radio"]'),
                i = 0;
              i < o.length;
              i++
            ) {
              var c = o[i];
              if (c !== t && c.form === t.form) {
                var d = ma(c);
                if (!d) throw Error(n(90));
                (B(c), Ct(c, d));
              }
            }
          }
          break;
        case "textarea":
          Ee(t, o);
          break;
        case "select":
          ((i = o.value), i != null && te(t, !!o.multiple, i, !1));
      }
    }),
    (Et = cu),
    (Tt = Ur));
  var sv = { usingClientEntryPoint: !1, Events: [go, ss, ma, Je, $e, cu] },
    Po = {
      findFiberByHostInstance: Ar,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    ov = {
      bundleType: Po.bundleType,
      version: Po.version,
      rendererPackageName: Po.rendererPackageName,
      rendererConfig: Po.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: N.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (t) {
        return ((t = oe(t)), t === null ? null : t.stateNode);
      },
      findFiberByHostInstance: Po.findFiberByHostInstance || iv,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ja = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ja.isDisabled && Ja.supportsFiber)
      try {
        ((An = Ja.inject(ov)), (gt = Ja));
      } catch {}
  }
  return (
    (Nn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sv),
    (Nn.createPortal = function (t, i) {
      var o = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!vu(i)) throw Error(n(200));
      return nv(t, i, null, o);
    }),
    (Nn.createRoot = function (t, i) {
      if (!vu(t)) throw Error(n(299));
      var o = !1,
        c = "",
        d = qh;
      return (
        i != null &&
          (i.unstable_strictMode === !0 && (o = !0),
          i.identifierPrefix !== void 0 && (c = i.identifierPrefix),
          i.onRecoverableError !== void 0 && (d = i.onRecoverableError)),
        (i = mu(t, 1, !1, null, null, o, !1, c, d)),
        (t[Ti] = i.current),
        ho(t.nodeType === 8 ? t.parentNode : t),
        new _u(i)
      );
    }),
    (Nn.findDOMNode = function (t) {
      if (t == null) return null;
      if (t.nodeType === 1) return t;
      var i = t._reactInternals;
      if (i === void 0)
        throw typeof t.render == "function"
          ? Error(n(188))
          : ((t = Object.keys(t).join(",")), Error(n(268, t)));
      return ((t = oe(i)), (t = t === null ? null : t.stateNode), t);
    }),
    (Nn.flushSync = function (t) {
      return Ur(t);
    }),
    (Nn.hydrate = function (t, i, o) {
      if (!Za(i)) throw Error(n(200));
      return Qa(null, t, i, !0, o);
    }),
    (Nn.hydrateRoot = function (t, i, o) {
      if (!vu(t)) throw Error(n(405));
      var c = (o != null && o.hydratedSources) || null,
        d = !1,
        p = "",
        M = qh;
      if (
        (o != null &&
          (o.unstable_strictMode === !0 && (d = !0),
          o.identifierPrefix !== void 0 && (p = o.identifierPrefix),
          o.onRecoverableError !== void 0 && (M = o.onRecoverableError)),
        (i = Xh(i, null, t, 1, o ?? null, d, !1, p, M)),
        (t[Ti] = i.current),
        ho(t),
        c)
      )
        for (t = 0; t < c.length; t++)
          ((o = c[t]),
            (d = o._getVersion),
            (d = d(o._source)),
            i.mutableSourceEagerHydrationData == null
              ? (i.mutableSourceEagerHydrationData = [o, d])
              : i.mutableSourceEagerHydrationData.push(o, d));
      return new Ka(i);
    }),
    (Nn.render = function (t, i, o) {
      if (!Za(i)) throw Error(n(200));
      return Qa(null, t, i, !1, o);
    }),
    (Nn.unmountComponentAtNode = function (t) {
      if (!Za(t)) throw Error(n(40));
      return t._reactRootContainer
        ? (Ur(function () {
            Qa(null, null, t, !1, function () {
              ((t._reactRootContainer = null), (t[Ti] = null));
            });
          }),
          !0)
        : !1;
    }),
    (Nn.unstable_batchedUpdates = cu),
    (Nn.unstable_renderSubtreeIntoContainer = function (t, i, o, c) {
      if (!Za(o)) throw Error(n(200));
      if (t == null || t._reactInternals === void 0) throw Error(n(38));
      return Qa(t, i, o, !1, c);
    }),
    (Nn.version = "18.3.1-next-f1338f8080-20240426"),
    Nn
  );
}
var np;
function mv() {
  if (np) return Su.exports;
  np = 1;
  function r() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (e) {
        console.error(e);
      }
  }
  return (r(), (Su.exports = pv()), Su.exports);
}
var ip;
function gv() {
  if (ip) return el;
  ip = 1;
  var r = mv();
  return ((el.createRoot = r.createRoot), (el.hydrateRoot = r.hydrateRoot), el);
}
var _v = gv();
const vv = Bm(_v);
function Cl(r) {
  if (!r) return "";
  let e = r.replace(/\/+$/, "");
  e = e.replace(/\\/g, "/");
  const n = e.lastIndexOf("/");
  return n === -1 ? e : e.slice(n + 1);
}
function xv(r) {
  if (!r) return ".";
  let e = r.replace(/\\/g, "/");
  e = e.replace(/\/+$/, "");
  const n = e.lastIndexOf("/");
  return n === -1 ? "." : n === 0 ? "/" : e.slice(0, n);
}
function yv(r) {
  const e = Cl(r),
    n = e.lastIndexOf(".");
  return n <= 0 ? "" : e.slice(n);
}
function rp(r) {
  const e = r.length,
    n = r.filter((s) => s.status === "passed").length;
  return { passed: n, total: e, text: `${n}/${e}` };
}
function Sv(r) {
  if (r.cwd) {
    const s = Cl(r.cwd);
    if (s) return s;
  }
  const e = xv(r.workflowPath),
    n = Cl(e);
  return n || Cl(r.workflowPath);
}
function sp(r) {
  return r.title ? r.title : r.workflowId;
}
function op(r) {
  switch (r) {
    case "running":
      return { symbol: "●", color: "#0080FF", label: "running" };
    case "paused":
      return { symbol: "◐", color: "#FFCC00", label: "paused" };
    case "done":
      return { symbol: "✔", color: "#00CC00", label: "done" };
    case "aborted":
      return { symbol: "✘", color: "#FF4444", label: "aborted" };
    default:
      return { symbol: "?", color: "#888888", label: r };
  }
}
function Mv(r) {
  return r === "skipped";
}
function Ev(r, e) {
  const n = e != null && r.stepKey === e,
    s = Mv(r.status);
  let a;
  switch (r.status) {
    case "passed":
      a = "#00CC00";
      break;
    case "running":
      a = "#0080FF";
      break;
    case "failed":
      a = "#FF4444";
      break;
    case "skipped":
      a = "#888888";
      break;
    case "pending":
    default:
      a = "#666666";
      break;
  }
  return (
    s ? (a = "#999999") : n && (a = "#FFCC00"), { borderColor: a, isCurrent: n, isSkipped: s }
  );
}
const Tv = [
    ".md",
    ".txt",
    ".json",
    ".yaml",
    ".yml",
    ".toml",
    ".ts",
    ".js",
    ".tsx",
    ".jsx",
    ".sql",
    ".css",
    ".html",
  ],
  wv = new Set(Tv);
function Av(r, e) {
  const n = yv(r).toLowerCase();
  if (!wv.has(n)) return `unsupported extension: ${n || "(none)"}`;
}
function Tu(r) {
  return `プレビュー非対応: ${r}`;
}
function Rv(r, e) {
  return `${r.artifactKey}: ${r.filePath} (${e ? "存在✓" : "欠損✗"})`;
}
const Kn = 10;
function Cv(r, e, n) {
  const s = [];
  for (const a of r) {
    const l = a.startedAt ?? a.endedAt ?? "",
      f = n == null ? void 0 : n.get(a.stepId);
    s.push({ kind: "attempt", timestamp: l, attempt: a, stepKey: f });
  }
  for (const a of e) {
    const l = a.createdAt ?? "";
    s.push({ kind: "gate_event", timestamp: l, gateEvent: a });
  }
  return (
    s.sort((a, l) => {
      if (a.timestamp !== l.timestamp) return a.timestamp < l.timestamp ? -1 : 1;
      const f = a.kind === "attempt" ? (a.attempt.id ?? 0) : (a.gateEvent.id ?? 0),
        u = l.kind === "attempt" ? (l.attempt.id ?? 0) : (l.gateEvent.id ?? 0);
      return f - u;
    }),
    s.reverse(),
    s.slice(0, 20)
  );
}
function bv(r) {
  if (r.kind === "attempt") {
    const s = r.attempt,
      a = r.stepKey ?? String(s.stepId),
      l = s.checkStatus ?? "-";
    return `${r.timestamp} [attempt] ${a} #${s.attemptNumber} check:${l}`;
  }
  const e = r.gateEvent,
    n = e.choice ?? "-";
  return `${r.timestamp} [gate] ${e.stepKey} ${e.event} choice:${n}`;
}
function Hm(r) {
  var e,
    n,
    s = "";
  if (typeof r == "string" || typeof r == "number") s += r;
  else if (typeof r == "object")
    if (Array.isArray(r)) {
      var a = r.length;
      for (e = 0; e < a; e++) r[e] && (n = Hm(r[e])) && (s && (s += " "), (s += n));
    } else for (n in r) r[n] && (s && (s += " "), (s += n));
  return s;
}
function Gm() {
  for (var r, e, n = 0, s = "", a = arguments.length; n < a; n++)
    (r = arguments[n]) && (e = Hm(r)) && (s && (s += " "), (s += e));
  return s;
}
const gf = "-",
  Pv = (r) => {
    const e = Dv(r),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: s } = r;
    return {
      getClassGroupId: (f) => {
        const u = f.split(gf);
        return (u[0] === "" && u.length !== 1 && u.shift(), Vm(u, e) || Lv(f));
      },
      getConflictingClassGroupIds: (f, u) => {
        const h = n[f] || [];
        return u && s[f] ? [...h, ...s[f]] : h;
      },
    };
  },
  Vm = (r, e) => {
    var f;
    if (r.length === 0) return e.classGroupId;
    const n = r[0],
      s = e.nextPart.get(n),
      a = s ? Vm(r.slice(1), s) : void 0;
    if (a) return a;
    if (e.validators.length === 0) return;
    const l = r.join(gf);
    return (f = e.validators.find(({ validator: u }) => u(l))) == null ? void 0 : f.classGroupId;
  },
  ap = /^\[(.+)\]$/,
  Lv = (r) => {
    if (ap.test(r)) {
      const e = ap.exec(r)[1],
        n = e == null ? void 0 : e.substring(0, e.indexOf(":"));
      if (n) return "arbitrary.." + n;
    }
  },
  Dv = (r) => {
    const { theme: e, prefix: n } = r,
      s = { nextPart: new Map(), validators: [] };
    return (
      Uv(Object.entries(r.classGroups), n).forEach(([l, f]) => {
        nf(f, s, l, e);
      }),
      s
    );
  },
  nf = (r, e, n, s) => {
    r.forEach((a) => {
      if (typeof a == "string") {
        const l = a === "" ? e : lp(e, a);
        l.classGroupId = n;
        return;
      }
      if (typeof a == "function") {
        if (Nv(a)) {
          nf(a(s), e, n, s);
          return;
        }
        e.validators.push({ validator: a, classGroupId: n });
        return;
      }
      Object.entries(a).forEach(([l, f]) => {
        nf(f, lp(e, l), n, s);
      });
    });
  },
  lp = (r, e) => {
    let n = r;
    return (
      e.split(gf).forEach((s) => {
        (n.nextPart.has(s) || n.nextPart.set(s, { nextPart: new Map(), validators: [] }),
          (n = n.nextPart.get(s)));
      }),
      n
    );
  },
  Nv = (r) => r.isThemeGetter,
  Uv = (r, e) =>
    e
      ? r.map(([n, s]) => {
          const a = s.map((l) =>
            typeof l == "string"
              ? e + l
              : typeof l == "object"
                ? Object.fromEntries(Object.entries(l).map(([f, u]) => [e + f, u]))
                : l,
          );
          return [n, a];
        })
      : r,
  Iv = (r) => {
    if (r < 1) return { get: () => {}, set: () => {} };
    let e = 0,
      n = new Map(),
      s = new Map();
    const a = (l, f) => {
      (n.set(l, f), e++, e > r && ((e = 0), (s = n), (n = new Map())));
    };
    return {
      get(l) {
        let f = n.get(l);
        if (f !== void 0) return f;
        if ((f = s.get(l)) !== void 0) return (a(l, f), f);
      },
      set(l, f) {
        n.has(l) ? n.set(l, f) : a(l, f);
      },
    };
  },
  Wm = "!",
  Fv = (r) => {
    const { separator: e, experimentalParseClassName: n } = r,
      s = e.length === 1,
      a = e[0],
      l = e.length,
      f = (u) => {
        const h = [];
        let m = 0,
          g = 0,
          v;
        for (let x = 0; x < u.length; x++) {
          let _ = u[x];
          if (m === 0) {
            if (_ === a && (s || u.slice(x, x + l) === e)) {
              (h.push(u.slice(g, x)), (g = x + l));
              continue;
            }
            if (_ === "/") {
              v = x;
              continue;
            }
          }
          _ === "[" ? m++ : _ === "]" && m--;
        }
        const y = h.length === 0 ? u : u.substring(g),
          S = y.startsWith(Wm),
          T = S ? y.substring(1) : y,
          E = v && v > g ? v - g : void 0;
        return {
          modifiers: h,
          hasImportantModifier: S,
          baseClassName: T,
          maybePostfixModifierPosition: E,
        };
      };
    return n ? (u) => n({ className: u, parseClassName: f }) : f;
  },
  Ov = (r) => {
    if (r.length <= 1) return r;
    const e = [];
    let n = [];
    return (
      r.forEach((s) => {
        s[0] === "[" ? (e.push(...n.sort(), s), (n = [])) : n.push(s);
      }),
      e.push(...n.sort()),
      e
    );
  },
  kv = (r) => ({ cache: Iv(r.cacheSize), parseClassName: Fv(r), ...Pv(r) }),
  zv = /\s+/,
  Bv = (r, e) => {
    const { parseClassName: n, getClassGroupId: s, getConflictingClassGroupIds: a } = e,
      l = [],
      f = r.trim().split(zv);
    let u = "";
    for (let h = f.length - 1; h >= 0; h -= 1) {
      const m = f[h],
        {
          modifiers: g,
          hasImportantModifier: v,
          baseClassName: y,
          maybePostfixModifierPosition: S,
        } = n(m);
      let T = !!S,
        E = s(T ? y.substring(0, S) : y);
      if (!E) {
        if (!T) {
          u = m + (u.length > 0 ? " " + u : u);
          continue;
        }
        if (((E = s(y)), !E)) {
          u = m + (u.length > 0 ? " " + u : u);
          continue;
        }
        T = !1;
      }
      const x = Ov(g).join(":"),
        _ = v ? x + Wm : x,
        D = _ + E;
      if (l.includes(D)) continue;
      l.push(D);
      const R = a(E, T);
      for (let N = 0; N < R.length; ++N) {
        const z = R[N];
        l.push(_ + z);
      }
      u = m + (u.length > 0 ? " " + u : u);
    }
    return u;
  };
function Hv() {
  let r = 0,
    e,
    n,
    s = "";
  for (; r < arguments.length;) (e = arguments[r++]) && (n = Xm(e)) && (s && (s += " "), (s += n));
  return s;
}
const Xm = (r) => {
  if (typeof r == "string") return r;
  let e,
    n = "";
  for (let s = 0; s < r.length; s++) r[s] && (e = Xm(r[s])) && (n && (n += " "), (n += e));
  return n;
};
function Gv(r, ...e) {
  let n,
    s,
    a,
    l = f;
  function f(h) {
    const m = e.reduce((g, v) => v(g), r());
    return ((n = kv(m)), (s = n.cache.get), (a = n.cache.set), (l = u), u(h));
  }
  function u(h) {
    const m = s(h);
    if (m) return m;
    const g = Bv(h, n);
    return (a(h, g), g);
  }
  return function () {
    return l(Hv.apply(null, arguments));
  };
}
const Ut = (r) => {
    const e = (n) => n[r] || [];
    return ((e.isThemeGetter = !0), e);
  },
  jm = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  Vv = /^\d+\/\d+$/,
  Wv = new Set(["px", "full", "screen"]),
  Xv = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  jv =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  qv = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  Yv = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  $v =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Di = (r) => zs(r) || Wv.has(r) || Vv.test(r),
  ur = (r) => js(r, "length", i0),
  zs = (r) => !!r && !Number.isNaN(Number(r)),
  wu = (r) => js(r, "number", zs),
  Do = (r) => !!r && Number.isInteger(Number(r)),
  Kv = (r) => r.endsWith("%") && zs(r.slice(0, -1)),
  ct = (r) => jm.test(r),
  fr = (r) => Xv.test(r),
  Zv = new Set(["length", "size", "percentage"]),
  Qv = (r) => js(r, Zv, qm),
  Jv = (r) => js(r, "position", qm),
  e0 = new Set(["image", "url"]),
  t0 = (r) => js(r, e0, s0),
  n0 = (r) => js(r, "", r0),
  No = () => !0,
  js = (r, e, n) => {
    const s = jm.exec(r);
    return s ? (s[1] ? (typeof e == "string" ? s[1] === e : e.has(s[1])) : n(s[2])) : !1;
  },
  i0 = (r) => jv.test(r) && !qv.test(r),
  qm = () => !1,
  r0 = (r) => Yv.test(r),
  s0 = (r) => $v.test(r),
  o0 = () => {
    const r = Ut("colors"),
      e = Ut("spacing"),
      n = Ut("blur"),
      s = Ut("brightness"),
      a = Ut("borderColor"),
      l = Ut("borderRadius"),
      f = Ut("borderSpacing"),
      u = Ut("borderWidth"),
      h = Ut("contrast"),
      m = Ut("grayscale"),
      g = Ut("hueRotate"),
      v = Ut("invert"),
      y = Ut("gap"),
      S = Ut("gradientColorStops"),
      T = Ut("gradientColorStopPositions"),
      E = Ut("inset"),
      x = Ut("margin"),
      _ = Ut("opacity"),
      D = Ut("padding"),
      R = Ut("saturate"),
      N = Ut("scale"),
      z = Ut("sepia"),
      I = Ut("skew"),
      F = Ut("space"),
      X = Ut("translate"),
      A = () => ["auto", "contain", "none"],
      b = () => ["auto", "hidden", "clip", "visible", "scroll"],
      le = () => ["auto", ct, e],
      ne = () => [ct, e],
      pe = () => ["", Di, ur],
      H = () => ["auto", zs, ct],
      J = () => [
        "bottom",
        "center",
        "left",
        "left-bottom",
        "left-top",
        "right",
        "right-bottom",
        "right-top",
        "top",
      ],
      ie = () => ["solid", "dashed", "dotted", "double", "none"],
      ue = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      V = () => ["start", "end", "center", "between", "around", "evenly", "stretch"],
      K = () => ["", "0", ct],
      j = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
      L = () => [zs, ct];
    return {
      cacheSize: 500,
      separator: ":",
      theme: {
        colors: [No],
        spacing: [Di, ur],
        blur: ["none", "", fr, ct],
        brightness: L(),
        borderColor: [r],
        borderRadius: ["none", "", "full", fr, ct],
        borderSpacing: ne(),
        borderWidth: pe(),
        contrast: L(),
        grayscale: K(),
        hueRotate: L(),
        invert: K(),
        gap: ne(),
        gradientColorStops: [r],
        gradientColorStopPositions: [Kv, ur],
        inset: le(),
        margin: le(),
        opacity: L(),
        padding: ne(),
        saturate: L(),
        scale: L(),
        sepia: K(),
        skew: L(),
        space: ne(),
        translate: ne(),
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", "video", ct] }],
        container: ["container"],
        columns: [{ columns: [fr] }],
        "break-after": [{ "break-after": j() }],
        "break-before": [{ "break-before": j() }],
        "break-inside": [{ "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] }],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [{ object: ["contain", "cover", "fill", "none", "scale-down"] }],
        "object-position": [{ object: [...J(), ct] }],
        overflow: [{ overflow: b() }],
        "overflow-x": [{ "overflow-x": b() }],
        "overflow-y": [{ "overflow-y": b() }],
        overscroll: [{ overscroll: A() }],
        "overscroll-x": [{ "overscroll-x": A() }],
        "overscroll-y": [{ "overscroll-y": A() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: [E] }],
        "inset-x": [{ "inset-x": [E] }],
        "inset-y": [{ "inset-y": [E] }],
        start: [{ start: [E] }],
        end: [{ end: [E] }],
        top: [{ top: [E] }],
        right: [{ right: [E] }],
        bottom: [{ bottom: [E] }],
        left: [{ left: [E] }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: ["auto", Do, ct] }],
        basis: [{ basis: le() }],
        "flex-direction": [{ flex: ["row", "row-reverse", "col", "col-reverse"] }],
        "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
        flex: [{ flex: ["1", "auto", "initial", "none", ct] }],
        grow: [{ grow: K() }],
        shrink: [{ shrink: K() }],
        order: [{ order: ["first", "last", "none", Do, ct] }],
        "grid-cols": [{ "grid-cols": [No] }],
        "col-start-end": [{ col: ["auto", { span: ["full", Do, ct] }, ct] }],
        "col-start": [{ "col-start": H() }],
        "col-end": [{ "col-end": H() }],
        "grid-rows": [{ "grid-rows": [No] }],
        "row-start-end": [{ row: ["auto", { span: [Do, ct] }, ct] }],
        "row-start": [{ "row-start": H() }],
        "row-end": [{ "row-end": H() }],
        "grid-flow": [{ "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] }],
        "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", ct] }],
        "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", ct] }],
        gap: [{ gap: [y] }],
        "gap-x": [{ "gap-x": [y] }],
        "gap-y": [{ "gap-y": [y] }],
        "justify-content": [{ justify: ["normal", ...V()] }],
        "justify-items": [{ "justify-items": ["start", "end", "center", "stretch"] }],
        "justify-self": [{ "justify-self": ["auto", "start", "end", "center", "stretch"] }],
        "align-content": [{ content: ["normal", ...V(), "baseline"] }],
        "align-items": [{ items: ["start", "end", "center", "baseline", "stretch"] }],
        "align-self": [{ self: ["auto", "start", "end", "center", "stretch", "baseline"] }],
        "place-content": [{ "place-content": [...V(), "baseline"] }],
        "place-items": [{ "place-items": ["start", "end", "center", "baseline", "stretch"] }],
        "place-self": [{ "place-self": ["auto", "start", "end", "center", "stretch"] }],
        p: [{ p: [D] }],
        px: [{ px: [D] }],
        py: [{ py: [D] }],
        ps: [{ ps: [D] }],
        pe: [{ pe: [D] }],
        pt: [{ pt: [D] }],
        pr: [{ pr: [D] }],
        pb: [{ pb: [D] }],
        pl: [{ pl: [D] }],
        m: [{ m: [x] }],
        mx: [{ mx: [x] }],
        my: [{ my: [x] }],
        ms: [{ ms: [x] }],
        me: [{ me: [x] }],
        mt: [{ mt: [x] }],
        mr: [{ mr: [x] }],
        mb: [{ mb: [x] }],
        ml: [{ ml: [x] }],
        "space-x": [{ "space-x": [F] }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": [F] }],
        "space-y-reverse": ["space-y-reverse"],
        w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", ct, e] }],
        "min-w": [{ "min-w": [ct, e, "min", "max", "fit"] }],
        "max-w": [
          { "max-w": [ct, e, "none", "full", "min", "max", "fit", "prose", { screen: [fr] }, fr] },
        ],
        h: [{ h: [ct, e, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
        "min-h": [{ "min-h": [ct, e, "min", "max", "fit", "svh", "lvh", "dvh"] }],
        "max-h": [{ "max-h": [ct, e, "min", "max", "fit", "svh", "lvh", "dvh"] }],
        size: [{ size: [ct, e, "auto", "min", "max", "fit"] }],
        "font-size": [{ text: ["base", fr, ur] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [
          {
            font: [
              "thin",
              "extralight",
              "light",
              "normal",
              "medium",
              "semibold",
              "bold",
              "extrabold",
              "black",
              wu,
            ],
          },
        ],
        "font-family": [{ font: [No] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", ct] }],
        "line-clamp": [{ "line-clamp": ["none", zs, wu] }],
        leading: [{ leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Di, ct] }],
        "list-image": [{ "list-image": ["none", ct] }],
        "list-style-type": [{ list: ["none", "disc", "decimal", ct] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "placeholder-color": [{ placeholder: [r] }],
        "placeholder-opacity": [{ "placeholder-opacity": [_] }],
        "text-alignment": [{ text: ["left", "center", "right", "justify", "start", "end"] }],
        "text-color": [{ text: [r] }],
        "text-opacity": [{ "text-opacity": [_] }],
        "text-decoration": ["underline", "overline", "line-through", "no-underline"],
        "text-decoration-style": [{ decoration: [...ie(), "wavy"] }],
        "text-decoration-thickness": [{ decoration: ["auto", "from-font", Di, ur] }],
        "underline-offset": [{ "underline-offset": ["auto", Di, ct] }],
        "text-decoration-color": [{ decoration: [r] }],
        "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: ne() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              ct,
            ],
          },
        ],
        whitespace: [
          { whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"] },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", ct] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-opacity": [{ "bg-opacity": [_] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: [...J(), Jv] }],
        "bg-repeat": [{ bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] }],
        "bg-size": [{ bg: ["auto", "cover", "contain", Qv] }],
        "bg-image": [
          { bg: ["none", { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] }, t0] },
        ],
        "bg-color": [{ bg: [r] }],
        "gradient-from-pos": [{ from: [T] }],
        "gradient-via-pos": [{ via: [T] }],
        "gradient-to-pos": [{ to: [T] }],
        "gradient-from": [{ from: [S] }],
        "gradient-via": [{ via: [S] }],
        "gradient-to": [{ to: [S] }],
        rounded: [{ rounded: [l] }],
        "rounded-s": [{ "rounded-s": [l] }],
        "rounded-e": [{ "rounded-e": [l] }],
        "rounded-t": [{ "rounded-t": [l] }],
        "rounded-r": [{ "rounded-r": [l] }],
        "rounded-b": [{ "rounded-b": [l] }],
        "rounded-l": [{ "rounded-l": [l] }],
        "rounded-ss": [{ "rounded-ss": [l] }],
        "rounded-se": [{ "rounded-se": [l] }],
        "rounded-ee": [{ "rounded-ee": [l] }],
        "rounded-es": [{ "rounded-es": [l] }],
        "rounded-tl": [{ "rounded-tl": [l] }],
        "rounded-tr": [{ "rounded-tr": [l] }],
        "rounded-br": [{ "rounded-br": [l] }],
        "rounded-bl": [{ "rounded-bl": [l] }],
        "border-w": [{ border: [u] }],
        "border-w-x": [{ "border-x": [u] }],
        "border-w-y": [{ "border-y": [u] }],
        "border-w-s": [{ "border-s": [u] }],
        "border-w-e": [{ "border-e": [u] }],
        "border-w-t": [{ "border-t": [u] }],
        "border-w-r": [{ "border-r": [u] }],
        "border-w-b": [{ "border-b": [u] }],
        "border-w-l": [{ "border-l": [u] }],
        "border-opacity": [{ "border-opacity": [_] }],
        "border-style": [{ border: [...ie(), "hidden"] }],
        "divide-x": [{ "divide-x": [u] }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": [u] }],
        "divide-y-reverse": ["divide-y-reverse"],
        "divide-opacity": [{ "divide-opacity": [_] }],
        "divide-style": [{ divide: ie() }],
        "border-color": [{ border: [a] }],
        "border-color-x": [{ "border-x": [a] }],
        "border-color-y": [{ "border-y": [a] }],
        "border-color-s": [{ "border-s": [a] }],
        "border-color-e": [{ "border-e": [a] }],
        "border-color-t": [{ "border-t": [a] }],
        "border-color-r": [{ "border-r": [a] }],
        "border-color-b": [{ "border-b": [a] }],
        "border-color-l": [{ "border-l": [a] }],
        "divide-color": [{ divide: [a] }],
        "outline-style": [{ outline: ["", ...ie()] }],
        "outline-offset": [{ "outline-offset": [Di, ct] }],
        "outline-w": [{ outline: [Di, ur] }],
        "outline-color": [{ outline: [r] }],
        "ring-w": [{ ring: pe() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: [r] }],
        "ring-opacity": [{ "ring-opacity": [_] }],
        "ring-offset-w": [{ "ring-offset": [Di, ur] }],
        "ring-offset-color": [{ "ring-offset": [r] }],
        shadow: [{ shadow: ["", "inner", "none", fr, n0] }],
        "shadow-color": [{ shadow: [No] }],
        opacity: [{ opacity: [_] }],
        "mix-blend": [{ "mix-blend": [...ue(), "plus-lighter", "plus-darker"] }],
        "bg-blend": [{ "bg-blend": ue() }],
        filter: [{ filter: ["", "none"] }],
        blur: [{ blur: [n] }],
        brightness: [{ brightness: [s] }],
        contrast: [{ contrast: [h] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", fr, ct] }],
        grayscale: [{ grayscale: [m] }],
        "hue-rotate": [{ "hue-rotate": [g] }],
        invert: [{ invert: [v] }],
        saturate: [{ saturate: [R] }],
        sepia: [{ sepia: [z] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
        "backdrop-blur": [{ "backdrop-blur": [n] }],
        "backdrop-brightness": [{ "backdrop-brightness": [s] }],
        "backdrop-contrast": [{ "backdrop-contrast": [h] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": [m] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [g] }],
        "backdrop-invert": [{ "backdrop-invert": [v] }],
        "backdrop-opacity": [{ "backdrop-opacity": [_] }],
        "backdrop-saturate": [{ "backdrop-saturate": [R] }],
        "backdrop-sepia": [{ "backdrop-sepia": [z] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": [f] }],
        "border-spacing-x": [{ "border-spacing-x": [f] }],
        "border-spacing-y": [{ "border-spacing-y": [f] }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          { transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", ct] },
        ],
        duration: [{ duration: L() }],
        ease: [{ ease: ["linear", "in", "out", "in-out", ct] }],
        delay: [{ delay: L() }],
        animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", ct] }],
        transform: [{ transform: ["", "gpu", "none"] }],
        scale: [{ scale: [N] }],
        "scale-x": [{ "scale-x": [N] }],
        "scale-y": [{ "scale-y": [N] }],
        rotate: [{ rotate: [Do, ct] }],
        "translate-x": [{ "translate-x": [X] }],
        "translate-y": [{ "translate-y": [X] }],
        "skew-x": [{ "skew-x": [I] }],
        "skew-y": [{ "skew-y": [I] }],
        "transform-origin": [
          {
            origin: [
              "center",
              "top",
              "top-right",
              "right",
              "bottom-right",
              "bottom",
              "bottom-left",
              "left",
              "top-left",
              ct,
            ],
          },
        ],
        accent: [{ accent: ["auto", r] }],
        appearance: [{ appearance: ["none", "auto"] }],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              ct,
            ],
          },
        ],
        "caret-color": [{ caret: [r] }],
        "pointer-events": [{ "pointer-events": ["none", "auto"] }],
        resize: [{ resize: ["none", "y", "x", ""] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": ne() }],
        "scroll-mx": [{ "scroll-mx": ne() }],
        "scroll-my": [{ "scroll-my": ne() }],
        "scroll-ms": [{ "scroll-ms": ne() }],
        "scroll-me": [{ "scroll-me": ne() }],
        "scroll-mt": [{ "scroll-mt": ne() }],
        "scroll-mr": [{ "scroll-mr": ne() }],
        "scroll-mb": [{ "scroll-mb": ne() }],
        "scroll-ml": [{ "scroll-ml": ne() }],
        "scroll-p": [{ "scroll-p": ne() }],
        "scroll-px": [{ "scroll-px": ne() }],
        "scroll-py": [{ "scroll-py": ne() }],
        "scroll-ps": [{ "scroll-ps": ne() }],
        "scroll-pe": [{ "scroll-pe": ne() }],
        "scroll-pt": [{ "scroll-pt": ne() }],
        "scroll-pr": [{ "scroll-pr": ne() }],
        "scroll-pb": [{ "scroll-pb": ne() }],
        "scroll-pl": [{ "scroll-pl": ne() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [{ "will-change": ["auto", "scroll", "contents", "transform", ct] }],
        fill: [{ fill: [r, "none"] }],
        "stroke-w": [{ stroke: [Di, ur, wu] }],
        stroke: [{ stroke: [r, "none"] }],
        sr: ["sr-only", "not-sr-only"],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
    };
  },
  a0 = Gv(o0);
function Kt(...r) {
  return a0(Gm(r));
}
const rf = _t.forwardRef(({ className: r, ...e }, n) =>
  de.jsx("div", {
    ref: n,
    className: Kt(
      "rounded-lg border border-catppuccin-surface1 bg-catppuccin-surface0 text-catppuccin-text shadow-sm",
      r,
    ),
    ...e,
  }),
);
rf.displayName = "Card";
const l0 = _t.forwardRef(({ className: r, ...e }, n) =>
  de.jsx("div", { ref: n, className: Kt("flex flex-col space-y-1.5 p-4", r), ...e }),
);
l0.displayName = "CardHeader";
const c0 = _t.forwardRef(({ className: r, ...e }, n) =>
  de.jsx("h3", { ref: n, className: Kt("font-semibold leading-none tracking-tight", r), ...e }),
);
c0.displayName = "CardTitle";
const u0 = _t.forwardRef(({ className: r, ...e }, n) =>
  de.jsx("p", { ref: n, className: Kt("text-sm text-catppuccin-subtext0", r), ...e }),
);
u0.displayName = "CardDescription";
const f0 = _t.forwardRef(({ className: r, ...e }, n) =>
  de.jsx("div", { ref: n, className: Kt("p-4 pt-0", r), ...e }),
);
f0.displayName = "CardContent";
const d0 = _t.forwardRef(({ className: r, ...e }, n) =>
  de.jsx("div", { ref: n, className: Kt("flex items-center p-4 pt-0", r), ...e }),
);
d0.displayName = "CardFooter";
const cp = (r) => (typeof r == "boolean" ? `${r}` : r === 0 ? "0" : r),
  up = Gm,
  h0 = (r, e) => (n) => {
    var s;
    if ((e == null ? void 0 : e.variants) == null)
      return up(r, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
    const { variants: a, defaultVariants: l } = e,
      f = Object.keys(a).map((m) => {
        const g = n == null ? void 0 : n[m],
          v = l == null ? void 0 : l[m];
        if (g === null) return null;
        const y = cp(g) || cp(v);
        return a[m][y];
      }),
      u =
        n &&
        Object.entries(n).reduce((m, g) => {
          let [v, y] = g;
          return (y === void 0 || (m[v] = y), m);
        }, {}),
      h =
        e == null || (s = e.compoundVariants) === null || s === void 0
          ? void 0
          : s.reduce((m, g) => {
              let { class: v, className: y, ...S } = g;
              return Object.entries(S).every((T) => {
                let [E, x] = T;
                return Array.isArray(x) ? x.includes({ ...l, ...u }[E]) : { ...l, ...u }[E] === x;
              })
                ? [...m, v, y]
                : m;
            }, []);
    return up(r, f, h, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  },
  p0 = h0(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
      variants: {
        variant: {
          default: "border-transparent bg-catppuccin-mauve text-catppuccin-crust",
          secondary: "border-transparent bg-catppuccin-surface1 text-catppuccin-text",
          destructive: "border-transparent bg-catppuccin-red text-catppuccin-crust",
          outline: "text-catppuccin-text",
          passed: "border-transparent bg-[#a6e3a1] text-[#1e1e2e]",
          running: "border-transparent bg-[#89b4fa] text-[#1e1e2e]",
          failed: "border-transparent bg-[#f38ba8] text-[#1e1e2e]",
          pending: "border-transparent bg-[#585b70] text-[#cdd6f4]",
          skipped: "border border-[#6c7086] bg-transparent text-[#a6adc8]",
        },
      },
      defaultVariants: { variant: "default" },
    },
  );
function fp({ className: r, variant: e, ...n }) {
  return de.jsx("div", { className: Kt(p0({ variant: e }), r), ...n });
}
/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */ const _f = "160",
  m0 = 0,
  dp = 1,
  g0 = 2,
  Ym = 1,
  _0 = 2,
  ki = 3,
  Mr = 0,
  Un = 1,
  zi = 2,
  xr = 0,
  Bs = 1,
  hp = 2,
  pp = 3,
  mp = 4,
  v0 = 5,
  Wr = 100,
  x0 = 101,
  y0 = 102,
  gp = 103,
  _p = 104,
  S0 = 200,
  M0 = 201,
  E0 = 202,
  T0 = 203,
  sf = 204,
  of = 205,
  w0 = 206,
  A0 = 207,
  R0 = 208,
  C0 = 209,
  b0 = 210,
  P0 = 211,
  L0 = 212,
  D0 = 213,
  N0 = 214,
  U0 = 0,
  I0 = 1,
  F0 = 2,
  Pl = 3,
  O0 = 4,
  k0 = 5,
  z0 = 6,
  B0 = 7,
  $m = 0,
  H0 = 1,
  G0 = 2,
  yr = 0,
  V0 = 1,
  W0 = 2,
  X0 = 3,
  j0 = 4,
  q0 = 5,
  Y0 = 6,
  Km = 300,
  Gs = 301,
  Vs = 302,
  af = 303,
  lf = 304,
  Ol = 306,
  cf = 1e3,
  di = 1001,
  uf = 1002,
  En = 1003,
  vp = 1004,
  Au = 1005,
  Qn = 1006,
  $0 = 1007,
  Ho = 1008,
  Sr = 1009,
  K0 = 1010,
  Z0 = 1011,
  vf = 1012,
  Zm = 1013,
  _r = 1014,
  vr = 1015,
  Go = 1016,
  Qm = 1017,
  Jm = 1018,
  jr = 1020,
  Q0 = 1021,
  hi = 1023,
  J0 = 1024,
  ex = 1025,
  qr = 1026,
  Ws = 1027,
  tx = 1028,
  eg = 1029,
  nx = 1030,
  tg = 1031,
  ng = 1033,
  Ru = 33776,
  Cu = 33777,
  bu = 33778,
  Pu = 33779,
  xp = 35840,
  yp = 35841,
  Sp = 35842,
  Mp = 35843,
  ig = 36196,
  Ep = 37492,
  Tp = 37496,
  wp = 37808,
  Ap = 37809,
  Rp = 37810,
  Cp = 37811,
  bp = 37812,
  Pp = 37813,
  Lp = 37814,
  Dp = 37815,
  Np = 37816,
  Up = 37817,
  Ip = 37818,
  Fp = 37819,
  Op = 37820,
  kp = 37821,
  Lu = 36492,
  zp = 36494,
  Bp = 36495,
  ix = 36283,
  Hp = 36284,
  Gp = 36285,
  Vp = 36286,
  rg = 3e3,
  Yr = 3001,
  rx = 3200,
  sx = 3201,
  ox = 0,
  ax = 1,
  Jn = "",
  ln = "srgb",
  Gi = "srgb-linear",
  xf = "display-p3",
  kl = "display-p3-linear",
  Ll = "linear",
  It = "srgb",
  Dl = "rec709",
  Nl = "p3",
  ys = 7680,
  Wp = 519,
  lx = 512,
  cx = 513,
  ux = 514,
  sg = 515,
  fx = 516,
  dx = 517,
  hx = 518,
  px = 519,
  Xp = 35044,
  jp = "300 es",
  ff = 1035,
  Bi = 2e3,
  Ul = 2001;
class qs {
  addEventListener(e, n) {
    this._listeners === void 0 && (this._listeners = {});
    const s = this._listeners;
    (s[e] === void 0 && (s[e] = []), s[e].indexOf(n) === -1 && s[e].push(n));
  }
  hasEventListener(e, n) {
    if (this._listeners === void 0) return !1;
    const s = this._listeners;
    return s[e] !== void 0 && s[e].indexOf(n) !== -1;
  }
  removeEventListener(e, n) {
    if (this._listeners === void 0) return;
    const a = this._listeners[e];
    if (a !== void 0) {
      const l = a.indexOf(n);
      l !== -1 && a.splice(l, 1);
    }
  }
  dispatchEvent(e) {
    if (this._listeners === void 0) return;
    const s = this._listeners[e.type];
    if (s !== void 0) {
      e.target = this;
      const a = s.slice(0);
      for (let l = 0, f = a.length; l < f; l++) a[l].call(this, e);
      e.target = null;
    }
  }
}
const mn = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "0a",
  "0b",
  "0c",
  "0d",
  "0e",
  "0f",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "1a",
  "1b",
  "1c",
  "1d",
  "1e",
  "1f",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "2a",
  "2b",
  "2c",
  "2d",
  "2e",
  "2f",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "3a",
  "3b",
  "3c",
  "3d",
  "3e",
  "3f",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "4a",
  "4b",
  "4c",
  "4d",
  "4e",
  "4f",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "5a",
  "5b",
  "5c",
  "5d",
  "5e",
  "5f",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "6a",
  "6b",
  "6c",
  "6d",
  "6e",
  "6f",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "7a",
  "7b",
  "7c",
  "7d",
  "7e",
  "7f",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "8a",
  "8b",
  "8c",
  "8d",
  "8e",
  "8f",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
  "9a",
  "9b",
  "9c",
  "9d",
  "9e",
  "9f",
  "a0",
  "a1",
  "a2",
  "a3",
  "a4",
  "a5",
  "a6",
  "a7",
  "a8",
  "a9",
  "aa",
  "ab",
  "ac",
  "ad",
  "ae",
  "af",
  "b0",
  "b1",
  "b2",
  "b3",
  "b4",
  "b5",
  "b6",
  "b7",
  "b8",
  "b9",
  "ba",
  "bb",
  "bc",
  "bd",
  "be",
  "bf",
  "c0",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
  "ca",
  "cb",
  "cc",
  "cd",
  "ce",
  "cf",
  "d0",
  "d1",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "d8",
  "d9",
  "da",
  "db",
  "dc",
  "dd",
  "de",
  "df",
  "e0",
  "e1",
  "e2",
  "e3",
  "e4",
  "e5",
  "e6",
  "e7",
  "e8",
  "e9",
  "ea",
  "eb",
  "ec",
  "ed",
  "ee",
  "ef",
  "f0",
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
  "f8",
  "f9",
  "fa",
  "fb",
  "fc",
  "fd",
  "fe",
  "ff",
];
let qp = 1234567;
const ko = Math.PI / 180,
  Vo = 180 / Math.PI;
function Ys() {
  const r = (Math.random() * 4294967295) | 0,
    e = (Math.random() * 4294967295) | 0,
    n = (Math.random() * 4294967295) | 0,
    s = (Math.random() * 4294967295) | 0;
  return (
    mn[r & 255] +
    mn[(r >> 8) & 255] +
    mn[(r >> 16) & 255] +
    mn[(r >> 24) & 255] +
    "-" +
    mn[e & 255] +
    mn[(e >> 8) & 255] +
    "-" +
    mn[((e >> 16) & 15) | 64] +
    mn[(e >> 24) & 255] +
    "-" +
    mn[(n & 63) | 128] +
    mn[(n >> 8) & 255] +
    "-" +
    mn[(n >> 16) & 255] +
    mn[(n >> 24) & 255] +
    mn[s & 255] +
    mn[(s >> 8) & 255] +
    mn[(s >> 16) & 255] +
    mn[(s >> 24) & 255]
  ).toLowerCase();
}
function Tn(r, e, n) {
  return Math.max(e, Math.min(n, r));
}
function yf(r, e) {
  return ((r % e) + e) % e;
}
function mx(r, e, n, s, a) {
  return s + ((r - e) * (a - s)) / (n - e);
}
function gx(r, e, n) {
  return r !== e ? (n - r) / (e - r) : 0;
}
function zo(r, e, n) {
  return (1 - n) * r + n * e;
}
function _x(r, e, n, s) {
  return zo(r, e, 1 - Math.exp(-n * s));
}
function vx(r, e = 1) {
  return e - Math.abs(yf(r, e * 2) - e);
}
function xx(r, e, n) {
  return r <= e ? 0 : r >= n ? 1 : ((r = (r - e) / (n - e)), r * r * (3 - 2 * r));
}
function yx(r, e, n) {
  return r <= e ? 0 : r >= n ? 1 : ((r = (r - e) / (n - e)), r * r * r * (r * (r * 6 - 15) + 10));
}
function Sx(r, e) {
  return r + Math.floor(Math.random() * (e - r + 1));
}
function Mx(r, e) {
  return r + Math.random() * (e - r);
}
function Ex(r) {
  return r * (0.5 - Math.random());
}
function Tx(r) {
  r !== void 0 && (qp = r);
  let e = (qp += 1831565813);
  return (
    (e = Math.imul(e ^ (e >>> 15), e | 1)),
    (e ^= e + Math.imul(e ^ (e >>> 7), e | 61)),
    ((e ^ (e >>> 14)) >>> 0) / 4294967296
  );
}
function wx(r) {
  return r * ko;
}
function Ax(r) {
  return r * Vo;
}
function df(r) {
  return (r & (r - 1)) === 0 && r !== 0;
}
function Rx(r) {
  return Math.pow(2, Math.ceil(Math.log(r) / Math.LN2));
}
function Il(r) {
  return Math.pow(2, Math.floor(Math.log(r) / Math.LN2));
}
function Cx(r, e, n, s, a) {
  const l = Math.cos,
    f = Math.sin,
    u = l(n / 2),
    h = f(n / 2),
    m = l((e + s) / 2),
    g = f((e + s) / 2),
    v = l((e - s) / 2),
    y = f((e - s) / 2),
    S = l((s - e) / 2),
    T = f((s - e) / 2);
  switch (a) {
    case "XYX":
      r.set(u * g, h * v, h * y, u * m);
      break;
    case "YZY":
      r.set(h * y, u * g, h * v, u * m);
      break;
    case "ZXZ":
      r.set(h * v, h * y, u * g, u * m);
      break;
    case "XZX":
      r.set(u * g, h * T, h * S, u * m);
      break;
    case "YXY":
      r.set(h * S, u * g, h * T, u * m);
      break;
    case "ZYZ":
      r.set(h * T, h * S, u * g, u * m);
      break;
    default:
      console.warn(
        "THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + a,
      );
  }
}
function Fs(r, e) {
  switch (e.constructor) {
    case Float32Array:
      return r;
    case Uint32Array:
      return r / 4294967295;
    case Uint16Array:
      return r / 65535;
    case Uint8Array:
      return r / 255;
    case Int32Array:
      return Math.max(r / 2147483647, -1);
    case Int16Array:
      return Math.max(r / 32767, -1);
    case Int8Array:
      return Math.max(r / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function Sn(r, e) {
  switch (e.constructor) {
    case Float32Array:
      return r;
    case Uint32Array:
      return Math.round(r * 4294967295);
    case Uint16Array:
      return Math.round(r * 65535);
    case Uint8Array:
      return Math.round(r * 255);
    case Int32Array:
      return Math.round(r * 2147483647);
    case Int16Array:
      return Math.round(r * 32767);
    case Int8Array:
      return Math.round(r * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
const bx = {
  DEG2RAD: ko,
  RAD2DEG: Vo,
  generateUUID: Ys,
  clamp: Tn,
  euclideanModulo: yf,
  mapLinear: mx,
  inverseLerp: gx,
  lerp: zo,
  damp: _x,
  pingpong: vx,
  smoothstep: xx,
  smootherstep: yx,
  randInt: Sx,
  randFloat: Mx,
  randFloatSpread: Ex,
  seededRandom: Tx,
  degToRad: wx,
  radToDeg: Ax,
  isPowerOfTwo: df,
  ceilPowerOfTwo: Rx,
  floorPowerOfTwo: Il,
  setQuaternionFromProperEuler: Cx,
  normalize: Sn,
  denormalize: Fs,
};
class Rt {
  constructor(e = 0, n = 0) {
    ((Rt.prototype.isVector2 = !0), (this.x = e), (this.y = n));
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, n) {
    return ((this.x = e), (this.y = n), this);
  }
  setScalar(e) {
    return ((this.x = e), (this.y = e), this);
  }
  setX(e) {
    return ((this.x = e), this);
  }
  setY(e) {
    return ((this.y = e), this);
  }
  setComponent(e, n) {
    switch (e) {
      case 0:
        this.x = n;
        break;
      case 1:
        this.y = n;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return ((this.x = e.x), (this.y = e.y), this);
  }
  add(e) {
    return ((this.x += e.x), (this.y += e.y), this);
  }
  addScalar(e) {
    return ((this.x += e), (this.y += e), this);
  }
  addVectors(e, n) {
    return ((this.x = e.x + n.x), (this.y = e.y + n.y), this);
  }
  addScaledVector(e, n) {
    return ((this.x += e.x * n), (this.y += e.y * n), this);
  }
  sub(e) {
    return ((this.x -= e.x), (this.y -= e.y), this);
  }
  subScalar(e) {
    return ((this.x -= e), (this.y -= e), this);
  }
  subVectors(e, n) {
    return ((this.x = e.x - n.x), (this.y = e.y - n.y), this);
  }
  multiply(e) {
    return ((this.x *= e.x), (this.y *= e.y), this);
  }
  multiplyScalar(e) {
    return ((this.x *= e), (this.y *= e), this);
  }
  divide(e) {
    return ((this.x /= e.x), (this.y /= e.y), this);
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const n = this.x,
      s = this.y,
      a = e.elements;
    return ((this.x = a[0] * n + a[3] * s + a[6]), (this.y = a[1] * n + a[4] * s + a[7]), this);
  }
  min(e) {
    return ((this.x = Math.min(this.x, e.x)), (this.y = Math.min(this.y, e.y)), this);
  }
  max(e) {
    return ((this.x = Math.max(this.x, e.x)), (this.y = Math.max(this.y, e.y)), this);
  }
  clamp(e, n) {
    return (
      (this.x = Math.max(e.x, Math.min(n.x, this.x))),
      (this.y = Math.max(e.y, Math.min(n.y, this.y))),
      this
    );
  }
  clampScalar(e, n) {
    return (
      (this.x = Math.max(e, Math.min(n, this.x))), (this.y = Math.max(e, Math.min(n, this.y))), this
    );
  }
  clampLength(e, n) {
    const s = this.length();
    return this.divideScalar(s || 1).multiplyScalar(Math.max(e, Math.min(n, s)));
  }
  floor() {
    return ((this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this);
  }
  ceil() {
    return ((this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this);
  }
  round() {
    return ((this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this);
  }
  roundToZero() {
    return ((this.x = Math.trunc(this.x)), (this.y = Math.trunc(this.y)), this);
  }
  negate() {
    return ((this.x = -this.x), (this.y = -this.y), this);
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    const n = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (n === 0) return Math.PI / 2;
    const s = this.dot(e) / n;
    return Math.acos(Tn(s, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const n = this.x - e.x,
      s = this.y - e.y;
    return n * n + s * s;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, n) {
    return ((this.x += (e.x - this.x) * n), (this.y += (e.y - this.y) * n), this);
  }
  lerpVectors(e, n, s) {
    return ((this.x = e.x + (n.x - e.x) * s), (this.y = e.y + (n.y - e.y) * s), this);
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, n = 0) {
    return ((this.x = e[n]), (this.y = e[n + 1]), this);
  }
  toArray(e = [], n = 0) {
    return ((e[n] = this.x), (e[n + 1] = this.y), e);
  }
  fromBufferAttribute(e, n) {
    return ((this.x = e.getX(n)), (this.y = e.getY(n)), this);
  }
  rotateAround(e, n) {
    const s = Math.cos(n),
      a = Math.sin(n),
      l = this.x - e.x,
      f = this.y - e.y;
    return ((this.x = l * s - f * a + e.x), (this.y = l * a + f * s + e.y), this);
  }
  random() {
    return ((this.x = Math.random()), (this.y = Math.random()), this);
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y);
  }
}
class pt {
  constructor(e, n, s, a, l, f, u, h, m) {
    ((pt.prototype.isMatrix3 = !0),
      (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
      e !== void 0 && this.set(e, n, s, a, l, f, u, h, m));
  }
  set(e, n, s, a, l, f, u, h, m) {
    const g = this.elements;
    return (
      (g[0] = e),
      (g[1] = a),
      (g[2] = u),
      (g[3] = n),
      (g[4] = l),
      (g[5] = h),
      (g[6] = s),
      (g[7] = f),
      (g[8] = m),
      this
    );
  }
  identity() {
    return (this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this);
  }
  copy(e) {
    const n = this.elements,
      s = e.elements;
    return (
      (n[0] = s[0]),
      (n[1] = s[1]),
      (n[2] = s[2]),
      (n[3] = s[3]),
      (n[4] = s[4]),
      (n[5] = s[5]),
      (n[6] = s[6]),
      (n[7] = s[7]),
      (n[8] = s[8]),
      this
    );
  }
  extractBasis(e, n, s) {
    return (
      e.setFromMatrix3Column(this, 0),
      n.setFromMatrix3Column(this, 1),
      s.setFromMatrix3Column(this, 2),
      this
    );
  }
  setFromMatrix4(e) {
    const n = e.elements;
    return (this.set(n[0], n[4], n[8], n[1], n[5], n[9], n[2], n[6], n[10]), this);
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, n) {
    const s = e.elements,
      a = n.elements,
      l = this.elements,
      f = s[0],
      u = s[3],
      h = s[6],
      m = s[1],
      g = s[4],
      v = s[7],
      y = s[2],
      S = s[5],
      T = s[8],
      E = a[0],
      x = a[3],
      _ = a[6],
      D = a[1],
      R = a[4],
      N = a[7],
      z = a[2],
      I = a[5],
      F = a[8];
    return (
      (l[0] = f * E + u * D + h * z),
      (l[3] = f * x + u * R + h * I),
      (l[6] = f * _ + u * N + h * F),
      (l[1] = m * E + g * D + v * z),
      (l[4] = m * x + g * R + v * I),
      (l[7] = m * _ + g * N + v * F),
      (l[2] = y * E + S * D + T * z),
      (l[5] = y * x + S * R + T * I),
      (l[8] = y * _ + S * N + T * F),
      this
    );
  }
  multiplyScalar(e) {
    const n = this.elements;
    return (
      (n[0] *= e),
      (n[3] *= e),
      (n[6] *= e),
      (n[1] *= e),
      (n[4] *= e),
      (n[7] *= e),
      (n[2] *= e),
      (n[5] *= e),
      (n[8] *= e),
      this
    );
  }
  determinant() {
    const e = this.elements,
      n = e[0],
      s = e[1],
      a = e[2],
      l = e[3],
      f = e[4],
      u = e[5],
      h = e[6],
      m = e[7],
      g = e[8];
    return n * f * g - n * u * m - s * l * g + s * u * h + a * l * m - a * f * h;
  }
  invert() {
    const e = this.elements,
      n = e[0],
      s = e[1],
      a = e[2],
      l = e[3],
      f = e[4],
      u = e[5],
      h = e[6],
      m = e[7],
      g = e[8],
      v = g * f - u * m,
      y = u * h - g * l,
      S = m * l - f * h,
      T = n * v + s * y + a * S;
    if (T === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const E = 1 / T;
    return (
      (e[0] = v * E),
      (e[1] = (a * m - g * s) * E),
      (e[2] = (u * s - a * f) * E),
      (e[3] = y * E),
      (e[4] = (g * n - a * h) * E),
      (e[5] = (a * l - u * n) * E),
      (e[6] = S * E),
      (e[7] = (s * h - m * n) * E),
      (e[8] = (f * n - s * l) * E),
      this
    );
  }
  transpose() {
    let e;
    const n = this.elements;
    return (
      (e = n[1]),
      (n[1] = n[3]),
      (n[3] = e),
      (e = n[2]),
      (n[2] = n[6]),
      (n[6] = e),
      (e = n[5]),
      (n[5] = n[7]),
      (n[7] = e),
      this
    );
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const n = this.elements;
    return (
      (e[0] = n[0]),
      (e[1] = n[3]),
      (e[2] = n[6]),
      (e[3] = n[1]),
      (e[4] = n[4]),
      (e[5] = n[7]),
      (e[6] = n[2]),
      (e[7] = n[5]),
      (e[8] = n[8]),
      this
    );
  }
  setUvTransform(e, n, s, a, l, f, u) {
    const h = Math.cos(l),
      m = Math.sin(l);
    return (
      this.set(
        s * h,
        s * m,
        -s * (h * f + m * u) + f + e,
        -a * m,
        a * h,
        -a * (-m * f + h * u) + u + n,
        0,
        0,
        1,
      ),
      this
    );
  }
  scale(e, n) {
    return (this.premultiply(Du.makeScale(e, n)), this);
  }
  rotate(e) {
    return (this.premultiply(Du.makeRotation(-e)), this);
  }
  translate(e, n) {
    return (this.premultiply(Du.makeTranslation(e, n)), this);
  }
  makeTranslation(e, n) {
    return (
      e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, n, 0, 0, 1),
      this
    );
  }
  makeRotation(e) {
    const n = Math.cos(e),
      s = Math.sin(e);
    return (this.set(n, -s, 0, s, n, 0, 0, 0, 1), this);
  }
  makeScale(e, n) {
    return (this.set(e, 0, 0, 0, n, 0, 0, 0, 1), this);
  }
  equals(e) {
    const n = this.elements,
      s = e.elements;
    for (let a = 0; a < 9; a++) if (n[a] !== s[a]) return !1;
    return !0;
  }
  fromArray(e, n = 0) {
    for (let s = 0; s < 9; s++) this.elements[s] = e[s + n];
    return this;
  }
  toArray(e = [], n = 0) {
    const s = this.elements;
    return (
      (e[n] = s[0]),
      (e[n + 1] = s[1]),
      (e[n + 2] = s[2]),
      (e[n + 3] = s[3]),
      (e[n + 4] = s[4]),
      (e[n + 5] = s[5]),
      (e[n + 6] = s[6]),
      (e[n + 7] = s[7]),
      (e[n + 8] = s[8]),
      e
    );
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const Du = new pt();
function og(r) {
  for (let e = r.length - 1; e >= 0; --e) if (r[e] >= 65535) return !0;
  return !1;
}
function Fl(r) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", r);
}
function Px() {
  const r = Fl("canvas");
  return ((r.style.display = "block"), r);
}
const Yp = {};
function Bo(r) {
  r in Yp || ((Yp[r] = !0), console.warn(r));
}
const $p = new pt().set(
    0.8224621,
    0.177538,
    0,
    0.0331941,
    0.9668058,
    0,
    0.0170827,
    0.0723974,
    0.9105199,
  ),
  Kp = new pt().set(
    1.2249401,
    -0.2249404,
    0,
    -0.0420569,
    1.0420571,
    0,
    -0.0196376,
    -0.0786361,
    1.0982735,
  ),
  tl = {
    [Gi]: { transfer: Ll, primaries: Dl, toReference: (r) => r, fromReference: (r) => r },
    [ln]: {
      transfer: It,
      primaries: Dl,
      toReference: (r) => r.convertSRGBToLinear(),
      fromReference: (r) => r.convertLinearToSRGB(),
    },
    [kl]: {
      transfer: Ll,
      primaries: Nl,
      toReference: (r) => r.applyMatrix3(Kp),
      fromReference: (r) => r.applyMatrix3($p),
    },
    [xf]: {
      transfer: It,
      primaries: Nl,
      toReference: (r) => r.convertSRGBToLinear().applyMatrix3(Kp),
      fromReference: (r) => r.applyMatrix3($p).convertLinearToSRGB(),
    },
  },
  Lx = new Set([Gi, kl]),
  At = {
    enabled: !0,
    _workingColorSpace: Gi,
    get workingColorSpace() {
      return this._workingColorSpace;
    },
    set workingColorSpace(r) {
      if (!Lx.has(r)) throw new Error(`Unsupported working color space, "${r}".`);
      this._workingColorSpace = r;
    },
    convert: function (r, e, n) {
      if (this.enabled === !1 || e === n || !e || !n) return r;
      const s = tl[e].toReference,
        a = tl[n].fromReference;
      return a(s(r));
    },
    fromWorkingColorSpace: function (r, e) {
      return this.convert(r, this._workingColorSpace, e);
    },
    toWorkingColorSpace: function (r, e) {
      return this.convert(r, e, this._workingColorSpace);
    },
    getPrimaries: function (r) {
      return tl[r].primaries;
    },
    getTransfer: function (r) {
      return r === Jn ? Ll : tl[r].transfer;
    },
  };
function Hs(r) {
  return r < 0.04045 ? r * 0.0773993808 : Math.pow(r * 0.9478672986 + 0.0521327014, 2.4);
}
function Nu(r) {
  return r < 0.0031308 ? r * 12.92 : 1.055 * Math.pow(r, 0.41666) - 0.055;
}
let Ss;
class ag {
  static getDataURL(e) {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
    let n;
    if (e instanceof HTMLCanvasElement) n = e;
    else {
      (Ss === void 0 && (Ss = Fl("canvas")), (Ss.width = e.width), (Ss.height = e.height));
      const s = Ss.getContext("2d");
      (e instanceof ImageData ? s.putImageData(e, 0, 0) : s.drawImage(e, 0, 0, e.width, e.height),
        (n = Ss));
    }
    return n.width > 2048 || n.height > 2048
      ? (console.warn(
          "THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",
          e,
        ),
        n.toDataURL("image/jpeg", 0.6))
      : n.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if (
      (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement) ||
      (typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement) ||
      (typeof ImageBitmap < "u" && e instanceof ImageBitmap)
    ) {
      const n = Fl("canvas");
      ((n.width = e.width), (n.height = e.height));
      const s = n.getContext("2d");
      s.drawImage(e, 0, 0, e.width, e.height);
      const a = s.getImageData(0, 0, e.width, e.height),
        l = a.data;
      for (let f = 0; f < l.length; f++) l[f] = Hs(l[f] / 255) * 255;
      return (s.putImageData(a, 0, 0), n);
    } else if (e.data) {
      const n = e.data.slice(0);
      for (let s = 0; s < n.length; s++)
        n instanceof Uint8Array || n instanceof Uint8ClampedArray
          ? (n[s] = Math.floor(Hs(n[s] / 255) * 255))
          : (n[s] = Hs(n[s]));
      return { data: n, width: e.width, height: e.height };
    } else
      return (
        console.warn(
          "THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.",
        ),
        e
      );
  }
}
let Dx = 0;
class lg {
  constructor(e = null) {
    ((this.isSource = !0),
      Object.defineProperty(this, "id", { value: Dx++ }),
      (this.uuid = Ys()),
      (this.data = e),
      (this.version = 0));
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const n = e === void 0 || typeof e == "string";
    if (!n && e.images[this.uuid] !== void 0) return e.images[this.uuid];
    const s = { uuid: this.uuid, url: "" },
      a = this.data;
    if (a !== null) {
      let l;
      if (Array.isArray(a)) {
        l = [];
        for (let f = 0, u = a.length; f < u; f++)
          a[f].isDataTexture ? l.push(Uu(a[f].image)) : l.push(Uu(a[f]));
      } else l = Uu(a);
      s.url = l;
    }
    return (n || (e.images[this.uuid] = s), s);
  }
}
function Uu(r) {
  return (typeof HTMLImageElement < "u" && r instanceof HTMLImageElement) ||
    (typeof HTMLCanvasElement < "u" && r instanceof HTMLCanvasElement) ||
    (typeof ImageBitmap < "u" && r instanceof ImageBitmap)
    ? ag.getDataURL(r)
    : r.data
      ? {
          data: Array.from(r.data),
          width: r.width,
          height: r.height,
          type: r.data.constructor.name,
        }
      : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let Nx = 0;
class Gn extends qs {
  constructor(
    e = Gn.DEFAULT_IMAGE,
    n = Gn.DEFAULT_MAPPING,
    s = di,
    a = di,
    l = Qn,
    f = Ho,
    u = hi,
    h = Sr,
    m = Gn.DEFAULT_ANISOTROPY,
    g = Jn,
  ) {
    (super(),
      (this.isTexture = !0),
      Object.defineProperty(this, "id", { value: Nx++ }),
      (this.uuid = Ys()),
      (this.name = ""),
      (this.source = new lg(e)),
      (this.mipmaps = []),
      (this.mapping = n),
      (this.channel = 0),
      (this.wrapS = s),
      (this.wrapT = a),
      (this.magFilter = l),
      (this.minFilter = f),
      (this.anisotropy = m),
      (this.format = u),
      (this.internalFormat = null),
      (this.type = h),
      (this.offset = new Rt(0, 0)),
      (this.repeat = new Rt(1, 1)),
      (this.center = new Rt(0, 0)),
      (this.rotation = 0),
      (this.matrixAutoUpdate = !0),
      (this.matrix = new pt()),
      (this.generateMipmaps = !0),
      (this.premultiplyAlpha = !1),
      (this.flipY = !0),
      (this.unpackAlignment = 4),
      typeof g == "string"
        ? (this.colorSpace = g)
        : (Bo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),
          (this.colorSpace = g === Yr ? ln : Jn)),
      (this.userData = {}),
      (this.version = 0),
      (this.onUpdate = null),
      (this.isRenderTargetTexture = !1),
      (this.needsPMREMUpdate = !1));
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(
      this.offset.x,
      this.offset.y,
      this.repeat.x,
      this.repeat.y,
      this.rotation,
      this.center.x,
      this.center.y,
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return (
      (this.name = e.name),
      (this.source = e.source),
      (this.mipmaps = e.mipmaps.slice(0)),
      (this.mapping = e.mapping),
      (this.channel = e.channel),
      (this.wrapS = e.wrapS),
      (this.wrapT = e.wrapT),
      (this.magFilter = e.magFilter),
      (this.minFilter = e.minFilter),
      (this.anisotropy = e.anisotropy),
      (this.format = e.format),
      (this.internalFormat = e.internalFormat),
      (this.type = e.type),
      this.offset.copy(e.offset),
      this.repeat.copy(e.repeat),
      this.center.copy(e.center),
      (this.rotation = e.rotation),
      (this.matrixAutoUpdate = e.matrixAutoUpdate),
      this.matrix.copy(e.matrix),
      (this.generateMipmaps = e.generateMipmaps),
      (this.premultiplyAlpha = e.premultiplyAlpha),
      (this.flipY = e.flipY),
      (this.unpackAlignment = e.unpackAlignment),
      (this.colorSpace = e.colorSpace),
      (this.userData = JSON.parse(JSON.stringify(e.userData))),
      (this.needsUpdate = !0),
      this
    );
  }
  toJSON(e) {
    const n = e === void 0 || typeof e == "string";
    if (!n && e.textures[this.uuid] !== void 0) return e.textures[this.uuid];
    const s = {
      metadata: { version: 4.6, type: "Texture", generator: "Texture.toJSON" },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment,
    };
    return (
      Object.keys(this.userData).length > 0 && (s.userData = this.userData),
      n || (e.textures[this.uuid] = s),
      s
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping !== Km) return e;
    if ((e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1))
      switch (this.wrapS) {
        case cf:
          e.x = e.x - Math.floor(e.x);
          break;
        case di:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case uf:
          Math.abs(Math.floor(e.x) % 2) === 1
            ? (e.x = Math.ceil(e.x) - e.x)
            : (e.x = e.x - Math.floor(e.x));
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case cf:
          e.y = e.y - Math.floor(e.y);
          break;
        case di:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case uf:
          Math.abs(Math.floor(e.y) % 2) === 1
            ? (e.y = Math.ceil(e.y) - e.y)
            : (e.y = e.y - Math.floor(e.y));
          break;
      }
    return (this.flipY && (e.y = 1 - e.y), e);
  }
  set needsUpdate(e) {
    e === !0 && (this.version++, (this.source.needsUpdate = !0));
  }
  get encoding() {
    return (
      Bo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),
      this.colorSpace === ln ? Yr : rg
    );
  }
  set encoding(e) {
    (Bo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),
      (this.colorSpace = e === Yr ? ln : Jn));
  }
}
Gn.DEFAULT_IMAGE = null;
Gn.DEFAULT_MAPPING = Km;
Gn.DEFAULT_ANISOTROPY = 1;
class cn {
  constructor(e = 0, n = 0, s = 0, a = 1) {
    ((cn.prototype.isVector4 = !0), (this.x = e), (this.y = n), (this.z = s), (this.w = a));
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, n, s, a) {
    return ((this.x = e), (this.y = n), (this.z = s), (this.w = a), this);
  }
  setScalar(e) {
    return ((this.x = e), (this.y = e), (this.z = e), (this.w = e), this);
  }
  setX(e) {
    return ((this.x = e), this);
  }
  setY(e) {
    return ((this.y = e), this);
  }
  setZ(e) {
    return ((this.z = e), this);
  }
  setW(e) {
    return ((this.w = e), this);
  }
  setComponent(e, n) {
    switch (e) {
      case 0:
        this.x = n;
        break;
      case 1:
        this.y = n;
        break;
      case 2:
        this.z = n;
        break;
      case 3:
        this.w = n;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return (
      (this.x = e.x), (this.y = e.y), (this.z = e.z), (this.w = e.w !== void 0 ? e.w : 1), this
    );
  }
  add(e) {
    return ((this.x += e.x), (this.y += e.y), (this.z += e.z), (this.w += e.w), this);
  }
  addScalar(e) {
    return ((this.x += e), (this.y += e), (this.z += e), (this.w += e), this);
  }
  addVectors(e, n) {
    return (
      (this.x = e.x + n.x), (this.y = e.y + n.y), (this.z = e.z + n.z), (this.w = e.w + n.w), this
    );
  }
  addScaledVector(e, n) {
    return (
      (this.x += e.x * n), (this.y += e.y * n), (this.z += e.z * n), (this.w += e.w * n), this
    );
  }
  sub(e) {
    return ((this.x -= e.x), (this.y -= e.y), (this.z -= e.z), (this.w -= e.w), this);
  }
  subScalar(e) {
    return ((this.x -= e), (this.y -= e), (this.z -= e), (this.w -= e), this);
  }
  subVectors(e, n) {
    return (
      (this.x = e.x - n.x), (this.y = e.y - n.y), (this.z = e.z - n.z), (this.w = e.w - n.w), this
    );
  }
  multiply(e) {
    return ((this.x *= e.x), (this.y *= e.y), (this.z *= e.z), (this.w *= e.w), this);
  }
  multiplyScalar(e) {
    return ((this.x *= e), (this.y *= e), (this.z *= e), (this.w *= e), this);
  }
  applyMatrix4(e) {
    const n = this.x,
      s = this.y,
      a = this.z,
      l = this.w,
      f = e.elements;
    return (
      (this.x = f[0] * n + f[4] * s + f[8] * a + f[12] * l),
      (this.y = f[1] * n + f[5] * s + f[9] * a + f[13] * l),
      (this.z = f[2] * n + f[6] * s + f[10] * a + f[14] * l),
      (this.w = f[3] * n + f[7] * s + f[11] * a + f[15] * l),
      this
    );
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const n = Math.sqrt(1 - e.w * e.w);
    return (
      n < 1e-4
        ? ((this.x = 1), (this.y = 0), (this.z = 0))
        : ((this.x = e.x / n), (this.y = e.y / n), (this.z = e.z / n)),
      this
    );
  }
  setAxisAngleFromRotationMatrix(e) {
    let n, s, a, l;
    const h = e.elements,
      m = h[0],
      g = h[4],
      v = h[8],
      y = h[1],
      S = h[5],
      T = h[9],
      E = h[2],
      x = h[6],
      _ = h[10];
    if (Math.abs(g - y) < 0.01 && Math.abs(v - E) < 0.01 && Math.abs(T - x) < 0.01) {
      if (
        Math.abs(g + y) < 0.1 &&
        Math.abs(v + E) < 0.1 &&
        Math.abs(T + x) < 0.1 &&
        Math.abs(m + S + _ - 3) < 0.1
      )
        return (this.set(1, 0, 0, 0), this);
      n = Math.PI;
      const R = (m + 1) / 2,
        N = (S + 1) / 2,
        z = (_ + 1) / 2,
        I = (g + y) / 4,
        F = (v + E) / 4,
        X = (T + x) / 4;
      return (
        R > N && R > z
          ? R < 0.01
            ? ((s = 0), (a = 0.707106781), (l = 0.707106781))
            : ((s = Math.sqrt(R)), (a = I / s), (l = F / s))
          : N > z
            ? N < 0.01
              ? ((s = 0.707106781), (a = 0), (l = 0.707106781))
              : ((a = Math.sqrt(N)), (s = I / a), (l = X / a))
            : z < 0.01
              ? ((s = 0.707106781), (a = 0.707106781), (l = 0))
              : ((l = Math.sqrt(z)), (s = F / l), (a = X / l)),
        this.set(s, a, l, n),
        this
      );
    }
    let D = Math.sqrt((x - T) * (x - T) + (v - E) * (v - E) + (y - g) * (y - g));
    return (
      Math.abs(D) < 0.001 && (D = 1),
      (this.x = (x - T) / D),
      (this.y = (v - E) / D),
      (this.z = (y - g) / D),
      (this.w = Math.acos((m + S + _ - 1) / 2)),
      this
    );
  }
  min(e) {
    return (
      (this.x = Math.min(this.x, e.x)),
      (this.y = Math.min(this.y, e.y)),
      (this.z = Math.min(this.z, e.z)),
      (this.w = Math.min(this.w, e.w)),
      this
    );
  }
  max(e) {
    return (
      (this.x = Math.max(this.x, e.x)),
      (this.y = Math.max(this.y, e.y)),
      (this.z = Math.max(this.z, e.z)),
      (this.w = Math.max(this.w, e.w)),
      this
    );
  }
  clamp(e, n) {
    return (
      (this.x = Math.max(e.x, Math.min(n.x, this.x))),
      (this.y = Math.max(e.y, Math.min(n.y, this.y))),
      (this.z = Math.max(e.z, Math.min(n.z, this.z))),
      (this.w = Math.max(e.w, Math.min(n.w, this.w))),
      this
    );
  }
  clampScalar(e, n) {
    return (
      (this.x = Math.max(e, Math.min(n, this.x))),
      (this.y = Math.max(e, Math.min(n, this.y))),
      (this.z = Math.max(e, Math.min(n, this.z))),
      (this.w = Math.max(e, Math.min(n, this.w))),
      this
    );
  }
  clampLength(e, n) {
    const s = this.length();
    return this.divideScalar(s || 1).multiplyScalar(Math.max(e, Math.min(n, s)));
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      (this.w = Math.floor(this.w)),
      this
    );
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)),
      (this.y = Math.ceil(this.y)),
      (this.z = Math.ceil(this.z)),
      (this.w = Math.ceil(this.w)),
      this
    );
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      (this.w = Math.round(this.w)),
      this
    );
  }
  roundToZero() {
    return (
      (this.x = Math.trunc(this.x)),
      (this.y = Math.trunc(this.y)),
      (this.z = Math.trunc(this.z)),
      (this.w = Math.trunc(this.w)),
      this
    );
  }
  negate() {
    return ((this.x = -this.x), (this.y = -this.y), (this.z = -this.z), (this.w = -this.w), this);
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, n) {
    return (
      (this.x += (e.x - this.x) * n),
      (this.y += (e.y - this.y) * n),
      (this.z += (e.z - this.z) * n),
      (this.w += (e.w - this.w) * n),
      this
    );
  }
  lerpVectors(e, n, s) {
    return (
      (this.x = e.x + (n.x - e.x) * s),
      (this.y = e.y + (n.y - e.y) * s),
      (this.z = e.z + (n.z - e.z) * s),
      (this.w = e.w + (n.w - e.w) * s),
      this
    );
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, n = 0) {
    return ((this.x = e[n]), (this.y = e[n + 1]), (this.z = e[n + 2]), (this.w = e[n + 3]), this);
  }
  toArray(e = [], n = 0) {
    return ((e[n] = this.x), (e[n + 1] = this.y), (e[n + 2] = this.z), (e[n + 3] = this.w), e);
  }
  fromBufferAttribute(e, n) {
    return (
      (this.x = e.getX(n)), (this.y = e.getY(n)), (this.z = e.getZ(n)), (this.w = e.getW(n)), this
    );
  }
  random() {
    return (
      (this.x = Math.random()),
      (this.y = Math.random()),
      (this.z = Math.random()),
      (this.w = Math.random()),
      this
    );
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y, yield this.z, yield this.w);
  }
}
class Ux extends qs {
  constructor(e = 1, n = 1, s = {}) {
    (super(),
      (this.isRenderTarget = !0),
      (this.width = e),
      (this.height = n),
      (this.depth = 1),
      (this.scissor = new cn(0, 0, e, n)),
      (this.scissorTest = !1),
      (this.viewport = new cn(0, 0, e, n)));
    const a = { width: e, height: n, depth: 1 };
    (s.encoding !== void 0 &&
      (Bo("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),
      (s.colorSpace = s.encoding === Yr ? ln : Jn)),
      (s = Object.assign(
        {
          generateMipmaps: !1,
          internalFormat: null,
          minFilter: Qn,
          depthBuffer: !0,
          stencilBuffer: !1,
          depthTexture: null,
          samples: 0,
        },
        s,
      )),
      (this.texture = new Gn(
        a,
        s.mapping,
        s.wrapS,
        s.wrapT,
        s.magFilter,
        s.minFilter,
        s.format,
        s.type,
        s.anisotropy,
        s.colorSpace,
      )),
      (this.texture.isRenderTargetTexture = !0),
      (this.texture.flipY = !1),
      (this.texture.generateMipmaps = s.generateMipmaps),
      (this.texture.internalFormat = s.internalFormat),
      (this.depthBuffer = s.depthBuffer),
      (this.stencilBuffer = s.stencilBuffer),
      (this.depthTexture = s.depthTexture),
      (this.samples = s.samples));
  }
  setSize(e, n, s = 1) {
    ((this.width !== e || this.height !== n || this.depth !== s) &&
      ((this.width = e),
      (this.height = n),
      (this.depth = s),
      (this.texture.image.width = e),
      (this.texture.image.height = n),
      (this.texture.image.depth = s),
      this.dispose()),
      this.viewport.set(0, 0, e, n),
      this.scissor.set(0, 0, e, n));
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    ((this.width = e.width),
      (this.height = e.height),
      (this.depth = e.depth),
      this.scissor.copy(e.scissor),
      (this.scissorTest = e.scissorTest),
      this.viewport.copy(e.viewport),
      (this.texture = e.texture.clone()),
      (this.texture.isRenderTargetTexture = !0));
    const n = Object.assign({}, e.texture.image);
    return (
      (this.texture.source = new lg(n)),
      (this.depthBuffer = e.depthBuffer),
      (this.stencilBuffer = e.stencilBuffer),
      e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()),
      (this.samples = e.samples),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class $r extends Ux {
  constructor(e = 1, n = 1, s = {}) {
    (super(e, n, s), (this.isWebGLRenderTarget = !0));
  }
}
class cg extends Gn {
  constructor(e = null, n = 1, s = 1, a = 1) {
    (super(null),
      (this.isDataArrayTexture = !0),
      (this.image = { data: e, width: n, height: s, depth: a }),
      (this.magFilter = En),
      (this.minFilter = En),
      (this.wrapR = di),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1));
  }
}
class Ix extends Gn {
  constructor(e = null, n = 1, s = 1, a = 1) {
    (super(null),
      (this.isData3DTexture = !0),
      (this.image = { data: e, width: n, height: s, depth: a }),
      (this.magFilter = En),
      (this.minFilter = En),
      (this.wrapR = di),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1));
  }
}
class Wo {
  constructor(e = 0, n = 0, s = 0, a = 1) {
    ((this.isQuaternion = !0), (this._x = e), (this._y = n), (this._z = s), (this._w = a));
  }
  static slerpFlat(e, n, s, a, l, f, u) {
    let h = s[a + 0],
      m = s[a + 1],
      g = s[a + 2],
      v = s[a + 3];
    const y = l[f + 0],
      S = l[f + 1],
      T = l[f + 2],
      E = l[f + 3];
    if (u === 0) {
      ((e[n + 0] = h), (e[n + 1] = m), (e[n + 2] = g), (e[n + 3] = v));
      return;
    }
    if (u === 1) {
      ((e[n + 0] = y), (e[n + 1] = S), (e[n + 2] = T), (e[n + 3] = E));
      return;
    }
    if (v !== E || h !== y || m !== S || g !== T) {
      let x = 1 - u;
      const _ = h * y + m * S + g * T + v * E,
        D = _ >= 0 ? 1 : -1,
        R = 1 - _ * _;
      if (R > Number.EPSILON) {
        const z = Math.sqrt(R),
          I = Math.atan2(z, _ * D);
        ((x = Math.sin(x * I) / z), (u = Math.sin(u * I) / z));
      }
      const N = u * D;
      if (
        ((h = h * x + y * N),
        (m = m * x + S * N),
        (g = g * x + T * N),
        (v = v * x + E * N),
        x === 1 - u)
      ) {
        const z = 1 / Math.sqrt(h * h + m * m + g * g + v * v);
        ((h *= z), (m *= z), (g *= z), (v *= z));
      }
    }
    ((e[n] = h), (e[n + 1] = m), (e[n + 2] = g), (e[n + 3] = v));
  }
  static multiplyQuaternionsFlat(e, n, s, a, l, f) {
    const u = s[a],
      h = s[a + 1],
      m = s[a + 2],
      g = s[a + 3],
      v = l[f],
      y = l[f + 1],
      S = l[f + 2],
      T = l[f + 3];
    return (
      (e[n] = u * T + g * v + h * S - m * y),
      (e[n + 1] = h * T + g * y + m * v - u * S),
      (e[n + 2] = m * T + g * S + u * y - h * v),
      (e[n + 3] = g * T - u * v - h * y - m * S),
      e
    );
  }
  get x() {
    return this._x;
  }
  set x(e) {
    ((this._x = e), this._onChangeCallback());
  }
  get y() {
    return this._y;
  }
  set y(e) {
    ((this._y = e), this._onChangeCallback());
  }
  get z() {
    return this._z;
  }
  set z(e) {
    ((this._z = e), this._onChangeCallback());
  }
  get w() {
    return this._w;
  }
  set w(e) {
    ((this._w = e), this._onChangeCallback());
  }
  set(e, n, s, a) {
    return (
      (this._x = e), (this._y = n), (this._z = s), (this._w = a), this._onChangeCallback(), this
    );
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return (
      (this._x = e.x),
      (this._y = e.y),
      (this._z = e.z),
      (this._w = e.w),
      this._onChangeCallback(),
      this
    );
  }
  setFromEuler(e, n = !0) {
    const s = e._x,
      a = e._y,
      l = e._z,
      f = e._order,
      u = Math.cos,
      h = Math.sin,
      m = u(s / 2),
      g = u(a / 2),
      v = u(l / 2),
      y = h(s / 2),
      S = h(a / 2),
      T = h(l / 2);
    switch (f) {
      case "XYZ":
        ((this._x = y * g * v + m * S * T),
          (this._y = m * S * v - y * g * T),
          (this._z = m * g * T + y * S * v),
          (this._w = m * g * v - y * S * T));
        break;
      case "YXZ":
        ((this._x = y * g * v + m * S * T),
          (this._y = m * S * v - y * g * T),
          (this._z = m * g * T - y * S * v),
          (this._w = m * g * v + y * S * T));
        break;
      case "ZXY":
        ((this._x = y * g * v - m * S * T),
          (this._y = m * S * v + y * g * T),
          (this._z = m * g * T + y * S * v),
          (this._w = m * g * v - y * S * T));
        break;
      case "ZYX":
        ((this._x = y * g * v - m * S * T),
          (this._y = m * S * v + y * g * T),
          (this._z = m * g * T - y * S * v),
          (this._w = m * g * v + y * S * T));
        break;
      case "YZX":
        ((this._x = y * g * v + m * S * T),
          (this._y = m * S * v + y * g * T),
          (this._z = m * g * T - y * S * v),
          (this._w = m * g * v - y * S * T));
        break;
      case "XZY":
        ((this._x = y * g * v - m * S * T),
          (this._y = m * S * v - y * g * T),
          (this._z = m * g * T + y * S * v),
          (this._w = m * g * v + y * S * T));
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + f);
    }
    return (n === !0 && this._onChangeCallback(), this);
  }
  setFromAxisAngle(e, n) {
    const s = n / 2,
      a = Math.sin(s);
    return (
      (this._x = e.x * a),
      (this._y = e.y * a),
      (this._z = e.z * a),
      (this._w = Math.cos(s)),
      this._onChangeCallback(),
      this
    );
  }
  setFromRotationMatrix(e) {
    const n = e.elements,
      s = n[0],
      a = n[4],
      l = n[8],
      f = n[1],
      u = n[5],
      h = n[9],
      m = n[2],
      g = n[6],
      v = n[10],
      y = s + u + v;
    if (y > 0) {
      const S = 0.5 / Math.sqrt(y + 1);
      ((this._w = 0.25 / S),
        (this._x = (g - h) * S),
        (this._y = (l - m) * S),
        (this._z = (f - a) * S));
    } else if (s > u && s > v) {
      const S = 2 * Math.sqrt(1 + s - u - v);
      ((this._w = (g - h) / S),
        (this._x = 0.25 * S),
        (this._y = (a + f) / S),
        (this._z = (l + m) / S));
    } else if (u > v) {
      const S = 2 * Math.sqrt(1 + u - s - v);
      ((this._w = (l - m) / S),
        (this._x = (a + f) / S),
        (this._y = 0.25 * S),
        (this._z = (h + g) / S));
    } else {
      const S = 2 * Math.sqrt(1 + v - s - u);
      ((this._w = (f - a) / S),
        (this._x = (l + m) / S),
        (this._y = (h + g) / S),
        (this._z = 0.25 * S));
    }
    return (this._onChangeCallback(), this);
  }
  setFromUnitVectors(e, n) {
    let s = e.dot(n) + 1;
    return (
      s < Number.EPSILON
        ? ((s = 0),
          Math.abs(e.x) > Math.abs(e.z)
            ? ((this._x = -e.y), (this._y = e.x), (this._z = 0), (this._w = s))
            : ((this._x = 0), (this._y = -e.z), (this._z = e.y), (this._w = s)))
        : ((this._x = e.y * n.z - e.z * n.y),
          (this._y = e.z * n.x - e.x * n.z),
          (this._z = e.x * n.y - e.y * n.x),
          (this._w = s)),
      this.normalize()
    );
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(Tn(this.dot(e), -1, 1)));
  }
  rotateTowards(e, n) {
    const s = this.angleTo(e);
    if (s === 0) return this;
    const a = Math.min(1, n / s);
    return (this.slerp(e, a), this);
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return ((this._x *= -1), (this._y *= -1), (this._z *= -1), this._onChangeCallback(), this);
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return (
      e === 0
        ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
        : ((e = 1 / e),
          (this._x = this._x * e),
          (this._y = this._y * e),
          (this._z = this._z * e),
          (this._w = this._w * e)),
      this._onChangeCallback(),
      this
    );
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, n) {
    const s = e._x,
      a = e._y,
      l = e._z,
      f = e._w,
      u = n._x,
      h = n._y,
      m = n._z,
      g = n._w;
    return (
      (this._x = s * g + f * u + a * m - l * h),
      (this._y = a * g + f * h + l * u - s * m),
      (this._z = l * g + f * m + s * h - a * u),
      (this._w = f * g - s * u - a * h - l * m),
      this._onChangeCallback(),
      this
    );
  }
  slerp(e, n) {
    if (n === 0) return this;
    if (n === 1) return this.copy(e);
    const s = this._x,
      a = this._y,
      l = this._z,
      f = this._w;
    let u = f * e._w + s * e._x + a * e._y + l * e._z;
    if (
      (u < 0
        ? ((this._w = -e._w), (this._x = -e._x), (this._y = -e._y), (this._z = -e._z), (u = -u))
        : this.copy(e),
      u >= 1)
    )
      return ((this._w = f), (this._x = s), (this._y = a), (this._z = l), this);
    const h = 1 - u * u;
    if (h <= Number.EPSILON) {
      const S = 1 - n;
      return (
        (this._w = S * f + n * this._w),
        (this._x = S * s + n * this._x),
        (this._y = S * a + n * this._y),
        (this._z = S * l + n * this._z),
        this.normalize(),
        this
      );
    }
    const m = Math.sqrt(h),
      g = Math.atan2(m, u),
      v = Math.sin((1 - n) * g) / m,
      y = Math.sin(n * g) / m;
    return (
      (this._w = f * v + this._w * y),
      (this._x = s * v + this._x * y),
      (this._y = a * v + this._y * y),
      (this._z = l * v + this._z * y),
      this._onChangeCallback(),
      this
    );
  }
  slerpQuaternions(e, n, s) {
    return this.copy(e).slerp(n, s);
  }
  random() {
    const e = Math.random(),
      n = Math.sqrt(1 - e),
      s = Math.sqrt(e),
      a = 2 * Math.PI * Math.random(),
      l = 2 * Math.PI * Math.random();
    return this.set(n * Math.cos(a), s * Math.sin(l), s * Math.cos(l), n * Math.sin(a));
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, n = 0) {
    return (
      (this._x = e[n]),
      (this._y = e[n + 1]),
      (this._z = e[n + 2]),
      (this._w = e[n + 3]),
      this._onChangeCallback(),
      this
    );
  }
  toArray(e = [], n = 0) {
    return ((e[n] = this._x), (e[n + 1] = this._y), (e[n + 2] = this._z), (e[n + 3] = this._w), e);
  }
  fromBufferAttribute(e, n) {
    return (
      (this._x = e.getX(n)),
      (this._y = e.getY(n)),
      (this._z = e.getZ(n)),
      (this._w = e.getW(n)),
      this._onChangeCallback(),
      this
    );
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return ((this._onChangeCallback = e), this);
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    (yield this._x, yield this._y, yield this._z, yield this._w);
  }
}
class ee {
  constructor(e = 0, n = 0, s = 0) {
    ((ee.prototype.isVector3 = !0), (this.x = e), (this.y = n), (this.z = s));
  }
  set(e, n, s) {
    return (s === void 0 && (s = this.z), (this.x = e), (this.y = n), (this.z = s), this);
  }
  setScalar(e) {
    return ((this.x = e), (this.y = e), (this.z = e), this);
  }
  setX(e) {
    return ((this.x = e), this);
  }
  setY(e) {
    return ((this.y = e), this);
  }
  setZ(e) {
    return ((this.z = e), this);
  }
  setComponent(e, n) {
    switch (e) {
      case 0:
        this.x = n;
        break;
      case 1:
        this.y = n;
        break;
      case 2:
        this.z = n;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return ((this.x = e.x), (this.y = e.y), (this.z = e.z), this);
  }
  add(e) {
    return ((this.x += e.x), (this.y += e.y), (this.z += e.z), this);
  }
  addScalar(e) {
    return ((this.x += e), (this.y += e), (this.z += e), this);
  }
  addVectors(e, n) {
    return ((this.x = e.x + n.x), (this.y = e.y + n.y), (this.z = e.z + n.z), this);
  }
  addScaledVector(e, n) {
    return ((this.x += e.x * n), (this.y += e.y * n), (this.z += e.z * n), this);
  }
  sub(e) {
    return ((this.x -= e.x), (this.y -= e.y), (this.z -= e.z), this);
  }
  subScalar(e) {
    return ((this.x -= e), (this.y -= e), (this.z -= e), this);
  }
  subVectors(e, n) {
    return ((this.x = e.x - n.x), (this.y = e.y - n.y), (this.z = e.z - n.z), this);
  }
  multiply(e) {
    return ((this.x *= e.x), (this.y *= e.y), (this.z *= e.z), this);
  }
  multiplyScalar(e) {
    return ((this.x *= e), (this.y *= e), (this.z *= e), this);
  }
  multiplyVectors(e, n) {
    return ((this.x = e.x * n.x), (this.y = e.y * n.y), (this.z = e.z * n.z), this);
  }
  applyEuler(e) {
    return this.applyQuaternion(Zp.setFromEuler(e));
  }
  applyAxisAngle(e, n) {
    return this.applyQuaternion(Zp.setFromAxisAngle(e, n));
  }
  applyMatrix3(e) {
    const n = this.x,
      s = this.y,
      a = this.z,
      l = e.elements;
    return (
      (this.x = l[0] * n + l[3] * s + l[6] * a),
      (this.y = l[1] * n + l[4] * s + l[7] * a),
      (this.z = l[2] * n + l[5] * s + l[8] * a),
      this
    );
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const n = this.x,
      s = this.y,
      a = this.z,
      l = e.elements,
      f = 1 / (l[3] * n + l[7] * s + l[11] * a + l[15]);
    return (
      (this.x = (l[0] * n + l[4] * s + l[8] * a + l[12]) * f),
      (this.y = (l[1] * n + l[5] * s + l[9] * a + l[13]) * f),
      (this.z = (l[2] * n + l[6] * s + l[10] * a + l[14]) * f),
      this
    );
  }
  applyQuaternion(e) {
    const n = this.x,
      s = this.y,
      a = this.z,
      l = e.x,
      f = e.y,
      u = e.z,
      h = e.w,
      m = 2 * (f * a - u * s),
      g = 2 * (u * n - l * a),
      v = 2 * (l * s - f * n);
    return (
      (this.x = n + h * m + f * v - u * g),
      (this.y = s + h * g + u * m - l * v),
      (this.z = a + h * v + l * g - f * m),
      this
    );
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const n = this.x,
      s = this.y,
      a = this.z,
      l = e.elements;
    return (
      (this.x = l[0] * n + l[4] * s + l[8] * a),
      (this.y = l[1] * n + l[5] * s + l[9] * a),
      (this.z = l[2] * n + l[6] * s + l[10] * a),
      this.normalize()
    );
  }
  divide(e) {
    return ((this.x /= e.x), (this.y /= e.y), (this.z /= e.z), this);
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return (
      (this.x = Math.min(this.x, e.x)),
      (this.y = Math.min(this.y, e.y)),
      (this.z = Math.min(this.z, e.z)),
      this
    );
  }
  max(e) {
    return (
      (this.x = Math.max(this.x, e.x)),
      (this.y = Math.max(this.y, e.y)),
      (this.z = Math.max(this.z, e.z)),
      this
    );
  }
  clamp(e, n) {
    return (
      (this.x = Math.max(e.x, Math.min(n.x, this.x))),
      (this.y = Math.max(e.y, Math.min(n.y, this.y))),
      (this.z = Math.max(e.z, Math.min(n.z, this.z))),
      this
    );
  }
  clampScalar(e, n) {
    return (
      (this.x = Math.max(e, Math.min(n, this.x))),
      (this.y = Math.max(e, Math.min(n, this.y))),
      (this.z = Math.max(e, Math.min(n, this.z))),
      this
    );
  }
  clampLength(e, n) {
    const s = this.length();
    return this.divideScalar(s || 1).multiplyScalar(Math.max(e, Math.min(n, s)));
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      this
    );
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), (this.z = Math.ceil(this.z)), this
    );
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      this
    );
  }
  roundToZero() {
    return (
      (this.x = Math.trunc(this.x)),
      (this.y = Math.trunc(this.y)),
      (this.z = Math.trunc(this.z)),
      this
    );
  }
  negate() {
    return ((this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this);
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, n) {
    return (
      (this.x += (e.x - this.x) * n),
      (this.y += (e.y - this.y) * n),
      (this.z += (e.z - this.z) * n),
      this
    );
  }
  lerpVectors(e, n, s) {
    return (
      (this.x = e.x + (n.x - e.x) * s),
      (this.y = e.y + (n.y - e.y) * s),
      (this.z = e.z + (n.z - e.z) * s),
      this
    );
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, n) {
    const s = e.x,
      a = e.y,
      l = e.z,
      f = n.x,
      u = n.y,
      h = n.z;
    return ((this.x = a * h - l * u), (this.y = l * f - s * h), (this.z = s * u - a * f), this);
  }
  projectOnVector(e) {
    const n = e.lengthSq();
    if (n === 0) return this.set(0, 0, 0);
    const s = e.dot(this) / n;
    return this.copy(e).multiplyScalar(s);
  }
  projectOnPlane(e) {
    return (Iu.copy(this).projectOnVector(e), this.sub(Iu));
  }
  reflect(e) {
    return this.sub(Iu.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const n = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (n === 0) return Math.PI / 2;
    const s = this.dot(e) / n;
    return Math.acos(Tn(s, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const n = this.x - e.x,
      s = this.y - e.y,
      a = this.z - e.z;
    return n * n + s * s + a * a;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, n, s) {
    const a = Math.sin(n) * e;
    return (
      (this.x = a * Math.sin(s)), (this.y = Math.cos(n) * e), (this.z = a * Math.cos(s)), this
    );
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, n, s) {
    return ((this.x = e * Math.sin(n)), (this.y = s), (this.z = e * Math.cos(n)), this);
  }
  setFromMatrixPosition(e) {
    const n = e.elements;
    return ((this.x = n[12]), (this.y = n[13]), (this.z = n[14]), this);
  }
  setFromMatrixScale(e) {
    const n = this.setFromMatrixColumn(e, 0).length(),
      s = this.setFromMatrixColumn(e, 1).length(),
      a = this.setFromMatrixColumn(e, 2).length();
    return ((this.x = n), (this.y = s), (this.z = a), this);
  }
  setFromMatrixColumn(e, n) {
    return this.fromArray(e.elements, n * 4);
  }
  setFromMatrix3Column(e, n) {
    return this.fromArray(e.elements, n * 3);
  }
  setFromEuler(e) {
    return ((this.x = e._x), (this.y = e._y), (this.z = e._z), this);
  }
  setFromColor(e) {
    return ((this.x = e.r), (this.y = e.g), (this.z = e.b), this);
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, n = 0) {
    return ((this.x = e[n]), (this.y = e[n + 1]), (this.z = e[n + 2]), this);
  }
  toArray(e = [], n = 0) {
    return ((e[n] = this.x), (e[n + 1] = this.y), (e[n + 2] = this.z), e);
  }
  fromBufferAttribute(e, n) {
    return ((this.x = e.getX(n)), (this.y = e.getY(n)), (this.z = e.getZ(n)), this);
  }
  random() {
    return ((this.x = Math.random()), (this.y = Math.random()), (this.z = Math.random()), this);
  }
  randomDirection() {
    const e = (Math.random() - 0.5) * 2,
      n = Math.random() * Math.PI * 2,
      s = Math.sqrt(1 - e ** 2);
    return ((this.x = s * Math.cos(n)), (this.y = s * Math.sin(n)), (this.z = e), this);
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y, yield this.z);
  }
}
const Iu = new ee(),
  Zp = new Wo();
class Xo {
  constructor(e = new ee(1 / 0, 1 / 0, 1 / 0), n = new ee(-1 / 0, -1 / 0, -1 / 0)) {
    ((this.isBox3 = !0), (this.min = e), (this.max = n));
  }
  set(e, n) {
    return (this.min.copy(e), this.max.copy(n), this);
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let n = 0, s = e.length; n < s; n += 3) this.expandByPoint(li.fromArray(e, n));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let n = 0, s = e.count; n < s; n++) this.expandByPoint(li.fromBufferAttribute(e, n));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let n = 0, s = e.length; n < s; n++) this.expandByPoint(e[n]);
    return this;
  }
  setFromCenterAndSize(e, n) {
    const s = li.copy(n).multiplyScalar(0.5);
    return (this.min.copy(e).sub(s), this.max.copy(e).add(s), this);
  }
  setFromObject(e, n = !1) {
    return (this.makeEmpty(), this.expandByObject(e, n));
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return (this.min.copy(e.min), this.max.copy(e.max), this);
  }
  makeEmpty() {
    return (
      (this.min.x = this.min.y = this.min.z = 1 / 0),
      (this.max.x = this.max.y = this.max.z = -1 / 0),
      this
    );
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return (this.min.min(e), this.max.max(e), this);
  }
  expandByVector(e) {
    return (this.min.sub(e), this.max.add(e), this);
  }
  expandByScalar(e) {
    return (this.min.addScalar(-e), this.max.addScalar(e), this);
  }
  expandByObject(e, n = !1) {
    e.updateWorldMatrix(!1, !1);
    const s = e.geometry;
    if (s !== void 0) {
      const l = s.getAttribute("position");
      if (n === !0 && l !== void 0 && e.isInstancedMesh !== !0)
        for (let f = 0, u = l.count; f < u; f++)
          (e.isMesh === !0 ? e.getVertexPosition(f, li) : li.fromBufferAttribute(l, f),
            li.applyMatrix4(e.matrixWorld),
            this.expandByPoint(li));
      else
        (e.boundingBox !== void 0
          ? (e.boundingBox === null && e.computeBoundingBox(), nl.copy(e.boundingBox))
          : (s.boundingBox === null && s.computeBoundingBox(), nl.copy(s.boundingBox)),
          nl.applyMatrix4(e.matrixWorld),
          this.union(nl));
    }
    const a = e.children;
    for (let l = 0, f = a.length; l < f; l++) this.expandByObject(a[l], n);
    return this;
  }
  containsPoint(e) {
    return !(
      e.x < this.min.x ||
      e.x > this.max.x ||
      e.y < this.min.y ||
      e.y > this.max.y ||
      e.z < this.min.z ||
      e.z > this.max.z
    );
  }
  containsBox(e) {
    return (
      this.min.x <= e.min.x &&
      e.max.x <= this.max.x &&
      this.min.y <= e.min.y &&
      e.max.y <= this.max.y &&
      this.min.z <= e.min.z &&
      e.max.z <= this.max.z
    );
  }
  getParameter(e, n) {
    return n.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z),
    );
  }
  intersectsBox(e) {
    return !(
      e.max.x < this.min.x ||
      e.min.x > this.max.x ||
      e.max.y < this.min.y ||
      e.min.y > this.max.y ||
      e.max.z < this.min.z ||
      e.min.z > this.max.z
    );
  }
  intersectsSphere(e) {
    return (this.clampPoint(e.center, li), li.distanceToSquared(e.center) <= e.radius * e.radius);
  }
  intersectsPlane(e) {
    let n, s;
    return (
      e.normal.x > 0
        ? ((n = e.normal.x * this.min.x), (s = e.normal.x * this.max.x))
        : ((n = e.normal.x * this.max.x), (s = e.normal.x * this.min.x)),
      e.normal.y > 0
        ? ((n += e.normal.y * this.min.y), (s += e.normal.y * this.max.y))
        : ((n += e.normal.y * this.max.y), (s += e.normal.y * this.min.y)),
      e.normal.z > 0
        ? ((n += e.normal.z * this.min.z), (s += e.normal.z * this.max.z))
        : ((n += e.normal.z * this.max.z), (s += e.normal.z * this.min.z)),
      n <= -e.constant && s >= -e.constant
    );
  }
  intersectsTriangle(e) {
    if (this.isEmpty()) return !1;
    (this.getCenter(Uo),
      il.subVectors(this.max, Uo),
      Ms.subVectors(e.a, Uo),
      Es.subVectors(e.b, Uo),
      Ts.subVectors(e.c, Uo),
      dr.subVectors(Es, Ms),
      hr.subVectors(Ts, Es),
      kr.subVectors(Ms, Ts));
    let n = [
      0,
      -dr.z,
      dr.y,
      0,
      -hr.z,
      hr.y,
      0,
      -kr.z,
      kr.y,
      dr.z,
      0,
      -dr.x,
      hr.z,
      0,
      -hr.x,
      kr.z,
      0,
      -kr.x,
      -dr.y,
      dr.x,
      0,
      -hr.y,
      hr.x,
      0,
      -kr.y,
      kr.x,
      0,
    ];
    return !Fu(n, Ms, Es, Ts, il) || ((n = [1, 0, 0, 0, 1, 0, 0, 0, 1]), !Fu(n, Ms, Es, Ts, il))
      ? !1
      : (rl.crossVectors(dr, hr), (n = [rl.x, rl.y, rl.z]), Fu(n, Ms, Es, Ts, il));
  }
  clampPoint(e, n) {
    return n.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, li).distanceTo(e);
  }
  getBoundingSphere(e) {
    return (
      this.isEmpty()
        ? e.makeEmpty()
        : (this.getCenter(e.center), (e.radius = this.getSize(li).length() * 0.5)),
      e
    );
  }
  intersect(e) {
    return (this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this);
  }
  union(e) {
    return (this.min.min(e.min), this.max.max(e.max), this);
  }
  applyMatrix4(e) {
    return this.isEmpty()
      ? this
      : (Ni[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e),
        Ni[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e),
        Ni[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e),
        Ni[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e),
        Ni[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e),
        Ni[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e),
        Ni[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e),
        Ni[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e),
        this.setFromPoints(Ni),
        this);
  }
  translate(e) {
    return (this.min.add(e), this.max.add(e), this);
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const Ni = [new ee(), new ee(), new ee(), new ee(), new ee(), new ee(), new ee(), new ee()],
  li = new ee(),
  nl = new Xo(),
  Ms = new ee(),
  Es = new ee(),
  Ts = new ee(),
  dr = new ee(),
  hr = new ee(),
  kr = new ee(),
  Uo = new ee(),
  il = new ee(),
  rl = new ee(),
  zr = new ee();
function Fu(r, e, n, s, a) {
  for (let l = 0, f = r.length - 3; l <= f; l += 3) {
    zr.fromArray(r, l);
    const u = a.x * Math.abs(zr.x) + a.y * Math.abs(zr.y) + a.z * Math.abs(zr.z),
      h = e.dot(zr),
      m = n.dot(zr),
      g = s.dot(zr);
    if (Math.max(-Math.max(h, m, g), Math.min(h, m, g)) > u) return !1;
  }
  return !0;
}
const Fx = new Xo(),
  Io = new ee(),
  Ou = new ee();
class jo {
  constructor(e = new ee(), n = -1) {
    ((this.isSphere = !0), (this.center = e), (this.radius = n));
  }
  set(e, n) {
    return (this.center.copy(e), (this.radius = n), this);
  }
  setFromPoints(e, n) {
    const s = this.center;
    n !== void 0 ? s.copy(n) : Fx.setFromPoints(e).getCenter(s);
    let a = 0;
    for (let l = 0, f = e.length; l < f; l++) a = Math.max(a, s.distanceToSquared(e[l]));
    return ((this.radius = Math.sqrt(a)), this);
  }
  copy(e) {
    return (this.center.copy(e.center), (this.radius = e.radius), this);
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return (this.center.set(0, 0, 0), (this.radius = -1), this);
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const n = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= n * n;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, n) {
    const s = this.center.distanceToSquared(e);
    return (
      n.copy(e),
      s > this.radius * this.radius &&
        (n.sub(this.center).normalize(), n.multiplyScalar(this.radius).add(this.center)),
      n
    );
  }
  getBoundingBox(e) {
    return this.isEmpty()
      ? (e.makeEmpty(), e)
      : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return (this.center.applyMatrix4(e), (this.radius = this.radius * e.getMaxScaleOnAxis()), this);
  }
  translate(e) {
    return (this.center.add(e), this);
  }
  expandByPoint(e) {
    if (this.isEmpty()) return (this.center.copy(e), (this.radius = 0), this);
    Io.subVectors(e, this.center);
    const n = Io.lengthSq();
    if (n > this.radius * this.radius) {
      const s = Math.sqrt(n),
        a = (s - this.radius) * 0.5;
      (this.center.addScaledVector(Io, a / s), (this.radius += a));
    }
    return this;
  }
  union(e) {
    return e.isEmpty()
      ? this
      : this.isEmpty()
        ? (this.copy(e), this)
        : (this.center.equals(e.center) === !0
            ? (this.radius = Math.max(this.radius, e.radius))
            : (Ou.subVectors(e.center, this.center).setLength(e.radius),
              this.expandByPoint(Io.copy(e.center).add(Ou)),
              this.expandByPoint(Io.copy(e.center).sub(Ou))),
          this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Ui = new ee(),
  ku = new ee(),
  sl = new ee(),
  pr = new ee(),
  zu = new ee(),
  ol = new ee(),
  Bu = new ee();
class Sf {
  constructor(e = new ee(), n = new ee(0, 0, -1)) {
    ((this.origin = e), (this.direction = n));
  }
  set(e, n) {
    return (this.origin.copy(e), this.direction.copy(n), this);
  }
  copy(e) {
    return (this.origin.copy(e.origin), this.direction.copy(e.direction), this);
  }
  at(e, n) {
    return n.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return (this.direction.copy(e).sub(this.origin).normalize(), this);
  }
  recast(e) {
    return (this.origin.copy(this.at(e, Ui)), this);
  }
  closestPointToPoint(e, n) {
    n.subVectors(e, this.origin);
    const s = n.dot(this.direction);
    return s < 0 ? n.copy(this.origin) : n.copy(this.origin).addScaledVector(this.direction, s);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const n = Ui.subVectors(e, this.origin).dot(this.direction);
    return n < 0
      ? this.origin.distanceToSquared(e)
      : (Ui.copy(this.origin).addScaledVector(this.direction, n), Ui.distanceToSquared(e));
  }
  distanceSqToSegment(e, n, s, a) {
    (ku.copy(e).add(n).multiplyScalar(0.5),
      sl.copy(n).sub(e).normalize(),
      pr.copy(this.origin).sub(ku));
    const l = e.distanceTo(n) * 0.5,
      f = -this.direction.dot(sl),
      u = pr.dot(this.direction),
      h = -pr.dot(sl),
      m = pr.lengthSq(),
      g = Math.abs(1 - f * f);
    let v, y, S, T;
    if (g > 0)
      if (((v = f * h - u), (y = f * u - h), (T = l * g), v >= 0))
        if (y >= -T)
          if (y <= T) {
            const E = 1 / g;
            ((v *= E), (y *= E), (S = v * (v + f * y + 2 * u) + y * (f * v + y + 2 * h) + m));
          } else ((y = l), (v = Math.max(0, -(f * y + u))), (S = -v * v + y * (y + 2 * h) + m));
        else ((y = -l), (v = Math.max(0, -(f * y + u))), (S = -v * v + y * (y + 2 * h) + m));
      else
        y <= -T
          ? ((v = Math.max(0, -(-f * l + u))),
            (y = v > 0 ? -l : Math.min(Math.max(-l, -h), l)),
            (S = -v * v + y * (y + 2 * h) + m))
          : y <= T
            ? ((v = 0), (y = Math.min(Math.max(-l, -h), l)), (S = y * (y + 2 * h) + m))
            : ((v = Math.max(0, -(f * l + u))),
              (y = v > 0 ? l : Math.min(Math.max(-l, -h), l)),
              (S = -v * v + y * (y + 2 * h) + m));
    else
      ((y = f > 0 ? -l : l), (v = Math.max(0, -(f * y + u))), (S = -v * v + y * (y + 2 * h) + m));
    return (
      s && s.copy(this.origin).addScaledVector(this.direction, v),
      a && a.copy(ku).addScaledVector(sl, y),
      S
    );
  }
  intersectSphere(e, n) {
    Ui.subVectors(e.center, this.origin);
    const s = Ui.dot(this.direction),
      a = Ui.dot(Ui) - s * s,
      l = e.radius * e.radius;
    if (a > l) return null;
    const f = Math.sqrt(l - a),
      u = s - f,
      h = s + f;
    return h < 0 ? null : u < 0 ? this.at(h, n) : this.at(u, n);
  }
  intersectsSphere(e) {
    return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const n = e.normal.dot(this.direction);
    if (n === 0) return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const s = -(this.origin.dot(e.normal) + e.constant) / n;
    return s >= 0 ? s : null;
  }
  intersectPlane(e, n) {
    const s = this.distanceToPlane(e);
    return s === null ? null : this.at(s, n);
  }
  intersectsPlane(e) {
    const n = e.distanceToPoint(this.origin);
    return n === 0 || e.normal.dot(this.direction) * n < 0;
  }
  intersectBox(e, n) {
    let s, a, l, f, u, h;
    const m = 1 / this.direction.x,
      g = 1 / this.direction.y,
      v = 1 / this.direction.z,
      y = this.origin;
    return (
      m >= 0
        ? ((s = (e.min.x - y.x) * m), (a = (e.max.x - y.x) * m))
        : ((s = (e.max.x - y.x) * m), (a = (e.min.x - y.x) * m)),
      g >= 0
        ? ((l = (e.min.y - y.y) * g), (f = (e.max.y - y.y) * g))
        : ((l = (e.max.y - y.y) * g), (f = (e.min.y - y.y) * g)),
      s > f ||
      l > a ||
      ((l > s || isNaN(s)) && (s = l),
      (f < a || isNaN(a)) && (a = f),
      v >= 0
        ? ((u = (e.min.z - y.z) * v), (h = (e.max.z - y.z) * v))
        : ((u = (e.max.z - y.z) * v), (h = (e.min.z - y.z) * v)),
      s > h || u > a) ||
      ((u > s || s !== s) && (s = u), (h < a || a !== a) && (a = h), a < 0)
        ? null
        : this.at(s >= 0 ? s : a, n)
    );
  }
  intersectsBox(e) {
    return this.intersectBox(e, Ui) !== null;
  }
  intersectTriangle(e, n, s, a, l) {
    (zu.subVectors(n, e), ol.subVectors(s, e), Bu.crossVectors(zu, ol));
    let f = this.direction.dot(Bu),
      u;
    if (f > 0) {
      if (a) return null;
      u = 1;
    } else if (f < 0) ((u = -1), (f = -f));
    else return null;
    pr.subVectors(this.origin, e);
    const h = u * this.direction.dot(ol.crossVectors(pr, ol));
    if (h < 0) return null;
    const m = u * this.direction.dot(zu.cross(pr));
    if (m < 0 || h + m > f) return null;
    const g = -u * pr.dot(Bu);
    return g < 0 ? null : this.at(g / f, l);
  }
  applyMatrix4(e) {
    return (this.origin.applyMatrix4(e), this.direction.transformDirection(e), this);
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Zt {
  constructor(e, n, s, a, l, f, u, h, m, g, v, y, S, T, E, x) {
    ((Zt.prototype.isMatrix4 = !0),
      (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
      e !== void 0 && this.set(e, n, s, a, l, f, u, h, m, g, v, y, S, T, E, x));
  }
  set(e, n, s, a, l, f, u, h, m, g, v, y, S, T, E, x) {
    const _ = this.elements;
    return (
      (_[0] = e),
      (_[4] = n),
      (_[8] = s),
      (_[12] = a),
      (_[1] = l),
      (_[5] = f),
      (_[9] = u),
      (_[13] = h),
      (_[2] = m),
      (_[6] = g),
      (_[10] = v),
      (_[14] = y),
      (_[3] = S),
      (_[7] = T),
      (_[11] = E),
      (_[15] = x),
      this
    );
  }
  identity() {
    return (this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
  }
  clone() {
    return new Zt().fromArray(this.elements);
  }
  copy(e) {
    const n = this.elements,
      s = e.elements;
    return (
      (n[0] = s[0]),
      (n[1] = s[1]),
      (n[2] = s[2]),
      (n[3] = s[3]),
      (n[4] = s[4]),
      (n[5] = s[5]),
      (n[6] = s[6]),
      (n[7] = s[7]),
      (n[8] = s[8]),
      (n[9] = s[9]),
      (n[10] = s[10]),
      (n[11] = s[11]),
      (n[12] = s[12]),
      (n[13] = s[13]),
      (n[14] = s[14]),
      (n[15] = s[15]),
      this
    );
  }
  copyPosition(e) {
    const n = this.elements,
      s = e.elements;
    return ((n[12] = s[12]), (n[13] = s[13]), (n[14] = s[14]), this);
  }
  setFromMatrix3(e) {
    const n = e.elements;
    return (
      this.set(n[0], n[3], n[6], 0, n[1], n[4], n[7], 0, n[2], n[5], n[8], 0, 0, 0, 0, 1), this
    );
  }
  extractBasis(e, n, s) {
    return (
      e.setFromMatrixColumn(this, 0),
      n.setFromMatrixColumn(this, 1),
      s.setFromMatrixColumn(this, 2),
      this
    );
  }
  makeBasis(e, n, s) {
    return (this.set(e.x, n.x, s.x, 0, e.y, n.y, s.y, 0, e.z, n.z, s.z, 0, 0, 0, 0, 1), this);
  }
  extractRotation(e) {
    const n = this.elements,
      s = e.elements,
      a = 1 / ws.setFromMatrixColumn(e, 0).length(),
      l = 1 / ws.setFromMatrixColumn(e, 1).length(),
      f = 1 / ws.setFromMatrixColumn(e, 2).length();
    return (
      (n[0] = s[0] * a),
      (n[1] = s[1] * a),
      (n[2] = s[2] * a),
      (n[3] = 0),
      (n[4] = s[4] * l),
      (n[5] = s[5] * l),
      (n[6] = s[6] * l),
      (n[7] = 0),
      (n[8] = s[8] * f),
      (n[9] = s[9] * f),
      (n[10] = s[10] * f),
      (n[11] = 0),
      (n[12] = 0),
      (n[13] = 0),
      (n[14] = 0),
      (n[15] = 1),
      this
    );
  }
  makeRotationFromEuler(e) {
    const n = this.elements,
      s = e.x,
      a = e.y,
      l = e.z,
      f = Math.cos(s),
      u = Math.sin(s),
      h = Math.cos(a),
      m = Math.sin(a),
      g = Math.cos(l),
      v = Math.sin(l);
    if (e.order === "XYZ") {
      const y = f * g,
        S = f * v,
        T = u * g,
        E = u * v;
      ((n[0] = h * g),
        (n[4] = -h * v),
        (n[8] = m),
        (n[1] = S + T * m),
        (n[5] = y - E * m),
        (n[9] = -u * h),
        (n[2] = E - y * m),
        (n[6] = T + S * m),
        (n[10] = f * h));
    } else if (e.order === "YXZ") {
      const y = h * g,
        S = h * v,
        T = m * g,
        E = m * v;
      ((n[0] = y + E * u),
        (n[4] = T * u - S),
        (n[8] = f * m),
        (n[1] = f * v),
        (n[5] = f * g),
        (n[9] = -u),
        (n[2] = S * u - T),
        (n[6] = E + y * u),
        (n[10] = f * h));
    } else if (e.order === "ZXY") {
      const y = h * g,
        S = h * v,
        T = m * g,
        E = m * v;
      ((n[0] = y - E * u),
        (n[4] = -f * v),
        (n[8] = T + S * u),
        (n[1] = S + T * u),
        (n[5] = f * g),
        (n[9] = E - y * u),
        (n[2] = -f * m),
        (n[6] = u),
        (n[10] = f * h));
    } else if (e.order === "ZYX") {
      const y = f * g,
        S = f * v,
        T = u * g,
        E = u * v;
      ((n[0] = h * g),
        (n[4] = T * m - S),
        (n[8] = y * m + E),
        (n[1] = h * v),
        (n[5] = E * m + y),
        (n[9] = S * m - T),
        (n[2] = -m),
        (n[6] = u * h),
        (n[10] = f * h));
    } else if (e.order === "YZX") {
      const y = f * h,
        S = f * m,
        T = u * h,
        E = u * m;
      ((n[0] = h * g),
        (n[4] = E - y * v),
        (n[8] = T * v + S),
        (n[1] = v),
        (n[5] = f * g),
        (n[9] = -u * g),
        (n[2] = -m * g),
        (n[6] = S * v + T),
        (n[10] = y - E * v));
    } else if (e.order === "XZY") {
      const y = f * h,
        S = f * m,
        T = u * h,
        E = u * m;
      ((n[0] = h * g),
        (n[4] = -v),
        (n[8] = m * g),
        (n[1] = y * v + E),
        (n[5] = f * g),
        (n[9] = S * v - T),
        (n[2] = T * v - S),
        (n[6] = u * g),
        (n[10] = E * v + y));
    }
    return (
      (n[3] = 0), (n[7] = 0), (n[11] = 0), (n[12] = 0), (n[13] = 0), (n[14] = 0), (n[15] = 1), this
    );
  }
  makeRotationFromQuaternion(e) {
    return this.compose(Ox, e, kx);
  }
  lookAt(e, n, s) {
    const a = this.elements;
    return (
      zn.subVectors(e, n),
      zn.lengthSq() === 0 && (zn.z = 1),
      zn.normalize(),
      mr.crossVectors(s, zn),
      mr.lengthSq() === 0 &&
        (Math.abs(s.z) === 1 ? (zn.x += 1e-4) : (zn.z += 1e-4),
        zn.normalize(),
        mr.crossVectors(s, zn)),
      mr.normalize(),
      al.crossVectors(zn, mr),
      (a[0] = mr.x),
      (a[4] = al.x),
      (a[8] = zn.x),
      (a[1] = mr.y),
      (a[5] = al.y),
      (a[9] = zn.y),
      (a[2] = mr.z),
      (a[6] = al.z),
      (a[10] = zn.z),
      this
    );
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, n) {
    const s = e.elements,
      a = n.elements,
      l = this.elements,
      f = s[0],
      u = s[4],
      h = s[8],
      m = s[12],
      g = s[1],
      v = s[5],
      y = s[9],
      S = s[13],
      T = s[2],
      E = s[6],
      x = s[10],
      _ = s[14],
      D = s[3],
      R = s[7],
      N = s[11],
      z = s[15],
      I = a[0],
      F = a[4],
      X = a[8],
      A = a[12],
      b = a[1],
      le = a[5],
      ne = a[9],
      pe = a[13],
      H = a[2],
      J = a[6],
      ie = a[10],
      ue = a[14],
      V = a[3],
      K = a[7],
      j = a[11],
      L = a[15];
    return (
      (l[0] = f * I + u * b + h * H + m * V),
      (l[4] = f * F + u * le + h * J + m * K),
      (l[8] = f * X + u * ne + h * ie + m * j),
      (l[12] = f * A + u * pe + h * ue + m * L),
      (l[1] = g * I + v * b + y * H + S * V),
      (l[5] = g * F + v * le + y * J + S * K),
      (l[9] = g * X + v * ne + y * ie + S * j),
      (l[13] = g * A + v * pe + y * ue + S * L),
      (l[2] = T * I + E * b + x * H + _ * V),
      (l[6] = T * F + E * le + x * J + _ * K),
      (l[10] = T * X + E * ne + x * ie + _ * j),
      (l[14] = T * A + E * pe + x * ue + _ * L),
      (l[3] = D * I + R * b + N * H + z * V),
      (l[7] = D * F + R * le + N * J + z * K),
      (l[11] = D * X + R * ne + N * ie + z * j),
      (l[15] = D * A + R * pe + N * ue + z * L),
      this
    );
  }
  multiplyScalar(e) {
    const n = this.elements;
    return (
      (n[0] *= e),
      (n[4] *= e),
      (n[8] *= e),
      (n[12] *= e),
      (n[1] *= e),
      (n[5] *= e),
      (n[9] *= e),
      (n[13] *= e),
      (n[2] *= e),
      (n[6] *= e),
      (n[10] *= e),
      (n[14] *= e),
      (n[3] *= e),
      (n[7] *= e),
      (n[11] *= e),
      (n[15] *= e),
      this
    );
  }
  determinant() {
    const e = this.elements,
      n = e[0],
      s = e[4],
      a = e[8],
      l = e[12],
      f = e[1],
      u = e[5],
      h = e[9],
      m = e[13],
      g = e[2],
      v = e[6],
      y = e[10],
      S = e[14],
      T = e[3],
      E = e[7],
      x = e[11],
      _ = e[15];
    return (
      T * (+l * h * v - a * m * v - l * u * y + s * m * y + a * u * S - s * h * S) +
      E * (+n * h * S - n * m * y + l * f * y - a * f * S + a * m * g - l * h * g) +
      x * (+n * m * v - n * u * S - l * f * v + s * f * S + l * u * g - s * m * g) +
      _ * (-a * u * g - n * h * v + n * u * y + a * f * v - s * f * y + s * h * g)
    );
  }
  transpose() {
    const e = this.elements;
    let n;
    return (
      (n = e[1]),
      (e[1] = e[4]),
      (e[4] = n),
      (n = e[2]),
      (e[2] = e[8]),
      (e[8] = n),
      (n = e[6]),
      (e[6] = e[9]),
      (e[9] = n),
      (n = e[3]),
      (e[3] = e[12]),
      (e[12] = n),
      (n = e[7]),
      (e[7] = e[13]),
      (e[13] = n),
      (n = e[11]),
      (e[11] = e[14]),
      (e[14] = n),
      this
    );
  }
  setPosition(e, n, s) {
    const a = this.elements;
    return (
      e.isVector3
        ? ((a[12] = e.x), (a[13] = e.y), (a[14] = e.z))
        : ((a[12] = e), (a[13] = n), (a[14] = s)),
      this
    );
  }
  invert() {
    const e = this.elements,
      n = e[0],
      s = e[1],
      a = e[2],
      l = e[3],
      f = e[4],
      u = e[5],
      h = e[6],
      m = e[7],
      g = e[8],
      v = e[9],
      y = e[10],
      S = e[11],
      T = e[12],
      E = e[13],
      x = e[14],
      _ = e[15],
      D = v * x * m - E * y * m + E * h * S - u * x * S - v * h * _ + u * y * _,
      R = T * y * m - g * x * m - T * h * S + f * x * S + g * h * _ - f * y * _,
      N = g * E * m - T * v * m + T * u * S - f * E * S - g * u * _ + f * v * _,
      z = T * v * h - g * E * h - T * u * y + f * E * y + g * u * x - f * v * x,
      I = n * D + s * R + a * N + l * z;
    if (I === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const F = 1 / I;
    return (
      (e[0] = D * F),
      (e[1] = (E * y * l - v * x * l - E * a * S + s * x * S + v * a * _ - s * y * _) * F),
      (e[2] = (u * x * l - E * h * l + E * a * m - s * x * m - u * a * _ + s * h * _) * F),
      (e[3] = (v * h * l - u * y * l - v * a * m + s * y * m + u * a * S - s * h * S) * F),
      (e[4] = R * F),
      (e[5] = (g * x * l - T * y * l + T * a * S - n * x * S - g * a * _ + n * y * _) * F),
      (e[6] = (T * h * l - f * x * l - T * a * m + n * x * m + f * a * _ - n * h * _) * F),
      (e[7] = (f * y * l - g * h * l + g * a * m - n * y * m - f * a * S + n * h * S) * F),
      (e[8] = N * F),
      (e[9] = (T * v * l - g * E * l - T * s * S + n * E * S + g * s * _ - n * v * _) * F),
      (e[10] = (f * E * l - T * u * l + T * s * m - n * E * m - f * s * _ + n * u * _) * F),
      (e[11] = (g * u * l - f * v * l - g * s * m + n * v * m + f * s * S - n * u * S) * F),
      (e[12] = z * F),
      (e[13] = (g * E * a - T * v * a + T * s * y - n * E * y - g * s * x + n * v * x) * F),
      (e[14] = (T * u * a - f * E * a - T * s * h + n * E * h + f * s * x - n * u * x) * F),
      (e[15] = (f * v * a - g * u * a + g * s * h - n * v * h - f * s * y + n * u * y) * F),
      this
    );
  }
  scale(e) {
    const n = this.elements,
      s = e.x,
      a = e.y,
      l = e.z;
    return (
      (n[0] *= s),
      (n[4] *= a),
      (n[8] *= l),
      (n[1] *= s),
      (n[5] *= a),
      (n[9] *= l),
      (n[2] *= s),
      (n[6] *= a),
      (n[10] *= l),
      (n[3] *= s),
      (n[7] *= a),
      (n[11] *= l),
      this
    );
  }
  getMaxScaleOnAxis() {
    const e = this.elements,
      n = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
      s = e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
      a = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(n, s, a));
  }
  makeTranslation(e, n, s) {
    return (
      e.isVector3
        ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1)
        : this.set(1, 0, 0, e, 0, 1, 0, n, 0, 0, 1, s, 0, 0, 0, 1),
      this
    );
  }
  makeRotationX(e) {
    const n = Math.cos(e),
      s = Math.sin(e);
    return (this.set(1, 0, 0, 0, 0, n, -s, 0, 0, s, n, 0, 0, 0, 0, 1), this);
  }
  makeRotationY(e) {
    const n = Math.cos(e),
      s = Math.sin(e);
    return (this.set(n, 0, s, 0, 0, 1, 0, 0, -s, 0, n, 0, 0, 0, 0, 1), this);
  }
  makeRotationZ(e) {
    const n = Math.cos(e),
      s = Math.sin(e);
    return (this.set(n, -s, 0, 0, s, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
  }
  makeRotationAxis(e, n) {
    const s = Math.cos(n),
      a = Math.sin(n),
      l = 1 - s,
      f = e.x,
      u = e.y,
      h = e.z,
      m = l * f,
      g = l * u;
    return (
      this.set(
        m * f + s,
        m * u - a * h,
        m * h + a * u,
        0,
        m * u + a * h,
        g * u + s,
        g * h - a * f,
        0,
        m * h - a * u,
        g * h + a * f,
        l * h * h + s,
        0,
        0,
        0,
        0,
        1,
      ),
      this
    );
  }
  makeScale(e, n, s) {
    return (this.set(e, 0, 0, 0, 0, n, 0, 0, 0, 0, s, 0, 0, 0, 0, 1), this);
  }
  makeShear(e, n, s, a, l, f) {
    return (this.set(1, s, l, 0, e, 1, f, 0, n, a, 1, 0, 0, 0, 0, 1), this);
  }
  compose(e, n, s) {
    const a = this.elements,
      l = n._x,
      f = n._y,
      u = n._z,
      h = n._w,
      m = l + l,
      g = f + f,
      v = u + u,
      y = l * m,
      S = l * g,
      T = l * v,
      E = f * g,
      x = f * v,
      _ = u * v,
      D = h * m,
      R = h * g,
      N = h * v,
      z = s.x,
      I = s.y,
      F = s.z;
    return (
      (a[0] = (1 - (E + _)) * z),
      (a[1] = (S + N) * z),
      (a[2] = (T - R) * z),
      (a[3] = 0),
      (a[4] = (S - N) * I),
      (a[5] = (1 - (y + _)) * I),
      (a[6] = (x + D) * I),
      (a[7] = 0),
      (a[8] = (T + R) * F),
      (a[9] = (x - D) * F),
      (a[10] = (1 - (y + E)) * F),
      (a[11] = 0),
      (a[12] = e.x),
      (a[13] = e.y),
      (a[14] = e.z),
      (a[15] = 1),
      this
    );
  }
  decompose(e, n, s) {
    const a = this.elements;
    let l = ws.set(a[0], a[1], a[2]).length();
    const f = ws.set(a[4], a[5], a[6]).length(),
      u = ws.set(a[8], a[9], a[10]).length();
    (this.determinant() < 0 && (l = -l),
      (e.x = a[12]),
      (e.y = a[13]),
      (e.z = a[14]),
      ci.copy(this));
    const m = 1 / l,
      g = 1 / f,
      v = 1 / u;
    return (
      (ci.elements[0] *= m),
      (ci.elements[1] *= m),
      (ci.elements[2] *= m),
      (ci.elements[4] *= g),
      (ci.elements[5] *= g),
      (ci.elements[6] *= g),
      (ci.elements[8] *= v),
      (ci.elements[9] *= v),
      (ci.elements[10] *= v),
      n.setFromRotationMatrix(ci),
      (s.x = l),
      (s.y = f),
      (s.z = u),
      this
    );
  }
  makePerspective(e, n, s, a, l, f, u = Bi) {
    const h = this.elements,
      m = (2 * l) / (n - e),
      g = (2 * l) / (s - a),
      v = (n + e) / (n - e),
      y = (s + a) / (s - a);
    let S, T;
    if (u === Bi) ((S = -(f + l) / (f - l)), (T = (-2 * f * l) / (f - l)));
    else if (u === Ul) ((S = -f / (f - l)), (T = (-f * l) / (f - l)));
    else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + u);
    return (
      (h[0] = m),
      (h[4] = 0),
      (h[8] = v),
      (h[12] = 0),
      (h[1] = 0),
      (h[5] = g),
      (h[9] = y),
      (h[13] = 0),
      (h[2] = 0),
      (h[6] = 0),
      (h[10] = S),
      (h[14] = T),
      (h[3] = 0),
      (h[7] = 0),
      (h[11] = -1),
      (h[15] = 0),
      this
    );
  }
  makeOrthographic(e, n, s, a, l, f, u = Bi) {
    const h = this.elements,
      m = 1 / (n - e),
      g = 1 / (s - a),
      v = 1 / (f - l),
      y = (n + e) * m,
      S = (s + a) * g;
    let T, E;
    if (u === Bi) ((T = (f + l) * v), (E = -2 * v));
    else if (u === Ul) ((T = l * v), (E = -1 * v));
    else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + u);
    return (
      (h[0] = 2 * m),
      (h[4] = 0),
      (h[8] = 0),
      (h[12] = -y),
      (h[1] = 0),
      (h[5] = 2 * g),
      (h[9] = 0),
      (h[13] = -S),
      (h[2] = 0),
      (h[6] = 0),
      (h[10] = E),
      (h[14] = -T),
      (h[3] = 0),
      (h[7] = 0),
      (h[11] = 0),
      (h[15] = 1),
      this
    );
  }
  equals(e) {
    const n = this.elements,
      s = e.elements;
    for (let a = 0; a < 16; a++) if (n[a] !== s[a]) return !1;
    return !0;
  }
  fromArray(e, n = 0) {
    for (let s = 0; s < 16; s++) this.elements[s] = e[s + n];
    return this;
  }
  toArray(e = [], n = 0) {
    const s = this.elements;
    return (
      (e[n] = s[0]),
      (e[n + 1] = s[1]),
      (e[n + 2] = s[2]),
      (e[n + 3] = s[3]),
      (e[n + 4] = s[4]),
      (e[n + 5] = s[5]),
      (e[n + 6] = s[6]),
      (e[n + 7] = s[7]),
      (e[n + 8] = s[8]),
      (e[n + 9] = s[9]),
      (e[n + 10] = s[10]),
      (e[n + 11] = s[11]),
      (e[n + 12] = s[12]),
      (e[n + 13] = s[13]),
      (e[n + 14] = s[14]),
      (e[n + 15] = s[15]),
      e
    );
  }
}
const ws = new ee(),
  ci = new Zt(),
  Ox = new ee(0, 0, 0),
  kx = new ee(1, 1, 1),
  mr = new ee(),
  al = new ee(),
  zn = new ee(),
  Qp = new Zt(),
  Jp = new Wo();
class zl {
  constructor(e = 0, n = 0, s = 0, a = zl.DEFAULT_ORDER) {
    ((this.isEuler = !0), (this._x = e), (this._y = n), (this._z = s), (this._order = a));
  }
  get x() {
    return this._x;
  }
  set x(e) {
    ((this._x = e), this._onChangeCallback());
  }
  get y() {
    return this._y;
  }
  set y(e) {
    ((this._y = e), this._onChangeCallback());
  }
  get z() {
    return this._z;
  }
  set z(e) {
    ((this._z = e), this._onChangeCallback());
  }
  get order() {
    return this._order;
  }
  set order(e) {
    ((this._order = e), this._onChangeCallback());
  }
  set(e, n, s, a = this._order) {
    return (
      (this._x = e), (this._y = n), (this._z = s), (this._order = a), this._onChangeCallback(), this
    );
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return (
      (this._x = e._x),
      (this._y = e._y),
      (this._z = e._z),
      (this._order = e._order),
      this._onChangeCallback(),
      this
    );
  }
  setFromRotationMatrix(e, n = this._order, s = !0) {
    const a = e.elements,
      l = a[0],
      f = a[4],
      u = a[8],
      h = a[1],
      m = a[5],
      g = a[9],
      v = a[2],
      y = a[6],
      S = a[10];
    switch (n) {
      case "XYZ":
        ((this._y = Math.asin(Tn(u, -1, 1))),
          Math.abs(u) < 0.9999999
            ? ((this._x = Math.atan2(-g, S)), (this._z = Math.atan2(-f, l)))
            : ((this._x = Math.atan2(y, m)), (this._z = 0)));
        break;
      case "YXZ":
        ((this._x = Math.asin(-Tn(g, -1, 1))),
          Math.abs(g) < 0.9999999
            ? ((this._y = Math.atan2(u, S)), (this._z = Math.atan2(h, m)))
            : ((this._y = Math.atan2(-v, l)), (this._z = 0)));
        break;
      case "ZXY":
        ((this._x = Math.asin(Tn(y, -1, 1))),
          Math.abs(y) < 0.9999999
            ? ((this._y = Math.atan2(-v, S)), (this._z = Math.atan2(-f, m)))
            : ((this._y = 0), (this._z = Math.atan2(h, l))));
        break;
      case "ZYX":
        ((this._y = Math.asin(-Tn(v, -1, 1))),
          Math.abs(v) < 0.9999999
            ? ((this._x = Math.atan2(y, S)), (this._z = Math.atan2(h, l)))
            : ((this._x = 0), (this._z = Math.atan2(-f, m))));
        break;
      case "YZX":
        ((this._z = Math.asin(Tn(h, -1, 1))),
          Math.abs(h) < 0.9999999
            ? ((this._x = Math.atan2(-g, m)), (this._y = Math.atan2(-v, l)))
            : ((this._x = 0), (this._y = Math.atan2(u, S))));
        break;
      case "XZY":
        ((this._z = Math.asin(-Tn(f, -1, 1))),
          Math.abs(f) < 0.9999999
            ? ((this._x = Math.atan2(y, m)), (this._y = Math.atan2(u, l)))
            : ((this._x = Math.atan2(-g, S)), (this._y = 0)));
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + n);
    }
    return ((this._order = n), s === !0 && this._onChangeCallback(), this);
  }
  setFromQuaternion(e, n, s) {
    return (Qp.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Qp, n, s));
  }
  setFromVector3(e, n = this._order) {
    return this.set(e.x, e.y, e.z, n);
  }
  reorder(e) {
    return (Jp.setFromEuler(this), this.setFromQuaternion(Jp, e));
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return (
      (this._x = e[0]),
      (this._y = e[1]),
      (this._z = e[2]),
      e[3] !== void 0 && (this._order = e[3]),
      this._onChangeCallback(),
      this
    );
  }
  toArray(e = [], n = 0) {
    return (
      (e[n] = this._x), (e[n + 1] = this._y), (e[n + 2] = this._z), (e[n + 3] = this._order), e
    );
  }
  _onChange(e) {
    return ((this._onChangeCallback = e), this);
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    (yield this._x, yield this._y, yield this._z, yield this._order);
  }
}
zl.DEFAULT_ORDER = "XYZ";
class ug {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = ((1 << e) | 0) >>> 0;
  }
  enable(e) {
    this.mask |= (1 << e) | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= (1 << e) | 0;
  }
  disable(e) {
    this.mask &= ~((1 << e) | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & ((1 << e) | 0)) !== 0;
  }
}
let zx = 0;
const em = new ee(),
  As = new Wo(),
  Ii = new Zt(),
  ll = new ee(),
  Fo = new ee(),
  Bx = new ee(),
  Hx = new Wo(),
  tm = new ee(1, 0, 0),
  nm = new ee(0, 1, 0),
  im = new ee(0, 0, 1),
  Gx = { type: "added" },
  Vx = { type: "removed" };
class wn extends qs {
  constructor() {
    (super(),
      (this.isObject3D = !0),
      Object.defineProperty(this, "id", { value: zx++ }),
      (this.uuid = Ys()),
      (this.name = ""),
      (this.type = "Object3D"),
      (this.parent = null),
      (this.children = []),
      (this.up = wn.DEFAULT_UP.clone()));
    const e = new ee(),
      n = new zl(),
      s = new Wo(),
      a = new ee(1, 1, 1);
    function l() {
      s.setFromEuler(n, !1);
    }
    function f() {
      n.setFromQuaternion(s, void 0, !1);
    }
    (n._onChange(l),
      s._onChange(f),
      Object.defineProperties(this, {
        position: { configurable: !0, enumerable: !0, value: e },
        rotation: { configurable: !0, enumerable: !0, value: n },
        quaternion: { configurable: !0, enumerable: !0, value: s },
        scale: { configurable: !0, enumerable: !0, value: a },
        modelViewMatrix: { value: new Zt() },
        normalMatrix: { value: new pt() },
      }),
      (this.matrix = new Zt()),
      (this.matrixWorld = new Zt()),
      (this.matrixAutoUpdate = wn.DEFAULT_MATRIX_AUTO_UPDATE),
      (this.matrixWorldAutoUpdate = wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE),
      (this.matrixWorldNeedsUpdate = !1),
      (this.layers = new ug()),
      (this.visible = !0),
      (this.castShadow = !1),
      (this.receiveShadow = !1),
      (this.frustumCulled = !0),
      (this.renderOrder = 0),
      (this.animations = []),
      (this.userData = {}));
  }
  onBeforeShadow() {}
  onAfterShadow() {}
  onBeforeRender() {}
  onAfterRender() {}
  applyMatrix4(e) {
    (this.matrixAutoUpdate && this.updateMatrix(),
      this.matrix.premultiply(e),
      this.matrix.decompose(this.position, this.quaternion, this.scale));
  }
  applyQuaternion(e) {
    return (this.quaternion.premultiply(e), this);
  }
  setRotationFromAxisAngle(e, n) {
    this.quaternion.setFromAxisAngle(e, n);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, n) {
    return (As.setFromAxisAngle(e, n), this.quaternion.multiply(As), this);
  }
  rotateOnWorldAxis(e, n) {
    return (As.setFromAxisAngle(e, n), this.quaternion.premultiply(As), this);
  }
  rotateX(e) {
    return this.rotateOnAxis(tm, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(nm, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(im, e);
  }
  translateOnAxis(e, n) {
    return (
      em.copy(e).applyQuaternion(this.quaternion), this.position.add(em.multiplyScalar(n)), this
    );
  }
  translateX(e) {
    return this.translateOnAxis(tm, e);
  }
  translateY(e) {
    return this.translateOnAxis(nm, e);
  }
  translateZ(e) {
    return this.translateOnAxis(im, e);
  }
  localToWorld(e) {
    return (this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld));
  }
  worldToLocal(e) {
    return (this.updateWorldMatrix(!0, !1), e.applyMatrix4(Ii.copy(this.matrixWorld).invert()));
  }
  lookAt(e, n, s) {
    e.isVector3 ? ll.copy(e) : ll.set(e, n, s);
    const a = this.parent;
    (this.updateWorldMatrix(!0, !1),
      Fo.setFromMatrixPosition(this.matrixWorld),
      this.isCamera || this.isLight ? Ii.lookAt(Fo, ll, this.up) : Ii.lookAt(ll, Fo, this.up),
      this.quaternion.setFromRotationMatrix(Ii),
      a &&
        (Ii.extractRotation(a.matrixWorld),
        As.setFromRotationMatrix(Ii),
        this.quaternion.premultiply(As.invert())));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++) this.add(arguments[n]);
      return this;
    }
    return e === this
      ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this)
      : (e && e.isObject3D
          ? (e.parent !== null && e.parent.remove(e),
            (e.parent = this),
            this.children.push(e),
            e.dispatchEvent(Gx))
          : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e),
        this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let s = 0; s < arguments.length; s++) this.remove(arguments[s]);
      return this;
    }
    const n = this.children.indexOf(e);
    return (n !== -1 && ((e.parent = null), this.children.splice(n, 1), e.dispatchEvent(Vx)), this);
  }
  removeFromParent() {
    const e = this.parent;
    return (e !== null && e.remove(this), this);
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return (
      this.updateWorldMatrix(!0, !1),
      Ii.copy(this.matrixWorld).invert(),
      e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), Ii.multiply(e.parent.matrixWorld)),
      e.applyMatrix4(Ii),
      this.add(e),
      e.updateWorldMatrix(!1, !0),
      this
    );
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, n) {
    if (this[e] === n) return this;
    for (let s = 0, a = this.children.length; s < a; s++) {
      const f = this.children[s].getObjectByProperty(e, n);
      if (f !== void 0) return f;
    }
  }
  getObjectsByProperty(e, n, s = []) {
    this[e] === n && s.push(this);
    const a = this.children;
    for (let l = 0, f = a.length; l < f; l++) a[l].getObjectsByProperty(e, n, s);
    return s;
  }
  getWorldPosition(e) {
    return (this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld));
  }
  getWorldQuaternion(e) {
    return (this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Fo, e, Bx), e);
  }
  getWorldScale(e) {
    return (this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Fo, Hx, e), e);
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const n = this.matrixWorld.elements;
    return e.set(n[8], n[9], n[10]).normalize();
  }
  raycast() {}
  traverse(e) {
    e(this);
    const n = this.children;
    for (let s = 0, a = n.length; s < a; s++) n[s].traverse(e);
  }
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const n = this.children;
    for (let s = 0, a = n.length; s < a; s++) n[s].traverseVisible(e);
  }
  traverseAncestors(e) {
    const n = this.parent;
    n !== null && (e(n), n.traverseAncestors(e));
  }
  updateMatrix() {
    (this.matrix.compose(this.position, this.quaternion, this.scale),
      (this.matrixWorldNeedsUpdate = !0));
  }
  updateMatrixWorld(e) {
    (this.matrixAutoUpdate && this.updateMatrix(),
      (this.matrixWorldNeedsUpdate || e) &&
        (this.parent === null
          ? this.matrixWorld.copy(this.matrix)
          : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
        (this.matrixWorldNeedsUpdate = !1),
        (e = !0)));
    const n = this.children;
    for (let s = 0, a = n.length; s < a; s++) {
      const l = n[s];
      (l.matrixWorldAutoUpdate === !0 || e === !0) && l.updateMatrixWorld(e);
    }
  }
  updateWorldMatrix(e, n) {
    const s = this.parent;
    if (
      (e === !0 && s !== null && s.matrixWorldAutoUpdate === !0 && s.updateWorldMatrix(!0, !1),
      this.matrixAutoUpdate && this.updateMatrix(),
      this.parent === null
        ? this.matrixWorld.copy(this.matrix)
        : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
      n === !0)
    ) {
      const a = this.children;
      for (let l = 0, f = a.length; l < f; l++) {
        const u = a[l];
        u.matrixWorldAutoUpdate === !0 && u.updateWorldMatrix(!1, !0);
      }
    }
  }
  toJSON(e) {
    const n = e === void 0 || typeof e == "string",
      s = {};
    n &&
      ((e = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {},
        skeletons: {},
        animations: {},
        nodes: {},
      }),
      (s.metadata = { version: 4.6, type: "Object", generator: "Object3D.toJSON" }));
    const a = {};
    ((a.uuid = this.uuid),
      (a.type = this.type),
      this.name !== "" && (a.name = this.name),
      this.castShadow === !0 && (a.castShadow = !0),
      this.receiveShadow === !0 && (a.receiveShadow = !0),
      this.visible === !1 && (a.visible = !1),
      this.frustumCulled === !1 && (a.frustumCulled = !1),
      this.renderOrder !== 0 && (a.renderOrder = this.renderOrder),
      Object.keys(this.userData).length > 0 && (a.userData = this.userData),
      (a.layers = this.layers.mask),
      (a.matrix = this.matrix.toArray()),
      (a.up = this.up.toArray()),
      this.matrixAutoUpdate === !1 && (a.matrixAutoUpdate = !1),
      this.isInstancedMesh &&
        ((a.type = "InstancedMesh"),
        (a.count = this.count),
        (a.instanceMatrix = this.instanceMatrix.toJSON()),
        this.instanceColor !== null && (a.instanceColor = this.instanceColor.toJSON())),
      this.isBatchedMesh &&
        ((a.type = "BatchedMesh"),
        (a.perObjectFrustumCulled = this.perObjectFrustumCulled),
        (a.sortObjects = this.sortObjects),
        (a.drawRanges = this._drawRanges),
        (a.reservedRanges = this._reservedRanges),
        (a.visibility = this._visibility),
        (a.active = this._active),
        (a.bounds = this._bounds.map((u) => ({
          boxInitialized: u.boxInitialized,
          boxMin: u.box.min.toArray(),
          boxMax: u.box.max.toArray(),
          sphereInitialized: u.sphereInitialized,
          sphereRadius: u.sphere.radius,
          sphereCenter: u.sphere.center.toArray(),
        }))),
        (a.maxGeometryCount = this._maxGeometryCount),
        (a.maxVertexCount = this._maxVertexCount),
        (a.maxIndexCount = this._maxIndexCount),
        (a.geometryInitialized = this._geometryInitialized),
        (a.geometryCount = this._geometryCount),
        (a.matricesTexture = this._matricesTexture.toJSON(e)),
        this.boundingSphere !== null &&
          (a.boundingSphere = {
            center: a.boundingSphere.center.toArray(),
            radius: a.boundingSphere.radius,
          }),
        this.boundingBox !== null &&
          (a.boundingBox = {
            min: a.boundingBox.min.toArray(),
            max: a.boundingBox.max.toArray(),
          })));
    function l(u, h) {
      return (u[h.uuid] === void 0 && (u[h.uuid] = h.toJSON(e)), h.uuid);
    }
    if (this.isScene)
      (this.background &&
        (this.background.isColor
          ? (a.background = this.background.toJSON())
          : this.background.isTexture && (a.background = this.background.toJSON(e).uuid)),
        this.environment &&
          this.environment.isTexture &&
          this.environment.isRenderTargetTexture !== !0 &&
          (a.environment = this.environment.toJSON(e).uuid));
    else if (this.isMesh || this.isLine || this.isPoints) {
      a.geometry = l(e.geometries, this.geometry);
      const u = this.geometry.parameters;
      if (u !== void 0 && u.shapes !== void 0) {
        const h = u.shapes;
        if (Array.isArray(h))
          for (let m = 0, g = h.length; m < g; m++) {
            const v = h[m];
            l(e.shapes, v);
          }
        else l(e.shapes, h);
      }
    }
    if (
      (this.isSkinnedMesh &&
        ((a.bindMode = this.bindMode),
        (a.bindMatrix = this.bindMatrix.toArray()),
        this.skeleton !== void 0 &&
          (l(e.skeletons, this.skeleton), (a.skeleton = this.skeleton.uuid))),
      this.material !== void 0)
    )
      if (Array.isArray(this.material)) {
        const u = [];
        for (let h = 0, m = this.material.length; h < m; h++)
          u.push(l(e.materials, this.material[h]));
        a.material = u;
      } else a.material = l(e.materials, this.material);
    if (this.children.length > 0) {
      a.children = [];
      for (let u = 0; u < this.children.length; u++)
        a.children.push(this.children[u].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      a.animations = [];
      for (let u = 0; u < this.animations.length; u++) {
        const h = this.animations[u];
        a.animations.push(l(e.animations, h));
      }
    }
    if (n) {
      const u = f(e.geometries),
        h = f(e.materials),
        m = f(e.textures),
        g = f(e.images),
        v = f(e.shapes),
        y = f(e.skeletons),
        S = f(e.animations),
        T = f(e.nodes);
      (u.length > 0 && (s.geometries = u),
        h.length > 0 && (s.materials = h),
        m.length > 0 && (s.textures = m),
        g.length > 0 && (s.images = g),
        v.length > 0 && (s.shapes = v),
        y.length > 0 && (s.skeletons = y),
        S.length > 0 && (s.animations = S),
        T.length > 0 && (s.nodes = T));
    }
    return ((s.object = a), s);
    function f(u) {
      const h = [];
      for (const m in u) {
        const g = u[m];
        (delete g.metadata, h.push(g));
      }
      return h;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, n = !0) {
    if (
      ((this.name = e.name),
      this.up.copy(e.up),
      this.position.copy(e.position),
      (this.rotation.order = e.rotation.order),
      this.quaternion.copy(e.quaternion),
      this.scale.copy(e.scale),
      this.matrix.copy(e.matrix),
      this.matrixWorld.copy(e.matrixWorld),
      (this.matrixAutoUpdate = e.matrixAutoUpdate),
      (this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate),
      (this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate),
      (this.layers.mask = e.layers.mask),
      (this.visible = e.visible),
      (this.castShadow = e.castShadow),
      (this.receiveShadow = e.receiveShadow),
      (this.frustumCulled = e.frustumCulled),
      (this.renderOrder = e.renderOrder),
      (this.animations = e.animations.slice()),
      (this.userData = JSON.parse(JSON.stringify(e.userData))),
      n === !0)
    )
      for (let s = 0; s < e.children.length; s++) {
        const a = e.children[s];
        this.add(a.clone());
      }
    return this;
  }
}
wn.DEFAULT_UP = new ee(0, 1, 0);
wn.DEFAULT_MATRIX_AUTO_UPDATE = !0;
wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const ui = new ee(),
  Fi = new ee(),
  Hu = new ee(),
  Oi = new ee(),
  Rs = new ee(),
  Cs = new ee(),
  rm = new ee(),
  Gu = new ee(),
  Vu = new ee(),
  Wu = new ee();
let cl = !1;
class fi {
  constructor(e = new ee(), n = new ee(), s = new ee()) {
    ((this.a = e), (this.b = n), (this.c = s));
  }
  static getNormal(e, n, s, a) {
    (a.subVectors(s, n), ui.subVectors(e, n), a.cross(ui));
    const l = a.lengthSq();
    return l > 0 ? a.multiplyScalar(1 / Math.sqrt(l)) : a.set(0, 0, 0);
  }
  static getBarycoord(e, n, s, a, l) {
    (ui.subVectors(a, n), Fi.subVectors(s, n), Hu.subVectors(e, n));
    const f = ui.dot(ui),
      u = ui.dot(Fi),
      h = ui.dot(Hu),
      m = Fi.dot(Fi),
      g = Fi.dot(Hu),
      v = f * m - u * u;
    if (v === 0) return (l.set(0, 0, 0), null);
    const y = 1 / v,
      S = (m * h - u * g) * y,
      T = (f * g - u * h) * y;
    return l.set(1 - S - T, T, S);
  }
  static containsPoint(e, n, s, a) {
    return this.getBarycoord(e, n, s, a, Oi) === null
      ? !1
      : Oi.x >= 0 && Oi.y >= 0 && Oi.x + Oi.y <= 1;
  }
  static getUV(e, n, s, a, l, f, u, h) {
    return (
      cl === !1 &&
        (console.warn(
          "THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().",
        ),
        (cl = !0)),
      this.getInterpolation(e, n, s, a, l, f, u, h)
    );
  }
  static getInterpolation(e, n, s, a, l, f, u, h) {
    return this.getBarycoord(e, n, s, a, Oi) === null
      ? ((h.x = 0), (h.y = 0), "z" in h && (h.z = 0), "w" in h && (h.w = 0), null)
      : (h.setScalar(0),
        h.addScaledVector(l, Oi.x),
        h.addScaledVector(f, Oi.y),
        h.addScaledVector(u, Oi.z),
        h);
  }
  static isFrontFacing(e, n, s, a) {
    return (ui.subVectors(s, n), Fi.subVectors(e, n), ui.cross(Fi).dot(a) < 0);
  }
  set(e, n, s) {
    return (this.a.copy(e), this.b.copy(n), this.c.copy(s), this);
  }
  setFromPointsAndIndices(e, n, s, a) {
    return (this.a.copy(e[n]), this.b.copy(e[s]), this.c.copy(e[a]), this);
  }
  setFromAttributeAndIndices(e, n, s, a) {
    return (
      this.a.fromBufferAttribute(e, n),
      this.b.fromBufferAttribute(e, s),
      this.c.fromBufferAttribute(e, a),
      this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return (this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this);
  }
  getArea() {
    return (
      ui.subVectors(this.c, this.b), Fi.subVectors(this.a, this.b), ui.cross(Fi).length() * 0.5
    );
  }
  getMidpoint(e) {
    return e
      .addVectors(this.a, this.b)
      .add(this.c)
      .multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return fi.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, n) {
    return fi.getBarycoord(e, this.a, this.b, this.c, n);
  }
  getUV(e, n, s, a, l) {
    return (
      cl === !1 &&
        (console.warn(
          "THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().",
        ),
        (cl = !0)),
      fi.getInterpolation(e, this.a, this.b, this.c, n, s, a, l)
    );
  }
  getInterpolation(e, n, s, a, l) {
    return fi.getInterpolation(e, this.a, this.b, this.c, n, s, a, l);
  }
  containsPoint(e) {
    return fi.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return fi.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, n) {
    const s = this.a,
      a = this.b,
      l = this.c;
    let f, u;
    (Rs.subVectors(a, s), Cs.subVectors(l, s), Gu.subVectors(e, s));
    const h = Rs.dot(Gu),
      m = Cs.dot(Gu);
    if (h <= 0 && m <= 0) return n.copy(s);
    Vu.subVectors(e, a);
    const g = Rs.dot(Vu),
      v = Cs.dot(Vu);
    if (g >= 0 && v <= g) return n.copy(a);
    const y = h * v - g * m;
    if (y <= 0 && h >= 0 && g <= 0) return ((f = h / (h - g)), n.copy(s).addScaledVector(Rs, f));
    Wu.subVectors(e, l);
    const S = Rs.dot(Wu),
      T = Cs.dot(Wu);
    if (T >= 0 && S <= T) return n.copy(l);
    const E = S * m - h * T;
    if (E <= 0 && m >= 0 && T <= 0) return ((u = m / (m - T)), n.copy(s).addScaledVector(Cs, u));
    const x = g * T - S * v;
    if (x <= 0 && v - g >= 0 && S - T >= 0)
      return (
        rm.subVectors(l, a), (u = (v - g) / (v - g + (S - T))), n.copy(a).addScaledVector(rm, u)
      );
    const _ = 1 / (x + E + y);
    return ((f = E * _), (u = y * _), n.copy(s).addScaledVector(Rs, f).addScaledVector(Cs, u));
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
const fg = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  },
  gr = { h: 0, s: 0, l: 0 },
  ul = { h: 0, s: 0, l: 0 };
function Xu(r, e, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6 ? r + (e - r) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? r + (e - r) * 6 * (2 / 3 - n) : r
  );
}
class Mt {
  constructor(e, n, s) {
    return ((this.isColor = !0), (this.r = 1), (this.g = 1), (this.b = 1), this.set(e, n, s));
  }
  set(e, n, s) {
    if (n === void 0 && s === void 0) {
      const a = e;
      a && a.isColor
        ? this.copy(a)
        : typeof a == "number"
          ? this.setHex(a)
          : typeof a == "string" && this.setStyle(a);
    } else this.setRGB(e, n, s);
    return this;
  }
  setScalar(e) {
    return ((this.r = e), (this.g = e), (this.b = e), this);
  }
  setHex(e, n = ln) {
    return (
      (e = Math.floor(e)),
      (this.r = ((e >> 16) & 255) / 255),
      (this.g = ((e >> 8) & 255) / 255),
      (this.b = (e & 255) / 255),
      At.toWorkingColorSpace(this, n),
      this
    );
  }
  setRGB(e, n, s, a = At.workingColorSpace) {
    return ((this.r = e), (this.g = n), (this.b = s), At.toWorkingColorSpace(this, a), this);
  }
  setHSL(e, n, s, a = At.workingColorSpace) {
    if (((e = yf(e, 1)), (n = Tn(n, 0, 1)), (s = Tn(s, 0, 1)), n === 0))
      this.r = this.g = this.b = s;
    else {
      const l = s <= 0.5 ? s * (1 + n) : s + n - s * n,
        f = 2 * s - l;
      ((this.r = Xu(f, l, e + 1 / 3)), (this.g = Xu(f, l, e)), (this.b = Xu(f, l, e - 1 / 3)));
    }
    return (At.toWorkingColorSpace(this, a), this);
  }
  setStyle(e, n = ln) {
    function s(l) {
      l !== void 0 &&
        parseFloat(l) < 1 &&
        console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
    }
    let a;
    if ((a = /^(\w+)\(([^\)]*)\)/.exec(e))) {
      let l;
      const f = a[1],
        u = a[2];
      switch (f) {
        case "rgb":
        case "rgba":
          if ((l = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u)))
            return (
              s(l[4]),
              this.setRGB(
                Math.min(255, parseInt(l[1], 10)) / 255,
                Math.min(255, parseInt(l[2], 10)) / 255,
                Math.min(255, parseInt(l[3], 10)) / 255,
                n,
              )
            );
          if ((l = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u)))
            return (
              s(l[4]),
              this.setRGB(
                Math.min(100, parseInt(l[1], 10)) / 100,
                Math.min(100, parseInt(l[2], 10)) / 100,
                Math.min(100, parseInt(l[3], 10)) / 100,
                n,
              )
            );
          break;
        case "hsl":
        case "hsla":
          if (
            (l =
              /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                u,
              ))
          )
            return (
              s(l[4]),
              this.setHSL(parseFloat(l[1]) / 360, parseFloat(l[2]) / 100, parseFloat(l[3]) / 100, n)
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + e);
      }
    } else if ((a = /^\#([A-Fa-f\d]+)$/.exec(e))) {
      const l = a[1],
        f = l.length;
      if (f === 3)
        return this.setRGB(
          parseInt(l.charAt(0), 16) / 15,
          parseInt(l.charAt(1), 16) / 15,
          parseInt(l.charAt(2), 16) / 15,
          n,
        );
      if (f === 6) return this.setHex(parseInt(l, 16), n);
      console.warn("THREE.Color: Invalid hex color " + e);
    } else if (e && e.length > 0) return this.setColorName(e, n);
    return this;
  }
  setColorName(e, n = ln) {
    const s = fg[e.toLowerCase()];
    return (
      s !== void 0 ? this.setHex(s, n) : console.warn("THREE.Color: Unknown color " + e), this
    );
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return ((this.r = e.r), (this.g = e.g), (this.b = e.b), this);
  }
  copySRGBToLinear(e) {
    return ((this.r = Hs(e.r)), (this.g = Hs(e.g)), (this.b = Hs(e.b)), this);
  }
  copyLinearToSRGB(e) {
    return ((this.r = Nu(e.r)), (this.g = Nu(e.g)), (this.b = Nu(e.b)), this);
  }
  convertSRGBToLinear() {
    return (this.copySRGBToLinear(this), this);
  }
  convertLinearToSRGB() {
    return (this.copyLinearToSRGB(this), this);
  }
  getHex(e = ln) {
    return (
      At.fromWorkingColorSpace(gn.copy(this), e),
      Math.round(Tn(gn.r * 255, 0, 255)) * 65536 +
        Math.round(Tn(gn.g * 255, 0, 255)) * 256 +
        Math.round(Tn(gn.b * 255, 0, 255))
    );
  }
  getHexString(e = ln) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, n = At.workingColorSpace) {
    At.fromWorkingColorSpace(gn.copy(this), n);
    const s = gn.r,
      a = gn.g,
      l = gn.b,
      f = Math.max(s, a, l),
      u = Math.min(s, a, l);
    let h, m;
    const g = (u + f) / 2;
    if (u === f) ((h = 0), (m = 0));
    else {
      const v = f - u;
      switch (((m = g <= 0.5 ? v / (f + u) : v / (2 - f - u)), f)) {
        case s:
          h = (a - l) / v + (a < l ? 6 : 0);
          break;
        case a:
          h = (l - s) / v + 2;
          break;
        case l:
          h = (s - a) / v + 4;
          break;
      }
      h /= 6;
    }
    return ((e.h = h), (e.s = m), (e.l = g), e);
  }
  getRGB(e, n = At.workingColorSpace) {
    return (
      At.fromWorkingColorSpace(gn.copy(this), n), (e.r = gn.r), (e.g = gn.g), (e.b = gn.b), e
    );
  }
  getStyle(e = ln) {
    At.fromWorkingColorSpace(gn.copy(this), e);
    const n = gn.r,
      s = gn.g,
      a = gn.b;
    return e !== ln
      ? `color(${e} ${n.toFixed(3)} ${s.toFixed(3)} ${a.toFixed(3)})`
      : `rgb(${Math.round(n * 255)},${Math.round(s * 255)},${Math.round(a * 255)})`;
  }
  offsetHSL(e, n, s) {
    return (this.getHSL(gr), this.setHSL(gr.h + e, gr.s + n, gr.l + s));
  }
  add(e) {
    return ((this.r += e.r), (this.g += e.g), (this.b += e.b), this);
  }
  addColors(e, n) {
    return ((this.r = e.r + n.r), (this.g = e.g + n.g), (this.b = e.b + n.b), this);
  }
  addScalar(e) {
    return ((this.r += e), (this.g += e), (this.b += e), this);
  }
  sub(e) {
    return (
      (this.r = Math.max(0, this.r - e.r)),
      (this.g = Math.max(0, this.g - e.g)),
      (this.b = Math.max(0, this.b - e.b)),
      this
    );
  }
  multiply(e) {
    return ((this.r *= e.r), (this.g *= e.g), (this.b *= e.b), this);
  }
  multiplyScalar(e) {
    return ((this.r *= e), (this.g *= e), (this.b *= e), this);
  }
  lerp(e, n) {
    return (
      (this.r += (e.r - this.r) * n),
      (this.g += (e.g - this.g) * n),
      (this.b += (e.b - this.b) * n),
      this
    );
  }
  lerpColors(e, n, s) {
    return (
      (this.r = e.r + (n.r - e.r) * s),
      (this.g = e.g + (n.g - e.g) * s),
      (this.b = e.b + (n.b - e.b) * s),
      this
    );
  }
  lerpHSL(e, n) {
    (this.getHSL(gr), e.getHSL(ul));
    const s = zo(gr.h, ul.h, n),
      a = zo(gr.s, ul.s, n),
      l = zo(gr.l, ul.l, n);
    return (this.setHSL(s, a, l), this);
  }
  setFromVector3(e) {
    return ((this.r = e.x), (this.g = e.y), (this.b = e.z), this);
  }
  applyMatrix3(e) {
    const n = this.r,
      s = this.g,
      a = this.b,
      l = e.elements;
    return (
      (this.r = l[0] * n + l[3] * s + l[6] * a),
      (this.g = l[1] * n + l[4] * s + l[7] * a),
      (this.b = l[2] * n + l[5] * s + l[8] * a),
      this
    );
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, n = 0) {
    return ((this.r = e[n]), (this.g = e[n + 1]), (this.b = e[n + 2]), this);
  }
  toArray(e = [], n = 0) {
    return ((e[n] = this.r), (e[n + 1] = this.g), (e[n + 2] = this.b), e);
  }
  fromBufferAttribute(e, n) {
    return ((this.r = e.getX(n)), (this.g = e.getY(n)), (this.b = e.getZ(n)), this);
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    (yield this.r, yield this.g, yield this.b);
  }
}
const gn = new Mt();
Mt.NAMES = fg;
let Wx = 0;
class $s extends qs {
  constructor() {
    (super(),
      (this.isMaterial = !0),
      Object.defineProperty(this, "id", { value: Wx++ }),
      (this.uuid = Ys()),
      (this.name = ""),
      (this.type = "Material"),
      (this.blending = Bs),
      (this.side = Mr),
      (this.vertexColors = !1),
      (this.opacity = 1),
      (this.transparent = !1),
      (this.alphaHash = !1),
      (this.blendSrc = sf),
      (this.blendDst = of),
      (this.blendEquation = Wr),
      (this.blendSrcAlpha = null),
      (this.blendDstAlpha = null),
      (this.blendEquationAlpha = null),
      (this.blendColor = new Mt(0, 0, 0)),
      (this.blendAlpha = 0),
      (this.depthFunc = Pl),
      (this.depthTest = !0),
      (this.depthWrite = !0),
      (this.stencilWriteMask = 255),
      (this.stencilFunc = Wp),
      (this.stencilRef = 0),
      (this.stencilFuncMask = 255),
      (this.stencilFail = ys),
      (this.stencilZFail = ys),
      (this.stencilZPass = ys),
      (this.stencilWrite = !1),
      (this.clippingPlanes = null),
      (this.clipIntersection = !1),
      (this.clipShadows = !1),
      (this.shadowSide = null),
      (this.colorWrite = !0),
      (this.precision = null),
      (this.polygonOffset = !1),
      (this.polygonOffsetFactor = 0),
      (this.polygonOffsetUnits = 0),
      (this.dithering = !1),
      (this.alphaToCoverage = !1),
      (this.premultipliedAlpha = !1),
      (this.forceSinglePass = !1),
      (this.visible = !0),
      (this.toneMapped = !0),
      (this.userData = {}),
      (this.version = 0),
      (this._alphaTest = 0));
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    (this._alphaTest > 0 != e > 0 && this.version++, (this._alphaTest = e));
  }
  onBuild() {}
  onBeforeRender() {}
  onBeforeCompile() {}
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const n in e) {
        const s = e[n];
        if (s === void 0) {
          console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);
          continue;
        }
        const a = this[n];
        if (a === void 0) {
          console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);
          continue;
        }
        a && a.isColor
          ? a.set(s)
          : a && a.isVector3 && s && s.isVector3
            ? a.copy(s)
            : (this[n] = s);
      }
  }
  toJSON(e) {
    const n = e === void 0 || typeof e == "string";
    n && (e = { textures: {}, images: {} });
    const s = { metadata: { version: 4.6, type: "Material", generator: "Material.toJSON" } };
    ((s.uuid = this.uuid),
      (s.type = this.type),
      this.name !== "" && (s.name = this.name),
      this.color && this.color.isColor && (s.color = this.color.getHex()),
      this.roughness !== void 0 && (s.roughness = this.roughness),
      this.metalness !== void 0 && (s.metalness = this.metalness),
      this.sheen !== void 0 && (s.sheen = this.sheen),
      this.sheenColor && this.sheenColor.isColor && (s.sheenColor = this.sheenColor.getHex()),
      this.sheenRoughness !== void 0 && (s.sheenRoughness = this.sheenRoughness),
      this.emissive && this.emissive.isColor && (s.emissive = this.emissive.getHex()),
      this.emissiveIntensity &&
        this.emissiveIntensity !== 1 &&
        (s.emissiveIntensity = this.emissiveIntensity),
      this.specular && this.specular.isColor && (s.specular = this.specular.getHex()),
      this.specularIntensity !== void 0 && (s.specularIntensity = this.specularIntensity),
      this.specularColor &&
        this.specularColor.isColor &&
        (s.specularColor = this.specularColor.getHex()),
      this.shininess !== void 0 && (s.shininess = this.shininess),
      this.clearcoat !== void 0 && (s.clearcoat = this.clearcoat),
      this.clearcoatRoughness !== void 0 && (s.clearcoatRoughness = this.clearcoatRoughness),
      this.clearcoatMap &&
        this.clearcoatMap.isTexture &&
        (s.clearcoatMap = this.clearcoatMap.toJSON(e).uuid),
      this.clearcoatRoughnessMap &&
        this.clearcoatRoughnessMap.isTexture &&
        (s.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid),
      this.clearcoatNormalMap &&
        this.clearcoatNormalMap.isTexture &&
        ((s.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid),
        (s.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
      this.iridescence !== void 0 && (s.iridescence = this.iridescence),
      this.iridescenceIOR !== void 0 && (s.iridescenceIOR = this.iridescenceIOR),
      this.iridescenceThicknessRange !== void 0 &&
        (s.iridescenceThicknessRange = this.iridescenceThicknessRange),
      this.iridescenceMap &&
        this.iridescenceMap.isTexture &&
        (s.iridescenceMap = this.iridescenceMap.toJSON(e).uuid),
      this.iridescenceThicknessMap &&
        this.iridescenceThicknessMap.isTexture &&
        (s.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid),
      this.anisotropy !== void 0 && (s.anisotropy = this.anisotropy),
      this.anisotropyRotation !== void 0 && (s.anisotropyRotation = this.anisotropyRotation),
      this.anisotropyMap &&
        this.anisotropyMap.isTexture &&
        (s.anisotropyMap = this.anisotropyMap.toJSON(e).uuid),
      this.map && this.map.isTexture && (s.map = this.map.toJSON(e).uuid),
      this.matcap && this.matcap.isTexture && (s.matcap = this.matcap.toJSON(e).uuid),
      this.alphaMap && this.alphaMap.isTexture && (s.alphaMap = this.alphaMap.toJSON(e).uuid),
      this.lightMap &&
        this.lightMap.isTexture &&
        ((s.lightMap = this.lightMap.toJSON(e).uuid),
        (s.lightMapIntensity = this.lightMapIntensity)),
      this.aoMap &&
        this.aoMap.isTexture &&
        ((s.aoMap = this.aoMap.toJSON(e).uuid), (s.aoMapIntensity = this.aoMapIntensity)),
      this.bumpMap &&
        this.bumpMap.isTexture &&
        ((s.bumpMap = this.bumpMap.toJSON(e).uuid), (s.bumpScale = this.bumpScale)),
      this.normalMap &&
        this.normalMap.isTexture &&
        ((s.normalMap = this.normalMap.toJSON(e).uuid),
        (s.normalMapType = this.normalMapType),
        (s.normalScale = this.normalScale.toArray())),
      this.displacementMap &&
        this.displacementMap.isTexture &&
        ((s.displacementMap = this.displacementMap.toJSON(e).uuid),
        (s.displacementScale = this.displacementScale),
        (s.displacementBias = this.displacementBias)),
      this.roughnessMap &&
        this.roughnessMap.isTexture &&
        (s.roughnessMap = this.roughnessMap.toJSON(e).uuid),
      this.metalnessMap &&
        this.metalnessMap.isTexture &&
        (s.metalnessMap = this.metalnessMap.toJSON(e).uuid),
      this.emissiveMap &&
        this.emissiveMap.isTexture &&
        (s.emissiveMap = this.emissiveMap.toJSON(e).uuid),
      this.specularMap &&
        this.specularMap.isTexture &&
        (s.specularMap = this.specularMap.toJSON(e).uuid),
      this.specularIntensityMap &&
        this.specularIntensityMap.isTexture &&
        (s.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid),
      this.specularColorMap &&
        this.specularColorMap.isTexture &&
        (s.specularColorMap = this.specularColorMap.toJSON(e).uuid),
      this.envMap &&
        this.envMap.isTexture &&
        ((s.envMap = this.envMap.toJSON(e).uuid),
        this.combine !== void 0 && (s.combine = this.combine)),
      this.envMapIntensity !== void 0 && (s.envMapIntensity = this.envMapIntensity),
      this.reflectivity !== void 0 && (s.reflectivity = this.reflectivity),
      this.refractionRatio !== void 0 && (s.refractionRatio = this.refractionRatio),
      this.gradientMap &&
        this.gradientMap.isTexture &&
        (s.gradientMap = this.gradientMap.toJSON(e).uuid),
      this.transmission !== void 0 && (s.transmission = this.transmission),
      this.transmissionMap &&
        this.transmissionMap.isTexture &&
        (s.transmissionMap = this.transmissionMap.toJSON(e).uuid),
      this.thickness !== void 0 && (s.thickness = this.thickness),
      this.thicknessMap &&
        this.thicknessMap.isTexture &&
        (s.thicknessMap = this.thicknessMap.toJSON(e).uuid),
      this.attenuationDistance !== void 0 &&
        this.attenuationDistance !== 1 / 0 &&
        (s.attenuationDistance = this.attenuationDistance),
      this.attenuationColor !== void 0 && (s.attenuationColor = this.attenuationColor.getHex()),
      this.size !== void 0 && (s.size = this.size),
      this.shadowSide !== null && (s.shadowSide = this.shadowSide),
      this.sizeAttenuation !== void 0 && (s.sizeAttenuation = this.sizeAttenuation),
      this.blending !== Bs && (s.blending = this.blending),
      this.side !== Mr && (s.side = this.side),
      this.vertexColors === !0 && (s.vertexColors = !0),
      this.opacity < 1 && (s.opacity = this.opacity),
      this.transparent === !0 && (s.transparent = !0),
      this.blendSrc !== sf && (s.blendSrc = this.blendSrc),
      this.blendDst !== of && (s.blendDst = this.blendDst),
      this.blendEquation !== Wr && (s.blendEquation = this.blendEquation),
      this.blendSrcAlpha !== null && (s.blendSrcAlpha = this.blendSrcAlpha),
      this.blendDstAlpha !== null && (s.blendDstAlpha = this.blendDstAlpha),
      this.blendEquationAlpha !== null && (s.blendEquationAlpha = this.blendEquationAlpha),
      this.blendColor && this.blendColor.isColor && (s.blendColor = this.blendColor.getHex()),
      this.blendAlpha !== 0 && (s.blendAlpha = this.blendAlpha),
      this.depthFunc !== Pl && (s.depthFunc = this.depthFunc),
      this.depthTest === !1 && (s.depthTest = this.depthTest),
      this.depthWrite === !1 && (s.depthWrite = this.depthWrite),
      this.colorWrite === !1 && (s.colorWrite = this.colorWrite),
      this.stencilWriteMask !== 255 && (s.stencilWriteMask = this.stencilWriteMask),
      this.stencilFunc !== Wp && (s.stencilFunc = this.stencilFunc),
      this.stencilRef !== 0 && (s.stencilRef = this.stencilRef),
      this.stencilFuncMask !== 255 && (s.stencilFuncMask = this.stencilFuncMask),
      this.stencilFail !== ys && (s.stencilFail = this.stencilFail),
      this.stencilZFail !== ys && (s.stencilZFail = this.stencilZFail),
      this.stencilZPass !== ys && (s.stencilZPass = this.stencilZPass),
      this.stencilWrite === !0 && (s.stencilWrite = this.stencilWrite),
      this.rotation !== void 0 && this.rotation !== 0 && (s.rotation = this.rotation),
      this.polygonOffset === !0 && (s.polygonOffset = !0),
      this.polygonOffsetFactor !== 0 && (s.polygonOffsetFactor = this.polygonOffsetFactor),
      this.polygonOffsetUnits !== 0 && (s.polygonOffsetUnits = this.polygonOffsetUnits),
      this.linewidth !== void 0 && this.linewidth !== 1 && (s.linewidth = this.linewidth),
      this.dashSize !== void 0 && (s.dashSize = this.dashSize),
      this.gapSize !== void 0 && (s.gapSize = this.gapSize),
      this.scale !== void 0 && (s.scale = this.scale),
      this.dithering === !0 && (s.dithering = !0),
      this.alphaTest > 0 && (s.alphaTest = this.alphaTest),
      this.alphaHash === !0 && (s.alphaHash = !0),
      this.alphaToCoverage === !0 && (s.alphaToCoverage = !0),
      this.premultipliedAlpha === !0 && (s.premultipliedAlpha = !0),
      this.forceSinglePass === !0 && (s.forceSinglePass = !0),
      this.wireframe === !0 && (s.wireframe = !0),
      this.wireframeLinewidth > 1 && (s.wireframeLinewidth = this.wireframeLinewidth),
      this.wireframeLinecap !== "round" && (s.wireframeLinecap = this.wireframeLinecap),
      this.wireframeLinejoin !== "round" && (s.wireframeLinejoin = this.wireframeLinejoin),
      this.flatShading === !0 && (s.flatShading = !0),
      this.visible === !1 && (s.visible = !1),
      this.toneMapped === !1 && (s.toneMapped = !1),
      this.fog === !1 && (s.fog = !1),
      Object.keys(this.userData).length > 0 && (s.userData = this.userData));
    function a(l) {
      const f = [];
      for (const u in l) {
        const h = l[u];
        (delete h.metadata, f.push(h));
      }
      return f;
    }
    if (n) {
      const l = a(e.textures),
        f = a(e.images);
      (l.length > 0 && (s.textures = l), f.length > 0 && (s.images = f));
    }
    return s;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    ((this.name = e.name),
      (this.blending = e.blending),
      (this.side = e.side),
      (this.vertexColors = e.vertexColors),
      (this.opacity = e.opacity),
      (this.transparent = e.transparent),
      (this.blendSrc = e.blendSrc),
      (this.blendDst = e.blendDst),
      (this.blendEquation = e.blendEquation),
      (this.blendSrcAlpha = e.blendSrcAlpha),
      (this.blendDstAlpha = e.blendDstAlpha),
      (this.blendEquationAlpha = e.blendEquationAlpha),
      this.blendColor.copy(e.blendColor),
      (this.blendAlpha = e.blendAlpha),
      (this.depthFunc = e.depthFunc),
      (this.depthTest = e.depthTest),
      (this.depthWrite = e.depthWrite),
      (this.stencilWriteMask = e.stencilWriteMask),
      (this.stencilFunc = e.stencilFunc),
      (this.stencilRef = e.stencilRef),
      (this.stencilFuncMask = e.stencilFuncMask),
      (this.stencilFail = e.stencilFail),
      (this.stencilZFail = e.stencilZFail),
      (this.stencilZPass = e.stencilZPass),
      (this.stencilWrite = e.stencilWrite));
    const n = e.clippingPlanes;
    let s = null;
    if (n !== null) {
      const a = n.length;
      s = new Array(a);
      for (let l = 0; l !== a; ++l) s[l] = n[l].clone();
    }
    return (
      (this.clippingPlanes = s),
      (this.clipIntersection = e.clipIntersection),
      (this.clipShadows = e.clipShadows),
      (this.shadowSide = e.shadowSide),
      (this.colorWrite = e.colorWrite),
      (this.precision = e.precision),
      (this.polygonOffset = e.polygonOffset),
      (this.polygonOffsetFactor = e.polygonOffsetFactor),
      (this.polygonOffsetUnits = e.polygonOffsetUnits),
      (this.dithering = e.dithering),
      (this.alphaTest = e.alphaTest),
      (this.alphaHash = e.alphaHash),
      (this.alphaToCoverage = e.alphaToCoverage),
      (this.premultipliedAlpha = e.premultipliedAlpha),
      (this.forceSinglePass = e.forceSinglePass),
      (this.visible = e.visible),
      (this.toneMapped = e.toneMapped),
      (this.userData = JSON.parse(JSON.stringify(e.userData))),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
}
class Mf extends $s {
  constructor(e) {
    (super(),
      (this.isMeshBasicMaterial = !0),
      (this.type = "MeshBasicMaterial"),
      (this.color = new Mt(16777215)),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.combine = $m),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.fog = !0),
      this.setValues(e));
  }
  copy(e) {
    return (
      super.copy(e),
      this.color.copy(e.color),
      (this.map = e.map),
      (this.lightMap = e.lightMap),
      (this.lightMapIntensity = e.lightMapIntensity),
      (this.aoMap = e.aoMap),
      (this.aoMapIntensity = e.aoMapIntensity),
      (this.specularMap = e.specularMap),
      (this.alphaMap = e.alphaMap),
      (this.envMap = e.envMap),
      (this.combine = e.combine),
      (this.reflectivity = e.reflectivity),
      (this.refractionRatio = e.refractionRatio),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.wireframeLinecap = e.wireframeLinecap),
      (this.wireframeLinejoin = e.wireframeLinejoin),
      (this.fog = e.fog),
      this
    );
  }
}
const jt = new ee(),
  fl = new Rt();
class ei {
  constructor(e, n, s = !1) {
    if (Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    ((this.isBufferAttribute = !0),
      (this.name = ""),
      (this.array = e),
      (this.itemSize = n),
      (this.count = e !== void 0 ? e.length / n : 0),
      (this.normalized = s),
      (this.usage = Xp),
      (this._updateRange = { offset: 0, count: -1 }),
      (this.updateRanges = []),
      (this.gpuType = vr),
      (this.version = 0));
  }
  onUploadCallback() {}
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  get updateRange() {
    return (
      console.warn(
        "THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead.",
      ),
      this._updateRange
    );
  }
  setUsage(e) {
    return ((this.usage = e), this);
  }
  addUpdateRange(e, n) {
    this.updateRanges.push({ start: e, count: n });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return (
      (this.name = e.name),
      (this.array = new e.array.constructor(e.array)),
      (this.itemSize = e.itemSize),
      (this.count = e.count),
      (this.normalized = e.normalized),
      (this.usage = e.usage),
      (this.gpuType = e.gpuType),
      this
    );
  }
  copyAt(e, n, s) {
    ((e *= this.itemSize), (s *= n.itemSize));
    for (let a = 0, l = this.itemSize; a < l; a++) this.array[e + a] = n.array[s + a];
    return this;
  }
  copyArray(e) {
    return (this.array.set(e), this);
  }
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let n = 0, s = this.count; n < s; n++)
        (fl.fromBufferAttribute(this, n), fl.applyMatrix3(e), this.setXY(n, fl.x, fl.y));
    else if (this.itemSize === 3)
      for (let n = 0, s = this.count; n < s; n++)
        (jt.fromBufferAttribute(this, n), jt.applyMatrix3(e), this.setXYZ(n, jt.x, jt.y, jt.z));
    return this;
  }
  applyMatrix4(e) {
    for (let n = 0, s = this.count; n < s; n++)
      (jt.fromBufferAttribute(this, n), jt.applyMatrix4(e), this.setXYZ(n, jt.x, jt.y, jt.z));
    return this;
  }
  applyNormalMatrix(e) {
    for (let n = 0, s = this.count; n < s; n++)
      (jt.fromBufferAttribute(this, n), jt.applyNormalMatrix(e), this.setXYZ(n, jt.x, jt.y, jt.z));
    return this;
  }
  transformDirection(e) {
    for (let n = 0, s = this.count; n < s; n++)
      (jt.fromBufferAttribute(this, n), jt.transformDirection(e), this.setXYZ(n, jt.x, jt.y, jt.z));
    return this;
  }
  set(e, n = 0) {
    return (this.array.set(e, n), this);
  }
  getComponent(e, n) {
    let s = this.array[e * this.itemSize + n];
    return (this.normalized && (s = Fs(s, this.array)), s);
  }
  setComponent(e, n, s) {
    return (
      this.normalized && (s = Sn(s, this.array)), (this.array[e * this.itemSize + n] = s), this
    );
  }
  getX(e) {
    let n = this.array[e * this.itemSize];
    return (this.normalized && (n = Fs(n, this.array)), n);
  }
  setX(e, n) {
    return (this.normalized && (n = Sn(n, this.array)), (this.array[e * this.itemSize] = n), this);
  }
  getY(e) {
    let n = this.array[e * this.itemSize + 1];
    return (this.normalized && (n = Fs(n, this.array)), n);
  }
  setY(e, n) {
    return (
      this.normalized && (n = Sn(n, this.array)), (this.array[e * this.itemSize + 1] = n), this
    );
  }
  getZ(e) {
    let n = this.array[e * this.itemSize + 2];
    return (this.normalized && (n = Fs(n, this.array)), n);
  }
  setZ(e, n) {
    return (
      this.normalized && (n = Sn(n, this.array)), (this.array[e * this.itemSize + 2] = n), this
    );
  }
  getW(e) {
    let n = this.array[e * this.itemSize + 3];
    return (this.normalized && (n = Fs(n, this.array)), n);
  }
  setW(e, n) {
    return (
      this.normalized && (n = Sn(n, this.array)), (this.array[e * this.itemSize + 3] = n), this
    );
  }
  setXY(e, n, s) {
    return (
      (e *= this.itemSize),
      this.normalized && ((n = Sn(n, this.array)), (s = Sn(s, this.array))),
      (this.array[e + 0] = n),
      (this.array[e + 1] = s),
      this
    );
  }
  setXYZ(e, n, s, a) {
    return (
      (e *= this.itemSize),
      this.normalized &&
        ((n = Sn(n, this.array)), (s = Sn(s, this.array)), (a = Sn(a, this.array))),
      (this.array[e + 0] = n),
      (this.array[e + 1] = s),
      (this.array[e + 2] = a),
      this
    );
  }
  setXYZW(e, n, s, a, l) {
    return (
      (e *= this.itemSize),
      this.normalized &&
        ((n = Sn(n, this.array)),
        (s = Sn(s, this.array)),
        (a = Sn(a, this.array)),
        (l = Sn(l, this.array))),
      (this.array[e + 0] = n),
      (this.array[e + 1] = s),
      (this.array[e + 2] = a),
      (this.array[e + 3] = l),
      this
    );
  }
  onUpload(e) {
    return ((this.onUploadCallback = e), this);
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized,
    };
    return (
      this.name !== "" && (e.name = this.name), this.usage !== Xp && (e.usage = this.usage), e
    );
  }
}
class dg extends ei {
  constructor(e, n, s) {
    super(new Uint16Array(e), n, s);
  }
}
class hg extends ei {
  constructor(e, n, s) {
    super(new Uint32Array(e), n, s);
  }
}
class pi extends ei {
  constructor(e, n, s) {
    super(new Float32Array(e), n, s);
  }
}
let Xx = 0;
const Zn = new Zt(),
  ju = new wn(),
  bs = new ee(),
  Bn = new Xo(),
  Oo = new Xo(),
  sn = new ee();
class ti extends qs {
  constructor() {
    (super(),
      (this.isBufferGeometry = !0),
      Object.defineProperty(this, "id", { value: Xx++ }),
      (this.uuid = Ys()),
      (this.name = ""),
      (this.type = "BufferGeometry"),
      (this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.morphTargetsRelative = !1),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null),
      (this.drawRange = { start: 0, count: 1 / 0 }),
      (this.userData = {}));
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return (Array.isArray(e) ? (this.index = new (og(e) ? hg : dg)(e, 1)) : (this.index = e), this);
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, n) {
    return ((this.attributes[e] = n), this);
  }
  deleteAttribute(e) {
    return (delete this.attributes[e], this);
  }
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  addGroup(e, n, s = 0) {
    this.groups.push({ start: e, count: n, materialIndex: s });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, n) {
    ((this.drawRange.start = e), (this.drawRange.count = n));
  }
  applyMatrix4(e) {
    const n = this.attributes.position;
    n !== void 0 && (n.applyMatrix4(e), (n.needsUpdate = !0));
    const s = this.attributes.normal;
    if (s !== void 0) {
      const l = new pt().getNormalMatrix(e);
      (s.applyNormalMatrix(l), (s.needsUpdate = !0));
    }
    const a = this.attributes.tangent;
    return (
      a !== void 0 && (a.transformDirection(e), (a.needsUpdate = !0)),
      this.boundingBox !== null && this.computeBoundingBox(),
      this.boundingSphere !== null && this.computeBoundingSphere(),
      this
    );
  }
  applyQuaternion(e) {
    return (Zn.makeRotationFromQuaternion(e), this.applyMatrix4(Zn), this);
  }
  rotateX(e) {
    return (Zn.makeRotationX(e), this.applyMatrix4(Zn), this);
  }
  rotateY(e) {
    return (Zn.makeRotationY(e), this.applyMatrix4(Zn), this);
  }
  rotateZ(e) {
    return (Zn.makeRotationZ(e), this.applyMatrix4(Zn), this);
  }
  translate(e, n, s) {
    return (Zn.makeTranslation(e, n, s), this.applyMatrix4(Zn), this);
  }
  scale(e, n, s) {
    return (Zn.makeScale(e, n, s), this.applyMatrix4(Zn), this);
  }
  lookAt(e) {
    return (ju.lookAt(e), ju.updateMatrix(), this.applyMatrix4(ju.matrix), this);
  }
  center() {
    return (
      this.computeBoundingBox(),
      this.boundingBox.getCenter(bs).negate(),
      this.translate(bs.x, bs.y, bs.z),
      this
    );
  }
  setFromPoints(e) {
    const n = [];
    for (let s = 0, a = e.length; s < a; s++) {
      const l = e[s];
      n.push(l.x, l.y, l.z || 0);
    }
    return (this.setAttribute("position", new pi(n, 3)), this);
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Xo());
    const e = this.attributes.position,
      n = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      (console.error(
        'THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',
        this,
      ),
        this.boundingBox.set(new ee(-1 / 0, -1 / 0, -1 / 0), new ee(1 / 0, 1 / 0, 1 / 0)));
      return;
    }
    if (e !== void 0) {
      if ((this.boundingBox.setFromBufferAttribute(e), n))
        for (let s = 0, a = n.length; s < a; s++) {
          const l = n[s];
          (Bn.setFromBufferAttribute(l),
            this.morphTargetsRelative
              ? (sn.addVectors(this.boundingBox.min, Bn.min),
                this.boundingBox.expandByPoint(sn),
                sn.addVectors(this.boundingBox.max, Bn.max),
                this.boundingBox.expandByPoint(sn))
              : (this.boundingBox.expandByPoint(Bn.min), this.boundingBox.expandByPoint(Bn.max)));
        }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) ||
      isNaN(this.boundingBox.min.y) ||
      isNaN(this.boundingBox.min.z)) &&
      console.error(
        'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
        this,
      );
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new jo());
    const e = this.attributes.position,
      n = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      (console.error(
        'THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',
        this,
      ),
        this.boundingSphere.set(new ee(), 1 / 0));
      return;
    }
    if (e) {
      const s = this.boundingSphere.center;
      if ((Bn.setFromBufferAttribute(e), n))
        for (let l = 0, f = n.length; l < f; l++) {
          const u = n[l];
          (Oo.setFromBufferAttribute(u),
            this.morphTargetsRelative
              ? (sn.addVectors(Bn.min, Oo.min),
                Bn.expandByPoint(sn),
                sn.addVectors(Bn.max, Oo.max),
                Bn.expandByPoint(sn))
              : (Bn.expandByPoint(Oo.min), Bn.expandByPoint(Oo.max)));
        }
      Bn.getCenter(s);
      let a = 0;
      for (let l = 0, f = e.count; l < f; l++)
        (sn.fromBufferAttribute(e, l), (a = Math.max(a, s.distanceToSquared(sn))));
      if (n)
        for (let l = 0, f = n.length; l < f; l++) {
          const u = n[l],
            h = this.morphTargetsRelative;
          for (let m = 0, g = u.count; m < g; m++)
            (sn.fromBufferAttribute(u, m),
              h && (bs.fromBufferAttribute(e, m), sn.add(bs)),
              (a = Math.max(a, s.distanceToSquared(sn))));
        }
      ((this.boundingSphere.radius = Math.sqrt(a)),
        isNaN(this.boundingSphere.radius) &&
          console.error(
            'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
            this,
          ));
    }
  }
  computeTangents() {
    const e = this.index,
      n = this.attributes;
    if (e === null || n.position === void 0 || n.normal === void 0 || n.uv === void 0) {
      console.error(
        "THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)",
      );
      return;
    }
    const s = e.array,
      a = n.position.array,
      l = n.normal.array,
      f = n.uv.array,
      u = a.length / 3;
    this.hasAttribute("tangent") === !1 &&
      this.setAttribute("tangent", new ei(new Float32Array(4 * u), 4));
    const h = this.getAttribute("tangent").array,
      m = [],
      g = [];
    for (let b = 0; b < u; b++) ((m[b] = new ee()), (g[b] = new ee()));
    const v = new ee(),
      y = new ee(),
      S = new ee(),
      T = new Rt(),
      E = new Rt(),
      x = new Rt(),
      _ = new ee(),
      D = new ee();
    function R(b, le, ne) {
      (v.fromArray(a, b * 3),
        y.fromArray(a, le * 3),
        S.fromArray(a, ne * 3),
        T.fromArray(f, b * 2),
        E.fromArray(f, le * 2),
        x.fromArray(f, ne * 2),
        y.sub(v),
        S.sub(v),
        E.sub(T),
        x.sub(T));
      const pe = 1 / (E.x * x.y - x.x * E.y);
      isFinite(pe) &&
        (_.copy(y).multiplyScalar(x.y).addScaledVector(S, -E.y).multiplyScalar(pe),
        D.copy(S).multiplyScalar(E.x).addScaledVector(y, -x.x).multiplyScalar(pe),
        m[b].add(_),
        m[le].add(_),
        m[ne].add(_),
        g[b].add(D),
        g[le].add(D),
        g[ne].add(D));
    }
    let N = this.groups;
    N.length === 0 && (N = [{ start: 0, count: s.length }]);
    for (let b = 0, le = N.length; b < le; ++b) {
      const ne = N[b],
        pe = ne.start,
        H = ne.count;
      for (let J = pe, ie = pe + H; J < ie; J += 3) R(s[J + 0], s[J + 1], s[J + 2]);
    }
    const z = new ee(),
      I = new ee(),
      F = new ee(),
      X = new ee();
    function A(b) {
      (F.fromArray(l, b * 3), X.copy(F));
      const le = m[b];
      (z.copy(le), z.sub(F.multiplyScalar(F.dot(le))).normalize(), I.crossVectors(X, le));
      const pe = I.dot(g[b]) < 0 ? -1 : 1;
      ((h[b * 4] = z.x), (h[b * 4 + 1] = z.y), (h[b * 4 + 2] = z.z), (h[b * 4 + 3] = pe));
    }
    for (let b = 0, le = N.length; b < le; ++b) {
      const ne = N[b],
        pe = ne.start,
        H = ne.count;
      for (let J = pe, ie = pe + H; J < ie; J += 3) (A(s[J + 0]), A(s[J + 1]), A(s[J + 2]));
    }
  }
  computeVertexNormals() {
    const e = this.index,
      n = this.getAttribute("position");
    if (n !== void 0) {
      let s = this.getAttribute("normal");
      if (s === void 0)
        ((s = new ei(new Float32Array(n.count * 3), 3)), this.setAttribute("normal", s));
      else for (let y = 0, S = s.count; y < S; y++) s.setXYZ(y, 0, 0, 0);
      const a = new ee(),
        l = new ee(),
        f = new ee(),
        u = new ee(),
        h = new ee(),
        m = new ee(),
        g = new ee(),
        v = new ee();
      if (e)
        for (let y = 0, S = e.count; y < S; y += 3) {
          const T = e.getX(y + 0),
            E = e.getX(y + 1),
            x = e.getX(y + 2);
          (a.fromBufferAttribute(n, T),
            l.fromBufferAttribute(n, E),
            f.fromBufferAttribute(n, x),
            g.subVectors(f, l),
            v.subVectors(a, l),
            g.cross(v),
            u.fromBufferAttribute(s, T),
            h.fromBufferAttribute(s, E),
            m.fromBufferAttribute(s, x),
            u.add(g),
            h.add(g),
            m.add(g),
            s.setXYZ(T, u.x, u.y, u.z),
            s.setXYZ(E, h.x, h.y, h.z),
            s.setXYZ(x, m.x, m.y, m.z));
        }
      else
        for (let y = 0, S = n.count; y < S; y += 3)
          (a.fromBufferAttribute(n, y + 0),
            l.fromBufferAttribute(n, y + 1),
            f.fromBufferAttribute(n, y + 2),
            g.subVectors(f, l),
            v.subVectors(a, l),
            g.cross(v),
            s.setXYZ(y + 0, g.x, g.y, g.z),
            s.setXYZ(y + 1, g.x, g.y, g.z),
            s.setXYZ(y + 2, g.x, g.y, g.z));
      (this.normalizeNormals(), (s.needsUpdate = !0));
    }
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let n = 0, s = e.count; n < s; n++)
      (sn.fromBufferAttribute(e, n), sn.normalize(), e.setXYZ(n, sn.x, sn.y, sn.z));
  }
  toNonIndexed() {
    function e(u, h) {
      const m = u.array,
        g = u.itemSize,
        v = u.normalized,
        y = new m.constructor(h.length * g);
      let S = 0,
        T = 0;
      for (let E = 0, x = h.length; E < x; E++) {
        u.isInterleavedBufferAttribute ? (S = h[E] * u.data.stride + u.offset) : (S = h[E] * g);
        for (let _ = 0; _ < g; _++) y[T++] = m[S++];
      }
      return new ei(y, g, v);
    }
    if (this.index === null)
      return (
        console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),
        this
      );
    const n = new ti(),
      s = this.index.array,
      a = this.attributes;
    for (const u in a) {
      const h = a[u],
        m = e(h, s);
      n.setAttribute(u, m);
    }
    const l = this.morphAttributes;
    for (const u in l) {
      const h = [],
        m = l[u];
      for (let g = 0, v = m.length; g < v; g++) {
        const y = m[g],
          S = e(y, s);
        h.push(S);
      }
      n.morphAttributes[u] = h;
    }
    n.morphTargetsRelative = this.morphTargetsRelative;
    const f = this.groups;
    for (let u = 0, h = f.length; u < h; u++) {
      const m = f[u];
      n.addGroup(m.start, m.count, m.materialIndex);
    }
    return n;
  }
  toJSON() {
    const e = {
      metadata: { version: 4.6, type: "BufferGeometry", generator: "BufferGeometry.toJSON" },
    };
    if (
      ((e.uuid = this.uuid),
      (e.type = this.type),
      this.name !== "" && (e.name = this.name),
      Object.keys(this.userData).length > 0 && (e.userData = this.userData),
      this.parameters !== void 0)
    ) {
      const h = this.parameters;
      for (const m in h) h[m] !== void 0 && (e[m] = h[m]);
      return e;
    }
    e.data = { attributes: {} };
    const n = this.index;
    n !== null &&
      (e.data.index = {
        type: n.array.constructor.name,
        array: Array.prototype.slice.call(n.array),
      });
    const s = this.attributes;
    for (const h in s) {
      const m = s[h];
      e.data.attributes[h] = m.toJSON(e.data);
    }
    const a = {};
    let l = !1;
    for (const h in this.morphAttributes) {
      const m = this.morphAttributes[h],
        g = [];
      for (let v = 0, y = m.length; v < y; v++) {
        const S = m[v];
        g.push(S.toJSON(e.data));
      }
      g.length > 0 && ((a[h] = g), (l = !0));
    }
    l && ((e.data.morphAttributes = a), (e.data.morphTargetsRelative = this.morphTargetsRelative));
    const f = this.groups;
    f.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(f)));
    const u = this.boundingSphere;
    return (
      u !== null && (e.data.boundingSphere = { center: u.center.toArray(), radius: u.radius }), e
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    ((this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null));
    const n = {};
    this.name = e.name;
    const s = e.index;
    s !== null && this.setIndex(s.clone(n));
    const a = e.attributes;
    for (const m in a) {
      const g = a[m];
      this.setAttribute(m, g.clone(n));
    }
    const l = e.morphAttributes;
    for (const m in l) {
      const g = [],
        v = l[m];
      for (let y = 0, S = v.length; y < S; y++) g.push(v[y].clone(n));
      this.morphAttributes[m] = g;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const f = e.groups;
    for (let m = 0, g = f.length; m < g; m++) {
      const v = f[m];
      this.addGroup(v.start, v.count, v.materialIndex);
    }
    const u = e.boundingBox;
    u !== null && (this.boundingBox = u.clone());
    const h = e.boundingSphere;
    return (
      h !== null && (this.boundingSphere = h.clone()),
      (this.drawRange.start = e.drawRange.start),
      (this.drawRange.count = e.drawRange.count),
      (this.userData = e.userData),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const sm = new Zt(),
  Br = new Sf(),
  dl = new jo(),
  om = new ee(),
  Ps = new ee(),
  Ls = new ee(),
  Ds = new ee(),
  qu = new ee(),
  hl = new ee(),
  pl = new Rt(),
  ml = new Rt(),
  gl = new Rt(),
  am = new ee(),
  lm = new ee(),
  cm = new ee(),
  _l = new ee(),
  vl = new ee();
class Hi extends wn {
  constructor(e = new ti(), n = new Mf()) {
    (super(),
      (this.isMesh = !0),
      (this.type = "Mesh"),
      (this.geometry = e),
      (this.material = n),
      this.updateMorphTargets());
  }
  copy(e, n) {
    return (
      super.copy(e, n),
      e.morphTargetInfluences !== void 0 &&
        (this.morphTargetInfluences = e.morphTargetInfluences.slice()),
      e.morphTargetDictionary !== void 0 &&
        (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)),
      (this.material = Array.isArray(e.material) ? e.material.slice() : e.material),
      (this.geometry = e.geometry),
      this
    );
  }
  updateMorphTargets() {
    const n = this.geometry.morphAttributes,
      s = Object.keys(n);
    if (s.length > 0) {
      const a = n[s[0]];
      if (a !== void 0) {
        ((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}));
        for (let l = 0, f = a.length; l < f; l++) {
          const u = a[l].name || String(l);
          (this.morphTargetInfluences.push(0), (this.morphTargetDictionary[u] = l));
        }
      }
    }
  }
  getVertexPosition(e, n) {
    const s = this.geometry,
      a = s.attributes.position,
      l = s.morphAttributes.position,
      f = s.morphTargetsRelative;
    n.fromBufferAttribute(a, e);
    const u = this.morphTargetInfluences;
    if (l && u) {
      hl.set(0, 0, 0);
      for (let h = 0, m = l.length; h < m; h++) {
        const g = u[h],
          v = l[h];
        g !== 0 &&
          (qu.fromBufferAttribute(v, e),
          f ? hl.addScaledVector(qu, g) : hl.addScaledVector(qu.sub(n), g));
      }
      n.add(hl);
    }
    return n;
  }
  raycast(e, n) {
    const s = this.geometry,
      a = this.material,
      l = this.matrixWorld;
    a !== void 0 &&
      (s.boundingSphere === null && s.computeBoundingSphere(),
      dl.copy(s.boundingSphere),
      dl.applyMatrix4(l),
      Br.copy(e.ray).recast(e.near),
      !(
        dl.containsPoint(Br.origin) === !1 &&
        (Br.intersectSphere(dl, om) === null ||
          Br.origin.distanceToSquared(om) > (e.far - e.near) ** 2)
      ) &&
        (sm.copy(l).invert(),
        Br.copy(e.ray).applyMatrix4(sm),
        !(s.boundingBox !== null && Br.intersectsBox(s.boundingBox) === !1) &&
          this._computeIntersections(e, n, Br)));
  }
  _computeIntersections(e, n, s) {
    let a;
    const l = this.geometry,
      f = this.material,
      u = l.index,
      h = l.attributes.position,
      m = l.attributes.uv,
      g = l.attributes.uv1,
      v = l.attributes.normal,
      y = l.groups,
      S = l.drawRange;
    if (u !== null)
      if (Array.isArray(f))
        for (let T = 0, E = y.length; T < E; T++) {
          const x = y[T],
            _ = f[x.materialIndex],
            D = Math.max(x.start, S.start),
            R = Math.min(u.count, Math.min(x.start + x.count, S.start + S.count));
          for (let N = D, z = R; N < z; N += 3) {
            const I = u.getX(N),
              F = u.getX(N + 1),
              X = u.getX(N + 2);
            ((a = xl(this, _, e, s, m, g, v, I, F, X)),
              a &&
                ((a.faceIndex = Math.floor(N / 3)),
                (a.face.materialIndex = x.materialIndex),
                n.push(a)));
          }
        }
      else {
        const T = Math.max(0, S.start),
          E = Math.min(u.count, S.start + S.count);
        for (let x = T, _ = E; x < _; x += 3) {
          const D = u.getX(x),
            R = u.getX(x + 1),
            N = u.getX(x + 2);
          ((a = xl(this, f, e, s, m, g, v, D, R, N)),
            a && ((a.faceIndex = Math.floor(x / 3)), n.push(a)));
        }
      }
    else if (h !== void 0)
      if (Array.isArray(f))
        for (let T = 0, E = y.length; T < E; T++) {
          const x = y[T],
            _ = f[x.materialIndex],
            D = Math.max(x.start, S.start),
            R = Math.min(h.count, Math.min(x.start + x.count, S.start + S.count));
          for (let N = D, z = R; N < z; N += 3) {
            const I = N,
              F = N + 1,
              X = N + 2;
            ((a = xl(this, _, e, s, m, g, v, I, F, X)),
              a &&
                ((a.faceIndex = Math.floor(N / 3)),
                (a.face.materialIndex = x.materialIndex),
                n.push(a)));
          }
        }
      else {
        const T = Math.max(0, S.start),
          E = Math.min(h.count, S.start + S.count);
        for (let x = T, _ = E; x < _; x += 3) {
          const D = x,
            R = x + 1,
            N = x + 2;
          ((a = xl(this, f, e, s, m, g, v, D, R, N)),
            a && ((a.faceIndex = Math.floor(x / 3)), n.push(a)));
        }
      }
  }
}
function jx(r, e, n, s, a, l, f, u) {
  let h;
  if (
    (e.side === Un
      ? (h = s.intersectTriangle(f, l, a, !0, u))
      : (h = s.intersectTriangle(a, l, f, e.side === Mr, u)),
    h === null)
  )
    return null;
  (vl.copy(u), vl.applyMatrix4(r.matrixWorld));
  const m = n.ray.origin.distanceTo(vl);
  return m < n.near || m > n.far ? null : { distance: m, point: vl.clone(), object: r };
}
function xl(r, e, n, s, a, l, f, u, h, m) {
  (r.getVertexPosition(u, Ps), r.getVertexPosition(h, Ls), r.getVertexPosition(m, Ds));
  const g = jx(r, e, n, s, Ps, Ls, Ds, _l);
  if (g) {
    (a &&
      (pl.fromBufferAttribute(a, u),
      ml.fromBufferAttribute(a, h),
      gl.fromBufferAttribute(a, m),
      (g.uv = fi.getInterpolation(_l, Ps, Ls, Ds, pl, ml, gl, new Rt()))),
      l &&
        (pl.fromBufferAttribute(l, u),
        ml.fromBufferAttribute(l, h),
        gl.fromBufferAttribute(l, m),
        (g.uv1 = fi.getInterpolation(_l, Ps, Ls, Ds, pl, ml, gl, new Rt())),
        (g.uv2 = g.uv1)),
      f &&
        (am.fromBufferAttribute(f, u),
        lm.fromBufferAttribute(f, h),
        cm.fromBufferAttribute(f, m),
        (g.normal = fi.getInterpolation(_l, Ps, Ls, Ds, am, lm, cm, new ee())),
        g.normal.dot(s.direction) > 0 && g.normal.multiplyScalar(-1)));
    const v = { a: u, b: h, c: m, normal: new ee(), materialIndex: 0 };
    (fi.getNormal(Ps, Ls, Ds, v.normal), (g.face = v));
  }
  return g;
}
class qo extends ti {
  constructor(e = 1, n = 1, s = 1, a = 1, l = 1, f = 1) {
    (super(),
      (this.type = "BoxGeometry"),
      (this.parameters = {
        width: e,
        height: n,
        depth: s,
        widthSegments: a,
        heightSegments: l,
        depthSegments: f,
      }));
    const u = this;
    ((a = Math.floor(a)), (l = Math.floor(l)), (f = Math.floor(f)));
    const h = [],
      m = [],
      g = [],
      v = [];
    let y = 0,
      S = 0;
    (T("z", "y", "x", -1, -1, s, n, e, f, l, 0),
      T("z", "y", "x", 1, -1, s, n, -e, f, l, 1),
      T("x", "z", "y", 1, 1, e, s, n, a, f, 2),
      T("x", "z", "y", 1, -1, e, s, -n, a, f, 3),
      T("x", "y", "z", 1, -1, e, n, s, a, l, 4),
      T("x", "y", "z", -1, -1, e, n, -s, a, l, 5),
      this.setIndex(h),
      this.setAttribute("position", new pi(m, 3)),
      this.setAttribute("normal", new pi(g, 3)),
      this.setAttribute("uv", new pi(v, 2)));
    function T(E, x, _, D, R, N, z, I, F, X, A) {
      const b = N / F,
        le = z / X,
        ne = N / 2,
        pe = z / 2,
        H = I / 2,
        J = F + 1,
        ie = X + 1;
      let ue = 0,
        V = 0;
      const K = new ee();
      for (let j = 0; j < ie; j++) {
        const L = j * le - pe;
        for (let W = 0; W < J; W++) {
          const q = W * b - ne;
          ((K[E] = q * D),
            (K[x] = L * R),
            (K[_] = H),
            m.push(K.x, K.y, K.z),
            (K[E] = 0),
            (K[x] = 0),
            (K[_] = I > 0 ? 1 : -1),
            g.push(K.x, K.y, K.z),
            v.push(W / F),
            v.push(1 - j / X),
            (ue += 1));
        }
      }
      for (let j = 0; j < X; j++)
        for (let L = 0; L < F; L++) {
          const W = y + L + J * j,
            q = y + L + J * (j + 1),
            ce = y + (L + 1) + J * (j + 1),
            me = y + (L + 1) + J * j;
          (h.push(W, q, me), h.push(q, ce, me), (V += 6));
        }
      (u.addGroup(S, V, A), (S += V), (y += ue));
    }
  }
  copy(e) {
    return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
  }
  static fromJSON(e) {
    return new qo(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function Xs(r) {
  const e = {};
  for (const n in r) {
    e[n] = {};
    for (const s in r[n]) {
      const a = r[n][s];
      a &&
      (a.isColor ||
        a.isMatrix3 ||
        a.isMatrix4 ||
        a.isVector2 ||
        a.isVector3 ||
        a.isVector4 ||
        a.isTexture ||
        a.isQuaternion)
        ? a.isRenderTargetTexture
          ? (console.warn(
              "UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().",
            ),
            (e[n][s] = null))
          : (e[n][s] = a.clone())
        : Array.isArray(a)
          ? (e[n][s] = a.slice())
          : (e[n][s] = a);
    }
  }
  return e;
}
function Mn(r) {
  const e = {};
  for (let n = 0; n < r.length; n++) {
    const s = Xs(r[n]);
    for (const a in s) e[a] = s[a];
  }
  return e;
}
function qx(r) {
  const e = [];
  for (let n = 0; n < r.length; n++) e.push(r[n].clone());
  return e;
}
function pg(r) {
  return r.getRenderTarget() === null ? r.outputColorSpace : At.workingColorSpace;
}
const Yx = { clone: Xs, merge: Mn };
var $x = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
  Kx = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class Kr extends $s {
  constructor(e) {
    (super(),
      (this.isShaderMaterial = !0),
      (this.type = "ShaderMaterial"),
      (this.defines = {}),
      (this.uniforms = {}),
      (this.uniformsGroups = []),
      (this.vertexShader = $x),
      (this.fragmentShader = Kx),
      (this.linewidth = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.fog = !1),
      (this.lights = !1),
      (this.clipping = !1),
      (this.forceSinglePass = !0),
      (this.extensions = {
        derivatives: !1,
        fragDepth: !1,
        drawBuffers: !1,
        shaderTextureLOD: !1,
        clipCullDistance: !1,
      }),
      (this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv1: [0, 0] }),
      (this.index0AttributeName = void 0),
      (this.uniformsNeedUpdate = !1),
      (this.glslVersion = null),
      e !== void 0 && this.setValues(e));
  }
  copy(e) {
    return (
      super.copy(e),
      (this.fragmentShader = e.fragmentShader),
      (this.vertexShader = e.vertexShader),
      (this.uniforms = Xs(e.uniforms)),
      (this.uniformsGroups = qx(e.uniformsGroups)),
      (this.defines = Object.assign({}, e.defines)),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.fog = e.fog),
      (this.lights = e.lights),
      (this.clipping = e.clipping),
      (this.extensions = Object.assign({}, e.extensions)),
      (this.glslVersion = e.glslVersion),
      this
    );
  }
  toJSON(e) {
    const n = super.toJSON(e);
    ((n.glslVersion = this.glslVersion), (n.uniforms = {}));
    for (const a in this.uniforms) {
      const f = this.uniforms[a].value;
      f && f.isTexture
        ? (n.uniforms[a] = { type: "t", value: f.toJSON(e).uuid })
        : f && f.isColor
          ? (n.uniforms[a] = { type: "c", value: f.getHex() })
          : f && f.isVector2
            ? (n.uniforms[a] = { type: "v2", value: f.toArray() })
            : f && f.isVector3
              ? (n.uniforms[a] = { type: "v3", value: f.toArray() })
              : f && f.isVector4
                ? (n.uniforms[a] = { type: "v4", value: f.toArray() })
                : f && f.isMatrix3
                  ? (n.uniforms[a] = { type: "m3", value: f.toArray() })
                  : f && f.isMatrix4
                    ? (n.uniforms[a] = { type: "m4", value: f.toArray() })
                    : (n.uniforms[a] = { value: f });
    }
    (Object.keys(this.defines).length > 0 && (n.defines = this.defines),
      (n.vertexShader = this.vertexShader),
      (n.fragmentShader = this.fragmentShader),
      (n.lights = this.lights),
      (n.clipping = this.clipping));
    const s = {};
    for (const a in this.extensions) this.extensions[a] === !0 && (s[a] = !0);
    return (Object.keys(s).length > 0 && (n.extensions = s), n);
  }
}
class mg extends wn {
  constructor() {
    (super(),
      (this.isCamera = !0),
      (this.type = "Camera"),
      (this.matrixWorldInverse = new Zt()),
      (this.projectionMatrix = new Zt()),
      (this.projectionMatrixInverse = new Zt()),
      (this.coordinateSystem = Bi));
  }
  copy(e, n) {
    return (
      super.copy(e, n),
      this.matrixWorldInverse.copy(e.matrixWorldInverse),
      this.projectionMatrix.copy(e.projectionMatrix),
      this.projectionMatrixInverse.copy(e.projectionMatrixInverse),
      (this.coordinateSystem = e.coordinateSystem),
      this
    );
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    (super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert());
  }
  updateWorldMatrix(e, n) {
    (super.updateWorldMatrix(e, n), this.matrixWorldInverse.copy(this.matrixWorld).invert());
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Hn extends mg {
  constructor(e = 50, n = 1, s = 0.1, a = 2e3) {
    (super(),
      (this.isPerspectiveCamera = !0),
      (this.type = "PerspectiveCamera"),
      (this.fov = e),
      (this.zoom = 1),
      (this.near = s),
      (this.far = a),
      (this.focus = 10),
      (this.aspect = n),
      (this.view = null),
      (this.filmGauge = 35),
      (this.filmOffset = 0),
      this.updateProjectionMatrix());
  }
  copy(e, n) {
    return (
      super.copy(e, n),
      (this.fov = e.fov),
      (this.zoom = e.zoom),
      (this.near = e.near),
      (this.far = e.far),
      (this.focus = e.focus),
      (this.aspect = e.aspect),
      (this.view = e.view === null ? null : Object.assign({}, e.view)),
      (this.filmGauge = e.filmGauge),
      (this.filmOffset = e.filmOffset),
      this
    );
  }
  setFocalLength(e) {
    const n = (0.5 * this.getFilmHeight()) / e;
    ((this.fov = Vo * 2 * Math.atan(n)), this.updateProjectionMatrix());
  }
  getFocalLength() {
    const e = Math.tan(ko * 0.5 * this.fov);
    return (0.5 * this.getFilmHeight()) / e;
  }
  getEffectiveFOV() {
    return Vo * 2 * Math.atan(Math.tan(ko * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  setViewOffset(e, n, s, a, l, f) {
    ((this.aspect = e / n),
      this.view === null &&
        (this.view = {
          enabled: !0,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1,
        }),
      (this.view.enabled = !0),
      (this.view.fullWidth = e),
      (this.view.fullHeight = n),
      (this.view.offsetX = s),
      (this.view.offsetY = a),
      (this.view.width = l),
      (this.view.height = f),
      this.updateProjectionMatrix());
  }
  clearViewOffset() {
    (this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix());
  }
  updateProjectionMatrix() {
    const e = this.near;
    let n = (e * Math.tan(ko * 0.5 * this.fov)) / this.zoom,
      s = 2 * n,
      a = this.aspect * s,
      l = -0.5 * a;
    const f = this.view;
    if (this.view !== null && this.view.enabled) {
      const h = f.fullWidth,
        m = f.fullHeight;
      ((l += (f.offsetX * a) / h),
        (n -= (f.offsetY * s) / m),
        (a *= f.width / h),
        (s *= f.height / m));
    }
    const u = this.filmOffset;
    (u !== 0 && (l += (e * u) / this.getFilmWidth()),
      this.projectionMatrix.makePerspective(l, l + a, n, n - s, e, this.far, this.coordinateSystem),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert());
  }
  toJSON(e) {
    const n = super.toJSON(e);
    return (
      (n.object.fov = this.fov),
      (n.object.zoom = this.zoom),
      (n.object.near = this.near),
      (n.object.far = this.far),
      (n.object.focus = this.focus),
      (n.object.aspect = this.aspect),
      this.view !== null && (n.object.view = Object.assign({}, this.view)),
      (n.object.filmGauge = this.filmGauge),
      (n.object.filmOffset = this.filmOffset),
      n
    );
  }
}
const Ns = -90,
  Us = 1;
class Zx extends wn {
  constructor(e, n, s) {
    (super(),
      (this.type = "CubeCamera"),
      (this.renderTarget = s),
      (this.coordinateSystem = null),
      (this.activeMipmapLevel = 0));
    const a = new Hn(Ns, Us, e, n);
    ((a.layers = this.layers), this.add(a));
    const l = new Hn(Ns, Us, e, n);
    ((l.layers = this.layers), this.add(l));
    const f = new Hn(Ns, Us, e, n);
    ((f.layers = this.layers), this.add(f));
    const u = new Hn(Ns, Us, e, n);
    ((u.layers = this.layers), this.add(u));
    const h = new Hn(Ns, Us, e, n);
    ((h.layers = this.layers), this.add(h));
    const m = new Hn(Ns, Us, e, n);
    ((m.layers = this.layers), this.add(m));
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem,
      n = this.children.concat(),
      [s, a, l, f, u, h] = n;
    for (const m of n) this.remove(m);
    if (e === Bi)
      (s.up.set(0, 1, 0),
        s.lookAt(1, 0, 0),
        a.up.set(0, 1, 0),
        a.lookAt(-1, 0, 0),
        l.up.set(0, 0, -1),
        l.lookAt(0, 1, 0),
        f.up.set(0, 0, 1),
        f.lookAt(0, -1, 0),
        u.up.set(0, 1, 0),
        u.lookAt(0, 0, 1),
        h.up.set(0, 1, 0),
        h.lookAt(0, 0, -1));
    else if (e === Ul)
      (s.up.set(0, -1, 0),
        s.lookAt(-1, 0, 0),
        a.up.set(0, -1, 0),
        a.lookAt(1, 0, 0),
        l.up.set(0, 0, 1),
        l.lookAt(0, 1, 0),
        f.up.set(0, 0, -1),
        f.lookAt(0, -1, 0),
        u.up.set(0, -1, 0),
        u.lookAt(0, 0, 1),
        h.up.set(0, -1, 0),
        h.lookAt(0, 0, -1));
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const m of n) (this.add(m), m.updateMatrixWorld());
  }
  update(e, n) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: s, activeMipmapLevel: a } = this;
    this.coordinateSystem !== e.coordinateSystem &&
      ((this.coordinateSystem = e.coordinateSystem), this.updateCoordinateSystem());
    const [l, f, u, h, m, g] = this.children,
      v = e.getRenderTarget(),
      y = e.getActiveCubeFace(),
      S = e.getActiveMipmapLevel(),
      T = e.xr.enabled;
    e.xr.enabled = !1;
    const E = s.texture.generateMipmaps;
    ((s.texture.generateMipmaps = !1),
      e.setRenderTarget(s, 0, a),
      e.render(n, l),
      e.setRenderTarget(s, 1, a),
      e.render(n, f),
      e.setRenderTarget(s, 2, a),
      e.render(n, u),
      e.setRenderTarget(s, 3, a),
      e.render(n, h),
      e.setRenderTarget(s, 4, a),
      e.render(n, m),
      (s.texture.generateMipmaps = E),
      e.setRenderTarget(s, 5, a),
      e.render(n, g),
      e.setRenderTarget(v, y, S),
      (e.xr.enabled = T),
      (s.texture.needsPMREMUpdate = !0));
  }
}
class gg extends Gn {
  constructor(e, n, s, a, l, f, u, h, m, g) {
    ((e = e !== void 0 ? e : []),
      (n = n !== void 0 ? n : Gs),
      super(e, n, s, a, l, f, u, h, m, g),
      (this.isCubeTexture = !0),
      (this.flipY = !1));
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class Qx extends $r {
  constructor(e = 1, n = {}) {
    (super(e, e, n), (this.isWebGLCubeRenderTarget = !0));
    const s = { width: e, height: e, depth: 1 },
      a = [s, s, s, s, s, s];
    (n.encoding !== void 0 &&
      (Bo("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),
      (n.colorSpace = n.encoding === Yr ? ln : Jn)),
      (this.texture = new gg(
        a,
        n.mapping,
        n.wrapS,
        n.wrapT,
        n.magFilter,
        n.minFilter,
        n.format,
        n.type,
        n.anisotropy,
        n.colorSpace,
      )),
      (this.texture.isRenderTargetTexture = !0),
      (this.texture.generateMipmaps = n.generateMipmaps !== void 0 ? n.generateMipmaps : !1),
      (this.texture.minFilter = n.minFilter !== void 0 ? n.minFilter : Qn));
  }
  fromEquirectangularTexture(e, n) {
    ((this.texture.type = n.type),
      (this.texture.colorSpace = n.colorSpace),
      (this.texture.generateMipmaps = n.generateMipmaps),
      (this.texture.minFilter = n.minFilter),
      (this.texture.magFilter = n.magFilter));
    const s = {
        uniforms: { tEquirect: { value: null } },
        vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
        fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`,
      },
      a = new qo(5, 5, 5),
      l = new Kr({
        name: "CubemapFromEquirect",
        uniforms: Xs(s.uniforms),
        vertexShader: s.vertexShader,
        fragmentShader: s.fragmentShader,
        side: Un,
        blending: xr,
      });
    l.uniforms.tEquirect.value = n;
    const f = new Hi(a, l),
      u = n.minFilter;
    return (
      n.minFilter === Ho && (n.minFilter = Qn),
      new Zx(1, 10, this).update(e, f),
      (n.minFilter = u),
      f.geometry.dispose(),
      f.material.dispose(),
      this
    );
  }
  clear(e, n, s, a) {
    const l = e.getRenderTarget();
    for (let f = 0; f < 6; f++) (e.setRenderTarget(this, f), e.clear(n, s, a));
    e.setRenderTarget(l);
  }
}
const Yu = new ee(),
  Jx = new ee(),
  ey = new pt();
class Gr {
  constructor(e = new ee(1, 0, 0), n = 0) {
    ((this.isPlane = !0), (this.normal = e), (this.constant = n));
  }
  set(e, n) {
    return (this.normal.copy(e), (this.constant = n), this);
  }
  setComponents(e, n, s, a) {
    return (this.normal.set(e, n, s), (this.constant = a), this);
  }
  setFromNormalAndCoplanarPoint(e, n) {
    return (this.normal.copy(e), (this.constant = -n.dot(this.normal)), this);
  }
  setFromCoplanarPoints(e, n, s) {
    const a = Yu.subVectors(s, n).cross(Jx.subVectors(e, n)).normalize();
    return (this.setFromNormalAndCoplanarPoint(a, e), this);
  }
  copy(e) {
    return (this.normal.copy(e.normal), (this.constant = e.constant), this);
  }
  normalize() {
    const e = 1 / this.normal.length();
    return (this.normal.multiplyScalar(e), (this.constant *= e), this);
  }
  negate() {
    return ((this.constant *= -1), this.normal.negate(), this);
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, n) {
    return n.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, n) {
    const s = e.delta(Yu),
      a = this.normal.dot(s);
    if (a === 0) return this.distanceToPoint(e.start) === 0 ? n.copy(e.start) : null;
    const l = -(e.start.dot(this.normal) + this.constant) / a;
    return l < 0 || l > 1 ? null : n.copy(e.start).addScaledVector(s, l);
  }
  intersectsLine(e) {
    const n = this.distanceToPoint(e.start),
      s = this.distanceToPoint(e.end);
    return (n < 0 && s > 0) || (s < 0 && n > 0);
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, n) {
    const s = n || ey.getNormalMatrix(e),
      a = this.coplanarPoint(Yu).applyMatrix4(e),
      l = this.normal.applyMatrix3(s).normalize();
    return ((this.constant = -a.dot(l)), this);
  }
  translate(e) {
    return ((this.constant -= e.dot(this.normal)), this);
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Hr = new jo(),
  yl = new ee();
class _g {
  constructor(e = new Gr(), n = new Gr(), s = new Gr(), a = new Gr(), l = new Gr(), f = new Gr()) {
    this.planes = [e, n, s, a, l, f];
  }
  set(e, n, s, a, l, f) {
    const u = this.planes;
    return (
      u[0].copy(e), u[1].copy(n), u[2].copy(s), u[3].copy(a), u[4].copy(l), u[5].copy(f), this
    );
  }
  copy(e) {
    const n = this.planes;
    for (let s = 0; s < 6; s++) n[s].copy(e.planes[s]);
    return this;
  }
  setFromProjectionMatrix(e, n = Bi) {
    const s = this.planes,
      a = e.elements,
      l = a[0],
      f = a[1],
      u = a[2],
      h = a[3],
      m = a[4],
      g = a[5],
      v = a[6],
      y = a[7],
      S = a[8],
      T = a[9],
      E = a[10],
      x = a[11],
      _ = a[12],
      D = a[13],
      R = a[14],
      N = a[15];
    if (
      (s[0].setComponents(h - l, y - m, x - S, N - _).normalize(),
      s[1].setComponents(h + l, y + m, x + S, N + _).normalize(),
      s[2].setComponents(h + f, y + g, x + T, N + D).normalize(),
      s[3].setComponents(h - f, y - g, x - T, N - D).normalize(),
      s[4].setComponents(h - u, y - v, x - E, N - R).normalize(),
      n === Bi)
    )
      s[5].setComponents(h + u, y + v, x + E, N + R).normalize();
    else if (n === Ul) s[5].setComponents(u, v, E, R).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + n);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      (e.boundingSphere === null && e.computeBoundingSphere(),
        Hr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld));
    else {
      const n = e.geometry;
      (n.boundingSphere === null && n.computeBoundingSphere(),
        Hr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld));
    }
    return this.intersectsSphere(Hr);
  }
  intersectsSprite(e) {
    return (
      Hr.center.set(0, 0, 0),
      (Hr.radius = 0.7071067811865476),
      Hr.applyMatrix4(e.matrixWorld),
      this.intersectsSphere(Hr)
    );
  }
  intersectsSphere(e) {
    const n = this.planes,
      s = e.center,
      a = -e.radius;
    for (let l = 0; l < 6; l++) if (n[l].distanceToPoint(s) < a) return !1;
    return !0;
  }
  intersectsBox(e) {
    const n = this.planes;
    for (let s = 0; s < 6; s++) {
      const a = n[s];
      if (
        ((yl.x = a.normal.x > 0 ? e.max.x : e.min.x),
        (yl.y = a.normal.y > 0 ? e.max.y : e.min.y),
        (yl.z = a.normal.z > 0 ? e.max.z : e.min.z),
        a.distanceToPoint(yl) < 0)
      )
        return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const n = this.planes;
    for (let s = 0; s < 6; s++) if (n[s].distanceToPoint(e) < 0) return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function vg() {
  let r = null,
    e = !1,
    n = null,
    s = null;
  function a(l, f) {
    (n(l, f), (s = r.requestAnimationFrame(a)));
  }
  return {
    start: function () {
      e !== !0 && n !== null && ((s = r.requestAnimationFrame(a)), (e = !0));
    },
    stop: function () {
      (r.cancelAnimationFrame(s), (e = !1));
    },
    setAnimationLoop: function (l) {
      n = l;
    },
    setContext: function (l) {
      r = l;
    },
  };
}
function ty(r, e) {
  const n = e.isWebGL2,
    s = new WeakMap();
  function a(m, g) {
    const v = m.array,
      y = m.usage,
      S = v.byteLength,
      T = r.createBuffer();
    (r.bindBuffer(g, T), r.bufferData(g, v, y), m.onUploadCallback());
    let E;
    if (v instanceof Float32Array) E = r.FLOAT;
    else if (v instanceof Uint16Array)
      if (m.isFloat16BufferAttribute)
        if (n) E = r.HALF_FLOAT;
        else
          throw new Error(
            "THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.",
          );
      else E = r.UNSIGNED_SHORT;
    else if (v instanceof Int16Array) E = r.SHORT;
    else if (v instanceof Uint32Array) E = r.UNSIGNED_INT;
    else if (v instanceof Int32Array) E = r.INT;
    else if (v instanceof Int8Array) E = r.BYTE;
    else if (v instanceof Uint8Array) E = r.UNSIGNED_BYTE;
    else if (v instanceof Uint8ClampedArray) E = r.UNSIGNED_BYTE;
    else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + v);
    return {
      buffer: T,
      type: E,
      bytesPerElement: v.BYTES_PER_ELEMENT,
      version: m.version,
      size: S,
    };
  }
  function l(m, g, v) {
    const y = g.array,
      S = g._updateRange,
      T = g.updateRanges;
    if (
      (r.bindBuffer(v, m),
      S.count === -1 && T.length === 0 && r.bufferSubData(v, 0, y),
      T.length !== 0)
    ) {
      for (let E = 0, x = T.length; E < x; E++) {
        const _ = T[E];
        n
          ? r.bufferSubData(v, _.start * y.BYTES_PER_ELEMENT, y, _.start, _.count)
          : r.bufferSubData(
              v,
              _.start * y.BYTES_PER_ELEMENT,
              y.subarray(_.start, _.start + _.count),
            );
      }
      g.clearUpdateRanges();
    }
    (S.count !== -1 &&
      (n
        ? r.bufferSubData(v, S.offset * y.BYTES_PER_ELEMENT, y, S.offset, S.count)
        : r.bufferSubData(
            v,
            S.offset * y.BYTES_PER_ELEMENT,
            y.subarray(S.offset, S.offset + S.count),
          ),
      (S.count = -1)),
      g.onUploadCallback());
  }
  function f(m) {
    return (m.isInterleavedBufferAttribute && (m = m.data), s.get(m));
  }
  function u(m) {
    m.isInterleavedBufferAttribute && (m = m.data);
    const g = s.get(m);
    g && (r.deleteBuffer(g.buffer), s.delete(m));
  }
  function h(m, g) {
    if (m.isGLBufferAttribute) {
      const y = s.get(m);
      (!y || y.version < m.version) &&
        s.set(m, {
          buffer: m.buffer,
          type: m.type,
          bytesPerElement: m.elementSize,
          version: m.version,
        });
      return;
    }
    m.isInterleavedBufferAttribute && (m = m.data);
    const v = s.get(m);
    if (v === void 0) s.set(m, a(m, g));
    else if (v.version < m.version) {
      if (v.size !== m.array.byteLength)
        throw new Error(
          "THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.",
        );
      (l(v.buffer, m, g), (v.version = m.version));
    }
  }
  return { get: f, remove: u, update: h };
}
class Ef extends ti {
  constructor(e = 1, n = 1, s = 1, a = 1) {
    (super(),
      (this.type = "PlaneGeometry"),
      (this.parameters = { width: e, height: n, widthSegments: s, heightSegments: a }));
    const l = e / 2,
      f = n / 2,
      u = Math.floor(s),
      h = Math.floor(a),
      m = u + 1,
      g = h + 1,
      v = e / u,
      y = n / h,
      S = [],
      T = [],
      E = [],
      x = [];
    for (let _ = 0; _ < g; _++) {
      const D = _ * y - f;
      for (let R = 0; R < m; R++) {
        const N = R * v - l;
        (T.push(N, -D, 0), E.push(0, 0, 1), x.push(R / u), x.push(1 - _ / h));
      }
    }
    for (let _ = 0; _ < h; _++)
      for (let D = 0; D < u; D++) {
        const R = D + m * _,
          N = D + m * (_ + 1),
          z = D + 1 + m * (_ + 1),
          I = D + 1 + m * _;
        (S.push(R, N, I), S.push(N, z, I));
      }
    (this.setIndex(S),
      this.setAttribute("position", new pi(T, 3)),
      this.setAttribute("normal", new pi(E, 3)),
      this.setAttribute("uv", new pi(x, 2)));
  }
  copy(e) {
    return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
  }
  static fromJSON(e) {
    return new Ef(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
var ny = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,
  iy = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,
  ry = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,
  sy = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  oy = `#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,
  ay = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
  ly = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
  cy = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
  uy = `#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,
  fy = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,
  dy = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,
  hy = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
  py = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,
  my = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,
  gy = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,
  _y = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,
  vy = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,
  xy = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,
  yy = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,
  Sy = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,
  My = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,
  Ey = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,
  Ty = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,
  wy = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,
  Ay = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,
  Ry = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,
  Cy = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,
  by = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,
  Py = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,
  Ly = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,
  Dy = "gl_FragColor = linearToOutputTexel( gl_FragColor );",
  Ny = `
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,
  Uy = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,
  Iy = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,
  Fy = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,
  Oy = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,
  ky = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,
  zy = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,
  By = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`,
  Hy = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,
  Gy = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,
  Vy = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,
  Wy = `#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,
  Xy = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,
  jy = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,
  qy = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,
  Yy = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,
  $y = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,
  Ky = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,
  Zy = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,
  Qy = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,
  Jy = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,
  eS = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,
  tS = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,
  nS = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,
  iS = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,
  rS = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,
  sS = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,
  oS = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  aS = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,
  lS = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,
  cS = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,
  uS = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`,
  fS = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,
  dS = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  hS = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,
  pS = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,
  mS = `#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,
  gS = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,
  _S = `#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,
  vS = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,
  xS = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,
  yS = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,
  SS = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  MS = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  ES = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,
  TS = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,
  wS = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,
  AS = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,
  RS = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,
  CS = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,
  bS = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
  PS = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,
  LS = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,
  DS = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,
  NS = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,
  US = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,
  IS = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,
  FS = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,
  OS = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,
  kS = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,
  zS = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,
  BS = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,
  HS = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,
  GS = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,
  VS = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,
  WS = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,
  XS = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,
  jS = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,
  qS = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,
  YS = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,
  $S = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,
  KS = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,
  ZS = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  QS = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  JS = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,
  eM = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const tM = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,
  nM = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  iM = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  rM = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  sM = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  oM = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  aM = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,
  lM = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,
  cM = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,
  uM = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,
  fM = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,
  dM = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  hM = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  pM = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  mM = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,
  gM = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  _M = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  vM = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  xM = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,
  yM = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  SM = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,
  MM = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,
  EM = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  TM = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  wM = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,
  AM = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  RM = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  CM = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  bM = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,
  PM = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  LM = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  DM = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
  NM = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  UM = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
  ft = {
    alphahash_fragment: ny,
    alphahash_pars_fragment: iy,
    alphamap_fragment: ry,
    alphamap_pars_fragment: sy,
    alphatest_fragment: oy,
    alphatest_pars_fragment: ay,
    aomap_fragment: ly,
    aomap_pars_fragment: cy,
    batching_pars_vertex: uy,
    batching_vertex: fy,
    begin_vertex: dy,
    beginnormal_vertex: hy,
    bsdfs: py,
    iridescence_fragment: my,
    bumpmap_pars_fragment: gy,
    clipping_planes_fragment: _y,
    clipping_planes_pars_fragment: vy,
    clipping_planes_pars_vertex: xy,
    clipping_planes_vertex: yy,
    color_fragment: Sy,
    color_pars_fragment: My,
    color_pars_vertex: Ey,
    color_vertex: Ty,
    common: wy,
    cube_uv_reflection_fragment: Ay,
    defaultnormal_vertex: Ry,
    displacementmap_pars_vertex: Cy,
    displacementmap_vertex: by,
    emissivemap_fragment: Py,
    emissivemap_pars_fragment: Ly,
    colorspace_fragment: Dy,
    colorspace_pars_fragment: Ny,
    envmap_fragment: Uy,
    envmap_common_pars_fragment: Iy,
    envmap_pars_fragment: Fy,
    envmap_pars_vertex: Oy,
    envmap_physical_pars_fragment: $y,
    envmap_vertex: ky,
    fog_vertex: zy,
    fog_pars_vertex: By,
    fog_fragment: Hy,
    fog_pars_fragment: Gy,
    gradientmap_pars_fragment: Vy,
    lightmap_fragment: Wy,
    lightmap_pars_fragment: Xy,
    lights_lambert_fragment: jy,
    lights_lambert_pars_fragment: qy,
    lights_pars_begin: Yy,
    lights_toon_fragment: Ky,
    lights_toon_pars_fragment: Zy,
    lights_phong_fragment: Qy,
    lights_phong_pars_fragment: Jy,
    lights_physical_fragment: eS,
    lights_physical_pars_fragment: tS,
    lights_fragment_begin: nS,
    lights_fragment_maps: iS,
    lights_fragment_end: rS,
    logdepthbuf_fragment: sS,
    logdepthbuf_pars_fragment: oS,
    logdepthbuf_pars_vertex: aS,
    logdepthbuf_vertex: lS,
    map_fragment: cS,
    map_pars_fragment: uS,
    map_particle_fragment: fS,
    map_particle_pars_fragment: dS,
    metalnessmap_fragment: hS,
    metalnessmap_pars_fragment: pS,
    morphcolor_vertex: mS,
    morphnormal_vertex: gS,
    morphtarget_pars_vertex: _S,
    morphtarget_vertex: vS,
    normal_fragment_begin: xS,
    normal_fragment_maps: yS,
    normal_pars_fragment: SS,
    normal_pars_vertex: MS,
    normal_vertex: ES,
    normalmap_pars_fragment: TS,
    clearcoat_normal_fragment_begin: wS,
    clearcoat_normal_fragment_maps: AS,
    clearcoat_pars_fragment: RS,
    iridescence_pars_fragment: CS,
    opaque_fragment: bS,
    packing: PS,
    premultiplied_alpha_fragment: LS,
    project_vertex: DS,
    dithering_fragment: NS,
    dithering_pars_fragment: US,
    roughnessmap_fragment: IS,
    roughnessmap_pars_fragment: FS,
    shadowmap_pars_fragment: OS,
    shadowmap_pars_vertex: kS,
    shadowmap_vertex: zS,
    shadowmask_pars_fragment: BS,
    skinbase_vertex: HS,
    skinning_pars_vertex: GS,
    skinning_vertex: VS,
    skinnormal_vertex: WS,
    specularmap_fragment: XS,
    specularmap_pars_fragment: jS,
    tonemapping_fragment: qS,
    tonemapping_pars_fragment: YS,
    transmission_fragment: $S,
    transmission_pars_fragment: KS,
    uv_pars_fragment: ZS,
    uv_pars_vertex: QS,
    uv_vertex: JS,
    worldpos_vertex: eM,
    background_vert: tM,
    background_frag: nM,
    backgroundCube_vert: iM,
    backgroundCube_frag: rM,
    cube_vert: sM,
    cube_frag: oM,
    depth_vert: aM,
    depth_frag: lM,
    distanceRGBA_vert: cM,
    distanceRGBA_frag: uM,
    equirect_vert: fM,
    equirect_frag: dM,
    linedashed_vert: hM,
    linedashed_frag: pM,
    meshbasic_vert: mM,
    meshbasic_frag: gM,
    meshlambert_vert: _M,
    meshlambert_frag: vM,
    meshmatcap_vert: xM,
    meshmatcap_frag: yM,
    meshnormal_vert: SM,
    meshnormal_frag: MM,
    meshphong_vert: EM,
    meshphong_frag: TM,
    meshphysical_vert: wM,
    meshphysical_frag: AM,
    meshtoon_vert: RM,
    meshtoon_frag: CM,
    points_vert: bM,
    points_frag: PM,
    shadow_vert: LM,
    shadow_frag: DM,
    sprite_vert: NM,
    sprite_frag: UM,
  },
  Ce = {
    common: {
      diffuse: { value: new Mt(16777215) },
      opacity: { value: 1 },
      map: { value: null },
      mapTransform: { value: new pt() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new pt() },
      alphaTest: { value: 0 },
    },
    specularmap: { specularMap: { value: null }, specularMapTransform: { value: new pt() } },
    envmap: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      reflectivity: { value: 1 },
      ior: { value: 1.5 },
      refractionRatio: { value: 0.98 },
    },
    aomap: {
      aoMap: { value: null },
      aoMapIntensity: { value: 1 },
      aoMapTransform: { value: new pt() },
    },
    lightmap: {
      lightMap: { value: null },
      lightMapIntensity: { value: 1 },
      lightMapTransform: { value: new pt() },
    },
    bumpmap: {
      bumpMap: { value: null },
      bumpMapTransform: { value: new pt() },
      bumpScale: { value: 1 },
    },
    normalmap: {
      normalMap: { value: null },
      normalMapTransform: { value: new pt() },
      normalScale: { value: new Rt(1, 1) },
    },
    displacementmap: {
      displacementMap: { value: null },
      displacementMapTransform: { value: new pt() },
      displacementScale: { value: 1 },
      displacementBias: { value: 0 },
    },
    emissivemap: { emissiveMap: { value: null }, emissiveMapTransform: { value: new pt() } },
    metalnessmap: { metalnessMap: { value: null }, metalnessMapTransform: { value: new pt() } },
    roughnessmap: { roughnessMap: { value: null }, roughnessMapTransform: { value: new pt() } },
    gradientmap: { gradientMap: { value: null } },
    fog: {
      fogDensity: { value: 25e-5 },
      fogNear: { value: 1 },
      fogFar: { value: 2e3 },
      fogColor: { value: new Mt(16777215) },
    },
    lights: {
      ambientLightColor: { value: [] },
      lightProbe: { value: [] },
      directionalLights: { value: [], properties: { direction: {}, color: {} } },
      directionalLightShadows: {
        value: [],
        properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} },
      },
      directionalShadowMap: { value: [] },
      directionalShadowMatrix: { value: [] },
      spotLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          direction: {},
          distance: {},
          coneCos: {},
          penumbraCos: {},
          decay: {},
        },
      },
      spotLightShadows: {
        value: [],
        properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} },
      },
      spotLightMap: { value: [] },
      spotShadowMap: { value: [] },
      spotLightMatrix: { value: [] },
      pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } },
      pointLightShadows: {
        value: [],
        properties: {
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
          shadowCameraNear: {},
          shadowCameraFar: {},
        },
      },
      pointShadowMap: { value: [] },
      pointShadowMatrix: { value: [] },
      hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } },
      rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } },
      ltc_1: { value: null },
      ltc_2: { value: null },
    },
    points: {
      diffuse: { value: new Mt(16777215) },
      opacity: { value: 1 },
      size: { value: 1 },
      scale: { value: 1 },
      map: { value: null },
      alphaMap: { value: null },
      alphaMapTransform: { value: new pt() },
      alphaTest: { value: 0 },
      uvTransform: { value: new pt() },
    },
    sprite: {
      diffuse: { value: new Mt(16777215) },
      opacity: { value: 1 },
      center: { value: new Rt(0.5, 0.5) },
      rotation: { value: 0 },
      map: { value: null },
      mapTransform: { value: new pt() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new pt() },
      alphaTest: { value: 0 },
    },
  },
  yi = {
    basic: {
      uniforms: Mn([Ce.common, Ce.specularmap, Ce.envmap, Ce.aomap, Ce.lightmap, Ce.fog]),
      vertexShader: ft.meshbasic_vert,
      fragmentShader: ft.meshbasic_frag,
    },
    lambert: {
      uniforms: Mn([
        Ce.common,
        Ce.specularmap,
        Ce.envmap,
        Ce.aomap,
        Ce.lightmap,
        Ce.emissivemap,
        Ce.bumpmap,
        Ce.normalmap,
        Ce.displacementmap,
        Ce.fog,
        Ce.lights,
        { emissive: { value: new Mt(0) } },
      ]),
      vertexShader: ft.meshlambert_vert,
      fragmentShader: ft.meshlambert_frag,
    },
    phong: {
      uniforms: Mn([
        Ce.common,
        Ce.specularmap,
        Ce.envmap,
        Ce.aomap,
        Ce.lightmap,
        Ce.emissivemap,
        Ce.bumpmap,
        Ce.normalmap,
        Ce.displacementmap,
        Ce.fog,
        Ce.lights,
        {
          emissive: { value: new Mt(0) },
          specular: { value: new Mt(1118481) },
          shininess: { value: 30 },
        },
      ]),
      vertexShader: ft.meshphong_vert,
      fragmentShader: ft.meshphong_frag,
    },
    standard: {
      uniforms: Mn([
        Ce.common,
        Ce.envmap,
        Ce.aomap,
        Ce.lightmap,
        Ce.emissivemap,
        Ce.bumpmap,
        Ce.normalmap,
        Ce.displacementmap,
        Ce.roughnessmap,
        Ce.metalnessmap,
        Ce.fog,
        Ce.lights,
        {
          emissive: { value: new Mt(0) },
          roughness: { value: 1 },
          metalness: { value: 0 },
          envMapIntensity: { value: 1 },
        },
      ]),
      vertexShader: ft.meshphysical_vert,
      fragmentShader: ft.meshphysical_frag,
    },
    toon: {
      uniforms: Mn([
        Ce.common,
        Ce.aomap,
        Ce.lightmap,
        Ce.emissivemap,
        Ce.bumpmap,
        Ce.normalmap,
        Ce.displacementmap,
        Ce.gradientmap,
        Ce.fog,
        Ce.lights,
        { emissive: { value: new Mt(0) } },
      ]),
      vertexShader: ft.meshtoon_vert,
      fragmentShader: ft.meshtoon_frag,
    },
    matcap: {
      uniforms: Mn([
        Ce.common,
        Ce.bumpmap,
        Ce.normalmap,
        Ce.displacementmap,
        Ce.fog,
        { matcap: { value: null } },
      ]),
      vertexShader: ft.meshmatcap_vert,
      fragmentShader: ft.meshmatcap_frag,
    },
    points: {
      uniforms: Mn([Ce.points, Ce.fog]),
      vertexShader: ft.points_vert,
      fragmentShader: ft.points_frag,
    },
    dashed: {
      uniforms: Mn([
        Ce.common,
        Ce.fog,
        { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } },
      ]),
      vertexShader: ft.linedashed_vert,
      fragmentShader: ft.linedashed_frag,
    },
    depth: {
      uniforms: Mn([Ce.common, Ce.displacementmap]),
      vertexShader: ft.depth_vert,
      fragmentShader: ft.depth_frag,
    },
    normal: {
      uniforms: Mn([
        Ce.common,
        Ce.bumpmap,
        Ce.normalmap,
        Ce.displacementmap,
        { opacity: { value: 1 } },
      ]),
      vertexShader: ft.meshnormal_vert,
      fragmentShader: ft.meshnormal_frag,
    },
    sprite: {
      uniforms: Mn([Ce.sprite, Ce.fog]),
      vertexShader: ft.sprite_vert,
      fragmentShader: ft.sprite_frag,
    },
    background: {
      uniforms: {
        uvTransform: { value: new pt() },
        t2D: { value: null },
        backgroundIntensity: { value: 1 },
      },
      vertexShader: ft.background_vert,
      fragmentShader: ft.background_frag,
    },
    backgroundCube: {
      uniforms: {
        envMap: { value: null },
        flipEnvMap: { value: -1 },
        backgroundBlurriness: { value: 0 },
        backgroundIntensity: { value: 1 },
      },
      vertexShader: ft.backgroundCube_vert,
      fragmentShader: ft.backgroundCube_frag,
    },
    cube: {
      uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } },
      vertexShader: ft.cube_vert,
      fragmentShader: ft.cube_frag,
    },
    equirect: {
      uniforms: { tEquirect: { value: null } },
      vertexShader: ft.equirect_vert,
      fragmentShader: ft.equirect_frag,
    },
    distanceRGBA: {
      uniforms: Mn([
        Ce.common,
        Ce.displacementmap,
        {
          referencePosition: { value: new ee() },
          nearDistance: { value: 1 },
          farDistance: { value: 1e3 },
        },
      ]),
      vertexShader: ft.distanceRGBA_vert,
      fragmentShader: ft.distanceRGBA_frag,
    },
    shadow: {
      uniforms: Mn([Ce.lights, Ce.fog, { color: { value: new Mt(0) }, opacity: { value: 1 } }]),
      vertexShader: ft.shadow_vert,
      fragmentShader: ft.shadow_frag,
    },
  };
yi.physical = {
  uniforms: Mn([
    yi.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: new pt() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: new pt() },
      clearcoatNormalScale: { value: new Rt(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: new pt() },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: new pt() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: new pt() },
      sheen: { value: 0 },
      sheenColor: { value: new Mt(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: new pt() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: new pt() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: new pt() },
      transmissionSamplerSize: { value: new Rt() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: new pt() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: new Mt(0) },
      specularColor: { value: new Mt(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: new pt() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: new pt() },
      anisotropyVector: { value: new Rt() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: new pt() },
    },
  ]),
  vertexShader: ft.meshphysical_vert,
  fragmentShader: ft.meshphysical_frag,
};
const Sl = { r: 0, b: 0, g: 0 };
function IM(r, e, n, s, a, l, f) {
  const u = new Mt(0);
  let h = l === !0 ? 0 : 1,
    m,
    g,
    v = null,
    y = 0,
    S = null;
  function T(x, _) {
    let D = !1,
      R = _.isScene === !0 ? _.background : null;
    (R && R.isTexture && (R = (_.backgroundBlurriness > 0 ? n : e).get(R)),
      R === null ? E(u, h) : R && R.isColor && (E(R, 1), (D = !0)));
    const N = r.xr.getEnvironmentBlendMode();
    (N === "additive"
      ? s.buffers.color.setClear(0, 0, 0, 1, f)
      : N === "alpha-blend" && s.buffers.color.setClear(0, 0, 0, 0, f),
      (r.autoClear || D) && r.clear(r.autoClearColor, r.autoClearDepth, r.autoClearStencil),
      R && (R.isCubeTexture || R.mapping === Ol)
        ? (g === void 0 &&
            ((g = new Hi(
              new qo(1, 1, 1),
              new Kr({
                name: "BackgroundCubeMaterial",
                uniforms: Xs(yi.backgroundCube.uniforms),
                vertexShader: yi.backgroundCube.vertexShader,
                fragmentShader: yi.backgroundCube.fragmentShader,
                side: Un,
                depthTest: !1,
                depthWrite: !1,
                fog: !1,
              }),
            )),
            g.geometry.deleteAttribute("normal"),
            g.geometry.deleteAttribute("uv"),
            (g.onBeforeRender = function (z, I, F) {
              this.matrixWorld.copyPosition(F.matrixWorld);
            }),
            Object.defineProperty(g.material, "envMap", {
              get: function () {
                return this.uniforms.envMap.value;
              },
            }),
            a.update(g)),
          (g.material.uniforms.envMap.value = R),
          (g.material.uniforms.flipEnvMap.value =
            R.isCubeTexture && R.isRenderTargetTexture === !1 ? -1 : 1),
          (g.material.uniforms.backgroundBlurriness.value = _.backgroundBlurriness),
          (g.material.uniforms.backgroundIntensity.value = _.backgroundIntensity),
          (g.material.toneMapped = At.getTransfer(R.colorSpace) !== It),
          (v !== R || y !== R.version || S !== r.toneMapping) &&
            ((g.material.needsUpdate = !0), (v = R), (y = R.version), (S = r.toneMapping)),
          g.layers.enableAll(),
          x.unshift(g, g.geometry, g.material, 0, 0, null))
        : R &&
          R.isTexture &&
          (m === void 0 &&
            ((m = new Hi(
              new Ef(2, 2),
              new Kr({
                name: "BackgroundMaterial",
                uniforms: Xs(yi.background.uniforms),
                vertexShader: yi.background.vertexShader,
                fragmentShader: yi.background.fragmentShader,
                side: Mr,
                depthTest: !1,
                depthWrite: !1,
                fog: !1,
              }),
            )),
            m.geometry.deleteAttribute("normal"),
            Object.defineProperty(m.material, "map", {
              get: function () {
                return this.uniforms.t2D.value;
              },
            }),
            a.update(m)),
          (m.material.uniforms.t2D.value = R),
          (m.material.uniforms.backgroundIntensity.value = _.backgroundIntensity),
          (m.material.toneMapped = At.getTransfer(R.colorSpace) !== It),
          R.matrixAutoUpdate === !0 && R.updateMatrix(),
          m.material.uniforms.uvTransform.value.copy(R.matrix),
          (v !== R || y !== R.version || S !== r.toneMapping) &&
            ((m.material.needsUpdate = !0), (v = R), (y = R.version), (S = r.toneMapping)),
          m.layers.enableAll(),
          x.unshift(m, m.geometry, m.material, 0, 0, null)));
  }
  function E(x, _) {
    (x.getRGB(Sl, pg(r)), s.buffers.color.setClear(Sl.r, Sl.g, Sl.b, _, f));
  }
  return {
    getClearColor: function () {
      return u;
    },
    setClearColor: function (x, _ = 1) {
      (u.set(x), (h = _), E(u, h));
    },
    getClearAlpha: function () {
      return h;
    },
    setClearAlpha: function (x) {
      ((h = x), E(u, h));
    },
    render: T,
  };
}
function FM(r, e, n, s) {
  const a = r.getParameter(r.MAX_VERTEX_ATTRIBS),
    l = s.isWebGL2 ? null : e.get("OES_vertex_array_object"),
    f = s.isWebGL2 || l !== null,
    u = {},
    h = x(null);
  let m = h,
    g = !1;
  function v(H, J, ie, ue, V) {
    let K = !1;
    if (f) {
      const j = E(ue, ie, J);
      (m !== j && ((m = j), S(m.object)), (K = _(H, ue, ie, V)), K && D(H, ue, ie, V));
    } else {
      const j = J.wireframe === !0;
      (m.geometry !== ue.id || m.program !== ie.id || m.wireframe !== j) &&
        ((m.geometry = ue.id), (m.program = ie.id), (m.wireframe = j), (K = !0));
    }
    (V !== null && n.update(V, r.ELEMENT_ARRAY_BUFFER),
      (K || g) &&
        ((g = !1),
        X(H, J, ie, ue),
        V !== null && r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, n.get(V).buffer)));
  }
  function y() {
    return s.isWebGL2 ? r.createVertexArray() : l.createVertexArrayOES();
  }
  function S(H) {
    return s.isWebGL2 ? r.bindVertexArray(H) : l.bindVertexArrayOES(H);
  }
  function T(H) {
    return s.isWebGL2 ? r.deleteVertexArray(H) : l.deleteVertexArrayOES(H);
  }
  function E(H, J, ie) {
    const ue = ie.wireframe === !0;
    let V = u[H.id];
    V === void 0 && ((V = {}), (u[H.id] = V));
    let K = V[J.id];
    K === void 0 && ((K = {}), (V[J.id] = K));
    let j = K[ue];
    return (j === void 0 && ((j = x(y())), (K[ue] = j)), j);
  }
  function x(H) {
    const J = [],
      ie = [],
      ue = [];
    for (let V = 0; V < a; V++) ((J[V] = 0), (ie[V] = 0), (ue[V] = 0));
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: J,
      enabledAttributes: ie,
      attributeDivisors: ue,
      object: H,
      attributes: {},
      index: null,
    };
  }
  function _(H, J, ie, ue) {
    const V = m.attributes,
      K = J.attributes;
    let j = 0;
    const L = ie.getAttributes();
    for (const W in L)
      if (L[W].location >= 0) {
        const ce = V[W];
        let me = K[W];
        if (
          (me === void 0 &&
            (W === "instanceMatrix" && H.instanceMatrix && (me = H.instanceMatrix),
            W === "instanceColor" && H.instanceColor && (me = H.instanceColor)),
          ce === void 0 || ce.attribute !== me || (me && ce.data !== me.data))
        )
          return !0;
        j++;
      }
    return m.attributesNum !== j || m.index !== ue;
  }
  function D(H, J, ie, ue) {
    const V = {},
      K = J.attributes;
    let j = 0;
    const L = ie.getAttributes();
    for (const W in L)
      if (L[W].location >= 0) {
        let ce = K[W];
        ce === void 0 &&
          (W === "instanceMatrix" && H.instanceMatrix && (ce = H.instanceMatrix),
          W === "instanceColor" && H.instanceColor && (ce = H.instanceColor));
        const me = {};
        ((me.attribute = ce), ce && ce.data && (me.data = ce.data), (V[W] = me), j++);
      }
    ((m.attributes = V), (m.attributesNum = j), (m.index = ue));
  }
  function R() {
    const H = m.newAttributes;
    for (let J = 0, ie = H.length; J < ie; J++) H[J] = 0;
  }
  function N(H) {
    z(H, 0);
  }
  function z(H, J) {
    const ie = m.newAttributes,
      ue = m.enabledAttributes,
      V = m.attributeDivisors;
    ((ie[H] = 1),
      ue[H] === 0 && (r.enableVertexAttribArray(H), (ue[H] = 1)),
      V[H] !== J &&
        ((s.isWebGL2 ? r : e.get("ANGLE_instanced_arrays"))[
          s.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"
        ](H, J),
        (V[H] = J)));
  }
  function I() {
    const H = m.newAttributes,
      J = m.enabledAttributes;
    for (let ie = 0, ue = J.length; ie < ue; ie++)
      J[ie] !== H[ie] && (r.disableVertexAttribArray(ie), (J[ie] = 0));
  }
  function F(H, J, ie, ue, V, K, j) {
    j === !0 ? r.vertexAttribIPointer(H, J, ie, V, K) : r.vertexAttribPointer(H, J, ie, ue, V, K);
  }
  function X(H, J, ie, ue) {
    if (
      s.isWebGL2 === !1 &&
      (H.isInstancedMesh || ue.isInstancedBufferGeometry) &&
      e.get("ANGLE_instanced_arrays") === null
    )
      return;
    R();
    const V = ue.attributes,
      K = ie.getAttributes(),
      j = J.defaultAttributeValues;
    for (const L in K) {
      const W = K[L];
      if (W.location >= 0) {
        let q = V[L];
        if (
          (q === void 0 &&
            (L === "instanceMatrix" && H.instanceMatrix && (q = H.instanceMatrix),
            L === "instanceColor" && H.instanceColor && (q = H.instanceColor)),
          q !== void 0)
        ) {
          const ce = q.normalized,
            me = q.itemSize,
            Te = n.get(q);
          if (Te === void 0) continue;
          const Me = Te.buffer,
            Pe = Te.type,
            Ue = Te.bytesPerElement,
            Z = s.isWebGL2 === !0 && (Pe === r.INT || Pe === r.UNSIGNED_INT || q.gpuType === Zm);
          if (q.isInterleavedBufferAttribute) {
            const fe = q.data,
              B = fe.stride,
              ze = q.offset;
            if (fe.isInstancedInterleavedBuffer) {
              for (let he = 0; he < W.locationSize; he++) z(W.location + he, fe.meshPerAttribute);
              H.isInstancedMesh !== !0 &&
                ue._maxInstanceCount === void 0 &&
                (ue._maxInstanceCount = fe.meshPerAttribute * fe.count);
            } else for (let he = 0; he < W.locationSize; he++) N(W.location + he);
            r.bindBuffer(r.ARRAY_BUFFER, Me);
            for (let he = 0; he < W.locationSize; he++)
              F(
                W.location + he,
                me / W.locationSize,
                Pe,
                ce,
                B * Ue,
                (ze + (me / W.locationSize) * he) * Ue,
                Z,
              );
          } else {
            if (q.isInstancedBufferAttribute) {
              for (let fe = 0; fe < W.locationSize; fe++) z(W.location + fe, q.meshPerAttribute);
              H.isInstancedMesh !== !0 &&
                ue._maxInstanceCount === void 0 &&
                (ue._maxInstanceCount = q.meshPerAttribute * q.count);
            } else for (let fe = 0; fe < W.locationSize; fe++) N(W.location + fe);
            r.bindBuffer(r.ARRAY_BUFFER, Me);
            for (let fe = 0; fe < W.locationSize; fe++)
              F(
                W.location + fe,
                me / W.locationSize,
                Pe,
                ce,
                me * Ue,
                (me / W.locationSize) * fe * Ue,
                Z,
              );
          }
        } else if (j !== void 0) {
          const ce = j[L];
          if (ce !== void 0)
            switch (ce.length) {
              case 2:
                r.vertexAttrib2fv(W.location, ce);
                break;
              case 3:
                r.vertexAttrib3fv(W.location, ce);
                break;
              case 4:
                r.vertexAttrib4fv(W.location, ce);
                break;
              default:
                r.vertexAttrib1fv(W.location, ce);
            }
        }
      }
    }
    I();
  }
  function A() {
    ne();
    for (const H in u) {
      const J = u[H];
      for (const ie in J) {
        const ue = J[ie];
        for (const V in ue) (T(ue[V].object), delete ue[V]);
        delete J[ie];
      }
      delete u[H];
    }
  }
  function b(H) {
    if (u[H.id] === void 0) return;
    const J = u[H.id];
    for (const ie in J) {
      const ue = J[ie];
      for (const V in ue) (T(ue[V].object), delete ue[V]);
      delete J[ie];
    }
    delete u[H.id];
  }
  function le(H) {
    for (const J in u) {
      const ie = u[J];
      if (ie[H.id] === void 0) continue;
      const ue = ie[H.id];
      for (const V in ue) (T(ue[V].object), delete ue[V]);
      delete ie[H.id];
    }
  }
  function ne() {
    (pe(), (g = !0), m !== h && ((m = h), S(m.object)));
  }
  function pe() {
    ((h.geometry = null), (h.program = null), (h.wireframe = !1));
  }
  return {
    setup: v,
    reset: ne,
    resetDefaultState: pe,
    dispose: A,
    releaseStatesOfGeometry: b,
    releaseStatesOfProgram: le,
    initAttributes: R,
    enableAttribute: N,
    disableUnusedAttributes: I,
  };
}
function OM(r, e, n, s) {
  const a = s.isWebGL2;
  let l;
  function f(g) {
    l = g;
  }
  function u(g, v) {
    (r.drawArrays(l, g, v), n.update(v, l, 1));
  }
  function h(g, v, y) {
    if (y === 0) return;
    let S, T;
    if (a) ((S = r), (T = "drawArraysInstanced"));
    else if (
      ((S = e.get("ANGLE_instanced_arrays")), (T = "drawArraysInstancedANGLE"), S === null)
    ) {
      console.error(
        "THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.",
      );
      return;
    }
    (S[T](l, g, v, y), n.update(v, l, y));
  }
  function m(g, v, y) {
    if (y === 0) return;
    const S = e.get("WEBGL_multi_draw");
    if (S === null) for (let T = 0; T < y; T++) this.render(g[T], v[T]);
    else {
      S.multiDrawArraysWEBGL(l, g, 0, v, 0, y);
      let T = 0;
      for (let E = 0; E < y; E++) T += v[E];
      n.update(T, l, 1);
    }
  }
  ((this.setMode = f), (this.render = u), (this.renderInstances = h), (this.renderMultiDraw = m));
}
function kM(r, e, n) {
  let s;
  function a() {
    if (s !== void 0) return s;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const F = e.get("EXT_texture_filter_anisotropic");
      s = r.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else s = 0;
    return s;
  }
  function l(F) {
    if (F === "highp") {
      if (
        r.getShaderPrecisionFormat(r.VERTEX_SHADER, r.HIGH_FLOAT).precision > 0 &&
        r.getShaderPrecisionFormat(r.FRAGMENT_SHADER, r.HIGH_FLOAT).precision > 0
      )
        return "highp";
      F = "mediump";
    }
    return F === "mediump" &&
      r.getShaderPrecisionFormat(r.VERTEX_SHADER, r.MEDIUM_FLOAT).precision > 0 &&
      r.getShaderPrecisionFormat(r.FRAGMENT_SHADER, r.MEDIUM_FLOAT).precision > 0
      ? "mediump"
      : "lowp";
  }
  const f = typeof WebGL2RenderingContext < "u" && r.constructor.name === "WebGL2RenderingContext";
  let u = n.precision !== void 0 ? n.precision : "highp";
  const h = l(u);
  h !== u &&
    (console.warn("THREE.WebGLRenderer:", u, "not supported, using", h, "instead."), (u = h));
  const m = f || e.has("WEBGL_draw_buffers"),
    g = n.logarithmicDepthBuffer === !0,
    v = r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),
    y = r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
    S = r.getParameter(r.MAX_TEXTURE_SIZE),
    T = r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),
    E = r.getParameter(r.MAX_VERTEX_ATTRIBS),
    x = r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),
    _ = r.getParameter(r.MAX_VARYING_VECTORS),
    D = r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),
    R = y > 0,
    N = f || e.has("OES_texture_float"),
    z = R && N,
    I = f ? r.getParameter(r.MAX_SAMPLES) : 0;
  return {
    isWebGL2: f,
    drawBuffers: m,
    getMaxAnisotropy: a,
    getMaxPrecision: l,
    precision: u,
    logarithmicDepthBuffer: g,
    maxTextures: v,
    maxVertexTextures: y,
    maxTextureSize: S,
    maxCubemapSize: T,
    maxAttributes: E,
    maxVertexUniforms: x,
    maxVaryings: _,
    maxFragmentUniforms: D,
    vertexTextures: R,
    floatFragmentTextures: N,
    floatVertexTextures: z,
    maxSamples: I,
  };
}
function zM(r) {
  const e = this;
  let n = null,
    s = 0,
    a = !1,
    l = !1;
  const f = new Gr(),
    u = new pt(),
    h = { value: null, needsUpdate: !1 };
  ((this.uniform = h),
    (this.numPlanes = 0),
    (this.numIntersection = 0),
    (this.init = function (v, y) {
      const S = v.length !== 0 || y || s !== 0 || a;
      return ((a = y), (s = v.length), S);
    }),
    (this.beginShadows = function () {
      ((l = !0), g(null));
    }),
    (this.endShadows = function () {
      l = !1;
    }),
    (this.setGlobalState = function (v, y) {
      n = g(v, y, 0);
    }),
    (this.setState = function (v, y, S) {
      const T = v.clippingPlanes,
        E = v.clipIntersection,
        x = v.clipShadows,
        _ = r.get(v);
      if (!a || T === null || T.length === 0 || (l && !x)) l ? g(null) : m();
      else {
        const D = l ? 0 : s,
          R = D * 4;
        let N = _.clippingState || null;
        ((h.value = N), (N = g(T, y, R, S)));
        for (let z = 0; z !== R; ++z) N[z] = n[z];
        ((_.clippingState = N),
          (this.numIntersection = E ? this.numPlanes : 0),
          (this.numPlanes += D));
      }
    }));
  function m() {
    (h.value !== n && ((h.value = n), (h.needsUpdate = s > 0)),
      (e.numPlanes = s),
      (e.numIntersection = 0));
  }
  function g(v, y, S, T) {
    const E = v !== null ? v.length : 0;
    let x = null;
    if (E !== 0) {
      if (((x = h.value), T !== !0 || x === null)) {
        const _ = S + E * 4,
          D = y.matrixWorldInverse;
        (u.getNormalMatrix(D), (x === null || x.length < _) && (x = new Float32Array(_)));
        for (let R = 0, N = S; R !== E; ++R, N += 4)
          (f.copy(v[R]).applyMatrix4(D, u), f.normal.toArray(x, N), (x[N + 3] = f.constant));
      }
      ((h.value = x), (h.needsUpdate = !0));
    }
    return ((e.numPlanes = E), (e.numIntersection = 0), x);
  }
}
function BM(r) {
  let e = new WeakMap();
  function n(f, u) {
    return (u === af ? (f.mapping = Gs) : u === lf && (f.mapping = Vs), f);
  }
  function s(f) {
    if (f && f.isTexture) {
      const u = f.mapping;
      if (u === af || u === lf)
        if (e.has(f)) {
          const h = e.get(f).texture;
          return n(h, f.mapping);
        } else {
          const h = f.image;
          if (h && h.height > 0) {
            const m = new Qx(h.height / 2);
            return (
              m.fromEquirectangularTexture(r, f),
              e.set(f, m),
              f.addEventListener("dispose", a),
              n(m.texture, f.mapping)
            );
          } else return null;
        }
    }
    return f;
  }
  function a(f) {
    const u = f.target;
    u.removeEventListener("dispose", a);
    const h = e.get(u);
    h !== void 0 && (e.delete(u), h.dispose());
  }
  function l() {
    e = new WeakMap();
  }
  return { get: s, dispose: l };
}
class HM extends mg {
  constructor(e = -1, n = 1, s = 1, a = -1, l = 0.1, f = 2e3) {
    (super(),
      (this.isOrthographicCamera = !0),
      (this.type = "OrthographicCamera"),
      (this.zoom = 1),
      (this.view = null),
      (this.left = e),
      (this.right = n),
      (this.top = s),
      (this.bottom = a),
      (this.near = l),
      (this.far = f),
      this.updateProjectionMatrix());
  }
  copy(e, n) {
    return (
      super.copy(e, n),
      (this.left = e.left),
      (this.right = e.right),
      (this.top = e.top),
      (this.bottom = e.bottom),
      (this.near = e.near),
      (this.far = e.far),
      (this.zoom = e.zoom),
      (this.view = e.view === null ? null : Object.assign({}, e.view)),
      this
    );
  }
  setViewOffset(e, n, s, a, l, f) {
    (this.view === null &&
      (this.view = {
        enabled: !0,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1,
      }),
      (this.view.enabled = !0),
      (this.view.fullWidth = e),
      (this.view.fullHeight = n),
      (this.view.offsetX = s),
      (this.view.offsetY = a),
      (this.view.width = l),
      (this.view.height = f),
      this.updateProjectionMatrix());
  }
  clearViewOffset() {
    (this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix());
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom),
      n = (this.top - this.bottom) / (2 * this.zoom),
      s = (this.right + this.left) / 2,
      a = (this.top + this.bottom) / 2;
    let l = s - e,
      f = s + e,
      u = a + n,
      h = a - n;
    if (this.view !== null && this.view.enabled) {
      const m = (this.right - this.left) / this.view.fullWidth / this.zoom,
        g = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      ((l += m * this.view.offsetX),
        (f = l + m * this.view.width),
        (u -= g * this.view.offsetY),
        (h = u - g * this.view.height));
    }
    (this.projectionMatrix.makeOrthographic(l, f, u, h, this.near, this.far, this.coordinateSystem),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert());
  }
  toJSON(e) {
    const n = super.toJSON(e);
    return (
      (n.object.zoom = this.zoom),
      (n.object.left = this.left),
      (n.object.right = this.right),
      (n.object.top = this.top),
      (n.object.bottom = this.bottom),
      (n.object.near = this.near),
      (n.object.far = this.far),
      this.view !== null && (n.object.view = Object.assign({}, this.view)),
      n
    );
  }
}
const Os = 4,
  um = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582],
  Xr = 20,
  $u = new HM(),
  fm = new Mt();
let Ku = null,
  Zu = 0,
  Qu = 0;
const Vr = (1 + Math.sqrt(5)) / 2,
  Is = 1 / Vr,
  dm = [
    new ee(1, 1, 1),
    new ee(-1, 1, 1),
    new ee(1, 1, -1),
    new ee(-1, 1, -1),
    new ee(0, Vr, Is),
    new ee(0, Vr, -Is),
    new ee(Is, 0, Vr),
    new ee(-Is, 0, Vr),
    new ee(Vr, Is, 0),
    new ee(-Vr, Is, 0),
  ];
class hm {
  constructor(e) {
    ((this._renderer = e),
      (this._pingPongRenderTarget = null),
      (this._lodMax = 0),
      (this._cubeSize = 0),
      (this._lodPlanes = []),
      (this._sizeLods = []),
      (this._sigmas = []),
      (this._blurMaterial = null),
      (this._cubemapMaterial = null),
      (this._equirectMaterial = null),
      this._compileMaterial(this._blurMaterial));
  }
  fromScene(e, n = 0, s = 0.1, a = 100) {
    ((Ku = this._renderer.getRenderTarget()),
      (Zu = this._renderer.getActiveCubeFace()),
      (Qu = this._renderer.getActiveMipmapLevel()),
      this._setSize(256));
    const l = this._allocateTargets();
    return (
      (l.depthBuffer = !0),
      this._sceneToCubeUV(e, s, a, l),
      n > 0 && this._blur(l, 0, 0, n),
      this._applyPMREM(l),
      this._cleanup(l),
      l
    );
  }
  fromEquirectangular(e, n = null) {
    return this._fromTexture(e, n);
  }
  fromCubemap(e, n = null) {
    return this._fromTexture(e, n);
  }
  compileCubemapShader() {
    this._cubemapMaterial === null &&
      ((this._cubemapMaterial = gm()), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null &&
      ((this._equirectMaterial = mm()), this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    (this._dispose(),
      this._cubemapMaterial !== null && this._cubemapMaterial.dispose(),
      this._equirectMaterial !== null && this._equirectMaterial.dispose());
  }
  _setSize(e) {
    ((this._lodMax = Math.floor(Math.log2(e))), (this._cubeSize = Math.pow(2, this._lodMax)));
  }
  _dispose() {
    (this._blurMaterial !== null && this._blurMaterial.dispose(),
      this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose());
    for (let e = 0; e < this._lodPlanes.length; e++) this._lodPlanes[e].dispose();
  }
  _cleanup(e) {
    (this._renderer.setRenderTarget(Ku, Zu, Qu),
      (e.scissorTest = !1),
      Ml(e, 0, 0, e.width, e.height));
  }
  _fromTexture(e, n) {
    (e.mapping === Gs || e.mapping === Vs
      ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width)
      : this._setSize(e.image.width / 4),
      (Ku = this._renderer.getRenderTarget()),
      (Zu = this._renderer.getActiveCubeFace()),
      (Qu = this._renderer.getActiveMipmapLevel()));
    const s = n || this._allocateTargets();
    return (this._textureToCubeUV(e, s), this._applyPMREM(s), this._cleanup(s), s);
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112),
      n = 4 * this._cubeSize,
      s = {
        magFilter: Qn,
        minFilter: Qn,
        generateMipmaps: !1,
        type: Go,
        format: hi,
        colorSpace: Gi,
        depthBuffer: !1,
      },
      a = pm(e, n, s);
    if (
      this._pingPongRenderTarget === null ||
      this._pingPongRenderTarget.width !== e ||
      this._pingPongRenderTarget.height !== n
    ) {
      (this._pingPongRenderTarget !== null && this._dispose(),
        (this._pingPongRenderTarget = pm(e, n, s)));
      const { _lodMax: l } = this;
      (({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = GM(l)),
        (this._blurMaterial = VM(l, e, n)));
    }
    return a;
  }
  _compileMaterial(e) {
    const n = new Hi(this._lodPlanes[0], e);
    this._renderer.compile(n, $u);
  }
  _sceneToCubeUV(e, n, s, a) {
    const u = new Hn(90, 1, n, s),
      h = [1, -1, 1, 1, 1, 1],
      m = [1, 1, 1, -1, -1, -1],
      g = this._renderer,
      v = g.autoClear,
      y = g.toneMapping;
    (g.getClearColor(fm), (g.toneMapping = yr), (g.autoClear = !1));
    const S = new Mf({ name: "PMREM.Background", side: Un, depthWrite: !1, depthTest: !1 }),
      T = new Hi(new qo(), S);
    let E = !1;
    const x = e.background;
    x
      ? x.isColor && (S.color.copy(x), (e.background = null), (E = !0))
      : (S.color.copy(fm), (E = !0));
    for (let _ = 0; _ < 6; _++) {
      const D = _ % 3;
      D === 0
        ? (u.up.set(0, h[_], 0), u.lookAt(m[_], 0, 0))
        : D === 1
          ? (u.up.set(0, 0, h[_]), u.lookAt(0, m[_], 0))
          : (u.up.set(0, h[_], 0), u.lookAt(0, 0, m[_]));
      const R = this._cubeSize;
      (Ml(a, D * R, _ > 2 ? R : 0, R, R),
        g.setRenderTarget(a),
        E && g.render(T, u),
        g.render(e, u));
    }
    (T.geometry.dispose(),
      T.material.dispose(),
      (g.toneMapping = y),
      (g.autoClear = v),
      (e.background = x));
  }
  _textureToCubeUV(e, n) {
    const s = this._renderer,
      a = e.mapping === Gs || e.mapping === Vs;
    a
      ? (this._cubemapMaterial === null && (this._cubemapMaterial = gm()),
        (this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1))
      : this._equirectMaterial === null && (this._equirectMaterial = mm());
    const l = a ? this._cubemapMaterial : this._equirectMaterial,
      f = new Hi(this._lodPlanes[0], l),
      u = l.uniforms;
    u.envMap.value = e;
    const h = this._cubeSize;
    (Ml(n, 0, 0, 3 * h, 2 * h), s.setRenderTarget(n), s.render(f, $u));
  }
  _applyPMREM(e) {
    const n = this._renderer,
      s = n.autoClear;
    n.autoClear = !1;
    for (let a = 1; a < this._lodPlanes.length; a++) {
      const l = Math.sqrt(
          this._sigmas[a] * this._sigmas[a] - this._sigmas[a - 1] * this._sigmas[a - 1],
        ),
        f = dm[(a - 1) % dm.length];
      this._blur(e, a - 1, a, l, f);
    }
    n.autoClear = s;
  }
  _blur(e, n, s, a, l) {
    const f = this._pingPongRenderTarget;
    (this._halfBlur(e, f, n, s, a, "latitudinal", l),
      this._halfBlur(f, e, s, s, a, "longitudinal", l));
  }
  _halfBlur(e, n, s, a, l, f, u) {
    const h = this._renderer,
      m = this._blurMaterial;
    f !== "latitudinal" &&
      f !== "longitudinal" &&
      console.error("blur direction must be either latitudinal or longitudinal!");
    const g = 3,
      v = new Hi(this._lodPlanes[a], m),
      y = m.uniforms,
      S = this._sizeLods[s] - 1,
      T = isFinite(l) ? Math.PI / (2 * S) : (2 * Math.PI) / (2 * Xr - 1),
      E = l / T,
      x = isFinite(l) ? 1 + Math.floor(g * E) : Xr;
    x > Xr &&
      console.warn(
        `sigmaRadians, ${l}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Xr}`,
      );
    const _ = [];
    let D = 0;
    for (let F = 0; F < Xr; ++F) {
      const X = F / E,
        A = Math.exp((-X * X) / 2);
      (_.push(A), F === 0 ? (D += A) : F < x && (D += 2 * A));
    }
    for (let F = 0; F < _.length; F++) _[F] = _[F] / D;
    ((y.envMap.value = e.texture),
      (y.samples.value = x),
      (y.weights.value = _),
      (y.latitudinal.value = f === "latitudinal"),
      u && (y.poleAxis.value = u));
    const { _lodMax: R } = this;
    ((y.dTheta.value = T), (y.mipInt.value = R - s));
    const N = this._sizeLods[a],
      z = 3 * N * (a > R - Os ? a - R + Os : 0),
      I = 4 * (this._cubeSize - N);
    (Ml(n, z, I, 3 * N, 2 * N), h.setRenderTarget(n), h.render(v, $u));
  }
}
function GM(r) {
  const e = [],
    n = [],
    s = [];
  let a = r;
  const l = r - Os + 1 + um.length;
  for (let f = 0; f < l; f++) {
    const u = Math.pow(2, a);
    n.push(u);
    let h = 1 / u;
    (f > r - Os ? (h = um[f - r + Os - 1]) : f === 0 && (h = 0), s.push(h));
    const m = 1 / (u - 2),
      g = -m,
      v = 1 + m,
      y = [g, g, v, g, v, v, g, g, v, v, g, v],
      S = 6,
      T = 6,
      E = 3,
      x = 2,
      _ = 1,
      D = new Float32Array(E * T * S),
      R = new Float32Array(x * T * S),
      N = new Float32Array(_ * T * S);
    for (let I = 0; I < S; I++) {
      const F = ((I % 3) * 2) / 3 - 1,
        X = I > 2 ? 0 : -1,
        A = [
          F,
          X,
          0,
          F + 2 / 3,
          X,
          0,
          F + 2 / 3,
          X + 1,
          0,
          F,
          X,
          0,
          F + 2 / 3,
          X + 1,
          0,
          F,
          X + 1,
          0,
        ];
      (D.set(A, E * T * I), R.set(y, x * T * I));
      const b = [I, I, I, I, I, I];
      N.set(b, _ * T * I);
    }
    const z = new ti();
    (z.setAttribute("position", new ei(D, E)),
      z.setAttribute("uv", new ei(R, x)),
      z.setAttribute("faceIndex", new ei(N, _)),
      e.push(z),
      a > Os && a--);
  }
  return { lodPlanes: e, sizeLods: n, sigmas: s };
}
function pm(r, e, n) {
  const s = new $r(r, e, n);
  return ((s.texture.mapping = Ol), (s.texture.name = "PMREM.cubeUv"), (s.scissorTest = !0), s);
}
function Ml(r, e, n, s, a) {
  (r.viewport.set(e, n, s, a), r.scissor.set(e, n, s, a));
}
function VM(r, e, n) {
  const s = new Float32Array(Xr),
    a = new ee(0, 1, 0);
  return new Kr({
    name: "SphericalGaussianBlur",
    defines: {
      n: Xr,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / n,
      CUBEUV_MAX_MIP: `${r}.0`,
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: s },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: a },
    },
    vertexShader: Tf(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
    blending: xr,
    depthTest: !1,
    depthWrite: !1,
  });
}
function mm() {
  return new Kr({
    name: "EquirectangularToCubeUV",
    uniforms: { envMap: { value: null } },
    vertexShader: Tf(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
    blending: xr,
    depthTest: !1,
    depthWrite: !1,
  });
}
function gm() {
  return new Kr({
    name: "CubemapToCubeUV",
    uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } },
    vertexShader: Tf(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
    blending: xr,
    depthTest: !1,
    depthWrite: !1,
  });
}
function Tf() {
  return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
function WM(r) {
  let e = new WeakMap(),
    n = null;
  function s(u) {
    if (u && u.isTexture) {
      const h = u.mapping,
        m = h === af || h === lf,
        g = h === Gs || h === Vs;
      if (m || g)
        if (u.isRenderTargetTexture && u.needsPMREMUpdate === !0) {
          u.needsPMREMUpdate = !1;
          let v = e.get(u);
          return (
            n === null && (n = new hm(r)),
            (v = m ? n.fromEquirectangular(u, v) : n.fromCubemap(u, v)),
            e.set(u, v),
            v.texture
          );
        } else {
          if (e.has(u)) return e.get(u).texture;
          {
            const v = u.image;
            if ((m && v && v.height > 0) || (g && v && a(v))) {
              n === null && (n = new hm(r));
              const y = m ? n.fromEquirectangular(u) : n.fromCubemap(u);
              return (e.set(u, y), u.addEventListener("dispose", l), y.texture);
            } else return null;
          }
        }
    }
    return u;
  }
  function a(u) {
    let h = 0;
    const m = 6;
    for (let g = 0; g < m; g++) u[g] !== void 0 && h++;
    return h === m;
  }
  function l(u) {
    const h = u.target;
    h.removeEventListener("dispose", l);
    const m = e.get(h);
    m !== void 0 && (e.delete(h), m.dispose());
  }
  function f() {
    ((e = new WeakMap()), n !== null && (n.dispose(), (n = null)));
  }
  return { get: s, dispose: f };
}
function XM(r) {
  const e = {};
  function n(s) {
    if (e[s] !== void 0) return e[s];
    let a;
    switch (s) {
      case "WEBGL_depth_texture":
        a =
          r.getExtension("WEBGL_depth_texture") ||
          r.getExtension("MOZ_WEBGL_depth_texture") ||
          r.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        a =
          r.getExtension("EXT_texture_filter_anisotropic") ||
          r.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
          r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        a =
          r.getExtension("WEBGL_compressed_texture_s3tc") ||
          r.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
          r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        a =
          r.getExtension("WEBGL_compressed_texture_pvrtc") ||
          r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        a = r.getExtension(s);
    }
    return ((e[s] = a), a);
  }
  return {
    has: function (s) {
      return n(s) !== null;
    },
    init: function (s) {
      (s.isWebGL2
        ? (n("EXT_color_buffer_float"), n("WEBGL_clip_cull_distance"))
        : (n("WEBGL_depth_texture"),
          n("OES_texture_float"),
          n("OES_texture_half_float"),
          n("OES_texture_half_float_linear"),
          n("OES_standard_derivatives"),
          n("OES_element_index_uint"),
          n("OES_vertex_array_object"),
          n("ANGLE_instanced_arrays")),
        n("OES_texture_float_linear"),
        n("EXT_color_buffer_half_float"),
        n("WEBGL_multisampled_render_to_texture"));
    },
    get: function (s) {
      const a = n(s);
      return (
        a === null && console.warn("THREE.WebGLRenderer: " + s + " extension not supported."), a
      );
    },
  };
}
function jM(r, e, n, s) {
  const a = {},
    l = new WeakMap();
  function f(v) {
    const y = v.target;
    y.index !== null && e.remove(y.index);
    for (const T in y.attributes) e.remove(y.attributes[T]);
    for (const T in y.morphAttributes) {
      const E = y.morphAttributes[T];
      for (let x = 0, _ = E.length; x < _; x++) e.remove(E[x]);
    }
    (y.removeEventListener("dispose", f), delete a[y.id]);
    const S = l.get(y);
    (S && (e.remove(S), l.delete(y)),
      s.releaseStatesOfGeometry(y),
      y.isInstancedBufferGeometry === !0 && delete y._maxInstanceCount,
      n.memory.geometries--);
  }
  function u(v, y) {
    return (
      a[y.id] === !0 || (y.addEventListener("dispose", f), (a[y.id] = !0), n.memory.geometries++), y
    );
  }
  function h(v) {
    const y = v.attributes;
    for (const T in y) e.update(y[T], r.ARRAY_BUFFER);
    const S = v.morphAttributes;
    for (const T in S) {
      const E = S[T];
      for (let x = 0, _ = E.length; x < _; x++) e.update(E[x], r.ARRAY_BUFFER);
    }
  }
  function m(v) {
    const y = [],
      S = v.index,
      T = v.attributes.position;
    let E = 0;
    if (S !== null) {
      const D = S.array;
      E = S.version;
      for (let R = 0, N = D.length; R < N; R += 3) {
        const z = D[R + 0],
          I = D[R + 1],
          F = D[R + 2];
        y.push(z, I, I, F, F, z);
      }
    } else if (T !== void 0) {
      const D = T.array;
      E = T.version;
      for (let R = 0, N = D.length / 3 - 1; R < N; R += 3) {
        const z = R + 0,
          I = R + 1,
          F = R + 2;
        y.push(z, I, I, F, F, z);
      }
    } else return;
    const x = new (og(y) ? hg : dg)(y, 1);
    x.version = E;
    const _ = l.get(v);
    (_ && e.remove(_), l.set(v, x));
  }
  function g(v) {
    const y = l.get(v);
    if (y) {
      const S = v.index;
      S !== null && y.version < S.version && m(v);
    } else m(v);
    return l.get(v);
  }
  return { get: u, update: h, getWireframeAttribute: g };
}
function qM(r, e, n, s) {
  const a = s.isWebGL2;
  let l;
  function f(S) {
    l = S;
  }
  let u, h;
  function m(S) {
    ((u = S.type), (h = S.bytesPerElement));
  }
  function g(S, T) {
    (r.drawElements(l, T, u, S * h), n.update(T, l, 1));
  }
  function v(S, T, E) {
    if (E === 0) return;
    let x, _;
    if (a) ((x = r), (_ = "drawElementsInstanced"));
    else if (
      ((x = e.get("ANGLE_instanced_arrays")), (_ = "drawElementsInstancedANGLE"), x === null)
    ) {
      console.error(
        "THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.",
      );
      return;
    }
    (x[_](l, T, u, S * h, E), n.update(T, l, E));
  }
  function y(S, T, E) {
    if (E === 0) return;
    const x = e.get("WEBGL_multi_draw");
    if (x === null) for (let _ = 0; _ < E; _++) this.render(S[_] / h, T[_]);
    else {
      x.multiDrawElementsWEBGL(l, T, 0, u, S, 0, E);
      let _ = 0;
      for (let D = 0; D < E; D++) _ += T[D];
      n.update(_, l, 1);
    }
  }
  ((this.setMode = f),
    (this.setIndex = m),
    (this.render = g),
    (this.renderInstances = v),
    (this.renderMultiDraw = y));
}
function YM(r) {
  const e = { geometries: 0, textures: 0 },
    n = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
  function s(l, f, u) {
    switch ((n.calls++, f)) {
      case r.TRIANGLES:
        n.triangles += u * (l / 3);
        break;
      case r.LINES:
        n.lines += u * (l / 2);
        break;
      case r.LINE_STRIP:
        n.lines += u * (l - 1);
        break;
      case r.LINE_LOOP:
        n.lines += u * l;
        break;
      case r.POINTS:
        n.points += u * l;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", f);
        break;
    }
  }
  function a() {
    ((n.calls = 0), (n.triangles = 0), (n.points = 0), (n.lines = 0));
  }
  return { memory: e, render: n, programs: null, autoReset: !0, reset: a, update: s };
}
function $M(r, e) {
  return r[0] - e[0];
}
function KM(r, e) {
  return Math.abs(e[1]) - Math.abs(r[1]);
}
function ZM(r, e, n) {
  const s = {},
    a = new Float32Array(8),
    l = new WeakMap(),
    f = new cn(),
    u = [];
  for (let m = 0; m < 8; m++) u[m] = [m, 0];
  function h(m, g, v) {
    const y = m.morphTargetInfluences;
    if (e.isWebGL2 === !0) {
      const T = g.morphAttributes.position || g.morphAttributes.normal || g.morphAttributes.color,
        E = T !== void 0 ? T.length : 0;
      let x = l.get(g);
      if (x === void 0 || x.count !== E) {
        let J = function () {
          (pe.dispose(), l.delete(g), g.removeEventListener("dispose", J));
        };
        var S = J;
        x !== void 0 && x.texture.dispose();
        const R = g.morphAttributes.position !== void 0,
          N = g.morphAttributes.normal !== void 0,
          z = g.morphAttributes.color !== void 0,
          I = g.morphAttributes.position || [],
          F = g.morphAttributes.normal || [],
          X = g.morphAttributes.color || [];
        let A = 0;
        (R === !0 && (A = 1), N === !0 && (A = 2), z === !0 && (A = 3));
        let b = g.attributes.position.count * A,
          le = 1;
        b > e.maxTextureSize && ((le = Math.ceil(b / e.maxTextureSize)), (b = e.maxTextureSize));
        const ne = new Float32Array(b * le * 4 * E),
          pe = new cg(ne, b, le, E);
        ((pe.type = vr), (pe.needsUpdate = !0));
        const H = A * 4;
        for (let ie = 0; ie < E; ie++) {
          const ue = I[ie],
            V = F[ie],
            K = X[ie],
            j = b * le * 4 * ie;
          for (let L = 0; L < ue.count; L++) {
            const W = L * H;
            (R === !0 &&
              (f.fromBufferAttribute(ue, L),
              (ne[j + W + 0] = f.x),
              (ne[j + W + 1] = f.y),
              (ne[j + W + 2] = f.z),
              (ne[j + W + 3] = 0)),
              N === !0 &&
                (f.fromBufferAttribute(V, L),
                (ne[j + W + 4] = f.x),
                (ne[j + W + 5] = f.y),
                (ne[j + W + 6] = f.z),
                (ne[j + W + 7] = 0)),
              z === !0 &&
                (f.fromBufferAttribute(K, L),
                (ne[j + W + 8] = f.x),
                (ne[j + W + 9] = f.y),
                (ne[j + W + 10] = f.z),
                (ne[j + W + 11] = K.itemSize === 4 ? f.w : 1)));
          }
        }
        ((x = { count: E, texture: pe, size: new Rt(b, le) }),
          l.set(g, x),
          g.addEventListener("dispose", J));
      }
      let _ = 0;
      for (let R = 0; R < y.length; R++) _ += y[R];
      const D = g.morphTargetsRelative ? 1 : 1 - _;
      (v.getUniforms().setValue(r, "morphTargetBaseInfluence", D),
        v.getUniforms().setValue(r, "morphTargetInfluences", y),
        v.getUniforms().setValue(r, "morphTargetsTexture", x.texture, n),
        v.getUniforms().setValue(r, "morphTargetsTextureSize", x.size));
    } else {
      const T = y === void 0 ? 0 : y.length;
      let E = s[g.id];
      if (E === void 0 || E.length !== T) {
        E = [];
        for (let N = 0; N < T; N++) E[N] = [N, 0];
        s[g.id] = E;
      }
      for (let N = 0; N < T; N++) {
        const z = E[N];
        ((z[0] = N), (z[1] = y[N]));
      }
      E.sort(KM);
      for (let N = 0; N < 8; N++)
        N < T && E[N][1]
          ? ((u[N][0] = E[N][0]), (u[N][1] = E[N][1]))
          : ((u[N][0] = Number.MAX_SAFE_INTEGER), (u[N][1] = 0));
      u.sort($M);
      const x = g.morphAttributes.position,
        _ = g.morphAttributes.normal;
      let D = 0;
      for (let N = 0; N < 8; N++) {
        const z = u[N],
          I = z[0],
          F = z[1];
        I !== Number.MAX_SAFE_INTEGER && F
          ? (x &&
              g.getAttribute("morphTarget" + N) !== x[I] &&
              g.setAttribute("morphTarget" + N, x[I]),
            _ &&
              g.getAttribute("morphNormal" + N) !== _[I] &&
              g.setAttribute("morphNormal" + N, _[I]),
            (a[N] = F),
            (D += F))
          : (x && g.hasAttribute("morphTarget" + N) === !0 && g.deleteAttribute("morphTarget" + N),
            _ && g.hasAttribute("morphNormal" + N) === !0 && g.deleteAttribute("morphNormal" + N),
            (a[N] = 0));
      }
      const R = g.morphTargetsRelative ? 1 : 1 - D;
      (v.getUniforms().setValue(r, "morphTargetBaseInfluence", R),
        v.getUniforms().setValue(r, "morphTargetInfluences", a));
    }
  }
  return { update: h };
}
function QM(r, e, n, s) {
  let a = new WeakMap();
  function l(h) {
    const m = s.render.frame,
      g = h.geometry,
      v = e.get(h, g);
    if (
      (a.get(v) !== m && (e.update(v), a.set(v, m)),
      h.isInstancedMesh &&
        (h.hasEventListener("dispose", u) === !1 && h.addEventListener("dispose", u),
        a.get(h) !== m &&
          (n.update(h.instanceMatrix, r.ARRAY_BUFFER),
          h.instanceColor !== null && n.update(h.instanceColor, r.ARRAY_BUFFER),
          a.set(h, m))),
      h.isSkinnedMesh)
    ) {
      const y = h.skeleton;
      a.get(y) !== m && (y.update(), a.set(y, m));
    }
    return v;
  }
  function f() {
    a = new WeakMap();
  }
  function u(h) {
    const m = h.target;
    (m.removeEventListener("dispose", u),
      n.remove(m.instanceMatrix),
      m.instanceColor !== null && n.remove(m.instanceColor));
  }
  return { update: l, dispose: f };
}
class xg extends Gn {
  constructor(e, n, s, a, l, f, u, h, m, g) {
    if (((g = g !== void 0 ? g : qr), g !== qr && g !== Ws))
      throw new Error(
        "DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat",
      );
    (s === void 0 && g === qr && (s = _r),
      s === void 0 && g === Ws && (s = jr),
      super(null, a, l, f, u, h, g, s, m),
      (this.isDepthTexture = !0),
      (this.image = { width: e, height: n }),
      (this.magFilter = u !== void 0 ? u : En),
      (this.minFilter = h !== void 0 ? h : En),
      (this.flipY = !1),
      (this.generateMipmaps = !1),
      (this.compareFunction = null));
  }
  copy(e) {
    return (super.copy(e), (this.compareFunction = e.compareFunction), this);
  }
  toJSON(e) {
    const n = super.toJSON(e);
    return (this.compareFunction !== null && (n.compareFunction = this.compareFunction), n);
  }
}
const yg = new Gn(),
  Sg = new xg(1, 1);
Sg.compareFunction = sg;
const Mg = new cg(),
  Eg = new Ix(),
  Tg = new gg(),
  _m = [],
  vm = [],
  xm = new Float32Array(16),
  ym = new Float32Array(9),
  Sm = new Float32Array(4);
function Ks(r, e, n) {
  const s = r[0];
  if (s <= 0 || s > 0) return r;
  const a = e * n;
  let l = _m[a];
  if ((l === void 0 && ((l = new Float32Array(a)), (_m[a] = l)), e !== 0)) {
    s.toArray(l, 0);
    for (let f = 1, u = 0; f !== e; ++f) ((u += n), r[f].toArray(l, u));
  }
  return l;
}
function Qt(r, e) {
  if (r.length !== e.length) return !1;
  for (let n = 0, s = r.length; n < s; n++) if (r[n] !== e[n]) return !1;
  return !0;
}
function Jt(r, e) {
  for (let n = 0, s = e.length; n < s; n++) r[n] = e[n];
}
function Bl(r, e) {
  let n = vm[e];
  n === void 0 && ((n = new Int32Array(e)), (vm[e] = n));
  for (let s = 0; s !== e; ++s) n[s] = r.allocateTextureUnit();
  return n;
}
function JM(r, e) {
  const n = this.cache;
  n[0] !== e && (r.uniform1f(this.addr, e), (n[0] = e));
}
function eE(r, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y) &&
      (r.uniform2f(this.addr, e.x, e.y), (n[0] = e.x), (n[1] = e.y));
  else {
    if (Qt(n, e)) return;
    (r.uniform2fv(this.addr, e), Jt(n, e));
  }
}
function tE(r, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y || n[2] !== e.z) &&
      (r.uniform3f(this.addr, e.x, e.y, e.z), (n[0] = e.x), (n[1] = e.y), (n[2] = e.z));
  else if (e.r !== void 0)
    (n[0] !== e.r || n[1] !== e.g || n[2] !== e.b) &&
      (r.uniform3f(this.addr, e.r, e.g, e.b), (n[0] = e.r), (n[1] = e.g), (n[2] = e.b));
  else {
    if (Qt(n, e)) return;
    (r.uniform3fv(this.addr, e), Jt(n, e));
  }
}
function nE(r, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y || n[2] !== e.z || n[3] !== e.w) &&
      (r.uniform4f(this.addr, e.x, e.y, e.z, e.w),
      (n[0] = e.x),
      (n[1] = e.y),
      (n[2] = e.z),
      (n[3] = e.w));
  else {
    if (Qt(n, e)) return;
    (r.uniform4fv(this.addr, e), Jt(n, e));
  }
}
function iE(r, e) {
  const n = this.cache,
    s = e.elements;
  if (s === void 0) {
    if (Qt(n, e)) return;
    (r.uniformMatrix2fv(this.addr, !1, e), Jt(n, e));
  } else {
    if (Qt(n, s)) return;
    (Sm.set(s), r.uniformMatrix2fv(this.addr, !1, Sm), Jt(n, s));
  }
}
function rE(r, e) {
  const n = this.cache,
    s = e.elements;
  if (s === void 0) {
    if (Qt(n, e)) return;
    (r.uniformMatrix3fv(this.addr, !1, e), Jt(n, e));
  } else {
    if (Qt(n, s)) return;
    (ym.set(s), r.uniformMatrix3fv(this.addr, !1, ym), Jt(n, s));
  }
}
function sE(r, e) {
  const n = this.cache,
    s = e.elements;
  if (s === void 0) {
    if (Qt(n, e)) return;
    (r.uniformMatrix4fv(this.addr, !1, e), Jt(n, e));
  } else {
    if (Qt(n, s)) return;
    (xm.set(s), r.uniformMatrix4fv(this.addr, !1, xm), Jt(n, s));
  }
}
function oE(r, e) {
  const n = this.cache;
  n[0] !== e && (r.uniform1i(this.addr, e), (n[0] = e));
}
function aE(r, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y) &&
      (r.uniform2i(this.addr, e.x, e.y), (n[0] = e.x), (n[1] = e.y));
  else {
    if (Qt(n, e)) return;
    (r.uniform2iv(this.addr, e), Jt(n, e));
  }
}
function lE(r, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y || n[2] !== e.z) &&
      (r.uniform3i(this.addr, e.x, e.y, e.z), (n[0] = e.x), (n[1] = e.y), (n[2] = e.z));
  else {
    if (Qt(n, e)) return;
    (r.uniform3iv(this.addr, e), Jt(n, e));
  }
}
function cE(r, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y || n[2] !== e.z || n[3] !== e.w) &&
      (r.uniform4i(this.addr, e.x, e.y, e.z, e.w),
      (n[0] = e.x),
      (n[1] = e.y),
      (n[2] = e.z),
      (n[3] = e.w));
  else {
    if (Qt(n, e)) return;
    (r.uniform4iv(this.addr, e), Jt(n, e));
  }
}
function uE(r, e) {
  const n = this.cache;
  n[0] !== e && (r.uniform1ui(this.addr, e), (n[0] = e));
}
function fE(r, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y) &&
      (r.uniform2ui(this.addr, e.x, e.y), (n[0] = e.x), (n[1] = e.y));
  else {
    if (Qt(n, e)) return;
    (r.uniform2uiv(this.addr, e), Jt(n, e));
  }
}
function dE(r, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y || n[2] !== e.z) &&
      (r.uniform3ui(this.addr, e.x, e.y, e.z), (n[0] = e.x), (n[1] = e.y), (n[2] = e.z));
  else {
    if (Qt(n, e)) return;
    (r.uniform3uiv(this.addr, e), Jt(n, e));
  }
}
function hE(r, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y || n[2] !== e.z || n[3] !== e.w) &&
      (r.uniform4ui(this.addr, e.x, e.y, e.z, e.w),
      (n[0] = e.x),
      (n[1] = e.y),
      (n[2] = e.z),
      (n[3] = e.w));
  else {
    if (Qt(n, e)) return;
    (r.uniform4uiv(this.addr, e), Jt(n, e));
  }
}
function pE(r, e, n) {
  const s = this.cache,
    a = n.allocateTextureUnit();
  s[0] !== a && (r.uniform1i(this.addr, a), (s[0] = a));
  const l = this.type === r.SAMPLER_2D_SHADOW ? Sg : yg;
  n.setTexture2D(e || l, a);
}
function mE(r, e, n) {
  const s = this.cache,
    a = n.allocateTextureUnit();
  (s[0] !== a && (r.uniform1i(this.addr, a), (s[0] = a)), n.setTexture3D(e || Eg, a));
}
function gE(r, e, n) {
  const s = this.cache,
    a = n.allocateTextureUnit();
  (s[0] !== a && (r.uniform1i(this.addr, a), (s[0] = a)), n.setTextureCube(e || Tg, a));
}
function _E(r, e, n) {
  const s = this.cache,
    a = n.allocateTextureUnit();
  (s[0] !== a && (r.uniform1i(this.addr, a), (s[0] = a)), n.setTexture2DArray(e || Mg, a));
}
function vE(r) {
  switch (r) {
    case 5126:
      return JM;
    case 35664:
      return eE;
    case 35665:
      return tE;
    case 35666:
      return nE;
    case 35674:
      return iE;
    case 35675:
      return rE;
    case 35676:
      return sE;
    case 5124:
    case 35670:
      return oE;
    case 35667:
    case 35671:
      return aE;
    case 35668:
    case 35672:
      return lE;
    case 35669:
    case 35673:
      return cE;
    case 5125:
      return uE;
    case 36294:
      return fE;
    case 36295:
      return dE;
    case 36296:
      return hE;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return pE;
    case 35679:
    case 36299:
    case 36307:
      return mE;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return gE;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return _E;
  }
}
function xE(r, e) {
  r.uniform1fv(this.addr, e);
}
function yE(r, e) {
  const n = Ks(e, this.size, 2);
  r.uniform2fv(this.addr, n);
}
function SE(r, e) {
  const n = Ks(e, this.size, 3);
  r.uniform3fv(this.addr, n);
}
function ME(r, e) {
  const n = Ks(e, this.size, 4);
  r.uniform4fv(this.addr, n);
}
function EE(r, e) {
  const n = Ks(e, this.size, 4);
  r.uniformMatrix2fv(this.addr, !1, n);
}
function TE(r, e) {
  const n = Ks(e, this.size, 9);
  r.uniformMatrix3fv(this.addr, !1, n);
}
function wE(r, e) {
  const n = Ks(e, this.size, 16);
  r.uniformMatrix4fv(this.addr, !1, n);
}
function AE(r, e) {
  r.uniform1iv(this.addr, e);
}
function RE(r, e) {
  r.uniform2iv(this.addr, e);
}
function CE(r, e) {
  r.uniform3iv(this.addr, e);
}
function bE(r, e) {
  r.uniform4iv(this.addr, e);
}
function PE(r, e) {
  r.uniform1uiv(this.addr, e);
}
function LE(r, e) {
  r.uniform2uiv(this.addr, e);
}
function DE(r, e) {
  r.uniform3uiv(this.addr, e);
}
function NE(r, e) {
  r.uniform4uiv(this.addr, e);
}
function UE(r, e, n) {
  const s = this.cache,
    a = e.length,
    l = Bl(n, a);
  Qt(s, l) || (r.uniform1iv(this.addr, l), Jt(s, l));
  for (let f = 0; f !== a; ++f) n.setTexture2D(e[f] || yg, l[f]);
}
function IE(r, e, n) {
  const s = this.cache,
    a = e.length,
    l = Bl(n, a);
  Qt(s, l) || (r.uniform1iv(this.addr, l), Jt(s, l));
  for (let f = 0; f !== a; ++f) n.setTexture3D(e[f] || Eg, l[f]);
}
function FE(r, e, n) {
  const s = this.cache,
    a = e.length,
    l = Bl(n, a);
  Qt(s, l) || (r.uniform1iv(this.addr, l), Jt(s, l));
  for (let f = 0; f !== a; ++f) n.setTextureCube(e[f] || Tg, l[f]);
}
function OE(r, e, n) {
  const s = this.cache,
    a = e.length,
    l = Bl(n, a);
  Qt(s, l) || (r.uniform1iv(this.addr, l), Jt(s, l));
  for (let f = 0; f !== a; ++f) n.setTexture2DArray(e[f] || Mg, l[f]);
}
function kE(r) {
  switch (r) {
    case 5126:
      return xE;
    case 35664:
      return yE;
    case 35665:
      return SE;
    case 35666:
      return ME;
    case 35674:
      return EE;
    case 35675:
      return TE;
    case 35676:
      return wE;
    case 5124:
    case 35670:
      return AE;
    case 35667:
    case 35671:
      return RE;
    case 35668:
    case 35672:
      return CE;
    case 35669:
    case 35673:
      return bE;
    case 5125:
      return PE;
    case 36294:
      return LE;
    case 36295:
      return DE;
    case 36296:
      return NE;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return UE;
    case 35679:
    case 36299:
    case 36307:
      return IE;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return FE;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return OE;
  }
}
class zE {
  constructor(e, n, s) {
    ((this.id = e),
      (this.addr = s),
      (this.cache = []),
      (this.type = n.type),
      (this.setValue = vE(n.type)));
  }
}
class BE {
  constructor(e, n, s) {
    ((this.id = e),
      (this.addr = s),
      (this.cache = []),
      (this.type = n.type),
      (this.size = n.size),
      (this.setValue = kE(n.type)));
  }
}
class HE {
  constructor(e) {
    ((this.id = e), (this.seq = []), (this.map = {}));
  }
  setValue(e, n, s) {
    const a = this.seq;
    for (let l = 0, f = a.length; l !== f; ++l) {
      const u = a[l];
      u.setValue(e, n[u.id], s);
    }
  }
}
const Ju = /(\w+)(\])?(\[|\.)?/g;
function Mm(r, e) {
  (r.seq.push(e), (r.map[e.id] = e));
}
function GE(r, e, n) {
  const s = r.name,
    a = s.length;
  for (Ju.lastIndex = 0; ;) {
    const l = Ju.exec(s),
      f = Ju.lastIndex;
    let u = l[1];
    const h = l[2] === "]",
      m = l[3];
    if ((h && (u = u | 0), m === void 0 || (m === "[" && f + 2 === a))) {
      Mm(n, m === void 0 ? new zE(u, r, e) : new BE(u, r, e));
      break;
    } else {
      let v = n.map[u];
      (v === void 0 && ((v = new HE(u)), Mm(n, v)), (n = v));
    }
  }
}
class bl {
  constructor(e, n) {
    ((this.seq = []), (this.map = {}));
    const s = e.getProgramParameter(n, e.ACTIVE_UNIFORMS);
    for (let a = 0; a < s; ++a) {
      const l = e.getActiveUniform(n, a),
        f = e.getUniformLocation(n, l.name);
      GE(l, f, this);
    }
  }
  setValue(e, n, s, a) {
    const l = this.map[n];
    l !== void 0 && l.setValue(e, s, a);
  }
  setOptional(e, n, s) {
    const a = n[s];
    a !== void 0 && this.setValue(e, s, a);
  }
  static upload(e, n, s, a) {
    for (let l = 0, f = n.length; l !== f; ++l) {
      const u = n[l],
        h = s[u.id];
      h.needsUpdate !== !1 && u.setValue(e, h.value, a);
    }
  }
  static seqWithValue(e, n) {
    const s = [];
    for (let a = 0, l = e.length; a !== l; ++a) {
      const f = e[a];
      f.id in n && s.push(f);
    }
    return s;
  }
}
function Em(r, e, n) {
  const s = r.createShader(e);
  return (r.shaderSource(s, n), r.compileShader(s), s);
}
const VE = 37297;
let WE = 0;
function XE(r, e) {
  const n = r.split(`
`),
    s = [],
    a = Math.max(e - 6, 0),
    l = Math.min(e + 6, n.length);
  for (let f = a; f < l; f++) {
    const u = f + 1;
    s.push(`${u === e ? ">" : " "} ${u}: ${n[f]}`);
  }
  return s.join(`
`);
}
function jE(r) {
  const e = At.getPrimaries(At.workingColorSpace),
    n = At.getPrimaries(r);
  let s;
  switch (
    (e === n
      ? (s = "")
      : e === Nl && n === Dl
        ? (s = "LinearDisplayP3ToLinearSRGB")
        : e === Dl && n === Nl && (s = "LinearSRGBToLinearDisplayP3"),
    r)
  ) {
    case Gi:
    case kl:
      return [s, "LinearTransferOETF"];
    case ln:
    case xf:
      return [s, "sRGBTransferOETF"];
    default:
      return (
        console.warn("THREE.WebGLProgram: Unsupported color space:", r), [s, "LinearTransferOETF"]
      );
  }
}
function Tm(r, e, n) {
  const s = r.getShaderParameter(e, r.COMPILE_STATUS),
    a = r.getShaderInfoLog(e).trim();
  if (s && a === "") return "";
  const l = /ERROR: 0:(\d+)/.exec(a);
  if (l) {
    const f = parseInt(l[1]);
    return (
      n.toUpperCase() +
      `

` +
      a +
      `

` +
      XE(r.getShaderSource(e), f)
    );
  } else return a;
}
function qE(r, e) {
  const n = jE(e);
  return `vec4 ${r}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`;
}
function YE(r, e) {
  let n;
  switch (e) {
    case V0:
      n = "Linear";
      break;
    case W0:
      n = "Reinhard";
      break;
    case X0:
      n = "OptimizedCineon";
      break;
    case j0:
      n = "ACESFilmic";
      break;
    case Y0:
      n = "AgX";
      break;
    case q0:
      n = "Custom";
      break;
    default:
      (console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), (n = "Linear"));
  }
  return "vec3 " + r + "( vec3 color ) { return " + n + "ToneMapping( color ); }";
}
function $E(r) {
  return [
    r.extensionDerivatives ||
    r.envMapCubeUVHeight ||
    r.bumpMap ||
    r.normalMapTangentSpace ||
    r.clearcoatNormalMap ||
    r.flatShading ||
    r.shaderID === "physical"
      ? "#extension GL_OES_standard_derivatives : enable"
      : "",
    (r.extensionFragDepth || r.logarithmicDepthBuffer) && r.rendererExtensionFragDepth
      ? "#extension GL_EXT_frag_depth : enable"
      : "",
    r.extensionDrawBuffers && r.rendererExtensionDrawBuffers
      ? "#extension GL_EXT_draw_buffers : require"
      : "",
    (r.extensionShaderTextureLOD || r.envMap || r.transmission) &&
    r.rendererExtensionShaderTextureLod
      ? "#extension GL_EXT_shader_texture_lod : enable"
      : "",
  ].filter(ks).join(`
`);
}
function KE(r) {
  return [
    r.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
  ].filter(ks).join(`
`);
}
function ZE(r) {
  const e = [];
  for (const n in r) {
    const s = r[n];
    s !== !1 && e.push("#define " + n + " " + s);
  }
  return e.join(`
`);
}
function QE(r, e) {
  const n = {},
    s = r.getProgramParameter(e, r.ACTIVE_ATTRIBUTES);
  for (let a = 0; a < s; a++) {
    const l = r.getActiveAttrib(e, a),
      f = l.name;
    let u = 1;
    (l.type === r.FLOAT_MAT2 && (u = 2),
      l.type === r.FLOAT_MAT3 && (u = 3),
      l.type === r.FLOAT_MAT4 && (u = 4),
      (n[f] = { type: l.type, location: r.getAttribLocation(e, f), locationSize: u }));
  }
  return n;
}
function ks(r) {
  return r !== "";
}
function wm(r, e) {
  const n = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return r
    .replace(/NUM_DIR_LIGHTS/g, e.numDirLights)
    .replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights)
    .replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps)
    .replace(/NUM_SPOT_LIGHT_COORDS/g, n)
    .replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights)
    .replace(/NUM_POINT_LIGHTS/g, e.numPointLights)
    .replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights)
    .replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows)
    .replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps)
    .replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows)
    .replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function Am(r, e) {
  return r
    .replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes)
    .replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const JE = /^[ \t]*#include +<([\w\d./]+)>/gm;
function hf(r) {
  return r.replace(JE, tT);
}
const eT = new Map([
  ["encodings_fragment", "colorspace_fragment"],
  ["encodings_pars_fragment", "colorspace_pars_fragment"],
  ["output_fragment", "opaque_fragment"],
]);
function tT(r, e) {
  let n = ft[e];
  if (n === void 0) {
    const s = eT.get(e);
    if (s !== void 0)
      ((n = ft[s]),
        console.warn(
          'THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',
          e,
          s,
        ));
    else throw new Error("Can not resolve #include <" + e + ">");
  }
  return hf(n);
}
const nT =
  /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Rm(r) {
  return r.replace(nT, iT);
}
function iT(r, e, n, s) {
  let a = "";
  for (let l = parseInt(e); l < parseInt(n); l++)
    a += s.replace(/\[\s*i\s*\]/g, "[ " + l + " ]").replace(/UNROLLED_LOOP_INDEX/g, l);
  return a;
}
function Cm(r) {
  let e =
    "precision " +
    r.precision +
    ` float;
precision ` +
    r.precision +
    " int;";
  return (
    r.precision === "highp"
      ? (e += `
#define HIGH_PRECISION`)
      : r.precision === "mediump"
        ? (e += `
#define MEDIUM_PRECISION`)
        : r.precision === "lowp" &&
          (e += `
#define LOW_PRECISION`),
    e
  );
}
function rT(r) {
  let e = "SHADOWMAP_TYPE_BASIC";
  return (
    r.shadowMapType === Ym
      ? (e = "SHADOWMAP_TYPE_PCF")
      : r.shadowMapType === _0
        ? (e = "SHADOWMAP_TYPE_PCF_SOFT")
        : r.shadowMapType === ki && (e = "SHADOWMAP_TYPE_VSM"),
    e
  );
}
function sT(r) {
  let e = "ENVMAP_TYPE_CUBE";
  if (r.envMap)
    switch (r.envMapMode) {
      case Gs:
      case Vs:
        e = "ENVMAP_TYPE_CUBE";
        break;
      case Ol:
        e = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return e;
}
function oT(r) {
  let e = "ENVMAP_MODE_REFLECTION";
  if (r.envMap)
    switch (r.envMapMode) {
      case Vs:
        e = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return e;
}
function aT(r) {
  let e = "ENVMAP_BLENDING_NONE";
  if (r.envMap)
    switch (r.combine) {
      case $m:
        e = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case H0:
        e = "ENVMAP_BLENDING_MIX";
        break;
      case G0:
        e = "ENVMAP_BLENDING_ADD";
        break;
    }
  return e;
}
function lT(r) {
  const e = r.envMapCubeUVHeight;
  if (e === null) return null;
  const n = Math.log2(e) - 2,
    s = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, n), 112)), texelHeight: s, maxMip: n };
}
function cT(r, e, n, s) {
  const a = r.getContext(),
    l = n.defines;
  let f = n.vertexShader,
    u = n.fragmentShader;
  const h = rT(n),
    m = sT(n),
    g = oT(n),
    v = aT(n),
    y = lT(n),
    S = n.isWebGL2 ? "" : $E(n),
    T = KE(n),
    E = ZE(l),
    x = a.createProgram();
  let _,
    D,
    R = n.glslVersion
      ? "#version " +
        n.glslVersion +
        `
`
      : "";
  (n.isRawShaderMaterial
    ? ((_ = [
        "#define SHADER_TYPE " + n.shaderType,
        "#define SHADER_NAME " + n.shaderName,
        E,
      ].filter(ks).join(`
`)),
      _.length > 0 &&
        (_ += `
`),
      (D = [
        S,
        "#define SHADER_TYPE " + n.shaderType,
        "#define SHADER_NAME " + n.shaderName,
        E,
      ].filter(ks).join(`
`)),
      D.length > 0 &&
        (D += `
`))
    : ((_ = [
        Cm(n),
        "#define SHADER_TYPE " + n.shaderType,
        "#define SHADER_NAME " + n.shaderName,
        E,
        n.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
        n.batching ? "#define USE_BATCHING" : "",
        n.instancing ? "#define USE_INSTANCING" : "",
        n.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
        n.useFog && n.fog ? "#define USE_FOG" : "",
        n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
        n.map ? "#define USE_MAP" : "",
        n.envMap ? "#define USE_ENVMAP" : "",
        n.envMap ? "#define " + g : "",
        n.lightMap ? "#define USE_LIGHTMAP" : "",
        n.aoMap ? "#define USE_AOMAP" : "",
        n.bumpMap ? "#define USE_BUMPMAP" : "",
        n.normalMap ? "#define USE_NORMALMAP" : "",
        n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        n.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
        n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        n.anisotropy ? "#define USE_ANISOTROPY" : "",
        n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        n.specularMap ? "#define USE_SPECULARMAP" : "",
        n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        n.metalnessMap ? "#define USE_METALNESSMAP" : "",
        n.alphaMap ? "#define USE_ALPHAMAP" : "",
        n.alphaHash ? "#define USE_ALPHAHASH" : "",
        n.transmission ? "#define USE_TRANSMISSION" : "",
        n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        n.mapUv ? "#define MAP_UV " + n.mapUv : "",
        n.alphaMapUv ? "#define ALPHAMAP_UV " + n.alphaMapUv : "",
        n.lightMapUv ? "#define LIGHTMAP_UV " + n.lightMapUv : "",
        n.aoMapUv ? "#define AOMAP_UV " + n.aoMapUv : "",
        n.emissiveMapUv ? "#define EMISSIVEMAP_UV " + n.emissiveMapUv : "",
        n.bumpMapUv ? "#define BUMPMAP_UV " + n.bumpMapUv : "",
        n.normalMapUv ? "#define NORMALMAP_UV " + n.normalMapUv : "",
        n.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + n.displacementMapUv : "",
        n.metalnessMapUv ? "#define METALNESSMAP_UV " + n.metalnessMapUv : "",
        n.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + n.roughnessMapUv : "",
        n.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + n.anisotropyMapUv : "",
        n.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + n.clearcoatMapUv : "",
        n.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + n.clearcoatNormalMapUv : "",
        n.clearcoatRoughnessMapUv
          ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + n.clearcoatRoughnessMapUv
          : "",
        n.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + n.iridescenceMapUv : "",
        n.iridescenceThicknessMapUv
          ? "#define IRIDESCENCE_THICKNESSMAP_UV " + n.iridescenceThicknessMapUv
          : "",
        n.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + n.sheenColorMapUv : "",
        n.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + n.sheenRoughnessMapUv : "",
        n.specularMapUv ? "#define SPECULARMAP_UV " + n.specularMapUv : "",
        n.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + n.specularColorMapUv : "",
        n.specularIntensityMapUv
          ? "#define SPECULAR_INTENSITYMAP_UV " + n.specularIntensityMapUv
          : "",
        n.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + n.transmissionMapUv : "",
        n.thicknessMapUv ? "#define THICKNESSMAP_UV " + n.thicknessMapUv : "",
        n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
        n.vertexColors ? "#define USE_COLOR" : "",
        n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
        n.vertexUv1s ? "#define USE_UV1" : "",
        n.vertexUv2s ? "#define USE_UV2" : "",
        n.vertexUv3s ? "#define USE_UV3" : "",
        n.pointsUvs ? "#define USE_POINTS_UV" : "",
        n.flatShading ? "#define FLAT_SHADED" : "",
        n.skinning ? "#define USE_SKINNING" : "",
        n.morphTargets ? "#define USE_MORPHTARGETS" : "",
        n.morphNormals && n.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
        n.morphColors && n.isWebGL2 ? "#define USE_MORPHCOLORS" : "",
        n.morphTargetsCount > 0 && n.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "",
        n.morphTargetsCount > 0 && n.isWebGL2
          ? "#define MORPHTARGETS_TEXTURE_STRIDE " + n.morphTextureStride
          : "",
        n.morphTargetsCount > 0 && n.isWebGL2
          ? "#define MORPHTARGETS_COUNT " + n.morphTargetsCount
          : "",
        n.doubleSided ? "#define DOUBLE_SIDED" : "",
        n.flipSided ? "#define FLIP_SIDED" : "",
        n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        n.shadowMapEnabled ? "#define " + h : "",
        n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
        n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
        n.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
        n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
        n.logarithmicDepthBuffer && n.rendererExtensionFragDepth
          ? "#define USE_LOGDEPTHBUF_EXT"
          : "",
        "uniform mat4 modelMatrix;",
        "uniform mat4 modelViewMatrix;",
        "uniform mat4 projectionMatrix;",
        "uniform mat4 viewMatrix;",
        "uniform mat3 normalMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        "#ifdef USE_INSTANCING",
        "	attribute mat4 instanceMatrix;",
        "#endif",
        "#ifdef USE_INSTANCING_COLOR",
        "	attribute vec3 instanceColor;",
        "#endif",
        "attribute vec3 position;",
        "attribute vec3 normal;",
        "attribute vec2 uv;",
        "#ifdef USE_UV1",
        "	attribute vec2 uv1;",
        "#endif",
        "#ifdef USE_UV2",
        "	attribute vec2 uv2;",
        "#endif",
        "#ifdef USE_UV3",
        "	attribute vec2 uv3;",
        "#endif",
        "#ifdef USE_TANGENT",
        "	attribute vec4 tangent;",
        "#endif",
        "#if defined( USE_COLOR_ALPHA )",
        "	attribute vec4 color;",
        "#elif defined( USE_COLOR )",
        "	attribute vec3 color;",
        "#endif",
        "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )",
        "	attribute vec3 morphTarget0;",
        "	attribute vec3 morphTarget1;",
        "	attribute vec3 morphTarget2;",
        "	attribute vec3 morphTarget3;",
        "	#ifdef USE_MORPHNORMALS",
        "		attribute vec3 morphNormal0;",
        "		attribute vec3 morphNormal1;",
        "		attribute vec3 morphNormal2;",
        "		attribute vec3 morphNormal3;",
        "	#else",
        "		attribute vec3 morphTarget4;",
        "		attribute vec3 morphTarget5;",
        "		attribute vec3 morphTarget6;",
        "		attribute vec3 morphTarget7;",
        "	#endif",
        "#endif",
        "#ifdef USE_SKINNING",
        "	attribute vec4 skinIndex;",
        "	attribute vec4 skinWeight;",
        "#endif",
        `
`,
      ].filter(ks).join(`
`)),
      (D = [
        S,
        Cm(n),
        "#define SHADER_TYPE " + n.shaderType,
        "#define SHADER_NAME " + n.shaderName,
        E,
        n.useFog && n.fog ? "#define USE_FOG" : "",
        n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
        n.map ? "#define USE_MAP" : "",
        n.matcap ? "#define USE_MATCAP" : "",
        n.envMap ? "#define USE_ENVMAP" : "",
        n.envMap ? "#define " + m : "",
        n.envMap ? "#define " + g : "",
        n.envMap ? "#define " + v : "",
        y ? "#define CUBEUV_TEXEL_WIDTH " + y.texelWidth : "",
        y ? "#define CUBEUV_TEXEL_HEIGHT " + y.texelHeight : "",
        y ? "#define CUBEUV_MAX_MIP " + y.maxMip + ".0" : "",
        n.lightMap ? "#define USE_LIGHTMAP" : "",
        n.aoMap ? "#define USE_AOMAP" : "",
        n.bumpMap ? "#define USE_BUMPMAP" : "",
        n.normalMap ? "#define USE_NORMALMAP" : "",
        n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        n.anisotropy ? "#define USE_ANISOTROPY" : "",
        n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        n.clearcoat ? "#define USE_CLEARCOAT" : "",
        n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        n.iridescence ? "#define USE_IRIDESCENCE" : "",
        n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        n.specularMap ? "#define USE_SPECULARMAP" : "",
        n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        n.metalnessMap ? "#define USE_METALNESSMAP" : "",
        n.alphaMap ? "#define USE_ALPHAMAP" : "",
        n.alphaTest ? "#define USE_ALPHATEST" : "",
        n.alphaHash ? "#define USE_ALPHAHASH" : "",
        n.sheen ? "#define USE_SHEEN" : "",
        n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        n.transmission ? "#define USE_TRANSMISSION" : "",
        n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
        n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "",
        n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
        n.vertexUv1s ? "#define USE_UV1" : "",
        n.vertexUv2s ? "#define USE_UV2" : "",
        n.vertexUv3s ? "#define USE_UV3" : "",
        n.pointsUvs ? "#define USE_POINTS_UV" : "",
        n.gradientMap ? "#define USE_GRADIENTMAP" : "",
        n.flatShading ? "#define FLAT_SHADED" : "",
        n.doubleSided ? "#define DOUBLE_SIDED" : "",
        n.flipSided ? "#define FLIP_SIDED" : "",
        n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        n.shadowMapEnabled ? "#define " + h : "",
        n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
        n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
        n.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
        n.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
        n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
        n.logarithmicDepthBuffer && n.rendererExtensionFragDepth
          ? "#define USE_LOGDEPTHBUF_EXT"
          : "",
        "uniform mat4 viewMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        n.toneMapping !== yr ? "#define TONE_MAPPING" : "",
        n.toneMapping !== yr ? ft.tonemapping_pars_fragment : "",
        n.toneMapping !== yr ? YE("toneMapping", n.toneMapping) : "",
        n.dithering ? "#define DITHERING" : "",
        n.opaque ? "#define OPAQUE" : "",
        ft.colorspace_pars_fragment,
        qE("linearToOutputTexel", n.outputColorSpace),
        n.useDepthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "",
        `
`,
      ].filter(ks).join(`
`))),
    (f = hf(f)),
    (f = wm(f, n)),
    (f = Am(f, n)),
    (u = hf(u)),
    (u = wm(u, n)),
    (u = Am(u, n)),
    (f = Rm(f)),
    (u = Rm(u)),
    n.isWebGL2 &&
      n.isRawShaderMaterial !== !0 &&
      ((R = `#version 300 es
`),
      (_ =
        [
          T,
          "precision mediump sampler2DArray;",
          "#define attribute in",
          "#define varying out",
          "#define texture2D texture",
        ].join(`
`) +
        `
` +
        _),
      (D =
        [
          "precision mediump sampler2DArray;",
          "#define varying in",
          n.glslVersion === jp ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
          n.glslVersion === jp ? "" : "#define gl_FragColor pc_fragColor",
          "#define gl_FragDepthEXT gl_FragDepth",
          "#define texture2D texture",
          "#define textureCube texture",
          "#define texture2DProj textureProj",
          "#define texture2DLodEXT textureLod",
          "#define texture2DProjLodEXT textureProjLod",
          "#define textureCubeLodEXT textureLod",
          "#define texture2DGradEXT textureGrad",
          "#define texture2DProjGradEXT textureProjGrad",
          "#define textureCubeGradEXT textureGrad",
        ].join(`
`) +
        `
` +
        D)));
  const N = R + _ + f,
    z = R + D + u,
    I = Em(a, a.VERTEX_SHADER, N),
    F = Em(a, a.FRAGMENT_SHADER, z);
  (a.attachShader(x, I),
    a.attachShader(x, F),
    n.index0AttributeName !== void 0
      ? a.bindAttribLocation(x, 0, n.index0AttributeName)
      : n.morphTargets === !0 && a.bindAttribLocation(x, 0, "position"),
    a.linkProgram(x));
  function X(ne) {
    if (r.debug.checkShaderErrors) {
      const pe = a.getProgramInfoLog(x).trim(),
        H = a.getShaderInfoLog(I).trim(),
        J = a.getShaderInfoLog(F).trim();
      let ie = !0,
        ue = !0;
      if (a.getProgramParameter(x, a.LINK_STATUS) === !1)
        if (((ie = !1), typeof r.debug.onShaderError == "function"))
          r.debug.onShaderError(a, x, I, F);
        else {
          const V = Tm(a, I, "vertex"),
            K = Tm(a, F, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " +
              a.getError() +
              " - VALIDATE_STATUS " +
              a.getProgramParameter(x, a.VALIDATE_STATUS) +
              `

Program Info Log: ` +
              pe +
              `
` +
              V +
              `
` +
              K,
          );
        }
      else
        pe !== ""
          ? console.warn("THREE.WebGLProgram: Program Info Log:", pe)
          : (H === "" || J === "") && (ue = !1);
      ue &&
        (ne.diagnostics = {
          runnable: ie,
          programLog: pe,
          vertexShader: { log: H, prefix: _ },
          fragmentShader: { log: J, prefix: D },
        });
    }
    (a.deleteShader(I), a.deleteShader(F), (A = new bl(a, x)), (b = QE(a, x)));
  }
  let A;
  this.getUniforms = function () {
    return (A === void 0 && X(this), A);
  };
  let b;
  this.getAttributes = function () {
    return (b === void 0 && X(this), b);
  };
  let le = n.rendererExtensionParallelShaderCompile === !1;
  return (
    (this.isReady = function () {
      return (le === !1 && (le = a.getProgramParameter(x, VE)), le);
    }),
    (this.destroy = function () {
      (s.releaseStatesOfProgram(this), a.deleteProgram(x), (this.program = void 0));
    }),
    (this.type = n.shaderType),
    (this.name = n.shaderName),
    (this.id = WE++),
    (this.cacheKey = e),
    (this.usedTimes = 1),
    (this.program = x),
    (this.vertexShader = I),
    (this.fragmentShader = F),
    this
  );
}
let uT = 0;
class fT {
  constructor() {
    ((this.shaderCache = new Map()), (this.materialCache = new Map()));
  }
  update(e) {
    const n = e.vertexShader,
      s = e.fragmentShader,
      a = this._getShaderStage(n),
      l = this._getShaderStage(s),
      f = this._getShaderCacheForMaterial(e);
    return (
      f.has(a) === !1 && (f.add(a), a.usedTimes++),
      f.has(l) === !1 && (f.add(l), l.usedTimes++),
      this
    );
  }
  remove(e) {
    const n = this.materialCache.get(e);
    for (const s of n) (s.usedTimes--, s.usedTimes === 0 && this.shaderCache.delete(s.code));
    return (this.materialCache.delete(e), this);
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    (this.shaderCache.clear(), this.materialCache.clear());
  }
  _getShaderCacheForMaterial(e) {
    const n = this.materialCache;
    let s = n.get(e);
    return (s === void 0 && ((s = new Set()), n.set(e, s)), s);
  }
  _getShaderStage(e) {
    const n = this.shaderCache;
    let s = n.get(e);
    return (s === void 0 && ((s = new dT(e)), n.set(e, s)), s);
  }
}
class dT {
  constructor(e) {
    ((this.id = uT++), (this.code = e), (this.usedTimes = 0));
  }
}
function hT(r, e, n, s, a, l, f) {
  const u = new ug(),
    h = new fT(),
    m = [],
    g = a.isWebGL2,
    v = a.logarithmicDepthBuffer,
    y = a.vertexTextures;
  let S = a.precision;
  const T = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite",
  };
  function E(A) {
    return A === 0 ? "uv" : `uv${A}`;
  }
  function x(A, b, le, ne, pe) {
    const H = ne.fog,
      J = pe.geometry,
      ie = A.isMeshStandardMaterial ? ne.environment : null,
      ue = (A.isMeshStandardMaterial ? n : e).get(A.envMap || ie),
      V = ue && ue.mapping === Ol ? ue.image.height : null,
      K = T[A.type];
    A.precision !== null &&
      ((S = a.getMaxPrecision(A.precision)),
      S !== A.precision &&
        console.warn(
          "THREE.WebGLProgram.getParameters:",
          A.precision,
          "not supported, using",
          S,
          "instead.",
        ));
    const j = J.morphAttributes.position || J.morphAttributes.normal || J.morphAttributes.color,
      L = j !== void 0 ? j.length : 0;
    let W = 0;
    (J.morphAttributes.position !== void 0 && (W = 1),
      J.morphAttributes.normal !== void 0 && (W = 2),
      J.morphAttributes.color !== void 0 && (W = 3));
    let q, ce, me, Te;
    if (K) {
      const en = yi[K];
      ((q = en.vertexShader), (ce = en.fragmentShader));
    } else
      ((q = A.vertexShader),
        (ce = A.fragmentShader),
        h.update(A),
        (me = h.getVertexShaderID(A)),
        (Te = h.getFragmentShaderID(A)));
    const Me = r.getRenderTarget(),
      Pe = pe.isInstancedMesh === !0,
      Ue = pe.isBatchedMesh === !0,
      Z = !!A.map,
      fe = !!A.matcap,
      B = !!ue,
      ze = !!A.aoMap,
      he = !!A.lightMap,
      qe = !!A.bumpMap,
      Fe = !!A.normalMap,
      Ct = !!A.displacementMap,
      st = !!A.emissiveMap,
      P = !!A.metalnessMap,
      w = !!A.roughnessMap,
      te = A.anisotropy > 0,
      Se = A.clearcoat > 0,
      xe = A.iridescence > 0,
      Ee = A.sheen > 0,
      We = A.transmission > 0,
      Le = te && !!A.anisotropyMap,
      ke = Se && !!A.clearcoatMap,
      Ye = Se && !!A.clearcoatNormalMap,
      ot = Se && !!A.clearcoatRoughnessMap,
      ve = xe && !!A.iridescenceMap,
      mt = xe && !!A.iridescenceThicknessMap,
      dt = Ee && !!A.sheenColorMap,
      tt = Ee && !!A.sheenRoughnessMap,
      je = !!A.specularMap,
      He = !!A.specularColorMap,
      it = !!A.specularIntensityMap,
      vt = We && !!A.transmissionMap,
      bt = We && !!A.thicknessMap,
      at = !!A.gradientMap,
      Ae = !!A.alphaMap,
      k = A.alphaTest > 0,
      Re = !!A.alphaHash,
      be = !!A.extensions,
      Je = !!J.attributes.uv1,
      $e = !!J.attributes.uv2,
      Et = !!J.attributes.uv3;
    let Tt = yr;
    return (
      A.toneMapped && (Me === null || Me.isXRRenderTarget === !0) && (Tt = r.toneMapping),
      {
        isWebGL2: g,
        shaderID: K,
        shaderType: A.type,
        shaderName: A.name,
        vertexShader: q,
        fragmentShader: ce,
        defines: A.defines,
        customVertexShaderID: me,
        customFragmentShaderID: Te,
        isRawShaderMaterial: A.isRawShaderMaterial === !0,
        glslVersion: A.glslVersion,
        precision: S,
        batching: Ue,
        instancing: Pe,
        instancingColor: Pe && pe.instanceColor !== null,
        supportsVertexTextures: y,
        outputColorSpace:
          Me === null
            ? r.outputColorSpace
            : Me.isXRRenderTarget === !0
              ? Me.texture.colorSpace
              : Gi,
        map: Z,
        matcap: fe,
        envMap: B,
        envMapMode: B && ue.mapping,
        envMapCubeUVHeight: V,
        aoMap: ze,
        lightMap: he,
        bumpMap: qe,
        normalMap: Fe,
        displacementMap: y && Ct,
        emissiveMap: st,
        normalMapObjectSpace: Fe && A.normalMapType === ax,
        normalMapTangentSpace: Fe && A.normalMapType === ox,
        metalnessMap: P,
        roughnessMap: w,
        anisotropy: te,
        anisotropyMap: Le,
        clearcoat: Se,
        clearcoatMap: ke,
        clearcoatNormalMap: Ye,
        clearcoatRoughnessMap: ot,
        iridescence: xe,
        iridescenceMap: ve,
        iridescenceThicknessMap: mt,
        sheen: Ee,
        sheenColorMap: dt,
        sheenRoughnessMap: tt,
        specularMap: je,
        specularColorMap: He,
        specularIntensityMap: it,
        transmission: We,
        transmissionMap: vt,
        thicknessMap: bt,
        gradientMap: at,
        opaque: A.transparent === !1 && A.blending === Bs,
        alphaMap: Ae,
        alphaTest: k,
        alphaHash: Re,
        combine: A.combine,
        mapUv: Z && E(A.map.channel),
        aoMapUv: ze && E(A.aoMap.channel),
        lightMapUv: he && E(A.lightMap.channel),
        bumpMapUv: qe && E(A.bumpMap.channel),
        normalMapUv: Fe && E(A.normalMap.channel),
        displacementMapUv: Ct && E(A.displacementMap.channel),
        emissiveMapUv: st && E(A.emissiveMap.channel),
        metalnessMapUv: P && E(A.metalnessMap.channel),
        roughnessMapUv: w && E(A.roughnessMap.channel),
        anisotropyMapUv: Le && E(A.anisotropyMap.channel),
        clearcoatMapUv: ke && E(A.clearcoatMap.channel),
        clearcoatNormalMapUv: Ye && E(A.clearcoatNormalMap.channel),
        clearcoatRoughnessMapUv: ot && E(A.clearcoatRoughnessMap.channel),
        iridescenceMapUv: ve && E(A.iridescenceMap.channel),
        iridescenceThicknessMapUv: mt && E(A.iridescenceThicknessMap.channel),
        sheenColorMapUv: dt && E(A.sheenColorMap.channel),
        sheenRoughnessMapUv: tt && E(A.sheenRoughnessMap.channel),
        specularMapUv: je && E(A.specularMap.channel),
        specularColorMapUv: He && E(A.specularColorMap.channel),
        specularIntensityMapUv: it && E(A.specularIntensityMap.channel),
        transmissionMapUv: vt && E(A.transmissionMap.channel),
        thicknessMapUv: bt && E(A.thicknessMap.channel),
        alphaMapUv: Ae && E(A.alphaMap.channel),
        vertexTangents: !!J.attributes.tangent && (Fe || te),
        vertexColors: A.vertexColors,
        vertexAlphas:
          A.vertexColors === !0 && !!J.attributes.color && J.attributes.color.itemSize === 4,
        vertexUv1s: Je,
        vertexUv2s: $e,
        vertexUv3s: Et,
        pointsUvs: pe.isPoints === !0 && !!J.attributes.uv && (Z || Ae),
        fog: !!H,
        useFog: A.fog === !0,
        fogExp2: H && H.isFogExp2,
        flatShading: A.flatShading === !0,
        sizeAttenuation: A.sizeAttenuation === !0,
        logarithmicDepthBuffer: v,
        skinning: pe.isSkinnedMesh === !0,
        morphTargets: J.morphAttributes.position !== void 0,
        morphNormals: J.morphAttributes.normal !== void 0,
        morphColors: J.morphAttributes.color !== void 0,
        morphTargetsCount: L,
        morphTextureStride: W,
        numDirLights: b.directional.length,
        numPointLights: b.point.length,
        numSpotLights: b.spot.length,
        numSpotLightMaps: b.spotLightMap.length,
        numRectAreaLights: b.rectArea.length,
        numHemiLights: b.hemi.length,
        numDirLightShadows: b.directionalShadowMap.length,
        numPointLightShadows: b.pointShadowMap.length,
        numSpotLightShadows: b.spotShadowMap.length,
        numSpotLightShadowsWithMaps: b.numSpotLightShadowsWithMaps,
        numLightProbes: b.numLightProbes,
        numClippingPlanes: f.numPlanes,
        numClipIntersection: f.numIntersection,
        dithering: A.dithering,
        shadowMapEnabled: r.shadowMap.enabled && le.length > 0,
        shadowMapType: r.shadowMap.type,
        toneMapping: Tt,
        useLegacyLights: r._useLegacyLights,
        decodeVideoTexture:
          Z && A.map.isVideoTexture === !0 && At.getTransfer(A.map.colorSpace) === It,
        premultipliedAlpha: A.premultipliedAlpha,
        doubleSided: A.side === zi,
        flipSided: A.side === Un,
        useDepthPacking: A.depthPacking >= 0,
        depthPacking: A.depthPacking || 0,
        index0AttributeName: A.index0AttributeName,
        extensionDerivatives: be && A.extensions.derivatives === !0,
        extensionFragDepth: be && A.extensions.fragDepth === !0,
        extensionDrawBuffers: be && A.extensions.drawBuffers === !0,
        extensionShaderTextureLOD: be && A.extensions.shaderTextureLOD === !0,
        extensionClipCullDistance:
          be && A.extensions.clipCullDistance && s.has("WEBGL_clip_cull_distance"),
        rendererExtensionFragDepth: g || s.has("EXT_frag_depth"),
        rendererExtensionDrawBuffers: g || s.has("WEBGL_draw_buffers"),
        rendererExtensionShaderTextureLod: g || s.has("EXT_shader_texture_lod"),
        rendererExtensionParallelShaderCompile: s.has("KHR_parallel_shader_compile"),
        customProgramCacheKey: A.customProgramCacheKey(),
      }
    );
  }
  function _(A) {
    const b = [];
    if (
      (A.shaderID
        ? b.push(A.shaderID)
        : (b.push(A.customVertexShaderID), b.push(A.customFragmentShaderID)),
      A.defines !== void 0)
    )
      for (const le in A.defines) (b.push(le), b.push(A.defines[le]));
    return (
      A.isRawShaderMaterial === !1 && (D(b, A), R(b, A), b.push(r.outputColorSpace)),
      b.push(A.customProgramCacheKey),
      b.join()
    );
  }
  function D(A, b) {
    (A.push(b.precision),
      A.push(b.outputColorSpace),
      A.push(b.envMapMode),
      A.push(b.envMapCubeUVHeight),
      A.push(b.mapUv),
      A.push(b.alphaMapUv),
      A.push(b.lightMapUv),
      A.push(b.aoMapUv),
      A.push(b.bumpMapUv),
      A.push(b.normalMapUv),
      A.push(b.displacementMapUv),
      A.push(b.emissiveMapUv),
      A.push(b.metalnessMapUv),
      A.push(b.roughnessMapUv),
      A.push(b.anisotropyMapUv),
      A.push(b.clearcoatMapUv),
      A.push(b.clearcoatNormalMapUv),
      A.push(b.clearcoatRoughnessMapUv),
      A.push(b.iridescenceMapUv),
      A.push(b.iridescenceThicknessMapUv),
      A.push(b.sheenColorMapUv),
      A.push(b.sheenRoughnessMapUv),
      A.push(b.specularMapUv),
      A.push(b.specularColorMapUv),
      A.push(b.specularIntensityMapUv),
      A.push(b.transmissionMapUv),
      A.push(b.thicknessMapUv),
      A.push(b.combine),
      A.push(b.fogExp2),
      A.push(b.sizeAttenuation),
      A.push(b.morphTargetsCount),
      A.push(b.morphAttributeCount),
      A.push(b.numDirLights),
      A.push(b.numPointLights),
      A.push(b.numSpotLights),
      A.push(b.numSpotLightMaps),
      A.push(b.numHemiLights),
      A.push(b.numRectAreaLights),
      A.push(b.numDirLightShadows),
      A.push(b.numPointLightShadows),
      A.push(b.numSpotLightShadows),
      A.push(b.numSpotLightShadowsWithMaps),
      A.push(b.numLightProbes),
      A.push(b.shadowMapType),
      A.push(b.toneMapping),
      A.push(b.numClippingPlanes),
      A.push(b.numClipIntersection),
      A.push(b.depthPacking));
  }
  function R(A, b) {
    (u.disableAll(),
      b.isWebGL2 && u.enable(0),
      b.supportsVertexTextures && u.enable(1),
      b.instancing && u.enable(2),
      b.instancingColor && u.enable(3),
      b.matcap && u.enable(4),
      b.envMap && u.enable(5),
      b.normalMapObjectSpace && u.enable(6),
      b.normalMapTangentSpace && u.enable(7),
      b.clearcoat && u.enable(8),
      b.iridescence && u.enable(9),
      b.alphaTest && u.enable(10),
      b.vertexColors && u.enable(11),
      b.vertexAlphas && u.enable(12),
      b.vertexUv1s && u.enable(13),
      b.vertexUv2s && u.enable(14),
      b.vertexUv3s && u.enable(15),
      b.vertexTangents && u.enable(16),
      b.anisotropy && u.enable(17),
      b.alphaHash && u.enable(18),
      b.batching && u.enable(19),
      A.push(u.mask),
      u.disableAll(),
      b.fog && u.enable(0),
      b.useFog && u.enable(1),
      b.flatShading && u.enable(2),
      b.logarithmicDepthBuffer && u.enable(3),
      b.skinning && u.enable(4),
      b.morphTargets && u.enable(5),
      b.morphNormals && u.enable(6),
      b.morphColors && u.enable(7),
      b.premultipliedAlpha && u.enable(8),
      b.shadowMapEnabled && u.enable(9),
      b.useLegacyLights && u.enable(10),
      b.doubleSided && u.enable(11),
      b.flipSided && u.enable(12),
      b.useDepthPacking && u.enable(13),
      b.dithering && u.enable(14),
      b.transmission && u.enable(15),
      b.sheen && u.enable(16),
      b.opaque && u.enable(17),
      b.pointsUvs && u.enable(18),
      b.decodeVideoTexture && u.enable(19),
      A.push(u.mask));
  }
  function N(A) {
    const b = T[A.type];
    let le;
    if (b) {
      const ne = yi[b];
      le = Yx.clone(ne.uniforms);
    } else le = A.uniforms;
    return le;
  }
  function z(A, b) {
    let le;
    for (let ne = 0, pe = m.length; ne < pe; ne++) {
      const H = m[ne];
      if (H.cacheKey === b) {
        ((le = H), ++le.usedTimes);
        break;
      }
    }
    return (le === void 0 && ((le = new cT(r, b, A, l)), m.push(le)), le);
  }
  function I(A) {
    if (--A.usedTimes === 0) {
      const b = m.indexOf(A);
      ((m[b] = m[m.length - 1]), m.pop(), A.destroy());
    }
  }
  function F(A) {
    h.remove(A);
  }
  function X() {
    h.dispose();
  }
  return {
    getParameters: x,
    getProgramCacheKey: _,
    getUniforms: N,
    acquireProgram: z,
    releaseProgram: I,
    releaseShaderCache: F,
    programs: m,
    dispose: X,
  };
}
function pT() {
  let r = new WeakMap();
  function e(l) {
    let f = r.get(l);
    return (f === void 0 && ((f = {}), r.set(l, f)), f);
  }
  function n(l) {
    r.delete(l);
  }
  function s(l, f, u) {
    r.get(l)[f] = u;
  }
  function a() {
    r = new WeakMap();
  }
  return { get: e, remove: n, update: s, dispose: a };
}
function mT(r, e) {
  return r.groupOrder !== e.groupOrder
    ? r.groupOrder - e.groupOrder
    : r.renderOrder !== e.renderOrder
      ? r.renderOrder - e.renderOrder
      : r.material.id !== e.material.id
        ? r.material.id - e.material.id
        : r.z !== e.z
          ? r.z - e.z
          : r.id - e.id;
}
function bm(r, e) {
  return r.groupOrder !== e.groupOrder
    ? r.groupOrder - e.groupOrder
    : r.renderOrder !== e.renderOrder
      ? r.renderOrder - e.renderOrder
      : r.z !== e.z
        ? e.z - r.z
        : r.id - e.id;
}
function Pm() {
  const r = [];
  let e = 0;
  const n = [],
    s = [],
    a = [];
  function l() {
    ((e = 0), (n.length = 0), (s.length = 0), (a.length = 0));
  }
  function f(v, y, S, T, E, x) {
    let _ = r[e];
    return (
      _ === void 0
        ? ((_ = {
            id: v.id,
            object: v,
            geometry: y,
            material: S,
            groupOrder: T,
            renderOrder: v.renderOrder,
            z: E,
            group: x,
          }),
          (r[e] = _))
        : ((_.id = v.id),
          (_.object = v),
          (_.geometry = y),
          (_.material = S),
          (_.groupOrder = T),
          (_.renderOrder = v.renderOrder),
          (_.z = E),
          (_.group = x)),
      e++,
      _
    );
  }
  function u(v, y, S, T, E, x) {
    const _ = f(v, y, S, T, E, x);
    S.transmission > 0 ? s.push(_) : S.transparent === !0 ? a.push(_) : n.push(_);
  }
  function h(v, y, S, T, E, x) {
    const _ = f(v, y, S, T, E, x);
    S.transmission > 0 ? s.unshift(_) : S.transparent === !0 ? a.unshift(_) : n.unshift(_);
  }
  function m(v, y) {
    (n.length > 1 && n.sort(v || mT),
      s.length > 1 && s.sort(y || bm),
      a.length > 1 && a.sort(y || bm));
  }
  function g() {
    for (let v = e, y = r.length; v < y; v++) {
      const S = r[v];
      if (S.id === null) break;
      ((S.id = null),
        (S.object = null),
        (S.geometry = null),
        (S.material = null),
        (S.group = null));
    }
  }
  return {
    opaque: n,
    transmissive: s,
    transparent: a,
    init: l,
    push: u,
    unshift: h,
    finish: g,
    sort: m,
  };
}
function gT() {
  let r = new WeakMap();
  function e(s, a) {
    const l = r.get(s);
    let f;
    return (
      l === void 0
        ? ((f = new Pm()), r.set(s, [f]))
        : a >= l.length
          ? ((f = new Pm()), l.push(f))
          : (f = l[a]),
      f
    );
  }
  function n() {
    r = new WeakMap();
  }
  return { get: e, dispose: n };
}
function _T() {
  const r = {};
  return {
    get: function (e) {
      if (r[e.id] !== void 0) return r[e.id];
      let n;
      switch (e.type) {
        case "DirectionalLight":
          n = { direction: new ee(), color: new Mt() };
          break;
        case "SpotLight":
          n = {
            position: new ee(),
            direction: new ee(),
            color: new Mt(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0,
          };
          break;
        case "PointLight":
          n = { position: new ee(), color: new Mt(), distance: 0, decay: 0 };
          break;
        case "HemisphereLight":
          n = { direction: new ee(), skyColor: new Mt(), groundColor: new Mt() };
          break;
        case "RectAreaLight":
          n = { color: new Mt(), position: new ee(), halfWidth: new ee(), halfHeight: new ee() };
          break;
      }
      return ((r[e.id] = n), n);
    },
  };
}
function vT() {
  const r = {};
  return {
    get: function (e) {
      if (r[e.id] !== void 0) return r[e.id];
      let n;
      switch (e.type) {
        case "DirectionalLight":
          n = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Rt() };
          break;
        case "SpotLight":
          n = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Rt() };
          break;
        case "PointLight":
          n = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Rt(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3,
          };
          break;
      }
      return ((r[e.id] = n), n);
    },
  };
}
let xT = 0;
function yT(r, e) {
  return (e.castShadow ? 2 : 0) - (r.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (r.map ? 1 : 0);
}
function ST(r, e) {
  const n = new _T(),
    s = vT(),
    a = {
      version: 0,
      hash: {
        directionalLength: -1,
        pointLength: -1,
        spotLength: -1,
        rectAreaLength: -1,
        hemiLength: -1,
        numDirectionalShadows: -1,
        numPointShadows: -1,
        numSpotShadows: -1,
        numSpotMaps: -1,
        numLightProbes: -1,
      },
      ambient: [0, 0, 0],
      probe: [],
      directional: [],
      directionalShadow: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotLightMap: [],
      spotShadow: [],
      spotShadowMap: [],
      spotLightMatrix: [],
      rectArea: [],
      rectAreaLTC1: null,
      rectAreaLTC2: null,
      point: [],
      pointShadow: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: [],
      numSpotLightShadowsWithMaps: 0,
      numLightProbes: 0,
    };
  for (let g = 0; g < 9; g++) a.probe.push(new ee());
  const l = new ee(),
    f = new Zt(),
    u = new Zt();
  function h(g, v) {
    let y = 0,
      S = 0,
      T = 0;
    for (let ne = 0; ne < 9; ne++) a.probe[ne].set(0, 0, 0);
    let E = 0,
      x = 0,
      _ = 0,
      D = 0,
      R = 0,
      N = 0,
      z = 0,
      I = 0,
      F = 0,
      X = 0,
      A = 0;
    g.sort(yT);
    const b = v === !0 ? Math.PI : 1;
    for (let ne = 0, pe = g.length; ne < pe; ne++) {
      const H = g[ne],
        J = H.color,
        ie = H.intensity,
        ue = H.distance,
        V = H.shadow && H.shadow.map ? H.shadow.map.texture : null;
      if (H.isAmbientLight) ((y += J.r * ie * b), (S += J.g * ie * b), (T += J.b * ie * b));
      else if (H.isLightProbe) {
        for (let K = 0; K < 9; K++) a.probe[K].addScaledVector(H.sh.coefficients[K], ie);
        A++;
      } else if (H.isDirectionalLight) {
        const K = n.get(H);
        if ((K.color.copy(H.color).multiplyScalar(H.intensity * b), H.castShadow)) {
          const j = H.shadow,
            L = s.get(H);
          ((L.shadowBias = j.bias),
            (L.shadowNormalBias = j.normalBias),
            (L.shadowRadius = j.radius),
            (L.shadowMapSize = j.mapSize),
            (a.directionalShadow[E] = L),
            (a.directionalShadowMap[E] = V),
            (a.directionalShadowMatrix[E] = H.shadow.matrix),
            N++);
        }
        ((a.directional[E] = K), E++);
      } else if (H.isSpotLight) {
        const K = n.get(H);
        (K.position.setFromMatrixPosition(H.matrixWorld),
          K.color.copy(J).multiplyScalar(ie * b),
          (K.distance = ue),
          (K.coneCos = Math.cos(H.angle)),
          (K.penumbraCos = Math.cos(H.angle * (1 - H.penumbra))),
          (K.decay = H.decay),
          (a.spot[_] = K));
        const j = H.shadow;
        if (
          (H.map && ((a.spotLightMap[F] = H.map), F++, j.updateMatrices(H), H.castShadow && X++),
          (a.spotLightMatrix[_] = j.matrix),
          H.castShadow)
        ) {
          const L = s.get(H);
          ((L.shadowBias = j.bias),
            (L.shadowNormalBias = j.normalBias),
            (L.shadowRadius = j.radius),
            (L.shadowMapSize = j.mapSize),
            (a.spotShadow[_] = L),
            (a.spotShadowMap[_] = V),
            I++);
        }
        _++;
      } else if (H.isRectAreaLight) {
        const K = n.get(H);
        (K.color.copy(J).multiplyScalar(ie),
          K.halfWidth.set(H.width * 0.5, 0, 0),
          K.halfHeight.set(0, H.height * 0.5, 0),
          (a.rectArea[D] = K),
          D++);
      } else if (H.isPointLight) {
        const K = n.get(H);
        if (
          (K.color.copy(H.color).multiplyScalar(H.intensity * b),
          (K.distance = H.distance),
          (K.decay = H.decay),
          H.castShadow)
        ) {
          const j = H.shadow,
            L = s.get(H);
          ((L.shadowBias = j.bias),
            (L.shadowNormalBias = j.normalBias),
            (L.shadowRadius = j.radius),
            (L.shadowMapSize = j.mapSize),
            (L.shadowCameraNear = j.camera.near),
            (L.shadowCameraFar = j.camera.far),
            (a.pointShadow[x] = L),
            (a.pointShadowMap[x] = V),
            (a.pointShadowMatrix[x] = H.shadow.matrix),
            z++);
        }
        ((a.point[x] = K), x++);
      } else if (H.isHemisphereLight) {
        const K = n.get(H);
        (K.skyColor.copy(H.color).multiplyScalar(ie * b),
          K.groundColor.copy(H.groundColor).multiplyScalar(ie * b),
          (a.hemi[R] = K),
          R++);
      }
    }
    (D > 0 &&
      (e.isWebGL2
        ? r.has("OES_texture_float_linear") === !0
          ? ((a.rectAreaLTC1 = Ce.LTC_FLOAT_1), (a.rectAreaLTC2 = Ce.LTC_FLOAT_2))
          : ((a.rectAreaLTC1 = Ce.LTC_HALF_1), (a.rectAreaLTC2 = Ce.LTC_HALF_2))
        : r.has("OES_texture_float_linear") === !0
          ? ((a.rectAreaLTC1 = Ce.LTC_FLOAT_1), (a.rectAreaLTC2 = Ce.LTC_FLOAT_2))
          : r.has("OES_texture_half_float_linear") === !0
            ? ((a.rectAreaLTC1 = Ce.LTC_HALF_1), (a.rectAreaLTC2 = Ce.LTC_HALF_2))
            : console.error(
                "THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.",
              )),
      (a.ambient[0] = y),
      (a.ambient[1] = S),
      (a.ambient[2] = T));
    const le = a.hash;
    (le.directionalLength !== E ||
      le.pointLength !== x ||
      le.spotLength !== _ ||
      le.rectAreaLength !== D ||
      le.hemiLength !== R ||
      le.numDirectionalShadows !== N ||
      le.numPointShadows !== z ||
      le.numSpotShadows !== I ||
      le.numSpotMaps !== F ||
      le.numLightProbes !== A) &&
      ((a.directional.length = E),
      (a.spot.length = _),
      (a.rectArea.length = D),
      (a.point.length = x),
      (a.hemi.length = R),
      (a.directionalShadow.length = N),
      (a.directionalShadowMap.length = N),
      (a.pointShadow.length = z),
      (a.pointShadowMap.length = z),
      (a.spotShadow.length = I),
      (a.spotShadowMap.length = I),
      (a.directionalShadowMatrix.length = N),
      (a.pointShadowMatrix.length = z),
      (a.spotLightMatrix.length = I + F - X),
      (a.spotLightMap.length = F),
      (a.numSpotLightShadowsWithMaps = X),
      (a.numLightProbes = A),
      (le.directionalLength = E),
      (le.pointLength = x),
      (le.spotLength = _),
      (le.rectAreaLength = D),
      (le.hemiLength = R),
      (le.numDirectionalShadows = N),
      (le.numPointShadows = z),
      (le.numSpotShadows = I),
      (le.numSpotMaps = F),
      (le.numLightProbes = A),
      (a.version = xT++));
  }
  function m(g, v) {
    let y = 0,
      S = 0,
      T = 0,
      E = 0,
      x = 0;
    const _ = v.matrixWorldInverse;
    for (let D = 0, R = g.length; D < R; D++) {
      const N = g[D];
      if (N.isDirectionalLight) {
        const z = a.directional[y];
        (z.direction.setFromMatrixPosition(N.matrixWorld),
          l.setFromMatrixPosition(N.target.matrixWorld),
          z.direction.sub(l),
          z.direction.transformDirection(_),
          y++);
      } else if (N.isSpotLight) {
        const z = a.spot[T];
        (z.position.setFromMatrixPosition(N.matrixWorld),
          z.position.applyMatrix4(_),
          z.direction.setFromMatrixPosition(N.matrixWorld),
          l.setFromMatrixPosition(N.target.matrixWorld),
          z.direction.sub(l),
          z.direction.transformDirection(_),
          T++);
      } else if (N.isRectAreaLight) {
        const z = a.rectArea[E];
        (z.position.setFromMatrixPosition(N.matrixWorld),
          z.position.applyMatrix4(_),
          u.identity(),
          f.copy(N.matrixWorld),
          f.premultiply(_),
          u.extractRotation(f),
          z.halfWidth.set(N.width * 0.5, 0, 0),
          z.halfHeight.set(0, N.height * 0.5, 0),
          z.halfWidth.applyMatrix4(u),
          z.halfHeight.applyMatrix4(u),
          E++);
      } else if (N.isPointLight) {
        const z = a.point[S];
        (z.position.setFromMatrixPosition(N.matrixWorld), z.position.applyMatrix4(_), S++);
      } else if (N.isHemisphereLight) {
        const z = a.hemi[x];
        (z.direction.setFromMatrixPosition(N.matrixWorld), z.direction.transformDirection(_), x++);
      }
    }
  }
  return { setup: h, setupView: m, state: a };
}
function Lm(r, e) {
  const n = new ST(r, e),
    s = [],
    a = [];
  function l() {
    ((s.length = 0), (a.length = 0));
  }
  function f(v) {
    s.push(v);
  }
  function u(v) {
    a.push(v);
  }
  function h(v) {
    n.setup(s, v);
  }
  function m(v) {
    n.setupView(s, v);
  }
  return {
    init: l,
    state: { lightsArray: s, shadowsArray: a, lights: n },
    setupLights: h,
    setupLightsView: m,
    pushLight: f,
    pushShadow: u,
  };
}
function MT(r, e) {
  let n = new WeakMap();
  function s(l, f = 0) {
    const u = n.get(l);
    let h;
    return (
      u === void 0
        ? ((h = new Lm(r, e)), n.set(l, [h]))
        : f >= u.length
          ? ((h = new Lm(r, e)), u.push(h))
          : (h = u[f]),
      h
    );
  }
  function a() {
    n = new WeakMap();
  }
  return { get: s, dispose: a };
}
class ET extends $s {
  constructor(e) {
    (super(),
      (this.isMeshDepthMaterial = !0),
      (this.type = "MeshDepthMaterial"),
      (this.depthPacking = rx),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      this.setValues(e));
  }
  copy(e) {
    return (
      super.copy(e),
      (this.depthPacking = e.depthPacking),
      (this.map = e.map),
      (this.alphaMap = e.alphaMap),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      this
    );
  }
}
class TT extends $s {
  constructor(e) {
    (super(),
      (this.isMeshDistanceMaterial = !0),
      (this.type = "MeshDistanceMaterial"),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      this.setValues(e));
  }
  copy(e) {
    return (
      super.copy(e),
      (this.map = e.map),
      (this.alphaMap = e.alphaMap),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      this
    );
  }
}
const wT = `void main() {
	gl_Position = vec4( position, 1.0 );
}`,
  AT = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function RT(r, e, n) {
  let s = new _g();
  const a = new Rt(),
    l = new Rt(),
    f = new cn(),
    u = new ET({ depthPacking: sx }),
    h = new TT(),
    m = {},
    g = n.maxTextureSize,
    v = { [Mr]: Un, [Un]: Mr, [zi]: zi },
    y = new Kr({
      defines: { VSM_SAMPLES: 8 },
      uniforms: {
        shadow_pass: { value: null },
        resolution: { value: new Rt() },
        radius: { value: 4 },
      },
      vertexShader: wT,
      fragmentShader: AT,
    }),
    S = y.clone();
  S.defines.HORIZONTAL_PASS = 1;
  const T = new ti();
  T.setAttribute("position", new ei(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3));
  const E = new Hi(T, y),
    x = this;
  ((this.enabled = !1), (this.autoUpdate = !0), (this.needsUpdate = !1), (this.type = Ym));
  let _ = this.type;
  this.render = function (I, F, X) {
    if (x.enabled === !1 || (x.autoUpdate === !1 && x.needsUpdate === !1) || I.length === 0) return;
    const A = r.getRenderTarget(),
      b = r.getActiveCubeFace(),
      le = r.getActiveMipmapLevel(),
      ne = r.state;
    (ne.setBlending(xr),
      ne.buffers.color.setClear(1, 1, 1, 1),
      ne.buffers.depth.setTest(!0),
      ne.setScissorTest(!1));
    const pe = _ !== ki && this.type === ki,
      H = _ === ki && this.type !== ki;
    for (let J = 0, ie = I.length; J < ie; J++) {
      const ue = I[J],
        V = ue.shadow;
      if (V === void 0) {
        console.warn("THREE.WebGLShadowMap:", ue, "has no shadow.");
        continue;
      }
      if (V.autoUpdate === !1 && V.needsUpdate === !1) continue;
      a.copy(V.mapSize);
      const K = V.getFrameExtents();
      if (
        (a.multiply(K),
        l.copy(V.mapSize),
        (a.x > g || a.y > g) &&
          (a.x > g && ((l.x = Math.floor(g / K.x)), (a.x = l.x * K.x), (V.mapSize.x = l.x)),
          a.y > g && ((l.y = Math.floor(g / K.y)), (a.y = l.y * K.y), (V.mapSize.y = l.y))),
        V.map === null || pe === !0 || H === !0)
      ) {
        const L = this.type !== ki ? { minFilter: En, magFilter: En } : {};
        (V.map !== null && V.map.dispose(),
          (V.map = new $r(a.x, a.y, L)),
          (V.map.texture.name = ue.name + ".shadowMap"),
          V.camera.updateProjectionMatrix());
      }
      (r.setRenderTarget(V.map), r.clear());
      const j = V.getViewportCount();
      for (let L = 0; L < j; L++) {
        const W = V.getViewport(L);
        (f.set(l.x * W.x, l.y * W.y, l.x * W.z, l.y * W.w),
          ne.viewport(f),
          V.updateMatrices(ue, L),
          (s = V.getFrustum()),
          N(F, X, V.camera, ue, this.type));
      }
      (V.isPointLightShadow !== !0 && this.type === ki && D(V, X), (V.needsUpdate = !1));
    }
    ((_ = this.type), (x.needsUpdate = !1), r.setRenderTarget(A, b, le));
  };
  function D(I, F) {
    const X = e.update(E);
    (y.defines.VSM_SAMPLES !== I.blurSamples &&
      ((y.defines.VSM_SAMPLES = I.blurSamples),
      (S.defines.VSM_SAMPLES = I.blurSamples),
      (y.needsUpdate = !0),
      (S.needsUpdate = !0)),
      I.mapPass === null && (I.mapPass = new $r(a.x, a.y)),
      (y.uniforms.shadow_pass.value = I.map.texture),
      (y.uniforms.resolution.value = I.mapSize),
      (y.uniforms.radius.value = I.radius),
      r.setRenderTarget(I.mapPass),
      r.clear(),
      r.renderBufferDirect(F, null, X, y, E, null),
      (S.uniforms.shadow_pass.value = I.mapPass.texture),
      (S.uniforms.resolution.value = I.mapSize),
      (S.uniforms.radius.value = I.radius),
      r.setRenderTarget(I.map),
      r.clear(),
      r.renderBufferDirect(F, null, X, S, E, null));
  }
  function R(I, F, X, A) {
    let b = null;
    const le = X.isPointLight === !0 ? I.customDistanceMaterial : I.customDepthMaterial;
    if (le !== void 0) b = le;
    else if (
      ((b = X.isPointLight === !0 ? h : u),
      (r.localClippingEnabled &&
        F.clipShadows === !0 &&
        Array.isArray(F.clippingPlanes) &&
        F.clippingPlanes.length !== 0) ||
        (F.displacementMap && F.displacementScale !== 0) ||
        (F.alphaMap && F.alphaTest > 0) ||
        (F.map && F.alphaTest > 0))
    ) {
      const ne = b.uuid,
        pe = F.uuid;
      let H = m[ne];
      H === void 0 && ((H = {}), (m[ne] = H));
      let J = H[pe];
      (J === void 0 && ((J = b.clone()), (H[pe] = J), F.addEventListener("dispose", z)), (b = J));
    }
    if (
      ((b.visible = F.visible),
      (b.wireframe = F.wireframe),
      A === ki
        ? (b.side = F.shadowSide !== null ? F.shadowSide : F.side)
        : (b.side = F.shadowSide !== null ? F.shadowSide : v[F.side]),
      (b.alphaMap = F.alphaMap),
      (b.alphaTest = F.alphaTest),
      (b.map = F.map),
      (b.clipShadows = F.clipShadows),
      (b.clippingPlanes = F.clippingPlanes),
      (b.clipIntersection = F.clipIntersection),
      (b.displacementMap = F.displacementMap),
      (b.displacementScale = F.displacementScale),
      (b.displacementBias = F.displacementBias),
      (b.wireframeLinewidth = F.wireframeLinewidth),
      (b.linewidth = F.linewidth),
      X.isPointLight === !0 && b.isMeshDistanceMaterial === !0)
    ) {
      const ne = r.properties.get(b);
      ne.light = X;
    }
    return b;
  }
  function N(I, F, X, A, b) {
    if (I.visible === !1) return;
    if (
      I.layers.test(F.layers) &&
      (I.isMesh || I.isLine || I.isPoints) &&
      (I.castShadow || (I.receiveShadow && b === ki)) &&
      (!I.frustumCulled || s.intersectsObject(I))
    ) {
      I.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse, I.matrixWorld);
      const pe = e.update(I),
        H = I.material;
      if (Array.isArray(H)) {
        const J = pe.groups;
        for (let ie = 0, ue = J.length; ie < ue; ie++) {
          const V = J[ie],
            K = H[V.materialIndex];
          if (K && K.visible) {
            const j = R(I, K, A, b);
            (I.onBeforeShadow(r, I, F, X, pe, j, V),
              r.renderBufferDirect(X, null, pe, j, I, V),
              I.onAfterShadow(r, I, F, X, pe, j, V));
          }
        }
      } else if (H.visible) {
        const J = R(I, H, A, b);
        (I.onBeforeShadow(r, I, F, X, pe, J, null),
          r.renderBufferDirect(X, null, pe, J, I, null),
          I.onAfterShadow(r, I, F, X, pe, J, null));
      }
    }
    const ne = I.children;
    for (let pe = 0, H = ne.length; pe < H; pe++) N(ne[pe], F, X, A, b);
  }
  function z(I) {
    I.target.removeEventListener("dispose", z);
    for (const X in m) {
      const A = m[X],
        b = I.target.uuid;
      b in A && (A[b].dispose(), delete A[b]);
    }
  }
}
function CT(r, e, n) {
  const s = n.isWebGL2;
  function a() {
    let k = !1;
    const Re = new cn();
    let be = null;
    const Je = new cn(0, 0, 0, 0);
    return {
      setMask: function ($e) {
        be !== $e && !k && (r.colorMask($e, $e, $e, $e), (be = $e));
      },
      setLocked: function ($e) {
        k = $e;
      },
      setClear: function ($e, Et, Tt, Bt, en) {
        (en === !0 && (($e *= Bt), (Et *= Bt), (Tt *= Bt)),
          Re.set($e, Et, Tt, Bt),
          Je.equals(Re) === !1 && (r.clearColor($e, Et, Tt, Bt), Je.copy(Re)));
      },
      reset: function () {
        ((k = !1), (be = null), Je.set(-1, 0, 0, 0));
      },
    };
  }
  function l() {
    let k = !1,
      Re = null,
      be = null,
      Je = null;
    return {
      setTest: function ($e) {
        $e ? Ue(r.DEPTH_TEST) : Z(r.DEPTH_TEST);
      },
      setMask: function ($e) {
        Re !== $e && !k && (r.depthMask($e), (Re = $e));
      },
      setFunc: function ($e) {
        if (be !== $e) {
          switch ($e) {
            case U0:
              r.depthFunc(r.NEVER);
              break;
            case I0:
              r.depthFunc(r.ALWAYS);
              break;
            case F0:
              r.depthFunc(r.LESS);
              break;
            case Pl:
              r.depthFunc(r.LEQUAL);
              break;
            case O0:
              r.depthFunc(r.EQUAL);
              break;
            case k0:
              r.depthFunc(r.GEQUAL);
              break;
            case z0:
              r.depthFunc(r.GREATER);
              break;
            case B0:
              r.depthFunc(r.NOTEQUAL);
              break;
            default:
              r.depthFunc(r.LEQUAL);
          }
          be = $e;
        }
      },
      setLocked: function ($e) {
        k = $e;
      },
      setClear: function ($e) {
        Je !== $e && (r.clearDepth($e), (Je = $e));
      },
      reset: function () {
        ((k = !1), (Re = null), (be = null), (Je = null));
      },
    };
  }
  function f() {
    let k = !1,
      Re = null,
      be = null,
      Je = null,
      $e = null,
      Et = null,
      Tt = null,
      Bt = null,
      en = null;
    return {
      setTest: function (yt) {
        k || (yt ? Ue(r.STENCIL_TEST) : Z(r.STENCIL_TEST));
      },
      setMask: function (yt) {
        Re !== yt && !k && (r.stencilMask(yt), (Re = yt));
      },
      setFunc: function (yt, qt, un) {
        (be !== yt || Je !== qt || $e !== un) &&
          (r.stencilFunc(yt, qt, un), (be = yt), (Je = qt), ($e = un));
      },
      setOp: function (yt, qt, un) {
        (Et !== yt || Tt !== qt || Bt !== un) &&
          (r.stencilOp(yt, qt, un), (Et = yt), (Tt = qt), (Bt = un));
      },
      setLocked: function (yt) {
        k = yt;
      },
      setClear: function (yt) {
        en !== yt && (r.clearStencil(yt), (en = yt));
      },
      reset: function () {
        ((k = !1),
          (Re = null),
          (be = null),
          (Je = null),
          ($e = null),
          (Et = null),
          (Tt = null),
          (Bt = null),
          (en = null));
      },
    };
  }
  const u = new a(),
    h = new l(),
    m = new f(),
    g = new WeakMap(),
    v = new WeakMap();
  let y = {},
    S = {},
    T = new WeakMap(),
    E = [],
    x = null,
    _ = !1,
    D = null,
    R = null,
    N = null,
    z = null,
    I = null,
    F = null,
    X = null,
    A = new Mt(0, 0, 0),
    b = 0,
    le = !1,
    ne = null,
    pe = null,
    H = null,
    J = null,
    ie = null;
  const ue = r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let V = !1,
    K = 0;
  const j = r.getParameter(r.VERSION);
  j.indexOf("WebGL") !== -1
    ? ((K = parseFloat(/^WebGL (\d)/.exec(j)[1])), (V = K >= 1))
    : j.indexOf("OpenGL ES") !== -1 &&
      ((K = parseFloat(/^OpenGL ES (\d)/.exec(j)[1])), (V = K >= 2));
  let L = null,
    W = {};
  const q = r.getParameter(r.SCISSOR_BOX),
    ce = r.getParameter(r.VIEWPORT),
    me = new cn().fromArray(q),
    Te = new cn().fromArray(ce);
  function Me(k, Re, be, Je) {
    const $e = new Uint8Array(4),
      Et = r.createTexture();
    (r.bindTexture(k, Et),
      r.texParameteri(k, r.TEXTURE_MIN_FILTER, r.NEAREST),
      r.texParameteri(k, r.TEXTURE_MAG_FILTER, r.NEAREST));
    for (let Tt = 0; Tt < be; Tt++)
      s && (k === r.TEXTURE_3D || k === r.TEXTURE_2D_ARRAY)
        ? r.texImage3D(Re, 0, r.RGBA, 1, 1, Je, 0, r.RGBA, r.UNSIGNED_BYTE, $e)
        : r.texImage2D(Re + Tt, 0, r.RGBA, 1, 1, 0, r.RGBA, r.UNSIGNED_BYTE, $e);
    return Et;
  }
  const Pe = {};
  ((Pe[r.TEXTURE_2D] = Me(r.TEXTURE_2D, r.TEXTURE_2D, 1)),
    (Pe[r.TEXTURE_CUBE_MAP] = Me(r.TEXTURE_CUBE_MAP, r.TEXTURE_CUBE_MAP_POSITIVE_X, 6)),
    s &&
      ((Pe[r.TEXTURE_2D_ARRAY] = Me(r.TEXTURE_2D_ARRAY, r.TEXTURE_2D_ARRAY, 1, 1)),
      (Pe[r.TEXTURE_3D] = Me(r.TEXTURE_3D, r.TEXTURE_3D, 1, 1))),
    u.setClear(0, 0, 0, 1),
    h.setClear(1),
    m.setClear(0),
    Ue(r.DEPTH_TEST),
    h.setFunc(Pl),
    st(!1),
    P(dp),
    Ue(r.CULL_FACE),
    Fe(xr));
  function Ue(k) {
    y[k] !== !0 && (r.enable(k), (y[k] = !0));
  }
  function Z(k) {
    y[k] !== !1 && (r.disable(k), (y[k] = !1));
  }
  function fe(k, Re) {
    return S[k] !== Re
      ? (r.bindFramebuffer(k, Re),
        (S[k] = Re),
        s &&
          (k === r.DRAW_FRAMEBUFFER && (S[r.FRAMEBUFFER] = Re),
          k === r.FRAMEBUFFER && (S[r.DRAW_FRAMEBUFFER] = Re)),
        !0)
      : !1;
  }
  function B(k, Re) {
    let be = E,
      Je = !1;
    if (k)
      if (
        ((be = T.get(Re)),
        be === void 0 && ((be = []), T.set(Re, be)),
        k.isWebGLMultipleRenderTargets)
      ) {
        const $e = k.texture;
        if (be.length !== $e.length || be[0] !== r.COLOR_ATTACHMENT0) {
          for (let Et = 0, Tt = $e.length; Et < Tt; Et++) be[Et] = r.COLOR_ATTACHMENT0 + Et;
          ((be.length = $e.length), (Je = !0));
        }
      } else be[0] !== r.COLOR_ATTACHMENT0 && ((be[0] = r.COLOR_ATTACHMENT0), (Je = !0));
    else be[0] !== r.BACK && ((be[0] = r.BACK), (Je = !0));
    Je && (n.isWebGL2 ? r.drawBuffers(be) : e.get("WEBGL_draw_buffers").drawBuffersWEBGL(be));
  }
  function ze(k) {
    return x !== k ? (r.useProgram(k), (x = k), !0) : !1;
  }
  const he = { [Wr]: r.FUNC_ADD, [x0]: r.FUNC_SUBTRACT, [y0]: r.FUNC_REVERSE_SUBTRACT };
  if (s) ((he[gp] = r.MIN), (he[_p] = r.MAX));
  else {
    const k = e.get("EXT_blend_minmax");
    k !== null && ((he[gp] = k.MIN_EXT), (he[_p] = k.MAX_EXT));
  }
  const qe = {
    [S0]: r.ZERO,
    [M0]: r.ONE,
    [E0]: r.SRC_COLOR,
    [sf]: r.SRC_ALPHA,
    [b0]: r.SRC_ALPHA_SATURATE,
    [R0]: r.DST_COLOR,
    [w0]: r.DST_ALPHA,
    [T0]: r.ONE_MINUS_SRC_COLOR,
    [of]: r.ONE_MINUS_SRC_ALPHA,
    [C0]: r.ONE_MINUS_DST_COLOR,
    [A0]: r.ONE_MINUS_DST_ALPHA,
    [P0]: r.CONSTANT_COLOR,
    [L0]: r.ONE_MINUS_CONSTANT_COLOR,
    [D0]: r.CONSTANT_ALPHA,
    [N0]: r.ONE_MINUS_CONSTANT_ALPHA,
  };
  function Fe(k, Re, be, Je, $e, Et, Tt, Bt, en, yt) {
    if (k === xr) {
      _ === !0 && (Z(r.BLEND), (_ = !1));
      return;
    }
    if ((_ === !1 && (Ue(r.BLEND), (_ = !0)), k !== v0)) {
      if (k !== D || yt !== le) {
        if (((R !== Wr || I !== Wr) && (r.blendEquation(r.FUNC_ADD), (R = Wr), (I = Wr)), yt))
          switch (k) {
            case Bs:
              r.blendFuncSeparate(r.ONE, r.ONE_MINUS_SRC_ALPHA, r.ONE, r.ONE_MINUS_SRC_ALPHA);
              break;
            case hp:
              r.blendFunc(r.ONE, r.ONE);
              break;
            case pp:
              r.blendFuncSeparate(r.ZERO, r.ONE_MINUS_SRC_COLOR, r.ZERO, r.ONE);
              break;
            case mp:
              r.blendFuncSeparate(r.ZERO, r.SRC_COLOR, r.ZERO, r.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", k);
              break;
          }
        else
          switch (k) {
            case Bs:
              r.blendFuncSeparate(r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA, r.ONE, r.ONE_MINUS_SRC_ALPHA);
              break;
            case hp:
              r.blendFunc(r.SRC_ALPHA, r.ONE);
              break;
            case pp:
              r.blendFuncSeparate(r.ZERO, r.ONE_MINUS_SRC_COLOR, r.ZERO, r.ONE);
              break;
            case mp:
              r.blendFunc(r.ZERO, r.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", k);
              break;
          }
        ((N = null),
          (z = null),
          (F = null),
          (X = null),
          A.set(0, 0, 0),
          (b = 0),
          (D = k),
          (le = yt));
      }
      return;
    }
    (($e = $e || Re),
      (Et = Et || be),
      (Tt = Tt || Je),
      (Re !== R || $e !== I) && (r.blendEquationSeparate(he[Re], he[$e]), (R = Re), (I = $e)),
      (be !== N || Je !== z || Et !== F || Tt !== X) &&
        (r.blendFuncSeparate(qe[be], qe[Je], qe[Et], qe[Tt]),
        (N = be),
        (z = Je),
        (F = Et),
        (X = Tt)),
      (Bt.equals(A) === !1 || en !== b) &&
        (r.blendColor(Bt.r, Bt.g, Bt.b, en), A.copy(Bt), (b = en)),
      (D = k),
      (le = !1));
  }
  function Ct(k, Re) {
    k.side === zi ? Z(r.CULL_FACE) : Ue(r.CULL_FACE);
    let be = k.side === Un;
    (Re && (be = !be),
      st(be),
      k.blending === Bs && k.transparent === !1
        ? Fe(xr)
        : Fe(
            k.blending,
            k.blendEquation,
            k.blendSrc,
            k.blendDst,
            k.blendEquationAlpha,
            k.blendSrcAlpha,
            k.blendDstAlpha,
            k.blendColor,
            k.blendAlpha,
            k.premultipliedAlpha,
          ),
      h.setFunc(k.depthFunc),
      h.setTest(k.depthTest),
      h.setMask(k.depthWrite),
      u.setMask(k.colorWrite));
    const Je = k.stencilWrite;
    (m.setTest(Je),
      Je &&
        (m.setMask(k.stencilWriteMask),
        m.setFunc(k.stencilFunc, k.stencilRef, k.stencilFuncMask),
        m.setOp(k.stencilFail, k.stencilZFail, k.stencilZPass)),
      te(k.polygonOffset, k.polygonOffsetFactor, k.polygonOffsetUnits),
      k.alphaToCoverage === !0 ? Ue(r.SAMPLE_ALPHA_TO_COVERAGE) : Z(r.SAMPLE_ALPHA_TO_COVERAGE));
  }
  function st(k) {
    ne !== k && (k ? r.frontFace(r.CW) : r.frontFace(r.CCW), (ne = k));
  }
  function P(k) {
    (k !== m0
      ? (Ue(r.CULL_FACE),
        k !== pe &&
          (k === dp
            ? r.cullFace(r.BACK)
            : k === g0
              ? r.cullFace(r.FRONT)
              : r.cullFace(r.FRONT_AND_BACK)))
      : Z(r.CULL_FACE),
      (pe = k));
  }
  function w(k) {
    k !== H && (V && r.lineWidth(k), (H = k));
  }
  function te(k, Re, be) {
    k
      ? (Ue(r.POLYGON_OFFSET_FILL),
        (J !== Re || ie !== be) && (r.polygonOffset(Re, be), (J = Re), (ie = be)))
      : Z(r.POLYGON_OFFSET_FILL);
  }
  function Se(k) {
    k ? Ue(r.SCISSOR_TEST) : Z(r.SCISSOR_TEST);
  }
  function xe(k) {
    (k === void 0 && (k = r.TEXTURE0 + ue - 1), L !== k && (r.activeTexture(k), (L = k)));
  }
  function Ee(k, Re, be) {
    be === void 0 && (L === null ? (be = r.TEXTURE0 + ue - 1) : (be = L));
    let Je = W[be];
    (Je === void 0 && ((Je = { type: void 0, texture: void 0 }), (W[be] = Je)),
      (Je.type !== k || Je.texture !== Re) &&
        (L !== be && (r.activeTexture(be), (L = be)),
        r.bindTexture(k, Re || Pe[k]),
        (Je.type = k),
        (Je.texture = Re)));
  }
  function We() {
    const k = W[L];
    k !== void 0 &&
      k.type !== void 0 &&
      (r.bindTexture(k.type, null), (k.type = void 0), (k.texture = void 0));
  }
  function Le() {
    try {
      r.compressedTexImage2D.apply(r, arguments);
    } catch (k) {
      console.error("THREE.WebGLState:", k);
    }
  }
  function ke() {
    try {
      r.compressedTexImage3D.apply(r, arguments);
    } catch (k) {
      console.error("THREE.WebGLState:", k);
    }
  }
  function Ye() {
    try {
      r.texSubImage2D.apply(r, arguments);
    } catch (k) {
      console.error("THREE.WebGLState:", k);
    }
  }
  function ot() {
    try {
      r.texSubImage3D.apply(r, arguments);
    } catch (k) {
      console.error("THREE.WebGLState:", k);
    }
  }
  function ve() {
    try {
      r.compressedTexSubImage2D.apply(r, arguments);
    } catch (k) {
      console.error("THREE.WebGLState:", k);
    }
  }
  function mt() {
    try {
      r.compressedTexSubImage3D.apply(r, arguments);
    } catch (k) {
      console.error("THREE.WebGLState:", k);
    }
  }
  function dt() {
    try {
      r.texStorage2D.apply(r, arguments);
    } catch (k) {
      console.error("THREE.WebGLState:", k);
    }
  }
  function tt() {
    try {
      r.texStorage3D.apply(r, arguments);
    } catch (k) {
      console.error("THREE.WebGLState:", k);
    }
  }
  function je() {
    try {
      r.texImage2D.apply(r, arguments);
    } catch (k) {
      console.error("THREE.WebGLState:", k);
    }
  }
  function He() {
    try {
      r.texImage3D.apply(r, arguments);
    } catch (k) {
      console.error("THREE.WebGLState:", k);
    }
  }
  function it(k) {
    me.equals(k) === !1 && (r.scissor(k.x, k.y, k.z, k.w), me.copy(k));
  }
  function vt(k) {
    Te.equals(k) === !1 && (r.viewport(k.x, k.y, k.z, k.w), Te.copy(k));
  }
  function bt(k, Re) {
    let be = v.get(Re);
    be === void 0 && ((be = new WeakMap()), v.set(Re, be));
    let Je = be.get(k);
    Je === void 0 && ((Je = r.getUniformBlockIndex(Re, k.name)), be.set(k, Je));
  }
  function at(k, Re) {
    const Je = v.get(Re).get(k);
    g.get(Re) !== Je && (r.uniformBlockBinding(Re, Je, k.__bindingPointIndex), g.set(Re, Je));
  }
  function Ae() {
    (r.disable(r.BLEND),
      r.disable(r.CULL_FACE),
      r.disable(r.DEPTH_TEST),
      r.disable(r.POLYGON_OFFSET_FILL),
      r.disable(r.SCISSOR_TEST),
      r.disable(r.STENCIL_TEST),
      r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),
      r.blendEquation(r.FUNC_ADD),
      r.blendFunc(r.ONE, r.ZERO),
      r.blendFuncSeparate(r.ONE, r.ZERO, r.ONE, r.ZERO),
      r.blendColor(0, 0, 0, 0),
      r.colorMask(!0, !0, !0, !0),
      r.clearColor(0, 0, 0, 0),
      r.depthMask(!0),
      r.depthFunc(r.LESS),
      r.clearDepth(1),
      r.stencilMask(4294967295),
      r.stencilFunc(r.ALWAYS, 0, 4294967295),
      r.stencilOp(r.KEEP, r.KEEP, r.KEEP),
      r.clearStencil(0),
      r.cullFace(r.BACK),
      r.frontFace(r.CCW),
      r.polygonOffset(0, 0),
      r.activeTexture(r.TEXTURE0),
      r.bindFramebuffer(r.FRAMEBUFFER, null),
      s === !0 &&
        (r.bindFramebuffer(r.DRAW_FRAMEBUFFER, null), r.bindFramebuffer(r.READ_FRAMEBUFFER, null)),
      r.useProgram(null),
      r.lineWidth(1),
      r.scissor(0, 0, r.canvas.width, r.canvas.height),
      r.viewport(0, 0, r.canvas.width, r.canvas.height),
      (y = {}),
      (L = null),
      (W = {}),
      (S = {}),
      (T = new WeakMap()),
      (E = []),
      (x = null),
      (_ = !1),
      (D = null),
      (R = null),
      (N = null),
      (z = null),
      (I = null),
      (F = null),
      (X = null),
      (A = new Mt(0, 0, 0)),
      (b = 0),
      (le = !1),
      (ne = null),
      (pe = null),
      (H = null),
      (J = null),
      (ie = null),
      me.set(0, 0, r.canvas.width, r.canvas.height),
      Te.set(0, 0, r.canvas.width, r.canvas.height),
      u.reset(),
      h.reset(),
      m.reset());
  }
  return {
    buffers: { color: u, depth: h, stencil: m },
    enable: Ue,
    disable: Z,
    bindFramebuffer: fe,
    drawBuffers: B,
    useProgram: ze,
    setBlending: Fe,
    setMaterial: Ct,
    setFlipSided: st,
    setCullFace: P,
    setLineWidth: w,
    setPolygonOffset: te,
    setScissorTest: Se,
    activeTexture: xe,
    bindTexture: Ee,
    unbindTexture: We,
    compressedTexImage2D: Le,
    compressedTexImage3D: ke,
    texImage2D: je,
    texImage3D: He,
    updateUBOMapping: bt,
    uniformBlockBinding: at,
    texStorage2D: dt,
    texStorage3D: tt,
    texSubImage2D: Ye,
    texSubImage3D: ot,
    compressedTexSubImage2D: ve,
    compressedTexSubImage3D: mt,
    scissor: it,
    viewport: vt,
    reset: Ae,
  };
}
function bT(r, e, n, s, a, l, f) {
  const u = a.isWebGL2,
    h = e.has("WEBGL_multisampled_render_to_texture")
      ? e.get("WEBGL_multisampled_render_to_texture")
      : null,
    m = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent),
    g = new WeakMap();
  let v;
  const y = new WeakMap();
  let S = !1;
  try {
    S = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {}
  function T(P, w) {
    return S ? new OffscreenCanvas(P, w) : Fl("canvas");
  }
  function E(P, w, te, Se) {
    let xe = 1;
    if (
      ((P.width > Se || P.height > Se) && (xe = Se / Math.max(P.width, P.height)),
      xe < 1 || w === !0)
    )
      if (
        (typeof HTMLImageElement < "u" && P instanceof HTMLImageElement) ||
        (typeof HTMLCanvasElement < "u" && P instanceof HTMLCanvasElement) ||
        (typeof ImageBitmap < "u" && P instanceof ImageBitmap)
      ) {
        const Ee = w ? Il : Math.floor,
          We = Ee(xe * P.width),
          Le = Ee(xe * P.height);
        v === void 0 && (v = T(We, Le));
        const ke = te ? T(We, Le) : v;
        return (
          (ke.width = We),
          (ke.height = Le),
          ke.getContext("2d").drawImage(P, 0, 0, We, Le),
          console.warn(
            "THREE.WebGLRenderer: Texture has been resized from (" +
              P.width +
              "x" +
              P.height +
              ") to (" +
              We +
              "x" +
              Le +
              ").",
          ),
          ke
        );
      } else
        return (
          "data" in P &&
            console.warn(
              "THREE.WebGLRenderer: Image in DataTexture is too big (" +
                P.width +
                "x" +
                P.height +
                ").",
            ),
          P
        );
    return P;
  }
  function x(P) {
    return df(P.width) && df(P.height);
  }
  function _(P) {
    return u ? !1 : P.wrapS !== di || P.wrapT !== di || (P.minFilter !== En && P.minFilter !== Qn);
  }
  function D(P, w) {
    return P.generateMipmaps && w && P.minFilter !== En && P.minFilter !== Qn;
  }
  function R(P) {
    r.generateMipmap(P);
  }
  function N(P, w, te, Se, xe = !1) {
    if (u === !1) return w;
    if (P !== null) {
      if (r[P] !== void 0) return r[P];
      console.warn(
        "THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + P + "'",
      );
    }
    let Ee = w;
    if (
      (w === r.RED &&
        (te === r.FLOAT && (Ee = r.R32F),
        te === r.HALF_FLOAT && (Ee = r.R16F),
        te === r.UNSIGNED_BYTE && (Ee = r.R8)),
      w === r.RED_INTEGER &&
        (te === r.UNSIGNED_BYTE && (Ee = r.R8UI),
        te === r.UNSIGNED_SHORT && (Ee = r.R16UI),
        te === r.UNSIGNED_INT && (Ee = r.R32UI),
        te === r.BYTE && (Ee = r.R8I),
        te === r.SHORT && (Ee = r.R16I),
        te === r.INT && (Ee = r.R32I)),
      w === r.RG &&
        (te === r.FLOAT && (Ee = r.RG32F),
        te === r.HALF_FLOAT && (Ee = r.RG16F),
        te === r.UNSIGNED_BYTE && (Ee = r.RG8)),
      w === r.RGBA)
    ) {
      const We = xe ? Ll : At.getTransfer(Se);
      (te === r.FLOAT && (Ee = r.RGBA32F),
        te === r.HALF_FLOAT && (Ee = r.RGBA16F),
        te === r.UNSIGNED_BYTE && (Ee = We === It ? r.SRGB8_ALPHA8 : r.RGBA8),
        te === r.UNSIGNED_SHORT_4_4_4_4 && (Ee = r.RGBA4),
        te === r.UNSIGNED_SHORT_5_5_5_1 && (Ee = r.RGB5_A1));
    }
    return (
      (Ee === r.R16F ||
        Ee === r.R32F ||
        Ee === r.RG16F ||
        Ee === r.RG32F ||
        Ee === r.RGBA16F ||
        Ee === r.RGBA32F) &&
        e.get("EXT_color_buffer_float"),
      Ee
    );
  }
  function z(P, w, te) {
    return D(P, te) === !0 || (P.isFramebufferTexture && P.minFilter !== En && P.minFilter !== Qn)
      ? Math.log2(Math.max(w.width, w.height)) + 1
      : P.mipmaps !== void 0 && P.mipmaps.length > 0
        ? P.mipmaps.length
        : P.isCompressedTexture && Array.isArray(P.image)
          ? w.mipmaps.length
          : 1;
  }
  function I(P) {
    return P === En || P === vp || P === Au ? r.NEAREST : r.LINEAR;
  }
  function F(P) {
    const w = P.target;
    (w.removeEventListener("dispose", F), A(w), w.isVideoTexture && g.delete(w));
  }
  function X(P) {
    const w = P.target;
    (w.removeEventListener("dispose", X), le(w));
  }
  function A(P) {
    const w = s.get(P);
    if (w.__webglInit === void 0) return;
    const te = P.source,
      Se = y.get(te);
    if (Se) {
      const xe = Se[w.__cacheKey];
      (xe.usedTimes--, xe.usedTimes === 0 && b(P), Object.keys(Se).length === 0 && y.delete(te));
    }
    s.remove(P);
  }
  function b(P) {
    const w = s.get(P);
    r.deleteTexture(w.__webglTexture);
    const te = P.source,
      Se = y.get(te);
    (delete Se[w.__cacheKey], f.memory.textures--);
  }
  function le(P) {
    const w = P.texture,
      te = s.get(P),
      Se = s.get(w);
    if (
      (Se.__webglTexture !== void 0 && (r.deleteTexture(Se.__webglTexture), f.memory.textures--),
      P.depthTexture && P.depthTexture.dispose(),
      P.isWebGLCubeRenderTarget)
    )
      for (let xe = 0; xe < 6; xe++) {
        if (Array.isArray(te.__webglFramebuffer[xe]))
          for (let Ee = 0; Ee < te.__webglFramebuffer[xe].length; Ee++)
            r.deleteFramebuffer(te.__webglFramebuffer[xe][Ee]);
        else r.deleteFramebuffer(te.__webglFramebuffer[xe]);
        te.__webglDepthbuffer && r.deleteRenderbuffer(te.__webglDepthbuffer[xe]);
      }
    else {
      if (Array.isArray(te.__webglFramebuffer))
        for (let xe = 0; xe < te.__webglFramebuffer.length; xe++)
          r.deleteFramebuffer(te.__webglFramebuffer[xe]);
      else r.deleteFramebuffer(te.__webglFramebuffer);
      if (
        (te.__webglDepthbuffer && r.deleteRenderbuffer(te.__webglDepthbuffer),
        te.__webglMultisampledFramebuffer && r.deleteFramebuffer(te.__webglMultisampledFramebuffer),
        te.__webglColorRenderbuffer)
      )
        for (let xe = 0; xe < te.__webglColorRenderbuffer.length; xe++)
          te.__webglColorRenderbuffer[xe] && r.deleteRenderbuffer(te.__webglColorRenderbuffer[xe]);
      te.__webglDepthRenderbuffer && r.deleteRenderbuffer(te.__webglDepthRenderbuffer);
    }
    if (P.isWebGLMultipleRenderTargets)
      for (let xe = 0, Ee = w.length; xe < Ee; xe++) {
        const We = s.get(w[xe]);
        (We.__webglTexture && (r.deleteTexture(We.__webglTexture), f.memory.textures--),
          s.remove(w[xe]));
      }
    (s.remove(w), s.remove(P));
  }
  let ne = 0;
  function pe() {
    ne = 0;
  }
  function H() {
    const P = ne;
    return (
      P >= a.maxTextures &&
        console.warn(
          "THREE.WebGLTextures: Trying to use " +
            P +
            " texture units while this GPU supports only " +
            a.maxTextures,
        ),
      (ne += 1),
      P
    );
  }
  function J(P) {
    const w = [];
    return (
      w.push(P.wrapS),
      w.push(P.wrapT),
      w.push(P.wrapR || 0),
      w.push(P.magFilter),
      w.push(P.minFilter),
      w.push(P.anisotropy),
      w.push(P.internalFormat),
      w.push(P.format),
      w.push(P.type),
      w.push(P.generateMipmaps),
      w.push(P.premultiplyAlpha),
      w.push(P.flipY),
      w.push(P.unpackAlignment),
      w.push(P.colorSpace),
      w.join()
    );
  }
  function ie(P, w) {
    const te = s.get(P);
    if (
      (P.isVideoTexture && Ct(P),
      P.isRenderTargetTexture === !1 && P.version > 0 && te.__version !== P.version)
    ) {
      const Se = P.image;
      if (Se === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (Se.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        me(te, P, w);
        return;
      }
    }
    n.bindTexture(r.TEXTURE_2D, te.__webglTexture, r.TEXTURE0 + w);
  }
  function ue(P, w) {
    const te = s.get(P);
    if (P.version > 0 && te.__version !== P.version) {
      me(te, P, w);
      return;
    }
    n.bindTexture(r.TEXTURE_2D_ARRAY, te.__webglTexture, r.TEXTURE0 + w);
  }
  function V(P, w) {
    const te = s.get(P);
    if (P.version > 0 && te.__version !== P.version) {
      me(te, P, w);
      return;
    }
    n.bindTexture(r.TEXTURE_3D, te.__webglTexture, r.TEXTURE0 + w);
  }
  function K(P, w) {
    const te = s.get(P);
    if (P.version > 0 && te.__version !== P.version) {
      Te(te, P, w);
      return;
    }
    n.bindTexture(r.TEXTURE_CUBE_MAP, te.__webglTexture, r.TEXTURE0 + w);
  }
  const j = { [cf]: r.REPEAT, [di]: r.CLAMP_TO_EDGE, [uf]: r.MIRRORED_REPEAT },
    L = {
      [En]: r.NEAREST,
      [vp]: r.NEAREST_MIPMAP_NEAREST,
      [Au]: r.NEAREST_MIPMAP_LINEAR,
      [Qn]: r.LINEAR,
      [$0]: r.LINEAR_MIPMAP_NEAREST,
      [Ho]: r.LINEAR_MIPMAP_LINEAR,
    },
    W = {
      [lx]: r.NEVER,
      [px]: r.ALWAYS,
      [cx]: r.LESS,
      [sg]: r.LEQUAL,
      [ux]: r.EQUAL,
      [hx]: r.GEQUAL,
      [fx]: r.GREATER,
      [dx]: r.NOTEQUAL,
    };
  function q(P, w, te) {
    if (
      (te
        ? (r.texParameteri(P, r.TEXTURE_WRAP_S, j[w.wrapS]),
          r.texParameteri(P, r.TEXTURE_WRAP_T, j[w.wrapT]),
          (P === r.TEXTURE_3D || P === r.TEXTURE_2D_ARRAY) &&
            r.texParameteri(P, r.TEXTURE_WRAP_R, j[w.wrapR]),
          r.texParameteri(P, r.TEXTURE_MAG_FILTER, L[w.magFilter]),
          r.texParameteri(P, r.TEXTURE_MIN_FILTER, L[w.minFilter]))
        : (r.texParameteri(P, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE),
          r.texParameteri(P, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE),
          (P === r.TEXTURE_3D || P === r.TEXTURE_2D_ARRAY) &&
            r.texParameteri(P, r.TEXTURE_WRAP_R, r.CLAMP_TO_EDGE),
          (w.wrapS !== di || w.wrapT !== di) &&
            console.warn(
              "THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.",
            ),
          r.texParameteri(P, r.TEXTURE_MAG_FILTER, I(w.magFilter)),
          r.texParameteri(P, r.TEXTURE_MIN_FILTER, I(w.minFilter)),
          w.minFilter !== En &&
            w.minFilter !== Qn &&
            console.warn(
              "THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.",
            )),
      w.compareFunction &&
        (r.texParameteri(P, r.TEXTURE_COMPARE_MODE, r.COMPARE_REF_TO_TEXTURE),
        r.texParameteri(P, r.TEXTURE_COMPARE_FUNC, W[w.compareFunction])),
      e.has("EXT_texture_filter_anisotropic") === !0)
    ) {
      const Se = e.get("EXT_texture_filter_anisotropic");
      if (
        w.magFilter === En ||
        (w.minFilter !== Au && w.minFilter !== Ho) ||
        (w.type === vr && e.has("OES_texture_float_linear") === !1) ||
        (u === !1 && w.type === Go && e.has("OES_texture_half_float_linear") === !1)
      )
        return;
      (w.anisotropy > 1 || s.get(w).__currentAnisotropy) &&
        (r.texParameterf(
          P,
          Se.TEXTURE_MAX_ANISOTROPY_EXT,
          Math.min(w.anisotropy, a.getMaxAnisotropy()),
        ),
        (s.get(w).__currentAnisotropy = w.anisotropy));
    }
  }
  function ce(P, w) {
    let te = !1;
    P.__webglInit === void 0 && ((P.__webglInit = !0), w.addEventListener("dispose", F));
    const Se = w.source;
    let xe = y.get(Se);
    xe === void 0 && ((xe = {}), y.set(Se, xe));
    const Ee = J(w);
    if (Ee !== P.__cacheKey) {
      (xe[Ee] === void 0 &&
        ((xe[Ee] = { texture: r.createTexture(), usedTimes: 0 }), f.memory.textures++, (te = !0)),
        xe[Ee].usedTimes++);
      const We = xe[P.__cacheKey];
      (We !== void 0 && (xe[P.__cacheKey].usedTimes--, We.usedTimes === 0 && b(w)),
        (P.__cacheKey = Ee),
        (P.__webglTexture = xe[Ee].texture));
    }
    return te;
  }
  function me(P, w, te) {
    let Se = r.TEXTURE_2D;
    ((w.isDataArrayTexture || w.isCompressedArrayTexture) && (Se = r.TEXTURE_2D_ARRAY),
      w.isData3DTexture && (Se = r.TEXTURE_3D));
    const xe = ce(P, w),
      Ee = w.source;
    n.bindTexture(Se, P.__webglTexture, r.TEXTURE0 + te);
    const We = s.get(Ee);
    if (Ee.version !== We.__version || xe === !0) {
      n.activeTexture(r.TEXTURE0 + te);
      const Le = At.getPrimaries(At.workingColorSpace),
        ke = w.colorSpace === Jn ? null : At.getPrimaries(w.colorSpace),
        Ye = w.colorSpace === Jn || Le === ke ? r.NONE : r.BROWSER_DEFAULT_WEBGL;
      (r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, w.flipY),
        r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, w.premultiplyAlpha),
        r.pixelStorei(r.UNPACK_ALIGNMENT, w.unpackAlignment),
        r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL, Ye));
      const ot = _(w) && x(w.image) === !1;
      let ve = E(w.image, ot, !1, a.maxTextureSize);
      ve = st(w, ve);
      const mt = x(ve) || u,
        dt = l.convert(w.format, w.colorSpace);
      let tt = l.convert(w.type),
        je = N(w.internalFormat, dt, tt, w.colorSpace, w.isVideoTexture);
      q(Se, w, mt);
      let He;
      const it = w.mipmaps,
        vt = u && w.isVideoTexture !== !0 && je !== ig,
        bt = We.__version === void 0 || xe === !0,
        at = z(w, ve, mt);
      if (w.isDepthTexture)
        ((je = r.DEPTH_COMPONENT),
          u
            ? w.type === vr
              ? (je = r.DEPTH_COMPONENT32F)
              : w.type === _r
                ? (je = r.DEPTH_COMPONENT24)
                : w.type === jr
                  ? (je = r.DEPTH24_STENCIL8)
                  : (je = r.DEPTH_COMPONENT16)
            : w.type === vr &&
              console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),
          w.format === qr &&
            je === r.DEPTH_COMPONENT &&
            w.type !== vf &&
            w.type !== _r &&
            (console.warn(
              "THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.",
            ),
            (w.type = _r),
            (tt = l.convert(w.type))),
          w.format === Ws &&
            je === r.DEPTH_COMPONENT &&
            ((je = r.DEPTH_STENCIL),
            w.type !== jr &&
              (console.warn(
                "THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.",
              ),
              (w.type = jr),
              (tt = l.convert(w.type)))),
          bt &&
            (vt
              ? n.texStorage2D(r.TEXTURE_2D, 1, je, ve.width, ve.height)
              : n.texImage2D(r.TEXTURE_2D, 0, je, ve.width, ve.height, 0, dt, tt, null)));
      else if (w.isDataTexture)
        if (it.length > 0 && mt) {
          vt && bt && n.texStorage2D(r.TEXTURE_2D, at, je, it[0].width, it[0].height);
          for (let Ae = 0, k = it.length; Ae < k; Ae++)
            ((He = it[Ae]),
              vt
                ? n.texSubImage2D(r.TEXTURE_2D, Ae, 0, 0, He.width, He.height, dt, tt, He.data)
                : n.texImage2D(r.TEXTURE_2D, Ae, je, He.width, He.height, 0, dt, tt, He.data));
          w.generateMipmaps = !1;
        } else
          vt
            ? (bt && n.texStorage2D(r.TEXTURE_2D, at, je, ve.width, ve.height),
              n.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, ve.width, ve.height, dt, tt, ve.data))
            : n.texImage2D(r.TEXTURE_2D, 0, je, ve.width, ve.height, 0, dt, tt, ve.data);
      else if (w.isCompressedTexture)
        if (w.isCompressedArrayTexture) {
          vt &&
            bt &&
            n.texStorage3D(r.TEXTURE_2D_ARRAY, at, je, it[0].width, it[0].height, ve.depth);
          for (let Ae = 0, k = it.length; Ae < k; Ae++)
            ((He = it[Ae]),
              w.format !== hi
                ? dt !== null
                  ? vt
                    ? n.compressedTexSubImage3D(
                        r.TEXTURE_2D_ARRAY,
                        Ae,
                        0,
                        0,
                        0,
                        He.width,
                        He.height,
                        ve.depth,
                        dt,
                        He.data,
                        0,
                        0,
                      )
                    : n.compressedTexImage3D(
                        r.TEXTURE_2D_ARRAY,
                        Ae,
                        je,
                        He.width,
                        He.height,
                        ve.depth,
                        0,
                        He.data,
                        0,
                        0,
                      )
                  : console.warn(
                      "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()",
                    )
                : vt
                  ? n.texSubImage3D(
                      r.TEXTURE_2D_ARRAY,
                      Ae,
                      0,
                      0,
                      0,
                      He.width,
                      He.height,
                      ve.depth,
                      dt,
                      tt,
                      He.data,
                    )
                  : n.texImage3D(
                      r.TEXTURE_2D_ARRAY,
                      Ae,
                      je,
                      He.width,
                      He.height,
                      ve.depth,
                      0,
                      dt,
                      tt,
                      He.data,
                    ));
        } else {
          vt && bt && n.texStorage2D(r.TEXTURE_2D, at, je, it[0].width, it[0].height);
          for (let Ae = 0, k = it.length; Ae < k; Ae++)
            ((He = it[Ae]),
              w.format !== hi
                ? dt !== null
                  ? vt
                    ? n.compressedTexSubImage2D(
                        r.TEXTURE_2D,
                        Ae,
                        0,
                        0,
                        He.width,
                        He.height,
                        dt,
                        He.data,
                      )
                    : n.compressedTexImage2D(r.TEXTURE_2D, Ae, je, He.width, He.height, 0, He.data)
                  : console.warn(
                      "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()",
                    )
                : vt
                  ? n.texSubImage2D(r.TEXTURE_2D, Ae, 0, 0, He.width, He.height, dt, tt, He.data)
                  : n.texImage2D(r.TEXTURE_2D, Ae, je, He.width, He.height, 0, dt, tt, He.data));
        }
      else if (w.isDataArrayTexture)
        vt
          ? (bt && n.texStorage3D(r.TEXTURE_2D_ARRAY, at, je, ve.width, ve.height, ve.depth),
            n.texSubImage3D(
              r.TEXTURE_2D_ARRAY,
              0,
              0,
              0,
              0,
              ve.width,
              ve.height,
              ve.depth,
              dt,
              tt,
              ve.data,
            ))
          : n.texImage3D(
              r.TEXTURE_2D_ARRAY,
              0,
              je,
              ve.width,
              ve.height,
              ve.depth,
              0,
              dt,
              tt,
              ve.data,
            );
      else if (w.isData3DTexture)
        vt
          ? (bt && n.texStorage3D(r.TEXTURE_3D, at, je, ve.width, ve.height, ve.depth),
            n.texSubImage3D(
              r.TEXTURE_3D,
              0,
              0,
              0,
              0,
              ve.width,
              ve.height,
              ve.depth,
              dt,
              tt,
              ve.data,
            ))
          : n.texImage3D(r.TEXTURE_3D, 0, je, ve.width, ve.height, ve.depth, 0, dt, tt, ve.data);
      else if (w.isFramebufferTexture) {
        if (bt)
          if (vt) n.texStorage2D(r.TEXTURE_2D, at, je, ve.width, ve.height);
          else {
            let Ae = ve.width,
              k = ve.height;
            for (let Re = 0; Re < at; Re++)
              (n.texImage2D(r.TEXTURE_2D, Re, je, Ae, k, 0, dt, tt, null), (Ae >>= 1), (k >>= 1));
          }
      } else if (it.length > 0 && mt) {
        vt && bt && n.texStorage2D(r.TEXTURE_2D, at, je, it[0].width, it[0].height);
        for (let Ae = 0, k = it.length; Ae < k; Ae++)
          ((He = it[Ae]),
            vt
              ? n.texSubImage2D(r.TEXTURE_2D, Ae, 0, 0, dt, tt, He)
              : n.texImage2D(r.TEXTURE_2D, Ae, je, dt, tt, He));
        w.generateMipmaps = !1;
      } else
        vt
          ? (bt && n.texStorage2D(r.TEXTURE_2D, at, je, ve.width, ve.height),
            n.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, dt, tt, ve))
          : n.texImage2D(r.TEXTURE_2D, 0, je, dt, tt, ve);
      (D(w, mt) && R(Se), (We.__version = Ee.version), w.onUpdate && w.onUpdate(w));
    }
    P.__version = w.version;
  }
  function Te(P, w, te) {
    if (w.image.length !== 6) return;
    const Se = ce(P, w),
      xe = w.source;
    n.bindTexture(r.TEXTURE_CUBE_MAP, P.__webglTexture, r.TEXTURE0 + te);
    const Ee = s.get(xe);
    if (xe.version !== Ee.__version || Se === !0) {
      n.activeTexture(r.TEXTURE0 + te);
      const We = At.getPrimaries(At.workingColorSpace),
        Le = w.colorSpace === Jn ? null : At.getPrimaries(w.colorSpace),
        ke = w.colorSpace === Jn || We === Le ? r.NONE : r.BROWSER_DEFAULT_WEBGL;
      (r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, w.flipY),
        r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, w.premultiplyAlpha),
        r.pixelStorei(r.UNPACK_ALIGNMENT, w.unpackAlignment),
        r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL, ke));
      const Ye = w.isCompressedTexture || w.image[0].isCompressedTexture,
        ot = w.image[0] && w.image[0].isDataTexture,
        ve = [];
      for (let Ae = 0; Ae < 6; Ae++)
        (!Ye && !ot
          ? (ve[Ae] = E(w.image[Ae], !1, !0, a.maxCubemapSize))
          : (ve[Ae] = ot ? w.image[Ae].image : w.image[Ae]),
          (ve[Ae] = st(w, ve[Ae])));
      const mt = ve[0],
        dt = x(mt) || u,
        tt = l.convert(w.format, w.colorSpace),
        je = l.convert(w.type),
        He = N(w.internalFormat, tt, je, w.colorSpace),
        it = u && w.isVideoTexture !== !0,
        vt = Ee.__version === void 0 || Se === !0;
      let bt = z(w, mt, dt);
      q(r.TEXTURE_CUBE_MAP, w, dt);
      let at;
      if (Ye) {
        it && vt && n.texStorage2D(r.TEXTURE_CUBE_MAP, bt, He, mt.width, mt.height);
        for (let Ae = 0; Ae < 6; Ae++) {
          at = ve[Ae].mipmaps;
          for (let k = 0; k < at.length; k++) {
            const Re = at[k];
            w.format !== hi
              ? tt !== null
                ? it
                  ? n.compressedTexSubImage2D(
                      r.TEXTURE_CUBE_MAP_POSITIVE_X + Ae,
                      k,
                      0,
                      0,
                      Re.width,
                      Re.height,
                      tt,
                      Re.data,
                    )
                  : n.compressedTexImage2D(
                      r.TEXTURE_CUBE_MAP_POSITIVE_X + Ae,
                      k,
                      He,
                      Re.width,
                      Re.height,
                      0,
                      Re.data,
                    )
                : console.warn(
                    "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()",
                  )
              : it
                ? n.texSubImage2D(
                    r.TEXTURE_CUBE_MAP_POSITIVE_X + Ae,
                    k,
                    0,
                    0,
                    Re.width,
                    Re.height,
                    tt,
                    je,
                    Re.data,
                  )
                : n.texImage2D(
                    r.TEXTURE_CUBE_MAP_POSITIVE_X + Ae,
                    k,
                    He,
                    Re.width,
                    Re.height,
                    0,
                    tt,
                    je,
                    Re.data,
                  );
          }
        }
      } else {
        ((at = w.mipmaps),
          it &&
            vt &&
            (at.length > 0 && bt++,
            n.texStorage2D(r.TEXTURE_CUBE_MAP, bt, He, ve[0].width, ve[0].height)));
        for (let Ae = 0; Ae < 6; Ae++)
          if (ot) {
            it
              ? n.texSubImage2D(
                  r.TEXTURE_CUBE_MAP_POSITIVE_X + Ae,
                  0,
                  0,
                  0,
                  ve[Ae].width,
                  ve[Ae].height,
                  tt,
                  je,
                  ve[Ae].data,
                )
              : n.texImage2D(
                  r.TEXTURE_CUBE_MAP_POSITIVE_X + Ae,
                  0,
                  He,
                  ve[Ae].width,
                  ve[Ae].height,
                  0,
                  tt,
                  je,
                  ve[Ae].data,
                );
            for (let k = 0; k < at.length; k++) {
              const be = at[k].image[Ae].image;
              it
                ? n.texSubImage2D(
                    r.TEXTURE_CUBE_MAP_POSITIVE_X + Ae,
                    k + 1,
                    0,
                    0,
                    be.width,
                    be.height,
                    tt,
                    je,
                    be.data,
                  )
                : n.texImage2D(
                    r.TEXTURE_CUBE_MAP_POSITIVE_X + Ae,
                    k + 1,
                    He,
                    be.width,
                    be.height,
                    0,
                    tt,
                    je,
                    be.data,
                  );
            }
          } else {
            it
              ? n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + Ae, 0, 0, 0, tt, je, ve[Ae])
              : n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + Ae, 0, He, tt, je, ve[Ae]);
            for (let k = 0; k < at.length; k++) {
              const Re = at[k];
              it
                ? n.texSubImage2D(
                    r.TEXTURE_CUBE_MAP_POSITIVE_X + Ae,
                    k + 1,
                    0,
                    0,
                    tt,
                    je,
                    Re.image[Ae],
                  )
                : n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + Ae, k + 1, He, tt, je, Re.image[Ae]);
            }
          }
      }
      (D(w, dt) && R(r.TEXTURE_CUBE_MAP), (Ee.__version = xe.version), w.onUpdate && w.onUpdate(w));
    }
    P.__version = w.version;
  }
  function Me(P, w, te, Se, xe, Ee) {
    const We = l.convert(te.format, te.colorSpace),
      Le = l.convert(te.type),
      ke = N(te.internalFormat, We, Le, te.colorSpace);
    if (!s.get(w).__hasExternalTextures) {
      const ot = Math.max(1, w.width >> Ee),
        ve = Math.max(1, w.height >> Ee);
      xe === r.TEXTURE_3D || xe === r.TEXTURE_2D_ARRAY
        ? n.texImage3D(xe, Ee, ke, ot, ve, w.depth, 0, We, Le, null)
        : n.texImage2D(xe, Ee, ke, ot, ve, 0, We, Le, null);
    }
    (n.bindFramebuffer(r.FRAMEBUFFER, P),
      Fe(w)
        ? h.framebufferTexture2DMultisampleEXT(
            r.FRAMEBUFFER,
            Se,
            xe,
            s.get(te).__webglTexture,
            0,
            qe(w),
          )
        : (xe === r.TEXTURE_2D ||
            (xe >= r.TEXTURE_CUBE_MAP_POSITIVE_X && xe <= r.TEXTURE_CUBE_MAP_NEGATIVE_Z)) &&
          r.framebufferTexture2D(r.FRAMEBUFFER, Se, xe, s.get(te).__webglTexture, Ee),
      n.bindFramebuffer(r.FRAMEBUFFER, null));
  }
  function Pe(P, w, te) {
    if ((r.bindRenderbuffer(r.RENDERBUFFER, P), w.depthBuffer && !w.stencilBuffer)) {
      let Se = u === !0 ? r.DEPTH_COMPONENT24 : r.DEPTH_COMPONENT16;
      if (te || Fe(w)) {
        const xe = w.depthTexture;
        xe &&
          xe.isDepthTexture &&
          (xe.type === vr
            ? (Se = r.DEPTH_COMPONENT32F)
            : xe.type === _r && (Se = r.DEPTH_COMPONENT24));
        const Ee = qe(w);
        Fe(w)
          ? h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER, Ee, Se, w.width, w.height)
          : r.renderbufferStorageMultisample(r.RENDERBUFFER, Ee, Se, w.width, w.height);
      } else r.renderbufferStorage(r.RENDERBUFFER, Se, w.width, w.height);
      r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_ATTACHMENT, r.RENDERBUFFER, P);
    } else if (w.depthBuffer && w.stencilBuffer) {
      const Se = qe(w);
      (te && Fe(w) === !1
        ? r.renderbufferStorageMultisample(
            r.RENDERBUFFER,
            Se,
            r.DEPTH24_STENCIL8,
            w.width,
            w.height,
          )
        : Fe(w)
          ? h.renderbufferStorageMultisampleEXT(
              r.RENDERBUFFER,
              Se,
              r.DEPTH24_STENCIL8,
              w.width,
              w.height,
            )
          : r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_STENCIL, w.width, w.height),
        r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_STENCIL_ATTACHMENT, r.RENDERBUFFER, P));
    } else {
      const Se = w.isWebGLMultipleRenderTargets === !0 ? w.texture : [w.texture];
      for (let xe = 0; xe < Se.length; xe++) {
        const Ee = Se[xe],
          We = l.convert(Ee.format, Ee.colorSpace),
          Le = l.convert(Ee.type),
          ke = N(Ee.internalFormat, We, Le, Ee.colorSpace),
          Ye = qe(w);
        te && Fe(w) === !1
          ? r.renderbufferStorageMultisample(r.RENDERBUFFER, Ye, ke, w.width, w.height)
          : Fe(w)
            ? h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER, Ye, ke, w.width, w.height)
            : r.renderbufferStorage(r.RENDERBUFFER, ke, w.width, w.height);
      }
    }
    r.bindRenderbuffer(r.RENDERBUFFER, null);
  }
  function Ue(P, w) {
    if (w && w.isWebGLCubeRenderTarget)
      throw new Error("Depth Texture with cube render targets is not supported");
    if ((n.bindFramebuffer(r.FRAMEBUFFER, P), !(w.depthTexture && w.depthTexture.isDepthTexture)))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    ((!s.get(w.depthTexture).__webglTexture ||
      w.depthTexture.image.width !== w.width ||
      w.depthTexture.image.height !== w.height) &&
      ((w.depthTexture.image.width = w.width),
      (w.depthTexture.image.height = w.height),
      (w.depthTexture.needsUpdate = !0)),
      ie(w.depthTexture, 0));
    const Se = s.get(w.depthTexture).__webglTexture,
      xe = qe(w);
    if (w.depthTexture.format === qr)
      Fe(w)
        ? h.framebufferTexture2DMultisampleEXT(
            r.FRAMEBUFFER,
            r.DEPTH_ATTACHMENT,
            r.TEXTURE_2D,
            Se,
            0,
            xe,
          )
        : r.framebufferTexture2D(r.FRAMEBUFFER, r.DEPTH_ATTACHMENT, r.TEXTURE_2D, Se, 0);
    else if (w.depthTexture.format === Ws)
      Fe(w)
        ? h.framebufferTexture2DMultisampleEXT(
            r.FRAMEBUFFER,
            r.DEPTH_STENCIL_ATTACHMENT,
            r.TEXTURE_2D,
            Se,
            0,
            xe,
          )
        : r.framebufferTexture2D(r.FRAMEBUFFER, r.DEPTH_STENCIL_ATTACHMENT, r.TEXTURE_2D, Se, 0);
    else throw new Error("Unknown depthTexture format");
  }
  function Z(P) {
    const w = s.get(P),
      te = P.isWebGLCubeRenderTarget === !0;
    if (P.depthTexture && !w.__autoAllocateDepthBuffer) {
      if (te) throw new Error("target.depthTexture not supported in Cube render targets");
      Ue(w.__webglFramebuffer, P);
    } else if (te) {
      w.__webglDepthbuffer = [];
      for (let Se = 0; Se < 6; Se++)
        (n.bindFramebuffer(r.FRAMEBUFFER, w.__webglFramebuffer[Se]),
          (w.__webglDepthbuffer[Se] = r.createRenderbuffer()),
          Pe(w.__webglDepthbuffer[Se], P, !1));
    } else
      (n.bindFramebuffer(r.FRAMEBUFFER, w.__webglFramebuffer),
        (w.__webglDepthbuffer = r.createRenderbuffer()),
        Pe(w.__webglDepthbuffer, P, !1));
    n.bindFramebuffer(r.FRAMEBUFFER, null);
  }
  function fe(P, w, te) {
    const Se = s.get(P);
    (w !== void 0 && Me(Se.__webglFramebuffer, P, P.texture, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, 0),
      te !== void 0 && Z(P));
  }
  function B(P) {
    const w = P.texture,
      te = s.get(P),
      Se = s.get(w);
    (P.addEventListener("dispose", X),
      P.isWebGLMultipleRenderTargets !== !0 &&
        (Se.__webglTexture === void 0 && (Se.__webglTexture = r.createTexture()),
        (Se.__version = w.version),
        f.memory.textures++));
    const xe = P.isWebGLCubeRenderTarget === !0,
      Ee = P.isWebGLMultipleRenderTargets === !0,
      We = x(P) || u;
    if (xe) {
      te.__webglFramebuffer = [];
      for (let Le = 0; Le < 6; Le++)
        if (u && w.mipmaps && w.mipmaps.length > 0) {
          te.__webglFramebuffer[Le] = [];
          for (let ke = 0; ke < w.mipmaps.length; ke++)
            te.__webglFramebuffer[Le][ke] = r.createFramebuffer();
        } else te.__webglFramebuffer[Le] = r.createFramebuffer();
    } else {
      if (u && w.mipmaps && w.mipmaps.length > 0) {
        te.__webglFramebuffer = [];
        for (let Le = 0; Le < w.mipmaps.length; Le++)
          te.__webglFramebuffer[Le] = r.createFramebuffer();
      } else te.__webglFramebuffer = r.createFramebuffer();
      if (Ee)
        if (a.drawBuffers) {
          const Le = P.texture;
          for (let ke = 0, Ye = Le.length; ke < Ye; ke++) {
            const ot = s.get(Le[ke]);
            ot.__webglTexture === void 0 &&
              ((ot.__webglTexture = r.createTexture()), f.memory.textures++);
          }
        } else
          console.warn(
            "THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.",
          );
      if (u && P.samples > 0 && Fe(P) === !1) {
        const Le = Ee ? w : [w];
        ((te.__webglMultisampledFramebuffer = r.createFramebuffer()),
          (te.__webglColorRenderbuffer = []),
          n.bindFramebuffer(r.FRAMEBUFFER, te.__webglMultisampledFramebuffer));
        for (let ke = 0; ke < Le.length; ke++) {
          const Ye = Le[ke];
          ((te.__webglColorRenderbuffer[ke] = r.createRenderbuffer()),
            r.bindRenderbuffer(r.RENDERBUFFER, te.__webglColorRenderbuffer[ke]));
          const ot = l.convert(Ye.format, Ye.colorSpace),
            ve = l.convert(Ye.type),
            mt = N(Ye.internalFormat, ot, ve, Ye.colorSpace, P.isXRRenderTarget === !0),
            dt = qe(P);
          (r.renderbufferStorageMultisample(r.RENDERBUFFER, dt, mt, P.width, P.height),
            r.framebufferRenderbuffer(
              r.FRAMEBUFFER,
              r.COLOR_ATTACHMENT0 + ke,
              r.RENDERBUFFER,
              te.__webglColorRenderbuffer[ke],
            ));
        }
        (r.bindRenderbuffer(r.RENDERBUFFER, null),
          P.depthBuffer &&
            ((te.__webglDepthRenderbuffer = r.createRenderbuffer()),
            Pe(te.__webglDepthRenderbuffer, P, !0)),
          n.bindFramebuffer(r.FRAMEBUFFER, null));
      }
    }
    if (xe) {
      (n.bindTexture(r.TEXTURE_CUBE_MAP, Se.__webglTexture), q(r.TEXTURE_CUBE_MAP, w, We));
      for (let Le = 0; Le < 6; Le++)
        if (u && w.mipmaps && w.mipmaps.length > 0)
          for (let ke = 0; ke < w.mipmaps.length; ke++)
            Me(
              te.__webglFramebuffer[Le][ke],
              P,
              w,
              r.COLOR_ATTACHMENT0,
              r.TEXTURE_CUBE_MAP_POSITIVE_X + Le,
              ke,
            );
        else
          Me(
            te.__webglFramebuffer[Le],
            P,
            w,
            r.COLOR_ATTACHMENT0,
            r.TEXTURE_CUBE_MAP_POSITIVE_X + Le,
            0,
          );
      (D(w, We) && R(r.TEXTURE_CUBE_MAP), n.unbindTexture());
    } else if (Ee) {
      const Le = P.texture;
      for (let ke = 0, Ye = Le.length; ke < Ye; ke++) {
        const ot = Le[ke],
          ve = s.get(ot);
        (n.bindTexture(r.TEXTURE_2D, ve.__webglTexture),
          q(r.TEXTURE_2D, ot, We),
          Me(te.__webglFramebuffer, P, ot, r.COLOR_ATTACHMENT0 + ke, r.TEXTURE_2D, 0),
          D(ot, We) && R(r.TEXTURE_2D));
      }
      n.unbindTexture();
    } else {
      let Le = r.TEXTURE_2D;
      if (
        ((P.isWebGL3DRenderTarget || P.isWebGLArrayRenderTarget) &&
          (u
            ? (Le = P.isWebGL3DRenderTarget ? r.TEXTURE_3D : r.TEXTURE_2D_ARRAY)
            : console.error(
                "THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.",
              )),
        n.bindTexture(Le, Se.__webglTexture),
        q(Le, w, We),
        u && w.mipmaps && w.mipmaps.length > 0)
      )
        for (let ke = 0; ke < w.mipmaps.length; ke++)
          Me(te.__webglFramebuffer[ke], P, w, r.COLOR_ATTACHMENT0, Le, ke);
      else Me(te.__webglFramebuffer, P, w, r.COLOR_ATTACHMENT0, Le, 0);
      (D(w, We) && R(Le), n.unbindTexture());
    }
    P.depthBuffer && Z(P);
  }
  function ze(P) {
    const w = x(P) || u,
      te = P.isWebGLMultipleRenderTargets === !0 ? P.texture : [P.texture];
    for (let Se = 0, xe = te.length; Se < xe; Se++) {
      const Ee = te[Se];
      if (D(Ee, w)) {
        const We = P.isWebGLCubeRenderTarget ? r.TEXTURE_CUBE_MAP : r.TEXTURE_2D,
          Le = s.get(Ee).__webglTexture;
        (n.bindTexture(We, Le), R(We), n.unbindTexture());
      }
    }
  }
  function he(P) {
    if (u && P.samples > 0 && Fe(P) === !1) {
      const w = P.isWebGLMultipleRenderTargets ? P.texture : [P.texture],
        te = P.width,
        Se = P.height;
      let xe = r.COLOR_BUFFER_BIT;
      const Ee = [],
        We = P.stencilBuffer ? r.DEPTH_STENCIL_ATTACHMENT : r.DEPTH_ATTACHMENT,
        Le = s.get(P),
        ke = P.isWebGLMultipleRenderTargets === !0;
      if (ke)
        for (let Ye = 0; Ye < w.length; Ye++)
          (n.bindFramebuffer(r.FRAMEBUFFER, Le.__webglMultisampledFramebuffer),
            r.framebufferRenderbuffer(
              r.FRAMEBUFFER,
              r.COLOR_ATTACHMENT0 + Ye,
              r.RENDERBUFFER,
              null,
            ),
            n.bindFramebuffer(r.FRAMEBUFFER, Le.__webglFramebuffer),
            r.framebufferTexture2D(
              r.DRAW_FRAMEBUFFER,
              r.COLOR_ATTACHMENT0 + Ye,
              r.TEXTURE_2D,
              null,
              0,
            ));
      (n.bindFramebuffer(r.READ_FRAMEBUFFER, Le.__webglMultisampledFramebuffer),
        n.bindFramebuffer(r.DRAW_FRAMEBUFFER, Le.__webglFramebuffer));
      for (let Ye = 0; Ye < w.length; Ye++) {
        (Ee.push(r.COLOR_ATTACHMENT0 + Ye), P.depthBuffer && Ee.push(We));
        const ot = Le.__ignoreDepthValues !== void 0 ? Le.__ignoreDepthValues : !1;
        if (
          (ot === !1 &&
            (P.depthBuffer && (xe |= r.DEPTH_BUFFER_BIT),
            P.stencilBuffer && (xe |= r.STENCIL_BUFFER_BIT)),
          ke &&
            r.framebufferRenderbuffer(
              r.READ_FRAMEBUFFER,
              r.COLOR_ATTACHMENT0,
              r.RENDERBUFFER,
              Le.__webglColorRenderbuffer[Ye],
            ),
          ot === !0 &&
            (r.invalidateFramebuffer(r.READ_FRAMEBUFFER, [We]),
            r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER, [We])),
          ke)
        ) {
          const ve = s.get(w[Ye]).__webglTexture;
          r.framebufferTexture2D(r.DRAW_FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, ve, 0);
        }
        (r.blitFramebuffer(0, 0, te, Se, 0, 0, te, Se, xe, r.NEAREST),
          m && r.invalidateFramebuffer(r.READ_FRAMEBUFFER, Ee));
      }
      if (
        (n.bindFramebuffer(r.READ_FRAMEBUFFER, null),
        n.bindFramebuffer(r.DRAW_FRAMEBUFFER, null),
        ke)
      )
        for (let Ye = 0; Ye < w.length; Ye++) {
          (n.bindFramebuffer(r.FRAMEBUFFER, Le.__webglMultisampledFramebuffer),
            r.framebufferRenderbuffer(
              r.FRAMEBUFFER,
              r.COLOR_ATTACHMENT0 + Ye,
              r.RENDERBUFFER,
              Le.__webglColorRenderbuffer[Ye],
            ));
          const ot = s.get(w[Ye]).__webglTexture;
          (n.bindFramebuffer(r.FRAMEBUFFER, Le.__webglFramebuffer),
            r.framebufferTexture2D(
              r.DRAW_FRAMEBUFFER,
              r.COLOR_ATTACHMENT0 + Ye,
              r.TEXTURE_2D,
              ot,
              0,
            ));
        }
      n.bindFramebuffer(r.DRAW_FRAMEBUFFER, Le.__webglMultisampledFramebuffer);
    }
  }
  function qe(P) {
    return Math.min(a.maxSamples, P.samples);
  }
  function Fe(P) {
    const w = s.get(P);
    return (
      u &&
      P.samples > 0 &&
      e.has("WEBGL_multisampled_render_to_texture") === !0 &&
      w.__useRenderToTexture !== !1
    );
  }
  function Ct(P) {
    const w = f.render.frame;
    g.get(P) !== w && (g.set(P, w), P.update());
  }
  function st(P, w) {
    const te = P.colorSpace,
      Se = P.format,
      xe = P.type;
    return (
      P.isCompressedTexture === !0 ||
        P.isVideoTexture === !0 ||
        P.format === ff ||
        (te !== Gi &&
          te !== Jn &&
          (At.getTransfer(te) === It
            ? u === !1
              ? e.has("EXT_sRGB") === !0 && Se === hi
                ? ((P.format = ff), (P.minFilter = Qn), (P.generateMipmaps = !1))
                : (w = ag.sRGBToLinear(w))
              : (Se !== hi || xe !== Sr) &&
                console.warn(
                  "THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.",
                )
            : console.error("THREE.WebGLTextures: Unsupported texture color space:", te))),
      w
    );
  }
  ((this.allocateTextureUnit = H),
    (this.resetTextureUnits = pe),
    (this.setTexture2D = ie),
    (this.setTexture2DArray = ue),
    (this.setTexture3D = V),
    (this.setTextureCube = K),
    (this.rebindTextures = fe),
    (this.setupRenderTarget = B),
    (this.updateRenderTargetMipmap = ze),
    (this.updateMultisampleRenderTarget = he),
    (this.setupDepthRenderbuffer = Z),
    (this.setupFrameBufferTexture = Me),
    (this.useMultisampledRTT = Fe));
}
function PT(r, e, n) {
  const s = n.isWebGL2;
  function a(l, f = Jn) {
    let u;
    const h = At.getTransfer(f);
    if (l === Sr) return r.UNSIGNED_BYTE;
    if (l === Qm) return r.UNSIGNED_SHORT_4_4_4_4;
    if (l === Jm) return r.UNSIGNED_SHORT_5_5_5_1;
    if (l === K0) return r.BYTE;
    if (l === Z0) return r.SHORT;
    if (l === vf) return r.UNSIGNED_SHORT;
    if (l === Zm) return r.INT;
    if (l === _r) return r.UNSIGNED_INT;
    if (l === vr) return r.FLOAT;
    if (l === Go)
      return s
        ? r.HALF_FLOAT
        : ((u = e.get("OES_texture_half_float")), u !== null ? u.HALF_FLOAT_OES : null);
    if (l === Q0) return r.ALPHA;
    if (l === hi) return r.RGBA;
    if (l === J0) return r.LUMINANCE;
    if (l === ex) return r.LUMINANCE_ALPHA;
    if (l === qr) return r.DEPTH_COMPONENT;
    if (l === Ws) return r.DEPTH_STENCIL;
    if (l === ff) return ((u = e.get("EXT_sRGB")), u !== null ? u.SRGB_ALPHA_EXT : null);
    if (l === tx) return r.RED;
    if (l === eg) return r.RED_INTEGER;
    if (l === nx) return r.RG;
    if (l === tg) return r.RG_INTEGER;
    if (l === ng) return r.RGBA_INTEGER;
    if (l === Ru || l === Cu || l === bu || l === Pu)
      if (h === It)
        if (((u = e.get("WEBGL_compressed_texture_s3tc_srgb")), u !== null)) {
          if (l === Ru) return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (l === Cu) return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (l === bu) return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (l === Pu) return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else return null;
      else if (((u = e.get("WEBGL_compressed_texture_s3tc")), u !== null)) {
        if (l === Ru) return u.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (l === Cu) return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (l === bu) return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (l === Pu) return u.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else return null;
    if (l === xp || l === yp || l === Sp || l === Mp)
      if (((u = e.get("WEBGL_compressed_texture_pvrtc")), u !== null)) {
        if (l === xp) return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (l === yp) return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (l === Sp) return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (l === Mp) return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else return null;
    if (l === ig)
      return (
        (u = e.get("WEBGL_compressed_texture_etc1")),
        u !== null ? u.COMPRESSED_RGB_ETC1_WEBGL : null
      );
    if (l === Ep || l === Tp)
      if (((u = e.get("WEBGL_compressed_texture_etc")), u !== null)) {
        if (l === Ep) return h === It ? u.COMPRESSED_SRGB8_ETC2 : u.COMPRESSED_RGB8_ETC2;
        if (l === Tp)
          return h === It ? u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : u.COMPRESSED_RGBA8_ETC2_EAC;
      } else return null;
    if (
      l === wp ||
      l === Ap ||
      l === Rp ||
      l === Cp ||
      l === bp ||
      l === Pp ||
      l === Lp ||
      l === Dp ||
      l === Np ||
      l === Up ||
      l === Ip ||
      l === Fp ||
      l === Op ||
      l === kp
    )
      if (((u = e.get("WEBGL_compressed_texture_astc")), u !== null)) {
        if (l === wp)
          return h === It ? u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : u.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (l === Ap)
          return h === It ? u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : u.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (l === Rp)
          return h === It ? u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : u.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (l === Cp)
          return h === It ? u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : u.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (l === bp)
          return h === It ? u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : u.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (l === Pp)
          return h === It ? u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : u.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (l === Lp)
          return h === It ? u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : u.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (l === Dp)
          return h === It ? u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : u.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (l === Np)
          return h === It
            ? u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR
            : u.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (l === Up)
          return h === It
            ? u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR
            : u.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (l === Ip)
          return h === It
            ? u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR
            : u.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (l === Fp)
          return h === It
            ? u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR
            : u.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (l === Op)
          return h === It
            ? u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR
            : u.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (l === kp)
          return h === It
            ? u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR
            : u.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else return null;
    if (l === Lu || l === zp || l === Bp)
      if (((u = e.get("EXT_texture_compression_bptc")), u !== null)) {
        if (l === Lu)
          return h === It
            ? u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT
            : u.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (l === zp) return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (l === Bp) return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else return null;
    if (l === ix || l === Hp || l === Gp || l === Vp)
      if (((u = e.get("EXT_texture_compression_rgtc")), u !== null)) {
        if (l === Lu) return u.COMPRESSED_RED_RGTC1_EXT;
        if (l === Hp) return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (l === Gp) return u.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (l === Vp) return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else return null;
    return l === jr
      ? s
        ? r.UNSIGNED_INT_24_8
        : ((u = e.get("WEBGL_depth_texture")), u !== null ? u.UNSIGNED_INT_24_8_WEBGL : null)
      : r[l] !== void 0
        ? r[l]
        : null;
  }
  return { convert: a };
}
class LT extends Hn {
  constructor(e = []) {
    (super(), (this.isArrayCamera = !0), (this.cameras = e));
  }
}
class El extends wn {
  constructor() {
    (super(), (this.isGroup = !0), (this.type = "Group"));
  }
}
const DT = { type: "move" };
class ef {
  constructor() {
    ((this._targetRay = null), (this._grip = null), (this._hand = null));
  }
  getHandSpace() {
    return (
      this._hand === null &&
        ((this._hand = new El()),
        (this._hand.matrixAutoUpdate = !1),
        (this._hand.visible = !1),
        (this._hand.joints = {}),
        (this._hand.inputState = { pinching: !1 })),
      this._hand
    );
  }
  getTargetRaySpace() {
    return (
      this._targetRay === null &&
        ((this._targetRay = new El()),
        (this._targetRay.matrixAutoUpdate = !1),
        (this._targetRay.visible = !1),
        (this._targetRay.hasLinearVelocity = !1),
        (this._targetRay.linearVelocity = new ee()),
        (this._targetRay.hasAngularVelocity = !1),
        (this._targetRay.angularVelocity = new ee())),
      this._targetRay
    );
  }
  getGripSpace() {
    return (
      this._grip === null &&
        ((this._grip = new El()),
        (this._grip.matrixAutoUpdate = !1),
        (this._grip.visible = !1),
        (this._grip.hasLinearVelocity = !1),
        (this._grip.linearVelocity = new ee()),
        (this._grip.hasAngularVelocity = !1),
        (this._grip.angularVelocity = new ee())),
      this._grip
    );
  }
  dispatchEvent(e) {
    return (
      this._targetRay !== null && this._targetRay.dispatchEvent(e),
      this._grip !== null && this._grip.dispatchEvent(e),
      this._hand !== null && this._hand.dispatchEvent(e),
      this
    );
  }
  connect(e) {
    if (e && e.hand) {
      const n = this._hand;
      if (n) for (const s of e.hand.values()) this._getHandJoint(n, s);
    }
    return (this.dispatchEvent({ type: "connected", data: e }), this);
  }
  disconnect(e) {
    return (
      this.dispatchEvent({ type: "disconnected", data: e }),
      this._targetRay !== null && (this._targetRay.visible = !1),
      this._grip !== null && (this._grip.visible = !1),
      this._hand !== null && (this._hand.visible = !1),
      this
    );
  }
  update(e, n, s) {
    let a = null,
      l = null,
      f = null;
    const u = this._targetRay,
      h = this._grip,
      m = this._hand;
    if (e && n.session.visibilityState !== "visible-blurred") {
      if (m && e.hand) {
        f = !0;
        for (const E of e.hand.values()) {
          const x = n.getJointPose(E, s),
            _ = this._getHandJoint(m, E);
          (x !== null &&
            (_.matrix.fromArray(x.transform.matrix),
            _.matrix.decompose(_.position, _.rotation, _.scale),
            (_.matrixWorldNeedsUpdate = !0),
            (_.jointRadius = x.radius)),
            (_.visible = x !== null));
        }
        const g = m.joints["index-finger-tip"],
          v = m.joints["thumb-tip"],
          y = g.position.distanceTo(v.position),
          S = 0.02,
          T = 0.005;
        m.inputState.pinching && y > S + T
          ? ((m.inputState.pinching = !1),
            this.dispatchEvent({ type: "pinchend", handedness: e.handedness, target: this }))
          : !m.inputState.pinching &&
            y <= S - T &&
            ((m.inputState.pinching = !0),
            this.dispatchEvent({ type: "pinchstart", handedness: e.handedness, target: this }));
      } else
        h !== null &&
          e.gripSpace &&
          ((l = n.getPose(e.gripSpace, s)),
          l !== null &&
            (h.matrix.fromArray(l.transform.matrix),
            h.matrix.decompose(h.position, h.rotation, h.scale),
            (h.matrixWorldNeedsUpdate = !0),
            l.linearVelocity
              ? ((h.hasLinearVelocity = !0), h.linearVelocity.copy(l.linearVelocity))
              : (h.hasLinearVelocity = !1),
            l.angularVelocity
              ? ((h.hasAngularVelocity = !0), h.angularVelocity.copy(l.angularVelocity))
              : (h.hasAngularVelocity = !1)));
      u !== null &&
        ((a = n.getPose(e.targetRaySpace, s)),
        a === null && l !== null && (a = l),
        a !== null &&
          (u.matrix.fromArray(a.transform.matrix),
          u.matrix.decompose(u.position, u.rotation, u.scale),
          (u.matrixWorldNeedsUpdate = !0),
          a.linearVelocity
            ? ((u.hasLinearVelocity = !0), u.linearVelocity.copy(a.linearVelocity))
            : (u.hasLinearVelocity = !1),
          a.angularVelocity
            ? ((u.hasAngularVelocity = !0), u.angularVelocity.copy(a.angularVelocity))
            : (u.hasAngularVelocity = !1),
          this.dispatchEvent(DT)));
    }
    return (
      u !== null && (u.visible = a !== null),
      h !== null && (h.visible = l !== null),
      m !== null && (m.visible = f !== null),
      this
    );
  }
  _getHandJoint(e, n) {
    if (e.joints[n.jointName] === void 0) {
      const s = new El();
      ((s.matrixAutoUpdate = !1), (s.visible = !1), (e.joints[n.jointName] = s), e.add(s));
    }
    return e.joints[n.jointName];
  }
}
class NT extends qs {
  constructor(e, n) {
    super();
    const s = this;
    let a = null,
      l = 1,
      f = null,
      u = "local-floor",
      h = 1,
      m = null,
      g = null,
      v = null,
      y = null,
      S = null,
      T = null;
    const E = n.getContextAttributes();
    let x = null,
      _ = null;
    const D = [],
      R = [],
      N = new Rt();
    let z = null;
    const I = new Hn();
    (I.layers.enable(1), (I.viewport = new cn()));
    const F = new Hn();
    (F.layers.enable(2), (F.viewport = new cn()));
    const X = [I, F],
      A = new LT();
    (A.layers.enable(1), A.layers.enable(2));
    let b = null,
      le = null;
    ((this.cameraAutoUpdate = !0),
      (this.enabled = !1),
      (this.isPresenting = !1),
      (this.getController = function (q) {
        let ce = D[q];
        return (ce === void 0 && ((ce = new ef()), (D[q] = ce)), ce.getTargetRaySpace());
      }),
      (this.getControllerGrip = function (q) {
        let ce = D[q];
        return (ce === void 0 && ((ce = new ef()), (D[q] = ce)), ce.getGripSpace());
      }),
      (this.getHand = function (q) {
        let ce = D[q];
        return (ce === void 0 && ((ce = new ef()), (D[q] = ce)), ce.getHandSpace());
      }));
    function ne(q) {
      const ce = R.indexOf(q.inputSource);
      if (ce === -1) return;
      const me = D[ce];
      me !== void 0 &&
        (me.update(q.inputSource, q.frame, m || f),
        me.dispatchEvent({ type: q.type, data: q.inputSource }));
    }
    function pe() {
      (a.removeEventListener("select", ne),
        a.removeEventListener("selectstart", ne),
        a.removeEventListener("selectend", ne),
        a.removeEventListener("squeeze", ne),
        a.removeEventListener("squeezestart", ne),
        a.removeEventListener("squeezeend", ne),
        a.removeEventListener("end", pe),
        a.removeEventListener("inputsourceschange", H));
      for (let q = 0; q < D.length; q++) {
        const ce = R[q];
        ce !== null && ((R[q] = null), D[q].disconnect(ce));
      }
      ((b = null),
        (le = null),
        e.setRenderTarget(x),
        (S = null),
        (y = null),
        (v = null),
        (a = null),
        (_ = null),
        W.stop(),
        (s.isPresenting = !1),
        e.setPixelRatio(z),
        e.setSize(N.width, N.height, !1),
        s.dispatchEvent({ type: "sessionend" }));
    }
    ((this.setFramebufferScaleFactor = function (q) {
      ((l = q),
        s.isPresenting === !0 &&
          console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting."));
    }),
      (this.setReferenceSpaceType = function (q) {
        ((u = q),
          s.isPresenting === !0 &&
            console.warn(
              "THREE.WebXRManager: Cannot change reference space type while presenting.",
            ));
      }),
      (this.getReferenceSpace = function () {
        return m || f;
      }),
      (this.setReferenceSpace = function (q) {
        m = q;
      }),
      (this.getBaseLayer = function () {
        return y !== null ? y : S;
      }),
      (this.getBinding = function () {
        return v;
      }),
      (this.getFrame = function () {
        return T;
      }),
      (this.getSession = function () {
        return a;
      }),
      (this.setSession = async function (q) {
        if (((a = q), a !== null)) {
          if (
            ((x = e.getRenderTarget()),
            a.addEventListener("select", ne),
            a.addEventListener("selectstart", ne),
            a.addEventListener("selectend", ne),
            a.addEventListener("squeeze", ne),
            a.addEventListener("squeezestart", ne),
            a.addEventListener("squeezeend", ne),
            a.addEventListener("end", pe),
            a.addEventListener("inputsourceschange", H),
            E.xrCompatible !== !0 && (await n.makeXRCompatible()),
            (z = e.getPixelRatio()),
            e.getSize(N),
            a.renderState.layers === void 0 || e.capabilities.isWebGL2 === !1)
          ) {
            const ce = {
              antialias: a.renderState.layers === void 0 ? E.antialias : !0,
              alpha: !0,
              depth: E.depth,
              stencil: E.stencil,
              framebufferScaleFactor: l,
            };
            ((S = new XRWebGLLayer(a, n, ce)),
              a.updateRenderState({ baseLayer: S }),
              e.setPixelRatio(1),
              e.setSize(S.framebufferWidth, S.framebufferHeight, !1),
              (_ = new $r(S.framebufferWidth, S.framebufferHeight, {
                format: hi,
                type: Sr,
                colorSpace: e.outputColorSpace,
                stencilBuffer: E.stencil,
              })));
          } else {
            let ce = null,
              me = null,
              Te = null;
            E.depth &&
              ((Te = E.stencil ? n.DEPTH24_STENCIL8 : n.DEPTH_COMPONENT24),
              (ce = E.stencil ? Ws : qr),
              (me = E.stencil ? jr : _r));
            const Me = { colorFormat: n.RGBA8, depthFormat: Te, scaleFactor: l };
            ((v = new XRWebGLBinding(a, n)),
              (y = v.createProjectionLayer(Me)),
              a.updateRenderState({ layers: [y] }),
              e.setPixelRatio(1),
              e.setSize(y.textureWidth, y.textureHeight, !1),
              (_ = new $r(y.textureWidth, y.textureHeight, {
                format: hi,
                type: Sr,
                depthTexture: new xg(
                  y.textureWidth,
                  y.textureHeight,
                  me,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  ce,
                ),
                stencilBuffer: E.stencil,
                colorSpace: e.outputColorSpace,
                samples: E.antialias ? 4 : 0,
              })));
            const Pe = e.properties.get(_);
            Pe.__ignoreDepthValues = y.ignoreDepthValues;
          }
          ((_.isXRRenderTarget = !0),
            this.setFoveation(h),
            (m = null),
            (f = await a.requestReferenceSpace(u)),
            W.setContext(a),
            W.start(),
            (s.isPresenting = !0),
            s.dispatchEvent({ type: "sessionstart" }));
        }
      }),
      (this.getEnvironmentBlendMode = function () {
        if (a !== null) return a.environmentBlendMode;
      }));
    function H(q) {
      for (let ce = 0; ce < q.removed.length; ce++) {
        const me = q.removed[ce],
          Te = R.indexOf(me);
        Te >= 0 && ((R[Te] = null), D[Te].disconnect(me));
      }
      for (let ce = 0; ce < q.added.length; ce++) {
        const me = q.added[ce];
        let Te = R.indexOf(me);
        if (Te === -1) {
          for (let Pe = 0; Pe < D.length; Pe++)
            if (Pe >= R.length) {
              (R.push(me), (Te = Pe));
              break;
            } else if (R[Pe] === null) {
              ((R[Pe] = me), (Te = Pe));
              break;
            }
          if (Te === -1) break;
        }
        const Me = D[Te];
        Me && Me.connect(me);
      }
    }
    const J = new ee(),
      ie = new ee();
    function ue(q, ce, me) {
      (J.setFromMatrixPosition(ce.matrixWorld), ie.setFromMatrixPosition(me.matrixWorld));
      const Te = J.distanceTo(ie),
        Me = ce.projectionMatrix.elements,
        Pe = me.projectionMatrix.elements,
        Ue = Me[14] / (Me[10] - 1),
        Z = Me[14] / (Me[10] + 1),
        fe = (Me[9] + 1) / Me[5],
        B = (Me[9] - 1) / Me[5],
        ze = (Me[8] - 1) / Me[0],
        he = (Pe[8] + 1) / Pe[0],
        qe = Ue * ze,
        Fe = Ue * he,
        Ct = Te / (-ze + he),
        st = Ct * -ze;
      (ce.matrixWorld.decompose(q.position, q.quaternion, q.scale),
        q.translateX(st),
        q.translateZ(Ct),
        q.matrixWorld.compose(q.position, q.quaternion, q.scale),
        q.matrixWorldInverse.copy(q.matrixWorld).invert());
      const P = Ue + Ct,
        w = Z + Ct,
        te = qe - st,
        Se = Fe + (Te - st),
        xe = ((fe * Z) / w) * P,
        Ee = ((B * Z) / w) * P;
      (q.projectionMatrix.makePerspective(te, Se, xe, Ee, P, w),
        q.projectionMatrixInverse.copy(q.projectionMatrix).invert());
    }
    function V(q, ce) {
      (ce === null
        ? q.matrixWorld.copy(q.matrix)
        : q.matrixWorld.multiplyMatrices(ce.matrixWorld, q.matrix),
        q.matrixWorldInverse.copy(q.matrixWorld).invert());
    }
    this.updateCamera = function (q) {
      if (a === null) return;
      ((A.near = F.near = I.near = q.near),
        (A.far = F.far = I.far = q.far),
        (b !== A.near || le !== A.far) &&
          (a.updateRenderState({ depthNear: A.near, depthFar: A.far }),
          (b = A.near),
          (le = A.far)));
      const ce = q.parent,
        me = A.cameras;
      V(A, ce);
      for (let Te = 0; Te < me.length; Te++) V(me[Te], ce);
      (me.length === 2 ? ue(A, I, F) : A.projectionMatrix.copy(I.projectionMatrix), K(q, A, ce));
    };
    function K(q, ce, me) {
      (me === null
        ? q.matrix.copy(ce.matrixWorld)
        : (q.matrix.copy(me.matrixWorld), q.matrix.invert(), q.matrix.multiply(ce.matrixWorld)),
        q.matrix.decompose(q.position, q.quaternion, q.scale),
        q.updateMatrixWorld(!0),
        q.projectionMatrix.copy(ce.projectionMatrix),
        q.projectionMatrixInverse.copy(ce.projectionMatrixInverse),
        q.isPerspectiveCamera &&
          ((q.fov = Vo * 2 * Math.atan(1 / q.projectionMatrix.elements[5])), (q.zoom = 1)));
    }
    ((this.getCamera = function () {
      return A;
    }),
      (this.getFoveation = function () {
        if (!(y === null && S === null)) return h;
      }),
      (this.setFoveation = function (q) {
        ((h = q),
          y !== null && (y.fixedFoveation = q),
          S !== null && S.fixedFoveation !== void 0 && (S.fixedFoveation = q));
      }));
    let j = null;
    function L(q, ce) {
      if (((g = ce.getViewerPose(m || f)), (T = ce), g !== null)) {
        const me = g.views;
        S !== null && (e.setRenderTargetFramebuffer(_, S.framebuffer), e.setRenderTarget(_));
        let Te = !1;
        me.length !== A.cameras.length && ((A.cameras.length = 0), (Te = !0));
        for (let Me = 0; Me < me.length; Me++) {
          const Pe = me[Me];
          let Ue = null;
          if (S !== null) Ue = S.getViewport(Pe);
          else {
            const fe = v.getViewSubImage(y, Pe);
            ((Ue = fe.viewport),
              Me === 0 &&
                (e.setRenderTargetTextures(
                  _,
                  fe.colorTexture,
                  y.ignoreDepthValues ? void 0 : fe.depthStencilTexture,
                ),
                e.setRenderTarget(_)));
          }
          let Z = X[Me];
          (Z === void 0 &&
            ((Z = new Hn()), Z.layers.enable(Me), (Z.viewport = new cn()), (X[Me] = Z)),
            Z.matrix.fromArray(Pe.transform.matrix),
            Z.matrix.decompose(Z.position, Z.quaternion, Z.scale),
            Z.projectionMatrix.fromArray(Pe.projectionMatrix),
            Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),
            Z.viewport.set(Ue.x, Ue.y, Ue.width, Ue.height),
            Me === 0 &&
              (A.matrix.copy(Z.matrix), A.matrix.decompose(A.position, A.quaternion, A.scale)),
            Te === !0 && A.cameras.push(Z));
        }
      }
      for (let me = 0; me < D.length; me++) {
        const Te = R[me],
          Me = D[me];
        Te !== null && Me !== void 0 && Me.update(Te, ce, m || f);
      }
      (j && j(q, ce),
        ce.detectedPlanes && s.dispatchEvent({ type: "planesdetected", data: ce }),
        (T = null));
    }
    const W = new vg();
    (W.setAnimationLoop(L),
      (this.setAnimationLoop = function (q) {
        j = q;
      }),
      (this.dispose = function () {}));
  }
}
function UT(r, e) {
  function n(x, _) {
    (x.matrixAutoUpdate === !0 && x.updateMatrix(), _.value.copy(x.matrix));
  }
  function s(x, _) {
    (_.color.getRGB(x.fogColor.value, pg(r)),
      _.isFog
        ? ((x.fogNear.value = _.near), (x.fogFar.value = _.far))
        : _.isFogExp2 && (x.fogDensity.value = _.density));
  }
  function a(x, _, D, R, N) {
    _.isMeshBasicMaterial || _.isMeshLambertMaterial
      ? l(x, _)
      : _.isMeshToonMaterial
        ? (l(x, _), v(x, _))
        : _.isMeshPhongMaterial
          ? (l(x, _), g(x, _))
          : _.isMeshStandardMaterial
            ? (l(x, _), y(x, _), _.isMeshPhysicalMaterial && S(x, _, N))
            : _.isMeshMatcapMaterial
              ? (l(x, _), T(x, _))
              : _.isMeshDepthMaterial
                ? l(x, _)
                : _.isMeshDistanceMaterial
                  ? (l(x, _), E(x, _))
                  : _.isMeshNormalMaterial
                    ? l(x, _)
                    : _.isLineBasicMaterial
                      ? (f(x, _), _.isLineDashedMaterial && u(x, _))
                      : _.isPointsMaterial
                        ? h(x, _, D, R)
                        : _.isSpriteMaterial
                          ? m(x, _)
                          : _.isShadowMaterial
                            ? (x.color.value.copy(_.color), (x.opacity.value = _.opacity))
                            : _.isShaderMaterial && (_.uniformsNeedUpdate = !1);
  }
  function l(x, _) {
    ((x.opacity.value = _.opacity),
      _.color && x.diffuse.value.copy(_.color),
      _.emissive && x.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),
      _.map && ((x.map.value = _.map), n(_.map, x.mapTransform)),
      _.alphaMap && ((x.alphaMap.value = _.alphaMap), n(_.alphaMap, x.alphaMapTransform)),
      _.bumpMap &&
        ((x.bumpMap.value = _.bumpMap),
        n(_.bumpMap, x.bumpMapTransform),
        (x.bumpScale.value = _.bumpScale),
        _.side === Un && (x.bumpScale.value *= -1)),
      _.normalMap &&
        ((x.normalMap.value = _.normalMap),
        n(_.normalMap, x.normalMapTransform),
        x.normalScale.value.copy(_.normalScale),
        _.side === Un && x.normalScale.value.negate()),
      _.displacementMap &&
        ((x.displacementMap.value = _.displacementMap),
        n(_.displacementMap, x.displacementMapTransform),
        (x.displacementScale.value = _.displacementScale),
        (x.displacementBias.value = _.displacementBias)),
      _.emissiveMap &&
        ((x.emissiveMap.value = _.emissiveMap), n(_.emissiveMap, x.emissiveMapTransform)),
      _.specularMap &&
        ((x.specularMap.value = _.specularMap), n(_.specularMap, x.specularMapTransform)),
      _.alphaTest > 0 && (x.alphaTest.value = _.alphaTest));
    const D = e.get(_).envMap;
    if (
      (D &&
        ((x.envMap.value = D),
        (x.flipEnvMap.value = D.isCubeTexture && D.isRenderTargetTexture === !1 ? -1 : 1),
        (x.reflectivity.value = _.reflectivity),
        (x.ior.value = _.ior),
        (x.refractionRatio.value = _.refractionRatio)),
      _.lightMap)
    ) {
      x.lightMap.value = _.lightMap;
      const R = r._useLegacyLights === !0 ? Math.PI : 1;
      ((x.lightMapIntensity.value = _.lightMapIntensity * R), n(_.lightMap, x.lightMapTransform));
    }
    _.aoMap &&
      ((x.aoMap.value = _.aoMap),
      (x.aoMapIntensity.value = _.aoMapIntensity),
      n(_.aoMap, x.aoMapTransform));
  }
  function f(x, _) {
    (x.diffuse.value.copy(_.color),
      (x.opacity.value = _.opacity),
      _.map && ((x.map.value = _.map), n(_.map, x.mapTransform)));
  }
  function u(x, _) {
    ((x.dashSize.value = _.dashSize),
      (x.totalSize.value = _.dashSize + _.gapSize),
      (x.scale.value = _.scale));
  }
  function h(x, _, D, R) {
    (x.diffuse.value.copy(_.color),
      (x.opacity.value = _.opacity),
      (x.size.value = _.size * D),
      (x.scale.value = R * 0.5),
      _.map && ((x.map.value = _.map), n(_.map, x.uvTransform)),
      _.alphaMap && ((x.alphaMap.value = _.alphaMap), n(_.alphaMap, x.alphaMapTransform)),
      _.alphaTest > 0 && (x.alphaTest.value = _.alphaTest));
  }
  function m(x, _) {
    (x.diffuse.value.copy(_.color),
      (x.opacity.value = _.opacity),
      (x.rotation.value = _.rotation),
      _.map && ((x.map.value = _.map), n(_.map, x.mapTransform)),
      _.alphaMap && ((x.alphaMap.value = _.alphaMap), n(_.alphaMap, x.alphaMapTransform)),
      _.alphaTest > 0 && (x.alphaTest.value = _.alphaTest));
  }
  function g(x, _) {
    (x.specular.value.copy(_.specular), (x.shininess.value = Math.max(_.shininess, 1e-4)));
  }
  function v(x, _) {
    _.gradientMap && (x.gradientMap.value = _.gradientMap);
  }
  function y(x, _) {
    ((x.metalness.value = _.metalness),
      _.metalnessMap &&
        ((x.metalnessMap.value = _.metalnessMap), n(_.metalnessMap, x.metalnessMapTransform)),
      (x.roughness.value = _.roughness),
      _.roughnessMap &&
        ((x.roughnessMap.value = _.roughnessMap), n(_.roughnessMap, x.roughnessMapTransform)),
      e.get(_).envMap && (x.envMapIntensity.value = _.envMapIntensity));
  }
  function S(x, _, D) {
    ((x.ior.value = _.ior),
      _.sheen > 0 &&
        (x.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),
        (x.sheenRoughness.value = _.sheenRoughness),
        _.sheenColorMap &&
          ((x.sheenColorMap.value = _.sheenColorMap), n(_.sheenColorMap, x.sheenColorMapTransform)),
        _.sheenRoughnessMap &&
          ((x.sheenRoughnessMap.value = _.sheenRoughnessMap),
          n(_.sheenRoughnessMap, x.sheenRoughnessMapTransform))),
      _.clearcoat > 0 &&
        ((x.clearcoat.value = _.clearcoat),
        (x.clearcoatRoughness.value = _.clearcoatRoughness),
        _.clearcoatMap &&
          ((x.clearcoatMap.value = _.clearcoatMap), n(_.clearcoatMap, x.clearcoatMapTransform)),
        _.clearcoatRoughnessMap &&
          ((x.clearcoatRoughnessMap.value = _.clearcoatRoughnessMap),
          n(_.clearcoatRoughnessMap, x.clearcoatRoughnessMapTransform)),
        _.clearcoatNormalMap &&
          ((x.clearcoatNormalMap.value = _.clearcoatNormalMap),
          n(_.clearcoatNormalMap, x.clearcoatNormalMapTransform),
          x.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),
          _.side === Un && x.clearcoatNormalScale.value.negate())),
      _.iridescence > 0 &&
        ((x.iridescence.value = _.iridescence),
        (x.iridescenceIOR.value = _.iridescenceIOR),
        (x.iridescenceThicknessMinimum.value = _.iridescenceThicknessRange[0]),
        (x.iridescenceThicknessMaximum.value = _.iridescenceThicknessRange[1]),
        _.iridescenceMap &&
          ((x.iridescenceMap.value = _.iridescenceMap),
          n(_.iridescenceMap, x.iridescenceMapTransform)),
        _.iridescenceThicknessMap &&
          ((x.iridescenceThicknessMap.value = _.iridescenceThicknessMap),
          n(_.iridescenceThicknessMap, x.iridescenceThicknessMapTransform))),
      _.transmission > 0 &&
        ((x.transmission.value = _.transmission),
        (x.transmissionSamplerMap.value = D.texture),
        x.transmissionSamplerSize.value.set(D.width, D.height),
        _.transmissionMap &&
          ((x.transmissionMap.value = _.transmissionMap),
          n(_.transmissionMap, x.transmissionMapTransform)),
        (x.thickness.value = _.thickness),
        _.thicknessMap &&
          ((x.thicknessMap.value = _.thicknessMap), n(_.thicknessMap, x.thicknessMapTransform)),
        (x.attenuationDistance.value = _.attenuationDistance),
        x.attenuationColor.value.copy(_.attenuationColor)),
      _.anisotropy > 0 &&
        (x.anisotropyVector.value.set(
          _.anisotropy * Math.cos(_.anisotropyRotation),
          _.anisotropy * Math.sin(_.anisotropyRotation),
        ),
        _.anisotropyMap &&
          ((x.anisotropyMap.value = _.anisotropyMap),
          n(_.anisotropyMap, x.anisotropyMapTransform))),
      (x.specularIntensity.value = _.specularIntensity),
      x.specularColor.value.copy(_.specularColor),
      _.specularColorMap &&
        ((x.specularColorMap.value = _.specularColorMap),
        n(_.specularColorMap, x.specularColorMapTransform)),
      _.specularIntensityMap &&
        ((x.specularIntensityMap.value = _.specularIntensityMap),
        n(_.specularIntensityMap, x.specularIntensityMapTransform)));
  }
  function T(x, _) {
    _.matcap && (x.matcap.value = _.matcap);
  }
  function E(x, _) {
    const D = e.get(_).light;
    (x.referencePosition.value.setFromMatrixPosition(D.matrixWorld),
      (x.nearDistance.value = D.shadow.camera.near),
      (x.farDistance.value = D.shadow.camera.far));
  }
  return { refreshFogUniforms: s, refreshMaterialUniforms: a };
}
function IT(r, e, n, s) {
  let a = {},
    l = {},
    f = [];
  const u = n.isWebGL2 ? r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS) : 0;
  function h(D, R) {
    const N = R.program;
    s.uniformBlockBinding(D, N);
  }
  function m(D, R) {
    let N = a[D.id];
    N === void 0 && (T(D), (N = g(D)), (a[D.id] = N), D.addEventListener("dispose", x));
    const z = R.program;
    s.updateUBOMapping(D, z);
    const I = e.render.frame;
    l[D.id] !== I && (y(D), (l[D.id] = I));
  }
  function g(D) {
    const R = v();
    D.__bindingPointIndex = R;
    const N = r.createBuffer(),
      z = D.__size,
      I = D.usage;
    return (
      r.bindBuffer(r.UNIFORM_BUFFER, N),
      r.bufferData(r.UNIFORM_BUFFER, z, I),
      r.bindBuffer(r.UNIFORM_BUFFER, null),
      r.bindBufferBase(r.UNIFORM_BUFFER, R, N),
      N
    );
  }
  function v() {
    for (let D = 0; D < u; D++) if (f.indexOf(D) === -1) return (f.push(D), D);
    return (
      console.error(
        "THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.",
      ),
      0
    );
  }
  function y(D) {
    const R = a[D.id],
      N = D.uniforms,
      z = D.__cache;
    r.bindBuffer(r.UNIFORM_BUFFER, R);
    for (let I = 0, F = N.length; I < F; I++) {
      const X = Array.isArray(N[I]) ? N[I] : [N[I]];
      for (let A = 0, b = X.length; A < b; A++) {
        const le = X[A];
        if (S(le, I, A, z) === !0) {
          const ne = le.__offset,
            pe = Array.isArray(le.value) ? le.value : [le.value];
          let H = 0;
          for (let J = 0; J < pe.length; J++) {
            const ie = pe[J],
              ue = E(ie);
            typeof ie == "number" || typeof ie == "boolean"
              ? ((le.__data[0] = ie), r.bufferSubData(r.UNIFORM_BUFFER, ne + H, le.__data))
              : ie.isMatrix3
                ? ((le.__data[0] = ie.elements[0]),
                  (le.__data[1] = ie.elements[1]),
                  (le.__data[2] = ie.elements[2]),
                  (le.__data[3] = 0),
                  (le.__data[4] = ie.elements[3]),
                  (le.__data[5] = ie.elements[4]),
                  (le.__data[6] = ie.elements[5]),
                  (le.__data[7] = 0),
                  (le.__data[8] = ie.elements[6]),
                  (le.__data[9] = ie.elements[7]),
                  (le.__data[10] = ie.elements[8]),
                  (le.__data[11] = 0))
                : (ie.toArray(le.__data, H), (H += ue.storage / Float32Array.BYTES_PER_ELEMENT));
          }
          r.bufferSubData(r.UNIFORM_BUFFER, ne, le.__data);
        }
      }
    }
    r.bindBuffer(r.UNIFORM_BUFFER, null);
  }
  function S(D, R, N, z) {
    const I = D.value,
      F = R + "_" + N;
    if (z[F] === void 0)
      return (typeof I == "number" || typeof I == "boolean" ? (z[F] = I) : (z[F] = I.clone()), !0);
    {
      const X = z[F];
      if (typeof I == "number" || typeof I == "boolean") {
        if (X !== I) return ((z[F] = I), !0);
      } else if (X.equals(I) === !1) return (X.copy(I), !0);
    }
    return !1;
  }
  function T(D) {
    const R = D.uniforms;
    let N = 0;
    const z = 16;
    for (let F = 0, X = R.length; F < X; F++) {
      const A = Array.isArray(R[F]) ? R[F] : [R[F]];
      for (let b = 0, le = A.length; b < le; b++) {
        const ne = A[b],
          pe = Array.isArray(ne.value) ? ne.value : [ne.value];
        for (let H = 0, J = pe.length; H < J; H++) {
          const ie = pe[H],
            ue = E(ie),
            V = N % z;
          (V !== 0 && z - V < ue.boundary && (N += z - V),
            (ne.__data = new Float32Array(ue.storage / Float32Array.BYTES_PER_ELEMENT)),
            (ne.__offset = N),
            (N += ue.storage));
        }
      }
    }
    const I = N % z;
    return (I > 0 && (N += z - I), (D.__size = N), (D.__cache = {}), this);
  }
  function E(D) {
    const R = { boundary: 0, storage: 0 };
    return (
      typeof D == "number" || typeof D == "boolean"
        ? ((R.boundary = 4), (R.storage = 4))
        : D.isVector2
          ? ((R.boundary = 8), (R.storage = 8))
          : D.isVector3 || D.isColor
            ? ((R.boundary = 16), (R.storage = 12))
            : D.isVector4
              ? ((R.boundary = 16), (R.storage = 16))
              : D.isMatrix3
                ? ((R.boundary = 48), (R.storage = 48))
                : D.isMatrix4
                  ? ((R.boundary = 64), (R.storage = 64))
                  : D.isTexture
                    ? console.warn(
                        "THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.",
                      )
                    : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", D),
      R
    );
  }
  function x(D) {
    const R = D.target;
    R.removeEventListener("dispose", x);
    const N = f.indexOf(R.__bindingPointIndex);
    (f.splice(N, 1), r.deleteBuffer(a[R.id]), delete a[R.id], delete l[R.id]);
  }
  function _() {
    for (const D in a) r.deleteBuffer(a[D]);
    ((f = []), (a = {}), (l = {}));
  }
  return { bind: h, update: m, dispose: _ };
}
class wf {
  constructor(e = {}) {
    const {
      canvas: n = Px(),
      context: s = null,
      depth: a = !0,
      stencil: l = !0,
      alpha: f = !1,
      antialias: u = !1,
      premultipliedAlpha: h = !0,
      preserveDrawingBuffer: m = !1,
      powerPreference: g = "default",
      failIfMajorPerformanceCaveat: v = !1,
    } = e;
    this.isWebGLRenderer = !0;
    let y;
    s !== null ? (y = s.getContextAttributes().alpha) : (y = f);
    const S = new Uint32Array(4),
      T = new Int32Array(4);
    let E = null,
      x = null;
    const _ = [],
      D = [];
    ((this.domElement = n),
      (this.debug = { checkShaderErrors: !0, onShaderError: null }),
      (this.autoClear = !0),
      (this.autoClearColor = !0),
      (this.autoClearDepth = !0),
      (this.autoClearStencil = !0),
      (this.sortObjects = !0),
      (this.clippingPlanes = []),
      (this.localClippingEnabled = !1),
      (this._outputColorSpace = ln),
      (this._useLegacyLights = !1),
      (this.toneMapping = yr),
      (this.toneMappingExposure = 1));
    const R = this;
    let N = !1,
      z = 0,
      I = 0,
      F = null,
      X = -1,
      A = null;
    const b = new cn(),
      le = new cn();
    let ne = null;
    const pe = new Mt(0);
    let H = 0,
      J = n.width,
      ie = n.height,
      ue = 1,
      V = null,
      K = null;
    const j = new cn(0, 0, J, ie),
      L = new cn(0, 0, J, ie);
    let W = !1;
    const q = new _g();
    let ce = !1,
      me = !1,
      Te = null;
    const Me = new Zt(),
      Pe = new Rt(),
      Ue = new ee(),
      Z = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    function fe() {
      return F === null ? ue : 1;
    }
    let B = s;
    function ze(C, $) {
      for (let oe = 0; oe < C.length; oe++) {
        const ae = C[oe],
          se = n.getContext(ae, $);
        if (se !== null) return se;
      }
      return null;
    }
    try {
      const C = {
        alpha: !0,
        depth: a,
        stencil: l,
        antialias: u,
        premultipliedAlpha: h,
        preserveDrawingBuffer: m,
        powerPreference: g,
        failIfMajorPerformanceCaveat: v,
      };
      if (
        ("setAttribute" in n && n.setAttribute("data-engine", `three.js r${_f}`),
        n.addEventListener("webglcontextlost", Ae, !1),
        n.addEventListener("webglcontextrestored", k, !1),
        n.addEventListener("webglcontextcreationerror", Re, !1),
        B === null)
      ) {
        const $ = ["webgl2", "webgl", "experimental-webgl"];
        if ((R.isWebGL1Renderer === !0 && $.shift(), (B = ze($, C)), B === null))
          throw ze($)
            ? new Error("Error creating WebGL context with your selected attributes.")
            : new Error("Error creating WebGL context.");
      }
      (typeof WebGLRenderingContext < "u" &&
        B instanceof WebGLRenderingContext &&
        console.warn(
          "THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163.",
        ),
        B.getShaderPrecisionFormat === void 0 &&
          (B.getShaderPrecisionFormat = function () {
            return { rangeMin: 1, rangeMax: 1, precision: 1 };
          }));
    } catch (C) {
      throw (console.error("THREE.WebGLRenderer: " + C.message), C);
    }
    let he,
      qe,
      Fe,
      Ct,
      st,
      P,
      w,
      te,
      Se,
      xe,
      Ee,
      We,
      Le,
      ke,
      Ye,
      ot,
      ve,
      mt,
      dt,
      tt,
      je,
      He,
      it,
      vt;
    function bt() {
      ((he = new XM(B)),
        (qe = new kM(B, he, e)),
        he.init(qe),
        (He = new PT(B, he, qe)),
        (Fe = new CT(B, he, qe)),
        (Ct = new YM(B)),
        (st = new pT()),
        (P = new bT(B, he, Fe, st, qe, He, Ct)),
        (w = new BM(R)),
        (te = new WM(R)),
        (Se = new ty(B, qe)),
        (it = new FM(B, he, Se, qe)),
        (xe = new jM(B, Se, Ct, it)),
        (Ee = new QM(B, xe, Se, Ct)),
        (dt = new ZM(B, qe, P)),
        (ot = new zM(st)),
        (We = new hT(R, w, te, he, qe, it, ot)),
        (Le = new UT(R, st)),
        (ke = new gT()),
        (Ye = new MT(he, qe)),
        (mt = new IM(R, w, te, Fe, Ee, y, h)),
        (ve = new RT(R, Ee, qe)),
        (vt = new IT(B, Ct, qe, Fe)),
        (tt = new OM(B, he, Ct, qe)),
        (je = new qM(B, he, Ct, qe)),
        (Ct.programs = We.programs),
        (R.capabilities = qe),
        (R.extensions = he),
        (R.properties = st),
        (R.renderLists = ke),
        (R.shadowMap = ve),
        (R.state = Fe),
        (R.info = Ct));
    }
    bt();
    const at = new NT(R, B);
    ((this.xr = at),
      (this.getContext = function () {
        return B;
      }),
      (this.getContextAttributes = function () {
        return B.getContextAttributes();
      }),
      (this.forceContextLoss = function () {
        const C = he.get("WEBGL_lose_context");
        C && C.loseContext();
      }),
      (this.forceContextRestore = function () {
        const C = he.get("WEBGL_lose_context");
        C && C.restoreContext();
      }),
      (this.getPixelRatio = function () {
        return ue;
      }),
      (this.setPixelRatio = function (C) {
        C !== void 0 && ((ue = C), this.setSize(J, ie, !1));
      }),
      (this.getSize = function (C) {
        return C.set(J, ie);
      }),
      (this.setSize = function (C, $, oe = !0) {
        if (at.isPresenting) {
          console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
          return;
        }
        ((J = C),
          (ie = $),
          (n.width = Math.floor(C * ue)),
          (n.height = Math.floor($ * ue)),
          oe === !0 && ((n.style.width = C + "px"), (n.style.height = $ + "px")),
          this.setViewport(0, 0, C, $));
      }),
      (this.getDrawingBufferSize = function (C) {
        return C.set(J * ue, ie * ue).floor();
      }),
      (this.setDrawingBufferSize = function (C, $, oe) {
        ((J = C),
          (ie = $),
          (ue = oe),
          (n.width = Math.floor(C * oe)),
          (n.height = Math.floor($ * oe)),
          this.setViewport(0, 0, C, $));
      }),
      (this.getCurrentViewport = function (C) {
        return C.copy(b);
      }),
      (this.getViewport = function (C) {
        return C.copy(j);
      }),
      (this.setViewport = function (C, $, oe, ae) {
        (C.isVector4 ? j.set(C.x, C.y, C.z, C.w) : j.set(C, $, oe, ae),
          Fe.viewport(b.copy(j).multiplyScalar(ue).floor()));
      }),
      (this.getScissor = function (C) {
        return C.copy(L);
      }),
      (this.setScissor = function (C, $, oe, ae) {
        (C.isVector4 ? L.set(C.x, C.y, C.z, C.w) : L.set(C, $, oe, ae),
          Fe.scissor(le.copy(L).multiplyScalar(ue).floor()));
      }),
      (this.getScissorTest = function () {
        return W;
      }),
      (this.setScissorTest = function (C) {
        Fe.setScissorTest((W = C));
      }),
      (this.setOpaqueSort = function (C) {
        V = C;
      }),
      (this.setTransparentSort = function (C) {
        K = C;
      }),
      (this.getClearColor = function (C) {
        return C.copy(mt.getClearColor());
      }),
      (this.setClearColor = function () {
        mt.setClearColor.apply(mt, arguments);
      }),
      (this.getClearAlpha = function () {
        return mt.getClearAlpha();
      }),
      (this.setClearAlpha = function () {
        mt.setClearAlpha.apply(mt, arguments);
      }),
      (this.clear = function (C = !0, $ = !0, oe = !0) {
        let ae = 0;
        if (C) {
          let se = !1;
          if (F !== null) {
            const De = F.texture.format;
            se = De === ng || De === tg || De === eg;
          }
          if (se) {
            const De = F.texture.type,
              Xe = De === Sr || De === _r || De === vf || De === jr || De === Qm || De === Jm,
              Qe = mt.getClearColor(),
              Ie = mt.getClearAlpha(),
              lt = Qe.r,
              nt = Qe.g,
              rt = Qe.b;
            Xe
              ? ((S[0] = lt),
                (S[1] = nt),
                (S[2] = rt),
                (S[3] = Ie),
                B.clearBufferuiv(B.COLOR, 0, S))
              : ((T[0] = lt),
                (T[1] = nt),
                (T[2] = rt),
                (T[3] = Ie),
                B.clearBufferiv(B.COLOR, 0, T));
          } else ae |= B.COLOR_BUFFER_BIT;
        }
        ($ && (ae |= B.DEPTH_BUFFER_BIT),
          oe && ((ae |= B.STENCIL_BUFFER_BIT), this.state.buffers.stencil.setMask(4294967295)),
          B.clear(ae));
      }),
      (this.clearColor = function () {
        this.clear(!0, !1, !1);
      }),
      (this.clearDepth = function () {
        this.clear(!1, !0, !1);
      }),
      (this.clearStencil = function () {
        this.clear(!1, !1, !0);
      }),
      (this.dispose = function () {
        (n.removeEventListener("webglcontextlost", Ae, !1),
          n.removeEventListener("webglcontextrestored", k, !1),
          n.removeEventListener("webglcontextcreationerror", Re, !1),
          ke.dispose(),
          Ye.dispose(),
          st.dispose(),
          w.dispose(),
          te.dispose(),
          Ee.dispose(),
          it.dispose(),
          vt.dispose(),
          We.dispose(),
          at.dispose(),
          at.removeEventListener("sessionstart", en),
          at.removeEventListener("sessionend", yt),
          Te && (Te.dispose(), (Te = null)),
          qt.stop());
      }));
    function Ae(C) {
      (C.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), (N = !0));
    }
    function k() {
      (console.log("THREE.WebGLRenderer: Context Restored."), (N = !1));
      const C = Ct.autoReset,
        $ = ve.enabled,
        oe = ve.autoUpdate,
        ae = ve.needsUpdate,
        se = ve.type;
      (bt(),
        (Ct.autoReset = C),
        (ve.enabled = $),
        (ve.autoUpdate = oe),
        (ve.needsUpdate = ae),
        (ve.type = se));
    }
    function Re(C) {
      console.error(
        "THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",
        C.statusMessage,
      );
    }
    function be(C) {
      const $ = C.target;
      ($.removeEventListener("dispose", be), Je($));
    }
    function Je(C) {
      ($e(C), st.remove(C));
    }
    function $e(C) {
      const $ = st.get(C).programs;
      $ !== void 0 &&
        ($.forEach(function (oe) {
          We.releaseProgram(oe);
        }),
        C.isShaderMaterial && We.releaseShaderCache(C));
    }
    this.renderBufferDirect = function (C, $, oe, ae, se, De) {
      $ === null && ($ = Z);
      const Xe = se.isMesh && se.matrixWorld.determinant() < 0,
        Qe = Hl(C, $, oe, ae, se);
      Fe.setMaterial(ae, Xe);
      let Ie = oe.index,
        lt = 1;
      if (ae.wireframe === !0) {
        if (((Ie = xe.getWireframeAttribute(oe)), Ie === void 0)) return;
        lt = 2;
      }
      const nt = oe.drawRange,
        rt = oe.attributes.position;
      let Pt = nt.start * lt,
        _n = (nt.start + nt.count) * lt;
      (De !== null &&
        ((Pt = Math.max(Pt, De.start * lt)), (_n = Math.min(_n, (De.start + De.count) * lt))),
        Ie !== null
          ? ((Pt = Math.max(Pt, 0)), (_n = Math.min(_n, Ie.count)))
          : rt != null && ((Pt = Math.max(Pt, 0)), (_n = Math.min(_n, rt.count))));
      const Vt = _n - Pt;
      if (Vt < 0 || Vt === 1 / 0) return;
      it.setup(se, ae, Qe, oe, Ie);
      let An,
        gt = tt;
      if ((Ie !== null && ((An = Se.get(Ie)), (gt = je), gt.setIndex(An)), se.isMesh))
        ae.wireframe === !0
          ? (Fe.setLineWidth(ae.wireframeLinewidth * fe()), gt.setMode(B.LINES))
          : gt.setMode(B.TRIANGLES);
      else if (se.isLine) {
        let ut = ae.linewidth;
        (ut === void 0 && (ut = 1),
          Fe.setLineWidth(ut * fe()),
          se.isLineSegments
            ? gt.setMode(B.LINES)
            : se.isLineLoop
              ? gt.setMode(B.LINE_LOOP)
              : gt.setMode(B.LINE_STRIP));
      } else se.isPoints ? gt.setMode(B.POINTS) : se.isSprite && gt.setMode(B.TRIANGLES);
      if (se.isBatchedMesh)
        gt.renderMultiDraw(se._multiDrawStarts, se._multiDrawCounts, se._multiDrawCount);
      else if (se.isInstancedMesh) gt.renderInstances(Pt, Vt, se.count);
      else if (oe.isInstancedBufferGeometry) {
        const ut = oe._maxInstanceCount !== void 0 ? oe._maxInstanceCount : 1 / 0,
          vn = Math.min(oe.instanceCount, ut);
        gt.renderInstances(Pt, Vt, vn);
      } else gt.render(Pt, Vt);
    };
    function Et(C, $, oe) {
      C.transparent === !0 && C.side === zi && C.forceSinglePass === !1
        ? ((C.side = Un),
          (C.needsUpdate = !0),
          Vi(C, $, oe),
          (C.side = Mr),
          (C.needsUpdate = !0),
          Vi(C, $, oe),
          (C.side = zi))
        : Vi(C, $, oe);
    }
    ((this.compile = function (C, $, oe = null) {
      (oe === null && (oe = C),
        (x = Ye.get(oe)),
        x.init(),
        D.push(x),
        oe.traverseVisible(function (se) {
          se.isLight &&
            se.layers.test($.layers) &&
            (x.pushLight(se), se.castShadow && x.pushShadow(se));
        }),
        C !== oe &&
          C.traverseVisible(function (se) {
            se.isLight &&
              se.layers.test($.layers) &&
              (x.pushLight(se), se.castShadow && x.pushShadow(se));
          }),
        x.setupLights(R._useLegacyLights));
      const ae = new Set();
      return (
        C.traverse(function (se) {
          const De = se.material;
          if (De)
            if (Array.isArray(De))
              for (let Xe = 0; Xe < De.length; Xe++) {
                const Qe = De[Xe];
                (Et(Qe, oe, se), ae.add(Qe));
              }
            else (Et(De, oe, se), ae.add(De));
        }),
        D.pop(),
        (x = null),
        ae
      );
    }),
      (this.compileAsync = function (C, $, oe = null) {
        const ae = this.compile(C, $, oe);
        return new Promise((se) => {
          function De() {
            if (
              (ae.forEach(function (Xe) {
                st.get(Xe).currentProgram.isReady() && ae.delete(Xe);
              }),
              ae.size === 0)
            ) {
              se(C);
              return;
            }
            setTimeout(De, 10);
          }
          he.get("KHR_parallel_shader_compile") !== null ? De() : setTimeout(De, 10);
        });
      }));
    let Tt = null;
    function Bt(C) {
      Tt && Tt(C);
    }
    function en() {
      qt.stop();
    }
    function yt() {
      qt.start();
    }
    const qt = new vg();
    (qt.setAnimationLoop(Bt),
      typeof self < "u" && qt.setContext(self),
      (this.setAnimationLoop = function (C) {
        ((Tt = C), at.setAnimationLoop(C), C === null ? qt.stop() : qt.start());
      }),
      at.addEventListener("sessionstart", en),
      at.addEventListener("sessionend", yt),
      (this.render = function (C, $) {
        if ($ !== void 0 && $.isCamera !== !0) {
          console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
          return;
        }
        if (N === !0) return;
        (C.matrixWorldAutoUpdate === !0 && C.updateMatrixWorld(),
          $.parent === null && $.matrixWorldAutoUpdate === !0 && $.updateMatrixWorld(),
          at.enabled === !0 &&
            at.isPresenting === !0 &&
            (at.cameraAutoUpdate === !0 && at.updateCamera($), ($ = at.getCamera())),
          C.isScene === !0 && C.onBeforeRender(R, C, $, F),
          (x = Ye.get(C, D.length)),
          x.init(),
          D.push(x),
          Me.multiplyMatrices($.projectionMatrix, $.matrixWorldInverse),
          q.setFromProjectionMatrix(Me),
          (me = this.localClippingEnabled),
          (ce = ot.init(this.clippingPlanes, me)),
          (E = ke.get(C, _.length)),
          E.init(),
          _.push(E),
          un(C, $, 0, R.sortObjects),
          E.finish(),
          R.sortObjects === !0 && E.sort(V, K),
          this.info.render.frame++,
          ce === !0 && ot.beginShadows());
        const oe = x.state.shadowsArray;
        if (
          (ve.render(oe, C, $),
          ce === !0 && ot.endShadows(),
          this.info.autoReset === !0 && this.info.reset(),
          mt.render(E, C),
          x.setupLights(R._useLegacyLights),
          $.isArrayCamera)
        ) {
          const ae = $.cameras;
          for (let se = 0, De = ae.length; se < De; se++) {
            const Xe = ae[se];
            Yo(E, C, Xe, Xe.viewport);
          }
        } else Yo(E, C, $);
        (F !== null && (P.updateMultisampleRenderTarget(F), P.updateRenderTargetMipmap(F)),
          C.isScene === !0 && C.onAfterRender(R, C, $),
          it.resetDefaultState(),
          (X = -1),
          (A = null),
          D.pop(),
          D.length > 0 ? (x = D[D.length - 1]) : (x = null),
          _.pop(),
          _.length > 0 ? (E = _[_.length - 1]) : (E = null));
      }));
    function un(C, $, oe, ae) {
      if (C.visible === !1) return;
      if (C.layers.test($.layers)) {
        if (C.isGroup) oe = C.renderOrder;
        else if (C.isLOD) C.autoUpdate === !0 && C.update($);
        else if (C.isLight) (x.pushLight(C), C.castShadow && x.pushShadow(C));
        else if (C.isSprite) {
          if (!C.frustumCulled || q.intersectsSprite(C)) {
            ae && Ue.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Me);
            const Xe = Ee.update(C),
              Qe = C.material;
            Qe.visible && E.push(C, Xe, Qe, oe, Ue.z, null);
          }
        } else if (
          (C.isMesh || C.isLine || C.isPoints) &&
          (!C.frustumCulled || q.intersectsObject(C))
        ) {
          const Xe = Ee.update(C),
            Qe = C.material;
          if (
            (ae &&
              (C.boundingSphere !== void 0
                ? (C.boundingSphere === null && C.computeBoundingSphere(),
                  Ue.copy(C.boundingSphere.center))
                : (Xe.boundingSphere === null && Xe.computeBoundingSphere(),
                  Ue.copy(Xe.boundingSphere.center)),
              Ue.applyMatrix4(C.matrixWorld).applyMatrix4(Me)),
            Array.isArray(Qe))
          ) {
            const Ie = Xe.groups;
            for (let lt = 0, nt = Ie.length; lt < nt; lt++) {
              const rt = Ie[lt],
                Pt = Qe[rt.materialIndex];
              Pt && Pt.visible && E.push(C, Xe, Pt, oe, Ue.z, rt);
            }
          } else Qe.visible && E.push(C, Xe, Qe, oe, Ue.z, null);
        }
      }
      const De = C.children;
      for (let Xe = 0, Qe = De.length; Xe < Qe; Xe++) un(De[Xe], $, oe, ae);
    }
    function Yo(C, $, oe, ae) {
      const se = C.opaque,
        De = C.transmissive,
        Xe = C.transparent;
      (x.setupLightsView(oe),
        ce === !0 && ot.setGlobalState(R.clippingPlanes, oe),
        De.length > 0 && Er(se, De, $, oe),
        ae && Fe.viewport(b.copy(ae)),
        se.length > 0 && Si(se, $, oe),
        De.length > 0 && Si(De, $, oe),
        Xe.length > 0 && Si(Xe, $, oe),
        Fe.buffers.depth.setTest(!0),
        Fe.buffers.depth.setMask(!0),
        Fe.buffers.color.setMask(!0),
        Fe.setPolygonOffset(!1));
    }
    function Er(C, $, oe, ae) {
      if ((oe.isScene === !0 ? oe.overrideMaterial : null) !== null) return;
      const De = qe.isWebGL2;
      (Te === null &&
        (Te = new $r(1, 1, {
          generateMipmaps: !0,
          type: he.has("EXT_color_buffer_half_float") ? Go : Sr,
          minFilter: Ho,
          samples: De ? 4 : 0,
        })),
        R.getDrawingBufferSize(Pe),
        De ? Te.setSize(Pe.x, Pe.y) : Te.setSize(Il(Pe.x), Il(Pe.y)));
      const Xe = R.getRenderTarget();
      (R.setRenderTarget(Te),
        R.getClearColor(pe),
        (H = R.getClearAlpha()),
        H < 1 && R.setClearColor(16777215, 0.5),
        R.clear());
      const Qe = R.toneMapping;
      ((R.toneMapping = yr),
        Si(C, oe, ae),
        P.updateMultisampleRenderTarget(Te),
        P.updateRenderTargetMipmap(Te));
      let Ie = !1;
      for (let lt = 0, nt = $.length; lt < nt; lt++) {
        const rt = $[lt],
          Pt = rt.object,
          _n = rt.geometry,
          Vt = rt.material,
          An = rt.group;
        if (Vt.side === zi && Pt.layers.test(ae.layers)) {
          const gt = Vt.side;
          ((Vt.side = Un),
            (Vt.needsUpdate = !0),
            Tr(Pt, oe, ae, _n, Vt, An),
            (Vt.side = gt),
            (Vt.needsUpdate = !0),
            (Ie = !0));
        }
      }
      (Ie === !0 && (P.updateMultisampleRenderTarget(Te), P.updateRenderTargetMipmap(Te)),
        R.setRenderTarget(Xe),
        R.setClearColor(pe, H),
        (R.toneMapping = Qe));
    }
    function Si(C, $, oe) {
      const ae = $.isScene === !0 ? $.overrideMaterial : null;
      for (let se = 0, De = C.length; se < De; se++) {
        const Xe = C[se],
          Qe = Xe.object,
          Ie = Xe.geometry,
          lt = ae === null ? Xe.material : ae,
          nt = Xe.group;
        Qe.layers.test(oe.layers) && Tr(Qe, $, oe, Ie, lt, nt);
      }
    }
    function Tr(C, $, oe, ae, se, De) {
      (C.onBeforeRender(R, $, oe, ae, se, De),
        C.modelViewMatrix.multiplyMatrices(oe.matrixWorldInverse, C.matrixWorld),
        C.normalMatrix.getNormalMatrix(C.modelViewMatrix),
        se.onBeforeRender(R, $, oe, ae, C, De),
        se.transparent === !0 && se.side === zi && se.forceSinglePass === !1
          ? ((se.side = Un),
            (se.needsUpdate = !0),
            R.renderBufferDirect(oe, $, ae, se, C, De),
            (se.side = Mr),
            (se.needsUpdate = !0),
            R.renderBufferDirect(oe, $, ae, se, C, De),
            (se.side = zi))
          : R.renderBufferDirect(oe, $, ae, se, C, De),
        C.onAfterRender(R, $, oe, ae, se, De));
    }
    function Vi(C, $, oe) {
      $.isScene !== !0 && ($ = Z);
      const ae = st.get(C),
        se = x.state.lights,
        De = x.state.shadowsArray,
        Xe = se.state.version,
        Qe = We.getParameters(C, se.state, De, $, oe),
        Ie = We.getProgramCacheKey(Qe);
      let lt = ae.programs;
      ((ae.environment = C.isMeshStandardMaterial ? $.environment : null),
        (ae.fog = $.fog),
        (ae.envMap = (C.isMeshStandardMaterial ? te : w).get(C.envMap || ae.environment)),
        lt === void 0 && (C.addEventListener("dispose", be), (lt = new Map()), (ae.programs = lt)));
      let nt = lt.get(Ie);
      if (nt !== void 0) {
        if (ae.currentProgram === nt && ae.lightsStateVersion === Xe) return (Ko(C, Qe), nt);
      } else
        ((Qe.uniforms = We.getUniforms(C)),
          C.onBuild(oe, Qe, R),
          C.onBeforeCompile(Qe, R),
          (nt = We.acquireProgram(Qe, Ie)),
          lt.set(Ie, nt),
          (ae.uniforms = Qe.uniforms));
      const rt = ae.uniforms;
      return (
        ((!C.isShaderMaterial && !C.isRawShaderMaterial) || C.clipping === !0) &&
          (rt.clippingPlanes = ot.uniform),
        Ko(C, Qe),
        (ae.needsLights = Zo(C)),
        (ae.lightsStateVersion = Xe),
        ae.needsLights &&
          ((rt.ambientLightColor.value = se.state.ambient),
          (rt.lightProbe.value = se.state.probe),
          (rt.directionalLights.value = se.state.directional),
          (rt.directionalLightShadows.value = se.state.directionalShadow),
          (rt.spotLights.value = se.state.spot),
          (rt.spotLightShadows.value = se.state.spotShadow),
          (rt.rectAreaLights.value = se.state.rectArea),
          (rt.ltc_1.value = se.state.rectAreaLTC1),
          (rt.ltc_2.value = se.state.rectAreaLTC2),
          (rt.pointLights.value = se.state.point),
          (rt.pointLightShadows.value = se.state.pointShadow),
          (rt.hemisphereLights.value = se.state.hemi),
          (rt.directionalShadowMap.value = se.state.directionalShadowMap),
          (rt.directionalShadowMatrix.value = se.state.directionalShadowMatrix),
          (rt.spotShadowMap.value = se.state.spotShadowMap),
          (rt.spotLightMatrix.value = se.state.spotLightMatrix),
          (rt.spotLightMap.value = se.state.spotLightMap),
          (rt.pointShadowMap.value = se.state.pointShadowMap),
          (rt.pointShadowMatrix.value = se.state.pointShadowMatrix)),
        (ae.currentProgram = nt),
        (ae.uniformsList = null),
        nt
      );
    }
    function $o(C) {
      if (C.uniformsList === null) {
        const $ = C.currentProgram.getUniforms();
        C.uniformsList = bl.seqWithValue($.seq, C.uniforms);
      }
      return C.uniformsList;
    }
    function Ko(C, $) {
      const oe = st.get(C);
      ((oe.outputColorSpace = $.outputColorSpace),
        (oe.batching = $.batching),
        (oe.instancing = $.instancing),
        (oe.instancingColor = $.instancingColor),
        (oe.skinning = $.skinning),
        (oe.morphTargets = $.morphTargets),
        (oe.morphNormals = $.morphNormals),
        (oe.morphColors = $.morphColors),
        (oe.morphTargetsCount = $.morphTargetsCount),
        (oe.numClippingPlanes = $.numClippingPlanes),
        (oe.numIntersection = $.numClipIntersection),
        (oe.vertexAlphas = $.vertexAlphas),
        (oe.vertexTangents = $.vertexTangents),
        (oe.toneMapping = $.toneMapping));
    }
    function Hl(C, $, oe, ae, se) {
      ($.isScene !== !0 && ($ = Z), P.resetTextureUnits());
      const De = $.fog,
        Xe = ae.isMeshStandardMaterial ? $.environment : null,
        Qe =
          F === null ? R.outputColorSpace : F.isXRRenderTarget === !0 ? F.texture.colorSpace : Gi,
        Ie = (ae.isMeshStandardMaterial ? te : w).get(ae.envMap || Xe),
        lt = ae.vertexColors === !0 && !!oe.attributes.color && oe.attributes.color.itemSize === 4,
        nt = !!oe.attributes.tangent && (!!ae.normalMap || ae.anisotropy > 0),
        rt = !!oe.morphAttributes.position,
        Pt = !!oe.morphAttributes.normal,
        _n = !!oe.morphAttributes.color;
      let Vt = yr;
      ae.toneMapped && (F === null || F.isXRRenderTarget === !0) && (Vt = R.toneMapping);
      const An =
          oe.morphAttributes.position || oe.morphAttributes.normal || oe.morphAttributes.color,
        gt = An !== void 0 ? An.length : 0,
        ut = st.get(ae),
        vn = x.state.lights;
      if (ce === !0 && (me === !0 || C !== A)) {
        const Rn = C === A && ae.id === X;
        ot.setState(ae, C, Rn);
      }
      let Ft = !1;
      ae.version === ut.__version
        ? ((ut.needsLights && ut.lightsStateVersion !== vn.state.version) ||
            ut.outputColorSpace !== Qe ||
            (se.isBatchedMesh && ut.batching === !1) ||
            (!se.isBatchedMesh && ut.batching === !0) ||
            (se.isInstancedMesh && ut.instancing === !1) ||
            (!se.isInstancedMesh && ut.instancing === !0) ||
            (se.isSkinnedMesh && ut.skinning === !1) ||
            (!se.isSkinnedMesh && ut.skinning === !0) ||
            (se.isInstancedMesh && ut.instancingColor === !0 && se.instanceColor === null) ||
            (se.isInstancedMesh && ut.instancingColor === !1 && se.instanceColor !== null) ||
            ut.envMap !== Ie ||
            (ae.fog === !0 && ut.fog !== De) ||
            (ut.numClippingPlanes !== void 0 &&
              (ut.numClippingPlanes !== ot.numPlanes ||
                ut.numIntersection !== ot.numIntersection)) ||
            ut.vertexAlphas !== lt ||
            ut.vertexTangents !== nt ||
            ut.morphTargets !== rt ||
            ut.morphNormals !== Pt ||
            ut.morphColors !== _n ||
            ut.toneMapping !== Vt ||
            (qe.isWebGL2 === !0 && ut.morphTargetsCount !== gt)) &&
          (Ft = !0)
        : ((Ft = !0), (ut.__version = ae.version));
      let Ei = ut.currentProgram;
      Ft === !0 && (Ei = Vi(ae, $, se));
      let Qo = !1,
        mi = !1,
        Wi = !1;
      const Ht = Ei.getUniforms(),
        Vn = ut.uniforms;
      if (
        (Fe.useProgram(Ei.program) && ((Qo = !0), (mi = !0), (Wi = !0)),
        ae.id !== X && ((X = ae.id), (mi = !0)),
        Qo || A !== C)
      ) {
        (Ht.setValue(B, "projectionMatrix", C.projectionMatrix),
          Ht.setValue(B, "viewMatrix", C.matrixWorldInverse));
        const Rn = Ht.map.cameraPosition;
        (Rn !== void 0 && Rn.setValue(B, Ue.setFromMatrixPosition(C.matrixWorld)),
          qe.logarithmicDepthBuffer &&
            Ht.setValue(B, "logDepthBufFC", 2 / (Math.log(C.far + 1) / Math.LN2)),
          (ae.isMeshPhongMaterial ||
            ae.isMeshToonMaterial ||
            ae.isMeshLambertMaterial ||
            ae.isMeshBasicMaterial ||
            ae.isMeshStandardMaterial ||
            ae.isShaderMaterial) &&
            Ht.setValue(B, "isOrthographic", C.isOrthographicCamera === !0),
          A !== C && ((A = C), (mi = !0), (Wi = !0)));
      }
      if (se.isSkinnedMesh) {
        (Ht.setOptional(B, se, "bindMatrix"), Ht.setOptional(B, se, "bindMatrixInverse"));
        const Rn = se.skeleton;
        Rn &&
          (qe.floatVertexTextures
            ? (Rn.boneTexture === null && Rn.computeBoneTexture(),
              Ht.setValue(B, "boneTexture", Rn.boneTexture, P))
            : console.warn(
                "THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required.",
              ));
      }
      se.isBatchedMesh &&
        (Ht.setOptional(B, se, "batchingTexture"),
        Ht.setValue(B, "batchingTexture", se._matricesTexture, P));
      const Zs = oe.morphAttributes;
      if (
        ((Zs.position !== void 0 ||
          Zs.normal !== void 0 ||
          (Zs.color !== void 0 && qe.isWebGL2 === !0)) &&
          dt.update(se, oe, Ei),
        (mi || ut.receiveShadow !== se.receiveShadow) &&
          ((ut.receiveShadow = se.receiveShadow),
          Ht.setValue(B, "receiveShadow", se.receiveShadow)),
        ae.isMeshGouraudMaterial &&
          ae.envMap !== null &&
          ((Vn.envMap.value = Ie),
          (Vn.flipEnvMap.value = Ie.isCubeTexture && Ie.isRenderTargetTexture === !1 ? -1 : 1)),
        mi &&
          (Ht.setValue(B, "toneMappingExposure", R.toneMappingExposure),
          ut.needsLights && Mi(Vn, Wi),
          De && ae.fog === !0 && Le.refreshFogUniforms(Vn, De),
          Le.refreshMaterialUniforms(Vn, ae, ue, ie, Te),
          bl.upload(B, $o(ut), Vn, P)),
        ae.isShaderMaterial &&
          ae.uniformsNeedUpdate === !0 &&
          (bl.upload(B, $o(ut), Vn, P), (ae.uniformsNeedUpdate = !1)),
        ae.isSpriteMaterial && Ht.setValue(B, "center", se.center),
        Ht.setValue(B, "modelViewMatrix", se.modelViewMatrix),
        Ht.setValue(B, "normalMatrix", se.normalMatrix),
        Ht.setValue(B, "modelMatrix", se.matrixWorld),
        ae.isShaderMaterial || ae.isRawShaderMaterial)
      ) {
        const Rn = ae.uniformsGroups;
        for (let wr = 0, Jo = Rn.length; wr < Jo; wr++)
          if (qe.isWebGL2) {
            const Zr = Rn[wr];
            (vt.update(Zr, Ei), vt.bind(Zr, Ei));
          } else
            console.warn(
              "THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.",
            );
      }
      return Ei;
    }
    function Mi(C, $) {
      ((C.ambientLightColor.needsUpdate = $),
        (C.lightProbe.needsUpdate = $),
        (C.directionalLights.needsUpdate = $),
        (C.directionalLightShadows.needsUpdate = $),
        (C.pointLights.needsUpdate = $),
        (C.pointLightShadows.needsUpdate = $),
        (C.spotLights.needsUpdate = $),
        (C.spotLightShadows.needsUpdate = $),
        (C.rectAreaLights.needsUpdate = $),
        (C.hemisphereLights.needsUpdate = $));
    }
    function Zo(C) {
      return (
        C.isMeshLambertMaterial ||
        C.isMeshToonMaterial ||
        C.isMeshPhongMaterial ||
        C.isMeshStandardMaterial ||
        C.isShadowMaterial ||
        (C.isShaderMaterial && C.lights === !0)
      );
    }
    ((this.getActiveCubeFace = function () {
      return z;
    }),
      (this.getActiveMipmapLevel = function () {
        return I;
      }),
      (this.getRenderTarget = function () {
        return F;
      }),
      (this.setRenderTargetTextures = function (C, $, oe) {
        ((st.get(C.texture).__webglTexture = $), (st.get(C.depthTexture).__webglTexture = oe));
        const ae = st.get(C);
        ((ae.__hasExternalTextures = !0),
          ae.__hasExternalTextures &&
            ((ae.__autoAllocateDepthBuffer = oe === void 0),
            ae.__autoAllocateDepthBuffer ||
              (he.has("WEBGL_multisampled_render_to_texture") === !0 &&
                (console.warn(
                  "THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided",
                ),
                (ae.__useRenderToTexture = !1)))));
      }),
      (this.setRenderTargetFramebuffer = function (C, $) {
        const oe = st.get(C);
        ((oe.__webglFramebuffer = $), (oe.__useDefaultFramebuffer = $ === void 0));
      }),
      (this.setRenderTarget = function (C, $ = 0, oe = 0) {
        ((F = C), (z = $), (I = oe));
        let ae = !0,
          se = null,
          De = !1,
          Xe = !1;
        if (C) {
          const Ie = st.get(C);
          Ie.__useDefaultFramebuffer !== void 0
            ? (Fe.bindFramebuffer(B.FRAMEBUFFER, null), (ae = !1))
            : Ie.__webglFramebuffer === void 0
              ? P.setupRenderTarget(C)
              : Ie.__hasExternalTextures &&
                P.rebindTextures(
                  C,
                  st.get(C.texture).__webglTexture,
                  st.get(C.depthTexture).__webglTexture,
                );
          const lt = C.texture;
          (lt.isData3DTexture || lt.isDataArrayTexture || lt.isCompressedArrayTexture) && (Xe = !0);
          const nt = st.get(C).__webglFramebuffer;
          (C.isWebGLCubeRenderTarget
            ? (Array.isArray(nt[$]) ? (se = nt[$][oe]) : (se = nt[$]), (De = !0))
            : qe.isWebGL2 && C.samples > 0 && P.useMultisampledRTT(C) === !1
              ? (se = st.get(C).__webglMultisampledFramebuffer)
              : Array.isArray(nt)
                ? (se = nt[oe])
                : (se = nt),
            b.copy(C.viewport),
            le.copy(C.scissor),
            (ne = C.scissorTest));
        } else
          (b.copy(j).multiplyScalar(ue).floor(), le.copy(L).multiplyScalar(ue).floor(), (ne = W));
        if (
          (Fe.bindFramebuffer(B.FRAMEBUFFER, se) && qe.drawBuffers && ae && Fe.drawBuffers(C, se),
          Fe.viewport(b),
          Fe.scissor(le),
          Fe.setScissorTest(ne),
          De)
        ) {
          const Ie = st.get(C.texture);
          B.framebufferTexture2D(
            B.FRAMEBUFFER,
            B.COLOR_ATTACHMENT0,
            B.TEXTURE_CUBE_MAP_POSITIVE_X + $,
            Ie.__webglTexture,
            oe,
          );
        } else if (Xe) {
          const Ie = st.get(C.texture),
            lt = $ || 0;
          B.framebufferTextureLayer(
            B.FRAMEBUFFER,
            B.COLOR_ATTACHMENT0,
            Ie.__webglTexture,
            oe || 0,
            lt,
          );
        }
        X = -1;
      }),
      (this.readRenderTargetPixels = function (C, $, oe, ae, se, De, Xe) {
        if (!(C && C.isWebGLRenderTarget)) {
          console.error(
            "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.",
          );
          return;
        }
        let Qe = st.get(C).__webglFramebuffer;
        if ((C.isWebGLCubeRenderTarget && Xe !== void 0 && (Qe = Qe[Xe]), Qe)) {
          Fe.bindFramebuffer(B.FRAMEBUFFER, Qe);
          try {
            const Ie = C.texture,
              lt = Ie.format,
              nt = Ie.type;
            if (
              lt !== hi &&
              He.convert(lt) !== B.getParameter(B.IMPLEMENTATION_COLOR_READ_FORMAT)
            ) {
              console.error(
                "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.",
              );
              return;
            }
            const rt =
              nt === Go &&
              (he.has("EXT_color_buffer_half_float") ||
                (qe.isWebGL2 && he.has("EXT_color_buffer_float")));
            if (
              nt !== Sr &&
              He.convert(nt) !== B.getParameter(B.IMPLEMENTATION_COLOR_READ_TYPE) &&
              !(
                nt === vr &&
                (qe.isWebGL2 || he.has("OES_texture_float") || he.has("WEBGL_color_buffer_float"))
              ) &&
              !rt
            ) {
              console.error(
                "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.",
              );
              return;
            }
            $ >= 0 &&
              $ <= C.width - ae &&
              oe >= 0 &&
              oe <= C.height - se &&
              B.readPixels($, oe, ae, se, He.convert(lt), He.convert(nt), De);
          } finally {
            const Ie = F !== null ? st.get(F).__webglFramebuffer : null;
            Fe.bindFramebuffer(B.FRAMEBUFFER, Ie);
          }
        }
      }),
      (this.copyFramebufferToTexture = function (C, $, oe = 0) {
        const ae = Math.pow(2, -oe),
          se = Math.floor($.image.width * ae),
          De = Math.floor($.image.height * ae);
        (P.setTexture2D($, 0),
          B.copyTexSubImage2D(B.TEXTURE_2D, oe, 0, 0, C.x, C.y, se, De),
          Fe.unbindTexture());
      }),
      (this.copyTextureToTexture = function (C, $, oe, ae = 0) {
        const se = $.image.width,
          De = $.image.height,
          Xe = He.convert(oe.format),
          Qe = He.convert(oe.type);
        (P.setTexture2D(oe, 0),
          B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL, oe.flipY),
          B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL, oe.premultiplyAlpha),
          B.pixelStorei(B.UNPACK_ALIGNMENT, oe.unpackAlignment),
          $.isDataTexture
            ? B.texSubImage2D(B.TEXTURE_2D, ae, C.x, C.y, se, De, Xe, Qe, $.image.data)
            : $.isCompressedTexture
              ? B.compressedTexSubImage2D(
                  B.TEXTURE_2D,
                  ae,
                  C.x,
                  C.y,
                  $.mipmaps[0].width,
                  $.mipmaps[0].height,
                  Xe,
                  $.mipmaps[0].data,
                )
              : B.texSubImage2D(B.TEXTURE_2D, ae, C.x, C.y, Xe, Qe, $.image),
          ae === 0 && oe.generateMipmaps && B.generateMipmap(B.TEXTURE_2D),
          Fe.unbindTexture());
      }),
      (this.copyTextureToTexture3D = function (C, $, oe, ae, se = 0) {
        if (R.isWebGL1Renderer) {
          console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
          return;
        }
        const De = C.max.x - C.min.x + 1,
          Xe = C.max.y - C.min.y + 1,
          Qe = C.max.z - C.min.z + 1,
          Ie = He.convert(ae.format),
          lt = He.convert(ae.type);
        let nt;
        if (ae.isData3DTexture) (P.setTexture3D(ae, 0), (nt = B.TEXTURE_3D));
        else if (ae.isDataArrayTexture || ae.isCompressedArrayTexture)
          (P.setTexture2DArray(ae, 0), (nt = B.TEXTURE_2D_ARRAY));
        else {
          console.warn(
            "THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.",
          );
          return;
        }
        (B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL, ae.flipY),
          B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL, ae.premultiplyAlpha),
          B.pixelStorei(B.UNPACK_ALIGNMENT, ae.unpackAlignment));
        const rt = B.getParameter(B.UNPACK_ROW_LENGTH),
          Pt = B.getParameter(B.UNPACK_IMAGE_HEIGHT),
          _n = B.getParameter(B.UNPACK_SKIP_PIXELS),
          Vt = B.getParameter(B.UNPACK_SKIP_ROWS),
          An = B.getParameter(B.UNPACK_SKIP_IMAGES),
          gt = oe.isCompressedTexture ? oe.mipmaps[se] : oe.image;
        (B.pixelStorei(B.UNPACK_ROW_LENGTH, gt.width),
          B.pixelStorei(B.UNPACK_IMAGE_HEIGHT, gt.height),
          B.pixelStorei(B.UNPACK_SKIP_PIXELS, C.min.x),
          B.pixelStorei(B.UNPACK_SKIP_ROWS, C.min.y),
          B.pixelStorei(B.UNPACK_SKIP_IMAGES, C.min.z),
          oe.isDataTexture || oe.isData3DTexture
            ? B.texSubImage3D(nt, se, $.x, $.y, $.z, De, Xe, Qe, Ie, lt, gt.data)
            : oe.isCompressedArrayTexture
              ? (console.warn(
                  "THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture.",
                ),
                B.compressedTexSubImage3D(nt, se, $.x, $.y, $.z, De, Xe, Qe, Ie, gt.data))
              : B.texSubImage3D(nt, se, $.x, $.y, $.z, De, Xe, Qe, Ie, lt, gt),
          B.pixelStorei(B.UNPACK_ROW_LENGTH, rt),
          B.pixelStorei(B.UNPACK_IMAGE_HEIGHT, Pt),
          B.pixelStorei(B.UNPACK_SKIP_PIXELS, _n),
          B.pixelStorei(B.UNPACK_SKIP_ROWS, Vt),
          B.pixelStorei(B.UNPACK_SKIP_IMAGES, An),
          se === 0 && ae.generateMipmaps && B.generateMipmap(nt),
          Fe.unbindTexture());
      }),
      (this.initTexture = function (C) {
        (C.isCubeTexture
          ? P.setTextureCube(C, 0)
          : C.isData3DTexture
            ? P.setTexture3D(C, 0)
            : C.isDataArrayTexture || C.isCompressedArrayTexture
              ? P.setTexture2DArray(C, 0)
              : P.setTexture2D(C, 0),
          Fe.unbindTexture());
      }),
      (this.resetState = function () {
        ((z = 0), (I = 0), (F = null), Fe.reset(), it.reset());
      }),
      typeof __THREE_DEVTOOLS__ < "u" &&
        __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this })));
  }
  get coordinateSystem() {
    return Bi;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const n = this.getContext();
    ((n.drawingBufferColorSpace = e === xf ? "display-p3" : "srgb"),
      (n.unpackColorSpace = At.workingColorSpace === kl ? "display-p3" : "srgb"));
  }
  get outputEncoding() {
    return (
      console.warn(
        "THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead.",
      ),
      this.outputColorSpace === ln ? Yr : rg
    );
  }
  set outputEncoding(e) {
    (console.warn(
      "THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead.",
    ),
      (this.outputColorSpace = e === Yr ? ln : Gi));
  }
  get useLegacyLights() {
    return (
      console.warn(
        "THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.",
      ),
      this._useLegacyLights
    );
  }
  set useLegacyLights(e) {
    (console.warn(
      "THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.",
    ),
      (this._useLegacyLights = e));
  }
}
class FT extends wf {}
FT.prototype.isWebGL1Renderer = !0;
class wg extends wn {
  constructor() {
    (super(),
      (this.isScene = !0),
      (this.type = "Scene"),
      (this.background = null),
      (this.environment = null),
      (this.fog = null),
      (this.backgroundBlurriness = 0),
      (this.backgroundIntensity = 1),
      (this.overrideMaterial = null),
      typeof __THREE_DEVTOOLS__ < "u" &&
        __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this })));
  }
  copy(e, n) {
    return (
      super.copy(e, n),
      e.background !== null && (this.background = e.background.clone()),
      e.environment !== null && (this.environment = e.environment.clone()),
      e.fog !== null && (this.fog = e.fog.clone()),
      (this.backgroundBlurriness = e.backgroundBlurriness),
      (this.backgroundIntensity = e.backgroundIntensity),
      e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()),
      (this.matrixAutoUpdate = e.matrixAutoUpdate),
      this
    );
  }
  toJSON(e) {
    const n = super.toJSON(e);
    return (
      this.fog !== null && (n.object.fog = this.fog.toJSON()),
      this.backgroundBlurriness > 0 && (n.object.backgroundBlurriness = this.backgroundBlurriness),
      this.backgroundIntensity !== 1 && (n.object.backgroundIntensity = this.backgroundIntensity),
      n
    );
  }
}
class Ag extends $s {
  constructor(e) {
    (super(),
      (this.isLineBasicMaterial = !0),
      (this.type = "LineBasicMaterial"),
      (this.color = new Mt(16777215)),
      (this.map = null),
      (this.linewidth = 1),
      (this.linecap = "round"),
      (this.linejoin = "round"),
      (this.fog = !0),
      this.setValues(e));
  }
  copy(e) {
    return (
      super.copy(e),
      this.color.copy(e.color),
      (this.map = e.map),
      (this.linewidth = e.linewidth),
      (this.linecap = e.linecap),
      (this.linejoin = e.linejoin),
      (this.fog = e.fog),
      this
    );
  }
}
const Dm = new ee(),
  Nm = new ee(),
  Um = new Zt(),
  tf = new Sf(),
  Tl = new jo();
class OT extends wn {
  constructor(e = new ti(), n = new Ag()) {
    (super(),
      (this.isLine = !0),
      (this.type = "Line"),
      (this.geometry = e),
      (this.material = n),
      this.updateMorphTargets());
  }
  copy(e, n) {
    return (
      super.copy(e, n),
      (this.material = Array.isArray(e.material) ? e.material.slice() : e.material),
      (this.geometry = e.geometry),
      this
    );
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const n = e.attributes.position,
        s = [0];
      for (let a = 1, l = n.count; a < l; a++)
        (Dm.fromBufferAttribute(n, a - 1),
          Nm.fromBufferAttribute(n, a),
          (s[a] = s[a - 1]),
          (s[a] += Dm.distanceTo(Nm)));
      e.setAttribute("lineDistance", new pi(s, 1));
    } else
      console.warn(
        "THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.",
      );
    return this;
  }
  raycast(e, n) {
    const s = this.geometry,
      a = this.matrixWorld,
      l = e.params.Line.threshold,
      f = s.drawRange;
    if (
      (s.boundingSphere === null && s.computeBoundingSphere(),
      Tl.copy(s.boundingSphere),
      Tl.applyMatrix4(a),
      (Tl.radius += l),
      e.ray.intersectsSphere(Tl) === !1)
    )
      return;
    (Um.copy(a).invert(), tf.copy(e.ray).applyMatrix4(Um));
    const u = l / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      h = u * u,
      m = new ee(),
      g = new ee(),
      v = new ee(),
      y = new ee(),
      S = this.isLineSegments ? 2 : 1,
      T = s.index,
      x = s.attributes.position;
    if (T !== null) {
      const _ = Math.max(0, f.start),
        D = Math.min(T.count, f.start + f.count);
      for (let R = _, N = D - 1; R < N; R += S) {
        const z = T.getX(R),
          I = T.getX(R + 1);
        if (
          (m.fromBufferAttribute(x, z),
          g.fromBufferAttribute(x, I),
          tf.distanceSqToSegment(m, g, y, v) > h)
        )
          continue;
        y.applyMatrix4(this.matrixWorld);
        const X = e.ray.origin.distanceTo(y);
        X < e.near ||
          X > e.far ||
          n.push({
            distance: X,
            point: v.clone().applyMatrix4(this.matrixWorld),
            index: R,
            face: null,
            faceIndex: null,
            object: this,
          });
      }
    } else {
      const _ = Math.max(0, f.start),
        D = Math.min(x.count, f.start + f.count);
      for (let R = _, N = D - 1; R < N; R += S) {
        if (
          (m.fromBufferAttribute(x, R),
          g.fromBufferAttribute(x, R + 1),
          tf.distanceSqToSegment(m, g, y, v) > h)
        )
          continue;
        y.applyMatrix4(this.matrixWorld);
        const I = e.ray.origin.distanceTo(y);
        I < e.near ||
          I > e.far ||
          n.push({
            distance: I,
            point: v.clone().applyMatrix4(this.matrixWorld),
            index: R,
            face: null,
            faceIndex: null,
            object: this,
          });
      }
    }
  }
  updateMorphTargets() {
    const n = this.geometry.morphAttributes,
      s = Object.keys(n);
    if (s.length > 0) {
      const a = n[s[0]];
      if (a !== void 0) {
        ((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}));
        for (let l = 0, f = a.length; l < f; l++) {
          const u = a[l].name || String(l);
          (this.morphTargetInfluences.push(0), (this.morphTargetDictionary[u] = l));
        }
      }
    }
  }
}
class Rg extends $s {
  constructor(e) {
    (super(),
      (this.isPointsMaterial = !0),
      (this.type = "PointsMaterial"),
      (this.color = new Mt(16777215)),
      (this.map = null),
      (this.alphaMap = null),
      (this.size = 1),
      (this.sizeAttenuation = !0),
      (this.fog = !0),
      this.setValues(e));
  }
  copy(e) {
    return (
      super.copy(e),
      this.color.copy(e.color),
      (this.map = e.map),
      (this.alphaMap = e.alphaMap),
      (this.size = e.size),
      (this.sizeAttenuation = e.sizeAttenuation),
      (this.fog = e.fog),
      this
    );
  }
}
const Im = new Zt(),
  pf = new Sf(),
  wl = new jo(),
  Al = new ee();
class kT extends wn {
  constructor(e = new ti(), n = new Rg()) {
    (super(),
      (this.isPoints = !0),
      (this.type = "Points"),
      (this.geometry = e),
      (this.material = n),
      this.updateMorphTargets());
  }
  copy(e, n) {
    return (
      super.copy(e, n),
      (this.material = Array.isArray(e.material) ? e.material.slice() : e.material),
      (this.geometry = e.geometry),
      this
    );
  }
  raycast(e, n) {
    const s = this.geometry,
      a = this.matrixWorld,
      l = e.params.Points.threshold,
      f = s.drawRange;
    if (
      (s.boundingSphere === null && s.computeBoundingSphere(),
      wl.copy(s.boundingSphere),
      wl.applyMatrix4(a),
      (wl.radius += l),
      e.ray.intersectsSphere(wl) === !1)
    )
      return;
    (Im.copy(a).invert(), pf.copy(e.ray).applyMatrix4(Im));
    const u = l / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      h = u * u,
      m = s.index,
      v = s.attributes.position;
    if (m !== null) {
      const y = Math.max(0, f.start),
        S = Math.min(m.count, f.start + f.count);
      for (let T = y, E = S; T < E; T++) {
        const x = m.getX(T);
        (Al.fromBufferAttribute(v, x), Fm(Al, x, h, a, e, n, this));
      }
    } else {
      const y = Math.max(0, f.start),
        S = Math.min(v.count, f.start + f.count);
      for (let T = y, E = S; T < E; T++)
        (Al.fromBufferAttribute(v, T), Fm(Al, T, h, a, e, n, this));
    }
  }
  updateMorphTargets() {
    const n = this.geometry.morphAttributes,
      s = Object.keys(n);
    if (s.length > 0) {
      const a = n[s[0]];
      if (a !== void 0) {
        ((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}));
        for (let l = 0, f = a.length; l < f; l++) {
          const u = a[l].name || String(l);
          (this.morphTargetInfluences.push(0), (this.morphTargetDictionary[u] = l));
        }
      }
    }
  }
}
function Fm(r, e, n, s, a, l, f) {
  const u = pf.distanceSqToPoint(r);
  if (u < n) {
    const h = new ee();
    (pf.closestPointToPoint(r, h), h.applyMatrix4(s));
    const m = a.ray.origin.distanceTo(h);
    if (m < a.near || m > a.far) return;
    l.push({ distance: m, distanceToRay: Math.sqrt(u), point: h, index: e, face: null, object: f });
  }
}
class Af extends ti {
  constructor(e = 1, n = 32, s = 16, a = 0, l = Math.PI * 2, f = 0, u = Math.PI) {
    (super(),
      (this.type = "SphereGeometry"),
      (this.parameters = {
        radius: e,
        widthSegments: n,
        heightSegments: s,
        phiStart: a,
        phiLength: l,
        thetaStart: f,
        thetaLength: u,
      }),
      (n = Math.max(3, Math.floor(n))),
      (s = Math.max(2, Math.floor(s))));
    const h = Math.min(f + u, Math.PI);
    let m = 0;
    const g = [],
      v = new ee(),
      y = new ee(),
      S = [],
      T = [],
      E = [],
      x = [];
    for (let _ = 0; _ <= s; _++) {
      const D = [],
        R = _ / s;
      let N = 0;
      _ === 0 && f === 0 ? (N = 0.5 / n) : _ === s && h === Math.PI && (N = -0.5 / n);
      for (let z = 0; z <= n; z++) {
        const I = z / n;
        ((v.x = -e * Math.cos(a + I * l) * Math.sin(f + R * u)),
          (v.y = e * Math.cos(f + R * u)),
          (v.z = e * Math.sin(a + I * l) * Math.sin(f + R * u)),
          T.push(v.x, v.y, v.z),
          y.copy(v).normalize(),
          E.push(y.x, y.y, y.z),
          x.push(I + N, 1 - R),
          D.push(m++));
      }
      g.push(D);
    }
    for (let _ = 0; _ < s; _++)
      for (let D = 0; D < n; D++) {
        const R = g[_][D + 1],
          N = g[_][D],
          z = g[_ + 1][D],
          I = g[_ + 1][D + 1];
        ((_ !== 0 || f > 0) && S.push(R, N, I), (_ !== s - 1 || h < Math.PI) && S.push(N, z, I));
      }
    (this.setIndex(S),
      this.setAttribute("position", new pi(T, 3)),
      this.setAttribute("normal", new pi(E, 3)),
      this.setAttribute("uv", new pi(x, 2)));
  }
  copy(e) {
    return (super.copy(e), (this.parameters = Object.assign({}, e.parameters)), this);
  }
  static fromJSON(e) {
    return new Af(
      e.radius,
      e.widthSegments,
      e.heightSegments,
      e.phiStart,
      e.phiLength,
      e.thetaStart,
      e.thetaLength,
    );
  }
}
class Cg {
  constructor(e = !0) {
    ((this.autoStart = e),
      (this.startTime = 0),
      (this.oldTime = 0),
      (this.elapsedTime = 0),
      (this.running = !1));
  }
  start() {
    ((this.startTime = Om()),
      (this.oldTime = this.startTime),
      (this.elapsedTime = 0),
      (this.running = !0));
  }
  stop() {
    (this.getElapsedTime(), (this.running = !1), (this.autoStart = !1));
  }
  getElapsedTime() {
    return (this.getDelta(), this.elapsedTime);
  }
  getDelta() {
    let e = 0;
    if (this.autoStart && !this.running) return (this.start(), 0);
    if (this.running) {
      const n = Om();
      ((e = (n - this.oldTime) / 1e3), (this.oldTime = n), (this.elapsedTime += e));
    }
    return e;
  }
}
function Om() {
  return (typeof performance > "u" ? Date : performance).now();
}
typeof __THREE_DEVTOOLS__ < "u" &&
  __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: _f } }));
typeof window < "u" &&
  (window.__THREE__
    ? console.warn("WARNING: Multiple instances of Three.js being imported.")
    : (window.__THREE__ = _f));
const km = [13346551, 9024762, 16106215, 9757397, 11845374, 7653356];
function zT(r) {
  return [(r >> 16) & 255, (r >> 8) & 255, r & 255].map((e) => e / 255);
}
function BT() {
  const r = _t.useRef(null),
    [e, n] = _t.useState(!1);
  return (
    _t.useEffect(() => {
      const s = r.current;
      if (!s) return;
      const a = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let l = null,
        f = 0,
        u = !1,
        h = !1;
      try {
        const m = new wg(),
          g = new Hn(65, window.innerWidth / window.innerHeight, 0.1, 1e3);
        ((g.position.z = 60),
          (l = new wf({ canvas: s, antialias: !1, alpha: !0 })),
          l.setSize(window.innerWidth, window.innerHeight),
          l.setPixelRatio(1),
          l.setClearColor(1973806, 0));
        const v = 60,
          y = new ti(),
          S = new Float32Array(v * 3),
          T = new Float32Array(v * 3),
          E = new Float32Array(v),
          x = new Float32Array(v),
          _ = new Float32Array(v);
        for (let X = 0; X < v; X++) {
          const A = (Math.random() - 0.5) * 140,
            b = (Math.random() - 0.5) * 90,
            le = (Math.random() - 0.5) * 20;
          ((S[X * 3] = A),
            (S[X * 3 + 1] = b),
            (S[X * 3 + 2] = le),
            (x[X] = A),
            (E[X] = b),
            (_[X] = Math.random() * Math.PI * 2));
          const ne = km[Math.floor(Math.random() * km.length)],
            [pe, H, J] = zT(ne);
          ((T[X * 3] = pe), (T[X * 3 + 1] = H), (T[X * 3 + 2] = J));
        }
        (y.setAttribute("position", new ei(S, 3)), y.setAttribute("color", new ei(T, 3)));
        const D = new Rg({
            size: 2.2,
            vertexColors: !0,
            transparent: !0,
            opacity: 0.58,
            sizeAttenuation: !0,
          }),
          R = new kT(y, D);
        m.add(R);
        const N = new Cg(),
          z = () => {
            if (u) return;
            if (h || document.hidden) {
              f = requestAnimationFrame(z);
              return;
            }
            f = requestAnimationFrame(z);
            const X = N.getElapsedTime();
            if (!a) {
              const A = y.getAttribute("position");
              for (let b = 0; b < v; b++) {
                const le = _[b],
                  ne = E[b] + Math.sin(X * 0.3 + le) * 4,
                  pe = x[b] + Math.cos(X * 0.22 + le * 0.7) * 1.8;
                A.setXYZ(b, pe, ne, S[b * 3 + 2]);
              }
              ((A.needsUpdate = !0), (D.opacity = 0.48 + Math.sin(X * 0.5) * 0.12));
            }
            l.render(m, g);
          };
        z();
        const I = () => {
          u ||
            !l ||
            ((g.aspect = window.innerWidth / window.innerHeight),
            g.updateProjectionMatrix(),
            l.setSize(window.innerWidth, window.innerHeight));
        };
        window.addEventListener("resize", I);
        const F = () => {
          document.hidden ? (h = !0) : ((h = !1), N.getDelta());
        };
        return (
          document.addEventListener("visibilitychange", F),
          () => {
            ((u = !0),
              cancelAnimationFrame(f),
              window.removeEventListener("resize", I),
              document.removeEventListener("visibilitychange", F));
            try {
              l == null || l.dispose();
            } catch {}
            try {
              y.dispose();
            } catch {}
            try {
              D.dispose();
            } catch {}
          }
        );
      } catch {
        if ((n(!0), l))
          try {
            l.dispose();
          } catch {}
      }
      return () => {
        if (((u = !0), f && cancelAnimationFrame(f), l))
          try {
            l.dispose();
          } catch {}
      };
    }, []),
    e
      ? de.jsx("div", {
          className:
            "fixed inset-0 -z-10 bg-gradient-to-br from-catppuccin-base via-catppuccin-mantle to-catppuccin-crust",
          "aria-hidden": "true",
        })
      : de.jsx("canvas", {
          ref: r,
          "aria-hidden": "true",
          style: {
            position: "fixed",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            pointerEvents: "none",
            display: "block",
          },
        })
  );
}
const Rl = [13346551, 9024762, 9757397];
function HT({ count: r = 6 }) {
  const e = _t.useRef(null),
    [n, s] = _t.useState(!1);
  return (
    _t.useEffect(() => {
      const a = e.current;
      if (!a) return;
      let l = null,
        f = 0,
        u = !1;
      try {
        const h = a.clientWidth || 32,
          m = a.clientHeight || 240,
          g = new wg(),
          v = new Hn(45, h / Math.max(m, 1), 0.1, 100);
        (v.position.set(0, 0, 30),
          v.lookAt(0, 0, 0),
          (l = new wf({ canvas: a, antialias: !0, alpha: !0 })),
          l.setSize(h, m),
          l.setPixelRatio(Math.min(window.devicePixelRatio, 2)),
          l.setClearColor(0, 0));
        const y = [],
          S = [],
          T = new Af(0.9, 8, 8),
          E = Math.max(2, Math.min(r, 20)),
          x = 40,
          _ = x / E;
        for (let z = 0; z < E; z++) {
          const I = x / 2 - z * _ - _ * 0.2,
            F = I - _ * 0.6,
            X = [],
            A = 16;
          for (let ue = 0; ue <= A; ue++) {
            const V = ue / A,
              K = bx.lerp(I, F, V),
              j = Math.sin(V * Math.PI) * 1.2;
            X.push(new ee(j, K, 0));
          }
          const b = new ti().setFromPoints(X),
            le = Rl[z % Rl.length],
            ne = new Ag({ color: le, transparent: !0, opacity: 0.42 }),
            pe = new OT(b, ne);
          (g.add(pe), y.push(pe));
          const H = Rl[(z + 1) % Rl.length],
            J = new Mf({ color: H, transparent: !0, opacity: 0.78 }),
            ie = new Hi(T, J);
          (ie.position.set(0, (I + F) / 2, 0.5),
            (ie._phase = Math.random() * Math.PI * 2),
            g.add(ie),
            S.push(ie));
        }
        const D = new Cg(),
          R = () => {
            if (u) return;
            f = requestAnimationFrame(R);
            const z = D.getElapsedTime();
            for (let I = 0; I < S.length; I++) {
              const F = S[I],
                X = F._phase,
                A = F.material;
              ((A.opacity = 0.55 + Math.sin(z * 1.1 + X) * 0.28),
                F.scale.setScalar(0.95 + Math.sin(z * 0.9 + X) * 0.18));
            }
            for (let I = 0; I < y.length; I++) {
              const X = y[I].material;
              X.opacity = 0.28 + Math.sin(z * 0.6 + I) * 0.14;
            }
            l.render(g, v);
          };
        R();
        const N = new ResizeObserver(() => {
          if (u || !l || !a) return;
          const z = a.clientWidth || 32,
            I = a.clientHeight || 240;
          ((v.aspect = z / Math.max(I, 1)), v.updateProjectionMatrix(), l.setSize(z, I));
        });
        return (
          N.observe(a),
          () => {
            ((u = !0), cancelAnimationFrame(f), N.disconnect());
            try {
              l == null || l.dispose();
            } catch {}
            for (const z of y)
              try {
                (z.geometry.dispose(), z.material.dispose());
              } catch {}
            for (const z of S)
              try {
                z.material.dispose();
              } catch {}
            try {
              T.dispose();
            } catch {}
          }
        );
      } catch {
        if ((s(!0), l))
          try {
            l.dispose();
          } catch {}
      }
      return () => {
        if (((u = !0), f && cancelAnimationFrame(f), l))
          try {
            l.dispose();
          } catch {}
      };
    }, [r]),
    n
      ? null
      : de.jsx("canvas", {
          ref: e,
          "aria-hidden": "true",
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "32px",
            height: "100%",
            pointerEvents: "none",
            display: "block",
            opacity: 0.95,
          },
        })
  );
}
function zm(r, e) {
  return r.length <= e ? r : r.slice(0, e - 1) + "…";
}
function GT(r) {
  return Sv(r);
}
function VT(r) {
  switch (r) {
    case "passed":
      return "passed";
    case "running":
      return "running";
    case "failed":
      return "destructive";
    case "skipped":
      return "skipped";
    case "pending":
      return "pending";
    default:
      return "secondary";
  }
}
function WT() {
  const [r, e] = _t.useState(null),
    [n, s] = _t.useState(null),
    [a, l] = _t.useState(null),
    [f, u] = _t.useState(0),
    [h, m] = _t.useState(!1),
    [g, v] = _t.useState(!1),
    [y, S] = _t.useState("sessions"),
    [T, E] = _t.useState(null),
    [x, _] = _t.useState(!1),
    [D, R] = _t.useState(null),
    N = _t.useRef(null);
  N.current = a;
  const z = _t.useRef(null),
    I = _t.useRef(0),
    F = _t.useCallback(async () => {
      var fe;
      (fe = z.current) == null || fe.abort();
      const Z = new AbortController();
      z.current = Z;
      try {
        const B = new URLSearchParams();
        (B.set("limit", "200"), N.current && B.set("focusId", N.current));
        const ze = await fetch(`/api/snapshot?${B.toString()}`, { signal: Z.signal });
        if (!ze.ok) throw new Error(`HTTP ${ze.status}`);
        const he = await ze.json();
        (e(he),
          s(null),
          (I.current = 0),
          !N.current && he.selectedSession
            ? (l(he.selectedSession.id), u(0), m(!1), v(!1))
            : N.current
              ? !he.sessions.some((Fe) => Fe.id === N.current) &&
                he.selectedSession &&
                (l(he.selectedSession.id), u(0), m(!1))
              : !he.selectedSession && he.sessions.length > 0 && l(he.sessions[0].id));
      } catch (B) {
        if (B instanceof DOMException && B.name === "AbortError") return;
        ((I.current += 1), s(B instanceof Error ? B.message : String(B)));
      }
    }, []);
  _t.useEffect(() => {
    let Z,
      fe = !1;
    const B = () => {
      if (fe) return;
      const he = I.current === 0 ? 1e3 : Math.min(1e3 * Math.pow(2, I.current), 1e4);
      Z = window.setTimeout(async () => {
        if (document.hidden) {
          B();
          return;
        }
        (await F(), B());
      }, he);
    };
    (F(), B());
    const ze = () => {
      document.hidden || (Z && window.clearTimeout(Z), F(), B());
    };
    return (
      document.addEventListener("visibilitychange", ze),
      () => {
        var he;
        ((fe = !0),
          Z && window.clearTimeout(Z),
          document.removeEventListener("visibilitychange", ze),
          (he = z.current) == null || he.abort());
      }
    );
  }, [F]);
  const X = (() => {
      if (r) return a ? r.sessions.find((Z) => Z.id === a) : (r.selectedSession ?? void 0);
    })(),
    A = (() => {
      var fe;
      if (!X || !r) return (r == null ? void 0 : r.selectedSteps) ?? [];
      const Z = r.stepsBySession[X.id];
      return (
        Z || (((fe = r.selectedSession) == null ? void 0 : fe.id) === X.id ? r.selectedSteps : [])
      );
    })(),
    b = (() => {
      var fe;
      if (!X || !r) return (r == null ? void 0 : r.selectedArtifacts) ?? [];
      const Z = r.artifactsBySession[X.id];
      return (
        Z ||
        (((fe = r.selectedSession) == null ? void 0 : fe.id) === X.id ? r.selectedArtifacts : [])
      );
    })(),
    le = (() => {
      var fe;
      if (!X || !r) return (r == null ? void 0 : r.selectedGateEvents) ?? [];
      const Z = r.gateEventsBySession[X.id];
      return (
        Z ||
        (((fe = r.selectedSession) == null ? void 0 : fe.id) === X.id ? r.selectedGateEvents : [])
      );
    })(),
    ne = (() => {
      var fe;
      if (!X || !r) return (r == null ? void 0 : r.selectedAttempts) ?? [];
      const Z = r.attemptsBySession[X.id];
      return (
        Z ||
        (((fe = r.selectedSession) == null ? void 0 : fe.id) === X.id ? r.selectedAttempts : [])
      );
    })(),
    pe = (() => {
      var B;
      const Z = new Map();
      if (!r || !X) return Z;
      const fe = (B = r.artifactExists) == null ? void 0 : B[X.id];
      if (fe) {
        for (const [ze, he] of Object.entries(fe)) Z.set(ze, he);
        return Z;
      }
      return Z;
    })();
  function H(Z) {
    if (pe.has(Z.filePath)) return pe.get(Z.filePath);
  }
  function J(Z, fe) {
    return fe === void 0 ? `${Z.artifactKey}: ${Z.filePath} (判定中…)` : Rv(Z, fe);
  }
  _t.useEffect(() => {
    if (!X) {
      R(null);
      return;
    }
    const Z = X.workflowPath;
    if (!Z) {
      R(!1);
      return;
    }
    const fe = new AbortController();
    return (
      fetch(
        `/api/preview?filePath=${encodeURIComponent(Z)}&sessionId=${encodeURIComponent(X.id)}`,
        { signal: fe.signal },
      )
        .then((B) => B.json())
        .then((B) => {
          B.reason === "file not found" ? R(!1) : R(!0);
        })
        .catch(() => R(null)),
      () => fe.abort()
    );
  }, [X == null ? void 0 : X.id, X == null ? void 0 : X.workflowPath]);
  const ie = b[f],
    ue = ie == null ? void 0 : ie.filePath;
  if (
    (_t.useEffect(() => {
      if (!h || !X || !ue) {
        E(null);
        return;
      }
      const Z = ie;
      if (!Z) {
        E(null);
        return;
      }
      const fe = new AbortController();
      _(!0);
      const B = new URLSearchParams();
      return (
        B.set("filePath", Z.filePath),
        B.set("sessionId", X.id),
        fetch(`/api/preview?${B.toString()}`, { signal: fe.signal })
          .then((ze) => ze.json())
          .then((ze) => {
            (E(ze), _(!1));
          })
          .catch((ze) => {
            (ze instanceof DOMException && ze.name === "AbortError") ||
              (E({ ok: !1, reason: ze instanceof Error ? ze.message : String(ze) }), _(!1));
          }),
        () => {
          fe.abort();
        }
      );
    }, [h, f, X == null ? void 0 : X.id, ue]),
    _t.useEffect(() => {
      (u(0), m(!1), E(null), v(!1));
    }, [a]),
    _t.useEffect(() => {
      (f >= b.length && b.length > 0 && u(b.length - 1), b.length === 0 && u(0));
    }, [b.length, f]),
    _t.useEffect(() => {
      b.length > Kn && !g && f >= Kn && v(!0);
    }, [f, b.length, g]),
    _t.useEffect(() => {
      const Z = (fe) => {
        if (!r || r.sessions.length === 0) return;
        const B = r.sessions,
          ze = a ? B.findIndex((he) => he.id === a) : 0;
        if (fe.key === "Tab") {
          (fe.preventDefault(), S((he) => (he === "sessions" ? "artifacts" : "sessions")));
          return;
        }
        if (fe.key === "a" || fe.key === "A") {
          b.length > Kn && v((he) => !he);
          return;
        }
        if (fe.key === "r" || fe.key === "R") {
          F();
          return;
        }
        if (fe.key === "Enter") {
          y === "artifacts" && b.length > 0 && m((he) => !he);
          return;
        }
        if (y === "sessions") {
          if (fe.key === "j" || fe.key === "ArrowDown") {
            fe.preventDefault();
            const he = Math.min(ze + 1, B.length - 1);
            he !== ze && l(B[he].id);
          } else if (fe.key === "k" || fe.key === "ArrowUp") {
            fe.preventDefault();
            const he = Math.max(ze - 1, 0);
            he !== ze && l(B[he].id);
          }
        } else
          fe.key === "j" || fe.key === "ArrowDown"
            ? (fe.preventDefault(),
              u((he) => {
                const qe = Math.min(he + 1, Math.max(0, b.length - 1));
                return (qe >= Kn && !g && b.length > Kn && v(!0), qe);
              }))
            : (fe.key === "k" || fe.key === "ArrowUp") &&
              (fe.preventDefault(), u((he) => Math.max(he - 1, 0)));
      };
      return (
        window.addEventListener("keydown", Z), () => window.removeEventListener("keydown", Z)
      );
    }, [r, a, b.length, y, F, g]),
    !r)
  )
    return de.jsx("div", {
      className:
        "flex h-screen items-center justify-center bg-catppuccin-base text-catppuccin-text",
      children: de.jsx("div", {
        className: "text-sm text-catppuccin-subtext0",
        children: n ? `Error: ${n}` : "Loading...",
      }),
    });
  const V = r.totalSessions,
    K = r.sessions,
    j = V - K.length,
    L = X ? sp(X) : "",
    W = rp(A),
    q = X ? op(X.status) : null,
    ce = X ? (X.cwd ?? X.workflowPath.replace(/\/[^/]*$/, "") ?? "") : "",
    me = new Map();
  for (const Z of A) me.set(Z.id, Z.stepKey);
  const Te = Cv(ne, le, me),
    Me = b.length,
    Pe = Me > Kn && !g,
    Ue = Pe ? Kn : Me;
  return de.jsxs("div", {
    className: "relative flex h-screen bg-transparent text-catppuccin-text overflow-hidden",
    children: [
      de.jsx(BT, {}),
      de.jsxs("div", {
        className: Kt(
          "flex w-[320px] shrink-0 flex-col border-r bg-catppuccin-mantle",
          y === "sessions" ? "border-catppuccin-yellow" : "border-catppuccin-surface0",
        ),
        children: [
          de.jsx("div", {
            className: "border-b border-catppuccin-surface0 px-3 py-2",
            children: de.jsxs("h2", {
              className: "text-xs font-semibold tracking-widest text-catppuccin-subtext0",
              children: ["SESSIONS ", V > 0 && `(${V})`],
            }),
          }),
          de.jsx("div", {
            className: "flex-1 overflow-auto",
            children:
              r.dbMissing || K.length === 0
                ? de.jsxs("div", {
                    className: "p-4 text-sm text-catppuccin-subtext0",
                    children: [
                      r.dbMissing
                        ? de.jsx("span", {
                            children:
                              "セッションがありません。`tado init --title` で作成してください",
                          })
                        : de.jsx("span", { children: "(no sessions)" }),
                      r.error &&
                        de.jsx("div", { className: "mt-2 text-catppuccin-red", children: r.error }),
                      n && de.jsx("div", { className: "mt-2 text-catppuccin-red", children: n }),
                    ],
                  })
                : de.jsxs("div", {
                    className: "flex flex-col",
                    children: [
                      K.map((Z) => {
                        const fe = r.stepsBySession[Z.id] ?? [],
                          B = rp(fe),
                          ze = op(Z.status),
                          he = Z.id === a,
                          qe = GT(Z),
                          Fe = sp(Z);
                        return de.jsxs(
                          "button",
                          {
                            onClick: () => {
                              (l(Z.id), S("sessions"));
                            },
                            className: Kt(
                              "flex w-full items-center gap-2 border-l-2 px-3 py-2 text-left text-xs",
                              he
                                ? "border-catppuccin-mauve bg-catppuccin-surface0 text-catppuccin-text"
                                : "border-transparent hover:bg-catppuccin-surface0/50 text-catppuccin-subtext1",
                            ),
                            children: [
                              de.jsx("span", {
                                className: Kt(
                                  "shrink-0",
                                  he ? "text-catppuccin-mauve" : "text-transparent",
                                ),
                                children: "▸",
                              }),
                              de.jsx("span", {
                                className:
                                  "w-[96px] shrink-0 truncate font-mono text-catppuccin-subtext0",
                                children: zm(qe, 12),
                              }),
                              de.jsx("span", {
                                className: "w-[40px] shrink-0 font-mono text-catppuccin-green",
                                children: B.text,
                              }),
                              de.jsx("span", {
                                className: "shrink-0",
                                style: { color: ze.color },
                                children: ze.symbol,
                              }),
                              de.jsx("span", {
                                className: Kt(
                                  "truncate",
                                  he
                                    ? "font-bold text-catppuccin-text"
                                    : "text-catppuccin-subtext1",
                                ),
                                children: zm(Fe, 24),
                              }),
                            ],
                          },
                          Z.id,
                        );
                      }),
                      j > 0 &&
                        de.jsxs("div", {
                          className: "px-3 py-2 text-xs italic text-catppuccin-overlay0",
                          children: ["… 他", j, "件（上限200件表示中）"],
                        }),
                    ],
                  }),
          }),
          de.jsx("div", {
            className:
              "border-t border-catppuccin-surface0 px-3 py-2 text-[10px] text-catppuccin-overlay0",
            children: "j/k or ↑/↓: session   Tab: focus   Enter: preview   a: expand   r: reload",
          }),
        ],
      }),
      de.jsx("div", {
        className: Kt(
          "flex flex-1 flex-col overflow-auto border-l bg-catppuccin-base",
          y === "artifacts" ? "border-catppuccin-yellow" : "border-transparent",
        ),
        children: X
          ? de.jsxs("div", {
              className: "flex flex-col gap-4 p-4",
              children: [
                de.jsxs("div", {
                  children: [
                    de.jsxs("div", {
                      className: "flex flex-wrap items-center gap-2",
                      children: [
                        de.jsx("h1", {
                          className: "text-lg font-bold text-catppuccin-text",
                          children: L,
                        }),
                        de.jsxs("span", {
                          className: "font-mono text-xs text-catppuccin-subtext0",
                          children: ["(", X.id, ")"],
                        }),
                        q &&
                          de.jsxs("span", {
                            className: "inline-flex items-center gap-1 text-sm",
                            style: { color: q.color },
                            children: [
                              de.jsx("span", { children: q.symbol }),
                              de.jsx("span", { children: q.label }),
                            ],
                          }),
                        de.jsx(fp, {
                          variant: "secondary",
                          className: "font-mono",
                          children: W.text,
                        }),
                      ],
                    }),
                    de.jsxs("div", {
                      className: "mt-1 font-mono text-xs text-catppuccin-subtext0",
                      children: [
                        de.jsx("span", { className: "text-catppuccin-overlay1", children: "cwd:" }),
                        " ",
                        ce || "(none)",
                        " ",
                        de.jsx("span", {
                          className: "ml-2 text-catppuccin-overlay1",
                          children: "workflow:",
                        }),
                        " ",
                        X.workflowPath,
                      ],
                    }),
                    D === !1 &&
                      de.jsxs("div", {
                        className: "mt-1 text-xs text-catppuccin-yellow",
                        children: ["⚠ workflow file not found: ", X.workflowPath],
                      }),
                    n &&
                      de.jsx("div", { className: "mt-1 text-xs text-catppuccin-red", children: n }),
                    r.error &&
                      de.jsx("div", {
                        className: "mt-1 text-xs text-catppuccin-red",
                        children: r.error,
                      }),
                  ],
                }),
                de.jsxs("div", {
                  children: [
                    de.jsx("h2", {
                      className: "mb-2 text-sm font-bold tracking-wide text-catppuccin-lavender",
                      children: "Flow",
                    }),
                    A.length === 0
                      ? de.jsx("div", {
                          className: "text-xs text-catppuccin-subtext0",
                          children: "(no steps)",
                        })
                      : de.jsxs("div", {
                          className: "relative",
                          children: [
                            A.length > 1 && de.jsx(HT, { count: A.length - 1 }),
                            de.jsx("div", {
                              className: "flex flex-col",
                              style: { paddingLeft: A.length > 1 ? "24px" : 0 },
                              children: A.map((Z, fe) => {
                                const B = Ev(Z, X.currentStep),
                                  ze = B.isCurrent,
                                  he = B.isSkipped,
                                  qe = B.borderColor,
                                  Fe =
                                    Z.status === "passed"
                                      ? "#a6e3a1"
                                      : Z.status === "running"
                                        ? "#89b4fa"
                                        : Z.status === "failed"
                                          ? "#f38ba8"
                                          : (Z.status === "skipped", "#6c7086");
                                return de.jsxs(
                                  "div",
                                  {
                                    className: "flex flex-col items-stretch",
                                    children: [
                                      de.jsxs("div", {
                                        className: Kt(
                                          "rounded-md border bg-catppuccin-surface0 p-3",
                                          ze && "ring-1 ring-catppuccin-yellow",
                                          he && "opacity-60",
                                        ),
                                        style: {
                                          borderColor: qe,
                                          borderWidth: ze ? "2px" : "1px",
                                          borderStyle: he ? "dashed" : "solid",
                                        },
                                        children: [
                                          he &&
                                            de.jsx("div", {
                                              className:
                                                "mb-1 text-[10px] tracking-widest text-catppuccin-overlay0",
                                              children: "skipped (condition false)",
                                            }),
                                          de.jsxs("div", {
                                            className: "flex flex-wrap items-center gap-2 text-xs",
                                            children: [
                                              de.jsx("span", {
                                                className: Kt(
                                                  he ? "text-catppuccin-overlay0" : "font-bold",
                                                ),
                                                style: { color: he ? void 0 : Fe },
                                                children: Z.phase ?? "-",
                                              }),
                                              de.jsx("span", {
                                                className: Kt(
                                                  "font-mono font-bold",
                                                  he
                                                    ? "text-catppuccin-overlay0"
                                                    : "text-catppuccin-text",
                                                ),
                                                children: Z.stepKey,
                                              }),
                                              de.jsxs("span", {
                                                className: "text-catppuccin-overlay1",
                                                children: ["(", Z.type, ")"],
                                              }),
                                              ze &&
                                                de.jsx("span", {
                                                  className: "text-catppuccin-yellow",
                                                  children: "◀ current",
                                                }),
                                              !he &&
                                                de.jsx(fp, {
                                                  variant: VT(Z.status),
                                                  className: "ml-auto",
                                                  children: Z.status,
                                                }),
                                              he &&
                                                de.jsx("span", {
                                                  className: "ml-auto text-catppuccin-overlay0",
                                                  children: "skipped",
                                                }),
                                            ],
                                          }),
                                          de.jsxs("div", {
                                            className: "mt-1 flex items-center gap-2 text-[11px]",
                                            children: [
                                              de.jsx("span", {
                                                className: he ? "text-catppuccin-overlay0" : "",
                                                style: { color: he ? void 0 : Fe },
                                                children: Z.status,
                                              }),
                                              de.jsxs("span", {
                                                className: "text-catppuccin-overlay0",
                                                children: ["maxRetries: ", String(Z.maxRetries)],
                                              }),
                                              ze &&
                                                de.jsx("span", {
                                                  className: "font-bold text-catppuccin-yellow",
                                                  children: "● current",
                                                }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      fe < A.length - 1 &&
                                        de.jsxs("div", {
                                          className:
                                            "flex flex-col items-center py-1 text-catppuccin-overlay0",
                                          children: [
                                            de.jsx("div", {
                                              className: "text-[10px] leading-none",
                                              children: "│",
                                            }),
                                            de.jsx("div", {
                                              className: "text-[10px] leading-none",
                                              children: "▼",
                                            }),
                                          ],
                                        }),
                                    ],
                                  },
                                  Z.stepKey,
                                );
                              }),
                            }),
                          ],
                        }),
                  ],
                }),
                de.jsxs("div", {
                  children: [
                    de.jsxs("h2", {
                      className: "mb-2 text-sm font-bold tracking-wide text-catppuccin-lavender",
                      children: [
                        "History ",
                        de.jsx("span", {
                          className: "text-xs font-normal text-catppuccin-subtext0",
                          children: "(latest 20)",
                        }),
                      ],
                    }),
                    de.jsx(rf, {
                      className: "bg-catppuccin-mantle",
                      children: de.jsx("div", {
                        className: "p-2",
                        children:
                          Te.length === 0
                            ? de.jsx("div", {
                                className: "text-xs text-catppuccin-subtext0",
                                children: "(no history)",
                              })
                            : de.jsx("div", {
                                className: "flex flex-col gap-1 font-mono text-xs",
                                children: Te.map((Z, fe) => {
                                  const B = bv(Z),
                                    ze =
                                      Z.kind === "attempt"
                                        ? "text-catppuccin-text"
                                        : "text-catppuccin-yellow";
                                  return de.jsx(
                                    "div",
                                    { className: Kt("truncate", ze), children: B },
                                    fe,
                                  );
                                }),
                              }),
                      }),
                    }),
                  ],
                }),
                de.jsxs("div", {
                  children: [
                    de.jsxs("div", {
                      className: "mb-2 flex flex-wrap items-center gap-2",
                      children: [
                        de.jsxs("h2", {
                          className: "text-sm font-bold tracking-wide text-catppuccin-lavender",
                          children: [
                            "Artifacts ",
                            de.jsxs("span", {
                              className: "text-xs font-normal text-catppuccin-subtext0",
                              children: ["(", Me, ")"],
                            }),
                          ],
                        }),
                        Me > 0 &&
                          de.jsxs(de.Fragment, {
                            children: [
                              (() => {
                                let Z = 0,
                                  fe = 0;
                                for (const ze of b) {
                                  const he = H(ze);
                                  he === !0 ? Z++ : he === void 0 && fe++;
                                }
                                const B = Me - Z - fe;
                                return fe > 0
                                  ? de.jsxs("span", {
                                      className: "text-xs text-catppuccin-subtext0",
                                      children: ["— 存在 ", Z, " / 欠損 ", B, " / 判定中 ", fe],
                                    })
                                  : de.jsxs("span", {
                                      className: "text-xs text-catppuccin-subtext0",
                                      children: ["— 存在 ", Z, " / 欠損 ", B],
                                    });
                              })(),
                              Me > Kn &&
                                de.jsx("button", {
                                  onClick: () => v((Z) => !Z),
                                  className:
                                    "rounded bg-catppuccin-surface1 px-2 py-0.5 text-xs text-catppuccin-text hover:bg-catppuccin-surface2",
                                  children: g ? "a: collapse" : `… 他${Me - Kn}件 (aで展開)`,
                                }),
                              de.jsx("span", {
                                className: "text-xs text-catppuccin-overlay0",
                                children: "Enter: preview",
                              }),
                            ],
                          }),
                      ],
                    }),
                    Me === 0
                      ? de.jsx("div", {
                          className: "text-xs text-catppuccin-subtext0",
                          children: "(no artifacts)",
                        })
                      : de.jsxs("div", {
                          className: "flex flex-col gap-1",
                          children: [
                            b.slice(0, Ue).map((Z, fe) => {
                              const B = H(Z),
                                ze = J(Z, B),
                                he = fe === f;
                              return de.jsxs(
                                "button",
                                {
                                  onClick: () => {
                                    (u(fe), S("artifacts"));
                                  },
                                  onDoubleClick: () => {
                                    (u(fe), m(!0));
                                  },
                                  className: Kt(
                                    "flex w-full items-center gap-2 rounded px-2 py-1 text-left font-mono text-xs",
                                    he ? "bg-[#334433] font-bold" : "hover:bg-catppuccin-surface0",
                                    y === "artifacts" && he ? "ring-1 ring-catppuccin-yellow" : "",
                                  ),
                                  children: [
                                    de.jsx("span", {
                                      className: Kt(
                                        "shrink-0",
                                        he ? "text-catppuccin-yellow" : "text-transparent",
                                      ),
                                      children: "▸",
                                    }),
                                    de.jsx("span", {
                                      className: Kt(
                                        "truncate",
                                        B === !0
                                          ? "text-catppuccin-sky"
                                          : B === !1
                                            ? "text-catppuccin-red"
                                            : "text-catppuccin-overlay0",
                                      ),
                                      children: ze,
                                    }),
                                  ],
                                },
                                `${Z.artifactKey}-${fe}`,
                              );
                            }),
                            Pe &&
                              de.jsx("div", {
                                className: "px-2 py-1 font-mono text-xs text-catppuccin-overlay0",
                                children: (() => {
                                  const Z = Me - Kn;
                                  let fe = 0,
                                    B = 0;
                                  for (let ze = Kn; ze < Me; ze++) {
                                    const he = H(b[ze]);
                                    he === !1 ? fe++ : he === void 0 && B++;
                                  }
                                  return B > 0
                                    ? `… 他 ${Z}件 (欠損 ${fe} / 判定中 ${B}) (aで展開)`
                                    : fe === Z
                                      ? `… 他 ${Z}件は欠損 (aで展開)`
                                      : `… 他 ${Z}件 (欠損 ${fe}) (aで展開)`;
                                })(),
                              }),
                            Pe &&
                              f >= Kn &&
                              de.jsx("div", {
                                className: "px-2 py-1 font-mono text-xs text-catppuccin-yellow",
                                children: (() => {
                                  const Z = b[f];
                                  if (!Z) return null;
                                  const fe = H(Z),
                                    B = J(Z, fe);
                                  return `▸ 選択中 [${f}]: ${B} (aで展開して表示)`;
                                })(),
                              }),
                            h &&
                              b[f] &&
                              de.jsxs(rf, {
                                className: "mt-2 border-catppuccin-surface2 bg-catppuccin-mantle",
                                children: [
                                  de.jsxs("div", {
                                    className:
                                      "border-b border-catppuccin-surface1 px-3 py-1 text-xs font-semibold text-catppuccin-subtext0",
                                    children: [
                                      "Preview: ",
                                      b[f].artifactKey,
                                      " ",
                                      de.jsx("span", {
                                        className: "font-mono font-normal text-catppuccin-overlay0",
                                        children: b[f].filePath,
                                      }),
                                    ],
                                  }),
                                  de.jsx("div", {
                                    className: "max-h-[50vh] overflow-auto p-3 font-mono text-xs",
                                    children: x
                                      ? de.jsx("div", {
                                          className: "text-catppuccin-subtext0",
                                          children: "loading...",
                                        })
                                      : T != null && T.ok
                                        ? (() => {
                                            const Z = T.content ?? "";
                                            if (!Z)
                                              return de.jsx("div", {
                                                className: "text-catppuccin-subtext0",
                                                children: "(empty file)",
                                              });
                                            const fe = Z.split(`
`);
                                            return de.jsx("div", {
                                              className: "flex flex-col",
                                              children: fe.map((B, ze) =>
                                                de.jsx(
                                                  "div",
                                                  {
                                                    className:
                                                      "whitespace-pre-wrap break-all text-catppuccin-text",
                                                    children: B || " ",
                                                  },
                                                  ze,
                                                ),
                                              ),
                                            });
                                          })()
                                        : T
                                          ? de.jsx("div", {
                                              className: "text-catppuccin-yellow",
                                              children: Tu(T.reason ?? "unknown"),
                                            })
                                          : de.jsx("div", {
                                              className: "text-catppuccin-subtext0",
                                              children: "no preview",
                                            }),
                                  }),
                                  de.jsx("div", {
                                    className:
                                      "border-t border-catppuccin-surface1 px-3 py-1 text-[10px] text-catppuccin-overlay0",
                                    children: "Enter: collapse   j/k: artifact   Tab: focus",
                                  }),
                                ],
                              }),
                            !h &&
                              b[f] &&
                              de.jsx("div", {
                                className: "px-2 py-1 font-mono text-xs",
                                children: (() => {
                                  const Z = b[f],
                                    fe = H(Z);
                                  if (fe === !1)
                                    return de.jsx("span", {
                                      className: "text-catppuccin-red",
                                      children: Tu("file not found"),
                                    });
                                  if (fe === void 0)
                                    return de.jsx("span", {
                                      className: "text-catppuccin-overlay0",
                                      children: "判定中…",
                                    });
                                  const B = Av(Z.filePath);
                                  return B
                                    ? de.jsx("span", {
                                        className: "text-catppuccin-yellow",
                                        children: Tu(B),
                                      })
                                    : de.jsxs("span", {
                                        className: "text-catppuccin-overlay0",
                                        children: ["Press Enter to preview ", Z.filePath],
                                      });
                                })(),
                              }),
                          ],
                        }),
                  ],
                }),
              ],
            })
          : de.jsx("div", {
              className:
                "flex flex-1 items-center justify-center p-8 text-sm text-catppuccin-subtext0",
              children: r.dbMissing ? "セッションがありません。" : "(no sessions)",
            }),
      }),
    ],
  });
}
vv.createRoot(document.getElementById("root")).render(
  de.jsx(fv.StrictMode, { children: de.jsx(WT, {}) }),
);
