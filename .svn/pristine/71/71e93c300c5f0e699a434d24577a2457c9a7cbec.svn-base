
function isAlpha(elem,fieldName)
{
if(parseInt(elem.value))
{
alert("Can't put Numeric Value in "+fieldName);
elem.focus();
return false;
}
else
return true;
}

 function  shownondelhidiv(){   
   document.getElementById("divpatAddCityLocCode").style.display="none";            
   document.getElementById("divpatAddCityLocation").style.display="block";
  document.getElementsByName("patAddCityLoc")[0].value="";
   document.getElementsByName("patAddStateCode")[0].value="84";   
   document.getElementsByName("patAddCountryCode")[0].value="1";
   document.getElementsByName("patAddStateCode")[0].disabled=false;   
   document.getElementsByName("patAddCountryCode")[0].disabled=false;  	   	          
   }
     
function  shownondelhidiv(stateCode,countryCode){   
  document.getElementById("divpatAddCityLocCode").style.display="none";            
  document.getElementById("divpatAddCityLocation").style.display="block";
  document.getElementsByName("patAddCityLoc")[0].value="";
  document.getElementsByName("patAddStateCode")[0].value=stateCode;   
  document.getElementsByName("patAddCountryCode")[0].value=countryCode;
  document.getElementsByName("patAddStateCode")[0].disabled=false;   
  document.getElementsByName("patAddCountryCode")[0].disabled=false;  	   	          
  }
  
  function IsreferredOnLoad(elem)
 {

//  alert("Isreferred called");

 // alert("Isreferredonload called");

  /*
    if (elem.checked)
    {
      //  alert("Isreferred checked");

		document.getElementById('divReferredByDoc').style.display="";
		document.getElementById('divReferredByDocText').style.display="";
		if(document.getElementsByName('referringInstType')[0].checked){alert("if");
        //document.getElementsByName('referringInstType')[0].checked="true";    
		document.getElementById('divRefHosname').style.display="none";
		document.getElementById('divRefHosCode').style.display="";
		document.getElementById('divReferredInstitute').style.display="";
		
		
		}
		else{
		document.getElementById('divRefHosname').style.display="";
		document.getElementById('divRefHosCode').style.display="none";
		document.getElementById('divReferredInstitute').style.display="";
		
			}
    }
    else
 	{  
    
		document.getElementById('divRefHosname').style.display="none";
		document.getElementById('divRefHosCode').style.display="none";
		document.getElementById('divReferredInstitute').style.display="none";
		document.getElementById('divReferredByDoc').style.display="none";
		document.getElementById('divReferredByDocText').style.display="none";
	
 	}    */ 
 	//alert("before isrefered check");
 
 	if(elem.checked){
//alert("isref true");
// 	 	document.getElementById('divReferred').style.display="";
 	if(document.getElementsByName('referringInstType')[0].checked){
// alert("gnctd true checking");
        //document.getElementsByName('referringInstType')[0].checked="true";    
		document.getElementById('divRefHosname').style.display="none";
		document.getElementById('divRefHosCode').style.display="";
		document.getElementById('divReferredInstitute').style.display="";
		document.getElementById('divReferred').style.display="";
		
		//alert("ref doct value"+document.getElementsByName("patRefDoctor")[0].value);
		}
		else{
	//	alert("other");
		document.getElementById('divRefHosname').style.display="";
		document.getElementById('divRefHosCode').style.display="none";
		document.getElementById('divReferredInstitute').style.display="";

		document.getElementById('divReferred').style.display="none";
		
		//alert("ref doct value"+document.getElementsByName("patRefDoctor")[0].value);

		//document.getElementById('divReferred').style.display="none";
		document.getElementById('divReferred').style.display="";
		
		

			}
		
		document.getElementById('divDocTitle').style.display="";
		document.getElementById('divDocName').style.display="";
 	
 	}
 	
 	else
 	{
	 	document.getElementById('divRefHosname').style.display="none";
		document.getElementById('divRefHosCode').style.display="none";
		document.getElementById('divReferredInstitute').style.display="none";
		//document.getElementById('divReferredByDoc').style.display="none";
		//document.getElementById('divReferredByDocText').style.display="none";
		document.getElementById('divReferred').style.display="none";
		document.getElementById('divDocTitle').style.display="none";
		document.getElementById('divDocName').style.display="none";
 	
 } 
 }
  
  
 function Isreferred(elem)
 {
 // alert("Isreferred called");
  /*
    if (elem.checked)
    {
      //  alert("Isreferred checked");

		document.getElementById('divReferredByDoc').style.display="";
		document.getElementById('divReferredByDocText').style.display="";
		if(document.getElementsByName('referringInstType')[0].checked){alert("if");
        //document.getElementsByName('referringInstType')[0].checked="true";    
		document.getElementById('divRefHosname').style.display="none";
		document.getElementById('divRefHosCode').style.display="";
		document.getElementById('divReferredInstitute').style.display="";
		
		
		}
		else{
		document.getElementById('divRefHosname').style.display="";
		document.getElementById('divRefHosCode').style.display="none";
		document.getElementById('divReferredInstitute').style.display="";
		
			}
    }
    else
 	{  
    
		document.getElementById('divRefHosname').style.display="none";
		document.getElementById('divRefHosCode').style.display="none";
		document.getElementById('divReferredInstitute').style.display="none";
		document.getElementById('divReferredByDoc').style.display="none";
		document.getElementById('divReferredByDocText').style.display="none";
	
 	}    */ 
 	
 	if(elem.checked){
//alert("isref true");
// 	 	document.getElementById('divReferred').style.display="";
		document.getElementsByName("patRefGnctdHospitalCode")[0].value="-1";
		document.getElementsByName("patRefHospitalName")[0].value="";
 	if(document.getElementsByName('referringInstType')[0].checked){
// alert("gnctd true checking");
        //document.getElementsByName('referringInstType')[0].checked="true";    
		document.getElementById('divRefHosname').style.display="none";
		document.getElementById('divRefHosCode').style.display="";
		document.getElementById('divReferredInstitute').style.display="";
		document.getElementById('divReferred').style.display="";
		document.getElementsByName("patRefDoctor")[0].value="";
		document.getElementsByName("patRefGnctdHospitalDept")[0].value="";
		document.getElementsByName("patRefGnctdHospitalDeptUnit")[0].value="";
		document.getElementsByName("patRefGnctdHospitalCrno")[0].value="";
		//alert("ref doct value"+document.getElementsByName("patRefDoctor")[0].value);
		}
		else{
	//	alert("other");
		document.getElementById('divRefHosname').style.display="";
		document.getElementById('divRefHosCode').style.display="none";
		document.getElementById('divReferredInstitute').style.display="";

		document.getElementById('divReferred').style.display="none";
		document.getElementsByName("patRefDoctor")[0].value="";
		//alert("ref doct value"+document.getElementsByName("patRefDoctor")[0].value);

		//document.getElementById('divReferred').style.display="none";
		document.getElementById('divReferred').style.display="";
		document.getElementsByName("patRefGnctdHospitalDept")[0].value="";
		document.getElementsByName("patRefGnctdHospitalDeptUnit")[0].value="";
		document.getElementsByName("patRefGnctdHospitalCrno")[0].value="";
		}
		
		document.getElementById('divDocTitle').style.display="";
		document.getElementById('divDocName').style.display="";
 	
 	}
 	
 	else
 	{
	 	document.getElementById('divRefHosname').style.display="none";
		document.getElementById('divRefHosCode').style.display="none";
		document.getElementById('divReferredInstitute').style.display="none";
		//document.getElementById('divReferredByDoc').style.display="none";
		//document.getElementById('divReferredByDocText').style.display="none";
		document.getElementById('divReferred').style.display="none";
		document.getElementById('divDocTitle').style.display="none";
		document.getElementById('divDocName').style.display="none";
 	
 }
 }
 function showdivhosname()
 {
//    alert("showdivhosname");
    document.getElementById("divRefHosCode").style.display="none";  
	document.getElementById("divRefHosname").style.display="";  
	document.getElementsByName("patRefGnctdHospitalCode")[0].selectedIndex=0;
	Isreferred(document.getElementsByName("isReferred")[0]);
 }
 
 function showdivhoscode()
 {

  

// alert("showdivhoscode");

    document.getElementById("divRefHosCode").style.display="";  
	document.getElementById("divRefHosname").style.display="none"; 
	document.getElementsByName("patRefHospitalName")[0].value="";
	document.getElementsByName("patRefDoctor")[0].value="";
	//alert("checing!!!!!!!!!");
	Isreferred(document.getElementsByName("isReferred")[0]);
 } 
 
function showdepartmentdiv()
{
document.getElementsByName('departmentdiv')[0].value="1";

}
  
/*function submitFormOnValidate(flag,mode)
{
	//alert("flag 123456 "+flag+" mode 123456 "+mode);
	if(flag)
	{
	 //alert("inside if");
		submitForm(mode);
	}
	else{
// 	alert("elesee")
	return false;
	}
	
}


function submitFormOnValidateCMO(flag,mode){
//alert("submit form on vlaidate");
//alert(mode);
	if(flag)
		submitRegister(mode);
}*/

/*function submitForm(mode)
{     alert("submitting");
	 document.getElementsByName("hmode")[0].value=mode;
	 alert("submitform Hmode"+document.getElementsByName("hmode")[0].value);   
	 doHomeWork();  
	 document.forms[0].submit();
}
*/
/*function deleteRow(idx){
//	alert(idx);
	//alert(document.getElementsByName("hmode")[0].value)
	//alert("remove check");
	document.getElementsByName("removeDept")[0].value = idx;
	submitForm("REMOVEDEPT");
}*/










////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////function for validating minimum length of a field///////////////////////////////////////////////////////////////////////////////////////////////////////////////


function validateMinLength(elem,minlen) {
	 var isValid = true;
     if(elem)
		value=elem.value;
     else
		value="";
				     
       if ((value.length<minlen))
				               {
				                isValid = false;
				              }
   return isValid;
 } 





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////validation for mandatory fields////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function isValid(obj,name,minVal)

{
 //alert(obj.name);

  	if(obj!=null)
{
	
var val	=	new String(obj.value);
var ageUnit=document.getElementsByName('patAgeUnit')[0].value
		if(document.getElementsByName('isActualDob')[0].checked)
		{
      //   alert("if.checked");		
		




      //  alert(val);

		if((val=="" || val>minVal) && ageUnit=="Y")

		{

			alert("Please Enter valid "+ name +"(<125)");

			obj.value=val;

			obj.focus();

			return false;

		}
		else
		{
			if(val=="0")
			{
				alert("Please Enter Valid"+name+"{>0}");
				obj.value=val;

				obj.focus();

				return false;
			}
		}
      }
     else
			obj.value=val;
		return true;
	}
	return false;

}

function isSelected(combo,name)

{
//alert(combo);

	if(combo!=null && combo.selectedIndex==0)

	{

		alert("Please Select the "+ name);

		combo.focus();

		return false;

	}

	return true;

}





/*function submitForm(mode)
{
    
  //  alert("submitform....");
     document.getElementsByName("hmode")[0].value=mode;
   //  doHomeWork();  
  //   alert("submit form action is"+document.forms[0].action);  
  //  alert("hmode "+document.getElementsByName("hmode")[0].value)   
    
	 document.forms[0].submit();
	 
}*/

function comboValidation(obj, str)
{	var valid= true
	if(obj.value==-1)
	{
		alert("Please Select : "+str)
		valid=false
		obj.focus()
	}
	return valid
}

function ValidateDepartmentUnit(field) {
         var isValid = true;
        
//alert('inside ValidateDepartment of registration.js....');
      value2=document.getElementsByName("departmentUnitCode")[0].value; 
    //  alert(value2);
      if(field)
      value=field.value;
      else
      value="";
      
         if ((value.length == 0)||(value=='-1'))
               { 
               if(value2=='-1'){
               	alert("Please Select the Unit");
                isValid = false;
                document.getElementsByName("departmentUnitCode")[0].focus();
              }
              }
 // alert(isValid);               
  return isValid;
        

       } 


function ValidateReferToDepartment(field){

var isValid = true;
        

      value2=document.getElementsByName("refToDepartmentCode")[0].value; 
    //  alert(value2);
      if(field)
      value=field.value;
      else
      value="";
      
         if ((value.length == 0)||(value=='-1'))
               { 
               if(value2=='-1'){
               	alert("Select Referred to Department");
                isValid = false;
                document.getElementsByName("refToDepartmentCode")[0].focus();
              }
              }
 // alert(isValid);               
  return isValid;

}





	

function checkValueOfCombo(elem,field,mode)

{
if(elem.value=="-1")
alert("Select a "+field);
else
{

 submitForm(mode);
 
 }
 }
	


function showdivEmployee()
{
//alert("show emp");
document.getElementById("divCmoName").style.display="none";
document.getElementById("divLabelcmoName").style.display="";
//document.getElementById("divemployeeLabelcmoCode").style.display="";
document.getElementById("divemployeeCmoCode").style.display="";
document.getElementsByName("doctorName")[0].value="";
document.getElementsByName("cmoCode")[0].value="";
}


function showdivnonemployee(){
document.getElementById("divCmoName").style.display="";
document.getElementById("divLabelcmoName").style.display="";
//document.getElementById("divemployeeLabelcmoCode").style.display="none";
document.getElementById("divemployeeCmoCode").style.display="none";
document.getElementsByName("doctorName")[0].value="";
document.getElementsByName("cmoCode")[0].value="";

}

///////////////////////////////function to validate prevCRNO......................................

function validatePrevCRNo(){
var valid=true;
if(validateMinLength(document.getElementsByName('prevCrNo')[0],12))
valid=true;
else{
valid=false;  
alert("InValid Previous CR Number");
}
return valid;

}

////////////////////////function to check the minimum length allowed for any text box////////

function validateMinimumLength(obj,name,minimumSize)
{
	
	var valid=true
	var len=obj.value.length
	if(parseInt(len)>0 && parseInt(len)<parseInt(minimumSize))
	{
		alert(name +' cannot be less than '+ minimumSize +' digits')
		valid=false
		obj.focus();
		
	}
	return valid
}


/////////////////////////function to check if the pin number starts with zero/////////


function validatePinNumber(obj)
{	

	var valid=true
	var len=obj.value.length
	var val=obj.value
		
	if (parseInt(len)>0 )
	{
		
		if((val.charAt(0))==0)
		{
		alert("Pin Number Cannot Start with Zero")
		valid=false
		obj.focus()
		}
		else
		{
			valid=true
		}
	}
	else
	{
		valid=true
	}
	
	return valid
	
}

/////////////////function to check if the text starts with dot/////////////////////////

function validateStartingWithDot(obj,name)
{

	var valid=true
	var len=obj.value.length
	var val=obj.value
	
	if(parseInt(len)>0)
	{
		if((val.charAt(0))=='.')
		{
			alert(name+" cannot start with special character dot")
			valid=false
			return valid
		}
		
	}
	
	return valid
}


////////////////////////function to check for two consecutive dots////////////////

function validateTwoConsecutiveDots(obj,name)
{
	var valid=true
	var len=obj.value.length
	var val=obj.value
	
	if(parseInt(len)>0)
	{
		for(i=0;i<len;i++)
		{
			if((val.charAt(i))=='.')
			{
				if((val.charAt(i))==(val.charAt(i+1)))
				{
				alert(name+" cannot have two consecutive special character dot")
				valid=false
				
				return valid
				}
			}
		}
	}
	
	return valid	
}


//////////////////////function to check if the text ends with dot/////////////////////

function validateEndingWithDot(obj,name)
{
	var valid=true
	var len=obj.value.length
	var val=obj.value
	
	if(parseInt(len)>0)
	{
		if((val.charAt(len-1))=='.')
		{
			alert(name+" cannot end with special character dot")
			valid=false
			return valid
		}
		
	}
	
	return valid
} 


//////////////////////////validate text area with dots//////////////////

function validateDot(obj,name)
{

	var valid=false
	
	if(validateStartingWithDot(obj,name)
	&& validateTwoConsecutiveDots(obj,name)
	&& validateEndingWithDot(obj,name))
	{
		
		valid=true
	}

	return valid
}


/////////////////function to check if the text starts with special character/////////////////////////

function validateStartingWithSpecialCharacter(obj,name)
{
	var valid=true
	var len=obj.value.length
	var val=obj.value
	
	if(parseInt(len)>0)
	{
		if((val.charAt(0))=='.' ||  (val.charAt(0))=='/' || (val.charAt(0))=='-')
		{
			alert(name+" cannot start with special character ")
			valid=false
			return valid
		}
		
	}
	
	return valid
}


////////////////////////function to check for two consecutive special character////////////////

function validateTwoConsecutiveSpecialCharacter(obj,name)
{
	var valid=true
	var len=obj.value.length
	var val=obj.value
	
	if(parseInt(len)>0)
	{
		for(i=0;i<len;i++)
		{
			if((val.charAt(i))=='.' || (val.charAt(i))=='/' || (val.charAt(i))=='-')
			{
				if((val.charAt(i))==(val.charAt(i+1)))
				{
				alert(name+" cannot have two consecutive special character ")
				valid=false
				
				return valid
				}
			}
		}
	}
	
	return valid	
}


//////////////////////function to check if the text ends with special character/////////////////////

function validateEndingWithSpecialCharacter(obj,name)
{
	var valid=true
	var len=obj.value.length
	var val=obj.value
	
	if(parseInt(len)>0)
	{
		if((val.charAt(len-1))=='.' || (val.charAt(len-1))=='/' || (val.charAt(len-1))=='-')
		{
			alert(name+" cannot end with special character ")
			valid=false
			return valid
		}
		
	}
	
	return valid
} 


//////////////////////////validate text area with special character//////////////////

function validateSpecialCharacter(obj,name)
{
	var valid=false
	//alert("entry")
	if(validateStartingWithSpecialCharacter(obj,name)
	&& validateTwoConsecutiveSpecialCharacter(obj,name)
	&& validateEndingWithSpecialCharacter(obj,name))
	{
		
		valid=true
	}

	return valid
}

/////////////////////////////////////functions for display country state location ////////////////////
var empCode="";
function varifyEmployeeCode()
{
	// empCode
}

//////////////////////////////////function to move element up in list ////////////////////////////////
function moveUP(Obj)
{
	var list=Obj;	
	var len=list.length;
	for(var i=0;i<len;i++)
	{
		if(list.options[i].selected)
		{
			if(i==0) return;
			
			var temp;
			temp=list.options[i-1].value;
			list.options[i-1].value=list.options[i].value;
			list.options[i].value=temp;
			
			temp=list.options[i-1].text;
			list.options[i-1].text=list.options[i].text;
			list.options[i].text=temp;
			
			list.options[i-1].selected=true;;
			list.options[i].selected=false;
		}
	}
}


//////////////////////////////////function to move element down in list ////////////////////////////////
function moveDOWN(Obj)
{
	
	var list=Obj;	

	var len=list.length;
	for(var i=len-1;i>=0;i--)
	{
		if(list.options[i].selected)
		{
			if(i==(len-1)) return;
			
			var temp;
			temp=list.options[i+1].value;
			list.options[i+1].value=list.options[i].value;
			list.options[i].value=temp;
			
			temp=list.options[i+1].text;
			list.options[i+1].text=list.options[i].text;
			list.options[i].text=temp;
			
			list.options[i+1].selected=true;;
			list.options[i].selected=false;
		}
	}
}


//////////////////////////////////function for Trimming ////////////////////////////////

function trimData(val)
{
	//alert((typeof val).toUpperCase());
	if(val && val!=null && val!="" && (typeof val).toUpperCase() == 'STRING')
	{
		while(val.substr(0,1)==' ')	val=val.substr(1);
		while(val.substr(val.length-1,1)==' ')	val=val.substr(0,val.length-1);			
	}
	return val;
}

function trimLeftZero(val)
{
	if((typeof val) != 'undefined' && val.length>1)
	{
		while(val.substr(0,1)=='0')	val=val.substr(1);
	}
	return val;
}

/**************************** Date Conversion And Adding Date *************************************/

var monthShortNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var monthFullNames = ["January","February","March","April","May","June","July","August",
						"September","October","November","December"];
var weekdayShortNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var weekdayFullNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function getShortMonthNameNo(mon)
{	
	for(var i=0;i<monthShortNames.length;i++)
	{
		if(monthShortNames[i].toUpperCase()==mon.toUpperCase())
			return i;
	}
	return -1;
}

function getShortMonthName(no)
{	
	if(typeof no=="number" && no>=0 && no<=11)
		return monthShortNames[no];
	else
		return null;
}

function convertStrToDate(strDate, strFormat)
{
	try
	{
		var fT=["dd","MM","Mon","yyyy","yy","hh","mm","ss"];	// formatTokens 
		// dd date(01), MM month(01), Mon month(Jan), yyyy Year(2002), yy Year(02), hh Hours(23), 
		// mm Minutes(28), ss Seconds(34)
		
		var value= ["","","","","","","",""];	// formatToken Values
		var day="00", month="00", year="0000", hour="00", min="00", sec="00";
		
		// Date As String is in Date Format dd/mm/yyyy hh:mm
		var _fDAS="dd/MM/yyyy hh:mm";
		_fDAS=strFormat;
		
		for(var i=0;i<fT.length;i++)
		{
			var beg=_fDAS.indexOf(fT[i]);
			if(beg!=-1)
			{
				var len=fT[i].length;
				value[i]=trimLeftZero(strDate.substr(beg,len));
			}
		}
		//alert(value);
		for(var i=0;i<value.length;i++)
		{
			if(fT[i]=="dd" && value[i]!="")
				day = parseInt(value[i]);
			else if(fT[i]=="MM" && value[i]!="")
				month=parseInt(value[i])-1;					
			else if(fT[i]=="Mon" && value[i]!="")
				month = getShortMonthNameNo(value[i]);
			else if(fT[i]=="yyyy" && value[i]!="")
				year = parseInt(value[i]);
			else if(fT[i]=="yy" && value[i]!="")
			{
				if(year==null)
				{
					var now = new Date();
					year = parseInt(now.getFullYear().substr(0,2)+value[i]);
				}
			}
			else if(fT[i]=="hh" && value[i]!="")
				hour = parseInt(value[i]);
			else if(fT[i]=="mm" && value[i]!="")
				min = parseInt(value[i]);
			else if(fT[i]=="ss" && value[i]!="")
				sec = parseInt(value[i]);				
		}
		var dt = new Date(year,month,day,hour,min,sec);
		//alert(year+","+month+","+day+","+hour+","+min+","+sec);
		//alert(dt);
		return dt;
	}
	catch(e)
	{
		//alert("Error Message -> "+e.message);
		return null;
	}	
}

function addToDate(_dt,n,_format)
{
	if(_format=="Y")
		_dt.setYear(_dt.getFullYear()+n);
	else if(_format=="M")
		_dt.setMonth(_dt.getMonth()+n);
	else if(_format=="D")
		_dt.setDate(_dt.getDate()+n);
	else if(_format=="H")
		_dt.setHours(_dt.getHours()+n);
	else if(_format=="MI")
		_dt.setMinutes(_dt.getMinutes()+n);
	else if(_format=="S")
		_dt.setSeconds(_dt.getSeconds()+n);
	return _dt;
}

function dateDifference(_bigDt,_smallDt,_format)
{
	if(typeof _format == 'undefined')	_format="D";
	var diff = null;
	if(_bigDt < _smallDt)	return diff;
	
	if(_format=="Y")	// Years
	{
		diff = _bigDt.getFullYear() - _smallDt.getFullYear();
		_smallDt.setYear(_smallDt.getFullYear()+diff);
		if(_smallDt>_bigDt)	diff--;
	}
	else if(_format=="M")	// Months
	{
		var diffYears = _bigDt.getFullYear() - _smallDt.getFullYear();
		_smallDt.setYear(_smallDt.getFullYear()+diffYears);
		if(_smallDt>_bigDt)
		{	
			diffYears--;
			_smallDt.setYear(_smallDt.getFullYear()-1);
			//alert(_smallDt>_bigDt);
			var diffMonths = _bigDt.getMonth() + 12 - _smallDt.getMonth();
		}
		else
		{
			var diffMonths = _bigDt.getMonth() - _smallDt.getMonth();
		}
		_smallDt.setMonth(_smallDt.getMonth()+diffMonths);
		if(_smallDt>_bigDt)	diffMonths--;
		
		diff = (diffYears*12) + diffMonths;
	}
	else if(_format=="D")	// Days
	{
		diff = Math.ceil((_bigDt-_smallDt)/(1000*60*60*24));
	}
	else if(_format=="H")	// Hours
	{
		diff = Math.ceil((_bigDt-_smallDt)/(1000*60*60));
	}
	else if(_format=="MI")	// Minutes
	{
		diff = Math.ceil((_bigDt-_smallDt)/(1000*60));
	}
	else if(_format=="S")	// Seconds
	{
		diff = Math.ceil((_bigDt-_smallDt)/(1000));
	}
	return diff;
}

function convertDateToStr(_date, _strFormat)
{
	try
	{
		var fT=["dd","MM","Mon","yyyy","yy","hh","mm","ss","WWW","Week","Month"];	// formatTokens 
		// dd date(01), MM month(01), Mon month(Jan), yyyy Year(2002), yy Year(02), hh Hours(23), 
		// mm Minutes(28), ss Seconds(34), WWW WeekDay(Mon), Week WeekDay(Monday), Month Month(January)
		
		var strDate = _strFormat;
		
		for(var i=0;i<fT.length;i++)
		{
			var beg=strDate.indexOf(fT[i]);
			if(beg!=-1)
			{
				var len=fT[i].length;
				var value = "";				
				if(fT[i]=="dd")
				{
					value = _date.getDate();
					if(value<=9)	value="0"+value;
				}
				else if(fT[i]=="MM")
				{
					value = _date.getMonth()+1;
					if(value<=9)	value="0"+value;
				}
				else if(fT[i]=="Mon")
					value = getShortMonthName(_date.getMonth());
				else if(fT[i]=="yyyy")
					value = _date.getFullYear();
				else if(fT[i]=="yy")
					value = _date.getFullYear().substr(2,2);
				else if(fT[i]=="hh")
				{
					value = _date.getHours();
					if(value<=9)	value="0"+value;
				}
				else if(fT[i]=="mm")
				{
					value = _date.getMinutes();
					if(value<=9)	value="0"+value;
				}
				else if(fT[i]=="ss")
				{
					value = _date.getSeconds();
					if(value<=9)	value="0"+value;
				}
				else if(fT[i]=="WWW")
					value = weekdayShortNames[_date.getDay()];
				else if(fT[i]=="Week")
					value = weekdayFullNames[_date.getDay()];
				else if(fT[i]=="Month")
					value = monthFullNames[_date.getMonth()];
				//alert(strDate);
				strDate = strDate.substring(0,beg)+value+strDate.substr(beg+len); 
				//alert(strDate);
			}				
		}
		return strDate;
	}
	catch(e)
	{
		//alert("Error Message -> "+e.message);
		return null;
	}	
}

//Function for getting the month code from the month name
function getMonthCode(monthName)
{
	for(var i=0; i < monthShortNames.length ; i++)
		if(monthShortNames[i]==monthName)
			return i+1;
}


function validateDateBeforeOnly(_objDate, _fmtDate, _objToDate, _fmtToDate)
{
	var date = convertStrToDate(_objDate.value,_fmtDate);
	var toDate = convertStrToDate(_objToDate.value,_fmtToDate);
	
	if(date<toDate)
		return true;
	else
		return false; 
}

/***********************  END Date Conversion And Adding Date *************************************/



////Function for setting a date after adding some days to a date 
//into some other text box ,on click of a checkbox/button..etc.


function setDateInTextBoxAfterAddingDaysToDate(_date,_dateAsString,_dateToSetWhere,_daysToAdd)
{



	var referenceDate;

	var fT=["dd","MMM","yyyy"];	// formatTokens
	var value= new Array(3);
	
	
	// Date  As String is in Date Format dd/mmm/yyyy 
	var _fDAS="dd-MMM-yyyy";
	
	
	//first iterating through all the formatted tokens 
	//and now getting the index,length,finally value 
	// of each and every tokens from our String Date  
	
	for(var i=0;i<fT.length;i++)
	{
		var beg=_fDAS.indexOf(fT[i]);
		if(beg!=-1 && i!=1)
		{
			var len=fT[i].length;
			value[i]=parseInt(trimLeftZero(_dateAsString.substr(beg,len)));
			
		}
		else
		if(i==1)
		{		
		var len=fT[i].length;
		value[i]=	value[1]=getMonthCode(_dateAsString.substr(beg,len));
		}
		
	}
		
	referenceDate= new Date(value[2],value[1]-1,value[0]);	



//now adding  (_daysToAdd number of days)  to the referenceDate  


referenceDate.setDate(referenceDate.getDate()+_daysToAdd);

//alert("referenceDate2----"+referenceDate);

var nextDateYear=referenceDate.getFullYear();
var nextDateMonthCode=referenceDate.getMonth()+1;
var nextDateDay=referenceDate.getDate();


var nextDateMonth=monthShortNames[parseInt(nextDateMonthCode)-1];

if(parseInt(nextDateDay)<=9)
			nextDateDay="0"+nextDateDay;	
			
		

		
			
//now making the next date 

var newDate=nextDateDay+"-"+nextDateMonth+"-"+nextDateYear; /// dd-mmm-yyyy

//setting the next date

document.getElementsByName(_dateToSetWhere)[0].value=newDate;


}


//////////////////////////validate text area with dots//////////////////

function validateSpecialCharacter(char,obj,name)
{
//alert("special")
	//alert(char);

	var valid=false
	
	if(validateStartingWithSpecialCharacter(char,obj,name)
	&& validateTwoConsecutiveSpecialCharacter(char,obj,name)
	&& validateEndingWithSpecialCharacter(char,obj,name))
	{
		
		valid=true
	}

	return valid
}


/////////////////function to check if the text starts with dot/////////////////////////

function validateStartingWithSpecialCharacter(char,obj,name)
{
	//alert(char);
	var valid=true
	var len=obj.value.length
	var val=obj.value
	
	var specialChar="' "+char+" '"	
	
	if(parseInt(len)>0)
	{
		if((val.charAt(0))==char)
		{
			alert(name+" cannot start with special character "+specialChar);
			valid=false
			return valid
		}
		
	}
	
	return valid
}

////////////////////////function to check for two consecutive dots////////////////

function validateTwoConsecutiveSpecialCharacter(char,obj,name)
{
	var valid=true
	var len=obj.value.length
	var val=obj.value
	
	var specialChar="' "+char+" '"	
		
	
	if(parseInt(len)>0)
	{
		for(i=0;i<len;i++)
		{
			if((val.charAt(i))==char)
			{
				if((val.charAt(i))==(val.charAt(i+1)))
				{
				alert(name+" cannot have two consecutive special character "+specialChar)
				valid=false
				
				return valid
				}
			}
		}
	}
	
	return valid	
}

//////////////////////function to check if the text ends with dot/////////////////////

function validateEndingWithSpecialCharacter(char,obj,name)
{
	var valid=true
	var len=obj.value.length
	var val=obj.value
	var specialChar="' "+char+" '"	

		
	if(parseInt(len)>0)
	{
		if((val.charAt(len-1))==char)
		{
			alert(name+" cannot end with special character "+specialChar)
			valid=false
			return valid
		}
		
	}
	
	return valid
} 

////get label of selected index of list
function getSelectedLabel(selectObject)
{
	//var selectObject=selectObj
	var value=selectObject.value
	var selectedIndex=selectObject.selectedIndex;
	var optionsArray=selectObject.options;
	var label=optionsArray[selectedIndex].text;
	//alert(label)
	return label
	//selectObject.remove(selectedIndex);
}

/////////////////////////////////////return no of days between two date string ///////////////////////////////////////
//////date format dd-mon-yyyy
/*function dateDifference(fromDate,toDate)
{
	var days=0;
	var aArray=fromDate.split("-");
	var aday=aArray[0];
	var amonth=aArray[1];
	var ayear=aArray[2];
	var adate=new Date(amonth +" "+ aday+" "+ayear);
	var bArray=toDate.split("-");
	var bday=bArray[0];
	var bmonth=bArray[1];
	var byear=bArray[2];
	var bdate=new Date(bmonth +" "+ bday+" "+byear);
	days=((bdate-adate)/86400000);

	return days;
}*/



/**************************** Movement in Lists and Other Function  ************************************/
// Moving Single in Lists fromSource to toTarget 
function moveSingle(_fromSource,_toTarget)
{
	var source = _fromSource;
	var target = _toTarget;

	var totalElement = source.length;
	var val = "";
	var txt = "";
	var targetlen = 0;

	for(var i=0;i<totalElement;i++)
	{
		if(source.options[i].selected)
		{
			val = source.options[i].value;
			txt = source.options[i].text;			
		
			targetlen = target.length;							
			target.length = (targetlen+1);				
			
			target.options[targetlen].value = val;
			target.options[targetlen].text  = txt;													
		}
	}
	deleteTransferred(target,source);
}

// Moving All in Lists fromSource to toTarget
function moveAll(_fromSource,_toTarget)
{
	var source = _fromSource;
	var target = _toTarget;

	var totalElement = source.length;
	var val = "";
	var txt = "";
	var targetlen = 0;

	for(var i=0;i<totalElement;i++)
	{
		val = source.options[i].value;
		txt = source.options[i].text;			
		
		targetlen = target.length;							
		target.length = (targetlen+1);				
			
		target.options[targetlen].value = val;
		target.options[targetlen].text  = txt;													
	}
	deleteTransferred(target,source);
}

// Deleting from Source that in Target
function deleteTransferred(source,target)
{	
	var tarlen = target.length;
	var srclen = source.length;

	var a1 = new Array(tarlen);
	var a2 = new Array(tarlen);
	var a3 = new Array(srclen);

	for(var i=0;i<tarlen;i++)
	{		
		a1[i]= target.options[i].value;
		a2[i]= target.options[i].text;	
	}
	for( i=0;i<srclen;i++)		
		a3[i]= source.options[i].value;

	target.length = 0;
	var counter = 0;
	var k = 0;
	var flag = 0;

	for(i=0;i<tarlen;i++)
	{		
		flag = 0;
		for(k=0;k<srclen;k++)
			if(a1[i]==a3[k])
				flag = 1;					
		if(flag==0)
		{
			target.length = (counter+1);
			target.options[counter].value = a1[i];
			target.options[counter].text  = a2[i]; 
			counter++;			
		}		
	}
}

function unSelectAllInList(_elem)
{
	if(_elem)
		for(var i=0;i<_elem.length;i++)
			_elem.options[i].selected = false;
}

function selectAllInList(_elem)
{
	if(_elem)
	{
		_elem.multiple = true;
		for(var i=0;i<_elem.length;i++)
			_elem.options[i].selected = true;
	}
}
/***********************  END Movement in Lists and Other Function  ************************************/

/****************** Show Hide Image Function called on On Click **************/
function onclickShowHideImg(imgObj)
{
	var divObj = document.getElementById("div" + imgObj.id.substr(3));
	if(divObj.style.display=="none")
	{
		divObj.style.display="block";
		imgObj.src = "/HIS/hisglobal/images/arrow-up.png";
	}
	else if(divObj.style.display=="block")
	{
		divObj.style.display="none";
		imgObj.src = "/HIS/hisglobal/images/arrow-down.png";
	}
}
/****************** End Show Hide Image Function called on On Click **************/


/****************** AJAX Loading Continuation Signal Setter  **************/
function setAJAXLoading(elem)
{
	elem.innerHTML="<table id='tblLoading' width='100%' height='100%' cellpadding='0' cellspacing='0' border='0'>" + 
		"<tr><td width='100%' align='center'><img id='imgLoading' name='imgLoading' alt='Loading' title='Loading' src='/HIS/hisglobal/images/loading.gif'>" + 
		"</td></tr></table>";
}
/* END ************ AJAX Loading Continuation Signal Setter  **************/

/****************** Combo Related  **************/
function setText(obj, targetName)
{
	document.getElementsByName(targetName)[0].value = obj.options[obj.selectedIndex].text;
	alert(document.getElementsByName(targetName)[0].value);
}
/* END ************ Combo Related  **************/
