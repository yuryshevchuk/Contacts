app.controller("ContactsCtrl", function($scope, auth, googleResource){
	$scope.content = 'This is your content';
	$scope.userEmail = auth.getUserEmail();
	googleResource.getData();
});
