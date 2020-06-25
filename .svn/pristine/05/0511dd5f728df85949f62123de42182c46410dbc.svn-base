/************************************************************************************************************
Image Slideshow
Copyright (C) February 2005  DTHMLGoodies.com, Alf Magne Kalleland

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA

Dhtmlgoodies.com., hereby disclaims all copyright interest in this script
written by Alf Magne Kalleland.

Alf Magne Kalleland, 2005
Owner of DHTMLgoodies.com

************************************************************************************************************/


	var displayWaitMessage=true;	// Display a please wait message while images are loading?


	var activeImage = false;
	var imageGalleryLeftPos = false;
	var imageGalleryWidth = false;
	var imageGalleryObj = false;
	var maxGalleryXPos = false;
	var slideSpeed = 0;
	var imageGalleryCaptions = new Array();
	function startSlide(e)
	{
		if(document.all)e = event;
		var id = this.id;
		
		if(this.id=='arrow_right'){
			slideSpeedMultiply = Math.floor((e.clientX - this.offsetLeft) / 5);
			slideSpeed = -1*slideSpeedMultiply;
			slideSpeed = Math.max(-10,slideSpeed);
		}else{
			slideSpeedMultiply = 10 - Math.floor((e.clientX - this.offsetLeft) / 5);
			slideSpeed = 1*slideSpeedMultiply;
			slideSpeed = Math.min(10,slideSpeed);
			if(slideSpeed<0)slideSpeed=10;
		}
	}

	function releaseSlide()
	{
		var id = this.id;
		
		slideSpeed=0;
	}

	function gallerySlide()
	{
		if(slideSpeed!=0){
			var leftPos = imageGalleryObj.offsetLeft;
			leftPos = leftPos/1 + slideSpeed;
			if(leftPos>maxGalleryXPos){
				leftPos = maxGalleryXPos;
				slideSpeed = 0;

			}
			if(leftPos<minGalleryXPos){
				leftPos = minGalleryXPos;
				slideSpeed=0;
			}

			imageGalleryObj.style.left = leftPos + 'px';
		}
		setTimeout('gallerySlide()',20);

	}

	

	function initSlideShow()
	{
		document.getElementById('arrow_left').onmousemove = startSlide;
		document.getElementById('arrow_left').onmouseout = releaseSlide;
		document.getElementById('arrow_right').onmousemove = startSlide;
		document.getElementById('arrow_right').onmouseout = releaseSlide;




		imageGalleryObj = document.getElementById('menuStrip');
		imageGalleryLeftPos = imageGalleryObj.offsetLeft;
		var galleryContainer = document.getElementById('menuContainer');
		imageGalleryWidth = galleryContainer.offsetWidth - 80;
		maxGalleryXPos = imageGalleryObj.offsetLeft;
		minGalleryXPos = imageGalleryWidth - document.getElementById('slideEnd').offsetLeft;
		
		if (navigator.userAgent.indexOf('MSIE') >= 0) {
			var arrowWidth = document.getElementById('arrow_left').offsetWidth;
			var el = document.createElement('div');
			el.style.position = 'absolute';
			el.style.left = arrowWidth + 'px';
			el.style.width = (galleryContainer.offsetWidth - arrowWidth * 2) + 'px';
			el.style.overflow = 'hidden';
			el.style.height = '100%';

			document.getElementById('menuContainer').appendChild(el);
			el.appendChild(document.getElementById('smoothmenu'));
		}
		
		gallerySlide();
	}

	
	
	window.onload = initSlideShow;