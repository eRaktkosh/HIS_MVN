/**
	This multirow.js file has the functions used to provide the multi row functionality
	This multirow.js file has the following function

		addRows 		>>	To add one or more rows
		deleteRow		>>	To delete a row based on index. 
		deleteLastRow	>>	To delete the last row
		destroyMultiRow >>	To destroy the multi row object [please call it 
							before submitting the form]
	
	Note >>						
		1. seperator "-" is used to seperate layer index and rowindex sothat unique key 
			could be generated 					
		2. #delIndex# represents unique value for a control whether more than one multirow
			functionality is used in same form
		3. #rowIndex# represents unique value for a single multirow functionality.
		4. There should be id field in every control and its value will be like 
			id="controlName#delIndex#"		
		
*/


/*
	this function is used to add one or more rows at a time
	ctlNameArray	:	Array of control name [e.g. new Array("control1","control2","control3")]
	ctlType			: 	Array of control type. 
						combo, its type will be "s" 
						text box, textarea,type will be "t"
						date picker,type will be "d"
						check-box,type will be "c"
						[e.g. new Array("t","t","s")]
	
	layerIndex		:	index of div id on the jsp page eg index of id1 will be 1, 
						index of id2 will be 2 
	no_of_rows		:	No of rows means that how many rows that you want to create
	
	mode			:	specify 'I" if it is called from onLoad else 'R'
*/
function addRows(ctlNameArray,ctlType,layerIndex,no_of_rows,mode) {
	var existRowId;
	var addRowId;
	var oldRowId;
	var rowIndexObj;
	var rowLengthObj;
	
	var i = 0;
	var j = 0;
	var k = 0;
	var rowIndex = 0;
	var tempRowIndex = 0;
	var rowLength = 0;
	var ctlLength = 0;
	
	var oldData = "";
	var newData = "";
	var addRowData = "";
		
	var ctlObj = new Array();
	var tempCtlObj = new Array();
	var ctlValue = new Array();
	
	//for date picker
	var dtValue = new Array();
	var dtIndex = 0;
	 
	//intilize
	if(mode.toUpperCase() == "I") 	initilizeValue(layerIndex);
		
	//hidden variable having current row index & total row
	rowIndexObj = document.getElementsByName("rowIndex" + layerIndex);
	rowLengthObj = document.getElementsByName("rowLength" + layerIndex);

	rowIndex = parseInt(rowIndexObj[0].value);
	rowLength = parseInt(rowLengthObj[0].value);
	ctlLength = ctlNameArray.length;
	
	//alert(rowIndex);
	//alert(rowLength);
	tempRowIndex = rowIndex;

	//code for date picker
	for(i=0;i<ctlLength;i++) {
		if(ctlType[i] == "d") {
			dtValue[dtIndex++] = i;
		}
	}
	
	//get control data
	if(rowIndex > 0) {				//at least one row should be exist
		
		/*
		for(i=0;i<ctlLength;i++) {
			ctlObj[i] = document.getElementsByName(ctlNameArray[i]);
		}
		*/
		//store existing control's value into array used to maintain the previous value
		for(i=0;i<rowIndex;i++) {
			
			//new addition [It stores the data for only those controls which are visible]
			oldRowId = document.getElementById("id" + (layerIndex.toString() + "-" + (i+1)));
			if(!(oldRowId == null || ((oldRowId.style.display).toUpperCase() == "NONE") ||
				oldRowId.innerHTML == "")) {
			
				ctlValue[i] = new Array(ctlLength);
				for(j=0;j<ctlLength;j++) {
					//tempCtlObj =  ctlObj[j];
					tempCtlObj = document.getElementById(ctlNameArray[j] + layerIndex.toString() + "-" + (i+1)); 
					
					switch(ctlType[j])
					{
						case "s":		//combo
							ctlValue[i][j] = tempCtlObj.selectedIndex;
							break;
						case "t":		//text box/text area
							ctlValue[i][j] = tempCtlObj.value;
							break;
						case "d":		//date
							ctlValue[i][j] = tempCtlObj.value;
							break;
						case "c":		//check box
							ctlValue[i][j] = tempCtlObj.checked;
							break;			
					}
					/*
					if(ctlType[j] == "s")
						ctlValue[i][j] = tempCtlObj.selectedIndex;
						//ctlValue[i][j] = tempCtlObj[i].selectedIndex;
					else	
						ctlValue[i][j] = tempCtlObj.value;
						//ctlValue[i][j] = tempCtlObj[i].value;
					*/	
				}
			}
		}
	}

	//get layer id	
	existRowId = document.getElementById("id" + layerIndex);
	addRowId = document.getElementById("rowAdded" + layerIndex);

	//add rows
	addRowData = addRowId.innerHTML;
	
	for(i=0;i<no_of_rows;i++) {
		tempRowIndex = parseInt(tempRowIndex) + 1;	
		newData = addRowData;
		//replace rowIndex with sequential index used to identify control
		do {
			oldData = newData;
			newData = oldData.replace("#rowIndex#",tempRowIndex);
		} while(oldData != newData)	
		
		//replace delIndex with layer index used to identify layer
		do {
			oldData = newData;
			newData = oldData.replace("#delIndex#",layerIndex.toString() + "-" + tempRowIndex);
		} while(oldData != newData)	
		
		existRowId.innerHTML += "<div id = 'id" + (layerIndex.toString() + "-" + tempRowIndex) + "'>" + newData + "</div>";
		//alert(existRowId.innerHTML);
	}

	//set value
	if(rowIndex > 0) {				//at least one row should be exist
		for(i=0;i<rowIndex;i++) {
			
			//new addition
			oldRowId = document.getElementById("id" + (layerIndex.toString() + "-" + (i+1)));
			if(!(oldRowId == null || ((oldRowId.style.display).toUpperCase() == "NONE") ||
				oldRowId.innerHTML == "")) {
			
				for(j=0;j<ctlLength;j++) {
					//tempCtlObj =  ctlObj[j];
					tempCtlObj = document.getElementById(ctlNameArray[j] + layerIndex.toString() + "-" + (i+1)); 
					
					switch(ctlType[j])
					{
						case "s":		//combo
							tempCtlObj.selectedIndex = ctlValue[i][j];
							break;
						case "t":		//text box/text area
							tempCtlObj.value = ctlValue[i][j];
							break;
						case "d":		//date
							tempCtlObj.value = ctlValue[i][j];
							break;
						case "c":		//check box
							tempCtlObj.checked = ctlValue[i][j];
							break;			
					}
					/*
					if(ctlType[j] == "s")
						tempCtlObj.selectedIndex = ctlValue[i][j];
						//tempCtlObj[i].selectedIndex = ctlValue[i][j];
					else	
						tempCtlObj.value = ctlValue[i][j];
						//tempCtlObj[i].value = ctlValue[i][j];
					*/	
				}		
			}
		}
	}
	
	//call function for date picker
	if(dtValue.length > 0) 
		initilizeDtPicker(ctlNameArray,dtValue,layerIndex,tempRowIndex);
	
	//update the hidden field value
	rowIndexObj[0].value = tempRowIndex;
	rowLengthObj[0].value = parseInt(rowLength) + parseInt(no_of_rows);
	try{
     	autoTabIndexing();
    }catch(_Err){
     	//alert("Application Error[TabIndex not Included] Please Contact System Administrator");
 	}
 	 try{
     	eventElementObj.focus();
     }catch(_Err){
     }
}

/*
	delete the row based on the rowIndex passed by the developer 
	[user has to pass delIndex]
	layerIndex		:	index of div id on the jsp page eg index of id1 will be 1, 
						index of id2 will be 2 
	minRow --> sytem will not allow to delete row if total row is less than or equal to minRow
*/
function deleteRow(rowIndex,layerIndex,minRow) {
	//system defined variables
	var rowLength = 0;
	var delRowID;
	var rowLengthObj;
	
	rowLengthObj = document.getElementsByName("rowLength" + layerIndex);
	rowLength = parseInt(rowLengthObj[0].value);
	
	//alert(minRow);
	//alert("len = " + rowLength);
	if(rowLength > parseInt(minRow)) {
		delRowID = document.getElementById("id" + rowIndex);
		if(delRowID != null) {
			//hide the layer		
			delRowID.style.display = "NONE";
			//new addition
			delRowID.innerHTML = "";
			
			//update the hidden field value
			rowLengthObj[0].value = parseInt(rowLength) - 1;
		}
	}
}

/*
	delete last row
	layerIndex		:	index of div id on the jsp page eg index of id1 will be 1, 
						index of id2 will be 2 
	minRow --> sytem will not allow to delete row if total row is less than or equal to minRow 
*/
function deleteLastRow(layerIndex,minRow) {
	//system defined variables
	var rowLength = 0;
	var rowIndex = 0;
	var delRowID;
	var rowLengthObj;
	var rowIndexObj;
	
	rowLengthObj = document.getElementsByName("rowLength" + layerIndex);	
	rowLength = parseInt(rowLengthObj[0].value);
	
	if(rowLength > parseInt(minRow)) {
		rowIndexObj = document.getElementsByName("rowIndex" + layerIndex);	
		rowIndex = parseInt(rowIndexObj[0].value);
		delRowID = document.getElementById("id" + layerIndex.toString() + "-" + rowIndex);
		//ie returns blank space with &nbsp;
		while(delRowID == null || ((delRowID.style.display).toUpperCase() == "NONE") ||
			delRowID.innerHTML == "") {
			rowIndex = rowIndex - 1;
			delRowID = document.getElementById("id" + layerIndex.toString() + "-" + rowIndex);
		}
		
		//hide the layer		
		delRowID.style.display = "NONE";
		//new addition
		delRowID.innerHTML = "";
		
		//update the hidden field value
		rowLengthObj[0].value = parseInt(rowLength) - 1;	
	}
}

/*
destroy the multi row object.
layerIndex		:	index of div id on the jsp page eg index of id1 will be 1, 
					index of id2 will be 2 
*/
function destroyMultiRow(layerIndex) {
	var rowId;
	var rowIndex = 0;
	var i = 0;
	var rowIndexObj;
	
	//hidden value
	rowIndexObj = document.getElementsByName("rowIndex" + layerIndex);	
	rowIndex = parseInt(rowIndexObj[0].value);
	for(i=0;i<rowIndex;i++) {
		rowId = document.getElementById("id" + layerIndex.toString() + "-" + (i+1));
		if(rowId == null || ((rowId.style.display).toUpperCase() == "NONE")) 
			rowId.innerHTML = "";
	}
}

//initilize the hidden value & layer inner html
/*
	index		:	index of div id on the jsp page eg index of id1 will be 1, 
					index of id2 will be 2 
*/

function initilizeValue(index)
{
	var rowObj;
	var rowLengthObj;
	var rowId;
	
	rowObj = document.getElementsByName("rowIndex" + index);
	rowLengthObj = document.getElementsByName("rowLength" + index);
	
	rowObj[0].value = 0; 
	rowLengthObj[0].value = 0; 
	
	rowId = document.getElementById("id" + index);
	rowId.innerHTML = "";
}

/*
	This is inetrnal function. It is called in case of date picker
*/
function initilizeDtPicker(ctlNameArr,ctlTypeArr,layerIndex,totRow)
{
	var strVal="";
	var ctlLength = 0;
	var i = 0, j = 0;
	var oldRowId;
	
	ctlLength = ctlTypeArr.length;
	
	for(i=0;i<totRow;i++)
	{
		//new addition [It stores the data for only those controls which are visible]
		oldRowId = document.getElementById("id" + (layerIndex.toString() + "-" + (i+1)));
		if(!(oldRowId == null || ((oldRowId.style.display).toUpperCase() == "NONE") ||
				oldRowId.innerHTML == "")) 
		{
			for(j=0;j<ctlLength;j++)
			{
				strVal = ctlNameArr[ctlTypeArr[j]] + layerIndex + "-" + (i+1);
				Calendar.setup( { inputField : strVal, ifFormat : "%d-%b-%Y", button : strVal + "1", singleClick : true }); 
			}
		}
	}		
}

/*
reset the multirow based on layerindex
layerIndex		:	index of div id on the jsp page eg index of id1 will be 1, 
					index of id2 will be 2 
*/
function resetMultiRow(layerIndex) {
	var rowId;
	var rowIndexObj;
	var rowLengthObj;
	
	//hidden value
	rowIndexObj = document.getElementsByName("rowIndex" + layerIndex);	
	rowLengthObj = document.getElementsByName("rowLength" + layerIndex);	
	
	//initilize with zero
	rowIndexObj.value = "0";
	rowLengthObj.value = "0";
	
	rowId = document.getElementById("id" + layerIndex.toString());
	rowId.innerHTML = "";
}
