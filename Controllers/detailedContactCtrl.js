app.controller("detailedContactCtrl", function($scope, userContactsResource, userPhotoResource, $routeParams){
	$scope.detailedContact = userContactsResource.get({user_email: "default", user_id: $routeParams.user_id});
	//$scope.userPhoto = userPhotoResource.get({user_email: "default", user_id: $routeParams.user_id});
})