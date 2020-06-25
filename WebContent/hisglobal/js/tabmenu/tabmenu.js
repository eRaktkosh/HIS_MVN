$(function() {
		$(document).ready(function() {
			
			var ht = Math.round($(window).height() - $(".header").outerHeight()-$(".marque").outerHeight()-$(".footer").outerHeight()) + "px";
			var wt = Math.round($(window).width()) + "px";
			$('.body').height(ht);
			var ht2 = Math.round($(window).height() - $(".header").outerHeight()-$(".marque").outerHeight()-$(".footer").outerHeight()-$("#menuStrip").outerHeight()) + "px";
			$('.bodyContent').height(ht2);
			
			/* var ht = Math.round($(window).height() - $(".header").outerHeight()-$(".footer").outerHeight()-$(".marque").outerHeight()) + "px";
			var wt = Math.round($(window).width()) + "px";
			$('.body').height(ht);
			var ht2 = Math.round($(window).height() - $(".header").outerHeight()-$(".footer").outerHeight()-$(".marque").outerHeight()-$("#menuStrip").outerHeight()) + "px";
			$('.bodyContent').height(ht2); */
						
			$('.bodyContent').css({'margin-top':$("#menuStrip").outerHeight()});
			adjustMenuAlignment();
			/*$('.wrapper').width(wt).height(ht);
			alert('login height: '+ ht/2);
			$('.login').height(ht/2);
			 */
			$("#toggle").click(function() {
				alert('toggle called');
				$("#menuContainer").slideToggle();
			});
			 /* $(".userDetail ul li").children('div').addClass("align_right"); */
			$('#arrow_left').mouseout(adjustMenuAlignment);
			$('#arrow_right').mouseout(adjustMenuAlignment);
			$('#menu a').click(function() {
				if($(this).attr('class')=='plusParentNode'){
					$(this).removeClass('plusParentNode');
					$(this).addClass('minusParentNode');
				}else if($(this).attr('class')=='minusParentNode'){
					$(this).removeClass('minusParentNode');
					$(this).addClass('plusParentNode');
				}
			    $(this).next('ul').slideToggle();
			});
			//checkIfSlideBarRequired();
			//initSlideShow();
			$("#smoothmenu a").click(function(){
				$(this).trigger("mouseout");
			});
			$("#lastSeenMenusIcon").mouseover(function(){
				var lastSeenMenusHTML="";
				var idx;
				
				if(lastVisitedMenusStartIdx==-1){
					
				}
				else if(lastVisitedMenusEndIdx >lastVisitedMenusStartIdx){
					for(idx=lastVisitedMenusEndIdx-1; idx >=lastVisitedMenusStartIdx; idx--){
						lastSeenMenusHTML+="<li ><a  onclick=\"callMenu('"+lastVisitedURLs[idx] +"','"+lastVisitedMenus[idx]+"')\">"+lastVisitedMenus[idx] +"</a> </li>";
					}
				}else{
					for(idx=lastVisitedMenusEndIdx-1; idx >=0; idx--){
						lastSeenMenusHTML+="<li ><a  onclick=\"callMenu('"+lastVisitedURLs[idx] +"','"+lastVisitedMenus[idx]+"')\">"+lastVisitedMenus[idx] +"</a> </li>";
					}
					for(idx=maxLastVisitedMenuCount-1; idx >=lastVisitedMenusStartIdx; idx--){
						lastSeenMenusHTML+="<li ><a  onclick=\"callMenu('"+lastVisitedURLs[idx] +"','"+lastVisitedMenus[idx]+"')\">"+lastVisitedMenus[idx] +"</a> </li>";
					}
					
				}
				$("#lastSeenMenusID").html(lastSeenMenusHTML);
				//alert('last visited menus: '+ lastVisitedMenus+" lastVisitedMenusStartIdx: "+lastVisitedMenusStartIdx+" lastVisitedMenusEndIdx"+lastVisitedMenusEndIdx);
			});

			if($('#alertCount').val()>0)
				window.setInterval("$('#alertCountId').toggle();",10000);//one 0 extra

			//For Each 10 Seconds the Cash in the Desk will be refreshed, Added by Singaravelan on 04-Jun-2015
			window.setInterval(reloadCashDtl, 100000);//one 0 extra
		
							
		});
		
});


ddsmoothmenu.init({
		mainmenuid: "menuStrip", //menu DIV id
		//orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
		//classname: 'ddsmoothmenu', //class added to menu's outer DIV
		//customtheme: ["#1c5a80", "#18374a"],
		//contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
}) 
ddsmoothmenu.init({
		mainmenuid: "smoothmenu", //menu DIV id
		//orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
		//classname: 'ddsmoothmenu', //class added to menu's outer DIV
		//customtheme: ["#1c5a80", "#18374a"],
		//contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
}) 
	
function reloadCashDtl(){

	//var action="/AHIMSG5/hislogin/reloadCashUserDesk.action"
	//changed by garima for extension change
	var action="/eRaktKosh/hislogin/reloadCashUserDesk"
	/*$.ajax
	(
			{
				url : action, 
				type : "POST",
				async : true,
				dataType : "text",
				success : function(returnHTML) 
				{	
					if($('[name="varIsAutoRefresh"]').val()!=""&&$('[name="varIsAutoRefresh"]').val()!="0")
						reloadAlertDtl();
					document.getElementById("cashCollectedDiv").innerHTML=returnHTML;
					$('#cashCollectedDiv').qtip('destroy');
					$('#cashCollectedDiv').qtip({
				        content:
				        {
				        	text: 'Loading...',
				        	ajax: {
				        		//changed by garima for extension change
				        		 //url: '/eRaktKosh/hislogin/cashCollectionDtlUserDesk.action', 
				                url: '/eRaktKosh/hislogin/cashCollectionDtlUserDesk', 
				                type: 'POST', 
				                once:false,
				                data:{},
				                success: function(data, status) {					                      
				                    this.set('content.text', data);
				                }
				            }		            
				        },				          
				        style: {  	
				        	classes: 'tipCustomStyle qtip-rounded',	            	
				        },
				        position: {		       
				            my: 'top center', 
				            at: 'bottom center', 
				        }
				    });
				},
				error : function(errorMsg, textstatus, errorthrown) 
				{
						var erTxt="<font size='4 px' color='red'>Cash in Hand : Error</font>"
						document.getElementById("cashCollectedDiv").innerHTML=erTxt;
				}
			}
	);	*/
}

//To Reload the Alert Dtls in the Desk, Added by Singaravelan on 29-Oct-2015
function reloadAlertDtl(){
	
	//alert("Refresh Alert");
	//changed by garima for extension change
	//var action="/AHIMSG5/hislogin/getAlertDtlUserDesk.action"
	var action="/eRaktKosh/hislogin/getAlertDtlUserDesk"
	$.ajax
	(
			{
				url : action, 
				type : "POST",
				async : true,
				dataType : "text",
				success : function(returnHTML) 
				{	
					var alertCount="0";var mrgMsg="";
					if(returnHTML.indexOf("$")>0){
						alertCount= returnHTML.split("$")[0];
						mrqMsg=returnHTML.split("$")[1];
					}
					document.getElementById("alertCountId").innerHTML=alertCount;
					document.getElementById("footmarquee").innerHTML=mrqMsg;
					
				},
				error : function(errorMsg, textstatus, errorthrown) 
				{						
				}
			}
	);	
}
 
function addTab(menu,targetURL){
		
	
		//alert("Inside tab Addition :: Menu :: "+menu+" Url ::"+targetURL);
		if ($('#tabframe').tabs('exists', menu) && checkTabHasURL(targetURL)) {
			$('#tabframe').tabs('select', menu);
			
		} else {
			ajaxStartTab();
			var content = '<iframe id="'+menu+'_iframe" scrolling="auto" frameborder="0" src="'
					+ targetURL + '" style="width:100%;height:95%;" onLoad="ajaxCompleteTab();"></iframe>';
			tabCount=$('#tabframe ul li').length;
			$('#tabframe').tabs(
					'add', {
					title : menu,content : content,	closable : true,heightStyle: "content",	id:targetURL				
					/* tools:[{ iconCls:'icon-mini-refresh', handler:function(){tabMenuRefresh(menu,targetURL);	}}] */
				});	
			
			if(tabCount<=MAX_TAB_COUNT){
				//alert("Inside tabCount<=MAX_TAB_COUNT :: tabCount"+tabCount+" MAX_TAB_COUNT "+MAX_TAB_COUNT);		
			}
			else{
				 //alert("Inside tabCount > MAX_TAB_COUNT :: tabCount"+tabCount+" MAX_TAB_COUNT "+MAX_TAB_COUNT+" Exsists ::"+$('#tabframe').tabs('exists', 1));				 
				  $('#tabframe').tabs("close", 1);			
			}
		}
}


function tabMenuRefresh(menu,targetURL) {
	document.getElementById(menu+'_iframe').contentDocument.location=targetURL;
}

function tabRefresh(){
	var tab = $('#tabframe').tabs('getSelected');
	var targetURL=tab.panel('options').id;
	var menu=tab.panel('options').title;
	if(targetURL.indexOf("/")>=0)
		document.getElementById(menu+'_iframe').contentDocument.location=targetURL;
}
 
function checkTabHasURL(targetURL){
	
	var urlFound=false;
	var tabs = $('#tabframe').tabs('tabs');
	for(var i=0; i<tabs.length; i++){
	    if(tabs[i].panel('options').id==targetURL)
	    	urlFound=true;
	}
	return urlFound;
	
}


function menuSelected(menuName,isSelectHomeScreen)
{
	//changed by garima for extension change
	//var action="/AHIMSG5/hislogin/refreshHomeUserDesk.action";
	var action="/eRaktKosh/hislogin/refreshHomeUserDesk";
	
	var data = {
			varUserChoiceMenu:menuName
	 };
	 $.ajax
	 ({
				url : action, 
				type : "POST",
				async : true,
				dataType : "text",
				data :data,
				success : function(returnHTML) 
				{							
				  if($('#frmMainMenu').length && typeof menu != 'undefined')
					  if(document.getElementsByName("varMenuAssigned")[0].value=="")
						$('#frmMainMenu').attr('src','/eRaktKosh/hislogin/transactions/jsp/st_desk_homeMenuTab_page.jsp'); 					  
				   if(document.getElementsByName("varMenuAssigned")[0].value=="none")
					  $('#frmMainMenu').attr('src','/eRaktKosh/hislogin/transactions/jsp/st_noMenu.jsp'); 	
				  if(isSelectHomeScreen)
				 	 $('#tabframe').tabs('select', 0); 
				  else{
					  //$('#tabframe').tabs('select', 1); 
					  //$('#tabframe').tabs('select', 0); 
				  }
				  
				  $("ul#menuList li").removeClass('selectedMenu');	
				  menuName=menuName.toString().replace(/ /g, '_');
				  $("#"+menuName).addClass('selectedMenu');	
				  
				},
				error : function(errorMsg, textstatus, errorthrown) 
				{
						alert("Sorry !! Not Able to Refresh the Home Tab");
				}
	 });	
}

function showHomeTab(){
	$('#tabframe').tabs('select', 0); 
}

function closeTab(url)
{
	var targetURL = url;	
	var elemFrame = document.getElementById("frmMain");
	
	if(elemFrame!=null){
		elemFrame.src=targetURL;
		elemFrame.refresh();
	}
	else{
		if(typeof $('#tabframe')!='undefined'){
			var tab = $('#tabframe').tabs('getSelected');
			var index = $('#tabframe').tabs('getTabIndex',tab);
			$('#tabframe').tabs('select',index-1);	
			$('#tabframe').tabs('close',index);	

		}
	}
}

function maintainLastSeenMenuArray(url,menu){
	//alert('maintain url: '+ url + 'menu: '+ menu);
	 if(menu === undefined){
	 }else{	 
		if(lastVisitedMenus.indexOf(menu)!= -1){
			deleteMenuFromCircularQueue(url,menu);
		}
		addMenuToCircularQueue(url,menu);
	} 
	//alert('lastVisitedMenus: '+ lastVisitedMenus);
}

 function addMenuToCircularQueue(url,menu){
	if(lastVisitedMenusStartIdx == -1 && lastVisitedMenusEndIdx == -1){// empty array 
		lastVisitedMenus[++lastVisitedMenusEndIdx]=menu;
		lastVisitedURLs[lastVisitedMenusEndIdx]=url;
		lastVisitedMenusStartIdx=0;
		lastVisitedMenusEndIdx++;
	}else{
		lastVisitedMenus[lastVisitedMenusEndIdx]=menu;
		lastVisitedURLs[lastVisitedMenusEndIdx]=url;
		if(lastVisitedMenusEndIdx== lastVisitedMenusStartIdx)
			lastVisitedMenusStartIdx=(lastVisitedMenusStartIdx+1)%maxLastVisitedMenuCount;
		lastVisitedMenusEndIdx=(lastVisitedMenusEndIdx+1)%maxLastVisitedMenuCount;
	}
}
function deleteMenuFromCircularQueue(url,menu){
	try {
		var menuIdx= lastVisitedMenus.indexOf(menu);
		var idx;
		var noOfShuflings=lastVisitedMenusEndIdx-menuIdx-1;
		if(noOfShuflings <0){
			noOfShuflings=noOfShuflings+ maxLastVisitedMenuCount;
		}
		if(noOfShuflings > 0){
			for(idx=1; idx <= noOfShuflings; idx++ ){
				lastVisitedMenus[menuIdx]=lastVisitedMenus[(menuIdx+1)%maxLastVisitedMenuCount];
				lastVisitedURLs[menuIdx]=lastVisitedURLs[(menuIdx+1)%maxLastVisitedMenuCount];
				menuIdx=(menuIdx+1)%maxLastVisitedMenuCount;
			}
			lastVisitedMenus[menuIdx]='-1';
			lastVisitedURLs[menuIdx]='-1';
			lastVisitedMenusEndIdx=lastVisitedMenusEndIdx-1;
			if(lastVisitedMenusEndIdx<0)
				lastVisitedMenusEndIdx=lastVisitedMenusEndIdx+maxLastVisitedMenuCount;
		}else if(noOfShuflings == 0){ // only one element is there in array make array empty
			lastVisitedMenus[menuIdx]='-1';
			lastVisitedURLs[menuIdx]='-1';
			lastVisitedMenusStartIdx=-1;
			lastVisitedMenusEndIdx=-1;
		}
	}catch(err){
		alert(err);
	}	
}  

function deleteCookies()
{
	var allcookies = document.cookie.split(";");
	for (var i = 0; i < allcookies.length; i++)
	{
		var cookie = allcookies[i];
		var eqPos = cookie.indexOf("=");
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		//document.cookie = 'UP-759283=; expires=Thu, 01-Jan-70 00:00:01 GMT;'; 
		//document.cookie = name+'="";-1; path=/';
	}
}

function callLogOut(e)
{
	deleteCookies();
	submitForm("logoutLogin");
// 	document.form1.hmode.value="LOG_OUT";
// 	//document.form1.action="../startup/loginAction";
// 	document.form1.action="loginAction";
// 	document.form1.submit();
}

function searchMenu()
{
	openURLInPopup('/eRaktKosh/hislogin/transactions/jsp/st_menu_search.jsp','500','200');
	
}

function showDiv()
{
	document.getElementById("envato-widget1").style.display= "block";
}
function hideDiv()
{
	document.getElementById("envato-widget1").style.display= "none";	
}

var secs;
var timerID = null;
var timerRunning = false;
var delay = 1000;
var currentDate=null;

/*function setTime()
{   
	alert("Inside SetTime()"+'<s:property value="varIsFirstTimeLogin" />');
	
	if('<s:property value="varIsFirstTimeLogin" />'=='1')
		openURLInPopupWithoutClose("/AHIMSG5/hislogin/initFirstLoginLgnFtr","600","400");
	//changed by garima for extension change
	//openURLInPopupWithoutClose("/AHIMSG5/hislogin/initFirstLoginLgnFtr.action","600","400");	

	// Setting Time initially on Load
	var dateAsString = document.getElementsByName("varCurrentDate")[0].value;
	currentDate = convertStrToDate(dateAsString,'dd-MM-yyyy hh:mm'); // for format dd-MM-yyyy HH:mm  of 'dateAsString2'
	var tdDate=document.getElementById("dateTdId");
 	var newDateFormat = convertDateToStr(currentDate, "Week, dd-Mon-yyyy hh:mm");
	tdDate.innerHTML=newDateFormat;
	
	//alert("set time")
	InitializeTimer();
}*/

function InitializeTimer()
{
    // Set the length of the timer, in seconds
    secs = 60;
    StopTheClock();
    StartTheTimer();
}

function StopTheClock()
{	
	//alert("stop")
    if(timerRunning)
        clearTimeout(timerID);
    timerRunning = false;
}

function StartTheTimer()
{
	//alert("start")
	if (secs==0)
	{
		StopTheClock();
		var tdDate=document.getElementById("dateTdId");
		var objnewDate = addToDate(currentDate,1,"MI");
     	var newDateFormat = convertDateToStr(objnewDate, "Week, dd-Mon-yyyy hh:mm");
     	var newDate = convertDateToStr(objnewDate, "dd-MM-yyyy hh:mm");
     	currentDate = objnewDate;
     	
	   // alert("newDate---------"+newDate);
		tdDate.innerHTML=newDateFormat;
		document.getElementsByName("varCurrentDate")[0].value=newDate;

 	
      	InitializeTimer();
    }
    else
    {
        self.status = secs;
        secs = secs - 1;
      	timerRunning = true;
        timerID = self.setTimeout("StartTheTimer()", delay);
    }
}
function getNextMonth(monthId)
{
var monthArray=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];	
return monthArray[monthId];
}

function getNextDay(dayId)
{
var daysArray=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];	
return daysArray[dayId];
}
	
	

function checkIfSlideBarRequired(){
	var menuContainerWidth = $("#menuContainer").width();
	var menuWidth=0;
	$("#menuStrip #smoothmenu ul#menuList")
	.children("li")
	.each(
			function(index) {
				currentMenuWidth = $(this).outerWidth(true);
				menuWidth += currentMenuWidth;

			});
	if(menuContainerWidth > menuWidth){
		$('#arrow_left').css({'display':'none'});
		$('#arrow_right').css({'display':'none'});
		$('#menuStrip').css({'left':'0'});
	}
	
}
function adjustMenuAlignment() {
	var listColumnWidth = 0;
	var menuContainerWidth = $("#menuContainer").width();
	var leftOffset = Math.abs($("#menuStrip").offset().left);
	/*Find leftmost menu item */
	var cummulativeLeftMenuWidth = 0;
	var currentMenuWidth = 0;
	var currentWindowMenuWidth = 0;
	$("#menuStrip ul#menu")
			.children("li")
			.each(
					function(index) {
						currentMenuWidth = $(this).outerWidth(true);
						cummulativeLeftMenuWidth += currentMenuWidth;
						if (cummulativeLeftMenuWidth > leftOffset
								&& currentWindowMenuWidth < menuContainerWidth) {
							currentWindowMenuWidth += currentMenuWidth;
							listColumnWidth = $($(this).children('div'))
									.outerWidth(true);
							if (currentWindowMenuWidth + listColumnWidth > menuContainerWidth) {
								//alert('class added to '+ $(this).children("a").text());
								$(this).children('div').addClass(
										"align_right");
							} else {
								//alert('class removed from '+ $(this).children("a").text());
								$(this).children('div').removeClass(
										"align_right");
							}

						}

					});

}
	
function ajaxStart(){
    $("#loadingmessage").css("display","block");
}

function ajaxComplete(){
	$("#loadingmessage").css("display","none");
};
function ajaxStartMenu(){
    $("#loadingMenu").css("display","block");
}

function ajaxCompleteMenu(){
	$("#loadingMenu").css("display","none");
};
function ajaxStartTab(){
    $("#loadingTab").css("display","block");
}

function ajaxCompleteTab(){
	$("#loadingTab").css("display","none");
};
