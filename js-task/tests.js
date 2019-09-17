const fp = require('./FP_functions.js');

const sum = (...args) => {
    let sum = 0;
    for (let i = 0; i < args.length; i++) {
        sum += args[i];
    }
    return sum;
}
QUnit.test("partial() return function", function(assert) {
    assert.ok(typeof fp.partial(sum) === "function", "partial(sum) is a function");
});
QUnit.test("partial() normal work", function(assert) {
    assert.equal(fp.partial(1, sum)(2, 3), 6, "partial(1, sum)(2, 3) = 6");
});
QUnit.test("partial() work without part of parameters", function(assert) {
    assert.equal(fp.partial(2, 3, sum)(), 5, "partial(2, 3, sum)() = 5");
});
QUnit.test("partial() get only function", function(assert) {
    assert.equal(fp.partial(sum)(), 0, "partial(sum)() = 0 (sum)");
});
QUnit.test("partial() throw", function(assert) {
    assert.throws(() => fp.partial(2, null)(), "throw error if last arg of partial is not a function");
});


const sum3 = (x, y, z) => x + y + z;

function sum5(a, b, c, d, f) {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

QUnit.test("curry() return function", function(assert) {

    assert.ok(typeof curry(sum3) === "function", "curry(sum3) is a function");
});
QUnit.test("curry() work with 3 args", function(assert) {
    assert.equal(curry(sum3)(2)(1)(5), 8, "curry(sum3)(2)(1)(5) = 8");
});
QUnit.test("curry() work with 5 args", function(assert) {
    assert.equal(curry(sum5)(2)(1)(5)(1)(1), 10, "curry(sum5)(2)(1)(5)(1)(1) = 10");
});
QUnit.test("curry() throw", function(assert) {
    assert.throws(() => curry(), "throw error if argument of curry is not a function");
});


const sum2 = (a, b) => { return a + b; }
QUnit.test("fold() work with initialValue", function(assert) {
    assert.equal(fold([1, 2, 3], sum2, 4), 10, "fold([1, 2, 3], sum, 4) = 10");
});
QUnit.test("fold() work without initialValue", function(assert) {
    assert.equal(fold([1, 2, 3], sum2, 4), 10, "fold([1, 2, 3], sum) = 6");
});
QUnit.test("fold() throws", function(assert) {
    assert.throws(() => fold([1], null), "throw error if callback of fold is not a function");
    assert.throws(() => fold(null, sum2), "throw error if array of fold is not an Array object");
    assert.throws(() => fold([], sum2), "throw error if array is empty");
    assert.throws(() => fold([1], sum2, "string"), "throw error if initialValue of fold is not a number");
});


QUnit.test("unfold() work", function(assert) {
    const arr10 = current => {
        if (current <= 30) {
            return [current, current + 10];
        } else return false;
    }

    assert.deepEqual(unfold(arr10, 0), [0, 10, 20, 30], "unfold(arr10, 0) return [0, 10, 20, 30]");
});
QUnit.test("unfold() throws", function(assert) {
    assert.throws(() => unfold(null, 0), "throw error if callback is not a function");
    assert.throws(() => unfold(arr10, undefined), "throw error if initialValue is not a number");
});


QUnit.test("map() work", function(assert) {
    const arrSq = curr => curr ** 2;
    assert.deepEqual(map([1, 2, 3, 4], arrSq), [1, 4, 9, 16], "map([1, 2, 3, 4], arrSq) return [1, 4, 9, 16]");
});
QUnit.test("map() throws", function(assert) {
    assert.throws(() => map([1], null), "throw error if callback is not a function");
    assert.throws(() => map(null, arrSq), "throw error if array is not an Array object");
    assert.throws(() => map([], arrSq), "throw error if array is empty");
});


QUnit.test("filter() work with callback which have one parameter", function(assert) {
    const moreThan5 = curr => curr > 5;

    assert.deepEqual(filter([8, 5, 3, 6], moreThan5), [8, 6], "filter([8, 5, 3, 6], moreThan5) return [8, 6]");
});
QUnit.test("filter() work with callback which have two parameters", function(assert) {
    const evenIndex = (curr, index) => !(index % 2);

    assert.deepEqual(filter([1, 2, 3, 4, 5, 6, 7], evenIndex), [1, 3, 5, 7], "filter([1, 2, 3, 4, 5, 6, 7], evenIndex) return [1, 3, 5, 7]");
});
QUnit.test("filter() throws", function(assert) {
    assert.throws(() => filter([1], null), "throw error if callback is not a function");
    assert.throws(() => filter(null, moreThan5), "throw error if array is not an Array object");
    assert.throws(() => filter([], moreThan5), "throw error if array is empty");
});


QUnit.test("implementation of 7-th task using filter and fold functions", function(assert) {
    const evenElem = current => !(current % 2);
    const avg = (a, b, i, arr) => a + b / arr.length; //or find normal sum and divide by array lenght in the end

    const array = [1, 23, 2, 6, 12, 0];
    let filtered = filter(array, evenElem);
    let answer = fold(filtered, avg, 0);

    assert.equal(answer, 5, "filter([1, 23, 2, 6, 12, 0], evenElem) -> fold([2, 6, 12, 0], avg, 0) -> 5");
});


QUnit.test("implementation of 8-th task using unfold and fold functions", function(assert) {
    const randArrFoo = (current, array) => {
        if (array.length < 10) {
            return [current, Math.floor(Math.random() * 10)];
        } else return false;
    }
    const sumFoo = (a, b) => { return a + b; }

    const randArr = unfold(randArrFoo, 2);
    const sum = fold(randArr, sumFoo);

    assert.ok(sum, `${randArr.join(' + ')} = ${sum}`);
});


QUnit.test("first() work", function(assert) {
    const moreThan6 = curr => curr > 6;
    assert.equal(first([3, 5, 8, 7], moreThan6), 8, "first([3, 5, 8, 7], moreThan6) return 8");
});
QUnit.test("first() throws", function(assert) {
    assert.throws(() => first([1], null), "throw error if callback is not a function");
    assert.throws(() => first(null, moreThan6), "throw error if array is not an Array object");
    assert.throws(() => first([], moreThan6), "throw error if array is empty");
});


QUnit.test("lazy() work", function(assert) {
    const sum = (a, b) => { return a + b; }

    const lazyFold = lazy(fold, [1, 2, 3], sum, 4);

    assert.ok(typeof lazyFold === "function", "lazyFold is a function");
    assert.equal(lazyFold(), fold([1, 2, 3], sum, 4), "result of lazyFold() and fold([1, 2, 3], sum, 4) is the same");
});

QUnit.test("lazy() throw", function(assert) {
    assert.throws(() => lazy(null), "throw error if first arg is not a function");
});


QUnit.test("memo() work", function(assert) {
    let factorial = n => {
        if (n > 1) {
            return n * factorial(n - 1);
        }
        return n;
    }
    factorial = memo(factorial);

    assert.ok(typeof factorial === "function", "factorial after memo() is a function");
    assert.equal(factorial(5), 120, "factorial(5) return 120");
});
QUnit.test("memo() throw", function(assert) {
    assert.throws(() => memo(null), "throw error if first arg is not a function");
});