function getDeskPatInfoStr()
{
	return '';
}

function updateDeskMenuState(deskType, deskPatInfo)
{
	//alert("color changing...");
	var arrMenuDetail = getAJAXMenuDetailList(deskType, deskPatInfo);
	//alert(arrMenuDetail.length);
	if(arrMenuDetail!=null && arrMenuDetail && arrMenuDetail.length>0)
	{
		for (var i=0; i<arrMenuDetail.length; i++) 
		{	
			var dataStats = arrMenuDetail[i];
		//parent.changeDeskMenuState(deskMenuId, deskMenuURL, count, isToAddCount)
		changeDeskMenuState(dataStats.deskMenuId, dataStats.deskMenuURL, dataStats.count, dataStats.isToAddCount)
		}
	}
}
	  
// Getting Desk Data through AJAX
function getAJAXMenuDetailList(deskType, deskPatInfo)
{
	//alert("color changing...in DEKSNEW.js");
	var arrMenuList = null;
	var mode = "AJX_G_DESKMENU_DETAIL";	
	
	var action 	= "";
	if(deskType=="1")// or or ... OPD, IPD Casulty Doctor Desks 
		action = "/AHIMS/opd/doctorDeskDashboard.cnt?hmode="+mode+deskPatInfo;
		
		var objXHR = {url: action, type:"POST",sync:true, postData: "", handleAs: "json",
			load: function(data) 
			{
				//alert("Data"+data[0].deskMenuId);
				arrMenuList = data;
			},
	        error: function(error)
	        {
	            //if(typeof objMenuMealTimeList == 'undefined' || objMenuMealTimeList==null || objMenuMealTimeList=="" || objMenuMealTimeList.length==0)
	            	//alert("No  Type");
	            alert(error+"Error while populating Information");
	            arrMenuList = null;
	        }};
	
		var objDojoAjax = dojo.xhrPost(objXHR);
	return arrMenuList;
}
















function showDeskDetailFrame(dtlData)
{
	parent.document.getElementById("frmDynamicDeskList").height = "0px";
	parent.document.getElementById("frmDynamicDeskNonPatientCentric").height = "0px";
	parent.document.getElementById('frmDynamicDeskPatientCentric').src="/AHIMS/hisglobal/utility/dynamicdesk/deskDetail.cnt"+dtlData;
	parent.document.getElementById("frmDynamicDeskPatientCentric").height = "440px";
}

/*
function submitToDesk(mode,hmode)
{
	document.forms[0].mode.value=mode;
	document.forms[0].hmode.value=hmode;
	document.forms[0].submit();
}
*/
function submitToDesk(mode,hmode)
{
	if(parent.updateTab)
	{
		closeDialog(parent.diag);
		parent.updateTab();
	}
	else
	{
		document.forms[0].mode.value=mode;
		document.forms[0].hmode.value=hmode;
		document.forms[0].submit();
	}
}

function closeDialog(diag)
{
	if(diag!=null)
	{
		//diag.destroyRecursive();
		diag.hide();
	}
}












function submitDesk(mode)
{
	document.forms[0].mode.value=mode;
	document.forms[0].submit();
}

function submitFormOnValidateButton(event, _menuURL, _menuId, _islogin, _dutyRoleId)
{
	var deskFrame=parent.document.getElementById("frmDynamicDeskCenter");
	var win=deskFrame.contentWindow;
	win.submitFormOnValidateButton(event, _menuURL, _menuId, _islogin, _dutyRoleId);
}

function DynamicDeskButtonOnMouseOver(but)
{
	//alert("DynamicDeskButtonOnMouseOver");
	if(but.className=="tdDynamicDeskButtonNormal")
		but.className = "tdDynamicDeskButtonFocus";
}

function DynamicDeskButtonOnMouseOut(but)
{
	//alert("DynamicDeskButtonOnMouseUp");
	if(but.className=="tdDynamicDeskButtonFocus" || but.className=="tdDynamicDeskButtonPressed")
		but.className="tdDynamicDeskButtonNormal";
}

function DynamicDeskButtonOnMouseDown(but)
{
	//alert("DynamicDeskButtonOnMouseDown");
	but.className="tdDynamicDeskButtonPressed";
}

function DynamicDeskButtonOnMouseUp(but)
{
	//alert("DynamicDeskButtonOnMouseUp");
	if(but.className=="tdDynamicDeskButtonPressed")
		but.className = "tdDynamicDeskButtonNormal";
}

function DynamicDeskButtonOnMouseClicked(but)
{
	//alert("DynamicDeskButtonOnMouseClicked");
	//unclickAllMenus();
	//but.className = "tdDynamicDeskButtonClicked";
}

function unclickAllMenus()
{
	// Searching in All Menus that are Clicked for Unclicking
	var frmLeft=parent.document.getElementById("frmDynamicDeskLeftMenus");
	var frmRight=parent.document.getElementById("frmDynamicDeskRightMenus");
	var frmTop=parent.document.getElementById("frmDynamicDeskTopMenus");
	var frmBottom=parent.document.getElementById("frmDynamicDeskBottomMenus");

	var formDocLeft= null;	
	var formDocRight= null;	
	var formDocTop= null;	
	var formDocBottom= null;
	
	if(window.XMLHttpRequest) // Mozilla
	{
		formDocLeft=frmLeft.contentDocument;
		formDocRight=frmRight.contentDocument;
		formDocTop=frmTop.contentDocument;
		formDocBottom=frmBottom.contentDocument;
 	} 
 	else if (window.ActiveXObject)
 	{
 		formDocLeft=frmLeft.Document;
 		formDocRight=frmRight.Document;
 		formDocTop=frmTop.Document;
 		formDocBottom=frmBottom.Document;
	}
	
	var menusTds = formDocLeft.getElementsByTagName("TD");
	for(var i=0; i<menusTds.length; i++)
		if(menusTds[i].className=="tdDynamicDeskButtonClicked")
			menusTds[i].className="tdDynamicDeskButtonNormal";

	menusTds = formDocRight.getElementsByTagName("TD");
	for(var i=0; i<menusTds.length; i++)
		if(menusTds[i].className=="tdDynamicDeskButtonClicked")
			menusTds[i].className="tdDynamicDeskButtonNormal";

	menusTds = formDocTop.getElementsByTagName("TD");
	for(var i=0; i<menusTds.length; i++)
		if(menusTds[i].className=="tdDynamicDeskButtonClicked")
			menusTds[i].className="tdDynamicDeskButtonNormal";

	menusTds = formDocBottom.getElementsByTagName("TD");
	for(var i=0; i<menusTds.length; i++)
		if(menusTds[i].className=="tdDynamicDeskButtonClicked")
			menusTds[i].className="tdDynamicDeskButtonNormal";
}

function clickMenu(_url, _menuId)
{
	alert("menu clicked");
	if(_url!="")
	{
		// Searching Menu for Clicking
		var frmLeft=parent.document.getElementById("frmDynamicDeskLeftMenus");
		var frmRight=parent.document.getElementById("frmDynamicDeskRightMenus");
		var frmTop=parent.document.getElementById("frmDynamicDeskTopMenus");
		var frmBottom=parent.document.getElementById("frmDynamicDeskBottomMenus");
	
		var formDocLeft= null;	
		var formDocRight= null;	
		var formDocTop= null;	
		var formDocBottom= null;
		
		if(window.XMLHttpRequest) // Mozilla
		{
			formDocLeft=frmLeft.contentDocument;
			formDocRight=frmRight.contentDocument;
			formDocTop=frmTop.contentDocument;
			formDocBottom=frmBottom.contentDocument;
	 	} 
	 	else if (window.ActiveXObject)
	 	{
	 		formDocLeft=frmLeft.Document;
	 		formDocRight=frmRight.Document;
	 		formDocTop=frmTop.Document;
	 		formDocBottom=frmBottom.Document;
		}
		
		var menusTds = formDocLeft.getElementsByTagName("TD");
		for(var i=0; i<menusTds.length; i++)
			if(menusTds[i].id==_url && (_menuId=="" || menusTds[i].headers==_menuId) )// && menusTds[i].className=="tdDynamicDeskButtonClicked")
				menusTds[i].className="tdDynamicDeskButtonClicked";
	
		menusTds = formDocRight.getElementsByTagName("TD");
		for(var i=0; i<menusTds.length; i++)
			if(menusTds[i].id==_url && (_menuId=="" || menusTds[i].headers==_menuId))// && menusTds[i].className=="tdDynamicDeskButtonClicked")
				menusTds[i].className="tdDynamicDeskButtonClicked";
	
		menusTds = formDocTop.getElementsByTagName("TD");
		for(var i=0; i<menusTds.length; i++)
			if(menusTds[i].id==_url && (_menuId=="" || menusTds[i].headers==_menuId))// && menusTds[i].className=="tdDynamicDeskButtonClicked")
				menusTds[i].className="tdDynamicDeskButtonClicked";
	
		menusTds = formDocBottom.getElementsByTagName("TD");
		for(var i=0; i<menusTds.length; i++)
			if(menusTds[i].id==_url && (_menuId=="" || menusTds[i].headers==_menuId))// && menusTds[i].className=="tdDynamicDeskButtonClicked")
				menusTds[i].className="tdDynamicDeskButtonClicked";
	}
}

function showData(elem)
{
	var h="";
	for(var p in elem)
	{
		h+=p+"  :  "+elem[p]+"\n";
		if(h.length>500)
		{
			alert(h);
			h="";
		}
	}
	alert(h);
}