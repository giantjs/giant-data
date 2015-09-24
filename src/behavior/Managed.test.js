/*global $data */
(function () {
    "use strict";

    module("Managed");

    var base = $oop.Base.extend()
            .addTrait($data.Managed)
            .addMethods({
                init: function () {$data.Managed.init.call(this);}
            }),
        MyManaged = base
            .extend('MyManaged')
            .addMethods({
                init: function () {
                    base.init.call(this);
                }
            });

    test("Instantiation", function () {
        var nextInstanceId = $data.Documented.nextInstanceId,
            myInstance = MyManaged.create();

        equal($data.Documented.nextInstanceId, nextInstanceId + 1);
        equal(myInstance.instanceId, nextInstanceId);
    });

    test("Registering", function () {
        var myInstance = MyManaged.create(),
            instanceId = myInstance.instanceId,
            result;

        result = myInstance.addToRegistry();

        strictEqual(result, myInstance, "Registry addition is chainable");
        strictEqual($data.Managed.instanceRegistry.getItem(instanceId), myInstance, "Instance stored");

        result = myInstance.removeFromRegistry();
        strictEqual(result, myInstance, "Registry removal is chainable");

        ok(!$data.Managed.instanceRegistry.getItem(instanceId), "Instance not in registry");

        result = myInstance.addToRegistry();

        strictEqual(result, myInstance, "Registry addition is chainable");
        strictEqual($data.Managed.instanceRegistry.getItem(instanceId), myInstance, "Removed instance stored again");
    });

    test("Fetching instance", function () {
        var myInstance = MyManaged.create(),
            instanceId = myInstance.instanceId;

        strictEqual($data.Managed.getInstanceById(instanceId), myInstance, "Instance fetched");

        myInstance.removeFromRegistry();

        strictEqual(typeof $data.Managed.getInstanceById(instanceId), 'undefined', "Fetches nothing");
    });

    test("Destroy", function () {
        expect(1);

        var managed = $data.Managed.create();

        $data.Managed.addMocks({
            removeFromRegistry: function () {
                ok(true, "Removal called");
                return this;
            }
        });

        managed.destroy();

        $data.Managed.removeMocks();
    });
}());
