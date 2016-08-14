/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(352);

/***/ },

/***/ 352:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(353);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(355)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./app.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./app.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 353:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(354)();
	// imports
	
	
	// module
	exports.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after {\n  content: '';\n  content: none; }\n\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n.flash {\n  height: 48px;\n  width: 48px;\n  background: url(\"//ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -240px 0px no-repeat; }\n\n.clease {\n  height: 48px;\n  width: 48px;\n  background: url(\"//ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -48px 0px no-repeat; }\n\n.clairvoyance {\n  height: 48px;\n  width: 48px;\n  background: url(\"//ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -96px 0px no-repeat; }\n\n.ignite {\n  height: 48px;\n  width: 48px;\n  background: url(\"//ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -144px 0px no-repeat; }\n\n.barrier {\n  height: 48px;\n  width: 48px;\n  background: url(\"//ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") 0px 0px no-repeat; }\n\n.exhaust {\n  height: 48px;\n  width: 48px;\n  background: url(\"//ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -192px 0px no-repeat; }\n\n.ghost {\n  height: 48px;\n  width: 48px;\n  background: url(\"//ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -288px 0px no-repeat; }\n\n.heal {\n  height: 48px;\n  width: 48px;\n  background: url(\"//ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -336px 0px no-repeat; }\n\n.clarity {\n  height: 48px;\n  width: 48px;\n  background: url(\"//ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -384px 0px no-repeat; }\n\n.smite {\n  height: 48px;\n  width: 48px;\n  background: url(\"//ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -48px -48px no-repeat; }\n\n.teleport {\n  height: 48px;\n  width: 48px;\n  background: url(\"//ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -144px -48px no-repeat; }\n\n.mark {\n  height: 48px;\n  width: 48px;\n  background: url(\"//ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -96px -48px no-repeat; }\n\n.poro-toss {\n  height: 48px;\n  width: 48px;\n  background: url(\"//ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") 0px -48px no-repeat; }\n\n.to-the-king {\n  height: 48px;\n  width: 48px;\n  background: url(\"//ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -432px -48px no-repeat; }\n\nbody {\n  font-family: Helvetica, Arial, sans-serif;\n  color: #555;\n  background-color: #eaeaea; }\n\n.header {\n  height: 50px;\n  width: 100%;\n  border: black solid 1px; }\n  .header .search {\n    float: right; }\n\n.main {\n  margin: 20px auto;\n  width: 500px; }\n\n.game-log {\n  box-shadow: 0 0 2px #555;\n  background-color: #f2f2f2; }\n  .game-log .game-summary {\n    border: #555 solid 1px;\n    border-bottom: 0; }\n    .game-log .game-summary:last-child {\n      border-bottom: #555 solid 1px; }\n\n.game-log-head {\n  height: 200px;\n  border: #555 solid 1px;\n  border-bottom: 0; }\n\n.game-summary {\n  height: 100px;\n  cursor: pointer; }\n  .game-summary .summary-image {\n    padding: 5px;\n    float: left; }\n  .game-summary .icon-strip {\n    float: left;\n    margin: 15px 0;\n    margin-left: 5px; }\n  .game-summary .summary-detail {\n    float: left;\n    font-size: 13px;\n    text-align: center; }\n    .game-summary .summary-detail.actions a:link {\n      color: #555;\n      text-decoration: none; }\n    .game-summary .summary-detail.actions a:visited {\n      color: #555;\n      text-decoration: none; }\n    .game-summary .summary-detail.actions a:hover {\n      color: #555;\n      text-decoration: none; }\n    .game-summary .summary-detail.actions a:active {\n      color: #555;\n      text-decoration: none; }\n    .game-summary .summary-detail.actions a:hover {\n      text-decoration: underline; }\n  .game-summary.win {\n    border-left: #2ecc71 solid 2px; }\n  .game-summary.loss {\n    border-left: #e74c3c solid 2px; }\n\n.champion-image {\n  height: 90px; }\n\n.icon-strip .summoner-spells {\n  display: inline-block; }\n  .icon-strip .summoner-spells div {\n    zoom: 0.72917;\n    -moz-transform: scale(0.72917);\n    -moz-transform-origin: 0 0; }\n\n.icon-strip .keystone-image {\n  display: inline-block;\n  margin: 17.5px 0;\n  height: 35px; }\n\n.icon-strip .items {\n  margin-left: 10px;\n  width: 140px;\n  display: inline-block; }\n  .icon-strip .items .main-items {\n    display: inline-block;\n    width: 105px; }\n  .icon-strip .items .last-item img {\n    margin: 17.5px 0; }\n  .icon-strip .items img {\n    display: inline-block;\n    height: 35px; }\n", "", {"version":3,"sources":["/./site/style/site/style/reset.scss","/./site/style/site/style/summoner-spells.scss","/./site/style/site/style/app.scss","/./site/style/site/style/variables.scss","/./site/style/site/style/mixins.scss"],"names":[],"mappings":"AAAA;;;EAGE;AAEF;EACE,UAAU;EACV,WAAW;EACX,UAAU;EACV,gBAAgB;EAChB,cAAc;EACd,yBAAyB,EAAG;;AAE9B,iDAAiD;AAEjD;EACE,eAAe,EAAG;;AAEpB;EACE,eAAe,EAAG;;AAEpB;EACE,iBAAiB,EAAG;;AAEtB;EACE,aAAa,EAAG;;AAElB;EAEI,YAAY;EACZ,cAAc,EAAG;;AAErB;EAEI,YAAY;EACZ,cAAc,EAAG;;AAErB;EACE,0BAA0B;EAC1B,kBAAkB,EAAG;;AC9BvB;EALI,aAAY;EACZ,YAAW;EACX,uGAAyH,EAGjF;;AAC5C;EANI,aAAY;EACZ,YAAW;EACX,sGAAyH,EAIjF;;AAC5C;EAPI,aAAY;EACZ,YAAW;EACX,sGAAyH,EAK3E;;AAClD;EARI,aAAY;EACZ,YAAW;EACX,uGAAyH,EAMhF;;AAC7C;EATI,aAAY;EACZ,YAAW;EACX,oGAAyH,EAOjF;;AAC5C;EAVI,aAAY;EACZ,YAAW;EACX,uGAAyH,EAQ/E;;AAC9C;EAXI,aAAY;EACZ,YAAW;EACX,uGAAyH,EASjF;;AAC5C;EAZI,aAAY;EACZ,YAAW;EACX,uGAAyH,EAUlF;;AAC3C;EAbI,aAAY;EACZ,YAAW;EACX,uGAAyH,EAW/E;;AAC9C;EAdI,aAAY;EACZ,YAAW;EACX,wGAAyH,EAYjF;;AAC5C;EAfI,aAAY;EACZ,YAAW;EACX,yGAAyH,EAa7E;;AAChD;EAhBI,aAAY;EACZ,YAAW;EACX,wGAAyH,EAclF;;AAC3C;EAjBI,aAAY;EACZ,YAAW;EACX,sGAAyH,EAe9E;;AAC/C;EAlBI,aAAY;EACZ,YAAW;EACX,yGAAyH,EAgB1E;;ACjBnD;EACE,0CCL0C;EDM1C,YCHS;EDIT,0BCLwB,EDMzB;;AAED;EACI,aAAa;EACb,YAAY;EACZ,wBAAwB,EAK3B;EARD;IAMQ,aAAa,EAChB;;AAGL;EACI,kBAAkB;EAClB,aAAa,EAEhB;;AAED;EACI,yBCxBO;EDyBP,0BCxBW,EDmCd;EAbD;IAKQ,uBAAuB;IACvB,iBAAiB,EAKpB;IAXL;MASY,8BAA8B,EACjC;;AAKT;EACI,cAAc;EACd,uBAAuB;EACvB,iBAAiB,EACpB;;AAID;EACI,cAAc;EAEd,gBAAgB,EAoCnB;EAvCD;IAKQ,aAAa;IACb,YAAY,EACf;EAPL;IAUQ,YAAY;IACZ,eAAgC;IAChC,iBAAiB,EACpB;EAbL;IAkBQ,YAAY;IACZ,gBAAgB;IAChB,mBAAmB,EAUtB;IA9BL;ME1CQ,YDJG;MCKH,sBAAsB,EACzB;IFwCL;MErCQ,YDTG;MCUH,sBAAsB,EACzB;IFmCL;MEhCQ,YDdG;MCeH,sBAAsB,EACzB;IF8BL;ME3BQ,YDnBG;MCoBH,sBAAsB,EACzB;IFyBL;MA0BoB,2BAA2B,EAC9B;EA3BjB;IAiCQ,+BAA6B,EAChC;EAlCL;IAqCQ,+BAA2B,EAC9B;;AAGL;EACI,aAAa,EAChB;;AAED;EAEQ,sBAAsB,EAIzB;EANL;IE9FI,cFkGgC;IEjGhC,+BAAoB;IACpB,2BAA2B,EFiGtB;;AALT;EASQ,sBAAsB;EACtB,iBAA+B;EAC/B,aCjGM,EDkGT;;AAZL;EAeQ,kBAAkB;EAClB,aAAkB;EAClB,sBAAsB,EAiBzB;EAlCL;IAoBY,sBAAsB;IACtB,aAAkB,EACrB;EAtBT;IAyBY,iBAA+B,EAClC;EA1BT;IA8BY,sBAAsB;IACtB,aCrHE,EDuHL","file":"app.scss","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\n\narticle, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote {\n  &:before, &:after {\n    content: '';\n    content: none; } }\n\nq {\n  &:before, &:after {\n    content: '';\n    content: none; } }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n","\n// Summoner Spells\n// TODO make dynamic\n@mixin summoner-spell($x, $y) {\n    height:48px;\n    width:48px;\n    background: url('//ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png') (-1 * $x) + px (-1 * $y) + px no-repeat;\n}\n\n.flash { @include summoner-spell(240, 0); }\n.clease { @include summoner-spell(48, 0); }\n.clairvoyance { @include summoner-spell(96, 0); }\n.ignite { @include summoner-spell(144, 0); }\n.barrier { @include summoner-spell(0, 0); }\n.exhaust { @include summoner-spell(192, 0); }\n.ghost { @include summoner-spell(288, 0); }\n.heal { @include summoner-spell(336, 0); }\n.clarity { @include summoner-spell(384, 0); }\n.smite { @include summoner-spell(48, 48); }\n.teleport { @include summoner-spell(144, 48); }\n.mark { @include summoner-spell(96, 48); }\n.poro-toss { @include summoner-spell(0, 48); }\n.to-the-king { @include summoner-spell(432, 48); }\n","@import 'variables';\n@import 'reset';\n@import 'mixins';\n@import 'summoner-spells';\n\nbody {\n  font-family: $font-stack;\n  color: $grey;\n  background-color: $background-color;\n}\n\n.header {\n    height: 50px;\n    width: 100%;\n    border: black solid 1px;\n\n    .search {\n        float: right;\n    }\n}\n\n.main {\n    margin: 20px auto;\n    width: 500px;\n\n}\n\n.game-log {\n    box-shadow: 0 0 2px $grey;\n    background-color: $white;\n\n    .game-summary {\n        border: $grey solid 1px;\n        border-bottom: 0;\n\n        &:last-child {\n            border-bottom: $grey solid 1px;\n        }\n    }\n\n}\n\n.game-log-head {\n    height: 200px;\n    border: $grey solid 1px;\n    border-bottom: 0;\n}\n\n\n\n.game-summary {\n    height: 100px;\n\n    cursor: pointer;\n    .summary-image {\n        padding: 5px;\n        float: left;\n    }\n\n    .icon-strip {\n        float: left;\n        margin: (50 - $icon-size) + px 0;\n        margin-left: 5px;\n    }\n\n\n\n    .summary-detail {\n        float: left;\n        font-size: 13px;\n        text-align: center;\n\n        &.actions {\n            a {\n                @include resetLink();\n                &:hover {\n                    text-decoration: underline;\n                }\n            }\n        }\n    }\n\n    &.win {\n        border-left: $green solid 2px;\n    }\n\n    &.loss {\n        border-left: $red solid 2px;\n    }\n}\n\n.champion-image {\n    height: 90px;\n}\n\n.icon-strip {\n    .summoner-spells {\n        display: inline-block;\n        div {\n            @include zoom($icon-size / 48);\n        }\n    }\n\n    .keystone-image {\n        display: inline-block;\n        margin: ($icon-size / 2) + px 0;\n        height: $icon-size + px;\n    }\n\n    .items {\n        margin-left: 10px;\n        width: ($icon-size * 4) + px;\n        display: inline-block;\n\n        .main-items {\n            display: inline-block;\n            width: ($icon-size * 3) + px;\n        }\n\n        .last-item img {\n            margin: ($icon-size / 2) + px 0;\n        }\n\n\n        img {\n            display: inline-block;\n            height: $icon-size + px;\n\n        }\n    }\n}\n","\n$font-stack:    Helvetica, Arial, sans-serif;\n$primary-color: #333;\n$background-color: #eaeaea;\n$grey: #555;\n$white: #f2f2f2;\n$green: #2ecc71;\n$red: #e74c3c;\n\n$icon-size: 35;\n","@mixin zoom($degree) {\n    zoom: $degree;\n    -moz-transform:scale($degree);\n    -moz-transform-origin: 0 0;\n}\n\n@mixin resetLink() {\n    &:link {\n        color: $grey;\n        text-decoration: none;\n    }\n\n    &:visited {\n        color: $grey;\n        text-decoration: none;\n    }\n\n    &:hover {\n        color: $grey;\n        text-decoration: none;\n    }\n\n    &:active {\n        color: $grey;\n        text-decoration: none;\n    }\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },

/***/ 354:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 355:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }

/******/ });
//# sourceMappingURL=style.js.map