function Xt(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const P = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Zt = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], mt = () => {
}, kt = /^on[^a-z]/, en = (e) => kt.test(e), I = Object.assign, tn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, nn = Object.prototype.hasOwnProperty, w = (e, t) => nn.call(e, t), m = Array.isArray, Z = (e) => Se(e) === "[object Map]", rn = (e) => Se(e) === "[object Set]", b = (e) => typeof e == "function", T = (e) => typeof e == "string", He = (e) => typeof e == "symbol", V = (e) => e !== null && typeof e == "object", sn = (e) => V(e) && b(e.then) && b(e.catch), on = Object.prototype.toString, Se = (e) => on.call(e), Et = (e) => Se(e).slice(8, -1), cn = (e) => Se(e) === "[object Object]", Ue = (e) => T(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ln = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, un = ln(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), ie = (e, t) => !Object.is(e, t), an = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let et;
const Te = () => et || (et = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function We(e) {
  if (m(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = T(s) ? hn(s) : We(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else {
    if (T(e))
      return e;
    if (V(e))
      return e;
  }
}
const fn = /;(?![^(]*\))/g, pn = /:([^]+)/, dn = /\/\*[^]*?\*\//g;
function hn(e) {
  const t = {};
  return e.replace(dn, "").split(fn).forEach((n) => {
    if (n) {
      const s = n.split(pn);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Be(e) {
  let t = "";
  if (T(e))
    t = e;
  else if (m(e))
    for (let n = 0; n < e.length; n++) {
      const s = Be(e[n]);
      s && (t += s + " ");
    }
  else if (V(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function tt(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let wt;
function _n(e, t = wt) {
  t && t.active && t.effects.push(e);
}
function gn() {
  return wt;
}
const ce = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Nt = (e) => (e.w & H) > 0, bt = (e) => (e.n & H) > 0, mn = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= H;
}, En = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      Nt(r) && !bt(r) ? r.delete(e) : t[n++] = r, r.w &= ~H, r.n &= ~H;
    }
    t.length = n;
  }
}, $e = /* @__PURE__ */ new WeakMap();
let te = 0, H = 1;
const Pe = 30;
let y;
const B = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Me = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class wn {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, _n(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = y, n = z;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = y, y = this, z = !0, H = 1 << ++te, te <= Pe ? mn(this) : nt(this), this.fn();
    } finally {
      te <= Pe && En(this), H = 1 << --te, y = this.parent, z = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    y === this ? this.deferStop = !0 : this.active && (nt(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function nt(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let z = !0;
const Ot = [];
function vt() {
  Ot.push(z), z = !1;
}
function St() {
  const e = Ot.pop();
  z = e === void 0 ? !0 : e;
}
function R(e, t, n) {
  if (z && y) {
    let s = $e.get(e);
    s || $e.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = ce());
    const o = process.env.NODE_ENV !== "production" ? { effect: y, target: e, type: t, key: n } : void 0;
    Fe(r, o);
  }
}
function Fe(e, t) {
  let n = !1;
  te <= Pe ? bt(e) || (e.n |= H, n = !Nt(e)) : n = !e.has(y), n && (e.add(y), y.deps.push(e), process.env.NODE_ENV !== "production" && y.onTrack && y.onTrack(
    I(
      {
        effect: y
      },
      t
    )
  ));
}
function U(e, t, n, s, r, o) {
  const i = $e.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && m(e)) {
    const a = Number(s);
    i.forEach((_, l) => {
      (l === "length" || l >= a) && c.push(_);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        m(e) ? Ue(n) && c.push(i.get("length")) : (c.push(i.get(B)), Z(e) && c.push(i.get(Me)));
        break;
      case "delete":
        m(e) || (c.push(i.get(B)), Z(e) && c.push(i.get(Me)));
        break;
      case "set":
        Z(e) && c.push(i.get(B));
        break;
    }
  const u = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: s, oldValue: r, oldTarget: o } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? Q(c[0], u) : Q(c[0]));
  else {
    const a = [];
    for (const _ of c)
      _ && a.push(..._);
    process.env.NODE_ENV !== "production" ? Q(ce(a), u) : Q(ce(a));
  }
}
function Q(e, t) {
  const n = m(e) ? e : [...e];
  for (const s of n)
    s.computed && rt(s, t);
  for (const s of n)
    s.computed || rt(s, t);
}
function rt(e, t) {
  (e !== y || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(I({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const Nn = /* @__PURE__ */ Xt("__proto__,__v_isRef,__isVue"), yt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(He)
), bn = /* @__PURE__ */ qe(), On = /* @__PURE__ */ qe(!0), vn = /* @__PURE__ */ qe(!0, !0), st = /* @__PURE__ */ Sn();
function Sn() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = d(this);
      for (let o = 0, i = this.length; o < i; o++)
        R(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(d)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      vt();
      const s = d(this)[t].apply(this, n);
      return St(), s;
    };
  }), e;
}
function yn(e) {
  const t = d(this);
  return R(t, "has", e), t.hasOwnProperty(e);
}
function qe(e = !1, t = !1) {
  return function(s, r, o) {
    if (r === "__v_isReactive")
      return !e;
    if (r === "__v_isReadonly")
      return e;
    if (r === "__v_isShallow")
      return t;
    if (r === "__v_raw" && o === (e ? t ? Dt : It : t ? Hn : Rt).get(s))
      return s;
    const i = m(s);
    if (!e) {
      if (i && w(st, r))
        return Reflect.get(st, r, o);
      if (r === "hasOwnProperty")
        return yn;
    }
    const c = Reflect.get(s, r, o);
    return (He(r) ? yt.has(r) : Nn(r)) || (e || R(s, "get", r), t) ? c : x(c) ? i && Ue(r) ? c : c.value : V(c) ? e ? Tt(c) : Ct(c) : c;
  };
}
const xn = /* @__PURE__ */ Vn();
function Vn(e = !1) {
  return function(n, s, r, o) {
    let i = n[s];
    if (W(i) && x(i) && !x(r))
      return !1;
    if (!e && (!we(r) && !W(r) && (i = d(i), r = d(r)), !m(n) && x(i) && !x(r)))
      return i.value = r, !0;
    const c = m(n) && Ue(s) ? Number(s) < n.length : w(n, s), u = Reflect.set(n, s, r, o);
    return n === d(o) && (c ? ie(r, i) && U(n, "set", s, r, i) : U(n, "add", s, r)), u;
  };
}
function Rn(e, t) {
  const n = w(e, t), s = e[t], r = Reflect.deleteProperty(e, t);
  return r && n && U(e, "delete", t, void 0, s), r;
}
function In(e, t) {
  const n = Reflect.has(e, t);
  return (!He(t) || !yt.has(t)) && R(e, "has", t), n;
}
function Dn(e) {
  return R(e, "iterate", m(e) ? "length" : B), Reflect.ownKeys(e);
}
const Cn = {
  get: bn,
  set: xn,
  deleteProperty: Rn,
  has: In,
  ownKeys: Dn
}, xt = {
  get: On,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && tt(
      `Set operation on key "${String(t)}" failed: target is readonly.`,
      e
    ), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && tt(
      `Delete operation on key "${String(t)}" failed: target is readonly.`,
      e
    ), !0;
  }
}, Tn = /* @__PURE__ */ I(
  {},
  xt,
  {
    get: vn
  }
), Je = (e) => e, ye = (e) => Reflect.getPrototypeOf(e);
function ae(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = d(e), o = d(t);
  n || (t !== o && R(r, "get", t), R(r, "get", o));
  const { has: i } = ye(r), c = s ? Je : n ? Ye : le;
  if (i.call(r, t))
    return c(e.get(t));
  if (i.call(r, o))
    return c(e.get(o));
  e !== r && e.get(t);
}
function fe(e, t = !1) {
  const n = this.__v_raw, s = d(n), r = d(e);
  return t || (e !== r && R(s, "has", e), R(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function pe(e, t = !1) {
  return e = e.__v_raw, !t && R(d(e), "iterate", B), Reflect.get(e, "size", e);
}
function ot(e) {
  e = d(e);
  const t = d(this);
  return ye(t).has.call(t, e) || (t.add(e), U(t, "add", e, e)), this;
}
function it(e, t) {
  t = d(t);
  const n = d(this), { has: s, get: r } = ye(n);
  let o = s.call(n, e);
  o ? process.env.NODE_ENV !== "production" && Vt(n, s, e) : (e = d(e), o = s.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), o ? ie(t, i) && U(n, "set", e, t, i) : U(n, "add", e, t), this;
}
function ct(e) {
  const t = d(this), { has: n, get: s } = ye(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== "production" && Vt(t, n, e) : (e = d(e), r = n.call(t, e));
  const o = s ? s.call(t, e) : void 0, i = t.delete(e);
  return r && U(t, "delete", e, void 0, o), i;
}
function lt() {
  const e = d(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? Z(e) ? new Map(e) : new Set(e) : void 0, s = e.clear();
  return t && U(e, "clear", void 0, void 0, n), s;
}
function de(e, t) {
  return function(s, r) {
    const o = this, i = o.__v_raw, c = d(i), u = t ? Je : e ? Ye : le;
    return !e && R(c, "iterate", B), i.forEach((a, _) => s.call(r, u(a), u(_), o));
  };
}
function he(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = d(r), i = Z(o), c = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, a = r[e](...s), _ = n ? Je : t ? Ye : le;
    return !t && R(
      o,
      "iterate",
      u ? Me : B
    ), {
      // iterator protocol
      next() {
        const { value: l, done: f } = a.next();
        return f ? { value: l, done: f } : {
          value: c ? [_(l[0]), _(l[1])] : _(l),
          done: f
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function F(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(
        `${un(e)} operation ${n}failed: target is readonly.`,
        d(this)
      );
    }
    return e === "delete" ? !1 : this;
  };
}
function $n() {
  const e = {
    get(o) {
      return ae(this, o);
    },
    get size() {
      return pe(this);
    },
    has: fe,
    add: ot,
    set: it,
    delete: ct,
    clear: lt,
    forEach: de(!1, !1)
  }, t = {
    get(o) {
      return ae(this, o, !1, !0);
    },
    get size() {
      return pe(this);
    },
    has: fe,
    add: ot,
    set: it,
    delete: ct,
    clear: lt,
    forEach: de(!1, !0)
  }, n = {
    get(o) {
      return ae(this, o, !0);
    },
    get size() {
      return pe(this, !0);
    },
    has(o) {
      return fe.call(this, o, !0);
    },
    add: F("add"),
    set: F("set"),
    delete: F("delete"),
    clear: F("clear"),
    forEach: de(!0, !1)
  }, s = {
    get(o) {
      return ae(this, o, !0, !0);
    },
    get size() {
      return pe(this, !0);
    },
    has(o) {
      return fe.call(this, o, !0);
    },
    add: F("add"),
    set: F("set"),
    delete: F("delete"),
    clear: F("clear"),
    forEach: de(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = he(
      o,
      !1,
      !1
    ), n[o] = he(
      o,
      !0,
      !1
    ), t[o] = he(
      o,
      !1,
      !0
    ), s[o] = he(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    s
  ];
}
const [
  Pn,
  Mn,
  Fn,
  An
] = /* @__PURE__ */ $n();
function Ge(e, t) {
  const n = t ? e ? An : Fn : e ? Mn : Pn;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    w(n, r) && r in s ? n : s,
    r,
    o
  );
}
const jn = {
  get: /* @__PURE__ */ Ge(!1, !1)
}, Kn = {
  get: /* @__PURE__ */ Ge(!0, !1)
}, zn = {
  get: /* @__PURE__ */ Ge(!0, !0)
};
function Vt(e, t, n) {
  const s = d(n);
  if (s !== n && t.call(e, s)) {
    const r = Et(e);
    console.warn(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Rt = /* @__PURE__ */ new WeakMap(), Hn = /* @__PURE__ */ new WeakMap(), It = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ new WeakMap();
function Un(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Wn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Un(Et(e));
}
function Ct(e) {
  return W(e) ? e : Le(
    e,
    !1,
    Cn,
    jn,
    Rt
  );
}
function Tt(e) {
  return Le(
    e,
    !0,
    xt,
    Kn,
    It
  );
}
function _e(e) {
  return Le(
    e,
    !0,
    Tn,
    zn,
    Dt
  );
}
function Le(e, t, n, s, r) {
  if (!V(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = Wn(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, c), c;
}
function q(e) {
  return W(e) ? q(e.__v_raw) : !!(e && e.__v_isReactive);
}
function W(e) {
  return !!(e && e.__v_isReadonly);
}
function we(e) {
  return !!(e && e.__v_isShallow);
}
function Ae(e) {
  return q(e) || W(e);
}
function d(e) {
  const t = e && e.__v_raw;
  return t ? d(t) : e;
}
function Bn(e) {
  return an(e, "__v_skip", !0), e;
}
const le = (e) => V(e) ? Ct(e) : e, Ye = (e) => V(e) ? Tt(e) : e;
function qn(e) {
  z && y && (e = d(e), process.env.NODE_ENV !== "production" ? Fe(e.dep || (e.dep = ce()), {
    target: e,
    type: "get",
    key: "value"
  }) : Fe(e.dep || (e.dep = ce())));
}
function Jn(e, t) {
  e = d(e);
  const n = e.dep;
  n && (process.env.NODE_ENV !== "production" ? Q(n, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : Q(n));
}
function x(e) {
  return !!(e && e.__v_isRef === !0);
}
function Ve(e) {
  return Gn(e, !1);
}
function Gn(e, t) {
  return x(e) ? e : new Ln(e, t);
}
class Ln {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : d(t), this._value = n ? t : le(t);
  }
  get value() {
    return qn(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || we(t) || W(t);
    t = n ? t : d(t), ie(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : le(t), Jn(this, t));
  }
}
function Yn(e) {
  return x(e) ? e.value : e;
}
const Qn = {
  get: (e, t, n) => Yn(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return x(r) && !x(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Xn(e) {
  return q(e) ? e : new Proxy(e, Qn);
}
const J = [];
function Zn(e) {
  J.push(e);
}
function kn() {
  J.pop();
}
function O(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  vt();
  const n = J.length ? J[J.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = er();
  if (s)
    G(
      s,
      n,
      11,
      [
        e + t.join(""),
        n && n.proxy,
        r.map(
          ({ vnode: o }) => `at <${Gt(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...tr(r)), console.warn(...o);
  }
  St();
}
function er() {
  let e = J[J.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function tr(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...nr(n));
  }), t;
}
function nr({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${Gt(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...rr(e.props), o] : [r + o];
}
function rr(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...$t(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function $t(e, t, n) {
  return T(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : x(t) ? (t = $t(e, d(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : b(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = d(t), n ? t : [`${e}=`, t]);
}
const Pt = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function G(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    Qe(o, t, n);
  }
  return r;
}
function je(e, t, n, s) {
  if (b(e)) {
    const o = G(e, t, n, s);
    return o && sn(o) && o.catch((i) => {
      Qe(i, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(je(e[o], t, n, s));
  return r;
}
function Qe(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? Pt[n] : n;
    for (; o; ) {
      const a = o.ec;
      if (a) {
        for (let _ = 0; _ < a.length; _++)
          if (a[_](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      G(
        u,
        null,
        10,
        [e, i, c]
      );
      return;
    }
  }
  sr(e, n, r, s);
}
function sr(e, t, n, s = !0) {
  if (process.env.NODE_ENV !== "production") {
    const r = Pt[t];
    if (n && Zn(n), O(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && kn(), s)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let Ne = !1, Ke = !1;
const D = [];
let j = 0;
const k = [];
let $ = null, A = 0;
const Mt = /* @__PURE__ */ Promise.resolve();
let Xe = null;
const or = 100;
function ir(e) {
  const t = Xe || Mt;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function cr(e) {
  let t = j + 1, n = D.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    ue(D[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function xe(e) {
  (!D.length || !D.includes(
    e,
    Ne && e.allowRecurse ? j + 1 : j
  )) && (e.id == null ? D.push(e) : D.splice(cr(e.id), 0, e), Ft());
}
function Ft() {
  !Ne && !Ke && (Ke = !0, Xe = Mt.then(jt));
}
function At(e) {
  m(e) ? k.push(...e) : (!$ || !$.includes(
    e,
    e.allowRecurse ? A + 1 : A
  )) && k.push(e), Ft();
}
function lr(e) {
  if (k.length) {
    const t = [...new Set(k)];
    if (k.length = 0, $) {
      $.push(...t);
      return;
    }
    for ($ = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), $.sort((n, s) => ue(n) - ue(s)), A = 0; A < $.length; A++)
      process.env.NODE_ENV !== "production" && Kt(e, $[A]) || $[A]();
    $ = null, A = 0;
  }
}
const ue = (e) => e.id == null ? 1 / 0 : e.id, ur = (e, t) => {
  const n = ue(e) - ue(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function jt(e) {
  Ke = !1, Ne = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), D.sort(ur);
  const t = process.env.NODE_ENV !== "production" ? (n) => Kt(e, n) : mt;
  try {
    for (j = 0; j < D.length; j++) {
      const n = D[j];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        G(n, null, 14);
      }
    }
  } finally {
    j = 0, D.length = 0, lr(e), Ne = !1, Xe = null, (D.length || k.length) && jt(e);
  }
}
function Kt(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > or) {
      const s = t.ownerInstance, r = s && Jt(s.type);
      return O(
        `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
const ee = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Te().__VUE_HMR_RUNTIME__ = {
  createRecord: Re(ar),
  rerender: Re(fr),
  reload: Re(pr)
});
const be = /* @__PURE__ */ new Map();
function ar(e, t) {
  return be.has(e) ? !1 : (be.set(e, {
    initialDef: re(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function re(e) {
  return Lt(e) ? e.__vccOpts : e;
}
function fr(e, t) {
  const n = be.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, re(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function pr(e, t) {
  const n = be.get(e);
  if (!n)
    return;
  t = re(t), ut(n.initialDef, t);
  const s = [...n.instances];
  for (const r of s) {
    const o = re(r.type);
    ee.has(o) || (o !== n.initialDef && ut(o, t), ee.add(o)), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (ee.add(o), r.ceReload(t.styles), ee.delete(o)) : r.parent ? xe(r.parent.update) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  At(() => {
    for (const r of s)
      ee.delete(
        re(r.type)
      );
  });
}
function ut(e, t) {
  I(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Re(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let K = null, dr = null;
const hr = (e) => e.__isSuspense;
function _r(e, t) {
  t && t.pendingBranch ? m(e) ? t.effects.push(...e) : t.effects.push(e) : At(e);
}
const ge = {};
function gr(e, t, { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = P) {
  var c;
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && O(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && O(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const u = (E) => {
    O(
      "Invalid watch source: ",
      E,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, a = gn() === ((c = L) == null ? void 0 : c.scope) ? L : null;
  let _, l = !1, f = !1;
  if (x(e) ? (_ = () => e.value, l = we(e)) : q(e) ? (_ = () => e, s = !0) : m(e) ? (f = !0, l = e.some((E) => q(E) || we(E)), _ = () => e.map((E) => {
    if (x(E))
      return E.value;
    if (q(E))
      return X(E);
    if (b(E))
      return G(E, a, 2);
    process.env.NODE_ENV !== "production" && u(E);
  })) : b(e) ? t ? _ = () => G(e, a, 2) : _ = () => {
    if (!(a && a.isUnmounted))
      return h && h(), je(
        e,
        a,
        3,
        [p]
      );
  } : (_ = mt, process.env.NODE_ENV !== "production" && u(e)), t && s) {
    const E = _;
    _ = () => X(E());
  }
  let h, p = (E) => {
    h = g.onStop = () => {
      G(E, a, 4);
    };
  }, N = f ? new Array(e.length).fill(ge) : ge;
  const v = () => {
    if (g.active)
      if (t) {
        const E = g.run();
        (s || l || (f ? E.some(
          (Yt, Qt) => ie(Yt, N[Qt])
        ) : ie(E, N))) && (h && h(), je(t, a, 3, [
          E,
          // pass undefined as the old value when it's changed for the first time
          N === ge ? void 0 : f && N[0] === ge ? [] : N,
          p
        ]), N = E);
      } else
        g.run();
  };
  v.allowRecurse = !!t;
  let M;
  r === "sync" ? M = v : r === "post" ? M = () => ht(v, a && a.suspense) : (v.pre = !0, a && (v.id = a.uid), M = () => xe(v));
  const g = new wn(_, M);
  return process.env.NODE_ENV !== "production" && (g.onTrack = o, g.onTrigger = i), t ? n ? v() : N = g.run() : r === "post" ? ht(
    g.run.bind(g),
    a && a.suspense
  ) : g.run(), () => {
    g.stop(), a && a.scope && tn(a.scope.effects, g);
  };
}
function mr(e, t, n) {
  const s = this.proxy, r = T(e) ? e.includes(".") ? Er(s, e) : () => s[e] : e.bind(s, s);
  let o;
  b(t) ? o = t : (o = t.handler, n = t);
  const i = L;
  gt(this);
  const c = gr(r, o.bind(s), n);
  return i ? gt(i) : Hr(), c;
}
function Er(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function X(e, t) {
  if (!V(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), x(e))
    X(e.value, t);
  else if (m(e))
    for (let n = 0; n < e.length; n++)
      X(e[n], t);
  else if (rn(e) || Z(e))
    e.forEach((n) => {
      X(n, t);
    });
  else if (cn(e))
    for (const n in e)
      X(e[n], t);
  return e;
}
function wr(e, t) {
  return b(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => I({ name: e.name }, t, { setup: e }))()
  ) : e;
}
function Nr(e) {
  b(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: s,
    delay: r = 200,
    timeout: o,
    // undefined = never times out
    suspensible: i = !0,
    onError: c
  } = e;
  let u = null, a, _ = 0;
  const l = () => (_++, u = null, f()), f = () => {
    let h;
    return u || (h = u = t().catch((p) => {
      if (p = p instanceof Error ? p : new Error(String(p)), c)
        return new Promise((N, v) => {
          c(p, () => N(l()), () => v(p), _ + 1);
        });
      throw p;
    }).then((p) => {
      if (h !== u && u)
        return u;
      if (process.env.NODE_ENV !== "production" && !p && O(
        "Async component loader resolved to undefined. If you are using retry(), make sure to return its return value."
      ), p && (p.__esModule || p[Symbol.toStringTag] === "Module") && (p = p.default), process.env.NODE_ENV !== "production" && p && !V(p) && !b(p))
        throw new Error(`Invalid async component load result: ${p}`);
      return a = p, p;
    }));
  };
  return wr({
    name: "AsyncComponentWrapper",
    __asyncLoader: f,
    get __asyncResolved() {
      return a;
    },
    setup() {
      const h = L;
      if (a)
        return () => Ie(a, h);
      const p = (g) => {
        u = null, Qe(
          g,
          h,
          13,
          !s
          /* do not throw in dev if user provided error component */
        );
      };
      if (i && h.suspense || Wr)
        return f().then((g) => () => Ie(g, h)).catch((g) => (p(g), () => s ? oe(s, {
          error: g
        }) : null));
      const N = Ve(!1), v = Ve(), M = Ve(!!r);
      return r && setTimeout(() => {
        M.value = !1;
      }, r), o != null && setTimeout(() => {
        if (!N.value && !v.value) {
          const g = new Error(
            `Async component timed out after ${o}ms.`
          );
          p(g), v.value = g;
        }
      }, o), f().then(() => {
        N.value = !0, h.parent && br(h.parent.vnode) && xe(h.parent.update);
      }).catch((g) => {
        p(g), v.value = g;
      }), () => {
        if (N.value && a)
          return Ie(a, h);
        if (v.value && s)
          return oe(s, {
            error: v.value
          });
        if (n && !M.value)
          return oe(n);
      };
    }
  });
}
function Ie(e, t) {
  const { ref: n, props: s, children: r, ce: o } = t.vnode, i = oe(e, s, r);
  return i.ref = n, i.ce = o, delete t.vnode.ce, i;
}
const br = (e) => e.type.__isKeepAlive, Or = Symbol.for("v-ndc"), ze = (e) => e ? Ur(e) ? Br(e) || e.proxy : ze(e.parent) : null, se = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ I(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? _e(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? _e(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? _e(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? _e(e.refs) : e.refs,
    $parent: (e) => ze(e.parent),
    $root: (e) => ze(e.root),
    $emit: (e) => e.emit,
    $options: (e) => yr(e),
    $forceUpdate: (e) => e.f || (e.f = () => xe(e.update)),
    $nextTick: (e) => e.n || (e.n = ir.bind(e.proxy)),
    $watch: (e) => mr.bind(e)
  })
), vr = (e) => e === "_" || e === "$", De = (e, t) => e !== P && !e.__isScriptSetup && w(e, t), Sr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let a;
    if (t[0] !== "$") {
      const h = i[t];
      if (h !== void 0)
        switch (h) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (De(s, t))
          return i[t] = 1, s[t];
        if (r !== P && w(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = e.propsOptions[0]) && w(a, t)
        )
          return i[t] = 3, o[t];
        if (n !== P && w(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const _ = se[t];
    let l, f;
    if (_)
      return t === "$attrs" ? (R(e, "get", t), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && R(e, "get", t), _(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== P && w(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      f = u.config.globalProperties, w(f, t)
    )
      return f[t];
    process.env.NODE_ENV !== "production" && K && (!T(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== P && vr(t[0]) && w(r, t) ? O(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === K && O(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return De(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && w(r, t) ? (O(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== P && w(s, t) ? (s[t] = n, !0) : w(e.props, t) ? (process.env.NODE_ENV !== "production" && O(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && O(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== P && w(e, i) || De(t, i) || (c = o[0]) && w(c, i) || w(s, i) || w(se, i) || w(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : w(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Sr.ownKeys = (e) => (O(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function at(e) {
  return m(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function yr(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let u;
  return c ? u = c : !r.length && !n && !s ? u = t : (u = {}, r.length && r.forEach(
    (a) => Oe(u, a, i, !0)
  ), Oe(u, t, i)), V(t) && o.set(t, u), u;
}
function Oe(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Oe(e, o, n, !0), r && r.forEach(
    (i) => Oe(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && O(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = xr[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const xr = {
  data: ft,
  props: dt,
  emits: dt,
  // objects
  methods: ne,
  computed: ne,
  // lifecycle
  beforeCreate: S,
  created: S,
  beforeMount: S,
  mounted: S,
  beforeUpdate: S,
  updated: S,
  beforeDestroy: S,
  beforeUnmount: S,
  destroyed: S,
  unmounted: S,
  activated: S,
  deactivated: S,
  errorCaptured: S,
  serverPrefetch: S,
  // assets
  components: ne,
  directives: ne,
  // watch
  watch: Rr,
  // provide / inject
  provide: ft,
  inject: Vr
};
function ft(e, t) {
  return t ? e ? function() {
    return I(
      b(e) ? e.call(this, this) : e,
      b(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Vr(e, t) {
  return ne(pt(e), pt(t));
}
function pt(e) {
  if (m(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function S(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ne(e, t) {
  return e ? I(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function dt(e, t) {
  return e ? m(e) && m(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : I(
    /* @__PURE__ */ Object.create(null),
    at(e),
    at(t ?? {})
  ) : t;
}
function Rr(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = I(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = S(e[s], t[s]);
  return n;
}
const ht = _r, Ir = (e) => e.__isTeleport, zt = Symbol.for("v-fgt"), Dr = Symbol.for("v-txt"), Cr = Symbol.for("v-cmt"), me = [];
let C = null;
function Tr(e = !1) {
  me.push(C = e ? null : []);
}
function $r() {
  me.pop(), C = me[me.length - 1] || null;
}
function Pr(e) {
  return e.dynamicChildren = C || Zt, $r(), C && C.push(e), e;
}
function Mr(e, t, n, s, r, o) {
  return Pr(
    Wt(
      e,
      t,
      n,
      s,
      r,
      o,
      !0
      /* isBlock */
    )
  );
}
function Fr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Ar = (...e) => Bt(
  ...e
), Ht = "__vInternal", Ut = ({ key: e }) => e ?? null, Ee = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? T(e) || x(e) || b(e) ? { i: K, r: e, k: t, f: !!n } : e : null);
function Wt(e, t = null, n = null, s = 0, r = null, o = e === zt ? 0 : 1, i = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ut(t),
    ref: t && Ee(t),
    scopeId: dr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: K
  };
  return c ? (Ze(u, n), o & 128 && e.normalize(u)) : n && (u.shapeFlag |= T(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && O("VNode created with invalid key (NaN). VNode type:", u.type), // avoid a block node from tracking itself
  !i && // has current parent block
  C && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && C.push(u), u;
}
const oe = process.env.NODE_ENV !== "production" ? Ar : Bt;
function Bt(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === Or) && (process.env.NODE_ENV !== "production" && !e && O(`Invalid vnode type when creating vnode: ${e}.`), e = Cr), Fr(e)) {
    const c = ve(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Ze(c, n), !o && C && (c.shapeFlag & 6 ? C[C.indexOf(e)] = c : C.push(c)), c.patchFlag |= -2, c;
  }
  if (Lt(e) && (e = e.__vccOpts), t) {
    t = jr(t);
    let { class: c, style: u } = t;
    c && !T(c) && (t.class = Be(c)), V(u) && (Ae(u) && !m(u) && (u = I({}, u)), t.style = We(u));
  }
  const i = T(e) ? 1 : hr(e) ? 128 : Ir(e) ? 64 : V(e) ? 4 : b(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Ae(e) && (e = d(e), O(
    "Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Wt(
    e,
    t,
    n,
    s,
    r,
    i,
    o,
    !0
  );
}
function jr(e) {
  return e ? Ae(e) || Ht in e ? I({}, e) : e : null;
}
function ve(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e, c = t ? zr(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Ut(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? m(r) ? r.concat(Ee(t)) : [r, Ee(t)] : Ee(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && m(i) ? i.map(qt) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== zt ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ve(e.ssContent),
    ssFallback: e.ssFallback && ve(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function qt(e) {
  const t = ve(e);
  return m(e.children) && (t.children = e.children.map(qt)), t;
}
function Kr(e = " ", t = 0) {
  return oe(Dr, null, e, t);
}
function Ze(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (m(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Ze(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Ht in t) ? t._ctx = K : r === 3 && K && (K.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    b(t) ? (t = { default: t, _ctx: K }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Kr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function zr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Be([t.class, s.class]));
      else if (r === "style")
        t.style = We([t.style, s.style]);
      else if (en(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(m(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
let L = null, ke, Y, _t = "__VUE_INSTANCE_SETTERS__";
(Y = Te()[_t]) || (Y = Te()[_t] = []), Y.push((e) => L = e), ke = (e) => {
  Y.length > 1 ? Y.forEach((t) => t(e)) : Y[0](e);
};
const gt = (e) => {
  ke(e), e.scope.on();
}, Hr = () => {
  L && L.scope.off(), ke(null);
};
function Ur(e) {
  return e.vnode.shapeFlag & 4;
}
let Wr = !1;
function Br(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Xn(Bn(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in se)
          return se[n](e);
      },
      has(t, n) {
        return n in t || n in se;
      }
    }));
}
const qr = /(?:^|[-_])(\w)/g, Jr = (e) => e.replace(qr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Jt(e, t = !0) {
  return b(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Gt(e, t, n = !1) {
  let s = Jt(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return s ? Jr(s) : n ? "App" : "Anonymous";
}
function Lt(e) {
  return b(e) && "__vccOpts" in e;
}
function Ce(e) {
  return !!(e && e.__v_isShallow);
}
function Gr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, s = { style: "color:#9d288c" }, r = {
    header(l) {
      return V(l) ? l.__isVue ? ["div", e, "VueInstance"] : x(l) ? [
        "div",
        {},
        ["span", e, _(l)],
        "<",
        c(l.value),
        ">"
      ] : q(l) ? [
        "div",
        {},
        ["span", e, Ce(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${W(l) ? " (readonly)" : ""}`
      ] : W(l) ? [
        "div",
        {},
        ["span", e, Ce(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const f = [];
    l.type.props && l.props && f.push(i("props", d(l.props))), l.setupState !== P && f.push(i("setup", l.setupState)), l.data !== P && f.push(i("data", d(l.data)));
    const h = u(l, "computed");
    h && f.push(i("computed", h));
    const p = u(l, "inject");
    return p && f.push(i("injected", p)), f.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), f;
  }
  function i(l, f) {
    return f = I({}, f), Object.keys(f).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(f).map((h) => [
          "div",
          {},
          ["span", s, h + ": "],
          c(f[h], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, f = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : V(l) ? ["object", { object: f ? d(l) : l }] : ["span", n, String(l)];
  }
  function u(l, f) {
    const h = l.type;
    if (b(h))
      return;
    const p = {};
    for (const N in l.ctx)
      a(h, N, f) && (p[N] = l.ctx[N]);
    return p;
  }
  function a(l, f, h) {
    const p = l[h];
    if (m(p) && p.includes(f) || V(p) && f in p || l.extends && a(l.extends, f, h) || l.mixins && l.mixins.some((N) => a(N, f, h)))
      return !0;
  }
  function _(l) {
    return Ce(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
function Lr() {
  Gr();
}
process.env.NODE_ENV !== "production" && Lr();
const Yr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Qr = {};
function Xr(e, t) {
  return Tr(), Mr("div");
}
const Zr = /* @__PURE__ */ Yr(Qr, [["render", Xr], ["__file", "/Users/xivlaw/Documents/git/vite-monorepo-template/packages/test/src/test.vue"]]);
console.log(Nr);
console.log(Zr);
alert();
const es = "666";
export {
  es as test
};
