function getMonthInt(str)
{
	var month = -1;

	switch(str.toUpperCase())
	{
		case "JAN":
			month = 0;
			break;
		case "FEB":
			month = 1;
			break;
		case "MAR":
			month = 2;
			break;
		case "APR":
			month = 3;
			break;
		case "MAY":
			month = 4;
			break;
		case "JUN":
			month = 5;
			break;
		case "JUL":
			month = 6;
			break;
		case "AUG":
			month = 7;
			break;
		case "SEP":
			month = 8;
			break;
		case "OCT":
			month = 9;
			break;
		case "NOV":
			month = 10;
			break;
		case "DEC":
			month = 11;
			break;
	}
	return month;
}

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

	alert(msgStr);
	return;
}
function daysInFebruary (year)
{
	return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysInMonth(mon, year)
{
	var retVal;

	retVal = 31;
	if (mon == 3 || mon == 5 || mon == 8 || mon == 10) {retVal = 30;}
	if (mon == 1) {retVal = daysInFebruary(year);}
   	return retVal;
}

function initilizeVar()
{
	intDay = "";
	intMon = "";
	intYear = "";
}

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


function isDate(theField,mode)
{
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
	getMsg(3,theField.name);
	//display error message
	theField.focus();
	return false;
}
function objectDateValidator(obj,seperator)//object based
{
	//alert(document.forms[0].linker.value);
	if(document.forms[0].linker.value=="1")
	{
		if( !dateValidator(obj.value,seperator))
		{
			obj.focus();
		}
	}

	return false;  
}



function compareDate(frDate,toDate,mode)
{
	var frValue, toValue,frYear, frMon, frDay,sts = 0;

		//validating todate
	if (frDate.value == "" || frDate.value == null)
	{
		frValue = new Date;
		frYear = frValue.getYear();
		frMon = frValue.getMonth();
		frDay = frValue.getDate();
	}
	else
	{
		if (isDate(frDate,mode) == true)
		{
			frYear = intYear;
			frMon = intMon;
			frDay = intDay;

			if (isDate(toDate,mode) == true)
			{
				if (frYear > intYear)
					sts = 1;
				else
				{
					if (frYear == intYear)
					{
						if (frMon > intMon)
							sts = 1;
						else
						{
							if (frMon == intMon)
							{
								if (frDay > intDay)
									sts = 1;
							}
						}
					}
				}
			}
			else
			{
				toDate.focus();
				return false;
			}
		}
		else
		{
			frDate.focus();
			return false;
		}
	}

	if (sts == 1)
	{
		if (frDate == "" || frDate == null)		//validating current date with toDate
			getMsg(5,toDate.name);
		else
		{
			alert("From Date cannot be greater then To Date" );
			frDate.focus();
			return false;
		}
	}

	return true;

}

function assignMode1(e,form1,mode)
{

	if(e.type=="click"||e.keyCode==13)
	{	
		alert("hi");
		if(checkfields(form1)&&BeforeSubmit(form1)&& sysBefore()&& sysAfter())
		{
			document.form1.hmode.value = mode;
			alert(mode);
			alert("hi");
			if(document.getElementById("UserDiv").style.display=="block")
			{
				alert("hi");
					document.form1.selectedUser.value=document.form1.userCombo.options[document.form1.userCombo.selectedIndex].text;
				
			}
			
			if(document.getElementById("GroupDiv").style.display=="block")
			{
					document.form1.selectedGroup.value=document.form1.groupCombo.options[document.form1.groupCombo.selectedIndex].text;
			}
			
			if(document.getElementById("DepartmentDiv").style.display=="block")
			{
					document.form1.selectedDepartment.value=document.form1.departmentCombo.options[document.form1.departmentCombo.selectedIndex].text;
			}
			
			document.form1.submit();
		}
		else
		 	return false;		
		
	}
}
function checkfields(form1)
{
	if(form1.userwise.checked!=false||form1.groupwise.checked!=false||form1.departmentwise.checked!=false)
	{
		if(form1.userwise.checked!=false)
		{
			if(form1.userCombo.value==-1)
			{
				alert("Select User");
				return false;
			}
		}
		if(form1.groupwise.checked!=false)
		{
			if(form1.groupCombo.value==-1)
			{
				alert("Select Group");
				return false;
			}
		}
		if(form1.departmentwise.checked!=false)
		{
			if(form1.departmentCombo.value==-1)
			{
				alert("Select Department");
				return false;
			}
		}
	}
	else 
	{
		alert("Select one of option(UserWise/Group Wise/DepartmentWise)");
	return false;
	}

	
	if(form1.datewise.checked==false&&form1.monthwise.checked==false&&form1.yearwise.checked==false)
	{
	alert("Select one of option(DateWise/Month Wise/Year Wise)");
	return false;
	}
	else
	{
		alert("finalalert")	
		return true;
	}
		
}
function BeforeSubmit(form1)
{
	var FLAG=false;
//	alert("in BeforeSubmit");
	if(form1.from_date.value == ''||form1.to_date.value == '')
	{
		alert('Please select date from date fields')
		return false;
	}
	var dtResult = compareDate(form1.from_date, form1.to_date, 0);
	//alert("dtResult   ="+dtResult);
	if(dtResult)	
	{
		FLAG=true;
	}
	
	//alert("FLAG  ="+FLAG);
	return FLAG;
}
 var oDP = null;
function init()
{
	
	oDate = new Date();
	oDP   = new frameDatePicker.DatePicker("divDatePicker", oDate.getFullYear()-60, oDate.getFullYear()+60);
	
}


function dateValidator(obj,seperator)
{
	var dateSplit=obj.value.split(seperator);
	var flag=true;
	
	if(dateSplit.length!=3)
	{
		alert("Use format DD"+seperator +"MMM"+seperator+"YYYY");
		obj.focus();
		flag=false;
	}
	else if((dateSplit[0].replace(/\s*/,"")=="" || isNaN(dateSplit[0])) || (dateSplit[2].replace(/\s*/,"")=="" || isNaN(dateSplit[2])))
	{
		alert("Check Either Date or Year is not Correctly Entered");
		obj.focus();
		flag=false;
	}
	else if(!isMonth(dateSplit[1]))
	{
		alert("Month Is Not Correctly Entered!");
		obj.focus();
		flag=false;
	}
	else if(dateSplit[2].length!=4)
	{
		alert("Enter Full Year");
		obj.focus();
		flag=false;
	}
	else
	{
		if(dateSplit[0]>=0 && dateSplit[0]<=getDays(dateSplit[1],dateSplit[2]))
				flag=true;
		else
		{
			alert("Date Is Not Correctly Entered");
			obj.focus();
			flag=false;
		}

	}

	return flag;

}//End od dateValidator


//for internal use
function isMonth(val)
{
	switch(val.toUpperCase())
	{
		case "JAN":return true;
					break;

		case "FEB":return true;
					break;

		case "MAR":return true;
					break;

		case "APR":return true;
					break;

		case "MAY":return true;
					break;

		case "JUN":return true;
					break;

		case "JUL":return true;
					break;

		case "AUG":return true;
					break;

		case "SEP":return true;
					break;

		case "OCT":return true;
					break;

		case "NOV":return true;
					break;

		case "DEC":return true;
					break;
	}
	return false;
}//End of isMonth(val)


//getting days according to month & year
function getDays(mon,yyy)
{
	switch(mon.toUpperCase())
	{
		case "JAN":return 31;
					break;

		case "FEB":if(yyy%400==0 || (yyy%400!=0 && yyy%4==0))
						return 29;
					else
						return 28;
					break;

		case "MAR":return 31;
					break;

		case "APR":return 30;
					break;

		case "MAY":return 31;
					break;

		case "JUN":return 30;
					break;

		case "JUL":return 31;
					break;

		case "AUG":return 31;
					break;

		case "SEP":return 30;
					break;

		case "OCT":return 31;
					break;

		case "NOV":return 30;
					break;

		case "DEC":return 31;
					break;
	}
	return false;
}//End of isMonth(val)


//validating system before date
function  sysBefore()
{
	var flag=true;
	
	var seperator="-";
	var mon=new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");
	if(document.form1.from_date.value.replace(/\s*/,"")=="")
		flag=true;
	else if(dateValidator(document.form1.from_date,seperator) &&  validateItem(document.form1.from_date))
	{
		var curD=new Date();
		//alert("curd  "+curD);
		var splits=document.form1.from_date.value.split(seperator);
		//alert("splits[2]  = "+splits[2]);
		//alert("curD.getFullYear()   ="+curD.getFullYear()+ "curD.getMonth()  =" +curD.getMonth()+"curD.getDate()  ="+curD.getDate());
		
		if(curD.getFullYear()<splits[2])//entered year is greater
		{
			alert("Entered From Year is Bigger than Current year")
			flag=false;
			
		}
		else if(curD.getFullYear()==splits[2])//entered year equals current year
		{
			var i=0;
			for(;i<mon.length;i++)
				if(splits[1].toUpperCase()==mon[i])
					break;

			if(curD.getMonth()<i)//entered month is bigger
			{
				alert(" From Date Is Bigger than Current Date");
				flag=false;
			}
			else if(curD.getMonth()==i)//entered month equals current month
			{
				if(curD.getDate()<splits[0])
				{
					alert("From Date Is Bigger than Current Date");
					flag=false;
				}
				else
					flag=true;
			}
			else
				flag=true;
		}
	}
	else
		flag=false;


	if(!flag)
	{
		document.form1.from_date.focus();
		return flag;
	}
	
	return flag;
}//end of sysBefore(obj.seperator)

//validating system after date
function sysAfter()
{
	var flag=true;
	
	var mon=new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");
	var seperator="-";
	if(document.form1.to_date.value.replace(/\s*/,"")=="")
		flag=true;
	else if(dateValidator(document.form1.to_date,seperator) &&  validateItem(document.form1.to_date))
	{
		var curD=new Date();
		var splits=document.form1.to_date.value.split(seperator);

		if(curD.getFullYear()<splits[2])//for entered year is small
		{
			
			alert("Entered To Year is Bigger than Current Year");
			flag=false;
		}
		else if(curD.getFullYear()==splits[2])//for entered year equals current year
		{
			var i=0;
			for(;i<mon.length;i++)
				if(splits[1].toUpperCase()==mon[i])
					break;

			if(curD.getMonth()<i)//entered month is small
			{
			alert("To Date Is Bigger than Current Date");
				flag=false;
			}
			else if(curD.getMonth()==i)//entered month is equals current month
			{
				if(curD.getDate()<splits[0])
				{
					alert("To Date Is Bigger than Current Date");
					flag=false;
				}
				else
					flag=true;
			}
			else
				flag=true;
		}
	}
	else
		flag=false;
		
		//alert("flag  "+flag);

	if(!flag)
	{
		
		document.form1.to_date.focus();
		return flag;
	}
	return flag;	
}//end of sysAfter(obj.seperator)


function validateItem(obj)
{
	var flag=true;

	switch(obj.type)
	{
		case "checkbox"		:if(obj.value=="-1" || obj.value=="" || obj.value==null)
							 {
								alert(obj.name+" Should Not Left Blank!");
								flag=false;
						 	 }
							 break;

		case "radio"		:var nm=document.all.item(obj.name);
							 var i=0;
							 for(;i<nm.length;i++)
							 	if(nm[i].checked)
							 	{
							 		if(nm[i]==obj && (obj.value=="-1" || obj.value=="" || obj.value==null))
							 		{
							 			alert(obj.name+" Should Not Left Blank!");
							 			flag=false;
							 		}
							 		break;
							 	}

							 if(i==nm.length)
							 {
								alert(obj.name+" Should Not Left Blank!");
								flag=false;
							 }
							 break;

		case "text"			:if(obj.value=="-1" || obj.value.replace(/\s*/,"")=="" || obj.value==null)
							 {
								 alert(obj.name+" Should Not Left Blank!");
								 flag=false;
							 }
							 break;


		case "textarea"		:if(obj.value=="-1" || obj.value.replace(/\s*/,"")=="" || obj.value==null)
							 {
								 alert(obj.name+" Should Not Left Blank!");
								 flag=false;
							 }
							 break;

		case "select-one"	:if(obj.value=="-1" || obj.value=="" || obj.value==null)
							 {
								 alert(obj.name+" Should Not Left Blank!");
								 flag=false;
							 }
							 break;

		case "hidden"		:if(obj.value=="-1" || obj.value=="" || obj.value==null)
							 {
								 alert(obj.name+" Should Not Left Blank!");
								 flag=false;
							 }
							 break;

	}
	return flag;
}



function selectFormat(format)
{
	if(format=="datewise")
	{
	document.forms[0].datewise.checked=true;
	document.forms[0].monthwise.checked=false;
	document.forms[0].yearwise.checked=false;
	document.forms[0].datewise.value=true;
	}
	else if(format=="monthwise")
	{
	document.forms[0].datewise.checked=false;
	document.forms[0].monthwise.checked=true;
	document.forms[0].yearwise.checked=false;
	document.forms[0].monthwise.value=true;
	}
	else if(format=="yearwise")
	{
		alert("insid Yearwise");
	document.forms[0].datewise.checked=false;
	document.forms[0].monthwise.checked=false;
	document.forms[0].yearwise.checked=true;
	document.forms[0].yearwise.value=true;
	}
	else
		alert("No Matching found");
}


function showDiv(divId)
{
	alert(divId)
if(divId=="UserDiv")
{
	document.forms[0].userwise.checked=true;
	document.forms[0].groupwise.checked=false;
	document.forms[0].departmentwise.checked=false;
	document.getElementById("UserDiv").style.display="block";
	document.getElementById("GroupDiv").style.display="none";
	document.getElementById("DepartmentDiv").style.display="none";
	document.forms[0].userwise.value=true;
}
else if(divId=="GroupDiv")
{
	
	document.forms[0].userwise.checked=false;
	document.forms[0].groupwise.checked=true;
	document.forms[0].departmentwise.checked=false;
	document.forms[0].groupwise.value=true;
	document.getElementById("UserDiv").style.display="none";
	document.getElementById("GroupDiv").style.display="block";
	document.getElementById("DepartmentDiv").style.display="none";
}
else if(divId=="DepartmentDiv")
{
	document.forms[0].userwise.checked=false;
	document.forms[0].groupwise.checked=false;
	document.forms[0].departmentwise.checked=true;
	document.forms[0].departmentwise.value=true;
	document.getElementById("UserDiv").style.display="none";
	document.getElementById("GroupDiv").style.display="none";
	document.getElementById("DepartmentDiv").style.display="block";
}
else
{
	alert("No Match Found");
}

}