/**
 * Created by baijianye on 2015/8/31.
 */
/**
 *
 * # 描述
 * MarkerShape用于划定Marker的可点击区域范围。需要注意的是，在IE浏览器中图标透明区域默认为不触发事件，因此MarkerShape在IE中不起作用。
 *
 * **使用范例**：
 *
 *     @example
 *     markerShape = new CMMap.MarkerShape({type:"poly",coords:[5,5,20,5,20,20,5,20]});
 * @class CMMap.MarkerShape
 */
CMMap.MarkerShape = function (opt) {
    /**
     * @cfg {Array.<Number>} coords
     * 可点击区域组成元素数组，存放图形的像素坐标等信息，该数组元素由type决定：- circle:coords格式为 [x1, y1, r]，x1，y1为圆心像素坐标，r为圆半径；- poly: coords格式为 [x1, y1, x2, y2 … xn, yn]，各x，y表示多边形边界像素坐标；- rect: coords格式为 [x1, y1, x2, y2]，x1，y1为矩形左上角像素坐标，x2，y2为矩形右下角像素坐标。Markshape的像素坐标是指相对于marker的左上角的像素坐标偏移量。
     */
    this.coords = null;
    /**
     * @cfg {String} type
     * 可点击区域类型，可选值：- circle；圆形;- poly；多边形;- rect:矩形。
     */
    this.type = null;
    //初始化方法
    this.initialize(opt);
};

CMMap.MarkerShape.prototype = {
    /**
     * @constructor
     * 构造一个Marker可点击区域对象，通过MarkerShapeOptions设置可点击区域属性
     * @param {CMMap.MarkerShapeOptions} [opt] .
     */
    initialize: function (opt) {

    }
};

/**
 *
 * # 描述
 * 表示点标记的图标
 * 用于添加复杂点标记，即在普通点标记的基础上，添加Icon类，通过在Icon表示的大图上截取其中一部分作为标注的图标。
 *
 * **使用范例**：
 *
 *     @example
 *     icon = new CMMap.Icon({
 *                    size: new CMMap.Size(28, 37),
 *                    image: "http://webapi.amap.com/images/custom_a_j.png",
 *                    imageOffset: new CMMap.Pixel(-56, 0)
 *                })
 * @class CMMap.Icon
 */
CMMap.Icon = function (opt) {
    /**
     * @cfg {CMMap.Size} size
     * 图标尺寸，默认值(36,36)
     */
    this.size = new CMMap.Size(36, 36),
    /**
     * @cfg {CMMap.Pixel} imageOffset
     * 图标取图偏移量。当image中指定了一个大图时，可通过size和imageOffset配合，显示图标的指定范围
     */
        this.imageOffset = new CMMap.Pixel(0, 0),
    /**
     * @cfg {String} image
     * 图标的取图地址。默认为蓝色图钉图片
     */
        this.image = "",
        this._type = "icon",
    /**
     * @cfg {CMMap.Size} imageSize
     * 图标所用图片大小，根据所设置的大小拉伸或压缩图片，等同于CSS中的background-size属性。可用于实现高清屏的高清效果
     * @accessor
     */
        this.imageSize = null
    //初始化方法
    this.initialize(opt);
};

CMMap.Icon.prototype = {
    /**
     * @constructor
     * 构造点覆盖物图标，通过IconOptions设置图标属性
     * @param {CMMap.IconOptions} [opt] .
     */
    initialize: function (opt) {

    },

    getImageSize: function () {
        return this.imageSize;
    },

    getSize: function () {
        return this.size;
    },

    getImageOffset: function () {
        return this.imageOffset
    },

    getImage: function () {
        return this.image;
    },

    setImageSize: function (imageSize) {
        this.imageSize = imageSize;
    }
};

/**
 *
 * # 描述
 * 点标注用于标识地图上的点。API提供了默认图标样式，您也可以通过Icon类自定义标注图标。
 * Marker的构造函数的参数为MarkerOptions，用来设置点标注的经纬度位置、偏移量、图像、显示内容、图标是否可拖动、图标旋转、图标是否可见。
 * 在创建一个点标注之后，如果设定了map属性，则自动将其添加到地图上。或者在创建之后，调用一下Marker的setMap()方法。
 *
 * **使用范例**：
 *
 *     @example
 *     marker = new CMMap.Marker({
 *              map:window.map,
 *              position:new CMMap.LngLat(116.482122,39.901176)
 *             });
 * @class CMMap.Marker
 */
CMMap.Marker = function (opt) {
    /**
     * 鼠标左键单击事件
     * @event click
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标左键双击事件
     * @event dblclick
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标右键单击事件
     * @event rightclick
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标移动
     * @event mousemove
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标移近点标记时触发事件
     * @event mouseover
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标移出点标记时触发事件
     * @event mouseout
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标在点标记上按下时触发事件
     * @event mousedown
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标在点标记上按下后抬起时触发事件
     * @event mouseup
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 开始拖拽点标记时触发事件
     * @event dragstart
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标拖拽移动点标记时触发事件
     * @event dragging
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 点标记拖拽移动结束触发事件
     * @event dragend
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 点标记在执行moveTo，moveAlong动画时触发事件
     * @event moving
     */
    /**
     * 点标记执行moveTo动画结束时触发事件，也可以由moveAlong方法触发
     * @event moveend
     */
    /**
     * 点标记执行moveAlong动画一次后触发事件
     * @event movealong
     */
    /**
     * 触摸开始时触发事件，仅适用移动设备
     * @event touchstart
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 触摸移动进行中时触发事件，仅适用移动设备
     * @event touchmove
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 触摸结束时触发事件，仅适用移动设备
     * @event touchend
     * @param {MapsEvent} e 事件参数
     * @preventable
     */


    /**
     * 要显示该marker的地图对象
     * @cfg {CMMap.Map} map
     * @accessor
     */
    this.map = null;
    /**
     * @cfg {CMMap.LngLat} position
     * 点标记在地图上显示的位置，默认为地图中心点
     * @accessor
     */
    this.position = null;
    /**
     * @cfg {CMMap.Pixel} offset
     * 点标记显示位置偏移量，默认值为Pixel(-10,-34)。Marker指定position后，默认以marker左上角位置为基准点，
     * 对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。
     * 详细方法可参考开发指南中覆盖物一节中的相关介绍
     * @accessor
     */
    this.offset = new CMMap.Pixel(-10, -34);
    /**
     * @cfg {String/Icon} icon
     * 需在点标记中显示的图标。可以是一个本地图标地址，或者Icon对象。有合法的content内容时，此属性无效
     * @accessor
     */
    this.icon = "";
    /**
     * @cfg {String/Object} content
     * 点标记显示内容，可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖
     * @accessor
     */
    this.content = null;
    /**
     * @cfg {Boolean} topWhenClick
     * 鼠标点击时marker是否置顶，默认false ，不置顶
     */
    this.topWhenClick = false;
    /**
     * @cfg {Boolean} topWhenMouseOver
     * 鼠标移进时marker是否置顶，默认false，不置顶
     */
    this.topWhenMouseOver = false;
    /**
     * @cfg {Boolean} draggable
     * 设置点标记是否可拖拽移动，默认为false
     * @accessor
     */
    this.draggable = false;
    /**
     * @cfg {Boolean} raiseOnDrag
     * 设置拖拽点标记时是否开启点标记离开地图的效果
     */
    this.raiseOnDrag = false;
    /**
     * @cfg {String} cursor
     * 指定鼠标悬停时的鼠标样式，自定义cursor，
     * @since IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
     */
    this.cursor = "";
    /**
     * @cfg {Boolean} visible
     * 点标记是否可见，默认为true
     */
    this.visible = true;
    /**
     * @cfg {Number} zIndex
     * 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示。默认zIndex：100
     */
    this.zIndex = 100;
    /**
     * @cfg {Number} angle
     * 点标记的旋转角度。注：angle属性是使用CSS3来实现的，
     * @since 支持IE9及以上版本
     * @accessor
     */
    this.angle = 0;
    /**
     * @cfg {Boolean} autoRotation
     * 是否自动旋转。点标记在使用moveAlong动画时，路径方向若有变化，点标记是否自动调整角度，默认为false。
     * @since IE8以下不支持旋转，autoRotation属性无效
     */
    this.autoRotation = false;
    /**
     * @cfg {String} animation
     * 点标记的动画效果，
     * 默认值：“AMAP_ANIMATION_NONE”
     * 可选值：
     * “AMAP_ANIMATION_NONE”——无动画效果
     * “AMAP_ANIMATION_DROP”——点标掉落效果
     * “AMAP_ANIMATION_BOUNCE”——点标弹跳效果
     * @accessor
     */
    this.animation = "AMAP_ANIMATION_NONE";
    /**
     * @cfg {Icon} shadow
     * 点标记阴影，不设置该属性则点标记无阴影
     * @accessor
     */
    this.shadow = null;
    /**
     * @cfg {String} title
     * 鼠标滑过点标记时的文字提示，不设置则鼠标滑过点标无文字提示
     * @accessor
     */
    this.title = "";
    /**
     * @cfg {Boolean}
     * clickable 点标记是否可点击
     * @accessor
     */
    this.clickable = false;
    /**
     * @cfg {CMMap.MarkerShape} shape
     * 设置Marker的可点击区域，在定义的区域内可触发Marker的鼠标点击事件
     * @accessor
     */
    this.shape = null;
    /**
     * @cfg {Any extData}
     * 用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等
     * @accessor
     */
    this.extData = null;

    //初始化方法
    this.initialize(opt);
};

CMMap.Marker.prototype = {
    /**
     * @constructor
     * 构造一个点标记对象，通过MarkerOptions设置点标记对象的属性
     * @param {CMMap.MarkerOptions} [opt] .
     */
    initialize: function (opt) {

    },

    setMap: function (map) {

    },


    getOffset: function () {

    },

    setOffset: function (o) {

    },

    getAnimation: function () {

    },

    setAnimation: function (animate) {

    },

    getClickable: function () {

    },

    setClickable: function (clickable) {

    },

    getPosition: function () {

    },

    setPosition: function (o) {

    },

    getAngle: function () {

    },

    setAngle: function (angle) {

    },

    /**
     * @method
     * 设置点标记的叠加顺序，默认最先添加的点标记在最底层
     * @param {Number} zIndex 叠加顺序
     */
    setzIndex: function (zIndex) {

    },

    getIcon: function () {

    },

    setIcon: function (icon) {

    },

    getDraggable: function () {

    },

    setDraggable: function (draggable) {

    },

    /**
     * @method
     * 点标记隐藏
     */
    hide: function () {

    },

    /**
     * @method
     * 点标记显示
     */
    show: function () {

    },

    /**
     * @method
     * 设置鼠标悬停时的光标。参数cur可为CSS标注中的光标样式，如：setCursor(“pointer”)等；或者自定义的光标样式，如：setCursor("url('http://webapi.命名空间.com/images/0.png') ,pointer")
     * @param {String} cursor 光标样式或者url
     * @since 当浏览器不支持css2，url值不起作用，鼠标样式就按pointer来设置
     */
    setCursor: function (cursor) {

    },

    getContent: function () {

    },

    setContent: function (content) {

    },

    /**
     * @method
     * 以指定的速度，点标记沿指定的路径移动。
     * @param {Arrray} lnglatlist 路径坐标串
     * @param {Number} speed 指定速度，单位：千米/小时
     * @param {Function} f 回调函数f中可添加自定义功能
     * @param {Boolean} circlable 是否循环执行动画，默认为false
     * @fires movealong moving moveend
     */
    moveAlong: function (lnglatlist, speed, f, circlable) {

    },

    /**
     * @method
     * 以给定速度移动点标记到指定位置。
     * @param {CMMap.LngLat} lnglat (required) 指定位置，必设
     * @param {Number} speed 指定速度，单位：千米/小时
     * @param {Function} f 回调函数f中可添加自定义功能
     * @fires moving moveend
     */
    moveTo: function (lnglat, speed, f) {

    },

    /**
     * @method
     * 点标记停止动画。
     * @fires moveend
     */
    stopMove: function () {

    },

    getMap: function () {

    },

    getTitle: function () {

    },

    setTitle: function (title) {

    },

    /**
     * @method
     * 取得是否置顶
     * @return {Boolean} 是否置顶
     */
    getTop: function () {

    },

    /**
     * @method
     * 地图上有多个marker时，当isTop为true时，marker将显示在最前面；当为false时，marker取消置顶
     * @param {Boolean} isTop 是否置顶
     */
    setTop: function (isTop) {

    },

    getShadow: function () {

    },

    setShadow: function (shadow) {

    },

    getShape: function () {

    },

    setShape: function (shape) {

    },

    getExtData: function () {

    },

    setExtData: function (ext) {

    },

    /**
     * @method
     * 为点标记注册事件。
     * @param {Object} instance (required) 点标记对象，必设
     * @param {String} eventName 事件名称
     * @param {Function} f 回调函数f中可添加自定义功能
     * @return {Function} 事件响应函数
     */
    addListener: function (instance, eventName, f, flag) {

    },

    /**
     * @method
     * 为点标记移除事件。
     * @param {Object} instance (required) 点标记对象，必设
     * @param {String} eventName 事件名称
     * @param {Function} evtLister 事件响应函数
     */
    removeListener: function(instance, eventName, evtLister) {

    },
};

/**
 *
 * # 描述
 * Polyline表示地图上的折线覆盖物。它包含一组经纬度坐标LngLat，并将这些坐标连接起来形成折线。
 * 使用CMMap.Polyline(PolylineOptions)构造一个折线实例。其中PolylineOptions包括线的经纬度数组、线的颜色、线的不透明度，线的粗细、线的样式。
 * 颜色可以是十六进制数字形式（比如：#ff0000）或者是颜色关键字（比如：red）。
 * Polyline的绘制需要浏览器支持矢量绘制功能。在Internet Explorer中，地图使用VML绘制折线；在其他浏览器中使用Canvas绘制。
 *
 * **使用范例**：
 *
 *     @example
 *     polyline = new CMMap.Polyline({
 *                map:window.map,
 *                path: lineArr,
 *                strokeColor: "#FF0000",
 *                strokeOpacity: 0.8,
 *                strokeWeight: 9,
 *                isOutline:true,
 *                outlineColor:"#00FFFF",
 *                strokeStyle: "dashed",
 *                strokeDasharray: [10,2,10]
 *            });
 * @class CMMap.Polyline
 */
CMMap.Polyline = function (opt) {
    /**
     * 鼠标左键单击事件
     * @event click
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标左键双击事件
     * @event dblclick
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标右键单击事件
     * @event rightclick
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 隐藏
     * @event hide
     * @param {MapsEvent} e 事件参数
     */
    /**
     * 显示
     * @event show
     * @param {MapsEvent} e 事件参数
     */
    /**
     * 鼠标按下
     * @event mousedown
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标抬起
     * @event mouseup
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标经过
     * @event mouseover
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标移出
     * @event mouseout
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 属性发生变化时
     * @event change
     * @param {MapsEvent} e 事件参数
     */
    /**
     * 触摸开始时触发事件，仅适用移动设备
     * @event touchstart
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 触摸移动进行中时触发事件，仅适用移动设备
     * @event touchmove
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 触摸结束时触发事件，仅适用移动设备
     * @event touchend
     * @param {MapsEvent} e 事件参数
     * @preventable
     */

    /**
     * @cfg {CMMap.Map} map
     * 要显示该polyline的地图对象
     */
    this.map = null;
    /**
     * @cfg {Number} zIndex
     * 折线覆盖物的叠加顺序。默认叠加顺序，先添加的线在底层，后添加的线在上层。
     * 通过该属性可调整叠加顺序，使级别较高的折线覆盖物在上层显示。默认zIndex：50
     */
    this.zIndex = 50;
    /**
     * @cfg {Boolean} geodesic
     * 是否绘制大地线，默认false，不支持
     */
    this.geodesic = false;
    /**
     * @cfg {Boolean} isOutline
     * 线条是否带描边，默认false
     */
    this.isOutline = false;
    /**
     * @cfg {String} outlineColor
     * 线条描边颜色，此项仅在isOutline为true时有效，默认：#000000
     */
    this.outlineColor = "#000000";
    /**
     * @cfg {Array} path
     * 折线的节点坐标数组
     * @accessor
     */
    this.path = null;
    /**
     * @cfg {String} strokeColor
     * 线条颜色，使用16进制颜色代码赋值。默认值为#006600
     */
    this.strokeColor = "#006600";
    /**
     * @cfg {Number} strokeOpacity
     * 线条透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
     */
    this.strokeOpacity = 0.9;
    /**
     * @cfg {Number} strokeWeight
     * 线条宽度，单位：像素
     */
    this.strokeWeight = 1;
    /**
     * @cfg {String} strokeStyle
     * 线样式，实线:solid，虚线:dashed
     */
    this.strokeStyle = "solid";
    /**
     * @cfg {Array} strokeDasharray
     * 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效。
     * 有效取值：实线：[0,0,0]；
     *           虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线；
     *           点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白（如此反复）组成的虚线
     * @since 此属性在ie9+浏览器
     */
    this.strokeDasharray = [0, 0, 0];
    /**
     * @cfg {Any} extData
     * 用户自定义属性，支持JavaScript API任意数据类型，如Polyline的id等
     * @accessor
     */
    this.extData = null;

    //初始化方法
    this.initialize(opt);
};

CMMap.Polyline.prototype = {
    /**
     * @constructor
     * 构造折线对象，通过PolylineOptions指定折线样式
     * @param {CMMap.PolylineOptions} [opt] .
     */
    initialize: function (opt) {

    },

    /**
     * @method
     * 设置折线所在的地图。参数map即为目标地图，参数为null时，在地图上移除当前折线
     * @param {CMMap.Map} map (required) 地图对象，必设
     * @fires change
     */
    setMap: function (map) {

    },

    getExtData: function () {

    },

    setExtData: function (ext) {

    },

    setPath: function (path) {

    },

    getPath: function () {

    },

    /**
     * @method
     * 修改折线属性（包括路径的节点、线样式、是否绘制大地线等。属性详情参看PolylineOptions列表）
     * @param {CMMap.PolylineOptions} opt (required) 属性对象，必设
     * @fires change
     */
    setOptions: function (opt) {

    },

    /**
     * @method
     * 获取线的属性
     * @return {Object} 线的属性对象
     */
    getOptions: function () {

    },

    /**
     * @method
     * 获取折线的总长度（单位：米）
     * @return {Number} 折线的总长度
     */
    getLength: function () {

    },

    /**
     * @method
     * 获取当前折线的矩形范围对象
     * @return {CMMap.Bounds} 折线的矩形范围对象
     */
    getBounds: function () {

    },

    /**
     * @method
     * 地图上隐藏指定折线
     * @fires hide
     */
    hide: function () {

    },

    /**
     * @method
     * 地图上显示指定折线
     * @fires show
     */
    show: function () {

    },

    /**
     * @method
     * 为折线注册事件。
     * @param {Object} instance (required) 折线对象，必设
     * @param {String} eventName 事件名称
     * @param {Function} f 回调函数f中可添加自定义功能
     * @return {Function} 事件响应函数
     */
    addListener: function (instance, eventName, f, flag) {

    },

    /**
     * @method
     * 为折线移除事件。
     * @param {Object} instance (required) 折线对象，必设
     * @param {String} eventName 事件名称
     * @param {Function} evtLister 事件响应函数
     */
    removeListener: function(instance, eventName, evtLister) {

    }
}

/**
 *
 * # 描述
 * Polygon对象类似于Polyline对象，由一系列有序经纬度坐标构成,不同的是多边形是定义闭合区域。可以通过Polygon类的getArea()方法获取多边形的面积。
 * 与折线一样，您可以定义多边形的PolygonOptions来定义多边形的颜色、透明度、线宽、填充色、透明度。
 * 对于任意指定的路径，API将通过绘制连接最后一个坐标与第一个坐标的笔触以自动“封闭”任何多边形。也可以通过polygon类来绘制“环”多边形（多边形区域在多边形内显示为“岛”）。
 * 绘制“环”多边形时，路径path为二维数组，数组的第一个元素为外多边形，其余为“岛”多边形，外多边形需包含“岛”多边形，否则程序不作处理。
 *
 * **使用范例**：
 *
 *     @example
 *     var lineArr = [
 *         {lng:116.403322,lat:39.920255},
 *         {lng:116.410703,lat:39.897555},
 *         {lng:116.402292,lat:39.892353},
 *         {lng:116.389846,lat:39.891365}
 *     ];
 *     polygon = new CMMap.Polygon({
 *                map:window.map,
 *                path: lineArr,
 *                strokeColor: "#FF33FF",
 *                strokeOpacity: 0.1,
 *                strokeWeight: 3,
 *                fillColor: "#1791fc",
 *                fillOpacity: 0.85
 *            });
 * @class CMMap.Polygon
 */
CMMap.Polygon = function (opt) {
    /**
     * 鼠标左键单击事件
     * @event click
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标左键双击事件
     * @event dblclick
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标右键单击事件
     * @event rightclick
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 隐藏
     * @event hide
     * @param {MapsEvent} e 事件参数
     */
    /**
     * 显示
     * @event show
     * @param {MapsEvent} e 事件参数
     */
    /**
     * 鼠标按下
     * @event mousedown
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标抬起
     * @event mouseup
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标经过
     * @event mouseover
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标移出
     * @event mouseout
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 属性发生变化时
     * @event change
     * @param {MapsEvent} e 事件参数
     */
    /**
     * 触摸开始时触发事件，仅适用移动设备
     * @event touchstart
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 触摸移动进行中时触发事件，仅适用移动设备
     * @event touchmove
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 触摸结束时触发事件，仅适用移动设备
     * @event touchend
     * @param {MapsEvent} e 事件参数
     * @preventable
     */

    /**
     * @cfg {CMMap.Map} map
     * 要显示该polygon的地图对象
     */
    this.map = null;
    /**
     * @cfg {Number} zIndex
     * 多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示。默认zIndex：10
     */
    this.zIndex = 50;
    /**
     * @cfg {Float} fillOpacity
     * 多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
     */
    this.fillOpacity = 0.9;
    /**
     * @cfg {String} fillColor
     * 多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
     */
    this.fillColor = "#FFAA00";
    /**
     * @cfg {Array.<CMMap.LngLat>|Array.<Array.<CMMap.LngLat>>} path
     * 多边形轮廓线的节点坐标数组，当为“环”多边形时（多边形区域在多边形内显示为“岛”），path为二维数组，数组元素为多边形轮廓线的节点坐标数组。
     * “环”多边形时，要求数组第一个元素为外多边形，其余为“岛”多边形，外多边形需包含“岛”多边形，否则程序不作处理
     * @accessor
     */
    this.path = null;
    /**
     * @cfg {String} strokeColor
     * 线条颜色，使用16进制颜色代码赋值。默认值为#006600
     */
    this.strokeColor = "#006600";
    /**
     * @cfg {Float} strokeOpacity
     * 轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
     */
    this.strokeOpacity = 0.9;
    /**
     * @cfg {Number}
     * strokeWeight 轮廓线宽度
     */
    this.strokeWeight = 1;
    /**
     * @cfg {String} strokeStyle
     * 轮廓线样式，实线:solid，虚线:dashed
     */
    this.strokeStyle = "solid";
    /**
     * @cfg {Array} strokeDasharray
     * 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效，
     * 取值：实线：[0,0,0]；
     *       虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线；
     *       点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白（如此反复）组成的虚线
     * @since 此属性在ie9+浏览器有效
     */
    this.strokeDasharray = [0, 0, 0];
    /**
     * @cfg {Any} extData
     * 用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等
     * @accessor
     */
    this.extData = null;

    //初始化方法
    this.initialize(opt);
};

CMMap.Polygon.prototype = {
    /**
     * @constructor
     * 构造多边形对象，通过PolygonOptions指定多边形样式
     * @param {CMMap.PolygonOptions} [opt] .
     */
    initialize: function (opt) {

    },

    /**
     * @method
     * 在指定地图上显示当前的多边形。参数取值为null时，在地图上移除当前多边形
     * @param {CMMap.Map} map (required) 地图对象，必设
     * @fires change
     */
    setMap: function (map) {

    },

    getExtData: function () {

    },

    setExtData: function (ext) {

    },

    setPath: function (path) {

    },

    getPath: function () {

    },

    /**
     * @method
     * 修改多边形属性（样式风格，包括组成多边形轮廓线的节点、轮廓线样式等。属性详情参看PolygonOptions列表）
     * @param {CMMap.PolygonOptions} opt (required) 属性对象，必设
     * @fires change
     */
    setOptions: function (opt) {

    },

    /**
     * @method
     * 获取多边形的属性
     * @return {Object} 多边形的属性对象
     */
    getOptions: function () {

    },

    /**
     * @method
     * 判断指定点坐标是否在多边形范围内
     * @param {CMMap.LngLat} lnglat (required) 指定点的经纬度对象，必设
     * @return {Boolean} 判断结果
     */
    contains: function(lnglat) {

    },

    /**
     * @method
     * 获取多边形的面积（单位：平方米）
     * @return {Number} 多边形的面积
     */
    getArea: function() {

    },

    /**
     * @method
     * 获取当前多边形的矩形范围对象。
     * @return {CMMap.Bounds} 多边形的矩形范围对象
     */
    getBounds: function () {

    },

    /**
     * @method
     * 隐藏多边形
     * @fires hide
     */
    hide: function () {

    },

    /**
     * @method
     * 显示多边形
     * @fires show
     */
    show: function () {

    },

    /**
     * @method
     * 为多边形注册事件。
     * @param {Object} instance (required) 多边形对象，必设
     * @param {String} eventName 事件名称
     * @param {Function} f 回调函数f中可添加自定义功能
     * @return {Function} 事件响应函数
     */
    addListener: function (instance, eventName, f, flag) {

    },

    /**
     * @method
     * 为多边形移除事件。
     * @param {Object} instance (required) 多边形对象，必设
     * @param {String} eventName 事件名称
     * @param {Function} evtLister 事件响应函数
     */
    removeListener: function(instance, eventName, evtLister) {

    }
}


/*gaoyu*/

/**
 *
 * # 描述
 * CMMap.GroundImage图片覆盖物类，用于添加一个只有一张图片的图层，图片的大小会随着地图缩放级别的改变而自适应的调整大小。
 * CMMap.GroundImage构造函数的参数包括一个图片的Url地址，图片覆盖的范围Bounds(图片会根据Bounds的大小来显示)和GroundImageOptions对象，该对象指定了用于使用图片覆盖物时的一组初始化参数。
 *
 * **使用范例**：
 *
 *     @example
 *     groundImageOptions = {
 *  			opacity : 0.5,
 *  			clickable : false,
 *  			map : window.map
 *  		};
 *     groundImage = new CMMap.GroundImage(
 *  			'http://api.amap.com/Public/images/js/gwf.png',
 *              {southwest:{lng:116.384377, lat:39.935029},northeast:{lng:116.418331, lat:39.969577}},
 *              groundImageOptions);
 * @class CMMap.GroundImage
 */
CMMap.GroundImage = function(url, bounds, opt) {
    /**
     * 鼠标左键单击事件
     * @event click
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标左键双击事件
     * @event dblclick
     * @param {MapsEvent} e 事件参数
     * @preventable
     */

    /**
     * 要显示该groundImage的地图对象
     * @cfg {CMMap.Map} map
     * @accessor
     */
    this.map = null;
    /**
     * 图层是否可点击，若为可点击则groundImage支持鼠标点击事件，默认值：false
     * @cfg {Boolean} clickable
     */
    this.clickable = false;
    /**
     * @cfg {Number} opacity
     * 图片透明度，取值范围[0,1]，0表示完全透明，1表示不透明，默认值：1
     * @accessor
     */
    this.opacity = 1;

    //初始化方法
    this.initialize(opt);
};
CMMap.GroundImage.prototype = {
    /**
     * @constructor
     * 构造一个图片覆盖物对象，通过GroundImageOptions设置图片覆盖物对象的属性
     * @param {GroundImageOptions} [opt] .
     */
    initialize : function(opt) {

    },

    setMap : function(map) {

    },

    getMap : function() {

    },

    setOpacity : function(opacity) {

    },

    getOpacity : function() {

    },

    /**
     * @method
     * 获取GroundImage的覆盖地理范围
     */
    getBounds : function() {

    },

    /**
     * @method
     * 获取图片url
     */
    getImageUrl : function() {

    },

    /**
     * @method
     * 为图片覆盖物注册事件。
     * @param {Object} instance (required) 图片覆盖物对象，必设
     * @param {String} eventName 事件名称
     * @param {Function} f 回调函数f中可添加自定义功能
     * @return {Function} 事件响应函数
     */
    addListener : function(instance, eventName, f, flag) {

    },

    /**
     * @method
     * 为图片覆盖物移除事件。
     * @param {Object} instance (required) 图片覆盖物对象，必设
     * @param {String} eventName 事件名称
     * @param {Function} evtLister 事件响应函数
     */
    removeListener: function(instance, eventName, evtLister) {

    }
}

/**
 *
 * # 描述
 * 信息窗体在地图上方的浮动窗体中显示内容，用户可以点击地图上的一个标注，弹出相关活动的信息窗体。
 * InfoWindow构造函数的参数是InfoWindowOptions对象，该对象指定了用于显示信息窗体的一组初始参数。
 * 在创建信息窗体之 后，您需要调用InfoWindow的open()方法，向其传递要在其中打开信息窗体的Map，
 * 以及向其传递用于锚定信息窗体的Marker（可选）。 （如果未提供任何标记，那么，会在其position属性上打开信息窗体）。
 *
 * **使用范例**：
 *
 *     @example
 *     infoWindow = new CMMap.InfoWindow({
*              content: info.join("<br/>"),
*              size:new CMMap.Size(300, 200)
*     });
 * @class CMMap.InfoWindow
 */
CMMap.InfoWindow = function(opt) {
    /**
     * 属性发生变化时触发事件
     * @event change
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 信息窗体打开之后触发事件
     * @event open
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 信息窗体关闭之后触发事件
     * @event close
     * @param {MapsEvent} e 事件参数
     * @preventable
     */


    /**
     * @cfg {Boolean} isCustom
     * 是否自定义窗体。设为true时，信息窗体外框及内容完全按照content所设的值添加
     * （默认为false，即在系统默认的信息窗体外框中显示content内容）
     */
    this.isCustom = false;
    /**
     * @cfg {Boolean} autoMove
     * 是否自动调整窗体到视野内（当信息窗体超出视野范围时，
     * 通过该属性设置是否自动平移地图，使信息窗体完全显示）
     */
    this.autoMove = false;
    /**
     * @cfg {Boolean} closeWhenClickMap
     * 控制是否在鼠标点击地图后关闭信息窗体，默认false，鼠标点击地图后不关闭信息窗体
     */
    this.closeWhenClickMap = false;
    /**
     * @cfg {String/Object} content
     * 显示内容，可以是HTML要素字符串或者HTML DOM对象
     * @accessor
     */
    this.content = null;
    /**
     * @cfg {CMMap.Size} size
     * 信息窗体尺寸（isCustom为true时，该属性无效）
     * @accessor
     */
    this.size = null;
    /**
     * @cfg {CMMap.Pixel} offset
     * 相对于基点的偏移量。默认情况是信息窗体的底部中心点(BOTTOM_CENTER) 和基点之间的偏移量
     */
    this.offset = null;
    /**
     * @cfg {CMMap.LngLat} position
     * 信息窗体显示基点位置
     * @accessor
     */
    this.position = null;
    /**
     * @cfg {Boolean} showShadow
     * Boolean 控制是否显示信息窗体阴影，取值false时不显示窗体阴影，取值true时显示窗体阴影
     * 默认值：false
     */
    this.showShadow = false;

    //初始化方法
    this.initialize(opt);
};
CMMap.InfoWindow.prototype = {
    /**
     * @constructor
     * 构造一个信息窗体对象，通过InforWindowOptions设置信息窗体对象的属性
     * @param {CMMap.InforWindowOptions} [opt] .
     */
    initialize : function(opt) {

    },

    /**
     * @method
     * 在地图的指定位置打开信息窗体
     * @param {CMMap.Map} map (required) 要显示该infoWindow的地图对象，必设
     * @param {CMMap.LngLat} lnglat (required) 指定位置，必设
     * @fires Open
     */
    open : function(map, lnglat) {

    },

    /**
     * @method
     * 关闭信息窗体
     * @fires Close
     */
    close : function() {

    },

    getPosition : function() {

    },

    setPosition : function(lnglat) {

    },

    /**
     * @method
     * 获取信息窗体是否打开
     */
    getIsOpen : function() {

    },

    getContent : function() {

    },

    setContent : function(content) {

    },

    getSize : function() {

    },

    setSize : function(size) {

    },

    /**
     * @method
     * 为信息窗体注册事件。
     * @param {Object} instance (required) 信息窗体对象，必设
     * @param {String} eventName 事件名称
     * @param {Function} evtLister 事件响应函数
     */
    addListener : function(instance, eventName, f, flag) {

    },

    /**
     * @method
     * 为信息窗体移除事件。
     * @param {Object} instance (required) 信息窗体对象，必设
     * @param {Function} evtLister 事件响应函数
     */
    removeListener: function(instance, evtLister) {

    }
};

/**
 *
 * # 描述
 * Circle类与Polygon类似，可以使用CircleOptions指定圆构造函数属性的边的颜色、粗细和透明度，以及填充颜色和透明度。
 * 还有两个用于定义其形状的属性：center：中心点，radius：半径。
 *
 * **使用范例**：
 *
 *     @example
 *     circle = new CMMap.Circle({
*              center: new CMMap.LngLat(116.403322, 39.920255),
*              radius: 100,
*              strokeColor: "#F33",
*             });
 * @class CMMap.Circle
 */
CMMap.Circle = function(opt) {
    /**
     * 鼠标左键单击事件
     * @event click
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标左键双击事件
     * @event dblclick
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标右键单击事件
     * @event rightclick
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标移入圆容器事件
     * @event mouseover
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标移出圆容器事件
     * @event mouseout
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标单击抬起事件
     * @event mouseup
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 鼠标单击摁下事件
     * @event mousedown
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 触摸开始触发事件
     * @event touchstart
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 触摸移动进行中触发事件
     * @event touchmove
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 触摸结束触发事件
     * @event touchend
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 圆执行show方法时触发事件
     * @event show
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 圆执行hide方法时触发事件
     * @event hide
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 属性发生变化时触发事件
     * @event change
     * @param {MapsEvent} e 事件参数
     * @preventable
     */


    /**
     * 要显示该circle的地图对象
     * @cfg {CMMap.Map} map
     */
    this.map = null;
    /**
     * @cfg {Number} zIndex
     * 层叠顺序。默认zIndex:10
     */
    this.zIndex = 10;
    /**
     * @cfg {CMMap.LngLat} center
     * 圆心位置
     * @accessor
     */
    this.center = null;
    /**
     * @cfg {Number} radius
     * 圆半径，单位:米
     * @accessor
     */
    this.radius = null;
    /**
     * @cfg {String} strokeColor
     * 线条颜色，使用16进制颜色代码赋值。默认值为#006600
     */
    this.strokeColor = "#006600";
    /**
     * @cfg {Float} strokeOpacity
     * 轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
     */
    this.strokeOpacity = 0.9;
    /**
     * @cfg {Number} strokeWeight
     * 轮廓线宽度
     */
    this.strokeWeight = null;
    /**
     * @cfg {String} fillColor
     * 圆形填充颜色,使用16进制颜色代码赋值。默认值为#006600
     */
    this.fillColor = "#006600";
    /**
     * @cfg {Float} fillOpacity
     * 圆形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
     */
    this.fillOpacity = 0.9;
    /**
     * @cfg {String} strokeStyle
     * 轮廓线样式，实线:solid，虚线:dashed
     */
    this.strokeStyle = "solid";
    /**
     * @cfg {Any} extData
     * 用户自定义属性，支持JavaScript API任意数据类型，如Circle的id等
     * @accessor
     */
    this.extData = null;
    /**
     * @cfg {Array} strokeDasharray
     * 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值：
     * 实线：[0,0,0]
     * 虚线：[10,10] ，[10,10] 表示10 个像素的实线和10 个像素的空白（如此反复）组成的虚线
     * 点画线：[10,2,10]， [10,2,10] 表示10 个像素的实线和2 个像素的空白 + 10 个像素的实线和10 个像素的空白 （如此反复）组成的虚线
     */
    this.strokeDasharray = [0, 0, 0];

    // 初始化方法
    this.initialize(opt);
};
CMMap.Circle.prototype = {
    /**
     * @constructor
     * 构造圆形覆盖物，通过CircleOptions设置圆形
     * @param {CMMap.CircleOptions} [opt] .
     */
    initialize : function(opt) {

    },

    /**
     * @method
     * 在指定地图上添加该圆形覆盖物。参数取值为null时，在地图上移除当前圆形
     * @param {CMMap.Map} map (required) 地图对象，必设
     */
    setMap: function (map) {

    },

    setCenter: function (center) {

    },

    getCenter: function () {

    },

    /**
     * @method
     * 获取圆外切矩形范围
     * @return {CMMap.Bounds} 圆外切矩形范围对象
     */
    getBounds: function () {

    },

    setRadius: function (radius) {

    },

    getRadius: function () {

    },

    /**
     * @method
     * 修改圆属性（样式风格，包括组成圆形轮廓线的节点、轮廓线样式等。属性详情参看CircleOptions列表）
     * @param {CMMap.CircleOptions} opt (required) 属性对象，必设
     * @fires change
     */
    setOptions: function (opt) {

    },

    /**
     * @method
     * 获取圆形的属性
     * @return {Object} 圆形的属性对象
     */
    getOptions: function () {

    },

    setExtData: function (ext) {

    },

    getExtData: function () {

    },
    /**
     * @method
     * 判断指定点坐标是否在圆内
     * @param {CMMap.LngLat} lnglat (required) 指定点的经纬度对象，必设
     * @return {Boolean} 判断结果
     */
    contains: function(lnglat) {

    },

    /**
     * @method
     * 显示圆形
     * @fires show
     */
    show: function () {

    },

    /**
     * @method
     * 隐藏圆形
     * @fires hide
     */
    hide: function () {

    },

    /**
     * @method
     * 为圆注册事件。
     * @param {Object} instance (required) 圆对象，必设
     * @param {String} eventName 事件名称
     * @param {Function} f 回调函数f中可添加自定义功能
     * @return {Function} 事件响应函数
     */
    addListener: function (instance, eventName, f, flag) {

    },

    /**
     * @method
     * 为圆移除事件。
     * @param {Object} instance (required) 圆对象，必设
     * @param {String} eventName 事件名称
     * @param {Function} evtLister 事件响应函数
     */
    removeListener: function(instance, eventName, evtLister) {

    }
}
/**
 *
 * # 描述
 * CMMap.ContextMenu右键菜单
 *
 * **使用范例**：
 *
 *     @example
 *     contextMenu = new CMMap.ContextMenu(opt);
 * @class CMMap.ContextMenu
 */
CMMap.ContextMenu = function(opt) {
    /**
     * 右键菜单打开事件
     * @event open
     * @param {MapsEvent} e 事件参数
     * @preventable
     */
    /**
     * 右键菜单关闭事件
     * @event close
     * @param {MapsEvent} e 事件参数
     * @preventable
     */

    /**
     * @cfg {String/Object} content
     * 右键菜单内容（针对自定义菜单时，添加菜单内容及功能。可以是HTML要素字符串或者HTML DOM对象。）
     */
    this.content = null;
    //初始化方法
    this.initialize(opt);
};
CMMap.ContextMenu.prototype = {
    /**
     * @constructor
     * 构造一个右键菜单对象，通过ContextMenuOptions设置右键菜单对象的属性
     * @param {CMMap.ContextMenuOptions} [opt] .
     */
    initialize : function(opt) {

    },

    /**
     * @method
     * 右键菜单中添加菜单项
     * @param {String} text (required) 菜单显示内容，必设
     * @param {Function} fn (required) 该菜单下需进行的操作，必设
     * @param {Number} num (required) 当前菜单项在右键菜单中的排序位置，以0开始，必设
     */
    addItem : function (text, fn, num) {

    },

    /**
     * @method
     * 删除一个菜单项
     * @param {String} text (required) 菜单显示内容，必设
     * @param {Function} fn (required) 该菜单下需进行的操作，必设
     */
    removeItem : function (text, fn) {

    },

    /**
     * @method
     * 在地图的指定位置打开右键菜单
     * @param {CMMap.Map} map (required) 地图对象，必设
     * @param {CMMap.LngLat} position (required) 地图上显示的位置，必设
     * @fires open
     */
    open : function (map, position) {

    },

    /**
     * @method
     * 关闭右键菜单
     * @fires close
     */
    close : function () {

    },

    /**
     * @method
     * 为右键菜单注册事件。
     * @param {Object} instance (required) 右键菜单对象，必设
     * @param {String} eventName 事件名称
     * @param {Function} evtLister 事件响应函数
     */
    addListener : function(instance, eventName, f, flag) {

    },

    /**
     * @method
     * 为右键菜单移除事件。
     * @param {Object} instance (required) 右键菜单对象，必设
     * @param {Function} evtLister 事件响应函数
     */
    removeListener: function(instance, evtLister) {

    }
}