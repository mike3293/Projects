const fp = require("../FP_functions.js");

const sum = function(a, b, c, d) {
    return a + b + c + d;
}
const b = fp.curry(sum);
const c = b(1)(2);
const d = c(3);

QUnit.test("fp.curry(sum) return function", function(assert) {
    assert.ok(typeof b === "function", "b is a function");
});

QUnit.test("b(1)(2) return function", function(assert) {
    assert.ok(typeof c === "function", "c is a function");
});

QUnit.test("c(3) return function", function(assert) {
    assert.ok(typeof d === "function", "d is a function");
});

QUnit.test("d(4) return number '10'", function(assert) {
    assert.equal(d(4), 10, "curry(sum5)(2)(1)(5)(1)(1) = 10");
});
QUnit.test("curry() throw error if argument of curry is not a function", function(assert) {
    assert.throws(() => fp.curry(), "throw error");
});