var elephants = [  
		 {"type":"image",
		  "content":"african-elephant_435_600x450.jpg"},
		 {"type":"image",
		  "content":"elephant.jpg"},
		 {"type":"image",
		  "content":"African_Bush_Elephant.jpg"},
		 {"type":"image",
		  "content":"Elephant2.jpg"},
		 {"type":"image",
		  "content":"Elephant-animals-5370280-2560-1920.jpg"},
		 {"type":"image",
		  "content":"elephant-06.jpg"}];
    

// assume task pairs or stream of tasks
// fill this stream with data that loads on page scrolls




function randomPair(items){
    var item = items[Math.floor(Math.random()*items.length)];
    var item2 = items[Math.floor(Math.random()*items.length)];
    while(item == item2) {
	item = items[Math.floor(Math.random()*items.length)];
	item2 = items[Math.floor(Math.random()*items.length)];
    }
    return [item, item2];
}

function createPictureItem(url, div){
    $(div).html($("<img class='imgoptions' src='" + url + "'></img>"));
}

function createTextItem(text, div){
    $(div).html($("<div class='textoptions'>" + text + "</div>"));
}

function increaseScore(){
    $('#points').html((parseInt($('#points').html()) + 10000));

    $( "#points" ).animate({
	    opacity: 0.5,
		'font-size': "100px",	
		}, 2000, function() {
	    $("#points").css({
		opacity: 1,
		'font-size': "40px"});
	});
}

function getRandomPair(objs){
    // display two random options
    var pair = randomPair(objs);
    if(pair[0].type == "image"){
	createPictureItem(pair[0].content, $("#leftcontent"));
	createPictureItem(pair[1].content, $("#rightcontent"));
    }else if(pair[0].type == "text"){
	createTextItem(pair[0].content, $("#leftcontent"));
	createTextItem(pair[1].content, $("#rightcontent"));
    }
}

function loadInstance(){
    getRandomPair(elephants);
}

$( document ).ready(function() {
	//	getTweets("HCOMP");
	// attach audio listeners
	$('#choose_uhhuh').click(function(){
		$('#uhhuh').trigger("play");
		increaseScore();
		loadInstance();
	    });
	$('#choose_yeahok').click(function(){
		$('#yeahok').trigger("play");
		increaseScore();
		loadInstance();
	    });

	loadInstance();

    });

