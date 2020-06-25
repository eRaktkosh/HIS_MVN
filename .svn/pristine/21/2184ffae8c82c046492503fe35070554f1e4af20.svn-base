function validateAlphabetsOnly(e)
{
	var key;
	var keychar;

	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);

	keychar = keychar.toUpperCase();
//	alert(key);
	// control keys
	if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27) || (key==32))
	   return true;
	// alphas and space
	else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").indexOf(keychar) > -1))
	   return true;
	else
	   return false;
}

///////////////////////////////////validate numeric//////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


function validateNumeric(e)
{
	var key;
	var keychar;

	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);
	keychar = keychar.toLowerCase();

	// control keys
	if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27) )
	   return true;

	// numbers
	else if ((("0123456789").indexOf(keychar) > -1))
	   return true;
	else
	   return false;
}//end of numericOnly

//////////////////////////////////////////////validate alpha numeric  without any special characters.................

function validateAlphaNumericOnly(e)
{
	var key;
	var keychar;

	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);

	keychar = keychar.toUpperCase();
	//alert(key);
	// control keys
	if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27) || (key==32)|| (key==47) || (key==45) || (key==95) || (key==44))
	   return true;
	

	// alphas and numeric
	else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").indexOf(keychar) > -1))
	   return true;
		   
	   else if ((("0123456789").indexOf(keychar) > -1))
	   return true;
	   
	   
	   
	else
	   return false;
}


///////////////////////////////////validate alpha numeric field on Blur..........................


function IsAlphaNumeric(elem,fieldName)
{

var pari=parseInt(elem.value);
//alert(pari);
/*
if(parseInt(elem.value))
{
alert("Can't put Numeric Value in "+fieldName);
elem.focus();
return false;
}
else
return true;*/
}


function CheckMaxLength(e,elem,maxLen){
		//alert("inside: CheckMaxLength");
    	key = e.keyCode;
        //alert(key);
		var valid=true;
		if(key==8 || key==46) //backspace || del
			return true;
		if(key==13){	//return not allowed
		valid=false;
		return valid;
		}
		val = elem.value; 
		if(val.length+1>maxLen){
		   valid=false;	
		}
		else{		
	    	valid= true;
		}		
		return valid;		
		}