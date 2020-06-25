
function checkTime(eObj,obj)

{

	if(eObj.keyCode>=48 && eObj.keyCode<=57)

	{

		if(obj.value.length==0 && !(eObj.keyCode>=48 && eObj.keyCode<=50) )

		{

			eObj.keyCode = 0;

			return;

		}

		

		if(obj.value.length==1 && parseInt(obj.value)>1 )

		{

			if( !(eObj.keyCode>=48 && eObj.keyCode<=51) )

			{

				eObj.keyCode = 0;

				return;

			}

		}

		

		if(obj.value.length==2)

		{

			if( !(eObj.keyCode>=48 && eObj.keyCode<=53) )

			{

				eObj.keyCode = 0;

				return;

			}

			else

				obj.value += ":";	

		}

		

		if(obj.value.length==3)

		{

			if( !(eObj.keyCode>=48 && eObj.keyCode<=53) )

			{

				eObj.keyCode = 0;

				return;

			}

		}

	}

	else

		eObj.keyCode = 0;

}



