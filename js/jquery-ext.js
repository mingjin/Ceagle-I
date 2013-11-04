(function($) {
    $.textMetrics = function(text, font) {
        var f = font || '50px arial',
            o = $('<div>' + text + '</div>')
                  .css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f})
                  .appendTo($('body')),
            w = o.width();

        o.remove();

        return w;
    }
})(jQuery);