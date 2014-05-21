app.directive("pagination", function ($routeParams){
	return {
		restrict: "E",
		scope: {
			totalitems: "=",
			itemsperpage: "="
		},
		template: "<ul class='pagination'><li ng-repeat='page in pages' ng-class='{active: page == currentpage}'><a href='#/contacts/page/{{page}}'>{{page}}</a></li></ul>",
		controller: function($scope) {
			$scope.pages = [];
			$scope.$watch(function(){
				return Math.ceil($scope.totalitems/$scope.itemsperpage)
			},
			function(newVal, oldVal){
				if ( newVal !== oldVal ) {
					$scope.currentpage = $routeParams.page
					for (var i = 1; i <= newVal; i++){
						$scope.pages.push(i);
					}
				}
			});
		}
	}
});