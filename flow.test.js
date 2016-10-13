// @flow

interface Comparable<T> {
  compareTo(b: T): number;
}

/*
 * test
 */

class N {
	v: number	// instance prop
	constructor (v: number) {
		this.v = v
	}

	compareTo (x: N) {
		return this.v - x.v
	}
}


// Number.prototype.compareTo = function (x: number) {
// 	return this - x;
// }
// type comparableNumber {
// 	value: x,
// 	compareTo (b: number) {
// 		return a - b
// 	}
// }

/* 
 * 维基百科：二分搜索
 * https://zh.wikipedia.org/zh-hans/%E4%BA%8C%E5%88%86%E6%90%9C%E7%B4%A2%E7%AE%97%E6%B3%95
 */

function binarySearch<T: Comparable<any>> (elements: T[], x: T, left: number, right: number): number {
	const middle = parseInt((left + right) / 2)
	const result = x.compareTo(elements[middle])

	if (left > right) return -1
	
	if (result < 0) {
		return binarySearch(elements, x, left, middle - 1)
	} else if (result > 0) {
		return binarySearch(elements, x, middle + 1, right)
	} else if (result == 0) {
		return middle;
	}
}

console.log(binarySearch([new N(25), new N(30) ], new N(33), 0, 1))
