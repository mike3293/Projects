import fp from '../FP_functions.js';

const sum = (a, b) => { return a + b; }

let FoldCallCount = 0;

function fold(arr, func, initial) {
    FoldCallCount++;
    fp.fold(arr, func, initial);
}
const lazyFold = fp.lazy(fold, [1, 2, 3], sum, 4);

lazyFold();
lazyFold();
lazyFold();

QUnit.test("lazyFold() is a function", function(assert) {
    assert.ok(typeof lazyFold === "function", "lazyFold is a function");
});

QUnit.test("fold() was called once", function(assert) {
    assert.equal(FoldCallCount, 1, "FoldCallCount = 1");
});
QUnit.test("lazy() work", function(assert) {
    assert.equal(lazyFold(), fold([1, 2, 3], sum, 4), "result of lazyFold() and fold([1, 2, 3], sum, 4) is the same");
});

QUnit.test("lazy() throw errors if args are not ok", function(assert) {
    assert.throws(() => fp.lazy(null), "throw error if first arg is not a function");
});