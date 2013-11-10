var kittenGenerator = {
    /**
     * Flickr URL that will give us lots and lots of whatever we're looking for.
     *
     * See http://www.flickr.com/services/api/flickr.photos.search.html for
     * details about the construction of this URL.
     *
     * @type {string}
     * @private
     */
    searchOnFlickr_: 'https://secure.flickr.com/services/rest/?' +
    'method=flickr.photos.search&' +
    'api_key=90485e931f687a9b9c2a66bf58a3861a&' +
    'text=' + encodeURIComponent(query) + '&' +
    'safe_search=1&' +
    'content_type=1&' +
    //    'sort=interestingness-desc&' +
    'sort=relevance&' +
    'per_page=50',
    
    /**
     * Sends an XHR GET request to grab photos of lots and lots of kittens. The
     * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
     *
     * @public
     */
    requestKittens: function() {
	var req = new XMLHttpRequest();
	req.open("GET", this.searchOnFlickr_, true);
	req.onload = this.getPhotos_.bind(this);
	req.send(null);
    },
    
    /**
     * Handle the 'onload' event of our kitten XHR request, generated in
     * 'requestKittens', by generating 'img' elements, and stuffing them into
     * the document for display.
     *
     * @param {ProgressEvent} e The XHR ProgressEvent.
     * @public
     */
    getPhotos_: function (e) {
	var photos = [];
	var kittens = e.target.responseXML.querySelectorAll('photo');
	
	for (var i = 0; i < kittens.length; i++) {
	    var img = document.createElement('img');
	    img.src = this.constructKittenURL_(kittens[i]);
	    img.setAttribute('alt', kittens[i].getAttribute('title'));
	    img.setAttribute('class', 'photo');
	    photos.push(img);
	}
	console.log("loaded")
	loadInitial(photos);
    },
    
    /**
     * Given a photo, construct a URL using the method outlined at
     * http://www.flickr.com/services/api/misc.urlKittenl
     *
     * @param {DOMElement} A kitten.
     * @return {string} The kitten's URL.
     * @private
     */
    constructKittenURL_: function (photo) {
	return "http://farm" + photo.getAttribute("farm") +
	".static.flickr.com/" + photo.getAttribute("server") +
	"/" + photo.getAttribute("id") +
	"_" + photo.getAttribute("secret") +
	"_z.jpg"; // c
    }
};
