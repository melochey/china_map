var g_ver = "V_1.0 R 2009-6-3";
var g_objMapFrame = null;
var g_currMovePoint = "";
var CIURL = "http://218.206.87.189/cicore/pages/html/detail.html";
if(typeof url == "undefined" )var url=parent.location.search;
//if(typeof url == "undefined" )var url="";
var Request = new Object();
if (url.indexOf("?") != -1) {
	var str = url.substr(1);
	strs = str.split("&"); 
	Request['id'] = "1";	
	for (var i = 0; i < strs.length; i++) {
		if(strs[i].split("=")[0]=="USERNAME"){
			Request[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
		}else
			Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
	}
}

//�ж�city�Ƿ���lbs
function getLbsBoolean(ccid){
	var lbs = ["100"];  //,"571"
	var bl = false;
	for(var i=0;i<lbs.length;i++){
		if(ccid == lbs[i]) bl = true;
	}
	return bl;
}

//�ж�city�Ƿ���lbs
function getLbsBooleanCity(ccid){
	var lbs = [];//,"571"
	var bl = false;
	for(var i=0;i<lbs.length;i++){
		if(ccid == lbs[i]) bl = true;
	}
	return bl;
}

function replaceAll(str,bz,th){
var newValue = str.replace(new RegExp(bz,"gm"),th);
return newValue;
}
//lbs�����ַ
function getLBSUrl(cityNumber,province,cityInt){
	var LBSInfo = null; //ip���˿ڣ�Service,id,pwd,serviceid
	var params = "";
	var telCity = "";
	if(tel != null && tel != '') telCity = lbs_getCity(tel,1);//showTelCity(tel);
	if(telCity == "����"){
		LBSInfo = ["211.136.91.162","2234","LocationQueryService","bjwxxq","bjwxxq#!3","LBS","100"];
		params = "incode="+arCode[2]+"&province="+province+"&city="+cityInt
 				+"&tel="+tel+"&gotype=LBS&cityNumber="+LBSInfo[6]
				+getLogUrl(id)
				+"&lbsip="+LBSInfo[0]+"&lbsport="+LBSInfo[1]+"&lbsservice="+LBSInfo[2]
				+"&lbsid="+LBSInfo[3]+"&lbspwd="+LBSInfo[4]+"&lbsserviceid="+LBSInfo[5];
	}
	if(telCity == "�㽭"){
		LBSInfo = ["211.136.91.162","2234","LocationQueryService","bjwxxq","bjwxxq#!3","LBS","571"];
		params = "incode="+arCode[2]+"&province="+province+"&city="+cityInt
 				+"&tel="+tel+"&gotype=LBS&cityNumber="+LBSInfo[6]
				+getLogUrl(id)
				+"&lbsip="+LBSInfo[0]+"&lbsport="+LBSInfo[1]+"&lbsservice="+LBSInfo[2]
				+"&lbsid="+LBSInfo[3]+"&lbspwd="+LBSInfo[4]+"&lbsserviceid="+LBSInfo[5];
	}
	return params;
}

//��ù������Źؼ���
function getBusKeystation(tel,cityNumber,province,cityInt,url,id){
	var params = getBusKeywordUrl(cityNumber,province,cityInt);
 	if(params == "") return;
 	var req = newXMLHttpRequest();
 	req.onreadystatechange = get_BusKeystation(req,url,id);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}

function get_BusKeystation(req,url,id) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var test = req.responseText;
    			parse_BusKeystation(test,url,id);
			} else {
				alert("�޽����Ϣ")
			}
		}
	};
}
function parse_BusKeystation(test,url){
	var keyword = test.split("$");
	var show_keyword = "<table width=\"760\">";
	for(i = 0; i < keyword.length; i++){
		if(i%6 == 0){
			show_keyword = show_keyword + "<tr><td><div class=\"all_a\" ><a style=\"cursor:hand;text-decoration:underline;\" onclick=\"setStartEndS('"+keyword[i]+"')\">"+keyword[i]+"</a></div></td>";		
		}else if(i%6 == 5){
			show_keyword = show_keyword + "<td><div class=\"all_a\" ><a style=\"cursor:hand;text-decoration:underline;\" onclick=\"setStartEndS('"+keyword[i]+"')\">"+keyword[i]+"</a></div></td></tr>";		
		}else{
			show_keyword = show_keyword + "<td><div class=\"all_a\" ><a style=\"cursor:hand;text-decoration:underline;\" onclick=\"setStartEndS('"+keyword[i]+"')\">"+keyword[i]+"</a></div></td>";		
		}
	}
	
	show_keyword = show_keyword + "</table>";
	
	if(keyword.length<=1){
	    document.getElementById("mapFrame").style.visibility = "visible";
	}
	else if(keyword.length>1 && searchtype == "1"){
		document.getElementById("keyword_hot").innerHTML = "";
		document.getElementById("mapFrame").style.visibility = "visible";
	}
	else{
		document.getElementById("mapFrame").style.visibility = "hidden";
		document.getElementById("keyword_hot").innerHTML = show_keyword;
	}
}

function setStartEndS(keyword){

	if(document.getElementById("station")==null){
		document.getElementById("keyword").value = keyword;
		locationGo(1);
	}else{
		document.getElementById("station").value = keyword;
		locationGo(1);
	}
	
	
	//if(cursor == 'start'){
	//	document.getElementById("start").value = keyword;
	//}
	//if(cursor == 'end'){
	//	document.getElementById("end").value = keyword;
	//}
	//cursor = null;
	
//	var start = document.getElementById("start");
//	var end = document.getElementById("end");
//	if(start.value == ""){
//		document.getElementById("start").value = keyword;
//	}else{
//		if(end.value == ""){
//			document.getElementById("end").value = keyword;
//		}
//	}
}

//bus���Źؼ��������ַ
function getBusKeywordUrl(cityNumber,province,cityInt){
	var LBSInfo = null; //ip���˿ڣ�Service,id,pwd,serviceid
	var params = "";
	params = "incode="+arCode[2]+"&province="+province+"&city="+cityInt
 				+"&tel="+tel+"&gotype=BUSKEYWORD"+getLogUrl(id);
	return params;
}

//��ù������Źؼ���
function getBusKeyword(tel,cityNumber,province,cityInt,url,id){
	var params = getBusKeywordUrl(cityNumber,province,cityInt);
 	if(params == "") return;
 	var req = newXMLHttpRequest();
 	req.onreadystatechange = get_BusKeyword(req,url,id);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}

function get_BusKeyword(req,url,id) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var test = req.responseText;
    			parse_BusKeyword(test,url,id);
			} else {
				alert("�޽����Ϣ")
			}
		}
	};
}
function parse_BusKeyword(test,url){
	var keyword = test.split("$");
	var show_keyword = "<table width=\"760\">";
	for(i = 0; i < keyword.length; i++){
		if(i%6 == 0){
			show_keyword = show_keyword + "<tr><td><div class=\"all_a\" ><a style=\"cursor:hand;text-decoration:underline;\" onclick=\"setStartEnd('"+keyword[i]+"')\">"+keyword[i]+"</a></div></td>";		
		}else if(i%6 == 5){
			show_keyword = show_keyword + "<td><div class=\"all_a\" ><a style=\"cursor:hand;text-decoration:underline;\" onclick=\"setStartEnd('"+keyword[i]+"')\">"+keyword[i]+"</a></div></td></tr>";		
		}else{
			show_keyword = show_keyword + "<td><div class=\"all_a\" ><a style=\"cursor:hand;text-decoration:underline;\" onclick=\"setStartEnd('"+keyword[i]+"')\">"+keyword[i]+"</a></div></td>";		
		}
	}
	show_keyword = show_keyword + "</table>";
	
	if(keyword.length<=1){
	    document.getElementById("mapFrame").style.visibility = "visible";
	}else if(keyword.length>1 && searchtype == "1"){
		if(document.getElementById("keyword_hot")!=null)document.getElementById("keyword_hot").innerHTML = "";
		if(document.getElementById("mapFrame")!=null)document.getElementById("mapFrame").style.visibility = "visible";
	}else{
		if(document.getElementById("mapFrame")!=null)document.getElementById("mapFrame").style.visibility = "hidden";
		if(document.getElementById("keyword_hot")!=null)document.getElementById("keyword_hot").innerHTML = show_keyword;
	}
}

function setStartEnd(keyword){
	if (cursor == null) {
		if (document.getElementById("start").value == "") {
			cursor = 'start';
		}else{
			cursor = 'end';
		}
	}
	document.getElementById(cursor).value = keyword;
	if(cursor == 'keyword'){
		locationGo(1);
	}
	cursor = null;
//	var start = document.getElementById("start");
//	var end = document.getElementById("end");
//	if(start.value == ""){
//		document.getElementById("start").value = keyword;
//	}else{
//		if(end.value == ""){
//			document.getElementById("end").value = keyword;
//		}
//	}
}

//bus���Źؼ��������ַ
function getBusKeylineUrl(cityNumber,province,cityInt){
	var LBSInfo = null; //ip���˿ڣ�Service,id,pwd,serviceid
	var params = "";
	params = "incode="+arCode[2]+"&province="+province+"&city="+cityInt
 				+"&tel="+tel+"&gotype=BUSKEYLINE"+getLogUrl(id);
	return params;
}

//��ù������Źؼ���
function getBusKeyline(tel,cityNumber,province,cityInt,url,id){
	var params = getBusKeylineUrl(cityNumber,province,cityInt);
 	if(params == "") return;
 	var req = newXMLHttpRequest();
 	req.onreadystatechange = get_BusKeyline(req,url,id);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}

function get_BusKeyline(req,url,id) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var test = req.responseText;
    			parse_BusKeyline(test,url,id);
			} else {
				alert("�޽����Ϣ")
			}
		}
	};
}
function parse_BusKeyline(test,url,id){
	var keyword = test.split("$");
	var show_keyword = "<table>";
	for(i = 0; i < keyword.length; i++){
		if(i%6 == 0){
			show_keyword = show_keyword + "<tr><td><div class=\"all_a\" ><a style=\"cursor:hand;text-decoration:underline;\" onclick=\"setBusLine('"+keyword[i]+"')\">"+keyword[i]+"</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></td>";		
		}else if(i%6 == 5){
			show_keyword = show_keyword + "<td><div class=\"all_a\" ><a style=\"cursor:hand;text-decoration:underline;\" onclick=\"setBusLine('"+keyword[i]+"')\">"+keyword[i]+"</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></td></tr>";		
		}else{
			show_keyword = show_keyword + "<td><div class=\"all_a\" ><a style=\"cursor:hand;text-decoration:underline;\" onclick=\"setBusLine('"+keyword[i]+"')\">"+keyword[i]+"</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></td>";		
		}
	}
	show_keyword = show_keyword + "</table>";
	
	if(keyword.length<=1){
	    document.getElementById("mapFrame").style.visibility = "visible";
	}else if(keyword.length>1 && searchtype == "1"){
		document.getElementById("keyline").innerHTML = "";
		document.getElementById("mapFrame").style.visibility = "visible";
	}else{
		document.getElementById("mapFrame").style.visibility = "hidden";
		document.getElementById("keyline").innerHTML = show_keyword;
	}
}

function setBusLine(keyword){
	//if(cursor == 'line'){
		document.getElementById("line").value = keyword;
		locationGo(1);
	//}
	//cursor = null;
	
//	var start = document.getElementById("start");
//	var end = document.getElementById("end");
//	if(start.value == ""){
//		document.getElementById("start").value = keyword;
//	}else{
//		if(end.value == ""){
//			document.getElementById("end").value = keyword;
//		}
//	}
}

//����ҳ��ʱ��λ
function lbs_Go(tel,cityNumber,province,cityInt,url,id){
	if(!getLbsBooleanCity(cityNumber)){
            return;
    }
    if(tel == ""){  // || !(/^13\d{9}$/g.test(tel))
            return;
    }
    if(serialno ==null || serialno == 'undefined' || serialno=='') return;  
/*
	if(parent.arrayParams != null){
		if(parent.arrayParams[4] != null && parent.arrayParams[8] != null && parent.arrayParams[7] !== null){
			mapFrame.showLBSPOI(parent.arrayParams[4],"../images/lbs_1.gif","","22","34",parent.arrayParams[8],parent.arrayParams[7]);
			mapFrame.setCenter(parent.arrayParams[4]);
			mapFrame.drawCirclePie(parent.arrayParams[4],500,"#FF0000");
			return;
		}	
	} */
	mapFrame.document.getElementById("locationning").innerHTML = "��λ�У����Ժ�";
//	document.getElementById("locationning").innerHTML = "��λ�У����Ժ�";
 	var params = getLBSUrl(cityNumber,province,cityInt);
 	if(params == "") return;
 	var req = newXMLHttpRequest();
 	req.onreadystatechange = get_LBS(req,url,id);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}

//����ҳ��ʱ��λ
function lbs_GoNew(tel,cityNumber,province,cityInt,url,id){
	//g_objMapFrame.setPopWHInner(210,350);
	if(!getLbsBooleanCity(cityNumber)){
		return;
	}
	if(tel == ""){  // || !(/^13\d{9}$/g.test(tel))
		return;
	} 
/*
	if(parent.arrayParams != null){
		if(parent.arrayParams[4] != null && parent.arrayParams[8] != null && parent.arrayParams[7] !== null){
			mapFrame.showLBSPOI(parent.arrayParams[4],"../images/lbs_1.gif","","22","34",parent.arrayParams[8],parent.arrayParams[7]);
			mapFrame.setCenter(parent.arrayParams[4]);
			mapFrame.drawCirclePie(parent.arrayParams[4],500,"#FF0000");
			return;
		}	
	} */
//	mapFrame.document.getElementById("locationning").innerHTML = "��λ�У����Ժ�";
	document.getElementById("locationning").innerHTML = "��λ�У����Ժ�";
 	var params = getLBSUrl(cityNumber,province,cityInt);
 	if(params == "") return;
 	var req = newXMLHttpRequest();
 	req.onreadystatechange = get_LBSNew(req,url,id);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}

function get_LBS(req,url,id) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var test = req.responseText;
    			parse_LBS(test,url,id);
			} else {
				alert("�޽����Ϣ")
			}
		}
	};
}

function get_LBSNew(req,url,id) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var test = req.responseText;
    			parse_LBSNew(test,url,id);
			} else {
				alert("�޽����Ϣ")
			}
		}
	};
}

function parse_LBS(test,url,id){
	//if(test.indexOf("GIS_RES")<0) return; //�ж��Ƿ���������XML
	if(test.indexOf("GIS_RES")<0) {
		mapFrame.document.getElementById("locationning").innerHTML = "��λʧ�ܣ����Ժ�����";
//	document.getElementById("locationning").innerHTML = "��λʧ�ܣ����Ժ�����";
		return;
	}
	var xmlDoc = getXmlDoc(test);
	if(xmlDoc.getElementsByTagName("GIS_RES")[0].getAttribute('type') == 'PLACE'){
		parsePlace(test,id);//��λ�ɹ����ص�XML
	}
	return;
	//��λʧ�ܷ��ص�XML,��ִ��
	var slia  = xmlDoc.getElementsByTagName("slia"); 
	var pos = slia[0].getElementsByTagName("pos"); 
	var pd = pos[0].getElementsByTagName("pd"); 
	var shape = pd[0].getElementsByTagName("shape"); 
	var Point = shape[0].getElementsByTagName("Point"); 
	var srsName = Point[0].getAttribute('srsName');
	var coord = Point[0].getElementsByTagName("coord"); 
	var X = "";
	if(coord[0].getElementsByTagName("X")[0].firstChild!=null)	
		X = coord[0].getElementsByTagName("X")[0].firstChild.nodeValue;
	var Y = "";
	if(coord[0].getElementsByTagName("Y")[0].firstChild!=null)	
		Y = coord[0].getElementsByTagName("Y")[0].firstChild.nodeValue;
	if(X!="" && Y!=""){
		placeGo(X,Y,url);
	}	
}

function parse_LBSNew(test,url,id){
	//if(test.indexOf("GIS_RES")<0) return; //�ж��Ƿ���������XML
	if(test.indexOf("GIS_RES")<0) {
		mapFrame.document.getElementById("locationning").innerHTML = "��λʧ�ܣ����Ժ�����";
		document.getElementById("locationning").innerHTML = "��λʧ�ܣ����Ժ�����";
		return;
	}
	var xmlDoc = getXmlDoc(test);
	if(xmlDoc.getElementsByTagName("GIS_RES")[0].getAttribute('type') == 'PLACE'){
		parsePlaceNew(test,id);//��λ�ɹ����ص�XML
	}
	return;
	//��λʧ�ܷ��ص�XML,��ִ��
	var slia  = xmlDoc.getElementsByTagName("slia"); 
	var pos = slia[0].getElementsByTagName("pos"); 
	var pd = pos[0].getElementsByTagName("pd"); 
	var shape = pd[0].getElementsByTagName("shape"); 
	var Point = shape[0].getElementsByTagName("Point"); 
	var srsName = Point[0].getAttribute('srsName');
	var coord = Point[0].getElementsByTagName("coord"); 
	var X = "";
	if(coord[0].getElementsByTagName("X")[0].firstChild!=null)	
		X = coord[0].getElementsByTagName("X")[0].firstChild.nodeValue;
	var Y = "";
	if(coord[0].getElementsByTagName("Y")[0].firstChild!=null)	
		Y = coord[0].getElementsByTagName("Y")[0].firstChild.nodeValue;
	if(X!="" && Y!=""){
		placeGo(X,Y,url);
	}	
}

function placeGo(x,y,url){
 	var params = "incode="+arCode[2]+"&gotype=PLACE&lat="+y+"&lon="+x+getLogUrl(id);
 	var req = newXMLHttpRequest();
 	req.onreadystatechange = getPlace(req);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}

function getPlace(req) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var test = req.responseText;
    			parsePlace(test);
			} else {
				alert("�޽����Ϣ")
			}
		}
	};
}


//���
function showLaiBiePage2(type_show,strLatlon,type_value,lbscity)
{
	var arInfo = [["����"],["��������"],["�������"],["����"],["����"],["ҽԺ"],["����"],["��ͨ"],["�Ƶ�"]];
	//var strHTML = "<a style=\"text-decoration:underline;color:#00f;font-size:12px;\" onclick=\"showLaiBiePage();\">���</a>��";
	var strHTML = "���";
	for(var i=0;i<arInfo.length;i++){
		strHTML = strHTML + "<a  style=\"text-decoration:underline;color:#00f;font-size:12px;cursor:hand;\" onclick=\"putLeiBie('"+arInfo[i]+"','"+type_show+"','"+strLatlon+"','"+type_value+"','"+lbscity+"');\">"+arInfo[i]+"</a> ";
	}
	return  strHTML;
	//return  "";
}

function getSearch(city){
	var r = searchCity(city);
	if(r == null )  return;
	return r;
}

//��ͼ��λͼ��������ʾ
function parsePlace(test,id){
	if(test.indexOf("GIS_RES")<0) {
		mapFrame.document.getElementById("locationning").innerHTML = "��λʧ�ܣ����Ժ�����";
		return;
	}
	var xmlDoc = getXmlDoc(test);
	if(xmlDoc.getElementsByTagName("GIS_RES")[0].getAttribute('type') != 'PLACE'){
		return;
	}
	var status = "";
	if(xmlDoc.getElementsByTagName("status")[0].firstChild!=null){
		status = xmlDoc.getElementsByTagName("status")[0].firstChild.nodeValue; 
	}
	if(status!="0") return;
	var road1 = "";
	if(xmlDoc.getElementsByTagName("road1")[0].firstChild!=null)
		road1 = xmlDoc.getElementsByTagName("road1")[0].firstChild.nodeValue;
	var road2 = "";
	if(xmlDoc.getElementsByTagName("road2")[0].firstChild!=null)
		road2 = xmlDoc.getElementsByTagName("road2")[0].firstChild.nodeValue;
	var name = "";
	if(xmlDoc.getElementsByTagName("name")[0].firstChild!=null)
		name = xmlDoc.getElementsByTagName("name")[0].firstChild.nodeValue;
	var city = "";
	if(xmlDoc.getElementsByTagName("city")[0].firstChild!=null)
		city = xmlDoc.getElementsByTagName("city")[0].firstChild.nodeValue;
	var latlon = null;
	if(xmlDoc.getElementsByTagName("latlon")[0].firstChild!=null)
		latlon = xmlDoc.getElementsByTagName("latlon")[0].firstChild.nodeValue;
	if(latlon.length != 13){
		return;//�����λʧ�ܷ���
	}
	var lat = null;
	if(xmlDoc.getElementsByTagName("lat")[0].firstChild!=null)
		lat = xmlDoc.getElementsByTagName("lat")[0].firstChild.nodeValue;
	var lon = null;
	if(xmlDoc.getElementsByTagName("lon")[0].firstChild!=null)
		lon = xmlDoc.getElementsByTagName("lon")[0].firstChild.nodeValue;
	
	var r = getSearch(city);
	var province = r[0][3];  //���ʡ����
	var cityInt = r[0][4];   //����б���
	var dcpid = "";
	var gisid = "";
    var i = 0;
	var poi_title = "<strong>"+road1+" "+road2+" "+name+"</strong>";
//	document.getElementById("locationning").innerHTML = poi_title;
	var show_POI = "<table>"
			+ "<tr><td>���У�"+city+"</td></tr>"
			//+ "<tr><td>��ַ��"+"</td></tr>" /*"<tr><td>��ַ��"+road1+" "+road2+"</td></tr>"*/
			+ "<tr><td>"
			+ " <a class=\"all_a\" onclick=\"showLaiBiePage('window_value','"+latlon+"','0','"+city+"');document.getElementById('cz_"+i+"').style.display='';document.getElementById('cfd_"+i+"').style.display='none';document.getElementById('qq_"+i+"').style.display='none';\">�ڸ�������</a>"
            + " <a class=\"all_a\" onclick=\"suggestBind();document.getElementById('cfd_"+i+"').style.display='';document.getElementById('cz_"+i+"').style.display='none';document.getElementById('qq_"+i+"').style.display='none';\">������</a>"
            + " <a class=\"all_a\" onclick=\"suggestBind();document.getElementById('qq_"+i+"').style.display='';document.getElementById('cz_"+i+"').style.display='none';document.getElementById('cfd_"+i+"').style.display='none';\">���������</a>"
            + " <a class=\"all_a\" onclick=\"openwindow('lbs/dx_zb.jsp?subtype=LBS&name="+name+"&address="+road1+road2+"&province="+province+"&cityInt="+cityInt+"&gisid="+gisid+"&dcpid="+dcpid+"&tel="+tel+getLogUrl(id)+"','','507','320')\">����</a>"
           	+ " <a class=\"all_a\" onclick=\"openwindow('lbs/cx_zb.jsp?subtype=LBS&name="+name+"&address="+road1+road2+"&province="+province+"&cityInt="+cityInt+"&gisid="+gisid+"&dcpid="+dcpid+"&tel="+tel+"&arCode="+arCode[2]+"&latlon="+latlon+"&lat="+lat+"&lon="+lon+getLogUrl(id)+"','','530','450')\">����</a>"
			+ "</td></tr>";
	show_POI = show_POI + "<tr><td>"
        		+"<span id=\"cz_"+i+"\" style=\"display:block;\">"
	        +"<input type=\"text\" size=\"38\" id=\"poitextfield"+i+"\" />"
	        +"<input type=\"button\" value=\"����\" onclick=\"openWindowsZB('poitextfield"+i+"','"+name+"','"+latlon+"','"+city+"','"+gisid+"','"+dcpid+"')\"/>"
	      //   +"<div id='show_leibie0'>"+showLaiBiePage2('window_value',latlon,'0',city)+"</div>"
	         +"<div id='show_leibie"+i+"'>"+showLaiBiePage2('window_value',latlon,i)+"</div>"
			+"</span>"
			
			+"<span id=\"cfd_"+i+"\" style=\"display:none\">���� "  //<a class=\"all_a\" style=\"cursor:hand;\" onclick=\"showCityDiv('city_"+i+"')\">���� </a>
			+"<input name=\"city_"+i+"\" id=\"city_"+i+"\" type=\"text\" value=" + city + " size=\"10\" issuggest=\"yes\" autocomplete=\"off\" suggestType=\"city\" isshengccid=\"\"/><br/>"			
			+"�����أ�"
	       	+"<input name=\"busstartid"+i+"\" id=\"busstartid"+i+"\" type=\"text\" value=\"\" size=\"18\" cityname=\"city_"+i+"\" issuggest=\"yes\" autocomplete=\"off\" suggestType=\"pinyinkey\" /><br/>"
			+"Ŀ�ĵأ�"+name+"<br/>"
		    +"<input type=\"button\" value=\"����\" onclick=\"openWindowsGJ('start','busstartid"+i+"','"+name+"','"+latlon+"','"+gisid+"','"+dcpid+"','"+city+"','city_"+i+"')\"/>"
	        +"<input type=\"button\" value=\"�Լ�\" onclick=\"openWindowsZJ('start','busstartid"+i+"','"+name+"','"+latlon+"','"+gisid+"','"+dcpid+"','"+city+"','city_"+i+"')\"/>"
	     	+"<br/></span>"
	     	
	   		+"<span id=\"qq_"+i+"\" style=\"display:none\">���� "   //<a class=\"all_a\" style=\"cursor:hand;\" onclick=\"showCityDiv('city_1"+i+"')\">���� </a>
	   		+"<input name=\"city_1"+i+"\" id=\"city_1"+i+"\" type=\"text\" value=" + city + " size=\"10\" issuggest=\"yes\" autocomplete=\"off\" suggestType=\"city\" isshengccid=\"\"/><br/>"	   		
	   		+"�����أ�"+name+"<br/>"
	        +"Ŀ�ĵأ�"
            +"<input id=\"busendid"+i+"\" name=\"busendid"+i+"\" type=\"text\" value=\"\" size=\"18\" cityname=\"city_1"+i+"\" issuggest=\"yes\" autocomplete=\"off\" suggestType=\"pinyinkey\" />"
            +"<br/>"
            +"<input type=\"button\" value=\"����\" onclick=\"openWindowsGJ('end','busendid"+i+"','"+name+"','"+latlon+"','"+gisid+"','"+dcpid+"','"+city+"','city_1"+i+"')\"/>"
            +"<input type=\"button\" value=\"�Լ�\" onclick=\"openWindowsZJ('end','busendid"+i+"','"+name+"','"+latlon+"','"+gisid+"','"+dcpid+"','"+city+"','city_1"+i+"')\"/>"
            +"</span></td></tr></table>";
    //if( document.getElementById("city") != null){
    //	 document.getElementById("city").value = city;
    //}else if( document.getElementById("city1") != null){
    //	 document.getElementById("city1").value = city;
    //	 document.getElementById("city2").value = city;
    //}
    if(latlon != null && show_POI != null && poi_title != null){
   		mapFrame.setPopWHInner(210,400);
    	mapFrame.showLBSPOI(latlon,"../images/lbs_1.gif","","22","34",show_POI,poi_title);
    	var now1=new Date();   
    	var a=now1.getFullYear() +"-" + now1.getMonth() +"-" + now1.getDate() +" " + now1.getHours() +":" + now1.getMinutes() +":" + now1.getSeconds() + ":" + now1.getMilliseconds();
    }
 	//mapFrame.setCenter(latlon);
  	mapFrame.drawCirclePie(latlon,100,"#FF0000");
 	//showCityPage("city");
 	parent.arrayParams = [road1,road2,name,city,latlon,lat,lon,poi_title,show_POI];
 	mapFrame.document.getElementById("locationning").innerHTML = "";
 	if(id != null){
 		document.getElementById(id).value = name;
 	}
 }
 
 //��ͼ��λͼ��������ʾ
function parsePlaceNew(test,id){
	if(test.indexOf("GIS_RES")<0) {
		mapFrame.document.getElementById("locationning").innerHTML = "��λʧ�ܣ����Ժ�����";
		return;
	}
	
	var xmlDoc = getXmlDoc(test);
	if(xmlDoc.getElementsByTagName("GIS_RES")[0].getAttribute('type') != 'PLACE'){
		return;
	}
	var subtype = xmlDoc.getElementsByTagName("GIS_RES")[0].getAttribute('subtype')
	var status = "";
	if(xmlDoc.getElementsByTagName("status")[0].firstChild!=null){
		status = xmlDoc.getElementsByTagName("status")[0].firstChild.nodeValue; 
	}
	if(status!="0") return;
	var road1 = "";
	if(xmlDoc.getElementsByTagName("road1")[0].firstChild!=null)
		road1 = xmlDoc.getElementsByTagName("road1")[0].firstChild.nodeValue;
	var road2 = "";
	if(xmlDoc.getElementsByTagName("road2")[0].firstChild!=null)
		road2 = xmlDoc.getElementsByTagName("road2")[0].firstChild.nodeValue;
	var name = "";
	if(xmlDoc.getElementsByTagName("name")[0].firstChild!=null)
		name = xmlDoc.getElementsByTagName("name")[0].firstChild.nodeValue;
	var city = "";
	if(xmlDoc.getElementsByTagName("city")[0].firstChild!=null)
		city = xmlDoc.getElementsByTagName("city")[0].firstChild.nodeValue;
	var latlon = null;
	if(xmlDoc.getElementsByTagName("latlon")[0].firstChild!=null)
		latlon = xmlDoc.getElementsByTagName("latlon")[0].firstChild.nodeValue;
	if(latlon.length != 13){
		return;//�����λʧ�ܷ���
	}
	var lat = null;
	if(xmlDoc.getElementsByTagName("lat")[0].firstChild!=null)
		lat = xmlDoc.getElementsByTagName("lat")[0].firstChild.nodeValue;
	var lon = null;
	if(xmlDoc.getElementsByTagName("lon")[0].firstChild!=null)
		lon = xmlDoc.getElementsByTagName("lon")[0].firstChild.nodeValue;
	
	var r = getSearch(city);
	var province = r[0][3];  //���ʡ����
	var cityInt = r[0][4];   //����б���
	var dcpid = "";
	var gisid = "";
    var i = 0;
	var poi_title = "<strong>"+road1+" "+road2+" "+name+"</strong>";
	document.getElementById("locationning").innerHTML = poi_title;
	var show_POI = "<table>"
			+ "<tr><td>���У�"+city+"</td></tr>"
			//+ "<tr><td>��ַ��"+"</td></tr>" /*"<tr><td>��ַ��"+road1+" "+road2+"</td></tr>"*/
			+ "<tr><td>"
			+ " <a class=\"all_a\" onclick=\"showLaiBiePage('window_value','"+latlon+"','0','"+city+"');document.getElementById('cz_"+i+"').style.display='';document.getElementById('cfd_"+i+"').style.display='none';document.getElementById('qq_"+i+"').style.display='none';\">�ڸ�������</a>"
            + " <a class=\"all_a\" onclick=\"suggestBind();document.getElementById('cfd_"+i+"').style.display='';document.getElementById('cz_"+i+"').style.display='none';document.getElementById('qq_"+i+"').style.display='none';\">������</a>"
            + " <a class=\"all_a\" onclick=\"suggestBind();document.getElementById('qq_"+i+"').style.display='';document.getElementById('cz_"+i+"').style.display='none';document.getElementById('cfd_"+i+"').style.display='none';\">���������</a>"
            + " <a class=\"all_a\" onclick=\"openwindow('lbs/dx_zb.jsp?subtype=LBS&name="+name+"&address="+road1+road2+"&province="+province+"&cityInt="+cityInt+"&gisid="+gisid+"&dcpid="+dcpid+"&tel="+tel+getLogUrl(id)+"','','507','320')\">����</a>"
           	+ " <a class=\"all_a\" onclick=\"openwindow('lbs/cx_zb.jsp?subtype=LBS&name="+name+"&address="+road1+road2+"&province="+province+"&cityInt="+cityInt+"&gisid="+gisid+"&dcpid="+dcpid+"&tel="+tel+"&arCode="+arCode[2]+"&latlon="+latlon+"&lat="+lat+"&lon="+lon+getLogUrl(id)+"','','530','450')\">����</a>"
			+ "</td></tr>";
	show_POI = show_POI + "<tr><td>"
        		+"<span id=\"cz_"+i+"\" style=\"display:block;\">"
	        +"<input type=\"text\" size=\"38\" id=\"poitextfield"+i+"\" />"
	        +"<input type=\"button\" value=\"����\" onclick=\"openWindowsZB('poitextfield"+i+"','"+name+"','"+latlon+"','"+city+"','"+gisid+"','"+dcpid+"')\"/>"
	      //   +"<div id='show_leibie0'>"+showLaiBiePage2('window_value',latlon,'0',city)+"</div>"
	         +"<div id='show_leibie"+i+"'>"+showLaiBiePage2('window_value',latlon,i)+"</div>"
			+"</span>"
			
			+"<span id=\"cfd_"+i+"\" style=\"display:none\">���� "  //<a class=\"all_a\" style=\"cursor:hand;\" onclick=\"showCityDiv('city_"+i+"')\">���� </a>
			+"<input name=\"city_"+i+"\" id=\"city_"+i+"\" type=\"text\" value=" + city + " size=\"10\" issuggest=\"yes\" autocomplete=\"off\" suggestType=\"city\" isshengccid=\"\"/><br/>"			
			+"�����أ�"
	       	+"<input name=\"busstartid"+i+"\" id=\"busstartid"+i+"\" type=\"text\" value=\"\" size=\"18\" cityname=\"city_"+i+"\" issuggest=\"yes\" autocomplete=\"off\" suggestType=\"pinyinkey\" /><br/>"
			+"Ŀ�ĵأ�"+name+"<br/>"
		    +"<input type=\"button\" value=\"����\" onclick=\"openWindowsGJ('start','busstartid"+i+"','"+name+"','"+latlon+"','"+gisid+"','"+dcpid+"','"+city+"','city_"+i+"')\"/>"
	        +"<input type=\"button\" value=\"�Լ�\" onclick=\"openWindowsZJ('start','busstartid"+i+"','"+name+"','"+latlon+"','"+gisid+"','"+dcpid+"','"+city+"','city_"+i+"')\"/>"
	     	+"<br/></span>"
	     	
	   		+"<span id=\"qq_"+i+"\" style=\"display:none\">���� "   //<a class=\"all_a\" style=\"cursor:hand;\" onclick=\"showCityDiv('city_1"+i+"')\">���� </a>
	   		+"<input name=\"city_1"+i+"\" id=\"city_1"+i+"\" type=\"text\" value=" + city + " size=\"10\" issuggest=\"yes\" autocomplete=\"off\" suggestType=\"city\" isshengccid=\"\"/><br/>"	   		
	   		+"�����أ�"+name+"<br/>"
	        +"Ŀ�ĵأ�"
            +"<input id=\"busendid"+i+"\" name=\"busendid"+i+"\" type=\"text\" value=\"\" size=\"18\" cityname=\"city_1"+i+"\" issuggest=\"yes\" autocomplete=\"off\" suggestType=\"pinyinkey\" />"
            +"<br/>"
            +"<input type=\"button\" value=\"����\" onclick=\"openWindowsGJ('end','busendid"+i+"','"+name+"','"+latlon+"','"+gisid+"','"+dcpid+"','"+city+"','city_1"+i+"')\"/>"
            +"<input type=\"button\" value=\"�Լ�\" onclick=\"openWindowsZJ('end','busendid"+i+"','"+name+"','"+latlon+"','"+gisid+"','"+dcpid+"','"+city+"','city_1"+i+"')\"/>"
            +"</span></td></tr></table>";
    //if( document.getElementById("city") != null){
    //	 document.getElementById("city").value = city;
    //}else if( document.getElementById("city1") != null){
    //	 document.getElementById("city1").value = city;
    //	 document.getElementById("city2").value = city;
    //}
    if(latlon != null && show_POI != null && poi_title != null){
   		mapFrame.setPopWHInner(210,400);
    	mapFrame.showLBSPOI(latlon,"../images/lbs_1.gif","","22","34",show_POI,poi_title);
    	var now1=new Date();   
    	var a=now1.getFullYear() +"-" + now1.getMonth() +"-" + now1.getDate() +" " + now1.getHours() +":" + now1.getMinutes() +":" + now1.getSeconds() + ":" + now1.getMilliseconds();
    }
 	//mapFrame.setCenter(latlon);
  	mapFrame.drawCirclePie(latlon,100,"#FF0000");
 	//showCityPage("city");
 	parent.arrayParams = [road1,road2,name,city,latlon,lat,lon,poi_title,show_POI];
 	mapFrame.document.getElementById("locationning").innerHTML = "";
 	if(id != null){
 		document.getElementById(id).value = name;
 	}
 	mmsShowPic('xiao',286,167,1,0,subtype,latlon,lat,lon,name);
 	document.getElementById("showmap").innerHTML = "<a style=\"cursor:hand;\" onclick=\"showMap()\">��ʾ��ͼ<\a>";
 }

function checkPhoneFormat(phone)
{
	var strPhone = phone;
	var chkph = /^[+]{0,1}(\d|[|(\(\))]){1,5}[ ]?([-|*]?((\d)|[ ]|[|(\(\))]){1,32})+$/;
	if(null==chkph.exec(phone)) strPhone = "";
	return strPhone;
}

function ChangePointLatLon(strLatLon,selectid)
{
	//alert(selectid);
	g_objMapFrame.ClearMap();
	var starts = document.getElementById(selectid);
	var oldsel = starts.selectedIndex;
	starts.options[oldsel].value = strLatLon;
	starts.selectedIndex = oldsel;
	
	var startselect = document.getElementById("startselect").value;
	if(startselect == "") return;
	var endselect = document.getElementById("endselect").value;
	if(endselect == "") return;
	
	//alert(startselect);
	//alert(endselect);
	
	showMapApi(startselect,"../images/qidian.gif","","19","22");
	showMapApi(endselect,"../images/zhongdian.gif","","19","22");
	
	//g_objMapFrame.setPan();  //�ָ�ƽ��״̬
	//g_objMapFrame.setCenter( strLatLon );
}

function movePoint(selectid){

	var starts = document.getElementById(selectid);
	var oldsel = starts.selectedIndex;
	var strlatlon = starts.options[oldsel].value;
	if(strlatlon.indexOf("$d")!=-1) strlatlon = strlatlon.substring(0,strlatlon.indexOf("$d"));
	else if(strlatlon.indexOf("$g")!=-1) strlatlon = strlatlon.substring(0,strlatlon.indexOf("$g"));
	starts.selectedIndex = oldsel;
	g_objMapFrame.setCenter( strlatlon );
	g_objMapFrame.getMousePointLatLon(selectid);

}

function fullScreen(){
	window.showModalDialog("../index.jsp"+url+"&wwid=1024",window,'center:yes;resizable:no;status:no;dialogHeight:768px;dialogWidth:1024px;dialogLeft:0;dialogTop:0;help:no');
}
var cicallcode = "";
//д��־���Ĳ���
function getLogUrl(idvalue){
	cicallcode = "";
	cicallcode = sarchCityByCode(cityNumber)[2];
	if(idvalue=="undefined" || idvalue==null || idvalue=="") idvalue = id;
	var logUrl = "&CCID="+cityNumber+"&TELNO="+tel+"&SERIALNO="+serialno
 				+"&GLOBALID="+globalid+"&USERNAME="+username+"&id="+idvalue+"&AGENTNO="+AGENTNO+"&oldocxcode="+oldocxcode+"&cicallcode="+cicallcode;
	return logUrl;
}

//�������߲�ѯд��־���Ĳ���
function getLineLogUrl(idvalue){
	if(idvalue=="undefined" || idvalue==null || idvalue=="") idvalue = id;
	var logUrl = "&CCID="+cityNumber+"&TELNO="+tel+"&SERIALNO="+serialno
 				+"&GLOBALID="+globalid+"&USERNAME="+username+"&id="+idvalue+"&AGENTNO="+AGENTNO+"&oldocxcode="+oldocxcode;
 	return logUrl;
}

//��ͼ��Сͼ
function showbigmap(url){
	var displays =  parent.document.getElementById("infoframe").style.display;
	var src = "";
	var widths = "";
	var lefts = "";
	var mapw = null;
	if(displays=="block"){
		displays = "none";
		widths = "750";
		src = url+"/common/leftimg.jsp";
		lefts = "751";
		mapw = 750;
	}else{
		displays = "block";
		widths = "515";
		src = url+"/common/rightimg.jsp";
		lefts = "516";
		mapw = 515;
	}
	parent.document.getElementById("infoframe").style.display = displays;
	parent.document.getElementById("mapFrame").style.width = widths;
	parent.document.getElementById("rightImg").style.left = lefts;
	parent.document.getElementById("rightImg").src = src;
	parent.document.getElementById("mapFrame").contentWindow.setMapSize(mapw,400);
}

function get_convert(dist){
	var backdist = ''+dist/1000;
	var enid = 0;
	var str = "";
	if(backdist.indexOf(".")!=-1){
		if(backdist.substring(backdist.indexOf("."),backdist.indexOf(".")+1) == '0') enid = backdist.indexOf(".");
		else enid = backdist.indexOf(".")+2;
		str = backdist.substring(0,enid);
		if(str == "0") str = backdist.substring(0,backdist.indexOf(".")+2);
	}else
		str = backdist
	return str;
}

function get_ditie(city){
	var city_ditie = new Array();
	city_ditie = [
	["������"],["�Ϻ���"],["�����"],["������"],["������"],
	["�Ͼ���"],["�ɶ���"],["������"],["������"],["��ɽ��"],
	["�人��"],["������"],["������"],["�����"],["������"]
	//["250","�Ͼ���"]
	];
	var flog = false;
	for(var i=0;i<city_ditie.length;i++){
		if(city==city_ditie[i][0]){
			flog = true;
			break;
		}
	}
	return flog;
}
function get_amalgamation(ccid){
	var ifamalgamation = false;
	if(ccid == "571"){
		ifamalgamation = true;
	}
	return ifamalgamation;
}
function bus_l_s(type,city){
	var locurl=window.parent.location.search;
	var paras = "";
	if (locurl.indexOf("?") != -1) {
		paras = locurl;
	}
	
	var tel = Request['tel'];
	if(type=="bus")
		window.location.href = "bus.jsp"+ paras + "&nowCity="+city;//?tel="+tel+"&nowCity="+city;
	if(type=="line")
		window.location.href = "busline.jsp"+ paras + "&nowCity="+city;  //?tel="+tel+"&nowCity="+city;
	if(type=="station")
		window.location.href = "busstation.jsp"+ paras + "&nowCity="+city;//?tel="+tel+"&nowCity="+city;
}

//����
window.onload = function suggest(){
	json_suggest="<%=citySuggest%>";
	mapbarInputSuggest.bind(json_suggest);
}

//ȥ����β�ո�
function   trim(s)   {   
      var   i;   
      for   (i   =   0;   i   <   s.length   &&   s.charCodeAt(i)   ==   32;   i   ++);   
      s   =   s.substring(i,   s.length);   
      for   (i   =   s.length   -   1;   i   >=   0   &&   s.charCodeAt(i)   ==   32;   i--);   
      s   =   s.substring(0,   i   +   1);   
      return   s;   
 } 
 
 //�ж��������Ƿ��пո�
function kongge(v){ 
	var bl = false;
	var str = v.replace(/\s/g,""); 
	for(var i=0;i<str.length;i++){ 
		var c = str.replace(" ","").charAt(i); 
		if((c<"a"||c>"z")&&(c<"A"||c>"Z")){
			bl = true;  //�к���
			break;
		}
	} 
	if(bl){  //���bl=true �к���
		var reg=/^\s+|\s+/g;   
		if(reg.test(v)) return false;
		else return true;  
	}else{
		return true;  
	}
} 


//ajax
function newXMLHttpRequest() {
	var xmlreq = false;
	if (window.XMLHttpRequest) {
		xmlreq = new XMLHttpRequest();
	} else {
		if (window.ActiveXObject) {
			try {
				xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e1) {
				try {
					xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch (e2) {}
			}
		}
	}
	return xmlreq;
}

//����xml
function getXmlDoc(xml){
	var xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc.async=false;
	xmlDoc.loadXML(xml);
	//alert(xml);
	//alert(xmlDoc.getElementsByTagName("status"));
	return xmlDoc;
}

//�ܱ���Ϣ����
function xq(xqBz,latlon,length,lat,lon){
	//g_objMapFrame.leibie_poi(true);
	parent.leibie_latlon = latlon;
	var nIndex = 0;
	for(var i=0;i<length;i++){
		//alert(matchlevelArray[i])
		var bz = i+1;
		if(xqBz == "xq"+i){
			nIndex = i;
			document.getElementById("xqid"+i).className="z_red"; 
			document.getElementById("xq"+i).style.display="block";
			document.getElementById("xqxm"+i).style.display="block";
			if(document.getElementById("address_"+i)!=null) document.getElementById("address_"+i).style.display="none";
			if(latlonArray != null){
				if(latlonArray[i].length >= 13){//��γ�Ȳ�Ϊ��
					if(matchlevelArray[i] == 'true'){
						document.getElementById("imgid"+i).src="../../images/tb"+bz+".gif";
					}else if(matchlevelArray[i] == 'false'){
						document.getElementById("imgid"+i).src="../../images/tbf"+bz+".gif";
					}else if(matchlevelArray[i] != 'gis' && cityNumber=='571'){
						document.getElementById("imgid"+i).src="../../images/tbg"+bz+".gif";
					}else{
						document.getElementById("imgid"+i).src="../../images/tb"+bz+".gif";
					}
				}else{
					document.getElementById("imgid"+i).src="../../images/tby0"+bz+".gif";
				}
			}	
		}
		else{
			document.getElementById("xqid"+i).className="";
			document.getElementById("xq"+i).style.display="none";
			document.getElementById("xqxm"+i).style.display="none";
			if(document.getElementById("address_"+i)!=null)	document.getElementById("address_"+i).style.display="block";
			if(latlonArray != null){
				if(latlonArray[i].length >= 13){//��γ�Ȳ�Ϊ��
					if(matchlevelArray[i] == 'true'){
						document.getElementById("imgid"+i).src="../../images/tb0"+bz+".gif";
					}else if(matchlevelArray[i] == 'false'){
						document.getElementById("imgid"+i).src="../../images/tbf0"+bz+".gif";
					}else if(matchlevelArray[i] != 'gis' && cityNumber=='571'){
						document.getElementById("imgid"+i).src="../../images/tbg0"+bz+".gif";
					}else{
						document.getElementById("imgid"+i).src="../../images/tb0"+bz+".gif";
					}
				}else{
					document.getElementById("imgid"+i).src="../../images/tby0"+bz+".gif";
				}
			}
		}
	}
	if(latlon.length>=13){//��γ�Ȳ�Ϊ��
		g_objMapFrame.setCenter(latlon);
		g_objMapFrame.upMarks(nIndex);
	}
	getDcpid(lat,lon,0);
}
function showCardContent(xx,dcpid){
//	document.getElementsByName("ucard")[xx].title="��ҵ��Ƭ���ܲ�����";
//	var str = "\u676d\u5dde\u4ec1\u5fb7\u5987\u4ea7\u533b\u9662\u662f\u4e00\u5bb6\u7ecf\u536b\u751f\u90e8\u95e8\u7ba1\u8f96\uff0c\u56fd\u5bb6\u8ba4\u8bc1\u54c1\u724c\u7684\u5987\u4ea7\u79d1\u533b\u9662\uff0c\u5750\u843d\u4e8e\u4ea4\u901a\u4fbf\u6377\u7684\u62f1\u5885\u533a\u5927\u5173\u8def303\u53f7\uff0c\u662f\u676d\u5dde\u5e02\u533b\u4fdd\u5b9a\u70b9\u533b\u9662\uff0c\u5e02\u751f\u80b2\u4fdd\u9669\u5b9a\u70b9\u533b\u7597\u673a\u6784\u3002";
//	var cardcontent = unescape(str.replace(/\\u/gi, '%u'));
	var params = "gotype=searchCard"+"&dcpid="+dcpid;
	var req = newXMLHttpRequest();
	var cardurl = mps_ecard + "dcp_id="+dcpid;
	var req = newXMLHttpRequest();
	req.onreadystatechange = getcardXML(req,xx);
	req.open("POST", parent.url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}
function getcardXML(req,xx) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				//alert('hahah');
				var test = req.responseText;
					if(test == "�޽����Ϣ"){
						document.getElementById("ucard"+xx).title="��ҵ��Ƭ������ҵ����ҵ��Ƭ";
						return;
					}
    				document.getElementById("ucard"+xx).title="��ҵ��Ƭ��"+test;

			} else {
				document.getElementById("ucard"+xx).title="����ҵ��Ƭ";
				//alert("�޽����Ϣ")
			}
		}
	};
}
 

//�����
function getDcpid(lat,lon,type){
	var url = "/gis/servlet/goservlet";
	var params = "";
	if(type==0){
		params = "gotype=PLACEZB&lat="+lat+"&lon="+lon+"&lltype=0";
	}
	else{
		params = "gotype=PLACEZB&lat="+lat+"&lltype=1";
	}
	var req = newXMLHttpRequest();
 	req.onreadystatechange = get_Dcpid(req);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}

function get_Dcpid(req){
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var test = req.responseText;
    			parseDCPID(test);
			} else {
				alert("�޽����Ϣ")
			}
		}
	};
}
function parseDCPID(test){
	var xmlDoc = getXmlDoc(test);
	var province = "";
	if(test == "" || xmlDoc.getElementsByTagName("province")[0] == null){
		return ;
	}
	if(xmlDoc.getElementsByTagName("province")[0].firstChild!=null){
		province = xmlDoc.getElementsByTagName("province")[0].firstChild.nodeValue; 
	}
	var city = "";
	if(xmlDoc.getElementsByTagName("city")[0].firstChild!=null){
		city = xmlDoc.getElementsByTagName("city")[0].firstChild.nodeValue; 
	}
	var dist = "";
	if(xmlDoc.getElementsByTagName("dist")[0].firstChild!=null){
		dist = xmlDoc.getElementsByTagName("dist")[0].firstChild.nodeValue; 
	}
	var info = ""
	//if(province!="") info = info + province+" > ";
	if(city!="") info = info + city+" > ";
	if(city!="") info = info + dist;
	g_objMapFrame.getDcpid(info);
}


function getMps(cityId){
	var url = "/gis/servlet/goservlet";
	var params = "gotype=MPS&cityId="+cityId;
	var req = newXMLHttpRequest();
 	req.onreadystatechange = get_Mps(req);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}

function get_Mps(req){
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var test = req.responseText;
    			parseMps(test);
			} else {
				alert("�޽����Ϣ")
			}
		}
	};
}
function parseMps(test){
	
}




//�㽭·���¹�����Ϣ����
function roadxq(xqBz,latlon,length){
	//g_objMapFrame.leibie_poi(true);
	parent.leibie_latlon = latlon;
	var nIndex = 0;
	for(var i=0;i<length;i++){
		var bz = i+1;
		if(xqBz == "roadxq"+i){
			nIndex = i;
			document.getElementById("roadxqid"+i).className="z_red";
			document.getElementById("roadxq"+i).style.display="block";
			//document.getElementById("roadxqxm"+i).style.display="block";
			document.getElementById("imgid"+i).src="../../images/tb"+bz+".gif";
		}
		else{
			document.getElementById("roadxqid"+i).className="";
			document.getElementById("roadxq"+i).style.display="none";
			//document.getElementById("roadxqxm"+i).style.display="none";
			document.getElementById("imgid"+i).src="../../images/tb0"+bz+".gif";
		}
	}
	g_objMapFrame.setCenter(latlon);
	g_objMapFrame.upMarks(nIndex);
}

//�㽭·��·������Ϣ����
function r_roadxq(xqBz,latlon,length){
	//g_objMapFrame.leibie_poi(true);
	parent.leibie_latlon = latlon;
	var nIndex = 0;
	for(var i=0;i<length;i++){
		var bz = i+1;
		if(xqBz == "r_roadxq"+i){
			nIndex = i;
			document.getElementById("r_roadxqid"+i).className="z_red";
			document.getElementById("r_roadxq"+i).style.display="block";
			//document.getElementById("roadxqxm"+i).style.display="block";
			document.getElementById("r_imgid"+i).src="../../images/tb"+bz+".gif";
		}
		else{
			document.getElementById("r_roadxqid"+i).className="";
			document.getElementById("r_roadxq"+i).style.display="none";
			//document.getElementById("r_roadxqxm"+i).style.display="none";
			document.getElementById("r_imgid"+i).src="../../images/tb0"+bz+".gif";
		}
	}
	g_objMapFrame.setCenter(latlon);
	g_objMapFrame.upMarks(nIndex);
}

//�㽭·��������Ϣ����
function o_roadxq(xqBz,latlon,length){
	//g_objMapFrame.leibie_poi(true);
	parent.leibie_latlon = latlon;
	var nIndex = 0;
	for(var i=0;i<length;i++){
		var bz = i+1;
		if(xqBz == "o_roadxq"+i){
			nIndex = i;
			document.getElementById("o_roadxqid"+i).className="z_red";
			document.getElementById("o_roadxq"+i).style.display="block";
			//document.getElementById("roadxqxm"+i).style.display="block";
			document.getElementById("o_imgid"+i).src="../../images/tb"+bz+".gif";
		}
		else{
			document.getElementById("o_roadxqid"+i).className="";
			document.getElementById("o_roadxq"+i).style.display="none";
			//document.getElementById("o_roadxqxm"+i).style.display="none";
			document.getElementById("o_imgid"+i).src="../../images/tb0"+bz+".gif";
		}
	}
	g_objMapFrame.setCenter(latlon);
	g_objMapFrame.upMarks(nIndex);
}

function busclass(length,xqBz,scale,latloncenter,latlonstart,latlonend,linelatlon,itemXb,start_,end_,satrlatlon,endlatlon,city){
	for(var i=0;i<length;i++){
		if(xqBz == "lineid_"+i){
			document.getElementById("linnameid_"+i).className="wz";
			document.getElementById("hcid_"+i).className="z_red";
			document.getElementById("qcid_"+i).className="z_red";
			document.getElementById("bgcl_"+i).bgColor="#f1f1f1";
			document.getElementById("lineid_"+i).style.display="block";
		}else{
			document.getElementById("linnameid_"+i).className="";
			document.getElementById("hcid_"+i).className="";
			document.getElementById("qcid_"+i).className="z_gray";
			document.getElementById("bgcl_"+i).bgColor="white";
			document.getElementById("lineid_"+i).style.display="none";
		}
	}
	g_objMapFrame.ClearMap();
	var LatLonSE = "";
	var LatLonSEvalue
	buslinevalues = bslinesz[itemXb];
	latlonone = latlonensz[itemXb];
	
	for(var z=0;z<buslinevalues.length;z++){
		var titleinfo = "";
		if(z==0) {	
			titleinfo = "<table><tr><td>"+arKeyPointFull[itemXb][0][0]+arKeyPointFull[itemXb][1][0]+"<tr><td></table>";
			g_objMapFrame.addPOI(latlonstart,"../images/qidian.gif","","19","22",titleinfo);
		}else {
			LatLonSE = buslinevalues[z].getElementsByTagName("LatLonS")[0].firstChild.nodeValue;
			LatLonSEvalue = latlonone[LatLonSE];
			titleinfo = "<table><tr><td>"+arKeyPointFull[itemXb][z][0]+arKeyPointFull[itemXb][z+1][0]+"<tr><td></table>";
			showMapApi(LatLonSEvalue,"../images/transpoint.gif","","18","18",titleinfo);
		}
		if(z==buslinevalues.length-1){
			titleinfo = "<table><tr><td>"+arKeyPointFull[itemXb][arKeyPointFull[itemXb].length-1][0]+"<tr><td></table>";
			g_objMapFrame.addPOI(latlonend,"../images/zhongdian.gif","","19","22",titleinfo);
		}
	}
	var color = "blue";
	//mapfootline(start_+","+latlonstart,color,satrlatlon,city);
	mapfootline(satrlatlon,color,satrlatlon,city);
	//mapfootline(latlonend+","+end_,color,endlatlon,city);
	mapfootline(endlatlon,color,endlatlon,city);
	g_objMapFrame.addPOI(start_,"../images/arrive.gif","","22","34",trim("������"));
	g_objMapFrame.addPOI(end_,"../images/arrive.gif","","22","34",trim("Ŀ�ĵ�"));
	mapline(scale,latloncenter,latlonstart,latlonend,linelatlon);
}

function busclassW(length,xqBz,scale,latloncenter,latlonstart,latlonend,linelatlon,itemXb,start_,end_,satrlatlon,endlatlon,startPoi,endPoi,page,line_name,ifdraw){
	for(var i=0;i<length;i++){
		if(page == 1 && i != 4){
		if(xqBz == "lineid_"+i){
			document.getElementById("linnameid_"+i).className="wz";
			document.getElementById("hcid_"+i).className="z_red";
			document.getElementById("qcid_"+i).className="z_red";
			document.getElementById("bgcl_"+i).bgColor="#f1f1f1";
			document.getElementById("lineid_"+i).style.display="block";
		}else{
			document.getElementById("linnameid_"+i).className="";
			document.getElementById("hcid_"+i).className="";
			document.getElementById("qcid_"+i).className="z_gray";
			document.getElementById("bgcl_"+i).bgColor="white";
			document.getElementById("lineid_"+i).style.display="none";
		}
		}
		if(page == 1){
			if(document.getElementById("taxiid") != null){
				document.getElementById("taxiid").style.display="none";
			}
		}else{
			if(xqBz == "lineid_"+i){
			document.getElementById("linnameid_"+i).className="wz";
			document.getElementById("hcid_"+i).className="z_red";
			document.getElementById("qcid_"+i).className="z_red";
			document.getElementById("bgcl_"+i).bgColor="#f1f1f1";
			document.getElementById("lineid_"+i).style.display="block";
		}else{
			document.getElementById("linnameid_"+i).className="";
			document.getElementById("hcid_"+i).className="";
			document.getElementById("qcid_"+i).className="z_gray";
			document.getElementById("bgcl_"+i).bgColor="white";
			document.getElementById("lineid_"+i).style.display="none";
		}
		}
	}
	g_objMapFrame.ClearMap();
	mapline(scale,latloncenter,latlonstart,latlonend,linelatlon);
	
	//��ʼ������·����
	if(ifdraw == "yes"){
		mapline(scale,centerCode,latlonFromZ[0],latlonFromZ[latlonFromZ.length-1],latlonFrom,arKeyPoint);
	}
	g_objMapFrame.poilatlon(latlonFromZ[0],"../images/arrive.gif","22","34","start",nameF,show_POI);
	g_objMapFrame.poilatlon(latlonFromZ[0],"../images/qidian.gif","19","22","start","<strong>"+nameF+"</strong>",show_POI);
				
	//�ӹ�����·����
	 g_objMapFrame.addPOI(latlonFromZ[0],"../images/yuan.jpg",lineFrom,"7","7");  
	 var bh = 0;
	 g_objMapFrame.addEventBus(bh);
	
	var LatLonSE = "";
	var LatLonSEvalue
	buslinevalues = bslinesz[itemXb];
	latlonone = latlonensz[itemXb];
	var startDesc = "";
	var endDesc = "";
	for(var z=0;z<buslinevalues.length;z++){
		var titleinfo = "";
		if(z==0) {	
		//	startDesc = "<table><tr><td>"+arKeyPointFull[itemXb][0][0]+arKeyPointFull[itemXb][1][0]+"<tr><td></table>";
		//	g_objMapFrame.addPOI(latlonstart,"../images/qidian.gif","","19","22",titleinfo);
		//	g_objMapFrame.poilatlon(latlonstart,"../images/qidian.gif","19","22","start");
			startDesc = arKeyPointFull[itemXb][z][0] + arKeyPointFull[itemXb][z+1][0];
			var busName = "";
			var bus_name = "";
			if(buslinevalues[z].getElementsByTagName("linename")[0].firstChild != null){
				busName = buslinevalues[z].getElementsByTagName("linename")[0].firstChild.nodeValue;
			}
					if(busName.substring(0,busName.indexOf("(")).indexOf("·")!=-1){
				   		bus_name = busName.substring(0,busName.indexOf("·")+1);
				   	}
				   	else if(busName.substring(0,busName.indexOf("(")).indexOf("��")!=-1){
				   		bus_name = busName.substring(0,busName.indexOf("��")+1);
				   	}
				   	else if(busName.substring(0,busName.indexOf("(")).indexOf("ʿ")!=-1){
				   		bus_name = busName.substring(0,busName.indexOf("ʿ")+1);
				   	}
				   	else if(busName.substring(0,busName.indexOf("(")).indexOf("����")!=-1){
				   		bus_name = busName.substring(0,busName.indexOf("����")+2);
				   	}
				   	else if(busName.substring(0,busName.indexOf("(")).indexOf("����")!=-1){
				   		bus_name = busName.substring(0,busName.indexOf("����")+2);
				   	}else{
				   		if(busName.indexOf("(") != -1){
				   			bus_name = busName.substring(0,busName.indexOf("("));
				   		}else{
				   			bus_name = busName;
				   		}
				   	}
			//�ӹ�����·����
			g_objMapFrame.addPOI(latlonone[0],"../images/yuan.jpg",bus_name,"7","7");  
			var bh = 1;
			g_objMapFrame.addEventBus(bh);
		}else {
			var linestart = "";
			if(buslinevalues[z].getElementsByTagName('linestart')[0].firstChild!=null)
				linestart = buslinevalues[z].getElementsByTagName('linestart')[0].firstChild.nodeValue;
			LatLonSE = buslinevalues[z].getElementsByTagName("LatLonS")[0].firstChild.nodeValue;
			LatLonSEvalue = latlonone[LatLonSE];
			
			var poi_title = "<strong>"+linestart+"</strong>";
		//	titleinfo = "<table><tr><td>"+arKeyPointFull[itemXb][z][0]+arKeyPointFull[itemXb][z+1][0]+"<tr><td></table>";
			titleinfo = "<table><tr><td>"+arKeyPointFull[itemXb][z+1][0].substring(7,arKeyPointFull[itemXb][z+1][0].length)+"<tr><td></table>";
			var latlon = LatLonSEvalue;
			var getcity = parent.cityreq;
			var gisid = "";
			var dcpid = "";
			var show_POI = "<table>"
	    	+ "<tr><td>"+titleinfo+"</td></tr>"
			+ "<tr><td>�ڸ�������"
		    +"<span id=\"cz_"+i+"\" style=\"display:block\">"
			+"<input type=\"text\" id=\"poitextfield"+i+"\" />"
			+"<input type=\"button\" value=\"����\" onclick=\"openWindowsZB('poitextfield"+i+"','"+name+"','"+latlon+"','"+getcity+"','"+gisid+"','"+dcpid+"')\"/>"
			+"<div id='show_leibie"+i+"'>"+showLaiBiePage2('window_value',latlon,i)+"</div>"
			//   +"<div id='show_leibie0'>"+showLaiBiePage2('window_value',latlon,'0')+"</div>"
			+"</span>"
			+"</span></td></tr></table>";		
			showMapApi(LatLonSEvalue,"../images/transpoint.gif","","18","18",trim(show_POI),poi_title);
			
			var busName = "";
			var bus_name = "";
			if(buslinevalues[z].getElementsByTagName("linename")[0].firstChild != null){
				busName = buslinevalues[z].getElementsByTagName("linename")[0].firstChild.nodeValue;
			}
					if(busName.substring(0,busName.indexOf("(")).indexOf("·")!=-1){
				   		bus_name = busName.substring(0,busName.indexOf("·")+1);
				   	}
				   	else if(busName.substring(0,busName.indexOf("(")).indexOf("��")!=-1){
				   		bus_name = busName.substring(0,busName.indexOf("��")+1);
				   	}
				   	else if(busName.substring(0,busName.indexOf("(")).indexOf("ʿ")!=-1){
				   		bus_name = busName.substring(0,busName.indexOf("ʿ")+1);
				   	}
				   	else if(busName.substring(0,busName.indexOf("(")).indexOf("����")!=-1){
				   		bus_name = busName.substring(0,busName.indexOf("����")+2);
				   	}
				   	else if(busName.substring(0,busName.indexOf("(")).indexOf("����")!=-1){
				   		bus_name = busName.substring(0,busName.indexOf("����")+2);
				   	}else{
				   		if(busName.indexOf("(") != -1){
				   			bus_name = busName.substring(0,busName.indexOf("("));
				   		}else{
				   			bus_name = busName;
				   		}
				   	}
			//�ӹ�����·����
			g_objMapFrame.addPOI(LatLonSEvalue,"../images/yuan.jpg",bus_name,"7","7");  
			var bh = z*2+1;
			g_objMapFrame.addEventBus(bh);
		}
		if(z==buslinevalues.length-1){
			endDesc = "����";
			titleinfo = "<table><tr><td>"+arKeyPointFull[itemXb][arKeyPointFull[itemXb].length-1][0]+"<tr><td></table>";
		//	g_objMapFrame.addPOI(latlonend,"../images/zhongdian.gif","","19","22",titleinfo);
		//	g_objMapFrame.poilatlon(latlonend,"../images/zhongdian.gif","19","22","end");
			g_objMapFrame.addPOI(latlonend,"../images/arrive.gif","","19","22");
		}
	}
	var color = "blue";
	mapfootline(start_+","+latlonstart,color,satrlatlon);
	mapfootline(latlonend+","+end_,color,endlatlon);
	
	//�������html			
			poi_title = "<strong>"+startPoi+"</strong>";
			latlon = start_;
			getcity = parent.cityreq;
			gisid = "";
			dcpid = "";
			show_POI = "<table>"
				+ "<tr><td>"+startDesc+"</td></tr>"
				+ "<tr><td>�ڸ�������"
		        +"<span id=\"cz_"+i+"\" style=\"display:block\">"
				+"<input type=\"text\" id=\"poitextfield"+i+"\" />"
				+"<input type=\"button\" value=\"����\" onclick=\"openWindowsZB('poitextfield"+i+"','"+name+"','"+latlon+"','"+getcity+"','"+gisid+"','"+dcpid+"')\"/>"
				+"<div id='show_leibie"+i+"'>"+showLaiBiePage2('window_value',latlon,i)+"</div>"
				 //   +"<div id='show_leibie0'>"+showLaiBiePage2('window_value',latlon,'0')+"</div>"
				+"</span>"
			    +"</span></td></tr></table>";
			//showMapApi(start_,"../images/qidian.gif","","19","22",trim(show_POI),poi_title);
		//	g_objMapFrame.poilatlon(latlonFromZ[0],"../images/arrive.gif","22","34","start",poi_title,show_POI);
		//	g_objMapFrame.poilatlon(latlonFromZ[0],"../images/qidian.gif","19","22","start",poi_title,show_POI);
			showMapApi(latlonencodesz[0],"../images/transpoint.gif","","18","18",trim(show_POI),poi_title);
	
			//�յ�����html			
			poi_title = "<strong>"+endPoi+"</strong>";
			latlon = end_;
			getcity = parent.cityreq;
			gisid = "";
			dcpid = "";
			show_POI = "<table>"
				+ "<tr><td>"+endDesc+"</td></tr>"
				+ "<tr><td>�ڸ�������"
		        +"<span id=\"cz_"+i+"\" style=\"display:block\">"
				+"<input type=\"text\" id=\"poitextfield"+i+"\" />"
				+"<input type=\"button\" value=\"����\" onclick=\"openWindowsZB('poitextfield"+i+"','"+name+"','"+latlon+"','"+getcity+"','"+gisid+"','"+dcpid+"')\"/>"
				+"<div id='show_leibie"+i+"'>"+showLaiBiePage2('window_value',latlon,i)+"</div>"
				 //   +"<div id='show_leibie0'>"+showLaiBiePage2('window_value',latlon,'0')+"</div>"
				+"</span>"
			    +"</span></td></tr></table>";
			//showMapApi(end_,"../images/zhongdian.gif","","19","22",trim(show_POI),poi_title);			
			//g_objMapFrame.addPOI(end_,"../images/arrive.gif","","22","34",trim("Ŀ�ĵ�"));
			g_objMapFrame.poilatlon(end_,"../images/zhongdian.gif","19","22","end",poi_title,show_POI);
}

function driveclass(scale,centerlatlonencode,startLL,endLL,latlonencode,streetLatLon,flog){
	//g_objMapFrame.ClearMap();
	//mapline(scale,centerlatlonencode,startLL,endLL,latlonencode);
	//g_objMapFrame.addPOI(startLL,"../images/qidian.gif","","19","22");
	//g_objMapFrame.addPOI(endLL,"../images/zhongdian.gif","","19","22");
	//for(var i=0;i<transpointList.length;i++){
	//	g_objMapFrame.addPOI(transpointList[i].split(",")[0],"../images/transpoint.gif","","18","18","<table><tr><td>"+transpointList[i].split(",")[1]+"</table></tr></td>");
	//}
//	var color = "green";
	if(streetLatLon=="") return;
	g_objMapFrame.ClearMap();
	var color = ["#26E34D","#842EA0","#7986FB"];
	g_objMapFrame.drawLineNoArrow1(streetLatLon,color[0]);
	mapline(scale,centerlatlonencode,startLL,endLL,latlonencode);
	g_objMapFrame.poilatlon(startLL,"../images/qidian.gif","19","22","start");
	g_objMapFrame.poilatlon(endLL,"../images/zhongdian.gif","19","22","end");		

	g_objMapFrame.setCenter(streetLatLon.split(",")[0]);
	var arInfo = new Array();
	arInfo = g_objMapFrame.calcCenterPointAndFixScaleLN(streetLatLon);
	g_objMapFrame.setCenter(arInfo[0]);
	g_objMapFrame.ZoomTo(arInfo[1]);
	
	
	//mapfootlineNoArrow(streetLatLon,color[0]);
}

function stationclass(length,xqBz,latloncenter,tag,strlatlon){
	g_objMapFrame.ClearMap();
	var nIndex = 0;
	for(var i=0;i<length;i++){
		if(xqBz == "stationid"+i){
			nIndex = i;
			document.getElementById("stationid"+i).style.display="block";
		}else{
			document.getElementById("stationid"+i).style.display="none";
			document.getElementById("cz_"+i).style.display="none";
		}
		var bz = i + 1;
		showMapApi(latlonArray[i],"../images/p/td"+bz+".gif","","22","34");
	}
	g_objMapFrame.upMarks(nIndex);
	g_objMapFrame.setCenter(latloncenter);
	if(tag == 2){
		if(strlatlon !=null && strlatlon!="") showMapApi(strlatlon,"../images/Current.gif","","20","27","","");
	}
}


function linclass(length,xqBz,scale,latloncenter,latlonstart,latlonend,linelatlon,xb,linename){
	for(var i=0;i<length;i++){
		if(xqBz == "lineid_"+i){
			document.getElementById("lineid_"+i).style.display="block";
		}else{
			document.getElementById("lineid_"+i).style.display="none";
			document.getElementById("cz"+i).style.display="none";
			document.getElementById("cfd"+i).style.display="none";
		}
	}
	g_objMapFrame.ClearMap();
	mapline(scale,latloncenter,latlonstart,latlonend,linelatlon);
	for(var k=0;k<stationAll[xb].length;k++){
		showMapApi(stationAll[xb][k].split(",")[0],"../images/yuan.gif",stationAll[xb][k].split(",")[1],"7","7");
	}
	for(var l =0;l<stationAll[xb].length;l++){
		var bh = l + 1;
		g_objMapFrame.addEvent(bh);
	}
//	if(linename.indexOf('����')!=-1){
		g_objMapFrame.addPOI(latlonstart,"../images/qidian.gif","","19","22");
		g_objMapFrame.addPOI(latlonend,"../images/zhongdian.gif","","19","22");
//	}else if(linename.indexOf('����')!=-1){
//		g_objMapFrame.addPOI(latlonstart,"../images/zhongdian.gif","","19","22");
//		g_objMapFrame.addPOI(latlonend,"../images/qidian.gif","","19","22");
//	}else{
//		g_objMapFrame.addPOI(latlonstart,"../images/zhongdian.gif","","19","22");
//		g_objMapFrame.addPOI(latlonend,"../images/qidian.gif","","19","22");
//	}
}

function linwindowclass(length,xqBz,scale,latloncenter,latlonstart,latlonend,linelatlon,xb,linename,starttime){
	routeToArray = new Array();
	routeToArray.push(linename);
	starttimeArray = new Array();
	starttimeArray.push(starttime);
	for(var i=0;i<length;i++){
		if(xqBz == "lineid_"+i){
			document.getElementById("lineid_"+i).style.display="none";
			document.getElementById("titleid"+i).className="z_red"; 
		}else{
			document.getElementById("lineid_"+i).style.display="none";
			document.getElementById("titleid"+i).className="";
		}
	}
	g_objMapFrame.ClearMap();
	mapline(scale,latloncenter,latlonstart,latlonend,linelatlon);
	for(var k=0;k<stationAll[xb].length;k++){
	//	showMapApi(stationAll[xb][k].split(",")[0],"../images/yuan.gif",stationAll[xb][k].split(",")[1],"7","7");
	}
	g_objMapFrame.addPOI(latlonstart,"../images/qidian.gif","","19","22");
	g_objMapFrame.addPOI(latlonend,"../images/zhongdian.gif","","19","22");
}

function buslineclass(start,xqBz,latlonFrom,latlonTo,end,nameFrom,nameTo,lineFrom,lineTo){
	g_objMapFrame.ClearMap();
	var length = end - start;
	var bh = null;
	for(var i = 0; i < length; i++){
		n= new Number(i) + new Number(start)
		if(xqBz == "lineid_"+i){
			document.getElementById("lineid_"+n).style.display="block";
			document.getElementById("routefrom"+n).className="z_red"; 
			document.getElementById("routeto"+n).className="z_red"; 
			document.getElementById("namefrom"+n).className="z_red"; 
			if(statusArray[i] != 'same'){
				document.getElementById("nameto"+n).className="z_red"; 
			}
		//	showMapApi(latlonTo,"../images/Current.gif","","20","27","","");
		//	showMapApi(latlonFrom,"../images/Current.gif","","20","27","","");
			
		//	g_objMapFrame.setCenter(latlonFrom);
		}else{
			document.getElementById("lineid_"+n).style.display="none";
			document.getElementById("routefrom"+n).className="none"; 
			document.getElementById("routeto"+n).className="none"; 
			document.getElementById("namefrom"+n).className="none"; 
			if(statusArray[i] != 'same'){
				document.getElementById("nameto"+n).className="none"; 
			}
		}
		var tag = null;
		tag = i + 1;
		g_objMapFrame.addPOI(transArray[i*4],"../images/yuan.gif",transArray[i*4+2],"7","7");
		g_objMapFrame.showMarkLabel2(tag*2-2);
		g_objMapFrame.addPOI(transArray[i*4+1],"../images/yuan.gif",transArray[i*4+3],"7","7");
		g_objMapFrame.showMarkLabel2(tag*2-1);
		bh = i+1;
	}
		//���ڳ����Ĺ�����·��ͼ
			mapline(busArray[0],busArray[1],busArray[2],busArray[3],busArray[4]);
			g_objMapFrame.addPOI(busArray[2],"../images/qidian.gif","","19","22");
			g_objMapFrame.addPOI(busArray[3],"../images/zhongdian.gif","","19","22");
			
			//������·��ͼ
			maplineColor(busArray_[0],busArray_[1],busArray_[2],busArray_[3],busArray_[4]);
			g_objMapFrame.addPOI(busArray_[2],"../images/qidian.gif","","19","22");
			g_objMapFrame.addPOI(busArray_[3],"../images/zhongdian.gif","","19","22");
			
			g_objMapFrame.setCenter(latlonFrom);
			//�ӹ�����·����
			g_objMapFrame.addPOI(busArray[2],"../images/yuan.jpg",lineFrom,"7","7");  
			g_objMapFrame.addEventBus(bh*2+4);
			
			//�ӹ�����·����
			g_objMapFrame.addPOI(busArray_[2],"../images/yuan.jpg",lineTo,"7","7");  
			g_objMapFrame.addEventBus(bh*2+5);
}

function r_buslineclass(start,xqBz,latlonFrom,latlonTo,end,nameFrom,nameTo,lineFrom,lineTo){
	g_objMapFrame.ClearMap();
	var length = end - start;
	var bh = null;
	for(var i = start; i < end; i++){
		n= new Number(i-start) + new Number(start)
		if(xqBz == "r_lineid_"+n){
			document.getElementById("r_lineid_"+n).style.display="block";
			document.getElementById("r_routefrom"+n).className="z_red"; 
			document.getElementById("r_routeto"+n).className="z_red"; 
			document.getElementById("r_namefrom"+n).className="z_red"; 
			if(statusArray[i-start] != 'same'){
				document.getElementById("r_nameto"+n).className="z_red"; 
			}
		//	showMapApi(latlonTo,"../images/Current.gif","","20","27","","");
		//	showMapApi(latlonFrom,"../images/Current.gif","","20","27","","");
		}else{
			document.getElementById("r_lineid_"+n).style.display="none";
			document.getElementById("r_routefrom"+n).className="none"; 
			document.getElementById("r_routeto"+n).className="none"; 
			document.getElementById("r_namefrom"+n).className="none"; 
			if(statusArray[i-start] != 'same'){
				document.getElementById("r_nameto"+n).className="none"; 
			}
		}
		var tag = null;
		tag = i-start + 1;
		g_objMapFrame.addPOI(transArray[i*4],"../images/yuan.gif",transArray[i*4+2],"7","7");
		g_objMapFrame.showMarkLabel2(tag*2-2);
		g_objMapFrame.addPOI(transArray[i*4+1],"../images/yuan.gif",transArray[i*4+3],"7","7");
		g_objMapFrame.showMarkLabel2(tag*2-1);
		bh = i+1;
	}
	//���ڳ����Ĺ�����·��ͼ
			mapline(busArray[0],busArray[1],busArray[2],busArray[3],busArray[4]);
			g_objMapFrame.addPOI(busArray[2],"../images/qidian.gif","","19","22");
			g_objMapFrame.addPOI(busArray[3],"../images/zhongdian.gif","","19","22");
			
			//������·��ͼ
			maplineColor(busArray_[0],busArray_[1],busArray_[2],busArray_[3],busArray_[4]);
			g_objMapFrame.addPOI(busArray_[2],"../images/qidian.gif","","19","22");
			g_objMapFrame.addPOI(busArray_[3],"../images/zhongdian.gif","","19","22");
			
			g_objMapFrame.setCenter(latlonFrom);
			//�ӹ�����·����
			g_objMapFrame.addPOI(busArray[2],"../images/yuan.jpg",lineFrom,"7","7");  
			g_objMapFrame.addEventBus(bh*2+4);
			
			//�ӹ�����·����
			g_objMapFrame.addPOI(busArray_[2],"../images/yuan.jpg",lineTo,"7","7");  
			g_objMapFrame.addEventBus(bh*2+5);
}

//��ʾ��
function showMapApi(latlon,icon,name,icw,ich,strtitleinfo,poi_title,isShowInfo){
//alert(latlon+"   "+strtitleinfo+"   "+poi_title)
//alert(latlon + "   " + icon+ "   " + name+ "   " + poi_title+  "   " + strtitleinfo);
	g_objMapFrame.addPOI(latlon,icon,name,icw,ich,strtitleinfo,poi_title,isShowInfo);
}

//����
function mapline(scale,latloncenter,latlonstart,latlonend,linelatlon){
	//g_objMapFrame.ClearMap();
    var arCC = g_objMapFrame.calcCenterPointAndFixScaleLN(linelatlon);
	if(arCC!=null)
	{
		scale = arCC[1];
		latloncenter = arCC[0];
	}
	
	g_objMapFrame.setCenter(latloncenter);
	g_objMapFrame.ZoomTo(scale);
	g_objMapFrame.drawLine(linelatlon,false);
}

//����
function busmapline(scale,latloncenter,linelatlon){
	g_objMapFrame.setCenter(latloncenter);
	g_objMapFrame.ZoomTo(scale);
	g_objMapFrame.drawLine(linelatlon,false);
}

//����
function maplineColor(scale,latloncenter,latlonstart,latlonend,linelatlon){
	//g_objMapFrame.ClearMap();
    var arCC = g_objMapFrame.calcCenterPointAndFixScaleLN(linelatlon);
	if(arCC!=null)
	{
		scale = arCC[1];
		latloncenter = arCC[0];
	}
	
	g_objMapFrame.setCenter(latloncenter);
	g_objMapFrame.ZoomTo(scale);
	g_objMapFrame.drawLineColor(linelatlon,false);
}

//���л���
function mapfootline(linelatlon,color,mapbarline,city){
	//g_objMapFrame.ClearMap();
	var linec = "";
	//if(city=='10000000' || city=='20010000' || city=='20030000' || city=='20040000' || city=='20050000' || city=='20060000' || city=='20070000' || city=='20080000' || city=='20090000' || city=='20100000' || city=='20110000'){
	//	if(mapbarline!=null && mapbarline!='undefined' && mapbarline!='') linec = mapbarline;
	//}else{
		linec = linelatlon;
	//}
	g_objMapFrame.drawLine(linec,false,'',color,1);
}

//����û��ͷ
function mapfootlineNoArrow(linelatlon,color){
	//g_objMapFrame.ClearMap();
	g_objMapFrame.drawLineNoArrow(linelatlon,false,'',color);
}

function combinSMSUrl(strTel,strContent){
	return "tel="+strTel+"&busdesc="+strContent;
}

//������·
function linSMSUrl(tel,linename,start,end,statrtime,endtime,ticket,price,kt){
	return "tel="+tel+"&linename="+linename+"&start="+start+"&end="+end+"&statrtime="+statrtime+"&endtime="+endtime+"&ticket="+ticket+"&price="+price+"&kt="+kt
}

//�������߲�ѯ
function exchangeSMSUrl(nameFrom,nameTo,routeFrom,routeTo,tel){
	return "nameFrom="+nameFrom+"&nameTo="+nameTo+"&routeFrom="+routeFrom+"&routeTo="+routeTo+"&tel="+tel;
}

function openwindow(url,name,iWidth,iHeight,isModaless)
{
//	showModalDialog(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
	if( false == isModaless)
		window.showModelessDialog(url,name,'center:yes;scroll:no;resizable:no;status:no;dialogHeight:'+iHeight+'px;dialogWidth:'+iWidth+'px;');
	else
		window.showModalDialog(url,name,'center:yes;scroll:no;resizable:no;status:no;dialogHeight:'+iHeight+'px;dialogWidth:'+iWidth+'px;');
}

//���Ź����ٸ���
function partDX(){
	var textareaLen = document.getElementById("textarea").value;
	document.getElementById("dxlength").innerHTML = textareaLen.length;
}

function goDx(){
	var tel = document.getElementById("tel").value;
	if(!isChinaMobileTel(tel)) {
		alert("��ǰ�û�Ϊ���ƶ��û����޷��·��������ݣ�");
		return;
	}
	if(document.getElementById("tel").value == ""){
		alert("�������ֻ����룡");
		return;
	}
	if(confirm('�Ƿ�ȷ������?')){
		var whetherPart = 2;
		if(document.getElementById("whetherPart").checked==true) whetherPart = 1;
		var telvalue = document.getElementById("telvalue").value;
		var textarea = document.getElementById("textarea").value;
		textarea = encodeURI(textarea);
		var gisid = null;
		var dcpid = null;
		if(document.getElementById("gisid") != null){
			gisid = document.getElementById("gisid").value;
		}
		if(document.getElementById("dcpid") != null){
			dcpid = document.getElementById("dcpid").value;
		}
		var href_valuenew = window.location.href.match(/.+\/([^?]*)/)[1];
		var url = "../../servlet/goservlet";
		var params = "";
		if(get_amalgamation(cityNumber)){
			if(href_valuenew=="dx_zb.jsp"){
				params = "gotype=DX&whetherPart="+whetherPart+"&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&startgisID="+gisid+"&startdcpID="+dcpid+"&tel="+tel+"&telvalue="+telvalue+"&textarea="+textarea+"&areaid="+areaid+"&trade_id="+trade_id+"&trade_name="+trade_name+"&threetype="+threetype+"&name="+name+getLogUrl(id);
			}else{
				params = "gotype=DX&whetherPart="+whetherPart+"&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&startgisID="+gisid+"&startdcpID="+dcpid+"&tel="+tel+"&telvalue="+telvalue+"&textarea="+textarea+getLogUrl(id);
			}
		}else{
				params = "gotype=DX&whetherPart="+whetherPart+"&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&startgisID="+gisid+"&startdcpID="+dcpid+"&tel="+tel+"&telvalue="+telvalue+"&textarea="+textarea+getLogUrl(id);
		}
		var req = newXMLHttpRequest();
		req.open("POST", url, true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send(params);
		alert('������ɣ�');
		window.close();
	}
}
function send_message(){
	var tel = document.getElementById("tel").value;
	if(!isChinaMobileTel(tel)) {
		alert("��ǰ�û�Ϊ���ƶ��û����޷��·��������ݣ�");
		return;
	}
	if(document.getElementById("tel").value == ""){
		alert("�������ֻ����룡");
		return;
	}
	if(confirm('�Ƿ�ȷ������?')){
		var whetherPart = 2;
		if(document.getElementById("whetherPart").checked==true) whetherPart = 1;
		var telvalue = document.getElementById("telvalue").value;
		var textarea = document.getElementById("textarea").innerHTML;
		var gisid = null;
		var dcpid = null;
		if(document.getElementById("gisid") != null){
			gisid = document.getElementById("gisid").value;
		}
		if(document.getElementById("dcpid") != null){
			dcpid = document.getElementById("dcpid").value;
		}
		var url = "../../servlet/goservlet";
		var params = "gotype=DX&whetherPart="+whetherPart+"&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&startgisID="+gisid+"&startdcpID="+dcpid+"&tel="+tel+"&telvalue="+telvalue+"&textarea="+textarea+"&manyMessage="+manyMessage+getLogUrl(id);
		var req = newXMLHttpRequest();
		req.open("POST", url, true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send(params);
		alert('������ɣ�');
		window.close();
	}
}
function goMessage(){
	if(document.getElementById("tel").value == ""){
		alert("�������ֻ����룡");
		return;
	}
	if(confirm('�Ƿ�ȷ������?')){
		var tel = document.getElementById("tel").value;
		var telvalue = document.getElementById("telvalue").value;
		var textarea = document.getElementById("textarea").value;
		var url = "../../servlet/goservlet";
		var params = "gotype=MSG&subtype="+subtype+"&tel="+tel+"&telvalue="+telvalue+"&textarea="+textarea+getLogUrl(id);
		var req = newXMLHttpRequest();
		req.onreadystatechange = getGoMessage(req,tel,textarea,telvalue);
		req.open("POST", url, true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send(params);
		alert('������ɣ�');
		window.close();
	}
}
//�Ż�ȯ��¼sjrhgis��־
function goyousjrhgis(url){
	var req = newXMLHttpRequest();
	var urlnew =  "../../servlet/goservlet";
	req.open("POST", urlnew, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(url);
}
//��ת��¼sjrhgis��־
function gohusjrhgis(url){
	var req = newXMLHttpRequest();
	var urlnew =  "../../servlet/goservlet";
	req.open("POST", urlnew, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(url);
}

//�ط�����
function goResendMessage(tel,params){
	if(confirm('�Ƿ�ȷ������?')){
		var url = "../../servlet/goservlet";
		var req = newXMLHttpRequest();
		req.onreadystatechange = getGoMessage(req,tel,params);
		req.open("POST", url, true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send(params);
		alert('������ɣ�');
		window.close();
	}
}

//�ط�����
function goResendMMMsg(tel,params){
	if(confirm('�Ƿ�ȷ������?')){
		var url = "../../servlet/goservlet";
		var req = newXMLHttpRequest();
		req.onreadystatechange = getGoMMMsg(req,tel,params);
		req.open("POST", url, true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send(params);
		alert('������ɣ�');
		window.close();
	}
}

function getGoMessage(req,tel,textarea,telvalue) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var text = req.responseText;
				if(text.length > 3){
					window.open('../ts/messageok.jsp?tel='+tel,"",'width=400,height=200');
				}else{
					window.open('../ts/messagefailed.jsp?tel='+tel+'&textarea='+textarea+'&telvalue='+telvalue+getLogUrl(id),"",'width=400,height=200');
				}

			} else {
				//alert("�޽����Ϣ")
			}
		}
	};
}


/***
*name�̻����� phone�̻��绰 address�̻���ַ
*prnumber��ѯ���ʡ accidtype��
*gdlx��������
*dcpid λ��:�̻�id  
*bctype �������� 1λ�ñ��� 2��������  3�Լݱ���  4������· 5����վ��
*cwbczt 1����  2����
*keywordλ�ò�ѯ����ʱ�õ� ֻlocation.jsp���ˣ�����û��
* startPoi�������,endPoi�յ�����,road1����·�ڹؼ���1,road2����·�ڹؼ���2
*/

function cwbc(name,phone,address,prnumber,accidtype,gdlx,dcpid,bctype,cwbczt,keywordvalue,startPoi,endPoi,road1,road2){
	if(cityNumber==null){
		cityNumber = Request['CCID'];
	}
	var r = sarchCityByCode(cityNumber);
	province = r[1];  //���ʡ����
	cityInt = r[2];   //����б���
	var url_ErrorOrNoInfo = "";
	if(cwbczt==1) url_ErrorOrNoInfo = "cw_bc.jsp?" ;
	if(cwbczt==2) url_ErrorOrNoInfo = "../cw_bc.jsp?" ;
	if(cwbczt==3){
		url_ErrorOrNoInfo = "cw_bc.jsp?" ;
		cwbczt=2;
	}
			url_ErrorOrNoInfo = url_ErrorOrNoInfo+"type="+gdlx //�������� 3GIS���� 4GIS����  5��������  6�Լݱ��� 
			+"&target_province_id="+prnumber //ʡid
			+"&target_city_id="+accidtype //��id
			+"&agentid="+agentno //����Ա����
			+"&user_name="+decodeURI(username)  //�û���
			+"&user_tel="+tel  //�û��绰
			+"&callin_province_id="+province  //����ʡ
			+"&callin_city_id="+cityInt  //������
			+"&businessid="+dcpid  //�̻�id
			+"&name="+name //�̻�name
			+"&address="+address //�̻���ַ
			+"&phone="+phone
			+"&cwbczt="+cwbczt
			+"&keywordvalue="+keywordvalue
			+"&bctype="+bctype
			+"&startPoi="+startPoi
			+"&endPoi="+endPoi 
			+"&road1="+road1
			+"&road2="+road2
			+getLogUrl();
//			alert(url_ErrorOrNoInfo);return;
	window.showModalDialog(url_ErrorOrNoInfo,window,"dialogWidth:525px;dialogHeight:555px;resizable:no;status:no;help:no;scroll:yes;");
}	

function baocuo(name,phone,address,citynumber,bctype,accidtype,gisid) {
	var url_ErrorOrNoInfo = "http://61.49.29.59/NoError/CallCenterInput.php";
	//var url_ErrorOrNoInfo = "http://172.16.20.196/NoError/default.php";
	var OPERTYPE = "2"; //0��Ϣ����  1����  2����
	var searchtype = "2202";    //��ѯ���� ��ͨ��ѯ
	//alert(searchtype);
	var id = "0"; 
	var infotype = "0";
	var seqid = globalid;  //����ID
	var telistcode = agentno;  //����Ա����
	var ccid = cityNumber;  //ʡ���ı���
	var accid = accidtype;   //����id
	var usernameinfo = decodeURI(username);
	var userid = tel;
	//var keyword = ""; //�ؼ���
	//var channel = ""; //Ƶ��ID
	//var tradeid = ""; //��ҵID
	//var areaid = "";  //����ID
	var bizid = "0";  //�̻�ID
	
	var bizname = name;//encodeURIComponent(name); //�̻����� 
	var bizaddress =address; //eencodeURIComponent(address); //�̻���ַ
	var bizphone = phone;//eencodeURIComponent(phone); //�̻��绰
	var url = url_ErrorOrNoInfo;
		url += "?OPERTYPE=" + OPERTYPE + "&id=" + id + "&seqid=" + seqid
			+ "&telistcode=" + telistcode + "&ccid=" + ccid + "&accid=" + accid + "&username=" + encodeURI(usernameinfo) + "$" + gisid;
		url += "&userid=" + userid + "&bizname=" + encodeURI(bizname) + "&bizaddress=" + encodeURI(bizaddress);
		url += "&bizphone=" + encodeURI(bizphone) +"&infotype=" + infotype +"&tradeid=0&areaid=0&bizid="+bizid;
		url = url + "&giserrortype="+bctype;
	window.showModalDialog(url,window,"dialogWidth:615px;dialogHeight:675px;resizable:no;status:no;help:no;scroll:no;");
	try {
		log(window.location.search, "JC0011", "", "", "", "0", "", "", "", "","", "0", "5", "0", "", "", bizid);
	} catch (e) {}
}

function chawuGO(){
	var rcharu = getSearch(city);
	chawu(rcharu[0][4],1);
}

function chawu(accidtype,bctype) {
	var url_ErrorOrNoInfo = "http://61.49.29.59/GISNoError/CallCenterInput.php";
	var OPERTYPE = "0"; //0��Ϣ����  1����  2����
	var searchtype = "2202";    //��ѯ���� ��ͨ��ѯ
	//alert(searchtype);
	
	var id = "0"; 
	var infotype = "0";
	var global_id = "";
	if(globalid!=null) global_id = globalid;
	var seqid = global_id;  //����ID
	var agen_no = "";
	if(agentno!=null) agen_no = agentno;
	var telistcode = agen_no;  //����Ա����
	var city_Number = "";
	if(cityNumber!=null) city_Number= cityNumber;
	var ccid = city_Number;  //ʡ���ı���
	var accid_type = "";
	if(accidtype!=null) accid_type= accidtype;
	var accid = accid_type;   //����id
	var usernameinfo = decodeURI(username);
	var userid = tel;
	//var keyword = ""; //�ؼ���
	//var channel = ""; //Ƶ��ID
	//var tradeid = ""; //��ҵID
	//var areaid = "";  //����ID
	//var bizid = "";  //�̻�ID
	var bizname = "";//encodeURIComponent(name); //�̻����� 
	var bizaddress = "";//encodeURIComponent(address); //�̻���ַ
	var bizphone = "";//encodeURIComponent(phone); //�̻��绰
	var url = url_ErrorOrNoInfo;
		url += "?OPERTYPE=" + OPERTYPE + "&id=" + id + "&seqid=" + seqid
			+ "&telistcode=" + telistcode + "&ccid=" + ccid + "&accid=" + accid + "&username=" + encodeURI(usernameinfo);
		url += "&userid=" + userid + "&bizname=" + bizname + "&bizaddress=" + bizaddress;
		url += "&bizphone=" + bizphone +"&infotype=" + infotype +"&tradeid=0&areaid=0&bizid=0";
	if(zjbaocuoCcid(accidtype)) url = url + "&giserrortype="+bctype;
	window.showModalDialog(url,window,"dialogWidth:615px;dialogHeight:600px;resizable:no;status:no;help:no;scroll:no;");
	try {
		log(window.location.search, "JC0011", "", "", "", "0", "", "", "", "","", "0", "5", "0", "", "", bizid);
	} catch (e) {}
}

function zjbaocuoCcid(accidtype){  //�㽭����ĳ���
	//20010000����  20020000���� 20030000����  20040000����    20050000����   20060000����   ��        ����             ��ɽ     ̨��           ��ˮ
	var zjCcid = ['20010000','20020000','20030000','20040000','20050000','20060000','20070000','20080000','20090000','20100000','20110000'];
	var bl = false;
	for(var i=0;i<zjCcid.length;i++){
		if(accidtype == zjCcid[i]){
			bl = true;
			break;
		}
	}
	return bl;
}


//��ʾ����ͼƬmmsShow('xiao',286,167,0,1);
function mmsShowPic(scale,width,height,Pointinuse,Lineinuse,subtype,latlon,lat,lon,name){
	var url = "../servlet/goservlet";
	var params = "";
	if(Pointinuse == "1")
		params = params + "gotype=MMSSHOW&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&incode="+arCode+"&scale="+scale+"&center="+latlon+"&Pointinuse="+Pointinuse+"&Lineinuse="+Lineinuse+"&lat="+lat+"&lon="+lon+"&name="+name+"&width="+width+"&height="+height+getLogUrl(id)+"&TelNum=";
	if(Lineinuse == "1")
		params = params + "gotype=MMSSHOW&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&incode="+arCode+"&scale="+scale+"&center="+latlon+"&Pointinuse="+Pointinuse+"&Lineinuse="+Lineinuse+"&latlonencode="+latlonencode+"&startendlonlat="+startendlonlat+"&name="+name+"&width="+width+"&height="+height+getLogUrl(id)+"&TelNum=";
	var req = newXMLHttpRequest();
	req.onreadystatechange = getmmsShowPic(req);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}


//��ʾ����ͼƬ
function mmsShow(scale,width,height,Pointinuse,Lineinuse){
	var url = "../../servlet/goservlet";
	var params = "";
	if(Pointinuse == "1")
		params = params + "gotype=MMSSHOW&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&incode="+arCode+"&scale="+scale+"&center="+latlon+"&Pointinuse="+Pointinuse+"&Lineinuse="+Lineinuse+"&lat="+lat+"&lon="+lon+"&name="+name+"&width="+width+"&height="+height+getLogUrl(id)+"&TelNum=";
	if(Lineinuse == "1")
		params = params + "gotype=MMSSHOW&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&incode="+arCode+"&scale="+scale+"&center="+latlon+"&Pointinuse="+Pointinuse+"&Lineinuse="+Lineinuse+"&latlonencode="+latlonencode+"&startendlonlat="+startendlonlat+"&name="+name+"&width="+width+"&height="+height+getLogUrl(id)+"&TelNum=";
	var req = newXMLHttpRequest();
	req.onreadystatechange = getmmsShow(req);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}

//��ʾ������·����ͼƬ
function mmsPointShow(scale,width,height){
	var url = "../../servlet/goservlet";
	var params = "";
	params = params + "gotype=MMSPOINTSHOW&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&incode="+arCode+"&scale="+scale+"&center="+latlonFrom+"&latlon="+latlonFrom+","+latlonTo+"&name="+nameFrom+","+nameTo+"&width="+width+"&height="+height+getLogUrl(id)+"&TelNum=";;
	var req = newXMLHttpRequest();
	req.onreadystatechange = getmmsShow(req);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}

//��ʾʵʱ·������ͼƬ
function mmmsgShow(scale,width,height,Pointinuse,Lineinuse){
	var url = "../../servlet/goservlet";
	var count = null;
	if(highwaycircle != "no"){
		count = highwaycircle.length;	
		if(count == 7){
			overheadname = highwaycircle.substring(0,count-2) + ":" + highwaycircle.substring(count-2,count);
		}
		if(count == 8){
			overheadname = highwaycircle.substring(0,count-3) + ":" + highwaycircle.substring(count-3,count);
		}
	}
	var params = "";
	params = params + "gotype=TS&subtype="+subtype+"&place="+place+"&hasPic="+hasPic+"&circletype="+circletype+"&overheadname="+overheadname+"&circle="+circle+"&name="+name+"&area="+area+"&screen="+screen+getLogUrl(id)+"&TelNum=";
	var req = newXMLHttpRequest();
	req.onreadystatechange = getmmmsgShow(req,width,height);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
	
}

function getmmmsgShow(req,width,height) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var text = req.responseText;		
				var xmlDoc = getXmlDoc(text);		
			//	var information = "";
			//	var picture = "";
			//	var list = "";
			//	var confirmation = "";
				var number = document.getElementById("number").value;
				if(xmlDoc.getElementsByTagName("confirmation")[0].firstChild != null){
					confirmation = xmlDoc.getElementsByTagName("confirmation")[0].firstChild.nodeValue; 
				}
				if(xmlDoc.getElementsByTagName("picture")[0].firstChild != null){
					picture = xmlDoc.getElementsByTagName("picture")[0].firstChild.nodeValue; 
				}	
				if(xmlDoc.getElementsByTagName("information")[0].firstChild != null){
					information = xmlDoc.getElementsByTagName("information")[0].firstChild.nodeValue; 
				}
				if(xmlDoc.getElementsByTagName("list")[0].firstChild != null){
					list = xmlDoc.getElementsByTagName("list")[0].firstChild.nodeValue; 
				}
				if(picture != null && picture != ""){
					document.getElementById("imgid").src=picture;					
				}
				//if(information.indexOf(":") == -1){
				if(information != null && information != "" && highwaycircle != "no"){
					if(informationid != "Circleinformationid"){
						var fullstop = information.split("��");
						var desc = fullstop[1].split(";");
						if(desc[0].indexOf(title2) != -1){
							information = fullstop[0] + "��" + desc[0] + "��" + fullstop[2];
						}else{
							information = fullstop[0] + "��" + desc[1] + "��" + fullstop[2];
						}
					}		
				}
			
			//	document.getElementById("imgid").width=width;
			//	document.getElementById("imgid").height=height;
				document.getElementById("textarea").value=information+" "+"����Ϣ�����ο� �й��ƶ� 12580";
				//var xmlDoc = getXmlDoc(test);
				//document.getElementById("mms").innerHTML = frames;
			//	document.getElementById("basevalue").value = test;
			//	document.getElementById("mmsframe").src = "../ammsimg.jsp";
			} else {
				//alert("�޽����Ϣ")
			}
		}
	};
}

function getmmsShow(req) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var test = req.responseText;
				//var xmlDoc = getXmlDoc(test);
				//document.getElementById("mms").innerHTML = frames;
				document.getElementById("basevalue").value = test;
				document.getElementById("mmsframe").src = "../ammsimg.jsp";
			} else {
				//alert("�޽����Ϣ")
			}
		}
	};
}

function getmmsShowPic(req) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var test = req.responseText;
				//var xmlDoc = getXmlDoc(test);
				//document.getElementById("mms").innerHTML = frames;
				document.getElementById("basevalue").value = test;
				document.getElementById("mmsframe").src = "../gis/ammsimg.jsp";
			} else {
				//alert("�޽����Ϣ")
			}
		}
	};
}

//��õ�ͼ��ַ
function mmsGO(scale,Pointinuse,Lineinuse,scaleMapbar){
	var TelNum = document.getElementById("tel").value;
	var width = 176;
	var height = 176;
	var url = "../../servlet/goservlet";
	var params = "";
	if(Pointinuse == "1")
		params = params + "gotype=MMS&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&incode="+arCode+"&scale="+scale+"&center="+latlon+"&Pointinuse="+Pointinuse+"&Lineinuse="+Lineinuse+"&lat="+lat+"&lon="+lon+"&name="+name+"&width="+width+"&height="+height+getLogUrl(id)+"&TelNum="+TelNum;
	if(Lineinuse == "1")
		params = params + "gotype=MMS&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&incode="+arCode+"&scale="+scale+"&center="+latlon+"&Pointinuse="+Pointinuse+"&Lineinuse="+Lineinuse+"&latlonencode="+latlonencode+"&startendlonlat="+startendlonlat+"&name="+name+"&width="+width+"&height="+height+getLogUrl(id)+"&TelNum="+TelNum;
	var req = newXMLHttpRequest();
	req.onreadystatechange = getmmsGO(req);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}

//��ö���ͼ��ַ
function mmsPointGO(scale,Pointinuse,Lineinuse,scaleMapbar){
	var TelNum = document.getElementById("tel").value;
	var width = 176;
	var height = 176;
	var url = "../../servlet/goservlet";
	var params = "";
	params = params + "gotype=MMSPOINT&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&incode="+arCode+"&scale="+scale+"&center="+latlonFrom+"&latlon="+latlonFrom+","+latlonTo+"&name="+nameFrom+","+nameTo+"&width="+width+"&height="+height+getLogUrl(id)+"&TelNum="+TelNum;
	var req = newXMLHttpRequest();
	req.onreadystatechange = getmmsGO(req);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}
function getmmsGO(req) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var test = req.responseText;
				var xmlDoc = getXmlDoc(test);
				var imgurl = "";
				if(xmlDoc.getElementsByTagName("imgurl")[0]!=null)
					imgurl = xmlDoc.getElementsByTagName("imgurl")[0].firstChild.nodeValue; 
				document.getElementById("mmsGO").value = imgurl;
			} else {
				//alert("�޽����Ϣ")
			}
		}
	};
}

//POI��õڶ�����ͼ��ַ
function mmsImgGO(scale,Pointinuse,Lineinuse){
	var TelNum = document.getElementById("tel").value;
	var width = 176;
	var height = 176;
	var url = "../../servlet/goservlet";
	var params = "";
	if(Pointinuse == "1")
		params = params + "gotype=MMS&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&incode="+arCode+"&scale="+scale+"&center="+latlon+"&Pointinuse="+Pointinuse+"&Lineinuse="+Lineinuse+"&lat="+lat+"&lon="+lon+"&name="+name+"&width="+width+"&height="+height+getLogUrl(id)+"&TelNum="+TelNum;
	if(Lineinuse == "1")
		params = params + "gotype=MMS&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&incode="+arCode+"&scale="+scale+"&center="+latlon+"&Pointinuse="+Pointinuse+"&Lineinuse="+Lineinuse+"&latlonencode="+latlonencode+"&startendlonlat="+startendlonlat+"&name="+name+"&width="+width+"&height="+height+getLogUrl(id)+"&TelNum="+TelNum;
	var req = newXMLHttpRequest();
	req.onreadystatechange = getmmsImgGO(req);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}
function getmmsImgGO(req) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var test = req.responseText;
				var xmlDoc = getXmlDoc(test);
				var imgurl = "";
				if(xmlDoc.getElementsByTagName("imgurl")[0]!=null)
					imgurl = xmlDoc.getElementsByTagName("imgurl")[0].firstChild.nodeValue; 
				document.getElementById("mmsImgGO").value = imgurl;
			} else {
				//alert("�޽����Ϣ")
			}
		}
	};
}

//��üӲ������յ��ͼ��ַ
function mmsStartEndImgGoNew(scale,Pointinuse,Lineinuse,scaleMapbar,startendlonlat,type,center,tag,dist){
	var TelNum = document.getElementById("tel").value;
	var width = 176;
	var height = 176;
	var url = "../../servlet/goservlet";
	var params = "";
	if(Pointinuse == "1")
		params = params + "gotype=MMS&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&incode="+arCode+"&scale="+scale+"&tag="+tag+"&center="+latlon+"&Pointinuse="+Pointinuse+"&Lineinuse="+Lineinuse+"&lat="+lat+"&lon="+lon+"&name="+name+"&width="+width+"&height="+height+getLogUrl(id)+"&TelNum="+TelNum;
	if(Lineinuse == "1")
		params = params + "gotype=MMS&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&incode="+arCode+"&scale="+scale+"&tag="+tag+"&center="+center+"&Pointinuse="+Pointinuse+"&Lineinuse="+Lineinuse+"&latlonencode="+startendlonlat+"&startendlonlat="+startendlonlat+"&name="+name+"&width="+width+"&height="+height+getLogUrl(id)+"&TelNum="+TelNum+"&dist="+dist;
	
	var req = newXMLHttpRequest();
	req.onreadystatechange = getmmsStartEndImgGO(req,type);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}

//�������յ��ͼ��ַ
function mmsStartEndImgGO(scale,type){
	var TelNum = document.getElementById("tel").value;
	var width = 176;
	var height = 176;
	var url = "../../servlet/goservlet";
	var startendlonlats = startendlonlat.split(",");
	var latlon =null;
	var picid = null;
	if(type == "start"){
		picid = "101";
		if(startendlonlats.length == 4){
			latlon = startendlonlats[1]+","+startendlonlats[0];
		}else{
			latlon = startendlonlats[0];
		}
	}
	else{
		picid = "102";
		if(startendlonlats.length == 4){
			latlon =  startendlonlats[3]+","+startendlonlats[2];;
		}else{
			latlon =  startendlonlats[1];
		}
	}
	var params = "gotype=MMS&subtype="+subtype+"&incode="+arCode+"&province="+province+"&cityInt="+cityInt+"&picid="+picid+"&scale="+scale+"&center="+latlon+"&Pointinuse=1&Lineinuse=0&lat=&lon=&name="+type+"&width="+width+"&height="+height+getLogUrl(id)+"&TelNum="+TelNum;
	var req = newXMLHttpRequest();
	req.onreadystatechange = getmmsStartEndImgGO(req,type);
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}

function getmmsStartEndImgGO(req,type) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var test = req.responseText;
				var xmlDoc = getXmlDoc(test);
				var imgurl = "";
				if(xmlDoc.getElementsByTagName("imgurl")[0]!=null)
					imgurl = xmlDoc.getElementsByTagName("imgurl")[0].firstChild.nodeValue; 
				var mmsgo = "mms"+type;
				document.getElementById(mmsgo).value = imgurl;
			} else {
				//alert("�޽����Ϣ")
			}
		}
	};
}



//���Ͳ���
function gomms() {
	if(document.getElementById("tel").value == ""){
		alert("�������ֻ����룡");
		return;
	}
	var TelNum = document.getElementById("tel").value;
	if(getfh(TelNum)){
		alert("��Ϊ�ú�������������ں����ڴ�½��һ��˫�ŵĸ����룬������ָ·����ҵ�����޷����Ͳ��ţ�ֻ�ܷ��Ͷ��ţ���ͻ��½⡣");
		window.close();
	}
	if(!isChinaMobileTel(TelNum)) {
		alert("��ǰ�û�Ϊ���ƶ��û����޷��·��������ݣ�");
		return;
	}
	if(confirm('�Ƿ�ȷ������?')){
		var telvalue = document.getElementById("telvalue").value;
		var textarea = document.getElementById("textarea").value;
		textarea = encodeURI(textarea);
		document.getElementById("fscx").innerHTML = "���ڷ��ͣ����Ժ�";
		document.getElementById("cxbutton").style.display = "none";
		var mmsurl = document.getElementById("mmsGO").value;
		var url = "../../servlet/goservlet";
		var params = "gotype=FSMMX&subtype="+subtype+"&mmsurl="+mmsurl+"&province="+province+"&cityInt="+cityInt+"&textarea="+textarea+"&TelNum="+TelNum+"&telvalue="+telvalue+getLogUrl(id);
		var req = newXMLHttpRequest();
		req.onreadystatechange = getGomms(req);
		req.open("POST", url, true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send(params);
	}
}

//����ʵʱ·������
function goMMMsg() {
	if(document.getElementById("tel").value == ""){
		alert("�������ֻ����룡");
		return;
	}
	if(confirm('�Ƿ�ȷ������?')){
		var TelNum = document.getElementById("tel").value;
		var telvalue = document.getElementById("telvalue").value;
		var textarea = document.getElementById("textarea").value;
		document.getElementById("fscx").innerHTML = "���ڷ��ͣ����Ժ�";
		document.getElementById("queren").style.display = "none";
		document.getElementById("quxiao").style.display = "none";
		var url = "../../servlet/goservlet";
		var params = "gotype=MMM&subtype="+subtype+"&picture="+picture+"&textarea="+textarea+"&TelNum="+TelNum+"&telvalue="+telvalue+getLogUrl(id);
		var req = newXMLHttpRequest();
		req.onreadystatechange = getGoMMMsg(req,tel,textarea,telvalue);
		req.open("POST", url, true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send(params);
		//alert('������ɣ�');
		//window.close();
	}
}

//POI����2��ͼ
function gommsPOI() {
	var TelNum = document.getElementById("tel").value;
	if(!isChinaMobileTel(TelNum)) {
		alert("��ǰ�û�Ϊ���ƶ��û����޷��·��������ݣ�");
		return;
	}
	if(getfh(TelNum)){
		alert("��Ϊ�ú�������������ں����ڴ�½��һ��˫�ŵĸ����룬������ָ·����ҵ�����޷����Ͳ��ţ�ֻ�ܷ��Ͷ��ţ���ͻ��½⡣");
		window.close();
	}
	if(confirm('�Ƿ�ȷ������?')){
		var TelNum = document.getElementById("tel").value;
		var telvalue = document.getElementById("telvalue").value;
		var textarea = document.getElementById("textarea").value;
		textarea = encodeURI(textarea);
		document.getElementById("fscx").innerHTML = "���ڷ��ͣ����Ժ�";
		document.getElementById("cxbutton").style.display = "none";
		var mmsurl = document.getElementById("mmsGO").value;
		var mmsImgGO = document.getElementById("mmsImgGO").value;
		var gisid = null;
		var dcpid = null;
		if(document.getElementById("gisid") != null){
			gisid = document.getElementById("gisid").value;
		}
		if(document.getElementById("dcpid") != null){
			dcpid = document.getElementById("dcpid").value;
		}
		var url = "../../servlet/goservlet";
		var href_valuenew = window.location.href.match(/.+\/([^?]*)/)[1];
		var params = "";
		if(get_amalgamation(cityNumber)){
			if(href_valuenew=="cx_zb.jsp"){
				params = "gotype=FSMMX&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&mmsurl="+mmsurl+"&mmsImgGO="+mmsImgGO+"&startgisID="+gisid+"&startdcpID="+dcpid+"&textarea="+textarea+"&TelNum="+TelNum+"&areaid="+areaid+"&trade_id="+trade_id+"&trade_name="+trade_name+"&name="+name+"&telvalue="+telvalue+getLogUrl(id);
			}else{
				params = "gotype=FSMMX&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&mmsurl="+mmsurl+"&mmsImgGO="+mmsImgGO+"&startgisID="+gisid+"&startdcpID="+dcpid+"&textarea="+textarea+"&TelNum="+TelNum+"&telvalue="+telvalue+getLogUrl(id);
			}
		}else{
				params = "gotype=FSMMX&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&mmsurl="+mmsurl+"&mmsImgGO="+mmsImgGO+"&startgisID="+gisid+"&startdcpID="+dcpid+"&textarea="+textarea+"&TelNum="+TelNum+"&telvalue="+telvalue+getLogUrl(id);
		}
//		var params = "gotype=FSMMX&subtype="+subtype+"&province="+province+"&cityInt="+cityInt+"&mmsurl="+mmsurl+"&mmsImgGO="+mmsImgGO+"&startgisID="+gisid+"&startdcpID="+dcpid+"&textarea="+textarea+"&TelNum="+TelNum+"&telvalue="+telvalue+getLogUrl(id);
		var req = newXMLHttpRequest();
		req.onreadystatechange = getGomms(req);
		req.open("POST", url, true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send(params);
	}
}

function getfh(tel){
	var bl = false;
	for(var i=0;i<fhtel.length;i++){
		if(tel>=fhtel[i][0] && tel<=fhtel[i][1]){
			bl = true;
			break;
		}
	}
	return bl;
}

//���ʹ�������յ��3��ͼ
function gommsStartEnd() {
	var TelNum = document.getElementById("tel").value;
	if(getfh(TelNum)){
		alert("��Ϊ�ú�������������ں����ڴ�½��һ��˫�ŵĸ����룬������ָ·����ҵ�����޷����Ͳ��ţ�ֻ�ܷ��Ͷ��ţ���ͻ��½⡣");
		window.close();
	}
	if(document.getElementById("tel").value == ""){
		alert("�������ֻ����룡");
		return;
	}
	if(!isChinaMobileTel(TelNum)) {
		alert("��ǰ�û�Ϊ���ƶ��û����޷��·��������ݣ�");
		return;
	}
	if(confirm('�Ƿ�ȷ������?')){
		var telvalue = document.getElementById("telvalue").value;
		var textarea = document.getElementById("textarea").value;
		textarea = encodeURI(textarea);
		document.getElementById("fscx").innerHTML = "���ڷ��ͣ����Ժ�";
		document.getElementById("cxbutton").style.display = "none";
		var mmsstart = document.getElementById("mmsstart").value;
		var mmsend = document.getElementById("mmsend").value;
		var mmsGO = document.getElementById("mmsGO").value;
		var url = "../../servlet/goservlet";
		var params = "gotype=FSMMX&subtype="+subtype+"&mmsurl="+mmsGO+"&province="+province+"&cityInt="+cityInt+"&mmsstart="+mmsstart+"&mmsend="+mmsend+"&textarea="+textarea+"&TelNum="+TelNum+"&telvalue="+telvalue+getLogUrl(id);
		var req = newXMLHttpRequest();
		req.onreadystatechange = getGomms(req);
		req.open("POST", url, true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send(params);
	}
}

function getGomms(req) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				alert('������ɣ�');
				window.close();
			} else {
				alert("���Ͳ���ʧ��")
			}
		}
	};
}

function getGoMMMsg(req,tel,textarea,telvalue) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var text = req.responseText;
				if(text.length > 3){
					//window.open('../ts/mmmsgok.jsp?tel='+tel,"",'width=400,height=200');
					document.getElementById("fscx").innerHTML = "���ͳɹ���";
				}else{
					window.open('../ts/mmmsgfailed.jsp?tel='+tel+'&textarea='+textarea+'&telvalue='+telvalue+getLogUrl(id),"",'width=400,height=200');
				}

			} else {
				alert('������ɣ�');
			}
		}
	};
}


function getSearchWaitStr()
{
	return "�����У����Ժ�";
}

function getNoResultStr(){
	return "<div id=\"noresult\"><img src=\"../../images/no.PNG\"/></div>";
}



//���������ť   ��ʾccidʡ�µ����г���
function showCityList(strID)
{
	var objList = document.getElementById(strID);
	if( null == objList ) return;//û�ж���
	var strShengCCID = Request['CCID'];
	var arInfo = getCityListByCCID(strShengCCID);
	if(null == arInfo )
	{//���ó�ƴ��ģʽ
		objList.setAttribute("isshengccid","");;
		return;
	}
	objList.setAttribute("isshengccid",strShengCCID);
	objList.focus();
	if( objList.value == arInfo[2]) objList.value =  " " + arInfo[2];
	else
		objList.value = arInfo[2];
}

//��ʾccidʡ�µ����г���
function showCityPage(strTxtID){
	var city = "";
	if(document.getElementById("city")!=null) city = document.getElementById("city").value;
	else if(document.getElementById("city1")!=null) city = document.getElementById("city1").value;
	if(document.getElementById("city2")!=null) city = document.getElementById("city2").value;
	var caa=city.substring(city.length-1,city.length);
	if(caa!=("��")&& caa!=("��")&& caa!=("��")&& caa!=("��")&& caa!=("��")){
	  if(city==("����")||city==("������")||city==("����̩")||city==("�Ͻ�")||city==("����")||city==("���˰���")||city==("����")||city==("����")||city==("����")||city==("��ʲ")||city==("��֥")||city==("����")||city==("�տ���")||city==("��ɽ")||city==("��³��")||city==("����")) { city=city+"����";}
	  else if(city==("����")){ city=city+"����Ǽ��������";}
	  else if(city==("��ɳ")||city==("����")||city==("�ֶ�")||city==("��ˮ")){ city=city+"����������";}
	  else if(city==("��ͤ")||city==("����")){ city=city+"��������������";}
	  else if(city==("��������")||city==("��������")){ city=city+"�ɹ�������";}
	  else if(city==("����")||city==("��ɽ")) { city=city+"����������";}
	  else if(city==("����")||city==("����")) { city=city+"����������";}
	  else if(city==("����")){ city=city+"����������";}
      else if(city==("�º�")){ city=city+"���徰����������";}
	  else if(city==("����")||city==("����")||city==("����")||city==("����")||city==("����")||city==("����")||city==("������")||city==("����")){ city=city+"����������";}
	  else if(city==("��ʩ")){ city=city+"����������������";}
	  else if(city==("���")){ city=city+"����������������";}
	  else if(city==("��������")){ city=city+"�¶�����������";}
	  else if(city==("ŭ��")){ city=city+"������������";}
	  else if(city==("ǭ����")||city==("ǭ����")||city==("ǭ��")){ city=city+"����������������";}
	  else if(city==("��ɽ")){ city=city+"׳������������";}
	  else if(city==("����")){ city=city+"����������������";}
	  else if(city==("�ӱ�")){ city=city+"������������";}
	  else if(city==("��˫����")){ city=city+"����������";}
	  else if(city==("����")){ city=city+"������������";}
	  else if(city==("����")||city==("����")||city==("�ٸ�")||city==("�Ͳ�")){ city=city+"��";}
	  else if(city==("������")||city==("���ֹ���")){ city=city+"��"; }
	  else if(city==("����")){city=city+"�ر�������";}
	  else { city=city+"��";}
	}
	var strShengCCID = getCCIDByCity(city);
	//strShengCCID = Request['CCID'];
	var arInfo = getCityListByCCID(strShengCCID);
	var strHTML = "";
	var aad1=0,aas1=0,aa1=0,aa2=0,aa3=0,aa4=0,aa5=0,aa6=0,aa7=0,aa8=0;
	var bb=0;
	if(arInfo!=null && arInfo.length!=0 && arInfo.length>2){
		for(var i=2;i<arInfo.length;i++){
			strHTML = strHTML + "<a class=\"all_a\" style=\"cursor:hand;text-decoration:underline\" onclick=\"putTest('"+strTxtID+"','"+arInfo[i]+"');\">"+arInfo[i]+"</a> ";
		if(i<=16){
			aad1+=arInfo[i].length;
		  }
		  if(i<=15){
			aas1+=arInfo[i].length;
		  }
		  if(i<=14){
			aa1+=arInfo[i].length;
		  }
		  if(i<=13){
			aa2+=arInfo[i].length;
		  }
		  if(i<=12){
			aa3+=arInfo[i].length;
		  }
		  if(i<=11){
			aa4+=arInfo[i].length;
		  }
		  if(i<=10){
			aa5+=arInfo[i].length;
		  }
		  if(i<=9){
			aa6+=arInfo[i].length;
		  }
		  if(i<=8){
			aa7+=arInfo[i].length;
		  }
		  if(i<=7){
			aa8+=arInfo[i].length;
		  }
		}
		if(id==1){
		 if(aa1>=37){
			bb=(aa1)*12+6*12-(aa1-aa2)*12;
			document.getElementById("aacity").style.width =bb ;
		 }
		 if(aa2>=39){
			bb=aa2*12+6*11-(aa2-aa3)*12;
			document.getElementById("aacity").style.width =bb ;
		 }
         if(aa3>=39){
			bb=aa3*12+6*10-(aa3-aa4)*12;
			document.getElementById("aacity").style.width =bb ;
		 }
         if(aa4>=40){
			bb=aa4*12+6*9-(aa4-aa5)*12;
			document.getElementById("aacity").style.width =bb ;
		 }
         if(aa5>=40){
			bb=aa5*12+6*8-(aa5-aa6)*12;
			document.getElementById("aacity").style.width =bb ;
		 }
         if(aa6>=41){
			bb=aa6*12+6*7-(aa6-aa7)*12;
			document.getElementById("aacity").style.width =bb ;
		 }
         if(aa7>=41){
			bb=aa7*12+6*6-(aa7-aa8)*12;
			document.getElementById("aacity").style.width =bb ;
		 }
       }else if(id==2||id==3||id==6){
	      if(aas1>=39){
			bb=aas1*12+6*13-(aas1-aa1)*12;
			document.getElementById("aacity2").style.width =bb ;
		 }
		 if(aa1>=39){
			bb=aa1*12+6*13;
			document.getElementById("aacity2").style.width =bb ;
		 }
         if(aa2>=40){
			bb=aa2*12+6*11-(aa2-aa3)*12;
			document.getElementById("aacity2").style.width =bb ;
		 }
         if(aa3>=40){
			bb=aa3*12+6*10-(aa3-aa4)*12;
			document.getElementById("aacity2").style.width =bb ;
		 }
         if(aa4>=41){
			bb=aa4*12+6*9-(aa4-aa5)*12;
			document.getElementById("aacity2").style.width =bb ;
		 }
         if(aa5>=41){
			bb=aa5*12+6*8-(aa5-aa6)*12;
			document.getElementById("aacity2").style.width =bb ;
		 }
         if(aa6>=42){
			bb=aa6*12+6*7-(aa6-aa7)*12;
			document.getElementById("aacity2").style.width =bb ;
		 }
       }else if(id==4){
	      if(aad1>=43){
	    	  bb=aad1*12+6*14-(aad1-aas1)*12;
	    	  document.getElementById("aacity2").style.width =bb ;
	      }
	      if(aas1>=44){
	    	    bb=aas1*12+6*13-(aas1-aa1)*12;
	    	  document.getElementById("aacity2").style.width =bb ;
	      }
	       if(aa1>=45){
	    	    bb=aa1*12+6*12-(aa1-aa2)*12;
	    	  document.getElementById("aacity2").style.width =bb ;
	      }
	      if(aa1>=45){
	    	    bb=aa2*12+6*11-(aa2-aa3)*12;
	    	  document.getElementById("aacity2").style.width =bb ;
	      }
       }else{
       		if(document.getElementById("aacity")){
    	    	document.getElementById("aacity").style.width=550;
       		}
       }
	}else{
		showLaiBiePage("index");
		return;
	}
	//alert(strHTML);
	if(document.getElementById("showcitypate")!=null)document.getElementById("showcitypate").innerHTML = strHTML;
	//document.getElementById("leibie_id").style.display = "none";
}

//��ʡ�������
function showLaiBiePage(type_show,strLatlon,type_value,lbscity)
{
	var arInfo = [["����"],["��������"],["�������"],["����"],["����"],["ҽԺ"],["����"],["��ͨ"],["�Ƶ�"]];
	//var strHTML = "<a style=\"text-decoration:underline;color:#00f;font-size:12px;\" onclick=\"showLaiBiePage();\"></a>���";
	
	var arCityList = getCityListByCCID(cityNumber);
	if(arCityList!=null)
	{	
		for(var i = 0 ; i < arCityList.length ; i ++)
		{	
			if(arCityList[i] == '571')   //|| arCityList[i] == '100'
			{
				arInfo.push("���г�");
			}
		}
	}
	
	var href_value = window.location.href.match(/.+\/([^?]*)/)[1];
	if(href_value == "location.jsp" || href_value == "surrounding.jsp" || href_value == "location_info.jsp" || href_value == "cross_info.jsp" || href_value == "lbs_info.jsp" || href_value == "road_info.jsp" ||href_value == "busstaiton_info.jsp" || href_value == "road.jsp"){
		if(type_show == "index"){
			var strHTML = "";
			for(var i=0;i<arInfo.length;i++){
				strHTML = strHTML + "<a class=\"all_a\" style=\"cursor:hand;text-decoration:underline\" onclick=\"putLeiBie('"+arInfo[i]+"','"+type_show+"','"+strLatlon+"','"+type_value+"','"+lbscity+"');\">"+arInfo[i]+"</a> ";
			}
			//document.getElementById("leibie_id").style.display = "block";
			if(document.getElementById("showcitypate")!=null)document.getElementById("showcitypate").innerHTML = strHTML;
		}
		if(type_show == "window_value")  
		{
			var strHTML = "���";
			for(var i=0;i<arInfo.length;i++){
				strHTML = strHTML + "<a class=\"all_a\" style=\"cursor:hand;text-decoration:underline\" onclick=\"putLeiBie('"+arInfo[i]+"','"+type_show+"','"+strLatlon+"','"+type_value+"','"+lbscity+"');\">"+arInfo[i]+"</a> ";
			}
			document.getElementById("show_leibie"+type_value).innerHTML = strHTML;
		}
	}else{
		if(document.getElementById("showcitypate")!=null) document.getElementById("showcitypate").innerHTML = "";
		//document.getElementById("leibie_id").style.display = "none";
	}
}


function putLeiBie(leibie,type_show,strLatlon,type_value,lbscity){
	//TODO ��ҵ���
	var leibie_info = null;
	var leibie_mapbar = null;
	var isXunQi = false;
	var arCityList = getCityListByCCID(cityNumber);
	if(arCityList!=null)
	{	
		for(var i = 0 ; i < arCityList.length ; i ++)
		{	
			if(arCityList[i] == '571')   //|| arCityList[i] == '100'
			{
				isXunQi = true;
				break;
			}
		}
	}
	if(leibie == "����"){
		if(isXunQi){
			search_poi('����',1,type_show,strLatlon,lbscity);
		}		
		else{
			search_poi('��������',1,type_show,strLatlon,lbscity);
		}	
		return;
		//leibie_info = ["����"];
		//leibie_mapbar = ["��������"];
	}
	if(leibie == "ҽԺ"){
		if(isXunQi){
			search_poi('ҽԺ',1,type_show,strLatlon,lbscity);
		}		
		else{
			search_poi('ҽ�Ʊ�������',1,type_show,strLatlon,lbscity);
		}	
		return;
		//leibie_info = ["ҽԺ"];
		//leibie_mapbar = ["ҽԺ"];
	}
	if(leibie == "���г�"){
		if(isXunQi){
			search_poi('���г����޵�',1,type_show,strLatlon,lbscity);
		}		
		else{
			search_poi('���г����޵�',1,type_show,strLatlon,lbscity);
		}	
		return;
	}
	if(leibie == "��������"){
		leibie_info = ["KTV","�ưɵϰ�","ϴԡ��Ħ","���","������","����","��������","Ӱ��Ժ","������"];
		if(isXunQi){
			leibie_mapbar = ["KTV","�ưɵϰ�","ϴԡ��Ħ","���","������","����","��������","Ӱ��Ժ","������"];
		}
		else{
			leibie_mapbar = ["KTV","�ư�|����","ϴԡ���ó���","���չ�|�����","������","����","����������","Ӱ��Ժ","�˶�����"];
		}
	}
	if(leibie == "�������"){
		leibie_info = ["��ϴ��","����ҽԺ","��Ʊ��","ҩ��","���ⷿ","�̳�","����","�����н�"];
		if(isXunQi){
			leibie_mapbar = ["��ϴ��","����ҽԺ","��Ʊ��","ҩ��","���ⷿ","�̳�","����","�����н�"];
		}
		else{
			leibie_mapbar = ["ϴ�µ�","����ҽ�Ƴ���","��Ʊ��","ҽҩ�������۵�","�����|��Ʒ��","�̳�","�����г�","�н����"];
		}
	}
	if(leibie == "����"){
		leibie_info = ["���ξ���","�����"];
		if(isXunQi){
			leibie_mapbar = ["���ξ���","�����"];
		}
		else{
			leibie_mapbar = ["�羰��ʤ","�����"];
		}
	}
	if(leibie == "����"){
		leibie_info = ["����","֤ȯ","����"];
		if(isXunQi){
			leibie_mapbar = ["����","֤ȯ","����"];
		}
		else{
			leibie_mapbar = ["����","֤ȯ��˾","���չ�˾"];
		}	
	}
	if(leibie == "����"){
		leibie_info = ["�ߵȽ���","�����еȽ���","ѧǰ����","ͼ���"];
		if(isXunQi){
			leibie_mapbar = ["�ߵȽ���","�����еȽ���","ѧǰ����","ͼ���"];
		}
		else{
			leibie_mapbar = ["�ߵ�ԺУ","��ѧ|Сѧ","�׶�԰","ͼ���"];
		}	
	}
	if(leibie == "��ͨ"){
		leibie_info = ["����","��ͷ","��վ","��;����վ","������վ","����վ","����վ","ͣ����","����ά��"];
		if(isXunQi){
			leibie_mapbar = ["����","��ͷ","��վ","��;����վ","����վ��","����վ","����վ","ͣ����","����ά��"];
		}
		else{
			leibie_mapbar = ["�ɻ���","�ۿ���ͷ","��վ","��;����վ","������վ","����վ","����վ|���ͼ���վ","ͣ����","����ά��"];
		}			
	}
	if(leibie == "�Ƶ�"){
		leibie_info = ["�Ǽ�����","���Ǽ����±���"];
		if(isXunQi){
			leibie_mapbar = ["�Ǽ�����","���Ǽ����±���"];
		}
		else{
			leibie_mapbar = ["���ݾƵ�","�ù��д���"];
		}	
	}
	
	if(type_show == "index"){
		var strHTML = "<a class=\"all_a\" style=\"cursor:hand;text-decoration:underline\" onclick=\"showLaiBiePage('"+type_show+"','"+strLatlon+"','"+type_value+"','"+lbscity+"');\"></a> "+leibie+"��";
		for(var i=0;i<leibie_info.length;i++){
			strHTML = strHTML + "<a class=\"all_a\" style=\"cursor:hand;text-decoration:underline\" onclick=\"search_poi('"+leibie_mapbar[i]+"',1,'"+type_show+"','"+strLatlon+"','"+lbscity+"')\">"+leibie_info[i]+"</a> ";
		}
		if(document.getElementById("showcitypate")!=null)document.getElementById("showcitypate").innerHTML = strHTML;
	}
	if(type_show == "window_value"){
		var strHTML = "<a class=\"all_a\" style=\"cursor:hand;text-decoration:underline\" onclick=\"showLaiBiePage('"+type_show+"','"+strLatlon+"','"+type_value+"','"+lbscity+"');\">���</a> > "+leibie+"��";
		for(var i=0;i<leibie_info.length;i++){
			strHTML = strHTML + "<a class=\"all_a\" style=\"cursor:hand;text-decoration:underline\" onclick=\"search_poi('"+leibie_mapbar[i]+"',1,'"+type_show+"','"+strLatlon+"','"+lbscity+"')\">"+leibie_info[i]+"</a> ";
		}
		document.getElementById("show_leibie"+type_value).innerHTML = strHTML;
	}
}


function search_poi(keytype,page,type_show,strLatlon,lbscity){
	var urlpara = "/gis/servlet/goservlet";
	//if(keytype.indexOf("��")) keytype = keytype.split("��")[0];
	var infoframe = null;
	if(document.getElementById("infoframe")!=null) infoframe = document.getElementById("infoframe").contentWindow;
	else infoframe = parent.document.getElementById("infoframe").contentWindow;
	var city = "";
	if(document.getElementById("city")!=null) city = document.getElementById("city").value;
	else if(parent.document.getElementById("city")!=null)city = parent.document.getElementById("city").value;
	else city = Request['city'];
	if(lbscity!=null && lbscity !='' && lbscity!="undefined") city = lbscity;
	
	if(city == ""){
		alert("��¼�������Ϣ")
		return;
	}
	
	var href_value = window.location.href.match(/.+\/([^?]*)/)[1];
	var centerKey = "";
	var params = "";
	var gotype = "";
	if(href_value == "location_info.jsp") href_value = parent.window.location.href.match(/.+\/([^?]*)/)[1];
	if(href_value == "location.jsp") gotype = "KEY";
	if(href_value == "surrounding.jsp"){
		gotype = "CENTERKEY";
		if(document.getElementById("centerKey")!=null) centerKey = document.getElementById("centerKey").value;
		else centerKey = parent.document.getElementById("centerKey").value;
		if(centerKey == "" ){
			alert("��¼��λ����Ϣ")
			return;
		}
	}
	if(href_value == "location_window.jsp") gotype = "CENTERDIS";
	
	var r = searchCity(city);
	if(r == null ) {
		//document.getElementById('resultid').value = "�޽��";
		return;
	}
	province = r[0][3];  //���ʡ����
	cityInt = r[0][4];   //����б���
	params = "incode="+arCode[2]+"&province="+province+"&city="+cityInt
		+"&keyword=&gotype="+gotype+"&page="+page+"&pc=5"+"&keytype="+keytype
		+"&CCID="+cityNumber+"&TELNO="+tel+"&SERIALNO="+serialno
 		+"&GLOBALID="+globalid+"&USERNAME="+username+"&id="+id+getLogUrl(id);
	if(href_value == "surrounding.jsp") params = params  + "&centerKey="+centerKey;
	if(href_value == "location_window.jsp") params = params  + "&latlon="+strLatlon;
	if(type_show == "index"){
		if(document.getElementById("keyword")!=null){
			document.getElementById("keyword").value = keytype;
		}
		infoframe.goURL(urlpara,params,city,tel,gotype,keytype,strLatlon,"","",centerKey);
		if(document.getElementById("keyword_hot")!=null){
			document.getElementById("keyword_hot").style.display = "none";
		}
		if(document.getElementById("mapFrame")!=null){
			document.getElementById("mapFrame").style.visibility = "visible";
		}
		if(document.getElementById("infoframe")!=null){
			document.getElementById("infoframe").style.display = "block";
		}
		
	}
		
		
	if(type_show == "window_value")  
	{
		params = "incode="+arCode[2]+"&province="+province+"&city="+city
			+"&keyword=&gotype="+gotype+"&page="+page+"&pc=5"+"&keytype="+keytype
			+"&cityNumber="+cityNumber+"&CCID="+cityNumber+"&TELNO="+tel+"&SERIALNO="+serialno
	 		+"&GLOBALID="+globalid+"&USERNAME="+username+"&id="+id+"&searchtype=type"+getLogUrl(id);
	 	var window_jsp = 'location_window.jsp?';
	 	if(href_value == "cross_info.jsp") window_jsp = '../zb/location_window.jsp?';
	 	if(href_value == "lbs_info.jsp") window_jsp = '../zb/location_window.jsp?';
	 	if(href_value == "busstaiton_info.jsp") window_jsp = '../zb/location_window.jsp?';
		openwindow(window_jsp+params+'&latlon='+strLatlon,window,'770','490',false);
	}
	//for(var i=1;i<8;i++){
		var params_for = "incode="+arCode[2]+"&province="+province+"&city="+cityInt
			+"&keyword=&gotype="+gotype+"&page=1&pc=5"+"&keytype="+keytype
			+"&CCID="+cityNumber+"&TELNO="+tel+"&SERIALNO="+serialno
	 		+"&GLOBALID="+globalid+"&USERNAME="+username+"&id="+id+getLogUrl(id);
	 	if(href_value == "surrounding.jsp") params_for = params_for + "&centerKey="+centerKey;
	 	if(href_value == "location_window.jsp") params_for = params_for  + "&latlon="+strLatlon;
	 	//if(i!=page) goSearchPoi(params_for,page,city);
	 	goSearchPoi(params_for,page,city);
	//}
}

//poi��ѯ
function goSearchPoi(params,page,city){
	var urlpara = "/gis/servlet/goservlet";
	var req = newXMLHttpRequest();
	req.onreadystatechange = getSearchPoiXML(req,page,city);
	req.open("POST", urlpara, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}
//poi��ѯ��Ӧ
function getSearchPoiXML(req,page,city) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var test = req.responseText;
				if(test == "�޽����Ϣ") return;
   				parseSearchPoiXML(test,page,city);
			} else {
				//alert("�޽����Ϣ")
			}
		}
	};
}

function suggestBind(){
	mapbarInputSuggest.bind('');
}

//����POI xml �ڵ�ͼ����ʾ��
function parseSearchPoiXML(test,page,city){
	if(document.getElementById("mapFrame")!=null) g_objMapFrame = document.getElementById("mapFrame").contentWindow;
	else g_objMapFrame = parent.document.getElementById("mapFrame").contentWindow; 
	var xmlDoc = getXmlDoc(test);
	
	if(xmlDoc.getElementsByTagName("totalpage")[0]==null) return;
	var totalpage = xmlDoc.getElementsByTagName("totalpage")[0].firstChild.nodeValue; 
	if(page>totalpage) return;
	var item = xmlDoc.getElementsByTagName("item"); 
	for(var i = 0 ; i < item.length ; i ++ ){ 
		var latlon = "";
		if(item[i].getElementsByTagName("latlonencode")[0].firstChild != null)
			latlon = item[i].getElementsByTagName("latlonencode")[0].firstChild.nodeValue;
		var name = "";
		var phone = "";
		var address = "";
		if(item[i].getElementsByTagName("name")[0].firstChild!=null)
			name = item[i].getElementsByTagName("name")[0].firstChild.nodeValue;
		if(item[i].getElementsByTagName("phone")[0].firstChild!=null)
			phone = item[i].getElementsByTagName("phone")[0].firstChild.nodeValue;
		if(item[i].getElementsByTagName("address")[0].firstChild != null)
			address = item[i].getElementsByTagName("address")[0].firstChild.nodeValue;
		var dcpid = "";
		if(item[i].getElementsByTagName("dcpid")[0].firstChild != null)
			dcpid = item[i].getElementsByTagName("dcpid")[0].firstChild.nodeValue;	
		var gisid = "";
		if(item[i].getElementsByTagName("gisid")[0].firstChild != null)
			gisid = item[i].getElementsByTagName("gisid")[0].firstChild.nodeValue;	
		var poi_title = "<strong>"+name+"</strong>";
		var show_POI = "<table>"
				+ "<tr><td>�绰��"+phone+"</td></tr>"
				+ "<tr><td>��ַ��"+address+"</td></tr>"
				+ "<tr><td>"
				+ " <a class=all_a onclick=\"showLaiBiePage('window_value','"+latlon+"','"+i+"');document.getElementById('cz_"+i+"').style.display='';document.getElementById('cfd_"+i+"').style.display='none';document.getElementById('qq_"+i+"').style.display='none';\">�ڸ�������</a>"
	            + " <a class=all_a onclick=\"suggestBind();document.getElementById('cfd_"+i+"').style.display='';document.getElementById('cz_"+i+"').style.display='none';document.getElementById('qq_"+i+"').style.display='none';\">������</a>"
	            + " <a class=all_a onclick=\"suggestBind();document.getElementById('qq_"+i+"').style.display='';document.getElementById('cz_"+i+"').style.display='none';document.getElementById('cfd_"+i+"').style.display='none';\">���������</a>"
				+ "</td></tr>"
				+ "<tr><td>"
         		+"<span id=\"cz_"+i+"\" style=\"display:block\">"
		        +"<input type=\"text\" id=\"poitextfield"+i+"\" />"
		        +"<input type=\"button\" value=\"����\" onclick=\"openWindowsZB('poitextfield"+i+"','"+name+"','"+latlon+"','"+city+"','"+gisid+"','"+dcpid+"')\"/>"
		      //  +"<div id='show_leibie"+i+"'></div>"
		       // +"<div id='show_leibie0'>"+showLaiBiePage2('window_value',latlon,'0',city)+"</div>"
		       +"<div id='show_leibie"+i+"'>"+showLaiBiePage2('window_value',latlon,i)+"</div>"
				+"</span>"
				
				+"<span id=\"cfd_"+i+"\" style=\"display:none\">���� "  //<a class=\"all_a\" style=\"cursor:hand;\" onclick=\"showCityDiv('city_"+i+"')\">���� </a>
				+"<input name=\"city_"+i+"\" id=\"city_"+i+"\" type=\"text\" value=" + parent.getcity + " size=\"10\" issuggest=\"yes\" autocomplete=\"off\" suggestType=\"city\" isshengccid=\"\"/><br/>"				
				+"�����أ�"
		       	+"<input name=\"busstartid"+i+"\" id=\"busstartid"+i+"\" type=\"text\" value=\"\" size=\"18\" cityname=\"city_"+i+"\" issuggest=\"yes\" autocomplete=\"off\" suggestType=\"pinyinkey\" /><br/>"
				+"Ŀ�ĵأ�"+name+"<br/>"
			    +"<input type=\"button\" value=\"����\" onclick=\"openWindowsGJ('start','busstartid"+i+"','"+name+"','"+latlon+"','"+gisid+"','"+dcpid+"','"+city+"','city_"+i+"')\"/>"
		        +"<input type=\"button\" value=\"�Լ�\" onclick=\"openWindowsZJ('start','busstartid"+i+"','"+name+"','"+latlon+"','"+gisid+"','"+dcpid+"','"+city+"','city_"+i+"')\"/>"
		     	+"<br/></span>"
		     	
		   		+"<span id=\"qq_"+i+"\" style=\"display:none\">���� " //<a class=\"all_a\" style=\"cursor:hand;\" onclick=\"showCityDiv('city_1"+i+"')\">���� </a>
		   		+"<input name=\"city_1"+i+"\" id=\"city_1"+i+"\" type=\"text\" value=" + parent.getcity + " size=\"10\" issuggest=\"yes\" autocomplete=\"off\" suggestType=\"city\" isshengccid=\"\"/><br/>"		   		
		   		+"�����أ�"+name+"<br/>"
		        +"Ŀ�ĵأ�"
	            +"<input id=\"busendid"+i+"\" name=\"busendid"+i+"\" type=\"text\" value=\"\" size=\"18\" cityname=\"city_1"+i+"\" issuggest=\"yes\" autocomplete=\"off\" suggestType=\"pinyinkey\" />"
	            +"<br/>"
	            +"<input type=\"button\" value=\"����\" onclick=\"openWindowsGJ('end','busendid"+i+"','"+name+"','"+latlon+"','"+gisid+"','"+dcpid+"','"+city+"','city_1"+i+"')\"/>"
	            +"<input type=\"button\" value=\"�Լ�\" onclick=\"openWindowsZJ('end','busendid"+i+"','"+name+"','"+latlon+"','"+gisid+"','"+dcpid+"','"+city+"','city_1"+i+"')\"/>"
	            +"</span></td></tr></table>";
		var img = "../images/yuan.gif"
		var img_width = "7";
		var img_height = "7";	
		if(latlon.length>=13){//��γ�Ȳ�Ϊ��
			g_objMapFrame.showMapApi(latlon,img,"",img_width,img_height,show_POI,poi_title);
		}
   	}
}


//ѡ����ʾccidʡ�µ����г��� �Ĵ���
function putTest(strTxtID,strTxt){
	var provinceK = searchCity(strTxt)[0][3];  //���ʡ����
	var cityIntK = searchCity(strTxt)[0][4];   //����б���
	var cityNumberK = getCCIDByCity(strTxt);
	if(bus_type=="bus")
		getBusKeyword(tel,cityNumberK,provinceK,cityIntK,url);
	if(bus_type=="line")
		getBusKeyline(tel,cityNumberK,provinceK,cityIntK,url);
	if(bus_type=="station")
		getBusKeystation(tel,cityNumberK,provinceK,cityIntK,url);
	
	if(document.getElementById("yebanche")!=null){
    	if(strTxt == "������" || strTxt == "������" ||strTxt == "����" || strTxt == "����") document.getElementById("yebanche").style.display = "block";
      		else document.getElementById("yebanche").style.display = "block";
    }
	if(document.getElementById("city1")!=null || document.getElementById("city2")!=null){
		if(strTxtID == "city1" && bus_type == "bus") {
		    document.getElementById("city1").value = strTxt;
	    }
		if(strTxtID == "city2" && bus_type == "bus") {
		    document.getElementById("city2").value = strTxt;
	    }
		if(document.getElementById("city3")!=null){
			document.getElementById("city3").value = strTxt;
		}
	}else{
	   if(strTxtID == "city" && bus_type == "bus") {
		   if(document.getElementById("city")!=null)
		 		document.getElementById("city").value = strTxt;
	   }
	}
	if(strTxtID == "city" && bus_type == "line") {
		document.getElementById("city").value = strTxt;
	}
	if(strTxtID == "city" && bus_type == "station") {
		document.getElementById("city").value = strTxt;
	}
	if(cursor == null){
		//document.getElementById(strTxtID).value = strTxt;
		document.getElementById("mapFrame").contentWindow.setMapCenter(strTxt);
		if(strTxtID == "city" && bus_type == "bus"){
			document.getElementById("city").value = strTxt;
		}
		if(strTxtID == "city1"){
			document.getElementById("city1").value = document.getElementById("city2").value=strTxt;
		}
		if(strTxtID == "city" && (bus_type =="certerother" || bus_type =="crossroad")){
			document.getElementById("city").value = strTxt;
		}
	}
	if(cursor=="city1") {
		document.getElementById("city1").value = document.getElementById("city2").value=strTxt;
	}
	if(cursor=="city2") {
		document.getElementById("city2").value = strTxt;
	}
}

//ȫ������¼�
/*document.onmousedown=function(){
}
*/

//�������߻���
//page �ڼ�ҳ   
//totalpage ������ҳ
function fenyeLine(page,totalpage,lb,strLatlon,keytype){
	var hanshu = "";
	var htm = "";
	if(page != 1){ 
		var befor_page = page - 1;

		if(lb!="") hanshu = "search_poi('"+lb+"',1,'index','"+strLatlon+"')"; 
		else hanshu = "showList(1)"; 
		if(lb=="typesearch") hanshu = "typeSelectSearch(1,'','"+keytype+"')"; 
		htm = htm + "<a class=\"all_a\" onclick=\""+hanshu+"\">��ҳ</a>&nbsp;";
	  
		if(lb!="") hanshu = "search_poi('"+lb+"',"+befor_page+",'index','"+strLatlon+"')";
		else hanshu = "showList("+befor_page+")";
		if(lb=="typesearch") hanshu = "typeSelectSearch("+befor_page+",'','"+keytype+"')";
		htm = htm + "<a class=\"all_a\" onclick=\""+hanshu+"\">��һҳ</a>&nbsp;";
	   	
	   	var page_type = 1;
	   	if(page == 1) page_type = 1;
	   	else if(page==totalpage) page_type = page/1-4;
	   	else if(page==(totalpage-1)) page_type = page/1-1;//page/1-3; 
	   	else if(page>2) page_type = page/1-1;//page/1-2;
	   	else page_type = page/1-1;
	   	if(totalpage<5) page_type = totalpage - (totalpage-1);
	  	for(var r=page_type;r<page/1;r++){ 
	  		if(lb!="") hanshu = "search_poi('"+lb+"',"+r+",'index','"+strLatlon+"')";
			else hanshu = "showList("+r+")";
			if(lb=="typesearch") hanshu = "typeSelectSearch("+r+",'','"+keytype+"')";
	  		htm = htm + "<a class=\"all_a\" id=\"pageid"+r+"\" onclick=\""+hanshu+"\">"+r+"</a>&nbsp;";
	  	}
  	}
  	if(lb!="") hanshu = "search_poi('"+lb+"',"+page+",'index','"+strLatlon+"')";
	else hanshu = "showList("+page+")";
	if(lb=="typesearch") hanshu = "typeSelectSearch("+page+",'','"+keytype+"')";
  	htm = htm + "<a id=\"pageid"+page+"\" class=\"pageyes\" onclick=\""+hanshu+"\">"+page+"</a>&nbsp;";
  	
  	if(page!=totalpage){
  		var page_flog = 1;
  		if(page == 1) page_flog = page/1+5;
  		else if(page == 2) page_flog = page/1+2; //page/1+4;
  		else if(page == (totalpage-1)) page_flog =  page/1+2;//page/1+2;
  		else page_flog = page/1+2;//page/1+3;
  		if(totalpage<5) page_flog = totalpage/1+1 ;
	   	for(var r=page/1+1;r<page_flog;r++){
	   		if(lb!="") hanshu = "search_poi('"+lb+"',"+r+",'index','"+strLatlon+"')";
			else hanshu = "showList("+r+")";
			if(lb=="typesearch") hanshu = "typeSelectSearch("+r+",'','"+keytype+"')";
	   		htm = htm + "<a class=\"all_a\" id=\"pageid"+r+"\" onclick=\""+hanshu+"\">"+r+"</a>&nbsp;";
	   	}
	   	
	   	var end_page = page/1 + 1;
	   	if(lb!="") hanshu = "search_poi('"+lb+"',"+end_page+",'index','"+strLatlon+"')";
		else hanshu = "showList("+end_page+")";
		if(lb=="typesearch") hanshu = "typeSelectSearch("+end_page+",'','"+keytype+"')";
	   	htm = htm + "<a class=\"all_a\" onclick=\""+hanshu+"\">��һҳ</a>&nbsp;";
	   	
	   	if(lb!="") hanshu = "search_poi('"+lb+"',"+totalpage+",'index','"+strLatlon+"')";
		else hanshu = "showList("+totalpage+")";
		if(lb=="typesearch") hanshu = "typeSelectSearch("+totalpage+",'','"+keytype+"')";
	   	htm = htm + "<a class=\"all_a\" onclick=\""+hanshu+"\">ĩҳ</a>&nbsp;";
   }
   return htm;
}

//�㽭·����ҳ
//page �ڼ�ҳ   
//totalpage ������ҳ
function fenyeRoad(page,totalpage,lb,strLatlon,keytype,type_){
	var hanshu = "";
	var htm = "";
	if(page != 1){ 
		var befor_page = page - 1;

		if(lb!="") hanshu = "search_poi('"+lb+"',1,'index','"+strLatlon+"')"; 
		else hanshu = "showList(1,'"+type_+"')"; 
		if(lb=="typesearch") hanshu = "typeSelectSearch(1,'','"+keytype+"')"; 
		htm = htm + "<a class=\"all_a\" onclick=\""+hanshu+"\">��ҳ</a>&nbsp;";
	  
		if(lb!="") hanshu = "search_poi('"+lb+"',"+befor_page+",'index','"+strLatlon+"')";
		else hanshu = "showList("+befor_page+",'"+type_+"')";
		if(lb=="typesearch") hanshu = "typeSelectSearch("+befor_page+",'','"+keytype+"')";
		htm = htm + "<a class=\"all_a\" onclick=\""+hanshu+"\">��һҳ</a>&nbsp;";
	   	
	   	var page_type = 1;
	   	if(page == 1) page_type = 1;
	   	else if(page==totalpage) page_type = page/1-4;
	   	else if(page==(totalpage-1)) page_type = page/1-1;//page/1-3; 
	   	else if(page>2) page_type = page/1-1;//page/1-2;
	   	else page_type = page/1-1;
	   	if(totalpage<5) page_type = totalpage - (totalpage-1);
	  	for(var r=page_type;r<page/1;r++){ 
	  		if(lb!="") hanshu = "search_poi('"+lb+"',"+r+",'index','"+strLatlon+"')";
			else hanshu = "showList("+r+",'"+type_+"')";
			if(lb=="typesearch") hanshu = "typeSelectSearch("+r+",'','"+keytype+"')";
	  		htm = htm + "<a class=\"all_a\" id=\"pageid"+r+"\" onclick=\""+hanshu+"\">"+r+"</a>&nbsp;";
	  	}
  	}
  	if(lb!="") hanshu = "search_poi('"+lb+"',"+page+",'index','"+strLatlon+"')";
	else hanshu = "showList("+page+",'"+type_+"')";
	if(lb=="typesearch") hanshu = "typeSelectSearch("+page+",'','"+keytype+"')";
  	htm = htm + "<a id=\"pageid"+page+"\" class=\"pageyes\" onclick=\""+hanshu+"\">"+page+"</a>&nbsp;";
  	
  	if(page!=totalpage){
  		var page_flog = 1;
  		if(page == 1) page_flog = page/1+5;
  		else if(page == 2) page_flog = page/1+2; //page/1+4;
  		else if(page == (totalpage-1)) page_flog =  page/1+2;//page/1+2;
  		else page_flog = page/1+2;//page/1+3;
  		if(totalpage<5) page_flog = totalpage/1+1 ;
	   	for(var r=page/1+1;r<page_flog;r++){
	   		if(lb!="") hanshu = "search_poi('"+lb+"',"+r+",'index','"+strLatlon+"')";
			else hanshu = "showList("+r+",'"+type_+"')";
			if(lb=="typesearch") hanshu = "typeSelectSearch("+r+",'','"+keytype+"')";
	   		htm = htm + "<a class=\"all_a\" id=\"pageid"+r+"\" onclick=\""+hanshu+"\">"+r+"</a>&nbsp;";
	   	}
	   	
	   	var end_page = page/1 + 1;
	   	if(lb!="") hanshu = "search_poi('"+lb+"',"+end_page+",'index','"+strLatlon+"')";
		else hanshu = "showList("+end_page+",'"+type_+"')";
		if(lb=="typesearch") hanshu = "typeSelectSearch("+end_page+",'','"+keytype+"')";
	   	htm = htm + "<a class=\"all_a\" onclick=\""+hanshu+"\">��һҳ</a>&nbsp;";
	   	
	   	if(lb!="") hanshu = "search_poi('"+lb+"',"+totalpage+",'index','"+strLatlon+"')";
		else hanshu = "showList("+totalpage+",'"+type_+"')";
		if(lb=="typesearch") hanshu = "typeSelectSearch("+totalpage+",'','"+keytype+"')";
	   	htm = htm + "<a class=\"all_a\" onclick=\""+hanshu+"\">ĩҳ</a>&nbsp;";
   }
   return htm;
}

//������ҳ
//page ������ҳ
//totalpage �ڼ�ҳ   
function fenye(page,totalpage,lb,strLatlon,keytype){
	var hanshu = "";
	var htm = "";
	if(page != 1){ 
		var befor_page = page - 1;

		if(lb!="") hanshu = "search_poi('"+lb+"',1,'index','"+strLatlon+"')"; 
		else hanshu = "parent.locationGo(1)"; 
		if(lb=="typesearch") hanshu = "typeSelectSearch(1,'','"+keytype+"')"; 
		htm = htm + "<a class=\"all_a\" onclick=\""+hanshu+"\">��ҳ</a>&nbsp;";
	  
		if(lb!="") hanshu = "search_poi('"+lb+"',"+befor_page+",'index','"+strLatlon+"')";
		else hanshu = "parent.locationGo("+befor_page+")";
		if(lb=="typesearch") hanshu = "typeSelectSearch("+befor_page+",'','"+keytype+"')";
		htm = htm + "<a class=\"all_a\" onclick=\""+hanshu+"\">��һҳ</a>&nbsp;";
	   	
	   	var page_type = 1;
	   	if(page == 1) page_type = 1;
	   	else if(page==totalpage) page_type = page/1-4;
	   	else if(page==(totalpage-1)) page_type = page/1-1;//page/1-3; 
	   	else if(page>2) page_type = page/1-1;//page/1-2;
	   	else page_type = page/1-1;
	   	if(totalpage<5) page_type = totalpage - (totalpage-1);
	  	for(var r=page_type;r<page/1;r++){
	  		if(lb!="") hanshu = "search_poi('"+lb+"',"+r+",'index','"+strLatlon+"')";
			else hanshu = "parent.locationGo("+r+")";
			if(lb=="typesearch") hanshu = "typeSelectSearch("+r+",'','"+keytype+"')";
	  		htm = htm + "<a class=\"all_a\" id=\"pageid"+r+"\" onclick=\""+hanshu+"\">"+r+"</a>&nbsp;";
	  	}
  	}
  	
  	if(lb!="") hanshu = "search_poi('"+lb+"',"+page+",'index','"+strLatlon+"')";
	else hanshu = "parent.locationGo("+page+")";
	if(lb=="typesearch") hanshu = "typeSelectSearch("+page+",'','"+keytype+"')";
  	htm = htm + "<a id=\"pageid"+page+"\" class=\"pageyes\" onclick=\""+hanshu+"\">"+page+"</a>&nbsp;";
  	
  	if(page!=totalpage){
  		var page_flog = 1;
  		if(page == 1) page_flog = page/1+5;
  		else if(page == 2) page_flog = page/1+2; //page/1+4;
  		else if(page == (totalpage-1)) page_flog =  page/1+2;//page/1+2;
  		else page_flog = page/1+2;//page/1+3;
  		if(totalpage<5) page_flog = totalpage/1+1 ;
	   	for(var r=page/1+1;r<page_flog;r++){
	   		if(lb!="") hanshu = "search_poi('"+lb+"',"+r+",'index','"+strLatlon+"')";
			else hanshu = "parent.locationGo("+r+")";
			if(lb=="typesearch") hanshu = "typeSelectSearch("+r+",'','"+keytype+"')";
	   		htm = htm + "<a class=\"all_a\" id=\"pageid"+r+"\" onclick=\""+hanshu+"\">"+r+"</a>&nbsp;";
	   	}
	   	
	   	var end_page = page/1 + 1;
	   	if(lb!="") hanshu = "search_poi('"+lb+"',"+end_page+",'index','"+strLatlon+"')";
		else hanshu = "parent.locationGo("+end_page+")";
		if(lb=="typesearch") hanshu = "typeSelectSearch("+end_page+",'','"+keytype+"')";
	   	htm = htm + "<a class=\"all_a\" onclick=\""+hanshu+"\">��һҳ</a>&nbsp;";
	   	
	   	if(lb!="") hanshu = "search_poi('"+lb+"',"+totalpage+",'index','"+strLatlon+"')";
		else hanshu = "parent.locationGo("+totalpage+")";
		if(lb=="typesearch") hanshu = "typeSelectSearch("+totalpage+",'','"+keytype+"')";
	   	htm = htm + "<a class=\"all_a\" onclick=\""+hanshu+"\">ĩҳ</a>&nbsp;";
   }
   return htm;

}

var doclist=[
["CHILDNAME","�ֵ���"],
["SPELLNAME","�̻�ƴ����д"],
["ID","�̻�ID"],
["Building","��־�Խ���"],
["SHORNAME","���"],
["Region","��Ȧ"],
["Feature","�̻���ɫ"],
["Product","���Ʋ�"],
["UPDATETIME","����ʱ��"],
["CHANNEL","����Ƶ��"],
["Vegetable","��ϵ"],
["PARKING","����ͣ��λ"],
["CHARGETYPE","�Ƿ�ˢ��"],
["PEREXPEND","�˾�����(���ѵ���)"],
["EXPONENT","����ָ��"],
["PRESTIGE","����ֵ"],
["ISORDER","�Ƿ����Ԥ��"],
["MAYCALL","�Ƿ��ת"],
["BUSIGRADE","��Ϣ����(��Ϣ���)"],
["ABATETIME","ʧЧʱ��"],
["Obligate1","����ԭ��"],
["USERCODE_OLD","�Ƽ���ɫ��ǩ"],
["ISYELLOPAGE","�Ƿ��ҳ"],
["FLAG","�̻���ʶ"],
["HaveRoom","���ް���"],
["AreaMeasure","���(m2)"],
["Contain","����Ӵ�����(��)"],
["RoomNum","�����������䣩"],
["MaxRoom","�������������ˣ�"],
["MaxDesk","������������ˣ�"],
["MinRoom","��С�����������ˣ�"],
["Zipcode","�ʱ�"],
["Remark","��ע"],
["Rebate","Э���ۿ�"],
["BusiHours","Ӫҵʱ��"],
["TicPrice","�ο�Ʊ��"],
["Route","�г�·��"],
["BusRoute","����·��"],
["AGENTID","��վ�̻���Ϣ"],
["ISCOMMENT","�̻����ƹؼ���"],
["IsHead","�ٷ���Ϣ"]
];




/**
 * ��ת�̻�
 * @param bizTel
 * @param id
 * @param cname
 * @param areaid
 * @return
 */
function gotoTransferBiz(bizTel, id, cname, areaid) { 
	var callRedirect = parent.callMainBizTransfer; 
	if (window.opener) { 
		callRedirect = window.opener.parent.callMainBizTransfer;
	}
	if (callRedirect) {
		callRedirect(bizTel, id, cname, areaid); 
	} else {
		alert("�Բ����޷���ƽ̨�ⲿ���к�ת��");
	}
}


function getYebanche(city){
	var city_list = ['������','������','�Ϻ���','������','������','֣����','������','�ϲ���'
				,'�ػʵ���','�Ϸ���','�Ͼ���'];
	var bl = false;			
	for(var i=0;i<city_list.length;i++){
		if(city_list[i] == city) bl=true;
	}
	return bl;
}



function showZxc(dcpid){
	var urlpara = "/gis/servlet/goservlet";
	var params = "gotype=ZXC&dcpid="+dcpid;
	var req = newXMLHttpRequest();
	req.onreadystatechange = get_ZXC(req);
	req.open("POST", urlpara, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}

function get_ZXC(req) {
	return function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var test = req.responseText;
   				zxc(test)
			} else {
				//alert("�޽����Ϣ")
			}
		}
	};
}

function zxc(test){
	//alert(test);
	var xmlDoc = getXmlDoc(test);
	var table = xmlDoc.getElementsByTagName("Table"); 
	//alert(table[0].getElementsByTagName("STATIONNAME")[0].firstChild.nodeValue);
	var name = "";
	if(table[0].getElementsByTagName("STATIONNAME")[0].firstChild != null)
		name = table[0].getElementsByTagName("STATIONNAME")[0].firstChild.nodeValue;
	var address = "";
	if(table[0].getElementsByTagName("ADDRESS")[0].firstChild != null)
		address = table[0].getElementsByTagName("ADDRESS")[0].firstChild.nodeValue;
	var stallnum = "";
	if(table[0].getElementsByTagName("STALLNUM")[0].firstChild != null)
		stallnum = table[0].getElementsByTagName("STALLNUM")[0].firstChild.nodeValue;
	var servicetime = "";
	if(table[0].getElementsByTagName("SERVICETIME")[0].firstChild != null)
		servicetime = table[0].getElementsByTagName("SERVICETIME")[0].firstChild.nodeValue;
	var isallday = "";
	if(table[0].getElementsByTagName("ISALLDAY")[0].firstChild != null)
		isallday = table[0].getElementsByTagName("ISALLDAY")[0].firstChild.nodeValue;
	if(isallday==0) isallday = "��";
	else if(isallday==1) isallday = "��";
	else isallday = "";
	var availablebikenum = "";
	if(table[0].getElementsByTagName("AVAILABLEBIKENUM")[0].firstChild != null)
		availablebikenum = table[0].getElementsByTagName("AVAILABLEBIKENUM")[0].firstChild.nodeValue;
	var personduty = "";
	if(table[0].getElementsByTagName("PERSONDUTY")[0].firstChild != null)
		personduty = table[0].getElementsByTagName("PERSONDUTY")[0].firstChild.nodeValue;
	if(personduty==0) personduty = "��";
	else if(personduty==1) personduty = "��";
	else personduty = "";
	var stationphone = "";
	if(table[0].getElementsByTagName("STATIONPHONE")[0].firstChild != null)
		stationphone = table[0].getElementsByTagName("STATIONPHONE")[0].firstChild.nodeValue;
	var havetour = "";
	if(table[0].getElementsByTagName("HAVETOUR")[0].firstChild != null)
		havetour = table[0].getElementsByTagName("HAVETOUR")[0].firstChild.nodeValue;
	if(havetour==0) havetour = "��";
	else if(havetour==1) havetour = "��";
	else havetour = "";
	var commerceservice = "";
	if(table[0].getElementsByTagName("COMMERCESERVICE")[0].firstChild != null)
		commerceservice = table[0].getElementsByTagName("COMMERCESERVICE")[0].firstChild.nodeValue
	if(commerceservice==0) commerceservice = "��";
	else if(commerceservice==1) commerceservice = "��";
	else commerceservice = "";
	
	var url = "/gisn/gis/zb/zxc_zb.jsp?docid=docid"+i+"&name="+name+"&address="+address+"&stallnum="+stallnum;
		url = url + "&servicetime="+servicetime+"&isallday="+isallday+"&personduty="+personduty+"&stationphone="+stationphone;
		url = url + "&havetour="+havetour+"&commerceservice="+commerceservice+"&availablebikenum="+availablebikenum;
	openwindow(url,window,'520','300');
}

function sendAjaxReq(reqMethod,url,postParam,parseMsg200,parseMsg404,parseMsg500,loading){
	var request;
	//����XMLHttpRequest����
	if(window.XMLHttpRequest){
		request = new XMLHttpRequest();  //��IE
	}else if(window.ActiveXObject){
		request = new ActiveXObject("Msxml2.XMLHTTP");  //IE
	}
	//ͨ��XMLHttpRequest����������
	request.open(reqMethod,url);
	if("post"==reqMethod){
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded ");
	}
	//ע��һ���¼���ͨ��XMLHttpRequest����õ���Ӧ����
	request.onreadystatechange = function(){
	if(request.readyState==4){
	if(request.status==200){
		if(parseMsg200)
			parseMsg200(request);
	}else if(request.status==404){
		if(parseMsg404)
			parseMsg404(request);
	}else if(request.status==500){
		if(parseMsg500)
			parseMsg500(request);
		}
	}else{
		if(loading)
			loading(request);
		}
	};
	if("post"==reqMethod){
		request.send(postParam);
	}else{
		request.send(null); 
	}
}

function isChinaMobileTel(mobileNum)
{
	var reg1 = /^(13[5-9]{1})\d{8}$/;
	var reg2 = /^(134[0-8]{1})\d{7}$/;
	var reg3 = /^(147)\d{8}$/;
	var reg4 = /^(15[0,1,2,7,8,9]{1})\d{8}$/;
	var reg5 = /^(18[2,3,4,7,8]{1})\d{8}$/;
	var reg6 = /^(178)\d{8}$/;
	if (reg1.test(mobileNum))
	{
	        return true;
	    }
	else if(reg2.test(mobileNum))
	{
	        return true;
	    }
	else if(reg3.test(mobileNum))
	{
	        return true;
	    }
	else if(reg4.test(mobileNum))
	{
	        return true;
	    }
	else if(reg5.test(mobileNum))
	{
	        return true;
	}
	else if(reg6.test(mobileNum))
	{
	        return true;
	}
	else 
	{
        return false;
    }
}
