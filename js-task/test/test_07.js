const fp = require("../FP_functions.js");

QUnit.test("implementation of 7-th task using filter and fold functions", function(assert) {
    const evenElem = current => !(current % 2);
    const avg = (a, b, i, arr) => a + b / arr.length; //or find normal sum and divide by array lenght in the end

    const array = [1, 23, 2, 6, 12, 0];
    let filtered = fp.filter(array, evenElem);
    let answer = fp.fold(filtered, avg, 0);

    assert.equal(answer, 5, "filter([1, 23, 2, 6, 12, 0], evenElem) -> fold([2, 6, 12, 0], avg, 0) -> 5");
});