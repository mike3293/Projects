const fp = require("../FP_functions.js");

const sum3 = (x, y, z) => x + y + z;

function sum5(a, b, c, d, f) {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

QUnit.test("curry() return function", function(assert) {

    assert.ok(typeof fp.curry(sum3) === "function", "curry(sum3) is a function");
});
QUnit.test("curry() work with 3 args", function(assert) {
    assert.equal(fp.curry(sum3)(2)(1)(5), 8, "curry(sum3)(2)(1)(5) = 8");
});
QUnit.test("curry() work with 5 args", function(assert) {
    assert.equal(fp.curry(sum5)(2)(1)(5)(1)(1), 10, "curry(sum5)(2)(1)(5)(1)(1) = 10");
});
QUnit.test("curry() throw", function(assert) {
    assert.throws(() => fp.curry(), "throw error if argument of curry is not a function");
});