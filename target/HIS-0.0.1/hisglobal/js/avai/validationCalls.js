///........................................to validate MLC .......................................


function checkCmoType(){
		var valid=false;
		//alert("ElementsByName(cmoType)"+document.getElementsByName("cmoType")[0].value);
		if(document.getElementsByName("cmoType")[0].checked){
		//alert("validate doctor code");
		valid=validateObjects(document.forms[0].cmoCode,"CMO Name")
		}
		else{
	//	alert("validate doctor name");
		valid=validateObjects(document.forms[0].doctorName,"CMO Name")
		}
		return valid;
}

////////////////////////////////////////////////////validate Date.........................................

function compareDate(frDate,toDate,mode)
{
	var frValue, toValue,frYear, frMon, frDay,sts = 0;

	//alert("compare date " + frDate);
	//alert("compare date " + toDate);
	if (frDate == null || frDate.value == "")
	{
		//alert("if,,,,,,, 1");
		frValue = new Date;
		frYear = frValue.getYear();
		frMon = frValue.getMonth();
		frDay = frValue.getDate();
	}
	else
	{
		//alert("else1");
		if (isDate(frDate,mode) == true)
		{
	//	alert("if 22222222");
			frYear = intYear;
			frMon = intMon;
			frDay = intDay;

			if (isDate(toDate,mode) == true)
			{
		//	alert("if in else");
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
			//alert("false");
				toDate.focus();
				return false;
			}
		}
		else
		{
		//	alert("false");
			frDate.focus();
			return false;
		}
	}

	if (sts == 1)
	{
		if (frDate.value == "" || frDate == null)	{
			//validating current date with toDate
		//	alert("if................................blank");
			//getMsg(5,toDate.name);
			}
		else
			//alert(frDate.name + " is greater than " + toDate.name);

		frDate.focus();
		return false;
	}

	return true;

}

/////////////////////////////////////////////////////modify unit detail....................................
function validateUnitType()
{
		if(document.getElementsByName('isGeneral')[0].value=="-1")
			alert("Select a Unit");
		else
		{
			submitTile('ADDROOM'); 
 		}
}

//...............................to validate Unit Transfer........................................
function validateUnitTransfer(){
var valid=true;

if(validateDepartments() && validateObjects(document.forms[0].toDepartmentUnitCode,"Unit"))
valid=true;
else
valid=false;  

return valid;

}



//.............................to validate emergency old patient visit......................................



function ValidateEmergVisitStamp(){
var valid=true;

	 if(isEmpty(document.forms[0].patRegCatCode,"Emergency Type"))
	 //&& isEmpty(document.forms[0].isReferred,"Referring institution") &&  isEmpty(document.forms[0].patRefDoctor,"Referred By Doctor"))
	 	 
	 valid=true;
	 
	 else
     
     valid=false;  
     
return valid;

}

///////////////////////////////////validate old patient visit...............................................
function validateOldPatientVisit()
{

var valid=true;

if(validateOldDepartment())
valid=true;
else
valid=false;  

return valid;

}

///////////////////////////////////////validate New Department Visit//////////////////////

function validateNewDeptVisit()
{
var valid=true;
if	(isEmpty(document.forms[0].patPrimaryCatCode,"Primary Category")&&
	 isEmpty(document.forms[0].patSecondaryCatCode,"Secondary Category"))

	valid=true;
else

	valid=false;

return valid;
}

///////////////////////////////////validate change  patient category.............................
function validateChangePatCat()
{
var valid=true;
if(validateObjects(document.forms[0].patPrimaryCatCode,"Primary Category"))
valid=true;
else
valid=false;  

return valid;


}
//////////////////validate duplicate card........................
function validateDuplicateCard(){
var valid=true;

if(validateDepartments() )
{
// alert("validate department return true")
valid=true;
}
else
{
valid=false;
}  
//alert("validateDuplicateCard"+valid)
return valid;


}



//////////////////validate   AddressModification().................

function validateAddressModification(){
//alert("inside adress validation function");
var valid=true;

if(validateVerificationDocuments())
valid=true;
else
valid=false;  

//alert(valid);
return valid;

//////////////////////////////////////////////////////Modify Room To Unit..................................

function checkval()
{
element=document.getElementsByName("capacity");
	for(i=0;i<element.length;i++)
		{
			if(element[i].value.length==0)
				{				
				alert("Please enter the capacity");
				element[i].focus();
				return false;
				}
				else{
				//  alert("True");				
				}
		}
}		



}
////////////////////////////////////////emergency............................................................

function ValidateEmgReg(){

 if(isEmpty(document.forms[0].patFirstName,"First Name") 
 &&   isValid(document.forms[0].patAge,"Age",125)
 &&   isEmpty(document.forms[0].patAgeUnit,"Age Unit")  
 &&   isEmpty(document.forms[0].patDOB,"Date of Birth") 
 &&   validateDateAgainstSysDate(document.forms[0].patDOB,"Date of Birth")
 &&   isEmpty(document.forms[0].isReferred,"Referring institution")
 &&   isSelected(document.forms[0].patGenderCode,"Gender")
 &&   isSelected(document.forms[0].patPrimaryCatCode,"Patient Category")
 &&   isSelected(document.forms[0].patSecondaryCatCode,"Secondary Category")
 &&   isEmpty(document.forms[0].patAddCityLocCode,"Location")
 &&   isEmpty(document.forms[0].patAddCityLoc,"Location")
 &&   isEmpty(document.forms[0].patRegCatCode,"Emergency Type")
 &&   isEmpty(document.forms[0].patIdMark1,"Id Mark 1")
 &&   isEmpty(document.forms[0].patIdMark2,"Id Mark 2")
 &&   isSelected(document.forms[0].patAddCountryCode,"Country")
 &&   isSelected(document.forms[0].patAddStateCode,"State")
 &&   isEmpty(document.forms[0].patNationalityCode,"Nationality ")
 &&   isSelected(document.forms[0].departmentCode,"Department")
 &&   isEmpty(document.forms[0].patRefDoctor,"Reffered By Doctor Name"))
    {
      return true;
    }
  else
  return false;     
}

/////////////////////////////////////////////////validate add unit.................................................
function ValidateAddUnit(){


	effectiveFrom = document.getElementsByName("effectiveFrom")[0];
	effectiveTo = document.getElementsByName("effectiveTo")[0];
	entryDate = document.getElementsByName("entryDate")[0];

	result = true;
	if(isEmpty(document.forms[0].unitName,"Unit Name")&&
	isSelected(document.forms[0].isGeneral,"Unit Type") &&
	isSelected(document.forms[0].isExpiry,"Is Expiry") &&
	validateDayMonth() &&
	compareDateCall(entryDate,effectiveFrom,2,"Current Date","Effective From") &&
	validateDate())
	
	return result;
}

////////////////////////////////////////////////////////validate modify unit layout..................................

function ValidateModifyUnit(){

if(isEmpty(document.forms[0].unitName,"Unit Name") &&
	isSelected(document.forms[0].isGeneral,"Unit Type"))
	
		{
		return true;
	}
	else
	return false;
}

////////////////////////////////////////////Refer Department Visit..................................................

/*function validateReferDeptVisit()
{
var valid=true;
if	(isEmpty(document.forms[0].patPrimaryCatCode,"Primary Category")&&
	 isEmpty(document.forms[0].patSecondaryCatCode,"Secondary Category"))

	valid=true;
else

	valid=false;

return valid;
}*/

//////////////////////////////////////////validates registration desk's ...registration and modification interfaces///////////////////////


	
	
///////////////////////////////////////////////////Unknown to Known/////////////////////////////////////////////////


///////////////////////////////////////////refer dept visit stamp.............

function ValidateReferDeptVisitStamp(){

//alert("valid call  ValidateReferDeptVisitStamp  "+document.getElementsByName('episodeCode')[0].value);

  var valid=true;
	if(validateEpisodeCode() )
	//&& isEmpty(document.forms[0].patPrimaryCatCode,"Primary Category")&&
	 // isEmpty(document.forms[0].patSecondaryCatCode,"Secondary Category"))
	//if(validateEpisodeCode())
	   valid=true;
	else
	     valid=false;     
	    
   // alert("refer dept validation  ValidateReferDeptVisitStamp"+valid);
	return valid;
 
}

function validateDateAgainstSysDate(obj,label){
 // alert("dob select"+obj);
    if(document.getElementsByName('isActualDob')[1].checked){
	//	 	alert("inside validateDateAgainstSysDate");
		    obj2= document.getElementsByName('sysDate')[0]    
	//	    alert(document.getElementsByName('sysDate')[0].value);
			if(compareDateCall(obj,obj2,2,label,"System date"))			
			      return true;      	      
			  else	 
	    		  return false;	
	      }	 
	      else
	      return true;
}

function compareDateWithSysDate(obj,label){
   	    obj2= document.getElementsByName('sysDate')[0];    
			if(compareDateCall(obj,obj2,2,label,"System date"))			
			      return true;      	      
			  else	 
	    		  return false;	
	    
}


function validateMlcDate(obj,label){
//	alert("inside validate MLC date");
    obj2= document.getElementsByName('sysDate')[0]    
	if(compareDateCall(obj,obj2,2,label,"System date"))	{
	//alert("sdksgdvgdb");
	      return true;      
	      }
	  else	 
	      return false;	
	 
}
