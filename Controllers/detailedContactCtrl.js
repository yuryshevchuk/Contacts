app.controller("detailedContactCtrl", function($scope, userContactsResource, $routeParams){
	$scope.detailedContact = userContactsResource.get({user_email: "default", user_id: $routeParams.user_id});
})