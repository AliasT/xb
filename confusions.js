/** 
 * jquery
 * $element
 */
 
// 相对于document
$element.offset().top
$element.offset().left

// 相对于父级定位元素
$element.position().top
$element.position().left

// 滚动元素
$element.scrollTop()
$element.scrollLeft()

// 元素顶部到窗口顶部的距离(父级元素没有滚动的情况下,待我有时间再算)
elemtop_to_wintop = $ele.offset().top - $(window).scrollTop()

// 元素顶部到窗口底部的距离
elembottom_to_winbottom = $(window).height() - $ele.offset().top + $(window).scrollTop() 

// 元素底部到窗口顶部的距离(加上元素高度即可)(同上)
elembottom_to_wintop = $(window).height() - $ele.offset().top + $(window).scrollTop() + $element.height()

// 元素底部到窗口底部的距离
elembottom_to_winbottom = $ele.offset().top - $(window).scrollTop() - $ele.height()
