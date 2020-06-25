/* Module Name: Control Panel for Dynamic Desk
*  Name of Process: Control Panel Generator 
*  Name of Developer: Pragya Sharma
*  Date of Creation: Sep-2014
*/
var type;
var dynamicDeskControlPanelGenerator={
		
	addControlPanelMenuDetails:function(deskType, divContainer, jsonMenuType, dtl)
	{
		type=deskType;
		var html = getDeskControlPanelDetails(jsonMenuType, dtl);
		$("#"+divContainer).html(html);
		if(jsonMenuType == "BOTTOM")
			reloadDashBoard();
		//setBackGroundColor(divContainer);
	}
};


function openURLInPopupWithoutClose( url, windowWidth , windowHeight) {
	var blankHeight;
	var blankWidth;
	if(!windowWidth)
		windowWidth =( $(window).width() * 0.8);
	if(!windowHeight)
		windowHeight = ($(window).height() * 0.4);
	// top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
	//    left: ($(window).width() - $(".modal-box").outerWidth()) / 2
	blankWidth = ($(window).width()-windowWidth);
	blankHeight =($(parent.window).innerHeight()-windowHeight)  ;
	
	var windowLeft = Math.round(blankWidth / 2)+ "px";
	var windowTop = Math.round(blankHeight/ 4) + "px";
	// var windowHeight=Math.round($(parent.window).innerHeight() /4) + "px";
	windowHeight = windowHeight + "px";
	windowWidth = windowWidth + "px";
	$.modal('<iframe src="' + url + '" width="'+windowWidth+'" height="'+windowHeight+'" style="border:0">');
	$('.modalCloseImg').hide();
	$('#simplemodal-container').width(windowWidth).height(windowHeight);
	$('#simplemodal-container').css({'left':windowLeft,'top':windowTop});
}

/*function searchProcess(controlPanelId)
{
	//alert("inside searchProcess with Control Panel Id - "+controlPanelId);
	var html = getControlPanelDetails(controlPanelId);
	$("#divControlPanelMenuDetailsId").html(html);
	setBackGroundColor();
}*/
var leftMenuCounter=0;
function getDeskControlPanelDetails(jsonMenuType, dtl)
{
	var result="";
	var arrJsonMenuList = getAJAXDeskMenuList(jsonMenuType);

	//var filterCondition = $('[name="strSearchProcess"]')[0].value;
	//if(filterCondition=='Type Process Name')
		//filterCondition="";
	
	if(arrJsonMenuList!=null && arrJsonMenuList.list && arrJsonMenuList.list.length>0)
	{			
		if(jsonMenuType == "RIGHT")
		{
			if(arrJsonMenuList.list.length>0)
			{
				var widt = Math.round($(parent.window).innerWidth() - 160 ) + "px";
				document.getElementById("divDDCentre").style.width=widt;
				document.getElementById("divDDRightMenu").style.display ="block";				
				result = createControlPanelRow(arrJsonMenuList.list, dtl);
				var higt= (window.innerHeight)+'px';
				var higt1 = Math.round($(parent.window).innerHeight()) + "px";
				//alert(higt+"   higt1:- "+higt1);
				document.getElementById("divDDRightMenu").style.height=higt1;
				document.getElementById("divDDLeftMenu").style.height=higt1;	
				result = result+"<div style='height:5px;'></div><div class='title' style='height:5px;'></div>";
				//alert("desk reload")
				//reloadDashBoard();
				
			}
		}
		else if(jsonMenuType == "BOTTOM")
		{	
			result = createControlPanelRow(arrJsonMenuList.list, dtl);
			//var bottomHeight= (window.innerHeight-115)+'px';
			//document.getElementById("deskPatDashId").style.height=bottomHeight;
			//document.getElementById("divDDCentre").style.height=bottomHeight;			
		}
		else
		{			
			result = createControlPanelRow(arrJsonMenuList.list, dtl);
			result = result+"<div style='height:5px;'></div><div class='title' style='height:5px;'></div>";
		}
	}
	return result;
}

function reloadDashBoard()
{	
	var title="Patient Dashboard"
	$('#tt').tabs('select', title);
	//var tab = $('#tt').tabs('getSelected');  // get selected panel
	//alert(tab);
	//var current_index = $("#tt").tabs("option","active");
	//var index = $('#tt').tabs('getTabIndex',tab);
	//$('#tt').tabs('load', current_index);
}

// Getting Desk Data through AJAX
function getAJAXDeskMenuList(jsonMenuType)
{
	var arrMenuList = null;
	var listTypeMode = "AJX_G_DESKMENU_NONPAT";
	if(jsonMenuType=="NONPAT")		listTypeMode = "AJX_G_DESKMENU_NONPAT";
	else if(jsonMenuType=="LEFT")	listTypeMode = "AJX_G_DESKMENU_LEFT";
	else if(jsonMenuType=="RIGHT")	listTypeMode = "AJX_G_DESKMENU_RIGHT";
	else if(jsonMenuType=="TOP")		listTypeMode = "AJX_G_DESKMENU_TOP";
	else if(jsonMenuType=="BOTTOM")	listTypeMode = "AJX_G_DESKMENU_BOTTOM";
	
	deskPatInfo = getDeskPatInfoStr();
	
	var action 	= "/AHIMS/hisglobal/utility/dynamicdesk/deskDetail.cnt?deskMode="+listTypeMode+deskPatInfo;
	$.ajax({url: action,type:"POST",async:false,dataType:"json",success:function(data)
	{
		arrMenuList=data;
	},error: function(errorMsg,textstatus,errorthrown) 
	{
		arrMenuList = errorMsg;
		alert('getControlPanelDetails '+errorMsg+" textstatus::"+textstatus+" errorthrown::"+errorthrown);
	}
	});
	return arrMenuList;
}

function createControlPanelRow(arrRecordJsonObj, dtl)
{
	var dtlRow="";
	
	if(arrRecordJsonObj!=null && arrRecordJsonObj!="")
	{
		//document.getElementById('divControlPanelTitleId').innerHTML = "<font size='4'><b>"+arrRecordJsonObj[0]['controlPanelName']+"</b></font>&nbsp;&nbsp;<img id='imgRefreshId' src='/HIS/hisglobal/images/nonclinical/nc_refresh.png' style='cursor:pointer' title='Refresh' height='25' width='25' align='top' onclick=\"searchProcess(document.getElementById('intControlPanelId').value);\">";
		// Setting Access to Menu and Default Menu View as
		if($('[name="intMenuViewType"]')[0])
			menuViewType = $('[name="intMenuViewType"]')[0].value;
				
//added by Akash for bottom Menu
		else if(type=="3")
		{
			menuViewType = 7;
		}	
		else
			menuViewType = 6;

		/*if(menuViewType=="-1")
		{
			var accessToMenuViewAs = arrRecordJsonObj[0]['accessToMenuViewAs'];
			var array_accessToMenuViewAs = accessToMenuViewAs.split(',');
			
			var menuViewTypeTobeDeleted = [];
			
			var menuViewTypeValues = [];
			$('#intMenuViewType option').each(function() { 
				menuViewTypeValues.push( $(this).attr('value') );
			});
			
			for(var i=0;i<menuViewTypeValues.length;i++)
			{
				var flag = 0;
				for(var j=0;j<array_accessToMenuViewAs.length;j++)
				{
					if(parseInt(menuViewTypeValues[i])==parseInt(array_accessToMenuViewAs[j]))
					{
						flag = 1;
						break;
					}
				}
			
				if(flag == 0)
					if(menuViewTypeValues[i]!='-1')
						menuViewTypeTobeDeleted.push(menuViewTypeValues[i]);
			}
			
			for(var k=0;k<menuViewTypeTobeDeleted.length;k++)
			{
				$("#intMenuViewType option[value='"+menuViewTypeTobeDeleted[k]+"']").remove();
			}
		
			// Setting Default Value
			menuViewType=arrRecordJsonObj[0]['defaultMenuViewAs'];
		}*/
		
		
		for (i in arrRecordJsonObj)
		{
			if(menuViewType=="1")
			{
				// Large Icons Viewa
				dtlRow += 	"<div class='div-table-col boxLargeIcon' onclick=\"addTab('"+arrRecordJsonObj[i]['controlPanelMenuName']+"','"+arrRecordJsonObj[i]['controlPanelMenuURL']+"','"+arrRecordJsonObj[i]['controlPanelId']+"','"+arrRecordJsonObj[i]['controlPanelMenuId']+"')\" >"+
				   				"<div class='div-table-col wrapper rounded innerBigboxLargeIcon' onmouseover='changeBGColor(this);' onmouseout='resetBGColor(this);'>"+
				   					"<img src='"+arrRecordJsonObj[i]['controlPanelMenuImage']+"' class='icon-imageLargeIcon' onmouseover='changeSize(this);' onmouseout='resetSize(this);' /><br>"+
				   				"</div>"+
				   				"<div class='div-table-col innerSmallboxLargeIcon'>" +
				   					arrRecordJsonObj[i]['controlPanelMenuName']+
				   				"</div>"+
				   			"</div>";
			}
			else if(menuViewType=="2")
			{
				// Medium Icons View
				dtlRow += 	"<div class='div-table-col boxMediumIcon' onclick=\"addTab('"+arrRecordJsonObj[i]['controlPanelMenuName']+"','"+arrRecordJsonObj[i]['controlPanelMenuURL']+"','"+arrRecordJsonObj[i]['controlPanelId']+"','"+arrRecordJsonObj[i]['controlPanelMenuId']+"')\" >"+
				   				"<div class='div-table-col wrapper rounded innerBigboxMediumIcon' onmouseover='changeBGColor(this);' onmouseout='resetBGColor(this);'>"+
				   					"<img src='"+arrRecordJsonObj[i]['controlPanelMenuImage']+"' class='icon-imageMediumIcon' onmouseover='changeSize(this);' onmouseout='resetSize(this);' /><br>"+
				   				"</div>"+
				   				"<div class='div-table-col innerSmallboxMediumIcon'>" +
				   					arrRecordJsonObj[i]['controlPanelMenuName']+
				   				"</div>"+
				   			"</div>";
			}
			else if(menuViewType=="3")
			{
				//alert(arrRecordJsonObj[i]['controlPanelId']);
				//alert(arrRecordJsonObj[i]['controlPanelMenuId']);
				// Small Icons View
				dtlRow += 	"<div class='div-table-col boxSmallIcon' onclick=\"addTab('"+arrRecordJsonObj[i]['controlPanelMenuName']+"','"+arrRecordJsonObj[i]['controlPanelMenuURL']+"','"+arrRecordJsonObj[i]['controlPanelId']+"','"+arrRecordJsonObj[i]['controlPanelMenuId']+"')\" >"+
				   				"<div class='div-table-col wrapper rounded innerBigboxSmallIcon' onmouseover='changeBGColor(this);' onmouseout='resetBGColor(this);'>"+
				   					"<img src='"+arrRecordJsonObj[i]['controlPanelMenuImage']+"' class='icon-imageSmallIcon' onmouseover='changeSize(this);' onmouseout='resetSize(this);' /><br>"+
				   				"</div>"+
				   				"<div class='div-table-col innerSmallboxSmallIcon'>" +
				   					arrRecordJsonObj[i]['controlPanelMenuName']+
				   				"</div>"+
				   			"</div>";
			}
			else if(menuViewType=="4")
			{
				//Tiles View
				dtlRow += 	"<div class='div-table-col boxTiles' onclick=\"addTab('"+arrRecordJsonObj[i]['controlPanelMenuName']+"','"+arrRecordJsonObj[i]['controlPanelMenuURL']+"','"+arrRecordJsonObj[i]['controlPanelId']+"','"+arrRecordJsonObj[i]['controlPanelMenuId']+"')\">"+
				   				"<div class='innerBigboxTiles'><img src='"+arrRecordJsonObj[i]['controlPanelMenuImage']+"' class='icon-imageTiles' onmouseover='changeSize(this);' onmouseout='resetSize(this);' />"+
				   				"&nbsp;&nbsp;</div>"+
				   				"<div class='innerSmallboxTiles' onmouseover='changeTilesBGColor(this);' onmouseout='resetTilesBGColor(this);'>"+arrRecordJsonObj[i]['controlPanelMenuName']+"</div>"+
				   			"</div>";
			}
			else if(menuViewType=="5")
			{
				//Details View
				
				if(i==0)
				{
					dtlRow += 	"<div class='div-table-col horizontalLineBoxDetails title'>"+
					   				"<div class='innerBigboxDetails'><font size='2'><center>#</center></font></div>"+
					   				"<div class='innerSmallboxDetails' ><font size='2'>Process Name</font></div>"+
					   				"<div class='innerEmptyboxDetails'>|</div>"+
					   				"<div class='innerMessageboxDetails control'><font size='2'><center><b>Statistics</b> <font size='1'>(Click individual statistics for details)</font></center></font></div>"+
					   				"<div class='innerEmptyboxDetails'>|</div>"+
					   				"<div class='innerLastActionboxDetails control'><font size='2'><center><b>Last Action</b></center></font></div>"+
					   				"<div class='innerEmptyboxDetails'>|</div>"+
					   				"<div class='innerLastActionDateboxDetails control'><font size='2'><center><b>Last Action Date</b></center></font></div>"+
					   				"<div class='innerEmptyboxDetails'>|</div>"+
					   				"<div class='innerLastActionByboxDetails control'><font size='2'><center><b>Last Action By</b></center></font></div>"+
					   				"<div class='innerEmptyboxDetails'>|</div>"+
					   				"<div class='innerOptionboxDetails control'><font size='2'><center><b>Option(s)</b></center></font></div>"+
					   			"</div>";
					
				}
				
				var optionsGranted=arrRecordJsonObj[i]['accessToOptions'];
				var optionsAvailable='';
				
				if (optionsGranted!='')
				{
					var option1="<span style='cursor:pointer;' onclick=\"quickReport('"+arrRecordJsonObj[i]['controlPanelMenuId']+"','Report');\">Report</span>";
					var option2="<span style='cursor:pointer;' onclick=\"quickReport('"+arrRecordJsonObj[i]['controlPanelMenuId']+"','Log');\">Log</span>";
					var option3="<span style='cursor:pointer;' onclick=\"quickReport('"+arrRecordJsonObj[i]['controlPanelMenuId']+"','Delete');\">Delete</span>";
					
					var optionArray=optionsGranted.trim();
					//var optionArray=optionsGranted.split(',');
					//alert(optionArray);
					for(j=0;j<optionArray.length;j++)
					{
						if(optionArray[j]=='1')
						{
							if(optionsAvailable=='')
							{
								optionsAvailable+=option1;
							}
							else
							{
								optionsAvailable+=" | "+ option1;
							}
						}
						else if(optionArray[j]=='2')
						{
							if(optionsAvailable=='')
							{
								optionsAvailable+=option2;
							}
							else
							{
								optionsAvailable+=" | "+ option2;
							}
						}
						else if (optionArray[j]=='3')
						{
							if(optionsAvailable=='')
							{
								optionsAvailable+=option3;
							}
							else
							{
								optionsAvailable+=" | "+ option3;
							}
						}	
						
					}
				}
				else
				{
					optionsAvailable+="-";
				}

					dtlRow += 	"<div class='div-table-col boxDetails' onmouseover='changeTilesBGColor(this);' onmouseout='resetTilesBGColor(this);' >"+
					   				"<div class='innerBigboxDetails'><center><img src='"+arrRecordJsonObj[i]['controlPanelMenuImage']+"' class='icon-imageDetails' onmouseup='changeSize(this);' onmouseout='resetSize(this);' /></center></div>"+
					   				"<div class='innerSmallboxDetails' style='cursor:pointer;' onclick=\"addTab('"+arrRecordJsonObj[i]['controlPanelMenuName']+"','"+arrRecordJsonObj[i]['controlPanelMenuURL']+"','"+arrRecordJsonObj[i]['controlPanelId']+"','"+arrRecordJsonObj[i]['controlPanelMenuId']+"')\">"+arrRecordJsonObj[i]['controlPanelMenuName']+"</div>"+
					   				"<div class='innerEmptyboxDetails'>&nbsp;</div>"+
					   				"<div class='innerMessageboxDetails control' id='messageImage"+i+"'>"+
					   				"<a style='cursor:pointer;' onclick=\"showMessageDiv('"+i+"','"+arrRecordJsonObj[i]['controlPanelMenuName']+"','"+arrRecordJsonObj[i]['controlPanelMenuId']+"','"+arrRecordJsonObj[i]['controlPanelId']+"');\" >" +
					   				"Total - <span class='numberCircle'>"+arrRecordJsonObj[i]['totalRecords']+"</span> Record(s) / Valid - <span class='numberCircle'>"+arrRecordJsonObj[i]['validRecords']+"</span> Record(s) / Invalid - <span class='numberCircle'>"+arrRecordJsonObj[i]['invalidRecords']+"</span> Record(s)" +
					   				"</a></div>"+
					   				"<div class='innerEmptyboxDetails'>&nbsp;</div>"+
					   				"<div class='innerLastActionboxDetails control'><center><i>"+arrRecordJsonObj[i]['lastAction']+"</i></center></div>"+
					   				"<div class='innerEmptyboxDetails'>&nbsp;</div>"+
					   				"<div class='innerLastActionDateboxDetails control'><center><i>"+arrRecordJsonObj[i]['lastactionDate']+"</i></center></div>"+
					   				"<div class='innerEmptyboxDetails'>&nbsp;</div>"+
					   				"<div class='innerLastActionByboxDetails control'><center><i>"+arrRecordJsonObj[i]['lastActionBy']+"</i></center></div>"+
					   				"<div class='innerEmptyboxDetails'>&nbsp;</div>"+
					   				"<div class='innerLastActionByboxDetails control'><i>"+optionsAvailable+"</i></div>"+
					   				//"<div class='innerOptionboxDetails control'><center><i><span style='cursor:pointer;' onclick=\"quickReport('"+arrRecordJsonObj[i]['controlPanelMenuId']+"','Report');\">Report</span> | <span style='cursor:pointer;' onclick=\"quickReport('"+arrRecordJsonObj[i]['controlPanelMenuId']+"','Log');\">Log</span> | <span style='cursor:pointer;' onclick=\"quickReport('"+arrRecordJsonObj[i]['controlPanelMenuId']+"','Delete');\">Delete</span></i></center></div>"+
					   			"</div>";
				
			}
			//else if(menuViewType=="6")
			//{
				// Very Small Icons View
				//dtlRow += 	"<div class='div-table-row'><div class='div-table-col width100' align='left'>" +
				//				"<div class='div-table-col boxVerySmallIcon' align='left' onclick=\"addTab('"+arrRecordJsonObj[i].deskMenuName+"','"+arrRecordJsonObj[i].deskUrl+"','"+arrRecordJsonObj[i].deskMenuId+"','"+arrRecordJsonObj[i].deskMenuType+"',false,'"+dtl+"');\" title='"+arrRecordJsonObj[i].deskMenuName+"'>" +
				//					"<div class='div-table-col wrapper rounded innerBigboxVerySmallIcon' align='left' onmouseover='changeBGColor(this);' onmouseout='resetBGColor(this);' style='background-color: #1277B5'>" +
				//						"<img src='"+arrRecordJsonObj[i].deskMenuImg+"' class='icon-imageVerySmallIcon' onmouseover='changeSize(this);' onmouseout='resetSize(this);' />" +
				//					"</div>" +
				//				"</div>" +
			//				"</div><div class='div-table-col width100' align='left' onclick=\"addTab('"+arrRecordJsonObj[i].deskMenuName+"','"+arrRecordJsonObj[i].deskUrl+"','"+arrRecordJsonObj[i].deskMenuId+"','"+arrRecordJsonObj[i].deskMenuType+"',false,'"+dtl+"');\"><font size='0'>"+arrRecordJsonObj[i].deskMenuName+"</font></div></div>";				
			//}
			
			else if(menuViewType=="6")
			{
				
				//alert(arrRecordJsonObj[i].isLoginBound);
				// Very Small Icons View
				dtlRow += 	"<div class='div-table-row' style='padding: 0px;'><div class='div-table-col width100' align='center'>" +
								"<div class='div-table-col width100' align='center' style='padding: 0px;' " +
								//"onclick=\"addTab('"+arrRecordJsonObj[i].deskMenuName+"','"+arrRecordJsonObj[i].deskUrl+"','"+arrRecordJsonObj[i].deskMenuId+"','"+arrRecordJsonObj[i].deskMenuType+"',false,'"+dtl+"','"+arrRecordJsonObj[i].deskUrlType+"','"+arrRecordJsonObj[i].menuExtUrl+"');\" " +
										"title='"+arrRecordJsonObj[i].deskMenuName+"'>" +
									"<div id='"+arrRecordJsonObj[i].deskMenuId+"+"+arrRecordJsonObj[i].deskUrl+"' class='div-table-col width100' align='center' onmouseover='changeBGColor(this);' onmouseout='resetBGColor(this);' style='background-color: #FFFFFF;  color:#126295;  padding: 0px;'>" +
									"</div>" +
							"<div class='div-table-col width100' style='padding: 0px; display:block;' align='center' onclick=\"addTab('"+arrRecordJsonObj[i].deskMenuName+"','"+arrRecordJsonObj[i].deskUrl+"','"+arrRecordJsonObj[i].deskMenuId+"','"+arrRecordJsonObj[i].deskMenuType+"',false,'"+dtl+"','"+arrRecordJsonObj[i].deskUrlType+"','"+arrRecordJsonObj[i].menuExtUrl+"','"+arrRecordJsonObj[i].isLoginBound+"','"+arrRecordJsonObj[i].dutyRoleId+"');\"><font size='0' style='font-size: 9px;'><a class='wrapper rounded deskMenuStyle'>"+arrRecordJsonObj[i].deskMenuName+"</a>"+
							"<a id='"+arrRecordJsonObj[i].deskMenuId+"'></a>"+
							"</font></div></div></div></div>";				
			}
		else if(menuViewType=="7")
			{
				// Very Small Icons View
				dtlRow += 	"<div class='div-table-col' style='padding: 0px; overflow:hidden; width: "+100/arrRecordJsonObj.length+"%' align='center'>" +
								"<div class='div-table-col width100' style='padding: 0px;' align='center' " +
								//"onclick=\"addTab('"+arrRecordJsonObj[i].deskMenuName+"','"+arrRecordJsonObj[i].deskUrl+"','"+arrRecordJsonObj[i].deskMenuId+"','"+arrRecordJsonObj[i].deskMenuType+"',false,'"+dtl+"','"+arrRecordJsonObj[i].deskUrlType+"','"+arrRecordJsonObj[i].menuExtUrl+"');\" " +
										"title='"+arrRecordJsonObj[i].deskMenuName+"'>" +
									"<div id='"+arrRecordJsonObj[i].deskMenuId+"+"+arrRecordJsonObj[i].deskUrl+"' class='div-table-col width100' style='padding: 0px;' align='center' onmouseover='changeBGColor(this);' onmouseout='resetBGColor(this);' style='background-color: #FFFFFF; padding: 0px;'>" +
									"</div>" +
								"<div class='div-table-col width100' style='padding: 0px;' align='center' onclick=\"addTab('"+arrRecordJsonObj[i].deskMenuName+"','"+arrRecordJsonObj[i].deskUrl+"','"+arrRecordJsonObj[i].deskMenuId+"','"+arrRecordJsonObj[i].deskMenuType+"',false,'"+dtl+"','"+arrRecordJsonObj[i].deskUrlType+"','"+arrRecordJsonObj[i].menuExtUrl+"');\"><font size='0' style='font-size: 9px;'><a class='wrapper rounded deskMenuStyle1'>"+arrRecordJsonObj[i].deskMenuName+"</a></font></div></div>" +
							"</div>";				
			}
			
//commented by Akash Singh for removing vector ICON & placing button menu dated on 04-03-2015		
	//		else if(menuViewType=="6")
	//		{
	//			// Very Small Icons View
	//			dtlRow += 	"<div class='div-table-row' style='padding: 0px;'><div class='div-table-col width100' align='center'>" +
	//							"<div class='div-table-col width100' align='center' style='padding: 0px;' onclick=\"addTab('"+arrRecordJsonObj[i].deskMenuName+"','"+arrRecordJsonObj[i].deskUrl+"','"+arrRecordJsonObj[i].deskMenuId+"','"+arrRecordJsonObj[i].deskMenuType+"',false,'"+dtl+"');\" title='"+arrRecordJsonObj[i].deskMenuName+"'>" +
	//								"<div id='"+arrRecordJsonObj[i].deskMenuId+"+"+arrRecordJsonObj[i].deskUrl+"' class='div-table-col width100' align='center' onmouseover='changeBGColor(this);' onmouseout='resetBGColor(this);' style='background-color: #FFFFFF;  color:#126295;  padding: 0px;'>" +
	//									//"<img src='"+arrRecordJsonObj[i].deskMenuImg+"' class='icon-imageVerySmallIcon' onmouseover='changeSize(this);' onmouseout='resetSize(this);' />" +
	//									"<font><span class='"+arrRecordJsonObj[i].deskMenuImg+" ' onmouseover='changeSize(this);' onclick=\"addTab('"+arrRecordJsonObj[i].deskMenuName+"','"+arrRecordJsonObj[i].deskUrl+"','"+arrRecordJsonObj[i].deskMenuId+"','"+arrRecordJsonObj[i].deskMenuType+"',false,'"+dtl+"');\" onmouseout='resetSize(this);'></font></span>"+
	//								"</div>" +
	//						"<div class='div-table-col width100' style='padding: 0px; display:block;' align='center' onclick=\"addTab('"+arrRecordJsonObj[i].deskMenuName+"','"+arrRecordJsonObj[i].deskUrl+"','"+arrRecordJsonObj[i].deskMenuId+"','"+arrRecordJsonObj[i].deskMenuType+"',false,'"+dtl+"');\"><font size='0' style='font-size: 9px;'>"+arrRecordJsonObj[i].deskMenuName+""+
	//						"<a id='"+arrRecordJsonObj[i].deskMenuId+"'></a>"+
	//						"</font></div></div></div></div>";				
	//		}
	//		else if(menuViewType=="7")
	//		{
	//			// Very Small Icons View
	//			dtlRow += 	"<div class='div-table-col' style='padding: 0px; overflow:hidden; width: "+100/arrRecordJsonObj.length+"%' align='center'>" +
	//							"<div class='div-table-col width100' style='padding: 0px;' align='center' onclick=\"addTab('"+arrRecordJsonObj[i].deskMenuName+"','"+arrRecordJsonObj[i].deskUrl+"','"+arrRecordJsonObj[i].deskMenuId+"','"+arrRecordJsonObj[i].deskMenuType+"',false,'"+dtl+"');\" title='"+arrRecordJsonObj[i].deskMenuName+"'>" +
	//								"<div id='"+arrRecordJsonObj[i].deskMenuId+"+"+arrRecordJsonObj[i].deskUrl+"' class='div-table-col width100' style='padding: 0px;' align='center' onmouseover='changeBGColor(this);' onmouseout='resetBGColor(this);' style='background-color: #FFFFFF; padding: 0px;'>" +
	//									//"<img src='"+arrRecordJsonObj[i].deskMenuImg+"' class='icon-imageVerySmallIcon' onmouseover='changeSize(this);' onmouseout='resetSize(this);' />" +
	//									"<font color='#126295'><a class='"+arrRecordJsonObj[i].deskMenuImg+" ' onmouseover='changeSize(this);' onclick=\"addTab('"+arrRecordJsonObj[i].deskMenuName+"','"+arrRecordJsonObj[i].deskUrl+"','"+arrRecordJsonObj[i].deskMenuId+"','"+arrRecordJsonObj[i].deskMenuType+"',false,'"+dtl+"');\" onmouseout='resetSize(this);'></font></a>"+
	//								"</div>" +
	//							"<div class='div-table-col width100' style='padding: 0px;' align='center' onclick=\"addTab('"+arrRecordJsonObj[i].deskMenuName+"','"+arrRecordJsonObj[i].deskUrl+"','"+arrRecordJsonObj[i].deskMenuId+"','"+arrRecordJsonObj[i].deskMenuType+"',false,'"+dtl+"');\"><font size='0' style='font-size: 9px;'>"+arrRecordJsonObj[i].deskMenuName+"</font></div></div>" +
	//						"</div>";				
	//		}
			else
			{
				// Default - Very Small Icons View
				dtlRow += 	"<div class='div-table-row'><div class='div-table-col width100' align='left'>" +
								"<div class='div-table-col boxVerySmallIcon' align='left' " +
								//"onclick=\"addTab('"+arrRecordJsonObj[i].deskMenuName+"','"+arrRecordJsonObj[i].deskUrl+"','"+arrRecordJsonObj[i].deskMenuId+"','"+arrRecordJsonObj[i].deskMenuType+"',false,'"+dtl+"','"+arrRecordJsonObj[i].deskUrlType+"','"+arrRecordJsonObj[i].menuExtUrl+"');\" " +
										"title='"+arrRecordJsonObj[i].deskMenuName+"'>" +
									"<div class='div-table-col wrapper rounded innerBigboxVerySmallIcon' align='left' onmouseover='changeBGColor(this);' onmouseout='resetBGColor(this);' style='background-color: #1277B5'>" +
										"<img src='"+arrRecordJsonObj[i].deskMenuImg+"' class='icon-imageVerySmallIcon' onmouseover='changeSize(this);' onmouseout='resetSize(this);' />" +
									"</div>" +
								"</div>" +
							"</div><div class='div-table-col width100' align='left' onclick=\"addTab('"+arrRecordJsonObj[i].deskMenuName+"','"+arrRecordJsonObj[i].deskUrl+"','"+arrRecordJsonObj[i].deskMenuId+"','"+arrRecordJsonObj[i].deskMenuType+"',false,'"+dtl+"','"+arrRecordJsonObj[i].deskUrlType+"','"+arrRecordJsonObj[i].menuExtUrl+"');\"><font size='0'>"+arrRecordJsonObj[i].deskMenuName+"</font></div></div>";				
			}
		}
	}
	else
	{
		dtlRow +=	"";//"<div class='div-table-row'><div class='div-table-col control' style='width: 100%; padding-left: 28px; text-align: center;'>" +
					//"<img src='/HIS/hisglobal/images/nonclinical//nc_no_record_found.png' class='icon-imageLargeIcon' onmouseover='changeSize(this);' onmouseout='resetSize(this);' /><br>"+
					//"<font color='red' size='2'><b>No Process Found<b></font></div></div>";
	}
	
	return dtlRow;
}

function printRecordData()
{
	newwin=window.open('','printwin','left=100,top=100,width=700,height=700,scrollbars=yes');
	newwin.document.write('<HTML><HEAD>');
	newwin.document.write((document.getElementsByTagName("head")[0]).innerHTML);
	newwin.document.write('\n');
	newwin.document.write('<script>\n');
	newwin.document.write('function chkstate(){ \n');
	newwin.document.write('window.close();\n');
	newwin.document.write('}\n');
	newwin.document.write('function print_win(){\n');
	newwin.document.write('window.print();\n');
	newwin.document.write('chkstate();\n');
	newwin.document.write('}\n');
	newwin.document.write('<\/script>\n');
	newwin.document.write('</HEAD>\n');
	newwin.document.write('<BODY>\n');
	newwin.document.write($('[name="strRecordDetailsForPrinting"]')[0].value);
	newwin.document.write('</BODY>\n');
	newwin.document.write('<script>\n');
	newwin.document.write('document.getElementById("divPrintImageId").style.display="none"\n');
	newwin.document.write('print_win();\n');
	newwin.document.write('</script>\n');
	newwin.document.write('</HTML>\n');
	newwin.document.close();
	
}

function callOnBlur()
{
	if($('[name="strSearchProcess"]')[0].value=='')
	{
		$('[name="strSearchProcess"]')[0].value="Type Process Name";
	}
}

function callOnClick()
{
	if($('[name="strSearchProcess"]')[0].value=='Type Process Name')
	{
		$('[name="strSearchProcess"]')[0].value="";
	}
}

function clearSearch()
{
	if($('[name="strSearchProcess"]')[0].value=='Type Process Name')
	{
		
	}
	else
	{
		$('[name="strSearchProcess"]')[0].value="Type Process Name";
	}
	
	searchProcess(document.getElementById('intControlPanelId').value);
	
}

function setBackGroundColor()
{
	var colour = ["rgb(18, 109, 165)"];
	
	if($('[name="intMenuViewType"]')[0].value=="1")
	{
		// Large Icons View
		$(".innerBigboxLargeIcon").each(function() {
			var backgroundColor = colour[colour.length * Math.random() << 0];
			//var backgroundColor = getRandomColor();
			$(this).css({
				backgroundColor: backgroundColor
			});
		});	
	}
	else if($('[name="intMenuViewType"]')[0].value=="2")
	{
		// Medium Icons View
		$(".innerBigboxMediumIcon").each(function() {
			var backgroundColor = colour[colour.length * Math.random() << 0];
			//var backgroundColor = getRandomColor();
			$(this).css({
				backgroundColor: backgroundColor
			});
		});	
	}
	else if($('[name="intMenuViewType"]')[0].value=="3")
	{
		// Small Icons View
		$(".innerBigboxSmallIcon").each(function() {
			var backgroundColor = colour[colour.length * Math.random() << 0];
			//var backgroundColor = getRandomColor();
			$(this).css({
				backgroundColor: backgroundColor
			});
		});	
	}
	else
	{
		// Default - Large Icons View
		$(".innerBigboxLargeIcon").each(function() {
			var backgroundColor = colour[colour.length * Math.random() << 0];
			//var backgroundColor = getRandomColor();
			$(this).css({
				backgroundColor: backgroundColor
			});
		});	
	}
}

function changeSize(imgObj)
{
	if($('[name="intMenuViewType"]')[0])
		menuViewType = $('[name="intMenuViewType"]')[0].value;
	else
		menuViewType = 6;
		//menuViewType = 7;
		
	if(menuViewType=="1")
	{
		// Large Icons View
		$(imgObj).css({'width' : '85px' , 'height' : '85px'});
	}
	else if(menuViewType=="2")
	{
		// Medium Icons View
		$(imgObj).css({'width' : '70px' , 'height' : '70px'});
	}
	else if(menuViewType=="3")
	{
		// Small Icons View
		$(imgObj).css({'width' : '55px' , 'height' : '55px'});
	}
	else if(menuViewType=="4")
	{
		// Tiles View
		$(imgObj).css({'width' : '35px' , 'height' : '35px'});
	}
	else if(menuViewType=="5")
	{
		// Details View
		$(imgObj).css({'width' : '35px' , 'height' : '35px'});
	}
	else if(menuViewType=="6")
	{
		// Very Small Icon View
		$(imgObj).css({'width' : '31px' , 'height' : '31px'});
	}
	else if(menuViewType=="7")
	{
		// Very Small Icon View
		$(imgObj).css({'width' : '45px' , 'height' : '45px'});
	}
	else
	{
		// Default - Large Icons View
		$(imgObj).css({'width' : '85px' , 'height' : '85px'});
	}
}

function resetSize(imgObj)
{
	if($('[name="intMenuViewType"]')[0])
		menuViewType = $('[name="intMenuViewType"]')[0].value;
	else
		menuViewType = 6;
		//menuViewType = 7;

	if(menuViewType=="1")
	{
		// Large Icons View
		$(imgObj).css({'width' : '80px' , 'height' : '80px'});
	}
	else if(menuViewType=="2")
	{
		// Medium Icons View
		$(imgObj).css({'width' : '65px' , 'height' : '65px'});
	}
	else if(menuViewType=="3")
	{
		// Small Icons View
		$(imgObj).css({'width' : '50px' , 'height' : '50px'});
	}
	else if(menuViewType=="4")
	{
		// Tiles View
		$(imgObj).css({'width' : '30px' , 'height' : '30px'});
	}
	else if(menuViewType=="5")
	{
		// Details View
		$(imgObj).css({'width' : '30px' , 'height' : '30px'});
	}
	else if(menuViewType=="6")
	{
		// Very Small Icon View
		$(imgObj).css({'width' : '30px' , 'height' : '30px'});
	}
	else if(menuViewType=="7")
	{
		// Very Small Icon View
		$(imgObj).css({'width' : '22px' , 'height' : '22px'});
	}
	else
	{
		// Default - Large Icons View
		$(imgObj).css({'width' : '80px' , 'height' : '80px'});
	}
}

function changeBGColor(divObj)
{	
	var colour = ["rgb(224, 236, 255)"];
	//var colour = ["rgb(18, 109, 165)"];
	var backgroundColor = colour[colour.length * Math.random() << 0];
	
	$(divObj).css({
		backgroundColor: backgroundColor,
	});
}

function resetBGColor(divObj)
{
	//var colour = ["rgb(224, 236, 255)"];
	var colour = ["rgb(255, 255, 255)"];
	var backgroundColor = colour[colour.length * Math.random() << 0];
	
	$(divObj).css({
		backgroundColor: backgroundColor,
	});
}

function changeTilesBGColor(divObj)
{
	//var colour = ["rgb(224, 236, 255)"];
	var colour = ["rgb(255, 255, 42)"];
	var backgroundColor = colour[colour.length * Math.random() << 0];
	
	$(divObj).css({
		backgroundColor: backgroundColor,
	});
}

function resetTilesBGColor(divObj)
{
	var colour = ["rgb(255, 255, 255)"];
	//var colour = ["rgb(18, 109, 165)"];
	var backgroundColor = colour[colour.length * Math.random() << 0];
	
	$(divObj).css({
		backgroundColor: backgroundColor,
	});
}

function hideMessageDiv()
{
	$("#messageDiv").fadeOut(700);
}

function callMenu(url)
{
	var targetURL = url;
	var elemFrame = parent.document.getElementById("frmMain");
	elemFrame.src=targetURL;
	elemFrame.refresh();
}

function gotToMainTab(title, closeCurrent)
{
	//alert("B--  "+title+"  " + $('#tt').tabs('exists', title));
	if ($('#tt').tabs('exists', title))
	{
		if(closeCurrent)
		{
			var tab = $('#tt').tabs('getSelected');  // get selected panel
			var index = $('#tt').tabs('getTabIndex',tab);
			$('#tt').tabs('close', index);
		}
		$('#tt').tabs('select', title);
		var tab = $('#tt').tabs('getSelected');  // get selected panel
		var index = $('#tt').tabs('getTabIndex',tab);
		$('#tt').tabs('load', index);
	}
	else
	{
		title = "Patient List";
		gotToMainTab(title, closeCurrent);
	}
}

function goToCloseAllTabs()
{		
	var tabs = $('#tt').tabs('tabs');
	//alert("tab length is:- "+tabs.length);	
	for(var i=tabs.length-1; i>0; i--){
		//alert("OPEN TABS.."+tabs[i]);
		$('#tt').tabs('close', i);
		//alert("index is:- "+i);
	}
}


function addTab(title, url, deskMenuId, deskMenuType, flgRefresh, deskSelectInfo, deskUrlType, deskExternalMenuURL, isLoginBound, dutyRoleId)
{
	//alert("title="+title+"deskMenuId = "+deskMenuId+" URL:- "+url+" flgRefresh:- "+flgRefresh+" deskMenuType:- "+deskMenuType+" deskSelectInfo:-"+deskSelectInfo+"deskUrlType:-"+deskUrlType);
	if(typeof flgRefresh == 'undefined' || flgRefresh=="undefined") flgRefresh = false;
	if(typeof deskSelectInfo == 'undefined' || deskSelectInfo=="undefined") deskSelectInfo = '';
	if(typeof deskUrlType == 'undefined' || deskUrlType=="undefined") deskUrlType = '1';

	//alert("deskMenuId = "+deskMenuId);
	var height1= (window.innerHeight-115)+'px'; //previously It was 80px
	var targetURL = "";
	var patDeskRefreshFlag="0";
	
	
	if(deskUrlType=='2')
	{
		//alert("Inside External Tab Click !!");
		flgRefresh = true;
		var ssoTicket=parent.document.getElementsByName("varSSOTicketGrantingTicket")[0].value
		deskSelectInfo+="&isDesk=1";
		if(deskExternalMenuURL.indexOf('?')>0)
			targetURL =  deskExternalMenuURL+"&varSSOTicketGrantingTicket=" +ssoTicket+deskSelectInfo ;
		else
			targetURL =  deskExternalMenuURL+"?varSSOTicketGrantingTicket=" +ssoTicket+deskSelectInfo ;
		//alert(targetURL);
		var content = '<iframe scrolling="yes"  frameborder="0" src="'+targetURL+'" style="width:100%;height:'+height1+'; margin-top:2px;"></iframe>';		
		
	}
	else{
		//alert("Inside Internal Tab Click !!");
		if(url=='DESKPATLIST')
		{
			flgRefresh = true;
			targetURL = "/AHIMS/hisglobal/utility/dynamicdesk/list.cnt";
			var content = '<iframe scrolling="no"  frameborder="0" src="'+targetURL+'" style="width:100%;height:'+height1+'; margin-top:2px;"></iframe>';
		}
		else if(url=='DESKPATDASH')
		{		
			flgRefresh = true;
			targetURL = "/AHIMS/hisglobal/utility/dynamicdesk/deskDetail.cnt"+deskSelectInfo;
			var content = '<iframe scrolling="no" id="deskPatDashId" frameborder="0" src="'+targetURL+'" style="width:100%;height:'+height1+'; margin-top:2px;"></iframe>';
			//alert(document.getElementById('deskPatDashId'));
			if(document.getElementById('deskPatDashId'))
			{
				goToCloseAllTabs();
				targetURL = "/AHIMS/hisglobal/utility/dynamicdesk/deskDetail.cnt"+deskSelectInfo;
		     	var content = '<iframe scrolling="no" id="deskPatDashId" frameborder="0" src="'+targetURL+'" style="width:100%;height:'+height1+'; margin-top:2px;"></iframe>';
				//Commnted by Akash [22-01-2015] to close & rcreate DASHBOARD [* and added two above lines]
				//document.getElementById('deskPatDashId').src="/AHIMS/hisglobal/utility/dynamicdesk/deskDetail.cnt"+deskMenuId
				//patDeskRefreshFlag="0";
			}
		}		
		else
		{
			if(isLoginBound==0 )
			{
		//	alert(url+"loginbound is 0");	
			closeModal();
			targetURL = "/AHIMS/hisglobal/utility/dynamicdesk/centerNew.cnt?mode="+url+"&deskMenuId="+deskMenuId+"&hmode=NEW"+deskSelectInfo;
			var content = '<iframe scrolling="yes" id="'+title+'_iframe" frameborder="0" src="'+targetURL+'" style="width:100%;height:'+height1+'; margin-top:2px;"></iframe>';
			patDeskRefreshFlag = "1"; //Making this flag 1 bec while opening a new Tab this file will reload & flag becomes 0.
			//alert(targetURL);
			}
			
			if(isLoginBound==1)
			{
			//alert(url+"loginbound is 1");	
			//alert(isLogicBound);
		    //alert(dutyRoleId);
			var deskinfo=deskSelectInfo.split("&");
			//alert(deskSelectInfo);
			var action =  "/AHIMS/inpatient/nursingDeskNew.cnt?deskInfo="+deskinfo+"&mode=VALIDATEUSER&hmode=NEW&menuRoleId="+dutyRoleId+"&deskMode="+url+"&deskMenuId="+deskMenuId+"&deskTitle="+title;
		//	var action =  "/AHIMS/inpatient/nursingDeskNew.cnt?mode=VALIDATEUSER&deskMenuId="+deskMenuId+"&hmode=NEW&menuRoleId="+dutyRoleId+"&deskSelectInfo="+deskinfo;
			//alert(action);
			openURLInPopupWithoutClose(action, '500', '150');
			//alert("dfdfdfsdfsdfsdfsf----------");
			
		/*	targetURL = "/AHIMS/hisglobal/utility/dynamicdesk/centerNew.cnt?mode="+url+"&deskMenuId="+deskMenuId+"&hmode=NEW"+deskSelectInfo;
			var content = '<iframe scrolling="yes" frameborder="0" src="'+targetURL+'" style="width:100%;height:'+height1+'; margin-top:2px;"></iframe>';
			patDeskRefreshFlag = "1"; //Making this flag 1 bec while opening a new Tab this file will reload & flag becomes 0.
		*/	
			return;
			
			//url=VALIDATEUSER;
			//  /../../../inpatient/nursingDeskNew.cnt
			//targetURL = "/AHIMS/hisglobal/utility/dynamicdesk/validateUser.cnt";
			/*targetURL = "/AHIMS/inpatient/nursingDeskNew.cnt?mode=VALIDATEUSER&deskMenuId="+deskMenuId+"&hmode=NEW"+deskSelectInfo;
			alert(targetURL);
			var content = '<iframe scrolling="yes" frameborder="0" src="'+targetURL+'" style="width:100%;height:'+height1+'; margin-top:2px;"></iframe>';
			patDeskRefreshFlag = "1"; //Making this flag 1 bec while opening a new Tab this file will reload & flag becomes 0.
			*/
			
			}
			
			
			
		}
		
	}
	//alert(targetURL);

	
	if ($('#tt').tabs('exists', title))
	{		
		$('#tt').tabs('select', title);
		
		if(flgRefresh)
		{
			//alert("going..."+title+"-----"+patDeskRefreshFlag);
			$('#tt').tabs('refresh', title); 
			//$('#tt').tabs('select', title); 
		}
	} 
	else 
	{
		if(deskMenuType==-1)
		{
		    $('#tt').tabs('add',{
				title:title,
				content:content,
				border:true,
				fit:true,
				tabPosition:'bottom',
				selected:1, // set 0 if focus should not go to the new opened tab
				});
		}
		else
		{
		    $('#tt').tabs('add',{
				title:title,
				content:content,
				border:true,
				closable:true,
				fit:true,
				tabPosition:'bottom',
				selected:1, // set 0 if focus should not go to the new opened tab
				id:targetURL,
			});
		}
	
		$('#tt').tabs({	onSelect:function(title)
			{
				//alert("changed"+"  URL :"+url+"  deskMenuId :"+deskMenuId);
				var tab = $('#tt').tabs('getSelected');
				//var tabName =$('#tt').tabs('select', title);
				//tab.trigger("reloadGrid");
				//tab.panel('refresh');
				
				//filterPatientList();
					//alert(title);
					
					if (title=="Patient Dashboard")
						{
							//alert(patDeskRefreshFlag+"in Pat dash");
							if(patDeskRefreshFlag == "1")
							{
								//Commnted by Akash [22-01-2015] to stop deskrefresh logic
								//document.getElementById('deskPatDashId').contentWindow.location.reload();							
								patDeskRefreshFlag = "0";
							}
								
							//alert(title);
							//$('#tt').tabs('refresh', title); 
								//var tab = $('#tt').tabs('getSelected');
								//alert(title+"fsfsd"+tab);
								//tab.panel('refresh');
								//$('#tt').tabs('refresh', title); 
								//jQuery("#list1").jqGrid().setGridParam({url : '/AHIMS/opd/opdDeskPatientList.cnt?hmode=AJX_G_PATIENTLIST'+"&departmentUnitCode="+"0"+"&visitType="+"0"+"&roomCode="+"0"}).trigger("reloadGrid")
								//$('#tt').tabs('getSelected').panel('refresh');
								$('#tt').trigger("reloadGrid");								
						}
			}
		
		});
		
		$('#tt').tabs('select', title);
		
	}
}

function refreshDeskTab(){
	//alert("hello");
	var tab = $('#tt').tabs('getSelected');
	var targetURL=tab.panel('options').id;
	var menu=tab.panel('options').title;
	//alert(menu);
	//alert(targetURL);
	if(targetURL.indexOf("/")>=0)
	document.getElementById(menu+'_iframe').contentDocument.location=targetURL;

	//alert("Hello");
}





function changeDeskMenuState(deskMenuId, deskMenuURL, count, isToAddCount)
{
	//alert(deskMenuId+deskMenuURL+count+isToAddCount);
	//1. get Divs of Icon and text based on deskMenuId & deskMenuURL
	
		// var div = document.getElementById( '100+OPDNEXTVISITDETAIL' );
		var div = document.getElementById( deskMenuId+"+"+deskMenuURL); 
	            
	//2. clear count div
		
		document.getElementById(deskMenuId).innerHTML = "";
	
	
	//3. if count>0 then change color of both Divs 
		if(count>0)
		{
			// 3.1 if add count isToAddCount=true						            
	            div.style.color='green';
			//append (count) to text div
			if(isToAddCount)
			{
				var htmlStats = "";
				htmlStats = "("+"<font color='#ff0000'>";
				htmlStats += count ;
				htmlStats += "</font>"+")";
				document.getElementById(deskMenuId).innerHTML = htmlStats;
			}
		}
}

$(document).ajaxStart(function() {
	//alert('ajax start');
    // show loader on start
    $("#loadingmessage").css("display","block");
}).ajaxSuccess(function() {
	//alert('ajax end');
    // hide loader on success
    $("#loadingmessage").css("display","none");
});

