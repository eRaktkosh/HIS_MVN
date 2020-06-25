function initMultilingual() 
{
	
	pramukhIME.addLanguage(PramukhIndic);
    pramukhIME.enable();
        
    FromLanguage = "english";
	ToLanguageOther = "telugu";
		
    FromLanguageFull = "pramukhindic:"+FromLanguage;
	ToLanguageOtherFull = "pramukhindic:"+ToLanguageOther;
}

function multilingualConversion(fromField, toFieldHindi)
{
	InputString = fromField.value;
	changeLanguage(ToLanguageOtherFull);
	ToLanguage = ToLanguageOther;
	convertedTextOther = pramukhIME.convert(InputString, FromLanguage, ToLanguage);
	toFieldHindi.value = convertedTextOther;
	changeLanguage(FromLanguageFull);
}

function callOnBlur()
{
	changeLanguage(FromLanguageFull);
}

function callOnClick()
{
	changeLanguage(ToLanguageOtherFull);
}
