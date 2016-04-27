/**
 *
 * 数据加载
 *
 */

define([], function () {
    /**
     *
     * options: ajax url, pagesize, 
     *
     */
    function noob () {}

    function ItemLoader (options) {
        this.options   = options;    /* 当指示器出现在窗口中,开始请求 */
        this.index     = 0;
        this.timeout   = null;
        this.eventName = 'scroll.' + options.eventId;
        this.scroll();
    }


    ItemLoader.prototype.init = function ($observer) {
        // 移除遮罩
        // this.$mask.remove();
        this.state = $.extend({}, this.options.state);
        this.$observer = $observer;
        if (this.observerIsInView()) {
            this.getItems(this.state);
        }
    }

    
    /* 指示器是否在窗口内 */
    ItemLoader.prototype.observerIsInView = function () {
        return !(this.$observer.offset().top > $(window).scrollTop() + $(window).height() ||
            $(window).scrollTop() > this.$observer.offset().top + this.$observer.height());
    }


    ItemLoader.prototype.offScroll = function () {
        $(window).off(this.eventName);
    }


    ItemLoader.prototype.scroll = function () {
        var _this = this;
        $(window).on(_this.eventName, function () {
            console.log(1);
            if (_this.timeout) {
                clearTimeout(_this.timeout);
            }

            _this.timeout = setTimeout (function () {
                _this.getItems(_this.state);
            }, 100);
        })
    }


    ItemLoader.prototype.callback = function (data) {   
        // 数据长度可能为0;
        if (data.success) {
            // 考虑滚动unbind事件
            if (data.model.length < this.state.max) {
                this.offScroll();
            }
            this.state.offset++;
            this.render(data.model);
            return ;
        } 

        this.error();       // 请求出错
    }

    ItemLoader.prototype.error = noob;

    /* 加载数据 */
    ItemLoader.prototype.getItems = function (params) {
        if (this.observerIsInView()) {
            $.ajax({
                url: this.options.requestUrl,
                type: 'get',
                dataType: 'json',
                data: params,
                success: this.callback.bind(this),
                error: function(xhr) {
                    // todo:显示错误信息
                }
            });
        }
        
    }


    ItemLoader.prototype.render = function (data) {
        /* 用指定的template渲染items */
        var _this        = this;
        var templateName = this.options.templateName;

        if (document.getElementById(templateName)) {
            require(['template'], function (template) {
                $(template(templateName, data)).insertBefore(_this.$observer);
            });
            return ;
        }

        require([this.options.templateName], function (template) {
            $(template(data)).insertBefore(_this.$observer);
        });
    }

    return ItemLoader;
});
