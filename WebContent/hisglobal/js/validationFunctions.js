
//////////////////////common validation function//////////////////////////////////////////////
 
function validateObjects(obj,label)
{		//alert(obj.name + "   " +obj.value);
if(obj!=null)

 {
		var value;
		//alert("not null");
	//	alert("object name"+obj.name); 
	 	 if(obj.name=='referringInstType')
	 	 						{
	 	 						if(document.getElementsByName('referringInstType')[0].checked)
			  					value=document.getElementsByName('patRefGnctdHospitalCode')[0].value;
			  					else if(document.getElementsByName('referringInstType')[1].checked)
			  					value=document.getElementsByName('patRefHospitalName')[0].value;
			  					else
			  					value="";
		 						}
	 	 else if(obj.name=='patRelativeName' || obj.name=='relativeCode' || obj.name=='patRelativeAddress' )
	 	 						{
	 	 						if(document.getElementsByName('bodyHandOverTo')[0].checked)
			  					value=obj.value;
			  					else 
	 	 						value='~';
	 	 						}
	 	
	 	 else if(obj.name=='bodyHandOverTo')
	 	 						{
	 	 						if(document.getElementsByName('bodyHandOverTo')[1].checked)
			  					value=document.getElementsByName('bodyHandOverTo')[0].value;
		 						else
		 						value="~"; 	 
	 	 						}
	 	 else if(obj.name=='cmoCode')
	 	 						{
	 	 						if(document.getElementsByName('cmoType')[0].checked)
			  					value=document.getElementsByName('cmoCode')[0].value;
		 						else
		 						value="~"; 	 
	 	 						}		
	 				
		  else if(obj.name=='patAddCityLocCode')
		  				{
		  				
		  				if(document.getElementsByName('isAddressDelhi')[0].checked)
		  				{
		  				value=document.getElementsByName('patAddCityLocCode')[0].value;}
		  				else
				 		value="~";	
		  				
		  				
		  				}
 		  else if(obj.name=='patAddCityLoc')
		     			{
		     			if(document.getElementsByName('isAddressDelhi')[1].checked)
		  				value=document.getElementsByName('patAddCityLoc')[0].value;
		  				else
				 		value="~";	
		     			}
		 else if(obj.name=='doctorName')
	 	 						{
	 	 						if(document.getElementsByName('cmoType')[1].checked)
			  					value=document.getElementsByName('doctorName')[0].value;
		 						else
		 						value="~"; 	 
	 	 						}		
		   
	 							
	 	 else
	  	 value=obj.value;
								
		 
	     
			if(value=="")
	
			{
	         //   alert("df");
				alert("Please Enter the "+ label);
	
				obj.value=value;
	
				obj.focus();
	
				return false;
	
			}
			else if(value=="-1")
			{
	
				alert("Please Select the "+ label);
	
				obj.value=value;
	
				obj.focus();
	
				return false;
	
			}
	
			else
				//obj.value=value;
			return true;
 }
		return false;
	

}

////////////////////validate null objects/////////////////////////
function validateNullObjects(field,label)
{
 var isValid = true;
   //alert("value"+field.value);
   //alert("validateNullObjects:  "+field);
    if(field==null || field=="undefined")
              { 
               	//alert(label+"is required");
                isValid = false;
              }
            
     return isValid;
        

} 

/////////////////////validate CR NO............................
function validateCRNo()
{
var valid=true;
if(validateMinLength(document.getElementsByName('crNo1')[0],3)&& 
 // validateMinLength(document.getElementsByName('crNo2')[0],2)&& 
 // validateMinLength(document.getElementsByName('crNo3')[0],8)&&
 validateMinLength(document.getElementsByName('crNo3')[0],10)&& 
  checkSum())
	valid=true;
else{
	valid=false;  
	//alert("Invalid CR Number");
}
	return valid;

}

///////////////////////////////////Validate cr no with size as argument


function validateCRNoCHECK(size)
{
    var valid=false;
	if(validateMinLength(document.getElementsByName('patCrNo')[0],size) 
		&& validateCheckSumBySize(size))
      {
            valid=true
      //    alert("valid"+valid)
      }
      else
      {     
      alert("InValid CR No");
      if(document.getElementsByName("patCrNo")[0]){
            document.getElementsByName("patCrNo")[0].focus()
      }    
            valid=false
      }
//    alert("valid 123456 "+valid)
      return valid
}

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
///////////////////////////////////////////

function validateCheckSumBySize(size)
{
	var valid=true
// 	alert("validateCheckSumBySize")
	if(size==12)
	{
		valid=checkSumValidation()
	}
	if(size==13)
	{
		valid=checkSum()
	}
	if(size==15)
	{
		valid=checkSum15();
	}
	return valid
}

//////////////////////////////////////////////////////

function toggleBox(szDivID, iState) // 1 visible, 0 hidden
{
    if(document.layers)	   //NN4+
    {
       document.layers[szDivID].visibility = iState ? "show" : "hide";
    }
    else if(document.getElementById)	  //gecko(NN6) + IE 5+
    {
        var obj = document.getElementById(szDivID);
        obj.style.display = iState ? "inline" : "none";
    }
    else if(document.all)	// IE 4
    {
        document.all[szDivID].style.display = iState ? "inline" : "none";
    }
}

//////////////////////////////////////////////////////////////

function validateTextArea(event,obj,maxLength){
//alert("In maxlength");
var valid=true;

if(CheckMaxLength(event,obj,maxLength))
valid=true;
else
valid=false;  

return valid;

}

function validateTextAreaFor(constraint, event,obj,maxLength){
//constraint='A' or 'a' X x 9 ^
var valid=true;

if(CheckMaxLength(event,obj,maxLength)&& validateAlphaNumericOnly(event))
valid=true;
else
valid=false;  

return valid;

}

//////////////////////////////////////////////////////////////////////////////


function compareDateCall(d1,d2,mode,l1,l2){
 //alert("compare called    "+l1 +"      " +l2);
 //alert("return compareDate(d1,d2, mode )"+d1+" "+d2+" "+compareDate(d1,d2, mode))
var valid=true;
if(isEmpty(d1,l1) && isEmpty(d2,l2)){
//alert("inside first if of copmparedate "+compareDate(d1,d2, mode));
 //alert("return compareDate(d1,d2, mode)"+compareDate(d1,d2, mode))
 if(compareDate(d1,d2, mode)){
  // alert("valid Date");
		valid = true;
	//	alert("asasas "+valid)
	}
 else {
	 alert(l1+" can not be greater than "+l2);
	valid = false;
	}
} 

else
valid=false;
//alert("valid    "+valid);
return valid;
}


/////////////////////////////////////  Menu Tab Hide Show

	function changeFrameSize()
	{	
	//	alert("in initpage");
		
			if(parent.document.getElementById("fs2").cols == "0,*")
			{
				parent.document.getElementById("fs2").cols = "230,*";
				parent.document.getElementById("f7").contentDocument.getElementById("Image").src="../hisglobal/images/arrsingle-left.png";
			
			}
			else
			{
				
				parent.document.getElementById("f7").contentDocument.getElementById("Image").src="../hisglobal/images/arrsingle-left.png";
			}
			  
	}	
	
function hideMenuFrame()
{	
	if(window.XMLHttpRequest) // Mozilla
	{
		if(parent.document.getElementById("fs2").cols == "230,*")
		{
			parent.document.getElementById("fs2").cols = "0,*";
			parent.document.getElementById("f7").contentDocument.getElementById("Image").src="../hisglobal/images/arrsingle-right.png";
		}
	}
	//if (window.ActiveXObject)
	else
	{
		if(parent.document.getElementById("fs2").cols == "230,*")
		{
			parent.document.getElementById("fs2").cols = "0,*";
			parent.document.getElementById("f7").Document.getElementById("Image").src="../hisglobal/images/arrsingle-right.png";
		}
	}	
}

function showMenuFrame()
{	
//alert("showMenuFrame in hisglobal");
	if(window.XMLHttpRequest) // Mozilla
	{
		parent.document.getElementById("fs2").cols = "230,*";
	//	parent.document.getElementById("f7").contentDocument.getElementById("Image").src="../hisglobal/images/arrsingle-left.png";
	}
	//if (window.ActiveXObject)
	else
	{
		parent.document.getElementById("fs2").cols = "230,*";
	//	parent.document.getElementById("f7").Document.getElementById("Image").src="../hisglobal/images/arrsingle-left.png";
	}	
}
	
