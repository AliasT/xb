/**
 * 观察者模式
 */

class EventEmitter {
  constructor () {
    this.handlers = {}
  }


  /**
   * 事件绑定
   * 
   * @param{string} 事件类型
   * @param{function} 回调函数
   */
  on (type, handler, once=false) {
    if (!this.handlers[type]) {
      this.handlers[type] = []
    }

    var newHandler = {
      once: once,
      fn: handler
    }
    this.handlers[type].push(newHandler)

    return this
  }

  /**
   * 绑定一次事件
   * 
   * @param{string} 事件类型
   * @param{function} 回调函数
   */
  once (type, handler) {
    this.on(type, handler, true)
    this.handlers[type]
  }

  /**
   * 触发事件
   * 
   * @parma{string} 事件类型
   */
  fire (type) {
    var args = Array.prototype.slice.call(arguments, 1)
    this.handlers[type].forEach(function(handler, i) {
      handler.fn.apply(this, args)

      if(handler.once) {
        this.handlers[type].splice(i, 1)
      }
    }, this)
  }

  /**
   * 移除事件处理器
   * 
   * @param{string} 事件类型
   * @param{function} 回调函数
   */
  remove (type, handler) {
    if (this.handlers[type] instanceof Array) {
      for (let i = 0; i < this.handlers[type]; i++) {
        if (this.handlers[i].fn === handler) {
          this.handlers[type].splice(i, 1)
        }
      }
    }
  }
}


/**
 * test
 * 
 */
var observer = new EventEmitter()

/**
 * 将下面的on改变成once查看效果
 */
observer.on('click', function (a, b, c) {
  console.log(a, b, c)
})

observer.fire('click', 3, 4, 5)
observer.fire('click', 3, 4, 5)
observer.fire('click', 3, 4, 5)
