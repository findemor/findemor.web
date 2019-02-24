/**********************************/
/* Findemor.es website javascript */
/* 2013                           */
/* requisites */
// jquery-1.9.1.min.js
// parallax: jquery.parallax-1.1.3.js, jquery.localscroll-1.2.7-min.js, jquery.scrollTo-1.4.2-min.js
/**********************************/


var isHandheld = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
var isIOS = ( /iPhone|iPad|iPod/i.test(navigator.userAgent) );

/* parallax */

function setUpParallax(isHandheld)
{
	try
	{
	$('#nav').localScroll(800);
	
	if (!isHandheld)
	{
		$('.bg1').parallax("0%", 0.3);
		$('.bg2').parallax("100%", 0.4);
		$('.bg3').parallax("100%", 0.8);
		$('.bg4').parallax("0%", 0.6);
		$('.bg-space-dup').parallax("0%", 1.5);
		$('.bg-space-ddo').parallax("0%", -0.8);
		/*$('.bg-skills-model').parallax("100%", 1);*/
	}
	}catch(err)
	{
		console.log('setUpParallax '+ err);
	}
}

/* snake */
var snake_width = 20;
var snake_timeout = 100;
snakes = [];
			
function setUpSnake(isHandheld)
{
	try{
		if (!isHandheld)
		{
			snakes.push(new Snake({width:snake_width, timeout:snake_timeout}));
		}
	}catch(err)
	{
		console.log('setUpSnake '+ err);
	}	
}

/* flipbook */

function setUpMagazine()
{
	try
	{
	$('#magazine').turn({gradients: true, acceleration: true});
	}catch(err)
	{
		console.log('setUpMagazine '+ err);
	}
}


/* typewriter */

function setUpTypewriter()
{
	try
	{
		animateTypewriter();
	}catch(err)
	{
		console.log('setUpTypewriter '+ err);
	}
}

function animateTypewriter()
{
	$('#typewriter').vintageTxt({
		text: [
			'android:id="@+id/header"',
			'layout_width="fill_parent"',
			'layout_height="wrap_content"',
			'layout_alignParentTop="true"',
			'scaleType="centerInside"',
			'paddingLeft="10dp"',
			'paddingRight="10dp"',
			'src="@drawable/titulo"',
		],
		textSpeed: 150,
		linePause: 500,
		promptEnabled: false,
		onFinishedTyping: function() {
			animateTypewriter();
		}
	});
}

/* fancybox */

var dw_currentOutImg = 1;
var dw_maxImages = 4;

function setUpFancyboxRoller()
{
	try
	{
	$("a#fancydraw").fancybox();
	dw_startdrawanim();
	
	}catch(err)
	{
		console.log('setUpFancybox '+ err);
	}
}

function dw_startdrawanim()
{
	setTimeout(dw_nextswap,4000); //delay change
}

function dw_nextswap()
{
	if (dw_currentOutImg > dw_maxImages) 
		dw_currentOutImg = 1;
	var nextInImg = dw_currentOutImg + 1;
	if (nextInImg > dw_maxImages)
		nextInImg = 1;

	dw_swapimages('#draw' + dw_currentOutImg,500, '#draw' + nextInImg, 500);
	
	dw_currentOutImg = dw_currentOutImg + 1;
	
	dw_startdrawanim();
}

function dw_swapimages(imgout, timeout, imgin, timein)
{
	$(imgin).fadeIn(timein, function() {   });//.animate({opacity: 1}, timein);
	$(imgout).fadeOut(timeout, function() {   });//.delay(delayout).animate({opacity: 0}, timeout);
}

/* clock */
// http://cssdeck.com/labs/udwry5aggb
// Ram of the Dribbble shot Flat Toggle Switch by Dmitri Litvinov.
// Here is the original: http://dribbble.com/shots/1015985-Clock.

try
{
	var oClockAnalog = {
		aSecond:         [],
		dtDate:          new Date(),
		iCurrSecond:     -1,
		iHourRotation:   -1,
		iMinuteRotation: -1,
		iStepSize:       10,
		iTimerAnimate:   setInterval("oClockAnalog.fAnimate()", !isHandheld ? 100 : 5000),
		iTimerUpdate:    setInterval("oClockAnalog.fUpdate()", !isHandheld ? 1000 : 1000),

		fAnimate:       function() {
			if (this.aSecond.length > 0) {
				this.fRotate("analogsecond", this.aSecond[0]);
				this.aSecond = this.aSecond.slice(1);
			}
		},
		fGetHour:     function() {
			var iHours = this.dtDate.getHours();
			if (iHours > 11) {
				iHours -= 12;
			}
			return Math.round((this.dtDate.getHours() * 30) + (this.dtDate.getMinutes() / 2) + (this.dtDate.getSeconds() / 120));
		},
		fGetMinute:     function() {
			return Math.round((this.dtDate.getMinutes() * 6) + (this.dtDate.getSeconds() / 10));
		},
		fInit:          function() {
			this.iHourRotation = this.fGetHour();
			this.fRotate("analoghour", this.iHourRotation);

			this.iMinuteRotation = this.fGetMinute();
			this.fRotate("analogminute", this.iMinuteRotation);

			this.iCurrSecond = this.dtDate.getSeconds();
			this.fRotate("analogsecond", (6 * this.iCurrSecond));
		},
		fRotate:        function(sID, iDeg) {
			var sCSS = ("rotate(" + iDeg + "deg)");
			$("#" + sID).css({ '-moz-transform': sCSS, '-o-transform': sCSS, '-webkit-transform': sCSS });
		},
		fStepSize:     function(iTo, iFrom) {
			var iAnimDiff = (iFrom - iTo);
			if (iAnimDiff > 0) {
				iAnimDiff -= 360;
			}
			return iAnimDiff / this.iStepSize;
		},
		fUpdate:        function() {
			// update time
			this.dtDate = new Date();

			// hours
			var iTemp = this.fGetHour();
			if (this.iHourRotation != iTemp) {
				this.iHourRotation = iTemp;
				this.fRotate("analoghour", iTemp);
			}

			// minutes
			iTemp = this.fGetMinute();
			if (this.iMinuteRotation != iTemp) {
				this.iMinuteRotation = iTemp;
				this.fRotate("analogminute", iTemp);
			}

			// seconds
			if (this.iCurrSecond != this.dtDate.getSeconds()) {
				var iRotateFrom = (6 * this.iCurrSecond);
				this.iCurrSecond = this.dtDate.getSeconds();
				var iRotateTo = (6 * this.iCurrSecond);

				// push steps into array
				var iDiff = this.fStepSize(iRotateTo, iRotateFrom);
				for (var i = 0; i < this.iStepSize; i++) {
					iRotateFrom -= iDiff;
					this.aSecond.push(Math.round(iRotateFrom));
				}
			}
		}
	};
	
	//oClockAnalog.fInit();
	

	}catch(err)
	{
		console.log('clock '+ err);
	}

/* orbital planets */
// by findemor

var orbital_refreshrate = 50;
	var orbital_angles = new Array();
	var orbital_separation = 40;
	var orbital_factor = 1;
	
	function orbitallinks() {
		//console.log(orbital_angles[0]);
		orbital_angles[0] = orbitalsingleplanet('#planetem', '#planetnw', orbital_separation * 3.9, 5*orbital_factor, orbital_angles[0], 180, '#orbitnw');
		orbital_angles[1] = orbitalsingleplanet('#planetem', '#planettb', orbital_separation * 1.4, 18*orbital_factor, orbital_angles[1], 0);
		orbital_angles[2] = orbitalsingleplanet('#planetem', '#planetwp', orbital_separation * 3.9, 5*orbital_factor, orbital_angles[2], 0, '#orbitwp');
		
		orbital_angles[3] = orbitalsingleplanet('#planetnw', '#planetfb', orbital_separation * 0.9, 20*orbital_factor, orbital_angles[3], 180);
		orbital_angles[4] = orbitalsingleplanet('#planetnw', '#planettw', orbital_separation * 1.8, 10*orbital_factor, orbital_angles[4], 30);
		orbital_angles[5] = orbitalsingleplanet('#planetnw', '#planetln', orbital_separation * 1.8, 10*orbital_factor, orbital_angles[5], 150);
		orbital_angles[6] = orbitalsingleplanet('#planetnw', '#planetgo', orbital_separation * 1.8, 10*orbital_factor, orbital_angles[6], 270);
		
		orbital_angles[7] = orbitalsingleplanet('#planetwp', '#planeteq', orbital_separation * 0.9, 30*orbital_factor, orbital_angles[7], 0);
		orbital_angles[8] = orbitalsingleplanet('#planetwp', '#planetpe', orbital_separation * 1.8, 13*orbital_factor, orbital_angles[8], 50);
		
	}
	
	function orbitalsingleplanet(sun, planet, distance, speed, angle, initangle, orbitbkg)
	{
		if (angle === undefined) angle = initangle;//Math.random()*361;
    	var o = $(sun);
    	var p = $(planet);
    	
    	var oposx = o.offset().left - o.parent().offset().left + o.width()/2;
    	var oposy = o.offset().top - o.parent().offset().top + o.height()/2;
    	
    	var tl = oposy + (distance * Math.sin(angle * Math.PI/180.0));
    	var ll = oposx + (distance * Math.cos(angle * Math.PI/180.0));
    	
    	var t = tl - p.width()/2;
    	var l = ll - p.height()/2;
    
    	p.css({
    	    top: t,
    	    left: l
    	});
    	
    	if (orbitbkg !== undefined)
    	{
    		var b = $(orbitbkg);
    		var bt = tl - b.width()/2;
    		var bl = ll - b.height()/2;
    		b.css({
    	    	top: bt,
    	    	left: bl
    		});
    	}
    	
    	return angle + (speed * (orbital_refreshrate/1000)) % 360;
	}
	
function setUpOrbital(isHandheld)
{
	try{
		if (isHandheld)
		{
			orbitallinks();
		}else
		{
			setInterval(orbitallinks, orbital_refreshrate);
		}
	}catch(err)
	{
		console.log('setUpOrbital '+ err);
	}
}


/* tetris */
// by findemor

try{
	var ttwidth = 40;
	var ttheight = 40;
	var ttborder = 1;
	
	var ttlastblockid = '';
	
	jQuery.fn.justtext = function() {
    	return $(this).clone().children().remove().end().text();
	};
	
	
	/**
	container: tetris screen
	col: position on x
	row: position on y (starting at 0)
	subblocks: multi-dimensional array
	*/
	function ttdrawblock (container, ttbl, col, row, subblocks, text)
	{
		var height = subblocks.length;
		var width = subblocks[0].length;
		//var ttbl = $('<div class="ttbl" style="left: '+(col * ttwidth)+'px; bottom: '+((row - height + 1) * ttheight)+'px; width: '+(ttwidth * width)+'px; height: '+(ttheight * height)+'px"></div>');
		
		ttbl.addClass('ttbl');
		ttbl.css('left',(col * ttwidth)+'px');
		ttbl.css('bottom',((row - height + 1) * ttheight)+'px');
		ttbl.css('width',(ttwidth * width)+'px');
		ttbl.css('height',(ttheight * height)+'px');
		
		
		var auxbordertop = 0;
		var auxborderright = 0;
		var auxborderbottom = 0;
		var auxborderleft = 0;
		
		var id = 'tt-x-y';
		
		var yminb = -1; // min y with max number of filled subblocks
		var ymaxb = -1; //max y with max number of filled subblocks
		var alteryminb = -1;
		var alterwidth = -1;
		var xmb = 0; //number of horizontal items in ymb
		
		var idcolx = 0;
		var idrowy = 0;
		
		
		for (y = 0; y < height ; ++y) {
			xmb = 0;
			for (x = 0; x < width ; ++x) {
				auxbordertop = y > 0 ? ( subblocks[y - 1][x] ? 0 : ttborder ) : ttborder;
				auxborderright = x < width - 1 ? ( subblocks[y][x + 1] ? 0 : ttborder ) : ttborder;
				auxborderbottom = y < height - 1 ? ( subblocks[y + 1][x] ? 0 : ttborder ) : ttborder;
				auxborderleft = x > 0 ? ( subblocks[y][x - 1] ? 0 : ttborder ) : ttborder;
				
				id = 'tt-' + (Number(col) + Number(x)) + '-' + (Number(row) - Number(y));
				
				if (subblocks[y][x]) ttdrawsubblock(ttbl, x , y, [auxbordertop,auxborderright,auxborderbottom,auxborderleft], id);
				
				xmb += subblocks[y][x]; //sum row blocks
			}
			
			//text position logic
			if (xmb == width)
			{
				if (yminb < 0) yminb = y;
				ymaxb = y;
			}
			if (xmb > alterwidth && subblocks[y][0])
			{
				alterwidth = xmb;
				alteryminb = y;
			}
			
		}
		
		if (yminb > -1)
		{
			ttdrawtext(ttbl, 0, yminb, width, (ymaxb - yminb) + 1, text);
		}else
		{
			ttdrawtext(ttbl, 0, alteryminb, alterwidth, 1, text);
		}
		
		$(container).append( ttbl );
	}
	
	
	/***
	block: parent block
	x: width position 0..n
	y: height position: 0..n
	borderspx: top-right-bottom-left borders size in px
	*/
	function ttdrawsubblock(block, x, y, borderspx, id)
	{
		var ttsbl = $('<div id="'+id+'" class="ttsbl"></div>');
		ttsbl.css('top',y * ttheight+'px');
		ttsbl.css('left',x * ttwidth+'px');
		ttsbl.css('width',ttwidth - borderspx[1] - borderspx[3] + 'px');
		ttsbl.css('height',ttheight - borderspx[0] - borderspx[2] + 'px');

		ttsbl.css('border-width', borderspx[0] + 'px ' + borderspx[1] + 'px ' + borderspx[2] + 'px ' + borderspx[3] + 'px');

		block.append(ttsbl);
	}
	
	/***
	block: parent block
	x: start x position 0..n
	y: start y position: 0..n
	w: width cells
	h: height cells
	text: text to write
	*/
	function ttdrawtext(block, x, y, w, h, text)
	{
		var tttxt = $('<div class="tttx">'+text+'</div>');
		tttxt.css('top',y * ttheight+'px');
		tttxt.css('left',x * ttwidth+'px');
		tttxt.css('width',ttwidth * w + 'px');
		tttxt.css('height',ttheight * h + 'px');
		tttxt.css('line-height', ttheight + 'px');
		
		if (h > 1)
		{
			tttxt.css('padding-top', (h * ttheight - ttheight) / 2 + 'px');
		}

		block.append(tttxt);
	}
	
	function gettetrissubblocks(type)
	{
		switch(type)
		{
			case "t": return [ [1,1,1],[0,1,0] ]; break;
			case "t90": return [ [0,1],[1,1],[0,1] ]; break;
			case "t180": return [ [0,1,0],[1,1,1] ]; break;
			case "t270": return [ [1,0],[1,1],[1,0] ]; break;
			case "c": return [ [1,1],[1,1] ]; break;
			case "l": return [ [1,0],[1,0],[1,1] ]; break;
			case "l90": return [ [0,0,1],[1,1,1] ]; break;
			case "l180": return [ [1,1],[0,1],[0,1] ]; break;
			case "l270": return [ [1,1,1],[1,0,0] ]; break;
			case "j": return [ [0,1],[0,1],[1,1] ]; break;
			case "j90": return [ [1,1,1],[0,0,1] ]; break;
			case "j180": return [ [1,1],[1,0],[1,0] ]; break;
			case "j270": return [ [1,0,0],[1,1,1] ]; break;
			case "i": return [ [1],[1],[1],[1] ]; break;
			case "i90": return [ [1,1,1,1] ]; break;
			case "s": return [ [0,1,1],[1,1,0] ]; break;
			case "s90": return [ [1,0],[1,1],[0,1] ]; break;
			case "z": return [ [1,1,0],[0,1,1] ]; break;
			case "z90": return [ [0,1],[1,1],[1,0] ]; break;
		}
	}
		
	
	function drawtetris(tetris)
	{
		tetris.children().each(function(i){
 			var col = $(this).attr("col");
 			var row = $(this).attr("row");
 			var blocktype = $(this).attr("bt");
 			var title = $(this).attr("ttitle");
 			
 			ttdrawblock ( tetris, $(this), col, row, gettetrissubblocks(blocktype), title);
		});
	}
	
   	
   	function ttleavelastblock(subblockid)
   	{
   		if (subblockid != ttlastblockid)
   		{
   			var desc = $('#tetrisdesc');
    		desc.css('display', 'none');
   		
   			var leaveblock = $(ttlastblockid);
   			if (leaveblock.length > 0) 
   			{
   				leaveblock.parent().removeClass('hover');
   			}
   			ttlastblockid = subblockid;
   		}
   	}
   	
   	function ttenternewblock(subblockid, relX, relY)
   	{
   		//enter new block
   		var block = $(subblockid).parent();
    	var desc = $('#tetrisdesc');
    	if (block.length > 0)
    	{
   			block.addClass('hover');
    		desc.text(block.justtext());
    		desc.css('top',relY + 50);
    		desc.css('left',relX + 70);	
    		desc.css('display', 'block');
    	}else
    	{
    		desc.css('display', 'none');
    	}
   	}

}catch(err)
{ console.log(err); }

function setUpTetris(isHandheld)
{
	try
	{
	var tetris = $("#tetris");
	
	if (!isHandheld)
	{
		tetris.mouseleave(function(){
			ttleavelastblock('');
		});

		tetris.mousemove(function(e){
			var parentOffset = $(this).offset(); 
			var relX = e.pageX - parentOffset.left;
			var relY = e.pageY - parentOffset.top;
			
			//what subblock is hover
			var subblockid = '#tt-'+ Math.floor(relX / ttwidth) + '-' + Math.floor($(this).height() /ttheight - relY / ttheight);
			
			//leave last block
			ttleavelastblock(subblockid);
			ttenternewblock(subblockid, relX, relY);
		});
	}
	
	drawtetris(tetris);
	
	}catch(err)
	{
		console.log('setUpTetris '+ err);
	}
}


/* flash detection */

function isFlashAvailable()
{
	var hasFlash = false;
	try {
	  var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	  if(fo) hasFlash = true;
	}catch(e){
	  if(navigator.mimeTypes ["application/x-shockwave-flash"] != undefined) hasFlash = true;
	}
	return hasFlash;
}

/* alter function */

function setUpAlternativeView(isHandheld)
{
	try {
	
		if (isHandheld)
		{
			//remove incompatible items
			$('#demo-magazine,#demo-music,#demo-play,#demo-develop').children().remove();
			//add backgrounds
			$('#demo-magazine').addClass('alter-magazine');
			$('#demo-develop').addClass('alter-develop');
			$('#demo-music').addClass('alter-music');
			$('#demo-play').addClass('alter-play');
			
		}else
		{			
			var hasFlash = isFlashAvailable();
			if (!hasFlash)
			{
				$('#demo-music').children().remove();
				$('#demo-music').addClass('alter-music');
			}
		}
	
	}catch(err)
	{
		console.log('problem setting up alternative view ' + err);
	}
}


/* document ready */

$(document).ready(function(){

	
	var isIE = $("html").hasClass("isie");
	if (isIOS) $("html").addClass("isios");

	$("body").queryLoader2({
        barColor: "#fe8445",
        backgroundColor: "#da2009",
        percentage: true,
        barHeight: 4,
        completeAnimation: "grow"
    });

	//console.log(4);
	setUpParallax(isHandheld);
	setUpSnake(isHandheld);
	setUpMagazine();
	setUpTypewriter();
	setUpFancyboxRoller();
	setUpOrbital(isHandheld || isIE);
	setUpTetris(isHandheld);
	
	setUpAlternativeView(isHandheld || isIE)
});

try 
{
	window.addEventListener('DOMContentLoaded', function() {
		$("body").queryLoader2({
			barColor: "#fe8445",
			backgroundColor: "#da2009",
			percentage: true,
			barHeight: 4,
			completeAnimation: "grow"
		});
	});
}catch(err)
{}