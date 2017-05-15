
var ok_obj = null;
var ok = null;
var ele = null;
var w=null;
var n=10,t=10;  
var timers = new Array(n);
var k=0;
var blog = 0;
function doSlide(s,lr,lrvalue){
	//alert(lrvalue);
	ok_obj = document.getElementById("content").getElementsByTagName("LI")
	ok = Math.ceil(ok_obj.length/5)-1
	ele=document.getElementById("description");
	w=ele.clientWidth/5;
	blog = blog + s;
	//doSlide(0);
	lrvalue = lrvalue -5;
	if (blog<0 || blog >lrvalue){
		if(lr=='r'){
			blog = blog - 1;
		}else{
			blog = blog + 1;
		}
	}else{
		if(blog == lrvalue) document.getElementById("img_r").style.filter = "alpha(opacity=30)";
		else if(blog == 0) document.getElementById("img_l").style.filter = "alpha(opacity=30)";
		else {
			document.getElementById("img_l").style.filter = "alpha(opacity=100)";
			document.getElementById("img_r").style.filter = "alpha(opacity=100)";
		}
		
		k+=s;
	    var x=ele.scrollLeft;
	    var d=k*w-x;
	    for(var i=0;i<n;i++)(
	    	function(){
	    		if(timers[i]) clearTimeout(timers[i]);
	    		var j=i;
	    		timers[i]=setTimeout(
	    			function(){
	    				ele.scrollLeft=x+Math.round(d*Math.sin(Math.PI*(j+1)/(2*n)));
	    			},(i+1)*t);
    		}
    	)();
	}
}