/*
 *	This file runs everything.
*/

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
		x: 80,
		y: 50,
		counter: 0
	};

	//'Github' door
	var GithubDoor = {
		name: "githubDoor",
		function: "Github",
		sprites: [],
		x: windowWidth/2.2,
		y: 50,
		counter: 0
	};

	//'Resume' door
	var ResumeDoor = {
		name: "ResumeDoor",
		function: "Resume",
		sprites: [],
		x: windowWidth - 160,
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
		GithubDoor.sprites.push(img);
	}
	for(var i = 0; i < doorImages.length; i++) {
		var img = new Image();
		img.src = doorImages[i];
		ResumeDoor.sprites.push(img);
	}

	function drawDoor(door, counter){
		context.drawImage(door.sprites[counter], door.x, door.y, door.sprites[0].width/2, door.sprites[0].height/2);
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
											$('body').append('<div id="about-me"><p>Hi, my name is Noah and I live inside my computer.<br><br>\
												Pursuing my bachelor\'s degree in Computer Science at Boston University.<br><br>\
												Graduating class of 2020!<br><br>\
												My passion is Cyber Security.<br><br>\
												But my interests include IOT Vulnerabilites, Genetic Algorithms, and Machine Learning.<br><br>\
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
				else if(Noah.x+58 >= GithubDoor.x && Noah.x <= (GithubDoor.x + GithubDoor.sprites[0].width/2)){
					if(row != 0){
						if(Noah.y > windowHeight/2){
							GithubDoor.counter = 0;
						}
						else if(Noah.y <= windowHeight/2 && Noah.y > windowHeight/2 - windowHeight/6){
							GithubDoor.counter = 1;
						}
						else if(Noah.y <= windowHeight/2-windowHeight/6 && Noah.y > windowHeight/2 - windowHeight/4){
							GithubDoor.counter = 2;
						}
						else{
							GithubDoor.counter = 3;
							if(Noah.y <= 70){
								window.open('https://github.com/NoahNaiman');
							}
						}
					}
					else{
						GithubDoor.counter = 0;
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
								$('body').append('<p class="exit-sign"">Exit</p>');
								//$('body').append('<p class="download-button"><a href="img/downloads/Naiman_Noah_Resume.pdf" target="_blank" style="text-decoration:none;" download>Download</a></p>')
								$('body').append('<h1 class="resume-text" style="top: -5%; font-size: 70px; left: 35%; color: #2ad7f9;">Noah Naiman</h1>');
								$('body').append('<h2 class="resume-text" style="top: 9%; font-size: 25px; left: 26%;">(303)547-7073 | nnaiman@bu.edu | www.noahnaiman.me</h2>');
								$('body').append('<div id="long-bar"></div>');
								$('body').append('<h2 class="resume-text" style="top: 15%; font-size: 37px; left: 10%; color: #2ad7f9;">Education</h2>');
								$('body').append('<h3 class="resume-text" style="top: 22%; font-size: 23px; left: 10%;">Boston University</h3>');
								$('body').append('<h3 class="resume-text" style="top: 22%; font-weight: 100; font-size: 23px; left: 67%;">Expected Graduation, May 2020</h3>');
								$('body').append('<h3 class="resume-text" style="top: 26%; font-weight: 100; font-size: 22px; left: 10%;">Major: Computer Science</h3>');
								$('body').append('<h3 class="resume-text" style="top: 32%; font-size: 23px; left: 10%;">GPA: 3.5</h3>');
								$('body').append('<h3 class="resume-text" style="top: 38%; font-size: 23px; left: 10%;">Relevant Coursework:</h2>');
								$('body').append('<h3 class="resume-text" style="top: 42%; font-weight: 100; font-size: 22px; left: 10%;">Data Structures | Computer Systems Fundamentals | \
									Discrete Math & Combinatorics | Probability in Computing | Algebraic Algorithms & Modular Arithmetic | Algorithms & Analysis | Cybersecurity</h3>');
								$('body').append('<h2 class="resume-text" style="top: 52%; font-size: 37px; left: 10%; color: #2ad7f9;">Skills</h2>');
								$('body').append('<h3 class="resume-text" style="top: 59%; font-size: 23px; left: 10%;">Languages: <a style="font-weight: 100; font-size: 22px;">Python | C/C++ | JavaScript | Java</a></h3>');
								$('body').append('<h3 class="resume-text" style="top: 65%; font-size: 23px; left: 10%;">Miscellanea: <a style="font-weight: 100; font-size: 22px;">Command Line Interface & Shell Scripting | Node.js | SQL | MongoDB | Git</a></h3>');
								$('body').append('<h2 class="resume-text" style="top: 72%; font-size: 37px; left: 10%; color: #2ad7f9;">Projects</h2>');
								$('body').append('<h3 class="resume-text" style="top: 79%; font-size: 23px; left: 10%;">Aliquator</h3>');
								$('body').append('<h3 class="resume-text" style="top: 83%; font-weight: 100; font-size: 22px; left: 10%;"><i>Personal Project</i></h3>');
								$('body').append('<ul class="resume-text" style="top: 87%; font-weight: 100; font-size: 22px; left: 15%;">\
								<li>Web-app for students to enter mathematical units, with all equations using them returned</li>\
								<li>Engineered server using Node.js and Express, with Pug for HTML templating and JQuery for data parsing</li>\
								<li>Integrated MongoDB through Java for database of equations to be queried by server</li>\
								</ul>');
								$('body').append('<h3 class="resume-text" style="top: 103%; font-size: 23px; left: 10%;">The Notorious A.L.E.X.A</h3>');
								$('body').append('<h3 class="resume-text" style="top: 107%; font-weight: 100; font-size: 22px; left: 10%;"><i>HackUmass 2017 Team Project</i></h3>');
								$('body').append('<ul class="resume-text" style="top: 111%; font-weight: 100; font-size: 22px; left: 15%;">\
								<li>Amazon Alexa skill to make Alexa freestyle rap</li>\
								<li>20,000 lines of lyrics web-scraped by python script through Beautiful Soup library</li>\
								<li>Scraped lyrics used to train a Keras neural network, creating a model for each decade of rap</li>\
								<li>Back-end server to send lyrics written in python utilizing Flask and ngrok.</li>\
								</ul>');
								$('body').append('<h2 class="resume-text" style="top: 130%; font-size: 37px; left: 10%; color: #2ad7f9;">Experience</h2>');
								$('body').append('<h3 class="resume-text" style="top: 137%; font-size: 23px; left: 10%;">BostonHacks Hackathon (Fall 2017 – Present)</h3>');
								$('body').append('<h3 class="resume-text" style="top: 141%; font-weight: 100; font-size: 22px; left: 10%;"><i>Organizer</i></h3>');
								$('body').append('<ul class="resume-text" style="top: 145%; font-weight: 100; font-size: 22px; left: 15%;">\
								<li>Worked with a team of 16 other students and Boston University to help organize a hackathon of 400+ students</li>\
								<li>Reached out to and interacted with sponsors to attain financing for event</li>\
								<li>Helped build live website used by participants during event</li>\
								<li>Developed workshops for participants in topics such as Machine Learning, Web and Mobile Development, and intergrating various APIs</li>\
								</ul>');
								$('body').append('<h3 class="resume-text" style="top: 167%; font-size: 23px; left: 10%;">Student Tutor (Fall 2017 – Present)</h3>');
								$('body').append('<ul class="resume-text" style="top: 171%; font-weight: 100; font-size: 22px; left: 15%;">\
								<li>Met with students for weekly tutoring sessions in data structures, algorithm design and analysis, various other computer science topics</li>\
								</ul>');
								$('body').append('<h3 class="resume-text" style="top: 180%; font-size: 23px; left: 10%;">Boston University Computer Science Mentor Program</h3>');
								$('body').append('<h3 class="resume-text" style="top: 184%; font-weight: 100; font-size: 22px; left: 10%;"><i>Program Founding Member</i></h3>');
								$('body').append('<ul class="resume-text" style="top: 188%; font-weight: 100; font-size: 22px; left: 15%;">\
								<li>Met with mentees weekly to help integrate them into the Boston University Computer Science community</li>\
								<li>Tutored mentees for their Computer Science classes and ran workshops on topics of interest. Topics include: basics in Computer Science, Git and Github for version control, using Node.js to create web-apps</li>\
								</ul>');
								$('body').append('<h3 class="resume-text" style="top: 207%; font-size: 23px; left: 10%;">0xBU Cyber Security Club (Fall 2016 – Present)</h3>');
								$('body').append('<h3 class="resume-text" style="top: 211%; font-weight: 100; font-size: 22px; left: 10%;"><i>Vice President</i></h3>');
								$('body').append('<ul class="resume-text" style="top: 215%; font-weight: 100; font-size: 22px; left: 15%;">\
								<li>Studied various cybersecurity topics at weekly meetings and workshops such as: Web Security, Reverse Engineering, and Cryptography</li>\
								<li>Competed in weekly online Capture the Flag competitions including MITRE CTF, CSAW CTF, BACKDOORCTF</li>\
								</ul>');
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
					GithubDoor.counter = 0;
					ResumeDoor.counter = 0;
				}
				if(room == 0){
					drawDoor(AboutDoor, AboutDoor.counter);
					drawDoor(GithubDoor, GithubDoor.counter);
					drawDoor(ResumeDoor, ResumeDoor.counter);
				}
			}
			else if(room == 1){
				if(Noah.x >= 0 && Noah.x <= 120 && Noah.y >= 640){
					$('#big-picture').remove();
					$('#about-me').remove();
					$('.exit-sign').remove();
					context.clearRect(0, 0, canvas.width, canvas.height);
					Noah.y = 75;
					Noah.x = AboutDoor.x + 15;
					drawDoor(AboutDoor, AboutDoor.counter);
					drawDoor(GithubDoor, GithubDoor.counter);
					drawDoor(ResumeDoor, ResumeDoor.counter);
					$('body').prepend('<p class="door-title" style="right: 4%;">Resume</p>');
					$('body').prepend('<p class="door-title" style="left: 45.5%;">Github</p>');
					$('body').prepend('<p class="door-title" style="left: 6%;">About</p>');
					context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
					room = 0;
				}
			}
			else if(room == 3){
				if(Noah.x >= 0 && Noah.x <= 120 && Noah.y >= 1620){
					$('body').css('overflow-y', 'hidden');
					$('.exit-sign').remove();
					$('.download-button').remove();
					$('.resume-text').remove();
					$('#long-bar').remove();
					$('body').css('background-color', '#000000');
					context.clearRect(0, 0, canvas.width, canvas.height);
					Noah.y = 75;
					Noah.x = ResumeDoor.x + 15;
					drawDoor(AboutDoor, AboutDoor.counter);
					drawDoor(GithubDoor, GithubDoor.counter);
					drawDoor(ResumeDoor, ResumeDoor.counter);
					$('body').prepend('<p class="door-title" style="right: 4%;">Resume</p>');
					$('body').prepend('<p class="door-title" style="left: 45.5%;">Github</p>');
					$('body').prepend('<p class="door-title" style="left: 6%;">About</p>');
					context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
					room = 0;
					$('body').scrollTop(0);
				}
			}
		}
		if(Noah.x > windowWidth){
			Noah.x = -30;
		}
		else if(start && Noah.x < -50){
			Noah.x = windowWidth;
		}
		if(Noah.y > windowHeight-90 && room != 3){
			Noah.y = windowHeight-90;
		}
		else if(Noah.y < 60){
			Noah.y = 60;
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
				drawDoor(GithubDoor, 0);
				drawDoor(ResumeDoor, 0);
				$('body').prepend('<p class="door-title" style="right: 4.7%;">Resume</p>');
				$('body').prepend('<p class="door-title" style="left: 45.5%;">Github</p>');
				$('body').prepend('<p class="door-title" style="left: 6.2%;">About</p>');
			}
		}
	    if(keys[13] && !start && !inIntro){
	    	$('#terminal-head').remove();
			$('#jumbotron').remove();
			$('body').append('<canvas id="canvas" height="' + windowHeight*2.3 + '" width="' + windowWidth + '"></canvas>');
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
					speak("In a second, three doors will appear. Either navigate me to them using the arrow keys, or click on them to enter. Have fun, and thanks for visiting!", 40, 40);
				}
			}, 8400);
			setTimeout(function(){
				if(inIntro){
					$('#text-box').remove();
					start = true;
					inIntro = false;
					drawDoor(AboutDoor, 0);
					drawDoor(GithubDoor, 0);
					drawDoor(ResumeDoor, 0);
					$('body').prepend('<p class="door-title" style="right: 4%;">Resume</p>');
					$('body').prepend('<p class="door-title" style="left: 45.5%;">Github</p>');
					$('body').prepend('<p class="door-title" style="left: 6%;">About</p>');
				}
			}, 16000);
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
					GithubDoor.counter = 0;
					ResumeDoor.counter = 0;
				}
				else if(mouseX >= GithubDoor.x && mouseX <= (GithubDoor.x + GithubDoor.sprites[0].width/2) && mouseY >= GithubDoor.y && (mouseY <= GithubDoor.y + GithubDoor.sprites[0].height/2)){
					$('body').css( 'cursor', 'pointer' );
					AboutDoor.counter = 0;
					GithubDoor.counter = 3;
					ResumeDoor.counter = 0;
				}
				else if(mouseX >= ResumeDoor.x && mouseX <= (ResumeDoor.x + ResumeDoor.sprites[0].width/2) && mouseY >= ResumeDoor.y && (mouseY <= ResumeDoor.y + ResumeDoor.sprites[0].height/2)){
					$('body').css( 'cursor', 'pointer' );
					AboutDoor.counter = 0;
					GithubDoor.counter = 0;
					ResumeDoor.counter = 3;
				}
				else{
					$('body').css( 'cursor', 'default' );
				}
				context.clearRect(0, 0, canvas.width, canvas.height);
				drawDoor(AboutDoor, AboutDoor.counter);
				drawDoor(GithubDoor, GithubDoor.counter);
				drawDoor(ResumeDoor, ResumeDoor.counter);
				context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
			}
			if(room != 0){
				if (mouseX >= 11 && mouseX <= 126 && mouseY >= ($('body').scrollTop()+windowHeight-60)){
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
					$('body').append('<div id="about-me"><p>Hi, my name is Noah and I live inside my computer.<br><br>\
							Pursuing my bachelor\'s degree in Computer Science at Boston University.<br><br>\
							Graduating class of 2020!<br><br>\
							My passion is Cyber Security.<br><br>\
							But my interests include IOT Vulnerabilites, Genetic Algorithms, and Machine Learning.<br><br>\
							I\'m from Denver, but I live in Boston.<br><br>\
							Hobbies include writing, boxing, and making bad jokes.<br><br>\
							Currently looking for summer employment.<br><br>\
							I can be reached at nnaiman@bu.edu<br><br>\
							<a style="color: #2ad7f9;">\"You\'re only given a little spark of madness. You mustn\'t lose it.\"<br><br>\
							&nbsp;&nbsp;&nbsp;-Robin Williams</a></p></div>');
					$('body').append('<p class="exit-sign">Exit</p>');
					context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
				}
				else if(mouseX >= GithubDoor.x && mouseX <= (GithubDoor.x + GithubDoor.sprites[0].width/2) && mouseY >= GithubDoor.y && (mouseY <= GithubDoor.y + GithubDoor.sprites[0].height/2)){
					window.open('https://github.com/NoahNaiman');
				}
				else if(mouseX >= ResumeDoor.x && mouseX <= (ResumeDoor.x + ResumeDoor.sprites[0].width/2) && mouseY >= ResumeDoor.y && (mouseY <= ResumeDoor.y + ResumeDoor.sprites[0].height/2)){
					$('body').css('overflow-y', 'scroll');
					room = 3;
					Noah.y = 420;
					Noah.x = 30;
					$('p.door-title').remove();
					context.clearRect(0, 0, canvas.width, canvas.height);
					$('body').css("background-color", "white");
					$('body').append('<p class="exit-sign"">Exit</p>');
					//$('body').append('<p class="download-button"><a href="img/downloads/Naiman_Noah_Resume.pdf" target="_blank" style="text-decoration:none;" download>Download</a></p>')
					$('body').append('<h1 class="resume-text" style="top: -5%; font-size: 70px; left: 35%; color: #2ad7f9;">Noah Naiman</h1>');
					$('body').append('<h2 class="resume-text" style="top: 9%; font-size: 25px; left: 26%;">(303)547-7073 | nnaiman@bu.edu | www.noahnaiman.me</h2>');
					$('body').append('<div id="long-bar"></div>');
					$('body').append('<h2 class="resume-text" style="top: 15%; font-size: 37px; left: 10%; color: #2ad7f9;">Education</h2>');
					$('body').append('<h3 class="resume-text" style="top: 22%; font-size: 23px; left: 10%;">Boston University</h3>');
					$('body').append('<h3 class="resume-text" style="top: 22%; font-weight: 100; font-size: 23px; left: 67%;">Expected Graduation, May 2020</h3>');
					$('body').append('<h3 class="resume-text" style="top: 26%; font-weight: 100; font-size: 22px; left: 10%;">Major: Computer Science</h3>');
					$('body').append('<h3 class="resume-text" style="top: 32%; font-size: 23px; left: 10%;">GPA: 3.5</h3>');
					$('body').append('<h3 class="resume-text" style="top: 38%; font-size: 23px; left: 10%;">Relevant Coursework:</h2>');
					$('body').append('<h3 class="resume-text" style="top: 42%; font-weight: 100; font-size: 22px; left: 10%;">Data Structures | Computer Systems Fundamentals | \
						Discrete Math & Combinatorics | Probability in Computing | Algebraic Algorithms & Modular Arithmetic | Algorithms & Analysis | Cybersecurity</h3>');
					$('body').append('<h2 class="resume-text" style="top: 52%; font-size: 37px; left: 10%; color: #2ad7f9;">Skills</h2>');
					$('body').append('<h3 class="resume-text" style="top: 59%; font-size: 23px; left: 10%;">Languages: <a style="font-weight: 100; font-size: 22px;">Python | C/C++ | JavaScript | Java</a></h3>');
					$('body').append('<h3 class="resume-text" style="top: 65%; font-size: 23px; left: 10%;">Miscellanea: <a style="font-weight: 100; font-size: 22px;">Command Line Interface & Shell Scripting | Node.js | SQL | MongoDB | Git</a></h3>');
					$('body').append('<h2 class="resume-text" style="top: 72%; font-size: 37px; left: 10%; color: #2ad7f9;">Projects</h2>');
					$('body').append('<h3 class="resume-text" style="top: 79%; font-size: 23px; left: 10%;">Aliquator</h3>');
					$('body').append('<h3 class="resume-text" style="top: 83%; font-weight: 100; font-size: 22px; left: 10%;"><i>Personal Project</i></h3>');
					$('body').append('<ul class="resume-text" style="top: 87%; font-weight: 100; font-size: 22px; left: 15%;">\
					<li>Web-app for students to enter mathematical units, with all equations using them returned</li>\
					<li>Engineered server using Node.js and Express, with Pug for HTML templating and JQuery for data parsing</li>\
					<li>Integrated MongoDB through Java for database of equations to be queried by server</li>\
					</ul>');
					$('body').append('<h3 class="resume-text" style="top: 103%; font-size: 23px; left: 10%;">The Notorious A.L.E.X.A</h3>');
					$('body').append('<h3 class="resume-text" style="top: 107%; font-weight: 100; font-size: 22px; left: 10%;"><i>HackUmass 2017 Team Project</i></h3>');
					$('body').append('<ul class="resume-text" style="top: 111%; font-weight: 100; font-size: 22px; left: 15%;">\
					<li>Amazon Alexa skill to make Alexa freestyle rap</li>\
					<li>20,000 lines of lyrics web-scraped by python script through Beautiful Soup library</li>\
					<li>Scraped lyrics used to train a Keras neural network, creating a model for each decade of rap</li>\
					<li>Back-end server to send lyrics written in python utilizing Flask and ngrok.</li>\
					</ul>');
					$('body').append('<h2 class="resume-text" style="top: 130%; font-size: 37px; left: 10%; color: #2ad7f9;">Experience</h2>');
					$('body').append('<h3 class="resume-text" style="top: 137%; font-size: 23px; left: 10%;">BostonHacks Hackathon (Fall 2017 – Present)</h3>');
					$('body').append('<h3 class="resume-text" style="top: 141%; font-weight: 100; font-size: 22px; left: 10%;"><i>Organizer</i></h3>');
					$('body').append('<ul class="resume-text" style="top: 145%; font-weight: 100; font-size: 22px; left: 15%;">\
					<li>Worked with a team of 16 other students and Boston University to help organize a hackathon of 400+ students</li>\
					<li>Reached out to and interacted with sponsors to attain financing for event</li>\
					<li>Helped build live website used by participants during event</li>\
					<li>Developed workshops for participants in topics such as Machine Learning, Web and Mobile Development, and intergrating various APIs</li>\
					</ul>');
					$('body').append('<h3 class="resume-text" style="top: 167%; font-size: 23px; left: 10%;">Student Tutor (Fall 2017 – Present)</h3>');
					$('body').append('<ul class="resume-text" style="top: 171%; font-weight: 100; font-size: 22px; left: 15%;">\
					<li>Met with students for weekly tutoring sessions in data structures, algorithm design and analysis, various other computer science topics</li>\
					</ul>');
					$('body').append('<h3 class="resume-text" style="top: 180%; font-size: 23px; left: 10%;">Boston University Computer Science Mentor Program</h3>');
					$('body').append('<h3 class="resume-text" style="top: 184%; font-weight: 100; font-size: 22px; left: 10%;"><i>Program Founding Member</i></h3>');
					$('body').append('<ul class="resume-text" style="top: 188%; font-weight: 100; font-size: 22px; left: 15%;">\
					<li>Met with mentees weekly to help integrate them into the Boston University Computer Science community</li>\
					<li>Tutored mentees for their Computer Science classes and ran workshops on topics of interest. Topics include: basics in Computer Science, Git and Github for version control, using Node.js to create web-apps</li>\
					</ul>');
					$('body').append('<h3 class="resume-text" style="top: 207%; font-size: 23px; left: 10%;">0xBU Cyber Security Club (Fall 2016 – Present)</h3>');
					$('body').append('<h3 class="resume-text" style="top: 211%; font-weight: 100; font-size: 22px; left: 10%;"><i>Vice President</i></h3>');
					$('body').append('<ul class="resume-text" style="top: 215%; font-weight: 100; font-size: 22px; left: 15%;">\
					<li>Studied various cybersecurity topics at weekly meetings and workshops such as: Web Security, Reverse Engineering, and Cryptography</li>\
					<li>Competed in weekly online Capture the Flag competitions including MITRE CTF, CSAW CTF, BACKDOORCTF</li>\
					</ul>');
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
					drawDoor(GithubDoor, GithubDoor.counter);
					drawDoor(ResumeDoor, ResumeDoor.counter);
					$('body').prepend('<p class="door-title" style="right: 4%;">Resume</p>');
					$('body').prepend('<p class="door-title" style="left: 45.5%;">Github</p>');
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
				if(mouseX >= 0 && mouseX <= 120 && mouseY >= ($('body').scrollTop()+windowHeight-60)){
					$('body').css('overflow-y', 'hidden');
					$('.exit-sign').remove();
					$('.download-button').remove();
					$('.resume-text').remove();
					$('#long-bar').remove();
					$('body').css('background-color', '#000000');
					context.clearRect(0, 0, canvas.width, canvas.height);
					Noah.y = 75;
					Noah.x = ResumeDoor.x + 15;
					drawDoor(AboutDoor, AboutDoor.counter);
					drawDoor(GithubDoor, GithubDoor.counter);
					drawDoor(ResumeDoor, ResumeDoor.counter);
					$('body').prepend('<p class="door-title" style="right: 4%;">Resume</p>');
					$('body').prepend('<p class="door-title" style="left: 45.5%;">Github</p>');
					$('body').prepend('<p class="door-title" style="left: 6%;">About</p>');
					context.drawImage(Noah.sprites[3][0], Noah.x, Noah.y, Noah.sprites[3][0].width/1.3, Noah.sprites[3][0].height/1.3);
					$('body').scrollTop(0);
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
			$('body').scrollTop($('body').scrollTop() + Noah.velocityY);
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