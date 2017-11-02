$(document).ready(function(){
	var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	var date = new Date();
	var day = date.getDate();
	var dayName = date.getDay();
	var month = date.getMonth();
	var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

	var output = 'Last login: ' + days[dayName-1] + ' ' + months[month-1] +  ' ' + day + ' ' + time + ' on ttys000';
	$('#terminal-timestamp').text(''+output+'');
});