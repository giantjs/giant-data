/*global phil, giant, giant, giant, module, test, expect, ok, equal, notEqual, strictEqual, deepEqual, raises */
(function () {
    "use strict";

    module("Managed");

    var base = giant.Base.extend()
            .addTrait(giant.Managed)
            .addMethods({
                init: function () {giant.Managed.init.call(this);}
            }),
        MyManaged = base
            .extend('MyManaged')
            .addMethods({
                init: function () {
                    base.init.call(this);
                }
            });

    test("Instantiation", function () {
        var nextInstanceId = giant.Documented.nextInstanceId,
            myInstance = MyManaged.create();

        equal(giant.Documented.nextInstanceId, nextInstanceId + 1);
        equal(myInstance.instanceId, nextInstanceId);
    });

    test("Registering", function () {
        var myInstance = MyManaged.create(),
            instanceId = myInstance.instanceId,
            result;

        result = myInstance.addToRegistry();

        strictEqual(result, myInstance, "Registry addition is chainable");
        strictEqual(giant.Managed.instanceRegistry.getItem(instanceId), myInstance, "Instance stored");

        result = myInstance.removeFromRegistry();
        strictEqual(result, myInstance, "Registry removal is chainable");

        ok(!giant.Managed.instanceRegistry.getItem(instanceId), "Instance not in registry");

        result = myInstance.addToRegistry();

        strictEqual(result, myInstance, "Registry addition is chainable");
        strictEqual(giant.Managed.instanceRegistry.getItem(instanceId), myInstance, "Removed instance stored again");
    });

    test("Fetching instance", function () {
        var myInstance = MyManaged.create(),
            instanceId = myInstance.instanceId;

        strictEqual(giant.Managed.getInstanceById(instanceId), myInstance, "Instance fetched");

        myInstance.removeFromRegistry();

        strictEqual(typeof giant.Managed.getInstanceById(instanceId), 'undefined', "Fetches nothing");
    });

    test("Destroy", function () {
        expect(1);

        var managed = giant.Managed.create();

        giant.Managed.addMocks({
            removeFromRegistry: function () {
                ok(true, "Removal called");
                return this;
            }
        });

        managed.destroy();

        giant.Managed.removeMocks();
    });
}());
