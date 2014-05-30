app.directive('confirmationModal', function($modal){
	var modalCtrl = function ($scope, $modalInstance, modal, title) {
		$scope.title = title;
		$scope.modal = modal;
		console.log($scope.modal);
		$scope.ok = function () {
			$modalInstance.close($scope.modal);
		};
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}
	return {
		restrict: "A",
		scope: {
			title: '=',
			modal: '=',
			saveCallback: '=',
			cancelCallback: '='
		},
		link: function (scope, element) {

			var open = function () {
				console.log('open delete confirmation message');
				
				var modalInstance = $modal.open({
						templateUrl: 'directives/confirmationModal/confirmationModal.html',
						controller: modalCtrl,
						size: 'sm',
						resolve: {
							modal: function () {
								return scope.modal;
							},
							title: function () {
								return scope.title;
							}
						}
					});
				
				modalInstance.result.then(function (modal) {
					if (scope.saveCallback) {
						scope.saveCallback(modal, true);
					}
				}, function () {
					if (scope.cancelCallback)
						scope.cancelCallback();
				});
			};
		element.on('click', open)
		}
	}
});