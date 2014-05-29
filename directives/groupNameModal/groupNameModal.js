app.directive('groupNameModal', function($modal){
	var modalCtrl = function ($scope, $modalInstance, title, groupName) {
		console.log(title, groupName);
		$scope.title = title;
		$scope.groupName = groupName;
		$scope.ok = function () {
			$modalInstance.close($scope.groupName);
		};
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}
	return {
		restrict: "A",
		scope: {
			title: '@',
			groupName: '=',
			groupId: '=',
			saveCallback: '=',
			cancelCallback: '='
		},
		link: function (scope, element) {
			var open = function () {
				console.log('open');
				console.log(scope.saveCallback)
				var modalInstance = $modal.open({
						templateUrl: 'directives/groupNameModal/groupNameModal.html',
						controller: modalCtrl,
						size: 'sm',
						resolve: {
							title: function () {
								return scope.title;
							},
							groupName: function () {
								return scope.groupName;
							}
						}
					});
				
				modalInstance.result.then(function (groupName) {
					scope.groupName = groupName;
					if (scope.saveCallback) {
						alert('He is here!!! The one who will save my day!!!')
						scope.saveCallback(scope.groupId);
					}
				}, function () {
					if (scope.cancelCallback)
						scope.cancelCallback(scope.groupId);
				});
			};
		element.on('click', open)
		}
	}
});