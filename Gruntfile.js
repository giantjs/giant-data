/*jshint node:true */
module.exports = function (grunt) {
    "use strict";

    var params = {
        files: [
            'src/namespace.js',
            'src/utils/DataUtils.js',
            'src/utils/Array.js',
            'src/utils/Debouncer.js',
            'src/data/Hash.js',
            'src/data/Dictionary.js',
            'src/data/StringDictionary.js',
            'src/data/Collection.js',
            'src/data/OrderedList.js',
            'src/data/OrderedStringList.js',
            'src/data/Set.js',
            'src/data/Link.js',
            'src/data/ValueLink.js',
            'src/data/OpenChain.js',
            'src/tree/Path.js',
            'src/tree/KeyValuePattern.js',
            'src/tree/Query.js',
            'src/tree/TreeWalker.js',
            'src/tree/IterativeTreeWalker.js',
            'src/tree/RecursiveTreeWalker.js',
            'src/tree/Tree.js',
            'src/behavior/Documented.js',
            'src/behavior/Managed.js',
            'src/data/collections/ArrayCollection.js',
            'src/data/collections/DateCollection.js',
            'src/data/collections/StringCollection.js',
            'src/exports.js'
        ],

        test: [
            'src/utils/jsTestDriver.conf',
            'src/data/jsTestDriver.conf',
            'src/tree/jsTestDriver.conf',
            'src/behavior/jsTestDriver.conf'
        ],

        globals: {}
    };

    // invoking common grunt process
    require('common-gruntfile')(grunt, params);
};
