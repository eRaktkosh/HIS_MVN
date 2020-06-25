/**
 * Developer : Aadil
 * Date		 : Jan-2014 
 * USAGE	 : ExtendED Validator plugin for custom validations
 */

$(document).ready(function(){
	/**
	 * minLength		: Validates minLength no of characters 
	 * USAGE				: minLength[ length ]
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   minLength: {
			validator: function(value,param){
				return value.length >= param[0];  
			},  
			message: 'Enter At Least {0} Characters.'
	   }  
	});
	
	/**
	 * maxLength		: Validates Maximum no of characters 
	 * USAGE				: maxLength[ length ]
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   maxLength: {
			validator: function(value,param){
				return value.length <= param[0];  
			},
			message: 'Enter At Most {0} Characters.'            
	   }  
	});
	
	/**
	 * maxLengthFixed		: Validates Maximum no of characters 
	 * USAGE				: maxLengthFixed[ length,fldName ]
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   maxLengthFixed: {
			validator: function(value,param){
				var len = value.length ;
				var fld = $('[name="'+param[1]+'"]')[0];
				var fldValue =fld.value;
				
				if(len  > param[0]){
					fld.value=fldValue.substring(0,param[0] - 1);
				}
				return len <= param[0];  
			},
			message: 'Enter At Most {0} Characters.'            
	   }  
	});
	
	/**
	 * equalLength		: Validates Equal no of characters 
	 * USAGE				: equalLength[ length ]
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   equalLength: {
			validator: function(value,param){
				return value.length == param[0];  
			},
			message: 'Enter exactly {0} Characters.'            
	   }  
	});

	
	
	/**
	 * alphaNumericWithSpaces	: Validates (allows) alphanumeric only (a-zA-Z0-9) 
	 * USAGE		: alphaNumericWithSpaces 
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
		alphaNumericWithSpaces: {
	      validator: function(value){
	    	  var r =/^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/;
	            return value.match(r);
	        	},  
	      message: 'Enter Alphanumeric with Spaces Only.'
	   }  
	});
	
	
	
	
	
	
	
	
	
	
	/**
	 * alpha		: Validates (allows) alphabets only (a-zA-Z) 
	 * USAGE		: alpha
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alpha: {
	      validator: function(value){
	        	var r = /^[A-Z]+$/i;
	            return value.match(r);
	        	},  
	      message: 'Enter Alphabets Only.'
	   }  
	});
	
	/**
	 * alphaWithDelete	: Validates (allows) alphabets only (a-zA-Z) 
	 * USAGE			: alpha
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaWithDelete: {
	      validator: function(value,param){
	        	var r = /^[A-Z]+$/i;
	        	var len = value.length ;
				var fld = $('[name="'+param[0]+'"]')[0];
				var fldValue =fld.value;
				if(!value.match(r)){
					fld.value=fldValue.substring(0,len - 1);
				}
	            return value.match(r);
	        	},  
	      message: 'Enter Alphabets Only.'
	   }  
	});
	
	/**
	 * alphaWithSpace		: Validates (allows) alphabets with Space only (a-zA-Z ) 
	 * USAGE				: alphaWithSpace
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaWithSpace: {
	      validator: function(value){
	    	  var r =/^[a-zA-Z]+(\s+[a-zA-Z]+)*$/;
	            return value.match(r);
	        	},  
	      message: 'Enter Alphabets & Space Only.'
	   }  
	});
	
	/**
	 * alphaNumeric	: Validates (allows) alphanumeric only (a-zA-Z0-9) 
	 * USAGE		: alphaNumeric
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaNumeric: {
	      validator: function(value){
	        	var r = /^[a-zA-Z0-9]+$/i;
	        	//alert("inside alphanumeric --> value.match(r) :"+value.match(r));
	            return value.match(r);
	        	},  
	      message: 'Enter Alphanumeric Only.'
	   }  
	});
	

	
	/**
	 * alphaNumeric	strictly	: Validates (allows) alphanumeric only (a-zA-Z0-9) 
	 * USAGE					: alphaNumericStrictly
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaNumericStrictly: {
	      validator: function(value){
	      	value = $.trim(value);
	        	var r = /^[a-z0-9]+$/i;

            return value.match(r);
        	},  
	      message: 'Enter Alphanumeric Strict Only.'
	   }  
	});
      
	/**
	 * alphaSpecialChar	: Validates (allows) alphabet and special characters only
	 * USAGE			: alphaSpecialChar
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaSpecialChar: {
	      validator: function(value){
	        	var r = /^[A-Z\,\.\;\s\&\-_!~`’@#$%^&*()+={}:";'<>?\/]+$/i;
	         return value.match(r);
	      },  
	      message: 'Enter Alphabet with special characters Only.'
	   }  
	});
	
	
	/**
	 * alphaSpecialChar1	: Validates (allows) alphabet and special characters only
	 * USAGE			: alphaSpecialChar
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaSpecialChar1: {
	      validator: function(value){
	        	var r = /^[a-zA-Z\.\;\@\#\$\%\^\*\()\-\_\+\?\/\'\" \,  \> \: \{}]+$/i;
	         return value.match(r);
	      },  
	      message: 'Enter Alphabet with special characters Only.'
	   }  
	});
	
	
	
/**
	 * alphaSpecialChar	: Validates (allows) alphabet and special characters only
	 * USAGE			: alphaSpecialChar
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaNumSpecialChar: {
	      validator: function(value){
	        	var r = /^[0-9A-Z\,\.\;\s\&\-_!~`’@#$%^&*()+={}:";'<>?\/]+$/i;
	         return value.match(r);
	      },  
	      message: 'Enter Alphabet with special characters Only.'
	   }  
	});
	/**
	 * alphaWithApos	: Validates Alphabets and Apostrophe [a-zA-Z' ]
	 * USAGE			: alphaWithApos
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaWithApos: {
	      validator: function(value){
	      	value = $.trim(value);
	        	var r = /^[A-Z' ]+$/i;
            return value.match(r);
        	},  
	      message: 'Alphabet With Apos Only'
	   }  
	});
	
	/**
	 * hourAndMinute	: Validates Time
	 * USAGE			: hourAndMinute
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
		hourAndMinute: {
	      validator: function(value){
	      	value = $.trim(value);
	        	var r = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])+$/i;
            return value.match(r);
        	},  
	      message: 'Invalid Time. It accepts time in format hh:mm(24h)'
	   }  
	});
	
	/**
	 * hourAndMinute	: Validates month
	 * USAGE			: month
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
		month: {
	      validator: function(value){
	      	value = $.trim(value);
	        	var r = /^((31(?! (FEB|APR|JUN|SEP|NOV)))|((30|29)(?! FEB))|(29(?= FEB (((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))|(0?[1-9])|1\d|2[0-8])-(JAN|FEB|MAR|MAY|APR|JUL|JUN|AUG|OCT|SEP|NOV|DEC)+$/i;
            return value.match(r);
        	},  
	      message: 'Invalid Month. The data should be entered in format dd-Mon'
	   }  
	});
	
	/**
	 * alphaNumericWithApos	: Validates Alphabets,Numbers and Apostrophe [a-zA-Z0-9' ]
	 * USAGE				: alphaNumericWithApos
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaNumericWithApos: {
	      validator: function(value){
	      	value = $.trim(value);
	        	var r = /^[A-Z0-9' ]+$/i;
            return value.match(r);
        	},  
	      message: 'Alphanumeric With Apos Only'
	   }  
	});
	
	/**
	 * alphaSpecial	: Validates Alphabets and Characters Passed as a String
	 * USAGE		: alphaSpecial[\"string\"]
	 * Precaution	: The string passed must be escaped.
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaSpecial: {
	      validator: function(value, param){
	      	value = $.trim(value);
	        	var t = "^[A-Z" + RegExp.quote(param[0]) + " ]+$";
	        	var z = new RegExp(t,'i');
	        	param[1] = param[0].replace(/(.)/g,', $1').substr(1);
            return value.match(z);
        	},  
	      message: 'Alphabets &amp; {1} only.'
	   }  
	});
		
	/**
	 * contactNo	: Validates contact nos 
	 * USAGE		: contactNo
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   contactNo: {
         validator: function(value){
        		var r = /^\+?[0-9]{7,16}$/;
            return value.match(r);
         },
        	message: 'Invalid Phone No.'
	   }  
	});
	
	/**
	 * mobile	: Validates Mobile nos [ (+919911223344) OR (9911223344) ]
	 * USAGE		: Mobile
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   mobile: {
	      validator: function(value){
	      	value = $.trim(value);
	        	//var r = /^(\+[1-9]{2})?[0-9]{10}$/;
                        var r = /^[0-9]+$/;
            return value.match(r);
        	},  
	      message: 'Enter Mobile No [(+919911223344) OR (9911223344) ].'
	   }  
	});
	
	 /**
	 * telephone	: Validates Telephone Nos 
	 * USAGE		: telephone
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   telephone: {
	      validator: function(value){
	      	value = $.trim(value);
	        	var r = /^[0-9\.\s\-+()\/]+$/i;
            return value.match(r);
        	},  
	      message: 'Invalid Telephone No.'
	   }  
	});

	/**
	 * uploadPdfOnly	: Validates pdf file only
	 * USAGE			: uploadPdfOnly
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   uploadPdfOnly: {
		
	      validator: function(value){
		
		if(value.indexOf('pdf')=="-1")
	         return false;
		else
			return true;
	      },  
	     message: 'Enter pdf Only'
	   }  
	});
	
	/**
	 * uploadJpgOnly	: Validates/allows Jpg image only
	 * USAGE			: uploadJpgOnly
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   uploadJpgOnly: {
		
	      validator: function(value){
		
		if(value.indexOf('jpg')=="-1" && value.indexOf('jpeg')=="-1" && value.indexOf('JPG')=="-1" && value.indexOf('JPEG')=="-1")
	         return false;
		else
			return true;
	      },  
	     message: 'Enter jpg Only'
	   }  
	});
	
	/**
	 * selectCombo	: Validates/allows Combo value other than sent parameter "selectValue"
	 * USAGE		: selectCombo[selectValue]
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   selectCombo: {
			validator: function(value,param){
				return value != param[0];  
			},  
			message: 'Please Select This Option'
	   }  
	});
	
	/**
	 * selectComboNotSpecifiedVal	: Validates/allows Combo value other than sent parameter "selectValue"
	 * USAGE						: selectComboNotSpecifiedVal[SpecifiedVal,ResetCmbFlag,ResetCmbName,ResetCmbVal,Msg]
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
		selectComboNotSpecifiedVal: {
			validator: function(value,param){
				if(value==param[3]){
					param[4]="Please Select This Option";
					return false;
				}
				
				if(param[0]==param[3])
					return false;
				
				if((typeof param[0]!=undefined || param[0]!="") && value != param[0]){
					return false;
				}else{
					return true;
				}
			},  
			message: '{4}'
	   }  
	});
	

		
	/**
	 * exists		: Validates whether that value exist in comboBox 
	 * USAGE		: exists[param]
	 */
	$.extend($.fn.validatebox.defaults.rules,{
	    exists:{
	        validator:function(value,param){
	            var cc = $(param[0]);
	            var v = cc.combobox('getValue');
	            var rows = cc.combobox('getData');
	            for(var i=0; i<rows.length; i++){
	                if (rows[i].id == v){return true}
	            }
	            return false;
	        },
	        message:'The Entered Value Does Not Exists.'
	    }
	});
	
	/**
	 * equals		: Compares value with some other field
	 * USAGE		: equals[\"#otherField\"] (Argument is ID of field to compare)
	 * Precaution	: The string passed must be escaped.
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   equals: {  
			validator: function(value,param){  
			   return value === $(param[0]).val();  
			},  
	      message: 'It is not equal'
	   }  
	});
	
	/**
	 * CheckZero	: Validates that fields do not have all zeroes
	 * USAGE		: CheckZero[\" arg \"] (arg can be int/float)
	 * INFO			: The messages are based on arg i.e. int or float
	 * Precaution	: The string passed must be escaped.
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   checkZero: {
	      validator: function(value,param){
	      	value = $.trim(value);
	      	if(param[0].toLowerCase() === 'float'){
	      		param[1] = check_startzero;
	      		return (parseFloat(value) !== 0);
	      	} else {	
	      		param[1] = check_zero;
	      		return (parseInt(value) !== 0);
	      	}
        	},  
	      message: '{1}'
	   }  
	});
	
	
	/**
	 * numeric		: Validates Numbers
	 * USAGE		: numericwithoutzero
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   numericwithoutzero: {
	      validator: function(value){
	      	value = $.trim(value);
	        	var r = /^[1-9][0-9]*$/; ///^[1-9][0-9]*$;
            return value.match(r);
        	},  
	      message: 'Enter Number Only and 0 Is Not Allowed'
	   }  
	});
	
	/**
	 * numeric		: Validates Numbers
	 * USAGE		: numeric
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   numeric: {
	      validator: function(value){
	    	  //alert("inside numeric")
	      	value = $.trim(value);
	        	var r = /^[0-9]+$/i;
            return value.match(r);
        	},  
	      message: 'Enter Number Only.'
	   }  
	});
		
	/**
	 * Decimal		: Validates Decimal Nos
	 * USAGE		: decimal[ len,len ] i.e (3,4 => 123.1234)
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   decimal: {
	      validator: function(value,param){
	      	value = $.trim(value);

	      	var numbersOnly = /^[0-9\.]+$/;

	      	if(numbersOnly.test(value)){
	      		var period = value.indexOf('.');

		      	//Check if more periods exist
		      	if(value.indexOf('.',period+1) > -1){
		      		param[2] = check_decimal;
		      		return false;
		      	}

		      	if(period > 0){
		      		beforePeriod = value.substr(0,period);
		      		afterPeriod = value.substr(period+1);
		      		if(beforePeriod.length > param[0]) {
		      			param[2] = check_charbeforeperiod + ':'+ param[0] ;
		      			return false;
		      		} else if(afterPeriod.length > param[1]) {
		      			param[2] = check_charafterperiod + ':'+ param[1] ;
		      			return false;
		      		} else {
		      			return true;
		      		}
		      	} else if( period === 0) {
		      		param[2] = check_decimalperiod;
		      		return false;
		      	} else if( period === -1 ){
		      		if(value.length > param[0]){
		      			param[2] = check_digitno +':'+ param[0] ;
		      			return false;
		      		} else {
		      			return true;
		      		}
		      	} else {
		      		return true;
		      	}
	      	} else {
	      		param[2] = check_decimal;
	      		return false;
	      	}
        	},  
	      message: 'Enter Values in {2} Format'
	   }  
	});
	
	
	
	/**
	 * name		: Validates (allows) alphabets with Space & Period(.) Only 
	 * USAGE	: name
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   name: {
	      validator: function(value){
	        	var r = /^[A-Z ]+$/i;
	            return value.match(r);
	        	},  
	      message: 'Enter Alphabets,Space & Period(.) Only.'
	   }  
	});
	
	
	/**
	 * alphaWithSpaceand comma		: Validates (allows) alphabets with Space only (a-zA-Z, )  and comma
	 * USAGE				: alphaWithSpace/^[a-zA-Z]*[ a-zA-Z]$/;
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaWithSpaceandComma: {
	      validator: function(value){
	        	var r =/^[a-zA-Z,]+(\s+[a-zA-Z]+)*$/;
	            return value.match(r);
	        	},  
	      message: 'Enter Alphabets With Comma And Space.'
	   }  
	});
	
	/**
	 * date			: Validates Date
	 * USAGE		: date[dateFieldObj,dateFormatMode]
	 * Note			: dateFormatMode = 1 otherwise dd/mmm/yyyy(for jquery 'dd-M-yy' format)  or dd-mmm-yyyy or dd.mmm.yyyy
	 * include 		: dateFunction.js (in hisglobal/js)
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
		date: {
			validator: function(value,param){
				var objDobFld= document.getElementsByName(param[0])[0];
				return isDate(objDobFld,param[1]);
			},  
			message: 'This should be a date in {1} format.For ex: (28-Jan-2014). And year cannot be less than 1889'
	   }  
	});
	
	/**
	 * dtltet		: date should be less Than Equal to ToDate
	 * USAGE		: dtltet[ToDateFldName,Message]
	 */
	$.extend($.fn.validatebox.defaults.rules, {
		 dtltet: {
			 
			 validator: function(value, param){
				 
				 var d1 = $.datepicker.parseDate("dd-M-yy", value);
				 var d2 = $.datepicker.parseDate("dd-M-yy", $('[name="'+param[0]+'"]')[0].value); 
				return d1<=d2;
			 },
		 message: '{1}.'
		}
	});
	
	/**
	 * dtlt		: date should be less Than ToDate
	 * USAGE	: dtltet[ToDateFldName,Message]
	 */
	$.extend($.fn.validatebox.defaults.rules, {
		 dtlt: {
			 
			 validator: function(value, param){
				 
				 var d1 = $.datepicker.parseDate("dd-M-yy", value);
				 var d2 = $.datepicker.parseDate("dd-M-yy", $('[name="'+param[0]+'"]')[0].value); 
				return d1<d2;
			 },
		 message: '{1}.'
		}
	});
	
	/**
	 * dtNotGtGvnDay		: date should be date Not Greater than Provided Day(In No)
	 * USAGE		: dtNotGtGvnDay[ToDateFldName,NoOfDays,Message]
	 */
	$.extend($.fn.validatebox.defaults.rules, {
		 dtNotGtGvnDay: {
			 
			 validator: function(value, param){
				 
				 var d1 = $.datepicker.parseDate("dd-M-yy", value);
				 var d2 = $.datepicker.parseDate("dd-M-yy", $('[name="'+param[0]+'"]')[0].value); 
				
				 return ((d2-d1) <= NoOfDays);
			 },
		 message: '{1}.'
		}
	});
	
	/**
	 * dtgtet		: date should be greater Than Equal to ToDate
	 * USAGE		: dtgtet[ToDateFldName,Message]
	 */
	$.extend($.fn.validatebox.defaults.rules, {
		 dtgtet: {
			 
			 validator: function(value, param){
				 
				 var d1 = $.datepicker.parseDate("dd-M-yy", value);
				 var d2 = $.datepicker.parseDate("dd-M-yy", $('[name="'+param[0]+'"]')[0].value); 
				return d1>=d2;
			 },
		 message: '{1}.'
		}
	});
	
	/**
	 * dtgt		: date should be less Than Equal ToDate
	 * USAGE		: dtltet[ToDateFldName,Message]
	 */
	$.extend($.fn.validatebox.defaults.rules, {
		 dtgt: {
			 
			 validator: function(value, param){
				 
				 var d1 = $.datepicker.parseDate("dd-M-yy", value);
				 var d2 = $.datepicker.parseDate("dd-M-yy", $('[name="'+param[0]+'"]')[0].value); 
				return d1>d2;
			 },
		 message: '{1}.'
		}
	});
	
	$.extend($.fn.validatebox.defaults.rules, {
		 dtgtetctdt: {
			 
			 validator: function(value, param){
				 
				 var d1 = $.datepicker.parseDate("dd-M-yy", value);
				 var ctdt1 = new Date();
				 var ctdt = new Date(ctdt1.getFullYear(), ctdt1.getMonth(), ctdt1.getDate());
				 //alert("Current Date :"+ctdt);
				 alert("d1 :"+d1);
				 
				return d1>=ctdt;
			 },
		 message: '{0}.'
		}
	});
	
	$.extend($.fn.validatebox.defaults.rules, {
		 dtltetctdt: {
			 
			 validator: function(value, param){
				 
				 var d1 = $.datepicker.parseDate("dd-M-yy", value);
				 var ctdt = new Date();
				 //alert("Current Date :"+ctdt);
				 
				return d1<=ctdt;
			 },
		 message: '{0}.'
		}
	});
	
	/**
	 * dtgtetDMY	: Validates Date greater than or equal to a value specified in parameter
	 * USAGE		: date[dateFieldValue,mode]
	 * Note			: mode = y(for year) or m(for month) or d(for day)
	 */
	$.extend($.fn.validatebox.defaults.rules, {
		 dtgtetDMY: {
			 
			 validator: function(value, param){
				 //alert("inside jext");
				 var d1 = $.datepicker.parseDate("dd-M-yy", value);
				 var ctdt = new Date();
				 var valueYr = d1.getFullYear();
				 var ctdtYr = ctdt.getFullYear();
				 var dmy = param[0];
				 var dmyFlag=param[1];
				 //alert("Current Date :"+ctdt);
				 if(dmyFlag=="y")
					 ctdt.setFullYear(ctdt.getFullYear()-dmy);
				 if(dmyFlag=="m")
					 ctdt.setMonth(ctdt.getMonth()-dmy);
				 if(dmyFlag=="d")
					 ctdt.setDate(ctdt.getDate()-dmy);
				 param[1]= "Date Should not be less than "+ctdt.toString('dd-MMM-yyyy');
				 
				return (ctdtYr-valueYr)<= param[0];
			 },
		 message: '{1}.'
		}
	});
	
	/**
	 * dtltetDMY	: Validates Date greater than or equal to a value(in No) specified in parameter
	 * USAGE		: date[dayMnthYrValue,mode]
	 * Note			: mode = y(for year) or m(for month) or d(for day)
	 */
	$.extend($.fn.validatebox.defaults.rules, {
		 dtltetDMY: {
			 
			 validator: function(value, param){
				 
				 var d1 = $.datepicker.parseDate("dd-M-yy", value);
				 var ctdt = new Date();
				 var dmy = param[0];
				 var dmyFlag=param[1];
				 var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
				
				 if(dmyFlag=="y")
					 ctdt.setFullYear(ctdt.getFullYear()-dmy);
				 else if(dmyFlag=="m")
					 ctdt.setMonth(ctdt.getMonth()-dmy);
				 else if(dmyFlag=="d")
					 ctdt.setDate(ctdt.getDate()-dmy);
				 
				 var msg="Date Should not be less than "+ctdt.getDate()+"-"+(month[ctdt.getMonth()])+"-"+ctdt.getFullYear()+".";
				 param[1]= msg;
				 
				return d1 >= ctdt;
			 },
		 message: '{1}.'
		}
	});
	
	
	/**
	 * range		: Validates range of 2 No
	 * USAGE		: range[1stNo,2ndNo ]
	 */
	$.extend($.fn.numberbox.defaults.rules, {  
		range: {
			validator: function(value,param){
				//alert(value);
				//alert(param[0] + " ," + param[1]);
				if(value<param[0] || value>param[1])
					return false;
				
				return true;  
			},  
			message: 'Value Should be between {0} and {1}.'
		}  
	});
	
	// to validate amount..param[0]--name of component,param[1]--digits before decimal,param[2]--digits after decimal,param[3]--generic message	
	$.extend($.fn.numberbox.defaults.rules, {  
		validateAdvAmount: {
		      validator: function(value,param){
		    	  //alert("Monthly INcome");
		    	 try
		    	 {
				      var tempStr1=document.getElementsByName(param[0])[0].value;
				      var tempStr="" ;
				      var goAhead=false;
						
						//alert(tempStr1.split(".").length-1);// returns 1 for say 1.2 cz '-1' has been done els would have returned diff values for 1.1.1 or 1..2
						
						if((tempStr1.split(".").length-1)==1){
							if(tempStr1.indexOf(".")!=-1){
								tempStr=document.getElementsByName(param[0])[0].value.split('.') ;
						
								var varBfrDec=tempStr[0].length;
								var varAfterDec=tempStr[1].length;
							
								if(varAfterDec > param[2]){
									goAhead=false;
									param[3]="Precision upto "+param[2]+" digits is allowed.";
								}
								
								if(varAfterDec == param[2]){
									if(varBfrDec <= param[1]){
										goAhead=true;
									}
									else{
										goAhead=false;
										param[3]="Invalid amount.At max "+param[1]+" digits are allowed before decimal.";
									}
								}
								
								if(varAfterDec == 1){
									if(varBfrDec <= param[1]){
										goAhead=true;
									}else{
										goAhead=false;
										param[3]="Invalid amount.At max "+param[1]+" digits are allowed before decimal.";
									}
								}
								
								if(varAfterDec == 0){
									if(varBfrDec <= param[1]){
										param[3]="Invalid amount.Either enter digit after decimal or delete decimal";
										goAhead=false;
									}else{
										goAhead=false;
										param[3]="Invalid amount.At max "+param[1]+" digits are allowed before decimal.";
									}
								}
							
							}else{
								// no decimal found..
								if(document.getElementsByName(param[0])[0].value.length > param[1]){
									goAhead=false;
									param[3]="Invalid amount.At max "+param[1]+" digits are allowed.";
								}else{
									goAhead=true;
								}
							}
							
						}else{
							if(tempStr1.indexOf(".")==-1){
								// no decimal found..
								if(document.getElementsByName(param[0])[0].value.length > param[1]){
									goAhead=false;
									param[3]="Invalid amount.At max "+param[1]+" digits are allowed.";
								}else{
									goAhead=true;
								}
							}else{
								goAhead=false;
								param[3]="Multiple decimals are not allowed.Invalid Input.";
							}
						}
			      }catch(err){
			    	  //alert("error:::"+err.message);
			      }
					
			      return goAhead;
			    
		      },
		      message: '{3}'
		   }  
	});
	
	/**
	 * fatherOrSpouseReqd	: Validates (allows) alphabets with Space only (a-zA-Z ) 
	 * USAGE				: fatherOrSpouseReqd[1]
	 */
	/*$.extend($.fn.validatebox.defaults.rules, {  
		fatherOrSpouseReqdd: {
	      validator: function(value){
	        	var r = /^[A-Z ]+$/i;
	        	var matchValue = value.match(r);
	        	var fatherName = $('[name="patGuardianName"]')[0].value;
	        	var spouseName = $('[name="patHusbandName"]')[0].value;
	        	var maritalStatusCode = $('[name="patMaritalStatusCode"]')[0].value;
	        	alert("matchValue :"+matchValue);
	        	alert("fatherName :"+fatherName);
	        	alert("spouseName :"+spouseName);
	        	alert("maritalStatusCode :"+maritalStatusCode);
	        	
	        	if(maritalStatusCode != "-1" && maritalStatusCode!="1"){
	        		if(fatherName=="" && spouseName==""){
	        			param[0]="Please Enter Either Father Name Or Spouse Name";
	        			//alert("msg :"+param[0]);
	        			return false;
	        		}else{
	        			param[0]="Enter Alphabets & Space Only.";
	        			return matchValue;
	        		}
	        	}else{
	        		if(fatherName==""){
	        			param[0]="This Field is Required";
	        			return false;
	        		}else{
	        			param[0]="Enter Alphabets & Space Only.";
	        			return matchValue;
	        		}
	        	}
	            return value.match(r);
	        	},  
	      message: '{0}'
	   }  
	});*/
	
	$.extend($.fn.validatebox.defaults.rules, {  
		fatherOrSpouseReqdd: {
	      validator: function(value){
	        	var r = /^[A-Z ]+$/i;
	        	var matchValue = value.match(r);
	        	var fatherName = $('[name="patGuardianName"]')[0].value;
	        	var spouseName = $('[name="patHusbandName"]')[0].value;
	        	var maritalStatusCode = $('[name="patMaritalStatusCode"]')[0].value;
	        	//alert("matchValue :"+matchValue);
	        	//alert("fatherName :"+fatherName);
	        //	alert("spouseName :"+spouseName);
	        	//alert("maritalStatusCode :"+maritalStatusCode);
	        	if(matchValue)
	        	{
	        		if(maritalStatusCode == "2" || maritalStatusCode=="3")
	        		{
	        			if(fatherName=="" && spouseName==""){
	        			param[0]="Please Enter Either Father Name Or Spouse Name";
	        			//alert("msg :"+param[0]);
	        			return false;
	        		}
	        		}
	        		else
	        	    {
	        	        if(fatherName==""){
	        	        param[0]="This Field is Required";
	        	        return false;
	        	      }
	        	    }
	        		}
	        	else
	        		{
	        			param[0]="Enter Alphabets With Space Only.";
	        		}
	            return value.match(r);
	      },  
	      message: '{0}'
	   }  
	});
	
	$.extend($.fn.validatebox.defaults.rules, {  
		   numericNew: {
			    validator: function(value,param){
			    	//alert("hello");
			     var r =/(^(0|([1-9][0-9]{0,7}))(\.[0-9]{1,2})?$)|(^(0{0,1}|([1-9][0-9]{0,7}))(\.[0-9]{1,2})?$)/;
		            return value.match(r);
		        },
				message: 'Enter Income With Precision of 2 ex(1000.00)'            
		   }  
		});
	
	$.extend($.fn.validatebox.defaults.rules, {  
		   numberRangeOneToEighteen: {
			    validator: function(value,param){
			    	//alert("hello");
			     var r =/^([1-9]|[1][0-8])$/;
		            return value.match(r);
		        },
				message: 'Enter The Number Between 1 To 18 Only'            
		   }  
		});
	
	$.extend($.fn.validatebox.defaults.rules, {  
		numberRangeOneToOneHundredTwentyFiveOnly:{
			    validator: function(value,param){
			    	//alert("hello");
			     var r =/^([1-9]|[1-9][0-9]|1[0-2][0-5])$/;
		            return value.match(r);
		        },
				message: 'Enter The Number Between 1 To 125 Only'            
		   }  
	});
	
	
	$.extend($.fn.validatebox.defaults.rules, {  
		ipAddress:{
			    validator: function(value,param){
			    	
			    // var r =/^([01]?[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([01]?[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([01]?[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([01]?[0-9][0-9]|2[0-4][0-9]|25[0-5])$/;
			    	var r =/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
			     //alert("value.match(r) :"+value.match(r));
		            return value.match(r);
		        },
				message: 'Enter a valid Ip Address in a format (255.255.255.254)'            
		   }  
		});
	
	
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphanumericWithSomeSymobols: {
	      validator: function(value){
	        	var r =/^([0-9a-zA-Z\.\^\*\%\/\() ]+)*$/;
	         return value.match(r);
	      }, 
	      message: 'Enter Alphanumeric WithSpecial Chars( .^*%/() ) Only.'
	   }  
	
	});
	
	///////////////////
	/**
	 * alphaNumWithUnderscore		: Validates (allows) alpha-Numeric with Uderscore only
	 * USAGE						: alphaWithUnderscore
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
		alphaNumWithUnderscore: {
	      validator: function(value){
	        	var r = /^[A-Z0-9_]+$/i;
	            return value.match(r);
	        	},  
	      message: 'Enter Alphabets With Underscore Only.'
	   }  
	});
	
	/**
		 * equals		: Compares value with some other field for Equality
		 * USAGE		: equalTo[\"#otherField\",\"Field Name\",\"Other Field Name\"] (Argument 1 is ID of field to compare)
		 */
		$.extend($.fn.validatebox.defaults.rules, {  
			equalTo: {  
				validator: function(value,param){  
				   return value === $(param[0]).val();  
				},  
		      message: '{1} is not equal to {2}'
		   }  
		});
	
	/**
	 * notEquals	: Compares value with some other field for Not Equal
	 * USAGE		: notEqualTo[\"#otherField\",\"Field Name\",\"Other Field Name\"] (Argument 1 is ID of field to compare)
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
		notEqualTo: {  
			validator: function(value,param){  
			   return value != $(param[0]).val();  
			},  
	      message: '{1} is equal to {2}'
	   }  
	});

	/**
	 * passwordStrength	: Compares value with some other field
	 * USAGE			: passwordStrength[strength]
	 * Precaution		: The string passed must be escaped.
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
		passwordStrength: {  
			validator: function(value,param){
	        	var r = '[A-Za-z]';
	        	var isAlphaPresent = value.match(r);
				if(param[0]==1 && !isAlphaPresent)
				{
					param[1] = "Password must contain at least one Alphabet.";
					return false;
				}
	        	r = '[0-9]';///^[0-9]*$/i;
	        	var isNumPresent = value.match(r);
				if(param[0]==2 && (!isAlphaPresent || !isNumPresent))
				{
					param[1] = "Password must contain at least one Alphabet and one Number.";
					return false;
				}
	        	r = '[\,\.\;\s\&\-_!~`’@#$%^&*()+={}:";\'<>?\/]'; // /^*[\,\.\;\s\&\-_!~`’@#$%^&*()+={}:";'<>?\/]*$/i;
	        	var isSpecialPresent = value.match(r);
				if(param[0]==3 && (!isAlphaPresent || !isNumPresent || !isSpecialPresent))
				{
					param[1] = "Password must contain at least one Alphabet, one Number and one Special Character.";
					return false;
				}
				return true;
			},  
	      message: '{1}'
	   }  
	});
	
	/**
	 * requireRadio	: Require Atleast one Radio to be selected
	 * USAGE		: requireRadio[radioObject,Message]
	 * Example		: validType: 'requireRadio[\'input[name=radioObjectName]\', \'Please Select Atleast One Record\']'
	 * 					OR
	 * 				  validType: 'requireRadio[\'input:radio[name=radioObjectName]\', \'Please Select Atleast One Record\']'
	 */
	$.extend($.fn.validatebox.defaults.rules, {
		requireRadio: {  
			validator: function(value, param){  
				var input = $(param[0]);
				input.off('.requireRadio').on('click.requireRadio',function(){
					$(this).focus();
				});
				return $(param[0] + ':checked').val() != undefined;
			},  
			message: '{1}.'  
		}  
	});
	
	/**
	 * Validates non-duplicate sequence number
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   nonDuplicate: {
			validator: function(value,param){
				var c;
				var action 	= "/HISPis/pis/joining/masters/getSeqNoCountPSGradePB.action?intCatRevId="+$('#intCatRevId').val()+"&strGradePBSeq="+$('#strGradePBSeq').val();
				$.ajax({url: action,async:false,dataType:"text" ,success:function(data)
				{
					console.log("Data is " + data);
					console.log(data == '0');
					c = data;
					
					
				},error: function(errorMsg,textstatus,errorthrown) 
				{
					alert('Sequence number '+errorMsg+" textstatus::"+textstatus+" errorthrown::"+errorthrown);
				}
				});
				if(c == '0') return true;
				else return false;
			},  
			message: 'Duplicate sequence number.'
	   }  
	});
	
	$.extend($.fn.validatebox.defaults.rules, {
		gtStartAmt: {  
			validator: function(value, param){
//				console.log("Here it is " + $('.startAmount')[param[0]].value + " for " + param[0]);
//				if($('.startAmount')[param[0]].value >=  value) {
//					return false;
//				}
				//console.log($('.endAmount').length);
				for(var i = 0 ; i<$('.endAmount').length ; i++) {
					//console.log("index : " + i + " start amt:"+$('.startAmount')[i].value + " endamt:" + $('.endAmount')[i].value);
					if(parseInt($('.startAmount')[i].value) >=  parseInt($('.endAmount')[i].value)) {
						return false;
					}
				}
				return true;
			},  
			message: 'Inappropriate end amount.'  
		}  
	});
	
	$.extend($.fn.validatebox.defaults.rules, {
		btwStartEndAmt: {  
			validator: function(value, param){
				//console.log($('.startingBasicAmt').length);
//				console.log('start ' + $('#intStartAmount_list').val() + 'end ' + $('#intEndAmount_list').val());
				for(var i = 0 ; i<$('.startingBasicAmt').length ; i++) {
//					console.log("index : " + i + " basic amt:"+$('.startingBasicAmt')[i].value );
					if(parseInt($('.startingBasicAmt')[i].value) <  parseInt($('#intStartAmount_list').val())) {
						return false;
					}
					if(parseInt($('.startingBasicAmt')[i].value) >=  parseInt($('#intEndAmount_list').val())) {
						return false;
					}
				}
				return true;
			},  
			message: 'Inappropriate basic amount.'  
		}  
	});
	
	$.extend($.fn.validatebox.defaults.rules, {
		uniqueGP: {  
			validator: function(value, param){
				var arr = $('[name="intIncrementOrGP_list"]');
				//console.log($('.startingBasicAmt').length);
//				console.log('start ' + $('#intStartAmount_list').val() + 'end ' + $('#intEndAmount_list').val());
				for(var i = 0 ; i<arr.length ; i++) {
					console.log("i : " + i + " arri:"+arr[i] );
					for(var j = 0 ; j<i ; j++) {
						if(parseInt(arr[i].value) ==  parseInt(arr[j].value)) {
							return false;
						}
					}
				}
				return true;
			},  
			message: 'Duplicate.'  
		}  
	});
	
	/* Leave >> Holiday Master >> For Unique holiday */
	$.extend($.fn.validatebox.defaults.rules, {
		uniqueHoliday: {  
			validator: function(value, param){
				//alert("Value >> "+value+ "param> "+param[0]);
				var arr = $('[name="strHolidayName_list"]');
				var arr1 = $('[name="strHolidayShName_list"]');
				//var year=$('[name="intYear"]');
				var hosp = $('[name="intHospitalCode_list"]');
			
				var i=param[0]-1;
				for(var j = 0 ; j < i; j++){
					
					console.log("i : " + i + "j : " + j + " arr["+j+"]: "+arr[j].value + " value - " + value );
					console.log("hosp ["+j+"]: "+hosp[j].value + " hosp["+i+"].value - " + hosp[i].value);

					if(arr[j].value==  value && arr1[j].value ==  arr1[i].value && hosp[j].value ==  hosp[i].value) {
						return false;
					}
				}
				return true;
			},  
			message: 'Duplicate.'  
		}  
	});
	
	// param[0] is initial amount and param[1] is final amount
	$.extend($.fn.validatebox.defaults.rules, {  
		   payInRange: {
				validator: function(value,param){
					if(value<param[0]) return false;
					else if (value>param[1]) return false;
					else return true;
				},  
				message: 'Enter pay between {0} and {1}.'
		   }  
		});
	var request = null;
	$.extend($.fn.validatebox.defaults.rules, {  
		uniqueDesigName: {
				validator: function(value,param){
					var c;
					var pageFlag = param[1];
					var desigCode = param[0];
					//console.log("sss " + param[0] + param[1]);
					var action 	= "/HISPis/pis/masters/getNameCountDesignation.action?strDesigName="+value+"&pageFlag="+pageFlag+"&strDesigCode="+desigCode;
					if (request != null) {  
						request.abort();
						console.log("aborting");
					}
					request = $.ajax({url: action,async:false,dataType:"text" ,success:function(data)
					{
						console.log("Data is " + data);
						console.log(data == '0');
						c=data;
												
					},error: function(errorMsg,textstatus,errorthrown) 
					{
						alert('Sequence number '+errorMsg+" textstatus::"+textstatus+" errorthrown::"+errorthrown);
					}
					});
					if(c == '0') 
						return true;
					else return false;
				},  
				message: 'Duplicate name.'
		   }  
		});
	
	$.extend($.fn.validatebox.defaults.rules, {  
		uniqueDesigShName: {
				validator: function(value,param){
					var c;
					var pageFlag = param[1];
					var desigCode = param[0];
					//console.log(param[0] + param[1]);
					var action 	= "/HISPis/pis/masters/getShortNameCountDesignation.action?strDesigShortName="+value+"&pageFlag="+pageFlag+"&strDesigCode="+desigCode;
					$.ajax({url: action,async:true,dataType:"text" ,success:function(data)
					{
						console.log("Data is " + data);
						console.log(data == '0');
						c=data;
												
					},error: function(errorMsg,textstatus,errorthrown) 
					{
						alert('Sequence number '+errorMsg+" textstatus::"+textstatus+" errorthrown::"+errorthrown);
					}
					});
					if(c == '0') 
						return true;
					else return false;
				},  
				message: 'Duplicate short name.'
		   }  
		});
	
});
