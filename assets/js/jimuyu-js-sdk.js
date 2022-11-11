"use strict";

function isType(e, t) {
    return "[object " + t + "]" === {}.toString.call(e)
}

function getPageVisitSignature() {
    return Math.round(+new Date / 1e3) % 65535
}

function loadScript(e, t) {
    var n = document.createElement("script");
    n.charset = "utf-8", isType(t, "Function") && (n.readyState ? n.onreadystatechange = function () {
        "loaded" !== n.readyState && "complete" !== n.readyState || (n.onreadystatechange = null, t())
    } : n.onload = function () {
        t()
    }), n.src = e, document.getElementsByTagName("head")[0].appendChild(n)
}

function log(e, t, n, i) {
    i = i || 0;
    var o = new Image,
        a = "mini_tangram_log_" + Math.floor(2147483648 * Math.random()).toString(36);
    console.log('config.jmy', config.jmy)
    window[a] = o, o.onload = function () {
        o.onload = null, window[a] = null, o = null, t && isType(t, "Function") && t(e)
    }, config.jmy && config.jmy.isUseNewSdkExp && (o.onerror = o.onabort = function () {
        o.onerror = null, o.onabort = null, o = null, window[a] = null, i < 1 ? setTimeout(() => {log(e + "&rp=1", t, n, ++i)}, 5000) : n && isType(n, "Function") && n({
            name: "log_error",
            message: "img_onerror_or_onabort"
        }, e)
    }), o.src = e
}

function getResolution() {
    return (window.screen.width || 0) + "x" + (window.screen.height || 0)
}

function getColorDepth() {
    return (window.screen.colorDepth || 0) + "-bit"
}

function getLanguage() {
    return (navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "").toLowerCase()
}

function getCookieEnabled() {
    return navigator.cookieEnabled ? 1 : 0
}

function getJavaEnabled() {
    return navigator.javaEnabled() ? 1 : 0
}

function getScrollTop(e) {
    e = e || document;
    var t = window.pageYOffset || e.documentElement.scrollTop || e.body && e.body.scrollTop || 0;
    return parseInt(t, 10)
}

function getWindowHeight() {
    var e = document,
        t = window.innerHeight || e.documentElement.clientHeight || e.body.clientHeight || 0;
    return parseInt(t, 10)
}

function getWindowWidth() {
    var e = document,
        t = window.innerWidth || e.documentElement.clientWidth || e.body.offsetWidth || 0;
    return parseInt(t, 10)
}

function isSafari() {
    try {
        return !!navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && void 0 !== document.body.style.webkitFilter && !window.chrome
    } catch (e) {
        return !1
    }
}

function getOrientation() {
    var e = 0;
    return window.orientation && (e = window.orientation), window.screen && window.screen.orientation && window.screen.orientation.angle && (e = window.screen.orientation.angle), e
}

function getVersion() {
    var e = "";
    if (navigator.plugins && navigator.mimeTypes.length) {
        var t = navigator.plugins["Shockwave Flash"];
        t && t.description && (e = t.description.replace(/^.*\s+(\S+)\s+\S+$/, "$1"))
    } else if (window.ActiveXObject) try {
        var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
        n && (e = n.GetVariable("$version")) && (e = e.replace(/^.*\s+(\d+),(\d+).*$/, "$1.$2"))
    } catch (e) {}
    return e
}

function setCookie(e, t, n) {
    var i;
    n.expires && (i = new Date).setTime(i.getTime() + n.expires), document.cookie = e + "=" + t + (n.domain ? "; domain=" + n.domain : "") + (n.path ? "; path=" + n.path : "") + (i ? "; expires=" + i.toGMTString() : "") + (n.secure ? "; secure" : "")
}

function getCookie(e) {
    var t = new RegExp("(^| )" + e + "=([^;]*)(;|$)").exec(document.cookie);
    return t ? t[2] : null
}

function getLocalStorage(e) {
    try {
        if (window.localStorage) {
            var t = window.localStorage.getItem(e);
            if (t) {
                var n = t.indexOf("|"),
                    i = t.substring(0, n) - 0;
                if (i && i > (new Date).getTime()) return t.substring(n + 1)
            }
        }
    } catch (e) {
        return null
    }
}

function removeLocalStorage(e) {
    try {
        window.localStorage && window.localStorage.removeItem(e)
    } catch (e) {}
}

function setSessionStorage(e, t) {
    try {
        window.sessionStorage && window.sessionStorage.setItem(e, t)
    } catch (e) {}
}

function getSessionStorage(e) {
    try {
        return window.sessionStorage ? window.sessionStorage.getItem(e) : null
    } catch (e) {
        return null
    }
}

function removeSessionStorage(e) {
    try {
        window.sessionStorage && window.sessionStorage.removeItem(e)
    } catch (e) {}
}

function getClientData(e) {
    try {
        return getCookie(e) || getSessionStorage(e) || getLocalStorage(e)
    } catch (e) {}
}

function removeClientData(e) {
    try {
        setCookie(e, "", {
            domain: document.location.hostname,
            path: "/",
            expires: -1
        }), removeLocalStorage(e), removeSessionStorage(e)
    } catch (e) {}
}

function getQueryValue(e, t) {
    var n = new RegExp("(^|&|\\?|#)(" + t + ")=([^&#]*)(&|$|#)", ""),
        i = e.match(n);
    return i ? i[3] : null
}

function getHostname(e) {
    var t = getHost(e);
    return t ? t.replace(/:\d+$/, "") : t
}

function getHost(e) {
    var t = e.match(/^(https?:\/\/)?([^\/\?#]*)/);
    return t ? t[2].replace(/.*@/, "") : null
}

function getLocation(e) {
    if (e) {
        var t = document.createElement("a");
        return t.href = e, t
    }
    return null
}

function updateParam(e, t) {
    config.hasOwnProperty(e) && (config[e] = t)
}

function getSignature(e) {
    if (e) {
        for (var t = "e54d16b765d7a30d546ab671809b0e6f", n = e = String(e), i = t.length - e.length - 2; i > 0; i--) n += t.substr(parseInt(e) % i, 1);
        return n + "a"
    }
}

function setParams(e) {
    var t = getSignature(e.ucid);
    assign(config, {
        si: t
    }, {
        jmy: e
    }), setSessionStorage("Hm_jmy_" + config.si, JSON.stringify(e)), window["Hm_jmy_" + config.si] = JSON.stringify(e), isSdkReady || (tracker.init(), isSdkReady = !0)
}

function trackPageview(e, t) {
    var n = config.si,
        i = config.jmy,
        o = generateFail(t);
    try {
        if (!n) return;
        var a = tracker.tags;
        if (a.sn = getPageVisitSignature(), setSessionStorage("Hm_sn_" + n, a.sn), window["Hm_sn_" + n] = a.sn, a.et = 0, a.ep = "", a.vl = getScrollTop() + getWindowHeight(), a.u = i.url || document.location.href, a.japp = i.appid || "", a.jcu = i.cuid || "", a.jpv = i.extra && i.extra.pvid || "", a.jpif = JSON.stringify(i.page_info || {}), a.jpid = i.page_id || "", a.jsi = i.site_id || "", a.jbv = i.bd_vid || "", a.jeif = JSON.stringify(i.extra_info || {}), a.jtpl = i.tplId || "", isType(i.exp_id_list, "String")) {
            for (var r = i.exp_id_list.split(","), s = "", c = "", g = 0, u = r.length; g < u; g++) {
                var l = r[g]; - 1 === l.indexOf("dyn-1") && -1 === l.indexOf("wutong_group") || (-1 !== l.indexOf("dyn-1") ? s = l : -1 !== l.indexOf("wutong_group") && (c = l))
            }
            var m = s.split("-"),
                d = m[2],
                f = m[3];
            a.jev = d || "", a.jdyn = f || "";
            var h = c.split("-"),
                p = h[1],
                v = h[2];
            a.jplp = p, a.jpft = v
        }
        if (i.isUseNewSdkExp) {
            var w = +new Date;
            setSessionStorage("Hm_pvs_" + n, w), window["Hm_pvs_" + n] = w, tracker.postData(e, o)
        } else tracker.postData();
        a.p = ""
    } catch (e) {
        i.isUseNewSdkExp && o(e)
    }
}

function generateFail(e) {
    return function (t, n) {
        var i = config.si,
            o = config.rcv,
            a = [];
        a.push("si=" + i), a.push("n=" + encodeURIComponent(t.name)), a.push("m=" + encodeURIComponent(t.message)), a.push("r=" + encodeURIComponent(document.referrer)), n && a.push("u=" + encodeURIComponent(n)), log(o + "?" + a.join("&")), e && isType(e, "Function") && e(a)
    }
}

function getRemoteSdkURL() {
    return config.si ? config.remoteSdk + "?" + config.si : null
}

function loadRemoteSdk() {
    config.si && loadScript(config.remoteSdk + "?" + config.si)
}

var assign = Object.assign || function (e) {
        if (isType(e, "Object"))
            for (var t = 1, n = arguments.length; t < n; t++) {
                var i = arguments[t];
                if (void 0 !== i && null !== i) {
                    i = Object(i);
                    for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (e[o] = i[o])
                }
            }
        return e
    },
    tracker = {
        tags: {},
        init: function () {
            var e = config.si,
                t = config.rcv,
                n = config.jmy;
            if (e) try {
                updateParam("currentPageVisitTime", Math.round(+new Date / 1e3)), this.setTagParams(config), 0 === this.tags.nv ? this.sendUnsentRequests() : this.clearUnsentRequests()
            } catch (o) {
                var i = [];
                i.push("si=" + e), i.push("n=" + encodeURIComponent(o.name)), i.push("m=" + encodeURIComponent(o.message)), i.push("r=" + encodeURIComponent(n.refer || document.referrer)), log(t + "?" + i.join("&"))
            }
        },
        setLt: function () {
            var e, t, n, i, o, a = config.si,
                r = config.currentPageVisitTime,
                s = getClientData("Hm_lpvt_" + a) || "0";
            if (13 === s.length && updateParam("lastPageVisitTime", Math.round(s / 1e3)), t = this.getSt(), e = 4 !== t ? 1 : 0, i = getClientData("Hm_lvt_" + a)) {
                for (var c = (o = i.split(",")).length - 1; c >= 0; c--) 13 === o[c].length && (o[c] = "" + Math.round(o[c] / 1e3));
                for (; r - o[0] > 2592e3;) o.shift();
                for (1 === e && o.push(r); o.length > 4;) o.shift();
                i = o.join(","), n = o[o.length - 1]
            } else i = r, n = "";
            removeClientData("Hm_lvt_" + a), removeClientData("Hm_lpvt_" + a);
            for (var g = document.cookie.split(";"), u = 0; u < g.length; u++) {
                var l = g[u].split("=");
                l.length && /Hm_lp?vt_[0-9a-f]{31}/.test(String(l[0])) && removeClientData(String(l[0]).trim())
            }
            this.tags.lt = n, this.tags.nv = e
        },
        getSt: function () {
            var e = config.currentPageVisitTime,
                t = config.lastPageVisitTime,
                n = config.vdur,
                i = config.jmy,
                o = i.refer || document.referrer,
                a = i.url || document.location.href;
            if (!o) return e - t > n ? 1 : 4;
            var r = !1;
            if (this.isIncludedInDomain(o) && this.isIncludedInDomain(a)) r = !0;
            else {
                var s = getLocation(o),
                    c = getLocation(a);
                r = this.isSubDomain(s.hostname || "", c.hostname)
            }
            return r ? e - t > n ? 1 : 4 : 3
        },
        isIncludedInDomain: function (e) {
            for (var t = config.dm, n = 0; n < t.length; n++)
                if (t[n].indexOf("/") > -1) {
                    if (this.isSubDir(e, t[n])) return !0
                } else {
                    var i = getHostname(e);
                    if (i && this.isSubDomain(i, t[n])) return !0
                } return !1
        },
        isSubDir: function (e, t) {
            return 0 === (e = e.replace(/^https?:\/\//, "")).indexOf(t)
        },
        isSubDomain: function (e, t) {
            e = "." + e.replace(/:\d+/, ""), t = "." + t.replace(/:\d+/, "");
            var n = e.indexOf(t);
            return n > -1 && n + t.length === e.length
        },
        setTagParams: function () {
            var e = config.si,
                t = config.version,
                n = config.hmmd,
                i = config.hmpl,
                o = config.utmMedium,
                a = config.hmkw,
                r = config.utmTerm,
                s = config.hmci,
                c = config.utmContent,
                g = config.hmsr,
                u = config.utmSource,
                l = config.hmcu,
                m = config.utmCampaign,
                d = config.jmy;
            this.setLt(), this.tags.si = e, this.tags.sn = getPageVisitSignature(), this.tags.su = d.refer || document.referrer, this.tags.ds = getResolution(), this.tags.cl = getColorDepth(), this.tags.ln = getLanguage(), this.tags.ja = getJavaEnabled(), this.tags.ck = getCookieEnabled(), this.tags.lo = "number" == typeof _bdhm_top ? 1 : 0, this.tags.fl = getVersion(), this.tags.api = "4_0", this.tags.v = t, this.tags.cv = decodeURIComponent(getClientData("Hm_cv_" + e) || ""), this.tags.fid = d.fid || "", this.tags.ch = d.ch || "", this.tags.pl = d.platform || "";
            try {
                this.tags.tt = MIP.getData("title") || document.title || ""
            } catch (e) {
                this.tags.tt = document.title || ""
            }
            this.tags.vl = getScrollTop() + getWindowHeight();
            var f = d.url || document.location.href;
            this.tags.cm = getQueryValue(f, n) || "", this.tags.cp = getQueryValue(f, i) || getQueryValue(f, o) || "", this.tags.cw = getQueryValue(f, a) || getQueryValue(f, r) || "", this.tags.ci = getQueryValue(f, s) || getQueryValue(f, c) || "", this.tags.cf = getQueryValue(f, g) || getQueryValue(f, u) || "", this.tags.cu = getQueryValue(f, l) || getQueryValue(f, m) || "", isSafari() && (this.tags.u = d.url || document.location.href)
        },
        postData: function (e, t) {
            var n = this,
                i = config.maxInt,
                o = config.rcv;
            this.tags.rnd = Math.round(Math.random() * i), this.tags.ww = getWindowWidth(), this.tags.wh = getWindowHeight(), this.tags.r = getOrientation();
            var a = o + "?" + this.serializeTags();
            this.addUnsentRequest(a), log(a, function () {
                n.removeUnsentRequest(a), isType(e, "Function") && e.call(n, a)
            }, t)
        },
        addUnsentRequest: function (e) {
            var t, n = config.si,
                i = config.jmy;
            try {
                t = JSON.parse(getSessionStorage("Hm_jmyunsent_" + n) || "[]")
            } catch (e) {
                t = []
            }
            var o = this.tags.u ? "" : "&u=" + encodeURIComponent(i.url || document.location.href);
            t.push(e.replace(/^https?:\/\//, "") + o), setSessionStorage("Hm_jmyunsent_" + n, JSON.stringify(t))
        },
        removeUnsentRequest: function (e) {
            var t, n = config.si;
            try {
                t = JSON.parse(getSessionStorage("Hm_jmyunsent_" + n) || "[]")
            } catch (e) {
                t = []
            }
            if (t.length) {
                e = e.replace(/^https?:\/\//, "");
                for (var i = 0; i < t.length; i++)
                    if (e.replace(/&[u|rp]=[^&]*/, "") === t[i].replace(/&[u|rp]=[^&]*/, "")) {
                        t.splice(i, 1);
                        break
                    } t.length ? setSessionStorage("Hm_jmyunsent_" + n, JSON.stringify(t)) : this.clearUnsentRequests()
            }
        },
        sendUnsentRequests: function () {
            var e = this,
                t = [],
                n = config.si;
            try {
                t = JSON.parse(getSessionStorage("Hm_jmyunsent_" + n) || "[]")
            } catch (e) {
                t = []
            }
            if (t.length)
                for (var i = 0, o = t.length; i < o; i++) ! function (n, i) {
                    var o = t[n];
                    log("https://" + o, function () {
                        e.removeUnsentRequest(o)
                    })
                }(i)
        },
        clearUnsentRequests: function () {
            removeSessionStorage("Hm_jmyunsent_" + config.si)
        },
        serializeTags: function () {
            for (var e = [], t = config.tagKeys, n = 0, i = t.length; n < i; n++) {
                var o = t[n],
                    a = this.tags[o];
                void 0 !== a && "" !== a && e.push(o + "=" + encodeURIComponent(a))
            }
            return e.join("&")
        }
    },
    version = "1.0.19";
var isSdkReady = !1;
var config = {
    version: version,
    rcv: "https://hm.baidu.com/j.gif",
    remoteSdk: "https://hm.baidu.com/j.js",
    hmmd: "hmmd",
    hmpl: "hmpl",
    utmMedium: "utm_medium",
    hmkw: "hmkw",
    utmTerm: "utm_term",
    hmci: "hmci",
    utmContent: "utm_content",
    hmsr: "hmsr",
    utmSource: "utm_source",
    hmcu: "hmcu",
    utmCampaign: "utm_campaign",
    lastPageVisitTime: 0,
    currentPageVisitTime: Math.round(+new Date / 1e3),
    vdur: 18e5,
    age: 31536e6,
    maxInt: 2147483647,
    tagKeys: ["bid", "hca", "kb", "cc", "cf", "ci", "ck", "cl", "cm", "cp", "cu", "cw", "ds", "vl", "ep", "et", "fl", "ja", "ln", "lo", "lt", "rnd", "si", "u", "v", "cv", "fid", "ch", "pl", "lv", "api", "sn", "ct", "r", "ww", "wh", "jpv", "jpif", "jpid", "jsi", "jbv", "japp", "jtpl", "jev", "jdyn", "jplp", "jpft", "jcu", "p", "jeif", "su", "tt"],
    dm: ["sjh.baidu.com", "isite.baidu.com", "ls.wejianzhan.com", "bs.wejianzhan.com", "product.weijianzhan.com", "qianhu.weijianzhan.com", "aisite.wejianzhan.com"],
    jmy: {}
};
// exports.getRemoteSdkURL = getRemoteSdkURL, exports.loadRemoteSdk = loadRemoteSdk, exports.setParams = setParams, exports.trackPageview = trackPageview;






setParams({
    "extra": {
        "productName": "store_ads",
        "pvtrace": 1,
        "pvid": "166745651437315014224",
        "logVersion": "4.0",
        "micro_time": 1667456514389
    },
    "isUseNewSdkExp": true,
    "guid": "",
    "tplId": 1152,
    "appid": 401,
    "sub_appid": 255,
    "ucid": 1381540,
    "site_id": 57593030,
    "page_name": "东易日盛装饰整体家居体验馆(北京旗舰店)",
    "page_type": 0,
    "time_stamp": 1667456514,
    "refer": "",
    "url": "https://aisite.wejianzhan.com/site/wjzuaz8/48a72a10-d58d-4757-bf85-6c586a1ad415?showpageinpc=1&forceExpIdList=59929-dz&wid=1cfdab8699e84bf1b749e732db139ff7_0_0&zjopen=0",
    "group_id": "",
    "page_id": 88085292,
    "idea_id": "",
    "extra_idea_id": "",
    "stat": null,
    "s": null,
    "cuid": "166269005667512622080",
    "channel_id": "",
    "bd_vid": null,
    "page_info": {
        "showType": 0,
        "auditVersion": 0,
        "llp": 0,
        "adaptType": 0,
        "xcxAppKey": "",
        "siteTplType": 6
    },
    "exp_id_list": "59929-dz",
    "ab_test_url": "",
    "extra_info": {
        "industryType": 4,
        "businessCheckStatus": 0,
        "subShopId": 21244600,
        "shopId": 28720,
        "pageCode": 2
    },
    "wid": "1cfdab8699e84bf1b749e732db139ff7_0_0",
    "isPrerender": false
})

function success() {
    console.log('success')
}

function fail(e, r) {
    console.log('fail', e, r)
}

trackPageview(success, fail);

loadRemoteSdk();