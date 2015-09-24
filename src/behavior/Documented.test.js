/*global giant */
(function () {
    "use strict";

    module("Documented");

    test("Instantiation", function () {
        throws(function () {
            $oop.Base.extend()
                .addTrait(giant.Documented)
                .extend();
        }, "Invalid class name");

        var MyDocumented = $oop.Base.extend()
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
