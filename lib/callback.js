/* jshint node: true */

/**
* Module dependencies.
*/

var underscore = require('underscore');
var util = require('util');
var debug = require('debug')('node_plsql:callback');

/**
* Module constants.
*/

/**
* Module variables.
*/

/**
* Array Remove - By John Resig (MIT Licensed)
*
* @param {Number} from
* @param {Number} to
* @api private
*/
Array.prototype.remove = function (from, to) {
	'use strict';

	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

/**
* Execute callback function
*
* @param {Object} config Server configuration
* @return {Object}
* @api public
*/

function execute(workerFunction, callbackFunction, args)
{
	'use strict';

	var copy = ([].slice.call(arguments)).remove(0, 1),
		ret;

	// Invoke the callback function
	if (callbackFunction && underscore.IsFunction(callbackFunction)) {
		debug('execute callback function \"' + callbackFunction.toString() + '\" with arguments \"' + util.inspect(copy, {showHidden: true, depth: 1, colors: false}) + '\"');
		ret = callbackFunction.apply(null, copy);
	}

	// If we are not told to stop processing, also call the actual function
	if (ret !== undefined) {
		debug('execute worker function \"' + workerFunction.toString() + '\" with arguments \"' + util.inspect(copy, {showHidden: true, depth: 1, colors: false}) + '\"');
		return workerFunction.apply(null, copy);
	}

	return ret;
}

module.exports = {
	execute: execute
};