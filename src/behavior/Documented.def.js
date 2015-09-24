/*global giant */
$oop.postpone(giant, 'Documented', function () {
    "use strict";

    var base = $oop.Base,
        self = base.extend();

    /**
     * @name giant.Documented.create
     * @function
     * @returns {giant.Documented}
     */

    /**
     * Documented trait. Adds meta information to the class, including class name, namespace, and instance ID.
     * @class
     * @extends $oop.Base
     */
    giant.Documented = self
        .addPublic(/** @lends giant.Documented */{
            /**
             * Next instance ID.
             * @type {number}
             */
            nextInstanceId: 0
        })
        .addMethods(/** @lends giant.Documented# */{
            /**
             * Extends class adding meta information.
             * @param {string} className Class name
             * @returns {$oop.Base}
             */
            extend: function (className) {
                $assertion.isString(className, "Invalid class name");

                var result = /** @type {giant.Documented} */ base.extend.call(this);

                result.addConstants(/** @lends giant.Documented */{
                    /**
                     * @type {string}
                     */
                    className: className
                });

                return result;
            },

            /**
             * @ignore
             */
            init: function () {
                /**
                 * Instance ID.
                 * @type {number}
                 */
                this.instanceId = self.nextInstanceId++;
            }
        });
});
