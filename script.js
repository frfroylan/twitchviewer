
function pushToDom(arr, names){
	var container = $('#flex-container');
	for(var x = 0; x < arr.length; x++){
		var card = $('#template').clone();
		if(arr[x].stream == null){
			card.attr('id', '');
			card.addClass('offline');
			card.children('img').attr('src', 'https://unsplash.it/g/150/150/?random');
			card.find('.card-title').text(names[x]);
			card.find('.card-text').text('No information available.');
			card.find('.status').text('Offline').css('color', 'red');
			card.find('.stream-btn').css({
				'border-color': 'grey',
				'color':'grey',
				'background-color':'lightgrey'
			})
		}
		else{
			card.attr('id', arr[x].stream._id);
			card.addClass('online');
			card.find('img').attr('src', arr[x].stream.channel.logo);
			card.find('.card-title').html(arr[x].stream.channel.display_name);
			card.find('.card-text').html(arr[x].stream.game);
			card.find('a').attr('href', arr[x].stream.channel.url);
			card.find('.status').text('Online').css('color', 'green');
		}
		container.append(card);
	}
}

$(document).ready(function(){
	var streamers = ["ESL_SC2", "OgamingSC2", "NALCS2", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
	var streamerArr = [];

	$.when(
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/ESL_SC2?callback=?', function(data) {
			streamerArr.push(data);
		}),
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/OgamingSC2?callback=?', function(data) {
			streamerArr.push(data);
		}),
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/NALCS2?callback=?', function(data) {
			streamerArr.push(data);
		}),
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/freecodecamp?callback=?', function(data) {
			streamerArr.push(data);
		}),
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/storbeck?callback=?', function(data) {
			streamerArr.push(data);
		}),
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/habathcx?callback=?', function(data) {
			streamerArr.push(data);
		}),
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/RobotCaleb?callback=?', function(data) {
			streamerArr.push(data);
		}),
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/noobs2ninjas?callback=?', function(data) {
			streamerArr.push(data);
		})
	).then(function(){
		pushToDom(streamerArr, streamers);
	});

	var all = $('#all-btn');
	var on = $('#on-btn');
	var off = $('#off-btn');
	all.click(function(){
		$(document).find('.active').toggleClass('active').css('color', '#777');
		$(this).addClass('active').css('color', '#fff');
		$('.offline').show();
		$('.online').show();
	});
	on.click(function(){
		$(document).find('.active').toggleClass('active').css('color', '#777');
		$(this).addClass('active').css('color', '#fff');
		$('.online').show();
		$('.offline').hide();
	});
	off.click(function(){
		$(document).find('.active').toggleClass('active').css('color', '#777');
		$(this).addClass('active').css('color', '#fff');
		$('.online').hide();
		$('.offline').show();
	});
});