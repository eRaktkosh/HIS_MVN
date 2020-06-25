/****************** URL Available Check  **************/
function checkURL(vURL)
{
	//alert(vURL);
	var flg = true;
	$.ajax({
        url:vURL,
        async: false,
        success: function () {
        //	alert("true");
        	flg = true;
        },
        error: function (jqXHR, status, er) {
        	//alert("false"+jqXHR.status);
            //only set the error on 404
            if (jqXHR.status === 404) { 
            	flg = false;
            }
            else if (jqXHR.status === 500) { 
            	flg = false;
            }
        }
    });
	return flg;
} 
/* END ************ AJAX Loading Continuation Signal Setter  **************/

