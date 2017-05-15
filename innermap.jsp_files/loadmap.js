/*
 * 这个JS文件是用来控制调用哪个供应商的地图，以及读取地图的位置的
 * 只设置变量，不加载JS，因为这样加载JS的话会有路径的问题
 * 崔宏威
 * V1.0
 * 2009-3-6
 */

//
/*用g_jsLoc这个变量来控制从哪里取图
 *
*/
var nEngineCode = 3;//声明变量，并且赋值，说明使用的是哪一个引擎
var strImgsvrUrl = "http://172.16.21.202:8082/maplite/";
var strMapsvrUrl = "http://172.16.21.202:8082/api/";
//if( g_jsLoc == "240" )
//{//从基地，辽宁
//	nEngineCode = 2;
//}
//else
{//设置一个默认的，默认就是从北京取Mapbar的图，这样不至于没有地图显示
	if(typeof strMapIP=="undefined" || strMapIP == null || strMapIP.length<=0)
	{
		strImgsvrUrl = "http://172.16.24.40/maplite/";
		strMapsvrUrl = "http://172.16.24.40/api/";
	}
	else
	{
		strImgsvrUrl = "http://"+strMapIP+"/maplite/";
		strMapsvrUrl = "http://"+strMapIP+"/api/";
	}
}


function getCenterByCCID(nCCID)
{
	var arCCID2LL = new Array();
	arCCID2LL = [
	['HETCJFZVVHUWR','HETCJFZVVHUWR','116.39199,39.90619','HETCJFZVVHUWR','100','北京市'],
	['IEGDVEZVGBWWJ','IEGDVEZVGBWWJ','118.7719,32.04275','IEGDVEZVGBWWJ','250','南京市'],
	['IJCVRVZVFJFGJ','IJCVRVZVFJFGJ','120.16483,30.2951','IJCVRVZVFJFGJ','571','杭州市'],
	['HTGDIUXWTEBHG','HTGDIUXWTEBHG','123.40185,41.91645','HTGDIUXWTEBHG','240','沈阳市']
	];
	
	var strInfo = arCCID2LL[0][nEngineCode];
	var nLen = arCCID2LL.length;
 	for(var i = 0 ; i < nLen ; i ++ )
	{
		if(nCCID == arCCID2LL[i][4])
		{
			strInfo = arCCID2LL[i][nEngineCode];
			break;
		}
	}
	
	return strInfo;
}


