$(document).ready(function(){
	var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var date = new Date();
	var day = date.getDate();
	var dayName = date.getDay();
	var month = date.getMonth();
	var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	var terminalTimestamp = 'Last login: ' + days[dayName-1] + ' ' + months[month] +  ' ' + day + ' ' + time + ' on ttys000';

		$('#terminal-timestamp').text(terminalTimestamp);

		$('.type-it').typeIt({
			strings:['./meet_Noah_Naiman'],
			startDelay:700,
			speed:150,
			lifeLike:true,
			callback: function(){
			    setTimeout(function(){
			    	$('body').append('<div id="jumbotron"><section id="big-name"><h1>Noah Naiman</h1><h2>GO TO <a><href="https://github.com/NoahNaiman">github.com/NoahNaiman<a></h2><h3>Coming Soon</h3></section></div>');
			    	$('#jumbotron').css('visibility', 'visible');
			    	$('#jumbotron h3').attr( 'id', 'hit-enter' );
			    	canStart = true;
			    }, 550);
			}
		});
		setInterval(function(){
			$("#hit-enter").fadeToggle(1400);
		}, 1000);
});