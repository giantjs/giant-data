(function () {
    "use strict";

    module("Documented");

    test("Instantiation", function () {
        throws(function () {
            $oop.Base.extend()
                .addTrait($data.Documented)
                .extend();
        }, "Invalid class name");

        var MyDocumented = $oop.Base.extend()
                .addTrait($data.Documented)
                .extend('MyDocumented')
                .addMethods({
                    init: function () { $data.Documented.init.call(this); }
                }),
            nextInstanceId = $data.Documented.nextInstanceId,
            myInstance;

        equal(MyDocumented.className, 'MyDocumented', "Class name");

        myInstance = MyDocumented.create();

        equal(myInstance.instanceId, nextInstanceId, "Assigned instance ID");

        equal($data.Documented.nextInstanceId, nextInstanceId + 1, "Incremented instance ID");
    });
}());
