/*global phil, module, test, expect, ok, equal, notEqual, strictEqual, deepEqual, raises */
(function () {
    "use strict";

    module("Documented");

    test("Instantiation", function () {
        raises(function () {
            giant.Base.extend()
                .addTrait(giant.Documented)
                .extend();
        }, "Invalid class name");

        var MyDocumented = giant.Base.extend()
                .addTrait(giant.Documented)
                .extend('MyDocumented')
                .addMethods({
                    init: function () { giant.Documented.init.call(this); }
                }),
            nextInstanceId = giant.Documented.nextInstanceId,
            myInstance;

        equal(MyDocumented.className, 'MyDocumented', "Class name");

        myInstance = MyDocumented.create();

        equal(myInstance.instanceId, nextInstanceId, "Assigned instance ID");

        equal(giant.Documented.nextInstanceId, nextInstanceId + 1, "Incremented instance ID");
    });
}());
