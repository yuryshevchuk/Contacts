angular.module("app").controller("ContactsCtrl", function($scope, userContactsResource, $routeParams, $rootScope){
	$scope.contacts = userContactsResource.get({user_email: "default", "start-index": (1+25*($routeParams.page-1))});
});
