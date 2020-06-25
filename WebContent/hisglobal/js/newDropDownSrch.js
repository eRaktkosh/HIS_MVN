// ******************************************************************************
// *** Class Definitions

//** Drop Down for New Advanced Search **************************************************
NewDropDownSearch = function(_target, _selData, _type, _onlySelected, _sorted, _targetValue)
{		
	this.elemTarget=null;	// Element for which Drop Down to design
	this.strSearch="";	// String for Filtering
	this.elemData=null;		// Element from which Data to be filter
	this.searchType=NewDropDownSearch.SEARCH_TYPE["ANY_WHERE"];	// Search Type
	this.sorted = false;	// If Data Sorted or not

	this.elemContainer=null;		// Container Element
	this.objDataList=null;			// NDDSDataList Object
	this.objContainer=null;			// NDDSContainer Object

	this.objSelectedDataRow=null;	// NDDSDataRow which have the focus----
	

	// Set Values
	this.elemTarget = _target;
	if(_targetValue && _targetValue!=null)	this.strSearch = _targetValue;
	if(_selData && _selData!=null)			this.elemData = _selData;
	if(_sorted && _sorted!=null)			this.sorted = _sorted;
	
	if(_type && _type!=null && (_type==NewDropDownSearch.SEARCH_TYPE["ANY_WHERE"] 
		|| _type==NewDropDownSearch.SEARCH_TYPE["START"] || _type==NewDropDownSearch.SEARCH_TYPE["END"]) )
		this.searchType = _type;
		
	this.onlySelected = false;
	if(_onlySelected && _onlySelected!=null && typeof _onlySelected == 'boolean')	this.onlySelected = _onlySelected;
	
	this.focusDropDown = false;
};

	// Drop Down Max Size
	NewDropDownSearch.DROP_DOWN_SIZE = 10;
 	
 	//***** Search Types
	NewDropDownSearch.SEARCH_TYPE = {};
		NewDropDownSearch.SEARCH_TYPE["ANY_WHERE"] = 0;
		NewDropDownSearch.SEARCH_TYPE["START"] = 1;
		NewDropDownSearch.SEARCH_TYPE["END"] = 2;


NewDropDownSearch.setup = function(_target, _selData, _type, _onlySelected, _sorted, _targetValue)
{		
	try	
	{
		//alert("Inside Advanced Drop Down Search Setup");
		
		// Validating Target existent
		if(!(_target && _target.tagName.toUpperCase() =="INPUT" && _target.type && _target.type.toUpperCase()=="TEXT"))
		{
			alert("Error : Element Not Found...");
			return;
		}
			
		// Validating Data Element if exists
		if(_selData && !(_selData.tagName.toUpperCase()=="SELECT"))
		{
			alert("Error : Search Data List Not Found...");
			return;
		}
		if(!_selData)	_selData=null;
		if(!_targetValue)	_targetValue=_target.value;

		var objNDDS = _target.obj_Pragyas_NewDropDownSearch;
		if(!objNDDS)
		{
			objNDDS = new NewDropDownSearch(_target, _selData, _type, _onlySelected, _sorted, _targetValue);
			_target.obj_Pragyas_NewDropDownSearch = objNDDS;
			objNDDS.create();
		}
		if(_targetValue!=null && _targetValue!="") objNDDS.search(false);
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

NewDropDownSearch.prototype.create = function()
{
	// NDDS Container Div Element Creation
	var divContainer = null;
	divContainer = PragyaDesigner.createElement("div");
	divContainer.id="Pragyas_NDDS";		
	this.elemContainer = divContainer;
	
	// By Default Hide The Drop Down
	this.hide();
	
	// Create NDDS Data List Object
	this.objDataList = new NDDSDataList(this);
	
	// Create NDDS Container Object
	this.objContainer = new NDDSContainer(this);
	this.objContainer.create(this.elemContainer);
	
	// Adding Events
	PragyaDesigner.addEvent(this.elemTarget, "keyup", NewDropDownSearch.evtTargetKeyUp);
	if(this.elemTarget.onkeypress=="")
		PragyaDesigner.addEvent(this.elemTarget, "keypress", ValidationFunctions.evtValidateAlphaNumOnly);
	PragyaDesigner.addEvent(this.elemTarget, "blur", NewDropDownSearch.evtTargetBlur);
};

NewDropDownSearch.prototype.search = function(flgShow)
{
	this.strSearch = this.elemTarget.value;
	
	this.hide();
	this.clear();
	if(this.strSearch!="")
	{
		if(this.objDataList.setSearch())
		{
			this.objContainer.setSearch();
			this.place();
			if(typeof flgShow == 'undefined' || flgShow)	this.show();
		}
	}
};

NewDropDownSearch.prototype.show = function()
{
	this.elemContainer.style.display = PragyaDesigner.DISPLAY_TYPE["Show"];
};

NewDropDownSearch.prototype.hide = function()
{
	this.elemContainer.style.display = PragyaDesigner.DISPLAY_TYPE["Hide"];
	this.focusDropDown = false;
};

NewDropDownSearch.prototype.isVisible = function()
{
	if(this.elemContainer.style.display == PragyaDesigner.DISPLAY_TYPE["Show"])
		return true;
	else
		return false;
	
};

NewDropDownSearch.prototype.clear = function()
{
	this.focusDropDown = false;
	//this.objDataList.clear();
	this.objContainer.clear();
};

NewDropDownSearch.prototype.allClear = function()
{
	this.focusDropDown = false;
	this.objDataList.clear();
	this.objContainer.clear();
};

NewDropDownSearch.prototype.place = function()
{
	var div=this.elemContainer;
	/*var o=this.elemTarget;
	var l=0,t=0;
	while(o.offsetParent)
	{
		l+=o.offsetLeft;
		t+=o.offsetTop;
		o=o.offsetParent;
	}
	div.style.left=l;
	div.style.top=t+this.elemTarget.offsetHeight;
	div.style.pixelWidth=this.elemTarget.style.pixelWidth;*/

	var pos = PragyaDesigner.getAbsolutePosition(this.elemTarget);
	div.style.left = pos.x;
	div.style.top = pos.y+this.elemTarget.offsetHeight;
	div.style.pixelWidth = this.elemTarget.style.pixelWidth;
};

NewDropDownSearch.prototype.select = function()
{
	if(this.objDataList && this.objDataList.selectedIndex != null)
	{
		if(this.objDataList.dataCount>0)
		{
			this.elemTarget.value = this.objDataList.arrObjDataRows[this.objDataList.selectedIndex].data;
			this.elemTarget.SELECTED_VALUE = this.objDataList.arrObjDataRows[this.objDataList.selectedIndex].value;
		}
	}
	else
	{
		this.elemTarget.SELECTED_VALUE = null;
		if(this.onlySelected)	this.elemTarget.value = "";
		else					this.elemTarget.value = this.strSearch;
		if(this.strSearch!="" && this.objDataList.ifInDataList(this.strSearch))
		{
			this.elemTarget.value = this.objDataList.arrObjDataRows[this.objDataList.selectedIndex].data;
			this.elemTarget.SELECTED_VALUE = this.objDataList.arrObjDataRows[this.objDataList.selectedIndex].value;
		}
	}
	if (typeof this.elemTarget.onchange == "function")
			this.elemTarget.onchange();		
};

NewDropDownSearch.prototype.focusTarget = function()
{
	this.elemTarget.focus();
};

NewDropDownSearch.evtTargetKeyUp = function (evnt)
{
	try
	{	
		var elem = PragyaDesigner.getTargetElement(evnt);
		while(elem.tagName.toUpperCase()!="INPUT")
			elem=elem.parentNode;

		var objNDDS = elem.obj_Pragyas_NewDropDownSearch;
		if(!objNDDS)	return;
		
		if(elem.disabled==true || elem.readOnly==true)
		{
			objNDDS.hide();
			return;
		}

		var charCode;
		charCode=evnt.keyCode;

		switch(charCode)
		{
			case PragyaDesigner.EVENT_KEYCODES["Enter"]:
				// Set Value & Hide
				if(!objNDDS.isVisible())	break;
				if( this.level==-1 && !objNDDS.objDataList.ifInDataList(objNDDS.elemTarget.value))
					if(objNDDS.objDataList.selectedIndex==null && objNDDS.objDataList.dataCount>0)
						objNDDS.objDataList.selectedIndex = 0;
				objNDDS.select();
				objNDDS.hide();
				break;
				
			case PragyaDesigner.EVENT_KEYCODES["Esc"]:
				// Hide
				if(!objNDDS.isVisible())	break;
				objNDDS.hide();
				break;

			case PragyaDesigner.EVENT_KEYCODES["ArrowUp"]:
				// Focus on NDDS
				if(!objNDDS.isVisible())	
				{
					objNDDS.search();
					break;
				}
				objNDDS.focusDropDown = true;
				objNDDS.objContainer.getFocus();
				objNDDS.objContainer.showSelected();		
				break;
				
			case PragyaDesigner.EVENT_KEYCODES["ArrowDown"]:
				// Focus on NDDS
				if(!objNDDS.isVisible())
				{
					objNDDS.search();
					break;
				}
				objNDDS.focusDropDown = true;
				objNDDS.objContainer.getFocus();
				objNDDS.objContainer.showSelected();		
				break;
				
			default :
				objNDDS.search();
		}		 
	}
	catch(e)
	{
		alert("Please Wait for some Time.. Let the data Load Complete");
		//alert("Error Message -> "+e.message);
	}
};

NewDropDownSearch.evtTargetBlur = function (evnt)
{
	try
	{	
		var elem = PragyaDesigner.getTargetElement(evnt);
		while(elem.tagName.toUpperCase()!="INPUT")
			elem=elem.parentNode;

		var objNDDS = elem.obj_Pragyas_NewDropDownSearch;
		if(!objNDDS)	return;

		if(elem.disabled==true || elem.readOnly==true)
		{
			objNDDS.hide();
			return;
		}

		var elemFocus = null;
		if(PragyaDesigner.IS_IE)
			elemFocus = document.activeElement;
		else if(PragyaDesigner.IS_FIREFOX)
			elemFocus = evnt.explicitOriginalTarget;			
		else
		{
			elemFocus = document.activeElement;
			if(elemFocus && elemFocus!=null && elemFocus.tagName 
				&& elemFocus.tagName.toUpperCase()!="OPTION" 
				&& elemFocus.tagName.toUpperCase()!="SELECT" )
			{
				elemFocus = evnt.explicitOriginalTarget;
				if(elemFocus && elemFocus!=null && elemFocus.tagName && elemFocus.tagName.toUpperCase()!="OPTION" && elemFocus.tagName.toUpperCase()!="SELECT")
					elemFocus = null;
			}
		}
			
		if(elemFocus && elemFocus!=null && elemFocus.tagName)
		{
			if(elemFocus.tagName.toUpperCase()=="OPTION")
				while(elemFocus.tagName.toUpperCase()!="SELECT")
					elemFocus=elemFocus.parentNode;
			if(elemFocus==objNDDS.objContainer.elemContainer)
			{
				objNDDS.focusDropDown = true;
			}
		}
		
		if(!objNDDS.focusDropDown)
		{
			objNDDS.select();
			objNDDS.hide();
		}
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};



//************** NDDS Data List
NDDSDataList = function(_NDDS)
{	
	this.objNDDS = _NDDS;
	
	this.level = -1;
	this.dataCount = 0;
	this.selectedIndex = null;
	this.arrObjDataRows = new Array(this.objNDDS.elemData.options.length);
	this.levelledSearched = new Array(100);
	this.levelledSearchedCount = new Array(100);
	this.levelledSearchStr = new Array(100);
};

NDDSDataList.prototype.clear = function()
{
	this.level = -1;
	this.dataCount = 0;
	this.selectedIndex = null;
	//this.arrObjDataRows = new Array(this.objNDDS.elemData.options.length);
	//this.levelledSearched = new Array(100);
};

NDDSDataList.prototype.setSearch = function()
{
	//var tempArrSrchData = new Array(this.objNDDS.elemData.options.length);
		
	// Setting Target Search Set
	var fromLevel = false;
	var targetSearchData = this.objNDDS.elemData;
	if(this.level>0)
	{
		// If new Search is Same
		if(this.levelledSearchStr[this.level-1].toUpperCase()==this.objNDDS.strSearch.toUpperCase())
		{
			//alert("Same");
			this.arrObjDataRows = this.levelledSearched[this.level-1];
			this.dataCount = this.levelledSearchedCount[this.level-1];
			this.selectedIndex = null;
			if(this.dataCount==0)
				return false;
			return true;
		}
			
		// If new search is smaller
		var rePatternStr = new RegExp(this.objNDDS.strSearch, "i");
		if(rePatternStr.test(this.levelledSearchStr[this.level-1]))
		{
			//alert("Inside");
			for(var i=this.level; i>0 ; i--)
			{
				if(this.levelledSearchStr[i-1].toUpperCase()==this.objNDDS.strSearch.toUpperCase())
				{
					this.level = i;
					this.arrObjDataRows = this.levelledSearched[this.level-1];
					this.dataCount = this.levelledSearchedCount[this.level-1];
					this.selectedIndex = null;
					if(this.dataCount==0)
						return false;
					return true;
				}
			}
		}
		
		// If new search is broader
		rePatternStr = new RegExp(this.levelledSearchStr[this.level-1], "i");
		if(rePatternStr.test(this.objNDDS.strSearch))
		{
			//alert("Broader");
			targetSearchData = this.levelledSearched[this.level-1];
			fromLevel = true;
		}
		else
		{
			this.level=0;
		}		
	}
	
	// Setting Search Pattern
	var rePattern = new RegExp(this.objNDDS.strSearch, "i");	
	if(this.objNDDS.searchType==NewDropDownSearch.SEARCH_TYPE["START"])
		rePattern = new RegExp("^"+this.objNDDS.strSearch, "i");
	else if(this.objNDDS.searchType==NewDropDownSearch.SEARCH_TYPE["END"])
		rePattern = new RegExp(this.objNDDS.strSearch+"$", "i");
	
	// Searching Data
	var i=0, k=0;
	if(!fromLevel)
	{
		this.arrObjDataRows = new Array(targetSearchData.options.length);	
		var srhFlag = "N";
		for(i=0;i<targetSearchData.options.length;i++)
		{
			if(rePattern.test(targetSearchData.options[i].text))
			{
				srhFlag = "S";
				var objDataRow = new NDDSDataRow(this,targetSearchData.options[i].text,targetSearchData.options[i].value,k,i);
				this.arrObjDataRows[k++]=objDataRow;
			}
			else if(this.objNDDS.searchType==NewDropDownSearch.SEARCH_TYPE["START"] 
					&& this.objNDDS.sorted==true && srhFlag=="S")
			{
				break;
			}
		}
	}
	else
	{
		this.arrObjDataRows = new Array(this.levelledSearchedCount[this.level-1]);	
		var srhFlag = "N";
		for(i=0;i<this.levelledSearchedCount[this.level-1];i++)
		{
			if(rePattern.test(targetSearchData[i].data))
			{
				srhFlag = "S";
				this.arrObjDataRows[k++]=targetSearchData[i];
			}
			else if(this.objNDDS.searchType==NewDropDownSearch.SEARCH_TYPE["START"] 
					&& this.objNDDS.sorted==true && srhFlag=="S")
			{
				break;
			}
		}
	}
	
	//if(k==0)	return false;	
	//alert(k);
	this.dataCount = k;
	this.selectedIndex = null;
	//alert(this.dataCount);
	if(this.level==-1)	this.level=1;
	else				this.level++;
	//alert(this.level);
	this.levelledSearched[this.level-1] = this.arrObjDataRows;
	//alert(this.levelledSearched[this.level-1]);
	this.levelledSearchedCount[this.level-1] = this.dataCount;
	//alert(this.levelledSearchedCount[this.level-1]);
	this.levelledSearchStr[this.level-1] = this.objNDDS.strSearch;
	//alert(this.levelledSearchStr[this.level-1]);
	//for(i=0; i<k; i++)
		//this.arrObjDataRows[i] = tempArrSrchData[i];
	if(this.dataCount==0)
		return false;
	return true;
};

NDDSDataList.prototype.ifInDataList = function(_data)
{
	var flag = false;
	if(this.dataCount==0)
	{
		this.objNDDS.strSearch = this.objNDDS.elemTarget.value;
		this.setSearch();
	}
	//alert(this.dataCount);

	for(var i=0; i<this.dataCount; i++)
		if(PragyaDesigner.trim(this.arrObjDataRows[i].data.toUpperCase()) == PragyaDesigner.trim(_data.toUpperCase()))
		{
			this.selectedIndex = i;
			flag = true;
			break;
		}
	return flag;
};
//************** NDDS Data Row
NDDSDataRow = function(_objDataList, _data, _val, _idx, _mainIdx)
{
	this.objDataList = _objDataList;
	
	this.data = _data;
	this.value = _val;
	
	this.index = _idx;
	this.mainIndex = _mainIdx;	
};


//************** NDDS Container
NDDSContainer = function(_NDDS)
{
	this.objNDDS = _NDDS;
	//this.objDataList = _NDDS.objDataList;
	
	this.elemContainer = null;
	
	this.elemWindow = null;
	this.elemScroll = null;
	
	this.objWindow = null;
	this.objScroll = null;	
};

NDDSContainer.prototype.create = function(_parent)
{
	var cbo = PragyaDesigner.createElement("select",_parent);
	cbo.className = "cboContainer";
	cbo.size = NewDropDownSearch.DROP_DOWN_SIZE;
	cbo.tabIndex = 1;
	cbo.obj_Pragyas_NewDropDownSearch = this.objNDDS;
	
	// Adding Events
	PragyaDesigner.addEvent(cbo, "keydown", NDDSContainer.evtDropDownKeyDown);
	PragyaDesigner.addEvent(cbo, "change", NDDSContainer.evtDropDownOnChange);
	PragyaDesigner.addEvent(cbo, "dblclick", NDDSContainer.evtDropDownClick);
	PragyaDesigner.addEvent(cbo, "click", NDDSContainer.evtDropDownClick);
	
	this.elemContainer = cbo;
};

NDDSContainer.prototype.clear = function()
{
	this.elemContainer.innerHTML = "";
};

NDDSContainer.prototype.setSearch = function()
{
	if(this.objNDDS.objDataList.dataCount>0)
	{
		for(var i=0; i<this.objNDDS.objDataList.dataCount; i++)
		{
			var option = PragyaDesigner.createElement("option", this.elemContainer);
			option.value = this.objNDDS.objDataList.arrObjDataRows[i].value;
			option.innerHTML = this.objNDDS.objDataList.arrObjDataRows[i].data;
		}
		this.elemContainer.selectedIndex = this.objNDDS.objDataList.selectedIndex;
	}	
};

NDDSContainer.prototype.getFocus = function()
{
	if(this.objNDDS.objDataList.dataCount>0)
		this.elemContainer.focus();
};

NDDSContainer.prototype.showSelected = function()
{
	if(this.objNDDS.objDataList.dataCount>0)
		this.objNDDS.elemTarget.value = this.elemContainer.options[this.elemContainer.selectedIndex].text;
};

NDDSContainer.prototype.setSelected = function()
{
	if(this.objNDDS.objDataList.dataCount>0)
	{
		this.objNDDS.objDataList.selectedIndex = this.elemContainer.selectedIndex;
		this.objNDDS.select();
	}
};

NDDSContainer.evtDropDownKeyDown = function (evnt)
{
	try
	{	
		var elem = PragyaDesigner.getTargetElement(evnt);
		while(elem.tagName.toUpperCase()!="SELECT")
			elem=elem.parentNode;

		var objNDDS = elem.obj_Pragyas_NewDropDownSearch;
		
		if(!objNDDS)	return;
		var charCode;
		charCode=evnt.keyCode;

		switch(charCode)
		{
			case PragyaDesigner.EVENT_KEYCODES["Enter"]:
			case PragyaDesigner.EVENT_KEYCODES["Tab"]:
				objNDDS.objContainer.setSelected();		
				objNDDS.focusTarget();
				objNDDS.hide();
				break;
				
			case PragyaDesigner.EVENT_KEYCODES["Esc"]:
				objNDDS.select();
				objNDDS.focusTarget();
				objNDDS.hide();
				break;
		}		 
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

NDDSContainer.evtDropDownOnChange = function (evnt)
{
	try
	{	
		var elem = PragyaDesigner.getTargetElement(evnt);
		while(elem.tagName.toUpperCase()!="SELECT")
			elem=elem.parentNode;

		var objNDDS = elem.obj_Pragyas_NewDropDownSearch;
		if(!objNDDS)	return;
		objNDDS.objContainer.showSelected();		
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

NDDSContainer.evtDropDownClick = function (evnt)
{
	try
	{	
		var elem = PragyaDesigner.getTargetElement(evnt);
		while(elem.tagName.toUpperCase()!="SELECT")
			elem=elem.parentNode;

		var objNDDS = elem.obj_Pragyas_NewDropDownSearch;
		if(!objNDDS)	return;

		objNDDS.objContainer.setSelected();		
		objNDDS.focusTarget();
		objNDDS.hide();
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

//************** NDDS Window
NDDSWindow = function(_obj)
{
	this.objContainer = _obj;
	
	this.elemContainer = null;
};

NDDSWindow.prototype.create = function(_parent)
{
	var tbl = PragyaDesigner.createElement("table",_parent);
	tbl.className = "tblWindow";
	//tbl.cellpadding="0";
	//tbl.cellspacing="1";
	this.elemContainer = tbl;	
};

//************** NDDS Window Row
NDDSWindowRow = function()
{
	this.objContainer = _obj;
	
	this.elemContainer = null;
};

//************** NDDS Scroll Bar
NDDSScrollBar = function(_obj)
{
	this.objContainer = _obj;
	
	this.elemContainer = null;
};

NDDSScrollBar.prototype.create = function(_parent)
{
	var tbl = PragyaDesigner.createElement("table",_parent);
	tbl.className = "tblScroll";
	//tbl.cellpadding="0";
	//tbl.cellspacing="1";
	this.elemContainer = tbl;	
};

// *** End Class Definitions
//******************************************************************************