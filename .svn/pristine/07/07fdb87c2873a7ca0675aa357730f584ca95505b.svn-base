function datecheck(from,to)

{
alert("vivek");
if(document.getElementsByName(from)[0].value=="")
{
alert("First select effective from date");
document.forms[0].effective_to.value="";
return false;
}
else
{
alert("shweta");
	var aArray=(document.getElementsByName(from)[0].value).split("-");
	var amonth=aArray[1];
	
	var aday=aArray[0];
	var ayear=aArray[2];
	var adate=new Date(amonth +" "+ aday+" "+ayear);
	
	var bArray=(document.getElementsByName(to)[0].value).split("-");
	var bmonth=bArray[1];
	var bday=bArray[0];
	var byear=bArray[2];
	var bdate=new Date(bmonth +" "+ bday+" "+byear);
	
	if(adate>bdate)
	{
	alert("Effective from date cannnot be less than effective to date");
	document.forms[0].effective_to.value="";
    document.forms[0].effective_to.focus(); 
	return false;
	}
 return true;
 }
}

function keyhandler(e,param)
{
var length=param.value.length;

if(length==0)
{
	if(e.which >=65 && e.which <= 90 || e.which >=97 && e.which <= 122 )
	{
	
	return true;
	}
	else
	{
		alert("Can't enter space,digits or special charecters at first place");
		return false;
	}
}
else
{
  if(e.which==32 || e.which >=65 && e.which <= 90 || e.which >=97 && e.which <= 122 || e.which==13 || e.which==8)
    return true;
  else
  {
	  alert (" special characterssssssss and digits are not allowed.\n Please remove them and try again.");
	  return false;  
  }
  }  
}




function isMonth(val)
{
switch(val.toUpperCase())
{
case "JAN":
return true;
break;	
case "FEB":
return true;
break;	
case "MAR":
return true;
break;	
case "APR":
return true;	
break;	
case "MAY":
return true;	
break;	
case "JUN":
return true;
break;		
case "JUL":
return true;	
break;	
case "AUG":
return true;
break;		
case "SEP":
return true;	
break;		
case "OCT":
return true;	
break;		
case "NOV":
return true;	
break;		
case "DEC":
return true;	
break;
}
return false;
}//End of isMonth(val)


//getting days according to month & year
function getDays(mon,yyy)
{
switch(mon.toUpperCase())
{	
case "JAN":
return 31;	
break;		
case "FEB":
if(yyy%400==0 || (yyy%400!=0 && yyy%4==0))
return 29;			
else			
return 28;	
break;	
case "MAR":
return 31;	
break;	
case "APR":
return 30;	
break;		
case "MAY":
return 31;	
break;		
case "JUN":
return 30;	
break;	
case "JUL":
return 31;	
break;		
case "AUG":
return 31;	
break;		
case "SEP":
return 30;	
break;		
case "OCT":
return 31;	
break;		
case "NOV":
return 30;	
break;		
case "DEC":
return 31;	
break;	
}	
return false;
}//End of isMonth(val)

function dateValidator(objVal,seperator)//value Based
{	
	var dateSplit=objVal.split(seperator);
	var flag=true;	
	if(objVal.replace(/\s*/,"")=="")
		flag=true;
	else if(dateSplit.length!=3)
	{
		alert("Use format DD"+seperator +"MMM"+seperator+"YYYY");
		flag=false;
	}	
else if((dateSplit[0].replace(/\s*/,"")=="" || isNaN(dateSplit[0])) || (dateSplit[2].replace(/\s*/,"")=="" || isNaN(dateSplit[2])))
	{
		alert("Check Either Date or Year is not Correctly Entered");
		flag=false;	
}	else if(!isMonth(dateSplit[1]))
	{		alert("Month Is Not Correctly Entered!");
		flag=false;
	}	
else if(dateSplit[2].length!=4)
	{	
	alert("Enter Full Year");
		flag=false;
	}	
else	{
		if(dateSplit[0]>=0 && dateSplit[0]<=getDays(dateSplit[1],dateSplit[2]))	
			flag=true;
		else
		{

			alert("Date Is Not Correctly Entered");	

		flag=false;

		}
	}
	return flag;}//End od dateValidator
	
//validating system after date
function sysAfter(from_date,msg)
{
	//alert("hi");
	if(msg=="")
		msg="Date Is smaller than Current Date";
	//alert("from Date=== " +from_date);
	
	var flag=true;
	var mon=new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");
	var seperator="-";
	if(from_date.value.replace(/\s*/,"")=="")
		flag=true;	
		
	else if(dateValidator(from_date.value,seperator) )
		{
			var curD=new Date();	
			var splits=(from_date.value).split(seperator);
			if(curD.getFullYear()>splits[2])//for entered year is small	
				{	
					alert(msg);
					flag=false;	
				}	
			else if(curD.getFullYear()==splits[2])//for entered year equals current year
				{	
					var i=0;	
					for(;i<mon.length;i++)	
					if(splits[1].toUpperCase()==mon[i])
							break;	
					if(curD.getMonth()>i)//entered month is small	
					{	
						alert(msg);	
						flag=false;	
					}
						
					else if(curD.getMonth()==i)//entered month is equals current month	
					{		
						if(curD.getDate()>splits[0])
						{								
							alert(msg);
							from_date.value="";
							flag=false;	
						}
							
						else	
							flag=true;	
					}	
						
					else			
					flag=true;		
				}	
		}//end of else if(dateValidator(from_date.value,seperator) )
	
		else
		{	
			flag=false;
			
			from_date.focus();	
			
		}	
		//alert("flag=" + flag);
return flag;
	}//end of sysAfter(obj.seperator)

function  sysBefore(from_date,msg)
{
	var flag=true;
	if(msg=="")
	 msg="Date Is Bigger than Current Date";
	alert("siddharth is in sysBefore");
	var seperator="-";
	var mon=new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");
	if(from_date.value.replace(/\s*/,"")=="")
		flag=true;
	else if(dateValidator(from_date.value,seperator))
	{
		var curD=new Date();
		//alert("curd  "+curD);
		var splits=from_date.value.split(seperator);
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
				alert(msg);
				flag=false;
			}
			else if(curD.getMonth()==i)//entered month equals current month
			{
				if(curD.getDate()<splits[0])
				{
					alert(msg);
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
		from_date.focus();
		return flag;
	}
	
	return flag;
}//end of sysBefore(obj.seperator)


