//  ******************************************************************************
// *** Validation Functions

/**
 * Purpose : Just Calling a Functions that does Nothing
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
*/
function validateNone(obj,e)
{
	return true;
}

/**
 * Purpose : To ensure to enter a Numeric Value
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 
 * Ascii Code allowed 0 - 48 To 9 - 57 , for . - 46, Minus - 45
*/
function validateNumericOnly(obj,e)
{
	try
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
	catch(e)
	{
		alert("Error Message -> "+e.message);
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
 * Purpose : To ensure to enter a Positive Numeric Value
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 
 * Ascii Code allowed 0 - 48 To 9 - 57 , for . - 46
*/
function validatePositiveNumericOnly(obj,e)
{
	try
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
			(charCode>=48 && charCode<= 57) )
			return true;
		else
			return false;
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
}

/**
 * Purpose : To validate whether a given String a Positive Numeric Value
 * Calling On Event : onchange, user-defined way
 * Parameters : 	1.	val/string to validate
 * Return Type : boolean
 
 * Ascii Code allowed 0 - 48 To 9 - 57 , for . - 46
*/
function validatePositiveNumericValue(val)
{
	var pattern=/^\d*\.?\d*$/;
	return pattern.test(val);
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
	try
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
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
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
 * Purpose : To ensure to enter a Positive Integer Value
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 
 * Ascii Code allowed 0 - 48 To 9 - 57 
*/
function validatePositiveIntegerOnly(obj,e)
{
	try
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
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
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
 * Purpose : To ensure to enter a Alphabetic Value
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 
 * Ascii Code allowed A-65, Z-90, a-97, z-122, Space- 32, . -46
*/
function validateAlphaOnly(obj,e)
{
	try
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
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
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
 * Purpose : To ensure to enter a Alphanumeric Value
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 
 * Ascii Code allowed 0 - 48 To 9 - 57,A-65, Z-90, a-97, z-122, Space- 32, comma(,)-44 , .-46 
*/
function validateAlphaNumOnly(obj,e)
{
	try
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
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
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
 * Purpose : To ensure that entered Value don't have any Special Character
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 
 * Restrict to enter ~!@#$%^&
 * ~ - 126, ! - 33, @ - 64, # - 35, $ - 36, % - 37,^ - 94, & - 38 
*/
function notSpecChar(obj,e) 
{
	try
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
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
}

/**
 * Purpose : To ensure that entered Value don't have any Special Character
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 
 * Restrict to enter ~#$^
 * ~ - 126, # - 35, $ - 36, ^ - 94 
*/
function noSpecCharInTextInputs(obj,e) 
{
	var k=e.charCode;
	//alert(k);
	if( k==126 || k==35 || k==36 || k==94)
		return false;
	else
		return true;
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


/**
 * Purpose : To ensure that entered Value don't have any Special Character for Regular Expression
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	&	2.	event
 * Return Type : boolean
 
 * Restrict to enter ~!@#%&
 * ~ - 126, ! - 33, @ - 64, # - 35, % - 37, & - 38 
*/
function notSpecCharRegEx(obj,e)
{
	try
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
			charCode==37 || charCode== 38 )
			return false;
		else
			return true;
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
}

/**
 * Purpose : To validate whether a given String don't have any Special Character for Regular Expression
 * Calling On Event : onchange, user-defined way
 * Parameters : 	1.	val/string to validate
 * Return Type : boolean
 
 * Restrict to enter ~!@#%&
 * ~ - 126, ! - 33, @ - 64, # - 35, % - 37, & - 38 
*/
function notSpecCharRegEx(val)
{
	var pattern=/^[^~!@#%&]*$/;
	return pattern.test(val);
}


/**
 * Purpose : To ensure that entered Value have given Character
 * Calling On Event : onkeypress
 * Parameters : 	1.	this	2.	event	3. string of characters allowed 
 * Return Type : boolean
*/
function validateWithCharacters(obj,e,chars) 
{
	try
	{
		//alert("Char Code = "+e.charCode+"   Key Code = "+e.keyCode);
		var charCode;
		if(typeof e.charCode != 'undefined')	// Other
			charCode=e.charCode;
		else									// IE
			charCode=e.keyCode;
		//alert(charCode);
		var char = String.fromCharCode(charCode);
		if ( chars.indexOf(char) > -1)
			return true;
		else
			return false;
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
}

// *** End Validation Functions
//  ******************************************************************************





// ******************************************************************************
// *** Template Related Functions

	// Validate Textarea Length in Template
function validateTextareaLength(obj, e, maxLength)
{
	try
	{
		var charCode;
		if(typeof e.charCode != 'undefined')	// Other
			charCode=e.charCode;
		else									// IE
			charCode=e.keyCode;
		if(charCode==0)	return true;
		if(obj.value.length+1 > maxLength)
			return false;
		else
			return true;
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
}

	// Validate Parameter Regular Expression
function validatePARAMETERRegExp(obj,e,format,re)
{
	if(re!="" && obj.value!="")
	{
		var rep=new RegExp(re,"");
		if(!rep.test(obj.value))
		{
			alert("The Value in not in the Format  \n "+format+" \n Please Enter the value in Proper Format   ...");
			obj.focus();
		}
	}
}

	// Validate Parameter Range
function validatePARAMETERRange(obj,e,lowRng,highRng)
{
	var low = parseFloat(lowRng);
	var high = parseFloat(highRng);
	if(typeof low == 'NaN' ) low=-1;
	if(typeof high == 'NaN' ) high=-1;
	if(!( (low==-1 || (low!=-1 && obj.value>=low)) && (high==-1 || (high!=-1 && obj.value<=high) ) ))
	{
		alert("Value ("+obj.value+") in not in Valid Range of ("+low+"-"+high+") ...");
		obj.focus();
	}
}

	// Getting Parameters Elemnts List By Parameter ID
var PARA_ID_SIZE = 7;	//5 
	
function getElementsListByParaId(_paraId)
{
	var lstElems = new Array(100);
	var count = 0;

  	var frm=document.getElementsByTagName('*');//document.forms[0];
	for(var frmObjectName in frm)
	{
		if(frmObjectName.substr(0,10+PARA_ID_SIZE)==('PARAMETER@'+_paraId))
		{
			var objs=document.getElementsByName(frmObjectName);
			for(var x=0; x<objs.length; x++)
			{
				lstElems[count++] = objs[x];
			}
		}
	}

	var list = new Array(count);
	for(var i=0;i<count;i++)
	{
		list[i]=lstElems[i];
	}
	return list;
}

	// Fill Formula Dependent
var SEP_VAL_IN_PARA = "!###!";
var SEP_IN_PARA_DEPENDENTS = "#";
var DEPENDENT_FORMULA_VARS = ['X','Y','Z','U','W'];
var CORRESPONDING_FORMULA_VAR = 'V';

function validatePARAMETERDependentFormula(obj,e,depName,corrFormula,corrFormulaOutput)
{
	var arrDependents = depName.split(SEP_IN_PARA_DEPENDENTS);
	//alert(arrDependents);
	for(var k=0; k<arrDependents.length; k++)
	{
		//alert(k+"   "+arrDependents[k]);
		if(k!=4 && arrDependents[k]!="")
		{
			var objs = getElementsListByParaId(arrDependents[k]);
			//alert(objs.length);
			for(var x=0; x<objs.length; x++)
			{				
				var elemDependent = objs[x];
				var soruces = elemDependent.id.split(SEP_VAL_IN_PARA)[0];
				var finalFormula = elemDependent.id.split(SEP_VAL_IN_PARA)[1];
				var finalFormulaOutputType = elemDependent.id.split(SEP_VAL_IN_PARA)[2];
				
				//alert(soruces);
				//alert(finalFormula);
				//alert(finalFormulaOutputType);
				
				var sourcesIds = soruces.split(SEP_IN_PARA_DEPENDENTS);
				var sourcesCount = sourcesIds.length;
				var sourcesValues = new Array(sourcesIds.length);
				for(var y=0; y<sourcesCount; y++)
				{
					var elemsSource = getElementsListByParaId(sourcesIds[y]);
					for(var z=0; z<elemsSource.length; z++)
						if(elemsSource[z].value!="") sourcesValues[y] = elemsSource[z].value;
				}
				
				// Getting Formula with Values
				for(var y=0; y<sourcesCount; y++)
				{
					while(finalFormula.search(DEPENDENT_FORMULA_VARS[y])!=-1)
					{
						finalFormula = finalFormula.replace(DEPENDENT_FORMULA_VARS[y], sourcesValues[y]);
					}
				}
				//alert(finalFormula);
				//alert(finalFormulaOutputType);
				
				var result;
				try
				{
					result = eval(finalFormula);
				}
				catch(e)
				{
					//alert("Not a Valid Value "+e.message);
					result=false;
				}
				if((typeof result).toUpperCase()=="BOOLEAN" && result==false)
				{
					elemDependent.value="";
					return;
				}
				elemDependent.value = result;
				if((typeof result).toUpperCase()=="NUMBER" && (elemDependent.value=="NaN" || elemDependent.value=="Infinity"))
					elemDependent.value="";
				else
					elemDependent.value = setFormulaOutputByType(result, finalFormulaOutputType);
				//alert(elemDependent.value);
			}
		}
		else if(k==4 && arrDependents[k]!="")
		{
			var finalFormulaOutputType = corrFormulaOutput;
			
			var objs = getElementsListByParaId(arrDependents[k]);
			for(var x=0; x<objs.length; x++)
			{
				var elemDependent = objs[x];
				var finalFormula = corrFormula;
				// Getting Formula with Values
				while(finalFormula.search(CORRESPONDING_FORMULA_VAR)!=-1)
					finalFormula = finalFormula.replace(CORRESPONDING_FORMULA_VAR,obj.value);

				//alert(finalFormula);
				//alert(finalFormulaOutputType);
				var result;
				try
				{
					result = eval(finalFormula);
				}
				catch(e)
				{
					//alert("Not a Valid Value "+e.message);
					result=false;
				}
				if((typeof result).toUpperCase()=="BOOLEAN" && result==false)
				{
					elemDependent.value="";
					return;
				}
				elemDependent.value = result;
				if((typeof result).toUpperCase()=="NUMBER" && (elemDependent.value=="NaN" || elemDependent.value=="Infinity"))
					elemDependent.value="";
				else
					elemDependent.value = setFormulaOutputByType(result, finalFormulaOutputType);
				//alert(elemDependent.value);
			}
		}
	}
}

	// Formula Output Types
var FORMULA_OUTPUT_TYPES_NONE = 0;
var FORMULA_OUTPUT_TYPES_TRUNCATE = 1;
var FORMULA_OUTPUT_TYPES_ROUNDOFF = 2;
var FORMULA_OUTPUT_TYPES_TRUNCATETO1DECIMALPLACE = 3;
var FORMULA_OUTPUT_TYPES_ROUNDOFFTO1DECIMALPLACE = 4;
var FORMULA_OUTPUT_TYPES_TRUNCATETO2DECIMALPLACE = 5;
var FORMULA_OUTPUT_TYPES_ROUNDOFFTO2DECIMALPLACE = 6;
var FORMULA_OUTPUT_TYPES_TRUNCATETO5DECIMALPLACE = 7;
var FORMULA_OUTPUT_TYPES_ROUNDOFFTO5DECIMALPLACE = 8;
var FORMULA_OUTPUT_TYPES_CEIL = 9;
var FORMULA_OUTPUT_TYPES_FLOOR = 10;

function setFormulaOutputByType(_result, _type)
{
	//alert(_result);
	if((typeof _result).toUpperCase()!="NUMBER")	return _result;
	switch(parseInt(_type))
	{
		case FORMULA_OUTPUT_TYPES_NONE:
			return _result;
			break;
		case FORMULA_OUTPUT_TYPES_TRUNCATE:
			return parseInt(_result);
			break;
		case FORMULA_OUTPUT_TYPES_ROUNDOFF:
			return Math.round(_result);
			break;
		case FORMULA_OUTPUT_TYPES_TRUNCATETO1DECIMALPLACE:
			return parseInt(_result*10)/10;
			break;
		case FORMULA_OUTPUT_TYPES_ROUNDOFFTO1DECIMALPLACE:
			return Math.round(_result*10)/10;
			break;
		case FORMULA_OUTPUT_TYPES_TRUNCATETO2DECIMALPLACE:
			return parseInt(_result*100)/100;
			break;
		case FORMULA_OUTPUT_TYPES_ROUNDOFFTO2DECIMALPLACE:
			return Math.round(_result*100)/100;
			break;
		case FORMULA_OUTPUT_TYPES_TRUNCATETO5DECIMALPLACE:
			return parseInt(_result*100000)/100000;
			break;
		case FORMULA_OUTPUT_TYPES_ROUNDOFFTO5DECIMALPLACE:
			return Math.round(_result*100000)/100000;
			break;
		case FORMULA_OUTPUT_TYPES_CEIL:
			return Math.ceil(_result);
			break;
		case FORMULA_OUTPUT_TYPES_FLOOR:
			return Math.floor(_result);
			break;
	}		
	
}

	// Validate Compulsory Fields
function validatePARAMETERCompulsoryField()
{
	var frm=document.getElementsByTagName('*');//document.forms[0];
	for(var i in frm)
	{
		if(i.substr(0,10)=='PARAMETER@')
		{
			var objs=document.getElementsByName(i);
			for(var x=0;x<objs.length;x++)
			{				
				var obj = objs[x];
				//alert("Object = "+obj+"  Name = "+obj.name +" Id = "+obj.id+" Tag = "+ obj.tagName +" Type = "+obj.type);
				var div = obj.parentNode;
				while(div.tagName.toUpperCase()!="DIV")
					div=div.parentNode;
				if(div.style.display != "none")
				{
				if(obj.id.substr(0,3)=="C:1")
				{
					if(obj.tagName.toUpperCase()=="INPUT" && obj.type.toUpperCase()=="RADIO" )
					{
						var flag=false;
						var supObj=document.getElementsByName(i);
						for(var j=0;j<supObj.length;j++)
							if(supObj[j].checked) flag=true;
						if(!flag)
						{
							alert(" Value is Compulsory ... ");
							obj.focus();
							return false;
						}
					}
					else if(obj.tagName.toUpperCase()=="INPUT" && obj.type.toUpperCase()=="HIDDEN" )
					{
						var elemCountVal = obj.nextSibling;
						var elemDurVal = elemCountVal.nextSibling;
						if(elemCountVal.value=="")
						{
							alert(" Value is Compulsory ... ");
							elemCountVal.focus();
							return false;
						}
						if(elemDurVal.value=="")
						{
							alert(" Value is Compulsory ... ");
							elemDurVal.focus();
							return false;
						}
					}
					/*else if(obj.tagName=="INPUT" && obj.type=="checkbox" && !obj.checked)
					{
						alert(" Value is Compulsory ... ");
						obj.focus();
						return false;
					}*/
					else if(obj.value=="")
					{
						alert(" Value is Compulsory ... ");
						obj.focus();
						return false;
					}
				}
				else
				{
					// Duration Case
					if(obj.tagName.toUpperCase()=="INPUT" && obj.type.toUpperCase()=="HIDDEN" )
					{
						var elemCountVal = obj.nextSibling;
						var elemDurVal = elemCountVal.nextSibling;
						if(elemCountVal.value!="" && elemDurVal.value=="")
						{
							alert(" Please select Duration also ... ");
							elemDurVal.focus();
							return false;
						}
						if(elemDurVal.value!="" && elemCountVal.value=="")
						{
							alert(" Plaese enter Duartion also ... ");
							elemCountVal.focus();
							return false;
						}
					}
				}
				}				
			}
		}
	}
	for(var i in frm)
	{
		if(i.substr(0,10)=='PARAMETER@')
		{
			var objs=document.getElementsByName(i);
			for(var x=0;x<objs.length;x++)
			{				
				var obj = objs[x];
				if(obj.disabled==true)
					obj.disabled=false;
			}
		}
	}	
	return true;
}


		// Enable/Disable/Hide/Show Children 

var SEP_IN_PARA_NAMEID_TEMPID = "&";
var SEP_IN_PARA_PARENT = "#";

var CHILD_PRESENTATIONS_NORMAL = "0";
var CHILD_PRESENTATIONS_DISABLEON = "1";
var CHILD_PRESENTATIONS_ENABLEON = "2";
var CHILD_PRESENTATIONS_HIDEON = "3";
var CHILD_PRESENTATIONS_SHOWON = "4";

function setPARAMETERChildPresentation(_obj, _event, _presentation, _onValue)
{
	if(_presentation==CHILD_PRESENTATIONS_NORMAL)	return;
	
	var presentFlag = null;	
	//alert("Object = "+_obj+"  Name = "+_obj.name +" Id = "+_obj.id+" Tag = "+ _obj.tagName +" Type = "+_obj.type);
	if(_obj.tagName.toUpperCase()=="SELECT")
	{
		if(_obj.value==_onValue)	presentFlag=true;
		else						presentFlag=false;			
	}
	else if(_obj.tagName.toUpperCase()=="INPUT" && _obj.type.toUpperCase()=="RADIO" )
	{
		if(_obj.checked && _obj.value==_onValue)		presentFlag=true;
		else if(_obj.checked && _obj.value!=_onValue)	presentFlag=false;
	}
	else if(_obj.tagName.toUpperCase()=="INPUT" && _obj.type.toUpperCase()=="CHECKBOX" )
	{
		if(_obj.checked)	presentFlag=true;
		else				presentFlag=false;
	}

	if(presentFlag==null)	return;
	
	var parentParaId = null;
	var objName = _obj.name.substr(10);
	//alert(objName);
	var vals = objName.split(SEP_IN_PARA_NAMEID_TEMPID);
	//alert(vals);
	parentParaId = vals[0];
	//alert(parentParaId);	
  	if(parentParaId==null)	return;
  	
  	var frm=document.getElementsByTagName('*');//document.forms[0];
	for(var i in frm)
	{
		if(i.substr(0,10)=='PARAMETER@')
		{
			var objs=document.getElementsByName(i);
			for(var x=0;x<objs.length;x++)
			{				
				var obj = objs[x];
				if(obj.name==_obj.name) continue;			
				objName = obj.name.substr(10);
				//alert(objName);
				vals = objName.split(SEP_IN_PARA_NAMEID_TEMPID);
				//alert(vals);
				var parents = vals[1].split(SEP_IN_PARA_PARENT);
				//alert(parents);
				var flag = false;			
				for(var j=0; j<parents.length; j++)
					if(parents[j]==parentParaId)
					{
						flag = true;
						break;
					}
				// It's a Child
				if(flag)	enableDisableHideShowPARAMETERChild(obj, _presentation, presentFlag);
			}
		}
	}
}

var CHILD_PRESENTATIONS_DISABLEON = "1";
var CHILD_PRESENTATIONS_ENABLEON = "2";
var CHILD_PRESENTATIONS_HIDEON = "3";
var CHILD_PRESENTATIONS_SHOWON = "4";

function enableDisableHideShowPARAMETERChild(_child, _presentation, _flag)
{
	if(_presentation==CHILD_PRESENTATIONS_DISABLEON)
	{
		if(_flag)	disablePARAMETERChild(_child);
		else		enablePARAMETERChild(_child);
	}			
	else if(_presentation==CHILD_PRESENTATIONS_ENABLEON)
	{
		if(_flag)	enablePARAMETERChild(_child);
		else		disablePARAMETERChild(_child);
	}			
	else if(_presentation==CHILD_PRESENTATIONS_HIDEON)
	{
		if(_flag)	hidePARAMETERChild(_child);
		else		showPARAMETERChild(_child);
	}			
	else if(_presentation==CHILD_PRESENTATIONS_SHOWON)
	{
		if(_flag)	showPARAMETERChild(_child);
		else		hidePARAMETERChild(_child);
	}			
}

function disablePARAMETERChild(_child)
{
	if(_child.tagName.toUpperCase()=="SELECT")
	{
		_child.value="";	_child.disabled=true;
	}
	else if(_child.tagName.toUpperCase()=="TEXTAREA")
	{
		_child.value="";	_child.disabled=true;
	}
	else if(_child.tagName.toUpperCase()=="INPUT" && _child.type.toUpperCase()=="TEXT" )
	{
		_child.value="";	_child.disabled=true;
	}
	else if(_child.tagName.toUpperCase()=="INPUT" && _child.type.toUpperCase()=="RADIO" )
	{
		_child.checked=false;	_child.disabled=true;
	}
	else if(_child.tagName.toUpperCase()=="INPUT" && _child.type.toUpperCase()=="CHECKBOX" )
	{
		_child.checked=false;	_child.disabled=true;
	}
	else if(_child.tagName.toUpperCase()=="INPUT" && _child.type.toUpperCase()=="HIDDEN" )
	{
		var elemCountVal = _child.nextSibling;
		var elemDurVal = elemCountVal.nextSibling;
		elemCountVal.value="";	elemCountVal.disabled=true;
		elemDurVal.value="";	elemDurVal.disabled=true;
	}
}

function enablePARAMETERChild(_child)
{
	if(_child.id.indexOf("G:D")!=_child.id.length-3)
	{
		if(_child.tagName.toUpperCase()=="INPUT" && _child.type.toUpperCase()=="HIDDEN" )
		{
			var elemCountVal = _child.nextSibling;
			var elemDurVal = elemCountVal.nextSibling;
			elemCountVal.disabled=false;
			elemDurVal.disabled=false;
		}
		else
			_child.disabled=false;
	}
}

function hidePARAMETERChild(_child)
{
	var div = _child;
	while(div.tagName.toUpperCase()!="DIV")
		div=div.parentNode;
	if(div)
		div.style.display = "none";

	if(_child.tagName.toUpperCase()=="SELECT")
	{
		_child.value="";
	}
	else if(_child.tagName.toUpperCase()=="TEXTAREA")
	{
		_child.value="";
	}
	else if(_child.tagName.toUpperCase()=="INPUT" && _child.type.toUpperCase()=="TEXT" )
	{
		_child.value="";
	}
	else if(_child.tagName.toUpperCase()=="INPUT" && _child.type.toUpperCase()=="RADIO" )
	{
		_child.checked=false;
	}
	else if(_child.tagName.toUpperCase()=="INPUT" && _child.type.toUpperCase()=="CHECKBOX" )
	{
		_child.checked=false;
	}
	else if(_child.tagName.toUpperCase()=="INPUT" && _child.type.toUpperCase()=="HIDDEN" )
	{
		var elemCountVal = _child.nextSibling;
		var elemDurVal = elemCountVal.nextSibling;
		elemCountVal.value="";
		elemDurVal.value="";
	}
}

function showPARAMETERChild(_child)
{
	var div = _child;
	while(div.tagName.toUpperCase()!="DIV")
		div=div.parentNode;
	if(div)
		div.style.display = "block";
}


	// Calling Template Design-Time Setting
function setAllPARAMETERDesignTimeSetting()
{
	var frm=document.getElementsByTagName('*');//document.forms[0];
	for(var i in frm)
	{
		if(i.substr(0,10)=='PARAMETER@')
		{
			var objs=document.getElementsByName(i);
			for(var x=0;x<objs.length;x++)
			{				
				var obj = objs[x];
				// Calling onfocus Functions
				if(obj.onfocus)	obj.onfocus(window.event);
				
				// Enable/Disable Parameter Children
				if(obj.tagName.toUpperCase()=="SELECT")
				{
					if(obj.onchange)	obj.onchange(window.event);
				}
				else if(obj.tagName.toUpperCase()=="INPUT" && obj.type.toUpperCase()=="RADIO" )
				{
					if(obj.onclick)		obj.onclick(window.event);
				}
				else if(obj.tagName.toUpperCase()=="INPUT" && obj.type.toUpperCase()=="CHECKBOX" )
				{
					if(obj.onclick)		obj.onclick(window.event);
				}
			}
		}
	}	
}
	
	// Duration Control Function
function validatePARAMETERDuartionValueSet(obj,e,durObjParaId)
{
	var objs = getElementsListByParaId(durObjParaId);

	var countVal="";
	var durVal="";
	for(var x=0; x<objs.length; x++)
	{				
		var elemDuration = objs[x];		
		var elemCountVal = elemDuration.nextSibling;
		var elemDurVal = elemCountVal.nextSibling;
		
		if(	elemDuration.type && elemCountVal && elemDurVal && 
			elemDuration.type.toUpperCase()=='HIDDEN' && 
			elemCountVal.value!="" && elemDurVal.value!="")
			elemDuration.value = elemCountVal.value + " " + elemDurVal.value;
		//alert(elemDuration.value);
	}
}

// *** End Template Related Functions
//  ******************************************************************************