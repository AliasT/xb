define([], function () {
    // 应尽量让用户不看到图片加载占位, 所以让加载指示在空间中提前出现
    
    function ScrollIt (fn, options) {
        this.fn         = fn;
        var options     = options || {};
        this.$container = options.$container || $(window);
        this.timeout    = null;
        this.holdheight = options.holdheight || 0;
        this.$elements  = $([]);
        this.onScroll();
    }

    // 开始时注册一次事件.
    ScrollIt.prototype.start = function ($elements) {
        this.load(this.filter($elements));
    }
    
    ScrollIt.prototype.filter = function ($elements) {
        return $elements.filter(function () {
            return this.getAttribute('viewed') !== '1';
        });
    }
    
    // 判断元素是否在view port中(部分或全部)
    ScrollIt.prototype.isInView = function ($ele) {
        return !(this.$container.scrollTop() - ($ele.offset().top + this.holdheight + $ele.height()) > 0 ||
                    $ele.offset().top - (this.$container.scrollTop() + this.$container.height()) - this.holdheight> 0);
    }

    // 判断$elements集合中的元素在不在区域中.
    // 如果$elements是所有的元素
    ScrollIt.prototype.load = function ($elements) {
        var self       = this;
        var $remaining = $([]);
        
        $elements.each(function (index, elem) {
            // if (elem.tagName == 'IMG') debugger;
            if (self.isInView($(elem))) {
                elem.setAttribute('viewed', '1');
                self.fn.call(elem, index);
                return ;
            }
            $remaining = $remaining.add($(elem));
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
