/*:
 * @target MZ
 */

/*! Project:pixi-apngAndGi, Create:FWS 2018.09.28 15:29, Update:FWS 2020.03.10 09:17 */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : "function" == typeof define && (define.cmd || define.hjs)
    ? define(function (require, exports, e) {
        e.exports = t();
      })
    : (e.PixiApngAndGif = t());
})(this, function () {
  "use strict";
  function e(e) {
    var r = 0;
    if (
      71 !== e[r++] ||
      73 !== e[r++] ||
      70 !== e[r++] ||
      56 !== e[r++] ||
      56 != ((e[r++] + 1) & 253) ||
      97 !== e[r++]
    )
      throw new Error("Invalid GIF 87a/89a header.");
    var a = e[r++] | (e[r++] << 8),
      n = e[r++] | (e[r++] << 8),
      i = e[r++],
      s = i >> 7,
      o = 7 & i,
      l = 1 << (o + 1);
    e[r++];
    e[r++];
    var f = null,
      h = null;
    s && ((f = r), (h = l), (r += 3 * l));
    var d = !0,
      u = [],
      _ = 0,
      c = null,
      p = 0,
      v = null;
    for (this.width = a, this.height = n; d && r < e.length; )
      switch (e[r++]) {
        case 33:
          switch (e[r++]) {
            case 255:
              if (
                11 !== e[r] ||
                (78 == e[r + 1] &&
                  69 == e[r + 2] &&
                  84 == e[r + 3] &&
                  83 == e[r + 4] &&
                  67 == e[r + 5] &&
                  65 == e[r + 6] &&
                  80 == e[r + 7] &&
                  69 == e[r + 8] &&
                  50 == e[r + 9] &&
                  46 == e[r + 10] &&
                  48 == e[r + 11] &&
                  3 == e[r + 12] &&
                  1 == e[r + 13] &&
                  0 == e[r + 16])
              )
                (r += 14), (v = e[r++] | (e[r++] << 8)), r++;
              else
                for (r += 12; ; ) {
                  var g = e[r++];
                  if (!(g >= 0)) throw Error("Invalid block size");
                  if (0 === g) break;
                  r += g;
                }
              break;
            case 249:
              if (4 !== e[r++] || 0 !== e[r + 4])
                throw new Error("Invalid graphics extension block.");
              var b = e[r++];
              (_ = e[r++] | (e[r++] << 8)),
                (c = e[r++]),
                0 == (1 & b) && (c = null),
                (p = (b >> 2) & 7),
                r++;
              break;
            case 254:
              for (;;) {
                var g = e[r++];
                if (!(g >= 0)) throw Error("Invalid block size");
                if (0 === g) break;
                r += g;
              }
              break;
            default:
              throw new Error(
                "Unknown graphic control label: 0x" + e[r - 1].toString(16)
              );
          }
          break;
        case 44:
          var w = e[r++] | (e[r++] << 8),
            m = e[r++] | (e[r++] << 8),
            y = e[r++] | (e[r++] << 8),
            k = e[r++] | (e[r++] << 8),
            x = e[r++],
            z = x >> 7,
            E = (x >> 6) & 1,
            A = 7 & x,
            S = 1 << (A + 1),
            I = f,
            R = h,
            B = !1;
          if (z) {
            var B = !0;
            (I = r), (R = S), (r += 3 * S);
          }
          var Z = r;
          for (r++; ; ) {
            var g = e[r++];
            if (!(g >= 0)) throw Error("Invalid block size");
            if (0 === g) break;
            r += g;
          }
          u.push({
            x: w,
            y: m,
            width: y,
            height: k,
            has_local_palette: B,
            palette_offset: I,
            palette_size: R,
            data_offset: Z,
            data_length: r - Z,
            transparent_index: c,
            interlaced: !!E,
            delay: _,
            disposal: p,
          });
          break;
        case 59:
          d = !1;
          break;
        default:
          throw new Error("Unknown gif block: 0x" + e[r - 1].toString(16));
      }
    (this.numFrames = function () {
      return u.length;
    }),
      (this.loopCount = function () {
        return v;
      }),
      (this.frameInfo = function (e) {
        if (e < 0 || e >= u.length)
          throw new Error("Frame index out of range.");
        return u[e];
      }),
      (this.decodeAndBlitFrameBGRA = function (r, n) {
        var i = this.frameInfo(r),
          s = i.width * i.height,
          o = new Uint8Array(s);
        t(e, i.data_offset, o, s);
        var l = i.palette_offset,
          f = i.transparent_index;
        null === f && (f = 256);
        var h = i.width,
          d = a - h,
          u = h,
          _ = 4 * (i.y * a + i.x),
          c = 4 * ((i.y + i.height) * a + i.x),
          p = _,
          v = 4 * d;
        !0 === i.interlaced && (v += 4 * a * 7);
        for (var g = 8, b = 0, w = o.length; b < w; ++b) {
          var m = o[b];
          if (
            (0 === u &&
              ((p += v),
              (u = h),
              p >= c &&
                ((v = 4 * d + 4 * a * (g - 1)),
                (p = _ + (h + d) * (g << 1)),
                (g >>= 1))),
            m === f)
          )
            p += 4;
          else {
            var y = e[l + 3 * m],
              k = e[l + 3 * m + 1],
              x = e[l + 3 * m + 2];
            (n[p++] = x), (n[p++] = k), (n[p++] = y), (n[p++] = 255);
          }
          --u;
        }
      }),
      (this.decodeAndBlitFrameRGBA = function (r, n) {
        var i = this.frameInfo(r),
          s = i.width * i.height,
          o = new Uint8Array(s);
        t(e, i.data_offset, o, s);
        var l = i.palette_offset,
          f = i.transparent_index;
        null === f && (f = 256);
        var h = i.width,
          d = a - h,
          u = h,
          _ = 4 * (i.y * a + i.x),
          c = 4 * ((i.y + i.height) * a + i.x),
          p = _,
          v = 4 * d;
        !0 === i.interlaced && (v += 4 * a * 7);
        for (var g = 8, b = 0, w = o.length; b < w; ++b) {
          var m = o[b];
          if (
            (0 === u &&
              ((p += v),
              (u = h),
              p >= c &&
                ((v = 4 * d + 4 * a * (g - 1)),
                (p = _ + (h + d) * (g << 1)),
                (g >>= 1))),
            m === f)
          )
            p += 4;
          else {
            var y = e[l + 3 * m],
              k = e[l + 3 * m + 1],
              x = e[l + 3 * m + 2];
            (n[p++] = y), (n[p++] = k), (n[p++] = x), (n[p++] = 255);
          }
          --u;
        }
      });
  }
  function t(e, t, r, a) {
    for (
      var n = e[t++],
        i = 1 << n,
        s = i + 1,
        o = s + 1,
        l = n + 1,
        f = (1 << l) - 1,
        h = 0,
        d = 0,
        u = 0,
        _ = e[t++],
        c = new Int32Array(4096),
        p = null;
      ;

    ) {
      for (; h < 16 && 0 !== _; )
        (d |= e[t++] << h), (h += 8), 1 === _ ? (_ = e[t++]) : --_;
      if (h < l) break;
      var v = d & f;
      if (((d >>= l), (h -= l), v !== i)) {
        if (v === s) break;
        for (var g = v < o ? v : p, b = 0, w = g; w > i; ) (w = c[w] >> 8), ++b;
        var m = w;
        if (u + b + (g !== v ? 1 : 0) > a)
          return void console.log("Warning, gif stream longer than expected.");
        (r[u++] = m), (u += b);
        var y = u;
        for (g !== v && (r[u++] = m), w = g; b--; )
          (w = c[w]), (r[--y] = 255 & w), (w >>= 8);
        null !== p &&
          o < 4096 &&
          ((c[o++] = (p << 8) | m),
          o >= f + 1 && l < 12 && (++l, (f = (f << 1) | 1))),
          (p = v);
      } else (o = s + 1), (l = n + 1), (f = (1 << l) - 1), (p = null);
    }
    return (
      u !== a && console.log("Warning, gif stream shorter than expected."), r
    );
  }
  function r(e) {
    for (var t = e.length; --t >= 0; ) e[t] = 0;
  }
  function a(e, t, r, a, n) {
    (this.static_tree = e),
      (this.extra_bits = t),
      (this.extra_base = r),
      (this.elems = a),
      (this.max_length = n),
      (this.has_stree = e && e.length);
  }
  function n(e, t) {
    (this.dyn_tree = e), (this.max_code = 0), (this.stat_desc = t);
  }
  function i(e) {
    return e < 256 ? dt[e] : dt[256 + (e >>> 7)];
  }
  function s(e, t) {
    (e.pending_buf[e.pending++] = 255 & t),
      (e.pending_buf[e.pending++] = (t >>> 8) & 255);
  }
  function o(e, t, r) {
    e.bi_valid > $e - r
      ? ((e.bi_buf |= (t << e.bi_valid) & 65535),
        s(e, e.bi_buf),
        (e.bi_buf = t >> ($e - e.bi_valid)),
        (e.bi_valid += r - $e))
      : ((e.bi_buf |= (t << e.bi_valid) & 65535), (e.bi_valid += r));
  }
  function l(e, t, r) {
    o(e, r[2 * t], r[2 * t + 1]);
  }
  function f(e, t) {
    var r = 0;
    do {
      (r |= 1 & e), (e >>>= 1), (r <<= 1);
    } while (--t > 0);
    return r >>> 1;
  }
  function h(e) {
    16 === e.bi_valid
      ? (s(e, e.bi_buf), (e.bi_buf = 0), (e.bi_valid = 0))
      : e.bi_valid >= 8 &&
        ((e.pending_buf[e.pending++] = 255 & e.bi_buf),
        (e.bi_buf >>= 8),
        (e.bi_valid -= 8));
  }
  function d(e, t) {
    var r,
      a,
      n,
      i,
      s,
      o,
      l = t.dyn_tree,
      f = t.max_code,
      h = t.stat_desc.static_tree,
      d = t.stat_desc.has_stree,
      u = t.stat_desc.extra_bits,
      _ = t.stat_desc.extra_base,
      c = t.stat_desc.max_length,
      p = 0;
    for (i = 0; i <= Qe; i++) e.bl_count[i] = 0;
    for (l[2 * e.heap[e.heap_max] + 1] = 0, r = e.heap_max + 1; r < Je; r++)
      (a = e.heap[r]),
        (i = l[2 * l[2 * a + 1] + 1] + 1),
        i > c && ((i = c), p++),
        (l[2 * a + 1] = i),
        a > f ||
          (e.bl_count[i]++,
          (s = 0),
          a >= _ && (s = u[a - _]),
          (o = l[2 * a]),
          (e.opt_len += o * (i + s)),
          d && (e.static_len += o * (h[2 * a + 1] + s)));
    if (0 !== p) {
      do {
        for (i = c - 1; 0 === e.bl_count[i]; ) i--;
        e.bl_count[i]--, (e.bl_count[i + 1] += 2), e.bl_count[c]--, (p -= 2);
      } while (p > 0);
      for (i = c; 0 !== i; i--)
        for (a = e.bl_count[i]; 0 !== a; )
          (n = e.heap[--r]) > f ||
            (l[2 * n + 1] !== i &&
              ((e.opt_len += (i - l[2 * n + 1]) * l[2 * n]),
              (l[2 * n + 1] = i)),
            a--);
    }
  }
  function u(e, t, r) {
    var a,
      n,
      i = new Array(Qe + 1),
      s = 0;
    for (a = 1; a <= Qe; a++) i[a] = s = (s + r[a - 1]) << 1;
    for (n = 0; n <= t; n++) {
      var o = e[2 * n + 1];
      0 !== o && (e[2 * n] = f(i[o]++, o));
    }
  }
  function _() {
    var e,
      t,
      r,
      n,
      i,
      s = new Array(Qe + 1);
    for (r = 0, n = 0; n < Ke - 1; n++)
      for (_t[n] = r, e = 0; e < 1 << it[n]; e++) ut[r++] = n;
    for (ut[r - 1] = n, i = 0, n = 0; n < 16; n++)
      for (ct[n] = i, e = 0; e < 1 << st[n]; e++) dt[i++] = n;
    for (i >>= 7; n < We; n++)
      for (ct[n] = i << 7, e = 0; e < 1 << (st[n] - 7); e++) dt[256 + i++] = n;
    for (t = 0; t <= Qe; t++) s[t] = 0;
    for (e = 0; e <= 143; ) (ft[2 * e + 1] = 8), e++, s[8]++;
    for (; e <= 255; ) (ft[2 * e + 1] = 9), e++, s[9]++;
    for (; e <= 279; ) (ft[2 * e + 1] = 7), e++, s[7]++;
    for (; e <= 287; ) (ft[2 * e + 1] = 8), e++, s[8]++;
    for (u(ft, Ye + 1, s), e = 0; e < We; e++)
      (ht[2 * e + 1] = 5), (ht[2 * e] = f(e, 5));
    (pt = new a(ft, it, Xe + 1, Ye, Qe)),
      (vt = new a(ht, st, 0, We, Qe)),
      (gt = new a(new Array(0), ot, 0, Ve, et));
  }
  function c(e) {
    var t;
    for (t = 0; t < Ye; t++) e.dyn_ltree[2 * t] = 0;
    for (t = 0; t < We; t++) e.dyn_dtree[2 * t] = 0;
    for (t = 0; t < Ve; t++) e.bl_tree[2 * t] = 0;
    (e.dyn_ltree[2 * tt] = 1),
      (e.opt_len = e.static_len = 0),
      (e.last_lit = e.matches = 0);
  }
  function p(e) {
    e.bi_valid > 8
      ? s(e, e.bi_buf)
      : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf),
      (e.bi_buf = 0),
      (e.bi_valid = 0);
  }
  function v(e, t, r, a) {
    p(e),
      a && (s(e, r), s(e, ~r)),
      Ce.arraySet(e.pending_buf, e.window, t, r, e.pending),
      (e.pending += r);
  }
  function g(e, t, r, a) {
    var n = 2 * t,
      i = 2 * r;
    return e[n] < e[i] || (e[n] === e[i] && a[t] <= a[r]);
  }
  function b(e, t, r) {
    for (
      var a = e.heap[r], n = r << 1;
      n <= e.heap_len &&
      (n < e.heap_len && g(t, e.heap[n + 1], e.heap[n], e.depth) && n++,
      !g(t, a, e.heap[n], e.depth));

    )
      (e.heap[r] = e.heap[n]), (r = n), (n <<= 1);
    e.heap[r] = a;
  }
  function w(e, t, r) {
    var a,
      n,
      s,
      f,
      h = 0;
    if (0 !== e.last_lit)
      do {
        (a =
          (e.pending_buf[e.d_buf + 2 * h] << 8) |
          e.pending_buf[e.d_buf + 2 * h + 1]),
          (n = e.pending_buf[e.l_buf + h]),
          h++,
          0 === a
            ? l(e, n, t)
            : ((s = ut[n]),
              l(e, s + Xe + 1, t),
              (f = it[s]),
              0 !== f && ((n -= _t[s]), o(e, n, f)),
              a--,
              (s = i(a)),
              l(e, s, r),
              0 !== (f = st[s]) && ((a -= ct[s]), o(e, a, f)));
      } while (h < e.last_lit);
    l(e, tt, t);
  }
  function m(e, t) {
    var r,
      a,
      n,
      i = t.dyn_tree,
      s = t.stat_desc.static_tree,
      o = t.stat_desc.has_stree,
      l = t.stat_desc.elems,
      f = -1;
    for (e.heap_len = 0, e.heap_max = Je, r = 0; r < l; r++)
      0 !== i[2 * r]
        ? ((e.heap[++e.heap_len] = f = r), (e.depth[r] = 0))
        : (i[2 * r + 1] = 0);
    for (; e.heap_len < 2; )
      (n = e.heap[++e.heap_len] = f < 2 ? ++f : 0),
        (i[2 * n] = 1),
        (e.depth[n] = 0),
        e.opt_len--,
        o && (e.static_len -= s[2 * n + 1]);
    for (t.max_code = f, r = e.heap_len >> 1; r >= 1; r--) b(e, i, r);
    n = l;
    do {
      (r = e.heap[1]),
        (e.heap[1] = e.heap[e.heap_len--]),
        b(e, i, 1),
        (a = e.heap[1]),
        (e.heap[--e.heap_max] = r),
        (e.heap[--e.heap_max] = a),
        (i[2 * n] = i[2 * r] + i[2 * a]),
        (e.depth[n] = (e.depth[r] >= e.depth[a] ? e.depth[r] : e.depth[a]) + 1),
        (i[2 * r + 1] = i[2 * a + 1] = n),
        (e.heap[1] = n++),
        b(e, i, 1);
    } while (e.heap_len >= 2);
    (e.heap[--e.heap_max] = e.heap[1]), d(e, t), u(i, f, e.bl_count);
  }
  function y(e, t, r) {
    var a,
      n,
      i = -1,
      s = t[1],
      o = 0,
      l = 7,
      f = 4;
    for (
      0 === s && ((l = 138), (f = 3)), t[2 * (r + 1) + 1] = 65535, a = 0;
      a <= r;
      a++
    )
      (n = s),
        (s = t[2 * (a + 1) + 1]),
        (++o < l && n === s) ||
          (o < f
            ? (e.bl_tree[2 * n] += o)
            : 0 !== n
            ? (n !== i && e.bl_tree[2 * n]++, e.bl_tree[2 * rt]++)
            : o <= 10
            ? e.bl_tree[2 * at]++
            : e.bl_tree[2 * nt]++,
          (o = 0),
          (i = n),
          0 === s
            ? ((l = 138), (f = 3))
            : n === s
            ? ((l = 6), (f = 3))
            : ((l = 7), (f = 4)));
  }
  function k(e, t, r) {
    var a,
      n,
      i = -1,
      s = t[1],
      f = 0,
      h = 7,
      d = 4;
    for (0 === s && ((h = 138), (d = 3)), a = 0; a <= r; a++)
      if (((n = s), (s = t[2 * (a + 1) + 1]), !(++f < h && n === s))) {
        if (f < d)
          do {
            l(e, n, e.bl_tree);
          } while (0 != --f);
        else
          0 !== n
            ? (n !== i && (l(e, n, e.bl_tree), f--),
              l(e, rt, e.bl_tree),
              o(e, f - 3, 2))
            : f <= 10
            ? (l(e, at, e.bl_tree), o(e, f - 3, 3))
            : (l(e, nt, e.bl_tree), o(e, f - 11, 7));
        (f = 0),
          (i = n),
          0 === s
            ? ((h = 138), (d = 3))
            : n === s
            ? ((h = 6), (d = 3))
            : ((h = 7), (d = 4));
      }
  }
  function x(e) {
    var t;
    for (
      y(e, e.dyn_ltree, e.l_desc.max_code),
        y(e, e.dyn_dtree, e.d_desc.max_code),
        m(e, e.bl_desc),
        t = Ve - 1;
      t >= 3 && 0 === e.bl_tree[2 * lt[t] + 1];
      t--
    );
    return (e.opt_len += 3 * (t + 1) + 5 + 5 + 4), t;
  }
  function z(e, t, r, a) {
    var n;
    for (o(e, t - 257, 5), o(e, r - 1, 5), o(e, a - 4, 4), n = 0; n < a; n++)
      o(e, e.bl_tree[2 * lt[n] + 1], 3);
    k(e, e.dyn_ltree, t - 1), k(e, e.dyn_dtree, r - 1);
  }
  function E(e) {
    var t,
      r = 4093624447;
    for (t = 0; t <= 31; t++, r >>>= 1)
      if (1 & r && 0 !== e.dyn_ltree[2 * t]) return Me;
    if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26])
      return Pe;
    for (t = 32; t < Xe; t++) if (0 !== e.dyn_ltree[2 * t]) return Pe;
    return Me;
  }
  function A(e) {
    wt || (_(), (wt = !0)),
      (e.l_desc = new n(e.dyn_ltree, pt)),
      (e.d_desc = new n(e.dyn_dtree, vt)),
      (e.bl_desc = new n(e.bl_tree, gt)),
      (e.bi_buf = 0),
      (e.bi_valid = 0),
      c(e);
  }
  function S(e, t, r, a) {
    o(e, (je << 1) + (a ? 1 : 0), 3), v(e, t, r, !0);
  }
  function I(e) {
    o(e, qe << 1, 3), l(e, tt, ft), h(e);
  }
  function R(e, t, r, a) {
    var n,
      i,
      s = 0;
    e.level > 0
      ? (e.strm.data_type === He && (e.strm.data_type = E(e)),
        m(e, e.l_desc),
        m(e, e.d_desc),
        (s = x(e)),
        (n = (e.opt_len + 3 + 7) >>> 3),
        (i = (e.static_len + 3 + 7) >>> 3) <= n && (n = i))
      : (n = i = r + 5),
      r + 4 <= n && -1 !== t
        ? S(e, t, r, a)
        : e.strategy === Fe || i === n
        ? (o(e, (qe << 1) + (a ? 1 : 0), 3), w(e, ft, ht))
        : (o(e, (Ge << 1) + (a ? 1 : 0), 3),
          z(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, s + 1),
          w(e, e.dyn_ltree, e.dyn_dtree)),
      c(e),
      a && p(e);
  }
  function B(e, t, r) {
    return (
      (e.pending_buf[e.d_buf + 2 * e.last_lit] = (t >>> 8) & 255),
      (e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t),
      (e.pending_buf[e.l_buf + e.last_lit] = 255 & r),
      e.last_lit++,
      0 === t
        ? e.dyn_ltree[2 * r]++
        : (e.matches++,
          t--,
          e.dyn_ltree[2 * (ut[r] + Xe + 1)]++,
          e.dyn_dtree[2 * i(t)]++),
      e.last_lit === e.lit_bufsize - 1
    );
  }
  function Z(e, t, r, a) {
    for (
      var n = (65535 & e) | 0, i = ((e >>> 16) & 65535) | 0, s = 0;
      0 !== r;

    ) {
      (s = r > 2e3 ? 2e3 : r), (r -= s);
      do {
        (n = (n + t[a++]) | 0), (i = (i + n) | 0);
      } while (--s);
      (n %= 65521), (i %= 65521);
    }
    return n | (i << 16) | 0;
  }
  function U(e, t, r, a) {
    var n = Rt,
      i = a + r;
    e ^= -1;
    for (var s = a; s < i; s++) e = (e >>> 8) ^ n[255 & (e ^ t[s])];
    return -1 ^ e;
  }
  function T(e, t) {
    return (e.msg = Lt[t]), t;
  }
  function N(e) {
    return (e << 1) - (e > 4 ? 9 : 0);
  }
  function D(e) {
    for (var t = e.length; --t >= 0; ) e[t] = 0;
  }
  function O(e) {
    var t = e.state,
      r = t.pending;
    r > e.avail_out && (r = e.avail_out),
      0 !== r &&
        (Ce.arraySet(e.output, t.pending_buf, t.pending_out, r, e.next_out),
        (e.next_out += r),
        (t.pending_out += r),
        (e.total_out += r),
        (e.avail_out -= r),
        (t.pending -= r),
        0 === t.pending && (t.pending_out = 0));
  }
  function L(e, t) {
    Nt._tr_flush_block(
      e,
      e.block_start >= 0 ? e.block_start : -1,
      e.strstart - e.block_start,
      t
    ),
      (e.block_start = e.strstart),
      O(e.strm);
  }
  function C(e, t) {
    e.pending_buf[e.pending++] = t;
  }
  function F(e, t) {
    (e.pending_buf[e.pending++] = (t >>> 8) & 255),
      (e.pending_buf[e.pending++] = 255 & t);
  }
  function M(e, t, r, a) {
    var n = e.avail_in;
    return (
      n > a && (n = a),
      0 === n
        ? 0
        : ((e.avail_in -= n),
          Ce.arraySet(t, e.input, e.next_in, n, r),
          1 === e.state.wrap
            ? (e.adler = Dt(e.adler, t, n, r))
            : 2 === e.state.wrap && (e.adler = Ot(e.adler, t, n, r)),
          (e.next_in += n),
          (e.total_in += n),
          n)
    );
  }
  function P(e, t) {
    var r,
      a,
      n = e.max_chain_length,
      i = e.strstart,
      s = e.prev_length,
      o = e.nice_match,
      l = e.strstart > e.w_size - ur ? e.strstart - (e.w_size - ur) : 0,
      f = e.window,
      h = e.w_mask,
      d = e.prev,
      u = e.strstart + dr,
      _ = f[i + s - 1],
      c = f[i + s];
    e.prev_length >= e.good_match && (n >>= 2),
      o > e.lookahead && (o = e.lookahead);
    do {
      if (
        ((r = t),
        f[r + s] === c &&
          f[r + s - 1] === _ &&
          f[r] === f[i] &&
          f[++r] === f[i + 1])
      ) {
        (i += 2), r++;
        do {} while (
          f[++i] === f[++r] &&
          f[++i] === f[++r] &&
          f[++i] === f[++r] &&
          f[++i] === f[++r] &&
          f[++i] === f[++r] &&
          f[++i] === f[++r] &&
          f[++i] === f[++r] &&
          f[++i] === f[++r] &&
          i < u
        );
        if (((a = dr - (u - i)), (i = u - dr), a > s)) {
          if (((e.match_start = t), (s = a), a >= o)) break;
          (_ = f[i + s - 1]), (c = f[i + s]);
        }
      }
    } while ((t = d[t & h]) > l && 0 != --n);
    return s <= e.lookahead ? s : e.lookahead;
  }
  function H(e) {
    var t,
      r,
      a,
      n,
      i,
      s = e.w_size;
    do {
      if (
        ((n = e.window_size - e.lookahead - e.strstart),
        e.strstart >= s + (s - ur))
      ) {
        Ce.arraySet(e.window, e.window, s, s, 0),
          (e.match_start -= s),
          (e.strstart -= s),
          (e.block_start -= s),
          (r = e.hash_size),
          (t = r);
        do {
          (a = e.head[--t]), (e.head[t] = a >= s ? a - s : 0);
        } while (--r);
        (r = s), (t = r);
        do {
          (a = e.prev[--t]), (e.prev[t] = a >= s ? a - s : 0);
        } while (--r);
        n += s;
      }
      if (0 === e.strm.avail_in) break;
      if (
        ((r = M(e.strm, e.window, e.strstart + e.lookahead, n)),
        (e.lookahead += r),
        e.lookahead + e.insert >= hr)
      )
        for (
          i = e.strstart - e.insert,
            e.ins_h = e.window[i],
            e.ins_h =
              ((e.ins_h << e.hash_shift) ^ e.window[i + 1]) & e.hash_mask;
          e.insert &&
          ((e.ins_h =
            ((e.ins_h << e.hash_shift) ^ e.window[i + hr - 1]) & e.hash_mask),
          (e.prev[i & e.w_mask] = e.head[e.ins_h]),
          (e.head[e.ins_h] = i),
          i++,
          e.insert--,
          !(e.lookahead + e.insert < hr));

        );
    } while (e.lookahead < ur && 0 !== e.strm.avail_in);
  }
  function j(e, t) {
    var r = 65535;
    for (r > e.pending_buf_size - 5 && (r = e.pending_buf_size - 5); ; ) {
      if (e.lookahead <= 1) {
        if ((H(e), 0 === e.lookahead && t === Ct)) return yr;
        if (0 === e.lookahead) break;
      }
      (e.strstart += e.lookahead), (e.lookahead = 0);
      var a = e.block_start + r;
      if (
        (0 === e.strstart || e.strstart >= a) &&
        ((e.lookahead = e.strstart - a),
        (e.strstart = a),
        L(e, !1),
        0 === e.strm.avail_out)
      )
        return yr;
      if (
        e.strstart - e.block_start >= e.w_size - ur &&
        (L(e, !1), 0 === e.strm.avail_out)
      )
        return yr;
    }
    return (
      (e.insert = 0),
      t === Pt
        ? (L(e, !0), 0 === e.strm.avail_out ? xr : zr)
        : (e.strstart > e.block_start && (L(e, !1), e.strm.avail_out), yr)
    );
  }
  function q(e, t) {
    for (var r, a; ; ) {
      if (e.lookahead < ur) {
        if ((H(e), e.lookahead < ur && t === Ct)) return yr;
        if (0 === e.lookahead) break;
      }
      if (
        ((r = 0),
        e.lookahead >= hr &&
          ((e.ins_h =
            ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + hr - 1]) &
            e.hash_mask),
          (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
          (e.head[e.ins_h] = e.strstart)),
        0 !== r &&
          e.strstart - r <= e.w_size - ur &&
          (e.match_length = P(e, r)),
        e.match_length >= hr)
      )
        if (
          ((a = Nt._tr_tally(
            e,
            e.strstart - e.match_start,
            e.match_length - hr
          )),
          (e.lookahead -= e.match_length),
          e.match_length <= e.max_lazy_match && e.lookahead >= hr)
        ) {
          e.match_length--;
          do {
            e.strstart++,
              (e.ins_h =
                ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + hr - 1]) &
                e.hash_mask),
              (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
              (e.head[e.ins_h] = e.strstart);
          } while (0 != --e.match_length);
          e.strstart++;
        } else
          (e.strstart += e.match_length),
            (e.match_length = 0),
            (e.ins_h = e.window[e.strstart]),
            (e.ins_h =
              ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + 1]) &
              e.hash_mask);
      else
        (a = Nt._tr_tally(e, 0, e.window[e.strstart])),
          e.lookahead--,
          e.strstart++;
      if (a && (L(e, !1), 0 === e.strm.avail_out)) return yr;
    }
    return (
      (e.insert = e.strstart < hr - 1 ? e.strstart : hr - 1),
      t === Pt
        ? (L(e, !0), 0 === e.strm.avail_out ? xr : zr)
        : e.last_lit && (L(e, !1), 0 === e.strm.avail_out)
        ? yr
        : kr
    );
  }
  function G(e, t) {
    for (var r, a, n; ; ) {
      if (e.lookahead < ur) {
        if ((H(e), e.lookahead < ur && t === Ct)) return yr;
        if (0 === e.lookahead) break;
      }
      if (
        ((r = 0),
        e.lookahead >= hr &&
          ((e.ins_h =
            ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + hr - 1]) &
            e.hash_mask),
          (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
          (e.head[e.ins_h] = e.strstart)),
        (e.prev_length = e.match_length),
        (e.prev_match = e.match_start),
        (e.match_length = hr - 1),
        0 !== r &&
          e.prev_length < e.max_lazy_match &&
          e.strstart - r <= e.w_size - ur &&
          ((e.match_length = P(e, r)),
          e.match_length <= 5 &&
            (e.strategy === Wt ||
              (e.match_length === hr && e.strstart - e.match_start > 4096)) &&
            (e.match_length = hr - 1)),
        e.prev_length >= hr && e.match_length <= e.prev_length)
      ) {
        (n = e.strstart + e.lookahead - hr),
          (a = Nt._tr_tally(
            e,
            e.strstart - 1 - e.prev_match,
            e.prev_length - hr
          )),
          (e.lookahead -= e.prev_length - 1),
          (e.prev_length -= 2);
        do {
          ++e.strstart <= n &&
            ((e.ins_h =
              ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + hr - 1]) &
              e.hash_mask),
            (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
            (e.head[e.ins_h] = e.strstart));
        } while (0 != --e.prev_length);
        if (
          ((e.match_available = 0),
          (e.match_length = hr - 1),
          e.strstart++,
          a && (L(e, !1), 0 === e.strm.avail_out))
        )
          return yr;
      } else if (e.match_available) {
        if (
          ((a = Nt._tr_tally(e, 0, e.window[e.strstart - 1])),
          a && L(e, !1),
          e.strstart++,
          e.lookahead--,
          0 === e.strm.avail_out)
        )
          return yr;
      } else (e.match_available = 1), e.strstart++, e.lookahead--;
    }
    return (
      e.match_available &&
        ((a = Nt._tr_tally(e, 0, e.window[e.strstart - 1])),
        (e.match_available = 0)),
      (e.insert = e.strstart < hr - 1 ? e.strstart : hr - 1),
      t === Pt
        ? (L(e, !0), 0 === e.strm.avail_out ? xr : zr)
        : e.last_lit && (L(e, !1), 0 === e.strm.avail_out)
        ? yr
        : kr
    );
  }
  function K(e, t) {
    for (var r, a, n, i, s = e.window; ; ) {
      if (e.lookahead <= dr) {
        if ((H(e), e.lookahead <= dr && t === Ct)) return yr;
        if (0 === e.lookahead) break;
      }
      if (
        ((e.match_length = 0),
        e.lookahead >= hr &&
          e.strstart > 0 &&
          ((n = e.strstart - 1),
          (a = s[n]) === s[++n] && a === s[++n] && a === s[++n]))
      ) {
        i = e.strstart + dr;
        do {} while (
          a === s[++n] &&
          a === s[++n] &&
          a === s[++n] &&
          a === s[++n] &&
          a === s[++n] &&
          a === s[++n] &&
          a === s[++n] &&
          a === s[++n] &&
          n < i
        );
        (e.match_length = dr - (i - n)),
          e.match_length > e.lookahead && (e.match_length = e.lookahead);
      }
      if (
        (e.match_length >= hr
          ? ((r = Nt._tr_tally(e, 1, e.match_length - hr)),
            (e.lookahead -= e.match_length),
            (e.strstart += e.match_length),
            (e.match_length = 0))
          : ((r = Nt._tr_tally(e, 0, e.window[e.strstart])),
            e.lookahead--,
            e.strstart++),
        r && (L(e, !1), 0 === e.strm.avail_out))
      )
        return yr;
    }
    return (
      (e.insert = 0),
      t === Pt
        ? (L(e, !0), 0 === e.strm.avail_out ? xr : zr)
        : e.last_lit && (L(e, !1), 0 === e.strm.avail_out)
        ? yr
        : kr
    );
  }
  function X(e, t) {
    for (var r; ; ) {
      if (0 === e.lookahead && (H(e), 0 === e.lookahead)) {
        if (t === Ct) return yr;
        break;
      }
      if (
        ((e.match_length = 0),
        (r = Nt._tr_tally(e, 0, e.window[e.strstart])),
        e.lookahead--,
        e.strstart++,
        r && (L(e, !1), 0 === e.strm.avail_out))
      )
        return yr;
    }
    return (
      (e.insert = 0),
      t === Pt
        ? (L(e, !0), 0 === e.strm.avail_out ? xr : zr)
        : e.last_lit && (L(e, !1), 0 === e.strm.avail_out)
        ? yr
        : kr
    );
  }
  function Y(e, t, r, a, n) {
    (this.good_length = e),
      (this.max_lazy = t),
      (this.nice_length = r),
      (this.max_chain = a),
      (this.func = n);
  }
  function W(e) {
    (e.window_size = 2 * e.w_size),
      D(e.head),
      (e.max_lazy_match = bt[e.level].max_lazy),
      (e.good_match = bt[e.level].good_length),
      (e.nice_match = bt[e.level].nice_length),
      (e.max_chain_length = bt[e.level].max_chain),
      (e.strstart = 0),
      (e.block_start = 0),
      (e.lookahead = 0),
      (e.insert = 0),
      (e.match_length = e.prev_length = hr - 1),
      (e.match_available = 0),
      (e.ins_h = 0);
  }
  function V() {
    (this.strm = null),
      (this.status = 0),
      (this.pending_buf = null),
      (this.pending_buf_size = 0),
      (this.pending_out = 0),
      (this.pending = 0),
      (this.wrap = 0),
      (this.gzhead = null),
      (this.gzindex = 0),
      (this.method = tr),
      (this.last_flush = -1),
      (this.w_size = 0),
      (this.w_bits = 0),
      (this.w_mask = 0),
      (this.window = null),
      (this.window_size = 0),
      (this.prev = null),
      (this.head = null),
      (this.ins_h = 0),
      (this.hash_size = 0),
      (this.hash_bits = 0),
      (this.hash_mask = 0),
      (this.hash_shift = 0),
      (this.block_start = 0),
      (this.match_length = 0),
      (this.prev_match = 0),
      (this.match_available = 0),
      (this.strstart = 0),
      (this.match_start = 0),
      (this.lookahead = 0),
      (this.prev_length = 0),
      (this.max_chain_length = 0),
      (this.max_lazy_match = 0),
      (this.level = 0),
      (this.strategy = 0),
      (this.good_match = 0),
      (this.nice_match = 0),
      (this.dyn_ltree = new Ce.Buf16(2 * lr)),
      (this.dyn_dtree = new Ce.Buf16(2 * (2 * sr + 1))),
      (this.bl_tree = new Ce.Buf16(2 * (2 * or + 1))),
      D(this.dyn_ltree),
      D(this.dyn_dtree),
      D(this.bl_tree),
      (this.l_desc = null),
      (this.d_desc = null),
      (this.bl_desc = null),
      (this.bl_count = new Ce.Buf16(fr + 1)),
      (this.heap = new Ce.Buf16(2 * ir + 1)),
      D(this.heap),
      (this.heap_len = 0),
      (this.heap_max = 0),
      (this.depth = new Ce.Buf16(2 * ir + 1)),
      D(this.depth),
      (this.l_buf = 0),
      (this.lit_bufsize = 0),
      (this.last_lit = 0),
      (this.d_buf = 0),
      (this.opt_len = 0),
      (this.static_len = 0),
      (this.matches = 0),
      (this.insert = 0),
      (this.bi_buf = 0),
      (this.bi_valid = 0);
  }
  function J(e) {
    var t;
    return e && e.state
      ? ((e.total_in = e.total_out = 0),
        (e.data_type = er),
        (t = e.state),
        (t.pending = 0),
        (t.pending_out = 0),
        t.wrap < 0 && (t.wrap = -t.wrap),
        (t.status = t.wrap ? cr : wr),
        (e.adler = 2 === t.wrap ? 0 : 1),
        (t.last_flush = Ct),
        Nt._tr_init(t),
        jt)
      : T(e, Gt);
  }
  function Q(e) {
    var t = J(e);
    return t === jt && W(e.state), t;
  }
  function ee(e, t) {
    return e && e.state
      ? 2 !== e.state.wrap
        ? Gt
        : ((e.state.gzhead = t), jt)
      : Gt;
  }
  function te(e, t, r, a, n, i) {
    if (!e) return Gt;
    var s = 1;
    if (
      (t === Yt && (t = 6),
      a < 0 ? ((s = 0), (a = -a)) : a > 15 && ((s = 2), (a -= 16)),
      n < 1 ||
        n > rr ||
        r !== tr ||
        a < 8 ||
        a > 15 ||
        t < 0 ||
        t > 9 ||
        i < 0 ||
        i > Qt)
    )
      return T(e, Gt);
    8 === a && (a = 9);
    var o = new V();
    return (
      (e.state = o),
      (o.strm = e),
      (o.wrap = s),
      (o.gzhead = null),
      (o.w_bits = a),
      (o.w_size = 1 << o.w_bits),
      (o.w_mask = o.w_size - 1),
      (o.hash_bits = n + 7),
      (o.hash_size = 1 << o.hash_bits),
      (o.hash_mask = o.hash_size - 1),
      (o.hash_shift = ~~((o.hash_bits + hr - 1) / hr)),
      (o.window = new Ce.Buf8(2 * o.w_size)),
      (o.head = new Ce.Buf16(o.hash_size)),
      (o.prev = new Ce.Buf16(o.w_size)),
      (o.lit_bufsize = 1 << (n + 6)),
      (o.pending_buf_size = 4 * o.lit_bufsize),
      (o.pending_buf = new Ce.Buf8(o.pending_buf_size)),
      (o.d_buf = 1 * o.lit_bufsize),
      (o.l_buf = 3 * o.lit_bufsize),
      (o.level = t),
      (o.strategy = i),
      (o.method = r),
      Q(e)
    );
  }
  function re(e, t) {
    return te(e, t, tr, ar, nr, $t);
  }
  function ae(e, t) {
    var r, a, n, i;
    if (!e || !e.state || t > Ht || t < 0) return e ? T(e, Gt) : Gt;
    if (
      ((a = e.state),
      !e.output ||
        (!e.input && 0 !== e.avail_in) ||
        (a.status === mr && t !== Pt))
    )
      return T(e, 0 === e.avail_out ? Xt : Gt);
    if (((a.strm = e), (r = a.last_flush), (a.last_flush = t), a.status === cr))
      if (2 === a.wrap)
        (e.adler = 0),
          C(a, 31),
          C(a, 139),
          C(a, 8),
          a.gzhead
            ? (C(
                a,
                (a.gzhead.text ? 1 : 0) +
                  (a.gzhead.hcrc ? 2 : 0) +
                  (a.gzhead.extra ? 4 : 0) +
                  (a.gzhead.name ? 8 : 0) +
                  (a.gzhead.comment ? 16 : 0)
              ),
              C(a, 255 & a.gzhead.time),
              C(a, (a.gzhead.time >> 8) & 255),
              C(a, (a.gzhead.time >> 16) & 255),
              C(a, (a.gzhead.time >> 24) & 255),
              C(a, 9 === a.level ? 2 : a.strategy >= Vt || a.level < 2 ? 4 : 0),
              C(a, 255 & a.gzhead.os),
              a.gzhead.extra &&
                a.gzhead.extra.length &&
                (C(a, 255 & a.gzhead.extra.length),
                C(a, (a.gzhead.extra.length >> 8) & 255)),
              a.gzhead.hcrc &&
                (e.adler = Ot(e.adler, a.pending_buf, a.pending, 0)),
              (a.gzindex = 0),
              (a.status = pr))
            : (C(a, 0),
              C(a, 0),
              C(a, 0),
              C(a, 0),
              C(a, 0),
              C(a, 9 === a.level ? 2 : a.strategy >= Vt || a.level < 2 ? 4 : 0),
              C(a, Er),
              (a.status = wr));
      else {
        var s = (tr + ((a.w_bits - 8) << 4)) << 8,
          o = -1;
        (o =
          a.strategy >= Vt || a.level < 2
            ? 0
            : a.level < 6
            ? 1
            : 6 === a.level
            ? 2
            : 3),
          (s |= o << 6),
          0 !== a.strstart && (s |= _r),
          (s += 31 - (s % 31)),
          (a.status = wr),
          F(a, s),
          0 !== a.strstart && (F(a, e.adler >>> 16), F(a, 65535 & e.adler)),
          (e.adler = 1);
      }
    if (a.status === pr)
      if (a.gzhead.extra) {
        for (
          n = a.pending;
          a.gzindex < (65535 & a.gzhead.extra.length) &&
          (a.pending !== a.pending_buf_size ||
            (a.gzhead.hcrc &&
              a.pending > n &&
              (e.adler = Ot(e.adler, a.pending_buf, a.pending - n, n)),
            O(e),
            (n = a.pending),
            a.pending !== a.pending_buf_size));

        )
          C(a, 255 & a.gzhead.extra[a.gzindex]), a.gzindex++;
        a.gzhead.hcrc &&
          a.pending > n &&
          (e.adler = Ot(e.adler, a.pending_buf, a.pending - n, n)),
          a.gzindex === a.gzhead.extra.length &&
            ((a.gzindex = 0), (a.status = vr));
      } else a.status = vr;
    if (a.status === vr)
      if (a.gzhead.name) {
        n = a.pending;
        do {
          if (
            a.pending === a.pending_buf_size &&
            (a.gzhead.hcrc &&
              a.pending > n &&
              (e.adler = Ot(e.adler, a.pending_buf, a.pending - n, n)),
            O(e),
            (n = a.pending),
            a.pending === a.pending_buf_size)
          ) {
            i = 1;
            break;
          }
          (i =
            a.gzindex < a.gzhead.name.length
              ? 255 & a.gzhead.name.charCodeAt(a.gzindex++)
              : 0),
            C(a, i);
        } while (0 !== i);
        a.gzhead.hcrc &&
          a.pending > n &&
          (e.adler = Ot(e.adler, a.pending_buf, a.pending - n, n)),
          0 === i && ((a.gzindex = 0), (a.status = gr));
      } else a.status = gr;
    if (a.status === gr)
      if (a.gzhead.comment) {
        n = a.pending;
        do {
          if (
            a.pending === a.pending_buf_size &&
            (a.gzhead.hcrc &&
              a.pending > n &&
              (e.adler = Ot(e.adler, a.pending_buf, a.pending - n, n)),
            O(e),
            (n = a.pending),
            a.pending === a.pending_buf_size)
          ) {
            i = 1;
            break;
          }
          (i =
            a.gzindex < a.gzhead.comment.length
              ? 255 & a.gzhead.comment.charCodeAt(a.gzindex++)
              : 0),
            C(a, i);
        } while (0 !== i);
        a.gzhead.hcrc &&
          a.pending > n &&
          (e.adler = Ot(e.adler, a.pending_buf, a.pending - n, n)),
          0 === i && (a.status = br);
      } else a.status = br;
    if (
      (a.status === br &&
        (a.gzhead.hcrc
          ? (a.pending + 2 > a.pending_buf_size && O(e),
            a.pending + 2 <= a.pending_buf_size &&
              (C(a, 255 & e.adler),
              C(a, (e.adler >> 8) & 255),
              (e.adler = 0),
              (a.status = wr)))
          : (a.status = wr)),
      0 !== a.pending)
    ) {
      if ((O(e), 0 === e.avail_out)) return (a.last_flush = -1), jt;
    } else if (0 === e.avail_in && N(t) <= N(r) && t !== Pt) return T(e, Xt);
    if (a.status === mr && 0 !== e.avail_in) return T(e, Xt);
    if (
      0 !== e.avail_in ||
      0 !== a.lookahead ||
      (t !== Ct && a.status !== mr)
    ) {
      var l =
        a.strategy === Vt
          ? X(a, t)
          : a.strategy === Jt
          ? K(a, t)
          : bt[a.level].func(a, t);
      if (((l !== xr && l !== zr) || (a.status = mr), l === yr || l === xr))
        return 0 === e.avail_out && (a.last_flush = -1), jt;
      if (
        l === kr &&
        (t === Ft
          ? Nt._tr_align(a)
          : t !== Ht &&
            (Nt._tr_stored_block(a, 0, 0, !1),
            t === Mt &&
              (D(a.head),
              0 === a.lookahead &&
                ((a.strstart = 0), (a.block_start = 0), (a.insert = 0)))),
        O(e),
        0 === e.avail_out)
      )
        return (a.last_flush = -1), jt;
    }
    return t !== Pt
      ? jt
      : a.wrap <= 0
      ? qt
      : (2 === a.wrap
          ? (C(a, 255 & e.adler),
            C(a, (e.adler >> 8) & 255),
            C(a, (e.adler >> 16) & 255),
            C(a, (e.adler >> 24) & 255),
            C(a, 255 & e.total_in),
            C(a, (e.total_in >> 8) & 255),
            C(a, (e.total_in >> 16) & 255),
            C(a, (e.total_in >> 24) & 255))
          : (F(a, e.adler >>> 16), F(a, 65535 & e.adler)),
        O(e),
        a.wrap > 0 && (a.wrap = -a.wrap),
        0 !== a.pending ? jt : qt);
  }
  function ne(e) {
    var t;
    return e && e.state
      ? (t = e.state.status) !== cr &&
        t !== pr &&
        t !== vr &&
        t !== gr &&
        t !== br &&
        t !== wr &&
        t !== mr
        ? T(e, Gt)
        : ((e.state = null), t === wr ? T(e, Kt) : jt)
      : Gt;
  }
  function ie(e, t) {
    var r,
      a,
      n,
      i,
      s,
      o,
      l,
      f,
      h = t.length;
    if (!e || !e.state) return Gt;
    if (
      ((r = e.state),
      2 === (i = r.wrap) || (1 === i && r.status !== cr) || r.lookahead)
    )
      return Gt;
    for (
      1 === i && (e.adler = Dt(e.adler, t, h, 0)),
        r.wrap = 0,
        h >= r.w_size &&
          (0 === i &&
            (D(r.head), (r.strstart = 0), (r.block_start = 0), (r.insert = 0)),
          (f = new Ce.Buf8(r.w_size)),
          Ce.arraySet(f, t, h - r.w_size, r.w_size, 0),
          (t = f),
          (h = r.w_size)),
        s = e.avail_in,
        o = e.next_in,
        l = e.input,
        e.avail_in = h,
        e.next_in = 0,
        e.input = t,
        H(r);
      r.lookahead >= hr;

    ) {
      (a = r.strstart), (n = r.lookahead - (hr - 1));
      do {
        (r.ins_h =
          ((r.ins_h << r.hash_shift) ^ r.window[a + hr - 1]) & r.hash_mask),
          (r.prev[a & r.w_mask] = r.head[r.ins_h]),
          (r.head[r.ins_h] = a),
          a++;
      } while (--n);
      (r.strstart = a), (r.lookahead = hr - 1), H(r);
    }
    return (
      (r.strstart += r.lookahead),
      (r.block_start = r.strstart),
      (r.insert = r.lookahead),
      (r.lookahead = 0),
      (r.match_length = r.prev_length = hr - 1),
      (r.match_available = 0),
      (e.next_in = o),
      (e.input = l),
      (e.avail_in = s),
      (r.wrap = i),
      jt
    );
  }
  function se(e, t) {
    if (t < 65534 && ((e.subarray && Cr) || (!e.subarray && Lr)))
      return String.fromCharCode.apply(null, Ce.shrinkBuf(e, t));
    for (var r = "", a = 0; a < t; a++) r += String.fromCharCode(e[a]);
    return r;
  }
  function oe() {
    (this.input = null),
      (this.next_in = 0),
      (this.avail_in = 0),
      (this.total_in = 0),
      (this.output = null),
      (this.next_out = 0),
      (this.avail_out = 0),
      (this.total_out = 0),
      (this.msg = ""),
      (this.state = null),
      (this.data_type = 2),
      (this.adler = 0);
  }
  function le(e) {
    if (!(this instanceof le)) return new le(e);
    this.options = Ce.assign(
      {
        level: ta,
        method: aa,
        chunkSize: 16384,
        windowBits: 15,
        memLevel: 8,
        strategy: ra,
        to: "",
      },
      e || {}
    );
    var t = this.options;
    t.raw && t.windowBits > 0
      ? (t.windowBits = -t.windowBits)
      : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16),
      (this.err = 0),
      (this.msg = ""),
      (this.ended = !1),
      (this.chunks = []),
      (this.strm = new Qr()),
      (this.strm.avail_out = 0);
    var r = Vr.deflateInit2(
      this.strm,
      t.level,
      t.method,
      t.windowBits,
      t.memLevel,
      t.strategy
    );
    if (r !== ea) throw new Error(Lt[r]);
    if ((t.header && Vr.deflateSetHeader(this.strm, t.header), t.dictionary)) {
      var a;
      if (
        ((a =
          "string" == typeof t.dictionary
            ? Jr.string2buf(t.dictionary)
            : "[object ArrayBuffer]" === $r.call(t.dictionary)
            ? new Uint8Array(t.dictionary)
            : t.dictionary),
        (r = Vr.deflateSetDictionary(this.strm, a)) !== ea)
      )
        throw new Error(Lt[r]);
      this._dict_set = !0;
    }
  }
  function fe(e, t) {
    var r = new le(t);
    if ((r.push(e, !0), r.err)) throw r.msg || Lt[r.err];
    return r.result;
  }
  function he(e, t) {
    return (t = t || {}), (t.raw = !0), fe(e, t);
  }
  function de(e, t) {
    return (t = t || {}), (t.gzip = !0), fe(e, t);
  }
  function ue(e) {
    return (
      ((e >>> 24) & 255) +
      ((e >>> 8) & 65280) +
      ((65280 & e) << 8) +
      ((255 & e) << 24)
    );
  }
  function _e() {
    (this.mode = 0),
      (this.last = !1),
      (this.wrap = 0),
      (this.havedict = !1),
      (this.flags = 0),
      (this.dmax = 0),
      (this.check = 0),
      (this.total = 0),
      (this.head = null),
      (this.wbits = 0),
      (this.wsize = 0),
      (this.whave = 0),
      (this.wnext = 0),
      (this.window = null),
      (this.hold = 0),
      (this.bits = 0),
      (this.length = 0),
      (this.offset = 0),
      (this.extra = 0),
      (this.lencode = null),
      (this.distcode = null),
      (this.lenbits = 0),
      (this.distbits = 0),
      (this.ncode = 0),
      (this.nlen = 0),
      (this.ndist = 0),
      (this.have = 0),
      (this.next = null),
      (this.lens = new Ce.Buf16(320)),
      (this.work = new Ce.Buf16(288)),
      (this.lendyn = null),
      (this.distdyn = null),
      (this.sane = 0),
      (this.back = 0),
      (this.was = 0);
  }
  function ce(e) {
    var t;
    return e && e.state
      ? ((t = e.state),
        (e.total_in = e.total_out = t.total = 0),
        (e.msg = ""),
        t.wrap && (e.adler = 1 & t.wrap),
        (t.mode = Oa),
        (t.last = 0),
        (t.havedict = 0),
        (t.dmax = 32768),
        (t.head = null),
        (t.hold = 0),
        (t.bits = 0),
        (t.lencode = t.lendyn = new Ce.Buf32(pn)),
        (t.distcode = t.distdyn = new Ce.Buf32(vn)),
        (t.sane = 1),
        (t.back = -1),
        Ia)
      : Za;
  }
  function pe(e) {
    var t;
    return e && e.state
      ? ((t = e.state), (t.wsize = 0), (t.whave = 0), (t.wnext = 0), ce(e))
      : Za;
  }
  function ve(e, t) {
    var r, a;
    return e && e.state
      ? ((a = e.state),
        t < 0 ? ((r = 0), (t = -t)) : ((r = 1 + (t >> 4)), t < 48 && (t &= 15)),
        t && (t < 8 || t > 15)
          ? Za
          : (null !== a.window && a.wbits !== t && (a.window = null),
            (a.wrap = r),
            (a.wbits = t),
            pe(e)))
      : Za;
  }
  function ge(e, t) {
    var r, a;
    return e
      ? ((a = new _e()),
        (e.state = a),
        (a.window = null),
        (r = ve(e, t)),
        r !== Ia && (e.state = null),
        r)
      : Za;
  }
  function be(e) {
    return ge(e, gn);
  }
  function we(e) {
    if (bn) {
      var t;
      for (na = new Ce.Buf32(512), ia = new Ce.Buf32(32), t = 0; t < 144; )
        e.lens[t++] = 8;
      for (; t < 256; ) e.lens[t++] = 9;
      for (; t < 280; ) e.lens[t++] = 7;
      for (; t < 288; ) e.lens[t++] = 8;
      for (ya(xa, e.lens, 0, 288, na, 0, e.work, { bits: 9 }), t = 0; t < 32; )
        e.lens[t++] = 5;
      ya(za, e.lens, 0, 32, ia, 0, e.work, { bits: 5 }), (bn = !1);
    }
    (e.lencode = na), (e.lenbits = 9), (e.distcode = ia), (e.distbits = 5);
  }
  function me(e, t, r, a) {
    var n,
      i = e.state;
    return (
      null === i.window &&
        ((i.wsize = 1 << i.wbits),
        (i.wnext = 0),
        (i.whave = 0),
        (i.window = new Ce.Buf8(i.wsize))),
      a >= i.wsize
        ? (Ce.arraySet(i.window, t, r - i.wsize, i.wsize, 0),
          (i.wnext = 0),
          (i.whave = i.wsize))
        : ((n = i.wsize - i.wnext),
          n > a && (n = a),
          Ce.arraySet(i.window, t, r - a, n, i.wnext),
          (a -= n),
          a
            ? (Ce.arraySet(i.window, t, r - a, a, 0),
              (i.wnext = a),
              (i.whave = i.wsize))
            : ((i.wnext += n),
              i.wnext === i.wsize && (i.wnext = 0),
              i.whave < i.wsize && (i.whave += n))),
      0
    );
  }
  function ye(e, t) {
    var r,
      a,
      n,
      i,
      s,
      o,
      l,
      f,
      h,
      d,
      u,
      _,
      c,
      p,
      v,
      g,
      b,
      w,
      m,
      y,
      k,
      x,
      z,
      E,
      A = 0,
      S = new Ce.Buf8(4),
      I = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    if (!e || !e.state || !e.output || (!e.input && 0 !== e.avail_in))
      return Za;
    (r = e.state),
      r.mode === Xa && (r.mode = Ya),
      (s = e.next_out),
      (n = e.output),
      (l = e.avail_out),
      (i = e.next_in),
      (a = e.input),
      (o = e.avail_in),
      (f = r.hold),
      (h = r.bits),
      (d = o),
      (u = l),
      (x = Ia);
    e: for (;;)
      switch (r.mode) {
        case Oa:
          if (0 === r.wrap) {
            r.mode = Ya;
            break;
          }
          for (; h < 16; ) {
            if (0 === o) break e;
            o--, (f += a[i++] << h), (h += 8);
          }
          if (2 & r.wrap && 35615 === f) {
            (r.check = 0),
              (S[0] = 255 & f),
              (S[1] = (f >>> 8) & 255),
              (r.check = Ot(r.check, S, 2, 0)),
              (f = 0),
              (h = 0),
              (r.mode = La);
            break;
          }
          if (
            ((r.flags = 0),
            r.head && (r.head.done = !1),
            !(1 & r.wrap) || (((255 & f) << 8) + (f >> 8)) % 31)
          ) {
            (e.msg = "incorrect header check"), (r.mode = un);
            break;
          }
          if ((15 & f) !== Da) {
            (e.msg = "unknown compression method"), (r.mode = un);
            break;
          }
          if (((f >>>= 4), (h -= 4), (k = 8 + (15 & f)), 0 === r.wbits))
            r.wbits = k;
          else if (k > r.wbits) {
            (e.msg = "invalid window size"), (r.mode = un);
            break;
          }
          (r.dmax = 1 << k),
            (e.adler = r.check = 1),
            (r.mode = 512 & f ? Ga : Xa),
            (f = 0),
            (h = 0);
          break;
        case La:
          for (; h < 16; ) {
            if (0 === o) break e;
            o--, (f += a[i++] << h), (h += 8);
          }
          if (((r.flags = f), (255 & r.flags) !== Da)) {
            (e.msg = "unknown compression method"), (r.mode = un);
            break;
          }
          if (57344 & r.flags) {
            (e.msg = "unknown header flags set"), (r.mode = un);
            break;
          }
          r.head && (r.head.text = (f >> 8) & 1),
            512 & r.flags &&
              ((S[0] = 255 & f),
              (S[1] = (f >>> 8) & 255),
              (r.check = Ot(r.check, S, 2, 0))),
            (f = 0),
            (h = 0),
            (r.mode = Ca);
        case Ca:
          for (; h < 32; ) {
            if (0 === o) break e;
            o--, (f += a[i++] << h), (h += 8);
          }
          r.head && (r.head.time = f),
            512 & r.flags &&
              ((S[0] = 255 & f),
              (S[1] = (f >>> 8) & 255),
              (S[2] = (f >>> 16) & 255),
              (S[3] = (f >>> 24) & 255),
              (r.check = Ot(r.check, S, 4, 0))),
            (f = 0),
            (h = 0),
            (r.mode = Fa);
        case Fa:
          for (; h < 16; ) {
            if (0 === o) break e;
            o--, (f += a[i++] << h), (h += 8);
          }
          r.head && ((r.head.xflags = 255 & f), (r.head.os = f >> 8)),
            512 & r.flags &&
              ((S[0] = 255 & f),
              (S[1] = (f >>> 8) & 255),
              (r.check = Ot(r.check, S, 2, 0))),
            (f = 0),
            (h = 0),
            (r.mode = Ma);
        case Ma:
          if (1024 & r.flags) {
            for (; h < 16; ) {
              if (0 === o) break e;
              o--, (f += a[i++] << h), (h += 8);
            }
            (r.length = f),
              r.head && (r.head.extra_len = f),
              512 & r.flags &&
                ((S[0] = 255 & f),
                (S[1] = (f >>> 8) & 255),
                (r.check = Ot(r.check, S, 2, 0))),
              (f = 0),
              (h = 0);
          } else r.head && (r.head.extra = null);
          r.mode = Pa;
        case Pa:
          if (
            1024 & r.flags &&
            ((_ = r.length),
            _ > o && (_ = o),
            _ &&
              (r.head &&
                ((k = r.head.extra_len - r.length),
                r.head.extra || (r.head.extra = new Array(r.head.extra_len)),
                Ce.arraySet(r.head.extra, a, i, _, k)),
              512 & r.flags && (r.check = Ot(r.check, a, _, i)),
              (o -= _),
              (i += _),
              (r.length -= _)),
            r.length)
          )
            break e;
          (r.length = 0), (r.mode = Ha);
        case Ha:
          if (2048 & r.flags) {
            if (0 === o) break e;
            _ = 0;
            do {
              (k = a[i + _++]),
                r.head &&
                  k &&
                  r.length < 65536 &&
                  (r.head.name += String.fromCharCode(k));
            } while (k && _ < o);
            if (
              (512 & r.flags && (r.check = Ot(r.check, a, _, i)),
              (o -= _),
              (i += _),
              k)
            )
              break e;
          } else r.head && (r.head.name = null);
          (r.length = 0), (r.mode = ja);
        case ja:
          if (4096 & r.flags) {
            if (0 === o) break e;
            _ = 0;
            do {
              (k = a[i + _++]),
                r.head &&
                  k &&
                  r.length < 65536 &&
                  (r.head.comment += String.fromCharCode(k));
            } while (k && _ < o);
            if (
              (512 & r.flags && (r.check = Ot(r.check, a, _, i)),
              (o -= _),
              (i += _),
              k)
            )
              break e;
          } else r.head && (r.head.comment = null);
          r.mode = qa;
        case qa:
          if (512 & r.flags) {
            for (; h < 16; ) {
              if (0 === o) break e;
              o--, (f += a[i++] << h), (h += 8);
            }
            if (f !== (65535 & r.check)) {
              (e.msg = "header crc mismatch"), (r.mode = un);
              break;
            }
            (f = 0), (h = 0);
          }
          r.head && ((r.head.hcrc = (r.flags >> 9) & 1), (r.head.done = !0)),
            (e.adler = r.check = 0),
            (r.mode = Xa);
          break;
        case Ga:
          for (; h < 32; ) {
            if (0 === o) break e;
            o--, (f += a[i++] << h), (h += 8);
          }
          (e.adler = r.check = ue(f)), (f = 0), (h = 0), (r.mode = Ka);
        case Ka:
          if (0 === r.havedict)
            return (
              (e.next_out = s),
              (e.avail_out = l),
              (e.next_in = i),
              (e.avail_in = o),
              (r.hold = f),
              (r.bits = h),
              Ba
            );
          (e.adler = r.check = 1), (r.mode = Xa);
        case Xa:
          if (t === Aa || t === Sa) break e;
        case Ya:
          if (r.last) {
            (f >>>= 7 & h), (h -= 7 & h), (r.mode = fn);
            break;
          }
          for (; h < 3; ) {
            if (0 === o) break e;
            o--, (f += a[i++] << h), (h += 8);
          }
          switch (((r.last = 1 & f), (f >>>= 1), (h -= 1), 3 & f)) {
            case 0:
              r.mode = Wa;
              break;
            case 1:
              if ((we(r), (r.mode = tn), t === Sa)) {
                (f >>>= 2), (h -= 2);
                break e;
              }
              break;
            case 2:
              r.mode = Qa;
              break;
            case 3:
              (e.msg = "invalid block type"), (r.mode = un);
          }
          (f >>>= 2), (h -= 2);
          break;
        case Wa:
          for (f >>>= 7 & h, h -= 7 & h; h < 32; ) {
            if (0 === o) break e;
            o--, (f += a[i++] << h), (h += 8);
          }
          if ((65535 & f) != ((f >>> 16) ^ 65535)) {
            (e.msg = "invalid stored block lengths"), (r.mode = un);
            break;
          }
          if (
            ((r.length = 65535 & f), (f = 0), (h = 0), (r.mode = Va), t === Sa)
          )
            break e;
        case Va:
          r.mode = Ja;
        case Ja:
          if ((_ = r.length)) {
            if ((_ > o && (_ = o), _ > l && (_ = l), 0 === _)) break e;
            Ce.arraySet(n, a, i, _, s),
              (o -= _),
              (i += _),
              (l -= _),
              (s += _),
              (r.length -= _);
            break;
          }
          r.mode = Xa;
          break;
        case Qa:
          for (; h < 14; ) {
            if (0 === o) break e;
            o--, (f += a[i++] << h), (h += 8);
          }
          if (
            ((r.nlen = 257 + (31 & f)),
            (f >>>= 5),
            (h -= 5),
            (r.ndist = 1 + (31 & f)),
            (f >>>= 5),
            (h -= 5),
            (r.ncode = 4 + (15 & f)),
            (f >>>= 4),
            (h -= 4),
            r.nlen > 286 || r.ndist > 30)
          ) {
            (e.msg = "too many length or distance symbols"), (r.mode = un);
            break;
          }
          (r.have = 0), (r.mode = $a);
        case $a:
          for (; r.have < r.ncode; ) {
            for (; h < 3; ) {
              if (0 === o) break e;
              o--, (f += a[i++] << h), (h += 8);
            }
            (r.lens[I[r.have++]] = 7 & f), (f >>>= 3), (h -= 3);
          }
          for (; r.have < 19; ) r.lens[I[r.have++]] = 0;
          if (
            ((r.lencode = r.lendyn),
            (r.lenbits = 7),
            (z = { bits: r.lenbits }),
            (x = ya(ka, r.lens, 0, 19, r.lencode, 0, r.work, z)),
            (r.lenbits = z.bits),
            x)
          ) {
            (e.msg = "invalid code lengths set"), (r.mode = un);
            break;
          }
          (r.have = 0), (r.mode = en);
        case en:
          for (; r.have < r.nlen + r.ndist; ) {
            for (
              ;
              (A = r.lencode[f & ((1 << r.lenbits) - 1)]),
                (v = A >>> 24),
                (g = (A >>> 16) & 255),
                (b = 65535 & A),
                !(v <= h);

            ) {
              if (0 === o) break e;
              o--, (f += a[i++] << h), (h += 8);
            }
            if (b < 16) (f >>>= v), (h -= v), (r.lens[r.have++] = b);
            else {
              if (16 === b) {
                for (E = v + 2; h < E; ) {
                  if (0 === o) break e;
                  o--, (f += a[i++] << h), (h += 8);
                }
                if (((f >>>= v), (h -= v), 0 === r.have)) {
                  (e.msg = "invalid bit length repeat"), (r.mode = un);
                  break;
                }
                (k = r.lens[r.have - 1]),
                  (_ = 3 + (3 & f)),
                  (f >>>= 2),
                  (h -= 2);
              } else if (17 === b) {
                for (E = v + 3; h < E; ) {
                  if (0 === o) break e;
                  o--, (f += a[i++] << h), (h += 8);
                }
                (f >>>= v),
                  (h -= v),
                  (k = 0),
                  (_ = 3 + (7 & f)),
                  (f >>>= 3),
                  (h -= 3);
              } else {
                for (E = v + 7; h < E; ) {
                  if (0 === o) break e;
                  o--, (f += a[i++] << h), (h += 8);
                }
                (f >>>= v),
                  (h -= v),
                  (k = 0),
                  (_ = 11 + (127 & f)),
                  (f >>>= 7),
                  (h -= 7);
              }
              if (r.have + _ > r.nlen + r.ndist) {
                (e.msg = "invalid bit length repeat"), (r.mode = un);
                break;
              }
              for (; _--; ) r.lens[r.have++] = k;
            }
          }
          if (r.mode === un) break;
          if (0 === r.lens[256]) {
            (e.msg = "invalid code -- missing end-of-block"), (r.mode = un);
            break;
          }
          if (
            ((r.lenbits = 9),
            (z = { bits: r.lenbits }),
            (x = ya(xa, r.lens, 0, r.nlen, r.lencode, 0, r.work, z)),
            (r.lenbits = z.bits),
            x)
          ) {
            (e.msg = "invalid literal/lengths set"), (r.mode = un);
            break;
          }
          if (
            ((r.distbits = 6),
            (r.distcode = r.distdyn),
            (z = { bits: r.distbits }),
            (x = ya(za, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, z)),
            (r.distbits = z.bits),
            x)
          ) {
            (e.msg = "invalid distances set"), (r.mode = un);
            break;
          }
          if (((r.mode = tn), t === Sa)) break e;
        case tn:
          r.mode = rn;
        case rn:
          if (o >= 6 && l >= 258) {
            (e.next_out = s),
              (e.avail_out = l),
              (e.next_in = i),
              (e.avail_in = o),
              (r.hold = f),
              (r.bits = h),
              ma(e, u),
              (s = e.next_out),
              (n = e.output),
              (l = e.avail_out),
              (i = e.next_in),
              (a = e.input),
              (o = e.avail_in),
              (f = r.hold),
              (h = r.bits),
              r.mode === Xa && (r.back = -1);
            break;
          }
          for (
            r.back = 0;
            (A = r.lencode[f & ((1 << r.lenbits) - 1)]),
              (v = A >>> 24),
              (g = (A >>> 16) & 255),
              (b = 65535 & A),
              !(v <= h);

          ) {
            if (0 === o) break e;
            o--, (f += a[i++] << h), (h += 8);
          }
          if (g && 0 == (240 & g)) {
            for (
              w = v, m = g, y = b;
              (A = r.lencode[y + ((f & ((1 << (w + m)) - 1)) >> w)]),
                (v = A >>> 24),
                (g = (A >>> 16) & 255),
                (b = 65535 & A),
                !(w + v <= h);

            ) {
              if (0 === o) break e;
              o--, (f += a[i++] << h), (h += 8);
            }
            (f >>>= w), (h -= w), (r.back += w);
          }
          if (((f >>>= v), (h -= v), (r.back += v), (r.length = b), 0 === g)) {
            r.mode = ln;
            break;
          }
          if (32 & g) {
            (r.back = -1), (r.mode = Xa);
            break;
          }
          if (64 & g) {
            (e.msg = "invalid literal/length code"), (r.mode = un);
            break;
          }
          (r.extra = 15 & g), (r.mode = an);
        case an:
          if (r.extra) {
            for (E = r.extra; h < E; ) {
              if (0 === o) break e;
              o--, (f += a[i++] << h), (h += 8);
            }
            (r.length += f & ((1 << r.extra) - 1)),
              (f >>>= r.extra),
              (h -= r.extra),
              (r.back += r.extra);
          }
          (r.was = r.length), (r.mode = nn);
        case nn:
          for (
            ;
            (A = r.distcode[f & ((1 << r.distbits) - 1)]),
              (v = A >>> 24),
              (g = (A >>> 16) & 255),
              (b = 65535 & A),
              !(v <= h);

          ) {
            if (0 === o) break e;
            o--, (f += a[i++] << h), (h += 8);
          }
          if (0 == (240 & g)) {
            for (
              w = v, m = g, y = b;
              (A = r.distcode[y + ((f & ((1 << (w + m)) - 1)) >> w)]),
                (v = A >>> 24),
                (g = (A >>> 16) & 255),
                (b = 65535 & A),
                !(w + v <= h);

            ) {
              if (0 === o) break e;
              o--, (f += a[i++] << h), (h += 8);
            }
            (f >>>= w), (h -= w), (r.back += w);
          }
          if (((f >>>= v), (h -= v), (r.back += v), 64 & g)) {
            (e.msg = "invalid distance code"), (r.mode = un);
            break;
          }
          (r.offset = b), (r.extra = 15 & g), (r.mode = sn);
        case sn:
          if (r.extra) {
            for (E = r.extra; h < E; ) {
              if (0 === o) break e;
              o--, (f += a[i++] << h), (h += 8);
            }
            (r.offset += f & ((1 << r.extra) - 1)),
              (f >>>= r.extra),
              (h -= r.extra),
              (r.back += r.extra);
          }
          if (r.offset > r.dmax) {
            (e.msg = "invalid distance too far back"), (r.mode = un);
            break;
          }
          r.mode = on;
        case on:
          if (0 === l) break e;
          if (((_ = u - l), r.offset > _)) {
            if ((_ = r.offset - _) > r.whave && r.sane) {
              (e.msg = "invalid distance too far back"), (r.mode = un);
              break;
            }
            _ > r.wnext
              ? ((_ -= r.wnext), (c = r.wsize - _))
              : (c = r.wnext - _),
              _ > r.length && (_ = r.length),
              (p = r.window);
          } else (p = n), (c = s - r.offset), (_ = r.length);
          _ > l && (_ = l), (l -= _), (r.length -= _);
          do {
            n[s++] = p[c++];
          } while (--_);
          0 === r.length && (r.mode = rn);
          break;
        case ln:
          if (0 === l) break e;
          (n[s++] = r.length), l--, (r.mode = rn);
          break;
        case fn:
          if (r.wrap) {
            for (; h < 32; ) {
              if (0 === o) break e;
              o--, (f |= a[i++] << h), (h += 8);
            }
            if (
              ((u -= l),
              (e.total_out += u),
              (r.total += u),
              u &&
                (e.adler = r.check =
                  r.flags
                    ? Ot(r.check, n, u, s - u)
                    : Dt(r.check, n, u, s - u)),
              (u = l),
              (r.flags ? f : ue(f)) !== r.check)
            ) {
              (e.msg = "incorrect data check"), (r.mode = un);
              break;
            }
            (f = 0), (h = 0);
          }
          r.mode = hn;
        case hn:
          if (r.wrap && r.flags) {
            for (; h < 32; ) {
              if (0 === o) break e;
              o--, (f += a[i++] << h), (h += 8);
            }
            if (f !== (4294967295 & r.total)) {
              (e.msg = "incorrect length check"), (r.mode = un);
              break;
            }
            (f = 0), (h = 0);
          }
          r.mode = dn;
        case dn:
          x = Ra;
          break e;
        case un:
          x = Ua;
          break e;
        case _n:
          return Ta;
        case cn:
        default:
          return Za;
      }
    return (
      (e.next_out = s),
      (e.avail_out = l),
      (e.next_in = i),
      (e.avail_in = o),
      (r.hold = f),
      (r.bits = h),
      (r.wsize ||
        (u !== e.avail_out && r.mode < un && (r.mode < fn || t !== Ea))) &&
        me(e, e.output, e.next_out, u - e.avail_out),
      (d -= e.avail_in),
      (u -= e.avail_out),
      (e.total_in += d),
      (e.total_out += u),
      (r.total += u),
      r.wrap &&
        u &&
        (e.adler = r.check =
          r.flags
            ? Ot(r.check, n, u, e.next_out - u)
            : Dt(r.check, n, u, e.next_out - u)),
      (e.data_type =
        r.bits +
        (r.last ? 64 : 0) +
        (r.mode === Xa ? 128 : 0) +
        (r.mode === tn || r.mode === Va ? 256 : 0)),
      ((0 === d && 0 === u) || t === Ea) && x === Ia && (x = Na),
      x
    );
  }
  function ke(e) {
    if (!e || !e.state) return Za;
    var t = e.state;
    return t.window && (t.window = null), (e.state = null), Ia;
  }
  function xe(e, t) {
    var r;
    return e && e.state
      ? ((r = e.state),
        0 == (2 & r.wrap) ? Za : ((r.head = t), (t.done = !1), Ia))
      : Za;
  }
  function ze(e, t) {
    var r,
      a,
      n = t.length;
    return e && e.state
      ? ((r = e.state),
        0 !== r.wrap && r.mode !== Ka
          ? Za
          : r.mode === Ka && ((a = 1), (a = Dt(a, t, n, 0)) !== r.check)
          ? Ua
          : me(e, t, n, n)
          ? ((r.mode = _n), Ta)
          : ((r.havedict = 1), Ia))
      : Za;
  }
  function Ee() {
    (this.text = 0),
      (this.time = 0),
      (this.xflags = 0),
      (this.os = 0),
      (this.extra = null),
      (this.extra_len = 0),
      (this.name = ""),
      (this.comment = ""),
      (this.hcrc = 0),
      (this.done = !1);
  }
  function Ae(e) {
    if (!(this instanceof Ae)) return new Ae(e);
    this.options = Ce.assign(
      { chunkSize: 16384, windowBits: 0, to: "" },
      e || {}
    );
    var t = this.options;
    t.raw &&
      t.windowBits >= 0 &&
      t.windowBits < 16 &&
      ((t.windowBits = -t.windowBits),
      0 === t.windowBits && (t.windowBits = -15)),
      !(t.windowBits >= 0 && t.windowBits < 16) ||
        (e && e.windowBits) ||
        (t.windowBits += 32),
      t.windowBits > 15 &&
        t.windowBits < 48 &&
        0 == (15 & t.windowBits) &&
        (t.windowBits |= 15),
      (this.err = 0),
      (this.msg = ""),
      (this.ended = !1),
      (this.chunks = []),
      (this.strm = new Qr()),
      (this.strm.avail_out = 0);
    var r = li.inflateInit2(this.strm, t.windowBits);
    if (r !== fi.Z_OK) throw new Error(Lt[r]);
    if (
      ((this.header = new hi()),
      li.inflateGetHeader(this.strm, this.header),
      t.dictionary &&
        ("string" == typeof t.dictionary
          ? (t.dictionary = Jr.string2buf(t.dictionary))
          : "[object ArrayBuffer]" === di.call(t.dictionary) &&
            (t.dictionary = new Uint8Array(t.dictionary)),
        t.raw &&
          (r = li.inflateSetDictionary(this.strm, t.dictionary)) !== fi.Z_OK))
    )
      throw new Error(Lt[r]);
  }
  function Se(e, t) {
    var r = new Ae(t);
    if ((r.push(e, !0), r.err)) throw r.msg || Lt[r.err];
    return r.result;
  }
  function Ie(e, t) {
    return (t = t || {}), (t.raw = !0), Se(e, t);
  }
  var Re = function (e) {
      var t = e.split(".");
      return t[t.length - 1];
    },
    Be = (function (e, t) {
      return (t = { exports: {} }), e(t, t.exports), t.exports;
    })(function (e, exports) {
      function t(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }
      var r =
        "undefined" != typeof Uint8Array &&
        "undefined" != typeof Uint16Array &&
        "undefined" != typeof Int32Array;
      (exports.assign = function (e) {
        for (var r = Array.prototype.slice.call(arguments, 1); r.length; ) {
          var a = r.shift();
          if (a) {
            if ("object" != typeof a)
              throw new TypeError(a + "must be non-object");
            for (var n in a) t(a, n) && (e[n] = a[n]);
          }
        }
        return e;
      }),
        (exports.shrinkBuf = function (e, t) {
          return e.length === t
            ? e
            : e.subarray
            ? e.subarray(0, t)
            : ((e.length = t), e);
        });
      var a = {
          arraySet: function (e, t, r, a, n) {
            if (t.subarray && e.subarray)
              return void e.set(t.subarray(r, r + a), n);
            for (var i = 0; i < a; i++) e[n + i] = t[r + i];
          },
          flattenChunks: function (e) {
            var t, r, a, n, i, s;
            for (a = 0, t = 0, r = e.length; t < r; t++) a += e[t].length;
            for (s = new Uint8Array(a), n = 0, t = 0, r = e.length; t < r; t++)
              (i = e[t]), s.set(i, n), (n += i.length);
            return s;
          },
        },
        n = {
          arraySet: function (e, t, r, a, n) {
            for (var i = 0; i < a; i++) e[n + i] = t[r + i];
          },
          flattenChunks: function (e) {
            return [].concat.apply([], e);
          },
        };
      (exports.setTyped = function (e) {
        e
          ? ((exports.Buf8 = Uint8Array),
            (exports.Buf16 = Uint16Array),
            (exports.Buf32 = Int32Array),
            exports.assign(exports, a))
          : ((exports.Buf8 = Array),
            (exports.Buf16 = Array),
            (exports.Buf32 = Array),
            exports.assign(exports, n));
      }),
        exports.setTyped(r);
    }),
    Ze = Be.assign,
    Ue = Be.shrinkBuf,
    Te = Be.setTyped,
    Ne = Be.Buf8,
    De = Be.Buf16,
    Oe = Be.Buf32,
    Le = Object.freeze({
      default: Be,
      __moduleExports: Be,
      assign: Ze,
      shrinkBuf: Ue,
      setTyped: Te,
      Buf8: Ne,
      Buf16: De,
      Buf32: Oe,
    }),
    Ce = (Le && Be) || Le,
    Fe = 4,
    Me = 0,
    Pe = 1,
    He = 2,
    je = 0,
    qe = 1,
    Ge = 2,
    Ke = 29,
    Xe = 256,
    Ye = Xe + 1 + Ke,
    We = 30,
    Ve = 19,
    Je = 2 * Ye + 1,
    Qe = 15,
    $e = 16,
    et = 7,
    tt = 256,
    rt = 16,
    at = 17,
    nt = 18,
    it = [
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
      5, 5, 5, 0,
    ],
    st = [
      0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
      11, 11, 12, 12, 13, 13,
    ],
    ot = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
    lt = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
    ft = new Array(2 * (Ye + 2));
  r(ft);
  var ht = new Array(2 * We);
  r(ht);
  var dt = new Array(512);
  r(dt);
  var ut = new Array(256);
  r(ut);
  var _t = new Array(Ke);
  r(_t);
  var ct = new Array(We);
  r(ct);
  var pt,
    vt,
    gt,
    bt,
    wt = !1,
    mt = A,
    yt = S,
    kt = R,
    xt = B,
    zt = I,
    Et = {
      _tr_init: mt,
      _tr_stored_block: yt,
      _tr_flush_block: kt,
      _tr_tally: xt,
      _tr_align: zt,
    },
    At = Object.freeze({
      default: Et,
      __moduleExports: Et,
      _tr_init: mt,
      _tr_stored_block: yt,
      _tr_flush_block: kt,
      _tr_tally: xt,
      _tr_align: zt,
    }),
    St = Z,
    It = Object.freeze({ default: St, __moduleExports: St }),
    Rt = (function () {
      for (var e, t = [], r = 0; r < 256; r++) {
        e = r;
        for (var a = 0; a < 8; a++)
          e = 1 & e ? 3988292384 ^ (e >>> 1) : e >>> 1;
        t[r] = e;
      }
      return t;
    })(),
    Bt = U,
    Zt = Object.freeze({ default: Bt, __moduleExports: Bt }),
    Ut = {
      2: "need dictionary",
      1: "stream end",
      0: "",
      "-1": "file error",
      "-2": "stream error",
      "-3": "data error",
      "-4": "insufficient memory",
      "-5": "buffer error",
      "-6": "incompatible version",
    },
    Tt = Object.freeze({ default: Ut, __moduleExports: Ut }),
    Nt = (At && Et) || At,
    Dt = (It && St) || It,
    Ot = (Zt && Bt) || Zt,
    Lt = (Tt && Ut) || Tt,
    Ct = 0,
    Ft = 1,
    Mt = 3,
    Pt = 4,
    Ht = 5,
    jt = 0,
    qt = 1,
    Gt = -2,
    Kt = -3,
    Xt = -5,
    Yt = -1,
    Wt = 1,
    Vt = 2,
    Jt = 3,
    Qt = 4,
    $t = 0,
    er = 2,
    tr = 8,
    rr = 9,
    ar = 15,
    nr = 8,
    ir = 286,
    sr = 30,
    or = 19,
    lr = 2 * ir + 1,
    fr = 15,
    hr = 3,
    dr = 258,
    ur = dr + hr + 1,
    _r = 32,
    cr = 42,
    pr = 69,
    vr = 73,
    gr = 91,
    br = 103,
    wr = 113,
    mr = 666,
    yr = 1,
    kr = 2,
    xr = 3,
    zr = 4,
    Er = 3;
  bt = [
    new Y(0, 0, 0, 0, j),
    new Y(4, 4, 8, 4, q),
    new Y(4, 5, 16, 8, q),
    new Y(4, 6, 32, 32, q),
    new Y(4, 4, 16, 16, G),
    new Y(8, 16, 32, 32, G),
    new Y(8, 16, 128, 128, G),
    new Y(8, 32, 128, 256, G),
    new Y(32, 128, 258, 1024, G),
    new Y(32, 258, 258, 4096, G),
  ];
  var Ar = re,
    Sr = te,
    Ir = Q,
    Rr = J,
    Br = ee,
    Zr = ae,
    Ur = ne,
    Tr = ie,
    Nr = "pako deflate (from Nodeca project)",
    Dr = {
      deflateInit: Ar,
      deflateInit2: Sr,
      deflateReset: Ir,
      deflateResetKeep: Rr,
      deflateSetHeader: Br,
      deflate: Zr,
      deflateEnd: Ur,
      deflateSetDictionary: Tr,
      deflateInfo: Nr,
    },
    Or = Object.freeze({
      default: Dr,
      __moduleExports: Dr,
      deflateInit: Ar,
      deflateInit2: Sr,
      deflateReset: Ir,
      deflateResetKeep: Rr,
      deflateSetHeader: Br,
      deflate: Zr,
      deflateEnd: Ur,
      deflateSetDictionary: Tr,
      deflateInfo: Nr,
    }),
    Lr = !0,
    Cr = !0;
  try {
    String.fromCharCode.apply(null, [0]);
  } catch (zi) {
    Lr = !1;
  }
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch (zi) {
    Cr = !1;
  }
  for (var Fr = new Ce.Buf8(256), Mr = 0; Mr < 256; Mr++)
    Fr[Mr] =
      Mr >= 252
        ? 6
        : Mr >= 248
        ? 5
        : Mr >= 240
        ? 4
        : Mr >= 224
        ? 3
        : Mr >= 192
        ? 2
        : 1;
  Fr[254] = Fr[254] = 1;
  var Pr = function (e) {
      var t,
        r,
        a,
        n,
        i,
        s = e.length,
        o = 0;
      for (n = 0; n < s; n++)
        (r = e.charCodeAt(n)),
          55296 == (64512 & r) &&
            n + 1 < s &&
            56320 == (64512 & (a = e.charCodeAt(n + 1))) &&
            ((r = 65536 + ((r - 55296) << 10) + (a - 56320)), n++),
          (o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4);
      for (t = new Ce.Buf8(o), i = 0, n = 0; i < o; n++)
        (r = e.charCodeAt(n)),
          55296 == (64512 & r) &&
            n + 1 < s &&
            56320 == (64512 & (a = e.charCodeAt(n + 1))) &&
            ((r = 65536 + ((r - 55296) << 10) + (a - 56320)), n++),
          r < 128
            ? (t[i++] = r)
            : r < 2048
            ? ((t[i++] = 192 | (r >>> 6)), (t[i++] = 128 | (63 & r)))
            : r < 65536
            ? ((t[i++] = 224 | (r >>> 12)),
              (t[i++] = 128 | ((r >>> 6) & 63)),
              (t[i++] = 128 | (63 & r)))
            : ((t[i++] = 240 | (r >>> 18)),
              (t[i++] = 128 | ((r >>> 12) & 63)),
              (t[i++] = 128 | ((r >>> 6) & 63)),
              (t[i++] = 128 | (63 & r)));
      return t;
    },
    Hr = function (e) {
      return se(e, e.length);
    },
    jr = function (e) {
      for (var t = new Ce.Buf8(e.length), r = 0, a = t.length; r < a; r++)
        t[r] = e.charCodeAt(r);
      return t;
    },
    qr = function (e, t) {
      var r,
        a,
        n,
        i,
        s = t || e.length,
        o = new Array(2 * s);
      for (a = 0, r = 0; r < s; )
        if ((n = e[r++]) < 128) o[a++] = n;
        else if ((i = Fr[n]) > 4) (o[a++] = 65533), (r += i - 1);
        else {
          for (n &= 2 === i ? 31 : 3 === i ? 15 : 7; i > 1 && r < s; )
            (n = (n << 6) | (63 & e[r++])), i--;
          i > 1
            ? (o[a++] = 65533)
            : n < 65536
            ? (o[a++] = n)
            : ((n -= 65536),
              (o[a++] = 55296 | ((n >> 10) & 1023)),
              (o[a++] = 56320 | (1023 & n)));
        }
      return se(o, a);
    },
    Gr = function (e, t) {
      var r;
      for (
        t = t || e.length, t > e.length && (t = e.length), r = t - 1;
        r >= 0 && 128 == (192 & e[r]);

      )
        r--;
      return r < 0 ? t : 0 === r ? t : r + Fr[e[r]] > t ? r : t;
    },
    Kr = {
      string2buf: Pr,
      buf2binstring: Hr,
      binstring2buf: jr,
      buf2string: qr,
      utf8border: Gr,
    },
    Xr = Object.freeze({
      default: Kr,
      __moduleExports: Kr,
      string2buf: Pr,
      buf2binstring: Hr,
      binstring2buf: jr,
      buf2string: qr,
      utf8border: Gr,
    }),
    Yr = oe,
    Wr = Object.freeze({ default: Yr, __moduleExports: Yr }),
    Vr = (Or && Dr) || Or,
    Jr = (Xr && Kr) || Xr,
    Qr = (Wr && Yr) || Wr,
    $r = Object.prototype.toString,
    ea = 0,
    ta = -1,
    ra = 0,
    aa = 8;
  (le.prototype.push = function (e, t) {
    var r,
      a,
      n = this.strm,
      i = this.options.chunkSize;
    if (this.ended) return !1;
    (a = t === ~~t ? t : !0 === t ? 4 : 0),
      "string" == typeof e
        ? (n.input = Jr.string2buf(e))
        : "[object ArrayBuffer]" === $r.call(e)
        ? (n.input = new Uint8Array(e))
        : (n.input = e),
      (n.next_in = 0),
      (n.avail_in = n.input.length);
    do {
      if (
        (0 === n.avail_out &&
          ((n.output = new Ce.Buf8(i)), (n.next_out = 0), (n.avail_out = i)),
        1 !== (r = Vr.deflate(n, a)) && r !== ea)
      )
        return this.onEnd(r), (this.ended = !0), !1;
      (0 !== n.avail_out && (0 !== n.avail_in || (4 !== a && 2 !== a))) ||
        ("string" === this.options.to
          ? this.onData(Jr.buf2binstring(Ce.shrinkBuf(n.output, n.next_out)))
          : this.onData(Ce.shrinkBuf(n.output, n.next_out)));
    } while ((n.avail_in > 0 || 0 === n.avail_out) && 1 !== r);
    return 4 === a
      ? ((r = Vr.deflateEnd(this.strm)),
        this.onEnd(r),
        (this.ended = !0),
        r === ea)
      : 2 !== a || (this.onEnd(ea), (n.avail_out = 0), !0);
  }),
    (le.prototype.onData = function (e) {
      this.chunks.push(e);
    }),
    (le.prototype.onEnd = function (e) {
      e === ea &&
        ("string" === this.options.to
          ? (this.result = this.chunks.join(""))
          : (this.result = Ce.flattenChunks(this.chunks))),
        (this.chunks = []),
        (this.err = e),
        (this.msg = this.strm.msg);
    });
  var na,
    ia,
    sa = le,
    oa = fe,
    la = he,
    fa = de,
    ha = { Deflate: sa, deflate: oa, deflateRaw: la, gzip: fa },
    da = Object.freeze({
      default: ha,
      __moduleExports: ha,
      Deflate: sa,
      deflate: oa,
      deflateRaw: la,
      gzip: fa,
    }),
    ua = function (e, t) {
      var r,
        a,
        n,
        i,
        s,
        o,
        l,
        f,
        h,
        d,
        u,
        _,
        c,
        p,
        v,
        g,
        b,
        w,
        m,
        y,
        k,
        x,
        z,
        E,
        A;
      (r = e.state),
        (a = e.next_in),
        (E = e.input),
        (n = a + (e.avail_in - 5)),
        (i = e.next_out),
        (A = e.output),
        (s = i - (t - e.avail_out)),
        (o = i + (e.avail_out - 257)),
        (l = r.dmax),
        (f = r.wsize),
        (h = r.whave),
        (d = r.wnext),
        (u = r.window),
        (_ = r.hold),
        (c = r.bits),
        (p = r.lencode),
        (v = r.distcode),
        (g = (1 << r.lenbits) - 1),
        (b = (1 << r.distbits) - 1);
      e: do {
        c < 15 && ((_ += E[a++] << c), (c += 8), (_ += E[a++] << c), (c += 8)),
          (w = p[_ & g]);
        t: for (;;) {
          if (
            ((m = w >>> 24), (_ >>>= m), (c -= m), 0 === (m = (w >>> 16) & 255))
          )
            A[i++] = 65535 & w;
          else {
            if (!(16 & m)) {
              if (0 == (64 & m)) {
                w = p[(65535 & w) + (_ & ((1 << m) - 1))];
                continue t;
              }
              if (32 & m) {
                r.mode = 12;
                break e;
              }
              (e.msg = "invalid literal/length code"), (r.mode = 30);
              break e;
            }
            (y = 65535 & w),
              (m &= 15),
              m &&
                (c < m && ((_ += E[a++] << c), (c += 8)),
                (y += _ & ((1 << m) - 1)),
                (_ >>>= m),
                (c -= m)),
              c < 15 &&
                ((_ += E[a++] << c), (c += 8), (_ += E[a++] << c), (c += 8)),
              (w = v[_ & b]);
            r: for (;;) {
              if (
                ((m = w >>> 24),
                (_ >>>= m),
                (c -= m),
                !(16 & (m = (w >>> 16) & 255)))
              ) {
                if (0 == (64 & m)) {
                  w = v[(65535 & w) + (_ & ((1 << m) - 1))];
                  continue r;
                }
                (e.msg = "invalid distance code"), (r.mode = 30);
                break e;
              }
              if (
                ((k = 65535 & w),
                (m &= 15),
                c < m &&
                  ((_ += E[a++] << c),
                  (c += 8) < m && ((_ += E[a++] << c), (c += 8))),
                (k += _ & ((1 << m) - 1)) > l)
              ) {
                (e.msg = "invalid distance too far back"), (r.mode = 30);
                break e;
              }
              if (((_ >>>= m), (c -= m), (m = i - s), k > m)) {
                if ((m = k - m) > h && r.sane) {
                  (e.msg = "invalid distance too far back"), (r.mode = 30);
                  break e;
                }
                if (((x = 0), (z = u), 0 === d)) {
                  if (((x += f - m), m < y)) {
                    y -= m;
                    do {
                      A[i++] = u[x++];
                    } while (--m);
                    (x = i - k), (z = A);
                  }
                } else if (d < m) {
                  if (((x += f + d - m), (m -= d) < y)) {
                    y -= m;
                    do {
                      A[i++] = u[x++];
                    } while (--m);
                    if (((x = 0), d < y)) {
                      (m = d), (y -= m);
                      do {
                        A[i++] = u[x++];
                      } while (--m);
                      (x = i - k), (z = A);
                    }
                  }
                } else if (((x += d - m), m < y)) {
                  y -= m;
                  do {
                    A[i++] = u[x++];
                  } while (--m);
                  (x = i - k), (z = A);
                }
                for (; y > 2; )
                  (A[i++] = z[x++]),
                    (A[i++] = z[x++]),
                    (A[i++] = z[x++]),
                    (y -= 3);
                y && ((A[i++] = z[x++]), y > 1 && (A[i++] = z[x++]));
              } else {
                x = i - k;
                do {
                  (A[i++] = A[x++]),
                    (A[i++] = A[x++]),
                    (A[i++] = A[x++]),
                    (y -= 3);
                } while (y > 2);
                y && ((A[i++] = A[x++]), y > 1 && (A[i++] = A[x++]));
              }
              break;
            }
          }
          break;
        }
      } while (a < n && i < o);
      (y = c >> 3),
        (a -= y),
        (c -= y << 3),
        (_ &= (1 << c) - 1),
        (e.next_in = a),
        (e.next_out = i),
        (e.avail_in = a < n ? n - a + 5 : 5 - (a - n)),
        (e.avail_out = i < o ? o - i + 257 : 257 - (i - o)),
        (r.hold = _),
        (r.bits = c);
    },
    _a = Object.freeze({ default: ua, __moduleExports: ua }),
    ca = [
      3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
      67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
    ],
    pa = [
      16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19,
      19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78,
    ],
    va = [
      1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513,
      769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0,
    ],
    ga = [
      16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23,
      24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
    ],
    ba = function (e, t, r, a, n, i, s, o) {
      var l,
        f,
        h,
        d,
        u,
        _,
        c,
        p,
        v,
        g = o.bits,
        b = 0,
        w = 0,
        m = 0,
        y = 0,
        k = 0,
        x = 0,
        z = 0,
        E = 0,
        A = 0,
        S = 0,
        I = null,
        R = 0,
        B = new Ce.Buf16(16),
        Z = new Ce.Buf16(16),
        U = null,
        T = 0;
      for (b = 0; b <= 15; b++) B[b] = 0;
      for (w = 0; w < a; w++) B[t[r + w]]++;
      for (k = g, y = 15; y >= 1 && 0 === B[y]; y--);
      if ((k > y && (k = y), 0 === y))
        return (n[i++] = 20971520), (n[i++] = 20971520), (o.bits = 1), 0;
      for (m = 1; m < y && 0 === B[m]; m++);
      for (k < m && (k = m), E = 1, b = 1; b <= 15; b++)
        if (((E <<= 1), (E -= B[b]) < 0)) return -1;
      if (E > 0 && (0 === e || 1 !== y)) return -1;
      for (Z[1] = 0, b = 1; b < 15; b++) Z[b + 1] = Z[b] + B[b];
      for (w = 0; w < a; w++) 0 !== t[r + w] && (s[Z[t[r + w]]++] = w);
      if (
        (0 === e
          ? ((I = U = s), (_ = 19))
          : 1 === e
          ? ((I = ca), (R -= 257), (U = pa), (T -= 257), (_ = 256))
          : ((I = va), (U = ga), (_ = -1)),
        (S = 0),
        (w = 0),
        (b = m),
        (u = i),
        (x = k),
        (z = 0),
        (h = -1),
        (A = 1 << k),
        (d = A - 1),
        (1 === e && A > 852) || (2 === e && A > 592))
      )
        return 1;
      for (;;) {
        (c = b - z),
          s[w] < _
            ? ((p = 0), (v = s[w]))
            : s[w] > _
            ? ((p = U[T + s[w]]), (v = I[R + s[w]]))
            : ((p = 96), (v = 0)),
          (l = 1 << (b - z)),
          (f = 1 << x),
          (m = f);
        do {
          (f -= l), (n[u + (S >> z) + f] = (c << 24) | (p << 16) | v | 0);
        } while (0 !== f);
        for (l = 1 << (b - 1); S & l; ) l >>= 1;
        if ((0 !== l ? ((S &= l - 1), (S += l)) : (S = 0), w++, 0 == --B[b])) {
          if (b === y) break;
          b = t[r + s[w]];
        }
        if (b > k && (S & d) !== h) {
          for (
            0 === z && (z = k), u += m, x = b - z, E = 1 << x;
            x + z < y && !((E -= B[x + z]) <= 0);

          )
            x++, (E <<= 1);
          if (((A += 1 << x), (1 === e && A > 852) || (2 === e && A > 592)))
            return 1;
          (h = S & d), (n[h] = (k << 24) | (x << 16) | (u - i) | 0);
        }
      }
      return (
        0 !== S && (n[u + S] = ((b - z) << 24) | (64 << 16) | 0),
        (o.bits = k),
        0
      );
    },
    wa = Object.freeze({ default: ba, __moduleExports: ba }),
    ma = (_a && ua) || _a,
    ya = (wa && ba) || wa,
    ka = 0,
    xa = 1,
    za = 2,
    Ea = 4,
    Aa = 5,
    Sa = 6,
    Ia = 0,
    Ra = 1,
    Ba = 2,
    Za = -2,
    Ua = -3,
    Ta = -4,
    Na = -5,
    Da = 8,
    Oa = 1,
    La = 2,
    Ca = 3,
    Fa = 4,
    Ma = 5,
    Pa = 6,
    Ha = 7,
    ja = 8,
    qa = 9,
    Ga = 10,
    Ka = 11,
    Xa = 12,
    Ya = 13,
    Wa = 14,
    Va = 15,
    Ja = 16,
    Qa = 17,
    $a = 18,
    en = 19,
    tn = 20,
    rn = 21,
    an = 22,
    nn = 23,
    sn = 24,
    on = 25,
    ln = 26,
    fn = 27,
    hn = 28,
    dn = 29,
    un = 30,
    _n = 31,
    cn = 32,
    pn = 852,
    vn = 592,
    gn = 15,
    bn = !0,
    wn = pe,
    mn = ve,
    yn = ce,
    kn = be,
    xn = ge,
    zn = ye,
    En = ke,
    An = xe,
    Sn = ze,
    In = "pako inflate (from Nodeca project)",
    Rn = {
      inflateReset: wn,
      inflateReset2: mn,
      inflateResetKeep: yn,
      inflateInit: kn,
      inflateInit2: xn,
      inflate: zn,
      inflateEnd: En,
      inflateGetHeader: An,
      inflateSetDictionary: Sn,
      inflateInfo: In,
    },
    Bn = Object.freeze({
      default: Rn,
      __moduleExports: Rn,
      inflateReset: wn,
      inflateReset2: mn,
      inflateResetKeep: yn,
      inflateInit: kn,
      inflateInit2: xn,
      inflate: zn,
      inflateEnd: En,
      inflateGetHeader: An,
      inflateSetDictionary: Sn,
      inflateInfo: In,
    }),
    Zn = {
      Z_NO_FLUSH: 0,
      Z_PARTIAL_FLUSH: 1,
      Z_SYNC_FLUSH: 2,
      Z_FULL_FLUSH: 3,
      Z_FINISH: 4,
      Z_BLOCK: 5,
      Z_TREES: 6,
      Z_OK: 0,
      Z_STREAM_END: 1,
      Z_NEED_DICT: 2,
      Z_ERRNO: -1,
      Z_STREAM_ERROR: -2,
      Z_DATA_ERROR: -3,
      Z_BUF_ERROR: -5,
      Z_NO_COMPRESSION: 0,
      Z_BEST_SPEED: 1,
      Z_BEST_COMPRESSION: 9,
      Z_DEFAULT_COMPRESSION: -1,
      Z_FILTERED: 1,
      Z_HUFFMAN_ONLY: 2,
      Z_RLE: 3,
      Z_FIXED: 4,
      Z_DEFAULT_STRATEGY: 0,
      Z_BINARY: 0,
      Z_TEXT: 1,
      Z_UNKNOWN: 2,
      Z_DEFLATED: 8,
    },
    Un = Zn.Z_NO_FLUSH,
    Tn = Zn.Z_PARTIAL_FLUSH,
    Nn = Zn.Z_SYNC_FLUSH,
    Dn = Zn.Z_FULL_FLUSH,
    On = Zn.Z_FINISH,
    Ln = Zn.Z_BLOCK,
    Cn = Zn.Z_TREES,
    Fn = Zn.Z_OK,
    Mn = Zn.Z_STREAM_END,
    Pn = Zn.Z_NEED_DICT,
    Hn = Zn.Z_ERRNO,
    jn = Zn.Z_STREAM_ERROR,
    qn = Zn.Z_DATA_ERROR,
    Gn = Zn.Z_BUF_ERROR,
    Kn = Zn.Z_NO_COMPRESSION,
    Xn = Zn.Z_BEST_SPEED,
    Yn = Zn.Z_BEST_COMPRESSION,
    Wn = Zn.Z_DEFAULT_COMPRESSION,
    Vn = Zn.Z_FILTERED,
    Jn = Zn.Z_HUFFMAN_ONLY,
    Qn = Zn.Z_RLE,
    $n = Zn.Z_FIXED,
    ei = Zn.Z_DEFAULT_STRATEGY,
    ti = Zn.Z_BINARY,
    ri = Zn.Z_TEXT,
    ai = Zn.Z_UNKNOWN,
    ni = Zn.Z_DEFLATED,
    ii = Object.freeze({
      default: Zn,
      __moduleExports: Zn,
      Z_NO_FLUSH: Un,
      Z_PARTIAL_FLUSH: Tn,
      Z_SYNC_FLUSH: Nn,
      Z_FULL_FLUSH: Dn,
      Z_FINISH: On,
      Z_BLOCK: Ln,
      Z_TREES: Cn,
      Z_OK: Fn,
      Z_STREAM_END: Mn,
      Z_NEED_DICT: Pn,
      Z_ERRNO: Hn,
      Z_STREAM_ERROR: jn,
      Z_DATA_ERROR: qn,
      Z_BUF_ERROR: Gn,
      Z_NO_COMPRESSION: Kn,
      Z_BEST_SPEED: Xn,
      Z_BEST_COMPRESSION: Yn,
      Z_DEFAULT_COMPRESSION: Wn,
      Z_FILTERED: Vn,
      Z_HUFFMAN_ONLY: Jn,
      Z_RLE: Qn,
      Z_FIXED: $n,
      Z_DEFAULT_STRATEGY: ei,
      Z_BINARY: ti,
      Z_TEXT: ri,
      Z_UNKNOWN: ai,
      Z_DEFLATED: ni,
    }),
    si = Ee,
    oi = Object.freeze({ default: si, __moduleExports: si }),
    li = (Bn && Rn) || Bn,
    fi = (ii && Zn) || ii,
    hi = (oi && si) || oi,
    di = Object.prototype.toString;
  (Ae.prototype.push = function (e, t) {
    var r,
      a,
      n,
      i,
      s,
      o = this.strm,
      l = this.options.chunkSize,
      f = this.options.dictionary,
      h = !1;
    if (this.ended) return !1;
    (a = t === ~~t ? t : !0 === t ? fi.Z_FINISH : fi.Z_NO_FLUSH),
      "string" == typeof e
        ? (o.input = Jr.binstring2buf(e))
        : "[object ArrayBuffer]" === di.call(e)
        ? (o.input = new Uint8Array(e))
        : (o.input = e),
      (o.next_in = 0),
      (o.avail_in = o.input.length);
    do {
      if (
        (0 === o.avail_out &&
          ((o.output = new Ce.Buf8(l)), (o.next_out = 0), (o.avail_out = l)),
        (r = li.inflate(o, fi.Z_NO_FLUSH)),
        r === fi.Z_NEED_DICT &&
          f &&
          (r = li.inflateSetDictionary(this.strm, f)),
        r === fi.Z_BUF_ERROR && !0 === h && ((r = fi.Z_OK), (h = !1)),
        r !== fi.Z_STREAM_END && r !== fi.Z_OK)
      )
        return this.onEnd(r), (this.ended = !0), !1;
      o.next_out &&
        ((0 !== o.avail_out &&
          r !== fi.Z_STREAM_END &&
          (0 !== o.avail_in || (a !== fi.Z_FINISH && a !== fi.Z_SYNC_FLUSH))) ||
          ("string" === this.options.to
            ? ((n = Jr.utf8border(o.output, o.next_out)),
              (i = o.next_out - n),
              (s = Jr.buf2string(o.output, n)),
              (o.next_out = i),
              (o.avail_out = l - i),
              i && Ce.arraySet(o.output, o.output, n, i, 0),
              this.onData(s))
            : this.onData(Ce.shrinkBuf(o.output, o.next_out)))),
        0 === o.avail_in && 0 === o.avail_out && (h = !0);
    } while ((o.avail_in > 0 || 0 === o.avail_out) && r !== fi.Z_STREAM_END);
    return (
      r === fi.Z_STREAM_END && (a = fi.Z_FINISH),
      a === fi.Z_FINISH
        ? ((r = li.inflateEnd(this.strm)),
          this.onEnd(r),
          (this.ended = !0),
          r === fi.Z_OK)
        : a !== fi.Z_SYNC_FLUSH || (this.onEnd(fi.Z_OK), (o.avail_out = 0), !0)
    );
  }),
    (Ae.prototype.onData = function (e) {
      this.chunks.push(e);
    }),
    (Ae.prototype.onEnd = function (e) {
      e === fi.Z_OK &&
        ("string" === this.options.to
          ? (this.result = this.chunks.join(""))
          : (this.result = Ce.flattenChunks(this.chunks))),
        (this.chunks = []),
        (this.err = e),
        (this.msg = this.strm.msg);
    });
  var ui = Ae,
    _i = Se,
    ci = Ie,
    pi = Se,
    vi = { Inflate: ui, inflate: _i, inflateRaw: ci, ungzip: pi },
    gi = Object.freeze({
      default: vi,
      __moduleExports: vi,
      Inflate: ui,
      inflate: _i,
      inflateRaw: ci,
      ungzip: pi,
    }),
    bi = (da && ha) || da,
    wi = (gi && vi) || gi,
    mi = Ce.assign,
    yi = {};
  mi(yi, bi, wi, fi);
  var ki = yi,
    xi = {};
  return (
    Uint8Array &&
      !Uint8Array.prototype.slice &&
      (Uint8Array.prototype.slice = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r;
        return (r = new Uint8Array(this)).subarray.apply(r, e);
      }),
    (function (e, t) {
      (e.toRGBA8 = function (t) {
        var r = t.width,
          a = t.height;
        if (null == t.tabs.acTL)
          return [e.toRGBA8.decodeImage(t.data, r, a, t).buffer];
        var n = [];
        null == t.frames[0].data && (t.frames[0].data = t.data);
        for (
          var i, s = new Uint8Array(r * a * 4), o = 0;
          o < t.frames.length;
          o++
        ) {
          var l = t.frames[o],
            f = l.rect.x,
            h = l.rect.y,
            d = l.rect.width,
            u = l.rect.height,
            _ = e.toRGBA8.decodeImage(l.data, d, u, t);
          if (
            (0 == o
              ? (i = _)
              : 0 == l.blend
              ? e._copyTile(_, d, u, i, r, a, f, h, 0)
              : 1 == l.blend && e._copyTile(_, d, u, i, r, a, f, h, 1),
            n.push(i.buffer),
            (i = i.slice(0)),
            0 == l.dispose)
          );
          else if (1 == l.dispose) e._copyTile(s, d, u, i, r, a, f, h, 0);
          else if (2 == l.dispose) {
            for (var c = o - 1; 2 == t.frames[c].dispose; ) c--;
            i = new Uint8Array(n[c]).slice(0);
          }
        }
        return n;
      }),
        (e.toRGBA8.decodeImage = function (t, r, a, n) {
          var i = r * a,
            s = e.decode._getBPP(n),
            o = Math.ceil((r * s) / 8),
            l = new Uint8Array(4 * i),
            f = new Uint32Array(l.buffer),
            h = n.ctype,
            d = n.depth,
            u = e._bin.readUshort;
          if (6 == h) {
            var _ = i << 2;
            if (8 == d) for (var c = 0; c < _; c++) l[c] = t[c];
            if (16 == d) for (var c = 0; c < _; c++) l[c] = t[c << 1];
          } else if (2 == h) {
            var p = n.tabs.tRNS,
              v = -1,
              g = -1,
              b = -1;
            if ((p && ((v = p[0]), (g = p[1]), (b = p[2])), 8 == d))
              for (var c = 0; c < i; c++) {
                var w = c << 2,
                  m = 3 * c;
                (l[w] = t[m]),
                  (l[w + 1] = t[m + 1]),
                  (l[w + 2] = t[m + 2]),
                  (l[w + 3] = 255),
                  -1 != v &&
                    t[m] == v &&
                    t[m + 1] == g &&
                    t[m + 2] == b &&
                    (l[w + 3] = 0);
              }
            if (16 == d)
              for (var c = 0; c < i; c++) {
                var w = c << 2,
                  m = 6 * c;
                (l[w] = t[m]),
                  (l[w + 1] = t[m + 2]),
                  (l[w + 2] = t[m + 4]),
                  (l[w + 3] = 255),
                  -1 != v &&
                    u(t, m) == v &&
                    u(t, m + 2) == g &&
                    u(t, m + 4) == b &&
                    (l[w + 3] = 0);
              }
          } else if (3 == h) {
            var y = n.tabs.PLTE,
              k = n.tabs.tRNS,
              x = k ? k.length : 0;
            if (1 == d)
              for (var z = 0; z < a; z++)
                for (var E = z * o, A = z * r, c = 0; c < r; c++) {
                  var w = (A + c) << 2,
                    S = (t[E + (c >> 3)] >> (7 - ((7 & c) << 0))) & 1,
                    I = 3 * S;
                  (l[w] = y[I]),
                    (l[w + 1] = y[I + 1]),
                    (l[w + 2] = y[I + 2]),
                    (l[w + 3] = S < x ? k[S] : 255);
                }
            if (2 == d)
              for (var z = 0; z < a; z++)
                for (var E = z * o, A = z * r, c = 0; c < r; c++) {
                  var w = (A + c) << 2,
                    S = (t[E + (c >> 2)] >> (6 - ((3 & c) << 1))) & 3,
                    I = 3 * S;
                  (l[w] = y[I]),
                    (l[w + 1] = y[I + 1]),
                    (l[w + 2] = y[I + 2]),
                    (l[w + 3] = S < x ? k[S] : 255);
                }
            if (4 == d)
              for (var z = 0; z < a; z++)
                for (var E = z * o, A = z * r, c = 0; c < r; c++) {
                  var w = (A + c) << 2,
                    S = (t[E + (c >> 1)] >> (4 - ((1 & c) << 2))) & 15,
                    I = 3 * S;
                  (l[w] = y[I]),
                    (l[w + 1] = y[I + 1]),
                    (l[w + 2] = y[I + 2]),
                    (l[w + 3] = S < x ? k[S] : 255);
                }
            if (8 == d)
              for (var c = 0; c < i; c++) {
                var w = c << 2,
                  S = t[c],
                  I = 3 * S;
                (l[w] = y[I]),
                  (l[w + 1] = y[I + 1]),
                  (l[w + 2] = y[I + 2]),
                  (l[w + 3] = S < x ? k[S] : 255);
              }
          } else if (4 == h) {
            if (8 == d)
              for (var c = 0; c < i; c++) {
                var w = c << 2,
                  R = c << 1,
                  B = t[R];
                (l[w] = B),
                  (l[w + 1] = B),
                  (l[w + 2] = B),
                  (l[w + 3] = t[R + 1]);
              }
            if (16 == d)
              for (var c = 0; c < i; c++) {
                var w = c << 2,
                  R = c << 2,
                  B = t[R];
                (l[w] = B),
                  (l[w + 1] = B),
                  (l[w + 2] = B),
                  (l[w + 3] = t[R + 2]);
              }
          } else if (0 == h) {
            var v = n.tabs.tRNS ? n.tabs.tRNS : -1;
            if (1 == d)
              for (var c = 0; c < i; c++) {
                var B = 255 * ((t[c >> 3] >> (7 - (7 & c))) & 1),
                  Z = B == 255 * v ? 0 : 255;
                f[c] = (Z << 24) | (B << 16) | (B << 8) | B;
              }
            if (2 == d)
              for (var c = 0; c < i; c++) {
                var B = 85 * ((t[c >> 2] >> (6 - ((3 & c) << 1))) & 3),
                  Z = B == 85 * v ? 0 : 255;
                f[c] = (Z << 24) | (B << 16) | (B << 8) | B;
              }
            if (4 == d)
              for (var c = 0; c < i; c++) {
                var B = 17 * ((t[c >> 1] >> (4 - ((1 & c) << 2))) & 15),
                  Z = B == 17 * v ? 0 : 255;
                f[c] = (Z << 24) | (B << 16) | (B << 8) | B;
              }
            if (8 == d)
              for (var c = 0; c < i; c++) {
                var B = t[c],
                  Z = B == v ? 0 : 255;
                f[c] = (Z << 24) | (B << 16) | (B << 8) | B;
              }
            if (16 == d)
              for (var c = 0; c < i; c++) {
                var B = t[c << 1],
                  Z = u(t, c << 1) == v ? 0 : 255;
                f[c] = (Z << 24) | (B << 16) | (B << 8) | B;
              }
          }
          return l;
        }),
        (e.decode = function (t) {
          for (
            var r,
              a = new Uint8Array(t),
              n = 8,
              i = e._bin,
              s = i.readUshort,
              o = i.readUint,
              l = { tabs: {}, frames: [] },
              f = new Uint8Array(a.length),
              h = 0,
              d = 0,
              u = [137, 80, 78, 71, 13, 10, 26, 10],
              _ = 0;
            _ < 8;
            _++
          )
            if (a[_] != u[_]) throw "The input is not a PNG file!";
          for (; n < a.length; ) {
            var c = i.readUint(a, n);
            n += 4;
            var p = i.readASCII(a, n, 4);
            if (((n += 4), "IHDR" == p)) e.decode._IHDR(a, n, l);
            else if ("IDAT" == p) {
              for (var _ = 0; _ < c; _++) f[h + _] = a[n + _];
              h += c;
            } else if ("acTL" == p)
              (l.tabs[p] = { num_frames: o(a, n), num_plays: o(a, n + 4) }),
                (r = new Uint8Array(a.length));
            else if ("fcTL" == p) {
              if (0 != d) {
                var v = l.frames[l.frames.length - 1];
                (v.data = e.decode._decompress(
                  l,
                  r.slice(0, d),
                  v.rect.width,
                  v.rect.height
                )),
                  (d = 0);
              }
              var g = {
                  x: o(a, n + 12),
                  y: o(a, n + 16),
                  width: o(a, n + 4),
                  height: o(a, n + 8),
                },
                b = s(a, n + 22);
              b = s(a, n + 20) / (0 == b ? 100 : b);
              var w = {
                rect: g,
                delay: Math.round(1e3 * b),
                dispose: a[n + 24],
                blend: a[n + 25],
              };
              l.frames.push(w);
            } else if ("fdAT" == p) {
              for (var _ = 0; _ < c - 4; _++) r[d + _] = a[n + _ + 4];
              d += c - 4;
            } else if ("pHYs" == p)
              l.tabs[p] = [i.readUint(a, n), i.readUint(a, n + 4), a[n + 8]];
            else if ("cHRM" == p) {
              l.tabs[p] = [];
              for (var _ = 0; _ < 8; _++)
                l.tabs[p].push(i.readUint(a, n + 4 * _));
            } else if ("tEXt" == p) {
              null == l.tabs[p] && (l.tabs[p] = {});
              var m = i.nextZero(a, n),
                y = i.readASCII(a, n, m - n),
                k = i.readASCII(a, m + 1, n + c - m - 1);
              l.tabs[p][y] = k;
            } else if ("iTXt" == p) {
              null == l.tabs[p] && (l.tabs[p] = {});
              var m = 0,
                x = n;
              m = i.nextZero(a, x);
              var y = i.readASCII(a, x, m - x);
              (x = m + 1), (x += 2), (m = i.nextZero(a, x));
              i.readASCII(a, x, m - x);
              (x = m + 1), (m = i.nextZero(a, x));
              i.readUTF8(a, x, m - x);
              x = m + 1;
              var k = i.readUTF8(a, x, c - (x - n));
              l.tabs[p][y] = k;
            } else if ("PLTE" == p) l.tabs[p] = i.readBytes(a, n, c);
            else if ("hIST" == p) {
              var z = l.tabs.PLTE.length / 3;
              l.tabs[p] = [];
              for (var _ = 0; _ < z; _++) l.tabs[p].push(s(a, n + 2 * _));
            } else if ("tRNS" == p)
              3 == l.ctype
                ? (l.tabs[p] = i.readBytes(a, n, c))
                : 0 == l.ctype
                ? (l.tabs[p] = s(a, n))
                : 2 == l.ctype &&
                  (l.tabs[p] = [s(a, n), s(a, n + 2), s(a, n + 4)]);
            else if ("gAMA" == p) l.tabs[p] = i.readUint(a, n) / 1e5;
            else if ("sRGB" == p) l.tabs[p] = a[n];
            else if ("bKGD" == p)
              0 == l.ctype || 4 == l.ctype
                ? (l.tabs[p] = [s(a, n)])
                : 2 == l.ctype || 6 == l.ctype
                ? (l.tabs[p] = [s(a, n), s(a, n + 2), s(a, n + 4)])
                : 3 == l.ctype && (l.tabs[p] = a[n]);
            else if ("IEND" == p) break;
            n += c;
            i.readUint(a, n);
            n += 4;
          }
          if (0 != d) {
            var v = l.frames[l.frames.length - 1];
            (v.data = e.decode._decompress(
              l,
              r.slice(0, d),
              v.rect.width,
              v.rect.height
            )),
              (d = 0);
          }
          return (
            (l.data = e.decode._decompress(l, f, l.width, l.height)),
            delete l.compress,
            delete l.interlace,
            delete l.filter,
            l
          );
        }),
        (e.decode._decompress = function (t, r, a, n) {
          return (
            0 == t.compress && (r = e.decode._inflate(r)),
            0 == t.interlace
              ? (r = e.decode._filterZero(r, t, 0, a, n))
              : 1 == t.interlace && (r = e.decode._readInterlace(r, t)),
            r
          );
        }),
        (e.decode._inflate = function (e) {
          return t.inflate(e);
        }),
        (e.decode._readInterlace = function (t, r) {
          for (
            var a = r.width,
              n = r.height,
              i = e.decode._getBPP(r),
              s = i >> 3,
              o = Math.ceil((a * i) / 8),
              l = new Uint8Array(n * o),
              f = 0,
              h = [0, 0, 4, 0, 2, 0, 1],
              d = [0, 4, 0, 2, 0, 1, 0],
              u = [8, 8, 8, 4, 4, 2, 2],
              _ = [8, 8, 4, 4, 2, 2, 1],
              c = 0;
            c < 7;

          ) {
            for (var p = u[c], v = _[c], g = 0, b = 0, w = h[c]; w < n; )
              (w += p), b++;
            for (var m = d[c]; m < a; ) (m += v), g++;
            var y = Math.ceil((g * i) / 8);
            e.decode._filterZero(t, r, f, g, b);
            for (var k = 0, x = h[c]; x < n; ) {
              for (var z = d[c], E = (f + k * y) << 3; z < a; ) {
                if (1 == i) {
                  var A = t[E >> 3];
                  (A = (A >> (7 - (7 & E))) & 1),
                    (l[x * o + (z >> 3)] |= A << (7 - ((3 & z) << 0)));
                }
                if (2 == i) {
                  var A = t[E >> 3];
                  (A = (A >> (6 - (7 & E))) & 3),
                    (l[x * o + (z >> 2)] |= A << (6 - ((3 & z) << 1)));
                }
                if (4 == i) {
                  var A = t[E >> 3];
                  (A = (A >> (4 - (7 & E))) & 15),
                    (l[x * o + (z >> 1)] |= A << (4 - ((1 & z) << 2)));
                }
                if (i >= 8)
                  for (var S = x * o + z * s, I = 0; I < s; I++)
                    l[S + I] = t[(E >> 3) + I];
                (E += i), (z += v);
              }
              k++, (x += p);
            }
            g * b != 0 && (f += b * (1 + y)), (c += 1);
          }
          return l;
        }),
        (e.decode._getBPP = function (e) {
          return [1, null, 3, 1, 2, null, 4][e.ctype] * e.depth;
        }),
        (e.decode._filterZero = function (t, r, a, n, i) {
          var s = e.decode._getBPP(r),
            o = Math.ceil((n * s) / 8),
            l = e.decode._paeth;
          s = Math.ceil(s / 8);
          for (var f = 0; f < i; f++) {
            var h = a + f * o,
              d = h + f + 1,
              u = t[d - 1];
            if (0 == u) for (var _ = 0; _ < o; _++) t[h + _] = t[d + _];
            else if (1 == u) {
              for (var _ = 0; _ < s; _++) t[h + _] = t[d + _];
              for (var _ = s; _ < o; _++)
                t[h + _] = (t[d + _] + t[h + _ - s]) & 255;
            } else if (0 == f) {
              for (var _ = 0; _ < s; _++) t[h + _] = t[d + _];
              if (2 == u) for (var _ = s; _ < o; _++) t[h + _] = 255 & t[d + _];
              if (3 == u)
                for (var _ = s; _ < o; _++)
                  t[h + _] = (t[d + _] + (t[h + _ - s] >> 1)) & 255;
              if (4 == u)
                for (var _ = s; _ < o; _++)
                  t[h + _] = (t[d + _] + l(t[h + _ - s], 0, 0)) & 255;
            } else {
              if (2 == u)
                for (var _ = 0; _ < o; _++)
                  t[h + _] = (t[d + _] + t[h + _ - o]) & 255;
              if (3 == u) {
                for (var _ = 0; _ < s; _++)
                  t[h + _] = (t[d + _] + (t[h + _ - o] >> 1)) & 255;
                for (var _ = s; _ < o; _++)
                  t[h + _] =
                    (t[d + _] + ((t[h + _ - o] + t[h + _ - s]) >> 1)) & 255;
              }
              if (4 == u) {
                for (var _ = 0; _ < s; _++)
                  t[h + _] = (t[d + _] + l(0, t[h + _ - o], 0)) & 255;
                for (var _ = s; _ < o; _++)
                  t[h + _] =
                    (t[d + _] +
                      l(t[h + _ - s], t[h + _ - o], t[h + _ - s - o])) &
                    255;
              }
            }
          }
          return t;
        }),
        (e.decode._paeth = function (e, t, r) {
          var a = e + t - r,
            n = Math.abs(a - e),
            i = Math.abs(a - t),
            s = Math.abs(a - r);
          return n <= i && n <= s ? e : i <= s ? t : r;
        }),
        (e.decode._IHDR = function (t, r, a) {
          var n = e._bin;
          (a.width = n.readUint(t, r)),
            (r += 4),
            (a.height = n.readUint(t, r)),
            (r += 4),
            (a.depth = t[r]),
            r++,
            (a.ctype = t[r]),
            r++,
            (a.compress = t[r]),
            r++,
            (a.filter = t[r]),
            r++,
            (a.interlace = t[r]),
            r++;
        }),
        (e._bin = {
          nextZero: function (e, t) {
            for (; 0 != e[t]; ) t++;
            return t;
          },
          readUshort: function (e, t) {
            return (e[t] << 8) | e[t + 1];
          },
          writeUshort: function (e, t, r) {
            (e[t] = (r >> 8) & 255), (e[t + 1] = 255 & r);
          },
          readUint: function (e, t) {
            return (
              16777216 * e[t] + ((e[t + 1] << 16) | (e[t + 2] << 8) | e[t + 3])
            );
          },
          writeUint: function (e, t, r) {
            (e[t] = (r >> 24) & 255),
              (e[t + 1] = (r >> 16) & 255),
              (e[t + 2] = (r >> 8) & 255),
              (e[t + 3] = 255 & r);
          },
          readASCII: function (e, t, r) {
            for (var a = "", n = 0; n < r; n++)
              a += String.fromCharCode(e[t + n]);
            return a;
          },
          writeASCII: function (e, t, r) {
            for (var a = 0; a < r.length; a++) e[t + a] = r.charCodeAt(a);
          },
          readBytes: function (e, t, r) {
            for (var a = [], n = 0; n < r; n++) a.push(e[t + n]);
            return a;
          },
          pad: function (e) {
            return e.length < 2 ? "0" + e : e;
          },
          readUTF8: function (t, r, a) {
            for (var n, i = "", s = 0; s < a; s++)
              i += "%" + e._bin.pad(t[r + s].toString(16));
            try {
              n = decodeURIComponent(i);
            } catch (o) {
              return e._bin.readASCII(t, r, a);
            }
            return n;
          },
        }),
        (e._copyTile = function (e, t, r, a, n, i, s, o, l) {
          for (
            var f = Math.min(t, n), h = Math.min(r, i), d = 0, u = 0, _ = 0;
            _ < h;
            _++
          )
            for (var c = 0; c < f; c++)
              if (
                (s >= 0 && o >= 0
                  ? ((d = (_ * t + c) << 2), (u = ((o + _) * n + s + c) << 2))
                  : ((d = ((-o + _) * t - s + c) << 2), (u = (_ * n + c) << 2)),
                0 == l)
              )
                (a[u] = e[d]),
                  (a[u + 1] = e[d + 1]),
                  (a[u + 2] = e[d + 2]),
                  (a[u + 3] = e[d + 3]);
              else if (1 == l) {
                var p = e[d + 3] * (1 / 255),
                  v = e[d] * p,
                  g = e[d + 1] * p,
                  b = e[d + 2] * p,
                  w = a[u + 3] * (1 / 255),
                  m = a[u] * w,
                  y = a[u + 1] * w,
                  k = a[u + 2] * w,
                  x = 1 - p,
                  z = p + w * x,
                  E = 0 == z ? 0 : 1 / z;
                (a[u + 3] = 255 * z),
                  (a[u + 0] = (v + m * x) * E),
                  (a[u + 1] = (g + y * x) * E),
                  (a[u + 2] = (b + k * x) * E);
              } else if (2 == l) {
                var p = e[d + 3],
                  v = e[d],
                  g = e[d + 1],
                  b = e[d + 2],
                  w = a[u + 3],
                  m = a[u],
                  y = a[u + 1],
                  k = a[u + 2];
                p == w && v == m && g == y && b == k
                  ? ((a[u] = 0), (a[u + 1] = 0), (a[u + 2] = 0), (a[u + 3] = 0))
                  : ((a[u] = v),
                    (a[u + 1] = g),
                    (a[u + 2] = b),
                    (a[u + 3] = p));
              } else if (3 == l) {
                var p = e[d + 3],
                  v = e[d],
                  g = e[d + 1],
                  b = e[d + 2],
                  w = a[u + 3],
                  m = a[u],
                  y = a[u + 1],
                  k = a[u + 2];
                if (p == w && v == m && g == y && b == k) continue;
                if (p < 220 && w > 20) return !1;
              }
          return !0;
        }),
        (e.encode = function (t, r, a, n, i, s) {
          null == n && (n = 0), null == s && (s = !1);
          var o = e.encode.compress(t, r, a, n, !1, s);
          return e.encode.compressPNG(o, -1), e.encode._main(o, r, a, i);
        }),
        (e.encodeLL = function (t, r, a, n, i, s, o) {
          for (
            var l = {
                ctype: 0 + (1 == n ? 0 : 2) + (0 == i ? 0 : 4),
                depth: s,
                frames: [],
              },
              f = (n + i) * s,
              h = f * r,
              d = 0;
            d < t.length;
            d++
          )
            l.frames.push({
              rect: { x: 0, y: 0, width: r, height: a },
              img: new Uint8Array(t[d]),
              blend: 0,
              dispose: 1,
              bpp: Math.ceil(f / 8),
              bpl: Math.ceil(h / 8),
            });
          return e.encode.compressPNG(l, 4), e.encode._main(l, r, a, o);
        }),
        (e.encode._main = function (t, r, a, n) {
          var i = e.crc.crc,
            s = e._bin.writeUint,
            o = e._bin.writeUshort,
            l = e._bin.writeASCII,
            f = 8,
            h = t.frames.length > 1,
            d = !1,
            u = 46 + (h ? 20 : 0);
          if (3 == t.ctype) {
            for (var _ = t.plte.length, c = 0; c < _; c++)
              t.plte[c] >>> 24 != 255 && (d = !0);
            u += 8 + 3 * _ + 4 + (d ? 8 + 1 * _ + 4 : 0);
          }
          for (var p = 0; p < t.frames.length; p++) {
            var v = t.frames[p];
            h && (u += 38), (u += v.cimg.length + 12), 0 != p && (u += 4);
          }
          u += 12;
          for (
            var g = new Uint8Array(u),
              b = [137, 80, 78, 71, 13, 10, 26, 10],
              c = 0;
            c < 8;
            c++
          )
            g[c] = b[c];
          if (
            (s(g, f, 13),
            (f += 4),
            l(g, f, "IHDR"),
            (f += 4),
            s(g, f, r),
            (f += 4),
            s(g, f, a),
            (f += 4),
            (g[f] = t.depth),
            f++,
            (g[f] = t.ctype),
            f++,
            (g[f] = 0),
            f++,
            (g[f] = 0),
            f++,
            (g[f] = 0),
            f++,
            s(g, f, i(g, f - 17, 17)),
            (f += 4),
            s(g, f, 1),
            (f += 4),
            l(g, f, "sRGB"),
            (f += 4),
            (g[f] = 1),
            f++,
            s(g, f, i(g, f - 5, 5)),
            (f += 4),
            h &&
              (s(g, f, 8),
              (f += 4),
              l(g, f, "acTL"),
              (f += 4),
              s(g, f, t.frames.length),
              (f += 4),
              s(g, f, 0),
              (f += 4),
              s(g, f, i(g, f - 12, 12)),
              (f += 4)),
            3 == t.ctype)
          ) {
            var _ = t.plte.length;
            s(g, f, 3 * _), (f += 4), l(g, f, "PLTE"), (f += 4);
            for (var c = 0; c < _; c++) {
              var w = 3 * c,
                m = t.plte[c],
                y = 255 & m,
                k = (m >>> 8) & 255,
                x = (m >>> 16) & 255;
              (g[f + w + 0] = y), (g[f + w + 1] = k), (g[f + w + 2] = x);
            }
            if (
              ((f += 3 * _),
              s(g, f, i(g, f - 3 * _ - 4, 3 * _ + 4)),
              (f += 4),
              d)
            ) {
              s(g, f, _), (f += 4), l(g, f, "tRNS"), (f += 4);
              for (var c = 0; c < _; c++) g[f + c] = (t.plte[c] >>> 24) & 255;
              (f += _), s(g, f, i(g, f - _ - 4, _ + 4)), (f += 4);
            }
          }
          for (var z = 0, p = 0; p < t.frames.length; p++) {
            var v = t.frames[p];
            h &&
              (s(g, f, 26),
              (f += 4),
              l(g, f, "fcTL"),
              (f += 4),
              s(g, f, z++),
              (f += 4),
              s(g, f, v.rect.width),
              (f += 4),
              s(g, f, v.rect.height),
              (f += 4),
              s(g, f, v.rect.x),
              (f += 4),
              s(g, f, v.rect.y),
              (f += 4),
              o(g, f, n[p]),
              (f += 2),
              o(g, f, 1e3),
              (f += 2),
              (g[f] = v.dispose),
              f++,
              (g[f] = v.blend),
              f++,
              s(g, f, i(g, f - 30, 30)),
              (f += 4));
            var E = v.cimg,
              _ = E.length;
            s(g, f, _ + (0 == p ? 0 : 4)), (f += 4);
            var A = f;
            l(g, f, 0 == p ? "IDAT" : "fdAT"),
              (f += 4),
              0 != p && (s(g, f, z++), (f += 4));
            for (var c = 0; c < _; c++) g[f + c] = E[c];
            (f += _), s(g, f, i(g, A, f - A)), (f += 4);
          }
          return (
            s(g, f, 0),
            (f += 4),
            l(g, f, "IEND"),
            (f += 4),
            s(g, f, i(g, f - 4, 4)),
            (f += 4),
            g.buffer
          );
        }),
        (e.encode.compressPNG = function (t, r) {
          for (var a = 0; a < t.frames.length; a++) {
            var n = t.frames[a],
              i = (n.rect.width, n.rect.height),
              s = new Uint8Array(i * n.bpl + i);
            n.cimg = e.encode._filterZero(n.img, i, n.bpp, n.bpl, s, r);
          }
        }),
        (e.encode.compress = function (t, r, a, n, i, s) {
          null == s && (s = !1);
          for (var o = 6, l = 8, f = 255, h = 0; h < t.length; h++)
            for (
              var d = new Uint8Array(t[h]), u = d.length, _ = 0;
              _ < u;
              _ += 4
            )
              f &= d[_ + 3];
          var c = 255 != f,
            p = c && i,
            v = e.encode.framize(t, r, a, i, p),
            g = {},
            b = [],
            w = [];
          if (0 != n) {
            for (var m = [], _ = 0; _ < v.length; _++) m.push(v[_].img.buffer);
            for (
              var y = e.encode.concatRGBA(m, i),
                k = e.quantize(y, n),
                x = 0,
                z = new Uint8Array(k.abuf),
                _ = 0;
              _ < v.length;
              _++
            ) {
              var E = v[_].img,
                A = E.length;
              w.push(new Uint8Array(k.inds.buffer, x >> 2, A >> 2));
              for (var h = 0; h < A; h += 4)
                (E[h] = z[x + h]),
                  (E[h + 1] = z[x + h + 1]),
                  (E[h + 2] = z[x + h + 2]),
                  (E[h + 3] = z[x + h + 3]);
              x += A;
            }
            for (var _ = 0; _ < k.plte.length; _++) b.push(k.plte[_].est.rgba);
          } else
            for (var h = 0; h < v.length; h++) {
              var S = v[h],
                I = new Uint32Array(S.img.buffer),
                R = S.rect.width,
                u = I.length,
                B = new Uint8Array(u);
              w.push(B);
              for (var _ = 0; _ < u; _++) {
                var Z = I[_];
                if (0 != _ && Z == I[_ - 1]) B[_] = B[_ - 1];
                else if (_ > R && Z == I[_ - R]) B[_] = B[_ - R];
                else {
                  var U = g[Z];
                  if (
                    null == U &&
                    ((g[Z] = U = b.length), b.push(Z), b.length >= 300)
                  )
                    break;
                  B[_] = U;
                }
              }
            }
          var T = b.length;
          T <= 256 &&
            0 == s &&
            ((l = T <= 2 ? 1 : T <= 4 ? 2 : T <= 16 ? 4 : 8), i && (l = 8));
          for (var h = 0; h < v.length; h++) {
            var S = v[h],
              R = (S.rect.x, S.rect.y, S.rect.width),
              N = S.rect.height,
              D = S.img,
              O = (new Uint32Array(D.buffer), 4 * R),
              L = 4;
            if (T <= 256 && 0 == s) {
              O = Math.ceil((l * R) / 8);
              for (var C = new Uint8Array(O * N), F = w[h], M = 0; M < N; M++) {
                var _ = M * O,
                  P = M * R;
                if (8 == l) for (var H = 0; H < R; H++) C[_ + H] = F[P + H];
                else if (4 == l)
                  for (var H = 0; H < R; H++)
                    C[_ + (H >> 1)] |= F[P + H] << (4 - 4 * (1 & H));
                else if (2 == l)
                  for (var H = 0; H < R; H++)
                    C[_ + (H >> 2)] |= F[P + H] << (6 - 2 * (3 & H));
                else if (1 == l)
                  for (var H = 0; H < R; H++)
                    C[_ + (H >> 3)] |= F[P + H] << (7 - 1 * (7 & H));
              }
              (D = C), (o = 3), (L = 1);
            } else if (0 == c && 1 == v.length) {
              for (
                var C = new Uint8Array(R * N * 3), j = R * N, _ = 0;
                _ < j;
                _++
              ) {
                var E = 3 * _,
                  q = 4 * _;
                (C[E] = D[q]), (C[E + 1] = D[q + 1]), (C[E + 2] = D[q + 2]);
              }
              (D = C), (o = 2), (L = 3), (O = 3 * R);
            }
            (S.img = D), (S.bpl = O), (S.bpp = L);
          }
          return { ctype: o, depth: l, plte: b, frames: v };
        }),
        (e.encode.framize = function (t, r, a, n, i) {
          for (var s = [], o = 0; o < t.length; o++) {
            var l = new Uint8Array(t[o]),
              f = new Uint32Array(l.buffer),
              h = 0,
              d = 0,
              u = r,
              _ = a,
              c = 0;
            if (0 == o || i) l = l.slice(0);
            else {
              for (
                var p = n || 1 == o || 2 == s[s.length - 2].dispose ? 1 : 2,
                  v = 0,
                  g = 1e9,
                  b = 0;
                b < p;
                b++
              ) {
                for (
                  var w = new Uint8Array(t[o - 1 - b]),
                    m = new Uint32Array(t[o - 1 - b]),
                    y = r,
                    k = a,
                    x = -1,
                    z = -1,
                    E = 0;
                  E < a;
                  E++
                )
                  for (var A = 0; A < r; A++) {
                    var S = E * r + A;
                    f[S] != m[S] &&
                      (A < y && (y = A),
                      A > x && (x = A),
                      E < k && (k = E),
                      E > z && (z = E));
                  }
                var I = -1 == x ? 1 : (x - y + 1) * (z - k + 1);
                I < g &&
                  ((g = I),
                  (v = b),
                  -1 == x
                    ? ((h = d = 0), (u = _ = 1))
                    : ((h = y), (d = k), (u = x - y + 1), (_ = z - k + 1)));
              }
              var w = new Uint8Array(t[o - 1 - v]);
              1 == v && (s[s.length - 1].dispose = 2);
              var R = new Uint8Array(u * _ * 4);
              e._copyTile(w, r, a, R, u, _, -h, -d, 0),
                e._copyTile(l, r, a, R, u, _, -h, -d, 3)
                  ? (e._copyTile(l, r, a, R, u, _, -h, -d, 2), (c = 1))
                  : (e._copyTile(l, r, a, R, u, _, -h, -d, 0), (c = 0)),
                (l = R);
            }
            s.push({
              rect: { x: h, y: d, width: u, height: _ },
              img: l,
              blend: c,
              dispose: i ? 1 : 0,
            });
          }
          return s;
        }),
        (e.encode._filterZero = function (r, a, n, i, s, o) {
          if (-1 != o) {
            for (var l = 0; l < a; l++) e.encode._filterLine(s, r, l, i, n, o);
            return t.deflate(s);
          }
          for (var f = [], h = 0; h < 5; h++)
            if (!(a * i > 5e5) || (2 != h && 3 != h && 4 != h)) {
              for (var l = 0; l < a; l++)
                e.encode._filterLine(s, r, l, i, n, h);
              if ((f.push(t.deflate(s)), 1 == n)) break;
            }
          for (var d, u = 1e9, _ = 0; _ < f.length; _++)
            f[_].length < u && ((d = _), (u = f[_].length));
          return f[d];
        }),
        (e.encode._filterLine = function (t, r, a, n, i, s) {
          var o = a * n,
            l = o + a,
            f = e.decode._paeth;
          if (((t[l] = s), l++, 0 == s))
            for (var h = 0; h < n; h++) t[l + h] = r[o + h];
          else if (1 == s) {
            for (var h = 0; h < i; h++) t[l + h] = r[o + h];
            for (var h = i; h < n; h++)
              t[l + h] = (r[o + h] - r[o + h - i] + 256) & 255;
          } else if (0 == a) {
            for (var h = 0; h < i; h++) t[l + h] = r[o + h];
            if (2 == s) for (var h = i; h < n; h++) t[l + h] = r[o + h];
            if (3 == s)
              for (var h = i; h < n; h++)
                t[l + h] = (r[o + h] - (r[o + h - i] >> 1) + 256) & 255;
            if (4 == s)
              for (var h = i; h < n; h++)
                t[l + h] = (r[o + h] - f(r[o + h - i], 0, 0) + 256) & 255;
          } else {
            if (2 == s)
              for (var h = 0; h < n; h++)
                t[l + h] = (r[o + h] + 256 - r[o + h - n]) & 255;
            if (3 == s) {
              for (var h = 0; h < i; h++)
                t[l + h] = (r[o + h] + 256 - (r[o + h - n] >> 1)) & 255;
              for (var h = i; h < n; h++)
                t[l + h] =
                  (r[o + h] + 256 - ((r[o + h - n] + r[o + h - i]) >> 1)) & 255;
            }
            if (4 == s) {
              for (var h = 0; h < i; h++)
                t[l + h] = (r[o + h] + 256 - f(0, r[o + h - n], 0)) & 255;
              for (var h = i; h < n; h++)
                t[l + h] =
                  (r[o + h] +
                    256 -
                    f(r[o + h - i], r[o + h - n], r[o + h - i - n])) &
                  255;
            }
          }
        }),
        (e.crc = {
          table: (function () {
            for (var e = new Uint32Array(256), t = 0; t < 256; t++) {
              for (var r = t, a = 0; a < 8; a++)
                1 & r ? (r = 3988292384 ^ (r >>> 1)) : (r >>>= 1);
              e[t] = r;
            }
            return e;
          })(),
          update: function (t, r, a, n) {
            for (var i = 0; i < n; i++)
              t = e.crc.table[255 & (t ^ r[a + i])] ^ (t >>> 8);
            return t;
          },
          crc: function (t, r, a) {
            return 4294967295 ^ e.crc.update(4294967295, t, r, a);
          },
        }),
        (e.quantize = function (t, r) {
          for (
            var a = new Uint8Array(t),
              n = a.slice(0),
              i = new Uint32Array(n.buffer),
              s = e.quantize.getKDtree(n, r),
              o = s[0],
              l = s[1],
              f = (e.quantize.planeDst, a),
              h = i,
              d = f.length,
              u = new Uint8Array(a.length >> 2),
              _ = 0;
            _ < d;
            _ += 4
          ) {
            var c = f[_] * (1 / 255),
              p = f[_ + 1] * (1 / 255),
              v = f[_ + 2] * (1 / 255),
              g = f[_ + 3] * (1 / 255),
              b = e.quantize.getNearest(o, c, p, v, g);
            (u[_ >> 2] = b.ind), (h[_ >> 2] = b.est.rgba);
          }
          return { abuf: n.buffer, inds: u, plte: l };
        }),
        (e.quantize.getKDtree = function (t, r, a) {
          null == a && (a = 1e-4);
          var n = new Uint32Array(t.buffer),
            i = {
              i0: 0,
              i1: t.length,
              bst: null,
              est: null,
              tdst: 0,
              left: null,
              right: null,
            };
          (i.bst = e.quantize.stats(t, i.i0, i.i1)),
            (i.est = e.quantize.estats(i.bst));
          for (var s = [i]; s.length < r; ) {
            for (var o = 0, l = 0, f = 0; f < s.length; f++)
              s[f].est.L > o && ((o = s[f].est.L), (l = f));
            if (o < a) break;
            var h = s[l],
              d = e.quantize.splitPixels(
                t,
                n,
                h.i0,
                h.i1,
                h.est.e,
                h.est.eMq255
              );
            if (h.i0 >= d || h.i1 <= d) h.est.L = 0;
            else {
              var u = {
                i0: h.i0,
                i1: d,
                bst: null,
                est: null,
                tdst: 0,
                left: null,
                right: null,
              };
              (u.bst = e.quantize.stats(t, u.i0, u.i1)),
                (u.est = e.quantize.estats(u.bst));
              var _ = {
                i0: d,
                i1: h.i1,
                bst: null,
                est: null,
                tdst: 0,
                left: null,
                right: null,
              };
              _.bst = { R: [], m: [], N: h.bst.N - u.bst.N };
              for (var f = 0; f < 16; f++) _.bst.R[f] = h.bst.R[f] - u.bst.R[f];
              for (var f = 0; f < 4; f++) _.bst.m[f] = h.bst.m[f] - u.bst.m[f];
              (_.est = e.quantize.estats(_.bst)),
                (h.left = u),
                (h.right = _),
                (s[l] = u),
                s.push(_);
            }
          }
          s.sort(function (e, t) {
            return t.bst.N - e.bst.N;
          });
          for (var f = 0; f < s.length; f++) s[f].ind = f;
          return [i, s];
        }),
        (e.quantize.getNearest = function (t, r, a, n, i) {
          if (null == t.left)
            return (t.tdst = e.quantize.dist(t.est.q, r, a, n, i)), t;
          var s = e.quantize.planeDst(t.est, r, a, n, i),
            o = t.left,
            l = t.right;
          s > 0 && ((o = t.right), (l = t.left));
          var f = e.quantize.getNearest(o, r, a, n, i);
          if (f.tdst <= s * s) return f;
          var h = e.quantize.getNearest(l, r, a, n, i);
          return h.tdst < f.tdst ? h : f;
        }),
        (e.quantize.planeDst = function (e, t, r, a, n) {
          var i = e.e;
          return i[0] * t + i[1] * r + i[2] * a + i[3] * n - e.eMq;
        }),
        (e.quantize.dist = function (e, t, r, a, n) {
          var i = t - e[0],
            s = r - e[1],
            o = a - e[2],
            l = n - e[3];
          return i * i + s * s + o * o + l * l;
        }),
        (e.quantize.splitPixels = function (t, r, a, n, i, s) {
          var o = e.quantize.vecDot;
          for (n -= 4; a < n; ) {
            for (; o(t, a, i) <= s; ) a += 4;
            for (; o(t, n, i) > s; ) n -= 4;
            if (a >= n) break;
            var l = r[a >> 2];
            (r[a >> 2] = r[n >> 2]), (r[n >> 2] = l), (a += 4), (n -= 4);
          }
          for (; o(t, a, i) > s; ) a -= 4;
          return a + 4;
        }),
        (e.quantize.vecDot = function (e, t, r) {
          return (
            e[t] * r[0] + e[t + 1] * r[1] + e[t + 2] * r[2] + e[t + 3] * r[3]
          );
        }),
        (e.quantize.stats = function (e, t, r) {
          for (
            var a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              n = [0, 0, 0, 0],
              i = (r - t) >> 2,
              s = t;
            s < r;
            s += 4
          ) {
            var o = e[s] * (1 / 255),
              l = e[s + 1] * (1 / 255),
              f = e[s + 2] * (1 / 255),
              h = e[s + 3] * (1 / 255);
            (n[0] += o),
              (n[1] += l),
              (n[2] += f),
              (n[3] += h),
              (a[0] += o * o),
              (a[1] += o * l),
              (a[2] += o * f),
              (a[3] += o * h),
              (a[5] += l * l),
              (a[6] += l * f),
              (a[7] += l * h),
              (a[10] += f * f),
              (a[11] += f * h),
              (a[15] += h * h);
          }
          return (
            (a[4] = a[1]),
            (a[8] = a[2]),
            (a[9] = a[6]),
            (a[12] = a[3]),
            (a[13] = a[7]),
            (a[14] = a[11]),
            { R: a, m: n, N: i }
          );
        }),
        (e.quantize.estats = function (t) {
          var r = t.R,
            a = t.m,
            n = t.N,
            i = a[0],
            s = a[1],
            o = a[2],
            l = a[3],
            f = 0 == n ? 0 : 1 / n,
            h = [
              r[0] - i * i * f,
              r[1] - i * s * f,
              r[2] - i * o * f,
              r[3] - i * l * f,
              r[4] - s * i * f,
              r[5] - s * s * f,
              r[6] - s * o * f,
              r[7] - s * l * f,
              r[8] - o * i * f,
              r[9] - o * s * f,
              r[10] - o * o * f,
              r[11] - o * l * f,
              r[12] - l * i * f,
              r[13] - l * s * f,
              r[14] - l * o * f,
              r[15] - l * l * f,
            ],
            d = h,
            u = e.M4,
            _ = [0.5, 0.5, 0.5, 0.5],
            c = 0,
            p = 0;
          if (0 != n)
            for (
              var v = 0;
              v < 10 &&
              ((_ = u.multVec(d, _)),
              (p = Math.sqrt(u.dot(_, _))),
              (_ = u.sml(1 / p, _)),
              !(Math.abs(p - c) < 1e-9));
              v++
            )
              c = p;
          var g = [i * f, s * f, o * f, l * f];
          return {
            Cov: h,
            q: g,
            e: _,
            L: c,
            eMq255: u.dot(u.sml(255, g), _),
            eMq: u.dot(_, g),
            rgba:
              ((Math.round(255 * g[3]) << 24) |
                (Math.round(255 * g[2]) << 16) |
                (Math.round(255 * g[1]) << 8) |
                (Math.round(255 * g[0]) << 0)) >>>
              0,
          };
        }),
        (e.M4 = {
          multVec: function (e, t) {
            return [
              e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3],
              e[4] * t[0] + e[5] * t[1] + e[6] * t[2] + e[7] * t[3],
              e[8] * t[0] + e[9] * t[1] + e[10] * t[2] + e[11] * t[3],
              e[12] * t[0] + e[13] * t[1] + e[14] * t[2] + e[15] * t[3],
            ];
          },
          dot: function (e, t) {
            return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3];
          },
          sml: function (e, t) {
            return [e * t[0], e * t[1], e * t[2], e * t[3]];
          },
        }),
        (e.encode.concatRGBA = function (e, t) {
          for (var r = 0, a = 0; a < e.length; a++) r += e[a].byteLength;
          for (var n = new Uint8Array(r), i = 0, a = 0; a < e.length; a++) {
            for (
              var s = new Uint8Array(e[a]), o = s.length, l = 0;
              l < o;
              l += 4
            ) {
              var f = s[l],
                h = s[l + 1],
                d = s[l + 2],
                u = s[l + 3];
              t && (u = 0 == (128 & u) ? 0 : 255),
                0 == u && (f = h = d = 0),
                (n[i + l] = f),
                (n[i + l + 1] = h),
                (n[i + l + 2] = d),
                (n[i + l + 3] = u);
            }
            i += o;
          }
          return n.buffer;
        });
    })(xi, ki),
    (function () {
      function t(e, t) {
        var r = this;
        (r.esource = e), (r.resources = t), r.init();
      }
      return (
        (t.prototype.init = function () {
          var e = this,
            t = e.esource,
            r = e.resources;
          (e.temp = { events: {} }),
            (e.__attr = { autoPlay: !0, loop: 0 }),
            (e.__method = { play: e.play }),
            (e.__status = { status: "init", frame: 0, loops: 0, time: 0 }),
            (e.ticker = new PIXI.Ticker()),
            e.ticker.stop(),
            (e.sprite = this.createSprite(t, r));
        }),
        (t.prototype.play = function (e, t) {
          var r = this;
          if (!r.textures.length) throw new Error("没有可用的textures");
          if (1 !== r.textures.length) {
            var a = r.__status,
              n = r.__attr,
              i = 0;
            "stop" === a.status && (a.loops = 0),
              (e = "number" == typeof e ? e : n.loop),
              (r.temp.loop = e),
              (n.loop = e),
              r.temp.tickerIsAdd ||
                (r.ticker.add(function (e) {
                  var n = PIXI.Ticker.shared.elapsedMS;
                  (i += n) > r.framesDelay[a.frame] &&
                    (a.frame++,
                    (a.status = "playing"),
                    a.frame > r.textures.length - 1 &&
                      ((a.frame = 0),
                      a.loops++,
                      r.temp.loop > 0 &&
                        a.loops >= r.temp.loop &&
                        ("function" == typeof t && t(a),
                        (a.status = "played"),
                        r.runEvent("played", a),
                        r.stop())),
                    (r.sprite.texture = r.textures[a.frame]),
                    (i = 0),
                    r.runEvent("playing", a));
                }),
                (r.temp.tickerIsAdd = !0)),
              r.ticker.start();
          }
        }),
        (t.prototype.pause = function () {
          var e = this,
            t = e.__status;
          e.ticker.stop(), (t.status = "pause"), e.runEvent("pause", t);
        }),
        (t.prototype.stop = function () {
          var e = this,
            t = e.__status;
          e.ticker.stop(), (t.status = "stop"), e.runEvent("stop", t);
        }),
        (t.prototype.jumpToFrame = function (e) {
          var t = this,
            r = t.textures;
          if (!r.length) throw new Error("没有可用的textures");
          var a = t.__status;
          "number" ==
            typeof (e = e < 0 ? 0 : e > r.length - 1 ? r.length - 1 : e) &&
            ((t.sprite.texture = r[e]), (a.frame = e));
        }),
        (t.prototype.getDuration = function () {
          var e = this,
            t = e.framesDelay;
          if (!t.length) throw new Error("未找到图片帧时间");
          for (var r = 0, a = 0, n = t.length; a < n; a++) r += t[a];
          return r;
        }),
        (t.prototype.getFramesLength = function () {
          var e = this;
          if (!e.textures.length) throw new Error("没有可用的textures");
          return e.textures.length;
        }),
        (t.prototype.on = function (e, t) {
          var r = this;
          switch (e) {
            case "playing":
            case "played":
            case "pause":
            case "stop":
              r.temp.events[e] = t;
              break;
            default:
              throw new Error("无效的事件");
          }
        }),
        (t.prototype.runEvent = function (e, t) {
          var r = this.temp;
          "function" == typeof r.events[e] && r.events[e](t);
        }),
        (t.prototype.createSprite = function (e, t) {
          var r = this,
            a = PIXI.Sprite,
            n = e,
            i = Re(n.toLocaleLowerCase());
          return (
            (i = "gif" === i || "png" === i ? i : "other"),
            {
              gif: function () {
                var e = r.gifResourceToTextures(t[n]);
                return (
                  (r.textures = e.textures),
                  (r.framesDelay = e.delayTimes),
                  r.play(),
                  new a(r.textures[0])
                );
              },
              png: function () {
                var e = r.apngResourceToTextures(t[n]);
                return (
                  (r.textures = e.textures),
                  (r.framesDelay = e.delayTimes),
                  r.play(),
                  new a(r.textures[0])
                );
              },
              other: function () {
                return (r.textures = [t[n].texture]), new a(t[n].texture);
              },
            }[i]()
          );
        }),
        (t.prototype.apngResourceToTextures = function (e) {
          var t,
            r,
            a,
            n,
            i = { delayTimes: [], textures: [] },
            s = new Uint8Array(e.data),
            o = xi.decode(s),
            l = xi.toRGBA8(o),
            f = o.width,
            h = o.height;
          o.frames.length;
          o.frames.forEach(function (e, t) {
            i.delayTimes.push(e.delay);
          });
          for (var d = 0, u = l.length; d < u; d++) {
            var _ = l[d],
              c = new Uint8ClampedArray(_);
            (r = document.createElement("canvas")),
              (r.width = f),
              (r.height = h),
              (a = r.getContext("2d")),
              (t = new PIXI.BaseTexture.from(r)),
              (n = a.createImageData(f, h)),
              n.data.set(c),
              a.putImageData(n, 0, 0),
              i.textures.push(
                new PIXI.Texture(t, new PIXI.Rectangle(0, 0, f, h))
              );
          }
          return i;
        }),
        (t.prototype.gifResourceToTextures = function (t) {
          for (
            var r,
              a,
              n,
              i,
              s,
              o = { delayTimes: [], textures: [] },
              l = new Uint8Array(t.data),
              f = new e(l),
              h = f.width,
              d = f.height,
              u = f.numFrames(),
              _ = 0;
            _ < u;
            _++
          )
            (r = f.frameInfo(_)),
              o.delayTimes.push(10 * r.delay),
              (n = document.createElement("canvas")),
              (n.width = h),
              (n.height = d),
              (i = n.getContext("2d")),
              (s = i.createImageData(h, d)),
              f.decodeAndBlitFrameRGBA(_, s.data),
              i.putImageData(s, 0, 0),
              (a = new PIXI.BaseTexture.from(n)),
              o.textures.push(
                new PIXI.Texture(a, new PIXI.Rectangle(0, 0, h, d))
              );
          return o;
        }),
        t
      );
    })()
  );
});