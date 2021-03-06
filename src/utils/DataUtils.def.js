$oop.postpone($data, 'DataUtils', function () {
    "use strict";

    var hOP = Object.prototype.hasOwnProperty;

    /**
     * @class
     * @extends $oop.Base
     */
    $data.DataUtils = $oop.Base.extend()
        .addMethods(/** @lends $data.DataUtils */{
            /**
             * Determines whether an object has any enumerable
             * properties.
             * @param {object} obj
             * @returns {boolean}
             */
            isEmptyObject: function (obj) {
                var key;
                for (key in obj) {
                    if (hOP.call(obj, key)) {
                        return false;
                    }
                }
                return true;
            },

            /**
             * Determines whether an object has exactly one
             * enumerable property.
             * @param {object} obj
             * @returns {boolean}
             */
            isSingularObject: function (obj) {
                var count = 0,
                    key;
                for (key in obj) {
                    if (hOP.call(obj, key) && ++count > 1) {
                        return false;
                    }
                }
                return count === 1;
            },

            /**
             * Creates a shallow copy of an object.
             * Property names will be copied, but property values
             * will point to the original references.
             * @param {object|Array} original
             * @returns {object|Array} shallow copy of original
             */
            shallowCopy: function (original) {
                var propertyNames,
                    i, propertyName,
                    result;

                if (original instanceof Array) {
                    // shorthand for arrays
                    result = original.concat([]);
                } else if (typeof original === 'object') {
                    propertyNames = Object.getOwnPropertyNames(original);
                    result = {};
                    for (i = 0; i < propertyNames.length; i++) {
                        propertyName = propertyNames[i];
                        result[propertyName] = original[propertyName];
                    }
                } else {
                    result = original;
                }

                return result;
            }
        });
});
