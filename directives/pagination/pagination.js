app.directive("paginate", function (){
	return {
		restrict: "E",
		scope: {
			totalItems: "=",
			itemsPerPage: "=",
			currentPage: "="
		},
		template: "<ul class='pagination'><li ng-repeat='page in pages' ng-class='{active: currentPage == page}' ng-click='applyPage(page)'><a href=''>{{page}}</a></li></ul>",
		controller: function($scope) {
			$scope.pages = [];

			$scope.$watch("totalItems",
			function(newVal, oldVal){
				if ( newVal !== oldVal && newVal) {
					$scope.pages = [];
					var numbOfPages = Math.ceil(newVal/$scope.itemsPerPage);
					if (numbOfPages > 1) {
						for (var i = 1; i <= numbOfPages; i++){
							$scope.pages.push(i);
						}
					}
				}
			});

			$scope.applyPage = function (page) {
				$scope.currentPage = page;
			}
		}
	}
});