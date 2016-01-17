"use strict";

/**
 * Doc Controller
 * @description This controller has the method to show the documentation api
 * @author Samuel Castro
 * @since 1/15/2016
 */
var	jwt = require('jsonwebtoken'),
	utils  = require('../lib/utilities.js'),
	pack   = require('../../package');

function DocController(){}

/**
 * Defining doc controllers
 * @type {{index, getAuth}}
 */
DocController.prototype = (function(){
	return {
		/**
		 * Generating index.html for api/doc route
		 * @param request
		 * @param reply
		 */
	  	index: function (request, reply) {
			utils.getMarkDownHTML(__dirname + '/../../README.md', function(err, data){
				reply.view('index.html', {
					title: pack.name,
					markdown: data
				});
			});
	  	}
	}
})();

/**
 * Exporting doc controller
 * @type {DocController}
 */
module.exports = new DocController;

