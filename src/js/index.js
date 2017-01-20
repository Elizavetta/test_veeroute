var app = window.app = angular.module('app', []);

//angular.bootstrap(document, ['app']);

const mainPage = {
	
	template: `
	    <div class="page-container">
			<div class="page-column">
				<div class="page-column-head">
					<div class="page-column-head-sort">Sort: 
						<div class="page-column-head-sort-btn" ng-click="$ctrl.sortItemsLeft()"></div>
					</div>
					<div class="page-column-head-filter">
						<input class="page-column-head-filter-input" ng-change="$ctrl.checkLeftFilter()" ng-model="$ctrl.filterText">
					</div>
				</div>
		  		<div class="page-column-body">
		  			<div class="page-column-item" ng-class="{'selected': $ctrl.selected === item}" ng-repeat="(i, item) in $ctrl.list_left" ng-click="$ctrl.selectItem(item)" ng-show="$ctrl.list_left_filtered.indexOf(item)!==-1"> 
		  				<span>{{item.name}}</span> 
		  				<div class="page-column-item-icons">
		  					<div class="page-column-item-icon {{icon}}" ng-repeat="(ind, icon) in item.flags"></div>
		  				</div>
		  			</div>
		  		</div>
		  	</div>
		  	<div class="page-column short grey"> 
		  		<div class="page-column-info">
		  			<div class="page-column-info-head">
		  				INFO
		  			</div>
		  			<div class="page-column-info-name">Name:  {{$ctrl.selected.name}}</div>
		  			<div class="page-column-info-flags">
		  				Flags:  
		  				<div class="page-column-item-icon {{icon}}" ng-repeat="(ind, icon) in $ctrl.selected.flags"></div>
		  			</div>
		  		</div>
		  	</div>
		  	<div class="page-column">
				<div class="page-column-head"> 
					<div class="page-column-info-flags">
		  				Filters:  
		  				<div class="page-column-item-icon btn {{icon}}" ng-repeat="(ind, icon) in $ctrl.flags" ng-class="{'on': $ctrl.flags_filters.indexOf(icon)!==-1}" ng-click="$ctrl.toggleFlag(icon)"></div>
		  			</div>
		  		</div>
		  		<div class="page-column-body">
		  			<div class="page-column-item" ng-class="{'selected': $ctrl.selected === item}" ng-repeat="(i, item) in $ctrl.list_right" ng-click="$ctrl.selectItem(item)" ng-show="$ctrl.list_right_filtered.indexOf(item)!==-1"> 
		  				<span>{{item.name}}</span>  
		  				<div class="page-column-item-icons">
		  					<div class="page-column-item-icon {{icon}}" ng-repeat="(ind, icon) in item.flags"></div>
		  				</div>
		  			</div>
		  		</div>
		  	</div>
		</div>
	  `,

	bindings: {
		'counter': '='
    },

	controller() {

			let N = 100;
			let FLAGS = [ 'flower', 'heart', 'sun', 'flash' ];

	  		this.$onInit = () => {
		      	console.log('MainPage');
				this.list_left = [];
				this.list_right = [];
				this.counter = N;
				this.sorted = -1;
				this.flags = FLAGS;
				this.flags_filters = [];

				for (var i=N; i > 0; i--) {
					this.list_left.push(new Item(i, 'left'));
					this.list_right.push(new Item(i, 'right'));
				}
				console.log('init lists', this.list_left, this.list_right);
		    };

		    this.selectItem = (item) => {
		    	this.selected = item;
		    };	

		    this.sortItemsLeft = () => {
		    	if (this.sorted === -1) {
		    		this.list_left = this.list_left.sort((el_1, el_2)=>{
		    			if (el_1.name > el_2.name) return -1;
		    				else if (el_1.name < el_2.name) return 1;
		    				else return 0;
			    	});
			    	this.sorted = 1;
		    	}
		    	else {
		    		this.list_left = this.list_left.reverse();
			    	this.sorted = this.sorted ? 0 : 1;
		    	}
		    };		

		    this.checkLeftFilter = () => {
		    	//console.log('checkLeftFilter', this.filterText);
		    	if (!this.filterText) this.list_left_filtered = this.list_left;
		    	this.list_left_filtered = this.list_left.filter((el)=>{
		    		return el.name.indexOf(this.filterText) !==-1;
		    	});
		    };

		    this.toggleFlag = (flag) => {
		    	if (this.flags_filters.indexOf(flag)!==-1) {
		    		this.flags_filters.splice(this.flags_filters.indexOf(flag),1);
		    	}
		    	else {
		    		this.flags_filters.push(flag);
		    	}
		    	this.setFlagsFilter();
		    };

		    this.setFlagsFilter = () => {
		    	let self = this;
		    	this.list_right_filtered = this.list_right.filter((el)=>{
		    		for (var key in self.flags_filters) {
		    			if (el.flags.indexOf(self.flags_filters[key]) == -1) return false;
		    		}
		    		return true;
		    	});
		    };

			function Item(i, pos) {
				this.name = 'name_' + pos + '_' + Math.floor(Math.random()*100);
				this.flags = [];
				for (var key in FLAGS) {
					if (Math.random()*2 > 1) {
						this.flags.push(FLAGS[key]);
					} 
				}
			}
		}
};

angular.module('app').component('mainPage', mainPage);