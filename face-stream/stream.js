var query = "funny";
var photostream = [];

var t = 0;
var interval = 2000;
var currentID = 0;


$(function() {
	init();
	$('button').click(function() {
		    if ($(this).text() == 'Start'){
			    t = setTimeout(loadNew, interval);
			    $(this).text('Stop');
			}
		    else
			{
			    clearTimeout(t);
			    $(this).text('Start');
			}
		});
	});

function init(){
    kittenGenerator.requestKittens();
}

function loadInitial(photos){
    photostream = photos;
    for(var i = 0; i < 5; i++){
	var stuff = $('<li></li>');
	$('#photostream').prepend(stuff);
    }
}

function getID() {
    return currentID;
}

function loadNew() {
    $('li:first').addClass('opaque');
    var current = currentID;
    smoothAdd('photostream', photostream[current]);
    currentID+=1;
    t = setTimeout(loadNew, interval);
}
	