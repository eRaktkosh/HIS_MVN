	function Tree(){
		this.treeScript;
		this.rootNodeName;
		this.preOrderQueue;
		this.postOrderQueue;
		this.nodeValueArr;
//		this.postOrderDataQueue;
	}

	function toggleNodeOfTree(idToToggle) {
		//alert("inside toggle");
		
	   elem=document.getElementById(idToToggle);
	   isVisible=(elem.style.display!="none")
	   node=document.getElementById("x" + idToToggle);
	   if (isVisible) {
		 elem.style.display="none";
		 node.innerHTML="<img src='../hisglobal/images/plus.gif'>";
	   } else {
		  elem.style.display="block";
		  node.innerHTML="<img src='../hisglobal/images/minus.gif'>";
	   }
	}

	function expandAllNodesInTree() {
		this.reset();
	   divs=document.getElementsByTagName("DIV");
	   for (i=0;i<divs.length;i++) {
		 if(divs[i].id == '')
			continue;
		 divs[i].style.display="block";
		 node=document.getElementById("x" + divs[i].id);
		 //alert("node.id: "+node.id);
		 node.innerHTML="<img src='../hisglobal/images/minus.gif'>";
	   }
	}

	function collapseAllNodesInTree() {
		this.reset();
	   divs=document.getElementsByTagName("DIV");
	   for (i=0;i<divs.length;i++) {
		 if(divs[i].id == '')
			continue;
		 divs[i].style.display="none";
		 node=document.getElementById("x" + divs[i].id);
		 node.innerHTML="<img src='../hisglobal/images/plus.gif'>";
	   }
	}

	function markFirstOccurenceInTree(valSearch){
		//alert("in mark first search");
		//alert("the post orderqueue length is:"+this.postOrderQueue.size());
		//alert("the searching element is:"+valSearch);
		this.postOrderQueue.refresh();
		this.findNext(valSearch);
	}

	/*function markAllOccurrences(valSearch){
		//alert("inside markAllOccurences");
		this.postOrderQueue.refresh();
		var newStack = new Stack();
		//alert("the size of postOrderQueue"+this.postOrderQueue.size());
		while(this.postOrderQueue.hasNext()){
			flagFound = false;
			while(this.postOrderQueue.hasNext()){
				nodeName = this.postOrderQueue.next();
				strText = this.nodeValueArr[nodeName];
				
				if(strText.toUpperCase().indexOf(valSearch.toUpperCase())!=-1){
					
					flagFound=true;
					break;
				}
			}
			if(flagFound){
				presentNodeName = this.postOrderQueue.get(this.postOrderQueue.cursor);
				//alert("the present node name is:"+presentNodeName);
				var stkNodeOrder=new Stack();
				stkNodeOrder=this.getExpandStackForNode(presentNodeName);
				newStack.merge(stkNodeOrder);
			}else
				break;
		}

		this.reset();
		
		//expand nodes for this stack
		//alert("the size of newStack:  "+newStack.size());
		this.expandStackNodes(newStack);
		// marknodes in stack
		newStack.refresh(); //move top to the top of the stack

		this.markStackNodes(newStack);
	}*/

	function markNextOccurenceInTree(valSearch)
		{
			//alert("inside nextOccurence");
			if(valSearch==null)
			//	alert('throw "Illegal Argument Exception: value to Search -> "'+valSearch);

//		this.treeScript;
//		this.preOrderQueue;
//		this.postOrderQueue;
//		this.nodeValueArr;
		
			flagFound = false;
			//alert("the postorderque size is:"+this.postOrderQueue.hasNext());
			while(this.postOrderQueue.hasNext()){
				nodeName = this.postOrderQueue.next();
				strText = this.nodeValueArr[nodeName];
				//alert("strText:"+strText);
				
				if(strText.toUpperCase().indexOf(valSearch.toUpperCase())!=-1){
					flagFound=true;
					//alert("inside marknext:  "+strText+" ~~~~~~~~~valTosearch: "+valSearch);
					break;					
				}					
			}
			//alert("flag vlaue:  "+flagFound);
			if(!flagFound)
				return -1;

			presentNodeName = this.postOrderQueue.get(this.postOrderQueue.cursor);
			//alert("presentNodeName"+presentNodeName);
			var stkNodeOrder=new Stack();
			stkNodeOrder=this.getExpandStackForNode(presentNodeName);
			//alert("stkNodeOrder"+stkNodeOrder.size());
			//stack is Built
			//this.collapseAll();
			this.reset();
			//expand nodes for this stack
			if(stkNodeOrder.isEmpty())
			{
				alert("No Record Found");	
			}
			this.expandStackNodes(stkNodeOrder);
			// marknodes in stack
			stkNodeOrder.refresh(); //move top to the top of the stack

			this.markStackNodes(stkNodeOrder);
		
		}
		
		/*function expandAllNodes() 
		{
			while(this.preOrderQueue.hasNext())
			{
				nodeName=this.preOrderQueue.next();
				if(this.isLeaf(nodeName))
					continue;
				else
				divid=document.getElementById(nodeName);
				divid.style.display="block";
				node=document.getElementById("x"+divid.id);
				if(node!=null)
				node.innerHTML="<img src='../hisglobal/images/minus.gif'>";
					
						
			}	
		}*/

		function getExpandStackForNode(_node){
			idxInPreQ = this.preOrderQueue.search(_node);
			//alert("the index of preorder:"+idxInPreQ);
			idxInPostQ = this.postOrderQueue.search(_node);
			//alert("index of post:"+idxInPostQ);
			if(idxInPreQ== -1 && idxInPostQ == -1)
			//	alert('throw "NODE Not Found Exception- Node: "'+_node);

			if(idxInPreQ== -1 || idxInPostQ == -1)
			//	alert('throw "Synchronization Exception: Que\'s arenot Sysnchronized"');

			//get sublist of postOrderQueue from the cursor position + onward
			qPostSubQue = this.postOrderQueue.subQueue(idxInPostQ);
			//alert("the size of subque is:"+qPostSubQue.size());
			var stkNodeOrder=new Stack();

			while(qPostSubQue.hasNext()){
				strNodeName = qPostSubQue.next();
				presIdxInPreQ = this.preOrderQueue.search(strNodeName);
				if(presIdxInPreQ == -1)
				//	alert('throw "Synchronization Exception: Que\'s arenot Sysnchronized"');
				if(presIdxInPreQ<=idxInPreQ)
				{
					//alert("the stack element is:"+strNodeName);
					stkNodeOrder.push(strNodeName);
				}
			}
			//alert("the size of stack is:"+stkNodeOrder.size());
			return stkNodeOrder;
		}

		function expandStackNodes(_stk){
			//alert("stack size:"+_stk.size());
			while(!_stk.isEmpty()){
				nodeName = _stk.pop();
				//alert(nodeName);
				if(document.getElementById(nodeName)!=null)
				{
					divElem=document.getElementById(nodeName);
					//alert("divElem"+divElem);
					divElem.style.display="block";
				}
			}
		}

		function markStackNodes(_stk){
			
			while(!_stk.isEmpty()){
				nodeName = _stk.pop();
				if(document.getElementById(nodeName)!=null)
				{
					divElem=document.getElementById("x"+nodeName);
					//alert("divElement:"+divElem);
					divElem.innerHTML="<img src='../hisglobal/images/minus.gif'>";
				}
				if(document.getElementById(nodeName)==null)
				{
					divElem=document.getElementById("x"+nodeName);
					//alert("divElement:"+divElem);
					divElem.className="greenColor";
					//divElem.innerHTML="<blink><b><font size='20' color='BLUE'><b>-></b></font></b></blink>";
					
				}
			}
		}

		function resetTreeState(){
			//alert("the rootnode is:"+this.rootNodeName);
			divElem=document.getElementById(this.rootNodeName);
			divElem.innerHTML = this.treeScript;
			//alert("divElem.innerHTML"+divElem.innerHTML);
		}

		function isLeafInTree(_node){
			idxInPreQ = this.preOrderQueue.search(_node);
			idxInPostQ = this.postOrderQueue.search(_node);
			if(idxInPreQ== -1 && idxInPostQ == -1)
			//	alert('throw "NODE Not Found Exception- Node: "'+_node);

			if(idxInPreQ== -1 || idxInPostQ == -1)
			//	alert('throw "Synchronization Exception: Que\'s arenot Sysnchronized"');

			//get next element in preorder << to check for child
			nextPreNode = this.preOrderQueue.get(idxInPreQ+1);
			if(nextPreNode == null)
				return true; //its a leaf

			//check into the postorder tree
			idxOfNextInPostQ = this.postOrderQueue.search(nextPreNode);
			if(idxOfNextInPostQ == -1)
			//	alert('throw "Synchronization Exception: Que\'s arenot Sysnchronized"');

			if(idxOfNextInPostQ<idxInPostQ)
				//it has a child
				return false;
			else
				return true;
		}
	function changeColor(obj)
	{	
		//alert("the obj is:"+obj);
		var index=obj.value;
		//alert(index);
		var rowObj=document.getElementById(index);
		rowObj.bgColor=obj.checked?"#FFCCFF":"#EBEBEB";
			
	}

	Tree.prototype.toggle = toggleNodeOfTree;
	Tree.prototype.expandAll = expandAllNodesInTree;
	Tree.prototype.collapseAll = collapseAllNodesInTree;
	Tree.prototype.isLeaf = isLeafInTree;
	Tree.prototype.find = markFirstOccurenceInTree;
	Tree.prototype.findNext = markNextOccurenceInTree;
	//Tree.prototype.findAll = markAllOccurrences;
	Tree.prototype.expandStackNodes=expandStackNodes;
	Tree.prototype.markStackNodes=markStackNodes;
	Tree.prototype.reset=resetTreeState;
	Tree.prototype.getExpandStackForNode=getExpandStackForNode;
	//Tree.prototype.expandAllByTree=expandAllNodes;
