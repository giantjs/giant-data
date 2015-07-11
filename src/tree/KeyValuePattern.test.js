/*global giant, module, test, expect, ok, equal, strictEqual, notStrictEqual, deepEqual, raises */
(function () {
    "use strict";

    module("Key-Value Pattern");

    test("Pattern parsing", function () {
        equal(
            giant.KeyValuePattern._parseString('foo%5E'),
            'foo^',
            "String literal pattern"
        );

        deepEqual(
            giant.KeyValuePattern._parseString('{foo%5E}'),
            {
                key   : 'foo^',
                marker: '{'
            },
            "Marked string literal pattern"
        );

        deepEqual(
            giant.KeyValuePattern._parseString('foo%5E<bar%5E'),
            {
                options: ['foo^', 'bar^']
            },
            "Optional keys pattern"
        );

        deepEqual(
            giant.KeyValuePattern._parseString('[foo%5E<bar%5E]'),
            {
                options: ['foo^', 'bar^'],
                marker : '['
            },
            "Marked optional keys pattern"
        );

        deepEqual(
            giant.KeyValuePattern._parseString('|'),
            {
                symbol: '|'
            },
            "Wildcard pattern"
        );

        deepEqual(
            giant.KeyValuePattern._parseString('[|]'),
            {
                symbol: '|',
                marker: '['
            },
            "Marked wildcard pattern"
        );

        deepEqual(
            giant.KeyValuePattern._parseString('\\'),
            {
                symbol: '\\'
            },
            "Skip pattern"
        );

        deepEqual(
            giant.KeyValuePattern._parseString('{\\}'),
            {
                symbol: '\\'
            },
            "Marked skip pattern (invalid)"
        );

        deepEqual(
            giant.KeyValuePattern._parseString('foo%5E^bar%5E'),
            {
                key  : 'foo^',
                value: 'bar^'
            },
            "Key/value literal pattern"
        );

        deepEqual(
            giant.KeyValuePattern._parseString('foo%5E<bar%5E^baz%5E'),
            {
                options: ['foo^', 'bar^'],
                value  : 'baz^'
            },
            "Optional key/value pattern"
        );

        deepEqual(
            giant.KeyValuePattern._parseString('|^bar%5E'),
            {
                symbol: '|',
                value : 'bar^'
            },
            "Wildcard pattern with value"
        );

        deepEqual(
            giant.KeyValuePattern._parseString('\\^bar%5E'),
            {
                symbol: '\\'
            },
            "Skip pattern with value (invalid)"
        );
    });

    test("Instantiation", function () {
        var descriptor,
            pattern;

        raises(function () {
            giant.KeyValuePattern.create(4);
        }, "Key-value pattern initialized w/ other than string, array, or object");

        pattern = giant.KeyValuePattern.create('|^foo');
        deepEqual(
            pattern.descriptor,
            giant.KeyValuePattern._parseString('|^foo'),
            "Descriptor parsed from string"
        );

        descriptor = {symbol: '|', value: 'foo'};
        pattern = giant.KeyValuePattern.create(descriptor);
        deepEqual(
            pattern.descriptor,
            giant.KeyValuePattern._parseString('|^foo'),
            "Descriptor supplied as object"
        );
        strictEqual(
            pattern.descriptor,
            descriptor,
            "Descriptor supplied as object"
        );

        pattern = giant.KeyValuePattern.create(['foo', 'bar']);
        deepEqual(
            pattern.descriptor,
            giant.KeyValuePattern._parseString('foo<bar'),
            "Descriptor created from array"
        );

        deepEqual(
            giant.KeyValuePattern._parseString('"'),
            {symbol: '"'},
            "Descriptor created from array"
        );
    });

    test("Type conversion", function () {
        var pattern;

        if (giant.Feature.hasPropertyAttributes()) {
            ok(!Array.prototype.propertyIsEnumerable('toKeyValuePattern'), "Array type converter is not enumerable");
            ok(!Array.prototype.propertyIsEnumerable('toKVP'), "Array type converter is not enumerable");
            ok(!String.prototype.propertyIsEnumerable('toKeyValuePattern'), "String type converter is not enumerable");
            ok(!String.prototype.propertyIsEnumerable('toKVP'), "String type converter is not enumerable");
        }

        pattern = '|'.toKeyValuePattern();
        ok(pattern.isA(giant.KeyValuePattern), "Type of converted value");
        deepEqual(
            pattern.descriptor,
            giant.KeyValuePattern.create('|').descriptor,
            "Pattern contents"
        );

        pattern = ['foo', 'bar'].toKeyValuePattern();
        ok(pattern.isA(giant.KeyValuePattern), "Type of converted value");
        deepEqual(
            pattern.descriptor,
            giant.KeyValuePattern.create('foo<bar').descriptor,
            "Pattern contents"
        );

        pattern = '|'.toKVP();
        ok(pattern.isA(giant.KeyValuePattern), "Type of converted value");
        deepEqual(
            pattern.descriptor,
            giant.KeyValuePattern.create('|').descriptor,
            "Pattern contents"
        );

        pattern = ['foo', 'bar'].toKVP();
        ok(pattern.isA(giant.KeyValuePattern), "Type of converted value");
        deepEqual(
            pattern.descriptor,
            giant.KeyValuePattern.create('foo<bar').descriptor,
            "Pattern contents"
        );
    });

    test("Setting value", function () {
        var pattern;

        pattern = '|'.toKeyValuePattern().setValue('foo');
        deepEqual(
            pattern.descriptor,
            {symbol: '|', value: 'foo'},
            "Value set on wildcard pattern"
        );

        pattern = 'a<b'.toKeyValuePattern().setValue('foo');
        deepEqual(
            pattern.descriptor,
            {options: ['a', 'b'], value: 'foo'},
            "Value set on options pattern"
        );

        pattern = 'a'.toKeyValuePattern().setValue('foo');
        deepEqual(
            pattern.descriptor,
            {key: 'a', value: 'foo'},
            "Value set on key/value pattern"
        );
    });

    test("Skipper detection", function () {
        ok(!giant.KeyValuePattern.create('hello').isSkipper(), "Literal not skipper");
        ok(giant.KeyValuePattern.create('\\').isSkipper(), "Skipper");
    });

    test("Marker retrieval", function () {
        ok(!'hello'.toKVP().getMarker(), "No marker");
        equal('[hello]'.toKVP().getMarker(), '[', "Bracket");
        equal('{hello}'.toKVP().getMarker(), '{', "Curly brace");
    });

    test("Marker setter", function () {
        var kvp = 'hello'.toKVP(),
            result;

        equal(kvp.descriptor, 'hello', "String descriptor");

        raises(function () {
            kvp.setMarker();
        }, "Invalid marker");

        raises(function () {
            kvp.setMarker('foo');
        }, "Invalid marker");

        result = kvp.setMarker('[');

        strictEqual(result, kvp, "Is chainable");
        deepEqual(kvp.descriptor, {
            key   : 'hello',
            marker: '['
        });
    });

    test("Matching keys", function () {
        ok('hello'.toKVP().matchesKey('hello'), "should pass on exact key match");
        ok(!'foo'.toKVP().matchesKey('hello'), "should fail on literal mismatch");

        ok('|'.toKVP().matchesKey('hello'), "should pass on normal string key on a wildcard");
        ok('|'.toKVP().matchesKey(''), "should pass on empty string key on a wildcard");
        ok(!giant.KeyValuePattern.create({}).matchesKey('hello'), "should fail on any value for custom empty descriptor");

        ok('|^foo'.toKVP().matchesKey('hello'), "should pass when key part of KVP is wildcard");

        ok('hello<world'.toKVP().matchesKey('hello'), "should pass on matching key options");
        ok(!'foo<bar'.toKVP().matchesKey('hello'), "should fail on no matching options");
    });

    test("Matching value against literal value pattern", function () {
        ok('hello'.toKVP().matchesValue('world'), "should pass on any value when no value is specified");
        ok('hello^world'.toKVP().matchesValue('world'), "should pass on exact value match");
        ok(!'hello^world'.toKVP().matchesValue('all'), "should fail on value mismatch");
    });

    test("Matching value against primitive pattern", function () {
        ok('"'.toKVP().matchesValue('world'), "should pass on string value");
        ok('"'.toKVP().matchesValue(1), "should pass on numeric value");
        ok('"'.toKVP().matchesValue(true), "should pass on boolean value");
        ok(!'"'.toKVP().matchesValue(null), "should fail on null");
        ok(!'"'.toKVP().matchesValue({}), "should fail on non-primitive values");
    });

    test("String representation", function () {
        equal(
            giant.KeyValuePattern.create({symbol: '|', value: 'foo^'}).toString(),
            '|^foo%5E',
            "Wildcard with value"
        );

        equal(
            giant.KeyValuePattern.create({symbol: '\\'}).toString(),
            '\\',
            "Skipper"
        );

        equal(
            giant.KeyValuePattern.create({options: ['foo^', 'bar^']}).toString(),
            'foo%5E<bar%5E',
            "Options"
        );

        equal(
            giant.KeyValuePattern.create({options: ['foo^', 'bar^'], value: 'baz^'}).toString(),
            'foo%5E<bar%5E^baz%5E',
            "Options with value"
        );
    });
}());
