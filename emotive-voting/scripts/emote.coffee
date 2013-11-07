$ ->
    elephants = ['images/elephant1.jpg', 'images/elephant2.jpg', 'images/elephant1.jpg', 'images/elephant2.jpg']
        
    el = $( '#photocatch' )
    # initialize photobooth
    el.photobooth()
    
    # Test capture capability
    el.on("image", (event, dataUrl ) ->
        $("#gallery").prepend( '<img src="' + dataUrl + '" >')
        $("#gallery").prepend( '<img src="'+window.elephant+'" width="200px" height="200px" >')
        )
    
    loadElephant(elephants[0], elephants[1..])
    
    
loadElephant = (url, elephants) ->
    window.elephant = url
    $(".elephants .target").attr('src', url)
    console.log url    
    
    timeoutID = window.setTimeout((() -> (
        click()
        loadElephant(elephants[0], elephants[1..])
    )), 5000)
    
    
    
  
click = ->
    console.log "click"
    $(".trigger").trigger( "click" )