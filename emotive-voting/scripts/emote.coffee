

$ ->
    elephants = ['images/elephant1.jpg', 'images/elephant2.jpg', 'images/elephant1.jpg', 'images/elephant2.jpg']
        
    el = $( '#photocatch' )
    # initialize photobooth
    el.photobooth()
    
    # Save image that is being viewed and the user face
    el.on("image", (event, dataUrl ) ->
        localStorage.setItem("imageData", dataUrl)
    )
    
    # Hack to delay loading of Smile detection
    checkFlickr = () ->
        if(photostream[0])
            startSmiles()
        else
            console.log "Flickr not yet loaded"
            a = window.setTimeout(checkFlickr, 1000)
    checkFlickr()
    
    startSmiles = () ->
        sd = new SmileDetector("vid")
        sd.onSmile(smileCb)
        sd.start(500)
        console.log "started"
        
    #temp = window.setTimeout(delay(), 3000)
    # cycleImages(elephants)
    
cycleImages = (images) ->
    $(".elephants .target").attr('src', images[0])
    images = images[1..].concat [images[0]]
    callback = -> ((images) -> cycleImages(images))(images)
    timeoutID = window.setTimeout(callback, 4000)
    
# Force Photobooth trigger (but really, you should remove photobooth in the future)
click = ->
    $(".trigger").trigger( "click" )
    
# Smile detection callback
smileCb = (isSmile) ->
    #Get image:
    #try
        imgURL = photostream[getID()].src.replace("_z", "_s")
        lastIMG = localStorage.getItem("currentImage")
        
        if imgURL isnt lastIMG:
            # Set Previous Image and current
            localStorage.setItem("LastImage", lastIMG - 1)
            localStorage.setItem("currentImage", imgURL)
            makeJudgement()
            localStorage.setItem("currentImageLikes", 0)
            localStorage.setItem("currentImageDislikes", 0)
        
        # React to Smile (or lack of)
        if (isSmile)
            $(".smile").removeClass("sad")
            $(".smile").addClass("happy")
            localStorage.setItem("currentImageLikes", parseInt(localStorage.getItem("currentImageLikes")+1))
        else
            localStorage.setItem("currentImageDislikes", parseInt(localStorage.getItem("currentImageDislikes"))+1)
            $(".smile").removeClass("happy")
            $(".smile").addClass("sad")
            
        click()
            
        $('.confidence').text("P(like)="+getConfidence())
    #catch
    #    console.log "The flickr stuff isn't really loaded yet, you idiot."

makeJudgement = ->
    conf = getConfidence()
    el = if conf > 0.49 then ".likes" else ".dislikes"

    dataUrl = localStorage.getItem("imageData")
    img = localStorage.getItem("LastImage")
    #img = $(".elephants .target").attr('src')
    #img = photostream[getID()].src.replace("_z", "_s")
    $("<div class='row'>")
        .append( '<img src="' + dataUrl + '" class="col-lg-6" >')
        .append( '<img src="'+img+'"  class="col-lg-6" >')
        .prependTo(el)
    
getConfidence = ->
    likes = parseInt(localStorage.getItem("currentImageLikes"))
    dislikes = parseInt(localStorage.getItem("currentImageDislikes"))
    conf = likes / (likes+dislikes)
    conf