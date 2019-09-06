QUnit.test("F()", function(assert) {
    assert.equal(F(1, G)(2, 3), 6, "3 variables sum");
});