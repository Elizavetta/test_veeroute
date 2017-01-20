(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var app = window.app = angular.module('app', []);

//angular.bootstrap(document, ['app']);

var mainPage = {

	template: '\n\t    <div class="page-container">\n\t\t\t<div class="page-column">\n\t\t\t\t<div class="page-column-head">\n\t\t\t\t\t<div class="page-column-head-sort">Sort: \n\t\t\t\t\t\t<div class="page-column-head-sort-btn" ng-click="$ctrl.sortItemsLeft()"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="page-column-head-filter">\n\t\t\t\t\t\t<input class="page-column-head-filter-input" ng-change="$ctrl.checkLeftFilter()" ng-model="$ctrl.filterText">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t  \t\t<div class="page-column-body">\n\t\t  \t\t\t<div class="page-column-item" ng-class="{\'selected\': $ctrl.selected === item}" ng-repeat="(i, item) in $ctrl.list_left" ng-click="$ctrl.selectItem(item)" ng-show="$ctrl.list_left_filtered.indexOf(item)!==-1"> \n\t\t  \t\t\t\t<span>{{item.name}}</span> \n\t\t  \t\t\t\t<div class="page-column-item-icons">\n\t\t  \t\t\t\t\t<div class="page-column-item-icon {{icon}}" ng-repeat="(ind, icon) in item.flags"></div>\n\t\t  \t\t\t\t</div>\n\t\t  \t\t\t</div>\n\t\t  \t\t</div>\n\t\t  \t</div>\n\t\t  \t<div class="page-column short grey"> \n\t\t  \t\t<div class="page-column-info">\n\t\t  \t\t\t<div class="page-column-info-head">\n\t\t  \t\t\t\tINFO\n\t\t  \t\t\t</div>\n\t\t  \t\t\t<div class="page-column-info-name">Name:  {{$ctrl.selected.name}}</div>\n\t\t  \t\t\t<div class="page-column-info-flags">\n\t\t  \t\t\t\tFlags:  \n\t\t  \t\t\t\t<div class="page-column-item-icon {{icon}}" ng-repeat="(ind, icon) in $ctrl.selected.flags"></div>\n\t\t  \t\t\t</div>\n\t\t  \t\t</div>\n\t\t  \t</div>\n\t\t  \t<div class="page-column">\n\t\t\t\t<div class="page-column-head"> \n\t\t\t\t\t<div class="page-column-info-flags">\n\t\t  \t\t\t\tFilters:  \n\t\t  \t\t\t\t<div class="page-column-item-icon btn {{icon}}" ng-repeat="(ind, icon) in $ctrl.flags" ng-class="{\'on\': $ctrl.flags_filters.indexOf(icon)!==-1}" ng-click="$ctrl.toggleFlag(icon)"></div>\n\t\t  \t\t\t</div>\n\t\t  \t\t</div>\n\t\t  \t\t<div class="page-column-body">\n\t\t  \t\t\t<div class="page-column-item" ng-class="{\'selected\': $ctrl.selected === item}" ng-repeat="(i, item) in $ctrl.list_right" ng-click="$ctrl.selectItem(item)" ng-show="$ctrl.list_right_filtered.indexOf(item)!==-1"> \n\t\t  \t\t\t\t<span>{{item.name}}</span>  \n\t\t  \t\t\t\t<div class="page-column-item-icons">\n\t\t  \t\t\t\t\t<div class="page-column-item-icon {{icon}}" ng-repeat="(ind, icon) in item.flags"></div>\n\t\t  \t\t\t\t</div>\n\t\t  \t\t\t</div>\n\t\t  \t\t</div>\n\t\t  \t</div>\n\t\t</div>\n\t  ',

	bindings: {
		'counter': '='
	},

	controller: function controller() {
		var _this = this;

		var N = 100;
		var FLAGS = ['flower', 'heart', 'sun', 'flash'];

		this.$onInit = function () {
			console.log('MainPage');
			_this.list_left = [];
			_this.list_right = [];
			_this.counter = N;
			_this.sorted = -1;
			_this.flags = FLAGS;
			_this.flags_filters = [];

			for (var i = N; i > 0; i--) {
				_this.list_left.push(new Item(i, 'left'));
				_this.list_right.push(new Item(i, 'right'));
			}
			console.log('init lists', _this.list_left, _this.list_right);
		};

		this.selectItem = function (item) {
			_this.selected = item;
		};

		this.sortItemsLeft = function () {
			if (_this.sorted === -1) {
				_this.list_left = _this.list_left.sort(function (el_1, el_2) {
					if (el_1.name > el_2.name) return -1;else if (el_1.name < el_2.name) return 1;else return 0;
				});
				_this.sorted = 1;
			} else {
				_this.list_left = _this.list_left.reverse();
				_this.sorted = _this.sorted ? 0 : 1;
			}
		};

		this.checkLeftFilter = function () {
			//console.log('checkLeftFilter', this.filterText);
			if (!_this.filterText) _this.list_left_filtered = _this.list_left;
			_this.list_left_filtered = _this.list_left.filter(function (el) {
				return el.name.indexOf(_this.filterText) !== -1;
			});
		};

		this.toggleFlag = function (flag) {
			if (_this.flags_filters.indexOf(flag) !== -1) {
				_this.flags_filters.splice(_this.flags_filters.indexOf(flag), 1);
			} else {
				_this.flags_filters.push(flag);
			}
			_this.setFlagsFilter();
		};

		this.setFlagsFilter = function () {
			var self = _this;
			_this.list_right_filtered = _this.list_right.filter(function (el) {
				for (var key in self.flags_filters) {
					if (el.flags.indexOf(self.flags_filters[key]) == -1) return false;
				}
				return true;
			});
		};

		function Item(i, pos) {
			this.name = 'name_' + pos + '_' + Math.floor(Math.random() * 100);
			this.flags = [];
			for (var key in FLAGS) {
				if (Math.random() * 2 > 1) {
					this.flags.push(FLAGS[key]);
				}
			}
		}
	}
};

angular.module('app').component('mainPage', mainPage);

},{}]},{},[1])

//# sourceMappingURL=app.js.map
