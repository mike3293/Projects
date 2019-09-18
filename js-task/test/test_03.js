import fp from '../FP_functions.js';

const sum2 = (a, b) => { return a + b; }

QUnit.test("fold() work with initialValue", function(assert) {
    assert.equal(fp.fold([1, 2, 3], sum2, 4), 10, "fold([1, 2, 3], sum, 4) = 10");
});
QUnit.test("fold() work without initialValue", function(assert) {
    assert.equal(fp.fold([1, 2, 3], sum2), 6, "fold([1, 2, 3], sum) = 6");
});
QUnit.test("fold() throw errors if args are not ok", function(assert) {
    assert.throws(() => fp.fold([1], null), "throw error if callback of fold is not a function");
    assert.throws(() => fp.fold(null, sum2), "throw error if array of fold is not an Array object");
    assert.throws(() => fp.fold([], sum2), "throw error if array is empty");
});