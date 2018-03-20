$(document).ready(function(){

	(function(){
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		window.requestAnimationFrame = requestAnimationFrame;
	})();

	//Terminal Header variables
	var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var date = new Date();
	var day = date.getDate();
	var dayName = date.getDay();
	var month = date.getMonth();
	var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	var terminalTimestamp = 'Last login: ' + days[dayName-1] + ' ' + months[month] +  ' ' + day + ' ' + time + ' on ttys000';

	//Website flow control
	var inIntro = false;
	var start = false;
	var room = 0;
	var context;
    var keys = [];
    var mouseX = 0;
    var mouseY = 0;

	//Window constraints control
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	$(window).resize(function(){
		windowWidth = $(window).width();
		windowHeight = $(window).height();
		$('#canvas').attr('height', windowHeight*2.3);
		$('#canvas').attr('width', windowWidth+8);
		AdventureDoor.x = windowWidth/2.2;
		ResumeDoor.x = windowWidth - 160;
		context = document.getElementById('canvas').getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		if(room == 0){
			drawDoor(AboutDoor, AboutDoor.counter);
			drawDoor(AdventureDoor, AdventureDoor.counter);
			drawDoor(ResumeDoor, ResumeDoor.counter);
		}
		else if(room == 2){
			drawAdventure();
		}
		context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);

	});

	//SPRITES
	var Noah = {
		name: "Noah",
		sprites: [[],[],[],[]],
		walkCounter: 5,
		x: -900,
		y: windowHeight/3,
		velocityX: 0,
		velocityY: 0,
		friction: 0.9,
		speed: 10,
		moving: false
	};

	//Noah sprite images
	var noahImages = ["img/sprites/Noah.png", "img/sprites/NoahRightFoot.png", "img/sprites/NoahLeftFoot.png",
		"img/sprites/NoahRight.png", "img/sprites/NoahRightRightFoot.png", "img/sprites/NoahRightLeftFoot.png",
		"img/sprites/NoahLeft.png", "img/sprites/NoahLeftRightFoot.png", "img/sprites/NoahLeftLeftFoot.png",
		"img/sprites/NoahBack.png", "img/sprites/NoahBackRightFoot.png", "img/sprites/NoahBackLeftFoot.png"];

	function loadNoahSprites(){
		var row = 0;
		for(var i = 0; i < noahImages.length; i++) {
			var img = new Image();
			img.src = noahImages[i];
			if(i != 0 && i%3 == 0){
				row++;
			}
			Noah.sprites[row].push(img);
		}
	}

	//'About' door
	var AboutDoor = {
		name: "aboutDoor",
		function: "About me",
		sprites: [],
		x: 88,
		y: 50,
		counter: 0
	};

	//'Adventure' door
	var AdventureDoor = {
		name: "AdventureDoor",
		function: "Adventure",
		sprites: [],
		x: windowWidth/2.19,
		y: 50,
		counter: 0
	};

	//'Resume' door
	var ResumeDoor = {
		name: "ResumeDoor",
		function: "Resume",
		sprites: [],
		x: windowWidth - 150,
		y: 50,
		counter: 0
	};

	//Door images
	var doorImages = ["img/sprites/DoorClosed.png", "img/sprites/DoorOpen1.png", "img/sprites/DoorOpen2.png", "img/sprites/DoorOpen.png"];
	for(var i = 0; i < doorImages.length; i++) {
		var img = new Image();
		img.src = doorImages[i];
		AboutDoor.sprites.push(img);
	}
	for(var i = 0; i < doorImages.length; i++) {
		var img = new Image();
		img.src = doorImages[i];
		AdventureDoor.sprites.push(img);
	}
	for(var i = 0; i < doorImages.length; i++) {
		var img = new Image();
		img.src = doorImages[i];
		ResumeDoor.sprites.push(img);
	}

	//Adventure Big Platform
	var BigPlatform = {
		name: "BigPlatform",
		function: "Platform",
		sprite: null,
		x: 434,
		y: 90
	};

	var InBridge = {
		name: "InBridge",
		function: "InBridge",
		sprite: null,
		x: 647,
		y: 603
	};

	var RightBridge = {
		name: "RightBridge",
		function: "RightBridge",
		sprite: null,
		x: -134,
		y: 300
	};

	var LeftBridge = {
		name: "LeftBridge",
		function: "LeftBridge",
		sprite: null,
		x: 946,
		y: 300
	};

	var img = new Image();
	img.src = "img/sprites/BigPlatform.png";
	BigPlatform.sprite = img;

	var otherImg = new Image();
	otherImg.src = "img/sprites/InBridge.png";
	InBridge.sprite = otherImg;

	var thirdImg = new Image();
	thirdImg.src = "img/sprites/SideBridge.png";
	RightBridge.sprite = thirdImg;
	LeftBridge.sprite = thirdImg;

	function drawDoor(door, counter){
		context.drawImage(door.sprites[counter], door.x, door.y, door.sprites[0].width/2, door.sprites[0].height/2);
	}

	function drawAdventure(){
		context.drawImage(BigPlatform.sprite, BigPlatform.x, BigPlatform.y, BigPlatform.sprite.width/5, BigPlatform.sprite.height/5);
		context.drawImage(InBridge.sprite, InBridge.x, InBridge.y, InBridge.sprite.width/5, InBridge.sprite.height/5);
		context.drawImage(RightBridge.sprite, RightBridge.x, RightBridge.y, RightBridge.sprite.width/5, RightBridge.sprite.height/5);
		context.drawImage(LeftBridge.sprite, LeftBridge.x, LeftBridge.y, LeftBridge.sprite.width/5, LeftBridge.sprite.height/5);
	}

	function drawNoah(row, col){
		if(start){
			if(room == 0){
				if(Noah.x+58 >= AboutDoor.x && Noah.x <= (AboutDoor.x + AboutDoor.sprites[0].width/2)){
					if(row != 0){
						if(Noah.y > windowHeight/2){
							AboutDoor.counter = 0;
						}
						else if(Noah.y <= windowHeight/2 && Noah.y > windowHeight/2 - windowHeight/6){
							AboutDoor.counter = 1;
						}
						else if(Noah.y <= windowHeight/2-windowHeight/6 && Noah.y > windowHeight/2 - windowHeight/4){
							AboutDoor.counter = 2;
						}
						else{
							AboutDoor.counter = 3;
							if(Noah.y <= 70){
								room = 1;
								Noah.y = 550;
								Noah.x = 30;
								$('p.door-title').remove();
								context.clearRect(0, 0, canvas.width, canvas.height);
											$('body').append('<img id="big-picture" src=img/pictures/self.jpg>');
											$('body').prepend('<div id="about-me"><p>Hi, my name is Noah and I live inside my computer.<br><br>\
												Pursuing my bachelor\'s degree in Computer Science at Boston University.<br><br>\
												Graduating class of 2020!<br><br>\
												My passion is Cyber Security.<br><br>\
												But I love cool data structures and Algorithms.<br><br>\
												Favorite data strucutre: <a href="https://en.wikipedia.org/wiki/Fibonacci_heap" style="color: #FF9191;" target="_blank">Fibonacci Heap.</a><br><br>\
												Favorite algorithm: <a href="https://en.wikipedia.org/wiki/Karatsuba_algorithm" style="color: #FF9191;" target="_blank">Karatsuba Multiplication.</a><br><br>\
												I\'m from Denver, but I live in Boston.<br><br>\
												Hobbies include writing, boxing, and making bad jokes.<br><br>\
												Currently looking for summer employment.<br><br>\
												I can be reached at nnaiman@bu.edu<br><br>\
												<a style="color: #2ad7f9;">\"You\'re only given a little spark of madness. You mustn\'t lose it.\"<br><br>\
												&nbsp;&nbsp;&nbsp;-Robin Williams</a></p></div>');
											$('body').append('<p class="exit-sign">Exit</p>');
								context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
							}
						}
					}
					else{
						AboutDoor.counter = 0;
					}
				}
				else if(Noah.x+58 >= AdventureDoor.x && Noah.x <= (AdventureDoor.x + AdventureDoor.sprites[0].width/2)){
					if(row != 0){
						if(Noah.y > windowHeight/2){
							AdventureDoor.counter = 0;
						}
						else if(Noah.y <= windowHeight/2 && Noah.y > windowHeight/2 - windowHeight/6){
							AdventureDoor.counter = 1;
						}
						else if(Noah.y <= windowHeight/2-windowHeight/6 && Noah.y > windowHeight/2 - windowHeight/4){
							AdventureDoor.counter = 2;
						}
						else{
							AdventureDoor.counter = 3;
							if(Noah.y <= 70){
								room = 2;
								Noah.y = 685;
								$('p.door-title').remove();
								if(document.getElementById('water-background') == null){
									$('body').prepend('<video autoplay muted loop id="water-background"><source src="img/video/water.mp4" type="video/mp4"></video>');
								}
								else{
									$('#water-background').css('visibility', 'visible');
								}
								context.clearRect(0, 0, canvas.width, canvas.height);
								drawAdventure();
								context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
							}
						}
					}
					else{
						AdventureDoor.counter = 0;
					}
				}
				else if(Noah.x+58 >= ResumeDoor.x && Noah.x <= (ResumeDoor.x + ResumeDoor.sprites[0].width/2)){
					if(row != 0){
						if(Noah.y > windowHeight/2){
							ResumeDoor.counter = 0;
						}
						else if(Noah.y <= windowHeight/2 && Noah.y > windowHeight/2 - windowHeight/6){
							ResumeDoor.counter = 1;
						}
						else if(Noah.y <= windowHeight/2-windowHeight/6 && Noah.y > windowHeight/2 - windowHeight/4){
							ResumeDoor.counter = 2;
						}
						else{
							ResumeDoor.counter = 3;
							if(Noah.y <= 70){
								$('body').css('overflow-y', 'scroll');
								room = 3;
								Noah.y = 420;
								Noah.x = 30;
								$('p.door-title').remove();
								context.clearRect(0, 0, canvas.width, canvas.height);
								$('body').css("background-color", "white");
								$('body').append('<section id="resume"></section>');
								$('#resume').load('html/resume.html');
								context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
							}
						}
					}
					else{
						ResumeDoor.counter = 0;
					}
				}
				else{
					AboutDoor.counter = 0;
					AdventureDoor.counter = 0;
					ResumeDoor.counter = 0;
				}
				if(room == 0){
					drawDoor(AboutDoor, AboutDoor.counter);
					drawDoor(AdventureDoor, AdventureDoor.counter);
					drawDoor(ResumeDoor, ResumeDoor.counter);
				}
			}
			else if(room == 1){
				if(Noah.x >= 0 && Noah.x <= 120 && Noah.y >= windowHeight*0.82){
					$('#big-picture').remove();
					$('#about-me').remove();
					$('.exit-sign').remove();
					context.clearRect(0, 0, canvas.width, canvas.height);
					Noah.y = 75;
					Noah.x = AboutDoor.x + 15;
					drawDoor(AboutDoor, AboutDoor.counter);
					drawDoor(AdventureDoor, AdventureDoor.counter);
					drawDoor(ResumeDoor, ResumeDoor.counter);
					$('body').prepend('<p class="door-title" style="right: 4%;">Resume</p>');
					$('body').prepend('<p class="door-title" style="left: 44%;">Adventure</p>');
					$('body').prepend('<p class="door-title" style="left: 6%;">About</p>');
					context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
					room = 0;
				}
			}
			else if(room == 2){
				if(Noah.y > 730){
					$('#water-background').css('visibility', 'hidden');
					context.clearRect(0, 0, canvas.width, canvas.height);
					Noah.y = 100;
					drawDoor(AboutDoor, AboutDoor.counter);
					drawDoor(AdventureDoor, AdventureDoor.counter);
					drawDoor(ResumeDoor, ResumeDoor.counter);
					$('body').prepend('<p class="door-title" style="right: 4%;">Resume</p>');
					$('body').prepend('<p class="door-title" style="left: 44%;">Adventure</p>');
					$('body').prepend('<p class="door-title" style="left: 6%;">About</p>');
					context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
					room = 0;
				}
				else{
					drawAdventure();
				}
			}
			else if(room == 3){
				if(Noah.x >= 0 && Noah.x <= 120 && Noah.y >= windowHeight*2.3*0.922){
					$('body').css('overflow-y', 'hidden');
					$('#resume').remove();
					$('body').css('background-color', '#000000');
					context.clearRect(0, 0, canvas.width, canvas.height);
					Noah.y = 75;
					Noah.x = ResumeDoor.x + 15;
					drawDoor(AboutDoor, AboutDoor.counter);
					drawDoor(AdventureDoor, AdventureDoor.counter);
					drawDoor(ResumeDoor, ResumeDoor.counter);
					$('body').prepend('<p class="door-title" style="right: 4%;">Resume</p>');
					$('body').prepend('<p class="door-title" style="left: 44%;">Adventure</p>');
					$('body').prepend('<p class="door-title" style="left: 6%;">About</p>');
					context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
					room = 0;
					$(window).scrollTop(0);
				}
			}
		}
		if(room != 2){
			if(Noah.x > windowWidth){
				Noah.x = -30;
			}
			else if(start && Noah.x < -50){
				Noah.x = windowWidth;
			}
			if(Noah.y > windowHeight+40 && room != 3){
				Noah.y = -60;
			}
			else if(Noah.y < $(window).scrollTop()-60 && room == 3){
				Noah.y = $(window).scrollTop() + $(window).height();
			}
			else if(Noah.y > $(window).scrollTop() + $(window).height() -105 && room == 3){
				Noah.y = $(window).scrollTop() + $(window).height() - 105;
			}
			else if(Noah.y < -60 && room !=3){
				Noah.y = windowHeight+40;
			}
		}
		else{
			if(Noah.y <= BigPlatform.y - 50 && Noah.x >= BigPlatform.x && Noah.x <= (BigPlatform.x+BigPlatform.sprite.width/5)){
				Noah.y = BigPlatform.y - 50;
			}
			else if(Noah.y+(Noah.sprites[0][0].height/1.3) >= InBridge.y){
				if(Noah.x <= InBridge.x+1){
					Noah.x = InBridge.x+1;
					// && (Noah.x >= BigPlatform.x+(BigPlatform.sprite.width/5)/3)
				}
				else if((Noah.x+Noah.sprites[0][0].width/1.3) >= (InBridge.x+InBridge.sprite.width/5)){
					Noah.x = (InBridge.x+InBridge.sprite.width/5 -1)-Noah.sprites[0][0].width/1.3;
				}
			}
			else if(Noah.x+Noah.sprites[0][0].width/1.3 <= InBridge.x || Noah.x >= (InBridge.x+InBridge.sprite.width/5)){
				if(Noah.y > BigPlatform.y+BigPlatform.sprite.height/5 - 125){
					Noah.y = (BigPlatform.y+BigPlatform.sprite.height/5 - 125);
				}
			}
		}
		context.drawImage(Noah.sprites[row][col], Noah.x, Noah.y, Noah.sprites[row][col].width/1.3, Noah.sprites[row][col].height/1.3);
	}

	if(!start && !inIntro){
		$('#terminal-timestamp').text(terminalTimestamp);

		$('.terminal-typing').typeIt({
			strings:['./meet_Noah_Naiman'],
			startDelay:700,
			speed:110,
			lifeLike:true,
			callback: function(){
			    setTimeout(function(){
			    	if(!start && !inIntro){
			    		$('body').append('<div id="jumbotron"><section id="big-name"><h1>Noah Naiman</h1><h2>THIS SITE, IT\'S PERSONAL</h2><br><br><br><br><br><br><br><h3>Hit Enter</h3></section></div>');
			    		$('#jumbotron').css('visibility', 'visible');
			    		$('#jumbotron h3').attr( 'id', 'hit-enter' );
			    	}
			    }, 550);
			}
		});
		setInterval(function(){
			$("#hit-enter").fadeToggle(1400);
		}, 1000);
	}

	$(document).keydown(function(e){
		keys = [];
		keys[e.which] = true;
		if(inIntro){
			keys[37] = false;
			keys[38] = false;
			keys[39] = true;
			keys[40] = false;
			if(keys[13]){
				start = true;
				inIntro = false;
				Noah.moving = false;
				Noah.x = windowWidth/2 - 55;
				Noah.velocityY = 0;
				Noah.velocityX = 0;
				keys = [];
				$('#text-box').remove();
				start = true;
				inIntro = false;
				context.clearRect(0, 0, canvas.width, canvas.height);
				drawNoah(0,0);
				drawDoor(AboutDoor, 0);
				drawDoor(AdventureDoor, 0);
				drawDoor(ResumeDoor, 0);
				$('body').prepend('<p class="door-title" style="right: 4.7%;">Resume</p>');
				$('body').prepend('<p class="door-title" style="left: 44%;">Adventure</p>');
				$('body').prepend('<p class="door-title" style="left: 6.2%;">About</p>');
			}
		}
	    if(keys[13] && !start && !inIntro){
	    	$('#terminal-head').remove();
			$('#jumbotron').remove();
			$('body').append('<canvas id="canvas"></canvas>');
			//height="' + windowHeight*2.3 + '" width="' + windowWidth + '"
			$('#canvas').attr('height', windowHeight*2.3);
			$('#canvas').attr('width', windowWidth+8);
			context = document.getElementById('canvas').getContext('2d');
			loadNoahSprites()
			inIntro = true;
	    }
	    if(keys[13] && !start && inIntro){
	    	speak("Ooh a visitor!", 70, 30);
			Noah.moving = true;
			keys[39] = true;
			setTimeout(function(){
				Noah.moving = false;
				keys = [];
				stopNoah(39);
				context.clearRect(0, 0, canvas.width, canvas.height);
				drawNoah(0, 0);
			}, 3000);
			setTimeout(function(){
				if(inIntro){
					speak("Hi, my name is Noah Naiman. Welcome to my personal website, it's great to meet you!", 40, 40);
				}
			}, 3400);
			setTimeout(function(){
				if(inIntro){
					speak("In a second, three doors will appear. Either navigate me to them using the arrow keys, or click on them to enter. To exit any of the rooms just click on or walk me into the EXIT signs. Have fun, and thanks for visiting!", 40, 40);
				}
			}, 8400);
			setTimeout(function(){
				if(inIntro){
					$('#text-box').remove();
					start = true;
					inIntro = false;
					drawDoor(AboutDoor, 0);
					drawDoor(AdventureDoor, 0);
					drawDoor(ResumeDoor, 0);
					$('body').prepend('<p class="door-title" style="right: 4%;">Resume</p>');
					$('body').prepend('<p class="door-title" style="left: 44%;">Adventure</p>');
					$('body').prepend('<p class="door-title" style="left: 6%;">About</p>');
				}
			}, 21000);
	    }
	    else if(start){
	    	if(e.which >= 37 && e.which <= 40){
	    		Noah.moving = true;
	    		if(room == 3){
	    			e.preventDefault();
	    		}
	    	}
	    }
	});

	$(document).keyup(function(e){
		if(start){
			if(e.which >= 37 && e.which <= 40){
				keys[e.which] = false;
				if(!keys[37] && !keys[38] && !keys[39] && !keys[40]){
					stopNoah(e.which);
					Noah.moving = false;
				}
			}
		}
	});

	$(document).mousemove(function(e){
		if(start){
			mouseX = e.pageX;
			mouseY = e.pageY;
			if(room == 0){
				if(mouseX >= AboutDoor.x && mouseX <= (AboutDoor.x + AboutDoor.sprites[0].width/2) && mouseY >= AboutDoor.y && (mouseY <= AboutDoor.y + AboutDoor.sprites[0].height/2)){
					$('body').css( 'cursor', 'pointer' );
					AboutDoor.counter = 3;
					AdventureDoor.counter = 0;
					ResumeDoor.counter = 0;
				}
				else if(mouseX >= AdventureDoor.x && mouseX <= (AdventureDoor.x + AdventureDoor.sprites[0].width/2) && mouseY >= AdventureDoor.y && (mouseY <= AdventureDoor.y + AdventureDoor.sprites[0].height/2)){
					$('body').css( 'cursor', 'pointer' );
					AboutDoor.counter = 0;
					AdventureDoor.counter = 3;
					ResumeDoor.counter = 0;
				}
				else if(mouseX >= ResumeDoor.x && mouseX <= (ResumeDoor.x + ResumeDoor.sprites[0].width/2) && mouseY >= ResumeDoor.y && (mouseY <= ResumeDoor.y + ResumeDoor.sprites[0].height/2)){
					$('body').css( 'cursor', 'pointer' );
					AboutDoor.counter = 0;
					AdventureDoor.counter = 0;
					ResumeDoor.counter = 3;
				}
				else{
					$('body').css( 'cursor', 'default' );
				}
				context.clearRect(0, 0, canvas.width, canvas.height);
				drawDoor(AboutDoor, AboutDoor.counter);
				drawDoor(AdventureDoor, AdventureDoor.counter);
				drawDoor(ResumeDoor, ResumeDoor.counter);
				context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
			}
			if(room != 0){
				if (mouseX >= 11 && mouseX <= 126 && mouseY >= ($(window).scrollTop()+windowHeight-60)){
					$('body').css( 'cursor', 'pointer' );
				}
				else{
					$('body').css( 'cursor', 'default' );
				}
			}
		}
	});

	$(document).mousedown(function(){
		if(start){
			if(room == 0){
				if(mouseX >= AboutDoor.x && mouseX <= (AboutDoor.x + AboutDoor.sprites[0].width/2) && mouseY >= AboutDoor.y && (mouseY <= AboutDoor.y + AboutDoor.sprites[0].height/2)){
					room = 1;
					Noah.y = 550;
					Noah.x = 30;
					$('p.door-title').remove();
					context.clearRect(0, 0, canvas.width, canvas.height);
					$('body').append('<img id="big-picture" src=img/pictures/self.jpg>');
					$('body').prepend('<div id="about-me"><p>Hi, my name is Noah and I live inside my computer.<br><br>\
							Pursuing my bachelor\'s degree in Computer Science at Boston University.<br><br>\
							Graduating class of 2020!<br><br>\
							My passion is Cyber Security.<br><br>\
							But I love cool data structures and Algorithms.<br><br>\
							Favorite data strucutre: <a href="https://en.wikipedia.org/wiki/Fibonacci_heap" style="color: #FF9191;" target="_blank">Fibonacci Heap.</a><br><br>\
							Favorite algorithm: <a href="https://en.wikipedia.org/wiki/Karatsuba_algorithm" style="color: #FF9191;" target="_blank">Karatsuba Multiplication.</a><br><br>\
							I\'m from Denver, but I live in Boston.<br><br>\
							Hobbies include writing, boxing, and making bad jokes.<br><br>\
							Currently looking for summer employment.<br><br>\
							I can be reached at nnaiman@bu.edu<br><br>\
							<a style="color: #2ad7f9;">\"You\'re only given a little spark of madness. You mustn\'t lose it.\"<br><br>\
							&nbsp;&nbsp;&nbsp;-Robin Williams</a></p></div>');
					$('body').append('<p class="exit-sign">Exit</p>');
					context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
				}
				else if(mouseX >= AdventureDoor.x && mouseX <= (AdventureDoor.x + AdventureDoor.sprites[0].width/2) && mouseY >= AdventureDoor.y && (mouseY <= AdventureDoor.y + AdventureDoor.sprites[0].height/2)){
					room = 2;
					Noah.y = 700;
					$('p.door-title').remove();
					$('body').prepend('<video autoplay muted loop id="water-background"><source src="img/video/water.mp4" type="video/mp4"></video>');
					context.clearRect(0, 0, canvas.width, canvas.height);
					drawAdventure();
					context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
				}
				else if(mouseX >= ResumeDoor.x && mouseX <= (ResumeDoor.x + ResumeDoor.sprites[0].width/2) && mouseY >= ResumeDoor.y && (mouseY <= ResumeDoor.y + ResumeDoor.sprites[0].height/2)){
					$('body').css('overflow-y', 'scroll');
					room = 3;
					Noah.y = 420;
					Noah.x = 30;
					$('p.door-title').remove();
					context.clearRect(0, 0, canvas.width, canvas.height);
					$('body').css("background-color", "white");
					$('body').append('<section id="resume"></section>');
					$('#resume').load('html/resume.html');
					context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
				}
			}
			else if(room == 1){
				if(mouseX >= 0 && mouseX <= 120 && mouseY >= 710){
					$('#big-picture').remove();
					$('#about-me').remove();
					$('.exit-sign').remove();
					context.clearRect(0, 0, canvas.width, canvas.height);
					Noah.y = 75;
					Noah.x = AboutDoor.x + 15;
					drawDoor(AboutDoor, AboutDoor.counter);
					drawDoor(AdventureDoor, AdventureDoor.counter);
					drawDoor(ResumeDoor, ResumeDoor.counter);
					$('body').prepend('<p class="door-title" style="right: 4%;">Resume</p>');
					$('body').prepend('<p class="door-title" style="left: 44%;">Adventure</p>');
					$('body').prepend('<p class="door-title" style="left: 6%;">About</p>');
					context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
					room = 0;
				}
				else if(mouseX >= 90 && mouseX <= 424 && mouseY >= 50 && mouseY <= 334.8){
					speak("Hey that's me! I'm looking good!", 40, 40);
					setTimeout(function(){$('#text-box').remove();}, 3000);
				}
			}
			else if(room == 3){
				if(mouseX >= 0 && mouseX <= 120 && mouseY >= ($(window).scrollTop()+windowHeight-60)){
					$('body').css('overflow-y', 'hidden');
					$('#resume').remove();
					$('body').css('background-color', '#000000');
					context.clearRect(0, 0, canvas.width, canvas.height);
					Noah.y = 75;
					Noah.x = ResumeDoor.x + 15;
					drawDoor(AboutDoor, AboutDoor.counter);
					drawDoor(AdventureDoor, AdventureDoor.counter);
					drawDoor(ResumeDoor, ResumeDoor.counter);
					$('body').prepend('<p class="door-title" style="right: 4%;">Resume</p>');
					$('body').prepend('<p class="door-title" style="left: 44%;">Adventure</p>');
					$('body').prepend('<p class="door-title" style="left: 6%;">About</p>');
					context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
					$(window).scrollTop(0);
					room = 0;
				}
				// else if(mouseX >= 1290 && mouseX <= 1430 && mouseY >= 680){
				// 	download("img/sprites/Noah.png");
				// }
			}
		}
	});

	animate();

	function animate(){
		requestAnimationFrame(animate);
		if(Noah.moving){
			moveNoah();
		}
	}

	var moveNoah = function(){
		var row;
		var col;
		if(keys[37]){
			if(Noah.walkCounter < 10 || (Noah.walkCounter >= 22 && Noah.walkCounter < 32)){
				row = 2;
				col = 0;
			}
			else if(Noah.walkCounter >= 10 && Noah.walkCounter < 22){
				row = 2;
				col = 1;
			}
			else if(Noah.walkCounter >= 32 && Noah.walkCounter <= 44){
				row = 2;
				col = 2;
			}
			if(Noah.velocityX > -Noah.speed) {
	            Noah.velocityX--;
		    }
		}
		else if(keys[38]){
			if(Noah.walkCounter < 10 || (Noah.walkCounter >= 22 && Noah.walkCounter < 32)){
				row = 3;
				col = 0;
			}
			else if(Noah.walkCounter >= 10 && Noah.walkCounter < 22){
				row = 3;
				col = 1;
			}
			else if(Noah.walkCounter >= 32 && Noah.walkCounter <= 44){
				row = 3;
				col = 2;
			}
			if(Noah.velocityY > -Noah.speed) {
				Noah.velocityY--;
		    }

		}
		else if(keys[39]){
			if(Noah.walkCounter < 10 || (Noah.walkCounter >= 22 && Noah.walkCounter < 32)){
				row = 1;
				col = 0;
			}
			else if(Noah.walkCounter >= 10 && Noah.walkCounter < 22){
				row = 1;
				col = 1;
			}
			else if(Noah.walkCounter >= 32 && Noah.walkCounter <= 44){
				row = 1;
				col = 2;
			}
			if(Noah.velocityX < Noah.speed) {
	            Noah.velocityX++;
		    }
		}
		else if(keys[40]){
			if(Noah.walkCounter < 10 || (Noah.walkCounter >= 22 && Noah.walkCounter < 32)){
				row = 0;
				col = 0;
			}
			else if(Noah.walkCounter >= 10 && Noah.walkCounter < 22){
				row = 0;
				col = 1;
			}
			else if(Noah.walkCounter >= 32 && Noah.walkCounter <= 44){
				row = 0;
				col = 2;
			}
			if(Noah.velocityY < Noah.speed) {
		        Noah.velocityY++;
		    }
		}
		if(room == 3 && Noah.y >= 430){
			Noah.velocityY *= Noah.friction;
			$(window).scrollTop($(window).scrollTop() + Noah.velocityY);
		}
		Noah.velocityY *= Noah.friction;
	    Noah.y += Noah.velocityY;
		Noah.velocityX *= Noah.friction;
		Noah.x += Noah.velocityX;

		if(Noah.walkCounter == 44){
			Noah.walkCounter = 0;
		}
		else{
			Noah.walkCounter++;
		}

		context.clearRect(0, 0, canvas.width, canvas.height);
		drawNoah(row, col);
	}

	var stopNoah = function(keycode){
		var row;
		switch(keycode){
			case 37:
				row = 2;
				break;
			case 38:
				row = 3;
				break;
			case 39:
				row = 1;
				break;
			case 40:
				row = 0;
				break;
			default:
		}

		if(Noah.walkCounter < 10 ){
			Noah.walkCounter += (10-Noah.walkCounter);
		}
		else if(Noah.walkCounter >= 22 && Noah.walkCounter < 32){
			Noah.walkCounter += (32-Noah.walkCounter);
		}
		Noah.velocityX = 0;
		Noah.velocityY = 0;
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawNoah(row, 0);
	}

	function speak(words, speed, delay){
		$('#text-box').remove();
		$('body').prepend('<div id="text-box"><p><span class="sprite-speaking"></span></p></div>');
		$('.sprite-speaking').typeIt({
				strings:[words],
				startDelay: delay,
				speed: speed,
				lifeLike: false,
			});

	}


});
