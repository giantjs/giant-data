/*global giant, giant, giant */
giant.postpone(giant, 'TreeWalker', function () {
    "use strict";

    /**
     * Base class for tree walker classes.
     * Holds basic properties and state of the tree walker.
     * @class giant.TreeWalker
     * @extends giant.Base
     */
    giant.TreeWalker = giant.Base.extend()
        .addMethods(/** @lends giant.TreeWalker# */{
            /**
             * @param {function} handler
             * @ignore
             */
            init: function (handler) {
                giant.isFunction(handler, "Invalid walker handler");

                /**
                 * Handler to be called on each relevant node. Receives TreeWalker instance as context
                 * and current node as argument. Returning false interrupts traversal.
                 * @type {Function}
                 * @param {object} currentNode Node currently being traversed.
                 */
                this.handler = handler;

                /**
                 * Key currently being traversed
                 * @type {string}
                 */
                this.currentKey = undefined;

                /**
                 * Node currently being traversed
                 * @type {*}
                 */
                this.currentNode = undefined;

                /**
                 * Path currently being traversed
                 * @type {giant.Path}
                 */
                this.currentPath = undefined;

                /**
                 * Tells whether traversal is terminated.
                 * @type {boolean}
                 */
                this.isTerminated = false;
            },

            /**
             * Sets termination flag.
             * @returns {giant.TreeWalker}
             */
            terminateTraversal: function () {
                this.isTerminated = true;
                return this;
            },

            /**
             * Resets walker state
             * @returns {giant.TreeWalker}
             */
            reset: function () {
                this.currentKey = undefined;
                this.currentNode = undefined;
                this.currentPath = undefined;
                this.isTerminated = false;
                return this;
            }
        });
});
