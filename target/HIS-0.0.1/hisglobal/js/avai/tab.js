	
	
	
	function onClickTab(mode)
	{
		
		document.forms[0].selectedTab.value=mode;
		document.forms[0].submit();
	
	}
	
	function onEnterTab(e,mode)
	{
		if(e.keyCode==13)
		{
			document.forms[0].selectedTab.value=mode;
			document.forms[0].submit();
		}
	}
	
	function setColor(i)
	{	
		document.all.cid[i].style.backgroundColor="#FFFFFF";
	}
	
	function resetColor(i)
	{
		
		document.all.cid[i].style.backgroundColor="#f0f0f0";
	}	
