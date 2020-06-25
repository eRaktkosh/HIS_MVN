
// Global Vairables

var gblTxtId = '';
var gblUserFunctionName = '';
var gblUserArgument = '';
var gbldivPart = '';
var gblIndex = '';
var lstIndex = -1;

/**
	Find's the Position of the Cursor and return the same by incrementing top position with 20 px
	
	obj -> parent windows object.
		 
*/
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop+20];
}



/**Display a named menu, at the position of another object
	parent -> parent Window Object
	named -> div Id Value.
*/
function display_menu(parent,named)
{
	//get the named menu
	var menu_element = document.getElementById(named);
	//override the 'display:none;' style attribute
	menu_element.style.display = "block";
	//get the placement of the element that invoked the menu...
	var placement = findPos(parent);
	//...and put the menu there
	menu_element.style.left = placement[0] + "px";
	menu_element.style.top = placement[1] + "px";
}


/** 
Intermediate function for display the List.
	parent -> parent Window Object
	named -> div Id Value.
*/ 
function displayList(parent, divId){
	
	display_menu(parent,divId);
	
}

/** function to hide the List based on its divId
	divId -> div Id Value.
*/
function hideList(divId){
	
	document.getElementById(divId).style.display ="none";
	
}


function showMsg(_msg,_callFunc,_these){
	if(document.getElementById("dropdown1").style.display!="none"){
		alert(_msg);
		return;
	}
}







/** 
function used to find the index position of the List based on the entered input Data.
function also invokes linearSearch function which limits the search and increase the Search speed.

	keyCode ->Key Code 
	txtId -> Text Box Id 
	dataIndex -> unique value maintained for each and every component.
	parent -> parent Window Object.
*/
function searchSelWithCode(keyCode,txtId,dataIndex,parent) { 
	
	var key;
	
	try{
	 
	 
	
if(keyCode == 17 || keyCode == 18){
	
		return false;
	}
 
gblIndex = dataIndex;

var flag = false;


	if(keyCode == 13){
	
		return false;
	}

//alert("level 1");

document.getElementById(gbldivPart).innerHTML = "";
var input= document.getElementById(txtId).value.toLowerCase();  //document.forms[0].realtxt.value.toLowerCase();

//alert("level 2");

//get Div Object
		divId = "dropdown" + dataIndex;
		

	//indexTableObj = eval("listArray"+dataIndex);
	if(document.getElementById("listArray"+dataIndex) != null && input.length > 0){
		
	
	//alert("level 3");
	
		indexTableObj = document.getElementById("listArray"+dataIndex).options;
		
		 	
		listId = "realitems" + dataIndex;
		
		  
	  var output= document.getElementById(listId).options; //document.getElementById('realitems').options; 
	
	//alert("level 4");
		
	// if(input.length == 0){
		 		output.selectedIndex = -1;
		 	//}
		
		
	  
	 // alert("input.length   :: "+input.length);
	  
			if(input.length == 1){
		
		//alert("level 5");
		
			var val = input.toUpperCase().charCodeAt(0)-48;
							
				if(indexTableObj[val].value != -1){
						
				//alert("level 6");		
						
					startIndex = indexTableObj[val].value;
					if(val == 90){
						stopIndex = indexTableObj[val+1].value;
					}else{
						stopIndex = output.length;
					}
			
			//alert("level 7");
						
					//if(indexTableObj[val].value != -1)	
					//output.selectedIndex = indexTableObj[val].value;
						output[parseInt(startIndex)].selected=true; 
				  
					
					flag = true;
					
				}else{
					//document.getElementById(txtId).value = input.substring(0,input.length-1);
					flag = false;
				}	
		
			}else if(input.length > 1){
		
					 
					 //alert("level 8");
					 		
				flag = linearSearch(input,output,txtId,startIndex,stopIndex);
								
			}
	}
 	
		if(! flag){

			document.getElementById(txtId).value = input.substring(0,input.length-1);
		}

//alert("level 9");

// when down arrow key is pressed
if(keyCode == 40 && document.getElementById(divId).style.display!="none"){
	document.getElementById(listId).focus();
	//if(output.selectedIndex != 0 || output.selectedIndex != (output.length -1)){
	if(output.selectedIndex != (output.length -1)){		
	output.selectedIndex = output.selectedIndex + 1;	
	}	
}

//alert("level 10");

// when up arrow key is pressed 
if(keyCode == 38 && document.getElementById(divId).style.display!="none"){

	document.getElementById(listId).focus();
	if(output.selectedIndex != 0){
	output.selectedIndex = output.selectedIndex - 1;
	}
	
}
	
//alert("level 11");	
	
if(input.length == 0 && keyCode == 8){
	hideList(divId);
	return false;
}else if(input.length != 0 && keyCode == 17){
	hideList(divId);
	return false;
}else if(input.length == 0 && keyCode != 40 ){

	hideList(divId);
	return false;
} else {
 	 	
 	 	if(flag ){
 	 	 
		displayList(parent,divId);
		}else{
			return false;
		}
}


//alert("level 12");

var divObj = document.getElementById(gbldivPart);
	if(divObj != null && document.getElementById(divId).style.display!="none"){		
		
		if(output.selectedIndex != '-1')
		 divObj.innerHTML = output[output.selectedIndex].text;
	}
	
	//alert("level 13");
	
}catch(err){ 
	
	//alert("err : "+err );
	
}

} 



/** 
function used to find the index position of the List based on the entered input Data.
function also invokes linearSearch function which limits the search and increase the Search speed.

	e -> Event 
	txtId -> Text Box Id 
	dataIndex -> unique value maintained for each and every component.
	parent -> parent Window Object.
*/
function searchSel(e,txtId,dataIndex,parent) { 
		
	try{
	 
	 
if(e.ctrlKey || e.altKey){
	
		return false;
	}
	 
gblIndex = dataIndex;

var flag = false;


	if(e.keyCode == 13){
	
		return false;
	}

//alert("level 1");

document.getElementById(gbldivPart).innerHTML = "";
var input= document.getElementById(txtId).value.toLowerCase();  //document.forms[0].realtxt.value.toLowerCase();

//alert("level 2");

//get Div Object
		divId = "dropdown" + dataIndex;
		listId = "realitems" + dataIndex;
		
		var output= document.getElementById(listId).options; //document.getElementById('realitems').options; 
		output.selectedIndex = -1;
		
	//indexTableObj = eval("listArray"+dataIndex);
	if(document.getElementById("listArray"+dataIndex) != null && input.length > 0){
		
	
	//alert("ajay");
	//alert("level 3");
	
		indexTableObj = document.getElementById("listArray"+dataIndex).options;
		
		 	
		
	
	//alert("level 4");
		
	// if(input.length == 0){
		 		
		 	//}
		
		
	  
	 // alert("input.length   :: "+input.length);
	  
			if(input.length == 1){
		
		//alert("level 5");
		
			var val = input.toUpperCase().charCodeAt(0)-48;
							
				if(indexTableObj[val].value != -1){
						
				//alert("level 6");		
						
					startIndex = indexTableObj[val].value;
					if(val == 90){
						stopIndex = indexTableObj[val+1].value;
					}else{
						stopIndex = output.length;
					}
			
			//alert("level 7");
						
					//if(indexTableObj[val].value != -1)	
					//output.selectedIndex = indexTableObj[val].value;
						displayList(parent,divId);
						output[parseInt(startIndex)].selected=true; 
						lstIndex = startIndex;
				  
					
					flag = true;
					
				}else{
					//document.getElementById(txtId).value = input.substring(0,input.length-1);
					flag = false;
					lstIndex = -1;
				}	
		
			}else if(input.length > 1){
		
					 
					 //alert("level 8");
					 		
				flag = linearSearch(input,output,txtId,startIndex,stopIndex);
								
				if(flag)
					lstIndex = output.selectedIndex;
				else 
					output[lstIndex].selected=true; 				
								
			}
	}
 	
		if(! flag){

			document.getElementById(txtId).value = input.substring(0,input.length-1);
		}

//alert("level 9");

// when down arrow key is pressed
if(e.keyCode == 40 && document.getElementById(divId).style.display!="none"){
	document.getElementById(listId).focus();
	//if(output.selectedIndex != 0 || output.selectedIndex != (output.length -1)){
	if(output.selectedIndex != (output.length -1)){		
	output.selectedIndex = output.selectedIndex + 1;	
	}	
}

//alert("level 10");

// when up arrow key is pressed 
if(e.keyCode == 38 && document.getElementById(divId).style.display!="none"){

	document.getElementById(listId).focus();
	if(output.selectedIndex != 0){
	output.selectedIndex = output.selectedIndex - 1;
	}
	
}
	
	
//alert("level 12");
var divObj = document.getElementById(gbldivPart);


	if(divObj != null && document.getElementById(divId).style.display!="none" ){		
		
		divObj.innerHTML = "";
		//alert("output.selectedIndex "+output.selectedIndex);
		
		if(output.selectedIndex != '-1'){
		 divObj.innerHTML = output[output.selectedIndex].text;
		}else{
			divObj.innerHTML = "";
		}
	}
	
	
//alert("level 11");	
if(input.length == 0 && e.keyCode == 8){
	hideList(divId);
	return false;
}else if(input.length != 0 && e.ctrlKey){
	hideList(divId);
	return false;
}else if((input.length == 0 && e.keyCode != 40)){

	hideList(divId);
	return false;
} else {
		if(!flag ) return false;
 	 	/*
 	 	if(flag ){
 	 	 
		displayList(parent,divId);
		}else{
			return false;
		}
		* */
}


	
	
	//alert("level 13");
	
}catch(err){ 
	
	//alert("err : "+err );
	
}

} 

/** Normal Search after finding the index position of the first character from the index table.
	
		input ->  Text Box Value. 
		output -> List Box Object.
		txtId -> Text Box Id.
		startIndex -> start Value from the Index Table.
		stopIndex -> End value or next Index Value from the Index Table. 
*/
function linearSearch(input,output,txtId,startIndex,stopIndex){

	var flag = false;

	for(var i=startIndex;i<stopIndex;i++) { 

  		  if(output[i].text.toLowerCase().indexOf(input.toLowerCase())==0){ 
    		
    			 output[i].selected=true; 
				
				flag = true;
				
				break;
				
      	} 
      	
      	
   } 
	return flag;
}

/** 
checks the mouse event. function used for IE and Mozilla compatable mouse event.
	e -> Event.
*/
function checkMouseEvent(e){

	if(e.which == null){


		if(e.button < 2 ) return true;
		
	}else{

		if(e.which < 2 && e.which > 0) return true;
	
	}	

	return false;

}


/**
 Set the User Selected Value from the List to the Required Text Box.
 	
 	listObj -> list Object.
 	e -> Event.
 	divId -> div Id Value.
 */
function setSelectValue(listObj,e,divId){
 

var res = checkMouseEvent(e);

if(e.keyCode == 13 || res ){

	if(document.getElementById(gblTxtId).value != ''){

	document.getElementById(gblTxtId).value = listObj[listObj.selectedIndex].text;

	document.getElementById(divId).style.display ="none";
	
	//listObj[0].selected = true;

	//call user defined function
	if(gblUserFunctionName != "" && gblUserFunctionName.length > 0) {
		if(gblUserArgument != "" && gblUserArgument.length > 0) {		//with user argument
			eval(gblUserFunctionName + "('" + gblUserArgument + "','" + listObj[listObj.selectedIndex].value + "')");
		}
		else {	//without user argument
			eval(gblUserFunctionName + "('" + listObj[listObj.selectedIndex].value + "')");
		}
	}


	//document.getElementById(gblTxtId).focus();

}else{
	
	document.getElementById(gblTxtId).value = listObj[listObj.selectedIndex].text;
	document.getElementById(divId).style.display ="none";
	
//	listObj[0].selected = true;
	
	if(gblUserFunctionName != "" && gblUserFunctionName.length > 0) {
		if(gblUserArgument != "" && gblUserArgument.length > 0) {		//with user argument
			eval(gblUserFunctionName + "('" + gblUserArgument + "','" + listObj[listObj.selectedIndex].value + "')");
		}
		else {	//without user argument
			eval(gblUserFunctionName + "('" + listObj[listObj.selectedIndex].value + "')");
		}
	}


	//document.getElementById(gblTxtId).focus();
}



return false

}
/*
if(e.keyCode == 40){

	document.getElementById(listId).focus();
	if(listObj.selectedIndex != 0 || listObj.selectedIndex != (listObj.length -1)){
		
		alert("setSelectValue :"+listObj.selectedIndex);
		
	listObj.selectedIndex = listObj.selectedIndex + 1;
	
	
	}
}
*/
}



function focusText(_text){
		
	_text.focus();	
}
	
function focusCombo(_list,_divId){
	if(_divId.style.display!="none")
		_list.focus();
}
/*
 * must call on keypress event
 * 
	txtId --> Control Id
	dataIndex --> Index (div and Select --> Both should have same value)
	e --> Event
	userFunction --> JS function that will handled by the developer. JS function should be name without ()
	userDefinedArg1 --> Any Argument if developer wants to pass with function. This parameter can be useful while 
						using multirow functionality to pass delIndex value (identifying the row). It could be
						blank
*/
function setSelectValue1(txtId,dataIndex,e,userFunction,userDefinedArg1){


gblTxtId = txtId;

var temp = userFunction.split('^');

gblUserFunctionName = temp[0];
gblUserArgument = userDefinedArg1;
gbldivPart = temp[1];

count = 0;
 	//get List Object
	var listObj = document.getElementById("realitems" + dataIndex);
//get Div Object
	var divObj = document.getElementById("dropdown" + dataIndex);

if(e.keyCode == 13 ){



	if(document.getElementById(txtId).value != ''){
	
	document.getElementById(txtId).value = listObj[listObj.selectedIndex].text;
	//document.getElementById(hiddenId).value = listobj[listobj.selectedIndex].value;

	divObj.style.display ="none";


	
	//call user defined function
	if(gblUserFunctionName != "" && gblUserFunctionName.length > 0) {
				
		if(userDefinedArg1 != "" && userDefinedArg1.length > 0) {		//with user argument
					
			eval(gblUserFunctionName + "('" + userDefinedArg1 + "','" + listObj[listObj.selectedIndex].value + "')");
		}
		else {	//without user argument
						
			eval(gblUserFunctionName + "('" + listObj[listObj.selectedIndex].value + "')");
		}
	}
	
			
	//	document.getElementById(txtId).focus();

}else{
	
	document.getElementById(gblTxtId).value = listObj[listObj.selectedIndex].text;
	document.getElementById(divId).style.display ="none";
	
	if(gblUserFunctionName != "" && gblUserFunctionName.length > 0) {
		if(gblUserArgument != "" && gblUserArgument.length > 0) {		//with user argument
			eval(gblUserFunctionName + "('" + gblUserArgument + "','" + listObj[listObj.selectedIndex].value + "')");
		}
		else {	//without user argument
			eval(gblUserFunctionName + "('" + listObj[listObj.selectedIndex].value + "')");
		}
	}


	//document.getElementById(gblTxtId).focus();
}


return false

}


if(e.keyCode == 40  && document.getElementById(divId).style.display!="none"){

	listObj.focus();
	if(listObj.selectedIndex != 0 || listObj.selectedIndex != (listObj.length -1)){
			
	listObj.selectedIndex = listObj.selectedIndex + 1;
	
	var divObj = document.getElementById(gbldivPart);
	
	if(divObj != null){
		
		 divObj.innerHTML = listObj[listObj.selectedIndex].text;
		 
	}
		
	
	}
}
}

 

	/**
	 * realitemsOnChangeEventHandler
	 * @param {Object} comboObj 
	 */
	 function realitemsOnChangeEventHandler(comboObj) {
	 	
	var listObj = document.getElementById("realitems" + gblIndex);
		 	
	 var divObj = document.getElementById(gbldivPart);
	if(divObj != null){		
		 
		 divObj.innerHTML = listObj[comboObj.selectedIndex].text;
		  
	}
	 }
	
