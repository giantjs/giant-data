/*global giant */
giant.postpone(giant, 'Managed', function (ns, className) {
    "use strict";

    var base = giant.Documented,
        self = base.extend(className);

    /**
     * @name giant.Managed.create
     * @function
     * @returns {giant.Managed}
     */

    /**
     * Managed trait, extends `Documented` trait with a dynamic instance registry.
     * @class
     * @extends giant.Documented
     */
    giant.Managed = self
        .addPublic(/** @lends giant.Managed */{
            instanceRegistry: giant.Collection.create()
        })
        .addMethods(/** @lends giant.Managed# */{
            /**
             * @ignore
             */
            init: function () {
                base.init.call(this);
                this.addToRegistry();
            },

            /**
             * Adds instance to registry.
             * @returns {giant.Managed}
             */
            addToRegistry: function () {
                self.instanceRegistry.setItem(this.instanceId, this);
                return this;
            },

            /**
             * Removes instance from registry.
             * @returns {giant.Managed}
             */
            removeFromRegistry: function () {
                self.instanceRegistry.deleteItem(this.instanceId);
                return this;
            },

            /**
             * Prepares instance for garbage collection. Call it before disposing of instance in order to avoid
             * memory leaks.
             * @example
             * MyManaged = giant.Base.extend()
             *   .addTrait(giant.Managed)
             *   .addMethods({
             *       init: function () {giant.Managed.init.call(this);}
             *   });
             * instance = MyManaged.create(); // instance will be added to registry
             * instance.destroy(); // cleans up
             * @returns {giant.Managed}
             */
            destroy: function () {
                this.removeFromRegistry();
                return this;
            },

            /**
             * Fetches instance by ID.
             * @param {number|string} instanceId
             * @returns {giant.Managed}
             * @memberOf giant.Managed
             */
            getInstanceById: function (instanceId) {
                return self.instanceRegistry.getItem(instanceId);
            }
        });
});
