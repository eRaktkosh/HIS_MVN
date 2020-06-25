/*******************************************************************************
 * Copyright 2014 Centre for Development of Advanced Computing(C-DAC), Pune
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
var index = 0;
var jsonData;
var currentCountDisplayed;
var displaySearch ;
var targetElement;
var h = 80;
var dialogFormHTML;
var divDialogForm;

if(typeof snomedServerURL == "undefined" || snomedServerURL=="")
{
	snomedServerURL = "http://localhost:8080";
}
//alert(snomedServerURL);

$(document).ready(function() {
	
	
	
	dialogFormHTML ='<div id="snomed-ct-search" style="width: 100%"><input type="text" id="txt-snomed-ct-search" class="searchText" name="txt-snomed-ct-search"  style="color:#029cdb;"></input></div>';
	divDialogForm  = '<div id="dialog-form" style="width: 300px;padding: 27px 8px 46px 6px;">'+ dialogFormHTML +'</div>';
	
	$('body').append(divDialogForm);
	
	dialogData = '';
	dialogHTML = '<div id="dialog-message" title="SNOPlugin Information"><p>' + dialogData + '</p></div>';
	$('body').append(dialogHTML);
	
	
	var dialog = $( "#dialog-form" ).dialog({
	autoOpen: false,
	height: 150,
	width: 1000,
	modal: true,
	buttons: {
		"Search": function() {
			if(displaySearch == true)
			{
				
				var dataValue = document.getElementById("txt-snomed-ct-search").value;
				if(dataValue.trim() == '')
				{
					message('Please enter value in the Search box');
					var txtBox=document.getElementById("txt-snomed-ct-search" );
					txtBox.focus();
					return;
				}
				var srcTerm = {"term" : encodeURIComponent(dataValue) };
				$.ajax({
					type: "GET",
					url: snomedServerURL+"/csnoserv/api/search/search",					
					dataType: "jsonp",
					crossDomain: true,
					data: srcTerm,
					success: function( data, textStatus, jqXHR) {
						var htmlData = '';
						jsonData = data;
						if(data.length == 0)
						{
							document.getElementById("txt-snomed-ct-search").value = '';
							var txtBox=document.getElementById("txt-snomed-ct-search" );
							txtBox.focus();
							message('No Results Found');
							return;
						}
						displaySearch = false;
						if(data.length <= 5)
						{
							
							htmlData += '<br/>';
							htmlData += '<table class="bordered">';
							htmlData += '<thead><tr><th>Concept ID&nbsp;&nbsp;</th><th>Description</th></tr></thead>';
							currentCountDisplayed = data.length;
							for (var i=0;i<data.length;++i)
							{
								var val = '\'' + data[i].conceptid + ' : ' + data[i].description + '\'';
								htmlData += '<tr onclick="selectValue(\'' + escape(val) + '\');"><td>'+ data[i].conceptid + '&nbsp;&nbsp;&nbsp;&nbsp;</td><td>'+ data[i].description + '</td></tr>';
							}
							$( "#dialog-form" ).dialog( "option", "height", "auto");//getHeight(data.length, false) );
							$('#dialog-form').dialog({ position: 'center' });
							htmlData += '</table>' ;
							
							$("#dialog-form").html(htmlData);
						}
						else
						{
							$( "#dialog-form" ).dialog( "option", "height", getHeight(5, true) );
							$('#dialog-form').dialog({ position: 'center' });
							index = 0;
							htmlData += '<br/>';
							htmlData += '<table class="bordered">';
							htmlData += '<thead><tr><th>Concept ID&nbsp;&nbsp;</th><th>Description</th></tr></thead>';
							var currentLength  = index  + 5 ;
							if(currentLength > jsonData.length)
								currentLength = jsonData.length;
							currentCountDisplayed = currentLength;
							for (;index < currentLength ; index++)
							{
								var val = '\'' + data[index].conceptid + ' : ' + data[index].description + '\'';
								htmlData += '<tr onclick="selectValue(\'' + escape(val) + '\');"><td>'+ data[index].conceptid + '&nbsp;&nbsp;&nbsp;&nbsp;</td><td>'+ data[index].description + '</td></tr>';
							}
							htmlData += '</table>' ;
							htmlData += '<br/><button style="position: absolute;right:10px;float:right;" id="next" onclick="nextPage();" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">  Next  </button>';
							$("#dialog-form").html(htmlData); 
						}
					},
					error: function(jqXHR, textStatus, errorThrown){
						 console.log( textStatus);
					}
				});
			}
			else
			{
				$("#snomedct").click();
			}
			
			
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
		}
		});
		
	dialog.data( "uiDialog" )._title = function(title) {
	    title.html( this.options.title );
	};
	
	dialog.dialog('option', 'title', '<img style="width:63px;height:36px;vertical-align: text-bottom;float:left;" src="/HIS/hisglobal/snomedct/css/images/SCtrl.png" style="position:absolute;left:0px;top:0px;" />&nbsp;<img style="float: right; position: absolute; vertical-align: text-bottom; height: 33px; right: 35px; width: 36px; top: 8px;" src="/HIS/hisglobal/snomedct/css/images/CDACLogo.png" />');
	$("#dialog-form").keydown(function (event) {
        if (event.keyCode == 13) {
            $(this).parent()
                   .find("button:eq(0)").trigger("click");
            return false;
        }
    });	
		
});

function lookupByConcept(conceptId,targetSpanId) 
{
			var dataValue = document.getElementById(conceptId).value;
			if(dataValue.trim() == '')
			{
				message('Please enter value in the Search box');
				var txtBox=document.getElementById(conceptId);
				txtBox.focus();
				return;
			}		
			//Call ur webservice here
			$.ajax({
				type: "GET",
				url: snomedServerURL+"/csnoserv/api/lookup/concept", //replace with ur service call
				//url: "http://localhost:9090/csnoserv/api/lookup/concept",
				dataType: "jsonp",
				crossDomain: true, 
				data: {"id" : dataValue},
				success: function( data, textStatus, jqXHR) {
					var htmlData ='';
					//var j = '["22298006","Myocardial Infarction","Myocardial infarction, NOS","Myocardial infarct","MI - Myocardial infarction","Cardiac infarction, NOS"]';
					//var jsonData = jQuery.parseJSON(data);
					jsonData = data;
					if(data.conceptid == 0)
					{
						message('Invalid Concept ID');
						return;
					}
					htmlData = '<table style="margin-left:5px;border:1px solid #ddd; border-radius:5px; box-shadow:1px 2px 2px #ddd; padding:10px">';
					var status='';
					if(jsonData.activeStatus == 1)
						status = "ACTIVE";
					else
						status = "INACTIVE";
					htmlData += '<tr class="conId1"><th class="conTh">Concept ID</th><td class="conDtls">' + jsonData.conceptid + '</td></tr>';
					htmlData += '<tr class="conId1"><th  class="conTh">Fully Specified Name</th><td class="conDtls">' + jsonData.fsn  + '</td></tr>';
					htmlData += '<tr class="conId1"><th class="conTh">Status</th><td class="conDtls">' + status + '</td></tr>';
					htmlData += '<tr class="conId1"><th  class="conTh" style="vertical-align:top;">Synonyms</th><td  class="conDtls" rowspan="'+ jsonData.synonyms+'"><table>';
					for(var index = 0; index < jsonData.synonyms.length; index++)
					{
						htmlData += '<tr><td>' + jsonData.synonyms[index] + '</td></tr>';
					}
					htmlData += '</table></td></tr></table>';
					targetSpanId = '#'+targetSpanId;
					$(targetSpanId).html(htmlData);
				},
				error: function(jqXHR, textStatus, errorThrown){
					 console.log( textStatus);
				}
			});
}

function lookupByConceptRelation(cptId,relation,srcTgt,targetSpanId) 
{
	var id = document.getElementById(cptId).value;
	if(id.trim() == '')
	{
		message('Please enter value in the Search box');
		var txtBox=document.getElementById(cptId);
		txtBox.focus();
		return;
	}		
	var relationV = document.getElementById(relation).value;
	if(relationV == -1)
	{
		message('Please enter value in the Search box');
		var txtBox=document.getElementById(relation);
		txtBox.focus();
		return;
	}		
	var direction = document.getElementById(srcTgt).value;
	if(direction == -1)
	{
		message('Please enter value in the Search box');
		var txtBox=document.getElementById(srcTgt);
		txtBox.focus();
		return;
	}		
	
	$.ajax({
		type: "GET",
		url: snomedServerURL+"/csnoserv/api/lookup/relationship",//replace with ur service call
		//url: "http://localhost:9090/csnoserv/api/lookup/relationship",
		dataType: "jsonp",
		crossDomain: true,
		data: {"id" : id, "relation":relationV, "direction":direction}, 
		success: function( data, textStatus, jqXHR) {
			var htmlData ='';
			//var j = '["22298006","Myocardial Infarction","Myocardial infarction, NOS","Myocardial infarct","MI - Myocardial infarction","Cardiac infarction, NOS"]';
			//var jsonData = jQuery.parseJSON(j);
			var jsonData = data;
			htmlData = '<br/><br/><table style="margin-left:90px;border:1px solid #ddd; border-radius:5px; box-shadow:1px 2px 2px #ddd; padding:10px">';
			htmlData += '<tr><th>' + 'Related Concept IDs' + '</th></tr>';
			
			//	htmlData += '<tr class="conId1"><th class="conTh">Concept ID</th><td class="conDtls">' + jsonData[0] + '</td></tr>';
			//	htmlData += '<tr class="conId1"><th  class="conTh">FSN</th><td class="conDtls">' + jsonData[1] + '</td></tr>';
			//	htmlData += '<tr class="conId1"><th  class="conTh" style="vertical-align:top;">Synonyms</th><td  class="conDtls" rowspan="'+ jsonData.length+'"><table>';
			for(var index = 0 ; index < jsonData.length; index++)
			{
				htmlData += '<tr><td>' + jsonData[index] + '</td></tr>';
			}
			htmlData += '</table></td></tr></table>';
			targetspanId = '#'+targetSpanId;
			$(targetspanId).html(htmlData);
		},
		error: function(jqXHR, textStatus, errorThrown){
			 console.log( textStatus);
		}
	});
	
	
}	

function selectSNOMEDCT(snomedCTTarget) {
	
	var footer = '';
	footer +='<div id="footer"><div class="footer-nav">';
	footer +='<ul><li style="float: right;margin-left: -11px; position: relative;">SNOMED-CT Version:2014_01_31</li>';
	footer +='<li style="float: right;position: absolute;right: 60px;">CSNOCtrl&nbsp;&copy;Centre for Development of Advanced Computing</li>';
	footer +='<li style="float: right;position: absolute;right: 4px;"><a href="#" id="license">License</a></li>';
	footer +='</ul><div class="cl">&nbsp;</div></div></div>';
	
	targetElement = document.getElementById(snomedCTTarget);
	displaySearch = true;
	$( "#dialog-form" ).dialog( "option", "height", 150 );
	$('#dialog-form').dialog({ position: 'center' });
	$("#dialog-form").html(dialogFormHTML);
	if (!$( "#footer" ).length ) {
		$(".ui-dialog-buttonpane").append(footer);
	}
	
	var txtBox=document.getElementById("txt-snomed-ct-search" );
	txtBox.focus();
	$( "#dialog-form" ).dialog( "open" );
	
	var xhrRequest = null;
	$( "#txt-snomed-ct-search" ).autocomplete({
						max: 3,
						minLength: 3,
						cacheLength: 1,
						scroll: true,
						highlight: false,
						source: function(request, response) {
								var srcTerm = {"term" : encodeURIComponent(request.term) };
								if(xhrRequest && xhrRequest.readystate != 4)
									xhrRequest.abort();
								xhrRequest = $.ajax({
								type: "GET",
								url: snomedServerURL+"/csnoserv/api/search/suggest",
								//url: " http://centaur:9999/csnoserv/api/search/suggest",
								dataType: "jsonp",
								crossDomain: true,
								data: srcTerm,
								success: function( data, textStatus, jqXHR) {
									console.log( data);
									var items = data;
									response(items);
								},
								error: function(jqXHR, textStatus, errorThrown){
									 console.log( textStatus);
								}
							});
						}
				 
					});
		$('#license').click(function() 
			{	
				$('#licenseBox').load("license.html", function (content) {
					$('#licenseBox').dialog({
						autoOpen: false,
						resizable: false,
		    	         height: "auto",
		    	         width: 800,
		    	         dialogClass: 'noTitle',
		    	         title: "LICENSE INFO",
		    	         modal: true,
						 show: {
						 	effect: "blind",
						 	duration: 1000
						 },
						 hide: {
						 	effect: "explode",
						 	duration: 1000
		    	         }
		    	      });
		    	      $('#licenseBox').dialog('open');
				});
				
			});
	
}



function selectValue(id){
	
	var data = unescape(id);
	data = data.substring(data.indexOf("\'") + 1 , data.lastIndexOf("\'"));
	//document.getElementById("snomed").value = data;
	targetElement.value = data;
	$("#dialog-form").dialog( "close" );
}


function nextPage(){
	var htmlData ='';
	htmlData += '<br/>';
	htmlData += '<table class="bordered">';
	htmlData += '<thead><tr><th>Concept ID&nbsp;&nbsp;</th><th>Description</th></tr></thead>';
	var currentLength  = index  + 5 ;
	if(currentLength > jsonData.length)
	{
		currentLength = jsonData.length;
	}
	currentCountDisplayed = currentLength - index;
	for (var i = 0 ;index < currentLength ; index++,i++)
	{
		var val = '\'' + jsonData[index].conceptid + ' : ' + jsonData[index].description + '\'';
		htmlData += '<tr onclick="selectValue(\'' + escape(val) + '\');"><td>' + jsonData[index].conceptid + '&nbsp;&nbsp;&nbsp;&nbsp;</td><td>'+ jsonData[index].description + '</td></tr>';
	}
	$( "#dialog-form" ).dialog( "option", "height", getHeight(currentCountDisplayed, true) );
	$('#dialog-form').dialog({ position: 'center' });
	htmlData += '</table>' ;
	htmlData += '<br/><button style="position:absolute;right:60px;float:right;"  id="previous" onclick="previousPage();" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">  Previous  </button>';
	if(currentLength != jsonData.length)
	{
		htmlData += '<button style="position:absolute;right:10px;float:right;" id="next" onclick="nextPage();" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">  Next  </button>';
	}
	
	$("#dialog-form").html(htmlData); 
}


function previousPage(){
	var htmlData ='';
	htmlData += '<br/>';
	htmlData += '<table class="bordered">';
	htmlData += '<thead><tr><th>Concept ID&nbsp;&nbsp;</th><th>Description</th></tr></thead>';
	index  = index  - currentCountDisplayed  - 5;
	var currentLength  = index  + 5 ;
	currentCountDisplayed = currentLength - index;
	if(index < 0)
		index = 0;
	for (;index < currentLength ; index++)
	{
		var val = '\'' + jsonData[index].conceptid + ' : ' + jsonData[index].description + '\'';
		htmlData += '<tr onclick="selectValue(\'' + escape(val) + '\');"><td>' + jsonData[index].conceptid + '&nbsp;&nbsp;&nbsp;&nbsp;</td><td>'+ jsonData[index].description + '</td></tr>';
	}
	htmlData += '</table>' ;
	if(currentLength-currentCountDisplayed != 0)
	{
		htmlData += '<br/><button style="position:absolute;right:60px;float:right;" id="previous" onclick="previousPage();" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">  Previous  </button>';
	}
	else
		htmlData += '<br/>';
	htmlData += '<button style="position: absolute;right:10px;float:right;" id="next" onclick="nextPage();" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">  Next  </button>';
	$( "#dialog-form" ).dialog( "option", "height", getHeight(currentCountDisplayed, true) );
	$('#dialog-form').dialog({ position: 'center' });
	$("#dialog-form").html(htmlData); 
}


function message(val)
{
	dialogHTML = '<p>' + val + '</p>';
	$("#dialog-message").html(dialogHTML);
	//$("#dialog-message").dialog( "option", "height", 150 );
	//$("#dialog-message").dialog({ position: 'center' });
	$( "#dialog-message" ).dialog({
		modal: true,
		buttons: {
			Ok: function() {
				$("#dialog-message").dialog( "close" );
			}
		}
	});
}

function infoDialog(dialogCode)
{
	var infoDialogHTML = '<br/>';
	infoDialogHTML = infoDialogHTML + '<ol><li style="margin-left: 20px">Add following javascripts in your web page : <ul><li style="margin-left: 40px">jquery.js</li><li style="margin-left: 40px">jquery-ui.custom.min.js</li><li style="margin-left: 40px">jquery.autocomplete.js</li></ul></li>';
	infoDialogHTML = infoDialogHTML + '<li style="margin-left: 20px">Add following CSNOCtrl scripts in your web page : <ul><li style="margin-left: 40px">searchtool.js</li><li style="margin-left: 40px">searchtool.css</li></ul></li>';
	infoDialogHTML = infoDialogHTML + '<li style="margin-left: 20px">Call ';
	if(dialogCode == 'ctrl')
		infoDialogHTML = infoDialogHTML + 'selectSNOMEDCT(targetControlID) function for opening control';
	
	else if(dialogCode == 'conceptLookup')
		infoDialogHTML = infoDialogHTML + 'lookupByConcept(conceptControlID, targetSpanID) function for displaying details';
	
	else if(dialogCode == 'conceptRelationLookup')
	{
		infoDialogHTML = infoDialogHTML + 'lookupByConceptRelation(conceptControlID, relationControlID, directionControlID, targetSpanConrolID) function for displaying details';
	}
	
	infoDialogHTML = infoDialogHTML + '</li></ol>';
	infoDialogHTML = infoDialogHTML + '<br/><span width style="font-size:x-small;margin-left: 10px">Note:- CSNOCtrl js and css are available with CSNOCtrl downloadable package</span>';
	$("#dialog-howto").html(infoDialogHTML);
	$( "#dialog-howto" ).dialog({
		modal: true,
		width:550,
		height:330		
		});	
	// Adding this if else again because any option cannot be added before above dialog call which initializes the dialog.
	if(dialogCode == 'ctrl')
	{
		$("#dialog-howto").dialog( "option", "width", 480 );
		$('#dialog-howto').dialog('option', 'title', 'How To Use CSNOCtrl: Search');
	}
	else if(dialogCode == 'conceptLookup')
	{
		$('#dialog-howto').dialog('option', 'title', 'Steps to Use CSNOCtrl: LookUp');
	}
	else if(dialogCode == 'conceptRelationLookup')
	{
		$("#dialog-howto").dialog( "option", "width", 830 );
		$('#dialog-howto').dialog('option', 'title', 'Steps to Use CSNOCtrl: Getting Concept Relationships');
	}
	
	$("#dialog-howto").dialog('option', 'position', 'center');
}
function getHeight(count,buttonPlace)
{
	if(buttonPlace == true)
	{
		switch(count)
		{
			case 1:
				return 270;
			case 2:
				return 320;
			case 3:
				return 370;
			case 4:
				return 410;
			case 5:
				return 450;
		}
	}
	else
	{
		switch(count)
		{
			case 1:
				return 250;
			case 2:
				return 300;
			case 3:
				return 350;
			case 4:
				return 390;
			case 5:
				return 420;
		}
	}
}
