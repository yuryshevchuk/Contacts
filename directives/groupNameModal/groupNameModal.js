app.directive('groupNameModal', function($modal){
	var modalCtrl = function ($scope, $modalInstance, title, group) {
		$scope.title = title;
		$scope.group = group;

		$scope.ok = function () {
			$modalInstance.close($scope.group);
		};
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}
	return {
		restrict: "A",
		scope: {
			title: '@',
			group: '=',
			saveCallback: '=',
			cancelCallback: '='
		},
		link: function (scope, element) {
			var open = function () {
				console.log('open');
				console.log(scope.group)
				var modalInstance = $modal.open({
						templateUrl: 'directives/groupNameModal/groupNameModal.html',
						controller: modalCtrl,
						size: 'sm',
						resolve: {
							title: function () {
								return scope.title;
							},
							group: function () {
								return scope.group;
							}
						}
					});
				
				modalInstance.result.then(function (group) {
					scope.group = group;
					if (scope.saveCallback) {
						scope.saveCallback(scope.group);
					}
				}, function () {
					if (scope.cancelCallback)
						scope.cancelCallback(scope.group);
				});
			};
		element.on('click', open)
		}
	}
});