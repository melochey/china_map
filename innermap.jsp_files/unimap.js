/*
 * ͳһ��̬��ͼ�ӿ�JS��װ
 * �޺���
 * V1.0
 * 2009-2-25
 */
 
//��ǰ���ص����Ǹ������־��0��Ѷ�����У�1��Mapbar��2����������
if(typeof nEngineCode == "undefined" ) var nEngineCode = 1;//�ڼ������JS֮ǰ���������������Ҹ�������ֵ

//Mapbar��Ҫ������
var mw = 0;//�����֣�Mapbarͦ��֣������ȻҪ������
var oo = true;//�Ƿ���ʾӥ�ۣ�Mapbarͦ��֣������ȻҪ������
var maplet = null;//Mapbar��ĺ���֣�Ϊʲôһ��Ҫ��������������أ�̫����ˣ������Ļ�ֻ���Ƕ��¹�أ��û����������������
var MV_ALLOW=false;
//�������ص�Ҫ������
var ZDC_Tile_Server = "";  
var ZDC_MAP_SERVER = "./server";  
var ALLOW_MV = false;

//���������JS��������Ҫ�����JS������д�ģ����ݲ�ͬ������
LoadGISEngineJS();
//����ָ������JS�ĺ���
function LoadGISEngineJS()
{
	if( nEngineCode == 1 )
	{//����Mapbar������
		if(typeof strMapIP=="undefined" || strMapIP == null || strMapIP.length<=0)
			document.write("<script type=\"text/javascript\"  src=\"http://172.16.24.40/api/js/mapbar31.2.js\"></script>");
		else
			document.write("<script type=\"text/javascript\"  src=\"http://"+strMapIP+"/api/js/mapbar31.2.js\"></script>");
	}
	else if( nEngineCode == 2 )
	{//�����������ص�����
		//��������ͨ����Ϣ
		ZDC_Tile_Server = "http://221.179.205.156:7001/IM/IMServlet?id=300030&pwd=Umessage080424&serviceid=00000011&maptype=mobile_grid_cn";
		document.write("<script type=\"text/javascript\" src=\"./server/zdc/zdccommon.js\" LANGUAGE=\"JavaScript\" ></script>");
		document.write("<script type=\"text/javascript\" src=\"./server/zdc/zdcmap.js\"  LANGUAGE=\"JavaScript\" ></script>");
		document.write("<script type=\"text/javascript\" src=\"./server/zdc/zdcshape.js\"  LANGUAGE=\"JavaScript\" ></script>");
		document.write("<script type=\"text/javascript\" src=\"./server/zdc/zdczoom.js\"  LANGUAGE=\"JavaScript\" ></script>");
		document.write("<script type=\"text/javascript\" src=\"./server/zdc/zdchttp.js\"  LANGUAGE=\"JavaScript\" ></script>");
		document.write("<script type=\"text/javascript\" src=\"./server/zdc/zdcproject.js\"  LANGUAGE=\"JavaScript\" ></script>");
//		document.write("<script type=\"text/javascript\" src=\"./server/zdc/zdcmapgeometric.js\"  LANGUAGE=\"JavaScript\" ></script");>
//		alert(nEngineCode);
	}
	else if(nEngineCode == 3)	// λ�û���
	{
// ������Ǵ����л�  
		if(typeof strMapIP=="undefined" || strMapIP == null || strMapIP.length<=0)
			document.write("<script type=\"text/javascript\" src=\"http://221.180.144.57:17095/gisability?ability=apiserver&abilityuri=webapi/auth.json&t=ajaxmap&v=3.0&key=2b188a1913781c47adfcd063b40ec290a912978d8290abc6c261e044710e7d616082ab51cb377262\"></script>");
		else
			document.write("<script type=\"text/javascript\" src=\"http://"+strMapIP+"/gisability?ability=apiserver&abilityuri=webapi/auth.json&t=ajaxmap&v=3.0&key=2b188a1913781c47adfcd063b40ec290a912978d8290abc6c261e044710e7d616082ab51cb377262\"></script>");
//		    document.write("<script type=\"text/javascript\" src=\"/gisn/js/map.js\"></script>");
//			document.write("<script type=\"text/javascript\" src=\"http://183.207.110.139:7702/gis?&key=2b188a1913781c47adfcd063b40ec290a912978d8290abc6c261e044710e7d616082ab51cb377262&omp_appid=323&omp_url=http://183.207.110.139:7702/gis&omp_restype=autonavi_Gis&ability=apiserver&abilityuri=webapi/auth.json&t=ajaxmap&v=3.0\"></script>");
	}
	else
	{//����Ѷ�����е�����
		document.write("<script type=\"text/javascript\"  src=\"http://172.16.21.202:8082/api/js/mapbar31.js\"></script>");
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//�ඨ�����Σ����ö�̬ԭ�ͷ�

//////////////////////////////////////////////////////////////////////////////////////////////////////////
bubbleWidth = 210 ;
bubbleHeight = 350 ;
var openBubble = null;

function hideBubble(){
	if(openBubble != null){
		openBubble.close();
		openBubble = null;
	}
}
//��ͼ���������
//���ݲ�����
function UNI_Bubble(strTitle,strContent)
{
	//˽�б���
	this.objInner = null;
	if(nEngineCode == 1)//Mapbar
		this.objInner = new MInfoWindow(strTitle,strContent);
	else if(nEngineCode == 2)//����
	{//Ŀǰ���ز�֧��
	}
	else if(nEngineCode == 3)	// λ�û���
	{ // �����������û�б���title
		var title = "<div class=\"title\"><strong>"+strTitle+"</strong><a href=\"javascript:void(0)\"><img class=\"bubble_close\" src=\"../images/closebtn.gif\" alt=\"\" align=\"right\" onclick=\"hideBubble();\"/></a></div>";
		var content = "<div class=\"neirong\">"+strContent+"<div>";
		var all = "<div id=\"qipaopao\" class=\"qipaopao\"><em></em><span class=\"am\"></span>"+title + content +"<div>";
		var options = {
				content : all,
				isCustom : true
		};
		this.objInner = new MMap.InfoWindow(options);
	}
	
	//���з���
	//�������ݵĿ�Ⱥ͸߶�
	UNI_Bubble.prototype.setWH = function(h,w)
	{
		//Mapbar�������ǹ��еģ�ͦ��ֵģ���ʵӦ���������װ��
		//�߶���Ч��Χ����Чֵ��Χ��150-590֮��
		//�����Ч��Χ����Чֵ��Χ��250-640֮��
		if(nEngineCode == 1)
			setPopWH(h,w);
		else if(nEngineCode == 2)//����
		{//Ŀǰ���ز�֧��
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
//			var size = new MMap.Size(w,0) ;
//			this.objInner.setSize(size) ;
		}
	};
	//�������ݵ�����
	UNI_Bubble.prototype.setContent = function(strInfo)
	{
		if(strInfo == null || this.objInner == null) return;
		if(typeof this.objInner == "undefined" || typeof strInfo == "undefined") return;
		if(nEngineCode == 1)//Mapbar
			this.objInner.setContent(strInfo);
		else if(nEngineCode == 2)//����
		{//Ŀǰ���ز�֧��
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
//			this.objInner.setContent(strInfo);
		}
	};
	//�������ݵı���
	UNI_Bubble.prototype.setTitle = function(strInfo)
	{
		if(strInfo == null || this.objInner == null) return;
		if(typeof this.objInner == "undefined" || typeof strInfo == "undefined") return;
		if(nEngineCode == 1)//Mapbar
			this.objInner.setTitle(strInfo);
		else if(nEngineCode == 2)//����
		{//Ŀǰ���ز�֧��
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			// λ�û����У���Ϣ���ڿؼ� û��title
		}
	};
}
//������Ĳ��������

//Point��
function UNI_Point(strLatLon)
{//alert(strLatLon);
	this.objInner = null;
	this.objLatLon = null;//�������е�����
	if(nEngineCode == 1)//Mapbar
	{
		this.objInner = new MPoint(strLatLon);
	}
	else if(nEngineCode == 2)//����
	{//alert(strLatLon);
	    var pArray = strLatLon.split(",");
		this.objInner = new ZdcPoint(pArray[0],pArray[1]);
		this.objLatLon = new MLatLng(pArray[1],pArray[0]);
	}
	else if(nEngineCode == 3)	// λ�û���
	{ 
		//alert(strLatLon);
		if(strLatLon != null && typeof strLatLon != "undefined"){
			var latlon = strLatLon ; 
			if(strLatLon.indexOf(",") == -1){
				latlon = decode(strLatLon);
			}
			if(latlon != null && typeof latlon != "undefined"){
				var pArray = latlon.split(",") ;
				if(pArray != null && typeof pArray != "undefined" && pArray.length > 1){
					var lat = pArray[0] ;
					var lng = pArray[1] ;
					this.objInner = new MMap.LngLat(lng,lat) ;
				}
			}
		}
	}
}
//Point�����

//��ǩ��
function UNI_Label(strName,ox,oy,nTrans)
{
	this.objInner = null;
	this.m_objTxt = null;//�������еģ��ڻ��Ƶ�ʱ����Ҫ���п��Ƶ�
	if(nEngineCode == 1)//Mapbar
	{
        var options = {
            xoffset:null,
            yoffset:-oy*3.5,
            enableStyle:false,
            visible:false
        };
		this.objInner = new MLabel(strName,options);
//		this.objInner = new MLabel(strName,ox,oy,nTrans);
	}
	else if(nEngineCode == 2)//����
	{//
		//����ʾװ�ر�ǩ�Ĳ�
		this.objInner = new ZdcShape.Layer();
		
		this.m_objTxt = new ZdcShape.Text(strName);
		//this.m_objTxt.setPoint(point.objInner);
		this.m_objTxt.borderWidth = "1px";
		this.m_objTxt.anchor = "left-top";
		this.m_objTxt.textColor = "red";
		this.m_objTxt.borderColor = "red";
		this.m_objTxt.bgColor = "white";
		this.m_objTxt.opacity = nTrans;
		this.m_objTxt.offsetx = ox;
		this.m_objTxt.font = "bold 9pt ����";
		
		this.objInner.addShape(this.m_objTxt);
	}
	else if(nEngineCode == 3)	// λ�û���
	{ 
		// û��label
		//var content = "<div class='stationBox' lbltext='"+strName+"'><div class='stationBox_left'></div><div class='stationBox_right'><span class='transIcon'></span>"+strName+"</div></div>";
		//this.objInner = new MMap.InfoWindow({content : content , isCustom : true});
	}
}
//��ǩ�����

//��ǩ��
function UNI_Icon(strURL,w,h)
{
	this.objInner = null;
	if(nEngineCode == 1)//Mapbar
	{
		this.objInner = new MIcon(strURL,w,h);
	}
	else if(nEngineCode == 2)//����
	{//Ŀǰ���ز�֧��
		this.objInner = new ZdcIcon(null,strURL,w,h);
		this.objInner.size.width = w;
		this.objInner.size.height = h;
	}
	else if(nEngineCode == 3)	// λ�û���
	{ 
		var options = {
				size : new MMap.Size(w,h),
				image : strURL
		};
		this.objInner = new MMap.Icon(options) ;
	}
}
//��ǩ�����

//��ͼ�ؼ��࣬������nType��0������ʾ�Ŀؼ�����0����׼�Ŀؼ�
function UNI_MapControl(nType)
{
	this.objInner = null;
	if(nEngineCode == 1)//Mapbar
	{
		if( nType == 0 )
			this.objInner = new MStandardControl(undefined,undefined,undefined,1);
		else
			this.objInner = new MStandardControl();
	}
	else if(nEngineCode == 2)//����
	{
		this.objInner = new ZdcControl();
	}
	else if(nEngineCode == 3)	// λ�û���
	{ 
	}
}
//��ͼ�ؼ������

//��ͼ��ע��
function UNI_MapMarker(objPoint,objIcon,objBubble,objLabel)
{
	this.objInner = null;
	this.objUserlayer = null;//�������еģ����Mark֮ǰҪ����Ӳ�
	this.m_objLabel = null; //�������еģ�Ҫ�ж����Label�Ƿ���ʾ

	var objBubbleInner = null;
	var objIconInner = null;
	var objLabelInner = null; 
	if(objIcon != null && typeof objIcon != "undefined" )objIconInner = objIcon.objInner;
	if(objLabel != null && typeof objLabel != "undefined" )
	{
		objLabelInner = objLabel.objInner;
		this.m_objLabel = objLabel;
	}
	if(objBubble != null && typeof objBubble != "undefined" )objBubbleInner = objBubble.objInner;
	
	if(nEngineCode == 1)//Mapbar
	{
		this.objInner = new MMarker(objPoint.objInner,objIconInner,objBubbleInner,objLabelInner);
	}
	else if(nEngineCode == 2)//����
	{//���ص�Mark���üӵ�overLay��
		this.objInner = new ZdcMarker(objPoint.objInner,objIconInner);
	
		this.objUserlayer = new ZdcUserLayer();
		this.objUserlayer.setLayerScale(2,18); 
		this.objUserlayer.setLayerType('manual');
		//�����������Mark
		this.objInner = new ZdcMarker(objPoint.objInner, objIconInner);
		this.objUserlayer.addMarker(this.objInner);//��Mark�ӵ�UserLayer��
		
		if( null != this.m_objLabel )
		{
			this.m_objLabel.m_objTxt.setPoint(objPoint.objInner);
		}
	}
	else if(nEngineCode == 3)	// λ�û���
	{ 
		var x = objIconInner.size.width;
		var y = objIconInner.size.height;
		if (objIconInner.size.width == 7 ) {
			x = (-x)/2 ; y = (-y)/2 ;
			if (objBubbleInner != null) objBubbleInner.setOffset(new MMap.Pixel(-180,-205));
		}else if(objIconInner.size.width == 18){
			x = (-x)/2 ; y = (-y)/2 ;
			if (objBubbleInner != null) {
				if(objBubbleInner.content.indexOf('<div class="title"><strong></strong>') > 0){
					objBubbleInner.setOffset(new MMap.Pixel(-180,-190));
				}else{
					objBubbleInner.setOffset(new MMap.Pixel(-180,-213));
				}
			}
		}else if(objIconInner.size.width == 19){
			x = (-x)/2 ; y = (-y)/2 ;
			if (objBubbleInner != null) objBubbleInner.setOffset(new MMap.Pixel(-180,-213));
		}else{
			x = (-x)/2 ; y = -y ;
			if (objBubbleInner != null) objBubbleInner.setOffset(new MMap.Pixel(-180,-236));
		}
		var options = {
				id:objIconInner.size.image,
				position : objPoint.objInner,
				icon : objIconInner,
				offset : new MMap.Pixel(x,y)
		};
		this.objInner = new MMap.Marker(options);
		maplet.bind(this.objInner, "click", function(e){
			if (objBubbleInner != null) {
				objBubbleInner.open(maplet, objPoint.objInner);
				openBubble = objBubbleInner;
			}
		});
	}
	
	//������
	UNI_MapMarker.prototype.showBubble = function(e)
	{
		if(nEngineCode == 1)
			this.objInner.openInfoWindow();
		//Ŀǰ���ز�֧��
		else if(nEngineCode == 3)	// λ�û���
		{ 
			if (objBubbleInner != null) {
				objBubbleInner.open(maplet, objPoint.objInner);
			}
		}
	};

	//��ע�ö�
	UNI_MapMarker.prototype.toTop = function()
	{
		if(nEngineCode == 1)
			this.objInner.icon.hilite();
		//Ŀǰ���ز�֧��
		else if(nEngineCode == 3)	// λ�û���
		{ 
			// ��֧��
		}
	};
	//���ñ�ǩ�Ƿ���ʾ
	UNI_MapMarker.prototype.setLabelShow = function(isShow)
	{
		if(nEngineCode == 1)
		{
			if(this.objInner.label) 
			{
				this.objInner.label.setVisible(isShow);
			}
			//if(mk.label) mk.label.setVisible(true);
		}
		//Ŀǰ���ز�֧��
		else if(nEngineCode == 3)	// λ�û���
		{ 
			// û��Label����֧��
		}
	};
	//���ñ�ǩ�Ƿ���ʾ
	UNI_MapMarker.prototype.resetLabelShow = function(strName)
	{
		if(nEngineCode == 1)
		{
			if(this.objInner.label) 
			{
		        var options = {
                    content:"<div class='stationBox' lbltext='"+strName+"'><div class='stationBox_left'></div><div class='stationBox_right'><span class='transIcon'></span>"+strName+"</div></div>",

		            enableStyle:false
		        };
		        this.objInner.label.resetLabel(options);
			}
		}
		//Ŀǰ���ز�֧��
		else if(nEngineCode == 3)	// λ�û���
		{ 
			// û��Label����֧��
		}
	};
	UNI_MapMarker.prototype.resetLabelcontent = function(strName)
	{
		if(nEngineCode == 1)
		{
			if(this.objInner.label) 
			{
		        var options = {
                    content:"<div style='border:1px solid #3e3e3e;background:#FFF; font-size: 12px;'>"+strName+"</div>",

		            enableStyle:false
		        };
		        this.objInner.label.resetLabel(options);
			}
		}
		//Ŀǰ���ز�֧��
		else if(nEngineCode == 3)	// λ�û���
		{ 
			// û��Label����֧��
		}
	};
}
//��ͼ��ע�����

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//����������
//��ͼ�Ի滭ˢ��
function UNI_Brush(nColor,nWeight)
{
	this.objInner = null;
	this.m_isFill = false;
	// λ�û���
	this.w_color = null;
	this.w_weight = null;
	this.w_opacity = null;
	this.w_bgcolor = null;
	this.w_bgopacity = null;
	this.w_style = null;
	this.w_withArrow = false; // �Ƿ���м�ͷ��Ĭ��û��
	if(nEngineCode == 1)//Mapbar
	{
		this.objInner = new MBrush(nColor,nWeight);
	}
	else if(nEngineCode == 2)//����
	{//���ص����ڲ�֧��������ɫ����ϸ��͸���ȣ���ʵ���Ըģ�������Ҫ��ʱ����˵����Ҫ�Ļ����ṩ��JS
		this.objInner = new MStyle();
		this.objInner.lineColor = nColor;
		this.objInner.lineSize = nWeight;
		this.objInner.showTip = false;//Ĭ�ϲ���ʾTips����ʵ���ڲ�֧��
	}
	else if(nEngineCode == 3)	// λ�û���
	{ 
		// ��֧��
		this.w_color = nColor;
		this.w_weight = nWeight;
	}
	
	//����Style
	UNI_Brush.prototype.setStyle = function(objStyle)
	{
		if(nEngineCode == 1)//Mapbar
			this.objInner.style = objStyle;
		else if(nEngineCode == 3)	// λ�û���
		{ 
			// ��֧��
			// TODO Ӧ���д���
			this.w_style = objStyle ;
		}
	};
	//������ɫ
	UNI_Brush.prototype.setColor = function(nColor)
	{
		if(nEngineCode == 1)//Mapbar
			this.objInner.color = nColor;
		else if(nEngineCode == 2)//����
			this.objInner.lineColor = nColor;
		else if(nEngineCode == 3)	// λ�û���
		{ 
			// ��֧��
			this.w_color = nColor;
		}
	};

	//���ô�ϸ
	UNI_Brush.prototype.setWeight = function(nWeight)
	{
		if(nEngineCode == 1)//Mapbar
			this.objInner.stroke = nWeight;
		else if(nEngineCode == 2)//����
			this.objInner.lineSize = nWeight;
		else if(nEngineCode == 3)	// λ�û���
		{ 
			// ��֧��
			this.w_weight = nWeight;
		}
	};
	//���û�������͸����0-100��ֵ��0Ϊ��ȫ͸��,100Ϊ��ȫ��͸����
	UNI_Brush.prototype.setTransparncy = function(nTransp)
	{
		if(nEngineCode == 1)//Mapbar
			this.objInner.transparency = nTransp;
		else if(nEngineCode == 2)//����
			this.objInner.lineOpacity = nTransp;
		else if(nEngineCode == 3)	// λ�û���
		{ 
			// ��֧��
			this.w_opacity = nTransp/100.0 ;
		}
	};
	//���û��ʱ���͸����0-100��ֵ��0Ϊ��ȫ͸��,100Ϊ��ȫ��͸����
	UNI_Brush.prototype.setBGTransparncy = function(nTransp)
	{
		if(nEngineCode == 1)//Mapbar
			this.objInner.bgtransparency = nTransp;
		else if(nEngineCode == 2)//����
			this.objInner.fillOpacity = nTransp;
		else if(nEngineCode == 3)	// λ�û���
		{ 
			// ��֧��
			this.w_bgopacity = nTransp/100.0 ;
		}
	};
	//����������α���ɫ
	UNI_Brush.prototype.setBGColor = function(nColor)
	{
		if(nEngineCode == 1)//Mapbar
			this.objInner.bgcolor = nColor;
		else if(nEngineCode == 2)//����
			this.objInner.fillColor = nColor;
		else if(nEngineCode == 3)	// λ�û���
		{ 
			// ��֧��
			this.w_bgcolor = nColor;
		}
	};
	//�����Ƿ��������
	UNI_Brush.prototype.setFill = function(isFill)
	{
		if(nEngineCode == 1)//Mapbar
			this.objInner.fill = isFill;
		else if(nEngineCode == 2)//����
			this.m_isFill = isFill;
		//���ز�֧�ֻ���
		else if(nEngineCode == 3)	// λ�û���
		{ 
			this.m_isFill = isFill;
		}
	};
	//���������Ƿ���ʾ��ͷ
	UNI_Brush.prototype.setArrow = function(isShow)
	{
		if(nEngineCode == 1)//Mapbar
			this.objInner.arrow = isShow;
		//���ز�֧��
		else if(nEngineCode == 3)	// λ�û���
		{ 
			// ��֧��
			this.w_withArrow = isShow ;
		}
	};

}
//��ͼ��ˢ�����

//��ͼ������
//���������������飬���ʶ������ݶ��󣨿�����NULL��
function UNI_PolyLine(arPoint,objBrush,objBubble)
{
	this.objInner = null;
	this.m_arPoint = null; 
	if(nEngineCode == 1)//Mapbar
	{
	    this.m_arPoint = new Array();
	    for (var i = 0; i < arPoint.length; i++) {
            this.m_arPoint.push(arPoint[i].objInner);
	    }
	    if( objBubble == null )
			this.objInner = new MPolyline(this.m_arPoint,objBrush.objInner,null);
		else
			this.objInner = new MPolyline(this.m_arPoint,objBrush.objInner,objBubble.objInner);
	}
	else if(nEngineCode == 2)//����
	{//���صĲ��ô�������
	    this.m_arPoint = new Array();
		var polyline = null;
		if(objBrush != null && typeof objBrush != "undefined" )
		{
			if( objBrush.m_isFill ) polyline = new ZdcShape.Polygon();
			else polyline = new ZdcShape.Polyline();
		}
		else
			polyline = new ZdcShape.Polyline();
		polyline.strokeColor = '#FF0000';
		polyline.strokeWeight = '1px';
		if(objBrush != null && typeof objBrush != "undefined" )
		{
			polyline.strokeColor = objBrush.objInner.lineColor;
			polyline.strokeWeight = objBrush.objInner.lineSize;
			polyline.opacity = objBrush.objInner.lineOpacity;
			if( objBrush.m_isFill )
			{
				polyline.opacity = objBrush.objInner.fillOpacity;
				polyline.fillType = objBrush.objInner.fillColor;
			}
		}
		this.objInner = new ZdcShape.Layer();

	    for (var i = 0; i < arPoint.length; i++) {
            this.m_arPoint.push(arPoint[i].objLatLon);
            polyline.addPoint(arPoint[i].objInner);
	    }
		//this.objInner = new MPolylineOverlay(this.m_arPoint,objBrush.objInner,null);
		this.objInner.addShape(polyline);
	}
	else if(nEngineCode == 3)	// λ�û���
	{ 
		this.m_arPoint = new Array();
	    for (var i = 0; i < arPoint.length; i++) {
            this.m_arPoint.push(arPoint[i].objInner);
	    }
	    var options = {
	    		id : 'polyline01',
	    		path : this.m_arPoint
	    };
	    if(objBrush != null && typeof objBrush != "undefined" )
		{
	    	options.strokeColor = objBrush.w_color;
	    	options.strokeWeight = objBrush.w_weight;
	    	options.strokeOpacity = objBrush.w_opacity;
			if( objBrush.m_isFill )
			{
				options.fillColor = objBrush.w_bgcolor;
				options.fillOpacity = objBrush.w_bgopacity;
			}else{
				options.withArrow = objBrush.w_withArrow ;
			}
		}
		this.objInner = new MMap.Polyline(options);
	}
}
//��ͼ���������

//Բ����Բ��
function UNI_Ellipse(nLC,nBC,strLatLon,nR,isFill)
{
	this.objInner = null;
	if(nEngineCode == 1)//Mapbar
	{
		var objPt = new MPoint(strLatLon);//���ĵ�
	    var brush = new MBrush();
	    brush.color = nLC;
	    brush.bgcolor = nBC;
	    brush.fill = false;
	    if(isFill==true)brush.fill = true;
	    brush.transparency = 20;
	    brush.bgtransparency = 20;
	    brush.stroke = 1;
		
		this.objInner = new MEllipse(objPt, nR, null, brush, null);
	}
	else if(nEngineCode == 3)	// λ�û���
	{ 
		if(strLatLon != null && typeof strLatLon != "undefined"){
			var pArray = strLatLon.split(",") ;
			if(pArray != null && typeof pArray != "undefined" && pArray.length > 1){
				var lat = pArray[0] ;
				var lng = pArray[1] ;
				var point = new MMap.LngLat(lng,lat) ;
				var options = {
						center : point,
						radius : nR,
						strokeColor : nLC,
						strokeOpacity : 0.2
				};
				if(isFill){
					options.fillColor = nBC;
					options.fillOpacity = 0.2;
				}
				this.objInner = new MMap.Circle(options);
			}
		}
	}
}
//Բ����Բ�������

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//��ͼ����������
//��ͼ�࣬������div���󣬻���div�����ID������
function UNI_Map(objDiv)
{
	this.objInner = null;
	//�������������ǻ�������Ҫ������ʵ����Ϊ�˱��ֽӿڵ�һ��������Ĭ�ϴ���
	this.objScaleBar = null;
	this.objMapCenter = null;
	this.objMapControl = null;
	
	if(nEngineCode == 1)//Mapbar
	{
		this.objInner = new Maplet(objDiv);
		if(maplet==null)maplet = this.objInner;//��Ҫ������ֵ�ſ���
		this.objInner.showLogo(false);//Ĭ�ϲ���ʾLOGO
		this.objInner.showNavLogo(false);//Ĭ�ϲ���ʾLOGO
		
		//this.showBirdEyeShow(true);//Ĭ����ʾӥ��
		//this.setMouseWheel(0);//Ĭ��֧��������
	}
	else if(nEngineCode == 2)//����
	{
		this.objInner = new MMap(document.getElementById(objDiv));
	}
	else if(nEngineCode == 3)	// λ�û���
	{ 
		// ��ͼ��ʼ������Ҫ���ò���
		var options = {
				center : new MMap.LngLat(116.40632629394531,39.90394233735701),
				level : 15,
				dragEnable : true
		};
		if (maplet == null) {
			this.objInner = new MMap.Map(objDiv, options) ;
			maplet = this.objInner;
			maplet.bind(maplet,"click",function(e){
				maplet.panTo(e.lnglat);
			});
		}
	}
	
	/*����ģʽ�������Ѿ�֪������
	 *Mapbar ״̬
	1��bookmark����㵽��ͼ�ϣ����һ�ȡ������ط��ľ�γ��
	2��pan�����õ��ƶ���ͼ״̬
	3��lookup���ڵ�ͼ�������״̬
	4��drawline������״̬
	5��drawarea������״̬
	6��measure�����״̬����λ����
	7��measarea�������״̬����λƽ������
	
	# λ�û��� ��깤��
	mapObj.setMouseTool('marker');// ��껭��
	mapObj.setMouseTool('polyline'); //��껭��
	mapObj.setMouseTool('circle'); //��껭Բ
	mapObj.setMouseTool('rule'); //�����
	mapObj.setMouseTool('rectZoomIn'); // ���Ŵ�
	mapObj.setMouseTool('rectZoomOut'); // �����С
	mapObj.setMouseTool('polygon'); // ��껭�����
	mapObj.setMouseTool('rectangle'); // ��껭����
	mapObj.setMouseTool('measureArea'); // ������
	mapObj.setMouseTool('panWheelZoom'); // �����ͼ

	*/
	UNI_Map.prototype.setMode = function(mode,funCallback)
	{
		if(nEngineCode == 1)//Mapbar
			this.objInner.setMode(mode,funCallback);
		else if(nEngineCode == 2)//����
		{//���صĲ�֧��ӥ���Ƿ���ʾ������
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			if(mode == 'bookmark') maplet.setMouseTool('marker');
			if(mode == 'pan') maplet.setMouseTool('panWheelZoom');
			if(mode == 'lookup') maplet.setMouseTool('rectangle');
			if(mode == 'drawline') maplet.setMouseTool('polyline');
			if(mode == 'drawarea') maplet.setMouseTool('polygon');
			if(mode == 'measure') maplet.setMouseTool('rule');
			if(mode == 'measarea') maplet.setMouseTool('measureArea');
		}
	};
	//��ʾ������ӥ��ӥ��
	UNI_Map.prototype.showBirdEyeShow = function(isShow)
	{
		if(nEngineCode == 1)//Mapbar
			this.objInner.showOverview(isShow,true);
		else if(nEngineCode == 2)//����
		{//���صĲ�֧��ӥ���Ƿ���ʾ������
			if( isShow )
			{
				if( null == this.objScaleBar ) 
				{
					this.objScaleBar = new ZdcScaleBar();
					this.objInner.addMapScaleBar(this.objScaleBar);
				}
			}
			else
			{
				if( null != this.objScaleBar )
				{
					this.objInner.removeMapScaleBar();
					this.objScaleBar = null;
				}
			}
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			if( isShow )
			{
				if( null == this.objOverView ) 
				{
					var options = {
							//tileLayer : new MMap.TileLayer(),
							isOpen : true ,  // Ĭ�ϴ�
							visible : true  //Ĭ����ʾ
					};
					this.objOverView = new MMap.OverView(options);
					this.objInner.addControl(this.objOverView);
				}
			}
			else
			{
				if( null != this.objOverView )
				{
					this.objInner.removeControl(this.objOverView);
					this.objOverView = null;
				}
			}
		}
	};
	//��ʾ�����ص�ͼ��ǰ������
	UNI_Map.prototype.showScale = function(isShow)
	{
		if(nEngineCode == 1)//Mapbar
			this.objInner.showScale(isShow);
		else if(nEngineCode == 2)//����
		{//���صĲ�֧�ֱ������Ƿ���ʾ������
			if( isShow )
			{
				if( null == this.objScaleBar ) 
				{
					this.objScaleBar = new ZdcScaleBar();
					this.objInner.addMapScaleBar(this.objScaleBar);
				}
			}
			else
			{
				if( null != this.objScaleBar )
				{
					this.objInner.removeMapScaleBar();
					this.objScaleBar = null;
				}
			}
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			if( isShow )
			{
				if( null == this.objScale ) 
				{
					this.objScale = new MMap.Scale();
					this.objInner.addControl(this.objScale);
				}
			}
			else
			{
				if( null != this.objScale )
				{
					this.objInner.removeControl(this.objScale);
					this.objOverView = null;
				}
			}
		}
	};

	//�����Ƿ�֧�������ֵ�����ͼ��ʾ������
	UNI_Map.prototype.setMouseWheel = function(isSet)
	{
		if(nEngineCode == 1)//Mapbar
			mw = isSet;
		else if(nEngineCode == 2)//����
		{//���صľ��ǰ��ն������õģ�����Ǻ����Ƶ�
			if( isSet == 0 )
				this.objInner.setWheelOn = false;
			else
				this.objInner.setWheelOn = true;
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			this.objInner.setStatus({scrollWheel : isSet});
		}
	};
	//���õ�ͼ��ʾ�����ĵ�
	UNI_Map.prototype.setCenter = function(objPoint)
	{
		if(nEngineCode == 1)//Mapbar
		{
			this.objInner.setCenter(objPoint.objInner);
		}
		else if(nEngineCode == 2)//����
		{
			this.objInner.scrollToCenter(objPoint.objInner);
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			this.objInner.setCenter(objPoint.objInner);
		}
	};
	//��ȡ��ǰ��ͼ��ʾ�����ĵ�ľ�γ��
	UNI_Map.prototype.getCenterLatLon = function()
	{
		if(nEngineCode == 1)//Mapbar
		{//&map=9,HESATDZVVDCSE,640,480&zm=21.3&width=640&height=480&ctr=HESATDZVVDCSE&client=3409
			var c = this.objInner.getCurrentMap();
			var a = c.split(",");
			if( a.length > 1 )
				return a[1];
			else
				return "";
		}
		else if(nEngineCode == 2)//����
		{
			var c = this.objInner.getCenterByLatLng();
			if( c != null )
				return (c.lat + "," + c.lon);
			else
				return "";
				
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			var c = this.objInner.getCenter();
			if( c != null )
				return (c.lat + "," + c.lng);
			else
				return "";
		}
	};
	//���õ�ͼ��ʾ������
	UNI_Map.prototype.setZoom = function(nZoom)
	{
		if(nEngineCode == 1)//Mapbar
		{
			this.objInner.setZoomLevel(nZoom);
		}
		else if(nEngineCode == 2)//����
		{
			this.objInner.setZoomLevel(nZoom);
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			this.objInner.setZoom(nZoom);
		}
	};
	//��ȡ��ǰ��ͼ��ʾ������
	UNI_Map.prototype.getZoom = function()
	{
		if(nEngineCode == 1)//Mapbar
		{
			return this.objInner.getZoomLevel();
		}
		else if(nEngineCode == 2)//����
		{
			return this.objInner.getZoomLevel();
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			return this.objInner.getZoom();
		}
	};
	//���õ�ͼ��ʾ�������Լ���ʾ�����ĵ�
	UNI_Map.prototype.setCenterAndZoom = function(objPoint,nZoom)
	{
		if(nEngineCode == 1)//Mapbar
		{
			this.objInner.centerAndZoom(objPoint.objInner,nZoom);
		}
		else if(nEngineCode == 2)//Mapbar
		{
			this.objInner.setZoomAndCenter(objPoint.objInner,nZoom);
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			this.objInner.setZoomAndCenter(nZoom,objPoint.objInner);
		}
	};
	//��ӵ�ͼ�ؼ�
	UNI_Map.prototype.addMapControl = function(objCtl)
	{
		if(nEngineCode == 1)//Mapbar
		{
			this.objInner.addControl(objCtl.objInner);
		}
		else if(nEngineCode == 2)//����
		{
			this.objMapControl = objCtl.objInner;
			//Ĭ�ϴ����������󣬻��صĺ��鷳
			this.objScaleBar = new ZdcScaleBar();
			this.objMapCenter = new ZdcMapCenter();
			this.objInner.addMapScaleBar(this.objScaleBar);
			this.objInner.addMapCenter(this.objMapCenter);
			this.objInner.addMapControl(this.objMapControl);
			//this.objInner.addMapCenterInfoBox(new ZdcMapCenterInfoBox());
		}
		else if(nEngineCode == 3)	// λ�û���
		{
			//TODO
			maplet.plugin(["MMap.ToolBar","MMap.OverView","MMap.Scale"],function() 
				{ 
				toolbar = new MMap.ToolBar({size:20,ruler:true,direction:true}); 
				toolbar.autoPosition=false; //���ع����� 
				maplet.addControl(toolbar); 
				overview = new MMap.OverView({isOpen:false,visible:true}); //����ӥ�� 
				maplet.addControl(overview); 
				scale = new MMap.Scale(); //���ر����� 
				maplet.addControl(scale); 
				}); 
		}
	};
	//�Ƴ���ͼ�ؼ�
	UNI_Map.prototype.removeMapControl = function(objCtl)
	{
		if(nEngineCode == 1)//Mapbar
		{
			this.objInner.removeControl(objCtl.objInner);
		}
		else if(nEngineCode == 2)//����
		{//��ʵ���ص��Ƴ����Ƴ���һ����Ч������ʹ������Щ�ؼ�Ҳ������ʾ
			this.objInner.removeMapControl();
			this.objInner.removeMapScaleBar();//Ĭ��������Ҳ�Ƴ�
			this.objInner.removeMapCenter();//Ĭ��������Ҳ�Ƴ�
			
			this.objMapControl = null;
			this.objScaleBar = null;
			this.objMapCenter = null;
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			//TODO
		}
	};
	//�Ŵ��ͼ��nStep�Ǳ��ηŴ�ļ���
	UNI_Map.prototype.zoomIn = function(nStep)
	{
		if(nEngineCode == 1)//Mapbar
		{
			if( nStep < 1 ) return;
			else if( nStep > 1 ) 
			{
				this.setZoom(this.getZoom() + nStep);
			}
			else this.objInner.zoomIn();
		}
		else if(nEngineCode == 2)//����
		{
			if( nStep < 1 ) return;
			this.setZoom(this.getZoom() + nStep);
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			if( nStep < 1 ) return;
			else if( nStep > 1 ) 
			{
				this.setZoom(this.getZoom() + nStep);
			}
			else this.objInner.zoomIn();
		}
	};
	//�Ŵ��ͼ��nStep�Ǳ��ηŴ�ļ���
	UNI_Map.prototype.zoomOut = function(nStep)
	{
		if(nEngineCode == 1)//Mapbar
		{
			if( nStep < 1 ) return;
			else if( nStep > 1 ) 
			{
				this.setZoom(this.getZoom() - nStep);
			}
			else this.objInner.zoomOut();
		}
		else if(nEngineCode == 2)//����
		{
			if( nStep < 1 ) return;
			this.setZoom(this.getZoom() - nStep);
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			if( nStep < 1 ) return;
			else if( nStep > 1 ) 
			{
				this.setZoom(this.getZoom() - nStep);
			}
			else this.objInner.zoomOut();
		}
	};
	//�ƶ���ͼ�����ص�
	UNI_Map.prototype.panTo = function(x,y)
	{
		if(nEngineCode == 1)//Mapbar
		{
			this.objInner.panTo(x,y);
		}
		else if(nEngineCode == 2)//����
		{
			this.objInner.PanTo(x,y);
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			var pixel = new MMap.Pixel(x,y);
			var lngLat = this.objInner.pixelToLngLat(pixel, this.objInner.getZoom()) ;
			this.objInner.panTo(lngLat);
		}
	};
	//�����ͼ���Ի�ĵ㡢�ߵ�����
	UNI_Map.prototype.clean = function()
	{
		if(nEngineCode == 1)//Mapbar
		{
			this.objInner.clearOverlays();
			this.objInner.clean();
		}
		else if(nEngineCode == 2)//����
		{
			this.objInner.removeAllOverlays();
			this.objInner.clearUserLayer();
			this.objInner.clearShapeLayer();
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			this.objInner.clearOverlays();
		}
	};
	//���ͼ�����
	UNI_Map.prototype.addOverlay = function(objLay)
	{
		if(nEngineCode == 1)//Mapbar
		{
			this.objInner.addOverlay(objLay.objInner);
		}
		else if(nEngineCode == 2)//����
		{
			if(objLay instanceof UNI_MapMarker)
			{//�����Mark�Ļ�����ôҪ�ӵĲ���Mark������UserLayer
				this.objInner.addUserLayer(objLay.objUserlayer);
				if(objLay.m_objLabel != null )//����б�ǩ��Ҫ��ʾ��ǩ
					this.objInner.addShapeLayer(objLay.m_objLabel.objInner);
			}
			else if(objLay instanceof UNI_PolyLine)
			{//����ǻ��ߵĻ���Ҫ������������ɫ�Լ���ϸ
				this.objInner.addShapeLayer(objLay.objInner);
			}
			else
			{
				this.objInner.addOverlay(objLay.objInner,true);
			}

			
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			this.objInner.addOverlays(objLay.objInner);
		}
	};
	//�Ƴ�ͼ�����
	UNI_Map.prototype.removeOverlay = function(objLay)
	{
		if(nEngineCode == 1)//Mapbar
		{
			this.objInner.removeOverlay(objLay.objInner);
		}
		else if(nEngineCode == 2)//����
		{//���ص���������
			this.objInner.removeAllOverlays();
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			this.objInner.clearOverlays();
		}
	};
	//�������ݣ���֣����������������ݵ�λ�ö������
	UNI_Map.prototype.hideBubble = function()
	{
		if(nEngineCode == 1)//Mapbar
		{
			this.objInner.hideBubble();
		}
		else if(nEngineCode == 2)//����
		{//Ŀǰ���صĲ�֧��
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			this.objInner.clearMap();
		}
	};
	//ˢ����ʾ
	UNI_Map.prototype.refresh = function()
	{
		if(nEngineCode == 1)//Mapbar
		{
			this.objInner.refresh();
		}
		else if(nEngineCode == 2)//����
		{
			this.objInner.reflashMap();
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			//TODO ò��û�У�
			this.objInner.clearMap();
		}
	};
	//�������õ�ͼ��С
	UNI_Map.prototype.resizemap = function(w,h)
	{
		if(nEngineCode == 1)//Mapbar
		{
			this.objInner.resize(w,h);
		}
		else if(nEngineCode == 2)//����
		{
			var s = this.objInner.getMapWindowSize();
			this.objInner.resizeMapWindow(s.top,s.left,w,h);
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			// TODO ò��û��
		}
	};
	//�����Ƿ���ʾ���
	UNI_Map.prototype.showControl = function(isShow)
	{
		if(nEngineCode == 1)//Mapbar
		{
			this.objInner.showControl(isShow);
		}
		else if(nEngineCode == 2)//����
		{//Ŀǰ���صĲ�֧��
			if( isShow )
			{
				if( null == this.objMapControl ) 
				{
					this.objMapControl = new ZdcControl();
					this.objInner.addMapControl(this.objMapControl);
				}
			}
			else
			{
				if( null != this.objMapControl )
				{
					this.objInner.removeMapControl();
					this.objMapControl = null;
				}
			}
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			if( isShow )
			{
				if( null == this.objToolBar ) 
				{
					this.objToolBar = MMap.ToolBar();
					this.objInner.addControl(this.objToolBar);
				}
			}
			else
			{
				if( null != this.objToolBar )
				{
					this.objInner.removeControl(this.objToolBar);
					this.objToolBar = null;
				}
			}
		}
	};
/*	*/
	//�õ�ָ����Ļ���εļ��ܾ�γ��
	UNI_Map.prototype.getScreenRectLatLon = function(nX,nY,nWidth,nHeight)
	{
		var ptX = nX , ptY = nY;
//		var tmpLat = this.objInner.zp(ptX,ptY);
//		var tmpLon = this.objInner.zo(ptX,ptY);
//		
//		var lt = transXY2Str(tmpLat,tmpLon)
//		
//		ptX = nX + nWidth;		ptY = nY + nHeight;
//		tmpLat = this.objInner.zp(ptX,ptY);
//		tmpLon = this.objInner.zo(ptX,ptY);
//		var rb = transXY2Str(tmpLat,tmpLon)
		//alert(lt);
		//alert(rb);
		
		var pixel = new MMap.Pixel(ptX, ptY) ;
		var lnglat = this.objInner.pixelToLngLat(pixel, this.objInner.getZoom()) ;
		
		var lt = encode(lnglat.lat, lnglat.lng) ;
		
		ptX = nX + nWidth;		ptY = nY + nHeight;
		
		pixel = new MMap.Pixel(ptX, ptY) ;
		lnglat = this.objInner.pixelToLngLat(pixel, this.objInner.getZoom()) ;
		var rb = encode(lnglat.lat, lnglat.lng) ;
		
		return (lt + "," +rb);
	};
	//��Բ����������Ե��ɫ�������ɫ�����ĵ㣬�뾶���Ƿ����
	UNI_Map.prototype.drawCircle = function(nLC,nBC,strLatLon,nR,isFill)
	{
		if(nEngineCode == 1)//Mapbar
		{
			var objCircle = new UNI_Ellipse(nLC,nBC,strLatLon,nR,isFill);
			this.objInner.addOverlay(objCircle.objInner);
			return objCircle;
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 

		}
	};
		 
}

//��ͼ�����

//�¼���
function UNI_Event()
{
	this.objInner = null;
	if(nEngineCode == 1)//Mapbar
	{//Mapbar��MEvent����һ��ȫ�ֵģ���̫�����ˣ�һ����Ƕ���Χ��һ����ֲ��Ƕ���Χ
//		this.objInner = new MEvent();
	}
	else if(nEngineCode == 2)//����
	{
		this.objInner = new MEventControl();
	}
	else if(nEngineCode == 3)	// λ�û���
	{ 
		// ȫ��maplet
	}
	
	
	//���Ӽ����¼������ؼ����¼��ľ��������ͨ�����������ͷŶ�Ӧ�ļ����¼�
	UNI_Event.prototype.addListener = function(obj,strName,pcallBack)
	{
		if(nEngineCode == 1)//Mapbar
			return MEvent.addListener(obj.objInner,strName,pcallBack);
		else if(nEngineCode == 2)//����
		{
			this.objInner.addEventListener(strName,pcallBack,obj);
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			maplet.bind(obj,strName,pcallBack);
		}
	};
	//�Ƴ������¼�
	UNI_Event.prototype.removeListener = function(obj,strName,pcallBack)
	{
		if(nEngineCode == 1)//Mapbar
			MEvent.removeListener(obj);
		else if(nEngineCode == 2)//����
		{
			this.objInner.removeEventListener(strName,pcallBack,obj);
		}
		else if(nEngineCode == 3)	// λ�û���
		{ 
			maplet.unbind(obj,strName,pcallBack);
		}
	};
}
//�¼������

MEvent = new UNI_Event();

//����������������Mapbarʹ�õģ�����֣�����һ��ȫ�ֵ�
//��Щ������Ҫ��ȫ�ֺ�������
//ȫ�ֲ�������
//�������ݵĸ߶�����
function setPopWH(h,w)
{
	if( h == null || w == null ) return;
	//Mapbar
	//�߶���Ч��Χ����Чֵ��Χ��150-590֮��
	//�����Ч��Χ����Чֵ��Χ��250-640֮��
	if(nEngineCode == 1)
	{
		if(w >= h)
		{
			avBubble.height = h;
			avBubble.width = w;
		}
	}
	else if(nEngineCode == 3)	// λ�û���
	{ 
	}
}

//�����Ƿ���ʾӥ��
function showBirdEyeShow(isShow)
{
	if(nEngineCode == 1)//Mapbar
		oo = isShow;
	else if(nEngineCode == 3)	// λ�û���
	{ 

	}
}
//�����Ƿ�֧��������
function setMouseWheel(isSst)
{
	if(nEngineCode == 1)//Mapbar
		mw = isSst;
	else if(nEngineCode == 3)	// λ�û���
	{ 

	}
}

function calcCenterPointAndFixScale(strPoints,objMaps)
{//������·�ڵ�ͼ����ʾ�����ĵ�����ʵı�����
    var pArray = strPoints.split(",");
    var maxLat = 0 , minLat = 1000;
    var maxLon = 0 , minLon = 1000;
    var len = 0;
	var arInfo = new Array();
	var i = 0;
	var ptLT ,ptRB ,drawBox,sc ,ptCenter;
	if(nEngineCode == 1)
	{//Mapbar
		len  = pArray.length;
		var arLatlon = null;

	    for (i = 0; i < len; i++) {
	        if (pArray[i].length > 0) {
	        	arLatlon = transStr2XY(pArray[i]);
	        	maxLat = Math.max(maxLat,arLatlon[1]);
	        	minLat = Math.min(minLat,arLatlon[1]);
	        	maxLon = Math.max(maxLon,arLatlon[0]);
	        	minLon = Math.min(minLon,arLatlon[0]);
	        }
	    }
//alert(minLat+" , "+ minLon+" , "+ maxLat+" , "+ maxLon);
		ptCenter = encode(((minLon+maxLon )/ 2),((maxLat+minLat )/ 2));
		sc = getAutoZoomLevel(objMaps.objInner.width, objMaps.objInner.height, minLat, minLon, maxLat, maxLon);
		arInfo = new Array();
		arInfo.push(ptCenter);
		arInfo.push(sc);
		//alert(arInfo);
		return arInfo;
	}
	else if(nEngineCode == 2)
	{ 
		//����
		len = Math.round((pArray.length-1) / 2 * 2);
	    for (i = 0; i < len; i+=2) {
	        if (pArray[i].length > 0) {
	        	maxLat = Math.max(maxLat,pArray[i+1]);
	        	minLat = Math.min(minLat,pArray[i+1]);
	        	maxLon = Math.max(maxLon,pArray[i]);
	        	minLon = Math.min(minLon,pArray[i]);
	        }
	    }
		ptLT = new ZdcPoint(minLon,minLat);
		ptRB = new ZdcPoint(maxLon,maxLat);
		drawBox = new ZdcBox(ptLT,ptRB);
		sc = objMaps.objInner.getMapBoxScale(drawBox,null);
		ptCenter = drawBox.getBoxCenter();
		arInfo = new Array();
		arInfo[0]=ptCenter.lon+","+ptCenter.lat;
		arInfo[1]=sc;
		return arInfo;
	}
	else if(nEngineCode == 3)	// λ�û���
	{ 
		len  = pArray.length;
		var arLatlon = null;

	    for (i = 0; i < len; i++) {
	        if (pArray[i].length > 0) {
	        	arLatlon = decode(pArray[i]).split(",");
	        	maxLat = Math.max(maxLat,arLatlon[0]);
	        	minLat = Math.min(minLat,arLatlon[0]);
	        	maxLon = Math.max(maxLon,arLatlon[1]);
	        	minLon = Math.min(minLon,arLatlon[1]);
	        }
	    }
//alert(minLat+" , "+ minLon+" , "+ maxLat+" , "+ maxLon);
		ptCenter = encode(((minLat+maxLat) / 2),((maxLon+minLon )/ 2));
		sc = getAutoZoomLevel(objMaps.objInner.width, objMaps.objInner.height, minLat, minLon, maxLat, maxLon);
		arInfo = new Array();
		arInfo.push(ptCenter);
		arInfo.push(sc);
		//alert(arInfo);
		return arInfo;
	}
}

//===============================================================================
//�����뾭γ��ת���ɼ����ַ���
function transXY2Str(lat,lon)
{
	var strKey = "3409";
	var strLatLon = '';
	var uh = parseInt(parseFloat(Math.max(-90,Math.min(90,lon)))*100000);
	var uj = parseInt(parseFloat((lat<0)?(this.lat+360):lat)*100000);
	var pl = uj - uh + parseInt(strKey);
	var pm = uj + uh;
	if( pl < 0){
		strLatLon = 'X';
		pl = -pl;
	}
	if( pm < 0){
		strLatLon = 'Y';
		pm = -pm;
	}
	var ph = (pl).toString(16);
	var pi = (pm).toString(16);
	var i = 0, qv = 0;
	for(i = 0; i < ph.length; i++){
		qv = parseInt(ph.charAt(i),16);
		strLatLon += (((qv >= 10)?(qv + 7):qv)+10).toString(36);
	}
	strLatLon += 'z';
	for(i = 0; i < pi.length; i++){
		qv = parseInt(pi.charAt(i),16);
		strLatLon += (((qv >= 10)?(qv + 7):qv)+10).toString(36);
	}
	if(c75){
		strLatLon += strLatLon.charAt(c75);
	}
	return strLatLon.toUpperCase();
}

//�Ѽ����ַ���ת�������뾭γ��
function transStr2XY(latlon)
{
	var strKey = "3409";
	var strLatLon = latlon;
	var objLatLon = null;
	var pk = -1,fE = 0;
	var ub = '',fH = '';
				
	if(strLatLon != null && parseInt(strLatLon.charAt(0),36) >= 33){
		fH = strLatLon.charAt(0);
		strLatLon = strLatLon.substring(1);
	}
	
	for(var i = 0; i < (strLatLon.length-(c75?1:0)); i++){
		var n8 = parseInt(strLatLon.charAt(i),36)-10;
		if(n8 >= 17)n8 = n8 - 7;
		ub += (n8).toString(36);
		if(n8 > fE){
			pk = i;
			fE = n8;
		}
	}
	var n9 = parseInt(ub.substring(0,pk),16);
	var n0 = parseInt(ub.substring(pk+1),16);
	if("X" == fH){
		n9 = -n9;
	}
	if("Y" == fH){
		n0 = -n0;
	}
	objLatLon = new Array();
	objLatLon[0] = (n9 + n0 - parseInt(strKey))/2;
	objLatLon[1] = (n0-objLatLon[0])/100000.0;
	objLatLon[0] /= 100000.0;
	if(objLatLon[0]>180) objLatLon[0]-=360;
	return objLatLon;
}

//�ж����ھ��ο�ĵ����飬�������ʽ�ǡ�x,y�������ε��������µ���ʽҲ�ǡ�x,y����ʽ�����뾭γ��
function getPtArrInRect(arPts,lt,rb)
{
	var arPtsDst = null;
	if(arPts==null) return arPtsDst;
	arPtsDst = new Array();
	//�ҵ������ı߽�
	var xMax = 0,xMin = 0,yMax = 0,yMin = 0;
	var tmpXY = null;
	tmpXY = lt.split(",");
	xMax = tmpXY[0];xMin = tmpXY[0];
	yMax = tmpXY[1];yMin = tmpXY[1];
	tmpXY = rb.split(",");
	if(xMax>tmpXY[0])xMin = tmpXY[0];else xMax = tmpXY[0];
	if(yMax>tmpXY[1])yMin = tmpXY[1];else yMax = tmpXY[1];
	var i = 0;
	for( i = 0 ; i < arPts.length ; i ++)
	{
		tmpXY = arPts[i].split(",");
		if( (tmpXY[0]>=xMin && tmpXY[0]<=xMax) && (tmpXY[1]>=yMin && tmpXY[1]<=yMax) )
			arPtsDst.push(arPts[i]);
	}
	if( arPtsDst.length == 0 ) arPtsDst = null;
	return arPtsDst;
}

if(maplet3 != null ){
	maplet = maplet3.objInner ;
}

function getAutoZoomLevel(width, height, minLat, minLon, maxLat, maxLon)
{
//	var LonSteps = [30.70095396, 15.34142726, 7.687263118, 3.834581838, 1.921040803, 0.961070385, 
//	                0.479485225, 0.240292595, 0.119896305, 0.060098148, 0.029999076, 0.014999538, 
//	                0.007499769, 0.003749884, 0.001874942, 0.000937471];
//	
//	var LatSteps = [37.35156746, 17.74849145, 8.417597568, 4.092892851, 2.009378808, 0.995763177, 
//	                0.496907051, 0.247401207, 0.123874785, 0.061798483, 0.030888483, 0.015439732, 
//	                0.007716918, 0.003855902, 0.001931926, 0.000966746];
	
	var LonSteps = [49.8020899432, 23.6646552602, 11.2234634238, 5.4571904680, 2.6791717442, 1.3276842354, 
	                0.6625427345, 0.3298682761, 0.1651663800, 0.0823979769, 0.0411846445, 0.0205863089, 
	                0.0102892243, 0.0051412029, 0.0025759019, 0.0012889940];
	
	var LatSteps = [52.7033042908, 26.3361167908, 13.1964683533, 6.5826988220, 3.2977867126, 1.6498374939, 
	                0.8231163025, 0.4125022888, 0.2058219910, 0.1031684875, 0.0514984131, 0.0257492065, 
	                0.0128746033, 0.0064373016, 0.0032186508, 0.0016093254];

	var imagewidth = 300;
	var imageheight = 300;

	var unitLat = (1.1000000000000001 * (maxLat - minLat) * imageheight) / height;
	var unitLon = (1.1000000000000001 * (maxLon - minLon) * imagewidth) / width;
	var zmLat = getFitZoomLevel(unitLat, LatSteps);
	var zmLon = getFitZoomLevel(unitLon, LonSteps);
	var zmFit = Math.min(zmLat, zmLon);
	return zmFit;

}

function getFitZoomLevel( dValue, arrayLevels)
{
	var iLevel = 0;
	for (iLevel = 1; iLevel < arrayLevels.length && dValue <= arrayLevels[iLevel]; iLevel++);
	return iLevel - 1 + 3;
}

function decode(strLine){
	var nKey = 3409;

	var sb = "";
	var iDelimit = 0;
	var cDelimit = '0';
	for (var i = 0; i < strLine.length; i++)
	{
		var cItem = ((strLine.charCodeAt(i) - 65) + 48);
		if (cDelimit < strLine.charCodeAt(i))
		{
			cDelimit = strLine.charCodeAt(i);
			iDelimit = i;
		}
		sb = sb + String.fromCharCode(cItem);
	}

	var n1 = parseInt(sb.substring(0, iDelimit), 16);
	var n2 = parseInt(sb.substring(iDelimit + 1), 16);
	var nLon = ((n1 + n2) - nKey) / 2;
	var nLat = n2 - nLon;
	return (nLat / 100000.0) + "," + (nLon / 100000.0);
};

function encode(dLat, dLon){
	var sb = "";
	var nLat = parseInt(dLat * 100000);
	var nLon = parseInt(dLon * 100000);
	var nKey = 3409;

	sb = Number((nLon - nLat) + nKey).toString(16).toUpperCase();
	var iDelimit = sb.length;
	sb += Number((nLon + nLat)).toString(16).toUpperCase();
	var cDelimit = '0';
	var str = "";
	for (var i = 0; i < sb.length; i++)
	{
		var cItem = (sb.charCodeAt(i) - 48) + 65;
		if (cDelimit < cItem)
			cDelimit = cItem;
		str += String.fromCharCode(cItem);
	}
	
	str = str.substring(0,iDelimit) + String.fromCharCode(cDelimit+1) + str.substring(iDelimit,str.length);

	return str;
}