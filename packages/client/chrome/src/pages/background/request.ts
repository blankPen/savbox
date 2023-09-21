var stringifyPrimitive = function (v) {
  switch (typeof v) {
    case "string":
      return v;
    case "boolean":
      return v ? "true" : "false";
    case "number":
      return isFinite(v) ? v : "";
    default:
      return "";
  }
};

var queryStringify = function (obj, sep?, eq?, name?) {
  sep = sep || "&";
  eq = eq || "=";
  if (obj === null) {
    obj = undefined;
  }
  if (typeof obj === "object") {
    return Object.keys(obj)
      .map(function (k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (Array.isArray(obj[k])) {
          return obj[k]
            .map(function (v) {
              return ks + encodeURIComponent(stringifyPrimitive(v));
            })
            .join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      })
      .filter(Boolean)
      .join(sep);
  }
  if (!name) return "";
  return (
    encodeURIComponent(stringifyPrimitive(name)) +
    eq +
    encodeURIComponent(stringifyPrimitive(obj))
  );
};

var request = function (opt, callback) {
  // method
  var method = (opt.method || "GET").toUpperCase();

  // url、qs
  var url = opt.url;
  if (opt.qs) {
    var qsStr = queryStringify(opt.qs);
    if (qsStr) {
      url += (url.indexOf("?") === -1 ? "?" : "&") + qsStr;
    }
  }

  fetch(url, {
    method,
    body: opt.body,
    headers: opt.headers,
  })
    .then(async (res) => {
      let body;
      if (opt.dataType === "text" || !opt.dataType) {
        body = await res.text();
      } else if (opt.dataType === "json") {
        body = await res.json();
      } else if (opt.dataType === "arraybuffer") {
        body = await res.arrayBuffer();
      } else if (opt.dataType === "blob") {
        body = await res.blob();
      } else {
        body = await res.text();
      }
      callback({
        error: null,
        statusCode: res.status,
        statusMessage: res.statusText,
        headers: res.headers,
        body,
      });
    })
    .catch((error) => {
      callback({
        error: null,
        statusCode: 400,
        statusMessage: error.message,
        headers: {},
        body: "",
      });
    });

  //   // 创建 ajax 实例
  //   var xhr = new XMLHttpRequest();
  //   xhr.open(method, url, true);
  //   xhr.responseType = opt.dataType || "text";

  // 处理 xhrFields 属性
  //   if (opt.xhrFields) {
  //     for (var xhrField in opt.xhrFields) {
  //       xhr[xhrField] = opt.xhrFields[xhrField];
  //     }
  //   }

  // 处理 headers
  //   var headers = opt.headers;
  //   if (headers) {
  //     for (var key in headers) {
  //       if (
  //         headers.hasOwnProperty(key) &&
  //         key.toLowerCase() !== "content-length" &&
  //         key.toLowerCase() !== "user-agent" &&
  //         key.toLowerCase() !== "origin" &&
  //         key.toLowerCase() !== "host"
  //       ) {
  //         xhr.setRequestHeader(key, headers[key]);
  //       }
  //     }
  //   }

  // onprogress
  //   if (opt.onProgress && xhr.upload) xhr.upload.onprogress = opt.onProgress;
  //   if (opt.onDownloadProgress) xhr.onprogress = opt.onDownloadProgress;

  // timeout
  //   if (opt.timeout) xhr.timeout = opt.timeout;
  //   xhr.ontimeout = function (event) {
  //     var error = new Error("timeout");
  //     callback(xhrRes(error, xhr));
  //   };

  // success 2xx/3xx/4xx
  //   xhr.onload = function () {
  //     callback(xhrRes(null, xhr, xhrBody(xhr, opt.dataType)));
  //   };

  //   // error 5xx/0 (网络错误、跨域报错、Https connect-src 限制的报错时 statusCode 为 0)
  //   xhr.onerror = function (err) {
  //     var body = xhrBody(xhr, opt.dataType);
  //     if (body) {
  //       // 5xx
  //       callback(xhrRes(null, xhr, body));
  //     } else {
  //       // 0
  //       var error: any = xhr.statusText;
  //       if (!error && xhr.status === 0)
  //         error = new Error("CORS blocked or network error");
  //       callback(xhrRes(error, xhr, body));
  //     }
  //   };

  //   // send
  //   xhr.send(opt.body || "");

  //   // 返回 ajax 实例，用于外部调用 xhr.abort
  //   return xhr;
};

export default request;
