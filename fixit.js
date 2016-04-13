define([], function () {
    var getCssStyle = function (cssRules, className) {
        var rule;
        var style = [];

        for (rule in cssRules) {
            style.push([rule, cssRules[rule]].join(': '));
        }

        return '.' + className + '{' + style.join(';') + '}';
    };

    var insertStyle = (function (rules, className) {
        var state = false;
        return function () {
            return state || (state = $('<style>').html(getCssStyle(rules, className)).appendTo($('head')));
        }
    });

    return function ($ele, options) {
        var options   = options || {};
        var $refer    = options.$refer || $ele;
        var $endRefer = options.$endRefer || $ele;
        var insertS   = insertStyle(options.cssRules, options.className);

        $(window).on('scroll', function (event) {
            var wTop = $(window).scrollTop();
            if (wTop > $refer.offset().top && wTop < $endRefer.offset().top) {
                $ele.addClass(options.className);
                insertS();
            } else {
                $ele.removeClass(options.className);
            }
        })
    }
})
