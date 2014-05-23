app.directive("pagination", function ($routeParams){
	return {
		restrict: "E",
		scope: {
			totalItems: "=",
			itemsPerPage: "="
		},
		template: "<ul class='pagination'><li ng-repeat='page in pages' ng-class='{active: page == currentPage}'><a href='#/contacts/page/{{page}}'>{{page}}</a></li></ul>",
		controller: function($scope) {
			$scope.pages = [];
			$scope.$watch(function(){
				return Math.ceil($scope.totalItems/$scope.itemsPerPage)
			},
			function(newVal, oldVal){
				if ( newVal !== oldVal ) {
					$scope.currentPage = $routeParams.page
					for (var i = 1; i <= newVal; i++){
						$scope.pages.push(i);
					}
				}
			});
		}
	}
});