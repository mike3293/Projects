const fp = require("../FP_functions.js");

QUnit.test("memo() work", function(assert) {
    let factorial = n => {
        if (n > 1) {
            return n * factorial(n - 1);
        }
        return n;
    }
    factorial = fp.memo(factorial);

    assert.ok(typeof factorial === "function", "factorial after memo() is a function");
    assert.equal(factorial(5), 120, "factorial(5) return 120");
});
QUnit.test("memo() throw", function(assert) {
    assert.throws(() => fp.memo(null), "throw error if first arg is not a function");
});