export function hash(n, length = 32) {
  if (!n) return "";
  //@ts-ignore
  var md5 = (n) => {
    function e(n, t) {
      var f, e, r, u, i;
      return (
        (r = n & 2147483648),
        (u = t & 2147483648),
        (f = n & 1073741824),
        (e = t & 1073741824),
        (i = (n & 1073741823) + (t & 1073741823)),
        f & e
          ? i ^ 2147483648 ^ r ^ u
          : f | e
          ? i & 1073741824
            ? i ^ 3221225472 ^ r ^ u
            : i ^ 1073741824 ^ r ^ u
          : i ^ r ^ u
      );
    }
    function o(n, t, i, r, u, f, o) {
      return (
        (n = e(n, e(e((t & i) | (~t & r), u), o))),
        e((n << f) | (n >>> (32 - f)), t)
      );
    }
    function s(n, t, i, r, u, f, o) {
      return (
        (n = e(n, e(e((t & r) | (i & ~r), u), o))),
        e((n << f) | (n >>> (32 - f)), t)
      );
    }
    function h(n, t, i, r, u, f, o) {
      return (
        (n = e(n, e(e(t ^ i ^ r, u), o))), e((n << f) | (n >>> (32 - f)), t)
      );
    }
    function c(n, t, i, r, u, f, o) {
      return (
        (n = e(n, e(e(i ^ (t | ~r), u), o))), e((n << f) | (n >>> (32 - f)), t)
      );
    }
    function l(n) {
      for (var r = "", t: any = "", i = 0; 3 >= i; i++)
        (t = (n >>> (8 * i)) & 255),
          (t = "0" + t.toString(16)),
          (r += t.substr(t.length - 2, 2));
      return r;
    }
    var f = [],
      a,
      v,
      y,
      p,
      t,
      i,
      r,
      u;
    for (
      n = (function (n) {
        var i, r, t;
        for (n = n.replace(/\r\n/g, "\n"), i = "", r = 0; r < n.length; r++)
          (t = n.charCodeAt(r)),
            128 > t
              ? (i += String.fromCharCode(t))
              : (127 < t && 2048 > t
                  ? (i += String.fromCharCode((t >> 6) | 192))
                  : ((i += String.fromCharCode((t >> 12) | 224)),
                    (i += String.fromCharCode(((t >> 6) & 63) | 128))),
                (i += String.fromCharCode((t & 63) | 128)));
        return i;
      })(n),
        f = (function (n) {
          var i,
            u = n.length;
          i = u + 8;
          for (
            var f = 16 * ((i - (i % 64)) / 64 + 1),
              r = Array(f - 1),
              e = 0,
              t = 0;
            t < u;

          )
            (i = (t - (t % 4)) / 4),
              (e = (t % 4) * 8),
              (r[i] |= n.charCodeAt(t) << e),
              t++;
          return (
            (i = (t - (t % 4)) / 4),
            (r[i] |= 128 << ((t % 4) * 8)),
            (r[f - 2] = u << 3),
            (r[f - 1] = u >>> 29),
            r
          );
        })(n),
        t = 1732584193,
        i = 4023233417,
        r = 2562383102,
        u = 271733878,
        n = 0;
      n < f.length;
      n += 16
    )
      (a = t),
        (v = i),
        (y = r),
        (p = u),
        (t = o(t, i, r, u, f[n + 0], 7, 3614090360)),
        (u = o(u, t, i, r, f[n + 1], 12, 3905402710)),
        (r = o(r, u, t, i, f[n + 2], 17, 606105819)),
        (i = o(i, r, u, t, f[n + 3], 22, 3250441966)),
        (t = o(t, i, r, u, f[n + 4], 7, 4118548399)),
        (u = o(u, t, i, r, f[n + 5], 12, 1200080426)),
        (r = o(r, u, t, i, f[n + 6], 17, 2821735955)),
        (i = o(i, r, u, t, f[n + 7], 22, 4249261313)),
        (t = o(t, i, r, u, f[n + 8], 7, 1770035416)),
        (u = o(u, t, i, r, f[n + 9], 12, 2336552879)),
        (r = o(r, u, t, i, f[n + 10], 17, 4294925233)),
        (i = o(i, r, u, t, f[n + 11], 22, 2304563134)),
        (t = o(t, i, r, u, f[n + 12], 7, 1804603682)),
        (u = o(u, t, i, r, f[n + 13], 12, 4254626195)),
        (r = o(r, u, t, i, f[n + 14], 17, 2792965006)),
        (i = o(i, r, u, t, f[n + 15], 22, 1236535329)),
        (t = s(t, i, r, u, f[n + 1], 5, 4129170786)),
        (u = s(u, t, i, r, f[n + 6], 9, 3225465664)),
        (r = s(r, u, t, i, f[n + 11], 14, 643717713)),
        (i = s(i, r, u, t, f[n + 0], 20, 3921069994)),
        (t = s(t, i, r, u, f[n + 5], 5, 3593408605)),
        (u = s(u, t, i, r, f[n + 10], 9, 38016083)),
        (r = s(r, u, t, i, f[n + 15], 14, 3634488961)),
        (i = s(i, r, u, t, f[n + 4], 20, 3889429448)),
        (t = s(t, i, r, u, f[n + 9], 5, 568446438)),
        (u = s(u, t, i, r, f[n + 14], 9, 3275163606)),
        (r = s(r, u, t, i, f[n + 3], 14, 4107603335)),
        (i = s(i, r, u, t, f[n + 8], 20, 1163531501)),
        (t = s(t, i, r, u, f[n + 13], 5, 2850285829)),
        (u = s(u, t, i, r, f[n + 2], 9, 4243563512)),
        (r = s(r, u, t, i, f[n + 7], 14, 1735328473)),
        (i = s(i, r, u, t, f[n + 12], 20, 2368359562)),
        (t = h(t, i, r, u, f[n + 5], 4, 4294588738)),
        (u = h(u, t, i, r, f[n + 8], 11, 2272392833)),
        (r = h(r, u, t, i, f[n + 11], 16, 1839030562)),
        (i = h(i, r, u, t, f[n + 14], 23, 4259657740)),
        (t = h(t, i, r, u, f[n + 1], 4, 2763975236)),
        (u = h(u, t, i, r, f[n + 4], 11, 1272893353)),
        (r = h(r, u, t, i, f[n + 7], 16, 4139469664)),
        (i = h(i, r, u, t, f[n + 10], 23, 3200236656)),
        (t = h(t, i, r, u, f[n + 13], 4, 681279174)),
        (u = h(u, t, i, r, f[n + 0], 11, 3936430074)),
        (r = h(r, u, t, i, f[n + 3], 16, 3572445317)),
        (i = h(i, r, u, t, f[n + 6], 23, 76029189)),
        (t = h(t, i, r, u, f[n + 9], 4, 3654602809)),
        (u = h(u, t, i, r, f[n + 12], 11, 3873151461)),
        (r = h(r, u, t, i, f[n + 15], 16, 530742520)),
        (i = h(i, r, u, t, f[n + 2], 23, 3299628645)),
        (t = c(t, i, r, u, f[n + 0], 6, 4096336452)),
        (u = c(u, t, i, r, f[n + 7], 10, 1126891415)),
        (r = c(r, u, t, i, f[n + 14], 15, 2878612391)),
        (i = c(i, r, u, t, f[n + 5], 21, 4237533241)),
        (t = c(t, i, r, u, f[n + 12], 6, 1700485571)),
        (u = c(u, t, i, r, f[n + 3], 10, 2399980690)),
        (r = c(r, u, t, i, f[n + 10], 15, 4293915773)),
        (i = c(i, r, u, t, f[n + 1], 21, 2240044497)),
        (t = c(t, i, r, u, f[n + 8], 6, 1873313359)),
        (u = c(u, t, i, r, f[n + 15], 10, 4264355552)),
        (r = c(r, u, t, i, f[n + 6], 15, 2734768916)),
        (i = c(i, r, u, t, f[n + 13], 21, 1309151649)),
        (t = c(t, i, r, u, f[n + 4], 6, 4149444226)),
        (u = c(u, t, i, r, f[n + 11], 10, 3174756917)),
        (r = c(r, u, t, i, f[n + 2], 15, 718787259)),
        (i = c(i, r, u, t, f[n + 9], 21, 3951481745)),
        (t = e(t, a)),
        (i = e(i, v)),
        (r = e(r, y)),
        (u = e(u, p));
    return (l(t) + l(i) + l(r) + l(u)).toLowerCase();
  };
  const resHash = md5(n).slice(0, +length);

  return /[0-9]/.test(resHash.charAt(0))
    ? String.fromCharCode(+resHash.charAt(0) + 97) + resHash.substring(1)
    : resHash;
}
