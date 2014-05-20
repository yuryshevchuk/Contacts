angular.module("app").controller("ContactsCtrl", function($scope, userContactsResource){
	$scope.contacts = userContactsResource.get({user_email: "default"});
});
