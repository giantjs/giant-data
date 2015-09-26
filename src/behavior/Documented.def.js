$oop.postpone($data, 'Documented', function () {
    "use strict";

    var base = $oop.Base,
        self = base.extend();

    /**
     * @name $data.Documented.create
     * @function
     * @returns {$data.Documented}
     */

    /**
     * Documented trait. Adds meta information to the class, including class name, namespace, and instance ID.
     * @class
     * @extends $oop.Base
     */
    $data.Documented = self
        .addPublic(/** @lends $data.Documented */{
            /**
             * Next instance ID.
             * @type {number}
             */
            nextInstanceId: 0
        })
        .addMethods(/** @lends $data.Documented# */{
            /**
             * Extends class adding meta information.
             * @param {string} className Class name
             * @returns {$oop.Base}
             */
            extend: function (className) {
                $assertion.isString(className, "Invalid class name");

                var result = /** @type {$data.Documented} */ base.extend.call(this);

                result.addConstants(/** @lends $data.Documented */{
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
