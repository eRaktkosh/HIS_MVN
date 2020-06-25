function xstooltip_findPosX(obj) {
	try{
		var curleft = 0;
		if (obj.offsetParent) {
			while (obj.offsetParent) {
            	curleft += obj.offsetLeft
            	obj = obj.offsetParent;
        	}
    	}
    	else if (obj.x)
        	curleft += obj.x;
    	return curleft;
    }catch(_Err){
    }
}

function xstooltip_findPosY(obj) 
{
	try{
    	var curtop = 0;
    	if (obj.offsetParent){
        	while (obj.offsetParent) {
            	curtop += obj.offsetTop
            	obj = obj.offsetParent;
        	}
    	} else if (obj.y)
        	curtop += obj.y;
    	return curtop;
    }catch(_Err){
    }
}

function xstooltip_show(tooltipId, parentId, posX, posY)
{
    try{
    	xstooltip_hide();
	    it = document.getElementById(tooltipId);
	    itContainer = document.getElementById('allData');
	    
	    if ((it.style.top == '' || it.style.top == 0) 
	        && (it.style.left == '' || it.style.left == 0)) {
	        // need to fixate default size (MSIE problem)
	        it.style.width = it.offsetWidth + 'px';
	        it.style.height = it.offsetHeight + 'px';
	        
	        itContainer.style.width = it.offsetWidth + 'px';
	        itContainer.style.height = it.offsetHeight + 'px';
	        
	        img = document.getElementById(parentId); 
	    
	        
	        if (posX < 0 ) posX = 0; 
	        
	        x = xstooltip_findPosX(img) + posX;
	        y = xstooltip_findPosY(img) + posY;
	        
	        
	     //if tooltip is too wide, shift left to be within parent 
	        if ((parseInt(x) + parseInt(it.style.width)) >= parseInt(document.documentElement.clientWidth))	x = x - it.style.width;
	        if (y + it.offsetHeight >= document.documentElement.clientHeight) y = y - it.offsetHeight-30;
	        
	        it.style.top = y + 'px';
	        it.style.left = x + 'px';
    	}
    
		it.style.display = 'block'; 
    }catch(_Err){
    }
}

function xstooltip_hide(id)
{
    try{
    	var allDiv = document.getElementsByTagName("div");
    	for(var nTmp = 0; nTmp < allDiv.length; nTmp++){
    		if(allDiv[nTmp].id.substring(0,7)=="tooltip"){
    			allDiv[nTmp].style.display = 'none';
    		}
    	}
    }catch(_Err){
    } 
}

function getBedProperties(){
	var hmode = "BEDPROPERTIES"; 
	//var url = "PatientAdmissionTransCNT.cnt?hmode="+hmode+"&wardCode="+document.forms[0].strWard.value+"&roomCode="+document.forms[0].strRoom.value+"&bedTypeCode="+document.forms[0].strBedType.value+"&deptUnitCode="+document.forms[0].strDeptUnitCode.value;
	var WrdRoomBedtypUnt_code=document.forms[0].strWard.value+"^"+document.forms[0].strRoom.value+"^"+document.forms[0].strBedType.value+"^"+document.forms[0].strDeptUnitCode.value;
	var url="IpdCNT.cnt?hmode="+hmode+"&modPopUp="+WrdRoomBedtypUnt_code;
	ajaxFunction(url,"101");
}