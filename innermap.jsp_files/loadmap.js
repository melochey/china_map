/*
 * ���JS�ļ����������Ƶ����ĸ���Ӧ�̵ĵ�ͼ���Լ���ȡ��ͼ��λ�õ�
 * ֻ���ñ�����������JS����Ϊ��������JS�Ļ�����·��������
 * �޺���
 * V1.0
 * 2009-3-6
 */

//
/*��g_jsLoc������������ƴ�����ȡͼ
 *
*/
var nEngineCode = 3;//�������������Ҹ�ֵ��˵��ʹ�õ�����һ������
var strImgsvrUrl = "http://172.16.21.202:8082/maplite/";
var strMapsvrUrl = "http://172.16.21.202:8082/api/";
//if( g_jsLoc == "240" )
//{//�ӻ��أ�����
//	nEngineCode = 2;
//}
//else
{//����һ��Ĭ�ϵģ�Ĭ�Ͼ��Ǵӱ���ȡMapbar��ͼ������������û�е�ͼ��ʾ
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
	['HETCJFZVVHUWR','HETCJFZVVHUWR','116.39199,39.90619','HETCJFZVVHUWR','100','������'],
	['IEGDVEZVGBWWJ','IEGDVEZVGBWWJ','118.7719,32.04275','IEGDVEZVGBWWJ','250','�Ͼ���'],
	['IJCVRVZVFJFGJ','IJCVRVZVFJFGJ','120.16483,30.2951','IJCVRVZVFJFGJ','571','������'],
	['HTGDIUXWTEBHG','HTGDIUXWTEBHG','123.40185,41.91645','HTGDIUXWTEBHG','240','������']
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


