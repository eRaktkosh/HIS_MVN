
/*
File Name 		: validation.js
Version	  		: 2.0
*/

/*
List of functions in this file

 1>	function validateData(e,index)
 2> HISValidator(frmname)
	2.1>addValidation(itemname,descriptor,errstr)
	2.2>clearAllValidations()
	2.3>validate()		
 3> trim(value)
*/


/*
	This function validates the value within the defined value retrieved using the given index.
	It accepts the following parameter
	
	e --> event
	index --> searching within.
*/	
function validateData(e,index)
{
	var key,keychar,str;
		
	if (window.event)
		key = window.event.keyCode;
	else
	{
		if (e)
			key = e.which;
		else
		   return true;
	}
	 
	keychar = String.fromCharCode(key);
		
	// control keys
	if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27) )
		return true;
	else 
	{
		str = getValidateStr(index)
		if (((str).indexOf(keychar) > -1))
		   return true;
		else
		   return false;
	}

}//end of validateStr function

//****************************************************************************************************
function HISValidator(frmname)
{
	this.validatorRetValue = true;
	this.formobj=document.forms[frmname];
  	this.addValidation = add_validation;
	this.clearAllValidations = clear_all_validations;
	this.validate = form_submit_handler;
}

function clear_all_validations()
{
	for(var itr=0;itr < this.formobj.elements.length;itr++)
	{
		this.formobj.elements[itr].validationset = null;
	}
}

function form_submit_handler()
{
	for(var itr=0;itr < this.formobj.elements.length;itr++)
	{
		if(this.formobj.elements[itr].validationset &&
	   !this.formobj.elements[itr].validationset.validate())
		{
			return false;
		}
	}
	
	if(!this.validatorRetValue) {
		alert(this.validatorError);
		return false;
	}
		
	return true;
}

function add_validation(itemname,descriptor,errstr)
{
	var i = 0;
	var type = "";
	var ctlLength = 0;
	
	if(!this.formobj)
	{
		alert("BUG: the form object is not set properly");
		return;
	}//if
	var itemobj = this.formobj[itemname];
		
  	if(!itemobj)
	{
		//alert("BUG: Couldnot get the input object named: "+itemname);
		if((descriptor == "req") || (descriptor == "dontselect")) {
			if(this.validatorRetValue) {
				this.validatorRetValue = false;
				if(!errstr || errstr.length ==0)
					this.validatorError = "Couldnot get the input object named: "+itemname;
				else
					this.validatorError = errstr;	
			}
		}
		
		return;
	}
	
	type = itemobj.type;
	/*
		If there is only one combo then length function does not return array length. 
		It return option length
	*/	
	if(type == "select-one" || type == "select-multiple")  {	//list or combo
		ctlLength = itemobj.length;
		if(ctlLength > 0) {
			if(isNaN(itemobj[0].length)) ctlLength = 0;
		}	
	}
	else {
		ctlLength = itemobj.length;
		if(isNaN(ctlLength)) ctlLength = 0;
	}
			
	if(ctlLength == 0) 
	{
		if(!itemobj.validationset)
		{
			itemobj.validationset = new ValidationSet(itemobj);
		}
		itemobj.validationset.add(descriptor,errstr);
	}
	else 
	{
		for(i=0;i<ctlLength;i++)
		{
			if(!itemobj[i].validationset)
			{
				itemobj[i].validationset = new ValidationSet(itemobj[i]);
			}
	
			itemobj[i].validationset.add(descriptor,errstr);
		}
	}
}

function ValidationDesc(inputitem,desc,error)
{
	this.desc=desc;
	this.error=error;
	this.itemobj = inputitem;
	this.validate=vdesc_validate;
}

function vdesc_validate()
{
	if(!V2validateData(this.desc,this.itemobj,this.error))
 	{
    	this.itemobj.focus();
		return false;
 	}
 	return true;
}

function ValidationSet(inputitem)
{
    this.vSet=new Array();
	this.add= add_validationdesc;
	this.validate= vset_validate;
	this.itemobj = inputitem;
}

function add_validationdesc(desc,error)
{
	this.vSet[this.vSet.length]= new ValidationDesc(this.itemobj,desc,error);
}

function vset_validate()
{
	for(var itr=0;itr<this.vSet.length;itr++)
	{
		if(!this.vSet[itr].validate())
		{
			return false;
		}
	}
	return true;
}

function V2validateData(strValidateStr,objValue,strError) 
{ 
	var epos = strValidateStr.search("="); 
    var  command  = ""; 
    var  cmdvalue = ""; 
	var retValues;
	
    if(epos >= 0)
    {
		command  = trim(strValidateStr.substring(0,epos));
		cmdvalue = trim(strValidateStr.substr(epos+1)); 
    } 
    else 
    	command = strValidateStr;
    	
	switch(command)
	{
		case "req":
		{
			if(eval(objValue.value.length) == 0) 
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : Required Field";
				
				alert(strError);
				return false;
			}
			break;
		}//case required
		case "maxlen": 
		{
			if(eval(objValue.value.length) >  eval(cmdvalue))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : "+cmdvalue+" characters maximum ";
				
				alert(strError + "\n[Current length = " + objValue.value.length + " ]"); 
               	return false;
			}
			break;
		}//case maxlen
		case "minlen":
		{
			if(eval(objValue.value.length) <  eval(cmdvalue))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : " + cmdvalue + " characters minimum  ";
				
				alert(strError + "\n[Current length = " + objValue.value.length + " ]"); 
               	return false;
			}
			break;
		}//case minlen
		case "email":
		{
			if(!checkMail(objValue.value))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name+": Enter a valid Email address ";
				
				alert(strError); 
                return false;
			}
			break;
		}//case email
		case "amount":
		{
			if(!checkAmount(objValue.value,cmdvalue))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name+": Enter a valid amount ";
				
				alert(strError); 
                return false;
			}
			break;
		}
		case "numlt":
		{
			if(isNaN(objValue.value))
			{
				alert(objValue.name+": Should be a number ");
				return false;
			}
			if(eval(objValue.value) >=  eval(cmdvalue))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be less than "+ cmdvalue;
				
				alert(strError); 
              	return false;                 
			}
			break;
		}//case lessthan
		case "numltet":
		{
			if(isNaN(objValue.value))
			{
				alert(objValue.name+": Should be a number ");
				return false;
			}
			if(eval(objValue.value) > eval(cmdvalue))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be less than or equal to "+ cmdvalue;
				
				alert(strError); 
              	return false;                 
			}
			break;
		}//case less than or equal to
		case "numgt":
		{
			if(isNaN(objValue.value))
			{
				alert(objValue.name+": Should be a number ");
				return false;
			}
			if(eval(objValue.value) <=  eval(cmdvalue))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be greater than "+ cmdvalue;
				
				alert(strError); 
               	return false;
			}
			break;
		}//case greaterthan
		case "numgtet":
		{
			if(isNaN(objValue.value))
			{
				alert(objValue.name+": Should be a number ");
				return false;
			}
			if(eval(objValue.value) <  eval(cmdvalue))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be greater than or equal to "+ cmdvalue;
				
				alert(strError); 
               	return false;
			}
			break;
		}//case greater than or equal to
		case "date":
		{
			if(!isDate(objValue.value))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be in date format";
				
				alert(strError); 
				return false;
			}
			
			break;
		}//date format
		case "dtlt":
		{
			retValues = compareDate(objValue.value,cmdvalue);
			if(!retValues.cancelKey)
			{
				alert(objValue.name+": Should be a date ");
				return false;
			}
			if(retValues.mode != 0)
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be less than "+ cmdvalue;
				
				alert(strError); 
              	return false;                 
			}
			break;
		}//case lessthan (date)
		case "dtltet":
		{
			retValues = compareDate(objValue.value,cmdvalue);
			if(!retValues.cancelKey)
			{
				alert(objValue.name+": Should be a date ");
				return false;
			}
			if(retValues.mode == 2)
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be less than or equal to "+ cmdvalue;
				
				alert(strError); 
              	return false;                 
			}
			break;
		}//case lessthan or equalto (date)
		case "dtgt":
		{
			retValues = compareDate(objValue.value,cmdvalue);
			if(!retValues.cancelKey)
			{
				alert(objValue.name+": Should be a date ");
				return false;
			}
			if(retValues.mode != 2)
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be greater than "+ cmdvalue;
				
				alert(strError); 
              	return false;                 
			}
			break;
		}//case greaterthan (date)
		case "dtgtet":
		{
			retValues = compareDate(objValue.value,cmdvalue);
			if(!retValues.cancelKey)
			{
				alert(objValue.name+": Should be a date ");
				return false;
			}
			if(retValues.mode == 0)
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be greater than or equal to "+ cmdvalue;
				
				alert(strError); 
              	return false;                 
			}
			break;
		}//case greaterthan or equalto (date)
		case "dontselect":
		{
			if(objValue.selectedIndex == null)
			{
				alert("BUG: dontselect command for non-select Item");
				return false;
			}
			
						
			if((objValue.length == 0) || 
				(objValue.selectedIndex >= 0 && objValue.options[objValue.selectedIndex].value == eval(cmdvalue)))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name+": Please Select one option ";
				
				alert(strError); 
              	return false;
			}
			
			break;
		}//case dontselect
		case "pathext":
		{
			if(!checkFileExt(objValue.value,cmdvalue))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name+": Enter a valid file ext. ";
				
				alert(strError); 
                return false;
			}
			break;
		}//check file path extension
	}
	 
    return true; 
}

//****************************************************************************************************


/*
	This function is used to check the mail.
	It accepts value & returns true/false
*/	 
function checkMail(value)
{
	var eindex;
	var newStr = "";
	var retVal = false;
	
	if(value != "")
	{
		eindex = value.indexOf('@');
		if(eindex != -1 && eindex != 0)
		{
			newStr = value.substring(eindex+1);
			if(newStr.indexOf('@') == -1)
			{
				if(value.indexOf('.') != -1 && value.indexOf('.') != value.length - 1 && (value.indexOf('.') > (eindex+1)) )
					retVal = true;
			}
		}
	}
	else
		retVal = true;
		
	return retVal;
}//end checkMail()
	
/**
	This function validates the amount.
	It accepts value, cmdValue and returns true/false	
		cmdvalue --> either blank or format of amount. e.g. 6,2[means length = 6 and precision = 2
		4 for scale and 2 for precision] 
		
	Note >> value should be numeric. This function will not check the numeric
*/
function checkAmount(value,cmdvalue)
{
	var index,len;
	var tempArr;
	var scaleValue = 0;
	var precValue = 0;
	var retValue = true;
		
	len = value.length;
	index = value.indexOf(".");
	
	if (len > 0 && index > -1)	//amount is in decimal && length > 1
	{
		if (len == index+1)	//No digit after decimal point
			retValue = false;
		else
		{
			if (value.indexOf(".",index+1) > -1)	//more than one decimal point
				retValue = false;
		}
	}
	
	//check scale and precision
	if(len > 0 && retValue) {
		if(cmdvalue.length > 0) {
			tempArr = cmdvalue.split(",");
			if(tempArr.length == 2) {
				//scale length
				len = eval(tempArr[0]) - eval(tempArr[1]);
				//decimal point exists
				if(index > -1) {
					scaleValue  = value.substring(0,index);
					precValue 	= value.substr(index+1); 
				}
				else {
					scaleValue  = value;
				}
				//check
				if(scaleValue.length > len) {
					retValue = false;
				}
				else {
					if(eval(precValue) != 0) {
						if(precValue.length > eval(tempArr[1])) {
							retValue = false;
						}
					}
				}
			}
			else {
				retValue = false;
				alert("Please Specify Correct Format !!");
			}
		}
	}
	
	return retValue;
}//end validAmount()

/**
	This function validates file ext and it is called through HisValidator
	It accepts 
		cmdvalue --> It could not be null. It will have the extension that
		you want to validate in file path.
		e.g. gif|jpg|jpeg|bmp|png 
*/
function checkFileExt(value,cmdvalue) {

	var tempArr;
	var i = 0;
	var retValue = false;
	var ext = "";
	var index = 0;
	
	if(cmdvalue.length > 0) {
		index = value.indexOf(".");
		if(index > -1) {
			//extension
			ext = (value.substr(index+1)).toUpperCase();
			
			tempArr = cmdvalue.split("|");
			for(i=0;i<tempArr.length;i++) {
				if(tempArr[i].toUpperCase() == ext) {
					retValue = true;
					break;
				}
			}
		}
	}
	else {
		alert("Please provide the extension !!");
	}
	
	return retValue;
	
} //end checkFileExt

/*
	This function validates the date. The format could be 
		dd-mm-yyyy or dd/mm/yyyy or dd.mm.yyyy
		dd-mon-yyyy or dd/mon/yyyy or dd.mon.yyyy
	
	It accepts value and returns true/false
*/	
function isDate(value) {

	var seprator = "";
	var retValue = false;
	var retValues;
	
	var dtStr = value;
	
	if (dtStr != "")
	{		
		seprator = getSeperator(dtStr);		//function that returns seperator
		if (seprator != "" && dtStr.length >= 8)
		{
			retValues = parseDate(dtStr,seprator);
			retValue = retValues.cancelKey;
		}
	}

	return retValue;
}
//End OF Date Method

/*
	This function validates & compares two dates.
	It returns two value
		
		Date Validity -- >true/false
		
		Comparision Status -->
			0 --> frDate is less than toDate
			1 --> Equal
			2 --> frDate is greater than toDate
		
	it accepts value
*/
function compareDate(frDate,toDate)
{
	var seprator1 = "", seprator2 = "";
	var retValue = false;
	var dtMode = 0;
	var retValues1,retValues2;
	
	if (frDate != "" && frDate != null && toDate != "" && toDate != null)
	{
		seprator1 = getSeperator(frDate);		//function that returns seperator
		seprator2 = getSeperator(toDate);		//function that returns seperator
		
		if (seprator1 != "" && frDate.length >= 8)
		{
			retValues1 = parseDate(frDate,seprator1);
						
			if (seprator2 != "" && toDate.length >= 8 && retValues1.cancelKey == true)
			{
				retValues2 = parseDate(toDate,seprator2);
				if(retValues2.cancelKey == true)
				{
					if(retValues1.year == retValues2.year)
					{
						if(retValues1.month == retValues2.month)
						{
							if(retValues1.day == retValues2.day)
								dtMode = 1;
							else
							{
								if(retValues1.day > retValues2.day)
									dtMode = 2;
								else
									dtMode = 0;
							}
						}
						else
						{
							if(retValues1.month > retValues2.month)
								dtMode = 2;
							else
								dtMode = 0;	
						}
					}
					else
					{
						if(retValues1.year > retValues2.year)
							dtMode = 2;
						else
							dtMode = 0;		
					}
					
					retValue = true;
				}
			}
		}
	}
	
	return {cancelKey :retValue,mode:dtMode};
} //end compareDate() function

/*
	this is internal function that parses the date into day, month & year
*/
function parseDate(dtStr,seprator)
{
	var pos1,pos2,tempLen=0;
	var tempStr = "";
	var intDay = 0,intMon = 0,intYear = 0;
	var retValue = false;
	
	pos1 = dtStr.indexOf(seprator);
	pos2 = dtStr.indexOf(seprator,pos1+1);
	
	if(pos1 > 0 && pos2 > (pos1 + 1))
	{
		//day
		tempStr = dtStr.substring(0,pos1);
		tempLen = tempStr.length;
		if(tempLen > 0 && tempLen <=2)
		{
			intDay = parseInt(tempStr,'10');
			//month
			tempStr = dtStr.substring(pos1+1,pos2);
			tempLen = tempStr.length;
			if(tempLen > 0 && tempLen <= 3)
			{
				//format given as dd/mmm/yyyy
				if(tempLen == 3) tempStr = getMonthInt(tempStr);	
				
				intMon = parseInt(tempStr,'10');
				if(intMon > 0) 
				{
					//year
					tempStr = dtStr.substring(pos2+1);
					tempLen = tempStr.length;
					if(tempLen == 4)
					{
						intYear = parseInt(tempStr,'10');
						if (intYear >= 1900 && intYear <= 9900)
						{
							if (intMon >= 1 && intMon <= 12)
							{
								if (intDay > 0 && intDay <= DaysInMonth(intMon, intYear))
									retValue = true;
							}
						}
					}
				}
			}
		}
	}
	
	return {cancelKey :retValue,day:intDay,month:intMon,year:intYear};
}

/*
	This is internal function that finds the seperator used for seperating the date
*/
function getSeperator(dtStr)
{
	var seprator = "";
	
	if (dtStr.indexOf("-") > -1)
		seprator = "-";
	else
	{
		if (dtStr.indexOf("/") > -1)
			seprator = "/";
		else
		{
			if (dtStr.indexOf(".") > -1)
				seprator = ".";
		}
	}	//endif
	return seprator;
}

//this is internal function that converts the month(in string) into month(in integer)
function getMonthInt(str)
{
	var month = "0";
	
	switch(str.toUpperCase())
	{
		case "JAN":
			month = "1";
			break;
		case "FEB":
			month = "2";
			break;
		case "MAR":
			month = "3";
			break;
		case "APR":
			month = "4";
			break;
		case "MAY":
			month = "5";
			break;
		case "JUN":
			month = "6";
			break;
		case "JUL":
			month = "7";
			break;
		case "AUG":
			month = "8";
			break;
		case "SEP":
			month = "9";
			break;
		case "OCT":
			month = "10";
			break;
		case "NOV":
			month = "11";
			break;
		case "DEC":
			month = "12";
			break;
	}
	return month;
}

//this is internal function that returns no of days in a month for the specified year
function DaysInMonth(mon, year) 
{
	var retVal;
	
	retVal = 31;
	if (mon == 4 || mon == 6 || mon == 9 || mon == 11) {retVal = 30;}
	if (mon == 2) {retVal = daysInFebruary(year);}
   	return retVal;
}

//this is internal function that returns day in feb month for specified year
function daysInFebruary (year)
{
	return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
	 
	
/*this function submits the page*/
function submitForm()
{
	document.form1.submit();
}//end of validateFun

/*
this function returns the requested string for validations, any validating string
can be appended in this function just before default keyword.

This file is for internal use
*/ 
function getValidateStr(index)
{
	var str = "";
	
	switch(index)
	{
		case 1:		//for validating email
			str = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_@.";
			break;
			
		case 2:		//for validating telephone no
			str = "1234567890-";
			break;
			
		case 3:		//for validating address
			str = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-/,.#$()';: ";
			break;
			
		case 4:		//for validating name
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .";
			break;
			
		case 5:		//numeric only
			str = "1234567890";
			break;
			
		case 6:		//numeric with space
			str = "1234567890 ";
			break;
			
		case 7:		//for validating amount
			str = "1234567890.";
			break;
			 
		case 8:		//alphanumeric
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
			break;
			
		case 9:		//alphanumeric with space
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ";
			break;
			
		case 10:	//Character only
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
			break;
			
		case 11:	//Character with space
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
			break;
			
		case 12:	//Upper character only
			str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			break;
			
		case 13:	//Upper character with space
			str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
			break;
			
		case 14:	//Lower character
			str = "abcdefghijklmnopqrstuvwxyz";
			break;
			
		case 15:	//Lower character with space
			str = "abcdefghijklmnopqrstuvwxyz ";	 
			break;
			
		case 16:   //for entering the test name
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-().1234567890+'/& ";
			break;
		
		case 17:	//for validating batchno
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-/()*<>.;:{}[]%";
			
	}	//end of Switch statement
	return str;
}

/*
	this function is used to remove space from the beginning and end of the string
	it accepts value and returns the trimmed value
*/
function trim(value)
{
	var initVal = "",trimmedVal = "";
	var len = 0,j = 0,flag = 0;
	
	initVal = value;
	len = eval(initVal.length);
	if(len > 0)
	{
		for(j = 0,i=len;j < len || i==0;j++,i--)
		{
			if(flag == 0 && initVal.charAt(j) == " ")	//remove starting space 
				continue;
			else
			{
				if(flag == 0)		//character found while checking starting space
				{
					flag = 1;
					initVal = initVal.substr(j);
					len = initVal.length;
					j = -1;
					i = len+1;
				}
				else	//to remove the last space
				{
					if(flag == 1 && initVal.charAt(i-1) == " ")
						continue;
					else
					{
						initVal = initVal.substr(0,i);
						break;
					}	
				}
			}
		}
			
		//assign the trimmed value
		return initVal;	
	}
}
/*=========================================end of file===============================================*/

