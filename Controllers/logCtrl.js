angular.module("app").controller("LogCtrl", function ($scope, auth) {
	$scope.logOut = function () {
		auth.clear();
	}
})