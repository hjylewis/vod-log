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
/******/ 	__webpack_require__.p = "/compiled";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(359);

/***/ },

/***/ 359:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(360);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(362)(content, {});
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

/***/ 360:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(361)();
	// imports
	
	
	// module
	exports.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after {\n  content: '';\n  content: none; }\n\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n.flash {\n  height: 48px;\n  width: 48px;\n  background: url(\"http://ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -240px 0px no-repeat; }\n\n.clease {\n  height: 48px;\n  width: 48px;\n  background: url(\"http://ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -48px 0px no-repeat; }\n\n.clairvoyance {\n  height: 48px;\n  width: 48px;\n  background: url(\"http://ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -96px 0px no-repeat; }\n\n.ignite {\n  height: 48px;\n  width: 48px;\n  background: url(\"http://ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -144px 0px no-repeat; }\n\n.barrier {\n  height: 48px;\n  width: 48px;\n  background: url(\"http://ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") 0px 0px no-repeat; }\n\n.exhaust {\n  height: 48px;\n  width: 48px;\n  background: url(\"http://ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -192px 0px no-repeat; }\n\n.ghost {\n  height: 48px;\n  width: 48px;\n  background: url(\"http://ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -288px 0px no-repeat; }\n\n.heal {\n  height: 48px;\n  width: 48px;\n  background: url(\"http://ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -336px 0px no-repeat; }\n\n.clarity {\n  height: 48px;\n  width: 48px;\n  background: url(\"http://ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -384px 0px no-repeat; }\n\n.smite {\n  height: 48px;\n  width: 48px;\n  background: url(\"http://ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -48px -48px no-repeat; }\n\n.teleport {\n  height: 48px;\n  width: 48px;\n  background: url(\"http://ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -144px -48px no-repeat; }\n\n.mark {\n  height: 48px;\n  width: 48px;\n  background: url(\"http://ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -96px -48px no-repeat; }\n\n.poro-toss {\n  height: 48px;\n  width: 48px;\n  background: url(\"http://ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") 0px -48px no-repeat; }\n\n.to-the-king {\n  height: 48px;\n  width: 48px;\n  background: url(\"http://ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png\") -432px -48px no-repeat; }\n\nbody {\n  font-family: Helvetica, Arial, sans-serif;\n  color: #555;\n  background-color: #fafafa; }\n\nh1 {\n  font-size: 32px; }\n\nh2 {\n  font-size: 24px; }\n\nh3 {\n  font-size: 18px; }\n\nh4 {\n  font-size: 13.5px; }\n\na {\n  cursor: pointer; }\n  a:link {\n    color: #555;\n    text-decoration: none; }\n  a:visited {\n    color: #555;\n    text-decoration: none; }\n  a:hover {\n    color: #555;\n    text-decoration: none; }\n  a:active {\n    color: #555;\n    text-decoration: none; }\n  a:hover {\n    color: #e74c3c; }\n\nem {\n  font-style: italic; }\n\n.bar {\n  width: 30px;\n  height: 1px;\n  background-color: #555; }\n\n.header {\n  height: 50px;\n  width: 100%;\n  background-color: #fdfdfd;\n  border: rgba(0, 0, 0, 0.2) solid 1px;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); }\n  .header .search {\n    float: right; }\n\n.main {\n  margin: 20px auto;\n  width: 550px; }\n\n.game-log-main {\n  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);\n  background-color: #fdfdfd;\n  border-radius: 5px; }\n  .game-log-main .game-summary {\n    border: rgba(0, 0, 0, 0.2) solid 1px;\n    border-bottom: 0; }\n    .game-log-main .game-summary:last-child {\n      border-bottom: rgba(0, 0, 0, 0.2) solid 1px;\n      border-radius: 0 0 5px 5px; }\n\n.game-log-button-container {\n  text-align: center; }\n  .game-log-button-container span {\n    margin: 20px auto;\n    color: #e74c3c;\n    padding: 10px 20px;\n    font-size: 14px; }\n  .game-log-button-container .button {\n    cursor: pointer;\n    display: inline-block;\n    border: #e74c3c solid 1px;\n    border-radius: 100px;\n    transition: none 200ms ease-out;\n    transition-property: color, background; }\n    .game-log-button-container .button:hover {\n      background: #e74c3c;\n      color: #fdfdfd; }\n  .game-log-button-container .message {\n    display: none; }\n  .game-log-button-container.no-more .button {\n    display: none; }\n  .game-log-button-container.no-more .message {\n    display: inline-block; }\n\n.game-log-head {\n  padding: 11px;\n  box-sizing: border-box;\n  border-radius: 5px 5px 0 0;\n  background-color: #3498db;\n  color: #fdfdfd;\n  box-shadow: 0 3px 1px rgba(0, 0, 0, 0.1);\n  position: relative;\n  display: flex;\n  flex-flow: row nowrap;\n  overflow: scroll; }\n  .game-log-head a {\n    color: #fdfdfd; }\n    .game-log-head a:hover {\n      color: #242929; }\n  .game-log-head .logo {\n    flex: 0 0 auto;\n    width: 155px;\n    height: 155px;\n    border-radius: 5px;\n    float: left; }\n  .game-log-head .info {\n    flex: 1 1;\n    float: left;\n    margin-left: 30px; }\n    .game-log-head .info h1 {\n      margin: 10px 0 15px 0;\n      font-weight: 600; }\n      .game-log-head .info h1 .stripped {\n        margin-bottom: 10px; }\n    .game-log-head .info .accounts .accounts-header {\n      text-decoration: underline; }\n    .game-log-head .info .accounts ul {\n      line-height: 17px;\n      margin-top: 10px;\n      font-size: 14px; }\n    .game-log-head .info .suggestion {\n      position: absolute;\n      font-size: 11px;\n      right: 10px;\n      bottom: 5px; }\n  .game-log-head.empty {\n    border-bottom-width: 1px;\n    border-radius: 5px; }\n\n.game-summary {\n  height: 100px;\n  position: relative; }\n  .game-summary .summary-image {\n    box-sizing: border-box;\n    width: 100px;\n    padding: 5px;\n    float: left; }\n  .game-summary .icon-strip {\n    float: left;\n    margin: 15px 0;\n    margin-left: 5px; }\n  .game-summary .summary-detail {\n    float: left;\n    font-size: 13px;\n    margin: 10px 0;\n    height: 80px;\n    width: 100px;\n    text-align: center;\n    line-height: 2; }\n    .game-summary .summary-detail .bar {\n      display: inline-block; }\n  .game-summary .watch-button {\n    display: inline-block;\n    margin: 18px 0;\n    margin-left: 18px; }\n    .game-summary .watch-button a {\n      display: inline-block;\n      border: #6441A5 solid 1px;\n      border-radius: 100px;\n      padding: 10px 20px;\n      font-size: 14px;\n      transition: none 200ms ease-out;\n      transition-property: color, background; }\n      .game-summary .watch-button a:link {\n        color: #6441A5;\n        text-decoration: none; }\n      .game-summary .watch-button a:visited {\n        color: #6441A5;\n        text-decoration: none; }\n      .game-summary .watch-button a:hover {\n        color: #6441A5;\n        text-decoration: none; }\n      .game-summary .watch-button a:active {\n        color: #6441A5;\n        text-decoration: none; }\n      .game-summary .watch-button a:hover {\n        background-color: #6441A5;\n        color: #fdfdfd; }\n    .game-summary .watch-button .small-text {\n      font-size: 10px;\n      text-align: center; }\n    .game-summary .watch-button .creation {\n      margin-bottom: 5px; }\n    .game-summary .watch-button .duration {\n      margin-top: 5px; }\n  .game-summary.win {\n    border-left: #2ecc71 solid 2px; }\n  .game-summary.loss {\n    border-left: #e74c3c solid 2px; }\n\n.champion-image {\n  height: 90px; }\n\n.icon-strip {\n  width: 220px;\n  height: 70px; }\n  .icon-strip .summoner-spells {\n    display: inline-block;\n    width: 35; }\n    .icon-strip .summoner-spells .spell {\n      border-radius: 5px;\n      zoom: 0.6875;\n      -moz-transform: scale(0.6875);\n      -moz-transform-origin: 0 0; }\n  .icon-strip .icon {\n    display: inline-block;\n    height: 35px;\n    border-radius: 5px;\n    padding: 1px;\n    box-sizing: border-box; }\n  .icon-strip .keystone-image {\n    display: inline-block;\n    margin: 17.5px 0; }\n  .icon-strip .items {\n    margin-left: 10px;\n    height: 100%;\n    width: 140px;\n    display: inline-block; }\n    .icon-strip .items .main-items {\n      float: left;\n      height: 100%;\n      width: 105px; }\n    .icon-strip .items .last-item img {\n      margin: 17.5px 0; }\n", "", {"version":3,"sources":["/./site/style/site/style/reset.scss","/./site/style/site/style/summoner-spells.scss","/./site/style/site/style/app.scss","/./site/style/site/style/variables.scss","/./site/style/site/style/mixins.scss"],"names":[],"mappings":"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","file":"app.scss","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n/* HTML5 display-role reset for older browsers */\n\narticle, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote {\n  &:before, &:after {\n    content: '';\n    content: none; } }\n\nq {\n  &:before, &:after {\n    content: '';\n    content: none; } }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n","\n// Summoner Spells\n// TODO make dynamic\n@mixin summoner-spell($x, $y) {\n    height:48px;\n    width:48px;\n    background: url('http://ddragon.leagueoflegends.com/cdn/6.16.2/img/sprite/spell0.png') (-1 * $x) + px (-1 * $y) + px no-repeat;\n}\n\n.flash { @include summoner-spell(240, 0); }\n.clease { @include summoner-spell(48, 0); }\n.clairvoyance { @include summoner-spell(96, 0); }\n.ignite { @include summoner-spell(144, 0); }\n.barrier { @include summoner-spell(0, 0); }\n.exhaust { @include summoner-spell(192, 0); }\n.ghost { @include summoner-spell(288, 0); }\n.heal { @include summoner-spell(336, 0); }\n.clarity { @include summoner-spell(384, 0); }\n.smite { @include summoner-spell(48, 48); }\n.teleport { @include summoner-spell(144, 48); }\n.mark { @include summoner-spell(96, 48); }\n.poro-toss { @include summoner-spell(0, 48); }\n.to-the-king { @include summoner-spell(432, 48); }\n","@import 'variables';\n@import 'reset';\n@import 'mixins';\n@import 'summoner-spells';\n\nbody {\n  font-family: $font-stack;\n  color: $grey;\n  background-color: $background-color;\n}\n\nh1 {\n    font-size: $h1 + px;\n}\n\nh2 {\n    font-size: $h1 * (.75) + px;\n}\n\nh3 {\n    font-size: $h1 * (.75) * (.75) + px;\n}\n\nh4 {\n    font-size: $h1 * (.75) * (.75) * (.75) + px;\n}\n\na {\n    @include resetLink();\n    cursor: pointer;\n    &:hover {\n        color: $primary-color;\n    }\n}\n\nem {\n    font-style: italic;\n}\n\n.bar {\n    width: 30px;\n    height: 1px;\n    background-color: $grey;\n}\n\n.header {\n    height: 50px;\n    width: 100%;\n    background-color: $white;\n    border: $light-grey solid 1px;\n    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\n\n    .search {\n        float: right;\n    }\n}\n\n.main {\n    margin: 20px auto;\n    width: 550px;\n\n}\n\n.game-log-main {\n    box-shadow: 0 0 3px rgba(0,0,0,0.1);\n    background-color: $white;\n    border-radius: 5px;\n\n    .game-summary {\n        border: $light-grey solid 1px;\n        border-bottom: 0;\n\n        &:last-child {\n            border-bottom: $light-grey solid 1px;\n            border-radius: 0 0 5px 5px;\n        }\n    }\n}\n\n.game-log-button-container {\n    text-align: center;\n\n    span {\n        margin: 20px auto;\n        color: $primary-color;\n        padding: 10px 20px;\n        font-size: 14px;\n    }\n\n    .button{\n        cursor: pointer;\n        display: inline-block;\n        border: $primary-color solid 1px;\n        border-radius: 100px;\n        transition: none 200ms ease-out;\n        transition-property: color, background;\n\n        &:hover {\n            background: $primary-color;\n            color: $white;\n        }\n    }\n\n    .message {\n        display: none;\n    }\n\n    &.no-more {\n        .button {\n            display: none;\n        }\n\n        .message {\n            display: inline-block;\n        }\n    }\n}\n\n\n.game-log-head {\n    padding: 11px;\n    box-sizing: border-box;\n    border-radius: 5px 5px 0 0;\n    background-color: $blue;\n    color: $white;\n\n    box-shadow: 0 3px 1px rgba(0, 0, 0, 0.1);\n\n    position: relative;\n    display: flex;\n    flex-flow: row nowrap;\n    overflow: scroll;\n\n    a {\n        color: $white;\n        &:hover {\n            color: $black;\n        }\n    }\n\n    .logo {\n        flex: 0 0 auto;\n        width: 155px;\n        height: 155px;\n        border-radius: 5px;\n        float: left;\n    }\n\n    .info {\n        flex: 1 1;\n        float: left;\n        margin-left: 30px;\n\n        h1 {\n            margin: 10px 0 15px 0;\n            font-weight: 600;\n\n            .stripped {\n                margin-bottom: 10px;\n            }\n        }\n\n        .accounts {\n            .accounts-header {\n                text-decoration: underline;\n            }\n\n            ul {\n                line-height: 17px;\n                margin-top: 10px;\n                font-size: 14px;\n            }\n        }\n\n        .suggestion {\n            position: absolute;\n            font-size: 11px;\n            right: 10px;\n            bottom: 5px;\n        }\n    }\n\n    &.empty {\n        border-bottom-width: 1px;\n        border-radius: 5px;\n    }\n}\n\n.game-summary {\n    height: 100px;\n    position: relative;\n\n    .summary-image {\n        box-sizing: border-box;\n        width: 100px;\n        padding: 5px;\n        float: left;\n    }\n\n    .icon-strip {\n        float: left;\n        margin: (50 - $icon-size) + px 0;\n        margin-left: 5px;\n    }\n\n\n\n    .summary-detail {\n        float: left;\n        font-size: 13px;\n        margin: 10px 0;\n        height: 80px;\n        width: 100px;\n        text-align: center;\n        line-height: 2;\n\n        .bar {\n            display: inline-block;\n        }\n    }\n\n    .watch-button {\n        display: inline-block;\n        margin: (100 - (14 + 20) - (2 * 15)) / 2 + px 0;\n        margin-left: 18px;\n\n        a {\n            display: inline-block;\n            @include resetLink($twitch);\n            border: $twitch solid 1px;\n            border-radius: 100px;\n            padding: 10px 20px;\n            font-size: 14px;\n            transition: none 200ms ease-out;\n            transition-property: color, background;\n\n\n            &:hover {\n                background-color: $twitch;\n                color: $white;\n            }\n        }\n\n        .small-text {\n            font-size: 10px;\n            text-align: center;\n        }\n\n        .creation {\n            margin-bottom: 5px;\n        }\n\n        .duration {\n            margin-top: 5px;\n        }\n    }\n\n\n\n    &.win {\n        border-left: $green solid 2px;\n    }\n\n    &.loss {\n        border-left: $red solid 2px;\n    }\n}\n\n.champion-image {\n    height: 90px;\n}\n\n.icon-strip {\n    width: ($icon-size) * 6 + 10 + px;\n    height: $icon-size * 2 + px;\n\n    .summoner-spells {\n        display: inline-block;\n        width: $icon-size;\n        .spell {\n            border-radius: 5px;\n            $icon-size-padding: $icon-size - 2;\n            @include zoom($icon-size-padding / 48);\n        }\n    }\n\n    .icon {\n        display: inline-block;\n        height: $icon-size + px;\n        border-radius: 5px;\n        padding: 1px;\n        box-sizing: border-box;\n    }\n\n    .keystone-image {\n        display: inline-block;\n        margin: ($icon-size / 2) + px 0;\n    }\n\n    .items {\n        margin-left: 10px;\n        height: 100%;\n        width: ($icon-size * 4) + px;\n        display: inline-block;\n\n        .main-items {\n            float: left;\n            height: 100%;\n            width: ($icon-size * 3) + px;\n        }\n\n        .last-item img {\n            margin: ($icon-size / 2) + px 0;\n        }\n    }\n}\n","\n$font-stack:    Helvetica, Arial, sans-serif;\n$primary-color: #e74c3c;\n$background-color: #fafafa;\n$grey: #555;\n$light-grey: rgba(0,0,0,0.2);\n$white: #fdfdfd;\n$green: #2ecc71;\n$red: #e74c3c;\n$blue: #3498db;\n$twitch: #6441A5;\n$black: #242929;\n\n$icon-size: 35;\n\n$h1: 32;\n","@mixin zoom($degree) {\n    zoom: $degree;\n    -moz-transform:scale($degree);\n    -moz-transform-origin: 0 0;\n}\n\n@mixin resetLink($color: $grey) {\n    &:link {\n        color: $color;\n        text-decoration: none;\n    }\n\n    &:visited {\n        color: $color;\n        text-decoration: none;\n    }\n\n    &:hover {\n        color: $color;\n        text-decoration: none;\n    }\n\n    &:active {\n        color: $color;\n        text-decoration: none;\n    }\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },

/***/ 361:
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

/***/ 362:
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