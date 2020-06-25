
// ******************************************************************************
/*Requiremnt :	1. include js File "/hisglobal/utility/generictemplate/js/validationFunctions.js"
				2. include js File "/hisglobal/js/utilityFunctions.js"
*/
// ******************************************************************************


	// Global Object that holds the DateValidator Object
window.Pragyas_DateValidator = null;


// ******************************************************************************
	// DateValidator Object

DateValidator = function(_name, _targetElement, _containerElement, _value, _valueInFormat, _styleClass)
{
	if(_containerElement!=null && typeof _containerElement != 'undefined')	this.elemContainer = _containerElement;
	else	this.elemContainer = null;
	
	if(_targetElement!=null)	this.element = _targetElement;
	else				this.element = null;
	
	this.elemName = _name;

	this.day = null;
	this.month = null;
	this.year = null;
	this.date = null;
	this.format = DateValidator.DATE_FORMAT;
	
	// Default Value
	this.defaultValue = this.format;
	//alert(_value);
	if(_value!=null && typeof _value != 'undefined' && trimData(_value)!="")
	{		
		if(_valueInFormat!=null && typeof _valueInFormat != 'undefined' && trimData(_valueInFormat)!="")
		{
			var defaultDate = null;
			if(_value==DateValidator.DATE_FORMAT)	defaultDate=null;
			else	defaultDate = convertStrToDate(_value, _valueInFormat);
			if(defaultDate!=null)
			{
				this.defaultValue = convertDateToStr(defaultDate,"dd-MM-yyyy");
				this.date = defaultDate;	
			}
		}
	}
	
	//alert(this.defaultValue);
	this.styleClass = null;
	if(_styleClass!=null && typeof _styleClass != 'undefined')	this.styleClass = _styleClass;
};

DateValidator.setup = function(_containerElementID, _elementName, _value, _valueInFormat, _styleClass)
{
	try
	{
		//alert(_containerElementID + "   "+typeof _containerElementID);
		if(typeof _containerElementID=="undefined")
		{
			alert("Container Element for Date Validator is required");
			return;
		}
		var elemContainer = document.getElementById(_containerElementID);		
	
/*		if(!(typeof _containerElementID!="undefined")// && typeof _containerElementID!="object" && _containerElementID.canHaveChildren==true))
		{
			alert("Not a Right Container Element for Date Validator");
			return;
		}*/
	
		if(!_elementName)
		{
			alert("Name for Date Validator is Required");
			return;
		}
		
		
		var DV = new DateValidator(_elementName, null, elemContainer, _value, _valueInFormat, _styleClass)
		DV.create(elemContainer);
			
		var objName = "Pragyas_DateValidator_"+_elementName+"_"+DateValidator.findIndex(DV.element);
		window[objName] = DV;
	}
	catch(e)
	{
		alert("Exception in Setup of Date Validator : "+e.message);
	}
};

DateValidator.setupOnFocus = function(_targetElement)
{
	if(!(typeof _targetElement=="object" && _targetElement.tagName.toUpperCase()=="INPUT" ))
	{
		alert("Not a Right Element for Date Validator");
		return;
	}
	
	var objName = "Pragyas_DateValidator_"+_targetElement.name+"_"+DateValidator.findIndex(_targetElement);
	if(typeof window[objName] == 'undefined')
	{	 
		var DV = window[objName] = new DateValidator(_targetElement.name, _targetElement);
		DV.create(null,_targetElement);
		//DateValidator.evtSetDateEnter(null,DV.element);
	}
};

DateValidator.findIndex = function(obj)
{
	var ctrlArr = document.getElementsByName(obj.name);
	var index=-1;
	for(var i=0;i<ctrlArr.length;i++)
	{
		if(ctrlArr[i]==obj)
		{
			index=i;
			break;
		}
	}
	return index;
};

DateValidator.prototype.create = function(_parent,_text)
{
	var text = _text;
	if(typeof _text == 'undefined' || _text==null)
	{
		this.elemContainer=_parent;
		text = DateValidator.createElement("input",_parent);
	}
	this.element = text;
	
	text.Pragya_Control = this;
	text.Control_Object = this;
	text.Control = this;
	
	text.name = this.elemName;
	text.maxLength = 10;
	text.size = 11;
	if(this.styleClass!=null)	text.className = this.styleClass;
	text.tabIndex = "1";
	//if(trimData(text.value)=="") 
	text.value = this.defaultValue;
	DateValidator.addEvent(text, "focus", DateValidator.evtSetDateEnter);
	//DateValidator.addEvent(text, "blur", DateValidator.evtValidateDateBlur);
	DateValidator.addEvent(text, "keypress", DateValidator.evtKeyPressDate);//ValidationFunctions.evtValidateDateFormat);
	//DateValidator.addEvent(text, "keyup", DateValidator.evtKeyUpDate);
};

DateValidator.prototype.setDate = function(_date,_format)
{
	this.date = convertDateToStr(_date,_format);
	this.element.value = convertStrToDate(this.date,this.format);
	if(!this.validateDate())
		return false;
	return true;
};

DateValidator.prototype.addFuncOnBlur = function(_func)
{
	DateValidator.addEvent(this.element, "blur", _func);
};

DateValidator.prototype.validate = function()
{
	return this.validateDate();
};

DateValidator.prototype.validateDate = function()
{
	var elem = this.element;
	var ds = elem.value.split("-");
	this.day = parseInt(trimLeftZero(ds[0]));
	this.month = parseInt(trimLeftZero(ds[1]));
	this.year = parseInt(trimLeftZero(ds[2]));
	
	try
	{
		var date=new Date(this.year,this.month-1,this.day,0,0);
		//date.setFullYear(this.year,this.month,this.day);
	}
	catch(e)
	{	
		date=null;
	}
	
	/*alert(date);
	alert(this.year);
	alert(date.getFullYear());
	alert(this.year!=date.getFullYear());
	alert(this.month);
	alert(date.getMonth()+1);
	alert(this.month!=(date.getMonth()+1));
	alert(this.day);
	alert(date.getDate());
	alert(this.day!=date.getDate());*/
	if(date==null)
		return false;
	else if(this.year!=date.getFullYear() || this.month!=(date.getMonth()+1) || this.day!=date.getDate() )
		return false;
	else
	{
		//alert("ss "+date);
		this.date = date;
		return true;
	}
};

DateValidator.prototype.validateAgainstDateOnMode = function(_givenDate, _givenFormat, _mode, _dateName, _givenDateName)
{
	//alert(_givenDate+"  "+_givenFormat+"  "+_mode+"   "+DateValidator.COMPARE_MODE_VALUES[_mode]);
	
	var givenDate = convertStrToDate(_givenDate, _givenFormat);
	//alert(_givenDateName+"  "+_givenDate+"  "+givenDate);
	var ourDate = this.date;
	//alert(_dateName+"  "+this.element.value+"  "+ourDate);
	
	
	
	// _mode DateValidator.COMPARE_MODE_VALUES
	if(DateValidator.validateDatesOnMode(this.element.value,"dd-MM-yyyy",_givenDate,_givenFormat,_mode))
		return true;
	else
	{
		alert(_dateName + " should be " + DateValidator.COMPARE_MODE_VALUES[_mode] + " " + _givenDateName);		
		return false;
	}
};

DateValidator.validateDatesOnMode = function(_fromDateStr,_fromFormat,_toDateStr,_toFormat,_mode)
{
	var fromDate = convertStrToDate(_fromDateStr, _fromFormat);
	//alert(fromDate);
	var toDate = convertStrToDate(_toDateStr, _toFormat);
	//alert(toDate);
	
	// _mode
	if(_mode==1)	// 1: equal
	{
		if( fromDate.toLocaleString()==toDate.toLocaleString() )
			return true;
		else
			return false; 
	}
	else if(_mode==2)	// 2: less & equal
	{
		if(fromDate<=toDate)
			return true;
		else
			return false; 
	}
	else if(_mode==3)	// 3: greater & equal
	{
		if(fromDate>=toDate)
			return true;
		else
			return false; 
	}
	else if(_mode==4)	// 4: less
	{
		if(fromDate<toDate)
			return true;
		else
			return false; 
	}
	else if(_mode==5)	// 5: greater
	{
		if(fromDate>toDate)
			return true;
		else
			return false; 
	}
	else if(_mode==6)	// 6: not equal
	{
		if(fromDate.toLocaleString()!=toDate.toLocaleString())
			return true;
		else
			return false; 
	}
	return false;
};

DateValidator.validate = function(_elem, _elemName)
{
	// ValidateDate
	var datValObj = _elem.Pragya_Control;
	if(_elem.value!="" && _elem.value==DateValidator.DATE_FORMAT)
	{
		alert("Please Enter "+_elemName+" in Format "+datValObj.format);
		datValObj.element.focus();
		return false;
	}
	if(_elem.value!="" && !ValidationFunctions.validateDateFormatValue(_elem.value))
	{
		alert(_elemName+" is not in Proper Format.. \nPlease Enter in "+datValObj.format+" Format");
		datValObj.element.focus();
		return false;
	}
	if(_elem.value!="" && !datValObj.validateDate())
	{
		alert(_elemName+" is not a Correct Date");
		datValObj.element.focus();
		return false;
	}
	return true;
};

DateValidator.validateDate = function(_val)
{
	var ds, day, month, year;
	try
	{
		if(_val.length!=10)	return false;
		ds = _val.split("-");
		if(ds.length!=3)	return false;
		day = parseInt(trimLeftZero(ds[0]));
		month = parseInt(trimLeftZero(ds[1]));
		year = parseInt(trimLeftZero(ds[2]));
	}
	catch(e)
	{
		return false;
	}
	
	var date=null;
	try
	{
		date=new Date(year,month-1,day,0,0);
	}
	catch(e)
	{	
		date=null;
	}
	
	if(date==null)	return false;	
	if(year!=date.getFullYear() || month!=(date.getMonth()+1) || day!=date.getDate() )	return false;
	
	return true;
};

DateValidator.evtSetDateEnter = function(evnt,obj)
{
	try
	{
		var elem = null;
		if(evnt!=null)
		{
			elem = DateValidator.getTargetElement(evnt);
			while(elem.tagName.toUpperCase()!="INPUT")
				elem=elem.parentNode;
		}
		else if(obj)
			elem = obj;
		
		var datValObj = elem.Pragya_Control;  
		if(elem.value == datValObj.format)
		{
			/*//alert(elem.value == datValObj.format);
			//elem.value = datValObj.format.replace("[a-zA-Z]"," ");
			var val = elem.value; 
			while(/[a-zA-Z]/.test(val))
				val = val.replace(/[a-zA-Z]/," ");
			//alert(datValObj.format.replace(/[a-zA-Z]/," "));
			//alert(val);
			elem.value = val;*/
			elem.value = "";
		}
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

DateValidator.evtValidateDateBlur = function(evnt)
{
	try
	{
		var elem = DateValidator.getTargetElement(evnt);
		while(elem.tagName.toUpperCase()!="INPUT")
			elem=elem.parentNode;
		var datValObj = elem.Pragya_Control;
		
		if(elem.value!="" && !ValidationFunctions.validateDateFormatValue(elem.value))
		{
			alert("Date is not in Proper Format.. \nPlease Enter in "+datValObj.format+" Format");
			datValObj.element.focus();
			return;
		}
		
		if(elem.value!="" && !datValObj.validateDate())
		{
			alert("Not a Proper Date");
			datValObj.element.focus();
		}		
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

/*DateValidator.setDateString = function(_val)
{
	var dateStr = DateValidator.DATE_FORMAT;

	_val = trimData(_val);
	if(_val=="")	return dateStr;

	//if(_val.length!=10)	return false;
	var day,month,year;
	
	var arrParts = _val.split("-");
	if(arrParts.length==3)
	{
		day = trimLeftZero(trimData(arrParts[0]));
		if(day=="" || parseInt(day)==0) day="dd";
		else if(day<
		
		month = trimLeftZero(trimData(arrParts[1]));
		if(month=="" || parseInt(month)==0) month="mm";
		
		year = trimLeftZero(trimData(arrParts[2]));
		if(year=="" || parseInt(year)==0) year="yyyy";
		
		date = 
	}
	else if(ds.length<3)
	{
	}
	else if(ds.length>3)
	{
	}
	
	
	return dateStr;
}; */

DateValidator.evtKeyPressDate = function(evnt)
{
	try
	{
		var flag = true;
		var charCode;
		if(typeof evnt.charCode != 'undefined')	// Other
			charCode=evnt.charCode;
		else									// IE
			charCode=evnt.keyCode;

		var elem = DateValidator.getTargetElement(evnt);
		while(elem.tagName.toUpperCase()!="INPUT")
			elem=elem.parentNode;

		if( charCode==0 || 
			//(charCode==45 && (elem.value.length==2 || elem.value.length==5)) || 
			(charCode>=48 && charCode<= 57))
			flag=true;
		else
			flag=false;

		if((charCode>=48 && charCode<= 57) && (elem.value!="" && (elem.value.length==2 || elem.value.length==5)))
		{
			elem.value+=elem.value="-";
		}

		if(!flag && typeof evnt.preventDefault != 'undefined')
		{
			evnt.preventDefault();
		}
		return flag;
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

DateValidator.evtKeyUpDate = function(evnt)
{
	try
	{
		var elem = DateValidator.getTargetElement(evnt);
		while(elem.tagName.toUpperCase()!="INPUT")
			elem=elem.parentNode;
		
		/*elem.value = DateValidator.setDateString(elem.value);
		var _val = elem.value;
		_val = _val
		if(_val*/
		if(elem.value!="" && (elem.value.length==2 || elem.value.length==5))
		{
			elem.value+=elem.value="-";
		}
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

// ******************************************************************************


// ******************************************************************************
// *** DateValidator's Static Utility Functions

	// Is Browser is Internet Explorer ? 
	DateValidator.IS_IE =(/msie/i.test(navigator.userAgent));

	DateValidator.DATE_FORMAT = "dd-mm-yyyy";
	DateValidator.COMPARE_MODE_VALUES = {};
		// _mode
		// 1: equal
		// 2: less & equal
		// 3: greater & equal
		// 4: less
		// 5: greater
		// 6: not equal
		DateValidator.COMPARE_MODE_VALUES["1"] = "equal to";
		DateValidator.COMPARE_MODE_VALUES["2"] = "less than or equal to";
		DateValidator.COMPARE_MODE_VALUES["3"] = "greater than or equal to";
		DateValidator.COMPARE_MODE_VALUES["4"] = "less than";
		DateValidator.COMPARE_MODE_VALUES["5"] = "greater than";
		DateValidator.COMPARE_MODE_VALUES["6"] = "not equal to";
	
	DateValidator.COMPARE_MODES = {};
		// _mode
		// 1: equal
		// 2: less & equal
		// 3: greater & equal
		// 4: less
		// 5: greater
		// 6: not equal
		DateValidator.COMPARE_MODES["EqualTo"] = "1";
		DateValidator.COMPARE_MODES["LessNEqual"] = "2";
		DateValidator.COMPARE_MODES["GreaterNEqual"] = "3";
		DateValidator.COMPARE_MODES["Less"] = "4";
		DateValidator.COMPARE_MODES["Greater"] = "5";
		DateValidator.COMPARE_MODES["NotEqual"] = "6";

// Getting Absolute Position of given Element
DateValidator.getAbsolutePosition = function(elem)
{
	var SL = 0, ST = 0; // Scroll Left, Scroll Top
	var isDiv = /^div$/i.test(elem.tagName.toLowerCase());
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
DateValidator.isRelated = function (elem, evnt)
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
DateValidator.removeClass = function(elem, className)
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
DateValidator.addClass = function(elem, className)
{
	DateValidator.removeClass(elem, className);
	elem.className += " " + className;
};

DateValidator.getElement = function(evnt,elem)  // Who's Event is called
{
	var f = DateValidator.IS_IE ? window.event.srcElement : evnt.currentTarget;
	return f;
};

DateValidator.getTargetElement = function(evnt)	// Which is targeted
{
	var f = DateValidator.IS_IE ? window.event.srcElement : evnt.target;
	return f;
};

// Stopping Event
DateValidator.stopEvent = function(evnt)
{
	evnt || (evnt = window.event);
	if (DateValidator.IS_IE)
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
DateValidator.addEvent = function(elem, evntName, funcName)
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
DateValidator.addKeyEvent = function(elem, evntName, funcName)
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
DateValidator.removeEvent = function(elem, evntName, funcName)
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
DateValidator.createElement = function(type, parent)
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
DateValidator.createInputElement = function(_type, _parent)
{
	_parent.innerHTML = _parent.innerHTML + "<input type='" + _type + "' />";
	return _parent.lastChild;
};

DateValidator.removeAllChildren = function(elem)
{
	while(elem.childNodes.length>0)
		for(var i=0;i<elem.childNodes.length;i++)
			elem.removeChild(elem.childNodes[i]);
		
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
/**** End DateValidator's Static Utility Functions ****/
/******************************************************************************/