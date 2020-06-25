
	// global Variables
	
		var gblLeftPos = "";
		var gblTopPos = "";
		var comboObj = null;
		
function toggle(div_id) {
		
	var el = document.getElementById(div_id);
	if ( el.style.display == 'none' ) {	el.style.display = 'block';}
	else {el.style.display = 'none';}
}

function blanket_size(popUpDivVar) {
	
	if (typeof window.innerWidth != 'undefined') {
		viewportheight = window.innerHeight;
	} else {
		viewportheight = document.documentElement.clientHeight;
	}
	if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
		blanket_height = viewportheight;
	} else {
		if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
			blanket_height = document.body.parentNode.clientHeight;
		} else {
			blanket_height = document.body.parentNode.scrollHeight;
		}
	}
	var blanket = document.getElementById('blanket');
	blanket.style.height = blanket_height + 'px';
	var popUpDiv = document.getElementById(popUpDivVar);
	popUpDiv_height=blanket_height/2-150;  
	
	if(gblTopPos != ''){
		
		popUpDiv.style.top = gblTopPos + 'px';
	}else{
		popUpDiv.style.top = popUpDiv_height + 'px';
	}
}

function window_pos(popUpDivVar) {
	
		
	if (typeof window.innerWidth != 'undefined') {
		viewportwidth = window.innerHeight;
	} else {
		viewportwidth = document.documentElement.clientHeight;
	}
	if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
		window_width = viewportwidth;
	} else {
		if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
			window_width = document.body.parentNode.clientWidth;
		} else {
			window_width = document.body.parentNode.scrollWidth;
		}
	}
	var popUpDiv = document.getElementById(popUpDivVar);
	window_width=window_width/2- 150;
	
	if(gblLeftPos != ''){
		
		popUpDiv.style.left = gblLeftPos + 'px';
	}else{
	popUpDiv.style.left = popUpDiv_height + 'px';
	}
	
}

function popup(windowname,topPos ,leftPos) {
	
	var browserType = checkBrowser();
	
	if (browserType.is_ie){	
			
	var combo=document.getElementById(windowname).innerHTML;
	if(comboObj === null)
		hideCombo(windowname);
	else 
		showCombo();
	document.getElementById(windowname).innerHTML=combo;
	}
	
	gblLeftPos = leftPos; 
	gblTopPos = topPos ;
		
	blanket_size(windowname);
	window_pos(windowname);
	toggle('blanket');
	toggle(windowname);
	try{
		document.getElementById(windowname).focus();
	}catch(_err){
	}
	
}
function hideCombo(){
	comboObj=document.getElementsByTagName("select");
	for(i=0;i<comboObj.length; i++){
		comboObj[i].style.display="none";
	}
}
function showCombo(){
	for(i=0;i<comboObj.length; i++){
		comboObj[i].style.display="block";
	}
	comboObj = null;
}
function hide_popup(windowname) {
	
	var browserType = checkBrowser();
	
	if (browserType.is_ie){	
	showCombo();		
	}
	blanket_size(windowname);
	window_pos(windowname);
	toggle('blanket');
	toggle(windowname);		
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
