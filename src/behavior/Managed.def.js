/*global $data */
$oop.postpone($data, 'Managed', function (ns, className) {
    "use strict";

    var base = $data.Documented,
        self = base.extend(className);

    /**
     * @name $data.Managed.create
     * @function
     * @returns {$data.Managed}
     */

    /**
     * Managed trait, extends `Documented` trait with a dynamic instance registry.
     * @class
     * @extends $data.Documented
     */
    $data.Managed = self
        .addPublic(/** @lends $data.Managed */{
            instanceRegistry: $data.Collection.create()
        })
        .addMethods(/** @lends $data.Managed# */{
            /**
             * @ignore
             */
            init: function () {
                base.init.call(this);
                this.addToRegistry();
            },

            /**
             * Adds instance to registry.
             * @returns {$data.Managed}
             */
            addToRegistry: function () {
                self.instanceRegistry.setItem(this.instanceId, this);
                return this;
            },

            /**
             * Removes instance from registry.
             * @returns {$data.Managed}
             */
            removeFromRegistry: function () {
                self.instanceRegistry.deleteItem(this.instanceId);
                return this;
            },

            /**
             * Prepares instance for garbage collection. Call it before disposing of instance in order to avoid
             * memory leaks.
             * @example
             * MyManaged = $oop.Base.extend()
             *   .addTrait($data.Managed)
             *   .addMethods({
             *       init: function () {$data.Managed.init.call(this);}
             *   });
             * instance = MyManaged.create(); // instance will be added to registry
             * instance.destroy(); // cleans up
             * @returns {$data.Managed}
             */
            destroy: function () {
                this.removeFromRegistry();
                return this;
            },

            /**
             * Fetches instance by ID.
             * @param {number|string} instanceId
             * @returns {$data.Managed}
             * @memberOf $data.Managed
             */
            getInstanceById: function (instanceId) {
                return self.instanceRegistry.getItem(instanceId);
            }
        });
});
