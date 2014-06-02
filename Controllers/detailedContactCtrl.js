app.controller("detailedContactCtrl", function($scope, cfpLoadingBar, userContactsResource, userPhotoResource, $routeParams, $rootScope, ngProgress){
	cfpLoadingBar.start();
	userContactsResource.get({user_email: "default", user_id: $routeParams.user_id}).$promise.then(
        function(value){
        	$scope.detailedContact = value;
        	cfpLoadingBar.complete();
        }, function(){
        });
})