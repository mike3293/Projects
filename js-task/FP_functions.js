// bind()
function partial(...args) {
    const foo = args.pop();

    if (typeof foo !== 'function') {
        throw new TypeError(foo + ' is not a function');
    }

    return (...moreArgs) => {
        return foo(...args.concat(moreArgs));
    }
}

function curry(foo) {
    if (typeof foo !== 'function') {
        throw new TypeError(foo + ' is not a function');
    }

    const arity = foo.length;

    return function innerFunction(...args) {
        if (args.length >= arity) {
            return foo(...args);
        } else {
            return (a) => {
                args.push(a);
                return innerFunction(...args);
            }
        }
    }
}

//reduce()
function fold(array, callback, initialValue) {
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
    if (initialValue === undefined) {
        accum = array[0];
        i = 1;
    } else if (!isNaN(initialValue)) {
        accum = initialValue;
        i = 0;
    } else {
        throw new TypeError(initialValue + ' is not a number');
    }

    for (; i < array.length; i++) {
        accum = callback(accum, array[i], i, array);
    }

    return accum;
}

function unfold(callback, initialValue) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    if (isNaN(initialValue)) {
        throw new TypeError(initialValue + ' is not a number');
    }
    let array = [];
    let next;
    let current = initialValue;
    while (next = callback(current, array)) {
        current = next[1];
        array.push(next[0]);
    }
    return array;
}

//map()
function map(array, callback) {
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
    for (let i = 0; i < array.length; i++) {
        arrayMapped[i] = callback(array[i], i, array);
    }
    return arrayMapped;
}

function filter(array, callback) {
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
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            arrayFiltered.push(array[i]);
        }
    }
    return arrayFiltered;
}

function first(array, callback) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    if (!Array.isArray(array)) {
        throw new TypeError(array + ' is not an Array object');
    }
    if (array.length == 0) {
        throw new TypeError('array is empty');
    }

    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return array[i];
        }
    }
}

function lazy(foo, ...args) {
    if (typeof foo !== 'function') {
        throw new TypeError(foo + ' is not a function');
    }
    let result;
    let processed = false;

    return function() {
        if (processed) { return result; }
        result = foo(...args);
        processed = true;
        return result;
    }
}

// memoization
function memo(foo) {
    if (typeof foo !== 'function') {
        throw new TypeError(foo + ' is not a function');
    }
    const storage = {};

    return function(n) {
        if (n in storage) {
            return storage[n];
        } else {
            let result = foo(n);
            storage[n] = result;

            return result;
        }
    }
}