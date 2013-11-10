var waitSource = waitSource || {};

function ImageSelection () {
    var oPublic = {};
    var status = {
        currentImageIndex: 0
    };




    var imageList = [
        "img/meme_same_pictures/7zpp3.jpg",
        "img/meme_same_pictures/8puc8.jpg",
        "img/meme_same_pictures/8va9j.jpg",
        "img/meme_same_pictures/9nfcr.jpg",
        "img/meme_same_pictures/82fw6.jpg",
        "img/meme_same_pictures/88y6z.jpg",
        "img/meme_same_pictures/89guf.jpg",
        "img/meme_same_pictures/91lco.jpg",
        "img/meme_same_pictures/938od.jpg",
        "img/meme_same_pictures/946o5.jpg",
        "img/meme_same_pictures/949l9.jpg",
        "img/meme_same_pictures/a1eml.jpg",
        "img/meme_same_pictures/apqv0.jpg",
        "img/meme_same_pictures/aww6j.jpg",
        "img/meme_same_pictures/b1np4.jpg",
        "img/meme_same_pictures/bvj0a.jpg",
        "img/meme_same_pictures/c92gn.jpg",
        "img/meme_same_pictures/d2y4x.jpg"
    ];

    //
    // http://memegenerator.net/
    var imageList = [
        "img/meme_random/pi6yk.jpg",
        "img/meme_random/pi82o.jpg",
        "img/meme_random/pi797.jpg",
        "img/meme_random/pib3j.jpg",
        "img/meme_random/pic5e.jpg",
        "img/meme_random/piccr.jpg",
        "img/meme_random/picdo.jpg",
        "img/meme_random/picim.jpg",
        "img/meme_random/picpk.jpg",
        "img/meme_random/pifdq.jpg",
        "img/meme_random/pih57.jpg"
    ];

    function _init() {
        $('#choose_uhhuh').click(clickUhHuh);
        $('#choose_yeahok').click(clickYeahOk);


        status.currentImageIndex++;
        status.currentImageIndex++;

        $("#leftcontent").html()
        loadImage('left');
        loadImage('right');

        // loadInstance();
    }

    function loadImage (side) {
        // Load image on either left of right side.n

        //
        // Check if the image index is below the length of the image list.
        if (status.currentImageIndex < imageList.length) {
            var url = imageList[status.currentImageIndex];
            var dom = "<img class='imgoptions' src='" + url + "'></img>";
            if (side == 'left') {
                $("#leftcontent").html(dom);
            } else {
                $("#rightcontent").html(dom);
            }

            status.currentImageIndex++;
        }
    }



    function clickYeahOk () {
        // This is a callback function for clicking "yeah, ok."
        oPublic.yeahOk();
    }

    function clickUhHuh () {
        // This is a callback function for clicking "uh huh."
        oPublic.uhHuh();
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
            'font-size': "100px"
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
        $("#rightcontent").find('img').animate({width: '420px', height: '420px'}, 700, function (){
            $(this).animate({width: '400px', height: '400px'});
        });

        increaseScore();
        // loadInstance();
        loadImage('left');
    };

    oPublic.uhHuh = function () {
        $("#leftcontent").find('img').animate({width: '420px', height: '420px'}, 700, function (){
            $(this).animate({width: '400px', height: '400px'});
        });

        increaseScore();
        // loadInstance();
        loadImage('right');

    };

    //
    // Initialize
    _init();
    return oPublic;
}