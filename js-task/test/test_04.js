const fp = require("../FP_functions.js");

QUnit.test("unfold() work", function(assert) {
    const arr10 = current => {
        if (current <= 30) {
            return [current, current + 10];
        } else return false;
    }

    assert.deepEqual(fp.unfold(arr10, 0), [0, 10, 20, 30], "unfold(arr10, 0) return [0, 10, 20, 30]");
});
QUnit.test("unfold() throw errors if args are not ok", function(assert) {
    assert.throws(() => fp.unfold(null, 0), "throw error if callback is not a function");
    assert.throws(() => fp.unfold(arr10, undefined), "throw error if initialValue is not a number");
});