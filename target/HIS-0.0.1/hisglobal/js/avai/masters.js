/*

Project			: HIS			

File Name 		: functionality.js

Version	  		: 1.0

Developer 		: HIS Team

*/

/*

Note --> 

1. please name your form as forms[0];

3. Add message in getMsg() function


Warning : NO CHANGE WILL BE REFLECTED IN ORIGINAL VALIDATION FILE WITHOUT AJAY,JITU,LOKESH OR VAIBHAV

PERMISSION	 

*/



/*
List of functions in this file
1> function getmsgStr(index)
2> function submitpage(mode)
3> function add(e)
4> function edit(e)
5> function del(e)
6> function view(event)
7> function cancel(filename)	
8> function checkCounter(obj)
9> function save()
10> function update()		
11> function callEnter(filename)
12> selectAll(chkref)
13> checkBrowser()
14> changeState(layerRef, state)
*/





/*this function will have the user defined messages

1*/

function sequence(e){

//alert(e);
//   if(e.type=="click"||e.keyCode==13)
	//{
	
		submitpage("SEQUENCE");
//	}
}
function rosterSequence(e){
  // if(e.type=="click"||e.keyCode==13)
//	{
		
		submitpage("ROSTERSEQUENCE");
//	}
}

function getmsgStr(index){
	var msgStr = "";	
	switch(index)
	{
		
		case 0:
			msgStr = "Please select record(s) first!";
			break;

		case 1:
			msgStr = "Please select a record first!";
			break;
		case 2:
			msgStr = "Cannot view multiple records at a time(select only one record)!";
			break;
		case 3:	
			msgStr = "Cannot edit multiple records at a time(select only one record)!";
			break;

	}	//end of switch statement
	alert(msgStr);
	return;
}

function submitpage(mode){
	document.forms[0].hmode.value=mode;
	document.forms[0].submit();
}


function sortOnColasc(col)
	{   
		
		//alert(col);    
		document.forms[0].sortOn.value=col;
		document.forms[0].order.value="0";
		document.forms[0].hmode.value='ASC';
		document.forms[0].submit();		
	}
	
	
function displayPage(elmt)
	{   
		//alert("inside display page");	
		//var elmt =document.getElementsByName("pageno");
		page=elmt.selectedIndex		
		//alert(page);    
		document.forms[0].startIndex.value=page*10;
		document.forms[0].hmode.value='PAGINATION';
		document.forms[0].submit();	
	}	
	
function sortOnColdsc(col)
	{   
		
		//alert(col);    
		document.forms[0].sortOn.value=col;
		document.forms[0].order.value="1";
		document.forms[0].hmode.value='DSC';
		document.forms[0].submit();		
	}
function edit(e)
{
 if(e.type=="click"||e.keyCode==13)
	{	
		
		len = document.forms[0].hcounter.value;
		if(len > 0)
		{
		if(len>1)
	    	getmsgStr(3);
	   	else{
	    for(i=0;;i++ )
		{
		  cntrlName="controls"+"["+i+"]";
		 
		  var elmt =document.getElementsByName(cntrlName)[0];
		  //alert("prakhar")
		  //alert(typeof(elmt));
		  if(typeof(elmt)=='undefined')
		       break;
			else
			{			
			 	
			  var selindex= elmt.selectedIndex;
			//  alert(""+selindex);
			  if(selindex=="0")
			  {
			 //  alert("inside");
			    msgStr ="Please select values from combo!";
				alert(msgStr);
				return;									
			  }			  			 			  			  				
			}		
		}
						submitpage("MODIFY");
		}
	}
		else
		getmsgStr(1);

	}	
     
   

}



/*this function submits the page only if the user has selected at least one checkbox

5*/

function del(e)

{

    if(e.type=="click"||e.keyCode==13)
	{

		var len=document.forms[0].hcounter.value;
		var errStr;
		if(len!=0)
		{

			errStr = "You are going to delete " + len + " record(s)\nAre you sure?"
			if(confirm(errStr))
			submitpage("DELETE");

		}
		else
		getmsgStr(0);
	}

}



/*this function submits the page only if the user has selected only one checkbox

6*/

function view(e)
{
	
	 if(e.type=="click"||e.keyCode==13)
	{

		len=document.forms[0].hcounter.value;
		if(len!=0)
		if(len>1)
			getmsgStr(2);
		else

			submitpage("VIEW");

		else

		getmsgStr(1);

	}



}
function report(e)
{
	 if(e.type=="click"||e.keyCode==13)
	{
		submitpage("REPORT");
	}
}



/*this function submits the page after setting action property for th form

7*/

function cancel(filename)

{

	document.forms[0].action = filename;

	document.forms[0].submit();



}

function validateActiveInactive(){
	//alert("inside validateActiveInactive ");
	
	
   		var elmt =document.getElementsByName('txtSearch')[0];
   	if(elmt.value==""||elmt.value==null){
      submitpage('LIST');
   }
   else 
   alert("Clear the search Text");
}


function cancel(filename,e)

{

	

	 if(e.type=="click"||e.keyCode==13)

	{

		document.forms[0].action = filename;

		document.forms[0].submit();

	}



}



/*this function increments or decrements the hcounter field as the user selects

or deselects the check box

 

8*/

function checkCounter(obj)

{
    
 	if(obj.checked)

		document.forms[0].hcounter.value++;

	else

		document.forms[0].hcounter.value--;

		

	document.forms[0].hprimary.value=obj.value;

}



/*

9*/

function save()

{

	submitpage("SAVE");



}



/*

10*/

function update()

{

	submitpage("UPDATE");



}



/*

function for trapping enter key and if it finds, it submits the page

11*/

function callEnter(filename)

{

	if(window.event.keyCode==13)
		//alert(window.event.keyCode);

		cancel(filename);

}





/* function for selecting/deselecting all checkbox which are currently visible

12*/

function selectAll(chkref)

{

	var obj;

	

	if(chkref.checked)

	{

		for(i=0;i<document.forms[0].elements.length;i++)

		{

			obj = document.forms[0].elements[i];

			if(obj.type=="checkbox" && !obj.checked)

			{

				obj.checked=true;

				checkCounter(obj);

			}	

		}

	}

	else
	{

		for(i=0;i<document.forms[0].elements.length;i++)
		{

			obj = document.forms[0].elements[i];
			if(obj.type=="checkbox" && obj.checked)
			{
				obj.checked=false;
				checkCounter(obj);

			}	

		}

	}

		

}	



/*

function that checks the browser. called it on body's onLoad. this function

requires when layer is hided/showed

13*/

function checkBrowser()

{

	if(navigator.userAgent.indexOf("MSIE") != -1)

	{

		layer = ".all";

		style = ".style";

	}

	else if(navigator.userAgent.indexOf("Nav") != -1)

	{

		layer = ".layers" ;

		style = "" ;

	}

}



/*function that hides/shows the layer

14*/ 

function changeState(layerRef, state)

{

	//eval("alert('inside changeState()')")



	eval("document" + layer + "['" + layerRef + "']" + style + ".visibility = '" + state + "'");

}



function openCurPopup()

	{
		var url = "popup.jsp";

		myPopup = window.open(url,'popupWindow','width=500,height=450,scrollbars=yes');

		if (!myPopup.opener)

			 myPopup.opener = self;
	}
	
	
	// Function added by Preeti for Master Template
/*function sort(filename,var1,var2)
{
	document.forms[0].action = filename;
	document.forms[0].var1.value=var1;
	document.forms[0].var2.value=var2;
	document.forms[0].submit();	
}*/
// Function added by Preeti for Master Template
/*function pagination(filename,page_no,var3)
{
	document.forms[0].action = filename;
	document.forms[0].page_no.value=page_no;
	document.forms[0].var3.value=var3;
	document.forms[0].submit();	
}*/

// Function added by Preeti for Master Template
function comboSubmit(filename)
{
	document.forms[0].action = filename;
	document.forms[0].submit();
}


/////validte for search button//////////


function validateSpecialCharacter(e)
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
		(key==9) || (key==13) || (key==27) || (key==32)|| (key==47) || (key==45) || (key==95))
	   return true;
	

	// alphas and numeric
	else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_:/").indexOf(keychar) > -1))
	   return true;
		   
	   else if ((("0123456789").indexOf(keychar) > -1))
	   return true;
	   
	   
	   
	else
	   return false;
}

/*=========================================end of file===============================================*/




