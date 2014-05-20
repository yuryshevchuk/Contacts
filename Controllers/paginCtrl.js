app.controller("PaginCtrl", function($scope, userContactsResource, $routeParams){
	$scope.contacts = userContactsResource.get({user_email: "default"});
})