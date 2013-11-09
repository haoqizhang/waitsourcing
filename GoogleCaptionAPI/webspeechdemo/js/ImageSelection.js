var waitSource = waitSource || {};

function ImageSelection () {
    var oPublic = {};

    function _init() {
        $('#choose_uhhuh').click(clickUhHuh);
        $('#choose_yeahok').click(clickYeahOk);

        loadInstance();
    }
    var tweets = null;


    function clickYeahOk () {
        // This is a callback function for clicking yeah, ok.
        oPublic.yeahOk();
    }

    function clickUhHuh () {
        // This
        oPublic.uhHuh();
    }

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


    //
    // Public functions
    oPublic.yeahOk = function (e) {
        // $('#yeahok').trigger("play");
        increaseScore();
        loadInstance();
    };

    oPublic.uhHuh = function () {
        // $('#uhhuh').trigger("play");
        increaseScore();
        loadInstance();
    };

    //
    // Initialize
    _init()
    return oPublic;
}