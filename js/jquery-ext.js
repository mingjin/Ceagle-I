(function($) {
    $.textWidth = function(text, font) {
        var o = $('<div>' + text + '</div>')
                  .css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden'})
                  .appendTo($('body')),
            w = o.width();

        o.remove();

        return w;
    }
})(jQuery);