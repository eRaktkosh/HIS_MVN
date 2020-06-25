var globalKeyCode="";
var globalOnClick="";
var counter=0;
var xmlHttp;
var req;


/**************************Drag Drop*********************************/
 // mouse starting positions
var _startX = 0;
var _startY = 0;

// current element offset
var _offsetX = 0;
var _offsetY = 0;

var fMouseDown=false;
// needs to be passed from OnMouseDown to OnMouseMove
var _dragElement;

// we temporarily increase the z-index during drag
var _oldZIndex = 0;

_dragFagFirst=false;
function InitDragDrop() {

	document.onmousedown = OnMouseDown;
	document.onmouseup = OnMouseUp;
}


function OnMouseDown(e) {
	fMouseDown=true;
// IE is retarded and doesn't pass the event object

if (e == null) e = window.event;
// IE uses srcElement, others use target

var target = e.target != null ? e.target : e.srcElement;
 // _debug.innerHTML = target.className == 'drag' ? 'draggable element clicked' : 'NON-draggable element clicked';
// for IE, left click == 1 // for Firefox, left click == 0
if ((e.button == 1 && window.event != null || e.button == 0) && target.className == 'drag') {
_dragFagFirst=true
// grab the mouse position
_startX = e.clientX;
_startY = e.clientY;

// grab the clicked element's position
_offsetX = ExtractNumber(target.style.left);
_offsetY = ExtractNumber(target.style.top);

// bring the clicked element to the front while it is being dragged

_oldZIndex = target.style.zIndex;
target.style.zIndex = 10000;

// we need to access the element in OnMouseMove
_dragElement = target;


var allCheckBox=document.getElementsByName("chk");
for(var nTmpI=0;nTmpI<allCheckBox.length;nTmpI++){
	if(allCheckBox[nTmpI].value.split("$")[0]==_dragElement.name){
		allCheckBox[nTmpI].checked=true;
		break;
	}
}



// tell our code to start moving the element with the mouse
document.onmousemove = OnMouseMove;

// cancel out any text selections
document.body.focus();

// prevent text selection in IE
document.onselectstart = function () { return false; };

// prevent IE from trying to drag an image

target.ondragstart = function() { return false; };

// prevent text selection (except IE)

return false;
}
}

function mouseCoords(e){
	if(e.pageX || e.pageY){
		return {x:e.pageX, y:e.pageY};
	}
	return {
		x:e.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:e.clientY + document.body.scrollTop  - document.body.clientTop
	};
}

var gblMsgVal = "";

function OnMouseMove(e) {
	try{
		if(_dragFagFirst){
			var dynDivObj = document.createElement("div");
			dynDivObj.setAttribute("id","DragObj");
			dynDivObj.className="dragDiv";
			var allCheckBox=document.getElementsByName("chk");
			var countCheckedRow=0;
			for(var nTmpI=0;nTmpI<allCheckBox.length;nTmpI++){
				if(allCheckBox[nTmpI].checked==true)
					countCheckedRow++;
			}
			dynDivObj.innerHTML="<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '> &nbsp;&nbsp;&nbsp;"+
			countCheckedRow
			+" Record(s) Selected </div></div></div>";
	
			document.forms[0].appendChild(dynDivObj);
			
			gblMsgVal = document.getElementById("DragTableTDId").innerHTML;
			
			_dragFagFirst=false;
		}
	}catch(e){
		alert(e);
	}
	if (e == null) var e = window.event;
	var mousePos = mouseCoords(e);
	
	
	
	for(var i=0; i<dropTargets.length; i++){
		var curTarget  = dropTargets[i];
		var targPos    = getPosition(curTarget);
		var targWidth  = parseInt(curTarget.offsetWidth);
		var targHeight = parseInt(curTarget.offsetHeight);

		if(
			(mousePos.x > targPos.x)                &&
			(mousePos.x < (targPos.x + targWidth))  &&
			(mousePos.y > targPos.y)                &&
			(mousePos.y < (targPos.y + targHeight))){
						_dragElement.style.left=_offsetX;
						_dragElement.style.top=_offsetY;
			
							
			var strImageName=dropTargets[i].src.split("/")[dropTargets[i].src.split("/").length-1];
						
			if(strImageName=="Modify.gif"){
				document.getElementById("DragTableTDId").innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;Drop Here To Modify Record.";
				break;
			}else if(strImageName=="Delete.gif"){
				document.getElementById("DragTableTDId").innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;Drop Here To Delete Record(s).";
				break;
			}else if(strImageName=="View.gif"){
				document.getElementById("DragTableTDId").innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;Drop Here To View Record.";
				break;
			}else{
				
			}	
		}else{
			
			document.getElementById("DragTableTDId").innerHTML = gblMsgVal;
		}
	}
	
	
	
	// this is the actual "drag code"
	var dragDivObj = document.getElementById("DragObj");
	dragDivObj.style.left = (mousePos.x-6)+ 'px';//(_offsetX + e.clientX - _startX) + 'px';
	dragDivObj.style.top = (mousePos.y-12)+ 'px';//(_offsetY + e.clientY - _startY) + 'px';
	//_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
	//_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
	
	//_debug.innerHTML = '(' + _dragElement.style.left + ', ' + _dragElement.style.top + ')';
		
	 }

var dropTargets = [];

function addDropTarget(dropTarget){
	dropTargets.push(dropTarget);
}
function getPosition(e){
	var left = 0;
	var top  = 0;
	while (e.offsetParent){
		left += e.offsetLeft;
		top  += e.offsetTop;
		e     = e.offsetParent;
	}

	left += e.offsetLeft;
	top  += e.offsetTop;

	return {x:left, y:top};
}


function OnMouseUp(e) {
	fMouseDown=false;
	if(_dragElement){
	if (e == null) e = window.event;
	if (_dragElement != null) {
		_dragElement.style.zIndex = _oldZIndex;
		document.onmousemove = null;
		document.onselectstart = null;
		_dragElement.ondragstart = null;
	}

	var mousePos = mouseCoords(e);

	for(var i=0; i<dropTargets.length; i++){
		var curTarget  = dropTargets[i];
		var targPos    = getPosition(curTarget);
		var targWidth  = parseInt(curTarget.offsetWidth);
		var targHeight = parseInt(curTarget.offsetHeight);

		if(
			(mousePos.x > targPos.x)                &&
			(mousePos.x < (targPos.x + targWidth))  &&
			(mousePos.y > targPos.y)                &&
			(mousePos.y < (targPos.y + targHeight))){
						_dragElement.style.left=_offsetX;
						_dragElement.style.top=_offsetY;
				curTarget.onclick();
		}
	}
	var allCheckBox=document.getElementsByName("chk");
	for(var nTmpI=0;nTmpI<allCheckBox.length;nTmpI++){
		allCheckBox[nTmpI].checked=false;
		var strTmpId="tr"+(nTmpI+1);
		document.getElementById(strTmpId).className="ONMOUSEOUT1";
	}
	try{
		_dragElement.style.left=_offsetX;
		_dragElement.style.top=_offsetY;
		_dragElement = null;
	}catch(e){
	}
	try{
		document.forms[0].removeChild(document.getElementById("DragObj"));
	}catch(e){
		document.getElementById("DragObj").removeNode(true);
	}
	_dragFagFirst=true;
}
}

function ExtractNumber(value) {
		 var n = parseInt(value);
		 return n == null || isNaN(n) ? 0 : n; }

		 // this is simply a shortcut for the eyes and fingers

		 //function $(id) { return document.getElementById(id); }


function showAlert(content){

	

	document.forms[0].submit();

}
/*************************************Drag Drop Ends****************************************?





/*
	Color for Pagination (1,2..)
*/
var defColor = "white";
var selColor = "#653232";

function createRequestObject()
	{
		
		var xmlhttp = false;
	   try	
		{
 			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
 		catch (e)
 		{
  			try {
  				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	  		   } 
  			catch (E){
   				xmlhttp = false;
  		}
	 	     }
		if (!xmlhttp && typeof XMLHttpRequest !='undefined')
			{
			xmlhttp = new XMLHttpRequest();
			 }
  		 
	   return xmlhttp;
	}


function GetXmlHttpObject(handler)
	{ 
		var objXmlHttp=null

		if (navigator.userAgent.indexOf("Opera")>=0)
		{
			alert("This Example Doesn't Work In Opera") 
			return 
		}
		if (navigator.userAgent.indexOf("MSIE")>=0)
		{ 
			var strName="Msxml2.XMLHTTP"
			if (navigator.appVersion.indexOf("MSIE 5.5")>=0)
			{
			strName="Microsoft.XMLHTTP"
			} 
			try
			{ 
			objXmlHttp=new ActiveXObject(strName)
			objXmlHttp.onreadystatechange=handler 
			return objXmlHttp
			} 
			catch(e)
			{ 
			alert("Error. Scripting For ActiveX Might Be Disabled") 
			return 
			} 
		} 
		if (navigator.userAgent.indexOf("Mozilla")>=0)
		{
			objXmlHttp=new XMLHttpRequest()
			objXmlHttp.onload=handler
			objXmlHttp.onerror=handler 
			return objXmlHttp
		}
	}
	
function closeWindow() {
window.open('','_parent','');
window.close();
}

	
	

function fetchRecords(index,rowNum,prevNext,cnt)
{
	
	var tempRowNum = rowNum;
//	alert('fecg');
    xmlHttp=createRequestObject();
	
 	if(rowNum==null)rowNum='0';
	if(index==null) index="0^1^0";
	   
	obj=index.split("^");
	var blockNo=obj[1];
	
	if(prevNext==null) prevNext='1';
	
	var order				=	null;
	var search				=	null;
	var str 				=	"";
	var no_of_combo			=	0;
	 
	
	var cmb1				=	document.getElementsByName("cmb");
	var searchColumn		=	0;
		
	if(typeof(document.forms[0].search) !="undefined") searchVal=document.forms[0].search.value;
	if(typeof(document.forms[0].orderby) !="undefined") order=document.forms[0].orderby.value;
	if(typeof(document.forms[0].searchColumn) !="undefined") searchColumn=document.forms[0].searchColumn.value;
	if(typeof(document.forms[0].no_of_combo) !="undefined") no_of_combo=document.forms[0].no_of_combo.value;
	if(typeof(document.forms[0].module_id) !="undefined") module_id=document.forms[0].module_id.value;
	
		
		
		 
	var combo				=	document.forms[0].combo;	
	//either first time page is loaded or return from report/add/modify page
	if(cmb1.length > 0 && typeof(combo) == "undefined")
	{
		//when the list page is loaded then no_of_combo will be null
		if(no_of_combo == null || no_of_combo == 0 || no_of_combo == 'null') 
		{
			no_of_combo = cmb1.length;
		}
		
		if(no_of_combo > 0) 
		{
			for(var i=0;i<cmb1.length;i++)
					str += "&combo="+cmb1[i].value;
		}
		
	}
	else
	{
		if(typeof(combo) != "undefined" && no_of_combo > 0)
		{
			if(no_of_combo > 1)
			{
				for(var i=0;i<combo.length;i++)
					str += "&combo="+combo[i].value;
			}
			else
			{
				str= "&combo="+combo.value;
			}
		}
	}
		
	//var params="../../"+document.forms[0].cnt_page.value+".cnt?hmode=LISTPAGE"+str+"&searchColumn="+searchColumn+"&search="+search+"&blockNo="+blockNo+"&prevNext="+prevNext+"&rowNum="+rowNum+"&orderby="+order+"&date="+new Date().getTime();
	var params= './../'+module_id+'/list'+cnt+'.action?searchColumn='+searchColumn+"&search="+search+"&blockNo="+blockNo+"&prevNext="+prevNext+"&rowNum="+rowNum+"&orderby="+order+str;
		
	
	xmlHttp.open('POST',params,true);
	document.getElementById('start').innerHTML ="<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '><b>Wait Fetching Data from Database...</b></div></div></div>";
	
	
	
	xmlHttp.onreadystatechange = function()
	{
		
		if(xmlHttp.readyState == 4)
		{
			if(xmlHttp.status =='200')
			{
				
							//	alert(request.getSession().getAttribute("characters"));
				
				document.getElementById("message").style.display	=	'none';
				var response 		= 	xmlHttp.responseText;	
				//alert(xmlHttp.responseText)					
				var responseData	=	response.split("####");
				//check for error
				if (responseData[0] == "ERROR") {
					document.getElementById('start').innerHTML = "";
					document.getElementById("message").style.display	=	'block';
					document.getElementById('message').innerHTML 	= "<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '><font color = 'red'><b>" + responseData[1] + "</b></font></div></div></div>";
				}
				else {
					document.getElementById("start").innerHTML 		= 	responseData[4];
					document.forms[0].record_per_page.value			=	responseData[0];
					document.forms[0].no_of_combo.value				=	responseData[1];
					document.forms[0].actual_page_block.value		=	responseData[2];
					document.forms[0].totalpage.value				=	responseData[3];
					document.getElementById("searchid").innerHTML 	= 	responseData[5];
					document.getElementById("footer").style.display	=	'block';
					document.getElementById("searchid").style.display=	'block';
				
					
					document.forms[0].divisionId.value="a1";      // diveision id name =a1  in which data is populated 
						
					if(document.getElementById("bba1") !=null) {
						document.getElementById("bba1").style.color=selColor;
					}
				}
				try{
			     	autoTabIndexing();
			    }catch(_Err){
			     //	alert("Application Error[TabIndex not Included] Please Contact System Administrator");
			 	}					
			}	// if(xmlHttp.status == 200 || xmlHttp.status=='complete') closed
		}
	}	

	xmlHttp.send(null);
 	
}//main method closed

function fetchRecordsCombo(cmbIndex)
{
	//alert("Inside Fetch Records Combo");
	//alert(cmbIndex);
	var rowNum			=	'0';
	var blockNo			=	1;
	var searchVal		=	document.forms[0].search.value;
	var searchColumn	= 	document.forms[0].searchColumn.value;
	var no_of_cmb		=	document.forms[0].no_of_combo.value;
	var combo			=	document.forms[0].combo;
	var cmb1			=	document.forms[0].cmb;
	var module_id		=	document.forms[0].module_id.value;
	var test			= 	new Array();
	var str 			= 	"";
	var cnt 			= document.forms[0].cnt_page.value;

		var search = "";

	var searchContent = searchVal.split('%');

	for(var index=0 , stopIndex = searchContent.length ; index< stopIndex; index++) {
		
		 if(index == 0){
		 	
		 	search = searchContent[index];
		 	
		 }else{
		 	
		 	search = search + "$" + searchContent[index];
		 }
		
	}
		
	//alert(no_of_cmb);

	//if(no_of_cmb> 1){
	//	for(var i=cmbIndex+1;i <no_of_cmb;i++)	{
	//	 	document.forms[0].combo[i].selectedIndex=0;
	//	}	// for loop closed
    //}  // if conditions

	if(no_of_cmb> 1){   
			for(var i=0;i<combo.length;i++)
			  str += "&combo="+combo[i].value;
	}// if condition
	else {
		if(combo !=null)
		 	str= "&combo="+combo.value;
	}
	
	/*
	var params="../../"+document.forms[0].cnt_page.value+".cnt?hmode=DEFAULT"+str+"&searchColumn="+searchColumn+"&search="+search+
			"&rowNum="+rowNum+"&blockNo="+blockNo;
	*/
	//var params=document.forms[0].action + "?hmode=DEFAULT"+str+"&searchColumn="+searchColumn+"&search="+search+"&rowNum="+rowNum+"&blockNo="+blockNo;
	
	var params= './../'+module_id+'/defaultActive'+cnt+'.action?searchColumn='+searchColumn+"&search="+search+"&blockNo="+blockNo+"&rowNum="+rowNum+str;
	
	//alert(" fetchRecordsCombo :  "+params);	
	
	xmlHttp.open("POST",params,true);
	document.getElementById('start').innerHTML = "<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '><b>Wait Fetching Data from Database...</b></div></div></div>";
	
	xmlHttp.onreadystatechange = function()
	{	
		if(xmlHttp.readyState == 4)
		{
			if(xmlHttp.status =='200')
			{
				document.getElementById("message").style.display	=	'none';
				
				var response 		= 	xmlHttp.responseText;
				var responseData	=	response.split("####");							
				
				//check for error
				if (responseData[0] == "ERROR") {
					document.getElementById('start').innerHTML = "";
					document.getElementById("message").style.display	=	'block';
					document.getElementById('message').innerHTML 	= "<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '><font color = 'red'><b>" + responseData[1] + "</b></font></div></div></div>";
				}
				else
				{
					document.forms[0].record_per_page.value			=	responseData[0];
					document.forms[0].no_of_combo.value				=	responseData[1];
					document.forms[0].actual_page_block.value		=	responseData[2];
					document.forms[0].totalpage.value				=	responseData[3];
					document.getElementById("start").innerHTML 		= 	responseData[4];
					document.getElementById("searchid").innerHTML	= 	responseData[5];
					document.getElementById("message").style.display=	'none';
					document.getElementById("footer").style.display =	'block';
					document.forms[0].divisionId.value				=	"a1";
				
					if(document.getElementById("bba1") !=null){
						document.getElementById("bba1").style.color=selColor;
					}// if closed
				}
				try{
			     	autoTabIndexing();
			    }catch(_Err){
			     //	alert("Application Error[TabIndex not Included] Please Contact System Administrator");
			 	}
			}// if(xmlHttp.status == 200 || xmlHttp.status=='complete') closed
		}// if(xmlHttp.readyState == 4) closed
	 } // function () closed	 
	 
    xmlHttp.send(params);
    try{
     	autoTabIndexing();
    }catch(_Err){
    // 	alert("Application Error[TabIndex not Included] Please Contact System Administrator");
 	}
}//main method closed


/*
* function sortData(index) is called when user click on order by image 
*/
	
function sortData(index)
{
	var rowNum			=	'0';
	var blockNo			=	1;
	var searchVal		=	document.forms[0].search.value;
	var searchColumn	= 	document.forms[0].searchColumn.value;
	var combo			=	document.forms[0].combo;
	var cmb1			=	document.forms[0].cmb;
	var module_id		=	document.forms[0].module_id.value;
	
	var test			= 	new Array();
	var str 			= 	"";
	document.getElementById("orderById").value	=	index;
	document.getElementById("message").style.display	=	'none';
	
	
		var search = "";

	var searchContent = searchVal.split('%');

	for(var index1=0 , stopIndex = searchContent.length ; index1< stopIndex; index1++) {
		
		 if(index1 == 0){
		 	
		 	search = searchContent[index1];
		 	
		 }else{
		 	
		 	search = search + "$" + searchContent[index1];
		 }
		
	}
		
	
	
	if(document.forms[0].no_of_combo.value > 1)
	{
		for(var i=0;i<combo.length;i++)
			str += "&combo="+combo[i].value;
	}
	else 
	{
		if(combo !=null) str= "&combo="+combo.value;
	}
	//alert(str);
	//var params=document.forms[0].action + "?hmode=DEFAULT"+str+"&searchColumn="+searchColumn+"&search="+search+"&orderby="+index+"&rowNum=0&prevNext=0&blockNo=0";
	var params= './../'+module_id+'/list'+document.forms[0].cnt_page.value+'.action?searchColumn='+searchColumn+"&search="+search+"&blockNo=0&prevNext=0&rowNum=0&orderby="+index+str;
	
	xmlHttp.open("POST",params,true);
	document.getElementById('start').innerHTML = "<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '><b>Wait Fetching Data from Database...</b></div></div></div>";
	
	xmlHttp.onreadystatechange = function()
	{
		if(xmlHttp.readyState == 4)
		{
			if(xmlHttp.status == 200)
			{
				var response 		= 	xmlHttp.responseText;
				var responseData	=	response.split("####");
				
				//check for error
				if (responseData[0] == "ERROR") {
					document.getElementById('start').innerHTML = "";
					document.getElementById("message").style.display	=	'block';
					document.getElementById('message').innerHTML 	= "<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '><font color = 'red'><b>" + responseData[1] + "</b></font></div></div></div>";
				}
				else {
					document.forms[0].record_per_page.value			=	responseData[0];
					document.forms[0].no_of_combo.value				=	responseData[1];
					document.forms[0].actual_page_block.value		=	responseData[2];
					document.forms[0].totalpage.value				=	responseData[3];
					document.getElementById("start").innerHTML 		= 	responseData[4];
					document.getElementById("searchid").innerHTML	= 	responseData[5];
					document.getElementById("message").style.display=	'none';
					document.getElementById("footer").style.display =	'block';
					document.forms[0].divisionId.value				=	"a1";
						
					if(document.getElementById("bba1") !=null){
						document.getElementById("bba1").style.color=selColor;
					}
				}
				try{
			     	autoTabIndexing();
			    }catch(_Err){
			     //	alert("Application Error[TabIndex not Included] Please Contact System Administrator");
			 	}
			}// if(xmlHttp.status == 200 || xmlHttp.status=='complete') closed
		}// if(xmlHttp.readyState == 4) closed
	} // function () closed	 
    xmlHttp.send(params);
}//main method closed


function searchpage(){

		
	var mode			=	'SEARCH';
	var test   			= 	new Array(); 
	var combo1			=	"";  
	var str    			= 	"";
	var searchColumn	= 	document.forms[0].searchColumn.value;
	var searchVal		=	document.forms[0].search.value;
	var module_id		=	document.forms[0].module_id.value;
	
	var blockNo			=	1;
	var rowNum			=	0;
	var prevNext		=	1; 

	var search = "";

	var searchContent = searchVal.split('%');

	for(var index=0 , stopIndex = searchContent.length ; index< stopIndex; index++) {
		
		 if(index == 0){
		 	
		 	search = searchContent[index];
		 	
		 }else{
		 	
		 	search = search + "$" + searchContent[index];
		 }
		
	}


	document.getElementById("message").style.display	=	'none';
	
	if(	document.getElementsByName("combo") !=null)
		combo1 	= 	document.getElementsByName("combo");
	else
 		 combo1 =	0;

	for(var i=0;i<combo1.length;i++)
		str += "&combo=" + combo1[i].value;
	//alert(str);
	var params= './../'+module_id+'/search'+document.forms[0].cnt_page.value+'.action?searchColumn='+searchColumn+"&search="+search+"&blockNo="+blockNo+"&prevNext="+prevNext+"&rowNum="+rowNum+str+"&date="+new Date().getTime();

//	var params="../../"+document.forms[0].cnt_page.value+".cnt?hmode=SEARCH"+str+"&searchColumn="+searchColumn+"&search="+search+"&blockNo="+blockNo+"&prevNext="+prevNext+"&rowNum="+rowNum+"&date="+new Date().getTime();	
	//var params=document.forms[0].action + "?hmode=SEARCH"+str+"&searchColumn="+searchColumn+"&search="+search+"&blockNo="+blockNo+"&prevNext="+prevNext+"&rowNum="+rowNum+"&date="+new Date().getTime();	

//alert(" searchpage :  "+params);

	xmlHttp.open("POST",params,true);
	document.getElementById('start').innerHTML = "<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '> <b>Wait Fetching Data from Database...</b></div></div></div>";
	
	xmlHttp.onreadystatechange = function()
	{
		if(xmlHttp.readyState == 4)
		{
			if(xmlHttp.status =='200' || xmlHttp.status=='complete')
			{
				var response 		=	xmlHttp.responseText;
				var responseData	=	response.split("####");
				//alert(response)
				//check for error
				if (responseData[0] == "ERROR") {
					document.getElementById('start').innerHTML = "";
					document.getElementById("message").style.display	=	'block';
					document.getElementById('message').innerHTML 	= "<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '><font color = 'red'><b>" + responseData[1] + "</b></font></div></div></div>";
				}
				else {
					document.forms[0].record_per_page.value			=	responseData[0];
					document.forms[0].no_of_combo.value				=	responseData[1];
					document.forms[0].actual_page_block.value		=	responseData[2];
					document.forms[0].totalpage.value				=	responseData[3];
					document.getElementById("start").innerHTML 		= 	responseData[4];
					document.getElementById("searchid").innerHTML 	=	responseData[5];
					document.getElementById("footer").style.display	=	'block';
					document.forms[0].divisionId.value				=	"a1";
					
					if(document.getElementById("bba1") 	!=null){
						document.getElementById("bba1").style.color	=	selColor;
					}
				}
				try{
			     	autoTabIndexing();
			    }catch(_Err){
			     //	alert("Application Error[TabIndex not Included] Please Contact System Administrator");
			 	}	
			}
		}
	}
	xmlHttp.send(params);
	return false;
}

/*
* this function called when delete button is pressed 
*
*
*/
function deleteRecords()
{
	var combo1;
	var prevNext	=	null;
	var totalChk	=	0;
	var primarykey	=	"";
	var search		=	"";
	var str			=	"";
	var str			=	"";
			
	var mode = "DELETE";
	
	var len			= 	0;
	var no_of_combo	=	0;
		
	if(typeof(document.forms[0].chk) !="undefined") len	= 	document.forms[0].chk.length;
	if(typeof(document.forms[0].no_of_combo) !="undefined") no_of_combo	=	document.forms[0].no_of_combo.value;
	if(typeof(document.forms[0].combo) !="undefined") combo1 =	document.forms[0].combo;
	
	//call in this file	 
	if(checkForDelete()==false) return ;
		 
	var divisionId		= document.forms[0].divisionId.value;
	var rec_per_page	= document.forms[0].record_per_page.value;
	var prevDivIndex 	= divisionId.substring(1,divisionId.length);
	var min_rec_len 	= parseInt(rec_per_page)*(parseInt(prevDivIndex) -1); 
	var max_rec_len 	= parseInt(rec_per_page) * parseInt(prevDivIndex);
	
	if(!isNaN(document.forms[0].chk.length))
	{
		for(var i=min_rec_len;i< max_rec_len && i < document.forms[0].chk.length;i++)
		{
			if(document.forms[0].chk[i].checked==true)
			{
				totalChk+=1;
				primarykey +=document.forms[0].chk[i].value;
		  		primarykey +="@"; // concatenating all chk value with @ symbols to a single variable to for easy manipulations like deleting the records and update
		  	}
		  }
	}
	else
		primarykey=document.forms[0].chk.value;
	
	var retValue=confirm("Selected Record (s) are being deleted\n\nAre You Sure");	 	
	if(retValue==false) return;
	
	if(prevNext	==	null) prevNext='1';
	
	if(no_of_combo >1)
		{
			for(i=0;i<combo1.length;i++)
				str += "&combo="+combo1[i].value;
		}
	else
		if(no_of_combo==1) 
			str += "&combo="+combo1.value;		
	
	
	var minrow		=	document.forms[0].minrow.value;	
	var max_rownum	=	document.forms[0].max_rownum.value;	
	var blockNo		=	document.forms[0].blockNo.value;  
	var divisionId	=	document.forms[0].divisionId.value;
	var module_id	=	document.forms[0].module_id.value;
	
	var search			=	"";
	var searchColumn	=	null;
	var rowNum			=	minrow;
	
		var params= './../'+module_id+'/delete'+document.forms[0].cnt_page.value+'.action?divisionId='+divisionId+"&searchColumn="+searchColumn+"&chk="+primarykey+"&prevNext"+prevNext+"&rowNum=0&minrow="+minrow+"&blockNo="+blockNo+"&max_rownum="+max_rownum+"&search="+search+"&searchColumn="+searchColumn;
	
	xmlHttp.open("POST",params,true);
	document.getElementById("message").style.display='block';	
	document.getElementById('start').innerHTML ="<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '><b>Wait Deleting Records...</b></div></div></div>";
	
	xmlHttp.onreadystatechange = function()
	{
		if(xmlHttp.readyState ==4 )
		{
			if(xmlHttp.status == 200 || xmlHttp.status=='complete' )
			{
				var response 		= 	xmlHttp.responseText;
				var responseData	=	new Array();
				
				responseData	=	response.split("####");
				
				//check for error
				if (responseData[0] == "ERROR") {
					document.getElementById('start').innerHTML = "";
					document.getElementById("message").style.display	=	'block';
					document.getElementById('message').innerHTML 	= "<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '><font color = 'red'><b>" + responseData[1] + "</b></font></div></div></div>";
				}
				else {
					document.getElementById('message').innerHTML 	= 	responseData[6];
					document.forms[0].record_per_page.value			=	responseData[0];
					document.forms[0].no_of_combo.value				=	responseData[1];
					document.forms[0].actual_page_block.value		=	responseData[2];
					document.forms[0].totalpage.value				=	responseData[3];
					document.forms[0].divisionId.value				=	responseData[7];
					document.getElementById("start").innerHTML 		= 	responseData[4];
					document.getElementById("searchid").innerHTML	= 	responseData[5];
					document.getElementById("footer").style.display	=	'block';
					
					if(document.getElementById("a1")!=null) {
						document.getElementById("a1").style.display		=	'none';
					}
					
					
					var	curr_block		=	responseData[7];
			  	
			   	 	if(document.getElementById("bb"+curr_block) !=null)
			   		{
			   			document.getElementById(curr_block).style.display='block';
			   			document.forms[0].divisionId.value=curr_block;
			   			changeDiv(curr_block);
			   			document.forms[0].divisionId.value=curr_block;
						document.getElementById("bb"+curr_block).style.color=selColor;
					}
					else {
			    		if(document.getElementById("bba1") !=null)
			   			{
			   				document.getElementById("a1").style.display='block';
			   				document.forms[0].divisionId.value="a1";
			 				document.getElementById("bba1").style.color=selColor;
						}	
					}
				}
				try{
			     	autoTabIndexing();
			    }catch(_Err){
			    // 	alert("Application Error[TabIndex not Included] Please Contact System Administrator");
			 	}
			}			
		}
	}
	
	xmlHttp.send(params);
}	

/* 
* changeDiv () function called when user click on the block( page number) 
* current active block is shown with red color and other are black color
*/
function changeDiv(index)
{

	var divisionId	=	document.forms[0].divisionId.value;
	var blc			=	"bb"+index;
	var blcdiv		=	"bb"+divisionId;
	
	var rec_per_page = document.forms[0].record_per_page.value;
	var prevDivIndex = divisionId.substring(1,divisionId.length);
	var min_rec_len = parseInt(rec_per_page)*(parseInt(prevDivIndex) -1); 
	var max_rec_len = parseInt(rec_per_page) * parseInt(prevDivIndex);
	
	document.getElementById(blcdiv).style.color=defColor;	
	document.getElementById(blc).style.color=selColor;
	
	//document.getElementById("message").style.display	=	'none'; 
	document.forms[0].chkmain.checked					=	false;
	
	if(!isNaN(document.forms[0].chk.length))
		{
			for(var i=min_rec_len;i< max_rec_len && i < document.forms[0].chk.length;i++)
			{
				if(document.getElementById("tr"+(i+1)).className!="rowfontmatch")
				document.forms[0].chk[i].checked	=	false;
			}
		}
	else
		{
			if(document.getElementById("tr1").className!="rowfontmatch")
			document.forms[0].chk.checked	=	false;
		}
	document.getElementById(divisionId).style.display		=	'none';
	document.getElementById(index).style.display			=	'block';
	document.forms[0].divisionId.value	=	index;
}


		
/* record selection on the listing page change the color of table row on mouseover and mouse out
*
*/

function changeColor(event,i,flag)
{
	var allImage=document.getElementsByTagName("IMG");
	var retVal;
	
	if(flag==0 && !fMouseDown)		//on mouse over
		event.className = "ONMOUSEOVER1";
	else
	 {
		if(isNaN(document.forms[0].chk.length))
			retVal = document.forms[0].chk.checked;
		else
			retVal = document.forms[0].chk[i-1].checked;	
				
		if(retVal==true)
			event.className = "ONMOUSEOVER1";
		else if(!fMouseDown)
			event.className = "ONMOUSEOUT1";
	}
	for(var nTmpI=0; nTmpI<allImage.length; nTmpI++){
		if(allImage[nTmpI].className=="drag")
			allImage[nTmpI].className="drag";
	}
}
		 
/* 
*	changeNextPage(index,rownum) is called when user click on the next link at list page
*/


function changeNextPage(index,rownum)
{
	//document.getElementById("message").style.display	=	'none';	
	
	var total_page	=	document.forms[0].totalpage.value;
	var n			=	"n"+index;
	var p			=	"n"+index+1;
	
	if(p==index)
		document.getElementById(p).style.display='block';
	else
		document.getElementById(n).style.display='none';
		
	try{
     	autoTabIndexing();
    }catch(_Err){
     //	alert("Application Error[TabIndex not Included] Please Contact System Administrator");
 	}
}

/* 
*	changeBDivision(objvalue) is called when user click on the block  link at list page
*/

function changeBDivision(objvalue)
{
	var obj		=	objvalue.split("^");
	var p		=	obj[0];
	var i		=	obj[1];
	var k		=	obj[2];
	var obj1	=	p+"^"+i;
	
	v		=	p+"^"+(++i);
	changeDiv("a"+k);
	document.getElementById("message").style.display	=	'none';	
	document.getElementById(obj1).style.display			=	'none';
	document.getElementById(v).style.display			=	'block';
	try{
     	autoTabIndexing();
    }catch(_Err){
     //	alert("Application Error[TabIndex not Included] Please Contact System Administrator");
 	}
}

 /* 
*	changeNextPage(index,rownum) is called when user click on the Previous link at list page
*/
 
function changePDivision(objvalue)
{
	var obj	=	objvalue.split("^");
	var p	=	obj[0];
	var i	=	obj[1];
	var k	=	obj[2];
	var obj1=	p+"^"+i;
		i--;
		v		=	p+"^"+i;
		changeDiv("a"+k);
		document.getElementById("message").style.display	=	'none';	
		document.getElementById(obj1).style.display			=	'none';
		document.getElementById(v).style.display			=	'block';
	try{
     	autoTabIndexing();
    }catch(_Err){
     //	alert("Application Error[TabIndex not Included] Please Contact System Administrator");
 	}
}

// for checking main check box

function isCheckedFirst()
{
	var record_par_page	=	document.forms[0].record_per_page.value;

		if(document.forms[0].minrow !=null)
		{
			min_row=document.forms[0].minrow.value;
			min_row=document.forms[0].max_rownum.value;
		}

	if(document.forms[0].chk==null) return;

	  if(!isNaN(document.forms[0].chk.length)) 
	  	{ 
			for(var i=0;i<document.forms[0].chk.length-1;i++)
	   	 		document.forms[0].chk[i].checked=false;
	   	 }
	   else
	   	 document.forms[0].chk.checked=false;

	var temp	=	document.getElementById(document.forms[0].divisionId.value).id;
	var sub		=	temp.substring(1,temp.length);
	var m		=	((record_par_page*sub)-record_par_page)+1;

	 if(document.forms[0].chkmain.checked==true)
	   { 
		   if(!isNaN(document.forms[0].chk.length))	
			 {
				 for(var i=((record_par_page * sub)-record_par_page);i<(record_par_page*sub);i++,m++)
					{
						if(document.forms[0].chk.length <=i)
								break;
								if(document.getElementById("tr"+parseInt(m)).className=="ONMOUSEOVER1" || document.getElementById("tr"+parseInt(m)).className=="ONMOUSEOUT1")
					          document.getElementById("tr"+parseInt(m)).className='ONMOUSEOVER1';
					          document.forms[0].chk[i].checked=true;
					} 
			}
		 else
		 	{
			 	if(document.getElementById("tr"+parseInt(m)).className=="ONMOUSEOVER1" || document.getElementById("tr"+parseInt(m)).className=="ONMOUSEOUT1")
			 	document.getElementById("tr1").className='ONMOUSEOVER1';
				document.forms[0].chk.checked=true;
			}
		 } 
	 else 
		 {	
			if(!isNaN(document.forms[0].chk.length))	     
				{
					for(var i=((record_par_page*sub)-record_par_page);i<(record_par_page*sub);i++)  
					{  
				          if(document.forms[0].chk.length <=i)
			          		     break;
			          		     if(document.getElementById("tr"+parseInt(m)).className=="ONMOUSEOVER1" || document.getElementById("tr"+parseInt(m)).className=="ONMOUSEOUT1")
				           	 document.getElementById("tr"+parseInt(m)).className='ONMOUSEOUT1';
						     document.forms[0].chk[i].checked	=	false;
						  	 m++; 
				     } 
				 }
			 else
			 	{
			 	if(document.getElementById("tr"+parseInt(m)).className=="ONMOUSEOVER1" || document.getElementById("tr"+parseInt(m)).className=="ONMOUSEOUT1")
			      document.getElementById("tr1").className='ONMOUSEOUT1';
			      document.forms[0].chk.checked		=	false;
			 	}
		 }
}



	
/***********************View javaScript*********************************************/

/* view () method is called when user click on view button of list page and it
* opens a popup page gbl_master_view.jsp
*/
function  view()
{
     document.getElementById('message').style.display='none';

	if(checkForView()==false) return false;
    
	var chk_temp	=	document.forms[0].chk.length;
	var chk			=	"";
	
	var mode = "VIEWDATA";	
	/*
	var temp_cnt	=	document.forms[0].cnt_page.value;
	var temp1		=	temp_cnt.split(".");
	var cnt_page	=	temp1[0];
	*/
	var cnt_page	=	document.forms[0].cnt_page.value;
	var module_id	=	document.forms[0].module_id.value;
		
		
	if(!isNaN(chk_temp))
	{
		for(var i=0;i<chk_temp;i++)
		{
			if(document.forms[0].chk[i].checked==true) 
			{
				chk =document.forms[0].chk[i].value;
				
			}
			
		}
	}
	else
	{
		chk =document.forms[0].chk.value;
		
	}
	
	var  heightValue = document.forms[0].view_row_length.value * 40;
		
	var url = "../hisglobal/masterutil/master/view_mstTemp_gbl.jsp?mode="+mode+"&chk="+chk+"&cnt_page="+cnt_page+"&masterName="+document.forms[0].masterName.value+"&module_id="+module_id;
	
	//alert(" view :  "+url);	
		
	openPopUp_master(url,'700',heightValue,'1');
	//var myPopup     =  window.open(,'popupWindow',heg_width, 'scrollbars=yes,ALIGN=CENETER,left=100,top=100');
	try{
     	autoTabIndexing();
    }catch(_Err){
     //	alert("Application Error[TabIndex not Included] Please Contact System Administrator");
 	}
}

/*
* this function called on body onload of popup page and mode is VIEWDATA and goes to
* conrtroller page of user
*/

function fetchViewData(cnt_page1,chk1)
	{ 
	
	xmlHttp			=	createRequestObject();
	var module_id	=	document.forms[0].module_id.value;
	
	var params= './../../../'+module_id+'/fetchView'+cnt_page1+'.action?chk='+chk1;
    xmlHttp.open("POST",params,true);
	document.getElementById("viewdata").innerHTML ="<div class='div-table'><div class='div-table-row'><div class='div-table-col width100'>Wait Fetching Data from Database...</div></div></div>";
	xmlHttp.onreadystatechange = function()
	{
		if(xmlHttp.readyState ==4 )
			{ 
			
				if(xmlHttp.status == 200 || xmlHttp.status=='complete' )
					{  
				    
				  	var response = xmlHttp.responseText;
					document.getElementById("viewdata").innerHTML=xmlHttp.responseText;
					try{
				     	autoTabIndexing();
				    }catch(_Err){
				    }
					 }
			}
	} 
		xmlHttp.send(params);
}
/*
* fetchViewNext(index) method is called when user click on next link at view page of master with mode VIEWDATA
*
*/

function fetchViewNext(index,cnt)
{
	
	var divisionId		= 	opener.document.forms[0].divisionId.value;
	var rec_per_page	= 	opener.document.forms[0].record_per_page.value;
	var prevDivIndex 	= 	divisionId.substring(1,divisionId.length);
	var min_rec_len 	= 	parseInt(rec_per_page)*(parseInt(prevDivIndex) -1); 
	var max_rec_len 	= 	parseInt(rec_per_page) * parseInt(prevDivIndex);
	var current_div_id	=	parseInt(index)/parseInt(rec_per_page);
	var prev_div		=	opener.document.forms[0].divisionId.value;
	var module_id		=	opener.document.forms[0].module_id.value;
	
	var chk				=	"";
	var total_rec		=	"";
	 
	
	 if((parseInt(opener.document.forms[0].totalpage.value)) < parseInt(opener.document.forms[0].page_par_block.value))
	      total_rec=parseInt(opener.document.forms[0].totalpage.value) * parseInt(rec_per_page);
	   else
	      total_rec=(parseInt(opener.document.forms[0].totalpage.value)-1) * parseInt(rec_per_page);
	      
 	if((index < (parseInt(opener.document.forms[0].chk.length))) && (index < total_rec))
	 	{
	 		
 			chk		=	opener.document.forms[0].chk[index].value; // fetch next value of checkbox from list page
			opener.document.forms[0].chk[index].checked							=	true;  // below 4 line objects is  fetching  from original window
			opener.document.forms[0].chk[index-1].checked						=	false;
			
			if(current_div_id <=0)
				current_div_id	=	1;
			else
				current_div_id	=	parseInt(current_div_id)+1;
		
		var blockcomp	="a"+current_div_id;
		if(prev_div !=blockcomp) // if block is change
			{
				opener.document.getElementById("bba"+parseInt(current_div_id)).style.color			=	selColor;
				opener.document.getElementById("bba"+parseInt(prev_div.substring(1))).style.color	=	defColor;
				opener.document.getElementById(prev_div).style.display								=	'none';
				opener.document.getElementById("a"+parseInt(current_div_id)).style.display			=	'block';
				opener.document.forms[0].divisionId.value		=	"a"+parseInt(current_div_id);
			}
//		var params="../../../"+document.forms[0].cnt_page.value+".cnt?hmode=VIEWDATA&chk="+chk;
		//var params = opener.document.forms[0].action + "?hmode=VIEWDATA&chk="+chk;
		var params= './../../../'+module_id+'/fetchView'+cnt+'.action?chk='+chk;
		
		
		xmlHttp.open("POST",params,true);
		document.getElementById("viewdata").innerHTML ="<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '><b>Wait Fetching Data from Database...</b></div></div></div>";
		xmlHttp.onreadystatechange = function()
			{
				if(xmlHttp.readyState ==4 && xmlHttp.status == 200)
				{
					var response = xmlHttp.responseText;
					document.getElementById("viewdata").innerHTML	=	xmlHttp.responseText;
					try{
				     	autoTabIndexing();
				    }catch(_Err){
				   //  	alert("Application Error[TabIndex not Included] Please Contact System Administrator");
 	}
				}
			}
		xmlHttp.send(params);
		}
	else
		alert("No More Data To display");
}
		
		
/*
* fetchViewPrevious(index) method is called when user click on Previous link at view page of
* master with mode VIEWDATA, it also change the color < table row > of parent window and checked 
* the chekbox on the basis of previous index
*/	
function fetchViewPrevious(index,cnt_page)
{
	var mode	=	'VIEWDATA';
	if(index == 0)
	{
		alert("No More Data !!");
		return;
	}
	
		var chk				=	opener.document.forms[0].chk[index-1].value;
		var prev_div		=	opener.document.forms[0].divisionId.value;
		var record_par_page	=	opener.document.forms[0].record_per_page.value;
		var module_id		=	opener.document.forms[0].module_id.value;
		
		var current_div_id	=	parseInt(index-1)/parseInt(record_par_page) ;
		
		opener.document.forms[0].chk[index-1].checked						=	true;	// below 4 line objects is  fetching  from original window
		opener.document.forms[0].chk[index].checked							=	false;
		
	if(current_div_id 	<=	0)
		 current_div_id	=	1;
	 else
	  	current_div_id	=	parseInt(current_div_id) + 1;
	
	  var blockcomp			=	"a"+parseInt(current_div_id);
	
		if(prev_div !=blockcomp)
		{
			opener.document.getElementById("bba"+parseInt(current_div_id)).style.color			=	selColor;
			opener.document.getElementById("bba"+parseInt(prev_div.substring(1))).style.color	=	defColor;
			opener.document.getElementById(prev_div).style.display								=	'none';
			opener.document.getElementById("a"+current_div_id).style.display					=	'block';
			opener.document.forms[0].divisionId.value											=	"a"+parseInt(current_div_id);
		}
//var params="../../../"+document.forms[0].cnt_page.value+".cnt?hmode="+mode+"&chk="+chk;
	//var params=opener.document.forms[0].action + "?hmode="+mode+"&chk="+chk;
		var params= './../../../'+module_id+'/'+'/fetchView'+cnt_page+'.action?chk='+chk;

		//alert(" fetchViewPrevious :  "+params);

	xmlHttp.open("POST",params,true);
	document.getElementById("viewdata").innerHTML ="<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '><b>Wait Fetching Data from Database...</b></div></div></div>";
	xmlHttp.onreadystatechange = function()
	{
		if(xmlHttp.readyState ==4 && xmlHttp.status == 200)
		{
			var response = xmlHttp.responseText;
			document.getElementById("viewdata").innerHTML=xmlHttp.responseText;
			try{
		     	autoTabIndexing();
		    }catch(_Err){
		    // 	alert("Application Error[TabIndex not Included] Please Contact System Administrator");
		 	}
		}
	}
	xmlHttp.send(params);	
}


	
/***********************Report Page javaScript*********************************************/
/*Report Graphics User InterFace to Generate a comprihencive Report*/

function userInterface(cnt){
	
	var fDontShowReport=false;
	var objBlackDiv=document.createElement("div");
	var viewportheight=0;
	var blanket_height=0;
	var module_id=document.forms[0].module_id.value;
	
	if (typeof window.innerWidth != 'undefined') {
		viewportheight = window.innerHeight;
	} else {
		viewportheight = document.documentElement.clientHeight;
	}
	if ((viewportheight > document.body.parentNode.scrollHeight) 
	&& (viewportheight > document.body.parentNode.clientHeight)) {
		blanket_height = viewportheight;
	} else {
		if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
			blanket_height = document.body.parentNode.clientHeight;
		} else {
			blanket_height = document.body.parentNode.scrollHeight;
		}
	}
	
	var objContentDiv = document.createElement("div");
	objContentDiv.className="popUpDiv";
	objContentDiv.id="objPopUpDivId";

	document.forms[0].appendChild(objContentDiv);
	
	var xmlHttp = createRequestObject();
	//var params= document.forms[0].action + "?hmode=REPORTINTERFACE";
	var params= './../'+module_id+'/reportInterface'+cnt+'.action';


	xmlHttp.open("POST",params,true);
	
	objContentDiv.innerHTML ="<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '><b>Wait Report Wizard is being processed...</b></div></div></div>";
	
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState ==4 ){
			if(xmlHttp.status == 200 || xmlHttp.status=='complete'){
				var response = xmlHttp.responseText;
				var responseData=response.split("####");
				if (responseData[0] == "ERROR") {
					objContentDiv.innerHTML 	= "<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '><font color = 'red'><b>" + responseData[1] + "</b></font></div></div></div>";
				}else{
					if(response.split("#")[1]!="true"){
						objContentDiv.style.display="none";
						objContentDiv.innerHTML 	=	responseData[0].split("#")[0];
						document.getElementsByName("strGroupByForReport")[0].checked=false;
						try{
							document.getElementById("objPopUpDivId").style.display="none";
							document.getElementById("printId").focus();
							var objGroupByCols = document.getElementsByName("strGroupByForReport");
							for(var nTmpI=0;nTmpI<objGroupByCols.length;nTmpI++)
								objGroupByCols[nTmpI].checked=false;
							for(var nTmpI=0;nTmpI<objGroupByCols.length;nTmpI++){
								for(var nTmpJ=0;nTmpJ<response.split("#")[2].split(",").length;nTmpJ++){
									if(objGroupByCols[nTmpI].value==response.split("#")[2].split(",")[nTmpJ])
										objGroupByCols[nTmpI].checked=true;
								}
							}
							
							var objRequiredCols = document.getElementsByName("strColsRequiredForReport");
							for(var nTmpI=0;nTmpI<objRequiredCols.length;nTmpI++)
								objRequiredCols[nTmpI].checked=true;
							for(var nTmpI=0;nTmpI<objRequiredCols.length;nTmpI++){
								for(var nTmpJ=0;nTmpJ<response.split("#")[3].split(",").length;nTmpJ++){
									if(objRequiredCols[nTmpI].value==response.split("#")[3].split(",")[nTmpJ]){
										objRequiredCols[nTmpI].checked=false;
									}
								}
							}
							
							var objOrderByCols = document.getElementsByName("strOrderByCols");
							for(var nTmpI=0;nTmpI<objOrderByCols.length;nTmpI++)
								objOrderByCols[nTmpI].checked=false;
							for(var nTmpI=0;nTmpI<objOrderByCols.length;nTmpI++){
								for(var nTmpJ=0;nTmpJ<response.split("#")[4].split(",").length;nTmpJ++){
									if(objOrderByCols[nTmpI].value==response.split("#")[4].split(",")[nTmpJ])
										objOrderByCols[nTmpI].checked=true;
								}
							}
							
							var objAlignWithCols = document.getElementsByName("strAlignWith");
							for(var nTmpI=0;nTmpI<objAlignWithCols.length;nTmpI++){
								objAlignWithCols[nTmpI].value=response.split("#")[5].split(",")[nTmpI];
							}
							
							hideShowConcat();
							hideShowGroupByPattern();
							
							if(response.split("#")[6]==1){
								document.getElementsByName("strShowAllData")[0].checked=true;
								document.getElementsByName("strNoOfRecordsPerPage")[0].readOnly=true;
							}
								
							document.getElementsByName("strNoOfRecordsPerPage")[0].value=response.split("#")[7];
							
							if(response.split("#")[8]=="true")
								document.getElementsByName("strBorderRequired")[0].checked=true;
								
							if(response.split("#")[9]==1)
								document.getElementsByName("strConcate")[0].checked=true;
								
							if(response.split("#")[10]=="true")
								document.getElementsByName("strGroupByPattern")[0].checked=true;
							document.getElementsByName("strReportConfig")[0].value="true";
						}catch(e){
							alert("Missing Report Configuration Parameters");
							fDontShowReport=true;
						}
						if(!fDontShowReport)
							generateReport(cnt);
						else
							submitPage("CANCEL");
					}else{
						objBlackDiv.id="objBlackDivId";
						objBlackDiv.style.height = blanket_height + 'px';
						objBlackDiv.className="blanket";
						document.forms[0].appendChild(objBlackDiv);
						objContentDiv.innerHTML 	=	responseData[0].split("#")[0];
						hideShowConcat();
						hideShowGroupByPattern();
					}
						
				}	
				try{
			     	autoTabIndexing();
			    }catch(_Err){
			    // 	alert("Application Error[TabIndex not Included] Please Contact System Administrator");
			 	}
			}
		}
	}
	xmlHttp.send(params);
}
function generateReport(cnt){
	try{
		document.getElementById("objBlackDivId").style.display="none";
	}catch(e){
		
	}
	document.getElementById("objPopUpDivId").style.display="none";
	document.getElementById("printId").focus();
	fetchReportsData(cnt);
}

function getIndex(_these){
	var nTmpI;
	var strSelectedObjName=document.getElementsByName(_these.name)
	for(nTmpI=0;nTmpI<strSelectedObjName.length;nTmpI++)
		if(_these==strSelectedObjName[nTmpI])
			break;
	return nTmpI;
}

function showAllData(_these){
	if(_these.checked==true){
		document.forms[0].strNoOfRecordsPerPage.value="";
		document.forms[0].strNoOfRecordsPerPage.disabled=true;
	}else
		document.forms[0].strNoOfRecordsPerPage.disabled=false;
}

function checkGroupBy(_these){
	if(_these.checked){
		document.getElementsByName("strOrderByCols")[getIndex(_these)].checked=true;
		document.getElementsByName("strColsRequiredForReport")[getIndex(_these)].checked=true;
	}
	hideShowGroupByPattern()
	hideShowConcat();
}

function checkRequiredCol(_these){
	if(!_these.checked){
		document.getElementsByName("strOrderByCols")[getIndex(_these)].checked=false;
		document.getElementsByName("strGroupByForReport")[getIndex(_these)].checked=false;
	}
	hideShowGroupByPattern();
	hideShowConcat();
}

function checkRequiredCol1(_these){
	if(_these.checked){
		document.getElementsByName("strColsRequiredForReport")[getIndex(_these)].checked=true;
	} else if(!_these.checked){
		document.getElementsByName("strGroupByForReport")[getIndex(_these)].checked=false;
	}
	hideShowConcat();
}

function doSaveAs(){
	if (document.execCommand){
		document.execCommand("SaveAs")
	}
	else {
		alert("Save-feature available only in Internet Exlorer 5.x.")
	}
}

function saveReportData(){
	doSaveAs();
}

function hideShowConcat(){
	var checkedGroupBy=0;
	for(var nTmpI=0; nTmpI<document.getElementsByName("strGroupByForReport").length; nTmpI++)
		if(document.getElementsByName("strGroupByForReport")[nTmpI].checked)
			checkedGroupBy++;
	var checkedRequired=0;
	for(var nTmpI=0; nTmpI<document.getElementsByName("strColsRequiredForReport").length; nTmpI++)
		if(document.getElementsByName("strColsRequiredForReport")[nTmpI].checked)
			checkedRequired++;
	var result=checkedRequired-checkedGroupBy;
	if(result==1){
		document.getElementById("concatenationId").style.display="block";
	} else{
		document.getElementsByName("strConcate")[0].checked=false;
		document.getElementById("concatenationId").style.display="none";
	}
}

function hideShowGroupByPattern(){
	var checkedGroupBy=0;
	for(var nTmpI=0; nTmpI<document.getElementsByName("strGroupByForReport").length; nTmpI++)
		if(document.getElementsByName("strGroupByForReport")[nTmpI].checked)
		checkedGroupBy++;
	if(checkedGroupBy>1){
		document.getElementById("groupByPatternId").style.display="block";
	} else{
		document.getElementsByName("strGroupByPattern")[0].checked=false;
		document.getElementById("groupByPatternId").style.display="none";
	}
}
/*******************************************************************/


/*	
report(mode) function is called when user click on the report button

*/
function report(cnt)
{
	if(document.forms[0].chk ==null){
		alert("No Record to display in the report.");
		return;
	}
	
	var no_of_combo	=	document.forms[0].no_of_combo.value;
	var temp_combo	=	document.getElementsByName("combo");
	var comboValue	=	"";
	var mode 		= 	"REPORT";
	
	if(temp_combo)
	{
		if(no_of_combo >1)
		{
			for(var i=0;i<temp_combo.length;i++)
				if(temp_combo[i].options[temp_combo[i].selectedIndex].text=="Select Value")
					comboValue +="All@";
				else
					comboValue +=temp_combo[i].options[temp_combo[i].selectedIndex].text+"@";
		}else{
			if(temp_combo[0].options[temp_combo[0].selectedIndex].text=="Select Value")
					comboValue ="All";
				else
					comboValue =temp_combo[0].options[temp_combo[0].selectedIndex].text;
		}
	}
	document.forms[0].comboValue.value	=	comboValue;
	document.forms[0].hmode.value		=	mode;
	
	document.forms[0].action="report"+cnt+".action";
	  
	document.forms[0].submit();
}
function submitCancelAction(cnt)
{
	document.forms[0].action="cancel"+cnt+".action";
	document.forms[0].submit();
}
/*
* fetchReportsData() methods call when user click on the report button 
* this methods called on  body onload  of report page 
*/

function fetchReportsData(_fRepeat)
{ 
		xmlHttp			=	createRequestObject();	
	//var divobj = document.createElement("div");
	//divobj.innerHTML="Show All Data: <input type='checkbox' name='strShowAllData'>";
	//document.forms[0].appendChild(divobj);
	var strShowAllData="1";
	//if(document.forms[0].strShowAllData.checked==true)
		//var strShowAllData="1";
	var strRepeat		=	"";
	if(_fRepeat=="Repeat")
		strRepeat = "&fRepeat=yes";
	var combo1			=	document.forms[0].combo;
	var blockNo			=	document.forms[0].blockNo.value;
	var searchVal		=	document.forms[0].search.value;
	var searchColumn 	=	document.forms[0].searchColumn.value;
	var combotext		=	document.forms[0].comboValue.value;
	var no_of_combo		=	document.forms[0].no_of_combo.value;
	var module_id		=   document.forms[0].module_id.value;
	
	var combostr		=	"";
	var minrow			=	0;
	var str				=	"";
	var combo2			=	"";
	/**************************user Interface Connectivity**********************************/
	var strGroupByForReport="";
	var strColsNotRequiredInReport="";
	var strShowAllData = 0;
	var strConCat="&strConcat=0";
	var strGroupByPatern="&strGroupByPatern=false";
	var strNoOfRecordPerPages =20 ;
	var strOrderByColsData="";
	var strAlignWithData = "";
	var strReportConfig="";
	var strBorderRequired = "&strBorderRequired=false";
	
		
	try{
		
		
		var search = "";

	var searchContent = searchVal.split('%');

	for(var index=0 , stopIndex = searchContent.length ; index< stopIndex; index++) {
		
		 if(index == 0){
		 	
		 	search = searchContent[index];
		 	
		 }else{
		 	
		 	search = search + "$" + searchContent[index];
		 }
		
	}
		
		
		var strGroupByCheckBox = document.getElementsByName("strGroupByForReport");
		for(var nTmpI=0; nTmpI<strGroupByCheckBox.length; nTmpI++){
			if(strGroupByCheckBox[nTmpI].checked){
				strGroupByForReport += "&strGroupByForReport="+strGroupByCheckBox[nTmpI].value;
			}
		}
		var strColsRequiredForReport = document.getElementsByName("strColsRequiredForReport");
		for(var nTmpI=0; nTmpI<strColsRequiredForReport.length; nTmpI++){
			if(!strColsRequiredForReport[nTmpI].checked){
				strColsNotRequiredInReport += "&strColsNotRequiredInReport="+strColsRequiredForReport[nTmpI].value;
			}
		}
		var strOrderByCols = document.getElementsByName("strOrderByCols");
		for(var nTmpI=0; nTmpI<strOrderByCols.length; nTmpI++){
			if(strOrderByCols[nTmpI].checked){
				strOrderByColsData += "&strOrderByCols="+strOrderByCols[nTmpI].value;
			}
		}
		
		var strAlignWith = document.getElementsByName("strAlignWith");
		for(var nTmpI=0; nTmpI<strAlignWith.length; nTmpI++){
				strAlignWithData += "&strAlignWith="+strAlignWith[nTmpI].value;
		}
		
		if(document.forms[0].strShowAllData.checked)
			strShowAllData=1;
		if(document.forms[0].strBorderRequired.checked)
			strBorderRequired="&strBorderRequired=true";
		strNoOfRecordPerPages = document.forms[0].strNoOfRecordsPerPage.value;
		
		if(document.getElementsByName("strConcate")[0].checked)
			strConCat="&strConcat=1";
			
		if(document.getElementsByName("strGroupByPattern")[0].checked)
			strGroupByPatern="&strGroupByPatern=true";
		strReportConfig = "&strReportConfig="+document.getElementsByName("strReportConfig")[0].value;
	}catch(_Err){
	}

	//alert(strShowAllData);
	/***************************************************************************************/
	
	if(combo1 	!=	null)
	{
		if(no_of_combo >1)
			{
				for(var i=0;i<combo1.length;i++)
					str += "&combo=" + combo1[i].value;
			}
		else
			{
			if(no_of_combo == 1)
	     	 	 str = "&combo=" +combo1.value;
	     	 }
	}
	
//	var params= document.forms[0].action + "?hmode=REPORTDATA"+str+"&minrow"+minrow
//				+"&cnt_page="+document.forms[0].cnt_page.value+"&blockNo="+blockNo
//				+"&search="+search+"&searchColumn="+searchColumn+"&comboValue="+combotext
//				+"&orderByName="+document.getElementById("orderById").value
//				+"&strShowAllData="+strShowAllData+strGroupByForReport+strColsNotRequiredInReport
//				+"&strNoOfRecordPerPages="+strNoOfRecordPerPages+strRepeat+strOrderByColsData
//				+strAlignWithData+strBorderRequired+strConCat+strGroupByPatern+strReportConfig;
	var params= './../'+module_id+'/reportData'+_fRepeat+'.action?minrow='+minrow+str
				+"&cnt_page="+_fRepeat+"&blockNo="+blockNo
				+"&comboValue="+combotext
				+"&orderByName="+document.getElementById("orderById").value
				+"&search="+search+"&searchColumn="+searchColumn
				+"&strShowAllData="+strShowAllData+strGroupByForReport+strColsNotRequiredInReport
				+"&strNoOfRecordPerPages="+strNoOfRecordPerPages+strRepeat+strOrderByColsData
				+strAlignWithData+strBorderRequired+strConCat+strGroupByPatern+strReportConfig;
	
		
				
	xmlHttp.open("POST",params,true);
	if(document.getElementById('reportdata').innerHTML=="")
		document.getElementById('reportdata').innerHTML ="<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '><b>Wait Fetching Data from Database...</b></div></div></div>";
	if(strShowAllData==1)
		document.getElementById('loadId').style.display="block"; 
	
	xmlHttp.onreadystatechange = function()
	{
		if(xmlHttp.readyState ==4 )
		{
			if(xmlHttp.status == 200 || xmlHttp.status=='complete')
			{
				var response = xmlHttp.responseText;
				var responseData=response.split("####");
				
				//check for error
				if (responseData[0] == "ERROR") {
					document.getElementById('reportdata').innerHTML 	= "<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '><font color = 'red'><b>" + responseData[1] + "</b></font></div></div></div>";
				}
				else {
					//alert(responseData[1]);
					if(responseData[1]){
						document.getElementById("id1").style.display = "none";
						document.getElementById("id2").style.display = "none";
						document.getElementById(responseData[1]).innerHTML 	=	responseData[0];
						try{
							//alert(responseData[1]);
							if(responseData[2]!="LAST")
								fetchReportsData("Repeat");
							else{
								document.getElementById('loadId').style.display="none"; 
								document.getElementById("id1").style.display = "block";
								document.getElementById("id2").style.display = "block";
							}
							
						}catch(e){
							
						}
					}else{
						document.getElementById("reportdata").innerHTML 	=	responseData[0];
					}
				}	
					try{
				     	autoTabIndexing();
				    }catch(_Err){
				    // 	alert("Application Error[TabIndex not Included] Please Contact System Administrator");
				 	}
				
			}
		}
	}
	
	xmlHttp.send(params);
	try{
     	autoTabIndexing();
    }catch(_Err){
     //	alert("Application Error[TabIndex not Included] Please Contact System Administrator");
 	}
}

/*
* fetchNextPrev() methods is called when user click on next
* and previos lonk on report page 
*/	
		
function fetchNextPrev(blockNo)
{
	var combo1			=	document.forms[0].combo;
	var combotext		=	document.forms[0].comboValue.value;
	var searchVal		=	document.forms[0].search.value;
	var searchColumn 	=	document.forms[0].searchColumn.value;
	var no_of_combo 	=   document.forms[0].no_of_combo.value;
	var module_id	 	=   document.forms[0].module_id.value;
	var str				=	"";
	var combo2			=	"";
	document.forms[0].blockNo.value	=	blockNo;
	/**************************user Interface Connectivity**********************************/
	var strGroupByForReport="";
	var strColsNotRequiredInReport="";
	var strShowAllData = 0;
	var strConCat="&strConcat=0";
	var strGroupByPatern="&strGroupByPatern=false";
	var strNoOfRecordPerPages=20 ;
	var strOrderByColsData="";
	var strAlignWithData = "";
	var strReportConfig = "";
	var strBorderRequired = "&strBorderRequired=false";
	
	try{
		
		
		
		var search = "";

	var searchContent = searchVal.split('%');

	for(var index=0 , stopIndex = searchContent.length ; index< stopIndex; index++) {
		
		 if(index == 0){
		 	
		 	search = searchContent[index];
		 	
		 }else{
		 	
		 	search = search + "$" + searchContent[index];
		 }
		
	}
		
		
		var strGroupByCheckBox = document.getElementsByName("strGroupByForReport");
		for(var nTmpI=0; nTmpI<strGroupByCheckBox.length; nTmpI++){
			if(strGroupByCheckBox[nTmpI].checked){
				strGroupByForReport += "&strGroupByForReport="+strGroupByCheckBox[nTmpI].value;
			}
		}
		var strColsRequiredForReport = document.getElementsByName("strColsRequiredForReport");
		for(var nTmpI=0; nTmpI<strColsRequiredForReport.length; nTmpI++){
			if(!strColsRequiredForReport[nTmpI].checked){
				strColsNotRequiredInReport += "&strColsNotRequiredInReport="+strColsRequiredForReport[nTmpI].value;
			}
		}
		var strOrderByCols = document.getElementsByName("strOrderByCols");
		for(var nTmpI=0; nTmpI<strOrderByCols.length; nTmpI++){
			if(strOrderByCols[nTmpI].checked){
				strOrderByColsData += "&strOrderByCols="+strOrderByCols[nTmpI].value;
			}
		}
		
		var strAlignWith = document.getElementsByName("strAlignWith");
		for(var nTmpI=0; nTmpI<strAlignWith.length; nTmpI++){
				strAlignWithData += "&strAlignWith="+strAlignWith[nTmpI].value;
		}
		
		if(document.forms[0].strShowAllData.checked)
			strShowAllData=1;
		if(document.forms[0].strBorderRequired.checked)
			strBorderRequired="&strBorderRequired=true";
		strNoOfRecordPerPages = document.forms[0].strNoOfRecordsPerPage.value;
		
		if(document.getElementsByName("strConcate")[0].checked)
			strConCat="&strConcat=1";
			
		if(document.getElementsByName("strGroupByPattern")[0].checked)
			strGroupByPatern="&strGroupByPatern=true";
		document.getElementsByName("strReportConfig")[0].value="true";
		strReportConfig = "&strReportConfig="+document.getElementsByName("strReportConfig")[0].value;
	}catch(_Err){
	}
	
	
	
	/***************************************************************************************/
	if(combo1 !=	null)
	{
		if(no_of_combo >1)
			{	for(var i=0;i<combo1.length;i++)
					str += "&combo=" + combo1[i].value;
			}		
		else
			if(no_of_combo == 1)
				str = "&combo=" +combo1.value;
	}	
		

						
	var params= './../'+module_id+'/reportData'+document.forms[0].cnt_page.value+'.action?minrow=0&blockNo='+blockNo+str
						+"&search="+search+"&searchColumn="+searchColumn
						+"&comboValue="+combotext+"&orderByName="+document.getElementById("orderById").value
						+"&strShowAllData="+strShowAllData+strGroupByForReport
						+strColsNotRequiredInReport+"&strNoOfRecordPerPages="+strNoOfRecordPerPages
						+strOrderByColsData+strAlignWithData+strBorderRequired+strConCat+strGroupByPatern+
						strReportConfig;						
						
			
	xmlHttp.open("POST",params,true);
	document.getElementById('reportdata').innerHTML ="<div class='div-table'><div class='div-table-row '><div class='div-table-col title width100 '><b>Wait Fetching Data from Database...</b></div></div></div>";
		
	xmlHttp.onreadystatechange = function()
	{
		if(xmlHttp.readyState ==4 ){
			if(xmlHttp.status == 200 ) {
				
				var response = xmlHttp.responseText;
				//alert("response"+response);
				var responseData=response.split("####");
				//alert("responseData[0]"+responseData[0]);
				//check for error
				if (responseData[0] == "ERROR") {
					document.getElementById('reportdata').innerHTML 	= "<div class='div-table'><div class='div-table-row'><div class='div-table-col title width100 '><font color = 'red'><b>" + responseData[1] + "</b></font></div></div></div>";
				}
				else
					document.getElementById("reportdata").innerHTML= responseData[0];
			}
		}
					try{
				     	autoTabIndexing();
				    }catch(_Err){
				     	//alert("Application Error[TabIndex not Included] Please Contact System Administrator");
				 	}
			
	}
	xmlHttp.send(params);
		
	try{
     	autoTabIndexing();
    }catch(_Err){
     //	alert("Application Error[TabIndex not Included] Please Contact System Administrator");
 	}
}
/*******************General Functions for master**********************************/
	
function cancel(mode)
{
	document.forms[0].hmode.value=mode;
	document.forms[0].submit();
}

function printData()
{
	/*document.getElementById("id1").style.display="none";
	window.print();
	document.getElementById("id1").style.display="block";
	* */
	
	
newwin=window.open('','printwin','left=100,top=100,width=700,height=700,scrollbars=yes');
newwin.document.write('<HTML><HEAD>');
newwin.document.write((document.getElementsByTagName("head")[0]).innerHTML);
//newwin.document.write('<style type="text/css"> .hidecontrol { display: none; } </style>\n')
newwin.document.write('\n');
newwin.document.write('<script>\n');
newwin.document.write('function chkstate(){ \n');
//newwin.document.write('if(document.readystate=="complete" || document.readystate=="undefined"){\n');
newwin.document.write('window.close();\n');
//newwin.document.write('}\n');
//newwin.document.write('else{\n');
//newwin.document.write('setTimeout("chkstate()",2000)\n');
//newwin.document.write('}\n');
newwin.document.write('}\n');
newwin.document.write('function print_win(){\n');
newwin.document.write('window.print();\n');
newwin.document.write('chkstate();\n');
newwin.document.write('}\n');

newwin.document.write('<\/script>\n');
newwin.document.write('</HEAD>\n');
newwin.document.write('<BODY>\n');
newwin.document.write((document.getElementsByTagName("body" )[0]).innerHTML);
newwin.document.write('</BODY>\n');
newwin.document.write('<script>\n');
newwin.document.write('document.getElementById("id1").style.display="none"\n');
newwin.document.write('document.getElementById("id2").style.display="none"\n');
newwin.document.write('print_win();\n');
newwin.document.write('</script>\n');
newwin.document.write('</HTML>\n');
newwin.document.close();
	
	
	
}

function checkForDelete()
{
	var totalChk=0;
	if(document.forms[0].chk ==null)
	{	
		alert("No Value Exists!");
		return false;
	}
	else
	{
		var divisionId		=document.forms[0].divisionId.value;
		var rec_per_page	=document.forms[0].record_per_page.value;
		var prevDivIndex = divisionId.substring(1,divisionId.length);
		var min_rec_len = parseInt(rec_per_page)*(parseInt(prevDivIndex) -1); 
		var max_rec_len = parseInt(rec_per_page) * parseInt(prevDivIndex);
	
		if(!isNaN(document.forms[0].chk.length))
		{
			for(var i=min_rec_len;i< max_rec_len && i < document.forms[0].chk.length;i++)
			{
				if(document.forms[0].chk[i].checked==true)
					{	
						totalChk++;
						break;
					}
			}
		}
		else
		{
			if(document.forms[0].chk.checked==true)
				totalChk++;
		}
	}
	if(totalChk <=0)
		{
			alert("Select A  Record To Delete!");
				return false;
		}
		else
	 	   if(totalChk > 1 )
	 		return true;
	
}


function checkForView()
{
	var totalChk=0;
	//if(document.forms[0].chk ==null)
	if(document.getElementsByName("chk") ==null)
	{ 
		alert("No Value Exists!");
		return false;
	}
	else
	{
	var divisionId		=document.forms[0].divisionId.value;
	var rec_per_page	=document.forms[0].record_per_page.value;
	var prevDivIndex = divisionId.substring(1,divisionId.length);
	var min_rec_len = parseInt(rec_per_page)*(parseInt(prevDivIndex) -1); 
	var max_rec_len = parseInt(rec_per_page) * parseInt(prevDivIndex);
	
	
	//if(!isNaN(document.forms[0].chk.length))
	if(!isNaN(document.getElementsByName("chk").length))
	{
		//for(var i=min_rec_len;i< max_rec_len && i < document.forms[0].chk.length;i++)
			for(var i=min_rec_len;i< max_rec_len && i < document.getElementsByName("chk").length;i++)
			{
				
			//if(document.forms[0].chk[i].checked==true)
			if(document.getElementsByName("chk")[i].checked==true)
				{	
					totalChk++;
					
			  		if(totalChk >1)
			   		 break;
			   } 
			}
	}
		else
			 {
			 //if(document.forms[0].chk.checked==true)
			 if(document.getElementsByName("chk").checked==true)
				totalChk++;
					     	
			 }
		 		
	}
	if(totalChk <=0)
	{
				alert("Select A  Record To View!!");
				return false;
	}
	 else
	 	if(totalChk > 1 )
	 	{
	 	alert("Only One Record Can Be Viewed!!");
		 	return false;
		 }  
		else
			return true;

}

function checkForModify()
{
	var totalChk=0;
	
	if(document.forms[0].chk ==null)
		{ 
		alert("No Value Exists!!");
		return ;
		}
	
	else
	{
		var divisionId		=document.forms[0].divisionId.value;
		var rec_per_page	=document.forms[0].record_per_page.value;
		var prevDivIndex = divisionId.substring(1,divisionId.length);
		var min_rec_len = parseInt(rec_per_page)*(parseInt(prevDivIndex) -1); 
		var max_rec_len = parseInt(rec_per_page) * parseInt(prevDivIndex);
		
		if(!isNaN(document.forms[0].chk.length))
			{
			for(var i=min_rec_len;i< max_rec_len && i < document.forms[0].chk.length;i++)
				{
				if(document.forms[0].chk[i].checked==true)
					{
						totalChk++;
						if(totalChk >1)
	   	 					break;
					}
				}
			}	
		else
			 {
			 if(document.forms[0].chk.checked==true)
				totalChk++;
			}
	}
	if(totalChk <=0)
		{
			alert("Select A  Record To Modify!");
			return false;
		}
 	else
		if(totalChk > 1 )
	 	{
	 		alert("Only One Record Can Be Modified At A Time!");
	 		return false;
	 	}  
	 	else
	        return true;
	  
	
}

	

function getChkLength()
	{
		 var totalChk=0;
		 if(document.forms[0].chk !=null)
		    {
		 if(isNaN(document.forms[0].chk.length))
		 	{
		  	if(document.forms[0].chk.checked==true)
				totalChk++;
		 	 }
		 	else
		 	{
		  		for(var m=0;m<document.forms[0].chk.length;m++)
			 	 {   
			   		if(document.forms[0].chk[m].checked==true)
			     		totalChk++;
			     }
			} 
		  }	   
		return totalChk;
	}

function submitPage(mode)
{
	document.forms[0].hmode.value=mode;
	document.forms[0].submit();
}

function edit(cnt)
{
	 if(checkForModify()==true)
	   {
		document.forms[0].action="modify"+cnt+".action";;
		document.forms[0].submit();
		}
}


function add(cnt)
{
	if(checkforAdd())
	{
		document.forms[0].action="add"+cnt+".action";
		document.forms[0].submit();
	}
	
}

function keypress(event)
{
	if(event.keyCode == 13 || event.which==13)
	{
		return false;
	}
	if(event.keyCode == 505 || event.which==505)
	{
		return false;
	}
return true;
}
/**
	Popup functionality
	
	This function is used to open pop up window
	
	<<Constrints >> In a page, only one popup window can be active at a time. If user tries to open another
	popup window then this function will close the previous popup then open the new popup
	
	<<How to use the popup functionality >>
	
	Step 1>> Define the following global variables in parent form
			
			var child = null;
			var popIndex = 0;
			var gblCntrlObj = null;

	Step 2>> write the following code in body tag in parent form
			
			onFocus="checkPopUp();" onUnload="closePopUp();"
	
	Step 3>>Write the following code to open popup where you want 
			
			openPopUp(url,width,height,index,cntrlObj) -- Argument description defined below
	
	Step 4>>In Popup window, write the following code in body tag
	
			onUnload="window.opener.closePopUp_master();"
	
	Step 5 >>In Popup window, if you have given the close functionality then call the following function on close event
			
			window.opener.closePopUp_master();	
	
			
	<<Argument>>
	
	url >> path
	width >> width of the popup page
	height >> height of the popup page
	index >> unique value, this is mandatory. 
			It will be useful if same popup is displayed on different - different event
	
	cntrlObj >> Not Mandatory (don't need to pass anything), it would be useful if popup window is opened 
				using checkbox and you want that as popup window is closed then this checkbox should be unchecked.		 
*/
function openPopUp_master(url,width,height,index,cntrlObj)
{
	var width = width;
    var height = height;
    var left = parseInt((screen.availWidth/2) - (width/2));
    var top = parseInt((screen.availHeight/2) - (height/2));
    var flag = 0;
			
	if(child!=null && !child.closed) {
		if(popIndex == index) {
			flag = 1;
			child.focus();
		}
		else {
			closePopUp_master();
		}	
	}
	
	if(flag == 0) {
		popIndex = index;
		gblCntrlObj = cntrlObj;	
		var windowFeatures = "width=" + width + ",height=" + height + ",status,scrollbars=yes,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;
		child = window.open(url, "subWind", windowFeatures);
		child.focus();
	}
}//end openPopUp()

/**
	This function is used to set focus on pop up window
*/
function checkPopUp_master()
{
	if(child!=null && !child.closed)
		child.focus();
}

/**
	This function is used to close popup window
*/
function closePopUp_master()
{
	if(child!=null && !child.closed)
	{
		if (gblCntrlObj != null && typeof(gblCntrlObj) != "undefined") 
		{
			if ((gblCntrlObj.type).toUpperCase() == "CHECKBOX") 
			{
				gblCntrlObj.checked = false;
				gblCntrlObj = null;
			}
			
		}
		//
		child.close();
		child = null;
		popIndex = 0;	
	}
}
//popup functionality finish

function checkEvent(e)
{
	var obj=document.getElementsByTagName("img");
	for(var i=0;i<=obj.length;i++)
	{
		var path=obj[i].src;
		var file=path.substring(path.lastIndexOf("/")+1,path.length);
		if(file=="btn-add.png" || file=="btn-mo.png" || file=="btn-del.png" || file=="btn-view.png" || file=="btn-rpt.png")
		{
			if(obj[i].hasFocus && e.keyCode=="13")
			{
				return true;
			}
		}
	}
}
function checkEventClick(e)
{
	var obj=document.getElementsByTagName("img");
	for(var i=0;i<=obj.length;i++)
	{
		var path=obj[i].src;
		var file=path.substring(path.lastIndexOf("/")+1,path.length);
		if(file=="btn-add.png" || file=="btn-mo.png" || file=="btn-del.png" || file=="btn-view.png" || file=="btn-rpt.png")
		{
			obj[i].hasFocus=false;
	   		obj[i].onfocus=function(){this.hasFocus=true;};
	   		obj[i].onblur =function(){this.hasFocus=false;};
		}
		//alert("file"+file);
	}
}
function addKeyEvent() 
{
		document.addEventListener('keypress',function (e) 
		{
  			globalKeyCode=e.keyCode;  
		},true);
		document.addEventListener('click',function (e) 
		{
  			globalOnClick="1";  
		},true);
}
function eventListen()
{
	/*obj=document.getElementsByTagName("img");
	for(var i=0;i<=obj.length;i++)
	{
		var path=obj[i].src;
		var file=path.substring(path.lastIndexOf("/")+1,path.length);
		if(file=="btn-add.png" || file=="btn-mo.png" || file=="btn-del.png" || file=="btn-view.png" || file=="btn-rpt.png")
		{
			obj[i].addEventListener('keypress',function (e) 
			{  			
	  			globalKeyCode=e.keyCode;  
			},true);
		}

		
	}*/
	
	document.addEventListener('click',function (e) 
		{
  			globalOnClick="1";  
		},true);
}
function keypressValidate(event)
{
	if( ! validateData(event,5) ){
		
		return false;		
	}
	if(event.keyCode == 13 || event.which==13)
	{
		return false;
	}
	if(event.keyCode == 505 || event.which==505)
	{
		return false;
	}

return true;

}

function checkforAdd()
{
	
	var cmb1				=	document.getElementsByName("cmb");
	var combo				=	document.forms[0].combo;	
	var no_of_combo			=	0;
	var retval				=  true;

	if(typeof(document.forms[0].no_of_combo) !="undefined") no_of_combo=document.forms[0].no_of_combo.value;

	
	if(cmb1.length > 0 && typeof(combo) == "undefined")
		{
			//when the list page is loaded then no_of_combo will be null
			if(no_of_combo == null || no_of_combo == 0 || no_of_combo == 'null') 
			{
				no_of_combo = cmb1.length;
			}
			
			if(no_of_combo > 0) 
			{
				for(var i=0;i<cmb1.length;i++)
					{
						if(combo[i].value=="0")
						{
							alert("Please Select "+combo[i].title+" ...!");
							combo[i].focus();
							retval=false;
						}
						if(!retval)
							break;
					}
			}
			
		}
		else
		{
			if(typeof(combo) != "undefined" && no_of_combo > 0)
			{
				if(no_of_combo > 1)
				{
					for(var i=0;i<combo.length;i++)
					{
						if(combo[i].value=="0")
						{
							alert("Please Select "+combo[i].title+" ...!");
							combo[i].focus();
							retval=false;
						}
						if(!retval)
							break;
					}
				}
			}
		}
	
	return retval;
	
}

