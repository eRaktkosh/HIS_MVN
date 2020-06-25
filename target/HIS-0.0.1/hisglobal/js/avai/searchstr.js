/**
 * @copyright CDAC
 * @developer Pragya Sharma
 */

/**
	This searchstr.js file has the function for searching a given string in the given "Textarea"
	This searchstr.js file has the following function

		searchStr 		>>	To search the given string in the given "Textarea"
	 
	Note >>						
		1. String to search must be alphanumeric only
		2. No Special Characters are allowed
*/


/*
	this function is used to search the given String in the given Textarea from the current cursor position
	searchStr			:	String to be searched
	textareaObj			: 	Textarea Control in which the string is to be searched 
*/
function searchStringInTA(searchStr, textareaObj)
{	
	var cursorPos=0;
	try
	{
		cursorPos=getCursorPosition(textareaObj);
		//alert("Cursor Position -> " + cursorPos);
		
		var searchString = getSearchString(textareaObj);
		//alert("Search String -> " + searchString );
		
		
		//alert("String To Search-> " + pattern );
		
		var re= new RegExp(searchStr,"i");
		var result = re.exec(searchString);
		
		if(result == null)
		{
			alert("No More Match");
			return;
		}

		var doStart=result.index+cursorPos;
		var doEnd=doStart+searchStr.length;
		//alert("Start Point " + doStart);
		//alert("End Point " + doEnd);
		
		doSelection(textareaObj,cursorPos,doStart,searchStr.length);
		textareaObj.focus();
	}
	catch(e)
	{
		alert(e.message);		
	}
}


/*
	this function is used to get the Current Cursor Position in the given Textarea	
	textareaObj		: 	Textarea Control 
	
	returns a integer of Current Cursor Position
*/
function getCursorPosition(textareaObj)
{	
	var caretPos = 0;
	// IE Support
	if (document.selection)
	{
		textareaObj.focus();		
		var sel = document.selection.createRange();
		if(sel.text.length>0)
		{
			sel.moveStart ('character', sel.text.length);
			sel.select();
		}		
		sel.moveStart ('character', -textareaObj.value.length);
		caretPos = sel.text.length;
	}
	// Firefox support
	else if (textareaObj.selectionStart || textareaObj.selectionStart == '0')
	{
		caretPos = textareaObj.selectionEnd;
		textareaObj.selectionStart = textareaObj.selectionEnd;
	}
	return caretPos;
}

/*
	this function is used to get the string from the Current Cursor Position in the given Textarea	
	textareaObj		: 	Textarea Control 
	
	returns a String
*/
function getSearchString(textareaObj)
{
	var srchStr = 0;
	// IE Support
	if (document.selection)
	{
		textareaObj.focus();		
		var sel = document.selection.createRange();
		sel.moveEnd('character', textareaObj.value.length);
		srchStr = sel.text;
	}
	// Firefox support
	else if (textareaObj.selectionStart || textareaObj.selectionStart == '0')
		srchStr = textareaObj.value.substring(textareaObj.selectionStart, textareaObj.value.length);
	return srchStr;
}

/*
	this function is used to make the selection of the matched string in the given Textarea	
	textareaObj		: 	Textarea Control 
	currentCurPos	:	Currnt Cursor Position
	startSrchPos	:	Starting Search Cursor Position
	searchStrLen	:	Search String Length	
	
	returns a String
*/

function doSelection(textareaObj,currentCurPos,startSrchPos,searchStrLen)
{
	var srchStr = 0;
	// IE Support
	if (document.selection)
	{
		textareaObj.focus();		
		var sel = document.selection.createRange();
		
		sel.moveStart('character',startSrchPos-currentCurPos);
		sel.moveEnd('character',searchStrLen);
		sel.select();		
	}
	// Firefox support
	else if (textareaObj.selectionStart || textareaObj.selectionStart == '0')
	{
		textareaObj.selectionStart=startSrchPos;
		textareaObj.selectionEnd=startSrchPos+searchStrLen;
	}
}