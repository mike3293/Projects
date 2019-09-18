const fp = require("../FP_functions.js");

const sum = (a, b) => { return a + b; }

const lazyFold = fp.lazy(fp.fold, [1, 2, 3], sum, 4);

QUnit.test("lazyFold() is a function", function(assert) {
    assert.ok(typeof lazyFold === "function", "lazyFold is a function");
});

QUnit.test("lazy() work", function(assert) {
    assert.equal(lazyFold(), fp.fold([1, 2, 3], sum, 4), "result of lazyFold() and fold([1, 2, 3], sum, 4) is the same");
});

QUnit.test("lazy() throw errors if args are not ok", function(assert) {
    assert.throws(() => fp.lazy(null), "throw error if first arg is not a function");
});