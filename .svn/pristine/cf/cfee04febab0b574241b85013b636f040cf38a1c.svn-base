/**
 * Developer : Aadil
 * Date		 : Apr-2014 
 * USAGE	 : Default Date Picker Setting.
 */

$(document).ready(function(){
	$.datepicker.setDefaults({
		showOn: 'both',
		defaultDate: new Date(),
		buttonImageOnly: true, 
		buttonText : "Select Date",
		buttonImage: "/HIS/hisglobal/images/calendar-icon.gif",
		onSelect: function (dateText, inst) {
			onClickDateFn($(this));
		}
	});
});

function onClickDateFn(obj){
	obj.focus();
}