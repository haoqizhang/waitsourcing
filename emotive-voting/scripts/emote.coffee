

$ ->
    elephants = ['images/elephant1.jpg', 'images/elephant2.jpg', 'images/elephant1.jpg', 'images/elephant2.jpg']
        
    el = $( '#photocatch' )
    # initialize photobooth
    el.photobooth()
    
    # Save image that is being viewed and the user face
    el.on("image", (event, dataUrl ) ->
        localStorage.setItem("imageData", dataUrl)
    )
    sd = new SmileDetector("vid")
    sd.onSmile(smileCb)
    sd.start(500)
    cycleImages(elephants)
    
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
    imgURL = $(".elephants .target").attr('src')
    
    # Set Previous Image and current
    lastIMG = localStorage.getItem("currentImage")
    localStorage.setItem("LastImage", lastIMG)
    localStorage.setItem("currentImage", imgURL)
    
    click()
    
    if lastIMG isnt imgURL
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
        
    $('.confidence').text("P(like)="+getConfidence())


makeJudgement = ->
    conf = getConfidence()
    el = if conf > 0.49 then ".likes" else ".dislikes"

    dataUrl = localStorage.getItem("imageData")
    elephant = $(".elephants .target").attr('src')
    $("<div class='row'>")
        .append( '<img src="' + dataUrl + '" class="col-lg-6" >')
        .append( '<img src="'+elephant+'"  class="col-lg-6" width="200px" height="200px" >')
        .prependTo(el)
    
getConfidence = ->
    likes = parseInt(localStorage.getItem("currentImageLikes"))
    dislikes = parseInt(localStorage.getItem("currentImageDislikes"))
    conf = likes / (likes+dislikes)
    conf