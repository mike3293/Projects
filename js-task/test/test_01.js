import fp from '../FP_functions.js';

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
QUnit.test("partial() throw error if last arg is not a function", function(assert) {
    assert.throws(() => fp.partial(2, null)(), "throw error if last arg of partial is not a function");
});