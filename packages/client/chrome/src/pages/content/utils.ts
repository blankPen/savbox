export function loadScript(url) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject(new Error(`Failed to load script: ${url}`));
    };
    document.head.appendChild(script);
  });
}

export function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getHash(n, length = 32) {
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

const defaultStyle = {
  accentColor: "auto",
  additiveSymbols: "",
  alignContent: "normal",
  alignItems: "normal",
  alignSelf: "auto",
  alignmentBaseline: "auto",
  all: "",
  animation: "none 0s ease 0s 1 normal none running",
  animationComposition: "replace",
  animationDelay: "0s",
  animationDirection: "normal",
  animationDuration: "0s",
  animationFillMode: "none",
  animationIterationCount: "1",
  animationName: "none",
  animationPlayState: "running",
  animationTimingFunction: "ease",
  appRegion: "none",
  appearance: "none",
  ascentOverride: "",
  aspectRatio: "auto",
  backdropFilter: "none",
  backfaceVisibility: "visible",
  background:
    "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box",
  backgroundAttachment: "scroll",
  backgroundBlendMode: "normal",
  backgroundClip: "border-box",
  backgroundColor: "rgba(0, 0, 0, 0)",
  backgroundImage: "none",
  backgroundOrigin: "padding-box",
  backgroundPosition: "0% 0%",
  backgroundPositionX: "0%",
  backgroundPositionY: "0%",
  backgroundRepeat: "repeat",
  backgroundRepeatX: "repeat",
  backgroundRepeatY: "repeat",
  backgroundSize: "auto",
  basePalette: "",
  baselineShift: "0px",
  baselineSource: "auto",
  blockSize: "0px",
  border: "0px none rgb(0, 0, 0)",
  borderBlock: "0px none rgb(0, 0, 0)",
  borderBlockColor: "rgb(0, 0, 0)",
  borderBlockEnd: "0px none rgb(0, 0, 0)",
  borderBlockEndColor: "rgb(0, 0, 0)",
  borderBlockEndStyle: "none",
  borderBlockEndWidth: "0px",
  borderBlockStart: "0px none rgb(0, 0, 0)",
  borderBlockStartColor: "rgb(0, 0, 0)",
  borderBlockStartStyle: "none",
  borderBlockStartWidth: "0px",
  borderBlockStyle: "none",
  borderBlockWidth: "0px",
  borderBottom: "0px none rgb(0, 0, 0)",
  borderBottomColor: "rgb(0, 0, 0)",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
  borderBottomStyle: "none",
  borderBottomWidth: "0px",
  borderCollapse: "separate",
  borderColor: "rgb(0, 0, 0)",
  borderEndEndRadius: "0px",
  borderEndStartRadius: "0px",
  borderImage: "none",
  borderImageOutset: "0",
  borderImageRepeat: "stretch",
  borderImageSlice: "100%",
  borderImageSource: "none",
  borderImageWidth: "1",
  borderInline: "0px none rgb(0, 0, 0)",
  borderInlineColor: "rgb(0, 0, 0)",
  borderInlineEnd: "0px none rgb(0, 0, 0)",
  borderInlineEndColor: "rgb(0, 0, 0)",
  borderInlineEndStyle: "none",
  borderInlineEndWidth: "0px",
  borderInlineStart: "0px none rgb(0, 0, 0)",
  borderInlineStartColor: "rgb(0, 0, 0)",
  borderInlineStartStyle: "none",
  borderInlineStartWidth: "0px",
  borderInlineStyle: "none",
  borderInlineWidth: "0px",
  borderLeft: "0px none rgb(0, 0, 0)",
  borderLeftColor: "rgb(0, 0, 0)",
  borderLeftStyle: "none",
  borderLeftWidth: "0px",
  borderRadius: "0px",
  borderRight: "0px none rgb(0, 0, 0)",
  borderRightColor: "rgb(0, 0, 0)",
  borderRightStyle: "none",
  borderRightWidth: "0px",
  borderSpacing: "0px 0px",
  borderStartEndRadius: "0px",
  borderStartStartRadius: "0px",
  borderStyle: "none",
  borderTop: "0px none rgb(0, 0, 0)",
  borderTopColor: "rgb(0, 0, 0)",
  borderTopLeftRadius: "0px",
  borderTopRightRadius: "0px",
  borderTopStyle: "none",
  borderTopWidth: "0px",
  borderWidth: "0px",
  bottom: "auto",
  boxShadow: "none",
  boxSizing: "content-box",
  breakAfter: "auto",
  breakBefore: "auto",
  breakInside: "auto",
  bufferedRendering: "auto",
  captionSide: "top",
  caretColor: "rgb(0, 0, 0)",
  clear: "none",
  clip: "auto",
  clipPath: "none",
  clipRule: "nonzero",
  color: "rgb(0, 0, 0)",
  colorInterpolation: "srgb",
  colorInterpolationFilters: "linearrgb",
  colorRendering: "auto",
  colorScheme: "normal",
  columnCount: "auto",
  columnFill: "balance",
  columnGap: "normal",
  columnRule: "0px none rgb(0, 0, 0)",
  columnRuleColor: "rgb(0, 0, 0)",
  columnRuleStyle: "none",
  columnRuleWidth: "0px",
  columnSpan: "none",
  columnWidth: "auto",
  columns: "auto auto",
  contain: "none",
  containIntrinsicBlockSize: "none",
  containIntrinsicHeight: "none",
  containIntrinsicInlineSize: "none",
  containIntrinsicSize: "none",
  containIntrinsicWidth: "none",
  container: "none",
  containerName: "none",
  containerType: "normal",
  content: "normal",
  contentVisibility: "visible",
  counterIncrement: "none",
  counterReset: "none",
  counterSet: "none",
  cursor: "auto",
  cx: "0px",
  cy: "0px",
  d: "none",
  descentOverride: "",
  direction: "ltr",
  display: "block",
  dominantBaseline: "auto",
  emptyCells: "show",
  fallback: "",
  fill: "rgb(0, 0, 0)",
  fillOpacity: "1",
  fillRule: "nonzero",
  filter: "none",
  flex: "0 1 auto",
  flexBasis: "auto",
  flexDirection: "row",
  flexFlow: "row nowrap",
  flexGrow: "0",
  flexShrink: "1",
  flexWrap: "nowrap",
  float: "none",
  floodColor: "rgb(0, 0, 0)",
  floodOpacity: "1",
  font: '16px "PingFang SC"',
  fontDisplay: "",
  fontFamily: '"PingFang SC"',
  fontFeatureSettings: "normal",
  fontKerning: "auto",
  fontOpticalSizing: "auto",
  fontPalette: "normal",
  fontSize: "16px",
  fontStretch: "100%",
  fontStyle: "normal",
  fontSynthesis: "weight style small-caps",
  fontSynthesisSmallCaps: "auto",
  fontSynthesisStyle: "auto",
  fontSynthesisWeight: "auto",
  fontVariant: "normal",
  fontVariantAlternates: "normal",
  fontVariantCaps: "normal",
  fontVariantEastAsian: "normal",
  fontVariantLigatures: "normal",
  fontVariantNumeric: "normal",
  fontVariationSettings: "normal",
  fontWeight: "400",
  forcedColorAdjust: "auto",
  gap: "normal",
  grid: "none / none / none / row / auto / auto",
  gridArea: "auto / auto / auto / auto",
  gridAutoColumns: "auto",
  gridAutoFlow: "row",
  gridAutoRows: "auto",
  gridColumn: "auto / auto",
  gridColumnEnd: "auto",
  gridColumnGap: "normal",
  gridColumnStart: "auto",
  gridGap: "normal normal",
  gridRow: "auto / auto",
  gridRowEnd: "auto",
  gridRowGap: "normal",
  gridRowStart: "auto",
  gridTemplate: "none / none / none",
  gridTemplateAreas: "none",
  gridTemplateColumns: "none",
  gridTemplateRows: "none",
  height: "0px",
  hyphenateCharacter: "auto",
  hyphenateLimitChars: "auto",
  hyphens: "manual",
  imageOrientation: "from-image",
  imageRendering: "auto",
  inherits: "",
  initialLetter: "normal",
  initialValue: "",
  inlineSize: "0px",
  inset: "auto",
  insetBlock: "auto",
  insetBlockEnd: "auto",
  insetBlockStart: "auto",
  insetInline: "auto",
  insetInlineEnd: "auto",
  insetInlineStart: "auto",
  isolation: "auto",
  justifyContent: "normal",
  justifyItems: "normal",
  justifySelf: "auto",
  left: "auto",
  letterSpacing: "normal",
  lightingColor: "rgb(255, 255, 255)",
  lineBreak: "auto",
  lineGapOverride: "",
  lineHeight: "normal",
  listStyle: "outside none disc",
  listStyleImage: "none",
  listStylePosition: "outside",
  listStyleType: "disc",
  margin: "0px",
  marginBlock: "0px",
  marginBlockEnd: "0px",
  marginBlockStart: "0px",
  marginBottom: "0px",
  marginInline: "0px",
  marginInlineEnd: "0px",
  marginInlineStart: "0px",
  marginLeft: "0px",
  marginRight: "0px",
  marginTop: "0px",
  marker: "none",
  markerEnd: "none",
  markerMid: "none",
  markerStart: "none",
  mask: "none",
  maskType: "luminance",
  mathDepth: "0",
  mathShift: "normal",
  mathStyle: "normal",
  maxBlockSize: "none",
  maxHeight: "none",
  maxInlineSize: "none",
  maxWidth: "none",
  minBlockSize: "0px",
  minHeight: "0px",
  minInlineSize: "0px",
  minWidth: "0px",
  mixBlendMode: "normal",
  negative: "",
  objectFit: "fill",
  objectPosition: "50% 50%",
  objectViewBox: "none",
  offset: "none 0px auto 0deg",
  offsetDistance: "0px",
  offsetPath: "none",
  offsetRotate: "auto 0deg",
  opacity: "1",
  order: "0",
  orphans: "2",
  outline: "rgb(0, 0, 0) none 0px",
  outlineColor: "rgb(0, 0, 0)",
  outlineOffset: "0px",
  outlineStyle: "none",
  outlineWidth: "0px",
  overflow: "visible",
  overflowAnchor: "auto",
  overflowClipMargin: "0px",
  overflowWrap: "normal",
  overflowX: "visible",
  overflowY: "visible",
  overrideColors: "",
  overscrollBehavior: "auto",
  overscrollBehaviorBlock: "auto",
  overscrollBehaviorInline: "auto",
  overscrollBehaviorX: "auto",
  overscrollBehaviorY: "auto",
  pad: "",
  padding: "0px",
  paddingBlock: "0px",
  paddingBlockEnd: "0px",
  paddingBlockStart: "0px",
  paddingBottom: "0px",
  paddingInline: "0px",
  paddingInlineEnd: "0px",
  paddingInlineStart: "0px",
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingTop: "0px",
  page: "auto",
  pageBreakAfter: "auto",
  pageBreakBefore: "auto",
  pageBreakInside: "auto",
  pageOrientation: "",
  paintOrder: "normal",
  perspective: "none",
  perspectiveOrigin: "411.5px 0px",
  placeContent: "normal",
  placeItems: "normal",
  placeSelf: "auto",
  pointerEvents: "auto",
  position: "static",
  prefix: "",
  quotes: "auto",
  r: "0px",
  range: "",
  resize: "none",
  right: "auto",
  rotate: "none",
  rowGap: "normal",
  rubyPosition: "over",
  rx: "auto",
  ry: "auto",
  scale: "none",
  scrollBehavior: "auto",
  scrollMargin: "0px",
  scrollMarginBlock: "0px",
  scrollMarginBlockEnd: "0px",
  scrollMarginBlockStart: "0px",
  scrollMarginBottom: "0px",
  scrollMarginInline: "0px",
  scrollMarginInlineEnd: "0px",
  scrollMarginInlineStart: "0px",
  scrollMarginLeft: "0px",
  scrollMarginRight: "0px",
  scrollMarginTop: "0px",
  scrollPadding: "auto",
  scrollPaddingBlock: "auto",
  scrollPaddingBlockEnd: "auto",
  scrollPaddingBlockStart: "auto",
  scrollPaddingBottom: "auto",
  scrollPaddingInline: "auto",
  scrollPaddingInlineEnd: "auto",
  scrollPaddingInlineStart: "auto",
  scrollPaddingLeft: "auto",
  scrollPaddingRight: "auto",
  scrollPaddingTop: "auto",
  scrollSnapAlign: "none",
  scrollSnapStop: "normal",
  scrollSnapType: "none",
  scrollbarGutter: "auto",
  shapeImageThreshold: "0",
  shapeMargin: "0px",
  shapeOutside: "none",
  shapeRendering: "auto",
  size: "",
  sizeAdjust: "",
  speak: "normal",
  speakAs: "",
  src: "",
  stopColor: "rgb(0, 0, 0)",
  stopOpacity: "1",
  stroke: "none",
  strokeDasharray: "none",
  strokeDashoffset: "0px",
  strokeLinecap: "butt",
  strokeLinejoin: "miter",
  strokeMiterlimit: "4",
  strokeOpacity: "1",
  strokeWidth: "1px",
  suffix: "",
  symbols: "",
  syntax: "",
  system: "",
  tabSize: "8",
  tableLayout: "auto",
  textAlign: "start",
  textAlignLast: "auto",
  textAnchor: "start",
  textCombineUpright: "none",
  textDecoration: "none solid rgb(0, 0, 0)",
  textDecorationColor: "rgb(0, 0, 0)",
  textDecorationLine: "none",
  textDecorationSkipInk: "auto",
  textDecorationStyle: "solid",
  textDecorationThickness: "auto",
  textEmphasis: "none rgb(0, 0, 0)",
  textEmphasisColor: "rgb(0, 0, 0)",
  textEmphasisPosition: "over",
  textEmphasisStyle: "none",
  textIndent: "0px",
  textOrientation: "mixed",
  textOverflow: "clip",
  textRendering: "auto",
  textShadow: "none",
  textSizeAdjust: "auto",
  textTransform: "none",
  textUnderlineOffset: "auto",
  textUnderlinePosition: "auto",
  textWrap: "wrap",
  top: "auto",
  touchAction: "auto",
  transform: "none",
  transformBox: "view-box",
  transformOrigin: "0px 0px",
  transformStyle: "flat",
  transition: "all 0s ease 0s",
  transitionDelay: "0s",
  transitionDuration: "0s",
  transitionProperty: "all",
  transitionTimingFunction: "ease",
  translate: "none",
  unicodeBidi: "normal",
  unicodeRange: "",
  userSelect: "auto",
  vectorEffect: "none",
  verticalAlign: "baseline",
  viewTransitionName: "none",
  visibility: "visible",
  whiteSpace: "normal",
  whiteSpaceCollapse: "collapse",
  widows: "2",
  width: "0px",
  willChange: "auto",
  wordBreak: "normal",
  wordSpacing: "0px",
  wordWrap: "normal",
  writingMode: "horizontal-tb",
  x: "0px",
  y: "0px",
  zIndex: "auto",
  zoom: "1",
};
export function css(element, property) {
  if (
    "path,defs,g,rect,style".split(",").includes(element.tagName.toLowerCase())
  )
    return;
  for (const key in property) {
    if (!defaultStyle[key] || defaultStyle[key] == property[key]) continue;
    element.style[key] = property[key];
  }
}

function urlToBlob2(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    };
    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

export async function urlToBlob(url) {
  try {
    const response = await fetch(url);
    return response.blob();
  } catch (err) {
    return urlToBlob2(url);
  }
}

// Blob 转 Base64
function blobToDataURL(blob) {
  return new Promise((resolve) => {
    let a = new FileReader();
    a.onload = function (e) {
      resolve(e.target.result);
    };
    a.readAsDataURL(blob);
  });
}

export async function urlToLink(url) {
  try {
    const blob = (await urlToBlob(url)) as Blob;
    const name = getHash(url);
    // const file = new File([blob], name, { type: blob.type });
    const res = await uploadFile({
      Bucket: "images-1318918047" /* 填写自己的 bucket，必须字段 */,
      Region: "ap-beijing" /* 存储桶所在地域，必须字段 */,
      Key: `images/${name}` /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
      //   Body: file, // 上传文件对象
      file: {
        base64: await blobToDataURL(blob),
        type: blob.type,
      },
    });
    return `https://${res.Location}`;
  } catch (err) {
    console.info(url, err);
    return url;
  }
}

export const deepClone = async (host, filter) => {
  const cloneNode = async (node, parent) => {
    if (filter && filter(node) === false) return;
    const walkTree = async (nextn, nextp) => {
      while (nextn) {
        await cloneNode(nextn, nextp);
        nextn = nextn.nextSibling;
      }
    };

    const clone = node.cloneNode();
    if (clone.nodeType === Node.ELEMENT_NODE) {
      Array.from(clone.attributes).forEach((v: any) => {
        v.name.startsWith("data-") && v.ownerElement.removeAttribute(v.name);
      });
      if (clone.tagName === "IMG" && clone.src.startsWith("http")) {
        clone.src = await urlToLink(clone.src);
      }
      css(clone, window.getComputedStyle(node));
    }
    parent.appendChild(clone);
    if (node.shadowRoot) {
      await walkTree(
        node.shadowRoot.firstChild,
        clone
        // clone.attachShadow({ mode: "open" })
      );
    }

    await walkTree(node.firstChild, clone);
  };

  const fragment = document.createDocumentFragment();
  await cloneNode(host, fragment);
  return fragment.firstChild;
};

// 使用bezier实现scrollTo
export function scrollTo(dom, offset, duration = 500) {
  const initialX = dom.scrollLeft;
  const initialY = dom.scrollTop;
  const differenceX = Math.min(offset.x, dom.scrollWidth) - initialX;
  const differenceY = Math.min(offset.y, dom.scrollHeight) - initialY;
  // const easing = bezier(0.165, 0.84, 0.44, 1);
  let start;
  var cb;
  let p = new Promise((resolve) => (cb = resolve));
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);

    // console.log(dom, percent, {
    //     x: initialX + differenceX * percent,
    //     y: initialY + differenceY * percent,
    // })
    dom.scrollTo({
      top: initialY + differenceY * percent,
      left: initialX + differenceX * percent,
    });

    if (time < duration) {
      window.requestAnimationFrame(step);
    } else {
      cb();
    }
  });
  return p;
}

function sendEvent(type: string, data?: any) {
  return new Promise<any>((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        type,
        data,
        from: "content",
      },
      (response) => {
        console.log("content.js收到background.js信息", response);
        if (response?.error) reject(response.error);
        else resolve(response?.data);
      }
    );
  });
}

export async function uploadFile(opt: any) {
  return sendEvent("uploadFile", opt);
}

export async function checkOptions() {
  return sendEvent("checkOptions");
}
