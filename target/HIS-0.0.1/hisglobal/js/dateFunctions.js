/*
File Name 		: Validation.js
Version	  		: 1.0
Developer 		: Ajay Kumar Gupta[Project Associate]
Supported by 	: Jitu, Lokesh Sachin & Vaibhav
Guided By		: Mr. Pradeep, Mr. Praveen & Ms. Preeti
*/

/*
Note -->
1. please name your form as form1;
2. add your validation string in getValidateStr() function
3. Add message in getMsg() function

Warning : NO CHANGE WILL BE REFLECTED IN ORIGINAL VALIDATION FILE WITHOUT AJAY,JITU,LOKESH OR VAIBHAV
PERMISSION
*/

/*
	List of functions in this file

 1>	function getValidateStr(index)
 2>	function getMsg(index,conName)
 3>	function validateData(e,index)
 4>	function validAmount(obj)
 5>	function compareDate(frDate,toDate)
 6>	function validateFields(checkArray,mode)
 7>	function isDate(theField)
 8>	function IsAgeValid(theField)
 9>	function submitForm()
10>	function removeStrSpace(str)
11>	function daysInFebruary (year)
12>	function DaysInMonth(mon, year)
13> function getSeperator(dtStr)
14>	function getMonthInt(str)
15> function parseDate(dtStr,seprator,mode)
16> function initilizeVar()

*/


/*============================Global Variables declares here=====================================*/
var intDay, intMon, intYear;

/*============================Function Starts from here==========================================*/


/*this function returns the requested string for validations, any validating string
can be appended in this function just before default keyword*/
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

		case 16:	//alphanumeric with dot
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.";
			break;
			
				
		case 17:   //for entering rh value
			str = "+-";
			break;
			
		case 18:	//for Operation name
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ '()-.";
			break;
			
		case 19:	//for Time
			str = "1234567890:";

	}	//end of Switch statement
	return str;
}


//this function will have the user defined messages
function getMsg(index,conName)
{
	var msgStr = "";

	switch(index)
	{                    
		case 1:
			msgStr = "Invalid amount entered [" + conName + "]";
			break;
		case 2:
			msgStr = "Invalid e-mail entered [" + conName + "]";
			break;
		case 3:
			msgStr = "Invalid Date entered [" + conName + "]";
			break;
		case 4:
			msgStr = "From Date is greater than To Date [" + conName + "]";
			break;
		case 5:
			msgStr = "Current Date is greater than " + conName;
			break;
		case 6:
			msgStr = "[" + conName + "] is blank";
			break;
		case 7:
			msgStr = "[" + conName + "] is not selected";
			break;
		case 8:
			msgStr = "Invalid age entered [" + conName + "]";
	}	//end of switch statement

	//alert(msgStr);
	return;
}



//this function accepts index, based on index it validates the specified character within the string
//defined in getValidateStr function. it validates single character at a time.
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



//this function validates the amount.this function requires the object
//call this function if you have validated each & every digit using validateData function
function validAmount(obj)
{
	var index,len;
	var tempStr;
	var sts = 0;

	len = obj.value.length;
	tempStr = obj.value;
	index = tempStr.indexOf(".");

	if (index > -1)	//amount is in decimal
	{
		if (len == index+1)	//No digit after decimal point
			sts = 1;
		else
		{
			if (tempStr.indexOf(".",index+1) > -1)	//more than one decimal point
				sts = 1;
		}
	}	//end if

	if (sts == 1)
	{
		getMsg(1,obj.name);
		obj.focus();
		return false;
	}

	return true;

}//end of amountOnly


/*this function checks those fields that is in checkArray for not null and submits the form
if mode = 1
checkArray = new Array("Control Name1","Control Name 2",-----) for calling this function
mode parameter*/
function validateFields(checkArray,mode)
{
	var i,type;
	var arrLen = checkArray.length;
	var obj;

	for ( i = 0 ; i < arrLen ; i++ )
	{
		obj = document.form1.elements[checkArray[i]];
		type = obj.type;

		switch(type)
		{
			case "text":
				if(obj.value == null || obj.value == "")
				{
					getMsg(6,obj.name);	//displays error message
					obj.focus();
					return false;
				}
				break;

			case "select-one":
				if(obj.value == 0)
				{
					getMsg(7,obj.name);	//displays error message
					return false;
				}
				break;
		}
	}

	if (mode == 1) submitForm();
	return true;

}//end of validateFun



//this function validates the date. the format should be dd-mm-yyyy or dd/mm/yyyy or dd.mm.yyyy
//if mode = 1 otherwise dd/mmm/yyyy or dd-mmm-yyyy or dd.mmm.yyyy
function isDate(theField,mode)
{
	// alert("theField gg"+theField.value)
	var dtStr = removeStrSpace(theField.value);
	var seprator = "";
	
	if (dtStr == "") return false;
	seprator = getSeperator(dtStr)		//function that returns seperator
	if (seprator != "")
	{
		if (parseDate(dtStr,seprator,mode) == true)
		{
			theField.value = dtStr;
			return true;
		}
	}

	getMsg(3,theField.name);	//display error message
	theField.focus();
	return false;
}
//End OF Date Method


/*this function validates the age*/
function IsAgeValid(theField)
{
	if (theField.value <= 0 || theField.value > 130)
	{
		getMsg(8,theField.name);
		theField.focus();
		return false;
	}
	return true;
}//End of function IsAgeValid()



/*this function submits the page*/


/* Function For Removing spaces */
function removeStrSpace(str)
{
	var j;
	var len = str.length;
	var retStr ="";

	for(j = 0;j <= len;j++)
	{
		if(str.charAt(j) != " ")
			retStr += str.charAt(j);
	}
	return retStr;
}


//returns day in feb month for specified year
function daysInFebruary (year)
{
	return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}


//this function returns no of days in a month for the specified year
function DaysInMonth(mon, year)
{
	var retVal;

	retVal = 31;
	if (mon == 4 || mon == 6 || mon == 9 || mon == 11) {retVal = 30;}
	if (mon == 2) {retVal = daysInFebruary(year);}
   	return retVal;
}

//this function finds the seperator used for seperating the date
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


//this function converts the month(in string) into month(in integer)
function getMonthInt(str)
{
	var month = -1;

	switch(str.toUpperCase())
	{
		case "JAN":
			month = 1;
			break;
		case "FEB":
			month = 2;
			break;
		case "MAR":
			month = 3;
			break;
		case "APR":
			month = 4;
			break;
		case "MAY":
			month = 5;
			break;
		case "JUN":
			month = 6;
			break;
		case "JUL":
			month = 7;
			break;
		case "AUG":
			month = 8;
			break;
		case "SEP":
			month = 9;
			break;
		case "OCT":
			month = 10;
			break;
		case "NOV":
			month = 11;
			break;
		case "DEC":
			month = 12;
			break;
	}
	return month;
}


//this function parses the date inti day, month & year
function parseDate(dtStr,seprator,mode)
{
	var pos1,pos2;
	var len = dtStr.length;

	initilizeVar();		//initilizes the variables
	pos1 = dtStr.indexOf(seprator);
	pos2 = dtStr.indexOf(seprator,pos1+1);

	if (len > 8 && len <= 11)
	{
		if (pos1 > 0 && pos1 <= 2)	//validations for day
		{
			if (pos2 > pos1 + 1 && len == pos2 + 5)	//validation for month & year
			{
				//getting value seperately and convert it into int
				intDay = parseInt(dtStr.substring(0,pos1),'10');
				if (mode == 1)
					intMon = parseInt(dtStr.substring(pos1+1,pos2),'10');
				else
					intMon = getMonthInt(dtStr.substring(pos1+1,pos2));

				intYear = parseInt(dtStr.substring(pos2+1),'10');

				if (intMon >= 0 && intMon <= 12)
				{
					if (intYear >= 1900 && intYear <= 2100)
					{
						if (intDay > 0 && intDay <= DaysInMonth(intMon, intYear))
							return true;
					}//end if
				}//endif
			}//endif
		}//endif
	}//endif
	return false;
}


//this function initilizes the global variable
function initilizeVar()
{
	intDay = "";
	intMon = "";
	intYear = "";
}

//Added by Ashwini Mishra on 17-04-2014
function getDateObj(dtStr,mode)
{
	var date = null;
	if(mode=="1")
	{
		var dt1 = ""+dtStr.substring(0,2); 
		var mon1 = (dtStr.substring(3,6)).toUpperCase();
		var yr1 = dtStr.substring(7,11); 
		var month1=monthvalue(mon1);
		date = new Date(yr1, month1, dt1); 
	}	
	return date;
}

function monthvalue(mon11) 
{
switch(mon11)
 {
 case "JAN" :
    return "00";
    
 case "FEB" :
    return "01";
    
 case "MAR" :
    return "02";
    
 case "APR" :
    return "03";
    
 case "MAY" :
    return "04";
    
 case "JUN" :
    return "05";
 
 case "JUL" :
    return "06";
    
 case "AUG" :
    return "07";
    
 case "SEP" :
    return "08";
  
 case "OCT" :
    return "09";
 
 case "NOV" :
    return "10";
 
 case "DEC" :
    return "11";

 default :
                //alert("You have entered an invalid month");
 
 }

}
/*=========================================end of file===============================================*/
