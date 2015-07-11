/*global giant */
giant.postpone(giant, 'StringCollection', function () {
    "use strict";

    /**
     * @name giant.StringCollection.create
     * @function
     * @param {object} [items] Initial contents.
     * @returns {giant.StringCollection}
     */

    /**
     * General collection for managing multiple strings.
     * @class giant.StringCollection
     * @extends giant.Collection
     * @extends String
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
     */
    giant.StringCollection = giant.Collection.of(String);
});

giant.amendPostponed(giant, 'Hash', function () {
    "use strict";

    giant.Hash.addMethods(/** @lends giant.Hash# */{
        /**
         * Reinterprets hash as string collection.
         * @returns {giant.StringCollection}
         */
        toStringCollection: function () {
            return giant.StringCollection.create(this.items);
        }
    });
});

(function () {
    "use strict";

    giant.Properties.addProperties.call(
        Array.prototype,
        /** @lends Array# */{
            /**
             * Creates a new StringCollection instance based on the current array.
             * @returns {giant.StringCollection}
             */
            toStringCollection: function () {
                return giant.StringCollection.create(this);
            }
        },
        false, false, false);
}());
