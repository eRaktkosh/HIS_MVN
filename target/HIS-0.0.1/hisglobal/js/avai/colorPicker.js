

/*
 *
 		<input name="color" id="color" readonly="readonly" value='#000000' type="text" maxlength="7" size="10"
			style="width: 80px; font-size: 12px; height: 17px; float: left; border: 0px; padding-top: 2px">
					
		<img src="/BLDAHIMS/hisglobal/images/select_arrow.gif" id="color1"
			style="float: right; padding-right: 1px; padding-top: 1px" title="Color Picker"
			onmouseover="this.src='/BLDAHIMS/hisglobal/images/select_arrow_over.gif'"
			onmouseout="this.src='/BLDAHIMS/hisglobal/images/select_arrow.gif'">
			
		<script language="JavaScript">
			ColorPicker.setup({ inputField : "color", button : "color1", singleClick : true });	
		</script>						
 *
 *
**/



/******************************************************************************/
/**** Color Picker Constructor ****/
ColorPicker = function (oldColor, onSelected, onClose)
{
	// Member Variables	
	this.oldColor = oldColor || "#000000";			// Old Color
	this.color = null;								// Selected Color
		 
	////
	this.activeDIV = null;	
	this.currentColorElem = null;	
	this.getColorStatus = null;	
	this.getColorToolTip = null;	
	this.getColorText = null;	
	this.timeout = null;
	
		
	this.onSelected = onSelected || null;
	this.onClose = onClose || null;
	this.dragging = false;
	this.hidden = false;
	this.isPopup = true;							// Is Picker a Pop Up
	
	 
	
	// HTML elements
	this.baseElement = null;						// Base Element Div
	this.baseTable = null;							// Base Table Div	
	this.barElement = null;							// Top Tabs Bar Element Div	
	this.contentElement = null;						// Content Element Div
	
	this.previewElement = null;						// Preview Element Div
	this.closeElement = null;						// Close Button Element Div
	 
	 
	// Information
	this.colorClicked = false;						// True when color is clicked for selecting
		

	// One-Time Initializations
	this.elemRGBTab = new RGBTab(this);
	this.elemHSBTab = new HSBTab(this);
	this.elemNamedColorsTab = new NamedColorsTab(this);	
		
	this.showRGBTab = true;
	this.showHSBTab = true;
	this.showNamedColorsTab = true;	

	this.tabList = {}
	this.tabList["RGB"] = this.elemRGBTab;
	this.tabList["HSB"] = this.elemHSBTab;
	this.tabList["NamedColors"] = this.elemNamedColorsTab;
	
	this.tabsBar = new ColorPickerTabsBar(this);
	
	this.pickerContent = new ColorPickerContent(this);

	this.previewBar = new PreviewBar(this);
	
	this.closeButton =  new ColorPickerCloseButton(this);
	// Initail Values
	this.activeTab = this.elemRGBTab;	
};

/**** End Color Picker Constructor ****/
/******************************************************************************/



/******************************************************************************/
/**** Color Picker Instance Methods ****/

	/**
	 *  This function creates the ColorPicker inside the given parent.  If _par is
	 *  null than it creates a popup ColorPicker inside the BODY element.  If _par is
	 *  an element, be it BODY, then it creates a non-popup ColorPicker (still
	 *  hidden).  Some properties need to be set before calling this function.
	 */
ColorPicker.prototype.create = function (_parent)
{
	
	var parent = null;
	if (! _parent)
	{
		// default parent is the document body, in which case we create
		// a popup ColorPicker.
		parent = document.getElementsByTagName("body")[0];
		this.isPopup = true;
	}
	else
	{
		parent = _parent;
		this.isPopup = false;
	}
	this.color = this.oldColor;
	
	// Creating BaseElement Div 
	var div = ColorPicker.createElement("div");
	div.id="Pragyas_ColorPicker";
	this.baseElement = div;
	
	if (this.isPopup)
	{
		div.style.position = "absolute";
		div.style.display = "none";
	}
	
	
	// Creating Base Table
	var tbl = ColorPicker.createElement("table");	
	tbl.cellSpacing = 0;
	tbl.cellPadding = 0;
	tbl.ColorPicker = this;
	div.appendChild(tbl);
	this.baseTable = tbl;

	var thead = ColorPicker.createElement("thead",tbl);
	
	// Creating Tabs Bar
	var tr = ColorPicker.createElement("tr",thead);
	var td = ColorPicker.createElement("td",tr);
	// this.tabsBar.create(div);
	this.tabsBar.create(td);	// Creates Tab Bar with all Tabs Names and Close Button 
		
	tr = ColorPicker.createElement("tr",thead);
	td = ColorPicker.createElement("td",tr);
	// this.pickerContent.create(div);
	this.pickerContent.create(td);
	tr = ColorPicker.createElement("tr",thead);
	td = ColorPicker.createElement("td",tr);
	// this.previewBar.create(div);
	this.previewBar.create(td);	

	parent.appendChild(this.baseElement);	
	this.show();
};


	// Shows the ColorPicker
ColorPicker.prototype.show = function()
{
	this.baseElement.style.display = "block";
	this.hidden = false;
	this.hideShowCovered();
};

	// Hide Show of Elements that can cover the ColorPicker 
ColorPicker.prototype.hideShowCovered = function()
{
	if (!ColorPicker.IS_IE && !ColorPicker.IS_FIREFOX)
		return;
		
	function getVisible(obj)
	{
		var value = obj.style.visibility;
		if (!value)
		{
			if (document.defaultView && typeof (document.defaultView.getComputedStyle) == "function")
				value = document.defaultView.getComputedStyle(obj, "").getPropertyValue("visibility");
			else if (obj.currentStyle)
				value = obj.currentStyle.visibility;
			else
				value = "";
		}
		return value;
	};

	var tags = new Array("applet", "iframe", "select");
	var elem = this.baseElement;

	var pos = ColorPicker.getAbsolutePosition(elem);
	var EX1 = pos.x;
	var EX2 = elem.offsetWidth + EX1;
	var EY1 = pos.y;
	var EY2 = elem.offsetHeight + EY1;

	for (var k = tags.length; k > 0; )
	{
		var ar = document.getElementsByTagName(tags[--k]);
		var cc = null;

		for (var i = ar.length; i > 0;)
		{
			cc = ar[--i];

			pos = ColorPicker.getAbsolutePosition(cc);
			var CX1 = pos.x;
			var CX2 = cc.offsetWidth + CX1;
			var CY1 = pos.y;
			var CY2 = cc.offsetHeight + CY1;

			if (this.hidden || (CX1 > EX2) || (CX2 < EX1) || (CY1 > EY2) || (CY2 < EY1))
			{
				if (!cc.__msh_save_visibility)
				{
					cc.__msh_save_visibility = getVisible(cc);
				}
				cc.style.visibility = cc.__msh_save_visibility;
			}
			else
			{
				if (!cc.__msh_save_visibility)
				{
					cc.__msh_save_visibility = getVisible(cc);
				}
				cc.style.visibility = "hidden";
			}
		}
	}
};

	// Shows ColorPicker Near the Given Element
ColorPicker.prototype.showAtElement = function(elem, alignment)
{
	var pos = ColorPicker.getAbsolutePosition(elem);
	if (!alignment || typeof alignment != "string")
	{
		this.showAt(pos.x, pos.y + elem.offsetHeight);
		return true;
	}
	this.baseElement.style.display = "block";
	
	var w = this.baseElement.offsetWidth;
	var h = this.baseElement.offsetHeight;
	this.baseElement.style.display = "none";
	var valign = alignment.substr(0, 1);
	var halign = "l";
	if (alignment.length > 1)
	{
		halign = alignment.substr(1, 1);
	}
	// Vertical Alignment
	switch (valign)
	{
		case "T": pos.y -= h; break;
		case "B": pos.y += elem.offsetHeight; break;
		case "C": pos.y += (elem.offsetHeight - h) / 2; break;
		case "t": pos.y += elem.offsetHeight - h; break;
		case "b": break; // already there
	}
	
	// Horizontal Alignment
	switch (halign)
	{
	    case "L": pos.x -= w; break;
	    case "R": pos.x += elem.offsetWidth; break;
	    case "C": pos.x += (elem.offsetWidth - w) / 2; break;
	    case "l": pos.x += elem.offsetWidth - w; break;
	    case "r": break; // already there
	}
	pos.width = w;
	pos.height = h + 40;

	
	// If Position is not got
	if(pos.x < 0)	pos.x = 0;
	if(pos.y < 0)	pos.y = 0;
	
	var controlDiv = ColorPicker.createElement("div");
	controlDiv.style.position = "absolute";
	controlDiv.style.right = controlDiv.style.bottom = controlDiv.style.width = controlDiv.style.height = "0px";
	document.body.appendChild(controlDiv);
	var posDiv = ColorPicker.getAbsolutePosition(controlDiv);
	document.body.removeChild(controlDiv);
	
	if (ColorPicker.IS_IE)
	{
		posDiv.y += document.body.scrollTop;
		posDiv.x += document.body.scrollLeft;
	}
	else
	{
		posDiv.y += window.scrollY;
		posDiv.x += window.scrollX;
	}
	var tmp = pos.x + pos.width - posDiv.x;
	if (tmp > 0)	pos.x -= tmp;
	tmp = pos.y + pos.height - posDiv.y;
	if (tmp > 0)	pos.y -= tmp;

	this.showAt(pos.x, pos.y);
};

	// Shows the ColorPicker at Given Absolute Position
ColorPicker.prototype.showAt = function(x, y)
{
	var s = this.baseElement.style;
	s.left = x + "px";
	s.top = y + "px";
	this.show();
};

ColorPicker.prototype.hide = function()
{
	if (this.isPopup)
	{
		ColorPicker.removeEvent(document, "mousedown", ColorPicker._outFocusColorPicker);
	}
	this.baseElement.style.display = "none";
	this.hidden = true;
	this.hideShowCovered();
};


	// Calls the Second User Handler (closeHandler)
ColorPicker.prototype.callCloseHandler = function()
{
	if (this.onClose)
	{
		this.onClose(this);
	}
	this.hideShowCovered();
};

ColorPicker.prototype.setOldColor = function (color)
{
	if (color != this.oldColor)
	{
		this.oldColor = color;
	}
};

ColorPicker.prototype.setColor = function (color)
{
	if (color != this.color)
	{
		this.color = color;
	}
};

/**
 *  Refreshes the ColorPicker
 */
ColorPicker.prototype.refresh = function ()
{
	
};

/** Removes the ColorPicker object from the DOM tree and destroys it. */
ColorPicker.prototype.destroy = function () {
	var el = this.baseElement.parentNode;
	el.removeChild(this.baseElement);
	ColorPicker._C = null;
	window.Pragyas_ColorPicker = null;
};

	/**
	 *  Moves the ColorPicker element to a different section in the DOM tree (changes
	 *  its parent).
	 */
ColorPicker.prototype.reparent = function (new_parent) {
	var el = this.baseElement;
	el.parentNode.removeChild(el);
	new_parent.appendChild(el);
};

/**** End Color Picker Instance Methods ****/
/******************************************************************************/


/******************************************************************************/
/**** Color Picker Static Methods ****/

ColorPicker.cancelEvent = function()
{
	return false;
};

/**/ColorPicker.close =	function()
{
	var picker = ColorPicker.getPickerElem();
	picker.baseElement.style.display="none";
};

ColorPicker.setColor = function(color)
{
	var picker = ColorPicker.getPickerElem();
	picker.color=color;
	picker.previewBar.refreshColor();	
};

ColorPicker.getSliderElemFromPicker = function(frstChar)
{
	var picker = ColorPicker.getPickerElem();
	var tab = picker.elemRGBTab;
	var slider=tab.sliderList[frstChar];
	return slider;
};

ColorPicker.getAllSliderElemsFromPicker = function()
{
	var picker = ColorPicker.getPickerElem();
	return picker.elemRGBTab.sliderList;
};

ColorPicker.getPreviewElemFromPicker = function()
{
	var picker = ColorPicker.getPickerElem();
	return picker.previewBar;
};

ColorPicker.getPickerElem = function()
{
	return window.Pragyas_ColorPicker;
};

	// This gets called when the user presses a mouse button anywhere 
	// If the click was outside the open ColorPicker this function closes it.
ColorPicker._outFocusColorPicker = function(evnt)
{
	var picker = ColorPicker.getPickerElem();
	if (!picker)
	{
		return false;
	}
	//var elem = ColorPicker.IS_IE ? ColorPicker.getElement(evnt,this) : ColorPicker.getTargetElement(evnt);
	var elem = ColorPicker.getElement(evnt,this);
	for (; elem != null && elem != ColorPicker.baseElement; elem = elem.parentNode);
	if (elem == null)
	{
		// calls closeHandler which should hide the ColorPicker.
		picker.callCloseHandler();
		return ColorPicker.stopEvent(evnt);
	}
};

ColorPicker.setFinalColor = function()
{
	var picker = ColorPicker.getPickerElem();
	picker.colorClicked = true;
	if(picker.onSelected)
		eval(picker.onSelected());	
}
/**** End Color Picker Static Methods ****/
/******************************************************************************/


/******************************************************************************/
/**** ColorPicker's Setup Function ****/

// Global Object that holds the ColorPicker Object
window.Pragyas_ColorPicker = null;

ColorPicker.setup = function (params) 
{	
	function setParaDefault(name, val) { if (typeof params[name] == "undefined") { params[name] = val; } };

	setParaDefault("inputField",    null);		// Mandatory (Default Triggering Elemnt)
	setParaDefault("button",        null);		// If present, Triggering Element 
	
	setParaDefault("actionEvent",   "click");
	
	setParaDefault("oldColor",      "#000000");	
	setParaDefault("singleClick",    true);

	setParaDefault("align",          "Br");//"left");
	setParaDefault("position",       null);
	
	setParaDefault("onSelect",       null);
	setParaDefault("onClose",        null);
	setParaDefault("onUpdate",       null);

	setParaDefault("cache",          false);
	

	// Setting Actual Elements in params
	var tmp = ["inputField", "button"];
	for (var i in tmp)
	{
		if (typeof params[tmp[i]] == "string")
		{
			params[tmp[i]] = document.getElementById(params[tmp[i]]);
		}
	}
	
	// If Input Element not specified, Do Not show Color Picker
	if (!params.inputField)
	{
		alert("ColorPicker.setup:\n  Nothing to setup (no fields found).  Please check your code");
		return false;
	}

	// On Selection of the Color
	function onSelect(picker)
	{		
		if(!picker)	picker = ColorPicker.getPickerElem();
		var p = picker.params;
		if(picker.colorClicked)
		{
		
			if(typeof p.inputField.value != 'undefined')
				p.inputField.value = picker.color;
			else
				p.innerHTML = picker.color;				
			if (typeof p.inputField.onchange == "function")
				p.inputField.onchange();		
			if (typeof p.onUpdate == "function")
				p.onUpdate(picker);			
			if (p.singleClick)
				picker.callCloseHandler();
		}
	};
	
	var triggerElem= params.button || params.inputField;
	
	triggerElem["on" + params.actionEvent] = function()
	{
		var colorElem = params.inputField;
		var mustCreate = false;
		var picker = window.Pragyas_ColorPicker;
		if (colorElem)
			params.oldColor = colorElem.value || colorElem.innerHTML;		
		if (!picker)
		{
			window.Pragyas_ColorPicker = picker = new ColorPicker(	params.oldColor,
							     								params.onSelect || onSelect,
															params.onClose || function(picker) { picker.hide(); });
			mustCreate = true;
		}
		else
		{
			if (params.oldColor)
			{
				picker.setOldColor(params.oldColor);
				picker.setColor(params.oldColor);
			}
			picker.hide();
		}		
		picker.params = params;
		
		if (mustCreate)
			picker.create();
			
		picker.refresh();
		
		if (!params.position)
			picker.showAtElement(params.button || params.inputField, params.align);
		else
			picker.showAt(params.position[0], params.position[1]);
		return false;
	};

	//return window.Pragyas_ColorPicker;
};

/**** End ColorPicker's Setup Function ****/
/******************************************************************************/



/******************************************************************************/
/**** ColorPicker's Utility Functions ****/

// Getting Absolute Position of given Element
ColorPicker.getAbsolutePosition = function(elem)
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
ColorPicker.isRelated = function (elem, evnt)
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
ColorPicker.removeClass = function(elem, className)
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
ColorPicker.addClass = function(elem, className)
{
	ColorPicker.removeClass(elem, className);
	elem.className += " " + className;
};

ColorPicker.getElement = function(evnt,elem)  // Who's Event is called
{
	var f = ColorPicker.IS_IE ? window.event.srcElement : evnt.currentTarget;

	/*if(ColorPicker.IS_IE)
	{
		alert(f.tagName+" -> "+ 'on'+window.event.type + " = " + f["on"+window.event.type]);
		while(f && !f["on"+window.event.type])
		{
			var s="";
			for(var i in f)
			if( /^on/.test(i))
			{
				s+=i+" "+f[i]+" \n";
				if(s.length>600)
				{
					alert(s);
					s="";
				}
			}
			alert(s);		
			
			f = f.parentNode;
			alert(f.tagName+" -> "+ "on"+window.event.type + " = " + f["on"+window.event.type]);
		}
	}
	else
	{
		alert(f.tagName+" -> "+ 'on'+evnt.type + " = " + f[evnt.type]);
		while(f && !f["on"+evnt.type])
		{
			var s="";
			for(var i in f)
			if( /^on/.test(i))
			{
				s+=i+" "+f[i]+" \n";
				if(s.length>600)
				{
					alert(s);
					s="";
				}
			}
			alert(s);		
			
			f = f.parentNode;
			alert(f.tagName+" -> "+ "on"+evnt.type + " = " + f[evnt.type]);
		}
	}*/
	
	
	//alert(elem.tagName);
	//f=elem;
	//var s="";
	/*for(var i in window.event)
	{
		s+=i+" "+window.event[i]+" \n";
		if(s.length>600)
		{
			alert(s);
			s="";
		}
	}
	alert(s);
	alert(window['event']);*/



	/*s="";
	for(var i in f)
		if(typeof f[i] != "function")
		{
			s+=i+" "+f[i]+" \n";
			if(s.length>600)
			{
				alert(s);
				s="";
			}
		}
	alert(s);
	
	s="";
	for(var i in f)
		if(typeof f[i] == "function")
		{
			s+="Function "+i+" =\n "+f[i]+" \n";
			if(s.length>500)
			{
				alert(s);
				s="";
			}
		}
	alert(s);*/

	/*alert("-"+ f + " " + f.tagName + " nodeType =" +f.nodeType);
	while (f.nodeType != 1 || /^div$/i.test(f.tagName))
	{
		f = f.parentNode;
		alert(f + " " + f.tagName + " nodeType =" +f.nodeType);
	}
	alert("--" + f + " " + f.tagName + " nodeType =" +f.nodeType);*/
	return f;
};

ColorPicker.getTargetElement = function(evnt)	// Which is targeted
{
	var f = ColorPicker.IS_IE ? window.event.srcElement : evnt.target;
	return f;
};

// Stopping Event
ColorPicker.stopEvent = function(evnt)
{
	evnt || (evnt = window.event);
	if (ColorPicker.IS_IE)
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
ColorPicker.addEvent = function(elem, evntName, funcName)
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
		elem["on" + evntNname] = funcName;
	}
};

// Removing Event from Element
ColorPicker.removeEvent = function(elem, evntName, funcName)
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
ColorPicker.createElement = function(type, parent)
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


/****  Color Related Methods ****/

// Converting Number from One Base to Others
ColorPicker.baseConverter = function(number, ob, nb)
{
	number = number + "";
	number = number.toUpperCase();
	var list = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var dec = 0;
	for (var i = 0; i <=  number.length; i++)
	{
		dec += (list.indexOf(number.charAt(i))) * (Math.pow(ob , (number.length - i - 1)));
	}
	number = "";
	var magnitude = Math.floor((Math.log(dec))/(Math.log(nb)));
	for (var i = magnitude; i >= 0; i--) {
		var amount = Math.floor(dec/Math.pow(nb,i));
		number = number + list.charAt(amount); 
		dec -= amount*(Math.pow(nb,i));
	}
	if(number.length==0)number=0;
	return number;
};

/**** End TemplateDesigner's Static Utility Functions ****/
/******************************************************************************/



/******************************************************************************/
/**** Constants ****/

/** ColorPicker **/

	// Is Browser is Internet Explorer ? 
	ColorPicker.IS_IE =(/msie/i.test(navigator.userAgent));

	// Is Browser is Firefox ?
	ColorPicker.IS_FIREFOX =(/firefox/i.test(navigator.userAgent));

	// SliderImage URL 
	ColorPicker.urlSliderImage = "/BLDAHIMS/hisglobal/images/slider_handle.gif";
	
/**** End Constants ****/
/******************************************************************************/




/******************************************************************************/
/**** Basic Tab Constructor ****/

ColorPickerTabsBar = function(picker)
{
	this.picker = picker || ColorPicker.getPickerElem();
	this.tabList = this.picker.tabList;
	this.element = null;
	this.width = 252;
};

ColorPickerTabsBar.cancelEvent = function()
{
	return false;
};

ColorPickerTabsBar.prototype.create = function(parent)
{		
	var div = ColorPicker.createElement("div");
	div.className = "ColorPickerTabsBar";
	parent.appendChild(div);	
	this.picker.barElement = div;
	
	var currentWidth = 0;
	var i=0;
	for (var tabTitle in this.tabList) 
	{
		var tab = this.tabList[tabTitle];
		
		var tabDiv = ColorPicker.createElement("div");
		tabDiv.id = tab["title"];
		ColorPicker.addEvent(tabDiv, "selectstart", ColorPickerTabsBar.cancelEvent);
		ColorPicker.addEvent(tabDiv, "dragstart", ColorPickerTabsBar.cancelEvent);				
		ColorPicker.addEvent(tabDiv,"click",ColorPickerTabsBar.showHideTab);		
		var suffix = "";
		if(this.picker.activeTab==tab)
		{
			tabDiv.style.zIndex = 50;
			suffix = "active";
		}
		else
		{
			tabDiv.style.zIndex = 1 + (3-i);
			suffix = "inactive";
		}
		tabDiv.className = "ColorPickerTab_" + suffix;		
		tabDiv.style.left = currentWidth + "px";
			
		var tabSpan = ColorPicker.createElement("span");
		tabSpan.innerHTML = tab["showTitle"];		
		tabDiv.appendChild(tabSpan);

		var tabImg = ColorPicker.createElement("img");
		tabImg.style.left = tab["width"]-5 -i;
		tabImg.src = "/BLDAHIMS/hisglobal/images/tab_right_" + suffix + ".gif";
		tabDiv.appendChild(tabImg);
		
		div.appendChild(tabDiv);
		
		currentWidth = currentWidth + tab["width"];
		i++;
	}
	this.picker.closeButton.create(div,this.width);
	this.element = div;
};

ColorPickerTabsBar.showHideTab = function(evnt, elem)
{
	//var thisObj = ColorPicker.IS_IE ? ColorPicker.getElement(evnt) : ColorPicker.getTargetElement(evnt);
	var thisObj = ColorPicker.getTargetElement(evnt,this);	
	var picker = ColorPicker.getPickerElem();
	
	if(elem)
		thisObj = elem;
	else
	{
		var parentNode = thisObj.parentNode;
		while(thisObj.parentNode!= picker.tabsBar.element)
		{
			parentNode = thisObj.parentNode;
			thisObj = thisObj.parentNode
		}
	}
	
	
	var tabName = thisObj.id;	

	var arr = picker.tabsBar.element.getElementsByTagName("div");
	var i=0;
	for(var name in picker.tabList)
	{
		var suffix = "";
		var tabDiv = null;
		for(var j=0; j<arr.length; j++)
			if(arr[j].id == name)
			{
				tabDiv = arr[j];
				break;
			}		
		
		if(picker.tabList[name].title == tabName)
		{
			picker.activeTab = picker.tabList[name];
			tabDiv.style.zIndex = 50;			
			suffix = "active";
		}
		else
		{
			tabDiv.style.zIndex = i;
			suffix = "inactive";
		}		
		
		tabDiv.className = "ColorPickerTab_" + suffix;
		var tabImg = tabDiv.getElementsByTagName("img")[0];
		tabImg.src = "/BLDAHIMS/hisglobal/images/tab_right_" + suffix + ".gif";
		i++;
	}		

	picker.pickerContent.showHideTabsContent();
};

/**** End Basic Tab Constructor ****/
/******************************************************************************/




/******************************************************************************/
/**** RGB Tab Constructor ****/

ColorPickerContent = function(picker)
{
	this.picker = picker || ColorPicker.getPickerElem();
	this.element = null;
};

ColorPickerContent.prototype.create = function(parent)
{
	var div = ColorPicker.createElement("div");
	parent.appendChild(div);
	this.element = div;	
	this.picker.contentElement= div;
				
	for(var tabName in this.picker.tabList)
	{ 
		var tab = this.picker.tabList[tabName];
		tab.create(div);
		if(this.picker.activeTab==tab)
			tab.show();
	}
};

ColorPickerContent.prototype.showHideTabsContent = function()
{
	for(var tabName in this.picker.tabList)
	{ 
		var tab = this.picker.tabList[tabName];
		if(this.picker.activeTab==tab)
			tab.show();
		else
			tab.hide();
	}	
};

/**** End RGB Tab Constructor ****/
/******************************************************************************/




/******************************************************************************/
/**** RGB Tab Constructor ****/

RGBTab = function(picker)
{
	this.picker = picker || ColorPicker.getPickerElem();
	this.title = "RGB";
	this.showTitle = "RGB";
	this.width = 37;
	
	this.element = null;

	this.redSlider = new RGBColorSlider("Red");
	this.greenSlider = new RGBColorSlider("Green");
	this.blueSlider = new RGBColorSlider("Blue");
	
	this.sliderList={};
		this.sliderList[this.redSlider.firstChar]=this.redSlider;
		this.sliderList[this.greenSlider.firstChar]=this.greenSlider;
		this.sliderList[this.blueSlider.firstChar]=this.blueSlider;
		
};
/**** End RGB Tab Constructor ****/

RGBTab.prototype.create = function(parent)
{
	
	var div = ColorPicker.createElement("div");
	div.id = "divRGBTab";
	div.style.paddingLeft = "3px";
	div.style.paddingTop = "5px";
	div.style.paddingBottom = "5px";
	this.element = div;
	parent.appendChild(div);	
	
	var tbl = ColorPicker.createElement("table");
	div.appendChild(tbl);
	
	var thead = ColorPicker.createElement("thead",tbl);
	var tr = ColorPicker.createElement("tr",thead);
	var td = ColorPicker.createElement("td",tr);
	this.redSlider.create(td);
	tr = ColorPicker.createElement("tr",thead);
	td = ColorPicker.createElement("td",tr);
	this.greenSlider.create(td);

	tr = ColorPicker.createElement("tr",thead);
	td = ColorPicker.createElement("td",tr);
	this.blueSlider.create(td);

	var clearingDiv = ColorPicker.createElement("div");
	clearingDiv.style.clear = "both";
	div.appendChild(clearingDiv);

	this.hide();
};

RGBTab.prototype.show = function()
{
	this.element.style.display="block";
};

RGBTab.prototype.hide = function()
{
	this.element.style.display="none";
};


/**** RGB Color Slider Constructor ****/
RGBColorSlider = function(title)
{
	this.title = title || "Red";
	
	this.firstChar = this.title.substring(0,1);
	this.element = null;
	this.sliderDiv = null;
	this.inputElement = null;
	this.value = 0;	
	this.width=161;
	this.min=0;
	this.max=255;
	this.onchangeAction = RGBColorSlider.setColorByRGB;
		
	this.sliderInProgress = false;
	this.eventStartX = null;
	this.handleStartX = null;
};

RGBColorSlider.prototype.create = function(parent)
{
	
	var div = ColorPicker.createElement("div");
	div.id = "divRGBColorSlider_"+this.firstChar;
	parent.appendChild(div);	
	this.element = div;

	var tbl = ColorPicker.createElement("table");
	tbl.cellSpacing = 0;
	tbl.cellPadding = 0;
	tbl.RGBColorSlider = this;
	div.appendChild(tbl);
	
	var thead = ColorPicker.createElement("thead", tbl);
	var tr = ColorPicker.createElement("tr", thead);
	tr.align = "left";	
	
	var td = ColorPicker.createElement("td", tr);
	td.className = "ColorSliderLabel";
	td.style.color = this.title;
	td.innerHTML = this.firstChar;

	td = ColorPicker.createElement("td", tr);
	
	var innerDiv = ColorPicker.createElement("div");
	innerDiv.className = "ColorSlider";
	innerDiv.id = this.firstChar;
	innerDiv.title = this.title;
	ColorPicker.addEvent(td,"mouseup",RGBColorSlider.stopMoveSlider);
	ColorPicker.addEvent(td,"mousemove",RGBColorSlider.startMoveSlider);
	
	td.appendChild(innerDiv);
	this.sliderDiv = innerDiv;
	
	var sliderDiv = ColorPicker.createElement("div");
	sliderDiv.className = "DivActualSlider";	
	sliderDiv.innerHTML = "<span></span>";
	sliderDiv.id = "DivActualSlider_" + this.firstChar;
	innerDiv.appendChild(sliderDiv);
	
	var handleImg = ColorPicker.createElement("img");
	handleImg.className = "ImgHandleImage";
	handleImg.id = this.firstChar;
	handleImg.src = ColorPicker.urlSliderImage;		
	ColorPicker.addEvent(handleImg,"mousedown",RGBColorSlider.initMoveSlider);
	ColorPicker.addEvent(handleImg,"dragstart",RGBColorSlider.form_widget_cancel_event);	
	innerDiv.appendChild(handleImg);	
	
	td = ColorPicker.createElement("td", tr);
	td.className = "ColorCodeDiv";
	var innerDivInput = ColorPicker.createElement("div");
	var input = ColorPicker.createElement("input");
	input.id = "txtRGBColorSlider_"+this.firstChar;
	input.className = "ColorSliderInput";
	input.name = this.firstChar;
	input.value = this.value;	
	ColorPicker.addEvent(input,"change",RGBColorSlider.positionSliderImage);	
	innerDivInput.appendChild(input);		
	this.inputElement = input;
	td.appendChild(innerDivInput);
	
	RGBColorSlider.positionSliderImage(false,this.firstChar);
};

RGBColorSlider.positionSliderImage = function(evnt, frstChar, inputObj)
{
	var inputObj = ColorPicker.getElement(evnt,this);
	
	if(!frstChar) { if(inputObj) frstChar = inputObj.name; else frstChar = "R"; } 

	if(!inputObj) inputObj=document.getElementById("txtRGBColorSlider_" + frstChar);
	
	var slider = ColorPicker.getSliderElemFromPicker(frstChar);
	var handleImg = slider.sliderDiv.getElementsByTagName("img")[0];
	
	var ratio = slider.width / (slider.max - slider.min);	
	var currentValue = slider.inputElement.value - slider.min;
	handleImg.style.left = currentValue * ratio + "px";
		
	RGBColorSlider.setColorByRGB();
};

RGBColorSlider.initMoveSlider = function(evnt)
{	
	if(!evnt)	evnt = window.event;
	//var targetElem = ColorPicker.IS_IE ? ColorPicker.getElement(evnt,this) : ColorPicker.getTargetElement(evnt);
	var targetElem = ColorPicker.getElement(evnt,this);
	
	var slider = ColorPicker.getSliderElemFromPicker(targetElem.id);
			
	slider.sliderInProgress = true;
	slider.eventStartX = evnt.clientX;
	slider.handleStartX = targetElem.style.left.replace("px","");			
	return false;
};

RGBColorSlider.stopMoveSlider = function(evnt)
{	
	var sliders = ColorPicker.getAllSliderElemsFromPicker();
	var slider = null;
	for(var s in sliders)
		if(sliders[s].sliderInProgress)
			slider=sliders[s];
	if(slider)	slider.sliderInProgress = false;
};

RGBColorSlider.startMoveSlider = function(evnt)
{
	if(!evnt)	evnt = window.event;
	
	var sliders = ColorPicker.getAllSliderElemsFromPicker();
	var slider = null;
	for(var s in sliders)
		if(sliders[s].sliderInProgress)
			slider=sliders[s];
	if(!slider)	return;
	
	var leftPos = slider.handleStartX/1 + evnt.clientX/1 - slider.eventStartX;
	if(leftPos<0)	leftPos = 0;
	if(leftPos/1 > slider.width)
		leftPos = slider.width;
	slider.sliderDiv.getElementsByTagName("img")[0].style.left = leftPos + "px";
	RGBColorSlider.adjustFormValue(slider);
	RGBColorSlider.setColorByRGB();
	/*if(slider.onchangeAction)
		eval(slider.onchangeAction);*/
};

RGBColorSlider.adjustFormValue = function(slider)
{
	var handleImg = slider.sliderDiv.getElementsByTagName("img")[0];
	var ratio = slider.width / (slider.max - slider.min);
	var currentPos = handleImg.style.left.replace("px","");
	slider.inputElement.value = Math.round(currentPos / ratio) + slider.min;
}

RGBColorSlider.form_widget_cancel_event = function()
{
	return false;		
};

RGBColorSlider.setColorByRGB = function()
{	
	if(! ColorPicker.getSliderElemFromPicker("R").inputElement)	return;
	if(! ColorPicker.getSliderElemFromPicker("G").inputElement)	return;
	if(! ColorPicker.getSliderElemFromPicker("B").inputElement)	return;
	var r = ColorPicker.getSliderElemFromPicker("R").inputElement.value.replace(/[^\d]/,"");
	var g = ColorPicker.getSliderElemFromPicker("G").inputElement.value.replace(/[^\d]/,"");
	var b = ColorPicker.getSliderElemFromPicker("B").inputElement.value.replace(/[^\d]/,"");		
	if(r/1>255)r=255;
	if(g/1>255)g=255;
	if(b/1>255)b=255;
	r = ColorPicker.baseConverter(r,10,16) + "";
	g = ColorPicker.baseConverter(g,10,16) + "";
	b = ColorPicker.baseConverter(b,10,16) + "";
	if(r.length==1)r = "0" + r;
	if(g.length==1)g = "0" + g;
	if(b.length==1)b = "0" + b;
	ColorPicker.setColor("#" + r + g + b);
};	

/******************************************************************************/



/******************************************************************************/
/**** HSB Tab Constructor ****/

HSBTab = function(picker)
{
	this.picker = picker || ColorPicker.getPickerElem();
	this.title = "HSB";
	this.showTitle = "HSB";
	this.width = 37;
	this.element = null;
};

HSBTab.prototype.create = function(parent)
{
	var div = ColorPicker.createElement("div");
	div.style.paddingTop = "1px";
	parent.appendChild(div);	
	
	for(var r=15;r>=0;r-=3)
	{
		for(var g=0;g<=15;g+=3)
		{
			for(var b=0;b<=15;b+=3)
			{
				var red = ColorPicker.baseConverter(r,10,16) + "";
				var green = ColorPicker.baseConverter(g,10,16) + "";
				var blue = ColorPicker.baseConverter(b,10,16) + "";
				
				var color = "#" + red + red + green + green + blue + blue;
				
				var colorTile = new ColorTile(color);
				colorTile.create(div);
			}
		}
	}
	this.element = div;
	this.hide();
};

HSBTab.prototype.show = function()
{
	this.element.style.display="block";
};

HSBTab.prototype.hide = function()
{
	this.element.style.display="none";
};


/**** End HSB Tab Constructor ****/
/******************************************************************************/




/******************************************************************************/
/**** Named Color Tab Constructor ****/

NamedColorsTab = function(picker)
{
	this.picker = picker || ColorPicker.getPickerElem();
	this.title = "NamedColors";
	this.showTitle= "Named Colors";
	this.width = 95;
	this.element = null;
};

NamedColorsTab.prototype.create = function(parent)
{
	var div = ColorPicker.createElement("div");
	div.style.paddingTop = "1px";
	parent.appendChild(div);
	
	for(var c in NamedColorsTab.colors)	
	{
		var colorTile = new ColorTile(NamedColorsTab.colors[c],c);
		colorTile.create(div);
	}
	this.element = div;
	this.hide();
};

NamedColorsTab.prototype.show = function()
{
	this.element.style.display="block";
};

NamedColorsTab.prototype.hide = function()
{
	this.element.style.display="none";
};


NamedColorsTab.colors = {};
	NamedColorsTab.colors["AliceBlue"]="#F0F8FF";		NamedColorsTab.colors["AntiqueWhite"]="#FAEBD7";
	NamedColorsTab.colors["Aqua"]="#00FFFF";			NamedColorsTab.colors["Aquamarine"]="#7FFFD4";
	NamedColorsTab.colors["Azure"]="#F0FFFF";			NamedColorsTab.colors["Beige"]="#F5F5DC";
	NamedColorsTab.colors["Bisque"]="#FFE4C4";			NamedColorsTab.colors["Black"]="#000000";
	NamedColorsTab.colors["BlanchedAlmond"]="#FFEBCD";	NamedColorsTab.colors["Blue"]="#0000FF";
	NamedColorsTab.colors["BlueViolet"]="#8A2BE2";		NamedColorsTab.colors["Brown"]="#A52A2A";
	NamedColorsTab.colors["BurlyWood"]="#DEB887";		NamedColorsTab.colors["CadetBlue"]="#5F9EA0";
	NamedColorsTab.colors["Chartreuse"]="#7FFF00";		NamedColorsTab.colors["Chocolate"]="#D2691E";
	NamedColorsTab.colors["Coral"]="#FF7F50";			NamedColorsTab.colors["CornflowerBlue"]="#6495ED";
	NamedColorsTab.colors["Cornsilk"]="#FFF8DC";		NamedColorsTab.colors["Crimson"]="#DC143C";
	NamedColorsTab.colors["Cyan"]="#00FFFF";			NamedColorsTab.colors["DarkBlue"]="#00008B";
	NamedColorsTab.colors["DarkCyan"]="#008B8B";		NamedColorsTab.colors["DarkGoldenRod"]="#B8860B";
	NamedColorsTab.colors["DarkGray"]="#A9A9A9";		NamedColorsTab.colors["DarkGreen"]="#006400";
	NamedColorsTab.colors["DarkKhaki"]="#BDB76B";		NamedColorsTab.colors["DarkMagenta"]="#8B008B";
	NamedColorsTab.colors["DarkOliveGreen"]="#556B2F";	NamedColorsTab.colors["Darkorange"]="#FF8C00";
	NamedColorsTab.colors["DarkOrchid"]="#9932CC";		NamedColorsTab.colors["DarkRed"]="#8B0000";
	NamedColorsTab.colors["DarkSalmon"]="#E9967A";		NamedColorsTab.colors["DarkSeaGreen"]="#8FBC8F";
	NamedColorsTab.colors["DarkSlateBlue"]="#483D8B";	NamedColorsTab.colors["DarkSlateGray"]="#2F4F4F";
	NamedColorsTab.colors["DarkTurquoise"]="#00CED1";	NamedColorsTab.colors["DarkViolet"]="#9400D3";
	NamedColorsTab.colors["DeepPink"]="#FF1493";		NamedColorsTab.colors["DeepSkyBlue"]="#00BFFF";
	NamedColorsTab.colors["DimGray"]="#696969";			NamedColorsTab.colors["DodgerBlue"]="#1E90FF";
	NamedColorsTab.colors["Feldspar"]="#D19275";		NamedColorsTab.colors["FireBrick"]="#B22222";
	NamedColorsTab.colors["FloralWhite"]="#FFFAF0";		NamedColorsTab.colors["ForestGreen"]="#228B22";
	NamedColorsTab.colors["Fuchsia"]="#FF00FF";			NamedColorsTab.colors["Gainsboro"]="#DCDCDC";
	NamedColorsTab.colors["GhostWhite"]="#F8F8FF";		NamedColorsTab.colors["Gold"]="#FFD700";
	NamedColorsTab.colors["GoldenRod"]="#DAA520";		NamedColorsTab.colors["Gray"]="#808080";
	NamedColorsTab.colors["Green"]="#008000";			NamedColorsTab.colors["GreenYellow"]="#ADFF2F";
	NamedColorsTab.colors["HoneyDew"]="#F0FFF0";		NamedColorsTab.colors["HotPink"]="#FF69B4";
	NamedColorsTab.colors["IndianRed"]="#CD5C5C";		NamedColorsTab.colors["Indigo"]="#4B0082";
	NamedColorsTab.colors["Ivory"]="#FFFFF0";			NamedColorsTab.colors["Khaki"]="#F0E68C";
	NamedColorsTab.colors["Lavender"]="#E6E6FA";		NamedColorsTab.colors["LavenderBlush"]="#FFF0F5";
	NamedColorsTab.colors["LawnGreen"]="#7CFC00";		NamedColorsTab.colors["LemonChiffon"]="#FFFACD";
	NamedColorsTab.colors["LightBlue"]="#ADD8E6";		NamedColorsTab.colors["LightCoral"]="#F08080";
	NamedColorsTab.colors["LightCyan"]="#E0FFFF";		NamedColorsTab.colors["LightGoldenRodYellow"]="#FAFAD2";
	NamedColorsTab.colors["LightGrey"]="#D3D3D3";		NamedColorsTab.colors["LightGreen"]="#90EE90";
	NamedColorsTab.colors["LightPink"]="#FFB6C1";		NamedColorsTab.colors["LightSalmon"]="#FFA07A";
	NamedColorsTab.colors["LightSeaGreen"]="#20B2AA";	NamedColorsTab.colors["LightSkyBlue"]="#87CEFA";
	NamedColorsTab.colors["LightSlateBlue"]="#8470FF";	NamedColorsTab.colors["LightSlateGray"]="#778899";
	NamedColorsTab.colors["LightSteelBlue"]="#B0C4DE";	NamedColorsTab.colors["LightYellow"]="#FFFFE0";
	NamedColorsTab.colors["Lime"]="#00FF00";			NamedColorsTab.colors["LimeGreen"]="#32CD32";
	NamedColorsTab.colors["Linen"]="#FAF0E6";			NamedColorsTab.colors["Magenta"]="#FF00FF";
	NamedColorsTab.colors["Maroon"]="#800000";			NamedColorsTab.colors["MediumAquaMarine"]="#66CDAA";
	NamedColorsTab.colors["MediumBlue"]="#0000CD";		NamedColorsTab.colors["MediumOrchid"]="#BA55D3";
	NamedColorsTab.colors["MediumPurple"]="#9370D8";	NamedColorsTab.colors["MediumSeaGreen"]="#3CB371";
	NamedColorsTab.colors["MediumSlateBlue"]="#7B68EE";	NamedColorsTab.colors["MediumSpringGreen"]="#00FA9A";
	NamedColorsTab.colors["MediumTurquoise"]="#48D1CC";	NamedColorsTab.colors["MediumVioletRed"]="#C71585";
	NamedColorsTab.colors["MidnightBlue"]="#191970";	NamedColorsTab.colors["MintCream"]="#F5FFFA";
	NamedColorsTab.colors["MistyRose"]="#FFE4E1";		NamedColorsTab.colors["Moccasin"]="#FFE4B5";
	NamedColorsTab.colors["NavajoWhite"]="#FFDEAD";		NamedColorsTab.colors["Navy"]="#000080";
	NamedColorsTab.colors["OldLace"]="#FDF5E6";			NamedColorsTab.colors["Olive"]="#808000";
	NamedColorsTab.colors["OliveDrab"]="#6B8E23";		NamedColorsTab.colors["Orange"]="#FFA500";
	NamedColorsTab.colors["OrangeRed"]="#FF4500";		NamedColorsTab.colors["Orchid"]="#DA70D6";
	NamedColorsTab.colors["PaleGoldenRod"]="#EEE8AA";	NamedColorsTab.colors["PaleGreen"]="#98FB98";
	NamedColorsTab.colors["PaleTurquoise"]="#AFEEEE";	NamedColorsTab.colors["PaleVioletRed"]="#D87093";
	NamedColorsTab.colors["PapayaWhip"]="#FFEFD5";		NamedColorsTab.colors["PeachPuff"]="#FFDAB9";
	NamedColorsTab.colors["Peru"]="#CD853F";			NamedColorsTab.colors["Pink"]="#FFC0CB";
	NamedColorsTab.colors["Plum"]="#DDA0DD";			NamedColorsTab.colors["PowderBlue"]="#B0E0E6";
	NamedColorsTab.colors["Purple"]="#800080";			NamedColorsTab.colors["Red"]="#FF0000";
	NamedColorsTab.colors["RosyBrown"]="#BC8F8F";		NamedColorsTab.colors["RoyalBlue"]="#4169E1";
	NamedColorsTab.colors["SaddleBrown"]="#8B4513";		NamedColorsTab.colors["Salmon"]="#FA8072";
	NamedColorsTab.colors["SandyBrown"]="#F4A460";		NamedColorsTab.colors["SeaGreen"]="#2E8B57";
	NamedColorsTab.colors["SeaShell"]="#FFF5EE";		NamedColorsTab.colors["Sienna"]="#A0522D";
	NamedColorsTab.colors["Silver"]="#C0C0C0";			NamedColorsTab.colors["SkyBlue"]="#87CEEB";
	NamedColorsTab.colors["SlateBlue"]="#6A5ACD";		NamedColorsTab.colors["SlateGray"]="#708090";
	NamedColorsTab.colors["Snow"]="#FFFAFA";			NamedColorsTab.colors["SpringGreen"]="#00FF7F";
	NamedColorsTab.colors["SteelBlue"]="#4682B4";		NamedColorsTab.colors["Tan"]="#D2B48C";
	NamedColorsTab.colors["Teal"]="#008080";			NamedColorsTab.colors["Thistle"]="#D8BFD8";
	NamedColorsTab.colors["Tomato"]="#FF6347";			NamedColorsTab.colors["Turquoise"]="#40E0D0";
	NamedColorsTab.colors["Violet"]="#EE82EE";			NamedColorsTab.colors["VioletRed"]="#D02090";
	NamedColorsTab.colors["Wheat"]="#F5DEB3";			NamedColorsTab.colors["White"]="#FFFFFF";
	NamedColorsTab.colors["WhiteSmoke"]="#F5F5F5";		NamedColorsTab.colors["Yellow"]="#FFFF00";
	NamedColorsTab.colors["YellowGreen"]="#9ACD32";


/**** End Named Color Tab Constructor ****/
/******************************************************************************/


/******************************************************************************/
/**** Named Color Tab Constructor ****/

ColorPickerCloseButton = function(picker)
{
	this.picker = picker || ColorPicker.getPickerElem();
	this.title = "x";
	this.buttonSrc = null;
	this.element = null;
	this.width = 11;
};

ColorPickerCloseButton.prototype.create = function(parent,left)
{
	var div = ColorPicker.createElement("div");
	div.className="ColorPickerCloseButton";
	if(!this.buttonSrc)
		div.innerHTML = this.title;
	else
	{
	}	
	ColorPicker.addEvent(div, "click", ColorPickerCloseButton.close);
	ColorPicker.addEvent(div, "mouseover", ColorPickerCloseButton.focusCloseButton);
	ColorPicker.addEvent(div, "mouseout", ColorPickerCloseButton.blurCloseButton);
	div.style.left = (left-this.width-2) + "px";
	
	parent.appendChild(div);		
	this.element = div;
};

ColorPickerCloseButton.close =	function()
{
	var picker = ColorPicker.getPickerElem();
	picker.callCloseHandler();
};

ColorPickerCloseButton.focusCloseButton = function(evnt)
{
	//var elem = ColorPicker.IS_IE ? ColorPicker.getElement(evnt,this) : ColorPicker.getTargetElement(evnt);
	var elem = ColorPicker.getElement(evnt,this);
	elem.style.color = "#FFFFFF";
	elem.style.backgroundColor = "#317082";
};

ColorPickerCloseButton.blurCloseButton = function(evnt)
{
	//var elem = ColorPicker.IS_IE ? ColorPicker.getElement(evnt,this) : ColorPicker.getTargetElement(evnt);
	var elem = ColorPicker.getElement(evnt,this);
	elem.style.color="";
	elem.style.backgroundColor = "";
};

/**** End Named Color Tab Constructor ****/
/******************************************************************************/


/******************************************************************************/
/**** Color Tile Constructor ****/

ColorTile = function(color, title ,style)
{
	this.color = color || "#FFFFFF";
	this.title = title || null;
	this.style = style || ColorTile.style["Default"];
	this.element = null;
};

// Setting Style
ColorTile.style={Default:"ColorSquare" , Button:"ColorButton", Brick:"2", Bar:"ColorBar"};

ColorTile.prototype.create = function(parent)
{
	var div = ColorPicker.createElement("div");
	
	div.style.backgroundColor=this.color;	
	div.innerHTML = "<span></span>";
	div.className = this.style;
	div.title = this.title || this.color;	
	div.onclick = ColorTile.setColor;
	div.setAttribute("rgbColor",this.color);
	////div.onmouseover = colorPickerShowStatusBarText;
	////div.onmouseout = colorPickerHideStatusBarText;
	parent.appendChild(div);
	
	this.element=div;	
};

ColorTile.setColor =  function()
{
	ColorPicker.setColor(this.getAttribute("rgbColor"));
};
/**** Named Color Tab Constructor ****/
/******************************************************************************/

/******************************************************************************/
/**** Preview Bar Constructor ****/

PreviewBar = function(picker)
{
	this.picker = picker || ColorPicker.getPickerElem();
	this.element = null;
};

PreviewBar.prototype.create = function(parent)
{
	var div = ColorPicker.createElement("div");
	div.className = "DivColorPreviewBar";
	parent.appendChild(div);
	this.element = div;
	
	var previewTile = ColorPicker.createElement("div");
	previewTile.className="ColorPreviewBar";
	previewTile.style.backgroundColor=this.picker.color;	
	previewTile.innerHTML = "<span></span>";
	previewTile.title = 'Click Here to Select Color';
	ColorPicker.addEvent(previewTile, "click", ColorPicker.setFinalColor);	
	div.appendChild(previewTile);
};

PreviewBar.prototype.refreshColor = function()
{
	if(this.element)
	{		
		var previewTile = this.element.getElementsByTagName("div")[0];		
		previewTile.style.backgroundColor=this.picker.color;	
	}
};


/******************************************************************************/
