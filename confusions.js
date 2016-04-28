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
eTop$(window).scrollTop() - $element.offset().top

// 元素顶部到窗口底部的距离(加上元素高度即可)(同上)
$(window).scrollTop() - $element.offset().top - $element.height()

// 元素底部到窗口顶部的距离(加上元素高度即可)(同上)
$(window).scrollTop() - $element.offset().top + $element.height()
