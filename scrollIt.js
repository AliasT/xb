define([], function () {

    function ScrollIt (fn, $container) {
        this.fn         = fn;
        this.$container = $container || $(window);
        this.timeout    = null;
        this.isBinded   = false;
    }


    ScrollIt.prototype.start = function ($elements) {
        this.$elements = $elements;
        this.load();
        this.onScroll(this.isBinded);
    }


    // 判断元素是否在view port中(部分或全部)
    ScrollIt.prototype.isInView = function ($ele) {
        return !($(window).scrollTop() - ($ele.offset().top + $ele.height()) > 0 ||
            $ele.offset().top  - ($(window).scrollTop() + $(window).height()) > 0);
    }


    ScrollIt.prototype.load = function () {
        var self = this;
        self.$elements.each(function (index, elem) {
            console.log(self.isInView($(elem)));
            if ('' + elem.getAttribute('viewed') !== '1' && self.isInView($(elem))) {
                elem.setAttribute('viewed', 1);
                self.fn.call(elem, index);
            }
        });
    }


    ScrollIt.prototype.onScroll = function () {
        if (this.isBinded) {
            return ;
        }
        
        var self = this;
        self.$container.on('scroll', function (event) {
            if (self.timeout) {
                clearTimeout(self.timeout);
            }   

            self.timeout = setTimeout(function () {
                self.load();
            }, 300);
        });
        this.isBinded = true;
    }


    return ScrollIt;
});
