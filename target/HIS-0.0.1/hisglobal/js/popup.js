child='';
function xyz(){
opener.populate();
}
function populate(x)
{
//alert("override this function");
}
function callToPopulate(x){
  //  alert("inside call to populate");
   // alert("x.length////"+x.length);
    for(i=0;i<x.length;i++){
   // alert("x..........."+x[i]);
    }
	opener.populate(x);
}

function populateEmpDtl(x){    
	opener.poulateFieldsWithEmpDtl(x);
}

function openPopup(url,eventObj)
{

if(eventObj.type=="click" || eventObj.keyCode==13)
 {
   	child = window.open(url,'popupWindow','status=yes,scrollbars=yes,height=200,width=350,left=10,top=10');  
  	child.moveTo(250,250);
 	child.focus(); 

if(!child.opener)
   child.opener = self;
 }
}

function openPopup(url,eventObj, height, width)
{
if(eventObj.type=="click" || eventObj.keyCode==13)
 {
   	child = window.open(url,'popupWindow','status=yes,scrollbars=yes,height='+height+',width='+width+',left=10,top=10');  
  	child.moveTo(250,250);
 	child.focus(); 

if(!child.opener)
   child.opener = self;
 }
 return child
}

function openPopupWide(id,url,eventObj)
{
//alert("ddddddddddddddddddddddddd");
// alert("inside openPopup"+eventObj);
 if(eventObj.type=="click" || eventObj.keyCode==13)
 {   
  	child = window.open(url+"?empIdChk="+id,'popupWindow','status=yes,scrollbars=yes,height=500,width=750,left=10,top=10,alwaysRaised=true');  
   	child.focus(); 
//  	alert("after openPopup");
if (!child.opener)
   child.opener = self;  	
 } 
}

function openDependentPopup(url,eventObj, height, width,resize)
{
if(eventObj.type=="click" || eventObj.keyCode==13)
 {
   	child = window.open(url,'popupWindow','status=yes,scrollbars=yes,height='+height+',width='+width+',left=10,top=10,dependent=yes,resizable='+resize+'');  
  	child.moveTo(250,250);
 	child.focus(); 

if(!child.opener)
   child.opener = self;
 }
 return child
}
/*
function openPopup()
{
 var url = "newemp.jsp";
 myPopup = window.open(url,'popupWindow','width=400,height=300,scrollbars=yes');
 if (!myPopup.opener)
   myPopup.opener = self;
}*/

function openPopup(url)
{
   	child = window.open(url,'popupWindow','status=yes,scrollbars=yes,height=300,width=600,left=10,top=10');  
  	child.moveTo(300,300);
 	child.focus(); 

if(!child.opener)
   child.opener = self;

}

