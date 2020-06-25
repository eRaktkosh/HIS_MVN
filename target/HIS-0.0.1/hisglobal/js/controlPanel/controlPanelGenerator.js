/* Module Name: Dynamic Control Panel
*  Name of Process: Control Panel Generator 
*  Name of Developer: Sh. Gaurav Gotra
*  Name of TL: Sh. Gaurav Gotra 
*  Date of Creation: 04-07-2014
*/

var controlPanelGenerator={
		
	 fetchControlPanelMenuDetails:function ()
	 {
		//For Multilingual Initialization
		initMultilingual();
		
		var controlPanelId = $('[name="intControlPanelId"]')[0].value;
		//alert("Control Panel Id - "+controlPanelId);
		var html = getControlPanelDetails(controlPanelId);
		//$("#divControlPanelMenuDetailsId").html("");
		$("#divControlPanelMenuDetailsId").html(html);
		//document.getElementById('divControlPanelMenuDetailsId').innerHTML=html;
		
		setBackGroundColor();
		
	  },
	  
};

function searchProcess(controlPanelId)
{
	//alert("inside searchProcess with Control Panel Id - "+controlPanelId);
	var html = getControlPanelDetails(controlPanelId);
	$("#divControlPanelMenuDetailsId").html(html);
	setBackGroundColor();
}

function getControlPanelDetails(controlPanelId)
{
	//alert("Record Id = "+recordId);
	var result="";
	var filterCondition = $('[name="strSearchProcess"]')[0].value;
	//alert("filterCondition = "+filterCondition);
	if(filterCondition=='Type Process Name')
		filterCondition="";
	
	var action 	= "/HISFms/dynamicControlPanel/getControlPanelDetailsControlPanelGenerator.action?"+
	"&controlPanelId="+controlPanelId+"&filterCondition="+filterCondition;

	$.ajax({url: action,type:"POST",async:false,dataType:"json",success:function(data)
	{
		arrRecordGlobalJsonObj=data;
		if(controlPanelId!="")
			result = createControlPanelRow(data);
		else
			alert("Control Panel Id is null..!");
		
	},error: function(errorMsg,textstatus,errorthrown) 
	{
		alert('getControlPanelDetails '+errorMsg+" textstatus::"+textstatus+" errorthrown::"+errorthrown);
	}
	});
	
	return result;
}

function createControlPanelRow(arrStrRecordJsonObj)
{
	var dtlRow="";
	
	var arrRecordJsonObj = arrStrRecordJsonObj;
	
	if(arrRecordJsonObj!="")
	{
		document.getElementById('divControlPanelTitleId').innerHTML = "<font size='4'><b>"+arrRecordJsonObj[0]['controlPanelName']+"</b></font>&nbsp;&nbsp;<img id='imgRefreshId' src='/HIS/hisglobal/images/nonclinical/nc_refresh.png' style='cursor:pointer' title='Refresh' height='25' width='25' align='top' onclick=\"searchProcess(document.getElementById('intControlPanelId').value);\">";
		// Setting Acces to Menu and Default Menu View as
		if($('[name="intMenuViewType"]')[0].value=="-1")
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
			$('[name="intMenuViewType"]')[0].value=arrRecordJsonObj[0]['defaultMenuViewAs'];
		}
		
		
		for (i in arrRecordJsonObj)
		{
			if($('[name="intMenuViewType"]')[0].value=="1")
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
			else if($('[name="intMenuViewType"]')[0].value=="2")
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
			else if($('[name="intMenuViewType"]')[0].value=="3")
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
			else if($('[name="intMenuViewType"]')[0].value=="4")
			{
				//Tiles View
				dtlRow += 	"<div class='div-table-col boxTiles' onclick=\"addTab('"+arrRecordJsonObj[i]['controlPanelMenuName']+"','"+arrRecordJsonObj[i]['controlPanelMenuURL']+"','"+arrRecordJsonObj[i]['controlPanelId']+"','"+arrRecordJsonObj[i]['controlPanelMenuId']+"')\">"+
				   				"<div class='innerBigboxTiles'><img src='"+arrRecordJsonObj[i]['controlPanelMenuImage']+"' class='icon-imageTiles' onmouseover='changeSize(this);' onmouseout='resetSize(this);' />"+
				   				"&nbsp;&nbsp;</div>"+
				   				"<div class='innerSmallboxTiles' onmouseover='changeTilesBGColor(this);' onmouseout='resetTilesBGColor(this);'>"+arrRecordJsonObj[i]['controlPanelMenuName']+"</div>"+
				   			"</div>";
			}
			else if($('[name="intMenuViewType"]')[0].value=="5")
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
			else
			{
				// Default - Large Icons View
				dtlRow += 	"<div class='div-table-col boxLargeIcon' onclick=\"addTab('"+arrRecordJsonObj[i]['controlPanelMenuName']+"','"+arrRecordJsonObj[i]['controlPanelMenuURL']+"','"+arrRecordJsonObj[i]['controlPanelId']+"','"+arrRecordJsonObj[i]['controlPanelMenuId']+"')\" >"+
				   				"<div class='div-table-col wrapper rounded innerBigboxLargeIcon' onmouseover='changeBGColor(this);' onmouseout='resetBGColor(this);'>"+
				   					"<img src='"+arrRecordJsonObj[i]['controlPanelMenuImage']+"' class='icon-imageLargeIcon' onmouseover='changeSize(this);' onmouseout='resetSize(this);' /><br>"+
				   				"</div>"+
				   				"<div class='div-table-col innerSmallboxLargeIcon'>" +
				   					arrRecordJsonObj[i]['controlPanelMenuName']+
				   				"</div>"+
				   			"</div>";
			}
			
			
			
		}
	}
	else
	{
		dtlRow +=	"<div class='div-table-row'><div class='div-table-col control' style='width: 100%; padding-left: 28px; text-align: center;'>" +
					"<img src='/HIS/hisglobal/images/nonclinical//nc_no_record_found.png' class='icon-imageLargeIcon' onmouseover='changeSize(this);' onmouseout='resetSize(this);' /><br>"+
					"<font color='red' size='2'><b>No Process Found<b></font></div></div>";
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
	if($('[name="intMenuViewType"]')[0].value=="1")
	{
		// Large Icons View
		$(imgObj).css({'width' : '85px' , 'height' : '85px'});
	}
	else if($('[name="intMenuViewType"]')[0].value=="2")
	{
		// Medium Icons View
		$(imgObj).css({'width' : '70px' , 'height' : '70px'});
	}
	else if($('[name="intMenuViewType"]')[0].value=="3")
	{
		// Small Icons View
		$(imgObj).css({'width' : '55px' , 'height' : '55px'});
	}
	else if($('[name="intMenuViewType"]')[0].value=="4")
	{
		// Tiles View
		$(imgObj).css({'width' : '35px' , 'height' : '35px'});
	}
	else if($('[name="intMenuViewType"]')[0].value=="5")
	{
		// Details View
		$(imgObj).css({'width' : '35px' , 'height' : '35px'});
	}
	else
	{
		// Default - Large Icons View
		$(imgObj).css({'width' : '85px' , 'height' : '85px'});
	}
}

function resetSize(imgObj)
{
	if($('[name="intMenuViewType"]')[0].value=="1")
	{
		// Large Icons View
		$(imgObj).css({'width' : '80px' , 'height' : '80px'});
	}
	else if($('[name="intMenuViewType"]')[0].value=="2")
	{
		// Medium Icons View
		$(imgObj).css({'width' : '65px' , 'height' : '65px'});
	}
	else if($('[name="intMenuViewType"]')[0].value=="3")
	{
		// Small Icons View
		$(imgObj).css({'width' : '50px' , 'height' : '50px'});
	}
	else if($('[name="intMenuViewType"]')[0].value=="4")
	{
		// Tiles View
		$(imgObj).css({'width' : '30px' , 'height' : '30px'});
	}
	else if($('[name="intMenuViewType"]')[0].value=="5")
	{
		// Details View
		$(imgObj).css({'width' : '30px' , 'height' : '30px'});
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
	var colour = ["rgb(18, 109, 165)"];
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

/*function addTab(title, url, controlPanelId, controlPanelMenuId)
{
	//alert("hello");
	if ($('#tt').tabs('exists', title))
	{
		$('#tt').tabs('select', title);
	} 
	else 
	{
		//alert("controlPanelId = "+controlPanelId);
		//alert("controlPanelMenuId = "+controlPanelMenuId);
		
		var targetURL = url+"?controlPanelId="+controlPanelId+"&controlPanelMenuId="+controlPanelMenuId;
		
		var height1= (window.innerHeight-40)+'px';
		//alert(height1);
		var content = '<iframe scrolling="auto" frameborder="0" src="'+targetURL+'" style="width:100%;height:'+height1+'; margin-top:2px;"></iframe>';
		
	    $('#tt').tabs('add',{
								title:title,
								content:content,
								border:true,
								closable:true,
								selected:1, // set 0 if focus should not go to the new opened tab
								
							});
	    
		$('#tt').tabs({
			onSelect:function(title)
			{
				var tab = $('#tt').tabs('getSelected');
				tab.panel('refresh');
			}
		
		});
		
		$('#tt').tabs('select', title);
		
	}
}*/

$(document).ajaxStart(function() {
	//alert('ajax start');
    // show loader on start
    $("#loadingmessage").css("display","block");
}).ajaxSuccess(function() {
	//alert('ajax end');
    // hide loader on success
    $("#loadingmessage").css("display","none");
});

