var anchorColor = "";
var eventElementObj = "";
function autoTabIndexing(){
	var fFlagFocusFirst=true;
	var allImageObj = document.getElementsByTagName("img");
	var allAnchorObj = document.getElementsByTagName("A");
	var allSelectObj = document.getElementsByTagName("SELECT");
	for(var nTmpI=0; nTmpI<document.forms[0].elements.length; nTmpI++){
		document.forms[0].elements[nTmpI].setAttribute("tabIndex","1");
		if(fFlagFocusFirst && document.forms[0].elements[nTmpI].type!="hidden" && (document.forms[0].elements[nTmpI].tagName=="INPUT" ||document.forms[0].elements[nTmpI].tagName=="SELECT" || document.forms[0].elements[nTmpI].tagName=="TEXTAREA")){
			document.forms[0].elements[nTmpI].focus();
			if(((document.forms[0].elements[nTmpI].tagName=="INPUT" && document.forms[0].elements[nTmpI].type=="text") || document.forms[0].elements[nTmpI].tagName=="TEXTAREA") && document.forms[0].elements[nTmpI].value.length >0)
				document.forms[0].elements[nTmpI].select();
			fFlagFocusFirst=false;
		}
		if(document.forms[0].elements[nTmpI].type=="text" || document.forms[0].elements[nTmpI].tagName=="TEXTAREA"){
			if(document.all){
				var strOnKeyUpFun=''; 
				if(typeof(document.forms[0].elements[nTmpI].attributes['onkeyup'])!="undefined"){
					strOnKeyUpFun = ","+document.forms[0].elements[nTmpI].attributes['onkeyup'].value;
				}				
				var lTrimFunc = new Function(("lTrim(this)"+strOnKeyUpFun.replace('return' , '')).replace(/(lTrim[(]this[)][,])+/g,''));
				var strOnBlurFun=''; 
				if(typeof(document.forms[0].elements[nTmpI].attributes['onblur'])!="undefined"){
					strOnBlurFun = ","+document.forms[0].elements[nTmpI].attributes['onblur'].value;
				}				
				var trimFunc = new Function(("Trim(this)"+strOnBlurFun.replace('return' , '')).replace(/(Trim[(]this[)][,])+/g,''));
				document.forms[0].elements[nTmpI]["onkeyup"]=lTrimFunc;
				document.forms[0].elements[nTmpI]["onblur"]=trimFunc;
			}else{
				var strOnKeyUpFun=''; 
				if(typeof(document.forms[0].elements[nTmpI].attributes['onkeyup'])!="undefined") {
					strOnKeyUpFun = ","+document.forms[0].elements[nTmpI].attributes['onkeyup'].value;
				}				
				var strOnBlurFun=''; 
				if(typeof(document.forms[0].elements[nTmpI].attributes['onblur'])!="undefined") {
					strOnBlurFun = ","+document.forms[0].elements[nTmpI].attributes['onblur'].value;
				}				
				document.forms[0].elements[nTmpI].setAttribute("onkeyup",("lTrim(this)"+strOnKeyUpFun.replace('return' , '')).replace(/(lTrim[(]this[)][,])+/g,''));
				document.forms[0].elements[nTmpI].setAttribute("onblur",("Trim(this)"+strOnBlurFun.replace('return' , '')).replace(/(Trim[(]this[)][,])+/g,''));
			}
		}
	}
	for(var nTmpI=0; nTmpI<allImageObj.length; nTmpI++){
		allImageObj[nTmpI].setAttribute("tabIndex","1");
		if(allImageObj[nTmpI]["onclick"])
			if(allImageObj[nTmpI].src.split("/")[allImageObj[nTmpI].src.split("/").length-1]!="iconPicDate.gif")
				if(document.all){
					var myFunc = new Function("onPressingEnter(this,event)");
					allImageObj[nTmpI]["onkeypress"]=myFunc;
				}else
					allImageObj[nTmpI].setAttribute("onkeypress","onPressingEnter(this,event)");
		if(allImageObj[nTmpI].src.split("/")[allImageObj[nTmpI].src.split("/").length-1]=="tp.gif")
			allImageObj[nTmpI].setAttribute("tabIndex","0");
	}
	for(var nTmpI=0; nTmpI<allAnchorObj.length; nTmpI++){
		allAnchorObj[nTmpI].setAttribute("tabIndex","1");
		if(allImageObj[nTmpI]["onclick"])
			if(document.all){
				var myFunc = new Function("{setAnchorBeforeEnterColor(this,event);onPressingEnter(this,event);}");
				var onFocusFunction = new Function("setAnchorColor(this)");
				var onBlurFunction = new Function("resetAnchorColor(this)");
				allImageObj[nTmpI]["onfocus"]=onFocusFunction;
				allImageObj[nTmpI]["onblur"]=onBlurFunction;
				allImageObj[nTmpI]["onkeypress"]=myFunc;
			}else{
				allAnchorObj[nTmpI].setAttribute("onkeypress","setAnchorBeforeEnterColor(this,event),onPressingEnter(this,event)");
				allAnchorObj[nTmpI].setAttribute("onblur","resetAnchorColor(this)");
				allAnchorObj[nTmpI].setAttribute("onfocus","setAnchorColor(this,event)");
			}
	}
	for(var nTmpI=0; nTmpI<allSelectObj.length; nTmpI++){
		allSelectObj[nTmpI].setAttribute("tabIndex","1"); 
		if(allSelectObj[nTmpI]["onchange"]) 
			if(document.all){
				var myFunc = new Function("onPressingEnter(this,event)");
				allSelectObj[nTmpI]["onkeydown"]=myFunc;
			}else
				allSelectObj[nTmpI].setAttribute("onkeydown","return onPressingEnter(this,event)");
	}
}
function setAnchorBeforeEnterColor(these,e){
	var keyVal; 
	if (window.event)
		keyVal= window.event.keyCode;
	else 
		keyVal= e.which;
	if(keyVal==13) {
		anchorColor = "rgb(101, 50, 50)";
		these.style.color = "red";
	}
}

function setAnchorColor(these){
	anchorColor = these.style.color;
	these.style.color = "red";
}

function resetAnchorColor(these){
	these.style.color = anchorColor;
}

function onPressingEnter(_these,e){
	eventElementObj=_these;
	var keyVal;
	if (window.event)
		keyVal= window.event.keyCode;
	else
		keyVal= e.which;
	if(keyVal==13)
		eval(_these.onclick());
}
 
function onPressingTab(_these,e){
	eventElementObj=_these;
	var keyVal; 
	if (window.event)
		keyVal= window.event.keyCode;
	else
		keyVal= e.which;
	if(keyVal==9)
		eval(_these.onclick());
	return false;
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}

function Trim(_these){
	_these.value=_these.value.trim();
}
function lTrim(_these){
	_these.value=_these.value.ltrim();
}
