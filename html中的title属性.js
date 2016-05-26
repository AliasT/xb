  (function () {
    "use strict";

    /* 
     * 自动适应目标元素的位置
     */

    function setStyle (element, styles) {
      for (var styleName in styles) {
        element.style[styleName] = styles[styleName];
      }
    }

    var layer = {
      isVisible: false
    };

    layer.defaultstyle = {
      position: "absolute",
      display: 'block'
    }

    layer.show = function (element, content) {
      this.getContainer().innerHTML = content;
      setStyle(this.container, this.defaultstyle);
      setStyle(this.container, this.getPosition(element));
    }


    layer.getContainer = function () {
      return this.container || (function (context) {
        var container = document.createElement('div');
        document.body.appendChild(container);
        container.addEventListener('mouseover', function () {
          context.isVisible = true;
        });

        container.addEventListener('mouseout', function (e) {
          setTimeout(function() {
            context.isVisible = false;
            context.hide();
          }, 100);
        })
        return context.container = container;
      })(this);
    }


    layer.getPosition = function (element) {
      var bounding = element.getBoundingClientRect();
      var top      = bounding.top + window.pageYOffset;
      var left     = bounding.left + window.pageXOffset;

      return {
        // 相对位置信息
        top: top - element.clientHeight,
        left: left - element.clientWidth / 2
      }
    }

    layer.hide = function () {
      this.container.style.display = 'none';
    }

    layer.init = function (elements) {
      var self = this;
      var i    = 0;
      while (i < elements.length) {
        elements[i].addEventListener('mouseover', function (e) {
          self.isVisible = true;
          self.show(e.target, 'Hello world');
        });

        elements[i].addEventListener('mouseout', function (e) {
          self.isVisible = false;
          setTimeout(function () {
            if (!self.isVisible) self.hide();
          }, 300);
        });
        i++;
      }
    }


    layer.init(document.querySelectorAll('.main'));

  })();
