define([], function () {

    function ScrollIt (fn, $container) {
        this.fn         = fn;
        this.$container = $container || $(window);
        this.timeout    = null;
        this.$elements  = $([]);
    }

    // 开始时注册一次事件.
    ScrollIt.prototype.start = function ($elements) {
        this.load(this.filter($elements));
        this.onScroll(this.isBinded);
    }
    
    ScrollIt.prototype.filter = function ($elements) {
        return $elements.filter(function () {
            return this.getAttribute('viewed') !== '1';
        });
    }
    
    // 判断元素是否在view port中(部分或全部)
    ScrollIt.prototype.isInView = function ($ele) {
        return !(this.$container.scrollTop() - ($ele.position().top + $ele.height()) > 0 ||
            $ele.position().top  - (this.$container.scrollTop() + this.$container.height()) > 0);
    }

    // 判断$elements集合中的元素在不在区域中.
    // 如果$elements是所有的元素
    ScrollIt.prototype.load = function ($elements) {
        var self       = this;
        var $remaining = $([]);
        
        $elements.each(function (index, elem) {
            if (self.isInView($(elem))) {
                elem.setAttribute('viewed', '1');
                self.fn.call(elem, index);
                return ;
            }
            $remaining = $remaing.add($(elem));
        });
        
        this.$elements = this.$elements.add($remaining);
    }

    // 滚动事件处理
    ScrollIt.prototype.onScroll = function () {
        var self = this;
        self.$container.on('scroll', function (event) {
            if (self.timeout) {
                clearTimeout(self.timeout);
            }   

            self.timeout = setTimeout(function () {
                self.load(self.$elements);
            }, 100);
        });
    }


    return ScrollIt;
});
