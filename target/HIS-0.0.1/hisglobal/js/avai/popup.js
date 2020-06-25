/*
List of functions in this file

 1>	 display_popup_menu(parent,named)
 2> hide_popup_menu(named)
	
*/

/*
Display a named menu, at the position of another object

	parent -> the parent window in which popup should appear.(in general "this")
	divId  -> id of the div used in the file. 
*/
 /*
function display_popup_menu(parent,divId,leftPos,topPos)
{

	//get the named menu
	var menu_element = document.getElementById(divId);
	//override the 'display:none;' style attribute
	menu_element.style.display = "";
	//get the placement of the element that invoked the menu...
	var placement = findPos(parent);
	//...and put the menu there
	
	if(leftPos == ""){
		menu_element.style.left = placement[0] + "px";
	}else{
		menu_element.style.left = leftPos + "px";
	}
	
	
	if(topPos == ""){
		menu_element.style.top = placement[1] + "px";
	}else{
		menu_element.style.top = topPos + "px";
	}
}

*/

/*
Hide a named menu

	divId  -> id of the div used in the file. 
*/

/*
function hide_popup_menu(divId)
{
	//get the named menu
	var menu_element = document.getElementById(divId);
	//hide it with a style attribute
	menu_element.style.display = "none";
}

*/
//findPos function is from http://www.quirksmode.org/js/findpos.html;
//where its workings are explained in more detail.

/*
function findPos(obj) {
	var curleft = curtop = 0;
	
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	
	return [curleft,curtop];
}

*/






var gblParent = "";
var hidden = false;

var gblCmbArr = null;
var gblCmbTitle = null;

function display_popup_menu(parent,divId,leftPos,topPos)
{

gblParent = parent;

	//get the named menu
	var menu_element = document.getElementById(divId);
	
	//alert(menu_element.style.display);
	
	if(menu_element.style.display == "block"){
		
	//	alert("inside block");
		
		hide_popup_menu(divId);
	}
		menu_element = document.getElementById(divId);
	
	
	//menu_element.offsetParent = parent;
	
	//override the 'display:none;' style attribute
	menu_element.style.display = "block";
	//get the placement of the element that invoked the menu...
	var placement = findPos(parent);
	//...and put the menu there
	
	if(leftPos == ""){
		menu_element.style.left = placement[0] + "px";
	}else{
		menu_element.style.left = leftPos + "px";
	}
	
	
	if(topPos == ""){
		menu_element.style.top = placement[1] + "px";
	}else{
		menu_element.style.top = topPos + "px";
	}
	hidden = false;
	hidePageCombo(menu_element);
	menu_element.focus();
}

/*
Hide a named menu

	divId  -> id of the div used in the file. 
*/
function hide_popup_menu(divId)
{
	//get the named menu
	var menu_element = document.getElementById(divId);
	//hide it with a style attribute
	menu_element.style.display = "none";
	hidden = true;
	//hidePageCombo(menu_element);
	showPageCombo();
}


/*
Hide a named menu

	divId  -> id of the div used in the file. 
*/
function styledPopupClose(divId) {

	hide_popup_menu(divId);

}


//findPos function is from http://www.quirksmode.org/js/findpos.html;
//where its workings are explained in more detail.
function findPos(obj) {
	var curleft = curtop = 0;
	
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	
	return [curleft,curtop];
}







function checkBrowser()
{
	// detect a special case of "web browser"
	var ois_ie = ( /msie/i.test(navigator.userAgent) &&
		   !/opera/i.test(navigator.userAgent) );

	var ois_ie5 = ( ois_ie && /msie 5\.0/i.test(navigator.userAgent) );

	/// detect Opera browser
	var ois_opera = /opera/i.test(navigator.userAgent);

	/// detect KHTML-based browsers
	var ois_khtml = /Konqueror|Safari|KHTML/i.test(navigator.userAgent);

//alert(ois_ie);
//alert(ois_ie5);
//alert(ois_opera);
//alert(ois_khtml);

return {is_ie:ois_ie,is_ie5:ois_ie5,is_opera:ois_opera,ois_khtml:ois_khtml};
}

/*
function getAbsolutePos(el) 
{
	var SL = 0, ST = 0;
	var is_div = /^div$/i.test(el.tagName);
	if (is_div && el.scrollLeft)
		SL = el.scrollLeft;
	if (is_div && el.scrollTop)
		ST = el.scrollTop;
	var r = { x: el.offsetLeft - SL, y: el.offsetTop - ST };
	
	return r;
}
*/

function getAbsolutePos(obj) {
	var curleft = curtop = 0;
	
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	
	var r = { x: curleft, y: curtop };
	return r;
}

function getVisib(obj,Calendar){
	
	var value = obj.style.visibility;
	if (!value) {
		if (document.defaultView && typeof (document.defaultView.getComputedStyle) == "function") 
		{
			if (!Calendar.is_khtml)
				value = document.defaultView.getComputedStyle(obj, "").getPropertyValue("visibility");
			else
				value = '';
		} 
		else 
			if (obj.currentStyle) { 
				value = obj.currentStyle.visibility;
			} 
			else
				value = '';
	}
	
	return value;
}
	
function hidePageCombo(obj)
{
	var p;
		
	var Calendar = checkBrowser();
	
	if (!Calendar.is_ie && !Calendar.is_opera)
		return;
	
	var tags = new Array("select");
	
	//this is pop up window absolute position
		
	var el = obj;

	//alert(el);
	
	p = getAbsolutePos(el);
	/*	
	if (el.offsetParent) {
		p = this.getAbsolutePos(el.offsetParent);
	}
	else
		p = getAbsolutePos(el);
	*/
		
	var EX1 = p.x;
	var EX2 = el.offsetWidth + EX1;
	var EY1 = p.y;
	var EY2 = el.offsetHeight + EY1;
	
	//alert("EX1 : "+EX1+", EX2 : "+EX2+" EY1 : "+EY1+" EY2 : "+EY2);
	
	//alert(EX1);
	//alert(EX2);
	//alert(EY1);
	//alert(EY2);
	
	//alert("gupta = 1");	
	for (var k = tags.length; k > 0; ) {
		var ar = document.getElementsByTagName(tags[--k]);
		var cc = null;

//alert("gupta = 2");	
		//declare array
		gblCmbArr = new Array(ar.length);
		gblCmbTitle = new Array(ar.length);
		
		for (var i = ar.length; i > 0;) {
			cc = ar[--i];
			
			//if in div, combo exists then this combo must be visible. so set title = _div_popup_cntl for these combo
			if (cc.title != "_div_popup_cntl") {
			/*
			if (cc.offsetParent) {
			//alert("gupta = 4");	
				p = this.getAbsolutePos(cc.offsetParent);
			}
			else {
			//alert("gupta = 5");	
				p = getAbsolutePos(cc);
			}
			*/
				p = getAbsolutePos(cc);
				
				var CX1 = p.x;
				var CX2 = cc.offsetWidth + CX1;
				var CY1 = p.y;
				var CY2 = cc.offsetHeight + CY1;
				
						
				if (hidden || (CX1 > EX2) || (CX2 < EX1) || (CY1 > EY2) || (CY2 < EY1)) {
					
					gblCmbArr[i] = null;
					gblCmbTitle[i] = "";
					
				} else {
					if (!cc.__msh_save_visibility) {
						cc.__msh_save_visibility = getVisib(cc,Calendar);
					}
					
					if(cc.title != "_div_popup") {	
						gblCmbTitle[i] = cc.title;
						cc.title = "_div_popup";
						gblCmbArr[i] = cc;
					}
					else {
						gblCmbTitle[i] = "";
						gblCmbArr[i] = null;
					}
									
					cc.style.visibility = "hidden";
				}
			}
		}	
	} //for loop
}

function showPageCombo()
{
	var Calendar = checkBrowser();
	
	if (!Calendar.is_ie && !Calendar.is_opera)
		return;
		
	for(i=0;i<gblCmbArr.length;i++) {
		
		//alert(gblCmbArr[i]);
		
		if(gblCmbArr[i] != null) {
			
			gblCmbArr[i].title = gblCmbTitle[i];	
			gblCmbArr[i].style.visibility = "visible";
		}
	}
}






function openPopup(url,eventObj)
{
if(eventObj.type=="click" || eventObj.keyCode==13)
 {
   	var child = window.open(url,'popupWindow','status=yes,scrollbars=yes,height=200,width=350,left=10,top=10');  
  	child.moveTo(250,250);
 	child.focus(); 

if(!child.opener)
   child.opener = self;
 }
}

function openPopup(url,eventObj, height, width)
{
if(eventObj.type=="click" || eventObj.keyCode==13 )
 {
   	var child = window.open(url,'popupWindow','status=yes,scrollbars=yes,height='+height+',width='+width+',left=10,top=10');  
  	child.moveTo(250,250);
 	child.focus(); 

if(!child.opener)
   child.opener = self;
 }
 return child
}

function openPopupWide(id,url,eventObj)
{
//alert("ddddddddddddddddddddddddd");
// alert("inside openPopup"+eventObj);
 if(eventObj.type=="click" || eventObj.keyCode==13)
 {   
  	var child = window.open(url+"?empIdChk="+id,'popupWindow','status=yes,scrollbars=yes,height=500,width=750,left=10,top=10,alwaysRaised=true');  
   	child.focus(); 
//  	alert("after openPopup");
if (!child.opener)
   child.opener = self;  	
 } 
}

function openDependentPopup(url,eventObj, height, width,resize)
{
if(eventObj.type=="click" || eventObj.keyCode==13)
 {
   	var child = window.open(url,'popupWindow','status=yes,scrollbars=yes,height='+height+',width='+width+',left=10,top=10,dependent=yes,resizable='+resize+'');  
  	child.moveTo(250,250);
 	child.focus(); 

if(!child.opener)
   child.opener = self;
 }
 return child
}

/*function openPopup()
{
 var url = "newemp.jsp";
 myPopup = window.open(url,'popupWindow','width=400,height=300,scrollbars=yes');
 if (!myPopup.opener)
   myPopup.opener = self;
}*/

