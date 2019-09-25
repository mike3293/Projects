import fp from '../FP_functions.js';

const sum = function(a, b, c, d) {
    return a + b + c + d;
}
const b = fp.curry(sum);
const c = b(1)(2);
const d = c(3);

export default QUnit.module("curry()", function() {
    QUnit.test("fp.curry(sum) return function", function(assert) {
        assert.ok(typeof b === "function", "b is a function");
    });

    QUnit.test("b(1)(2) return function", function(assert) {
        assert.ok(typeof c === "function", "c is a function");
    });

    QUnit.test("c(3) return function", function(assert) {
        assert.ok(typeof d === "function", "d is a function");
    });

    QUnit.test("curry(sum)(1)(2)(3) returned function test with d(4) and d(5)", function(assert) {
        assert.equal(d(4), 10, "d(4) = 10");
        assert.equal(d(5), 11, "d(5) = 11");
    });
    QUnit.test("curry() throw error if argument of curry is not a function", function(assert) {
        assert.throws(() => fp.curry(), "throw error");
    });
});