/*global giant */
giant.postpone(giant, 'DateCollection', function () {
    "use strict";

    /**
     * @name giant.DateCollection.create
     * @function
     * @param {object} [items] Initial contents.
     * @returns {giant.DateCollection}
     */

    /**
     * General collection for managing multiple date objects.
     * @class giant.DateCollection
     * @extends giant.Collection
     * @extends Date
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
     */
    giant.DateCollection = giant.Collection.of(Date);
});

giant.amendPostponed(giant, 'Hash', function () {
    "use strict";

    giant.Hash.addMethods(/** @lends giant.Hash# */{
        /**
         * Reinterprets hash as date collection.
         * @returns {giant.DateCollection}
         */
        toDateCollection: function () {
            return giant.DateCollection.create(this.items);
        }
    });
});

(function () {
    "use strict";

    giant.extendBuiltIn(Array.prototype, /** @lends Array# */{
        /**
         * Creates a new DateCollection instance based on the current array.
         * @returns {giant.DateCollection}
         */
        toDateCollection: function () {
            return giant.DateCollection.create(this);
        }
    });
}());
