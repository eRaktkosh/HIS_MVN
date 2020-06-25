/************* Form Submit Function ********************/
//---- For Struts 2 Framework

function submitFormOnValidate(flg, actionURL)
{
	if(flg)
	{
		submitForm(actionURL);
	}
}

function submitForm(actionURL)
{
	/*document.forms[0].action = actionURL + ".action";*/
	//changed by chandan on 9-aug-2017
	document.forms[0].action = actionURL ;
	document.forms[0].submit();
}

/************* End Form Submit Function ********************/


/************* Other Function ********************/

 	
	function setPrevValue(elem, evt){
			prevValue = elem.value;
	}

////////////////////////////////////Padding with Zero	
	function padWithZeros(elem){
		val = elem.value;
		if(val.length>0){
			maxlength = elem.getAttribute('maxlength');
			zeroString="";
			for(i=0; i<maxlength-val.length;i++)
				zeroString+="0";
			elem.value = zeroString+val;
		}
	}
//////////////////////////for on load////////////////////////////////////////////
 var oldonload = window.onload;
 if (typeof window.onload != 'function') {
   window.onload = function() {
     callThisOnload();
   }
 } else {
   window.onload = function() {
     oldonload();
     callThisOnload();
   }
 } 
 //override this function in the respective tile
 function callThisOnload(){
 
 }
 
 
 /************* Field Validation Functions ********************/
 
/////////////////////////Check MaxLength in case of fields like TextArea/////////////////////////////////////////////////////////

function CheckMaxLength(e,elem,maxLen){
		//alert("inside: CheckMaxLength");
    	key = e.keyCode;
        //alert(key);
		var valid=true;
		if(key==8 || key==46) //backspace || del
			return true;
		if(key==13){	//return not allowed
		valid=true;
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


/////////////////////////////////////////check min length......................................................


function CheckMinLength(elem,minLen,name){
//alert("check min length function");
var valid=true;
val = elem.value; 

if(val.length<minLen){
        
		//alert("if less than true");
 		alert(name+" Requires minimum"+minLen+" Digits");
 		valid=false;
 		elem.focus();
 		}
		else{
		//alert("false less than");
		valid= true;

		}
		
		//alert("min valid......1111"+valid);
		return valid;		
}


//////////////alphabets without initial space//////////////

function validateAlphabetsOnly(e,obj)
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
	//alert(keychar)
	//alert("indexof="+('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ').indexOf(keychar))
	// control keys
	if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27))
	   return true;
	else if((getCursorIdex(obj)>0) && (key==32))
		return true
	// alphas and space
	
	else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").indexOf(keychar) > -1))
	   return true;
	else
	   return false;
}







///////////////////////validate alphabets with dots without initial space//////////////////////////////

function validateAlphabetsWithDotsOnly(e,obj)
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
		(key==9) || (key==13) || (key==27) )
	   return true;
	else if((getCursorIdex(obj)>0) && (key==46))
		return true
	else if((getCursorIdex(obj)>0) && (key==32))
		return true	
	// alphas and space
	else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").indexOf(keychar) > -1))
	   return true;
	else
	   return false;
}



///////////////////////validate alphabets with underscore only//////////////////////////////

function validateAlphabetsWithUnderscoreOnly(e,obj)
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
		(key==9) || (key==13) || (key==27) )
	   return true;
	else if((getCursorIdex(obj)>0) && (key==46))
		return true
	else if((getCursorIdex(obj)>0) && (key==32))
		return true	
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


///////////////////////////////////validate numeric with special charactor(<>+-*%.)//////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function validateAlphabetsNumericWithSpecialChar(e)
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
    else if((getCursorIdex(obj)>0) && (key==46))
		return true
	else if((getCursorIdex(obj)>0) && (key==32))
		return true	
	// numbers
	else if ((("0123456789<>+*=.%-").indexOf(keychar) > -1))
	   return true;
	else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").indexOf(keychar) > -1))
	   return true;
	else
	   return false;
}//end of numericOnly





//////////////////////////////////////////////validate alpha numeric  without any special characters and without initial spaces.................

function validateAlphaNumericOnly(e,obj)
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
		(key==9) || (key==13) || (key==27))
	   return true;
	else if((getCursorIdex(obj)>0) && (key==32))
		return true

	// alphas and numeric
	else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").indexOf(keychar) > -1))
	   return true;
		   
	   else if ((("0123456789").indexOf(keychar) > -1))
	   return true;
	   
	   
	   
	else
	   return false;
}









/////////////////////////////////////validate alphanumeric with dots only without initial space//////////////////

function validateAlphaNumericWithDotsOnly(e,obj)
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
		(key==9) || (key==13) || (key==27) || (key==47) || (key==45) || (key==95) || (key==44))
	   return true;
	else if((getCursorIdex(obj)>0) && (key==32))
		return true
	else if((getCursorIdex(obj)>0) && (key==46))
		return true	

	// alphas and numeric
	else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").indexOf(keychar) > -1))
	   return true;
		   
	   else if ((("0123456789").indexOf(keychar) > -1))
	   return true;
	   
	   
	   
	else
	   return false;
}





/////////////////////////////////////validate alphanumeric with special character (.,/,-) only//////////////////

function validateAlphaNumericWithSpecialCharacterOnly(e)
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
	else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ./-(),").indexOf(keychar) > -1))
	   return true;
		   
	   else if ((("0123456789").indexOf(keychar) > -1))
	   return true;
	   
	   
	   
	else
	   return false;
}


/////////////////////////////////////validate alphanumeric with special character (.,/,-) only without initial space//////////////////

function validateAlphaNumericWithSpecialCharacterOnly(e,obj)
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
		(key==9) || (key==13) || (key==27) || (key==47) || (key==45) || (key==95) || (key==44))
	   return true;
	
	else if((getCursorIdex(obj)>0) && (key==32))
		return true
	else if((getCursorIdex(obj)>0) && (key==46))
		return true	
	// alphas and numeric
	else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ./-(),").indexOf(keychar) > -1))
	   return true;
		   
	   else if ((("0123456789").indexOf(keychar) > -1))
	   return true;
	   
	else
	   return false;
}



function validateAlphaNumericWithbrecets(e,obj)
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
		(key==9) || (key==13) || (key==27) || (key==47) || (key==45) || (key==95) || (key==44))
	   return true;
	
	else if((getCursorIdex(obj)>0) && (key==32))
		return true
	else if((getCursorIdex(obj)>0) && (key==46))
		return true	
	// alphas and numeric
	else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ()-").indexOf(keychar) > -1))
	   return true;
		   
	   else if ((("0123456789").indexOf(keychar) > -1))
	   return true;
	   
	else
	   return false;
}




function validateAlphaNumericForEmailOnly(e,obj)
{
	var key;
	var keychar;

	if (window.event)
	   key = window.event.keyCode;
	else if(e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);

	keychar = keychar.toUpperCase();
	//alert(key);
	// control keys
	if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27) || (key==47) || (key==45) || (key==95) || (key==44))
	   return true;
	
	else if((getCursorIdex(obj)>0) && (key==32))
		return true
	else if((getCursorIdex(obj)>0) && (key==46))
		return true	
	// alphas and numeric
	else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@.$-").indexOf(keychar) > -1))
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

////////////////////////////////////validate currency fields.......................................

/*
function validateCurrency(e,elem)
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
	else if ((("0123456789.").indexOf(keychar) > -1))
	   return true;
	else
	   return false;
  }
  */
  /////////////////////////////////////validate amount collected////////////////
  
function currencyFormat(fld, milSep, decSep, e)
{
	var sep = 0;
	var key = '';
	var milSep="";
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	var whichCode = (window.Event) ? e.which : e.keyCode;
	//if (whichCode == 13) return true;  // Enter
	if (whichCode == 0)	return true; //tab-index
	//alert(whichCode);
	if (whichCode == 8) return true;  // Back-Space 
	key = String.fromCharCode(whichCode);  // Get key value from key code
		if (strCheck.indexOf(key) == -1) return false;  // Not a valid key
		//len = fld.value.length;
		len=11;
		for(i = 0; i < len; i++)
		if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break;
		aux = '';
	for(; i < len; i++)
	if (strCheck.indexOf(fld.value.charAt(i))!=-1) aux += fld.value.charAt(i);
	aux += key;
	len = aux.length;
	if (len == 0) fld.value = '';
	if (len == 1) fld.value = ''+ decSep + '' + aux;
	if (len == 2) fld.value = ''+ decSep + aux;
	if (len > 2) {
	aux2 = '';
	for (j = 0, i = len - 3; i >= 0; i--) {
	if (j == 3) {
	aux2 += milSep;
	j = 0;
}
aux2 += aux.charAt(i);
j++;
}
fld.value = " ";
len2 = aux2.length;
for (i = len2 - 1; i >= 0; i--)
fld.value += aux2.charAt(i);
fld.value += decSep + aux.substr(len - 2, len);
}
return false;
}
//////////////////////////////////////////////////// doHomeWork empty........///////////////////////////////////////////////////////////////////

function doHomeWork(){
}
  


//  ******************************************************************************
// *** Validation Functions

/**
 * Purpose : To ensure to enter a Numeric Value
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 
 * Ascii Code allowed 0 - 48 To 9 - 57 , for . - 46, Minus - 45
*/
function validateNumericOnly(obj,e)
{
	//alert("Char Code = "+e.charCode+"   Key Code = "+e.keyCode);
	var charCode;
	if(typeof e.charCode != 'undefined')	// Other
		charCode=e.charCode;
	else									// IE
		charCode=e.keyCode;
	//alert(charCode);
	var pattern=/\./;
	if( charCode==0 ||
		(!pattern.test(obj.value) && charCode==46) ||
		(obj.value.length==0 && charCode==45) || 
		(charCode>=48 && charCode<= 57) )
		return true;
	else
		return false;
}

/**
 * Purpose : To ensure to enter a Integer Value
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 
 * Ascii Code allowed 0 - 48 To 9 - 57 , Minus - 45 
*/
function validateIntegerOnly(obj,e)
{
	//alert("Char Code = "+e.charCode+"   Key Code = "+e.keyCode);
	var charCode;
	if(typeof e.charCode != 'undefined')	// Other
		charCode=e.charCode;
	else									// IE
		charCode=e.keyCode;
	//alert(charCode);
	if( charCode==0 || 
		(obj.value.length==0 && charCode==45) || 
		(charCode >= 48 && charCode <= 57) )
		return true;
	else
		return false;
}

/**
 * Purpose : To ensure to enter a Positive Integer Value
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 
 * Ascii Code allowed 0 - 48 To 9 - 57 
*/
function validatePositiveIntegerOnly(obj,e)
{
	//alert("Char Code = "+e.charCode+"   Key Code = "+e.keyCode);
	var charCode;
	if(typeof e.charCode != 'undefined')	// Other
		charCode=e.charCode;
	else									// IE
		charCode=e.keyCode;
	//alert(charCode);
	if( charCode==0 || 
		( charCode>=48 && charCode<= 57 ) )
		return true;
	else
		return false;
}


/**
 * Purpose : To ensure to enter a Alphabetic Value
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 
 * Ascii Code allowed A-65, Z-90, a-97, z-122, Space- 32, . -46
*/
function validateAlphaOnly(obj,e)
{
	//alert("Char Code = "+e.charCode+"   Key Code = "+e.keyCode);
	var charCode;
	if(typeof e.charCode != 'undefined')	// Other
		charCode=e.charCode;
	else									// IE
		charCode=e.keyCode;
	//alert(charCode);
	if( charCode==0 || 
		charCode==32 || 
		charCode==46 || 
		(charCode>=65 && charCode<=90) || 
		(charCode>=97 && charCode<=122) )
		return true;
	else
		return false;
}

/**
 * Purpose : To ensure to enter a Alphanumeric Value
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 
 * Ascii Code allowed 0 - 48 To 9 - 57,A-65, Z-90, a-97, z-122, Space- 32, for , - 44 
*/
function validateAlphaNumOnly(obj,e)
{
	//alert("Char Code = "+e.charCode+"   Key Code = "+e.keyCode);
	var charCode;
	if(typeof e.charCode != 'undefined')	// Other
		charCode=e.charCode;
	else									// IE
		charCode=e.keyCode;
	//alert(charCode);
	if( charCode==0 || 
		charCode==44 || 
		charCode==32 || 
		charCode==46 || 
		(charCode>=48 && charCode<=57) || 
		(charCode>=65 && charCode<=90) || 
		(charCode>=97 && charCode<=122) )
		return true;
	else
		return false;
}

/**
 * Purpose : To ensure to enter a Alphabetic Value with Underscore Only
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 
 * Ascii Code allowed A-65, Z-90, a-97, z-122, Underscore - 95
*/
function validateAlphaWithUnderscoreOnly(obj,e)
{
	//alert("Char Code = "+e.charCode+"   Key Code = "+e.keyCode);
	var charCode;
	if(typeof e.charCode != 'undefined')	// Other
		charCode=e.charCode;
	else									// IE
		charCode=e.keyCode;
	//alert(charCode);
	if( charCode==0 || 
		charCode==95 || 
		(charCode>=65 && charCode<=90) || 
		(charCode>=97 && charCode<=122) )
		return true;
	else
		return false;
}


/**
 * Purpose : To validate whether a given String is Alphabetic having Underscore Only
 * Calling On Event : onchange, user-defined way
 * Parameters : 	1.	val/string to validate
 * Return Type : boolean
*/
function validateAlphaWithUnderscoreValue(val)
{
	var pattern=/^[a-zA-Z_]*$/;
	return pattern.test(val);
}

/**
 * Purpose : To ensure that entered Value don't have any Special Character
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 
 * Restrict to enter ~!@#$%^&
 * ~ - 126, ! - 33, @ - 64, # - 35, $ - 36, % - 37,^ - 94, & - 38 
*/
function notSpecChar(obj,e) 
{
	//alert("Char Code = "+e.charCode+"   Key Code = "+e.keyCode);
	var charCode;
	if(typeof e.charCode != 'undefined')	// Other
		charCode=e.charCode;
	else									// IE
		charCode=e.keyCode;
	//alert(charCode);
	if( charCode==126 || charCode==33 || 
		charCode==64 || charCode==35 || 
		charCode==36 || charCode==37 || 
		charCode==94 || charCode== 38 )
		return false;
	else
		return true;
}

/**
 * Purpose : To allow some Special Characters in the entered Value
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 * Allow to enter ?/().,:;+-
 *  63for?  43for+  45for-  47fo /  40for( 41for) 58for: 59for; 46for. 44for,
*/
function allowSpecChars1(obj,e) 
{
	//alert("Char Code = "+e.charCode+"   Key Code = "+e.keyCode);
	var charCode;
	if(typeof e.charCode != 'undefined')	// Other
		charCode=e.charCode;
	else									// IE
		charCode=e.keyCode;
	//alert(charCode);
	if( charCode==43 || charCode==45 ||
	    charCode==63 || charCode==47 ||
	    charCode==40 || charCode==41 ||
	    charCode==58 || charCode==59 ||
	    charCode==46 || charCode==44  )
	  {  
		return true;
	}else{
		return false;
	}	
}

/**
 * Purpose : To validate whether a given String a Numeric Value
 * Calling On Event : onchange, user-defined way
 * Parameters : 	1.	val/string to validate
 * Return Type : boolean
 
 * Ascii Code allowed 0 - 48 To 9 - 57 , for . - 46, Minus - 45
*/
function validateNumericValue(val)
{
	var pattern=/^-?\d*\.?\d*$/;
	return pattern.test(val);
}

/**
 * Purpose : To validate whether a given String a Integer Value
 * Calling On Event : onchange, user-defined way
 * Parameters : 	1.	val/string to validate
 * Return Type : boolean
 
 * Ascii Code allowed 0 - 48 To 9 - 57 , Minus - 45
*/
function validateIntegerValue(val)
{
	var pattern=/^-?[0-9]*$/;
	return pattern.test(val);
}

/**
 * Purpose : To validate whether a given String a Positive Integer Value
 * Calling On Event : onchange, user-defined way
 * Parameters : 	1.	val/string to validate
 * Return Type : boolean
 
 * Ascii Code allowed 0 - 48 To 9 - 57
*/
function validatePositiveIntegerValue(val)
{
	var pattern=/^[0-9]*$/;
	return pattern.test(val);
}

/**
 * Purpose : To validate whether a given String a Alphabetic Value
 * Calling On Event : onchange, user-defined way
 * Parameters : 	1.	val/string to validate
 * Return Type : boolean
 
 * Ascii Code allowed A-65, Z-90, a-97, z-122, Space- 32, . -46
*/
function validateAlphaValue(val)
{
	var pattern=/^[a-zA-Z .]*$/;
	return pattern.test(val);
}

/**
 * Purpose : To validate whether a given String a Alphanumeric Value
 * Calling On Event : onchange, user-defined way
 * Parameters : 	1.	val/string to validate
 * Return Type : boolean
 
 * Ascii Code allowed 0 - 48 To 9 - 57,A-65, Z-90, a-97, z-122, Space- 32, for , - 44
*/
function validateAlphaNumValue(val)
{
	var pattern=/^[a-zA-Z, .0-9]*$/;
	return pattern.test(val);
}

/**
 * Purpose : To validate whether a given String don't have any Special Character
 * Calling On Event : onchange, user-defined way
 * Parameters : 	1.	val/string to validate
 * Return Type : boolean
 
 * Restrict to enter ~!@#$%^&
 * ~ - 126, ! - 33, @ - 64, # - 35, $ - 36, % - 37,^ - 94, & - 38 
*/
function notSpecCharValue(val)
{
	var pattern=/^[^~!@#$%^&]*$/;
	return pattern.test(val);
}

// *** End Validation Functions
//  ******************************************************************************
  

  
  
  
  
  
  /* <p>Developer : Deepak Tiwari
 * <p>
 * <p>Fuction shortcutKeysEventHandler handles eventListeners
 * <p>attached to Save,Clear & Cancel images in whole module.
 * @param event
 * <Note> :: Check For <div id="normalMsg"> tag in your JSP. Help wold not work in case of absence
 */	
 
var moduleCommonDIV="shortCutKey";
 
var first_key_Down=false;

var _helpOpenFlag=false;

var imgArray;

var keyCodeArray;

var enableShortCutKey=true;

var masterHotKeyCode=18; // Key :: ALT 

var _helpKeyCode=112; // Key :: F1

imgArray  = new Array();

// imgArray stores names of Images used for various events.
// There can be multiple images for a single event.
// Corresponding to single event there can be only single event key code.
// Event Images and Key code used for that event should be at same index within their repective arrays.
// keyCodeArray defined in sequence with imgArray :: Event wise key code defined
// Keys || Insert : 45 :: Delete : 46 :: End : 35

imgArray  = [
               ['save_tab.gif' ,'Save.gif' , 'btn-sv.png', 'save.png' ],   //Array of Images Used for Save Event
               
               ['clear_tab.gif' ,'btn-clr.png' ],   //Array of Images Used for Clear Event 
               
               ['cancel_tab.gif', 'btn-ccl.png' , 'Cancel.png']  //Array of Images Used for Cancel Event
            ];


keyCodeArray = new Array("45","46","35"); 

var ie = document.all;

var nn6 = document.getElementById &&! document.all;

if(ie)
{
    document.attachEvent('onkeydown',firstKeyDown);
    
    document.attachEvent('onkeyup',shortcutKeysEventHandler);
}
else
{
    document.onkeydown=firstKeyDown;
    
    document.onkeyup=shortcutKeysEventHandler;
    
    window.focus();
}

function firstKeyDown(e)
{
	if(e.keyCode==masterHotKeyCode)
	{
	    first_key_Down=true;
	}  
}   
   
function shortcutKeysEventHandler(e)
{
	 var retEval          =  false;
	 
	 var imgName          =  false;
	 
	 var bugReported      =  false;
	 
	 var listenerIndx     =  false;
	 
	 var imageVisible     =  true;
	 
	 var imgArrForKeyCode = new Array();
	 
	 if(e.keyCode==masterHotKeyCode)
	 {
	    first_key_Down  = false;
	 }
	 else
	 {
	 	 if(first_key_Down == true && enableShortCutKey)
	 	 {
	 	 	for(var i=0;i<keyCodeArray.length;i++)
	 	 	{
	 	 		if(parseInt(e.keyCode)==parseInt(keyCodeArray[i]))
	 	 		{
	 	 			if(keyCodeArray.length==imgArray.length || keyCodeArray.length<imgArray.length)
	 	 			{
	 	 			   imgArrForKeyCode=imgArray[i];
	 	 			  
	 	 			   imgName=true;
	 	 			}
	 	 			else
	 	 			{
	 	 			   alert("BUG::Image Sets Not defined for every Key Codes");
	 	 			   
	 	 			   imgName=false;
	 	 			   
	 	 			   bugReported=true;
	 	 			} 
	 	 		}
	 	 	}
	 	 }
	 }   
	 
	 if(imgName != false)
	 {
	    var obj = document.getElementsByTagName("img");
	    
	    for(var i = obj.length-1 ; (i >= 0) && (listenerIndx==false) ; i--)
	    {
	   	   var strArr = new Array();
	   	   
	   	   strArr     = obj[i].src.split("/");
	   	   
	       for(var x=0;x<imgArrForKeyCode.length;x++)
	       {
	          if(strArr[strArr.length-1]==imgArrForKeyCode[x])
	          {
	   	         listenerIndx = i;
	   	         
	   	         var selObj=obj[i];
	   	         
	   	         // While Loop::Checking whether the Button is visible on Screen or not.
	   	         while(selObj.parentNode.tagName!="FORM")
	   	         {
	   	             if(selObj.parentNode.tagName=="DIV")
	   	             {
	   	            	if(selObj.parentNode.style.display=="none")
	   	            	{
	   	            		imageVisible=false;
	   	            	}
	   	             }
	   	             selObj=selObj.parentNode;
	   	         }
	          } 
	       }  
	    }
	    if(listenerIndx != false)
	    {
	       if(typeof(obj[listenerIndx].attributes['onclick'])!="undefined")
	       {
	          var invokeFuncName=obj[listenerIndx].attributes['onclick'].value;
	          
	          if(invokeFuncName!="" && invokeFuncName.length>2 && invokeFuncName.indexOf('(')>-1 && invokeFuncName.indexOf(')')>-1)
	          {  
	             if(invokeFuncName.indexOf("return" ) > -1)
	             {
	                invokeFuncName=invokeFuncName.split("return ")[1];
	             }
	             if(_helpOpenFlag)
	             {
	             	document.getElementById(moduleCommonDIV).innerHTML="";
     	    	    
     	    	    _helpOpenFlag=false;
	             }
	             //alert("imageVisible->"+imageVisible);
	             if(imageVisible)
	             {
	               var retEval=eval(invokeFuncName);
	             }
	             else
	             {
	             	alert("Associated Image Not Visible.");
	             }  
	            
	             first_key_Down=false;
	          }
	          else
	          {
	             alert("No Event Handler Attached To :: onClick ::  Found.");
	          }    
	       }
	       else
	       {
	       	   alert("No Event Listener :: onClick ::  Found.");
	       }   
	    }
	    else
	    {
	    	alert("Shortcut Associated Image Not Found.");
	    }  
     }  
     else
     {
         if(first_key_Down==true)
         {
     	    if(e.keyCode==_helpKeyCode)
     	    {
     	    	if(_helpOpenFlag==false)
     	    	{
     	    	    _helpOpenFlag=true;
     	    	   
     	    	    shortCutKeysHELP();
     	    	}
     	    	else
     	    	{
     	    	    document.getElementById(moduleCommonDIV).innerHTML="";
     	    	    
     	    	    _helpOpenFlag=false;
     	    	}   
     	    }
     	    else
     	    {
     	        if(bugReported==false && enableShortCutKey)
     	        {
     	          // alert("Sorry, No ShortCut Event Attached.For Help Press ::  Alt+F1");
     	        }   
    	    }  
    	    first_key_Down=false;
         }   
     }
}

//This Function opens ShortCut Key Help 

function shortCutKeysHELP() 
 {
   var qh=150;var qw=300;var dh=0;var dw=0;
   
   if(window.innerHeight)
   {
      dh=window.innerHeight;
      
      dw=window.innerWidth;
   }
   else 
   {
      dh=document.documentElement.clientHeight;
      
      dw=document.documentElement.clientWidth;
   }
   var tpos=parseInt((dh-qh)/2);
   
   var lpos=parseInt((dw-qw)/2);
   
   var buttonStr;
   
   var wt = '<div id="qmvi_loading_div" style="top:'+tpos+'px;left:'+lpos+'px;width:'+qw+'px;position:absolute;text-align:center;font-family:Arial;text-decoration:none;font-weight:normal;font-size:13px;color:#00224A;background-color:#ffffff;border-width:1px;border-color:#828EA2;border-style:solid;">';
       wt+= '<table width="100%" cellspacing="1px" cellpadding="1px" border="0">';
       wt+= '<tr class="HEADER"><td colspan="2">Short Cut Key Help Menu</td></tr>';
       wt+= '<tr><td class="multiLabel" width="50%">Short Cut Keys</td><td class="multiLabel" width="50%">Event</td></tr>';
       wt+= '<tr><td class="multiControl" width="50%">ALT + Insert</td><td class="multiControl" width="50%">SAVE</td></tr>';
       wt+= '<tr><td class="multiControl" width="50%">ALT + Delete</td><td class="multiControl" width="50%">CLEAR</td></tr>';
       wt+= '<tr><td class="multiControl" width="50%">ALT + End</td><td class="multiControl" width="50%">CANCEL</td></tr>';
       wt+= '<tr><td class="multiControl" width="50%">ALT + F1</td><td class="multiControl" width="50%">HELP/Hide HELP</td></tr>';
       if(enableShortCutKey)
       {
         buttonStr="Disable";
       } 
       else
       {
         buttonStr="Enable"; 
       }    
       wt+= '<tr><td class="multiControl" width="100%" colspan="2"><input type="button" name="shortCutHelpED_Button" value="'+buttonStr+' Short Cut Keys" onClick="enableDisableShortCutKeys();"</td></tr>';
       wt+= '<tr class="FOOTER"><td colspan="2"></td></tr>';
       wt+= '</table>';
       wt+='</div>';
       
   document.getElementById(moduleCommonDIV).innerHTML="";
   
   document.getElementById(moduleCommonDIV).style.display="block";
   
   document.getElementById(moduleCommonDIV).innerHTML=wt;
 }


// This Function Enables or Disables ShortCutKey Event Handler
 
function enableDisableShortCutKeys()
{
	if(enableShortCutKey)
	{
	    enableShortCutKey=false;
	  
	    //alert("Short Cut Keys Disabled");
	  
	    document.forms[0].shortCutHelpED_Button.value="Enable Short Cut Keys";
	  
	    document.getElementById(moduleCommonDIV).innerHTML="";
	  
	    _helpOpenFlag=false;
	}
	else
	{
	    enableShortCutKey=true;
	 
	    //alert("Short Cut Keys Enabled");
	   
	    document.forms[0].shortCutHelpED_Button.value="Disable Short Cut Keys";
	 
	    document.getElementById(moduleCommonDIV).innerHTML="";
	 
	    _helpOpenFlag=false;
	}    
	
}	
	
	
	
	
	////////////////////////////////
	
	
	
//////////////////////////////email validation//////////////////////////////////
function validateEmail(obj){
var testresults;
if(trimSpec(obj.value)!="")
{
 var str=obj.value
 var filter=/^.+@.+\..{2,3}$/

 if (filter.test(str))
    testresults=true
 else {
    alert("Please enter valid email address")
    testresults=false
}
}
else
{
	testresults=true;
}
 return (testresults)
}


function trimSpec(strValue)
{
	var j;
	var retStr = "";
	var len = strValue.length;
	
	for(j = 0;j < len;j++)
	{
		if(strValue.charAt(j) != " ") retStr += strValue.charAt(j);
	}	
	
	return retStr;		
}	
//////////////////////////////////////////	
	
	
	
	
	


function getCursorIdex(obj) {
	if (obj.createTextRange) {
		var r = document.selection.createRange().duplicate()
		r.moveEnd('character', obj.value.length)
		if (r.text == '') return obj.value.length
		return obj.value.lastIndexOf(r.text)
	} else return obj.selectionStart
}

  

