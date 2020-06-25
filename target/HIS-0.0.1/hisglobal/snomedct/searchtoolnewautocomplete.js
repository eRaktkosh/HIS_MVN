


/*******************************************************************************
 * Copyright 2014 Centre for Development of Advanced Computing(C-DAC), Pune
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 ******************************************************************************/
var index = 0;
var jsonData;
var currentCountDisplayed;
var displaySearch;
var h = 80;
var dialogFormHTML;
var divDialogForm;
var txtId;
var selectedConceptId;
var stateParam;
var semantictagParam;
var acceptabilityParam;
var returnlimitParam;

var enumSERVICES = {
	SEARCH : {
		type : "search",	
		/*searchbyacceptability_url : "/AHIMSG5/snomedct/csnoserv/api/search/search",*/
		//searchbyacceptability_url : "http://10.226.2.97:8080/csnoserv/api/search/search",//Commented bY Hemant
		searchbyacceptability_url : "http://220.156.188.202/csnoserv/api/search/search",
			/*"/AHIMSG5/snomedct/csnoserv/api/search/search",*/
		//suggestbyacceptability_url : "/AHIMSG5/snomedct/csnoserv/api/search/suggestbyacceptability",
		//searchbyacceptability_url : "/AHIMSG5/snomedct/csnoserv/api/search/searchbyacceptability",
		
		
	},
};

var enumACCEPTABILITY = {
	ALL : "all",
	PREFERRED : "preferred",
	PREFERRED_EXCLUDING_FSN : "preferredexcludingfsn",
	SYNONYMS : "synonyms",
	ACCEPTABLE : "acceptable"
};
var enumSTATE = {
	BOTH : "both",
	ACTIVE : "active",
	INACTIVE : "inactive"
};

var enumSEMANTICTAG = {

		ALL : "all",
		PROCEDURE : "procedure",
		DISORDER : "disorder",
		FINDING : "finding",
		OBSERVABLE_ENTITY : "observable entity",
		BODY_STRUCTURE : "body structure",
		ORGANISM : "organism",
		SUBSTANCE : "substance",
		SPECIMEN : "specimen",
		SPECIAL_CONCEPT : "special concept",
		LINKAGE_CONCEPT : "linkage concept",
		PHYSICAL_FORCE : "physical force",
		EVENT : "event",
		ENVIRONMENT : "environment",
		GEOGRAPHIC_LOCATION : "geographic location",
		SOCIAL_CONCEPT : "social concept",
		SITUATION_WITH_EXPLICIT_CONTEXT : "situation",
		STAGING_SCALE : "staging scale",
		PHYSICAL_OBJECT : "physical object",
		QUALIFIER_VALUE : "qualifier value",
		RECORD_ARTIFACT : "record artifact",
		PERSON : "person",
		LINK_ASSERTION : "link assertion",
		NAMESPACE_CONCEPT : "namespace concept",
		ATTRIBUTE : "attribute",
		ASSESSMENT_SCALE : "assessment scale",
		RACIAL_GROUP : "racial group",
		TUMOR_STAGING : "tumor staging",
		OCCUPATION : "occupation",
		MORPHOLOGIC_ABNORMALITY : "morphologic abnormality",
		CELL : "cell",
		CELL_STRUCTURE : "cell structure",
		ETHNIC_GROUP : "ethnic group",
		PRODUCT : "product",
		INACTIVE_CONCEPT : "inactive concept",
		NAVIGATIONAL_CONCEPT : "navigational concept",
		LIFE_STYLE : "life style",
		REGIME_THERAPY : "regime/therapy",
		RELIGION_PHILOSOPHY : "religion/philosophy"
};

$(document)
		.ready(
				function() {

								
   			 	   
			});

function selectSNOMEDCTauto(state_IN, semantictag_IN, acceptability_IN, returnlimit_IN,refsetid_IN,
		elmtid,callback) {
	
	//alert(elmtid);
	if (returnlimit_IN <= -1 || returnlimit_IN == '' || returnlimit_IN == undefined
			|| returnlimit_IN == null) {
		returnlimit_IN = -1;

	}
	returnlimitParam = returnlimit_IN;

	if (state_IN == -1 || state_IN == null || state_IN == ''
			|| state_IN == undefined) {
		state_IN = enumSTATE.BOTH;
	} else

		state_IN = enumSTATE[state_IN];

	stateParam = state_IN;

	if (refsetid_IN <= -1 || refsetid_IN == '' || refsetid_IN == undefined
			|| refsetid_IN == null) {
		refsetid_IN = null;
	}
	refsetidParam=refsetid_IN;

	
	if (semantictag_IN == -1 || semantictag_IN == null || semantictag_IN == undefined
			|| semantictag_IN == '') {
		semantictag_IN = enumSEMANTICTAG.ALL;
	} else
		semantictag_IN = enumSEMANTICTAG[semantictag_IN];

	semantictagParam = semantictag_IN;

	if (acceptability_IN == -1 || acceptability_IN == null
			|| acceptability_IN == undefined || acceptability_IN == '') {
		acceptability_IN = enumACCEPTABILITY.ALL;
	} else
		acceptability_IN = enumACCEPTABILITY[acceptability_IN];

	acceptabilityParam = acceptability_IN;

	
	// Adding All Values to Element
	var elem = document.getElementById("txt-snomed-ct-search_"+elmtid);
	elem.acceptabilityParam = acceptability_IN;
	elem.semantictagParam = semantictag_IN;
	elem.stateParam = state_IN;
	elem.returnlimitParam = returnlimit_IN;
	

	var xhrRequest = null;							
				$("#txt-snomed-ct-search_"+elmtid).on('keypress, keydown', function(event) {	
					var isFirefox = typeof InstallTrigger !== 'undefined';
					if (event.which==186 ||( isFirefox && event.which==59)) {          			
            				event.preventDefault();
         				}
					if($("#txt-snomed-ct-search_"+elmtid).val().trim()!="")
					{
						if(this.selectionStart<$("#txt-snomed-ct-search_"+elmtid).val().length||event.which==37 || event.which==39)
						{
							return false;
						}
					}				
					if (event.which == 8||event.which == 46){
        			if($("#txt-snomed-ct-search_"+elmtid).val().slice(-1)==';')
        			{
        				return false;
        			}
        			}
        			if (event.ctrlKey==true) {          			
            				event.preventDefault();
         				}
				}); 


	$(".searchText")
			.autocomplete(
					{
						max : 20,
						minLength : 3,
						cacheLength : 1,
						scroll : false,
						width : 200,
						highlight : false,
						autoFocus : false,
						source : function(request, response) {
							var dataValue = document.getElementById("txt-snomed-ct-search_"+elmtid).value;								
								dataValue=dataValue.substring(dataValue.lastIndexOf(';')+1,dataValue.length);								
							var servURL = "";
							if (dataValue == '') {
								return;
							}
							servURL = enumSERVICES.SEARCH.searchbyacceptability_url;							
							servURL += "?term="
									+ dataValue
									+ "&state=" + state_IN + "&semantictag="
									+ semantictag_IN + "&acceptability="
									+ acceptability_IN + "&returnlimit="+returnlimit_IN+"&refsetid="+refsetidParam;
							console.log(servURL);

							if (xhrRequest && xhrRequest.readystate != 4)
								xhrRequest.abort();
							xhrRequest = $
									.ajax({
										type : "GET",
										url : servURL,
										dataType : "jsonp",
										crossDomain : true,
										success : function(data, textStatus,
												jqXHR) {
											console.log(data);
											var items=data;											
											if(items.length<=0)
											{
												//$('#nosuggestion').show();
											}
											response($.map(items, function (item) {
												var val=document.getElementById("txt-snomed-ct-search_"+elmtid).value.slice(0,-(dataValue.length));
                       								return { value: item.term, concept: item };
                       							}));
										},
										error : function(jqXHR, textStatus,
												errorThrown) {
											console.log(textStatus);
										}
									});						

						},						
						select : function(event, ui) {
						if (typeof callback === "function")
						callback(ui.item.concept,"txt-snomed-ct-search_"+elmtid);							
							$("#txt-snomed-ct-search_"+elmtid).blur();
							$("#txt-snomed-ct-search_"+elmtid).focus();
						},
						focus: function (event, ui) {
 					    //  this.value = ui.item.label;
       						event.preventDefault(); // Prevent the default focus behavior.
						}
					}).data("ui-autocomplete")._renderItem = function (ul, item) {
        return $("<li>")
            .data("ui-autocomplete-item", item)
            .append("<a>" + item.concept.term+ "</a>")
            .appendTo(ul);
    };    
    

}



