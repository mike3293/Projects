const fp = require("../FP_functions.js");

QUnit.test("map() work", function(assert) {
    const arrSq = curr => curr ** 2;
    assert.deepEqual(fp.map([1, 2, 3, 4], arrSq), [1, 4, 9, 16], "map([1, 2, 3, 4], arrSq) return [1, 4, 9, 16]");
});
QUnit.test("map() throw errors if args are not ok", function(assert) {
    assert.throws(() => fp.map([1], null), "throw error if callback is not a function");
    assert.throws(() => fp.map(null, arrSq), "throw error if array is not an Array object");
    assert.throws(() => fp.map([], arrSq), "throw error if array is empty");
});