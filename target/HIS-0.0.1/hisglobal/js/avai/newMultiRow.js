/**
* MultiRow Utility used to create multirows on event
* Created by Pankaj Kumar (CE I) Guided By Ajay Kumar Gupta (SPE) HIS CDAC Noida
* 28-May-2009 Thursday
* Syntax function multiRow(_objTableId, _strArr, _nNoOfRow, _nMinRowMustExist, _fDeleteButtonRequired);
* Parameter Descreption given bellow
* _objTableId = pass here the id of the Table
* _strArr = pass here the Array of Data to be filled coloumn by coloumn
* _nNoOfRow = pass here the number of rows to created every time on event
* _nMinRowMustExist = pass here the minimum number of rows must be in the Table always exist
* _fDeleteButtonRequired = true or false where delete button on every row is required or not
*/
function multiRow(_objTableId, _strArr, _nNoOfRow, _nMinRowMustExist, _fDeleteButtonRequired){
	this.nNoOfRows++;
	var objTableId = document.getElementById(_objTableId);	// object of the table
	var objRows = new Array(_nNoOfRow);	// array of row object to be created
	var strIds = new Array();	//variable to store the id name of element
	var nTmpI;	//temperary variables
	var nTmpJ;	//temperary variables
	var nTmpK=0;	//temperary variables
	var nCurrentRowNo = (objTableId.rows.length-_nNoOfRow)/_nNoOfRow+1; //number of rows has been created

	//Creating the rows in the table
	for(nTmpI=0; nTmpI<_nNoOfRow; nTmpI++)
		objRows[nTmpI] = objTableId .insertRow(-1);

	//creating the coloumn and inserting the data in them
	if(_nNoOfRow>1)
		for(nTmpI=0; nTmpI<_nNoOfRow; nTmpI++)
			for(nTmpJ=0; nTmpJ<_strArr[nTmpI].length; nTmpJ++){
				var objCol = objRows[nTmpI].insertCell(nTmpJ);	// creating the coloumn in row of the table
				// getting the id name from data array
				if(_strArr[nTmpI][nTmpJ].search("#index#")!=-1)
					strIds[nTmpK++] = _strArr[nTmpI][nTmpJ].split("#")[1];
				// inserting the data in cell and replacing the #index# by the index of that element
				objCol.innerHTML=_strArr[nTmpI][nTmpJ].replace("#index#", nCurrentRowNo).replace("#", "");
				// changing the css of cell
				if(nCurrentRowNo%2==0)
					objCol.className="multiControl1";
				else
					objCol.className="multiControl";
			}
	else
		for(nTmpJ=0; nTmpJ<_strArr.length; nTmpJ++){
			var objCol = objRows[0].insertCell(nTmpJ);	// creating the coloumn in row of the table
			// getting the id name from data array
			if(_strArr[nTmpJ].search("#index#")!=-1)
				strIds[nTmpK++] = _strArr[nTmpJ].split("#")[1];
			// inserting the data in cell and replacing the #index# by the index of that element
			objCol.innerHTML=_strArr[nTmpJ].replace("#index#", nCurrentRowNo).replace("#", "");
			// changing the css of cell
			if(nCurrentRowNo%2==0)
				objCol.className="multiControl1";
			else
				objCol.className="multiControl";
		}
	//inserting the Delete Button if flag is true
	if(_fDeleteButtonRequired){
		if(_nNoOfRow>1){
			var objCol = objRows[0].insertCell(_strArr[0].length);
			objCol.innerHTML="<img name='"+_objTableId+"plusForDelete' onkeypress='onPressingEnter(this,event)' tabIndex=1 style='cursor: pointer;' src='/BLDAHIMS/hisglobal/images/minus.gif' title='Delete Row' onclick='deleteRowFromTable(\""+ _objTableId +"\", this, "+ _nNoOfRow +","+_nMinRowMustExist+",\""+strIds+"\")'>";
			if(nCurrentRowNo%2==0)
				objCol.className="multiControl1"
			else
				objCol.className="multiControl"		} else {
			var objCol = objRows[0].insertCell(_strArr.length);
			objCol.innerHTML="<img name='"+_objTableId+"plusForDelete' onkeypress='onPressingEnter(this,event)' tabIndex=1 src='/BLDAHIMS/hisglobal/images/minus.gif' style='cursor: pointer;' title='Delete Row' onclick='deleteRowFromTable(\""+ _objTableId +"\", this, 1,"+_nMinRowMustExist+")'>";
			if(nCurrentRowNo%2==0)
				objCol.className="multiControl1";
			else
				objCol.className="multiControl";
		}
	}
}

/**
* User can use this function on event of any element in the table it
* will return the array index of that element
* Parameter Description given bellow
* _these = pass here the object of the element whose array index is to be find
*/
function getIndex(_these){
	var nTmpI;
	var strSelectedObjName=document.getElementsByName(_these.name)
	for(nTmpI=0;nTmpI<strSelectedObjName.length;nTmpI++)
		if(_these==strSelectedObjName[nTmpI])
			break;
	return nTmpI;
}

/**
* User not required to use this function it is used by the Utility it self
* This function is used to delete any row from the table and
* This function also reindex the id of all the element in the table
* Parameter Descreption given bellow
* _objTableId = pass here the id of the Table
* _these = pass here the object of the minus button element
* _nNoOfRow = pass here the number of rows has been created every time on event
* _nMinRowMustExist = pass here the minimum number of rows must be in the Table always exist
* _strIds= pass here the Array of Ids String
*/
function deleteRowFromTable(_objTableId, _these, _nNoOfRow, _nMinRowMustExist, _strIds){
	var nIndex = 0;
	var strIds;
	var objTableId = document.getElementById(_objTableId);
	var strTmpId="";
	var strTmpCss="";
	if(_these.parentNode)
		nIndex = _these.parentNode.parentNode.rowIndex;
	else{
		nIndex = getIndex(_these);
		nIndex = (nIndex+1)*_nNoOfRow;
	}


	if(_nMinRowMustExist*(_nNoOfRow+1)<objTableId.rows.length){
		//Buffering the CSS of the row To be deleted
		strTmpCss = objTableId.rows[nIndex].cells[0].className;
		//deleting the row
		for(nTmpI=0; nTmpI<_nNoOfRow; nTmpI++)
			objTableId.deleteRow(nIndex);


		//Re-Changing the CSS
		for(var nTmpX=nIndex; nTmpX<objTableId.rows.length; nTmpX+=_nNoOfRow ){
			for(var nTmpY=0; nTmpY<_nNoOfRow; nTmpY++ )
				for(var nTmpZ=0; nTmpZ<objTableId.rows[nTmpX+nTmpY].cells.length; nTmpZ++ ){
					objTableId.rows[nTmpX+nTmpY].cells[nTmpZ].className=strTmpCss;
				}
			if(strTmpCss=="multiControl")
				strTmpCss="multiControl1";
			else
				strTmpCss="multiControl";
		}


		//Re-Indexing of the Id's
		try{
			strIds = _strIds.split(",");
			for(var nTmpI=(nIndex)/_nNoOfRow; nTmpI<=(objTableId.rows.length-_nNoOfRow)/_nNoOfRow; nTmpI++)
				for(var nTmpJ=0; nTmpJ<strIds.length; nTmpJ++){
					strTmpId=strIds[nTmpJ] + (nTmpI+1);
					document.getElementById(strTmpId).id=strIds[nTmpJ] + nTmpI;
				}
		}catch(_Err){
		}
	}
	try{
		userDefFunction();
	}catch(_err){
	}
}

/**
* This function is used to delete the last row from the table and
* Parameter Descreption given bellow
* _nNoOfRow = pass here the number of rows has been created every time on event
* _nMinRowMustExist = pass here the minimum number of rows must be in the Table always exist
* _strIds= pass here the Array of Ids String
*/
function deleteLastRow(_objTableId, _nNoOfRow, _nMinRowMustExist){
	var objTableId = document.getElementById(_objTableId);
	if(objTableId.rows.length>_nNoOfRow)
	if(_nMinRowMustExist*(_nNoOfRow+1)<document.getElementById(_objTableId).rows.length)
		for(var nTmpI=0; nTmpI<_nNoOfRow; nTmpI++)
			objTableId .deleteRow(-1);
}