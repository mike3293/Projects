const fp = require("../FP_functions.js");

QUnit.test("filter() work with callback which have one parameter", function(assert) {
    const moreThan5 = curr => curr > 5;

    assert.deepEqual(fp.filter([8, 5, 3, 6], moreThan5), [8, 6], "filter([8, 5, 3, 6], moreThan5) return [8, 6]");
});
QUnit.test("filter() work with callback which have two parameters", function(assert) {
    const evenIndex = (curr, index) => !(index % 2);

    assert.deepEqual(fp.filter([1, 2, 3, 4, 5, 6, 7], evenIndex), [1, 3, 5, 7], "filter([1, 2, 3, 4, 5, 6, 7], evenIndex) return [1, 3, 5, 7]");
});
QUnit.test("filter() throw errors if args are not ok", function(assert) {
    assert.throws(() => fp.filter([1], null), "throw error if callback is not a function");
    assert.throws(() => fp.filter(null, moreThan5), "throw error if array is not an Array object");
    assert.throws(() => fp.filter([], moreThan5), "throw error if array is empty");
});