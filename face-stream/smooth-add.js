function smoothAdd(id, ele)
{
    var el = $('#' + id);
    var h = el.height();

    el.css({
	    height:   h,
		overflow: 'hidden'
		});
    
    var ulPaddingTop    = parseInt(el.css('padding-top'));
    var ulPaddingBottom = parseInt(el.css('padding-bottom'));

    var stuff = $('<li></li>').append(ele);
    
    el.prepend(stuff);

    var first = $('li:first', el);
    var last  = $('li:last',  el);

    var foh = first.outerHeight();

    var heightDiff = foh - last.outerHeight();

    var oldMarginTop = first.css('margin-top');

    first.css({
	    marginTop: 0 - foh,
		position:  'relative',
		top:       0 - ulPaddingTop
		});
    
    last.css('position', 'relative');

    el.animate({ height: h + heightDiff }, 1500)

	first.animate({ top: 0 }, 250, function() {
		first.animate({ marginTop: oldMarginTop }, 1000, function() {
			last.animate({ top: ulPaddingBottom }, 250, function() {
				last.remove();
				
				el.css({
					height:   'auto',
					    overflow: 'visible'
					    });
			    });
		    });
	    });
}
