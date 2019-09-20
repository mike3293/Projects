const fp = {};
export default fp;

// bind()
fp.partial = function(...args) {
    const functionPartial = args.pop();

    if (typeof functionPartial !== 'function') {
        throw new TypeError(functionPartial + ' is not a function');
    }

    return (...moreArgs) => {
        return functionPartial(...args.concat(moreArgs));
    }
}

fp.curry = function(functionToCurry) {
    if (typeof functionToCurry !== 'function') {
        throw new TypeError(functionToCurry + ' is not a function');
    }

    const arity = functionToCurry.length;

    return function innerFunction(...args) {
        if (args.length >= arity) {
            return functionToCurry(...args);
        } else {
            return (a) => {
                args.push(a);
                return innerFunction(...args);
            }
        }
    }
}

//reduce()
fp.fold = function(array, callback, initialValue) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    if (!Array.isArray(array)) {
        throw new TypeError(array + ' is not an Array object');
    }
    if (array.length == 0) {
        throw new TypeError('array is empty');
    }

    let i;
    let accum;
    const arrForMap = array.slice();

    if (initialValue === undefined) {
        accum = arrForMap.shift();
        i = 1;
    } else if (!isNaN(initialValue)) {
        accum = initialValue;
        i = 0;
    }

    function callbackForMap(arrayI, i, arrForMap) {
        accum = callback(accum, arrayI, i, arrForMap);
    }

    fp.map(arrForMap, callbackForMap);

    return accum;
}

fp.unfold = function(callback, initialValue) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    if (isNaN(initialValue)) {
        throw new TypeError(initialValue + ' is not a number');
    }
    let array = [];
    let next;
    let current = initialValue;

    (function repeat() {
        if (next = callback(current, array)) {
            current = next[1];
            array.push(next[0]);
            repeat();
        }
    })();

    return array;
}

//map()
fp.map = function(array, callback) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    if (!Array.isArray(array)) {
        throw new TypeError(array + ' is not an Array object');
    }
    if (array.length == 0) {
        throw new TypeError('array is empty');
    }

    let arrayMapped = [];

    (function repeat(i) {
        arrayMapped[i] = callback(array[i], i, array);
        if (i < array.length - 1) repeat(++i);
    })(0);

    return arrayMapped;
}

fp.filter = function(array, callback) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    if (!Array.isArray(array)) {
        throw new TypeError(array + ' is not an Array object');
    }
    if (array.length == 0) {
        throw new TypeError('array is empty');
    }

    let arrayFiltered = [];

    (function repeat(i) {
        if (callback(array[i], i, array)) {
            arrayFiltered.push(array[i]);
        }
        if (i < array.length - 1) repeat(++i);
    })(0);

    return arrayFiltered;
}

fp.first = function(array, callback) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    if (!Array.isArray(array)) {
        throw new TypeError(array + ' is not an Array object');
    }
    if (array.length == 0) {
        throw new TypeError('array is empty');
    }

    let firstArg;

    (function repeat(i) {
        if (callback(array[i], i, array)) {
            firstArg = array[i];
            return;
        }
        if (i < array.length - 1) repeat(++i);
    })(0);

    return firstArg;
}

fp.lazy = function(functionToBeLazy, ...args) {
    if (typeof functionToBeLazy !== 'function') {
        throw new TypeError(functionToBeLazy + ' is not a function');
    }

    let result;
    let processed = false;

    return function() {
        if (processed) { return result; }
        result = functionToBeLazy(...args);
        processed = true;
        return result;
    }
}

// memoization
fp.memo = function(functionToBeMemorized) {
    if (typeof functionToBeMemorized !== 'function') {
        throw new TypeError(functionToBeMemorized + ' is not a function');
    }
    const storage = {};

    return function(n) {
        if (n === undefined) {
            throw new TypeError(n + 'argument is undefined');
        }
        if (isNaN(n)) {
            throw new TypeError(n + 'argument is NaN');
        }
        if (n in storage) {
            return storage[n];
        } else {
            let result = functionToBeMemorized(n);
            storage[n] = result;

            return result;
        }
    }
}