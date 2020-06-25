
// ******************************************************************************
/*Requiremnt :	1. include js File "/hisglobal/utility/generictemplate/js/validationFunctions.js"
				2. include js File "/hisglobal/js/utilityFunctions.js"
*/
// ******************************************************************************

	// Global Object that holds the TimeValidator Object
window.Pragyas_TimeValidator = null;

// ******************************************************************************
	// TimeValidator Object

TimeValidator = function(_name, _targetElement, _containerElement)
{
	if(_containerElement!=null && typeof _containerElement != 'undefined')	this.elemContainer = _containerElement;
	else	this.elemContainer = null;

	if(_targetElement!=null)	this.element = _targetElement;
	else				this.element = null;

	this.elemName = _name;

	this.hour = null;
	this.minute = null;
	this.time = null;
	this.format = "hh:mm";
};

TimeValidator.setup = function(_elementName, _containerElement)
{
	if(!_elementName)
	{
		alert("Name for Date Validator is Required");
		return;
	}
	if(!(typeof _containerElement!="undefined" && typeof _containerElement!="object" && _containerElement.canHaveChildren==true))
	{
		alert("Not a Right Container Element for Date Validator");
		return;
	}
	
	var DV = new DateValidator(_elementName, null, _containerElement);
	DV.create(_containerElement);
		
	var objName = "Pragyas_DateValidator_"+_elementName+"_"+DateValidator.findIndex(DV.element);
	window[objName] = DV;
};

TimeValidator.setup = function(_elementName, _containerElement)
{
	if(!_elementName)
	{
		alert("Name for Time Validator is Required");
		return;
	}	
	if(!(typeof _containerElement!="undefined" && typeof _containerElement!="object" && _containerElement.canHaveChildren==true))
	{
		alert("Not a Right Container Element for Time Validator");
		return;
	}
	
	var TV = new TimeValidator(_elementName, null, _containerElement);
	TV.create(_containerElement);
		
	var objName = "Pragyas_TimeValidator_"+_elementName+"_"+TimeValidator.findIndex(TV.element);
	window[objName] = TV;
};

TimeValidator.setupOnFocus = function(_targetElement)
{
	if(!(typeof _targetElement=="object" && _targetElement.tagName.toUpperCase()=="INPUT" ))
	{
		alert("Not a Right Element for Time Validator");
		return;
	}
	
	var objName = "Pragyas_TimeValidator_"+_targetElement.name+"_"+TimeValidator.findIndex(_targetElement);
	if(typeof window[objName] == 'undefined')
	{
		var TV = window[objName] = new TimeValidator(_targetElement.name, _targetElement);
		TV.create(null,_targetElement);
		//TimeValidator.evtSetTimeEnter(null,TV.element);
	}
};

TimeValidator.findIndex = function(obj)
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

TimeValidator.prototype.create = function(_parent,_text)
{
	var text = _text;
	if(typeof _text == 'undefined')
	{
		this.elemContainer=_parent;
		text = TimeValidator.createElement("input",_parent);
	}
	this.element = text;
	
	text.Pragya_Control = this;
	text.Control_Object = this;
	text.Control = this;
	text.name = this.elemName;
	text.maxLength = 5;
	text.size = 6;	
	text.tabIndex = "1";
	if(text.value=="") text.value = this.format;
	TimeValidator.addEvent(text, "focus", TimeValidator.evtSetTimeEnter);
	TimeValidator.addEvent(text, "blur", TimeValidator.evtValidateTimeBlur);
	TimeValidator.addEvent(text, "keypress", ValidationFunctions.evtValidateTimeFormat);	
	TimeValidator.addEvent(text, "keyup", TimeValidator.evtKeyUpDate);
};

TimeValidator.prototype.setTime = function(_time)
{
	this.time = _time;
	this.element.value = this.time;
	if(!this.validateTime())
		return false;
	return true;
};

TimeValidator.prototype.validate = function()
{
	return this.validateTime();
};

TimeValidator.prototype.validateTime = function()
{
	var _objTime = this.element;
	var time = "";
	if(_objTime.value!="")
	{
		if(_objTime.value.length<3 || _objTime.value.length>5)	return false;		
		if(_objTime.value.indexOf(':') == -1)	return false;
		var tokens = _objTime.value.split(":");
		if(tokens.length>2)	return false;
		var hour = parseInt(trimLeftZero(tokens[0]));
		var min = parseInt(trimLeftZero(tokens[1]));
		if(hour<0 || hour>23)	return false;
		if(min<0 || min>59)	return false;	
		time = "";	
		if(hour<10)	time+="0"+hour;	else	time+=hour;
		if(min<10)	time+=":"+"0"+min;	else	time+=":"+min;
	}
	this.time = time;
	return true;
};

TimeValidator.validateTime = function(_val)
{
	try
	{
		if(_val.length!=5)	return false;		
		if(_val.indexOf(':') != 2)	return false;
		var tokens = _val.split(":");
		if(tokens.length!=2)	return false;
		var hour = parseInt(trimLeftZero(tokens[0]));
		var min = parseInt(trimLeftZero(tokens[1]));
		if(hour<0 || hour>23)	return false;
		if(min<0 || min>59)		return false;	
	}
	catch(e)
	{
		return false;
	}	
	return true;
};


TimeValidator.evtSetTimeEnter = function(evnt,obj)
{
	try
	{
		var elem = null;
		if(evnt!=null)
		{
			elem = TimeValidator.getTargetElement(evnt);
			while(elem.tagName.toUpperCase()!="INPUT")
				elem=elem.parentNode;
		}
		else if(obj)
			elem = obj;
			 
		var timeValObj = elem.Pragya_Control;		
		if(elem.value == timeValObj.format)		elem.value = "";
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

TimeValidator.evtValidateTimeBlur = function(evnt)
{
	try
	{
		var elem = TimeValidator.getTargetElement(evnt);
		while(elem.tagName.toUpperCase()!="INPUT")
			elem=elem.parentNode;
		var timeValObj = elem.Pragya_Control;
		
		if(elem.value!="" && !ValidationFunctions.validateTimeFormatValue(elem.value))
		{
			alert("Time is not in Proper Format.. \nPlease Enter in "+timeValObj.format+" Format");
			timeValObj.element.focus();
			return;
		}
		
		if(elem.value!="" && !timeValObj.validateTime())
		{
			alert("Not a Proper Time");
			timeValObj.element.focus();
		}		
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};

TimeValidator.evtKeyUpDate = function(evnt)
{
	try
	{
		var elem = DateValidator.getTargetElement(evnt);
		while(elem.tagName.toUpperCase()!="INPUT")
			elem=elem.parentNode;
		
		if(elem.value!="" && (elem.value.length==2))
		{
			elem.value+=elem.value=":";
		}
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
};


// ******************************************************************************


// ******************************************************************************
// *** TimeValidator's Static Utility Functions

	// Is Browser is Internet Explorer ? 
	TimeValidator.IS_IE =(/msie/i.test(navigator.userAgent));

// Getting Absolute Position of given Element
TimeValidator.getAbsolutePosition = function(elem)
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
TimeValidator.isRelated = function (elem, evnt)
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
TimeValidator.removeClass = function(elem, className)
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
TimeValidator.addClass = function(elem, className)
{
	TimeValidator.removeClass(elem, className);
	elem.className += " " + className;
};

TimeValidator.getElement = function(evnt,elem)  // Who's Event is called
{
	var f = TimeValidator.IS_IE ? window.event.srcElement : evnt.currentTarget;
	return f;
};

TimeValidator.getTargetElement = function(evnt)	// Which is targeted
{
	var f = TimeValidator.IS_IE ? window.event.srcElement : evnt.target;
	return f;
};

// Stopping Event
TimeValidator.stopEvent = function(evnt)
{
	evnt || (evnt = window.event);
	if (TimeValidator.IS_IE)
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
TimeValidator.addEvent = function(elem, evntName, funcName)
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
TimeValidator.addKeyEvent = function(elem, evntName, funcName)
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
TimeValidator.removeEvent = function(elem, evntName, funcName)
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
TimeValidator.createElement = function(type, parent)
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
TimeValidator.createInputElement = function(_type, _parent)
{
	_parent.innerHTML = _parent.innerHTML + "<input type='" + _type + "' />";
	return _parent.lastChild;
};

TimeValidator.removeAllChildren = function(elem)
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
/**** End TimeValidator's Static Utility Functions ****/
/******************************************************************************/