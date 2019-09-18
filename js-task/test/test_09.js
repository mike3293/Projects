const fp = require("../FP_functions.js");

QUnit.test("first() work", function(assert) {
    const moreThan6 = curr => curr > 6;
    assert.equal(fp.first([3, 5, 8, 7], moreThan6), 8, "first([3, 5, 8, 7], moreThan6) return 8");
});
QUnit.test("first() throw errors if args are not ok", function(assert) {
    assert.throws(() => fp.first([1], null), "throw error if callback is not a function");
    assert.throws(() => fp.first(null, moreThan6), "throw error if array is not an Array object");
    assert.throws(() => fp.first([], moreThan6), "throw error if array is empty");
});