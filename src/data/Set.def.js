/*global giant */
giant.postpone(giant, 'Set', function () {
    "use strict";

    var base = giant.Hash,
        self = base.extend(),
        hOP = Object.prototype.hasOwnProperty;

    /**
     * Instantiates class.
     * @name giant.Set.create
     * @function
     * @param {object} items
     * @returns {giant.Set}
     */

    /**
     * Hash-based structure for performing standard set operations such as union, intersection, and difference.
     * @class
     * @extends giant.Hash
     */
    giant.Set = self
        .addMethods(/** @lends giant.Set# */{
            /**
             * Retrieves intersection of two sets.
             * @param {giant.Set} remoteSet
             * @returns {giant.Set} New set instance with items present in both current and remote set.
             */
            intersectWith: function (remoteSet) {
                $assertion.isSet(remoteSet, "Invalid set");

                var currentItems = this.items,
                    remoteItems = remoteSet.items,
                    resultItems = currentItems instanceof Array ? [] : {},
                    itemKey;

                for (itemKey in currentItems) {
                    if (hOP.call(currentItems, itemKey) &&
                        hOP.call(remoteItems, itemKey)) {
                        resultItems[itemKey] = currentItems[itemKey];
                    }
                }

                return this.getBase().create(resultItems);
            },

            /**
             * Extracts symmetric difference of two sets.
             * @param {giant.Set} remoteSet
             * @returns {giant.Set} New set instance with elements only present in either current or remote set.
             */
            differenceWith: function (remoteSet) {
                return this
                    .unionWith(remoteSet)
                    .subtract(this.intersectWith(remoteSet));
            },

            /**
             * Unites two sets.
             * @param {giant.Set} remoteSet
             * @returns {giant.Set} New set instance with items from both current and remote sets.
             */
            unionWith: function (remoteSet) {
                $assertion.isSet(remoteSet, "Invalid set");

                var resultItems = giant.DataUtils.shallowCopy(this.items),
                    currentItems = this.items,
                    remoteItems = remoteSet.items,
                    itemKey;

                for (itemKey in remoteItems) {
                    if (hOP.call(remoteItems, itemKey) && !hOP.call(currentItems, itemKey)) {
                        resultItems[itemKey] = remoteItems[itemKey];
                    }
                }

                return this.getBase().create(resultItems);
            },

            /**
             * Retrieves relative complement of two sets (A\B).
             * @param {giant.Set} remoteSet
             * @returns {giant.Set} New set instance with items from current instance except what's also present in
             * remote set.
             */
            subtract: function (remoteSet) {
                $assertion.isSet(remoteSet, "Invalid set");

                var currentItems = this.items,
                    remoteItems = remoteSet.items,
                    resultItems = currentItems instanceof Array ? [] : {},
                    itemKey;

                for (itemKey in currentItems) {
                    if (hOP.call(currentItems, itemKey) && !hOP.call(remoteItems, itemKey)) {
                        resultItems[itemKey] = currentItems[itemKey];
                    }
                }

                return this.getBase().create(resultItems);
            },

            /**
             * Retrieves relative complement of two sets (B\A).
             * @param {giant.Set} remoteSet
             * @returns {giant.Set} New set instance with items from remote instance except what's also present in
             * current set.
             */
            subtractFrom: function (remoteSet) {
                $assertion.isSet(remoteSet, "Invalid set");

                var currentItems = this.items,
                    remoteItems = remoteSet.items,
                    resultItems = currentItems instanceof Array ? [] : {},
                    itemKey;

                for (itemKey in remoteItems) {
                    if (hOP.call(remoteItems, itemKey) && !hOP.call(currentItems, itemKey)) {
                        resultItems[itemKey] = remoteItems[itemKey];
                    }
                }

                return this.getBase().create(resultItems);
            }
        });
});

giant.amendPostponed(giant, 'Hash', function () {
    "use strict";

    giant.Hash.addMethods(/** @lends giant.Hash# */{
        /**
         * Reinterprets hash as a string dictionary.
         * @returns {giant.Set}
         */
        toSet: function () {
            return giant.Set.create(this.items);
        }
    });
});

(function () {
    "use strict";

    $assertion.addTypes(/** @lends giant */{
        isSet: function (expr) {
            return giant.Set.isBaseOf(expr);
        },

        isSetOptional: function (expr) {
            return typeof expr === 'undefined' ||
                giant.Set.isBaseOf(expr);
        }
    });

    giant.extendBuiltIn(Array.prototype, /** @lends Array# */{
        /**
         * Creates a new Set instance based on the current array.
         * @returns {giant.Set}
         */
        toSet: function () {
            return giant.Set.create(this);
        }
    });
}());
