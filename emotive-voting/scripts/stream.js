var query = "funny";
var photostream = [];

var t = 0;
var flickerInterval = 3000;
var currentID = 0;

var binary = false;

$(function() {
        init();
	t = setTimeout(loadNew, flickerInterval);
        /*$('button').click(function() {
                    if ($(this).text() == 'Start'){
                            t = setTimeout(loadNew, interval);
                            $(this).text('Stop');
                        }
                    else
                        {
                            clearTimeout(t);
                            $(this).text('Start');
                        }
			}); */
    });

function init(){
    kittenGenerator.requestKittens();
}

function loadInitial(photos){
    photostream = photos;
    for(var i = 0; i < 5; i++){
        var stuff = $('<li class="col-lg-1"></li>');
        $('#photostream').prepend(stuff);
    }
}

function getID() {
    return currentID;
}

function loadNew() {
    $('li:first').addClass('opaque');
    var current = currentID;
    if(binary){
        var stuff = $('<div></div>').append(photostream[current]);
        stuff.append(photostream[current+1]);
        smoothAdd('photostream', stuff);
        currentID+=2;
    }else{
        smoothAdd('photostream', photostream[current]);
        currentID+=1;
    }
    t = setTimeout(loadNew, flickerInterval);
}
       