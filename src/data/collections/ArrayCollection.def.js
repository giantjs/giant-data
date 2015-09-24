/*global giant */
$oop.postpone(giant, 'ArrayCollection', function () {
    "use strict";

    /**
     * @name giant.ArrayCollection.create
     * @function
     * @param {object} [items] Initial contents.
     * @returns {giant.ArrayCollection}
     */

    /**
     * General collection for managing multiple arrays.
     * @class giant.ArrayCollection
     * @extends giant.Collection
     * @extends Array
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
     */
    giant.ArrayCollection = giant.Collection.of(Array);
});

$oop.amendPostponed(giant, 'Hash', function () {
    "use strict";

    giant.Hash.addMethods(/** @lends giant.Hash# */{
        /**
         * Reinterprets hash as array collection.
         * @returns {giant.ArrayCollection}
         */
        toArrayCollection: function () {
            return giant.ArrayCollection.create(this.items);
        }
    });
});

(function () {
    "use strict";

    $oop.extendBuiltIn(Array.prototype, /** @lends Array# */{
        /**
         * Creates a new ArrayCollection instance based on the current array.
         * @returns {giant.ArrayCollection}
         */
        toArrayCollection: function () {
            return giant.ArrayCollection.create(this);
        }
    });
}());
