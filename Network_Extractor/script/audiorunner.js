var v = (e, n, t) => {
  if (!n.has(e)) throw TypeError("Cannot " + t);
};
var O = (e, n, t) => (
    v(e, n, "read from private field"), t ? t.call(e) : n.get(e)
  ),
  h = (e, n, t) => {
    if (n.has(e))
      throw TypeError("Cannot add the same private member more than once");
    n instanceof WeakSet ? n.add(e) : n.set(e, t);
  },
  f = (e, n, t, r) => (
    v(e, n, "write to private field"), r ? r.call(e, t) : n.set(e, t), t
  );
var l = (e, n, t) => (v(e, n, "access private method"), t);
var G = "Invariant failed";
function H(e, n) {
  if (!e) throw new Error(G);
}
let _;
const w = new Array(128).fill(void 0);
w.push(void 0, null, !0, !1);
function c(e) {
  return w[e];
}
let x = w.length;
function J(e) {
  e < 132 || ((w[e] = x), (x = e));
}
function R(e) {
  const n = c(e);
  return J(e), n;
}
let m = 0,
  k = null;
function W() {
  return (
    (k === null || k.byteLength === 0) && (k = new Uint8Array(_.memory.buffer)),
    k
  );
}
const L =
    typeof TextEncoder < "u"
      ? new TextEncoder("utf-8")
      : {
          encode: () => {
            throw Error("TextEncoder not available");
          },
        },
  V =
    typeof L.encodeInto == "function"
      ? function (e, n) {
          return L.encodeInto(e, n);
        }
      : function (e, n) {
          const t = L.encode(e);
          return n.set(t), { read: e.length, written: t.length };
        };
function S(e, n, t) {
  if (t === void 0) {
    const u = L.encode(e),
      d = n(u.length) >>> 0;
    return (
      W()
        .subarray(d, d + u.length)
        .set(u),
      (m = u.length),
      d
    );
  }
  let r = e.length,
    o = n(r) >>> 0;
  const a = W();
  let s = 0;
  for (; s < r; s++) {
    const u = e.charCodeAt(s);
    if (u > 127) break;
    a[o + s] = u;
  }
  if (s !== r) {
    s !== 0 && (e = e.slice(s)), (o = t(o, r, (r = s + e.length * 3)) >>> 0);
    const u = W().subarray(o + s, o + r),
      d = V(e, u);
    s += d.written;
  }
  return (m = s), o;
}
function Q(e) {
  return e == null;
}
let I = null;
function T() {
  return (
    (I === null || I.byteLength === 0) && (I = new Int32Array(_.memory.buffer)),
    I
  );
}
const B =
  typeof TextDecoder < "u"
    ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 })
    : {
        decode: () => {
          throw Error("TextDecoder not available");
        },
      };
typeof TextDecoder < "u" && B.decode();
function A(e, n) {
  return (e = e >>> 0), B.decode(W().subarray(e, e + n));
}
function i(e) {
  x === w.length && w.push(w.length + 1);
  const n = x;
  return (x = w[n]), (w[n] = e), n;
}
function N(e) {
  const n = typeof e;
  if (n == "number" || n == "boolean" || e == null) return `${e}`;
  if (n == "string") return `"${e}"`;
  if (n == "symbol") {
    const o = e.description;
    return o == null ? "Symbol" : `Symbol(${o})`;
  }
  if (n == "function") {
    const o = e.name;
    return typeof o == "string" && o.length > 0 ? `Function(${o})` : "Function";
  }
  if (Array.isArray(e)) {
    const o = e.length;
    let a = "[";
    o > 0 && (a += N(e[0]));
    for (let s = 1; s < o; s++) a += ", " + N(e[s]);
    return (a += "]"), a;
  }
  const t = /\[object ([^\]]+)\]/.exec(toString.call(e));
  let r;
  if (t.length > 1) r = t[1];
  else return toString.call(e);
  if (r == "Object")
    try {
      return "Object(" + JSON.stringify(e) + ")";
    } catch {
      return "Object";
    }
  return e instanceof Error
    ? `${e.name}: ${e.message}
${e.stack}`
    : r;
}
function X(e, n, t, r) {
  const o = { a: e, b: n, cnt: 1, dtor: t },
    a = (...s) => {
      o.cnt++;
      const u = o.a;
      o.a = 0;
      try {
        return r(u, o.b, ...s);
      } finally {
        --o.cnt === 0 ? _.__wbindgen_export_2.get(o.dtor)(u, o.b) : (o.a = u);
      }
    };
  return (a.original = o), a;
}
function Z(e, n, t) {
  _._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd561dea1936992d8(
    e,
    n,
    i(t)
  );
}
function nn(e, n) {
  const t = S(e, _.__wbindgen_malloc, _.__wbindgen_realloc),
    r = m,
    o = _.fetch_and_decode_audio(t, r, n);
  return R(o);
}
function en(e, n) {
  const t = S(e, _.__wbindgen_malloc, _.__wbindgen_realloc),
    r = m,
    o = S(n, _.__wbindgen_malloc, _.__wbindgen_realloc),
    a = m,
    s = _.fetch_and_parse_manifest(t, r, o, a);
  return R(s);
}
function b(e, n) {
  try {
    return e.apply(this, n);
  } catch (t) {
    _.__wbindgen_exn_store(i(t));
  }
}
function tn(e, n, t, r) {
  _.wasm_bindgen__convert__closures__invoke2_mut__h00aace56d4fb30ad(
    e,
    n,
    i(t),
    i(r)
  );
}
async function rn(e, n) {
  if (typeof Response == "function" && e instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(e, n);
      } catch (r) {
        if (e.headers.get("Content-Type") != "application/wasm")
          console.warn(
            "`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
            r
          );
        else throw r;
      }
    const t = await e.arrayBuffer();
    return await WebAssembly.instantiate(t, n);
  } else {
    const t = await WebAssembly.instantiate(e, n);
    return t instanceof WebAssembly.Instance ? { instance: t, module: e } : t;
  }
}
function on() {
  const e = {};
  return (
    (e.wbg = {}),
    (e.wbg.__wbindgen_object_drop_ref = function (n) {
      R(n);
    }),
    (e.wbg.__wbindgen_string_get = function (n, t) {
      const r = c(t),
        o = typeof r == "string" ? r : void 0;
      var a = Q(o) ? 0 : S(o, _.__wbindgen_malloc, _.__wbindgen_realloc),
        s = m;
      (T()[n / 4 + 1] = s), (T()[n / 4 + 0] = a);
    }),
    (e.wbg.__wbindgen_string_new = function (n, t) {
      const r = A(n, t);
      return i(r);
    }),
    (e.wbg.__wbindgen_number_new = function (n) {
      return i(n);
    }),
    (e.wbg.__wbindgen_object_clone_ref = function (n) {
      const t = c(n);
      return i(t);
    }),
    (e.wbg.__wbg_set_20cbc34131e76824 = function (n, t, r) {
      c(n)[R(t)] = R(r);
    }),
    (e.wbg.__wbg_String_91fba7ded13ba54c = function (n, t) {
      const r = String(c(t)),
        o = S(r, _.__wbindgen_malloc, _.__wbindgen_realloc),
        a = m;
      (T()[n / 4 + 1] = a), (T()[n / 4 + 0] = o);
    }),
    (e.wbg.__wbg_fetch_9757442297aa6820 = function (n, t) {
      const r = c(n).fetch(c(t));
      return i(r);
    }),
    (e.wbg.__wbg_instanceof_Response_b1d8fb5649a38770 = function (n) {
      let t;
      try {
        t = c(n) instanceof Response;
      } catch {
        t = !1;
      }
      return t;
    }),
    (e.wbg.__wbg_arrayBuffer_8b744cc30bbf8d4d = function () {
      return b(function (n) {
        const t = c(n).arrayBuffer();
        return i(t);
      }, arguments);
    }),
    (e.wbg.__wbg_text_01d2781c04763803 = function () {
      return b(function (n) {
        const t = c(n).text();
        return i(t);
      }, arguments);
    }),
    (e.wbg.__wbg_set_c146eed0996fb31d = function () {
      return b(function (n, t, r, o, a) {
        c(n).set(A(t, r), A(o, a));
      }, arguments);
    }),
    (e.wbg.__wbg_headers_142abdd2a9b86d0f = function (n) {
      const t = c(n).headers;
      return i(t);
    }),
    (e.wbg.__wbg_newwithstrandinit_8e1c089763754d1e = function () {
      return b(function (n, t, r) {
        const o = new Request(A(n, t), c(r));
        return i(o);
      }, arguments);
    }),
    (e.wbg.__wbindgen_cb_drop = function (n) {
      const t = R(n).original;
      return t.cnt-- == 1 ? ((t.a = 0), !0) : !1;
    }),
    (e.wbg.__wbg_new_18bc2084e9a3e1ff = function () {
      const n = new Array();
      return i(n);
    }),
    (e.wbg.__wbg_newnoargs_e643855c6572a4a8 = function (n, t) {
      const r = new Function(A(n, t));
      return i(r);
    }),
    (e.wbg.__wbg_call_f96b398515635514 = function () {
      return b(function (n, t) {
        const r = c(n).call(c(t));
        return i(r);
      }, arguments);
    }),
    (e.wbg.__wbg_new_7befa02319b36069 = function () {
      const n = new Object();
      return i(n);
    }),
    (e.wbg.__wbg_self_b9aad7f1c618bfaf = function () {
      return b(function () {
        const n = self.self;
        return i(n);
      }, arguments);
    }),
    (e.wbg.__wbg_window_55e469842c98b086 = function () {
      return b(function () {
        const n = window.window;
        return i(n);
      }, arguments);
    }),
    (e.wbg.__wbg_globalThis_d0957e302752547e = function () {
      return b(function () {
        const n = globalThis.globalThis;
        return i(n);
      }, arguments);
    }),
    (e.wbg.__wbg_global_ae2f87312b8987fb = function () {
      return b(function () {
        const n = global.global;
        return i(n);
      }, arguments);
    }),
    (e.wbg.__wbindgen_is_undefined = function (n) {
      return c(n) === void 0;
    }),
    (e.wbg.__wbg_set_aee8682c7ee9ac44 = function (n, t, r) {
      c(n)[t >>> 0] = R(r);
    }),
    (e.wbg.__wbg_call_35782e9a1aa5e091 = function () {
      return b(function (n, t, r) {
        const o = c(n).call(c(t), c(r));
        return i(o);
      }, arguments);
    }),
    (e.wbg.__wbg_new_113855d7ab252420 = function (n, t) {
      try {
        var r = { a: n, b: t },
          o = (s, u) => {
            const d = r.a;
            r.a = 0;
            try {
              return tn(d, r.b, s, u);
            } finally {
              r.a = d;
            }
          };
        const a = new Promise(o);
        return i(a);
      } finally {
        r.a = r.b = 0;
      }
    }),
    (e.wbg.__wbg_resolve_f3a7b38cd2af0fa4 = function (n) {
      const t = Promise.resolve(c(n));
      return i(t);
    }),
    (e.wbg.__wbg_then_65c9631eb0022205 = function (n, t) {
      const r = c(n).then(c(t));
      return i(r);
    }),
    (e.wbg.__wbg_then_cde1713a812adbda = function (n, t, r) {
      const o = c(n).then(c(t), c(r));
      return i(o);
    }),
    (e.wbg.__wbg_buffer_fcbfb6d88b2732e9 = function (n) {
      const t = c(n).buffer;
      return i(t);
    }),
    (e.wbg.__wbg_new_bc5d9aad3f9ac80e = function (n) {
      const t = new Uint8Array(c(n));
      return i(t);
    }),
    (e.wbg.__wbg_set_4b3aa8445ac1e91c = function (n, t, r) {
      c(n).set(c(t), r >>> 0);
    }),
    (e.wbg.__wbg_length_d9c4ded7e708c6a1 = function (n) {
      return c(n).length;
    }),
    (e.wbg.__wbg_set_bc33b7c3be9319b5 = function () {
      return b(function (n, t, r) {
        return Reflect.set(c(n), c(t), c(r));
      }, arguments);
    }),
    (e.wbg.__wbindgen_debug_string = function (n, t) {
      const r = N(c(t)),
        o = S(r, _.__wbindgen_malloc, _.__wbindgen_realloc),
        a = m;
      (T()[n / 4 + 1] = a), (T()[n / 4 + 0] = o);
    }),
    (e.wbg.__wbindgen_throw = function (n, t) {
      throw new Error(A(n, t));
    }),
    (e.wbg.__wbindgen_memory = function () {
      const n = _.memory;
      return i(n);
    }),
    (e.wbg.__wbindgen_closure_wrapper1436 = function (n, t, r) {
      const o = X(n, t, 331, Z);
      return i(o);
    }),
    e
  );
}
function cn(e, n) {
  return (
    (_ = e.exports), (Y.__wbindgen_wasm_module = n), (I = null), (k = null), _
  );
}
async function Y(e) {
  if (_ !== void 0) return _;
  typeof e > "u" &&
    (e = new URL("/assets/audio_decoder_bg-157fa51a.wasm", self.location));
  const n = on();
  (typeof e == "string" ||
    (typeof Request == "function" && e instanceof Request) ||
    (typeof URL == "function" && e instanceof URL)) &&
    (e = fetch(e));
  const { instance: t, module: r } = await rn(await e, n);
  return cn(t, r);
}
const sn = () => {};
function _n(e, n, t, r = !1) {
  if (!r) return sn;
  const o = n.slice(n.lastIndexOf("-") + 1);
  let a = 0;
  const s = (u, ...d) => {
    const F = Date.now();
    (typeof u == "number" && F - a < u) ||
      ((a = F),
      console.log(`%c[video-loader:${e}] ${o} - ${u} `, `color: ${t}`, ...d));
  };
  return (s.enabled = !0), s;
}
const p = _n("audio-decoder", "DecodeWorker", "#16a34a");
var g, y, j, q, D, z, $, K, E, M, U, P;
class an {
  constructor() {
    h(this, j);
    h(this, D);
    h(this, $);
    h(this, E);
    h(this, U);
    h(this, g, void 0);
    h(this, y, void 0);
    f(this, g, "INIT"),
      p("Starting worker wasm..."),
      f(
        this,
        y,
        Y()
          .then(() => {
            p("Worker wasm ready"), f(this, y, void 0), f(this, g, "READY");
          })
          .catch((n) => {
            p("Error initializing wasm", n),
              f(this, y, void 0),
              f(this, g, "ERROR");
          })
      );
  }
  async onMessage({ data: n }) {
    switch (
      (p("Request received", n), O(this, y) && (await O(this, y)), n.type)
    ) {
      case "TASK":
        l(this, $, K).call(this, n.data);
        break;
      case "TERMINATE":
        l(this, U, P).call(this);
        break;
    }
  }
}
(g = new WeakMap()),
  (y = new WeakMap()),
  (j = new WeakSet()),
  (q = async function ({ key: n, url: t }) {
    const r = await en(n, t);
    l(this, E, M).call(this, {
      event: "RESULT",
      taskIntent: "parse-manifest",
      data: r,
      error: null,
    });
  }),
  (D = new WeakSet()),
  (z = async function ({ url: n, sampleRate: t }) {
    const r = await nn(n, t);
    l(this, E, M).call(this, {
      event: "RESULT",
      taskIntent: "decode-segment",
      data: r,
      error: null,
    });
  }),
  ($ = new WeakSet()),
  (K = async function (n) {
    p("Start task", n);
    try {
      H(O(this, g) === "READY"),
        f(this, g, "WORKING"),
        await (n.type === "parse-manifest"
          ? l(this, j, q).call(this, n.data)
          : l(this, D, z).call(this, n.data)),
        p("Task finished", n),
        f(this, g, "READY");
    } catch (t) {
      l(this, E, M).call(this, {
        event: "RESULT",
        taskIntent: "decode-segment",
        data: null,
        error: t,
      }),
        f(this, g, "ERROR");
    }
  }),
  (E = new WeakSet()),
  (M = function (n) {
    p("Send response", n), self.postMessage(n);
  }),
  (U = new WeakSet()),
  (P = async function () {
    self.close(),
      f(this, g, "CLOSED"),
      l(this, E, M).call(this, { event: "TERMINATED" });
  });
const C = new an();
self.onmessage = C.onMessage.bind(C);
