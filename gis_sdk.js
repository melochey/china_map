var CMMap = {};
CMMap.Conf = {
    _version: "",
    _key: "",
    _server: "",
    _client: "",
    _plugin: "",
    _count: "",
    _mapUrl: "http://221.180.144.111:8089/tileServer?maptype=2&number=123456789&x=[x]&y=[y]&z=[z]&key=[key]"
};
CMMap.Tween = {
    Linear: function(e, a, g, f) {
        return g * e / f + a
    },
    Cubic: {
        easeIn: function(e, a, g, f) {
            return g * (e /= f) * e * e + a
        },
        easeOut: function(e, a, g, f) {
            return g * ((e = e / f - 1) * e * e + 1) + a
        },
        easeInOut: function(e, a, g, f) {
            if ((e /= f / 2) < 1) {
                return g / 2 * e * e * e + a
            }
            return g / 2 * ((e -= 2) * e * e + 2) + a
        }
    }
};
CMMap.Util = {
    error: function(a, b) {
        console.log(a + ":" + b)
    },
    getElementsById: function(a) {
        return document.getElementById(a)
    },
    getElementsByClassName: function(d, c) {
        var e = c.getElementsByTagName("*");
        var a = Array();
        for (var b = 0; b < e.length; b++) {
            if (e[b].className.match(new RegExp("(\\s|^)" + d + "(\\s|$)"))) {
                a.push(e[b])
            }
        }
        return a
    },
    isIE: function() {
        return /msie/i.test(navigator.userAgent)
    },
    isIE8: function() {
        return /msie 8.0/i.test(navigator.userAgent.toLowerCase())
    },
    isIE9: function() {
        return /msie 9.0/i.test(navigator.userAgent.toLowerCase())
    },
    isIE10: function() {
        return /msie 10.0/i.test(navigator.userAgent.toLowerCase())
    },
    isIE11: function() {
        return /rv:11.0/i.test(navigator.userAgent.toLowerCase())
    },
    supportedSVG: function() {
        var a = "http://www.w3.org/TR/SVG11/feature#";
        return ( document.implementation && (document.implementation.hasFeature("org.w3c.svg", "1.0") || document.implementation.hasFeature(a + "SVG", "1.1") || document.implementation.hasFeature(a + "BasicStructure", "1.1"))) 
    },
    supportedCanvas: function() {
        return ( !!document.createElement("canvas").getContext) 
    },
    isFirefox: function() {
        return navigator.userAgent.toLowerCase().match(/firefox\/([\d.]+)/)
    },
    getStyle: function(a) {
        return a.currentStyle || document.defaultView.getComputedStyle(a, null )
    },
    arraySearch: function(c, a) {
        for (var b = 0; b < a.length; b++) {
            if (c == a[b]) {
                return b
            }
        }
        return false
    },
    fixPng: function(a) {
        if (a.width !== 0) {
            a.outerHTML = '<div style="filter:progid:DXImageTransform.Microsoft.Matrix(sizingmethod=\'auto expand\')"><span style="width:' + a.width + "px;height:" + a.height + "px;display:inline-block;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + a.src + "',sizingMethod='scale');\"></span></div>"
        } else {
            var b = new Image();
            b.src = a.src;
            a.outerHTML = '<div style="filter:progid:DXImageTransform.Microsoft.Matrix(sizingmethod=\'auto expand\')"><span style="width:' + b.width + "px;height:" + b.height + "px;display:inline-block;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + a.src + "',sizingMethod='scale');\"></span></div>"
        }
    },
    pageSize: function(a) {
        return {
            width: a.clientWidth || document.body.clientWidth,
            height: a.clientHeight || ((CMMap.Util.isIE()) ? (document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight) : self.innerHeight)
        }
    },
    guid: function() {
        return Math.round(Math.random() * 100000)
    },
    verifyLnglat: function(a) {
        return a !== undefined && a.lng >= -180 && a.lng <= 180 && a.lat >= -85.051128 && a.lat <= 85.051128
    },
    verifyRotation: function(a) {
        return a !== undefined && a >= 0 && a < 360
    },
    verifyLevel: function(c, b, a) {
        b = b !== undefined ? b : 1;
        a = a !== undefined ? a : 20;
        return c !== undefined && c >= b && c <= a
    },
    lnglat2pixel: function(a, e) {
        var d = Math.sin(a.lat * Math.PI / 180);
        var c = ((a.lng + 180) / 360) * 256 * Math.pow(2, e);
        var b = (0.5 - Math.log((1 + d) / (1 - d)) / (4 * Math.PI)) * 256 * Math.pow(2, e);
        return new CMMap.Pixel(c,b)
    },
    pixel2lnglat: function(b, e) {
        var d = Math.exp(4 * Math.PI * (0.5 - b.y / 256 / Math.pow(2, e)));
        var a = b.x / 256 / Math.pow(2, e) * 360 - 180;
        var c = Math.asin((d - 1) / (d + 1)) / Math.PI * 180;
        return new CMMap.LngLat(a,c)
    },
    getLngLatByOffset: function(b, a, d) {
        var e = 2 * Math.asin(Math.sin(a / (2 * 6378137)) / Math.cos(b.lat * Math.PI / 180));
        var c = b.lng + e * 180 / Math.PI;
        var g = 2 * Math.asin(d / (2 * 6378137));
        var f = b.lat + g * 180 / Math.PI;
        return new CMMap.LngLat(c,f)
    },
    getDistance: function(f, k) {
        var j = f.lat * Math.PI / 180;
        var i = k.lat * Math.PI / 180;
        var g = j - i;
        var e = (f.lng - k.lng) * Math.PI / 180;
        var h = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(g / 2), 2) + Math.cos(j) * Math.cos(i) * Math.pow(Math.sin(e / 2), 2))) * 6378137;
        return h
    },
    test: function(c) {
        var b = "";
        for (var e in c) {
            if (typeof (c[e]) == "object") {
                b += "属性：'" + e + "' 子属性：<br/>";
                var d = c[e];
                for (var a in d) {
                    b += "--属性： '" + a + "' 值：" + d[a] + "<br>"
                }
            } else {
                b += "属性：'" + e + "' 值：" + c[e] + "<br>"
            }
        }
        if (!document.getElementById("result")) {
            document.body.innerHTML += "<div id='result'></div>"
        }
        document.getElementById("result").innerHTML = b + "<hr>"
    },
    isAndroidLowVersion: function() {
        if (navigator.userAgent.indexOf("Android") > -1) {
            var b = navigator.appVersion.split(";")[2].trim().split(" ");
            return b.length > 1 && (b[1].indexOf("1.") === 0 || b[1].indexOf("2.") === 0) ? !0 : !1
        }
    }
};
CMMap.$ = CMMap.Util.getElementsById;
CMMap.Class = function() {
    var d = function() {
        if (arguments && arguments[0] != CMMap.Class.isPrototype) {
            this.initialize.apply(this, arguments)
        }
    }
    ;
    var c = {};
    var f, b;
    for (var e = 0, a = arguments.length; e < a; ++e) {
        if (typeof arguments[e] == "function") {
            if (e === 0 && a > 1) {
                b = arguments[e].prototype.initialize;
                arguments[e].prototype.initialize = function() {}
                ;
                c = new arguments[e]();
                if (b === undefined) {
                    delete arguments[e].prototype.initialize
                } else {
                    arguments[e].prototype.initialize = b
                }
            }
            f = arguments[e].prototype
        } else {
            f = arguments[e]
        }
        CMMap.Extend(c, f)
    }
    d.prototype = c;
    return d
}
;
CMMap.Class.isPrototype = function() {}
;
CMMap.Extend = function(a, e) {
    a = a || {};
    if (e) {
        for (var d in e) {
            var c = e[d];
            if (c !== undefined) {
                a[d] = c
            }
        }
        var b = typeof window.Event == "function" && e instanceof window.Event;
        if (!b && e.hasOwnProperty && e.hasOwnProperty("toString")) {
            a.toString = e.toString
        }
    }
    return a
}
;
CMMap.EventListener = CMMap.Class({
    initialize: function(f, a, b, e, c, d) {
        this.type = f;
        this.instance = a;
        this.eventName = b;
        this.handler = e;
        this.context = c;
        this.listenerId = d
    }
});
CMMap.Event = {
    _event: {
        map: [],
        marker: [],
        polyline: [],
        polygon: [],
        circle: [],
        inforwindow: [],
        contextmenu: []
    },
    isIE: /msie/i.test(navigator.userAgent),
    isIE6: /msie 6.0/i.test(navigator.userAgent),
    isIE8: /msie 8.0/i.test(navigator.userAgent),
    isIE9: /msie 9.0/i.test(navigator.userAgent),
    isIE10: /msie 10.0/i.test(navigator.userAgent),
    isWebkit: /webkit/i.test(navigator.userAgent),
    isGecko: /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent),
    isOpera: /opera/i.test(navigator.userAgent),
    addEvent: function(b, c, a) {
        if (b.addEventListener) {
            b.addEventListener(c, a, false)
        } else {
            if (b.attachEvent) {
                b.attachEvent("on" + c, a)
            } else {
                b["on" + c] = a
            }
        }
    },
    removeEvent: function(b, c, a) {
        if (b.removeEventListener) {
            b.removeEventListener(c, a, false)
        } else {
            if (b.detachEvent) {
                b.detachEvent("on" + c, a)
            } else {
                b["on" + c] = null 
            }
        }
    },
    formatEvent: function(a) {
        if (this.isIE) {
            a.charCode = (a.type == "keypress") ? a.keyCode : 0;
            a.eventPhase = 2;
            a.isChar = (a.charCode > 0);
            a.pageX = a.clientX + document.body.scrollLeft;
            a.pageY = a.clientY + document.body.scrollTop;
            a.preventDefault = function() {
                this.returnValue = false
            }
            ;
            if (a.type == "mouseout") {
                a.relatedTarget = a.toElement
            } else {
                if (a.type == "mouseover") {
                    a.relatedTarget = a.fromElement
                }
            }
            a.stopPropagation = function() {
                this.cancelBubble = true
            }
            ;
            a.target = a.srcElement;
            a.time = (new Date()).getTime()
        }
        if (this.isGecko) {
            a.offsetX = a.layerX;
            a.offsetY = a.layerY
        }
        if (a.wheelDelta) {
            a.detail = a.wheelDelta
        }
        return a
    },
    stopPropagation: function(a) {
        if (a.stopPropagation) {
            a.stopPropagation();
            a.preventDefault()
        } else {
            a.cancelBubble = true;
            a.returnValue = false
        }
    },
    drag: function(d, b, c, e) {
        xEvent = this;
        function a(f) {
            f = f || window.event;
            c(f)
        }
        xEvent.addEvent(d, "mousedown", function(f) {
            xEvent._container.style.cursor = "url(" + CMMap.Conf._client + "Images/closedhand.cur),pointer";
            f = f || window.event;
            b(f);
            xEvent.addEvent(document, "mousemove", a);
            xEvent.addEvent(document, "mouseup", function(g) {
                g = g || window.event;
                e(g);
                xEvent.removeEvent(document, "mousemove", a);
                xEvent.removeEvent(document, "mouseup", arguments.callee);
                xEvent._container.style.cursor = xEvent._cursor.map == "default" ? xEvent._cursor.map : "url(" + xEvent._cursor.map + "),pointer"
            })
        })
    },
    mousewheel: function(c, a) {
        var b = function(d) {
            var f = 0;
            d = d || window.event;
            if (d.wheelDelta) {
                d.delta = d.wheelDelta / 120
            } else {
                if (d.detail) {
                    d.delta = -d.detail / 3
                }
            }
            a(d)
        }
        ;
        if (document.addEventListener) {
            c.addEventListener("DOMMouseScroll", b, false)
        }
        c.onmousewheel = b
    },
    trigger: function(b, a, d) {
        d = d || {};
        d.mapId = this._unique;
        d.overlay = b._type;
        if (!this._event[b._type]) {
            this._event[b._type] = []
        }
        for (var c = 0; c < this._event[b._type].length; c++) {
            if (this._event[b._type][c].name == a && this._event[b._type][c].obj == b) {
                if (this._event[b._type][c].cate !== null  && typeof (this._event[b._type][c].cate) == "object") {
                    this._event[b._type][c].func.call(this._event[b._type][c].cate, d);
                    if (this._event[b._type][c].once !== undefined && this._event[b._type][c].once) {
                        this._event[b._type][c].splice(c, 1)
                    }
                } else {
                    this._event[b._type][c].func.call(this, d);
                    if (this._event[b._type][c].once !== undefined && this._event[b._type][c].once) {
                        this._event[b._type][c].splice(c, 1)
                    }
                }
            }
        }
    },
    addDomListener: function(a, d, g, e) {
        var c = a;
        var h = d;
        var f = CMMap.Util.guid();
        var b = function(j) {
            var i = j || window.event;
            return g.call(e || c, i, h)
        }
        ;
        if (c.addEventListener) {
            c.addEventListener(h, b, false)
        } else {
            if (c.attachEvent) {
                c.attachEvent("on" + h, b)
            } else {
                c["on" + h] = b
            }
        }
        return new CMMap.EventListener(0,a,d,g,e,f)
    },
    addListener: function(h, g, i, b) {
        var e = h;
        var a = g;
        var d = i;
        var f = b;
        var c = CMMap.Util.guid();
        if (!this._event[e._type]) {
            this._event[e._type] = []
        }
        this._event[e._type].push({
            obj: e,
            name: a,
            func: d,
            cate: f,
            listenerId: c
        });
        return new CMMap.EventListener(1,h,g,i,b,c)
    },
    addListenerOnce: function(h, g, i, b) {
        var e = h;
        var a = g;
        var d = i;
        var f = b;
        var c = CMMap.Util.guid();
        if (!this._event[e._type]) {
            this._event[e._type] = []
        }
        this._event[e._type].push({
            obj: e,
            name: a,
            func: d,
            cate: f,
            once: true,
            listenerId: c
        });
        return new CMMap.EventListener(1,h,g,i,b,c)
    },
    removeListener: function(e) {
        if (!(e instanceof CMMap.EventListener)) {
            return
        }
        var f = e.instance;
        var a = e.eventName;
        var d = e.handler;
        var c = e.listenerId;
        if (e.type === 0) {
            if (f.removeEventListener) {
                f.removeEventListener(a, d, false)
            } else {
                if (f.detachEvent) {
                    f.detachEvent("on" + a, d)
                } else {
                    f["on" + a] = null 
                }
            }
        } else {
            if (e.type === 1) {
                if (f !== undefined && a !== undefined && d !== undefined && c !== undefined) {
                    for (var b = 0; b < this._event[f._type].length; b++) {
                        if (this._event[f._type][b].obj == f && this._event[f._type][b].name == a && this._event[f._type][b].func.toString() == d.toString() && this._event[f._type][b].listenerId == c) {
                            this._event[f._type].splice(b, 1)
                        }
                    }
                }
            }
        }
    }
};
CMMap.event = CMMap.Event;
CMMap.TileLayer = CMMap.Class({
    _type: "tilelayer",
    id: "",
    tileUrl: CMMap.Conf._mapUrl,
    tileSize: 256,
    opacity: 1,
    initialize: function(b) {
        for (var a in b) {
            if (a.substr(0, 1) != "_" && this[a] !== undefined) {
                this[a] = b[a]
            }
        }
        return this
    },
    show: function() {},
    hide: function() {},
    getOpacity: function() {
        return this.opacity
    },
    getTileSize: function() {
        return this.tileSize
    },
    getTileUrl: function(a, g, f) {
        var c = this.tileUrl || CMMap.Conf._mapUrl;
        var e = c.match(/\{.*\}/);
        if (e) {
            var d = e.toString().replace("{", "").replace("}", "");
            d = d.split(",");
            d = d[Math.floor(Math.random() * d.length)];
            c = c.replace(e, d)
        }
        if (a === undefined || g === undefined || f === undefined) {
            return c
        }
        var b = Math.pow(2, f);
        a = (a < 0) ? b - Math.floor(Math.abs(a) % b) : a;
        a = (a >= b) ? Math.floor(a % b) : a;
        return c.replace("[x]", a).replace("[y]", g).replace("[z]", f).replace("[key]", CMMap.Conf._key)
    }
});
CMMap.MAjaxResult = {};
CMMap.AjaxRequest = function(b, f, c) {
    var d = Math.round(Math.random() * 1000000);
    var a = document.getElementById("MAjax_" + d);
    if (a) {
        document.getElementsByTagName("head")[0].removeChild(a)
    }
    a = document.createElement("script");
    a.id = "MAjax_" + d;
    a.type = "text/javascript";
    a.src = b + "&rid=" + d;
    document.getElementsByTagName("head")[0].appendChild(a);
    var e = this;
    if (CMMap.Util.isIE() && !CMMap.Util.isIE9() && !CMMap.Util.isIE10()) {
        a.onreadystatechange = function() {
            if (this.readyState == "loaded" || this.readyState == "complete") {
                e.ajaxResult()
            }
        }
    } else {
        a.onload = function() {
            e.ajaxResult()
        }
        ;
        a.onerror = function() {}
    }
    this.ajaxResult = function() {
        if (CMMap.MAjaxResult[d]) {
            if (f) {
                f(CMMap.MAjaxResult[d])
            }
            document.getElementsByTagName("head")[0].removeChild(document.getElementById("MAjax_" + d));
            CMMap.MAjaxResult[d] = null ;
            delete CMMap.MAjaxResult[d]
        } else {
            if (c) {
                if (f) {
                    f()
                }
            } else {}
        }
    }
}
;
CMMap.LngLat = CMMap.Class({
    _type: "lnglat",
    lng: 0,
    lat: 0,
    initialize: function(a, b) {
        if (CMMap.Util.verifyLnglat({
            lng: a,
            lat: b
        })) {
            this.lng = a;
            this.lat = b
        }
    },
    toString: function() {
        return "{lng:" + this.lng + ",lat:" + this.lat + "}"
    },
    offset: function(a, b) {
        a = parseInt(a);
        b = parseInt(b);
        if (a !== undefined && b !== undefined) {
            return CMMap.Util.getLngLatByOffset(this, a, b)
        }
    },
    distance: function(a) {
        if (CMMap.Util.verifyLnglat(a)) {
            return CMMap.Util.getDistance(this, a)
        }
    },
    getLng: function() {
        return this.lng
    },
    getLat: function() {
        return this.lat
    },
    equals: function(a) {
        return a !== undefined && a.lng === this.lng && a.lat === this.lat
    }
});
CMMap.Pixel = CMMap.Class({
    _type: "pixel",
    x: 0,
    y: 0,
    initialize: function(a, b) {
        a = parseInt(a);
        b = parseInt(b);
        if (a !== undefined && b !== undefined) {
            this.x = Math.round(a);
            this.y = Math.round(b)
        }
    },
    toString: function() {
        return "{x:" + this.x + ",y:" + this.y + "}"
    },
    getX: function() {
        return this.x
    },
    getY: function() {
        return this.y
    },
    equals: function(a) {
        return a !== undefined && a.x === this.x && a.y === this.y
    }
});
CMMap.Size = CMMap.Class({
    _type: "size",
    width: 0,
    height: 0,
    initialize: function(b, a) {
        b = parseInt(b);
        a = parseInt(a);
        if (b !== undefined && a !== undefined && !isNaN(b) && !isNaN(a)) {
            this.width = Math.round(b);
            this.height = Math.round(a)
        }
    },
    getWidth: function() {
        return this.width
    },
    getHeight: function() {
        return this.height
    },
    toString: function() {
        return "{width:" + this.width + ",height:" + this.height + "}"
    }
});
CMMap.Bounds = CMMap.Class({
    _type: "bounds",
    southwest: new CMMap.LngLat(0,0),
    northeast: new CMMap.LngLat(0,0),
    initialize: function(a, b) {
        if (CMMap.Util.verifyLnglat(a) && CMMap.Util.verifyLnglat(b)) {
            this.southwest.lng = a.lng;
            this.southwest.lat = a.lat;
            this.northeast.lng = b.lng;
            this.northeast.lat = b.lat
        }
    },
    contains: function(a) {
        return a !== undefined && a.lng !== undefined && a.lat !== undefined && a.lng >= this.southwest.lng && a.lng <= this.northeast.lng && a.lat >= this.southwest.lat && a.lat <= this.northeast.lat
    },
    getCenter: function() {
        var a = (this.southwest.lng + this.northeast.lng) / 2;
        var b = (this.southwest.lat + this.northeast.lat) / 2;
        return new CMMap.LngLat(a,b)
    },
    getSouthWest: function() {
        return this.southwest
    },
    getNorthEast: function() {
        return this.northeast
    },
    toString: function() {
        return "{southwest:" + this.southwest + ",northeast:" + this.northeast + "}"
    }
});
CMMap.View2D = CMMap.Class({
    _type: "view2d",
    center: new CMMap.LngLat(116.3977713227539,39.92358105898725),
    rotation: 0,
    zoom: 13,
    initialize: function(d) {
        if (d !== undefined) {
            if (d.center !== undefined) {
                var a = parseFloat(d.center.lng);
                var e = parseFloat(d.center.lat);
                if (CMMap.Util.verifyLnglat({
                    lng: a,
                    lat: e
                })) {
                    this.center.lng = a;
                    this.center.lat = e
                }
            }
            var b = parseInt(d.ritation);
            if (CMMap.Util.verifyRotation(b)) {
                this.rotation = b
            }
            var c = parseInt(d.zoom);
            if (CMMap.Util.verifyLevel(c)) {
                this.zoom = c
            }
        }
    },
    toString: function() {
        return "{center:" + this.center + ",rotation" + this.rotation + ",zoom" + this.zoom + "}"
    }
});
CMMap.Layerset = {
    _lays: {
        x: 0,
        y: 0
    },
    _layers: [],
    _tile: [],
    _mouse: {
        In: false,
        x: 0,
        y: 0
    },
    _timer: {
        lay: 0,
        alpha: 0,
        frame: 0,
        drag: 0
    },
    _defaultTileLayer: new CMMap.TileLayer({
        id: "base",
        tileUrl: this._mapUrl
    }),
    _relative: {
        x: 0,
        y: 0
    },
    _northwest: {
        x: 0,
        y: 0
    },
    _southeast: {
        x: 0,
        y: 0
    },
    _canvasOffset: {
        x: 0,
        y: 0
    },
    _initLayer: function() {
        this._pixel = CMMap.Util.lnglat2pixel(this._center, this._level);
        this._relative = {
            x: this._pixel.x - Math.round(this._width / 2),
            y: this._pixel.y - Math.round(this._height / 2)
        };
        this._northwest = {
            x: 0,
            y: 0
        };
        this._southeast = {
            x: this._width,
            y: this._height
        };
        this._mouse = {
            In: false,
            x: this._width / 2,
            y: this._height / 2,
            lnglat: this._center
        };
        this._bindMap();
        this._addLayer(this._defaultTileLayer)
    },
    _addLayer: function(b) {
        var a = 0;
        for (var d = 0; d < this._layers.length; d++) {
            if (b.id == this._layers[d].id) {
                a = 1;
                break
            }
        }
        if (CMMap.$("_lay_" + this._unique + "_" + b.id) && a == 1) {
            var e = CMMap.$("_lay_" + this._unique + "_" + b.id);
            var f = e.getElementsByTagName("img");
            while (f.length > 0) {
                e.removeChild(f[0])
            }
        } else {
            var c = document.createElement("div");
            c.id = "_lay_" + this._unique + "_" + b.id;
            c.style.cssText = "position:absolute;left:0;top:0;width:100%;z-index:0;-moz-user-select:none;";
            c.unselectable = "on";
            CMMap.$("_mc_" + this._unique).children[0].appendChild(c);
            if (a === 0) {
                this._layers.push(b)
            }
        }
        this._addTile(b)
    },
    _addTile: function(g) {
        this._tc = 0;
        var f = Math.pow(2, this._level);
        this._northwest = CMMap.Extend(this._northwest, this._getTileNum(this._northwest, this._relative));
        this._southeast = CMMap.Extend(this._southeast, this._getTileNum(this._southeast, this._relative));
        var h = CMMap.$("_lay_" + this._unique + "_" + g.id);
        var j = document.createDocumentFragment();
        var e = 0;
        var d = 0;
        if (this._rotateEnable) {
            var c = this._rotation % 360;
            if (this._rotation < 0) {
                c = 360 + this._rotation
            }
            if (c >= 0 && c <= 45) {
                c = c
            } else {
                if (c > 45 && c < 90) {
                    c = c - 45
                } else {
                    if (c >= 90 && c < 180) {
                        c = 180 - c
                    } else {
                        if (c >= 180 && c < 225) {
                            c = c - 180
                        } else {
                            if (c >= 225 && c < 270) {
                                c = 270 - c
                            } else {
                                if (c >= 270 && c < 360) {
                                    c = 360 - c
                                }
                            }
                        }
                    }
                }
            }
            var l = Math.sin((2 * Math.PI / 360) * c) * this._height + Math.cos((2 * Math.PI / 360) * c) * this._width;
            var b = Math.cos((2 * Math.PI / 360) * c) * this._height + Math.sin((2 * Math.PI / 360) * c) * this._width;
            e = Math.abs(Math.ceil((l - this._width) / 512));
            d = Math.abs(Math.ceil((b - this._height) / 512))
        }
        for (var k = this._northwest.line - 1 - d; k <= this._southeast.line + d; k++) {
            for (var a = this._northwest.column - 1 - e; a <= this._southeast.column + e; a++) {
                if (k >= 0 && k < f && a >= 0 && a < f) {
                    var i = document.createElement("img");
                    i.className = "css-3d-bug-fix-hack";
                    i.style.cssText = "width:256px;height:256px;position:absolute;border:none;-moz-user-select:none;";
                    i.style.top = 256 * k - this._relative.y + "px";
                    i.style.left = 256 * a - this._relative.x + "px";
                    i.unselectable = "on";
                    i.src = g.getTileUrl(a, k, this._level);
                    if (g.opacity != 1) {
                        if (this.isIE) {
                            i.style.filter = "alpha(opacity=" + g.opacity * 100 + ")"
                        } else {
                            i.style.opacity = g.opacity
                        }
                    }
                    j.appendChild(i);
                    if (this._tile.join(",").indexOf(a + "." + k) == -1) {
                        this._tile.push(a + "." + k)
                    }
                    this._tileComplete(i)
                }
            }
        }
        h.appendChild(j)
    },
    _tc: 0,
    _tileComplete: function(a) {
        if (!this.isIE || this.isIE9 || this.isIE10) {
            a.style.visibility = "hidden";
            if (a.complete) {
                a.style.visibility = "visible"
            } else {
                a.onload = function(b) {
                    b.target.style.visibility = "visible"
                }
            }
        }
        this.complete()
    },
    complete: function() {
        this.trigger(this, "complete", {});
        return true
    },
    _moveTile: function(r, p) {
        var m = Math.pow(2, this._level);
        this._northwest = CMMap.Extend(this._northwest, this._getTileNum(this._northwest, this._relative));
        this._southeast = CMMap.Extend(this._southeast, this._getTileNum(this._southeast, this._relative));
        var s = [];
        var l = 0;
        var g = 0;
        if (this._rotateEnable) {
            var d = this._rotation % 360;
            if (this._rotation < 0) {
                d = 360 + this._rotation
            }
            if (d >= 0 && d <= 45) {
                d = d
            } else {
                if (d > 45 && d < 90) {
                    d = d - 45
                } else {
                    if (d >= 90 && d < 180) {
                        d = 180 - d
                    } else {
                        if (d >= 180 && d < 225) {
                            d = d - 180
                        } else {
                            if (d >= 225 && d < 270) {
                                d = 270 - d
                            } else {
                                if (d >= 270 && d < 360) {
                                    d = 360 - d
                                }
                            }
                        }
                    }
                }
            }
            var q = Math.sin((2 * Math.PI / 360) * d) * this._height + Math.cos((2 * Math.PI / 360) * d) * this._width;
            var c = Math.cos((2 * Math.PI / 360) * d) * this._height + Math.sin((2 * Math.PI / 360) * d) * this._width;
            l = Math.abs(Math.ceil((q - this._width) / 512));
            g = Math.abs(Math.ceil((c - this._height) / 512))
        }
        for (var o = this._northwest.line - 1 - g; o <= this._southeast.line + g; o++) {
            for (var b = this._northwest.column - 1 - l; b <= this._southeast.column + l; b++) {
                if (o >= 0 && o < m && b >= 0 && b < m) {
                    if (this._tile.join(",").indexOf(b + "." + o) == -1) {
                        for (var e = 0; e < this._layers.length; e++) {
                            var n = document.createElement("img");
                            n.className = "css-3d-bug-fix-hack";
                            n.style.cssText = "width:256px;height:256px;position:absolute;border:none;-moz-user-select:none;";
                            n.style.top = 256 * o - this._relative.y + "px";
                            n.style.left = 256 * b - this._relative.x + "px";
                            n.unselectable = "on";
                            if (this._layers[e].id == "overlay" || this._layers[e].id == "overlayCanvas") {
                                continue
                            }
                            if (this._layers[e].id == "overlayHeatmap") {
                                continue
                            }
                            n.src = this._layers[e].getTileUrl(b, o, this._level);
                            if (this._layers[e].opacity != 1) {
                                if (this.isIE) {
                                    n.style.filter = "alpha(opacity=" + this._layers[e].opacity * 100 + ")"
                                } else {
                                    n.style.opacity = this._layers[e].opacity
                                }
                            }
                            CMMap.$("_lay_" + this._unique + "_" + this._layers[e].id).appendChild(n);
                            this._tileComplete(n)
                        }
                        this._tile.push(b + "." + o)
                    }
                    s.push(b + "." + o)
                }
            }
        }
        s = s.join(",");
        for (var h = 0; h < this._tile.length; h++) {
            if (s.indexOf(this._tile[h]) == -1) {
                for (var f = 0; f < this._layers.length; f++) {
                    if (this._layers[f].id == "overlay" || this._layers[f].id == "overlayCanvas") {
                        continue
                    }
                    if (this._layers[f].id == "overlayHeatmap") {
                        continue
                    }
                    var a = CMMap.$("_lay_" + this._unique + "_" + this._layers[f].id);
                    var t = a.getElementsByTagName("img");
                    a.removeChild(t[h])
                }
                this._tile.splice(h, 1);
                h--
            }
        }
    },
    _reloadLayer: function() {
        this._pixel = CMMap.Util.lnglat2pixel(this._center, this._level);
        this._relative = {
            x: this._pixel.x - Math.round(this._width / 2),
            y: this._pixel.y - Math.round(this._height / 2)
        };
        var d = CMMap.$("_mc_" + this._unique).children[0];
        d.style.left = "0px";
        d.style.top = "0px";
        this._lays = {
            x: 0,
            y: 0
        };
        this._northwest = {
            x: 0,
            y: 0
        };
        this._southeast = {
            x: this._width,
            y: this._height
        };
        this.adjustCanvasPos();
        this._tile = [];
        for (var a = this._layers.length - 1; a >= 0; a--) {
            if (this._layers[a].id == "overlay" || this._layers[a].id == "overlayCanvas") {
                continue
            }
            if (this._layers[a].id == "overlayHeatmap") {
                continue
            }
            var b = CMMap.$("_lay_" + this._unique + "_" + this._layers[a].id);
            var c = b.getElementsByTagName("img");
            while (c.length > 0) {
                b.removeChild(c[0])
            }
            this._addTile(this._layers[a])
        }
    },
    _replaceLayer: function(b, a) {
        for (var d = 0; d < this._layers.length; d++) {
            if (b.id == this._layers[d].id) {
                var e = CMMap.$("_lay_" + this._unique + "_" + this._layers[d].id);
                e.parentNode.removeChild(e);
                this._layers.splice(d, 1)
            }
        }
        var c = document.createElement("div");
        c.id = "_lay_" + this._unique + "_" + b.id;
        c.style.cssText = "position:absolute;left:0;top:0;width:100%;z-index:0;-moz-user-select:none;";
        c.unselectable = "on";
        this._tile = [];
        for (var d = 0; d < this._layers.length; d++) {
            if (a.id == this._layers[d].id) {
                var e = CMMap.$("_lay_" + this._unique + "_" + this._layers[d].id);
                e.parentNode.replaceChild(c, e);
                this._layers.splice(d, 1, b)
            }
        }
        this._addTile(b)
    },
    _removeLayer: function(b) {
        for (var a = 0; a < this._layers.length; a++) {
            if (b == this._layers[a].id) {
                var c = CMMap.$("_lay_" + this._unique + "_" + this._layers[a].id);
                c.parentNode.removeChild(c);
                this._layers.splice(a, 1)
            }
        }
        return true
    },
    _getTileNum: function(a, b) {
        return {
            line: Math.floor((a.y + b.y) / 256),
            column: Math.floor((a.x + b.x) / 256)
        }
    },
    _getOffset: function(h) {
        h = this.formatEvent(h);
        var f = {
            x: h.offsetX,
            y: h.offsetY
        };
        var g = h.target;
        var b = ["svg", "path", "circle", ""].join(",").indexOf(h.target.nodeName) > -1;
        if (this.isOpera && ["path", "circle"].indexOf(h.target.nodeName) > -1) {
            var a = this._overlays[h.target.id]._northwest;
            var c = CMMap.Util.lnglat2pixel(a, this._level);
            f.x += c.x - this._relative.x;
            f.y += c.y - this._relative.y
        } else {
            if (b && !this.isIE9 && !this.isIE10) {
                if (h.target.nodeName != "svg") {
                    g = g.parentNode
                }
                f.x = parseInt(g.style.left) + h.offsetX;
                f.y = parseInt(g.style.top) + h.offsetY;
                g = g.parentNode
            }
        }
        try {
            if (this.isIE8) {
                f.x = 0;
                f.y = 0;
                g = this._container;
                while (g && g != document.body) {
                    f.x += parseInt(g.offsetLeft) + parseInt(g.clientLeft);
                    f.y += parseInt(g.offsetTop) + parseInt(g.clientTop);
                    g = g.offsetParent
                }
                f.x = h.clientX + document.documentElement.scrollLeft - f.x;
                f.y = h.clientY + document.documentElement.scrollTop - f.y
            } else {
                while (g && g.className != "mc_") {
                    f.x += g.offsetLeft || 0;
                    f.y += g.offsetTop || 0;
                    g = g.offsetParent
                }
            }
        } catch (d) {} finally {
            h.preventDefault = null ;
            h.stopPropagation = null ;
            if (g) {
                return f
            } else {
                f.x += this._lays.x;
                f.y += this._lays.y;
                return f
            }
        }
    },
    _bindMap: function() {
        var a = CMMap.$("_mc_" + this._unique);
        var f = 0
          , e = 0
          , d = 0
          , b = 0
          , i = this
          , c = 0
          , g = 0
          , h = 0;
        this.drag(a, function(j) {
            window.clearInterval(i._timer.drag);
            f = d = parseInt(j.clientX);
            e = b = parseInt(j.clientY);
            c = new Date().getTime();
            j.lnglat = i._mouse.lnglat;
            i.trigger(i, "mousedown", j);
            i.trigger(i, "dragstart", j);
            i.trigger(i, "movestart", j);
            i.stopPropagation(j)
        }, function(j) {
            if (i._dragEnable) {
                i._panBy(j.clientX - f, j.clientY - e)
            }
            f = j.clientX;
            e = j.clientY;
            j.lnglat = i._mouse.lnglat;
            i.trigger(i, "dragging", j);
            window.clearTimeout(h);
            h = setTimeout(function() {
                g = 0
            }, 50);
            g = 1;
            i.stopPropagation(j)
        }, function(k) {
            k.lnglat = i._mouse.lnglat;
            if (i._dragEnable && i._jogEnable && g == 1) {
                c = new Date().getTime() - c;
                d = k.clientX - d;
                b = k.clientY - b;
                var l = Math.sqrt(Math.pow(d, 2) + Math.pow(b, 2));
                if ((2 * l) / Math.pow(c, 2) > 0.002) {
                    window.clearInterval(i._timer.drag);
                    var j = 0;
                    i._timer.drag = setInterval(function() {
                        var m = CMMap.Tween.Cubic.easeOut(j, 0, l / 2, 10) - CMMap.Tween.Cubic.easeOut(j - 1, 0, l / 2, 10);
                        i._panBy(Math.round(d / l * m), Math.round(b / l * m));
                        i.trigger(i, "dragging");
                        if (j >= 10) {
                            window.clearInterval(i._timer.drag);
                            i._timer.drag = 0;
                            i.trigger(i, "dragend");
                            i.trigger(i, "moveend");
                            i._limitBounds()
                        }
                        j++
                    }, 40)
                } else {
                    if (l !== 0) {
                        i.trigger(i, "dragend", k);
                        i.trigger(i, "moveend", k);
                        i._limitBounds()
                    }
                }
            } else {
                if ((k.clientX - d) !== 0 && (k.clientY - b) !== 0) {
                    i.trigger(i, "dragend", k);
                    i.trigger(i, "moveend", k);
                    i._limitBounds()
                }
            }
        });
        this.addEvent(a, "dblclick", function(k) {
            if (i._doubleClickZoom && i._level < i._maxZoom) {
                i._zoom("+")
            }
            var j = i._getOffset(k);
            k.lnglat = i._layer2lnglat(j);
            if (i._maxZoom !== i._level) {
                i.trigger(i, "zoomstart", k)
            }
            i.trigger(i, "dblclick", k);
            if (i._maxZoom !== i._level) {
                i.trigger(i, "zoomend", k)
            }
            i._limitBounds();
            i.stopPropagation(k)
        });
        this.mousewheel(a, function(j) {
            if (i._maxZoom !== i._level && i._minZoom !== i._level) {
                i.trigger(i, "zoomstart", j)
            }
            if (i._scrollWheel) {
                if (j.delta > 0) {
                    if (parseInt(i._level) < parseInt(i._maxZoom)) {
                        i._zoom("+")
                    }
                } else {
                    if (parseInt(i._level) > parseInt(i._minZoom)) {
                        i._zoom("-")
                    }
                }
            }
            i.trigger(i, "mousewheel", j);
            if (i._maxZoom !== i._level && i._minZoom !== i._level) {
                i.trigger(i, "zoomend", j)
            }
            i._limitBounds();
            i.stopPropagation(j)
        });
        if (this.isIE) {
            this.addEvent(a, "mouseenter", function(k) {
                i._mouse.In = true;
                var j = i._getOffset(k);
                k.lnglat = i._layer2lnglat(j);
                i.trigger(i, "mouseover", k)
            });
            this.addEvent(a, "mouseleave", function(k) {
                i._mouse.In = false;
                var j = i._getOffset(k);
                k.lnglat = i._layer2lnglat(j);
                i.trigger(i, "mouseout", k)
            })
        } else {
            this.addEvent(a, "mouseover", function(l) {
                var k = l.relatedTarget;
                if (k && !(k.compareDocumentPosition(this) & 8)) {
                    i._mouse.In = true;
                    var j = i._getOffset(l);
                    l.lnglat = i._layer2lnglat(j);
                    i.trigger(i, "mouseover", l)
                }
            });
            this.addEvent(a, "mouseout", function(l) {
                var k = l.relatedTarget;
                if (k && !(k.compareDocumentPosition(this) & 8)) {
                    i._mouse.In = false;
                    var j = i._getOffset(l);
                    l.lnglat = i._layer2lnglat(j);
                    i.trigger(i, "mouseout", l)
                }
            })
        }
        this.addEvent(a, "mousedown", function(k) {
            var j = i._getOffset(k);
            k.lnglat = i._layer2lnglat(j);
            i.trigger(i, "mousedown", k)
        });
        this.addEvent(a, "mouseup", function(k) {
            var j = i._getOffset(k);
            k.lnglat = i._layer2lnglat(j);
            i.trigger(i, "mouseup", k)
        });
        this.addEvent(a, "click", function(k) {
            var j = i._getOffset(k);
            k.lnglat = i._layer2lnglat(j);
            i.trigger(i, "click", k)
        });
        this.addEvent(a, "mousemove", function(j) {
            j.pixel = i._getOffset(j);
            j.lnglat = i._layer2lnglat(j.pixel);
            j.tile = i._getTileNum(CMMap.Util.lnglat2pixel(j.lnglat, i._level), {
                x: 0,
                y: 0
            });
            i._mouse = {
                x: j.pixel.x,
                y: j.pixel.y,
                In: true,
                lnglat: j.lnglat
            };
            i.trigger(i, "mousemove", j)
        });
        this.addEvent(a, "contextmenu", function(l) {
            var j = l;
            i.stopPropagation(l);
            var k = i._getOffset(j);
            j.lnglat = i._layer2lnglat(k);
            i.trigger(i, "rightclick", j)
        });
        this.addEvent(document, "keydown", function(j) {
            if (i._mouse.In && i._keyboardEnable) {
                switch (j.keyCode) {
                case 107:
                case 187:
                    i._zoom("+");
                    i.stopPropagation(j);
                    break;
                case 109:
                case 189:
                    i._zoom("-");
                    i.stopPropagation(j);
                    break;
                case 37:
                    if (j.ctrlKey) {
                        i._rotationMap(-15);
                        i.stopPropagation(j)
                    } else {
                        i.panBy(5, 0);
                        i.stopPropagation(j)
                    }
                    break;
                case 38:
                    i.panBy(0, 5);
                    i.stopPropagation(j);
                    break;
                case 39:
                    if (j.ctrlKey) {
                        i._rotationMap(15);
                        i.stopPropagation(j)
                    } else {
                        i.panBy(-5, 0);
                        i.stopPropagation(j)
                    }
                    break;
                case 40:
                    i.panBy(0, -5);
                    i.stopPropagation(j);
                    break;
                case 187:
                    if (CMMap.Util.isIE()) {
                        i._zoom("+");
                        i.stopPropagation(j)
                    }
                    break;
                case 189:
                    if (CMMap.Util.isIE()) {
                        i._zoom("-");
                        i.stopPropagation(j)
                    }
                    break;
                default:
                    break
                }
            }
        })
    },
    _selectZoomEffect: function(e) {
        if (this._rotation !== 0 && this._rotateEnable) {
            return
        }
        this._lastTile = this._tile;
        var b = this._level - e;
        if (!this._mouse.In) {
            this._mouse.x = this._width / 2;
            this._mouse.y = this._height / 2
        }
        var a = CMMap.Util.pixel2lnglat({
            x: this._relative.x + this._mouse.x - this._lays.x,
            y: this._relative.y + this._mouse.y - this._lays.y
        }, e);
        if (b == 1 && this._mouse.In) {
            this._center = {
                lng: (this._center.lng + a.lng) / 2,
                lat: (this._center.lat + a.lat) / 2
            }
        }
        if (b == -1 && this._mouse.In) {
            this._center = {
                lng: (2 * this._center.lng - a.lng),
                lat: (2 * this._center.lat - a.lat)
            }
        }
        var f = CMMap.$("_mc_" + this._unique).children[0];
        var c = CMMap.$("_lay_" + this._unique + "_" + this._layers[0].id);
        var d = CMMap.$("_mc_" + this._unique).children[1];
        d.innerHTML = c.innerHTML;
        d.style.left = this._lays.x + "px";
        d.style.top = this._lays.y + "px";
        f.style.display = "none";
        window.clearInterval(this._timer.lay);
        if ("WebkitTransform" in document.documentElement.style) {
            this._transform("WebkitTransform", d, f, b)
        } else {
            if ("MozTransform" in document.documentElement.style) {
                this._transform("MozTransform", d, f, b)
            } else {
                if ("OTransform" in document.documentElement.style) {
                    this._transform("OTransform", d, f, b)
                } else {
                    if ("msTransform" in document.documentElement.style) {
                        this._transform("msTransform", d, f, b)
                    } else {
                        this._zoomEffect(e, d, f, b)
                    }
                }
            }
        }
    },
    _transform: function(d, f, h, b) {
        var c = this;
        var e = 1;
        var a = this._lays;
        b = b == 1 ? 1 : -0.5;
        var g = b == 1 ? 5 : 10;
        this._timer.lay = setInterval(function() {
            f.style[d] = "scale(" + (1 + b * e / g) + ")";
            f.style[d + "Origin"] = (c._mouse.x - a.x) + "px " + (c._mouse.y - a.y) + "px";
            e++;
            if (e > g) {
                window.clearInterval(c._timer.lay);
                h.style.display = "block"
            }
        }, 30)
    },
    _zoomEffect: function(a, g, l, b) {
        var m = this
          , c = this._relative;
        var j = this._getTileNum(CMMap.Util.lnglat2pixel(this._mouse.lnglat, a), {
            x: 0,
            y: 0
        });
        var e = CMMap.Util.arraySearch(j.column + "." + j.line, this._lastTile);
        e = e ? e : Math.floor(this._lastTile.length / 2);
        var k = {
            x: this._mouse.x - m._lays.x - parseInt(g.children[e].style.left),
            y: this._mouse.y - m._lays.y - parseInt(g.children[e].style.top)
        };
        var d = 3
          , f = 0
          , h = (b == 1) ? 64 : -32
          , n = (b == 1) ? 1 : 0.5;
        this._timer.lay = setInterval(function() {
            var s = m._lastTile[e].split(".");
            var y = s[0]
              , p = s[1];
            for (var t = 0; t < m._lastTile.length; t++) {
                var r = h * f;
                var q = k.x * b / d * f * n;
                var o = k.y * b / d * f * n;
                g.children[t].style.width = g.children[t].style.height = 256 + r + "px";
                var u = m._lastTile[t].split(".");
                var i = u[0]
                  , x = u[1];
                var w = (256 * i - c.x);
                var v = (256 * x - c.y);
                if (i <= y) {
                    w -= Math.abs(y - i) * r + q
                } else {
                    if (i > y) {
                        w += Math.abs(y - i) * r - q
                    }
                }
                if (x <= p) {
                    v -= Math.abs(p - x) * r + o
                } else {
                    if (x > p) {
                        v += Math.abs(p - x) * r - o
                    }
                }
                g.children[t].style.left = Math.round(w) + "px";
                g.children[t].style.top = Math.round(v) + "px"
            }
            if (f > d) {
                window.clearInterval(m._timer.lay);
                l.style.display = "block"
            }
            f++
        }, 100)
    },
    getCanvasLayer: function(b) {
        var a = null ;
        if (this._unique) {
            if (b) {
                if (CMMap.$(b)) {
                    a = CMMap.$(b)
                }
            } else {
                if (CMMap.$("_lay_" + this._unique + "_overlayCanvas")) {
                    a = CMMap.$("_lay_" + this._unique + "_overlayCanvas")
                }
            }
        }
        return a
    },
    calcCanvasOffset: function() {
        var a = CMMap.$("_mc_" + this._unique).children[0].children[1];
        this._canvasOffset.x = (parseInt(a.parentNode.style.left)) / (-1);
        this._canvasOffset.y = (parseInt(a.parentNode.style.top)) / (-1);
        return this._canvasOffset
    },
    adjustCanvasPos: function() {
        var b = this.getCanvasLayer();
        var a;
        if (b) {
            a = this.calcCanvasOffset();
            b.style.left = a.x + "px";
            b.style.top = a.y + "px"
        }
    }
};
CMMap.Control = {
    _left: 10,
    _top: 10,
    _minZoom: 0,
    _maxZoom: 19,
    _initControl: function() {
        this._minZoom = this._zooms[0];
        this._maxZoom = this._zooms[1];
        var a = [];
        a.push('<div  id="yjt_control" style="width:6px;height:4px;overflow:hidden;border-right:#F00 solid 2px;border-bottom:#F00 solid 2px;position:absolute;left:0;top:0;"></div>');
        a.push('<div style="width:6px;height:4px;overflow:hidden;border-left:#F00 solid 2px;border-bottom:#F00 solid 2px;position:absolute;left:100px;top:0;"></div>');
        a.push('<div style="width:6px;height:4px;overflow:hidden;border-top:#F00 solid 2px;border-left:#F00 solid 2px;position:absolute;left:100px;top:67px;"></div>');
        a.push('<div style="width:6px;height:4px;overflow:hidden;border-top:#F00 solid 2px;border-right:#F00 solid 2px;position:absolute;left:0;top:67px;"></div>');
        CMMap.$("_frame_" + this._unique).innerHTML = a.join("")
    },
    _frame: function(a) {}
};
CMMap.Interface = {
    getZoom: function() {
        return this._level
    },
    setZoom: function(a) {
        a = parseInt(a);
        if (!CMMap.Util.verifyLevel(a, this._zooms[0], this._zooms[1])) {
            CMMap.Util.error("Map.setZoom", "参数不符合要求");
            return
        }
        this._zoom(a)
    },
    getZooms: function() {
        return this._zooms
    },
    getCenter: function() {
        return new CMMap.LngLat(this._center.lng,this._center.lat)
    },
    setCenter: function(b) {
        b = b !== undefined ? {
            lng: parseFloat(b.lng),
            lat: parseFloat(b.lat)
        } : {};
        if (!CMMap.Util.verifyLnglat(b)) {
            CMMap.Util.error("Map.setCenter", "参数不符合要求");
            return
        }
        var a = CMMap.Util.lnglat2pixel(this._center, this._level);
        var c = CMMap.Util.lnglat2pixel(b, this._level);
        this._center = b;
        this._zoom();
        this.adjustCanvasPos();
        this.trigger(this, "mapmove", {
            x: a.x - c.x,
            y: a.y - c.y
        })
    },
    setZoomAndCenter: function(b, a) {
        b = parseInt(b);
        a = a !== undefined ? {
            lng: parseFloat(a.lng),
            lat: parseFloat(a.lat)
        } : {};
        if (!CMMap.Util.verifyLevel(b, this._zooms[0], this._zooms[1]) || !CMMap.Util.verifyLnglat(a)) {
            CMMap.Util.error("Map.setCenter", "参数不符合要求");
            return
        }
        this._mouse.In = false;
        this._center = a;
        this._zoom(b)
    },
    getBounds: function() {
        var b = this._layer2lnglat({
            x: 0,
            y: this._height
        });
        var a = this._layer2lnglat({
            x: this._width,
            y: 0
        });
        return new CMMap.Bounds(new CMMap.LngLat(b.lng,b.lat),new CMMap.LngLat(a.lng,a.lat))
    },
    setBounds: function(c) {
        swlng = c !== undefined && c.southwest !== undefined ? parseFloat(c.southwest.lng) : undefined;
        swlat = c !== undefined && c.southwest !== undefined ? parseFloat(c.southwest.lat) : undefined;
        nelng = c !== undefined && c.northeast !== undefined ? parseFloat(c.northeast.lng) : undefined;
        nelat = c !== undefined && c.northeast !== undefined ? parseFloat(c.northeast.lat) : undefined;
        c = {
            southwest: {
                lng: swlng,
                lat: swlat
            },
            northeast: {
                lng: nelng,
                lat: nelat
            }
        };
        if (!CMMap.Util.verifyLnglat(c.southwest) || !CMMap.Util.verifyLnglat(c.northeast)) {
            CMMap.Util.error("Map.setBounds", "参数不符合实际情况");
            return
        }
        var e = CMMap.Util.getDistance(c.southwest, c.northeast);
        var a = {
            lng: (parseFloat(c.northeast.lng) + parseFloat(c.southwest.lng)) / 2,
            lat: (parseFloat(c.northeast.lat) + parseFloat(c.southwest.lat)) / 2
        };
        var b = Math.round(e) / Math.sqrt(Math.pow(this._width, 2) + Math.pow(this._height, 2));
        var d = Math.floor(Math.LOG2E * Math.log(Math.cos(a.lat * Math.PI / 180) * 2 * Math.PI * 6378137 / b / 256));
        if (d > this._zooms[1]) {
            d = this._zooms[1]
        }
        if (this._level == d) {
            this.setCenter(a)
        } else {
            this.setZoomAndCenter(d, a)
        }
    },
    setFitBounds: function(c) {
        swlng = c !== undefined && c.southwest !== undefined ? parseFloat(c.southwest.lng) : undefined;
        swlat = c !== undefined && c.southwest !== undefined ? parseFloat(c.southwest.lat) : undefined;
        nelng = c !== undefined && c.northeast !== undefined ? parseFloat(c.northeast.lng) : undefined;
        nelat = c !== undefined && c.northeast !== undefined ? parseFloat(c.northeast.lat) : undefined;
        c = {
            southwest: {
                lng: swlng,
                lat: swlat
            },
            northeast: {
                lng: nelng,
                lat: nelat
            }
        };
        if (!CMMap.Util.verifyLnglat(c.southwest) || !CMMap.Util.verifyLnglat(c.northeast)) {
            CMMap.Util.error("Map.setBounds", "参数不符合实际情况");
            return
        }
        var e = CMMap.Util.getDistance(c.southwest, c.northeast);
        var a = {
            lng: (parseFloat(c.northeast.lng) + parseFloat(c.southwest.lng)) / 2,
            lat: (parseFloat(c.northeast.lat) + parseFloat(c.southwest.lat)) / 2
        };
        var b = Math.round(e) / Math.sqrt(Math.pow(this._width, 2) + Math.pow(this._height, 2));
        var d = Math.floor(Math.LOG2E * Math.log(Math.cos(a.lat * Math.PI / 180) * 2 * Math.PI * 6378137 / b / 256) - 0.7);
        if (this._level == d) {
            this.setCenter(a)
        } else {
            if (d > this._zooms[1]) {
                d = this._zooms[1]
            } else {
                if (d < this._zooms[0]) {
                    d = this._zooms[0]
                }
            }
            this.setZoomAndCenter(d, a)
        }
    },
    getLimitBounds: function() {
        var b = new CMMap.LngLat(this._northwestLimit.lng,this._southeastLimit.lat);
        var a = new CMMap.LngLat(this._southeastLimit.lng,this._northwestLimit.lat);
        return new CMMap.Bounds(b,a)
    },
    setLimitBounds: function(a) {
        swlng = a !== undefined && a.southwest !== undefined ? parseFloat(a.southwest.lng) : undefined;
        swlat = a !== undefined && a.southwest !== undefined ? parseFloat(a.southwest.lat) : undefined;
        nelng = a !== undefined && a.northeast !== undefined ? parseFloat(a.northeast.lng) : undefined;
        nelat = a !== undefined && a.northeast !== undefined ? parseFloat(a.northeast.lat) : undefined;
        a = {
            southwest: {
                lng: swlng,
                lat: swlat
            },
            northeast: {
                lng: nelng,
                lat: nelat
            }
        };
        if (!CMMap.Util.verifyLnglat(a.southwest) || !CMMap.Util.verifyLnglat(a.northeast)) {
            CMMap.Util.error("Map.setLimitBounds", "参数不符合实际情况");
            return
        }
        this._northwestLimit = {
            lng: a.southwest.lng,
            lat: a.northeast.lat
        };
        this._southeastLimit = {
            lng: a.northeast.lng,
            lat: a.southwest.lat
        }
    },
    clearLimitBounds: function() {
        this._northwestLimit = {
            lng: -180,
            lat: 85.051128
        };
        this._southeastLimit = {
            lng: 180,
            lat: -85.051128
        }
    },
    getSize: function() {
        return new CMMap.Size(this._width,this._height)
    },
    getRotation: function() {
        return this._rotation
    },
    setRotation: function(a) {
        if (!this._rotateEnable) {
            CMMap.Util.error("Map.setLimitBounds", "没有旋转权限！");
            return
        }
        a = parseInt(a);
        if (a === undefined || !CMMap.Util.verifyRotation(a)) {
            CMMap.Util.error("Map.setRotation", "参数不符合实际情况");
            return
        }
        this._rotation = a;
        this._rotationMap()
    },
    getStatus: function() {
        var a = {};
        var c = ["dragEnable", "zoomEnable", "doubleClickZoom", "keyboardEnable", "jogEnable", "scrollWheel"];
        for (var b in c) {
            opt = c[b];
            prop = "_" + opt;
            a[opt] = this[prop]
        }
        return a
    },
    setStatus: function(a) {
        if (a === undefined) {
            CMMap.Util.error("Map.setStatus", "参数不符合实际情况");
            return
        }
        var c = ["dragEnable", "zoomEnable", "doubleClickZoom", "keyboardEnable", "jogEnable", "scrollWheel"];
        for (var b in c) {
            opt = c[b];
            prop = "_" + opt;
            if (a[opt] !== undefined) {
                var d = a[opt] != "false" && Boolean(a[opt]);
                this[prop] = d
            }
        }
    },
    getDefaultCursor: function() {
        return this._cursor.map
    },
    setDefaultCursor: function(a) {
        if (!a || typeof a != "string") {
            CMMap.Util.error("Map.setDefaultCursor", "参数不符合实际情况");
            return
        }
        this._cursor.map = a;
        this._container.style.cursor = this._cursor.map == "default" ? "default" : "url(" + a + "),pointer"
    },
    zoomIn: function() {
        this._zoom("+")
    },
    zoomOut: function() {
        this._zoom("-")
    },
    panTo: function(b) {
        b = b !== undefined ? {
            lng: parseFloat(b.lng),
            lat: parseFloat(b.lat)
        } : {};
        if (!CMMap.Util.verifyLnglat(b)) {
            CMMap.Util.error("Map.panTo", "参数不符合要求");
            return
        }
        var a = CMMap.Util.lnglat2pixel(this._center, this._level);
        var c = CMMap.Util.lnglat2pixel(b, this._level);
        this._panBy(a.x - c.x, a.y - c.y)
    },
    panBy: function(a, b) {
        a = parseInt(a);
        b = parseInt(b);
        if (a === undefined || b === undefined) {
            CMMap.Util.error("Map.panBy", "参数不符合要求");
            return
        }
        this._panBy(a, b)
    },
    clearMap: function() {
        this.clearbind();
        for (var a = 1; a < this._layers.length; a++) {
            var b = CMMap.$("_lay_" + this._unique + "_" + this._layers[a].id);
            b.parentNode.removeChild(b);
            this._layers.splice(a, 1)
        }
    },
    destroy: function() {
        var a = this._container;
        var b = a.getElementsByTagName("*");
        while (b.length > 0) {
            a.removeChild(b[0])
        }
    },
    plugin: function(b, f) {
        if (typeof b == "string") {
            b = [b]
        }
        for (var c = 0; c < b.length; c++) {
            var e = b[c].split(".");
            var d = window[e[0]][e[1]];
            if (typeof d != "function" || (typeof d === "function" && d.version === "v2")) {
                continue
            }
            b.splice(c, 1);
            c--
        }
        if (b.length === 0) {
            f();
            return
        }
        b = b.join(",");
        var a = CMMap.Conf._plugin + "key=" + CMMap.Conf._key + "&v=" + CMMap.Conf._version + "&name=" + b;
        new CMMap.AjaxRequest(a,f,true)
    },
    addControl: function(a) {
        if (a && typeof (a) == "object") {
            var b = CMMap.$("_mc_" + this._unique);
            if (a._getHtmlDom) {
                a._dom = a._getHtmlDom(this)
            } else {}
            b.parentNode.appendChild(a._dom);
            if (a.trigger) {
                a.trigger()
            }
        } else {}
    },
    removeControl: function(a) {
        var b = a._dom;
        b.parentNode.removeChild(b)
    },
    getTiles: function() {
        return this._tile.join(",").split(",")
    },
    getResolution: function() {
        return (Math.cos(this._center.lat * Math.PI / 180) * 2 * Math.PI * 6378137) / (256 * Math.pow(2, this._level))
    },
    getScale: function(a) {
        if (!a) {
            a = 96
        }
        if (!parseInt(a)) {
            CMMap.Util.error("Map.getScale", "参数应为数字")
        }
        return parseInt(this.getResolution() * a / 0.0254)
    },
    addLayer: function(b) {
        if (!b || b._type != "tilelayer") {
            CMMap.Util.error("Map.addLayer", "参数不符合实际情况")
        } else {
            var a = 0;
            for (var d = 0; d < this._layers.length; d++) {
                if (b.id == this._layers[d].id) {
                    a = 1;
                    break
                }
            }
            if (CMMap.$("_lay_" + this._unique + "_" + b.id) && a == 1) {
                var e = CMMap.$("_lay_" + this._unique + "_" + b.id);
                var f = e.getElementsByTagName("img");
                while (f.length > 0) {
                    e.removeChild(f[0])
                }
            } else {
                var c = document.createElement("div");
                c.id = "_lay_" + this._unique + "_" + b.id;
                c.style.cssText = "position:absolute;left:0;top:0;width:100%;z-index:1;-moz-user-select:none;";
                c.unselectable = "on";
                CMMap.$("_mc_" + this._unique).children[0].appendChild(c);
                if (a === 0) {
                    this._layers.push(b)
                }
            }
            this._addTile(b)
        }
    },
    getLayer: function(b) {
        for (var a = 0; a < this._layers.length; a++) {
            if (b == this._layers[a].id) {
                return this._layers[a]
            }
        }
        return false
    },
    removeLayer: function(a) {
        this._removeLayer(a)
    },
    addOverlays: function(c, b) {
        if (c instanceof Array) {
            for (var a = 0; a < c.length; a++) {
                this._addOverlay(c[a])
            }
        } else {
            this._addOverlay(c)
        }
        return true
    },
    getOverlays: function(c) {
        if (c instanceof Array) {
            var a = [];
            for (var b = 0; b < c.length; b++) {
                if (this._overlays[c[b]]) {
                    a.push(this._overlays[c[b]])
                }
            }
            return a
        } else {
            if (this._overlays[c]) {
                return this._overlays[c]
            }
            return false
        }
    },
    getOverlaysByType: function(a) {
        var b = [];
        for (var c in this._overlays) {
            if (this._overlays[c]._type == a) {
                b.push(this._overlays[c])
            }
        }
        return b
    },
    updateOverlay: function(a) {
        this.addOverlays(a)
    },
    removeOverlays: function(b) {
        if (b instanceof Array) {
            for (var a = 0; a < b.length; a++) {
                this._removeOverlay(b[a])
            }
        } else {
            this._removeOverlay(b)
        }
    },
    clearOverlays: function() {
        for (var a in this._overlays) {
            if (this._overlays[a].stopMove) {
                this._overlays[a].stopMove()
            }
            this._removeOverlay(this._overlays[a].id)
        }
    },
    clearOverlaysByType: function(a) {
        for (var b in this._overlays) {
            if (this._overlays[b]._type == a) {
                this.removeOverlays(b)
            }
        }
    },
    setFitView: function() {
        ove = this._overlays;
        var d = {
            minX: 180,
            minY: 90,
            maxX: 0,
            maxY: 0
        };
        function e(h) {
            d.minX = h.lng < d.minX ? h.lng : d.minX;
            d.minY = h.lat < d.minY ? h.lat : d.minY;
            d.maxX = h.lng > d.maxX ? h.lng : d.maxX;
            d.maxY = h.lat > d.maxY ? h.lat : d.maxY
        }
        for (var c in ove) {
            if (ove[c]._type == "marker") {
                e(ove[c].position)
            } else {
                if (ove[c]._type == "circle") {
                    var a = CMMap.Util.getLngLatByOffset(ove[c].center, -ove[c].radius, -ove[c].radius);
                    e(a);
                    var g = CMMap.Util.getLngLatByOffset(ove[c].center, ove[c].radius, ove[c].radius);
                    e(g)
                } else {
                    var f = ove[c].path;
                    for (var b = 0; b < f.length; b++) {
                        e(f[b])
                    }
                }
            }
        }
        this.setFitBounds({
            southwest: {
                lng: d.minX,
                lat: d.minY
            },
            northeast: {
                lng: d.maxX,
                lat: d.maxY
            }
        })
    },
    setMouseTool: function(d, b) {
        b = b || {};
        var a = this;
        var c = ["marker", "polyline", "circle", "rule", "rectZoomIn", "rectZoomOut", "polygon", "rectangle", "measureArea", "panWheelZoom"];
        if (c.join(",").indexOf(d) > -1) {
            if (!this._mousetool) {
                this.plugin("CMMap.Mouse", function() {
                    a._mousetool = new CMMap.Mouse(a);
                    a._mousetool["_" + d](b)
                })
            } else {
                this._mousetool["_" + d](b)
            }
        }
    },
    bind: function(d, a, c, b) {
        if (!b) {
            b = "default"
        }
        if (!this._event[d._type]) {
            this._event[d._type] = []
        }
        this._event[d._type].push({
            obj: d,
            name: a,
            func: c,
            cate: b
        });
        return true
    },
    unbind: function(d, a, c) {
        if (arguments[0] !== undefined && arguments[1] !== undefined && arguments[2] !== undefined) {
            for (var b = 0; b < this._event[d._type].length; b++) {
                if (this._event[d._type][b].listenerId == undefined) {
                    if (this._event[d._type][b].obj == d && this._event[d._type][b].name == a && this._event[d._type][b].func.toString() == c.toString()) {
                        this._event[d._type].splice(b, 1);
                        return true
                    }
                }
            }
            return false
        }
        return false
    },
    clearbind: function(c) {
        if (!c) {
            c = "default"
        }
        for (var a in this._event) {
            var d = this._event[a];
            for (var b = 0; b < d.length; b++) {
                if (d[b].cate != "system" && d[b].cate == c) {
                    d.splice(b, 1);
                    b--
                }
            }
        }
    },
    pixelToLngLat: function(b, c) {
        b = b !== undefined ? {
            x: parseInt(b.x),
            y: parseInt(b.y)
        } : undefined;
        if (b !== undefined && b.x === undefined || b.y === undefined) {
            CMMap.Util.error("Map.pixelToLngLat", "参数不符合要求");
            return
        }
        var a = CMMap.Util.pixel2lnglat(b, c);
        return new CMMap.LngLat(a.lng,a.lat)
    },
    lnglatToPixel: function(a, c) {
        a = a !== undefined ? {
            lng: parseFloat(a.lng),
            lat: parseFloat(a.lat)
        } : {};
        if (!CMMap.Util.verifyLnglat(a)) {
            CMMap.Util.error("Map.lnglatToPixel", "参数不符合要求");
            return
        }
        var b = CMMap.Util.lnglat2pixel(a, c);
        return new CMMap.Pixel(b.x,b.y)
    },
    containerToLngLat: function(b, c) {
        b = b !== undefined ? {
            x: parseInt(b.x),
            y: parseInt(b.y)
        } : undefined;
        if (b !== undefined && b.x === undefined || b.y === undefined) {
            CMMap.Util.error("Map.containerToLngLat", "参数不符合要求");
            return
        }
        var a = {
            x: b.x + this._relative.x,
            y: b.y + this._relative.y
        };
        return CMMap.Util.pixel2lnglat(a, this._level)
    },
    lngLatToContainer: function(a, d) {
        a = a !== undefined ? {
            lng: parseFloat(a.lng),
            lat: parseFloat(a.lat)
        } : {};
        if (!CMMap.Util.verifyLnglat(a)) {
            CMMap.Util.error("Map.lngLatToContainer", "参数不符合要求");
            return
        }
        d = d || this._level;
        var c = CMMap.Util.lnglat2pixel(a, d);
        var b = {
            x: c.x - this._relative.x,
            y: c.y - this._relative.y
        };
        return new CMMap.Pixel(b.x,b.y)
    },
    _limitBounds: function() {
        var b = CMMap.Util.lnglat2pixel(this._center, this._level);
        var a = {};
        a.lng = this._center.lng;
        a.lat = this._center.lat;
        if (this._northwestLimit.lng < a.lng && a.lng < this._southeastLimit.lng && this._northwestLimit.lat > a.lat && a.lat > this._southeastLimit.lat) {
            return
        } else {
            if (a.lng < this._northwestLimit.lng) {
                a.lng = this._northwestLimit.lng
            }
            if (a.lat > this._northwestLimit.lat) {
                a.lat = this._northwestLimit.lat
            }
            if (a.lng > this._southeastLimit.lng) {
                a.lng = this._southeastLimit.lng
            }
            if (a.lat < this._southeastLimit.lat) {
                a.lat = this._southeastLimit.lat
            }
        }
        this.panTo(a)
    },
    _rotationMap: function(c) {
        var b;
        if (c !== undefined) {
            this._rotation = this._rotation + c;
            b = this._rotation % 360;
            if (this._rotation < 0) {
                b = 360 + this._rotation
            }
        } else {
            b = this._rotation
        }
        var a = "_lay_" + this._unique;
        var d = document.getElementById(a);
        if (this.isIE8) {
            return
        } else {
            if (this.isIE9 || this.isIE10) {
                d.style.cssText = "-ms-transform: rotate(" + b + "deg) ; -ms-transform-origin:" + this._width / 2 + "px " + this._height / 2 + "px 0px; "
            } else {
                if (this.isGecko) {
                    d.style.cssText = "-moz-transform: rotate( " + b + "deg) ; -moz-transform-origin:" + this._width / 2 + "px " + this._height / 2 + "px 0px; "
                } else {
                    if (this.isOpera) {
                        d.style.cssText = "-o-transform: rotate( " + b + "deg) ; -o-transform-origin:" + this._width / 2 + "px " + this._height / 2 + "px 0px; "
                    } else {
                        if (this.isWebkit) {
                            d.style.cssText = "-webkit-transform: rotate3d(0, 0, 1, " + b + "deg) scale(1.00,1.00) translateZ(0px) ; -webkit-transform-origin:" + this._width / 2 + "px " + this._height / 2 + "px 0px; "
                        } else {
                            d.style.cssText = "transform: rotate3d(0, 0, 1, " + b + "deg) scale(1.00,1.00) translateZ(0px) ; transform-origin:" + this._width / 2 + "px " + this._height / 2 + "px 0px; "
                        }
                    }
                }
            }
        }
    },
    lnglatToCanvasPixel: function(b, e) {
        e = e || this._level;
        var c = CMMap.Util.lnglat2pixel(b, e);
        var a = c.x - this._relative.x;
        var d = c.y - this._relative.y;
        return new CMMap.Pixel(a - this._canvasOffset.x,d - this._canvasOffset.y)
    },
    canvasPixelToLnglat: function(b, c) {
        c = c || this._level;
        b = b !== undefined ? {
            x: parseInt(b.x),
            y: parseInt(b.y)
        } : undefined;
        if (b !== undefined && b.x === undefined || b.y === undefined) {
            CMMap.Util.error("Map.containerToLngLat", "参数不符合要求");
            return
        }
        var a = {
            x: b.x + this._relative.x + this._canvasOffset.x,
            y: b.y + this._relative.y + this._canvasOffset.y
        };
        return CMMap.Util.pixel2lnglat(a, c)
    }
};
CMMap.Map = CMMap.Class(CMMap.Conf, CMMap.Event, CMMap.Layerset, CMMap.Control, CMMap.Interface, {
    _type: "map",
    _unique: 0,
    _level: 13,
    _rotation: 0,
    _center: {
        lng: 116.3977713227539,
        lat: 39.92358105898725
    },
    _width: 0,
    _height: 0,
    _northwestLimit: {
        lng: -179,
        lat: 85.051128
    },
    _southeastLimit: {
        lng: 179,
        lat: -85.051128
    },
    _zooms: [3, 17],
    _cursor: {
        map: "default"
    },
    _animateEnable: true,
    _rotateEnable: false,
    _resizeEnable: false,
    _dragEnable: true,
    _zoomEnable: true,
    _continuousZoomEnable: true,
    _doubleClickZoom: true,
    _keyboardEnable: true,
    _jogEnable: true,
    _scrollWheel: true,
    _touchZoom: true,
    _container: null ,
    initialize: function(b, a) {
        this._unique = CMMap.Util.guid();
        if (a !== undefined) {
            if (a.zooms !== undefined) {
                var c = parseInt(a.zooms[0]);
                var h = parseInt(a.zooms[1]);
                if (c !== undefined && h !== undefined && c >= this._zooms[0] && h <= 20 && c <= h) {
                    this._zooms[0] = c;
                    this._zooms[1] = h
                }
            }
            if (a.mapKey !== undefined) {
                CMMap.Conf._key = a.mapKey
            }
            if (a.view !== undefined) {
                if (a.view.center !== undefined) {
                    var g = parseFloat(a.view.center.lng);
                    var f = parseFloat(a.view.center.lat);
                    if (CMMap.Util.verifyLnglat({
                        lng: g,
                        lat: f
                    })) {
                        this._center.lng = g;
                        this._center.lat = f
                    }
                }
                var i = parseInt(a.view.rotation);
                if (CMMap.Util.verifyRotation(i)) {
                    this._rotation = a.view.rotation
                }
                var d = parseInt(a.view.zoom);
                if (CMMap.Util.verifyLevel(d, this._zooms[0], this._zooms[1])) {
                    this._level = a.view.zoom
                }
            }
            if (typeof a.cursor == "string") {
                this._cursor.map = a.cursor
            }
            if (typeof a.animateEnable == "boolean") {
                this._animateEnable = a.animateEnable
            }
            if (typeof a.rotateEnable == "boolean") {
                this._rotateEnable = a.rotateEnable
            }
            if (typeof a.resizeEnable == "boolean") {
                this._resizeEnable = a.resizeEnable
            }
            if (typeof a.dragEnable == "boolean") {
                this._dragEnable = a.dragEnable
            }
            if (typeof a.zoomEnable == "boolean") {
                this._zoomEnable = a.zoomEnable
            }
            if (typeof a.doubleClickZoom == "boolean") {
                this._doubleClickZoom = a.doubleClickZoom
            }
            if (typeof a.keyboardEnable == "boolean") {
                this._keyboardEnable = a.keyboardEnable
            }
            if (typeof a.jogEnable == "boolean") {
                this._jogEnable = a.jogEnable
            }
            if (typeof a.scrollWheel == "boolean") {
                this._scrollWheel = a.scrollWheel
            }
            if (typeof a.touchZoom == "boolean") {
                this._touchZoom = a.touchZoom
            }
        }
        b = document.getElementById(b);
        if (b === undefined) {
            return
        }
        this._container = b;
        this._width = CMMap.Util.pageSize(this._container).width;
        this._height = CMMap.Util.pageSize(this._container).height;
        if (this._container.style.position === "" && (this._container.currentStyle || document.defaultView.getComputedStyle(this._container, null )).position == "static") {
            this._container.style.position = "relative"
        }
        var e = [];
        e.push('<div class="mc_" id="_mc_' + this._unique + '" style="position:relative;width:100%;height:100%;background-color:#F2F2EF;overflow:hidden;z-index:0;">');
        e.push('<div id="_lay_' + this._unique + '" style="width:100%;position:absolute;left:0;top:0;-moz-user-select:none;" unselectable="on">');
        e.push("<div style=\"font-size:12px;width:180px;position:absolute;z-index:1000;border:#ccc solid 1px;background-color:#fff;font-family:'微软雅黑'; display:none;\"></div>");
        e.push("</div>");
        e.push('<div style="position:absolute;left:0;top:0;z-index:-1;" unselectable="on"></div>');
        e.push('<div style="position:absolute;left:0;top:0;">');
        e.push('<div style="position:absolute;left:0;top:0;z-index:504;visibility:hidden;"></div>');
        e.push("</div>");
        e.push("</div>");
        e.push('<div id="_frame_' + this._unique + '" style="width:108px;height:73px;overflow:hidden;position:absolute;z-index:306;display:none;"></div>');
        e.push('<div id="count' + this._unique + '"></div>');
        this._container.innerHTML = e.join("");
        this._initLayer();
        this._initControl();
        this._monitor()
    },
    _monitor: function() {
        var a = this;
        function b() {
            var c = CMMap.Util.pageSize(a._container);
            if (a._width != c.width || a._height != c.height) {
                a._width = c.width;
                a._height = c.height;
                a._reloadLayer();
                if (a._tip) {
                    setTimeout(function() {
                        a._tip.open(a, a._tip.position)
                    }, 500)
                }
                a.trigger(a, "resize", a)
            }
        }
        if (CMMap.Util.isIE() && !CMMap.Util.isIE9() && !CMMap.Util.isIE10()) {
            this.addEvent(this._container, "resize", b)
        } else {
            this._resizetimer = setInterval(b, 1000)
        }
    },
    _tileCount: function() {
        var b = document.getElementById("count" + this._unique);
        if (this._count) {
            var a = document.createElement("script");
            a.src = this._count + "?v=" + this._version + "&k=" + CMMap.Conf._key + "&u=" + window.location.href;
            a.onerror = function() {
                b.removeChild(a)
            }
            ;
            b.appendChild(a)
        }
    },
    _panBy: function(k, h) {
        var j = CMMap.$("_mc_" + this._unique);
        var l = j.children[0]
          , g = j.children[1]
          , m = j.children[2];
        var i = l.children[1];
        var f = k * Math.cos((2 * Math.PI / 360) * this._rotation);
        var e = -k * Math.sin((2 * Math.PI / 360) * this._rotation);
        var c = h * Math.sin((2 * Math.PI / 360) * this._rotation);
        var b = h * Math.cos((2 * Math.PI / 360) * this._rotation);
        if (this._rotation !== 0 && this._rotateEnable) {
            this._lays.x += f + c;
            this._lays.y += e + b;
            g.style.left = i.style.left = m.style.left = this._lays.x + "px";
            g.style.top = i.style.top = m.style.top = this._lays.y + "px";
            this._northwest = {
                x: this._northwest.x - (f + c),
                y: this._northwest.y - (e + b)
            };
            this._southeast = {
                x: this._southeast.x - (f + c),
                y: this._southeast.y - (e + b)
            }
        } else {
            this._lays.x += k;
            this._lays.y += h;
            l.style.left = g.style.left = m.style.left = this._lays.x + "px";
            l.style.top = g.style.top = m.style.top = this._lays.y + "px";
            this._northwest = {
                x: this._northwest.x - k,
                y: this._northwest.y - h
            };
            this._southeast = {
                x: this._southeast.x - k,
                y: this._southeast.y - h
            }
        }
        var d = {
            x: this._relative.x + this._width / 2 - this._lays.x,
            y: this._relative.y + this._height / 2 - this._lays.y
        };
        this._center = CMMap.Util.pixel2lnglat(d, this._level);
        this._moveTile();
        this.adjustCanvasPos();
        this.trigger(this, "mapmove", {
            x: k,
            y: h
        })
    },
    _zoom: function(c) {
        if (!this._zoomEnable) {
            return false
        }
        var b = this._level;
        if (c == "+") {
            this._level++;
            this._level = this._level >= this._maxZoom ? this._maxZoom : this._level
        } else {
            if (c == "-") {
                this._level--;
                this._level = this._level <= this._minZoom ? this._minZoom : this._level
            } else {
                if (c >= this._minZoom && c <= this._maxZoom && c != this._level) {
                    this._level = c
                }
            }
        }
        if (Math.abs(this._level - b) == 1 && this._continuousZoomEnable) {
            this._selectZoomEffect(b)
        }
        if ((this._level - b) !== 0) {
            this._frame(this._level - b)
        }
        this._reloadLayer();
        if (b !== this._level) {
            this.trigger(this, "zoomstart")
        }
        if (b !== this._level) {
            this.trigger(this, "zoomchange", {
                lastLevel: b
            })
        }
        if (b !== this._level) {
            this.trigger(this, "zoomend");
            this._limitBounds()
        }
        if (this._tip) {
            var a = this;
            setTimeout(function() {
                a._tip.open(a, a._tip.position)
            }, 500)
        }
        this._lays = {
            x: 0,
            y: 0
        }
    },
    _layer2lnglat: function(b, d) {
        var c = CMMap.$("_mc_" + this._unique).children[0];
        var a = {
            x: this._relative.x + b.x - parseInt(c.style.left),
            y: this._relative.y + b.y - parseInt(c.style.top)
        };
        d = d || this._level;
        return CMMap.Util.pixel2lnglat(a, d)
    }
});
CMMap.Conf._key = 'e9ed19adb4a3754bbf2f07902ca0f3516c67238f43b4d1d4656278e0d1055d505443f404f81ab422';
CMMap.Conf._client = 'http://223.100.246.29:9091/jssdk/';
CMMap.Conf._plugin = 'http://223.100.246.29:9091/SDKService/jssdk/plugin?';
CMMap.Conf._version = '1.0';
