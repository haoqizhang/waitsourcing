var tweets = null;


function getTweets(keyword){
    var url = "https://api.twitter.com/1.1/search/tweets.json?q=" + keyword + "&result_type=mixed&count=20";
    $.ajax( {
	       type: "GET",
		   async: false,
		   url: url,
		   contentType: "application/json; charset=utf-8",
		   dataType: "json",
		   success: function (data) {
		   tweets = data;
		   console.log(data);
	       }});
}


var elephants = [  
		 {"type":"image",
		  "content":"http://images.nationalgeographic.com/wpf/media-live/photos/000/004/cache/african-elephant_435_600x450.jpg"},
		 {"type":"image",
		  "content":"http://www.personal.psu.edu/afr3/blogs/SIOW/elephant.jpg"},
		 {"type":"image",
		  "content":"http://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg"},
		 {"type":"image",
		  "content":"http://spirit-animals.com/wp-content/uploads/2012/09/Elephant2.jpg"},
		 {"type":"image",
		  "content":"http://images2.fanpop.com/images/photos/5300000/Elephant-animals-5370280-2560-1920.jpg"},
		 {"type":"image",
		  "content":"http://eofdreams.com/data_images/dreams/elephant/elephant-06.jpg"}];
    

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
	getTweets("HCOMP");
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

