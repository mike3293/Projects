import fp from '../FP_functions.js';

export default QUnit.module("Random", function() {
    QUnit.test("implementation of 8-th task using unfold and fold functions", function(assert) {
        const randArrFoo = (current, array) => {
            if (array.length < 10) {
                return [current, Math.floor(Math.random() * 10)];
            } else return false;
        }
        const sumFoo = (a, b) => { return a + b; }

        const randArr = fp.unfold(randArrFoo, 2);
        const sum = fp.fold(randArr, sumFoo);

        assert.ok(sum, `${randArr.join(' + ')} = ${sum}`);
    });
});