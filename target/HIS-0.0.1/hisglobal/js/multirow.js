// to generate unique id for each row..multirow..
var globalUniqueId =new Date().getTime();
	function getUniqueId()
	{
	    var uniqueId = ++globalUniqueId;
	    	//dateObject.getHours()+''+dateObject.getMinutes()+''+dateObject.getSeconds();
	    //alert("unique id is:::"+uniqueId);
	     return uniqueId;
	}

// to delete row from multirow..
	function DeleteRows(rowId)
	{ 			
		var tr1;
	 	tr1=document.getElementById(rowId);
	 	tr1.parentNode.removeChild(tr1);	
	}
	
	

	//to make div table row
function createTableRow(tableId, rowName, rowclass){
	var uniqueId=getUniqueId();
	//alert("tableId :"+tableId+", rowName :"+rowName+", rowclass :"+rowclass);
 	var rId=rowName + uniqueId;
 	 	    	
 	var $div = $("<div>", {id: rId, class: rowclass});
 	$("#"+ tableId).append($div);
 	return rId; 	
}	
//to make div table column
function createTableData(rowId, colClass, strHtml, width){
 	$div = $("<div>", {class: colClass,html:strHtml}) ;
 	$('#'+ rowId).append($div);
 	$div.width(width); 	
}
// sample multirow Function
function createMultirow(){
 	
 	var rId="TR_SHIFT_NEW_";
 	var tableId="tblAppointmentShift";
 	var rowclass="div-table-row listData";
 	var newrowId= createTableRow(tableId,rId,rowclass);    	
 	
 	var str="<input type='hidden' name='weekOfMonth'  value='0' ><select  name='shiftId' style='width:10px;max-width:75px;' id='SHIFTID_"+uniqueId+"' >"+temp+"</select>";
 	createTableData(newrowId,"div-table-col",str,"10%");
 	
 	str="<input type='text' name='startTime' size='4' maxlength='5' style='min-width:4px'  onkeyup='insertColons(this)' id='STARTID_"+uniqueId+"'/>";
 	createTableData(newrowId,"div-table-col",str,"10%");	
 	
 	str="<input type='text' name='endTime' size='4' style='min-width:4px' maxlength='5' style='min-width:4px' onkeyup='insertColons(this)' id='ENDID_"+uniqueId+"'/>";
 	createTableData(newrowId,"div-table-col",str,"10%");
		
 	str="<img src='/HISRegistration/hisglobal/images/Minus.png' onclick=DeleteRows('"+newrowId+"')>";
	createTableData(newrowId,"div-table-col",str,"5%");
}
