
	function Stack(){
		this.array = new Array();
		this.top = -1;
	}

	function pushIntoStack(value){
		try{
			//alert("stack value is:"+value);
			if(value==null)
				throw "Illegal Argument Exception value: "+value;

			this.array[++(this.top)]=value;
			//alert("array length is:"+this.array.length);
		}catch(e){
			//	alert( e+":push(value)");
		}
	}

	function popOutOfStack(){
		if(this.top<0)
				return null;
		return this.array[this.top--];
	}

	function peepIntoStack(){
		if(this.top<0)
				return null;
		return this.array[this.top];
	}

	function isEmptyStack(){
		if(this.top <0)
			return true;
		return false;
	}

	function refreshStack(){
		this.top = this.array.length-1;
		/*alert("refreshStack the top is at:"+this.top);*/
	}

	function mergeStack(_stack ){
		//code for merging the stack comes here
		if(_stack == null)
			return; ///<<<<<<<<<<<<<<<<<<<<<<<<<<<<
		//alert("the size of stack is:"+_stack.size() + "stack.toString(): "+_stack.toString());
		//alert("the length of array in current stack is: "+this.array.length+ "mergestack.toString():  "+ this.toString());
		_stack.refresh();
		while((node = _stack.pop())!=null)
		{
			//alert("Node merge:  "+node);
			if(this.search(node) == -1){
				this.push(node);
			}
		}
	}
	
	function searchIntoStack(_value){
		for(i=0; i< this.array.length; i++){
			if(this.array[i] == _value){
				return i;
			}						
		}
		return -1;
	}
	
	function sizeStack(){
		if(this.top==-1)
			alert("stack is empty");
		return this.array.length;	
	}
	
	/*function toStringStack(){
		str ="";
		for(i=0; i< this.array.length; i++){
			if(i!=0)
				str+=", ";
			str+=this.array[i];
		}	
		str = "["+str+"]";
	}*/
	Stack.prototype.pop = popOutOfStack;
	Stack.prototype.push = pushIntoStack;
	Stack.prototype.peep = peepIntoStack;
	Stack.prototype.isEmpty = isEmptyStack;
	Stack.prototype.refresh = refreshStack;
	Stack.prototype.merge = mergeStack;
	Stack.prototype.size= sizeStack;
	Stack.prototype.search = searchIntoStack;
	/*Stack.prototype.toString = toStringStack;*/