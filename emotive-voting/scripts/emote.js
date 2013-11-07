// Generated by CoffeeScript 1.6.3
(function() {
  var click, loadElephant;

  $(function() {
    var el, elephants;
    elephants = ['images/elephant1.jpg', 'images/elephant2.jpg', 'images/elephant1.jpg', 'images/elephant2.jpg'];
    el = $('#photocatch');
    el.photobooth();
    el.on("image", function(event, dataUrl) {
      $("#gallery").prepend('<img src="' + dataUrl + '" >');
      return $("#gallery").prepend('<img src="' + window.elephant + '" width="200px" height="200px" >');
    });
    return loadElephant(elephants[0], elephants.slice(1));
  });

  loadElephant = function(url, elephants) {
    var timeoutID;
    window.elephant = url;
    $(".elephants .target").attr('src', url);
    console.log(url);
    return timeoutID = window.setTimeout((function() {
      click();
      return loadElephant(elephants[0], elephants.slice(1));
    }), 5000);
  };

  click = function() {
    console.log("click");
    return $(".trigger").trigger("click");
  };

}).call(this);