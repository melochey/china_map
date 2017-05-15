
function mapbarInputSuggest(options)
{
    var inputid = options.inputid || "";
    this.inputField = document.getElementById(inputid);
    if (!this.inputField) return;
    else
    {
         this.inputField.setAttribute("autocomplete", "off");
    }
	this.cityname = this.inputField.getAttribute("cityname");//城市ID，通过这个ID读取Value，用拼音

    this.className = "citySuggest" || "";
    this.inputname = this.inputField.getAttribute("inputname")||"";
	this.nextcityid = this.inputField.getAttribute("nextcityid")||"";
	this.keywordid = this.inputField.getAttribute("keywordid")||"";
	this.keystationid = this.inputField.getAttribute("keystationid")||"";
	this.keylineid = this.inputField.getAttribute("keylineid")||"";
	this.suggestType = this.inputField.getAttribute("suggestType")||"";
	this.issetmapcenter = this.inputField.getAttribute("issetmapcenter")||"";
	
	this.requestMode = options.requestMode || "script";
	this.requestDelegate = options.requestDelegate;
	this.selectDoneCbk = options.selectDoneCbk || "";
    this.lastKeyCode = -1;
    this.eventKeycode = "";
    this.lastText = this.inputField.value;
    this.cursorUpDownPressed=false;
    this.xmlHttp=null;
    this.selectSuggestIndex = 0 ;
    this.suggestDiv = null;
    this.keyupTimer = null;
    this.filterEnterKey = false;
    this.keyupTimerId = "";
    this.lostFocus = true;

    this.startIndex = 0;
    this.endIndex = 0;
    this.divTag = "div";
    //suggest style
    this.suggestid = "suggestDiv";
    this.ca=1;
    this.Aa=1;
    this.bgColor = "#E3EBF8";
    this.foreColor = "#FFFFFF";

	//方法
    this.onBlurHandler = function(event){
	
      this.lostFocus = true;

      if(!event&&window.event) {
        event=window.event;
      }

      if(!this.cursorUpDownPressed){
        this.hidesuggestDiv();
        // check if tab pressed...
        if(this.lastKeyCode==9){
          this.lastKeyCode=-1;
        }
        
        if(this.nextcityid != "" && this.suggestType !="pinyinkey")
        {
        	document.getElementById(this.nextcityid).value=this.inputField.value;
        }
      }
      
      this.cursorUpDownPressed=false;
    }

    this.onFocusHandler = function()
    {
    	if(this.inputname == "keyword") showLaiBiePage("index");
    	if(this.inputname == "city") showCityPage("city");
        this.lostFocus = false;
    }

    this.onKeyPressHandler = function(obj)
    {
      var e = this.onKeyPressHandler.caller.arguments[0] || window.event;
      var keycode = e.keyCode || e.which;
      if (keycode == 13 && obj.filterEnterKey)
      {
        if ( this.suggestDiv.style.display != "none" && this.selectSuggestIndex != 0)
        {
            if (window.event) {
                e.returnValue = false;
                e.cancelBubble = true;

            } else {
                e.preventDefault();
                e.stopPropagation();
            }
        }
      }
    }

    //
    this.okuh=function(obj){
      var e = this.okuh.caller.arguments[0] || window.event;
      obj.eventKeycode=e.keyCode || e.which;
      obj.handleKeyEvent();


    };

    this.onChangeHandler = function(thisObj)
    {
		if (thisObj.inputField.value == thisObj.inputField.defaultValue) return;

        var V = thisObj.inputField.value;
        if (thisObj.lastText!=V)
        {

            if (V!="")
            {
                V = V.substring(V.length-1,V.length);
            }
            thisObj.eventKeycode=V;
            thisObj.handleKeyEvent();
        }
    }

    //
    this.setInputFieldFocus=function(){
      this.inputField.focus();
    };

    //
    this.handleKeyEvent = function (){
      // 39 is right cursor key 37 is left cursor key
      // show div
      if (this.eventKeycode==39 || this.eventKeycode==37)
      {
          if (this.suggestDiv == null || (this.suggestDiv != null && this.suggestDiv.style.display!="none"))
          {
            return;
          }
      }
      // 38 is up cursor key, 40 is down cursor key...
      if(this.eventKeycode==40||this.eventKeycode==38) {
        this.setInputFieldFocus();
      }
      var V=this.inputField.value;

      if(this.eventKeycode!=0){
          if(this.eventKeycode==13||this.eventKeycode==3){
              var d=this.inputField;
              if(d.createTextRange){
                var t=d.createTextRange();
                t.moveStart("character",d.value.length);
                t.select();
              } else if (d.setSelectionRange){
                d.setSelectionRange(d.value.length,d.value.length);
              }
        } else {
          if(this.inputField.value!=V) {
            this.selectEntry(V);
          }
        }
      }
      if(this.handleCursorUpDownEnter(this.eventKeycode)&&this.eventKeycode!=0)
      {
         if (this.lastText!=V || this.eventKeycode==39 || this.eventKeycode==37)
         {
            this.lastText = V;

            window.clearTimeout(this.keyupTimerId);

            if (V!="")
            {
                var delegate = function(thisObj,para1)
                {
                    return function()
                    {
                        thisObj.getSuggestInfo(para1);
                    }
                }

                this.keyupTimerId = window.setTimeout(delegate(this,V),250);

            }
            else
            {
                //this.showSuggestList([],document.getElementById(this.suggestid));
                this.hidesuggestDiv();
                //this.showSuggestList([],this.suggestDiv);
            }
         }
      }


    }


    this.selectEntry = function(text){
      var xg_url = parent.location.search;
      //xg_url = replaceAll(xg_url,"id=1", "id="+id);
      //xg_url = replaceAll(xg_url,"CCID="+cityNumber, "CCID=200");
      if(cityNumber=='8520' && text=='广州市') window.parent.location.href = "http://172.16.24.40:9090/gis_gz/index.jsp"+xg_url;
      this.inputField.value=text;
      if(document.getElementById("yebanche")!=null){
      	var city = "";
      	if(document.getElementById("city")!=null) city = document.getElementById("city").value;
      	var city_list = ['北京市','杭州市','上海市','重庆市','西安市','郑州市','广州市','南昌市','秦皇岛市','合肥市','南京市','宁波市','温州市','嘉兴市','湖州市','绍兴市','金华市','衢州市','舟山市','台州市','丽水市'];
      	var bl = false;			
		for(var i=0;i<city_list.length;i++){
			if(city_list[i] == city) bl=true;
		}
      	//if(city == "杭州市" || city == "北京市") document.getElementById("yebanche").style.display = "block";
      	if(bl) document.getElementById("yebanche").style.display = "block";
      	else document.getElementById("yebanche").style.display = "none";
      }
      if(this.suggestType !="pinyinkey" && this.issetmapcenter=="1"){
    	  if(document.getElementById("mapFrame")!=null){
  			document.getElementById("mapFrame").contentWindow.setMapCenter(text);
  			document.getElementById("mapFrame").contentWindow.gun(text);
  		  }
      }
       if(this.keywordid != "" && this.suggestType !="pinyinkey")
        {
        	
        	  var cityK = "";
        	  if(document.getElementById("city")!=null){
	        	 cityK = document.getElementById("city").value;
        	  }
        	  if(document.getElementById("city1")!=null){
	        	 cityK = document.getElementById("city1").value;
        	  }
        	  if(this.cityname=="city2" && document.getElementById("city2")!=null){
	        	 cityK = document.getElementById("city2").value;
        	  }
        	  if(cityCopy != cityK){
        		if(searchCity(cityK)==null ||searchCity(cityK)=='undefined'){
					alert("请录入正确城市名")
					return;
				}
				var provinceK = searchCity(cityK)[0][3];  //获得省编码
				var cityIntK = searchCity(cityK)[0][4];   //获得市编码
				var cityNumberK = getCCIDByCity(cityK);
        		getBusKeyword(tel,cityNumberK,provinceK,cityIntK,url);
        		if(document.getElementById("city")!=null){
	        	 cityCopy = document.getElementById("city").value;
        	   }
        	   if(document.getElementById("city1")!=null){
	        	 cityCopy = document.getElementById("city1").value;
        	   }
              }
        }
         if(this.keystationid != "" && this.suggestType !="pinyinkey")
        {
        	 
        	  var cityK = "";
        	  if(document.getElementById("city")!=null){
        		  cityK=document.getElementById("city").value;
        	  }
        	  if(cityCopy != cityK){
        		if(searchCity(cityK)==null ||searchCity(cityK)=='undefined'){
					alert("请录入正确城市名")
					return;
				}
				var provinceK = searchCity(cityK)[0][3];  //获得省编码
				var cityIntK = searchCity(cityK)[0][4];   //获得市编码
				var cityNumberK = getCCIDByCity(cityK);
        		getBusKeystation(tel,cityNumberK,provinceK,cityIntK,url);
        		cityCopy = document.getElementById('city').value;
        	  }
        	
        }
         if(this.keylineid != "" && this.suggestType !="pinyinkey")
        {
        	  var cityK ="";
        	  if(document.getElementById("city")!=null){
        		  cityK = document.getElementById("city").value;
        	  }
        	  if(cityCopy != cityK){
        		if(searchCity(cityK)==null ||searchCity(cityK)=='undefined'){
					alert("请录入正确城市名")
					return;
				}
				var provinceK = searchCity(cityK)[0][3];  //获得省编码
				var cityIntK = searchCity(cityK)[0][4];   //获得市编码
				var cityNumberK = getCCIDByCity(cityK);
        		getBusKeyline(tel,cityNumberK,provinceK,cityIntK,url);
        		cityCopy = document.getElementById('city').value;
        	  }
        	
        }
      this.lastText = text;
	  if(this.selectDoneCbk != "") eval(this.selectDoneCbk + "('" + text + "')");
    }

    this.getDivInnerHtml = function(div_id){
        var value = null;
        //if(document.getElementById(div_id)) value = document.getElementById(div_id).innerHTML;
        if(document.getElementById(div_id)) 
        {
        	value = document.getElementById(div_id).getAttribute("value");
        }
        return value;
    }

    this.setStyleForPerElement = function(c){
        if(document.getElementById(c)){
        	document.getElementById(c).style.background=""; 
        	document.getElementById(c).style.color="";
        }
    }

    this.setStyleForElement = function(c,km){
    	if(this.suggestType.length!=0&&(this.suggestType == "city" ||this.suggestType == "pinyinkey" )) {
    		var temp = c ;
    		var pre = c-1;
        	var next = c+1;

        	c="s_"+c;
        	if(pre==this.startIndex-1)pre=this.endIndex;
        	if(next==this.endIndex+1)next=this.startIndex;
        	pre = "s_"+pre;
       	 	next = "s_"+next;
        	if(document.getElementById(c)) {
        	//alert(document.getElementById("ul_"+temp).style.height);
        	document.getElementById(c).style.background=this.bgColor;document.getElementById(c).style.color=this.foreColor;}
        	if(document.getElementById(pre)&&km=="key"){
        	document.getElementById(pre).style.background="";document.getElementById(pre).style.color="";}
        	if(document.getElementById(next)&&km=="key"){
        	document.getElementById(next).style.background="";document.getElementById(next).style.color="";}
        	if(document.getElementById(c)&&km=="key")
        	{
        		var arTmp = this.getDivInnerHtml(c);
        		this.selectEntry(arTmp);
        	}
    	}
    }

    this.highlightNewValue = function(index,km){
      if(index<this.startIndex){
        index = this.endIndex;
      }
      if(index>this.endIndex){
        index = this.startIndex;
      }
      this.setStyleForElement(index,km);
      this.selectSuggestIndex =index;
    }

    this.handleCursorUpDownEnter = function(eventCode){
      this.clearStyle();
      var keyEnable = true;
      //alert(this.selectSuggestIndex);
      if(eventCode==40){
        this.highlightNewValue(parseInt(this.selectSuggestIndex)+1,"key");
        return false;
      }else if(eventCode==38){
        this.highlightNewValue(parseInt(this.selectSuggestIndex)-1,"key");
        return false;
      }else if(eventCode==13||eventCode==3){
        if ( this.suggestDiv.style.display != "none" )//&& this.selectSuggestIndex != 0)
        {
            this.hidesuggestDiv();
        }
        return false;
      }

      return keyEnable;
    }

    this.initACPartTwo = function(){

      if (this.inputField.getAttribute("enterkey_bubble") == "yes")
      {
          this.filterEnterKey = true;
      }

      var eventHandler = function (obj)
      {
        return function()
        {
          obj.onBlurHandler(obj);
        }
      }

      this.inputField.onblur=eventHandler(this);

      eventHandler = function (obj)
      {
        return function()
        {
          obj.onFocusHandler(obj);
        }
      }

      this.inputField.onfocus = eventHandler(this);

      eventHandler = function (obj)
      {
        return function()
        {
          obj.onKeyPressHandler(obj);
        }
      }
      

      this.inputField.onkeypress = eventHandler(this);

      eventHandler = function(obj)
      {
        return function()
        {
            obj.okuh(obj);
        }
      }

      this.inputField.onkeyup = eventHandler(this);

      if (!(this.suggestDiv = document.getElementById(this.suggestid)))
      {
          this.suggestDiv=document.createElement("DIV");
          this.suggestDiv.className = this.className;
          this.suggestDiv.id=this.suggestid;
          this.suggestDiv.style.borderRight="black "+this.ca+"px solid";
          this.suggestDiv.style.borderLeft="black "+this.ca+"px solid";
          this.suggestDiv.style.borderTop="black "+this.Aa+"px solid";
          this.suggestDiv.style.borderBottom="black "+this.Aa+"px solid";
          this.suggestDiv.style.zIndex="100";
          this.suggestDiv.style.paddingRight="0";
          this.suggestDiv.style.paddingLeft="0";
          this.suggestDiv.style.paddingTop="0";
          this.suggestDiv.style.paddingBottom="0";
          this.setsuggestDivSize();
          this.suggestDiv.style.display="none";
          this.suggestDiv.style.position="absolute";
          this.suggestDiv.style.backgroundColor="white";
          document.body.appendChild(this.suggestDiv);

          eventHandler = function(obj)
          {
              return function()
              {
                  obj.resizeHandler(obj);
              }
          }

          if (window.HTMLElement)
          {
              //fire fox
              window.addEventListener("resize",eventHandler(this),false);
          }
          else
          {
              //ie
              window.attachEvent("onresize",eventHandler(this));
          }

      }

      eventHandler = function(thisObj)
      {
          return function()
          {
              thisObj.onChangeHandler(thisObj);
          }
      }
      window.setInterval(eventHandler(this),100);

    }
    this.resizeHandler = function(instance){
      instance.setsuggestDivSize();
    }


    this.setinputFieldSize = function(){
      var xa=document.body.scrollWidth-220;
      xa=0.73*xa;
      this.inputField.size=Math.floor(xa/6.18);
    }

    this.lb = function(n){
      var N=-1;
      if(n.createTextRange){
        var fa=document.selection.createRange().duplithis.cate();
        N=fa.text.length;
      }else if(n.setSelectionRange){
        N=n.selectionEnd-n.selectionStart;
      }
      return N;
    }

    this.bb = function(n){
      var v=0;
      if(n.createTextRange){
        var fa=document.selection.createRange().duplicate();
        fa.moveEnd("textedit",1);
        v=n.value.length-fa.text.length;
      }else if(n.setSelectionRange){
        v=n.selectionStart;
      }else{
        v=-1;
      }
      return v;
    }
    this.cc = function(d){
      if(d.createTextRange){
        var t=d.createTextRange();
        t.moveStart("character",d.value.length);
        t.select()
      } else if(d.setSelectionRange) {
        d.setSelectionRange(d.value.length,d.value.length)
      }
    }
    this.calculateWidth = function(){
      if(navigator&&navigator.userAgent.toLowerCase().indexOf("msie")==-1){
        return this.inputField.offsetWidth-this.ca*2;
      }else{
        return this.inputField.offsetWidth;
      }
    }
    this.calculateOffsetLeft = function(r){
      return this.Ya(r,"offsetLeft");
    }
    this.calculateOffsetTop = function(r){
      return this.Ya(r,"offsetTop");
    }
    this.Ya = function(r,attr){
      var kb=0;
      while(r){
        kb+=r[attr];
        r=r.offsetParent;
      }
      return kb;
    }
    this.setsuggestDivSize = function(){
      if(this.suggestDiv){
        this.suggestDiv.style.left=this.calculateOffsetLeft(this.inputField)+"px";
        this.suggestDiv.style.top=this.calculateOffsetTop(this.inputField)+this.inputField.offsetHeight-1+"px";
        
        if(null==this.suggestType || this.suggestType.length==0) {
        	this.suggestDiv.style.width=this.calculateWidth()+"px";
        }
        else {
        	this.suggestDiv.style.width=2*this.calculateWidth()+"px";
        }
      }
    }
    this.showsuggestDiv = function(){
      if (!this.lostFocus)
      {
          document.getElementById(this.suggestid).style.display="";
          this.setsuggestDivSize();
      }
    }
    this.hidesuggestDiv = function(){
    	var objsuggestList = document.getElementById(this.suggestid);
    	if(objsuggestList.style.display!="none")
    	{
    		this.inputField.setAttribute("isshengccid","");
    	}
		objsuggestList.innerHTML = "";
	    objsuggestList.style.display="none";
    }
	
	this.getSuggestInfoByScriptBlock = function(url){
		//alert(url);
		var id = "__suggestRequest";
        var head=document.getElementsByTagName("head")[0];
        var sT = document.getElementById(id);
        if (sT) {sT.parentNode.removeChild(sT);}
        var s = document.createElement("script");
        head.appendChild(s);
        s.setAttribute("language", "javascript");
		s.setAttribute("type", "text/javascript");
		s.setAttribute("id", id);
		s.setAttribute("src", url);

		var cFun = function(thisObj){
			return function(){
				if (typeof ActiveXObject!="undefined") 
				{
					if(s.readyState&&s.readyState=="loaded")
					{
						thisObj.createlistPY();
					}
				}
				else
				{
					thisObj.createlistPY();
				}
			}
		}
        s.onload=s.onreadystatechange=cFun(this);
	}
	
	this.createlistPY = function (){
	//创建拼音匹配的列表
		if(get_amalgamation(cityNumber)){
			if(document.getElementById("Buttonopen")!=null){
				if(document.getElementById("Buttonopen").style.display=="none"){
			        if (typeof arPYListItem == "undefined" || arPYListItem == null) arPYListItem=null;
			        this.showSuggestList(arPYListItem,false);
		        }
			}else{
				if (typeof arPYListItem == "undefined" || arPYListItem == null) arPYListItem=null;
       		 	this.showSuggestList(arPYListItem,false);
			}
		}else{
			 if (typeof arPYListItem == "undefined" || arPYListItem == null) arPYListItem=null;
       		 this.showSuggestList(arPYListItem,false);
		}
	}
	
    this.getSuggestInfo = function (keyword){
    	if(this.suggestType == "pinyinkey"){//拼音匹配
    		//if(document.getElementById("suggesttype") != null) obj_suggesttype = document.getElementById("suggesttype").value;
			var para = "keyword="+ keyword +"&city="+document.getElementById(this.cityname).value;
			var posturl = "/gis/common/suggestKeyword.jsp?" + para;
			this.getSuggestInfoByScriptBlock(posturl);
    	}
    	else
			this.createlist(keyword);
    }
    
    this.createlist = function (keyword){
    	var strShengCCID = this.inputField.getAttribute("isshengccid");
    	if(strShengCCID != "")//如果是根据CCID来列表
	        this.showSuggestList(getCityListByCCID(strShengCCID),true);
    	else
	        this.showSuggestList(searchCity(keyword),true);
    }
    this.showSuggestList = function(arr,isArrayList){
		var cdiv = this.suggestDiv;
		while(cdiv.childNodes.length>0) {
			cdiv.removeChild(cdiv.childNodes[0]);
		}
		this.hidesuggestDiv();
		if(arr == null ) return;    	
		//var div=document.createElement("DIV"); 
		//div.className = "divsuggest";  
		//var value = this.inputField.value; 
		/*if(null != value && value.length>7) {
			value = value.substring(0,7);
		}*/
 		//div.innerHTML = value+"，按拼音排序";	   
 		//cdiv.appendChild(div);	   		

		var nlen = arr.length;
    	if(this.inputField.getAttribute("isshengccid") != "")//如果是根据CCID来列表
    		nlen -= 2;
		
	   	 	
	if(get_amalgamation(cityNumber)){
		if(document.getElementById("Buttonopen")!=null){	
			if(document.getElementById("Buttonopen").style.display=="none"){
				for(var i=0; i<nlen; i++)
				{
			        var u=document.createElement("DIV");
			        u.id = "s_" + i;//arr[i].id;
			        u.style.fontSize = "13px";
			        u.style.width = "100%";
			        if(isArrayList) {
				    	if(this.inputField.getAttribute("isshengccid") != "")//如果是根据CCID来列表
							u.setAttribute("value",arr[i+2]);
						else
			         		u.setAttribute("value",arr[i][2]);
			        }
			   	 	else{
						u.setAttribute("value",arr[i]);
			   	 	}
				
			        var eventWrapper = function(obj)
			        {
			            return function()
			            {
			                obj.MOver(obj);
			            }
			        }
					u.onmouseover = eventWrapper(this);
		        
		
			        eventWrapper = function(obj)
			        {
			            return function()
			            {
			                obj.MDown(obj);
			            }
			        }
			        u.onmousedown = eventWrapper(this);
			
			        eventWrapper = function(obj)
			        {
			            return function()
			            {
			                obj.MOut(obj);
			            }
			        }
			        u.onmouseout = eventWrapper(this);
				
			        if(isArrayList){//这是城市
						if( this.suggestType.length==0 || this.suggestType == "") {
					    	if(this.inputField.getAttribute("isshengccid") != "")//如果是根据CCID来列表
								u.innerHTML=arr[i+2];
					    	else
								u.innerHTML=arr[i][2];
						}
				        else {
					    	if(this.inputField.getAttribute("isshengccid") != "")//如果是根据CCID来列表
							{
								u.innerHTML=("<table border='0px' style='width:100%;' id='tb_"+i+"'><tr id='tr_"+
								arr[i+2]+"'><td valign='top' style='width:100%' id='td_"+i+"' " +
								"value ="+arr[i+2]+">"+arr[i+2]+"</td></tr></table>");
							}
					    	else
					    	{
								u.innerHTML=("<table border='0px' style='width:100%;' id='tb_"+i+"'><tr id='tr_"+
								arr[i][1]+"'><td valign='top' style='width:100%' id='td_"+i+"' " +
								"value ="+arr[i][2]+">"+arr[i][2]+"</td></tr></table>");
							}
				        }
			        }
			   	 	else{//这是拼音
						if( this.suggestType.length==0 || this.suggestType == "") {
							u.innerHTML=arr[i];
						}
				        else {
				        	if(document.getElementById("keyword")!=null){
					        	var keyword = document.getElementById("keyword").value;
					        	var keywordnew = arr[i];
					        	keywordnew = replaceAll(keywordnew,keyword,"<font color='red'>"+keyword+"</font>");
								u.innerHTML=("<table border='0px' style='width:100%;' id='tb_"+i+"'><tr id='tr_"+
								arr[i][1]+"'><td valign='top' style='width:100%' id='td_"+i+"' " +
								"value ="+arr[i]+">"+keywordnew+"</td></tr></table>");
				        	}else{
				        		u.innerHTML=("<table border='0px' style='width:100%;' id='tb_"+i+"'><tr id='tr_"+
								arr[i][1]+"'><td valign='top' style='width:100%' id='td_"+i+"' " +
								"value ="+arr[i]+">"+arr[i]+"</td></tr></table>");
				        	}
					    }	
			   		}
		        // End 
			        cdiv.appendChild(u);
			        if( i>10 && this.suggestType.length!=0 && this.suggestType == "city") {
			       		var ua=document.createElement("div");
			       		ua.style.textAlign = "right";
			       		ua.style.padding = "2px";
			        	//var lessArr=[];
			        	//lessArr.push("<a class=\"morecityspan\" style = 'color:#000000;' href ='javascript:void(0)' id=\"moreCityA\" onmousedown=\"window.open('/help/city.html','_blank')\">更多&nbsp;&raquo;</a>");
			        	//ua.innerHTML = lessArr.join("");
			        	//cdiv.appendChild(ua);
			        	break;
		        	}
	      		}
			}
		}else{
			for(var i=0; i<nlen; i++)
		{
	        var u=document.createElement("DIV");
	        u.id = "s_" + i;//arr[i].id;
	        u.style.fontSize = "13px";
	        u.style.width = "100%";
	        if(isArrayList) {
		    	if(this.inputField.getAttribute("isshengccid") != "")//如果是根据CCID来列表
					u.setAttribute("value",arr[i+2]);
				else
	         		u.setAttribute("value",arr[i][2]);
	        }
	   	 	else{
				u.setAttribute("value",arr[i]);
	   	 	}
		
	        var eventWrapper = function(obj)
	        {
	            return function()
	            {
	                obj.MOver(obj);
	            }
	        }
			u.onmouseover = eventWrapper(this);
        

	        eventWrapper = function(obj)
	        {
	            return function()
	            {
	                obj.MDown(obj);
	            }
	        }
	        u.onmousedown = eventWrapper(this);
	
	        eventWrapper = function(obj)
	        {
	            return function()
	            {
	                obj.MOut(obj);
	            }
	        }
	        u.onmouseout = eventWrapper(this);
		
	        if(isArrayList){//这是城市
				if( this.suggestType.length==0 || this.suggestType == "") {
			    	if(this.inputField.getAttribute("isshengccid") != "")//如果是根据CCID来列表
						u.innerHTML=arr[i+2];
			    	else
						u.innerHTML=arr[i][2];
				}
		        else {
			    	if(this.inputField.getAttribute("isshengccid") != "")//如果是根据CCID来列表
					{
						u.innerHTML=("<table border='0px' style='width:100%;' id='tb_"+i+"'><tr id='tr_"+
						arr[i+2]+"'><td valign='top' style='width:100%' id='td_"+i+"' " +
						"value ="+arr[i+2]+">"+arr[i+2]+"</td></tr></table>");
					}
			    	else
			    	{
						u.innerHTML=("<table border='0px' style='width:100%;' id='tb_"+i+"'><tr id='tr_"+
						arr[i][1]+"'><td valign='top' style='width:100%' id='td_"+i+"' " +
						"value ="+arr[i][2]+">"+arr[i][2]+"</td></tr></table>");
					}
		        }
	        }
	   	 	else{//这是拼音
				if( this.suggestType.length==0 || this.suggestType == "") {
					u.innerHTML=arr[i];
				}
		        else {
					u.innerHTML=("<table border='0px' style='width:100%;' id='tb_"+i+"'><tr id='tr_"+
					arr[i][1]+"'><td valign='top' style='width:100%' id='td_"+i+"' " +
					"value ="+arr[i]+">"+arr[i]+"</td></tr></table>");
		        }
	   		}
        // End 
	        cdiv.appendChild(u);
	        if( i>10 && this.suggestType.length!=0 && this.suggestType == "city") {
	       		var ua=document.createElement("div");
	       		ua.style.textAlign = "right";
	       		ua.style.padding = "2px";
	        	//var lessArr=[];
	        	//lessArr.push("<a class=\"morecityspan\" style = 'color:#000000;' href ='javascript:void(0)' id=\"moreCityA\" onmousedown=\"window.open('/help/city.html','_blank')\">更多&nbsp;&raquo;</a>");
	        	//ua.innerHTML = lessArr.join("");
	        	//cdiv.appendChild(ua);
	        	break;
	        }
      }
		}
	}else{
		for(var i=0; i<nlen; i++)
		{
	        var u=document.createElement("DIV");
	        u.id = "s_" + i;//arr[i].id;
	        u.style.fontSize = "13px";
	        u.style.width = "100%";
	        if(isArrayList) {
		    	if(this.inputField.getAttribute("isshengccid") != "")//如果是根据CCID来列表
					u.setAttribute("value",arr[i+2]);
				else
	         		u.setAttribute("value",arr[i][2]);
	        }
	   	 	else{
				u.setAttribute("value",arr[i]);
	   	 	}
		
	        var eventWrapper = function(obj)
	        {
	            return function()
	            {
	                obj.MOver(obj);
	            }
	        }
			u.onmouseover = eventWrapper(this);
        

	        eventWrapper = function(obj)
	        {
	            return function()
	            {
	                obj.MDown(obj);
	            }
	        }
	        u.onmousedown = eventWrapper(this);
	
	        eventWrapper = function(obj)
	        {
	            return function()
	            {
	                obj.MOut(obj);
	            }
	        }
	        u.onmouseout = eventWrapper(this);
		
	        if(isArrayList){//这是城市
				if( this.suggestType.length==0 || this.suggestType == "") {
			    	if(this.inputField.getAttribute("isshengccid") != "")//如果是根据CCID来列表
						u.innerHTML=arr[i+2];
			    	else
						u.innerHTML=arr[i][2];
				}
		        else {
			    	if(this.inputField.getAttribute("isshengccid") != "")//如果是根据CCID来列表
					{
						u.innerHTML=("<table border='0px' style='width:100%;' id='tb_"+i+"'><tr id='tr_"+
						arr[i+2]+"'><td valign='top' style='width:100%' id='td_"+i+"' " +
						"value ="+arr[i+2]+">"+arr[i+2]+"</td></tr></table>");
					}
			    	else
			    	{
						u.innerHTML=("<table border='0px' style='width:100%;' id='tb_"+i+"'><tr id='tr_"+
						arr[i][1]+"'><td valign='top' style='width:100%' id='td_"+i+"' " +
						"value ="+arr[i][2]+">"+arr[i][2]+"</td></tr></table>");
					}
		        }
	        }
	   	 	else{//这是拼音
				if( this.suggestType.length==0 || this.suggestType == "") {
					u.innerHTML=arr[i];
				}
		        else {
					u.innerHTML=("<table border='0px' style='width:100%;' id='tb_"+i+"'><tr id='tr_"+
					arr[i][1]+"'><td valign='top' style='width:100%' id='td_"+i+"' " +
					"value ="+arr[i]+">"+arr[i]+"</td></tr></table>");
		        }
	   		}
        // End 
	        cdiv.appendChild(u);
	        if( i>10 && this.suggestType.length!=0 && this.suggestType == "city") {
	       		var ua=document.createElement("div");
	       		ua.style.textAlign = "right";
	       		ua.style.padding = "2px";
	        	//var lessArr=[];
	        	//lessArr.push("<a class=\"morecityspan\" style = 'color:#000000;' href ='javascript:void(0)' id=\"moreCityA\" onmousedown=\"window.open('/help/city.html','_blank')\">更多&nbsp;&raquo;</a>");
	        	//ua.innerHTML = lessArr.join("");
	        	//cdiv.appendChild(ua);
	        	break;
	        }
      }
	}
      this.selectSuggestIndex = -1;
      this.showsuggestDiv();
      this.getTagCountByName(this.suggestDiv);
    }

    this.getTagCountByName = function (tag){
        var count = tag.getElementsByTagName(this.divTag);
        this.endIndex = count.length-1;
    }
    this.clearStyle = function (){
        if (this.selectSuggestIndex>=0)
        {
            if(document.getElementById("s_"+this.selectSuggestIndex)){
                document.getElementById("s_"+this.selectSuggestIndex).style.background="";
                document.getElementById("s_"+this.selectSuggestIndex).style.color="";
            }
        }
    }
    //**************************鼠标经过事件*********************************
    this.MDown=function(instance){
        var e = this.MDown.caller.arguments[0] || window.event;
        var srcElement = e.srcElement || e.target;
        var value = document.getElementById(srcElement.id).innerHTML;
        if(get_amalgamation(cityNumber)){
        	if(value.indexOf("<FONT color=red>")!=-1){
	        	value = replaceAll(value,"<FONT color=red>",""); 		
        	}
        	if(value.indexOf("</FONT>")!=-1){
	        	value = replaceAll(value,"</FONT>",""); 		
        	}
        }
        var nIndex = value.indexOf('</TD>');
        if(nIndex>-1)
        {
        	nIndex = value.indexOf('value=');
        	value = value.substr(nIndex+7);
        	nIndex = value.indexOf('"');
        	//alert(value.substr(0,nIndex));
        	value = value.substr(0,nIndex);
        }
//    	alert(srcElement.innerHTML);
    	//alert(value);
    	if( nIndex < 0 )
    	{
	        if(this.suggestType=="city") {
	         	value = document.getElementById(srcElement.id).getAttribute("value");
	        }
	    	else if(this.suggestType=="pinyinkey"){
	         	//value = document.getElementById(srcElement.id).getAttribute("value");
	    	}
    	}
        instance.selectEntry(value);
        instance.hidesuggestDiv();
    }
    
    this.MOver=function(instance){
        instance.clearStyle();
        var e = this.MOver.caller.arguments[0] || window.event;
        var srcElement = e.srcElement || e.target;
        var s_id = srcElement.id.substring(2);
        if( this.suggestType.length!=0 && this.suggestType=="city" )  {
        	s_id = srcElement.id.split("_")[1];
        }
    	else if( this.suggestType.length!=0 && this.suggestType=="pinyinkey"){
         	s_id = srcElement.id.split("_")[1];
    	}
        instance.highlightNewValue(s_id,"Mouse");
    }
    
    this.MOut=function(instance){
        var e = this.MOut.caller.arguments[0] || window.event;
        var srcElement = e.srcElement || e.target;
        instance.setStyleForPerElement(srcElement.id);
    };


    //初始化
    this.initACPartTwo();
}

mapbarInputSuggest.bind = function(posturl,requestMode,requestDelegate)
{
    var elements = document.getElementsByTagName("input");
    for(var i=0;i<elements.length;i++)
    {
        if (elements[i].type == "text" && elements[i].getAttribute("issuggest")=="yes")
        {
			var selectdone_callback = elements[i].getAttribute("selectdone_callback");
            new mapbarInputSuggest({inputid: elements[i].id,requestMode:requestMode,requestDelegate: requestDelegate,selectDoneCbk: selectdone_callback});
        }
    }
}
