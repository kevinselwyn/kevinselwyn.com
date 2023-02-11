/*globals define, document, Modernizr, require, requirejs, window*/

(function (document, window, undefined) {
	"use strict";

	requirejs.config({
		baseUrl: ".",
		paths: {
			"ReadNES": "/js/readnes/ReadNES.min",
			"ReadNESshiv": "/js/readnes/ReadNESshiv.min"
		}
	});

	require(["ReadNES", "ReadNESshiv"], function (ReadNES, ReadNESshiv) {
		ReadNES.init();
	});
}(document, window));
