/**
 * @copyright CDAC
 * @developer Pragya Sharma
 */

// ******************************************************************************
// *** Class Definitions

// **** Template Designer ************************

	// Template Designer Constructor
TemplateDesigner = function(_container,_targetContainer,_tempType,_templateDesignData,_rowCount,_colCount,_maxRow,_maxCol)	
{
	this.elemContainer=document.getElementById(_container);
	this.elemContainer.id = "TemplateDesigner";
	this.targetContainer=document.getElementsByName(_targetContainer)[0];
	this.tempType=_tempType;
	
	// Setting Initial Row/Col/Max Row/Max Col Counts
	if(_rowCount == null ) _rowCount=5;
	if(_colCount == null ) _colCount=5;
	if(_maxRow==null || _maxCol==null)
	{
		switch(parseInt(_tempType))
		{
			case TemplateDesigner.TEMPLATE_TYPE["Normal"]:
				_maxRow = 99;
				_maxCol = 30;
				break;
			case TemplateDesigner.TEMPLATE_TYPE["Matrix"]:
				_maxRow = 99;
				_maxCol = 30;
				break;
			case TemplateDesigner.TEMPLATE_TYPE["Consent"]:
				_maxRow = 99;
				_maxCol = 20;
				break;
			case TemplateDesigner.TEMPLATE_TYPE["Guideline"]:
				_maxRow = 99;
				_maxCol = 20;
				break;
		}
	}
	if(_rowCount > _maxRow) _rowCount = _maxRow;
	if(_colCount > _maxCol) _colCount = _maxCol;	

	this.maxRowCount = _maxRow;
	this.maxColCount = _maxCol;
	
	if(_templateDesignData != null)	// if template already given then convert it to real Template here
	{		
		this.objTemplate = new Template(this, _rowCount, _colCount, _templateDesignData);
	}
	else
	{
		this.objTemplate = new Template(this, _rowCount, _colCount);
	}
	
	this.objResizer=null;
	this.objDesigner=null;
	this.objBlanker=null;
	
	// Elements
	this.elemTemplate=null;
	this.elemResizer=null;	
	this.elemDesigner=null;	
	this.elemBlanker=null;
};

TemplateDesigner.prototype.start = function()
{
	// Designing Resizer Part
	this.objResizer = new Resizer(this);
	this.objResizer.create(this.elemContainer);
	this.elemResizer = this.objResizer.elemContainer;		

	// Designing Template Part
	this.objTemplate.create(this.elemContainer);
	this.elemTemplate = this.objTemplate.elemContainer;		
	
	// Designing Designer Part
	this.objDesigner = new Designer(this);
	this.objDesigner.create(this.elemContainer);	
	this.elemDesigner = this.objDesigner.elemContainer;		

	// Designing Template Blanker Part
	this.objBlanker = new Blanker(this);
	this.objBlanker.create(this.elemContainer);	
	this.elemBlanker = this.objBlanker.elemContainer;		
};

TemplateDesigner.prototype.reStart = function()
{
	// Empting Template Designer
	this.elemContainer.innerHTML = "";		

	// Designing Resizer Part
	this.elemResizer.innerHTML = "";		
	this.objResizer.create(this.elemContainer);

	// Designing Template Part
	this.elemTemplate.innerHTML = "";		
	this.objTemplate.create(this.elemContainer);
	
	// Designing Designer Part
	this.elemDesigner.innerHTML = "";		
	this.objDesigner.create(this.elemContainer);

	// Designing Template Blanker Part
	this.elemBlanker.innerHTML = "";		
	this.objBlanker.create(this.elemContainer);
};

	// Global Object that holds the TemplateDesigner Object
window.Pragyas_TemplateDesigner = null;

	// Template Designer Setup
TemplateDesigner.setup =function(_container,_targetContainer,_tempType,_templateDesignData,_rowCount,_colCount,_maxRow,_maxCol)
		//	_container - > div element id inside which TemplateDesigner to place recommend "divTemplateDesigner"
{
	try	
	{
		//alert("Inside Template Designer Setup");
		
		// Validating Container existent
		if(!(_container && document.getElementById(_container).tagName=="DIV"))
			if(document.getElementById('divTemplateDesigner'))
			{
				_container = 'divTemplateDesigner';
				this.container=document.getElementById('divTemplateDesigner');
			}
			else
			{
				alert("Error : Container for Template Designer is not defined...");
				return;
			}
			
		// Validating Taraget Container existent
		if(!(_targetContainer && document.getElementsByName(_targetContainer)[0].tagName=="INPUT"))
			if(document.getElementsByName('parameterValuesList')[0])
			{
				_targetContainer = 'parameterValuesList';
				this.targetContainer=document.getElementsByName('parameterValuesList')[0];
			}
			else
			{
				alert("Error : Target Container for Template Vlaues is not defined...");
				return;
			}			
		if(!_tempType || _tempType==null) _tempType=TemplateDesigner.TEMPLATE_TYPE["Normal"];
		if(!_rowCount || _rowCount==null) _rowCount=null;
		if(!_colCount || _colCount==null) _colCount=null;
		if(!_templateDesignData || _templateDesignData==null) _templateDesignData = null;
		if(!_maxRow || _maxRow==null) _maxRow = null;
		if(!_maxCol || _maxCol==null) _maxCol = null;
		
		var templateDesigner = window.Pragyas_TemplateDesigner;
		window.Pragyas_TemplateDesigner = templateDesigner = new TemplateDesigner(_container,_targetContainer,_tempType,_templateDesignData,_rowCount,_colCount,_maxRow,_maxCol);
		templateDesigner.start();
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

TemplateDesigner.getTemplateDesigner = function()
{
	return window.Pragyas_TemplateDesigner;
};

TemplateDesigner.getCurrentCellObject = function()
{
	var _tempDesigner = window.Pragyas_TemplateDesigner;
	var elemCurrentCell = _tempDesigner.objTemplate.elemCurrentCell;
	return Cell.getCellObjectFromElem(elemCurrentCell);
};

TemplateDesigner.getCurrentCellParaObject = function()
{
	var _tempDesigner = window.Pragyas_TemplateDesigner;
	var elemCurrentCell = _tempDesigner.objTemplate.elemCurrentCell;
	return Cell.getParameterObjectFromElem(elemCurrentCell);
};

TemplateDesigner.getTempType = function()
{
	var _tempDesigner = window.Pragyas_TemplateDesigner;
	return _tempDesigner.tempType;
};

TemplateDesigner.prototype.validateTemplateDone = function()
{
	// Applying Last Done Changes...
	if(!this.objTemplate.applyTemplateChanges()) return false;	
	
	// --??-- Check for Label at least parent of one Non-Static Parameter
	
	if(!confirm("<<< Sure to SAVE the Template ? >>>")) return false;
	return true;
};

TemplateDesigner.prototype.getTempParaValues = function()
{	
	var finalVal="";
	var rows=0;
	var cols=0;
	
	for(var i=0;i<this.objTemplate.rowCount;i++)
	{
		for(var j=0;j<this.objTemplate.colCount;j++)
		{
			var objCell = this.objTemplate.cellArray[i][j];			
			if(objCell.isVisible==TemplateDesigner.YES_NO["No"] || objCell.haveParameter==TemplateDesigner.YES_NO["No"] )
				continue;
				
			var objPara = objCell.parameter;
			
			if((i+1)>rows)	rows=i+1;
			if((j+parseInt(objPara.colspan))>cols)	cols=j+parseInt(objPara.colspan);	
			
			
			var temp="";
			// Row, Col
			temp+= objPara.row + TemplateDesigner.SEP_VAL_PARA_FEATURES;
			temp+= objPara.col + TemplateDesigner.SEP_VAL_PARA_FEATURES;
			// Para Id , Para Name, Parent
			temp+= objPara.paraId + TemplateDesigner.SEP_VAL_PARA_FEATURES + objPara.paraName + TemplateDesigner.SEP_VAL_PARA_FEATURES;
			temp+= objPara.paraParent + TemplateDesigner.SEP_VAL_PARA_FEATURES;
			
			// Location Type, Colspan
			temp+= objPara.locationType + TemplateDesigner.SEP_VAL_PARA_FEATURES;
			temp+= objPara.colspan + TemplateDesigner.SEP_VAL_PARA_FEATURES;
			
			// Control Type
			temp+= objPara.controlType + TemplateDesigner.SEP_VAL_PARA_FEATURES;			
			temp+= objPara.displayValue + TemplateDesigner.SEP_VAL_PARA_FEATURES;
			
			// Control Properties
				// bold, i, u, color, maxlen, colsize, rowsize, valfunc, defaultval, re, format, formula, info, align,
				// gendertype, child presenation, child presentation on, presentation, size, font size & language, formulaOutput
				// Set FontSize + Language
				objPara["fontsize"] = objPara["fontsize"] + TemplateDesigner.SEP_IN_FONT_SIZE_LANG + objPara["language"];
			var props="";
				for (var prop in TemplateDesigner.CONTROL_PROPERTIES )
				{
					props+=objPara[prop]+TemplateDesigner.SEP_VAL_IN_PROPS;
				}
				if(props!="") props=props.substr(0,props.length-1);
				temp+=props+TemplateDesigner.SEP_VAL_PARA_FEATURES;
			
			// Source Flag , Static Options, Dynamic Query
			temp+= objPara.sourceFlag + TemplateDesigner.SEP_VAL_PARA_FEATURES;
			temp+= objPara.paraOptions + TemplateDesigner.SEP_VAL_PARA_FEATURES;
			temp+= objPara.tableQuery + TemplateDesigner.SEP_VAL_PARA_FEATURES;

			// Have Dependent And Dependent Para Id
			temp+= objPara.haveDependent + TemplateDesigner.SEP_VAL_PARA_FEATURES;
			temp+= objPara.dependentParaId + TemplateDesigner.SEP_VAL_PARA_FEATURES;

			// Compulsory Flag, Range Flag
			temp+= objPara.isCompulsory + TemplateDesigner.SEP_VAL_PARA_FEATURES;
			temp+= objPara.isRange + TemplateDesigner.SEP_VAL_PARA_FEATURES;

			// Do not append with a null value at the end in concatenation
			finalVal+= temp + TemplateDesigner.SEP_VAL_IN_PARA;
		}
	}
	if(finalVal!="")
		finalVal=finalVal.substr(0,finalVal.length-5);
	// Setting to Target Parameter
	this.targetContainer.value = finalVal;
	document.getElementsByName('rowCount')[0].value = rows;
	document.getElementsByName('colCount')[0].value = cols;
};

// **** End Template Designer ************************


// **** Template ************************
	// Template Constructor
Template = function(_tempDesginer, _rowCount, _colCount, _templateDesignData)
{
	if(_tempDesginer)	this.objTempDesigner=_tempDesginer;
	else	this.objTempDesigner=window.Pragyas_TemplateDesigner;
	
	if(_rowCount)	this.rowCount=parseInt(_rowCount);	else	this.rowCount=0;
	if(_colCount)	this.colCount=parseInt(_colCount);	else	this.colCount=0;
	if(_templateDesignData)	this.getCellArrayFromParaValues(_templateDesignData);
	else	this.createCellArray();
	// cellArray - >Matrix or Array of Arrays of Cells

	this.elemCurrentCell=null;

	this.elemContainer=null;
};

Template.prototype.create = function(_parent)
{
	var divTemplate = TemplateDesigner.createElement("div",_parent);
	divTemplate.id = "divTemplate";	
	
	this.reCreate(divTemplate);
	
	this.elemCurrentCell=null;	
	this.elemContainer=divTemplate;
};

Template.prototype.reCreate = function(divTemplate)
{	
	divTemplate.innerHTML="";
		
	var tbl = TemplateDesigner.createElement("table",divTemplate);
	tbl.width="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="1";

	var thead = TemplateDesigner.createElement("thead",tbl);
		
	for(var i=0; i<this.rowCount; i++)
	{
		var tr = TemplateDesigner.createElement("tr",thead);		
		for(var j=0; j<this.colCount; j++)
		{
			var cell = this.cellArray[i][j];			
			if( cell.isVisible == TemplateDesigner.YES_NO["Yes"])
			{
				cell.create(tr);
			}
		}
	}	
};

Template.prototype.setCellArray = function(_cellArray)
{
	if(typeof _cellArray == "object")
	{
		if(_cellArray.length != this.rowCount)	return;
		var cols=-1;
		if(typeof _cellArray[0] == "object")	cols=_cellArray[0].length;
		for(var i=0; i<_cellArray.length; i++)
		{
			if(typeof _cellArray[i] != "object" || cols!=_cellArray[i].length)
				return;
		}
		if(cols == this.colCount)	this.cellArray=_cellArray;
	}	
};

Template.prototype.getCellArrayFromParaValues = function(_values)
{
	while(_values.search(TemplateDesigner.SEP_VAL_IN_PROPS_FOR_REPLACE)!=-1)
	{
		_values =_values.replace(TemplateDesigner.SEP_VAL_IN_PROPS_FOR_REPLACE,TemplateDesigner.SEP_VAL_IN_PROPS);
	}
	var cellArray = new Array(this.rowCount);
	for(var i=0; i<this.rowCount; i++)
	{
		var subCellArray = new Array(this.colCount);
		for(var j=0; j<this.colCount; j++)
		{
			subCellArray[j] = new Cell(this,i+1,j+1);
		}
		cellArray[i] = subCellArray;
	}		
	var arrParams = _values.split(TemplateDesigner.SEP_VAL_IN_PARA);	
	for(var i=0;i<arrParams.length;i++)
	{
		var arrVals= arrParams[i].split(TemplateDesigner.SEP_VAL_PARA_FEATURES);

		var j=0;
		// Row, Col
		var objPara = new Parameter(arrVals[j++],arrVals[j++]);
		// Para Id , Para Name, Parent
		objPara.paraId = arrVals[j++];
		objPara.paraName = arrVals[j++];
		objPara.paraParent = arrVals[j++];
		// Location Type, Colspan
		objPara.locationType = arrVals[j++];
		objPara.colspan = arrVals[j++];
		// Control Type
		objPara.controlType = arrVals[j++];
		objPara.displayValue = arrVals[j++];
		// Control Properties
			// bold, i, u, color, maxlen, colsize, rowsize, valfunc, defaultval, re, format, formula, info, align, 
			// gendertype, child presenation, child presentation on, presentation, size, font size & language, formulaOutputs
		var props = arrVals[j++].split(TemplateDesigner.SEP_VAL_IN_PROPS);
		var k=0;
		for (var prop in TemplateDesigner.CONTROL_PROPERTIES )
			objPara[prop]=props[k++];
		// Set Fontsize & Language Separately
		var splitted = objPara["fontsize"].split(TemplateDesigner.SEP_IN_FONT_SIZE_LANG);
		objPara["fontsize"]=splitted[0];
		if(splitted.length>1)	objPara["language"]=splitted[1];
		else	objPara["language"]=TemplateDesigner.LANGUAGE["English"];
			
		// Source Flag , Static Options, Dynamic Query
		objPara.sourceFlag = arrVals[j++];
		objPara.paraOptions = arrVals[j++];
		objPara.tableQuery = arrVals[j++];
		// Have Dependent And Dependent Para Id
		objPara.haveDependent = arrVals[j++];
		objPara.dependentParaId = arrVals[j++];

		// Compulsory Flag, Range Flag
		objPara.isCompulsory = arrVals[j++];
		objPara.isRange = arrVals[j++];
		
		cellArray[parseInt(objPara.row)-1][parseInt(objPara.col)-1].parameter = objPara;
		cellArray[parseInt(objPara.row)-1][parseInt(objPara.col)-1].haveParameter=TemplateDesigner.YES_NO["Yes"]
		for(var l=1; l< parseInt(objPara.colspan); l++)
		{
			cellArray[parseInt(objPara.row)-1][parseInt(objPara.col)-1+l].isVisible=TemplateDesigner.YES_NO["No"];
			cellArray[parseInt(objPara.row)-1][parseInt(objPara.col)-1+l].haveParameter=TemplateDesigner.YES_NO["No"];
		}
	}
	// Setting DependentsParaId in Row&Col Format
	for(var i=0; i<this.rowCount; i++)
	{
		for(var j=0; j<this.colCount; j++)
		{
			var objCell = cellArray[i][j];
			if(objCell.isVisible==TemplateDesigner.YES_NO["Yes"] && objCell.haveParameter==TemplateDesigner.YES_NO["Yes"])
			{
				if(objCell.parameter.controlType==TemplateDesigner.CONTROL_TYPES["Formulated"])
				{
					var arrSources = objCell.parameter.dependentParaId.split(TemplateDesigner.SEP_IN_PARA_DEPENDENTS);
					var sourcesIds = "";
					for(var k=0; k<arrSources.length; k++)
					{
						if(arrSources[k]!="")
						{
							var sourceCell = this.getCellByParaId(arrSources[k],cellArray);
							sourcesIds+= sourceCell.row + "&" + sourceCell.col + TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
						}
						else
							sourcesIds+= "" + TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
					}
					if(sourcesIds!="")	sourcesIds = sourcesIds.substr(0,sourcesIds.length-TemplateDesigner.SEP_IN_PARA_DEPENDENTS.length);
					objCell.parameter.dependentParaId = sourcesIds;
				}
				else if(objCell.parameter.controlType==TemplateDesigner.CONTROL_TYPES["TextBox"])
				{
					var arrDependents =  objCell.parameter.dependentParaId.split(TemplateDesigner.SEP_IN_PARA_DEPENDENTS);
					var dependentsIds = "";
					for(var k=0; k<arrDependents.length; k++)
					{
						if(arrDependents[k]!="")
						{
							var dependentCell = this.getCellByParaId(arrDependents[k],cellArray);
							dependentsIds+= dependentCell.row + "&" + dependentCell.col + TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
						}
						else
							dependentsIds+= "" + TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
					}
					if(dependentsIds!="")	dependentsIds = dependentsIds.substr(0,dependentsIds.length-TemplateDesigner.SEP_IN_PARA_DEPENDENTS.length);
					objCell.parameter.dependentParaId = dependentsIds;
				}
			}
		}
	}	
	
	this.setCellArray(cellArray);
};

Template.prototype.createCellArray = function()
{
	var cellArray = new Array(this.rowCount);
	for(var i=0; i<this.rowCount; i++)
	{
		var subCellArray = new Array(this.colCount);
		for(var j=0; j<this.colCount; j++)
		{
			subCellArray[j] = new Cell(this,i+1,j+1);
		}
		cellArray[i] = subCellArray;
	}
	this.cellArray = cellArray;	
};

Template.prototype.isEmptyLastRow = function()
{
	for(var i=0;i<this.colCount;i++)
	{
		if(this.cellArray[this.rowCount-1][i].isVisible==TemplateDesigner.YES_NO["No"])
			return false;
		else if(this.cellArray[this.rowCount-1][i].haveParameter==TemplateDesigner.YES_NO["Yes"])
			return false;
	}
	return true;
};

Template.prototype.isEmptyLastColumn = function()
{
	for(var i=0;i<this.rowCount;i++)
	{
		if(this.cellArray[i][this.colCount-1].isVisible==TemplateDesigner.YES_NO["No"])
			return false;
		else if(this.cellArray[i][this.colCount-1].haveParameter==TemplateDesigner.YES_NO["Yes"])
			return false;
	}
	return true;
};

Template.prototype.applyTemplateChanges = function()
{
	if(this.elemCurrentCell==null) return true;
	
	if(this.objTempDesigner.objDesigner.validate())
	{
		var oldParaObj = Cell.getParameterObjectFromElem(this.elemCurrentCell);
		var paraObj = new Parameter(oldParaObj.row, oldParaObj.col);
		this.objTempDesigner.objDesigner.setParameter(paraObj); // Setting Parameter Here
		
		if(paraObj.locationType == TemplateDesigner.LOCATION_TYPES["Row"])
		{
			paraObj.col=1;
			this.cellArray[paraObj.row-1][0].parameter = paraObj;
		}
		else
			this.cellArray[paraObj.row-1][paraObj.col-1].parameter = paraObj;
		
		if(paraObj.controlType != TemplateDesigner.NO_SELECT)
			this.cellArray[paraObj.row-1][paraObj.col-1].haveParameter=TemplateDesigner.YES_NO["Yes"];
		else
			this.cellArray[paraObj.row-1][paraObj.col-1].haveParameter=TemplateDesigner.YES_NO["No"];
		
		this.adjustTemplateCells(paraObj,oldParaObj);		
		this.reCreate(this.elemContainer);
		
		// Setting Current Cell
		this.elemCurrentCell = this.cellArray[paraObj.row-1][paraObj.col-1].elemContainer;
				
		return true;
	}
	return false;
};

Template.prototype.adjustTemplateCells = function(_paraObj,_oldParaObj)
{
	for(var i=1; i<_oldParaObj.colspan; i++)
	{
		this.cellArray[_oldParaObj.row-1][_paraObj.col-1+i].isVisible=TemplateDesigner.YES_NO["Yes"];
		this.cellArray[_oldParaObj.row-1][_paraObj.col-1+i].haveParameter=TemplateDesigner.YES_NO["No"];
		this.cellArray[_oldParaObj.row-1][_paraObj.col-1+i].parameter.controlType=TemplateDesigner.NO_SELECT;
	}
	for(i=1; i<_paraObj.colspan; i++)
	{
		this.cellArray[_oldParaObj.row-1][_paraObj.col-1+i].isVisible=TemplateDesigner.YES_NO["No"];
		this.cellArray[_oldParaObj.row-1][_paraObj.col-1+i].haveParameter=TemplateDesigner.YES_NO["No"];
		this.cellArray[_oldParaObj.row-1][_paraObj.col-1+i].parameter.controlType=TemplateDesigner.NO_SELECT;
	}
};

Template.prototype.getParentsList = function(r,c)
{
	var arr = new Array(r*c);
	var len=0;
	for(var i=0;i<r;i++)
		for(var j=0;j<c;j++)
			if( !(i==(r-1) && j==(c-1)) )
			{
				var objCell = this.cellArray[i][j];
				if( objCell.isVisible==TemplateDesigner.YES_NO["Yes"] && objCell.haveParameter == TemplateDesigner.YES_NO["Yes"] )
				{
					if(objCell.parameter.controlType == TemplateDesigner.CONTROL_TYPES["Label"])
					{
						arr[len++] = objCell.parameter;
					}
				}
			}
	var list = new Array(len);
	for(var i=0;i<len;i++)
	{
		list[i]=arr[i];
	}
	return list;
};

Template.prototype.getToDependentEligibleList = function()
{
	var r = this.rowCount;
	var c = this.colCount;
	var objCurrentCell = TemplateDesigner.getCurrentCellObject();
	var _r = objCurrentCell.row;
	var _c = objCurrentCell.col;
	
	var arr = new Array(r*c);
	var len=0;
	for(var i=0;i<r;i++)
		for(var j=0;j<c;j++)
			if( !(i==(_r-1) && j==(_c-1)) )
			{
				var objCell = this.cellArray[i][j];
				if( objCell.isVisible==TemplateDesigner.YES_NO["Yes"] && objCell.haveParameter == TemplateDesigner.YES_NO["Yes"] )
				{
					if(objCell.parameter.controlType == TemplateDesigner.CONTROL_TYPES["TextBox"])// && ValidationFunctionControl.isNumericValue(objCell.parameter.validationFunction))
					{
						arr[len++] = objCell.parameter;
					}
				}
			}
	var list = new Array(len);
	for(var i=0;i<len;i++)
	{
		list[i]=arr[i];
	}	
	return list;
};

Template.prototype.getCellByParaId = function(_paraId, _cellArray)
{
	var r = this.rowCount;
	var c = this.colCount;
	var cellArray = this.cellArray;
	if(_cellArray)	cellArray = _cellArray;
	for(var i=0; i<r; i++)
		for(var j=0; j<c; j++)
		{
			var objCell = cellArray[i][j];
			if( objCell.isVisible==TemplateDesigner.YES_NO["Yes"] 
				&& objCell.haveParameter == TemplateDesigner.YES_NO["Yes"] 
				&& objCell.parameter.controlType != TemplateDesigner.CONTROL_TYPES["Label"])
			{
				if(objCell.parameter.paraId!="" && objCell.parameter.paraId==_paraId)
					return objCell;
			}
		}
	return null;
};

Template.prototype.isParaNameUsed = function(name,parent,r,c)
{
	for(var i=0;i<this.rowCount;i++)
		for(var j=0;j<this.colCount;j++)
			if( !(i==(r-1) && j==(c-1)) )
			{
				var objCell = this.cellArray[i][j];
				if(objCell.isVisible==TemplateDesigner.YES_NO["Yes"] && objCell.haveParameter == TemplateDesigner.YES_NO["Yes"] && objCell.parameter.controlType != TemplateDesigner.CONTROL_TYPES["Label"])
				{
					if(name.toUpperCase()==objCell.parameter.paraName.toUpperCase() && parent.toUpperCase()== objCell.parameter.paraParent.toUpperCase() )
						return objCell;
				}
			}
	return null;
};

Template.prototype.getSpecifiedCellPara = function(r,c)
{
	if(r>0 && r<=this.rowCount && c>0 && c<=this.colCount)
	{
		var objCell = this.cellArray[r-1][c-1];
		if(!(objCell.isVisible==TemplateDesigner.YES_NO["No"] || objCell.haveParameter == TemplateDesigner.YES_NO["No"]) )
			return objCell.parameter;
	}
	return null;
};

Template.prototype.getSpecifiedCell = function(r,c)
{
	if(r>0 && r<=this.rowCount && c>0 && c<=this.colCount)
		return this.cellArray[r-1][c-1];
	return null;
};

Template.prototype.getVisibleCell = function(r,c)
{
	var objCell = this.getSpecifiedCell(r,c);
	while(objCell.isVisible!=TemplateDesigner.YES_NO["Yes"])
	{
		objCell = this.getSpecifiedCell(r,--c);
	}
	return objCell;
};

Template.prototype.canRowSpan = function(r,c)
{
	for(var i=0;i<this.colCount;i++)
	if( i!=(c-1))
	{
		var objCell = this.cellArray[r-1][i];
		if(objCell.isVisible==TemplateDesigner.YES_NO["Yes"] && objCell.haveParameter == TemplateDesigner.YES_NO["Yes"] )
			return false;
	}
	return true;
};

Template.prototype.canSpan = function(r,c,span)
{
	for(var i=1;i<span;i++)
	{
		var objCell = this.cellArray[r-1][c-1+i];
		if(objCell.isVisible==TemplateDesigner.YES_NO["Yes"] && objCell.haveParameter == TemplateDesigner.YES_NO["Yes"] )
			return false;
	}
	return true;
};

Template.prototype.AddRow = function()
{
	var newCellArray = new Array(this.rowCount+1);
	for(var i=0; i<this.rowCount; i++)	
		newCellArray[i] = this.cellArray[i];
	
	var subCellArray = new Array(this.colCount);
	for(var j=0; j<this.colCount; j++)
	{
		subCellArray[j] = new Cell(this,i+1,j+1);
	}
	newCellArray[i] = subCellArray;
	
	this.rowCount++;
	this.cellArray = newCellArray;
	// Restart Template Designer
	this.objTempDesigner.reStart();
};

Template.prototype.RemoveRow = function()
{
	var newCellArray = new Array(this.rowCount-1);
	for(var i=0; i<this.rowCount-1; i++)	
		newCellArray[i] = this.cellArray[i];
	
	this.rowCount--;
	this.cellArray = newCellArray;
	// Restart Template Designer
	this.objTempDesigner.reStart();
};

Template.prototype.AddColumn = function()
{
	var newCellArray = new Array(this.rowCount);
	for(var i=0; i<this.rowCount; i++)
	{
		var oldRowArray = this.cellArray[i];
		var newRowArray = new Array(this.colCount+1);
		for(var j=0; j<this.colCount; j++)
			newRowArray[j]= oldRowArray[j];
		newRowArray[j] = new Cell(this,i+1,j+1);
		newCellArray[i] = newRowArray;
	}
	this.colCount++;
	this.cellArray = newCellArray;
	// Restart Template Designer
	this.objTempDesigner.reStart();
};

Template.prototype.RemoveColumn = function()
{
	var newCellArray = new Array(this.rowCount);
	for(var i=0; i<this.rowCount; i++)
	{
		var oldRowArray = this.cellArray[i];
		var newRowArray = new Array(this.colCount-1);
		for(var j=0; j<this.colCount-1; j++)
			newRowArray[j]= oldRowArray[j];
		newCellArray[i] = newRowArray;
	}
	this.colCount--;
	this.cellArray = newCellArray;
	// Restart Template Designer
	this.objTempDesigner.reStart();
};

// **** End Template ************************



// **** Template Resizer ************************
	// Resizer Constructor
Resizer = function(_tempDesginer)
{
	if(_tempDesginer)	this.objTempDesigner=_tempDesginer;
	else	this.objTempDesigner=window.Pragyas_TemplateDesigner;

	this.elemContainer=null;
};

Resizer.prototype.create = function(_parent)
{
	var divResizer = TemplateDesigner.createElement("div",_parent);
	divResizer.id = "divResizer";
	
	var tbl = TemplateDesigner.createElement("table",divResizer);
	tbl.width="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="1";
	tbl.className="tdfonthead";
	
	var thead = TemplateDesigner.createElement("thead",tbl);
		
	var tr = TemplateDesigner.createElement("tr",thead);		
	var td = TemplateDesigner.createElement("td",tr);
	td.align = "left";
	td.width = "50%";
	
	var img = TemplateDesigner.createElement("img",td);
	img.src = "/HIS/hisglobal/images/Pl_Green_Sqr.png";
	img.title = "Add Row At Last";
	TemplateDesigner.addEvent(img, "click", Resizer.evtAddRow);

	var p = TemplateDesigner.createElement("b",td);
	p.innerHTML = "&nbsp;&nbsp;";

	img = TemplateDesigner.createElement("img",td);
	img.src = "/HIS/hisglobal/images/Mi_Green_Sqr.png";
	img.title = "Remove Last Row";
	TemplateDesigner.addEvent(img, "click", Resizer.evtRemoveRow);


	td = TemplateDesigner.createElement("td",tr);
	td.align = "right";
	td.width = "50%";

	img = TemplateDesigner.createElement("img",td);
	img.src = "/HIS/hisglobal/images/Pl_Green_Sqr.png";
	img.title = "Add Column At Last";
	TemplateDesigner.addEvent(img, "click", Resizer.evtAddColumn);

	var p = TemplateDesigner.createElement("b",td);
	p.innerHTML = "&nbsp;&nbsp;";

	img = TemplateDesigner.createElement("img",td);
	img.src = "/HIS/hisglobal/images/Mi_Green_Sqr.png";
	img.title = "Remove Last Column";
	TemplateDesigner.addEvent(img, "click", Resizer.evtRemoveColumn);

	this.elemContainer=divResizer;
};

Resizer.evtAddRow = function(evnt)
{
	try
	{
		var templateDesigner = TemplateDesigner.getTemplateDesigner();
		if(templateDesigner.objTemplate.applyTemplateChanges())
		{
			if(templateDesigner.objTemplate.rowCount < templateDesigner.maxRowCount)
				templateDesigner.objTemplate.AddRow();
			else
				alert("Rows can't be more than Maximum Limit of "+templateDesigner.maxRowCount);
		}
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

Resizer.evtRemoveRow = function(evnt)
{
	try
	{
		var templateDesigner = TemplateDesigner.getTemplateDesigner();
		if(templateDesigner.objTemplate.applyTemplateChanges())
		{
			if(templateDesigner.objTemplate.rowCount>1)
			{
			 	if(templateDesigner.objTemplate.isEmptyLastRow())
					templateDesigner.objTemplate.RemoveRow();
				else
					alert("Last Row contains Element.. First empty it..");
			}
			else
				alert("At least one Row is required..");
		}
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

Resizer.evtAddColumn = function(evnt)
{
	try
	{
		var templateDesigner = TemplateDesigner.getTemplateDesigner();
		if(templateDesigner.objTemplate.applyTemplateChanges())
		{
			if(templateDesigner.objTemplate.colCount < templateDesigner.maxColCount)
				templateDesigner.objTemplate.AddColumn();
			else
				alert("Columns can't be more than Maximum Limit of "+templateDesigner.maxColCount);
		}
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

Resizer.evtRemoveColumn = function(evnt)
{
	try
	{
		var templateDesigner = TemplateDesigner.getTemplateDesigner();
		if(templateDesigner.objTemplate.applyTemplateChanges())
		{
			if(templateDesigner.objTemplate.colCount > 1)
			{
				if(templateDesigner.objTemplate.isEmptyLastColumn())
					templateDesigner.objTemplate.RemoveColumn();
				else
					alert("Last Column contains Element.. First empty it..");
			}
			else
				alert("At least one Column is required..");
		}
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

// **** End Resizer ************************


// **** Designer ************************
	// Designer Constructor
Designer = function(_tempDesginer)
{
	if(_tempDesginer)	this.objTempDesigner=_tempDesginer;
	else	this.objTempDesigner=window.Pragyas_TemplateDesigner;

	this.elemContainer=null;
	
	// Parameter Setter
	this.objParameterSetter = null;
	this.elemParameterSetter = null;
	
	// Parent Setter	
	this.objParentSetter = null;
	this.elemParentSetter = null;
	
	// Control Setter
	this.objControlSetter = null;
	this.elemControlSetter = null;

	// Template Setter
	this.objTemplateSetter = null;
	this.elemTemplateSetter = null;
};

Designer.prototype.create = function(_parent)
{
	var divDesigner = TemplateDesigner.createElement("div",_parent);
	divDesigner.id = "divDesigner";
	this.elemContainer=divDesigner;
	
	var tbl = TemplateDesigner.createElement("table",divDesigner);
	tbl.width="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="1";
	var thead = TemplateDesigner.createElement("thead",tbl);
	
	var tr = TemplateDesigner.createElement("tr",thead);		
	var td = TemplateDesigner.createElement("td",tr);
	td.id = "elemParameterSetter";
	td.align = "center";
	td.width = "100%";	
	// Setting Parameter Setter
	this.objParameterSetter = new ParameterSetter(this.objTempDesigner.tempType);
	this.elemParameterSetter = td;
	this.objParameterSetter.create(td);
	
	tr = TemplateDesigner.createElement("tr",thead);		
	td = TemplateDesigner.createElement("td",tr);
	td.id = "elemParentSetter";
	td.align = "center";
	td.width = "100%";
	// Setting Parent Setter	
	this.objParentSetter = new ParentSetter(this.objTempDesigner.tempType);
	this.elemParentSetter = td;
	this.objParentSetter.create(td);
	
	tr = TemplateDesigner.createElement("tr",thead);		
	td = TemplateDesigner.createElement("td",tr);
	td.id = "elemControlSetter";
	td.align = "center";
	td.width = "100%";
	// Setting Control Setter
	this.objControlSetter = new ControlSetter(this.objTempDesigner.tempType);
	this.elemControlSetter = td;
	this.objControlSetter.create(td);

	tr = TemplateDesigner.createElement("tr",thead);		
	td = TemplateDesigner.createElement("td",tr);
	td.id = "elemTemplateSetter";
	td.align = "center";
	td.width = "100%";
	// Setting Template Setter
	this.objTemplateSetter = new TemplateSetter(this.objTempDesigner.tempType);
	this.elemTemplateSetter = td;
	this.objTemplateSetter.create(td);
};

Designer.prototype.activate = function(_objCell)
{
	var objPara = _objCell.parameter;
	this.objParameterSetter.activate(objPara);
	this.objParentSetter.activate(objPara);
	this.objControlSetter.activate(objPara);
	this.objTemplateSetter.activate(objPara);
};

Designer.prototype.setParameter = function(_objPara)
{
	this.objParameterSetter.getValue(_objPara);
	this.objParentSetter.getValue(_objPara);
	this.objControlSetter.getValue(_objPara);
};

Designer.prototype.validate = function()
{	
	if(!this.objParameterSetter.validate()) return false;
	if(!this.objParentSetter.validate()) return false;
	if(!this.objControlSetter.validate()) return false;
	return true;
};

// **** End Designer ************************

// **** Cell ************************
	// Cell Constructor
Cell = function(_template,_row,_col)
{
	this.objTemplate = _template;
	this.row=parseInt(_row);
	this.col=parseInt(_col);
		
	this.isVisible=TemplateDesigner.YES_NO["Yes"];
	this.haveParameter=TemplateDesigner.YES_NO["No"];
	this.parameter=new Parameter(this.row, this.col);	// -- Is that useful at this time

	this.elemContainer=null;
};

Cell.prototype.create = function(_parent)
{
	if( this.isVisible==TemplateDesigner.YES_NO["Yes"] )
	{
		if(this.haveParameter==TemplateDesigner.YES_NO["No"])
			this.elemContainer = this.createEmptyCell(_parent);
		else if(this.parameter && this.parameter!=null)
			this.elemContainer = this.createParaTempWise(_parent);
	}
	else
	{
		this.elemContainer=null;
		this.parameter=null;
	}
};

Cell.prototype.createEmptyCell =  function(_parent)
{
	var mainTd = TemplateDesigner.createElement("td",_parent);
	mainTd.align = "center";
	mainTd.width = (100/parseInt(this.objTemplate.colCount))+"%";
	var tbl = TemplateDesigner.createElement("table",mainTd);
	tbl.width="100%";
	tbl.height="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	tbl.className="cellInActive";
	tbl.setAttribute("row",this.row);
	tbl.setAttribute("col",this.col);		 
	TemplateDesigner.addEvent(tbl, "click", Cell.evtCellOnFocus);

	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);
	var td = TemplateDesigner.createElement("td",tr);
	td.id="tdTemplate@"+this.row+"&"+this.col;
	td.align="center";	
	td.innerHTML="Click Here";
	return tbl;
};

Cell.prototype.createParaTempWise =  function(_parent)
{
	var tbl;
	switch(TemplateDesigner.getTempType())
	{
		case TemplateDesigner.TEMPLATE_TYPE["Normal"]:
			switch(parseInt(this.parameter.controlType))
			{
				case  TemplateDesigner.CONTROL_TYPES["Label"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createLabel(td, this.parameter);
					break;
				case  TemplateDesigner.CONTROL_TYPES["Comment"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createComment(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["TextBox"]:
					var td = TemplateDesigner.createElement("td",_parent);
					var al = this.parameter.align;
					this.parameter.align = TemplateDesigner.ALIGN["Right"];
					this.parameter.colspan = 1;
					tbl=this.createLabel(td, this.parameter);					
					td = TemplateDesigner.createElement("td",_parent);
					this.parameter.align = TemplateDesigner.ALIGN["Left"];
					this.createTextBox(td, this.parameter);
					this.parameter.align = al;
					this.parameter.colspan = 2;
					break;
				case TemplateDesigner.CONTROL_TYPES["TextArea"]:
					var td = TemplateDesigner.createElement("td",_parent);
					var al = this.parameter.align;
					this.parameter.align = TemplateDesigner.ALIGN["Right"];
					this.parameter.colspan = 1;
					tbl=this.createLabel(td, this.parameter);
					td = TemplateDesigner.createElement("td",_parent);
					this.parameter.align = TemplateDesigner.ALIGN["Left"];
					this.createTextArea(td, this.parameter);
					this.parameter.align = al;
					this.parameter.colspan = 2;
					break;
				case TemplateDesigner.CONTROL_TYPES["Combo"]:
					var td = TemplateDesigner.createElement("td",_parent);
					var al = this.parameter.align;
					this.parameter.align = TemplateDesigner.ALIGN["Right"];
					this.parameter.colspan = 1;
					tbl=this.createLabel(td, this.parameter);
					td = TemplateDesigner.createElement("td",_parent);
					this.parameter.align = TemplateDesigner.ALIGN["Left"];
					this.createCombo(td, this.parameter);
					this.parameter.colspan = 2;
					this.parameter.align = al;
					break;
				case TemplateDesigner.CONTROL_TYPES["Radio"]:
					var td = TemplateDesigner.createElement("td",_parent);
					var al = this.parameter.align;
					this.parameter.align = TemplateDesigner.ALIGN["Right"];
					this.parameter.colspan = 1;
					tbl=this.createLabel(td, this.parameter);
					td = TemplateDesigner.createElement("td",_parent);
					this.parameter.align = TemplateDesigner.ALIGN["Left"];
					this.createRadio(td, this.parameter);
					this.parameter.colspan = 2;
					this.parameter.align = al;
					break;
				case TemplateDesigner.CONTROL_TYPES["YesNo"]:
					var td = TemplateDesigner.createElement("td",_parent);
					var al = this.parameter.align;
					this.parameter.align = TemplateDesigner.ALIGN["Right"];
					this.parameter.colspan = 1;
					tbl=this.createLabel(td, this.parameter);
					td = TemplateDesigner.createElement("td",_parent);
					this.parameter.align = TemplateDesigner.ALIGN["Left"];
					this.createYesNo(td, this.parameter);
					this.parameter.colspan = 2;
					this.parameter.align = al;
					break;
				case TemplateDesigner.CONTROL_TYPES["CheckBox"]:
					var td = TemplateDesigner.createElement("td",_parent);
					var al = this.parameter.align;
					this.parameter.align = TemplateDesigner.ALIGN["Right"];
					this.parameter.colspan = 1;
					tbl=this.createLabel(td, this.parameter);
					td = TemplateDesigner.createElement("td",_parent);
					this.parameter.align = TemplateDesigner.ALIGN["Left"];
					this.createCheckBox(td, this.parameter);
					this.parameter.colspan = 2;
					this.parameter.align = al;
					break;
				case TemplateDesigner.CONTROL_TYPES["Formulated"]:
					var td = TemplateDesigner.createElement("td",_parent);
					var al = this.parameter.align;
					this.parameter.align = TemplateDesigner.ALIGN["Right"];
					this.parameter.colspan = 1;
					tbl=this.createLabel(td, this.parameter);
					td = TemplateDesigner.createElement("td",_parent);
					this.parameter.align = TemplateDesigner.ALIGN["Left"];
					this.createFormulated(td, this.parameter);
					this.parameter.colspan = 2;
					this.parameter.align = al;
					break;
				case TemplateDesigner.CONTROL_TYPES["Information"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createInformation(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["Duration"]:
					var td = TemplateDesigner.createElement("td",_parent);
					var al = this.parameter.align;
					this.parameter.align = TemplateDesigner.ALIGN["Right"];
					this.parameter.colspan = 1;
					tbl=this.createLabel(td, this.parameter);
					td = TemplateDesigner.createElement("td",_parent);
					this.parameter.align = TemplateDesigner.ALIGN["Left"];
					this.createDuration(td, this.parameter);
					this.parameter.colspan = 2;
					this.parameter.align = al;
					break;
				case TemplateDesigner.CONTROL_TYPES["Date"]:
					var td = TemplateDesigner.createElement("td",_parent);
					var al = this.parameter.align;
					this.parameter.align = TemplateDesigner.ALIGN["Right"];
					this.parameter.colspan = 1;
					tbl=this.createLabel(td, this.parameter);
					td = TemplateDesigner.createElement("td",_parent);
					this.parameter.align = TemplateDesigner.ALIGN["Left"];
					this.createDate(td, this.parameter);
					this.parameter.colspan = 2;
					this.parameter.align = al;
					break;
				case TemplateDesigner.CONTROL_TYPES["Time"]:
					var td = TemplateDesigner.createElement("td",_parent);
					var al = this.parameter.align;
					this.parameter.align = TemplateDesigner.ALIGN["Right"];
					this.parameter.colspan = 1;
					tbl=this.createLabel(td, this.parameter);
					td = TemplateDesigner.createElement("td",_parent);
					this.parameter.align = TemplateDesigner.ALIGN["Left"];
					this.createTime(td, this.parameter);
					this.parameter.colspan = 2;
					this.parameter.align = al;
					break;
				case TemplateDesigner.CONTROL_TYPES["ImageView"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createImageView(td, this.parameter);
					break;
			}		
			break;
			
		case TemplateDesigner.TEMPLATE_TYPE["Matrix"]:
			switch(parseInt(this.parameter.controlType))
			{
				case TemplateDesigner.CONTROL_TYPES["Label"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createLabel(td, this.parameter);
					break;
				case  TemplateDesigner.CONTROL_TYPES["Comment"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createComment(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["TextBox"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createTextBox(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["TextArea"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createTextArea(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["Combo"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createCombo(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["Radio"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createRadio(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["YesNo"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createYesNo(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["CheckBox"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createCheckBox(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["Formulated"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createFormulated(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["Information"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createInformation(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["Duration"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createDuration(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["Date"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createDate(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["Time"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createTime(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["ImageView"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createImageView(td, this.parameter);
					break;
			}		
			break;
			
		case TemplateDesigner.TEMPLATE_TYPE["Consent"]:
			switch(parseInt(this.parameter.controlType))
			{
				case TemplateDesigner.CONTROL_TYPES["Label"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createLabel(td, this.parameter);
					break;
				case  TemplateDesigner.CONTROL_TYPES["Comment"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createComment(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["TextBox"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createTextBox(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["TextArea"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createTextArea(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["Combo"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createCombo(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["Radio"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createRadio(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["YesNo"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createYesNo(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["CheckBox"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createCheckBox(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["Formulated"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createFormulated(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["Information"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createInformation(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["Duration"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createDuration(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["Date"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createDate(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["Time"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createTime(td, this.parameter);
					break;
				case TemplateDesigner.CONTROL_TYPES["ImageView"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createImageView(td, this.parameter);
					break;
			}
			break;
			
		case TemplateDesigner.TEMPLATE_TYPE["Guideline"]:
			switch(parseInt(this.parameter.controlType))
			{
				case  TemplateDesigner.CONTROL_TYPES["Comment"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createComment(td, this.parameter);
					break;
				case  TemplateDesigner.CONTROL_TYPES["ImageView"]:
					var td = TemplateDesigner.createElement("td",_parent);
					tbl=this.createImageView(td, this.parameter);
					break;
			}		
			break;		
	}
	return tbl;
};

Cell.prototype.createLabel = function(_parent, objPara)
{
	_parent.align = "center";
	_parent.colSpan = objPara.colspan;
	_parent.width = ((100/parseInt(this.objTemplate.colCount))*parseInt(objPara.colspan))+"%";
	_parent.height="100%";	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.height="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	tbl.className="cellInActive";
	tbl.setAttribute("row",objPara.row);
	tbl.setAttribute("col",objPara.col);		 
	TemplateDesigner.addEvent(tbl, "click", Cell.evtCellOnFocus);
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);
	var td = TemplateDesigner.createElement("td",tr);
	
	td.id="tdTemplate@"+objPara.row+"&"+objPara.col;
	td.className = "tdfonthead";

	var h="<div align='"+objPara.align+"' ";	
	//if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Hidden"]) h+=" style='display:none;' ";
	h+=">";
		
	if(objPara.bold==TemplateDesigner.TRUE_FALSE["True"])h+="<b>";
	if(objPara.italic==TemplateDesigner.TRUE_FALSE["True"])h+="<i>";
	if(objPara.underlined==TemplateDesigner.TRUE_FALSE["True"])h+="<u>";
	h+="<font color='"+objPara.color+"' size='"+objPara.fontsize+"'";
	if(objPara.language==TemplateDesigner.LANGUAGE["Hindi"])	h+=" face='"+TemplateDesigner.HINDI_LANGUAGE_FONT+"'";
	h+=">"+objPara.displayValue+"</font>";
	if(objPara.underlined==TemplateDesigner.TRUE_FALSE["True"])h+="</u>";
	if(objPara.italic==TemplateDesigner.TRUE_FALSE["True"])h+="</i>";
	if(objPara.bold==TemplateDesigner.TRUE_FALSE["True"])h+="</b>";
	h+="</div>";
	td.innerHTML = h;
	return tbl;
};

Cell.prototype.createComment = function(_parent, objPara)
{
	_parent.align = "center";
	_parent.colSpan = objPara.colspan;
	_parent.width = ((100/parseInt(this.objTemplate.colCount))*parseInt(objPara.colspan))+"%";
	_parent.height="100%";	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.height="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	tbl.className="cellInActive";
	tbl.setAttribute("row",objPara.row);
	tbl.setAttribute("col",objPara.col);		 
	TemplateDesigner.addEvent(tbl, "click", Cell.evtCellOnFocus);
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);
	var td = TemplateDesigner.createElement("td",tr);
	
	td.id="tdTemplate@"+objPara.row+"&"+objPara.col;
	td.className = "tdfonthead";

	var h="<div align='"+objPara.align+"' ";	
	//if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Hidden"]) h+=" style='display:none;' ";
	h+=">";

	if(objPara.bold==TemplateDesigner.TRUE_FALSE["True"])h+="<b>";
	if(objPara.italic==TemplateDesigner.TRUE_FALSE["True"])h+="<i>";
	if(objPara.underlined==TemplateDesigner.TRUE_FALSE["True"])h+="<u>";
	h+="<font color='"+objPara.color+"' size='"+objPara.fontsize+"'";
	if(objPara.language==TemplateDesigner.LANGUAGE["Hindi"])	h+=" face='"+TemplateDesigner.HINDI_LANGUAGE_FONT+"'";
	h+=">"+objPara.displayValue+"</font>";
	if(objPara.underlined==TemplateDesigner.TRUE_FALSE["True"])h+="</u>";
	if(objPara.italic==TemplateDesigner.TRUE_FALSE["True"])h+="</i>";
	if(objPara.bold==TemplateDesigner.TRUE_FALSE["True"])h+="</b>";
	h+="</div>";
	td.innerHTML = h;
	return tbl;
};

Cell.prototype.createTextBox = function(_parent, objPara)
{
	_parent.align = "center";
	_parent.colSpan = objPara.colspan;	
	_parent.width = ((100/parseInt(this.objTemplate.colCount))*parseInt(objPara.colspan))+"%";
	_parent.height="100%";	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	tbl.className="cellInActive";
	tbl.setAttribute("row",objPara.row);
	tbl.setAttribute("col",objPara.col);		 
	TemplateDesigner.addEvent(tbl, "click", Cell.evtCellOnFocus);
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);
	var td = TemplateDesigner.createElement("td",tr);

	td.id="tdTemplate@"+objPara.row+"&"+objPara.col;
	td.className = "tdfont";

	var h="<div align='"+objPara.align+"' ";	
	//if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Hidden"]) h+=" style='display:none;' ";
	h+=">";

	h+="<input type='text' tabindex='1' name='PARA"+objPara.paraId+"' ";
	h+="id='C:"+objPara.isCompulsory+"&R:"+objPara.isRange+"&G:"+objPara.genderType+"' ";
	h+="maxlength='"+objPara.maxlength+"' value='"+objPara.defaultValue+"' ";
	if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Disabled"]) h+="disabled='disabled' ";
	h+="size='"+objPara.size+"' onkeypress='return ("+objPara.validationFunction+"(this,event) && notSpecChar(this,event))' ";
	h+="onchange=\"validatePARAMETERRegExp(this,event,'"+objPara.format+"','"+objPara.regularExpression+"');\" />";
	h+="</div>";
	td.innerHTML = h;
	return tbl;
};

Cell.prototype.createTextArea = function(_parent, objPara)
{
	_parent.align = "center";
	_parent.colSpan = objPara.colspan;	
	_parent.width = ((100/parseInt(this.objTemplate.colCount))*parseInt(objPara.colspan))+"%";
	_parent.height="100%";	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.height="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	tbl.className="cellInActive";
	tbl.setAttribute("row",objPara.row);
	tbl.setAttribute("col",objPara.col);		 
	TemplateDesigner.addEvent(tbl, "click", Cell.evtCellOnFocus);
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);
	var td = TemplateDesigner.createElement("td",tr);

	td.id="tdTemplate@"+objPara.row+"&"+objPara.col;
	td.className = "tdfont";

	var h="<div align='"+objPara.align+"' ";	
	//if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Hidden"]) h+=" style='display:none;' ";
	h+=">";

	h+="<textarea tabindex='1' name='PARA"+objPara.paraId+"' ";
	h+="id='C:"+objPara.isCompulsory+"&G:"+objPara.genderType+"' ";
	if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Disabled"]) h+="disabled='disabled' ";
	h+="onkeypress='return ("+objPara.validationFunction+"(this,event) && notSpecChar(this,event) && validateTextareaLength(this,event,"+objPara.maxlength+"))' ";
	h+="rows='"+objPara.rowsize+"' cols='"+objPara.colsize+"' >"+objPara.defaultValue+"</textarea>";
	h+="</div>";
	td.innerHTML = h;
	return tbl;
};

Cell.prototype.createCombo = function(_parent, objPara)
{
	_parent.align = "center";
	_parent.colSpan = objPara.colspan;	
	_parent.width = ((100/parseInt(this.objTemplate.colCount))*parseInt(objPara.colspan))+"%";
	_parent.height="100%";	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.height="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	tbl.className="cellInActive";
	tbl.setAttribute("row",objPara.row);
	tbl.setAttribute("col",objPara.col);		 
	TemplateDesigner.addEvent(tbl, "click", Cell.evtCellOnFocus);
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);
	var td = TemplateDesigner.createElement("td",tr);

	td.id="tdTemplate@"+objPara.row+"&"+objPara.col;
	td.className = "tdfont";

	var h="<div align='"+objPara.align+"' ";	
	//if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Hidden"]) h+=" style='display:none;' ";
	h+=">";

	h+="<select tabindex='1' name='PARA"+objPara.paraId+"' id='C:"+objPara.isCompulsory+"&G:"+objPara.genderType+"' ";
	if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Disabled"]) h+="disabled='disabled' ";
	h+=" >";
	h+="<option value=''>Select Value</option>";
	if(objPara.sourceFlag==TemplateDesigner.SOURCE_FLAG["Static"])
	{
		var arrTwo=objPara.paraOptions.split(TemplateDesigner.SEP_IN_PARA_OPTIONS);
		for(var j=0;j<arrTwo.length;j++)
		{
			h+="<option value='"+arrTwo[j].split(TemplateDesigner.SEP_IN_PARA_OPTIONS_LABEL_VALUE)[0]+"' ";
			if(arrTwo[j].split(TemplateDesigner.SEP_IN_PARA_OPTIONS_LABEL_VALUE)[0]==objPara.defaultValue)
				h+=" selected='true' ";
			h+=">"+arrTwo[j].split(TemplateDesigner.SEP_IN_PARA_OPTIONS_LABEL_VALUE)[1]+"</option>";
		}
	}
	else if(objPara.sourceFlag==TemplateDesigner.SOURCE_FLAG["Dynamic"])
	h+="<option value='2' selected='true' >Dynamic Data</option>";
	h+="</select>";
	h+="</div>";
	td.innerHTML = h;
	return tbl;
};

Cell.prototype.createRadio = function(_parent, objPara)
{
	_parent.align = "center";
	_parent.colSpan = objPara.colspan;	
	_parent.width = ((100/parseInt(this.objTemplate.colCount))*parseInt(objPara.colspan))+"%";
	_parent.height="100%";	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.height="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	tbl.className="cellInActive";
	tbl.setAttribute("row",objPara.row);
	tbl.setAttribute("col",objPara.col);		 
	TemplateDesigner.addEvent(tbl, "click", Cell.evtCellOnFocus);
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);
	var td = TemplateDesigner.createElement("td",tr);

	td.id="tdTemplate@"+objPara.row+"&"+objPara.col;
	td.className = "tdfont";

	var h="<div align='"+objPara.align+"' ";	
	//if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Hidden"]) h+=" style='display:none;' ";
	h+="><font color='#000000' size='"+objPara.fontsize+"'";
	if(objPara.language==TemplateDesigner.LANGUAGE["Hindi"])	h+=" face='"+TemplateDesigner.HINDI_LANGUAGE_FONT+"'";
	h+=">";

	if(objPara.sourceFlag==TemplateDesigner.SOURCE_FLAG["Static"])
	{
		var arrTwo=objPara.paraOptions.split(TemplateDesigner.SEP_IN_PARA_OPTIONS);
		for(var j=0;j<arrTwo.length;j++)
		{
			h+="<input type='radio' tabindex='1' name='PARA"+objPara.paraId+"' ";
			h+="id='C:"+objPara.isCompulsory+"&G:"+objPara.genderType+"' ";
			if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Disabled"]) h+="disabled='disabled' ";
			h+="value='"+arrTwo[j].split(TemplateDesigner.SEP_IN_PARA_OPTIONS_LABEL_VALUE)[0]+"' ";
			if(arrTwo[j].split(TemplateDesigner.SEP_IN_PARA_OPTIONS_LABEL_VALUE)[0]==objPara.defaultValue)
				h+=" checked='true' ";
			h+=">"+arrTwo[j].split(TemplateDesigner.SEP_IN_PARA_OPTIONS_LABEL_VALUE)[1]+"</input>";
			//if((j+1) < arrTwo.length) h+="<br>";
		}
	}
	else if(objPara.sourceFlag==TemplateDesigner.SOURCE_FLAG["Dynamic"])
		h+="<b> Dynamic Data </b>";
	h+="</font></div>";
	td.innerHTML = h;
	return tbl;
};

Cell.prototype.createYesNo = function(_parent, objPara)
{
	_parent.align = "center";
	_parent.colSpan = objPara.colspan;	
	_parent.width = ((100/parseInt(this.objTemplate.colCount))*parseInt(objPara.colspan))+"%";
	_parent.height="100%";	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.height="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	tbl.className="cellInActive";
	tbl.setAttribute("row",objPara.row);
	tbl.setAttribute("col",objPara.col);		 
	TemplateDesigner.addEvent(tbl, "click", Cell.evtCellOnFocus);
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);
	var td = TemplateDesigner.createElement("td",tr);

	td.id="tdTemplate@"+objPara.row+"&"+objPara.col;
	td.className = "tdfont";

	var h="<div align='"+objPara.align+"' ";	
	//if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Hidden"]) h+=" style='display:none;' ";
	h+="><font color='#000000' size='2' face='Verdana, Arial, Helvetica, sans-serif'>";

	h+="<input type='radio' tabindex='1' name='PARA"+objPara.paraId+"' ";
	h+="id='C:"+objPara.isCompulsory+"&G:"+objPara.genderType+"' ";
	if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Disabled"]) h+="disabled='disabled' ";

	if(objPara.defaultValue=="yes")
		h+="value='yes' checked='true'>Yes</input>";
	else
		h+="value='yes'>Yes</input>";
	h+="<input type='radio' tabindex='1' name='PARA"+objPara.paraId+"' ";
	h+="id='C:"+objPara.isCompulsory+"&G:"+objPara.genderType+"' ";
	if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Disabled"]) h+="disabled='disabled' ";
	if(objPara.defaultValue=='no')
		h+="value='no' checked='true'>No</input>";
	else
		h+="value='no'>No</input>";
	h+="</font></div>";
	td.innerHTML = h;
	return tbl;
};

Cell.prototype.createCheckBox = function(_parent, objPara)
{
	_parent.align = "center";
	_parent.colSpan = objPara.colspan;	
	_parent.width = ((100/parseInt(this.objTemplate.colCount))*parseInt(objPara.colspan))+"%";
	_parent.height="100%";	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.height="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	tbl.className="cellInActive";
	tbl.setAttribute("row",objPara.row);
	tbl.setAttribute("col",objPara.col);		 
	TemplateDesigner.addEvent(tbl, "click", Cell.evtCellOnFocus);
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);
	var td = TemplateDesigner.createElement("td",tr);

	td.id="tdTemplate@"+objPara.row+"&"+objPara.col;
	td.className = "tdfont";

	var h="<div align='"+objPara.align+"' ";	
	//if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Hidden"]) h+=" style='display:none;' ";
	h+="><font ";//color='"+objPara.color+"' size='"+objPara.fontsize+"'";
	if(objPara.language==TemplateDesigner.LANGUAGE["Hindi"])	h+=" face='"+TemplateDesigner.HINDI_LANGUAGE_FONT+"'";
	h+=">";

	if(objPara.sourceFlag==TemplateDesigner.SOURCE_FLAG["Static"])
	{
		var arrTwo=objPara.paraOptions.split(TemplateDesigner.SEP_IN_PARA_OPTIONS_LABEL_VALUE);
		h+="<input type='checkbox' tabindex='1' name='PARA"+objPara.paraId+"' ";
		h+="id='C:"+objPara.isCompulsory+"&G:"+objPara.genderType+"' ";
		if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Disabled"]) h+="disabled='disabled' ";
		h+="value='"+arrTwo[0]+"' ";
		if(arrTwo[0]==objPara.defaultValue)
			h+=" checked='true' ";	
		h+=">"+arrTwo[1]+"</input>";
	}
	else
		h+="<b> Dynamic Data </b>";
	h+="</font></div>";
	td.innerHTML = h;
	return tbl;
};

Cell.prototype.createFormulated = function(_parent, objPara)
{
	_parent.align = "center";
	_parent.colSpan = objPara.colspan;	
	_parent.width = ((100/parseInt(this.objTemplate.colCount))*parseInt(objPara.colspan))+"%";
	_parent.height="100%";	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	tbl.className="cellInActive";
	tbl.setAttribute("row",objPara.row);
	tbl.setAttribute("col",objPara.col);		 
	TemplateDesigner.addEvent(tbl, "click", Cell.evtCellOnFocus);
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);
	var td = TemplateDesigner.createElement("td",tr);

	td.id="tdTemplate@"+objPara.row+"&"+objPara.col;
	td.className = "tdfont";

	var h="<div align='"+objPara.align+"' ";	
	//if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Hidden"]) h+=" style='display:none;' ";
	h+=">";

	h+="<input type='text' tabindex='1' name='PARA"+objPara.paraId+"' ";
	h+="value='"+objPara.defaultValue+"' id='"+objPara.dependentParaId+TemplateDesigner.SEP_VAL_IN_PARA+objPara.formula+TemplateDesigner.SEP_VAL_IN_PARA+objPara.formulaOutput+"' size='"+objPara.size+"' disabled='disabled' />";
	h+="</div>";
	td.innerHTML = h;
	return tbl;
};

Cell.prototype.createInformation= function(_parent, objPara)
{
	_parent.align = "center";
	_parent.colSpan = objPara.colspan;
	_parent.width = ((100/parseInt(this.objTemplate.colCount))*parseInt(objPara.colspan))+"%";
	_parent.height="100%";	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.height="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	tbl.className="cellInActive";
	tbl.setAttribute("row",objPara.row);
	tbl.setAttribute("col",objPara.col);		 
	TemplateDesigner.addEvent(tbl, "click", Cell.evtCellOnFocus);
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);
	var td = TemplateDesigner.createElement("td",tr);
	
	td.id="tdTemplate@"+objPara.row+"&"+objPara.col;
	td.className = "tdfont";

	var h="<div align='"+objPara.align+"' ";	
	//if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Hidden"]) h+=" style='display:none;' ";
	h+=">";

	if(objPara.bold==TemplateDesigner.TRUE_FALSE["True"])h+="<b>";
	if(objPara.italic==TemplateDesigner.TRUE_FALSE["True"])h+="<i>";
	if(objPara.underlined==TemplateDesigner.TRUE_FALSE["True"])h+="<u>";
	h+="<font color='"+objPara.color+"' size='"+objPara.fontsize+"'";
	if(objPara.language==TemplateDesigner.LANGUAGE["Hindi"])	h+=" face='"+TemplateDesigner.HINDI_LANGUAGE_FONT+"'";
	h+=">"+objPara.info+"</font>";
	if(objPara.underlined==TemplateDesigner.TRUE_FALSE["True"])h+="</u>";
	if(objPara.italic==TemplateDesigner.TRUE_FALSE["True"])h+="</i>";
	if(objPara.bold==TemplateDesigner.TRUE_FALSE["True"])h+="</b>";
	h+="</div>";
	
	td.innerHTML = h;
	return tbl;
};

Cell.prototype.createDuration = function(_parent, objPara)
{
	_parent.align = "center";
	_parent.colSpan = objPara.colspan;	
	_parent.width = ((100/parseInt(this.objTemplate.colCount))*parseInt(objPara.colspan))+"%";
	_parent.height="100%";	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.height="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	tbl.className="cellInActive";
	tbl.setAttribute("row",objPara.row);
	tbl.setAttribute("col",objPara.col);		 
	TemplateDesigner.addEvent(tbl, "click", Cell.evtCellOnFocus);
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);
	var td = TemplateDesigner.createElement("td",tr);

	td.id="tdTemplate@"+objPara.row+"&"+objPara.col;
	td.className = "tdfont";
	td.noWrap=true;

	var h="<div align='"+objPara.align+"' ";	
	//if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Hidden"]) h+=" style='display:none;' ";
	h+=">";

	h+="<input type='hidden' name='PARA"+objPara.paraId+"' ";
	h+="id='C:"+objPara.isCompulsory+"&R:"+objPara.isRange+"&G:"+objPara.genderType+"' ";
	h+="value='"+objPara.defaultValue+"' />";

	var defaultValueforCount="", defaultValueforDur="";
	if(objPara.defaultValue!="")
	{
		var arrTwo=objPara.paraOptions.split(TemplateDesigner.SEP_IN_PARA_OPTIONS);
		for(var j=0;j<arrTwo.length;j++)
		{
			var durVal = arrTwo[j].split(TemplateDesigner.SEP_IN_PARA_OPTIONS_LABEL_VALUE)[0];
			if(durVal==objPara.defaultValue.substr(objPara.defaultValue.length-durVal.length,durVal.length))
			{
				defaultValueforDur=durVal;
				var countVal=objPara.defaultValue.replace(durVal,"");
				defaultValueforCount=countVal.replace(" ","");
				break;
			}
		}
	}
	
	h+="<input type='text' tabindex='1' maxlength='"+objPara.maxlength+"' value='"+defaultValueforCount+"' ";
	if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Disabled"]) h+="disabled='disabled' ";
	h+="size='4' onkeypress='return ("+objPara.validationFunction+"(this,event) && notSpecChar(this,event))' ";
	h+="onchange=\"validatePARAMETERDuartionValueSet(this,event,'"+objPara.paraId+"');\" />";

	h+="<select tabindex='1' ";
	if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Disabled"]) h+="disabled='disabled' ";
	h+="onchange=\"validatePARAMETERDuartionValueSet(this,event,'"+objPara.paraId+"');\" >";
	h+="<option value=''>Select</option>";
	var arrTwo=objPara.paraOptions.split(TemplateDesigner.SEP_IN_PARA_OPTIONS);
	for(var j=0;j<arrTwo.length;j++)
	{
		h+="<option value='"+arrTwo[j].split(TemplateDesigner.SEP_IN_PARA_OPTIONS_LABEL_VALUE)[0]+"' ";
		if(arrTwo[j].split(TemplateDesigner.SEP_IN_PARA_OPTIONS_LABEL_VALUE)[0]==defaultValueforDur)
			h+=" selected='true' ";
		h+=">"+arrTwo[j].split(TemplateDesigner.SEP_IN_PARA_OPTIONS_LABEL_VALUE)[1]+"</option>";
	}
	h+="</select>";
	h+="</div>";
	td.innerHTML = h;
	return tbl;
};

Cell.prototype.createDate = function(_parent, objPara)
{
	_parent.align = "center";
	_parent.colSpan = objPara.colspan;	
	_parent.width = ((100/parseInt(this.objTemplate.colCount))*parseInt(objPara.colspan))+"%";
	_parent.height="100%";	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	tbl.className="cellInActive";
	tbl.setAttribute("row",objPara.row);
	tbl.setAttribute("col",objPara.col);		 
	TemplateDesigner.addEvent(tbl, "click", Cell.evtCellOnFocus);
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);
	var td = TemplateDesigner.createElement("td",tr);

	td.id="tdTemplate@"+objPara.row+"&"+objPara.col;
	td.className = "tdfont";

	var h="<div align='"+objPara.align+"' ";	
	//if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Hidden"]) h+=" style='display:none;' ";
	h+=">";

//<html:text name="ANCDeliveryDetailFB" property="birthDate" value="dd-mm-yyyy" tabindex="1" maxlength="10" size="11" onfocus="DateValidator.setupOnFocus(this)"></html:text>

	h+="<input type='text' tabindex='1' name='PARA"+objPara.paraId+"' ";
	h+="id='C:"+objPara.isCompulsory+"&R:"+objPara.isRange+"&G:"+objPara.genderType+"' ";
	h+="maxlength='10' value='"+objPara.defaultValue+"' ";
	if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Disabled"]) h+="disabled='disabled' ";
	h+="size='11' onfocus='DateValidator.setupOnFocus(this)' />";
	h+="</div>";
	td.innerHTML = h;
	return tbl;
};

Cell.prototype.createTime = function(_parent, objPara)
{
	_parent.align = "center";
	_parent.colSpan = objPara.colspan;	
	_parent.width = ((100/parseInt(this.objTemplate.colCount))*parseInt(objPara.colspan))+"%";
	_parent.height="100%";	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	tbl.className="cellInActive";
	tbl.setAttribute("row",objPara.row);
	tbl.setAttribute("col",objPara.col);		 
	TemplateDesigner.addEvent(tbl, "click", Cell.evtCellOnFocus);
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);
	var td = TemplateDesigner.createElement("td",tr);

	td.id="tdTemplate@"+objPara.row+"&"+objPara.col;
	td.className = "tdfont";

	var h="<div align='"+objPara.align+"' ";	
	//if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Hidden"]) h+=" style='display:none;' ";
	h+=">";

//<html:text name="ANCDeliveryDetailFB" property="birthTime" value="hh:mm" tabindex="1" maxlength="5" size="6" onfocus="TimeValidator.setupOnFocus(this)"></html:text>						

	h+="<input type='text' tabindex='1' name='PARA"+objPara.paraId+"' ";
	h+="id='C:"+objPara.isCompulsory+"&R:"+objPara.isRange+"&G:"+objPara.genderType+"' ";
	h+="maxlength='5' value='"+objPara.defaultValue+"' ";
	if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Disabled"]) h+="disabled='disabled' ";
	h+="size='6' onfocus='TimeValidator.setupOnFocus(this)' />";
	h+="</div>";
	td.innerHTML = h;
	return tbl;
};

Cell.prototype.createImageView = function(_parent, objPara)
{
	_parent.align = "center";
	_parent.colSpan = objPara.colspan;
	_parent.width = ((100/parseInt(this.objTemplate.colCount))*parseInt(objPara.colspan))+"%";
	_parent.height="100%";	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.height="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	tbl.className="cellInActive";
	tbl.setAttribute("row",objPara.row);
	tbl.setAttribute("col",objPara.col);		 
	TemplateDesigner.addEvent(tbl, "click", Cell.evtCellOnFocus);
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);
	var td = TemplateDesigner.createElement("td",tr);
	
	td.id="tdTemplate@"+objPara.row+"&"+objPara.col;
	td.className = "tdfont";

	var h="<div align='"+objPara.align+"' ";	
	//if(objPara.presentation==TemplateDesigner.PRESENTATION_TYPES["Hidden"]) h+=" style='display:none;' ";
	h+=">";
	h+="<img alt='Image Here' title='"+objPara.displayValue+"' src=''>";
	h+="</div>";
	td.innerHTML = h;
	return tbl;
};

Cell.getCellObjectFromElem = function(elemCell)
{
	if(elemCell == null || elemCell.getAttribute("row") == null ) return null;
	var row = parseInt(elemCell.getAttribute("row"));
	var col = parseInt(elemCell.getAttribute("col"));
	var objCell = TemplateDesigner.getTemplateDesigner().objTemplate.cellArray[row-1][col-1];
	return objCell;
};

Cell.getParameterObjectFromElem = function(elemCell)
{
	if(elemCell.getAttribute("row") == null ) return null;
	var row = parseInt(elemCell.getAttribute("row"));
	var col = parseInt(elemCell.getAttribute("col"));
	var objCell = TemplateDesigner.getTemplateDesigner().objTemplate.cellArray[row-1][col-1];
	var objParameter = objCell.parameter;
	return objParameter;
};

Cell.evtCellOnFocus = function(evnt)	
{
	try
	{
		var elem = TemplateDesigner.getTargetElement(evnt);
		while(elem.getAttribute("row")==null)
		{
			elem=elem.parentNode;
		}

		var elemClickedCell = elem;
		var objClickedCell =Cell.getCellObjectFromElem(elemClickedCell);
		var elemCurCell = TemplateDesigner.getTemplateDesigner().objTemplate.elemCurrentCell;
		var objCurCell = null;
		if(elemCurCell != null)	objCurCell = Cell.getCellObjectFromElem(elemCurCell);
		
		var flag;
		if(objCurCell != null)// && !(objCurCell.row==objClickedCell.row && objCurCell.col==objClickedCell.col))
		{
			var templateDesigner = TemplateDesigner.getTemplateDesigner();
			flag = templateDesigner.objTemplate.applyTemplateChanges();
			if(!flag) return;
		}

		var objCell = TemplateDesigner.getTemplateDesigner().objTemplate.getSpecifiedCell(elemClickedCell.getAttribute("row"),elemClickedCell.getAttribute("col"));
		if(objCell.isVisible==TemplateDesigner.YES_NO["No"])
		{
			objCell = TemplateDesigner.getTemplateDesigner().objTemplate.getVisibleCell(elemCurCell.getAttribute("row"),elemCurCell.getAttribute("col"));
		}
		TemplateDesigner.getTemplateDesigner().objTemplate.elemCurrentCell=objCell.elemContainer;
		Cell.highlightActive(objCell.row+"&"+objCell.col);
		TemplateDesigner.getTemplateDesigner().objDesigner.activate(objCell);
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

Cell.highlightActive = function(id)
{
	var objTemplate = TemplateDesigner.getTemplateDesigner().objTemplate;
	var objCell = objTemplate.cellArray[parseInt(id.split("&")[0])-1][parseInt(id.split("&")[1])-1];
	objCell.elemContainer.className = "cellActive";
};

Cell.highlightInActive = function(id)
{
	var objTemplate = TemplateDesigner.getTemplateDesigner().objTemplate;
	var objCell = objTemplate.cellArray[parseInt(id.split("&")[0])-1][parseInt(id.split("&")[1])-1];
	objCell.elemContainer.className = "cellInActive";
};

Cell.highlightParent = function(id)
{
	var objTemplate = TemplateDesigner.getTemplateDesigner().objTemplate;
	var objCell = objTemplate.cellArray[parseInt(id.split("&")[0])-1][parseInt(id.split("&")[1])-1];
	objCell.elemContainer.className = "cellParent";
};

Cell.highlightChildren = function(id)
{
	var objTemplate = TemplateDesigner.getTemplateDesigner().objTemplate;
	var objCell = objTemplate.cellArray[parseInt(id.split("&")[0])-1][parseInt(id.split("&")[1])-1];
	objCell.elemContainer.className = "cellChild";
};

Cell.highlightFormulaSource = function(id)
{
	var objTemplate = TemplateDesigner.getTemplateDesigner().objTemplate;
	var objCell = objTemplate.cellArray[parseInt(id.split("&")[0])-1][parseInt(id.split("&")[1])-1];
	objCell.elemContainer.className = "cellFormulaSource";
};

Cell.highlightFormulatedDependent = function(id)
{
	var objTemplate = TemplateDesigner.getTemplateDesigner().objTemplate;
	var objCell = objTemplate.cellArray[parseInt(id.split("&")[0])-1][parseInt(id.split("&")[1])-1];
	objCell.elemContainer.className = "cellFormulatedDependent";
};

Cell.highlightCorrespondingDependent = function(id)
{
	var objTemplate = TemplateDesigner.getTemplateDesigner().objTemplate;
	var objCell = objTemplate.cellArray[parseInt(id.split("&")[0])-1][parseInt(id.split("&")[1])-1];
	objCell.elemContainer.className = "cellCorrespondingDependent";
};
// **** End Cell ************************


// **** Parameter ************************

	// Parameter Constructor
Parameter = function(_row,_column)
{
	// Parameter Position : Row and Col
	this.row=_row;
	this.col=_column;

	// Parameter Id and Name
	this.paraId="";
	this.paraName="";

	// Control Type 
	this.controlType = TemplateDesigner.NO_SELECT; 

	// Parameter Parent
	this.paraParent="";


	// Display Value
	this.displayValue="";

	// Location Type
	this.locationType=TemplateDesigner.LOCATION_TYPES["Cell"]; 
	// Colspan
	this.colspan=1;

	// Parameter Properties
	this.bold=TemplateDesigner.TRUE_FALSE["False"];
	this.italic=TemplateDesigner.TRUE_FALSE["False"];
	this.underlined=TemplateDesigner.TRUE_FALSE["False"];
	this.color=TemplateDesigner.INITIAL_COLOR;
	this.maxlength="";
		// TextArea Control
	this.colsize="20";
	this.rowsize="3";
	this.validationFunction=TemplateDesigner.TEXT_VALIDATIONS["None"];
	this.defaultValue="";	// for ImageView Control if image Set it is set as 'file extension' 
	this.regularExpression="";
	this.format="";
		// Formula For Formulated Control
	this.formula="";
		// Information Control
	this.info="";
	this.align=TemplateDesigner.ALIGN["Center"];
	this.genderType=TemplateDesigner.GENDER_TYPES["None"];
	this.childPresentation=TemplateDesigner.CHILD_PRESENTATIONS["Normal"];
	this.childPresentationOn="";
	this.presentation=TemplateDesigner.PRESENTATION_TYPES["Normal"];
	this.size="10";	// Used as Size for Textbox // Default Value According to Col Size and Textbox Size
	this.fontsize="2";	// Used as Font Size for Comments // Default Value according to Row Size & Font Size
	this.language=TemplateDesigner.LANGUAGE["English"];		// Default Language English
	this.formulaOutput=TemplateDesigner.FORMULA_OUTPUT_TYPES["None"];

	// Compulsory Flag
	this.isCompulsory=TemplateDesigner.YES_NO_VALUE["No"];

	// Range Flag
	this.isRange=TemplateDesigner.YES_NO_VALUE["No"];

	// Source Flag : Static or Dynamic
	this.sourceFlag=TemplateDesigner.SOURCE_FLAG["Static"];
	// Optios List for Cobmo,Radio,Checkbox
	this.paraOptions="";
	// Query in Case of Dynamic
	this.tableQuery="";
	
	// Formulated Control
	this.haveDependent=TemplateDesigner.YES_NO_VALUE["No"];
	// have Dependent Para Id if a
	this.dependentParaId="";
};

Parameter.prototype.setFormValue = function(id,val)
{
	document.getElementById(id).value = val;
};

Parameter.prototype.haveParaChildren = function()
{
	var objTemp = TemplateDesigner.getTemplateDesigner().objTemplate;
	for(var i=this.row-1;i<objTemp.rowCount;i++)
		for(var j=this.col-1;j<objTemp.colCount;j++)
			if( !(i==(this.row-1) && j==(this.col-1)) )
			{
				var objCell = objTemp.cellArray[i][j];
				if(!(objCell.isVisible==TemplateDesigner.YES_NO["No"] || objCell.haveParameter == TemplateDesigner.YES_NO["No"]) )
				{
					var paraParent = objCell.parameter.paraParent;
					if(paraParent != "")
					{
						var parents=paraParent.split("#");
						for(var k=0;k<parents.length;k++)
						{							
							if( parents[k]==(this.row+"&"+this.col) )
							{
								return objCell;
							}
						}
					}					 
				}
			}
	return null;
};

Parameter.prototype.getParaChildrenArray = function()
{
	var objTemp = TemplateDesigner.getTemplateDesigner().objTemplate;
	var arrChildren = new Array((objTemp.rowCount*objTemp.colCount)-1);
	var countChildren = 0;
	for(var i=this.row-1;i<objTemp.rowCount;i++)
		for(var j=this.col-1;j<objTemp.colCount;j++)
			if( !(i==(this.row-1) && j==(this.col-1)) )
			{
				var objCell = objTemp.cellArray[i][j];
				if(!(objCell.isVisible==TemplateDesigner.YES_NO["No"] || objCell.haveParameter == TemplateDesigner.YES_NO["No"]) )
				{
					var paraParent = objCell.parameter.paraParent;
					if(paraParent != "")
					{
						var parents=paraParent.split("#");
						for(var k=0;k<parents.length;k++)
							if( parents[k]==(this.row+"&"+this.col) )
								arrChildren[countChildren++]=objCell;
					}					 
				}
			}
	var finalChildrenArr = null;
	if(countChildren>0)
	{	
		finalChildrenArr = new Array(countChildren);
		for(var i=0; i<countChildren; i++)	finalChildrenArr[i] = arrChildren[i];
	}
	return finalChildrenArr;
};

Parameter.getParameterName = function(_objPara)
{
	var paraName="";
	var templateDesigner = TemplateDesigner.getTemplateDesigner();

	if(_objPara.paraName!="")	paraName=_objPara.paraName;
	else if(_objPara.paraParent!="")
	{
		var parents=_objPara.paraParent.split("#");
		for(var k=0;k<parents.length;k++)
		{							
			
			var r = parents[k].split("&")[0];
			var c = parents[k].split("&")[1];
			var parentPara = templateDesigner.objTemplate.getSpecifiedCellPara(r,c);
			paraName += parentPara.paraName + " ";
		}
	}
	
	return paraName;
};

// **** End Parameter ************************


// **** Parameter Setter ************************
ParameterSetter = function(_templateType)
{
	this.tempType = _templateType;
	
	this.paraControl = null;
	this.controlType = null;
	this.row = null;
	this.col = null;
	
	this.elemContainer = null;
};

ParameterSetter.prototype.create = function(_parent)
{
	this.elemContainer = _parent;
	this.hide();
	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="1";
	var thead = TemplateDesigner.createElement("thead",tbl);

	var tr = TemplateDesigner.createElement("tr",thead);	
	this.paraControl = new ParameterControl(this);
	this.paraControl.create(tr);
	
	this.controlType = new ControlsTypeControl();
	this.controlType.create(tr);
	
	tr = TemplateDesigner.createElement("tr",thead);
	this.row = new RowControl();
	this.row.create(tr);
	
	this.col = new ColumnControl();
	this.col.create(tr);
};

ParameterSetter.prototype.activate = function(_objPara)
{
	this.paraControl.setValue(_objPara);
	this.controlType.setValue(_objPara);
	this.row.setValue(_objPara);
	this.col.setValue(_objPara);
	this.show();
};

ParameterSetter.prototype.getValue = function(_objPara)
{
	this.paraControl.getValue(_objPara);
	this.controlType.getValue(_objPara);
	this.row.getValue(_objPara);
	this.col.getValue(_objPara);
};

ParameterSetter.prototype.validate = function()
{
	if(!this.paraControl.validate()) return false;
	if(!this.controlType.validate()) return false;
	if(!this.row.validate()) return false;
	if(!this.col.validate()) return false;
	return true;
};

ParameterSetter.prototype.hide=function()
{
	this.elemContainer.style.display = TemplateDesigner.DISPLAY_TYPE["Hide"];
};

ParameterSetter.prototype.show=function()
{
	this.elemContainer.style.display = TemplateDesigner.DISPLAY_TYPE["Show"];	
};

ParameterSetter.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objParameterSetter;
};


	// ParameterSetter Controls Classes

// Parameter ID Control ****************
ParameterIDControl = function()
{
	this.value = null;
	this.readOnly = false;
	this.elemContainer = null;	
};

ParameterIDControl.prototype.create=function(_parent)
{
	var hidden = TemplateDesigner.createInputElement("hidden", _parent);
	hidden.id = "paraId";
	this.elemContainer = hidden;
	this.setReadOnly();
};

ParameterIDControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.paraId;
	this.elemContainer.value = this.value;
	this.setReadOnly();
};

ParameterIDControl.prototype.getValue = function(_objPara)
{
	if(!this.readOnly)
		_objPara.paraId = this.elemContainer.value;
	else
		_objPara.paraId = "";
};

ParameterIDControl.prototype.setReadOnly = function()
{
	this.elemContainer.readOnly = this.readOnly;
	this.elemContainer.disabled = this.readOnly;
	if(this.readOnly)	
		this.elemContainer.value="";
};

ParameterIDControl.prototype.validate = function()
{
	return true;
};

// Parameter Name Control ****************
ParameterNameControl = function()
{
	this.value = null;	
	this.elemContainer = null;
	this.readOnly = false;
};

ParameterNameControl.prototype.create=function(_parent)
{
	var text = TemplateDesigner.createInputElement("text", _parent);
	text.id = "paraName";
	text.maxLength = 50;
	text.size = 20;
	
	TemplateDesigner.addEvent(text, "change", ParameterNameControl.evtParaNameChange);
	
	/*TemplateDesigner.addEvent(text, "keyup", ParameterNameControl.evtSetGetParameter);
	TemplateDesigner.addEvent(text, "blur", ParameterNameControl.evtParaNameBlur);
	TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtValidateAlphaNumOnly);*/	
	
	this.elemContainer = text;	
	this.setReadOnly();
	
	// Setting New Drop Down Search	
	var objNDDS = text.obj_Pragyas_NewDropDownSearch;
	if(!objNDDS)
	{
		objNDDS = new NewDropDownSearch(text, document.getElementById('parameterList'));
		text.obj_Pragyas_NewDropDownSearch = objNDDS;
		objNDDS.create();
	}
};

ParameterNameControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.paraName;
	this.elemContainer.value = this.value;
	this.elemContainer.obj_Pragyas_NewDropDownSearch.allClear();
	this.setReadOnly();
};

ParameterNameControl.prototype.getValue = function(_objPara)
{
	if(!this.readOnly)
		_objPara.paraName = this.elemContainer.value;
	else
		_objPara.paraName = "";
};

ParameterNameControl.prototype.setReadOnly = function()
{
	this.elemContainer.readOnly = this.readOnly;
	this.elemContainer.disabled = this.readOnly;
	if(this.readOnly)	
		this.elemContainer.value="";
};

ParameterNameControl.prototype.validate = function()
{
	if(!this.readOnly)
	{
		if(TemplateDesigner.trimData(this.elemContainer.value)=="")
		{
			alert("Enter Parameter Name ... ");
			this.elemContainer.value=TemplateDesigner.trimData(this.elemContainer.value);
			this.elemContainer.focus();
			return false;
		}
	}
	return true;
};

ParameterNameControl.evtSetGetParameter = function(evnt)
{
	try
	{
		var elem = TemplateDesigner.getTargetElement(evnt);
		var tempDesigner = TemplateDesigner.getTemplateDesigner();
		var paraObj = TemplateDesigner.getCurrentCellParaObject();
		var controlType=paraObj.controlType;
		// Not for No Select control Type
		// Not for Comment, Information, ImageView Any More
		// Not for other than Label in Matrix Type Template
		if(!( controlType == TemplateDesigner.NO_SELECT || 
			controlType == TemplateDesigner.CONTROL_TYPES["Comment"] || 
			controlType == TemplateDesigner.CONTROL_TYPES["Information"] ||
			controlType == TemplateDesigner.CONTROL_TYPES["ImageView"] || 
			( tempDesigner.tempType==TemplateDesigner.TEMPLATE_TYPE["Matrix"] && controlType!=TemplateDesigner.CONTROL_TYPES["Label"]) ) )
		{
			var div=document.getElementById('divParameterList');
			if(div.style.display==TemplateDesigner.DISPLAY_TYPE["Hide"])
			{
				var o=elem;
				var l=0,t=0;
				while(o.offsetParent)
				{
					l+=o.offsetLeft;
					t+=o.offsetTop;
					o=o.offsetParent;
				}
				div.style.left=l;
				div.style.top=t+elem.offsetHeight;
				div.style.pixelWidth=elem.style.pixelWidth;
				div.style.display=TemplateDesigner.DISPLAY_TYPE["Show"];
			}
			var lst=document.getElementById('parameterList');
			var i=0;
			switch(evnt.keyCode)
			{
				case TemplateDesigner.EVENT_KEYCODES["Enter"]:
					if(lst.selectedIndex>=0) i=lst.selectedIndex;					
					elem.value=lst.options[i].text;
					paraObj.setFormValue("paraId",lst.options[i].value);
					div.style.display=TemplateDesigner.DISPLAY_TYPE["Hide"];
					break;
					
				case TemplateDesigner.EVENT_KEYCODES["ArrowUp"]:
					if(lst.selectedIndex>=0)	i=lst.selectedIndex - 1;
					else i=lst.options.length - 1;			
					if(i<lst.options.length)
					{				
						if(lst.selectedIndex>=0) lst.options[i+1].selected=false;
						lst.selectedIndex=i;
						lst.options[i].selected=true;
						elem.value=lst.options[i].text;
						paraObj.setFormValue("paraId",lst.options[i].value);
					}
					break;
					
				case TemplateDesigner.EVENT_KEYCODES["ArrowDown"]:
					if(lst.selectedIndex>=0)	i=lst.selectedIndex+1;
					else i=0;			
					if(i<lst.options.length)
					{
						if(lst.selectedIndex>=0) lst.options[i-1].selected=false;	
						lst.selectedIndex=i;
						lst.options[i].selected=true;
						elem.value=lst.options[i].text;
						paraObj.setFormValue("paraId",lst.options[i].value);
					}
					break;
					
				default :
					if(lst.selectedIndex>=0)	i=lst.selectedIndex;
					else i=0;
					var flag=false,len=1,fm=0;
					do
					{
						a:	for(j=fm;j<lst.options.length;j++)
							if(elem.value.substr(0,len).toUpperCase()==lst.options[j].text.substr(0,len).toUpperCase())
							{
								flag=true;
								fm=j;
								break a;
							}
							len++;				
					}while(flag && len < elem.value.length);
					if(lst.selectedIndex>=0)	lst.options[lst.selectedIndex].selected=false;
					lst.selectedIndex=fm;
					if(flag)	lst.options[fm].selected=true;					
			}
		 }	
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

ParameterNameControl.evtParaNameBlur = function(evnt)
{
	try
	{
		var elem = TemplateDesigner.getTargetElement(evnt);
		while(elem.id!="paraName")
			elem=elem.parentNode;
		
		document.getElementById('divParameterList').style.display=TemplateDesigner.DISPLAY_TYPE["Hide"];
		var objDisplayValue = DisplayValueControl.getObject();
		if(objDisplayValue.elemContainer!=null && objDisplayValue.elemContainer.value =="")
			objDisplayValue.elemContainer.value=elem.value;			
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

ParameterNameControl.evtParaNameChange = function(evnt)
{
	try
	{
		var elem = TemplateDesigner.getTargetElement(evnt);
		while(elem.id!="paraName")
			elem=elem.parentNode;
		
		document.getElementById('divParameterList').style.display=TemplateDesigner.DISPLAY_TYPE["Hide"];
		var objDisplayValue = DisplayValueControl.getObject();
		if(objDisplayValue.elemContainer!=null && objDisplayValue.elemContainer.value =="")
			objDisplayValue.elemContainer.value=elem.value;			

		var paraObj = TemplateDesigner.getCurrentCellParaObject();
		paraObj.setFormValue("paraId","");

		if(elem.SELECTED_VALUE!=null)
			paraObj.setFormValue("paraId",elem.SELECTED_VALUE);
		
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

// Parameter Control ****************
ParameterControl = function(_parameterSetter,_tempType)
{
	this.parameterSetter = _parameterSetter;
	this.tempType = _tempType;
	
	this.paraId = null;
	this.paraName = null;	
	this.elemContainer = null;
};

ParameterControl.prototype.create=function(_parent)
{
	this.elemContainer = _parent;
	
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Parameter Name";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	this.paraId = new ParameterIDControl();	
	this.paraId.create(td);	
	this.paraName = new ParameterNameControl();
	this.paraName.create(td);	
};

ParameterControl.prototype.setValue = function(_objPara)
{
	if( _objPara.controlType == TemplateDesigner.NO_SELECT || 
		_objPara.controlType == TemplateDesigner.CONTROL_TYPES["Comment"] ||
		_objPara.controlType == TemplateDesigner.CONTROL_TYPES["Information"] ||
		_objPara.controlType == TemplateDesigner.CONTROL_TYPES["ImageView"] || 
		(TemplateDesigner.getTempType()==TemplateDesigner.TEMPLATE_TYPE["Matrix"] && _objPara.controlType!=TemplateDesigner.CONTROL_TYPES["Label"]) )
	{
		this.paraId.readOnly=true;
		this.paraName.readOnly=true;
	}
	else
	{
		this.paraId.readOnly=false;
		this.paraName.readOnly=false;
	}	
	this.paraId.setValue(_objPara);
	this.paraName.setValue(_objPara);
};

ParameterControl.prototype.getValue = function(_objPara)
{
	this.paraId.getValue(_objPara);
	this.paraName.getValue(_objPara);
};

ParameterControl.prototype.validate = function()
{
	if(!this.paraId.validate()) return false;
	if(!this.paraName.validate()) return false;
	if(!this.validateDuplicate()) return false;
	return true;
};

ParameterControl.prototype.validateDuplicate = function()
{
	var controlType= ControlsTypeControl.getObject().elemContainer.value;
	if(!(controlType == TemplateDesigner.NO_SELECT || 
		controlType == TemplateDesigner.CONTROL_TYPES["Comment"] || 
		controlType == TemplateDesigner.CONTROL_TYPES["Information"] ||
		controlType == TemplateDesigner.CONTROL_TYPES["ImageView"] ||
		TemplateDesigner.getTempType()==TemplateDesigner.TEMPLATE_TYPE["Consent"] ) )
	//if(!this.paraName.readOnly || (TemplateDesigner.getTempType()==TemplateDesigner.TEMPLATE_TYPE["Matrix"] && controlType!=TemplateDesigner.CONTROL_TYPES["Label"] ) )
	{
		// If Parameter Name Matches exisiting 
		var someFlag=false;
		for(var i=0;i<document.getElementById('parameterList').options.length;i++)
			if(this.paraName.elemContainer.value.toUpperCase()== document.getElementById('parameterList').options[i].text.toUpperCase())
			{
				this.paraId.elemContainer.value=document.getElementById('parameterList').options[i].value;
				this.paraName.elemContainer.value=document.getElementById('parameterList').options[i].text;
				someFlag=true;
				break;
			}
		if(someFlag==false)	this.paraId.elemContainer.value=""; 

		var objTemp = TemplateDesigner.getTemplateDesigner().objTemplate;
		var objCurrCell = TemplateDesigner.getCurrentCellObject();
		var parent = ParentControl.getObject().elemContainer.value;
		var already = objTemp.isParaNameUsed(this.paraName.elemContainer.value,parent,objCurrCell.row,objCurrCell.col);
		if(already!=null)
		{
			alert("Duplicate Parameter .. Either Change Name or Change Parent... ");
			//------Hightlight Cell with Same  this.paraId.elemContainer.value="";
			this.paraName.elemContainer.focus();
			return false;
		}
	}
	return true;
}

// Controls Type Control****************
ControlsTypeControl = function()
{
	this.value = null;
	this.elemContainer = null;
};

ControlsTypeControl.prototype.create = function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Control Type";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var select = TemplateDesigner.createElement("select",td);
	select.id = "controlType";	
	TemplateDesigner.addEvent(select, "change", ControlsTypeControl.evtSetControlTypeProps);	
	var option = TemplateDesigner.createElement("option",select);
	option.value = TemplateDesigner.NO_SELECT;
	option.innerHTML = "Select Value";
	for( opt in TemplateDesigner.CONTROL_TYPES)
	{
		option = TemplateDesigner.createElement("option", select);
		option.value = TemplateDesigner.CONTROL_TYPES[opt];
		option.innerHTML = opt;
	}
	this.elemContainer = select;
};

ControlsTypeControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.controlType;
	this.elemContainer.value = 	this.value;
};

ControlsTypeControl.prototype.getValue = function(_objPara)
{
	_objPara.controlType = this.elemContainer.value;
};

ControlsTypeControl.prototype.validate = function()
{
	return true;
};

ControlsTypeControl.prototype.resetFromRecent = function()
{
	this.elemContainer.value = this.value;
	this.elemContainer.focus();
};

ControlsTypeControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objParameterSetter.controlType;
};

ControlsTypeControl.isStatic = function(_controlType)
{
	if( _controlType == TemplateDesigner.CONTROL_TYPES["Label"] || 
		_controlType == TemplateDesigner.CONTROL_TYPES["Comment"] ||
		_controlType == TemplateDesigner.CONTROL_TYPES["Information"] ||
		_controlType == TemplateDesigner.CONTROL_TYPES["ImageView"] )
		return true;
	return false;
};

ControlsTypeControl.evtSetControlTypeProps = function(evnt)
{
	try
	{
		var elem = TemplateDesigner.getTargetElement(evnt);
		while(elem.id!="controlType")
			elem=elem.parentNode;
		var controlType = elem.value;
		
		if(!ControlsTypeControl.validateDynamic(controlType))
			return;
		ControlsTypeControl.setControlType(controlType);		
		TemplateDesigner.getTemplateDesigner().objDesigner.activate(TemplateDesigner.getCurrentCellObject());
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

ControlsTypeControl.validateDynamic = function(controlType)
{
	var tempDesigner = TemplateDesigner.getTemplateDesigner();
	var objPara = TemplateDesigner.getCurrentCellParaObject();
	var objControlType = ControlsTypeControl.getObject();
	
	if(tempDesigner.tempType == TemplateDesigner.TEMPLATE_TYPE["Consent"] && controlType == TemplateDesigner.CONTROL_TYPES["Label"])
	{
		alert("Consent can't have a Label...");
		objControlType.resetFromRecent();
		return false;
	}
	
	/*if(	tempDesigner.tempType != TemplateDesigner.TEMPLATE_TYPE["Guideline"] && 
		controlType == TemplateDesigner.CONTROL_TYPES["ImageView"] )
	{
		alert("ImageView can only have be used in Guidelines ...");
		objControlType.resetFromRecent();
		return false;
	}*/

	if(	tempDesigner.tempType == TemplateDesigner.TEMPLATE_TYPE["Guideline"] && 
		(controlType != TemplateDesigner.NO_SELECT && controlType != TemplateDesigner.CONTROL_TYPES["Comment"]
		&& controlType != TemplateDesigner.CONTROL_TYPES["ImageView"] ) )
	{
		alert("Guideline can only have Comments or Image Views...");
		objControlType.resetFromRecent();
		return false;
	}

	if(!ControlsTypeControl.isStatic(controlType))
	{
		/** 
		 * A Label can't be converted to Non-Label if it is Parent of Any other Parameter
		 */
		if(objControlType.value == TemplateDesigner.CONTROL_TYPES["Label"])
		{
			var paraChild = objPara.haveParaChildren();
			if(paraChild!= null)
			{
				Cell.highlightChildren(paraChild.row+"&"+paraChild.col);
				alert("This Parameter has Child or Children.. First Detach them..");
				objControlType.resetFromRecent();
				return false; 
			}
		}
		
		if( controlType == TemplateDesigner.NO_SELECT ) return true;
		 
		/**
		 * First Row of Template can't have a Non-Label 
		 */
		/*if( objPara.row==1 && (tempDesigner.tempType == TemplateDesigner.TEMPLATE_TYPE["Normal"] || tempDesigner.tempType == TemplateDesigner.TEMPLATE_TYPE["Consent"]))
		{
			alert("First Row can only have a Label or Comment or Information or ImageView..");
			objControlType.resetFromRecent();
			return false; 
		}*/

		/**
		 * First Column of Template can't have a Non-Label 
		 */
		/*if( objPara.col==1 )
		{
			alert("First Column can only have a Label or Comment..");
			objControlType.resetFromRecent();
			return false; 
		}*/

		// Normal Template Checks
		if(tempDesigner.tempType == TemplateDesigner.TEMPLATE_TYPE["Normal"])
		{
			/**
			 * A Non-Label can't be at Last Column
			 */
			if(objPara.col==tempDesigner.objTemplate.colCount)
			{
				alert("Last Column can't contain a Control except Label or Comment or Information or ImageView..");
				objControlType.resetFromRecent();
				return false; 
			}
	
			var objNextCellPara = tempDesigner.objTemplate.getSpecifiedCellPara(objPara.row,objPara.col+1);
			if(objNextCellPara != null && !(objNextCellPara.controlType != TemplateDesigner.CONTROL_TYPES["Label"]))
			{
				alert("Next Cell has a Parameter.. First Remove Next Cell Parameter..");
				objControlType.resetFromRecent();
				return false; 
			}
		}
		
		// Matrix Template Checks
		if(tempDesigner.tempType == TemplateDesigner.TEMPLATE_TYPE["Matrix"])
		{
			/* A Non-static Control must have at one Parent Already created */
			var tempDesigner = TemplateDesigner.getTemplateDesigner();
			var parentsList = tempDesigner.objTemplate.getParentsList(parseInt(objPara.row), parseInt(objPara.col));
			if(parentsList==null || parentsList.length<=0)
			{
				alert("Enter a Parent Parameter (i.e. A Label) First (in Left-Upper Part) ..");
				objControlType.resetFromRecent();
				return false; 
			}			
		}
		// Formulated Control Check
		if(controlType == TemplateDesigner.CONTROL_TYPES["Formulated"])
		{
			var tempDesigner = TemplateDesigner.getTemplateDesigner();
			var dependeeList = tempDesigner.objTemplate.getToDependentEligibleList();
			if(dependeeList==null || dependeeList.length<=0)
			{
				//alert("Enter a Numeric Text Box Control First .. \n(For Source Parameter of this Parameter)");
				alert("Enter a Text Box Control First .. \n(For Source Parameter of this Parameter)");
				objControlType.resetFromRecent();
				return false; 
			}			
		}
	}
	return true;
};

ControlsTypeControl.setControlType = function(_controlType)
{
	var objCurCell = TemplateDesigner.getCurrentCellObject();

	if(objCurCell.parameter.controlType != _controlType)
	{
		// Reset Default Value
		objCurCell.parameter.defaultValue="";		
		
		// Reset Parents
		if(objCurCell.parameter.paraParent!="")
		{
			var arrParents = objCurCell.parameter.paraParent.split(TemplateDesigner.SEP_IN_PARA_PARENT);
			for(var k=0; k<arrParents.length; k++)
				Cell.highlightInActive(arrParents[k]);
		}
		objCurCell.parameter.paraParent="";		
		
		// Reset Have Dependents
		objCurCell.parameter.haveDependent=TemplateDesigner.YES_NO_VALUE["No"];
		// have Dependent Para Id if a
		if(objCurCell.parameter.controlType==TemplateDesigner.CONTROL_TYPES["Formulated"])
		{
			var arrSources = objCurCell.parameter.dependentParaId.split(TemplateDesigner.SEP_IN_PARA_DEPENDENTS);
			for(var k=0; k<arrSources.length; k++)
			{
				if(arrSources[k]!="")
				{
					var tempDesigner = TemplateDesigner.getTemplateDesigner();
					var sourcePara = tempDesigner.objTemplate.getSpecifiedCellPara(parseInt(arrSources[k].split("&")[0]),arrSources[k].split("&")[1]);
					HaveDependentControl.resetHaveDepedent(sourcePara, objCurCell.row+"&"+objCurCell.col);
					Cell.highlightInActive(arrSources[k]);
				}
			}
		}
		objCurCell.parameter.dependentParaId="";
	}

	objCurCell.parameter.controlType = _controlType;
	if(_controlType != TemplateDesigner.NO_SELECT)
		objCurCell.haveParameter = TemplateDesigner.YES_NO["Yes"];
	else
		objCurCell.haveParameter = TemplateDesigner.YES_NO["No"];  
};

// Row Control****************
RowControl = function()
{
	this.value = null;
	this.elemContainer = null;
};

RowControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Row Number";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var text = TemplateDesigner.createElement("input",td);
	text.id = "row";
	text.maxLength = "2";
	text.size = "6";
	text.readOnly = "readOnly";
	
	this.elemContainer = text;
};

RowControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.row;
	this.elemContainer.value = 	this.value;
};

RowControl.prototype.getValue = function(_objPara)
{
	_objPara.row = this.elemContainer.value;
};

RowControl.prototype.validate = function()
{
	return true;
};


// Column Control****************
ColumnControl = function()
{
	this.value = null;
	this.elemContainer = null;
};

ColumnControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Column Number";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var text = TemplateDesigner.createElement("input",td);
	text.id = "col";
	text.maxLength = "2";
	text.size = "6";
	text.readOnly = "readOnly";
	
	this.elemContainer = text;	
};

ColumnControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.col;
	this.elemContainer.value = 	this.value;
};

ColumnControl.prototype.getValue = function(_objPara)
{
	_objPara.col = this.elemContainer.value;
};

ColumnControl.prototype.validate = function()
{
	return true;
};
// **** End Parameter Setter ************************




// **** Parent Setter ******************************
ParentSetter = function(_templateType)
{
	this.tempType = _templateType;	
	this.paraParent = null;
	this.active = false;
	
	this.elemContainer = null;
};

ParentSetter.prototype.create = function(_parent)
{
	this.elemContainer = _parent;
	TemplateDesigner.removeAllChildren(_parent);
	this.hide();	
	
	this.paraParent = new ParentControl();
	this.paraParent.create(this.elemContainer);
};

ParentSetter.prototype.activate = function(_objPara)
{
	var tempDesigner = TemplateDesigner.getTemplateDesigner();
	var parentsList = tempDesigner.objTemplate.getParentsList(parseInt(_objPara.row), parseInt(_objPara.col));
	if( _objPara.controlType==TemplateDesigner.NO_SELECT || 
		_objPara.controlType==TemplateDesigner.CONTROL_TYPES["Comment"] ||
		_objPara.controlType==TemplateDesigner.CONTROL_TYPES["Information"] ||
		_objPara.controlType==TemplateDesigner.CONTROL_TYPES["ImageView"] ||
		(this.tempType==TemplateDesigner.TEMPLATE_TYPE["Normal"] && _objPara.controlType==TemplateDesigner.CONTROL_TYPES["Label"]) )
		this.active = false;
	else
		this.active = true;
		
	if(this.active)
	{
		if( this.tempType==TemplateDesigner.TEMPLATE_TYPE["Matrix"] && _objPara.controlType!=TemplateDesigner.CONTROL_TYPES["Label"] )
		 	this.paraParent.showChk=true;
		 else
		 	this.paraParent.showChk=false;
	
		/*if( _objPara.controlType==TemplateDesigner.CONTROL_TYPES["Label"] ||
		 	this.tempType==TemplateDesigner.TEMPLATE_TYPE["Normal"] || 
		 	(this.tempType==TemplateDesigner.TEMPLATE_TYPE["Matrix"] && _objPara.controlType==TemplateDesigner.CONTROL_TYPES["Label"] ) ||
		 	this.tempType==TemplateDesigner.TEMPLATE_TYPE["Consent"] )
		 	this.paraParent.showChk=false;
		 else
		 	this.paraParent.showChk=true;*/
		this.paraParent.createParents(parentsList);
		this.paraParent.setValue(_objPara);		
	}
	else
		this.paraParent.createParents(null);		
	this.activateChildren(_objPara);
	this.show();
};

ParentSetter.prototype.activateChildren = function(_objPara)
{
	var childrenArr = _objPara.getParaChildrenArray();
	if(childrenArr!=null)
	{
		for(var i=0;i<childrenArr.length; i++)
		{
			var paraChild = childrenArr[i];
			Cell.highlightChildren(paraChild.row+"&"+paraChild.col);
		}		
	}
};

ParentSetter.prototype.getValue = function(_objPara)
{
	if(this.active)
		this.paraParent.getValue(_objPara);
	else
		_objPara.paraParent="";
};

ParentSetter.prototype.validate = function()
{
	if(!this.paraParent.validate())	return false;
	return true;
};

ParentSetter.prototype.hide=function()
{
	this.elemContainer.style.display = TemplateDesigner.DISPLAY_TYPE["Hide"];
};

ParentSetter.prototype.show=function()
{
	this.elemContainer.style.display = TemplateDesigner.DISPLAY_TYPE["Show"];	
};

// Parent Control ****************
ParentControl = function()
{
	this.value = null;
	this.elemContainer = null;
	
	this.showChk = false;		
	this.elemParentsContainer = null;
	
	this.elemParents = null;
};

ParentControl.prototype.create=function(_parent)
{
	TemplateDesigner.removeAllChildren(_parent);
	var hidden = TemplateDesigner.createInputElement("hidden", _parent);
	hidden.id = "paraParent";
	this.elemContainer = hidden;
	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	var thead = TemplateDesigner.createElement("thead",tbl);
	
	this.elemParentsContainer = thead;
};

ParentControl.prototype.createParents = function(_parentsList)
{
	TemplateDesigner.removeAllChildren(this.elemParentsContainer);
	if(_parentsList==null)	return;
	else if(_parentsList.length>0)
	{
		
		var tr = TemplateDesigner.createElement("tr",this.elemParentsContainer);	
		var td = TemplateDesigner.createElement("td",tr);
		td.width = "100%";
		td.className = "tdfonthead";
		var div = TemplateDesigner.createElement("div",td);
		div.align = "left";
		div.innerHTML = "Select Parent(s) : ";
		
		tr = TemplateDesigner.createElement("tr",this.elemParentsContainer);	
		td = TemplateDesigner.createElement("td",tr);
		td.width = "100%";
		td.className = "tdfont";
		this.elemParents = new Array(_parentsList.length);

		var intbl = TemplateDesigner.createElement("table",td);
		intbl.width = "100%";
		intbl.border="0";
		intbl.cellpadding="0";
		intbl.cellspacing="0";
		var inthead = TemplateDesigner.createElement("thead",intbl);
		var intr;
		var round=0;
		for(var i=0;i<_parentsList.length;i++)
		{
			if(round==0)
				intr = TemplateDesigner.createElement("tr",inthead);
			
			var intd = TemplateDesigner.createElement("td",intr);
			intd.className = "tdfonthead";
			intd.width="1%";
			var chk;		
			if(this.showChk)
				chk = TemplateDesigner.createInputElement("checkbox", intd);
			else
				chk = TemplateDesigner.createInputElement("radio", intd);
			chk.name = "chkParents";
			chk.value = _parentsList[i].row+"&"+_parentsList[i].col;
			TemplateDesigner.addEvent(chk, "click", ParentControl.evtClickParentChk);
			
			intd = TemplateDesigner.createElement("td",intr);
			intd.width="19%";
			intd.className = "tdfont";
			intd.innerHTML= Parameter.getParameterName(_parentsList[i]);
			
			this.elemParents[i] = chk;
			
			round = (round+1)%5;
		}
		if(round!=0)
			for(var i=round;i<5;i++)
			{
				var intd = TemplateDesigner.createElement("td",intr);
				intd.className = "tdfonthead";
				intd.width="1%";
				intd = TemplateDesigner.createElement("td",intr);
				intd.width="19%";
				intd.className = "tdfont";
			}
	}
};

ParentControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.paraParent;
	this.elemContainer.value = this.value;
	if(_objPara.paraParent!="")
	{
		var parents=_objPara.paraParent.split(TemplateDesigner.SEP_IN_PARA_PARENT);
		for(var i=0;i<parents.length;i++)
		{
			Cell.highlightParent(parents[i]);
			for(var j=0;j<this.elemParents.length;j++)
			{
				if(this.elemParents[j].value==parents[i])
				{
					this.elemParents[j].checked=true;
					break;
				}
			}
		}
	}
};

ParentControl.prototype.getValue = function(_objPara)
{
	_objPara.paraParent = this.elemContainer.value;
};

ParentControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objParentSetter.paraParent;
};

ParentControl.prototype.validate = function()
{
	var tempDesigner = TemplateDesigner.getTemplateDesigner();
	var controlType= ControlsTypeControl.getObject().elemContainer.value;
	
	if(tempDesigner.tempType==TemplateDesigner.TEMPLATE_TYPE["Matrix"] &&
		!(controlType == TemplateDesigner.NO_SELECT 
		|| ControlsTypeControl.isStatic(controlType)) )
	{
		if(this.elemContainer.value=="")
		{
			alert("Select At Least One Parent ... (if there is no Parent, then first enter a Parent)");
			this.elemContainer.focus();
			return false;
		}
	}		
	return true;
};

ParentControl.prototype.canAddParaParentsFromElem = function(elem)
{
	var parentCount=0;
	var parentName="";
	for(var i=0;i<this.elemParents.length;i++)
		if(this.elemParents[i].checked)
		{
			parentCount++;
			var tempDesigner = TemplateDesigner.getTemplateDesigner();
			var objPara = tempDesigner.objTemplate.getSpecifiedCellPara(parseInt(this.elemParents[i].value.split("&")[0]),parseInt(this.elemParents[i].value.split("&")[1]));
			parentName+=Parameter.getParameterName(objPara)+" ";
		}	
	if(parentCount>5)
	{
		alert("Maximum 5 Parents are allowed..");
		return false;
	}
	if(parentName!="")	parentName=parentName.substr(0,parentName.length-1);
	if(parentName.length>TemplateDesigner.PARAMETER_NAME_LENGTH)
	{
		alert("Parameter Name ('"+parentName+"') should be less than "+TemplateDesigner.PARAMETER_NAME_LENGTH+" characters..\n Either Short the Parent Names or the Parents Count");
		return false;
	}
	return true;
};

ParentControl.prototype.addParaParentsFromElem = function(elem)
{
	var val="";
	for(var i=0;i<this.elemParents.length;i++)
		if(this.elemParents[i].checked)
		{
			val+=this.elemParents[i].value+TemplateDesigner.SEP_IN_PARA_PARENT;
			Cell.highlightParent(this.elemParents[i].value);			
		}
		else
			Cell.highlightInActive(this.elemParents[i].value);
	if(val!="")	val=val.substr(0,val.length-1);
	this.elemContainer.value=val;
};

ParentControl.evtClickParentChk = function(evnt)
{
	try
	{
		var elem = TemplateDesigner.getTargetElement(evnt);
		while(elem.name!="chkParents")
		{
			elem=elem.parentNode;
		}
		if(TemplateDesigner.IS_IE && elem.type=="radio")
		{
			if(elem.checked==false)
			{
				var divCon = elem.parentNode;
				while(divCon.tagName!="DIV")
					divCon=divCon.parentNode;
				elem.checked=true;
				var radios = divCon.getElementsByTagName('INPUT');
				for(var i=0;i<radios.length;i++)
				{
					if(radios[i]!=elem)
						radios[i].checked=false; 
				}
			}
		}
		var objParaParent = ParentControl.getObject();
		if(objParaParent.canAddParaParentsFromElem(elem))
			objParaParent.addParaParentsFromElem(elem);
		else
		{
			elem.checked=false;
		}
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

// **** End Parent Setter ************************



// **** Control Setter ************************
//Control Setter
ControlSetter = function(_templateType)
{
	this.tempType = _templateType;
	this.controlType = null;	
	
	this.elemContainer = null;
	this.elemControlsIn = null;

	this.displayValue = null;
	
	this.locationType = null;
	this.colspan = null;

	this.bold = null;
	this.italic = null;
	this.underlined = null;
	this.color = null;
	this.maxlength = null;
	this.colsize=null;
	this.rowsize=null;	
	this.validationFunction = null;
	this.defaultValue = null;
	this.regularExpression = null;
	this.format = null;
	this.formula=null;
	this.info=null;
	this.align = null;
	this.genderType=null;
	this.childPresentation=null;
	this.childPresentationOn=null;
	this.presentation=null;
	this.size=null;
	this.fontsize=null;

	this.isCompulsory = null;
	this.isRange = null;

	this.sourceFlag = null;
	
	this.haveDependent=null;
	this.dependentParaId=null;


	this.imageUpload = null;
	this.blank = null;
};

ControlSetter.prototype.create = function(_parent)
{
	this.elemContainer = _parent;
	this.hide();
	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="1";
	var thead = TemplateDesigner.createElement("thead",tbl);
	this.elemControlsIn = thead;
	
	
	this.displayValue = new DisplayValueControl(this);
	
	this.colspan = new ColspanControl(this);
	this.locationType = new LocationTypeControl(this);

	this.bold = new BoldControl(this);
	this.italic = new ItalicControl(this);
	this.underlined = new UnderlinedControl(this);
	this.color = new ColorControl(this);
	this.maxlength = new MaxlengthControl(this);
	this.colsize = new ColSizeControl(this);
	this.rowsize = new RowSizeControl(this);	
	this.validationFunction = new ValidationFunctionControl(this);
	this.defaultValue = new DefaultValueControl(this);
	this.regularExpression = new RegularExpressionControl(this);
	this.format = new FormatControl(this);
	this.formula = new FormulaControl(this);
	this.info = new InfoControl(this);
	this.align = new AlignControl(this);
	this.genderType = new GenderTypeControl(this);
	this.childPresentation = new ChildPresentationControl(this);
	this.childPresentationOn = new ChildPresentationOnControl(this);
	this.presentation = new PresentationControl(this);
	this.size = new SizeControl(this);
	this.fontsize = new FontSizeControl(this);

	this.isCompulsory = new IsCompulsoryControl(this);
	this.isRange = new IsRangeControl(this);

	this.sourceFlag = new SourceFlagControl(this);

	this.haveDependent=new HaveDependentControl(this);
	this.dependentParaId=new DependentParameterControl(this);
	

	this.imageUpload = new ImageUploadControl(this);
	this.blank = new BlankControl(this);		
};

ControlSetter.prototype.activate = function(_objPara)
{
	var paraArray = new Array(100);
	var i=0;
	this.controlType=_objPara.controlType;
	for(var tc in ControlSetter.TYPE_WISE_PROP[this.tempType][this.controlType] )
		paraArray[i++] = tc;
	for(var fc in ControlSetter.CONTROL_WISE_FIXED_PROP[this.controlType] )
		paraArray[i++] = fc;

	// set Control Setter and Value
	TemplateDesigner.removeAllChildren(this.elemControlsIn);
	var capacity = 0;
	var tr=null;// = TemplateDesigner.createElement("tr",this.elemControlsIn);
	for(var j=0; j<i; j++)
	{		
		var a= paraArray[j];
		if(this[a].occupyCapacity == TemplateDesigner.CAPACITY["Full"] )
		{
			if(capacity == TemplateDesigner.CAPACITY["Half"] )
				this.blank.create(tr);
			capacity = 0;
			this[a].create(this.elemControlsIn);
			tr = TemplateDesigner.createElement("tr",this.elemControlsIn);
		}
		else
		{
			if(capacity == TemplateDesigner.CAPACITY["Full"] || tr==null)
			{
				tr = TemplateDesigner.createElement("tr",this.elemControlsIn);
				capacity = 0;
			}
			this[a].create(tr);
			capacity += this[a].occupyCapacity;
		}
		
		// Value
		if( a!=null && this[a] && this[a].setValue)
				this[a].setValue(_objPara);

		//for( var b in _objPara)
		//{
			//if( a!=null && a == b && this[a] && this[a].setValue)
			//{
				//this[a].setValue(_objPara);
			//}
		//}
	}
	if(capacity == TemplateDesigner.CAPACITY["Half"])
		this.blank.create(tr);
	this.show();
};

ControlSetter.prototype.getValue = function(_objPara)
{
	var paraArray = new Array(100);
	var i=0;
	for(var tc in ControlSetter.TYPE_WISE_PROP[this.tempType][_objPara.controlType] )
		paraArray[i++] = tc;
	for(var fc in ControlSetter.CONTROL_WISE_FIXED_PROP[_objPara.controlType] )
		paraArray[i++] = fc;

	for(var j=0; j<i; j++)
	{		
		var a= paraArray[j];
		if( a!=null && this[a] && this[a].getValue)
			this[a].getValue(_objPara);
	}
};

ControlSetter.prototype.validate = function()
{
	var paraArray = new Array(100);
	var i=0;
	var objControlType = ControlsTypeControl.getObject();
	for(var tc in ControlSetter.TYPE_WISE_PROP[this.tempType][objControlType.elemContainer.value] )
		paraArray[i++] = tc;
	for(var fc in ControlSetter.CONTROL_WISE_FIXED_PROP[objControlType.elemContainer.value] )
		paraArray[i++] = fc;

	for(var j=0; j<i; j++)
	{
		var a= paraArray[j];
		if( a!=null && this[a] && this[a].validate)
			if(!this[a].validate())	return false;
	}
	return true;
};

ControlSetter.prototype.hide=function()
{
	this.elemContainer.style.display = TemplateDesigner.DISPLAY_TYPE["Hide"];
};

ControlSetter.prototype.show=function()
{
	this.elemContainer.style.display = TemplateDesigner.DISPLAY_TYPE["Show"];	
};

	// Controls Setter Classes
// Display Value Control *******************************
DisplayValueControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;
	this.elemContainer = null;
	
	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

DisplayValueControl.prototype.create = function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Display Value";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var text = TemplateDesigner.createElement("input",td);
	text.id = "displayValue";
	text.maxLength="500";
	text.size = "20";
	TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtNotSpecChar);	
	this.elemContainer = text;
};

DisplayValueControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.displayValue;
	this.elemContainer.value = 	this.value;
};

DisplayValueControl.prototype.getValue = function(_objPara)
{
	_objPara.displayValue = this.elemContainer.value;
};

DisplayValueControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objControlSetter.displayValue;
};

DisplayValueControl.prototype.validate = function()
{
	if( this.elemContainer.value == "" )
	{
		alert("Enter Display Value ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};

// Location Type Control ****************************
LocationTypeControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;
	this.elemContainer = null;
	
	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

LocationTypeControl.prototype.create = function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Location";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var select = TemplateDesigner.createElement("select",td);
	select.id = "locationType";
	TemplateDesigner.addEvent(select, "change", LocationTypeControl.evtChangeLocation);
	for(var v in TemplateDesigner.LOCATION_TYPES)
	{
		var opt = TemplateDesigner.createElement("option",select);
		opt.value = TemplateDesigner.LOCATION_TYPES[v];
		opt.innerHTML = v;
	}	
	this.elemContainer = select;
};

LocationTypeControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.locationType;
	this.elemContainer.value = 	this.value;

	// Here in case of Normal & Non Static Control disable the Location Type & Colspan
	var tempDesigner = TemplateDesigner.getTemplateDesigner();
	var controlType = _objPara.controlType;
		
	if(tempDesigner.tempType==TemplateDesigner.TEMPLATE_TYPE["Normal"] && !ControlsTypeControl.isStatic(controlType))
	{
		this.value = TemplateDesigner.LOCATION_TYPES["Cell"];
		this.elemContainer.value=TemplateDesigner.LOCATION_TYPES["Cell"];
		this.elemContainer.disabled = true;
	}
};

LocationTypeControl.prototype.getValue = function(_objPara)
{
	_objPara.locationType = this.elemContainer.value;
};

LocationTypeControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objControlSetter.locationType;
};

LocationTypeControl.prototype.validate = function()
{
	var objColspan = ColspanControl.getObject();
	if(!objColspan.validate())	return false;
	var objPara = TemplateDesigner.getCurrentCellParaObject();
	var r = parseInt(objPara.row);
	var c = parseInt(objPara.col);
	var objTemplate = TemplateDesigner.getTemplateDesigner().objTemplate;
	var objColspan = ColspanControl.getObject();
	
	switch(parseInt(this.elemContainer.value))
	{
		case TemplateDesigner.LOCATION_TYPES["Row"]:
			if(!objTemplate.canRowSpan(r,c))
			{
				alert("Row already have some Parameter... Clear them first...");
				this.elemContainer.focus();
				return false;					
			}
			break;
			
		case TemplateDesigner.LOCATION_TYPES["Half"]:
			//var midCol = parseInt((objTemplate.colCount-1)/2);
			var midCol = parseInt((objTemplate.colCount)/2);
			//if(c<=(midCol+1) && !objTemplate.canSpan(r,c,midCol))
			if(c<=midCol && !objTemplate.canSpan(r,c,midCol))
			{
				//alert("Left Cells (From Column 3 to "+(midCol+1)+") already have some Parameter... \nClear them first...");
				alert("Cells (From Column 2 to "+(midCol)+") are not Empty... \nClear them first...");
				this.elemContainer.focus();
				return false;
			}
			//if(c>(midCol+1) && !objTemplate.canSpan(r,c,objTemplate.colCount-midCol-1) )
			if(c>midCol && !objTemplate.canSpan(r,c,objTemplate.colCount-c+1) )
			{
				//alert("Cells (From Column "+(midCol+3)+" to "+objTemplate.colCount+") already have some Parameter... \nClear them first...");
				alert("Cells (From Column "+(midCol+2)+" to "+objTemplate.colCount+") are not Empty... \nClear them first...");
				this.elemContainer.focus();
				return false;					
			}
			break;
			
		case TemplateDesigner.LOCATION_TYPES["Pair"]:
			if(!objTemplate.canSpan(r,c,2))
			{
				//alert("Pair Cell Column "+(c+1)+" already have some Parameter... \nClear them first...");
				alert("Cell "+(c+1)+" is not Empty... \nClear it first...");
				this.elemContainer.focus();
				return;					
			}
			break;
			
		case TemplateDesigner.LOCATION_TYPES["Custom"]:
			if(!objTemplate.canSpan(r,c,objColspan.elemContainer.value))
			{
				//alert("Cells (From Column "+(c+1)+" to "+(c+objColspan.elemContainer.value)+") already have some Parameter... \nClear them first...");
				alert("Cells (From Column "+(c+1)+" to "+(c+objColspan.elemContainer.value-1)+") are not Empty... \nClear them first...");
				this.elemContainer.focus();
				return;					
			}
			break;
		case TemplateDesigner.LOCATION_TYPES["Cell"]:
			break;
	}
	return true;
};

LocationTypeControl.evtChangeLocation = function(evnt)
{
	try
	{	
		var elem = TemplateDesigner.getTargetElement(evnt);
		while(elem.id!="locationType")
		{
			elem=elem.parentNode;
		}
		var objPara = TemplateDesigner.getCurrentCellParaObject();
		var r = objPara.row;
		var c = objPara.col;
		
		var tempDesigner = TemplateDesigner.getTemplateDesigner();
		var objLocationType = LocationTypeControl.getObject();
		var objTemplate = TemplateDesigner.getTemplateDesigner().objTemplate;
		var objColspan = ColspanControl.getObject();
		var objControlType = ControlsTypeControl.getObject();
		
		var spanCount=1;
		switch(parseInt(elem.value))
		{
			case TemplateDesigner.LOCATION_TYPES["Row"]:
				spanCount=objTemplate.colCount;
				objColspan.activate(true);
				break;
				
			case TemplateDesigner.LOCATION_TYPES["Half"]:
				if(objTemplate.colCount < TemplateDesigner.LOCATION_TYPE_HALF_MINIMUM_COL_LIMIT)
				{
					alert("Columns Count is not sufficient for 'Half' Location...");
					elem.value =objLocationType.value;
					elem.focus();
					return;					
				}				
				//var midCol = parseInt((objTemplate.colCount-1)/2);
				var midCol = parseInt((objTemplate.colCount)/2);				
				/*if(c == 1)
				{
					alert("First Column can't be either Left or Right...");
					elem.value =objLocationType.value;
					elem.focus();
					return;					
				}*/
				if(c<=midCol)	//if(c<=(midCol+1))
				{
					if(c!=1)//2)
					{
						//alert("For 'Left' Location, Please Move to Column 2...");
						alert("For 'Half' Location, Please Move to Column 1 (First Column of Left Half Part)...");
						elem.value =objLocationType.value;
						elem.focus();
						return;
					}
					spanCount=midCol;
				}
				else if(c>midCol)	//if(c>(midCol+1))
				{
					if(c!=(midCol+1))	//if(c!=(midCol+2))
					{
						//alert("For 'Right' Location, Please Move to Column "+(midCol+2)+"...");
						alert("For 'Half' Location, Please Move to Column "+(midCol+1)+" (First Column of Right Half Part)...");
						elem.value =objLocationType.value;
						elem.focus();
						return;
					}
					spanCount=objTemplate.colCount-midCol-1;
				}
				objColspan.activate(true);
				break;
				
			case TemplateDesigner.LOCATION_TYPES["Pair"]:
				if(objTemplate.colCount <TemplateDesigner.LOCATION_TYPE_PAIR_MINIMUM_COL_LIMIT)
				{
					alert("Columns Count is not sufficient for 'Pair' Location...");
					elem.value =objLocationType.value;
					elem.focus();
					return;					
				}
				/*if(c == 1)
				{
					alert("First Column can't be Pair...");
					elem.value =objLocationType.value;
					elem.focus();
					return;					
				}*/
				if(c == objTemplate.colCount)
				{
					alert("Last Column can't be Paired...");
					elem.value =objLocationType.value;
					elem.focus();
					return;
				}
				spanCount=2;
				objColspan.activate(true);
				break;
				
			case TemplateDesigner.LOCATION_TYPES["Custom"]:
				/*if(!ControlsTypeControl.isStatic(objControlType.elemContainer.value) )
				{
					alert("A Non-Static can't be Custom spanned...");
					elem.value =objLocationType.value;
					elem.focus();
					return;					
				}*/
				/*if(c == 1 && (tempDesigner.tempType == TemplateDesigner.TEMPLATE_TYPE["Normal"] || tempDesigner.tempType == TemplateDesigner.TEMPLATE_TYPE["Matrix"]))
				{
					alert("First Column can't be Custom spanned...");
					elem.value =objLocationType.value;
					elem.focus();
					return;					
				}*/
				if(c == objTemplate.colCount)
				{
					alert("Last Column can't be Custom spanned...");
					elem.value =objLocationType.value;
					elem.focus();
					return;					
				}
				spanCount=objColspan.elemContainer.value;
				objColspan.activate(false);
				break;
			case TemplateDesigner.LOCATION_TYPES["Cell"]:
				spanCount=1;
				objColspan.activate(true);
				break;
			default:
				objColspan.activate(true);
		}
		objLocationType.value = elem.value;
		ColspanControl.setColspan(spanCount);
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

// Colspan Control ****************
ColspanControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	
	this.readOnly = true;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

ColspanControl.prototype.create=function(_parent,flag)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Colspan";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var text = TemplateDesigner.createElement("input",td);
	text.id = "colspan";
	text.maxLength = "2";
	text.size = "6";
	TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtValidatePositiveIntegerOnly);	
	TemplateDesigner.addEvent(text, "blur", ColspanControl.evtSetCustomColspan); 
	this.elemContainer = text;
	this.setReadOnly();
};

ColspanControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.colspan;
	this.elemContainer.value = this.value;

	// Here in case of Normal & Non Static Control disable the Location Type & Colspan
	var tempDesigner = TemplateDesigner.getTemplateDesigner();
	var controlType = _objPara.controlType;
	this.readOnly = true;
	if(tempDesigner.tempType==TemplateDesigner.TEMPLATE_TYPE["Normal"] && !ControlsTypeControl.isStatic(controlType))
	{
		this.value = 1;
		this.elemContainer.value=1;
		this.readOnly = true;
	}		
	else if(_objPara.locationType == TemplateDesigner.LOCATION_TYPES["Custom"]) // in case of Customized Location Type Only
		this.readOnly = false;

	ColspanControl.setColspan();
	this.setReadOnly();
};

ColspanControl.setColspan = function(_spanCount)
{
	var objColspan = ColspanControl.getObject();
	if(_spanCount)
	{
		objColspan.elemContainer.value = _spanCount;
	}
	else
	{
		var objControlType = ControlsTypeControl.getObject();
		if(objControlType.elemContainer.value == TemplateDesigner.NO_SELECT)	return;
		if( !ControlsTypeControl.isStatic(objControlType.elemContainer.value))
		{
			if(TemplateDesigner.getTempType() == TemplateDesigner.TEMPLATE_TYPE["Normal"])
				objColspan.elemContainer.value = 2;
		}
		else
			objColspan.elemContainer.value = objColspan.value;
	}
};

ColspanControl.prototype.getValue = function(_objPara)
{
	_objPara.colspan = this.elemContainer.value;
};

ColspanControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objControlSetter.colspan;
};

ColspanControl.prototype.setReadOnly = function()
{
	this.elemContainer.readOnly = this.readOnly;
	this.elemContainer.disabled = this.readOnly;
};

ColspanControl.prototype.activate = function(_flag)
{
	this.readOnly = _flag;
	this.setReadOnly();
};

ColspanControl.prototype.validate = function()
{	
	if(!this.readOnly)
	{
		if(this.elemContainer.value=="")
		{
			alert("Enter Colspan ... ");
			this.elemContainer.focus();
			return false;
		}
		
		var objPara = TemplateDesigner.getCurrentCellParaObject();
		var c = parseInt(objPara.col);		
		var objLocationType = LocationTypeControl.getObject();		
		var objTemplate = TemplateDesigner.getTemplateDesigner().objTemplate;	
		if( this.elemContainer.value <= 0)
		{
			alert("Colspan can't be zero or less...");
			this.elemContainer.focus();
			return false;
		}		
		if( this.elemContainer.value > (objTemplate.colCount-c+1))
		{
			alert("Colspan can't be more than "+(objTemplate.colCount-c+1)+"...");
			this.elemContainer.value = objTemplate.colCount-c+1;
			this.value = objTemplate.colCount-c+1;
			this.elemContainer.focus();
			return false;
		}		
	}
	return true;
};

ColspanControl.evtSetCustomColspan=function(evnt)
{
	try
	{
		var objPara = TemplateDesigner.getCurrentCellParaObject();
		var r = objPara.row;
		var c = objPara.col;
		var objColspan = ColspanControl.getObject();
		var objLocationType = LocationTypeControl.getObject();
		var objTemplate = TemplateDesigner.getTemplateDesigner().objTemplate;
		
		var val = objColspan.elemContainer.value;
		
		if(objLocationType.elemContainer.value == TemplateDesigner.LOCATION_TYPES["Custom"])
		{
			if(val=="")
			{
				alert("Colspan can't be empty ...");
				objColspan.elemContainer.focus();
				return;
			}
			if( val > (objTemplate.colCount-c+1))
			{
				alert("Colspan can't be more than "+(objTemplate.colCount-c+1)+"...");
				objColspan.elemContainer.value = objTemplate.colCount-c+1;
				objColspan.elemContainer.focus();
				return;
			}
		}
		else
		{
			ColspanControl.setColspan();
			objColspan.activate(false);
		}
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

// Bold Control ****************
BoldControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

BoldControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Bold";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var select = TemplateDesigner.createElement("select",td);
	select.id = "bold";
	for(var f in TemplateDesigner.TRUE_FALSE)
	{
		var opt = TemplateDesigner.createElement("option",select);
		opt.value = TemplateDesigner.TRUE_FALSE[f];
		opt.innerHTML=f;
	}				
	this.elemContainer = select;
};

BoldControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.bold;
	this.elemContainer.value = this.value;
};

BoldControl.prototype.getValue = function(_objPara)
{
	_objPara.bold = this.elemContainer.value;
};

BoldControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Select Bold ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};

// Italic Control ****************
ItalicControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

ItalicControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Italic";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var select = TemplateDesigner.createElement("select",td);
	select.id = "italic";
	for(var f in TemplateDesigner.TRUE_FALSE)
	{
		var opt = TemplateDesigner.createElement("option",select);
		opt.value = TemplateDesigner.TRUE_FALSE[f];
		opt.innerHTML=f;
	}				
	this.elemContainer = select;
};

ItalicControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.italic;
	this.elemContainer.value = this.value;
};

ItalicControl.prototype.getValue = function(_objPara)
{
	_objPara.italic = this.elemContainer.value;
};

ItalicControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Select Italic ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};

// Underlined Control **************************
UnderlinedControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

UnderlinedControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Underlined";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var select = TemplateDesigner.createElement("select",td);
	select.id = "underlined";
	for(var f in TemplateDesigner.TRUE_FALSE)
	{
		var opt = TemplateDesigner.createElement("option",select);
		opt.value = TemplateDesigner.TRUE_FALSE[f];
		opt.innerHTML=f;
	}				
	this.elemContainer = select;
};

UnderlinedControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.underlined;
	this.elemContainer.value = this.value;
};

UnderlinedControl.prototype.getValue = function(_objPara)
{
	_objPara.underlined = this.elemContainer.value;
};

UnderlinedControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Select Underlined ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};

// Color Control ***************
ColorControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;
	
	this.elemPickerImage = null;
	this.elemPreview = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

ColorControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Color";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	/*var select = TemplateDesigner.createElement("select",td);
	select.id = "color";
	for(var f in TemplateDesigner.COLOR_CODES)
	{
		var opt = TemplateDesigner.createElement("option",select);
		opt.value = TemplateDesigner.COLOR_CODES[f];
		opt.innerHTML=f;
	}
	TemplateDesigner.addEvent(select, "change", ColorControl.evtSetPreview);
	this.elemContainer = select;*/
	
	var text = TemplateDesigner.createElement("input",td);
	text.id = "color";
	text.readOnly = true;
	text.disabled = true;
	text.size = 10;
	text.className = "colorControlText";
	TemplateDesigner.addEvent(text, "change", ColorControl.evtSetPreview);
	this.elemContainer = text;

	var img = TemplateDesigner.createElement("img",td);
	img.src = "/HIS/hisglobal/images/select_arrow.gif";
	img.id = "colorPickerImg";
	img.title = "Color Picker";
	img.className = "colorControlPickerImage";
	TemplateDesigner.addEvent(img, "mouseover", ColorControl.evtColorImageMouseOver);
	TemplateDesigner.addEvent(img, "mouseout", ColorControl.evtColorImageMouseOut);
	this.elemPickerImage = img;
	ColorPicker.setup({inputField : "color", button : "colorPickerImg", singleClick : true, onUpdate : ColorControl.evtSetPreview });	

	var preview = TemplateDesigner.createElement("label",td);
	preview.id = "colorTabView";
	preview.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
	this.elemPreview = preview;
	ColorControl.evtSetPreview();

};

ColorControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objControlSetter.color;
};

ColorControl.evtSetPreview = function(evnt)
{
	try
	{		
		var objColor = ColorControl.getObject();
		if(objColor)
			objColor.elemPreview.style.backgroundColor = objColor.elemContainer.value;
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};
				
ColorControl.evtColorImageMouseOver = function(evnt)
{
	try
	{
		var objColor = ColorControl.getObject();
		if(objColor)
			objColor.elemPickerImage.src = "/HIS/hisglobal/images/select_arrow_over.gif";
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

ColorControl.evtColorImageMouseOut = function(evnt)
{
	try
	{
		var objColor = ColorControl.getObject();
		if(objColor)
			objColor.elemPickerImage.src = "/HIS/hisglobal/images/select_arrow.gif";
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

ColorControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.color;
	this.elemContainer.value = this.value;
	ColorControl.evtSetPreview();
};

ColorControl.prototype.getValue = function(_objPara)
{
	_objPara.color = this.elemContainer.value;
};

ColorControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Select Color ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};


// Align Control ******************
AlignControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

AlignControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Alignment";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var select = TemplateDesigner.createElement("select",td);
	select.id = "align";
	for(var f in TemplateDesigner.ALIGN)
	{
		var opt = TemplateDesigner.createElement("option",select);
		opt.value = TemplateDesigner.ALIGN[f];
		opt.innerHTML=f;
	}				
	this.elemContainer = select;
};

AlignControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.align;
	this.elemContainer.value = this.value;
};

AlignControl.prototype.getValue = function(_objPara)
{
	_objPara.align = this.elemContainer.value;
};

AlignControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Select Alignment ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};


// Default Value Control ****************
DefaultValueControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

DefaultValueControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Default Value";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var text = TemplateDesigner.createElement("input",td);
	text.id = "defaultValue";
	text.maxLength = "20";
	text.size = "20";
	TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtValidateAlphaNumOnly);//evtNotSpecChar);	
	this.elemContainer = text;
};

DefaultValueControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.defaultValue;
	this.elemContainer.value = this.value;
};

DefaultValueControl.prototype.getValue = function(_objPara)
{
	_objPara.defaultValue = this.elemContainer.value;
};

DefaultValueControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objControlSetter.defaultValue;
};

DefaultValueControl.prototype.validate = function()
{
	var parameterSetter = ParameterSetter.getObject();
	if(this.elemContainer.value!="")
	{		
		switch(parseInt(parameterSetter.controlType.elemContainer.value))
		{
			case TemplateDesigner.CONTROL_TYPES["TextBox"]:
			case TemplateDesigner.CONTROL_TYPES["TextArea"]:
				if(this.elemContainer.value.length > this.controlSetter.maxlength.elemContainer.value)  
				{
					alert("Default Value can't be larger than the Entered Max Length ...");
					this.elemContainer.focus();
					return false;
				}
				var fun=this.controlSetter.validationFunction.elemContainer.value;
				if(fun !="")
				{
					var funFlag=ValidationFunctionControl.functionValidate(this.elemContainer.value,fun);
					if(funFlag==false)
					{
						alert("Entered Default Value is Invalid ... Check Validation Function ...");
						this.elemContainer.focus();
						return false;
					}
				}
				var re=this.controlSetter.regularExpression.elemContainer.value;
				if(re !="")
				{
					var reFlag = ValidationFunctions.validateRegularExpression(this.elemContainer.value,re);
					if(reFlag==false)
					{
						alert("Entered Default Value should satisfy the Regular Expression ...");
						this.elemContainer.focus();
						return false;
					}
				}
				break;
			case TemplateDesigner.CONTROL_TYPES["YesNo"]:
				if(this.elemContainer.value!='yes' && this.elemContainer.value!='no')
				{
					alert("Default Value can only be either 'yes' or 'no' ...");
					this.elemContainer.focus();
					return false;
				}
				break;
			case TemplateDesigner.CONTROL_TYPES["Combo"]:
			case TemplateDesigner.CONTROL_TYPES["Radio"]:
			case TemplateDesigner.CONTROL_TYPES["CheckBox"]:
				var sourceFlag = SourceFlagControl.getObject().elemContainer.value;
				if(sourceFlag == TemplateDesigner.SOURCE_FLAG["Static"])
				{
					var objParaOptions = ParaOptionsControl.getObject();
					if(objParaOptions.validate())
					{
						var validatioFlag = false;
						if(this.elemContainer.value=="")
							validatioFlag = true;
						else						
							for (var i=0;i<objParaOptions.count;i++)
							{
								if(this.elemContainer.value==document.getElementById("optionValue#"+(i+1)).value)
									validatioFlag = true;
							}
						if(!validatioFlag)
						{
							alert("Default Value should be one of the Entered Option Value ...");
							this.elemContainer.focus();
							return false;
						}
					}
				}
				else
				{
					var objTableQuery = TableQueryControl.getObject();
					if(objTableQuery.validate())
					{
						if(this.elemContainer.value!="")
							alert("Ensure Once Again that you entered the Correct Default Value ... ");
					}
				}
				break;
			case TemplateDesigner.CONTROL_TYPES["Duration"]:
				var sourceFlag = SourceFlagControl.getObject().elemContainer.value;
				var defaultValueforDur="";
				if(sourceFlag == TemplateDesigner.SOURCE_FLAG["Static"])
				{
					var objParaOptions = ParaOptionsControl.getObject();
					if(objParaOptions.validate())
					{
						var validatioFlag = false;
						if(this.elemContainer.value=="")
							validatioFlag = true;
						else						
							for (var i=0;i<objParaOptions.count;i++)
							{
								var durVal=document.getElementById("optionValue#"+(i+1)).value;
								if(durVal==this.elemContainer.value.substr(this.elemContainer.value.length-durVal.length,durVal.length))
								{
									validatioFlag = true;
									defaultValueforDur=durVal;
									break;
								}
							}
						if(!validatioFlag)
						{
							alert("Default Value should end with one of the Entered Option Value ...");
							this.elemContainer.focus();
							return false;
						}
					}
				}
				var countVal=this.elemContainer.value.replace(defaultValueforDur,"");
				var defaultValueforCount=countVal.replace(" ","");
				if(defaultValueforCount == "")
				{
					alert("Default Value should start with a Count...");
					this.elemContainer.focus();
					return false;
				}
				if(defaultValueforCount.length > this.controlSetter.maxlength.elemContainer.value)  
				{
					alert("Default Count Value can't be larger than the Entered Max Length ...");
					this.elemContainer.focus();
					return false;
				}
				var fun=this.controlSetter.validationFunction.elemContainer.value;
				if(fun !="")
				{
					var funFlag=ValidationFunctionControl.functionValidate(defaultValueforCount,fun);
					if(funFlag==false)
					{
						alert("Entered Default Count Value is Invalid ... Check Validation Function ...");
						this.elemContainer.focus();
						return false;
					}
				}
				break;
			case TemplateDesigner.CONTROL_TYPES["Date"]:
				if(!DateValidator.validateDate(this.elemContainer.value))
				{
					alert("Entered Default Value should be a Proper & Valid Date in format 'dd-mm-yyyy'...");
					this.elemContainer.focus();
					return false;
				}
				break;
			case TemplateDesigner.CONTROL_TYPES["Time"]:
				if(!TimeValidator.validateTime(this.elemContainer.value))
				{
					alert("Entered Default Value should be a Proper & Valid Time in format 'hh:mm'...");
					this.elemContainer.focus();
					return false;
				}
				break;
		}
	}
	return true;
};


// Maxlength Control *********************
MaxlengthControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

MaxlengthControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Max Length";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var text = TemplateDesigner.createElement("input",td);
	text.id = "maxlength";
	text.maxLength = "4";
	text.size = "6";
	TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtValidatePositiveIntegerOnly);	
	this.elemContainer = text;
};

MaxlengthControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.maxlength;
	this.elemContainer.value = this.value;
};

MaxlengthControl.prototype.getValue = function(_objPara)
{
	_objPara.maxlength = this.elemContainer.value;
};

MaxlengthControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Enter Maxlength ... ");
		this.elemContainer.focus();
		return false;
	}
	if(parseInt(this.elemContainer.value)<=0)
	{
		alert("Maxlength should be greater than zero ... ");
		this.elemContainer.focus();
		return false;
	}
	if(parseInt(this.elemContainer.value)>2000)
	{
		alert("Maxlength should be less than or equal to 2000 ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};


// Validation Function Control **********************
ValidationFunctionControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

ValidationFunctionControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Validation Function";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var select = TemplateDesigner.createElement("select",td);
	select.id = "validationFunction";
	TemplateDesigner.addEvent(select, "change", ValidationFunctionControl.evtChangeValidationFun);
	for(var f in TemplateDesigner.TEXT_VALIDATIONS)
	{
		var opt = TemplateDesigner.createElement("option",select);
		opt.value = TemplateDesigner.TEXT_VALIDATIONS[f];
		opt.innerHTML=f;
	}				
	this.elemContainer = select;
};

ValidationFunctionControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.validationFunction;
	this.elemContainer.value = this.value;
};

ValidationFunctionControl.prototype.getValue = function(_objPara)
{
	_objPara.validationFunction = this.elemContainer.value;
};

ValidationFunctionControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objControlSetter.validationFunction;
};

ValidationFunctionControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Select Validation Function ... ");
		this.elemContainer.focus();
		return false;
	}
	var objControlType = ControlsTypeControl.getObject();
	if(objControlType.value == TemplateDesigner.CONTROL_TYPES["Duration"] && !this.isNumeric() )
	{
		alert("For Duration Validaton Function should be Numeric Type");
		this.elemContainer.focus();
		return false;
	}
	return true;
};

ValidationFunctionControl.prototype.isNumeric = function()
{
	var isNumeric = false;
	var valValiFun = this.elemContainer.value;
	if( valValiFun == TemplateDesigner.TEXT_VALIDATIONS["Numeric"] || 
		valValiFun == TemplateDesigner.TEXT_VALIDATIONS["PositiveNumeric"] || 
		valValiFun == TemplateDesigner.TEXT_VALIDATIONS["IntegersOnly"] || 
		valValiFun == TemplateDesigner.TEXT_VALIDATIONS["PositiveIntegersOnly"])
		isNumeric = true;
	return isNumeric;
};

ValidationFunctionControl.isNumericValue = function(valValiFun)
{
	var isNumeric = false;
	if( valValiFun == TemplateDesigner.TEXT_VALIDATIONS["Numeric"] || 
		valValiFun == TemplateDesigner.TEXT_VALIDATIONS["PositiveNumeric"] ||
		valValiFun == TemplateDesigner.TEXT_VALIDATIONS["IntegersOnly"] || 
		valValiFun == TemplateDesigner.TEXT_VALIDATIONS["PositiveIntegersOnly"])
		isNumeric = true;
	return isNumeric;
};

ValidationFunctionControl.evtChangeValidationFun = function(evnt)
{
	try
	{
		var elem = TemplateDesigner.getTargetElement(evnt);
		while(elem.id!="validationFunction")
			elem=elem.parentNode;

		var objValFun = ValidationFunctionControl.getObject();
		var objControlType = ControlsTypeControl.getObject();
		var objIsRange = IsRangeControl.getObject();
		if(objControlType.value == TemplateDesigner.CONTROL_TYPES["TextBox"] && !objValFun.isNumeric() )
		{
			objIsRange.elemContainer.value = TemplateDesigner.YES_NO_VALUE["No"];
		}		
		if(objControlType.value == TemplateDesigner.CONTROL_TYPES["Duration"] && !objValFun.isNumeric() )
		{
			alert("For Duration Validaton Function should be Numeric Type");
			elem.value=TemplateDesigner.TEXT_VALIDATIONS["None"];
			elem.focus();
			return;
		}
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

ValidationFunctionControl.functionValidate = function(_value,_fun)
{
	return ValidationFunctions.validateValueForFunction(_value,_fun);
};


// Regular Expression Control ********************
RegularExpressionControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

RegularExpressionControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Regular Expression";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var text = TemplateDesigner.createElement("input",td);
	text.id = "regularExpression";
	text.maxLength = "50";
	text.size = "20";
	TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtNotSpecCharRegEx);	
	this.elemContainer = text;
};

RegularExpressionControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.regularExpression;
	this.elemContainer.value = this.value;
};

RegularExpressionControl.prototype.getValue = function(_objPara)
{
	_objPara.regularExpression = this.elemContainer.value;
};

RegularExpressionControl.prototype.validate = function()
{
	if(this.controlSetter.format.elemContainer.value!="" && this.elemContainer.value=="")
	{
		alert("Enter Regular Expression Corresponding to the Format ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};

// Format Control *******************
FormatControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

FormatControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Format";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var text = TemplateDesigner.createElement("input",td);
	text.id = "format";
	text.maxLength = "30";
	text.size = "20";
	TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtValidateAlphaNumOnly);//evtNotSpecChar);	
	this.elemContainer = text;
};

FormatControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.format;
	this.elemContainer.value = this.value;
};

FormatControl.prototype.getValue = function(_objPara)
{
	_objPara.format = this.elemContainer.value;
};

FormatControl.prototype.validate = function()
{
	if(this.controlSetter.regularExpression.elemContainer.value!="" && this.elemContainer.value=="")
	{
		alert("Enter Format Corresponding to given Regular Expression ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};

// Is Compulsory Control *********************
IsCompulsoryControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

IsCompulsoryControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Is Compulsory";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var select = TemplateDesigner.createElement("select",td);
	select.id = "isCompulsory";
	for(var v in TemplateDesigner.YES_NO_VALUE)
	{
		var opt = TemplateDesigner.createElement("option",select);
		opt.value = TemplateDesigner.YES_NO_VALUE[v];
		opt.innerHTML = v;
	}				
	this.elemContainer = select;
};

IsCompulsoryControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.isCompulsory;
	this.elemContainer.value = this.value;
};

IsCompulsoryControl.prototype.getValue = function(_objPara)
{
	_objPara.isCompulsory = this.elemContainer.value;
};

IsCompulsoryControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Enter Is Compulsory ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};


// Is Range Control **********************
IsRangeControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

IsRangeControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Is Range Based";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var select = TemplateDesigner.createElement("select",td);
	select.id = "isRange";
	TemplateDesigner.addEvent(select, "change", IsRangeControl.evtChangeIsRange);
	for(var v in TemplateDesigner.YES_NO_VALUE)
	{
		var opt = TemplateDesigner.createElement("option",select);
		opt.value = TemplateDesigner.YES_NO_VALUE[v];
		opt.innerHTML = v;
	}				
	this.elemContainer = select;
};

IsRangeControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.isRange;
	this.elemContainer.value = this.value;
};

IsRangeControl.prototype.getValue = function(_objPara)
{
	_objPara.isRange = this.elemContainer.value;
};

IsRangeControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objControlSetter.isRange;
};

IsRangeControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Enter Is Range Based ... ");
		this.elemContainer.focus();
		return false;
	}
	if(this.elemContainer.value==TemplateDesigner.YES_NO_VALUE["Yes"])
	{
		var objControlType = ControlsTypeControl.getObject();
		if(objControlType.value != TemplateDesigner.CONTROL_TYPES["TextBox"])
		{
			alert("Only a Text Box can be Range Based ... ");
			this.elemContainer.focus();
			return false;
		}
		else
		{
			var objValiFun = ValidationFunctionControl.getObject();
			if(!objValiFun.isNumeric())
			{
				alert("Only a Numeric Text Box can be Range Based ... ");
				this.elemContainer.focus();
				return false;
			}
		}
	}
	return true;
};

IsRangeControl.evtChangeIsRange = function(evnt)
{
	try
	{		
		var objIsRng = IsRangeControl.getObject();
		if(!objIsRng.validate())
		{
			objIsRng.elemContainer.value = TemplateDesigner.YES_NO_VALUE["No"];
			objIsRng.elemContainer.focus();
		}		
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};


// Source Flag Control ****************************
SourceFlagControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;
	this.occupyCapacity = TemplateDesigner.CAPACITY["Full"];
	
	this.objSourceOptions = null; 
};

SourceFlagControl.prototype.create = function(_parent)
{
	var tr = TemplateDesigner.createElement("tr",_parent);
	
	var td = TemplateDesigner.createElement("td",tr);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Source Flag";
	
	td = TemplateDesigner.createElement("td",tr);
	td.width = "25%";
	td.className = "tdfont";
	
	var select = TemplateDesigner.createElement("select",td);
	select.id = "sourceFlag";
	TemplateDesigner.addEvent(select, "change", SourceFlagControl.evtFillSourceFlag);
	for(var v in TemplateDesigner.SOURCE_FLAG)
	{
		var opt = TemplateDesigner.createElement("option",select);
		opt.value = TemplateDesigner.SOURCE_FLAG[v];
		opt.innerHTML = v;
	}
	this.elemContainer = select;
	
	td = TemplateDesigner.createElement("td",tr);
	td.width = "25%";
	td.className = "tdfonthead";
	
	td = TemplateDesigner.createElement("td",tr);
	td.width = "25%";
	td.className = "tdfont";
	
	this.objSourceOptions = new SourceOptionsControl(this);
	tr = TemplateDesigner.createElement("tr",_parent);	 
	this.objSourceOptions.create(tr);
};

SourceFlagControl.prototype.setValue = function(_objPara)
{
	if(!_objPara)
	{
		var _objPara = TemplateDesigner.getCurrentCellParaObject();
		this.value = this.elemContainer.value ;
		this.objSourceOptions.fill();
		this.objSourceOptions.setValue(_objPara);
	}
	else
	{
		this.value = _objPara.sourceFlag;
		if(_objPara.controlType==TemplateDesigner.CONTROL_TYPES["Duration"])
		{
			this.value=TemplateDesigner.SOURCE_FLAG["Static"];
			this.elemContainer.disabled = true;
		}	
		this.elemContainer.value = this.value;
		this.objSourceOptions.fill();
		this.objSourceOptions.setValue(_objPara);
	}
};

SourceFlagControl.prototype.getValue = function(_objPara)
{
	_objPara.sourceFlag = this.elemContainer.value;
	this.objSourceOptions.getValue(_objPara);
};

SourceFlagControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objControlSetter.sourceFlag;
};

SourceFlagControl.evtFillSourceFlag = function(evnt)
{
	try
	{
		var objSourceFlag = SourceFlagControl.getObject();
		objSourceFlag.setValue();	
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

SourceFlagControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Select Source Flag ... ");
		this.elemContainer.focus();
		return false;
	}
	if(!this.objSourceOptions.validate())
		return false;
	return true;
};


// Source Options Control ****************
SourceOptionsControl = function(_objSourceFlag)
{
	this.objSourceFlag = _objSourceFlag;
	this.elemContainer = null;

	this.objParaOptions = null; 
	this.objTableQuery = null;
};

SourceOptionsControl.prototype.create =function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.colSpan = "4";
	td.width = "100%";
	
	var div = TemplateDesigner.createElement("div", td);
	div.id = "divSourceOptions";
	this.elemContainer = div;
	
	this.objParaOptions = new ParaOptionsControl(this); 
	this.objTableQuery = new TableQueryControl(this);
};

SourceOptionsControl.prototype.fill = function()
{
	if(this.objSourceFlag.elemContainer.value == TemplateDesigner.SOURCE_FLAG["Static"])
		this.objParaOptions.create(this.elemContainer);
	else
		this.objTableQuery.create(this.elemContainer);
};

SourceOptionsControl.prototype.setValue = function(_objPara)
{
	if(this.objSourceFlag.elemContainer.value == TemplateDesigner.SOURCE_FLAG["Static"])
		this.objParaOptions.setValue(_objPara); 
	else
		this.objTableQuery.setValue(_objPara);
};

SourceOptionsControl.prototype.getValue = function(_objPara)
{
	if(this.objSourceFlag.elemContainer.value == TemplateDesigner.SOURCE_FLAG["Static"])
		this.objParaOptions.getValue(_objPara); 
	else
		this.objTableQuery.getValue(_objPara);
};

SourceOptionsControl.prototype.validate = function()
{
	if(this.objSourceFlag.elemContainer.value == TemplateDesigner.SOURCE_FLAG["Static"])
		return this.objParaOptions.validate(); 
	else
		return this.objTableQuery.validate();
};


// Parameter Options Control ********************
ParaOptionsControl = function(_objSourceOptions)
{
	this.objSourceOptions = _objSourceOptions;
	
	this.elemContainer = null;

	this.value = null;	
	
	this.elemOptContainer = null;
	this.elemParaOptions = null;
	this.count = 1;
	this.moreOptions=true;
	
	this.arrValues = [""];
	this.arrTexts = [""];	
};

ParaOptionsControl.prototype.create=function(_parent)
{
	TemplateDesigner.removeAllChildren(_parent);
	this.elemContainer = _parent;
	var hidden = TemplateDesigner.createInputElement("hidden", _parent);
	hidden.id = "paraOptions";
	this.elemParaOptions = hidden;

	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.id = "tblParaOptions";
	tbl.width = "100%";
	tbl.border = "0";
	tbl.cellspacing = "1";
	tbl.cellpadding = "0";

	var thead = TemplateDesigner.createElement("thead",tbl);
	this.elemOptContainer = thead;
};

ParaOptionsControl.prototype.createOptions = function()
{
	var thead = this.elemOptContainer;
		
	if(this.count >= 1)
	{
		var tr = TemplateDesigner.createElement("tr",thead);
		var td = TemplateDesigner.createElement("td",tr);
		td.width = "25%";
		td.className = "tdfonthead";
		td.innerHTML = "Enter Options";
		
		td = TemplateDesigner.createElement("td",tr);
		td.width = "25%";
		td.className = "tdfonthead";
		td.innerHTML = "Value&nbsp;&nbsp;";
		
		var text = TemplateDesigner.createElement("input",td);
		text.id = "optionValue#1";
		text.value = this.arrValues[0];
		text.maxLength = "50";
		text.size = "20";
		TemplateDesigner.addEvent(text, "change", ParaOptionsControl.evtSetCorresspondingOption);
		TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtNotSpecChar);	
		
		td = TemplateDesigner.createElement("td",tr);
		td.width = "25%";
		td.className = "tdfonthead";
		td.innerHTML = "Text&nbsp;&nbsp;";

		text = TemplateDesigner.createElement("input",td);
		text.id = "optionText#1";
		text.value = this.arrTexts[0];
		text.maxLength = "50";
		text.size = "20";
		TemplateDesigner.addEvent(text, "change", ParaOptionsControl.evtSetCorresspondingOption);
		TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtNotSpecChar);	

		td = TemplateDesigner.createElement("td",tr);
		td.width = "25%";
		td.className = "tdfonthead";
		
		if(this.moreOptions)
		{
			var buttonPlus = TemplateDesigner.createInputElement("button", td);
			buttonPlus.value=" + ";
			var buttonMinus = TemplateDesigner.createInputElement("button", td);
			buttonMinus.value=" - ";

			td.innerHTML = "1&nbsp;&nbsp;&nbsp;&nbsp;";
			td.appendChild(buttonPlus);
			td.appendChild(buttonMinus);
			TemplateDesigner.addEvent(buttonPlus, "click", ParaOptionsControl.evtAddOptionRow);
			TemplateDesigner.addEvent(buttonMinus, "click", ParaOptionsControl.evtSubOptionRow);
		}
	}
	if(this.moreOptions)
	{
		for(var i=1;i<this.count;i++)
		{
			this.createNewRow(i, this.arrValues[i], this.arrTexts[i]);
		}
	}
};

ParaOptionsControl.prototype.createNewRow = function(i,val,txt)
{
	tr = TemplateDesigner.createElement("tr",this.elemOptContainer);
	td = TemplateDesigner.createElement("td",tr);
	td.width = "25%";
	td.className = "tdfonthead";
	
	td = TemplateDesigner.createElement("td",tr);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Value&nbsp;&nbsp;";
	
	text = TemplateDesigner.createElement("input",td);
	text.id = "optionValue#"+(i+1);
	text.value = val;
	text.maxLength = "50";
	text.size = "20";
	TemplateDesigner.addEvent(text, "change", ParaOptionsControl.evtSetCorresspondingOption);
	TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtNotSpecChar);	
	
	td = TemplateDesigner.createElement("td",tr);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Text&nbsp;&nbsp;";

	text = TemplateDesigner.createElement("input",td);
	text.id = "optionText#"+(i+1);
	text.value = txt;
	text.maxLength = "50";
	text.size = "20";
	TemplateDesigner.addEvent(text, "change", ParaOptionsControl.evtSetCorresspondingOption);
	TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtNotSpecChar);	

	td = TemplateDesigner.createElement("td",tr);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = (i+1)+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
};

ParaOptionsControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.paraOptions;

	var controlType = _objPara.controlType;
	if(	controlType==TemplateDesigner.CONTROL_TYPES["Combo"] 
		|| controlType==TemplateDesigner.CONTROL_TYPES["Radio"] 
		|| controlType==TemplateDesigner.CONTROL_TYPES["Duration"])
		this.moreOptions = true;
	else if(controlType==TemplateDesigner.CONTROL_TYPES["CheckBox"])
		this.moreOptions = false;

	if(controlType==TemplateDesigner.CONTROL_TYPES["Duration"] && this.value=="")
	{
		for(var f in TemplateDesigner.DEFAULT_DURATIONS)
		{
			this.value+= TemplateDesigner.DEFAULT_DURATIONS[f] + TemplateDesigner.SEP_IN_PARA_OPTIONS_LABEL_VALUE;
			this.value+= f + TemplateDesigner.SEP_IN_PARA_OPTIONS;
		}				
		if(this.value!="")	this.value=this.value.substr(0,this.value.length-TemplateDesigner.SEP_IN_PARA_OPTIONS.length);
	} 
	this.elemContainer.value = this.value;

	this.count=1;
	if(this.value != "")
	{
		var arr=this.value.split(TemplateDesigner.SEP_IN_PARA_OPTIONS);
		if(this.moreOptions) this.count = arr.length;
		this.arrValues = new Array(this.count);
		this.arrTexts = new Array(this.count);
		for (var i=0; i<this.count; i++)
		{
			this.arrValues[i] = arr[i].split(TemplateDesigner.SEP_IN_PARA_OPTIONS_LABEL_VALUE)[0];
			this.arrTexts[i] = arr[i].split(TemplateDesigner.SEP_IN_PARA_OPTIONS_LABEL_VALUE)[1];
		}
	}	
	this.createOptions();	
};

ParaOptionsControl.prototype.getValue = function(_objPara)
{
	var val="";
	for(var i=0; i<this.count; i++)
	{
		val+=document.getElementById("optionValue#"+(i+1)).value + TemplateDesigner.SEP_IN_PARA_OPTIONS_LABEL_VALUE;
		val+=document.getElementById("optionText#"+(i+1)).value + TemplateDesigner.SEP_IN_PARA_OPTIONS;
	}
	if(val!="")	val=val.substr(0,val.length-1);
	this.value = val;
	if(_objPara)
		_objPara.paraOptions=val;
	else
		return val;
};

ParaOptionsControl.evtSetCorresspondingOption = function(evnt)
{
	try
	{
		var elem = TemplateDesigner.getTargetElement(evnt);		
		var name=elem.id;
		if(/Value/.test(name)) name=name.replace(/Value/,'Text');
		else if(/Text/.test(name))name=name.replace(/Text/,'Value');
		if(document.getElementById(name).value=="")
			document.getElementById(name).value=elem.value;
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

ParaOptionsControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	var objSourceFlag = objDesigner.objControlSetter.sourceFlag;
	return objSourceFlag.objSourceOptions.objParaOptions;
};

ParaOptionsControl.evtAddOptionRow = function(evnt)
{
	try
	{
		var objParaOptions = ParaOptionsControl.getObject();
		if(objParaOptions.moreOptions)
		{
			objParaOptions.count++;
			objParaOptions.createNewRow( objParaOptions.count-1,"","");
		}
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

ParaOptionsControl.evtSubOptionRow = function(evnt)
{
	try
	{
		var objParaOptions = ParaOptionsControl.getObject();
		if(objParaOptions.count>1)
		{
			objParaOptions.count--;
			var elem = objParaOptions.elemOptContainer;
			elem.removeChild(elem.lastChild);
		}
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

ParaOptionsControl.prototype.validate = function()
{
	for (var i=0;i<this.count;i++)
	{
		if(document.getElementById("optionValue#"+(i+1)).value=="")
		{
			alert("Enter Value for Option "+(i+1)+" ...");
			document.getElementById("optionValue#"+(i+1)).focus();
			return false;
		}
		if(document.getElementById("optionText#"+(i+1)).value=="")
		{
			alert("Enter Text for Option "+i+" ...");
			document.getElementById("optionText#"+(i+1)).focus();
			return false;
		}
	}
	if(this.getValue().length>TemplateDesigner.PARAMETER_STATIC_OPTIONS_LENGTH)
	{
		alert("Entered Options has increased the Limit.. \nPlease delete some options or shorten them  ...");
		document.getElementById("optionValue#"+(1)).focus();
		return false;
	}
	return true;
};

// Table Query Control ************************
TableQueryControl = function(_objSourceOptions)
{
	this.objSourceOptions = _objSourceOptions;
	
	this.elemContainer = null;
	this.value = null;	
};

TableQueryControl.prototype.create = function(_parent)
{
	TemplateDesigner.removeAllChildren(_parent);
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.id = "tblTableQuery";
	tbl.width = "100%";
	tbl.border = "0";
	tbl.cellspacing = "1";
	tbl.cellpadding = "0";

	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);
	var td = TemplateDesigner.createElement("td",tr);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Table Query";
		
	td = TemplateDesigner.createElement("td",tr);
	td.width = "75%";
	td.className = "tdfont";
		
	var text = TemplateDesigner.createElement("input",td);
	text.id = "tableQuery";
	text.maxLength = 500;
	text.size = 90;
	TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtNotSpecChar);
	this.elemContainer = text;

	tr = TemplateDesigner.createElement("tr",thead);
	td = TemplateDesigner.createElement("td",tr);
	td.width = "100%";
	td.colSpan = "2";
	td.className = "tdfont";
	td.innerHTML = "<p>The query should be complete in itself with two Facts keeping in mind :   "+
				"<br>i) Query should return two columns in which First Column will map to 'Value' field and Second Column will map to 'Text' field of the Combo"+
				"<br>ii) There should be one '?' mark in Where Clause where Hospital Code will be placed.   "+
				"<br>Syntax:  (e.g.)  SELECT &lt;Value-Field&gt;,&lt;Text-Filed&gt; FROM &lt;Table-List&gt; WHERE &lt;Condition Before&gt; &lt;Hospital Code = ? &gt; &lt;Condition After&gt;  "+
				"<br> Ex. Department List ->  SELECT GNUM_DEPT_CODE, INITCAP(GSTR_DEPT_NAME) FROM GBLT_DEPARTMENT_MST WHERE TRUNC(SYSDATE) BETWEEN TRUNC(GDT_EFFECTIVE_FRM) AND TRUNC(NVL(GDT_EFFECTIVE_TO,SYSDATE)) "+
				"AND GNUM_HOSPITAL_CODE=? AND GNUM_ISVALID=1 ORDER BY INITCAP(GSTR_DEPT_NAME) </p>";
};

TableQueryControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.tableQuery;
	this.elemContainer.value = this.value;
};

TableQueryControl.prototype.getValue = function(_objPara)
{
	this.value = this.elemContainer.value;
	if(_objPara)
		_objPara.tableQuery=this.elemContainer.value;
	else
		return this.elemContainer.value;
};

TableQueryControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	var objSourceFlag = objDesigner.objControlSetter.sourceFlag;
	return objSourceFlag.objSourceOptions.objTableQuery;
};

TableQueryControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Enter Table Query ... ");
		this.elemContainer.focus();
		return false;9810966244
	}
	return true;
};


// Have Dependent Control ****************
HaveDependentControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;
	this.elemContainer = null;	// Have Dependent Flag (Hidden)
	
	this.elemSELHaveCorress = null;	// Select for Selection of Corresponding Parameter 

	this.elemTDFormulatedParamters = null;	// For Showing formulated Control

	this.elemTBLContainerCorresponding = null;	// For Dependent & Formula Container

	this.objDependentParaId = null;		// Object Dependent Select
	this.elemTDDependentControl = null;	// TD Container
	this.elemDependentParaId = null;	// elem DependentId
		
	this.objFormula = null;					// Object Formula
	this.elemTHEADFormulaControl = null;	// THEAD Container
	
	this.occupyCapacity = TemplateDesigner.CAPACITY["Full"];
};

HaveDependentControl.prototype.create = function(_parent)
{
	var tr = TemplateDesigner.createElement("tr",_parent);
	
	var td = TemplateDesigner.createElement("td",tr);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Corresponding Formula Dependent?";
	
	td = TemplateDesigner.createElement("td",tr);
	td.width = "25%";
	td.className = "tdfont";

	var hidden = TemplateDesigner.createInputElement("hidden", td);
	hidden.id = "haveDependent";
	this.elemContainer = hidden;

		// Corresponding Selection
	var select = TemplateDesigner.createElement("select",td);
	select.id = "haveCorrespondingDepen";
	TemplateDesigner.addEvent(select, "change", HaveDependentControl.evtChangeHaveCorress);
	for(var v in TemplateDesigner.YES_NO_VALUE)
	{
		var opt = TemplateDesigner.createElement("option",select);
		opt.value = TemplateDesigner.YES_NO_VALUE[v];
		opt.innerHTML = v;
	}	
	this.elemSELHaveCorress = select;

	// Dependent Paramters List
	td = TemplateDesigner.createElement("td",tr);
	td.width = "50%";
	td.colSpan = "2";
	td.className = "tdfonthead";
	this.elemTDFormulatedParamters = td;
	
		
	// For Corresponding Parameter Selection
	tr = TemplateDesigner.createElement("tr",_parent);
	td = TemplateDesigner.createElement("td",tr);
	td.width = "100%";
	td.colSpan = "4";

	var tbl = TemplateDesigner.createElement("table", td);
	tbl.width="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	tbl.style.display = TemplateDesigner.DISPLAY_TYPE["Hide"];
	this.elemTBLContainerCorresponding = tbl;
	var thead = TemplateDesigner.createElement("thead",tbl);
	this.elemTHEADFormulaControl = thead;

	tr = TemplateDesigner.createElement("tr",thead);
	td = TemplateDesigner.createElement("td",tr);
	td.width = "100%";
	td.colSpan = "4";
	this.elemTDDependentControl = td;
	hidden = TemplateDesigner.createInputElement("hidden", td);
	hidden.id = "dependentParaId";
	this.elemDependentParaId = hidden;	
	
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;	

		// Dependent Corresponding Formula
	this.objDependentParaId = objDesigner.objControlSetter.dependentParaId;
	this.objDependentParaId.elemContainer = hidden;	
	this.objDependentParaId.create(this.elemTDDependentControl, this);
		
		// Formula Control	
	this.objFormula = objDesigner.objControlSetter.formula;
	this.objFormula.create(this.elemTHEADFormulaControl);
};

HaveDependentControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.haveDependent;
	this.elemContainer.value = this.value;
	
	this.showFormulatedParamtersName(_objPara.dependentParaId);

	this.elemSELHaveCorress.value = TemplateDesigner.YES_NO_VALUE["No"];	
	if(_objPara.dependentParaId!="")
	{
		var arrDependents = _objPara.dependentParaId.split(TemplateDesigner.SEP_IN_PARA_DEPENDENTS);
		if(arrDependents.length==5)
		{
			this.elemSELHaveCorress.value = TemplateDesigner.YES_NO_VALUE["Yes"];
			this.setCorresspondingDependent(true);
		}
		else
			this.setCorresspondingDependent(false);
	}
	this.elemDependentParaId.value = _objPara.dependentParaId;
	this.objDependentParaId.setValue(_objPara);
	
	this.objFormula.setValue(_objPara);
};

HaveDependentControl.prototype.showFormulatedParamtersName = function(_dependentParaId)
{
	var arrDependents = _dependentParaId.split(TemplateDesigner.SEP_IN_PARA_DEPENDENTS);
	var dependentsCount = 0;
	for(var k=0; k<arrDependents.length; k++)
	{
		if(k!=4 && arrDependents[k]!="")	dependentsCount++;
	}
	var h="";
	if(dependentsCount>0)
	{
		h = "Formulated Parameters: ";
		var tempDesigner = TemplateDesigner.getTemplateDesigner();
		for(var k=0; k<arrDependents.length; k++)
		{
			if(k!=4 && arrDependents[k]!="")
			{
				var objPara = tempDesigner.objTemplate.getSpecifiedCellPara(parseInt(arrDependents[k].split("&")[0]),parseInt(arrDependents[k].split("&")[1]));
				h+=" "+(k+1)+". <b>"+Parameter.getParameterName(objPara)+"</b>  ";
				// HighLight Dependent Formulated Parameter Cell
				Cell.highlightFormulatedDependent(arrDependents[k]);
			}
		}
	}
	this.elemTDFormulatedParamters.innerHTML = h;
};

HaveDependentControl.prototype.getValue = function(_objPara)
{
	_objPara.haveDependent = this.elemContainer.value;
	//_objPara.dependentParaId = this.elemDependentParaId.value;
	this.objDependentParaId.getValue(_objPara);
	
	this.objFormula.getValue(_objPara);
};

HaveDependentControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objControlSetter.haveDependent;
};

HaveDependentControl.prototype.validate = function()
{
	if(this.elemSELHaveCorress.value == TemplateDesigner.YES_NO_VALUE["Yes"])
	{
		if(!this.objDependentParaId.validate())
			return false;
		if(!this.objFormula.validate())
			return false;
	}
	return true;
};

HaveDependentControl.prototype.setCorresspondingDependent = function(_mode)
{
	if(_mode)
	{
		this.elemTBLContainerCorresponding.style.display = TemplateDesigner.DISPLAY_TYPE["Show"];
	}
	else
	{
		this.objDependentParaId.resetCorrespondingValue();
		this.objFormula.resetValue();
		this.elemTBLContainerCorresponding.style.display = TemplateDesigner.DISPLAY_TYPE["Hide"];
	}
};

HaveDependentControl.resetHaveDepedent = function(_objPara, _val) // Formulated
{
	var arrDependents = _objPara.dependentParaId.split(TemplateDesigner.SEP_IN_PARA_DEPENDENTS);
	// Resetting Dependent IDs
	var dependentsIds = "";
	for(var k=0; k<arrDependents.length; k++)
	{
		if(k!=4 && arrDependents[k]!="" && _val!="" && arrDependents[k]==_val)
		{
			dependentsIds+= "" + TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
			_val="";
		}
		else
			dependentsIds+= arrDependents[k] + TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
	}
	if(dependentsIds!="")	dependentsIds = dependentsIds.substr(0,dependentsIds.length-TemplateDesigner.SEP_IN_PARA_DEPENDENTS.length);
	
	// Rearranging the dependentsIds Values
	arrDependents = dependentsIds.split(TemplateDesigner.SEP_IN_PARA_DEPENDENTS);
	var dCount=0;
	dependentsIds = "";
	for(var k=0; k<arrDependents.length; k++)
		if(k!=4 && arrDependents[k]!="")
		{
			dependentsIds += arrDependents[k] + TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
			dCount++;
		}
	if(arrDependents.length==5 && arrDependents[4]!="")
	{
		if(dCount<4)
			for(var i=0; i<5-dCount-1; i++)
				dependentsIds += TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
		dependentsIds += arrDependents[4];
	}
	else
		if(dependentsIds!="")	dependentsIds = dependentsIds.substr(0,dependentsIds.length-TemplateDesigner.SEP_IN_PARA_DEPENDENTS.length);
	
	// Setting Values
	if(dependentsIds=="")	_objPara.haveDependent = TemplateDesigner.YES_NO_VALUE["No"];
	_objPara.dependentParaId = dependentsIds;
	return true;
};

HaveDependentControl.setHaveDepedent = function(_objPara, _val) // Formulated
{
	var arrDependents = _objPara.dependentParaId.split(TemplateDesigner.SEP_IN_PARA_DEPENDENTS);
	var dependentsCount = 0;
	for(var k=0; k<arrDependents.length; k++)
	{
		if(k!=4 && arrDependents[k]!="")	dependentsCount++;
	}
	if(_objPara.haveDependent == TemplateDesigner.YES_NO_VALUE["Yes"])
	{
		if(dependentsCount==4)
		{
			alert("This Parameter already have 4 Dependent Formulated Parameter which is Maximum Limit..");
			return false;
		}
	}
	
	// Setting Dependent IDs
	var dependentsIds = "";
	for(var k=0; k<arrDependents.length; k++)
	{
		if(k!=4 && arrDependents[k]=="" && _val!="")
		{
			dependentsIds+= _val + TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
			_val="";
		}
		else
			dependentsIds+= arrDependents[k] + TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
	}
	if(_val!="")	dependentsIds+= _val + TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
	if(dependentsIds!="")	dependentsIds = dependentsIds.substr(0,dependentsIds.length-TemplateDesigner.SEP_IN_PARA_DEPENDENTS.length);

	// Rearranging the dependentsIds Values
	arrDependents = dependentsIds.split(TemplateDesigner.SEP_IN_PARA_DEPENDENTS);
	var dCount=0;
	dependentsIds = "";
	for(var k=0; k<arrDependents.length; k++)
		if(k!=4 && arrDependents[k]!="")
		{
			dependentsIds += arrDependents[k] + TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
			dCount++;
		}
	if(arrDependents.length==5)
	{
		if(dCount<4)
			for(var i=0; i<5-dCount-1; i++)
				dependentsIds += TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
		dependentsIds += arrDependents[4];
	}
	else
		if(dependentsIds!="")	dependentsIds = dependentsIds.substr(0,dependentsIds.length-TemplateDesigner.SEP_IN_PARA_DEPENDENTS.length);

	// Setting Values
	_objPara.haveDependent = TemplateDesigner.YES_NO_VALUE["Yes"];
	_objPara.dependentParaId = dependentsIds;
	return true;
};

HaveDependentControl.prototype.setCorrespondingDependent = function(_val) // Corresponding
{
	var arrDependents = this.elemDependentParaId.value.split(TemplateDesigner.SEP_IN_PARA_DEPENDENTS);
	// Rearranging & Setting the Corresponding Dependent
	var dCount=0;
	var dependentsIds = "";
	for(var k=0; k<arrDependents.length; k++)
		if(k!=4 && arrDependents[k]!="")
		{
			dependentsIds += arrDependents[k] + TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
			dCount++;
		}
	if(_val!="")
	{
		if(dCount<4)
			for(var i=0; i<5-dCount-1; i++)
				dependentsIds += TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
		dependentsIds += _val;
	}
	else
		if(dependentsIds!="")	dependentsIds = dependentsIds.substr(0,dependentsIds.length-TemplateDesigner.SEP_IN_PARA_DEPENDENTS.length);

	// Setting Values
	this.elemContainer.value = TemplateDesigner.YES_NO_VALUE["No"];
	if(dependentsIds!="")	this.elemContainer.value = TemplateDesigner.YES_NO_VALUE["Yes"];
	this.elemDependentParaId.value = dependentsIds;
};

HaveDependentControl.evtChangeHaveCorress = function(evnt)
{
	try
	{	
		var elem = TemplateDesigner.getTargetElement(evnt);
		while(elem.id!="haveCorrespondingDepen")
		{
			elem=elem.parentNode;
		}
		
		var objHaveDependent = HaveDependentControl.getObject();
		if(elem.value == TemplateDesigner.YES_NO_VALUE["Yes"])
		{
			if(objHaveDependent.objDependentParaId.elemToDependents==null)
			{
				alert("No Parameter exists for Corresponding Formula.. \n Please first create a Textbox ..");
				elem.value = TemplateDesigner.YES_NO_VALUE["No"];
				return;
			}		
			objHaveDependent.setCorresspondingDependent(true);
		}
		else if(elem.value == TemplateDesigner.YES_NO_VALUE["No"])
		{
			objHaveDependent.setCorresspondingDependent(false);
		}
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};


// Formula Control *******************
FormulaControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;
	this.formulaOutput = null;
	this.elemContainerFormulaOutput = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Full"];
	
	this.isDependent = true;
};

FormulaControl.formulaDependentVariables = ["X","Y","Z","U","W"];
FormulaControl.formulaCorrespondingVariable = "V";

FormulaControl.prototype.create=function(_parent)
{
	var tr = TemplateDesigner.createElement("tr",_parent);
	var td = TemplateDesigner.createElement("td",tr);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Formula";
	
	td = TemplateDesigner.createElement("td",tr);
	td.colSpan = "3";
	td.width = "75%";
	td.className = "tdfont";
	
	var text = TemplateDesigner.createElement("input",td);
	text.id = "formula";
	text.maxLength = "50";
	text.size = "50";
	//TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtValidateFormulaOnly);	
	this.elemContainer = text;

	//td = TemplateDesigner.createElement("td",tr);
	//td.width = "10%";
	//td.className = "tdfont";
	
	var select = TemplateDesigner.createElement("select",td);
	select.id = "formulaOutput";
	for(var v in TemplateDesigner.FORMULA_OUTPUT_TYPES)
	{
		var opt = TemplateDesigner.createElement("option",select);
		opt.value = TemplateDesigner.FORMULA_OUTPUT_TYPES[v];
		opt.innerHTML = v;
	}	
	this.elemContainerFormulaOutput = select;

	var tr = TemplateDesigner.createElement("tr",_parent);
	var td = TemplateDesigner.createElement("td",tr);
	td.width = "100%";
	td.className = "tdfont";
	td.colSpan = 4;
	
	var i=0;
	for(var v in TemplateDesigner.FORMULA_MATH_FUNCTIONS)
	{
		i++;
		var bold = TemplateDesigner.createElement("b",td);
		bold.id = TemplateDesigner.FORMULA_MATH_FUNCTIONS[v];
		bold.innerHTML = "<font color='#0000ff'>"+v+"</font>";
		bold.style.cursor = "pointer";
		bold.title = TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP[TemplateDesigner.FORMULA_MATH_FUNCTIONS[v]];
		TemplateDesigner.addEvent(bold, "click", FormulaControl.evtClickPut);
		var italic = TemplateDesigner.createElement("i",td);
		if(i==10)
			italic.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>";
		else
			italic.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	/*var htmlCode = "";
	
	for(var v in TemplateDesigner.FORMULA_MATH_FUNCTIONS)
	{
		htmlCode += "<b id='" + TemplateDesigner.FORMULA_MATH_FUNCTIONS[v] + "' title='"
			+ TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP[TemplateDesigner.FORMULA_MATH_FUNCTIONS[v]] 
			+ "' onclick='FormulaControl.evtClickPut(event)'><font color='#0000ff'>"
			+ v + "</font></b>&nbsp;&nbsp;&nbsp;";
	}
	td.innerHTML = "<div>" + htmlCode + "</div>";*/
};

FormulaControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.formula;
	this.elemContainer.value = this.value;

	this.formulaOutput = _objPara.formulaOutput;
	this.elemContainerFormulaOutput.value = this.formulaOutput;
	
	if(_objPara.controlType==TemplateDesigner.CONTROL_TYPES["TextBox"])
	{
		TemplateDesigner.addEvent(this.elemContainer, "keypress", ValidationFunctions.evtValidateCorrespondingFormulaOnly);
		this.isDependent = false;
	}
	else
	{
		TemplateDesigner.addEvent(this.elemContainer, "keypress", ValidationFunctions.evtValidateFormulaOnly);
		this.isDependent = true;
	}
};

FormulaControl.prototype.resetValue = function()
{
	this.value = "";
	this.elemContainer.value = this.value;

	this.formulaOutput = TemplateDesigner.FORMULA_OUTPUT_TYPES["None"];
	this.elemContainerFormulaOutput.value = this.formulaOutput;
};

FormulaControl.prototype.getValue = function(_objPara)
{
	_objPara.formula = this.elemContainer.value;
	_objPara.formulaOutput = this.elemContainerFormulaOutput.value;
};

FormulaControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objControlSetter.formula;
};

FormulaControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Enter Formula ... ");
		this.elemContainer.focus();
		return false;
	}
	
	var objDependentControl = DependentParameterControl.getObject();
	var finalFormula = this.elemContainer.value;
	if(this.isDependent)
	{
		for(var i=0; i<objDependentControl.count; i++)
		{
			if(this.elemContainer.value.search(FormulaControl.formulaDependentVariables[i])==-1)
			{
				//alert("Formula must contain at least one 'X' where to put the value of Source Parameter ... \n e.g. (X*3+10)/30");
				alert("Formula must contain at least one '"+FormulaControl.formulaDependentVariables[i]+"' where to put the value of Source Parameter ...");
				this.elemContainer.focus();
				return false;
			}
		}
		for(var i=0; i<objDependentControl.count; i++)
		{
			while(finalFormula.search(FormulaControl.formulaDependentVariables[i])!=-1)
			{
				finalFormula = finalFormula.replace(FormulaControl.formulaDependentVariables[i],"5");
			}
		}
	}
	else
	{
		if(this.elemContainer.value.search(FormulaControl.formulaCorrespondingVariable)==-1)
		{
			alert("Formula must contain at least one '"+FormulaControl.formulaCorrespondingVariable+"' where to put the value of Corresponding Parameter ...");
			this.elemContainer.focus();
			return false;
		}
		while(finalFormula.search(FormulaControl.formulaCorrespondingVariable)!=-1)
		{
			finalFormula = finalFormula.replace(FormulaControl.formulaCorrespondingVariable,"5");
		}
	}
	
	var result;
	try
	{
		result = eval(finalFormula);
	}
	catch(e)
	{
		result=false;
	}
	if((typeof result).toUpperCase()=="BOOLEAN" && result==false)
	{
		alert("Invalid Formula  ... \n Enter a Valid Expression for Formula");
		this.elemContainer.focus();
		return false;
	}
	var res="";
	res = result;
	if((typeof result).toUpperCase()=="NUMBER" && (res=="NaN" || res=="Infinity"))
	{
		alert("Invalid Formula  ... \n Enter a Valid Expression ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};

FormulaControl.evtClickPut = function(evnt)
{
	try
	{
		var elem = TemplateDesigner.getTargetElement(evnt);
		while(elem.tagName.toUpperCase()!="B")
			elem=elem.parentNode;
			
		var objFormula = FormulaControl.getObject();
		objFormula.elemContainer.value = objFormula.elemContainer.value + TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT[elem.id];
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

// Dependent Parameter Control ****************

DependentParameterControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Full"];
	
	this.objHaveDependent = null;	// For Corresponding Control
	this.IsCorrespondong = false;	// For Corresponding Control

	this.elemToDependentsContainer = null; // dependentParaIds
 	this.elemToDependents = null;
	this.count = 0;
};

DependentParameterControl.prototype.create = function(_parent, _objHaveDependent)
{	
	var td = null;

	this.objHaveDependent = null;
	this.IsCorrespondong = false;
	this.count = 0;
	if(_objHaveDependent && typeof _objHaveDependent != 'undefined')
	{
		this.objHaveDependent = _objHaveDependent;
		this.IsCorrespondong = true;
	}
	if(this.IsCorrespondong==false)
	{
		var tr = TemplateDesigner.createElement("tr",_parent);
		td = TemplateDesigner.createElement("td",tr);
		td.width = "100%";
		td.colSpan = "4";
		var hidden = TemplateDesigner.createInputElement("hidden", td);
		hidden.id = "dependentParaId";
		this.elemContainer = hidden;
	}
	else if(this.IsCorrespondong==true)
	{
		td = _parent;
	}
	
	var tbl = TemplateDesigner.createElement("table",td);
	tbl.width="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	var thead = TemplateDesigner.createElement("thead",tbl);
	
	this.elemToDependentsContainer = thead;
};

DependentParameterControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.dependentParaId;
	this.elemContainer.value = this.value;
	this.fillDependee();
	this.selectDependee();
};

DependentParameterControl.prototype.resetCorrespondingValue = function()
{
	if(this.elemContainer.value!="")
	{
		var arrDependents = this.elemContainer.value.split(TemplateDesigner.SEP_IN_PARA_DEPENDENTS);
		if(arrDependents.length==5)
		{
			this.count = 0;
			var dependentsIds ="";
			for(var k=0; k<arrDependents.length; k++)
				if(k!=4 && arrDependents[k]!="") dependentsIds+= arrDependents[k] + TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
			if(dependentsIds!="")	dependentsIds = dependentsIds.substr(0,dependentsIds.length-TemplateDesigner.SEP_IN_PARA_DEPENDENTS.length);
			this.elemContainer.value = dependentsIds;
		}
	}	
	this.fillDependee();
	this.selectDependee();
};

DependentParameterControl.prototype.fillDependee = function()
{
	TemplateDesigner.removeAllChildren(this.elemToDependentsContainer);
		
	var tempDesigner = TemplateDesigner.getTemplateDesigner();
	var dependees = tempDesigner.objTemplate.getToDependentEligibleList();

	if(dependees!=null && dependees.length>0 )
	{
		var tr = TemplateDesigner.createElement("tr",this.elemToDependentsContainer);	
		var td = TemplateDesigner.createElement("td",tr);
		td.width = "100%";
		td.className = "tdfonthead";

		var div = TemplateDesigner.createElement("div",td);
		div.align = "left";
		
		if(this.IsCorrespondong==false)
			div.innerHTML = "Select Source Parameter : ";
		else if(this.IsCorrespondong==true)
			div.innerHTML = "Select Parameter : ";

		tr = TemplateDesigner.createElement("tr",this.elemToDependentsContainer);	
		td = TemplateDesigner.createElement("td",tr);
		td.width = "100%";
		td.className = "tdfont";
		this.elemToDependents = new Array(dependees.length);

		var intbl = TemplateDesigner.createElement("table",td);
		intbl.width = "100%";
		intbl.border="0";
		intbl.cellpadding="0";
		intbl.cellspacing="0";
		var inthead = TemplateDesigner.createElement("thead",intbl);
		var intr;
		var round=0;
		for(var i=0;i<dependees.length;i++)
		{
			if(round==0)
				intr = TemplateDesigner.createElement("tr",inthead);
			
			var intd = TemplateDesigner.createElement("td",intr);
			intd.className = "tdfonthead";
			intd.width="1%";
			
			intd = TemplateDesigner.createElement("td",intr);
			intd.className = "tdfonthead";
			intd.width="1%";
			var chk = TemplateDesigner.createInputElement("checkbox", intd);
			chk.name = "chkDependee";
			chk.value = dependees[i].row+"&"+dependees[i].col;
			TemplateDesigner.addEvent(chk, "click", DependentParameterControl.evtClickDependeeChk);

			intd = TemplateDesigner.createElement("td",intr);
			intd.width="18%";
			intd.className = "tdfont";
			intd.innerHTML= Parameter.getParameterName(dependees[i]);
			
			this.elemToDependents[i] = chk;
			
			round = (round+1)%5;
		}
		if(round!=0)
			for(var i=round;i<5;i++)
			{
				var intd = TemplateDesigner.createElement("td",intr);
				intd.className = "tdfonthead";
				intd.width="1%";
				intd = TemplateDesigner.createElement("td",intr);
				intd.className = "tdfonthead";
				intd.width="1%";
				intd = TemplateDesigner.createElement("td",intr);
				intd.width="18%";
				intd.className = "tdfont";
			}
	}
};

DependentParameterControl.prototype.selectDependee = function()
{
	if(this.elemContainer.value!="")
	{
		for(var i=0; i<this.elemToDependents.length; i++)
		{
			var parentTD = this.elemToDependents[i].parentNode;
			var previousTD = parentTD.previousSibling;
			previousTD.innerHTML="";				
			Cell.highlightInActive(this.elemToDependents[i].value);
		}
		if(this.IsCorrespondong==false)
		{
			var arrSources = this.elemContainer.value.split(TemplateDesigner.SEP_IN_PARA_DEPENDENTS);
			this.count = arrSources.length;
			for(var k=0; k<arrSources.length; k++)
			{
				for(var i=0; i<this.elemToDependents.length; i++)
				{
					if(arrSources[k]==this.elemToDependents[i].value)
					{
						this.elemToDependents[i].checked=true;
						var parentTD = this.elemToDependents[i].parentNode;
						var previousTD = parentTD.previousSibling;
						previousTD.innerHTML="<b><font color='#0000FF'>("+FormulaControl.formulaDependentVariables[k]+")</font></b>";
						Cell.highlightFormulaSource(this.elemToDependents[i].value);
					}
				}
			}
		}
		else if(this.IsCorrespondong==true)
		{
			var arrDependents = this.elemContainer.value.split(TemplateDesigner.SEP_IN_PARA_DEPENDENTS);
			if(arrDependents.length==5)
			{
				this.count = 1;
				for(var i=0; i<this.elemToDependents.length; i++)
				{
					if(arrDependents[4]==this.elemToDependents[i].value)
					{
						this.elemToDependents[i].checked=true;
						var parentTD = this.elemToDependents[i].parentNode;
						var previousTD = parentTD.previousSibling;
						previousTD.innerHTML="<b><font color='#0000FF'>("+FormulaControl.formulaCorrespondingVariable+")</font></b>";
						Cell.highlightCorrespondingDependent(this.elemToDependents[i].value);
					}
				}
			}
		}
	}
};

DependentParameterControl.prototype.getValue = function(_objPara)
{
	this.getSelectedDependee();
	_objPara.dependentParaId = this.elemContainer.value;
};

DependentParameterControl.prototype.getSelectedDependee = function()
{
	var sourcesIds ="";
	var count = 0;
	if(this.elemToDependents!=null)
	{
		for(var i=0; i<this.elemToDependents.length; i++)
		{
			var parentTD = this.elemToDependents[i].parentNode;
			var previousTD = parentTD.previousSibling;
			previousTD.innerHTML="";				
			if(this.elemToDependents[i].checked)
			{
				sourcesIds+=this.elemToDependents[i].value+TemplateDesigner.SEP_IN_PARA_DEPENDENTS;
				if(this.IsCorrespondong==false)
				{
					previousTD.innerHTML="<b><font color='#0000FF'>("+FormulaControl.formulaDependentVariables[count]+")</font></b>";
					Cell.highlightFormulaSource(this.elemToDependents[i].value);
				}
				else if(this.IsCorrespondong==true)
				{
					previousTD.innerHTML="<b><font color='#0000FF'>("+FormulaControl.formulaCorrespondingVariable+")</font></b>";
					Cell.highlightCorrespondingDependent(this.elemToDependents[i].value);
				}
				count++;
			}
			else
				Cell.highlightInActive(this.elemToDependents[i].value);
		}
	}
	if(sourcesIds!="")	sourcesIds = sourcesIds.substr(0,sourcesIds.length-TemplateDesigner.SEP_IN_PARA_DEPENDENTS.length);
	
	if(this.IsCorrespondong==false)
		this.elemContainer.value = sourcesIds;
	else if(this.IsCorrespondong==true)
	{
		this.objHaveDependent.setCorrespondingDependent(sourcesIds);
	}	
	this.value = this.elemContainer.value;
	this.count = count;
};

DependentParameterControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objControlSetter.dependentParaId;
};

DependentParameterControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Select Source Parameter ... ");
		this.elemToDependents[0].focus();
		return false;
	}
	return true;
};

DependentParameterControl.prototype.setSelectedDependee = function(elem)
{
	if(this.IsCorrespondong==false)
	{
		if(this.count==5)
		{
			alert("Maximum 5 Sources are allowed..");
			return false;
		}
		var tempDesigner = TemplateDesigner.getTemplateDesigner();
		var sourcePara = tempDesigner.objTemplate.getSpecifiedCellPara(parseInt(elem.value.split("&")[0]),elem.value.split("&")[1]);
		var paraCurrent = TemplateDesigner.getCurrentCellParaObject();
		if(!HaveDependentControl.setHaveDepedent(sourcePara, paraCurrent.row+"&"+paraCurrent.col) )
			return false;
	}
	else if(this.IsCorrespondong==true)
	{
		if(this.count==1)
		{
			alert("Already Selected a Parameter..");
			return false;
		}
	}
	this.getSelectedDependee();
	return true;
};

DependentParameterControl.prototype.resetSelectedDependee = function(elem)
{
	if(this.IsCorrespondong==false)
	{
		var tempDesigner = TemplateDesigner.getTemplateDesigner();
		var sourcePara = tempDesigner.objTemplate.getSpecifiedCellPara(parseInt(elem.value.split("&")[0]),elem.value.split("&")[1]);
		var paraCurrent = TemplateDesigner.getCurrentCellParaObject();
		HaveDependentControl.resetHaveDepedent(sourcePara, paraCurrent.row+"&"+paraCurrent.col);
	}
	this.getSelectedDependee();
	return true;
};

DependentParameterControl.evtClickDependeeChk = function(evnt)
{
	try
	{
		var elem = TemplateDesigner.getTargetElement(evnt);
		while(elem.name!="chkDependee")
		{
			elem=elem.parentNode;
		}
		if(TemplateDesigner.IS_IE && elem.type.toLowerCase()=="radio")
		{
			if(elem.checked==false)
			{
				var divCon = elem.parentNode;
				while(divCon.tagName!="DIV")
					divCon=divCon.parentNode;
				elem.checked=true;
				var radios = divCon.getElementsByTagName('INPUT');
				for(var i=0;i<radios.length;i++)
				{
					if(radios[i]!=elem)
						radios[i].checked=false; 
				}
			}
		}
		var objDependentParaId = DependentParameterControl.getObject();
		if(elem.checked==true)
		{
			if(!objDependentParaId.setSelectedDependee(elem))
			{
				elem.checked = false;
			}
		}
		else
		{
			objDependentParaId.resetSelectedDependee(elem);
		}		
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};


// Information Control *******************
InfoControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

InfoControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Information";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var select = TemplateDesigner.createElement("select",td);
	select.id = "info";
	var opt = TemplateDesigner.createElement("option",select);
	opt.value="";
	opt.innerHTML="Select Value";
	var options = document.getElementById('informationList').innerHTML.split("#");
	for(var i=0,j=1;i<options.length && j<options.length;i=i+2,j=j+2)
	{
		opt = TemplateDesigner.createElement("option",select);
		opt.value=options[i];
		opt.innerHTML=options[j];
	}
	this.elemContainer = select;
};

InfoControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.info;
	this.elemContainer.value = this.value;
};

InfoControl.prototype.getValue = function(_objPara)
{
	_objPara.info = this.elemContainer.value;
};

InfoControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Select Information ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};


// ColSize Control *********************
ColSizeControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

ColSizeControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Column Size";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var text = TemplateDesigner.createElement("input",td);
	text.id = "colsize";
	text.maxLength = "3";
	text.size = "6";
	TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtValidatePositiveIntegerOnly);	
	this.elemContainer = text;
};

ColSizeControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.colsize;
	this.elemContainer.value = this.value;
};

ColSizeControl.prototype.getValue = function(_objPara)
{
	_objPara.colsize = this.elemContainer.value;
};

ColSizeControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Enter Column Size ... ");
		this.elemContainer.focus();
		return false;
	}
	if(parseInt(this.elemContainer.value)<=0)
	{
		alert("Column Size should be greater than zero ... ");
		this.elemContainer.focus();
		return false;
	}
	if(parseInt(this.elemContainer.value)>200)
	{
		alert("Column Size should be less than or equal to 200 ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};


// RowSize Control *********************
RowSizeControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

RowSizeControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Row Size";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var text = TemplateDesigner.createElement("input",td);
	text.id = "rowsize";
	text.maxLength = "3";
	text.size = "6";
	TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtValidatePositiveIntegerOnly);	
	this.elemContainer = text;
};

RowSizeControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.rowsize;
	this.elemContainer.value = this.value;
};

RowSizeControl.prototype.getValue = function(_objPara)
{
	_objPara.rowsize = this.elemContainer.value;
};

RowSizeControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Enter Row Size ... ");
		this.elemContainer.focus();
		return false;
	}
	if(parseInt(this.elemContainer.value)<=0)
	{
		alert("Row Size shold be greater than zero ... ");
		this.elemContainer.focus();
		return false;
	}
	if(parseInt(this.elemContainer.value)>20)
	{
		alert("Row Size should be less than or equal to 20 ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};


// Gender Type Control ******************
GenderTypeControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

GenderTypeControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Gender";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var select = TemplateDesigner.createElement("select",td);
	select.id = "genderType";
	for(var f in TemplateDesigner.GENDER_TYPES)
	{
		var opt = TemplateDesigner.createElement("option",select);
		opt.value = TemplateDesigner.GENDER_TYPES[f];
		opt.innerHTML=f;
	}				
	this.elemContainer = select;
};

GenderTypeControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.genderType;
	this.elemContainer.value = this.value;
};

GenderTypeControl.prototype.getValue = function(_objPara)
{
	_objPara.genderType = this.elemContainer.value;
};

GenderTypeControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Select Gender Type ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};


// Children Presentation Control ****************************
ChildPresentationControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;
	
	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

ChildPresentationControl.prototype.create = function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Child Presentation";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var select = TemplateDesigner.createElement("select",td);
	select.id = "childPresentation";
	TemplateDesigner.addEvent(select, "change", ChildPresentationControl.evtChangeChildPresentation);
	for(var f in TemplateDesigner.CHILD_PRESENTATIONS)
	{
		var opt = TemplateDesigner.createElement("option",select);
		opt.value = TemplateDesigner.CHILD_PRESENTATIONS[f];
		opt.innerHTML=f;
	}				
	this.elemContainer = select;
};

ChildPresentationControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.childPresentation;
	this.elemContainer.value = 	this.value;
};

ChildPresentationControl.prototype.getValue = function(_objPara)
{
	_objPara.childPresentation = this.elemContainer.value;
};

ChildPresentationControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objControlSetter.childPresentation;
};

ChildPresentationControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Select Child Presentation ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};

ChildPresentationControl.prototype.resetFromRecent = function()
{
	this.elemContainer.value = this.value;
	this.elemContainer.focus();
};

ChildPresentationControl.evtChangeChildPresentation = function(evnt)
{
	try
	{
		var elem = TemplateDesigner.getTargetElement(evnt);
		while(elem.id!="childPresentation")
			elem=elem.parentNode;
		var childPresentation = elem.value;
		
		var tempDesigner = TemplateDesigner.getTemplateDesigner();
		var objChildPresentation = ChildPresentationControl.getObject();
		var objChildPresentationOn = ChildPresentationOnControl.getObject();
		
		if(tempDesigner.tempType==TemplateDesigner.TEMPLATE_TYPE["Normal"] 
			&& (childPresentation==TemplateDesigner.CHILD_PRESENTATIONS["HideOn"] || childPresentation==TemplateDesigner.CHILD_PRESENTATIONS["ShowOn"]))
		{
			alert("In Normal Tempates, Children Presentation can't be Hide or Show...");
			objChildPresentation.resetFromRecent();
			return;
		}
		objChildPresentation.value = childPresentation;	
		objChildPresentationOn.setChildPresentationOn();	
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};


// Child Presenation On Control ****************
ChildPresentationOnControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	
	this.readOnly = true;
	this.value = null;	
	
	this.tdElemContainer = null;
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

ChildPresentationOnControl.prototype.create = function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Presentation On";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	this.tdElemContainer = td;	
};

ChildPresentationOnControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.childPresentationOn;
	this.setChildPresentationOn(this.value);
};

ChildPresentationOnControl.prototype.setChildPresentationOn = function(_value)
{
	var controlType= ControlsTypeControl.getObject().elemContainer.value;
	var childPresentation = ChildPresentationControl.getObject().elemContainer.value;

	TemplateDesigner.removeAllChildren(this.tdElemContainer);
	if(typeof _value == 'undefined')	_value="";
	if(childPresentation == TemplateDesigner.CHILD_PRESENTATIONS["Normal"])	_value="";
	
	this.readOnly = true;
	switch(parseInt(controlType))
	{
		case TemplateDesigner.CONTROL_TYPES["Combo"]:
		case TemplateDesigner.CONTROL_TYPES["Radio"]:
			var text = TemplateDesigner.createElement("input",this.tdElemContainer);
			text.id = "childPresentationOn";
			text.maxLength = "20";
			text.size = "20";
			TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtValidateAlphaNumOnly);//evtNotSpecChar);	
			this.elemContainer = text;
			this.readOnly = false;
			break;
		case TemplateDesigner.CONTROL_TYPES["YesNo"]:
			var select = TemplateDesigner.createElement("select",this.tdElemContainer);
			select.id = "childPresentationOn";
			var opt = TemplateDesigner.createElement("option",select);
			opt.value = "yes";
			opt.innerHTML="Yes";
			opt = TemplateDesigner.createElement("option",select);
			opt.value = "no";
			opt.innerHTML="No";
			this.elemContainer = select;
			if(_value != "no")	_value = "yes";
			this.readOnly = false;
			break;
		case TemplateDesigner.CONTROL_TYPES["CheckBox"]:
			var text = TemplateDesigner.createElement("input",this.tdElemContainer);
			text.id = "childPresentationOn";				
			text.maxLength = "20";
			text.size = "20";
			this.elemContainer = text;			
			_value="checked";
			this.readOnly = true;
			break;
	}
	this.elemContainer.value = _value;
	// Cases of Disability on Child Presentation
	if(childPresentation == TemplateDesigner.CHILD_PRESENTATIONS["Normal"])
		this.readOnly = true;
	this.setReadOnly();
};

ChildPresentationOnControl.prototype.getValue = function(_objPara)
{
	_objPara.childPresentationOn = this.elemContainer.value;
};

ChildPresentationOnControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objControlSetter.childPresentationOn;
};

ChildPresentationOnControl.prototype.setReadOnly = function()
{
	this.elemContainer.readOnly = this.readOnly;
	this.elemContainer.disabled = this.readOnly;
};

ChildPresentationOnControl.prototype.validate = function()
{
	if(!this.readOnly)
	{
		if(this.elemContainer.value=="")
		{
			alert("Select Presentation On Value... ");
			this.elemContainer.focus();
			return false;
		}
		
		var controlType = ControlsTypeControl.getObject().elemContainer.value;
		switch(parseInt(controlType))
		{
			case TemplateDesigner.CONTROL_TYPES["Combo"]:
			case TemplateDesigner.CONTROL_TYPES["Radio"]:
				var sourceFlag = SourceFlagControl.getObject().elemContainer.value;
				if(sourceFlag == TemplateDesigner.SOURCE_FLAG["Static"])
				{
					var objParaOptions = ParaOptionsControl.getObject();
					if(objParaOptions.validate())
					{
						var validationFlag = false;
						if(this.elemContainer.value=="")
							validationFlag = true;
						for (var i=0;i<objParaOptions.count;i++)
						{
							if(this.elemContainer.value==document.getElementById("optionValue#"+(i+1)).value)
								validationFlag = true;
						}
						if(!validationFlag)
						{
							alert("Presentation Value should be one of the Entered Option Value ...");
							this.elemContainer.focus();
							return false;
						}
					}
				}
				else
				{
					var objTableQuery = TableQueryControl.getObject();
					if(objTableQuery.validate())
					{
						if(this.elemContainer.value!="")
							alert("Ensure Once Again that you entered the Correct Presentation Value ... ");
					}
				} 
				break;
			case TemplateDesigner.CONTROL_TYPES["YesNo"]:
				if(this.elemContainer.value!='yes' && this.elemContainer.value!='no')
				{
					alert("Select Presentation On Value... ");
					this.elemContainer.focus();
					return false;
				}
				break;
		}
	}
	return true;
};

// Presentation Control ****************
PresentationControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

PresentationControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Default Presentation";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var select = TemplateDesigner.createElement("select",td);
	select.id = "presentation";
	TemplateDesigner.addEvent(select, "change", PresentationControl.evtChangePresentation);
	for(var f in TemplateDesigner.PRESENTATION_TYPES)
	{
		var opt = TemplateDesigner.createElement("option",select);
		opt.value = TemplateDesigner.PRESENTATION_TYPES[f];
		opt.innerHTML=f;
	}				
	this.elemContainer = select;
};

PresentationControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.presentation;
	this.elemContainer.value = this.value;
};

PresentationControl.prototype.getValue = function(_objPara)
{
	_objPara.presentation = this.elemContainer.value;
};

PresentationControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objControlSetter.presentation;
};

PresentationControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Select Presentation ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};

PresentationControl.prototype.resetFromRecent = function()
{
	this.elemContainer.value = this.value;
	this.elemContainer.focus();
};

PresentationControl.evtChangePresentation = function(evnt)
{
	try
	{
		var elem = TemplateDesigner.getTargetElement(evnt);
		while(elem.id!="presentation")
			elem=elem.parentNode;
		var presentation = elem.value;
		
		var tempDesigner = TemplateDesigner.getTemplateDesigner();
		var objPara = TemplateDesigner.getCurrentCellParaObject();
		var objPresentation = PresentationControl.getObject();
		
		if(tempDesigner.tempType==TemplateDesigner.TEMPLATE_TYPE["Normal"] && presentation==TemplateDesigner.PRESENTATION_TYPES["Hidden"])
		{
			alert("In Normal Tempates, Default Presentation can't be hidden...");
			objPresentation.resetFromRecent();
			return;
		}
		objPresentation.value = presentation;		
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};


// Size Control *********************
SizeControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;	
	this.elemContainer = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

SizeControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Size";
	
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
	
	var text = TemplateDesigner.createElement("input",td);
	text.id = "size";
	text.maxLength = "2";
	text.size = "6";
	TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtValidatePositiveIntegerOnly);	
	this.elemContainer = text;
};

SizeControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.size;
	this.elemContainer.value = this.value;
};

SizeControl.prototype.getValue = function(_objPara)
{
	_objPara.size = this.elemContainer.value;
};

SizeControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Enter Size ... ");
		this.elemContainer.focus();
		return false;
	}
	if(parseInt(this.elemContainer.value)<=0)
	{
		alert("Size should be greater than zero ... ");
		this.elemContainer.focus();
		return false;
	}
	if(parseInt(this.elemContainer.value)>99)
	{
		alert("Size should be less than or equal to 99 ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};


// FontSize Control *********************
FontSizeControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;
	this.language = null;	
	this.elemContainer = null;
	this.elemContainerLang = null;

	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};

FontSizeControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Font Size : ";
	
	var text = TemplateDesigner.createElement("input",td);
	text.id = "fontsize";
	text.maxLength = "2";
	text.size = "3";
	TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtValidatePositiveIntegerOnly);	
	this.elemContainer = text;

	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Language : ";
	
	var select = TemplateDesigner.createElement("select",td);
	select.id = "language";
	for(var f in TemplateDesigner.LANGUAGE)
	{
		var opt = TemplateDesigner.createElement("option",select);
		opt.value = TemplateDesigner.LANGUAGE[f];
		opt.innerHTML=f;
	}				
	this.elemContainerLang = select;
};

FontSizeControl.prototype.setValue = function(_objPara)
{
	this.language = TemplateDesigner.LANGUAGE["English"];
	var splitted = _objPara.fontsize.split(TemplateDesigner.SEP_IN_FONT_SIZE_LANG);	
	this.value = splitted[0];	
	if(splitted.length>1 && (splitted[1]==TemplateDesigner.LANGUAGE["English"] || splitted[1]==TemplateDesigner.LANGUAGE["Hindi"]) )
		this.language = splitted[1];
	else if (_objPara.language && _objPara.language!=null 
		&& (_objPara.language==TemplateDesigner.LANGUAGE["English"] || _objPara.language==TemplateDesigner.LANGUAGE["Hindi"]))
		this.language = _objPara.language; 
	
	this.elemContainer.value = this.value;
	this.elemContainerLang.value = this.language;
};

FontSizeControl.prototype.getValue = function(_objPara)
{
	_objPara.fontsize = this.elemContainer.value;// + TemplateDesigner.SEP_IN_FONT_SIZE_LANG + this.elemContainerLang.value;
	if(_objPara.language)	_objPara.language = this.elemContainerLang.value;
	else	_objPara.fontsize = this.elemContainer.value + TemplateDesigner.SEP_IN_FONT_SIZE_LANG + this.elemContainerLang.value;
};

FontSizeControl.prototype.validate = function()
{
	if(this.elemContainer.value=="")
	{
		alert("Enter Font Size ... ");
		this.elemContainer.focus();
		return false;
	}
	if(parseInt(this.elemContainer.value)<=0)
	{
		alert("Font Size shold be greater than zero ... ");
		this.elemContainer.focus();
		return false;
	}
	if(parseInt(this.elemContainer.value)>99)
	{
		alert("Font Size should be less than or equal to 99 ... ");
		this.elemContainer.focus();
		return false;
	}
	return true;
};


// Image Upload Control *******************************
ImageUploadControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.value = null;
	this.defaultValue = "";
	this.elemContainer = null;
	this.elemImageUpload = null;
	this.elemTdImageUpload = null;
		
	this.imageAttached = false;
	
	this.occupyCapacity = TemplateDesigner.CAPACITY["Full"];
};

ImageUploadControl.prototype.create = function(_parent)
{
	var tr = TemplateDesigner.createElement("tr",_parent);

	var td = TemplateDesigner.createElement("td",tr);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Image Title";
	
	td = TemplateDesigner.createElement("td",tr);
	td.width = "25%";
	td.className = "tdfont";
	
	var text = TemplateDesigner.createElement("input",td);
	text.id = "displayValue";
	text.maxLength="500";
	text.size = "20";
	TemplateDesigner.addEvent(text, "keypress", ValidationFunctions.evtNotSpecChar);	
	this.elemContainer = text;

	td = TemplateDesigner.createElement("td",tr);
	td.width = "25%";
	td.className = "tdfonthead";
	td.innerHTML = "Attach Image &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	
	var img = TemplateDesigner.createElement("img",td);
	img.src = "/HIS/hisglobal/images/nodeClose.gif";
	img.border = 0;
	img.title = "Attach Image";
	img.style.cursor = "pointer";
	TemplateDesigner.addEvent(img, "click", ImageUploadControl.evtUploadImage);//submitToUpload(event);
	this.elemImageUpload = img;	

	td = TemplateDesigner.createElement("td",tr);
	td.width = "25%";
	td.className = "tdfont";
	
	this.elemTdImageUpload = td;
};

ImageUploadControl.prototype.setValue = function(_objPara)
{
	this.value = _objPara.displayValue;
	this.defaultValue = _objPara.defaultValue;
	this.elemContainer.value = 	this.value;
	this.imageAttached = false;
	if(this.defaultValue!="")	this.setUploadedImageView(this.defaultValue);
};

ImageUploadControl.prototype.setUploadedImageView = function(_ext)
{
	if(!this.imageAttached)
	{
		this.imageAttached = true;
		var objCurrentCell = TemplateDesigner.getCurrentCellObject();
		var url = '/AHIMS/hisglobal/utility/generictemplate/templateImageViewUpload.cnt?transactionMode=VIEW&row='+objCurrentCell.row+"&col="+objCurrentCell.col;
		var imageLink ="<div align='left'><a style='cursor:pointer' onclick=\"openPopup('"+url+"',event,300, 600);\" >View Image</a></div>";
		this.elemTdImageUpload.innerHTML = imageLink;		
	}
	this.defaultValue = _ext;
};

ImageUploadControl.prototype.getValue = function(_objPara)
{
	_objPara.displayValue = this.elemContainer.value;
	if(this.imageAttached)	_objPara.defaultValue = this.defaultValue;
};

ImageUploadControl.getObject = function()
{
	var objDesigner = TemplateDesigner.getTemplateDesigner().objDesigner;
	return objDesigner.objControlSetter.imageUpload;
};

ImageUploadControl.prototype.validate = function()
{
	/*if( this.elemContainer.value == "" )
	{
		alert("Enter Image Title ... ");
		this.elemContainer.focus();
		return false;
	}*/
	if(!this.imageAttached)
	{
		alert("Attach Image on clicking + Button ... ");
		this.elemImageUpload.focus();
		return false;
	}
	return true;
};

ImageUploadControl.evtUploadImage = function(evnt)
{
	try
	{
		var objCurrentCell = TemplateDesigner.getCurrentCellObject();
		var url = '/AHIMS/hisglobal/utility/generictemplate/templateImageViewUpload.cnt?row='+objCurrentCell.row+"&col="+objCurrentCell.col;
		openPopup(url,evnt,300, 600);
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

ImageUploadControl.setUploadedImage = function(_row, _col, _ext)
{
	try
	{
		var objImageUpload = ImageUploadControl.getObject();
		var objCurrentCell = TemplateDesigner.getCurrentCellObject();
		if(objCurrentCell.row==_row && objCurrentCell.col==_col)
		{
			objImageUpload.setUploadedImageView(_ext);
		}
	}
	catch(e)
	{		
		//alert("Error Message -> "+e.message);
		return;
	}
};

// Blank Control ********************
BlankControl = function(_ctrlSetter)
{
	this.controlSetter = _ctrlSetter;
	this.occupyCapacity = TemplateDesigner.CAPACITY["Half"];
};
BlankControl.prototype.create=function(_parent)
{
	var td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfonthead";
	td = TemplateDesigner.createElement("td",_parent);
	td.width = "25%";
	td.className = "tdfont";
};
// **** End Control Setter ************************
//************************************************************************



//************************************************************************
// **** Template Setter ************************
TemplateSetter = function(_templateType)
{
	this.tempType = _templateType;

	this.elemContainer = null;
	// Reset Button
	this.objResetButton = null;
	this.elemResetButton = null;
	// Apply Button
	this.objApplyButton = null;
	this.elemApplyButton = null;
};

TemplateSetter.prototype.create = function(_parent)
{
	this.elemContainer = _parent;
	this.hide();
	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.width="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="1";
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);	

	var td = TemplateDesigner.createElement("td",tr);
	td.className = "tdfont";
	td.width = "50%";
	var div = TemplateDesigner.createElement("div",td);
	div.align = "left";	
	this.objResetButton = new ResetButton(this);
	this.elemResetButton = div;

	// Setting Apply Button
	td = TemplateDesigner.createElement("td",tr);
	td.className = "tdfont";
	td.width = "50%";
	div = TemplateDesigner.createElement("div",td);
	div.align = "right";	
	this.objApplyButton = new ApplyButton(this);
	this.elemApplyButton = div;
};

TemplateSetter.prototype.activate = function(_objCell)
{
	this.objResetButton.create(this.elemResetButton);	
	this.objApplyButton.create(this.elemApplyButton);	
	this.show();
};

TemplateSetter.prototype.hide=function()
{
	this.elemContainer.style.display = TemplateDesigner.DISPLAY_TYPE["Hide"];
};

TemplateSetter.prototype.show=function()
{
	this.elemContainer.style.display = TemplateDesigner.DISPLAY_TYPE["Show"];	
};

// Reset Button ***********************
ResetButton = function(_tempSetter)
{
	this.objTempSetter = _tempSetter;
	this.elemContainer=null;
};
 
ResetButton.prototype.create = function(_parent)
{
	this.elemContainer=_parent;
	this.elemContainer.innerHTML = "";
	
	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);		
	var td = TemplateDesigner.createElement("td",tr);
	td.id = "tdResetButton";
	td.className = "tdfonthead";
	td.innerHTML = "&nbsp;&nbsp;Reset&nbsp;&nbsp;";
	TemplateDesigner.addEvent(td, "click", ResetButton.evtReset);
};

ResetButton.evtReset = function(evnt)
{
	try
	{
		var tempDesigner = TemplateDesigner.getTemplateDesigner();
		tempDesigner.objDesigner.activate(TemplateDesigner.getCurrentCellObject());
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};


// Apply Button ***********************
ApplyButton = function(_tempSetter)
{
	this.objTempSetter = _tempSetter;
	this.elemContainer=null;
};
 
ApplyButton.prototype.create = function(_parent)
{
	this.elemContainer=_parent;
	this.elemContainer.innerHTML = "";

	var tbl = TemplateDesigner.createElement("table",_parent);
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);		
	var td = TemplateDesigner.createElement("td",tr);
	td.id = "tdApplyButton";
	td.className = "tdfonthead";
	td.innerHTML = "&nbsp;&nbsp;Apply&nbsp;&nbsp;";
	TemplateDesigner.addEvent(td, "click", ApplyButton.evtApply);
};

ApplyButton.evtApply = function(evnt)
{
	try
	{
		var templateDesigner = TemplateDesigner.getTemplateDesigner();
		templateDesigner.objTemplate.applyTemplateChanges();
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

// **** End Parameter Setter ************************
//************************************************************************


//************************************************************************
// **** Blanker ************************
Blanker = function(_tempDesginer)
{
	if(_tempDesginer)	this.objTempDesigner=_tempDesginer;
	else	this.objTempDesigner=window.Pragyas_TemplateDesigner;

	this.elemContainer=null;
};

Blanker.prototype.create = function(_parent)
{
	var divApplier = TemplateDesigner.createElement("div",_parent);
	divApplier.id = "divBlanker";
	this.elemContainer=divApplier;

	var tbl = TemplateDesigner.createElement("table",divApplier);
	tbl.width="100%";
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);		

	var td = TemplateDesigner.createElement("td",tr);
	td.className = "tdfont";
	td.width = "100%";
	var div = TemplateDesigner.createElement("div",td);
	div.align = "center";	

	var tbl = TemplateDesigner.createElement("table",div);
	tbl.border="0";
	tbl.cellpadding="0";
	tbl.cellspacing="0";
	var thead = TemplateDesigner.createElement("thead",tbl);
	var tr = TemplateDesigner.createElement("tr",thead);		
	var td = TemplateDesigner.createElement("td",tr);
	td.className = "tdfonthead";
	td.style.cursor="pointer";
	td.innerHTML = "&nbsp;&nbsp;Blank The Template&nbsp;&nbsp;";
	TemplateDesigner.addEvent(td, "click", Blanker.evtBlankTemplate);
};

Blanker.evtBlankTemplate = function(evnt)
{
	try
	{
		if(!confirm("<<< Sure to BLANK the Template ? >>>")) return;
		
		var tempDesigner = TemplateDesigner.getTemplateDesigner();
		tempDesigner.objTemplate.createCellArray();
		tempDesigner.reStart();
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};
// **** End Blanker ************************
//************************************************************************



// ******************************************************************************
// *** TemplateDesigner's Static Utility Functions

// Getting Absolute Position of given Element
TemplateDesigner.getAbsolutePosition = function(elem)
{
	var SL = 0, ST = 0; // Scroll Left, Scroll Top
	var isDiv = /^div$/i.test(elem.tagName);
	if (isDiv && elem.scrollLeft)
		SL = el.scrollLeft;
	if (isDiv && elem.scrollTop)
		ST = elem.scrollTop;
	var r = { x: elem.offsetLeft - SL, y: elem.offsetTop - ST };
	if (elem.offsetParent)
	{
		var tmp = this.getAbsolutePosition(elem.offsetParent);
		r.x += tmp.x;
		r.y += tmp.y;
	}
	return r;
};

// Is given Element is related to the given Event
TemplateDesigner.isRelated = function (elem, evnt)
{
	var related = evnt.relatedTarget;
	if (!related)
	{
		var type = evnt.type;
		if (type == "mouseover")
		{
			related = evnt.fromElement;
		}
		else if (type == "mouseout")
		{
			related = evnt.toElement;
		}
	}
	while (related)
	{
		if (related == elem)
		{
			return true;
		}
		related = related.parentNode;
	}
	return false;
};

// Removing Class from ClassName of given Element
TemplateDesigner.removeClass = function(elem, className)
{
	if (!(elem && elem.className))
	{
		return;
	}
	var cls = elem.className.split(" ");
	var ar = new Array();
	for (var i = cls.length; i > 0;)
	{
		if (cls[--i] != className)
		{
			ar[ar.length] = cls[i];
		}
	}
	elem.className = ar.join(" ");
};

// Adding Class to ClassName of given Element
TemplateDesigner.addClass = function(elem, className)
{
	TemplateDesigner.removeClass(elem, className);
	elem.className += " " + className;
};

TemplateDesigner.getElement = function(evnt,elem)  // Who's Event is called
{
	var f = TemplateDesigner.IS_IE ? window.event.srcElement : evnt.currentTarget;
	return f;
};

TemplateDesigner.getTargetElement = function(evnt)	// Which is targeted
{
	var f = TemplateDesigner.IS_IE ? window.event.srcElement : evnt.target;
	return f;
};

// Stopping Event
TemplateDesigner.stopEvent = function(evnt)
{
	evnt || (evnt = window.event);
	if (TemplateDesigner.IS_IE)
	{
		evnt.cancelBubble = true;
		evnt.returnValue = false;
	}
	else
	{
		evnt.preventDefault();
		evnt.stopPropagation();
	}
	return false;
};

// Adding Event to Element
TemplateDesigner.addEvent = function(elem, evntName, funcName)
{
	if (elem.attachEvent) // IE
	{
		elem.attachEvent("on" + evntName, funcName);
	}
	else if (elem.addEventListener) // Gecko / W3C
	{
		elem.addEventListener(evntName, funcName, true);
	}
	else
	{
		elem["on" + evntName] = funcName;
	}
};

// Adding Event to Element
TemplateDesigner.addKeyEvent = function(elem, evntName, funcName)
{
	/*
	if( window.KeyEvent )
	{
		var evObj = document.createEvent('KeyEvents');
		evObj.initKeyEvent( evntName, true, true, window, false, false, false, false, 13, 0 );
	}
	else
	{
		var evObj = document.createEvent('UIEvents');
		evObj.initUIEvent( 'keyup', true, true, window, 1 );
		evObj.keyCode = 13;
	}
	elem.dispatchEvent(evObj);

	//var ev = document.createEvent ('KeyEvents');
	//ev.initKeyEvent(evntName,true, true, window, false, false, false, false,0,textareaObj.value.charCodeAt(startSrchPos));
	//textareaObj.dispatchEvent(ev);
	*/
	
	if (elem.attachEvent) // IE
	{
		elem.attachEvent("on" + evntName, funcName);
	}
	else if (elem.addEventListener) // Gecko / W3C
	{
		elem.addEventListener(evntName, funcName, true);
	}
	else
	{
		elem["on" + evntName] = funcName;
	}
	
	var evnt;
	if( document.createEventObject())
	{
		alert("Inside createEventObject");
		evnt = document.createEventObject();
	}
	else if(document.createEvent())
	{
		alert("Inside createEvent");
		evnt = document.createEvent();
	}
	
	if( window.KeyEvent )
	{
		alert("Inside createEvent");
		evnt = document.createEvent('KeyEvents');
		evnt.initEvent( evntName, true, true);//, window, false, false, false, false, 13, 0 );
	}
	else
	{
		evnt = document.createEvent('UIEvents');
		evnt.initUIEvent(evntName, true, true, window, 1 );
	}
	if(evnt)
	{
		elem.dispatchEvent(evnt);
	}
};

// Removing Event from Element
TemplateDesigner.removeEvent = function(elem, evntName, funcName)
{
	if (elem.detachEvent) // IE
	{
		elem.detachEvent("on" + evntName, funcName);
	}
	else if (elem.removeEventListener) // Gecko / W3C
	{
		elem.removeEventListener(evntName, funcName, true);
	}
	else
	{
		elem["on" + evntName] = null;
	}
};

// Creating a HTML Element of given Type inside given Parent which is optional
TemplateDesigner.createElement = function(type, parent)
{
	var newElem = null;
	if (document.createElementNS)
	{
		// use the XHTML namespace; IE won't normally get here unless
		// _they_ "fix" the DOM2 implementation.
		newElem = document.createElementNS("http://www.w3.org/1999/xhtml", type);
	}
	else
	{
		newElem = document.createElement(type);
	}
	if (typeof parent != "undefined")
	{
		parent.appendChild(newElem);
	}
	return newElem;
};

// Creating a HTML Input Element of given Type inside given Parent which is mandatory
TemplateDesigner.createInputElement = function(_type, _parent)
{
	_parent.innerHTML = _parent.innerHTML + "<input type='" + _type + "' />";
	return _parent.lastChild;
};

TemplateDesigner.removeAllChildren = function(elem)
{
	while(elem.childNodes.length>0)
		for(var i=0;i<elem.childNodes.length;i++)
			elem.removeChild(elem.childNodes[i]);
		
};

TemplateDesigner.trimData = function(val)
{
	//alert((typeof val).toUpperCase());
	if(val && val!=null && val!="" && (typeof val).toUpperCase() == 'STRING')
	{
		while(val.substr(0,1)==' ')	val=val.substr(1);
		while(val.substr(val.length-1,1)==' ')	val=val.substr(0,val.length-1);			
	}
	return val;
};

function showData(obj)
{
	var h="";
	for(var d in obj)
	{
		h+=d+" = "+obj[d]+"\n";
		if(h.length>300)
		{
			alert(h);
			h="";
		}
	}
	alert(h);
}


/**** End TemplateDesigner's Static Utility Functions ****/
/******************************************************************************/


// ******************************************************************************
// *** Constants

// TemplateDesigner

	// Is Browser is Internet Explorer ? 
	TemplateDesigner.IS_IE =(/msie/i.test(navigator.userAgent));

	// Is Browser is Firefox ?
	TemplateDesigner.IS_FIREFOX =(/firefox/i.test(navigator.userAgent));

	// Template Types
	TemplateDesigner.TEMPLATE_TYPE={};
		// Normal , Matrix, Consent, Guidleine
		TemplateDesigner.TEMPLATE_TYPE["Normal"]=1;
		TemplateDesigner.TEMPLATE_TYPE["Matrix"]=2;
		TemplateDesigner.TEMPLATE_TYPE["Consent"]=3;
		TemplateDesigner.TEMPLATE_TYPE["Guideline"]=4;

	// Control Type List
	TemplateDesigner.CONTROL_TYPES={};
		// -1 :none 0:default 1:label 2:textbox 3:textarea 4:combo 5:radio 6:yesno 7:checkbox 8:Comment
		// 9:Formulated 10:Information 11:Duration 12:Date 13:Time 14:ImageView   
		// Future for popup, file, list
		TemplateDesigner.CONTROL_TYPES["Label"]=1;
		TemplateDesigner.CONTROL_TYPES["Comment"]=8;
		TemplateDesigner.CONTROL_TYPES["TextBox"]=2;
		TemplateDesigner.CONTROL_TYPES["TextArea"]=3;
		TemplateDesigner.CONTROL_TYPES["Combo"]=4;
		TemplateDesigner.CONTROL_TYPES["Radio"]=5;
		TemplateDesigner.CONTROL_TYPES["YesNo"]=6;
		TemplateDesigner.CONTROL_TYPES["CheckBox"]=7;
		TemplateDesigner.CONTROL_TYPES["Formulated"]=9; 
		TemplateDesigner.CONTROL_TYPES["Information"]=10; 
		TemplateDesigner.CONTROL_TYPES["Duration"]=11;
		TemplateDesigner.CONTROL_TYPES["Date"]=12;
		TemplateDesigner.CONTROL_TYPES["Time"]=13;
		TemplateDesigner.CONTROL_TYPES["ImageView"]=14; 
		
	// Yes No Flag Value
	TemplateDesigner.YES_NO_VALUE={No:"0",Yes:"1"};
	
	// Yes No Flag
	TemplateDesigner.YES_NO={};
		TemplateDesigner.YES_NO["No"]=false;
		TemplateDesigner.YES_NO["Yes"]=true;
	
	// Yes No Value Flag
	TemplateDesigner.YES_NO_FLAG_VALUE={};
		TemplateDesigner.YES_NO_FLAG_VALUE["True"]=1;
		TemplateDesigner.YES_NO_FLAG_VALUE["False"]=0;
	
	// True False
	TemplateDesigner.TRUE_FALSE={};
		TemplateDesigner.TRUE_FALSE["False"]="false";
		TemplateDesigner.TRUE_FALSE["True"]="true";
	
	// Source Flag Value
	TemplateDesigner.SOURCE_FLAG={Static:"1",Dynamic:"2"};
	
	// Location/Spanning Type
	TemplateDesigner.LOCATION_TYPES={};
		// 0 - colspan 1
		// 1 - colspan 2  
		// 2- colspan 1/2
		// 3- colspan row
		TemplateDesigner.LOCATION_TYPES["Cell"]=0;
		TemplateDesigner.LOCATION_TYPES["Pair"]=1;
		TemplateDesigner.LOCATION_TYPES["Half"]=2;
		TemplateDesigner.LOCATION_TYPES["Row"]=3;
		TemplateDesigner.LOCATION_TYPES["Custom"]=4;
	
	// Color Hexa Codes
	TemplateDesigner.COLOR_CODES={};
		// Colors
		TemplateDesigner.COLOR_CODES["Black"]="#000000";
		TemplateDesigner.COLOR_CODES["White"]="#FFFFFF";
		TemplateDesigner.COLOR_CODES["Red"]="#FF0000";
		TemplateDesigner.COLOR_CODES["Blue"]="#0000FF";
		TemplateDesigner.COLOR_CODES["Green"]="#00FF00";
		TemplateDesigner.COLOR_CODES["Yellow"]="#DDFFFF";
		TemplateDesigner.INITIAL_COLOR = TemplateDesigner.COLOR_CODES["Black"];
	
	// Alignments
	TemplateDesigner.ALIGN={Center:"center",Left:"left",Right:"right"};
		
	// Gender Types
	TemplateDesigner.GENDER_TYPES={};
		TemplateDesigner.GENDER_TYPES["None"]=0;
		TemplateDesigner.GENDER_TYPES["Male"]=1;
		TemplateDesigner.GENDER_TYPES["Female"]=2;

	// Text Validation Function
	TemplateDesigner.TEXT_VALIDATIONS={};
		// Validation functions
		TemplateDesigner.TEXT_VALIDATIONS["None"]="validateNone";
		TemplateDesigner.TEXT_VALIDATIONS["Alphabetic"]="validateAlphaOnly";
		TemplateDesigner.TEXT_VALIDATIONS["Numeric"]="validateNumericOnly";
		TemplateDesigner.TEXT_VALIDATIONS["PositiveNumeric"]="validatePositiveNumericOnly";
		TemplateDesigner.TEXT_VALIDATIONS["Alphanumeric"]="validateAlphaNumOnly";
		TemplateDesigner.TEXT_VALIDATIONS["IntegersOnly"]="validateIntegerOnly";
		TemplateDesigner.TEXT_VALIDATIONS["PositiveIntegersOnly"]="validatePositiveIntegerOnly";
		
	// Presentation Types
	TemplateDesigner.PRESENTATION_TYPES={};
		TemplateDesigner.PRESENTATION_TYPES["Normal"]=0;
		TemplateDesigner.PRESENTATION_TYPES["Disabled"]=1;
		TemplateDesigner.PRESENTATION_TYPES["Hidden"]=2;

	// Children Presentation Types
	TemplateDesigner.CHILD_PRESENTATIONS={};
		TemplateDesigner.CHILD_PRESENTATIONS["Normal"]=0;
		TemplateDesigner.CHILD_PRESENTATIONS["EnableOn"]=2;
		TemplateDesigner.CHILD_PRESENTATIONS["DisableOn"]=1;
		TemplateDesigner.CHILD_PRESENTATIONS["ShowOn"]=4;
		TemplateDesigner.CHILD_PRESENTATIONS["HideOn"]=3;
		
	// Formula Output Types
	TemplateDesigner.FORMULA_OUTPUT_TYPES={};
		TemplateDesigner.FORMULA_OUTPUT_TYPES["None"]=0;
		TemplateDesigner.FORMULA_OUTPUT_TYPES["Truncate"]=1;
		TemplateDesigner.FORMULA_OUTPUT_TYPES["RoundOff"]=2;
		TemplateDesigner.FORMULA_OUTPUT_TYPES["TruncateTo1DecimalPlace"]=3;
		TemplateDesigner.FORMULA_OUTPUT_TYPES["RoundOffTo1DecimalPlace"]=4;
		TemplateDesigner.FORMULA_OUTPUT_TYPES["TruncateTo2DecimalPlace"]=5;
		TemplateDesigner.FORMULA_OUTPUT_TYPES["RoundOffTo2DecimalPlace"]=6;
		TemplateDesigner.FORMULA_OUTPUT_TYPES["TruncateTo5DecimalPlace"]=7;
		TemplateDesigner.FORMULA_OUTPUT_TYPES["RoundOffTo5DecimalPlace"]=8;
		TemplateDesigner.FORMULA_OUTPUT_TYPES["Ceil"]=9;
		TemplateDesigner.FORMULA_OUTPUT_TYPES["Floor"]=10;

	// Formula Math Functions Support
	TemplateDesigner.FORMULA_MATH_FUNCTIONS={};
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["Round"]=7;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["SquareRoot"]=8;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["Absolute"]=0;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["Ceil"]=1;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["Floor"]=2;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["Power"]=5;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["Random"]=6;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["Maximum"]=3;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["Minimum"]=4;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["Log"]=17;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["Sine"]=9;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["Cosine"]=10;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["Tangent"]=11;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["ArcSine"]=12;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["ArcCosine"]=13;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["ArcTangent"]=14;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["ArcTangent2"]=15;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["Exponent"]=16;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["E"]=18;
		TemplateDesigner.FORMULA_MATH_FUNCTIONS["PI"]=19;

	TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP={};
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["7"]="Math.round(a)  --integer closest to a ";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["8"]="Math.sqrt(a)  --square root of a";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["0"]="Math.abs(a)  --absolute value of a";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["1"]="Math.ceil(a)  --integer closest to a and not less than a";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["2"]="Math.floor(a)  --integer closest to and not greater than a";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["5"]="Math.pow(a,b)  --a to the power b";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["6"]="Math.random()  --pseudorandom number in the range 0 to 1";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["3"]="Math.max(a,b)  --the maximum of a and b";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["4"]="Math.min(a,b)  --the minimum of a and b";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["17"]="Math.log(a)   --log of a base e";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["9"]="Math.sin(a)   --sine of a";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["10"]="Math.cos(a)   --cosine of a";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["11"]="Math.tan(a)   --tangent of a";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["12"]="Math.asin(a)   --arc sine of a";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["13"]="Math.acos(a)   --arc cosine of a";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["14"]="Math.atan(a)   --arc tangent of a";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["15"]="Math.atan2(a,b)   --arc tangent of a/b";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["16"]="Math.exp(a)   --exponent of a";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["18"]="Math.E    --Value of E";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_TOOLTIP["19"]="Math.PI    --Value of PI";

	TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT={};
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["7"]="Math.round( )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["8"]="Math.sqrt( )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["0"]="Math.abs( )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["1"]="Math.ceil( )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["2"]="Math.floor( )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["5"]="Math.pow( , )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["6"]="Math.random()";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["3"]="Math.max( , )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["4"]="Math.min( , )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["17"]="Math.log( )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["9"]="Math.sin( )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["10"]="Math.cos( )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["11"]="Math.tan( )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["12"]="Math.asin( )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["13"]="Math.acos( )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["14"]="Math.atan( )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["15"]="Math.atan2( , )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["16"]="Math.exp( )";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["18"]="Math.E";
		TemplateDesigner.FORMULA_MATH_FUNCTIONS_PUT["19"]="Math.PI";

	// Duration Control Default Durations
	TemplateDesigner.DEFAULT_DURATIONS={};
		TemplateDesigner.DEFAULT_DURATIONS["Days"]="Days";
		TemplateDesigner.DEFAULT_DURATIONS["Weeks"]="Weeks";
		TemplateDesigner.DEFAULT_DURATIONS["Months"]="Months";
		TemplateDesigner.DEFAULT_DURATIONS["Years"]="Years";

	// Language
	TemplateDesigner.LANGUAGE={};
		TemplateDesigner.LANGUAGE["Hindi"]="Hin";
		TemplateDesigner.LANGUAGE["English"]="Eng";
	TemplateDesigner.HINDI_LANGUAGE_FONT = "Kruti Dev 010";

	// Show Hide Display Value
	TemplateDesigner.DISPLAY_TYPE={};
		// Show, Hide
		TemplateDesigner.DISPLAY_TYPE["Hide"]="none";
		TemplateDesigner.DISPLAY_TYPE["Show"]="block";

	// Capacity
	TemplateDesigner.CAPACITY={};
		// Half, Full
		TemplateDesigner.CAPACITY["Half"]=2;
		TemplateDesigner.CAPACITY["Full"]=4;
		
	// Length of Data
	TemplateDesigner.PARAMETER_NAME_LENGTH = 250;
	TemplateDesigner.PARAMETER_STATIC_OPTIONS_LENGTH = 200;
	TemplateDesigner.LOCATION_TYPE_HALF_MINIMUM_COL_LIMIT = 4;	// 5;
	TemplateDesigner.LOCATION_TYPE_PAIR_MINIMUM_COL_LIMIT = 2;	// 3;
	
	//****************** Separators
	TemplateDesigner.SEP_IN_PARA_OPTIONS = "~";
	TemplateDesigner.SEP_IN_PARA_OPTIONS_LABEL_VALUE = ":";
	TemplateDesigner.SEP_VAL_PARA_FEATURES = "!";
	TemplateDesigner.SEP_VAL_IN_PARA = "!###!";
	TemplateDesigner.SEP_VAL_IN_PROPS = "&";
	TemplateDesigner.SEP_VAL_IN_PROPS_FOR_REPLACE = "&amp;";	
	TemplateDesigner.SEP_IN_PARA_PARENT = "#";
	TemplateDesigner.SEP_IN_PARA_DEPENDENTS = "#";
	TemplateDesigner.SEP_IMAGEVIEW_KEY_ROW_COL = "_";
	TemplateDesigner.SEP_IN_FONT_SIZE_LANG = ":";
	 
	

	//****************** Event Key Codes
	TemplateDesigner.EVENT_KEYCODES = {};
		TemplateDesigner.EVENT_KEYCODES["Enter"] = 13;
		TemplateDesigner.EVENT_KEYCODES["ArrowUp"] = 38;
		TemplateDesigner.EVENT_KEYCODES["ArrowDown"] = 40;
		TemplateDesigner.EVENT_KEYCODES["Enter"] = 13;
		TemplateDesigner.EVENT_KEYCODES["Enter"] = 13;
		TemplateDesigner.EVENT_KEYCODES["Enter"] = 13;

	//****************** Event Key Codes
	TemplateDesigner.NO_SELECT = "-1";


	// Parameter Design Fetaures Controls
	TemplateDesigner.CONTROL_PROPERTIES = 
	{
		bold:"",
		italic:"",
		underlined:"",
		color:"",
		maxlength:"",
		colsize:"",
		rowsize:"",
		validationFunction:"",
		defaultValue:"",
		regularExpression:"",
		format:"",
		formula:"",
		info:"",
		align:"",
		genderType:"",
		childPresentation:"",
		childPresentationOn:"",
		presentation:"",
		size:"",
		fontsize:"",
		formulaOutput:""
	};
	
	// ************ Control - Prperties Mapping
	// Control Wise Fixed Properties
	ControlSetter.CONTROL_WISE_FIXED_PROP={};
		// -1 Select Value	
		ControlSetter.CONTROL_WISE_FIXED_PROP[TemplateDesigner.NO_SELECT]= {};
		// 1 Label	
		ControlSetter.CONTROL_WISE_FIXED_PROP[TemplateDesigner.CONTROL_TYPES["Label"]]=
			{
				displayValue:"",
				fontsize:"",
				locationType:"",
				colspan:"",
				bold:"",
				italic:"",
				underlined:"",
				color:"",
				align:""
			};
		// 8 Comment
		ControlSetter.CONTROL_WISE_FIXED_PROP[TemplateDesigner.CONTROL_TYPES["Comment"]]=
			{
				displayValue:"",
				fontsize:"",
				locationType:"",
				colspan:"",
				bold:"",
				italic:"",
				underlined:"",
				color:"",
				align:""
			};
		// 2 Text Box
		ControlSetter.CONTROL_WISE_FIXED_PROP[TemplateDesigner.CONTROL_TYPES["TextBox"]]=
			{
				locationType:"",
				colspan:"",
				maxlength:"",
				size:"",
				align:"",
				defaultValue:"",
				isRange:"",
				isCompulsory:"",
				validationFunction:"",
				genderType:"",
				format:"",
				regularExpression:"",
				presentation:"",
				haveDependent:""
			};
		// 3 Text Area
		ControlSetter.CONTROL_WISE_FIXED_PROP[TemplateDesigner.CONTROL_TYPES["TextArea"]]=
			{
				locationType:"",
				colspan:"",
				maxlength:"",
				defaultValue:"",
				colsize:"",
				rowsize:"",
				align:"",
				genderType:"",
				validationFunction:"",
				isCompulsory:"",
				presentation:""
			};
		// 4 Combo
		ControlSetter.CONTROL_WISE_FIXED_PROP[TemplateDesigner.CONTROL_TYPES["Combo"]]=
			{
				locationType:"",
				colspan:"",
				align:"",
				isCompulsory:"",
				defaultValue:"",
				genderType:"",
				childPresentation:"",
				childPresentationOn:"",
				presentation:"",
				sourceFlag:""
			};
		// 5 Radio
		ControlSetter.CONTROL_WISE_FIXED_PROP[TemplateDesigner.CONTROL_TYPES["Radio"]]=
			{
				locationType:"",
				colspan:"",
				align:"",
				isCompulsory:"",
				defaultValue:"",
				fontsize:"",
				childPresentation:"",
				childPresentationOn:"",
				presentation:"",
				genderType:"",
				sourceFlag:""
			};
		// 6 Yes No
		ControlSetter.CONTROL_WISE_FIXED_PROP[TemplateDesigner.CONTROL_TYPES["YesNo"]]=
			{
				locationType:"",
				colspan:"",
				align:"",
				isCompulsory:"",
				defaultValue:"",
				genderType:"",
				childPresentation:"",
				childPresentationOn:"",
				presentation:""
			};
		// 7 Check Box
		ControlSetter.CONTROL_WISE_FIXED_PROP[TemplateDesigner.CONTROL_TYPES["CheckBox"]]=
			{
				locationType:"",
				colspan:"",
				align:"",
				isCompulsory:"",
				defaultValue:"",
				fontsize:"",
				childPresentation:"",
				childPresentationOn:"",
				presentation:"",
				genderType:"",
				sourceFlag:""
			};
		// 9 Formulated
		ControlSetter.CONTROL_WISE_FIXED_PROP[TemplateDesigner.CONTROL_TYPES["Formulated"]]=
			{
				locationType:"",
				colspan:"",
				align:"",
				size:"",
				genderType:"",
				dependentParaId:"",
				formula:""
			};
		// 10 Information
		ControlSetter.CONTROL_WISE_FIXED_PROP[TemplateDesigner.CONTROL_TYPES["Information"]]=
			{
				info:"",
				fontsize:"",
				locationType:"",
				colspan:"",
				bold:"",
				italic:"",
				underlined:"",
				color:"",
				align:""
			};
		// 11 Duration
		ControlSetter.CONTROL_WISE_FIXED_PROP[TemplateDesigner.CONTROL_TYPES["Duration"]]=
			{
				locationType:"",
				colspan:"",
				maxlength:"",
				defaultValue:"",
				validationFunction:"",
				isCompulsory:"",
				align:"",
				genderType:"",
				presentation:"",
				sourceFlag:""
			};
		// 12 Date
		ControlSetter.CONTROL_WISE_FIXED_PROP[TemplateDesigner.CONTROL_TYPES["Date"]]=
			{
				locationType:"",
				colspan:"",
				align:"",
				isCompulsory:"",
				defaultValue:"",
				genderType:"",
				presentation:""
			};
		// 13 Time
		ControlSetter.CONTROL_WISE_FIXED_PROP[TemplateDesigner.CONTROL_TYPES["Time"]]=
			{
				locationType:"",
				colspan:"",
				align:"",
				isCompulsory:"",
				defaultValue:"",
				genderType:"",
				presentation:""
			};
		// 14 Image View
		ControlSetter.CONTROL_WISE_FIXED_PROP[TemplateDesigner.CONTROL_TYPES["ImageView"]]=
			{
				locationType:"",
				colspan:"",
				align:"",
				imageUpload:""
			};

	// Type Wise Properties
	ControlSetter.TYPE_WISE_PROP={};
		// Normal
		ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Normal"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Normal"]][TemplateDesigner.NO_SELECT]= {};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Normal"]][TemplateDesigner.CONTROL_TYPES["Label"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Normal"]][TemplateDesigner.CONTROL_TYPES["Comment"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Normal"]][TemplateDesigner.CONTROL_TYPES["TextBox"]]=
				{
					displayValue:"",
					fontsize:"",
					bold:"",
					italic:"",
					underlined:"",
					color:""
				};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Normal"]][TemplateDesigner.CONTROL_TYPES["TextArea"]]=
				{
					displayValue:"",
					fontsize:"",
					bold:"",
					italic:"",
					underlined:"",
					color:""
				};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Normal"]][TemplateDesigner.CONTROL_TYPES["Combo"]]=
				{
					displayValue:"",
					fontsize:"",
					bold:"",
					italic:"",
					underlined:"",
					color:""
				};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Normal"]][TemplateDesigner.CONTROL_TYPES["Radio"]]=
				{
					displayValue:"",
					blank:"",
					bold:"",
					italic:"",
					underlined:"",
					color:""
				};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Normal"]][TemplateDesigner.CONTROL_TYPES["YesNo"]]=
				{
					displayValue:"",
					fontsize:"",
					bold:"",
					italic:"",
					underlined:"",
					color:""
				};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Normal"]][TemplateDesigner.CONTROL_TYPES["CheckBox"]]=
				{
					displayValue:"",
					blank:"",
					bold:"",
					italic:"",
					underlined:"",
					color:""
				};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Normal"]][TemplateDesigner.CONTROL_TYPES["Formulated"]]=
				{
					displayValue:"",
					fontsize:"",
					bold:"",
					italic:"",
					underlined:"",
					color:""
				};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Normal"]][TemplateDesigner.CONTROL_TYPES["Information"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Normal"]][TemplateDesigner.CONTROL_TYPES["Duration"]]=
				{
					displayValue:"",
					fontsize:"",
					bold:"",
					italic:"",
					underlined:"",
					color:""
				};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Normal"]][TemplateDesigner.CONTROL_TYPES["Date"]]=
				{
					displayValue:"",
					fontsize:"",
					bold:"",
					italic:"",
					underlined:"",
					color:""
				};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Normal"]][TemplateDesigner.CONTROL_TYPES["Time"]]=
				{
					displayValue:"",
					fontsize:"",
					bold:"",
					italic:"",
					underlined:"",
					color:""
				};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Normal"]][TemplateDesigner.CONTROL_TYPES["ImageView"]]={};

		// Matrix
		ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Matrix"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Matrix"]][TemplateDesigner.NO_SELECT]= {};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Matrix"]][TemplateDesigner.CONTROL_TYPES["Label"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Matrix"]][TemplateDesigner.CONTROL_TYPES["Comment"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Matrix"]][TemplateDesigner.CONTROL_TYPES["TextBox"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Matrix"]][TemplateDesigner.CONTROL_TYPES["TextArea"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Matrix"]][TemplateDesigner.CONTROL_TYPES["Combo"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Matrix"]][TemplateDesigner.CONTROL_TYPES["Radio"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Matrix"]][TemplateDesigner.CONTROL_TYPES["YesNo"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Matrix"]][TemplateDesigner.CONTROL_TYPES["CheckBox"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Matrix"]][TemplateDesigner.CONTROL_TYPES["Formulated"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Matrix"]][TemplateDesigner.CONTROL_TYPES["Information"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Matrix"]][TemplateDesigner.CONTROL_TYPES["Duration"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Matrix"]][TemplateDesigner.CONTROL_TYPES["Date"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Matrix"]][TemplateDesigner.CONTROL_TYPES["Time"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Matrix"]][TemplateDesigner.CONTROL_TYPES["ImageView"]]={};

		// Consent
		ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Consent"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Consent"]][TemplateDesigner.NO_SELECT]= {};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Consent"]][TemplateDesigner.CONTROL_TYPES["Label"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Consent"]][TemplateDesigner.CONTROL_TYPES["Comment"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Consent"]][TemplateDesigner.CONTROL_TYPES["TextBox"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Consent"]][TemplateDesigner.CONTROL_TYPES["TextArea"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Consent"]][TemplateDesigner.CONTROL_TYPES["Combo"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Consent"]][TemplateDesigner.CONTROL_TYPES["Radio"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Consent"]][TemplateDesigner.CONTROL_TYPES["YesNo"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Consent"]][TemplateDesigner.CONTROL_TYPES["CheckBox"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Consent"]][TemplateDesigner.CONTROL_TYPES["Formulated"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Consent"]][TemplateDesigner.CONTROL_TYPES["Information"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Consent"]][TemplateDesigner.CONTROL_TYPES["Duration"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Consent"]][TemplateDesigner.CONTROL_TYPES["Date"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Consent"]][TemplateDesigner.CONTROL_TYPES["Time"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Consent"]][TemplateDesigner.CONTROL_TYPES["ImageView"]]={};

		// Guideline
		ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Guideline"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Guideline"]][TemplateDesigner.NO_SELECT]= {};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Guideline"]][TemplateDesigner.CONTROL_TYPES["Comment"]]={};
			ControlSetter.TYPE_WISE_PROP[TemplateDesigner.TEMPLATE_TYPE["Guideline"]][TemplateDesigner.CONTROL_TYPES["ImageView"]]={};

// ************ End Control - Prperties Mapping

// *** End Constants
// ******************************************************************************