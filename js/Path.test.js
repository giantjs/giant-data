/*global sntls, module, test, expect, ok, equal, deepEqual, raises */
(function () {
    module("Path");

    test("Initialized by string", function () {
        var path = sntls.Path.create('test.path.it.is');
        deepEqual(path.asArray, ['test', 'path', 'it', 'is'], "Array representation");
    });

    test("Initialized by array", function () {
        var path = sntls.Path.create(['test', 'path', 'it', 'is']);
        deepEqual(path.asArray, ['test', 'path', 'it', 'is'], "Array representation");
    });

    test("Serialization", function () {
        var path = sntls.Path.create(['test', 'path', 'it', 'is']);
        equal(path.toString(), 'test.path.it.is', "Serialized path");
    });

    test("Equality", function () {
        /** @type sntls.Path */
        var path = sntls.Path.create('test.path.it.is');

        equal(path.equal(sntls.Path.create('test.path.it.is')), true, "Matching path");
        equal(path.equal(sntls.Path.create('path.it.is')), false, "Non-matching path");

        equal(path.equal('test.path.it.is'), true, "Matching string path");
        equal(path.equal('path.it.is'), false, "Non-matching string path");

        equal(path.equal(['test', 'path', 'it', 'is']), true, "Matching array path");
        equal(path.equal(['path', 'it', 'is']), false, "Non-matching array path");
    });

    test("sntls.Path resolution", function () {
        var path = sntls.Path.create('hello.world');

        raises(function () {
            path.resolve();
        }, "Resolution requires a context");

        raises(function () {
            path.resolve('foo');
        }, "Invalid context object");

        equal(typeof path.resolve({}), 'undefined', "Can't resolve on empty object");

        equal(path.resolve({
            hello: {
                world: '!!'
            }
        }), '!!', "sntls.Path resolved");
    });

    test("Building path", function () {
        var path = sntls.Path.create('foo.bar'),
            context = {
                hello: "world"
            };

        raises(function () {
            path.resolveOrBuild();
        }, "sntls.Path builder requires a context");

        raises(function () {
            path.resolveOrBuild('foo');
        }, "Invalid context object");

        path.resolveOrBuild(context);

        deepEqual(path.asArray, ['foo', 'bar'], "Array representation untouched by build");

        deepEqual(context, {
            hello: "world",
            foo  : {
                bar: {}
            }
        }, "sntls.Path built");

        sntls.Path.create('hello.world').resolveOrBuild(context);

        deepEqual(context, {
            hello: {
                world: {}
            },
            foo  : {
                bar: {}
            }
        }, "Existing path overwritten");
    });
}());
