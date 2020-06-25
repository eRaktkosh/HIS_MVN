
function Queue(){
	this.cursor = -1;
	this.array = new Array();
}

function nextInQueue(){
	try{
		if(this.isEmpty() || this.cursor >= this.array.length-1)
			throw "Index Out of Bound Exception: ";
		this.cursor++;
		return this.array[this.cursor];
	}catch(e){
		throw e+"  :nextInQueue";
	}
}

function isQueueEmpty(){
	if(this.array.length == 0)
		return true;
	return false;
}

function getAtIdxInQueue(idx){
	try{
		if(idx <0 || idx == null)
			throw "Illegal Argument Exception - idx:"+idx;
		if(this.isEmpty() || idx > this.array.length-1)
			return null;
		return this.array[idx];

	}catch(e){
		throw e+":  getAtIdxInQueue(idx)";
	}
}

function getQueueSize(){
		return this.array.length;
}

function getSubQueue(frmidx,lastidx){
	try{
		if(frmidx==null||frmidx<0||lastidx<0||frmidx>=this.size())
			throw "Illegal Argument Exception - frmIdx:"+frmidx;

		if(lastidx==null)
			lastidx = this.array.length;
		if(lastidx>this.array.length)
			lastidx = this.array.length;

		subQ = new Queue();

		for(i=frmidx; i<lastidx; i++)
			subQ.add(this.array[i]);
		return subQ;
	}catch(e){
	//alert(e.description);
		throw e+":  getSubQueue(frmidx,lastidx)";
	}
}

function appendInQueue(value){
	try{
		if(value == null)
			throw "Illegal Argument Exception value: "+value;

		this.array[this.array.length] = value;
	}catch(e){
		throw e+":  appendInQueue(value)";
	}
}

function hasNextInQueue(){
	if(this.cursor+1 == this.array.length)
		return false;
	return true;
}

function searchInQueue(value){
	//try{
		if(value == null)
			throw "Illegal Argument Exception value: "+value;

		for(i=0; i<this.array.length; i++){
			if(this.array[i]==value){
				return (i);
			}
		}
		return -1;
	//}catch(e){
		//alert('throw e+":Search(idx)"');
	//}
}

function toStringQueueDtls(){
	msg="[";
	while(this.hasNext()){
		msg+=this.next();
		if(this.hasNext())
			msg+=", ";
	}
	msg+="]";
	return msg;
}

function refreshQueue(){
	this.cursor = -1;
}

function clearQueue(){
	this.cursor = -1;
	this.array = new Array();
}

Queue.prototype.next = nextInQueue;
Queue.prototype.isEmpty = isQueueEmpty;
Queue.prototype.get = getAtIdxInQueue;
Queue.prototype.size = getQueueSize;
Queue.prototype.subQueue = getSubQueue;
Queue.prototype.add = appendInQueue;
Queue.prototype.hasNext = hasNextInQueue;
Queue.prototype.search = searchInQueue;
Queue.prototype.toString = toStringQueueDtls;
Queue.prototype.refresh = refreshQueue;
Queue.prototype.clear = clearQueue;